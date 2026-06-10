// F-19: robots.ts — Prevent search engines from indexing sensitive routes
// (admin panel, photographer dashboard, API endpoints)
// Allow all public-facing landing pages to be indexed.
import type { MetadataRoute } from "next";

const baseUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "https://stopme.in");

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/pricing", "/contact", "/inquire"],
        disallow: ["/admin/", "/dashboard/", "/api/", "/event/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
