import { articles } from "./articles";
import { SITE_URL } from "./seo-meta";

function escXml(s: string) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function generateSitemapXml(): string {
  const now = new Date().toISOString().split("T")[0];

  const staticUrls = [
    { loc: `${SITE_URL}/`,        lastmod: now, changefreq: "weekly",  priority: "1.0" },
    { loc: `${SITE_URL}/blog`,    lastmod: now, changefreq: "weekly",  priority: "0.9" },
    { loc: `${SITE_URL}/terms`,   lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/privacy`, lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/risk`,    lastmod: now, changefreq: "yearly",  priority: "0.3" },
    { loc: `${SITE_URL}/refund`,  lastmod: now, changefreq: "yearly",  priority: "0.3" },
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

  return `<?xml version="1.0" encoding="UTF-8"?>
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
}
