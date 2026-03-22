const fs = require("fs");
const { cacheTtlMs, categories, newsCacheFile, warmupIntervalMs, enableGdelt } = require("./config");
const { fetchGdeltNews } = require("./gdelt");
const { fetchMoroccanSiteNews } = require("./python-news");

const cache = loadPersistentCache();
const inflight = new Map();
let warmupStarted = false;

async function getNewsByCategory(category, options = {}) {
  const categoryConfig = categories[category];
  const { forceRefresh = false, limit = 12 } = options;

  if (!categoryConfig) {
    const error = new Error("Unknown category");
    error.statusCode = 400;
    throw error;
  }

  const cached = cache.get(category);
  if (!forceRefresh && cached && cached.expiresAt > Date.now()) {
    return limitPayload({
      category,
      source: "cache",
      fetchedAt: cached.fetchedAt,
      articles: cached.articles
    }, limit);
  }

  const inflightRequest = inflight.get(category);
  if (inflightRequest) {
    return limitPayload(await inflightRequest, limit);
  }

  const requestPromise = loadNewsByCategory(category, categoryConfig, cached);
  inflight.set(category, requestPromise);

  try {
    return limitPayload(await requestPromise, limit);
  } finally {
    if (inflight.get(category) === requestPromise) {
      inflight.delete(category);
    }
  }
}

async function loadNewsByCategory(category, categoryConfig, cached) {
  let articles = [];
  let source = "unknown";
  let lastError = null;

  try {
    articles = await fetchMoroccanSiteNews(category);
    if (articles.length) {
      source = "moroccan-sites";
    }
  } catch (error) {
    console.warn(`[news] Python collector failed for ${category}: ${error.message}`);
    lastError = error;
  }

  if (enableGdelt && articles.length < 8) {
    try {
      const gdeltArticles = await fetchGdeltNews(categoryConfig);
      const merged = dedupeArticles([...articles, ...gdeltArticles]);

      if (merged.length) {
        articles = merged;
        source = source === "moroccan-sites" ? "moroccan-sites+gdelt" : "gdelt";
      }
    } catch (error) {
      console.warn(`[news] GDELT fetch failed for ${category}: ${error.message}`);
      lastError = lastError || error;
    }
  }

  if (!articles.length && cached?.articles?.length) {
    return {
      category,
      source: "cache-fallback",
      fetchedAt: cached.fetchedAt,
      articles: cached.articles
    };
  }

  const payload = {
    category,
    source,
    fetchedAt: new Date().toISOString(),
    articles
  };

  if (!articles.length && lastError) {
    throw lastError;
  }

  cache.set(category, {
    ...payload,
    expiresAt: Date.now() + cacheTtlMs
  });
  persistCache();

  console.info(`[news] category=${category} source=${source} articles=${articles.length}`);

  return payload;
}

module.exports = {
  getNewsByCategory,
  startNewsWarmup,
  getHomepageOverview
};

function dedupeArticles(items) {
  const seen = new Set();

  return items.filter((item) => {
    const key = String(item?.url || item?.title || "").trim().toLowerCase();
    if (!key || seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
}

function loadPersistentCache() {
  try {
    if (!fs.existsSync(newsCacheFile)) {
      return new Map();
    }

    const raw = JSON.parse(fs.readFileSync(newsCacheFile, "utf8"));
    const entries = Object.entries(raw || {}).filter(([, value]) => value && Array.isArray(value.articles));
    return new Map(entries);
  } catch (error) {
    console.warn(`[news] Unable to load persistent cache: ${error.message}`);
    return new Map();
  }
}

function persistCache() {
  try {
    const payload = Object.fromEntries(cache.entries());
    fs.writeFileSync(newsCacheFile, JSON.stringify(payload, null, 2));
  } catch (error) {
    console.warn(`[news] Unable to persist cache: ${error.message}`);
  }
}

function limitPayload(payload, limit) {
  return {
    ...payload,
    totalArticles: payload.articles.length,
    articles: payload.articles.slice(0, Math.max(1, Number(limit) || 12))
  };
}

function startNewsWarmup() {
  if (warmupStarted) {
    return;
  }

  warmupStarted = true;
  warmCategories();
  setInterval(warmCategories, warmupIntervalMs).unref();
}

async function warmCategories() {
  for (const category of Object.keys(categories)) {
    try {
      const cached = cache.get(category);
      if (cached && cached.expiresAt > Date.now()) {
        continue;
      }

      await getNewsByCategory(category, { forceRefresh: true, limit: 24 });
    } catch (error) {
      console.warn(`[news] Warmup failed for ${category}: ${error.message}`);
    }
  }
}

async function getHomepageOverview() {
  const overviewCategories = ["politique", "societe", "economie", "monde", "regions", "technologie", "sport", "culture"];
  const sections = {};

  for (const category of overviewCategories) {
    try {
      sections[category] = await getNewsByCategory(category, { limit: 6 });
    } catch (error) {
      sections[category] = {
        category,
        source: "unavailable",
        fetchedAt: null,
        totalArticles: 0,
        articles: []
      };
    }
  }

  const allArticles = dedupeArticles(
    overviewCategories.flatMap((category) =>
      (sections[category]?.articles || []).map((article) => ({ ...article, category }))
    )
  );

  return {
    fetchedAt: new Date().toISOString(),
    headline: allArticles.slice(0, 3),
    latest: allArticles.slice(0, 12),
    spotlight: rankSpotlight(allArticles).slice(0, 6),
    sections
  };
}

function rankSpotlight(items) {
  return [...items].sort((left, right) => {
    const leftScore = getArticleScore(left);
    const rightScore = getArticleScore(right);
    return rightScore - leftScore;
  });
}

function getArticleScore(article) {
  const dateScore = article.dateLabel ? new Date(article.dateLabel).getTime() || 0 : 0;
  const imageScore = article.image ? 1_000_000_000_000 : 0;
  const sourceScore = article.sourceLabel ? article.sourceLabel.length * 10 : 0;
  return dateScore + imageScore + sourceScore;
}
