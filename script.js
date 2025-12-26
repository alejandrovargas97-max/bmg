// BMG - Script básico para funcionalidad
console.log('Sitio BMG cargado');

// Cuando el DOM esté listo
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM cargado - iniciando');
    
    // 1. Navegación suave (para enlaces del menú)
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.getAttribute('href');
            if(target === '#') return;
            
            const element = document.querySelector(target);
            if(element) {
                window.scrollTo({
                    top: element.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // 2. Formulario de contacto básico
    const form = document.querySelector('.contact-form');
    if(form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Mensaje enviado! Te contactaré pronto.');
            this.reset();
        });
    }
    
    // 3. Efecto simple para cards
    const cards = document.querySelectorAll('.service-card, .portfolio-item');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    console.log('Funciones básicas listas');

    // --- Cambio de imagen y video por idioma ---
    const languageSelector = document.getElementById("languageSelector");
    const welcomeImage = document.getElementById("welcomeImage");
    const welcomeVideo = document.getElementById("welcomeVideo");

    const content = {
        es: { img: "esbr.jpg", video: "esp.mp4" },
        en: { img: "enbr.jpg", video: "aus.mp4" },
        fr: { img: "frbr.jpg", video: "fra.mp4" },
        it: { img: "itabr.jpg", video: "ita.mp4" },
        jp: { img: "jpnbrg.jpg", video: "jpn.mp4" },
        ar: { img: "alebr.jpg", video: "ara.mp4" },
        cn: { img: "dubr.jpg", video: "chn.mp4" }
    };

    if (languageSelector) {
        languageSelector.addEventListener("change", () => {
            const lang = languageSelector.value;

            if (content[lang]) {
                welcomeImage.src = content[lang].img;
                welcomeVideo.src = content[lang].video;
                welcomeVideo.load();
            }
        });
    }

    console.log('Sistema de idiomas configurado');
});
