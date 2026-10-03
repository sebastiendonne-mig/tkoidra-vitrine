// Bouton unique d'ouverture d'une application externe (démos TKoidra).
// Fond accent + texte navy, cible tactile ≥ 44 px, nouvel onglet annoncé aux lecteurs d'écran.
// Nom accessible : libellé visible en premier (WCAG 2.5.3), puis nom de l'app et mention « nouvel onglet ».

// note (optionnelle) : petite mention sous le bouton, pleine largeur ; les segments **…** sont mis en gras.

interface OpenAppButtonProps {
  href: string;
  label: string;
  newTabLabel: string;
  appName: string;
  className?: string;
  note?: string;
}

export function OpenAppButton({
  href,
  label,
  newTabLabel,
  appName,
  className = "",
  note,
}: OpenAppButtonProps) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex min-h-11 items-center gap-1.5 rounded-lg bg-accent px-4 py-2 text-sm font-bold text-navy hover:bg-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent-hover focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 motion-safe:transition-colors ${className}`.trim()}
      >
        {label}
        <span aria-hidden>&#8599;</span>
        <span className="sr-only">
          {" "}
          — {appName} ({newTabLabel})
        </span>
      </a>
      {note && (
        <p className="mt-2 w-full max-w-2xl text-sm leading-5 text-slate-400">
          {note.split(/\*\*(.+?)\*\*/g).map((part, i) =>
            i % 2 === 1 ? (
              <strong key={i} className="font-semibold text-slate-200">
                {part}
              </strong>
            ) : (
              part
            ),
          )}
        </p>
      )}
    </>
  );
}
