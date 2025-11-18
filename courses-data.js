/**
 * Martin Harris Historical Association - Courses Data
 * Comprehensive course structure for Community of Christ perspective on restoration history
 * 
 * This file contains detailed course information for 7 major courses:
 * 1. Life and Legacy of Martin Harris
 * 2. Joseph Smith Sr. - The Patriarch's Journey
 * 3. Joseph Smith Jr. - The Prophet and Visionary
 * 4. Joseph Smith III - Leadership and Reorganization
 * 5. History of the Restoration Movement
 * 6. The Concept of Zion
 * 7. The Reorganization and Community of Christ
 */

const coursesData = {
    // Main detailed courses
    mainCourses: {
        'martin-harris': {
            id: 'martin-harris',
            title: 'Life and Legacy of Martin Harris',
            slug: 'course-martin-harris',
            shortDescription: 'Explore the complex life of Martin Harris: witness, seeker, and honest inquirer across multiple restoration movements.',
            fullDescription: 'Martin Harris (1783-1875) was far more than just a wealthy farmer who financed the Book of Mormon. This course examines his life as a treasure seeker, one of the Three Witnesses, and a spiritual seeker who moved between six different restoration churches.',
            duration: '8 weeks',
            estimatedHours: '24 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: true,
            moduleCount: 8,
            lessonCount: 24,
            enrolled: 1456,
            rating: 4.9,
            reviews: 127,
            completionRate: 84,
            tags: ['Martin Harris', 'Witnesses', 'Restoration History', 'Primary Sources'],
            instructor: {
                name: 'Dr. Rebecca Winters',
                credentials: 'Ph.D. in American Religious History, Yale University',
                bio: 'Specializes in early American folk religion and the restoration movement.',
                image: 'instructor-winters.jpg'
            },
            learningObjectives: [
                'Understand Martin Harris\'s role in early restoration history',
                'Analyze the cultural context of folk magic and treasure seeking',
                'Examine the evolution of witness testimony',
                'Evaluate Harris\'s movement between different churches',
                'Apply critical thinking to primary sources'
            ],
            prerequisites: ['Basic knowledge of restoration history helpful but not required'],
            relatedCourses: ['joseph-smith-sr', 'restoration-history', 'reorganization-cofchrist']
        },
        'joseph-smith-sr': {
            id: 'joseph-smith-sr',
            title: 'Joseph Smith Sr. - The Patriarch\'s Journey',
            slug: 'course-joseph-smith-sr',
            shortDescription: 'The often-overlooked father of the restoration: farmer, dreamer, treasure seeker, and founding patriarch.',
            fullDescription: 'Joseph Smith Sr. (1771-1840) was more than just the prophet\'s father. This course explores his life as a farmer, treasure seeker, man of dreams and visions, and the first Patriarch of the Church.',
            duration: '6 weeks',
            estimatedHours: '18 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: true,
            moduleCount: 6,
            lessonCount: 18,
            enrolled: 892,
            rating: 4.7,
            reviews: 84,
            completionRate: 81,
            tags: ['Joseph Smith Sr.', 'Patriarch', 'Smith Family', 'Folk Magic'],
            instructor: {
                name: 'Dr. Michael Thompson',
                credentials: 'Ph.D. in American History, University of Chicago',
                bio: 'Specializes in family history and generational religious transmission.',
                image: 'instructor-thompson.jpg'
            },
            learningObjectives: [
                'Understand Joseph Sr.\'s role in shaping family religious culture',
                'Analyze economic struggles that influenced the Smith family',
                'Examine folk magic practices',
                'Evaluate Joseph Sr.\'s visions',
                'Consider the role of Church Patriarch'
            ],
            prerequisites: ['Basic knowledge of early restoration history helpful'],
            relatedCourses: ['martin-harris', 'joseph-smith-jr', 'restoration-history']
        },
        'joseph-smith-jr': {
            id: 'joseph-smith-jr',
            title: 'Joseph Smith Jr. - The Prophet and Visionary',
            slug: 'course-joseph-smith-jr',
            shortDescription: 'A comprehensive examination of Joseph Smith Jr.: prophet, translator, theologian, and controversial leader.',
            fullDescription: 'Joseph Smith Jr. (1805-1844) was the founder and central figure of the restoration movement. This course examines his life, teachings, and legacy from multiple perspectives with honest inquiry.',
            duration: '10 weeks',
            estimatedHours: '30 hours',
            difficulty: 'Advanced',
            level: 'advanced',
            featured: true,
            moduleCount: 10,
            lessonCount: 30,
            enrolled: 2134,
            rating: 4.8,
            reviews: 203,
            completionRate: 76,
            tags: ['Joseph Smith Jr.', 'Prophet', 'Book of Mormon', 'Restoration', 'Nauvoo'],
            instructor: {
                name: 'Dr. Sarah Chen',
                credentials: 'Ph.D. in Religious Studies, Harvard University',
                bio: 'Specializes in American prophetic movements and charismatic authority.',
                image: 'instructor-chen.jpg'
            },
            learningObjectives: [
                'Understand Smith\'s visionary experiences',
                'Analyze theological innovations',
                'Examine leadership style and controversies',
                'Evaluate controversial aspects',
                'Apply multiple interpretive frameworks'
            ],
            prerequisites: ['Strong foundation in restoration history', 'Joseph Smith Sr. course recommended'],
            relatedCourses: ['joseph-smith-sr', 'joseph-smith-iii', 'restoration-history']
        },
        'joseph-smith-iii': {
            id: 'joseph-smith-iii',
            title: 'Joseph Smith III - Leadership and Reorganization',
            slug: 'course-joseph-smith-iii',
            shortDescription: 'The prophet\'s son who rejected polygamy, led the Reorganization, and created a different restoration vision.',
            fullDescription: 'Joseph Smith III (1832-1914) inherited a complicated legacy. He rejected Brigham Young and polygamy, eventually leading the RLDS church and creating an alternative restoration tradition.',
            duration: '7 weeks',
            estimatedHours: '21 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: true,
            moduleCount: 7,
            lessonCount: 21,
            enrolled: 743,
            rating: 4.8,
            reviews: 76,
            completionRate: 79,
            tags: ['Joseph Smith III', 'RLDS', 'Reorganization', 'Community of Christ'],
            instructor: {
                name: 'Dr. Jennifer Morrison',
                credentials: 'Ph.D. in Religious History, Claremont Graduate University',
                bio: 'Specializes in RLDS/Community of Christ tradition.',
                image: 'instructor-morrison.jpg'
            },
            learningObjectives: [
                'Understand Joseph III\'s childhood and legacy',
                'Analyze RLDS formation',
                'Examine theological differences',
                'Evaluate anti-polygamy stance',
                'Consider lineal succession models'
            ],
            prerequisites: ['Knowledge of Joseph Smith Jr. and basic restoration history'],
            relatedCourses: ['joseph-smith-jr', 'reorganization-cofchrist', 'restoration-history']
        },
        'restoration-history': {
            id: 'restoration-history',
            title: 'History of the Restoration Movement',
            slug: 'course-restoration-history',
            shortDescription: 'Comprehensive overview of all restoration traditions: LDS, Community of Christ, Strangites, and dozens of smaller movements.',
            fullDescription: 'The restoration movement is not one church but many. This course provides a comprehensive overview of all major and minor restoration traditions from 1830 to present.',
            duration: '12 weeks',
            estimatedHours: '36 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: true,
            moduleCount: 12,
            lessonCount: 36,
            enrolled: 3241,
            rating: 4.9,
            reviews: 287,
            completionRate: 82,
            tags: ['Restoration', 'Church History', 'Succession', 'Comparative Religion'],
            instructor: {
                name: 'Dr. Robert Hansen',
                credentials: 'Ph.D. in American Religious History, UNC',
                bio: 'Specializes in religious movements and schisms in 19th century America.',
                image: 'instructor-hansen.jpg'
            },
            learningObjectives: [
                'Understand origins and development',
                'Identify major succession crises',
                'Analyze theological differences',
                'Examine smaller groups',
                'Consider why the movement fractured'
            ],
            prerequisites: ['None - comprehensive introduction'],
            relatedCourses: ['martin-harris', 'joseph-smith-jr', 'joseph-smith-iii', 'zion']
        },
        'zion': {
            id: 'zion',
            title: 'The Concept of Zion',
            slug: 'course-zion',
            shortDescription: 'From biblical imagery to Missouri conflict: exploring how "Zion" shaped restoration theology and history.',
            fullDescription: 'Zion is one of the most powerful concepts in restoration theology. This course examines how biblical imagery transformed into gathering theology and shaped restoration movements.',
            duration: '6 weeks',
            estimatedHours: '18 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: false,
            moduleCount: 6,
            lessonCount: 18,
            enrolled: 634,
            rating: 4.7,
            reviews: 62,
            completionRate: 77,
            tags: ['Zion', 'Missouri', 'Gathering', 'Theology'],
            instructor: {
                name: 'Dr. Elizabeth Morgan',
                credentials: 'Ph.D. in Theological Studies, Vanderbilt University',
                bio: 'Specializes in utopian religious movements and sacred geography.',
                image: 'instructor-morgan.jpg'
            },
            learningObjectives: [
                'Understand biblical foundations of Zion',
                'Analyze restoration Zion concepts',
                'Examine Missouri period',
                'Evaluate different traditions\' Zion theologies',
                'Reflect on ongoing significance'
            ],
            prerequisites: ['Basic knowledge of restoration history helpful'],
            relatedCourses: ['restoration-history', 'reorganization-cofchrist']
        },
        'reorganization-cofchrist': {
            id: 'reorganization-cofchrist',
            title: 'The Reorganization and Community of Christ',
            slug: 'course-reorganization-cofchrist',
            shortDescription: 'From RLDS to Community of Christ: the alternative restoration path that embraced liberalization, women\'s ordination, and peace witness.',
            fullDescription: 'The RLDS (now Community of Christ) represents a fundamentally different approach to restoration heritage. This course traces development from conservative RLDS to progressive Community of Christ.',
            duration: '8 weeks',
            estimatedHours: '24 hours',
            difficulty: 'Intermediate',
            level: 'intermediate',
            featured: true,
            moduleCount: 8,
            lessonCount: 24,
            enrolled: 892,
            rating: 4.8,
            reviews: 94,
            completionRate: 80,
            tags: ['RLDS', 'Community of Christ', 'Progressive Christianity', 'Women\'s Ordination'],
            instructor: {
                name: 'Dr. Patricia Williams',
                credentials: 'Ph.D. in American Religious History, University of Iowa',
                bio: 'Community of Christ historian specializing in RLDS development.',
                image: 'instructor-williams.jpg'
            },
            learningObjectives: [
                'Understand RLDS formation',
                'Analyze theological distinctives',
                'Examine 20th century liberalization',
                'Evaluate women\'s ordination',
                'Consider peace and justice witness'
            ],
            prerequisites: ['Knowledge of basic restoration history', 'Joseph Smith III course recommended'],
            relatedCourses: ['joseph-smith-iii', 'restoration-history', 'zion']
        }
    },

    // Course categories
    categories: {
        beginner: {
            name: 'Foundational Courses',
            description: 'Start your journey into restoration history',
            color: '#8B4513',
            icon: '📚'
        },
        intermediate: {
            name: 'Advanced Courses',
            description: 'Deep dives into specific topics',
            color: '#A0522D',
            icon: '🔍'
        },
        advanced: {
            name: 'Specialized Courses',
            description: 'Expert-level historical analysis',
            color: '#5D2F0F',
            icon: '🎓'
        }
    },

    // Statistics
    stats: {
        totalCourses: 7,
        totalStudents: 9992,
        averageCompletion: 80,
        averageRating: 4.8,
        totalModules: 57,
        totalLessons: 171
    }
};

