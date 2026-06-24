import type { MetadataRoute } from "next";

import { siteUrl } from "./seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/_next/", "/assets/"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
