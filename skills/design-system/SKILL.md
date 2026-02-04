---
name: Frontend Design System
description: Fundația vizuală a școlii "Principele Carol" - îmbinând tradiția regală cu inovația digitală.
---

# Frontend Design System: Principele Carol

Acest sistem de design este creat pentru a asigura o coerență vizuală între istoria seculară a școlii și viitorul ei tehnologic.

## 1. Identitate Vizuală (Core)

### Paleta de Culori
- **Navy Authority (#002851):** Reprezintă stabilitatea, disciplina și tradiția. Se utilizează pentru fundaluri principale și headings de nivel 1.
- **Royal Gold (#D4AF37):** Simbol al excelenței și prestigiului. Utilizat exclusiv pentru accente, borduri decorative și elemente de tip Call-to-Action.
- **Surface White (#FFFFFF):** Spațiul negativ este esențial. Folosiți alb generos pentru a menține un design aerisit și modern.

### Tipografie
- **Headings (Playfair Display):** Un font Serif solemn care evocă documentele istorice și eleganța regală.
- **Body (Roboto):** Un font Sans-Serif curat, pentru o lizibilitate maximă pe orice dispozitiv.

---

## 2. Ghid de Stil Vizual: Arhivă vs. Modernitate

Pentru a păstra un echilibru între trecut și prezent, urmați aceste reguli:

### Utilizarea Imaginilor de Arhivă (ex: 1952)
- **Filtru:** Imaginile vechi trebuie afișate implicit în **Grayscale (Alb-Negru)** cu un contrast ridicat.
- **Interacțiune:** La hover, imaginea poate căpăta o ușoară tentă sepia sau poate reveni subtil la culorile originale (dacă există) pentru a simboliza "aducerea la viață" a istoriei.
- **Cadrare:** Folosiți borduri subțiri aurii (`1px solid #D4AF37`) pentru a încadra fotografiile istorice, tratându-le ca pe niște piese de muzeu.

### Integrarea Elementelor Moderne (ex: CAROLine TV)
- **Fluiditate:** Elementele moderne trebuie să folosească animații **Antigravity (floating)**. Ele nu "stau" pe pagină, ci planează ușor, sugerând dinamism.
- **Gradients:** Folosiți gradienți subtili de la Navy la Blue Academy pentru a diferenția secțiunile tehnologice de cele pur istorice.

---

## 3. Accesibilitate & Performanță
- **Contrast:** Textul auriu pe fundal alb nu este permis pentru corpul de text (contrast scăzut). Auriul se folosește doar pe fundal Navy sau ca element grafic.
- **Tree-Shaking:** Toate componentele sunt exportate individual pentru a menține bundle-ul final sub 50KB.
- **Responsive Fluidity:** Tipografia și spațierea folosesc funcția `clamp()` în CSS pentru a se adapta perfect de la ecrane de telefon la monitoare ultra-wide.

---

## 4. Utilizare Rapidă (Quick Start)

Adaugă în documentul tău:
```html
<link rel="stylesheet" href="skills/design-system/tokens.css">
```
Și folosește clasele utilitare sau variabilele CSS:
```css
.card-header {
  font-family: var(--font-heading);
  color: var(--color-accent);
}
```
