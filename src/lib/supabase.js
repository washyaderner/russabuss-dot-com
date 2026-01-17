// @ts-check

/**
 * Supabase client helper
 * Uses environment variables for configuration
 */

/**
 * @typedef {Object} SupabaseConfig
 * @property {string} url - Supabase project URL
 * @property {string} anonKey - Supabase anonymous/public key
 */

/**
 * Creates a Supabase client configuration
 * @returns {SupabaseConfig}
 */
function getConfig() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error(
      'Missing required environment variables: SUPABASE_URL and SUPABASE_ANON_KEY'
    );
  }

  return { url, anonKey };
}

/**
 * Makes a request to the Supabase REST API
 * @param {string} table - Table name
 * @param {Object} [options={}] - Request options
 * @param {string} [options.method='GET'] - HTTP method
 * @param {Object} [options.query] - Query parameters for filtering
 * @param {Object} [options.body] - Request body for POST/PATCH
 * @returns {Promise<Object>} The response data
 */
async function query(table, options = {}) {
  const { url, anonKey } = getConfig();
  const { method = 'GET', query: queryParams, body } = options;

  const params = new URLSearchParams(queryParams);
  const endpoint = `${url}/rest/v1/${table}${params.toString() ? `?${params}` : ''}`;

  const response = await fetch(endpoint, {
    method,
    headers: {
      apikey: anonKey,
      Authorization: `Bearer ${anonKey}`,
      'Content-Type': 'application/json',
      Prefer: method === 'POST' ? 'return=representation' : undefined,
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  if (!response.ok) {
    throw new Error(`Supabase API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetches rows from a Supabase table
 * @param {string} table - Table name
 * @param {Object} [queryParams={}] - Query parameters for filtering
 * @returns {Promise<Array>} Array of rows
 */
async function select(table, queryParams = {}) {
  return query(table, { method: 'GET', query: queryParams });
}

/**
 * Inserts a row into a Supabase table
 * @param {string} table - Table name
 * @param {Object} data - Row data to insert
 * @returns {Promise<Object>} The inserted row
 */
async function insert(table, data) {
  return query(table, { method: 'POST', body: data });
}

module.exports = {
  getConfig,
  query,
  select,
  insert,
};
