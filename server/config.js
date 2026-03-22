const path = require("path");

const ROOT_DIR = path.resolve(__dirname, "..");
const DATA_DIR = path.join(ROOT_DIR, "data");

module.exports = {
  rootDir: ROOT_DIR,
  dataDir: DATA_DIR,
  newsCacheFile: path.join(DATA_DIR, "news-cache.json"),
  port: Number(process.env.PORT || 3000),
  cacheTtlMs: Number(process.env.CACHE_TTL_MS || 20 * 60 * 1000),
  warmupIntervalMs: Number(process.env.WARMUP_INTERVAL_MS || 30 * 60 * 1000),
  enableGdelt: process.env.ENABLE_GDELT === "true",
  pythonBin: process.env.PYTHON_BIN || "python",
  pythonNewsTimeoutMs: Number(process.env.PYTHON_NEWS_TIMEOUT_MS || 8000),
  sessionCookieName: "maroc_info_session",
  categories: {
    politique: {
      label: "Politique",
      query: 'morocco (government OR parliament OR diplomacy OR reform OR policy)'
    },
    societe: {
      label: "Societe",
      query: 'morocco (society OR education OR health OR housing OR social OR justice OR youth)'
    },
    economie: {
      label: "Economie",
      query: 'morocco (economy OR investment OR business OR finance OR industry OR market)'
    },
    sport: {
      label: "Sport",
      query: 'morocco (sport OR football OR club OR tournament OR athlete)'
    },
    culture: {
      label: "Culture",
      query: 'morocco (culture OR festival OR heritage OR art OR cinema OR music)'
    },
    monde: {
      label: "Monde",
      query: 'morocco (international OR africa OR europe OR diplomacy OR global OR foreign affairs)'
    },
    regions: {
      label: "Regions",
      query: 'morocco (casablanca OR rabat OR tangier OR marrakech OR fes OR agadir OR dakhla OR region)'
    },
    technologie: {
      label: "Technologie",
      query: 'morocco (technology OR startup OR digital OR innovation OR AI OR telecom)'
    }
  }
};
