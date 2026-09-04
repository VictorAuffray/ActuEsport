import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase";
import { SOURCES } from "@/lib/scraper/sources";
import { fetchArticleMeta } from "@/lib/scraper/fetchImage";
import { classifyGame } from "@/lib/scraper/classify";

export const maxDuration = 60; // seconds — Vercel Hobby cap; raise on Pro if needed

function slugify(title, source) {
  const base = `${source}-${title}`
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
  return base.slice(0, 80);
}

/**
 * GET /api/cron/scrape — triggered by Vercel Cron (see vercel.json, every
 * 4h) or manually while testing: curl -H "Authorization: Bearer $CRON_SECRET" \
 *   https://<your-app>.vercel.app/api/cron/scrape
 *
 * For each source: pull the recent items, skip ones already in the
 * database (by URL), then for genuinely new ones fetch the article page
 * once to read its real og:image + description and write one row.
 */
export async function GET(request) {
  const authHeader = request.headers.get("authorization");
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = supabaseAdmin();
  const { data: existing, error: existingErr } = await supabase
    .from("articles")
    .select("url");
  if (existingErr) {
    return NextResponse.json({ error: existingErr.message }, { status: 500 });
  }
  const knownUrls = new Set((existing || []).map((r) => r.url));

  const report = [];
  let inserted = 0;

  for (const src of SOURCES) {
    let items = [];
    try {
      items = await src.fetch();
    } catch (err) {
      report.push({ source: src.name, error: err.message });
      continue;
    }

    const freshItems = items.filter((i) => i.url && !knownUrls.has(i.url)).slice(0, 8);

    for (const item of freshItems) {
      const meta = await fetchArticleMeta(item.url);
      const excerpt = (item.excerptHint || meta.description || "").slice(0, 240);
      const publishedAt = item.publishedAt || new Date().toISOString();

      const row = {
        id: slugify(item.title, item.source),
        title: item.title,
        excerpt: excerpt || item.title,
        url: item.url,
        source: item.source,
        game: classifyGame(item.title, excerpt),
        image_url: meta.imageUrl,
        published_at: publishedAt,
        featured: false
      };

      const { error: insertErr } = await supabase
        .from("articles")
        .upsert(row, { onConflict: "id" });

      if (insertErr) {
        report.push({ source: src.name, url: item.url, error: insertErr.message });
      } else {
        inserted += 1;
        knownUrls.add(item.url);
      }
    }

    report.push({ source: src.name, found: items.length, added: freshItems.length });
  }

  return NextResponse.json({ ok: true, inserted, report });
}
