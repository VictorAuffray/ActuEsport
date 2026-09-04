import MatchCard from "./MatchCard";
import { groupMatchesByRound, formatMatchDate } from "@/lib/gameMeta";

function emptyStageMessage(stage) {
  if (stage.status === "upcoming") return "Le calendrier détaillé de cette période n'est pas encore publié.";
  if (stage.status === "live") return "La période est en cours — le calendrier détaillé arrive au fil des matchs.";
  return "Pas de résultat détaillé enregistré pour cette période pour l'instant.";
}

function ResultCard({ stage, result: r }) {
  const aWin = r.scoreA != null && r.scoreB != null && r.scoreA > r.scoreB;
  const bWin = r.scoreA != null && r.scoreB != null && r.scoreB > r.scoreA;
  const hasScore = r.scoreA != null && r.scoreB != null;
  const when = r.date ? formatMatchDate(r.date).day : "";
  const metaLine = [when, r.venue].filter(Boolean).join(" · ");

  return (
    <>
      <div className="result-card">
        <div className={`result-team${aWin ? " win" : ""}`}>{r.teamA}</div>
        <div className="result-score">{hasScore ? `${r.scoreA} — ${r.scoreB}` : "vs"}</div>
        <div className={`result-team${bWin ? " win" : ""}`}>{r.teamB}</div>
      </div>
      {metaLine && <div className="result-meta">{metaLine}</div>}
      {r.note && <div className="result-note">{r.note}</div>}
    </>
  );
}

export default function StageDetail({ league, stage, stageMatches }) {
  if (!league || !stage) return null;

  const head = (
    <div className="stage-detail-head">
      {stage.name} · {stage.range}
    </div>
  );

  if (stageMatches.length) {
    const groups = groupMatchesByRound(stageMatches);
    return (
      <div className="stage-detail">
        {head}
        <div className="bracket-grid">
          {groups.map((g) => (
            <div className="bracket-col" key={g.round}>
              <div className="bracket-col-head">{g.round}</div>
              {g.matches.map((m) => (
                <MatchCard key={m.id} match={m} inBracket />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (stage.result) {
    return (
      <div className="stage-detail">
        {head}
        <ResultCard stage={stage} result={stage.result} />
      </div>
    );
  }

  return (
    <div className="stage-detail">
      {head}
      <div className="empty">{emptyStageMessage(stage)}</div>
    </div>
  );
}
