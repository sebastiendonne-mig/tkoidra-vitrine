import type { Metadata } from "next";
import { i18n } from "../../../i18n-config";
import { getDictionary } from "../../get-dictionary";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import { AnalyticsOptOut } from "../../components/AnalyticsOptOut";
import { SITE_URL } from "../../lib/site";
import "../globals.css";

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const isFr = lang === "fr";
  return {
    metadataBase: new URL(SITE_URL),
    title: isFr
      ? "Sébastien Donné | Product Owner IA"
      : "Sébastien Donné | AI Product Owner",
    description: isFr
      ? "Cadrage Agile, ingénierie pragmatique et conduite du changement pour les solutions d'Intelligence Artificielle."
      : "Agile framing, pragmatic engineering, and change management for Artificial Intelligence solutions.",
  };
}

export default async function RootLayout(props: Props) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);
  const isFr = lang === "fr";

  const nav = (dict?.navigation ?? {
    home: "Home",
    useCases: "Case Studies",
    blog: "Deep Dives",
  }) as { home: string; useCases: string; blog: string };

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Sébastien Donné",
    jobTitle: isFr ? "Product Owner IA" : "AI Product Owner",
    url: `${SITE_URL}/${lang}`,
    worksFor: {
      "@type": "Organization",
      name: "TKoidra",
      url: SITE_URL,
    },
    sameAs: [
      "https://www.linkedin.com/in/sebastiendonne/",
      "https://www.collective.work/profile/sebastien-donne",
    ],
  };

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-slate-950 text-slate-100 antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <Navbar lang={lang} nav={nav} />
        {/* pt-16 clears the fixed navbar on desktop; mobile strip adds ~32px via the secondary row */}
        <div className="flex flex-1 flex-col pt-16 sm:pt-16">
          {props.children}
        </div>
        <Footer lang={lang} nav={nav} />
        <AnalyticsOptOut />
      </body>
    </html>
  );
}
