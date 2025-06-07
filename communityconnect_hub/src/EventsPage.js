import React from "react";

// PUBLIC_INTERFACE
function EventsPage({ events }) {
  /** Displays a list of local events. */
  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>
        Chennai Events <span role="img" aria-label="Chennai">🛕</span>
      </h2>
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
        <div style={{ color: "var(--accent)" }}>Loading events...</div>
      )}
    </section>
  );
}

export default EventsPage;
