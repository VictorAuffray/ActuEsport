import { formatMatchDate } from "@/lib/gameMeta";

export default function MatchCard({ match, inBracket }) {
  const m = match;
  const when = formatMatchDate(m.match_date);
  const cls = `match-card${m.fr_team ? " fr" : ""}`;

  return (
    <div className={cls}>
      {!inBracket && (
        <div className="match-comp">
          {m.competition}
          {m.round ? ` · ${m.round}` : ""}
        </div>
      )}
      <div className="match-teams">
        {m.team_a}
        <span className="vs">vs</span>
        {m.team_b}
      </div>
      <div className="match-when">
        <span className="d">
          {when.day} · {when.time}
        </span>
        <span>{m.venue || ""}</span>
      </div>
    </div>
  );
}
