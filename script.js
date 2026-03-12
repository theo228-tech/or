document.addEventListener('DOMContentLoaded', () => {
    // 1. SÉLECTEURS
    const burger = document.getElementById('burger-menu') || document.querySelector('.burger');
    const navLinks = document.querySelector('.nav-links');
    const links = document.querySelectorAll('.nav-links li');
    const navbar = document.querySelector('nav');
    const form = document.querySelector('.contact-form');
    const themeToggle = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    // --- 2. GESTION DU MENU MOBILE (BURGER) ---
    if (burger && navLinks) {
        burger.addEventListener('click', () => {
            // Ouvrir/Fermer le menu
            navLinks.classList.toggle('nav-active');

            // Animation des 3 lignes en Croix
            burger.classList.toggle('toggle');

            // Animation d'apparition des liens un par un
            links.forEach((link, index) => {
                if (link.style.animation) {
                    link.style.animation = '';
                } else {
                    link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;
                }
            });
        });

        // Refermer le menu auto quand on clique sur un lien
        links.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('nav-active');
                burger.classList.remove('toggle');
                links.forEach(l => l.style.animation = '');
            });
        });
    }

    // --- 3. EFFET DE SCROLL (NAVBAR) ---
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.background = 'var(--bg-nav)'; // Utilise la variable CSS du thème
            navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.1)';
            navbar.style.height = '70px'; // La barre devient un peu plus fine au scroll
        } else {
            navbar.style.background = 'transparent';
            navbar.style.boxShadow = 'none';
            navbar.style.height = '90px';
        }
    });

    // --- 4. GESTION DU MODE SOMBRE / CLAIR ---
    if (themeToggle) {
        const currentTheme = localStorage.getItem('theme') || 'light';
        htmlElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);

        themeToggle.addEventListener('click', () => {
            let theme = htmlElement.getAttribute('data-theme');
            let newTheme = (theme === 'light') ? 'dark' : 'light';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = themeToggle.querySelector('i');
        if (theme === 'dark') {
            icon.className = 'fas fa-sun';
        } else {
            icon.className = 'fas fa-moon';
        }
    }

    // --- 5. FORMULAIRE DE CONTACT ---
    if (form) {
        form.onsubmit = () => {
            console.log("Transmission en cours... Ornelia recevra votre message sous peu.");
            // Note: Formspree s'occupe de la redirection réelle
        };
    }
});

const textElement = document.getElementById("hero-text");
const titleElement = document.getElementById("hero-title");

titleElement.classList.add("glow");

const phrases = [
"Gestionnaire RH",
"Entrepreneure",
"Consultante en Formation",
"Experte en capital humain"
];

let phraseIndex = 0;
let letterIndex = 0;
let deleting = false;

function typeAnimation(){

    let currentPhrase = phrases[phraseIndex];

    if(!deleting){
        textElement.textContent = currentPhrase.substring(0,letterIndex+1);
        letterIndex++;

        if(letterIndex === currentPhrase.length){
            deleting = true;
            setTimeout(typeAnimation,1500);
            return;
        }

    }else{

        textElement.textContent = currentPhrase.substring(0,letterIndex-1);
        letterIndex--;

        if(letterIndex === 0){
            deleting = false;
            phraseIndex++;

            if(phraseIndex === phrases.length){
                phraseIndex = 0;
            }
        }
    }

    setTimeout(typeAnimation,80);
}

typeAnimation();

