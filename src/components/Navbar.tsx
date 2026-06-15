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
        {/* Contact — external LinkedIn */}
        <a
          href="https://www.linkedin.com/in/sebastiendonne/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm font-bold tracking-wide text-slate-100 transition-colors hover:text-teal-300"
        >
          Contact
        </a>

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

        {/* Language switcher */}
        <Link
          href={altPath}
          className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-1 text-xs font-bold uppercase tracking-widest text-slate-400 transition-all hover:border-teal-500/50 hover:text-teal-300"
        >
          {altLang}
        </Link>
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
