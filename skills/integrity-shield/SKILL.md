# Artifact Integrity Shield (QA Skill)

**Artifact Integrity Shield** este gardianul calității în ecosistemul tău de dezvoltare. Acesta izolează fiecare componentă nouă și o supune unui set de teste automate înainte ca aceasta să ajungă în contact cu restul site-ului.

## 1. Protocol de Debugging (Workflow)

În momentul în care dashboard-ul indică o eroare (Culoare Roșie), urmează acești pași pentru o rezolvare rapidă:

### Faza A: JS Health (Erori de Consolă)
- **Problemă:** Indicatorul este roșu.
- **Acțiune:** Deschide consola browser-ului (`F12`). Integrity Shield a marcat erorile cu prefixul `[SHIELD-ALERT]`. Verifică dacă există variabile nedeclarate sau conflicte între script-uri.
- **Fix:** Corectează eroarea în fișierul `.js` și salvează. Dashboard-ul se va reseta automat la "Healthy".

### Faza B: Layout integrity (Overflow/Leakage)
- **Problemă:** "Leaking Layout" pe modul Mobile.
- **Acțiune:** Comută pe preview-ul "Mobile" (375px). Caută elementele care depășesc containerul orizontal.
- **Fix:** Aplică `max-width: 100%` sau `overflow-x: hidden` pe elementele problematice identificate de Shield.

### Faza C: Assets Validation (Imagini/Fonturi)
- **Problemă:** "Missing Files".
- **Acțiune:** Verifică panoul "Failed Assets" din shield (sau tab-ul Network). Cele mai frecvente cauze sunt path-urile greșite către folderele `/images` sau `/assets`.
- **Fix:** Corectează path-ul folosind referințe absolute sau verifică existența fișierului pe disc.

## 2. Configurare Tehnică

Pentru a activa scutul pe o pagină nouă, adaugă acest bloc de script la finalul fișierului `<body>`:

```html
<!-- Numai în modul dezvoltare -->
<script src="skills/integrity-shield/shield-core.js"></script>
```

**Notă de Producție:** 
Scriptul conține o protecție `if (window.location.search.includes('mode=artifact'))`. Aceasta înseamnă că logica de testare NU se va activa niciodată în fața utilizatorilor finali (Producție), garantând zero overhead de performanță.

## 3. Stress Test Automizat
Integrity Shield nu testează doar aspectul, ci și **reziliența**. Acesta verifică:
1. **Hydration Check:** Dacă elementele interactive sunt gata de utilizare în sub 500ms.
2. **Touch Target Size:** Dacă butoanele de pe mobil sunt suficient de mari pentru a fi apăsate (min 44x44px).
3. **Contrast Ratio:** Dacă textul este lizibil conform standardelor WCAG.
