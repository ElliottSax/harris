// ===================================
// ENGAGEMENT & SOCIAL FEATURES
// ===================================

class EngagementSystem {
    constructor() {
        this.storageKey = 'mhha_engagement';
        this.init();
    }

    init() {
        this.loadData();
        this.createDiscussionSystem();
        this.createStudyGroupFinder();
        this.createSocialSharing();
        this.createEmailReminders();
        this.createRatingSystem();
    }

    loadData() {
        const saved = localStorage.getItem(this.storageKey);
        this.data = saved ? JSON.parse(saved) : {
            comments: [],
            studyGroups: [],
            reminders: [],
            ratings: {}
        };
    }

    saveData() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.data));
    }

    // ===================================
    // Discussion Forum / Commenting System
    // ===================================
    createDiscussionSystem() {
        const forumHTML = `
            <div class="discussion-forum-section">
                <h3 class="section-subtitle">Community Discussions</h3>
                <p>Join the conversation with fellow learners and researchers</p>

                <div class="discussion-container">
                    <div class="discussion-sidebar">
                        <h4>Topics</h4>
                        <div class="topic-list">
                            <button class="topic-btn active" data-topic="general">General Discussion</button>
                            <button class="topic-btn" data-topic="courses">Course Questions</button>
                            <button class="topic-btn" data-topic="research">Research Collaboration</button>
                            <button class="topic-btn" data-topic="sources">Primary Sources</button>
                            <button class="topic-btn" data-topic="interpretations">Interpretations</button>
                        </div>

                        <button id="new-discussion-btn" class="btn-primary">
                            Start New Discussion
                        </button>
                    </div>

                    <div class="discussion-main">
                        <div class="discussion-header">
                            <h4>Recent Discussions</h4>
                            <select id="discussion-sort" class="filter-select">
                                <option value="recent">Most Recent</option>
                                <option value="popular">Most Popular</option>
                                <option value="active">Most Active</option>
                            </select>
                        </div>

                        <div id="discussion-list" class="discussion-list">
                            ${this.renderDiscussions()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- New Discussion Modal -->
            <div id="new-discussion-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Start New Discussion</h3>
                        <button class="btn-close" id="close-discussion-modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="discussion-title">Title</label>
                            <input type="text" id="discussion-title" placeholder="What would you like to discuss?" class="form-input">
                        </div>

                        <div class="form-group">
                            <label for="discussion-topic">Topic</label>
                            <select id="discussion-topic" class="form-select">
                                <option value="general">General Discussion</option>
                                <option value="courses">Course Questions</option>
                                <option value="research">Research Collaboration</option>
                                <option value="sources">Primary Sources</option>
                                <option value="interpretations">Interpretations</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="discussion-content">Your Question or Comment</label>
                            <textarea id="discussion-content" rows="6" placeholder="Share your thoughts..." class="form-textarea"></textarea>
                        </div>

                        <button id="post-discussion" class="btn-primary">Post Discussion</button>
                    </div>
                </div>
            </div>

            <!-- Comment Thread Modal -->
            <div id="comment-thread-modal" class="modal hidden">
                <div class="modal-content large">
                    <div class="modal-header">
                        <h3 id="thread-title">Discussion</h3>
                        <button class="btn-close" id="close-thread-modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div id="thread-content"></div>

                        <div class="comment-form">
                            <h4>Add Your Comment</h4>
                            <textarea id="comment-text" rows="4" placeholder="Share your thoughts..." class="form-textarea"></textarea>
                            <button id="post-comment" class="btn-primary">Post Comment</button>
                        </div>

                        <div id="comments-list" class="comments-list"></div>
                    </div>
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            resourcesSection.insertAdjacentHTML('beforeend', forumHTML);
            this.attachDiscussionListeners();
        }
    }

    renderDiscussions() {
        const sampleDiscussions = [
            {
                id: 1,
                title: 'Understanding Martin Harris\'s "Spiritual Eyes" description',
                author: 'Scholar23',
                topic: 'interpretations',
                replies: 12,
                views: 156,
                lastActivity: new Date(Date.now() - 86400000).toISOString()
            },
            {
                id: 2,
                title: 'Primary sources on the Lost 116 Pages?',
                author: 'Researcher_Jane',
                topic: 'sources',
                replies: 8,
                views: 98,
                lastActivity: new Date(Date.now() - 172800000).toISOString()
            },
            {
                id: 3,
                title: 'Folk magic practices in 1820s New York',
                author: 'HistoryBuff',
                topic: 'general',
                replies: 15,
                views: 203,
                lastActivity: new Date(Date.now() - 259200000).toISOString()
            }
        ];

        return sampleDiscussions.map(discussion => `
            <div class="discussion-item" data-discussion-id="${discussion.id}">
                <div class="discussion-info">
                    <h5>${discussion.title}</h5>
                    <div class="discussion-meta">
                        <span class="topic-badge">${discussion.topic}</span>
                        <span>by ${discussion.author}</span>
                        <span>${new Date(discussion.lastActivity).toLocaleDateString()}</span>
                    </div>
                </div>
                <div class="discussion-stats">
                    <div class="stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z"/>
                        </svg>
                        ${discussion.replies}
                    </div>
                    <div class="stat">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        ${discussion.views}
                    </div>
                </div>
            </div>
        `).join('');
    }

    attachDiscussionListeners() {
        // New discussion button
        document.getElementById('new-discussion-btn')?.addEventListener('click', () => {
            document.getElementById('new-discussion-modal').classList.remove('hidden');
        });

        // Close modals
        document.getElementById('close-discussion-modal')?.addEventListener('click', () => {
            document.getElementById('new-discussion-modal').classList.add('hidden');
        });

        document.getElementById('close-thread-modal')?.addEventListener('click', () => {
            document.getElementById('comment-thread-modal').classList.add('hidden');
        });

        // Post discussion
        document.getElementById('post-discussion')?.addEventListener('click', () => {
            this.postNewDiscussion();
        });

        // Open discussion threads
        document.querySelectorAll('.discussion-item').forEach(item => {
            item.addEventListener('click', () => {
                const discussionId = item.dataset.discussionId;
                this.openDiscussionThread(discussionId);
            });
        });

        // Post comment
        document.getElementById('post-comment')?.addEventListener('click', () => {
            this.postComment();
        });
    }

    postNewDiscussion() {
        const title = document.getElementById('discussion-title').value;
        const topic = document.getElementById('discussion-topic').value;
        const content = document.getElementById('discussion-content').value;

        if (!title || !content) {
            alert('Please fill in all fields');
            return;
        }

        // In production, this would send to a backend
        this.showNotification('Discussion posted! (Demo mode - not saved)', 'success');

        document.getElementById('new-discussion-modal').classList.add('hidden');
        document.getElementById('discussion-title').value = '';
        document.getElementById('discussion-content').value = '';
    }

    openDiscussionThread(discussionId) {
        const modal = document.getElementById('comment-thread-modal');
        const threadTitle = document.getElementById('thread-title');
        const threadContent = document.getElementById('thread-content');
        const commentsList = document.getElementById('comments-list');

        // Sample thread data
        threadTitle.textContent = 'Understanding Martin Harris\'s "Spiritual Eyes" description';
        threadContent.innerHTML = `
            <div class="thread-post">
                <div class="post-author">
                    <div class="avatar">S</div>
                    <div class="author-info">
                        <strong>Scholar23</strong>
                        <span>Posted 1 day ago</span>
                    </div>
                </div>
                <div class="post-content">
                    <p>I've been studying Martin Harris's various descriptions of his witness experience. In some accounts, he says he saw the plates with "spiritual eyes" or "the eye of faith" rather than natural sight. How should we understand this distinction? Was this always how he described it, or did his description evolve over time?</p>
                    <p>I'm particularly interested in the historical context of how 19th-century people understood spiritual versus physical sight.</p>
                </div>
            </div>
        `;

        commentsList.innerHTML = `
            <div class="comment">
                <div class="comment-author">
                    <div class="avatar">R</div>
                    <div class="author-info">
                        <strong>Researcher_Jane</strong>
                        <span>18 hours ago</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>Great question! From what I've read, Harris was actually quite consistent about this distinction throughout his life. The "spiritual eyes" language appears in multiple interviews from different time periods.</p>
                    <p>What's interesting is that this wasn't unique to Harris - other visionaries of the era used similar language to describe spiritual experiences.</p>
                </div>
                <div class="comment-actions">
                    <button class="btn-link">Reply</button>
                    <button class="btn-link">👍 5</button>
                </div>
            </div>

            <div class="comment">
                <div class="comment-author">
                    <div class="avatar">H</div>
                    <div class="author-info">
                        <strong>HistoryBuff</strong>
                        <span>12 hours ago</span>
                    </div>
                </div>
                <div class="comment-content">
                    <p>I'd also recommend looking at contemporary religious literature from the Second Great Awakening. The distinction between "natural" and "spiritual" sight was common in revival testimonies of that era.</p>
                </div>
                <div class="comment-actions">
                    <button class="btn-link">Reply</button>
                    <button class="btn-link">👍 3</button>
                </div>
            </div>
        `;

        modal.classList.remove('hidden');
        this.currentDiscussionId = discussionId;
    }

    postComment() {
        const text = document.getElementById('comment-text').value;

        if (!text.trim()) {
            alert('Please enter a comment');
            return;
        }

        this.showNotification('Comment posted! (Demo mode)', 'success');
        document.getElementById('comment-text').value = '';
    }

    // ===================================
    // Study Group Finder
    // ===================================
    createStudyGroupFinder() {
        const studyGroupHTML = `
            <div class="study-group-section">
                <h3 class="section-subtitle">Study Group Finder</h3>
                <p>Connect with others studying restoration history</p>

                <div class="study-group-container">
                    <div class="study-group-filters">
                        <h4>Find Your Group</h4>

                        <div class="form-group">
                            <label>Interest Area</label>
                            <select id="group-interest" class="form-select">
                                <option value="">All Topics</option>
                                <option value="general">General History</option>
                                <option value="witnesses">Witness Studies</option>
                                <option value="folk-magic">Folk Magic Context</option>
                                <option value="succession">Succession Movements</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Experience Level</label>
                            <select id="group-level" class="form-select">
                                <option value="">Any Level</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="advanced">Advanced</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label>Meeting Format</label>
                            <select id="group-format" class="form-select">
                                <option value="">Any Format</option>
                                <option value="online">Online Only</option>
                                <option value="inperson">In-Person</option>
                                <option value="hybrid">Hybrid</option>
                            </select>
                        </div>

                        <button class="btn-primary" id="create-group-btn">
                            Create New Group
                        </button>
                    </div>

                    <div class="study-groups-list">
                        <h4>Available Study Groups</h4>
                        <div id="groups-container">
                            ${this.renderStudyGroups()}
                        </div>
                    </div>
                </div>
            </div>

            <!-- Create Group Modal -->
            <div id="create-group-modal" class="modal hidden">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>Create Study Group</h3>
                        <button class="btn-close" id="close-group-modal">×</button>
                    </div>
                    <div class="modal-body">
                        <div class="form-group">
                            <label for="group-name">Group Name</label>
                            <input type="text" id="group-name" placeholder="e.g., Harris Testimony Study Group" class="form-input">
                        </div>

                        <div class="form-group">
                            <label for="group-description">Description</label>
                            <textarea id="group-description" rows="4" placeholder="What will your group study?" class="form-textarea"></textarea>
                        </div>

                        <div class="form-group">
                            <label for="group-interest-create">Focus Area</label>
                            <select id="group-interest-create" class="form-select">
                                <option value="general">General History</option>
                                <option value="witnesses">Witness Studies</option>
                                <option value="folk-magic">Folk Magic Context</option>
                                <option value="succession">Succession Movements</option>
                            </select>
                        </div>

                        <div class="form-group">
                            <label for="group-schedule">Meeting Schedule</label>
                            <input type="text" id="group-schedule" placeholder="e.g., Tuesdays 7pm EST" class="form-input">
                        </div>

                        <button id="submit-group" class="btn-primary">Create Group</button>
                    </div>
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            resourcesSection.insertAdjacentHTML('beforeend', studyGroupHTML);
            this.attachStudyGroupListeners();
        }
    }

    renderStudyGroups() {
        const groups = [
            {
                id: 1,
                name: 'Three Witnesses Deep Dive',
                description: 'In-depth study of all Three Witnesses testimonies and life paths',
                members: 12,
                interest: 'witnesses',
                level: 'intermediate',
                format: 'online',
                schedule: 'Thursdays 8pm EST'
            },
            {
                id: 2,
                name: 'Folk Magic Historical Context',
                description: 'Exploring treasure seeking, seer stones, and magical worldviews in 1820s America',
                members: 8,
                interest: 'folk-magic',
                level: 'beginner',
                format: 'online',
                schedule: 'Tuesdays 7pm EST'
            },
            {
                id: 3,
                name: 'Succession Crisis Study',
                description: 'Understanding the various succession claims and restoration movements post-1844',
                members: 15,
                interest: 'succession',
                level: 'advanced',
                format: 'hybrid',
                schedule: 'Sundays 6pm EST'
            }
        ];

        return groups.map(group => `
            <div class="study-group-card">
                <div class="group-header">
                    <h5>${group.name}</h5>
                    <span class="members-badge">${group.members} members</span>
                </div>

                <p class="group-description">${group.description}</p>

                <div class="group-details">
                    <div class="detail">
                        <strong>Focus:</strong> ${group.interest}
                    </div>
                    <div class="detail">
                        <strong>Level:</strong> ${group.level}
                    </div>
                    <div class="detail">
                        <strong>Format:</strong> ${group.format}
                    </div>
                    <div class="detail">
                        <strong>Schedule:</strong> ${group.schedule}
                    </div>
                </div>

                <button class="btn-primary join-group" data-group-id="${group.id}">
                    Request to Join
                </button>
            </div>
        `).join('');
    }

    attachStudyGroupListeners() {
        document.getElementById('create-group-btn')?.addEventListener('click', () => {
            document.getElementById('create-group-modal').classList.remove('hidden');
        });

        document.getElementById('close-group-modal')?.addEventListener('click', () => {
            document.getElementById('create-group-modal').classList.add('hidden');
        });

        document.getElementById('submit-group')?.addEventListener('click', () => {
            this.createStudyGroup();
        });

        document.querySelectorAll('.join-group').forEach(btn => {
            btn.addEventListener('click', () => {
                this.showNotification('Join request sent! (Demo mode)', 'success');
            });
        });
    }

    createStudyGroup() {
        const name = document.getElementById('group-name').value;
        const description = document.getElementById('group-description').value;

        if (!name || !description) {
            alert('Please fill in all required fields');
            return;
        }

        this.showNotification('Study group created! (Demo mode)', 'success');
        document.getElementById('create-group-modal').classList.add('hidden');
    }

    // ===================================
    // Social Sharing
    // ===================================
    createSocialSharing() {
        // Add share buttons to course completion
        this.enhanceCourseCompletionWithSharing();
    }

    enhanceCourseCompletionWithSharing() {
        // This integrates with the progress tracker
        document.addEventListener('course-completed', (e) => {
            this.showSharePrompt(e.detail.courseId);
        });
    }

    showSharePrompt(courseId) {
        const shareModal = document.createElement('div');
        shareModal.className = 'modal share-modal';
        shareModal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Share Your Achievement!</h3>
                    <button class="btn-close">×</button>
                </div>
                <div class="modal-body">
                    <p>Congratulations on completing this course! Share your achievement with others:</p>

                    <div class="share-buttons">
                        <button class="share-btn twitter" data-platform="twitter">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"/>
                            </svg>
                            Share on Twitter
                        </button>

                        <button class="share-btn facebook" data-platform="facebook">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"/>
                            </svg>
                            Share on Facebook
                        </button>

                        <button class="share-btn linkedin" data-platform="linkedin">
                            <svg viewBox="0 0 24 24" fill="currentColor">
                                <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"/>
                                <circle cx="4" cy="4" r="2"/>
                            </svg>
                            Share on LinkedIn
                        </button>

                        <button class="share-btn copy" data-platform="copy">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                                <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"/>
                            </svg>
                            Copy Link
                        </button>
                    </div>

                    <div class="share-preview">
                        <h4>Preview:</h4>
                        <p>"Just completed '${courseId}' at Martin Harris Historical Association! 🎓 #RestorationHistory #Learning"</p>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(shareModal);

        shareModal.querySelector('.btn-close').addEventListener('click', () => shareModal.remove());

        shareModal.querySelectorAll('.share-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const platform = btn.dataset.platform;
                this.shareToSocial(platform, courseId);
            });
        });

        setTimeout(() => shareModal.classList.add('show'), 100);
    }

    shareToSocial(platform, courseId) {
        const text = `Just completed '${courseId}' at Martin Harris Historical Association! 🎓 #RestorationHistory`;
        const url = window.location.href;

        const shareUrls = {
            twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
            facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
            linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        };

        if (platform === 'copy') {
            navigator.clipboard.writeText(url);
            this.showNotification('Link copied to clipboard!', 'success');
        } else if (shareUrls[platform]) {
            window.open(shareUrls[platform], '_blank', 'width=600,height=400');
        }
    }

    // ===================================
    // Email Reminders
    // ===================================
    createEmailReminders() {
        const reminderHTML = `
            <div class="email-reminders-section">
                <h3 class="section-subtitle">Study Reminders</h3>
                <p>Never miss a study session - set up email reminders</p>

                <div class="reminder-settings">
                    <div class="setting-card">
                        <h4>Course Progress Reminders</h4>
                        <p>Get reminded to continue courses you've started</p>

                        <div class="reminder-options">
                            <label class="reminder-option">
                                <input type="checkbox" name="reminder-progress" value="daily">
                                <span>Daily (if inactive for 1 day)</span>
                            </label>
                            <label class="reminder-option">
                                <input type="checkbox" name="reminder-progress" value="weekly">
                                <span>Weekly (if inactive for 1 week)</span>
                            </label>
                        </div>
                    </div>

                    <div class="setting-card">
                        <h4>New Content Alerts</h4>
                        <p>Be notified when new courses or resources are added</p>

                        <label class="reminder-option">
                            <input type="checkbox" name="reminder-newcontent">
                            <span>Notify me of new content</span>
                        </label>
                    </div>

                    <div class="setting-card">
                        <h4>Study Streak Protection</h4>
                        <p>Get reminded to maintain your study streak</p>

                        <label class="reminder-option">
                            <input type="checkbox" name="reminder-streak">
                            <span>Remind me to study daily</span>
                        </label>

                        <div class="time-selector">
                            <label>Preferred reminder time:</label>
                            <input type="time" id="reminder-time" value="19:00">
                        </div>
                    </div>

                    <div class="setting-card">
                        <h4>Email Address</h4>
                        <input type="email" id="reminder-email" placeholder="your@email.com" class="form-input">
                    </div>

                    <button id="save-reminders" class="btn-primary">
                        Save Reminder Settings
                    </button>
                </div>
            </div>
        `;

        const resourcesSection = document.getElementById('resources');
        if (resourcesSection) {
            resourcesSection.insertAdjacentHTML('beforeend', reminderHTML);
            this.attachReminderListeners();
        }
    }

    attachReminderListeners() {
        document.getElementById('save-reminders')?.addEventListener('click', () => {
            const email = document.getElementById('reminder-email').value;

            if (!email) {
                alert('Please enter an email address');
                return;
            }

            const settings = {
                email,
                progress: Array.from(document.querySelectorAll('input[name="reminder-progress"]:checked')).map(i => i.value),
                newContent: document.querySelector('input[name="reminder-newcontent"]').checked,
                streak: document.querySelector('input[name="reminder-streak"]').checked,
                time: document.getElementById('reminder-time').value
            };

            // Save to localStorage (in production, would send to backend)
            localStorage.setItem('mhha_reminders', JSON.stringify(settings));

            this.showNotification('Reminder settings saved! (Demo mode - emails not actually sent)', 'success');
        });
    }

    // ===================================
    // Course Rating & Review System
    // ===================================
    createRatingSystem() {
        // This enhances the course cards with rating functionality
        this.addRatingsToCourses();
    }

    addRatingsToCourses() {
        // Add rating interface to course completion
        document.addEventListener('DOMContentLoaded', () => {
            this.enhanceCoursesWithRatings();
        });
    }

    enhanceCoursesWithRatings() {
        // This would be called after courses are rendered
        setTimeout(() => {
            document.querySelectorAll('.course-card, .enhanced-course-card').forEach(card => {
                if (!card.querySelector('.course-rating-section')) {
                    const ratingSection = document.createElement('div');
                    ratingSection.className = 'course-rating-section';
                    ratingSection.innerHTML = `
                        <button class="rate-course-btn" data-course-id="${card.dataset.courseId || 'unknown'}">
                            Rate This Course
                        </button>
                    `;
                    card.appendChild(ratingSection);

                    ratingSection.querySelector('.rate-course-btn').addEventListener('click', (e) => {
                        e.stopPropagation();
                        const courseId = e.target.dataset.courseId;
                        this.showRatingModal(courseId);
                    });
                }
            });
        }, 1000);
    }

    showRatingModal(courseId) {
        const modal = document.createElement('div');
        modal.className = 'modal rating-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <div class="modal-header">
                    <h3>Rate This Course</h3>
                    <button class="btn-close">×</button>
                </div>
                <div class="modal-body">
                    <h4>${courseId}</h4>

                    <div class="rating-stars-input">
                        <p>Overall Rating:</p>
                        <div class="stars-container">
                            ${[5,4,3,2,1].map(rating => `
                                <label class="star-label">
                                    <input type="radio" name="rating" value="${rating}">
                                    <span class="star" data-rating="${rating}">★</span>
                                </label>
                            `).join('')}
                        </div>
                    </div>

                    <div class="rating-aspects">
                        <h5>Rate Specific Aspects:</h5>

                        <div class="aspect-rating">
                            <label>Content Quality:</label>
                            <select name="content-quality" class="form-select">
                                <option value="">Select...</option>
                                <option value="5">Excellent</option>
                                <option value="4">Very Good</option>
                                <option value="3">Good</option>
                                <option value="2">Fair</option>
                                <option value="1">Poor</option>
                            </select>
                        </div>

                        <div class="aspect-rating">
                            <label>Difficulty Level:</label>
                            <select name="difficulty" class="form-select">
                                <option value="">Select...</option>
                                <option value="5">Perfect</option>
                                <option value="4">Slightly Challenging</option>
                                <option value="3">Moderate</option>
                                <option value="2">Too Easy</option>
                                <option value="1">Too Difficult</option>
                            </select>
                        </div>

                        <div class="aspect-rating">
                            <label>Would you recommend this course?</label>
                            <label class="radio-option">
                                <input type="radio" name="recommend" value="yes">
                                <span>Yes</span>
                            </label>
                            <label class="radio-option">
                                <input type="radio" name="recommend" value="no">
                                <span>No</span>
                            </label>
                        </div>
                    </div>

                    <div class="review-section">
                        <h5>Write a Review (Optional):</h5>
                        <textarea id="course-review" rows="5" placeholder="Share your experience with this course..." class="form-textarea"></textarea>
                    </div>

                    <button id="submit-rating" class="btn-primary">Submit Rating</button>
                </div>
            </div>
        `;

        document.body.appendChild(modal);

        // Star rating interaction
        const stars = modal.querySelectorAll('.star');
        stars.forEach(star => {
            star.addEventListener('click', () => {
                const rating = parseInt(star.dataset.rating);
                stars.forEach(s => {
                    const sRating = parseInt(s.dataset.rating);
                    s.classList.toggle('active', sRating <= rating);
                });
            });

            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                stars.forEach(s => {
                    const sRating = parseInt(s.dataset.rating);
                    s.classList.toggle('hover', sRating <= rating);
                });
            });
        });

        modal.querySelector('.stars-container').addEventListener('mouseleave', () => {
            stars.forEach(s => s.classList.remove('hover'));
        });

        modal.querySelector('.btn-close').addEventListener('click', () => modal.remove());

        modal.querySelector('#submit-rating').addEventListener('click', () => {
            const rating = modal.querySelector('input[name="rating"]:checked')?.value;

            if (!rating) {
                alert('Please select a star rating');
                return;
            }

            this.submitRating(courseId, {
                rating,
                review: modal.querySelector('#course-review').value
            });

            modal.remove();
        });
    }

    submitRating(courseId, ratingData) {
        // Save rating (in production, would send to backend)
        this.data.ratings[courseId] = {
            ...ratingData,
            timestamp: new Date().toISOString()
        };

        this.saveData();
        this.showNotification('Thank you for your rating! (Demo mode)', 'success');
    }

    // ===================================
    // Notification Helper
    // ===================================
    showNotification(message, type = 'success') {
        if (window.showNotification) {
            window.showNotification(message, type);
        } else {
            alert(message);
        }
    }
}

// Initialize Engagement System when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.engagementSystem = new EngagementSystem();
});
