// Pizza adatok
const allPizzas = [
    {
        name: "Pikachu",
        description: "Szósz, sajt, sonka, kukorica",
        price: 3500,
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Népszerű"
    },
    {
        name: "Bolognese",
        description: "Szósz, sajt, bolognai szósz, pepperoni",
        price: 3500,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Fűszeres"
    },
    {
        name: "Magyaros",
        description: "Szósz, sajt, kolbász, bacon, hegyes erős, lilahagyma",
        price: 3500,
        image: "https://production.streetkitchen-cdn.com/magyaros-pizza-scaled-5kjs0K.webp",
        badge: "Csípős"
    },
    {
        name: "Flamenco",
        description: "Szósz, sajt, sonka, szalámi, kukorica",
        price: 3500,
        image: "https://images.unsplash.com/phone-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Bestseller"
    },
    {
        name: "Gyrosos",
        description: "Tejfölös alap, sajt, gyros hús, lilahagyma, savanyú uborka, paradicsom",
        price: 3500,
        image: "https://donpedropizza.hu/wp-content/uploads/2021/06/Gyros-pizza-2-scaled.jpg",
        badge: "Különlegesség"
    },
    {
        name: "Frutti Di Mare",
        description: "Szósz, sajt, tenger gyümölcsei, citrom",
        price: 3500,
        image: "https://eat.de/wp-content/uploads/2023/09/pizza-frutti-di-mare-3140.jpg",
        badge: "Tengeri"
    },
    {
        name: "Popei",
        description: "Tejfölös alap, sajt, spenót, csirkemell, kukorica, lilahagyma, tükörtojás",
        price: 3500,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: null
    },
    {
        name: "Sultan",
        description: "Szósz, sajt, török kolbász (marha húsos), füstölt sajt, szumák",
        price: 3500,
        image: "https://www.donpepe.hu/storage/products/big/mexftpi.jpg",
        badge: "Török"
    },
    {
        name: 'Zo"Pizza',
        description: "Tejfölös alap, sajt, sonka, csirkemell, kukorica, szeletelt bacon, füstölt sajt",
        price: 3500,
        image: "https://bakingamoment.com/wp-content/uploads/2024/04/IMG_3069-chicken-bacon-ranch-pizza.jpg",
        badge: "Prémium"
    },
    {
        name: "Sonkás",
        description: "Szósz, sajt, sonka",
        price: 3500,
        image: "https://miklosgrill.hu/wp-content/uploads/2023/07/pizza-sonkas.jpg",
        badge: null
    },
    {
        name: "Songoku",
        description: "Szósz, sajt, sonka, gomba, kukorica",
        price: 3500,
        image: "https://i0.wp.com/sprintfood.hu/wp-content/uploads/2021/05/Songoku.jpg",
        badge: null
    },
    {
        name: "Prosutto",
        description: "Szósz, sajt, serrano sonka, rukkola, paradicsom, parmezán",
        price: 3500,
        image: "https://banditosgyongyos.hu/wp-content/uploads/2024/10/caprese_e_crudo_banditos_pizza_gyongyos.jpg",
        badge: "Olasz"
    },
    {
        name: "Calzone (Hajtott Pizza)",
        description: "Szósz, sajt, sonka, gomba",
        price: 3500,
        image: "https://www.gozney.com/cdn/shop/files/Pepperoni_Calzone_Ines_Glasier_-_Large_cc206a79-f2d8-4bb8-a7be-b47f81548395.png?v=1728584024&width=1500",
        badge: "Zárt pizza"
    },
    {
        name: "Pizzaroll",
        description: "Szósz, sajt, sonka, szalámi + tejfölös mártogatós",
        price: 3500,
        image: "https://cookingformysoul.com/wp-content/uploads/2024/01/pepperoni-pizza-rolls-2-min-500x500.jpg",
        badge: "Roll"
    },
    {
        name: "Tonno",
        description: "Szósz, sajt, tonhal, olíva bogyó, pepperoni, citrom",
        price: 3500,
        image: "https://premierszarvas.hu/wp-content/uploads/2020/04/39.jpg",
        badge: "Halas"
    },
    {
        name: "BBQ (Joe)",
        description: "BBQ szósz, sajt, sonka, gyöngyhagyma, sülés után: lilahagyma, méz",
        price: 3500,
        image: "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
        badge: "BBQ"
    },
    {
        name: "Húsimádó",
        description: "Szósz, sajt, sonka, szalámi, tarja bacon, sülés után: apróra vágott lilahagyma",
        price: 3500,
        image: "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/husimado-1.jpg",
        badge: "Húsos"
    },
    {
        name: "Hawaii",
        description: "Szósz, sajt, sonka, ananász",
        price: 3500,
        image: "https://thecozycook.com/wp-content/uploads/2023/10/Hawaiian-Pizza-f.jpg",
        badge: "Ananászos"
    },
    {
        name: "Margaréta",
        description: "Szósz, sajt",
        price: 2700,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Klasszikus"
    },
    {
        name: "Tony Pizza",
        description: "Szósz, sajt, csirkemell, gomba, olíva bogyó, feta sajt",
        price: 3500,
        image: "https://izekesillatok.hu/uploads/2025/01/Barbecue-Chicken-Pizza-%E2%80%93-Kaliforniabol-BBQ-szosz-csirke.webp",
        badge: "Tony special"
    },
    {
        name: "Funghi",
        description: "Szósz, sajt, gomba",
        price: 3500,
        image: "https://omd-com-files.ams3.digitaloceanspaces.com/uploads/2024/Pizza%20funghi%20%28mushroom%20pizza%29.jpg",
        badge: null
    },
    {
        name: "Rock",
        description: "Szósz, sajt, csípős szalámi, jalapeno",
        price: 3500,
        image: "https://www.vindulge.com/wp-content/uploads/2023/02/Pizza-with-Jalapeno-Coppa-and-Hot-Honey.jpg",
        badge: "Extrém"
    },
    {
        name: "Frankfurti",
        description: "Mustáros-tejfölös alap, cheddar sajt, frankfurti virsli, aprított savanyú uborka, sülés után: pirított hagyma",
        price: 3500,
        image: "https://pizzadonvito.com/images/2/55e81d9ea7bbcf754f7a9197db5ed83b319a08f27ed0bd055dfce5fe3333f407/dsc2866-edit-895.jpg",
        badge: "Német"
    },
    {
        name: "Betyár",
        description: "Szósz, sajt, szalámi, tarja, lilahagyma, gomba, hegyes erős",
        price: 3500,
        image: "https://repetatanya.hu/wp-content/uploads/2023/06/IMG_6099-1.jpg",
        badge: "Erős"
    },
    {
        name: "Görög",
        description: "Tejfölös alap, sajt, feta, olíva bogyó, lilahagyma, brokkoli, paprika",
        price: 3500,
        image: "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Mediterrán"
    },
    {
        name: "Szalámis",
        description: "Szósz, sajt, szalámi",
        price: 3500,
        image: "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/szalamis.jpg",
        badge: null
    },
    {
        name: "Quattro Formaggi",
        description: "Szósz, 4 féle sajt (trappista, mozzarella, cheddar, feta sajt)",
        price: 3500,
        image: "https://nz.gozney.com/cdn/shop/articles/Four_Cheese_Pizza_Feng_Chen_-_Large1.jpg?v=1731561452",
        badge: "Sajtos"
    }
];

