import type { Metadata } from "next";
import { getDictionary } from "../../../../get-dictionary";
import { i18n } from "../../../../../i18n-config";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SireneWidget } from "../../../../components/widgets/SireneWidget";
import { ComexWidget } from "../../../../components/widgets/ComexWidget";
import { DvfWidget } from "../../../../components/widgets/DvfWidget";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Metric {
  value: string;
  label: string;
}

interface ProjectData {
  title: string;
  description: string;
  tag: string;
  challenge: string;
  solution: string;
  features: Feature[];
  stack: string[];
  metrics: Metric[];
}

interface SectionLabels {
  challenge: string;
  solution: string;
  features: string;
  stack: string;
  metrics: string;
}

const appUrls: Record<string, string> = {
  sirene: "https://sirene.tkoidra.com",
  comex: "https://comex.tkoidra.com",
  dvf: "https://dvf.tkoidra.com",
};

const appLinkLabels = {
  fr: "Ouvrir l'application complète",
  en: "Open full application",
} as const;

const backToListLabels = {
  fr: "Retour aux cas d'usage",
  en: "Back to case studies",
} as const;

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  const slugs = ["sirene", "comex", "dvf"];
  return i18n.locales.flatMap((lang) =>
    slugs.map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);
  const project = dict?.useCases?.projects?.[slug] as
    | { title: string; description: string; tag: string; challenge: string }
    | undefined;

  if (!project) return { title: "TKoidra" };

  const title = `${project.title} | ${project.tag} | TKoidra`;
  const rawChallenge: string = project.challenge ?? "";
  const description =
    rawChallenge.length > 155 ? rawChallenge.slice(0, 152) + "..." : rawChallenge;
  const url = `https://tkoidra.com/${lang}/use-cases/${slug}`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `https://tkoidra.com/fr/use-cases/${slug}`,
        en: `https://tkoidra.com/en/use-cases/${slug}`,
      },
    },
    openGraph: {
      title,
      description: project.description,
      url,
      siteName: "TKoidra",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "website",
    },
  };
}

export default async function UseCasePage({ params }: Props) {
  const { lang, slug } = await params;
  const dict = await getDictionary(lang);

  const project = dict?.useCases?.projects?.[
    slug as keyof typeof dict.useCases.projects
  ] as ProjectData | undefined;

  if (!project) {
    notFound();
  }

  const labels: SectionLabels = dict?.useCases?.sectionLabels ?? {
    challenge: "Challenge",
    solution: "Solution",
    features: "Key Features",
    stack: "Tech Stack",
    metrics: "Results",
  };

  const appUrl = appUrls[slug];
  const locale = (lang in appLinkLabels ? lang : "fr") as keyof typeof appLinkLabels;
  const appLinkLabel = appLinkLabels[locale];
  const backToListLocale = (lang in backToListLabels ? lang : "fr") as keyof typeof backToListLabels;
  const backToListLabel = backToListLabels[backToListLocale];

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-4xl space-y-16">

        {/* Back link → use-cases hub */}
        <Link
          href={`/${lang}/use-cases`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span aria-hidden>←</span>
          {backToListLabel}
        </Link>

        {/* Hero header */}
        <header className="space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
              {project.tag}
            </span>
            {appUrl && (
              <a
                href={appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-medium text-slate-400 transition-all hover:border-teal-500/50 hover:text-teal-300"
              >
                {appLinkLabel}
                <span aria-hidden className="text-teal-500">↗</span>
              </a>
            )}
          </div>
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            {project.title}
          </h1>
          <p className="text-xl leading-8 text-slate-400 max-w-2xl">
            {project.description}
          </p>
        </header>

        {/* Challenge / Solution */}
        <section className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 space-y-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-rose-400" aria-hidden />
              <h2 className="text-xs font-bold uppercase tracking-widest text-rose-400">
                {labels.challenge}
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">{project.challenge}</p>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 space-y-3 backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-teal-400" aria-hidden />
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                {labels.solution}
              </h2>
            </div>
            <p className="text-sm leading-7 text-slate-300">{project.solution}</p>
          </div>
        </section>

        {/* Features */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {labels.features}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {project.features.map((feature) => (
              <div
                key={feature.title}
                className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3 hover:border-teal-500/30 hover:bg-slate-900/60 transition-all"
              >
                <span className="text-2xl" role="img" aria-label={feature.title}>
                  {feature.icon}
                </span>
                <h3 className="text-sm font-bold text-slate-100">{feature.title}</h3>
                <p className="text-xs leading-6 text-slate-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Live demo widget — injected after Features, one per slug */}
        {slug === "sirene" && <SireneWidget lang={lang} />}
        {slug === "comex" && <ComexWidget lang={lang} />}
        {slug === "dvf" && <DvfWidget lang={lang} />}

        {/* Tech stack */}
        <section className="space-y-5">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {labels.stack}
          </h2>
          <div className="flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="rounded-lg border border-slate-700 bg-slate-800/60 px-3 py-1.5 text-xs font-mono font-medium text-slate-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </section>

        {/* Metrics */}
        <section className="space-y-6">
          <h2 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
            {labels.metrics}
          </h2>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
            {project.metrics.map((metric) => (
              <div
                key={metric.label}
                className="rounded-2xl border border-teal-500/20 bg-teal-500/5 p-6 text-center space-y-1"
              >
                <p className="text-4xl font-extrabold tracking-tight text-teal-400">
                  {metric.value}
                </p>
                <p className="text-xs font-medium text-slate-400">{metric.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Footer CTA */}
        <div className="border-t border-slate-800 pt-8">
          <Link
            href={`/${lang}/use-cases`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            <span aria-hidden>←</span>
            {backToListLabel}
          </Link>
        </div>

      </div>
    </main>
  );
}
