// Pizza adatok
const allPizzas = [
    {
        name: "Pikachu",
        description: "Szósz, sajt, sonka, kukorica",
        price: 3500,
        image: "https://images.unsplash.com/photo-1595708684082-a173bb3a06c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Népszerű",
        id: "pikachu"
    },
    {
        name: "Bolognese",
        description: "Szósz, sajt, bolognai szósz, pepperoni",
        price: 3500,
        image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Fűszeres",
        id: "bolognese"
    },
    {
        name: "Magyaros",
        description: "Szósz, sajt, kolbász, bacon, hegyes erős, lilahagyma",
        price: 3500,
        image: "https://production.streetkitchen-cdn.com/magyaros-pizza-scaled-5kjs0K.webp",
        badge: "Csípős",
        id: "magyaros"
    },
    {
        name: "Flamenco",
        description: "Szósz, sajt, sonka, szalámi, kukorica",
        price: 3500,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Bestseller",
        id: "flamenco"
    },
    {
        name: "Gyrosos",
        description: "Tejfölös alap, sajt, gyros hús, lilahagyma, savanyú uborka, paradicsom",
        price: 3500,
        image: "https://donpedropizza.hu/wp-content/uploads/2021/06/Gyros-pizza-2-scaled.jpg",
        badge: "Különlegesség",
        id: "gyrosos"
    },
    {
        name: "Frutti Di Mare",
        description: "Szósz, sajt, tenger gyümölcsei, citrom",
        price: 3500,
        image: "https://eat.de/wp-content/uploads/2023/09/pizza-frutti-di-mare-3140.jpg",
        badge: "Tengeri",
        id: "frutti-di-mare"
    },
    {
        name: "Popei",
        description: "Tejfölös alap, sajt, spenót, csirkemell, kukorica, lilahagyma, tükörtojás",
        price: 3500,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: null,
        id: "popei"
    },
    {
        name: "Sultan",
        description: "Szósz, sajt, török kolbász (marha húsos), füstölt sajt, szumák",
        price: 3500,
        image: "https://www.donpepe.hu/storage/products/big/mexftpi.jpg",
        badge: "Török",
        id: "sultan"
    },
    {
        name: 'Zo"Pizza',
        description: "Tejfölös alap, sajt, sonka, csirkemell, kukorica, szeletelt bacon, füstölt sajt",
        price: 3500,
        image: "https://bakingamoment.com/wp-content/uploads/2024/04/IMG_3069-chicken-bacon-ranch-pizza.jpg",
        badge: "Prémium",
        id: "zopizza"
    },
    {
        name: "Sonkás",
        description: "Szósz, sajt, sonka",
        price: 3500,
        image: "https://miklosgrill.hu/wp-content/uploads/2023/07/pizza-sonkas.jpg",
        badge: null,
        id: "sonkas"
    },
    {
        name: "Songoku",
        description: "Szósz, sajt, sonka, gomba, kukorica",
        price: 3500,
        image: "https://i0.wp.com/sprintfood.hu/wp-content/uploads/2021/05/Songoku.jpg",
        badge: null,
        id: "songoku"
    },
    {
        name: "Prosutto",
        description: "Szósz, sajt, serrano sonka, rukkola, paradicsom, parmezán",
        price: 3500,
        image: "https://banditosgyongyos.hu/wp-content/uploads/2024/10/caprese_e_crudo_banditos_pizza_gyongyos.jpg",
        badge: "Olasz",
        id: "prosutto"
    },
    {
        name: "Calzone (Hajtott Pizza)",
        description: "Szósz, sajt, sonka, gomba",
        price: 3500,
        image: "https://www.gozney.com/cdn/shop/files/Pepperoni_Calzone_Ines_Glasier_-_Large_cc206a79-f2d8-4bb8-a7be-b47f81548395.png?v=1728584024&width=1500",
        badge: "Zárt pizza",
        id: "calzone"
    },
    {
        name: "Pizzaroll",
        description: "Szósz, sajt, sonka, szalámi + tejfölös mártogatós",
        price: 3500,
        image: "https://cookingformysoul.com/wp-content/uploads/2024/01/pepperoni-pizza-rolls-2-min-500x500.jpg",
        badge: "Roll",
        id: "pizzaroll"
    },
    {
        name: "Tonno",
        description: "Szósz, sajt, tonhal, olíva bogyó, pepperoni, citrom",
        price: 3500,
        image: "https://premierszarvas.hu/wp-content/uploads/2020/04/39.jpg",
        badge: "Halas",
        id: "tonno"
    },
    {
        name: "BBQ (Joe)",
        description: "BBQ szósz, sajt, sonka, gyöngyhagyma, sülés után: lilahagyma, méz",
        price: 3500,
        image: "https://www.allrecipes.com/thmb/qZ7LKGV1_RYDCgYGSgfMn40nmks=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/AR-24878-bbq-chicken-pizza-beauty-4x3-39cd80585ad04941914dca4bd82eae3d.jpg",
        badge: "BBQ",
        id: "bbq-joe"
    },
    {
        name: "Húsimádó",
        description: "Szósz, sajt, sonka, szalámi, tarja bacon, sülés után: apróra vágott lilahagyma",
        price: 3500,
        image: "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/husimado-1.jpg",
        badge: "Húsos",
        id: "husimado"
    },
    {
        name: "Hawaii",
        description: "Szósz, sajt, sonka, ananász",
        price: 3500,
        image: "https://thecozycook.com/wp-content/uploads/2023/10/Hawaiian-Pizza-f.jpg",
        badge: "Ananászos",
        id: "hawaii"
    },
    {
        name: "Margaréta",
        description: "Szósz, sajt",
        price: 2700,
        image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Klasszikus",
        id: "margareta"
    },
    {
        name: "Tony Pizza",
        description: "Szósz, sajt, csirkemell, gomba, olíva bogyó, feta sajt",
        price: 3500,
        image: "https://izekesillatok.hu/uploads/2025/01/Barbecue-Chicken-Pizza-%E2%80%93-Kaliforniabol-BBQ-szosz-csirke.webp",
        badge: "Tony special",
        id: "tony-pizza"
    },
    {
        name: "Funghi",
        description: "Szósz, sajt, gomba",
        price: 3500,
        image: "https://omd-com-files.ams3.digitaloceanspaces.com/uploads/2024/Pizza%20funghi%20%28mushroom%20pizza%29.jpg",
        badge: null,
        id: "funghi"
    },
    {
        name: "Rock",
        description: "Szósz, sajt, csípős szalámi, jalapeno",
        price: 3500,
        image: "https://www.vindulge.com/wp-content/uploads/2023/02/Pizza-with-Jalapeno-Coppa-and-Hot-Honey.jpg",
        badge: "Extrém",
        id: "rock"
    },
    {
        name: "Frankfurti",
        description: "Mustáros-tejfölös alap, cheddar sajt, frankfurti virsli, aprított savanyú uborka, sülés után: pirított hagyma",
        price: 3500,
        image: "https://pizzadonvito.com/images/2/55e81d9ea7bbcf754f7a9197db5ed83b319a08f27ed0bd055dfce5fe3333f407/dsc2866-edit-895.jpg",
        badge: "Német",
        id: "frankfurti"
    },
    {
        name: "Betyár",
        description: "Szósz, sajt, szalámi, tarja, lilahagyma, gomba, hegyes erős",
        price: 3500,
        image: "https://repetatanya.hu/wp-content/uploads/2023/06/IMG_6099-1.jpg",
        badge: "Erős",
        id: "betyar"
    },
    {
        name: "Görög",
        description: "Tejfölös alap, sajt, feta, olíva bogyó, lilahagyma, brokkoli, paprika",
        price: 3500,
        image: "https://images.unsplash.com/photo-1559978137-8c560d91e9e1?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80",
        badge: "Mediterrán",
        id: "gorog"
    },
    {
        name: "Szalámis",
        description: "Szósz, sajt, szalámi",
        price: 3500,
        image: "https://rustica.okospincer.com/admin/wp-content/uploads/sites/25/2019/07/szalamis.jpg",
        badge: null,
        id: "szalamis"
    },
    {
        name: "Quattro Formaggi",
        description: "Szósz, 4 féle sajt (trappista, mozzarella, cheddar, feta sajt)",
        price: 3500,
        image: "https://nz.gozney.com/cdn/shop/articles/Four_Cheese_Pizza_Feng_Chen_-_Large1.jpg?v=1731561452",
        badge: "Sajtos",
        id: "quattro-formaggi"
    }
];

