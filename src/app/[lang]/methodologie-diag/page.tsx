import type { Metadata } from "next";
import { i18n } from "../../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { LINKEDIN_URL, SITE_URL } from "../../../lib/site";
import { GuideExplorer, type Guide, type GuidesSectionDict } from "./GuideExplorer";
import { PhaseStepper } from "./PhaseStepper";

type Props = {
  params: Promise<{ lang: string }>;
};

interface Phase {
  number: string;
  name: string;
  goal: string;
  actions: string[];
  deliverables: string[];
}

interface TitledText {
  title: string;
  text: string;
}

interface MethodeDict {
  metadata: { title: string; description: string; ogTitle: string };
  eyebrow: string;
  title: string;
  lead: string;
  badges: string[];
  stepperLabel: string;
  labels: {
    goal: string;
    actions: string;
    deliverables: string;
    newTab: string;
  };
  phases: Phase[];
  guidesSection: GuidesSectionDict;
  guides: Guide[];
  operatingMode: { title: string; steps: TitledText[]; quote: string };
  cta: { text: string; button: string };
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  const dict = await getDictionary(lang);
  const { title, description } = (dict.methode as MethodeDict).metadata;
  const url = `${SITE_URL}/${lang}/methodologie-diag`;
  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/methodologie-diag`,
        en: `${SITE_URL}/en/methodologie-diag`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "TKoidra",
      locale: isFr ? "fr_FR" : "en_US",
      type: "website",
    },
    twitter: { card: "summary_large_image" },
  };
}

// newTabLabel (optionnel) : annonce l'ouverture dans un nouvel onglet dans le nom accessible.
function ExternalLink({
  href,
  className,
  children,
  newTabLabel,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
  newTabLabel?: string;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden> &#8599;</span>
      {newTabLabel && <span className="sr-only"> — {newTabLabel}</span>}
    </a>
  );
}

function PhaseSection({
  id,
  phase,
  labels,
}: {
  id: string;
  phase: Phase;
  labels: MethodeDict["labels"];
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-28 space-y-10 sm:scroll-mt-44"
    >
      <h2
        id={`${id}-title`}
        className="flex items-baseline gap-4 text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl"
      >
        <span className="bg-gradient-to-b from-accent-hover to-accent bg-clip-text text-4xl text-transparent sm:text-5xl">
          {phase.number}
        </span>
        <span>{phase.name}</span>
      </h2>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-8 lg:col-span-3">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-accent">
              {labels.goal}
            </p>
            <p className="text-lg leading-8 text-slate-200">{phase.goal}</p>
          </div>

          <div className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100">{labels.actions}</h3>
            <ul className="space-y-3">
              {phase.actions.map((action) => (
                <li key={action} className="flex gap-3 text-sm leading-7 text-slate-300">
                  <span
                    aria-hidden
                    className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <div className="space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400">
              {labels.deliverables}
            </h3>
            <ul className="flex flex-wrap gap-2">
              {phase.deliverables.map((item) => (
                <li
                  key={item}
                  className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default async function MethodologieDiagPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.methode as MethodeDict;

  // Note de démarrage à froid : une seule fois sur la page, sous le bouton du premier guide AssurConseil.
  const coldStartGuide = t.guides
    .map((g) => ({ id: g.id, index: g.illustrations.findIndex((ill) => ill.appKey === "assurconseil") }))
    .find((g) => g.index >= 0);
  const projects = dict.useCases.projects as Record<string, { title: string }>;
  const appNames = Object.fromEntries(
    Object.entries(projects).map(([slug, project]) => [slug, project.title])
  );

  const steps = t.phases.map((phase, i) => ({
    id: `phase-${i + 1}`,
    number: phase.number,
    name: phase.name,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 px-6 py-24 font-sans text-white">
      <div className="w-full max-w-5xl space-y-24">
        {/* En-tête */}
        <header className="flex max-w-3xl flex-col items-start gap-6">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {t.eyebrow}
          </span>
          <h1 className="bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
            {t.title}
          </h1>
          <p className="text-lg leading-8 text-slate-300">{t.lead}</p>
          <ul className="flex flex-wrap gap-2">
            {t.badges.map((badge) => (
              <li
                key={badge}
                className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-300"
              >
                {badge}
              </li>
            ))}
          </ul>
        </header>

        {/* Frise + phases : la frise reste collante uniquement pendant les 3 phases */}
        <div className="space-y-16">
          <PhaseStepper label={t.stepperLabel} steps={steps} />
          <div className="space-y-24">
            {t.phases.map((phase, i) => (
              <PhaseSection
                key={steps[i].id}
                id={steps[i].id}
                phase={phase}
                labels={t.labels}
              />
            ))}
          </div>
        </div>

        {/* Guides de bonnes pratiques */}
        <section aria-labelledby="guides-title" className="space-y-8">
          <h2
            id="guides-title"
            className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl"
          >
            {t.guidesSection.title}
          </h2>
          <GuideExplorer
            t={t.guidesSection}
            guides={t.guides}
            appNames={appNames}
            openAppLabel={dict.useCases.appLink.label}
            newTabLabel={t.labels.newTab}
            coldStartNote={dict.useCases.appLink.coldStartNote}
            coldStartGuide={coldStartGuide}
          />
        </section>

        {/* Mode opératoire */}
        <section
          aria-labelledby="mode-title"
          className="relative overflow-hidden rounded-3xl border border-accent/20 bg-slate-900 p-8 sm:p-10"
        >
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(148,163,184,0.14)_1px,transparent_0)] [background-size:22px_22px] [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
          <div className="relative space-y-10">
            <h2
              id="mode-title"
              className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl"
            >
              {t.operatingMode.title}
            </h2>
            <div className="relative">
              <div
                aria-hidden
                className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-accent/70 via-accent/30 to-accent/10 lg:block"
              />
              <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
                {t.operatingMode.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 lg:flex-col lg:gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-accent/50 bg-slate-950 text-sm font-bold text-accent-hover">
                      {i + 1}
                    </span>
                    <div className="space-y-1.5">
                      <h3 className="text-sm font-bold text-slate-100">{step.title}</h3>
                      <p className="text-sm leading-6 text-slate-400">{step.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
            <blockquote className="border-l-2 border-accent pl-5 text-base italic leading-8 text-slate-200">
              {t.operatingMode.quote}
            </blockquote>
          </div>
        </section>

        {/* Appel à l'action */}
        <section className="rounded-3xl border border-accent/25 bg-gradient-to-br from-accent/15 via-slate-900 to-slate-900 p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-xl font-bold leading-snug text-slate-100 sm:text-2xl">
            {t.cta.text}
          </h2>
          <ExternalLink
            href={LINKEDIN_URL}
            newTabLabel={t.labels.newTab}
            className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-safe:transition-colors"
          >
            {t.cta.button}
          </ExternalLink>
        </section>
      </div>
    </main>
  );
}
