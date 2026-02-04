/**
 * ARTIFACT INTEGRITY SHIELD - Core Logic
 * Intercepts errors and validates UI constraints within an isolated environment.
 */

class IntegrityShield {
    constructor() {
        this.status = {
            console: { ok: true, messages: [] },
            overflow: { ok: true, elements: [] },
            assets: { ok: true, failed: [] },
            accessibility: { ok: true, warnings: [] }
        };
        this.init();
    }

    init() {
        this.interceptErrors();
        this.checkAssets();
        this.checkOverflow();
        this.checkARIA();
    }

    interceptErrors() {
        const originalError = console.error;
        console.error = (...args) => {
            this.status.console.ok = false;
            this.status.console.messages.push(args.join(' '));
            originalError.apply(console, args);
            this.updateDashboard();
        };

        window.onerror = (msg, url, line) => {
            this.status.console.ok = false;
            this.status.console.messages.push(`JS Error: ${msg} at ${line}`);
            this.updateDashboard();
            return false;
        };
    }

    checkAssets() {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            if (!img.complete || img.naturalWidth === 0) {
                img.onerror = () => {
                    this.status.assets.ok = false;
                    this.status.assets.failed.push(img.src);
                    this.updateDashboard();
                };
            }
        });
    }

    checkOverflow() {
        const elements = document.querySelectorAll('*');
        elements.forEach(el => {
            if (el.offsetWidth > window.innerWidth) {
                this.status.overflow.ok = false;
                this.status.overflow.elements.push(el.tagName + (el.id ? '#' + el.id : ''));
            }
        });
        this.updateDashboard();
    }

    checkARIA() {
        const interactive = document.querySelectorAll('button, a, input, select');
        interactive.forEach(el => {
            if (!el.getAttribute('aria-label') && !el.innerText && !el.placeholder) {
                this.status.accessibility.ok = false;
                this.status.accessibility.warnings.push('Interactive element missing label');
            }
        });
        this.updateDashboard();
    }

    updateDashboard() {
        const event = new CustomEvent('shield-update', { detail: this.status });
        window.parent.dispatchEvent(event);
    }
}

// Auto-init only in development/artifact mode
if (window.location.search.includes('mode=artifact')) {
    window.shield = new IntegrityShield();
}
