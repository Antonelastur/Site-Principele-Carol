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
            this.initMuseumLightbox();
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
                this.searchInput?.addEventListener('input', (e) => this.handleSearchInput(e));
            }

            this.initAnchorLinks();
        },

        initModules() {
            this.initIntersectionObserver();
            this.setActiveNavLink();
            this.initCookieConsent();
            this.logWelcomeMessage();
        },

        initMuseumLightbox() {
            const lightbox = document.getElementById('museumLightbox');
            if (!lightbox) return;

            const lightboxImg = document.getElementById('lightboxImg');
            const lightboxCaption = document.getElementById('lightboxCaption');
            const closeBtn = document.getElementById('lightboxClose');
            const triggers = document.querySelectorAll('.lightbox-trigger');

            const openLightbox = (imgSrc, caption) => {
                lightboxImg.src = imgSrc;
                lightboxCaption.textContent = caption;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            };

            const closeLightbox = () => {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
                setTimeout(() => {
                    lightboxImg.src = '';
                }, 300);
            };

            triggers.forEach(trigger => {
                trigger.addEventListener('click', (e) => {
                    e.preventDefault();
                    const img = trigger.querySelector('img');
                    const caption = trigger.dataset.caption || img.alt;
                    openLightbox(img.src, caption);
                });
            });

            closeBtn.addEventListener('click', closeLightbox);

            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) closeLightbox();
            });

            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                    closeLightbox();
                }
            });

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
                    this.loadSearchIndex();
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

            loadSearchIndex() {
                if (window.SEARCH_INDEX || document.getElementById('search-data-script')) return;
                const script = document.createElement('script');
                script.id = 'search-data-script';
                script.src = 'js/search-data.js';
                document.body.appendChild(script);
            },

            handleSearchInput(e) {
                const query = e.target.value.trim().toLowerCase();
                const suggestionsContainer = this.getSuggestionsContainer();

                if (query.length < 2) {
                    suggestionsContainer.style.display = 'none';
                    return;
                }

                // --- REDIRECT CHECK ---
                if (query.includes('petru comarnescu') || query.includes('comarnescu')) {
                    const results = [{
                        title: "Notificare Importantă",
                        content: "Căutați informații despre fosta Școală „Petru Comarnescu”? Acum suntem Școala Gimnazială „Principele Carol”.",
                        url: "#",
                        specialAction: "redirect"
                    }];
                    this.renderSuggestions(results, suggestionsContainer);
                    return;
                }

                const searchIndex = window.SEARCH_INDEX || [];

                const results = searchIndex.map(item => {
                    let score = 0;
                    const titleNorm = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const contentNorm = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const queryNorm = query.normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    if (titleNorm.includes(queryNorm)) score += 10;
                    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(queryNorm))) score += 5;
                    if (contentNorm.includes(queryNorm)) score += 1;

                    return { ...item, score };
                }).filter(item => item.score > 0).sort((a, b) => b.score - a.score).slice(0, 5);

                if (results.length > 0) {
                    this.renderSuggestions(results, suggestionsContainer);
                } else {
                    this.renderNoResults(query, suggestionsContainer);
                }
            },

            getSuggestionsContainer() {
                let container = document.getElementById('searchSuggestions');
                if (!container) {
                    container = document.createElement('div');
                    container.id = 'searchSuggestions';
                    this.searchContainer.appendChild(container);

                    if (!document.getElementById('suggestion-styles')) {
                        const style = document.createElement('style');
                        style.id = 'suggestion-styles';
                        style.textContent = `
                        #searchSuggestions { position: absolute; top: 100%; left: 0; width: 100%; background: white; border-radius: 0 0 10px 10px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); z-index: 1001; display: none; overflow: hidden; }
                        .suggestion-item { padding: 10px 15px; border-bottom: 1px solid #eee; cursor: pointer; transition: background 0.2s; text-align: left; }
                        .suggestion-item:hover { background: #f5f5f5; }
                        .suggestion-title { font-weight: 600; color: #1B264F; font-size: 0.95rem; margin-bottom: 3px; }
                        .no-results-message { padding: 15px; text-align: center; color: #666; font-size: 0.9rem; }
                    `;
                        document.head.appendChild(style);
                    }
                }
                return container;
            },

            renderSuggestions(results, container) {
                container.innerHTML = '';
                container.style.display = 'block';
                results.forEach(item => {
                    const div = document.createElement('div');
                    div.className = 'suggestion-item';
                    div.innerHTML = `<div class="suggestion-title">${item.title}</div><div style="font-size:0.8rem;color:#666;">${item.content.substring(0, 60)}...</div>`;
                    div.onclick = () => {
                        if (item.specialAction === 'redirect') this.showRedirectModal();
                        else window.location.href = item.url;
                        this.closeSearch();
                    };
                    container.appendChild(div);
                });
            },

            renderNoResults(query, container) {
                container.innerHTML = `<div class="no-results-message">Nu am găsit rezultate pentru "<strong>${query}</strong>".<br>Încercați să căutați o comisie sau numele unui profesor.</div>`;
                container.style.display = 'block';
            },

            processSearch() {
                const rawValue = this.searchInput.value.trim();
                if (!rawValue) return;

                const safeValue = rawValue.replace(/<[^>]*>?/gm, '');
                const lowerValue = safeValue.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                // --- 1. SPECIAL REDIRECT: Petru Comarnescu ---
                if (lowerValue.includes('petru comarnescu') || lowerValue.includes('comarnescu')) {
                    this.showRedirectModal();
                    this.closeSearch();
                    return;
                }

                // --- 2. INTERNAL SEARCH INDEX ---
                // Ensure index is loaded
                const searchIndex = window.SEARCH_INDEX || [];

                // Score and Filter results
                const results = searchIndex.map(item => {
                    let score = 0;
                    const titleNorm = item.title.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
                    const contentNorm = item.content.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

                    // Title Match (High Priority)
                    if (titleNorm.includes(lowerValue)) score += 10;

                    // Tags Match (Medium Priority)
                    if (item.tags && item.tags.some(tag => tag.toLowerCase().includes(lowerValue))) score += 5;

                    // Content Match (Low Priority)
                    if (contentNorm.includes(lowerValue)) score += 1;

                    return { ...item, score };
                }).filter(item => item.score > 0).sort((a, b) => b.score - a.score);

                if (results.length > 0) {
                    this.renderSearchResults(results, safeValue);
                    // Keep search open or show modal? A modal/overlay is better for results.
                    this.closeSearch(); // Close the small input
                } else {
                    // --- 3. FALLBACK: Google Search ---
                    window.open(`https://www.google.com/search?q=site:principelecarol.ro+${encodeURIComponent(safeValue)}`, '_blank');
                    this.closeSearch();
                }
            },

            showRedirectModal() {
                // Create a custom modal for the redirection message
                const modal = document.createElement('div');
                modal.style.cssText = `
                position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                background: rgba(10, 25, 47, 0.95); z-index: 10000;
                display: flex; justify-content: center; align-items: center;
                backdrop-filter: blur(5px); animation: fadeIn 0.3s ease;
            `;
                modal.innerHTML = `
                <div style="background: white; padding: 2rem; border-radius: 15px; border: 2px solid #D4A84B; text-align: center; max-width: 400px;">
                    <h3 style="color: #1B264F; margin-bottom: 1rem; font-family: 'Playfair Display', serif;">Notificare</h3>
                    <p style="margin-bottom: 1.5rem; color: #333;">Căutați informații despre fosta <strong>Școală „Petru Comarnescu”</strong>?<br>Acum suntem <strong>Școala Gimnazială „Principele Carol”</strong>.</p>
                    <button id="closeRedirectModal" style="background: #1B264F; color: white; border: none; padding: 10px 20px; border-radius: 5px; cursor: pointer; font-weight: bold;">Vezi site-ul actual</button>
                </div>
            `;
                document.body.appendChild(modal);
                document.getElementById('closeRedirectModal').onclick = () => modal.remove();
            },

            renderSearchResults(results, query) {
                // Remove existing results modal if any
                const existing = document.getElementById('searchResultsModal');
                if (existing) existing.remove();

                const modal = document.createElement('div');
                modal.id = 'searchResultsModal';
                modal.className = 'search-results-modal'; // We will add CSS for this class

                // Build Results HTML
                let resultsHTML = results.map(item => {
                    // Create Snippet
                    const contentLower = item.content.toLowerCase();
                    const queryLower = query.toLowerCase();
                    let snippet = item.content;
                    const idx = contentLower.indexOf(queryLower);
                    if (idx !== -1) {
                        const start = Math.max(0, idx - 30);
                        const end = Math.min(item.content.length, idx + query.length + 50);
                        snippet = '...' + item.content.substring(start, end) + '...';
                    } else {
                        snippet = item.content.substring(0, 100) + '...';
                    }

                    // Highlight keyword
                    const regex = new RegExp(`(${query})`, 'gi');
                    snippet = snippet.replace(regex, '<mark class="highlight">$1</mark>');

                    return `
                    <div class="result-item" onclick="window.location.href='${item.url}'">
                        <h4 class="result-title">${item.title}</h4>
                        <p class="result-snippet">${snippet}</p>
                        ${item.type === 'pdf' || item.type === 'document' ? '<span class="result-badge">Document</span>' : ''}
                    </div>
                `;
                }).join('');

                modal.innerHTML = `
                <div class="results-container">
                    <div class="results-header">
                        <h3>Rezultate pentru: "${query}"</h3>
                        <button class="close-results">&times;</button>
                    </div>
                    <div class="results-list">
                        ${resultsHTML}
                    </div>
                </div>
            `;

                document.body.appendChild(modal);

                // Add styles dynamically if not present
                if (!document.getElementById('search-styles')) {
                    const style = document.createElement('style');
                    style.id = 'search-styles';
                    style.innerHTML = `
                    .search-results-modal {
                        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
                        background: rgba(0,0,0,0.8); z-index: 9999;
                        display: flex; justify-content: center; align-items: flex-start;
                        padding-top: 100px; backdrop-filter: blur(5px);
                    }
                    .results-container {
                        background: white; width: 90%; max-width: 600px;
                        border-radius: 10px; overflow: hidden;
                        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
                        animation: slideDown 0.3s ease;
                        max-height: 80vh; display: flex; flex-direction: column;
                    }
                    .results-header {
                        padding: 15px 20px; background: #1B264F; color: #D4A84B;
                        display: flex; justify-content: space-between; align-items: center;
                    }
                    .results-header h3 { margin: 0; font-family: 'Playfair Display', serif; }
                    .close-results { background: none; border: none; color: white; font-size: 2rem; cursor: pointer; }
                    .results-list { padding: 20px; overflow-y: auto; }
                    .result-item {
                        padding: 15px; border-bottom: 1px solid #eee; cursor: pointer;
                        transition: background 0.2s; position: relative;
                    }
                    .result-item:hover { background: #f9f9f9; }
                    .result-title { margin: 0 0 5px 0; color: #1B264F; font-size: 1.1rem; }
                    .result-snippet { margin: 0; font-size: 0.9rem; color: #666; line-height: 1.4; }
                    .highlight { background: #fff3cd; color: #333; padding: 0 2px; }
                    .result-badge {
                        position: absolute; top: 15px; right: 15px;
                        background: #eee; font-size: 0.7rem; padding: 2px 6px; border-radius: 4px;
                    }
                    @keyframes slideDown { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
                `;
                    document.head.appendChild(style);
                }

                // Close Logic
                modal.querySelector('.close-results').onclick = () => modal.remove();
                modal.onclick = (e) => {
                    if (e.target === modal) modal.remove();
                }
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