// Extra feltételek árak (Extra sajt INGYENES!)
const extraToppings = {
    "extra sajt": 0,       
    "extra sonka": 400,
    "extra gomba": 300,
    "extra kukorica": 250,
    "extra ananász": 350,
    "extra kolbász": 450
};

// Globalizált változók a dinamikus betöltéshez
let currentIndex = 0; 
const pizzasPerLoad = 6;
const pizzaGrid = document.getElementById('pizzaGrid');
const showMoreBtn = document.getElementById('showMorePizzas');
const showMoreContainer = document.getElementById('showMoreContainer');

// --- Fő Logika és Segédfüggvények ---

/**
 * Kosár számláló frissítése a Local Storage alapján.
 */
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const cartItems = localStorage.getItem('tonyGyrosCart') ? 
            JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
        const totalItems = cartItems.reduce((total, item) => total + (item.quantity || 1), 0);
        cartCount.textContent = totalItems;
    }
}

/**
 * Dinamikus árfrissítés extra feltételek és mennyiség változásakor.
 * @param {HTMLElement} menuItem - A teljes pizza menü elem.
 */
function updatePrice(menuItem) {
    const basePrice = parseFloat(menuItem.dataset.basePrice);
    const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
    const checkboxes = menuItem.querySelectorAll(`input[type="checkbox"]`);
    const priceDisplay = menuItem.querySelector('.total-price');

    let extraCost = 0;
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const extraPrice = parseFloat(checkbox.closest('label').dataset.extraPrice);
            extraCost += extraPrice;
        }
    });

    const finalPrice = (basePrice + extraCost) * quantity;
    priceDisplay.textContent = `${finalPrice.toLocaleString('hu-HU')} Ft`;
}

