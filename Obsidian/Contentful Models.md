# Contentful Content Models - Russabuss

This document defines the content types to create in Contentful. Set these up when you're ready to move from mock data to real CMS content.

---

## Content Type 1: Beat

**Content Type ID:** `beat` **Display Name:** Beat

|Field Name|Field ID|Type|Required|Notes|
|---|---|---|---|---|
|Title|`title`|Short text|Yes|Beat name (e.g., "Midnight Trap")|
|Slug|`slug`|Short text|Yes|URL-safe identifier, unique|
|Cover Art|`coverArt`|Media (Image)|Yes|Square image, min 500x500|
|Audio Preview|`audioPreview`|Media (Audio)|Yes|MP3 preview file|
|BPM|`bpm`|Integer|Yes|Tempo|
|Key|`key`|Short text|Yes|Musical key (e.g., "F minor")|
|Tags|`tags`|Short text, List|No|Genre/mood tags|
|Price - MP3|`priceMp3`|Integer|Yes|Default: 50|
|Price - WAV|`priceWav`|Integer|Yes|Default: 80|
|Price - Stems|`priceStems`|Integer|Yes|Default: 249|
|Price - Exclusive|`priceExclusive`|Integer|Yes|Default: 2000|
|Google Drive Link|`driveLink`|Short text|Yes|Pre-made shareable folder URL|
|Available|`available`|Boolean|Yes|Default: true (false = sold exclusive)|
|Featured|`featured`|Boolean|No|Show on homepage|
|Sort Order|`sortOrder`|Integer|No|For manual ordering|

**Validation:**

- `slug`: Unique, URL-safe pattern `^[a-z0-9-]+$`
- `bpm`: Range 60-200
- All prices: Minimum 0

---

## Content Type 2: Sample Pack

**Content Type ID:** `samplePack` **Display Name:** Sample Pack

|Field Name|Field ID|Type|Required|Notes|
|---|---|---|---|---|
|Title|`title`|Short text|Yes|Pack name|
|Slug|`slug`|Short text|Yes|URL-safe identifier, unique|
|Cover Art|`coverArt`|Media (Image)|Yes|Square image|
|Description|`description`|Rich text|Yes|Full description with formatting|
|Price|`price`|Integer|Yes|Single price point|
|Contents|`contents`|Short text|Yes|e.g., "50 drums, 25 melodies, 10 FX"|
|Audio Previews|`audioPreviews`|Media (Audio), List|No|Multiple preview clips|
|Tags|`tags`|Short text, List|No|Genre/type tags|
|Google Drive Link|`driveLink`|Short text|Yes|Download folder URL|
|Featured|`featured`|Boolean|No|Show on homepage|
|Sort Order|`sortOrder`|Integer|No|For manual ordering|

---

## Content Type 3: Blog Post

**Content Type ID:** `blogPost` **Display Name:** Blog Post

|Field Name|Field ID|Type|Required|Notes|
|---|---|---|---|---|
|Title|`title`|Short text|Yes|Post title|
|Slug|`slug`|Short text|Yes|URL-safe identifier, unique|
|Excerpt|`excerpt`|Long text|Yes|1-2 sentence summary for listings|
|Content|`content`|Rich text|Yes|Full post body|
|Cover Image|`coverImage`|Media (Image)|Yes|Featured image|
|Publish Date|`publishDate`|Date & time|Yes|For sorting and display|
|Author|`author`|Short text|No|Default: "Russ A Buss"|
|Tags|`tags`|Short text, List|No|Categories/topics|
|SEO Title|`seoTitle`|Short text|No|Override for meta title|
|SEO Description|`seoDescription`|Long text|No|Override for meta description|

---

## Content Type 4: Portfolio Project

**Content Type ID:** `portfolioProject` **Display Name:** Portfolio Project

