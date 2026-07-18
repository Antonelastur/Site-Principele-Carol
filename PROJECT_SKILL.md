# Ghid de administrare a site-ului Școlii Gimnaziale „Principele Carol"

Acest document explică structura, convențiile și pașii de actualizare ai site-ului, astfel încât orice persoană (sau orice asistent AI) să poată continua administrarea fără context suplimentar.

## 1. Prezentare generală

Site static: HTML5 semantic, CSS3 cu variabile, JavaScript vanilla. Fără framework-uri, fără build tools, fără dependențe externe (cu excepția fonturilor Google: Playfair Display și Inter). Toate linkurile interne sunt relative, deci site-ul funcționează identic pe GitHub Pages, pe domeniul școlii sau deschis local în browser.

## 2. Structura folderelor

```
/
├── index.html                  Pagina principală
├── istoric.html                Despre noi → Istoric
├── misiune-valori.html         Despre noi → Misiune și valori
├── echipa.html                 Despre noi → Echipă
├── baza-materiala.html         Despre noi → Bază materială
├── oferta-educationala.html    Despre noi → Oferta educațională
├── muzeu-virtual.html          Despre noi → Muzeul virtual (arhivă, 3 categorii)
├── podium.html                 Elevi → Podium (olimpiade, concursuri)
├── consiliul-elevilor.html     Elevi → Consiliul elevilor
├── orar.html                   Elevi → Orarul claselor
├── inscriere.html              Părinți → Înscriere
├── burse.html                  Părinți → Burse și tichete
├── avizier.html                Părinți → Avizier
├── erasmus.html                Proiecte → Erasmus+ L.I.F.E.
├── club-limbi-straine.html     Proiecte → Lumea magică a limbilor străine
├── caroline-revista.html       CAROLine → Revista
├── caroline-tv.html            CAROLine → TV / multimedia
├── galerie.html                Galerie foto (cu lightbox și filtre)
├── documente.html              Documente publice + organigramă
├── noutati.html                Lista de știri
├── stire-model.html            ȘABLON pentru o știre nouă
├── contact.html                Contact
├── css/style.css               Toate stilurile
├── js/main.js                  Toate interacțiunile
├── images/                     Imagini (subfoldere: gallery, muzeu, zici, club)
├── docs/                       PDF-uri publice (subfolder: orar)
└── media/                      Audio (imnul clubului)
```

Toate paginile sunt în rădăcină (structură plată). Total: 22 de pagini. Avantaj: header-ul și footer-ul folosesc aceleași căi relative peste tot.

## 3. Identitatea vizuală

Culorile sunt definite o singură dată, la începutul fișierului `css/style.css`:

| Variabilă | Valoare | Rol |
|---|---|---|
| `--color-primary` | `#001F3F` | albastru regal (header, footer, benzi) |
| `--color-primary-light` | `#12365e` | albastru deschis |
| `--color-accent` | `#D4AF37` | auriu mediu (borduri, accente) |
| `--color-accent-dark` | `#B89047` | auriu închis (umbra degradeului) |
| `--color-accent-light` | `#F3E5AB` | auriu deschis (reflexia degradeului) |
| `--color-beige` | `#E6DAC4` | bej cald |
| `--color-background` | `#FDFBF7` | fundalul paginilor |
| `--color-text` | `#1a2433` | text |

Degradeul auriu metalizat este `--gold-gradient` (închis → deschis → mediu → închis) și este REGULA pentru orice accent auriu de pe site: titluri (`gold-text`), butoane (`btn-gold`), liniile separatoare (header, footer, ticker, page-hero, prin `border-image`) și chenarele elementelor rotunjite (carduri, linkuri de documente, galerie, prin fundal dublu `padding-box / border-box`, care păstrează colțurile rotunjite). Auriu plin (`--color-accent`) se folosește doar la texte mici, unde degradeul ar reduce lizibilitatea. Blocul de reguli e la finalul fișierului `css/style.css`, secțiunea „Aur metalic".

Fonturi: Playfair Display (titluri), Inter (text). Dacă fonturile Google devin indisponibile, site-ul revine automat la Georgia și Segoe UI.

Carduri: clasa `card` (border-radius 12px, bordură subțire aurie, ridicare la hover). Variante: `news-card`, `quick-card`, `person-card`.

## 4. Componente reutilizabile

Header-ul, footer-ul și breadcrumb-ul sunt COPIATE identic în fiecare pagină (site static, fără include-uri). Regula de aur: dacă modifici meniul sau footer-ul, modifică-l în TOATE cele 21 de pagini. Cel mai sigur mod: caută și înlocuiește același fragment în toate fișierele (Find and Replace in Files, în VS Code: Ctrl+Shift+H).

- Header: blocul `<header class="site-header">…</header>`. Pagina activă are clasa `active` pe `<li class="nav-item">`.
- Breadcrumb: blocul `<nav class="breadcrumb">…</nav>`, imediat după header (lipsește doar pe index.html).
- Footer: blocul `<footer class="site-footer">…</footer>`.
- Catalogul electronic apare DOAR în cardul de acces rapid de pe homepage. Nu îl adăugați în header sau în alte locuri.

## 5. Cum adaugi o știre nouă

