document.addEventListener("DOMContentLoaded", () => {
  // Generate QR code
  generateQRCode()

  // Initialize share functionality
  initShareFunctionality()

  // Initialize copy link functionality
  initCopyLinkFunctionality()

  // Initialize QR code download
  initQRDownload()

  // Add hover effects to share items
  addShareItemEffects()
})

// Import QRCode library
const QRCode = require("qrcode")

// Generate QR code
function generateQRCode() {
  const qrCodeElement = document.getElementById("qrcode")
  if (!qrCodeElement) return

  // Generate QR code
  QRCode.toCanvas(qrCodeElement, window.location.href, {
    width: 150,
    margin: 1,
    color: {
      dark: "#000000",
      light: "#ffffff",
    },
  })
}

// Initialize share functionality
function initShareFunctionality() {
  const shareItems = document.querySelectorAll(".share-item")

  if (shareItems) {
    shareItems.forEach((item) => {
      item.addEventListener("click", (e) => {
        e.preventDefault()
        const platform = item.getAttribute("data-platform")
        const url = encodeURIComponent(window.location.href)
        const text = encodeURIComponent("Check out Stack Surge - A community for developers!")

        let shareUrl = ""

        switch (platform) {
          case "twitter":
            shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${text}`
            break
          case "facebook":
            shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`
            break
          case "linkedin":
            shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`
            break
          case "whatsapp":
            shareUrl = `https://wa.me/?text=${text}%20${url}`
            break
          case "telegram":
            shareUrl = `https://t.me/share/url?url=${url}&text=${text}`
            break
          case "reddit":
            shareUrl = `https://www.reddit.com/submit?url=${url}&title=${text}`
            break
          case "email":
            shareUrl = `mailto:?subject=${text}&body=${text}%20${url}`
            break
          case "hackernews":
            shareUrl = `https://news.ycombinator.com/submitlink?u=${url}&t=${text}`
            break
          case "producthunt":
            shareUrl = `https://www.producthunt.com/posts/new?url=${url}&name=Stack%20Surge&tagline=A%20community%20for%20developers`
            break
          case "copy":
            copyToClipboard(window.location.href)
            showToast("Link copied to clipboard!")
            return
        }

        if (shareUrl) {
          window.open(shareUrl, "_blank")
        }
      })
    })
  }
}

// Initialize copy link functionality
function initCopyLinkFunctionality() {
  const shareLinkCopy = document.querySelector(".share-url-copy")
  const shareLinkInput = document.querySelector(".share-url-input")

  if (shareLinkCopy && shareLinkInput) {
    shareLinkCopy.addEventListener("click", () => {
      copyToClipboard(shareLinkInput.value)

      shareLinkCopy.textContent = "Copied!"
      setTimeout(() => {
        shareLinkCopy.textContent = "Copy"
      }, 2000)
    })
  }
}

// Initialize QR code download
function initQRDownload() {
  const qrDownloadBtn = document.querySelector(".share-qr-download")
  const qrCodeElement = document.getElementById("qrcode")

  if (qrDownloadBtn && qrCodeElement) {
    qrDownloadBtn.addEventListener("click", () => {
      const canvas = qrCodeElement.querySelector("canvas")
      if (!canvas) return

      // Create a temporary link
      const link = document.createElement("a")
      link.download = "stacksurge-qrcode.png"
      link.href = canvas.toDataURL("image/png")
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    })
  }
}

// Copy text to clipboard
function copyToClipboard(text) {
  // Create a temporary input
  const tempInput = document.createElement("input")
  tempInput.value = text
  document.body.appendChild(tempInput)

  // Select and copy
  tempInput.select()
  document.execCommand("copy")

  // Remove the temporary input
  document.body.removeChild(tempInput)
}

// Show toast notification
function showToast(message) {
  // Check if toast container exists, if not create it
  let toastContainer = document.querySelector(".toast-container")
  if (!toastContainer) {
    toastContainer = document.createElement("div")
    toastContainer.className = "toast-container"
    document.body.appendChild(toastContainer)

    // Add styles
    const style = document.createElement("style")
    style.textContent = `
      .toast-container {
        position: fixed;
        bottom: 20px;
        right: 20px;
        z-index: 9999;
      }
      .toast {
        background-color: var(--card);
        color: var(--foreground);
        padding: 12px 20px;
        border-radius: var(--radius);
        margin-top: 10px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        gap: 10px;
        border-left: 4px solid var(--primary);
        animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s;
        opacity: 0;
        transform: translateX(100%);
      }
      @keyframes slideIn {
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }
      @keyframes fadeOut {
        to {
          opacity: 0;
          transform: translateX(100%);
        }
      }
    `
    document.head.appendChild(style)
  }

  // Create toast
  const toast = document.createElement("div")
  toast.className = "toast"
  toast.innerHTML = `<i class="fas fa-check-circle" style="color: var(--primary);"></i> ${message}`
  toastContainer.appendChild(toast)

  // Remove toast after animation
  setTimeout(() => {
    toastContainer.removeChild(toast)
  }, 3000)
}

// Add hover effects to share items
function addShareItemEffects() {
  const shareItems = document.querySelectorAll(".share-item")

  if (shareItems) {
    shareItems.forEach((item) => {
      item.addEventListener("mouseenter", () => {
        const icon = item.querySelector(".share-icon")
        if (icon) {
          icon.style.transform = "scale(1.1)"
        }
      })

      item.addEventListener("mouseleave", () => {
        const icon = item.querySelector(".share-icon")
        if (icon) {
          icon.style.transform = ""
        }
      })
    })
  }
}
