document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("network-canvas")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  let width = (canvas.width = window.innerWidth)
  let height = (canvas.height = window.innerHeight)

  // Resize handler
  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth
    height = canvas.height = window.innerHeight
  })

  // Theme-aware colors
  function getThemeColors() {
    const isDark = document.body.classList.contains("dark-theme")
    return {
      particles: isDark
        ? ["#3b3b5e", "#4b4b7e", "#5b5b9e", "#6b6bbe", "#7b7bde"]
        : ["#d1d1e0", "#c1c1d0", "#b1b1c0", "#a1a1b0", "#9191a0"],
      connections: isDark ? "rgba(138, 92, 246, 0.15)" : "rgba(138, 92, 246, 0.1)",
      background: isDark ? "#0f0f1a" : "#f8f9fa",
    }
  }

  // Particles
  let particlesArray = []
  const numberOfParticles = Math.min(80, Math.floor((width * height) / 12000))
  let themeColors = getThemeColors()

  // Particle class
  class Particle {
    constructor() {
      this.x = Math.random() * width
      this.y = Math.random() * height
      this.size = Math.random() * 2 + 0.5 // Smaller particles
      this.speedX = (Math.random() - 0.5) * 0.3 // Slower movement
      this.speedY = (Math.random() - 0.5) * 0.3
      this.color = themeColors.particles[Math.floor(Math.random() * themeColors.particles.length)]
      this.opacity = Math.random() * 0.3 + 0.1 // More subtle opacity
    }

    // Update particle position
    update() {
      // Bounce off edges
      if (this.x > width || this.x < 0) this.speedX = -this.speedX
      if (this.y > height || this.y < 0) this.speedY = -this.speedY

      // Update position
      this.x += this.speedX
      this.y += this.speedY
    }

    // Draw particle
    draw() {
      ctx.beginPath()
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
      ctx.fillStyle = this.color
      ctx.globalAlpha = this.opacity
      ctx.fill()
      ctx.globalAlpha = 1
    }
  }

  // Create particles
  function init() {
    particlesArray = []
    for (let i = 0; i < numberOfParticles; i++) {
      particlesArray.push(new Particle())
    }
  }

  // Connect particles with lines
  function connect() {
    const maxDistance = 150 // Connection distance

    for (let a = 0; a < particlesArray.length; a++) {
      for (let b = a; b < particlesArray.length; b++) {
        const dx = particlesArray[a].x - particlesArray[b].x
        const dy = particlesArray[a].y - particlesArray[b].y
        const distance = Math.sqrt(dx * dx + dy * dy)

        // Only connect nodes that are close enough
        if (distance < maxDistance) {
          // Opacity based on distance - very subtle
          const opacity = 1 - distance / maxDistance
          const lineOpacity = opacity * 0.15 // Very subtle connections

          ctx.strokeStyle = themeColors.connections
          ctx.lineWidth = 0.5
          ctx.beginPath()
          ctx.moveTo(particlesArray[a].x, particlesArray[a].y)
          ctx.lineTo(particlesArray[b].x, particlesArray[b].y)
          ctx.stroke()
        }
      }
    }
  }

  // Animation loop
  function animate() {
    ctx.fillStyle = themeColors.background
    ctx.fillRect(0, 0, width, height)

    // Update and draw particles
    for (let i = 0; i < particlesArray.length; i++) {
      particlesArray[i].update()
      particlesArray[i].draw()
    }

    // Connect particles
    connect()

    // Request next frame
    requestAnimationFrame(animate)
  }

  // Theme change observer
  const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
      if (mutation.attributeName === "class") {
        themeColors = getThemeColors()
      }
    })
  })

  observer.observe(document.body, { attributes: true })

  // Initialize and start animation
  init()
  animate()
})
