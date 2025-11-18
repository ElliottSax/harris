# Course System Documentation

## Overview

The Martin Harris Historical Association course system is a comprehensive, dynamic platform for delivering free educational content on restoration history. This document explains the architecture, how to add new courses, customize styling, and leverage all available features.

---

## Table of Contents

1. [System Architecture](#system-architecture)
2. [File Structure](#file-structure)
3. [Adding New Courses](#adding-new-courses)
4. [Customizing Styling](#customizing-styling)
5. [Features Overview](#features-overview)
6. [Mobile Responsiveness](#mobile-responsiveness)
7. [Maintenance and Updates](#maintenance-and-updates)

---

## System Architecture

The course system consists of several interconnected components:

### Core Files

- **courses-data.js** - Central data repository for all courses
- **courses-theme.css** - Unified styling for course components
- **courses-ui.js** - UI management for index.html courses section
- **courses-main-ui.js** - UI management for courses-main.html page
- **index.html** - Homepage with featured courses
- **courses-main.html** - Dedicated course catalog page

### Data Flow

```
courses-data.js (Data Source)
    ↓
CourseManager (JavaScript Class)
    ↓
UI Rendering (courses-ui.js / courses-main-ui.js)
    ↓
Dynamic HTML (Courses displayed on page)
```

---

## File Structure

```
harris/
├── index.html                  # Main homepage
├── courses-main.html           # Course catalog page
├── courses-data.js             # Course data and manager
├── courses-ui.js               # Homepage course UI
├── courses-main-ui.js          # Catalog page course UI
├── courses-theme.css           # Course-specific styling
├── styles.css                  # Global site styles
├── script.js                   # Global site scripts
└── COURSES-README.md           # This file
```

---

## Adding New Courses

### Step 1: Define Course Data

Open `courses-data.js` and add a new course object to the `courses` array:

```javascript
{
    id: 'unique-course-id',                    // Unique identifier
    title: 'Your Course Title',                // Display title
    slug: 'your-course-title',                 // URL-friendly slug
    description: 'Short description...',       // Brief overview
    longDescription: 'Detailed description...', // Full description
    level: 'beginner',                         // beginner, intermediate, or advanced
    modules: 6,                                // Number of modules
    duration: '6 weeks',                       // Estimated duration
    difficulty: 'Beginner',                    // Display difficulty
    instructor: 'Dr. Name',                    // Instructor name
    featured: false,                           // Show in featured section?
    trending: false,                           // Show trending badge?
    enrolled: 0,                               // Number of students
    rating: 4.5,                              // Average rating (0-5)
    reviews: 0,                               // Number of reviews
    completionRate: 80,                       // Percentage (0-100)
    tags: ['Tag1', 'Tag2'],                   // Searchable tags
    syllabus: [                               // Module list
        'Module 1 Title',
        'Module 2 Title',
        // ...
    ],
    prerequisites: [],                         // Required course IDs
    learningOutcomes: [                       // What students will learn
        'Outcome 1',
        'Outcome 2',
        // ...
    ],
    materials: [                              // Course materials
        'Material 1',
        'Material 2',
        // ...
    ]
}
```

### Step 2: Update Statistics

After adding courses, update the `stats` object in `courses-data.js`:

```javascript
stats: {
    totalCourses: 12,              // Total number of courses
    totalStudents: 7000,           // Total enrolled students
    averageCompletion: 82,         // Average completion rate
    averageRating: 4.8,           // Average rating
    totalModules: 72              // Total modules across all courses
}
```

### Step 3: Test

1. Open `index.html` in a browser
2. Navigate to the courses section
3. Verify your new course appears correctly
4. Test filtering by level
5. Test searching by tags/title
6. Check the full catalog at `courses-main.html`

---

## Customizing Styling

### Course Category Colors

Edit color variables in `courses-theme.css`:

```css
:root {
    --course-beginner: #8B4513;      /* Beginner course color */
    --course-intermediate: #A0522D;   /* Intermediate course color */
    --course-advanced: #5D2F0F;      /* Advanced course color */
    --course-featured: #D4AF37;      /* Featured badge color */
    --course-trending: #C19A6B;      /* Trending badge color */
}
```

### Card Styling

Course cards use the `.course-card-enhanced` class. Key sections:

- `.course-card-header` - Top section with badges
- `.course-card-body` - Main content area
- `.course-card-footer` - Statistics and action button

Example customization:

```css
.course-card-enhanced {
    border-radius: 12px;           /* Adjust corner roundness */
    box-shadow: 0 4px 15px var(--shadow); /* Modify shadow */
}

.course-card-enhanced:hover {
    transform: translateY(-8px);   /* Hover lift effect */
}
```

### Animations

The system includes several animation classes:

- `.stagger-animation` - Delayed entrance for course cards
- `.scroll-reveal` - Reveal on scroll
- `.pulse-animation` - Pulsing effect
- `.hover-lift` - Lift on hover

To disable animations:

```css
.course-card-enhanced.stagger-animation {
    animation: none;
    opacity: 1;
    transform: none;
}
```

### Mobile Responsiveness

Responsive breakpoints are defined at:

- `968px` - Tablet landscape
- `768px` - Tablet portrait
- `480px` - Mobile

Customize breakpoints in `courses-theme.css`:

```css
@media screen and (max-width: 768px) {
    .courses-grid-dynamic {
        grid-template-columns: 1fr; /* Single column on mobile */
    }
}
```

---

## Features Overview

### 1. Search and Filter System

**Location**: Index.html and courses-main.html

**Features**:
- Real-time search across titles, descriptions, and tags
- Filter by difficulty level (Beginner, Intermediate, Advanced)
- Sort by rating, popularity, or alphabetically
- Automatic results updating

**Customization**: Edit filter logic in `courses-ui.js`:

```javascript
function filterAndDisplayCourses() {
    let courses = [...coursesData.courses];

    // Add custom filters here
    if (customFilter) {
        courses = courses.filter(/* your logic */);
    }

    // Render results
    renderCourses(courses);
}
```

### 2. Featured Courses Section

**Location**: Index.html

Courses marked with `featured: true` appear in a special highlighted section.

**Configuration**:
```javascript
// In courses-data.js
featured: true,  // Include in featured section
```

### 3. Recently Added Section

**Location**: Index.html

Automatically displays the last 3 courses added to the `courses` array.

**Customization**:
```javascript
// In courses-ui.js, change number of recent courses:
getRecentlyAdded() {
    return this.data.courses.slice(-5).reverse(); // Show 5 instead of 3
}
```

### 4. Statistics Dashboard

**Location**: Both index.html and courses-main.html

Displays:
- Total courses
- Total students
- Average rating
- Completion rate

**Update**: Edit `stats` object in `courses-data.js`

### 5. Learning Pathways

**Location**: courses-main.html

Curated course sequences for different skill levels.

**Customization**: Edit the pathway sections in `courses-main.html`:

```html
<div class="course-card-enhanced hover-lift">
    <h4>Your Custom Pathway</h4>
    <p>Description of this learning path</p>
    <ul>
        <li>Course 1</li>
        <li>Course 2</li>
    </ul>
</div>
```

### 6. Progress Indicators

**Navigation Progress Bar**: Shows scroll progress at top of page

**Course Completion Bars**: Show average completion rate per course

**Customization**:
```css
.nav-progress-bar {
    background: linear-gradient(90deg, #color1, #color2);
}
```

### 7. Testimonials Section

**Location**: courses-main.html

Student testimonials with avatars and completion counts.

**Add New Testimonial**:
```html
<div class="legacy-card" style="text-align: left;">
    <div style="margin-bottom: 1rem; color: var(--secondary-color); font-size: 2rem;">"</div>
    <p style="color: var(--text-light); font-style: italic; margin-bottom: 1.5rem;">
        "Your testimonial quote here."
    </p>
    <div style="display: flex; align-items: center; gap: 1rem;">
        <div style="width: 50px; height: 50px; border-radius: 50%; background: var(--secondary-color);"></div>
        <div>
            <strong style="color: var(--secondary-color);">Student Name</strong>
            <div style="font-size: 0.9rem; opacity: 0.8;">Completed X courses</div>
        </div>
    </div>
</div>
```

### 8. Breadcrumb Navigation

**Location**: courses-main.html

Shows current page location in site hierarchy.

**Customization**:
```html
<nav class="breadcrumb">
    <a href="index.html">Home</a>
    <span class="breadcrumb-separator">›</span>
    <a href="courses-main.html">Courses</a>
    <span class="breadcrumb-separator">›</span>
    <span>Current Page</span>
</nav>
```

### 9. Parallax Effects

**Location**: courses-main.html hero section

Creates depth effect on scroll.

**Disable**:
```javascript
// Comment out in courses-main.html:
// window.addEventListener('scroll', () => {
//     parallaxBg.style.transform = `translateY(${scrolled * 0.5}px)`;
// });
```

### 10. Loading States

Skeleton loaders show while content loads.

**Implementation**:
```html
<div class="skeleton-loader skeleton-card"></div>
```

---

## Mobile Responsiveness

### Touch Interactions

All interactive elements are optimized for touch:

- Buttons have minimum 44px touch targets
- Hover effects adapted for touch devices
- Mobile-specific interactions enabled

### Layout Changes

**Desktop (>968px)**:
- 3-4 column course grid
- Side-by-side statistics
- Full navigation menu

**Tablet (768px-968px)**:
- 2 column course grid
- Stacked statistics
- Collapsible navigation

**Mobile (<768px)**:
- Single column layout
- Hamburger menu
- Stacked statistics
- Optimized spacing

### Testing Checklist

- [ ] Test on iPhone Safari
- [ ] Test on Android Chrome
- [ ] Test on iPad
- [ ] Test landscape and portrait
- [ ] Verify touch targets are accessible
- [ ] Check text readability
- [ ] Test form inputs
- [ ] Verify animations perform well

---

## Maintenance and Updates

### Regular Tasks

1. **Update Course Statistics**
   - Edit `stats` in courses-data.js
   - Update monthly or as enrollment changes

2. **Add New Courses**
   - Follow "Adding New Courses" section
   - Test thoroughly before publishing

3. **Monitor Performance**
   - Check page load times
   - Optimize images if needed
   - Review animation performance

4. **Content Updates**
   - Review course descriptions
   - Update prerequisites as courses are added
   - Refresh testimonials

### Best Practices

1. **Keep courses-data.js organized**
   - Group courses by level
   - Maintain consistent formatting
   - Use clear, descriptive IDs

2. **Test after every change**
   - Verify filtering works
   - Test search functionality
   - Check mobile display

3. **Maintain styling consistency**
   - Use existing color variables
   - Follow established patterns
   - Keep animations subtle

4. **Document customizations**
   - Comment complex code
   - Update this README
   - Track changes in git

### Troubleshooting

**Courses not displaying:**
- Check JavaScript console for errors
- Verify courses-data.js is loaded
- Ensure course object format is correct

**Search not working:**
- Check that tags are properly formatted
- Verify search input has correct ID
- Test with different search terms

**Styling issues:**
- Clear browser cache
- Verify courses-theme.css is loaded
- Check for conflicting CSS rules

**Mobile layout problems:**
- Test at actual breakpoint sizes
- Check viewport meta tag is present
- Verify responsive CSS is loaded

---

## Advanced Customization

### Custom Course Manager Methods

Add new methods to the `CourseManager` class:

```javascript
// In courses-data.js
class CourseManager {
    // ... existing methods

    // Custom method example
    getCoursesByInstructor(instructorName) {
        return this.data.courses.filter(
            course => course.instructor === instructorName
        );
    }
}
```

### Custom Filters

Add specialized filter UI:

```javascript
// Custom difficulty filter
function filterByDifficulty(difficulty) {
    const filtered = coursesData.courses.filter(
        course => course.difficulty === difficulty
    );
    renderCourses(filtered);
}
```

### Analytics Integration

Track course views and interactions:

```javascript
// Add to courses-ui.js
document.querySelectorAll('.btn-course').forEach(btn => {
    btn.addEventListener('click', () => {
        // Track button click
        if (typeof gtag !== 'undefined') {
            gtag('event', 'course_click', {
                'course_id': btn.dataset.courseId
            });
        }
    });
});
```

---

## Support and Questions

For questions about the course system:

1. Review this documentation
2. Check JavaScript console for errors
3. Inspect element styles in browser dev tools
4. Test in different browsers
5. Contact the development team

---

## Version History

**Version 1.0** (November 2025)
- Initial course system implementation
- 11 courses across 3 difficulty levels
- Full search and filter functionality
- Mobile-responsive design
- Dynamic course cards
- Learning pathways
- Testimonials section
- Progress indicators
- Breadcrumb navigation
- Parallax effects

---

## Credits

**Design**: Martin Harris Historical Association
**Development**: Claude Code Agent 5
**Framework**: Vanilla JavaScript, CSS Grid, CSS Custom Properties
**Icons**: Unicode Emoji and SVG

---

## License

All course content is freely available under the association's open access policy. The code is provided for use within the Martin Harris Historical Association website.
