let cartCount = 0;
let currentSlide = 0;
const totalSlides = 4;

// Auto slide function
function autoSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateSlider();
}

// Set interval for auto sliding
let slideInterval = setInterval(autoSlide, 5000);

// Go to specific slide
function goToSlide(slideIndex) {
    currentSlide = slideIndex;
    updateSlider();
    
    // Reset interval when manually changing slides
    clearInterval(slideInterval);
    slideInterval = setInterval(autoSlide, 5000);
}

// Update slider position and active dot
function updateSlider() {
    const slider = document.getElementById('slider');
    slider.style.transform = `translateX(-${currentSlide * 25}%)`;
    
    // Update active dot
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

let cart = [];
const products = {
    'Summer Bucket Hat': { price: 2074, image: 'images/strawhat.png', anime: 'One Piece' },
    'Anime Sunglasses': { price: 1657, image: 'images/sunglasses.png', anime: 'Naruto' },
    'AOT Beach Hat': { price: 2490, image: 'images/aot.png', anime: 'Attack on Titan' },
    'ITACHI HODDIE': { price: 3817, image: 'images/itachi hoodie.png', anime: 'Naruto' },
    'Kakashi Hoodie': { price: 4149, image: 'images/kakashi.png', anime: 'Naruto' },
    'Naruto Team 7 Mug': { price: 1657, image: 'images/naruto cup.png', anime: 'Naruto' },
    'Survey Corps Classic Tee': { price: 1899, image: 'images/aot-tshirt1.png', anime: 'Attack on Titan' },
    'Survey Corps Sport Edition': { price: 2199, image: 'images/aot-tshirt2.png', anime: 'Attack on Titan' },
    'Scout Regiment Backpack': { price: 2499, image: 'images/aot-bag1.png', anime: 'Attack on Titan' },
    'Batman Classic Hoodie': { price: 2999, image: 'images/batman-hoodie1.png', anime: 'DC Comics' },
    'Deadpool Premium Hoodie': { price: 3299, image: 'images/deadpool-hoodie1.png', anime: 'Marvel' },
    'Naruto Classic T-Shirt': { price: 1899, image: 'images/naruto-tshirt1.png', anime: 'Naruto' },
    'Naruto Shinobi T-Shirt': { price: 1899, image: 'images/naruto-tshirt2.png', anime: 'Naruto' },
    'Ichiraku Ramen Hoodie': { price: 2999, image: 'images/naruto-hoodie2.png', anime: 'Naruto' },
    'The Batman Dark Hoodie': { price: 3299, image: 'images/batman-hoodie2.png', anime: 'DC Comics' },
    'Frenemies Forever Hoodie': { price: 2799, image: 'images/tom-jerry1.png', anime: 'Cartoon' }, 
    'Wonder Woman Gold Edition': { price: 2999, image: 'images/wonder-woman1.png', anime: 'DC Comics' },
    'Central Perk Friends': { price: 2799, image: 'images/friends-hoodie1.png', anime: 'TV Series' },
    'Superman Premium Edition': { price: 3499, image: 'images/superman-hoodie1.png', anime: 'DC Comics' },
    'Anime Heroes Collection': { price: 2899, image: 'images/anime-heroes1.png', anime: 'Anime Heroes' },
    'Gojo Purple Edition': { price: 2799, image: 'images/gojo-hoodie2.png', anime: 'Jujutsu Kaisen' }
};

function addToCart(item) {
    cart.push(item);
    updateCartCount();
    
    const button = event.target;
    button.textContent = 'Added!';
    button.style.backgroundColor = '#4CAF50';
    
    setTimeout(() => {
        button.textContent = 'Add to Cart';
        button.style.backgroundColor = '';
    }, 1000);
}

function searchItems() {
    let input = document.getElementById('searchInput').value.toLowerCase();
    let items = document.querySelectorAll('.product');
    
    items.forEach(product => {
        let name = product.querySelector('h3').textContent.toLowerCase();
        let anime = product.getAttribute('data-anime').toLowerCase();
        let price = product.querySelector('.price').textContent.toLowerCase();
        
        // Search by name, anime category, or price
        let matches = name.includes(input) || 
                     anime.includes(input) || 
                     price.includes(input);
        
        product.style.display = matches ? '' : 'none';
        product.style.opacity = matches ? '1' : '0';
        product.style.transition = 'opacity 0.3s ease';
    });
}

function filterByAnime() {
    let selected = document.getElementById('animeFilter').value;
    let items = document.querySelectorAll('.product');
    items.forEach(product => {
        let anime = product.getAttribute('data-anime');
        product.style.display = (selected === 'all' || anime === selected) ? '' : 'none';
    });
}

function showProductDetails(name) {
    const product = products[name];
    const modal = document.getElementById('productModal');
    const details = document.getElementById('productDetails');
    
    details.innerHTML = `
        <img src="${product.image}" alt="${name}">
        <div class="product-info">
            <h2>${name}</h2>
            <p class="price">₹${product.price}</p>
            <p>From: ${product.anime}</p>
            <button class="add-to-cart" onclick="addToCart('${name}')">Add to Cart</button>
        </div>
    `;
    
    modal.style.display = 'block';
}

function updateCartCount() {
    document.querySelector('.cart-count').textContent = cart.length;
}

function showCart() {
    const modal = document.getElementById('cartModal');
    const cartItems = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    cartItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(productName => {
        const product = products[productName];
        if (product) {
            total += product.price;
            cartItems.innerHTML += `
                <div class="cart-item">
                    <img src="${product.image}" alt="${productName}">
                    <div class="item-details">
                        <h4>${productName}</h4>
                        <p>₹${product.price}</p>
                    </div>
                    <button class="remove-btn" onclick="removeFromCart('${productName}')">Remove</button>
                </div>
            `;
        }
    });
    
    cartTotal.textContent = `Total: ₹${total}`;
    modal.style.display = 'block';
}

// Add this new function after showCart
function removeFromCart(productName) {
    const index = cart.indexOf(productName);
    if (index > -1) {
        cart.splice(index, 1);
        updateCartCount();
        showCart(); // Refresh cart display
    }
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

function processCheckout() {
    const button = document.querySelector('.checkout-btn');
    const paymentMethod = document.getElementById('paymentMethod').value;
    
    if (!paymentMethod) {
        showNotification('Please select a payment method');
        return;
    }
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }

    // Disable button and show loading state
    button.disabled = true;
    button.innerHTML = '<div class="checkout-loader"></div>';

    // Simulate API call
    setTimeout(() => {
        cart = [];
        updateCartCount();
        closeModal('cartModal');
        showSuccessModal();
        
        // Reset button state
        button.disabled = false;
        button.innerHTML = 'Proceed to Checkout';
    }, 2000);
}

// Initialize event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Loading animation for products
    const products = document.querySelectorAll('.product');
    products.forEach(product => {
        product.classList.add('loading');
        setTimeout(() => {
            product.classList.remove('loading');
        }, 1000);
    });

    // Cart icon click handler
    document.querySelector('.cart-icon').onclick = showCart;
    
    // Product click handlers
    document.querySelectorAll('.product').forEach(product => {
        const name = product.querySelector('h3').textContent;
        product.onclick = () => showProductDetails(name);
    });
});

