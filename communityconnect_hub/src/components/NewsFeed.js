import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function NewsFeed() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading news via an API
  useEffect(() => {
    setTimeout(() => {
      setNews([
        {
          title: "Local Library Offers Free Workshops This Saturday",
          date: "2024-06-01",
          source: "Community News",
          excerpt: "The community library will hold workshops on digital skills and resume building.",
        },
        {
          title: "Neighborhood Clean-up Yields Record Donations",
          date: "2024-05-28",
          source: "City Journal",
          excerpt: "Over 150 residents joined the neighborhood clean-up, donating 250 hours of service.",
        },
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  return (
    <div>
      <h2 className="cc-section-title">Local News</h2>
      {loading ? (
        <div className="cc-skeleton" style={{ height: 60 }}></div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {news.map((n, i) => (
            <li key={i} style={{ marginBottom: "18px" }}>
              <div style={{ fontWeight: 600, fontSize: "1.04rem" }}>{n.title}</div>
              <div style={{ fontSize: "0.95rem", color: "#bbb" }}>
                {n.source} &bull; {new Date(n.date).toLocaleDateString()}
              </div>
              <div style={{ fontSize: "0.98rem", color: "#eee", marginTop: 2 }}>
                {n.excerpt}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default NewsFeed;
