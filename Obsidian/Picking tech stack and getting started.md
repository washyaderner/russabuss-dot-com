This feedback simplifies things nicely. Here's what changes:

---

## Updated Decisions

### Auth: Simplified

Email + password as primary. OAuth is a "nice to have" we can add later without architectural changes. Supabase Auth handles both seamlessly, so we're not painting ourselves into a corner.

### Content: Contentful for Everything

Yes - Contentful works great for product management. You'll create a "Beat" content type and a "Sample Pack" content type with fields like:

**Beat content type:**

- Title (text)
- Slug (text, for URL)
- Price - Basic License (number)
- Price - Premium License (number)
- Price - Exclusive License (number)
- Audio Preview (media/file or external URL)
- Cover Art (media)
- BPM (number)
- Key (text)
- Tags (list)
- Google Drive Link (text - your pre-made folder URL)
- Available (boolean - to hide sold exclusives)

**Sample Pack content type:**

- Title
- Slug
- Price
- Audio Previews (multiple files or links)
- Cover Art
- Description (rich text)
- Contents list (text - "50 drums, 25 melodies, 10 FX")
- Google Drive Link
- Tags

You add new products the same way you add blog posts - through Contentful's dashboard. No JSON, no code deploys, no CLI.

---

## Final Stack

|Layer|Tool|Purpose|
|---|---|---|
|Framework|Astro 4.x|Static pages + React islands|
|Interactive UI|React|Audio player, checkout, 3D scenes|
|Styling|Vanilla CSS + Custom Properties|Dark mode, gradients, animations|
|Animations|GSAP + ScrollTrigger|Scroll effects, parallax|
|3D|Three.js|Visual flair|
|Audio|Wavesurfer.js|Waveform player|
|Auth|Supabase Auth|Email/password (OAuth later if wanted)|
|Database|Supabase Postgres|Users, order history|
|CMS|Contentful|Beats, sample packs, blog posts|
|Payments|Stripe Checkout|Cards, Apple Pay, Google Pay|
|Payments (alt)|PayPal|Secondary option|
|Email|Resend|Purchase confirmations, delivery links|
|File Delivery|Pre-made Google Drive folders|Links stored in Contentful|
|Hosting|Vercel|Your domain (russabuss.com)|

---

## Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                        CONTENTFUL                           │
│  Beats, Sample Packs, Blog Posts, Prices, Drive Links       │
└─────────────────────┬───────────────────────────────────────┘
                      │ fetched at build time + on-demand
                      ▼
┌─────────────────────────────────────────────────────────────┐
│                      ASTRO SITE                             │
│  Static pages (portfolio, about, services)                  │
│  React islands (audio player, product cards, checkout)      │
│  API routes (webhooks, contact form)                        │
└─────────────────────┬───────────────────────────────────────┘
                      │
        ┌─────────────┼─────────────┐
        ▼             ▼             ▼
   ┌─────────┐  ┌──────────┐  ┌──────────┐
   │ STRIPE  │  │ SUPABASE │  │  RESEND  │
   │Checkout │  │Auth + DB │  │  Email   │
   └────┬────┘  └────┬─────┘  └────┬─────┘
        │            │             │
        └────────────┼─────────────┘
                     ▼
              ┌─────────────┐
              │   CUSTOMER  │
              │ Gets email  │
              │ w/ Drive    │
              │ link        │
              └─────────────┘
```

---

## Build Phases

**Phase 1: Foundation**

- Astro project setup
- CSS design system (dark mode, gradients, custom properties)
- Basic page structure (home, beats, sample packs, portfolio, about, contact)
- Contentful integration for beats/packs

**Phase 2: Audio & Interactivity**

- Wavesurfer.js audio player component
- GSAP scroll animations
- Cursor-following effects
- Basic Three.js scene (hero section or background)

**Phase 3: E-commerce**

- Stripe Checkout integration
- License tier selection UI
- Webhook handler for purchase completion
- Resend email with Google Drive link

**Phase 4: Auth & Accounts**

- Supabase Auth setup
- Login/register pages
- Order history page
- Protected routes

**Phase 5: Polish**

- SEO optimization (meta tags, structured data, sitemap)
- Performance tuning
- Mobile responsiveness
- Portfolio embeds (Spotify, YouTube)

---

## Ready to Generate Project Setup?

I can now create:

1. **Project initialization prompt** for Claude Code
2. **Folder structure**
3. **`.cursorrules` file** tailored to this stack
4. **Contentful content model definitions** (so you can set up the CMS)
5. **Phase 1 detailed prompts** following your self-annealing workflow

Want me to generate these as files you can download, or output them here in the chat for copy/paste?