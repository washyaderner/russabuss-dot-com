# Project State

> Source of Truth for this project. Update when scope or integrations change.
> Never delete entries. Only append new ones.
>
> **Retrofitted with PILOT framework on 2026-01-25**

---

## Project Overview
**Name:** Russabuss Music Website  
**Type:** MIXED (Web + Automation)  
**North Star:** Music production portfolio and e-commerce site for Russ A Buss (`russabuss.com`)  
**Started:** 2026-01-16 (Phase 1 foundation)  
**PILOT Adopted:** 2026-01-25

---

## Integrations
| Service | Purpose | Status | Rate Limits | Auth Method |
| --- | --- | --- | --- | --- |
| Contentful | CMS for beats, packs, blog | Existing | TBD | API key |
| Supabase | Auth + Postgres database | Existing | TBD | Project keys |
| Stripe | Payments and checkout | Existing | TBD | Secret key |
| Resend | Transactional email | Existing | TBD | API key |
| Vercel | Hosting and deploys | Existing | TBD | Vercel token |

---

## Phase 1 Completion Summary
**Dev server:** Works at `localhost:4321` (Astro 5.16.11)  
**GitHub CLI:** Authenticated as `washyaderner`  
**Git status:** `main` and `dev` synced at commit `6d85b99`

**Files created (Phase 1):**
- `src/styles/variables.css` - Design system CSS custom properties
- `src/styles/global.css` - Reset, typography, utilities
- `src/layouts/BaseLayout.astro` - HTML shell with SEO, header, footer
- `src/components/astro/Header.astro` - Navigation with mobile menu
- `src/components/astro/Footer.astro` - Contact info, Bitcoin tip, links
- `src/lib/contentful.js` - Contentful client with JSDoc
- `src/lib/supabase.js` - Supabase client with JSDoc
- `src/lib/stripe.js` - Stripe helpers stub
- `src/lib/resend.js` - Resend email stub
- `src/data/mock-beats.js` - Mock beat data for dev
- `src/pages/index.astro` - Homepage (placeholder, needs sections)
- `src/pages/beats/index.astro` - Beats listing shell
- `src/pages/services.astro` - Services page shell
- `src/pages/portfolio.astro` - Portfolio page shell
- `src/pages/about.astro` - About page shell
- `src/pages/blog/index.astro` - Blog listing shell
- `src/pages/contact.astro` - Contact page shell
- `src/pages/login.astro` - Login page shell
- `src/pages/register.astro` - Register page shell
- `src/pages/account/index.astro` - Account dashboard shell

**Configs:**
- `astro.config.mjs` - Astro 5.x with React, Vercel adapter, static output
- `tsconfig.json` - Path aliases configured
- `.env.example` - All required env vars documented

---

## Data Schema
### Input Shape
```json
{
  "note": "Document input shape here when integrations are wired."
}
```

### Output Shape (Payload)
```json
{
  "note": "Document output shape here when integrations are wired."
}
```

---

## Behavioral Rules
See `.cursorrules` for the authoritative rules and constraints.

---

## Context Handoffs
| Date | Update |
| --- | --- |
| 2026-01-16 | Phase 1 foundation complete. Base layout, styles, page shells, lib stubs, and mock data created. |

---

## Maintenance Log
<!-- Append maintenance updates here. Do not delete old entries. -->
