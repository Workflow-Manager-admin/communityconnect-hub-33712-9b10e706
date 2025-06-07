/**
 * Utility module for fetching news from the News API using the provided API key.
 * The API key is accessed securely via environment variable REACT_APP_NEWS_API_KEY.
 * NEVER commit your real API key directly in the frontend code.
 */

// PUBLIC_INTERFACE
export async function fetchLatestNews({ query = "", pageSize = 5 } = {}) {
  /**
   * Fetches latest news headlines from News API.
   * @param {Object} opts
   *   - query: Search query for news (optional)
   *   - pageSize: Number of articles to retrieve (default 5)
   * @returns Array of news articles or throws error
   */
  const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
  if (!API_KEY) {
    throw new Error("Missing News API key (REACT_APP_NEWS_API_KEY not set)");
  }
  // Using NewsAPI.org as an example (update endpoint if using another)
  const endpoint = `https://newsapi.org/v2/top-headlines?country=in${query ? `&q=${encodeURIComponent(query)}` : ""}&pageSize=${pageSize}&apiKey=${API_KEY}`;
  const response = await fetch(endpoint);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch news: [${response.status}] ${response.statusText}`
    );
  }
  const data = await response.json();
  if (!data.articles) {
    throw new Error("Invalid news data from API");
  }
  return data.articles;
}
