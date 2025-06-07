import React, { useEffect, useState } from "react";
import { fetchLatestNews } from "./newsApi";

// PUBLIC_INTERFACE
/**
 * NewsPage
 * Displays 3-6 random news headlines related to Chennai, styled in accessible, visually appealing dark cards.
 * Tries to fetch live news via backend proxy; falls back to hardcoded demo if API isn't available.
 */
function NewsPage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState("");

  // Demo fallback news (show if API fails/unavailable)
  const fallbackNews = [
    {
      title: "Chennai Metro Extension Opens: Boost for City Transit",
      description:
        "The long-awaited Phase 2 of Chennai Metro Rail has been inaugurated, improving connectivity for thousands of commuters.",
      url: "https://www.thehindu.com/news/cities/chennai/",
      source: "The Hindu",
      publishedAt: "2024-06-07",
    },
    {
      title: "Marina Beach Festival Draws Huge Crowds",
      description:
        "Chennai’s iconic Marina Beach hosts its annual summer festival with music, food stalls, and art installations, attracting families citywide.",
      url: "https://timesofindia.indiatimes.com/city/chennai",
      source: "TOI",
      publishedAt: "2024-06-06",
    },
    {
      title: "Cyclone Alert Issued: Heavy Rains Expected in Chennai",
      description:
        "IMD has issued a cyclone warning for the Chennai region; citizens are urged to stay informed and take necessary precautions.",
      url: "https://www.ndtv.com/chennai-news",
      source: "NDTV",
      publishedAt: "2024-06-05",
    },
    {
      title: "Chennai Corporation Launches Free Health Camps",
      description:
        "Multiple free health camps across the city are offering basic checkups, vaccination, and wellness guidance this weekend.",
      url: "https://www.newindianexpress.com/cities/chennai/",
      source: "New Indian Express",
      publishedAt: "2024-06-04",
    },
    {
      title: "Flood Mitigation Project Receives Additional Funding",
      description:
        "Tamil Nadu government allots extra funds to enhance Chennai’s storm water drain network before the monsoon.",
      url: "https://www.deccanchronicle.com/nation/current-affairs/070624/funds-for-chennai-flood-mitigation.html",
      source: "Deccan Chronicle",
      publishedAt: "2024-06-03",
    },
    {
      title: "Local Startups from Chennai Shine at National Hackathon",
      description:
        "Two Chennai-based tech startups win prizes in the India Innovation Hackathon, focusing on social impact solutions.",
      url: "https://yourstory.com/news/chennai",
      source: "YourStory",
      publishedAt: "2024-06-02",
    }
  ];

  // Try to fetch live Chennai news (else fallback)
  useEffect(() => {
    let isMounted = true;
    setLoading(true);
    // Try to get news for the search: Chennai
    fetchLatestNews({ query: "Chennai", pageSize: 6 })
      .then((news) => {
        if (!isMounted) return;
        // Prefer articles with title+description
        const filtered = (news || []).filter(
          (a) => a.title && (a.description || a.content)
        );
        setArticles(filtered.length >= 3 ? filtered : fallbackNews);
        setLoading(false);
        setApiError("");
      })
      .catch((e) => {
        setApiError("Live city news temporarily unavailable – showing recent Chennai headlines.");
        setArticles(fallbackNews);
        setLoading(false);
      });
    return () => { isMounted = false; };
    // eslint-disable-next-line
  }, []);

  // Card-style for news
  const cardStyle = {
    background: "var(--news-card-bg)",
    border: "1.7px solid var(--border-color)",
    borderRadius: 14,
    boxShadow: "0 5px 22px 0 #0006, 0 2px 12px 0 #ff000025",
    padding: "28px 20px 22px 22px",
    color: "var(--accent)",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    outline: "none",
    minWidth: 240,
    maxWidth: 340,
    margin: "0 auto",
    transition: "box-shadow 0.17s, transform 0.13s"
  };
  const cardTitleStyle = {
    color: "var(--accent)",
    fontSize: "1.16em",
    fontWeight: 700,
    margin: 0,
    lineHeight: 1.26,
    textShadow: "0 2px 8px #0006"
  };
  const cardDescStyle = {
    color: "var(--text-secondary)",
    fontSize: "1.06em"
  };
  const metaStyle = {
    fontSize: "0.99em",
    color: "var(--secondary)",
    fontWeight: 500,
    letterSpacing: ".01em"
  };

  // Grid layout for cards
  const gridStyle = {
    display: "flex",
    flexWrap: "wrap",
    gap: 22,
    width: "100%",
    justifyContent: "center",
    marginTop: 18
  };

  return (
    <section
      className="news-section"
      aria-label="Chennai News"
      style={{
        margin: "24px auto 30px",
        padding: "18px 0 36px 0"
      }}
    >
      <h2
        style={{
          color: "var(--accent)",
          margin: "0 0 16px 0",
          padding: 0,
          fontSize: "2.0rem",
          fontWeight: 800,
          textAlign: "center"
        }}
      >
        Chennai News <span role="img" aria-label="Chennai">📰</span>
      </h2>
      {loading ? (
        <div style={{
          color: "var(--secondary)",
          fontWeight: 500,
          textAlign: "center",
          fontSize: "1.25em",
          margin: "40px auto"
        }}>
          Loading the latest Chennai headlines...
        </div>
      ) : (
        <>
          {apiError && (
            <div style={{
              textAlign: "center",
              color: "var(--secondary)",
              background: "#191a24",
              padding: "9px 14px",
              borderRadius: 7,
              marginBottom: 18,
              fontSize: 15,
              maxWidth: 410,
              marginLeft: "auto",
              marginRight: "auto"
            }} role="alert">
              {apiError}
            </div>
          )}
          <div style={gridStyle}>
            {articles.slice(0, 6).map((article, idx) => (
              <article
                key={article.url || idx}
                tabIndex={0}
                aria-label={article.title}
                style={{
                  ...cardStyle,
                  boxShadow: "0 2px 18px 0 #0005, 0 2px 29px 0 #ff00002c"
                }}
                className="news-card"
              >
                <header>
                  <a
                    href={article.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      ...cardTitleStyle,
                      display: "block",
                      textDecoration: "none"
                    }}
                    tabIndex={0}
                  >
                    {article.title}
                    <span aria-hidden="true" style={{ marginLeft: 6, fontSize: 17, color: "var(--secondary)" }}>
                      &#8599;
                    </span>
                  </a>
                </header>
                <div style={cardDescStyle}>
                  {article.description
                    ? article.description
                    : article.content
                    ? article.content
                    : <span style={{ color: "#cacaca" }}>No summary available.</span>
                  }
                </div>
                <footer style={{ marginTop: 3, display: "flex", alignItems: "center", gap: 9, flexWrap: "wrap" }}>
                  <span style={metaStyle}>
                    {article.source?.name || article.source || "News"}
                  </span>
                  <span style={{ fontSize: 13, color: "var(--text-secondary)" }}>
                    {article.publishedAt
                      ? new Date(article.publishedAt).toLocaleDateString("en-IN", {
                          year: "numeric",
                          month: "short",
                          day: "numeric"
                        })
                      : ""}
                  </span>
                </footer>
              </article>
            ))}
          </div>
        </>
      )}
      <div style={{
        marginTop: 24,
        color: "var(--text-secondary)",
        fontSize: 15,
        textAlign: "center"
      }}>
        For in-depth or trending stories, visit 
        {" "}
        <a
          href="https://news.google.com/search?q=chennai"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: "var(--secondary)", fontWeight: 600, textDecoration: "underline" }}
        >
          Google News Chennai
        </a>
        .
      </div>
    </section>
  );
}

export default NewsPage;
