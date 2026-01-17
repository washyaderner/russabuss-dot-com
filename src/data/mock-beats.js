// @ts-check

/**
 * Mock beats data for development
 * Structure matches Contentful Beat content type
 */

/**
 * @typedef {Object} BeatPrices
 * @property {number} mp3 - MP3 license price
 * @property {number} wav - WAV license price
 * @property {number} stems - Stems/trackouts license price
 * @property {number} exclusive - Exclusive rights price
 */

/**
 * @typedef {Object} Beat
 * @property {string} id - Unique identifier
 * @property {string} slug - URL-friendly slug
 * @property {string} title - Display title
 * @property {number} bpm - Beats per minute
 * @property {string} key - Musical key
 * @property {string[]} tags - Genre and style tags
 * @property {string} audioPreview - Path to preview audio file
 * @property {string} coverArt - Path to cover art image
 * @property {BeatPrices} prices - License pricing
 * @property {boolean} available - Whether beat is available for purchase
 */

/**
 * Mock beats for development and testing
 * @type {Beat[]}
 */
const mockBeats = [
  {
    id: 'demo-beat-1',
    slug: 'midnight-trap',
    title: 'Midnight Trap',
    bpm: 140,
    key: 'F minor',
    tags: ['trap', 'dark', '808'],
    audioPreview: '/audio/demo-preview-1.mp3',
    coverArt: '/images/demo-cover-1.jpg',
    prices: {
      mp3: 50,
      wav: 80,
      stems: 249,
      exclusive: 2000,
    },
    available: true,
  },
  {
    id: 'demo-beat-2',
    slug: 'neon-dreams',
    title: 'Neon Dreams',
    bpm: 128,
    key: 'G minor',
    tags: ['synthwave', 'electronic', 'cinematic'],
    audioPreview: '/audio/demo-preview-2.mp3',
    coverArt: '/images/demo-cover-2.jpg',
    prices: {
      mp3: 50,
      wav: 80,
      stems: 249,
      exclusive: 2500,
    },
    available: true,
  },
  {
    id: 'demo-beat-3',
    slug: 'soul-bounce',
    title: 'Soul Bounce',
    bpm: 95,
    key: 'C major',
    tags: ['soul', 'rnb', 'groove'],
    audioPreview: '/audio/demo-preview-3.mp3',
    coverArt: '/images/demo-cover-3.jpg',
    prices: {
      mp3: 60,
      wav: 100,
      stems: 299,
      exclusive: 3000,
    },
    available: true,
  },
  {
    id: 'demo-beat-4',
    slug: 'dark-matter',
    title: 'Dark Matter',
    bpm: 150,
    key: 'D minor',
    tags: ['drill', 'hard', '808'],
    audioPreview: '/audio/demo-preview-4.mp3',
    coverArt: '/images/demo-cover-4.jpg',
    prices: {
      mp3: 50,
      wav: 80,
      stems: 249,
      exclusive: 2000,
    },
    available: true,
  },
  {
    id: 'demo-beat-5',
    slug: 'cloud-nine',
    title: 'Cloud Nine',
    bpm: 110,
    key: 'A minor',
    tags: ['lofi', 'chill', 'ambient'],
    audioPreview: '/audio/demo-preview-5.mp3',
    coverArt: '/images/demo-cover-5.jpg',
    prices: {
      mp3: 40,
      wav: 70,
      stems: 199,
      exclusive: 1500,
    },
    available: false,
  },
];

/**
 * Get all mock beats
 * @returns {Beat[]}
 */
function getAllBeats() {
  return mockBeats;
}

/**
 * Get available beats only
 * @returns {Beat[]}
 */
function getAvailableBeats() {
  return mockBeats.filter((beat) => beat.available);
}

/**
 * Get a beat by slug
 * @param {string} slug - The beat slug
 * @returns {Beat | undefined}
 */
function getBeatBySlug(slug) {
  return mockBeats.find((beat) => beat.slug === slug);
}

/**
 * Get beats by tag
 * @param {string} tag - Tag to filter by
 * @returns {Beat[]}
 */
function getBeatsByTag(tag) {
  return mockBeats.filter((beat) => beat.tags.includes(tag));
}

module.exports = {
  mockBeats,
  getAllBeats,
  getAvailableBeats,
  getBeatBySlug,
  getBeatsByTag,
};
