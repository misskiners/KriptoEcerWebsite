import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { db } from "./db";
import { articles, insertArticleSchema } from "@shared/schema";
import { eq, desc } from "drizzle-orm";

const SEED_ARTICLES = [
  {
    title: "Cara Top Up Fee Gas SOL, TRX, dan BNB Mulai Rp10.000",
    slug: "cara-top-up-fee-gas-sol-trx-bnb",
    excerpt: "Butuh SOL untuk transaksi di Solana atau TRX untuk jaringan Tron tapi bingung beli berapa? Ini panduan lengkap top up fee gas crypto dengan modal kecil langsung dari Telegram.",
    category: "Panduan",
    coverGradient: "from-purple-500/20 to-primary/5",
    readTime: 4,
    content: `Fee gas adalah biaya kecil yang harus dibayar setiap kali kamu melakukan transaksi di jaringan blockchain. Tanpa fee gas, transaksimu tidak akan diproses oleh jaringan.

Setiap jaringan blockchain punya token yang dipakai untuk fee gas. SOL dipakai di Solana, TRX dipakai di jaringan Tron, BNB dipakai di BNB Smart Chain, dan ETH dipakai di Ethereum.

Masalahnya, exchange besar biasanya punya minimal deposit yang cukup tinggi — tidak cocok kalau kamu cuma butuh sedikit SOL atau TRX untuk bayar fee gas.

Di sinilah KriptoEcer hadir. Kamu bisa beli crypto mulai Rp10.000 saja, langsung dari bot Telegram @kriptoecerbot, tanpa perlu verifikasi KYC atau buka akun di exchange manapun.

Langkah-langkahnya sangat mudah. Pertama, buka Telegram dan cari @kriptoecerbot. Ketik /start untuk memulai, lalu pilih menu beli crypto. Pilih jaringan yang kamu butuhkan — misalnya SOL untuk Solana. Masukkan nominal dalam Rupiah, misalnya Rp15.000. Lakukan pembayaran via QRIS atau Virtual Account, dan SOL langsung dikirim ke wallet tujuanmu secara otomatis.

Tidak perlu tunggu konfirmasi manual dari admin. Sistem berjalan 24 jam penuh, termasuk hari Minggu dan hari libur nasional.

Tips penting: untuk Solana, disarankan punya minimal 0.01 SOL sebagai fee gas cadangan. Untuk Tron (TRX), minimal 15-20 TRX biasanya cukup untuk beberapa transaksi. Untuk BNB Chain, 0.002-0.005 BNB sudah cukup untuk banyak transaksi.`,
  },
  {
    title: "Apa Itu Meme Coin dan Bagaimana Cara Belinya di Indonesia?",
    slug: "apa-itu-meme-coin-cara-beli-indonesia",
    excerpt: "Meme coin lagi viral? Pelajari apa itu meme coin, risiko dan potensinya, serta cara beli dengan mudah dari Indonesia tanpa KYC dan tanpa modal besar.",
    category: "Edukasi",
    coverGradient: "from-amber-500/20 to-orange-500/5",
    readTime: 5,
    content: `Meme coin adalah cryptocurrency yang awalnya dibuat sebagai lelucon atau berdasarkan tren internet populer. Dogecoin (DOGE) adalah yang pertama, diciptakan pada 2013 berdasarkan meme anjing Shiba Inu yang viral saat itu.

Setelah Dogecoin, ratusan bahkan ribuan meme coin bermunculan. Shiba Inu (SHIB), Pepe (PEPE), Bonk (BONK), dan masih banyak lagi. Beberapa mencapai kenaikan harga yang fantastis dalam waktu singkat, tapi banyak juga yang nilainya jatuh ke nol.

Kenapa orang beli meme coin? Ada beberapa alasan. Pertama, potensi keuntungan yang sangat besar dalam waktu singkat — meski ini juga berarti risiko kerugian yang sama besarnya. Kedua, harganya sangat murah sehingga terjangkau untuk dicoba dengan modal kecil. Ketiga, faktor komunitas dan tren media sosial yang membuat harga bisa melonjak tiba-tiba.

Yang perlu dipahami: meme coin adalah aset spekulatif tingkat tinggi. Nilainya bisa naik 1000% dalam sehari, tapi juga bisa turun 90% dengan cepat. Jangan pernah investasi uang yang tidak siap kamu kehilangan.

Untuk beli meme coin di Indonesia, kamu bisa menggunakan KriptoEcer. Cukup buka @kriptoecerbot di Telegram, pilih menu beli, dan pilih meme coin yang tersedia. Dengan modal mulai Rp10.000 saja, kamu sudah bisa mencoba tanpa harus buka akun di exchange besar.

Strategi yang bijak untuk meme coin: gunakan dana kecil yang memang siap kamu riskkan, jangan FOMO ketika harga sudah naik tinggi, dan selalu simpan di wallet yang kamu kendalikan sendiri.`,
  },
  {
    title: "QRIS untuk Beli Crypto: Cara Tercepat Deposit di KriptoEcer",
    slug: "qris-untuk-beli-crypto-kriptoecer",
    excerpt: "QRIS jadi metode deposit paling populer di KriptoEcer karena cepat dan didukung semua e-wallet. Ini panduan lengkap cara pakainya dan kenapa lebih nyaman dari transfer bank biasa.",
    category: "Tips",
    coverGradient: "from-blue-500/20 to-cyan-500/5",
    readTime: 3,
    content: `QRIS (Quick Response Code Indonesian Standard) adalah standar kode QR untuk pembayaran di Indonesia yang diatur Bank Indonesia. Dengan QRIS, kamu bisa bayar dari GoPay, OVO, Dana, ShopeePay, dan rekening bank manapun hanya dengan satu kode QR.

Di KriptoEcer, QRIS adalah metode deposit yang paling banyak dipakai karena prosesnya sangat cepat dan mudah. Konfirmasi pembayaran berjalan otomatis — tidak perlu chat admin atau upload bukti transfer.

Cara deposit via QRIS di KriptoEcer sangat simpel. Buka @kriptoecerbot di Telegram, pilih menu deposit, pilih QRIS sebagai metode pembayaran, masukkan jumlah yang ingin kamu depositkan (minimal Rp10.000), dan scan QR code yang muncul menggunakan aplikasi e-wallet atau m-banking kamu.

Dalam hitungan detik setelah pembayaran, saldo kamu otomatis aktif dan kamu langsung bisa beli crypto. Tidak perlu tunggu verifikasi manual.

Keunggulan QRIS dibandingkan transfer bank biasa adalah kecepatan konfirmasinya. Transfer bank bisa memakan waktu 1-5 menit bahkan lebih, sementara QRIS biasanya terkonfirmasi dalam 3-10 detik.

Kelebihan lain QRIS adalah tidak ada biaya tambahan dari sisi KriptoEcer. Kamu cukup membayar sesuai nominal yang kamu masukkan, tanpa biaya admin tersembunyi.

Tips: pastikan saldo e-wallet atau rekening kamu cukup sebelum scan QR, karena QR code QRIS biasanya punya batas waktu berlaku sekitar 15 menit.`,
  },
  {
    title: "5 Istilah Crypto yang Wajib Dipahami Pemula Indonesia",
    slug: "5-istilah-crypto-wajib-dipahami-pemula",
    excerpt: "Bingung dengan istilah HODL, gas fee, wallet, on-chain, atau seed phrase? Panduan singkat dan mudah untuk pemula yang baru pertama kali masuk ke dunia crypto.",
    category: "Edukasi",
    coverGradient: "from-green-500/20 to-emerald-500/5",
    readTime: 6,
    content: `Dunia crypto punya banyak istilah teknis yang sering bikin pemula bingung. Berikut 5 istilah paling penting yang perlu kamu pahami sebelum mulai transaksi.

Pertama: Wallet (Dompet Crypto). Wallet adalah tempat menyimpan aset crypto kamu. Berbeda dengan dompet fisik, wallet crypto sebenarnya menyimpan kunci akses (private key) yang membuktikan kepemilikan asetmu di blockchain. Ada dua jenis — hot wallet yang terhubung internet (seperti MetaMask) dan cold wallet yang offline (seperti Ledger). Untuk pemula, hot wallet sudah cukup untuk kebutuhan sehari-hari.

Kedua: Gas Fee. Gas fee adalah biaya yang dibayarkan ke jaringan blockchain setiap kali kamu melakukan transaksi. Ini bukan biaya untuk platform atau exchange, tapi biaya untuk para validator yang memproses transaksimu. Besarnya gas fee tergantung pada seberapa padat jaringan saat itu. Solana dan BNB Chain biasanya jauh lebih murah dibandingkan Ethereum.

Ketiga: HODL. Berasal dari typo kata "hold" yang viral di forum crypto tahun 2013. Sekarang HODL menjadi singkatan dari "Hold On for Dear Life" — strategi menyimpan crypto jangka panjang apapun kondisi pasar, tanpa panik jual saat harga turun.

Keempat: On-chain dan Off-chain. Transaksi on-chain adalah transaksi yang dicatat langsung di blockchain dan bisa diverifikasi publik. Off-chain adalah transaksi yang terjadi di luar blockchain, seperti transfer antar akun di exchange terpusat. Di KriptoEcer, semua transaksi pengiriman crypto dilakukan on-chain sehingga bisa dicek transparansinya.

Kelima: Seed Phrase (Recovery Phrase). Ini adalah 12 atau 24 kata acak yang menjadi kunci utama wallet kamu. Siapapun yang tahu seed phrase-mu bisa mengakses dan mengambil semua asetmu. Simpan di tempat yang aman, jangan pernah difoto atau disimpan digital, dan jangan pernah bagikan ke siapapun — termasuk tim support platform manapun.`,
  },
  {
    title: "KriptoEcer vs Exchange Besar: Kapan Harus Pakai yang Mana?",
    slug: "kriptoecer-vs-exchange-besar-perbandingan",
    excerpt: "KriptoEcer dan exchange seperti Indodax atau Tokocrypto punya keunggulan masing-masing. Ini panduan jujur kapan sebaiknya pakai yang mana sesuai kebutuhanmu.",
    category: "Tips",
    coverGradient: "from-primary/20 to-yellow-500/5",
    readTime: 4,
    content: `Banyak yang bertanya: kenapa pakai KriptoEcer kalau sudah ada exchange besar seperti Indodax, Tokocrypto, atau Pintu? Jawabannya: keduanya punya kegunaan berbeda, dan idealnya kamu tahu kapan harus pakai yang mana.

KriptoEcer paling cocok untuk beberapa situasi. Pertama, ketika kamu butuh crypto dalam jumlah kecil dengan cepat — misalnya top up fee gas SOL atau TRX, beli meme coin baru, atau coba aset baru dengan modal Rp10.000-50.000. Kedua, ketika kamu tidak mau ribet verifikasi KYC — di KriptoEcer tidak ada upload KTP atau selfie. Ketiga, ketika kamu butuh 24/7 tanpa antri layanan manusia karena semua proses berjalan otomatis via bot Telegram.

Exchange besar lebih cocok untuk situasi lain. Jika kamu ingin investasi jangka panjang dalam jumlah besar — ratusan ribu hingga jutaan rupiah — exchange reguler dengan sistem order book lebih tepat. Jika kamu butuh fitur trading seperti limit order, stop loss, atau margin, exchange besar menyediakan ini. Jika kamu mau menyimpan IDR (Rupiah) di platform dan beli crypto sewaktu-waktu, exchange besar punya fitur ini.

Kesimpulannya, keduanya bisa saling melengkapi. Pakai KriptoEcer untuk kebutuhan cepat, eceran, dan tanpa ribet. Pakai exchange besar untuk trading serius atau investasi skala lebih besar.

Yang paling penting adalah selalu gunakan platform yang sesuai kebutuhanmu saat itu, dan pastikan kamu memahami biaya yang berlaku di masing-masing platform sebelum transaksi.`,
  },
];

