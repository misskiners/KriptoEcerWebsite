export const SITE_URL = "https://kriptoecer.com";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export interface PageMeta {
  title: string;
  description: string;
  ogImage: string;
  ogType: string;
  canonical: string;
}

export const STATIC_META: Record<string, PageMeta> = {
  "/": {
    title: "KriptoEcer - Beli & Jual Crypto Eceran Mulai Rp10.000 via Telegram",
    description:
      "KriptoEcer — bot Telegram jual beli crypto eceran mulai Rp10.000. Beli meme coin, top up fee gas TRX/SOL/BNB, atau beli USDT tanpa KYC. Deposit otomatis via QRIS, VA, PayPal.",
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

export function resolvePageMeta(
  urlPath: string,
  articleLookup?: (slug: string) => { title: string; excerpt: string; slug: string } | undefined,
): PageMeta | null {
  const clean = urlPath.split("?")[0].replace(/\/+$/, "") || "/";

  if (STATIC_META[clean]) return STATIC_META[clean];

  const blogMatch = clean.match(/^\/blog\/(.+)$/);
  if (blogMatch && articleLookup) {
    const slug = blogMatch[1];
    const article = articleLookup(slug);
    if (article) {
      return {
        title: `${article.title} | KriptoEcer`,
        description: article.excerpt,
        ogImage: `${SITE_URL}/images/blog/${article.slug}.png`,
        ogType: "article",
        canonical: `${SITE_URL}/blog/${article.slug}`,
      };
    }
  }

  return null;
}
