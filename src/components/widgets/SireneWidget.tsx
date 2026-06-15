"use client";

import { useState, type FormEvent } from "react";

const ui = {
  fr: {
    badge: "Essayer en direct",
    label: "Recherche en langage naturel",
    placeholder: "Ex : startups IA en Ile-de-France de moins de 50 salaries",
    button: "Rechercher",
    appHint: "sirene.tkoidra.com",
  },
  en: {
    badge: "Try it live",
    label: "Natural language search",
    placeholder: "E.g. : AI startups in Paris with fewer than 50 employees",
    button: "Search",
    appHint: "sirene.tkoidra.com",
  },
} as const;

export function SireneWidget({ lang }: { lang: string }) {
  const locale = (lang in ui ? lang : "fr") as keyof typeof ui;
  const t = ui[locale];
  const [query, setQuery] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const q = query.trim();
    if (!q) return;
    window.open(
      `https://sirene.tkoidra.com/?q=${encodeURIComponent(q)}`,
      "_blank",
      "noopener,noreferrer"
    );
  }

  return (
    <section
      aria-label={t.badge}
      className="rounded-2xl border border-teal-500/20 bg-gradient-to-br from-slate-900/70 to-slate-900/30 p-8 backdrop-blur-sm space-y-6"
    >
      {/* Header */}
      <div className="flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse"
          aria-hidden
        />
        <span className="text-xs font-bold uppercase tracking-widest text-emerald-400">
          {t.badge}
        </span>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-3">
        <label htmlFor="sirene-query" className="sr-only">
          {t.label}
        </label>
        <input
          id="sirene-query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={t.placeholder}
          className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
        <button
          type="submit"
          disabled={!query.trim()}
          className="w-full rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.button} &rarr;
        </button>
      </form>

      <p className="text-center text-xs text-slate-600">{t.appHint}</p>
    </section>
  );
}
