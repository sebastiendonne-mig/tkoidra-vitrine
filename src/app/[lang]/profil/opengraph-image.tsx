import { i18n } from "../../../../i18n-config";
import {
  renderOgImage,
  ogImageSize,
  ogImageContentType,
} from "../../../lib/og-image";

export const size = ogImageSize;
export const contentType = ogImageContentType;

export async function generateStaticParams() {
  return i18n.locales.map((lang) => ({ lang }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isFr = lang === "fr";
  return renderOgImage(isFr ? "Product Owner IA" : "AI Product Owner");
}
