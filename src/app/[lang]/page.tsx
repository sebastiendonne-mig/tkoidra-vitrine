import Link from "next/link";
import { getDictionary } from "../../get-dictionary";
import { i18n } from "../../../i18n-config";

interface DemoItem {
  slug: string;
  name: string;
  text: string;
}

interface ExploreItem {
  key: "useCases" | "method" | "blog" | "profile";
  title: string;
  text: string;
}

interface HomeDict {
  badge: string;
  title: string;
  intro: string;
  cta: string;
  methodLink: string;
  demos: { heading: string; items: DemoItem[]; allLink: string };
  explore: { heading: string; blogLangNote: string; items: ExploreItem[] };
}

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.home as HomeDict;

  // Le blog EN a été retiré (410) : la carte Deep Dives y renvoie vers la version FR.
  const blogHref = lang === "en" ? "/fr/blog" : `/${lang}/blog`;
  const exploreHref: Record<ExploreItem["key"], string> = {
    useCases: `/${lang}/use-cases`,
    method: `/${lang}/methodologie-diag`,
    blog: blogHref,
    profile: `/${lang}/profil`,
  };

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 px-6 py-24 font-sans text-white">
      <div className="w-full max-w-4xl space-y-20">
        {/* Hero */}
        <header className="flex flex-col items-start gap-6">
          <span className="rounded-full border border-accent/40 bg-accent/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-accent">
            {t.badge}
          </span>
          <h1 className="max-w-3xl bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-6xl">
            {t.title}
          </h1>
          <p className="max-w-2xl text-lg leading-8 text-slate-400">{t.intro}</p>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 pt-2">
            <Link
              href={`/${lang}/use-cases`}
              className={`inline-flex min-h-11 items-center rounded-xl bg-accent px-6 py-3 text-sm font-bold text-navy hover:bg-accent-hover motion-safe:transition-colors ${focusRing}`}
            >
              {t.cta}
            </Link>
            <Link
              href={`/${lang}/methodologie-diag`}
              className={`inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-accent hover:text-accent-hover motion-safe:transition-colors ${focusRing}`}
            >
              {t.methodLink}
              <span aria-hidden>&#8594;</span>
            </Link>
          </div>
        </header>

        {/* Trois démonstrateurs phares */}
        <section className="space-y-8">
          <h2 className="border-b border-slate-800 pb-3 text-lg font-bold text-slate-200">
            {t.demos.heading}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-3">
            {t.demos.items.map((item) => (
              <li key={item.slug}>
                <Link
                  href={`/${lang}/use-cases#${item.slug}`}
                  className={`group flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-accent/40 hover:bg-slate-900/70 motion-safe:transition-all ${focusRing}`}
                >
                  <h3 className="text-base font-bold text-slate-100 group-hover:text-accent-hover motion-safe:transition-colors">
                    {item.name}
                  </h3>
                  <p className="text-sm leading-6 text-slate-400">{item.text}</p>
                </Link>
              </li>
            ))}
          </ul>
          <Link
            href={`/${lang}/use-cases`}
            className={`inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-semibold text-accent hover:text-accent-hover motion-safe:transition-colors ${focusRing}`}
          >
            <span aria-hidden>&#8594;</span>
            {t.demos.allLink}
          </Link>
        </section>

        {/* Explorer */}
        <section className="space-y-8">
          <h2 className="border-b border-slate-800 pb-3 text-lg font-bold text-slate-200">
            {t.explore.heading}
          </h2>
          <ul className="grid gap-4 sm:grid-cols-2">
            {t.explore.items.map((item) => {
              const isFrenchBlog = item.key === "blog" && lang === "en";
              return (
                <li key={item.key}>
                  <Link
                    href={exploreHref[item.key]}
                    {...(isFrenchBlog ? { hrefLang: "fr" } : {})}
                    className={`group flex h-full flex-col gap-3 rounded-2xl border border-slate-800 bg-slate-900/40 p-6 hover:border-accent/40 hover:bg-slate-900/70 motion-safe:transition-all ${focusRing}`}
                  >
                    <h3 className="flex items-center justify-between gap-4 text-base font-bold text-slate-100 group-hover:text-accent-hover motion-safe:transition-colors">
                      {item.title}
                      <span aria-hidden className="text-slate-500 group-hover:text-accent">
                        &#8594;
                      </span>
                    </h3>
                    <p className="text-sm leading-6 text-slate-400">
                      {item.text}
                      {isFrenchBlog && t.explore.blogLangNote
                        ? ` ${t.explore.blogLangNote}`
                        : ""}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </main>
  );
}
