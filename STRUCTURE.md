# Portfolio Project Structure

Clean, organized folder structure for a professional portfolio website.

## Folder Organization

```
Portfolio/
├── index.html                 # Homepage (entry point)
├── css/
│   └── style.css             # All styling (moved from root)
├── js/
│   ├── script.js             # Main functionality (moved from root)
│   └── navbar-loader.js      # Dynamic navbar loader
├── components/
│   └── navbar.html           # Reusable navbar component
├── pages/
│   ├── about.html
│   ├── skills.html
│   ├── projects.html
│   ├── certifications.html
│   ├── experience.html
│   ├── references.html
│   └── contact.html
├── images/                   # Images folder
├── api/                      # API endpoints
└── .github/                  # GitHub workflows
```

## How It Works

### Navbar System
- **Reusable Component**: `/components/navbar.html` - Single navbar that's dynamically loaded into all pages
- **Loader Script**: `/js/navbar-loader.js` - Automatically injects navbar and handles menu interactions
- **Features**:
  - Automatically highlights active page
  - Responsive mobile menu toggle
  - Works across all pages regardless of nesting

### Page Structure
- All pages in `/pages/` folder reference the shared CSS and JS in parent directories
- Each page includes the navbar loader script which injects the navbar
- Consistent styling across all pages through shared `css/style.css`

### File References
- **From root (index.html)**: `css/style.css` and `js/script.js`
- **From pages/**: `../css/style.css`, `../js/script.js`, and `../js/navbar-loader.js`

## Usage

1. **Add new pages**: Create in `/pages/` folder with proper path references
2. **Update navbar**: Edit `/components/navbar.html` - changes apply everywhere
3. **Add styles**: Add to `/css/style.css` - shared across all pages
4. **Add JS functionality**: Add to `/js/script.js` - shared across all pages

## Benefits

✅ **Clean Organization** - Better file management and scalability
✅ **DRY Principle** - Navbar maintained in one place
✅ **Easy Maintenance** - Update navbar once, affects all pages
✅ **Professional Structure** - Follows web development best practices
✅ **Consistency** - All pages maintain unified design and experience
