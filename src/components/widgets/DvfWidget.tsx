"use client";

import { useState, type FormEvent } from "react";

const ui = {
  fr: {
    badge: "Essayer en direct",
    label: "Code postal ou commune",
    placeholder: "Ex : 75011 ou Lyon",
    button: "Explorer les prix",
    appHint: "dvf.tkoidra.com",
  },
  en: {
    badge: "Try it live",
    label: "Postal code or city",
    placeholder: "E.g. : 75011 or Paris",
    button: "Explore prices",
    appHint: "dvf.tkoidra.com",
  },
} as const;

export function DvfWidget({ lang }: { lang: string }) {
  const locale = (lang in ui ? lang : "fr") as keyof typeof ui;
  const t = ui[locale];
  const [code, setCode] = useState("");

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const cp = code.trim();
    if (!cp) return;
    window.open(
      `https://dvf.tkoidra.com/?cp=${encodeURIComponent(cp)}`,
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
      <form onSubmit={handleSubmit} className="flex gap-3">
        <label htmlFor="dvf-code" className="sr-only">
          {t.label}
        </label>
        <input
          id="dvf-code"
          type="text"
          inputMode="numeric"
          maxLength={10}
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={t.placeholder}
          className="flex-1 rounded-xl border border-slate-800 bg-slate-900/50 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="rounded-xl bg-teal-500 px-5 py-3 text-sm font-bold text-slate-950 transition-all hover:bg-teal-400 disabled:cursor-not-allowed disabled:opacity-40 whitespace-nowrap"
        >
          {t.button} &rarr;
        </button>
      </form>

      <p className="text-center text-xs text-slate-600">{t.appHint}</p>
    </section>
  );
}
