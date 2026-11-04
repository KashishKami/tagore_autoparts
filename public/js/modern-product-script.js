// Product Gallery Functionality
let currentImageIndex = 0;
// Dynamically fetch images from thumbnails on the product page
const images = Array.from(document.querySelectorAll('.thumbnail img')).map(img => img.src);

function setActiveImage(index) {
    currentImageIndex = index;
    updateMainImage();
    updateThumbnails();
}

function changeImage(direction) {
    currentImageIndex = (currentImageIndex + direction + images.length) % images.length;
    updateMainImage();
    updateThumbnails();
}

function updateMainImage() {
    const mainImage = document.getElementById('mainImage');
    const img = mainImage.querySelector('img');
    img.src = images[currentImageIndex];
    img.alt = `Product Image ${currentImageIndex + 1}`;
}

function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
}

// Lightbox Functionality
function openLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightboxImage');
    lightboxImage.src = images[currentImageIndex];
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    document.body.style.overflow = 'auto';
}

// Tab Functionality
function showTab(tabName) {
    // Hide all tab panels
    const tabPanels = document.querySelectorAll('.tab-panel');
    tabPanels.forEach(panel => panel.classList.remove('active'));
    
    // Remove active class from all tab buttons
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => btn.classList.remove('active'));
    
    // Show selected tab panel
    document.getElementById(tabName).classList.add('active');
    
    // Add active class to clicked button
    event.target.classList.add('active');
}

// Product Options
document.addEventListener('DOMContentLoaded', function() {
    // Option buttons functionality
    const optionGroups = document.querySelectorAll('.option-group');
    
    optionGroups.forEach(group => {
        const buttons = group.querySelectorAll('.option-btn');
        buttons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons in this group
                buttons.forEach(btn => btn.classList.remove('active'));
                // Add active class to clicked button
                this.classList.add('active');
            });
        });
    });
});

// Quantity Selector
function changeQuantity(delta) {
    const quantityInput = document.getElementById('quantity');
    let currentValue = parseInt(quantityInput.value);
    let newValue = currentValue + delta;
    
    // Ensure value stays within bounds
    newValue = Math.max(1, Math.min(10, newValue));
    quantityInput.value = newValue;
}

// Integration with existing cart system
function addModernProductToCart() {
    const quantity = parseInt(document.getElementById('quantity').value);

    // Get selected year from custom dropdown
    let selectedYear = '';
    const yearSelected = document.querySelector('.year-selected');
    if (yearSelected) {
        selectedYear = yearSelected.textContent.trim();
        if (selectedYear === 'Select Year' || !selectedYear) {
            showNotification('Please select a year before adding to cart.', 'info');
            return;
        }
    }

    // Get product info (customize as needed)
    const product = {
        image: images[currentImageIndex],
        name: '2JZ Engine' + (selectedYear ? ' (' + selectedYear + ')' : ''),
        price: '$1500-$9000',
        quantity: quantity,
        year: selectedYear
    };

    // Add to cart
    addToCart(product);

    // Show notification
    showCartNotification();
}

function showCartNotification() {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'cart-notification';
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-check-circle"></i>
            <span>Product added to cart successfully!</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: linear-gradient(135deg, #4ecdc4, #44a08d);
        color: white;
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        display: flex;
        align-items: center;
        gap: 10px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Call Us Functionality
function callUs() {
    window.location.href = 'tel:+18886565933';
}

// Wishlist Functionality
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];

function toggleWishlist() {
    const wishlistBtn = document.querySelector('.wishlist');
    const productId = 'premium-auto-part'; // Unique product identifier
    
    if (wishlist.includes(productId)) {
        // Remove from wishlist
        wishlist = wishlist.filter(id => id !== productId);
        wishlistBtn.innerHTML = '<i class="far fa-heart"></i>';
        showNotification('Removed from wishlist', 'info');
    } else {
        // Add to wishlist
        wishlist.push(productId);
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
        showNotification('Added to wishlist', 'success');
    }
    
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function showNotification(message, type) {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#4ecdc4' : '#667eea'};
        color: white;
        padding: 12px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        z-index: 1000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Review Form Functionality
document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('reviewForm');
    if (reviewForm) {
        reviewForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const reviewData = {
                rating: formData.get('rating'),
                name: formData.get('name'),
                email: formData.get('email'),
                review: formData.get('review'),
                date: new Date().toISOString()
            };
            
            // Here you would typically send the data to your server
            console.log('Review submitted:', reviewData);
            
            // Show success message
            showNotification('Review submitted successfully!', 'success');
            
            // Reset form
            this.reset();
        });
    }
});

// Smooth Scrolling for Anchor Links
document.addEventListener('DOMContentLoaded', function() {
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// Lazy Loading for Images
document.addEventListener('DOMContentLoaded', function() {
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
});

// Price Animation
function animatePrice() {
    const priceElement = document.querySelector('.current-price');
    if (priceElement) {
        priceElement.style.transform = 'scale(1.1)';
        setTimeout(() => {
            priceElement.style.transform = 'scale(1)';
        }, 200);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const selected = document.querySelector('.year-selected');
    const options = document.querySelector('.year-options');
    const listItems = options.querySelectorAll('li');
    const hiddenSelect = document.querySelector('#year-select');

    selected.addEventListener('click', function() {
        options.style.display = options.style.display === 'block' ? 'none' : 'block';
    });

    listItems.forEach(item => {
        item.addEventListener('click', function() {
            selected.textContent = this.textContent;
            hiddenSelect.value = this.getAttribute('data-value');
            options.style.display = 'none';
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!selected.contains(e.target) && !options.contains(e.target)) {
            options.style.display = 'none';
        }
    });
});

// Add price animation on page load
document.addEventListener('DOMContentLoaded', function() {
    setTimeout(animatePrice, 1000);
});

// Keyboard Navigation for Gallery
document.addEventListener('keydown', function(e) {
    if (e.key === 'ArrowLeft') {
        changeImage(-1);
    } else if (e.key === 'ArrowRight') {
        changeImage(1);
    } else if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Touch/Swipe Support for Mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe left
            changeImage(1);
        } else {
            // Swipe right
            changeImage(-1);
        }
    }
}

// Initialize cart count on page load
document.addEventListener('DOMContentLoaded', function() {
    // Check if product is in wishlist
    const wishlistBtn = document.querySelector('.wishlist');
    if (wishlistBtn && wishlist.includes('premium-auto-part')) {
        wishlistBtn.innerHTML = '<i class="fas fa-heart"></i>';
    }
});

// Add loading animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Add CSS for loading state
const style = document.createElement('style');
style.textContent = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 9999;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 40px;
        height: 40px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #667eea;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        z-index: 10000;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;
document.head.appendChild(style); 