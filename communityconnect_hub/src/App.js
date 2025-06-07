import React, { useState, useEffect } from "react";
import "./App.css";

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

  // Search resources
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
  }, [searchQuery]);

  // Handler: Registration
  // PUBLIC_INTERFACE
  function handleRegister(e) {
    e.preventDefault();
    setUser({ ...regForm });
  }

  // Handler: Feedback
  // PUBLIC_INTERFACE
  function handleFeedback(e) {
    e.preventDefault();
    setFeedback({ ...feedback, submitted: true });
  }

  // Handler: Change Registration Fields
  function handleRegChange(e) {
    const { name, value, type, checked } = e.target;
    setRegForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  }

  // Handler: Change Feedback Field
  function handleFeedbackChange(e) {
    const { value } = e.target;
    setFeedback((prev) => ({ ...prev, message: value, submitted: false }));
  }

  // THEME COLORS
  const themeVars = {
    "--primary": "#000000",
    "--secondary": "#ff0000",
    "--accent": "#ffffff",
    "--base-dark": "#000000",
    "--base-light": "#ff0000",
    "--text-color": "#ffffff",
  };

  // COMPONENTS

  // Navigation Bar
  function Navbar() {
    return (
      <nav className="navbar" style={{ background: "var(--primary)" }}>
        <div className="container" style={{ width: "100%" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              alignItems: "center",
            }}
          >
            <div className="logo" style={{ color: "var(--accent)" }}>
              <span className="logo-symbol" style={{ color: "var(--secondary)", fontWeight: 900 }}>
                ◼
              </span>{" "}
              CommunityConnect Hub
            </div>
            <nav style={{ display: "flex", gap: 20 }}>
              <a href="#news" style={navStyle}>
                News
              </a>
              <a href="#weather" style={navStyle}>
                Weather
              </a>
              <a href="#events" style={navStyle}>
                Events
              </a>
              <a href="#resources" style={navStyle}>
                Resources
              </a>
              <a href="#account" style={navStyle}>
                {user ? "Account" : "Register"}
              </a>
              <a href="#feedback" style={navStyle}>
                Feedback
              </a>
            </nav>
          </div>
        </div>
      </nav>
    );
  }

  // Search Bar
  function SearchBar() {
    return (
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
            outline: "none",
          }}
        />
      </form>
    );
  }

  // Dashboard Widgets
  function DashboardWidgets() {
    return (
      <section
        className="dashboard"
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "18px",
          justifyContent: "center",
          margin: "32px 0",
        }}
      >
        <WeatherWidget />
        <NewsWidget />
        <EventsWidget />
      </section>
    );
  }

  // Weather
  function WeatherWidget() {
    return (
      <div className="widget" id="weather" style={widgetStyle}>
        <h3 style={widgetTitleStyle}>Weather</h3>
        {weather ? (
          <div style={{ textAlign: "center" }}>
            <span style={{ fontSize: "2.5rem" }}>{weather.icon}</span>
            <div>
              <span style={{ fontWeight: "bold" }}>
                {weather.temperature}°F
              </span>{" "}
              - {weather.description}
            </div>
            <div style={{ color: "var(--text-secondary)", fontSize: 13 }}>
              {weather.location}
            </div>
          </div>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }

  // News
  function NewsWidget() {
    return (
      <div className="widget" id="news" style={widgetStyle}>
        <h3 style={widgetTitleStyle}>Latest News</h3>
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
          <LoadingIndicator />
        )}
      </div>
    );
  }

  // Events
  function EventsWidget() {
    return (
      <div className="widget" id="events" style={widgetStyle}>
        <h3 style={widgetTitleStyle}>
          Chennai Events <span role="img" aria-label="Chennai">🛕</span>
        </h3>
        {events.length ? (
          <ul style={{ padding: 0, margin: 0, listStyle: "none" }}>
            {events.map((ev, idx) => (
              <li
                key={idx}
                style={{
                  marginBottom: 18,
                  background: "#181f25",
                  borderRadius: 9,
                  border: "1.2px solid var(--border-color)",
                  boxShadow: "0 1px 7px 0 #0002",
                  padding: "13px 14px"
                }}
                tabIndex={0}
                aria-label={`Event: ${ev.name} on ${ev.date} at ${ev.location}`}
              >
                <div style={{ fontWeight: 600, fontSize: "1.12em", color: "var(--accent)", marginBottom: 2 }}>
                  {ev.name}
                </div>
                <div style={{ fontSize: ".98em", color: "var(--secondary)", fontWeight: 500, letterSpacing: 0.2 }}>
                  {ev.date} &mdash; {ev.time}
                </div>
                <div style={{ fontSize: ".97em", marginTop: 2, color: "#fff9" }}>
                  <span style={{ fontWeight: 500, color: "var(--text-secondary)" }}>Venue:</span> {ev.location}
                </div>
                {ev.description && (
                  <div style={{ marginTop: 6, color: "#d1dbe6", fontSize: ".96em", lineHeight: 1.4 }}>
                    {ev.description}
                  </div>
                )}
              </li>
            ))}
          </ul>
        ) : (
          <LoadingIndicator />
        )}
      </div>
    );
  }

  // Community Resources Directory
  function ResourcesDirectory() {
    return (
      <section className="resources-section" id="resources">
        <h2 style={{ margin: "30px 0 10px", color: "var(--accent)" }}>
          Community Resources
        </h2>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 14 }}>
          {resourceResults.length === 0 && (
            <div style={{ color: "var(--text-secondary)" }}>No results found.</div>
          )}
          {resourceResults.map((res, idx) => (
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
                color: "var(--accent)",
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
          Missing a resource? <a href="#feedback" style={{ color: "var(--secondary)" }}>Let us know</a>.
        </div>
      </section>
    );
  }

  // User Registration / Account Area
  function UserSection() {
    return (
      <section className="user-section" id="account" style={{ marginTop: 42 }}>
        <h2 style={{ color: "var(--accent)" }}>
          {user ? "Your Account" : "Register for Updates"}
        </h2>
        {user ? (
          <div
            style={{
              background: "#181818",
              color: "var(--accent)",
              padding: 22,
              borderRadius: 10,
              border: "1.2px solid var(--border-color)",
              maxWidth: 350,
              marginBottom: 14,
            }}
          >
            <div style={{ fontWeight: 500, fontSize: "1.1em" }}>
              Hello, {user.name ? user.name : "User"}!
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)" }}>Email:</span>{" "}
              {user.email || ""}
            </div>
            <div>
              <span style={{ color: "var(--text-secondary)" }}>
                Subscribed to Alerts:
              </span>{" "}
              {user.subscribe ? "Yes" : "No"}
            </div>
            <button
              className="btn"
              style={{ marginTop: 10, background: "var(--secondary)" }}
              onClick={() => setUser(null)}
            >
              Log Out
            </button>
          </div>
        ) : (
          <form
            style={{
              background: "#181818",
              padding: 22,
              borderRadius: 10,
              maxWidth: 350,
              border: "1.2px solid var(--border-color)",
              color: "var(--accent)",
            }}
            onSubmit={handleRegister}
            aria-label="User Registration"
          >
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="reg-name" style={labelStyle}>
                Name
              </label>
              <input
                id="reg-name"
                name="name"
                style={inputStyle}
                type="text"
                value={regForm.name}
                maxLength={32}
                required
                onChange={handleRegChange}
                autoComplete="name"
                autoFocus
              />
            </div>
            <div style={{ marginBottom: 14 }}>
              <label htmlFor="reg-email" style={labelStyle}>
                Email
              </label>
              <input
                id="reg-email"
                name="email"
                style={inputStyle}
                type="email"
                required
                value={regForm.email}
                maxLength={48}
                onChange={handleRegChange}
                autoComplete="email"
              />
            </div>
            <div style={{ marginBottom: 6 }}>
              <label style={{ fontSize: "1em" }}>
                <input
                  type="checkbox"
                  name="subscribe"
                  checked={regForm.subscribe}
                  onChange={handleRegChange}
                  style={{ marginRight: 7, transform: "scale(1.1)" }}
                />
                Subscribe to alerts/updates
              </label>
            </div>
            <button
              className="btn"
              style={{ background: "var(--secondary)" }}
              type="submit"
            >
              Register
            </button>
          </form>
        )}
      </section>
    );
  }

  // Feedback Form
  function FeedbackSection() {
    return (
      <section
        className="feedback-section"
        id="feedback"
        style={{
          marginTop: 42,
          background: "#121212",
          padding: "24px 14px",
          borderRadius: 10,
          maxWidth: 420,
        }}
      >
        <h2 style={{ color: "var(--accent)" }}>Send Feedback or Request a Feature</h2>
        <form onSubmit={handleFeedback} aria-label="Feedback Form">
          <textarea
            name="feedback"
            value={feedback.message}
            maxLength={500}
            required
            placeholder="Let us know your ideas, issues, or suggestions..."
            rows={4}
            onChange={handleFeedbackChange}
            style={{
              width: "100%",
              borderRadius: 6,
              padding: "10px 12px",
              border: "1.1px solid var(--secondary)",
              background: "#181818",
              color: "var(--accent)",
              fontSize: "1rem",
              marginBottom: 10,
            }}
          />
          <br />
          <button
            className="btn"
            style={{ background: "var(--secondary)" }}
            type="submit"
            disabled={feedback.message.trim() === ""}
          >
            Submit
          </button>
        </form>
        {feedback.submitted && (
          <div
            style={{
              color: "var(--accent)",
              marginTop: 12,
              background: "#163216",
              borderRadius: 7,
              padding: "8px 12px",
              border: "1px solid #33FF33",
              fontSize: 16,
            }}
          >
            Thank you for your feedback!
          </div>
        )}
      </section>
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
        <a href="#resources" style={quickLinkStyle}>
          🏠 Shelters
        </a>
        <a href="#resources" style={quickLinkStyle}>
          🍽️ Food Banks
        </a>
        <a href="#resources" style={quickLinkStyle}>
          ☎️ Emergency Contacts
        </a>
        <a href="#events" style={quickLinkStyle}>
          📅 Local Events
        </a>
        <a href="#account" style={quickLinkStyle}>
          👤 User Account
        </a>
        <a href="#feedback" style={quickLinkStyle}>
          💬 Send Feedback
        </a>
      </section>
    );
  }

  // Loading Indicator
  function LoadingIndicator() {
    return (
      <div style={{ textAlign: "center", color: "var(--accent)" }}>
        <svg
          style={{ margin: "10px auto", display: "block" }}
          width="28"
          height="28"
          viewBox="0 0 38 38"
          xmlns="http://www.w3.org/2000/svg"
          stroke="var(--secondary)"
        >
          <g fill="none" fillRule="evenodd">
            <g transform="translate(1 1)" strokeWidth="2">
              <circle strokeOpacity=".5" cx="18" cy="18" r="18" />
              <path d="M36 18c0-9.94-8.06-18-18-18">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 18 18"
                  to="360 18 18"
                  dur="0.8s"
                  repeatCount="indefinite"
                />
              </path>
            </g>
          </g>
        </svg>
      </div>
    );
  }

  // ========== MAIN RENDER ==========
  return (
    <div className="app" style={themeVars}>
      <Navbar />
      <main style={{ marginTop: 70, paddingBottom: 40 }}>
        <div className="container">
          {/* Hero Section */}
          <div
            className="hero"
            style={{
              paddingTop: 50,
              paddingBottom: 36,
              textAlign: "center",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div className="subtitle" style={{ color: "var(--secondary)" }}>
              Empowering our Community
            </div>
            <h1 className="title" style={{ color: "var(--accent)", fontWeight: 800 }}>
              CommunityConnect Hub
            </h1>
            <div
              className="description"
              style={{ maxWidth: 650, color: "var(--text-secondary)", marginBottom: 4 }}
            >
              Central Hub for real-time local news, community resources, weather,
              events, and more. Your one-stop destination for support, updates,
              and engagement.
            </div>
            {/* Prominent Search Bar */}
            <SearchBar />
            <QuickLinks />
          </div>
          {/* Dashboard Area */}
          <DashboardWidgets />

          {/* Resources Directory */}
          <ResourcesDirectory />

          {/* User Registration/Account Section */}
          <UserSection />

          {/* Feedback System */}
          <FeedbackSection />
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

const widgetStyle = {
  background: "#181818",
  border: "1.5px solid var(--border-color)",
  borderRadius: 12,
  padding: "20px 18px",
  minWidth: 220,
  maxWidth: 310,
  flex: "1 1 200px",
  color: "var(--accent)",
  boxShadow: "0 2px 15px 0 rgba(20,0,30,0.09)",
};

const widgetTitleStyle = {
  color: "var(--secondary)",
  marginTop: 0,
  marginBottom: 14,
  fontSize: "1.2em",
  fontWeight: 700,
  textAlign: "left",
};

const inputStyle = {
  width: "100%",
  borderRadius: 5,
  padding: "9px 13px",
  fontSize: "1rem",
  outline: "none",
  background: "#222",
  color: "var(--accent)",
  border: "1.1px solid var(--secondary)",
  marginTop: 3,
};

const labelStyle = {
  display: "block",
  color: "var(--text-secondary)",
  marginBottom: 3,
  fontWeight: 500,
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
