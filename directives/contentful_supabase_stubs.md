## Contentful And Supabase Stubs

## Goal
Create minimal client helpers for Contentful and Supabase with JSDoc.

## Inputs
- `russabuss-init-prompt.md`
- `.cursorrules` security and environment variable rules

## Tools/Scripts
- None required.

## Process
1. Create or update `src/lib/contentful.js` and `src/lib/supabase.js`.
2. Use environment variables only; never hardcode secrets.
3. Add JSDoc and `@ts-check` for type checking.
4. Keep functions minimal and readable.
5. Avoid adding network calls beyond client creation and simple fetch helpers.

## Outputs
- `src/lib/contentful.js`
- `src/lib/supabase.js`

## Edge Cases
- If files already exist, avoid breaking changes and keep existing comments.
