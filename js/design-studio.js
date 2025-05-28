// Design Studio JavaScript

document.addEventListener("DOMContentLoaded", () => {
  initializeDesignStudio()
  initializeSidebar()
  initializeCanvas()
  initializeTools()
  initializeProperties()
  initializeTemplates()
})

// Initialize Design Studio
function initializeDesignStudio() {
  console.log("Design Studio initialized")

  // Initialize canvas
  const canvas = document.querySelector(".design-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Set canvas background
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Add sample content
    drawSampleBusinessCard(ctx, canvas.width, canvas.height)
  }
}

// Initialize Sidebar
function initializeSidebar() {
  const sidebarHeaders = document.querySelectorAll(".sidebar-header")

  sidebarHeaders.forEach((header) => {
    header.addEventListener("click", () => {
      const section = header.closest(".sidebar-section")
      const content = section.querySelector(".sidebar-content")
      const icon = header.querySelector(".icon")

      // Toggle active state
      section.classList.toggle("active")

      // Animate icon
      if (section.classList.contains("active")) {
        icon.style.transform = "rotate(180deg)"
        content.style.display = "block"
      } else {
        icon.style.transform = "rotate(0deg)"
        content.style.display = "none"
      }
    })
  })
}

// Initialize Canvas
function initializeCanvas() {
  const canvas = document.querySelector(".design-canvas")
  let isDrawing = false
  const currentTool = "select"

  if (canvas) {
    canvas.addEventListener("mousedown", (e) => {
      isDrawing = true
      handleCanvasInteraction(e, currentTool)
    })

    canvas.addEventListener("mousemove", (e) => {
      if (isDrawing) {
        handleCanvasInteraction(e, currentTool)
      }
    })

    canvas.addEventListener("mouseup", () => {
      isDrawing = false
    })
  }

  // Zoom controls
  const zoomBtns = document.querySelectorAll(".zoom-btn")
  const zoomLevel = document.querySelector(".zoom-level")
  let currentZoom = 100

  zoomBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const zoomType = btn.dataset.zoom

      if (zoomType === "in" && currentZoom < 200) {
        currentZoom += 25
      } else if (zoomType === "out" && currentZoom > 25) {
        currentZoom -= 25
      }

      zoomLevel.textContent = `${currentZoom}%`

      if (canvas) {
        canvas.style.transform = `scale(${currentZoom / 100})`
      }
    })
  })
}

// Initialize Tools
function initializeTools() {
  const canvasTools = document.querySelectorAll(".canvas-tool")

  canvasTools.forEach((tool) => {
    tool.addEventListener("click", () => {
      // Remove active class from all tools
      canvasTools.forEach((t) => t.classList.remove("active"))

      // Add active class to clicked tool
      tool.classList.add("active")

      // Update current tool
      const toolType = tool.dataset.tool
      console.log(`Selected tool: ${toolType}`)
    })
  })

  // Text style controls
  const styleBtns = document.querySelectorAll(".style-btn")

  styleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active")
      const style = btn.dataset.style
      console.log(`Toggled style: ${style}`)
    })
  })

  // Color pickers
  const colorPickers = document.querySelectorAll(".color-picker")

  colorPickers.forEach((picker) => {
    picker.addEventListener("change", (e) => {
      console.log(`Color changed: ${e.target.value}`)
    })
  })

  // Font selector
  const fontSelector = document.querySelector(".font-selector")

  if (fontSelector) {
    fontSelector.addEventListener("change", (e) => {
      console.log(`Font changed: ${e.target.value}`)
    })
  }
}

// Initialize Properties
function initializeProperties() {
  const propertyInputs = document.querySelectorAll(".property-input")
  const propertySliders = document.querySelectorAll(".property-slider")

  propertyInputs.forEach((input) => {
    input.addEventListener("change", (e) => {
      console.log(`Property changed: ${e.target.value}`)
    })
  })

  propertySliders.forEach((slider) => {
    slider.addEventListener("input", (e) => {
      console.log(`Slider changed: ${e.target.value}`)
    })
  })

  // Layer controls
  const layerItems = document.querySelectorAll(".layer-item")

  layerItems.forEach((item) => {
    item.addEventListener("click", () => {
      // Remove active class from all layers
      layerItems.forEach((l) => l.classList.remove("active"))

      // Add active class to clicked layer
      item.classList.add("active")
    })

    // Layer visibility toggle
    const visibilityBtn = item.querySelector(".layer-visibility")
    if (visibilityBtn) {
      visibilityBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        visibilityBtn.classList.toggle("visible")
      })
    }
  })
}

// Initialize Templates
function initializeTemplates() {
  const templateThumbs = document.querySelectorAll(".template-thumb")

  templateThumbs.forEach((thumb) => {
    thumb.addEventListener("click", () => {
      // Remove selected class from all templates
      templateThumbs.forEach((t) => t.classList.remove("selected"))

      // Add selected class to clicked template
      thumb.classList.add("selected")

      const templateId = thumb.dataset.templateId
      loadTemplate(templateId)
    })

    // Use template button
    const useBtn = thumb.querySelector(".template-use-btn")
    if (useBtn) {
      useBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        const templateId = thumb.dataset.templateId
        loadTemplate(templateId)
      })
    }
  })
}

