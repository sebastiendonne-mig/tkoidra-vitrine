import type { Metadata } from "next";
import fs from "fs";
import path from "path";
import { i18n } from '../../../../../i18n-config';
import { getPostBySlug, getAllSlugs } from '../../../../lib/blog-posts';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import remarkGfm from 'remark-gfm';
import type { ComponentPropsWithoutRef } from 'react';

type Props = {
  params: Promise<{ lang: string; slug: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.flatMap((lang) =>
    getAllSlugs().map((slug) => ({ lang, slug }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, slug } = await params;
  const post = getPostBySlug(lang, slug);

  if (!post) return { title: "TKoidra" };

  const title = `${post.title} | TKoidra`;
  const url = `https://tkoidra.com/${lang}/blog/${slug}`;

  return {
    title,
    description: post.summary,
    alternates: {
      canonical: url,
      languages: {
        fr: `https://tkoidra.com/fr/blog/${slug}`,
        en: `https://tkoidra.com/en/blog/${slug}`,
      },
    },
    openGraph: {
      title,
      description: post.summary,
      url,
      siteName: "TKoidra",
      locale: lang === "fr" ? "fr_FR" : "en_US",
      type: "article",
      publishedTime: post.date,
      authors: ["Sebastien Donne"],
      tags: [post.tag],
    },
  };
}

const ui = {
  fr: { backLabel: 'Tous les articles', readTime: 'de lecture' },
  en: { backLabel: 'All articles', readTime: 'read' },
} as const;

const mdxComponents = {
  h2: (props: ComponentPropsWithoutRef<'h2'>) => (
    <h2 className="text-xl font-bold text-slate-100 border-l-2 border-teal-500 pl-4 mt-12 mb-4 first:mt-0" {...props} />
  ),
  h3: (props: ComponentPropsWithoutRef<'h3'>) => (
    <h3 className="text-base font-bold text-slate-200 mt-8 mb-3" {...props} />
  ),
  h4: (props: ComponentPropsWithoutRef<'h4'>) => (
    <h4 className="text-sm font-semibold text-slate-300 uppercase tracking-wide mt-6 mb-2" {...props} />
  ),
  p: (props: ComponentPropsWithoutRef<'p'>) => (
    <p className="text-base leading-8 text-slate-300 mb-4" {...props} />
  ),
  ul: (props: ComponentPropsWithoutRef<'ul'>) => (
    <ul className="list-disc pl-6 space-y-1.5 text-slate-300 mb-5" {...props} />
  ),
  ol: (props: ComponentPropsWithoutRef<'ol'>) => (
    <ol className="list-decimal pl-6 space-y-1.5 text-slate-300 mb-5" {...props} />
  ),
  li: (props: ComponentPropsWithoutRef<'li'>) => (
    <li className="text-slate-300 leading-7 pl-1" {...props} />
  ),
  strong: (props: ComponentPropsWithoutRef<'strong'>) => (
    <strong className="font-semibold text-slate-100" {...props} />
  ),
  em: (props: ComponentPropsWithoutRef<'em'>) => (
    <em className="italic text-slate-400" {...props} />
  ),
  blockquote: (props: ComponentPropsWithoutRef<'blockquote'>) => (
    <blockquote
      className="border-l-4 border-amber-500/50 bg-amber-500/5 pl-5 pr-4 py-3 rounded-r-xl my-6 text-slate-400 italic"
      {...props}
    />
  ),
  table: (props: ComponentPropsWithoutRef<'table'>) => (
    <div className="overflow-x-auto my-6 rounded-xl border border-slate-800">
      <table className="w-full border-collapse text-sm" {...props} />
    </div>
  ),
  thead: (props: ComponentPropsWithoutRef<'thead'>) => (
    <thead className="bg-slate-800/80" {...props} />
  ),
  th: (props: ComponentPropsWithoutRef<'th'>) => (
    <th
      className="text-left px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-300 border-b border-slate-700"
      {...props}
    />
  ),
  td: (props: ComponentPropsWithoutRef<'td'>) => (
    <td className="px-4 py-3 text-slate-300 border-b border-slate-800 leading-6 align-top" {...props} />
  ),
  tr: (props: ComponentPropsWithoutRef<'tr'>) => (
    <tr className="even:bg-slate-900/30 hover:bg-slate-800/20 transition-colors" {...props} />
  ),
  hr: (props: ComponentPropsWithoutRef<'hr'>) => (
    <hr className="border-slate-800 my-10" {...props} />
  ),
  code: (props: ComponentPropsWithoutRef<'code'>) => (
    <code
      className="font-mono text-xs bg-slate-800 text-teal-300 px-1.5 py-0.5 rounded"
      {...props}
    />
  ),
  input: (props: ComponentPropsWithoutRef<'input'>) => (
    <input className="mr-2 accent-teal-500 cursor-default" {...props} />
  ),
};

export default async function BlogPostPage({ params }: Props) {
  const { lang, slug } = await params;
  const post = getPostBySlug(lang, slug);

  if (!post) notFound();

  const t = ui[lang as keyof typeof ui] ?? ui.fr;

  let mdContent: string | null = null;
  if (post.mdFile) {
    const filePath = path.join(process.cwd(), 'src', post.mdFile);
    mdContent = fs.readFileSync(filePath, 'utf-8');
  }

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-3xl space-y-12">

        {/* Back link */}
        <Link
          href={`/${lang}/blog`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span aria-hidden>←</span>
          {t.backLabel}
        </Link>

        {/* Article header */}
        <header className="space-y-5 border-b border-slate-800 pb-10">
          <div className="flex flex-wrap items-center gap-3">
            <span className="rounded-md border border-teal-500/40 bg-teal-500/10 px-2.5 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
              {post.tag}
            </span>
            <span className="text-xs text-slate-500">
              {new Date(post.date).toLocaleDateString(
                lang === 'fr' ? 'fr-FR' : 'en-GB',
                { year: 'numeric', month: 'long', day: 'numeric' }
              )}
            </span>
            <span className="text-xs text-slate-600">·</span>
            <span className="text-xs text-slate-500">
              {post.readTime} {t.readTime}
            </span>
          </div>

          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400 leading-tight">
            {post.title}
          </h1>

          <p className="text-lg leading-8 text-slate-400">{post.summary}</p>
        </header>

        {/* Article body */}
        {mdContent ? (
          <article className="space-y-2">
            <MDXRemote
              source={mdContent}
              options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }}
              components={mdxComponents}
            />
          </article>
        ) : (
          <article className="space-y-12">
            {post.sections.map((section) => (
              <section key={section.heading} className="space-y-4">
                <h2 className="text-xl font-bold text-slate-100 border-l-2 border-teal-500 pl-4">
                  {section.heading}
                </h2>
                <p className="text-base leading-8 text-slate-300 pl-4">
                  {section.body}
                </p>
              </section>
            ))}
          </article>
        )}

        {/* Footer nav */}
        <footer className="border-t border-slate-800 pt-8 flex items-center justify-between">
          <Link
            href={`/${lang}/blog`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
          >
            <span aria-hidden>←</span>
            {t.backLabel}
          </Link>
          <Link
            href={`/${lang}/use-cases`}
            className="text-sm text-slate-500 hover:text-slate-300 transition-colors"
          >
            {lang === 'fr' ? 'Accueil' : 'Home'}
          </Link>
        </footer>

      </div>
    </main>
  );
}
