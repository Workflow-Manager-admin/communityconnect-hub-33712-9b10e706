import React from "react";

// PUBLIC_INTERFACE
function WeatherPage({ weather }) {
  /** Displays the current weather information. */
  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Weather</h2>
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
        <div style={{ color: "var(--accent)" }}>Loading weather...</div>
      )}
    </section>
  );
}

export default WeatherPage;
