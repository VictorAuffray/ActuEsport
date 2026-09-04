import { supabasePublic } from "@/lib/supabase";
import Filters from "@/components/Filters";
import Hero from "@/components/Hero";
import ArticleCard from "@/components/ArticleCard";

export const revalidate = 120; // seconds — new articles land within 2 min without a full rebuild

const VALID_GAMES = new Set(["lol", "valorant", "cs2", "general"]);

async function getArticles() {
  const supabase = supabasePublic();
  const { data, error } = await supabase
    .from("articles")
    .select("*")
    .order("published_at", { ascending: false });
  if (error) {
    console.error("[page] failed to load articles:", error.message);
    return [];
  }
  return data || [];
}

export default async function ArticlesPage({ searchParams }) {
  const gameParam = searchParams?.game;
  const activeGame = VALID_GAMES.has(gameParam) ? gameParam : "all";

  const articles = await getArticles();
  const filtered = activeGame === "all" ? articles : articles.filter((a) => a.game === activeGame);

  const featured = activeGame === "all" ? filtered.find((a) => a.featured) || filtered[0] : null;
  const rest = featured ? filtered.filter((a) => a !== featured) : filtered;

  return (
    <div className="view">
      <p className="lede">
        Les titres, un résumé, la source — et un clic pour lire l&apos;article en entier chez
        celles et ceux qui l&apos;ont écrit. Mis à jour en continu depuis les rédactions esport
        francophones.
      </p>

      <Filters active={activeGame} />

      <div className="board" style={{ marginTop: "1.2rem" }}>
        {!filtered.length ? (
          <div className="empty">Aucun article pour ce filtre pour le moment.</div>
        ) : (
          <>
            {featured && <Hero article={featured} />}
            <div className="grid">
              {rest.map((a) => (
                <ArticleCard key={a.id} article={a} />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
