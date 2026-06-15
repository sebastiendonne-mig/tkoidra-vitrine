import type { Metadata } from "next";
import { i18n } from "../../../i18n-config";
import { getDictionary } from "../../get-dictionary";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../globals.css";

export const metadata: Metadata = {
  title: "Sébastien Donné | Product Owner IA",
  description:
    "Cadrage Agile, ingénierie pragmatique et conduite du changement pour les solutions d'Intelligence Artificielle.",
};

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }));
}

type Props = {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
};

export default async function RootLayout(props: Props) {
  const { lang } = await props.params;
  const dict = await getDictionary(lang);

  const nav = (dict?.navigation ?? {
    home: "Home",
    useCases: "Case Studies",
    blog: "Deep Dives",
  }) as { home: string; useCases: string; blog: string };

  return (
    <html lang={lang} className="scroll-smooth">
      <body className="flex min-h-screen flex-col bg-slate-950 text-slate-100 antialiased">
        <Navbar lang={lang} nav={nav} />
        {/* pt-16 clears the fixed navbar on desktop; mobile strip adds ~32px via the secondary row */}
        <div className="flex flex-1 flex-col pt-16 sm:pt-16">
          {props.children}
        </div>
        <Footer lang={lang} nav={nav} />
      </body>
    </html>
  );
}
