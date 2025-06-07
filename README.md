# communityconnect-hub-33712-9b10e706

---

## Backend Proxy for Secure News Fetching

A Node.js/Express backend is provided under `communityconnect_hub/server/` to securely fetch news from NewsAPI.org **without exposing your API key to the frontend**. 

### Why use a proxy backend?
- Hides the sensitive API key (keeps it out of the browser)
- Avoids CORS/network issues with news APIs
- Allows you to change or rotate API keys without redeploying frontend

### Quickstart: Running Backend and Frontend

1. **Install backend dependencies**

```sh
cd communityconnect_hub/server
npm install
```

2. **Setup your News API key**
   - Copy the `.env.example` to `.env`:
     ```sh
     cp .env.example .env
     ```
   - Edit `.env` and set `NEWS_API_KEY` to your actual NewsAPI.org key.

3. **Run the backend server**

```sh
npm start
# (By default runs on port 4000. Change PORT in .env if needed)
```

4. **In a new terminal, start the frontend as usual:**

```sh
cd ../      # Go to communityconnect_hub/
npm start   # Frontend on http://localhost:3000
```

5. The frontend will now fetch news securely via the backend proxy (`/api/news`).

#### Notes

- **Deployment:** Make sure both backend and frontend are deployed and reachable; update proxy settings if deploying separately.
- **Changing API endpoints:** You can edit `server/index.js` to adjust country/query defaults.
- **CORS:** See `server/index.js` if you need to update allowed frontend origins for development.

---