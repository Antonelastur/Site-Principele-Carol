/* Școala Gimnazială „Principele Carol" — interacțiuni de bază (vanilla JS) */
(function () {
    'use strict';

    /* Consimțământ cookie-uri și resurse externe (fonturi Google) */
    var CONSENT_KEY = 'spc-consimtamant';
    function loadFonts() {
        if (document.getElementById('spc-fonts')) return;
        var pre1 = document.createElement('link'); pre1.rel = 'preconnect'; pre1.href = 'https://fonts.googleapis.com';
        var pre2 = document.createElement('link'); pre2.rel = 'preconnect'; pre2.href = 'https://fonts.gstatic.com'; pre2.crossOrigin = '';
        var css = document.createElement('link'); css.id = 'spc-fonts'; css.rel = 'stylesheet';
        css.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;800&family=Playfair+Display:wght@500;600;700;800&display=swap';
        document.head.appendChild(pre1); document.head.appendChild(pre2); document.head.appendChild(css);
    }
    var consent = null;
    try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}
    if (consent === 'accept') {
        loadFonts();
    } else if (consent !== 'refuz') {
        var banner = document.createElement('div');
        banner.className = 'cookie-banner';
        banner.setAttribute('role', 'dialog');
        banner.setAttribute('aria-label', 'Consimțământ cookie-uri');
        banner.innerHTML = '<p><strong>Confidențialitate.</strong> Acest site nu folosește cookie-uri de urmărire sau de analiză. ' +
            'Singurele resurse externe sunt fonturile decorative Google, încărcate doar cu acordul tău. ' +
            'Alegerea se reține pe acest dispozitiv. <a href="documente.html#gdpr">Detalii (GDPR)</a></p>' +
            '<div class="cookie-actions">' +
            '<button class="btn btn-gold" data-consent="accept">Accept</button>' +
            '<button class="btn btn-outline" data-consent="refuz">Refuz</button>' +
            '</div>';
        document.body.appendChild(banner);
        banner.addEventListener('click', function (e) {
            var choice = e.target.getAttribute && e.target.getAttribute('data-consent');
            if (!choice) return;
            try { localStorage.setItem(CONSENT_KEY, choice); } catch (err) {}
            if (choice === 'accept') loadFonts();
            banner.remove();
        });
    }

    /* Header: umbră la scroll */
    var header = document.querySelector('.site-header');
    if (header) {
        window.addEventListener('scroll', function () {
            header.classList.toggle('scrolled', window.scrollY > 10);
        }, { passive: true });
    }

    /* Meniu mobil (hamburger) */
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.main-nav');
    if (toggle && nav) {
        toggle.addEventListener('click', function () {
            var open = nav.classList.toggle('open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
    }

    /* Dropdown pe mobil: prima atingere deschide submeniul */
    document.querySelectorAll('.nav-item.has-sub > .nav-link').forEach(function (link) {
        link.addEventListener('click', function (e) {
            if (window.innerWidth < 992) {
                var item = link.parentElement;
                if (!item.classList.contains('open')) {
                    e.preventDefault();
                    document.querySelectorAll('.nav-item.open').forEach(function (o) {
                        if (o !== item) o.classList.remove('open');
                    });
                    item.classList.add('open');
                }
            }
        });
    });

    /* Scroll reveal */
    if ('IntersectionObserver' in window) {
        var io = new IntersectionObserver(function (entries) {
            entries.forEach(function (en) {
                if (en.isIntersecting) {
                    en.target.classList.add('visible');
                    io.unobserve(en.target);
                }
            });
        }, { threshold: 0.12 });
        document.querySelectorAll('.reveal').forEach(function (el) { io.observe(el); });
    } else {
        document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }

    /* Ticker: se alimentează automat din noutati.html; textele din HTML rămân rezervă */
    var tickerContent = document.querySelector('.ticker-content');
    if (tickerContent) {
        var setSpeed = function () {
            var half = tickerContent.scrollWidth / 2;
            if (half > 0) tickerContent.style.setProperty('--ticker-dur', (half / 22) + 's');
        };
        var startTicker = function () {
            tickerContent.innerHTML += tickerContent.innerHTML; /* buclă continuă */
            setSpeed();
        };
        window.addEventListener('resize', setSpeed);

        fetch('noutati.html')
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
            .then(function (html) {
                var doc = new DOMParser().parseFromString(html, 'text/html');
                var items = [];
                doc.querySelectorAll('.news-card').forEach(function (card) {
                    var titlu = card.querySelector('h3');
                    var data = card.querySelector('.news-date');
                    if (titlu) {
                        items.push(titlu.textContent.trim() + (data ? ' (' + data.textContent.trim() + ')' : ''));
                    }
                });
                if (items.length) {
                    tickerContent.innerHTML = items.slice(0, 6).map(function (x) {
                        var s = document.createElement('span');
                        s.textContent = x;
                        return s.outerHTML;
                    }).join('');
                }
            })
            .catch(function () { /* rezervă: textele statice din HTML */ })
            .finally(startTicker);
    }

    /* Lightbox pentru galerie */
    var items = Array.prototype.slice.call(document.querySelectorAll('.gallery-item'));
    if (items.length) {
        var lb = document.createElement('div');
        lb.className = 'lightbox';
        lb.setAttribute('role', 'dialog');
        lb.setAttribute('aria-label', 'Vizualizare imagine');
        lb.innerHTML = '<button class="lightbox-close" aria-label="Închide">×</button>' +
            '<button class="lightbox-prev" aria-label="Imaginea anterioară">❮</button>' +
            '<img src="" alt="">' +
            '<button class="lightbox-next" aria-label="Imaginea următoare">❯</button>' +
            '<p class="lightbox-caption"></p>';
        document.body.appendChild(lb);
        var lbImg = lb.querySelector('img');
        var lbCap = lb.querySelector('.lightbox-caption');
        var current = 0;

        function show(i) {
            current = (i + items.length) % items.length;
            var img = items[current].querySelector('img');
            var cap = items[current].querySelector('figcaption');
            lbImg.src = img.currentSrc || img.src;
            lbImg.alt = img.alt || '';
            lbCap.textContent = cap ? cap.textContent : (img.alt || '');
            lb.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
        function close() {
            lb.classList.remove('open');
            document.body.style.overflow = '';
        }
        items.forEach(function (it, i) {
            it.addEventListener('click', function () { show(i); });
        });
        lb.querySelector('.lightbox-close').addEventListener('click', close);
        lb.querySelector('.lightbox-prev').addEventListener('click', function () { show(current - 1); });
        lb.querySelector('.lightbox-next').addEventListener('click', function () { show(current + 1); });
        lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
        document.addEventListener('keydown', function (e) {
            if (!lb.classList.contains('open')) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') show(current - 1);
            if (e.key === 'ArrowRight') show(current + 1);
        });
    }

    /* Carusele galerie: derulare automată lentă; clic = oprire definitivă */
    document.querySelectorAll('[data-carousel]').forEach(function (car) {
        var track = car.querySelector('.car-track');
        if (!track) return;
        var paused = false, hovering = false;

        function step() {
            var slide = track.querySelector('.car-slide');
            if (!slide) return 0;
            return slide.getBoundingClientRect().width + 16;
        }
        function next() {
            var max = track.scrollWidth - track.clientWidth;
            if (max <= 0) return;
            if (track.scrollLeft >= max - 4) track.scrollTo({ left: 0 });
            else track.scrollBy({ left: step() });
        }
        function prev() { track.scrollBy({ left: -step() }); }

        car.querySelector('.car-next').addEventListener('click', function (e) { e.stopPropagation(); paused = true; next(); });
        car.querySelector('.car-prev').addEventListener('click', function (e) { e.stopPropagation(); paused = true; prev(); });
        /* clic pe o fotografie: oprește derularea (și deschide vizualizarea mare) */
        track.addEventListener('click', function () { paused = true; });
        car.addEventListener('mouseenter', function () { hovering = true; });
        car.addEventListener('mouseleave', function () { hovering = false; });

        setInterval(function () {
            if (!paused && !hovering && document.visibilityState === 'visible') next();
        }, 3500);
    });

    /* Filtre galerie (butoane cu data-filter) */
    var filterBtns = document.querySelectorAll('[data-filter]');
    if (filterBtns.length) {
        filterBtns.forEach(function (btn) {
            btn.addEventListener('click', function () {
                filterBtns.forEach(function (b) { b.classList.remove('btn-gold'); b.classList.add('btn-navy'); });
                btn.classList.add('btn-gold'); btn.classList.remove('btn-navy');
                var f = btn.getAttribute('data-filter');
                document.querySelectorAll('.gallery-item[data-cat]').forEach(function (el) {
                    el.style.display = (f === 'all' || el.getAttribute('data-cat') === f) ? '' : 'none';
                });
            });
        });
    }
})();
