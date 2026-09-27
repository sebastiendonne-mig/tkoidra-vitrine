import type { Metadata } from "next";
import { i18n } from "../../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
import { SITE_URL } from "../../../lib/site";
import { PhaseStepper } from "./PhaseStepper";

type Props = {
  params: Promise<{ lang: string }>;
};

interface Proof {
  app: string;
  text: string;
  cta: string;
}

interface Tool {
  key: string;
  name: string;
  detail: string;
}

interface Phase {
  number: string;
  name: string;
  goal: string;
  actions: string[];
  deliverables: string[];
  proof: Proof;
  tools: Tool[];
  practices: string[];
}

interface TitledText {
  title: string;
  text: string;
}

interface MethodeDict {
  eyebrow: string;
  title: string;
  lead: string;
  badges: string[];
  stepperLabel: string;
  labels: {
    goal: string;
    actions: string;
    deliverables: string;
    proof: string;
    tools: string;
    practices: string;
  };
  phases: Phase[];
  threads: { title: string; items: (TitledText & { icon: string })[] };
  operatingMode: { title: string; steps: TitledText[]; quote: string };
  notThis: { title: string; items: TitledText[] };
  cta: { text: string; button: string };
}

// Même source que appUrls de use-cases/page.tsx (un fichier de page ne peut pas l'exporter).
const APP_URLS: Record<string, string> = {
  assurconseil: "https://rag.tkoidra.com",
  comex: "https://comex.tkoidra.com",
  agap: "https://agap.tkoidra.com",
};

const LINKEDIN_URL = "https://www.linkedin.com/in/sebastiendonne/";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  const url = `${SITE_URL}/${lang}/methodologie-diag`;
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
        fr: `${SITE_URL}/fr/methodologie-diag`,
        en: `${SITE_URL}/en/methodologie-diag`,
      },
    },
  };
}

// Rend les segments **…** du dictionnaire en chiffres clés mis en valeur.
function Emphasis({ text }: { text: string }) {
  return (
    <>
      {text.split(/\*\*(.+?)\*\*/g).map((part, i) =>
        i % 2 === 1 ? (
          <strong key={i} className="whitespace-nowrap font-semibold text-teal-200">
            {part}
          </strong>
        ) : (
          part
        )
      )}
    </>
  );
}

function ExternalLink({
  href,
  className,
  children,
}: {
  href: string;
  className: string;
  children: React.ReactNode;
}) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
      {children}
      <span aria-hidden> &#8599;</span>
    </a>
  );
}

