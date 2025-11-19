# Martin Harris Historical Association Website

An impressive, modern website dedicated to preserving the legacy of Martin Harris, one of the Three Witnesses to the Book of Mormon.

## Features

### Design & User Experience
- **Modern, Responsive Design** - Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Animations** - Engaging scroll animations and transitions throughout
- **Professional Typography** - Beautiful Playfair Display and Lato font combination
- **Color Scheme** - Rich browns, golds, and earth tones reflecting historical authenticity

### Sections

1. **Hero Section**
   - Full-screen hero with gradient background
   - Animated scroll indicator
   - Call-to-action buttons

2. **About Martin Harris**
   - Biographical information
   - Portrait placeholder with artistic silhouette
   - Key statistics (birth year, investment, lifespan)
   - Responsive grid layout

3. **Timeline**
   - Interactive timeline of major life events (1783-1875)
   - Vertical timeline with alternating content
   - Hover effects and animations
   - Dark background for visual contrast

4. **Legacy Section**
   - Four key aspects of his enduring legacy
   - Icon-based cards with hover animations
   - 3D rotation effects on icons

5. **Visit Information**
   - Historic site locations
   - Map placeholder
   - Details about Palmyra, NY and Clarkston, UT sites

6. **Membership/Contact**
   - Modern contact form with floating labels
   - Membership benefits list
   - Form validation and submission handling

7. **Footer**
   - Quick links navigation
   - Social media integration
   - Multi-column responsive layout

### Interactive Features

- **Smooth Scrolling** - Navigation links smoothly scroll to sections
- **Mobile Navigation** - Hamburger menu for mobile devices
- **Scroll Animations** - Elements fade in and slide up as you scroll
- **Counter Animation** - Statistics animate when scrolled into view
- **Form Handling** - Interactive contact form with notifications
- **Scroll to Top Button** - Appears after scrolling down
- **Active Navigation** - Highlights current section in navigation
- **Parallax Effect** - Subtle parallax on hero section

## Technologies Used

- **HTML5** - Semantic markup for accessibility
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (Vanilla)** - No dependencies, pure JavaScript for all interactions
- **Google Fonts** - Playfair Display and Lato fonts
- **CSS Variables** - Easy theming and consistency
- **Intersection Observer API** - Performance-optimized scroll animations

## File Structure

```
harris/
├── .github/
│   └── workflows/
│       ├── deploy.yml       # GitHub Pages deployment
│       └── validate.yml     # Site validation checks
├── index.html               # Main HTML structure
├── styles.css               # All styling and animations
├── script.js                # Interactive functionality
├── robots.txt               # SEO and crawler instructions
├── sitemap.xml              # Site map for search engines
├── .nojekyll                # Prevents Jekyll processing
├── .gitignore               # Git ignore rules
├── DEPLOYMENT.md            # Deployment guide
└── README.md                # This file
```

## Deployment

This site is configured for automatic deployment to GitHub Pages using GitHub Actions.

### Quick Start

1. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Source: Select "GitHub Actions"

2. **Deploy**: Push to `main` branch or manually trigger the workflow

3. **Live Site**: `https://elliottsax.github.io/harris/`

### Deployment Features

- ✅ **Automatic Deployment** - Triggers on push to main/master
- ✅ **Manual Trigger** - Can be manually deployed via GitHub Actions
- ✅ **Validation Workflow** - Automated checks on pull requests
- ✅ **SEO Optimized** - Includes robots.txt and sitemap.xml
- ✅ **Social Media Ready** - Open Graph and Twitter Card meta tags

For detailed deployment instructions, see [DEPLOYMENT.md](DEPLOYMENT.md).

## Browser Compatibility

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Responsive Breakpoints

- Desktop: 1200px and above
- Tablet: 768px - 1199px
- Mobile: Below 768px
- Small Mobile: Below 480px

## Performance Features

- **Debounced Scroll Events** - Optimized for smooth performance
- **CSS Hardware Acceleration** - Smooth animations using transforms
- **Lazy Loading Ready** - Structure supports image lazy loading
- **Minimal Dependencies** - No external libraries for fast loading

## Customization

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #8B4513;
    --secondary-color: #D4AF37;
    --accent-color: #C19A6B;
    /* ... more colors */
}
```

### Fonts
Change the Google Fonts imports in `index.html` and update the CSS variables.

### Content
All content is easily editable in `index.html`. Simply find the section and update the text.

## Future Enhancements

- Image gallery for historical photographs
- Blog/news section for updates
- Events calendar
- Digital archive access
- Member login portal
- Donation processing integration
- Interactive map with actual locations
- Video content section
- Multi-language support

## Accessibility

- Semantic HTML5 elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG guidelines
- Responsive text sizing

## License

Copyright © 2025 Martin Harris Historical Association. All rights reserved.

## Contact

For questions or contributions, please use the contact form on the website or reach out through the membership section.

---

**Built with dedication to preserving history and honoring testimony.**
