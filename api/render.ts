import type { IncomingMessage, ServerResponse } from "node:http";
import type { PageMeta } from "../shared/seo-meta";

const SITE_URL = "https://kriptoecer.com";

function escHtml(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

async function resolvePageMeta(urlPath: string): Promise<PageMeta | null> {
  const { resolvePageMeta: resolve } = await import("../shared/seo-meta");
  const { articles } = await import("../shared/articles");
  return resolve(urlPath, (slug: string) =>
    articles.find((a: { slug: string }) => a.slug === slug),
  );
}

function buildHtml(meta: PageMeta): string {
  const t = escHtml(meta.title);
  const d = escHtml(meta.description);
  const img = escHtml(meta.ogImage);
  const can = escHtml(meta.canonical);
  const ogt = escHtml(meta.ogType);

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t}</title>
<meta name="description" content="${d}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${can}" />
<meta property="og:type" content="${ogt}" />
<meta property="og:url" content="${can}" />
<meta property="og:site_name" content="KriptoEcer" />
<meta property="og:locale" content="id_ID" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@kriptoecer" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />
<meta name="theme-color" content="#f59e0b" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="alternate" hreflang="id" href="${can}" />
<link rel="alternate" hreflang="x-default" href="${can}" />
</head>
<body>
<h1>${t}</h1>
<p>${d}</p>
<a href="/">KriptoEcer</a>
</body>
</html>`;
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const url = new URL(req.url ?? "/", `https://${req.headers.host || "kriptoecer.com"}`);
  const requestedPath = url.searchParams.get("path") ?? url.pathname;
  const clean = requestedPath.replace(/\/+$/, "") || "/";

  const meta = await resolvePageMeta(clean);

  if (!meta) {
    res.writeHead(302, { Location: clean });
    res.end();
    return;
  }

  const html = buildHtml(meta);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  });
  res.end(html);
}
