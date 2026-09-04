-- La Riposte — données de départ (les mêmes que celles déjà en ligne sur
-- la version artifact). À exécuter après schema.sql, une seule fois.
-- Les image_url sont laissées à NULL ici : la première exécution du
-- scraper (déclenchée manuellement ou par le premier cron) les complètera
-- pour les articles encore présents sur les sites sources.

insert into articles (id, title, excerpt, url, source, game, published_at, featured) values
('kc-vct-emea', 'La Karmine Corp s''offre l''Europe sur VALORANT', 'La Karmine Corp remporte le VCT EMEA Stage 2, son premier titre européen, en battant Team Liquid 3-1 en finale à Badalone. Elle est qualifiée pour le VCT Champions à Shanghai (24 sept.–18 oct.), doté d''un million de dollars pour le vainqueur.', 'https://www.team-aaa.com/fr/actualite/la-karmine-corp-soffre-leurope-sur-valorant_136975', 'Team aAa', 'valorant', '2026-08-31T09:00:00Z', true),
('galions-lfl-champion', 'LFL Summer Split 2026 : Galions sacré champion de France', 'Galions bat TLN Pirates 3-1 et décroche le titre de champion de France de League of Legends, une troisième finale consécutive pour la formation.', 'https://www.team-aaa.com/fr/actualite/lfl-summer-split-2026-galions-sadjuge-le-titre-de-champion-de-france-face-a-tln-pirates_136999', 'Team aAa', 'lol', '2026-08-31T15:00:00Z', false),
('nip-krimbo-igl', 'Ninjas in Pyjamas officialise Krimbo en tant que nouvel IGL', 'Karim « Krimbo » Moussa rejoint Ninjas in Pyjamas en tant qu''IGL, prêté par BIG pour remplacer Marco « Snappi » Pfeiffer jusqu''à la fin de la saison.', 'https://www.team-aaa.com/fr/actualite/ninjas-in-pyjamas-officialise-krimbo-en-tant-que-nouvel-igl_137000', 'Team aAa', 'cs2', '2026-08-29T10:00:00Z', false),
('world-star-challengers', 'Riot Games lance le premier tournoi mondial Tier 2 : le World Star Challengers Invitational', 'Riot Games organise le tout premier tournoi mondial pour la scène Tier 2 de League of Legends, du 20 septembre au 2 octobre, avec 16 équipes venues d''Asie, d''Europe et des Amériques.', 'https://www.team-aaa.com/fr/actualite/riot-games-lance-le-premier-tournoi-mondial-pour-le-tier-2-de-league-of-legends-le-world-star-challengers-invitational_137008', 'Team aAa', 'lol', '2026-09-02T08:00:00Z', false),
('zevent-2026-guide', 'ZEVENT 2026 : tous les streams et les donation goals des participants', 'L''événement caritatif se déroule du 3 au 6 septembre à Montpellier, avec plus de 330 streameuses et streameurs mobilisés au profit de 22 associations.', 'https://www.team-aaa.com/fr/actualite/zevent-2026-tous-les-streams-et-les-donation-goals-des-participants_136996', 'Team aAa', 'general', '2026-09-02T12:00:00Z', false),
('starcraft-nexon', 'Vers un nouveau StarCraft RTS développé par Nexon', 'Blizzard s''associerait à Nexon pour développer un nouveau jeu de stratégie StarCraft, en parallèle d''un shooter AAA interne à la licence.', 'https://www.team-aaa.com/fr/actualite/vers-un-nouveau-starcraft-rts-developpe-par-nexon_137004', 'Team aAa', 'general', '2026-09-01T09:30:00Z', false),
('ewc-mlbb-vs-lol', 'EWC 2026 : Mobile Legends surpasse (encore) League of Legends', 'Mobile Legends: Bang Bang s''impose comme la discipline reine de l''Esports World Cup, avec plus de deux millions de spectateurs simultanés, devant League of Legends.', 'https://esportsinsider.com/fr/2026/08/ewc-2026-mobile-legends-surpasse-league-of-legends', 'Esports Insider FR', 'general', '2026-08-28T14:00:00Z', false),
('lfl-standings-quatre', 'LFL Summer Split : quatre équipes mènent la danse', 'Après six journées, Karmine Corp Blue, Solary, Galions et Skillcamp partagent la tête du classement avec le même bilan de victoires et défaites.', 'https://esportsinsider.com/fr/2026/08/lfl-summer-split-quatre-equipes-tete', 'Esports Insider FR', 'lol', '2026-07-20T11:00:00Z', false),
('lck-aiming-drx-jiwoo', 'Aiming rejoint DRX pendant que Jiwoo débarque chez KT Rolster', 'Échange direct entre deux équipes coréennes de League of Legends au poste de botlaner, sur fond de tensions internes chez KT Rolster.', 'https://esportsinsider.com/fr/2026/08/lck-aiming-drx-echange-adc-jiwoo', 'Esports Insider FR', 'lol', '2026-08-25T13:00:00Z', false),
('kc-invaincue-lec', 'Karmine Corp reste invaincue devant son public en LEC', 'La structure française affiche un bilan parfait de six victoires en six séries disputées à domicile depuis le début de la saison 2026.', 'https://esportsinsider.com/fr/2026/07/karmine-corp-invaincue-devant-public-lec', 'Esports Insider FR', 'lol', '2026-07-18T10:00:00Z', false),
('ewc-cs2-accor-arena', 'EWC 2026 : la finale Counter-Strike 2 déménage à l''Accor Arena', 'La finale du 23 août change de salle pour l''Accor Arena, face à l''engouement de la fan-base et à l''épuisement des billets pour la venue initiale.', 'https://esportsinsider.com/fr/2026/07/ewc-2026-la-finale-counter-strike-2-demenage-a-laccor-arena', 'Esports Insider FR', 'cs2', '2026-07-25T09:00:00Z', false)
on conflict (id) do nothing;

