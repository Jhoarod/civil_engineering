// Menú móvil
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(0, 0, 0, 1)';
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.3)';
    } else {
        header.style.background = 'rgba(0, 0, 0, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Manejo del formulario
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        nombre: document.getElementById('nombre').value,
        correo: document.getElementById('correo').value,
        telefono: document.getElementById('telefono').value,
        mensaje: document.getElementById('mensaje').value
    };

    console.log('Datos del formulario:', formData);
    
    alert('¡Gracias por contactarnos! Nos pondremos en contacto contigo pronto.');
    this.reset();
});

// CONTADOR ANIMADO PARA ESTADÍSTICAS
function animateCounter(element, target, duration, suffix = '') {
    let current = 0;
    const increment = target / (duration / 16); // 60 FPS
    const isDecimal = target % 1 !== 0;
    
    const updateCounter = () => {
        current += increment;
        
        if (current < target) {
            if (isDecimal) {
                element.textContent = current.toFixed(0) + suffix;
            } else {
                element.textContent = Math.floor(current) + suffix;
            }
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + suffix;
        }
    };
    
    updateCounter();
}

// Observer para detectar cuando la sección de estadísticas es visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumbers = document.querySelectorAll('.stat-number');
            
            // Animar cada contador solo una vez
            statNumbers.forEach((stat, index) => {
                const finalValue = stat.getAttribute('data-target');
                const suffix = stat.getAttribute('data-suffix') || '';
                
                // Limpiar el contenido inicial
                stat.textContent = '0' + suffix;
                
                // Iniciar animación con delay escalonado
                setTimeout(() => {
                    animateCounter(stat, parseInt(finalValue), 2000, suffix);
                }, index * 200);
            });
            
            // Dejar de observar después de animar
            statsObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.5 // Se activa cuando el 50% de la sección es visible
});

// Observar la sección de estadísticas
const statsSection = document.querySelector('.stats');
if (statsSection) {
    statsObserver.observe(statsSection);
}

// Animación de elementos al hacer scroll (tarjetas de servicios y proyectos)
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.servicio-card, .proyecto-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.6s ease';
    cardsObserver.observe(el);
});

// Animación de aparición del título de sección
const titleObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
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

// Animación para las cajas de estadísticas
document.querySelectorAll('.stat-box').forEach((box, index) => {
    box.style.opacity = '0';
    box.style.transform = 'scale(0.8)';
    box.style.transition = `all 0.5s ease ${index * 0.1}s`;
});

const statBoxObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const boxes = entry.target.querySelectorAll('.stat-box');
            boxes.forEach(box => {
                box.style.opacity = '1';
                box.style.transform = 'scale(1)';
            });
        }
    });
}, {
    threshold: 0.3
});

const statsContainer = document.querySelector('.stats');
if (statsContainer) {
    statBoxObserver.observe(statsContainer);
}