## Homepage Layout

## Goal
Wire up the homepage to use BaseLayout and add initial hero placeholder.

## Inputs
- `.cursorrules` homepage hero copy and structure
- `directives/base_layout_header.md`
- `directives/footer_component.md`

## Tools/Scripts
- None required.

## Process
1. Update `src/pages/index.astro` to import and use `BaseLayout` instead of raw HTML.
2. Import and add `Footer.astro` to `BaseLayout.astro` after the `</main>` tag.
3. Add a basic hero section to `index.astro` with the copy: "Beats. Mixing. Mastering. Your sound, elevated."
4. Run `npm run dev` to verify the page renders without errors.

## Outputs
- Updated `src/pages/index.astro`
- Updated `src/layouts/BaseLayout.astro`
- Updated directive with any learnings

## Edge Cases
- If Footer import fails, check the path matches the actual file location.
- If Astro 5.x has breaking changes, check the astro.config.mjs for compatibility settings.
- Ensure the hero section uses semantic HTML (e.g., `<section>` with appropriate heading).

## Learnings
- Build verified successfully on 2026-01-17.
- No issues with Footer import path (`../components/astro/Footer.astro`).
- Hero section uses CSS custom properties with fallbacks for standalone testing.
- macOS does not have `timeout` command; use `npm run build` instead of dev server for verification in CI-like contexts.
