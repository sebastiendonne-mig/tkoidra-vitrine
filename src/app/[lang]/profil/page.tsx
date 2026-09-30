import type { Metadata } from "next";
import { i18n } from "../../../../i18n-config";
import { LINKEDIN_URL, SITE_URL } from "../../../lib/site";
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
  const url = `${SITE_URL}/${lang}/profil`;
  const title = isFr
    ? "Sébastien Donné · Product Owner IA | TKoidra"
    : "Sébastien Donné · AI Product Owner | TKoidra";
  const description = isFr
    ? "Product Owner IA et RTE SAFe : pilotage de projets d'IA générative de bout en bout, du cadrage à la conduite du changement. Quinze ans d'agilité à l'échelle."
    : "AI Product Owner and SAFe RTE: end-to-end leadership of generative AI projects, from framing to change management. Fifteen years of scaled agile.";
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/profil`,
        en: `${SITE_URL}/en/profil`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "TKoidra",
      locale: isFr ? "fr_FR" : "en_US",
      type: "profile",
    },
    twitter: {
      card: "summary_large_image",
    },
  };
}

type Group = { label: string; items: string[] };

type Content = {
  badge: string;
  name: string;
  tagline: string;
  intro: string[];
  backLabel: string;
  demos: { heading: string; text: string; linkLabel: string };
  parcours: {
    heading: string;
    opening: string;
    entries: { label: string; text: string }[];
  };
  skills: {
    heading: string;
    categories: { label: string; skills: string }[];
  };
  certifications: { heading: string; groups: Group[] };
  training: { heading: string; groups: Group[] };
  contact: { heading: string; text: string; button: string; newTab: string };
};

const content: Record<"fr" | "en", Content> = {
  fr: {
    badge: "Profil",
    name: "Sébastien Donné",
    tagline: "Product Owner IA · Pilotage de projets IA · RTE SAFe",
    intro: [
      "Product Owner IA, je pilote des projets d'IA générative de bout en bout : priorisation des cas d'usage, cadrage produit, choix d'architecture, évaluation avant mise en production, puis conduite du changement. Je m'appuie sur quinze ans d'agilité à l'échelle, de Product Ownership et d'accompagnement du changement.",
      "C'est ce que porte le nom TKoidra, homophone de ¿Te cuadra ? en espagnol — littéralement : « Est-ce que ça te convient ? ». Parce qu'une architecture IA brillante qui ne cadre pas avec vos contraintes opérationnelles reste une belle démonstration. Ce que j'apporte, c'est la rigueur d'un RTE et l'écoute d'un coach agile pour que la solution s'ajuste — techniquement, humainement, stratégiquement.",
    ],
    backLabel: "Retour",
    demos: {
      heading: "Démonstrateurs en ligne",
      text: "Huit démonstrateurs IA conçus, déployés et maintenus en ligne, dont AssurConseil (RAG agentique, comparaison Claude / Mistral), LexGuard (analyse de contrats) et AGAP (gouvernance de portefeuille).",
      linkLabel: "Voir les cas d'usage",
    },
    parcours: {
      heading: "Parcours",
      opening:
        "Mon parcours s'est construit autour d'un fil conducteur : faire en sorte que les organisations s'approprient réellement les transformations qu'elles engagent, plutôt que de les subir.",
      entries: [
        {
          label: "TKoidra",
          text: "Conception et exploitation de démonstrateurs IA en ligne : cadrage, développement assisté par des agents de code IA sous protocole de validation, évaluation avant déploiement, maintenance récurrente.",
        },
        {
          label: "Naval Group",
          text: "Deux missions de coach puis consultant agile sur un projet R&D de maintenance prédictive des navires : préparation des sprints et animation des rituels, pilotage de la donnée, organisation des tests, coaching des équipes IT et métiers, structuration du knowledge management.",
        },
        {
          label: "Alignerr",
          text: "Évaluation et annotation de réponses de LLM pour améliorer leur fiabilité (repérage d'hallucinations), conception de prompts pour tester les limites des modèles.",
        },
        {
          label: "Groupe AGPM",
          text: "Responsable de l'Innovation Lab, RTE et coach agile : direction d'un lab qui transforme les idées métiers en prototypes par le Design Thinking, ateliers de co-conception (AR24, souscription digitale), refonte de l'espace client, accompagnement des directions IT et métiers vers des pratiques collaboratives, pilotage de la roadmap produit.",
        },
        {
          label: "Product Ownership",
          text: "Ventura Travel : création du marché francophone et pilotage d'un CRM propriétaire en Scrum. Domraider : PMO et Product Owner sur des projets web et mobiles.",
        },
        {
          label: "Formation",
          text: "Maîtrise en Information et Communication (Université de Nantes) · Diplôme supérieur en Administration des Affaires (Université Laval, Canada).",
        },
      ],
    },
    skills: {
      heading: "Compétences",
      categories: [
        {
          label: "Agilité & leadership à l'échelle",
          skills:
            "RTE SAFe, CSPO, coaching agile, animation de programmes multi-équipes, OKR / KPI, conduite du changement (ADKAR), facilitation, Jira, Confluence, Miro AI",
        },
        {
          label: "Cadrage & gouvernance IA",
          skills:
            "BPMN (As-Is / To-Be), priorisation des cas d'usage, ROI, gouvernance IA et conformité RGPD / AI Act, qualité de la donnée",
        },
        {
          label: "IA & build",
          skills:
            "Claude API, Claude Code, Mistral (API, endpoint UE), Gemini, NotebookLM, prompt engineering, architectures RAG (LangGraph, Chroma), évaluation de LLM",
        },
        {
          label: "Déploiement",
          skills: "Vercel, Google Cloud Run, GitHub",
        },
      ],
    },
    certifications: {
      heading: "Certifications",
      groups: [
        {
          label: "Google Cloud",
          items: ["Generative AI Leader", "Cloud Digital Leader"],
        },
        {
          label: "Agilité & coaching",
          items: [
            "Certified Scrum Product Owner (CSPO)",
            "SAFe Release Train Engineer (RTE)",
            "Master Coach (Institut de Coaching International)",
          ],
        },
      ],
    },
    training: {
      heading: "Formations",
      groups: [
        {
          label: "Anthropic",
          items: [
            "AI Fluency: Framework & Foundations",
            "Claude 101",
            "Claude Cowork",
            "Claude Code",
          ],
        },
      ],
    },
    contact: {
      heading: "Contact",
      text: "Un projet IA à cadrer, un poste de Product Owner IA ?",
      button: "Échangeons sur LinkedIn",
      newTab: "nouvel onglet",
    },
  },
  en: {
    badge: "Profile",
    name: "Sébastien Donné",
    tagline: "AI Product Owner · AI Project Management · SAFe RTE",
    intro: [
      "As an AI Product Owner, I lead generative AI projects end to end: use-case prioritisation, product framing, architecture choices, pre-production evaluation and change management. I draw on fifteen years of scaled agile, Product Ownership and change management.",
      "This is what the name TKoidra embodies — a homophone of ¿Te cuadra? in Spanish, literally: 'Does it work for you?' Because a brilliant AI architecture that doesn't fit your operational constraints remains just an impressive demo. What I bring is the rigor of a Release Train Engineer and the listening skills of an agile coach, so the solution actually fits — technically, humanly, strategically.",
    ],
    backLabel: "Back",
    demos: {
      heading: "Live demonstrators",
      text: "Eight AI demonstrators designed, deployed and maintained online, including AssurConseil (agentic RAG, Claude / Mistral comparison), LexGuard (contract analysis) and AGAP (portfolio governance).",
      linkLabel: "See the use cases",
    },
    parcours: {
      heading: "Career",
      opening:
        "My career has been built around a single thread: ensuring organisations genuinely own the transformations they undertake, rather than merely enduring them.",
      entries: [
        {
          label: "TKoidra",
          text: "Designing and running live AI demonstrators: framing, development assisted by AI coding agents under a validation protocol, pre-deployment evaluation, recurring maintenance.",
        },
        {
          label: "Naval Group",
          text: "Two assignments, first as agile coach then as agile consultant, on an R&D predictive maintenance project for naval vessels: sprint preparation and agile ceremonies, data management, test organisation, coaching IT and business teams, structuring knowledge management.",
        },
        {
          label: "Alignerr",
          text: "Evaluating and annotating LLM responses to improve their reliability (spotting hallucinations), designing prompts to test the models' limits.",
        },
        {
          label: "Groupe AGPM",
          text: "Head of the Innovation Lab, RTE and agile coach: ran a lab turning business ideas into prototypes through Design Thinking, co-design workshops (AR24, digital subscription), customer portal redesign, supporting IT and business leadership towards collaborative practices, product roadmap management.",
        },
        {
          label: "Product Ownership",
          text: "Ventura Travel: launched the French-speaking market and led the build of a proprietary CRM using Scrum. Domraider: PMO and Product Owner on web and mobile projects.",
        },
        {
          label: "Education",
          text: "Maîtrise in Information and Communication (four-year degree, Université de Nantes) · Diplôme supérieur en administration des affaires (Business Administration, Université Laval, Canada).",
        },
      ],
    },
    skills: {
      heading: "Skills",
      categories: [
        {
          label: "Scaled agile & leadership",
          skills:
            "SAFe RTE, CSPO, agile coaching, multi-team programme facilitation, OKRs / KPIs, change management (ADKAR), facilitation, Jira, Confluence, Miro AI",
        },
        {
          label: "AI framing & governance",
          skills:
            "BPMN (As-Is / To-Be), use-case prioritisation, ROI, AI governance and GDPR / AI Act compliance, data quality",
        },
        {
          label: "AI & build",
          skills:
            "Claude API, Claude Code, Mistral (API, EU endpoint), Gemini, NotebookLM, prompt engineering, RAG architectures (LangGraph, Chroma), LLM evaluation",
        },
        {
          label: "Deployment",
          skills: "Vercel, Google Cloud Run, GitHub",
        },
      ],
    },
    certifications: {
      heading: "Certifications",
      groups: [
        {
          label: "Google Cloud",
          items: ["Generative AI Leader", "Cloud Digital Leader"],
        },
        {
          label: "Agile & coaching",
          items: [
            "Certified Scrum Product Owner (CSPO)",
            "SAFe Release Train Engineer (RTE)",
            "Master Coach (Institut de Coaching International)",
          ],
        },
      ],
    },
    training: {
      heading: "Training",
      groups: [
        {
          label: "Anthropic",
          items: [
            "AI Fluency: Framework & Foundations",
            "Claude 101",
            "Claude Cowork",
            "Claude Code",
          ],
        },
      ],
    },
    contact: {
      heading: "Contact",
      text: "An AI project to frame, or an AI Product Owner role to fill?",
      button: "Let's talk on LinkedIn",
      newTab: "new tab",
    },
  },
};

function GroupList({ groups }: { groups: Group[] }) {
  return (
    <div className="space-y-6">
      {groups.map((group) => (
        <div key={group.label}>
          <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-2">
            {group.label}
          </h3>
          <p className="text-sm leading-7 text-slate-400">
            {group.items.join(" · ")}
          </p>
        </div>
      ))}
    </div>
  );
}

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
          className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:text-accent-hover transition-colors"
        >
          <span aria-hidden>&#8592;</span>
          {t.backLabel}
        </Link>

        {/* Hero header */}
        <header className="flex flex-col items-start gap-5 border-b border-slate-800 pb-10">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            {t.name}
          </h1>
          <p className="text-sm font-semibold text-accent tracking-wide leading-6">
            {t.tagline}
          </p>
          <div className="space-y-4">
            {t.intro.map((paragraph, i) => (
              <p key={i} className="text-base leading-8 text-slate-400">{paragraph}</p>
            ))}
          </div>
        </header>

        {/* Démonstrateurs en ligne : renvoi interne vers /use-cases */}
        <section className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-6">
          <h2 className="text-lg font-bold text-slate-200">{t.demos.heading}</h2>
          <p className="text-sm leading-7 text-slate-400">{t.demos.text}</p>
          <Link
            href={`/${lang}/use-cases`}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-accent hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-safe:transition-colors"
          >
            <span aria-hidden>&#8594;</span>
            {t.demos.linkLabel}
          </Link>
        </section>

        {/* Parcours */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.parcours.heading}
          </h2>
          <p className="text-sm leading-8 text-slate-400">{t.parcours.opening}</p>
          <div className="space-y-6">
            {t.parcours.entries.map((entry) => (
              <div key={entry.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
                  {entry.label}
                </h3>
                <p className="text-sm leading-7 text-slate-400">{entry.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Compétences */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.skills.heading}
          </h2>
          <div className="space-y-6">
            {t.skills.categories.map((cat) => (
              <div key={cat.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-accent mb-2">
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
          <GroupList groups={t.certifications.groups} />
        </section>

        {/* Formations */}
        <section className="space-y-8">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.training.heading}
          </h2>
          <GroupList groups={t.training.groups} />
        </section>

        {/* Contact */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.contact.heading}
          </h2>
          <p className="text-sm leading-7 text-slate-400">{t.contact.text}</p>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-safe:transition-colors"
          >
            {t.contact.button}
            <span aria-hidden> &#8599;</span>
            <span className="sr-only"> ({t.contact.newTab})</span>
          </a>
        </section>

      </div>
    </main>
  );
}
