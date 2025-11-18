// ===================================
// INTERACTIVE COURSE CATALOG SYSTEM
// ===================================

class CourseCatalog {
    constructor() {
        this.courses = this.initializeCourses();
        this.filteredCourses = [...this.courses];
        this.selectedCourses = new Set();
        this.init();
    }

    initializeCourses() {
        return [
            {
                id: 'intro-restoration',
                title: 'Introduction to Restoration History',
                description: 'Overview of all restoration branches from 1820 to present. Understand the major movements, key figures, and theological differences.',
                category: 'Foundational',
                level: 'Beginner',
                modules: 6,
                duration: '4 weeks',
                tags: ['history', 'overview', 'beginner-friendly'],
                instructor: 'Dr. Sarah Mitchell',
                rating: 4.8,
                reviews: 234,
                prerequisites: [],
                relatedCourses: ['folk-magic', 'burned-district'],
                skills: ['Historical Analysis', 'Critical Thinking', 'Religious Studies']
            },
            {
                id: 'primary-sources',
                title: 'Reading Primary Sources Critically',
                description: 'Learn to analyze 19th-century documents, understand context, identify bias, and evaluate reliability.',
                category: 'Foundational',
                level: 'Beginner',
                modules: 4,
                duration: '3 weeks',
                tags: ['research', 'methodology', 'documents'],
                instructor: 'Dr. James Parker',
                rating: 4.9,
                reviews: 189,
                prerequisites: [],
                relatedCourses: ['intro-restoration'],
                skills: ['Document Analysis', 'Research Methods', 'Critical Reading']
            },
            {
                id: 'folk-magic',
                title: 'Folk Magic in Early America',
                description: 'Cultural context of treasure seeking, seer stones, divining rods, and magical worldviews in 1820s New York.',
                category: 'Foundational',
                level: 'Beginner',
                modules: 5,
                duration: '3 weeks',
                tags: ['folk-magic', 'culture', 'context'],
                instructor: 'Dr. Emily Chen',
                rating: 4.7,
                reviews: 156,
                prerequisites: [],
                relatedCourses: ['intro-restoration', 'burned-district'],
                skills: ['Cultural Analysis', 'Historical Context', 'Anthropology']
            },
            {
                id: 'burned-district',
                title: 'The Burned-Over District',
                description: 'Religious fervor in upstate New York 1800-1850. Revivals, new movements, and the cultural soil of the restoration.',
                category: 'Foundational',
                level: 'Beginner',
                modules: 4,
                duration: '3 weeks',
                tags: ['revival', 'new-york', 'cultural-context'],
                instructor: 'Dr. Michael Thompson',
                rating: 4.6,
                reviews: 142,
                prerequisites: [],
                relatedCourses: ['folk-magic', 'intro-restoration'],
                skills: ['Regional History', 'Religious Movements', 'Social History']
            },
            {
                id: 'witness-testimonies',
                title: 'Witness Testimonies: A Comparative Study',
                description: 'Examine all witness accounts—Three Witnesses, Eight Witnesses, and others—and how their testimonies evolved over time.',
                category: 'Advanced',
                level: 'Intermediate',
                modules: 8,
                duration: '6 weeks',
                tags: ['witnesses', 'testimonies', 'comparative-analysis'],
                instructor: 'Dr. Rebecca Anderson',
                rating: 4.9,
                reviews: 203,
                prerequisites: ['intro-restoration', 'primary-sources'],
                relatedCourses: ['whitmer-family', 'sacred-experiences'],
                skills: ['Comparative Analysis', 'Testimony Evaluation', 'Historical Critique']
            },
            {
                id: 'schism-succession',
                title: 'Schism and Succession',
                description: 'Why did the restoration movement split? Explore succession crises, competing claims, and the formation of different churches.',
                category: 'Advanced',
                level: 'Intermediate',
                modules: 7,
                duration: '5 weeks',
                tags: ['schism', 'succession', 'movements'],
                instructor: 'Dr. David Lawrence',
                rating: 4.8,
                reviews: 178,
                prerequisites: ['intro-restoration'],
                relatedCourses: ['strang-movement', 'community-christ'],
                skills: ['Institutional Analysis', 'Leadership Studies', 'Theological Comparison']
            },
            {
                id: 'womens-voices',
                title: 'Women\'s Voices in the Restoration',
                description: 'Emma Smith, Lucy Mack Smith, Eliza R. Snow, and other women whose perspectives are often marginalized in traditional histories.',
                category: 'Advanced',
                level: 'Intermediate',
                modules: 6,
                duration: '5 weeks',
                tags: ['women', 'gender', 'voices'],
                instructor: 'Dr. Margaret Williams',
                rating: 4.9,
                reviews: 267,
                prerequisites: ['intro-restoration'],
                relatedCourses: ['primary-sources'],
                skills: ['Gender Studies', 'Marginalized Voices', 'Social History']
            },
            {
                id: 'sacred-experiences',
                title: 'Sacred Experiences and Their Description',
                description: 'How do people talk about visions? Study the language of spiritual experience across cultures and time periods.',
                category: 'Advanced',
                level: 'Advanced',
                modules: 6,
                duration: '5 weeks',
                tags: ['visions', 'spirituality', 'comparative-religion'],
                instructor: 'Dr. Thomas Brennan',
                rating: 4.8,
                reviews: 145,
                prerequisites: ['witness-testimonies', 'primary-sources'],
                relatedCourses: ['folk-magic'],
                skills: ['Phenomenology', 'Religious Language', 'Cross-cultural Analysis']
            },
            {
                id: 'strang-movement',
                title: 'James Strang and the Strangite Movement',
                description: 'The fascinating story of Strang\'s claims, his kingdom on Beaver Island, and why thousands followed him.',
                category: 'Specialized',
                level: 'Advanced',
                modules: 5,
                duration: '4 weeks',
                tags: ['strangites', 'succession', 'alternative-movements'],
                instructor: 'Dr. Patricia Green',
                rating: 4.7,
                reviews: 124,
                prerequisites: ['schism-succession'],
                relatedCourses: ['community-christ', 'whitmer-family'],
                skills: ['Alternative Movements', 'Leadership Analysis', 'Regional History']
            },
            {
                id: 'community-christ',
                title: 'Community of Christ: A Different Path',
                description: 'How the RLDS/Community of Christ developed distinct theology, governance, and relationship to restoration history.',
                category: 'Specialized',
                level: 'Intermediate',
                modules: 6,
                duration: '5 weeks',
                tags: ['rlds', 'community-of-christ', 'alternative-path'],
                instructor: 'Dr. Susan Martinez',
                rating: 4.8,
                reviews: 167,
                prerequisites: ['schism-succession'],
                relatedCourses: ['strang-movement'],
                skills: ['Theological Evolution', 'Institutional History', 'Comparative Religion']
            },
            {
                id: 'whitmer-family',
                title: 'The Whitmer Family and Their Testimonies',
                description: 'David, John, Christian, Peter—the Whitmer family\'s central role and their complex relationships with different movements.',
                category: 'Specialized',
                level: 'Advanced',
                modules: 5,
                duration: '4 weeks',
                tags: ['whitmer', 'witnesses', 'family-history'],
                instructor: 'Dr. Robert Collins',
                rating: 4.9,
                reviews: 134,
                prerequisites: ['witness-testimonies'],
                relatedCourses: ['strang-movement', 'schism-succession'],
                skills: ['Family History', 'Witness Analysis', 'Movement Dynamics']
            }
        ];
    }

