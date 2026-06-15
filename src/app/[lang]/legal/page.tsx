import type { Metadata } from "next";
import { i18n } from "../../../../i18n-config";
import Link from "next/link";

type Props = {
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  const url = `https://tkoidra.com/${lang}/legal`;
  return {
    title: isFr ? "Mentions légales | TKoidra" : "Legal Notice | TKoidra",
    description: isFr
      ? "Mentions légales et politique de confidentialité du site tkoidra.com."
      : "Legal notice and privacy policy for tkoidra.com.",
    alternates: {
      canonical: url,
      languages: {
        fr: "https://tkoidra.com/fr/legal",
        en: "https://tkoidra.com/en/legal",
      },
    },
  };
}

const content = {
  fr: {
    badge: "Légal",
    title: "Mentions légales",
    lastUpdated: "Dernière mise à jour : juin 2026",
    backLabel: "Retour",
    sections: [
      {
        heading: "Éditeur du site",
        items: [
          "Dénomination : TKoidra",
          "Responsable de publication : Sébastien Donné, Product Owner IA indépendant.",
          "SIREN : 105948640",
          "Contact : sebastiendonne@gmail.com",
          "Site web : https://tkoidra.com",
        ],
      },
      {
        heading: "Hébergeur",
        items: [
          "Vercel Inc.",
          "440 N Barranca Ave #4133, Covina, CA 91723, États-Unis",
          "Site web : https://vercel.com",
        ],
      },
      {
        heading: "Propriété intellectuelle",
        items: [
          "L'ensemble du contenu publié sur ce site (textes, analyses, études de cas, structure) est la propriété exclusive de Sébastien Donné, sauf mention contraire.",
          "Toute reproduction, représentation, modification ou diffusion, totale ou partielle, par quelque procédé que ce soit, est interdite sans autorisation écrite préalable.",
        ],
      },
      {
        heading: "Données personnelles — RGPD",
        items: [
          "Ce site ne collecte aucune donnée personnelle directement.",
          "Les serveurs de Vercel Inc. enregistrent automatiquement les adresses IP des visiteurs dans des journaux d'accès à des fins techniques de sécurité et de performance. Ces données sont gérées conformément à la politique de confidentialité de Vercel (https://vercel.com/legal/privacy-policy).",
          "Aucun cookie de traçage, outil d'analyse tiers (Google Analytics, Matomo, etc.) ni pixel publicitaire n'est déployé sur ce site.",
          "Si vous prenez contact par e-mail, vos données (prénom, adresse e-mail, contenu du message) sont utilisées exclusivement pour répondre à votre demande et ne sont transmises à aucun tiers.",
          "Conformément au Règlement Général sur la Protection des Données (RGPD — UE 2016/679) et à la loi Informatique et Libertés, vous disposez d'un droit d'accès, de rectification, d'effacement et de portabilité de vos données. Pour l'exercer : sebastiendonne@gmail.com",
        ],
      },
      {
        heading: "Cookies",
        items: [
          "Ce site n'utilise aucun cookie de suivi, de profilage ou publicitaire.",
          "Un cookie de session technique peut être déposé par l'infrastructure Vercel pour assurer le bon fonctionnement du site. Il ne contient aucune donnée personnelle identifiable.",
        ],
      },
      {
        heading: "Loi applicable",
        items: [
          "Le présent site et ses mentions légales sont soumis au droit français.",
          "En cas de litige, les tribunaux compétents seront ceux du ressort de [Ville — À compléter].",
        ],
      },
    ],
  },
  en: {
    badge: "Legal",
    title: "Legal Notice",
    lastUpdated: "Last updated: June 2026",
    backLabel: "Back",
    sections: [
      {
        heading: "Site Publisher",
        items: [
          "Trade name: TKoidra",
          "Site editor: Sébastien Donné, independent AI Product Owner.",
          "Registration number (SIREN): 105948640",
          "Contact: sebastiendonne@gmail.com",
          "Website: https://tkoidra.com",
        ],
      },
      {
        heading: "Hosting Provider",
        items: [
          "Vercel Inc.",
          "440 N Barranca Ave #4133, Covina, CA 91723, United States",
          "Website: https://vercel.com",
        ],
      },
      {
        heading: "Intellectual Property",
        items: [
          "All content published on this site (texts, analyses, case studies, structure) is the exclusive property of Sébastien Donné, unless otherwise stated.",
          "Any reproduction, representation, modification or distribution, in whole or in part, by any means, is prohibited without prior written permission.",
        ],
      },
      {
        heading: "Personal Data — GDPR",
        items: [
          "This site does not directly collect any personal data.",
          "Vercel Inc. servers automatically log visitor IP addresses in access logs for technical security and performance purposes. This data is handled in accordance with Vercel's privacy policy (https://vercel.com/legal/privacy-policy).",
          "No tracking cookies, third-party analytics tools (Google Analytics, Matomo, etc.) or advertising pixels are used on this site.",
          "If you contact us by email, your data (name, email address, message content) is used solely to respond to your request and is not shared with any third party.",
          "Under the General Data Protection Regulation (GDPR — EU Regulation 2016/679), you have the right to access, rectify, erase and port your personal data. To exercise this right: sebastiendonne@gmail.com",
        ],
      },
      {
        heading: "Cookies",
        items: [
          "This site uses no tracking, profiling or advertising cookies.",
          "A technical session cookie may be set by the Vercel infrastructure to ensure proper site operation. It contains no personally identifiable information.",
        ],
      },
      {
        heading: "Applicable Law",
        items: [
          "This site and its legal notices are governed by French law.",
          "In the event of a dispute, the competent courts will be those of [City — To be completed].",
        ],
      },
    ],
  },
} as const;

export default async function LegalPage({ params }: Props) {
  const { lang } = await params;
  const locale = (lang in content ? lang : "fr") as keyof typeof content;
  const t = content[locale];

  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-950 text-white font-sans px-6 py-24">
      <div className="w-full max-w-2xl space-y-12">

        {/* Back link */}
        <Link
          href={`/${lang}/use-cases`}
          className="inline-flex items-center gap-2 text-sm font-semibold text-teal-400 hover:text-teal-300 transition-colors"
        >
          <span aria-hidden>&#8592;</span>
          {t.backLabel}
        </Link>

        {/* Header */}
        <header className="flex flex-col items-start gap-4 border-b border-slate-800 pb-10">
          <span className="rounded-full border border-teal-500/40 bg-teal-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-teal-400">
            {t.badge}
          </span>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-slate-100 via-slate-200 to-slate-400">
            {t.title}
          </h1>
          <p className="text-xs text-slate-600">{t.lastUpdated}</p>
        </header>

        {/* Sections */}
        <div className="space-y-10">
          {t.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="text-xs font-bold uppercase tracking-widest text-teal-400 border-b border-slate-800 pb-3">
                {section.heading}
              </h2>
              <ul className="space-y-3">
                {section.items.map((item, i) => (
                  <li key={i} className="text-sm leading-7 text-slate-400">
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

      </div>
    </main>
  );
}
