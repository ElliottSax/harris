/**
 * Martin Harris Historical Association - Course Engine
 * Handles course navigation, progress tracking, bookmarking, and certificates
 */

// ============================================
// Course Progress Tracking
// ============================================

class CourseProgress {
    constructor(courseId, userId = 'default') {
        this.courseId = courseId;
        this.userId = userId;
        this.storageKey = `course_progress_${userId}_${courseId}`;
        this.load();
    }

    // Load progress from localStorage
    load() {
        const stored = localStorage.getItem(this.storageKey);
        if (stored) {
            const data = JSON.parse(stored);
            this.completedModules = new Set(data.completedModules || []);
            this.completedLessons = new Set(data.completedLessons || []);
            this.quizScores = data.quizScores || {};
            this.bookmarks = data.bookmarks || [];
            this.notes = data.notes || {};
            this.lastAccessed = data.lastAccessed || null;
            this.startedDate = data.startedDate || new Date().toISOString();
        } else {
            this.reset();
        }
    }

    // Save progress to localStorage
    save() {
        const data = {
            completedModules: Array.from(this.completedModules),
            completedLessons: Array.from(this.completedLessons),
            quizScores: this.quizScores,
            bookmarks: this.bookmarks,
            notes: this.notes,
            lastAccessed: new Date().toISOString(),
            startedDate: this.startedDate
        };
        localStorage.setItem(this.storageKey, JSON.stringify(data));
    }

    // Reset progress
    reset() {
        this.completedModules = new Set();
        this.completedLessons = new Set();
        this.quizScores = {};
        this.bookmarks = [];
        this.notes = {};
        this.lastAccessed = null;
        this.startedDate = new Date().toISOString();
        this.save();
    }

    // Mark lesson as complete
    completeLesson(moduleId, lessonId) {
        const key = `${moduleId}-${lessonId}`;
        this.completedLessons.add(key);
        this.save();
    }

    // Mark module as complete
    completeModule(moduleId) {
        this.completedModules.add(moduleId);
        this.save();
    }

    // Check if lesson is complete
    isLessonComplete(moduleId, lessonId) {
        const key = `${moduleId}-${lessonId}`;
        return this.completedLessons.has(key);
    }

    // Check if module is complete
    isModuleComplete(moduleId) {
        return this.completedModules.has(moduleId);
    }

    // Save quiz score
    saveQuizScore(moduleId, score, maxScore) {
        this.quizScores[moduleId] = {
            score: score,
            maxScore: maxScore,
            percentage: Math.round((score / maxScore) * 100),
            date: new Date().toISOString()
        };
        this.save();
    }

    // Get quiz score
    getQuizScore(moduleId) {
        return this.quizScores[moduleId] || null;
    }

    // Calculate overall progress percentage
    getProgressPercentage(totalModules) {
        if (totalModules === 0) return 0;
        return Math.round((this.completedModules.size / totalModules) * 100);
    }

    // Add bookmark
    addBookmark(location, title, notes = '') {
        const bookmark = {
            id: Date.now(),
            location: location,
            title: title,
            notes: notes,
            date: new Date().toISOString()
        };
        this.bookmarks.push(bookmark);
        this.save();
        return bookmark;
    }

    // Remove bookmark
    removeBookmark(bookmarkId) {
        this.bookmarks = this.bookmarks.filter(b => b.id !== bookmarkId);
        this.save();
    }

    // Get all bookmarks
    getBookmarks() {
        return this.bookmarks.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    // Add/update note
    addNote(location, noteText) {
        this.notes[location] = {
            text: noteText,
            date: new Date().toISOString()
        };
        this.save();
    }

    // Get note
    getNote(location) {
        return this.notes[location] || null;
    }

    // Get all data for export
    exportData() {
        return {
            courseId: this.courseId,
            userId: this.userId,
            completedModules: Array.from(this.completedModules),
            completedLessons: Array.from(this.completedLessons),
            quizScores: this.quizScores,
            bookmarks: this.bookmarks,
            notes: this.notes,
            startedDate: this.startedDate,
            lastAccessed: this.lastAccessed
        };
    }
}

// ============================================
// Course Navigation
// ============================================

class CourseNavigator {
    constructor(courseData, currentModule = 1, currentLesson = 1) {
        this.courseData = courseData;
        this.currentModule = currentModule;
        this.currentLesson = currentLesson;
    }

    // Get current module data
    getCurrentModule() {
        return this.courseData.modules[this.currentModule - 1];
    }

