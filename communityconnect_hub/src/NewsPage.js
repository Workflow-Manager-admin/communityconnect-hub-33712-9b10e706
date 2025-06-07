import React from "react";

// PUBLIC_INTERFACE
function NewsPage() {
  /**
   * NewsPage now displays a placeholder message instead of fetching news from an API.
   * All API integration logic has been removed for maintenance/transition.
   */
  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Latest News</h2>
      <div style={{
        color: "var(--accent)",
        background: "#191d21",
        padding: "20px 18px",
        borderRadius: "11px",
        fontSize: "1.13em",
        border: "1.5px solid var(--border-color)",
        boxShadow: "0 1px 12px #0002",
        marginTop: 10,
        marginBottom: 12
      }}>
        News integration is temporarily unavailable.<br />
        Please check back soon for the latest community news updates.
      </div>
      {/* Optionally display demo/placeholder news to maintain layout */}
      <div>
        <ul style={{ paddingLeft: 16, margin: 0, opacity: 0.65 }}>
          <li style={{ marginBottom: 10 }}>
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>Sample: Community Festival Returns This September</span>
            <br />
            <span style={{ fontSize: ".93em", color: "var(--text-secondary)" }}>
              Join us for food, music, and fun! See the full schedule on our events page.
            </span>
            <div style={{ fontSize: 11, color: "#A0A0A0" }}>
              2024-06-08
            </div>
          </li>
          <li>
            <span style={{ color: "var(--accent)", fontWeight: 500 }}>Sample: Local School Wins Science Grant</span>
            <br />
            <span style={{ fontSize: ".93em", color: "var(--text-secondary)" }}>
              City High School awarded for their clean energy innovation challenge.
            </span>
            <div style={{ fontSize: 11, color: "#A0A0A0" }}>
              2024-06-07
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default NewsPage;
