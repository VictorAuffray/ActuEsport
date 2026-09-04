# La Riposte — v2 (Next.js + Supabase)

Site d'actu esport FR : fil d'articles agrégés (titre + résumé + lien vers la source,
jamais l'article entier) avec **vraies photos** récupérées automatiquement sur chaque
article, plus un calendrier de saison par ligue (LFL / LEC / Valorant / CS2) avec
brackets, résultats et classements.

Cette version remplace le prototype (Claude Artifact) par un vrai projet déployable :
Next.js 14 (App Router) + Supabase (base de données) + Vercel (hébergement + cron).
Ça règle le seul vrai blocage du prototype : dans un Artifact, impossible de charger une
image externe ou d'appeler un site web depuis le scraper automatique. Ici, les fonctions
serverless de Vercel ont un accès internet complet, donc le scraper peut vraiment aller
lire chaque article et en extraire sa photo (balise `og:image`, la même que celle que
Slack/Discord/Twitter utilisent pour l'aperçu du lien).

Tout est prêt à déployer. Il te reste seulement à créer les 3 comptes (GitHub, Vercel,
Supabase — gratuits) et suivre les étapes ci-dessous, je ne peux pas les créer à ta place.

## 1. Créer le dépôt GitHub

1. Va sur [github.com/new](https://github.com/new), crée un repo (public ou privé, peu importe), par exemple `la-riposte`.
2. En local, dans ce dossier :

```bash
cd la-riposte-v2
git init
git add .
git commit -m "Initial commit — La Riposte v2"
git branch -M main
git remote add origin https://github.com/<ton-compte>/la-riposte.git
git push -u origin main
```

## 2. Créer le projet Supabase

1. Va sur [supabase.com](https://supabase.com) → **New project**. Choisis une région proche
   (Europe) et un mot de passe de base de données (à garder de côté, mais tu n'en auras
   pas besoin directement).
2. Une fois le projet créé, ouvre l'onglet **SQL Editor** (menu de gauche).
3. Colle le contenu de `supabase/schema.sql` (dans ce dossier) et exécute-le (bouton *Run*).
   Ça crée les 4 tables (`articles`, `matches`, `standings`, `season`) avec les bonnes
   permissions de lecture publique.
4. Nouveau script SQL : colle le contenu de `supabase/seed.sql` et exécute-le. Ça remplit
   le site avec le contenu de départ (les mêmes articles/matchs/classements que sur le
   prototype), pour que le site ne soit pas vide en attendant le premier passage du
   scraper.
5. Va dans **Project Settings → API**. Tu auras besoin de 3 valeurs pour l'étape suivante :
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - **service_role** key (clique sur *Reveal*) → `SUPABASE_SERVICE_ROLE_KEY` — **ne la
     partage jamais publiquement**, elle donne un accès complet à la base, contrairement à
     la clé `anon`.

## 3. Déployer sur Vercel

1. Va sur [vercel.com/new](https://vercel.com/new), connecte ton compte GitHub, et importe
   le repo `la-riposte`.
2. Vercel détecte automatiquement Next.js — pas besoin de changer les réglages de build.
3. Avant de cliquer sur *Deploy*, ouvre **Environment Variables** et ajoute :

   | Nom | Valeur |
   |---|---|
   | `NEXT_PUBLIC_SUPABASE_URL` | (depuis Supabase, étape 2.5) |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | (depuis Supabase, étape 2.5) |
   | `SUPABASE_SERVICE_ROLE_KEY` | (depuis Supabase, étape 2.5) |
   | `CRON_SECRET` | une chaîne aléatoire, ex. génère-la avec `openssl rand -hex 24` |

4. Clique sur **Deploy**. Au bout de 1-2 minutes, le site est en ligne sur une URL du type
   `la-riposte.vercel.app` (tu pourras brancher un nom de domaine perso plus tard dans
   *Project Settings → Domains*).

## 4. Le scraper automatique (photos + nouveaux articles)

`vercel.json` déclare déjà une tâche cron Vercel qui appelle `/api/cron/scrape` une fois par
jour (6h du matin UTC). Elle est activée automatiquement dès que le projet est déployé — rien
à faire. C'est la limite du plan Vercel gratuit (Hobby) : une exécution par jour maximum ; passe
au plan Pro si tu veux un scraping plus fréquent (toutes les heures par exemple).

Pour la déclencher toi-même et vérifier que tout fonctionne :

```bash
curl -H "Authorization: Bearer <ta_valeur_de_CRON_SECRET>" \
  https://<ton-site>.vercel.app/api/cron/scrape
```

Tu dois recevoir un JSON du style `{"ok":true,"inserted":3,"report":[...]}`. Le `report`
liste, pour chaque source, combien d'articles ont été trouvés/ajoutés (ou l'erreur
rencontrée). Les nouveaux articles insérés ont leur `image_url` remplie automatiquement
si l'article source a bien une balise `og:image`.

**Point d'attention** : le scraper a deux sources pour l'instant (`lib/scraper/sources.js`) :
- **Esports Insider FR** — via son flux RSS officiel, solide, ne devrait pas casser.
- **Team aAa** — ce site n'a pas de flux RSS, donc le scraper lit directement sa page
  d'actus et repère les liens d'articles par leur forme d'URL. C'est la partie la plus
  fragile : si le site change de design, ça peut cesser de trouver des articles (ça ne
  fera pas planter le reste, juste 0 article ajouté pour cette source). Si ça arrive,
  regarde les logs de la fonction (Vercel → ton projet → onglet *Logs*, filtre sur
  `[scraper] team-aaa`) et ajuste le sélecteur dans `fromTeamAaa()`.

Pour ajouter une nouvelle source (ex. un autre média esport FR avec un flux RSS), il
suffit d'ajouter une entrée dans le tableau `SOURCES` de `lib/scraper/sources.js` —
il y a un exemple en commentaire à la fin du fichier.

## 5. Mettre à jour le calendrier / les classements

Contrairement aux articles, le calendrier de saison (`season`), les matchs (`matches`) et
les classements (`standings`) ne sont pas scrapés automatiquement — ce sont des données
qui bougent moins souvent et qu'il vaut mieux vérifier avant publication. Pour les
mettre à jour : ouvre l'onglet **Table Editor** dans Supabase, table par table, et
modifie/ajoute des lignes directement (les colonnes `rows` et `stages` sont au format
JSON — tu peux éditer le JSON directement dans l'éditeur Supabase).

## Structure du projet

```
app/
  page.js                 Fil d'actu (route "/")
  calendrier/page.js       Calendrier (route "/calendrier")
  api/cron/scrape/route.js Scraper automatique (appelé par Vercel Cron)
  layout.js, globals.css   Layout global + design system
components/                Composants React (cartes, filtres, bracket, classements…)
lib/
  supabase.js              Clients Supabase (public + admin)
  gameMeta.js               Libellés/couleurs/icônes par jeu, helpers de date
  scraper/                  Sources, extraction d'image (og:image), classification
supabase/
  schema.sql                Schéma des tables (à exécuter en premier)
  seed.sql                  Données de départ (à exécuter après le schéma)
vercel.json                 Déclare le cron du scraper (1x/jour, limite du plan Hobby)
```

## Note légale

Le site n'affiche que des titres, des résumés courts et un lien vers l'article original
— jamais le texte intégral — et chaque carte renvoie vers le site de la rédaction source.
Les photos affichées viennent de la balise `og:image` de l'article lui-même (celle que le
média source publie spécifiquement pour l'aperçu de son propre lien), jamais générées ni
piochées ailleurs. Un rappel de ce fonctionnement est affiché en pied de page.