    // Get current lesson data
    getCurrentLesson() {
        const module = this.getCurrentModule();
        if (module && module.lessons) {
            return module.lessons[this.currentLesson - 1];
        }
        return null;
    }

    // Navigate to next lesson
    nextLesson() {
        const module = this.getCurrentModule();
        if (!module) return false;

        if (this.currentLesson < module.lessons.length) {
            this.currentLesson++;
            return true;
        } else if (this.currentModule < this.courseData.modules.length) {
            this.currentModule++;
            this.currentLesson = 1;
            return true;
        }
        return false; // End of course
    }

    // Navigate to previous lesson
    previousLesson() {
        if (this.currentLesson > 1) {
            this.currentLesson--;
            return true;
        } else if (this.currentModule > 1) {
            this.currentModule--;
            const prevModule = this.getCurrentModule();
            this.currentLesson = prevModule.lessons.length;
            return true;
        }
        return false; // Start of course
    }

    // Jump to specific module and lesson
    goTo(moduleNum, lessonNum = 1) {
        if (moduleNum >= 1 && moduleNum <= this.courseData.modules.length) {
            this.currentModule = moduleNum;
            const module = this.getCurrentModule();
            if (lessonNum >= 1 && lessonNum <= module.lessons.length) {
                this.currentLesson = lessonNum;
                return true;
            }
        }
        return false;
    }

    // Get navigation context
    getContext() {
        const totalModules = this.courseData.modules.length;
        const module = this.getCurrentModule();
        const totalLessons = module ? module.lessons.length : 0;

        return {
            currentModule: this.currentModule,
            currentLesson: this.currentLesson,
            totalModules: totalModules,
            totalLessons: totalLessons,
            hasNext: this.currentModule < totalModules || this.currentLesson < totalLessons,
            hasPrevious: this.currentModule > 1 || this.currentLesson > 1,
            isFirstLesson: this.currentModule === 1 && this.currentLesson === 1,
            isLastLesson: this.currentModule === totalModules && this.currentLesson === totalLessons
        };
    }
}

// ============================================
// Certificate Generation
// ============================================

class CertificateGenerator {
    constructor(courseData, studentName, completionDate = null) {
        this.courseData = courseData;
        this.studentName = studentName;
        this.completionDate = completionDate || new Date();
    }

    // Check if student qualifies for certificate
    qualifiesForCertificate(progress) {
        // Check if all modules are complete
        const allModulesComplete = progress.completedModules.size === this.courseData.moduleCount;
        
        // Check if all quizzes passed (70% or higher)
        const quizzes = Object.values(progress.quizScores);
        const allQuizzesPassed = quizzes.length > 0 && 
            quizzes.every(quiz => quiz.percentage >= 70);

        return allModulesComplete && allQuizzesPassed;
    }

    // Generate certificate data
    generateCertificateData() {
        return {
            studentName: this.studentName,
            courseName: this.courseData.title,
            completionDate: this.formatDate(this.completionDate),
            certificateNumber: this.generateCertificateNumber(),
            instructor: this.courseData.instructor.name,
            duration: this.courseData.duration,
            modules: this.courseData.moduleCount
        };
    }

