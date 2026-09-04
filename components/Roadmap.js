import Link from "next/link";

const STATUS_LABEL = { done: "Terminé", live: "En cours", upcoming: "À venir" };

export default function Roadmap({ league, season, selectedStageId }) {
  if (!season || !season.stages || !season.stages.length) {
    return (
      <div className="roadmap">
        <div className="empty" style={{ flex: 1 }}>
          Calendrier de saison indisponible pour le moment.
        </div>
      </div>
    );
  }

  return (
    <div className="roadmap">
      {season.stages.map((s) => (
        <Link
          key={s.id}
          href={`/calendrier?league=${league}&stage=${s.id}`}
          className={`stage-card is-${s.status || "upcoming"}`}
          aria-pressed={s.id === selectedStageId}
        >
          <div className="stage-status">
            <span className="sdot" />
            {STATUS_LABEL[s.status] || "À venir"}
          </div>
          <div className="stage-name">{s.name}</div>
          <div className="stage-range">{s.range}</div>
          {s.note && <div className="stage-note">{s.note}</div>}
        </Link>
      ))}
    </div>
  );
}
