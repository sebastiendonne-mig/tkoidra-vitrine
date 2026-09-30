import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { getDictionary } from "../../../get-dictionary";
import { i18n } from "../../../../i18n-config";
import { SITE_URL } from "../../../lib/site";
import { OpenAppButton } from "../../../components/OpenAppButton";
import { OverviewGrid } from "./OverviewGrid";

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface MethodBridge {
  label: string;
  path: string;
  hash?: string;
}

interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

interface Project {
  title: string;
  description: string;
  demonstrates: string;
  tag: string;
  theme: string;
  featured?: boolean;
  challenge: string;
  solution: string;
  features: Feature[];
  stack: string[];
  metrics?: unknown[];
  methodBridge?: MethodBridge;
  image?: ProjectImage;
}

interface AppLinkLabels {
  label: string;
  newTab: string;
}

interface Theme {
  key: string;
  label: string;
}

interface SectionLabels {
  challenge: string;
  solution: string;
  features: string;
  stack: string;
  metrics?: string;
  demonstrates: string;
}

const appUrls: Record<string, string> = {
  agap: "https://agap.tkoidra.com",
  comex: "https://comex.tkoidra.com",
  sirene: "https://sirene.tkoidra.com",
  dvf: "https://dvf.tkoidra.com",
  assurconseil: "https://rag.tkoidra.com",
  fraud: "https://fraud.tkoidra.com",
  lexguard: "https://lexguard.tkoidra.com",
  verifid: "https://verif.tkoidra.com/",
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const isFr = lang === "fr";
  const meta = dict?.useCases?.metadata as
    | { title: string; description: string }
    | undefined;
  const title =
    meta?.title ??
    (isFr
      ? "Cas d'usage IA | Sébastien Donné | TKoidra"
      : "AI Use Cases | Sébastien Donné | TKoidra");
  const description =
    meta?.description ??
    (isFr
      ? "Des démonstrateurs IA fonctionnels, en ligne et testables — du cadrage à la mise en production, sur des cas d'usage en assurance, immobilier et conformité."
      : "Functional AI demonstrators, live and testable — from framing to production, illustrated by use cases in insurance, real estate, and compliance.");
  const url = `${SITE_URL}/${lang}/use-cases`;

  return {
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        fr: `${SITE_URL}/fr/use-cases`,
        en: `${SITE_URL}/en/use-cases`,
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
    twitter: {
      card: "summary_large_image",
    },
  };
}

function Demonstrates({ label, text }: { label: string; text: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/5 px-5 py-4">
      <svg
        aria-hidden
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        className="mt-0.5 h-4 w-4 shrink-0 text-accent"
      >
        <path d="M12 3l7 3v5c0 4.5-3 8.2-7 10-4-1.8-7-5.5-7-10V6l7-3z" />
        <path d="M9 12l2 2 4-4" />
      </svg>
      <p className="text-sm leading-6 text-slate-300">
        <span className="mr-1.5 text-xs font-bold uppercase tracking-widest text-accent">
          {label}
        </span>
        {text}
      </p>
    </div>
  );
}

// titleTag : h4 sous un h3 (fiches en vedette), h3 directement sous le h2 (fiches compactes) — pas de saut de niveau.
function FeatureGrid({
  features,
  titleTag: TitleTag = "h4",
}: {
  features: Feature[];
  titleTag?: "h3" | "h4";
}) {
  return (
    <div
      className={
        features.length === 1
          ? "grid grid-cols-1 gap-5 sm:max-w-sm"
          : features.length === 2
            ? "grid grid-cols-1 gap-5 sm:grid-cols-2"
            : features.length === 4
              ? "grid grid-cols-2 gap-5 sm:grid-cols-4"
              : "grid grid-cols-1 gap-5 sm:grid-cols-3"
      }
    >
      {features.map((feature) => (
        <div
          key={feature.title}
          className="rounded-2xl border border-slate-800 bg-slate-900/30 p-6 space-y-3 hover:border-accent/30 hover:bg-slate-900/60 transition-all"
        >
          <span className="text-2xl" role="img" aria-label={feature.title}>
            {feature.icon}
          </span>
          <TitleTag className="text-sm font-bold text-slate-100">{feature.title}</TitleTag>
          <p className="text-xs leading-6 text-slate-400">{feature.description}</p>
        </div>
      ))}
    </div>
  );
}

function MethodBridgeLink({
  lang,
  bridge,
}: {
  lang: string;
  bridge: MethodBridge;
}) {
  const href = `/${lang}/${bridge.path}${bridge.hash ? `#${bridge.hash}` : ""}`;
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:text-accent-hover transition-colors"
    >
      {bridge.label}
      <span aria-hidden>&#8594;</span>
    </Link>
  );
}

