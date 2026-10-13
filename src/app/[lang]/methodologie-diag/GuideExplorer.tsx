"use client";

import { useState } from "react";
import { OpenAppButton } from "../../../components/OpenAppButton";
import { appUrls } from "../../../lib/app-urls";
import { Emphasis } from "./Emphasis";

export interface Guide {
  id: string;
  title: string;
  step: string;
  themes: string[];
  inProgress: boolean;
  seenSometimes: string;
  howTo: string[];
  checklist: string[];
  illustrations: { text: string; appKey?: string }[];
}

export interface GuidesSectionDict {
  title: string;
  filtersLabel: string;
  stepFilterLabel: string;
  themeFilterLabel: string;
  all: string;
  count: string;
  empty: string;
  inProgress: string;
  seenSometimes: string;
  howTo: string;
  checklist: string;
  illustration: string;
  steps: Record<string, string>;
  themes: Record<string, string>;
}

const PILL =
  "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";
const PILL_ON = "border-accent bg-accent/15 text-accent-hover";
const PILL_OFF =
  "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-accent/40 hover:text-accent-hover";

// Groupe de pastilles (motif aria-pressed d'OverviewGrid) ; null = « tous ».
function FilterGroup({
  id,
  label,
  allLabel,
  options,
  active,
  onChange,
}: {
  id: string;
  label: string;
  allLabel: string;
  options: [string, string][];
  active: string | null;
  onChange: (key: string | null) => void;
}) {
  return (
    <div role="group" aria-labelledby={id} className="space-y-2">
      <p id={id} className="text-xs font-semibold text-slate-400">
        {label}
      </p>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => onChange(null)}
          aria-pressed={active === null}
          className={`${PILL} ${active === null ? PILL_ON : PILL_OFF}`}
        >
          {allLabel}
        </button>
        {options.map(([key, text]) => (
          <button
            key={key}
            type="button"
            onClick={() => onChange(key)}
            aria-pressed={active === key}
            className={`${PILL} ${active === key ? PILL_ON : PILL_OFF}`}
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
}

// Rendu SSG = les 11 guides présents dans le HTML (filtres à « tous » au premier rendu).
// Le JS n'ajoute que le masquage côté client (attribut hidden) : sans JS, tout reste visible.
export function GuideExplorer({
  t,
  guides,
  appNames,
  openAppLabel,
  newTabLabel,
  coldStartNote,
  coldStartGuide,
}: {
  t: GuidesSectionDict;
  guides: Guide[];
  appNames: Record<string, string>;
  openAppLabel: string;
  newTabLabel: string;
  coldStartNote?: string;
  coldStartGuide?: { id: string; index: number };
}) {
  const [step, setStep] = useState<string | null>(null);
  const [theme, setTheme] = useState<string | null>(null);
  const matches = (g: Guide) =>
    (step === null || g.step === step) && (theme === null || g.themes.includes(theme));
  const visibleCount = guides.filter(matches).length;

  return (
    <div className="space-y-8">
      <div aria-label={t.filtersLabel} role="region" className="space-y-5">
        <FilterGroup
          id="guides-filter-step"
          label={t.stepFilterLabel}
          allLabel={t.all}
          options={Object.entries(t.steps)}
          active={step}
          onChange={setStep}
        />
        <FilterGroup
          id="guides-filter-theme"
          label={t.themeFilterLabel}
          allLabel={t.all}
          options={Object.entries(t.themes)}
          active={theme}
          onChange={setTheme}
        />
        <p aria-live="polite" className="text-xs text-slate-400">
          {t.count.replace("{count}", String(visibleCount)).replace("{total}", String(guides.length))}
        </p>
      </div>

      {visibleCount === 0 && <p className="text-sm text-slate-400">{t.empty}</p>}

      <ol className="space-y-4">
        {guides.map((guide, i) => (
          <li key={guide.id} id={`guide-${guide.id}`} hidden={!matches(guide)} className="scroll-mt-28">
            <details className="group rounded-2xl border border-slate-800 bg-slate-900/30 open:bg-slate-900/50">
              <summary className="flex cursor-pointer list-none items-start justify-between gap-4 rounded-2xl px-4 py-4 hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent motion-safe:transition-colors sm:px-6 [&::-webkit-details-marker]:hidden">
                <span className="flex min-w-0 flex-col gap-2">
                  <span className="flex flex-wrap items-center gap-2">
                    <span aria-hidden className="font-mono text-xs text-slate-400">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-[0.65rem] font-bold uppercase tracking-widest text-accent">
                      {t.steps[guide.step]}
                    </span>
                    {guide.inProgress && (
                      <span className="rounded-full border border-slate-500 bg-slate-800 px-2 py-0.5 text-[0.65rem] font-bold uppercase tracking-widest text-slate-200">
                        {t.inProgress}
                      </span>
                    )}
                  </span>
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-accent-hover sm:text-lg">
                    {guide.title}
                  </h3>
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="mt-1 h-4 w-4 shrink-0 text-accent group-open:rotate-180 motion-safe:transition-transform"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 11.17l3.71-3.94a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                    clipRule="evenodd"
                  />
                </svg>
              </summary>

              <div className="space-y-6 px-4 pb-6 sm:px-6">
                <div className="space-y-2">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {t.seenSometimes}
                  </h4>
                  <p className="text-sm leading-7 text-slate-300">{guide.seenSometimes}</p>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent">{t.howTo}</h4>
                  <ol className="list-decimal space-y-2 pl-5 text-sm leading-7 text-slate-300 marker:font-bold marker:text-accent">
                    {guide.howTo.map((item) => (
                      <li key={item} className="pl-1">
                        <Emphasis text={item} />
                      </li>
                    ))}
                  </ol>
                </div>

                <div className="space-y-3">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">
                    {t.checklist}
                  </h4>
                  <ul className="grid gap-x-8 gap-y-2 md:grid-cols-2">
                    {guide.checklist.map((item) => (
                      <li key={item} className="flex gap-3 text-sm leading-6 text-slate-300">
                        <span
                          aria-hidden
                          className="mt-1.5 h-3 w-3 shrink-0 rounded-sm border border-accent/60"
                        />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="space-y-3 rounded-xl border border-accent/20 bg-accent/5 p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-accent-hover">
                    {t.illustration}
                  </h4>
                  <ul className="space-y-5">
                    {guide.illustrations.map((ill, j) => (
                      <li key={ill.text} className="flex flex-col items-start gap-3">
                        <p className="text-sm leading-7 text-slate-300">{ill.text}</p>
                        {ill.appKey && appUrls[ill.appKey] && (
                          <div className="flex w-full flex-col items-start">
                            <OpenAppButton
                              href={appUrls[ill.appKey]}
                              label={openAppLabel}
                              newTabLabel={newTabLabel}
                              appName={appNames[ill.appKey] ?? ill.appKey}
                              note={
                                guide.id === coldStartGuide?.id && j === coldStartGuide.index
                                  ? coldStartNote
                                  : undefined
                              }
                            />
                          </div>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </details>
          </li>
        ))}
      </ol>
    </div>
  );
}
