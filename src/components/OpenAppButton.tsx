// Bouton unique d'ouverture d'une application externe (démos TKoidra).
// Fond accent + texte navy, cible tactile ≥ 44 px, nouvel onglet annoncé aux lecteurs d'écran.
// Nom accessible : libellé visible en premier (WCAG 2.5.3), puis nom de l'app et mention « nouvel onglet ».

interface OpenAppButtonProps {
  href: string;
  label: string;
  newTabLabel: string;
  appName: string;
  className?: string;
}

export function OpenAppButton({
  href,
  label,
  newTabLabel,
  appName,
  className = "",
}: OpenAppButtonProps) {
  return (
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
  );
}
