// === DESIGN AUDIT ===
// WeatherPage displays current city weather with dark-themed widget and icon.
// - Color palette: Uses dark backgrounds with accented header and details.
// - Spacing: Widget/panels and rows are well padded and spaced.
// - Typography: Good contrast, clear main/fine-print scaling.
// - Navigation: Focusable widget/sections, labeled.
// - Accessibility: aria-label, aria-busy, and live regions for loading/error.
// - TODO for polish:
//     - Improve visible focus state for weather widget in CSS.
//     - Confirm color contrast for secondary elements (esp. <span> on background).
//     - Add skip link/landmark for fast navigation.
//     - Use a variable for WEATHER_API_KEY or set up secure proxy for prod.

import React, { useEffect, useState } from "react";
import "./WeatherPage.css";

// PUBLIC_INTERFACE
function WeatherPage() {
  /**
   * Fetches and displays current weather using a secure, provided API key.
   * IMPORTANT: For production, do not hardcode the API key.
   * Use secure variables or backend proxy in a real deployment.
   */
  const WEATHER_API_KEY = "ce171fe5bd3c4e72be862408250706";
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
          temperature: Math.round(data.current.temp_c * 1.8 + 32),
          tempC: Math.round(data.current.temp_c),
          description: data.current.condition?.text || "",
          iconUrl: data.current.condition?.icon
            ? "https:" + data.current.condition.icon
            : "",
          icon: getWeatherIcon(data.current.condition?.code),
          windKph: data.current.wind_kph,
          humidity: data.current.humidity,
          feelslikeC: Math.round(data.current.feelslike_c),
          feelslikeF: Math.round(data.current.feelslike_c * 1.8 + 32),
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

  // WeatherAPI.com icon mapping for clarity (minimal/emoji sample)
  // PUBLIC_INTERFACE
  function getWeatherIcon(code) {
    if (!code) return "🌡️";
    if ([1087, 1276].includes(code)) return "⛈️"; // Thunder
    if (
      [1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1204, 1207, 1240, 1243, 1246].includes(code)
    ) return "🌧️"; // Rain
    if (
      [1066, 1114, 1117, 1210, 1213, 1216, 1219, 1222,
        1225, 1255, 1258, 1261, 1264, 1279, 1282].includes(code)
    ) return "❄️"; // Snow
    if ([1000].includes(code)) return "☀️"; // Clear
    if ([1003, 1006, 1009, 1030, 1135, 1147].includes(code)) return "⛅"; // Cloud
    return "🌡️"; // Default
  }

  return (
    <section className="weather-page-section" aria-label="Current Weather conditions">
      <div className="weather-widget" tabIndex={0} aria-live="polite" aria-busy={loading}>
        <div className="weather-header">
          <span className="weather-title">
            <span role="img" aria-label="weather">🌤️</span> Weather
          </span>
          <span className="weather-location" title={weather && weather.location}>
            {weather?.location || "Chennai"}
          </span>
        </div>
        {loading ? (
          <div className="weather-loading">Loading weather...</div>
        ) : error ? (
          <div className="weather-error" role="alert">{error}</div>
        ) : weather ? (
          <div className="weather-details">
            <div className="weather-icon-row">
              <span className="weather-emoji" aria-label={weather.description}>{weather.icon}</span>
              {weather.iconUrl &&
                <img
                  src={weather.iconUrl}
                  alt={weather.description}
                  className="weather-icon-img"
                  width={44}
                  height={44}
                  loading="lazy"
                />
              }
            </div>
            <div className="weather-temp-row">
              <span className="weather-temp">{weather.temperature}&deg;F</span>
              <span className="weather-temp-alt">({weather.tempC}&deg;C)</span>
            </div>
            <div className="weather-desc">{weather.description}</div>
            <dl className="weather-metrics">
              <div>
                <dt>Feels like</dt>
                <dd>{weather.feelslikeF}&deg;F / {weather.feelslikeC}&deg;C</dd>
              </div>
              <div>
                <dt>Wind</dt>
                <dd>{weather.windKph} km/h</dd>
              </div>
              <div>
                <dt>Humidity</dt>
                <dd>{weather.humidity}%</dd>
              </div>
            </dl>
          </div>
        ) : (
          <div className="weather-error">Weather unavailable.</div>
        )}
      </div>
    </section>
  );
}

export default WeatherPage;
