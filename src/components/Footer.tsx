import Link from "next/link";
import { LINKEDIN_URL } from "../lib/site";
import type { NavLabels } from "../lib/nav";

interface FooterProps {
  lang: string;
  nav: NavLabels;
}

export function Footer({ lang, nav }: FooterProps) {
  return (
    <footer className="border-t border-slate-900 bg-slate-950">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          {/* Copyright */}
          <p className="text-xs text-slate-400 order-last sm:order-first">
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
              className="text-xs text-slate-400 transition-colors hover:text-slate-300"
            >
              {nav.useCases}
            </Link>
            <Link
              href={`/${lang}/methodologie-diag`}
              className="text-xs text-slate-400 transition-colors hover:text-slate-300"
            >
              {nav.method}
            </Link>
            {lang !== "en" && (
              <Link
                href={`/${lang}/blog`}
                className="text-xs text-slate-400 transition-colors hover:text-slate-300"
              >
                {nav.blog}
              </Link>
            )}
            <Link
              href={`/${lang}/profil`}
              className="text-xs text-slate-400 transition-colors hover:text-slate-300"
            >
              {nav.profile}
            </Link>
            <Link
              href={`/${lang}/legal`}
              className="text-xs text-slate-400 transition-colors hover:text-slate-300"
            >
              {nav.legal}
            </Link>
          </nav>

          {/* LinkedIn */}
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-slate-400 transition-colors hover:text-accent"
          >
            LinkedIn &#8599;
          </a>
        </div>
      </div>
    </footer>
  );
}
