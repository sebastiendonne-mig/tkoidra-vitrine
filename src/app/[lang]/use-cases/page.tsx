import { getDictionary } from "../../../get-dictionary";
import { i18n } from "../../../../i18n-config";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface Project {
  title: string;
  description: string;
  tag: string;
  challenge: string;
  solution: string;
  features: Feature[];
  stack: string[];
  metrics?: unknown[];
}

interface SectionLabels {
  challenge: string;
  solution: string;
  features: string;
  stack: string;
  metrics?: string;
}

const appUrls: Record<string, string> = {
  sirene: "https://sirene.tkoidra.com",
  comex: "https://comex.tkoidra.com",
  dvf: "https://dvf.tkoidra.com",
  fraud: "https://fraud.tkoidra.com",
  assurconseil: "https://rag-assurance-aresia-production.up.railway.app/",
};

const appLinkLabels = {
  fr: "Ouvrir l'application complete",
  en: "Open full application",
} as const;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const useCases = dict?.useCases;
  const projects = useCases?.projects
    ? (Object.entries(useCases.projects) as [string, Project][])
    : [];

  const labels: SectionLabels = useCases?.sectionLabels ?? {
    challenge: "Challenge",
    solution: "Solution",
    features: "Key Features",
    stack: "Tech Stack",
    metrics: "Results",
  };

  const appLinkLabel =
    appLinkLabels[lang as keyof typeof appLinkLabels] ?? appLinkLabels.fr;

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-4xl space-y-16">

        {/* Page header */}
        <header className="flex flex-col items-start gap-8">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {useCases?.title ?? "Cas d'Usage"}
          </span>
          <p className="text-lg leading-7 text-slate-400">
            {useCases?.subtitle}
          </p>
        </header>

        {/* Projects — stacked vertically */}
        {projects.map(([slug, project], index) => {
          const appUrl = appUrls[slug];
          return (
            <section
              key={slug}
              id={slug}
              className={`space-y-12${index > 0 ? " border-t border-slate-800 pt-16" : ""}`}
            >
              {/* Project hero */}
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
                      <span aria-hidden className="text-teal-500">&#8599;</span>
                    </a>
                  )}
                </div>
                <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
                  {project.title}
                </h2>
                <p className="text-lg leading-8 text-slate-400 max-w-2xl">
                  {project.description}
                </p>
              </header>

              {/* Challenge / Solution */}
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 space-y-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-rose-400" aria-hidden />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-rose-400">
                      {labels.challenge}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{project.challenge}</p>
                </div>
                <div className="rounded-2xl border border-slate-800 bg-slate-900/40 p-7 space-y-3 backdrop-blur-sm">
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-teal-400" aria-hidden />
                    <h3 className="text-xs font-bold uppercase tracking-widest text-teal-400">
                      {labels.solution}
                    </h3>
                  </div>
                  <p className="text-sm leading-7 text-slate-300">{project.solution}</p>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-6">
                <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  {labels.features}
                </h3>
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
                  {project.features.map((feature) => (
                    <div
                      key={feature.title}
                      className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3 hover:border-teal-500/30 hover:bg-slate-900/60 transition-all"
                    >
                      <span className="text-2xl" role="img" aria-label={feature.title}>
                        {feature.icon}
                      </span>
                      <h4 className="text-sm font-bold text-slate-100">{feature.title}</h4>
                      <p className="text-xs leading-6 text-slate-400">{feature.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stack */}
              <div className="space-y-5">
                <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
                  {labels.stack}
                </h3>
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
              </div>

            </section>
          );
        })}

      </div>
    </main>
  );
}
