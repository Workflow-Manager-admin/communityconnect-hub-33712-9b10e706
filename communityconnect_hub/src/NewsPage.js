import React, { useEffect, useState } from "react";
import { fetchLatestNews } from "./newsApi";

// PUBLIC_INTERFACE
function NewsPage() {
  /**
   * NewsPage fetches and displays latest news headlines from News API.
   * If API fails or is unavailable, falls back to sample news for layout.
   */
  const [articles, setArticles] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    async function getNews() {
      setLoading(true);
      setError("");
      try {
        const news = await fetchLatestNews({ pageSize: 5 });
        if (mounted && news && news.length > 0) {
          setArticles(news);
        } else if (mounted) {
          setError("No news articles available at this time.");
        }
      } catch (err) {
        setError(
          "Live news could not be loaded. Showing sample headlines instead."
        );
        setArticles([]); // fallback to demo
      }
      setLoading(false);
    }
    getNews();
    return () => { mounted = false; };
  }, []);

  // Fallback: sample/demo news
  const sampleArticles = [
    {
      title: "Community Festival Returns This September",
      description: "Join us for food, music, and fun! See the full schedule on our events page.",
      url: "#",
      publishedAt: "2024-06-08"
    },
    {
      title: "Local School Wins Science Grant",
      description: "City High School awarded for their clean energy innovation challenge.",
      url: "#",
      publishedAt: "2024-06-07"
    }
  ];

  const articlesToShow =
    !loading && (!articles || articles.length === 0)
      ? sampleArticles
      : articles;

  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Latest News</h2>
      {loading ? (
        <div
          style={{
            color: "var(--secondary)",
            background: "#191d21",
            padding: "18px 16px",
            borderRadius: "11px",
            fontSize: "1.13em",
            border: "1.5px solid var(--border-color)",
            boxShadow: "0 1px 12px #0002",
            marginTop: 10,
            marginBottom: 12
          }}
        >
          Loading news...
        </div>
      ) : (
        <>
          {error && (
            <div
              style={{
                color: "var(--accent)",
                background: "#29292d",
                padding: "16px 16px",
                borderRadius: "8px",
                fontSize: "1.01em",
                border: "1px solid var(--border-color)",
                margin: "10px 0 10px 0"
              }}
              role="alert"
            >
              {error}
            </div>
          )}
          {articlesToShow && articlesToShow.length > 0 ? (
            <ul style={{ paddingLeft: 0, margin: 0, listStyle: "none" }}>
              {articlesToShow.map((item, idx) => (
                <li
                  key={idx}
                  style={{
                    marginBottom: 13,
                    background: "#191d21",
                    borderRadius: 9,
                    border: "1.5px solid var(--border-color)",
                    boxShadow: "0 1px 7px 0 #0001",
                    padding: "11px 14px"
                  }}
                  tabIndex={0}
                  aria-label={`${item.title} (${item.publishedAt ? item.publishedAt : ""})`}
                >
                  <div
                    style={{
                      color: "var(--accent)",
                      fontWeight: 600,
                      fontSize: "1.14em",
                      marginBottom: 3
                    }}
                  >
                    {item.url && item.url !== "#" ? (
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "var(--accent)", textDecoration: "underline" }}
                      >
                        {item.title}
                      </a>
                    ) : (
                      item.title
                    )}
                  </div>
                  {item.description && (
                    <div style={{ fontSize: ".97em", color: "var(--text-secondary)", marginBottom: 2 }}>
                      {item.description}
                    </div>
                  )}
                  <div style={{ fontSize: 11, color: "#A0A0A0" }}>
                    {item.publishedAt || item.publishedAt || ""}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div style={{ color: "var(--accent)" }}>No news available.</div>
          )}
        </>
      )}
    </section>
  );
}

export default NewsPage;