function addToCart(productName) {
    cart.push(productName);
    
    const cartCount = document.querySelector('.cart-count');
    cartCount.textContent = cart.length;
    cartCount.style.animation = 'bounce 0.5s ease';
    
    showNotification('Item added to cart!');
}

function updateCart(productName) {
    const cartItems = document.getElementById('cartItems');
    const item = document.createElement('div');
    item.className = 'cart-item';
    item.innerHTML = `
        <img src="images/${productName.toLowerCase().replace(' ', '')}.png" alt="${productName}">
        <div class="item-details">
            <h4>${productName}</h4>
            <p>$24.99</p>
        </div>
        <button class="remove-btn" onclick="removeItem(this)">Remove</button>
    `;
    cartItems.appendChild(item);
}

function removeItem(button) {
    const item = button.parentElement;
    item.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => {
        item.remove();
        updateCartTotal();
    }, 300);
}

function handlePaymentSelection(value) {
    if (value) {
        document.querySelector('.checkout-btn').classList.add('active');
    }
}

function processCheckout() {
    const button = document.querySelector('.checkout-btn');
    const buttonText = button.querySelector('.button-text');
    const loader = button.querySelector('.checkout-loader');

    // Show loading state
    buttonText.style.opacity = '0';
    loader.style.display = 'block';

    // Simulate processing
    setTimeout(() => {
        closeModal('cartModal');
        showSuccessModal();
    }, 2000);
}

function showSuccessModal() {
    const modal = document.getElementById('successModal');
    const total = cart.reduce((sum, item) => sum + products[item].price, 0);
    
    modal.innerHTML = `
        <div class="modal-content success-modal">
            <div class="success-animation">
                <div class="checkmark">
                    <div class="check-icon"></div>
                </div>
            </div>
            <h2>Thank You for Your Order! 🎉</h2>
            <div class="order-summary">
                <p class="success-message">Your order has been successfully placed!</p>
                <div class="order-details">
                    <p>Order Total: <span class="highlight">₹${total}</span></p>
                    <p>Order Number: <span class="highlight">#${Math.floor(Math.random() * 100000)}</span></p>
                    <p>Estimated Delivery: <span class="highlight">${getEstimatedDelivery()}</span></p>
                </div>
                <div class="order-items">
                    <h3>Order Items:</h3>
                    ${generateOrderItemsList()}
                </div>
            </div>
            <p class="confirmation-email">
                <span class="highlight">✉️</span> A confirmation email will be sent to your registered email address with detailed order information.
            </p>
            <button onclick="closeModal('successModal')" class="continue-shopping">Continue Shopping</button>
        </div>
    `;
    
    modal.style.display = 'block';
    
    // Clear cart
    cart = [];
    updateCartCount();
}

// Helper function to generate estimated delivery date
showSuccessModal
function getEstimatedDelivery() {
    const deliveryDate = new Date();
    deliveryDate.setDate(deliveryDate.getDate() + 5);
    return deliveryDate.toLocaleDateString('en-IN', { 
        weekday: 'long', 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
    });
}

function generateOrderItemsList() {
    return cart.map(item => `
        <div class="order-item">
            <img src="${products[item].image}" alt="${item}">
            <div class="item-info">
                <span class="item-name">${item}</span>
                <span class="item-price">₹${products[item].price}</span>
            </div>
        </div>
    `).join('');
}