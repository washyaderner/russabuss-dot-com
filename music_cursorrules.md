# .cursorrules

# Russabuss Music Website

## Project Overview

Music production portfolio and e-commerce site for Russ A Buss (russabuss.com). Sells beats and sample packs, showcases mixing/mastering/production services, handles client inquiries.

**Brand Voice:** Professional but approachable. Confident without arrogance. Creative rule-breaker with proven results.

**Design Aesthetic:** Dark mode, deep contrast, smooth animations, Nike/Apple-level polish. Alternating sections between "eye candy" (futuristic gradients, color) and "dark slate" (black/white, minimalist).

## Tech Stack

|Layer|Tool|Notes|
|---|---|---|
|Framework|Astro 4.x|Hybrid rendering (static default, SSR opt-in)|
|Interactive UI|React 18.x|Islands for audio player, checkout, 3D, forms|
|Styling|Vanilla CSS|Custom properties, CSS Modules, no Tailwind|
|Animations|GSAP + ScrollTrigger|Scroll effects, parallax, transitions|
|3D|Three.js|Hero/background visual elements|
|Audio|Wavesurfer.js|Waveform visualization for beat player|
|Auth|Supabase Auth|Email/password (OAuth optional future)|
|Database|Supabase Postgres|Users, orders|
|CMS|Contentful|Beats, sample packs, blog posts, services|
|Payments|Stripe Checkout|Primary payment processor|
|Payments Alt|PayPal|Secondary option|
|Email|Resend|Transactional emails, purchase delivery|
|Hosting|Vercel|Astro adapter, serverless functions|

## Site Structure

### Navigation

```
Home | Beats | Services | Portfolio | About | Blog | Contact | [Login/Account]
```

### Pages

**/** (Home)

- Hero section with GSAP animations, Three.js background
- Pricing carousel: 4 tiers (MP3 $50, WAV $80, STEMS $249, EXCLUSIVE $2k)
- "Your audio is in good hands" trust section
- Services grid: 6 cards (Mix & Master, Custom Tracks, Instrumentals, Studio Time, Vox, DJ)
- Qualifications + Gear: side-by-side with glowing divider
- FAQ tiles: 4 cards (Instrumentals, Custom Content, Mix Process, Pricing)
- Contact form with service checkboxes
- Footer

**/beats**

- Wavesurfer.js audio player
- Beat grid with filtering
- License modal system (4 license types - legal text unchanged)
- Add to cart / purchase flow

**/services**

- Service sections with YouTube embeds and images
- Sections: Mix & Master, Original Content, Instrumentals, Studio Time, Distribution, Soundtracks, AI Visualizers, NFTs, Meditation, Vocals, Beat Tags, Ringtones

**/portfolio**

- Project showcases with Spotify/YouTube embeds
- Case studies: Voodoo Bed, Twenty Poems, Seed, Sloth, Sleepy EP, Everybody Sleeps, Mob Studios
- Client reviews

**/about**

- TLDR bullet points
- Extended bio
- Why hire Russ section

**/blog**

- Contentful-powered blog listing
- Individual post pages
- SEO optimized

**/contact**

- Contact form (name, email, service checkboxes, notes)
- Reviews section
- "Your Dreams in ASMR" intro copy

**/login** & **/register**

- Supabase Auth integration
- Email/password

**/account**

- Dashboard
- Order history

### API Routes

- `/api/checkout` - Create Stripe session
- `/api/webhook` - Stripe webhook handler
- `/api/contact` - Contact form submission

## Design System

### Color Palette

```css
/* Dark backgrounds */
--color-bg-primary: #0a0a0a;
--color-bg-secondary: #141414;
--color-bg-elevated: #1a1a1a;
--color-bg-slate: #1e1e1e;

/* Text */
--color-text-primary: #ffffff;
--color-text-secondary: #a0a0a0;
--color-text-muted: #666666;

/* Accent (customize to brand) */
--color-accent: #6366f1;
--color-accent-hover: #818cf8;

/* Eye candy gradients */
--gradient-futuristic: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
--gradient-hero: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);

/* Slate sections */
--gradient-slate: linear-gradient(180deg, #1a1a1a 0%, #0d0d0d 100%);
```

### Section Rhythm

Alternate between:

1. **Eye candy**: Futuristic gradients, color, glow effects
2. **Dark slate**: Black/white gradients, minimalist, shadow effects

### Typography

- Display: Space Grotesk or similar geometric sans
- Body: Inter or system stack
- Mono: JetBrains Mono (for code/specs)

## Component Patterns

### React Islands (client:load or client:visible)

- AudioPlayer.jsx - Wavesurfer integration
- BeatCard.jsx - Individual beat with play/buy
- CheckoutButton.jsx - Stripe integration
- LicenseModal.jsx - License text display
- ContactForm.jsx - Form with validation
- ThreeScene.jsx - 3D background elements
- LoginForm.jsx / RegisterForm.jsx - Auth forms

### Astro Components (static)

- Header.astro - Navigation, mobile menu
- Footer.astro - Contact info, Bitcoin tip, QR, links
- SEO.astro - Meta tags, structured data
- ServiceCard.astro - Service grid items
- PortfolioEmbed.astro - Spotify/YouTube embeds
- PricingTier.astro - Pricing carousel cards
- FAQTile.astro - FAQ grid items

## Critical Implementation Notes

### Audio Player

- Use Wavesurfer.js for waveform visualization
- Responsive waveform that fits container
- Play/pause, progress bar, time display
- Queue system for continuous playback
- License selection triggers before add-to-cart

### License Modals

