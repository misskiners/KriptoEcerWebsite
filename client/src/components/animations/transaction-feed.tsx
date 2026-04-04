import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiTether, SiSolana, SiBinance, SiTon } from "react-icons/si";
import { TrxIcon } from "@/components/icons/trx-icon";

// id CoinGecko yang akan difetch
const CRYPTO_META = [
  { id: "solana",          symbol: "SOL",  name: "Solana",   Icon: SiSolana,   color: "text-purple-400", bg: "bg-purple-500/10",  decimals: 4, fallback: 1_800_000     },
  { id: "binancecoin",     symbol: "BNB",  name: "BNB",      Icon: SiBinance,  color: "text-yellow-400", bg: "bg-yellow-500/10",  decimals: 5, fallback: 10_000_000    },
  { id: "tether",          symbol: "USDT", name: "USDT",     Icon: SiTether,   color: "text-emerald-400",bg: "bg-emerald-500/10", decimals: 2, fallback: 16_300        },
  { id: "usd-coin",        symbol: "USDC", name: "USDC",     Icon: SiTether,   color: "text-blue-400",   bg: "bg-blue-500/10",    decimals: 2, fallback: 16_280        },
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
  "arif_jkt", "bayu_bdg", "cahya_sby", "dewi_mlg", "fajar_id",
  "gilang_ptr", "hani_krsn", "indra_w", "jayakusuma", "kiki_r",
  "leon_di", "mega_putri", "nanda_jr", "ogi_prima", "prasetyo",
  "rina_ndr", "surya_adi", "tika_w", "udin_mks", "vera_m",
  "widi_arto", "yogi_ptr", "zaki_id", "andie_w", "budi_s",
  "citra_m", "dedi_ptr", "eko_r", "fitri_n", "galih_k",
  "reza_mdn", "santi_btw", "hendra_solo", "nindy_jkt", "andri88",
  "fulan_id", "rafi_trade", "lina_btc", "pak_harto77", "mira_sol",
  "angga_trade", "bg_crypto", "krisna_bali", "dinda_klmtn", "fauzan_sby",
  "habib_jr", "irfan_krs", "jasmine_id", "kevin_bali", "lutfi_ptr",
  "maulana_jkt", "novita_s", "oscar_wld", "purnama_id", "queenie_m",
  "ridwan_id", "sela_bdg", "tomy_jkt", "ulfa_id", "vino_ptr",
  "wahyu_s", "xander_id", "yuni_tr", "zelda_crypto", "abdi_sby",
];

const timestamps = ["baru saja", "12s lalu", "28s lalu", "45s lalu", "1m lalu", "2m lalu", "3m lalu"];

function generateHash(): string {
  const hex = "0123456789abcdef";
  const seg = (len: number) => Array.from({ length: len }, () => hex[Math.floor(Math.random() * 16)]).join("");
  return `0x${seg(4)}…${seg(4)}`;
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
    hash: generateHash(),
  };
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>(() =>
    Array.from({ length: 5 }, (_, i) => generateTransaction(i + 1))
  );
  const [blockNum, setBlockNum] = useState(() => Math.floor(Math.random() * 500_000) + 4_800_000);
  const [blink, setBlink] = useState(true);
  const pricesReady = useRef(false);

  // Fetch harga live dari CoinGecko — sama dengan ticker di atas
  useEffect(() => {
    async function fetchPrices() {
      try {
        const ids = CRYPTO_META.map(c => c.id).join(",");
        const res = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=idr`,
          { cache: "no-store" }
        );
        if (!res.ok) return;
        const data: Record<string, { idr: number }> = await res.json();
        CRYPTO_META.forEach(c => {
          if (data[c.id]?.idr) livePrices[c.id] = data[c.id].idr;
        });
        // Regenerasi transaksi awal setelah harga diketahui
        if (!pricesReady.current) {
          pricesReady.current = true;
          setTransactions(Array.from({ length: 5 }, (_, i) => generateTransaction(i + 1)));
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
    const blinkInterval = setInterval(() => setBlink(b => !b), 530);
    return () => {
      clearInterval(txInterval);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div className="relative bg-zinc-950 rounded-xl overflow-hidden border border-zinc-800 font-mono select-none">

      {/* Scan-line sweep */}
      <motion.div
        className="absolute inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-amber-400/20 to-transparent pointer-events-none z-10"
        animate={{ y: [0, 420] }}
        transition={{ duration: 5, repeat: Infinity, ease: "linear", repeatDelay: 3 }}
      />

      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900/80 border-b border-zinc-800">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute h-full w-full rounded-full bg-green-400 opacity-60" />
            <span className="relative rounded-full h-2 w-2 bg-green-500" />
          </span>
          <span className="text-[11px] text-zinc-500">kriptoecerbot</span>
          <span className="text-[11px] text-zinc-700">@</span>
          <span className="text-[11px] text-amber-400/80">mainnet</span>
          <span className="text-[11px] text-zinc-700 ml-1">--live</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-zinc-700">BLOCK</span>
          <span className="text-[10px] text-amber-400/50 tabular-nums">{blockNum.toLocaleString("id-ID")}</span>
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
                    : "border-zinc-800/50 bg-zinc-900/20"
                }`}
                data-testid={`transaction-item-${index}`}
              >
                {/* Hash + timestamp */}
                <div className="flex items-center justify-between px-3 pt-2 pb-0.5">
                  <span className={`text-[10px] tabular-nums ${tx.isNew ? "text-amber-400/60" : "text-zinc-700"}`}>
                    {tx.hash}
                  </span>
                  <span className={`text-[10px] ${tx.isNew ? "text-amber-400/50" : "text-zinc-700"}`}>
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
                  <span className="text-[10px] text-zinc-600 shrink-0">
                    {formatRupiah(tx.rupiahVal)}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="px-4 py-2.5 border-t border-zinc-800/60 bg-zinc-900/40">
        <div className="flex items-center gap-1">
          <span className="text-[10px] text-zinc-700">&gt;_</span>
          <span className="text-[10px] text-zinc-600">bergabung dengan</span>
          <span className="text-[10px] text-amber-400/70 font-semibold">ribuan pengguna aktif</span>
          <motion.span
            className="text-[10px] text-amber-400/60 ml-0.5"
            animate={{ opacity: blink ? 1 : 0 }}
            transition={{ duration: 0 }}
          >
            █
          </motion.span>
        </div>
      </div>
    </div>
  );
}
