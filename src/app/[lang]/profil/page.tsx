import type { Metadata } from "next";
import { i18n } from "../../../../i18n-config";
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  const url = `https://tkoidra.com/${lang}/profil`;
  return {
    title: isFr
      ? "Profil | Sébastien Donné | TKoidra"
      : "Profile | Sébastien Donné | TKoidra",
    description: isFr
      ? "RTE SAFe, Coach Agile senior et Product Owner IA. 15 ans de pilotage de programmes complexes, appliqué au pilotage de projets IA de bout en bout."
      : "SAFe RTE, senior Agile Coach and AI Product Owner. 15 years leading complex programmes, now applied to end-to-end AI project leadership.",
    alternates: {
      canonical: url,
      languages: {
        fr: "https://tkoidra.com/fr/profil",
        en: "https://tkoidra.com/en/profil",
      },
    },
  };
}

const content = {
  fr: {
    badge: "Profil",
    name: "Sébastien Donné",
    tagline: "RTE SAFe · Coach Agile · Scrum Master · Product Owner · Pilotage de projets IA",
    intro: "Quinze ans à synchroniser des équipes, lever des blocages inter-squads et faire franchir un palier de maturité à des programmes complexes. J'applique aujourd'hui cette même rigueur méthodologique au pilotage de projets IA de bout en bout : cadrage, choix d'architecture, prototypage, industrialisation et conduite du changement.",
    backLabel: "Retour",
    portfolio: {
      heading: "Portfolio en production",
      subtitle: "Trois applications développées, déployées et maintenues en production, illustrant une capacité réelle à transformer un besoin métier en outil fonctionnel.",
      apps: [
        {
          name: "Comex",
          url: "https://comex.tkoidra.com",
          tag: "comex.tkoidra.com",
          description: "Outil de cadrage stratégique IA pour comités de direction : génère en quelques minutes une proposition structurée (architecture technique, stack recommandée, budget, ROI estimé) à partir d'une description de besoin métier. Conçu pour accélérer la prise de décision sur des projets IA dès les premiers échanges avec un comité exécutif.",
        },
        {
          name: "Sirene",
          url: "https://sirene.tkoidra.com",
          tag: "sirene.tkoidra.com",
          description: "Interface de requêtage en langage naturel sur la base SIRENE/INSEE, avec suggestion automatique de codes NAF et export des résultats. Permet d'interroger une base de données publique complexe sans connaissance technique préalable du schéma de données.",
        },
        {
          name: "DVF",
          url: "https://dvf.tkoidra.com",
          tag: "dvf.tkoidra.com",
          description: "Outil d'analyse de données de marché immobilier (Demandes de Valeurs Foncières), pensé pour rendre exploitable une donnée publique dense et peu structurée.",
        },
      ],
      wip: "Un quatrième outil, dédié à la détection de fraude, est actuellement en développement.",
      stackNote: "Chaque application est construite sur une stack moderne (React, Vite, TypeScript, API Claude) et déployée en continu sur Vercel — la même rigueur d'industrialisation que j'applique aux projets que j'accompagne.",
    },
    stack: {
      heading: "Stack & compétences",
      categories: [
        {
          label: "Agilité & leadership à l'échelle",
          skills: "RTE SAFe, Coach Agile, Scrum Master, CSPO, animation de programmes multi-squads, levée de blocages inter-équipes, pilotage par OKR et KPIs (vélocité, burndown), méthode ADKAR pour la conduite du changement, facilitation d'ateliers, Jira, Confluence, Miro AI",
        },
        {
          label: "Cadrage & stratégie de projets IA",
          skills: "Modélisation BPMN (As-Is / To-Be), priorisation de cas d'usage, calcul de ROI, gouvernance IA et conformité RGPD / AI Act, qualité des données",
        },
        {
          label: "IA & Agents",
          skills: "API Claude / Anthropic, Gemini, prompt engineering avancé, NotebookLM pour la connaissance ancrée (grounded knowledge)",
        },
        {
          label: "Plateformes",
          skills: "Google Cloud, Microsoft 365 Copilot, Copilot Studio, écosystème Anthropic Claude",
        },
        {
          label: "Développement assisté par IA (vibecoding)",
          skills: "Claude Code pour l'exécution, Cursor pour l'édition, Vercel pour le déploiement, GitHub pour le versioning",
        },
      ],
    },
    certifications: {
      heading: "Certifications",
      groups: [
        {
          label: "Anthropic",
          items: ["AI Fluency Framework & Foundations", "Claude 101", "Claude Cowork", "Claude Code"],
        },
        {
          label: "Google Cloud",
          items: ["Generative AI Leader", "Cloud Digital Leader"],
        },
        {
          label: "Agilité",
          items: ["Certified Scrum Product Owner (CSPO)", "Release Train Engineer SAFe", "Master Coach"],
        },
      ],
    },
    parcours: {
      heading: "Parcours",
      paragraphs: [
        "Mon parcours s'est construit autour d'un fil conducteur : faire en sorte que les organisations s'approprient réellement les transformations qu'elles engagent, plutôt que de les subir. Pendant plusieurs années, j'ai dirigé le Lab Innovation du Groupe AGPM, où j'ai conçu et piloté un espace collaboratif dédié à transformer des idées métier en prototypes via le Design Thinking, tout en animant l'acculturation des directions IT et métiers aux nouvelles pratiques collaboratives — un terrain d'entraînement direct à l'animation de programmes complexes et à la conduite du changement à grande échelle.",
        "Chez Naval Group, j'ai accompagné en tant que consultant et coach agile des équipes pluridisciplinaires sur un projet de R&D consacré à la maintenance prédictive des navires — préparation des sprints, structuration du Knowledge Management, coaching des équipes IT et métiers sur un environnement technique exigeant et hautement sécurisé.",
        "C'est en parallèle, chez Alignerr, que j'ai mis les mains directement dans la mécanique des modèles de langage : entraînement de LLM, réduction des hallucinations, évaluation de modèles de PNL, conception de prompts complexes pour tester les limites des systèmes. Cette double compétence — animation de programmes agiles à l'échelle et compréhension fine du fonctionnement des modèles — est devenue le socle de mon positionnement actuel : un agiliste senior capable de mener un projet IA de bout en bout, du cadrage stratégique jusqu'à l'adoption par les équipes.",
        "Mon parcours inclut aussi des expériences de Product Ownership et de pilotage de projets digitaux à fort enjeu : conception d'un CRM propriétaire chez Ventura Travel, migration complète d'un écosystème e-commerce et levée de fonds en crypto-actifs chez Domraider, refonte d'espace client et déploiement à grande échelle chez AGPM.",
        "Cette diversité d'expériences — du management de programmes agiles à l'entraînement de modèles de langage, du Design Thinking à la gouvernance de projets data — nourrit aujourd'hui une approche de l'IA résolument ancrée dans la réalité opérationnelle des organisations.",
      ],
      formation: "Formation : Diplôme supérieur en Administration des Affaires (Université Laval, Canada), Maîtrise en Information et Communication (Université de Nantes).",
    },
  },
  en: {
    badge: "Profile",
    name: "Sébastien Donné",
    tagline: "SAFe RTE · Agile Coach · Scrum Master · Product Owner · AI Project Lead",
    intro: "Fifteen years synchronizing teams, unblocking inter-squad dependencies, and helping complex programmes reach the next level of maturity. I now apply that same methodological discipline to end-to-end AI project leadership: scoping, architecture decisions, prototyping, industrialisation and change management.",
    backLabel: "Back",
    portfolio: {
      heading: "Live Portfolio",
      subtitle: "Three applications developed, deployed and maintained in production, demonstrating a real ability to turn a business need into a working tool.",
      apps: [
        {
          name: "Comex",
          url: "https://comex.tkoidra.com",
          tag: "comex.tkoidra.com",
          description: "AI strategic framing tool for executive committees: generates in minutes a structured proposal (technical architecture, recommended stack, budget, estimated ROI) from a business need description. Designed to accelerate decision-making on AI projects from the very first exchanges with an executive committee.",
        },
        {
          name: "Sirene",
          url: "https://sirene.tkoidra.com",
          tag: "sirene.tkoidra.com",
          description: "Natural-language query interface for the SIRENE/INSEE database, with automatic NAF code suggestions and result export. Lets anyone interrogate a complex public dataset without prior technical knowledge of the data schema.",
        },
        {
          name: "DVF",
          url: "https://dvf.tkoidra.com",
          tag: "dvf.tkoidra.com",
          description: "Real estate market data analysis tool (Demandes de Valeurs Foncières — Property Value Requests), designed to make a dense, poorly structured public dataset exploitable.",
        },
      ],
      wip: "A fourth tool, dedicated to fraud detection, is currently in development.",
      stackNote: "Each application is built on a modern stack (React, Vite, TypeScript, Claude API) and continuously deployed on Vercel — the same industrialisation rigour I apply to the projects I support.",
    },
    stack: {
      heading: "Stack & Skills",
      categories: [
        {
          label: "Agility & scaled leadership",
          skills: "SAFe RTE, Agile Coach, Scrum Master, CSPO, multi-squad programme management, inter-team unblocking, OKR and KPI steering (velocity, burndown), ADKAR change management, workshop facilitation, Jira, Confluence, Miro AI",
        },
        {
          label: "AI project scoping & strategy",
          skills: "BPMN modelling (As-Is / To-Be), use case prioritisation, ROI calculation, AI governance and GDPR / AI Act compliance, data quality",
        },
        {
          label: "AI & Agents",
          skills: "Claude / Anthropic API, Gemini, advanced prompt engineering, NotebookLM for grounded knowledge",
        },
        {
          label: "Platforms",
          skills: "Google Cloud, Microsoft 365 Copilot, Copilot Studio, Anthropic Claude ecosystem",
        },
        {
          label: "AI-assisted development (vibecoding)",
          skills: "Claude Code for execution, Cursor for editing, Vercel for deployment, GitHub for versioning",
        },
      ],
    },
    certifications: {
      heading: "Certifications",
      groups: [
        {
          label: "Anthropic",
          items: ["AI Fluency Framework & Foundations", "Claude 101", "Claude Cowork", "Claude Code"],
        },
        {
          label: "Google Cloud",
          items: ["Generative AI Leader", "Cloud Digital Leader"],
        },
        {
          label: "Agility",
          items: ["Certified Scrum Product Owner (CSPO)", "SAFe Release Train Engineer", "Master Coach"],
        },
      ],
    },
    parcours: {
      heading: "Background",
      paragraphs: [
        "My career has been built around a single thread: ensuring organisations genuinely own the transformations they undertake, rather than merely enduring them. For several years, I led the Innovation Lab at Groupe AGPM, where I designed and ran a collaborative space dedicated to turning business ideas into prototypes through Design Thinking, while driving the acculturation of IT and business leadership to new collaborative practices — direct training ground for managing complex programmes and leading large-scale change.",
        "At Naval Group, I supported as a consultant and agile coach multidisciplinary teams on an R&D project focused on predictive maintenance for naval vessels — sprint preparation, Knowledge Management structuring, coaching IT and business teams in a demanding, highly secure technical environment.",
        "In parallel, at Alignerr, I worked directly with the mechanics of language models: LLM training, hallucination reduction, NLP model evaluation, designing complex prompts to stress-test system boundaries. This dual competence — scaling agile programmes and deep understanding of how models actually work — became the foundation of my current positioning: a senior agilist capable of leading an AI project end-to-end, from strategic scoping to team adoption.",
        "My career also includes Product Ownership and high-stakes digital project management: designing a proprietary CRM at Ventura Travel, full e-commerce ecosystem migration and crypto-asset fundraising at Domraider, customer portal redesign and large-scale deployment at AGPM.",
        "This breadth of experience — from agile programme management to language model training, from Design Thinking to data project governance — now informs an approach to AI that is firmly grounded in the operational reality of organisations.",
      ],
      formation: "Education: Graduate Diploma in Business Administration (Université Laval, Canada), Master's in Information and Communication (Université de Nantes).",
    },
  },
};

