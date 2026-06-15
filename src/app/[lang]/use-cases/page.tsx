import { getDictionary } from '../../../get-dictionary';
import { i18n } from '../../../../i18n-config';
import Link from 'next/link';

interface Project {
  title: string;
  description: string;
  tag: string;
}

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function UseCasesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const useCases = dict?.useCases;
  const projects = useCases?.projects
    ? (Object.entries(useCases.projects) as [string, Project][])
    : [];

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-5xl space-y-16">

        {/* Page header */}
        <header className="flex flex-col items-start gap-8">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {useCases?.title ?? 'Cas d\'Usage'}
          </span>
          <p className="text-lg leading-7 text-slate-400">
            {useCases?.subtitle}
          </p>
        </header>

        {/* Project grid */}
        <section>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map(([slug, project]) => (
              <Link
                key={slug}
                href={`/${lang}/use-cases/${slug}`}
                className="group relative flex flex-col rounded-2xl border border-slate-800 bg-slate-900/40 p-7 backdrop-blur-sm transition-all hover:border-teal-500/40 hover:bg-slate-900/70 hover:shadow-lg hover:shadow-teal-900/10"
              >
                <span className="inline-block rounded-md border border-slate-700 bg-slate-800/60 px-2.5 py-1 text-xs font-semibold text-slate-300">
                  {project.tag}
                </span>
                <h2 className="mt-4 text-xl font-bold text-slate-100 group-hover:text-teal-300 transition-colors">
                  {project.title}
                </h2>
                <p className="mt-3 text-sm leading-6 text-slate-400">
                  {project.description}
                </p>
              </Link>
            ))}
          </div>
        </section>

      </div>
    </main>
  );
}
