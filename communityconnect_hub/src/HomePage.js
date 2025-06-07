import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * CommunityConnect Hub - Home Page
 * Modern dark themed, accessible home for major features (News, Resources, Events, User/Account, Feedback)
 * Each card = main entry point with icon, descriptive text, and SPA navigation.
 * Accessible via keyboard and screen reader, visually engaging, responsive.
 */
function HomePage() {
  // Each feature card: icon, route, label, description, and ARIA
  const features = [
    {
      id: "news",
      icon: <NewspaperIcon />,
      title: "News",
      category: "Updates",
      desc: "Latest city headlines and updates relevant to the community. Stay informed.",
      to: "/news",
      bg: "#23262D",
      textColor: "#fff",
      ariaLabel: "Latest News"
    },
    {
      id: "resources",
      icon: <ResourcesIcon />,
      title: "Resources",
      category: "Directory",
      desc: "Find shelters, food banks, helplines, and crucial local resources.",
      to: "/resources",
      bg: "#00C46F",
      textColor: "#20272D",
      ariaLabel: "Community Resources"
    },
    {
      id: "events",
      icon: <EventsIcon />,
      title: "Events",
      category: "Community",
      desc: "Discover and submit local events happening in and around your city.",
      to: "/events",
      bg: "#60E1E0",
      textColor: "#20272D",
      ariaLabel: "Community Events"
    },
    {
      id: "user",
      icon: <UserIcon />,
      title: "Account",
      category: "User",
      desc: "Register or manage your account to receive alerts and personalize your experience.",
      to: "/register",
      bg: "#161E39",
      textColor: "#fff",
      ariaLabel: "User Registration and Account"
    },
    {
      id: "feedback",
      icon: <FeedbackIcon />,
      title: "Feedback",
      category: "Input",
      desc: "Submit suggestions, feedback, or let us know what features you'd like!",
      to: "/feedback",
      bg: "#F04C40",
      textColor: "#fff",
      ariaLabel: "Feedback and Suggestions"
    },
    {
      id: "about",
      icon: <AboutIcon />,
      title: "About",
      category: "Info",
      desc: "Learn more about CommunityConnect Hub and how we're building a stronger city.",
      to: "/resources",
      bg: "#B9BEC9",
      textColor: "#20272D",
      ariaLabel: "About CommunityConnect Hub"
    }
  ];

  return (
    <main className="homepage-main" aria-label="Key Features Home">
      <h1 className="screen-reader-only">Welcome to CommunityConnect Hub</h1>
      <section className="display-grid" aria-label="Feature Cards">
        {features.map((f) => (
          <Link
            to={f.to}
            key={f.id}
            className="feature-card"
            aria-label={f.ariaLabel}
            style={{
              background: f.bg,
              color: f.textColor,
              textDecoration: "none",
              outline: "none",
              cursor: "pointer",
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
            tabIndex={0}
            role="link"
            onKeyDown={e => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                e.target.click();
              }
            }}
          >
            <div
              className="feature-card-icon"
              aria-hidden="true"
              style={{
                borderRadius: "50%",
                background:
                  f.id === "resources"
                    ? "#fff"
                    : f.id === "about"
                    ? "#fff"
                    : "rgba(28,28,36,0.11)",
                boxShadow: f.id === "about" || f.id === "resources"
                  ? "0 2px 9px 0 #ddd9"
                  : "0 2px 12px 0 #19191622",
                padding: 4,
                marginBottom: 6,
                transition: "background 0.18s"
              }}
            >
              {React.cloneElement(f.icon, { color: f.textColor })}
            </div>
            <div className="feature-card-content" style={{ width: "100%", marginTop: 4 }}>
              <h2 className="feature-card-title">{f.title}</h2>
              <div className="feature-card-category" aria-hidden="true">{f.category}</div>
              <p className="feature-card-desc">{f.desc}</p>
            </div>
            <div
              className="feature-card-link"
              tabIndex={-1}
              aria-hidden="true"
              style={{
                pointerEvents: "none",
                color: "#67DEF6",
                fontWeight: 700
              }}
            >
              More
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}

// SVG ICONS (modern, performance-optimized, accessible)
function NewspaperIcon({ color = "#fff" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="News Icon" role="img" focusable="false">
      <rect x="6" y="14" width="36" height="22" rx="5" fill={color} opacity="0.13"/>
      <rect x="8" y="16" width="32" height="18" rx="3" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="12" y="21" width="20" height="4" rx="2" fill={color} opacity="0.7" />
      <rect x="12" y="27" width="10" height="3" rx="1.5" fill={color} opacity="0.36" />
      <circle cx="32" cy="28.5" r="2.5" fill={color} />
    </svg>
  );
}
function ResourcesIcon({ color = "#20272D" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Resources Icon" role="img" focusable="false">
      <rect x="11" y="24" width="26" height="10" rx="5" stroke={color} strokeWidth="2.2" fill="none"/>
      <rect x="11" y="14" width="26" height="8" rx="4" stroke={color} strokeWidth="2.2" fill="none"/>
      <circle cx="16" cy="28.5" r="2.5" fill={color} />
      <circle cx="32" cy="28.5" r="2.5" fill={color} />
      <rect x="19" y="18" width="10" height="5" rx="2.5" fill={color} opacity="0.65"/>
    </svg>
  );
}
function EventsIcon({ color = "#20272D" }) {
  return (
    <svg width="43" height="43" viewBox="0 0 48 48" fill="none" aria-label="Events Icon" role="img" focusable="false">
      <rect x="7" y="13" width="34" height="26" rx="5" stroke={color} strokeWidth="2.2" fill="none"/>
      <rect x="11" y="13.5" width="26" height="4" rx="2" fill={color} opacity="0.28"/>
      <rect x="18" y="23" width="5" height="5" rx="2" fill={color}/>
      <rect x="25" y="23" width="5" height="5" rx="2" fill={color}/>
      <rect x="18" y="30" width="5" height="5" rx="2" fill={color}/>
      <rect x="25" y="30" width="5" height="5" rx="2" fill={color}/>
      <circle cx="13.2" cy="17" r="2" fill={color} opacity="0.6"/>
      <circle cx="34.7" cy="17" r="2" fill={color} opacity="0.6"/>
    </svg>
  );
}
function UserIcon({ color = "#fff" }) {
  return (
    <svg width="43" height="43" viewBox="0 0 48 48" fill="none" aria-label="User/Account Icon" role="img" focusable="false">
      <circle cx="24" cy="18" r="7" stroke={color} strokeWidth="2.2" fill="none"/>
      <ellipse cx="24" cy="31.9" rx="12" ry="7.2" stroke={color} strokeWidth="2.2" fill="none"/>
    </svg>
  );
}
function FeedbackIcon({ color = "#fff" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Feedback Icon" role="img" focusable="false">
      <rect x="6" y="13" width="36" height="22" rx="7" stroke={color} strokeWidth="2.2" fill="none"/>
      <path d="M12 31v4c0 1.1.9 2 2 2h11l7 7v-7h2a2 2 0 0 0 2-2v-4" stroke={color} strokeWidth="2.1" fill="none"/>
      <circle cx="17" cy="24" r="2.5" fill={color} />
      <circle cx="24" cy="24" r="2.5" fill={color} />
      <circle cx="31" cy="24" r="2.5" fill={color} />
    </svg>
  );
}
function AboutIcon({ color = "#20272D" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="About Icon" role="img" focusable="false">
      <circle cx="24" cy="24" r="18" stroke={color} strokeWidth="2.2" fill="none"/>
      <rect x="20" y="20" width="8" height="13" rx="4" fill={color} opacity="0.6"/>
      <circle cx="24" cy="15" r="2.6" fill={color}/>
    </svg>
  );
}

export default HomePage;
