document.addEventListener('DOMContentLoaded', function() {
    
    // --- GLOBÁLIS VÁLTOZÓ A KEDVEZMÉNY FIGYELÉSÉRE ---
    let currentDiscountOwner = null;

    // Képek adatbázisa
    const productImages = {
        'Pita Gyros': 'https://kep.cdn.indexvas.hu/1/0/6290/62901/629012/62901235_8711d76fd70e5ee2840a4b373566ba27_wm.jpg',
        'Kis Gyros Tál': 'https://imageproxy.wolt.com/assets/66d198bf74897f2f10536598',
        'Nagy Gyros Tál': 'https://domifalatozo.hu/start/wp-content/uploads/2022/10/gyros_kicsi.jpg',
        'Torta szelet': 'https://www.spicebangla.com/wp-content/uploads/2024/04/chocolate-cake-1.jpg',
        'Tiramisu': 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp',
        'Baklava': 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/5b3a4f1ef35536dd44ed1a64ed55f2f2/Derivates/78efec556a9f9d444cae9fac03247ba34195c621.jpg'
    };
    
    // Képkereső
    function getProductImage(productName) {
        if(!productName) return '';
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        for (const [key, value] of Object.entries(productImages)) {
            if (baseName.includes(key) || key.includes(baseName)) return value;
        }
        if (baseName.toLowerCase().includes('pita') || baseName.toLowerCase().includes('gyros')) return 'https://images.unsplash.com/photo-1621996346565-e3dbc353d2a5?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        if (baseName.toLowerCase().includes('cola') || baseName.toLowerCase().includes('ital')) return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        return 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
    }
    
    // Kosár frissítése (Header)
    function updateCartCount() {
        const cartCount = document.getElementById('cartCount');
        if (cartCount) {
            const cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
            cartCount.textContent = totalItems;
        }
    }
    updateCartCount();

    // --- SEGÉDFÜGGVÉNY: MEGNÉZZÜK, HÁNY GYROS VAN MÁR A KOSÁRBAN ---
    function getGyrosCountInCart() {
        const cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
        let count = 0;
        cartItems.forEach(item => {
            if (item.type === 'gyros') {
                count += item.quantity;
            }
        });
        return count;
    }

    // --- ÁR FRISSÍTŐ LOGIKA (Vizuális megjelenítés az étlapon) ---
    function updatePriceDisplay(inputElement, isTriggeredByOther = false) {
        const card = inputElement.closest('.menu-item') || inputElement.closest('.drink-item');
        const priceValueSpan = card.querySelector('.price-value') || card.querySelector('.drink-price'); 
        
        if (!priceValueSpan) return;

        let basePrice = parseInt(priceValueSpan.getAttribute('data-base-price'));
        if (isNaN(basePrice)) {
            basePrice = parseInt(priceValueSpan.textContent.replace(/\D/g, ''));
            priceValueSpan.setAttribute('data-base-price', basePrice);
        }

        const quantity = parseInt(inputElement.value);
        let totalPrice = 0;

        const addToCartBtn = card.querySelector('.add-to-cart-btn') || card.querySelector('.add-drink-btn');
        let itemName = "";
        if (addToCartBtn) itemName = addToCartBtn.getAttribute('data-item') || "";
        
        const isDessert = ['Torta', 'Tiramisu', 'Baklava', 'szelet'].some(d => itemName.includes(d));
        const isDrink = card.classList.contains('drink-item');
        const isGyros = !isDessert && !isDrink;

        // Resetelés
        const existingBadge = card.querySelector('.discount-badge');
        if (existingBadge) existingBadge.remove();
        priceValueSpan.classList.remove('discount-active');

        if (isGyros) {
            // 1. Megnézzük mennyi a limit
            const MAX_DISCOUNT_GLOBAL = 2; 
            const inCart = getGyrosCountInCart();
            
            // 2. Kiszámoljuk hány szabad akciós hely maradt globálisan
            // (Ha már van 2 a kosárban, akkor 0 marad)
            const availableSlots = Math.max(0, MAX_DISCOUNT_GLOBAL - inCart);

            // 3. Ellenőrizzük, hogy ez a kártya birtokolhatja-e a kedvezményt
            let canHaveDiscount = false;
            if (availableSlots > 0) {
                if (currentDiscountOwner === null || currentDiscountOwner === itemName) {
                    canHaveDiscount = true;
                }
            }

            // 4. ÁRSZÁMÍTÁS (Javított logika)
            if (canHaveDiscount) {
                currentDiscountOwner = itemName; // Lefoglaljuk a kedvezményt erre a termékre
                
                // Mennyi lehet akciós ebből a mennyiségből? (Maximum annyi, amennyi szabad hely van, vagy amennyit kértünk)
                const discountCount = Math.min(quantity, availableSlots);
                
                // A többi teljes árú
                const fullPriceCount = quantity - discountCount;

                // Matek: (Akciós db * Ár * 0.8) + (Teljes árú db * Ár)
                totalPrice = (discountCount * basePrice * 0.8) + (fullPriceCount * basePrice);

                // Ha van benne legalább 1 akciós darab, színezzük zöldre
                if (discountCount > 0) {
                    priceValueSpan.classList.add('discount-active');
                    const badge = document.createElement('span');
                    badge.className = 'discount-badge';
                    // Jelezzük a felhasználónak, ha vegyes az ár
                    if (fullPriceCount > 0) {
                        badge.textContent = `-${Math.round((1 - (totalPrice / (basePrice * quantity))) * 100)}% (Vegyes)`;
                    } else {
                        badge.textContent = '-20%';
                    }
                    priceValueSpan.appendChild(badge);
                }

            } else {
                // Nem kaphat kedvezményt (mert másnál van, vagy betelt a kosár)
                totalPrice = basePrice * quantity;
            }

            // Ha visszavesszük 0-ra vagy megszűnik a jogosultság, és mi voltunk a tulajdonosok, elengedjük
            if (quantity === 0 && currentDiscountOwner === itemName) {
                currentDiscountOwner = null;
                if (!isTriggeredByOther) refreshAllOtherPrices(itemName);
            }

        } else {
            // Nem Gyros -> Sima szorzás
            totalPrice = basePrice * quantity;
        }

        // Kiírás
        const finalPriceText = Math.round(totalPrice).toLocaleString('hu-HU') + ' Ft';
        const badge = priceValueSpan.querySelector('.discount-badge'); // Újra lekérjük, hogy ne vesszen el
        priceValueSpan.textContent = finalPriceText;
        if (badge) priceValueSpan.appendChild(badge);
    }

    // Frissíti a többi mezőt
    function refreshAllOtherPrices(skipItemName) {
        document.querySelectorAll('.quantity-input').forEach(input => {
            const card = input.closest('.menu-item');
            if(card) {
                const btn = card.querySelector('.add-to-cart-btn');
                if(btn) {
                    const name = btn.getAttribute('data-item');
                    if(name !== skipItemName) {
                        updatePriceDisplay(input, true);
                    }
                }
            }
        });
    }

    // --- ESEMÉNYKEZELŐK ---
    document.querySelectorAll('.quantity-btn.minus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (value > 1) {
                input.value = value - 1;
                updatePriceDisplay(input); 
            }
        });
    });
    
    document.querySelectorAll('.quantity-btn.plus').forEach(btn => {
        btn.addEventListener('click', function() {
            const input = this.parentElement.querySelector('.quantity-input');
            let value = parseInt(input.value);
            if (value < 10) {
                input.value = value + 1;
                updatePriceDisplay(input); 
            }
        });
    });

    document.querySelectorAll('.quantity-input').forEach(input => {
        input.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (value < 1) this.value = 1;
            if (value > 10) this.value = 10;
            updatePriceDisplay(this);
        });
    });

    // --- KOSÁRBA RAKÁS (FŐÉTELEK - ITT A LÉNYEGES JAVÍTÁS A MENTÉSHEZ) ---
    document.querySelectorAll('.add-to-cart-btn').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-price'));
            const quantityInput = menuItem.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);
            
            const isDessert = ['Torta', 'Tiramisu', 'Baklava', 'szelet'].some(d => itemName.includes(d));
            let specialRequest = '';
            
            if (!isDessert) {
                const textarea = menuItem.querySelector('textarea');
                if (textarea) specialRequest = textarea.value;
            }
            
            let options = {};
            let fullItemName = itemName;
            
            if (!isDessert) {
                const meat = menuItem.querySelector('input[name^="meat-"]:checked')?.value;
                const sauce = menuItem.querySelector('input[name^="sauce-"]:checked')?.value;
                if (meat) { options.meat = meat; fullItemName += ` (${meat})`; }
                if (sauce) { options.sauce = sauce; fullItemName += ` - ${sauce}`; }
            }

            // --- JAVÍTOTT ÁRSZÁMÍTÁS MENTÉSHEZ ---
            let finalTotal = basePrice * quantity; // Alapértelmezett: teljes ár
            
            if (!isDessert && currentDiscountOwner === itemName) {
                const MAX_DISCOUNT_GLOBAL = 2;
                const inCart = getGyrosCountInCart();
                const availableSlots = Math.max(0, MAX_DISCOUNT_GLOBAL - inCart);
                
                // Pontosan ugyanazt a logikát használjuk, mint a megjelenítésnél
                const discountCount = Math.min(quantity, availableSlots);
                const fullPriceCount = quantity - discountCount;
                
                finalTotal = (discountCount * basePrice * 0.8) + (fullPriceCount * basePrice);
            }
            
            // Az egységárat úgy mentjük el, hogy a végösszeg stimmeljen (átlagár)
            const finalPricePerItem = finalTotal / quantity;

            let cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];

            const newItem = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                name: fullItemName,
                originalBasePrice: basePrice,
                price: finalPricePerItem, // Ez az átlagolt ár
                quantity: quantity,
                specialRequest: specialRequest,
                image: getProductImage(itemName),
                type: isDessert ? 'desszert' : 'gyros',
                options: options
            };

            cartItems.push(newItem);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            updateCartCount();
            
            showNotification(`${quantity} db ${itemName} kosárba rakva! (${Math.round(finalTotal).toLocaleString()} Ft)`);
            
            // --- RESET ÉS FRISSÍTÉS ---
            quantityInput.value = 1;
            
            if (currentDiscountOwner === itemName) {
                currentDiscountOwner = null;
            }
            
            refreshAllOtherPrices(null);
            updatePriceDisplay(quantityInput); 
            if(!isDessert && menuItem.querySelector('textarea')) menuItem.querySelector('textarea').value = '';
        });
    });

    // --- KOSÁRBA RAKÁS (ITALOK) ---
    document.querySelectorAll('.add-drink-btn').forEach(button => {
        button.addEventListener('click', function() {
            const drinkItem = this.closest('.drink-item');
            const itemName = this.getAttribute('data-item');
            const basePrice = parseInt(this.getAttribute('data-price'));
            const quantityInput = drinkItem.querySelector('.quantity-input');
            const quantity = parseInt(quantityInput.value);

            let cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartItems.push({
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                name: itemName,
                price: basePrice,
                originalBasePrice: basePrice,
                quantity: quantity,
                image: getProductImage(itemName),
                type: 'drink'
            });

            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            updateCartCount();
            showNotification(`${quantity} db ${itemName} kosárba rakva! (${(basePrice * quantity).toLocaleString()} Ft)`);
            quantityInput.value = 1;
        });
    });

    // --- ÉRTESÍTÉS ---
    function showNotification(message) {
        const existingNotify = document.querySelector('.cart-notification');
        if (existingNotify) existingNotify.remove();

        const notification = document.createElement('div');
        notification.className = 'cart-notification'; 
        notification.innerHTML = `<i class="fas fa-check"></i><span>${message}</span>`;
        document.body.appendChild(notification);

        setTimeout(() => notification.classList.add('show'), 10);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
});