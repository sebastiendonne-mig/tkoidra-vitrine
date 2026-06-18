import type { MetadataRoute } from "next";
import { getAllSlugs } from "../lib/blog-posts";

const BASE = "https://tkoidra.com";
const locales = ["fr", "en"] as const;
const blogSlugs = getAllSlugs();
const now = new Date();

function bilingual(
  path: string,
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"],
  priority: number
): MetadataRoute.Sitemap {
  return locales.map((lang) => ({
    url: `${BASE}/${lang}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
    alternates: {
      languages: {
        fr: `${BASE}/fr${path}`,
        en: `${BASE}/en${path}`,
      },
    },
  }));
}

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    ...bilingual("/use-cases", "weekly", 1.0),
    ...bilingual("/blog", "weekly", 0.8),
    ...blogSlugs.flatMap((slug) =>
      bilingual(`/blog/${slug}`, "yearly", 0.7)
    ),
    ...bilingual("/profil", "yearly", 0.6),
    ...bilingual("/methodologie-diag", "yearly", 0.6),
    ...bilingual("/legal", "yearly", 0.3),
  ];
}
