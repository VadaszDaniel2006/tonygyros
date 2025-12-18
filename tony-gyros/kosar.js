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
    const emailInput = document.getElementById('customerEmail'); // ÚJ: Email mező
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
    
    // ==================== ÁRAK ÉS KÉPEK KEZELÉSE ====================
    
    // Termékek normál árai és a darabonként LEVONANDÓ kedvezmény mértéke
    const productPrices = {
        'Pita Gyros': { normal: 1600, discountAmount: 320 }, 
        'Kis Gyros Tál': { normal: 2700, discountAmount: 540 }, 
        'Nagy Gyros Tál': { normal: 3800, discountAmount: 760 } 
    };
    
    // Kép URL lekérése termék név alapján
    function getProductImage(productName) {
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        
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
        
        // ÚJ: Email betöltése
        const savedEmail = localStorage.getItem('tonyGyrosEmail');
        if (savedEmail && emailInput) {
            emailInput.value = savedEmail;
        }
    }
    
    // Opciók formázása
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
    
    // Kosár tétel elem létrehozása
    function createCartItemElement(item, index) {
        const div = document.createElement('div');
        div.className = 'cart-item';
        div.setAttribute('data-index', index);
        
        const baseName = item.name.split('(')[0].split(' - ')[0].trim();
        const imageUrl = getProductImage(baseName);
        
        // ÁR KEZELÉS:
        // Mindig a productPrices-ból olvassuk ki a hivatalos "normal" árat, ha létezik
        let basePrice = parseFloat(item.basePrice || item.price || 0);
        
        if (productPrices[baseName]) {
            basePrice = productPrices[baseName].normal;
        }
        
        // Extra feltételek ára
        const extraCost = parseFloat(item.extraCost || 0);
        
        // Egységár: alapár + extrák
        const unitPrice = basePrice + extraCost;
        
        // Mennyiség
        const itemQuantity = parseInt(item.quantity || 1);
        
        // Teljes ár
        const totalPrice = unitPrice * itemQuantity;
        
        // Termék név összeállítása
        let productName = baseName;
        
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
            const item = cartItems[index];
            const baseName = item.name.split('(')[0].split(' - ')[0].trim();
            if (deleteMessage) deleteMessage.textContent = `Biztosan el szeretnéd távolítani a(z) "${baseName}" terméket a kosárból?`;
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
            const baseName = removedItem.name.split('(')[0].split(' - ')[0].trim();
            cartItems.splice(itemToDeleteIndex, 1);
            localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
            updateCart();
            
            showNotification(`"${baseName}" eltávolítva a kosárból!`, 'success');
            
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
    
    // ==================== JAVÍTOTT ÖSSZESÍTŐ ====================
    
    // Összesítő frissítése
    function updateSummary() {
        let subtotal = 0;
        let discountTotal = 0;
        
        // Változók a kedvezmény logikához
        let discountedCount = 0;

        // 1. Részösszeg számítása (Teljes árakon)
        cartItems.forEach(item => {
            const baseName = item.name.split('(')[0].split(' - ')[0].trim();
            
            // Biztosítjuk, hogy a helyes teljes árral számoljunk
            let basePrice = parseFloat(item.basePrice || item.price || 0);
            if (productPrices[baseName]) {
                basePrice = productPrices[baseName].normal;
            }
            
            const extraCost = parseFloat(item.extraCost || 0);
            const unitPrice = basePrice + extraCost;
            const quantity = parseInt(item.quantity || 1);
            
            subtotal += (unitPrice * quantity);
        });

        // 2. Kedvezmény számítása
        
        // Segédváltozók az előzetes ellenőrzéshez
        let targetGyrosName = null;
        let targetGyrosTotalQuantity = 0;

        // A. lépés: Megkeressük az első Gyros típust és megszámoljuk, összesen mennyi van belőle
        cartItems.forEach(item => {
            const baseName = item.name.split('(')[0].split(' - ')[0].trim();
            // Ha ez egy Gyros (szerepel az árlistában)
            if (productPrices[baseName]) {
                if (targetGyrosName === null) {
                    targetGyrosName = baseName; // Kiválasztjuk ezt a típust akcióra
                }
                // Ha ez a tétel a kiválasztott típus, hozzáadjuk a darabszámot
                if (baseName === targetGyrosName) {
                    targetGyrosTotalQuantity += parseInt(item.quantity || 1);
                }
            }
        });

        // B. lépés: Csak akkor vonunk le kedvezményt, ha az összmennyiség eléri a 2-t
        if (targetGyrosTotalQuantity >= 2) {
            cartItems.forEach(item => {
                const baseName = item.name.split('(')[0].split(' - ')[0].trim();
                
                // Ha ez a tétel az akciós Gyros
                if (baseName === targetGyrosName) {
                    const quantity = parseInt(item.quantity || 1);
                    const savingPerItem = productPrices[baseName].discountAmount;
                    
                    // Kiszámoljuk hány darabra érvényesíthető még a kedvezmény (Max 2 összesen a teljes kosárban)
                    const remainingSlots = 2 - discountedCount;
                    
                    if (remainingSlots > 0) {
                        // Vagy a tétel teljes mennyisége, vagy amennyi még hátravan a 2-es limitig
                        const itemsToDiscount = Math.min(quantity, remainingSlots);
                        
                        discountTotal += (itemsToDiscount * savingPerItem);
                        discountedCount += itemsToDiscount;
                    }
                }
            });
        }
        
        // Szállítási díj számítása
        const deliveryTypeElement = document.querySelector('input[name="deliveryType"]:checked');
        const isDelivery = deliveryTypeElement ? deliveryTypeElement.value === 'delivery' : true;
        
        let deliveryFee = 0;
        // A fizetendő végösszeg alapján számoljuk a szállítási limitet (subtotal - discount)
        const payableSubtotal = subtotal - discountTotal;
        
        if (isDelivery) {
            // Kiszállítás: 0 Ft ha legalább 5000 Ft a rendelés, egyébként 500 Ft
            deliveryFee = payableSubtotal >= 5000 ? 0 : 500;
        } else {
            // Személyes átvétel: mindig 0 Ft
            deliveryFee = 0;
        }
        
        const total = payableSubtotal + deliveryFee;
        
        // HTML Elemek frissítése
        if (subtotalElement) subtotalElement.textContent = subtotal.toLocaleString('hu-HU') + ' Ft';
        
        // Kedvezmény sor kezelése
        let discountRow = document.getElementById('discountRow');
        if (discountTotal > 0) {
            if (!discountRow) {
                // Ha nincs még ilyen sor, létrehozzuk a Részösszeg után
                discountRow = document.createElement('div');
                discountRow.id = 'discountRow';
                discountRow.className = 'summary-row discount';
                discountRow.innerHTML = `
                    <span>Kedvezmény (Gyros akció):</span>
                    <span id="discountAmount" style="color: #4CAF50; font-weight: bold;">-${discountTotal.toLocaleString('hu-HU')} Ft</span>
                `;
                // Beszúrjuk a subtotal elem szülője után, vagy a deliveryFee elé
                if (subtotalElement && subtotalElement.parentElement) {
                    subtotalElement.parentElement.after(discountRow);
                }
            } else {
                // Ha van, frissítjük
                const amountEl = document.getElementById('discountAmount');
                if (amountEl) amountEl.textContent = `-${discountTotal.toLocaleString('hu-HU')} Ft`;
                discountRow.style.display = 'flex';
            }
        } else {
            if (discountRow) discountRow.style.display = 'none';
        }

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
        
        // Visszatérünk az értékekkel az email küldéshez
        return { subtotal, discountTotal, total, deliveryFee };
    }
    
    // ==================== EMAIL KÜLDÉS (AJAX) ====================

// Ez a függvény már nem form.submit()-ot használ, hanem AJAX kérést.
async function sendOrderEmail(orderData) {
    // Pontos formátumú email szöveg
    const emailMessage = createEmailText(orderData);
    
    // Adatok előkészítése a FormSubmit számára
    const formData = {
        '_subject': `TONY GYROS - Új rendelés (${orderData.orderNumber})`,
        '_captcha': 'false',
        '_template': 'table', // Szebb táblázatos nézet a FormSubmit-tól
        
        // JAVÍTÁS: Ez az 'email' kulcs kerül a levél tetejére. 
        // Ezt használja a rendszer a válaszhoz és a másolathoz is.
        'email': orderData.email,  
        '_cc': orderData.email,    // Másolat a vevőnek

        'Rendelési szám': orderData.orderNumber,
        'Vevő Neve': orderData.customerName,
        // A "Vevő Email" sort töröltük innen, mert az 'email' kulcs miatt már szerepel felül.
        'Telefonszám': orderData.phone,
        'Végösszeg': orderData.total.toLocaleString('hu-HU') + ' Ft',
        'message': emailMessage
    };

    try {
        // Fetch API használata a háttérben történő küldéshez
        const response = await fetch('https://formsubmit.co/ajax/csipesz900@gmail.com', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        });

        if (response.ok) {
            return true;
        } else {
            console.error('Email küldési hiba:', response.statusText);
            return false;
        }
    } catch (error) {
        console.error('Hálózati hiba az email küldésekor:', error);
        return false;
    }
}
    
    // SZÖVEGES EMAIL LÉTREHOZÁSA (Segédfüggvény)
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
        
        // Tételek részletesen
        let itemsText = '';
        if (orderData.items && Array.isArray(orderData.items)) {
            itemsText = orderData.items.map(item => {
                // Megjelenített név (sima név)
                const baseName = item.name.split('(')[0].split(' - ')[0].trim();
                
                // Alapár (mindig a normal ár a megjelenítésben)
                let basePrice = parseFloat(item.basePrice || 0);
                if (productPrices[baseName]) {
                    basePrice = productPrices[baseName].normal;
                }
                
                // Extra feltételek ára
                const extraCost = parseFloat(item.extraCost || 0);
                
                // Egységár
                const unitPrice = basePrice + extraCost;
                
                // Mennyiség
                const quantity = item.quantity || 1;
                
                // Tétel összár
                const itemTotal = unitPrice * quantity;
                
                // Termék név
                let itemName = baseName;
                
                // Opciók hozzáadása a névhez
                let itemNameWithOptions = itemName;
                if (item.options) {
                    const optionsText = formatOptions(item.options);
                    if (optionsText) {
                        itemNameWithOptions += ` (${optionsText})`;
                    }
                }
                
                // Méret hozzáadása (ha van)
                if (item.size) {
                    itemNameWithOptions += ` - ${item.size}`;
                }
                
                // Extrák felsorolása
                let extrasLine = '';
                if (item.extraToppings && Array.isArray(item.extraToppings) && item.extraToppings.length > 0) {
                    const extrasList = item.extraToppings.map(extra => {
                        return `${extra.name} (+${parseFloat(extra.price).toLocaleString('hu-HU')} Ft)`;
                    }).join(', ');
                    extrasLine = `\n  + Extrák: ${extrasList}`;
                }
                
                // Speciális kérés
                let specialRequestLine = '';
                if (item.specialRequest && item.specialRequest.trim() !== '') {
                    specialRequestLine = `\n  Megjegyzés: ${item.specialRequest}`;
                }
                
                return `${itemNameWithOptions} - ${quantity} db x ${unitPrice.toLocaleString('hu-HU')} Ft = ${itemTotal.toLocaleString('hu-HU')} Ft${extrasLine}${specialRequestLine}`;
            }).join('\n');
        }
        
        // Cím sor az átvételi mód alapján
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
        let discountLine = '';
        if (orderData.discountTotal > 0) {
            discountLine = `Kedvezmény: -${orderData.discountTotal.toLocaleString('hu-HU')} Ft\n`;
        }

        return `TONY GYROS KESZTHELY - ÚJ RENDELÉS

RENDELÉSI SZÁM: ${orderData.orderNumber}
RENDELÉS IDEJE: ${formattedDate}

VEVŐI ADATOK:
Név: ${orderData.customerName}
Email: ${orderData.email}
Telefonszám: ${orderData.phone}
${addressLine}

RENDELT TERMÉKEK:
${itemsText}

ÖSSZESÍTŐ:
Részösszeg: ${orderData.subtotal.toLocaleString('hu-HU')} Ft
${discountLine}Szálítási díj: ${orderData.deliveryFee.toLocaleString('hu-HU')} Ft
ÖSSZESEN: ${orderData.total.toLocaleString('hu-HU')} Ft

Fizetési mód: ${paymentMethod}

${orderData.note ? `\nMegjegyzés: ${orderData.note}` : ''}

------------------------------------------
Tony Gyros Keszthely
Keszthely, Délden tér 2.
Tel: +36 30 123 4567
Email: info@tonygyros.hu`;
    }
    
    // ALTERNATÍV EMAIL KÜLDÉS MailTo linkkel (Fallback)
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

    // ÚJ: Email mentése
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            localStorage.setItem('tonyGyrosEmail', this.value);
        });
    }
    
    // ==================== RENDELÉS LEADÁSA GOMB ====================
    
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
            const email = emailInput ? emailInput.value.trim() : ''; // ÚJ: Email kiolvasás
            const phone = phoneInput ? phoneInput.value.trim() : '';
            const address = addressInput ? addressInput.value.trim() : '';
            const floor = floorInput ? floorInput.value.trim() : '';
            const door = doorInput ? doorInput.value.trim() : '';
            const phoneRegex = /^(\+36|06)[\d\s]{8,12}$/;
            
            // 3. Validációk (mindkét átvételi módhoz)
            if (!customerName) {
                showNotification('Kérjük, add meg a neved!', 'error');
                if (customerNameInput) customerNameInput.focus();
                return;
            }

            // ÚJ: Email validáció
            if (!email || !email.includes('@')) {
                showNotification('Kérjük, adj meg egy érvényes email címet!', 'error');
                if (emailInput) emailInput.focus();
                return;
            }
            
            if (!phone) {
                showNotification('Kérjük, add meg a telefonszámot!', 'error');
                if (phoneInput) phoneInput.focus();
                return;
            }
            
            if (!phoneRegex.test(phone)) {
                showNotification('Kérjük, érvényes magyar telefonszámot adj meg!', 'error');
                if (phoneInput) phoneInput.focus();
                return;
            }
            
            // 4. Szállítás típus szerinti validáció
            let fullAddress = '';
            if (deliveryType === 'delivery') {
                if (!address || address.length < 5) {
                    showNotification('Kérjük, add meg a szállítási címet!', 'error');
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
            
            // 6. Összegek újraszámolása
            const summaryData = updateSummary();
            
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
                email: email, // ÚJ: Email mentés
                deliveryType: deliveryType,
                paymentMethod: paymentMethod,
                phone: phone,
                address: fullAddress,
                floor: floor,
                door: door,
                note: orderNote ? orderNote.value.trim() : '',
                subtotal: summaryData.subtotal,
                discountTotal: summaryData.discountTotal,
                deliveryFee: summaryData.deliveryFee,
                total: summaryData.total,
                timestamp: new Date().toISOString(),
                orderNumber: 'TONY-' + Date.now().toString().slice(-8),

                timestamp: new Date().toISOString(),

                status: 'Feldolgozás alatt'
            };
            
            // 8. Mentés localStorage-ba (biztonsági mentés)
            localStorage.setItem('tonyGyrosLastOrder', JSON.stringify(orderData));
            
            // 9. Email küldése (AJAX-szal, várakozással)
            try {
                // A gomb letiltása a többszöri kattintás elkerülésére
                checkoutBtn.disabled = true;
                const originalBtnText = checkoutBtn.innerHTML;
                checkoutBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Rendelés küldése...';
                
                // ITT VÁRAKOZUNK A VÁLASZRA (await)
                const emailSent = await sendOrderEmail(orderData);
                
                if (emailSent) {
                    showNotification('Rendelésed sikeresen leadva! Hamarosan megerősítjük.', 'success');
                    
                    // 10. Kosár kiürítése CSAK sikeres küldés után
                    cartItems = [];
                    localStorage.removeItem('tonyGyrosCart');
                    
                    // 11. Átirányítás a sikeres oldalra
                    setTimeout(() => {
                        window.location.href = 'rendeles-sikeres.html';
                    }, 1500);
                } else {
                    // Ha a szerver hibát dobott, de a hálózat működik
                    throw new Error('Az email küldés sikertelen volt a szerver oldalán.');
                }
            } catch (error) {
                console.error('Rendelés hiba:', error);
                
                // Alternatív megoldás ajánlása
                showNotification('Hálózati hiba! Kérjük, küldd el a megnyíló emailt manuálisan.', 'warning');
                checkoutBtn.innerHTML = '<i class="fas fa-envelope"></i> Email kliens megnyitása';
                
                // Email ablak megnyitása késleltetve
                setTimeout(() => {
                    const opened = sendOrderEmailAlternative(orderData);
                    
                    if (opened) {
                        // Ha sikerült megnyitni a levelezőt, ürítjük a kosarat
                        cartItems = [];
                        localStorage.removeItem('tonyGyrosCart');
                        setTimeout(() => {
                            window.location.href = 'rendeles-sikeres.html';
                        }, 3000);
                    } else {
                         // Ha nem sikerült megnyitni, visszaállítjuk a gombot
                         checkoutBtn.disabled = false;
                         checkoutBtn.innerHTML = originalBtnText;
                    }
                }, 1500);
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
            background: ${type === 'success' ? '#4CAF50' : (type === 'warning' ? '#ff9800' : '#f44336')};
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