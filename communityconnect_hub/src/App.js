import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";

import NewsPage from "./NewsPage";
import WeatherPage from "./WeatherPage";
import EventsPage from "./EventsPage";
import ResourcesPage from "./ResourcesPage";
import RegisterPage from "./RegisterPage";
import FeedbackPage from "./FeedbackPage";

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
              <Link to="/news" style={navStyle}>News</Link>
              <Link to="/weather" style={navStyle}>Weather</Link>
              <Link to="/events" style={navStyle}>Events</Link>
              <Link to="/resources" style={navStyle}>Resources</Link>
              <Link to="/register" style={navStyle}>{user ? "Account" : "Register"}</Link>
              <Link to="/feedback" style={navStyle}>Feedback</Link>
            </nav>
          </div>
        </div>
      </nav>
    );
  }

  // ========== LANDING/HOME ========== //
  function Home() {
    return (
      <>
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
          <div style={{ marginTop: 22, marginBottom: 0 }}>
            <QuickLinks />
          </div>
        </div>
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
          <WeatherPage />
          <NewsPage />
          <EventsPage events={events} />
        </section>
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
        <main style={{ marginTop: 70, paddingBottom: 40 }}>
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
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
