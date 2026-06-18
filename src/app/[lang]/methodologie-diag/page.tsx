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
  const url = `https://tkoidra.com/${lang}/methodologie-diag`;
  return {
    title: isFr
      ? "Méthodologie de diagnostic IA | TKoidra"
      : "AI Diagnostic Methodology | TKoidra",
    description: isFr
      ? "Une méthodologie en 4 phases pour identifier, prioriser et déployer des cas d'usage IA à forte valeur ajoutée dans les organisations."
      : "A 4-phase methodology to identify, prioritise and deploy high-value AI use cases in organisations.",
    alternates: {
      canonical: url,
      languages: {
        fr: "https://tkoidra.com/fr/methodologie-diag",
        en: "https://tkoidra.com/en/methodologie-diag",
      },
    },
  };
}

interface Subsection {
  label: string;
  body: string;
}

interface Phase {
  number: string;
  title: string;
  intro?: string;
  subsections: Subsection[];
  note?: string;
}

interface LocaleContent {
  badge: string;
  title: string;
  subtitle: string;
  backLabel: string;
  phases: Phase[];
  conclusion: {
    heading: string;
    body: string;
  };
}

const content: Record<string, LocaleContent> = {
  fr: {
    badge: "Méthodologie",
    title: "Diagnostic IA en 4 phases",
    subtitle: "Avant de déployer un outil ou de choisir un modèle, la vraie question est : où l'IA crée-t-elle réellement de la valeur dans cette organisation ? Cette méthodologie est conçue pour répondre à cette question avec rigueur — et éviter les projets pilotes qui ne passent jamais en production.",
    backLabel: "Retour",
    phases: [
      {
        number: "01",
        title: "État des lieux",
        intro: "Avant toute recommandation, un diagnostic approfondi permet de poser les bonnes bases. Cette phase vise à comprendre le contexte stratégique et la réalité des données disponibles — deux dimensions indissociables pour éviter des cas d'usage techniquement irréalisables ou stratégiquement déconnectés des priorités de l'organisation.",
        subsections: [
          {
            label: "Cadrage stratégique.",
            body: "Identification des domaines à forte valeur pour l'organisation : quels processus génèrent le plus de coûts, de frictions ou de risques ? Quels objectifs business sont prioritaires ? Cette étape permet de définir des critères de sélection ancrés dans la réalité de l'entreprise plutôt que dans l'enthousiasme technologique.",
          },
          {
            label: "Cadrage Data.",
            body: "Exploration des données réellement disponibles : leur volumétrie, leur qualité, leur accessibilité et leur degré de structuration. Un cas d'usage IA brillant sur le papier peut s'effondrer en quelques semaines si les données nécessaires sont absentes, fragmentées ou trop dégradées pour être exploitables.",
          },
        ],
        note: "L'outil Comex illustre cette phase : il génère en quelques minutes un cadrage stratégique et technique structuré à partir d'une description de besoin, simulant les échanges d'un premier comité de pilotage.",
      },
      {
        number: "02",
        title: "Identification de cas d'usage",
        intro: "C'est l'étape la plus critique — et la plus souvent bâclée. Identifier de \"bons\" cas d'usage IA ne se fait pas en réunion de comité de direction avec un brainstorming de post-its. Cela demande une plongée dans les réalités opérationnelles, trois angles complémentaires permettant d'aller au-delà des idées de surface.",
        subsections: [
          {
            label: "Analyse de la performance réelle des processus.",
            body: "Cartographie des processus existants (As-Is), identification des goulots d'étranglement, des tâches répétitives à faible valeur ajoutée et des points de friction récurrents. L'objectif n'est pas de recenser toutes les opportunités IA imaginables, mais de localiser les 3 à 5 zones où l'impact serait le plus significatif.",
          },
          {
            label: "Confrontation de la vision du management aux réalités du terrain.",
            body: "Les équipes opérationnelles vivent des problèmes que le management ne perçoit pas toujours. Cette confrontation structurée — entretiens terrain, observation directe, ateliers croisés — est souvent la source des cas d'usage les plus pertinents et les mieux adoptés, car portés par ceux qui en bénéficieront directement.",
          },
          {
            label: "Exploitation des feedbacks digitaux.",
            body: "Analyse des données existantes souvent sous-exploitées : tickets de support, emails entrants, verbatims d'enquêtes de satisfaction, logs d'erreurs. Ces sources recèlent un signal fort sur les irritants réels des utilisateurs — une matière première directement exploitable pour identifier des cas d'usage IA.",
          },
        ],
        note: "L'outil Sirene illustre cette capacité : il permet d'interroger la base SIRENE/INSEE en langage naturel, démontrant comment rendre exploitable une source de données publique complexe sans compétences techniques préalables.",
      },
      {
        number: "03",
        title: "Priorisation par valeur ajoutée",
        intro: "Tous les cas d'usage identifiés ne méritent pas d'être développés. La prioritisation s'appuie sur une grille d'évaluation croisant deux axes : la valeur ajoutée attendue (gain de temps, réduction des erreurs, amélioration de l'expérience utilisateur, ROI quantifié) et la complexité de mise en oeuvre (disponibilité des données, maturité technique des équipes, contraintes réglementaires, effort d'intégration).",
        subsections: [
          {
            label: "Prototypage rapide pour valider avant d'investir.",
            body: "Avant d'engager un développement complet, un prototype léger permet de tester les hypothèses de valeur sur des données réelles. Cette approche réduit drastiquement le risque de livrer un outil fonctionnellement correct mais qui ne répond pas aux attentes réelles des utilisateurs finaux.",
          },
        ],
        note: "L'outil DVF illustre cette logique : développé pour rendre exploitable une donnée publique dense (les transactions immobilières), il démontre comment transformer une source brute en outil d'aide à la décision sans sur-engineering.",
      },
      {
        number: "04",
        title: "Livrable et trajectoire de mise en oeuvre",
        intro: "Le livrable final n'est pas une liste de recommandations génériques mais un document de cadrage opérationnel : cas d'usage priorisés avec justification chiffrée, architecture cible recommandée, stack technique adaptée au contexte, plan de déploiement phasé et indicateurs de suivi. Ce livrable est conçu pour servir de base de décision immédiatement exploitable par un comité de direction.",
        subsections: [
          {
            label: "La conduite du changement.",
            body: "Un projet IA ne réussit pas seulement par la qualité technique de sa solution — il réussit parce que les équipes qui doivent l'utiliser ont été embarquées dès le début. Formation ciblée, communication interne adaptée, identification des relais métier : la conduite du changement est planifiée dès la phase de priorisation, pas ajoutée en fin de projet.",
          },
          {
            label: "Le suivi dans la durée.",
            body: "La mise en production n'est pas la fin du projet. Des indicateurs de suivi sont définis en amont : taux d'adoption, gain de temps mesuré, réduction des erreurs, retour utilisateurs. Ces métriques permettent d'ajuster le déploiement, de justifier les investissements auprès des parties prenantes et d'alimenter les prochains cycles d'amélioration.",
          },
        ],
      },
    ],
    conclusion: {
      heading: "Une méthodologie éprouvée sur mes propres outils",
      body: "Cette méthodologie n'a pas été conçue en chambre. Elle a d'abord été appliquée à mes propres projets : Comex, Sirene et DVF ont tous traversé ces quatre phases — état des lieux de la donnée disponible, identification du cas d'usage pertinent, priorisation par la valeur, livrable en production. Avant d'accompagner une organisation dans cette démarche, je l'ai moi-même parcourue sur des projets réels, avec les contraintes réelles d'un développeur solo : données imparfaites, ressources limitées, nécessité de livrer quelque chose de fonctionnel et utilisable. C'est cette expérience de praticien qui donne à la méthode sa crédibilité.",
    },
  },
  en: {
    badge: "Methodology",
    title: "AI Diagnostic in 4 Phases",
    subtitle: "Before deploying a tool or choosing a model, the real question is: where does AI genuinely create value in this organisation? This methodology is designed to answer that question with rigour — and avoid pilot projects that never make it to production.",
    backLabel: "Back",
    phases: [
      {
        number: "01",
        title: "Current State Assessment",
        intro: "Before any recommendation, a thorough diagnostic lays the right foundations. This phase aims to understand the strategic context and the reality of available data — two inseparable dimensions that prevent technically unfeasible or strategically disconnected use cases from being pursued.",
        subsections: [
          {
            label: "Strategic framing.",
            body: "Identifying the organisation's highest-value domains: which processes generate the most cost, friction or risk? Which business objectives are priority? This step establishes selection criteria grounded in the company's reality rather than in technological enthusiasm.",
          },
          {
            label: "Data framing.",
            body: "Exploring what data is actually available: its volume, quality, accessibility and degree of structuring. A brilliant AI use case on paper can collapse within weeks if the necessary data is absent, fragmented or too degraded to be exploitable.",
          },
        ],
        note: "The Comex tool illustrates this phase: it generates in minutes a structured strategic and technical framing from a business need description, simulating the exchanges of an initial steering committee.",
      },
      {
        number: "02",
        title: "Use Case Identification",
        intro: "This is the most critical step — and the most often rushed. Identifying genuinely good AI use cases does not happen in a boardroom with a post-it brainstorm. It requires diving into operational realities. Three complementary angles help move beyond surface-level ideas.",
        subsections: [
          {
            label: "Analysis of actual process performance.",
            body: "Mapping existing processes (As-Is), identifying bottlenecks, low-value repetitive tasks, and recurring friction points. The goal is not to list every conceivable AI opportunity, but to locate the 3 to 5 areas where impact would be most significant.",
          },
          {
            label: "Confronting management's view with field realities.",
            body: "Operational teams experience problems that management does not always perceive. This structured confrontation — field interviews, direct observation, cross-functional workshops — is often the source of the most relevant and best-adopted use cases, because they are owned by those who will benefit directly.",
          },
          {
            label: "Mining digital feedback.",
            body: "Analysing often under-exploited existing data: support tickets, inbound emails, satisfaction survey verbatims, error logs. These sources carry a strong signal about real user pain points — raw material directly exploitable to identify AI use cases.",
          },
        ],
        note: "The Sirene tool illustrates this capability: it enables natural-language querying of the SIRENE/INSEE database, demonstrating how to make a complex public dataset exploitable without prior technical skills.",
      },
      {
        number: "03",
        title: "Prioritisation by Value Added",
        intro: "Not every identified use case deserves to be built. Prioritisation relies on an evaluation grid crossing two axes: expected value added (time savings, error reduction, improved user experience, quantified ROI) and implementation complexity (data availability, team technical maturity, regulatory constraints, integration effort).",
        subsections: [
          {
            label: "Rapid prototyping to validate before investing.",
            body: "Before committing to full development, a lightweight prototype tests value hypotheses against real data. This approach drastically reduces the risk of delivering a technically correct tool that does not meet the actual expectations of end users.",
          },
        ],
        note: "The DVF tool illustrates this logic: built to make a dense public dataset (property transactions) exploitable, it demonstrates how to turn raw data into a decision-support tool without over-engineering.",
      },
      {
        number: "04",
        title: "Deliverable and Implementation Roadmap",
        intro: "The final deliverable is not a list of generic recommendations but an operational framing document: prioritised use cases with quantified rationale, recommended target architecture, a tech stack adapted to the context, a phased deployment plan and tracking indicators. This deliverable is designed to serve as an immediately actionable decision basis for an executive committee.",
        subsections: [
          {
            label: "Change management.",
            body: "An AI project succeeds not only through the technical quality of its solution — it succeeds because the teams who need to use it have been on board from the start. Targeted training, adapted internal communication, identification of business champions: change management is planned from the prioritisation phase, not added at the end of the project.",
          },
          {
            label: "Long-term monitoring.",
            body: "Going live is not the end of the project. Tracking indicators are defined upfront: adoption rate, measured time savings, error reduction, user feedback. These metrics enable deployment adjustments, justify investments to stakeholders and feed the next improvement cycles.",
          },
        ],
      },
    ],
    conclusion: {
      heading: "A methodology tested on my own tools",
      body: "This methodology was not designed in theory. It was first applied to my own projects: Comex, Sirene and DVF all went through these four phases — current state data assessment, relevant use case identification, value-based prioritisation, production deliverable. Before guiding an organisation through this process, I ran through it myself on real projects, with the real constraints of a solo developer: imperfect data, limited resources, the need to ship something functional and usable. That practitioner experience is what gives the method its credibility.",
    },
  },
};

