import React, { useState, useEffect } from 'react';
import './App.css';

/**
 * Color and theme variables based on specification:
 * primary: #000000 (black)
 * secondary: #ff0000 (red)
 * accent: #ffffff (white)
 * Uses a dark theme throughout.
 */

// Mock APIs for demonstration purposes. Replace endpoints with real ones for live data.

const NEWS_API = 'https://api.currentsapi.services/v1/latest-news?apiKey=demo';
const WEATHER_API = 'https://api.open-meteo.com/v1/forecast?latitude=40.7128&longitude=-74.006&current_weather=true';
const EVENTS_API = 'https://api.publicapis.org/entries?category=Events'; // Not real events! Replace with a true local event API.

const COMMUNITY_RESOURCES = [
  { name: 'Central Shelter', type: 'Shelter', phone: '555-1212', address: '123 Main St', link: 'https://centralshelter.org' },
  { name: 'Food Bank', type: 'Food Bank', phone: '555-3434', address: '456 Oak Ave', link: 'https://foodbank.org' },
  { name: 'Emergency Services', type: 'Emergency', phone: '911', address: 'N/A', link: null },
];

// PUBLIC_INTERFACE
function App() {
  // HOOKS FOR STATE
  const [news, setNews] = useState([]);
  const [weather, setWeather] = useState(null);
  const [events, setEvents] = useState([]);
  const [search, setSearch] = useState('');
  const [activeSection, setActiveSection] = useState('dashboard');
  const [user, setUser] = useState(null);
  const [registrationOpen, setRegistrationOpen] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbacks, setFeedbacks] = useState([]);

  // API FETCHING LOGIC
  useEffect(() => {
    fetchNews();
    fetchWeather();
    fetchEvents();
  }, []);

  // Fallback static events for simulation
  const STATIC_EVENTS = [
    {
      name: "Open Mic Night",
      date: "2024-07-08",
      location: "Community Hall",
      description: "Share music, poetry, or comedy with your neighbors!",
      link: "https://events.example.com/open-mic",
    },
    {
      name: "Food Drive Pickup",
      date: "2024-07-10",
      location: "Main Square",
      description: "Bring nonperishable foods to support local families.",
      link: "https://events.example.com/food-drive",
    },
    {
      name: "Summer Park Clean-Up",
      date: "2024-07-15",
      location: "Lakeside Park",
      description: "Volunteer to help keep our parks clean and green.",
      link: "https://events.example.com/cleanup",
    },
  ];

  // PUBLIC_INTERFACE
  async function fetchNews() {
    try {
      const res = await fetch(NEWS_API);
      const data = await res.json();
      setNews(Array.isArray(data.news) ? data.news.slice(0, 5) : []);
    } catch {
      setNews([]);
    }
  }

  // PUBLIC_INTERFACE
  async function fetchWeather() {
    try {
      const res = await fetch(WEATHER_API);
      const data = await res.json();
      setWeather(data.current_weather || null);
    } catch {
      setWeather(null);
    }
  }

  // PUBLIC_INTERFACE
  async function fetchEvents() {
    try {
      // Demo endpoint; replace with real local events API for production use.
      const res = await fetch(EVENTS_API);
      const data = await res.json();
      setEvents(Array.isArray(data.entries) ? data.entries.slice(0, 5) : []);
    } catch {
      setEvents([]);
    }
  }

  // PUBLIC_INTERFACE
  function handleSectionChange(section) {
    setActiveSection(section);
    setRegistrationOpen(false);
    setFeedbackOpen(false);
  }

  // PUBLIC_INTERFACE
  function handleUserRegister(userData) {
    setUser(userData);
    setRegistrationOpen(false);
  }

  // PUBLIC_INTERFACE
  function handleLogout() {
    setUser(null);
  }

  // PUBLIC_INTERFACE
  function handleFeedbackSubmit(newFeedback) {
    setFeedbacks([newFeedback, ...feedbacks]);
    setFeedbackOpen(false);
  }

  // Filter resources by search string
  const filteredResources = COMMUNITY_RESOURCES.filter(
    res =>
      res.name.toLowerCase().includes(search.toLowerCase()) ||
      res.type.toLowerCase().includes(search.toLowerCase()) ||
      res.phone.includes(search)
  );

  // Prepare events for dashboard: merged list for UX continuity
  const dashboardEvents =
    Array.isArray(events) && events.length > 0
      ? events.map(e =>
          e.name && e.date
            ? e
            : {
                name: e.API || "Untitled Event",
                date: "",
                location: "",
                description: e.Description || "",
                link: e.Link || "",
              }
        )
      : STATIC_EVENTS;

  return (
    <div className="app" style={{ background: 'var(--base-dark)', color: 'var(--text-color)' }}>
      <Navbar
        onNav={handleSectionChange}
        active={activeSection}
        user={user}
        onRegister={() => setRegistrationOpen(true)}
        onLogout={handleLogout}
      />
      <div style={{ paddingTop: 72 }} />
      <main>
        <div className="container">
          {/* HOMEPAGE DASHBOARD */}
          {activeSection === 'dashboard' && (
            <div>
              <HeroHeader />
              <section style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: 48 }}>
                <SearchBar value={search} onChange={setSearch} />
                <QuickLinks onNav={handleSectionChange} />
                <InfoDashboard news={news} weather={weather} events={dashboardEvents} />
                {/* Events Section */}
                <EventsSection events={dashboardEvents} />
              </section>
            </div>
          )}

          {/* RESOURCES DIRECTORY */}
          {activeSection === 'resources' && (
            <section style={{ margin: '24px 0' }}>
              <h2>Community Resources Directory</h2>
              <SearchBar value={search} onChange={setSearch} placeholder="Search Directory..." />
              <ResourcesDirectory resources={filteredResources} />
            </section>
          )}

          {/* EVENTS */}
          {activeSection === 'events' && (
            <section style={{ margin: '24px 0' }}>
              <h2>Local Events</h2>
              <EventList events={events} />
            </section>
          )}

          {/* NEWS */}
          {activeSection === 'news' && (
            <section style={{ margin: '24px 0' }}>
              <h2>Community News</h2>
              <NewsList news={news} />
            </section>
          )}

          {/* ACCOUNT/Profile */}
          {activeSection === 'account' && (
            <section style={{ margin: '24px 0' }}>
              {user ? (
                <UserProfile user={user} onLogout={handleLogout} />
              ) : (
                <div>
                  <p>Please register to personalize your experience.</p>
                  <button className="btn btn-large" onClick={() => setRegistrationOpen(true)}>
                    Register
                  </button>
                </div>
              )}
            </section>
          )}

          {/* FEEDBACK */}
          {activeSection === 'feedback' && (
            <section style={{ margin: '24px 0' }}>
              <FeedbackList feedbacks={feedbacks} />
              <button className="btn" onClick={() => setFeedbackOpen(true)}>
                Leave Feedback
              </button>
            </section>
          )}

          {/* Modals for Registration and Feedback */}
          {registrationOpen && (
            <Modal onClose={() => setRegistrationOpen(false)}>
              <UserRegistration onRegister={handleUserRegister} />
            </Modal>
          )}
          {feedbackOpen && (
            <Modal onClose={() => setFeedbackOpen(false)}>
              <FeedbackForm onSubmit={handleFeedbackSubmit} />
            </Modal>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}

// PUBLIC_INTERFACE
function Navbar({ onNav, active, user, onRegister, onLogout }) {
  return (
    <nav className="navbar" style={{ backgroundColor: '#000000', borderBottom: '1px solid #222' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', width: '100%', justifyContent: 'space-between' }}>
        <div className="logo" style={{ color: '#ffffff' }}>
          <span className="logo-symbol" style={{ color: '#ff0000', fontSize: '1.8rem', fontWeight: 900 }}>◎</span>
          CommunityConnect Hub
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <NavLink onClick={() => onNav('dashboard')} active={active === 'dashboard'}>Home</NavLink>
          <NavLink onClick={() => onNav('resources')} active={active === 'resources'}>Resources</NavLink>
          <NavLink onClick={() => onNav('events')} active={active === 'events'}>Events</NavLink>
          <NavLink onClick={() => onNav('news')} active={active === 'news'}>News</NavLink>
          <NavLink onClick={() => onNav('feedback')} active={active === 'feedback'}>Feedback</NavLink>
          <NavLink onClick={() => onNav('account')} active={active === 'account'}>
            {user ? user.name : "Register"}
          </NavLink>
          {user && (
            <button className="btn" style={{ backgroundColor: '#222', color: '#ff0000', border: '1px solid #ff0000', marginLeft: 8 }} onClick={onLogout}>
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

// PUBLIC_INTERFACE
function NavLink({ children, onClick, active }) {
  const color = active ? '#ff0000' : '#ffffff';
  return (
    <button onClick={onClick}
      style={{
        background: 'none',
        border: 'none',
        color: color,
        fontWeight: active ? 700 : 400,
        fontSize: '1rem',
        padding: '8px 10px',
        margin: 0,
        cursor: 'pointer'
      }}>
      {children}
    </button>
  );
}

// PUBLIC_INTERFACE
function HeroHeader() {
  return (
    <div className="hero">
      <div className="subtitle">Welcome to the</div>
      <h1 className="title" style={{ color: '#ffffff', fontWeight: 700 }}>
        CommunityConnect Hub <span style={{ color: '#ff0000' }}>●</span>
      </h1>
      <div className="description" style={{ color: '#bbbbbb' }}>
        One central platform for <b>local news</b>, <b>events</b>, <b>community resources</b>, and emergency support. Stay connected, stay safe, and help your neighborhood thrive.
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function SearchBar({ value, onChange, placeholder }) {
  return (
    <div style={{ width: '100%', margin: '0 auto' }}>
      <input
        type="text"
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder || "Search for resources, news, events..."}
        style={{
          width: '100%',
          padding: '12px 16px',
          borderRadius: 6,
          border: '1px solid #ff0000',
          background: '#111c',
          color: '#fff',
          fontSize: '1.1rem',
          marginBottom: 8,
          outline: 'none'
        }}
        autoComplete="off"
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function QuickLinks({ onNav }) {
  // Quick resource links (visible on homepage only)
  const links = [
    { label: 'Shelters', section: 'resources' },
    { label: 'Emergency Contacts', section: 'resources' },
    { label: 'Food Banks', section: 'resources' },
    { label: 'Events', section: 'events' },
    { label: 'Register', section: 'account' },
    { label: 'Community News', section: 'news' },
    { label: 'Feedback', section: 'feedback' },
  ];
  return (
    <div style={{
      display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 16, margin: '16px 0'
    }}>
      {links.map(({ label, section }) => (
        <button key={label}
          className="btn"
          style={{
            background: '#ff0000',
            color: '#fff',
            borderRadius: 32,
            fontSize: '1rem',
            fontWeight: 500,
            minWidth: 120
          }}
          onClick={() => onNav(section)}
        >{label}</button>
      ))}
    </div>
  );
}

// PUBLIC_INTERFACE
function InfoDashboard({ news, weather, events }) {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: 32,
        justifyContent: 'space-between',
        alignItems: 'stretch',
        margin: '32px 0'
      }}
    >
      <DashboardCard
        title="Weather"
        content={<WeatherCard weather={weather} />}
        accent="#ff0000"
      />
      <DashboardCard
        title="Latest News"
        content={<NewsList news={news} compact />}
        accent="#000000"
      />
      <DashboardCard
        title="Upcoming Events"
        content={<EventList events={events} compact />}
        accent="#ffffff"
        dark
      />
    </div>
  );
}

// PUBLIC_INTERFACE
function DashboardCard({ title, content, accent, dark }) {
  return (
    <div
      style={{
        flex: 1,
        minWidth: 240,
        background: dark ? '#111' : '#111c',
        borderRadius: 12,
        padding: 20,
        boxShadow: '0 2px 16px rgba(0,0,0,0.16)',
        borderTop: `3px solid ${accent || '#ff0000'}`,
        marginBottom: 8,
        minHeight: 210,
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <div style={{ fontWeight: 700, color: accent, fontSize: '1.2rem', marginBottom: 10 }}>{title}</div>
      <div style={{ flex: 1 }}>{content}</div>
    </div>
  );
}

// PUBLIC_INTERFACE
function WeatherCard({ weather }) {
  if (!weather) return <div>Weather data unavailable</div>;
  return (
    <div style={{ fontSize: '1.12rem', color: '#fafafa' }}>
      <span role="img" aria-label="weather">🌦️</span> {weather.temperature}°C, {weather.weathercode || 'conditions'}
      <br />
      <span style={{ color: '#ff0000', fontWeight: 500 }}>
        Wind: {weather.windspeed} km/h
      </span>
    </div>
  );
}

// PUBLIC_INTERFACE
function NewsList({ news, compact }) {
  if (!news || !news.length) return <div>No news available</div>;
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {news.map(item => (
        <li key={item.id || item.title} style={{ marginBottom: 12 }}>
          <a href={item.url} target="_blank" rel="noopener noreferrer" style={{
            color: '#ff0000',
            fontWeight: 600,
            textDecoration: 'underline'
          }}>{item.title}</a>
          {!compact && (
            <div style={{
              fontSize: '0.96rem',
              color: '#dddddd'
            }}>{item.description ? item.description.substring(0, 80) + '...' : ''}</div>
          )}
        </li>
      ))}
    </ul>
  );
}

// PUBLIC_INTERFACE
function EventList({ events, compact }) {
  if (!events || !events.length) return <div>No events available</div>;
  return (
    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
      {events.map(e => (
        <li key={e.Link || e.API} style={{ marginBottom: 10 }}>
          <span style={{ color: '#ffffff', fontWeight: 500, fontSize: '1.05rem' }}>
            {e.API || e.name}
          </span>
          <br />
          {!compact && (
            <span style={{ color: '#bbbbbb', fontSize: '0.96rem' }}>
              {e.Description ? e.Description.substring(0, 100) : ''}{e.Link && <> (<a href={e.Link} target="_blank" rel="noopener noreferrer" style={{ color: '#ff0000' }}>details</a>)</>}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}

// PUBLIC_INTERFACE
function ResourcesDirectory({ resources }) {
  if (!resources.length) return <div>No resources match your search.</div>;
  return (
    <table style={{
      width: '100%',
      background: '#181a1c',
      color: '#fff',
      borderCollapse: 'collapse',
      borderRadius: 8,
      overflow: 'hidden',
      boxShadow: '0 2px 8px #0002'
    }}>
      <thead>
        <tr style={{ background: '#111' }}>
          <th style={{ color: '#ff0000', padding: 8, fontWeight: 700 }}>Name</th>
          <th style={{ color: '#ff0000', padding: 8, fontWeight: 700 }}>Type</th>
          <th style={{ color: '#ff0000', padding: 8, fontWeight: 700 }}>Phone</th>
          <th style={{ color: '#ff0000', padding: 8, fontWeight: 700 }}>Address</th>
          <th style={{ color: '#ff0000', padding: 8, fontWeight: 700 }}>Link</th>
        </tr>
      </thead>
      <tbody>
        {resources.map(res => (
          <tr key={res.name + res.type}>
            <td style={{ padding: 8 }}>{res.name}</td>
            <td style={{ padding: 8 }}>{res.type}</td>
            <td style={{ padding: 8 }}>{res.phone}</td>
            <td style={{ padding: 8 }}>{res.address}</td>
            <td style={{ padding: 8 }}>
              {res.link ?
                <a href={res.link} style={{ color: '#ff0000' }} target="_blank" rel="noopener noreferrer">Visit</a>
                : '-'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// PUBLIC_INTERFACE
function UserProfile({ user, onLogout }) {
  return (
    <div style={{
      background: '#181a1c', borderRadius: 10, boxShadow: '0 1px 8px #0002', padding: 32, maxWidth: 420
    }}>
      <h2>Welcome, {user.name}!</h2>
      <div><b>Email:</b> {user.email}</div>
      <div>
        <b>Subscriptions:</b> {user.alerts ? (user.alerts.join(', ') || 'None') : 'None'}
      </div>
      <br />
      <button className="btn" style={{ background: '#222', color: '#ff0000', border: '1px solid #ff0000' }} onClick={onLogout}>Logout</button>
    </div>
  );
}

// PUBLIC_INTERFACE
function UserRegistration({ onRegister }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [alerts, setAlerts] = useState([]);
  const [error, setError] = useState('');

  const alertOptions = [
    { label: 'Severe Weather', value: 'weather' },
    { label: 'Emergency Alerts', value: 'emergency' },
    { label: 'Community News', value: 'news' },
    { label: 'Events', value: 'events' },
  ];

  // PUBLIC_INTERFACE
  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !email) {
      setError('Name and email are required.');
      return;
    }
    // Simulate registration, in real apps send to backend.
    onRegister({ name, email, alerts });
  }

  // PUBLIC_INTERFACE
  function toggleAlert(val) {
    setAlerts(a => a.includes(val) ? a.filter(v => v !== val) : [...a, val]);
  }

  return (
    <form style={{
      background: '#181a1c', borderRadius: 8, padding: 30, minWidth: 320
    }} onSubmit={handleSubmit}>
      <h3 style={{ marginTop: 0, color: '#ff0000' }}>User Registration</h3>
      <label>
        Name <br />
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff0000', background: '#222', color: '#fff' }} />
      </label>
      <br /><br />
      <label>
        Email <br />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff0000', background: '#222', color: '#fff' }} />
      </label>
      <br /><br />
      <label>
        Subscriptions:<br />
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 6 }}>
          {alertOptions.map(opt => (
            <label key={opt.value} style={{ color: alerts.includes(opt.value) ? '#ff0000' : '#fff', marginRight: 14 }}>
              <input type="checkbox" checked={alerts.includes(opt.value)} onChange={() => toggleAlert(opt.value)} style={{ marginRight: 4 }} />{opt.label}
            </label>
          ))}
        </div>
      </label>
      <br />
      {error && <p style={{ color: '#ff0000' }}>{error}</p>}
      <button className="btn btn-large" type="submit" style={{ width: '100%', marginTop: 7 }}>Register</button>
    </form>
  );
}

// PUBLIC_INTERFACE
function FeedbackForm({ onSubmit }) {
  const [name, setName] = useState('');
  const [text, setText] = useState('');
  const [err, setErr] = useState('');
  // PUBLIC_INTERFACE
  function handleSend(e) {
    e.preventDefault();
    if (!text) {
      setErr('Feedback cannot be empty');
      return;
    }
    onSubmit({ id: Date.now(), name: name || 'Anonymous', text, date: new Date().toLocaleString() });
  }
  return (
    <form
      style={{
        background: '#181a1c', borderRadius: 8, padding: 26, minWidth: 320
      }}
      onSubmit={handleSend}
    >
      <h3 style={{ color: '#ff0000', marginTop: 0 }}>Leave your feedback</h3>
      <label>
        Name <br />
        <input type="text" value={name} onChange={e => setName(e.target.value)} style={{ width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff0000', background: '#222', color: '#fff' }} />
      </label>
      <br /><br />
      <label>
        Feedback <br />
        <textarea value={text} onChange={e => setText(e.target.value)} rows={4} style={{
          width: '100%', padding: 8, borderRadius: 4, border: '1px solid #ff0000', background: '#222', color: '#fff'
        }} />
      </label>
      <br />
      {err && <div style={{ color: '#ff0000' }}>{err}</div>}
      <button className="btn btn-large" type="submit" style={{ width: '100%', marginTop: 8 }}>Send</button>
    </form>
  );
}

// PUBLIC_INTERFACE
function FeedbackList({ feedbacks }) {
  if (!feedbacks.length) return <div>No feedback received yet.</div>;
  return (
    <div style={{ maxWidth: 500 }}>
      <h2>Recent User Feedback</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {feedbacks.map(f => (
          <li key={f.id} style={{
            background: '#181a1c', padding: 14, borderRadius: 8, marginBottom: 12, color: '#eee'
          }}>
            <div style={{ marginBottom: 2 }}>
              <span style={{ color: '#ff0000', fontWeight: 700 }}>{f.name}</span> <span style={{ color: '#888', fontSize: '0.93rem' }}>({f.date})</span>
            </div>
            <div>{f.text}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// PUBLIC_INTERFACE
function Modal({ children, onClose }) {
  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh',
      background: 'rgba(0,0,0,0.55)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center'
    }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#181a1c',
          borderRadius: 12,
          boxShadow: '0 4px 24px #0006',
          padding: 0,
          minWidth: 340,
          maxWidth: '90vw',
          maxHeight: '95vh',
          overflowY: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose}
          style={{
            position: 'absolute', right: 10, top: 10, border: 'none',
            background: '#111', color: '#ff0000', fontSize: '1.8rem', fontWeight: 700, borderRadius: '100%', width: 36, height: 36, cursor: 'pointer'
          }}>×</button>
        <div style={{ padding: 28 }}>{children}</div>
      </div>
    </div>
  );
}

// PUBLIC_INTERFACE
function Footer() {
  return (
    <footer style={{
      width: '100%',
      marginTop: 64,
      background: '#111',
      color: '#fff',
      textAlign: 'center',
      padding: 18,
      borderTop: '1px solid #222',
      fontSize: '1.05rem'
    }}>
      <span>
        &copy; {new Date().getFullYear()} CommunityConnect Hub &mdash; A Project for Community Engagement <span style={{ color: '#ff0000' }}>●</span>
      </span>
    </footer>
  );
}

export default App;
