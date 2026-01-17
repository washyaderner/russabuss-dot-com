// @ts-check

/**
 * Contentful client helper
 * Uses environment variables for configuration
 */

/**
 * @typedef {Object} ContentfulConfig
 * @property {string} space - Contentful space ID
 * @property {string} accessToken - Contentful access token
 * @property {string} [environment] - Contentful environment (default: 'master')
 */

/**
 * @typedef {Object} ContentfulClient
 * @property {function(string): Promise<Object>} getEntry - Fetch a single entry by ID
 * @property {function(Object): Promise<Object>} getEntries - Fetch entries with query params
 */

/**
 * Creates a Contentful client configuration
 * @returns {ContentfulConfig}
 */
function getConfig() {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  const environment = process.env.CONTENTFUL_ENVIRONMENT || 'master';

  if (!space || !accessToken) {
    throw new Error(
      'Missing required environment variables: CONTENTFUL_SPACE_ID and CONTENTFUL_ACCESS_TOKEN'
    );
  }

  return { space, accessToken, environment };
}

/**
 * Fetches a single entry from Contentful by ID
 * @param {string} entryId - The entry ID to fetch
 * @returns {Promise<Object>} The entry data
 */
async function getEntry(entryId) {
  const { space, accessToken, environment } = getConfig();
  const url = `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries/${entryId}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches entries from Contentful with optional query parameters
 * @param {Object} [query={}] - Query parameters (content_type, limit, skip, etc.)
 * @returns {Promise<Object>} The entries response
 */
async function getEntries(query = {}) {
  const { space, accessToken, environment } = getConfig();
  const params = new URLSearchParams(query);
  const url = `https://cdn.contentful.com/spaces/${space}/environments/${environment}/entries?${params}`;

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    throw new Error(`Contentful API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

module.exports = {
  getConfig,
  getEntry,
  getEntries,
};
