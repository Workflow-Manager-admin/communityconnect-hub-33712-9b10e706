import React from "react";

// PUBLIC_INTERFACE
function NewsPage({ news }) {
  /** Displays the latest news articles. */
  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Latest News</h2>
      {news.length ? (
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
        <div style={{ color: "var(--accent)" }}>Loading news...</div>
      )}
    </section>
  );
}

export default NewsPage;
