# Russabuss Music Website - Project Initialization

## Project Overview

Build a music production portfolio and e-commerce website for Russabuss (russabuss.com). The site sells beats and sample packs, showcases mixing/mastering portfolio work, and provides service information. Design aesthetic: dark mode, deep contrast, smooth animations, Nike/Apple-level polish.

## Tech Stack

| Layer | Tool | Version |
|-------|------|---------|
| Framework | Astro | 4.x (latest) |
| Interactive UI | React | 18.x |
| Styling | Vanilla CSS | Custom properties, CSS Modules for components |
| Animations | GSAP + ScrollTrigger | 3.x |
| 3D | Three.js | Latest |
| Audio Player | Wavesurfer.js | 7.x |
| Auth | Supabase Auth | Latest |
| Database | Supabase Postgres | (via Supabase JS client) |
| CMS | Contentful | Headless, fetched at build + runtime |
| Payments | Stripe Checkout | Latest API |
| Email | Resend | Latest |
| Hosting | Vercel | Astro adapter |

## Initialize Project

```bash
# Create Astro project with TypeScript support (we'll use JSDoc, but TS tooling helps)
npm create astro@latest russabuss -- --template minimal --typescript strict

cd russabuss

# Install core dependencies
npm install @astrojs/react @astrojs/vercel react react-dom

# Install animation and 3D
npm install gsap three @types/three

# Install audio player
npm install wavesurfer.js

# Install Supabase
npm install @supabase/supabase-js

# Install Contentful
npm install contentful

# Install Stripe
npm install @stripe/stripe-js stripe

# Install Resend
npm install resend

# Install dev dependencies
npm install -D @types/react @types/react-dom
```

## Folder Structure

Create this structure:

```
russabuss/
├── .cursorrules                 # Cursor AI instructions
├── .env.example                 # Environment variable template
├── .env                         # Local env vars (gitignored)
├── .gitignore
├── astro.config.mjs
├── package.json
├── tsconfig.json                # For JSDoc type checking
├── README.md
│
├── public/
│   ├── fonts/                   # Self-hosted fonts
│   ├── audio/                   # Audio preview files (or use Contentful CDN)
│   ├── images/                  # Static images
│   ├── favicon.svg
│   └── robots.txt
│
├── src/
│   ├── components/
│   │   ├── react/               # React island components
│   │   │   ├── AudioPlayer.jsx
│   │   │   ├── BeatCard.jsx
│   │   │   ├── CheckoutButton.jsx
│   │   │   ├── LicenseSelector.jsx
│   │   │   ├── ThreeScene.jsx
│   │   │   └── ContactForm.jsx
│   │   │
│   │   └── astro/               # Astro components (static)
│   │       ├── Header.astro
│   │       ├── Footer.astro
│   │       ├── Navigation.astro
│   │       ├── PortfolioEmbed.astro
│   │       ├── ServiceCard.astro
│   │       └── SEO.astro
│   │
│   ├── layouts/
│   │   ├── BaseLayout.astro     # HTML shell, global styles, scripts
│   │   └── ProductLayout.astro  # Layout for beat/pack detail pages
│   │
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   ├── beats/
│   │   │   ├── index.astro      # All beats listing
│   │   │   └── [slug].astro     # Individual beat page
│   │   ├── sample-packs/
│   │   │   ├── index.astro      # All packs listing
│   │   │   └── [slug].astro     # Individual pack page
│   │   ├── portfolio.astro      # Mixing/mastering work showcase
│   │   ├── services.astro       # What you offer
│   │   ├── about.astro          # Bio, story
│   │   ├── contact.astro        # Contact form
│   │   ├── login.astro          # Auth page
│   │   ├── register.astro       # Account creation
│   │   ├── account/
│   │   │   ├── index.astro      # Dashboard
│   │   │   └── orders.astro     # Order history
│   │   └── api/
│   │       ├── checkout.ts      # Create Stripe session
│   │       ├── webhook.ts       # Stripe webhook handler
│   │       └── contact.ts       # Contact form handler
│   │
│   ├── lib/
│   │   ├── contentful.js        # Contentful client + query functions
│   │   ├── supabase.js          # Supabase client
│   │   ├── stripe.js            # Stripe helpers
│   │   └── resend.js            # Email helpers
│   │
│   ├── styles/
│   │   ├── global.css           # Reset, typography, custom properties
│   │   ├── variables.css        # CSS custom properties (colors, spacing)
│   │   ├── animations.css       # Keyframes, transition utilities
│   │   └── components/          # Component-specific styles
│   │       ├── header.css
│   │       ├── audio-player.css
│   │       └── ...
│   │
│   └── types/
│       └── contentful.d.ts      # Type definitions for Contentful models
│
└── scripts/
    └── generate-types.js        # Optional: generate types from Contentful
```

