# Static Page Shells Directive

## Goal
Create placeholder Astro pages that use BaseLayout with appropriate title/description props. These serve as scaffolding for future content.

## Inputs
- `.cursorrules` pages section for page list and descriptions
- `src/layouts/BaseLayout.astro` for layout interface

## Tools
- Direct file creation (no execution script needed for static files)
- `npm run build` to verify compilation

## Outputs
- Astro page files in `src/pages/`
- Each page renders a placeholder message

## Page Template
```astro
---
import BaseLayout from '../layouts/BaseLayout.astro';
---

<BaseLayout title="Page Title" description="SEO description for this page.">
  <section class="placeholder-section">
    <h1>Content coming soon</h1>
  </section>
</BaseLayout>

<style>
  .placeholder-section {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 60vh;
    text-align: center;
  }

  h1 {
    font-size: clamp(2rem, 5vw, 3rem);
    color: var(--color-text-secondary);
  }
</style>
```

## Pages to Create
| Path | Title | Description |
|------|-------|-------------|
| `src/pages/beats/index.astro` | Beats | Browse and purchase beats by Russabuss. |
| `src/pages/services.astro` | Services | Mixing, mastering, and production services. |
| `src/pages/portfolio.astro` | Portfolio | Project showcases and client work. |
| `src/pages/about.astro` | About | Learn about Russabuss and the studio. |
| `src/pages/contact.astro` | Contact | Get in touch for bookings and inquiries. |
| `src/pages/blog/index.astro` | Blog | Music production tips and studio updates. |

## Edge Cases
- **Nested pages** (`beats/index.astro`, `blog/index.astro`): Create directory first if it doesn't exist.
- **Import paths**: Nested pages need `../../layouts/BaseLayout.astro`.

## Verification
Run `npm run build` after creating all pages. All 6 pages should compile without errors.

## Learnings
- Build completed successfully on first attempt (1.13s, 7 pages total including index).
- No special configuration needed for Astro 5.x with Vercel adapter.
- BaseLayout accepts `title` (required) and `description` (optional with default).
- Nested pages (`beats/`, `blog/`) require `../../layouts/` import path.
- CSS custom properties from `variables.css` are available globally via `global.css` import in BaseLayout.
- Placeholder styling uses `min-height: 60vh` to ensure visible content area above footer.
