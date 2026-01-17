# Auth Page Shells Directive

## Goal
Create accessible, placeholder auth pages (login, register, account dashboard) using BaseLayout that follow the design system and security requirements outlined in `.cursorrules`.

## Inputs
- `.cursorrules` - Security requirements and design system
- `src/layouts/BaseLayout.astro` - Base layout component
- `src/styles/variables.css` - Design tokens

## Outputs
- `src/pages/login.astro` - Login page with accessible form
- `src/pages/register.astro` - Registration page with accessible form
- `src/pages/account/index.astro` - Dashboard placeholder (protected page shell)

## Implementation Notes

### Page Structure
All pages use `BaseLayout` with appropriate title and description props.

### Form Accessibility Requirements
- All inputs have associated `<label>` elements with `for` attribute matching input `id`
- Required fields marked with `aria-required="true"`
- Form fields include `autocomplete` attributes for password managers
- Error message containers have `aria-live="polite"` for screen reader announcements
- Submit buttons are `<button type="submit">` not input or anchor elements
- Focus states use `--color-accent` per design system

### Security Considerations (from .cursorrules)
- Password field: `autocomplete="current-password"` (login) or `autocomplete="new-password"` (register)
- Email field: `autocomplete="email"` and `type="email"` for browser validation
- Forms use `method="POST"` (even though not functional yet)
- CSRF token placeholder included as hidden input
- No actual auth logic - these are shell pages for UI/UX development

### Form Fields

**Login Form:**
- Email (required)
- Password (required)
- Remember me checkbox
- Submit button
- Link to register page

**Register Form:**
- Email (required)
- Password (required, min 12 chars noted in helper text)
- Confirm password (required)
- Terms acceptance checkbox
- Submit button
- Link to login page

**Account Dashboard:**
- Placeholder heading
- Message indicating dashboard content coming soon
- Logout button placeholder

### Styling Approach
- Use scoped `<style>` blocks in each Astro file
- Follow existing patterns from BaseLayout and global.css
- Use CSS custom properties from variables.css
- Dark theme with proper contrast ratios
- Responsive design (mobile-first)

## Edge Cases
- Forms must render and be keyboard-navigable even without JS
- Empty state handling for account page
- Proper focus management for accessibility

## Testing
Run `npm run build` to verify:
- No TypeScript/Astro compilation errors
- Pages render correctly
- No accessibility lint warnings

## Learnings Log

### Security (from .cursorrules implementation)
- CSRF tokens must be populated server-side when Supabase Auth is connected
- Password requirements: min 12 chars with letters, numbers, and symbols (per .cursorrules section on Authentication)
- Account lockout after 5 failed attempts should be implemented in API layer
- Session timeout: 30 minutes inactivity (implement in Supabase Auth config)
- Use `role="alert"` with `aria-live="polite"` for form error messages

### Accessibility
- All form inputs require explicit `<label>` with `for` attribute (not wrapping)
- `aria-required="true"` on required fields for screen readers
- Focus ring uses `box-shadow` with accent color at 40% opacity for visibility on dark backgrounds
- Skip link already exists in BaseLayout - no additional skip links needed

### Build Notes
- Astro 5.x builds auth pages as static HTML by default
- When Supabase Auth is added, pages may need `export const prerender = false` for SSR
- Build time: ~1.6s for 4 pages (fast enough for dev iteration)

### Next Steps for Functional Auth
1. Create `src/lib/supabase.ts` client
2. Convert forms to React islands (`LoginForm.tsx`, `RegisterForm.tsx`)
3. Add API routes: `/api/auth/login`, `/api/auth/register`, `/api/auth/logout`
4. Implement CSRF token generation and validation
5. Add route protection middleware for `/account/*` pages
