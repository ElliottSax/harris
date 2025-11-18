// ===================================
// USER PROGRESS TRACKING SYSTEM
// ===================================

class ProgressTracker {
    constructor() {
        this.storageKey = 'mhha_user_progress';
        this.init();
    }

    init() {
        this.loadProgress();
        this.createProgressInterface();
        this.startStudyTimer();
    }

    loadProgress() {
        const saved = localStorage.getItem(this.storageKey);
        this.progress = saved ? JSON.parse(saved) : {
            completedCourses: [],
            inProgressCourses: {},
            bookmarks: [],
            notes: {},
            achievements: [],
            studyTime: 0,
            lastStudyDate: null,
            studyStreak: 0,
            courseRatings: {}
        };
    }

    saveProgress() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.progress));
        this.updateProgressUI();
    }

    createProgressInterface() {
        // Add progress dashboard to page
        const dashboardHTML = `
            <div id="progress-dashboard" class="progress-dashboard hidden">
                <div class="dashboard-header">
                    <h3>Your Progress</h3>
                    <button id="close-dashboard" class="btn-close">×</button>
                </div>
                <div class="dashboard-content">
                    <div class="stats-overview">
                        <div class="stat-card">
                            <div class="stat-icon">📚</div>
                            <div class="stat-value" id="completed-count">0</div>
                            <div class="stat-label">Courses Completed</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">⏱️</div>
                            <div class="stat-value" id="study-time">0h</div>
                            <div class="stat-label">Total Study Time</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🔥</div>
                            <div class="stat-value" id="study-streak">0</div>
                            <div class="stat-label">Day Streak</div>
                        </div>
                        <div class="stat-card">
                            <div class="stat-icon">🏆</div>
                            <div class="stat-value" id="achievement-count">0</div>
                            <div class="stat-label">Achievements</div>
                        </div>
                    </div>

                    <div class="progress-sections">
                        <div class="section-tabs">
                            <button class="tab-btn active" data-tab="courses">Courses</button>
                            <button class="tab-btn" data-tab="bookmarks">Bookmarks</button>
                            <button class="tab-btn" data-tab="notes">Notes</button>
                            <button class="tab-btn" data-tab="achievements">Achievements</button>
                        </div>

                        <div class="tab-content active" id="tab-courses">
                            <h4>In Progress</h4>
                            <div id="in-progress-list"></div>

                            <h4>Completed</h4>
                            <div id="completed-list"></div>
                        </div>

                        <div class="tab-content" id="tab-bookmarks">
                            <div id="bookmarks-list"></div>
                        </div>

                        <div class="tab-content" id="tab-notes">
                            <div id="notes-list"></div>
                        </div>

                        <div class="tab-content" id="tab-achievements">
                            <div id="achievements-list"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Floating Progress Button -->
            <button id="progress-btn" class="floating-progress-btn" title="View Your Progress">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M12 2v20M2 12h20"/>
                    <circle cx="12" cy="12" r="10"/>
                </svg>
                <span class="progress-badge" id="progress-badge">0</span>
            </button>

            <!-- Study Timer Widget -->
            <div id="study-timer" class="study-timer hidden">
                <div class="timer-display">
                    <span id="timer-hours">00</span>:<span id="timer-minutes">00</span>:<span id="timer-seconds">00</span>
                </div>
                <div class="timer-controls">
                    <button id="timer-start" class="timer-btn">Start</button>
                    <button id="timer-pause" class="timer-btn hidden">Pause</button>
                    <button id="timer-reset" class="timer-btn">Reset</button>
                </div>
                <button id="close-timer" class="btn-close">×</button>
            </div>

            <!-- Note-taking Modal -->
            <div id="note-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Add Note</h3>
                        <button class="btn-close" id="close-note-modal">×</button>
                    </div>
                    <div class="modal-body">
                        <input type="text" id="note-title" placeholder="Note title..." class="note-input">
                        <textarea id="note-content" placeholder="Write your note here..." rows="10" class="note-textarea"></textarea>
                        <div class="note-actions">
                            <button id="save-note" class="btn-primary">Save Note</button>
                        </div>
                    </div>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', dashboardHTML);
        this.attachProgressListeners();
        this.updateProgressUI();
    }

    attachProgressListeners() {
        // Progress button
        const progressBtn = document.getElementById('progress-btn');
        if (progressBtn) {
            progressBtn.addEventListener('click', () => this.toggleDashboard());
        }

        // Close dashboard
        const closeDashboard = document.getElementById('close-dashboard');
        if (closeDashboard) {
            closeDashboard.addEventListener('click', () => this.toggleDashboard());
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const tab = e.target.dataset.tab;
                this.switchTab(tab);
            });
        });

        // Timer controls
        document.getElementById('timer-start')?.addEventListener('click', () => this.startTimer());
        document.getElementById('timer-pause')?.addEventListener('click', () => this.pauseTimer());
        document.getElementById('timer-reset')?.addEventListener('click', () => this.resetTimer());
        document.getElementById('close-timer')?.addEventListener('click', () => this.hideTimer());

        // Note modal
        document.getElementById('close-note-modal')?.addEventListener('click', () => this.hideNoteModal());
        document.getElementById('save-note')?.addEventListener('click', () => this.saveNote());
    }

    toggleDashboard() {
        const dashboard = document.getElementById('progress-dashboard');
        if (dashboard) {
            dashboard.classList.toggle('hidden');
            this.updateProgressUI();
        }
    }

    switchTab(tabName) {
        // Update buttons
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        document.querySelector(`[data-tab="${tabName}"]`)?.classList.add('active');

        // Update content
        document.querySelectorAll('.tab-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`tab-${tabName}`)?.classList.add('active');
    }

    updateProgressUI() {
        // Update stats
        document.getElementById('completed-count').textContent = this.progress.completedCourses.length;
        document.getElementById('study-time').textContent = this.formatTime(this.progress.studyTime);
        document.getElementById('study-streak').textContent = this.progress.studyStreak;
        document.getElementById('achievement-count').textContent = this.progress.achievements.length;
        document.getElementById('progress-badge').textContent = this.progress.completedCourses.length;

        // Update lists
        this.updateInProgressList();
        this.updateCompletedList();
        this.updateBookmarksList();
        this.updateNotesList();
        this.updateAchievementsList();
    }

    updateInProgressList() {
        const container = document.getElementById('in-progress-list');
        if (!container) return;

        const inProgress = Object.keys(this.progress.inProgressCourses);

        if (inProgress.length === 0) {
            container.innerHTML = '<p class="empty-state">No courses in progress. Start a course to begin learning!</p>';
            return;
        }

        container.innerHTML = inProgress.map(courseId => {
            const courseData = this.progress.inProgressCourses[courseId];
            return `
                <div class="progress-course-item">
                    <div class="course-info">
                        <h5>${courseId}</h5>
                        <div class="progress-bar">
                            <div class="progress-fill" style="width: ${courseData.progress}%"></div>
                        </div>
                        <span class="progress-text">${courseData.progress}% complete</span>
                    </div>
                    <button class="btn-secondary btn-sm" onclick="progressTracker.continueCourse('${courseId}')">Continue</button>
                </div>
            `;
        }).join('');
    }

    updateCompletedList() {
        const container = document.getElementById('completed-list');
        if (!container) return;

        if (this.progress.completedCourses.length === 0) {
            container.innerHTML = '<p class="empty-state">No completed courses yet.</p>';
            return;
        }

        container.innerHTML = this.progress.completedCourses.map(courseId => `
            <div class="completed-course-item">
                <div class="completion-badge">✓</div>
                <div class="course-info">
                    <h5>${courseId}</h5>
                    <p class="completion-date">Completed ${this.getCompletionDate(courseId)}</p>
                </div>
                <button class="btn-secondary btn-sm" onclick="progressTracker.generateCertificate('${courseId}')">
                    Get Certificate
                </button>
            </div>
        `).join('');
    }

    updateBookmarksList() {
        const container = document.getElementById('bookmarks-list');
        if (!container) return;

        if (this.progress.bookmarks.length === 0) {
            container.innerHTML = '<p class="empty-state">No bookmarks yet. Bookmark lessons to save them for later!</p>';
            return;
        }

        container.innerHTML = this.progress.bookmarks.map((bookmark, index) => `
            <div class="bookmark-item">
                <div class="bookmark-info">
                    <h5>${bookmark.courseId}</h5>
                    <p>${bookmark.lessonTitle}</p>
                    <span class="bookmark-date">Saved ${new Date(bookmark.timestamp).toLocaleDateString()}</span>
                </div>
                <button class="btn-icon" onclick="progressTracker.removeBookmark(${index})" title="Remove bookmark">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <line x1="18" y1="6" x2="6" y2="18"/>
                        <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                </button>
            </div>
        `).join('');
    }

    updateNotesList() {
        const container = document.getElementById('notes-list');
        if (!container) return;

        const notesList = Object.keys(this.progress.notes);

        if (notesList.length === 0) {
            container.innerHTML = `
                <p class="empty-state">No notes yet. Start taking notes to remember key insights!</p>
                <button class="btn-primary" onclick="progressTracker.showNoteModal()">Add First Note</button>
            `;
            return;
        }

        container.innerHTML = `
            <button class="btn-primary" onclick="progressTracker.showNoteModal()">Add New Note</button>
            <div class="notes-grid">
                ${notesList.map(noteId => {
                    const note = this.progress.notes[noteId];
                    return `
                        <div class="note-card">
                            <h5>${note.title}</h5>
                            <p class="note-preview">${note.content.substring(0, 150)}${note.content.length > 150 ? '...' : ''}</p>
                            <div class="note-meta">
                                <span>${new Date(note.timestamp).toLocaleDateString()}</span>
                                <div class="note-actions">
                                    <button class="btn-icon" onclick="progressTracker.editNote('${noteId}')" title="Edit">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/>
                                            <path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/>
                                        </svg>
                                    </button>
                                    <button class="btn-icon" onclick="progressTracker.deleteNote('${noteId}')" title="Delete">
                                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                            <polyline points="3 6 5 6 21 6"/>
                                            <path d="M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"/>
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    updateAchievementsList() {
        const container = document.getElementById('achievements-list');
        if (!container) return;

        const allAchievements = this.getAllAchievements();

        container.innerHTML = `
            <div class="achievements-grid">
                ${allAchievements.map(achievement => {
                    const unlocked = this.progress.achievements.includes(achievement.id);
                    return `
                        <div class="achievement-card ${unlocked ? 'unlocked' : 'locked'}">
                            <div class="achievement-icon">${achievement.icon}</div>
                            <h5>${achievement.name}</h5>
                            <p>${achievement.description}</p>
                            ${unlocked ? `<span class="unlock-date">Unlocked ${this.getAchievementDate(achievement.id)}</span>` : ''}
                        </div>
                    `;
                }).join('')}
            </div>
        `;
    }

    getAllAchievements() {
        return [
            { id: 'first-course', name: 'First Steps', description: 'Complete your first course', icon: '🎓' },
            { id: 'five-courses', name: 'Dedicated Learner', description: 'Complete 5 courses', icon: '📚' },
            { id: 'all-foundational', name: 'Foundation Master', description: 'Complete all foundational courses', icon: '🏛️' },
            { id: 'week-streak', name: 'Weekly Warrior', description: 'Study for 7 days in a row', icon: '🔥' },
            { id: 'month-streak', name: 'Monthly Master', description: 'Study for 30 days in a row', icon: '💪' },
            { id: 'ten-hours', name: 'Time Invested', description: 'Study for 10 hours total', icon: '⏱️' },
            { id: 'fifty-hours', name: 'Scholar', description: 'Study for 50 hours total', icon: '📖' },
            { id: 'first-note', name: 'Note Taker', description: 'Take your first note', icon: '✍️' },
            { id: 'ten-notes', name: 'Prolific Writer', description: 'Take 10 notes', icon: '📝' },
            { id: 'all-courses', name: 'Master Scholar', description: 'Complete all available courses', icon: '👑' }
        ];
    }

    // Course Progress Methods
    startCourse(courseId) {
        if (!this.progress.inProgressCourses[courseId]) {
            this.progress.inProgressCourses[courseId] = {
                startDate: new Date().toISOString(),
                progress: 0,
                completedModules: [],
                lastAccessed: new Date().toISOString()
            };
            this.saveProgress();
        }
        this.showTimer();
    }

    continueCourse(courseId) {
        if (this.progress.inProgressCourses[courseId]) {
            this.progress.inProgressCourses[courseId].lastAccessed = new Date().toISOString();
            this.saveProgress();
        }
        this.showTimer();
    }

    updateCourseProgress(courseId, progress) {
        if (this.progress.inProgressCourses[courseId]) {
            this.progress.inProgressCourses[courseId].progress = progress;

            if (progress >= 100) {
                this.completeCourse(courseId);
            }

            this.saveProgress();
        }
    }

    completeCourse(courseId) {
        // Move from in-progress to completed
        if (this.progress.inProgressCourses[courseId]) {
            delete this.progress.inProgressCourses[courseId];
        }

        if (!this.progress.completedCourses.includes(courseId)) {
            this.progress.completedCourses.push(courseId);
            this.progress.courseRatings[courseId] = {
                completionDate: new Date().toISOString()
            };

            this.checkAchievements();
            this.saveProgress();
            this.showCourseCompletionModal(courseId);
        }
    }

    // Bookmark Methods
    addBookmark(courseId, lessonTitle, lessonId) {
        this.progress.bookmarks.push({
            courseId,
            lessonTitle,
            lessonId,
            timestamp: new Date().toISOString()
        });
        this.saveProgress();
        this.showNotification('Bookmark added!', 'success');
    }

    removeBookmark(index) {
        this.progress.bookmarks.splice(index, 1);
        this.saveProgress();
        this.updateBookmarksList();
    }

    // Note Methods
    showNoteModal(noteId = null) {
        const modal = document.getElementById('note-modal');
        if (!modal) return;

        if (noteId && this.progress.notes[noteId]) {
            document.getElementById('note-title').value = this.progress.notes[noteId].title;
            document.getElementById('note-content').value = this.progress.notes[noteId].content;
            modal.dataset.editingId = noteId;
        } else {
            document.getElementById('note-title').value = '';
            document.getElementById('note-content').value = '';
            delete modal.dataset.editingId;
        }

        modal.classList.remove('hidden');
    }

    hideNoteModal() {
        const modal = document.getElementById('note-modal');
        if (modal) modal.classList.add('hidden');
    }

    saveNote() {
        const title = document.getElementById('note-title').value.trim();
        const content = document.getElementById('note-content').value.trim();
        const modal = document.getElementById('note-modal');

        if (!title || !content) {
            alert('Please enter both a title and content for your note.');
            return;
        }

        const noteId = modal.dataset.editingId || `note_${Date.now()}`;

        this.progress.notes[noteId] = {
            title,
            content,
            timestamp: new Date().toISOString()
        };

        this.saveProgress();
        this.hideNoteModal();
        this.updateNotesList();

        if (!modal.dataset.editingId) {
            this.checkAchievements();
        }

        this.showNotification('Note saved!', 'success');
    }

    editNote(noteId) {
        this.showNoteModal(noteId);
    }

    deleteNote(noteId) {
        if (confirm('Are you sure you want to delete this note?')) {
            delete this.progress.notes[noteId];
            this.saveProgress();
            this.updateNotesList();
        }
    }

    // Timer Methods
    startStudyTimer() {
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.timerRunning = false;
    }

    showTimer() {
        const timer = document.getElementById('study-timer');
        if (timer) timer.classList.remove('hidden');
    }

    hideTimer() {
        const timer = document.getElementById('study-timer');
        if (timer) timer.classList.add('hidden');
        if (this.timerRunning) {
            this.pauseTimer();
        }
    }

    startTimer() {
        if (this.timerRunning) return;

        this.timerRunning = true;
        document.getElementById('timer-start').classList.add('hidden');
        document.getElementById('timer-pause').classList.remove('hidden');

        this.updateStudyStreak();

        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            this.progress.studyTime++;
            this.updateTimerDisplay();

            // Save every minute
            if (this.timerSeconds % 60 === 0) {
                this.saveProgress();
                this.checkAchievements();
            }
        }, 1000);
    }

    pauseTimer() {
        if (!this.timerRunning) return;

        this.timerRunning = false;
        clearInterval(this.timerInterval);
        document.getElementById('timer-start').classList.remove('hidden');
        document.getElementById('timer-pause').classList.add('hidden');
        this.saveProgress();
    }

    resetTimer() {
        this.pauseTimer();
        this.timerSeconds = 0;
        this.updateTimerDisplay();
    }

    updateTimerDisplay() {
        const hours = Math.floor(this.timerSeconds / 3600);
        const minutes = Math.floor((this.timerSeconds % 3600) / 60);
        const seconds = this.timerSeconds % 60;

        document.getElementById('timer-hours').textContent = String(hours).padStart(2, '0');
        document.getElementById('timer-minutes').textContent = String(minutes).padStart(2, '0');
        document.getElementById('timer-seconds').textContent = String(seconds).padStart(2, '0');
    }

    updateStudyStreak() {
        const today = new Date().toDateString();
        const lastStudy = this.progress.lastStudyDate ? new Date(this.progress.lastStudyDate).toDateString() : null;

        if (lastStudy === today) {
            // Already studied today
            return;
        }

        const yesterday = new Date(Date.now() - 86400000).toDateString();

        if (lastStudy === yesterday) {
            // Continued streak
            this.progress.studyStreak++;
        } else if (lastStudy !== today) {
            // Streak broken
            this.progress.studyStreak = 1;
        }

        this.progress.lastStudyDate = new Date().toISOString();
        this.saveProgress();
        this.checkAchievements();
    }

    // Achievement Methods
    checkAchievements() {
        const newAchievements = [];

        // Course completions
        if (this.progress.completedCourses.length >= 1 && !this.progress.achievements.includes('first-course')) {
            newAchievements.push('first-course');
        }
        if (this.progress.completedCourses.length >= 5 && !this.progress.achievements.includes('five-courses')) {
            newAchievements.push('five-courses');
        }
        if (this.progress.completedCourses.length >= 11 && !this.progress.achievements.includes('all-courses')) {
            newAchievements.push('all-courses');
        }

        // Study streak
        if (this.progress.studyStreak >= 7 && !this.progress.achievements.includes('week-streak')) {
            newAchievements.push('week-streak');
        }
        if (this.progress.studyStreak >= 30 && !this.progress.achievements.includes('month-streak')) {
            newAchievements.push('month-streak');
        }

        // Study time (in seconds)
        const hours = this.progress.studyTime / 3600;
        if (hours >= 10 && !this.progress.achievements.includes('ten-hours')) {
            newAchievements.push('ten-hours');
        }
        if (hours >= 50 && !this.progress.achievements.includes('fifty-hours')) {
            newAchievements.push('fifty-hours');
        }

        // Notes
        const noteCount = Object.keys(this.progress.notes).length;
        if (noteCount >= 1 && !this.progress.achievements.includes('first-note')) {
            newAchievements.push('first-note');
        }
        if (noteCount >= 10 && !this.progress.achievements.includes('ten-notes')) {
            newAchievements.push('ten-notes');
        }

        // Add new achievements
        newAchievements.forEach(achievementId => {
            this.progress.achievements.push(achievementId);
            this.showAchievementUnlock(achievementId);
        });

        if (newAchievements.length > 0) {
            this.saveProgress();
        }
    }

    showAchievementUnlock(achievementId) {
        const achievement = this.getAllAchievements().find(a => a.id === achievementId);
        if (!achievement) return;

        const popup = document.createElement('div');
        popup.className = 'achievement-popup';
        popup.innerHTML = `
            <div class="achievement-popup-content">
                <div class="achievement-popup-icon">${achievement.icon}</div>
                <h4>Achievement Unlocked!</h4>
                <h5>${achievement.name}</h5>
                <p>${achievement.description}</p>
            </div>
        `;

        document.body.appendChild(popup);

        setTimeout(() => popup.classList.add('show'), 100);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => popup.remove(), 300);
        }, 5000);
    }

    showCourseCompletionModal(courseId) {
        const modal = document.createElement('div');
        modal.className = 'modal completion-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="completion-celebration">
                    <div class="celebration-icon">🎉</div>
                    <h2>Congratulations!</h2>
                    <p>You've completed the course: <strong>${courseId}</strong></p>
                    <div class="completion-actions">
                        <button class="btn-primary" onclick="progressTracker.generateCertificate('${courseId}'); this.closest('.modal').remove();">
                            Download Certificate
                        </button>
                        <button class="btn-secondary" onclick="progressTracker.showRatingModal('${courseId}'); this.closest('.modal').remove();">
                            Rate This Course
                        </button>
                        <button class="btn-secondary" onclick="this.closest('.modal').remove();">
                            Continue Learning
                        </button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        setTimeout(() => modal.classList.add('show'), 100);
    }

    generateCertificate(courseId) {
        // This would integrate with a PDF generation library
        // For now, we'll create a simple HTML certificate
        const cert = window.open('', '_blank');
        cert.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>Certificate of Completion</title>
                <style>
                    body {
                        font-family: 'Georgia', serif;
                        padding: 40px;
                        text-align: center;
                        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                    }
                    .certificate {
                        background: white;
                        padding: 60px;
                        max-width: 800px;
                        margin: 0 auto;
                        border: 10px solid #D4AF37;
                        box-shadow: 0 0 50px rgba(0,0,0,0.3);
                    }
                    h1 {
                        font-size: 48px;
                        color: #8B4513;
                        margin-bottom: 30px;
                    }
                    .course-name {
                        font-size: 28px;
                        color: #333;
                        margin: 30px 0;
                        font-weight: bold;
                    }
                    .date {
                        margin-top: 50px;
                        color: #666;
                    }
                    @media print {
                        body { background: white; }
                        .no-print { display: none; }
                    }
                </style>
            </head>
            <body>
                <div class="certificate">
                    <h1>Certificate of Completion</h1>
                    <p style="font-size: 20px;">This certifies that</p>
                    <h2 style="font-size: 36px; margin: 20px 0;">Scholar</h2>
                    <p style="font-size: 20px;">has successfully completed</p>
                    <div class="course-name">${courseId}</div>
                    <p>Awarded by the Martin Harris Historical Association</p>
                    <div class="date">
                        <p>Date: ${new Date().toLocaleDateString()}</p>
                    </div>
                    <div class="no-print" style="margin-top: 30px;">
                        <button onclick="window.print()" style="padding: 10px 30px; font-size: 18px; cursor: pointer;">Print Certificate</button>
                    </div>
                </div>
            </body>
            </html>
        `);
    }

    showRatingModal(courseId) {
        // This would show a rating interface
        alert('Rating feature - User would rate the course here');
    }

    // Utility Methods
    formatTime(seconds) {
        const hours = Math.floor(seconds / 3600);
        return `${hours}h`;
    }

    getCompletionDate(courseId) {
        const rating = this.progress.courseRatings[courseId];
        if (rating && rating.completionDate) {
            return new Date(rating.completionDate).toLocaleDateString();
        }
        return 'Unknown';
    }

    getAchievementDate(achievementId) {
        // In a real app, we'd store unlock dates
        return 'Recently';
    }

    getUserProgress() {
        return this.progress;
    }

    showNotification(message, type) {
        if (window.showNotification) {
            window.showNotification(message, type);
        }
    }
}

// Initialize progress tracker when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.progressTracker = new ProgressTracker();
});
