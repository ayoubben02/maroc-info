import argparse
import json
import re
import sys
from dataclasses import dataclass
from datetime import datetime, timezone
from html import unescape
from typing import Iterable
from urllib.parse import urlparse
from urllib.request import Request, urlopen
import xml.etree.ElementTree as ET


USER_AGENT = "MarocInfoNewsBot/1.0 (+https://localhost)"
REQUEST_TIMEOUT = 2
MAX_ARTICLES_PER_SOURCE = 4

CATEGORY_KEYWORDS = {
    "politique": ["politique", "government", "parliament", "minister", "diplomacy", "policy", "election", "roi"],
    "societe": ["society", "education", "health", "social", "justice", "school", "hospital", "youth"],
    "economie": ["economie", "economy", "finance", "business", "investment", "industry", "market", "bank"],
    "sport": ["sport", "football", "club", "league", "athlete", "fifa", "caf", "match"],
    "culture": ["culture", "festival", "heritage", "art", "music", "cinema", "book", "museum"],
    "monde": ["international", "diplomacy", "africa", "europe", "global", "foreign", "partnership"],
    "regions": ["casablanca", "rabat", "tangier", "marrakech", "fes", "agadir", "dakhla", "region", "city"],
    "technologie": ["technology", "startup", "digital", "innovation", "ai", "telecom", "cyber", "tech"],
}


@dataclass
class Source:
    name: str
    feed_urls: list[str]
    allowed_domains: tuple[str, ...]


SOURCES = [
    Source(
        name="Hespress",
        feed_urls=[
            "https://www.hespress.com/feed",
            "https://en.hespress.com/feed",
        ],
        allowed_domains=("www.hespress.com", "hespress.com", "en.hespress.com"),
    ),
    Source(
        name="Morocco World News",
        feed_urls=[
            "https://www.moroccoworldnews.com/feed/",
        ],
        allowed_domains=("www.moroccoworldnews.com", "moroccoworldnews.com"),
    ),
    Source(
        name="Al Jazeera",
        feed_urls=[
            "https://www.aljazeera.com/xml/rss/all.xml",
        ],
        allowed_domains=("www.aljazeera.com", "aljazeera.com"),
    ),
    Source(
        name="MAP",
        feed_urls=[
            "https://en.mapnews.ma/feed",
        ],
        allowed_domains=("en.mapnews.ma", "mapnews.ma"),
    ),
]


def fetch_text(url: str) -> str:
    request = Request(
        url,
        headers={
            "User-Agent": USER_AGENT,
            "Accept-Language": "en-US,en;q=0.8,fr;q=0.7,ar;q=0.6",
        },
    )

    with urlopen(request, timeout=REQUEST_TIMEOUT) as response:
        charset = response.headers.get_content_charset() or "utf-8"
        return response.read().decode(charset, errors="replace")


def extract_articles_from_feed(feed_url: str, source: Source) -> list[dict]:
    try:
        xml_text = fetch_text(feed_url)
    except Exception:
        return []

    if "<rss" not in xml_text.lower() and "<feed" not in xml_text.lower():
        return []

    try:
        root = ET.fromstring(xml_text)
    except ET.ParseError:
        return []

    articles: list[dict] = []

    for item in root.findall(".//item"):
        article = parse_rss_item(item, source)
        if article:
          articles.append(article)

    if articles:
        return articles

    for entry in root.findall(".//{http://www.w3.org/2005/Atom}entry"):
        article = parse_atom_entry(entry, source)
        if article:
            articles.append(article)

    return articles


def parse_rss_item(item: ET.Element, source: Source) -> dict | None:
    title = text_or_empty(item.find("title"))
    link = text_or_empty(item.find("link"))
    description = text_or_empty(item.find("description"))
    pub_date = text_or_empty(item.find("pubDate")) or text_or_empty(item.find("{http://purl.org/dc/elements/1.1/}date"))

    if not title or not link:
        return None

    if not is_allowed_article_url(link, source):
        return None

    return {
        "title": strip_html(title),
        "url": strip_html(link),
        "sourceLabel": source.name,
        "description": strip_html(description) or "Cliquez pour ouvrir l'article d'origine.",
        "image": extract_media_thumbnail(item),
        "dateLabel": normalize_date(pub_date),
    }


