export interface BlogSection {
  heading: string;
  body: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  summary: string;
  tag: string;
  readTime: string;
  sections: BlogSection[];
  mdFile?: string;
}

const postsFr: BlogPost[] = [
  {
    slug: "po-ia-vs-po-classique",
    title: "Product Owner IA : ce qui change vraiment dans le rôle",
    summary:
      "Ce que le socle Scrum garde intact, et ce qui bascule vraiment : des critères d'acceptation probabilistes plutôt que déterministes, un rythme de roadmap dicté par l'expérimentation continue, et une proximité technique accrue avec l'ingénierie.",
    tag: "Product Ownership IA",
    readTime: "5 min",
    sections: [],
    mdFile: "content/blog/po-ia-vs-po-classique.md",
  },
  {
    slug: "cadrer-un-projet-ia",
    title: "Cadrer un projet IA : ce que révèle une étude sur 65 échecs",
    summary:
      "Une étude RAND Corporation menée auprès de 65 data scientists et ingénieurs ML identifie cinq causes racines d'échec des projets IA — la plupart n'ont rien de technique — et les questions de cadrage qui permettent de les éviter en amont.",
    tag: "Cadrage IA",
    readTime: "5 min",
    sections: [],
    mdFile: "content/blog/cadrer-un-projet-ia.md",
  },
  {
    slug: "architectures-agents-langgraph",
    title: "Bâtir des architectures d’agents autonomes avec LangGraph",
    summary:
      "Exploration des patterns multi-agents, cycles d’état et branchements conditionnels dans LangGraph pour des workflows IA production-ready.",
    tag: "Architecture IA",
    readTime: "8 min",
    sections: [
      {
        heading: "Pourquoi LangGraph change la donne",
        body: "Les pipelines LLM séquentiels atteignent rapidement leurs limites face à des workflows métiers complexes : gestion d’état persistant, branchements conditionnels, boucles de validation, appels d’outils en parallèle. LangGraph introduit un paradigme de graphe orienté où chaque noeud est une étape de traitement et chaque arête une transition d’état — potentiellement conditionnelle. Contrairement à LCEL, le graphe peut contenir des cycles, ce qui ouvre la porte aux architectures réflexives (reflect → act → observe → reflect).",
      },
      {
        heading: "Les primitives fondamentales",
        body: "Un StateGraph repose sur trois éléments. Les nodes : des fonctions pures (ou async) qui reçoivent l’état courant et retournent un patch d’état. Les edges : des transitions simples ou des fonctions conditionnelles qui retournent le nom du prochain noeud. L’état partagé : un TypedDict ou dataclass typé qui persiste à travers tout le workflow et sert de contrat entre les noeuds. La discipline de typage de l’état est la première garantie de robustesse en production.",
      },
      {
        heading: "Trois patterns de multi-agents",
        body: "Le pattern Supervisor : un noeud orchestrateur reçoit la tâche, sélectionne l’agent spécialisé via un LLM router, et consolide les résultats avant de répondre. Le pattern Hierarchical : les superviseurs délèguent eux-mêmes à des sous-agents, permettant des organisations en arbre pour des tâches très complexes. Le pattern Parallel : plusieurs agents s’exécutent via la primitive Send(), leurs résultats convergeant vers un noeud d’agrégation — particulièrement efficace pour la recherche documentaire multi-sources.",
      },
      {
        heading: "Conseils pour la mise en production",
        body: "Instrumentez chaque noeud avec LangSmith dès le développement — déboguer un graphe complexe sans traçabilité est un cauchemar. Définissez un timeout par noeud et un noeud escape_hatch qui interrompt les cycles si le compteur d’itérations dépasse un seuil. Persistez l’état avec un checkpointer (SQLite en développement, PostgreSQL en production) pour permettre le resume après interruption humaine ou erreur réseau. Versionnez vos graphes : un changement de noeud peut briser des paths non testés en cascade.",
      },
    ],
  },
  {
    slug: "optimiser-cout-tokens-production",
    title: "Optimiser le coût des tokens en production",
    summary:
      "Stratégies concrètes pour réduire la facture API de 60 à 80% sans sacrifier la qualité des réponses — caching, routage et compression.",
    tag: "LLMOps",
    readTime: "6 min",
    sections: [
      {
        heading: "La réalité des coûts à l’échelle",
        body: "Un assistant IA déployé sur 10 000 utilisateurs actifs, avec 20 messages/jour à 500 tokens input et 200 tokens output, génère environ 70 millions de tokens quotidiens. À 15$/M tokens pour un modèle frontier, c’est 1 050$/jour, soit 32 000$/mois. L’optimisation du coût des tokens n’est pas un luxe de fin de projet : c’est une condition de viabilité économique qui doit être intégrée dès la conception de l’architecture.",
      },
      {
        heading: "Prompt caching et compression",
        body: "La première ligne d’économie : le prompt caching natif. Claude et GPT-4 permettent de cacher les tokens de préfixe identiques — les tokens cachés ne sont facturés qu’à 10% du prix normal (Claude) ou pas du tout lors des appels suivants. La clé architecturale : placez tout le contenu statique (instructions système, exemples few-shot, documents de référence) en tête du prompt, le contenu variable à la fin. La compression de prompts via des outils comme LLMLingua permet de réduire un prompt de 40 à 60% en préservant 95% des performances.",
      },
      {
        heading: "Routage intelligent entre modèles",
        body: "Tous les appels ne nécessitent pas un modèle frontier. Un classifier léger (GPT-4o-mini fine-tuné ou un SVM entraîné sur vos logs annotés) peut router 60 à 70% des requêtes vers des modèles moins coûteux — Haiku, GPT-4o-mini — sans dégradation perçue. Sur les requêtes routées, la réduction de coût atteint 85 à 95%. Le coût du classifier lui-même est négligeable face aux économies réalisées dès 50 000 appels/jour.",
      },
      {
        heading: "Cache sémantique et batch API",
        body: "Un cache sémantique (Redis + embeddings) intercepte les requêtes similaires avant qu’elles n’atteignent l’API : 15 à 25% de hit rate typique sur des use cases à questions récurrentes (FAQ, support, recherche documentaire). Pour les traitements asynchrones non urgents, l’Anthropic Batch API et l’OpenAI Batch proposent 50% de réduction du coût unitaire. Structurez enfin vos réponses en JSON strict (Structured Outputs) : cela élimine le verbiage, réduit les tokens output de 20 à 30%, et simplifie le parsing en aval.",
      },
    ],
  },
  {
    slug: "rag-naif-vs-hybride",
    title: "Du RAG naïf au RAG hybride : retour d’expérience",
    summary:
      "Pourquoi le RAG vectoriel simple atteint ses limites et comment l’approche hybride (dense + sparse + reranking) transforme la précision de retrieval.",
    tag: "RAG & Retrieval",
    readTime: "10 min",
    sections: [
      {
        heading: "Les limites du RAG naïf",
        body: "Le RAG \"vanilla\" (embedding → cosine similarity → top-k chunks → LLM) fonctionne bien sur des questions directes et des bases de connaissances de taille modeste. Il échoue sur les requêtes complexes : questions négatives (\"quelles entreprises NE sont PAS éligibles ?\"), requêtes à multiples facettes, ou questions nécessitant une comparaison entre documents distants. En pratique, le taux de recall chute sous 60% dès que la base dépasse 10 000 documents — le signal vectoriel se noie dans la similarité de surface.",
      },
      {
        heading: "L’architecture hybride : dense + sparse",
        body: "Le RAG hybride combine deux stratégies complémentaires. La recherche vectorielle (Dense Retrieval via embeddings) excelle sur la similarité sémantique : elle retrouve des passages thématiquement proches même avec un vocabulaire radicalement différent. BM25 (Sparse Retrieval) excelle sur la correspondance lexicale exacte : indispensable pour les noms propres, codes produits, termes réglementaires et acronymes techniques. Les scores issus des deux pipelines sont fusionnés par Reciprocal Rank Fusion (RRF), une formule simple — 1/(k + rank) — mais redoutablement robuste face aux distributions de scores hétérogènes.",
      },
      {
        heading: "Le reranking : la couche différenciante",
        body: "Après la fusion des 20 à 50 candidats, un cross-encoder (ms-marco-MiniLM-L6 ou Cohere Rerank) reclasse les résultats selon leur pertinence réelle. Contrairement aux bi-encoders qui calculent des embeddings indépendamment, le cross-encoder analyse la paire (question, passage) conjointement dans un même forward pass — précision nettement supérieure. La latence ajoutée est de 100 à 200 ms, acceptable pour la majorité des use cases interactifs. Le gain en précision@3 est typiquement de 15 à 25 points.",
      },
      {
        heading: "Chunking et évaluation rigoureuse",
        body: "Le chunking est l’aspect le plus sous-estimé : des chunks trop petits perdent le contexte local, trop grands diluent la précision du retrieval. La technique \"parent-child chunking\" indexe de petits chunks (150 tokens) mais fournit au LLM leur chunk parent (600 tokens) pour préserver le contexte. Pour évaluer objectivement, construisez un golden set de 100 à 200 paires question/réponse et mesurez avec RAGAS (Faithfulness, Answer Relevancy, Context Precision). Ne vous fiez jamais aux impressions subjectives pour comparer deux architectures de retrieval.",
      },
    ],
  },
  {
    slug: "cahier-des-charges-ia-assurance-emprunteur",
    title: "Cahier des charges — Assistant IA de comparaison de garanties d’assurance emprunteur",
    summary:
      "Cadre méthodologique pour un projet d’automatisation par LLM de la comparaison de garanties loi Lemoine : état du marché, cartographie des risques RGPD/DDA/AI Act, trois architectures possibles et checklist go/no-go Comex. Version V0.1 — brouillon de travail.",
    tag: "Assurance & IA",
    readTime: "12 min",
    sections: [],
    mdFile: "content/blog/cahier-des-charges-ia-assurance-emprunteur.md",
  },
];

const allPosts: Record<string, BlogPost[]> = {
  fr: postsFr,
};

export function getPostsByLang(lang: string): BlogPost[] {
  return allPosts[lang] ?? allPosts["fr"];
}

export function getPostBySlug(lang: string, slug: string): BlogPost | undefined {
  return getPostsByLang(lang).find((p) => p.slug === slug);
}

export function getAllSlugs(): string[] {
  return postsFr.map((p) => p.slug);
}
