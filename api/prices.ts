import type { IncomingMessage, ServerResponse } from "node:http";
import { getPrices } from "../shared/prices";

export default async function handler(_req: IncomingMessage, res: ServerResponse) {
  try {
    const data = await getPrices();
    if (!data) {
      res.writeHead(503, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ error: "prices unavailable" }));
      return;
    }
    res.writeHead(200, {
      "Content-Type": "application/json",
      "Cache-Control": "public, max-age=30",
    });
    res.end(JSON.stringify(data));
  } catch {
    res.writeHead(503, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ error: "prices unavailable" }));
  }
}
