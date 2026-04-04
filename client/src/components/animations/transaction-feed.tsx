import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiTether, SiSolana, SiBinance, SiTon } from "react-icons/si";

function TrxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path d="M61.55 19.28c-3-2.77-7.15-4.92-10.13-7.09L22.76.15a2.18 2.18 0 00-1.27-.15H20a1.86 1.86 0 00-.68.35 1.14 1.14 0 00-.24.18l-.08.11L.55 26.12a2.08 2.08 0 00.33 2.78l27.35 26.74a2.08 2.08 0 002.82 0l30.48-33.68a2.08 2.08 0 000-2.68zM22.8 7.62l23.64 10-15.86 9.8zm-4.16 1.52v18.77l-8.12-8zm12 23.75l-21.08-20.59 8.84-11.51z"/>
    </svg>
  );
}

const cryptoOptions = [
  { name: "Solana",   symbol: "SOL",  Icon: SiSolana,   color: "text-purple-400", bg: "bg-purple-500/10",  priceIdr: 1_380_000,     decimals: 4 },
  { name: "BNB",      symbol: "BNB",  Icon: SiBinance,  color: "text-yellow-400", bg: "bg-yellow-500/10",  priceIdr: 10_000_000,    decimals: 5 },
  { name: "USDC",     symbol: "USDC", Icon: SiTether,   color: "text-blue-400",   bg: "bg-blue-500/10",    priceIdr: 16_200,        decimals: 2 },
  { name: "USDT",     symbol: "USDT", Icon: SiTether,   color: "text-emerald-400",bg: "bg-emerald-500/10", priceIdr: 16_200,        decimals: 2 },
  { name: "Tron",     symbol: "TRX",  Icon: TrxIcon,    color: "text-red-400",    bg: "bg-red-500/10",     priceIdr: 5_400,         decimals: 1 },
  { name: "Bitcoin",  symbol: "BTC",  Icon: SiBitcoin,  color: "text-orange-400", bg: "bg-orange-500/10",  priceIdr: 1_140_000_000, decimals: 6 },
  { name: "Ethereum", symbol: "ETH",  Icon: SiEthereum, color: "text-blue-300",   bg: "bg-blue-400/10",    priceIdr: 34_000_000,    decimals: 5 },
  { name: "Toncoin",  symbol: "TON",  Icon: SiTon,      color: "text-sky-400",    bg: "bg-sky-500/10",     priceIdr: 80_000,        decimals: 3 },
  { name: "Litecoin", symbol: "LTC",  Icon: SiLitecoin, color: "text-zinc-400",   bg: "bg-zinc-400/10",    priceIdr: 1_300_000,     decimals: 4 },
] as const;

const rupiahAmounts = [15_000, 25_000, 50_000, 75_000, 100_000, 150_000, 200_000, 250_000];
const userNames = [
  "arif_jkt", "bayu_bdg", "cahya_sby", "dewi_mlg", "fajar_id",
  "gilang_ptr", "hani_krsn", "indra_w", "jayakusuma", "kiki_r",
  "leon_di", "mega_putri", "nanda_jr", "ogi_prima", "prasetyo",
  "rina_ndr", "surya_adi", "tika_w", "udin_mks", "vera_m",
  "widi_arto", "yogi_ptr", "zaki_id", "andie_w", "budi_s",
  "citra_m", "dedi_ptr", "eko_r", "fitri_n", "galih_k",
];
const timestamps = ["baru saja", "12s lalu", "28s lalu", "1m lalu", "3m lalu"];

function generateHash(): string {
  const hex = "0123456789abcdef";
  const a = Array.from({ length: 4 }, () => hex[Math.floor(Math.random() * 16)]).join("");
  const b = Array.from({ length: 4 }, () => hex[Math.floor(Math.random() * 16)]).join("");
  return `0x${a}…${b}`;
}

function formatRupiah(val: number): string {
  return "Rp " + val.toLocaleString("id-ID");
}

function formatCryptoAmount(rupiahVal: number, crypto: typeof cryptoOptions[number]): string {
  const amount = rupiahVal / crypto.priceIdr;
  return `+${amount.toFixed(crypto.decimals)} ${crypto.symbol}`;
}

interface Transaction {
  id: number;
  user: string;
  rupiahVal: number;
  crypto: typeof cryptoOptions[number];
  cryptoAmount: string;
  timestamp: string;
  isNew: boolean;
  action: "BELI" | "JUAL";
  hash: string;
}

function generateTransaction(id: number, isNew = false): Transaction {
  const crypto = cryptoOptions[Math.floor(Math.random() * cryptoOptions.length)];
  const rupiahVal = rupiahAmounts[Math.floor(Math.random() * rupiahAmounts.length)];
  return {
    id,
    user: userNames[Math.floor(Math.random() * userNames.length)],
    rupiahVal,
    crypto,
    cryptoAmount: formatCryptoAmount(rupiahVal, crypto),
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

      {/* Scan-line sweep — uses transform only, no layout impact */}
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

      {/*
        Feed container: fixed height + overflow-hidden
        This prevents ANY layout shift — exiting items are clipped inside,
        not allowed to affect content outside this box.
      */}
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
