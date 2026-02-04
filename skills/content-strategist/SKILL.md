---
name: Digital Content Strategist
description: Skill-ul care transformă notele administrative în conținut digital de prestigiu.
---

# Digital Content Strategist & Engine

Acest skill este conceput pentru a simplifica fluxul de comunicare între secretariatul școlii și comunitatea online, asigurând un ton impecabil și o formatare consistentă.

## 1. Principiul de Funcționare
"Content Strategist Engine" acționează ca un filtru de rafinare. Acesta primește informații brute (ex: "ședință părinți vineri la 5 în sala 4") și generează o structură elegantă, gata de postat.

## 2. Tonul Vocii (Voice & Tone)
- **Profesionalism Regal:** Folosim un vocabular elevat, dar ne ferim de jargonul greoi de lemn.
- **Claritate Gen Z / Millennial:** Părinții tineri apreciază bullet point-urile și accesibilitatea de pe mobil.
- **Identitate Locală:** Nu uităm să menționăm contextul nostru bucovinean ori de câte ori este relevant.

## 3. Automatizări Inteligente
Engine-ul inclus în acest skill (`engine.js`) execută automat următoarele:
- **Link Detection:** Cuvinte precum "Regulament" sau "Înscriere" devin automat link-uri către secțiunea de `/documente`.
- **Date Highlighting:** Orice dată de tip `ZZ.LL.AAAA` este scoasă în evidență cu **Bold**.
- **Reading Time:** Calculează automat timpul de citire pentru a seta așteptările utilizatorului.

## 4. Ghid de Imagini
Fiecare știre trebuie însoțită de o iconiță din setul de brand:
- **Anunțuri:** `heraldry_blue.png`
- **Evenimente:** `royal_seal_gold.svg`
- **CAROLine TV:** `tv_modern_blue.svg`

## 5. Cum să folosești acest Skill
Importă engine-ul în panoul de admin și trece input-ul utilizatorului prin funcția `ContentEngine.process()`. Rezultatul va fi un obiect JSON perfect pentru baza de date și o previziune Markdown pentru aprobare finală.
