import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiTether, SiSolana, SiBinance, SiTon } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

// USDC — Circle's USD Coin (no simple-icons entry, use inline SVG)
const UsdcIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
    <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2"/>
    <text x="12" y="16" textAnchor="middle" fontSize="9" fontWeight="bold" fill="currentColor">$</text>
  </svg>
);

// id CoinGecko yang akan difetch
const CRYPTO_META = [
  { id: "solana",          symbol: "SOL",  name: "Solana",   Icon: SiSolana,   color: "text-purple-400", bg: "bg-purple-500/10",  decimals: 4, fallback: 1_800_000     },
  { id: "binancecoin",     symbol: "BNB",  name: "BNB",      Icon: SiBinance,  color: "text-yellow-400", bg: "bg-yellow-500/10",  decimals: 5, fallback: 10_000_000    },
  { id: "tether",          symbol: "USDT", name: "USDT",     Icon: SiTether,   color: "text-emerald-400",bg: "bg-emerald-500/10", decimals: 2, fallback: 16_300        },
  { id: "usd-coin",        symbol: "USDC", name: "USDC",     Icon: UsdcIcon,   color: "text-blue-400",   bg: "bg-blue-500/10",    decimals: 2, fallback: 16_280        },
  { id: "tron",            symbol: "TRX",  name: "Tron",     Icon: TrxIcon,    color: "text-red-400",    bg: "bg-red-500/10",     decimals: 1, fallback: 5_800         },
  { id: "bitcoin",         symbol: "BTC",  name: "Bitcoin",  Icon: SiBitcoin,  color: "text-orange-400", bg: "bg-orange-500/10",  decimals: 8, fallback: 1_450_000_000 },
  { id: "ethereum",        symbol: "ETH",  name: "Ethereum", Icon: SiEthereum, color: "text-blue-300",   bg: "bg-blue-400/10",    decimals: 6, fallback: 38_000_000    },
  { id: "the-open-network",symbol: "TON",  name: "Toncoin",  Icon: SiTon,      color: "text-sky-400",    bg: "bg-sky-500/10",     decimals: 3, fallback: 85_000        },
  { id: "litecoin",        symbol: "LTC",  name: "Litecoin", Icon: SiLitecoin, color: "text-zinc-400",   bg: "bg-zinc-400/10",    decimals: 4, fallback: 1_400_000     },
] as const;

type CryptoMeta = typeof CRYPTO_META[number];

// Beragam nominal IDR yang realistis — Rp 10rb s/d Rp 1jt
const rupiahAmounts = [
  10_000, 15_000, 20_000, 25_000, 30_000, 40_000, 50_000,
  75_000, 100_000, 125_000, 150_000, 175_000, 200_000,
  250_000, 300_000, 350_000, 400_000, 500_000, 750_000, 1_000_000,
];

// Username lebih bervariasi — mix gaya sosmed Indonesia
const userNames = [
  // tanpa separator
  "jayakusuma", "prasetyo", "hendriawan", "nuraisyah", "budiman",
  "cakrabirawa", "rahmadi", "susanto", "fatimah", "kurniawan",
  // angka di belakang
  "andri88", "pak_harto77", "budi123", "kevin99", "rizky21",
  "aldi007", "nando2k", "tommy1995", "rama03", "dika17",
  // gaya telegram pendek
  "bg_crypto", "lina_btc", "mira_sol", "rafi_trade", "zelda_crypto",
  "thereal_reza", "notbayu", "iamgalih", "justdewi", "onlysolana",
  // titik sebagai pemisah
  "reza.jkt", "santi.bdg", "hendra.solo", "nindy.mlg", "dinda.sby",
  "angga.trade", "krisna.bali", "fauzan.ptr", "nova.id", "vino.crypto",
  // campuran huruf + angka tanpa pemisah
  "arif2025", "cahya99x", "gilang_7", "indra.w", "tika88",
  "udin3k", "widiarto", "yogi_4", "zaki01", "ekopras",
  // gaya akun biasa
  "lutfipurnama", "maulana_jkt", "ridwan.id", "sela_bdg", "tomy_jkt",
  "ulfa.id", "wahyusaputra", "xander_id", "yunitri", "abdi_sby",
  "habibullah", "irfan.krs", "jasmineid", "queenie_m", "oscar_wld",
];

const timestamps = ["baru saja", "12s lalu", "28s lalu", "45s lalu", "1m lalu", "2m lalu", "3m lalu"];

const HEX  = "0123456789abcdef";
const B58  = "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz";
const TRON = "ABCDEFGHJKLMNPQRSTUVWXYZ0123456789";

