"use client";

import { useEffect, useState } from "react";

type Step = { id: string; number: string; name: string };

// Rendu SSG = 3 liens d'ancre fonctionnels sans JS ; le JS n'ajoute que l'état actif.
export function PhaseStepper({ label, steps }: { label: string; steps: Step[] }) {
  const [active, setActive] = useState(-1);

  useEffect(() => {
    const sections = steps
      .map((s) => document.getElementById(s.id))
      .filter((el): el is HTMLElement => el !== null);
    if (sections.length === 0) return;

    // Bande étroite au milieu de l'écran : une seule phase la traverse à la fois.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(steps.findIndex((s) => s.id === entry.target.id));
          }
        }
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [steps]);

  const progress = active <= 0 ? 0 : (active / (steps.length - 1)) * 100;

  return (
    // Bandeau opaque collé au header fixe (h-16) : rien ne défile visiblement entre les deux.
    <div className="z-40 sm:sticky sm:top-16 sm:bg-slate-950 sm:py-2">
      <nav
        aria-label={label}
        className="rounded-2xl border border-slate-800 bg-slate-950/85 px-4 py-3 backdrop-blur-md"
      >
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-[16.667%] right-[16.667%] top-4 h-px bg-slate-800"
          >
            <div
              className="h-full bg-teal-400 motion-safe:transition-[width] motion-safe:duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
          <ol className="relative grid grid-cols-3">
            {steps.map((step, i) => {
              const isActive = i === active;
              const isDone = active > i;
              return (
                <li key={step.id} className="flex justify-center">
                  <a
                    href={`#${step.id}`}
                    aria-current={isActive ? "step" : undefined}
                    className="group flex flex-col items-center gap-1.5 rounded-lg px-2 py-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
                  >
                    <span
                      className={[
                        "flex h-8 w-8 items-center justify-center rounded-full border text-xs font-bold motion-safe:transition-colors",
                        isActive
                          ? "border-teal-400 bg-teal-400 text-slate-950"
                          : isDone
                            ? "border-teal-400/60 bg-slate-950 text-teal-300"
                            : "border-slate-700 bg-slate-950 text-slate-400 group-hover:border-teal-500/60 group-hover:text-teal-300",
                      ].join(" ")}
                    >
                      {step.number}
                    </span>
                    <span
                      className={[
                        "text-xs font-semibold sm:text-sm motion-safe:transition-colors",
                        isActive
                          ? "text-slate-100"
                          : "text-slate-400 group-hover:text-teal-300",
                      ].join(" ")}
                    >
                      {step.name}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </nav>
    </div>
  );
}
