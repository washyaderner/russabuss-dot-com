# Mock Data and Library Stubs

## Goal
Create mock data files and library stubs for development before real API integrations are connected. This enables frontend development to proceed without waiting for external services.

## Inputs
- `.cursorrules` mock data structure (Beat schema)
- Existing lib patterns from `src/lib/contentful.js` and `src/lib/supabase.js`
- Environment variable names from `.env.example`

## Outputs
- `src/data/mock-beats.js` - 5 mock beats matching the Beat schema
- `src/lib/stripe.js` - Stripe client stub with `getConfig()` and `createCheckoutSession()`
- `src/lib/resend.js` - Resend client stub with `getConfig()` and `sendEmail()`

## Pattern Requirements

### All files must include:
- `// @ts-check` at the top
- JSDoc `@typedef` for all custom types
- JSDoc `@param` and `@returns` on all functions
- CommonJS `module.exports` (matching existing lib files)
- Environment variable validation in `getConfig()` functions

### Mock Data Structure (Beat)
```javascript
{
  id: string,           // e.g., 'demo-beat-1'
  slug: string,         // e.g., 'midnight-trap'
  title: string,        // e.g., 'Midnight Trap'
  bpm: number,          // e.g., 140
  key: string,          // e.g., 'F minor'
  tags: string[],       // e.g., ['trap', 'dark', '808']
  audioPreview: string, // e.g., '/audio/demo-preview.mp3'
  coverArt: string,     // e.g., '/images/demo-cover.jpg'
  prices: {
    mp3: number,        // e.g., 50
    wav: number,        // e.g., 80
    stems: number,      // e.g., 249
    exclusive: number   // e.g., 2000
  },
  available: boolean
}
```

### Required Environment Variables

**Stripe:**
- `STRIPE_SECRET_KEY` - Server-side secret key (sk_live_... or sk_test_...)
- `PUBLIC_STRIPE_PUBLISHABLE_KEY` - Client-side publishable key (pk_live_... or pk_test_...)
- `STRIPE_WEBHOOK_SECRET` - Webhook signing secret (whsec_...)

**Resend:**
- `RESEND_API_KEY` - API key (re_...)
- `RESEND_FROM_EMAIL` - Default sender email (optional, defaults to 'audio@russabuss.com')

## Edge Cases
- Stubs should NOT make real API calls
- Stubs should throw clear errors when required env vars are missing
- Use placeholder return values that match expected API response shapes

## Self-Annealing Notes
- 2026-01-17: Created directive. Env vars already exist in `.env.example` except `RESEND_FROM_EMAIL`.