function rndStr(chars: string, len: number): string {
  return Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
}

// Pilih format alamat berdasarkan coin — lebih realistis
function generateAddress(coinId: string): string {
  if (coinId === "tron") {
    // Tron: T + 33 karakter → tampilkan 6 … 4
    const full = "T" + rndStr(TRON, 33);
    return `${full.slice(0, 6)}…${full.slice(-4)}`;
  }
  if (coinId === "solana") {
    // Solana: base58 44 karakter → tampilkan 5 … 4
    const full = rndStr(B58, 44);
    return `${full.slice(0, 5)}…${full.slice(-4)}`;
  }
  if (coinId === "the-open-network") {
    // TON: UQ + base58 → tampilkan 6 … 4
    const full = "UQ" + rndStr(B58, 46);
    return `${full.slice(0, 6)}…${full.slice(-4)}`;
  }
  if (coinId === "bitcoin") {
    // Bitcoin: acak antara Legacy (1…), P2SH (3…), atau SegWit (bc1q…)
    const type = Math.floor(Math.random() * 3);
    if (type === 0) {
      const full = "1" + rndStr(B58, 33);
      return `${full.slice(0, 6)}…${full.slice(-4)}`;
    } else if (type === 1) {
      const full = "3" + rndStr(B58, 33);
      return `${full.slice(0, 6)}…${full.slice(-4)}`;
    } else {
      const full = "bc1q" + rndStr(HEX, 38);
      return `${full.slice(0, 8)}…${full.slice(-6)}`;
    }
  }
  if (coinId === "litecoin") {
    // Litecoin: Legacy (L…) atau P2SH (M…)
    const prefix = Math.random() > 0.5 ? "L" : "M";
    const full = prefix + rndStr(B58, 33);
    return `${full.slice(0, 6)}…${full.slice(-4)}`;
  }
  // Ethereum-family (ETH, BNB, USDT, USDC): 0x + 40 hex
  const full = "0x" + rndStr(HEX, 40);
  return `${full.slice(0, 8)}…${full.slice(-6)}`;
}

function formatRupiah(val: number): string {
  return "Rp " + val.toLocaleString("id-ID");
}

// Format jumlah koin berdasarkan harga live — bulatkan ke desimal sesuai coin
function formatCryptoAmount(rupiahVal: number, crypto: CryptoMeta, livePrice: number): string {
  const price = livePrice > 0 ? livePrice : crypto.fallback;
  const amount = rupiahVal / price;
  // Untuk BTC tampilkan lebih banyak desimal agar tidak nol
  const decimals = price > 100_000_000 ? 8 : crypto.decimals;
  return `+${amount.toFixed(decimals)} ${crypto.symbol}`;
}

interface Transaction {
  id: number;
  user: string;
  rupiahVal: number;
  crypto: CryptoMeta;
  cryptoAmount: string;
  timestamp: string;
  isNew: boolean;
  action: "BELI" | "JUAL";
  hash: string;
}

// Harga live disimpan di luar komponen agar bisa dipakai saat generate tx
let livePrices: Record<string, number> = {};

