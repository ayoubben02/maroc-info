# Maroc Info

Maroc Info is now structured as a small full-stack project:

- A static editorial frontend
- A lightweight Node server
- A Python collector for Moroccan news sites
- A local `/api/news` endpoint
- Local authentication with cookie sessions
- A free public news source behind the server
- In-memory caching to reduce repeated external requests

## Run locally

1. Make sure Node.js 18+ and Python 3 are installed.
2. From the project root, run:

```bash
npm start
```

3. Open:

```text
http://localhost:3000
```

## Environment

You can optionally create a `.env` file based on `.env.example`.

- `PORT`: local server port
- `CACHE_TTL_MS`: cache duration for news responses
- `PYTHON_BIN`: Python executable used by the news collector
- `PYTHON_NEWS_TIMEOUT_MS`: timeout for the Python news collector

## Project structure

```text
data/
  users.json
server/
  app.js
  auth-service.js
  config.js
  gdelt.js
  moroccan_news.py
  news-service.js
  python-news.js
  static-server.js
```

## Notes

- The frontend no longer calls the public API directly.
- The local server proxies category-based news requests.
- The server now tries Moroccan websites first through `server/moroccan_news.py`, then falls back to GDELT if needed.
- Authentication is handled by the local server with persisted users in `data/users.json`.
- If the live source fails, the frontend still falls back to local content.