async function seedArticlesIfEmpty() {
  try {
    const existing = await db.select().from(articles).limit(1);
    if (existing.length === 0) {
      await db.insert(articles).values(SEED_ARTICLES);
      console.log("[seed] Articles seeded successfully");
    }
  } catch (err) {
    console.error("[seed] Failed to seed articles:", err);
  }
}

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  await seedArticlesIfEmpty();

  app.get("/api/articles", async (_req, res) => {
    try {
      const result = await db.select().from(articles).orderBy(desc(articles.publishedAt));
      res.json(result);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch articles" });
    }
  });

  app.get("/api/articles/:slug", async (req, res) => {
    try {
      const [article] = await db
        .select()
        .from(articles)
        .where(eq(articles.slug, req.params.slug));
      if (!article) return res.status(404).json({ message: "Article not found" });
      res.json(article);
    } catch (err) {
      res.status(500).json({ message: "Failed to fetch article" });
    }
  });

  app.post("/api/articles", async (req, res) => {
    const parsed = insertArticleSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({ message: "Invalid data", errors: parsed.error.flatten() });
    }
    try {
      const [article] = await db.insert(articles).values(parsed.data).returning();
      res.status(201).json(article);
    } catch (err) {
      res.status(500).json({ message: "Failed to create article" });
    }
  });

  return httpServer;
}
