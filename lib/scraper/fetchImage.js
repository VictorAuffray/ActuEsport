import * as cheerio from "cheerio";

const UA =
  "Mozilla/5.0 (compatible; LaRiposteBot/1.0; +https://github.com/) esport-news-aggregator";

/**
 * Fetches an article page and pulls its preview photo + a fallback
 * description straight from the Open Graph / Twitter Card tags the site
 * itself publishes for link previews — the same tags Slack, Discord or
 * Twitter use when the link is shared. That's the whole reason these tags
 * exist, which is why this is a reasonable way to source a thumbnail
 * (never grab an arbitrary in-body photo, and never resize/crop it beyond
 * what the tag already points to).
 */
export async function fetchArticleMeta(url) {
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": UA },
      // Vercel functions get a real outbound connection, unlike the
      // sandbox this project was drafted in — no special proxy needed.
      redirect: "follow",
      signal: AbortSignal.timeout(10_000)
    });
    if (!res.ok) return { imageUrl: null, description: null };

    const html = await res.text();
    const $ = cheerio.load(html);

    const imageUrl =
      $('meta[property="og:image"]').attr("content") ||
      $('meta[name="twitter:image"]').attr("content") ||
      $('meta[property="og:image:secure_url"]').attr("content") ||
      null;

    const description =
      $('meta[property="og:description"]').attr("content") ||
      $('meta[name="description"]').attr("content") ||
      null;

    // A relative image URL ("/media/x.jpg") needs resolving against the
    // article's own origin before it's usable anywhere else.
    const resolvedImage = imageUrl ? new URL(imageUrl, url).toString() : null;

    return { imageUrl: resolvedImage, description };
  } catch (err) {
    console.warn(`[scraper] fetchArticleMeta failed for ${url}:`, err.message);
    return { imageUrl: null, description: null };
  }
}