export default async function ProfilPage({ params }: Props) {
  const { lang } = await params;
  const locale = (lang in content ? lang : "fr") as keyof typeof content;
  const t = content[locale];

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-3xl space-y-16">

        {/* Back link */}
        <Link
          href={`/${lang}/use-cases`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span aria-hidden>&#8592;</span>
          {t.backLabel}
        </Link>

        {/* Hero header */}
        <header className="flex flex-col items-start gap-5 border-b border-slate-800 pb-10">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            {t.name}
          </h1>
          <p className="text-sm font-semibold text-teal-400 tracking-wide leading-6">
            {t.tagline}
          </p>
          <p className="text-base leading-8 text-slate-400">{t.intro}</p>
        </header>

        {/* Portfolio */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.portfolio.heading}
          </h2>
          <p className="text-sm leading-7 text-slate-400">{t.portfolio.subtitle}</p>
          <div className="space-y-4">
            {t.portfolio.apps.map((app) => (
              <a
                key={app.name}
                href={app.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 transition-all hover:border-teal-500/40 hover:bg-slate-900/70"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                    {app.name}
                  </h3>
                  <span className="shrink-0 text-xs text-slate-500 group-hover:text-teal-500 transition-colors">
                    {app.tag} &#8599;
                  </span>
                </div>
                <p className="text-sm leading-6 text-slate-400">{app.description}</p>
              </a>
            ))}
          </div>
          <p className="text-xs leading-6 text-slate-500 italic">{t.portfolio.wip}</p>
          <p className="text-sm leading-7 text-slate-400">{t.portfolio.stackNote}</p>
        </section>

        {/* Stack & compétences */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.stack.heading}
          </h2>
          <div className="space-y-6">
            {t.stack.categories.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400 mb-2">
                  {cat.label}
                </h3>
                <p className="text-sm leading-7 text-slate-400">{cat.skills}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.certifications.heading}
          </h2>
          <div className="space-y-6">
            {t.certifications.groups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
                  {group.label}
                </h3>
                <ul className="space-y-1">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm leading-7 text-slate-400">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* Parcours */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.parcours.heading}
          </h2>
          <div className="space-y-5">
            {t.parcours.paragraphs.map((para, i) => (
              <p key={i} className="text-sm leading-8 text-slate-400">
                {para}
              </p>
            ))}
          </div>
          <p className="text-xs leading-6 text-slate-600 border-t border-slate-800 pt-6">
            {t.parcours.formation}
          </p>
        </section>

      </div>
    </main>
  );
}
