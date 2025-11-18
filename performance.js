// ===================================
// PERFORMANCE ENHANCEMENTS
// ===================================

class PerformanceOptimizer {
    constructor() {
        this.init();
    }

    init() {
        this.setupLazyLoading();
        this.createSkeletonScreens();
        this.optimizeAnimations();
        this.enableProgressiveEnhancement();
        this.implementServiceWorker();
        this.optimizeImages();
    }

    // ===================================
    // Lazy Loading Implementation
    // ===================================
    setupLazyLoading() {
        // Intersection Observer for lazy loading
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    this.loadImage(img);
                    observer.unobserve(img);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.01
        });

        // Observe all images with data-src attribute
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });

        // Lazy load sections
        this.setupSectionLazyLoading();

        // Lazy load course cards
        this.setupCourseLazyLoading();
    }

    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;

        // Show loading state
        img.classList.add('loading');

        const tempImg = new Image();
        tempImg.onload = () => {
            img.src = src;
            img.classList.remove('loading');
            img.classList.add('loaded');
            img.removeAttribute('data-src');
        };

        tempImg.onerror = () => {
            img.classList.remove('loading');
            img.classList.add('error');
        };

        tempImg.src = src;
    }

    setupSectionLazyLoading() {
        const sectionObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const section = entry.target;

                    // Load section content
                    if (section.hasAttribute('data-lazy-section')) {
                        this.loadSectionContent(section);
                        section.removeAttribute('data-lazy-section');
                    }

                    // Trigger animations
                    section.classList.add('section-visible');
                }
            });
        }, {
            rootMargin: '100px 0px',
            threshold: 0.1
        });

        document.querySelectorAll('section').forEach(section => {
            sectionObserver.observe(section);
        });
    }

    setupCourseLazyLoading() {
        const courseObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    card.classList.add('card-visible');

                    // Load any deferred content
                    this.loadDeferredContent(card);
                }
            });
        }, {
            rootMargin: '50px 0px',
            threshold: 0.1
        });

        // Observe course cards as they're added
        const observeCourseCards = () => {
            document.querySelectorAll('.course-card, .enhanced-course-card').forEach(card => {
                if (!card.classList.contains('observed')) {
                    courseObserver.observe(card);
                    card.classList.add('observed');
                }
            });
        };

        observeCourseCards();

        // Re-observe when new cards are added
        const cardObserver = new MutationObserver(observeCourseCards);
        cardObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    loadSectionContent(section) {
        // Placeholder for loading section-specific content
        const sectionId = section.id;
        console.log(`Loading content for section: ${sectionId}`);
    }

    loadDeferredContent(element) {
        // Load any content marked as deferred
        const deferredElements = element.querySelectorAll('[data-deferred]');
        deferredElements.forEach(el => {
            const content = el.getAttribute('data-deferred');
            if (content) {
                el.innerHTML = content;
                el.removeAttribute('data-deferred');
            }
        });
    }

    // ===================================
    // Skeleton Screens for Loading States
    // ===================================
    createSkeletonScreens() {
        this.injectSkeletonStyles();

        // Create skeleton templates
        this.skeletonTemplates = {
            courseCard: this.createCourseCardSkeleton(),
            resourceCard: this.createResourceCardSkeleton(),
            discussionItem: this.createDiscussionSkeleton(),
            timeline: this.createTimelineSkeleton()
        };
    }

    injectSkeletonStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .skeleton {
                background: linear-gradient(90deg,
                    #f0f0f0 25%,
                    #e0e0e0 50%,
                    #f0f0f0 75%
                );
                background-size: 200% 100%;
                animation: skeleton-loading 1.5s ease-in-out infinite;
                border-radius: 4px;
            }

            @keyframes skeleton-loading {
                0% {
                    background-position: 200% 0;
                }
                100% {
                    background-position: -200% 0;
                }
            }

            .skeleton-text {
                height: 1em;
                margin: 0.5em 0;
            }

            .skeleton-title {
                height: 1.5em;
                width: 70%;
                margin: 0.5em 0;
            }

            .skeleton-avatar {
                width: 40px;
                height: 40px;
                border-radius: 50%;
            }

            .skeleton-card {
                padding: 20px;
                margin: 10px 0;
                border: 1px solid #e0e0e0;
                border-radius: 8px;
            }

            .skeleton-button {
                height: 40px;
                width: 120px;
                border-radius: 4px;
            }

            .fade-in {
                animation: fadeIn 0.3s ease-in;
            }

            @keyframes fadeIn {
                from {
                    opacity: 0;
                    transform: translateY(10px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
        `;
        document.head.appendChild(style);
    }

    createCourseCardSkeleton() {
        return `
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 90%"></div>
                <div class="skeleton skeleton-text" style="width: 60%"></div>
                <div style="display: flex; justify-content: space-between; margin-top: 20px;">
                    <div class="skeleton skeleton-button"></div>
                    <div class="skeleton skeleton-button"></div>
                </div>
            </div>
        `;
    }

    createResourceCardSkeleton() {
        return `
            <div class="skeleton-card">
                <div class="skeleton skeleton-title"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 80%"></div>
            </div>
        `;
    }

    createDiscussionSkeleton() {
        return `
            <div class="skeleton-card" style="display: flex; gap: 15px;">
                <div class="skeleton skeleton-avatar"></div>
                <div style="flex: 1;">
                    <div class="skeleton skeleton-title"></div>
                    <div class="skeleton skeleton-text"></div>
                    <div class="skeleton skeleton-text" style="width: 70%"></div>
                </div>
            </div>
        `;
    }

    createTimelineSkeleton() {
        return `
            <div class="skeleton-card">
                <div class="skeleton skeleton-title" style="width: 40%;"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text"></div>
                <div class="skeleton skeleton-text" style="width: 85%"></div>
            </div>
        `;
    }

    showSkeleton(container, type, count = 3) {
        const template = this.skeletonTemplates[type] || this.skeletonTemplates.courseCard;
        const skeletonHTML = Array(count).fill(template).join('');

        container.innerHTML = skeletonHTML;
        container.classList.add('loading-skeleton');
    }

    hideSkeleton(container, content) {
        container.classList.remove('loading-skeleton');
        container.innerHTML = content;
        container.classList.add('fade-in');
    }

    // ===================================
    // Animation Optimization
    // ===================================
    optimizeAnimations() {
        // Reduce motion for users who prefer it
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            this.disableNonEssentialAnimations();
        }

        // Pause animations when tab is not visible
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                this.pauseAnimations();
            } else {
                this.resumeAnimations();
            }
        });

        // Use requestAnimationFrame for smooth animations
        this.setupRAFAnimations();

        // Optimize scroll-triggered animations
        this.optimizeScrollAnimations();
    }

    disableNonEssentialAnimations() {
        document.documentElement.classList.add('reduce-motion');

        const style = document.createElement('style');
        style.textContent = `
            .reduce-motion * {
                animation-duration: 0.01ms !important;
                animation-iteration-count: 1 !important;
                transition-duration: 0.01ms !important;
            }

            .reduce-motion .fade-in,
            .reduce-motion .slide-in {
                animation: none !important;
                opacity: 1 !important;
                transform: none !important;
            }
        `;
        document.head.appendChild(style);
    }

    pauseAnimations() {
        document.querySelectorAll('.animated, [class*="animate"]').forEach(el => {
            el.style.animationPlayState = 'paused';
        });
    }

    resumeAnimations() {
        document.querySelectorAll('.animated, [class*="animate"]').forEach(el => {
            el.style.animationPlayState = 'running';
        });
    }

    setupRAFAnimations() {
        // Smooth scroll progress indicator
        let ticking = false;

        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    this.updateScrollProgress();
                    ticking = false;
                });
                ticking = true;
            }
        });
    }

    updateScrollProgress() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = window.scrollY;
        const progress = (scrolled / scrollHeight) * 100;

        // Update progress bar if it exists
        const progressBar = document.getElementById('scroll-progress');
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }

    optimizeScrollAnimations() {
        // Throttle scroll events
        let scrollTimeout;
        const scrollHandler = () => {
            clearTimeout(scrollTimeout);
            scrollTimeout = setTimeout(() => {
                this.handleScroll();
            }, 15);
        };

        window.addEventListener('scroll', scrollHandler, { passive: true });
    }

    handleScroll() {
        // Custom scroll handling logic
        const scrollY = window.scrollY;

        // Parallax effects (optimized)
        const parallaxElements = document.querySelectorAll('[data-parallax]');
        parallaxElements.forEach(el => {
            const speed = el.getAttribute('data-parallax') || 0.5;
            const yPos = -(scrollY * speed);
            el.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    // ===================================
    // Progressive Enhancement
    // ===================================
    enableProgressiveEnhancement() {
        // Check for JavaScript support
        document.documentElement.classList.add('js-enabled');

        // Check for various feature support
        this.detectFeatures();

        // Load polyfills if needed
        this.loadPolyfills();

        // Enable advanced features for capable browsers
        this.enableAdvancedFeatures();
    }

    detectFeatures() {
        const features = {
            intersectionObserver: 'IntersectionObserver' in window,
            serviceWorker: 'serviceWorker' in navigator,
            localStorage: this.testLocalStorage(),
            webp: this.testWebP(),
            cssGrid: CSS.supports('display', 'grid'),
            customProperties: CSS.supports('--custom', 'property')
        };

        // Add feature classes to html element
        Object.keys(features).forEach(feature => {
            if (features[feature]) {
                document.documentElement.classList.add(`supports-${feature}`);
            } else {
                document.documentElement.classList.add(`no-${feature}`);
            }
        });

        this.features = features;
    }

    testLocalStorage() {
        try {
            const test = '__localStorage_test__';
            localStorage.setItem(test, test);
            localStorage.removeItem(test);
            return true;
        } catch(e) {
            return false;
        }
    }

    testWebP() {
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    }

    loadPolyfills() {
        // Load polyfills for missing features
        if (!this.features.intersectionObserver) {
            this.loadScript('https://polyfill.io/v3/polyfill.min.js?features=IntersectionObserver');
        }
    }

    loadScript(src) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    enableAdvancedFeatures() {
        if (this.features.intersectionObserver) {
            // Enhanced lazy loading
            this.setupInfiniteScroll();
        }

        if (this.features.serviceWorker) {
            // Enable offline functionality
            console.log('Service Worker support detected');
        }
    }

    setupInfiniteScroll() {
        // Infinite scroll for course catalog
        const sentinel = document.createElement('div');
        sentinel.className = 'scroll-sentinel';
        sentinel.style.height = '1px';

        const courseGrid = document.getElementById('course-grid');
        if (courseGrid) {
            courseGrid.appendChild(sentinel);

            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadMoreCourses();
                    }
                });
            });

            observer.observe(sentinel);
        }
    }

    loadMoreCourses() {
        // Placeholder for loading more courses
        console.log('Loading more courses...');
    }

    // ===================================
    // Service Worker for Offline Support
    // ===================================
    implementServiceWorker() {
        if ('serviceWorker' in navigator) {
            // Register service worker
            this.registerServiceWorker();
        }
    }

    async registerServiceWorker() {
        try {
            // Create a simple service worker inline
            const swCode = `
                self.addEventListener('install', (event) => {
                    event.waitUntil(
                        caches.open('mhha-v1').then((cache) => {
                            return cache.addAll([
                                '/',
                                '/index.html',
                                '/styles.css',
                                '/script.js'
                            ]);
                        })
                    );
                });

                self.addEventListener('fetch', (event) => {
                    event.respondWith(
                        caches.match(event.request).then((response) => {
                            return response || fetch(event.request);
                        })
                    );
                });
            `;

            const blob = new Blob([swCode], { type: 'application/javascript' });
            const swURL = URL.createObjectURL(blob);

            const registration = await navigator.serviceWorker.register(swURL);
            console.log('Service Worker registered:', registration);
        } catch (error) {
            console.log('Service Worker registration failed:', error);
        }
    }

    // ===================================
    // Image Optimization
    // ===================================
    optimizeImages() {
        // Convert images to WebP if supported
        if (this.features.webp) {
            this.convertToWebP();
        }

        // Implement responsive images
        this.setupResponsiveImages();

        // Add blur-up effect for images
        this.setupBlurUpEffect();
    }

    convertToWebP() {
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src && !src.endsWith('.webp')) {
                // In production, you'd have WebP versions available
                const webpSrc = src.replace(/\.(jpg|jpeg|png)$/, '.webp');
                img.setAttribute('data-src', webpSrc);
                img.setAttribute('data-fallback', src);
            }
        });
    }

    setupResponsiveImages() {
        // Add srcset for responsive images
        document.querySelectorAll('img[data-src]').forEach(img => {
            const src = img.getAttribute('data-src');
            if (src) {
                const baseSrc = src.replace(/\.[^.]+$/, '');
                const ext = src.match(/\.[^.]+$/)[0];

                // Create srcset for different sizes
                img.setAttribute('data-srcset', `
                    ${baseSrc}-small${ext} 400w,
                    ${baseSrc}-medium${ext} 800w,
                    ${baseSrc}-large${ext} 1200w
                `);
            }
        });
    }

    setupBlurUpEffect() {
        const style = document.createElement('style');
        style.textContent = `
            img.loading {
                filter: blur(10px);
                transform: scale(1.05);
                transition: filter 0.3s ease, transform 0.3s ease;
            }

            img.loaded {
                filter: blur(0);
                transform: scale(1);
            }
        `;
        document.head.appendChild(style);
    }

    // ===================================
    // Performance Monitoring
    // ===================================
    monitorPerformance() {
        if ('PerformanceObserver' in window) {
            // Monitor long tasks
            const observer = new PerformanceObserver((list) => {
                for (const entry of list.getEntries()) {
                    console.warn('Long task detected:', entry);
                }
            });

            observer.observe({ entryTypes: ['longtask'] });
        }

        // Monitor page load metrics
        window.addEventListener('load', () => {
            this.reportPerformanceMetrics();
        });
    }

    reportPerformanceMetrics() {
        if ('performance' in window) {
            const perfData = performance.getEntriesByType('navigation')[0];

            const metrics = {
                dns: perfData.domainLookupEnd - perfData.domainLookupStart,
                tcp: perfData.connectEnd - perfData.connectStart,
                ttfb: perfData.responseStart - perfData.requestStart,
                download: perfData.responseEnd - perfData.responseStart,
                domInteractive: perfData.domInteractive,
                domComplete: perfData.domComplete,
                loadComplete: perfData.loadEventEnd
            };

            console.log('Performance Metrics:', metrics);

            // In production, send to analytics
            this.sendAnalytics(metrics);
        }
    }

    sendAnalytics(data) {
        // Placeholder for analytics integration
        console.log('Analytics:', data);
    }

    // ===================================
    // Resource Hints
    // ===================================
    addResourceHints() {
        // Preconnect to external domains
        this.preconnect('https://fonts.googleapis.com');
        this.preconnect('https://fonts.gstatic.com');

        // Prefetch likely next pages
        this.prefetch('#courses');
        this.prefetch('#resources');

        // Preload critical resources
        this.preload('/styles.css', 'style');
        this.preload('/script.js', 'script');
    }

    preconnect(url) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = url;
        document.head.appendChild(link);
    }

    prefetch(url) {
        const link = document.createElement('link');
        link.rel = 'prefetch';
        link.href = url;
        document.head.appendChild(link);
    }

    preload(url, as) {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.href = url;
        link.as = as;
        document.head.appendChild(link);
    }

    // ===================================
    // Critical CSS
    // ===================================
    loadCriticalCSS() {
        // Inline critical CSS in head
        const criticalCSS = `
            /* Critical above-the-fold styles */
            body { margin: 0; font-family: 'Lato', sans-serif; }
            .hero { min-height: 100vh; }
            .navbar { position: fixed; top: 0; width: 100%; z-index: 1000; }
        `;

        const style = document.createElement('style');
        style.textContent = criticalCSS;
        document.head.insertBefore(style, document.head.firstChild);
    }

    // ===================================
    // Code Splitting Helper
    // ===================================
    async loadModule(moduleName) {
        try {
            const module = await import(`./${moduleName}.js`);
            return module;
        } catch (error) {
            console.error(`Failed to load module: ${moduleName}`, error);
            return null;
        }
    }
}

// Initialize Performance Optimizer when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.performanceOptimizer = new PerformanceOptimizer();
    window.performanceOptimizer.monitorPerformance();
});

// Add scroll progress bar
const progressBar = document.createElement('div');
progressBar.id = 'scroll-progress';
progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #8B4513, #D4AF37);
    z-index: 10000;
    width: 0%;
    transition: width 0.1s ease;
`;
document.body.appendChild(progressBar);
