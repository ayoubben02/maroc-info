const path = require("path");
const { spawn } = require("child_process");
const { pythonBin, pythonNewsTimeoutMs } = require("./config");

function fetchMoroccanSiteNews(category, limit = 8) {
  return new Promise((resolve, reject) => {
    const scriptPath = path.join(__dirname, "moroccan_news.py");
    const child = spawn(
      pythonBin,
      [scriptPath, "--category", category, "--limit", String(limit)],
      {
        cwd: path.resolve(__dirname, ".."),
        windowsHide: true
      }
    );

    let stdout = "";
    let stderr = "";
    let settled = false;

    const timer = setTimeout(() => {
      if (settled) {
        return;
      }

      settled = true;
      child.kill();
      reject(new Error("Python news fetch timed out."));
    }, pythonNewsTimeoutMs);

    child.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    child.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    child.on("error", (error) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timer);
      reject(error);
    });

    child.on("close", (code) => {
      if (settled) {
        return;
      }

      settled = true;
      clearTimeout(timer);

      if (code !== 0) {
        reject(new Error(stderr.trim() || `Python news fetch failed with exit code ${code}.`));
        return;
      }

      try {
        const payload = JSON.parse(stdout || "{}");
        resolve(Array.isArray(payload?.articles) ? payload.articles : []);
      } catch (error) {
        reject(new Error(`Invalid Python news payload: ${error.message}`));
      }
    });
  });
}

module.exports = {
  fetchMoroccanSiteNews
};
