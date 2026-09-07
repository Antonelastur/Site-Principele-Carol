/* Noutăți — știrile școlii.
   Tot conținutul vine din data/noutati.json; paginile nu se rescriu la publicarea unei știri.
   Alimentează: noutati.html, arhiva-stiri.html, stire.html și cardurile de pe index.html. */
(function () {
    'use strict';

    var LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
        'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

    var esc = function (s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    };

    var q = new URLSearchParams(location.search);
    var vedeCiorne = q.get('ciorne') === '1';

    function dataText(s) {
        if (s.dataText) return s.dataText;
        if (!s.data) return '';
        var p = String(s.data).split('-');
        if (p.length < 3) return s.data;
        return Number(p[2]) + ' ' + LUNI[Number(p[1]) - 1] + ' ' + p[0];
    }

    /* Text scris simplu, în admin: rând gol = paragraf nou, „## ” = subtitlu,
       „- ” = listă, „![text](poza.jpg)” = imagine, **îngroșat**, [text](link). */
    function inline(t) {
        return esc(t)
            .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
            .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, function (_, text, url) {
                var extern = /^https?:/i.test(url);
                return '<a href="' + url + '"' +
                    (extern ? ' target="_blank" rel="noopener"' : '') + '>' + text + '</a>';
            });
    }

    function bogat(text, clasaPrim) {
        if (!text) return '';
        var out = [], prim = true;
        String(text).split(/\n\s*\n/).forEach(function (bloc) {
            var randuri = bloc.split('\n').map(function (r) { return r.trim(); }).filter(Boolean);
            if (!randuri.length) return;
            if (randuri.every(function (r) { return r.indexOf('- ') === 0; })) {
                out.push('<ul>' + randuri.map(function (r) {
                    return '<li>' + inline(r.slice(2)) + '</li>';
                }).join('') + '</ul>');
                return;
            }
            randuri.forEach(function (r) {
                var img = r.match(/^!\[([^\]]*)\]\(([^)\s]+)\)$/);
                if (img) {
                    out.push('<img class="article-hero-img" src="' + esc(img[2]) +
                        '" alt="' + esc(img[1]) + '" loading="lazy">');
                } else if (r.indexOf('## ') === 0) {
                    out.push('<h2>' + inline(r.slice(3)) + '</h2>');
                } else {
                    var cls = (prim && clasaPrim) ? ' class="' + clasaPrim + '"' : '';
                    out.push('<p' + cls + '>' + inline(r) + '</p>');
                    prim = false;
                }
            });
        });
        return out.join('\n');
    }

    function tinta(s) {
        if (s.link) return s.link;
        if (s.corp) return 'stire.html?id=' + encodeURIComponent(s.id);
        return '';
    }

    function sursaHtml(s) {
        if (!s.sursa || !s.sursa.text) return '';
        return '<p class="card-sursa">Sursa: ' + esc(s.sursa.text) +
            (s.sursa.url ? ' <a href="' + esc(s.sursa.url) + '" target="_blank" rel="noopener">' +
                esc(s.sursa.urlText || s.sursa.url) + '</a>' : '') + '</p>';
    }

    /* Pe prima pagină cardurile stau scurte: doar primul paragraf, fără liste și fără sursă. */
    function primulParagraf(text) {
        var blocuri = String(text || '').split(/\n\s*\n/).filter(function (b) {
            return b.trim() && b.trim().indexOf('- ') !== 0;
        });
        return blocuri.length ? blocuri[0] : '';
    }

    function card(s, clase) {
        var acasa = (clase || '').indexOf('home-card') >= 0;
        var url = tinta(s);
        var titlu = url
            ? '<a href="' + esc(url) + '">' + esc(s.titlu) + '</a>'
            : esc(s.titlu);
        var h = '<article class="card news-card ' + (clase || '') + ' reveal"' +
            (s.id ? ' id="' + esc(s.id) + '"' : '') + '>';
        if (s.imagine) {
            h += '<img src="' + esc(s.imagine) + '" alt="' + esc(s.imagineAlt || s.titlu) +
                '" loading="lazy">';
        }
        h += '<div class="card-body">';
        if (s.publicat === false) h += '<span class="badge-educatie">Ciornă</span>';
        if (s.dinEducatie) h += '<span class="badge-educatie">Din educație</span>';
        h += '<span class="news-date">' + esc(dataText(s)) + '</span>';
        h += '<h3>' + titlu + '</h3>';
        h += bogat(acasa ? primulParagraf(s.rezumat) : s.rezumat);
        if (!acasa) h += sursaHtml(s);
        if (url) {
            h += '<p class="news-mai-mult"><a href="' + esc(url) + '">' +
                esc(s.linkText || 'Citește articolul →') + '</a></p>';
        }
        return h + '</div></article>';
    }

    function incarca() {
        return fetch('data/noutati.json', { cache: 'no-cache' }).then(function (r) {
            if (!r.ok) throw new Error(r.status);
            return r.json();
        });
    }

    function eroare(el, ce) {
        el.innerHTML = '<p class="gal-eroare">' + ce + ' nu au putut fi încărcate acum. ' +
            'Reîncarcă pagina sau revino puțin mai târziu.</p>';
    }

    function vizibile(d) {
        return (d.stiri || []).filter(function (s) {
            return vedeCiorne || s.publicat !== false;
        }).sort(function (a, b) {
            return String(b.data || '').localeCompare(String(a.data || ''));
        });
    }

    function reveleaza(root) {
        root.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('visible'); });
    }

    /* =====================  PAGINA NOUTĂȚI  ===================== */

    function pornesteLista(root) {
        incarca().then(function (d) {
            var st = vizibile(d).filter(function (s) { return !s.arhivat; });
            root.innerHTML = st.length
                ? '<div class="grid grid-3">' + st.map(function (s) { return card(s); }).join('') + '</div>'
                : '<p class="section-sub">Nu sunt știri publicate momentan.</p>';
            reveleaza(root);
        }).catch(function () { eroare(root, 'Noutățile'); });
    }

    /* =====================  ARHIVA  ===================== */

    function pornesteArhiva(root) {
        incarca().then(function (d) {
            var st = vizibile(d).filter(function (s) { return s.arhivat; });
            var ani = [];
            st.forEach(function (s) {
                var an = s.anScolar || '—';
                if (ani.indexOf(an) < 0) ani.push(an);
            });
            ani.sort().reverse();
            root.innerHTML = ani.length ? ani.map(function (an) {
                return '<h2 class="section-title">Anul școlar <span class="gold-text">' +
                    esc(an) + '</span></h2>' +
                    '<p class="section-sub">Știri încheiate, păstrate pentru consultare.</p>' +
                    '<div class="grid grid-3" style="margin-top:26px; margin-bottom:44px;">' +
                    st.filter(function (s) { return (s.anScolar || '—') === an; })
                        .map(function (s) { return card(s); }).join('') +
                    '</div>';
            }).join('') : '<p class="section-sub">Arhiva este momentan goală.</p>';
            reveleaza(root);
        }).catch(function () { eroare(root, 'Știrile din arhivă'); });
    }

    /* =====================  ARTICOL  ===================== */

    function pornesteArticol(root) {
        var id = q.get('id');
        incarca().then(function (d) {
            var s = (d.stiri || []).filter(function (x) { return x.id === id; })[0];
            if (!s || (s.publicat === false && !vedeCiorne)) {
                root.innerHTML = '<p class="gal-eroare">Știrea căutată nu există sau a fost retrasă.</p>' +
                    '<p style="margin-top:2em;"><a class="btn btn-navy" href="noutati.html">← Înapoi la noutăți</a></p>';
                return;
            }
            if (s.link && !s.corp) { location.replace(s.link); return; }
            document.title = s.titlu + ' | Școala Gimnazială „Principele Carol”';
            var meta = document.querySelector('meta[name="description"]');
            if (meta) meta.setAttribute('content', String(s.rezumat || '').split('\n')[0].slice(0, 300));
            var h1 = document.querySelector('.page-hero h1');
            if (h1) h1.textContent = s.titlu;
            var bc = document.querySelector('.breadcrumb li[aria-current]');
            if (bc) bc.textContent = s.titlu;

            var h = '<p class="news-date" style="margin-top:26px;">' + esc(dataText(s)) +
                (s.context ? ' · ' + esc(s.context) : '') + '</p>';
            if (s.imagine) {
                h += '<img class="article-hero-img" src="' + esc(s.imagine) +
                    '" alt="' + esc(s.imagineAlt || s.titlu) + '">';
            }
            h += bogat(s.corp, 'lead');
            h += sursaHtml(s);
            h += '<p style="margin-top:2.4em;"><a class="btn btn-navy" href="noutati.html">← Înapoi la noutăți</a></p>';
            root.innerHTML = h;
        }).catch(function () { eroare(root, 'Știrea'); });
    }

    /* =====================  CARDURILE DE PE PRIMA PAGINĂ  ===================== */

    function pornesteAcasa(root) {
        incarca().then(function (d) {
            var st = vizibile(d).filter(function (s) {
                return !s.arhivat && s.publicat !== false && s.pePrimaPagina !== false;
            }).slice(0, 3);
            if (!st.length) return; /* rămân cardurile statice din pagină */
            root.innerHTML = st.map(function (s) { return card(s, 'home-card'); }).join('');
            reveleaza(root);
        }).catch(function () { /* rezervă: cardurile statice din HTML */ });
    }

    /* Folosit de admin-noutati.html pentru previzualizare, ca sa nu existe doua reguli de afisare */
    window.Noutati = { card: card, bogat: bogat, dataText: dataText };

    var el;
    if ((el = document.getElementById('noutati-lista'))) pornesteLista(el);
    if ((el = document.getElementById('arhiva-lista'))) pornesteArhiva(el);
    if ((el = document.getElementById('stire-app'))) pornesteArticol(el);
    if ((el = document.getElementById('noutati-acasa'))) pornesteAcasa(el);
})();
