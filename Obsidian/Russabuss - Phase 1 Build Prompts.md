These prompts are designed to be run sequentially in Claude Code or Cursor. Each prompt builds on the previous one. Wait for successful completion before moving to the next.

---

## Pre-Flight Checklist

Before starting, ensure you have:

- [ ] Created project folder
- [ ] Placed `russabuss-init-prompt.md` in folder
- [ ] Placed `.cursorrules` file in folder (rename from .md)
- [ ] Opened folder in Cursor or Claude Code

---

## Prompt 1.1: Project Initialization

```
Initialize the Russabuss music website following the instructions in russabuss-init-prompt.md.

Create the Astro project, install all dependencies, and set up the folder structure exactly as specified. Create the initial configuration files (astro.config.mjs, tsconfig.json, .env.example).

Create the CSS foundation files (variables.css and global.css) with the dark mode color palette.

Success criteria:
- npm run dev starts without errors
- Localhost shows default Astro page
- All folders exist per structure
- CSS variables file has the full color palette
```

---

## Prompt 1.2: Base Layout + Header

```
Create the BaseLayout.astro and Header.astro components.

BaseLayout should:
- Import global.css
- Include proper HTML structure with lang="en"
- Have slots for page content
- Include the Header component

Header should:
- Fixed position at top
- Dark background with subtle border or shadow
- Logo/brand name "Russ A Buss" on left
- Navigation links: Home, Beats, Services, Portfolio, About, Blog, Contact
- Login link on far right
- Mobile hamburger menu (functional toggle, slide-out nav)
- Smooth transition animations
- Use CSS custom properties for colors

The header should feel premium - think Apple.com navigation. Subtle, clean, functional.

Success criteria:
- Header renders on page
- Navigation links visible on desktop
- Mobile menu toggles open/closed
- Smooth animations, no jank
- Proper dark mode styling
```

---

## Prompt 1.3: Footer Component

```
Create the Footer.astro component with all the content specified in .cursorrules.

Footer should include:
- "Russ A Buss" heading
- Tagline: "Your audio deserves the best treatment"
- Bitcoin tip address: 33KK4NduUZLJHsNXV5KWbgpvfzSvcLGgoK
- Placeholder for LinkTree QR code (use a placeholder div for now)
- Contact info section:
  - (503) 734-5502
  - audio@russabuss.com
  - russabuss.eth
  - russabuss.sol

Design:
- Dark slate background
- Subtle top border or gradient fade
- Clean grid layout
- Responsive (stack on mobile)
- Consistent spacing with CSS variables

Add Footer to BaseLayout so it appears on all pages.

Success criteria:
- Footer renders at bottom of page
- All contact info displays correctly
- Responsive layout works on mobile
- Matches dark aesthetic
```

---

## Prompt 1.4: SEO Component

```
Create the SEO.astro component for meta tags and structured data.

The component should accept props:
- title (required)
- description (optional, with default)
- image (optional, for og:image)
- type (optional, default "website")
- noindex (optional boolean)

Include:
- <title> tag with format "Page Title | Russ A Buss"
- meta description
- Open Graph tags (og:title, og:description, og:image, og:type, og:url)
- Twitter card tags
- Canonical URL
- Favicon links
- Basic JSON-LD structured data for the site

Add the SEO component to BaseLayout, passing title as a required prop.

Success criteria:
- Meta tags render in <head>
- Open Graph tags have correct content
- Title format is consistent
- No console warnings about missing meta
```

---

## Prompt 1.5: Homepage Hero Section

```
Create the homepage (src/pages/index.astro) with a hero section.

Hero section should:
- Full viewport height (100vh)
- Gradient background using --gradient-hero
- Large headline: "Beats. Mixing. Mastering." (or similar impactful text)
- Subheadline: "Your sound, elevated."
- Two CTA buttons: "Browse Beats" and "View Services"
- Subtle animated elements (CSS animations for now, GSAP later)

Design notes:
- Deep contrast, dark background
- Text should pop against the gradient
- Buttons should have hover states with smooth transitions
- Consider a subtle gradient orb or glow effect behind the headline
- Mobile responsive - smaller text, stacked buttons

Use the eye candy gradient style for this section.

Success criteria:
- Hero takes full viewport
- Gradient renders correctly
- Buttons are clickable (link to /beats and /services)
- Responsive on mobile
- Animations are smooth
```

