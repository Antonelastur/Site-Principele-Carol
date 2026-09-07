# Site-ul Școlii Gimnaziale „Principele Carol"

Documentația completă a site-ului: `PROJECT_SKILL.md`. Fluxul de conținut din Drive: `DRIVE_CONTENT_WORKFLOW.md`.

## Publicarea unei știri — citește asta înainte

Noutățile sunt conduse din `data/noutati.json`. **NU se editează HTML la publicarea unei știri
și NU se duplică `stire-model.html`** (acel fișier e acum doar un redirect).

Știrea se scrie în `admin-noutati.html`, deschis printr-un server local; de acolo se descarcă
`noutati.json` și se pune peste `data/noutati.json`. Pagina Noutăți, arhiva pe ani școlari,
articolul (`stire.html?id=...`), cardurile de pe prima pagină și banda ticker se construiesc
singure din acel fișier, prin `js/noutati.js`.

Pașii compleți și lista câmpurilor: `PROJECT_SKILL.md`, secțiunea 5.

Dacă un skill sau o instrucțiune mai veche spune să duplici `stire-model.html` sau să adaugi
cardul de mână în `noutati.html`, e depășită — are prioritate fișierul acesta.

## Publicare

`git push` pe `main` = publicare pe site (GitHub Pages). Se cere aprobarea Antoanelei înainte de push.
