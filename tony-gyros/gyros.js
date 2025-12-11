// Gyros oldal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Kosár számláló frissítése
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartCount.textContent = cartItems.length;
        }
    }
    
    updateCartCount();
    
    // Gyros opciók kezelése
    const meatInputs = document.querySelectorAll('input[type="radio"][name^="meat-"]');
    const sauceInputs = document.querySelectorAll('input[type="radio"][name^="sauce-"]');
    const fillingInputs = document.querySelectorAll('input[type="radio"][name^="filling-"]');
    
    // Opciók összegyűjtése
    function getSelectedOptions(menuItem) {
        const options = {};
        
        // Hústípus
        const meatRadio = menuItem.querySelector('input[type="radio"][name^="meat-"]:checked');
        if (meatRadio) {
            options.meat = meatRadio.value;
        }
        
        // Szósz
        const sauceRadio = menuItem.querySelector('input[type="radio"][name^="sauce-"]:checked');
        if (sauceRadio) {
            options.sauce = sauceRadio.value;
        }
        
        // Töltelék
        const fillingRadio = menuItem.querySelector('input[type="radio"][name^="filling-"]:checked');
        if (fillingRadio) {
            options.filling = fillingRadio.value;
        }
        
        return options;
    }
    
    // Kosárba tétel gombok
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-base-price'));
            const specialRequest = menuItem.querySelector('textarea').value;
            
            // Opciók összegyűjtése
            const options = getSelectedOptions(menuItem);
            
            // Item név opciókkal
            let fullItemName = itemName;
            if (options.meat) {
                fullItemName += ` (${options.meat})`;
            }
            if (options.sauce) {
                fullItemName += ` - ${options.sauce} szósszal`;
            }
            if (options.filling) {
                fullItemName += ` - ${options.filling} töltelékkel`;
            }
            
            // Kosár adatok összeállítása
            const cartItem = {
                id: Date.now(),
                name: fullItemName,
                price: basePrice,
                options: options,
                specialRequest: specialRequest,
                type: 'gyros'
            };
            
            // Kosár frissítése
            let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartItems.push(cartItem);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            
            // Kosár számláló frissítése
            updateCartCount();
            
            // Sikeres üzenet
            showNotification(`${itemName} hozzáadva a kosárhoz!`);
            
            // Űrlap reset
            menuItem.querySelector('textarea').value = '';
        });
    });
    
    // Italok hozzáadása
    const addDrinkButtons = document.querySelectorAll('.add-drink-btn');
    addDrinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const price = parseInt(this.getAttribute('data-price'));
            
            // Kosár adatok összeállítása
            const cartItem = {
                id: Date.now(),
                name: itemName,
                price: price,
                type: 'drink'
            };
            
            // Kosár frissítése
            let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartItems.push(cartItem);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            
            // Kosár számláló frissítése
            updateCartCount();
            
            // Sikeres üzenet
            showNotification(`${itemName} hozzáadva a kosárhoz!`);
        });
    });
    
    // Értesítés megjelenítése
    function showNotification(message) {
        // Értesítés elem létrehozása
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-check-circle"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Stílus hozzáadása
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: linear-gradient(135deg, #ff6600, #ff8533);
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
        `;
        
        // Animáció CSS
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                font-weight: 500;
            }
            .notification-content i {
                font-size: 1.2rem;
            }
        `;
        document.head.appendChild(style);
        
        // Hozzáadás a dokumentumhoz
        document.body.appendChild(notification);
        
        // Eltűntetés 3 másodperc után
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
});