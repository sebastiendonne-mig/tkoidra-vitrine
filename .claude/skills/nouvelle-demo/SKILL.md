---
name: nouvelle-demo
description: Utilise ce skill quand une nouvelle démo IA (type sirene/comex/dvf/fraud/assurconseil) vient d'être déployée et doit être intégrée à tkoidra-vitrine. Couvre l'ajout de l'URL, l'entrée dictionnaire fr/en, et la vérification finale.
---

# Intégrer une nouvelle démo à tkoidra-vitrine

## Étapes

1. **URL** — Ajoute le slug et l'URL externe dans `appUrls` (`src/app/[lang]/use-cases/page.tsx`).
2. **Contenu** — Ajoute l'entrée `useCases.projects.<slug>` dans `src/dictionaries/fr.json` ET `en.json` : title, description, tag, challenge, solution, features (3 max, icon/title/description), stack (technos réelles utilisées, pas de termes génériques).
   - Délègue la rédaction à l'agent `use-case-entry` pour matcher le ton des entrées existantes.
3. **Parité i18n** — Lance l'agent `i18n-parity` pour confirmer que `fr.json` et `en.json` sont alignés.
4. **Build** — `npm run build` doit passer sans erreur avant de considérer la tâche terminée. Le repo est 100% SSG : une erreur ici casse le déploiement Vercel, pas juste l'environnement local.
5. **Revue** — Lance l'agent `code-reviewer` sur le diff avant de proposer le commit.

## Ce qu'il ne faut pas faire
- Ne pas inventer de métrique ou de stack pour une démo si l'info n'a pas été donnée — marquer `[À CONFIRMER]`.
- Ne pas casser la palette slate/teal existante pour la nouvelle section.
- Ne pas committer avant que `npm run build` soit passé.
