const fs = require("fs");
const path = require("path");
const { rootDir } = require("./config");

const MIME_TYPES = {
  ".css": "text/css; charset=utf-8",
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".svg": "image/svg+xml",
  ".ico": "image/x-icon"
};

function serveStaticFile(reqPath, res) {
  const safePath = sanitizePath(reqPath);
  const resolved = path.join(rootDir, safePath === "/" ? "index.html" : safePath);

  if (!resolved.startsWith(rootDir)) {
    return sendNotFound(res);
  }

  fs.readFile(resolved, (error, content) => {
    if (error) {
      sendNotFound(res);
      return;
    }

    const ext = path.extname(resolved).toLowerCase();
    res.writeHead(200, {
      "Content-Type": MIME_TYPES[ext] || "application/octet-stream",
      "Cache-Control": "no-cache"
    });
    res.end(content);
  });
}

function sanitizePath(reqPath) {
  const rawPath = reqPath.split("?")[0];
  return rawPath === "/" ? "/" : rawPath.replace(/^\/+/, "");
}

function sendNotFound(res) {
  res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
  res.end("Not found");
}

module.exports = {
  serveStaticFile
};
