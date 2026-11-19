document.addEventListener('DOMContentLoaded', () => {

    // --- 1. CONFIGURATION DE L'OBSERVER (SCROLL) ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-visible');
            }
        });
    }, observerOptions);

    // --- 2. ANIMATION DU HERO (IMMÉDIATE) ---
    // On cible les éléments du haut de page
    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');

    // On les prépare en ajoutant les classes de direction
    if (heroText) heroText.classList.add('reveal-left');
    if (heroImage) heroImage.classList.add('reveal-right');

    // On déclenche l'apparition avec un léger délai pour forcer l'animation d'entrée
    setTimeout(() => {
        if (heroText) heroText.classList.add('reveal-visible');
        if (heroImage) heroImage.classList.add('reveal-visible');
    }, 150);

    // --- 3. ANIMATION DU RESTE DU SITE (AU SCROLL) ---
    
    // Section À Propos
    const aboutImg = document.querySelector('.about-img');
    const aboutContent = document.querySelector('.about-content');
    if (aboutImg) {
        aboutImg.classList.add('reveal-left');
        observer.observe(aboutImg);
    }
    if (aboutContent) {
        aboutContent.classList.add('reveal-up');
        observer.observe(aboutContent);
    }

    // Catégories (Effet de cascade / Stagger)
    const catItems = document.querySelectorAll('.cat-item');
    catItems.forEach((item, index) => {
        item.classList.add('reveal-up');
        // On décale l'apparition de chaque carte
        item.style.transitionDelay = `${index * 150}ms`; 
        observer.observe(item);
    });

    // Section Commande (Titre, texte et boutons)
    const orderElements = document.querySelectorAll('.order-title, .order-sub, .delivery-buttons');
    orderElements.forEach(el => {
        el.classList.add('reveal-up');
        observer.observe(el);
    });

    // Features (Icônes du bas)
    const features = document.querySelectorAll('.feature-item');
    features.forEach((item, index) => {
        item.classList.add('reveal-up');
        item.style.transitionDelay = `${index * 150}ms`;
        observer.observe(item);
    });

    // --- 4. HEADER FIXE (EFFET AU SCROLL) ---
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Animation de la section Map
    const mapSection = document.querySelector('.map-section');
    if (mapSection) {
        mapSection.classList.add('reveal-up');
        observer.observe(mapSection);
    }
});

