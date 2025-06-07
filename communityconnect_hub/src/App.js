/*
  === DESIGN AUDIT: Main App Container ===
  - Background: global dark, accent colors pulled from CSS vars ("--primary", "--secondary", "--accent").
  - Navigation: Navbar is globally present, fixed, with logo and primary nav.
  - Spacing/margins: Consistent container class, min-height 100vh.
  - Typography: Modern, readable system fonts used.
  - Font size/scale: global container and typical base font scale.
  - Navigation logic: All routes accessible via <Routes> and react-router.
  - Accessibility: Good focus management and roles throughout, but skip-to-content and nav link active state could improve.
  - Footer: present, accessible.
  - TODO:
      - Add skip-to-content link at top for keyboard users.
      - Add nav link active/highlighted state for current page.
      - Consider <main>, <nav>, <footer> landmarks with ARIA roles.
      - Theme: Consider allowing user theme switch, or expanding palette options.
*/
import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import NewsPage from "./NewsPage";
import WeatherPage from "./WeatherPage";
import EventsPage from "./EventsPage";
import ResourcesPage from "./ResourcesPage";
import RegisterPage from "./RegisterPage";
import FeedbackPage from "./FeedbackPage";
import HomePage from "./HomePage";

// PUBLIC_INTERFACE
function App() {
  // State for widgets and forms
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [resources] = useState([
    {
      type: "Shelter",
      name: "Community Safe Harbor",
      contact: "555-0110",
      address: "123 Winter St.",
    },
    {
      type: "Food Bank",
      name: "City Food Pantry",
      contact: "555-0220",
      address: "456 Harvest Ave.",
    },
    {
      type: "Emergency",
      name: "Emergency Services",
      contact: "911",
      address: "N/A",
    },
  ]);

  // Registration & feedback state
  const [user, setUser] = useState(null);
  const [regForm, setRegForm] = useState({
    name: "",
    email: "",
    subscribe: false,
  });
  const [feedback, setFeedback] = useState({ message: "", submitted: false });

  // Search bar state
  const [searchQuery, setSearchQuery] = useState("");
  const [resourceResults, setResourceResults] = useState(resources);

  // Mock API fetches (replace with real API calls)
  useEffect(() => {
    // Simulate News API
    setTimeout(() => {
      setNews([
        {
          title: "Local Library Hosts Summer Reading Challenge",
          description: "Free programs engage kids and adults citywide.",
          url: "#",
          timestamp: "2024-06-07",
        },
        {
          title: "Community Park Renovation Completed",
          description:
            "The city park is now open with new playgrounds and walking trails.",
          url: "#",
          timestamp: "2024-06-06",
        },
      ]);
    }, 400);
    // Simulate Weather API
    setTimeout(() => {
      setWeather({
        location: "Sample City",
        temperature: 75,
        description: "Sunny",
        icon: "☀️",
      });
    }, 250);
    // Simulate Events API - Chennai Specific
    setTimeout(() => {
      setEvents([
        {
          name: "Chennai Book Fair",
          date: "2024-06-09",
          time: "10am-7pm",
          location: "YMCA Grounds, Nandanam",
          description: "One of Asia's largest annual book fairs, showcasing local and international publishers.",
        },
        {
          name: "Marina Beach Clean Up Drive",
          date: "2024-06-10",
          time: "6am-9am",
          location: "Marina Beach",
          description: "Join volunteers to help keep Chennai's iconic coastline clean.",
        },
        {
          name: "Chennai Food Festival",
          date: "2024-06-11",
          time: "1pm-10pm",
          location: "Chennai Trade Centre",
          description: "Savour authentic South Indian and international cuisine with music and entertainment.",
        },
        {
          name: "Carnatic Music Concert",
          date: "2024-06-12",
          time: "6pm-9pm",
          location: "Music Academy, TTK Road",
          description: "Experience the magic of classical music performed by renowned Chennai artists.",
        },
      ]);
    }, 350);
  }, []);

  // Search resources (syncs for resources page)
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setResourceResults(resources);
    } else {
      setResourceResults(
        resources.filter((r) =>
          Object.values(r)
            .join(" ")
            .toLowerCase()
            .includes(searchQuery.trim().toLowerCase())
        )
      );
    }
    // eslint-disable-next-line
  }, [searchQuery, resources]);

  // THEME COLORS
  const themeVars = {
    "--primary": "#000000",
    "--secondary": "#ff0000",
    "--accent": "#ffffff",
    "--base-dark": "#000000",
    "--base-light": "#ff0000",
    "--text-color": "#ffffff",
  };

  // ========== NAVBAR ========== //
  // PUBLIC_INTERFACE
  function Navbar() {
    // State for mobile menu
    const [mobileOpen, setMobileOpen] = React.useState(false);

    // Current route to highlight active (for SPA)
    const pathname = window.location.pathname;

    // Major nav routes for DRY rendering
    const NAV_LINKS = [
      { to: "/", label: "Home", match: ["/"] },
      { to: "/news", label: "News", match: ["/news"] },
      { to: "/resources", label: "Resources", match: ["/resources"] },
      { to: "/events", label: "Events", match: ["/events"] },
      { to: "/register", label: user ? "Account" : "Register", match: ["/register"] },
      { to: "/feedback", label: "Feedback", match: ["/feedback"] }
    ];

    // Detect if a given path is active (include / and subpages)
    function isActive(pathOrArr) {
      if (Array.isArray(pathOrArr)) return pathOrArr.includes(pathname);
      return pathname === pathOrArr;
    }

    // Close mobile menu on route change (SPA)
    React.useEffect(() => {
      setMobileOpen(false);
      // Listen to popstate for browser navigation (SPA)
      window.addEventListener("popstate", () => setMobileOpen(false));
      return () => window.removeEventListener("popstate", () => setMobileOpen(false));
    }, []);

    return (
      <>
        {/* Skip to main content for accessibility */}
        <a
          href="#main-content"
          className="skip-link"
          style={{
            position: "absolute", left: 0, top: 0, zIndex: 150,
            background: "#67DEF6", color: "#111", padding: "8px 18px",
            outline: "none", border: "none", borderRadius: 0,
            transform: "translateY(-120%)", transition: "transform 0.19s",
            fontWeight: 700, textDecoration: "none"
          }}
          onFocus={e => { e.target.style.transform = "translateY(0)"; }}
          onBlur={e => { e.target.style.transform = "translateY(-120%)"; }}
        >
          Skip to main content
        </a>
        <nav
          className="navbar"
          aria-label="Primary"
          style={{
            background: "linear-gradient(90deg,#101010 80%, var(--secondary) 130%)",
            borderBottom: "1.5px solid var(--border-color)",
            minHeight: 60, position: "fixed", width: "100%", zIndex: 100, top: 0
          }}
        >
          <div className="container" style={{ width: "100%" }}>
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", width: "100%",
              gap: 12
            }}>
              <Link
                to="/"
                className="logo"
                style={{
                  color: "var(--accent)", fontWeight: 700, fontSize: "1.33rem",
                  textDecoration: "none", letterSpacing: 0.01, display: "flex", alignItems: "center", gap: 10
                }}
                tabIndex={0}
                aria-label="Home – CommunityConnect Hub"
              >
                <span className="logo-symbol" style={{ color: "var(--secondary)", fontWeight: 900, fontSize: "1.3em" }}>◼</span>
                CommunityConnect Hub
              </Link>
              {/* Desktop Nav */}
              <nav
                className="navbar-links"
                style={{
                  display: "flex",
                  gap: 20,
                  alignItems: "center"
                }}
                aria-label="Main"
              >
                {NAV_LINKS.map((n) => (
                  <Link
                    key={n.to}
                    to={n.to}
                    aria-current={isActive(n.match) ? "page" : undefined}
                    style={{
                      ...navStyle,
                      position: "relative",
                      background: isActive(n.match)
                        ? "rgba(103,222,246,0.08)"
                        : "none",
                      color: isActive(n.match)
                        ? "#67DEF6"
                        : "var(--accent)",
                      borderBottom: isActive(n.match) ? "2.9px solid #67DEF6" : "2.3px solid transparent",
                      fontWeight: isActive(n.match) ? 700 : 500,
                      zIndex: isActive(n.match) ? 121 : undefined
                    }}
                    tabIndex={0}
                  >
                    {n.label}
                    {isActive(n.match) && (
                      <span className="screen-reader-only" style={{ position: "absolute" }}>
                        (current page)
                      </span>
                    )}
                  </Link>
                ))}
                {/* Hamburger for mobile - shown on small screens */}
                <button
                  className="navbar-burger"
                  aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"}
                  onClick={() => setMobileOpen((v) => !v)}
                  style={{
                    display: "none",
                    background: "none",
                    border: "none",
                    outline: "none",
                    padding: "3px 10px",
                    marginLeft: 8,
                    cursor: "pointer"
                  }}
                >
                  <span
                    style={{
                      display: "block",
                      width: 27, height: 3, background: "#67DEF6", borderRadius: 2,
                      boxShadow: "0 7px #67DEF6, 0 14px #67DEF6"
                    }}
                  >
                    {/* visually a burger icon (three bars) */}
                  </span>
                </button>
              </nav>

              {/* Inline burger for mobile (shown on small screens), toggles mobile menu */}
              <button
                className="navbar-burger"
                aria-label={mobileOpen ? "Close site navigation" : "Open site navigation"}
                onClick={() => setMobileOpen((v) => !v)}
                style={{
                  display: "none",
                  background: "none",
                  border: "none",
                  outline: "none",
                  padding: "2px 9px 2px 9px",
                  marginLeft: 2,
                  cursor: "pointer"
                }}
                tabIndex={0}
              >
                <span
                  aria-hidden="true"
                  style={{
                    display: "block",
                    width: 26, height: 3, background: "#67DEF6",
                    borderRadius: 2,
                    marginBottom: 4,
                    boxShadow: "0 7px #67DEF6, 0 14px #67DEF6"
                  }}
                ></span>
              </button>
            </div>
          </div>

          {/* Responsive Mobile Nav (dropdown, covers screen) */}
          <div
            className="navbar-mobile-menu"
            style={{
              display: mobileOpen ? "flex" : "none",
              flexDirection: "column",
              position: "fixed",
              top: 0,
              left: 0,
              width: "100vw",
              height: "100vh",
              background: "rgba(32,39,45,0.98)",
              backdropFilter: "blur(3px)",
              zIndex: 151,
              alignItems: "flex-start",
              padding: "80px 18px 20px 22px"
            }}
            aria-modal={mobileOpen ? "true" : undefined}
            role="dialog"
          >
            <button
              aria-label="Close navigation"
              onClick={() => setMobileOpen(false)}
              style={{
                background: "none",
                border: "none",
                color: "#fff",
                fontSize: 40,
                fontWeight: 700,
                alignSelf: "flex-end"
              }}>
              ×
            </button>
            {NAV_LINKS.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setMobileOpen(false)}
                aria-current={isActive(n.match) ? "page" : undefined}
                style={{
                  ...navStyle,
                  background: isActive(n.match)
                    ? "rgba(103,222,246,0.13)"
                    : "none",
                  color: isActive(n.match)
                    ? "#67DEF6" : "var(--accent)",
                  borderBottom: isActive(n.match)
                    ? "2.7px solid #67DEF6"
                    : "2.3px solid transparent",
                  fontSize: "1.11em",
                  marginBottom: 7,
                }}
                tabIndex={0}
              >
                {n.label}
                {isActive(n.match) && (
                  <span className="screen-reader-only" style={{ position: "absolute" }}>
                    (current page)
                  </span>
                )}
              </Link>
            ))}
          </div>
        </nav>
        {/* End Navbar */}
      </>
    );
  }

  // Quick Links to Community Resources
  function QuickLinks() {
    return (
      <section
        aria-label="Quick Links"
        style={{
          display: "flex",
          gap: "12px",
          justifyContent: "center",
          margin: "24px 0",
          flexWrap: "wrap",
        }}
      >
        <Link to="/resources" style={quickLinkStyle}>🏠 Shelters</Link>
        <Link to="/resources" style={quickLinkStyle}>🍽️ Food Banks</Link>
        <Link to="/resources" style={quickLinkStyle}>☎️ Emergency Contacts</Link>
        <Link to="/events" style={quickLinkStyle}>📅 Local Events</Link>
        <Link to="/register" style={quickLinkStyle}>👤 User Account</Link>
        <Link to="/feedback" style={quickLinkStyle}>💬 Send Feedback</Link>
      </section>
    );
  }

  // ========== MAIN RENDER ========== //
  return (
    <div className="app" style={themeVars}>
      <Router>
        <Navbar />
        <main id="main-content" style={{ marginTop: 75, paddingBottom: 40 }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route
                path="/news"
                element={<NewsPage />}
              />
              <Route
                path="/weather"
                element={<WeatherPage />}
              />
              <Route
                path="/events"
                element={<EventsPage events={events} />}
              />
              <Route
                path="/resources"
                element={
                  <ResourcesPage
                    resources={resources}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                    results={resourceResults}
                  />
                }
              />
              <Route
                path="/register"
                element={
                  <RegisterPage
                    user={user}
                    regForm={regForm}
                    setRegForm={setRegForm}
                    setUser={setUser}
                  />
                }
              />
              <Route
                path="/feedback"
                element={
                  <FeedbackPage
                    feedback={feedback}
                    setFeedback={setFeedback}
                  />
                }
              />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </main>
        {/* Accessible footer */}
        <footer
          style={{
            background: "var(--primary)",
            color: "var(--accent)",
            fontSize: 13,
            textAlign: "center",
            borderTop: "1px solid var(--border-color)",
            padding: "12px 0",
            width: "100%",
          }}
        >
          &copy; {new Date().getFullYear()} CommunityConnect Hub &mdash; Built for the Community.
        </footer>
      </Router>
    </div>
  );
}

// Styling helpers (inline, to keep single-file for App.js)
const navStyle = {
  color: "var(--accent)",
  fontWeight: 500,
  textDecoration: "none",
  outline: "none",
  padding: "3px 8px",
  borderRadius: 6,
  fontSize: ".97em",
  transition: "background 0.15s",
};

const quickLinkStyle = {
  background: "linear-gradient(90deg, #232323 70%, var(--secondary) 100%)",
  color: "var(--accent)",
  padding: "8px 18px",
  borderRadius: 8,
  fontWeight: 600,
  textDecoration: "none",
  fontSize: "1.02rem",
};

export default App;
