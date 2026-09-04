// Shared game/league metadata + small formatting helpers, ported 1:1 from
// the original artifact's inline <script> so the visual language (icons,
// gradients, dot colors, labels) stays identical on the real site.

export const GAME_LABEL = {
  lol: "League of Legends",
  valorant: "Valorant",
  cs2: "CS2",
  general: "Scène FR"
};

export const DOT_VAR = {
  lol: "--dot-lol",
  valorant: "--dot-val",
  cs2: "--dot-cs",
  general: "--dot-gen"
};

// Raw SVG markup — used via dangerouslySetInnerHTML in GameIcon below since
// it's fixed, trusted, hand-authored markup (no user input ever flows in).
export const GAME_ICON = {
  lol: '<svg viewBox="0 0 24 24"><polygon points="12,2 20,5 20,11 12,22 4,11 4,5" fill="currentColor"/></svg>',
  valorant:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="7"/><line x1="12" y1="1" x2="12" y2="6"/><line x1="12" y1="18" x2="12" y2="23"/><line x1="1" y1="12" x2="6" y2="12"/><line x1="18" y1="12" x2="23" y2="12"/></svg>',
  cs2:
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.5"/><circle cx="12" cy="12" r="1" fill="currentColor" stroke="none"/></svg>',
  general:
    '<svg viewBox="0 0 24 24"><polygon points="12,2 14.6,8.6 21.8,9 16.2,13.6 18,20.8 12,16.9 6,20.8 7.8,13.6 2.2,9 9.4,8.6" fill="currentColor"/></svg>'
};

export const GAME_COVER = {
  lol: "linear-gradient(135deg,#1c3f73 0%,#3667B0 55%,#6fa0e8 100%)",
  valorant: "linear-gradient(135deg,#6e1428 0%,#D6304A 55%,#ff8098 100%)",
  cs2: "linear-gradient(135deg,#7a4a08 0%,#C97A16 55%,#ffbf5c 100%)",
  general: "linear-gradient(135deg,#2b3244 0%,#4b5468 55%,#8592ab 100%)"
};

export const LEAGUE_LABEL = { lfl: "LFL", lec: "LEC", valorant: "Valorant", cs2: "CS2" };

export const GAMES = ["lol", "valorant", "cs2", "general"];
export const LEAGUES = ["lfl", "lec", "valorant", "cs2"];

export function timeAgo(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const diff = Math.max(0, (Date.now() - d.getTime()) / 1000);
  const mins = Math.floor(diff / 60);
  const hrs = Math.floor(diff / 3600);
  const days = Math.floor(diff / 86400);
  if (days >= 1) return `${days}j`;
  if (hrs >= 1) return `${hrs}h`;
  if (mins >= 1) return `${mins}min`;
  return "à l'instant";
}

export function formatMatchDate(iso) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return { day: "--", time: "" };
  const days = ["Dim", "Lun", "Mar", "Mer", "Jeu", "Ven", "Sam"];
  const day = `${days[d.getDay()]} ${d.getDate()}/${d.getMonth() + 1}`;
  const time = d.toLocaleTimeString("fr-FR", {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "Europe/Paris"
  });
  return { day, time };
}

export function domainOf(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return "";
  }
}

export function defaultStageId(season) {
  if (!season || !season.stages || !season.stages.length) return null;
  const live = season.stages.find((s) => s.status === "live");
  if (live) return live.id;
  const doneStages = season.stages.filter((s) => s.status === "done");
  if (doneStages.length) return doneStages[doneStages.length - 1].id;
  return season.stages[0].id;
}

export function groupMatchesByRound(list) {
  const order = [];
  const map = {};
  list.forEach((m) => {
    const key = m.round || "Calendrier";
    if (!map[key]) {
      map[key] = { round: key, matches: [], minDate: m.match_date };
      order.push(key);
    }
    map[key].matches.push(m);
    if (new Date(m.match_date) < new Date(map[key].minDate)) map[key].minDate = m.match_date;
  });
  const groups = order.map((k) => map[k]);
  groups.sort((a, b) => new Date(a.minDate) - new Date(b.minDate));
  groups.forEach((g) => g.matches.sort((a, b) => new Date(a.match_date) - new Date(b.match_date)));
  return groups;
}
