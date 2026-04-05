import type { IncomingMessage, ServerResponse } from "node:http";

const SITE_URL = "https://kriptoecer.com";
const SITE_NAME = "KriptoEcer";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;
const DEFAULT_TITLE = "KriptoEcer - Beli & Jual Crypto Eceran Mulai Rp10.000 via Telegram";
const DEFAULT_DESC =
  "KriptoEcer — bot Telegram jual beli crypto eceran mulai Rp10.000. Beli meme coin, top up fee gas TRX/SOL/BNB, atau beli USDT tanpa KYC. Deposit otomatis via QRIS, VA, PayPal.";

interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  canonical: string;
}

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
}

const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/`,
  },
  "/blog": {
    title: "Blog Crypto Indonesia — Tips, Panduan & Edukasi | KriptoEcer",
    description:
      "Panduan lengkap crypto dalam bahasa Indonesia. Tips beli crypto, cara top up fee gas SOL/TRX/BNB, edukasi blockchain, dan panduan pemula dari KriptoEcer.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/blog`,
  },
  "/terms": {
    title: "Syarat dan Ketentuan | KriptoEcer",
    description:
      "Baca syarat dan ketentuan penggunaan layanan KriptoEcer — bot Telegram jual beli cryptocurrency otomatis di Indonesia.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/terms`,
  },
  "/privacy": {
    title: "Kebijakan Privasi | KriptoEcer",
    description:
      "Kebijakan privasi KriptoEcer — bagaimana kami mengumpulkan, menggunakan, dan melindungi data pengguna layanan bot Telegram kripto kami.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/privacy`,
  },
  "/risk": {
    title: "Pengungkapan Risiko | KriptoEcer",
    description:
      "Pahami risiko jual beli crypto di KriptoEcer sebelum bertransaksi — volatilitas harga, risiko teknologi, regulasi, dan likuiditas.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/risk`,
  },
  "/refund": {
    title: "Kebijakan Refund | KriptoEcer",
    description:
      "Kebijakan pengembalian dana KriptoEcer — kondisi deposit tidak masuk, kelebihan bayar, transaksi gagal, cara klaim, dan jangka waktu pengajuan refund.",
    ogImage: DEFAULT_OG_IMAGE,
    ogType: "website",
    canonical: `${SITE_URL}/refund`,
  },
};

function buildHtml(meta: PageMeta): string {
  const t = esc(meta.title);
  const d = esc(meta.description);
  const img = esc(meta.ogImage);
  const can = esc(meta.canonical);
  const ogt = esc(meta.ogType);

  return `<!DOCTYPE html>
<html lang="id">
<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${t}</title>
<meta name="description" content="${d}" />
<meta name="robots" content="index, follow" />
<link rel="canonical" href="${can}" />
<meta property="og:type" content="${ogt}" />
<meta property="og:url" content="${can}" />
<meta property="og:site_name" content="${SITE_NAME}" />
<meta property="og:locale" content="id_ID" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:site" content="@kriptoecer" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />
<meta name="theme-color" content="#f59e0b" />
<link rel="icon" type="image/png" href="/favicon.png" />
<link rel="alternate" hreflang="id" href="${can}" />
<link rel="alternate" hreflang="x-default" href="${can}" />
</head>
<body>
<h1>${t}</h1>
<p>${d}</p>
<a href="/">KriptoEcer</a>
</body>
</html>`;
}

let articleCache: Array<{ slug: string; title: string; excerpt: string }> | null = null;

async function getArticles(): Promise<Array<{ slug: string; title: string; excerpt: string }>> {
  if (articleCache) return articleCache;
  try {
    const mod = await import("../shared/articles.js");
    articleCache = (mod.articles || []).map((a: { slug: string; title: string; excerpt: string }) => ({
      slug: a.slug,
      title: a.title,
      excerpt: a.excerpt,
    }));
    return articleCache!;
  } catch {
    try {
      const mod = await import("../shared/articles");
      articleCache = (mod.articles || []).map((a: { slug: string; title: string; excerpt: string }) => ({
        slug: a.slug,
        title: a.title,
        excerpt: a.excerpt,
      }));
      return articleCache!;
    } catch {
      return [];
    }
  }
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  try {
    const url = new URL(req.url ?? "/", `https://${req.headers.host || "kriptoecer.com"}`);
    const requestedPath = url.searchParams.get("path") ?? url.pathname;
    const clean = requestedPath.replace(/\/+$/, "") || "/";

    if (STATIC_META[clean]) {
      const html = buildHtml(STATIC_META[clean]);
      res.writeHead(200, {
        "Content-Type": "text/html; charset=utf-8",
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      });
      res.end(html);
      return;
    }

    const blogMatch = clean.match(/^\/blog\/(.+)$/);
    if (blogMatch) {
      const slug = blogMatch[1];
      const articles = await getArticles();
      const article = articles.find((a) => a.slug === slug);
      if (article) {
        const meta: PageMeta = {
          title: `${article.title} | KriptoEcer`,
          description: article.excerpt,
          ogImage: `${SITE_URL}/images/blog/${article.slug}.png`,
          ogType: "article",
          canonical: `${SITE_URL}/blog/${article.slug}`,
        };
        const html = buildHtml(meta);
        res.writeHead(200, {
          "Content-Type": "text/html; charset=utf-8",
          "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
        });
        res.end(html);
        return;
      }
    }

    res.writeHead(302, { Location: clean });
    res.end();
  } catch (err) {
    const fallbackMeta: PageMeta = {
      title: DEFAULT_TITLE,
      description: DEFAULT_DESC,
      ogImage: DEFAULT_OG_IMAGE,
      ogType: "website",
      canonical: `${SITE_URL}/`,
    };
    res.writeHead(200, {
      "Content-Type": "text/html; charset=utf-8",
      "Cache-Control": "no-cache",
    });
    res.end(buildHtml(fallbackMeta));
  }
}