export default async function MethodologieDiagPage({ params }: Props) {
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

        {/* Header */}
        <header className="flex flex-col items-start gap-5 border-b border-slate-800 pb-10">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            {t.title}
          </h1>
          <p className="text-base leading-8 text-slate-400">{t.subtitle}</p>
        </header>

        {/* Phases */}
        <div className="space-y-16">
          {t.phases.map((phase) => (
            <section key={phase.number} className="space-y-8">
              {/* Phase header */}
              <div className="flex items-start gap-5">
                <span className="shrink-0 text-4xl font-extrabold tracking-tight text-slate-800 leading-none">
                  {phase.number}
                </span>
                <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 leading-tight pt-1">
                  {phase.title}
                </h2>
              </div>

              {/* Intro */}
              {phase.intro && (
                <p className="text-sm leading-8 text-slate-400">{phase.intro}</p>
              )}

              {/* Subsections */}
              {phase.subsections.length > 0 && (
                <div className="space-y-6 pl-0">
                  {phase.subsections.map((sub) => (
                    <div
                      key={sub.label}
                      className="rounded-2xl border border-slate-800 bg-slate-900/40 p-6 space-y-3"
                    >
                      <h3 className="text-sm font-bold text-slate-100">
                        {sub.label}
                      </h3>
                      <p className="text-sm leading-7 text-slate-400">{sub.body}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Tool note */}
              {phase.note && (
                <div className="flex gap-3 rounded-xl border border-teal-500/20 bg-teal-500/5 px-5 py-4">
                  <span className="shrink-0 text-teal-500 text-sm font-bold">&#8594;</span>
                  <p className="text-xs leading-6 text-slate-400 italic">{phase.note}</p>
                </div>
              )}
            </section>
          ))}
        </div>

        {/* Conclusion */}
        <section className="space-y-6 border-t border-slate-800 pt-16">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {t.conclusion.heading}
          </h2>
          <p className="text-sm leading-8 text-slate-400">{t.conclusion.body}</p>
        </section>

      </div>
    </main>
  );
}
