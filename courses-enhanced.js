// ===================================
// COURSES ENHANCED JAVASCRIPT
// Martin Harris Historical Association
// Interactive Course Functionality
// ===================================

// Course Data Structure
const coursesData = [
    {
        id: 1,
        title: "Introduction to Restoration History",
        description: "Overview of all restoration branches from 1820 to present. Understand the major movements, key figures, and theological differences.",
        difficulty: "beginner",
        modules: 6,
        duration: "4 weeks",
        enrolled: 1247,
        progress: 0,
        topics: ["overview", "movements", "figures"],
        icon: "📚",
        category: "foundational",
        modules_list: [
            "Origins of the Restoration Movement",
            "Key Figures and Founding Events",
            "Major Church Divisions",
            "Theological Foundations",
            "Geographic Expansion",
            "Modern Restoration Traditions"
        ]
    },
    {
        id: 2,
        title: "Reading Primary Sources Critically",
        description: "Learn to analyze 19th-century documents, understand context, identify bias, and evaluate reliability.",
        difficulty: "beginner",
        modules: 4,
        duration: "3 weeks",
        enrolled: 892,
        progress: 0,
        topics: ["methodology", "analysis"],
        icon: "🔍",
        category: "foundational",
        modules_list: [
            "Introduction to Primary Source Analysis",
            "Understanding Historical Context",
            "Identifying Bias and Perspective",
            "Evaluating Source Reliability"
        ]
    },
    {
        id: 3,
        title: "Folk Magic in Early America",
        description: "Cultural context of treasure seeking, seer stones, divining rods, and magical worldviews in 1820s New York.",
        difficulty: "beginner",
        modules: 5,
        duration: "4 weeks",
        enrolled: 1034,
        progress: 0,
        topics: ["culture", "magic", "context"],
        icon: "🔮",
        category: "foundational",
        modules_list: [
            "Magical Worldviews in 19th Century America",
            "Treasure Seeking and Divination",
            "Seer Stones and Folk Practices",
            "Religious and Magical Overlap",
            "Impact on Early Restoration"
        ]
    },
    {
        id: 4,
        title: "The Burned-Over District",
        description: "Religious fervor in upstate New York 1800-1850. Revivals, new movements, and the cultural soil of the restoration.",
        difficulty: "beginner",
        modules: 4,
        duration: "3 weeks",
        enrolled: 756,
        progress: 0,
        topics: ["context", "revival", "geography"],
        icon: "🔥",
        category: "foundational",
        modules_list: [
            "Religious Ferment in Upstate New York",
            "The Second Great Awakening",
            "New Religious Movements",
            "Cultural Context of Restoration"
        ]
    },
    {
        id: 5,
        title: "Witness Testimonies: A Comparative Study",
        description: "Examine all witness accounts—Three Witnesses, Eight Witnesses, and others—and how their testimonies evolved over time.",
        difficulty: "intermediate",
        modules: 8,
        duration: "6 weeks",
        enrolled: 634,
        progress: 0,
        topics: ["witnesses", "testimony", "analysis"],
        icon: "👁️",
        category: "advanced",
        modules_list: [
            "The Three Witnesses: Overview",
            "The Eight Witnesses: Overview",
            "Martin Harris's Evolving Testimony",
            "Oliver Cowdery's Account",
            "David Whitmer's Testimony",
            "Textual Analysis of Witness Statements",
            "Comparative Testimonies Across Time",
            "Historical and Theological Implications"
        ]
    },
    {
        id: 6,
        title: "Schism and Succession",
        description: "Why did the restoration movement split? Explore succession crises, competing claims, and the formation of different churches.",
        difficulty: "intermediate",
        modules: 7,
        duration: "5 weeks",
        enrolled: 523,
        progress: 0,
        topics: ["schism", "succession", "movements"],
        icon: "⚖️",
        category: "advanced",
        modules_list: [
            "The Death of Joseph Smith",
            "Competing Succession Claims",
            "Brigham Young and the Utah Movement",
            "The RLDS Church Formation",
            "James Strang's Kingdom",
            "Other Splinter Groups",
            "Theological Divergence"
        ]
    },
    {
        id: 7,
        title: "Women's Voices in the Restoration",
        description: "Emma Smith, Lucy Mack Smith, Eliza R. Snow, and other women whose perspectives are often marginalized in traditional histories.",
        difficulty: "intermediate",
        modules: 6,
        duration: "5 weeks",
        enrolled: 789,
        progress: 0,
        topics: ["women", "voices", "history"],
        icon: "👩",
        category: "advanced",
        modules_list: [
            "Women in Early Restoration History",
            "Emma Hale Smith",
            "Lucy Mack Smith",
            "Eliza R. Snow",
            "Female Relief Society Leaders",
            "Marginalized Women's Narratives"
        ]
    },
    {
        id: 8,
        title: "Sacred Experiences and Their Description",
        description: "How do people talk about visions? Study the language of spiritual experience across cultures and time periods.",
        difficulty: "advanced",
        modules: 6,
        duration: "6 weeks",
        enrolled: 412,
        progress: 0,
        topics: ["theology", "experience", "language"],
        icon: "✨",
        category: "specialized",
        modules_list: [
            "Phenomenology of Religious Experience",
            "Language and Vision Descriptions",
            "Cross-Cultural Spiritual Experiences",
            "Visionary Experiences in 19th Century",
            "Spiritual vs. Physical Sight",
            "Modern Interpretations"
        ]
    },
    {
        id: 9,
        title: "James Strang and the Strangite Movement",
        description: "The fascinating story of Strang's claims, his kingdom on Beaver Island, and why thousands followed him.",
        difficulty: "advanced",
        modules: 5,
        duration: "4 weeks",
        enrolled: 298,
        progress: 0,
        topics: ["figures", "movements", "strangites"],
        icon: "👑",
        category: "specialized",
        modules_list: [
            "James Strang's Background and Claims",
            "The Letter of Appointment",
            "Beaver Island Kingdom",
            "Strangite Theology and Practices",
            "Decline and Legacy"
        ]
    },
    {
        id: 10,
        title: "Community of Christ: A Different Path",
        description: "How the RLDS/Community of Christ developed distinct theology, governance, and relationship to restoration history.",
        difficulty: "intermediate",
        modules: 6,
        duration: "5 weeks",
        enrolled: 567,
        progress: 0,
        topics: ["movements", "theology", "community"],
        icon: "🕊️",
        category: "specialized",
        modules_list: [
            "Formation of the RLDS Church",
            "Reorganization vs. Succession",
            "Theological Evolution",
            "Transition to Community of Christ",
            "Contemporary Identity",
            "Interfaith Relations"
        ]
    },
    {
        id: 11,
        title: "The Whitmer Family and Their Testimonies",
        description: "David, John, Christian, Peter—the Whitmer family's central role and their complex relationships with different movements.",
        difficulty: "advanced",
        modules: 5,
        duration: "4 weeks",
        enrolled: 345,
        progress: 0,
        topics: ["figures", "witnesses", "family"],
        icon: "👨‍👩‍👦",
        category: "specialized",
        modules_list: [
            "The Whitmer Family Background",
            "David Whitmer as Witness",
            "The Whitmer Home and Early Church",
            "Excommunication and Aftermath",
            "Church of Christ (Whitmerite)"
        ]
    }
];

