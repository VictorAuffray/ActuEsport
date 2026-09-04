import GameIcon from "./GameIcon";
import { GAME_LABEL, GAME_COVER, DOT_VAR, timeAgo } from "@/lib/gameMeta";

export default function ArticleCard({ article }) {
  const a = article;
  const hasPhoto = Boolean(a.image_url);

  return (
    <a
      className="card"
      href={a.url}
      target="_blank"
      rel="noopener"
      style={{
        "--cover": GAME_COVER[a.game] || GAME_COVER.general,
        "--game-color": `var(${DOT_VAR[a.game] || "--dot-gen"})`
      }}
    >
      <div className={`card-cover${hasPhoto ? " has-photo" : ""}`}>
        {hasPhoto && (
          // eslint-disable-next-line @next/next/no-img-element
          <img className="cover-photo" src={a.image_url} alt="" loading="lazy" />
        )}
        <div className="card-cover-top">
          <span className="cover-tag">
            <span className="dot" />
            {GAME_LABEL[a.game] || a.game}
          </span>
          <span className="cover-source">{a.source}</span>
        </div>
        {!hasPhoto && (
          <div className="cover-mark">
            <GameIcon game={a.game} />
          </div>
        )}
      </div>
      <div className="card-body">
        <div className="card-title">{a.title}</div>
        <div className="card-excerpt">{a.excerpt}</div>
        <div className="card-foot">
          <span className="num">il y a {timeAgo(a.published_at)}</span>
          <span className="read">
            Lire <span>→</span>
          </span>
        </div>
      </div>
    </a>
  );
}
