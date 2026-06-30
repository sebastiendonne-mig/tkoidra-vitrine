**Version :** V0.1 — brouillon de travail, à corriger et valider  
**Date de rédaction :** 29 juin 2026  
**Auteur :** Sébastien Donne — TKoidra, Consultant IA & Transformation Métier

---

## Avertissement liminaire

Ce document est une synthèse méthodologique et documentaire. Il a été construit avec l'assistance d'outils d'IA générative (recherche assistée par IA, voir Méthodologie en annexe) pour accélérer la structuration et la recherche — il ne s'agit ni d'un avis juridique formel, ni d'une garantie de conformité réglementaire, ni d'un produit commercial existant.

**Avant toute mise en œuvre opérationnelle**, les éléments réglementaires cités dans ce document (RGPD, AI Act, DDA, DORA) doivent être vérifiés et validés par un juriste qualifié et, le cas échéant, un Délégué à la Protection des Données (DPO).

**Point de vigilance particulier :** le calendrier de l'AI Act européen est sujet à évolution rapide. À la date de rédaction de ce document, un accord politique ("Digital Omnibus", 7 mai 2026) repoussant certaines obligations haut-risque a été voté en plénière par le Parlement européen (16 juin 2026), mais l'adoption formelle par le Conseil de l'UE n'était pas encore intervenue. **Vérifiez l'état en vigueur à la date de votre lecture** avant de vous appuyer sur les échéances citées en section 4.4.

---

## Guide de lecture par profil

| Profil | Sections prioritaires |
|---|---|
| Comex / Direction générale | 1, 9 |
| Direction de programme / DSI | 1, 5, 6, 7, 9 |
| Juridique / DPO / Conformité | 1, 4, 8 |
| Métier courtage / Distribution | 1, 2, 3 |
| Équipe technique (si projet lancé) | 5, 6, 7, 10 |

---

## Sommaire

1. Résumé exécutif
2. Contexte et cadrage du besoin
3. État de l'art du marché
4. Cartographie des risques juridiques et réglementaires
5. Exigences fonctionnelles
6. Exigences non-fonctionnelles et techniques
7. Architectures envisageables (3 options)
8. Gouvernance et gestion de projet
9. Grille de décision Comex / DSI
10. Annexes

---

## 1. Résumé exécutif

**Le problème métier.** Depuis la loi Lemoine (2022), un emprunteur peut changer d'assurance de prêt à tout moment, sans frais. Pour accepter la substitution, la banque doit constater l'équivalence des garanties selon une grille de critères définie par le CCSF (Comité Consultatif du Secteur Financier) — typiquement 11 à 18 critères selon le profil de risque, avec un principe strict : **un seul critère manqué suffit à un refus**. Le contrôle de cette équivalence demande aujourd'hui à un courtier de lire manuellement les conditions générales (CG) de deux contrats, document de plusieurs dizaines de pages chacun, sous un délai contraint (10 jours ouvrés pour répondre à la banque).

**Le constat marché.** Plusieurs acteurs (Minalea, Lya Protect, Yakoota) adressent déjà ce besoin, mais en s'appuyant sur des **bases de données de contrats pré-cataloguées et validées par des humains** — pas sur une lecture directe et automatisée de n'importe quel PDF par un LLM. Ce choix n'est pas un manque de capacité technique : c'est un choix de prudence délibéré face aux risques détaillés en section 4. La brique « lecture LLM zero-shot, sans base de données préexistante » ne semble pas couverte publiquement à ce jour — ce qui constitue un espace de différenciation réel, mais aussi la zone de risque la plus élevée.

**Ce que ce document est — et n'est pas.** C'est un cahier des charges méthodologique destiné à informer une décision de lancement de projet (construire, acheter, ou ne pas faire). Ce n'est **pas** une spécification technique prête à coder, ni une validation que le projet est conforme aux réglementations citées.

---

## 2. Contexte et cadrage du besoin

### 2.1 Cadre réglementaire du besoin métier

- **Loi Lemoine (2022)** : résiliation infra-annuelle de l'assurance emprunteur, sans frais, à tout moment.
- **Critères d'équivalence CCSF** : grille de critères (quotité, garanties ITT/IPT/PTIA, délais de franchise, exclusions...) que le nouveau contrat doit satisfaire au moins à l'équivalent de l'ancien, selon le profil de risque de l'emprunteur.
- **Délai réglementaire** : la banque dispose de 10 jours ouvrés pour répondre à une demande de substitution.
- **Conséquence d'un refus** : blocage potentiel du projet immobilier du client si la substitution est rejetée tardivement, ou perte de couverture si l'erreur d'équivalence n'est détectée qu'au moment d'un sinistre.

