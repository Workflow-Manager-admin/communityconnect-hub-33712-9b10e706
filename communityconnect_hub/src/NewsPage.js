import React, { useEffect, useState } from "react";
import { fetchLatestNews } from "./newsApi";

// PUBLIC_INTERFACE
/**
 * Enhanced NewsPage for CommunityConnect Hub
 * - Fetches and displays richer news metadata (headline, summary, image, source, published date, link)
 * - Card-based, modern, visually appealing and accessible UI
 * - Supports sorting (recency) and category filtering (if API supports, else gracefully disables)
 * - Handles loading and error states, with dark-theme and responsive design
 */
function NewsPage() {
  // News articles from API
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  // UI/UX state
  const [sortBy, setSortBy] = useState("publishedAt"); // ["publishedAt", "relevance"]
  const [category, setCategory] = useState(""); // if categories available via API
  const [filterOptions, setFilterOptions] = useState([
    // Restricted to fetchLatestNews support; hardcode common ones if needed
    { label: "All", value: "" },
    { label: "Technology", value: "technology" },
    { label: "Business", value: "business" },
    { label: "Entertainment", value: "entertainment" },
    { label: "Health", value: "health" },
    { label: "Science", value: "science" },
    { label: "Sports", value: "sports" },
    { label: "World", value: "general" },
  ]);
  // For fallback/demo display
  const sampleArticles = [
    {
      title: "Community Festival Returns This September",
      description:
        "Join us for food, music, and fun! See the full schedule on our events page.",
      url: "#",
      publishedAt: "2024-06-08T16:00:00Z",
      urlToImage:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=540&q=80",
      source: { name: "Community Times" },
    },
    {
      title: "Local School Wins Science Grant",
      description:
        "City High School awarded for their clean energy innovation challenge.",
      url: "#",
      publishedAt: "2024-06-07T11:22:00Z",
      urlToImage:
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=540&q=80",
      source: { name: "City Journal" },
    },
    {
      title: "New Playgrounds Open in Downtown Park",
      description:
        "Modern play areas and safety features for all ages have been unveiled.",
      url: "#",
      publishedAt: "2024-06-07T09:32:00Z",
      urlToImage:
        "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=540&q=80",
      source: { name: "Park Weekly" },
    }
  ];

  // ========== DATA FETCH LOGIC ==========
  useEffect(() => {
    let mounted = true;
    async function getNews() {
      setLoading(true);
      setError("");
      try {
        const params = { pageSize: 7 };
        // Handle category query via fetchLatestNews if supported
        if (category) params.query = category;
        const news = await fetchLatestNews(params);
        if (mounted && news && news.length > 0) {
          setArticles(news);
        } else if (mounted) {
          setError("No news articles available at this time.");
        }
      } catch (err) {
        setError("Live news could not be loaded. Showing sample headlines instead.");
        setArticles([]); // fallback to sample
      }
      setLoading(false);
    }
    getNews();
    return () => { mounted = false; };
    // eslint-disable-next-line
  }, [category]);

  // Fallback if real news missing/error
  const articlesToShow =
    !loading && (!articles || articles.length === 0)
      ? sampleArticles
      : articles;

  function handleSortChange(e) {
    setSortBy(e.target.value);
  }

  function handleCategoryChange(e) {
    setCategory(e.target.value);
  }

  // Sorting: Most recent ("publishedAt" ISO string) desc
  const sortedArticles = [...articlesToShow].sort((a, b) => {
    if (sortBy === "publishedAt") {
      // Newest first
      return new Date(b.publishedAt) - new Date(a.publishedAt);
    }
    // Default/fallback
    return 0;
  });

  // Date formatting helper (PUBLIC_INTERFACE)
  // PUBLIC_INTERFACE
  function formatNewsDate(isoStr) {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    if (isNaN(d)) return "";
    return d.toLocaleString("en-IN", {
      day: "numeric",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  return (
    <section className="news-section" aria-label="Community News">
      <div style={{
        display: "flex",
        flexWrap: "wrap",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginBottom: 12,
        gap: 10
      }}>
        <h2 style={{
          color: "var(--accent)",
          margin: 0,
          padding: 0,
          flex: "1 1 0px",
          fontSize: "2rem",
        }}>Latest News</h2>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {/* Category filter */}
          <label htmlFor="news-category" style={{
            fontWeight: 500,
            color: "var(--text-secondary)",
            fontSize: 14
          }}>
            Category:&nbsp;
            <select
              id="news-category"
              name="category"
              style={{
                background: "#181818",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                outline: "none",
                borderRadius: 6,
                padding: "4.5px 12px",
                fontSize: "1rem",
              }}
              disabled={loading}
              aria-label="Filter by News Category"
              value={category}
              onChange={handleCategoryChange}
            >
              {filterOptions.map((f) => (
                <option key={f.value} value={f.value}>{f.label}</option>
              ))}
            </select>
          </label>
          {/* Sort by */}
          <label htmlFor="news-sort" style={{
            fontWeight: 500,
            color: "var(--text-secondary)",
            fontSize: 14
          }}>
            Sort:&nbsp;
            <select
              id="news-sort"
              name="sortBy"
              style={{
                background: "#181818",
                color: "var(--accent)",
                border: "1.1px solid var(--secondary)",
                outline: "none",
                borderRadius: 6,
                padding: "4.5px 12px",
                fontSize: "1rem",
              }}
              disabled={loading}
              aria-label="Sort News Articles"
              value={sortBy}
              onChange={handleSortChange}
            >
              <option value="publishedAt">Most Recent</option>
            </select>
          </label>
        </div>
      </div>
      {/* Loading State */}
      {loading ? (
        <div
          style={{
            color: "var(--secondary)",
            background: "#191d21",
            padding: "22px 20px",
            borderRadius: "11px",
            fontSize: "1.13em",
            border: "1.5px solid var(--border-color)",
            boxShadow: "0 1px 12px #0002",
            marginTop: 10,
            marginBottom: 16,
            minHeight: 85,
            display: "flex",
            alignItems: "center"
          }}
        >
          <span className="news-loading" aria-live="polite">
            <span className="news-spinner" style={{
              display: "inline-block",
              width: 22, height: 22,
              marginRight: 12,
              border: "2.8px solid var(--secondary)",
              borderTop: "2.8px solid #2220",
              borderRadius: "50%",
              animation: "newsSpin 0.8s linear infinite"
            }} /> Loading news...
          </span>
        </div>
      ) : (
        <>
          {/* Show error if any */}
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
              {/* Developer warning if API key is missing in dev environment */}
              {process.env.NODE_ENV === "development"
                && error.includes("API key") && (
                <div style={{
                  marginTop: 8, color: "#fb6262", fontWeight: 600, fontSize: ".97em"
                }}>
                  Developer Hint: Check that you have a <code>.env</code> file directly inside the <code>communityconnect_hub/</code> folder,
                  containing <br /><code>REACT_APP_NEWS_API_KEY=your_actual_api_key_value</code><br />
                  After adding/changing your API key, always stop and restart <code>npm start</code>.<br />
                  If this is running on a deployed/static build, environment variables cannot be set at runtime.
                </div>
              )}
            </div>
          )}
          {/* News list */}
          <div
            className="news-list"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(318px, 1fr))",
              gap: "20px",
              padding: 0,
              margin: "0 0 16px 0"
            }}
          >
            {sortedArticles && sortedArticles.length > 0 ? (
              sortedArticles.map((item, idx) => (
                <article
                  key={idx}
                  className="news-card"
                  style={{
                    background: "linear-gradient(103deg, #191d21 80%, #292626 100%)",
                    borderRadius: "15px",
                    border: "1.7px solid var(--border-color)",
                    boxShadow: "0 2px 18px 0 #0005",
                    transition: "transform 0.17s, box-shadow .21s",
                    display: "flex",
                    flexDirection: "column",
                    minHeight: 250,
                    position: "relative",
                    overflow: "hidden",
                    cursor: item.url && item.url !== "#" ? "pointer" : "default"
                  }}
                  tabIndex={0}
                  aria-label={`${item.title} ${item.description ? " - " + item.description : ""}`}
                  onClick={item.url && item.url !== "#" ? () => window.open(item.url, "_blank", "noopener noreferrer") : undefined}
                  onKeyPress={e => {
                    if (e.key === "Enter" && item.url && item.url !== "#")
                      window.open(item.url, "_blank", "noopener noreferrer");
                  }}
                  onMouseOver={e => {
                    e.currentTarget.style.transform = "translateY(-4px) scale(1.02)";
                    e.currentTarget.style.boxShadow = "0 8px 24px 0 var(--secondary), 0 2px 32px 0 #ff00003d";
                  }}
                  onMouseOut={e => {
                    e.currentTarget.style.transform = "none";
                    e.currentTarget.style.boxShadow = "0 2px 18px 0 #0005";
                  }}
                >
                  {/* Image section, fallback color if missing */}
                  {item.urlToImage ? (
                    <div style={{
                      height: 148,
                      background:
                        "linear-gradient(90deg,#191d21 90%, #232323 100%)",
                      display: "block",
                      overflow: "hidden"
                    }}>
                      <img
                        src={item.urlToImage}
                        alt={item.title}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          display: "block",
                          transition: "filter .21s",
                          borderTopLeftRadius: 14,
                          borderTopRightRadius: 14,
                          borderBottomRightRadius: 0,
                          borderBottomLeftRadius: 0,
                        }}
                        loading="lazy"
                        className="news-image"
                      />
                    </div>
                  ) : (
                    <div style={{
                      height: 22
                    }} />
                  )}
                  {/* Card Body */}
                  <div style={{
                    padding: "16px 15px 13px 15px",
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-start",
                    background: "none"
                  }}>
                    {/* Headline */}
                    <h3 style={{
                      color: "var(--accent)",
                      fontWeight: 700,
                      fontSize: "1.14em",
                      margin: "0 0 6px 0",
                      textDecoration: (item.url && item.url !== "#") ? "underline" : "none",
                      textUnderlineOffset: 3
                    }}>
                      {(item.url && item.url !== "#")
                        ? (
                          <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              color: "var(--accent)",
                              textDecoration: "none",
                              boxShadow: "none"
                            }}
                            onMouseOver={e => e.target.style.textDecoration = "underline"}
                            onMouseOut={e => e.target.style.textDecoration = "none"}
                            tabIndex={-1}
                          >
                            {item.title}
                          </a>
                        ) : item.title}
                    </h3>
                    {/* Description */}
                    {item.description && (
                      <div style={{
                        fontSize: ".98em",
                        color: "var(--text-secondary)",
                        marginBottom: 6,
                        marginTop: 1
                      }}>
                        {item.description}
                      </div>
                    )}
                    {/* Source, date */}
                    <div style={{
                      fontSize: 13,
                      color: "var(--secondary)",
                      marginTop: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-end",
                      opacity: .81
                    }}>
                      <span>
                        {item.source?.name || "Source"}
                      </span>
                      <span>
                        {formatNewsDate(item.publishedAt)}
                      </span>
                    </div>
                  </div>
                </article>
              ))
            ) : (
              <div style={{
                color: "var(--accent)",
                fontWeight: 500,
                fontSize: "1.08rem",
                padding: "22px 0"
              }}>No news available.</div>
            )}
          </div>
        </>
      )}
      <style>{`
      @keyframes newsSpin {
        0% { transform: rotate(0deg);}
        100% {transform: rotate(360deg);}
      }
      .news-card:focus-within, .news-card:focus-visible, .news-card:focus {
        outline: 2.5px solid var(--secondary);
        box-shadow: 0 4px 34px 0 var(--secondary), 0 2px 25px 0 #ff000033 !important;
      }
      .news-card a:focus, .news-card a:focus-visible { outline: 2px solid var(--secondary);}
      @media (max-width: 740px) {
        .news-list {
          grid-template-columns: 1fr;
          gap: 13px !important;
        }
      }
      `}</style>
    </section>
  );
}

export default NewsPage;
