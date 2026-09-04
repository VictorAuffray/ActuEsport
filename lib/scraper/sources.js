import { XMLParser } from "fast-xml-parser";
import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (compatible; LaRiposteBot/1.0; +https://github.com/) esport-news-aggregator";

/**
 * Each source returns a flat array of { title, url, source, publishedAt,
 * excerptHint } — "excerptHint" is whatever short text the listing itself
 * gives us; the scraper route rewrites it into a real 2-sentence excerpt
 * and fills in the photo afterwards (see app/api/cron/scrape/route.js).
 *
 * Add a new outlet by adding one more entry to SOURCES below — nothing
 * else in the app needs to change.
 */

async function fetchText(url) {
  const res = await fetch(url, {
    headers: { "User-Agent": UA },
    signal: AbortSignal.timeout(10_000)
  });
  if (!res.ok) throw new Error(`${url} → HTTP ${res.status}`);
  return res.text();
}

async function fromRss(feedUrl, sourceName) {
  const xml = await fetchText(feedUrl);
  const parser = new XMLParser({ ignoreAttributes: false });
  const doc = parser.parse(xml);
  const items = doc?.rss?.channel?.item;
  const list = Array.isArray(items) ? items : items ? [items] : [];

  return list.map((item) => ({
    title: stripHtml(item.title),
    url: item.link,
    source: sourceName,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : null,
    excerptHint: stripHtml(item.description || "")
  }));
}

function stripHtml(s) {
  return String(s || "")
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, "")
    .trim();
}

/**
 * team-aaa.com has no public RSS feed (checked). Its article URLs all
 * follow /fr/actualite/<slug>_<id>, so instead of relying on a specific
 * CSS class (fragile — breaks on the next redesign), this matches that
 * URL shape directly on the homepage/listing markup.
 *
 * NOTE for whoever deploys this: this one is the most likely to need a
 * tweak after the first real run — check the Vercel function logs for
 * "[scraper] team-aaa" warnings and adjust the selector/regex below if
 * the site's markup has moved on.
 */
async function fromTeamAaa() {
  const html = await fetchText("https://www.team-aaa.com/fr/portal/league-of-legends");
  const $ = cheerio.load(html);
  const seen = new Set();
  const out = [];

  $('a[href*="/fr/actualite/"]').each((_, el) => {
    const href = $(el).attr("href");
    if (!href || !/\/fr\/actualite\/[a-z0-9-]+_\d+$/.test(href)) return;
    const url = new URL(href, "https://www.team-aaa.com").toString();
    if (seen.has(url)) return;
    seen.add(url);

    const title = $(el).text().trim() || $(el).attr("title") || "";
    if (!title) return;

    out.push({
      title,
      url,
      source: "Team aAa",
      publishedAt: null, // filled in from the article's own meta tags later
      excerptHint: ""
    });
  });

  return out.slice(0, 20);
}

export const SOURCES = [
  {
    name: "Esports Insider FR",
    fetch: () => fromRss("https://esportsinsider.com/fr/feed", "Esports Insider FR")
  },
  {
    name: "Team aAa",
    fetch: fromTeamAaa
  }
  // Add more outlets here, e.g. JudgeHype's network feeds:
  // { name: "JudgeHype", fetch: () => fromRss("https://www.judgehype.com/nouvelles.xml", "JudgeHype") },
];