### 2.2 Le coût actuel pour un courtier

- Temps de lecture manuelle de deux jeux de CG (estimation qualitative, à objectiver en interne : plusieurs heures par dossier complexe).
- Risque d'erreur humaine sur un critère technique (ex. définition précise de l'ITT, exclusions territoriales).
- Difficulté accrue sur les contrats peu fréquents ou anciens, hors des catalogues des outils existants.

### 2.3 Pourquoi c'est un sujet de Comex maintenant

- Pression concurrentielle : les acteurs équipés d'outils de comparaison gagnent en vitesse de traitement.
- Marge du courtage sous tension : tout gain de productivité sur une tâche chronophage et à faible valeur ajoutée perçue est stratégique.
- Risque réputationnel et réglementaire croissant autour de l'usage non maîtrisé de l'IA générative en interne ("Shadow AI") — un cadrage explicite vaut mieux qu'un usage sauvage par les équipes.

---

## 3. État de l'art du marché

> **Note méthodologique :** cette section synthétise une recherche documentaire assistée par IA (juin 2026). Les sources primaires n'ont pas toutes été vérifiées de façon indépendante — voir Méthodologie en annexe. À recouper avant toute utilisation publique ou commerciale de ces affirmations.

| Acteur | Positionnement constaté | Approche technique |
|---|---|---|
| Minalea | Plateforme B2B pour courtiers, communication publique explicite contre le "Shadow AI" | Base de contrats pré-validés par des humains (plusieurs milliers de références) |
| Lya Protect | Outil de centralisation documentaire pour courtiers | Fonctionnalité de comparaison limitée aux contrats déjà référencés |
| Yakoota | Plateforme de notation/conformité pour conseillers en assurance | Base de données structurée, pas d'extraction LLM zero-shot documentée |
| Tomorro / Oro, LegalFly | Legaltech d'analyse de contrats par IA (hors secteur assurance) | Démontrent la maturité de la technologie LLM sur l'extraction de clauses contractuelles, sans verticalisation sur l'assurance emprunteur française |

**Verdict :** la combinaison précise « lecture LLM directe de n'importe quel PDF, sans base de données préexistante, avec génération automatique d'une grille CCSF et d'un projet de lettre » n'a pas été identifiée comme un produit public sur le marché français à la date de cette recherche. Cela ne signifie pas qu'elle n'existe pas en interne chez un grand groupe (banque-assurance, courtier de réseau) — seulement qu'elle n'est pas documentée publiquement.

**Où se situe l'espace de différenciation réel :** la capacité à traiter un contrat jamais catalogué, dès le premier usage, sans dépendre de la mise à jour d'une base de données propriétaire.

**Où il ne faut pas réinventer la roue :** la fiabilité et la gouvernance qu'apporte une base de contrats validés humainement reste un atout réel des acteurs en place — un nouveau projet doit assumer ce compromis plutôt que l'ignorer (voir section 7, option B).

---

## 4. Cartographie des risques juridiques et réglementaires

> Cette section est une cartographie de points de vigilance, **pas une analyse juridique validée**. Chaque point doit être confirmé par un juriste avant toute décision de financement ou de lancement.

### 4.1 RGPD — la fausse sécurité du document "générique"

L'hypothèse intuitive — « les conditions générales sont génériques, donc pas de données personnelles, donc pas de RGPD » — ne résiste pas à l'examen :

| Mécanisme de contamination | Risque |
|---|---|
| Liasses fusionnées (CG + conditions particulières + FSI envoyées en un seul PDF) | Données d'identification directes, données financières |
| Paraphes / signature manuscrite sur le document | Donnée biométrique / d'identification directe |
| Cachet commercial du courtier (nom, email, ligne directe) | Donnée personnelle du professionnel |
| Annexes médicales AERAS (pathologies, exclusions spécifiques) | Donnée de santé (art. 9 RGPD — catégorie sensible) |
| Métadonnées du fichier PDF (auteur, chemin de sauvegarde, ex. noms de dossiers clients) | Identification indirecte par corrélation |

**Conséquence pratique :** un outil destiné à des utilisateurs réels doit présumer que des données personnelles **vont** transiter, et concevoir l'architecture en conséquence (voir section 6), plutôt que de présumer un périmètre "hors RGPD" par défaut.

