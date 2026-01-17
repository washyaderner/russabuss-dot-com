// @ts-check

/**
 * Resend email client helper (stub)
 * Uses environment variables for configuration
 * Note: This is a stub for development. Real API calls are not implemented.
 */

/**
 * @typedef {Object} ResendConfig
 * @property {string} apiKey - Resend API key
 * @property {string} fromEmail - Default sender email address
 */

/**
 * @typedef {Object} EmailAttachment
 * @property {string} filename - Attachment filename
 * @property {string} content - Base64 encoded content or URL
 * @property {string} [contentType] - MIME type
 */

/**
 * @typedef {Object} EmailOptions
 * @property {string} to - Recipient email address
 * @property {string} subject - Email subject line
 * @property {string} [html] - HTML email body
 * @property {string} [text] - Plain text email body
 * @property {string} [from] - Sender email (overrides default)
 * @property {string} [replyTo] - Reply-to address
 * @property {EmailAttachment[]} [attachments] - File attachments
 * @property {Object} [headers] - Custom email headers
 */

/**
 * @typedef {Object} EmailResponse
 * @property {string} id - Email ID
 * @property {string} from - Sender address
 * @property {string} to - Recipient address
 * @property {string} status - Delivery status
 */

/**
 * Creates a Resend client configuration
 * @returns {ResendConfig}
 * @throws {Error} If required environment variables are missing
 */
function getConfig() {
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'audio@russabuss.com';

  if (!apiKey) {
    throw new Error('Missing required environment variable: RESEND_API_KEY');
  }

  return { apiKey, fromEmail };
}

/**
 * Sends an email via Resend (stub)
 * @param {EmailOptions} options - Email options
 * @returns {Promise<EmailResponse>} The send result
 * @throws {Error} If configuration is invalid or send fails
 */
async function sendEmail(options) {
  const { fromEmail } = getConfig();

  // Validate required options
  if (!options.to) {
    throw new Error('Recipient email (to) is required');
  }

  if (!options.subject) {
    throw new Error('Email subject is required');
  }

  if (!options.html && !options.text) {
    throw new Error('Either html or text content is required');
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(options.to)) {
    throw new Error('Invalid recipient email format');
  }

  // Stub response - in production, this would call the Resend API
  const stubEmailId = `email_stub_${Date.now()}`;

  return {
    id: stubEmailId,
    from: options.from || fromEmail,
    to: options.to,
    status: 'queued',
  };
}

/**
 * Sends a purchase confirmation email (stub)
 * @param {string} to - Recipient email
 * @param {Object} purchase - Purchase details
 * @param {string} purchase.productName - Name of purchased product
 * @param {string} purchase.licenseType - Type of license purchased
 * @param {number} purchase.amount - Purchase amount in cents
 * @param {string} purchase.downloadUrl - URL to download purchased files
 * @returns {Promise<EmailResponse>}
 */
async function sendPurchaseConfirmation(to, purchase) {
  const { productName, licenseType, amount, downloadUrl } = purchase;

  const html = `
    <h1>Thank you for your purchase!</h1>
    <p>You have purchased <strong>${productName}</strong> (${licenseType} license).</p>
    <p>Amount: $${(amount / 100).toFixed(2)}</p>
    <p><a href="${downloadUrl}">Download your files</a></p>
    <p>If you have any questions, reply to this email.</p>
    <p>- Russ A Buss</p>
  `;

  return sendEmail({
    to,
    subject: `Your purchase: ${productName}`,
    html,
    replyTo: 'audio@russabuss.com',
  });
}

/**
 * Sends a contact form notification (stub)
 * @param {Object} formData - Contact form data
 * @param {string} formData.firstName - Sender first name
 * @param {string} formData.lastName - Sender last name
 * @param {string} formData.email - Sender email
 * @param {string[]} formData.services - Selected services
 * @param {string} formData.notes - Additional notes
 * @returns {Promise<EmailResponse>}
 */
async function sendContactNotification(formData) {
  const { firstName, lastName, email, services, notes } = formData;

  const html = `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
    <p><strong>Email:</strong> ${email}</p>
    <p><strong>Services:</strong> ${services.join(', ')}</p>
    <p><strong>Notes:</strong></p>
    <p>${notes}</p>
  `;

  return sendEmail({
    to: 'audio@russabuss.com',
    subject: `Contact form: ${firstName} ${lastName}`,
    html,
    replyTo: email,
  });
}

module.exports = {
  getConfig,
  sendEmail,
  sendPurchaseConfirmation,
  sendContactNotification,
};