|Field Name|Field ID|Type|Required|Notes|
|---|---|---|---|---|
|Title|`title`|Short text|Yes|Project name|
|Slug|`slug`|Short text|Yes|URL-safe identifier|
|Client|`client`|Short text|No|Client/artist name|
|Description|`description`|Rich text|Yes|Project story/case study|
|Cover Image|`coverImage`|Media (Image)|Yes|Hero image|
|Spotify Embed|`spotifyEmbed`|Short text|No|Spotify embed URL/ID|
|YouTube Embed|`youtubeEmbed`|Short text|No|YouTube video ID|
|SoundCloud Embed|`soundcloudEmbed`|Short text|No|SoundCloud embed URL|
|Tags|`tags`|Short text, List|No|Project type tags|
|Featured|`featured`|Boolean|No|Show prominently|
|Sort Order|`sortOrder`|Integer|No|Display order|

---

## Content Type 5: Review/Testimonial

**Content Type ID:** `review` **Display Name:** Review

|Field Name|Field ID|Type|Required|Notes|
|---|---|---|---|---|
|Quote|`quote`|Long text|Yes|The testimonial text|
|Author Name|`authorName`|Short text|Yes|Who said it|
|Author Title|`authorTitle`|Short text|No|Role/company|
|Project Reference|`projectReference`|Reference (Portfolio Project)|No|Link to related project|
|Featured|`featured`|Boolean|No|Show on homepage/contact|
|Sort Order|`sortOrder`|Integer|No|Display order|

---

## Setup Instructions

### Step 1: Create Content Types

1. Log into Contentful → Your Space
2. Go to Content Model
3. Click "Add content type"
4. Enter the Content Type ID and Display Name
5. Add each field using the table above
6. Set validations as noted
7. Save

### Step 2: Configure Media Settings

1. Go to Settings → Media
2. Ensure you have adequate storage for audio files
3. Consider: Audio previews should be compressed MP3s (< 5MB each)

### Step 3: Create API Keys

1. Go to Settings → API keys
2. Create a new API key or use existing
3. Copy:
    - Space ID
    - Content Delivery API access token
    - Content Preview API access token (optional, for drafts)
4. Add to your `.env` file

### Step 4: Populate Initial Content

Start with:

- 3-5 beats (you can add more anytime)
- 1-2 sample packs
- 1-2 portfolio projects (Voodoo Bed, Twenty Poems are great)
- 1-2 reviews

---

## Querying Content (Reference)

These queries are already set up in `/src/lib/contentful.js` from the init prompt. Here's how they work:

```javascript
// Get all available beats
const beats = await client.getEntries({
  content_type: 'beat',
  'fields.available': true,
  order: ['-fields.sortOrder', '-sys.createdAt'],
});

// Get featured beats for homepage
const featuredBeats = await client.getEntries({
  content_type: 'beat',
  'fields.featured': true,
  'fields.available': true,
  limit: 4,
});

// Get single beat by slug
const beat = await client.getEntries({
  content_type: 'beat',
  'fields.slug': 'midnight-trap',
  limit: 1,
});

// Get all blog posts, newest first
const posts = await client.getEntries({
  content_type: 'blogPost',
  order: ['-fields.publishDate'],
});

// Get featured reviews
const reviews = await client.getEntries({
  content_type: 'review',
  'fields.featured': true,
  order: ['fields.sortOrder'],
});
```

---

## Content Entry Tips

### Beat Audio Previews

- Keep previews under 2 minutes
- Compress to 128-192kbps MP3
- Ensure they loop or fade nicely if possible

### Cover Art

- Use square images (1:1 ratio)
- Minimum 500x500, recommended 1000x1000
- Optimize file size (< 500KB ideal)

### Rich Text Fields

- Contentful's rich text can include:
    - Bold, italic, underline
    - Headers (H2-H6)
    - Bullet/numbered lists
    - Links
    - Embedded assets
- Keep formatting consistent

### Tags

- Use lowercase
- Separate concepts: "trap", "dark", "808" not "dark trap with 808"
- Reuse tags across content for filtering

---

## Migration from Mock Data

When ready to switch from mock data to Contentful:

1. Populate content in Contentful
2. Update imports in pages:

```javascript
// Before (mock data)
import { mockBeats } from '../data/mock-beats.js';
const beats = mockBeats;

// After (Contentful)
import { getBeats } from '../lib/contentful.js';
const beats = await getBeats();
```

3. Test all pages
4. Remove mock data file when confirmed working