// CSAK EZEKET A FELTÉTELEKET FOGADJUK EL - STRICT LIST
const allowedExtras = [
    "extra sajt",
    "extra sonka", 
    "extra gomba",
    "extra kukorica",
    "extra ananász",
    "extra kolbász"
];

// Extra feltételek árak (extra sajt INGYENES!)
const extraToppings = {
    "extra sajt": 0,          // INGYENES
    "extra sonka": 400,
    "extra gomba": 300,
    "extra kukorica": 250,
    "extra ananász": 350,
    "extra kolbász": 450
};

document.addEventListener('DOMContentLoaded', function() {
    // Termék képek adatbázis
    const productImages = {};
    
    // Pizza képek betöltése az allPizzas tömbből
    allPizzas.forEach(pizza => {
        productImages[pizza.name] = pizza.image;
    });
    
    // Egyéb képek (ha szükséges)
    productImages['Tiramisu'] = 'https://production.streetkitchen-cdn.com/legfinomabb-tiramisu-4-scaled-dUBDsU.webp';
    productImages['Torta szelet'] = 'https://www.spicebangla.com/wp-content/uploads/2024/04/chocolate-cake-1.jpg';
    productImages['Baklava'] = 'https://assets.tmecosys.com/image/upload/t_web_rdp_recipe_584x480_1_5x/img/recipe/ras/Assets/5b3a4f1ef35536dd44ed1a64ed55f2f2/Derivates/78efec556a9f9d444cae9fac03247ba34195c621.jpg';
    productImages['Coca Cola 0.5L'] = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    productImages['Fanta 0.5L'] = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    productImages['Sprite 0.5L'] = 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    
    // Kép URL lekérése termék név alapján
    function getProductImage(productName) {
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        
        for (const [key, value] of Object.entries(productImages)) {
            if (baseName.includes(key) || key.includes(baseName)) {
                return value;
            }
        }
        
        return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
    }
    
    let currentIndex = 9;
    const pizzasPerLoad = 6;
    const pizzaGrid = document.getElementById('pizzaGrid');
    const showMoreBtn = document.getElementById('showMorePizzas');
    const showMoreContainer = document.getElementById('showMoreContainer');
    
    // Extra feltételek validációja
    function extractAndValidateExtras(specialRequest) {
        const extras = [];
        const invalidExtras = [];
        const requestLower = specialRequest.toLowerCase().trim();
        
        if (!requestLower || requestLower === '') {
            return { valid: true, extras: [], invalidExtras: [] };
        }
        
        const words = requestLower.split(/[,\s]+/).filter(word => word.trim() !== '');
        
        let hasExtraPrefix = false;
        for (const word of words) {
            if (word.includes('extra')) {
                hasExtraPrefix = true;
                break;
            }
        }
        
        if (!hasExtraPrefix) {
            if (words.length > 0) {
                return { 
                    valid: false, 
                    extras: [], 
                    invalidExtras: [requestLower],
                    errorMessage: 'Csak "extra" feltételek megadására van lehetőség. (pl: extra sajt, extra sonka)' 
                };
            }
            return { valid: true, extras: [], invalidExtras: [] };
        }
        
        for (const allowedExtra of allowedExtras) {
            if (requestLower.includes(allowedExtra.toLowerCase())) {
                extras.push({
                    name: allowedExtra,
                    price: extraToppings[allowedExtra] || 0
                });
            }
        }
        
        let foundInvalid = false;
        let invalidItems = [];
        
        for (let i = 0; i < words.length; i++) {
            if (words[i] === 'extra' && i + 1 < words.length) {
                const potentialExtra = `extra ${words[i + 1]}`;
                
                let isValidExtra = false;
                for (const allowedExtra of allowedExtras) {
                    if (potentialExtra === allowedExtra.toLowerCase()) {
                        isValidExtra = true;
                        break;
                    }
                }
                
                if (!isValidExtra) {
                    foundInvalid = true;
                    invalidItems.push(potentialExtra);
                }
                
                i++;
            }
        }
        
        if (foundInvalid) {
            return { 
                valid: false, 
                extras: [], 
                invalidExtras: invalidItems,
                errorMessage: `Nem engedélyezett extra feltétel: ${invalidItems.join(', ')}. Csak a következő extra feltételek engedélyezettek: ${allowedExtras.join(', ')}`
            };
        }
        
        if (extras.length === 0 && hasExtraPrefix) {
            return { 
                valid: false, 
                extras: [], 
                invalidExtras: [requestLower],
                errorMessage: `Nem érvényes extra feltétel. Csak a következő extra feltételek engedélyezettek: ${allowedExtras.join(', ')}`
            };
        }
        
        return { valid: true, extras: extras, invalidExtras: [] };
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
    
    // Pizza kártya generálása
    function createPizzaCard(pizza) {
        return `
            <div class="menu-item">
                <div class="menu-item-img">
                    <img src="${pizza.image}" alt="${pizza.name} Pizza">
                    ${pizza.badge ? `<div class="menu-item-badge">${pizza.badge}</div>` : ''}
                </div>
                <div class="menu-item-content">
                    <h3>${pizza.name} Pizza</h3>
                    <p class="menu-item-description">${pizza.description}</p>
                    <div class="menu-item-details">
                        <div class="menu-item-quantity">
                            <label>Mennyiség:</label>
                            <div class="quantity-selector">
                                <button class="quantity-btn minus" type="button">-</button>
                                <input type="number" class="quantity-input" value="1" min="1" max="10">
                                <button class="quantity-btn plus" type="button">+</button>
                            </div>
                        </div>
                        <div class="menu-item-price">
                            <span class="price">${pizza.price.toLocaleString()} Ft</span>
                        </div>
                    </div>
                    <div class="menu-item-actions">
                        <div class="special-request">
                            <textarea 
                                placeholder="Csak extra feltételek: extra sajt, extra sonka, extra gomba, extra kukorica, extra ananász, extra kolbász"
                                class="extra-input"
                            ></textarea>
                            <div class="extra-hint">
                                <i class="fas fa-info-circle"></i> Más megjegyzés nem elfogadható!
                            </div>
                        </div>
                        <button class="add-to-cart-btn" data-item="${pizza.name} Pizza" data-price="${pizza.price}" data-image="${pizza.image}">
                            <i class="fas fa-cart-plus"></i> Kosárba
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    
    // További pizzák betöltése
    function loadMorePizzas() {
        const endIndex = Math.min(currentIndex + pizzasPerLoad, allPizzas.length);
        
        for (let i = currentIndex; i < endIndex; i++) {
            const pizza = allPizzas[i];
            const pizzaCard = createPizzaCard(pizza);
            pizzaGrid.insertAdjacentHTML('beforeend', pizzaCard);
        }
        
        currentIndex = endIndex;
        
        if (currentIndex >= allPizzas.length) {
            showMoreContainer.style.display = 'none';
        }
        
        attachEventHandlers();
        updateShowMoreButton();
    }
    
    // További pizzák betöltése gomb szövegének frissítése
    function updateShowMoreButton() {
        if (showMoreBtn) {
            const remainingPizzas = allPizzas.length - currentIndex;
            if (remainingPizzas > 0) {
                showMoreBtn.innerHTML = `<i class="fas fa-pizza-slice"></i> További ${remainingPizzas} pizza betöltése`;
            }
        }
    }
    
    // Real-time validáció hozzáadása textarea-hoz
    function addRealTimeValidation(textarea) {
        textarea.addEventListener('input', function() {
            const value = this.value.toLowerCase().trim();
            
            if (value === '') {
                this.style.borderColor = '';
                this.style.boxShadow = 'none';
                return;
            }
            
            const validationResult = extractAndValidateExtras(value);
            
            if (!validationResult.valid) {
                this.style.borderColor = '#e74c3c';
                this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
            } else {
                this.style.borderColor = '#2ecc71';
                this.style.boxShadow = '0 0 0 3px rgba(46, 204, 113, 0.1)';
            }
        });
        
        textarea.addEventListener('focus', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '#0066cc';
                this.style.boxShadow = '0 0 0 3px rgba(0, 102, 204, 0.1)';
            }
        });
        
        textarea.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.style.borderColor = '';
                this.style.boxShadow = 'none';
            }
        });
    }
    
    // Frissítsd az első 9 pizza textarea-ját
    function updateExistingPizzaTextareas() {
        const initialTextareas = document.querySelectorAll('#pizzaGrid .menu-item textarea');
        
        initialTextareas.forEach(textarea => {
            textarea.placeholder = "Csak extra feltételek: extra sajt, extra sonka, extra gomba, extra kukorica, extra ananász, extra kolbász";
            
            const parentDiv = textarea.parentElement;
            if (!parentDiv.querySelector('.extra-hint')) {
                const hintDiv = document.createElement('div');
                hintDiv.className = 'extra-hint';
                hintDiv.innerHTML = '<i class="fas fa-info-circle"></i> Más megjegyzés nem elfogadható!';
                parentDiv.appendChild(hintDiv);
            }
            
            addRealTimeValidation(textarea);
        });
    }
    
    // Eseménykezelők csatolása
    function attachEventHandlers() {
        const quantityInputs = document.querySelectorAll('.quantity-input');
        const minusButtons = document.querySelectorAll('.quantity-btn.minus');
        const plusButtons = document.querySelectorAll('.quantity-btn.plus');
        
        minusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                if (value > 1) {
                    input.value = value - 1;
                }
            });
        });
        
        plusButtons.forEach(button => {
            button.addEventListener('click', function() {
                const input = this.parentElement.querySelector('.quantity-input');
                let value = parseInt(input.value);
                if (value < 10) {
                    input.value = value + 1;
                }
            });
        });
        
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
        
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const menuItem = this.closest('.menu-item');
                const itemName = this.getAttribute('data-item');
                const unitPrice = parseInt(this.getAttribute('data-price'));
                const imageUrl = this.getAttribute('data-image');
                const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
                const specialRequest = menuItem.querySelector('textarea').value.trim();
                
                const validationResult = extractAndValidateExtras(specialRequest);
                
                if (!validationResult.valid) {
                    showNotification(validationResult.errorMessage, 'error');
                    menuItem.querySelector('textarea').focus();
                    return;
                }
                
                const extras = validationResult.extras;
                const extraCost = extras.reduce((total, extra) => total + extra.price, 0);
                
                const itemId = Date.now() + Math.random().toString(36).substr(2, 9);
                
                const cartItem = {
                    id: itemId,
                    name: itemName,
                    basePrice: unitPrice,
                    extraToppings: extras,
                    extraCost: extraCost,
                    totalPrice: (unitPrice + extraCost) * quantity,
                    quantity: quantity,
                    specialRequest: specialRequest,
                    image: imageUrl,
                    type: 'pizza',
                    timestamp: new Date().toISOString()
                };
                
                let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                    JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
                cartItems.push(cartItem);
                localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
                
                updateCartCount();
                
                let notificationMessage = `${quantity} db ${itemName} hozzáadva a kosárhoz!`;
                
                if (extras.length > 0) {
                    const extraNames = extras.map(e => e.name).join(', ');
                    notificationMessage += `<br><small>Extra feltételek: ${extraNames}</small>`;
                }
                
                notificationMessage += `<br><strong>${cartItem.totalPrice.toLocaleString()} Ft</strong>`;
                
                showNotification(notificationMessage, 'success');
                
                menuItem.querySelector('.quantity-input').value = 1;
                menuItem.querySelector('textarea').value = '';
                menuItem.querySelector('textarea').style.borderColor = '';
                menuItem.querySelector('textarea').style.boxShadow = 'none';
            });
        });
        
        const textareas = document.querySelectorAll('.extra-input');
        textareas.forEach(textarea => {
            addRealTimeValidation(textarea);
        });
    }
    
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            loadMorePizzas();
        });
    }
    
    // Értesítés megjelenítése
    function showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        
        let icon = 'fa-check-circle';
        let bgColor = 'linear-gradient(135deg, #0066cc, #0052a3)';
        
        if (type === 'error') {
            icon = 'fa-exclamation-circle';
            bgColor = 'linear-gradient(135deg, #dc3545, #e74c3c)';
        }
        
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icon}"></i>
                <div class="notification-text">${message}</div>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background: ${bgColor};
            color: white;
            padding: 1rem 1.5rem;
            border-radius: 8px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 500px;
            min-width: 300px;
        `;
        
        const styleId = 'notification-styles-pizza';
        if (!document.querySelector(`#${styleId}`)) {
            const style = document.createElement('style');
            style.id = styleId;
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
                    align-items: flex-start;
                    gap: 0.75rem;
                }
                .notification-content i {
                    font-size: 1.2rem;
                    margin-top: 2px;
                }
                .notification-text {
                    flex: 1;
                }
                .notification-text small {
                    opacity: 0.9;
                    font-size: 0.9em;
                    display: block;
                    margin-top: 0.25rem;
                }
                .notification-text strong {
                    display: block;
                    margin-top: 0.5rem;
                    font-size: 1.1em;
                }
                .notification.error {
                    border-left: 4px solid #c0392b;
                }
            `;
            document.head.appendChild(style);
        }
        
        document.body.appendChild(notification);
        
        const duration = type === 'error' ? 5000 : 4000;
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, duration);
    }
    
    // Extra stílusok hozzáadása
    if (!document.querySelector('#extra-hint-styles')) {
        const style = document.createElement('style');
        style.id = 'extra-hint-styles';
        style.textContent = `
            .extra-hint {
                font-size: 0.8rem;
                color: #0066cc;
                margin-top: 0.5rem;
                font-style: italic;
                display: flex;
                align-items: center;
                gap: 0.5rem;
            }
            .extra-hint i {
                color: #0066cc;
            }
            .menu-item-actions textarea {
                min-height: 80px;
                transition: all 0.3s ease;
                border: 2px solid #ddd;
                border-radius: 4px;
                padding: 0.5rem;
                width: 100%;
                font-family: inherit;
                resize: vertical;
            }
            .menu-item-actions textarea:focus {
                outline: none;
            }
            .extra-input.valid {
                border-color: #2ecc71 !important;
                background-color: rgba(46, 204, 113, 0.05) !important;
            }
            .extra-input.invalid {
                border-color: #e74c3c !important;
                background-color: rgba(231, 76, 60, 0.05) !important;
            }
        `;
        document.head.appendChild(style);
    }
    
    // Frissítsd a meglévő pizzák textarea-jait
    updateExistingPizzaTextareas();
    
    // Kezdeti eseménykezelők csatolása
    attachEventHandlers();
    
    if (allPizzas.length <= 9) {
        if (showMoreContainer) {
            showMoreContainer.style.display = 'none';
        }
    } else {
        updateShowMoreButton();
    }
});