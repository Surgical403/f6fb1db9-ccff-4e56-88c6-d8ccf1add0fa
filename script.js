/* ==========================================
   EMAGRECIMENTO SEM SEGREDOS - SCRIPTS
   ========================================== */

// --- COUNTDOWN TIMER ---
function initCountdown() {
    const countdownEl = document.getElementById('countdown');
    if (!countdownEl) return;

    // Set 3 hours from now
    let totalSeconds = 3 * 60 * 60 - 1;

    // Check localStorage for saved end time
    const savedEnd = localStorage.getItem('ess_countdown_end');
    if (savedEnd) {
        const remaining = Math.floor((parseInt(savedEnd) - Date.now()) / 1000);
        if (remaining > 0) {
            totalSeconds = remaining;
        } else {
            // Reset if expired
            localStorage.setItem('ess_countdown_end', Date.now() + totalSeconds * 1000);
        }
    } else {
        localStorage.setItem('ess_countdown_end', Date.now() + totalSeconds * 1000);
    }

    function updateTimer() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        countdownEl.textContent = 
            String(hours).padStart(2, '0') + ':' + 
            String(minutes).padStart(2, '0') + ':' + 
            String(seconds).padStart(2, '0');

        if (totalSeconds > 0) {
            totalSeconds--;
        } else {
            // Reset to 3 hours when it hits 0
            totalSeconds = 3 * 60 * 60;
            localStorage.setItem('ess_countdown_end', Date.now() + totalSeconds * 1000);
        }
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// --- FAQ TOGGLE ---
function toggleFaq(id) {
    const item = document.getElementById(id);
    if (!item) return;
    
    // Close all other items
    document.querySelectorAll('.faq__item').forEach(el => {
        if (el.id !== id) {
            el.classList.remove('active');
        }
    });
    
    // Toggle current item
    item.classList.toggle('active');
}

// --- FLOATING CTA ---
function initFloatingCta() {
    const floatingCta = document.getElementById('floating-cta');
    const hero = document.getElementById('hero');
    if (!floatingCta || !hero) return;

    window.addEventListener('scroll', () => {
        const heroBottom = hero.offsetTop + hero.offsetHeight;
        if (window.scrollY > heroBottom - 200) {
            floatingCta.classList.add('visible');
        } else {
            floatingCta.classList.remove('visible');
        }
    });
}

// --- PARTICLES ---
function initParticles() {
    const container = document.getElementById('particles');
    if (!container) return;

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 6 + 's';
        particle.style.animationDuration = (4 + Math.random() * 4) + 's';
        
        const colors = ['var(--gold)', 'var(--red-bright)', '#fff'];
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.width = (2 + Math.random() * 4) + 'px';
        particle.style.height = particle.style.width;
        
        container.appendChild(particle);
    }
}

// --- SCROLL ANIMATIONS ---
function initScrollAnimations() {
    // Add fade-in class to elements
    const animateTargets = document.querySelectorAll(
        '.pain__card, .testimonial-card, .product__flex, .compare__table-wrapper, .pricing__card, .faq__item'
    );
    
    animateTargets.forEach(el => el.classList.add('fade-in'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    animateTargets.forEach(el => observer.observe(el));
}

// --- SMOOTH SCROLL FOR CTA ---
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 60;
                const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({
                    top: top,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// --- RANDOM SOCIAL PROOF POPUP ---
function initSocialProof() {
    const names = [
        'Maria de São Paulo',
        'João do Recife',
        'Ana de Salvador',
        'Pedro de Brasília',
        'Carla de Manaus',
        'Roberto de Curitiba',
        'Fernanda de Goiânia',
        'Lucas de Fortaleza'
    ];

    const actions = [
        'acabou de comprar o ebook!',
        'garantiu o desconto especial!',
        'começou a transformação!',
        'adquiriu o ebook agora!'
    ];

    function showPopup() {
        const name = names[Math.floor(Math.random() * names.length)];
        const action = actions[Math.floor(Math.random() * actions.length)];

        const popup = document.createElement('div');
        popup.style.cssText = `
            position: fixed;
            bottom: 80px;
            left: 20px;
            background: rgba(26,26,26,0.95);
            backdrop-filter: blur(10px);
            border: 1px solid rgba(255,215,0,0.3);
            border-radius: 12px;
            padding: 14px 20px;
            z-index: 998;
            font-size: 0.85rem;
            color: #ccc;
            max-width: 300px;
            transform: translateX(-120%);
            transition: transform 0.5s ease;
            box-shadow: 0 10px 30px rgba(0,0,0,0.4);
        `;
        popup.innerHTML = `🔔 <strong style="color: #FFD700">${name}</strong> ${action}`;
        document.body.appendChild(popup);

        requestAnimationFrame(() => {
            popup.style.transform = 'translateX(0)';
        });

        setTimeout(() => {
            popup.style.transform = 'translateX(-120%)';
            setTimeout(() => popup.remove(), 500);
        }, 4000);
    }

    // Show first popup after 8 seconds, then every 15-25 seconds
    setTimeout(() => {
        showPopup();
        setInterval(showPopup, 15000 + Math.random() * 10000);
    }, 8000);
}

// --- INIT ALL ---
document.addEventListener('DOMContentLoaded', () => {
    initCountdown();
    initFloatingCta();
    initParticles();
    initScrollAnimations();
    initSmoothScroll();
    initSocialProof();
});
