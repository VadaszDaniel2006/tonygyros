document.addEventListener('DOMContentLoaded', function() {
    
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

    // --- SEGÉDFÜGGVÉNY: Globális akció állapotának ellenőrzése ---
    // Visszaadja, hogy HÁNY DARAB "akciós hely" van még szabadon globálisan.
    // Ha 2, akkor még senki nem érte el a párt.
    // Ha 0, akkor valaki már "elvitte" a páros akciót.
    function getGlobalPromoStatus() {
        const cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
        
        // Összesítjük típusonként a mennyiségeket
        let typeCounts = {};
        
        cartItems.forEach(item => {
            if (item.type === 'gyros') {
                // Egyszerűsített név alapú kulcs (pl. "Pita Gyros")
                let key = item.name.split('(')[0].trim().split(' - ')[0].trim();
                if (!typeCounts[key]) typeCounts[key] = 0;
                typeCounts[key] += item.quantity;
            }
        });

        // Van-e már olyan típus, amiből legalább 2 van?
        let promoUsed = false;
        for (const key in typeCounts) {
            if (typeCounts[key] >= 2) {
                promoUsed = true;
                break;
            }
        }

        // Ha már felhasználták az akciót, akkor 0 hely maradt.
        // Ha még nem, akkor 2 hely van (az első párnak).
        return promoUsed ? 0 : 2;
    }

    // --- SEGÉDFÜGGVÉNY: KONKRÉT TERMÉK DARABSZÁMA A KOSÁRBAN ---
    function getSpecificItemCountInCart(baseItemName) {
        const cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
        let count = 0;
        cartItems.forEach(item => {
            if (item.name.includes(baseItemName)) {
                count += item.quantity;
            }
        });
        return count;
    }

    // --- ÁRSZÁMÍTÓ LOGIKA ---
    function calculateGyrosPrice(basePrice, quantity, currentItemName) {
        const inCartCount = getSpecificItemCountInCart(currentItemName);
        const globalSlots = getGlobalPromoStatus(); // 2 vagy 0
        
        let discountCount = 0;
        
        // Ha globálisan már "elfogyott" az akció (valaki másból már van 2 db),
        // akkor itt már hiába veszünk többet, nem lesz akciós.
        // KIVÉVE: Ha pont EZ AZ a termék, ami már akciós a kosárban!
        
        // Ellenőrizzük, hogy ez a termék-e az, ami miatt "elfogyott" a slot?
        const cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
        let isThisThePromoItem = false;
        let totalOfThisInCart = 0;
        
        // Megszámoljuk csak ezt a fajtát
        cartItems.forEach(item => {
             if (item.name.includes(currentItemName)) totalOfThisInCart += item.quantity;
        });

        // Ha ebből már van legalább 2, akkor ez a nyertes termék!
        if (totalOfThisInCart >= 2) {
            isThisThePromoItem = true;
        }

        // LOGIKA:
        
        // ESET A: Már ez a termék az akciós a kosárban (már van belőle 2)
        // Ekkor a régi szabály él: maximum az első 2 db lehet akciós összesen.
        if (isThisThePromoItem) {
            // Már megvolt a 2 db a kosárban, tehát az akciót kimaxoltuk erre a termékre.
            // Minden további darab teljes árú.
            discountCount = 0; 
        }
        
        // ESET B: Még senki nem akciós (globalSlots === 2)
        else if (globalSlots === 2) {
            const futureTotal = inCartCount + quantity;
            
            // Ha ezzel a rendeléssel elérjük a 2-t
            if (futureTotal >= 2) {
                // Hány darab kaphat kedvezményt? Maximum 2 db összesen (kosár + mostani)
                // De a kosárban lévők már ott vannak teljes áron (vagy nem), most a kijelzőt számoljuk.
                
                // Mennyi fér még bele a 2-be?
                // Pl. Kosár: 1, Most: 1 -> Össz: 2. Ebből a mostani 1 akciós (mert a 2. darab)
                // Pl. Kosár: 0, Most: 2 -> Össz: 2. Ebből mindkettő akciós.
                // Pl. Kosár: 0, Most: 3 -> Össz: 3. Ebből 2 akciós, 1 nem.
                
                // A logika: Az 1. és 2. sorszámú darab akciós.
                for (let i = 1; i <= quantity; i++) {
                    let globalIndex = inCartCount + i;
                    if (globalIndex <= 2) {
                        discountCount++;
                    }
                }
            }
        }
        
        // ESET C: Valami MÁS termék már akciós (globalSlots === 0 és nem ez a termék)
        else {
            discountCount = 0; // Nincs akció, mert más vitte el
        }

        const fullPriceCount = quantity - discountCount;
        const totalPrice = (discountCount * basePrice * 0.8) + (fullPriceCount * basePrice);
        
        return {
            totalPrice: totalPrice,
            discountCount: discountCount,
            fullPriceCount: fullPriceCount
        };
    }

    // --- MEGJELENÍTÉS FRISSÍTÉSE ---
    function updatePriceDisplay(inputElement) {
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

        // Reset
        const existingBadge = card.querySelector('.discount-badge');
        if (existingBadge) existingBadge.remove();
        priceValueSpan.classList.remove('discount-active');

        if (isGyros) {
            const calc = calculateGyrosPrice(basePrice, quantity, itemName);
            totalPrice = calc.totalPrice;

            if (calc.discountCount > 0) {
                priceValueSpan.classList.add('discount-active');
                const badge = document.createElement('span');
                badge.className = 'discount-badge';
                
                if (calc.fullPriceCount > 0) {
                    const savingsPercent = Math.round((1 - (totalPrice / (basePrice * quantity))) * 100);
                    badge.textContent = `-${savingsPercent}% (Vegyes)`;
                } else {
                    badge.textContent = '-20%';
                }
                priceValueSpan.appendChild(badge);
            }

        } else {
            totalPrice = basePrice * quantity;
        }

        const finalPriceText = Math.round(totalPrice).toLocaleString('hu-HU') + ' Ft';
        const badge = priceValueSpan.querySelector('.discount-badge');
        priceValueSpan.textContent = finalPriceText;
        if (badge) priceValueSpan.appendChild(badge);
    }

    function refreshAllOtherPrices() {
        document.querySelectorAll('.quantity-input').forEach(input => {
            updatePriceDisplay(input);
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

    // --- KOSÁRBA RAKÁS (FŐÉTELEK) ---
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

            // ÁRSZÁMÍTÁS MENTÉSHEZ
            let finalTotal = basePrice * quantity;
            
            if (!isDessert) {
                const calc = calculateGyrosPrice(basePrice, quantity, itemName);
                finalTotal = calc.totalPrice;
            }
            
            const finalPricePerItem = finalTotal / quantity;

            let cartItems = localStorage.getItem('tonyGyrosCart') ? JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];

            const newItem = {
                id: Date.now() + Math.random().toString(36).substr(2, 9),
                name: fullItemName,
                originalBasePrice: basePrice,
                price: finalPricePerItem,
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
            
            quantityInput.value = 1;
            refreshAllOtherPrices(); 
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
    
    refreshAllOtherPrices();
});