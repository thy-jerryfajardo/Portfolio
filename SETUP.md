# Portfolio Setup & Deployment Guide

## Local Testing

1. **Start a local server** to test the organized structure:
   ```bash
   npx serve .
   ```
   This will serve your portfolio at `http://localhost:3000`

2. **Test all pages** - Make sure navbar loads correctly and links work:
   - Home page: `http://localhost:3000`
   - Pages: `http://localhost:3000/pages/about.html`

## Deployment to Vercel

The organized structure will work seamlessly with Vercel deployment:

### Option 1: Using Vercel CLI
```bash
npm i -g vercel
vercel login
vercel --prod
```

### Option 2: Using GitHub Actions
GitHub Actions workflow is already configured in `.github/workflows/`

## Important Notes

⚠️ **Old root-level HTML files** (about.html, skills.html, etc. in root folder) are duplicates and can be deleted. Use only the files in `/pages/` folder.

The portfolio now uses:
- **Root pages** in `pages/` folder ✅
- **Shared components** in `components/` folder ✅
- **Organized styles** in `css/` folder ✅
- **Organized scripts** in `js/` folder ✅

## Next Steps

1. ✅ Test locally to ensure navbar loads and all links work
2. ✅ Delete old HTML files from root (optional cleanup)
3. ✅ Commit changes to git
4. ✅ Deploy to Vercel

## Troubleshooting

**Navbar not loading?**
- Check browser console for errors
- Verify path to `navbar-loader.js` is correct
- Ensure `components/navbar.html` exists

**Links broken?**
- From root: use `pages/about.html`
- From pages: use `../pages/contact.html` or navigate through navbar

**Styles not applying?**
- Verify CSS file paths: `css/style.css` from root, `../css/style.css` from pages
