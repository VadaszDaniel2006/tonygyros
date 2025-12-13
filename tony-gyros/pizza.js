// Pizza oldal JavaScript - JAVÍTOTT VERZIÓ

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
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
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
    // További pizzák
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
        image: "https://www.allrecipes.com/thmb/v1Xi2wtebK1sZwSJitdV4MGKl1c=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
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
        // Távolítsuk el az opciókat a névből (pl. " (csirke)" rész)
        const baseName = productName.split('(')[0].trim().split(' - ')[0].trim();
        
        // Keressük a pontos egyezést
        for (const [key, value] of Object.entries(productImages)) {
            if (baseName.includes(key) || key.includes(baseName)) {
                return value;
            }
        }
        
        // Ha nem találtunk egyezést, alapértelmezett pizza kép
        return 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80';
    }
    
    let currentIndex = 9; // Az első 9 pizza már megjelenik
    const pizzasPerLoad = 6;
    const pizzaGrid = document.getElementById('pizzaGrid');
    const showMoreBtn = document.getElementById('showMorePizzas');
    const showMoreContainer = document.getElementById('showMoreContainer');
    
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
                            <textarea placeholder="Speciális kérés (pl. extra sajt, hagyma nélkül...)"></textarea>
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
        
        // Ha nincs több pizza, elrejtjük a gombot
        if (currentIndex >= allPizzas.length) {
            showMoreContainer.style.display = 'none';
        }
        
        // Új eseménykezelők hozzáadása az újonnan betöltött elemekhez
        attachEventHandlers();
        
        // Frissítjük a gomb szövegét
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
    
    // Eseménykezelők csatolása
    function attachEventHandlers() {
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
        
        // Kosárba tétel - JAVÍTOTT VERZIÓ (helyes árazás)
        const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
        addToCartButtons.forEach(button => {
            button.addEventListener('click', function() {
                const menuItem = this.closest('.menu-item');
                const itemName = this.getAttribute('data-item');
                const unitPrice = parseInt(this.getAttribute('data-price')); // EGYSÉGÁR (1 pizza)
                const imageUrl = this.getAttribute('data-image');
                const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
                const specialRequest = menuItem.querySelector('textarea').value;
                
                // Egyedi ID generálás
                const itemId = Date.now() + Math.random().toString(36).substr(2, 9);
                
                // Kosár adatok összeállítása - CSAK EGYSÉGÁR TÁROLÁSA
                const cartItem = {
                    id: itemId,
                    name: itemName,
                    price: unitPrice,        // CSAK EGYSÉGÁR (1 db pizza)
                    quantity: quantity,      // MENNYISÉG
                    specialRequest: specialRequest,
                    image: imageUrl,
                    type: 'pizza',
                    timestamp: new Date().toISOString()
                };
                
                // Kosár frissítése
                let cartItems = localStorage.getItem('tonyGyrosCart') ? 
                    JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
                cartItems.push(cartItem);
                localStorage.setItem('tonyGyrosCart', JSON.stringify(cartItems));
                
                // Kosár számláló frissítése
                updateCartCount();
                
                // Sikeres üzenet - helyes számítással
                const totalPrice = unitPrice * quantity;
                showNotification(`${quantity} db ${itemName} hozzáadva a kosárhoz! (${totalPrice.toLocaleString()} Ft)`);
                
                // Mennyiség visszaállítása
                menuItem.querySelector('.quantity-input').value = 1;
                
                // Speciális kérés mező törlése
                menuItem.querySelector('textarea').value = '';
            });
        });
    }
    
    // További pizzák betöltése gomb eseménykezelő
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', function() {
            loadMorePizzas();
        });
    }
    
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
        if (!document.querySelector('#notification-styles-pizza')) {
            const style = document.createElement('style');
            style.id = 'notification-styles-pizza';
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
    
    // CSS változók hozzáadása ha nincsenek
    if (!document.querySelector(':root').style.getPropertyValue('--primary')) {
        document.querySelector(':root').style.setProperty('--primary', '#0066cc');
        document.querySelector(':root').style.setProperty('--primary-dark', '#0052a3');
        document.querySelector(':root').style.setProperty('--accent', '#00a8ff');
    }
    
    // Kezdeti eseménykezelők csatolása
    attachEventHandlers();
    
    // Ha kevesebb pizza van, mint a betöltési limit, elrejtjük a gombot
    if (allPizzas.length <= 9) {
        if (showMoreContainer) {
            showMoreContainer.style.display = 'none';
        }
    } else {
        // Frissítjük a gomb szövegét
        updateShowMoreButton();
    }
});