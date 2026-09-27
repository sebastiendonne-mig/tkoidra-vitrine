import { i18n } from "../../../../i18n-config";
import { getDictionary } from "../../../get-dictionary";
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
  const dict = await getDictionary(lang);
  const ogTitle = (dict.methode as { metadata: { ogTitle: string } }).metadata.ogTitle;
  return renderOgImage(ogTitle);
}
