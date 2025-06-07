 /**
 * Utility module for fetching news from the backend proxy API.
 * This now fetches from /api/news on the Node/Express backend, which securely
 * stores the News API key and handles CORS/network issues.
 */

// PUBLIC_INTERFACE
export async function fetchLatestNews({ query = "", pageSize = 5, category = "", country = "in" } = {}) {
  /**
   * Fetches latest news headlines from backend proxy.
   * Sends parameters as querystring.
   * @param {Object} opts
   *   - query: Search query for news (optional)
   *   - pageSize: Number of articles to retrieve (default 5)
   *   - category: News category (optional)
   *   - country: Country code (default 'in')
   * @returns Array of news articles or throws error
   */

  // Construct API endpoint for proxy
  let params = `?country=${encodeURIComponent(country)}&pageSize=${pageSize}`;
  if (query) params += `&q=${encodeURIComponent(query)}`;
  if (category) params += `&category=${encodeURIComponent(category)}`;

  // Use relative path for local/proxy support
  const endpoint = "/api/news" + params;
  let response;
  try {
    response = await fetch(endpoint);
  } catch (err) {
    throw new Error("Failed to fetch news from proxy backend: " + err.message);
  }

  if (!response.ok) {
    let json;
    try {
      json = await response.json();
    } catch (_) {
      json = {};
    }
    throw new Error(
      `Failed to fetch news: [${response.status}] ${response.statusText}` +
      (json.error ? ` (${json.error})` : "")
    );
  }
  const data = await response.json();
  if (!data.articles) {
    throw new Error("Invalid news data from API");
  }
  return data.articles;
}

