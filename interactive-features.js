// ===================================
// INTERACTIVE VISUAL FEATURES
// ===================================

class InteractiveFeatures {
    constructor() {
        this.init();
    }

    init() {
        this.enhanceTimeline();
        this.createAnimatedDashboard();
        this.initializeBadgeSystem();
        this.setupCertificateGenerator();
        this.createStreakTracker();
    }

    // ===================================
    // Interactive Timeline Enhancement
    // ===================================
    enhanceTimeline() {
        const timeline = document.querySelector('.timeline');
        if (!timeline) return;

        // Make timeline interactive
        timeline.classList.add('interactive-timeline');

        const timelineItems = document.querySelectorAll('.timeline-item');
        timelineItems.forEach((item, index) => {
            // Add click to expand functionality
            const content = item.querySelector('.timeline-content');
            const marker = item.querySelector('.timeline-marker');

            // Add expand button
            const expandBtn = document.createElement('button');
            expandBtn.className = 'timeline-expand-btn';
            expandBtn.innerHTML = '+';
            expandBtn.setAttribute('aria-label', 'Expand timeline item');

            content.insertAdjacentElement('afterbegin', expandBtn);

            expandBtn.addEventListener('click', () => {
                item.classList.toggle('expanded');
                expandBtn.innerHTML = item.classList.contains('expanded') ? '−' : '+';
            });

            // Add hover effects
            marker.addEventListener('mouseenter', () => {
                this.showTimelinePopup(item, index);
            });

            marker.addEventListener('mouseleave', () => {
                this.hideTimelinePopup();
            });

            // Add year badge
            const year = content.querySelector('h3').textContent;
            const yearBadge = document.createElement('div');
            yearBadge.className = 'timeline-year-badge';
            yearBadge.textContent = year;
            marker.appendChild(yearBadge);
        });

        // Add timeline navigation
        this.createTimelineNavigation(timelineItems);
    }

