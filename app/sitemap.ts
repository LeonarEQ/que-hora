import type { MetadataRoute } from "next";

import {
  absoluteUrl,
  homeAlternates,
  homePath,
  legalAlternates,
  legalPages,
  locales,
} from "./seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const homeEntries = locales.map((locale) => ({
    url: absoluteUrl(homePath(locale)),
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 1,
    alternates: {
      languages: homeAlternates(),
    },
  }));

  const legalEntries = Object.entries(legalPages).flatMap(([key, page]) =>
    locales.map((locale) => ({
      url: absoluteUrl(page.paths[locale]),
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.5,
      alternates: {
        languages: legalAlternates(key as keyof typeof legalPages),
      },
    })),
  );

  return [...homeEntries, ...legalEntries];
}
