/**
 * AETHERIC KINETIC GRID - Vanilla JS Version
 * Elite Creative Technology Module for Antigravity Framework
 */

class AethericGrid {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId);
        this.options = {
            particleCount: options.particleCount || 150,
            particleColor: options.particleColor || '#FFD700', // Gold
            lineColor: options.lineColor || 'rgba(26, 43, 72, 0.2)', // Navy Blue soft
            repulsionRadius: options.repulsionRadius || 150,
            inertia: options.inertia || 0.95,
            ...options
        };

        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: -1000, y: -1000 };

        this.init();
    }

    init() {
        this.container.appendChild(this.canvas);
        this.resize();
        this.createParticles();
        this.bindEvents();
        this.animate();
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    bindEvents() {
        window.addEventListener('resize', () => this.resize());
        this.container.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouse.x = e.clientX - rect.left;
            this.mouse.y = e.clientY - rect.top;
        });
        this.container.addEventListener('mouseleave', () => {
            this.mouse.x = -1000;
            this.mouse.y = -1000;
        });

        // Mobile support: Gyroscopic movement
        if (window.DeviceOrientationEvent) {
            window.addEventListener('deviceorientation', (e) => {
                this.mouse.x = (e.gamma + 90) * (this.canvas.width / 180);
                this.mouse.y = (e.beta + 90) * (this.canvas.height / 180);
            });
        }
    }

    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                originalX: 0,
                originalY: 0,
                size: Math.random() * 2 + 1
            });
        }
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = 0; i < this.particles.length; i++) {
            const p = this.particles[i];

            // Antigravity Logic
            const dx = this.mouse.x - p.x;
            const dy = this.mouse.y - p.y;
            const dist = Math.sqrt(dx * dx + dy * dy);

            if (dist < this.options.repulsionRadius) {
                const force = (this.options.repulsionRadius - dist) / this.options.repulsionRadius;
                p.vx -= (dx / dist) * force * 0.5;
                p.vy -= (dy / dist) * force * 0.5;
            }

            // Inertia and Movement
            p.vx *= this.options.inertia;
            p.vy *= this.options.inertia;
            p.x += p.vx + (Math.random() - 0.5) * 0.2; // Brownian noise
            p.y += p.vy + (Math.random() - 0.5) * 0.2;

            // Boundary checks
            if (p.x < 0) p.x = this.canvas.width;
            if (p.x > this.canvas.width) p.x = 0;
            if (p.y < 0) p.y = this.canvas.height;
            if (p.y > this.canvas.height) p.y = 0;

            // Draw Particle
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw Connections (Neural Mesh)
            for (let j = i + 1; j < this.particles.length; j++) {
                const p2 = this.particles[j];
                const dx2 = p.x - p2.x;
                const dy2 = p.y - p2.y;
                const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                if (dist2 < 100) {
                    this.ctx.strokeStyle = this.options.lineColor;
                    this.ctx.lineWidth = 1 - dist2 / 100;
                    this.ctx.beginPath();
                    this.ctx.moveTo(p.x, p.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.stroke();
                }
            }
        }
    }

    animate() {
        this.draw();
        requestAnimationFrame(() => this.animate());
    }
}

// Export for modern environments
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AethericGrid;
} else {
    window.AethericGrid = AethericGrid;
}
