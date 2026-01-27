/**
 * Școala Gimnazială „Principele Carol"
 * JavaScript Principal
 */

document.addEventListener('DOMContentLoaded', function () {
    // ============================================
    // Header Scroll Effect
    // ============================================
    const header = document.querySelector('.header');
    let lastScroll = 0;

    function handleScroll() {
        const currentScroll = window.pageYOffset;

        // Add scrolled class when not at top
        if (currentScroll > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        lastScroll = currentScroll;
    }

    window.addEventListener('scroll', handleScroll, { passive: true });

    // ============================================
    // Mobile Navigation Toggle
    // ============================================
    const hamburger = document.querySelector('.hamburger');
    const nav = document.querySelector('.nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && nav) {
        hamburger.addEventListener('click', function () {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function () {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function (e) {
            if (!nav.contains(e.target) && !hamburger.contains(e.target) && nav.classList.contains('active')) {
                hamburger.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // ============================================
    // Smooth Scroll for Anchor Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');

            if (targetId === '#') return;

            const target = document.querySelector(targetId);

            if (target) {
                e.preventDefault();
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ============================================
    // Intersection Observer for Animations
    // ============================================
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const animatedElements = document.querySelectorAll('[data-animate]');

    if (animatedElements.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        animatedElements.forEach(el => {
            observer.observe(el);
        });
    }

    // ============================================
    // Active Navigation Link
    // ============================================
    function setActiveNavLink() {
        const currentPath = window.location.pathname;
        const navLinks = document.querySelectorAll('.nav-link');

        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath ||
                (currentPath.endsWith('/') && href === 'index.html') ||
                (currentPath.endsWith('index.html') && href === 'index.html')) {
                link.classList.add('active');
            }
        });
    }

    setActiveNavLink();

    // ============================================
    // Cookie Consent Logic
    // ============================================
    function initCookieConsent() {
        // Verificăm dacă utilizatorul a acceptat deja
        if (!localStorage.getItem('cookieConsent')) {
            createCookieBanner();
        }
    }

    function createCookieBanner() {
        const banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.innerHTML = `
            <div class="cookie-text">
                Acest site folosește cookie-uri pentru a asigura buna funcționare și o experiență optimă de navigare. Continuarea implică acceptul dumneavoastră.
            </div>
            <div class="cookie-buttons">
                <button id="acceptCookies" class="btn-cookie-agree">Sunt de acord</button>
                <a href="documente.html" class="btn-cookie-policy">Politica de Confidențialitate</a>
            </div>
        `;

        document.body.appendChild(banner);

        // Trigger reflow pentru animație
        // Folosim un mic delay pentru a ne asigura că elementul este în DOM înainte de a adăuga clasa active
        setTimeout(() => {
            banner.classList.add('active');
        }, 500);

        // Event Listener pentru buton
        document.getElementById('acceptCookies').addEventListener('click', () => {
            localStorage.setItem('cookieConsent', 'true');
            banner.classList.remove('active');

            // Eliminăm elementul din DOM după ce se termină tranziția CSS (0.4s)
            setTimeout(() => {
                banner.remove();
            }, 400);
        });
    }

    initCookieConsent();

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c👑 Școala Gimnazială „Principele Carol"',
        'color: #1B264F; font-size: 20px; font-weight: bold;');
    console.log('%cTradiție Regală, Educație pentru Viitor',
        'color: #D4A84B; font-size: 14px; font-style: italic;');
});
