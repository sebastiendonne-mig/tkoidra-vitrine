"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavProps {
  home: string;
  useCases: string;
  blog: string;
}

interface NavbarProps {
  lang: string;
  nav: NavProps;
}

export function Navbar({ lang, nav }: NavbarProps) {
  const pathname = usePathname();
  const altLang = lang === "fr" ? "en" : "fr";
  // Swap only the leading /lang segment, leave the rest of the path intact
  const altPath = pathname.replace(
    new RegExp(`^/${lang}(?=/|$)`),
    `/${altLang}`
  );

  const links = [
    { href: `/${lang}/use-cases`, label: nav.home },
    { href: `/${lang}/profil`, label: lang === "fr" ? "Profil" : "Profile" },
    { href: `/${lang}/methodologie-diag`, label: lang === "fr" ? "Méthode" : "Method" },
    { href: `/${lang}/blog`, label: nav.blog },
  ];

  function isActive(href: string): boolean {
    return pathname.startsWith(href);
  }

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-slate-800/60 bg-slate-950/80 backdrop-blur-md">
      <nav
        className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6"
        aria-label={lang === "fr" ? "Navigation principale" : "Main navigation"}
      >
        {/* Logo + wordmark — links to home */}
        <Link
          href={`/${lang}/use-cases`}
          className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          aria-label="TKoidra — accueil"
        >
          <svg viewBox="0 0 260 260" xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 flex-shrink-0">
            <rect x="10" y="10" width="100" height="100" rx="12" fill="white"/>
            <rect x="150" y="10" width="100" height="100" rx="12" fill="white"/>
            <rect x="10" y="150" width="100" height="100" rx="12" fill="white"/>
            <rect x="150" y="150" width="100" height="100" rx="12" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="6" strokeDasharray="12 12"/>
            <rect x="170" y="170" width="100" height="100" rx="12" fill="#00B4D8"/>
          </svg>
          <span className="text-sm font-bold tracking-wide text-slate-100">TKoidra</span>
        </Link>

        {/* Nav links — hidden on very small screens, visible from sm */}
        <div className="hidden items-center gap-1 sm:flex">
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={[
                "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                isActive(href)
                  ? "bg-teal-500/10 text-teal-300"
                  : "text-slate-400 hover:text-slate-100",
              ].join(" ")}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Contact + Language switcher */}
        <div className="flex items-center gap-3">
          <a
            href="https://www.linkedin.com/in/sebastiendonne/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-sm font-medium text-slate-400 transition-colors hover:text-slate-100 sm:block"
          >
            Contact
          </a>
          <Link
            href={altPath}
            className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all hover:border-teal-500/50 hover:text-teal-300"
          >
            {altLang}
          </Link>
        </div>
      </nav>

      {/* Mobile nav strip — only visible below sm */}
      <div className="flex items-center gap-1 overflow-x-auto border-t border-slate-800/40 px-6 pb-2 pt-1 sm:hidden">
        {links.map(({ href, label }) => (
          <Link
            key={href}
            href={href}
            className={[
              "whitespace-nowrap rounded-md px-3 py-1 text-xs font-medium transition-colors",
              isActive(href)
                ? "bg-teal-500/10 text-teal-300"
                : "text-slate-400 hover:text-slate-100",
            ].join(" ")}
          >
            {label}
          </Link>
        ))}
      </div>
    </header>
  );
}