---

## Prompt 1.6: Pricing Carousel Section

```
Create the pricing carousel section for the homepage, directly below the hero.

This section displays 4 pricing tiers side-by-side (no horizontal scrolling on desktop):

MP3 - $50
- 320 kbps
- Mp3 File
- Structure As-Is
- Non-Exclusive License
- Sell 5k Copies
- 10k Streams
- Bundle Discounts
- VIEW LICENSE button

WAV - $80
- 24 bit 48 kHz
- Wav File
- 1 Structure Edit
- Non-Exclusive License
- Sell 10k Copies
- 100k Streams
- Bundle Discounts
- VIEW LICENSE button

STEMS - $249
- 24 bit 48 kHz
- Wav Stems
- Infinite Edits
- Non-Exclusive License
- Sell 20k Copies
- 250k Streams
- Discount on Mix & Master
- VIEW LICENSE button

EXCLUSIVE - $2k
- You get it all
- All Wav Stems
- Infinite Edits
- Exclusive License
- Sell Unlimited Copies
- Unlimited Streams
- Discount on Mix & Master
- VIEW LICENSE button

Design:
- Eye candy style: futuristic gradients, glowing effects
- Each tier is a card with subtle glow/shadow
- Price prominently displayed
- VIEW LICENSE button at bottom of each card
- Cards should feel premium, modern, sleek
- On mobile: 2x2 grid or vertical stack

The VIEW LICENSE buttons don't need to work yet - we'll add the modal later.

Success criteria:
- All 4 tiers visible without horizontal scroll (desktop)
- Responsive layout on mobile
- Eye candy gradient aesthetic
- Cards have depth (shadows, borders, or glows)
- Buttons have hover states
```

---

## Prompt 1.7: Trust Section

```
Create the "Your audio is in good hands" trust section for the homepage, below the pricing carousel.

This section uses the dark slate aesthetic (opposite of eye candy).

Content:
Title: "Your audio is in good hands"

Body text (use this exact copy):
"When you hire someone to work on a music project, you need them to care as much about the end result as you do. It's all too common to hear stories of producers drowning out vocals, losing session files or vocal tracks, pushing back timelines, or failing to deliver the desired results.

This is not how I operate. I'm committed to ensuring your session files are backed up on a second hard drive, and that all drafts and mixes are continually updated in a dedicated Google Drive folder as we work on the project. My ultimate goal is to deliver a final copy you'll be proud to share with the world.

First, we'll talk and make sure we're both on the same page about your vision. We can communicate via text, email, or video call, whichever suits you best. Ultimately, my goal is to ensure that we achieve the best possible outcome for your project.

With well over a decade of experience, alongside my vast library of samples and instruments, I'm confident that I can help you take your project to the next level. Click "Examples" to check out what I've produced, or fill out the form at the bottom of this page so we can talk about your project!"

Design:
- Dark slate/charcoal background with subtle gradient
- Black and white shadow effects on the text container
- Centered, readable width (max ~800px)
- Generous padding
- Clean typography

"Examples" should link to /portfolio.

Success criteria:
- Section renders with correct copy
- Dark slate aesthetic distinct from pricing section
- Link to portfolio works
- Readable typography with good contrast
- Responsive padding on mobile
```

---

## Prompt 1.8: Services Grid Section

