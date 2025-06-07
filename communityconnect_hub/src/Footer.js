import React from "react";

// PUBLIC_INTERFACE
/**
 * Footer for CommunityConnect Hub – branded, dark-themed, accessible.
 * - Contains: brand info, main nav links, contact, and social media links (as appropriate).
 * - Responsive, with proper roles and strong focus/hover/active styles.
 * - To be imported and rendered in App.js, always at bottom of layout.
 */
function Footer() {
  // Socials: These are placeholder/example – customize with real handles if available
  const socialLinks = [
    {
      name: "Twitter",
      url: "https://twitter.com/",
      label: "Twitter (CommunityConnect Hub)",
      icon: (
        <svg width="24" height="24" aria-hidden="true" focusable="false" style={{ verticalAlign: "middle" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 4.6c-.9.4-1.7.6-2.6.8A4.5 4.5 0 0023.3 3c-.9.6-1.9 1-3 1.3A4.48 4.48 0 0012 7.7V8c-3.5-.1-6.5-1.8-8.6-4.1-.4.7-.5 1.4-.5 2.1 0 1.5.9 2.9 2.2 3.7-.8 0-1.6-.3-2.2-.6v.1c0 2.2 1.5 4.1 3.7 4.5-.4.1-.7.2-1.2.2-.3 0-.5 0-.8-.1.5 1.7 2.1 3 4 3A9 9 0 012 19.5c-.6 0-1.2-.1-1.7-.2A12.64 12.64 0 006.3 21c7.6 0 11.8-6.4 11.8-11.8 0-.2 0-.5 0-.7A8.2 8.2 0 0024 4.6z"/>
        </svg>
      ),
    },
    {
      name: "Facebook",
      url: "https://facebook.com/",
      label: "Facebook (CommunityConnect Hub)",
      icon: (
        <svg width="24" height="24" aria-hidden="true" focusable="false" style={{ verticalAlign: "middle" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M9 8H7v4H4v3h3v9h4v-9h2.7l.3-3H11V9c0-.7.1-1 .9-1H14V5.3C13.3 5.1 12.5 5 11.8 5c-2.2 0-2.8 1.1-2.8 2.7V8zm3 15h-4v-9H4v-3h3V8c0-1.7.6-4 3.8-4C12.3 4 13.3 4.1 14 4.2V7h-1.3c-1.1 0-1.3.4-1.3 1.1l.1 1.9H14l-.3 3H11v9h1z"/>
        </svg>
      ),
    },
    {
      name: "GitHub",
      url: "https://github.com/",
      label: "GitHub (CommunityConnect Hub)",
      icon: (
        <svg width="24" height="24" aria-hidden="true" focusable="false" style={{ verticalAlign: "middle" }} fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 1.8C5.7 1.8.3 7.2.3 13.5c0 5.2 3.4 9.5 8.1 11 .6.1.8-.2.8-.5v-2c-3.3.7-4-.9-4-1.7 0-.4-.1-1-.7-1.3-.3-.1-.7-.4 0-.4.7 0 1.1.6 1.2.8.7 1.2 1.9.8 2.4.6.1-.5.3-.8.5-1-2.7-.3-5.6-1.4-5.6-6.2 0-1.4.5-2.6 1.2-3.6-.1-.3-.5-1.4.1-2.9 0 0 1-.3 3.4 1.3A11.5 11.5 0 0112 8.2c1.1 0 2.3.2 3.4.6 2.4-1.6 3.4-1.3 3.4-1.3.6 1.5.2 2.6.1 2.9.8 1 1.2 2.2 1.2 3.6 0 4.8-2.9 5.9-5.6 6.2.3.3.6.7.6 1.4v2.1c0 .3.2.7.8.5C20.2 23 23.5 18.7 23.5 13.5c0-6.3-5.4-11.7-11.5-11.7z"/>
        </svg>
      ),
    }
  ];
  return (
    <footer className="cc-footer" role="contentinfo" aria-label="Site footer"
      tabIndex={0}
      style={{
        background: "var(--base-dark, #20272D)",
        color: "var(--text-secondary, #B9BEC9)",
        fontSize: 15,
        borderTop: "1.7px solid var(--border-color, #222)",
        marginTop: "auto",
        width: "100%",
        boxShadow: "0 -2px 10px #0002",
        letterSpacing: ".01em",
      }}
    >
      <div className="footer-content" style={{
        maxWidth: 1120,
        margin: "0 auto",
        padding: "32px 20px 20px 20px",
        display: "flex",
        flexWrap: "wrap",
        gap: "18px 36px",
        justifyContent: "space-between",
        alignItems: "flex-start",
        flexDirection: "row",
      }}>
        <section style={{ flex: "1 1 220px", minWidth: 180 }}>
          <div aria-label="CommunityConnect Hub Branding" style={{
            fontWeight: 800,
            fontSize: "1.2rem",
            color: "var(--accent, #fff)"
          }}>
            <span className="logo-symbol" style={{color:"var(--secondary, #F04C40)", marginRight: 6, fontWeight: 900, fontSize: "1.11em"}}>◼</span>
            CommunityConnect Hub
          </div>
          <div style={{ fontSize: 15, marginTop: 6 }}>
            Serving Chennai – a central hub for local resources, news, and support.
          </div>
          <div style={{ marginTop: 22, fontSize: 13 }}>
            &copy; {new Date().getFullYear()} CommunityConnect Hub. All rights reserved.
          </div>
        </section>
        <nav aria-label="Key site links" style={{ flex: "1 1 160px", marginTop: 6 }}>
          <ul style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 8
          }}>
            <li>
              <a href="/" className="footer-link" tabIndex={0}>Home</a>
            </li>
            <li>
              <a href="/news" className="footer-link" tabIndex={0}>News</a>
            </li>
            <li>
              <a href="/resources" className="footer-link" tabIndex={0}>Resources</a>
            </li>
            <li>
              <a href="/events" className="footer-link" tabIndex={0}>Events</a>
            </li>
            <li>
              <a href="/register" className="footer-link" tabIndex={0}>Account</a>
            </li>
            <li>
              <a href="/feedback" className="footer-link" tabIndex={0}>Feedback</a>
            </li>
          </ul>
        </nav>
        <section aria-label="Contact & Socials" style={{ flex: "1 1 210px", minWidth: 170, marginTop: 6 }}>
          <div style={{ fontWeight: 700, color: "var(--accent, #fff)", marginBottom: 5 }}>Contact</div>
          <div style={{ fontSize: 14 }}>
            Email: <a className="footer-link" href="mailto:info@communityconnect.com" tabIndex={0}>info@communityconnect.com</a> <br />
            Support: <a className="footer-link" href="tel:+911234567890" tabIndex={0}>+91-12345-67890</a>
          </div>
          <div style={{marginTop: 14}}>
            <span style={{ fontWeight: 700, color: "var(--accent, #fff)" }}>Follow us:&nbsp;</span>
            {socialLinks.map(s => (
              <a key={s.name} href={s.url} className="footer-social-link" target="_blank" rel="noopener noreferrer" aria-label={s.label}
                tabIndex={0} style={{marginRight: 8, color: "var(--accent, #fff)", display: "inline-block"}}
              >
                <span style={{display:"inline-block", verticalAlign:"middle", width: 24, height: 24}}>{s.icon}</span>
                <span className="screen-reader-only" style={{
                  position: "absolute", width: 1, height: 1, overflow: "hidden", margin: -1, padding: 0, border: 0, clip: "rect(0,0,0,0)"
                }}>{s.name}</span>
              </a>
            ))}
          </div>
        </section>
      </div>
    </footer>
  );
}

export default Footer;
