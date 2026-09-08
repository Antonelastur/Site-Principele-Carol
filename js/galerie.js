/* Galerie — arhiva vizuală a școlii.
   Tot conținutul vine din data/galerie.json; paginile nu se rescriu la adăugarea unui album. */
(function () {
    'use strict';

    var LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
        'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];
    var PE_PAGINA = 24;

    var esc = function (s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    };
    var q = new URLSearchParams(location.search);
    var vedeCiorne = q.get('ciorne') === '1';

    /* Ordinea firească a claselor în listă: pregătitoare, I, a II-a ... a VIII-a */
    var ROMANE = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII'];
    function rangClasa(nume) {
        var s = nume.toLowerCase();
        if (s.indexOf('preg') >= 0) return 0;
        var m = s.match(/\b(a\s+)?([ivx]+)(-a)?\b/);
        var i = m ? ROMANE.indexOf(m[2].toUpperCase()) : -1;
        return i < 0 ? 99 : i + 1;
    }

    /* Cheia de sortare: data activității; fără dată, sfârșitul anului școlar. */
    function cheie(a) { return a.data || (a.anScolar.split('-')[1] + '-06-30'); }

    function dataText(a) {
        if (!a.data) return 'Anul școlar ' + a.anScolar.replace('-', '–');
        var p = a.data.split('-');
        return Number(p[2]) + ' ' + LUNI[Number(p[1]) - 1] + ' ' + p[0];
    }

    function textCautare(a, numeCat) {
        return [a.titlu, a.descriere, numeCat, a.anScolar, (a.clase || []).join(' '),
            (a.etichete || []).join(' ')].join(' ').toLowerCase();
    }

    function incarca() {
        return fetch('data/galerie.json', { cache: 'no-cache' }).then(function (r) {
            if (!r.ok) throw new Error(r.status);
            return r.json();
        });
    }

    function eroare(el) {
        el.innerHTML = '<div class="gal-eroare"><p>Galeria nu a putut fi încărcată acum. ' +
            'Reîncarcă pagina sau revino puțin mai târziu.</p></div>';
    }

    /* =====================  PAGINA GALERIE  ===================== */

    function pornesteIndex(root) {
        incarca().then(function (d) { randeaza(root, d); }).catch(function () { eroare(root); });
    }

    function randeaza(root, d) {
        var numeCat = {};
        d.categorii.forEach(function (c) { numeCat[c.id] = c.nume; });

        var albume = d.albume
            .filter(function (a) { return a.publicat !== false || vedeCiorne; })
            .sort(function (x, y) { return cheie(y).localeCompare(cheie(x)); });
        albume.forEach(function (a) { a._cauta = textCautare(a, numeCat[a.categorie] || ''); });

        var f = {
            an: q.get('an') || d.anCurent,
            cat: q.get('cat') || '',
            luna: q.get('luna') || '',
            clasa: q.get('clasa') || '',
            text: q.get('q') || ''
        };
        var limita = PE_PAGINA;
        /* dacă vizitatorul nu a ales el anul, căutarea în text se face peste toată arhiva */
        var anAles = q.has('an');

        root.innerHTML =
            '<div class="gal-tools">' +
              '<div class="gal-tools-row">' +
                '<label class="gal-search">' +
                  '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></svg>' +
                  '<input type="search" id="gal-q" placeholder="Caută în galerie..." aria-label="Caută în galerie" value="' + esc(f.text) + '">' +
                '</label>' +
                '<select class="gal-select" id="gal-an" aria-label="Anul școlar">' +
                  '<option value="toti">Toți anii școlari</option>' +
                  d.aniScolari.map(function (an) {
                      return '<option value="' + esc(an) + '">' + esc(an.replace('-', '–')) +
                          (an === d.anCurent ? ' (an curent)' : '') + '</option>';
                  }).join('') +
                '</select>' +
                '<select class="gal-select" id="gal-luna" aria-label="Luna">' +
                  '<option value="">Toate lunile</option>' +
                  LUNI.map(function (l, i) {
                      var v = ('0' + (i + 1)).slice(-2);
                      return '<option value="' + v + '">' + l.charAt(0).toUpperCase() + l.slice(1) + '</option>';
                  }).join('') +
                '</select>' +
                '<select class="gal-select" id="gal-clasa" aria-label="Clasa" hidden></select>' +
                '<button type="button" class="gal-reset" id="gal-reset" hidden>Șterge filtrele</button>' +
              '</div>' +
              '<div class="gal-chips" id="gal-chips" role="group" aria-label="Categorii"></div>' +
            '</div>' +
            '<section class="gal-sec" id="sec-recente" hidden>' +
              '<div class="gal-sec-head"><h2>Din acest an <span class="gold-text">școlar</span></h2></div>' +
              '<div class="gal-rule"></div><div class="gal-grid" id="grid-recente"></div>' +
            '</section>' +
            '<section class="gal-sec" id="sec-categorii" hidden>' +
              '<div class="gal-sec-head"><h2>Descoperă activitățile <span class="gold-text">noastre</span></h2></div>' +
              '<div class="gal-rule"></div><div class="gal-cat-grid" id="grid-categorii"></div>' +
            '</section>' +
            '<section class="gal-sec">' +
              '<div class="gal-sec-head"><h2 id="titlu-toate">Toate momentele</h2><span class="gal-count" id="gal-count"></span></div>' +
              '<div class="gal-rule"></div><div class="gal-grid" id="grid-toate"></div>' +
              '<div class="gal-more" id="gal-more"></div>' +
            '</section>';

        var elQ = document.getElementById('gal-q');
        var elAn = document.getElementById('gal-an');
        var elLuna = document.getElementById('gal-luna');
        var elClasa = document.getElementById('gal-clasa');
        var elChips = document.getElementById('gal-chips');
        var elReset = document.getElementById('gal-reset');

        function card(a) {
            return '<a class="gal-card' + (a.publicat === false ? ' gal-draft' : '') +
                '" href="album.html?a=' + encodeURIComponent(a.id) + '">' +
                '<div class="gal-card-img">' +
                  '<img src="' + esc(a.coperta) + '" alt="" loading="lazy" decoding="async">' +
                  '<span class="gal-card-cat">' + esc(numeCat[a.categorie] || a.categorie) + '</span>' +
                  ((a.video || []).length ? '<span class="gal-card-n">Foto + video</span>' : '') +
                '</div>' +
                '<div class="gal-card-body">' +
                  '<p class="gal-card-meta">' + esc(dataText(a)) + '</p>' +
                  '<h3>' + esc(a.titlu) + (a.publicat === false ? ' <em>(ciornă)</em>' : '') + '</h3>' +
                  '<p class="gal-card-desc">' + esc(a.descriere || '') + '</p>' +
                '</div></a>';
        }

        function potrivite() {
            var t = f.text.trim().toLowerCase();
            return albume.filter(function (a) {
                if (f.an !== 'toti' && a.anScolar !== f.an) return false;
                if (f.cat && a.categorie !== f.cat) return false;
                if (f.luna && (!a.data || a.data.split('-')[1] !== f.luna)) return false;
                if (f.clasa && (a.clase || []).indexOf(f.clasa) < 0) return false;
                if (t && a._cauta.indexOf(t) < 0) return false;
                return true;
            });
        }

        function filtruActiv() {
            return !!(f.cat || f.luna || f.clasa || f.text.trim() || f.an !== d.anCurent);
        }

        function scrieURL() {
            var p = new URLSearchParams();
            if (f.an !== d.anCurent) p.set('an', f.an);
            if (f.cat) p.set('cat', f.cat);
            if (f.luna) p.set('luna', f.luna);
            if (f.clasa) p.set('clasa', f.clasa);
            if (f.text.trim()) p.set('q', f.text.trim());
            if (vedeCiorne) p.set('ciorne', '1');
            var s = p.toString();
            history.replaceState(null, '', s ? '?' + s : location.pathname);
        }

        function deseneaza() {
            /* chips de categorii, cu numărul de albume din anul selectat */
            var inAn = albume.filter(function (a) { return f.an === 'toti' || a.anScolar === f.an; });
            var nr = {};
            inAn.forEach(function (a) { nr[a.categorie] = (nr[a.categorie] || 0) + 1; });
            elChips.innerHTML = '<button type="button" class="gal-chip" data-cat="" aria-pressed="' +
                (f.cat ? 'false' : 'true') + '">Toate<span class="gal-chip-n">' + inAn.length + '</span></button>' +
                d.categorii.map(function (c) {
                    if (!nr[c.id] && f.cat !== c.id) return '';
                    return '<button type="button" class="gal-chip" data-cat="' + esc(c.id) + '" aria-pressed="' +
                        (f.cat === c.id ? 'true' : 'false') + '">' + esc(c.nume) +
                        '<span class="gal-chip-n">' + (nr[c.id] || 0) + '</span></button>';
                }).join('');

            /* lista de clase se reface pentru anul selectat */
            var clase = [];
            inAn.forEach(function (a) {
                (a.clase || []).forEach(function (c) { if (clase.indexOf(c) < 0) clase.push(c); });
            });
            clase.sort(function (x, y) { return rangClasa(x) - rangClasa(y) || x.localeCompare(y, 'ro'); });
            if (f.clasa && clase.indexOf(f.clasa) < 0) f.clasa = '';
            elClasa.hidden = !clase.length;
            elClasa.innerHTML = '<option value="">Toate clasele</option>' +
                clase.map(function (c) { return '<option value="' + esc(c) + '">' + esc(c) + '</option>'; }).join('');
            elClasa.value = f.clasa;

            var rez = potrivite();
            var activ = filtruActiv();
            /* filtre de conținut: doar ele transformă pagina într-o listă de rezultate */
            var filtre = !!(f.cat || f.luna || f.clasa || f.text.trim());
            var anLarg = f.an === d.anCurent || f.an === 'toti';

            /* Din acest an școlar — doar când chiar aduce ceva peste lista de mai jos */
            var secR = document.getElementById('sec-recente');
            var recente = albume.filter(function (a) { return a.anScolar === d.anCurent; }).slice(0, 6);
            secR.hidden = filtre || !anLarg || recente.length < 3 ||
                (f.an === d.anCurent && rez.length <= recente.length);
            if (!secR.hidden) document.getElementById('grid-recente').innerHTML = recente.map(card).join('');

            /* Descoperă activitățile noastre — o dală pe categorie, din tot arhivul */
            var secC = document.getElementById('sec-categorii');
            secC.hidden = filtre || !anLarg;
            if (!secC.hidden) {
                var primul = {}, cate = {};
                albume.forEach(function (a) {
                    if (!primul[a.categorie]) primul[a.categorie] = a;
                    cate[a.categorie] = (cate[a.categorie] || 0) + 1;
                });
                document.getElementById('grid-categorii').innerHTML = d.categorii.filter(function (c) {
                    return primul[c.id];
                }).map(function (c) {
                    return '<a class="gal-cat-tile" href="?cat=' + encodeURIComponent(c.id) + '&an=toti">' +
                        '<img src="' + esc(primul[c.id].coperta) + '" alt="" loading="lazy" decoding="async">' +
                        '<span>' + esc(c.nume) + '<small>' + cate[c.id] +
                        (cate[c.id] === 1 ? ' album' : ' albume') + '</small></span></a>';
                }).join('');
            }

            /* Toate momentele */
            document.getElementById('titlu-toate').textContent = filtre ? 'Rezultate' : 'Toate momentele';
            document.getElementById('gal-count').textContent = rez.length +
                (rez.length === 1 ? ' album' : ' albume') +
                (f.an === 'toti' ? ', toți anii școlari' : ', anul școlar ' + f.an.replace('-', '–'));
            var grid = document.getElementById('grid-toate');
            if (!rez.length) {
                grid.innerHTML = '';
                grid.insertAdjacentHTML('beforeend', '<div class="gal-empty" style="grid-column:1/-1">' +
                    '<p>Nu am găsit albume pentru filtrele alese.</p></div>');
            } else {
                grid.innerHTML = rez.slice(0, limita).map(card).join('');
            }
            var more = document.getElementById('gal-more');
            if (rez.length > limita) {
                more.innerHTML = '<button type="button" class="btn btn-navy" id="gal-more-btn">Arată mai multe albume</button>';
                document.getElementById('gal-more-btn').addEventListener('click', function () {
                    limita += PE_PAGINA; deseneaza();
                });
            } else if (f.an === d.anCurent && !f.cat && !f.luna && !f.clasa && !f.text.trim() &&
                       albume.some(function (a) { return a.anScolar !== d.anCurent; })) {
                more.innerHTML = '<button type="button" class="btn btn-navy" id="gal-arhiva">Vezi și arhiva anilor anteriori</button>';
                document.getElementById('gal-arhiva').addEventListener('click', function () {
                    f.an = 'toti'; elAn.value = 'toti'; limita = PE_PAGINA; scrieURL(); deseneaza();
                });
            } else {
                more.innerHTML = '';
            }

            elReset.hidden = !activ;
        }

        function schimba() { limita = PE_PAGINA; scrieURL(); deseneaza(); }

        elAn.value = f.an;
        elLuna.value = f.luna;
        elAn.addEventListener('change', function () { f.an = this.value; anAles = true; schimba(); });
        elLuna.addEventListener('change', function () { f.luna = this.value; schimba(); });
        elClasa.addEventListener('change', function () { f.clasa = this.value; schimba(); });
        var tOut;
        elQ.addEventListener('input', function () {
            var v = this.value;
            clearTimeout(tOut);
            tOut = setTimeout(function () {
                f.text = v;
                /* căutarea are sens peste toată arhiva, nu doar în anul curent */
                if (v.trim() && !anAles && f.an !== 'toti') { f.an = 'toti'; elAn.value = 'toti'; }
                schimba();
            }, 180);
        });
        elChips.addEventListener('click', function (e) {
            var b = e.target.closest('.gal-chip');
            if (!b) return;
            f.cat = b.getAttribute('data-cat');
            schimba();
        });
        elReset.addEventListener('click', function () {
            f.an = d.anCurent; f.cat = ''; f.luna = ''; f.clasa = ''; f.text = '';
            anAles = false;
            elQ.value = ''; elAn.value = f.an; elLuna.value = '';
            schimba();
        });

        deseneaza();
    }

    /* =====================  PAGINA UNUI ALBUM  ===================== */

    function pornesteAlbum(root) {
        incarca().then(function (d) {
            var id = q.get('a');
            var a = d.albume.filter(function (x) { return x.id === id; })[0];
            if (!a || (a.publicat === false && !vedeCiorne)) {
                root.innerHTML = '<div class="gal-empty"><p>Albumul căutat nu există sau nu este publicat.</p>' +
                    '<p><a class="btn btn-navy" href="galerie.html">Înapoi la galerie</a></p></div>';
                return;
            }
            var numeCat = {};
            d.categorii.forEach(function (c) { numeCat[c.id] = c.nume; });
            randeazaAlbum(root, a, numeCat[a.categorie] || a.categorie);
        }).catch(function () { eroare(root); });
    }

    function poza(p) {
        return '<figure class="gallery-item">' +
            '<img src="' + esc(p.mic || p.src) + '" data-full="' + esc(p.src) + '" alt="' + esc(p.alt || '') +
            '" loading="lazy" decoding="async"' +
            (p.w && p.h ? ' width="' + p.w + '" height="' + p.h + '"' : '') + '>' +
            (p.titlu ? '<figcaption>' + esc(p.titlu) + '</figcaption>' : '') +
            '</figure>';
    }

    function randeazaAlbum(root, a, catNume) {
        document.title = a.titlu + ' | Galerie | Școala Gimnazială „Principele Carol”';
        var h1 = document.querySelector('.page-hero h1');
        if (h1) h1.textContent = a.titlu;
        var bc = document.querySelector('.breadcrumb [aria-current]');
        if (bc) bc.textContent = a.titlu;

        var meta = document.getElementById('alb-meta');
        if (meta) {
            meta.innerHTML =
                '<span class="badge">' + esc(catNume) + '</span>' +
                (a.data ? '<span class="badge">' + esc(dataText(a)) + '</span>' : '') +
                '<span class="badge">Anul școlar ' + esc(a.anScolar.replace('-', '–')) + '</span>';
            var lead = document.querySelector('.page-hero .lead');
            if (lead && a.descriere) lead.textContent = a.descriere;
        }

        var html = '';
        if (a.grupuri && a.grupuri.length) {
            a.grupuri.forEach(function (g) {
                var poze = a.foto.filter(function (p) { return p.grup === g.id; });
                if (!poze.length) return;
                html += '<section class="alb-group"><div class="alb-group-head"><h2>' + esc(g.nume) + '</h2>' +
                    (g.subtitlu ? '<span>' + esc(g.subtitlu) + '</span>' : '') + '</div>' +
                    '<div class="gallery-grid">' + poze.map(poza).join('') + '</div></section>';
            });
            var fara = a.foto.filter(function (p) {
                return !p.grup || !a.grupuri.some(function (g) { return g.id === p.grup; });
            });
            if (fara.length) html += '<div class="gallery-grid">' + fara.map(poza).join('') + '</div>';
        } else {
            html = '<div class="gallery-grid">' + a.foto.map(poza).join('') + '</div>';
        }

        if ((a.video || []).length) {
            html += '<section class="alb-group"><div class="alb-group-head"><h2>Video</h2></div>' +
                '<div class="alb-video-grid">' + a.video.map(function (v) {
                    return '<a class="btn btn-navy" href="' + esc(v.url) + '" target="_blank" rel="noopener">' +
                        esc(v.titlu || 'Vezi materialul video') + '</a>';
                }).join('') + '</div></section>';
        }

        if ((a.etichete || []).length) {
            html += '<p class="alb-etichete">Etichete: ' + esc(a.etichete.join(', ')) + '</p>';
        }
        html += '<div class="alb-nav"><a class="btn btn-navy" href="galerie.html">← Toate albumele</a>' +
            '<a class="btn btn-navy" href="galerie.html?an=' + encodeURIComponent(a.anScolar) +
            '">Albumele anului ' + esc(a.anScolar.replace('-', '–')) + '</a></div>';

        root.innerHTML = html;
    }

    /* =====================  Pornire  ===================== */
    var index = document.getElementById('galerie-app');
    if (index) pornesteIndex(index);
    var album = document.getElementById('album-app');
    if (album) pornesteAlbum(album);
})();
