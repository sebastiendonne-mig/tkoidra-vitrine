@AGENTS.md

# TKoidra Vitrine — règles du projet

## Stack
- Next.js 16 (App Router), TypeScript strict, Tailwind v4, React 19
- 100% SSG, déployé sur Vercel via CI/CD GitHub
- i18n maison via `src/dictionaries/{fr,en}.json` + segment dynamique `[lang]` (pas de next-intl, pas de CMS)

## Commandes
- `npm run dev` — serveur local
- `npm run build` — build de prod. À lancer avant toute annonce de "terminé" : c'est le seul filet de sécurité actuel (pas de tests automatisés dans ce repo).
- `npm run lint` — ESLint

## Conventions
- Toute chaîne visible côté utilisateur passe par les dictionnaires `fr.json` / `en.json` — jamais de texte en dur dans un composant.
- `fr.json` et `en.json` doivent rester strictement parallèles (mêmes clés, même structure). Toute clé ajoutée dans l'un doit être ajoutée dans l'autre dans le même tour.
- Les démos IA (sirene, comex, dvf, fraud, assurconseil) sont des applications externes : leur URL vit dans `appUrls` (`src/app/[lang]/use-cases/page.tsx`), leur contenu dans `useCases.projects.<slug>` des dictionnaires. Ce ne sont pas des routes internes du repo.
- Garde la palette existante (slate/teal) pour toute nouvelle section ; pas de nouvelle palette sans validation explicite.

## Ce qu'il ne faut PAS faire
- Ne pas ajouter de dépendance lourde pour une fonctionnalité simple — le repo est volontairement minimal.
- Ne pas casser le statut 100% SSG (pas de fetch dynamique non maîtrisé dans un Server Component de page).
- Ne pas inventer une métrique, une fonctionnalité ou un chiffre pour une démo si l'info n'a pas été donnée — marquer `[À CONFIRMER]` plutôt que d'extrapoler.

## Workflow recommandé
- Nouvelle démo à intégrer → skill `nouvelle-demo`
- Avant merge → agent `code-reviewer`
- Après tout ajout de contenu i18n → agent `i18n-parity`
