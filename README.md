# Linfeng Li Personal Academic Website

## Project Path
`C:\Users\LiLinfeng\personal-academic-site`

## Architecture
- Single-page website (`index.html`) with top anchor navigation
- No directory page navigation in main menu
- Bilingual switch (Chinese / English)
- Light / dark theme
- Avatar upload (browser local storage)
- Certificates manager by skill (browser local storage)
- Admin edit panel (password required in browser)

## Run Locally
```bash
cd C:\Users\LiLinfeng\personal-academic-site
node serve.js
```
Open: `http://localhost:8080`

## Deploy to Public URL (GitHub Pages)
Recommended repository name: `culie69.github.io`

```powershell
cd C:\Users\LiLinfeng\personal-academic-site
git init
git branch -M main
git add .
git commit -m "feat: personal academic website"
git remote add origin https://github.com/culie69/culie69.github.io.git
git push -u origin main
```

Then in GitHub repo:
- `Settings` -> `Pages`
- `Source`: `Deploy from a branch`
- `Branch`: `main` + `/(root)`

Final URL:
- `https://culie69.github.io`

## Admin Edit Panel
- Open website and click bottom-right `⚙`
- First time: set admin password
- Then login and edit content fields directly on the page
- Save to apply instantly

## Important Permission Note
This is a static website. Admin edits are stored in browser local storage.
- Visitors cannot change your repository/deployed source files.
- Their edits (if any) only affect their own browser locally.
- To make global permanent edits for all visitors, you still need to push updates to GitHub.

## SEO placeholders
- Update `robots.txt` and `sitemap.xml` domain if changed.
