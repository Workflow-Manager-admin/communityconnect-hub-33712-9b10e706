import React from "react";
import { Link, Routes, Route, Navigate, Outlet } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * MainContainer - Primary layout shell for CommunityConnect Hub.
 * Implements the site-wide theme, navigation, and routes.
 * Integrates:
 *   - API dashboards (News, Weather, Events - with placeholders)
 *   - Community resources directory access
 *   - User registration/account
 *   - Feedback system
 * Uses: Dark theme, #000 (primary), #ff0000 (secondary), #fff (accent)
 * Note: Layout matches spec: navbar, accessible skip link, card dashboard, search bar, key sections.
 */
function MainContainer() {
  // Default Theme CSS vars
  const defaultThemeVars = {
    "--primary": "#000000",
    "--secondary": "#ff0000",
    "--accent": "#ffffff",
    "--text-color": "#ffffff",
    "--container-bg": "#18191a",
    "--card-bg": "#23262D",
    "--card-radius": "12px",
    "--card-shadow": "0 3px 16px 0 rgba(0,0,0,0.13), 0 2px 9px 0 #14161822"
  };

  // Map nav item to theme colors
  const NAV_COLORS = {
    Home:   { "--primary": "#23262D", "--secondary": "#ff0000", "--accent": "#67DEF6" },
    News:   { "--primary": "#2440FA", "--secondary": "#4482F0", "--accent": "#B8DBFF" },      // blue
    Weather: { "--primary": "#67DEF6", "--secondary": "#6976F6", "--accent": "#fff" },        // light blue/cyan
    Resources: { "--primary": "#00C46F", "--secondary": "#3BB273", "--accent": "#fff" },      // green
    Events: { "--primary": "#F69B32", "--secondary": "#F04C40", "--accent": "#fff9ce" },      // orange
    Register: { "--primary": "#7F3AED", "--secondary": "#B15DF0", "--accent": "#fff" },       // purple (Account/Register)
    Feedback: { "--primary": "#F04C40", "--secondary": "#B61F6A", "--accent": "#fff" }        // red/pink for feedback
  };

  // State for theming
  const [themeVars, setThemeVars] = React.useState(defaultThemeVars);

  // Handle hover for nav
  const handleNavHover = (navLabel) => {
    if (NAV_COLORS[navLabel]) {
      setThemeVars({
        ...defaultThemeVars,
        ...NAV_COLORS[navLabel]
      });
    }
  };

  // Reset theme to default when not hovering
  const handleNavUnhover = () => {
    setThemeVars(defaultThemeVars);
  };

  // Placeholder for dashboard widgets (replace with actual API widgets)
  function DashboardPlaceholder() {
    return (
      <div className="cc-card-grid" style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 24,
        margin: "0 -10px 28px -10px",
        width: "100%",
        justifyContent: "flex-start"
      }}>
        <WidgetCard title="News (API)" icon="📰" desc="Latest headlines and city news. (Live dashboard here)" sectionLink="/news" />
        <WidgetCard title="Weather (API)" icon="🌤️" desc="Today’s weather in your area. (Live weather widget here)" sectionLink="/weather" />
        <WidgetCard title="Events (API)" icon="📅" desc="Local happenings & community meetups. (Events widget here)" sectionLink="/events" />
      </div>
    );
  }

  function WidgetCard({ title, icon, desc, sectionLink }) {
    return (
      <div
        className="cc-card"
        style={{
          background: "var(--card-bg)",
          borderRadius: "var(--card-radius)",
          boxShadow: "var(--card-shadow)",
          color: "var(--text-color)",
          minWidth: 210,
          maxWidth: 320,
          flex: "1 1 210px",
          margin: "0 0 0 0",
          padding: "25px 20px 18px 22px",
          display: "flex",
          flexDirection: 'column',
          outline: 'none',
        }}
        tabIndex={0}
        role="region"
        aria-label={title}
      >
        <div style={{
          fontSize: 44,
          marginBottom: 8,
          alignSelf: "center",
          filter: "drop-shadow(0 2px 5px #0006)"
        }}>{icon}</div>
        <div style={{
          fontSize: "1.2rem",
          fontWeight: 780,
          letterSpacing: ".01em",
          color: "var(--accent)",
          marginBottom: 5
        }}>{title}</div>
        <div style={{
          color: "var(--text-secondary, #B9BEC9)",
          fontSize: "1rem",
          marginBottom: 11
        }}>{desc}</div>
        <Link
          to={sectionLink}
          className="feature-card-link"
          style={{
            color: "var(--secondary)", 
            fontWeight: 700,
            textDecoration: "underline",
            fontSize: ".97rem",
            marginTop: "auto"
          }}
          tabIndex={0}
        >
          More
        </Link>
      </div>
    );
  }

  // Placeholder search bar (links with resources)
  function SearchSection() {
    return (
      <section aria-label="Homepage Search" style={{ maxWidth: 400, margin: "0 auto", marginBottom: 29 }}>
        <form autoComplete="off" style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <input
            type="search"
            placeholder="Search community resources or info..."
            aria-label="Search"
            style={{
              width: "100%",
              background: "#191a1f",
              color: "var(--accent)",
              border: "1.5px solid var(--secondary)",
              borderRadius: 8,
              padding: "14px 17px",
              fontSize: "1.13rem",
              outline: "none",
              fontWeight: 520
            }}
            // You might want to connect this to navigation logic or global state
          />
          <button
            type="submit"
            className="btn"
            style={{
              background: "var(--secondary)",
              color: "var(--accent)",
              borderRadius: 6,
              fontWeight: 700,
              padding: "12px 19px",
              fontSize: ".99rem",
              border: "none"
            }}
            tabIndex={0}
            aria-label="Submit search"
          >Search
          </button>
        </form>
      </section>
    );
  }

  // Main Navigation with theme color change on hover
  function NavBar() {
    const links = [
      { path: "/", label: "Home" },
      { path: "/news", label: "News" },
      { path: "/weather", label: "Weather" },
      { path: "/resources", label: "Resources" },
      { path: "/events", label: "Events" },
      { path: "/register", label: "Register" },
      { path: "/feedback", label: "Feedback" }
    ];

    // Determine active route for highlight (supports feedback for color as well)
    const pathname = window.location.pathname;
    function isActive(route) {
      if (route === "/") return pathname === "/";
      return pathname.startsWith(route) && route !== "/";
    }

    return (
      <nav
        className="navbar"
        role="navigation"
        aria-label="Primary navigation"
        style={{
          background: "linear-gradient(90deg,#000 80%, var(--secondary) 135%)",
          borderBottom: "1.25px solid var(--secondary)",
          minHeight: 60,
          padding: "0 0",
          display: "flex",
          alignItems: "center",
          position: "fixed",
          top: 0,
          width: "100%",
          zIndex: 10,
        }}
      >
        <div className="container" style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <Link to="/" className="logo" style={{
            color: "var(--accent)",
            fontWeight: 700,
            fontSize: "1.32rem",
            textDecoration: "none",
            display: "flex",
            alignItems: "center",
            gap: 10
          }}>
            <span className="logo-symbol" style={{ color: "var(--secondary)", fontWeight: 900, fontSize: "1.25em" }}>◼</span>
            CommunityConnect Hub
          </Link>
          <div className="navbar-links" style={{ display: "flex", gap: "22px" }}>
            {links.map(link => (
              <Link
                to={link.path}
                key={link.path}
                onMouseEnter={() => handleNavHover(link.label)}
                onFocus={() => handleNavHover(link.label)}
                onMouseLeave={handleNavUnhover}
                onBlur={handleNavUnhover}
                style={{
                  color: isActive(link.path) ? "var(--secondary)" : "var(--accent)",
                  textDecoration: "none",
                  fontWeight: isActive(link.path) ? 800 : 600,
                  fontSize: ".97rem",
                  padding: "4px 10px",
                  borderBottom: isActive(link.path)
                    ? "2.3px solid var(--secondary)"
                    : "2.3px solid transparent",
                  background: isActive(link.path)
                    ? "rgba(255,255,255,0.07)"
                    : undefined,
                  borderRadius: 6,
                  transition: "background 0.17s, color 0.14s, border 0.18s",
                  position: "relative",
                  outline: "none",
                  cursor: "pointer",
                }}
                tabIndex={0}
                aria-current={isActive(link.path) ? "page" : undefined}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  // Footer placeholder
  function Footer() {
    return (
      <footer
        className="cc-footer"
        role="contentinfo"
        style={{
          background: "#000",
          color: "var(--accent)",
          fontSize: ".98em",
          borderTop: "1px solid var(--secondary)",
          padding: "28px 0 18px 0",
          marginTop: "auto",
          textAlign: "center"
        }}
      >
        <span style={{ fontWeight: 700, color: "var(--accent)" }}>
          CommunityConnect Hub
        </span>{" "}
        &copy; {new Date().getFullYear()} &ndash; Chennai
      </footer>
    );
  }

  // Main Layout
  return (
    <div style={themeVars} className="container" tabIndex={-1}>
      {/* Accessible skip-to-main link */}
      <a
        href="#main-content"
        className="skip-link"
        style={{
          position: "absolute",
          left: 0, top: 0, zIndex: 155,
          background: "#fff",
          color: "#000",
          padding: "8px 18px",
          border: "none",
          borderRadius: "0 0 6px 0",
          transform: "translateY(-120%)",
          transition: "transform 0.19s",
          fontWeight: 700,
          textDecoration: "none"
        }}
        onFocus={e => { e.target.style.transform = "translateY(0)"; }}
        onBlur={e => { e.target.style.transform = "translateY(-120%)"; }}
      >Skip to main content</a>
      <NavBar />
      {/* main page content area */}
      <main id="main-content" aria-label="Main content" tabIndex={-1} style={{
        marginTop: 74, minHeight: '80vh', width: "100%", outline: 'none'
      }}>
        {/* Homepage structure: hero, search, dashboard, quick links */}
        <section style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "0 15px",
          background: "var(--container-bg)",
          borderRadius: "16px",
          boxShadow: "0 2px 22px #0001",
        }}>
          <header className="hero" style={{ textAlign: "center", padding: "62px 0 30px 0" }}>
            <h1 style={{
              color: "var(--accent)",
              fontSize: "2.3rem",
              fontWeight: "bold",
              letterSpacing: ".01em",
              marginBottom: "5px"
            }}>
              Welcome to CommunityConnect Hub
            </h1>
            <div className="subtitle" style={{
              color: "var(--secondary)",
              fontWeight: 700,
              letterSpacing: ".07em",
              fontSize: "1.08rem"
            }}>
              Community Information, Help, and Real-Time Updates &mdash; for Chennai
            </div>
            <p className="description" style={{
              color: "#e3e3e3",
              margin: "0 auto 2px auto",
              fontSize: "1.08rem", maxWidth: 650
            }}>
              Find city news, weather, emergency contacts, resources, events, and support. <br />
              One place for all your community needs — supporting Chennai with tech and heart.
            </p>
          </header>
          <SearchSection />
          <nav aria-label="Quick links" style={{
            display: 'flex', gap: "15px", justifyContent: "center", margin: "10px 0 25px 0", flexWrap: "wrap"
          }}>
            <Link to="/resources" className="btn" style={{ background: "var(--secondary)", color: "#fff" }}>Shelters</Link>
            <Link to="/resources" className="btn" style={{ background: "#222", color: "#fff" }}>Food Banks</Link>
            <Link to="/resources" className="btn" style={{ background: "#333", color: "#fff" }}>Emergency Contacts</Link>
            <Link to="/events" className="btn" style={{ background: "#ff0000", color: "#fff" }}>Local Events</Link>
            <Link to="/register" className="btn" style={{ background: "var(--accent)", color: "#000" }}>Account</Link>
            <Link to="/feedback" className="btn" style={{ background: "#fff", color: "#ff0000" }}>Feedback</Link>
          </nav>
          <DashboardPlaceholder />
        </section>
        {/* Render actual feature module children here (React Router outlet) */}
        <section aria-label="App Feature Section" style={{ margin: "34px auto 0 auto", width: "100%" }}>
          <Outlet />
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default MainContainer;
