import React from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";

// PUBLIC_INTERFACE
/**
 * CommunityConnect Hub - Home Page
 * Implements a dark themed, accessible, responsive landing page with a two-row grid of feature cards.
 * Each card includes semantic markup, correct alt text, meaningful icons as inline SVGs for sharpness and accessibility.
 * Follows all layout, color, and accessibility requirements from assets/home_page_design_notes.md.
 */
function HomePage() {
  // Static card content: icon, background, heading, subtitle/category, desc, and route
  const cards = [
    {
      id: "brakes",
      icon: <BrakesIcon />,
      title: "BRAKES",
      category: "Safety",
      desc: "Stay up-to-date on brake safety and routine checkups for peace of mind.",
      moreLink: "/resources",
      bg: "#20272D",
      aria: "Brakes Card",
      textColor: "#fff",
      // icon: white, text: white
    },
    {
      id: "engine",
      icon: <EngineIcon />,
      title: "ENGINE",
      category: "Maintenance",
      desc: "Learn about best practices for engine upkeep and troubleshooting tips.",
      moreLink: "/resources",
      bg: "#B9BEC9",
      aria: "Engine Card",
      textColor: "#20272D",
      iconColor: "#20272D"
    },
    {
      id: "performance",
      icon: <PerformanceIcon />,
      title: "ENGINE PERFORMANCE",
      category: "Performance",
      desc: "Track and optimize your vehicle's engine performance with real-time analytics.",
      moreLink: "/news",
      bg: "#F04C40",
      aria: "Engine Performance Card",
      textColor: "#fff"
    },
    {
      id: "trouble-codes",
      icon: <CodesIcon />,
      title: "TROUBLE CODES",
      category: "Diagnostics",
      desc: "Decode errors quickly and get guidance to resolve your vehicle’s trouble codes.",
      moreLink: "/resources",
      bg: "#00C46F",
      aria: "Trouble Codes Card",
      textColor: "#fff"
    },
    {
      id: "drivetrain",
      icon: <DrivetrainIcon />,
      title: "DRIVETRAIN",
      category: "Mobility",
      desc: "Insights into drivetrain health and technology powering your commute.",
      moreLink: "/events",
      bg: "#60E1E0",
      aria: "Drivetrain Card",
      textColor: "#20272D",
      iconColor: "#20272D"
    },
    {
      id: "body",
      icon: <BodyIcon />,
      title: "BODY",
      category: "Structure",
      desc: "Tips for maintaining your vehicle’s exterior and understanding structural care.",
      moreLink: "/resources",
      bg: "#161E39",
      aria: "Body Card",
      textColor: "#fff"
    },
  ];

  return (
    <main className="homepage-main" aria-label="Home features">
      <h1 className="screen-reader-only">Welcome to CommunityConnect Hub Home</h1>
      <section className="feature-grid display-grid">
        {cards.map((card, idx) => (
          <section
            key={card.id}
            className="feature-card"
            aria-label={card.aria}
            style={{
              background: card.bg,
              color: card.textColor,
            }}
            tabIndex={-1}
          >
            <div className="feature-card-icon" aria-hidden="true">
              {/* Icon color adapts for contrast */}
              {React.cloneElement(card.icon, { 
                color: card.iconColor ? card.iconColor : "#fff"
              })}
            </div>
            <div className="feature-card-content">
              <h2 className="feature-card-title">{card.title}</h2>
              <div className="feature-card-category">{card.category}</div>
              <p className="feature-card-desc">{card.desc}</p>
            </div>
            <Link
              to={card.moreLink}
              className="feature-card-link"
              tabIndex={0}
              aria-label={`More about ${card.title.replace(/_/g, " ")} (${card.category})`}
            >
              More
            </Link>
          </section>
        ))}
      </section>
    </main>
  );
}

// SVG icons (accessible, deterministic for inlining)
function BrakesIcon({ color = "#fff" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Brakes Icon" role="img">
      <circle cx="24" cy="24" r="19" stroke={color} strokeWidth="4" fill="none"/>
      <circle cx="24" cy="24" r="6.7" stroke={color} strokeWidth="2.5" fill="none"/>
      <rect x="10" y="22" width="10" height="4" rx="2" fill={color} opacity="0.7"/>
      <rect x="28" y="22" width="10" height="4" rx="2" fill={color} opacity="0.7"/>
    </svg>
  );
}
function EngineIcon({ color = "#20272D" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Engine Icon" role="img">
      <rect x="6" y="16" width="36" height="16" rx="6" fill={color} stroke={color} strokeWidth="2"/>
      <rect x="11" y="13" width="6" height="6" rx="2" fill={color} />
      <rect x="31" y="13" width="6" height="6" rx="2" fill={color} />
      <rect x="20" y="7" width="8" height="12" rx="3" fill={color} />
      <rect x="18" y="32" width="12" height="6" rx="3" fill={color} />
    </svg>
  );
}
function PerformanceIcon({ color = "#fff" }) {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" aria-label="Engine Performance Icon" role="img">
      <polyline points="8,32 18,26 24,30 32,22 40,30" fill="none" stroke={color} strokeWidth="3"/>
      <circle cx="8" cy="32" r="3" fill={color}/>
      <circle cx="18" cy="26" r="3" fill={color}/>
      <circle cx="24" cy="30" r="3" fill={color}/>
      <circle cx="32" cy="22" r="3" fill={color}/>
      <circle cx="40" cy="30" r="3" fill={color}/>
    </svg>
  );
}
function CodesIcon({ color = "#fff" }) {
  return (
    <svg width="42" height="42" viewBox="0 0 48 48" fill="none" aria-label="Trouble Codes Icon" role="img">
      <rect x="14" y="14" width="20" height="20" rx="6" stroke={color} strokeWidth="2" fill="none"/>
      <path d="M24 18v6" stroke={color} strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="24" cy="29" r="1.5" fill={color}/>
    </svg>
  );
}
function DrivetrainIcon({ color = "#20272D" }) {
  return (
    <svg width="44" height="44" viewBox="0 0 48 48" fill="none" aria-label="Drivetrain Icon" role="img">
      <rect x="16" y="10" width="16" height="8" rx="3" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="8" y="18" width="32" height="8" rx="4" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="18" y="32" width="12" height="6" rx="3" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="21" y="26" width="6" height="6" rx="1.5" fill={color} />
    </svg>
  );
}
function BodyIcon({ color = "#fff" }) {
  return (
    <svg width="46" height="46" viewBox="0 0 48 48" fill="none" aria-label="Body Icon" role="img">
      <rect x="8" y="24" width="32" height="12" rx="6" stroke={color} strokeWidth="2" fill="none"/>
      <rect x="12" y="16" width="24" height="10" rx="5" stroke={color} strokeWidth="2" fill="none"/>
      <circle cx="16" cy="36" r="3" fill={color}/>
      <circle cx="32" cy="36" r="3" fill={color}/>
    </svg>
  );
}

export default HomePage;
