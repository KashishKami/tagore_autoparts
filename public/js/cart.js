// Define a variable to store the cart items
let cartItems = [];

// Function to initialize the cart items from localStorage
function initializeCartItems() {
    const storedItems = localStorage.getItem('cartItems');
    if (storedItems) {
        cartItems = JSON.parse(storedItems);
    }
}

// Function to save cart items to localStorage
function saveCartItems() {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
}

// Function to add a product to the cart
function addToCart(product) {
    cartItems.push(product);
    saveCartItems(); // Save cart items to localStorage
    updateCartIcon();
    updateCartDisplay();
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cartItems.splice(index, 1);
    saveCartItems(); // Save cart items to localStorage
    updateCartIcon();
    updateCartDisplay();
}

// Function to update the cart icon with the number of items
function updateCartIcon() {
    const cartIcon = document.getElementById('essenceCartBtn') || document.getElementById('rightSideCart');
    if (!cartIcon) return;
    const span = cartIcon.querySelector('span');
    if (span) {
        span.textContent = cartItems.length;
    }
}

// Function to update the cart display
function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cartItems');
    if (!cartItemsContainer) return;
    cartItemsContainer.innerHTML = ''; // Clear existing items

    // Add each item to the cart display
    cartItems.forEach((item, index) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <div class="item-info">
                <img src="${item.image}" alt="">
                <div class="item-details">
                    <h6>${item.name}</h6>
                    <p>${item.price}</p>
                </div>
            </div>
            <button class="remove-btn" onclick="removeFromCart(${index})">Remove</button>
        `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update total
    const cartTotal = document.getElementById('cartTotal');
    if (cartTotal) {
        const total = calculateTotal();
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }
}

// Function to calculate the total price of items in the cart
function calculateTotal() {
    let total = 0;
    cartItems.forEach(item => {
        total += parseFloat(item.price.replace('$', ''));
    });
    return total;
}

// Initialize the cart icon and cart display
initializeCartItems();
updateCartIcon();
updateCartDisplay();

// Example usage:
// Add a product to the cart when the "Add to Cart" button is clicked
const addToCartButtons = document.querySelectorAll('.add-to-cart-btn a');
addToCartButtons.forEach(button => {
    button.addEventListener('click', function(event) {
        event.preventDefault();
        const product = getProductInfo(button);
        addToCart(product);
    });
});

// Function to extract product information from the DOM
function getProductInfo(button) {
    const productWrapper = button.closest('.single-product-wrapper');
    const productImage = productWrapper.querySelector('.product-img img').getAttribute('src');
    const productName = productWrapper.querySelector('.product-description h6').textContent;
    const productPrice = productWrapper.querySelector('.product-description .product-price').textContent;
    return { image: productImage, name: productName, price: productPrice };
}

// Event listener for toggling the cart container visibility
const essenceCartBtn = document.getElementById('essenceCartBtn');
if (essenceCartBtn) {
    essenceCartBtn.addEventListener('click', function(event) {
        const cartContainer = document.getElementById('cartContainer');
        if (cartContainer) {
            cartContainer.classList.toggle('show');
        }
    });
}

// Function to handle adding a product from the single product page
function addSingleProductToCart() {
    const slideImg = document.querySelector('.product_thumbnail_slides img');
    const descH2 = document.querySelector('.single_product_desc h2');
    const priceEl = document.querySelector('.product-price');
    if (!slideImg || !descH2 || !priceEl) return;

    const productImage = slideImg.getAttribute('src');
    const productName = descH2.textContent;
    const productPrice = priceEl.textContent;
    const product = { image: productImage, name: productName, price: productPrice };

    // Add the product to the cart
    addToCart(product);
}

// Add event listener to the "Add to Cart" button on the single product page
const addToCartButton = document.querySelector('.cart-fav-box .btn');
if (addToCartButton) {
    addToCartButton.addEventListener('click', function(event) {
        event.preventDefault();
        addSingleProductToCart();
    });
}