/**
 * A pizzakártya HTML generálása (TÖBB EXTRÁVAL)
 * @param {object} pizza - A pizza adatai.
 * @returns {string} - A pizza HTML kódja.
 */
function createPizzaCard(pizza) {
    const pizzaId = pizza.id;
    const extraKeys = Object.keys(extraToppings);
    const visibleExtraCount = 3;

    // Extrák listája HTML formátumban
    const allExtrasHtml = extraKeys.map(name => {
        const price = extraToppings[name];
        const priceText = price === 0 ? "INGYEN" : `+${price.toLocaleString('hu-HU')} Ft`;
        return `
            <label class="option" data-extra-price="${price}">
                <input type="checkbox" name="extra-${pizzaId}" value="${name}">
                <span class="option-text">${name} ${priceText}</span>
            </label>
        `;
    });

    const visibleExtras = allExtrasHtml.slice(0, visibleExtraCount).join('');
    const hiddenExtras = allExtrasHtml.slice(visibleExtraCount).join('');

    const showMoreButton = hiddenExtras.length > 0 ?
        `<button class="show-more-extras-btn" data-target="${pizzaId}">További extrák <i class="fas fa-chevron-down"></i></button>` : '';

    return `
        <div class="menu-item" data-pizza-id="${pizzaId}" data-base-price="${pizza.price}">
            <div class="menu-item-img">
                <img src="${pizza.image}" alt="${pizza.name} Pizza">
                ${pizza.badge ? `<div class="menu-item-badge">${pizza.badge}</div>` : ''}
            </div>
            <div class="menu-item-content">
                <h3>${pizza.name}</h3>
                <p class="menu-item-description">${pizza.description}</p>
                <div class="menu-item-details">
                    <div class="menu-item-quantity">
                        <label for="quantity-${pizzaId}">Mennyiség:</label>
                        <div class="quantity-selector">
                            <button class="quantity-btn minus" type="button" data-id="${pizzaId}">-</button>
                            <input type="number" class="quantity-input" value="1" min="1" max="10" id="quantity-${pizzaId}" data-id="${pizzaId}">
                            <button class="quantity-btn plus" type="button" data-id="${pizzaId}">+</button>
                        </div>
                    </div>
                    <div class="option-group">
                        <label class="option-label">Extrák:</label>
                        <div class="options">
                            ${visibleExtras}
                            ${hiddenExtras.length > 0 ? `<div class="extra-options-collapsible" id="extras-collapsible-${pizzaId}">` : ''}
                            ${hiddenExtras}
                            ${hiddenExtras.length > 0 ? `</div>` : ''}
                            ${showMoreButton}
                        </div>
                    </div>
                    <div class="menu-item-price">
                        <span>Teljes ár:</span>
                        <strong class="total-price">${pizza.price.toLocaleString('hu-HU')} Ft</strong>
                    </div>
                </div>
                <div class="menu-item-actions">
                    <div class="special-request">
                        <label for="note-${pizzaId}">Speciális megjegyzés:</label>
                        <textarea id="note-${pizzaId}" placeholder="Megjegyzés (pl: Sok oregánóval / Kukorica nélkül / Jól átsütve kérjük!”)" maxlength="200"></textarea>
                    </div>
                    <button class="add-to-cart-btn" data-item="${pizza.name} Pizza" data-price="${pizza.price}" data-id="${pizzaId}" data-image="${pizza.image}">
                        <i class="fas fa-cart-plus"></i> Kosárba
                    </button>
                </div>
            </div>
        </div>
    `;
}