function ProofCard({
  id,
  label,
  toolsLabel,
  proof,
  tools,
}: {
  id: string;
  label: string;
  toolsLabel: string;
  proof: Proof;
  tools: Tool[];
}) {
  return (
    <div
      className="rounded-2xl border border-teal-500/30 bg-gradient-to-br from-teal-500/10 via-slate-900/60 to-slate-900/30 p-6 shadow-[0_0_40px_-16px_rgba(45,212,191,0.45)]"
    >
      <div className="flex items-center gap-2.5">
        <svg
          aria-hidden
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-5 w-5 shrink-0 text-teal-300"
        >
          <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
        <h3
          id={`${id}-proof`}
          className="text-xs font-bold uppercase tracking-widest text-teal-300"
        >
          {label} — {proof.app}
        </h3>
      </div>
      <p className="mt-4 text-sm leading-7 text-slate-300">
        <Emphasis text={proof.text} />
      </p>

      {tools.length > 0 && (
        <div className="mt-5 space-y-3 border-t border-teal-500/15 pt-4">
          <p className="text-xs font-semibold text-slate-400">{toolsLabel}</p>
          <ul className="space-y-3">
            {tools.map((tool) => (
              <li key={tool.key} className="text-sm leading-6 text-slate-400">
                <ExternalLink
                  href={APP_URLS[tool.key]}
                  className="font-semibold text-teal-300 underline-offset-4 hover:text-teal-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 rounded"
                >
                  {tool.name}
                </ExternalLink>
                <span className="block">
                  <Emphasis text={tool.detail} />
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <ExternalLink
        href={APP_URLS.assurconseil}
        className="mt-5 inline-flex items-center gap-1 rounded-lg border border-teal-500/40 bg-teal-500/10 px-3 py-1.5 text-xs font-semibold text-teal-200 hover:border-teal-400 hover:bg-teal-500/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 motion-safe:transition-colors"
      >
        {proof.cta}
      </ExternalLink>
    </div>
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
        <span className="bg-gradient-to-b from-teal-300 to-teal-600 bg-clip-text text-4xl text-transparent sm:text-5xl">
          {phase.number}
        </span>
        <span>{phase.name}</span>
      </h2>

      <div className="grid gap-10 lg:grid-cols-5 lg:gap-12">
        <div className="space-y-8 lg:col-span-3">
          <div className="space-y-2">
            <p className="text-xs font-bold uppercase tracking-widest text-teal-400">
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
                    className="mt-[0.7rem] h-1.5 w-1.5 shrink-0 rounded-full bg-teal-400"
                  />
                  <span>{action}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="space-y-6 lg:col-span-2">
          <ProofCard
            id={id}
            label={labels.proof}
            toolsLabel={labels.tools}
            proof={phase.proof}
            tools={phase.tools}
          />
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

      <details className="group rounded-2xl border border-slate-800 bg-slate-900/30 open:bg-slate-900/50">
        <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-2xl px-6 py-4 text-sm font-semibold text-slate-200 hover:text-teal-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400 motion-safe:transition-colors [&::-webkit-details-marker]:hidden">
          <span>{labels.practices}</span>
          <svg
            aria-hidden
            viewBox="0 0 20 20"
            fill="currentColor"
            className="h-4 w-4 shrink-0 text-teal-400 group-open:rotate-180 motion-safe:transition-transform"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </summary>
        <ul className="grid gap-x-8 gap-y-3 px-6 pb-6 md:grid-cols-2">
          {phase.practices.map((practice) => (
            <li key={practice} className="flex gap-3 text-sm leading-7 text-slate-400">
              <span
                aria-hidden
                className="mt-[0.7rem] h-1 w-3 shrink-0 rounded-full bg-slate-600"
              />
              <span>{practice}</span>
            </li>
          ))}
        </ul>
      </details>
    </section>
  );
}

export default async function MethodologieDiagPage({ params }: Props) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.methode as MethodeDict;

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
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
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

        {/* Six fils rouges */}
        <section aria-labelledby="threads-title" className="space-y-8">
          <h2
            id="threads-title"
            className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl"
          >
            {t.threads.title}
          </h2>
          <ol className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {t.threads.items.map((item, i) => (
              <li
                key={item.title}
                className="space-y-3 rounded-2xl border border-slate-800 bg-slate-900/30 p-6 hover:border-teal-500/30 hover:bg-slate-900/60 motion-safe:transition-all"
              >
                <div className="flex items-center justify-between">
                  <span aria-hidden className="text-2xl">
                    {item.icon}
                  </span>
                  <span aria-hidden className="font-mono text-xs text-slate-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-slate-100">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-400">{item.text}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Mode opératoire */}
        <section
          aria-labelledby="mode-title"
          className="relative overflow-hidden rounded-3xl border border-teal-500/20 bg-slate-900 p-8 sm:p-10"
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
                className="absolute left-5 right-5 top-5 hidden h-px bg-gradient-to-r from-teal-400/70 via-teal-400/30 to-teal-400/10 lg:block"
              />
              <ol className="relative grid gap-8 lg:grid-cols-4 lg:gap-6">
                {t.operatingMode.steps.map((step, i) => (
                  <li key={step.title} className="flex gap-4 lg:flex-col lg:gap-4">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-teal-400/50 bg-slate-950 text-sm font-bold text-teal-300">
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
            <blockquote className="border-l-2 border-teal-400 pl-5 text-base italic leading-8 text-slate-200">
              {t.operatingMode.quote}
            </blockquote>
          </div>
        </section>

        {/* Ce que cette méthode n'est pas */}
        <section
          aria-labelledby="not-title"
          className="space-y-5 rounded-2xl border border-slate-800 p-6 sm:p-8"
        >
          <h2 id="not-title" className="text-lg font-bold text-slate-200">
            {t.notThis.title}
          </h2>
          <ul className="space-y-4">
            {t.notThis.items.map((item) => (
              <li key={item.title} className="flex gap-3 text-sm leading-7 text-slate-400">
                <span aria-hidden className="text-slate-500">
                  &#10005;
                </span>
                <p>
                  <strong className="font-semibold text-slate-200">{item.title}</strong>{" "}
                  {item.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        {/* Appel à l'action */}
        <section className="rounded-3xl border border-teal-500/25 bg-gradient-to-br from-teal-500/15 via-slate-900 to-slate-900 p-8 text-center sm:p-12">
          <h2 className="mx-auto max-w-2xl text-xl font-bold leading-snug text-slate-100 sm:text-2xl">
            {t.cta.text}
          </h2>
          <ExternalLink
            href={LINKEDIN_URL}
            className="mt-8 inline-flex items-center gap-1.5 rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 hover:bg-teal-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-safe:transition-colors"
          >
            {t.cta.button}
          </ExternalLink>
        </section>
      </div>
    </main>
  );
}
