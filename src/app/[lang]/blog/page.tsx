import { i18n } from "../../../../i18n-config";
import { getPostsByLang } from "../../../lib/blog-posts";
import Link from "next/link";

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

const ui = {
  fr: {
    badge: "Deep Dives",
    subtitle:
      "Des articles approfondis sur l'architecture IA, le LLMOps et les pratiques de Product Owner dans des contextes d'IA réelle.",
    backLabel: "Retour",
    readLabel: "Lire l'article →",
    readTimeSuffix: "de lecture",
  },
  en: {
    badge: "Deep Dives",
    subtitle:
      "In-depth articles on AI architecture, LLMOps, and AI Product Owner practices in real-world contexts.",
    backLabel: "Back",
    readLabel: "Read article →",
    readTimeSuffix: "read",
  },
} as const;

export default async function BlogIndexPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const locale = (lang in ui ? lang : "fr") as keyof typeof ui;
  const t = ui[locale];
  const posts = getPostsByLang(lang);

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-3xl space-y-16">

        {/* Header */}
        <header className="flex flex-col items-start gap-8">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {t.badge}
          </span>
          <p className="text-lg leading-7 text-slate-400">{t.subtitle}</p>
        </header>

        {/* Article list */}
        <section className="space-y-5">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/${lang}/blog/${post.slug}`}
              className="group flex flex-col gap-4 rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-sm transition-all hover:border-teal-500/40 hover:bg-slate-900/70"
            >
              {/* Tag + meta */}
              <div className="flex flex-wrap items-center gap-3">
                <span className="rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-300">
                  {post.tag}
                </span>
                <span className="text-xs text-slate-500">
                  {new Date(post.date).toLocaleDateString(
                    lang === "fr" ? "fr-FR" : "en-GB",
                    { year: "numeric", month: "long", day: "numeric" }
                  )}
                </span>
                <span className="text-xs text-slate-600" aria-hidden>·</span>
                <span className="text-xs text-slate-500">
                  {post.readTime} {t.readTimeSuffix}
                </span>
              </div>

              {/* Title */}
              <h2 className="text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors leading-snug">
                {post.title}
              </h2>

              {/* Summary */}
              <p className="text-sm leading-6 text-slate-400">{post.summary}</p>

              {/* CTA */}
              <span className="text-xs font-semibold text-teal-400 group-hover:underline">
                {t.readLabel}
              </span>
            </Link>
          ))}
        </section>

      </div>
    </main>
  );
}