// User Progress Data (simulated)
let userProgress = {
    coursesCompleted: 0,
    coursesInProgress: 0,
    totalHoursLearned: 0,
    currentStreak: 7,
    achievements: [],
    streakDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
};

// Achievements data
const achievements = [
    { id: 1, name: "First Steps", icon: "🎯", unlocked: true, description: "Complete your first course" },
    { id: 2, name: "Scholar", icon: "📖", unlocked: true, description: "Complete 3 courses" },
    { id: 3, name: "Historian", icon: "🏛️", unlocked: false, description: "Complete 5 courses" },
    { id: 4, name: "Expert", icon: "🎓", unlocked: false, description: "Complete 10 courses" },
    { id: 5, name: "Week Warrior", icon: "🔥", unlocked: true, description: "Maintain 7-day streak" },
    { id: 6, name: "Night Owl", icon: "🦉", unlocked: false, description: "Study late at night" },
    { id: 7, name: "Early Bird", icon: "🌅", unlocked: false, description: "Study early morning" },
    { id: 8, name: "Dedicated", icon: "💪", unlocked: false, description: "Maintain 30-day streak" }
];

// ===================================
// Filter and Search Functionality
// ===================================
let currentFilters = {
    difficulty: 'all',
    topic: 'all',
    category: 'all',
    search: ''
};

