// ===================================
// Courses Main Page UI Management
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize course manager
    const courseManager = new CourseManager(coursesData);

    // State management
    let currentFilter = 'all';
    let currentSort = 'default';
    let searchQuery = '';

    // ===================================
    // Course Card Rendering (same as courses-ui.js)
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
                        <button class="btn-course" onclick="alert('Course enrollment coming soon! This is a demo of the course system.')">
                            Start Learning
                        </button>
                    </div>
                </div>
            </div>
        `;
    }

    // ===================================
    // Render All Courses
    // ===================================

    function renderAllCourses() {
        const container = document.getElementById('all-courses-container-main');
        if (!container) return;

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

        // Render
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
                    <div class="category-section scroll-reveal" id="${key}-courses">
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
    const filterButtons = document.querySelectorAll('.filter-btn-main');
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            filterButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.level;
            renderAllCourses();
        });
    });

    // Search
    const searchInput = document.getElementById('course-search-main');
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            searchQuery = e.target.value;
            renderAllCourses();
        }, 300));
    }

    // Sort dropdown
    const sortDropdown = document.getElementById('sort-courses-main');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', (e) => {
            currentSort = e.target.value;
            renderAllCourses();
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
    // Smooth Scrolling
    // ===================================

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href === '#') {
                e.preventDefault();
                return;
            }

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const navbar = document.getElementById('navbar');
                const navHeight = navbar ? navbar.offsetHeight : 70;
                const targetPosition = target.offsetTop - navHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ===================================
    // Initialize
    // ===================================

    // Initial render
    renderAllCourses();

    // Initialize scroll reveals
    setTimeout(initScrollReveal, 100);

    // Fade in page
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);

    console.log('Courses Main Page initialized with', coursesData.courses.length, 'courses');
});
