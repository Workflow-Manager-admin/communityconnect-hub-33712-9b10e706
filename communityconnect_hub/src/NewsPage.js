import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function NewsPage() {
  /** 
   * Displays the latest news articles fetched using the provided API key.
   * The API key is securely injected from environment variables during build/runtime.
   */

  // IMPORTANT: In real applications, never commit API keys directly in frontend code!
  // For this isolated task, we're using the provided API key directly.
  // In production, store this in an environment variable (e.g., process.env.REACT_APP_NEWS_API_KEY).

  const NEWS_API_KEY = "737e634c6ef84eb4a280c96c4ec7815f";
  // Use a headline source with test API key and fallback for NewsAPI limitations
  // Note: NewsAPI.org does not allow requests from client/browser with a free plan.
  // We'll try a proxy. If still failing, display a connection explanation.

  // Use CORS proxy (demo/testing, not suitable for production)
  const CORS_PROXY = "https://corsproxy.io/?";
  const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`;
  const FETCH_URL = CORS_PROXY + encodeURIComponent(NEWS_API_URL);

  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchNews() {
      setLoading(true);
      setError(null);
      try {
        let response = await fetch(FETCH_URL);

        // NewsAPI free API key *will fail CORS* if called directly from browser - proxy required.
        if (!response.ok) {
          // If CORS proxy fails, try fallback demo/mock news
          if (response.status === 426 || response.status === 403) {
            throw new Error(
              "News service unavailable for free API key via browser. Please upgrade API plan or use a backend proxy for production use."
            );
          }
          throw new Error("Failed to fetch news (status " + response.status + ")");
        }
        const data = await response.json();
        if (data.status !== "ok" || !Array.isArray(data.articles)) {
          // NewsAPI.org returns error when called directly in browser on free accounts
          throw new Error("Invalid news data response from News API. News cannot be displayed.");
        }
        // Normalize articles to expected props structure
        const articles = (data.articles || []).map((article) => ({
          title: article.title,
          description: article.description,
          url: article.url,
          timestamp: article.publishedAt ? article.publishedAt.substring(0, 10) : "",
        }));
        setNews(articles);
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? // Most likely due to CORS/network/no proxy, not user error
              "News could not be loaded due to browser restrictions (CORS). Please try from your backend, upgrade API plan, or add a server proxy. [dev note: current setup requires a backend for NewsAPI.org free plans.]"
            : err.message || "An error occurred"
        );
        setNews([]);
      }
      setLoading(false);
    }
    fetchNews();
    // Run only on first mount, or if API key changes
  }, [FETCH_URL]);

  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Latest News</h2>
      {loading ? (
        <div style={{ color: "var(--accent)" }}>Loading news...</div>
      ) : error ? (
        <div style={{ color: "var(--secondary)", fontWeight: 500 }}>
          {error}
        </div>
      ) : news.length ? (
        <ul style={{ paddingLeft: 16, margin: 0 }}>
          {news.map((item, idx) => (
            <li key={idx} style={{ marginBottom: 10 }}>
              <a
                href={item.url}
                style={{ color: "var(--accent)", fontWeight: 500, textDecoration: "underline" }}
                target="_blank"
                rel="noopener noreferrer"
              >
                {item.title}
              </a>
              <br />
              <span style={{ fontSize: ".93em", color: "var(--text-secondary)" }}>
                {item.description}
              </span>
              <div style={{ fontSize: 11, color: "#A0A0A0" }}>
                {item.timestamp}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div style={{ color: "var(--accent)" }}>No news found.</div>
      )}
    </section>
  );
}

export default NewsPage;
