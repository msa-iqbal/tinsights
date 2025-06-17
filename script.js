document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const body = document.body;
  const themeToggle = document.querySelector(".theme-toggle");
  const menuToggle = document.querySelector(".menu-toggle");
  const header = document.querySelector("header");
  const backToTopBtn = document.getElementById("back-to-top");
  const codeEditor = document.querySelector(".code-editor");
  const codeBlock = document.querySelector(".editor-body code");
  const socialCards = document.querySelectorAll(".social-card");
  const navLinks = document.querySelectorAll(".nav-links a");
  const shareButton = document.querySelector(".share-btn");

  // Add background pattern element
  const bgPattern = document.createElement("div");
  bgPattern.className = "bg-pattern";
  document.body.appendChild(bgPattern);

  // Check for saved theme preference or use default
  const savedTheme = localStorage.getItem("theme") || "dark-theme";

  // Apply the saved theme
  if (savedTheme === "light-theme") {
    body.classList.remove("dark-theme");
    body.classList.add("light-theme");
  } else {
    body.classList.add("dark-theme");
    body.classList.remove("light-theme");
  }

  // Theme Toggle - Fixed
  themeToggle.addEventListener("click", () => {
    if (body.classList.contains("dark-theme")) {
      body.classList.remove("dark-theme");
      body.classList.add("light-theme");
      localStorage.setItem("theme", "light-theme");
    } else {
      body.classList.add("dark-theme");
      body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark-theme");
    }
  });

  // Mobile Menu Toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", () => {
      menuToggle.classList.toggle("active");

      // Create mobile menu if it doesn't exist
      let mobileMenu = document.querySelector(".mobile-menu");
      if (!mobileMenu) {
        mobileMenu = document.createElement("div");
        mobileMenu.className = "mobile-menu";

        // Clone navigation links
        const navLinks = document.querySelector(".nav-links").cloneNode(true);
        mobileMenu.appendChild(navLinks);

        // Add join button
        const joinBtn = document.createElement("button");
        joinBtn.className = "primary-btn join-btn";
        joinBtn.textContent = "Join Community";
        mobileMenu.appendChild(joinBtn);

        document.body.appendChild(mobileMenu);
      }

      mobileMenu.classList.toggle("active");

      // Prevent scrolling when menu is open
      if (mobileMenu.classList.contains("active")) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "";
      }
    });
  }

  // Back to Top Button
  window.addEventListener("scroll", () => {
    if (window.scrollY > 500) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }

    // Header shadow on scroll
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Social cards hover effect
  if (socialCards) {
    socialCards.forEach((card) => {
      card.addEventListener("mouseenter", () => {
        card.style.transform = "translateY(-10px)";
      });

      card.addEventListener("mouseleave", () => {
        card.style.transform = "";
      });
    });
  }

  // Active navigation link
  navLinks.forEach((link) => {
    // Check if the link's href matches the current page URL
    if (
      link.href === window.location.href ||
      (link.getAttribute("href") === "#home" &&
        (window.location.pathname === "/" ||
          window.location.pathname === "/index.html"))
    ) {
      link.classList.add("active");
    }

    // For hash links, add click event listener
    if (link.getAttribute("href").startsWith("#")) {
      link.addEventListener("click", function (e) {
        // Remove active class from all links
        navLinks.forEach((l) => l.classList.remove("active"));
        // Add active class to clicked link
        this.classList.add("active");
      });
    }
  });

  // Share button functionality
  if (shareButton) {
    shareButton.addEventListener("click", async () => {
      try {
        if (navigator.share) {
          await navigator.share({
            title: "Stack Surge",
            text: "Check out Stack Surge - A developer community",
            url: window.location.href,
          });
        } else {
          // Fallback for browsers that don't support Web Share API
          const shareModal = document.querySelector(".share-modal");
          if (shareModal) {
            shareModal.classList.add("active");
          }
        }
      } catch (error) {
        console.error("Error sharing:", error);
      }
    });
  }

  // Create animated background particles for connect section
  createConnectParticles();

  // Animate Tech Icons
  animateTechIcons();

  // Enhance code block with typing animation
  enhanceCodeBlock();

  // Code Editor Typing Animation
  if (codeBlock) {
    const originalText = codeBlock.textContent;

    // Apply syntax highlighting
    const highlightedCode = originalText
      .replace(
        /\b(class|constructor|function|return|if|const|let|var|new|this)\b/g,
        '<span class="keyword">$1</span>'
      )
      .replace(/(['"])(?:\\.|[^\\])*?\1/g, '<span class="string">$&</span>')
      .replace(
        /\b(joinCommunity|createProject|scheduleEvent|generateId)\b/g,
        '<span class="function">$1</span>'
      )
      .replace(/\/\/.*/g, '<span class="comment">$&</span>')
      .replace(/\b(StackSurge)\b/g, '<span class="class">$1</span>');

    // Apply typing animation
    codeBlock.innerHTML = "";
    let i = 0;
    const speed = 20; // typing speed

    function typeWriter() {
      if (i < highlightedCode.length) {
        // Handle HTML tags properly
        if (highlightedCode.charAt(i) === "<") {
          // Find the closing bracket
          const closeIndex = highlightedCode.indexOf(">", i);
          if (closeIndex !== -1) {
            codeBlock.innerHTML += highlightedCode.substring(i, closeIndex + 1);
            i = closeIndex + 1;
          } else {
            codeBlock.innerHTML += highlightedCode.charAt(i);
            i++;
          }
        } else {
          codeBlock.innerHTML += highlightedCode.charAt(i);
          i++;
        }
        setTimeout(typeWriter, speed);
      } else {
        // After typing is complete, add a blinking cursor
        const cursor = document.createElement("span");
        cursor.className = "typing-cursor";
        cursor.innerHTML = "|";
        cursor.style.animation = "blink 1s infinite";
        codeBlock.appendChild(cursor);
      }
    }

    // Start typing animation when code editor is in viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              typeWriter();
            }, 500);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (codeEditor) {
      observer.observe(codeEditor);
    }
  }

  // Scroll Reveal Animation
  const revealElements = document.querySelectorAll(
    ".section-header, .feature-card, .event-card, .project-card, .member-card, .social-card, .connect-email-card, .connect-newsletter"
  );

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1 }
  );

  revealElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
    revealObserver.observe(el);
  });

  // Add revealed class
  document.head.insertAdjacentHTML(
    "beforeend",
    `<style>
      .revealed {
        opacity: 1 !important;
        transform: translateY(0) !important;
      }
    </style>`
  );

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });

  // Email CTA button
  const emailCta = document.querySelector(".email-cta");
  if (emailCta) {
    emailCta.addEventListener("click", () => {
      window.location.href = "mailto:sayhi.us@outlook.com";
    });
  }
});