def parse_atom_entry(entry: ET.Element, source: Source) -> dict | None:
    namespace = "{http://www.w3.org/2005/Atom}"
    title = text_or_empty(entry.find(f"{namespace}title"))
    description = text_or_empty(entry.find(f"{namespace}summary")) or text_or_empty(entry.find(f"{namespace}content"))
    pub_date = text_or_empty(entry.find(f"{namespace}updated")) or text_or_empty(entry.find(f"{namespace}published"))

    link = ""
    for link_node in entry.findall(f"{namespace}link"):
        href = link_node.attrib.get("href", "").strip()
        rel = link_node.attrib.get("rel", "alternate").strip().lower()
        if href and rel in ("alternate", ""):
            link = href
            break

    if not title or not link:
        return None

    if not is_allowed_article_url(link, source):
        return None

    return {
        "title": strip_html(title),
        "url": link,
        "sourceLabel": source.name,
        "description": strip_html(description) or "Cliquez pour ouvrir l'article d'origine.",
        "image": "",
        "dateLabel": normalize_date(pub_date),
    }


def text_or_empty(node: ET.Element | None) -> str:
    if node is None or node.text is None:
        return ""
    return node.text.strip()


def extract_media_thumbnail(item: ET.Element) -> str:
    media_ns = "{http://search.yahoo.com/mrss/}"

    thumbnail = item.find(f"{media_ns}thumbnail")
    if thumbnail is not None:
        return thumbnail.attrib.get("url", "")

    content = item.find(f"{media_ns}content")
    if content is not None:
        return content.attrib.get("url", "")

    enclosure = item.find("enclosure")
    if enclosure is not None:
        return enclosure.attrib.get("url", "")

    return ""


def is_allowed_article_url(url: str, source: Source) -> bool:
    try:
        parsed = urlparse(url)
    except Exception:
        return False

    if parsed.scheme not in ("http", "https"):
        return False

    return (parsed.hostname or "") in source.allowed_domains


def strip_html(value: str) -> str:
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", " ", unescape(value or ""))).strip()


def normalize_date(value: str | None) -> str | None:
    if not value:
        return None

    text = value.strip()
    if not text:
        return None

    if text.endswith("Z"):
        return text

    try:
        return datetime.fromisoformat(text.replace("Z", "+00:00")).astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
    except ValueError:
        pass

    date_patterns = [
        "%Y-%m-%dT%H:%M:%S",
        "%Y-%m-%d %H:%M:%S",
        "%Y-%m-%d",
        "%a, %d %b %Y %H:%M:%S %z",
    ]

    for pattern in date_patterns:
        try:
            parsed = datetime.strptime(text, pattern)
            if parsed.tzinfo is None:
                parsed = parsed.replace(tzinfo=timezone.utc)
            return parsed.astimezone(timezone.utc).isoformat().replace("+00:00", "Z")
        except ValueError:
            continue

    return None


def matches_category(article: dict, category: str) -> bool:
    keywords = CATEGORY_KEYWORDS.get(category, [])
    if not keywords:
        return True

    haystack = f"{article.get('title', '')} {article.get('description', '')}".lower()
    return any(keyword.lower() in haystack for keyword in keywords)


def dedupe_articles(articles: Iterable[dict]) -> list[dict]:
    unique: list[dict] = []
    seen: set[str] = set()

    for article in articles:
        key = (article.get("url") or article.get("title") or "").strip().lower()
        if not key or key in seen:
            continue
        seen.add(key)
        unique.append(article)

    unique.sort(key=lambda item: item.get("dateLabel") or "", reverse=True)
    return unique


def collect_news(category: str, limit: int) -> list[dict]:
    articles: list[dict] = []

    for source in SOURCES:
        source_articles: list[dict] = []

        for feed_url in source.feed_urls:
            for article in extract_articles_from_feed(feed_url, source):
                if matches_category(article, category):
                    source_articles.append(article)

            if len(dedupe_articles(source_articles)) >= MAX_ARTICLES_PER_SOURCE:
                break

        articles.extend(dedupe_articles(source_articles)[:MAX_ARTICLES_PER_SOURCE])

        if len(dedupe_articles(articles)) >= limit:
            break

    return dedupe_articles(articles)[:limit]


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--category", default="politique")
    parser.add_argument("--limit", type=int, default=8)
    args = parser.parse_args()

    try:
        articles = collect_news(args.category, args.limit)
    except Exception as error:
        print(str(error), file=sys.stderr)
        return 1

    print(json.dumps({"articles": articles}, ensure_ascii=False))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
