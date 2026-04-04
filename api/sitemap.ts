import type { IncomingMessage, ServerResponse } from "node:http";
import { articles } from "../shared/articles";

const SITE_URL = "https://kriptoecer.com";

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  const now = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: `${SITE_URL}/`,    lastmod: now, changefreq: "weekly",  priority: "1.0" },
    { loc: `${SITE_URL}/blog`, lastmod: now, changefreq: "weekly",  priority: "0.9" },
  ];

  const articleUrls = articles.map((a) => ({
    loc: `${SITE_URL}/blog/${a.slug}`,
    lastmod: typeof a.publishedAt === "string"
      ? a.publishedAt.split("T")[0]
      : new Date(a.publishedAt).toISOString().split("T")[0],
    changefreq: "monthly",
    priority: "0.8",
  }));

  const allUrls = [...staticUrls, ...articleUrls];

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map((u) => `  <url>
    <loc>${u.loc}</loc>
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
