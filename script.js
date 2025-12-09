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

document.querySelectorAll('.proyecto-card').forEach(el => {
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

// ===== CARRUSEL DE SERVICIOS V12 - DESLIZANTE IZQUIERDA A DERECHA =====
// ===== CARRUSEL DE SERVICIOS V14 - CORREGIDO =====
const track = document.getElementById('carruselTrack');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');
const dotsContainer = document.getElementById('carruselDots');

if (track && btnPrev && btnNext && dotsContainer) {
    const cards = track.querySelectorAll('.servicio-card');
    const totalCards = cards.length;
    let currentIndex = 0;
    let cardsVisible = 2;

    function getCardsVisible() {
        const width = window.innerWidth;
        if (width <= 1200) return 1;
        return 2;
    }

    function createDots() {
        dotsContainer.innerHTML = '';
        cardsVisible = getCardsVisible();
        const totalSlides = Math.ceil(totalCards / cardsVisible);
        
        for (let i = 0; i < totalSlides; i++) {
            const dot = document.createElement('div');
            dot.classList.add('carrusel-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(i));
            dotsContainer.appendChild(dot);
        }
    }

    function updateDots() {
        const dots = dotsContainer.querySelectorAll('.carrusel-dot');
        const activeSlide = Math.floor(currentIndex / cardsVisible);
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === activeSlide);
        });
    }

    function goToSlide(slideIndex) {
        cardsVisible = getCardsVisible();
        currentIndex = slideIndex * cardsVisible;
        
        // Limitar el índice al máximo posible
        const maxIndex = totalCards - cardsVisible;
        if (currentIndex > maxIndex) currentIndex = maxIndex;
        if (currentIndex < 0) currentIndex = 0;
        
        const card = cards[0];
        const cardWidth = card.offsetWidth;
        const gap = 40; // 2.5rem = 40px
        
        // Calcular desplazamiento por grupos de cards
        const moveAmount = -(currentIndex * (cardWidth + gap));
        
        track.style.transform = `translateX(${moveAmount}px)`;
        updateDots();
    }

    btnPrev.addEventListener('click', () => {
        cardsVisible = getCardsVisible();
        const currentSlide = Math.floor(currentIndex / cardsVisible);
        let newSlide = currentSlide - 1;
        
        if (newSlide < 0) {
            newSlide = Math.ceil(totalCards / cardsVisible) - 1;
        }
        
        goToSlide(newSlide);
    });

    btnNext.addEventListener('click', () => {
        cardsVisible = getCardsVisible();
        const currentSlide = Math.floor(currentIndex / cardsVisible);
        const totalSlides = Math.ceil(totalCards / cardsVisible);
        let newSlide = currentSlide + 1;
        
        if (newSlide >= totalSlides) {
            newSlide = 0;
        }
        
        goToSlide(newSlide);
    });

    let autoSlide = setInterval(() => {
        btnNext.click();
    }, 5000);

    track.addEventListener('mouseenter', () => {
        clearInterval(autoSlide);
    });

    track.addEventListener('mouseleave', () => {
        autoSlide = setInterval(() => {
            btnNext.click();
        }, 5000);
    });

    createDots();
    
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            createDots();
            currentIndex = 0;
            goToSlide(0);
        }, 250);
    });
}

console.log('✅ Carrusel V14 corregido - Sin cortes');
// ===== LOG DE CARGA =====
console.log('✅ Sitio Web V12 cargado correctamente');
