import React, { useEffect, useState } from "react";

// PUBLIC_INTERFACE
function WeatherPage() {
  /**
   * Fetches and displays current weather using a secure, provided API key.
   * IMPORTANT: For production, do not hardcode the API key.
   * Use secure variables or backend proxy in a real deployment.
   */
  const WEATHER_API_KEY = "ce171fe5bd3c4e72be862408250706";
  // Open-Meteo public test fallback used for demonstration (does not require API key),
  // but this example will use weatherapi.com API as if the key is needed

  // Example uses WeatherAPI.com (free tier for Europe/Asia cities)
  // Free endpoint: http://api.weatherapi.com/v1/current.json?key=API_KEY&q=Chennai
  const LOCATION = "Chennai";
  const WEATHER_API_URL = `https://api.weatherapi.com/v1/current.json?key=${WEATHER_API_KEY}&q=${encodeURIComponent(LOCATION)}`;

  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchWeather() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(WEATHER_API_URL);

        if (!response.ok) {
          throw new Error(
            "Weather service unavailable (status " + response.status + ")"
          );
        }
        const data = await response.json();
        if (!data || !data.current) {
          throw new Error(
            "Invalid weather data. Weather cannot be displayed."
          );
        }
        setWeather({
          location: data.location?.name || LOCATION,
          temperature: Math.round(data.current.temp_c * 1.8 + 32), // API returns °C, convert to °F for consistency
          description: data.current.condition?.text || "",
          iconUrl: data.current.condition?.icon
            ? "https:" + data.current.condition.icon
            : "",
          icon: getWeatherIcon(data.current.condition?.code),
        });
      } catch (err) {
        setError(
          err.message === "Failed to fetch"
            ? "Weather could not be loaded due to network restrictions or API CORS. Please verify API access."
            : err.message || "An error occurred."
        );
        setWeather(null);
      }
      setLoading(false);
    }

    fetchWeather();
  }, [WEATHER_API_URL]);

  // WeatherAPI.com 'code' icon mapping for clarity (minimal/emoji sample)
  // PUBLIC_INTERFACE
  function getWeatherIcon(code) {
    // Quick emoji mapping (expand as needed)
    if (!code) return "🌡️";
    // Thunder
    if ([1087, 1276].includes(code)) return "⛈️";
    // Rain
    if (
      [1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246].includes(
        code
      )
    )
      return "🌧️";
    // Snow
    if (
      [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222, 1225, 1255, 1258, 1261, 1264, 1279, 1282].includes(
        code
      )
    )
      return "❄️";
    // Clear
    if ([1000].includes(code)) return "☀️";
    // Cloud
    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(code)) return "⛅";
    // Default
    return "🌡️";
  }

  return (
    <section>
      <h2 style={{ color: "var(--accent)" }}>Weather</h2>
      {loading ? (
        <div style={{ color: "var(--accent)" }}>Loading weather...</div>
      ) : error ? (
        <div style={{ color: "var(--secondary)", fontWeight: 500 }}>{error}</div>
      ) : weather ? (
        <div style={{ textAlign: "center" }}>
          <span style={{ fontSize: "2.5rem" }}>
            {weather.icon}{" "}
            {weather.iconUrl ? (
              <img
                src={weather.iconUrl}
                alt={weather.description}
                style={{
                  verticalAlign: "middle",
                  width: 36,
                  height: 36,
                  marginLeft: 4,
                  borderRadius: 8,
                  background: "#fff1",
                }}
              />
            ) : null}
          </span>
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
        <div style={{ color: "var(--accent)" }}>Weather unavailable.</div>
      )}
    </section>
  );
}

export default WeatherPage;