// Course Manager Class
class CourseManager {
    constructor(data) {
        this.data = data;
    }

    // Get all main courses as array
    getAllCourses() {
        return Object.values(this.data.mainCourses);
    }

    // Get courses by level
    getCoursesByLevel(level) {
        return this.getAllCourses().filter(course => course.level === level);
    }

    // Get featured courses
    getFeaturedCourses() {
        return this.getAllCourses().filter(course => course.featured);
    }

    // Search courses
    searchCourses(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllCourses().filter(course =>
            course.title.toLowerCase().includes(searchTerm) ||
            course.shortDescription.toLowerCase().includes(searchTerm) ||
            course.tags.some(tag => tag.toLowerCase().includes(searchTerm))
        );
    }

    // Get course by ID
    getCourseById(id) {
        return this.data.mainCourses[id];
    }

    // Get course by slug
    getCourseBySlug(slug) {
        return this.getAllCourses().find(course => course.slug === slug);
    }

    // Get related courses
    getRelatedCourses(courseId) {
        const course = this.getCourseById(courseId);
        if (!course || !course.relatedCourses) return [];
        
        return course.relatedCourses
            .map(id => this.getCourseById(id))
            .filter(c => c !== undefined);
    }

    // Get all unique tags
    getAllTags() {
        const tags = new Set();
        this.getAllCourses().forEach(course => {
            course.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags).sort();
    }

    // Get courses by tag
    getCoursesByTag(tag) {
        return this.getAllCourses().filter(course => 
            course.tags.includes(tag)
        );
    }

    // Sort courses
    sortCourses(courses, sortBy) {
        const sorted = [...courses];
        
        switch(sortBy) {
            case 'rating':
                return sorted.sort((a, b) => b.rating - a.rating);
            case 'enrolled':
                return sorted.sort((a, b) => b.enrolled - a.enrolled);
            case 'duration':
                return sorted.sort((a, b) => {
                    const aWeeks = parseInt(a.duration);
                    const bWeeks = parseInt(b.duration);
                    return aWeeks - bWeeks;
                });
            case 'title':
                return sorted.sort((a, b) => a.title.localeCompare(b.title));
            default:
                return sorted;
        }
    }

    // Filter by multiple criteria
    filterCourses(filters) {
        let results = this.getAllCourses();

        if (filters.level) {
            results = results.filter(course => course.level === filters.level);
        }

        if (filters.minRating) {
            results = results.filter(course => course.rating >= filters.minRating);
        }

        if (filters.maxDuration) {
            const weeks = parseInt(filters.maxDuration);
            results = results.filter(course => parseInt(course.duration) <= weeks);
        }

        if (filters.tags && filters.tags.length > 0) {
            results = results.filter(course =>
                filters.tags.some(tag => course.tags.includes(tag))
            );
        }

        if (filters.featured !== undefined) {
            results = results.filter(course => course.featured === filters.featured);
        }

        return results;
    }

    // Get course statistics
    getCourseStats(courseId) {
        const course = this.getCourseById(courseId);
        if (!course) return null;

        return {
            title: course.title,
            enrolled: course.enrolled,
            rating: course.rating,
            reviews: course.reviews,
            completionRate: course.completionRate,
            moduleCount: course.moduleCount,
            lessonCount: course.lessonCount,
            estimatedHours: course.estimatedHours
        };
    }
}

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { coursesData, CourseManager };
}
