import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { CheckCircle2, Clock, Terminal, Coins } from "lucide-react";
import { SiBitcoin, SiEthereum, SiLitecoin, SiDogecoin, SiTether, SiSolana, SiBinance, SiTon } from "react-icons/si";

function TrxIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
      <path d="M61.55 19.28c-3-2.77-7.15-4.92-10.13-7.09L22.76.15a2.18 2.18 0 00-1.27-.15H20a1.86 1.86 0 00-.68.35 1.14 1.14 0 00-.24.18l-.08.11L.55 26.12a2.08 2.08 0 00.33 2.78l27.35 26.74a2.08 2.08 0 002.82 0l30.48-33.68a2.08 2.08 0 000-2.68zM22.8 7.62l23.64 10-15.86 9.8zm-4.16 1.52v18.77l-8.12-8zm12 23.75l-21.08-20.59 8.84-11.51z"/>
    </svg>
  );
}

const cryptoOptions = [
  { name: "Solana", symbol: "SOL", Icon: SiSolana, color: "text-purple-500", bg: "bg-purple-500/10" },
  { name: "BNB", symbol: "BNB", Icon: SiBinance, color: "text-yellow-500", bg: "bg-yellow-500/10" },
  { name: "USDC", symbol: "USDC", Icon: SiTether, color: "text-blue-500", bg: "bg-blue-500/10" },
  { name: "USDT", symbol: "USDT", Icon: SiTether, color: "text-green-500", bg: "bg-green-500/10" },
  { name: "Tron", symbol: "TRX", Icon: TrxIcon, color: "text-red-500", bg: "bg-red-500/10" },
  { name: "Bitcoin", symbol: "BTC", Icon: SiBitcoin, color: "text-orange-500", bg: "bg-orange-500/10" },
  { name: "Ethereum", symbol: "ETH", Icon: SiEthereum, color: "text-blue-400", bg: "bg-blue-400/10" },
  { name: "Toncoin", symbol: "TON", Icon: SiTon, color: "text-sky-500", bg: "bg-sky-500/10" },
  { name: "Litecoin", symbol: "LTC", Icon: SiLitecoin, color: "text-gray-400", bg: "bg-gray-400/10" },
];

const amounts = ["Rp 15.000", "Rp 25.000", "Rp 50.000", "Rp 75.000", "Rp 100.000", "Rp 150.000", "Rp 200.000", "Rp 250.000"];
const userNames = [
  "andiwijaya", "budisantoso", "citramaya", "dediptr", "ekorhmn", "fitrinadya", "galihkrsn", "hendrajy",
  "irfan.a", "joko.t", "kevin.l", "lina.h", "mario.d", "nina.f", "oscar.b", "putri.a",
  "reza88", "sinta21", "tommy99", "umi07", "vina22", "wawan08", "yudi77", "zara23",
  "arif_jkt", "bayu_bdg", "cahya_sby", "dewi_mlg", "fajar_id", "gilang.ptr", "hani.krsn", "indra.w",
  "jayakusuma", "kikirahma", "leonardi", "megaputri", "nandajr", "ogiprima", "prasetyo", "rinandr",
  "suryaadi", "tikawidya", "udinmks", "veramega", "widiarto", "xenaptra", "yogaptr", "zakiid"
];
const timestamps = ["baru", "1d lalu", "3d lalu", "5d lalu", "8d lalu"];

interface Transaction {
  id: number;
  user: string;
  amount: string;
  crypto: typeof cryptoOptions[0];
  timestamp: string;
  isNew: boolean;
  action: "beli" | "jual";
}

function generateUser(): string {
  return userNames[Math.floor(Math.random() * userNames.length)];
}

function generateTransaction(id: number, isNew: boolean = false): Transaction {
  return {
    id,
    user: generateUser(),
    amount: amounts[Math.floor(Math.random() * amounts.length)],
    crypto: cryptoOptions[Math.floor(Math.random() * cryptoOptions.length)],
    timestamp: isNew ? "baru" : timestamps[Math.floor(Math.random() * timestamps.length)],
    isNew,
    action: Math.random() > 0.3 ? "beli" : "jual",
  };
}

export function TransactionFeed() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    generateTransaction(1),
    generateTransaction(2),
    generateTransaction(3),
    generateTransaction(4),
    generateTransaction(5),
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTransactions((prev) => {
        const updatedPrev = prev.map((tx, idx) => ({
          ...tx,
          isNew: false,
          timestamp: timestamps[Math.min(idx + 1, timestamps.length - 1)],
        }));
        const newTx = generateTransaction(Date.now(), true);
        return [newTx, ...updatedPrev.slice(0, 4)];
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-1.5 font-mono">
      <div className="flex items-center justify-between mb-4 pb-3 border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute -top-0.5 -right-0.5 flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <Terminal className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-medium">@kriptoecerbot</span>
        </div>
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Clock className="w-3 h-3" />
          <span>langsung</span>
        </div>
      </div>
      
      <div className="space-y-1.5">
          {transactions.map((tx, index) => (
            <motion.div
              key={tx.id}
              initial={false}
              animate={{ 
                opacity: 1 - (index * 0.08),
              }}
              transition={{ 
                duration: 0.4,
                ease: "easeOut",
              }}
            className={`relative flex items-center gap-3 p-2.5 h-[52px] rounded-lg text-xs transition-colors duration-300 ${
              tx.isNew 
                ? "bg-primary/10 border border-primary/30" 
                : "bg-muted/20 border border-transparent"
            }`}
            data-testid={`transaction-item-${index}`}
          >
            {tx.isNew && (
              <motion.div
                className="absolute -left-0.5 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-primary"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            )}
            
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${tx.crypto.bg} ${tx.crypto.color}`}>
              <tx.crypto.Icon className="w-4 h-4" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-medium text-foreground/90 truncate text-[11px]">
                  {tx.user}
                </span>
                <span className="text-muted-foreground/70">→</span>
                <span className="text-primary font-semibold">
                  {tx.amount}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className={`text-[10px] ${tx.action === "jual" ? "text-red-400" : "text-green-400"}`}>
                  {tx.action}
                </span>
                <span className="text-[10px] px-1 py-0.5 rounded bg-muted/50 text-foreground/80 font-medium">
                  {tx.crypto.symbol}
                </span>
              </div>
            </div>
            
            <div className="flex flex-col items-end gap-0.5">
              <CheckCircle2 className={`w-3.5 h-3.5 ${tx.isNew ? "text-primary" : "text-green-500/70"}`} />
              <span className="text-[9px] text-muted-foreground/70 whitespace-nowrap">
                {tx.timestamp}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
      
      <motion.div 
        className="text-center pt-3 mt-2 border-t border-border/30"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <p className="text-[10px] text-muted-foreground/60">
          // gabung ribuan pengguna lainnya...
        </p>
      </motion.div>
    </div>
  );
}
