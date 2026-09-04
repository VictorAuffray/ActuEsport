import Link from "next/link";
import { GAME_LABEL, DOT_VAR } from "@/lib/gameMeta";

const ORDER = ["all", "lol", "valorant", "cs2", "general"];

export default function Filters({ active }) {
  return (
    <div className="filters">
      {ORDER.map((game) => (
        <Link
          key={game}
          href={game === "all" ? "/" : `/?game=${game}`}
          className="chip"
          aria-pressed={active === game}
        >
          {game !== "all" && <span className="dot" style={{ background: `var(${DOT_VAR[game]})` }} />}
          {game === "all" ? "Tout" : game === "general" ? "Scène FR & divers" : GAME_LABEL[game]}
        </Link>
      ))}
    </div>
  );
}