insert into matches (id, league, stage, competition, round, team_a, team_b, match_date, venue, fr_team) values
('lec-kc-giantx', 'lec', 'playoffs', 'LEC Summer Playoffs', 'Bracket haut', 'Karmine Corp', 'GIANTX', '2026-09-05T17:00:00+02:00', 'Madrid', true),
('lec-vit-g2', 'lec', 'playoffs', 'LEC Summer Playoffs', 'Bracket haut', 'Team Vitality', 'G2 Esports', '2026-09-05T12:00:00+02:00', 'Madrid', true),
('lec-ub-round2', 'lec', 'playoffs', 'LEC Summer Playoffs', 'Bracket haut – finale', 'Vainqueur J1', 'Vainqueur J1', '2026-09-06T17:00:00+02:00', 'Madrid', true),
('lec-lb-w2-1', 'lec', 'playoffs', 'LEC Summer Playoffs', 'Bracket bas', 'À déterminer', 'À déterminer', '2026-09-11T17:00:00+02:00', 'Berlin', true),
('lec-lb-w2-2', 'lec', 'playoffs', 'LEC Summer Playoffs', 'Bracket bas', 'À déterminer', 'À déterminer', '2026-09-12T17:00:00+02:00', 'Berlin', true),
('lec-finals-lb-demi', 'lec', 'playoffs', 'LEC Summer Finals', 'Demi-finale bracket bas', 'À déterminer', 'À déterminer', '2026-09-18T17:00:00+02:00', 'Nice', true),
('lec-finals-lb-finale', 'lec', 'playoffs', 'LEC Summer Finals', 'Finale bracket bas', 'À déterminer', 'À déterminer', '2026-09-19T17:00:00+02:00', 'Nice', true),
('lec-grande-finale', 'lec', 'playoffs', 'LEC Summer Finals', 'Grande finale', 'À déterminer', 'À déterminer', '2026-09-20T17:00:00+02:00', 'Nice', true),
('wsci-groupes', 'other', null, 'World Star Challengers Invitational', 'Phase de groupes', '16 équipes Tier 2', '5 régions', '2026-09-20T10:00:00+02:00', 'En ligne', false),
('vct-champions-shanghai', 'valorant', 'champions', 'VALORANT Champions 2026', 'Phase de groupes', 'Karmine Corp', '15 équipes qualifiées', '2026-09-24T09:00:00+02:00', 'Shanghai', true)
on conflict (id) do nothing;

insert into standings (league, league_label, champion, rows) values
('lec', 'LEC Summer Split 2026', null, '[
  {"team":"Karmine Corp","wins":9,"losses":0,"highlight":true},
  {"team":"Team Vitality","wins":7,"losses":2,"highlight":true},
  {"team":"G2 Esports","wins":6,"losses":3},
  {"team":"GIANTX","wins":5,"losses":4},
  {"team":"Natus Vincere","wins":5,"losses":4},
  {"team":"Movistar KOI","wins":4,"losses":5}
]'::jsonb),
('lfl', 'LFL Summer Split 2026', 'Galions', '[
  {"team":"Galions","wins":6,"losses":3,"highlight":true},
  {"team":"Solary","wins":6,"losses":3},
  {"team":"Skillcamp","wins":6,"losses":3},
  {"team":"Ici Japon Corp","wins":5,"losses":4},
  {"team":"TLN Pirates","wins":5,"losses":4},
  {"team":"KC Blue","wins":5,"losses":4},
  {"team":"JobLife","wins":5,"losses":4},
  {"team":"Vitality.Bee","wins":5,"losses":4},
  {"team":"ZYB","wins":2,"losses":7},
  {"team":"Esprit Shōnen","wins":0,"losses":8}
]'::jsonb)
on conflict (league) do nothing;

