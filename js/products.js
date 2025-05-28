// Products page functionality

document.addEventListener("DOMContentLoaded", () => {
  initializeProductFilters()
  initializeQuickView()
  initializeBulkPricing()
  initializeTemplateSelection()
  initializeProductComparison()
  initializeProductSearch()
  initializeWishlist()
})

// Product Filtering
function initializeProductFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const productCards = document.querySelectorAll(".product-card")

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter products
      productCards.forEach((card) => {
        const category = card.dataset.category

        if (filter === "all" || category === filter) {
          card.style.display = "block"
          card.style.animation = "fadeIn 0.5s ease"
        } else {
          card.style.display = "none"
        }
      })
    })
  })
}

// Quick View Modal
function initializeQuickView() {
  const quickViewBtns = document.querySelectorAll(".quick-view-btn")

  quickViewBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productCard = btn.closest(".product-card")
      const productName = productCard.querySelector(".product-name").textContent
      const productImage = productCard.querySelector(".product-image img").src
      const productPrice = productCard.querySelector(".price").textContent
      const productDescription = productCard.querySelector(".product-description").textContent

      showQuickViewModal({
        name: productName,
        image: productImage,
        price: productPrice,
        description: productDescription,
      })
    })
  })
}

function showQuickViewModal(product) {
  const modal = document.createElement("div")
  modal.className = "quick-view-modal"
  modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <div class="modal-body">
                <div class="modal-image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="modal-details">
                    <h3 class="modal-title">${product.name}</h3>
                    <p class="modal-description">${product.description}</p>
                    <div class="modal-price">${product.price}</div>
                    <div class="modal-actions">
                        <button class="btn btn-primary" onclick="addToCart('quick-${Date.now()}', '${product.name}', '${product.price}')">
                            Add to Cart
                        </button>
                        <button class="btn btn-outline" onclick="closeQuickView()">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    `

  document.body.appendChild(modal)

  // Close modal functionality
  const closeBtn = modal.querySelector(".modal-close")
  const overlay = modal.querySelector(".modal-overlay")

  closeBtn.addEventListener("click", () => closeQuickView())
  overlay.addEventListener("click", () => closeQuickView())

  // Prevent body scroll
  document.body.style.overflow = "hidden"
}

function closeQuickView() {
  const modal = document.querySelector(".quick-view-modal")
  if (modal) {
    document.body.removeChild(modal)
    document.body.style.overflow = ""
  }
}

// Bulk Pricing Calculator
function initializeBulkPricing() {
  const quantityInputs = document.querySelectorAll(".quantity-input")

  quantityInputs.forEach((input) => {
    input.addEventListener("input", (e) => {
      const quantity = Number.parseInt(e.target.value) || 1
      const priceElement = input.closest(".product-card").querySelector(".price")
      const basePrice = Number.parseFloat(
        priceElement.dataset.basePrice || priceElement.textContent.replace("₦", "").replace(",", ""),
      )

      const discount = calculateBulkDiscount(quantity)
      const discountedPrice = basePrice * (1 - discount)

      priceElement.textContent = `₦${discountedPrice.toLocaleString()}`

      // Show discount badge if applicable
      showDiscountBadge(input.closest(".product-card"), discount)
    })
  })
}

function calculateBulkDiscount(quantity) {
  if (quantity >= 500) return 0.2 // 20% discount
  if (quantity >= 200) return 0.15 // 15% discount
  if (quantity >= 50) return 0.1 // 10% discount
  return 0 // No discount
}

function showDiscountBadge(productCard, discount) {
  // Remove existing discount badge
  const existingBadge = productCard.querySelector(".discount-badge")
  if (existingBadge) {
    existingBadge.remove()
  }

  if (discount > 0) {
    const badge = document.createElement("div")
    badge.className = "discount-badge"
    badge.textContent = `${Math.round(discount * 100)}% OFF`

    const productImage = productCard.querySelector(".product-image")
    productImage.appendChild(badge)
  }
}

// Template Selection
function initializeTemplateSelection() {
  const templateThumbs = document.querySelectorAll(".template-thumb")

  templateThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Remove active class from all thumbnails
      templateThumbs.forEach((t) => t.classList.remove("selected"))

      // Add active class to clicked thumbnail
      thumb.classList.add("selected")

      // Get template data
      const templateId = thumb.dataset.templateId
      const templateName = thumb.dataset.templateName

      // Update design canvas or redirect to design studio
      if (templateId) {
        window.location.href = `design-studio.html?template=${templateId}`
      }
    })
  })
}

// Product Comparison
function initializeProductComparison() {
  const compareCheckboxes = document.querySelectorAll(".compare-checkbox")
  const compareBtn = document.getElementById("compareBtn")
  let selectedProducts = []

  compareCheckboxes.forEach((checkbox) => {
    checkbox.addEventListener("change", (e) => {
      const productCard = e.target.closest(".product-card")
      const productId = productCard.dataset.productId

      if (e.target.checked) {
        if (selectedProducts.length < 3) {
          selectedProducts.push(productId)
        } else {
          e.target.checked = false
          alert("You can compare up to 3 products at a time.")
        }
      } else {
        selectedProducts = selectedProducts.filter((id) => id !== productId)
      }

      // Update compare button
      if (compareBtn) {
        compareBtn.style.display = selectedProducts.length > 1 ? "block" : "none"
        compareBtn.textContent = `Compare (${selectedProducts.length})`
      }
    })
  })

  if (compareBtn) {
    compareBtn.addEventListener("click", () => {
      if (selectedProducts.length > 1) {
        window.location.href = `compare.html?products=${selectedProducts.join(",")}`
      }
    })
  }
}

// Product Search and Sort
function initializeProductSearch() {
  const searchInput = document.getElementById("productSearch")
  const sortSelect = document.getElementById("productSort")

  // Declare debounce function
  function debounce(func, wait) {
    let timeout
    return function (...args) {
      
      clearTimeout(timeout)
      timeout = setTimeout(() => func.apply(this, args), wait)
    }
  }

  if (searchInput) {
    searchInput.addEventListener(
      "input",
      debounce((e) => {
        const searchTerm = e.target.value.toLowerCase()
        filterProductsBySearch(searchTerm)
      }, 300),
    )
  }

  if (sortSelect) {
    sortSelect.addEventListener("change", (e) => {
      sortProducts(e.target.value)
    })
  }
}

function filterProductsBySearch(searchTerm) {
  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const productName = card.querySelector(".product-name").textContent.toLowerCase()
    const productDescription = card.querySelector(".product-description").textContent.toLowerCase()

    if (productName.includes(searchTerm) || productDescription.includes(searchTerm)) {
      card.style.display = "block"
    } else {
      card.style.display = "none"
    }
  })
}

function sortProducts(sortBy) {
  const productsGrid = document.querySelector(".products-grid")
  const productCards = Array.from(document.querySelectorAll(".product-card"))

  productCards.sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return getProductPrice(a) - getProductPrice(b)
      case "price-high":
        return getProductPrice(b) - getProductPrice(a)
      case "name":
        return getProductName(a).localeCompare(getProductName(b))
      case "popularity":
        return getProductPopularity(b) - getProductPopularity(a)
      default:
        return 0
    }
  })

  // Re-append sorted cards
  productCards.forEach((card) => productsGrid.appendChild(card))
}

function getProductPrice(card) {
  const priceText = card.querySelector(".price").textContent
  return Number.parseFloat(priceText.replace("₦", "").replace(",", ""))
}

function getProductName(card) {
  return card.querySelector(".product-name").textContent
}

function getProductPopularity(card) {
  // This could be based on sales data, ratings, etc.
  return card.querySelector(".product-badge") ? 1 : 0
}

// Wishlist functionality
function initializeWishlist() {
  const wishlistBtns = document.querySelectorAll(".wishlist-btn")

  wishlistBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      e.stopPropagation()

      const productCard = btn.closest(".product-card")
      const productId = productCard.dataset.productId

      toggleWishlist(productId, btn)
    })
  })
}

function toggleWishlist(productId, btn) {
  let wishlist = JSON.parse(localStorage.getItem("wishlist")) || []

  if (wishlist.includes(productId)) {
    // Remove from wishlist
    wishlist = wishlist.filter((id) => id !== productId)
    btn.classList.remove("active")
    showNotification("Removed from wishlist")
  } else {
    // Add to wishlist
    wishlist.push(productId)
    btn.classList.add("active")
    showNotification("Added to wishlist")
  }

  localStorage.setItem("wishlist", JSON.stringify(wishlist))
}

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
