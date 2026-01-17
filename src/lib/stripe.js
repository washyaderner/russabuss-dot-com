// @ts-check

/**
 * Stripe client helper (stub)
 * Uses environment variables for configuration
 * Note: This is a stub for development. Real API calls are not implemented.
 */

/**
 * @typedef {Object} StripeConfig
 * @property {string} secretKey - Stripe secret key
 * @property {string} publishableKey - Stripe publishable key
 * @property {string} webhookSecret - Stripe webhook signing secret
 */

/**
 * @typedef {Object} LineItem
 * @property {string} name - Product name
 * @property {string} [description] - Product description
 * @property {number} amount - Amount in cents
 * @property {string} [currency] - Currency code (default: 'usd')
 * @property {number} [quantity] - Quantity (default: 1)
 */

/**
 * @typedef {Object} CheckoutSessionOptions
 * @property {LineItem[]} lineItems - Items to purchase
 * @property {string} successUrl - URL to redirect on success
 * @property {string} cancelUrl - URL to redirect on cancel
 * @property {string} [customerEmail] - Pre-fill customer email
 * @property {Object} [metadata] - Additional metadata
 */

/**
 * @typedef {Object} CheckoutSession
 * @property {string} id - Session ID
 * @property {string} url - Checkout URL to redirect user to
 * @property {string} status - Session status
 */

/**
 * Creates a Stripe client configuration
 * @returns {StripeConfig}
 * @throws {Error} If required environment variables are missing
 */
function getConfig() {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  const publishableKey = process.env.PUBLIC_STRIPE_PUBLISHABLE_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!secretKey) {
    throw new Error('Missing required environment variable: STRIPE_SECRET_KEY');
  }

  if (!publishableKey) {
    throw new Error('Missing required environment variable: PUBLIC_STRIPE_PUBLISHABLE_KEY');
  }

  if (!webhookSecret) {
    throw new Error('Missing required environment variable: STRIPE_WEBHOOK_SECRET');
  }

  return { secretKey, publishableKey, webhookSecret };
}

/**
 * Creates a Stripe Checkout session (stub)
 * @param {CheckoutSessionOptions} options - Checkout session options
 * @returns {Promise<CheckoutSession>} The created checkout session
 * @throws {Error} If configuration is invalid or API call fails
 */
async function createCheckoutSession(options) {
  // Validate configuration (will throw if env vars missing)
  getConfig();

  // Validate required options
  if (!options.lineItems || options.lineItems.length === 0) {
    throw new Error('At least one line item is required');
  }

  if (!options.successUrl || !options.cancelUrl) {
    throw new Error('successUrl and cancelUrl are required');
  }

  // Stub response - in production, this would call the Stripe API
  // Using a placeholder session ID format
  const stubSessionId = `cs_test_stub_${Date.now()}`;

  return {
    id: stubSessionId,
    url: `https://checkout.stripe.com/c/pay/${stubSessionId}`,
    status: 'open',
  };
}

/**
 * Verifies a Stripe webhook signature (stub)
 * @param {string} payload - Raw request body
 * @param {string} signature - Stripe signature header
 * @returns {Object} The verified event object
 * @throws {Error} If signature verification fails
 */
function verifyWebhookSignature(payload, signature) {
  const { webhookSecret } = getConfig();

  if (!signature) {
    throw new Error('Missing Stripe signature header');
  }

  // Stub verification - in production, use Stripe SDK
  // For now, just parse the payload
  try {
    return JSON.parse(payload);
  } catch (error) {
    throw new Error('Invalid webhook payload');
  }
}

module.exports = {
  getConfig,
  createCheckoutSession,
  verifyWebhookSignature,
};
