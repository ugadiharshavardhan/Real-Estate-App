import { SITE_CONFIG } from "@/lib/seo-config";

export default function robots() {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/admin",
          "/sign-in",
          "/sign-up",
          "/api",
          "/_next",
          "/static",
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
