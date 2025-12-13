// Kosár oldal JavaScript - TELJES JAVÍTOTT VERZIÓ (Email formázással)

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
    
    // Form elemek
    const customerNameInput = document.getElementById('customerName');
    const addressInput = document.getElementById('address');
    const phoneInput = document.getElementById('phone');
    const floorInput = document.getElementById('floor');
    const doorInput = document.getElementById('door');
    
    // Cím mezők csoportjai
    const addressFieldGroup = document.getElementById('addressFieldGroup');
    const floorFieldGroup = document.getElementById('floorFieldGroup');
    const doorFieldGroup = document.getElementById('doorFieldGroup');
    
    // Modal elemek
    const deleteModal = document.getElementById('deleteModal');
    const clearCartModal = document.getElementById('clearCartModal');
    const modalClose = document.getElementById('modalClose');
    const clearModalClose = document.getElementById('clearModalClose');
    const cancelDelete = document.getElementById('cancelDelete');
    const confirmDelete = document.getElementById('confirmDelete');
    const cancelClear = document.getElementById('cancelClear');
    const confirmClear = document.getElementById('confirmClear');
    const deleteMessage = document.getElementById('deleteMessage');
    
    // Törlési változók
    let itemToDeleteIndex = null;
    
    // Termék képek adatbázis
    const productImages = {
        // Pizza képek
        'Pikachu Pizza': 'https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Bolognese Pizza': 'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Magyaros Pizza': 'https://production.streetkitchen-cdn.com/magyaros-pizza-scaled-5kjs0K.webp',
        'Flamenco Pizza': 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Gyrosos Pizza': 'https://donpedropizza.hu/wp-content/uploads/2021/06/Gyros-pizza-2-scaled.jpg',
        'Frutti Di Mare Pizza': 'https://eat.de/wp-content/uploads/2023/09/pizza-frutti-di-mare-3140.jpg',
        'Popei Pizza': 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80',
        'Sultan Pizza': 'https://www.donpepe.hu/storage/products/big/mexftpi.jpg',
        'Zo"Pizza Pizza': 'https://bakingamoment.com/wp-content/uploads/2024/04/IMG_3069-chicken-bacon-ranch-pizza.jpg',
        'Sonkás Pizza': "https://miklosgrill.hu/wp-content/uploads/2023/07/pizza-sonkas.jpg",
        'Songoku Pizza': "https://i0.wp.com/sprintfood.hu/wp-content/uploads/2021/05/Songoku.jpg", 
        'Prosutto Pizza': "https://banditosgyongyos.hu/wp-content/uploads/2024/10/caprese_e_crudo_banditos_pizza_gyongyos.jpg",
        'Calzone Pizza': "https://www.gozney.com/cdn/shop/files/Pepperoni_Calzone_Ines_Glasier_-_Large_cc206a79-f2d8-4bb8-a7be-b47f81548395.png?v=1728584024&width=1500",
        'Pizzaroll': "https://cookingformysoul.com/wp-content/uploads/2024/01/pepperoni-pizza-rolls-2-min-500x500.jpg",
        'Tonno Pizza': "https://premierszarvas.hu/wp-content/uploads/2020/04/39.jpg",
        'BBQ Pizza': "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
        'Húsimádó Pizza': "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/husimado-1.jpg",
        'Hawaii Pizza': "https://thecozycook.com/wp-content/uploads/2023/10/Hawaiian-Pizza-f.jpg",
        'Margaréta Pizza': "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        'Tony Pizza': "https://izekesillatok.hu/uploads/2025/01/Barbecue-Chicken-Pizza-%E2%80%93-Kaliforniabol-BBQ-szosz-csirke.webp",
        'Funghi Pizza': "https://omd-com-files.ams3.digitaloceanspaces.com/uploads/2024/Pizza%20funghi%20%28mushroom%20pizza%29.jpg",
        'Rock Pizza': "https://www.vindulge.com/wp-content/uploads/2023/02/Pizza-with-Jalapeno-Coppa-and-Hot-Honey.jpg",
        'Frankfurti Pizza': "https://pizzadonvito.com/images/2/55e81d9ea7bbcf754f7a9197db5ed83b319a08f27ed0bd055dfce5fe3333f407/dsc2866-edit-895.jpg",
        'Betyár Pizza': "https://repetatanya.hu/wp-content/uploads/2023/06/IMG_6099-1.jpg",
        'Görög Pizza': "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        'Szalámis Pizza': "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/szalamis.jpg",
        'Quattro Formaggi Pizza': "https://nz.gozney.com/cdn/shop/articles/Four_Cheese_Pizza_Feng_Chen_-_Large1.jpg?v=1731561452", 
        
        // Gyros képek
        'Pita Gyros': 'https://kep.cdn.indexvas.hu/1/0/6290/62901/629012/62901235_8711d76fd70e5ee2840a4b373566ba27_wm.jpg',
        'Kis Gyros Tál': 'https://imageproxy.wolt.com/assets/66d198bf74897f2f10536598',
        'Nagy Gyros Tál': 'https://domifalatozo.hu/start/wp-content/uploads/2022/10/gyros_kicsi.jpg',
        
        // Desszert képek
        'Tiramisu': 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp',
        'Torta szelet': 'https://www.spicebangla.com/wp-content/uploads/2024/04/chocolate-cake-1.jpg',
        'Baklava': 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/5b3a4f1ef35536dd44ed1a64ed55f2f2/Derivates/78efec556a9f9d444cae9fac03247ba34195c621.jpg',
        
        // Italok képek
        'Coca Cola 0.5L': 'https://i0.wp.com/sandwich.hu/wp-content/uploads/2023/08/Cola_500ml.webp',
        'Fanta 0.5L': 'https://static.groby.hu/media/797/278/conv/fanta-narancs_0%2C5l_103725-full.png',
        'Sprite 0.5L': 'https://static.groby.hu/media/af6/738/conv/Sprite-sz%C3%A9nsavas-%C3%BCd%C3%ADt%C5%91ital-0%2C5-l-citrom-%C3%A9s-lime-full.png',
        'Ízesített víz 0.5L': 'https://ecofamily.hu/img/66388/310140050122/330x330,r,1759399210/310140050122-1.png',
        'Ásványvíz 0.5L': 'https://p1.akcdn.net/full/162133186.szentkiralyi-szensavmentes-0-5l.jpg'
    };
    
    // Kép URL lekérése termék név alapján
    function getProductImage(productName) {
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        
        // Először próbáljuk meg a teljes névvel
        for (const [key, value] of Object.entries(productImages)) {
            if (baseName === key) {
                return value;
            }
        }
        
        // Ha nem találtuk, próbáljuk meg részleges egyezéssel
        for (const [key, value] of Object.entries(productImages)) {
            const searchName = baseName.replace(' Pizza', '').replace('Pizza', '').trim();
            const searchKey = key.replace(' Pizza', '').replace('Pizza', '').trim();
            
            if (searchName.includes(searchKey) || searchKey.includes(searchName)) {
                return value;
            }
        }
        
        // Speciális esetek
        if (baseName.includes('Zo"') || baseName.includes('Zo Pizza') || baseName.includes('Zo"Pizza')) {
            return 'https://images.unsplash.com/photo-1593246049226-ded77bf90326?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
        }
        
        if (baseName.toLowerCase().includes('gyros') || baseName.toLowerCase().includes('pita')) {
            return 'https://kep.cdn.indexvas.hu/1/0/6290/62901/629012/62901235_8711d76fd70e5ee2840a4b373566ba27_wm.jpg';
        }
        
        // Alapértelmezett képek
        if (baseName.toLowerCase().includes('pizza')) {
            return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else if (baseName.toLowerCase().includes('tiramisu') || baseName.toLowerCase().includes('torta') || baseName.toLowerCase().includes('baklava')) {
            return 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp';
        } else if (baseName.toLowerCase().includes('cola') || baseName.toLowerCase().includes('fanta') || baseName.toLowerCase().includes('sprite') || baseName.toLowerCase().includes('víz') || baseName.toLowerCase().includes('ital')) {
            return 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        } else {
            return 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
        }
    }
    
    // ==================== SZÁLLÍTÁSI TÍPUS KEZELÉSE ====================
    
    // Cím mezők elrejtése/megjelenítése
    function toggleAddressFields(isDelivery) {
        if (isDelivery) {
            // Kiszállítás: minden cím mező látható
            if (addressFieldGroup) addressFieldGroup.style.display = 'block';
            if (floorFieldGroup) floorFieldGroup.style.display = 'block';
            if (doorFieldGroup) doorFieldGroup.style.display = 'block';
            
            // Cím mező kötelező
            if (addressInput) {
                addressInput.required = true;
                addressInput.placeholder = 'Pl.: Keszthely, Délden tér 2.';
            }
            
            // Cím label
            const addressLabel = document.querySelector('label[for="address"]');
            if (addressLabel) addressLabel.textContent = 'Cím *';
            
        } else {
            // Személyes átvétel: csak név és telefon
            if (addressFieldGroup) addressFieldGroup.style.display = 'none';
            if (floorFieldGroup) floorFieldGroup.style.display = 'none';
            if (doorFieldGroup) doorFieldGroup.style.display = 'none';
            
            // Cím mező nem kötelező
            if (addressInput) {
                addressInput.required = false;
                addressInput.value = ''; // Ürítjük a mezőt
            }
            if (floorInput) floorInput.value = '';
            if (doorInput) doorInput.value = '';
        }
        
        // Összesítő frissítése
        updateSummary();
    }
    
    // Szállítási típus változás eseménykezelő
    deliveryTypeInputs.forEach(input => {
        input.addEventListener('change', function() {
            const isDelivery = this.value === 'delivery';
            toggleAddressFields(isDelivery);
        });
    });
    
    // Oldal betöltésekor beállítjuk alapértelmezettként a kiszállítást
    toggleAddressFields(true);
    
    // ==================== KOSÁR FUNKCIÓK ====================
    
    // Kosár frissítése
    function updateCart() {
        // Kosár számláló frissítése
        if (cartCount) {
            cartCount.textContent = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
        }
        
        // Üres vagy tele kosár megjelenítése
        if (cartItems.length === 0) {
            if (emptyCart) emptyCart.style.display = 'block';
            if (fullCart) fullCart.style.display = 'none';
            if (checkoutBtn) checkoutBtn.disabled = true;
            return;
        } else {
            if (emptyCart) emptyCart.style.display = 'none';
            if (fullCart) fullCart.style.display = 'block';
        }
        
        // Kosár tételek megjelenítése
        if (cartItemsContainer) {
            cartItemsContainer.innerHTML = '';
            
            cartItems.forEach((item, index) => {
                const cartItemElement = createCartItemElement(item, index);
                cartItemsContainer.appendChild(cartItemElement);
            });
            
            // Mennyiség gombok eseménykezelők hozzáadása
            attachQuantityEventListeners();
        }
        
        // Összesítő számítás
        updateSummary();
        
        // Alapértelmezett form adatok beállítása
        setDefaultFormData();
    }
    
    // Alapértelmezett form adatok beállítása
    function setDefaultFormData() {
        const savedPhone = localStorage.getItem('tonyGyrosPhone');
        if (savedPhone && phoneInput) {
            phoneInput.value = savedPhone;
        }
        
        const savedAddress = localStorage.getItem('tonyGyrosAddress');
        if (savedAddress && addressInput) {
            addressInput.value = savedAddress;
        }
        
        const savedName = localStorage.getItem('tonyGyrosName');
        if (savedName && customerNameInput) {
            customerNameInput.value = savedName;
        }
        
        const savedFloor = localStorage.getItem('tonyGyrosFloor');
        if (savedFloor && floorInput) {
            floorInput.value = savedFloor;
        }
        
        const savedDoor = localStorage.getItem('tonyGyrosDoor');
        if (savedDoor && doorInput) {
            doorInput.value = savedDoor;
        }
    }
    
    // Opciók formázása - JAVÍTOTT VERZIÓ
    function formatOptions(options) {
        if (!options || typeof options !== 'object') return '';
        
        const parts = [];
        
        // Csak akkor adjuk hozzá, ha valódi érték van
        if (options.meat && options.meat.trim() !== '') {
            parts.push(options.meat);
        }
        
        if (options.sauce && options.sauce.trim() !== '') {
            parts.push(options.sauce);
        }
        
        if (options.filling && options.filling.trim() !== '') {
            parts.push(options.filling);
        }
        
        if (options.extras && Array.isArray(options.extras)) {
            const validExtras = options.extras.filter(extra => extra && extra.trim() !== '');
            if (validExtras.length > 0) {
                parts.push(...validExtras);
            }
        }
        
        // Visszaadjuk a részeket, de nem formázzuk túl
        return parts.length > 0 ? parts.join(' - ') : '';
    }
    
    // Kosár tétel elem létrehozása - JAVÍTOTT
    function createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.setAttribute('data-index', index);
        
        const imageUrl = getProductImage(item.name);
        
        // Alapár
        const basePrice = parseFloat(item.basePrice || item.price || 0);
        
        // Extra feltételek ára
        const extraCost = parseFloat(item.extraCost || 0);
        
        // Egységár
        const unitPrice = basePrice + extraCost;
        
        // Mennyiség
        const itemQuantity = parseInt(item.quantity || 1);
        
        // Teljes ár
        const totalPrice = unitPrice * itemQuantity;
        
        // Termék név összeállítása
        let productName = item.name.split('(')[0].split(' - ')[0].trim();
        
        // Opciók hozzáadása a névhez
        const optionsText = formatOptions(item.options);
        if (optionsText) {
            productName += ` (${optionsText})`;
        }
        
        // Méret hozzáadása (ha van)
        if (item.size) {
            productName += ` - ${item.size}`;
        }
        
        // Extra feltételek formázása (ha vannak)
        const extrasHtml = item.extraToppings && item.extraToppings.length > 0 ? 
            `<div class="cart-item-extras">
                <small>Extra feltételek:</small>
                ${item.extraToppings.map(extra => 
                    `<div class="extra-item">
                        <span>${extra.name}</span>
                        <span class="extra-price">+${extra.price} Ft</span>
                    </div>`
                ).join('')}
            </div>` : '';
        
        // Speciális kérés (ha van)
        const specialRequestHtml = item.specialRequest && item.specialRequest.trim() !== '' ? 
            `<div class="cart-item-note">
                <small>Megjegyzés:</small>
                <span>${item.specialRequest}</span>
            </div>` : '';
        
        // HTML generálás
        div.innerHTML = `
            <div class="cart-item-img">
                <img src="${imageUrl}" alt="${productName}" onerror="this.src='https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'">
            </div>
            <div class="cart-item-details">
                <div class="cart-item-name">${productName}</div>
                <div class="cart-item-price-info">
                    <span class="unit-price">${unitPrice.toLocaleString('hu-HU')} Ft/db</span>
                </div>
                ${extrasHtml}
                ${specialRequestHtml}
            </div>
            <div class="cart-item-controls">
                <div class="quantity-controls">
                    <button class="quantity-btn decrease-btn" type="button">
                        <i class="fas fa-minus"></i>
                    </button>
                    <span class="quantity-display">${itemQuantity}</span>
                    <button class="quantity-btn increase-btn" type="button">
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
                <div class="cart-item-total">
                    <span class="cart-item-quantity">${itemQuantity} db × ${unitPrice.toLocaleString('hu-HU')} Ft =</span>
                    <span class="cart-item-price">${totalPrice.toLocaleString('hu-HU')} Ft</span>
                </div>
                <button class="cart-item-remove" type="button">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        `;
        
        return div;
    }
    
    // Mennyiség gombok eseménykezelőinek hozzáadása
    function attachQuantityEventListeners() {
        // Csökkentés gombok
        document.querySelectorAll('.decrease-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                decreaseQuantity(index);
            });
        });
        
        // Növelés gombok
        document.querySelectorAll('.increase-btn').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                increaseQuantity(index);
            });
        });
        
        // Törlés gombok
        document.querySelectorAll('.cart-item-remove').forEach(btn => {
            btn.addEventListener('click', function() {
                const index = parseInt(this.closest('.cart-item').getAttribute('data-index'));
                showDeleteModal(index);
            });
        });
    }
    
    // Törlés modal megjelenítése
    function showDeleteModal(index) {
        if (index >= 0 && index < cartItems.length && deleteModal) {
            itemToDeleteIndex = index;
            const itemName = cartItems[index].name.split('(')[0].split(' - ')[0].trim();
            if (deleteMessage) deleteMessage.textContent = `Biztosan el szeretnéd távolítani a(z) "${itemName}" terméket a kosárból?`;
            if (deleteModal) deleteModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Teljes kosár törlés modal megjelenítése
    function showClearCartModal() {
        if (cartItems.length > 0 && clearCartModal) {
            clearCartModal.style.display = 'flex';
            document.body.style.overflow = 'hidden';
        }
    }
    
    // Modal bezárása
    function closeModal(modal) {
        if (modal) modal.style.display = 'none';
        itemToDeleteIndex = null;
        document.body.style.overflow = 'auto';
    }
    
    // Mennyiség csökkentése
    function decreaseQuantity(index) {
        if (index >= 0 && index < cartItems.length) {
            if (cartItems[index].quantity && cartItems[index].quantity > 1) {
                cartItems[index].quantity--;
                localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
                updateCart();
                showNotification('Mennyiség csökkentve!', 'success');
            } else {
                showDeleteModal(index);
            }
        }
    }
    
    // Mennyiség növelése
    function increaseQuantity(index) {
        if (index >= 0 && index < cartItems.length) {
            if (!cartItems[index].quantity) {
                cartItems[index].quantity = 1;
            }
            if (cartItems[index].quantity < 10) {
                cartItems[index].quantity++;
                localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
                updateCart();
                showNotification('Mennyiség növelve!', 'success');
            } else {
                showNotification('Maximum 10 db rendelhető egy termékből!', 'error');
            }
        }
    }
    
    // Tétel eltávolítása
    function removeItem() {
        if (itemToDeleteIndex !== null && itemToDeleteIndex >= 0 && itemToDeleteIndex < cartItems.length) {
            const removedItem = cartItems[itemToDeleteIndex];
            cartItems.splice(itemToDeleteIndex, 1);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            updateCart();
            
            const itemName = removedItem.name.split('(')[0].split(' - ')[0].trim();
            showNotification(`"${itemName}" eltávolítva a kosárból!`, 'success');
            
            closeModal(deleteModal);
        }
    }
    
    // Teljes kosár törlése
    function clearCart() {
        cartItems = [];
        localStorage.removeItem('tonyGyrosCart');
        updateCart();
        showNotification('Kosár sikeresen kiürítve!', 'success');
        closeModal(clearCartModal);
    }
    
    // Összesítő frissítése
    function updateSummary() {
        // Részösszeg számítása (alapár + extrak ára) * mennyiség
        const subtotal = cartItems.reduce((sum, item) => {
            // Alapár
            const basePrice = parseFloat(item.basePrice || item.price || 0);
            
            // Extra feltételek ára
            const extraCost = parseFloat(item.extraCost || 0);
            
            // Egységár: alapár + extrak
            const unitPrice = basePrice + extraCost;
            
            // Mennyiség
            const quantity = parseInt(item.quantity || 1);
            
            // Tétel összár: (alapár + extrak) * mennyiség
            return sum + (unitPrice * quantity);
        }, 0);
        
        // Szállítási díj számítása
        const deliveryTypeElement = document.querySelector('input[name="deliveryType"]:checked');
        const isDelivery = deliveryTypeElement ? deliveryTypeElement.value === 'delivery' : true;
        
        let deliveryFee = 0;
        if (isDelivery) {
            // Kiszállítás: 0 Ft ha legalább 5000 Ft a rendelés, egyébként 500 Ft
            deliveryFee = subtotal >= 5000 ? 0 : 500;
        } else {
            // Személyes átvétel: mindig 0 Ft
            deliveryFee = 0;
        }
        
        const total = subtotal + deliveryFee;
        
        // Elemek frissítése
        if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString('hu-HU') + ' Ft';
        if (deliveryFeeElement) deliveryFeeElement.textContent = deliveryFee.toLocaleString('hu-HU') + ' Ft';
        if (totalElement) totalElement.textContent = total.toLocaleString('hu-HU') + ' Ft';
        if (checkoutTotalElement) checkoutTotalElement.textContent = total.toLocaleString('hu-HU') + ' Ft';
        
        // Adatkezelési nyilatkozat ellenőrzése
        if (privacyPolicy && checkoutBtn) {
            const isPrivacyAccepted = privacyPolicy.checked;
            
            if (!isPrivacyAccepted) {
                checkoutBtn.disabled = true;
                checkoutBtn.title = 'Fogadd el az adatkezelési nyilatkozatot';
            } else {
                checkoutBtn.disabled = false;
                checkoutBtn.title = 'Rendelés leadása';
            }
        }
    }
    
    // ==================== EMAIL KÜLDÉS ====================
    
    // EMAIL KÜLDÉS FUNKCIÓ - PONTOS FORMÁTUM
    function sendOrderEmail(orderData) {
        return new Promise((resolve) => {
            try {
                // FormSubmit-be beküldés
                const form = document.createElement('form');
                form.method = 'POST';
                form.action = 'https://formsubmit.co/csipesz900@gmail.com';
                form.style.display = 'none';
                
                // Pontos formátumú email szöveg
                const emailMessage = createEmailText(orderData);
                
                // FormSubmit mezők
                const fields = {
                    '_subject': `TONY GYROS - Új rendelés (${orderData.orderNumber})`,
                    '_next': window.location.origin + '/rendeles-sikeres.html',
                    '_captcha': 'false',
                    '_template': 'basic',
                    'Rendelési szám': orderData.orderNumber,
                    'message': emailMessage
                };
                
                // Input mezők hozzáadása
                for (const [name, value] of Object.entries(fields)) {
                    const input = document.createElement('input');
                    input.type = 'hidden';
                    input.name = name;
                    input.value = value;
                    form.appendChild(input);
                }
                
                // Form elküldése
                document.body.appendChild(form);
                form.submit();
                
                // Sikeres küldés
                resolve(true);
                
                // Form eltávolítása
                setTimeout(() => {
                    if (form.parentNode) {
                        form.parentNode.removeChild(form);
                    }
                }, 2000);
                
            } catch (error) {
                console.error('Hiba az email küldésekor:', error);
                resolve(false);
            }
        });
    }
    
    // SZÖVEGES EMAIL LÉTREHOZÁSA - PONTOS FORMÁTUM
    function createEmailText(orderData) {
        const orderDate = new Date(orderData.timestamp);
        const formattedDate = orderDate.toLocaleDateString('hu-HU', {
            year: 'numeric', 
            month: 'long', 
            day: 'numeric',
            hour: '2-digit', 
            minute: '2-digit'
        });
        
        const deliveryType = orderData.deliveryType === 'delivery' ? 'Kiszállítás' : 'Személyes átvétel';
        let paymentMethod = 'Készpénz';
        if (orderData.paymentMethod === 'card') paymentMethod = 'Bankkártya';
        
        // Tételek részletesen - PONTOS FORMÁTUM
        let itemsText = '';
        if (orderData.items && Array.isArray(orderData.items)) {
            itemsText = orderData.items.map(item => {
                // Alapár
                const basePrice = parseFloat(item.basePrice || item.price || 0);
                
                // Extra feltételek ára (de nem listázzuk ki)
                const extraCost = parseFloat(item.extraCost || 0);
                
                // Egységár: alapár + extrak
                const unitPrice = basePrice + extraCost;
                
                // Mennyiség
                const quantity = item.quantity || 1;
                
                // Tétel összár: (alapár + extrak) * mennyiség
                const itemTotal = unitPrice * quantity;
                
                // Termék név összeállítása a pontos formátumhoz
                let itemName = item.name.split('(')[0].split(' - ')[0].trim();
                
                // Opciók hozzáadása a névhez (csak opciók, nem extra feltételek)
                if (item.options) {
                    const optionsText = formatOptions(item.options);
                    if (optionsText) {
                        itemName += ` (${optionsText})`;
                    }
                }
                
                // Méret hozzáadása (ha van)
                if (item.size) {
                    itemName += ` - ${item.size}`;
                }
                
                // Csak speciális kérés (extra feltételek NEM szerepelnek)
                let specialRequestLine = '';
                if (item.specialRequest && item.specialRequest.trim() !== '') {
                    specialRequestLine = `\n  Megjegyzés: ${item.specialRequest}`;
                }
                
                // Visszatérünk a teljes formázott sorral
                return `${itemName} - ${quantity} db x ${unitPrice.toLocaleString('hu-HU')} Ft = ${itemTotal.toLocaleString('hu-HU')} Ft${specialRequestLine}`;
            }).join('\n');
        }
        
        // Cím sor az átvételi mód alapján - EGYSZER, nem duplán!
        let addressLine = '';
        if (orderData.deliveryType === 'delivery') {
            addressLine = `Cím: ${orderData.address}`;
            
            // Emelet és ajtó hozzáadása CSAK ha vannak
            const floor = orderData.floor || '';
            const door = orderData.door || '';
            if (floor && floor.trim() !== '') addressLine += `, ${floor}. emelet`;
            if (door && door.trim() !== '') addressLine += `, ${door}. ajtó`;
        } else {
            addressLine = `Átvétel helye: Tony Gyros, Keszthely, Délden tér 2.`;
        }
        
        // Pontos formátum az emailhez
        return `TONY GYROS KESZTHELY - ÚJ RENDELÉS

RENDELÉSI SZÁM: ${orderData.orderNumber}
RENDELÉS IDEJE: ${formattedDate}

VEVŐI ADATOK:
Név: ${orderData.customerName}
Telefonszám: ${orderData.phone}
${addressLine}

RENDELT TERMÉKEK:
${itemsText}

ÖSSZESÍTŐ:
Részösszeg: ${orderData.subtotal.toLocaleString('hu-HU')} Ft
Szálítási díj: ${orderData.deliveryFee.toLocaleString('hu-HU')} Ft
ÖSSZESEN: ${orderData.total.toLocaleString('hu-HU')} Ft

Fizetési mód: ${paymentMethod}

${orderData.note ? `\nMegjegyzés: ${orderData.note}` : ''}

------------------------------------------
Tony Gyros Keszthely
Keszthely, Délden tér 2.
Tel: +36 30 123 4567
Email: info@tonygyros.hu`;
    }
    
    // ALTERNATÍV EMAIL KÜLDÉS MailTo linkkel
    function sendOrderEmailAlternative(orderData) {
        try {
            // Email összeállítása a pontos formátummal
            const subject = encodeURIComponent(`TONY GYROS - Új rendelés (${orderData.orderNumber})`);
            const body = encodeURIComponent(createEmailText(orderData));
            
            // Mailto link megnyitása
            const mailtoLink = `mailto:csipesz900@gmail.com?subject=${subject}&body=${body}`;
            window.open(mailtoLink, '_blank');
            
            return true;
        } catch (error) {
            console.error('Alternatív email küldés hiba:', error);
            return false;
        }
    }
    
    // ==================== ESEMÉNYKEZELŐK ====================
    
    // Modal eseménykezelők
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', showClearCartModal);
    }
    
    if (modalClose) {
        modalClose.addEventListener('click', () => closeModal(deleteModal));
    }
    
    if (clearModalClose) {
        clearModalClose.addEventListener('click', () => closeModal(clearCartModal));
    }
    
    if (cancelDelete) {
        cancelDelete.addEventListener('click', () => closeModal(deleteModal));
    }
    
    if (confirmDelete) {
        confirmDelete.addEventListener('click', removeItem);
    }
    
    if (cancelClear) {
        cancelClear.addEventListener('click', () => closeModal(clearCartModal));
    }
    
    if (confirmClear) {
        confirmClear.addEventListener('click', clearCart);
    }
    
    // Modal bezárása kattintásra a háttérre
    [deleteModal, clearCartModal].forEach(modal => {
        if (modal) {
            modal.addEventListener('click', function(e) {
                if (e.target === this) {
                    closeModal(this);
                }
            });
        }
    });
    
    // Megjegyzés karakter számláló
    if (orderNote && charCount) {
        orderNote.addEventListener('input', function() {
            charCount.textContent = this.value.length;
        });
    }
    
    // Adatkezelési nyilatkozat
    if (privacyPolicy && checkoutBtn) {
        privacyPolicy.addEventListener('change', updateSummary);
    }
    
    // Form adatok mentése
    if (phoneInput) {
        phoneInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosPhone', this.value);
        });
    }
    
    if (addressInput) {
        addressInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosAddress', this.value);
        });
    }
    
    if (customerNameInput) {
        customerNameInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosName', this.value);
        });
    }
    
    if (floorInput) {
        floorInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosFloor', this.value);
        });
    }
    
    if (doorInput) {
        doorInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosDoor', this.value);
        });
    }
    
    // ==================== RENDELÉS LEADÁSA ====================
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', async function(e) {
            e.preventDefault();
            
            // 1. Kosár ellenőrzése
            if (cartItems.length === 0) {
                showNotification('A kosarad üres! Először adj hozzá termékeket.', 'error');
                return;
            }
            
            // 2. Űrlap elemek ellenőrzése
            const deliveryTypeElement = document.querySelector('input[name="deliveryType"]:checked');
            const paymentMethodElement = document.querySelector('input[name="paymentMethod"]:checked');
            
            if (!deliveryTypeElement || !paymentMethodElement) {
                showNotification('Kérjük, válassz szállítási és fizetési módot!', 'error');
                return;
            }
            
            const deliveryType = deliveryTypeElement.value;
            const paymentMethod = paymentMethodElement.value;
            const customerName = customerNameInput ? customerNameInput.value.trim() : '';
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            const floor = floorInput ? floorInput.value.trim() : '';
            const door = doorInput ? doorInput.value.trim() : '';
            const phoneRegex = /^(\+36|06)[\d\s]{8,12}$/;
            
            // 3. Közös validációk (mindkét átvételi módhoz)
            if (!customerName) {
                showNotification('Kérjük, add meg a neved!', 'error');
                if (customerNameInput) customerNameInput.focus();
                return;
            }
            
            if (!phone) {
                showNotification('Kérjük, add meg a telefonszámot!', 'error');
                if (phoneInput) phoneInput.focus();
                return;
            }
            
            if (!phoneRegex.test(phone)) {
                showNotification('Kérjük, érvényes magyar telefonszámot adj meg! (Pl.: +36 30 123 4567 vagy 06301234567)', 'error');
                if (phoneInput) phoneInput.focus();
                return;
            }
            
            // 4. Szállítás típus szerinti validáció
            let fullAddress = '';
            if (deliveryType === 'delivery') {
                // Kiszállítás: cím kötelező
                if (!address) {
                    showNotification('Kérjük, add meg a szállítási címet!', 'error');
                    if (addressInput) addressInput.focus();
                    return;
                }
                
                if (address.length < 10) {
                    showNotification('Kérjük, adj meg egy részletesebb címet! (legalább 10 karakter)', 'error');
                    if (addressInput) addressInput.focus();
                    return;
                }
                
                // Teljes cím összeállítása - csak az alapcím
                fullAddress = address;
            } else {
                // Személyes átvétel
                fullAddress = 'Tony Gyros, Keszthely, Délden tér 2.';
            }
            
            // 5. Adatkezelési nyilatkozat ellenőrzése
            if (privacyPolicy && !privacyPolicy.checked) {
                showNotification('El kell fogadnod az adatkezelési nyilatkozatot a rendeléshez!', 'error');
                privacyPolicy.focus();
                return;
            }
            
            // 6. Összegek számítása
            const subtotal = cartItems.reduce((sum, item) => {
                // Alapár
                const basePrice = parseFloat(item.basePrice || item.price || 0);
                
                // Extra feltételek ára
                const extraCost = parseFloat(item.extraCost || 0);
                
                // Egységár: alapár + extrak
                const unitPrice = basePrice + extraCost;
                
                // Mennyiség
                const quantity = parseInt(item.quantity || 1);
                
                // Tétel összár: (alapár + extrak) * mennyiség
                return sum + (unitPrice * quantity);
            }, 0);
            
            const deliveryFee = deliveryType === 'delivery' ? (subtotal >= 5000 ? 0 : 500) : 0;
            const total = subtotal + deliveryFee;
            
            // 7. Rendelési adatok összegyűjtése
            const orderData = {
                items: cartItems.map(item => ({
                    name: item.name,
                    basePrice: parseFloat(item.basePrice || item.price || 0),
                    extraToppings: item.extraToppings || [],
                    extraCost: parseFloat(item.extraCost || 0),
                    quantity: parseInt(item.quantity || 1),
                    specialRequest: item.specialRequest || '',
                    options: item.options || null,
                    size: item.size || '',
                    type: item.type || 'product'
                })),
                customerName: customerName,
                deliveryType: deliveryType,
                paymentMethod: paymentMethod,
                phone: phone,
                address: fullAddress,
                floor: floor,
                door: door,
                note: orderNote ? orderNote.value.trim() : '',
                subtotal: subtotal,
                deliveryFee: deliveryFee,
                total: total,
                timestamp: new Date().toISOString(),
                orderNumber: 'TONY-' + Date.now().toString().slice(-8),
                status: 'Feldolgozás alatt'
            };
            
            // 8. Mentés localStorage-ba
            localStorage.setItem('tonyGyrosLastOrder', JSON.stringify(orderData));
            
            // 9. Email küldése
            try {
                // A gomb letiltása a többszöri kattintás elkerülésére
                checkoutBtn.disabled = true;
                checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rendelés küldése...';
                
                // Email küldése
                const emailSent = await sendOrderEmail(orderData);
                
                if (emailSent) {
                    showNotification('Rendelésed sikeresen leadva! Hamarosan megerősítjük.', 'success');
                    
                    // 10. Kosár kiürítése
                    cartItems = [];
                    localStorage.removeItem('tonyGyrosCart');
                    
                    // 11. Átirányítás a sikeres oldalra
                    setTimeout(() => {
                        window.location.href = 'rendeles-sikeres.html';
                    }, 2000);
                } else {
                    // Alternatív megoldás ajánlása
                    showNotification('Rendelésed elkészült! Egy ablak nyílik az email kézi elküldéséhez.', 'info');
                    
                    // Email ablak megnyitása
                    sendOrderEmailAlternative(orderData);
                    
                    // Kosár kiürítése
                    cartItems = [];
                    localStorage.removeItem('tonyGyrosCart');
                    
                    // Átirányítás
                    setTimeout(() => {
                        window.location.href = 'rendeles-sikeres.html';
                    }, 3000);
                }
            } catch (error) {
                console.error('Rendelés hiba:', error);
                showNotification('Hiba történt, kérlek próbáld újra!', 'error');
                checkoutBtn.disabled = false;
                checkoutBtn.innerHTML = '<i class="fas fa-shopping-cart"></i> Rendelés leadása';
            }
        });
    }
    
    // ==================== SEGÉDFÜGGVÉNYEK ====================
    
    // Értesítés megjelenítése
    function showNotification(message, type) {
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#4CAF50' : '#f44336'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            min-width: 300px;
            max-width: 400px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideIn 0.3s ease-out;
        `;
        
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = `
            background: none;
            border: none;
            color: white;
            cursor: pointer;
            margin-left: 10px;
            font-size: 14px;
            padding: 4px;
        `;
        
        if (!document.querySelector('#notification-animation')) {
            const style = document.createElement('style');
            style.id = 'notification-animation';
            style.textContent = `
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOut {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
            document.head.appendChild(style);
        }
        
        closeBtn.addEventListener('click', () => {
            notification.style.animation = 'slideOut 0.3s ease-out forwards';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        });
        
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.animation = 'slideOut 0.3s ease-out forwards';
                setTimeout(() => {
                    if (notification.parentNode) {
                        notification.parentNode.removeChild(notification);
                    }
                }, 300);
            }
        }, 5000);
        
        document.body.appendChild(notification);
    }
    
    // ==================== INICIALIZÁLÁS ====================
    
    // Oldal betöltésekor kosár frissítése
    updateCart();
    
    // Karakterszámláló inicializálása
    if (orderNote && charCount) {
        charCount.textContent = orderNote.value.length;
    }
});