    createTimelineNavigation(items) {
        const nav = document.createElement('div');
        nav.className = 'timeline-navigation';
        nav.innerHTML = `
            <div class="timeline-nav-container">
                <h4>Navigate Timeline</h4>
                <div class="timeline-nav-buttons">
                    ${Array.from(items).map((item, index) => {
                        const year = item.querySelector('h3').textContent;
                        return `<button class="timeline-nav-btn" data-index="${index}">${year}</button>`;
                    }).join('')}
                </div>
            </div>
        `;

        const timelineContainer = document.querySelector('.harris-timeline-container');
        if (timelineContainer) {
            timelineContainer.insertBefore(nav, timelineContainer.firstChild);

            // Add click handlers
            nav.querySelectorAll('.timeline-nav-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    const index = parseInt(btn.dataset.index);
                    items[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
                    items[index].classList.add('highlight');
                    setTimeout(() => items[index].classList.remove('highlight'), 2000);
                });
            });
        }
    }

    showTimelinePopup(item, index) {
        const popup = document.createElement('div');
        popup.className = 'timeline-popup';
        popup.id = 'timeline-popup';

        const title = item.querySelector('h4').textContent;
        const description = item.querySelector('p').textContent;

        popup.innerHTML = `
            <h5>${title}</h5>
            <p>${description.substring(0, 100)}...</p>
        `;

        item.appendChild(popup);
        setTimeout(() => popup.classList.add('show'), 10);
    }

    hideTimelinePopup() {
        const popup = document.getElementById('timeline-popup');
        if (popup) {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }
    }

    // ===================================
    // Animated Statistics Dashboard
    // ===================================
    createAnimatedDashboard() {
        const statsSection = document.querySelector('.stats-grid');
        if (!statsSection) return;

        // Enhance existing stats
        const statItems = statsSection.querySelectorAll('.stat-item');
        statItems.forEach(item => {
            item.classList.add('animated-stat');

            // Add animated background
            const bg = document.createElement('div');
            bg.className = 'stat-background-animation';
            item.insertBefore(bg, item.firstChild);

            // Add hover effect
            item.addEventListener('mouseenter', () => {
                this.animateStatItem(item);
            });
        });

        // Create additional interactive dashboard
        this.createFullDashboard();
    }

    createFullDashboard() {
        const harrisSection = document.getElementById('harris');
        if (!harrisSection) return;

        const dashboardHTML = `
            <div class="interactive-dashboard-section">
                <h3 class="section-subtitle">Martin Harris by the Numbers</h3>
                <div class="interactive-stats-grid">
                    <div class="interactive-stat-card" data-stat="lifespan">
                        <div class="stat-visual">
                            <svg viewBox="0 0 100 100" class="circular-progress">
                                <circle cx="50" cy="50" r="45" class="progress-bg"/>
                                <circle cx="50" cy="50" r="45" class="progress-bar" data-progress="92"/>
                            </svg>
                            <div class="stat-number">92</div>
                        </div>
                        <h4>Years of Life</h4>
                        <p>Lived through revolutionary changes in American religion</p>
                    </div>

                    <div class="interactive-stat-card" data-stat="churches">
                        <div class="stat-visual">
                            <svg viewBox="0 0 100 100" class="circular-progress">
                                <circle cx="50" cy="50" r="45" class="progress-bg"/>
                                <circle cx="50" cy="50" r="45" class="progress-bar" data-progress="60"/>
                            </svg>
                            <div class="stat-number">6+</div>
                        </div>
                        <h4>Church Affiliations</h4>
                        <p>A lifelong seeker exploring different restoration movements</p>
                    </div>

                    <div class="interactive-stat-card" data-stat="distance">
                        <div class="stat-visual">
                            <svg viewBox="0 0 100 100" class="circular-progress">
                                <circle cx="50" cy="50" r="45" class="progress-bg"/>
                                <circle cx="50" cy="50" r="45" class="progress-bar" data-progress="75"/>
                            </svg>
                            <div class="stat-number">1,300</div>
                        </div>
                        <h4>Miles to Utah (age 87)</h4>
                        <p>Cross-country journey in his late eighties</p>
                    </div>

                    <div class="interactive-stat-card" data-stat="years">
                        <div class="stat-visual">
                            <svg viewBox="0 0 100 100" class="circular-progress">
                                <circle cx="50" cy="50" r="45" class="progress-bg"/>
                                <circle cx="50" cy="50" r="45" class="progress-bar" data-progress="85"/>
                            </svg>
                            <div class="stat-number">45</div>
                        </div>
                        <h4>Years Since Excommunication</h4>
                        <p>Remained a witness despite separation from the church</p>
                    </div>
                </div>
            </div>
        `;

        const bioSection = harrisSection.querySelector('.harris-bio');
        if (bioSection) {
            bioSection.insertAdjacentHTML('afterend', dashboardHTML);
            this.animateCircularProgress();
        }
    }

    animateCircularProgress() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const progressBars = entry.target.querySelectorAll('.progress-bar');
                    progressBars.forEach(bar => {
                        const progress = bar.dataset.progress;
                        const circumference = 2 * Math.PI * 45;
                        const offset = circumference - (progress / 100) * circumference;

                        bar.style.strokeDasharray = circumference;
                        bar.style.strokeDashoffset = circumference;

                        setTimeout(() => {
                            bar.style.strokeDashoffset = offset;
                        }, 100);
                    });
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });

        const dashboard = document.querySelector('.interactive-stats-grid');
        if (dashboard) observer.observe(dashboard);
    }

    animateStatItem(item) {
        const h4 = item.querySelector('h4');
        if (!h4) return;

        const originalValue = h4.textContent;
        const numValue = parseInt(originalValue.replace(/[^0-9]/g, ''));

        if (!isNaN(numValue)) {
            let current = 0;
            const increment = Math.ceil(numValue / 30);

            const interval = setInterval(() => {
                current += increment;
                if (current >= numValue) {
                    h4.textContent = originalValue;
                    clearInterval(interval);
                } else {
                    h4.textContent = current.toString();
                }
            }, 30);
        }
    }

    // ===================================
    // Badge Achievement System
    // ===================================
    initializeBadgeSystem() {
        this.createBadgeShowcase();
    }

    createBadgeShowcase() {
        const coursesSection = document.getElementById('courses');
        if (!coursesSection) return;

        const badgeHTML = `
            <div class="badge-showcase-section">
                <h3>Earn Achievement Badges</h3>
                <p class="section-intro">Complete courses and milestones to unlock these special badges!</p>
                <div class="badge-grid">
                    ${this.getBadgeDefinitions().map(badge => `
                        <div class="badge-item" data-badge-id="${badge.id}">
                            <div class="badge-icon ${badge.rarity}">${badge.icon}</div>
                            <h5>${badge.name}</h5>
                            <p>${badge.description}</p>
                            <div class="badge-rarity">${badge.rarity}</div>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;

        const lastCourseGrid = coursesSection.querySelector('.courses-grid:last-of-type');
        if (lastCourseGrid) {
            lastCourseGrid.insertAdjacentHTML('afterend', badgeHTML);
        }
    }

    getBadgeDefinitions() {
        return [
            { id: 'newcomer', name: 'Newcomer', description: 'Started your first course', icon: '🌱', rarity: 'common' },
            { id: 'scholar', name: 'Scholar', description: 'Completed 3 courses', icon: '📚', rarity: 'common' },
            { id: 'historian', name: 'Historian', description: 'Completed all foundational courses', icon: '📜', rarity: 'rare' },
            { id: 'researcher', name: 'Researcher', description: 'Completed 5 advanced courses', icon: '🔍', rarity: 'rare' },
            { id: 'master', name: 'Master Scholar', description: 'Completed all available courses', icon: '👑', rarity: 'epic' },
            { id: 'dedicated', name: 'Dedicated Learner', description: '30-day study streak', icon: '🔥', rarity: 'rare' },
            { id: 'night-owl', name: 'Night Owl', description: 'Study session after midnight', icon: '🦉', rarity: 'common' },
            { id: 'early-bird', name: 'Early Bird', description: 'Study session before 6 AM', icon: '🌅', rarity: 'common' },
            { id: 'marathon', name: 'Marathon Student', description: '5+ hours in single session', icon: '⏱️', rarity: 'epic' },
            { id: 'note-master', name: 'Note Master', description: 'Created 50+ notes', icon: '✍️', rarity: 'rare' },
            { id: 'perfectionist', name: 'Perfectionist', description: '100% completion on 5 courses', icon: '💎', rarity: 'epic' },
            { id: 'contributor', name: 'Contributor', description: 'Shared notes with community', icon: '🤝', rarity: 'rare' }
        ];
    }

    // ===================================
    // Certificate Generator
    // ===================================
    setupCertificateGenerator() {
        // This is handled in the progress tracker
        // but we add enhanced visuals
        this.addCertificateStyles();
    }

    addCertificateStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .certificate-preview {
                background: white;
                padding: 40px;
                border: 5px solid #D4AF37;
                margin: 20px 0;
                text-align: center;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            }

            .certificate-seal {
                width: 80px;
                height: 80px;
                background: radial-gradient(circle, #D4AF37, #8B4513);
                border-radius: 50%;
                margin: 20px auto;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-weight: bold;
                box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            }
        `;
        document.head.appendChild(style);
    }

    // ===================================
    // Study Streak Tracker with Visual Rewards
    // ===================================
    createStreakTracker() {
        const streakHTML = `
            <div id="streak-tracker" class="streak-tracker">
                <div class="streak-header">
                    <div class="streak-icon">🔥</div>
                    <div class="streak-info">
                        <h4><span id="streak-days">0</span> Day Streak</h4>
                        <p>Keep it going!</p>
                    </div>
                </div>

                <div class="streak-calendar">
                    ${this.generateStreakCalendar()}
                </div>

                <div class="streak-milestones">
                    <div class="milestone" data-days="7">
                        <div class="milestone-icon">⭐</div>
                        <span>7 Days</span>
                    </div>
                    <div class="milestone" data-days="30">
                        <div class="milestone-icon">💫</div>
                        <span>30 Days</span>
                    </div>
                    <div class="milestone" data-days="100">
                        <div class="milestone-icon">🏆</div>
                        <span>100 Days</span>
                    </div>
                    <div class="milestone" data-days="365">
                        <div class="milestone-icon">👑</div>
                        <span>1 Year</span>
                    </div>
                </div>

                <div class="streak-rewards">
                    <h5>Streak Rewards</h5>
                    <div id="streak-rewards-list"></div>
                </div>
            </div>
        `;

        // Add to resources section
        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            const container = resourcesSection.querySelector('.container');
            if (container) {
                container.insertAdjacentHTML('beforeend', streakHTML);
                this.updateStreakTracker();
            }
        }
    }

    generateStreakCalendar() {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        let html = '<div class="calendar-header">';
        days.forEach(day => {
            html += `<div class="calendar-day-label">${day}</div>`;
        });
        html += '</div><div class="calendar-grid">';

        // Generate last 28 days
        for (let i = 27; i >= 0; i--) {
            const date = new Date();
            date.setDate(date.getDate() - i);
            const dayOfWeek = date.getDay();

            html += `<div class="calendar-day" data-date="${date.toISOString()}" title="${date.toLocaleDateString()}"></div>`;
        }

        html += '</div>';
        return html;
    }

    updateStreakTracker() {
        const progress = window.progressTracker?.getUserProgress();
        if (!progress) return;

        const streakDays = document.getElementById('streak-days');
        if (streakDays) {
            streakDays.textContent = progress.studyStreak || 0;
        }

        // Update milestone progress
        const milestones = document.querySelectorAll('.milestone');
        milestones.forEach(milestone => {
            const targetDays = parseInt(milestone.dataset.days);
            if (progress.studyStreak >= targetDays) {
                milestone.classList.add('achieved');
            }
        });

        // Mark study days on calendar
        // This would integrate with actual study history
        this.updateCalendarDays(progress);
    }

    updateCalendarDays(progress) {
        // Mock implementation - would use actual study history
        const calendarDays = document.querySelectorAll('.calendar-day');
        const studyDays = Math.min(progress.studyStreak, 28);

        calendarDays.forEach((day, index) => {
            if (index >= (28 - studyDays)) {
                day.classList.add('studied');
            }
        });
    }

    // ===================================
    // Interactive Course Cards Enhancement
    // ===================================
    enhanceCourseCards() {
        const courseCards = document.querySelectorAll('.course-card');

        courseCards.forEach(card => {
            // Add 3D tilt effect
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                const centerX = rect.width / 2;
                const centerY = rect.height / 2;

                const rotateX = (y - centerY) / 10;
                const rotateY = (centerX - x) / 10;

                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            });

            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
            });

            // Add sparkle effect on hover
            card.addEventListener('mouseenter', () => {
                this.createSparkles(card);
            });
        });
    }

    createSparkles(element) {
        for (let i = 0; i < 5; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = Math.random() * 100 + '%';
            sparkle.style.top = Math.random() * 100 + '%';
            sparkle.style.animationDelay = Math.random() * 0.5 + 's';

            element.appendChild(sparkle);

            setTimeout(() => sparkle.remove(), 1000);
        }
    }

    // ===================================
    // Gamification Elements
    // ===================================
    createLevelSystem() {
        const level = this.calculateUserLevel();

        const levelWidget = document.createElement('div');
        levelWidget.className = 'level-widget';
        levelWidget.innerHTML = `
            <div class="level-badge">
                <div class="level-number">${level.current}</div>
                <div class="level-label">Level</div>
            </div>
            <div class="level-progress">
                <div class="level-progress-bar" style="width: ${level.progress}%"></div>
            </div>
            <div class="level-text">${level.pointsToNext} XP to Level ${level.current + 1}</div>
        `;

        return levelWidget;
    }

    calculateUserLevel() {
        const progress = window.progressTracker?.getUserProgress();
        if (!progress) return { current: 1, progress: 0, pointsToNext: 100 };

        // Calculate XP from various activities
        let xp = 0;
        xp += progress.completedCourses.length * 100;
        xp += Object.keys(progress.notes).length * 10;
        xp += Math.floor(progress.studyTime / 3600) * 50; // 50 XP per hour
        xp += progress.studyStreak * 5;

        // Calculate level (100 XP per level, increasing)
        let level = 1;
        let xpForNextLevel = 100;
        let totalXpForLevel = 0;

        while (xp >= totalXpForLevel + xpForNextLevel) {
            totalXpForLevel += xpForNextLevel;
            level++;
            xpForNextLevel = Math.floor(xpForNextLevel * 1.2);
        }

        const xpInCurrentLevel = xp - totalXpForLevel;
        const progress = (xpInCurrentLevel / xpForNextLevel) * 100;

        return {
            current: level,
            progress: progress,
            pointsToNext: xpForNextLevel - xpInCurrentLevel
        };
    }
}

// ===================================
// Particle Effects System
// ===================================
class ParticleSystem {
    constructor() {
        this.particles = [];
    }

    createCelebration(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 30; i++) {
            this.createParticle(centerX, centerY);
        }
    }

    createParticle(x, y) {
        const particle = document.createElement('div');
        particle.className = 'celebration-particle';

        const angle = Math.random() * Math.PI * 2;
        const velocity = 2 + Math.random() * 4;
        const vx = Math.cos(angle) * velocity;
        const vy = Math.sin(angle) * velocity;

        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.backgroundColor = this.getRandomColor();

        document.body.appendChild(particle);

        this.animateParticle(particle, vx, vy);
    }

    animateParticle(particle, vx, vy) {
        let x = parseFloat(particle.style.left);
        let y = parseFloat(particle.style.top);
        let opacity = 1;

        const animate = () => {
            x += vx;
            y += vy;
            opacity -= 0.02;

            particle.style.left = x + 'px';
            particle.style.top = y + 'px';
            particle.style.opacity = opacity;

            if (opacity > 0) {
                requestAnimationFrame(animate);
            } else {
                particle.remove();
            }
        };

        animate();
    }

    getRandomColor() {
        const colors = ['#FFD700', '#FF6347', '#4169E1', '#32CD32', '#FF69B4', '#FFA500'];
        return colors[Math.floor(Math.random() * colors.length)];
    }
}

// Initialize interactive features when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.interactiveFeatures = new InteractiveFeatures();
    window.particleSystem = new ParticleSystem();
});