// Create animated particles for connect section
function createConnectParticles() {
  const connectParticles = document.querySelector(".connect-particles");
  if (!connectParticles) return;

  // Create particles
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("span");
    particle.className = "connect-particle";

    // Random position
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;

    // Random size
    const size = Math.random() * 4 + 1;

    // Random opacity
    const opacity = Math.random() * 0.5 + 0.1;

    // Random animation duration
    const duration = Math.random() * 20 + 10;

    // Random delay
    const delay = Math.random() * 5;

    // Random color
    const colors = ["var(--primary)", "var(--secondary)", "var(--accent)"];
    const color = colors[Math.floor(Math.random() * colors.length)];

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
    `;

    connectParticles.appendChild(particle);
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
          transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px);
        }
        50% {
          transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px);
        }
        75% {
          transform: translate(${Math.random() * 30 - 15}px, ${
      Math.random() * 30 - 15
    }px);
        }
      }
    </style>`
  );
}

// Animate Tech Icons
function animateTechIcons() {
  const techIcons = document.querySelectorAll(".tech-item");

  techIcons.forEach((icon, index) => {
    // Add animation with staggered delay
    icon.style.animation = `fadeInUp 0.5s ease-out ${index * 0.1}s forwards`;
    icon.style.opacity = "0";
    icon.style.transform = "translateY(20px)";

    // Add floating animation
    const iconElement = icon.querySelector("i");
    if (iconElement) {
      iconElement.style.animation = `float ${
        3 + Math.random() * 2
      }s ease-in-out infinite ${Math.random() * 2}s`;
    }
  });
}

// Enhance code block with typing animation
function enhanceCodeBlock() {
  const codeBlock = document.querySelector(".code-block pre code");
  if (!codeBlock) return;

  const originalText = codeBlock.textContent;

  // Define colors for different code elements
  const colors = {
    keyword: "#ff79c6",
    string: "#f1fa8c",
    function: "#50fa7b",
    comment: "#6272a4",
    variable: "#bd93f9",
    operator: "#ff79c6",
    number: "#bd93f9",
    property: "#8be9fd",
    className: "#8be9fd",
  };

  // Enhanced syntax highlighting with more colors
  const highlightedCode = originalText
    .replace(
      /\b(class|constructor|function|return|if|const|let|var|new|this)\b/g,
      `<span style="color: ${colors.keyword}; font-weight: bold;">$1</span>`
    )
    .replace(
      /(['"])(?:\\.|[^\\])*?\1/g,
      `<span style="color: ${colors.string};">$&</span>`
    )
    .replace(
      /\b(validateDeveloper|addSkill|buildProject|joinCommunity)\b/g,
      `<span style="color: ${colors.function};">$1</span>`
    )
    .replace(/\/\/.*/g, `<span style="color: ${colors.comment};">$&</span>`)
    .replace(
      /\b(skills|community|learning|members|success|passion|willingness)\b/g,
      `<span style="color: ${colors.variable};">$1</span>`
    )
    .replace(
      /\b(true|false|null|undefined)\b/g,
      `<span style="color: ${colors.number};">$1</span>`
    )
    .replace(
      /\b(StackSurge|Project)\b/g,
      `<span style="color: ${colors.className};">$1</span>`
    )
    .replace(
      /(\{|\}|$$|$$|\[|\]|;|,|\.|\+|-|\*|\/|=|!|&lt;|&gt;)/g,
      `<span style="color: ${colors.operator};">$1</span>`
    );

  // Apply typing animation
  codeBlock.innerHTML = "";
  let i = 0;
  const speed = 15; // typing speed

  function typeWriter() {
    if (i < highlightedCode.length) {
      // Handle HTML tags properly
      if (highlightedCode.charAt(i) === "<") {
        // Find the closing bracket
        const closeIndex = highlightedCode.indexOf(">", i);
        if (closeIndex !== -1) {
          codeBlock.innerHTML += highlightedCode.substring(i, closeIndex + 1);
          i = closeIndex + 1;
        } else {
          codeBlock.innerHTML += highlightedCode.charAt(i);
          i++;
        }
      } else {
        codeBlock.innerHTML += highlightedCode.charAt(i);
        i++;
      }
      setTimeout(typeWriter, speed);
    } else {
      // After typing is complete, add a blinking cursor
      const cursor = document.createElement("span");
      cursor.className = "typing-cursor";
      cursor.innerHTML = "|";
      cursor.style.animation = "blink 1s infinite";
      codeBlock.appendChild(cursor);
    }
  }

  // Start typing animation when code block is in viewport
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            typeWriter();
          }, 500); // Slight delay before typing starts
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  observer.observe(codeBlock);
}