### 4.2 Risques indépendants du RGPD

- **Parasitisme économique (art. 1240 du Code civil) :** l'ingestion de CG d'un assureur par une API LLM commerciale tierce pourrait être qualifiée de captation de savoir-faire (rédaction, calibrage actuariel), même sans contrefaçon au sens du droit d'auteur (les CG, très normées, bénéficient d'une protection incertaine par le droit d'auteur).
- **CGU des portails assureurs :** interdisent fréquemment l'extraction automatisée de documents. Un courtier utilisateur pourrait se trouver en violation de sa propre convention de distribution.
- **DORA (résilience numérique) :** impose une cartographie et une gestion contractuelle des prestataires tiers — y compris pour un outil en phase de test.

### 4.3 DDA et devoir de conseil

- Le courtier reste seul responsable de la vérification de l'équivalence CCSF, même s'il s'appuie sur un outil IA — l'ACPR est explicite : l'IA n'atténue pas la responsabilité du distributeur humain.
- Le risque principal est celui de l'hallucination : une extraction erronée d'un critère discriminant (ex. exclusion psychiatrique) peut conduire à un refus de la banque, ou pire, à une absence de couverture non détectée jusqu'à un sinistre.
- **Exigence non négociable qui en découle :** traçabilité systématique (chaque garantie extraite doit être reliée à la clause source exacte du document), et validation humaine documentée avant toute décision opérationnelle.

### 4.4 AI Act — zone grise, calendrier mouvant

- La classification d'un outil d'aide à l'évaluation de garanties d'assurance au regard des catégories "haut risque" de l'AI Act n'est pas tranchée publiquement à la date de rédaction — **point à faire valider par un juriste spécialisé AI Act**.
- Le calendrier lui-même a bougé récemment (accord "Digital Omnibus" du 7 mai 2026, vote du Parlement le 16 juin 2026, adoption formelle du Conseil encore en attente) — **à revérifier systématiquement avant toute communication publique sur ce sujet**.

### 4.5 Tableau de synthèse — risques × mesures d'atténuation

| Axe | Mesure | Criticité |
|---|---|---|
| Ingestion de fichiers | Filtre de rejet des liasses suspectes (taille excessive, noms de fichiers évocateurs : "dossier", "signé", "FSI") | Critique |
| Confidentialité | Nettoyage systématique des métadonnées du PDF avant tout traitement | Critique |
| Confidentialité | Anonymisation par reconnaissance d'entités nommées (NER) en local, avant tout envoi à une API externe | Majeur |
| Contractuel | Engagement contractuel de type "Zero Data Retention" avec le fournisseur LLM retenu — conditions exactes à vérifier auprès du fournisseur choisi | Critique |
| Contractuel | Accord de sous-traitance (DPA) avec les utilisateurs professionnels, même en phase de test | Majeur |
| UX / responsabilité | Étape de certification explicite par l'utilisateur au moment du dépôt de fichier | Critique |
| UX / DDA | Traçabilité cliquable de chaque garantie extraite vers sa clause source | Critique |

---

## 5. Exigences fonctionnelles

### 5.1 Cas d'usage prioritaires

- **V1 — Comparaison de CG génériques** : deux documents de conditions générales (sans dossier client), extraction et grille de comparaison.
- **V2 — Extension contrôlée** : prise en compte de documents incluant des éléments de dossier client, avec les mesures de la section 4.5 strictement actives, et validation humaine renforcée.

### 5.2 Parcours utilisateur cible (V1)

1. Dépôt de deux fichiers PDF (contrat actuel / contrat envisagé).
2. Vérification automatique (filtre anti-liasse, nettoyage des métadonnées).
3. Extraction des garanties par critère CCSF, avec citation de la clause source pour chacune.
4. Génération d'une grille de comparaison structurée, avec indicateur de confiance par critère.
5. Revue humaine obligatoire — aucune lettre n'est générée sans validation explicite de l'utilisateur sur chaque critère.
6. Génération d'un projet de lettre de substitution, à valider et personnaliser avant tout envoi réel.

### 5.3 Exigences non négociables

- Traçabilité systématique (clause source visible et vérifiable pour chaque donnée extraite).
- Point de blocage humain avant toute production de document destiné à un tiers (banque, client).
- Aucune décision d'équivalence n'est présentée comme définitive ou validée par l'outil seul.

---

## 6. Exigences non-fonctionnelles et techniques

