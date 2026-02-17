
/**
 * MUZEU VIRTUAL - Sistem Automat de Încărcare Imagini
 * Școala Gimnazială "Principele Carol"
 */

document.addEventListener('DOMContentLoaded', () => {
    const museumData = {
        "images/Muzeu_Virtual/Chipuri_si_destine": [
            "Elevi 1952 Școala Pedagogică de Fete.jpeg",
            "LPC.jpeg",
            "Promotia 1950-1951.jpeg",
            "elevi-1952.jpeg",
            "Școala Pedagogică de Fete. Promoția 1950-1951.jpeg"
        ],
        "images/Muzeu_Virtual/Documente_istorice": [
            "Anunț înscrieri-epoca interbelică.jpeg",
            "inscrieri-vechi.jpeg"
        ],
        "images/Muzeu_Virtual/Martori_tacuti": [
            "Liceul Principele Carol -1929.jpg",
            "originile-1.jpeg",
            "scoala-1929.jpg",
            "vedere cu Liceul Principele Carol-1926.jpeg",
            "Școala Pedagogică de fete - 1952.jpeg"
        ]
    };

    const galleries = document.querySelectorAll('.galerie-imagini');

    galleries.forEach(gallery => {
        const folder = gallery.getAttribute('data-folder').replace(/\\/g, '/');
        // Find the key that matches the end of the folder path to handle relative/absolute nuances
        const matchingKey = Object.keys(museumData).find(key => folder.endsWith(key) || key.endsWith(folder));
        const images = matchingKey ? museumData[matchingKey] : [];

        images.forEach(imageName => {
            const card = createMuseumCard(folder, imageName);
            gallery.appendChild(card);
        });
    });

    // Initialize Lightbox if not already handled
    initMuseumLightbox();
});

/**
 * Generează inteligent descrierea bazată pe numele fișierului și folder
 */
function generateIntelligence(filename, folder) {
    let cleanName = filename.split('.')[0]; // remove extension
    let year = cleanName.match(/\d{4}/) ? cleanName.match(/\d{4}/)[0] : null;

    // Curățare nume
    let title = cleanName
        .replace(/_/g, ' ')
        .replace(/-/g, ' ')
        .replace(/\d{4}/g, '') // scoatem anul din titlu dacă îl avem separat
        .trim();

    if (!title) title = "Imagine din Arhivă";

    // Capitalizare prima literă
    title = title.charAt(0).toUpperCase() + title.slice(1);

    let contextDesc = "";
    if (folder.includes('Chipuri_si_destine')) {
        contextDesc = "Portret de epocă ce surprinde chipuri care au marcat istoria școlii noastre.";
    } else if (folder.includes('Documente_istorice')) {
        contextDesc = "Fragment documentar autentic păstrat în arhivele instituției, martor al birocrației și tradiției academice.";
    } else if (folder.includes('Martori_tacuti')) {
        contextDesc = "Elemente de arhitectură sau obiecte de patrimoniu care au supraviețuit timpului, spunând povestea clădirii.";
    }

    return {
        title: title,
        year: year || "Arhivă",
        desc: contextDesc
    };
}

/**
 * Creează elementul HTML pentru un card
 */
function createMuseumCard(folder, filename) {
    const info = generateIntelligence(filename, folder);
    const card = document.createElement('div');
    card.className = 'museum-card lightbox-trigger';

    card.innerHTML = `
        <div class="museum-image-wrapper">
            <img src="${folder}/${filename}" alt="${info.title}" loading="lazy">
            <div class="museum-overlay-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                    fill="none" stroke="var(--royal-gold)" stroke-width="2" stroke-linecap="round"
                    stroke-linejoin="round">
                    <circle cx="11" cy="11" r="8"></circle>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    <line x1="11" y1="8" x2="11" y2="14"></line>
                    <line x1="8" y1="11" x2="14" y2="11"></line>
                </svg>
            </div>
        </div>
        <div class="museum-content">
            <span class="museum-year">${info.year}</span>
            <h3 class="museum-title">${info.title}</h3>
            <p class="museum-desc">${info.desc}</p>
        </div>
    `;

    // Add click event for lightbox
    card.addEventListener('click', () => {
        openLightbox(`${folder}/${filename}`, `${info.title} (${info.year})`);
    });

    return card;
}

function initMuseumLightbox() {
    const lightbox = document.getElementById('museumLightbox');
    const closeBtn = document.getElementById('lightboxClose');

    if (closeBtn && lightbox) {
        closeBtn.addEventListener('click', () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = '';
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
}

function openLightbox(src, captionText) {
    const lightbox = document.getElementById('museumLightbox');
    const img = document.getElementById('lightboxImg');
    const caption = document.getElementById('lightboxCaption');

    if (lightbox && img && caption) {
        img.src = src;
        caption.textContent = captionText;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}
