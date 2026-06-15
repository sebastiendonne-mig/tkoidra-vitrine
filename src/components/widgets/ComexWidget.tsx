"use client";

import { useState, type FormEvent } from "react";

const ui = {
  fr: {
    badge: "Essayer en direct",
    label: "Brief strategique",
    placeholder:
      "Ex : Nous souhaitons deployer un assistant IA pour nos equipes commerciales sur 6 mois avec un budget de 150k euros...",
    charHint: "caracteres minimum recommandes",
    button: "Lancer le cadrage",
    appHint: "comex.tkoidra.com",
  },
  en: {
    badge: "Try it live",
    label: "Strategic brief",
    placeholder:
      "E.g. : We want to deploy an AI assistant for our sales teams over 6 months with a 150k EUR budget...",
    charHint: "minimum recommended characters",
    button: "Start framing",
    appHint: "comex.tkoidra.com",
  },
} as const;

const MIN_CHARS = 30;

export function ComexWidget({ lang }: { lang: string }) {
  const locale = (lang in ui ? lang : "fr") as keyof typeof ui;
  const t = ui[locale];
  const [brief, setBrief] = useState("");
  const isReady = brief.trim().length >= MIN_CHARS;

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const b = brief.trim();
    if (!b) return;
    window.open(
      `https://comex.tkoidra.com/?brief=${encodeURIComponent(b)}`,
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
        <label htmlFor="comex-brief" className="sr-only">
          {t.label}
        </label>
        <textarea
          id="comex-brief"
          rows={5}
          value={brief}
          onChange={(e) => setBrief(e.target.value)}
          placeholder={t.placeholder}
          className="w-full resize-none rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />

        <div className="flex items-center justify-between">
          <span
            className={`text-xs tabular-nums transition-colors ${
              isReady ? "text-emerald-400" : "text-slate-500"
            }`}
          >
            {brief.trim().length}&nbsp;/&nbsp;{MIN_CHARS} {t.charHint}
          </span>
        </div>

        <button
          type="submit"
          disabled={!isReady}
          className="w-full rounded-xl bg-teal-500 px-6 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t.button} &rarr;
        </button>
      </form>

      <p className="text-center text-xs text-slate-600">{t.appHint}</p>
    </section>
  );
}