function initializeFilters() {
    const searchInput = document.querySelector('.course-search');
    const clearBtn = document.querySelector('.clear-search');
    const difficultyBtns = document.querySelectorAll('.filter-btn[data-filter-type="difficulty"]');
    const categoryBtns = document.querySelectorAll('.filter-btn[data-filter-type="category"]');
    const sortSelect = document.querySelector('.sort-select');

    // Search functionality
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentFilters.search = e.target.value.toLowerCase();
            if (clearBtn) {
                clearBtn.classList.toggle('visible', e.target.value.length > 0);
            }
            filterAndDisplayCourses();
        });
    }

    // Clear search
    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                currentFilters.search = '';
                clearBtn.classList.remove('visible');
                filterAndDisplayCourses();
            }
        });
    }

    // Difficulty filters
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            difficultyBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.difficulty = btn.dataset.filter;
            filterAndDisplayCourses();
        });
    });

    // Category filters
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            categoryBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilters.category = btn.dataset.filter;
            filterAndDisplayCourses();
        });
    });

    // Sort functionality
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            sortAndDisplayCourses(e.target.value);
        });
    }
}

function filterAndDisplayCourses() {
    let filteredCourses = coursesData.filter(course => {
        // Search filter
        if (currentFilters.search) {
            const searchMatch =
                course.title.toLowerCase().includes(currentFilters.search) ||
                course.description.toLowerCase().includes(currentFilters.search) ||
                course.topics.some(topic => topic.includes(currentFilters.search));
            if (!searchMatch) return false;
        }

        // Difficulty filter
        if (currentFilters.difficulty !== 'all' && course.difficulty !== currentFilters.difficulty) {
            return false;
        }

        // Category filter
        if (currentFilters.category !== 'all' && course.category !== currentFilters.category) {
            return false;
        }

        return true;
    });

    displayCourses(filteredCourses);
    updateResultsCount(filteredCourses.length);
}

function sortAndDisplayCourses(sortBy) {
    let sortedCourses = [...coursesData];

    switch(sortBy) {
        case 'popular':
            sortedCourses.sort((a, b) => b.enrolled - a.enrolled);
            break;
        case 'newest':
            sortedCourses.sort((a, b) => b.id - a.id);
            break;
        case 'duration-short':
            sortedCourses.sort((a, b) => {
                const aDuration = parseInt(a.duration);
                const bDuration = parseInt(b.duration);
                return aDuration - bDuration;
            });
            break;
        case 'duration-long':
            sortedCourses.sort((a, b) => {
                const aDuration = parseInt(a.duration);
                const bDuration = parseInt(b.duration);
                return bDuration - aDuration;
            });
            break;
        case 'title':
            sortedCourses.sort((a, b) => a.title.localeCompare(b.title));
            break;
    }

    displayCourses(sortedCourses);
}

function updateResultsCount(count) {
    const resultsCount = document.querySelector('.results-count');
    if (resultsCount) {
        resultsCount.textContent = `Showing ${count} course${count !== 1 ? 's' : ''}`;
    }
}

// ===================================
// Display Courses
// ===================================
function displayCourses(courses) {
    const coursesGrid = document.querySelector('.courses-grid-enhanced');
    if (!coursesGrid) return;

    if (courses.length === 0) {
        coursesGrid.innerHTML = `
            <div class="no-results" style="grid-column: 1 / -1; text-align: center; padding: 4rem;">
                <div style="font-size: 4rem; margin-bottom: 1rem;">📚</div>
                <h3 style="color: var(--primary-color); margin-bottom: 1rem;">No courses found</h3>
                <p style="color: var(--accent-color);">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }

    coursesGrid.innerHTML = courses.map(course => createCourseCard(course)).join('');

    // Add event listeners to new cards
    attachCourseCardListeners();
}

function createCourseCard(course) {
    const progressValue = course.progress || 0;
    const isEnrolled = progressValue > 0;

    return `
        <div class="course-card-enhanced fade-in-up" data-course-id="${course.id}">
            <div class="course-card-header">
                <div class="course-icon-container">
                    <div class="course-icon">${course.icon}</div>
                </div>
                <div class="difficulty-badge ${course.difficulty}">${course.difficulty}</div>
                <div class="enrollment-badge">${course.enrolled.toLocaleString()}</div>
            </div>
            <div class="course-card-body">
                <h4 class="course-title">${course.title}</h4>
                <p class="course-description">${course.description}</p>

                <div class="course-topics">
                    ${course.topics.map(topic => `<span class="topic-tag">#${topic}</span>`).join('')}
                </div>

                <div class="course-meta">
                    <div class="meta-item">
                        <span class="meta-icon">📖</span>
                        <span>${course.modules} modules</span>
                    </div>
                    <div class="meta-item">
                        <span class="meta-icon">⏱️</span>
                        <span>${course.duration}</span>
                    </div>
                </div>

                ${isEnrolled ? `
                    <div class="course-progress">
                        <div class="progress-label">
                            <span>Your Progress</span>
                            <span>${progressValue}%</span>
                        </div>
                        <div class="progress-bar-container">
                            <div class="progress-bar-fill" style="width: ${progressValue}%"></div>
                        </div>
                    </div>
                ` : ''}

                <div class="course-actions">
                    <button class="course-btn course-btn-primary" onclick="enrollCourse(${course.id})">
                        ${isEnrolled ? 'Continue Learning' : 'Enroll Now'}
                    </button>
                    <button class="course-btn course-btn-secondary" onclick="previewCourse(${course.id})">
                        Preview
                    </button>
                </div>
            </div>
        </div>
    `;
}

function attachCourseCardListeners() {
    const cards = document.querySelectorAll('.course-card-enhanced');
    cards.forEach(card => {
        // Add intersection observer for animation
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }
            });
        }, { threshold: 0.1 });

        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease-out';
        observer.observe(card);
    });
}

// ===================================
// Course Actions
// ===================================
function enrollCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    // Simulate enrollment
    if (!course.progress || course.progress === 0) {
        course.progress = 5; // Start with 5% progress
        showNotification(`You've enrolled in "${course.title}"!`, 'success');
        userProgress.coursesInProgress++;
    } else {
        showNotification(`Continuing "${course.title}"...`, 'success');
    }

    // Update dashboard
    updateDashboard();

    // Refresh display
    filterAndDisplayCourses();
}

