-- La Riposte — schéma Supabase
-- À exécuter dans Supabase Dashboard > SQL Editor (une seule fois).

create extension if not exists "pgcrypto";

-- ---------- articles ----------
create table if not exists articles (
  id text primary key,                 -- slug stable, ex: "kc-vct-emea"
  title text not null,
  excerpt text not null,
  url text not null,
  source text not null,
  game text not null check (game in ('lol','valorant','cs2','general')),
  image_url text,                      -- photo réelle trouvée sur l'article (og:image)
  published_at timestamptz not null,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists articles_published_at_idx on articles (published_at desc);
create index if not exists articles_game_idx on articles (game);

-- ---------- matches ----------
create table if not exists matches (
  id text primary key,
  league text not null check (league in ('lfl','lec','valorant','cs2','other')),
  stage text,                          -- lie le match à une étape de season.stages[].id
  competition text not null,
  round text,
  team_a text not null,
  team_b text not null,
  match_date timestamptz not null,
  venue text,
  fr_team boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists matches_league_idx on matches (league);
create index if not exists matches_date_idx on matches (match_date);

-- ---------- standings (classement de saison régulière par ligue) ----------
create table if not exists standings (
  league text primary key check (league in ('lfl','lec')),
  league_label text not null,
  champion text,
  rows jsonb not null,                 -- [{team, wins, losses, highlight}]
  updated_at timestamptz not null default now()
);

-- ---------- season (feuille de route de la saison par ligue) ----------
create table if not exists season (
  league text primary key check (league in ('lfl','lec','valorant','cs2')),
  league_label text not null,
  stages jsonb not null                -- [{id, name, range, status, note, result}]
);

-- RLS : lecture publique, écriture réservée au rôle service (le scraper / toi)
alter table articles enable row level security;
alter table matches enable row level security;
alter table standings enable row level security;
alter table season enable row level security;

create policy "public read articles" on articles for select using (true);
create policy "public read matches" on matches for select using (true);
create policy "public read standings" on standings for select using (true);
create policy "public read season" on season for select using (true);

-- Aucune policy insert/update/delete pour anon : seule la clé service_role
-- (utilisée côté serveur par le scraper) peut écrire — elle bypasse RLS.
