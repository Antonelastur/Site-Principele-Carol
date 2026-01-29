/* ============================================
   ORAR APP LOGIC (Vanilla JS Migration from React)
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {
    initScheduleApp();
});

function initScheduleApp() {
    const selector = document.getElementById('classSelector');
    const contentArea = document.getElementById('scheduleContent');

    if (!selector || !contentArea) return;

    // 1. POPULARE DATE (CONSTANTS MOCKED)
    // Vom reconstitui datele pe baza informațiilor disponibile
    const SCHOOL_YEAR = "2025-2026";
    const SCHOOL_NAME = "Școala Gimnazială Principele Carol";

    const SCHEDULE_DATA = [
        // --- CICLUL PRIMAR ---
        {
            id: "1a",
            name: "Clasa I A",
            category: "PRIMAR",
            teacher: "Prof. Bartoș Eleonora",
            mentions: "Pentru detalii suplimentare, consultați avizierul clasei.",
            schedule: [
                {
                    dayName: "Luni",
                    slots: [
                        { time: "08:00 - 08:45", subject: "Comunicare în limba română", room: "Sala 1" },
                        { time: "09:00 - 09:45", subject: "Religie", teacher: "Prof. Religie" },
                        { time: "10:00 - 10:45", subject: "Matematică și explorarea mediului" },
                        { time: "11:00 - 11:45", subject: "Muzică și mișcare" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "1b",
            name: "Clasa I B",
            category: "PRIMAR",
            teacher: "Prof. Enia Dorina",
            schedule: [
                {
                    dayName: "Luni",
                    slots: [
                        { time: "08:00 - 08:45", subject: "Comunicare în limba română" },
                        { time: "09:00 - 09:45", subject: "Matematică și explorarea mediului" },
                        { time: "10:00 - 10:45", subject: "Limba Engleză" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "2a",
            name: "Clasa a II-a A",
            category: "PRIMAR",
            teacher: "Prof. Vultur Anca",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Matematică și explorarea mediului" },
                        { time: "09:00", subject: "Religie" },
                        { time: "10:00", subject: "Comunicare în limba română" },
                        { time: "11:00", subject: "Muzică și mișcare" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "2b",
            name: "Clasa a II-a B",
            category: "PRIMAR",
            teacher: "Prof. Manoliu Rodica",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Comunicare în limba română" },
                        { time: "09:00", subject: "Matematică și explorarea mediului" },
                        { time: "10:00", subject: "Limba Engleză" },
                        { time: "11:00", subject: "Educație Fizică" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "3a",
            name: "Clasa a III-a A",
            category: "PRIMAR",
            teacher: "Prof. Bălăcian Mihaela",
            mentions: "Orar complet disponibil la avizier.",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Limba Engleză" },
                        { time: "09:00", subject: "Limba Română" },
                        { time: "10:00", subject: "Matematică" },
                        { time: "11:00", subject: "Educație Civică" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "3b",
            name: "Clasa a III-a B",
            category: "PRIMAR",
            teacher: "Prof. Floare Maria",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Limba Română" },
                        { time: "09:00", subject: "Matematică" },
                        { time: "10:00", subject: "Educație Fizică" },
                        { time: "11:00", subject: "Religie" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "4a",
            name: "Clasa a IV-a A",
            category: "PRIMAR",
            teacher: "Prof. Wendling Eva",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Educație Fizică" },
                        { time: "09:00", subject: "Limba Română" },
                        { time: "10:00", subject: "Științe ale naturii" },
                        { time: "11:00", subject: "Istorie" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },
        {
            id: "4b",
            name: "Clasa a IV-a B",
            category: "PRIMAR",
            teacher: "Prof. Teodorescu Raluca",
            schedule: [
                {
                    dayName: "Luni", slots: [
                        { time: "08:00", subject: "Limba Română" },
                        { time: "09:00", subject: "Matematică" },
                        { time: "10:00", subject: "Științe ale naturii" }
                    ]
                },
                { dayName: "Marți", slots: [] },
                { dayName: "Miercuri", slots: [] },
                { dayName: "Joi", slots: [] },
                { dayName: "Vineri", slots: [] }
            ]
        },

        // --- CICLUL GIMNAZIAL (Exemple, datele complete sunt în PDF) ---
        {
            id: "5a",
            name: "Clasa a V-a A",
            category: "GIMNAZIU",
            teacher: "Diriginte",
            mentions: "Pentru orarul complet, vă rugăm să descărcați PDF-ul de pe site sau să consultați catalogul electronic.",
            schedule: generateGymSchedule("5a")
        },
        { id: "5b", name: "Clasa a V-a B", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("5b") },
        { id: "6a", name: "Clasa a VI-a A", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("6a") },
        { id: "6b", name: "Clasa a VI-a B", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("6b") },
        { id: "7a", name: "Clasa a VII-a A", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("7a") },
        { id: "7b", name: "Clasa a VII-a B", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("7b") },
        { id: "8a", name: "Clasa a VIII-a A", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("8a") },
        { id: "8b", name: "Clasa a VIII-a B", category: "GIMNAZIU", teacher: "Diriginte", schedule: generateGymSchedule("8b") }
    ];

    // Helper pentru a genera orar gimnaziu (bazat pe exemplul de Luni)
    function generateGymSchedule(classId) {
        // Mapare simplificată pentru exemplul de Luni
        const mondayMap = {
            "5a": ["Matematică", "Tehnologie", "Română", "Engleză", "Istorie", "Biologie"],
            "5b": ["Română", "Română", "Matematică", "Desen", "Ed. Fizică", "Muzică"],
            "6a": ["Religie", "Franceză", "Istorie", "Matematică", "Biologie", "Ed. Fizică"],
            "6b": ["Engleză", "Opțional", "Biologie", "Geografie", "Română", "Istorie"],
            "7a": ["Ed. Fizică", "Engleză", "Matematică", "Istorie", "Chimie", "Română"],
            "7b": ["Franceză", "Matematică", "Engleză", "Biologie", "Fizică", "Chimie"],
            "8a": ["Română", "Desen", "Chimie", "Fizică", "Matematică", "Geografie"],
            "8b": ["Tehnologie", "Română", "Fizică", "Matematică", "Istorie", "Engleză"]
        };

        const mondaySlots = (mondayMap[classId] || []).map((subj, idx) => ({
            time: `${8 + idx}:00 - ${8 + idx + 1}:00`,
            subject: subj
        }));

        return [
            { dayName: "Luni", slots: mondaySlots },
            { dayName: "Marți", slots: [] },
            { dayName: "Miercuri", slots: [] },
            { dayName: "Joi", slots: [] },
            { dayName: "Vineri", slots: [] }
        ];
    }

    // 2. RENDERING SELECT OPTIONS
    renderOptions();

    function renderOptions() {
        const primarGroup = document.createElement('optgroup');
        primarGroup.label = "Ciclul Primar";
        primarGroup.className = "bg-navy-900 text-gold"; // Fallback class, CSS handles styles

        const gimnaziuGroup = document.createElement('optgroup');
        gimnaziuGroup.label = "Ciclul Gimnazial";

        SCHEDULE_DATA.forEach(cls => {
            const option = document.createElement('option');
            option.value = cls.id;
            option.textContent = cls.name;

            if (cls.category === 'PRIMAR') {
                primarGroup.appendChild(option);
            } else {
                gimnaziuGroup.appendChild(option);
            }
        });

        selector.appendChild(primarGroup);
        selector.appendChild(gimnaziuGroup);
    }

    // 3. EVENT LISTENERS
    selector.addEventListener('change', (e) => {
        const classId = e.target.value;
        const selectedClass = SCHEDULE_DATA.find(c => c.id === classId);
        if (selectedClass) {
            renderSchedule(selectedClass);
        }
    });

    // Maparea fișierelor PDF (Actualizat cu nume web-safe)
    const PDF_MAP = {
        "1a": "docs/Orar/orar_1a.pdf",
        "1b": "docs/Orar/orar_1b.pdf",
        "2a": "docs/Orar/orar_2a.pdf",
        "2b": "docs/Orar/orar_2b.pdf",
        "3a": "docs/Orar/orar_3a.pdf",
        "3b": "docs/Orar/orar_3b.pdf",
        "4a": "docs/Orar/orar_4a.pdf",
        "4b": "docs/Orar/orar_4b.pdf",
        // Pentru gimnaziu, folosim orarul general comun
        "5a": "docs/Orar/orar_gimnaziu.pdf",
        "5b": "docs/Orar/orar_gimnaziu.pdf",
        "6a": "docs/Orar/orar_gimnaziu.pdf",
        "6b": "docs/Orar/orar_gimnaziu.pdf",
        "7a": "docs/Orar/orar_gimnaziu.pdf",
        "7b": "docs/Orar/orar_gimnaziu.pdf",
        "8a": "docs/Orar/orar_gimnaziu.pdf",
        "8b": "docs/Orar/orar_gimnaziu.pdf"
    };

    // Check URL Hash for direct link (ex: #orar?clasa=1a - optional feature)
    // For now just basic hash link works to scroll to section

    // 4. MAIN RENDER FUNCTION
    function renderSchedule(classData) {
        const pdfLink = PDF_MAP[classData.id];

        // Create HTML structure
        const html = `
            <div class="animate-fade-in">
                <!-- Class Info Card -->
                <div class="class-info-card">
                    <div>
                        <h2 class="class-name-display">${classData.name}</h2>
                        ${classData.teacher ? `
                        <p class="class-teacher-display">
                            <span class="teacher-dot">●</span>
                            ${classData.teacher}
                        </p>
                        ` : ''}
                    </div>
                    
                    <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                        <div class="school-year-badge">
                            An școlar ${SCHOOL_YEAR}
                        </div>
                        ${pdfLink ? `
                        <a href="${pdfLink}" target="_blank" class="btn btn-primary" style="padding: 6px 16px; font-size: 0.875rem; display: flex; align-items: center; gap: 6px; text-decoration: none;">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                                <polyline points="7 10 12 15 17 10"></polyline>
                                <line x1="12" y1="15" x2="12" y2="3"></line>
                            </svg>
                            Descarcă PDF
                        </a>
                        ` : ''}
                    </div>
                </div>

                <!-- Schedule Grid -->
                <div class="schedule-grid">
                    ${classData.schedule.map(day => renderDayCard(day)).join('')}
                </div>

                <!-- Footer Mentions -->
                ${classData.mentions ? `
                <div class="schedule-mentions">
                    <svg xmlns="http://www.w3.org/2000/svg" class="mention-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="16" x2="12" y2="12"></line>
                        <line x1="12" y1="8" x2="12.01" y2="8"></line>
                    </svg>
                    <p class="mention-text">
                        ${classData.mentions}
                    </p>
                </div>
                ` : ''}
                 
                <!-- Buton Mare Download la final (redundant dar util) -->
                ${pdfLink ? `
                 <div class="gym-download-container" style="margin-top: 20px;">
                    <a href="${pdfLink}" class="btn btn-outline btn-large" target="_blank" style="width: 100%; justify-content: center; border: 2px dashed var(--gold);">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="margin-right: 8px;">
                            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                            <polyline points="14 2 14 8 20 8"></polyline>
                            <line x1="16" y1="13" x2="8" y2="13"></line>
                            <line x1="16" y1="17" x2="8" y2="17"></line>
                            <polyline points="10 9 9 9 8 9"></polyline>
                        </svg>
                        Vizualizează Orarul Oficial Complet (PDF)
                    </a>
                </div>
                ` : ''}
            </div>
        `;

        contentArea.innerHTML = html;

        // Re-attach tooltip logic listeners if needed (simple CSS hover is often enough)
    }

    function renderDayCard(day) {
        return `
            <div class="day-card">
                <div class="day-header">
                    <h3 class="day-title">${day.dayName}</h3>
                    <svg xmlns="http://www.w3.org/2000/svg" class="day-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                </div>
                <div class="day-slots">
                    ${day.slots.length > 0 ? day.slots.map(slot => renderSlot(slot)).join('') :
                '<div style="padding: 20px; text-align: center; color: #6b7280; font-style: italic; font-size: 0.9rem;">Pentru programul complet, vă rugăm să descărcați orarul PDF.</div>'}
                </div>
            </div>
        `;
    }

    function renderSlot(slot) {
        // Determinam daca are detalii (mock logic) for styling
        const hasDetails = slot.room || slot.teacher;
        const detailsClass = hasDetails ? 'has-details' : '';

        return `
            <div class="slot-item ${detailsClass}" title="${hasDetails ? 'Click pentru detalii' : ''}">
                <div class="slot-time">${slot.time.split(' ')[0]}</div>
                <div class="slot-subject">${slot.subject}</div>
                ${hasDetails ? `
                <svg xmlns="http://www.w3.org/2000/svg" class="slot-info-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                </svg>
                
                <!-- Tooltip Logic Simplificat (CSS Hover pt detalii extra ar fi ideal, aici punem doar titlu) -->
                ` : ''}
            </div>
        `;
    }
}