/**
 * Dinamikusan betölti a pizzákat az allPizzas listából.
 */
function loadMorePizzas() {
    const endIndex = Math.min(currentIndex + pizzasPerLoad, allPizzas.length);
    
    for (let i = currentIndex; i < endIndex; i++) {
        const pizza = allPizzas[i];
        const pizzaCard = createPizzaCard(pizza);
        pizzaGrid.insertAdjacentHTML('beforeend', pizzaCard);
    }
    
    currentIndex = endIndex;
    
    if (currentIndex >= allPizzas.length) {
        if (showMoreContainer) showMoreContainer.style.display = 'none';
    } else {
        updateShowMoreButton();
    }
    
    attachEventHandlersToNewElements();
}

/**
 * Frissíti a "Több pizza megtekintése" gomb szövegét.
 */
function updateShowMoreButton() {
    if (showMoreBtn) {
        const remainingPizzas = allPizzas.length - currentIndex;
        const loadCount = Math.min(pizzasPerLoad, remainingPizzas);
        
        if (remainingPizzas > 0) {
            showMoreBtn.innerHTML = `<i class="fas fa-pizza-slice"></i> További ${loadCount} pizza betöltése`;
        } else {
            if (showMoreContainer) showMoreContainer.style.display = 'none';
        }
    }
}

/**
 * Értesítés megjelenítése a képernyőn (toast).
 */
// --- ÚJ POPUP KEZELŐ ---
function showNotification(message) {
    // Ha van már kint értesítő, töröljük az előzőt
    const existingNotify = document.querySelector('.cart-notification');
    if (existingNotify) {
        existingNotify.remove();
    }

    // Létrehozzuk az elemet a megfelelő CSS osztállyal
    const notification = document.createElement('div');
    notification.className = 'cart-notification'; 
    
    // Tartalom (Ikon + Üzenet)
    notification.innerHTML = `
        <i class="fas fa-check"></i>
        <span>${message}</span>
    `;
    
    // Hozzáadjuk az oldalhoz
    document.body.appendChild(notification);

    // Animáció indítása (becsúszás)
    setTimeout(() => {
        notification.classList.add('show');
    }, 10);

    // Eltüntetés 3 másodperc után
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 500);
    }, 3000);
}


/**
 * Eseménykezelők csatolása az új elemekhez.
 */