function generateTransaction(id: number, isNew = false): Transaction {
  const crypto = CRYPTO_META[Math.floor(Math.random() * CRYPTO_META.length)];
  const rupiahVal = rupiahAmounts[Math.floor(Math.random() * rupiahAmounts.length)];
  const livePrice = livePrices[crypto.id] ?? crypto.fallback;
  return {
    id,
    user: userNames[Math.floor(Math.random() * userNames.length)],
    rupiahVal,
    crypto,
    cryptoAmount: formatCryptoAmount(rupiahVal, crypto, livePrice),
    timestamp: isNew ? "baru saja" : timestamps[Math.floor(Math.random() * (timestamps.length - 1)) + 1],
    isNew,
    action: Math.random() > 0.28 ? "BELI" : "JUAL",
    hash: generateAddress(crypto.id),
  };
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    Array.from({ length: 5 }, (_, i) => generateTransaction(-(i + 1)))
  );
  const [blockNum, setBlockNum] = useState(() => Math.floor(Math.random() * 500_000) + 4_800_000);
  const pricesReady = useRef(false);

  // Fetch harga live dari CoinGecko — sama dengan ticker di atas
  useEffect(() => {
    async function fetchPrices() {
      try {
        const res = await fetch("/api/prices", { cache: "no-store" });
        if (!res.ok) return;
        const data: Record<string, { idr: number }> = await res.json();
        CRYPTO_META.forEach(c => {
          if (data[c.id]?.idr) livePrices[c.id] = data[c.id].idr;
        });
        // Regenerasi transaksi awal setelah harga diketahui
        if (!pricesReady.current) {
          pricesReady.current = true;
          setTransactions(Array.from({ length: 5 }, (_, i) => generateTransaction(Date.now() + i)));
        }
      } catch {
        // Gunakan fallback — tidak perlu error UI
      }
    }
    fetchPrices();
    const refresh = setInterval(fetchPrices, 60_000);
    return () => clearInterval(refresh);
  }, []);

  // Tambah transaksi baru setiap 3,2 detik
  useEffect(() => {
    const txInterval = setInterval(() => {
      setBlockNum(b => b + 1);
      setTransactions(prev => {
        const updated = prev.map((tx, idx) => ({
          ...tx,
          isNew: false,
          timestamp: timestamps[Math.min(idx + 1, timestamps.length - 1)],
        }));
        return [generateTransaction(Date.now(), true), ...updated.slice(0, 4)];
      });
    }, 3200);
    return () => {
      clearInterval(txInterval);
    };
  }, []);

  return (
    <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800/80 font-mono select-none shadow-xl shadow-black/20">

      {/* Noise/vignette overlay — menambah kedalaman tanpa terlalu gelap */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none z-0" />

      {/* Scan-line sweep */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/30 to-transparent pointer-events-none z-10"
        animate={{ y: [0, 420] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800/60">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[11px] text-zinc-600">@</span>
          <span className="text-[11px] text-zinc-400">kriptoecerbot</span>
          <span className="text-[11px] text-amber-400/90">mainnet</span>
          <span className="text-[11px] text-zinc-600 ml-1">--live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-600">BLOCK</span>
          <span className="text-[10px] text-amber-400/60 tabular-nums">{blockNum.toLocaleString("id-ID")}</span>
        </div>
      </div>

      {/* Feed — fixed height agar tidak ada layout shift */}
      <div className="overflow-hidden" style={{ height: "370px" }}>
        <div className="p-3 space-y-2">
          <AnimatePresence initial={false}>
            {transactions.map((tx, index) => (
              <motion.div
                key={tx.id}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: Math.max(0.22, 1 - index * 0.18), y: 0 }}
                exit={{ opacity: 0, y: 6 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`rounded-lg border overflow-hidden ${
                  tx.isNew
                    ? "border-amber-500/30 bg-amber-500/5 shadow-[0_0_16px_rgba(245,158,11,0.08)]"
                    : "border-zinc-800/50 bg-zinc-900/40"
                }`}
                data-testid={`transaction-item-${index}`}
              >
                {/* Hash + timestamp */}
                <div className="flex items-center justify-between px-3 pt-2 pb-0.5">
                  <span className={`text-[10px] tabular-nums ${tx.isNew ? "text-amber-400/70" : "text-zinc-500 dark:text-zinc-700"}`}>
                    {tx.hash}
                  </span>
                  <span className={`text-[10px] ${tx.isNew ? "text-amber-400/60" : "text-zinc-500 dark:text-zinc-700"}`}>
                    {tx.timestamp}
                  </span>
                </div>

                {/* Action row */}
                <div className="flex items-center gap-2 px-3 pb-2.5 pt-1">
                  <span className={`text-[11px] font-bold ${tx.action === "BELI" ? "text-green-400" : "text-red-400"}`}>
                    {tx.action === "BELI" ? "▲" : "▼"}
                  </span>
                  <div className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 ${tx.crypto.bg} ${tx.crypto.color}`}>
                    <tx.crypto.Icon className="w-3 h-3" />
                  </div>
                  <span className="text-[11px] text-zinc-200 font-semibold tracking-tight truncate max-w-[80px]">
                    {tx.user}
                  </span>
                  <span className={`text-[10px] font-bold ${tx.action === "BELI" ? "text-green-400" : "text-red-400"}`}>
                    {tx.action}
                  </span>
                  <span className={`text-[10px] font-medium flex-1 truncate ${tx.crypto.color}`}>
                    {tx.cryptoAmount}
                  </span>
                  <span className="text-[10px] text-zinc-400 dark:text-zinc-600 shrink-0">
                    {formatRupiah(tx.rupiahVal)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-2.5 border-t border-zinc-800/50 bg-zinc-900/60">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-500">&gt;_</span>
          <span className="text-[10px] text-zinc-500">bergabung dengan</span>
          <span className="text-[10px] text-amber-400/70 font-semibold">ribuan pengguna aktif</span>
          <span className="text-[10px] text-amber-400/60 ml-0.5 blink-cursor">
            █
          </span>
        </div>
      </div>
    </div>
  );
}
