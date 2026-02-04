# UX Flow: Dynamic Campus Engine

Acest ghid descrie arhitectura informațională optimizată pentru a asigura accesul la orice informație critică în maximum **3 click-uri**.

## Strategia "3-Click Victory"

### Click 1: Discovery (Interfața Principală)
Utilizatorul aterizează pe homepage. **Smart Search Bar** este punctul central de focus (peste fold sau în header).
- **Interacțiune:** Utilizatorul începe să scrie "Matematica" sau "Examen".
- **Feedback Vizual:** Sugestii instantanee apar într-un dropdown "floating" cu categorii (Profesori, Documente, Evenimente).

### Click 2: Contextualization (Rezultate/Filtrare)
Dacă utilizatorul nu a găsit sugestia directă sau vrea să exploreze:
- **Timeline Interactiv:** Click pe un filtru (ex: "Sport"). Grid-ul se rearanjează cu o animație fluidă de tip *Spring*.
- **Faculty Grid:** Click pe cardul unui profesor. Cardul se ridică ușor (hover effect) și indică prezența detaliilor.

### Click 3: Action (Informația Finală)
- **Eveniment:** Click pe cardul din Timeline deschide pagina de detalii a evenimentului sau descarcă ghidul.
- **Profesor:** Click pe card deschide o **Fereastră Modală "Airy"**. 
    - *Conținut:* Bio scurtă, Butoane rapide pentru "Resurse Curs" și un buton de tip *One-Tap Email*.

---

## Principii Design Antigravity App
1. **Vertical Rhythm:** Spațiu generos între module (min 80px) pentru a reduce oboseala cognitivă.
2. **Micro-Interacțiuni:** Orice element interactiv trebuie să aibă o stare de *Scale* sau *Shadow* la hover pentru a confirma "life-like touch".
3. **Mobile-First Priority:** Pe mobil, filtrele calendarului devin un carusel orizontal, iar căutarea este fixată în partea de jos a ecranului (Thumb Zone Access), facilitând utilizarea cu o singură mână de către părinții aflați în mișcare.
