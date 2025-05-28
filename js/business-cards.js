// Business Cards Page JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeCardCustomizer()
  initializeTemplateGallery()
  initializeFAQAccordion()
  initializeTestimonialSlider()
  initializeFloatingCards()
})

// Card Customizer
function initializeCardCustomizer() {
  const optionChoices = document.querySelectorAll(".option-choice")
  const previewImage = document.querySelector(".preview-canvas img")
  const previewPrice = document.querySelector(".preview-price")

  // Base price
  const basePrice = 7500
  const currentOptions = {
    type: "standard",
    paper: "350gsm",
    finish: "matte",
    quantity: 100,
    color: "full-color",
  }

  // Price modifiers
  const priceModifiers = {
    type: {
      standard: 0,
      premium: 5000,
      luxury: 10000,
    },
    paper: {
      "300gsm": 0,
      "350gsm": 500,
      "400gsm": 1000,
    },
    finish: {
      matte: 0,
      gloss: 500,
      "soft-touch": 1500,
      "spot-uv": 2500,
    },
    quantity: {
      100: 0,
      250: 5000,
      500: 8000,
      1000: 12000,
    },
    color: {
      "full-color": 0,
      "black-white": -1000,
      "spot-color": 1500,
    },
  }

  // Preview images
  const previewImages = {
    standard: {
      matte: "images/preview-standard-matte.jpg",
      gloss: "images/preview-standard-gloss.jpg",
      "soft-touch": "images/preview-standard-soft-touch.jpg",
      "spot-uv": "images/preview-standard-spot-uv.jpg",
    },
    premium: {
      matte: "images/preview-premium-matte.jpg",
      gloss: "images/preview-premium-gloss.jpg",
      "soft-touch": "images/preview-premium-soft-touch.jpg",
      "spot-uv": "images/preview-premium-spot-uv.jpg",
    },
    luxury: {
      matte: "images/preview-luxury-matte.jpg",
      gloss: "images/preview-luxury-gloss.jpg",
      "soft-touch": "images/preview-luxury-soft-touch.jpg",
      "spot-uv": "images/preview-luxury-spot-uv.jpg",
    },
  }

  optionChoices.forEach((choice) => {
    choice.addEventListener("click", () => {
      // Get option group and value
      const optionGroup = choice.closest(".customizer-option").dataset.option
      const optionValue = choice.dataset.value

      // Remove selected class from all choices in the same group
      const groupChoices = choice.closest(".option-choices").querySelectorAll(".option-choice")
      groupChoices.forEach((c) => c.classList.remove("selected"))

      // Add selected class to clicked choice
      choice.classList.add("selected")

      // Update current options
      currentOptions[optionGroup] = optionValue

      // Update preview
      updatePreview()
    })
  })

  function updatePreview() {
    // Update preview image
    if (
      previewImage &&
      previewImages[currentOptions.type] &&
      previewImages[currentOptions.type][currentOptions.finish]
    ) {
      previewImage.src = previewImages[currentOptions.type][currentOptions.finish]
    }

    // Calculate price
    let totalPrice = basePrice

    for (const [option, value] of Object.entries(currentOptions)) {
      if (priceModifiers[option] && priceModifiers[option][value] !== undefined) {
        totalPrice += priceModifiers[option][value]
      }
    }

    // Update price display
    if (previewPrice) {
      previewPrice.innerHTML = `₦${totalPrice.toLocaleString()} <span class="price-unit">per ${currentOptions.quantity} cards</span>`
    }
  }

  // Initialize with default selections
  const defaultChoices = document.querySelectorAll(".option-choice.selected")
  defaultChoices.forEach((choice) => {
    const optionGroup = choice.closest(".customizer-option").dataset.option
    const optionValue = choice.dataset.value
    currentOptions[optionGroup] = optionValue
  })

  updatePreview()

  // Add to cart button
  const addToCartBtn = document.querySelector(".preview-add-to-cart")
  if (addToCartBtn) {
    addToCartBtn.addEventListener("click", () => {
      // Create product name based on options
      const productName = `${currentOptions.type.charAt(0).toUpperCase() + currentOptions.type.slice(1)} Business Cards`

      // Add to cart
      addToCart("bc-custom", productName, basePrice, currentOptions)

      // Show confirmation
      showNotification("Business cards added to cart!")
    })
  }
}

