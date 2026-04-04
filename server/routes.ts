import type { Express } from "express";
import { createServer, type Server } from "http";
import { articles } from "../shared/articles";

const SITE_URL = "https://kriptoecer.com";

/* ── CoinGecko price cache (server-side proxy to avoid CORS) ── */
const ALL_COIN_IDS = [
  "bitcoin", "ethereum", "solana", "binancecoin", "tether",
  "usd-coin", "tron", "litecoin", "dogecoin", "the-open-network",
].join(",");

interface PriceCache {
  data: Record<string, { idr: number; idr_24h_change: number }> | null;
  fetchedAt: number;
}
const priceCache: PriceCache = { data: null, fetchedAt: 0 };
const CACHE_TTL_MS = 60_000;

async function fetchFromCoinGecko(): Promise<PriceCache["data"]> {
  const url =
    `https://api.coingecko.com/api/v3/simple/price` +
    `?ids=${ALL_COIN_IDS}&vs_currencies=idr&include_24hr_change=true`;
  const res = await fetch(url, {
    headers: { Accept: "application/json" },
    signal: AbortSignal.timeout(8_000),
  });
  if (!res.ok) throw new Error(`CoinGecko ${res.status}`);
  return res.json() as Promise<PriceCache["data"]>;
}

async function getPrices(): Promise<PriceCache["data"]> {
  const now = Date.now();
  if (priceCache.data && now - priceCache.fetchedAt < CACHE_TTL_MS) {
    return priceCache.data;
  }
  try {
    const fresh = await fetchFromCoinGecko();
    priceCache.data = fresh;
    priceCache.fetchedAt = now;
    return fresh;
  } catch {
    return priceCache.data;
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  /* ── Price proxy — all components use this ── */
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
    const now = new Date().toISOString().split("T")[0];

    const staticUrls = [
      { loc: `${SITE_URL}/`,    lastmod: now, changefreq: "weekly",  priority: "1.0" },
      { loc: `${SITE_URL}/blog`, lastmod: now, changefreq: "weekly",  priority: "0.9" },
    ];

    const articleUrls = articles.map((a) => ({
      loc: `${SITE_URL}/blog/${a.slug}`,
      lastmod: typeof a.publishedAt === "string"
        ? a.publishedAt.split("T")[0]
        : new Date(a.publishedAt).toISOString().split("T")[0],
      changefreq: "monthly",
      priority: "0.8",
    }));

    const allUrls = [...staticUrls, ...articleUrls];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
          http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
${allUrls.map((u) => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${u.lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join("\n")}
</urlset>`;

    res.set("Content-Type", "application/xml; charset=utf-8");
    res.set("Cache-Control", "public, max-age=3600");
    res.send(xml);
  });

  return httpServer;
}
