# Cadrer un projet IA : ce que révèle une étude sur 65 échecs

![Causes d'échec des projets IA et antidotes au cadrage](/images/blog/schema-cadrage-cause-antidote.svg)

Plus de 80 % des projets IA échoueraient — deux fois le taux d'échec des projets IT classiques. Le chiffre circule beaucoup, mais rarement avec sa source. En 2024, RAND Corporation a voulu comprendre ce qui se cache derrière : ses chercheurs ont interrogé 65 data scientists et ingénieurs ML expérimentés (au moins cinq ans de pratique, dans des entreprises de toutes tailles et de tous secteurs), lors d'entretiens semi-structurés d'environ 45 minutes. Résultat : un rapport construit sur du terrain, pas sur des suppositions — et cinq causes d'échec qui reviennent sans cesse, avant même que la technologie n'entre en jeu.

## Cinq causes, pas une seule

**1. Un problème mal compris ou mal communiqué.** C'est la cause la plus citée : 84 % des interviewés l'évoquent comme facteur principal. Le schéma se répète — la direction demande un modèle pour prédire un prix, l'équipe technique optimise la mauvaise métrique, et le désalignement n'apparaît qu'une fois le modèle livré et confronté au métier réel.

**2. Des données qui ne sont pas prêtes.** Deuxième cause la plus citée (30 interviewés sur 50). Les organisations pensent souvent disposer de bonnes données parce qu'elles reçoivent des rapports hebdomadaires — sans réaliser que ces données n'ont pas été structurées pour l'usage qu'on veut désormais en faire. Un interviewé du rapport le résume en une phrase : « 80 percent of AI is the dirty work of data engineering » (80 % de l'IA, c'est le sale boulot de l'ingénierie des données).

**3. Une course à la dernière techno plutôt qu'au problème métier.** Cité par 16 interviewés sur 50 — un biais côté équipe technique cette fois, pas côté direction. Les data scientists ont un intérêt personnel à expérimenter les derniers modèles pour rester employables, au détriment parfois d'une solution plus simple et déjà suffisante.

**4. Une infrastructure sous-investie.** Sans pipelines de données fiables ni outillage de déploiement, chaque projet repart de zéro et les équipes restent aveugles aux dégradations une fois le modèle en production.

**5. Un problème hors de portée de l'état de l'art actuel.** L'IA n'automatise pas tout. Certains cas d'usage — en particulier ceux qui demandent un jugement humain subjectif — résistent aux tentatives les plus sérieuses et les mieux financées.

## Ce que RAND recommande pour cadrer un projet IA

Le rapport ne s'arrête pas au diagnostic : il propose cinq principes, directement transposables en questions de cadrage.

- **Le problème est-il formulé avec l'équipe technique, pas seulement transmis ?** Le rapport insiste : les malentendus sur l'intention du projet causent plus d'échecs que n'importe quel autre facteur.
- **Ce problème mérite-t-il un engagement d'au moins un an ?** Si la réponse est non, RAND recommande de ne pas lancer le projet — un problème qui ne vaut pas cet horizon ne vaut probablement pas l'investissement du tout.
- **Reste-t-on concentré sur le problème, ou sur la technologie ?** Un cadrage sain nomme le problème métier avant de nommer l'outil.
- **L'infrastructure de données et de déploiement est-elle prévue dès le départ ?** Investir en amont raccourcit les délais et augmente la qualité des données disponibles pour entraîner un modèle.
- **A-t-on vérifié la faisabilité technique avant de s'engager ?** Un promoteur du projet a besoin d'un avis technique honnête, pas d'un enthousiasme de façade.

## Un angle qui parle directement aux agilistes

Un point du rapport mérite une attention particulière pour qui vient du monde Scrum : plusieurs interviewés estiment que l'application rigide de sprints classiques ne convient pas à un projet IA. La phase d'exploration des données a une durée imprévisible par nature — vouloir la découper en tickets de sprint de deux semaines produit surtout des tickets rouverts d'un sprint à l'autre ou artificiellement réduits pour tenir dans la case. La recommandation qui en découle n'est pas d'abandonner l'agilité, mais de la pratiquer dans son esprit initial : privilégier une communication fréquente sur l'état du projet plutôt qu'un supplément de rituel formel. C'est un rappel utile pour un PO ou un chef de projet qui pilote son premier projet IA avec les réflexes d'un projet logiciel classique.

## À retenir

Un projet IA n'échoue pas d'abord pour des raisons techniques. Sur les cinq causes identifiées par RAND, une seule — l'immaturité de la technologie sur certains cas d'usage — relève vraiment de la technique. Les quatre autres se jouent avant la première ligne de code : dans la formulation du problème, la lucidité sur les données disponibles, et la discipline à ne pas confondre l'outil avec l'objectif. Cadrer un projet IA, c'est d'abord répondre à ces questions-là. Le prochain article de cette série regarde l'autre bout de la chaîne : les erreurs qui surviennent une fois le projet lancé.

---

**Sources**

- Ryseff, James, Brandon F. De Bruhl, et Sydne J. Newberry, *The Root Causes of Failure for Artificial Intelligence Projects and How They Can Succeed: Avoiding the Anti-Patterns of AI*, RAND Corporation, RR-A2680-1, 13/08/2024 — https://www.rand.org/pubs/research_reports/RRA2680-1.html (PDF complet : https://www.rand.org/content/dam/rand/pubs/research_reports/RRA2600/RRA2680-1/RAND_RRA2680-1.pdf)

*Note de sourçage : l'ensemble du cadre (causes racines, statistiques, recommandations, citation d'interviewé) provient de cette étude unique, consultée le 13/09/2026. Le chiffre "plus de 80 % d'échec" est lui-même une estimation reprise par RAND depuis une source tierce (Fortune, 2022, citée en note c du rapport) — RAND ne l'a pas mesuré directement, il faut le traiter comme un ordre de grandeur largement cité plutôt que comme une statistique vérifiée de première main.*
