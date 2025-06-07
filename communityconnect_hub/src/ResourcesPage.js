import React from "react";

// PUBLIC_INTERFACE
function ResourcesPage({ resources, searchQuery, setSearchQuery, results }) {
  /** Community resources directory with search. */
  return (
    <section className="resources-section" id="resources">
      <h2 style={{ margin: "30px 0 10px", color: "var(--accent)" }}>
        Community Resources
      </h2>
      <form
        autoComplete="off"
        onSubmit={(e) => e.preventDefault()}
        style={{ width: "100%", margin: "0 auto", maxWidth: 500 }}
      >
        <input
          type="text"
          placeholder="Search resources, events, news..."
          aria-label="Search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          style={{
            width: "100%",
            padding: "13px 18px",
            fontSize: "1.1rem",
            borderRadius: 8,
            border: "1.5px solid var(--secondary)",
            background: "#181818",
            color: "var(--accent)",
            marginBottom: 0,
            marginTop: 2,
            outline: "none"
          }}
        />
      </form>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 14, marginTop: 12 }}>
        {results.length === 0 && (
          <div style={{ color: "var(--text-secondary)" }}>No results found.</div>
        )}
        {results.map((res, idx) => (
          <div
            key={idx}
            style={{
              background: "#202020",
              border: "1.5px solid var(--border-color)",
              borderLeft: `4px solid var(--secondary)`,
              borderRadius: 8,
              padding: "14px 18px",
              minWidth: 220,
              maxWidth: 260,
              color: "var(--accent)"
            }}
            tabIndex={0}
            aria-label={`${res.type} - ${res.name}`}
          >
            <div style={{ fontWeight: 600 }}>{res.type}</div>
            <div style={{ fontSize: "1.13em", margin: "4px 0", color: "var(--secondary)" }}>
              {res.name}
            </div>
            <div>Contact: <span style={{ fontWeight: 500 }}>{res.contact}</span></div>
            {res.address !== "N/A" && (
              <div>
                <span style={{ color: "var(--text-secondary)" }}>Address:</span>{" "}
                {res.address}
              </div>
            )}
          </div>
        ))}
      </div>
      <div style={{ marginTop: 10, color: "var(--text-secondary)", fontSize: 13 }}>
        Missing a resource? <a href="/feedback" style={{ color: "var(--secondary)" }}>Let us know</a>.
      </div>
    </section>
  );
}

export default ResourcesPage;
