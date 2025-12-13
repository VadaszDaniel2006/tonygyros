// Gyros oldal JavaScript - JAVÍTOTT VERZIÓ

document.addEventListener('DOMContentLoaded', function() {
    // Termék képek adatbázis - MINDEN GYROS TERMÉK KÉPÉVEL
    const productImages = {
        // Gyros képek
        'Pita Gyros': 'https://kep.cdn.indexvas.hu/1/0/6290/62901/629012/62901235_8711d76fd70e5ee2840a4b373566ba27_wm.jpg',
        'Kis Gyros Tál': 'https://imageproxy.wolt.com/assets/66d198bf74897f2f10536598',
        'Nagy Gyros Tál': 'https://domifalatozo.hu/start/wp-content/uploads/2022/10/gyros_kicsi.jpg',
        'Gyros Tál': 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Gyros Pitában': 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Dupla Gyros': 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Gyros Tál Vegan': 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Gyros Burger': 'https://images.unsplash.com/photo-1559715745-e1b33a271c8f?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        
        // Desszert képek
        'Palacsinta': 'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Tiramisu': 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp',
        'Sütemény szelet': 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Torta szelet': 'https://www.spicebangla.com/wp-content/uploads/2024/04/chocolate-cake-1.jpg',
        'Baklava': 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/5b3a4f1ef35536dd44ed1a64ed55f2f2/Derivates/78efec556a9f9d444cae9fac03247ba34195c621.jpg',
        
        // Italok képek
        'Coca Cola 0.5L': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Fanta 0.5L': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Sprite 0.5L': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Ízesített víz 0.5L': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Ásványvíz 0.5L': 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80'
    };
    
    // Kép URL lekérése termék név alapján
    function getProductImage(productName) {
        // Távolítsuk el az opciókat a névből (pl. " (csirke)" rész)
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        
        // Keressük a pontos egyezést
        for (const [key, value] of Object.entries(productImages)) {
            if (baseName.includes(key) || key.includes(baseName)) {
                return value;
            }
        }
        
        // Ha nem találtunk egyezést, alapértelmezett kép a típus alapján
        if (baseName.toLowerCase().includes('pita') || baseName.toLowerCase().includes('gyros')) {
            return 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else if (baseName.toLowerCase().includes('tiramisu') || baseName.toLowerCase().includes('torta') || baseName.toLowerCase().includes('baklava') || baseName.toLowerCase().includes('desszert')) {
            return 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp';
        } else if (baseName.toLowerCase().includes('cola') || baseName.toLowerCase().includes('fanta') || baseName.toLowerCase().includes('sprite') || baseName.toLowerCase().includes('víz') || baseName.toLowerCase().includes('ital')) {
            return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else {
            return 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        }
    }
    
    // Kosár számláló frissítése
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
        }
    }
    
    updateCartCount();
    
    // Mennyiségválasztó funkciók
    const quantityInputs = document.querySelectorAll('.quantity-input');
    const minusButtons = document.querySelectorAll('.quantity-btn.minus');
    const plusButtons = document.querySelectorAll('.quantity-btn.plus');
    
    // Minus gomb eseménykezelő
    minusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
            }
        });
    });
    
    // Plus gomb eseménykezelő
    plusButtons.forEach(button => {
        button.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
            }
        });
    });
    
    // Input változás eseménykezelő
    quantityInputs.forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
        });
    });
    
    // Gyros opciók kezelése
    const meatInputs = document.querySelectorAll('input[type="radio"][name^="meat-"]');
    const sauceInputs = document.querySelectorAll('input[type="radio"][name^="sauce-"]');
    
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
        
        return options;
    }
    
    // Kosárba tétel gombok - GYROS TERMÉKEK
    const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-price'));
            const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
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
            
            // Egyedi ID generálás
            const itemId = Date.now() + Math.random().toString(36).substr(2, 9);
            
            // Kép URL lekérése
            const imageUrl = getProductImage(itemName);
            
            // Kosár adatok összeállítása - CSAK EGYSÉGÁR TÁROLÁSA (JAVÍTÁS)
            const cartItem = {
                id: itemId,
                name: fullItemName,
                price: basePrice,        // CSAK EGYSÉGÁR (1 db gyros) - JAVÍTVA
                quantity: quantity,      // MENNYISÉG
                options: options,
                specialRequest: specialRequest,
                image: imageUrl,
                type: 'gyros'
            };
            
            // Kosár frissítése
            let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartItems.push(cartItem);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            
            // Kosár számláló frissítése
            updateCartCount();
            
            // Sikeres üzenet - helyes számítással
            const totalPrice = basePrice * quantity;
            showNotification(`${quantity} db ${itemName.split('(')[0]} hozzáadva a kosárhoz! (${totalPrice.toLocaleString()} Ft)`);
            
            // Mennyiség visszaállítása
            menuItem.querySelector('.quantity-input').value = 1;
            
            // Speciális kérés mező törlése
            menuItem.querySelector('textarea').value = '';
            
            // Opciók visszaállítása alapértelmezettre
            const meatRadios = menuItem.querySelectorAll('input[type="radio"][name^="meat-"]');
            const sauceRadios = menuItem.querySelectorAll('input[type="radio"][name^="sauce-"]');
            
            if (meatRadios.length > 0) {
                meatRadios.forEach(radio => {
                    if (radio.value === 'csirke') {
                        radio.checked = true;
                    }
                });
            }
            
            if (sauceRadios.length > 0) {
                sauceRadios.forEach(radio => {
                    if (radio.value === 'garlic') {
                        radio.checked = true;
                    }
                });
            }
        });
    });
    
    // Italok hozzáadása
    const addDrinkButtons = document.querySelectorAll('.add-drink-btn');
    addDrinkButtons.forEach(button => {
        button.addEventListener('click', function() {
            const drinkItem = this.closest('.drink-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-price'));
            const quantity = parseInt(drinkItem.querySelector('.quantity-input').value);
            
            // Egyedi ID generálás
            const itemId = Date.now() + Math.random().toString(36).substr(2, 9);
            
            // Kép URL lekérése
            const imageUrl = getProductImage(itemName);
            
            // Kosár adatok összeállítása - CSAK EGYSÉGÁR TÁROLÁSA (JAVÍTÁS)
            const cartItem = {
                id: itemId,
                name: itemName,
                price: basePrice,        // CSAK EGYSÉGÁR (1 db ital) - JAVÍTVA
                quantity: quantity,      // MENNYISÉG
                image: imageUrl,
                type: 'drink'
            };
            
            // Kosár frissítése
            let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartItems.push(cartItem);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            
            // Kosár számláló frissítése
            updateCartCount();
            
            // Sikeres üzenet - helyes számítással
            const totalPrice = basePrice * quantity;
            showNotification(`${quantity} db ${itemName} hozzáadva a kosárhoz! (${totalPrice.toLocaleString()} Ft)`);
            
            // Mennyiség visszaállítása
            drinkItem.querySelector('.quantity-input').value = 1;
        });
    });
    
    // Értesítés megjelenítése
    function showNotification(message, type = 'success') {
        // Értesítés elem létrehozása
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        let icon = 'fa-check-circle';
        let bgColor = 'linear-gradient(135deg, var(--primary), var(--primary-dark))'; // KÉK
        
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
            bgColor = 'linear-gradient(135deg, #dc3545, #e74c3c)';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <span>${message}</span>
            </div>
        `;
        
        // Stílus hozzáadása
        notification.style.cssText = `
            position: fixed;
            top: 120px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 400px;
        `;
        
        // Animáció CSS
        if (!document.querySelector('#notification-styles-gyros')) {
            const style = document.createElement('style');
            style.id = 'notification-styles-gyros';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
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
        }
        
        // Hozzáadás a dokumentumhoz
        document.body.appendChild(notification);
        
        // Eltűntetés 4 másodperc után
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 4000);
    }
    
    // Opciók változás eseménykezelő
    meatInputs.forEach(input => {
        input.addEventListener('change', function() {
            const menuItem = this.closest('.menu-item');
            updatePriceDisplay(menuItem);
        });
    });
    
    sauceInputs.forEach(input => {
        input.addEventListener('change', function() {
            const menuItem = this.closest('.menu-item');
            updatePriceDisplay(menuItem);
        });
    });
    
    // Ár megjelenítés frissítése
    function updatePriceDisplay(menuItem) {
        const basePriceElement = menuItem.querySelector('.price');
        const options = getSelectedOptions(menuItem);
        
        // Itt lehetne ár módosítás az opciók alapján
        // Példa: ha extra húst választ, +200 Ft
        let priceAdjustment = 0;
        
        if (options.meat === 'sertes') {
            priceAdjustment += 200; // Sertés +200 Ft
        }
        
        if (options.sauce === 'tzatziki') {
            priceAdjustment += 100; // Tzatziki +100 Ft
        } else if (options.sauce === 'chili' || options.sauce === 'barbecue') {
            priceAdjustment += 150; // Extra szósz +150 Ft
        }
        
        const basePrice = parseInt(basePriceElement.textContent.replace(/[^\d]/g, ''));
        const newPrice = basePrice + priceAdjustment;
        
        // Frissítsük a gomb data-price attribútumát
        const addButton = menuItem.querySelector('.add-to-cart-btn');
        if (addButton) {
            addButton.setAttribute('data-price', newPrice);
            
            // Az ármegjelenítő frissítése is (ha van külön ármegjelenítő)
            const priceDisplay = menuItem.querySelector('.menu-item-price .price');
            if (priceDisplay) {
                priceDisplay.textContent = newPrice.toLocaleString() + ' Ft';
            }
        }
    }
});