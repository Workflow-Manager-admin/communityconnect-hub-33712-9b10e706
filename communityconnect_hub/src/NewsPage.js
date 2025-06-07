import React from "react";

// PUBLIC_INTERFACE
/**
 * NewsPage
 * Shows a single prominent, accessible button for Google News India.
 * The button is styled for a dark theme, is easily keyboard-accessible,
 * and clearly labeled for screen readers.
 */
function NewsPage() {
  const newsUrl = "https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en";
  return (
    <section
      className="news-section"
      aria-label="Google News India"
      style={{
        background: "linear-gradient(103deg, #191d21 80%, #292626 100%)",
        borderRadius: 14,
        boxShadow: "0 2px 18px 0 #0005",
        border: "1.7px solid var(--border-color)",
        padding: "48px 0 48px 0",
        marginTop: 15,
        marginBottom: 32,
        minHeight: 270,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
      }}
    >
      <h2
        style={{
          color: "var(--accent)",
          margin: "0 0 24px 0",
          padding: 0,
          fontSize: "2.15rem",
          fontWeight: 800,
          textAlign: "center",
        }}
      >
        National News (India)
      </h2>
      <a
        href={newsUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn btn-large"
        style={{
          background: "var(--secondary)",
          color: "var(--accent)",
          fontWeight: 800,
          padding: "18px 42px",
          borderRadius: 11,
          border: "1.7px solid var(--secondary)",
          fontSize: "1.14rem",
          boxShadow: "0 3px 28px #0008",
          textDecoration: "none",
          margin: "0 auto",
          marginTop: 20,
          transition: "background 0.17s, color 0.17s",
          outline: "none"
        }}
        aria-label="Open Google News India in a new tab"
        tabIndex={0}
        onKeyDown={e => {
          if (e.key === "Enter" || e.key === " ") {
            window.open(newsUrl, "_blank", "noopener noreferrer");
          }
        }}
      >
        Open Google News India&nbsp;<span aria-hidden="true" style={{ fontWeight: 900, fontSize: "1.19em" }}>&#8599;</span>
      </a>
      <div style={{
        color: "var(--text-secondary)",
        marginTop: 22,
        fontSize: 15,
        maxWidth: 410,
        textAlign: "center",
        lineHeight: 1.45
      }}>
        <span aria-hidden="true" style={{ fontSize: "1.17em", color: "var(--secondary)", marginRight: 6 }}>📰</span>
        Latest Indian news updates provided by Google News. For in-depth coverage and trending stories, use the button above to visit Google News India in a new tab.
      </div>
    </section>
  );
}

export default NewsPage;
