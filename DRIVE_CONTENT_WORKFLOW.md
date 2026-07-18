# Flux editorial: Google Drive → site

Cum ajunge conținutul (știri, imagini, documente, numere ale revistei CAROLine) din Google Drive pe site, cu roluri clare și pași repetabili.

## 1. Principiu

Google Drive este spațiul de LUCRU (redactare, colectare, aprobare). Site-ul este spațiul de PUBLICARE. Nimic nu se publică direct din Drive: totul trece prin aprobarea webmasterului (prof. Antoanela Pohoață) și, unde e cazul, a direcțiunii.

## 2. Structura recomandată în Drive

```
📁 Site Principele Carol/
├── 📁 01 Știri de publicat/        un subfolder pe știre: text + imagini
├── 📁 02 Imagini galerie/          subfoldere pe eveniment
├── 📁 03 Documente PDF/            documente oficiale aprobate spre publicare
├── 📁 04 Revista CAROLine/         PDF-urile numerelor + coperți
├── 📁 05 Publicate (arhivă)/       ce a fost deja urcat pe site
├── 📁 06 Muzeu virtual/            fotografii de arhivă scanate, pe categorii:
│   ├── 📁 Chipuri și destine/      oameni: elevi, profesori, promoții
│   ├── 📁 Documente istorice/      anuare, anunțuri, însemnări
│   └── 📁 Memoria zidurilor/       clădirea și spațiile școlii
└── 📄 Registru publicări (Sheet)   evidența: ce, cine, când, status
```

## 3. Fluxul unei știri

1. REDACTARE. Autorul (profesor, elev din redacția CAROLine) creează în „01 Știri de publicat" un subfolder cu numele știrii, conținând: un Google Doc cu titlul, data, textul și autorul, plus 1-3 imagini.
2. ACORDURI. Pentru imagini cu elevi: se verifică existența acordului GDPR semnat de părinți ÎNAINTE de trimitere. Fără acord, imaginea nu intră în folder.
3. APROBARE. Autorul notifică webmasterul (email sau comentariu în Doc). Direcțiunea aprobă știrile oficiale (comunicate, decizii).
4. PUBLICARE (webmaster):
   - descarcă imaginile, le optimizează (sub 300 KB) și le redenumește fără diacritice;
   - duplică `stire-model.html`, completează titlul, data, textul, imaginea (pași detaliați în PROJECT_SKILL.md, secțiunea 5);
   - actualizează `noutati.html`, iar pentru știri importante și homepage-ul (carduri + ticker);
   - commit și push pe GitHub.
5. ARHIVARE. Subfolderul știrii se mută în „05 Publicate", iar în Registru se notează data publicării și linkul paginii.

## 4. Fluxul imaginilor de galerie

1. Profesorul coordonator al evenimentului urcă selecția (maximum 10-15 imagini bune, nu tot cardul de memorie) în „02 Imagini galerie", într-un subfolder cu numele evenimentului.
2. Verificare GDPR: doar imagini cu elevi pentru care există acord.
3. Webmasterul optimizează, redenumește (`eveniment-01.jpg`…), copiază în `images/gallery/` și adaugă blocurile `gallery-item` în `galerie.html` (PROJECT_SKILL.md, secțiunea 6).

## 5. Fluxul documentelor oficiale

1. Secretariatul sau direcțiunea plasează PDF-ul final, semnat, în „03 Documente PDF".
2. Numai versiuni finale: fără drafturi, fără documente needitabile scanate strâmb.
3. Webmasterul redenumește (`pdi-2025-2029.pdf` etc.), copiază în `docs/` și adaugă linkul în `documente.html` (PROJECT_SKILL.md, secțiunea 7).
4. La înlocuirea unui document (de exemplu orar nou), fișierul vechi se suprascrie păstrând ACELAȘI nume: linkurile existente rămân valabile.

## 6. Fluxul imaginilor pentru Muzeul virtual

1. Fotografiile vechi scanate (de la absolvenți, din arhive personale, din ziarul „Vremuri Humorene") se pun în „06 Muzeu virtual", în subfolderul categoriei potrivite.
2. Fiecare imagine are nevoie de o legendă: scrieți-o în numele fișierului (de exemplu „Promoția 1960, clasa a VII-a.jpg") sau într-un Google Doc alăturat, împreună cu sursa.
3. Dublurile se evită: aceeași fotografie se pune o singură dată, în categoria cea mai potrivită.
4. Webmasterul optimizează, redenumește fără diacritice și adaugă imaginile în pagina muzeu-virtual.html, la categoria corespunzătoare subfolderului.
5. Pentru fotografii cu persoane identificabile din perioade recente se aplică aceleași reguli GDPR ca la galerie.

## 7. Fluxul revistei CAROLine

1. Redacția finalizează numărul (PDF de tipar + coperta JPG) în „04 Revista CAROLine".
2. Webmasterul adaugă coperta în `images/`, PDF-ul în `docs/` și un card nou în arhiva din `caroline-revista.html`.

## 8. Reguli de conținut

- Ton: accesibil și clar pentru pagini de informare; jurnalistic și creativ pentru materialele CAROLine.
- Diacritice corecte în tot textul publicat.
- Datele demografice, calendarele oficiale și citatele se verifică înainte de publicare (sursa: Ministerul Educației, ISJ Suceava, documente interne).
- Nimic nu se publică pe site fără aprobarea explicită a webmasterului.

## 9. Ritm recomandat

| Activitate | Frecvență |
|---|---|
| Verificarea folderului „01 Știri de publicat" | săptămânal |
| Actualizarea avizierului (calendare, anunțuri) | la fiecare comunicare oficială |
| Galerie foto | după fiecare eveniment major |
| Muzeu virtual (folderul 06) | la fiecare verificare săptămânală |
| Verificarea linkurilor moarte și a orarelor | la început de semestru |
| Arhivarea în „05 Publicate" | odată cu fiecare publicare |
