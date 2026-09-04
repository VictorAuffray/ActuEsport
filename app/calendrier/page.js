import { supabasePublic } from "@/lib/supabase";
import LeagueTabs from "@/components/LeagueTabs";
import Roadmap from "@/components/Roadmap";
import StageDetail from "@/components/StageDetail";
import StandingsGrid from "@/components/StandingsGrid";
import MatchesRow from "@/components/MatchesRow";
import { defaultStageId } from "@/lib/gameMeta";

export const revalidate = 300; // seconds

const VALID_LEAGUES = new Set(["lfl", "lec", "valorant", "cs2"]);

async function getData() {
  const supabase = supabasePublic();
  const [seasonRes, matchesRes, standingsRes] = await Promise.all([
    supabase.from("season").select("*"),
    supabase.from("matches").select("*"),
    supabase.from("standings").select("*")
  ]);

  const seasonByLeague = {};
  (seasonRes.data || []).forEach((row) => {
    seasonByLeague[row.league] = row;
  });

  const standingsByLeague = {};
  (standingsRes.data || []).forEach((row) => {
    standingsByLeague[row.league] = row;
  });

  return {
    seasonByLeague,
    standingsByLeague,
    matches: matchesRes.data || []
  };
}

export default async function CalendrierPage({ searchParams }) {
  const { seasonByLeague, standingsByLeague, matches } = await getData();

  const leagueParam = searchParams?.league;
  const league = VALID_LEAGUES.has(leagueParam) ? leagueParam : "all";
  const season = league !== "all" ? seasonByLeague[league] : null;
  const selectedStageId =
    league === "all" ? null : searchParams?.stage || defaultStageId(season);
  const stage = season && (season.stages || []).find((s) => s.id === selectedStageId);

  const stageMatches =
    league !== "all" && stage ? matches.filter((m) => m.league === league && m.stage === stage.id) : [];

  return (
    <div className="view">
      <div className="section-head">
        <h2 className="section-title">Calendrier</h2>
        <span className="section-note">heure de Paris</span>
      </div>

      <LeagueTabs active={league} seasonByLeague={seasonByLeague} />

      {league !== "all" && <Roadmap league={league} season={season} selectedStageId={selectedStageId} />}

      {league !== "all" && stage && (
        <StageDetail league={league} stage={stage} stageMatches={stageMatches} />
      )}

      <StandingsGrid league={league} selectedStageId={selectedStageId} standingsByLeague={standingsByLeague} />

      {league === "all" && <MatchesRow matches={matches} />}
    </div>
  );
}
