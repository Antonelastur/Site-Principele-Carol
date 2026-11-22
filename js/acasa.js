/* Pagina de start: lista fixă de anunțuri (fostul ticker) și ultimele albume din galerie.
   Fonturile Alegreya și Figtree le încarcă main.js, doar cu acordul vizitatorului. */
(function () {
    'use strict';

    var LUNI = ['ianuarie', 'februarie', 'martie', 'aprilie', 'mai', 'iunie',
        'iulie', 'august', 'septembrie', 'octombrie', 'noiembrie', 'decembrie'];

    var esc = function (s) {
        return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) {
            return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
        });
    };
    function dataText(iso) {
        var p = String(iso || '').split('-');
        if (p.length < 3) return '';
        return Number(p[2]) + ' ' + LUNI[Number(p[1]) - 1] + ' ' + p[0];
    }

    /* Anunțuri: știrile publicate care nu apar deja în cele 3 carduri de sus */
    var lista = document.getElementById('anunturi-lista');
    if (lista && window.fetch) {
        fetch('data/noutati.json', { cache: 'no-cache' })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (d) {
                var toate = (d.stiri || []).filter(function (s) {
                    return s.publicat !== false && !s.arhivat;
                }).sort(function (a, b) {
                    return String(b.data || '').localeCompare(String(a.data || ''));
                });
                /* aceeași regulă ca în noutati.js pentru cardurile de pe prima pagină */
                var peCarduri = toate.filter(function (s) { return s.pePrimaPagina !== false; }).slice(0, 3);
                var restul = toate.filter(function (s) { return peCarduri.indexOf(s) < 0; }).slice(0, 5);
                if (!restul.length) return;
                lista.innerHTML = restul.map(function (s) {
                    var url = s.link || (s.corp ? 'stire.html?id=' + encodeURIComponent(s.id) : 'noutati.html');
                    var data = s.dataText || dataText(s.data);
                    return '<li>' +
                        (data ? '<time' + (s.data ? ' datetime="' + esc(s.data) + '"' : '') + '>' + esc(data) + '</time>' : '') +
                        '<a href="' + esc(url) + '">' + esc(s.titlu) + '</a></li>';
                }).join('');
            })
            .catch(function () { /* rămân anunțurile fixe din HTML */ });
    }

    /* Galerie: ultimele 4 albume publicate, aceeași ordine ca în galerie.js */
    var albume = document.getElementById('albume-acasa');
    if (albume && window.fetch) {
        var cheie = function (a) { return a.data || (String(a.anScolar || '').split('-')[1] + '-06-30'); };
        fetch('data/galerie.json', { cache: 'no-cache' })
            .then(function (r) { if (!r.ok) throw new Error(r.status); return r.json(); })
            .then(function (d) {
                var ultime = (d.albume || []).filter(function (a) {
                    return a.publicat !== false && a.coperta;
                }).sort(function (x, y) {
                    return cheie(y).localeCompare(cheie(x));
                }).slice(0, 4);
                if (!ultime.length) return;
                albume.innerHTML = ultime.map(function (a) {
                    var data = a.data ? dataText(a.data) : 'Anul școlar ' + esc(a.anScolar || '');
                    return '<li><a href="album.html?a=' + encodeURIComponent(a.id) + '">' +
                        '<img src="' + esc(a.coperta) + '" alt="" loading="lazy" decoding="async">' +
                        '<span class="alb-titlu">' + esc(a.titlu) + '</span>' +
                        '<span class="alb-data">' + esc(data) + '</span></a></li>';
                }).join('');
            })
            .catch(function () { /* rămân fotografiile fixe din HTML */ });
    }
})();
