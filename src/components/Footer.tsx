import Link from "next/link";

interface NavProps {
  home: string;
  useCases: string;
  blog: string;
}

interface FooterProps {
  lang: string;
  nav: NavProps;
}

const legalLabels = {
  fr: "Mentions légales",
  en: "Legal Notice",
} as const;

const profilLabels = {
  fr: "Profil",
  en: "Profile",
} as const;

const methodeLabels = {
  fr: "Méthode",
  en: "Method",
} as const;

export function Footer({ lang, nav }: FooterProps) {
  const legalLabel =
    lang in legalLabels
      ? legalLabels[lang as keyof typeof legalLabels]
      : legalLabels.fr;
  const profilLabel =
    lang in profilLabels
      ? profilLabels[lang as keyof typeof profilLabels]
      : profilLabels.fr;
  const methodeLabel =
    lang in methodeLabels
      ? methodeLabels[lang as keyof typeof methodeLabels]
      : methodeLabels.fr;

  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-slate-600 order-last sm:order-first">
            &copy; {new Date().getFullYear()} S&eacute;bastien Donn&eacute;
          </p>

          {/* Nav + Legal */}
          <nav
            className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2"
            aria-label={
              lang === "fr" ? "Navigation secondaire" : "Secondary navigation"
            }
          >
            <Link
              href={`/${lang}/use-cases`}
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              {nav.useCases}
            </Link>
            <Link
              href={`/${lang}/profil`}
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              {profilLabel}
            </Link>
            <Link
              href={`/${lang}/methodologie-diag`}
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              {methodeLabel}
            </Link>
            <Link
              href={`/${lang}/blog`}
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              {nav.blog}
            </Link>
            <Link
              href={`/${lang}/legal`}
              className="text-xs text-slate-500 transition-colors hover:text-slate-300"
            >
              {legalLabel}
            </Link>
          </nav>

          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/in/sebastiendonne/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-400 transition-colors hover:text-teal-400"
          >
            LinkedIn &#8599;
          </a>
        </div>
      </div>
    </footer>
  );
}
