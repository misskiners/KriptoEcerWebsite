import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const { resolvePageMeta, buildBotHtml } = await import("../shared/seo-meta");
  const { articles } = await import("../shared/articles");

  const url = new URL(req.url ?? "/", `https://${req.headers.host || "kriptoecer.com"}`);
  const requestedPath = url.searchParams.get("path") ?? url.pathname;
  const clean = requestedPath.replace(/\/+$/, "") || "/";

  const meta = resolvePageMeta(clean, (slug: string) =>
    articles.find((a: { slug: string }) => a.slug === slug),
  );

  if (!meta) {
    res.writeHead(302, { Location: clean });
    res.end();
    return;
  }

  const html = buildBotHtml(meta);
  res.writeHead(200, {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
  });
  res.end(html);
}
