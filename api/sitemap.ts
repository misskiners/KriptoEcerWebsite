import type { IncomingMessage, ServerResponse } from "node:http";
import { generateSitemapXml } from "../shared/sitemap";

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  const xml = generateSitemapXml();
  res.writeHead(200, {
    "Content-Type": "application/xml; charset=utf-8",
    "Cache-Control": "public, max-age=3600",
  });
  res.end(xml);
}