| Catégorie | Exigence |
|---|---|
| Sécurité | Chiffrement des documents en transit et au repos, gestion fine des droits d'accès |
| Confidentialité | Nettoyage des métadonnées, anonymisation NER locale avant tout appel à une API tierce |
| Traçabilité | Journalisation complète des extractions et des validations humaines (utile pour DDA et audits ACPR) |
| Résilience (DORA) | Cartographie des prestataires tiers (hébergeur, fournisseur LLM), clauses de réversibilité |
| Hébergement | Localisation des données à clarifier (UE de préférence, à valider selon le fournisseur retenu) |
| Auditabilité | Conservation des versions de grilles générées, horodatage des validations humaines |

---

## 7. Architectures envisageables

### Option A — Tout LLM avec garde-fous renforcés

Extraction directe par LLM sur n'importe quel PDF, sans base de données préexistante. Traçabilité systématique, validation humaine obligatoire, pipeline de confidentialité complet (filtre anti-liasse, nettoyage métadonnées, NER).

- **Avantages :** fonctionne dès le premier contrat, sur n'importe quel assureur ; pas de coût de maintenance d'un catalogue.
- **Inconvénients :** fiabilité dépendante de la qualité du modèle et du prompt ; risque d'hallucination résiduel malgré les garde-fous ; charge d'ingénierie de confidentialité non négligeable.
- **Profil d'équipe :** ingénieur IA/LLM, ingénieur sécurité/conformité données.
- **Délai de mise en œuvre :** qualitativement le plus rapide des trois pour un MVP fonctionnel, mais le plus long avant d'atteindre un niveau de fiabilité défendable en production.

### Option B — Hybride LLM + référentiel (logique proche de l'existant marché)

