require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 4000;

// Allow CORS from frontend in development
app.use(cors({
  origin: [
    "http://localhost:3000", // dev client
    "http://127.0.0.1:3000"
  ]
}));

/**
 * /api/news
 * Proxy endpoint to fetch news securely from News API.
 * Query params accepted (q, pageSize, country, etc.)
 */
app.get('/api/news', async (req, res) => {
  // PUBLIC_INTERFACE
  /**
   * Proxies request to News API with server-stored API key.
   * - Forwards query params to NewsAPI.
   * - Responds with NewsAPI JSON.
   */
  const NEWS_API_KEY = process.env.NEWS_API_KEY;
  if (!NEWS_API_KEY) {
    return res.status(500).json({ error: 'Missing News API key in backend server (NEWS_API_KEY).' });
  }
  // Allow country param or default to 'in' (India)
  const country = req.query.country || 'in';
  const q = req.query.q || '';
  const pageSize = req.query.pageSize || 8;
  const category = req.query.category || '';
  let apiUrl = `https://newsapi.org/v2/top-headlines?country=${encodeURIComponent(country)}&pageSize=${pageSize}&apiKey=${NEWS_API_KEY}`;
  if (q) apiUrl += `&q=${encodeURIComponent(q)}`;
  if (category) apiUrl += `&category=${encodeURIComponent(category)}`;
  try {
    const apiRes = await fetch(apiUrl);
    const data = await apiRes.json();
    // Forward NewsAPI errors if any
    if (data.status === "error") {
      return res.status(502).json({ error: data.message || "Failed to fetch news" });
    }
    return res.json(data);
  } catch (err) {
    return res.status(502).json({ error: "Failed to fetch news: " + err.message });
  }
});

// Health check
app.get('/api/health', (_, res) => res.json({ status: "ok" }));

// Start server
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`News proxy listening at http://localhost:${PORT}`);
});
