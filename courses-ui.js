// ===================================
// Course UI Management
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize course manager
    const courseManager = new CourseManager(coursesData);

    // State management
    let currentFilter = 'all';
    let currentSort = 'default';
    let searchQuery = '';

    // ===================================
    // Course Card Rendering
    // ===================================

    function createCourseCard(course) {
        const stars = '⭐'.repeat(Math.floor(course.rating));

        const badges = [];
        if (course.featured) badges.push('<span class="course-badge badge-featured">Featured</span>');
        if (course.trending) badges.push('<span class="course-badge badge-trending">Trending</span>');
        badges.push(`<span class="course-badge badge-${course.level}">${course.difficulty}</span>`);

        return `
            <div class="course-card-enhanced stagger-animation">
                <div class="course-card-header">
                    <div class="course-badges">
                        ${badges.join('')}
                    </div>
                </div>
                <div class="course-card-body">
                    <h4 class="course-card-title">${course.title}</h4>
                    <p class="course-card-description">${course.description}</p>
                    <div class="course-tags">
                        ${course.tags.map(tag => `<span class="course-tag">${tag}</span>`).join('')}
                    </div>
                    <div class="course-meta">
                        <div class="course-meta-item">
                            <span class="course-meta-icon">📖</span>
                            <span>${course.modules} modules</span>
                        </div>
                        <div class="course-meta-item">
                            <span class="course-meta-icon">⏱️</span>
                            <span>${course.duration}</span>
                        </div>
                    </div>
                </div>
                <div class="course-card-footer">
                    <div class="course-stats">
                        <div class="course-rating">
                            <span class="stars">${stars}</span>
                            <span class="rating-number">${course.rating}</span>
                            <span class="rating-count">(${course.reviews})</span>
                        </div>
                        <div class="course-enrolled">
                            ${course.enrolled.toLocaleString()} enrolled
                        </div>
                    </div>
                    <div class="course-progress">
                        <div class="progress-label">
                            <span>Avg. Completion</span>
                            <span>${course.completionRate}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar" style="width: ${course.completionRate}%"></div>
                        </div>
                    </div>
                    <div class="course-action">
                        <a href="courses-main.html#${course.id}" class="btn-course">
                            Start Learning
                        </a>
                    </div>
                </div>
            </div>
        `;
    }

    // ===================================
    // Render Functions
    // ===================================

    function renderFeaturedCourses() {
        const featured = courseManager.getFeaturedCourses();
        const container = document.getElementById('featured-courses');
        if (container && featured.length > 0) {
            container.innerHTML = featured.map(course => createCourseCard(course)).join('');
        }
    }

    function renderRecentCourses() {
        const recent = courseManager.getRecentlyAdded();
        const container = document.getElementById('recent-courses');
        if (container && recent.length > 0) {
            container.innerHTML = recent.map(course => createCourseCard(course)).join('');
        }
    }

    function renderAllCoursesByCategory() {
        const container = document.getElementById('all-courses-container');
        if (!container) return;

        let html = '';

        Object.entries(coursesData.categories).forEach(([key, category]) => {
            const courses = courseManager.getCoursesByLevel(key);
            if (courses.length === 0) return;

            html += `
                <div class="category-section scroll-reveal">
                    <div class="category-header">
                        <div class="category-icon">${category.icon}</div>
                        <div class="category-info">
                            <h3>${category.name}</h3>
                            <p class="category-description">${category.description}</p>
                        </div>
                    </div>
                    <div class="courses-grid-dynamic">
                        ${courses.map(course => createCourseCard(course)).join('')}
                    </div>
                </div>
            `;
        });

        container.innerHTML = html;
    }

    // ===================================
    // Filter and Search
    // ===================================

    function filterAndDisplayCourses() {
        let courses = [...coursesData.courses];

        // Apply level filter
        if (currentFilter !== 'all') {
            courses = courses.filter(course => course.level === currentFilter);
        }

        // Apply search
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            courses = courses.filter(course =>
                course.title.toLowerCase().includes(query) ||
                course.description.toLowerCase().includes(query) ||
                course.tags.some(tag => tag.toLowerCase().includes(query))
            );
        }

        // Apply sort
        if (currentSort !== 'default') {
            courses = courseManager.sortCourses(courses, currentSort);
        }

        // Render filtered courses
        const container = document.getElementById('all-courses-container');
        if (!container) return;

        if (courses.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <div class="no-results-icon">🔍</div>
                    <h3>No Courses Found</h3>
                    <p>Try adjusting your filters or search terms to find what you're looking for.</p>
                </div>
            `;
        } else {
            // Group by category
            let html = '';
            Object.entries(coursesData.categories).forEach(([key, category]) => {
                const categoryCourses = courses.filter(c => c.level === key);
                if (categoryCourses.length === 0) return;

                html += `
                    <div class="category-section scroll-reveal">
                        <div class="category-header">
                            <div class="category-icon">${category.icon}</div>
                            <div class="category-info">
                                <h3>${category.name}</h3>
                                <p class="category-description">${category.description}</p>
                            </div>
                        </div>
                        <div class="courses-grid-dynamic">
                            ${categoryCourses.map(course => createCourseCard(course)).join('')}
                        </div>
                    </div>
                `;
            });

            container.innerHTML = html;
        }

        // Trigger scroll reveal animations
        setTimeout(initScrollReveal, 100);
    }

    // ===================================
    // Event Handlers
    // ===================================

    // Filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.level;
            filterAndDisplayCourses();
        });
    });

    // Search
    const searchInput = document.getElementById('course-search');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchQuery = e.target.value;
            filterAndDisplayCourses();
        }, 300));
    }

    // Sort dropdown
    const sortDropdown = document.getElementById('sort-courses');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', (e) => {
            currentSort = e.target.value;
            filterAndDisplayCourses();
        });
    }

    // ===================================
    // Scroll Reveal Animations
    // ===================================

    function initScrollReveal() {
        const reveals = document.querySelectorAll('.scroll-reveal');

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                }
            });
        }, { threshold: 0.1 });

        reveals.forEach(reveal => {
            observer.observe(reveal);
        });
    }

    // ===================================
    // Utility Functions
    // ===================================

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // ===================================
    // Navigation Progress Indicator
    // ===================================

    function updateProgressBar() {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;

        let progressBar = document.getElementById('nav-progress-bar');
        if (!progressBar) {
            // Create progress bar if it doesn't exist
            const navProgress = document.createElement('div');
            navProgress.className = 'nav-progress';
            navProgress.innerHTML = '<div class="nav-progress-bar" id="nav-progress-bar"></div>';
            document.body.insertBefore(navProgress, document.body.firstChild);
            progressBar = document.getElementById('nav-progress-bar');
        }

        if (progressBar) {
            progressBar.style.width = scrolled + '%';
        }
    }

    window.addEventListener('scroll', updateProgressBar);

    // ===================================
    // Initialize
    // ===================================

    // Initial render
    renderFeaturedCourses();
    renderRecentCourses();
    renderAllCoursesByCategory();

    // Initialize scroll reveals
    setTimeout(initScrollReveal, 100);

    console.log('Course UI initialized with', coursesData.courses.length, 'courses');
});

// ===================================
// Page Transition Effects
// ===================================

// Add smooth page transitions
document.addEventListener('DOMContentLoaded', () => {
    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    // Smooth transitions for internal links
    const links = document.querySelectorAll('a[href^="courses-main.html"]');
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');

            document.body.style.transition = 'opacity 0.3s ease';
            document.body.style.opacity = '0';

            setTimeout(() => {
                window.location.href = href;
            }, 300);
        });
    });
});
