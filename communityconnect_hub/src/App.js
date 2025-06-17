import React, { useEffect } from "react";
import "./App.css";
import { darkThemeStyles } from "./Theme";
import NewsFeed from "./components/NewsFeed";
import WeatherWidget from "./components/WeatherWidget";
import EventsBoard from "./components/EventsBoard";
import ResourcesDirectory from "./components/ResourcesDirectory";
import RegisterUser from "./components/RegisterUser";
import FeedbackForm from "./components/FeedbackForm";

// PUBLIC_INTERFACE
function App() {
  // Inject dark theme CSS variables
  useEffect(() => {
    for (const key in darkThemeStyles) {
      document.documentElement.style.setProperty(key, darkThemeStyles[key]);
    }
  }, []);

  return (
    <div className="cc-app">
      <nav className="cc-navbar">
        <div className="cc-navbar-content">
          <div className="cc-logo">
            <span className="cc-logo-symbol">◎</span> CommunityConnect Hub
          </div>
          <div className="cc-nav-links">
            <a href="#news">News</a>
            <a href="#weather">Weather</a>
            <a href="#events">Events</a>
            <a href="#resources">Resources</a>
            <a href="#register">Register</a>
            <a href="#feedback">Feedback</a>
          </div>
        </div>
      </nav>

      <main className="cc-main">
        <section className="cc-hero">
          <h1 className="cc-title">Welcome to the CommunityConnect Hub</h1>
          <div className="cc-searchbar">
            <input
              className="cc-input"
              placeholder="Search community resources, news, or events..."
              aria-label="Search CommunityConnect Hub"
            />
            <button className="cc-btn cc-btn-accent">Search</button>
          </div>
          <div className="cc-quick-links">
            <a href="#resources" className="cc-btn cc-btn-secondary">Quick Resources</a>
            <a href="#events" className="cc-btn">Upcoming Events</a>
            <a href="#register" className="cc-btn cc-btn-accent">Join the Hub</a>
          </div>
        </section>

        <section className="cc-dashboard">
          <div className="cc-dashboard-row">
            <div className="cc-dashboard-col" id="news">
              <NewsFeed />
            </div>
            <div className="cc-dashboard-col" id="weather">
              <WeatherWidget />
            </div>
            <div className="cc-dashboard-col" id="events">
              <EventsBoard />
            </div>
          </div>
        </section>

        <section className="cc-wide-section" id="resources">
          <ResourcesDirectory />
        </section>

        <section className="cc-wide-section" id="register">
          <RegisterUser />
        </section>

        <section className="cc-wide-section" id="feedback">
          <FeedbackForm />
        </section>
      </main>

      <footer className="cc-footer">
        <div>
          &copy; {new Date().getFullYear()} CommunityConnect Hub. Serving your community. 
        </div>
      </footer>
    </div>
  );
}

export default App;