const http = require("http");
const { port } = require("./config");
const {
  buildExpiredSessionCookie,
  buildSessionCookie,
  clearSession,
  createSession,
  getSessionFromRequest,
  loginUser,
  registerUser
} = require("./auth-service");
const { getNewsByCategory, getHomepageOverview, startNewsWarmup } = require("./news-service");
const { serveStaticFile } = require("./static-server");

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(req.url, `http://${req.headers.host || "localhost"}`);
  const corsHeaders = buildCorsHeaders(req);

  if (req.method === "OPTIONS") {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  if (requestUrl.pathname.startsWith("/api/auth/")) {
    await handleAuthApi(req, requestUrl, res, corsHeaders);
    return;
  }

  if (requestUrl.pathname === "/api/news") {
    await handleNewsApi(requestUrl, res, corsHeaders);
    return;
  }

  if (requestUrl.pathname === "/api/overview") {
    await handleOverviewApi(res, corsHeaders);
    return;
  }

  if (req.method !== "GET") {
    res.writeHead(405, {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    });
    res.end(JSON.stringify({ error: "Method not allowed" }));
    return;
  }

  serveStaticFile(requestUrl.pathname, res);
});

server.listen(port, () => {
  console.log(`Maroc Info running on http://localhost:${port}`);
  startNewsWarmup();
});

async function handleNewsApi(requestUrl, res, corsHeaders) {
  try {
    const category = requestUrl.searchParams.get("category") || "politique";
    const refreshParam = requestUrl.searchParams.get("refresh");
    const limitParam = Number(requestUrl.searchParams.get("limit") || 12);
    const payload = await getNewsByCategory(category, {
      forceRefresh: refreshParam === "1" || refreshParam === "true",
      limit: Number.isFinite(limitParam) ? limitParam : 12
    });

    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      ...corsHeaders
    });
    res.end(JSON.stringify(payload));
  } catch (error) {
    const statusCode = error.statusCode || 502;
    res.writeHead(statusCode, {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    });
    res.end(JSON.stringify({
      error: error.message || "Unexpected server error"
    }));
  }
}

async function handleOverviewApi(res, corsHeaders) {
  try {
    const payload = await getHomepageOverview();
    res.writeHead(200, {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "no-cache",
      ...corsHeaders
    });
    res.end(JSON.stringify(payload));
  } catch (error) {
    const statusCode = error.statusCode || 502;
    res.writeHead(statusCode, {
      "Content-Type": "application/json; charset=utf-8",
      ...corsHeaders
    });
    res.end(JSON.stringify({
      error: error.message || "Unexpected server error"
    }));
  }
}

async function handleAuthApi(req, requestUrl, res, corsHeaders) {
  try {
    if (req.method === "GET" && requestUrl.pathname === "/api/auth/me") {
      const user = getSessionFromRequest(req);
      sendJson(res, 200, { authenticated: Boolean(user), user }, corsHeaders);
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/auth/register") {
      const body = await readJsonBody(req);
      const user = await registerUser(body);
      const token = createSession(user);
      sendJson(res, 201, { authenticated: true, user }, {
        ...corsHeaders,
        "Set-Cookie": buildSessionCookie(token)
      });
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/auth/login") {
      const body = await readJsonBody(req);
      const user = await loginUser(body);
      const token = createSession(user);
      sendJson(res, 200, { authenticated: true, user }, {
        ...corsHeaders,
        "Set-Cookie": buildSessionCookie(token)
      });
      return;
    }

    if (req.method === "POST" && requestUrl.pathname === "/api/auth/logout") {
      clearSession(req);
      sendJson(res, 200, { authenticated: false }, {
        ...corsHeaders,
        "Set-Cookie": buildExpiredSessionCookie()
      });
      return;
    }

    sendJson(res, 404, { error: "Not found" }, corsHeaders);
  } catch (error) {
    sendJson(res, error.statusCode || 500, {
      error: error.message || "Unexpected auth error"
    }, corsHeaders);
  }
}

function sendJson(res, statusCode, payload, extraHeaders = {}) {
  res.writeHead(statusCode, {
    "Content-Type": "application/json; charset=utf-8",
    ...extraHeaders
  });
  res.end(JSON.stringify(payload));
}

function readJsonBody(req) {
  return new Promise((resolve, reject) => {
    let raw = "";

    req.on("data", (chunk) => {
      raw += chunk;
      if (raw.length > 1_000_000) {
        reject(new Error("Request body too large."));
        req.destroy();
      }
    });

    req.on("end", () => {
      if (!raw) {
        resolve({});
        return;
      }

      try {
        resolve(JSON.parse(raw));
      } catch {
        const error = new Error("Invalid JSON body.");
        error.statusCode = 400;
        reject(error);
      }
    });

    req.on("error", reject);
  });
}

function buildCorsHeaders(req) {
  const origin = req.headers.origin;

  if (!origin) {
    return {};
  }

  if (!isAllowedOrigin(origin)) {
    return {};
  }

  return {
    "Access-Control-Allow-Origin": origin,
    "Access-Control-Allow-Credentials": "true",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "GET,POST,OPTIONS",
    Vary: "Origin"
  };
}

function isAllowedOrigin(origin) {
  if (origin === "null") {
    return true;
  }

  try {
    const parsed = new URL(origin);
    return ["localhost", "127.0.0.1"].includes(parsed.hostname);
  } catch {
    return false;
  }
}