```
Create the "Our Services" grid section for the homepage, below the trust section.

This section returns to the eye candy aesthetic.

Title: "Our Services"

6 service cards in a responsive grid (3x2 on desktop, 2x3 on tablet, 1x6 on mobile):

1. Mix & Master - $200 ea/ $50hr
   - Pricing depends on scope of project
   - Request Google Drive link for uploading wavs
   - Upload audio in wav format with -6db headroom
   - We'll have a convo about your vision for best results

2. Custom Tracks - $100-$400
   - Creating music for an existing recording
   - Music for spoken word, mixtape, podcast, intros
   - Cost depends on the project. Reach out for a quote
   - We'll discuss your vision & upload existing files

3. Instrumentals - $50-$2k
   - See pricing above, and details on the Services page
   - Head to the Beats page to shop for instrumentals
   - Exclusive and Non-Exclusive licensing options
   - Bundle discounts & coupon codes for subscribers

4. Studio Time - $50/hr
   - Record vocals, instrumentals, acoustic sets
   - Access to terabytes of samples and instruments
   - Professionally sound treated studio & plenty of gear
   - Recording equipment & software for video content

5. Female & Male Vox - $100-$200
   - Price difference based on prewritten vs custom
   - For female vox examples, see "Seed" & "Sloth"
   - Female & Male vox textures and samples, beat tags
   - Recordings bounced in wav format, dry or wet

6. DJ For Your Event - $500-$2000/ $150/hr
   - Laptop, PA system, mixer, microphones, lighting
   - MC, help with structure, sound checks all planned
   - If event planning is needed, I partner with a planner
   - Playlists ready to go, uploading site for your picks

Design:
- Eye candy gradient background
- Each card should have visual depth
- Service name and price prominent at top
- 4 bullet points per card - keep them on single lines (no wrapping to 5th line)
- Cards clickable, linking to /services
- Hover effect on cards

Success criteria:
- 6 cards in responsive grid
- Eye candy aesthetic
- All bullet points visible without wrapping issues
- Cards link to services page
- Smooth hover transitions
```

---

## Prompt 1.9: Qualifications & Gear Section

```
Create the Qualifications & Gear section for the homepage.

This section has two columns side-by-side with a glowing divider between them. Uses dark slate aesthetic.

LEFT COLUMN - Qualifications:
- 10+ yrs experience Producing & Mixing in Pro Tools
- 8 yrs exp Mastering in iZotope Ozone
- Piano player since 10 years old
- Co-Owner of Primo Team Productions record label
- 5 yrs exp in music distribution via Distrokid and ASCAP
- Personal music released – 1 full album, 1 EP, 32 singles
- All releases produced, mixed mastered, created/purchased album art, distributed
- Notable client projects:
  - Leon McConnell Twenty Poems - Produce, mix & master 20 track album in 3 months
  - Voodoo Bed - 5 song EP, title song = 30hrs of mixing 14 tracks & pitch correction

RIGHT COLUMN - My Gear:
- 2019 iMac 27" 3GHz 6-Core i5 w/ 1 TB SSD & 64GB RAM
- Pro Tools Studio 2024
- iZotope Ozone 10
- NI Komplete 14
- Maschine MK3 | M Audio 88 | Akai MPK Mini
- Rokit 5 monitors & Rokit 10 sub
- Beyerdynamic DT 770 Pro 80 ohm Mixing Headphones
- Zoom H1N stereo mic for field recordings
- DJI Action 4 (2)
- All projects produced in sound treated studio

DIVIDER:
- Vertical glowing line between columns
- Subtle animation (pulse or gradient shift)
- Minimalistic but colorful accent

Design:
- Dark slate boxes for each column
- Black and white shadow effects
- The glowing divider should be the only color pop
- Clean, readable lists
- On mobile: stack vertically, divider becomes horizontal

Success criteria:
- Two columns render side-by-side on desktop
- Glowing divider visible and animated
- Content matches exactly
- Stacks properly on mobile
- Dark slate aesthetic maintained
```

---

## Prompt 1.10: FAQ Tiles Section

