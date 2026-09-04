import MatchCard from "./MatchCard";

export default function MatchesRow({ matches }) {
  const cutoff = Date.now() - 36 * 3600 * 1000;
  const list = matches
    .filter((m) => new Date(m.match_date).getTime() >= cutoff)
    .sort((a, b) => new Date(a.match_date) - new Date(b.match_date));

  if (!list.length) {
    return (
      <div className="matches-row">
        <div className="empty" style={{ flex: 1 }}>
          Pas de match programmé pour le moment.
        </div>
      </div>
    );
  }

  return (
    <div className="matches-row">
      {list.map((m) => (
        <MatchCard key={m.id} match={m} />
      ))}
    </div>
  );
}
