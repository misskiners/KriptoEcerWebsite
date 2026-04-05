import type { Express } from "express";
import type { Server } from "http";
import { articles } from "../shared/articles";
import { getPrices } from "../shared/prices";
import { generateSitemapXml } from "../shared/sitemap";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/prices", async (_req, res) => {
    try {
      const data = await getPrices();
      if (!data) return res.status(503).json({ error: "prices unavailable" });
      res.set("Cache-Control", "public, max-age=30");
      res.json(data);
    } catch {
      res.status(503).json({ error: "prices unavailable" });
    }
  });

  app.get("/api/articles", (_req, res) => {
    res.json(articles);
  });

  app.get("/api/articles/:slug", (req, res) => {
    const article = articles.find((a) => a.slug === req.params.slug);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  });

  app.get("/sitemap.xml", (_req, res) => {
    try {
      const xml = generateSitemapXml();
      res.set("Content-Type", "application/xml; charset=utf-8");
      res.set("Cache-Control", "public, max-age=3600");
      res.send(xml);
    } catch {
      res.status(500).json({ error: "sitemap generation failed" });
    }
  });

  return httpServer;
}
