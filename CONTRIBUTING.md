## Contributing

### Branch Naming
- **feature/<short-description>**: new features and enhancements
- **fix/<short-description>**: bug fixes
- **chore/<short-description>**: maintenance and tooling

### PR Bases
- **feature/\*** → `dev`
- **dev** → `main`

### Merge Strategy
- **feature → dev**: squash and merge
- **dev → main**: regular merge

### Safety Checklist
- **Working tree clean**: no uncommitted changes
- **Tests and lint**: run available scripts (`npm test` or `npm run lint` if defined)
- **Up to date with base**: `git fetch origin` and rebase or merge as appropriate
- **No secrets**: ensure `.env` and keys are never committed