function previewCourse(courseId) {
    const course = coursesData.find(c => c.id === courseId);
    if (!course) return;

    showCourseModal(course);
}

function showCourseModal(course) {
    const modal = document.getElementById('courseModal');
    if (!modal) return;

    const modalBody = modal.querySelector('.modal-body');
    if (!modalBody) return;

    modalBody.innerHTML = `
        <h3 class="modal-course-title">${course.icon} ${course.title}</h3>
        <div class="course-meta">
            <div class="meta-item">
                <span class="meta-icon">📊</span>
                <span class="difficulty-badge ${course.difficulty}">${course.difficulty}</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">📖</span>
                <span>${course.modules} modules</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">⏱️</span>
                <span>${course.duration}</span>
            </div>
            <div class="meta-item">
                <span class="meta-icon">👥</span>
                <span>${course.enrolled.toLocaleString()} enrolled</span>
            </div>
        </div>
        <div class="modal-course-details">
            <h4 style="color: var(--primary-color); margin-top: 2rem; margin-bottom: 1rem;">About This Course</h4>
            <p style="line-height: 1.8;">${course.description}</p>

            <h4 style="color: var(--primary-color); margin-top: 2rem; margin-bottom: 1rem;">Course Modules</h4>
            <ul class="module-list">
                ${course.modules_list.map((module, index) => `
                    <li class="module-item">
                        <div class="module-number">${index + 1}</div>
                        <div>${module}</div>
                    </li>
                `).join('')}
            </ul>

            <h4 style="color: var(--primary-color); margin-top: 2rem; margin-bottom: 1rem;">Topics Covered</h4>
            <div class="course-topics">
                ${course.topics.map(topic => `<span class="topic-tag">#${topic}</span>`).join('')}
            </div>
        </div>
        <div class="course-actions" style="margin-top: 2rem;">
            <button class="course-btn course-btn-primary" onclick="enrollCourse(${course.id}); closeCourseModal();">
                Enroll in This Course
            </button>
        </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCourseModal() {
    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// ===================================
// Dashboard Functionality
// ===================================
function updateDashboard() {
    // Update stats
    const completedCourses = coursesData.filter(c => c.progress === 100).length;
    const inProgressCourses = coursesData.filter(c => c.progress > 0 && c.progress < 100).length;
    const totalHours = Math.round(inProgressCourses * 2.5 + completedCourses * 5);

    userProgress.coursesCompleted = completedCourses;
    userProgress.coursesInProgress = inProgressCourses;
    userProgress.totalHoursLearned = totalHours;

    // Update DOM
    const completedStat = document.querySelector('[data-stat="completed"]');
    const inProgressStat = document.querySelector('[data-stat="inprogress"]');
    const hoursStat = document.querySelector('[data-stat="hours"]');
    const streakStat = document.querySelector('[data-stat="streak"]');

    if (completedStat) animateCounter(completedStat, userProgress.coursesCompleted);
    if (inProgressStat) animateCounter(inProgressStat, userProgress.coursesInProgress);
    if (hoursStat) animateCounter(hoursStat, userProgress.totalHoursLearned);
    if (streakStat) {
        streakStat.textContent = userProgress.currentStreak;
        const streakCount = document.querySelector('.streak-count');
        if (streakCount) streakCount.textContent = `${userProgress.currentStreak} days`;
    }

    // Update achievements
    updateAchievements();
}

function animateCounter(element, target, duration = 1000) {
    const start = parseInt(element.textContent) || 0;
    const increment = (target - start) / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if ((increment > 0 && current >= target) || (increment < 0 && current <= target)) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

function updateAchievements() {
    const achievementsGrid = document.querySelector('.achievements-grid');
    if (!achievementsGrid) return;

    // Unlock achievements based on progress
    achievements[0].unlocked = userProgress.coursesCompleted >= 1;
    achievements[1].unlocked = userProgress.coursesCompleted >= 3;
    achievements[2].unlocked = userProgress.coursesCompleted >= 5;
    achievements[3].unlocked = userProgress.coursesCompleted >= 10;
    achievements[4].unlocked = userProgress.currentStreak >= 7;
    achievements[7].unlocked = userProgress.currentStreak >= 30;

    achievementsGrid.innerHTML = achievements.map(achievement => `
        <div class="achievement-badge ${achievement.unlocked ? '' : 'locked'}"
             title="${achievement.description}">
            <div class="achievement-icon">${achievement.icon}</div>
            <div class="achievement-name">${achievement.name}</div>
        </div>
    `).join('');
}

function updateStreakDisplay() {
    const streakDaysContainer = document.querySelector('.streak-days');
    if (!streakDaysContainer) return;

    const today = new Date().getDay();
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    streakDaysContainer.innerHTML = days.map((day, index) => {
        const isActive = index <= today;
        return `
            <div class="streak-day ${isActive ? 'active' : ''}">
                ${day}
            </div>
        `;
    }).join('');
}

// ===================================
// Course Pathway Animation
// ===================================
function initializePathway() {
    const pathwayNodes = document.querySelectorAll('.pathway-node');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 150);
            }
        });
    }, { threshold: 0.2 });

    pathwayNodes.forEach(node => {
        node.style.opacity = '0';
        node.style.transform = 'translateY(30px)';
        node.style.transition = 'all 0.6s ease-out';
        observer.observe(node);
    });
}

