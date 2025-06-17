import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function WeatherWidget() {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  // In real app, fetch from OpenWeather or similar
  useEffect(() => {
    setTimeout(() => {
      setWeather({
        temp: 22,
        condition: "Partly Cloudy",
        city: "Springfield",
        icon: "🌤️",
      });
      setLoading(false);
    }, 800);
  }, []);

  return (
    <div>
      <h2 className="cc-section-title">Weather</h2>
      {loading ? (
        <div className="cc-skeleton" style={{ height: 48, width: "80%" }} />
      ) : (
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <span style={{ fontSize: "2.1rem" }}>{weather.icon}</span>
          <div>
            <div style={{ fontWeight: "bold", fontSize: "1.29rem" }}>{weather.temp}&deg;C</div>
            <div style={{ fontSize: "1.02rem", color: "#ccc" }}>
              {weather.condition} - {weather.city}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default WeatherWidget;