    // Generate unique certificate number
    generateCertificateNumber() {
        const timestamp = Date.now();
        const courseCode = this.courseData.id.substring(0, 3).toUpperCase();
        const random = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
        return `MHHA-${courseCode}-${timestamp}-${random}`;
    }

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    // Generate HTML certificate
    generateCertificateHTML() {
        const data = this.generateCertificateData();
        
        return `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Certificate of Completion - ${data.courseName}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Lato:wght@300;400&display=swap');
        
        body {
            font-family: 'Lato', sans-serif;
            background: linear-gradient(135deg, #FAF8F3, #F5F5DC);
            padding: 40px;
            display: flex;
            justify-content: center;
            align-items: center;
            min-height: 100vh;
        }
        
        .certificate {
            background: white;
            border: 15px solid #8B4513;
            border-image: linear-gradient(135deg, #8B4513, #D4AF37) 1;
            padding: 60px;
            max-width: 900px;
            box-shadow: 0 10px 50px rgba(0,0,0,0.2);
            text-align: center;
        }
        
        .certificate-header {
            border-bottom: 3px solid #D4AF37;
            padding-bottom: 20px;
            margin-bottom: 40px;
        }
        
        .organization-name {
            font-family: 'Playfair Display', serif;
            font-size: 2rem;
            color: #8B4513;
            margin-bottom: 10px;
        }
        
        .certificate-title {
            font-family: 'Playfair Display', serif;
            font-size: 1.5rem;
            color: #5D2F0F;
            margin-top: 10px;
        }
        
        .certificate-body {
            margin: 40px 0;
        }
        
        .presents-to {
            font-size: 1.1rem;
            color: #666;
            margin-bottom: 20px;
        }
        
        .student-name {
            font-family: 'Playfair Display', serif;
            font-size: 3rem;
            color: #8B4513;
            margin: 20px 0;
            border-bottom: 2px solid #D4AF37;
            display: inline-block;
            padding-bottom: 10px;
        }
        
        .completion-text {
            font-size: 1.1rem;
            color: #666;
            margin: 30px 0;
            line-height: 1.8;
        }
        
        .course-name {
            font-family: 'Playfair Display', serif;
            font-size: 1.8rem;
            color: #5D2F0F;
            margin: 20px 0;
        }
        
        .certificate-footer {
            display: flex;
            justify-content: space-around;
            margin-top: 60px;
            border-top: 2px solid #D4AF37;
            padding-top: 30px;
        }
        
        .signature-line {
            text-align: center;
            min-width: 250px;
        }
        
        .signature {
            border-top: 2px solid #333;
            padding-top: 10px;
            margin-top: 50px;
            font-family: 'Playfair Display', serif;
            font-size: 1.2rem;
            color: #8B4513;
        }
        
        .signature-title {
            font-size: 0.9rem;
            color: #666;
            margin-top: 5px;
        }
        
        .certificate-details {
            margin-top: 40px;
            font-size: 0.85rem;
            color: #999;
        }
        
        @media print {
            body {
                background: white;
                padding: 0;
            }
            .certificate {
                border: 15px solid #8B4513;
                box-shadow: none;
            }
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="certificate-header">
            <h1 class="organization-name">Martin Harris Historical Association</h1>
            <h2 class="certificate-title">Certificate of Completion</h2>
        </div>
        
        <div class="certificate-body">
            <p class="presents-to">This certificate is proudly presented to</p>
            
            <h2 class="student-name">${data.studentName}</h2>
            
            <p class="completion-text">
                for successfully completing the course
            </p>
            
            <h3 class="course-name">${data.courseName}</h3>
            
            <p class="completion-text">
                A ${data.duration} course comprising ${data.modules} comprehensive modules on restoration history,
                completed with dedication and scholarly excellence.
            </p>
        </div>
        
        <div class="certificate-footer">
            <div class="signature-line">
                <div class="signature">${data.instructor}</div>
                <div class="signature-title">Course Instructor</div>
            </div>
            
            <div class="signature-line">
                <div class="signature">Dr. Martin Harris Association</div>
                <div class="signature-title">Executive Director</div>
            </div>
        </div>
        
        <div class="certificate-details">
            <p>Completion Date: ${data.completionDate}</p>
            <p>Certificate Number: ${data.certificateNumber}</p>
        </div>
    </div>
</body>
</html>
        `;
    }

    // Download certificate as HTML
    downloadCertificate() {
        const html = this.generateCertificateHTML();
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `certificate-${this.courseData.id}-${Date.now()}.html`;
        a.click();
        URL.revokeObjectURL(url);
    }
}

// ============================================
// Course Utilities
// ============================================

const CourseUtils = {
    // Format duration (minutes to human readable)
    formatDuration(minutes) {
        if (minutes < 60) {
            return `${minutes} min`;
        }
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        return mins > 0 ? `${hours}h ${mins}min` : `${hours}h`;
    },

    // Calculate estimated completion date
    estimateCompletionDate(startDate, weeksDuration) {
        const start = new Date(startDate);
        const weeks = parseInt(weeksDuration);
        const completionDate = new Date(start);
        completionDate.setDate(start.getDate() + (weeks * 7));
        return completionDate;
    },

    // Format date
    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    },

    // Calculate time remaining
    timeRemaining(progress, totalModules) {
        const completed = progress.completedModules.size;
        const remaining = totalModules - completed;
        return {
            modulesRemaining: remaining,
            percentageComplete: Math.round((completed / totalModules) * 100)
        };
    },

    // Show success notification
    showNotification(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = `course-notification course-notification-${type}`;
        notification.innerHTML = `
            <span class="notification-icon">${type === 'success' ? '✓' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 15px 25px;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
            z-index: 10000;
            animation: slideInRight 0.3s ease;
            display: flex;
            align-items: center;
            gap: 10px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        CourseProgress,
        CourseNavigator,
        CertificateGenerator,
        CourseUtils
    };
}