Catalogue de contrats fréquents, pré-validés humainement (à l'image de Minalea). Le LLM n'intervient que pour les contrats hors catalogue, en pré-remplissage, avec validation humaine systématique avant toute intégration au référentiel.

- **Avantages :** fiabilité supérieure sur le cœur du portefeuille ; dégradation progressive plutôt que rupture sur les cas rares ; positionnement plus facile à défendre auprès des assureurs et de l'ACPR.
- **Inconvénients :** coût de maintenance récurrent du référentiel (mise à jour à chaque évolution contractuelle) ; valeur d'usage plus lente à délivrer (il faut peupler la base).
- **Profil d'équipe :** ingénieur IA/LLM, équipe de validation métier (analystes contrats), ingénieur data.
- **Délai de mise en œuvre :** plus long avant le premier usage utile ; le plus aligné avec les pratiques actuelles du marché.

### Option C — LLM en première passe, validation systématique avant intégration

Le LLM accélère uniquement le travail humain — toute extraction reste non opposable jusqu'à relecture et validation explicite par un expert qualifié, dossier par dossier, sans constitution de référentiel automatisé.

- **Avantages :** posture réglementaire la plus défendable (aucune décision automatisée non supervisée) ; risque DDA/RGPD le mieux maîtrisé.
- **Inconvénients :** gain de productivité plus limité (le temps humain de relecture n'est pas supprimé, seulement réduit) ; modèle moins scalable, dépendant de ressources humaines qualifiées disponibles.
- **Profil d'équipe :** ingénieur IA/LLM (allégé), experts contrats pour la validation.
- **Délai de mise en œuvre :** le plus rapide à sécuriser réglementairement ; le moins disruptif en termes de gain de productivité.

### Synthèse comparative

| Critère | A — Tout LLM | B — Hybride | C — LLM + validation systématique |
|---|---|---|---|
| Risque réglementaire résiduel | Élevé | Moyen | Faible |
| Vitesse de mise en valeur | Rapide | Lente | Rapide |
| Coût de maintenance | Faible | Élevé | Faible |
| Gain de productivité réel | Élevé (si fiable) | Élevé | Modéré |
| Alignement avec les pratiques actuelles du marché | Faible (différenciant) | Fort | Fort |

---

## 8. Gouvernance et gestion de projet

### 8.1 Rôles à impliquer

- **Sponsor métier** (direction courtage / distribution)
- **DPO** — validation du traitement de données dès la phase de conception
- **Juriste** (réglementation assurance, RGPD, AI Act)
- **RSSI** — sécurité de l'architecture et des prestataires tiers
- **Équipe technique** (IA/LLM, data, sécurité)
- **Référents métier** (courtiers pilotes pour les tests)

### 8.2 Jalons de validation obligatoires avant mise en production

1. Validation juridique du périmètre de données traité (RGPD, DPA, CGU)
2. Audit de sécurité de l'architecture (chiffrement, gestion des accès, engagement du fournisseur LLM)
3. Test de fiabilité sur un échantillon de contrats avec mesure du taux d'erreur par rapport à une relecture humaine experte
4. Validation des CGU encadrant explicitement le rôle d'"assistant de lecture" et la responsabilité du courtier
5. Revue de conformité DORA sur la chaîne de sous-traitance (outil + fournisseur LLM)

### 8.3 Gestion des risques résiduels

- Plan de correction en cas d'erreur d'extraction détectée après mise en production.
- Procédure de remontée et de traitement des incidents de confidentialité.
- Revue périodique du calendrier réglementaire (AI Act notamment, voir 4.4).

---

## 9. Grille de décision Comex / DSI

### 9.1 Checklist go / no-go

- [ ] Le périmètre de données traité est-il clairement défini et validé par le DPO ?
- [ ] Un engagement contractuel de confidentialité (type Zero Data Retention) est-il obtenu auprès du fournisseur LLM envisagé ?
- [ ] L'architecture prévoit-elle une traçabilité systématique (clause source pour chaque extraction) ?
- [ ] Une étape de validation humaine documentée est-elle obligatoire avant toute production de document opposable ?
- [ ] Les CGU/CGV prévues encadrent-elles explicitement la responsabilité du courtier (DDA) ?
- [ ] La conformité DORA sur la chaîne de sous-traitance a-t-elle été cartographiée ?
- [ ] Le calendrier et la classification AI Act applicables ont-ils été vérifiés à la date de lancement ?

### 9.2 Postes à budgétiser (ordres de grandeur qualitatifs, à chiffrer en interne)

- Développement technique (LLM, pipeline de confidentialité, interface)
- Revue juridique (DPA, CGU, classification AI Act)
- Audit de sécurité initial et récurrent
- Maintenance et mise à jour réglementaire continue
- Formation des équipes courtage à l'usage de l'outil et à ses limites

### 9.3 Questions à poser à un éditeur tiers, si achat plutôt que construction interne

- Quelle est l'architecture technique réelle (tout-LLM, hybride, validation systématique) ?
- Quel engagement contractuel de confidentialité est proposé avec le ou les fournisseurs LLM sous-jacents ?
- Comment la traçabilité des extractions est-elle assurée et démontrable en cas de contrôle ACPR ?
- Quel est le taux d'erreur mesuré, et sur quel échantillon de validation ?
- Comment l'éditeur encadre-t-il contractuellement la répartition de responsabilité en cas d'erreur (devoir de conseil) ?

---

## 10. Annexes

### 10.1 Glossaire

- **CCSF** : Comité Consultatif du Secteur Financier — définit les critères d'équivalence des garanties.
- **CG** : Conditions Générales (document contractuel générique, applicable à tous les souscripteurs d'une offre).
- **DDA** : Directive sur la Distribution d'Assurances.
- **DORA** : Digital Operational Resilience Act (résilience numérique des acteurs financiers).
- **DPA** : Data Processing Agreement (accord de sous-traitance RGPD).
- **FSI** : Fiche Standardisée d'Information (document précontractuel détaillant les critères d'équivalence).
- **NER** : Named Entity Recognition (reconnaissance d'entités nommées, technique d'anonymisation).
- **ZDR** : Zero Data Retention (engagement contractuel de non-conservation des données par un fournisseur).

### 10.2 Méthodologie

Ce document s'appuie sur deux recherches documentaires conduites avec un outil d'IA générative (recherche approfondie), portant respectivement sur l'état du marché et sur la cartographie des risques juridiques/réglementaires. Les sources citées dans ces recherches n'ont pas toutes été vérifiées de façon indépendante par l'auteur. **Avant toute publication ou décision s'appuyant sur les affirmations factuelles de ce document (positionnement précis d'un acteur du marché, état exact d'une réglementation), une vérification auprès de sources primaires ou d'un expert qualifié est recommandée.**

### 10.3 Disclaimer juridique complet

Ce document ne constitue pas un avis juridique. Il a été élaboré à des fins de cadrage méthodologique et de structuration de la réflexion préalable à un éventuel projet. Toute décision d'investissement, de développement ou de mise en production doit faire l'objet d'une validation juridique formelle, notamment auprès d'un avocat spécialisé en droit des assurances, en protection des données, et en réglementation de l'intelligence artificielle.

**Date de dernière mise à jour : 29 juin 2026.**
