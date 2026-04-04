import type { IncomingMessage, ServerResponse } from "node:http";
import { articles } from "../../shared/articles";

export default function handler(req: IncomingMessage, res: ServerResponse) {
  const parts = (req.url ?? "").split("?")[0].split("/").filter(Boolean);
  const slug = parts[parts.length - 1];

  const article = articles.find((a) => a.slug === slug);
  if (!article) {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Article not found" }));
    return;
  }
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(article));
}
