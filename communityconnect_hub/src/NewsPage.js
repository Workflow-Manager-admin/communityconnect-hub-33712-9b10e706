import React, { useRef, useEffect, useState } from "react";

// PUBLIC_INTERFACE
/**
 * NewsPage
 * Attempts to embed Google News India via iframe.
 * If embedding is blocked (X-Frame-Options/CSP), show a styled fallback link.
 * Maintains dark theme and accessibility.
 */
function NewsPage() {
  const iframeRef = useRef(null);
  const [embedAllowed, setEmbedAllowed] = useState(true);

  // Google News India URL
  const newsUrl = "https://news.google.com/home?hl=en-IN&gl=IN&ceid=IN:en";

  useEffect(() => {
    // Attempt to detect (best effort) if embedding is blocked by CSP/X-Frame-Options
    // Method: after mount, setTimeout and check iframe .contentWindow or .contentDocument access
    // If access denied or zero height, assume blocked.
    const timer = setTimeout(() => {
      try {
        // Defensive: accessing .contentDocument on cross-origin iframe throws DOMException
        const iframe = iframeRef.current;
        if (!iframe) {
          setEmbedAllowed(false);
          return;
        }
        // Try accessing a property that would fail if not embeddable
        // (not bulletproof, but covers common case)
        // If blocked, this will throw a SecurityError
        if (
          !iframe.contentWindow ||
          !iframe.contentWindow.document ||
          iframe.contentWindow.location.href === "about:blank"
        ) {
          setEmbedAllowed(false);
        }
      } catch (e) {
        // Likely blocked
        setEmbedAllowed(false);
      }
    }, 950); // give iframe ~1s to try loading

    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      className="news-section"
      aria-label="Google News - India"
      style={{
        background: "linear-gradient(103deg, #191d21 80%, #292626 100%)",
        borderRadius: 14,
        boxShadow: "0 2px 18px 0 #0005",
        border: "1.7px solid var(--border-color)",
        padding: "20px 0 32px 0",
        marginTop: 15,
        marginBottom: 24,
        minHeight: 350,
        display: "flex",
        flexDirection: "column",
        alignItems: "center"
      }}
    >
      <h2
        style={{
          color: "var(--accent)",
          margin: "0 0 18px 0",
          padding: 0,
          fontSize: "2rem",
          fontWeight: 800
        }}
      >
        National News (India)
      </h2>

      {embedAllowed ? (
        <div
          style={{
            width: "100%",
            maxWidth: 1020,
            minHeight: 520,
            display: "flex",
            justifyContent: "center",
            alignItems: "stretch",
            borderRadius: 12,
            boxShadow: "0 4px 26px 0 #0008",
            background: "#111",
            position: "relative",
            border: "1.5px solid var(--border-color)"
          }}
        >
          <iframe
            ref={iframeRef}
            src={newsUrl}
            title="Google News India"
            style={{
              width: "100%",
              minHeight: 520,
              border: "none",
              borderRadius: 12,
              background: "#111"
            }}
            sandbox="allow-scripts allow-same-origin allow-popups"
            aria-label="Embedded Google News page for India"
          />
          <noscript>
            <div style={{ color: "#fff", margin: 16 }}>
              To view the news, please enable JavaScript.
            </div>
          </noscript>
        </div>
      ) : (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            margin: "38px 0"
          }}
        >
          <span
            style={{
              color: "var(--accent)",
              background: "#232323",
              border: "1.3px solid var(--border-color)",
              padding: "16px 22px",
              borderRadius: 11,
              marginBottom: 22,
              maxWidth: 430,
              fontSize: "1.08rem",
              boxShadow: "0 2px 20px #0007",
              textAlign: "center"
            }}
            role="alert"
          >
            Sorry, direct news embed is not supported.<br />
            <span style={{ color: "var(--secondary)", fontWeight: 500 }}>
              Google News India cannot be displayed within this page due to browser security policies.
            </span>
          </span>
          <a
            href={newsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-large"
            style={{
              background: "var(--secondary)",
              color: "var(--accent)",
              fontWeight: 800,
              padding: "15px 36px",
              borderRadius: 9,
              border: "1.5px solid var(--secondary)",
              fontSize: "1.16rem",
              boxShadow: "0 3px 17px #0005",
              textDecoration: "none",
              marginTop: 8
            }}
            aria-label="Open Google News India in a new tab"
            tabIndex={0}
            onKeyPress={e => {
              if (e.key === "Enter") {
                window.open(newsUrl, "_blank", "noopener noreferrer");
              }
            }}
          >
            Open Google News India &rarr;
          </a>
          <div style={{
            color: "var(--text-secondary)",
            marginTop: 16,
            fontSize: 13,
            maxWidth: 380
          }}>
            <span aria-hidden="true" style={{ fontSize: "1.15em", color: "var(--secondary)", marginRight: 6 }}>ℹ️</span>
            <span>
              This site respects external site security (X-Frame-Options/CSP). For more details visit <a href={newsUrl} target="_blank" rel="noopener noreferrer" style={{ color: "var(--secondary)" }}>Google News India</a>.
            </span>
          </div>
        </div>
      )}
    </section>
  );
}

export default NewsPage;
