/**
 * ADVANCED FEATURES - Premium Interactive Elements
 * Next-level interactivity and visual effects
 */

// ============================================
// 1. ADVANCED COURSE CARD WITH FLIP EFFECT
// ============================================

class FlipCards {
    static init(selector = '.course-card-flip') {
        const cards = document.querySelectorAll(selector);

        cards.forEach(card => {
            card.addEventListener('click', () => {
                card.classList.toggle('flipped');
            });
        });
    }

    static createFlipCard(courseData) {
        return `
            <div class="course-card-flip">
                <div class="card-flip-inner">
                    <div class="card-flip-front">
                        <div class="course-icon">${courseData.icon || '📚'}</div>
                        <h4>${courseData.title}</h4>
                        <p class="course-level">${courseData.level}</p>
                        <p class="course-modules">${courseData.modules} modules</p>
                        <span class="flip-hint">Click to learn more</span>
                    </div>
                    <div class="card-flip-back">
                        <h4>${courseData.title}</h4>
                        <p class="course-description">${courseData.description}</p>
                        <ul class="course-highlights">
                            ${courseData.highlights.map(h => `<li>${h}</li>`).join('')}
                        </ul>
                        <button class="btn-enroll">Enroll Now</button>
                    </div>
                </div>
            </div>
        `;
    }
}

// ============================================
// 2. ANIMATED STATISTICS COUNTER
// ============================================

class AnimatedCounter {
    static init(selector = '.stat-number') {
        const counters = document.querySelectorAll(selector);

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
                    this.animateCounter(entry.target);
                    entry.target.classList.add('counted');
                }
            });
        }, { threshold: 0.5 });

        counters.forEach(counter => observer.observe(counter));
    }

    static animateCounter(element) {
        const target = parseInt(element.textContent.replace(/\D/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateCounter = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current).toLocaleString();
                requestAnimationFrame(updateCounter);
            } else {
                element.textContent = target.toLocaleString();
            }
        };

        updateCounter();
    }
}

// ============================================
// 3. INTERACTIVE COURSE PATHWAY VISUALIZATION
// ============================================

class CoursePathway {
    constructor(containerId, courses) {
        this.container = document.getElementById(containerId);
        this.courses = courses;
        this.init();
    }

    init() {
        if (!this.container) return;

        const svg = this.createSVGPathway();
        this.container.innerHTML = svg;
        this.animatePathway();
    }

    createSVGPathway() {
        const width = this.container.offsetWidth;
        const height = 600;
        const nodeCount = this.courses.length;
        const spacing = width / (nodeCount + 1);

        let svgContent = `
            <svg width="${width}" height="${height}" class="pathway-svg">
                <defs>
                    <linearGradient id="pathway-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" style="stop-color:#8B4513;stop-opacity:1" />
                        <stop offset="50%" style="stop-color:#D4AF37;stop-opacity:1" />
                        <stop offset="100%" style="stop-color:#C19A6B;stop-opacity:1" />
                    </linearGradient>
                </defs>
                <path class="pathway-line" stroke="url(#pathway-gradient)" stroke-width="4" fill="none"
                    d="M ${spacing} 300
        `;

        for (let i = 1; i < nodeCount; i++) {
            const x = spacing * (i + 1);
            const y = 300 + Math.sin(i * 0.5) * 100;
            svgContent += `L ${x} ${y} `;
        }

        svgContent += `" />`;

        this.courses.forEach((course, i) => {
            const x = spacing * (i + 1);
            const y = 300 + Math.sin(i * 0.5) * 100;

            svgContent += `
                <g class="pathway-node" data-index="${i}">
                    <circle cx="${x}" cy="${y}" r="40" fill="var(--primary-color)"
                        stroke="var(--secondary-color)" stroke-width="3" class="node-circle" />
                    <text x="${x}" y="${y + 5}" text-anchor="middle" fill="white"
                        font-weight="bold" font-size="14">${i + 1}</text>
                    <text x="${x}" y="${y + 70}" text-anchor="middle" fill="var(--text-dark)"
                        font-size="12" class="node-label">${course.title}</text>
                </g>
            `;
        });

        svgContent += `</svg>`;
        return svgContent;
    }