// Handle Canvas Interaction
function handleCanvasInteraction(e, tool) {
  const canvas = e.target
  const rect = canvas.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top

  console.log(`Canvas interaction: ${tool} at (${x}, ${y})`)

  // Handle different tools
  switch (tool) {
    case "text":
      addTextElement(x, y)
      break
    case "image":
      addImageElement(x, y)
      break
    case "shapes":
      addShapeElement(x, y)
      break
    default:
      // Select tool
      selectElement(x, y)
  }
}

// Load Template
function loadTemplate(templateId) {
  console.log(`Loading template: ${templateId}`)

  const canvas = document.querySelector(".design-canvas")
  if (canvas) {
    const ctx = canvas.getContext("2d")

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.fillStyle = "#FFFFFF"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    // Load template based on ID
    switch (templateId) {
      case "bc-001":
        drawBusinessCardTemplate1(ctx, canvas.width, canvas.height)
        break
      case "bc-002":
        drawBusinessCardTemplate2(ctx, canvas.width, canvas.height)
        break
      default:
        drawSampleBusinessCard(ctx, canvas.width, canvas.height)
    }
  }
}

// Draw Sample Business Card
function drawSampleBusinessCard(ctx, width, height) {
  // Background
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, width, height)

  // Header background
  ctx.fillStyle = "#C4C433"
  ctx.fillRect(0, 0, width, height * 0.3)

  // Company name
  ctx.fillStyle = "#FFFFFF"
  ctx.font = "bold 24px Poppins"
  ctx.textAlign = "center"
  ctx.fillText("KobiDesigns", width / 2, height * 0.2)

  // Name
  ctx.fillStyle = "#2A2A28"
  ctx.font = "bold 20px Poppins"
  ctx.fillText("John Doe", width / 2, height * 0.5)

  // Title
  ctx.font = "16px Poppins"
  ctx.fillText("Creative Director", width / 2, height * 0.6)

  // Contact info
  ctx.font = "14px Poppins"
  ctx.textAlign = "left"
  ctx.fillText("📞 +234 803 123 4567", 50, height * 0.75)
  ctx.fillText("✉️ john@kobidesigns.com", 50, height * 0.85)
}

// Draw Business Card Template 1
function drawBusinessCardTemplate1(ctx, width, height) {
  // Modern gradient background
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, "#C4C433")
  gradient.addColorStop(1, "#F8F845")

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  // White content area
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(width * 0.1, height * 0.2, width * 0.8, height * 0.6)

  // Content
  ctx.fillStyle = "#2A2A28"
  ctx.font = "bold 22px Poppins"
  ctx.textAlign = "center"
  ctx.fillText("Your Name", width / 2, height * 0.45)

  ctx.font = "16px Poppins"
  ctx.fillText("Your Title", width / 2, height * 0.55)
}

// Draw Business Card Template 2
function drawBusinessCardTemplate2(ctx, width, height) {
  // Clean white background
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, width, height)

  // Left accent bar
  ctx.fillStyle = "#C4C433"
  ctx.fillRect(0, 0, width * 0.05, height)

  // Content
  ctx.fillStyle = "#2A2A28"
  ctx.font = "bold 24px Poppins"
  ctx.textAlign = "left"
  ctx.fillText("Your Name", width * 0.15, height * 0.4)

  ctx.font = "16px Poppins"
  ctx.fillText("Your Title", width * 0.15, height * 0.55)

  ctx.font = "14px Poppins"
  ctx.fillText("your.email@company.com", width * 0.15, height * 0.75)
}

// Add Text Element
function addTextElement(x, y) {
  console.log(`Adding text element at (${x}, ${y})`)
  // Implementation for adding text
}

// Add Image Element
function addImageElement(x, y) {
  console.log(`Adding image element at (${x}, ${y})`)
  // Implementation for adding image
}

// Add Shape Element
function addShapeElement(x, y) {
  console.log(`Adding shape element at (${x}, ${y})`)
  // Implementation for adding shape
}

// Select Element
function selectElement(x, y) {
  console.log(`Selecting element at (${x}, ${y})`)
  // Implementation for selecting elements
}

// Studio Actions
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("save-btn")) {
    saveDesign()
  } else if (e.target.classList.contains("preview-btn")) {
    previewDesign()
  } else if (e.target.classList.contains("download-btn")) {
    downloadDesign()
  }
})

function saveDesign() {
  console.log("Saving design...")
  // Implementation for saving design
  showNotification("Design saved successfully!")
}

function previewDesign() {
  console.log("Previewing design...")
  // Implementation for previewing design
  const canvas = document.querySelector(".design-canvas")
  if (canvas) {
    const dataURL = canvas.toDataURL()
    const newWindow = window.open()
    newWindow.document.write(`<img src="${dataURL}" style="max-width: 100%; height: auto;">`)
  }
}

function downloadDesign() {
  console.log("Downloading design...")
  // Implementation for downloading design
  const canvas = document.querySelector(".design-canvas")
  if (canvas) {
    const link = document.createElement("a")
    link.download = "design.png"
    link.href = canvas.toDataURL()
    link.click()
  }
  showNotification("Design downloaded successfully!")
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: #C4C433;
    color: #2A2A28;
    padding: 1rem 2rem;
    border-radius: 0.5rem;
    font-weight: 600;
    z-index: 1000;
    transform: translateX(100%);
    transition: transform 0.3s ease;
  `

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  setTimeout(() => {
    notification.style.transform = "translateX(100%)"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}