## Configuration Files

### astro.config.mjs

```javascript
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel/serverless';

export default defineConfig({
  output: 'hybrid',  // Static by default, opt-in to SSR per page
  adapter: vercel(),
  integrations: [react()],
  vite: {
    ssr: {
      noExternal: ['three']
    }
  }
});
```

### .env.example

```bash
# Contentful
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token
CONTENTFUL_PREVIEW_TOKEN=your_preview_token

# Supabase
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Stripe
STRIPE_SECRET_KEY=sk_live_...
PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...

# Site
PUBLIC_SITE_URL=https://russabuss.com
```

### tsconfig.json (for JSDoc support)

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "checkJs": true,
    "allowJs": true,
    "jsx": "react-jsx",
    "jsxImportSource": "react",
    "baseUrl": ".",
    "paths": {
      "@components/*": ["src/components/*"],
      "@layouts/*": ["src/layouts/*"],
      "@lib/*": ["src/lib/*"],
      "@styles/*": ["src/styles/*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

## Initial Files to Create

### src/styles/variables.css

```css
:root {
  /* Colors - Dark Mode Primary */
  --color-bg-primary: #0a0a0a;
  --color-bg-secondary: #141414;
  --color-bg-elevated: #1a1a1a;
  
  /* Text */
  --color-text-primary: #ffffff;
  --color-text-secondary: #a0a0a0;
  --color-text-muted: #666666;
  
  /* Accent - adjust to your brand */
  --color-accent: #6366f1;
  --color-accent-hover: #818cf8;
  --color-accent-muted: #4f46e5;
  
  /* Gradients */
  --gradient-hero: linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f0f23 100%);
  --gradient-accent: linear-gradient(135deg, var(--color-accent) 0%, #8b5cf6 100%);
  
  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 2rem;
  --space-xl: 4rem;
  --space-2xl: 8rem;
  
  /* Typography */
  --font-sans: 'Inter', system-ui, -apple-system, sans-serif;
  --font-display: 'Space Grotesk', var(--font-sans);
  --font-mono: 'JetBrains Mono', monospace;
  
  /* Sizing */
  --max-width: 1200px;
  --header-height: 80px;
  
  /* Transitions */
  --transition-fast: 150ms ease;
  --transition-base: 300ms ease;
  --transition-slow: 500ms ease;
  
  /* Shadows */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.5);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.5);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.5);
  --shadow-glow: 0 0 20px rgba(99, 102, 241, 0.3);
  
  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-full: 9999px;
}
```

### src/styles/global.css

```css
@import './variables.css';

/* Reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  font-size: 16px;
  scroll-behavior: smooth;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  font-family: var(--font-sans);
  background-color: var(--color-bg-primary);
  color: var(--color-text-primary);
  line-height: 1.6;
  min-height: 100vh;
}

/* Typography */
h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-display);
  font-weight: 600;
  line-height: 1.2;
}

h1 { font-size: clamp(2.5rem, 5vw, 4rem); }
h2 { font-size: clamp(2rem, 4vw, 3rem); }
h3 { font-size: clamp(1.5rem, 3vw, 2rem); }

a {
  color: var(--color-accent);
  text-decoration: none;
  transition: color var(--transition-fast);
}

a:hover {
  color: var(--color-accent-hover);
}

/* Utility classes */
.container {
  width: 100%;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 0 var(--space-md);
}

.visually-hidden {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

/* Focus styles for accessibility */
:focus-visible {
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

/* Selection */
::selection {
  background-color: var(--color-accent);
  color: var(--color-text-primary);
}
```

### src/layouts/BaseLayout.astro

```astro
---
import '../styles/global.css';
import SEO from '../components/astro/SEO.astro';
import Header from '../components/astro/Header.astro';
import Footer from '../components/astro/Footer.astro';

interface Props {
  title: string;
  description?: string;
  image?: string;
}

const { 
  title, 
  description = 'Music production, mixing, mastering, beats, and sample packs by Russabuss.',
  image = '/images/og-default.jpg'
} = Astro.props;
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <SEO title={title} description={description} image={image} />
  </head>
  <body>
    <Header />
    <main>
      <slot />
    </main>
    <Footer />
  </body>
</html>

<style>
  main {
    min-height: calc(100vh - var(--header-height));
  }
</style>
```

### src/lib/contentful.js

```javascript
// @ts-check
import { createClient } from 'contentful';

const client = createClient({
  space: import.meta.env.CONTENTFUL_SPACE_ID,
  accessToken: import.meta.env.CONTENTFUL_ACCESS_TOKEN,
});

/**
 * Fetch all beats from Contentful
 * @returns {Promise<Array>}
 */
export async function getBeats() {
  const entries = await client.getEntries({
    content_type: 'beat',
    order: ['-sys.createdAt'],
  });
  return entries.items.map(item => ({
    id: item.sys.id,
    ...item.fields,
  }));
}

/**
 * Fetch a single beat by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getBeatBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'beat',
    'fields.slug': slug,
    limit: 1,
  });
  if (entries.items.length === 0) return null;
  const item = entries.items[0];
  return { id: item.sys.id, ...item.fields };
}

/**
 * Fetch all sample packs
 * @returns {Promise<Array>}
 */
export async function getSamplePacks() {
  const entries = await client.getEntries({
    content_type: 'samplePack',
    order: ['-sys.createdAt'],
  });
  return entries.items.map(item => ({
    id: item.sys.id,
    ...item.fields,
  }));
}

/**
 * Fetch a single sample pack by slug
 * @param {string} slug
 * @returns {Promise<Object|null>}
 */
export async function getSamplePackBySlug(slug) {
  const entries = await client.getEntries({
    content_type: 'samplePack',
    'fields.slug': slug,
    limit: 1,
  });
  if (entries.items.length === 0) return null;
  const item = entries.items[0];
  return { id: item.sys.id, ...item.fields };
}
```

### src/lib/supabase.js

```javascript
// @ts-check
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Get current user session
 * @returns {Promise<Object|null>}
 */
export async function getSession() {
  const { data: { session } } = await supabase.auth.getSession();
  return session;
}

/**
 * Get user's order history
 * @param {string} userId
 * @returns {Promise<Array>}
 */
export async function getUserOrders(userId) {
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false });
  
  if (error) throw error;
  return data;
}
```

## Success Criteria

Initialization is complete when:

1. ✅ `npm run dev` starts without errors
2. ✅ Homepage loads at localhost:4321
3. ✅ Dark background with CSS custom properties applied
4. ✅ Folder structure matches specification
5. ✅ All dependencies installed (check package.json)
6. ✅ .env.example created with all required variables documented
7. ✅ TypeScript/JSDoc checking works (no red squiggles in lib files)

## Next Phase Preview

After initialization, Phase 1 continues with:
- Header/Navigation component with mobile menu
- Footer component
- SEO component with meta tags and structured data
- Homepage hero section with GSAP animations
- Basic routing verification (all pages render)

---

**IMPORTANT**: Do not proceed to animations or complex features until this foundation is solid. Test the dev server, verify imports work, confirm Astro's hybrid rendering is configured correctly.
