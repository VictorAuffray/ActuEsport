/**
 * Very small keyword classifier — good enough to route an article into one
 * of the site's four filters. Titles/excerpts are French, so keywords are
 * matched case-insensitively on the raw text.
 */
const RULES = [
  { game: "valorant", words: ["valorant", "vct "] },
  { game: "cs2", words: ["cs2", "counter-strike", "counter strike", "csgo", "cs:go"] },
  {
    game: "lol",
    words: [
      "league of legends",
      " lol ",
      "lec ",
      "lfl ",
      "lck",
      "lpl",
      "worlds",
      "msi ",
      "summoner"
    ]
  }
];

export function classifyGame(title, excerpt) {
  const text = ` ${(title || "")} ${(excerpt || "")} `.toLowerCase();
  for (const rule of RULES) {
    if (rule.words.some((w) => text.includes(w))) return rule.game;
  }
  return "general";
}
