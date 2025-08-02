// Main JavaScript file for E-Commerce Website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initializeSlider();
    initializeQuantityControls();
    initializeTabs();
    initializeDropdowns();
    initializeProductGallery();
});

// Hero Slider functionality
function initializeSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dot');
    
    if (slides.length === 0) return;
    
    let currentSlide = 0;
    
    // Show the first slide
    slides[currentSlide].classList.add('active');
    if (dots.length > 0) {
        dots[currentSlide].classList.add('active');
    }
    
    // Function to change slide
    function changeSlide(index) {
        // Remove active class from current slide and dot
        slides[currentSlide].classList.remove('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.remove('active');
        }
        
        // Update current slide index
        currentSlide = index;
        
        // Add active class to new slide and dot
        slides[currentSlide].classList.add('active');
        if (dots.length > 0) {
            dots[currentSlide].classList.add('active');
        }
    }
    
    // Add click event to dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            changeSlide(index);
        });
    });
    
    // Auto-change slide every 5 seconds
    setInterval(() => {
        let nextSlide = (currentSlide + 1) % slides.length;
        changeSlide(nextSlide);
    }, 5000);
}

// Quantity control functionality
function initializeQuantityControls() {
    const quantityControls = document.querySelectorAll('.quantity-control');
    
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.quantity-minus');
        const plusBtn = control.querySelector('.quantity-plus');
        const input = control.querySelector('.quantity-input');
        
        if (!minusBtn || !plusBtn || !input) return;
        
        minusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(input.value);
            input.value = value + 1;
        });
        
        input.addEventListener('change', () => {
            let value = parseInt(input.value);
            if (isNaN(value) || value < 1) {
                input.value = 1;
            }
        });
    });
}

// Product tabs functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    if (tabButtons.length === 0 || tabPanes.length === 0) return;
    
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons and panes
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Get the target tab pane
            const target = button.getAttribute('data-target');
            const targetPane = document.getElementById(target);
            
            if (targetPane) {
                targetPane.classList.add('active');
            }
        });
    });
}

// Dropdown functionality
function initializeDropdowns() {
    const dropdowns = document.querySelectorAll('.dropdown');
    
    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');
        
        if (!trigger || !menu) return;
        
        trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            menu.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', () => {
            menu.classList.remove('active');
        });
        
        // Prevent closing when clicking inside the dropdown menu
        menu.addEventListener('click', (e) => {
            e.stopPropagation();
        });
    });
}

// Product gallery functionality
function initializeProductGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnail');
    
    if (!mainImage || thumbnails.length === 0) return;
    
    thumbnails.forEach(thumbnail => {
        thumbnail.addEventListener('click', () => {
            // Remove active class from all thumbnails
            thumbnails.forEach(thumb => thumb.classList.remove('active'));
            
            // Add active class to clicked thumbnail
            thumbnail.classList.add('active');
            
            // Update main image
            const imgSrc = thumbnail.querySelector('img').getAttribute('src');
            mainImage.setAttribute('src', imgSrc);
        });
    });
}

// Add to cart functionality
function addToCart(productId, quantity = 1) {
    // In a real application, this would send data to a server or update local storage
    console.log(`Added product ${productId} to cart with quantity ${quantity}`);
    
    // Show a success message
    const message = document.createElement('div');
    message.className = 'cart-message';
    message.textContent = 'Product added to cart!';
    document.body.appendChild(message);
    
    // Remove the message after 3 seconds
    setTimeout(() => {
        message.remove();
    }, 3000);
}

// Search functionality (non-functional, styled only)
function initializeSearch() {
    const searchForm = document.querySelector('.search-form');
    
    if (!searchForm) return;
    
    searchForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const input = searchForm.querySelector('.search-input');
        const query = input.value.trim();
        
        if (query) {
            console.log(`Search query: ${query}`);
            // In a real application, this would redirect to search results page
            // window.location.href = `/search?q=${encodeURIComponent(query)}`;
        }
    });
}

