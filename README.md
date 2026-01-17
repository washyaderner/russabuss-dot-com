## Russabuss

Music portfolio and e-commerce site for Russ A Buss.

### Development
```bash
npm install
npm run dev
```

### Branching & PR Workflow
- **main**: production branch, PRs from `dev` only
- **dev**: integration branch for staging and preview builds
- **feature/<short-description>**: short-lived branches off `dev`

Example flow:
```bash
git checkout dev
git pull origin dev
git checkout -b feature/awesome-beat-page
# do work
git add .
git commit -m "feat: add awesome beat page"
git push -u origin feature/awesome-beat-page
# open PR to dev
```
