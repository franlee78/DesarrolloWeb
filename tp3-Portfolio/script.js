// Variables globales
const hamburger = document.getElementById("hamburger")
const navMenu = document.getElementById("nav-menu")
const contactForm = document.getElementById("contact-form")

// Navegación móvil
if (hamburger && navMenu) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active")
    hamburger.classList.toggle("active")
  })

  // Cerrar menú al hacer click en un enlace
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("active")
      hamburger.classList.remove("active")
    })
  })
}

// Smooth scroll para navegación
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Reemplazar la sección de animación de barras de habilidades con este código mejorado:

// Animación de barras de habilidades mejorada
const observerOptions = {
  threshold: 0.3,
  rootMargin: "0px 0px -50px 0px",
}

const skillsObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const skillBars = entry.target.querySelectorAll(".skill-progress")
      skillBars.forEach((bar, index) => {
        setTimeout(() => {
          const width = bar.getAttribute("data-width")
          bar.style.width = width + "%"
          bar.style.opacity = "1"
        }, index * 200) // Animación escalonada
      })
      // Desconectar el observer después de animar
      skillsObserver.unobserve(entry.target)
    }
  })
}, observerOptions)

// Observar sección de habilidades
const skillsSection = document.querySelector("#habilidades")
if (skillsSection) {
  skillsObserver.observe(skillsSection)
}

// Función de respaldo para animar las barras si el observer no funciona
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  skillBars.forEach((bar, index) => {
    setTimeout(() => {
      const width = bar.getAttribute("data-width")
      bar.style.width = width + "%"
      bar.style.opacity = "1"
    }, index * 200)
  })
}

// Activar animación después de 2 segundos como respaldo
setTimeout(() => {
  const skillBars = document.querySelectorAll(".skill-progress")
  const hasAnimated = Array.from(skillBars).some((bar) => bar.style.width !== "0%")
  if (!hasAnimated) {
    animateSkillBars()
  }
}, 2000)

// Formulario de contacto
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault()

    // Obtener datos del formulario
    const formData = new FormData(this)
    const nombre = formData.get("nombre")
    const email = formData.get("email")
    const mensaje = formData.get("mensaje")

    // Validación básica
    if (!nombre || !email || !mensaje) {
      showNotification("Por favor, completa todos los campos", "error")
      return
    }

    if (!isValidEmail(email)) {
      showNotification("Por favor, ingresa un email válido", "error")
      return
    }

    // Simular envío
    const submitBtn = this.querySelector('button[type="submit"]')
    const originalText = submitBtn.textContent

    submitBtn.textContent = "Enviando..."
    submitBtn.disabled = true

    setTimeout(() => {
      showNotification("¡Mensaje enviado correctamente!", "success")
      this.reset()
      submitBtn.textContent = originalText
      submitBtn.disabled = false
    }, 2000)
  })
}

// Función para validar email
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

// Sistema de notificaciones
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <span>${message}</span>
    <button class="notification-close">&times;</button>
  `

  // Estilos
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === "success" ? "#4caf50" : type === "error" ? "#f44336" : "#2196f3"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 5px;
    box-shadow: 0 4px 20px rgba(0,0,0,0.1);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 400px;
    animation: slideInRight 0.3s ease;
  `

  const closeBtn = notification.querySelector(".notification-close")
  closeBtn.style.cssText = `
    background: none;
    border: none;
    color: white;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0;
    margin-left: auto;
  `

  document.body.appendChild(notification)

  closeBtn.addEventListener("click", () => {
    notification.remove()
  })

  setTimeout(() => {
    if (notification.parentNode) {
      notification.remove()
    }
  }, 5000)
}

// Agregar estilos de animación
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`
document.head.appendChild(notificationStyles)

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  console.log("Portfolio de Francisco Lee cargado correctamente")
})