- 4 license types: Non-Exclusive, Exclusive, Non-Exclusive Commercial, Exclusive Commercial
- Legal text must remain 100% unchanged
- Modal or slide-out panel UI
- "VIEW LICENSE" button on pricing tiers

### Pricing Carousel (Home)

- 4 tiers visible simultaneously (no horizontal scroll)
- Responsive: stack on mobile
- Eye candy gradient background
- Each tier has: title, price, specs list, "VIEW LICENSE" button

### YouTube Embeds (Services/Portfolio)

- Lazy load for performance
- Responsive aspect ratio
- Use lite-youtube-embed or similar for performance

### Contact Form

- Fields: First name, Last name, Email, Service checkboxes, Notes
- Checkboxes: Mix & Master, Custom Tracks, Instrumentals, Studio Time, Vox, DJ, Other
- Validation before submit
- Resend integration for notifications

### Footer (all pages)

```
Russ A Buss
Your audio deserves the best treatment
Tip Russ in ₿itcoin: 33KK4NduUZLJHsNXV5KWbgpvfzSvcLGgoK

[LinkTree QR Code]

Contact:
(503) 734-5502
audio@russabuss.com
russabuss.eth
russabuss.sol
```

## File Organization

```
src/
├── components/
│   ├── react/           # Interactive islands
│   └── astro/           # Static components
├── layouts/
│   ├── BaseLayout.astro
│   └── ProductLayout.astro
├── pages/
│   ├── index.astro
│   ├── beats/
│   ├── services.astro
│   ├── portfolio.astro
│   ├── about.astro
│   ├── blog/
│   ├── contact.astro
│   ├── login.astro
│   ├── register.astro
│   ├── account/
│   └── api/
├── lib/
│   ├── contentful.js
│   ├── supabase.js
│   ├── stripe.js
│   └── resend.js
├── styles/
│   ├── global.css
│   ├── variables.css
│   ├── animations.css
│   └── components/
├── data/
│   └── mock-beats.js    # Dev mock data until Contentful connected
└── types/
```

## Development Workflow

### Before ANY modification

1. Read complete file top to bottom
2. Understand purpose and structure
3. Identify existing patterns
4. Check for duplicate functionality
5. Follow established conventions

### Error Handling

- Fix if clear how to proceed
- DO NOT loop more than 3 times on same file
- On third attempt: STOP and ask user

### Git Strategy

- `main`: Production (stable)
- `dev`: Development (feature integration)
- `feature/*`: Branch off dev

### Testing Checkpoints

After each major feature:

1. Dev server runs without errors
2. Page renders correctly
3. Mobile responsive
4. Animations smooth (no jank)
5. Accessibility basics (focus states, alt text)

## Security Requirements

### Input Validation

- Validate all form inputs client AND server side
- Sanitize before database insertion
- Use Zod for schema validation

### Environment Variables

- All secrets in .env (never hardcode)
- .env.example with dummy values
- NEVER expose secret keys to client

### Auth

- Supabase handles password hashing
- Session management via Supabase
- Protected routes check auth state

### Payments

- Stripe Checkout (hosted) - we don't handle card data
- Webhook signature verification
- Order records in Supabase

## Content: Key Copy Snippets

### Homepage Hero (suggested)

"Beats. Mixing. Mastering. Your sound, elevated."

### Trust Section Title

"Your audio is in good hands"

### Services Intro

"MY APPROACH WITH ANY PROJECT…" "Each project I take on has different needs, and I want to make sure you're 100% happy with the final copy."

### Contact Intro

"YOUR DREAMS IN ASMR" "Send me a message using the form below..."

### Footer Tagline

"Your audio deserves the best treatment"

## Mock Data Structure (for dev)

```javascript
// src/data/mock-beats.js
export const mockBeats = [
  {
    id: 'demo-beat-1',
    slug: 'midnight-trap',
    title: 'Midnight Trap',
    bpm: 140,
    key: 'F minor',
    tags: ['trap', 'dark', '808'],
    audioPreview: '/audio/demo-preview.mp3',
    coverArt: '/images/demo-cover.jpg',
    prices: {
      mp3: 50,
      wav: 80,
      stems: 249,
      exclusive: 2000
    },
    available: true
  },
  // Add 3-5 more for testing
];
```

## Contentful Content Types (for reference)

### Beat

- title (Short text)
- slug (Short text)
- bpm (Integer)
- key (Short text)
- tags (Short text, list)
- audioPreview (Media or Link)
- coverArt (Media)
- priceMp3 (Integer)
- priceWav (Integer)
- priceStems (Integer)
- priceExclusive (Integer)
- driveLink (Short text)
- available (Boolean)

### Sample Pack

- title, slug, price, description (Rich text), coverArt, audioPreview, contents, driveLink, tags

### Blog Post

- title, slug, excerpt, content (Rich text), coverImage, publishDate, author, tags

---

# Scratchpad

## Current Task

[ ] Awaiting user input

## Completed

- Tech stack finalized
- Site structure defined
- Content gathered

## Next Steps

1. Initialize Astro project
2. Set up folder structure
3. Create design system (CSS variables)
4. Build BaseLayout with Header/Footer
5. Create homepage sections

---

# Lessons

## User Specified

- Uses Resend for email (existing account)
- Uses Contentful for CMS (has existing account, uses for blogs)
- Prefers pre-made Google Drive links for delivery (v1)
- No time pressure - build properly
- Vercel hosting, owns russabuss.com
- Dark mode, Nike/Apple aesthetic
- Alternating eye candy / dark slate sections

## AI Learned

(Add lessons as project progresses)