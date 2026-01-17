# Mobile Menu Directive

## Goal
Add a responsive mobile navigation menu to the site header that:
- Shows hamburger icon on mobile (below 768px)
- Opens a full-screen overlay or slide-out menu
- Uses vanilla CSS and JS (no React island needed)
- Meets accessibility standards

## Inputs
- `src/components/astro/Header.astro` - existing header component
- `.cursorrules` - design patterns and brand guidelines

## Implementation

### Hamburger Button
- Hidden on desktop (display: none above 768px)
- Visible on mobile
- Uses CSS-only hamburger icon (3 lines)
- Animates to X when menu is open

### Mobile Menu Overlay
- Full-screen overlay with dark background
- Contains all nav links
- Slide-in from right animation
- Close button or tap outside to dismiss

### Accessibility Requirements
- `aria-expanded="false|true"` on hamburger button
- `aria-controls="mobile-menu"` on hamburger button
- `aria-hidden="true|false"` on menu overlay
- Focus trap when menu is open
- Escape key closes menu
- Focus returns to hamburger button on close

### CSS Variables Used
- `--color-bg-primary` - menu background
- `--color-text-primary` - link color
- `--color-accent` - hover state
- `--z-modal` - overlay z-index
- `--transition-base` - animations

## Edge Cases
- Menu should close when a link is clicked
- Menu should close on window resize above 768px
- Body scroll should be locked when menu is open

## Testing
1. Run `npm run dev`
2. Resize browser to below 768px
3. Verify hamburger appears
4. Click hamburger, verify menu opens
5. Test keyboard navigation (Tab, Escape)
6. Test screen reader with VoiceOver/NVDA
7. Verify menu closes on link click
8. Verify menu closes on resize above 768px

## Outputs
- Updated `src/components/astro/Header.astro`
- This directive updated with final implementation notes

---

## Implementation Notes

### Final Markup Pattern

**Hamburger Button** (inside `<nav>`):
```html
<button
  type="button"
  class="mobile-menu-button"
  aria-expanded="false"
  aria-controls="mobile-menu"
  aria-label="Open navigation menu"
>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
  <span class="hamburger-line"></span>
</button>
```

**Mobile Menu Overlay** (after `</header>`):
```html
<div id="mobile-menu" class="mobile-menu" aria-hidden="true">
  <nav class="mobile-menu-content" aria-label="Mobile navigation">
    <ul class="mobile-nav-links" role="list">
      <!-- nav links here -->
    </ul>
  </nav>
</div>
```

### Key CSS Patterns

- Hamburger hidden on desktop: `display: none` by default, `display: flex` at `@media (max-width: 768px)`
- Hamburger-to-X animation uses CSS transforms on `aria-expanded="true"`:
  - Line 1: `translateY(7px) rotate(45deg)`
  - Line 2: `opacity: 0`
  - Line 3: `translateY(-7px) rotate(-45deg)`
- Mobile menu slides in from right: `transform: translateX(100%)` default, `translateX(0)` when `aria-hidden="false"`
- Body scroll lock: `document.body.style.overflow = 'hidden'` when open

### JavaScript Event Handlers

1. **Button click** - toggles menu open/closed
2. **Link click** - closes menu (for SPA-like navigation)
3. **Escape key** - closes menu, returns focus to button
4. **Window resize** - closes menu if viewport > 768px
5. **Click on overlay background** - closes menu, returns focus to button

### Accessibility Checklist

- [x] `aria-expanded` toggles on button
- [x] `aria-controls` points to menu ID
- [x] `aria-hidden` toggles on menu
- [x] `aria-label` updates ("Open/Close navigation menu")
- [x] Focus moves to first link on open
- [x] Focus returns to button on close
- [x] Escape key closes menu
- [x] Screen reader announces state changes

### Lessons Learned

- Use `aria-hidden` on the menu overlay itself, not a separate backdrop
- The hamburger line gap + transform distance must match (5px gap, 7px transform = 2px line height centered)
- Lock body scroll to prevent background scrolling on iOS
- Menu should be positioned below header (top: 80px matches header height)
