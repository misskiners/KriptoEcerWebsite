import type { IncomingMessage, ServerResponse } from "node:http";

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  const { generateSitemapXml } = await import("../shared/sitemap");
  const xml = generateSitemapXml();

  res.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
  res.end(xml);
}