insert into season (league, league_label, stages) values
('lfl', 'LFL', '[
  {"id":"winter","name":"Winter Split","range":"Janvier – mars 2026","status":"done",
   "result":{"teamA":"Solary","scoreA":3,"teamB":"Galions","scoreB":0,"date":"2026-03-06","note":"LFL Winter Invitational — 3e place : French Flair"}},
  {"id":"spring","name":"Spring Split","range":"Mars – juin 2026","status":"done",
   "result":{"teamA":"Solary","scoreA":3,"teamB":"Galions","scoreB":1,"date":"2026-06-03","note":"Solary réalise le doublé Winter-Spring"}},
  {"id":"summer","name":"Summer Split","range":"Juin – août 2026","status":"done","note":"Champion : Galions (3-1 vs TLN Pirates)",
   "result":{"teamA":"Galions","scoreA":3,"teamB":"TLN Pirates","scoreB":1,"date":"2026-08-31"}},
  {"id":"masters","name":"EMEA Masters Summer","range":"Jusqu''au 19 octobre 2026","status":"upcoming","note":"Qualification des meilleures équipes LFL de l''été"}
]'::jsonb),
('lec', 'LEC', '[
  {"id":"winter","name":"Winter Split","range":"Janvier – mars 2026","status":"done",
   "result":{"teamA":"G2 Esports","scoreA":3,"teamB":"Karmine Corp","scoreB":2,"date":"2026-03-02","venue":"Badalone","note":"LEC Versus 2026"}},
  {"id":"spring","name":"Spring Split","range":"Mars – juin 2026","status":"done",
   "result":{"teamA":"G2 Esports","scoreA":3,"teamB":"Karmine Corp","scoreB":2,"date":"2026-06-07","note":"Cinquième manche décisive"}},
  {"id":"summer","name":"Summer Split","range":"Juin – août 2026","status":"done","note":"Karmine Corp termine 9-0"},
  {"id":"playoffs","name":"Summer Playoffs","range":"5 – 20 sept. 2026","status":"live","note":"Madrid → Berlin → Nice"},
  {"id":"masters","name":"EMEA Masters Summer","range":"Jusqu''au 19 octobre 2026","status":"upcoming"},
  {"id":"worlds","name":"Sélection Worlds 2026","range":"16 oct. – 14 nov. 2026","status":"upcoming","note":"États-Unis"}
]'::jsonb),
('valorant', 'Valorant (VCT)', '[
  {"id":"kickoff","name":"Kickoff + Masters Santiago","range":"15 janv. – 15 mars 2026","status":"done",
   "result":{"teamA":"Nongshim RedForce","teamB":"Paper Rex","note":"Nongshim RedForce championne, Paper Rex finaliste"}},
  {"id":"stage1","name":"Stage 1 + Masters London","range":"Mars – 21 juin 2026","status":"done",
   "result":{"teamA":"Leviatan","teamB":"Paper Rex","note":"Leviatan championne, Paper Rex finaliste"}},
  {"id":"stage2","name":"Stage 2 EMEA","range":"Juin – août 2026","status":"done",
   "result":{"teamA":"Karmine Corp","scoreA":3,"teamB":"Team Liquid","scoreB":1,"date":"2026-08-31","venue":"Badalone","note":"VCT EMEA Stage 2"}},
  {"id":"champions","name":"VALORANT Champions","range":"24 sept. – 18 oct. 2026","status":"upcoming","note":"Shanghai — Karmine Corp qualifiée"}
]'::jsonb),
('cs2', 'CS2', '[
  {"id":"ewc","name":"Esports World Cup 2026","range":"Terminé le 23 août 2026","status":"done",
   "result":{"teamA":"Team Spirit","scoreA":3,"teamB":"FUT Esports","scoreB":1,"date":"2026-08-23","venue":"Accor Arena, Paris"}},
  {"id":"starladder","name":"StarLadder StarSeries Fall","range":"17 – 20 sept. 2026","status":"upcoming","note":"Europe"},
  {"id":"esl","name":"ESL Pro League Saison 24","range":"3 – 11 oct. 2026","status":"upcoming","note":"Katowice"},
  {"id":"pgl-bucharest","name":"PGL Masters Bucarest","range":"24 – 31 oct. 2026","status":"upcoming"},
  {"id":"pgl-major","name":"PGL Major Singapour","range":"25 nov. – 13 déc. 2026","status":"upcoming","note":"Le tournoi majeur de la saison"}
]'::jsonb)
on conflict (league) do nothing;