// ===================================
// Certificate Generation
// ===================================
function generateCertificate(courseName) {
    showNotification('Generating your certificate...', 'success');

    setTimeout(() => {
        showNotification(`Certificate for "${courseName}" is ready!`, 'success');
        // In production, this would trigger a PDF download
    }, 1500);
}

// ===================================
// Notification System
// ===================================
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `course-notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'success' ? '✓' : '!'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;

    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background-color: ${type === 'success' ? '#4CAF50' : '#f44336'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 50px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        animation: slideInRight 0.3s ease;
        max-width: 400px;
        font-weight: 600;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            if (notification.parentNode) {
                document.body.removeChild(notification);
            }
        }, 300);
    }, 3000);
}

// ===================================
// Loading State
// ===================================
function showLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.add('active');
    }
}

function hideLoading() {
    const overlay = document.querySelector('.loading-overlay');
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ===================================
// Initialize Everything
// ===================================
document.addEventListener('DOMContentLoaded', () => {
    console.log('Courses Enhanced Module Loaded');

    // Initialize filters and search
    initializeFilters();

    // Display all courses initially
    displayCourses(coursesData);

    // Initialize pathway animations
    initializePathway();

    // Update dashboard
    updateDashboard();

    // Update streak display
    updateStreakDisplay();

    // Modal close handlers
    const modalClose = document.querySelector('.modal-close');
    if (modalClose) {
        modalClose.addEventListener('click', closeCourseModal);
    }

    const modal = document.getElementById('courseModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeCourseModal();
            }
        });
    }

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeCourseModal();
        }
    });

    // Simulate some progress for demo
    if (coursesData.length > 0) {
        coursesData[0].progress = 65;
        coursesData[1].progress = 30;
        coursesData[2].progress = 100;
    }

    // Refresh display after setting progress
    setTimeout(() => {
        displayCourses(coursesData);
        updateDashboard();
    }, 100);
});

// Make functions available globally
window.enrollCourse = enrollCourse;
window.previewCourse = previewCourse;
window.closeCourseModal = closeCourseModal;
window.generateCertificate = generateCertificate;

console.log('Martin Harris Historical Association - Course System Ready!');
