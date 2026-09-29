"use client";

import { useState } from "react";

interface Theme {
  key: string;
  label: string;
}

interface Item {
  slug: string;
  title: string;
  description: string;
  themeKey: string;
  themeLabel: string;
}

// Rendu SSG = les 8 cartes visibles sans JS (activeTheme démarre à null → aucun filtre).
// Le JS n'ajoute que le filtrage côté client, sans jamais masquer de contenu au premier rendu serveur.
export function OverviewGrid({
  allLabel,
  filterAriaLabel,
  themes,
  items,
}: {
  allLabel: string;
  filterAriaLabel: string;
  themes: Theme[];
  items: Item[];
}) {
  const [active, setActive] = useState<string | null>(null);
  const visible = active ? items.filter((item) => item.themeKey === active) : items;

  return (
    <div className="space-y-5">
      <nav aria-label={filterAriaLabel} className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setActive(null)}
          aria-pressed={active === null}
          className={[
            "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
            active === null
              ? "border-teal-400 bg-teal-500/15 text-teal-300"
              : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-teal-500/40 hover:text-teal-300",
          ].join(" ")}
        >
          {allLabel}
        </button>
        {themes.map((theme) => (
          <button
            key={theme.key}
            type="button"
            onClick={() => setActive(theme.key)}
            aria-pressed={active === theme.key}
            className={[
              "rounded-full border px-3 py-1.5 text-xs font-bold uppercase tracking-widest motion-safe:transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400",
              active === theme.key
                ? "border-teal-400 bg-teal-500/15 text-teal-300"
                : "border-slate-700 bg-slate-900/40 text-slate-400 hover:border-teal-500/40 hover:text-teal-300",
            ].join(" ")}
          >
            {theme.label}
          </button>
        ))}
      </nav>

      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {visible.map((item) => (
          <li key={item.slug}>
            <a
              href={`#${item.slug}`}
              className="group flex h-full flex-col gap-2 rounded-2xl border border-slate-800 bg-slate-900/30 p-4 motion-safe:transition-all hover:border-teal-500/40 hover:bg-slate-900/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
            >
              <span className="text-[0.65rem] font-bold uppercase tracking-widest text-teal-400">
                {item.themeLabel}
              </span>
              <span className="text-sm font-bold text-slate-100 group-hover:text-teal-200">
                {item.title}
              </span>
              <span className="line-clamp-2 text-xs leading-5 text-slate-400">
                {item.description}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
