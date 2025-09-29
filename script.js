document.addEventListener("DOMContentLoaded", () => {
  // Initialize theme
  initializeTheme()

  // Toggle dark/light mode
  const toggleBtn = document.getElementById("toggleTheme")
  if (toggleBtn) {
    toggleBtn.addEventListener("click", toggleTheme)
  }

  // Contact actions
  initializeContactActions()

  // Add scroll animations
  initializeScrollAnimations()

  // Add loading animation
  addLoadingAnimation()
})

function initializeTheme() {
  const savedTheme = localStorage.getItem("theme")
  const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

  if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
    document.body.classList.add("dark")
    updateThemeButton(true)
  } else {
    updateThemeButton(false)
  }
}

function toggleTheme() {
  const isDark = document.body.classList.toggle("dark")
  updateThemeButton(isDark)
  localStorage.setItem("theme", isDark ? "dark" : "light")

  // Add smooth transition effect
  document.body.style.transition = "all 0.3s ease"
  setTimeout(() => {
    document.body.style.transition = ""
  }, 300)
}

function updateThemeButton(isDark) {
  const toggleBtn = document.getElementById("toggleTheme")
  if (toggleBtn) {
    const icon = toggleBtn.querySelector("i")
    const text = toggleBtn.querySelector("span")

    if (isDark) {
      icon.className = "fas fa-sun"
      text.textContent = "Claro"
    } else {
      icon.className = "fas fa-moon"
      text.textContent = "Oscuro"
    }
  }
}

function initializeContactActions() {
  const actions = {
    location: () => {
      if (navigator.geolocation) {
        showNotification("📍 Ubicación: Rosario, Santa Fe, Argentina", "info")
      } else {
        alert("Ubicación: Rosario, Santa Fe, Argentina")
      }
    },
    github: () => {
      window.open("https://github.com/JeffryQuispe", "_blank")
      showNotification("🚀 Abriendo GitHub...", "success")
    },
    email: () => {
      const email = "Jeffry2001q@gmail.com"
      if (navigator.clipboard) {
        navigator.clipboard.writeText(email).then(() => {
          showNotification("📧 Email copiado al portapapeles", "success")
        })
      }
      window.open(`mailto:${email}`)
    },
    linkedin: () => {
      window.open("https://www.linkedin.com/in/jeffry-quispe/", "_blank")
      showNotification("💼 Abriendo LinkedIn...", "success")
    },
  }

  document.querySelectorAll(".contact-item .icon-glass i").forEach((icon) => {
    icon.addEventListener("click", (e) => {
      e.preventDefault()
      const action = icon.dataset.action
      if (actions[action]) {
        actions[action]()

        // Add click animation
        const iconContainer = icon.closest(".icon-glass")
        iconContainer.style.transform = "scale(0.95)"
        setTimeout(() => {
          iconContainer.style.transform = ""
        }, 150)
      }
    })
  })
}

function initializeScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1"
        entry.target.style.transform = "translateY(0)"
      }
    })
  }, observerOptions)

  // Observe all cards and items
  document.querySelectorAll(".card, .skill-item, .experience-item, .education-item").forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(20px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
}

function addLoadingAnimation() {
  // Add stagger animation to skills
  const skillItems = document.querySelectorAll(".skill-item")
  skillItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.1}s`
    item.classList.add("fade-in-up")
  })

  // Add animation to experience and education items
  const experienceItems = document.querySelectorAll(".experience-item, .education-item")
  experienceItems.forEach((item, index) => {
    item.style.animationDelay = `${index * 0.2}s`
    item.classList.add("fade-in-left")
  })
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.textContent = message

  // Style the notification
  Object.assign(notification.style, {
    position: "fixed",
    top: "20px",
    right: "20px",
    padding: "12px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500",
    fontSize: "14px",
    zIndex: "1000",
    transform: "translateX(100%)",
    transition: "transform 0.3s ease",
    maxWidth: "300px",
    wordWrap: "break-word",
  })

  // Set background color based on type
  const colors = {
    info: "#3b82f6",
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
  }
  notification.style.backgroundColor = colors[type] || colors.info

  // Add to DOM
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Remove after delay
  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Add CSS animations
const style = document.createElement("style")
style.textContent = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes fadeInLeft {
    from {
      opacity: 0;
      transform: translateX(-30px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  .fade-in-up {
    animation: fadeInUp 0.6s ease forwards;
  }
  
  .fade-in-left {
    animation: fadeInLeft 0.6s ease forwards;
  }
`
document.head.appendChild(style)

// Handle system theme changes
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (e) => {
  if (!localStorage.getItem("theme")) {
    if (e.matches) {
      document.body.classList.add("dark")
      updateThemeButton(true)
    } else {
      document.body.classList.remove("dark")
      updateThemeButton(false)
    }
  }
})
