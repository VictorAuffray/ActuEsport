function StandingsCard({ standings: s }) {
  const rows = s.rows || [];
  return (
    <div className="standings-card">
      <div className="standings-card-head">
        <h3>{s.league_label}</h3>
        {s.champion && <span className="champ">🏆 {s.champion}</span>}
      </div>
      <table className="standings">
        <thead>
          <tr>
            <th></th>
            <th>Équipe</th>
            <th className="num">V</th>
            <th className="num">D</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={r.team} className={r.highlight ? "highlight" : undefined}>
              <td className="rank">{i + 1}</td>
              <td>{r.team}</td>
              <td className="num">{r.wins != null ? r.wins : "—"}</td>
              <td className="num">{r.losses != null ? r.losses : "—"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Mirrors the original artifact's logic: on "Tout" show every league's
// standings; on a single league only show its table while the selected
// stage is the summer split (the only period with a live table so far —
// extend this condition as more splits get one).
export default function StandingsGrid({ league, selectedStageId, standingsByLeague }) {
  if (league === "all") {
    const all = Object.values(standingsByLeague);
    if (!all.length) return null;
    return (
      <div className="standings-grid">
        {all.map((s) => (
          <StandingsCard key={s.league} standings={s} />
        ))}
      </div>
    );
  }

  const s = standingsByLeague[league];
  if (!s || selectedStageId !== "summer") return null;

  return (
    <div className="standings-grid single">
      <StandingsCard standings={s} />
    </div>
  );
}
