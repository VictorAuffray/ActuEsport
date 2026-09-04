import Link from "next/link";
import { LEAGUE_LABEL, defaultStageId } from "@/lib/gameMeta";

const ORDER = ["all", "lfl", "lec", "valorant", "cs2"];

export default function LeagueTabs({ active, seasonByLeague }) {
  return (
    <div className="league-tabs">
      {ORDER.map((league) => {
        const href =
          league === "all"
            ? "/calendrier"
            : `/calendrier?league=${league}&stage=${defaultStageId(seasonByLeague[league]) || ""}`;
        return (
          <Link key={league} href={href} className="league-tab" aria-pressed={active === league}>
            {league === "all" ? "Tout" : LEAGUE_LABEL[league]}
          </Link>
        );
      })}
    </div>
  );
}
