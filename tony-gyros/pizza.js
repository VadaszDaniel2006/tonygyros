// Pizza oldal JavaScript

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
    
    // Méret változtatás árazás
    const sizeInputs = document.querySelectorAll('input[type="radio"][name^="size-"]');
    sizeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const menuItem = this.closest('.menu-item');
            const priceElement = menuItem.querySelector('.price');
            const basePrice = parseInt(menuItem.querySelector('.add-to-cart-btn').getAttribute('data-base-price'));
            
            // Ár számítás a méret alapján
            let priceMultiplier = 1;
            switch(this.value) {
                case '32':
                    priceMultiplier = 1;
                    break;
                case '40':
                    priceMultiplier = 1.25; // 25%-kal drágább
                    break;
                case '50':
                    priceMultiplier = 1.5; // 50%-kal drágább
                    break;
            }
            
            const newPrice = Math.round(basePrice * priceMultiplier);
            priceElement.textContent = newPrice.toLocaleString() + ' Ft';
            
            // Frissítsük a kosárba gomb adatait
            const addToCartBtn = menuItem.querySelector('.add-to-cart-btn');
            const currentPrice = addToCartBtn.getAttribute('data-current-price') || basePrice;
            addToCartBtn.setAttribute('data-current-price', newPrice);
        });
    });
    
    // Kosárba tétel
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-base-price'));
            const currentPrice = parseInt(this.getAttribute('data-current-price') || basePrice);
            const specialRequest = menuItem.querySelector('textarea').value;
            
            // Méret meghatározása
            const sizeInput = menuItem.querySelector('input[type="radio"]:checked');
            const size = sizeInput ? sizeInput.value + ' cm' : 'Normál';
            
            // Extrák ellenőrzése
            const extras = [];
            
            // Kosár adatok összeállítása
            const cartItem = {
                id: Date.now(),
                name: itemName,
                price: currentPrice,
                size: size,
                specialRequest: specialRequest,
                extras: extras,
                type: 'pizza'
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
            background: linear-gradient(135deg, var(--primary), var(--accent));
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
    
    // CSS változók hozzáadása ha nincsenek
    if (!document.querySelector(':root').style.getPropertyValue('--primary')) {
        document.querySelector(':root').style.setProperty('--primary', '#0066cc');
        document.querySelector(':root').style.setProperty('--accent', '#00a8ff');
    }
});