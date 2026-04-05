import type { IncomingMessage, ServerResponse } from "node:http";

const SITE_URL = "https://kriptoecer.com";

function escXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

interface UrlEntry {
  loc: string;
  lastmod: string;
  changefreq: string;
  priority: string;
}

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const now = new Date().toISOString().split("T")[0];

  const staticUrls: UrlEntry[] = [
    { loc: `${SITE_URL}/`,        lastmod: now, changefreq: "weekly",  priority: "1.0" },
    { loc: `${SITE_URL}/blog`,    lastmod: now, changefreq: "weekly",  priority: "0.9" },
    { loc: `${SITE_URL}/terms`,   lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/privacy`, lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/risk`,    lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/refund`,  lastmod: now, changefreq: "yearly",  priority: "0.3" },
  ];

  let articleUrls: UrlEntry[] = [];
  try {
    const { articles } = await import("../shared/articles.js");
    articleUrls = articles.map((a: { slug: string; publishedAt: string }) => ({
      loc: `${SITE_URL}/blog/${a.slug}`,
      lastmod: a.publishedAt.split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    }));
  } catch {
    // articles unavailable — serve sitemap with static urls only
  }

  const allUrls = [...staticUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map((u) => `  <url>
    <loc>${escXml(u.loc)}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

  res.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
  res.end(xml);
}
