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
  date: string;
  sections: BlogSection[];
  mdFile?: string;
}

const postsFr: BlogPost[] = [
  {
    slug: "architectures-agents-langgraph",
    title: "Bâtir des architectures d’agents autonomes avec LangGraph",
    summary:
      "Exploration des patterns multi-agents, cycles d’état et branchements conditionnels dans LangGraph pour des workflows IA production-ready.",
    tag: "Architecture IA",
    readTime: "8 min",
    date: "2025-12-10",
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
    date: "2025-11-22",
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
    date: "2025-10-15",
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
    date: "2026-06-29",
    sections: [],
    mdFile: "content/blog/cahier-des-charges-ia-assurance-emprunteur.md",
  },
];

const postsEn: BlogPost[] = [
  {
    slug: "architectures-agents-langgraph",
    title: "Building Autonomous Agent Architectures with LangGraph",
    summary:
      "Exploring multi-agent patterns, state cycles, and conditional branching in LangGraph for production-ready AI workflows.",
    tag: "AI Architecture",
    readTime: "8 min",
    date: "2025-12-10",
    sections: [
      {
        heading: "Why LangGraph changes everything",
        body: "Sequential LLM pipelines quickly hit their limits when dealing with complex business workflows: persistent state management, conditional branching, validation loops, parallel tool calls. LangGraph introduces a directed graph paradigm where each node is a processing step and each edge is a state transition — potentially conditional. Unlike LCEL, the graph can contain cycles, which enables reflective architectures (reflect → act → observe → reflect).",
      },
      {
        heading: "Core primitives",
        body: "A StateGraph rests on three elements. Nodes: pure (or async) functions that receive the current state and return a state patch. Edges: simple transitions or conditional functions that return the next node name. Shared state: a typed TypedDict or dataclass that persists throughout the workflow and acts as the contract between nodes. State typing discipline is the first guarantee of production robustness.",
      },
      {
        heading: "Three multi-agent patterns",
        body: "The Supervisor pattern: an orchestrator node receives the task, selects the appropriate specialist agent via an LLM router, and consolidates results before responding. The Hierarchical pattern: supervisors can themselves delegate to sub-agents, enabling tree-structured organizations for highly complex tasks. The Parallel pattern: multiple agents execute via the Send() primitive, with their results converging into an aggregation node — particularly effective for multi-source document retrieval.",
      },
      {
        heading: "Production advice",
        body: "Instrument every node with LangSmith from day one — debugging a complex graph without traceability is a nightmare. Define per-node timeouts and an escape_hatch node that breaks cycles when an iteration counter exceeds a threshold. Persist state with a checkpointer (SQLite in dev, PostgreSQL in prod) to enable resumption after human interruptions or network errors. Version your graphs: a node change can silently break untested downstream paths.",
      },
    ],
  },
  {
    slug: "optimiser-cout-tokens-production",
    title: "Optimizing Token Costs in Production",
    summary:
      "Concrete strategies to cut your API bill by 60–80% without sacrificing response quality — caching, routing, and compression.",
    tag: "LLMOps",
    readTime: "6 min",
    date: "2025-11-22",
    sections: [
      {
        heading: "The reality of costs at scale",
        body: "An AI assistant deployed to 10,000 active users, averaging 20 messages/day at 500 input tokens and 200 output tokens, generates around 70 million tokens daily. At $15/M tokens for a frontier model, that is $1,050/day — $32,000/month. Token cost optimization is not a late-stage luxury; it is an economic viability condition that must be baked into the architecture from day one.",
      },
      {
        heading: "Prompt caching and compression",
        body: "The first line of savings: native prompt caching. Claude and GPT-4 let you cache identical prefix tokens — cached tokens are billed at 10% of normal price (Claude) or nothing on subsequent calls. The key architectural principle: place all static content (system instructions, few-shot examples, reference documents) at the top of the prompt, variable content at the end. Prompt compression tools like LLMLingua can reduce a prompt by 40–60% while preserving 95% of performance.",
      },
      {
        heading: "Intelligent model routing",
        body: "Not every call needs a frontier model. A lightweight classifier (fine-tuned GPT-4o-mini or an SVM trained on annotated logs) can route 60–70% of requests to cheaper models — Haiku, GPT-4o-mini — without perceptible quality degradation. On routed requests, cost reduction reaches 85–95%. The classifier cost itself is negligible against the savings realized past 50,000 calls/day.",
      },
      {
        heading: "Semantic cache and batch API",
        body: "A semantic cache (Redis + embeddings) intercepts similar requests before they reach the API: 15–25% hit rate typical for use cases with recurring questions (FAQ, support, document search). For non-urgent async processing, the Anthropic Batch API and OpenAI Batch offer 50% unit cost reduction. Finally, enforce strict JSON responses (Structured Outputs): this eliminates verbosity, reduces output tokens by 20–30%, and simplifies downstream parsing.",
      },
    ],
  },
  {
    slug: "rag-naif-vs-hybride",
    title: "From Naive RAG to Hybrid RAG: Lessons Learned",
    summary:
      "Why simple vector RAG hits a ceiling and how the hybrid approach (dense + sparse + reranking) transforms retrieval precision.",
    tag: "RAG & Retrieval",
    readTime: "10 min",
    date: "2025-10-15",
    sections: [
      {
        heading: "The limits of naive RAG",
        body: "Vanilla RAG (embedding → cosine similarity → top-k chunks → LLM) works well for straightforward questions and moderately sized knowledge bases. It fails on complex queries: negative questions (\"which companies are NOT eligible?\"), multi-faceted requests, or questions requiring comparison across distant documents. In practice, recall drops below 60% once the base exceeds 10,000 documents — the vector signal gets drowned in surface-level similarity noise.",
      },
      {
        heading: "Hybrid architecture: dense + sparse",
        body: "Hybrid RAG combines two complementary retrieval strategies. Dense Retrieval (vector embeddings) excels at semantic similarity: it finds thematically related passages even with radically different vocabulary. BM25 (Sparse Retrieval) excels at exact lexical matching: essential for proper nouns, product codes, regulatory terms, and technical acronyms. Scores from both pipelines are merged via Reciprocal Rank Fusion (RRF), a simple formula — 1/(k + rank) — that is remarkably robust across heterogeneous score distributions.",
      },
      {
        heading: "Reranking: the differentiating layer",
        body: "After merging 20–50 candidates, a cross-encoder (ms-marco-MiniLM-L6 or Cohere Rerank) re-ranks results by true relevance. Unlike bi-encoders that compute embeddings independently, the cross-encoder analyzes the (question, passage) pair jointly in a single forward pass — substantially higher precision. Added latency is 100–200ms, acceptable for most interactive use cases. The precision@3 gain is typically 15–25 percentage points.",
      },
      {
        heading: "Chunking and rigorous evaluation",
        body: "Chunking is the most underrated aspect: chunks too small lose local context, chunks too large dilute retrieval precision. The \"parent-child chunking\" technique indexes small chunks (150 tokens) but feeds the LLM their parent chunk (600 tokens) to preserve context. For objective evaluation, build a golden set of 100–200 question/answer pairs and measure with RAGAS (Faithfulness, Answer Relevancy, Context Precision). Never rely on subjective impressions when comparing two retrieval architectures.",
      },
    ],
  },
];

const allPosts: Record<string, BlogPost[]> = {
  fr: postsFr,
  en: postsEn,
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
