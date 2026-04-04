import type { IncomingMessage, ServerResponse } from "node:http";
import { articles } from "../../shared/articles";

export default function handler(_req: IncomingMessage, res: ServerResponse) {
  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify(articles));
}
