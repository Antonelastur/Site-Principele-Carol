/**
 * CONTENT STRATEGIST ENGINE
 * Utility to transform raw administrative notes into high-impact digital content.
 */

const ContentEngine = {
    categories: ["Anunțuri", "Evenimente", "Administrativ", "CAROLine TV", "Performanță"],

    keywordsToLink: {
        "Regulament": "/documente/regulament-ordine-interioara",
        "Formular de înscriere": "/documente/inscrieri-2026",
        "Contactați secretariatul": "/contact",
        "Galerie Foto": "/galerie"
    },

    /**
     * Transforms raw text into a structured JSON and Markdown object.
     */
    process(rawInput) {
        const date = new Date().toLocaleDateString('ro-RO', { day: '2-digit', month: 'long', year: 'numeric' });

        // Logic to estimate reading time
        const words = rawInput.split(/\s+/).length;
        const readingTime = Math.ceil(words / 200) + " min";

        // Detect Category (simple heuristic)
        let category = "Anunțuri";
        if (rawInput.toLowerCase().includes("video") || rawInput.toLowerCase().includes("tv")) category = "CAROLine TV";
        if (rawInput.toLowerCase().includes("meci") || rawInput.toLowerCase().includes("cupa")) category = "Evenimente";

        // Transform terms to links
        let formattedBody = rawInput;
        Object.keys(this.keywordsToLink).forEach(key => {
            const regex = new RegExp(key, "gi");
            formattedBody = formattedBody.replace(regex, `[${key}](${this.keywordsToLink[key]})`);
        });

        // Highlight Dates (Regex for DD.MM.YYYY or similar)
        formattedBody = formattedBody.replace(/(\d{2}\.\d{2}\.\d{4})/g, "**$1**");

        return {
            metadata: {
                date,
                category,
                readingTime,
                status: "Draft",
                author: "Sistem Antigravity"
            },
            content: {
                raw: rawInput,
                formatted: formattedBody
            }
        };
    }
};

window.ContentEngine = ContentEngine;
