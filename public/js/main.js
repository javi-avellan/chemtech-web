// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    
    // Iniciar AOS (Animaciones de scroll)
    AOS.init({
        duration: 800,
        once: true,
        offset: 100
    });

    // Iniciar Animación de Valores (Si existe en la página)
    initValuesAnimation();
});

// 1. PRELOADER
window.addEventListener('load', function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.style.opacity = '0';
        setTimeout(function() { 
            preloader.style.display = 'none'; 
        }, 500);
    }
});

// 2. ANIMACIÓN DE VALORES (TEXTO CAMBIANTE)
function initValuesAnimation() {
    const highlight = document.querySelector('.values-highlight');
    
    // Solo ejecutar si el elemento existe en esta página
    if (highlight) {
        const words = ["Confiabilidad", "Compromiso", "Honestidad", "Excelencia", "Calidad"];
        let index = 0;

        setInterval(() => {
            // 1. Ocultar (Fade out)
            highlight.classList.add('hidden');

            setTimeout(() => {
                // 2. Cambiar texto cuando está oculto
                index = (index + 1) % words.length;
                highlight.textContent = words[index];

                // 3. Mostrar (Fade in)
                highlight.classList.remove('hidden');
            }, 500); // Esperar 0.5s (tiempo que dura la transición CSS)

        }, 2500); // Cambiar cada 2.5 segundos
    }
}

// 3. NAVBAR DINÁMICO
window.addEventListener('scroll', function() {
    var nav = document.getElementById('mainNav');
    if (nav) {
        if (window.scrollY > 50) {
            nav.classList.add('scrolled', 'shadow');
        } else {
            nav.classList.remove('scrolled', 'shadow');
        }
    }
});

// 4. ANIMACIÓN DE CONTADORES (Para el Home)
const counters = document.querySelectorAll('.counter');
const speed = 200;

if (counters.length > 0) {
    const runCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(runCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };
    setTimeout(runCounters, 500); 
}