function attachEventHandlersToNewElements() {
    const newItems = document.querySelectorAll('.menu-item:not([data-events-attached])');

    newItems.forEach(menuItem => {
        
        // 1. Mennyiség és ár frissítése
        const quantityInput = menuItem.querySelector('.quantity-input');
        const minusBtn = menuItem.querySelector('.quantity-btn.minus');
        const plusBtn = menuItem.querySelector('.quantity-btn.plus');

        minusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value > 1) {
                quantityInput.value = value - 1;
                updatePrice(menuItem);
            }
        });
        
        plusBtn.addEventListener('click', () => {
            let value = parseInt(quantityInput.value);
            if (value < 10) {
                quantityInput.value = value + 1;
                updatePrice(menuItem);
            }
        });
        
        quantityInput.addEventListener('change', function() {
            let value = parseInt(this.value);
            if (isNaN(value) || value < 1) {
                this.value = 1;
            } else if (value > 10) {
                this.value = 10;
            }
            updatePrice(menuItem);
        });
        
        // 2. Extrák és ár frissítése
        const extraCheckboxes = menuItem.querySelectorAll(`input[type="checkbox"]`);
        extraCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => updatePrice(menuItem));
        });

        // 3. "További extrák" gomb
        const showMoreBtn = menuItem.querySelector('.show-more-extras-btn');
        if (showMoreBtn) {
            showMoreBtn.addEventListener('click', function() {
                const targetId = this.dataset.target;
                const collapsible = document.getElementById(`extras-collapsible-${targetId}`);
                
                if (collapsible) {
                    const isExpanded = collapsible.classList.contains('show');
                    collapsible.classList.toggle('show');
                    this.classList.toggle('expanded');
                    this.innerHTML = isExpanded 
                        ? `További extrák <i class="fas fa-chevron-down"></i>` 
                        : `Kevesebb extra <i class="fas fa-chevron-up"></i>`;
                }
            });
        }
        
        // 4. Kosárba helyezés
        const addToCartBtn = menuItem.querySelector('.add-to-cart-btn');
        addToCartBtn.addEventListener('click', function() {
            const itemName = this.getAttribute('data-item');
            const basePrice = parseFloat(menuItem.dataset.basePrice);
            const quantity = parseInt(menuItem.querySelector('.quantity-input').value);
            const specialRequest = menuItem.querySelector('textarea').value.trim();
            const imageUrl = this.getAttribute('data-image');
            
            // Extrák összegyűjtése
            let extraCost = 0;
            const selectedExtras = [];
            
            menuItem.querySelectorAll(`input[type="checkbox"]:checked`).forEach(checkbox => {
                const extraName = checkbox.value;
                const extraPrice = parseFloat(checkbox.closest('label').dataset.extraPrice);
                
                extraCost += extraPrice;
                selectedExtras.push({
                    name: extraName,
                    price: extraPrice
                });
            });
            
            const totalPrice = (basePrice + extraCost) * quantity;
            
            const itemId = Date.now() + Math.random().toString(36).substr(2, 9);
            
            const cartItem = {
                id: itemId,
                name: itemName,
                basePrice: basePrice,
                extraToppings: selectedExtras,
                extraCost: extraCost,
                totalPrice: totalPrice,
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
            
            let notificationMessage = `${quantity} db <strong>${itemName}</strong> hozzáadva a kosárhoz!`;
            
            if (selectedExtras.length > 0) {
                const extraNames = selectedExtras.map(e => e.name).join(', ');
                notificationMessage += `<br><small>Extra feltételek: ${extraNames}</small>`;
            }
            
            notificationMessage += `<br><strong>Összesen: ${totalPrice.toLocaleString('hu-HU')} Ft</strong>`;
            
            showNotification(notificationMessage, 'success');
            
            // Visszaállítás alapértelmezettre
            menuItem.querySelector('.quantity-input').value = 1;
            menuItem.querySelector('textarea').value = '';
            menuItem.querySelectorAll(`input[type="checkbox"]`).forEach(cb => cb.checked = false);
            updatePrice(menuItem); // Ár visszaállítása
        });

        // Jelölje meg, hogy az eseménykezelők csatolva vannak
        menuItem.setAttribute('data-events-attached', 'true');
    });
}

// --- DOMContentLoaded Esemény ---

document.addEventListener('DOMContentLoaded', function() {
    
    // 1. Kosár számláló frissítése
    updateCartCount();
    
    // 2. Mobilmenü logika
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            const icon = mobileMenuBtn.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
        
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('show')) {
                    navMenu.classList.remove('show');
                    mobileMenuBtn.querySelector('i').classList.remove('fa-times');
                    mobileMenuBtn.querySelector('i').classList.add('fa-bars');
                }
            });
        });
    }

    // 3. Pizzák kezdeti betöltése (elindítja a betöltési láncot)
    loadMorePizzas(); 
    
    // 4. További pizzák betöltése esemény
    if (showMoreBtn) {
        showMoreBtn.addEventListener('click', loadMorePizzas);
    }
});