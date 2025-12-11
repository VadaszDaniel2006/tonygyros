// Kosár oldal JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // Kosár adatok betöltése
    let cartItems = localStorage.getItem('tonyGyrosCart') ? 
        JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
    
    // Elemek
    const emptyCart = document.getElementById('emptyCart');
    const fullCart = document.getElementById('fullCart');
    const cartItemsContainer = document.getElementById('cartItems');
    const cartCount = document.getElementById('cartCount');
    const clearCartBtn = document.getElementById('clearCartBtn');
    const subtotalElement = document.getElementById('subtotal');
    const deliveryFeeElement = document.getElementById('deliveryFee');
    const totalElement = document.getElementById('total');
    const checkoutTotalElement = document.getElementById('checkoutTotal');
    const addressForm = document.getElementById('addressForm');
    const orderNote = document.getElementById('orderNote');
    const charCount = document.getElementById('charCount');
    const privacyPolicy = document.getElementById('privacyPolicy');
    const checkoutBtn = document.getElementById('checkoutBtn');
    const deliveryTypeInputs = document.querySelectorAll('input[name="deliveryType"]');
    
    // Kosár frissítése
    function updateCart() {
        // Kosár számláló frissítése
        if (cartCount) {
            cartCount.textContent = cartItems.length;
        }
        
        // Üres vagy tele kosár megjelenítése
        if (cartItems.length === 0) {
            emptyCart.style.display = 'block';
            fullCart.style.display = 'none';
            checkoutBtn.disabled = true;
            return;
        } else {
            emptyCart.style.display = 'none';
            fullCart.style.display = 'block';
        }
        
        // Kosár tételek megjelenítése
        cartItemsContainer.innerHTML = '';
        
        cartItems.forEach((item, index) => {
            const cartItemElement = createCartItemElement(item, index);
            cartItemsContainer.appendChild(cartItemElement);
        });
        
        // Összesítő számítás
        updateSummary();
    }
    
    // Kosár tétel elem létrehozása
    function createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        
        // Kép URL meghatározása a típus alapján
        let imageUrl = '';
        if (item.type === 'pizza') {
            imageUrl = 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else if (item.type === 'gyros') {
            imageUrl = 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else if (item.type === 'drink') {
            imageUrl = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else {
            imageUrl = 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        }
        
        div.innerHTML = `
            <div class="cart-item-img">
                <img src="${imageUrl}" alt="${item.name}">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${item.name}</div>
                ${item.options ? `<div class="cart-item-options">${formatOptions(item.options)}</div>` : ''}
                ${item.size ? `<div class="cart-item-options">Méret: ${item.size}</div>` : ''}
                ${item.specialRequest ? `<div class="cart-item-note">${item.specialRequest}</div>` : ''}
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" data-index="${index}">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">1</span>
                    <button class="quantity-btn increase-btn" data-index="${index}">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-price">${item.price.toLocaleString()} Ft</div>
                <button class="cart-item-remove" data-index="${index}">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }
    
    // Opciók formázása
    function formatOptions(options) {
        const parts = [];
        if (options.meat) parts.push(`Hús: ${options.meat}`);
        if (options.sauce) parts.push(`Szósz: ${options.sauce}`);
        if (options.filling) parts.push(`Töltelék: ${options.filling}`);
        return parts.join(' • ');
    }
    
    // Összesítő frissítése
    function updateSummary() {
        const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
        const deliveryFee = subtotal >= 5000 ? 0 : 500;
        const total = subtotal + deliveryFee;
        
        subtotalElement.textContent = subtotal.toLocaleString() + ' Ft';
        deliveryFeeElement.textContent = deliveryFee.toLocaleString() + ' Ft';
        totalElement.textContent = total.toLocaleString() + ' Ft';
        checkoutTotalElement.textContent = total.toLocaleString() + ' Ft';
        
        // Minimum rendelési érték ellenőrzése
        const minOrder = 3000;
        if (subtotal < minOrder) {
            checkoutBtn.disabled = true;
            showNotification(`Minimum rendelési érték ${minOrder.toLocaleString()} Ft.`);
        } else {
            checkoutBtn.disabled = !privacyPolicy.checked;
        }
    }
    
    // Kosár törlése
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (confirm('Biztosan ki szeretnéd üríteni a kosarat?')) {
                cartItems = [];
                localStorage.removeItem('tonyGyrosCart');
                updateCart();
                showNotification('Kosár kiürítve!');
            }
        });
    }
    
    // Mennyiség változtatás
    document.addEventListener('click', function(e) {
        // Csökkentés
        if (e.target.closest('.decrease-btn')) {
            const index = parseInt(e.target.closest('.decrease-btn').getAttribute('data-index'));
            // Csak egy mennyiség támogatás most
            showNotification('Jelenleg csak egy darab rendelhető minden termékből.');
        }
        
        // Növelés
        if (e.target.closest('.increase-btn')) {
            const index = parseInt(e.target.closest('.increase-btn').getAttribute('data-index'));
            // Csak egy mennyiség támogatás most
            showNotification('Jelenleg csak egy darab rendelhető minden termékből. További mennyiséghez rendelj újabb darabot!');
        }
        
        // Tétel törlése
        if (e.target.closest('.cart-item-remove')) {
            const index = parseInt(e.target.closest('.cart-item-remove').getAttribute('data-index'));
            if (confirm('Biztosan el szeretnéd távolítani ezt a terméket a kosárból?')) {
                cartItems.splice(index, 1);
                localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
                updateCart();
                showNotification('Termék eltávolítva a kosárból!');
            }
        }
    });
    
    // Szállítási típus változás
    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            if (this.value === 'pickup') {
                addressForm.style.display = 'none';
            } else {
                addressForm.style.display = 'block';
            }
        });
    });
    
    // Megjegyzés karakter számláló
    if (orderNote && charCount) {
        orderNote.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // Adatkezelési nyilatkozat
    if (privacyPolicy && checkoutBtn) {
        privacyPolicy.addEventListener('change', function() {
            const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
            const minOrder = 3000;
            checkoutBtn.disabled = !this.checked || subtotal < minOrder;
        });
    }
    
    // Rendelés leadása
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (cartItems.length === 0) {
                showNotification('A kosarad üres!', 'error');
                return;
            }
            
            // Űrlap validáció
            const deliveryType = document.querySelector('input[name="deliveryType"]:checked').value;
            const phone = document.getElementById('phone');
            const address = document.getElementById('address');
            
            if (deliveryType === 'delivery') {
                if (!address.value.trim()) {
                    showNotification('Kérjük, add meg a szállítási címet!', 'error');
                    address.focus();
                    return;
                }
                if (!phone.value.trim()) {
                    showNotification('Kérjük, add meg a telefonszámot!', 'error');
                    phone.focus();
                    return;
                }
            }
            
            if (!privacyPolicy.checked) {
                showNotification('Kérjük, fogadd el az adatkezelési nyilatkozatot!', 'error');
                return;
            }
            
            // Rendelési információk összegyűjtése
            const orderData = {
                items: cartItems,
                deliveryType: deliveryType,
                address: deliveryType === 'delivery' ? address.value : null,
                phone: phone.value,
                note: orderNote.value,
                paymentMethod: document.querySelector('input[name="paymentMethod"]:checked').value,
                subtotal: cartItems.reduce((sum, item) => sum + item.price, 0),
                deliveryFee: cartItems.reduce((sum, item) => sum + item.price, 0) >= 5000 ? 0 : 500,
                total: cartItems.reduce((sum, item) => sum + item.price, 0) + (cartItems.reduce((sum, item) => sum + item.price, 0) >= 5000 ? 0 : 500),
                timestamp: new Date().toISOString(),
                orderId: 'TONY-' + Date.now()
            };
            
            // Rendelés mentése
            localStorage.setItem('tonyGyrosLastOrder', JSON.stringify(orderData));
            localStorage.removeItem('tonyGyrosCart');
            
            // Sikeres rendelés üzenet
            showNotification('Rendelésed sikeresen leadva! Hamarosan kapni fogsz egy visszaigazoló emailt.', 'success');
            
            // 3 másodperc múlva átirányítás
            setTimeout(() => {
                // Itt lehetne átirányítás a főoldalra vagy rendelési visszaigazoló oldalra
                alert(`Köszönjük a rendelést!\nRendelési azonosító: ${orderData.orderId}\nÖsszeg: ${orderData.total.toLocaleString()} Ft\nHamarosan felvesszük veled a kapcsolatot!`);
                window.location.href = 'index.html';
            }, 3000);
        });
    }
    
    // Értesítés megjelenítése
    function showNotification(message, type = 'info') {
        // Értesítés elem létrehozása
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        let icon = 'fa-info-circle';
        let bgColor = 'linear-gradient(135deg, var(--primary), var(--accent))';
        
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
            bgColor = 'linear-gradient(135deg, #dc3545, #e74c3c)';
        } else if (type === 'success') {
            icon = 'fa-check-circle';
            bgColor = 'linear-gradient(135deg, #28a745, #2ecc71)';
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
        if (!document.querySelector('#notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
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
        
        // Eltűntetés 3 másodperc után
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Inicializálás
    updateCart();
});