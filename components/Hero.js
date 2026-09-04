import GameIcon from "./GameIcon";
import { GAME_LABEL, GAME_COVER, DOT_VAR, timeAgo } from "@/lib/gameMeta";

export default function Hero({ article }) {
  const a = article;
  const hasPhoto = Boolean(a.image_url);

  return (
    <a
      className="hero-card"
      href={a.url}
      target="_blank"
      rel="noopener"
      style={{ "--cover": GAME_COVER[a.game] || GAME_COVER.general }}
    >
      <div className={`hero-media${hasPhoto ? " has-photo" : ""}`}>
        {hasPhoto ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="hero-photo" src={a.image_url} alt="" loading="eager" />
        ) : (
          <div className="hero-mark">
            <GameIcon game={a.game} />
          </div>
        )}
        <div className="hero-kicker">
          <span className="live-dot" />À la une
        </div>
        <div className="hero-title">{a.title}</div>
      </div>
      <div className="hero-body">
        <div className="tag">
          <span className="dot" style={{ background: `var(${DOT_VAR[a.game] || "--dot-gen"})` }} />
          {GAME_LABEL[a.game] || a.game}
        </div>
        <div className="hero-excerpt">{a.excerpt}</div>
        <div className="hero-meta">
          <span className="num">{timeAgo(a.published_at)}</span>
          <span>·</span>
          <span>{a.source}</span>
        </div>
        <span className="hero-link">Lire sur {a.source} →</span>
      </div>
    </a>
  );
}
