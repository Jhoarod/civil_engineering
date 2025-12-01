// ===== MENÚ MÓVIL =====
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// ===== SCROLL SUAVE =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});



// ===== HEADER SCROLL EFFECT =====
let lastScroll = 0;
const header = document.querySelector('header');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// ===== MANEJO DEL FORMULARIO =====
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        const nombre = document.getElementById('nombre').value.trim();
        const correo = document.getElementById('correo').value.trim();
        const mensaje = document.getElementById('mensaje').value.trim();
        
        if (!nombre || !correo || !mensaje) {
            e.preventDefault();
            alert('Por favor, completa todos los campos obligatorios.');
            return false;
        }
        
        console.log('Formulario enviado correctamente');
    });
}

// ===== CONTADOR ANIMADO PARA ESTADÍSTICAS =====
function animateCounter(element, target, duration, suffix = '') {
    let current = 0;
    const increment = target / (duration / 16);
    let hasStarted = false;
    
    const updateCounter = () => {
        if (!hasStarted) return;
        
        current += increment;
        
        if (current < target) {
            element.textContent = Math.floor(current) + suffix;
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    hasStarted = true;
    updateCounter();
}

// Observer para detectar cuando la sección de estadísticas es visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            statNumbers.forEach((stat, index) => {
                const finalValue = parseInt(stat.getAttribute('data-target'));
                const suffix = stat.getAttribute('data-suffix') || '';
                
                stat.textContent = '0' + suffix;
                
                setTimeout(() => {
                    animateCounter(stat, finalValue, 2000, suffix);
                }, index * 200);
            });
            
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// ===== ANIMACIÓN DE ELEMENTOS AL HACER SCROLL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, index * 100);
            cardsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.servicio-card, .proyecto-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    cardsObserver.observe(el);
});

// ===== ANIMACIÓN DE TÍTULOS DE SECCIÓN =====
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            titleObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5
});

document.querySelectorAll('section h2').forEach(title => {
    title.style.opacity = '0';
    title.style.transform = 'translateY(-20px)';
    title.style.transition = 'all 0.8s ease';
    titleObserver.observe(title);
});

// ===== ANIMACIÓN PARA CAJAS DE ESTADÍSTICAS =====
document.querySelectorAll('.stat-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.8)';
    box.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

const statBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const boxes = entry.target.querySelectorAll('.stat-box');
            boxes.forEach((box, index) => {
                setTimeout(() => {
                    box.style.opacity = '1';
                    box.style.transform = 'scale(1)';
                }, index * 150);
            });
            statBoxObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.3
});

const statsContainer = document.querySelector('.stats');
if (statsContainer) {
    statBoxObserver.observe(statsContainer);
}

// ===== ANIMACIÓN DE TARJETAS DE INFO DE CONTACTO =====
const infoCardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }, index * 100);
            infoCardsObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.info-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(-30px)';
    card.style.transition = 'all 0.6s ease';
    infoCardsObserver.observe(card);
});

// ===== ANIMACIÓN DEL FORMULARIO =====
const formObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            formObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const formContainer = document.querySelector('.form-container');
if (formContainer) {
    formContainer.style.opacity = '0';
    formContainer.style.transform = 'translateY(30px)';
    formContainer.style.transition = 'all 0.8s ease';
    formObserver.observe(formContainer);
}

// ===== EFECTO PARALLAX EN EL HERO =====
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.5}px)`;
        heroContent.style.opacity = 1 - (scrolled / window.innerHeight);
    }
});

// ===== PREVENIR COMPORTAMIENTO POR DEFECTO EN ENLACES VACÍOS =====
document.querySelectorAll('a[href="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
    });
});


// ===== CARRUSEL DE SERVICIOS =====
const carruselWrapper = document.getElementById('carruselWrapper');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const indicadoresContainer = document.getElementById('indicadores');

if (carruselWrapper && prevBtn && nextBtn) {
    const cards = carruselWrapper.querySelectorAll('.servicio-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsToShow = 3;

    // Función para actualizar cardsToShow según el ancho de pantalla
    function updateCardsToShow() {
        const width = window.innerWidth;
        if (width <= 768) {
            cardsToShow = 1;
        } else if (width <= 1200) {
            cardsToShow = 2;
        } else {
            cardsToShow = 3;
        }
    }

    // Crear indicadores
    function createIndicators() {
        indicadoresContainer.innerHTML = '';
        const totalIndicators = Math.ceil(totalCards / cardsToShow);
        
        for (let i = 0; i < totalIndicators; i++) {
            const indicador = document.createElement('div');
            indicador.classList.add('indicador');
            if (i === 0) indicador.classList.add('active');
            indicador.addEventListener('click', () => goToSlide(i));
            indicadoresContainer.appendChild(indicador);
        }
    }

    // Actualizar indicadores activos
    function updateIndicators() {
        const indicadores = indicadoresContainer.querySelectorAll('.indicador');
        const activeIndex = Math.floor(currentIndex / cardsToShow);
        indicadores.forEach((ind, idx) => {
            ind.classList.toggle('active', idx === activeIndex);
        });
    }

    // Ir a un slide específico
    function goToSlide(index) {
        currentIndex = index * cardsToShow;
        const maxIndex = totalCards - cardsToShow;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        const cardWidth = cards[0].offsetWidth;
        const gap = 32; // 2rem = 32px
        const offset = -(currentIndex * (cardWidth + gap));
        
        carruselWrapper.style.transform = `translateX(${offset}px)`;
        updateIndicators();
    }

    // Botón anterior
    prevBtn.addEventListener('click', () => {
        currentIndex -= cardsToShow;
        if (currentIndex < 0) {
            currentIndex = totalCards - cardsToShow;
        }
        goToSlide(Math.floor(currentIndex / cardsToShow));
    });

    // Botón siguiente
    nextBtn.addEventListener('click', () => {
        currentIndex += cardsToShow;
        if (currentIndex >= totalCards) {
            currentIndex = 0;
        }
        goToSlide(Math.floor(currentIndex / cardsToShow));
    });

    // Auto-play cada 5 segundos
    let autoplayInterval = setInterval(() => {
        nextBtn.click();
    }, 5000);

    // Pausar autoplay al hover
    carruselWrapper.addEventListener('mouseenter', () => {
        clearInterval(autoplayInterval);
    });

    carruselWrapper.addEventListener('mouseleave', () => {
        autoplayInterval = setInterval(() => {
            nextBtn.click();
        }, 5000);
    });

    // Inicializar
    updateCardsToShow();
    createIndicators();

    // Actualizar al cambiar tamaño de ventana
    window.addEventListener('resize', () => {
        updateCardsToShow();
        createIndicators();
        goToSlide(0);
        currentIndex = 0;
    });
}

console.log('🎠 Carrusel de servicios cargado correctamente');

// ===== LOG DE CARGA =====
console.log('✅ Constructora Elite - Sitio Web V3 cargado correctamente');
console.log('🏗️ Todas las animaciones e interacciones están activas');