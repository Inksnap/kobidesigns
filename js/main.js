// Main JavaScript file for KobiDesigns website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initializeCarousel();
    initializeMobileMenu();
    initializeChatWidget();
    initializeViewToggle();
    initializeScrollEffects();
    initializeFormValidation();
    initializeSearchFunctionality();
});

// Hero Carousel Functionality
function initializeCarousel() {
    const carousel = document.getElementById('heroCarousel');
    const indicators = document.querySelectorAll('.indicator');
    const slides = document.querySelectorAll('.carousel-slide');
    let currentSlide = 0;
    const totalSlides = slides.length;

    // Auto-rotate carousel
    setInterval(() => {
        nextSlide();
    }, 5000);

    // Indicator click handlers
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            goToSlide(index);
        });
    });

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateCarousel();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateCarousel();
    }

    function updateCarousel() {
        // Update slides
        slides.forEach((slide, index) => {
            slide.classList.toggle('active', index === currentSlide);
        });

        // Update indicators
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === currentSlide);
        });

        // Update hero content based on slide
        const heroTitles = [
            'Corporate Branding Excellence',
            'Custom Design Studio',
            'Same Day Delivery'
        ];
        
        const heroSubtitles = [
            'Transform your business identity with premium printing solutions',
            'Professional design tools at your fingertips',
            'Rush orders delivered within 24 hours'
        ];

        const heroButtons = [
            'Start Designing',
            'Design Now',
            'Order Now'
        ];

        const titleElement = document.querySelector('.hero-title');
        const subtitleElement = document.querySelector('.hero-subtitle');
        const buttonElement = document.querySelector('.hero-actions .btn-primary');

        if (titleElement) titleElement.textContent = heroTitles[currentSlide];
        if (subtitleElement) subtitleElement.textContent = heroSubtitles[currentSlide];
        if (buttonElement) buttonElement.firstChild.textContent = heroButtons[currentSlide];
    }
}

// Mobile Menu Functionality
function initializeMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobileMenuToggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuToggle && navLinks) {
        mobileMenuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('mobile-open');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('mobile-open');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
}

// Chat Widget Functionality
function initializeChatWidget() {
    const chatWidget = document.getElementById('chatWidget');
    const chatBtn = chatWidget?.querySelector('.chat-btn');

    if (chatBtn) {
        chatBtn.addEventListener('click', () => {
            // Simulate chat opening
            alert('Chat feature coming soon! For immediate assistance, please call +234 803 123 4567');
        });
    }
}

// View Toggle Functionality
function initializeViewToggle() {
    const viewBtns = document.querySelectorAll('.view-btn');
    const categoriesGrid = document.querySelector('.categories-grid');

    viewBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const view = btn.dataset.view;
            
            // Update active button
            viewBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update grid layout
            if (categoriesGrid) {
                categoriesGrid.className = `categories-grid ${view}-view`;
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.feature, .category-card, .testimonial-card');
    animateElements.forEach(el => observer.observe(el));

    // Navbar scroll effect
    const header = document.querySelector('.header');
    let lastScrollY = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollY = window.scrollY;
        
        if (header) {
            if (currentScrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }

        lastScrollY = currentScrollY;
    });
}

// Form Validation
function initializeFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            if (!validateForm(form)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }

        // Email validation
        if (field.type === 'email' && field.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(field.value)) {
                showFieldError(field, 'Please enter a valid email address');
                isValid = false;
            }
        }

        // Phone validation
        if (field.type === 'tel' && field.value) {
            const phoneRegex = /^[\+]?[0-9\s\-$$$$]{10,}$/;
            if (!phoneRegex.test(field.value)) {
                showFieldError(field, 'Please enter a valid phone number');
                isValid = false;
            }
        }
    });

    return isValid;
}

function showFieldError(field, message) {
    clearFieldError(field);
    
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    
    field.parentNode.appendChild(errorDiv);
    field.classList.add('error');
}

function clearFieldError(field) {
    const existingError = field.parentNode.querySelector('.field-error');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
}

// Search Functionality
function initializeSearchFunctionality() {
    const searchForm = document.querySelector('.search-form');
    const searchInput = document.querySelector('.search-input');

    if (searchForm && searchInput) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const query = searchInput.value.trim();
            
            if (query) {
                // Redirect to search results page
                window.location.href = `search.html?q=${encodeURIComponent(query)}`;
            }
        });

        // Search suggestions (basic implementation)
        searchInput.addEventListener('input', debounce((e) => {
            const query = e.target.value.trim();
            if (query.length > 2) {
                showSearchSuggestions(query);
            } else {
                hideSearchSuggestions();
            }
        }, 300));
    }
}

function showSearchSuggestions(query) {
    // Mock search suggestions
    const suggestions = [
        'Business Cards',
        'Corporate Gifts',
        'Marketing Materials',
        'Custom Apparel',
        'Promotional Items',
        'Photo Products'
    ].filter(item => item.toLowerCase().includes(query.toLowerCase()));

    const searchContainer = document.querySelector('.search-container');
    let suggestionsDiv = document.querySelector('.search-suggestions');

    if (!suggestionsDiv) {
        suggestionsDiv = document.createElement('div');
        suggestionsDiv.className = 'search-suggestions';
        searchContainer.appendChild(suggestionsDiv);
    }

    suggestionsDiv.innerHTML = suggestions
        .map(suggestion => `<div class="suggestion-item">${suggestion}</div>`)
        .join('');

    // Add click handlers to suggestions
    suggestionsDiv.querySelectorAll('.suggestion-item').forEach(item => {
        item.addEventListener('click', () => {
            document.querySelector('.search-input').value = item.textContent;
            hideSearchSuggestions();
        });
    });
}

function hideSearchSuggestions() {
    const suggestionsDiv = document.querySelector('.search-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.remove();
    }
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Watch Demo functionality
document.addEventListener('DOMContentLoaded', function() {
    const watchDemoBtn = document.getElementById('watchDemo');
    if (watchDemoBtn) {
        watchDemoBtn.addEventListener('click', () => {
            // Create modal for video demo
            createVideoModal();
        });
    }
});

function createVideoModal() {
    const modal = document.createElement('div');
    modal.className = 'video-modal';
    modal.innerHTML = `
        <div class="video-modal-content">
            <button class="video-modal-close">&times;</button>
            <div class="video-container">
                <iframe 
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                    frameborder="0" 
                    allowfullscreen>
                </iframe>
            </div>
        </div>
    `;

    document.body.appendChild(modal);

    // Close modal functionality
    const closeBtn = modal.querySelector('.video-modal-close');
    closeBtn.addEventListener('click', () => {
        document.body.removeChild(modal);
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            document.body.removeChild(modal);
        }
    });
}

// Add to cart functionality
function addToCart(productId, productName, price) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: productId,
            name: productName,
            price: price,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showCartNotification(productName);
}

function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    
    const cartCountElement = document.querySelector('.cart-count');
    if (cartCountElement) {
        cartCountElement.textContent = totalItems;
    }
}

function showCartNotification(productName) {
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="icon-check"></i>
            <span>${productName} added to cart!</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', updateCartCount);

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Performance optimization: Lazy loading images
function initializeLazyLoading() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener('DOMContentLoaded', initializeLazyLoading);