1. Duplică `stire-model.html` cu un nume nou, de exemplu `stire-ziua-scolii.html` (litere mici, cratime, fără diacritice în numele fișierului).
2. În fișierul nou, schimbă: `<title>`, meta description, titlul din `page-hero`, data, imaginea și textul articolului.
3. În `noutati.html`, adaugă un card nou la începutul grilei (copiază un `<article class="card news-card">` existent).
4. Dacă știrea e importantă, actualizează și cele 3 carduri de pe `index.html` (secțiunea „Ultimele noutăți") și textele din banda ticker (`<div class="ticker-content">`).

## 6. Cum adaugi imagini în galerie

1. Salvează imaginea în `images/gallery/` (sau `images/zici/`, `images/club/` după caz). Nume: litere mici, cratime, fără diacritice și fără spații.
2. Optimizeaz-o înainte (recomandat sub 300 KB; squoosh.app e gratuit).
3. Galeria e organizată pe categorii tematice, fiecare cu caruselul ei (secțiuni `gal-cat`). Adaugă imaginea în caruselul categoriei potrivite, în interiorul `car-track`:
   ```html
   <figure class="car-slide gallery-item">
       <img src="images/gallery/nume-imagine.jpg" alt="Descriere" loading="lazy">
       <figcaption>Titlu</figcaption>
   </figure>
   ```
4. Pentru o categorie nouă, copiază integral o secțiune `gal-cat` existentă (titlu, subtitlu, carusel) și înlocuiește conținutul. Caruselul pornește automat; clic pe fotografie deschide vizualizarea mare și oprește derularea.

## 7. Cum adaugi un document PDF

1. Pune PDF-ul în `docs/` (orarele în `docs/orar/`). Nume fără diacritice și fără spații.
2. În `documente.html` (sau `orar.html`), adaugă un element în lista `doc-list`:
   ```html
   <li><a class="doc-link" href="docs/nume-document.pdf" target="_blank" rel="noopener">
       <span class="doc-ico">📄</span>
       <span>Titlul documentului<span class="doc-meta">PDF · data actualizării</span></span>
   </a></li>
   ```

## 8. Publicare pe GitHub Pages

1. Repo: `antonelastur/Site-Principele-Carol`, ramura `main`, GitHub Pages activat pe rădăcina ramurii.
2. Local: înlocuiește fișierele, apoi:
   ```
   git add -A
   git commit -m "Descrierea modificării"
   git push
   ```
   Sau, direct pe github.com: Add file → Upload files.
3. Site-ul se actualizează în 1-2 minute. Verifică apoi pagina modificată în browser (Ctrl+F5 pentru a ocoli cache-ul).

## 9. Migrarea pe domeniul școlii

Nimic din cod nu trebuie modificat: toate linkurile sunt relative.

1. Varianta GitHub Pages + domeniu propriu: în Settings → Pages → Custom domain, introdu domeniul (de exemplu `principelecarol.ro`); la registrar, configurează DNS conform indicațiilor GitHub (CNAME către `antonelastur.github.io`). GitHub emite automat certificatul HTTPS.
2. Varianta hosting clasic: încarcă tot conținutul folderului (nu folderul însuși) în rădăcina serverului prin FTP sau cPanel.

## 10. Convenții obligatorii

- Nume de fișiere: litere mici, cratime, fără diacritice, fără spații (`stire-ziua-scolii.html`, nu `Știre Ziua Școlii.html`).
- Conținutul paginilor (textul vizibil) folosește diacritice corecte: ă, â, î, ș, ț.
- Fiecare imagine are atribut `alt` descriptiv și `loading="lazy"` (cu excepția imaginii hero).
- Linkurile externe au `target="_blank" rel="noopener"`.
- Nu publica numele sau imaginile elevilor fără acordul scris al părinților (GDPR).
- Nu adăuga biblioteci JavaScript externe; tot ce e nevoie există în `js/main.js`.
- Testează pe mobil (DevTools, Ctrl+Shift+M, lățimi 320 / 768 / 1280 px) înainte de publicare.

## 11. Depanare rapidă

| Problemă | Cauză probabilă | Soluție |
|---|---|---|
| Imaginea nu apare | cale greșită sau diacritice în numele fișierului | verifică calea exactă, redenumește fără diacritice |
| Meniul diferă între pagini | header modificat doar în unele fișiere | sincronizează blocul header în toate cele 22 de pagini |
| Animațiile nu pornesc | lipsește `js/main.js` sau clasa `reveal` | verifică `<script src="js/main.js">` la finalul paginii |
| Pagina nouă nu are stiluri | lipsește `<link rel="stylesheet" href="css/style.css">` | pornește întotdeauna de la o pagină existentă |

## 12. Atenționări despre resursele din repo-ul vechi

Repo-ul original (`antonelastur/Site-Principele-Carol`) conține câteva fișiere care induc în eroare. NU le refolosiți pe site:

| Fișier (repo vechi) | Problemă | Ce folosim în schimb |
|---|---|---|
| `images/hero-bg.png` | imagine generată de AI, cu o școală fictivă („St. Mark's Academy", text în engleză pe fațadă); NU este clădirea noastră | `images/scoala-hero.jpg`, fotografia reală cu plăcuța „Principele Carol" |
| `images/logo-scoala.svg` | banner 16:9 (1440×810), nu sigla școlii; în header apare deformat | `images/logo.png`, logo-ul real (stemă rotundă cu coroană, clădire și carte) |
| `images/scoala.jpg` | fotografie reală, dar cu plăcuța veche „Petru Comarnescu" la intrare | `images/scoala-hero.jpg` sau `images/hero-main.jpg` |
| `images/Muzeu_Virtual/Martori_tacuti/scoala-1929.jpg` | referit în paginile vechi, dar fișierul nu există | imaginile existente din `images/muzeu/` |

Recomandare: ștergeți `hero-bg.png` din repo (sau redenumiți-l `hero-bg-AI-NU-FOLOSI.png`) și clarificați rolul lui `logo-scoala.svg`, ca următoarea persoană care lucrează la site să nu repete confuzia.

Regulă generală: înainte de a folosi orice imagine „oficială" din arhivă, deschideți-o și verificați ce conține de fapt. Pe site se publică doar fotografii reale ale școlii, nu imagini generate de AI.
