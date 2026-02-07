/**
 * @file main.js
 * @description Refactored Principal JavaScript for Școala Gimnazială „Principele Carol".
 * Refactored for modularity, readability, and performance.
 */

// Global Constants (Eliminating Magic Numbers)
const SCROLL_THRESHOLD = 50;
const SEARCH_FOCUS_DELAY = 100;
const COOKIE_BANNER_DELAY = 500;
const COOKIE_REMOVE_DELAY = 400;

document.addEventListener('DOMContentLoaded', () => {
    const App = {
        init() {
            this.header = document.querySelector('.header');
            this.cacheDOM();
            this.bindEvents();
            this.initModules();
        },

        cacheDOM() {
            this.hamburger = document.querySelector('.hamburger');
            this.nav = document.querySelector('.nav');
            this.navLinks = document.querySelectorAll('.nav-link');
            this.searchBtn = document.getElementById('searchBtn');
            this.searchContainer = document.getElementById('searchContainer');
            this.searchInput = document.getElementById('searchInput');
            this.searchClose = document.getElementById('searchClose');
        },

        bindEvents() {
            window.addEventListener('scroll', () => this.handleHeaderScroll(), { passive: true });

            if (this.hamburger && this.nav) {
                this.hamburger.addEventListener('click', () => this.toggleMobileNav());
                this.navLinks.forEach(link => link.addEventListener('click', () => this.closeMobileNav()));
                document.addEventListener('click', (e) => this.handleOutsideNavClick(e));
            }

            if (this.searchBtn) {
                this.searchBtn.addEventListener('click', (e) => this.toggleSearch(e));
                this.searchClose?.addEventListener('click', (e) => this.closeSearch(e));
                document.addEventListener('click', (e) => this.handleOutsideSearchClick(e));
                document.addEventListener('keydown', (e) => this.handleSearchKeydown(e));
            }

            this.initAnchorLinks();
        },

        initModules() {
            this.initIntersectionObserver();
            this.setActiveNavLink();
            this.initCookieConsent();
            this.logWelcomeMessage();
        },

        // --- Core Functionality ---

        handleHeaderScroll() {
            const isScrolled = window.pageYOffset > SCROLL_THRESHOLD;
            this.header?.classList.toggle('scrolled', isScrolled);
        },

        toggleMobileNav() {
            const isActive = this.nav.classList.toggle('active');
            this.hamburger.classList.toggle('active', isActive);
            document.body.style.overflow = isActive ? 'hidden' : '';
        },

        closeMobileNav() {
            this.hamburger.classList.remove('active');
            this.nav.classList.remove('active');
            document.body.style.overflow = '';
        },

        handleOutsideNavClick(e) {
            const isOutside = !this.nav.contains(e.target) && !this.hamburger.contains(e.target);
            if (isOutside && this.nav.classList.contains('active')) {
                this.closeMobileNav();
            }
        },

        toggleSearch(e) {
            e.stopPropagation();
            const isActive = this.searchContainer.classList.toggle('active');
            if (isActive) {
                setTimeout(() => this.searchInput?.focus(), SEARCH_FOCUS_DELAY);
            }
        },

        closeSearch(e) {
            e?.stopPropagation();
            this.searchContainer.classList.remove('active');
            if (this.searchInput) this.searchInput.value = '';
        },

        handleOutsideSearchClick(e) {
            if (!this.searchContainer.contains(e.target) && this.searchContainer.classList.contains('active')) {
                this.closeSearch();
            }
        },

        handleSearchKeydown(e) {
            if (e.key === 'Escape') this.closeSearch();
            if (e.key === 'Enter' && e.target === this.searchInput) this.processSearch();
        },

        processSearch() {
            const rawValue = this.searchInput.value.trim();
            if (!rawValue) return;

            const safeValue = rawValue.replace(/<[^>]*>?/gm, '');
            const lowerValue = safeValue.toLowerCase();

            // Hartă de cuvinte cheie pentru navigare rapidă
            const pageMap = {
                'acasa': 'index.html',
                'home': 'index.html',
                'despre': 'despre.html',
                'istoric': 'despre.html',
                'cine suntem': 'despre.html',
                'hub': 'hub-media.html',
                'media': 'hub-media.html',
                'radio': 'hub-media.html',
                'tv': 'hub-media.html',
                'podcast': 'hub-media.html',
                'caroline': 'hub-media.html',
                'consiliu': 'consiliu-elevi.html',
                'elevi': 'consiliu-elevi.html',
                'parinti': 'parinti.html',
                'părinți': 'parinti.html',
                'sedinte': 'parinti.html',
                'inscriere': 'parinti.html',
                'înscriere': 'parinti.html',
                'orar': 'parinti.html#orar',
                'proiecte': 'proiecte.html',
                'erasmus': 'proiecte.html',
                'activitati': 'proiecte.html',
                'podium': 'galerie-onoare.html',
                'onoare': 'galerie-onoare.html',
                'premii': 'galerie-onoare.html',
                'documente': 'documente.html',
                'regulament': 'documente.html',
                'rapoarte': 'documente.html',
                'galerie': 'galerie.html',
                'foto': 'galerie.html',
                'poze': 'galerie.html',
                'contact': 'contact.html',
                'adresa': 'contact.html',
                'telefon': 'contact.html',
                'secretariat': 'contact.html'
            };

            // 1. Verificăm dacă există o potrivire directă
            for (const [key, url] of Object.entries(pageMap)) {
                if (lowerValue.includes(key)) {
                    window.location.href = url;
                    this.closeSearch();
                    return;
                }
            }

            // 2. Dacă nu, căutăm pe Google în site
            window.open(`https://www.google.com/search?q=site:principelecarol.ro+${encodeURIComponent(safeValue)}`, '_blank');
            this.closeSearch();
        },

        initAnchorLinks() {
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', (e) => this.handleSmoothScroll(e, anchor));
            });
        },

        handleSmoothScroll(e, anchor) {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;

            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            const headerHeight = this.header?.offsetHeight || 0;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({ top: targetPosition, behavior: 'smooth' });
        },

        initIntersectionObserver() {
            const animatedElements = document.querySelectorAll('[data-animate]');
            if (animatedElements.length === 0) return;

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1 });

            animatedElements.forEach(el => observer.observe(el));
        },

        setActiveNavLink() {
            const currentPath = window.location.pathname;
            this.navLinks.forEach(link => {
                const href = link.getAttribute('href');
                const isHomePage = (currentPath.endsWith('/') || currentPath.endsWith('index.html')) && href === 'index.html';
                if (href === currentPath || isHomePage) {
                    link.classList.add('active');
                }
            });
        },

        initCookieConsent() {
            if (!localStorage.getItem('cookieConsent')) {
                this.createCookieBanner();
            }
        },

        createCookieBanner() {
            const banner = document.createElement('div');
            banner.className = 'cookie-banner';
            banner.innerHTML = `
                <div class="cookie-text">
                    Acest site folosește cookie-uri pentru a asigura buna funcționare și o experiență optimă de navigare. Continuarea implică acceptul dumneavoastră.
                </div>
                <div class="cookie-buttons">
                    <button id="acceptCookies" class="btn-cookie-agree">Sunt de acord</button>
                    <a href="documente.html" class="btn-cookie-policy">Politica de Confidențialitate</a>
                </div>`;

            document.body.appendChild(banner);
            setTimeout(() => banner.classList.add('active'), COOKIE_BANNER_DELAY);

            document.getElementById('acceptCookies').addEventListener('click', () => {
                localStorage.setItem('cookieConsent', 'true');
                banner.classList.remove('active');
                setTimeout(() => banner.remove(), COOKIE_REMOVE_DELAY);
            });
        },

        logWelcomeMessage() {
            console.log('%c👑 Școala Gimnazială „Principele Carol"', 'color: #1B264F; font-size: 20px; font-weight: bold;');
            console.log('%cTradiție Regală, Educație pentru Viitor', 'color: #D4A84B; font-size: 14px; font-style: italic;');
        }
    };

    App.init();
});
