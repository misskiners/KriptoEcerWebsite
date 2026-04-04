import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { articles } from "./data/articles";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get("/api/articles", (_req, res) => {
    res.json(articles);
  });

  app.get("/api/articles/:slug", (req, res) => {
    const article = articles.find((a) => a.slug === req.params.slug);
    if (!article) return res.status(404).json({ message: "Article not found" });
    res.json(article);
  });

  return httpServer;
}