    init() {
        this.createCatalogInterface();
        this.attachEventListeners();
        this.renderCourses();
    }

    createCatalogInterface() {
        const coursesSection = document.getElementById('courses');
        if (!coursesSection) return;

        const catalogHTML = `
            <div class="course-catalog-wrapper">
                <!-- Search and Filter Bar -->
                <div class="catalog-controls">
                    <div class="search-container">
                        <input type="text" id="course-search" placeholder="Search courses by title, description, or tags..." class="course-search-input">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="11" cy="11" r="8"/>
                            <path d="M21 21l-4.35-4.35"/>
                        </svg>
                    </div>

                    <div class="filter-controls">
                        <select id="level-filter" class="filter-select">
                            <option value="">All Levels</option>
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>

                        <select id="category-filter" class="filter-select">
                            <option value="">All Categories</option>
                            <option value="Foundational">Foundational</option>
                            <option value="Advanced">Advanced</option>
                            <option value="Specialized">Specialized</option>
                        </select>

                        <select id="sort-filter" class="filter-select">
                            <option value="rating">Highest Rated</option>
                            <option value="popular">Most Popular</option>
                            <option value="duration-asc">Shortest First</option>
                            <option value="duration-desc">Longest First</option>
                        </select>
                    </div>

                    <div class="view-controls">
                        <button id="compare-btn" class="btn-secondary" disabled>
                            Compare (<span id="compare-count">0</span>)
                        </button>
                        <button id="learning-path-btn" class="btn-primary">
                            Build Learning Path
                        </button>
                    </div>
                </div>

                <!-- Course Grid -->
                <div id="course-grid" class="enhanced-courses-grid"></div>

                <!-- Comparison Panel (Hidden by default) -->
                <div id="comparison-panel" class="comparison-panel hidden">
                    <div class="comparison-header">
                        <h3>Course Comparison</h3>
                        <button id="close-comparison" class="btn-close">×</button>
                    </div>
                    <div id="comparison-content" class="comparison-content"></div>
                </div>

                <!-- Learning Path Builder -->
                <div id="learning-path-modal" class="modal hidden">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h3>Build Your Learning Path</h3>
                            <button id="close-path-modal" class="btn-close">×</button>
                        </div>
                        <div class="modal-body">
                            <div class="path-builder">
                                <div class="path-options">
                                    <h4>Select Your Goal</h4>
                                    <div class="goal-options">
                                        <label class="goal-option">
                                            <input type="radio" name="goal" value="beginner" checked>
                                            <span>Start from Scratch</span>
                                        </label>
                                        <label class="goal-option">
                                            <input type="radio" name="goal" value="research">
                                            <span>Become a Researcher</span>
                                        </label>
                                        <label class="goal-option">
                                            <input type="radio" name="goal" value="specialist">
                                            <span>Specialize in a Topic</span>
                                        </label>
                                    </div>
                                </div>
                                <div id="generated-path" class="generated-path"></div>
                                <button id="save-path-btn" class="btn-primary">Save My Learning Path</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;

        const introText = coursesSection.querySelector('.section-intro');
        if (introText) {
            introText.insertAdjacentHTML('afterend', catalogHTML);
        }
    }

    attachEventListeners() {
        // Search
        const searchInput = document.getElementById('course-search');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => this.handleSearch(e.target.value));
        }

        // Filters
        ['level-filter', 'category-filter', 'sort-filter'].forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('change', () => this.applyFilters());
            }
        });

        // Compare button
        const compareBtn = document.getElementById('compare-btn');
        if (compareBtn) {
            compareBtn.addEventListener('click', () => this.showComparison());
        }

        // Close comparison
        const closeComparison = document.getElementById('close-comparison');
        if (closeComparison) {
            closeComparison.addEventListener('click', () => this.hideComparison());
        }

        // Learning path
        const learningPathBtn = document.getElementById('learning-path-btn');
        if (learningPathBtn) {
            learningPathBtn.addEventListener('click', () => this.showLearningPathBuilder());
        }

        // Close learning path modal
        const closePathModal = document.getElementById('close-path-modal');
        if (closePathModal) {
            closePathModal.addEventListener('click', () => this.hideLearningPathBuilder());
        }

        // Generate path on goal change
        document.addEventListener('change', (e) => {
            if (e.target.name === 'goal') {
                this.generateLearningPath(e.target.value);
            }
        });

        // Save path
        const savePathBtn = document.getElementById('save-path-btn');
        if (savePathBtn) {
            savePathBtn.addEventListener('click', () => this.saveLearningPath());
        }
    }

    handleSearch(query) {
        const searchTerm = query.toLowerCase().trim();

        if (searchTerm === '') {
            this.filteredCourses = [...this.courses];
        } else {
            this.filteredCourses = this.courses.filter(course =>
                course.title.toLowerCase().includes(searchTerm) ||
                course.description.toLowerCase().includes(searchTerm) ||
                course.tags.some(tag => tag.includes(searchTerm)) ||
                course.instructor.toLowerCase().includes(searchTerm)
            );
        }

        this.applyFilters();
    }

    applyFilters() {
        const level = document.getElementById('level-filter')?.value;
        const category = document.getElementById('category-filter')?.value;
        const sort = document.getElementById('sort-filter')?.value;

        let filtered = [...this.filteredCourses];

        // Apply level filter
        if (level) {
            filtered = filtered.filter(course => course.level === level);
        }

        // Apply category filter
        if (category) {
            filtered = filtered.filter(course => course.category === category);
        }

        // Apply sorting
        filtered.sort((a, b) => {
            switch(sort) {
                case 'rating':
                    return b.rating - a.rating;
                case 'popular':
                    return b.reviews - a.reviews;
                case 'duration-asc':
                    return parseInt(a.duration) - parseInt(b.duration);
                case 'duration-desc':
                    return parseInt(b.duration) - parseInt(a.duration);
                default:
                    return 0;
            }
        });

        this.renderCourses(filtered);
    }

    renderCourses(coursesToRender = this.courses) {
        const grid = document.getElementById('course-grid');
        if (!grid) return;

        if (coursesToRender.length === 0) {
            grid.innerHTML = '<div class="no-results">No courses found matching your criteria.</div>';
            return;
        }

        grid.innerHTML = coursesToRender.map(course => `
            <div class="enhanced-course-card" data-course-id="${course.id}">
                <div class="course-card-header">
                    <span class="course-level-badge ${course.level.toLowerCase()}">${course.level}</span>
                    <span class="course-category-badge">${course.category}</span>
                </div>

                <h4>${course.title}</h4>
                <p class="course-description">${course.description}</p>

                <div class="course-meta">
                    <div class="course-instructor">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/>
                            <circle cx="12" cy="7" r="4"/>
                        </svg>
                        ${course.instructor}
                    </div>
                    <div class="course-rating">
                        <span class="rating-stars">${this.renderStars(course.rating)}</span>
                        <span class="rating-value">${course.rating}</span>
                        <span class="rating-count">(${course.reviews})</span>
                    </div>
                </div>

                <div class="course-details">
                    <span class="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <rect x="3" y="4" width="18" height="18" rx="2" ry="2"/>
                            <line x1="16" y1="2" x2="16" y2="6"/>
                            <line x1="8" y1="2" x2="8" y2="6"/>
                            <line x1="3" y1="10" x2="21" y2="10"/>
                        </svg>
                        ${course.duration}
                    </span>
                    <span class="detail-item">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z"/>
                            <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z"/>
                        </svg>
                        ${course.modules} modules
                    </span>
                </div>

                <div class="course-tags">
                    ${course.tags.slice(0, 3).map(tag => `<span class="tag">${tag}</span>`).join('')}
                </div>

                <div class="course-actions">
                    <button class="btn-primary start-course" data-course-id="${course.id}">
                        Start Course
                    </button>
                    <button class="btn-icon compare-toggle" data-course-id="${course.id}" title="Add to comparison">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M9 11l3 3L22 4"/>
                            <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/>
                        </svg>
                    </button>
                    <button class="btn-icon view-details" data-course-id="${course.id}" title="View details">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <circle cx="12" cy="12" r="10"/>
                            <line x1="12" y1="16" x2="12" y2="12"/>
                            <line x1="12" y1="8" x2="12.01" y2="8"/>
                        </svg>
                    </button>
                </div>

                ${this.getRecommendationBadge(course)}
            </div>
        `).join('');

        // Attach card event listeners
        this.attachCardListeners();
    }

    attachCardListeners() {
        // Start course buttons
        document.querySelectorAll('.start-course').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.target.dataset.courseId;
                this.startCourse(courseId);
            });
        });

        // Compare toggle buttons
        document.querySelectorAll('.compare-toggle').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const courseId = e.currentTarget.dataset.courseId;
                this.toggleComparison(courseId, e.currentTarget);
            });
        });

        // View details buttons
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const courseId = e.currentTarget.dataset.courseId;
                this.showCourseDetails(courseId);
            });
        });
    }

    renderStars(rating) {
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 >= 0.5;
        let stars = '';

        for (let i = 0; i < fullStars; i++) {
            stars += '★';
        }
        if (hasHalfStar) {
            stars += '☆';
        }

        return stars;
    }

    getRecommendationBadge(course) {
        const progress = window.progressTracker?.getUserProgress();
        if (!progress) return '';

        const completedCourses = progress.completedCourses || [];

        // Check if this course is recommended based on completed courses
        for (const completedId of completedCourses) {
            const completedCourse = this.courses.find(c => c.id === completedId);
            if (completedCourse?.relatedCourses.includes(course.id)) {
                return '<div class="recommendation-badge">Recommended for you</div>';
            }
        }

        return '';
    }

    toggleComparison(courseId, button) {
        if (this.selectedCourses.has(courseId)) {
            this.selectedCourses.delete(courseId);
            button.classList.remove('active');
        } else {
            if (this.selectedCourses.size >= 3) {
                alert('You can compare up to 3 courses at a time.');
                return;
            }
            this.selectedCourses.add(courseId);
            button.classList.add('active');
        }

        this.updateCompareButton();
    }

    updateCompareButton() {
        const count = document.getElementById('compare-count');
        const btn = document.getElementById('compare-btn');

        if (count) count.textContent = this.selectedCourses.size;
        if (btn) btn.disabled = this.selectedCourses.size < 2;
    }

    showComparison() {
        const panel = document.getElementById('comparison-panel');
        const content = document.getElementById('comparison-content');

        if (!panel || !content) return;

        const selectedCourseData = Array.from(this.selectedCourses)
            .map(id => this.courses.find(c => c.id === id));

        content.innerHTML = `
            <table class="comparison-table">
                <thead>
                    <tr>
                        <th>Feature</th>
                        ${selectedCourseData.map(c => `<th>${c.title}</th>`).join('')}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><strong>Level</strong></td>
                        ${selectedCourseData.map(c => `<td><span class="level-badge ${c.level.toLowerCase()}">${c.level}</span></td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Duration</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.duration}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Modules</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.modules}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Rating</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.rating} (${c.reviews} reviews)</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Instructor</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.instructor}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Prerequisites</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.prerequisites.length > 0 ? c.prerequisites.join(', ') : 'None'}</td>`).join('')}
                    </tr>
                    <tr>
                        <td><strong>Skills</strong></td>
                        ${selectedCourseData.map(c => `<td>${c.skills.join(', ')}</td>`).join('')}
                    </tr>
                </tbody>
            </table>
        `;

        panel.classList.remove('hidden');
    }

    hideComparison() {
        const panel = document.getElementById('comparison-panel');
        if (panel) panel.classList.add('hidden');
    }

    showLearningPathBuilder() {
        const modal = document.getElementById('learning-path-modal');
        if (modal) {
            modal.classList.remove('hidden');
            this.generateLearningPath('beginner'); // Default path
        }
    }

    hideLearningPathBuilder() {
        const modal = document.getElementById('learning-path-modal');
        if (modal) modal.classList.add('hidden');
    }

    generateLearningPath(goal) {
        const pathContainer = document.getElementById('generated-path');
        if (!pathContainer) return;

        let path = [];

        switch(goal) {
            case 'beginner':
                path = [
                    'intro-restoration',
                    'primary-sources',
                    'folk-magic',
                    'burned-district',
                    'witness-testimonies'
                ];
                break;
            case 'research':
                path = [
                    'intro-restoration',
                    'primary-sources',
                    'witness-testimonies',
                    'schism-succession',
                    'sacred-experiences'
                ];
                break;
            case 'specialist':
                path = [
                    'intro-restoration',
                    'schism-succession',
                    'strang-movement',
                    'community-christ',
                    'whitmer-family'
                ];
                break;
        }

        const pathCourses = path.map(id => this.courses.find(c => c.id === id));

        pathContainer.innerHTML = `
            <h4>Your Recommended Learning Path</h4>
            <div class="learning-path-timeline">
                ${pathCourses.map((course, index) => `
                    <div class="path-step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">
                            <h5>${course.title}</h5>
                            <p>${course.description}</p>
                            <div class="step-meta">
                                <span>${course.level}</span>
                                <span>${course.duration}</span>
                                <span>${course.modules} modules</span>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
            <div class="path-summary">
                <strong>Total Duration:</strong> ${this.calculateTotalDuration(pathCourses)} weeks
            </div>
        `;
    }

    calculateTotalDuration(courses) {
        return courses.reduce((total, course) => {
            return total + parseInt(course.duration);
        }, 0);
    }

    saveLearningPath() {
        const goalInput = document.querySelector('input[name="goal"]:checked');
        if (!goalInput) return;

        const pathData = {
            goal: goalInput.value,
            timestamp: new Date().toISOString(),
            courses: this.getPathCourses(goalInput.value)
        };

        localStorage.setItem('learningPath', JSON.stringify(pathData));

        this.hideLearningPathBuilder();
        this.showNotification('Learning path saved! Start your first course to begin.', 'success');
    }

    getPathCourses(goal) {
        const paths = {
            beginner: ['intro-restoration', 'primary-sources', 'folk-magic', 'burned-district', 'witness-testimonies'],
            research: ['intro-restoration', 'primary-sources', 'witness-testimonies', 'schism-succession', 'sacred-experiences'],
            specialist: ['intro-restoration', 'schism-succession', 'strang-movement', 'community-christ', 'whitmer-family']
        };
        return paths[goal] || [];
    }

    startCourse(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        // Check prerequisites
        if (course.prerequisites.length > 0) {
            const progress = window.progressTracker?.getUserProgress();
            const completed = progress?.completedCourses || [];

            const missingPrereqs = course.prerequisites.filter(prereq => !completed.includes(prereq));

            if (missingPrereqs.length > 0) {
                const prereqNames = missingPrereqs.map(id => {
                    const prereqCourse = this.courses.find(c => c.id === id);
                    return prereqCourse?.title || id;
                }).join(', ');

                if (!confirm(`This course has prerequisites: ${prereqNames}. Do you want to continue anyway?`)) {
                    return;
                }
            }
        }

        // Start the course
        window.progressTracker?.startCourse(courseId);
        this.showNotification(`Started course: ${course.title}`, 'success');
    }

    showCourseDetails(courseId) {
        const course = this.courses.find(c => c.id === courseId);
        if (!course) return;

        const modal = document.createElement('div');
        modal.className = 'modal course-details-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>${course.title}</h3>
                    <button class="btn-close">×</button>
                </div>
                <div class="modal-body">
                    <div class="course-detail-content">
                        <p class="course-detail-description">${course.description}</p>

                        <div class="detail-section">
                            <h4>Course Information</h4>
                            <ul>
                                <li><strong>Level:</strong> ${course.level}</li>
                                <li><strong>Category:</strong> ${course.category}</li>
                                <li><strong>Duration:</strong> ${course.duration}</li>
                                <li><strong>Modules:</strong> ${course.modules}</li>
                                <li><strong>Instructor:</strong> ${course.instructor}</li>
                                <li><strong>Rating:</strong> ${course.rating}/5.0 (${course.reviews} reviews)</li>
                            </ul>
                        </div>

                        ${course.prerequisites.length > 0 ? `
                            <div class="detail-section">
                                <h4>Prerequisites</h4>
                                <ul>
                                    ${course.prerequisites.map(id => {
                                        const prereq = this.courses.find(c => c.id === id);
                                        return `<li>${prereq?.title || id}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        <div class="detail-section">
                            <h4>Skills You'll Learn</h4>
                            <div class="skills-list">
                                ${course.skills.map(skill => `<span class="skill-badge">${skill}</span>`).join('')}
                            </div>
                        </div>

                        ${course.relatedCourses.length > 0 ? `
                            <div class="detail-section">
                                <h4>Related Courses</h4>
                                <ul>
                                    ${course.relatedCourses.map(id => {
                                        const related = this.courses.find(c => c.id === id);
                                        return `<li>${related?.title || id}</li>`;
                                    }).join('')}
                                </ul>
                            </div>
                        ` : ''}

                        <button class="btn-primary" onclick="courseCatalog.startCourse('${course.id}'); document.querySelector('.course-details-modal').remove();">
                            Start This Course
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        modal.querySelector('.btn-close').addEventListener('click', () => {
            modal.remove();
        });

        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    showNotification(message, type) {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize catalog when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.courseCatalog = new CourseCatalog();
});