// Filter functionality for product listing page
function initializeFilters() {
    const filterItems = document.querySelectorAll('.filter-item');
    const activeFilters = document.querySelector('.active-filters');
    
    if (filterItems.length === 0 || !activeFilters) return;
    
    filterItems.forEach(item => {
        const checkbox = item.querySelector('input[type="checkbox"]');
        const link = item.querySelector('.filter-link');
        
        if (!checkbox || !link) return;
        
        checkbox.addEventListener('change', () => {
            if (checkbox.checked) {
                // Add active class to the filter link
                link.classList.add('active');
                
                // Add to active filters
                const filterText = link.textContent.trim();
                const activeFilter = document.createElement('div');
                activeFilter.className = 'active-filter';
                activeFilter.innerHTML = `
                    ${filterText}
                    <img src="assets/icons/close.svg" alt="Remove" class="filter-remove" data-filter="${checkbox.id}">
                `;
                activeFilters.appendChild(activeFilter);
                
                // Add event listener to remove button
                const removeBtn = activeFilter.querySelector('.filter-remove');
                removeBtn.addEventListener('click', () => {
                    checkbox.checked = false;
                    link.classList.remove('active');
                    activeFilter.remove();
                });
            } else {
                // Remove active class from the filter link
                link.classList.remove('active');
                
                // Remove from active filters
                const activeFilter = activeFilters.querySelector(`[data-filter="${checkbox.id}"]`);
                if (activeFilter) {
                    activeFilter.parentElement.remove();
                }
            }
        });
    });
    
    // Clear all filters
    const clearAllBtn = document.querySelector('.clear-all');
    if (clearAllBtn) {
        clearAllBtn.addEventListener('click', () => {
            filterItems.forEach(item => {
                const checkbox = item.querySelector('input[type="checkbox"]');
                const link = item.querySelector('.filter-link');
                
                if (checkbox && link) {
                    checkbox.checked = false;
                    link.classList.remove('active');
                }
            });
            
            // Clear active filters
            while (activeFilters.firstChild) {
                activeFilters.removeChild(activeFilters.firstChild);
            }
        });
    }
}

// Initialize all product listing page functionality
function initializeProductListing() {
    initializeFilters();

    // View toggle for new UI
    const listBtn = document.getElementById('list-view-btn');
    const gridBtn = document.getElementById('grid-view-btn');
    const listContainer = document.getElementById('products-container-list');
    const gridContainer = document.getElementById('products-container-grid');
    if (!listBtn || !gridBtn || !listContainer || !gridContainer) return;

    listBtn.addEventListener('click', function() {
        listBtn.classList.add('active');
        gridBtn.classList.remove('active');
        listContainer.style.display = '';
        gridContainer.style.display = 'none';
    });
    gridBtn.addEventListener('click', function() {
        gridBtn.classList.add('active');
        listBtn.classList.remove('active');
        gridContainer.style.display = '';
        listContainer.style.display = 'none';
    });
    // Default to list view
    listBtn.classList.add('active');
    gridBtn.classList.remove('active');
    listContainer.style.display = '';
    gridContainer.style.display = 'none';
}

// Cart page functionality
function initializeCart() {
    const removeButtons = document.querySelectorAll('.btn-remove');
    const saveButtons = document.querySelectorAll('.btn-save');
    const removeAllButton = document.querySelector('.btn-remove-all');
    const quantitySelectors = document.querySelectorAll('.quantity-selector');
    
    // Remove item from cart
    removeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            if (cartItem) {
                cartItem.remove();
                updateCartTotal();
            }
        });
    });
    
    // Save item for later
    saveButtons.forEach(button => {
        button.addEventListener('click', () => {
            const cartItem = button.closest('.cart-item');
            if (cartItem) {
                // In a real application, this would move the item to a saved items section
                cartItem.remove();
                updateCartTotal();
                console.log('Item saved for later');
            }
        });
    });
    
    // Remove all items
    if (removeAllButton) {
        removeAllButton.addEventListener('click', () => {
            const cartItems = document.querySelectorAll('.cart-item');
            cartItems.forEach(item => item.remove());
            updateCartTotal();
        });
    }
    
    // Quantity selector dropdown
    quantitySelectors.forEach(selector => {
        selector.addEventListener('click', () => {
            // In a real application, this would show a dropdown
            console.log('Quantity selector clicked');
        });
    });
    
    // Update cart total
    function updateCartTotal() {
        // In a real application, this would recalculate the cart total
        console.log('Cart total updated');
    }
}

// Mobile Filter Panel
const filterToggle = document.querySelector('.mobile-filter-toggle');
const filterPanel = document.querySelector('.mobile-filter-panel');
const closeFilter = document.querySelector('.close-filter');

if (filterToggle && filterPanel && closeFilter) {
    filterToggle.addEventListener('click', () => {
        filterPanel.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    closeFilter.addEventListener('click', () => {
        filterPanel.classList.remove('active');
        document.body.style.overflow = '';
    });
}

// Consistent Mobile Navigation
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuBtn && mainNav) {
        mobileMenuBtn.addEventListener('click', function() {
            mainNav.classList.toggle('active');
        });
    }
    
    // Handle window resize
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            // Reset any mobile-specific styles on resize
            if (window.innerWidth > 768) {
                mainNav?.classList.remove('active');
            }
        }, 250);
    });
    
    // Add touch support for dropdowns
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        dropdown.addEventListener('click', function(e) {
            e.preventDefault();
            this.classList.toggle('active');
        });
    });
});

// Close mobile menu when clicking outside
document.addEventListener('click', function(e) {
    const mainNav = document.querySelector('.main-nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    
    if (mainNav?.classList.contains('active') && 
        !mainNav.contains(e.target) && 
        !mobileMenuBtn?.contains(e.target)) {
        mainNav.classList.remove('active');
    }
});

// Call additional initializations if needed
document.addEventListener('DOMContentLoaded', function() {
    initializeSearch();
    initializeProductListing();
    initializeCart();
});