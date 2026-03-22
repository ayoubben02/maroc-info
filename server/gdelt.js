const GDELT_URL = "https://api.gdeltproject.org/api/v2/doc/doc";
const GDELT_BACKOFF_MS = 5 * 60 * 1000;

let gdeltBackoffUntil = 0;

async function fetchGdeltNews(categoryConfig) {
  if (Date.now() < gdeltBackoffUntil) {
    throw new Error("GDELT temporary backoff after rate limiting.");
  }

  const params = new URLSearchParams({
    query: categoryConfig.query,
    mode: "ArtList",
    maxrecords: "8",
    format: "json",
    sort: "DateDesc",
    timespan: "7d"
  });

  const response = await fetch(`${GDELT_URL}?${params.toString()}`, {
    headers: {
      "User-Agent": "MarocInfo/1.0"
    }
  });

  if (!response.ok) {
    if (response.status === 429) {
      gdeltBackoffUntil = Date.now() + GDELT_BACKOFF_MS;
    }

    throw new Error(`GDELT HTTP ${response.status}`);
  }

  gdeltBackoffUntil = 0;

  const payload = await response.json();
  const articles = Array.isArray(payload?.articles)
    ? payload.articles
    : Array.isArray(payload)
      ? payload
      : [];

  return articles
    .map((article) => normalizeArticle(article))
    .filter(Boolean);
}

function normalizeArticle(article) {
  if (!article || !article.title || !article.url) {
    return null;
  }

  return {
    title: article.title,
    url: article.url,
    image: article.socialimage || "",
    sourceLabel: article.domain || article.sourcecountry || "Source",
    dateLabel: normalizeDate(article.seendate),
    description: buildDescription(article)
  };
}

function buildDescription(article) {
  const parts = [];

  if (article.language) {
    parts.push(`Langue: ${String(article.language).toUpperCase()}.`);
  }

  if (article.sourcecountry) {
    parts.push(`Pays source: ${article.sourcecountry}.`);
  }

  parts.push("Cliquez pour ouvrir l'article d'origine.");
  return parts.join(" ");
}

function normalizeDate(value) {
  if (!value) {
    return null;
  }

  const parsed = new Date(value);
  if (!Number.isNaN(parsed.getTime())) {
    return parsed.toISOString();
  }

  const compact = String(value).trim();
  const match = compact.match(/^(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})$/);

  if (!match) {
    return null;
  }

  const [, year, month, day, hours, minutes, seconds] = match;
  const iso = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}Z`;
  const reparsed = new Date(iso);
  return Number.isNaN(reparsed.getTime()) ? null : reparsed.toISOString();
}

module.exports = {
  fetchGdeltNews
};
