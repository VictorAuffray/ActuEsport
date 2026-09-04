import { GAME_ICON } from "@/lib/gameMeta";

// Trusted, hand-authored SVG strings only (see lib/gameMeta.js) — never fed
// with user/scraped input, so dangerouslySetInnerHTML is safe here.
export default function GameIcon({ game }) {
  const svg = GAME_ICON[game] || GAME_ICON.general;
  return <span dangerouslySetInnerHTML={{ __html: svg }} />;
}