// Add keyframes for animations
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
    
    @keyframes pulse {
        from {
            transform: scale(1);
            filter: brightness(1);
        }
        to {
            transform: scale(1.2);
            filter: brightness(1.5);
        }
    }
    
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0);
        }
        25% {
            transform: translate(5px, -5px);
        }
        50% {
            transform: translate(0px, -10px);
        }
        75% {
            transform: translate(-5px, -5px);
        }
    }
    
    @keyframes blink {
        0%, 100% {
            opacity: 1;
        }
        50% {
            opacity: 0;
        }
    }
    
    .typing-cursor {
        color: #50fa7b;
        font-weight: bold;
        margin-left: 2px;
    }
    
    .mobile-menu-close {
        position: absolute;
        top: 20px;
        right: 20px;
        background: none;
        border: none;
        color: var(--primary-color);
        font-size: 2.5rem;
        cursor: pointer;
    }
    
    .mobile-menu {
        padding-top: 60px;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100vh;
        background-color: var(--background);
        z-index: 99;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 2rem;
        transform: translateX(-100%);
        transition: transform 0.3s ease;
    }
    
    .mobile-menu.active {
        transform: translateX(0);
    }
    
    .mobile-menu .nav-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        text-align: center;
    }
    
    .mobile-menu .join-btn {
        margin-top: 1rem;
    }
    
    .scrolled {
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    }
`;
document.head.appendChild(styleSheet);

// Update logo based on theme
/* document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("themeLogo");
  if (!logo) return;

  // Detect if we're on a subpage (about.html, etc.)
  const isSubPage = window.location.pathname.includes("/pages/");

  function setLogoByTheme() {
    const isDark = document.body.classList.contains("dark-mode");
    const basePath = isSubPage ? "../public/images/" : "./public/images/";
    logo.src = isDark
      ? basePath + "white-logo.svg"
      : basePath + "black-logo.svg";
  }

  // Initial set
  setLogoByTheme();

  // Listen for theme changes
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTimeout(setLogoByTheme, 10); // Wait for class to update
    });
  }
});
 */

// Update logo based on theme
document.addEventListener("DOMContentLoaded", function () {
  const logo = document.getElementById("themeLogo");
  if (!logo) return;

  // Detect if we're on a subpage (about.html, etc.)
  const isSubPage = window.location.pathname.includes("/pages/");

  function setLogoByTheme() {
    // Support both "dark-theme"/"light-theme" and "dark-mode"/"light-mode"
    const isDark =
      document.body.classList.contains("dark-theme") ||
      document.body.classList.contains("dark-mode");
    const basePath = isSubPage ? "../public/images/" : "./public/images/";
    logo.src = isDark
      ? basePath + "white-logo.svg"
      : basePath + "black-logo.svg";
  }

  // Initial set
  setLogoByTheme();

  // Listen for theme changes (support both #themeToggle and .theme-toggle)
  const themeToggle =
    document.getElementById("themeToggle") ||
    document.querySelector(".theme-toggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      setTimeout(setLogoByTheme, 10); // Wait for class to update
    });
  }

  // Also listen for storage events (theme changed in another tab)
  window.addEventListener("storage", function (e) {
    if (e.key === "theme") setLogoByTheme();
  });

  // Optionally, observe body class changes (for programmatic theme changes)
  const observer = new MutationObserver(setLogoByTheme);
  observer.observe(document.body, {
    attributes: true,
    attributeFilter: ["class"],
  });
});
