/**
 * VISUAL ENHANCEMENTS - Advanced Visual Effects
 * Cutting-edge animations and interactions for exceptional visual impact
 */

// ============================================
// 1. PARTICLE SYSTEM FOR HERO SECTION
// ============================================

class ParticleSystem {
    constructor(containerId, options = {}) {
        this.container = document.getElementById(containerId) || document.querySelector(containerId);
        if (!this.container) return;

        this.options = {
            particleCount: options.particleCount || 50,
            particleColor: options.particleColor || 'rgba(212, 175, 55, 0.5)',
            particleSize: options.particleSize || 2,
            connectionDistance: options.connectionDistance || 150,
            speed: options.speed || 0.5,
            ...options
        };

        this.particles = [];
        this.init();
    }

    init() {
        // Create canvas
        this.canvas = document.createElement('canvas');
        this.canvas.style.position = 'absolute';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';

        this.container.style.position = 'relative';
        this.container.insertBefore(this.canvas, this.container.firstChild);

        this.ctx = this.canvas.getContext('2d');
        this.resize();

        // Create particles
        this.createParticles();

        // Start animation
        this.animate();

        // Handle resize
        window.addEventListener('resize', () => this.resize());
    }

    resize() {
        this.canvas.width = this.container.offsetWidth;
        this.canvas.height = this.container.offsetHeight;
    }