// Template Gallery
function initializeTemplateGallery() {
  const templateCards = document.querySelectorAll(".template-card")

  templateCards.forEach((card) => {
    const useTemplateBtn = card.querySelector(".use-template-btn")

    if (useTemplateBtn) {
      useTemplateBtn.addEventListener("click", (e) => {
        e.preventDefault()

        const templateId = card.dataset.templateId
        const templateName = card.querySelector(".template-name").textContent

        // Redirect to design studio with template
        window.location.href = `design-studio.html?product=business-cards&template=${templateId}`
      })
    }
  })
}

// FAQ Accordion
function initializeFAQAccordion() {
  const faqItems = document.querySelectorAll(".faq-item")

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question")

    question.addEventListener("click", () => {
      // Close all other items
      faqItems.forEach((otherItem) => {
        if (otherItem !== item && otherItem.classList.contains("active")) {
          otherItem.classList.remove("active")
        }
      })

      // Toggle current item
      item.classList.toggle("active")
    })
  })
}

// Testimonial Slider
function initializeTestimonialSlider() {
  const testimonialSlider = document.querySelector(".testimonials-slider")

  if (testimonialSlider) {
    let currentSlide = 0
    const slides = testimonialSlider.querySelectorAll(".testimonial-card")
    const totalSlides = slides.length
    const nextBtn = document.querySelector(".testimonial-next")
    const prevBtn = document.querySelector(".testimonial-prev")

    // Hide all slides except the first one
    for (let i = 1; i < totalSlides; i++) {
      slides[i].style.display = "none"
    }

    // Next button functionality
    if (nextBtn) {
      nextBtn.addEventListener("click", () => {
        slides[currentSlide].style.display = "none"
        currentSlide = (currentSlide + 1) % totalSlides
        slides[currentSlide].style.display = "block"
        slides[currentSlide].style.animation = "fadeIn 0.5s ease"
      })
    }

    // Previous button functionality
    if (prevBtn) {
      prevBtn.addEventListener("click", () => {
        slides[currentSlide].style.display = "none"
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
        slides[currentSlide].style.display = "block"
        slides[currentSlide].style.animation = "fadeIn 0.5s ease"
      })
    }
  }
}

// Floating Cards Animation
function initializeFloatingCards() {
  const floatingCards = document.querySelectorAll(".floating-card")

  floatingCards.forEach((card) => {
    // Random initial position
    const randomX = Math.random() * 10 - 5 // -5 to 5
    const randomY = Math.random() * 10 - 5 // -5 to 5
    const randomRotate = Math.random() * 10 - 5 // -5 to 5

    card.style.transform = `translate(${randomX}px, ${randomY}px) rotate(${randomRotate}deg)`

    // Animation
    setInterval(() => {
      const newX = Math.random() * 10 - 5
      const newY = Math.random() * 10 - 5
      const newRotate = Math.random() * 10 - 5

      card.style.transition = "transform 3s ease"
      card.style.transform = `translate(${newX}px, ${newY}px) rotate(${newRotate}deg)`
    }, 3000)
  })
}

// Helper function to show notifications
function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.classList.add("show")
  }, 100)

  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Add to cart function
function addToCart(productId, productName, price, options = {}) {
  // Get current cart or initialize empty cart
  const cart = JSON.parse(localStorage.getItem("kobiCart")) || []

  // Create cart item
  const cartItem = {
    id: productId,
    name: productName,
    price: price,
    quantity: 1,
    options: options,
    image: `images/${productId}.jpg`,
  }

  // Add to cart
  cart.push(cartItem)

  // Save cart
  localStorage.setItem("kobiCart", JSON.stringify(cart))

  // Update cart count in header
  updateCartCount(cart.length)
}

// Update cart count
function updateCartCount(count) {
  const cartCountElements = document.querySelectorAll(".cart-count")

  cartCountElements.forEach((element) => {
    element.textContent = count
  })
}
