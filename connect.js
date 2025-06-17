document.addEventListener("DOMContentLoaded", () => {
  // Create animated particles for connect hero section
  createConnectHeroParticles()

  // Initialize share functionality
  initShareFunctionality()

  // Initialize copy link functionality
  initCopyLinkFunctionality()

  // Initialize email button
  initEmailButton()

  // Add hover effects to social cards
  addSocialCardEffects()
})

// Create animated particles for connect hero section
function createConnectHeroParticles() {
  const connectParticles = document.querySelector(".connect-particles")
  if (!connectParticles) return

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("span")
    particle.className = "connect-particle"

    // Random position
    const posX = Math.random() * 100
    const posY = Math.random() * 100

    // Random size
    const size = Math.random() * 4 + 1

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1

    // Random animation duration
    const duration = Math.random() * 20 + 10

    // Random delay
    const delay = Math.random() * 5

    // Random color
    const colors = ["var(--primary)", "var(--secondary)", "var(--accent)"]
    const color = colors[Math.floor(Math.random() * colors.length)]

    // Set styles
    particle.style.cssText = `
      position: absolute;
      top: ${posY}%;
      left: ${posX}%;
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border-radius: 50%;
      opacity: ${opacity};
      animation: floatParticle ${duration}s infinite ease-in-out;
      animation-delay: -${delay}s;
      box-shadow: 0 0 ${size * 2}px ${color};
      z-index: 0;
    `

    connectParticles.appendChild(particle)
  }

  // Add keyframes for particle animation
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      @keyframes floatParticle {
        0%, 100% {
          transform: translate(0, 0);
        }
        25% {
          transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
        50% {
          transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
        75% {
          transform: translate(${Math.random() * 30 - 15}px, ${Math.random() * 30 - 15}px);
        }
      }
    </style>`,
  )
}

// Initialize share functionality
function initShareFunctionality() {
  const shareOptions = document.querySelectorAll(".share-option-card")

  if (shareOptions) {
    shareOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const platform = option.getAttribute("data-platform")
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
          case "copy":
            copyToClipboard(window.location.href)
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
  const shareLinkCopy = document.querySelector(".share-link-copy")
  const shareLinkInput = document.querySelector(".share-link-input")

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

// Initialize email button
function initEmailButton() {
  const emailCta = document.querySelector(".email-cta")
  if (emailCta) {
    emailCta.addEventListener("click", () => {
      window.location.href = "mailto:sayhi.us@outlook.com"
    })
  }
}

// Add hover effects to social cards
function addSocialCardEffects() {
  const socialCards = document.querySelectorAll(".social-card-large")

  if (socialCards) {
    socialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        const icon = card.querySelector(".social-icon-large")
        if (icon) {
          icon.style.transform = "scale(1.1) rotate(5deg)"
        }
      })

      card.addEventListener("mouseleave", () => {
        const icon = card.querySelector(".social-icon-large")
        if (icon) {
          icon.style.transform = ""
        }
      })
    })
  }
}