function FeaturedCard({
  lang,
  slug,
  project,
  labels,
  appLink,
  index,
  priorityImage,
}: {
  lang: string;
  slug: string;
  project: Project;
  labels: SectionLabels;
  appLink: AppLinkLabels;
  index: number;
  priorityImage: boolean;
}) {
  const appUrl = appUrls[slug];
  return (
    <section
      id={slug}
      className={`scroll-mt-28 sm:scroll-mt-24 space-y-10${index > 0 ? " border-t border-slate-800 pt-16" : ""}`}
    >
      <header className="space-y-4">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {project.tag}
          </span>
          {appUrl && (
            <OpenAppButton
              href={appUrl}
              label={appLink.label}
              newTabLabel={appLink.newTab}
              appName={project.title}
            />
          )}
        </div>
        <h2 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
          {project.title}
        </h2>
        <p className="text-lg leading-8 text-slate-400 max-w-2xl">{project.description}</p>
      </header>

      <Demonstrates label={labels.demonstrates} text={project.demonstrates} />

      {project.image && (
        <div className="overflow-hidden rounded-2xl border border-slate-800">
          <Image
            src={project.image.src}
            width={project.image.width}
            height={project.image.height}
            alt={project.image.alt}
            priority={priorityImage}
            loading={priorityImage ? undefined : "lazy"}
            sizes="(min-width: 896px) 56rem, 100vw"
            className="h-auto w-full"
          />
        </div>
      )}

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
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden />
            <h3 className="text-xs font-bold uppercase tracking-widest text-accent">
              {labels.solution}
            </h3>
          </div>
          <p className="text-sm leading-7 text-slate-300">{project.solution}</p>
        </div>
      </div>

      <div className="space-y-6">
        <h3 className="text-lg font-bold text-slate-200 border-b border-slate-800 pb-3">
          {labels.features}
        </h3>
        <FeatureGrid features={project.features} />
      </div>

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

      {project.methodBridge && (
        <MethodBridgeLink lang={lang} bridge={project.methodBridge} />
      )}
    </section>
  );
}

function CompactCard({
  slug,
  project,
  labels,
  appLink,
}: {
  slug: string;
  project: Project;
  labels: SectionLabels;
  appLink: AppLinkLabels;
}) {
  const appUrl = appUrls[slug];
  return (
    <section
      id={slug}
      className="scroll-mt-28 sm:scroll-mt-24 space-y-6 rounded-2xl border border-slate-800 bg-slate-900/30 p-7 sm:p-8"
    >
      <header className="space-y-3">
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {project.tag}
          </span>
          {appUrl && (
            <OpenAppButton
              href={appUrl}
              label={appLink.label}
              newTabLabel={appLink.newTab}
              appName={project.title}
            />
          )}
        </div>
        <h2 className="text-2xl font-extrabold tracking-tight text-slate-100 sm:text-3xl">
          {project.title}
        </h2>
        <p className="text-sm leading-7 text-slate-400 max-w-2xl">{project.description}</p>
      </header>

      <Demonstrates label={labels.demonstrates} text={project.demonstrates} />

      <FeatureGrid features={project.features} titleTag="h3" />

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
  );
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
  const themes: Theme[] = useCases?.themes ?? [];
  const themeLabel = (key: string) => themes.find((t) => t.key === key)?.label ?? key;

  const labels: SectionLabels = useCases?.sectionLabels ?? {
    challenge: "Challenge",
    solution: "Solution",
    features: "Key Features",
    stack: "Tech Stack",
    metrics: "Results",
    demonstrates: "What It Demonstrates",
  };

  const appLink: AppLinkLabels = useCases?.appLink ?? {
    label: "Open the application",
    newTab: "opens in a new tab",
  };

  const featuredSlugs = projects.filter(([, p]) => p.featured).map(([slug]) => slug);
  let priorityAssigned = false;

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-4xl space-y-16">
        {/* Page header */}
        <header className="flex flex-col items-start gap-8">
          <h1 className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {useCases?.title ?? "Cas d'usage"}
          </h1>
          <p className="text-lg leading-7 text-slate-400">{useCases?.subtitle}</p>
        </header>

        {/* Overview — compact grid of all 8, optional theme filter */}
        {useCases?.overview && (
          <OverviewGrid
            allLabel={useCases.overview.allLabel}
            filterAriaLabel={useCases.overview.filterAriaLabel}
            themes={themes}
            items={projects.map(([slug, project]) => ({
              slug,
              title: project.title,
              description: project.description,
              themeKey: project.theme,
              themeLabel: themeLabel(project.theme),
            }))}
          />
        )}

        {/* Featured demos — full case study */}
        <div className="space-y-16">
          {projects
            .filter(([slug]) => featuredSlugs.includes(slug))
            .map(([slug, project], index) => {
              const isPriority = !priorityAssigned && !!project.image;
              if (isPriority) priorityAssigned = true;
              return (
                <FeaturedCard
                  key={slug}
                  lang={lang}
                  slug={slug}
                  project={project}
                  labels={labels}
                  appLink={appLink}
                  index={index}
                  priorityImage={isPriority}
                />
              );
            })}
        </div>

        {/* Compact demos */}
        <div className="space-y-8 border-t border-slate-800 pt-16">
          {projects
            .filter(([slug]) => !featuredSlugs.includes(slug))
            .map(([slug, project]) => (
              <CompactCard
                key={slug}
                slug={slug}
                project={project}
                labels={labels}
                appLink={appLink}
              />
            ))}
        </div>
      </div>
    </main>
  );
}