    animatePathway() {
        const nodes = this.container.querySelectorAll('.pathway-node');

        nodes.forEach((node, index) => {
            setTimeout(() => {
                node.classList.add('animated');
                node.style.animation = 'nodeAppear 0.5s ease forwards';
            }, index * 200);

            node.addEventListener('mouseenter', () => {
                const circle = node.querySelector('.node-circle');
                circle.style.transform = 'scale(1.2)';
                circle.style.transition = 'transform 0.3s ease';
            });

            node.addEventListener('mouseleave', () => {
                const circle = node.querySelector('.node-circle');
                circle.style.transform = 'scale(1)';
            });
        });
    }
}

// ============================================
// 4. PARTICLE BURST ON CLICK
// ============================================

class ParticleBurst {
    static createBurst(x, y, color = '#D4AF37') {
        const particleCount = 20;
        const container = document.createElement('div');
        container.className = 'particle-burst-container';
        container.style.position = 'fixed';
        container.style.left = x + 'px';
        container.style.top = y + 'px';
        container.style.pointerEvents = 'none';
        container.style.zIndex = '10000';

        for (let i = 0; i < particleCount; i++) {
            const particle = document.createElement('div');
            particle.className = 'burst-particle';
            particle.style.position = 'absolute';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.borderRadius = '50%';
            particle.style.background = color;

            const angle = (Math.PI * 2 * i) / particleCount;
            const velocity = 100 + Math.random() * 100;
            const dx = Math.cos(angle) * velocity;
            const dy = Math.sin(angle) * velocity;

            particle.animate([
                { transform: 'translate(0, 0)', opacity: 1 },
                { transform: `translate(${dx}px, ${dy}px)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'cubic-bezier(0, .9, .57, 1)'
            });

            container.appendChild(particle);
        }

        document.body.appendChild(container);
        setTimeout(() => container.remove(), 1000);
    }

    static init(selector = '.btn-primary') {
        const elements = document.querySelectorAll(selector);
        elements.forEach(element => {
            element.addEventListener('click', (e) => {
                this.createBurst(e.clientX, e.clientY);
            });
        });
    }
}

// ============================================
// 5. MORPHING BLOB CURSOR FOLLOWER
// ============================================

class BlobCursor {
    constructor() {
        this.blob = document.createElement('div');
        this.blob.className = 'blob-cursor';
        document.body.appendChild(this.blob);

        this.x = 0;
        this.y = 0;
        this.targetX = 0;
        this.targetY = 0;

        this.init();
    }

    init() {
        document.addEventListener('mousemove', (e) => {
            this.targetX = e.clientX;
            this.targetY = e.clientY;
        });

        this.animate();
    }

    animate() {
        this.x += (this.targetX - this.x) * 0.15;
        this.y += (this.targetY - this.y) * 0.15;

        this.blob.style.left = this.x + 'px';
        this.blob.style.top = this.y + 'px';

        requestAnimationFrame(() => this.animate());
    }
}

// ============================================
// 6. SCROLL-BASED PARALLAX IMAGE
// ============================================

class ParallaxImage {
    static init(selector = '[data-parallax-image]') {
        const images = document.querySelectorAll(selector);

        window.addEventListener('scroll', () => {
            images.forEach(image => {
                const speed = parseFloat(image.dataset.parallaxImage) || 0.5;
                const rect = image.getBoundingClientRect();
                const scrolled = window.pageYOffset;
                const offset = (rect.top + scrolled) * speed;

                image.style.transform = `translateY(${offset}px)`;
            });
        });
    }
}

// ============================================
// 7. TYPING ANIMATION EFFECT
// ============================================

class TypingEffect {
    constructor(element, text, speed = 50) {
        this.element = element;
        this.text = text;
        this.speed = speed;
        this.index = 0;
    }

    start() {
        this.element.textContent = '';
        this.type();
    }

    type() {
        if (this.index < this.text.length) {
            this.element.textContent += this.text.charAt(this.index);
            this.index++;
            setTimeout(() => this.type(), this.speed);
        }
    }

    static init(selector = '.typing-effect') {
        const elements = document.querySelectorAll(selector);
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const text = entry.target.dataset.text || entry.target.textContent;
                    const speed = parseInt(entry.target.dataset.speed) || 50;
                    const typing = new TypingEffect(entry.target, text, speed);
                    typing.start();
                    observer.unobserve(entry.target);
                }
            });
        });

        elements.forEach(el => observer.observe(el));
    }
}

// ============================================
// 8. 3D CARD STACK EFFECT
// ============================================

class CardStack {
    static init(containerSelector = '.card-stack') {
        const containers = document.querySelectorAll(containerSelector);

        containers.forEach(container => {
            const cards = container.querySelectorAll('.stack-card');

            cards.forEach((card, index) => {
                card.style.transform = `translateY(${index * 20}px) scale(${1 - index * 0.05})`;
                card.style.zIndex = cards.length - index;
                card.style.opacity = 1 - index * 0.15;

                card.addEventListener('click', () => {
                    // Move clicked card to back
                    container.appendChild(card);
                    this.restack(container);
                });
            });
        });
    }

    static restack(container) {
        const cards = container.querySelectorAll('.stack-card');
        cards.forEach((card, index) => {
            card.style.transform = `translateY(${index * 20}px) scale(${1 - index * 0.05})`;
            card.style.zIndex = cards.length - index;
            card.style.opacity = 1 - index * 0.15;
            card.style.transition = 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
        });
    }
}

// ============================================
// 9. INFINITE SCROLL GALLERY
// ============================================

class InfiniteScroll {
    constructor(containerId, loadMoreCallback) {
        this.container = document.getElementById(containerId);
        this.loadMoreCallback = loadMoreCallback;
        this.loading = false;
        this.init();
    }

    init() {
        window.addEventListener('scroll', () => {
            if (this.isNearBottom() && !this.loading) {
                this.loading = true;
                this.showLoader();
                this.loadMoreCallback(() => {
                    this.loading = false;
                    this.hideLoader();
                });
            }
        });
    }

    isNearBottom() {
        const scrollTop = window.pageYOffset;
        const windowHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        return scrollTop + windowHeight >= docHeight - 200;
    }

    showLoader() {
        const loader = document.createElement('div');
        loader.className = 'infinite-scroll-loader';
        loader.innerHTML = '<div class="loading-spinner"></div>';
        this.container.appendChild(loader);
    }

    hideLoader() {
        const loader = this.container.querySelector('.infinite-scroll-loader');
        if (loader) loader.remove();
    }
}

// ============================================
// 10. MODAL WITH ADVANCED ANIMATIONS
// ============================================

class AdvancedModal {
    constructor(options = {}) {
        this.options = {
            title: options.title || 'Modal Title',
            content: options.content || '',
            animation: options.animation || 'scale', // scale, slide, fade
            ...options
        };

        this.create();
    }

    create() {
        this.overlay = document.createElement('div');
        this.overlay.className = `modal-overlay modal-${this.options.animation}`;

        this.modal = document.createElement('div');
        this.modal.className = 'modal-advanced';
        this.modal.innerHTML = `
            <div class="modal-header">
                <h3>${this.options.title}</h3>
                <button class="modal-close">&times;</button>
            </div>
            <div class="modal-body">
                ${this.options.content}
            </div>
            <div class="modal-footer">
                <button class="btn btn-secondary modal-cancel">Cancel</button>
                <button class="btn btn-primary modal-confirm">Confirm</button>
            </div>
        `;

        this.overlay.appendChild(this.modal);
        document.body.appendChild(this.overlay);

        this.attachEvents();
    }

    attachEvents() {
        const close = this.modal.querySelector('.modal-close');
        const cancel = this.modal.querySelector('.modal-cancel');

        close.addEventListener('click', () => this.close());
        cancel.addEventListener('click', () => this.close());
        this.overlay.addEventListener('click', (e) => {
            if (e.target === this.overlay) this.close();
        });
    }

    open() {
        this.overlay.classList.add('active');
    }

    close() {
        this.overlay.classList.remove('active');
        setTimeout(() => {
            this.overlay.remove();
        }, 300);
    }
}

// ============================================
// 11. COURSE PROGRESS RING
// ============================================

class ProgressRing {
    constructor(element, progress) {
        this.element = element;
        this.progress = progress;
        this.draw();
    }

    draw() {
        const size = 120;
        const strokeWidth = 10;
        const radius = (size - strokeWidth) / 2;
        const circumference = radius * 2 * Math.PI;
        const offset = circumference - (this.progress / 100) * circumference;

        this.element.innerHTML = `
            <svg width="${size}" height="${size}" class="progress-ring-svg">
                <circle
                    class="progress-ring-circle-bg"
                    stroke="#e0e0e0"
                    stroke-width="${strokeWidth}"
                    fill="transparent"
                    r="${radius}"
                    cx="${size / 2}"
                    cy="${size / 2}"
                />
                <circle
                    class="progress-ring-circle"
                    stroke="url(#progress-gradient)"
                    stroke-width="${strokeWidth}"
                    stroke-dasharray="${circumference} ${circumference}"
                    stroke-dashoffset="${offset}"
                    stroke-linecap="round"
                    fill="transparent"
                    r="${radius}"
                    cx="${size / 2}"
                    cy="${size / 2}"
                    transform="rotate(-90 ${size / 2} ${size / 2})"
                />
                <defs>
                    <linearGradient id="progress-gradient">
                        <stop offset="0%" stop-color="#8B4513" />
                        <stop offset="100%" stop-color="#D4AF37" />
                    </linearGradient>
                </defs>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em"
                    font-size="24" font-weight="bold" fill="var(--primary-color)">
                    ${this.progress}%
                </text>
            </svg>
        `;
    }

    static init(selector = '.progress-ring') {
        const rings = document.querySelectorAll(selector);
        rings.forEach(ring => {
            const progress = parseInt(ring.dataset.progress) || 0;
            new ProgressRing(ring, progress);
        });
    }
}

// ============================================
// 12. CONFETTI CELEBRATION
// ============================================

class Confetti {
    static celebrate(duration = 3000) {
        const colors = ['#8B4513', '#D4AF37', '#C19A6B', '#A0522D'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            setTimeout(() => {
                this.createConfetto(colors[Math.floor(Math.random() * colors.length)]);
            }, i * 30);
        }
    }

    static createConfetto(color) {
        const confetto = document.createElement('div');
        confetto.className = 'confetto';
        confetto.style.left = Math.random() * window.innerWidth + 'px';
        confetto.style.backgroundColor = color;
        confetto.style.animationDuration = (Math.random() * 3 + 2) + 's';

        document.body.appendChild(confetto);
        setTimeout(() => confetto.remove(), 5000);
    }
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Advanced Features...');

    // Initialize animated counters
    AnimatedCounter.init();

    // Initialize flip cards
    FlipCards.init();

    // Initialize particle burst
    ParticleBurst.init('.btn-primary, .btn-enroll');

    // Initialize parallax images
    ParallaxImage.init();

    // Initialize typing effects
    TypingEffect.init();

    // Initialize card stacks
    CardStack.init();

    // Initialize progress rings
    ProgressRing.init();

    // Celebrate course completion (example)
    document.querySelectorAll('[data-course-complete]').forEach(btn => {
        btn.addEventListener('click', () => {
            Confetti.celebrate();
        });
    });

    console.log('✨ Advanced Features Loaded!');
});

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        FlipCards,
        AnimatedCounter,
        CoursePathway,
        ParticleBurst,
        BlobCursor,
        ParallaxImage,
        TypingEffect,
        CardStack,
        InfiniteScroll,
        AdvancedModal,
        ProgressRing,
        Confetti
    };
}
