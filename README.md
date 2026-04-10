# Personal Developer Portfolio

A modern, responsive personal portfolio website built with plain HTML, CSS, and JavaScript.

## Project Structure

- `index.html`
- `style.css`
- `script.js`
- `.github/workflows/vercel-deploy.yml`

## Run Locally

1. Clone or download this repository.
2. Open the project folder.
3. Run a simple static server (recommended), for example:

   ```bash
   npx serve .
   ```

4. Open the local URL shown in the terminal (usually `http://localhost:3000`).

You can also open `index.html` directly in a browser.

## Deploy to Vercel

### Option 1: Manual deploy with Vercel CLI

1. Install Vercel CLI:

   ```bash
   npm i -g vercel
   ```

2. Login and deploy:

   ```bash
   vercel login
   vercel --prod
   ```

### Option 2: GitHub Actions automatic deploy

1. In your Vercel account, get these values:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
2. In your GitHub repository, go to **Settings → Secrets and variables → Actions**.
3. Add repository secrets:
   - `VERCEL_TOKEN`
   - `VERCEL_ORG_ID`
   - `VERCEL_PROJECT_ID`
4. Push to the `main` branch; the workflow will deploy automatically to Vercel.