    createParticles() {
        for (let i = 0; i < this.options.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * this.options.speed,
                vy: (Math.random() - 0.5) * this.options.speed,
                size: Math.random() * this.options.particleSize + 1
            });
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Update and draw particles
        this.particles.forEach((particle, i) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Bounce off edges
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;

            // Draw particle
            this.ctx.fillStyle = this.options.particleColor;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();

            // Draw connections
            this.particles.slice(i + 1).forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < this.options.connectionDistance) {
                    const opacity = (1 - distance / this.options.connectionDistance) * 0.5;
                    this.ctx.strokeStyle = `rgba(212, 175, 55, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.stroke();
                }
            });
        });

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 2. CUSTOM CURSOR EFFECTS
// ============================================

class CustomCursor {
    constructor() {
        this.cursor = document.createElement('div');
        this.cursorFollower = document.createElement('div');

        this.cursor.className = 'custom-cursor';
        this.cursorFollower.className = 'custom-cursor-follower';

        document.body.appendChild(this.cursor);
        document.body.appendChild(this.cursorFollower);

        this.mouseX = 0;
        this.mouseY = 0;
        this.followerX = 0;
        this.followerY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;

            this.cursor.style.left = this.mouseX + 'px';
            this.cursor.style.top = this.mouseY + 'px';
        });

        // Animate follower
        this.animateFollower();

        // Add hover effects
        const interactiveElements = document.querySelectorAll('a, button, .course-card, .btn, .nav-link');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                this.cursor.classList.add('cursor-hover');
                this.cursorFollower.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', () => {
                this.cursor.classList.remove('cursor-hover');
                this.cursorFollower.classList.remove('cursor-hover');
            });
        });
    }

    animateFollower() {
        const dx = this.mouseX - this.followerX;
        const dy = this.mouseY - this.followerY;

        this.followerX += dx / 10;
        this.followerY += dy / 10;

        this.cursorFollower.style.left = this.followerX + 'px';
        this.cursorFollower.style.top = this.followerY + 'px';

        requestAnimationFrame(() => this.animateFollower());
    }
}

// ============================================
// 3. 3D TILT EFFECT FOR CARDS
// ============================================

class TiltEffect {
    static init(selector = '.course-card, .resource-card, .publication-category') {
        const cards = document.querySelectorAll(selector);

        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
            });
        });
    }
}

// ============================================
// 4. ADVANCED TEXT REVEAL ANIMATIONS
// ============================================

class TextReveal {
    static init(selector = '.hero-title, .section-title') {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            const text = element.textContent;
            element.innerHTML = '';

            // Split into characters
            text.split('').forEach((char, index) => {
                const span = document.createElement('span');
                span.textContent = char === ' ' ? '\u00A0' : char;
                span.style.display = 'inline-block';
                span.style.opacity = '0';
                span.style.transform = 'translateY(20px)';
                span.style.animation = `revealChar 0.6s ease forwards ${index * 0.03}s`;
                element.appendChild(span);
            });
        });
    }
}

// ============================================
// 5. MAGNETIC BUTTONS
// ============================================

class MagneticButton {
    static init(selector = '.btn') {
        const buttons = document.querySelectorAll(selector);

        buttons.forEach(button => {
            button.addEventListener('mousemove', (e) => {
                const rect = button.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;

                button.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
            });

            button.addEventListener('mouseleave', () => {
                button.style.transform = 'translate(0, 0)';
            });
        });
    }
}

// ============================================
// 6. SCROLL-TRIGGERED ANIMATIONS
// ============================================

class ScrollAnimations {
    constructor() {
        this.observer = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');

                        // Stagger children if present
                        const children = entry.target.querySelectorAll('.stagger-item');
                        children.forEach((child, index) => {
                            setTimeout(() => {
                                child.classList.add('animated');
                            }, index * 100);
                        });
                    }
                });
            },
            { threshold: 0.1 }
        );

        this.init();
    }

    init() {
        // Add animation classes to elements
        const animatedElements = document.querySelectorAll(`
            .course-card,
            .publication-category,
            .resource-card,
            .legacy-card,
            .about-content,
            .harris-bio,
            .stats-grid
        `);

        animatedElements.forEach(el => {
            el.classList.add('scroll-animate');
            this.observer.observe(el);
        });
    }
}

// ============================================
// 7. ANIMATED GRADIENT BACKGROUND
// ============================================

class AnimatedGradient {
    static init(selector) {
        const element = document.querySelector(selector);
        if (!element) return;

        let hue = 0;

        setInterval(() => {
            hue = (hue + 1) % 360;
            element.style.background = `
                linear-gradient(
                    135deg,
                    hsl(${hue}, 45%, 35%) 0%,
                    hsl(${(hue + 30) % 360}, 45%, 40%) 50%,
                    hsl(${(hue + 60) % 360}, 45%, 50%) 100%
                )
            `;
        }, 50);
    }
}

// ============================================
// 8. PARALLAX SCROLL EFFECTS
// ============================================

class ParallaxScroll {
    static init() {
        const parallaxElements = document.querySelectorAll('[data-parallax]');

        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;

            parallaxElements.forEach(element => {
                const speed = element.dataset.parallax || 0.5;
                const yPos = -(scrolled * speed);
                element.style.transform = `translateY(${yPos}px)`;
            });
        });
    }
}

// ============================================
// 9. RIPPLE EFFECT ON CLICK
// ============================================

class RippleEffect {
    static init(selector = '.btn, .course-card, button') {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                ripple.className = 'ripple-effect';

                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;

                ripple.style.width = ripple.style.height = size + 'px';
                ripple.style.left = x + 'px';
                ripple.style.top = y + 'px';

                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);

                setTimeout(() => ripple.remove(), 600);
            });
        });
    }
}

// ============================================
// 10. FLOATING ELEMENTS
// ============================================

class FloatingAnimation {
    static init(selector = '.hero-content') {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.style.animation = 'float 6s ease-in-out infinite';
        });
    }
}

// ============================================
// 11. SMOOTH PAGE TRANSITIONS
// ============================================

class PageTransitions {
    static init() {
        // Add page transition overlay
        const overlay = document.createElement('div');
        overlay.className = 'page-transition-overlay';
        document.body.appendChild(overlay);

        // Fade in on load
        window.addEventListener('load', () => {
            document.body.classList.add('page-loaded');
        });

        // Smooth transitions for internal links
        document.querySelectorAll('a[href^="course-"]').forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const href = link.getAttribute('href');

                overlay.classList.add('active');
                setTimeout(() => {
                    window.location.href = href;
                }, 500);
            });
        });
    }
}

// ============================================
// 12. GLOW EFFECT ON HOVER
// ============================================

class GlowEffect {
    static init(selector = '.course-card, .btn-primary') {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                element.style.setProperty('--mouse-x', x + 'px');
                element.style.setProperty('--mouse-y', y + 'px');
            });
        });
    }
}

// ============================================
// 13. SCROLL PROGRESS INDICATOR
// ============================================

class ScrollProgress {
    static init() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress-bar';
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (scrollTop / docHeight) * 100;

            progressBar.style.width = progress + '%';
        });
    }
}

// ============================================
// 14. BLOB ANIMATION BACKGROUND
// ============================================

class BlobAnimation {
    static create(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const svg = `
            <svg class="blob-svg" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                <defs>
                    <linearGradient id="blob-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" style="stop-color:rgba(212, 175, 55, 0.3);stop-opacity:1" />
                        <stop offset="100%" style="stop-color:rgba(139, 69, 19, 0.3);stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path fill="url(#blob-gradient)" class="blob-path">
                    <animate attributeName="d" dur="10s" repeatCount="indefinite"
                        values="M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,15.6,81.4,31.2,72.9,43.8C64.4,56.4,53,66,39.9,71.8C26.8,77.6,12,79.6,-3.1,85.2C-18.2,90.8,-36.4,99.9,-50.2,95.4C-64,90.9,-73.4,72.8,-80.1,55.1C-86.8,37.4,-90.8,18.7,-89.7,0.8C-88.6,-17.1,-82.4,-34.2,-73.3,-48.4C-64.2,-62.6,-52.2,-73.9,-38.5,-81.3C-24.8,-88.7,-9.4,-92.2,4.2,-99.1C17.8,-106,30.6,-83.6,44.7,-76.4Z;
                        M39.3,-67.5C51.4,-61.6,62.3,-52.3,69.4,-40.4C76.5,-28.5,79.8,-14.2,79.7,-0.1C79.6,14.1,76.1,28.2,68.9,39.8C61.7,51.4,50.8,60.5,38.6,66.8C26.4,73.1,13.2,76.6,-0.7,77.8C-14.6,79,-29.2,77.9,-41.4,71.8C-53.6,65.7,-63.4,54.6,-70.1,41.9C-76.8,29.2,-80.4,14.6,-80.2,0.1C-80,-14.4,-76,-28.8,-68.7,-40.4C-61.4,-52,-50.8,-60.8,-39.1,-67C-27.4,-73.2,-13.7,-76.8,0.3,-77.3C14.3,-77.8,27.2,-73.4,39.3,-67.5Z;
                        M44.7,-76.4C58.8,-69.2,71.8,-59.1,79.6,-45.8C87.4,-32.6,90,-16.3,88.5,-0.9C87,15.6,81.4,31.2,72.9,43.8C64.4,56.4,53,66,39.9,71.8C26.8,77.6,12,79.6,-3.1,85.2C-18.2,90.8,-36.4,99.9,-50.2,95.4C-64,90.9,-73.4,72.8,-80.1,55.1C-86.8,37.4,-90.8,18.7,-89.7,0.8C-88.6,-17.1,-82.4,-34.2,-73.3,-48.4C-64.2,-62.6,-52.2,-73.9,-38.5,-81.3C-24.8,-88.7,-9.4,-92.2,4.2,-99.1C17.8,-106,30.6,-83.6,44.7,-76.4Z"
                    />
                </path>
            </svg>
        `;

        container.insertAdjacentHTML('beforeend', svg);
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🎨 Initializing Visual Enhancements...');

    // Only initialize custom cursor on desktop
    if (window.innerWidth > 768) {
        new CustomCursor();
    }

    // Initialize particle system for hero
    if (document.querySelector('.hero')) {
        new ParticleSystem('.hero', {
            particleCount: 60,
            particleColor: 'rgba(212, 175, 55, 0.6)',
            connectionDistance: 120
        });
    }

    // Initialize tilt effects
    TiltEffect.init();

    // Initialize magnetic buttons
    MagneticButton.init('.btn');

    // Initialize scroll animations
    new ScrollAnimations();

    // Initialize ripple effects
    RippleEffect.init();

    // Initialize floating animations
    FloatingAnimation.init();

    // Initialize parallax
    ParallaxScroll.init();

    // Initialize glow effects
    GlowEffect.init();

    // Initialize scroll progress
    ScrollProgress.init();

    // Initialize page transitions
    PageTransitions.init();

    // Add blob animations to sections
    if (document.querySelector('.publications')) {
        BlobAnimation.create('publications');
    }

    console.log('✨ Visual Enhancements Loaded!');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        ParticleSystem,
        CustomCursor,
        TiltEffect,
        TextReveal,
        MagneticButton,
        ScrollAnimations,
        AnimatedGradient,
        ParallaxScroll,
        RippleEffect,
        FloatingAnimation,
        PageTransitions,
        GlowEffect,
        ScrollProgress,
        BlobAnimation
    };
}
