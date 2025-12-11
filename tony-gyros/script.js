// Mobil menü kezelése
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navMenu = document.getElementById('navMenu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            // Menü ikon változtatása
            const icon = this.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }
    
    // Menü bezárása kattintáskor
    document.addEventListener('click', function(event) {
        if (!event.target.closest('nav') && !event.target.closest('.mobile-menu-btn')) {
            navMenu.classList.remove('active');
            const icon = mobileMenuBtn.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
    
    // Aktív menüpont kijelölése
    const currentPage = window.location.pathname.split('/').pop();
    const menuLinks = document.querySelectorAll('nav ul li a');
    
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        
        if (linkHref === currentPage || (currentPage === '' && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
    
    // Kosár számláló kezelése
    const cartCount = document.getElementById('cartCount');
    
    // Kosár inicializálása
    function updateCartCount() {
        if (cartCount) {
            const cartItems = localStorage.getItem('tonyGyrosCart') ? 
                JSON.parse(localStorage.getItem('tonyGyrosCart')) : [];
            cartCount.textContent = cartItems.length;
        }
    }
    
    updateCartCount();
    
    // Görgetés esemény a fejléc stílusához
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 50) {
            header.style.height = '80px';
            header.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.15)';
        } else {
            header.style.height = '100px';
            header.style.boxShadow = '0 4px 12px rgba(0, 51, 102, 0.1)';
        }
    });
    
    // Térkép interaktivitás
    const mapIframe = document.querySelector('.map-wrapper iframe');
    if (mapIframe) {
        mapIframe.addEventListener('load', function() {
            console.log('Google Maps betöltve');
        });
    }
    
    // Konzol üdvözlés
    console.log('Üdvözöllek a Tony Gyros weboldalán! 🥙');
});

