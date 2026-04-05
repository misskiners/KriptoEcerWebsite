import type { IncomingMessage, ServerResponse } from "node:http";
import { resolvePageMeta, buildBotHtml } from "../shared/seo-meta";
import { articles } from "../shared/articles";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = new URL(req.url ?? "/", `https://${req.headers.host || "kriptoecer.com"}`);
    const requestedPath = url.searchParams.get("path") ?? url.pathname;
    const clean = requestedPath.replace(/\/+$/, "") || "/";

    const meta = resolvePageMeta(clean, (slug: string) =>
      articles.find((a) => a.slug === slug),
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
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    res.writeHead(500, { "Content-Type": "text/plain" });
    res.end(`render error: ${msg}`);
  }
}
