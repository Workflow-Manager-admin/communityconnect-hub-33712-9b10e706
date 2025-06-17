import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function EventsBoard() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  // In real app, replace this with local event API fetch
  useEffect(() => {
    setTimeout(() => {
      setEvents([
        {
          name: "Farmers Market",
          date: "2024-06-03",
          location: "Main Park",
          info: "Fresh produce & crafts, 9am-2pm.",
        },
        {
          name: "Free Health Screening",
          date: "2024-06-04",
          location: "Community Center",
          info: "Open 10am to 4pm. Walk-ins welcome.",
        },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div>
      <h2 className="cc-section-title">Upcoming Events</h2>
      {loading ? (
        <div className="cc-skeleton" style={{ height: 54 }}></div>
      ) : (
        <ul style={{ padding: 0, listStyle: "none" }}>
          {events.map((evt, idx) => (
            <li key={idx} style={{ marginBottom: 18 }}>
              <div style={{ fontWeight: 600 }}>{evt.name}</div>
              <div style={{ color: "#bbb", fontSize: "0.97rem" }}>
                {evt.location} — {new Date(evt.date).toLocaleDateString()}
              </div>
              <div style={{ fontSize: "0.97rem" }}>{evt.info}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EventsBoard;