```
Create the "Services FAQ & Details" section for the homepage.

4 tiles in a 2x2 grid (or 1x4 on mobile). Dark slate aesthetic.

Tile 1 - Instrumentals – Quality? Edits? Exclusive?
- Each beat has a full mix with headroom for the best recording experience
- Mp3 – 320Kbps mp3s - Comes as is, no edits by me
- Wav – 24 bit 48 kHz – I will do one edit of the song's structure upon request
- Exclusive – Previous clients can still use their copy, no more sales of that beat

Tile 2 - Producing Custom Content
- This includes but is not limited to producing music/soundscapes for:
- Podcasts, Spoken Word, Commercials, TV Shows & Movies, Games, Crypto/NFT Projects, Websites
- I will send an upload link if you need to send me your original content
- All projects are reviewed, in order to ensure it's a good fit

Tile 3 - Mixing & Mastering – What's the process?
- First we'll have a conversation about your plans with the project
- As work progresses, you'll receive links to draft, mix and master folders
- We'll continually keep in touch to ensure we're still on the right track
- We're done when you're happy with the final product

Tile 4 - Pricing
- All project standard pricing is set at a fixed rate, but subject to hourly price if more work than expected needs to be done
- We use Stripe, PayPal, Venmo, and Crypto (subject to regulations)
- Your order may be subject to tax, depending on where you live
- Once your project is complete, reviews are greatly appreciated!

Design:
- Dark slate/charcoal cards with black and white gradient
- All 4 tiles MUST be the same height (use CSS grid or flexbox with stretch)
- Bullet points should align text after the bullet, not under it
- Title at top of each tile
- Subtle shadow/depth effect
- On mobile: 1 column stack

Success criteria:
- 4 equal-height tiles in 2x2 grid
- Bullet alignment is clean
- Dark slate aesthetic
- Responsive stacking on mobile
- All content matches exactly
```

---

## Prompt 1.11: Contact Form Section

```
Create the contact form section for the homepage, above the footer.

The form should include:
- Section intro text above the form:
  - Small note: "I look forward to hearing from you!"
  - Subtext: "Your info is never sold, just used for contact and promo code purposes"

Form fields:
- First Name (text input, required)
- Last Name (text input, required)
- Email (email input, required)
- Service Interest (checkboxes):
  - Mix & Master
  - Custom Tracks
  - Instrumentals
  - Studio Time
  - Vox
  - DJ
  - Other
- Notes (textarea, reasonably large, positioned at bottom right of form)

Create this as a React component (ContactForm.jsx) since it needs interactivity.

Design:
- Dark background for form container
- Inputs should have dark backgrounds with subtle borders
- Focus states should use accent color
- Submit button with gradient or accent color
- Clean grid layout for fields
- Checkboxes styled to match dark theme

The form doesn't need to submit anywhere yet - just capture the UI and state.

Success criteria:
- Form renders with all fields
- Checkboxes toggle on/off
- Form has proper styling in dark theme
- Submit button present with hover state
- Responsive layout on mobile
- React component properly integrated as island (client:load)
```

---

## Prompt 1.12: Static Pages Scaffold

```
Create placeholder pages for all routes so navigation works:

1. /beats/index.astro - "Beats page coming soon" with back to home link
2. /services.astro - "Services page coming soon"
3. /portfolio.astro - "Portfolio page coming soon"
4. /about.astro - "About page coming soon"
5. /blog/index.astro - "Blog coming soon"
6. /contact.astro - "Contact page coming soon"
7. /login.astro - "Login coming soon"
8. /register.astro - "Register coming soon"

Each page should:
- Use BaseLayout
- Have a proper title for SEO
- Display placeholder text
- Link back to home

This ensures all navigation links work and the site feels complete even before content is built out.

Success criteria:
- All nav links work without 404s
- Each page uses BaseLayout (header/footer appear)
- SEO titles are set
- Pages render without errors
```

---

## Phase 1 Complete Checklist

After running all prompts, verify:

- [ ] npm run dev runs without errors
- [ ] Homepage renders all sections in order:
    1. Hero
    2. Pricing carousel
    3. Trust section
    4. Services grid
    5. Qualifications & Gear
    6. FAQ tiles
    7. Contact form
    8. Footer
- [ ] Sections alternate between eye candy and dark slate
- [ ] Header navigation works on all pages
- [ ] Mobile responsive (test at 375px width)
- [ ] No console errors
- [ ] Animations are smooth

---

## What's Next: Phase 2

Phase 2 will cover:

- GSAP scroll animations
- Three.js hero background
- Wavesurfer.js audio player
- Beats page with mock data
- Services page with full content
- Portfolio page with embeds

Save this file for reference. When Phase 1 is solid, come back for Phase 2 prompts.