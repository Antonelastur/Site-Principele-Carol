/**
 * @file search-data.js
 * @description Centralized search index for the website.
 */

const SEARCH_DATA = [
    // --- CADRE DIDACTICE & CONDUCERE ---
    {
        title: "Director - Prof. Lămașanu Enikő",
        content: "Directorul Școlii Gimnaziale Principele Carol. Conducere, management executiv, președinte Consiliul Profesoral, audiențe.",
        tags: ["director", "enikö", "lamasanu", "conducere", "manager"],
        url: "documente.html"
    },
    {
        title: "Director Adjunct - p.e.p. Hanek Rita",
        content: "Director Adjunct, coordonare educațională, responsabilă cu orarul și activitatea cadrelor didactice.",
        tags: ["director adjunct", "hanek", "rita", "conducere", "adjunct"],
        url: "documente.html"
    },
    {
        title: "Consiliul de Administrație",
        content: "Forul de decizie al școlii, format din cadre didactice, părinți, reprezentanți ai primăriei și consiliului local.",
        tags: ["consiliu", "administratie", "decizie", "ca"],
        url: "documente.html"
    },

    // --- CATEDRE & PERSONAL ---
    {
        title: "Catedra Educatoarelor",
        content: "Personal didactic pentru învățământul preșcolar (grupa mică, mijlocie, mare).",
        tags: ["educatoare", "prescolar", "gradinita", "catedra"],
        url: "documente.html#catedra-educatoare"
    },
    {
        title: "Catedra Învățătorilor",
        content: "Cadre didactice pentru învățământul primar (clasa pregătitoare - clasa a IV-a).",
        tags: ["invatatori", "primar", "scoala primara", "clasele 1-4"],
        url: "documente.html#catedra-invatatori"
    },
    {
        title: "Catedra Limbă și Comunicare",
        content: "Profesori de Limba Română, Limba Engleză, Limba Franceză.",
        tags: ["romana", "engleza", "franceza", "limbi straine", "profesori"],
        url: "documente.html#catedra-limba"
    },
    {
        title: "Catedra Matematică și Științe",
        content: "Profesori de Matematică, Fizică, Chimie, Biologie, Educație Tehnologică, TIC (Informatică).",
        tags: ["matematica", "fizica", "chimie", "biologie", "tic", "informatica", "stiinte"],
        url: "documente.html#catedra-matematica"
    },
    {
        title: "Catedra Om și Societate",
        content: "Istorie, Geografie, Cultură Civică, Religie, Educație Plastică, Educație Muzicală, Educație Fizică.",
        tags: ["istorie", "geografie", "civica", "religie", "sport", "muzica", "desen"],
        url: "documente.html#catedra-om"
    },

    // --- COMISII ---
    {
        title: "Comisia de Burse",
        content: "Gestionează dosarele și acordarea burselor sociale, de merit, de studiu și de performanță pentru elevi.",
        tags: ["burse", "bani", "elevi", "dosare burse", "sociala", "merit"],
        url: "documente.html"
    },
    {
        title: "Comisia pentru Curriculum",
        content: "Responsabilă cu planificarea și implementarea curriculumului școlar, CDȘ, opționale.",
        tags: ["curriculum", "cds", "optionale", "planificare"],
        url: "documente.html"
    },
    {
        title: "CEAC - Comisia de Asigurare a Calității",
        content: "Comisia pentru Evaluarea și Asigurarea Calității în Educație. Monitorizează standardele de calitate.",
        tags: ["ceac", "calitate", "evaluare", "standarde"],
        url: "documente.html"
    },
    {
        title: "Comisia Prevenire Violență",
        content: "Comisia pentru prevenirea și eliminarea violenței, faptelor de corupție și discriminării în mediul școlar.",
        tags: ["violenta", "bullying", "siguranta", "discriminare", "anticoruptie"],
        url: "documente.html"
    },
    {
        title: "Comisia Orar și Serviciu pe Școală",
        content: "Responsabilă cu întocmirea orarului elevilor și profesorilor, precum și a serviciului pe școală.",
        tags: ["orar", "program", "serviciu", "profesori"],
        url: "documente.html"
    },

    // --- CONTACT & ADMINISTRATIV ---
    {
        title: "Secretariat",
        content: "Program secretariat, eliberare adeverințe, înscrieri, transferuri elevi.",
        tags: ["secretar", "secretariat", "adeverinta", "inscriere"],
        url: "contact.html"
    },
    {
        title: "Contabilitate - Administrator Financiar",
        content: "Departamentul financiar-contabil, administrare buget, plăți.",
        tags: ["contabil", "financiar", "bani", "buget"],
        url: "documente.html"
    },
    {
        title: "Administrator de Patrimoniu",
        content: "Gestiunea patrimoniului școlii, logistică, întreținere.",
        tags: ["administrator", "patrimoniu", "logistica"],
        url: "documente.html"
    },
    {
        title: "Consiliul Elevilor",
        content: "Reprezentanții elevilor, președintele consiliului școlar, activități și proiecte ale elevilor.",
        tags: ["consiliul elevilor", "reprezentant", "elevi", "lideri"],
        url: "consiliu-elevi.html"
    },
    {
        title: "Consiliul Părinților",
        content: "Reprezentanții părinților, comitetul de părinți, asociația de părinți, colaborare școală-familie.",
        tags: ["parinti", "comitet", "asociatie", "sedinte"],
        url: "parinti.html"
    },

    // --- DOCUMENTE PDF INDE XATE MANUAL ---
    {
        title: "Organigrama Instituției nr. 1501 din 12.09.2025",
        content: "Document PDF oficial. Prezentarea structurii ierarhice a școlii, posturi didactice, auxiliare și nedidactice.",
        tags: ["organigrama", "pdf", "document", "structura", "1501", "2025"],
        url: "documente.html", // In reality this might link to a PDF, but user pointed to the page content mostly.
        type: "document"
    },
    {
        title: "Regulament de Ordine Interioară (ROI)",
        content: "Norme și reguli de comportament în școală pentru elevi și profesori.",
        tags: ["roi", "regulament", "reguli", "interioara"],
        url: "documente.html"
    },
    {
        title: "Hub Media - Radio & TV",
        content: "Platforma media a școlii: Radio, Televiziune școlară, Podcast-uri, Revista școlii.",
        tags: ["radio", "tv", "media", "podcast", "revista", "stiri"],
        url: "hub-media.html"
    },
    {
        title: "Oferta Educațională",
        content: "Planul de școlarizare, număr de clase, opționale, program „Școală după școală”.",
        tags: ["oferta", "scolarizare", "clase", "inscriere"],
        url: "oferta-educationala.html"
    }
];

// Export for use in main.js if utilizing modules, or global scope.
window.SEARCH_INDEX = SEARCH_DATA;
