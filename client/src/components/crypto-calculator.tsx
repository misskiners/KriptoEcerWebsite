import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, ArrowRight, Zap, AlertCircle } from "lucide-react";
import {
  SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiDogecoin,
} from "react-icons/si";
import { SiTelegram } from "react-icons/si";

const TrxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <path d="M61.55 19.28c-3-2.77-7.15-4.92-10.13-7.09L22.76.15a2.18 2.18 0 00-1.27-.15H20a1.86 1.86 0 00-.68.35 1.14 1.14 0 00-.24.18l-.08.11L.55 26.12a2.08 2.08 0 00.33 2.78l27.35 26.74a2.08 2.08 0 002.82 0l30.48-33.68a2.08 2.08 0 000-2.68zM22.8 7.62l23.64 10-15.86 9.8zm-4.16 1.52v18.77l-8.12-8zm12 23.75l-21.08-20.59 8.84-11.51z" />
  </svg>
);

const COINS = [
  { id: "solana",       symbol: "SOL",  name: "Solana",   Icon: SiSolana,   color: "text-purple-500", bg: "bg-purple-500/10 border-purple-500/30", decimals: 4 },
  { id: "tron",         symbol: "TRX",  name: "Tron",     Icon: TrxIcon,    color: "text-red-500",    bg: "bg-red-500/10 border-red-500/30",       decimals: 1 },
  { id: "binancecoin",  symbol: "BNB",  name: "BNB",      Icon: SiBinance,  color: "text-yellow-500", bg: "bg-yellow-500/10 border-yellow-500/30", decimals: 4 },
  { id: "tether",       symbol: "USDT", name: "USDT",     Icon: SiTether,   color: "text-green-500",  bg: "bg-green-500/10 border-green-500/30",   decimals: 2 },
  { id: "ethereum",     symbol: "ETH",  name: "Ethereum", Icon: SiEthereum, color: "text-blue-400",   bg: "bg-blue-400/10 border-blue-400/30",     decimals: 6 },
  { id: "bitcoin",      symbol: "BTC",  name: "Bitcoin",  Icon: SiBitcoin,  color: "text-orange-500", bg: "bg-orange-500/10 border-orange-500/30", decimals: 8 },
  { id: "dogecoin",     symbol: "DOGE", name: "Dogecoin", Icon: SiDogecoin, color: "text-amber-400",  bg: "bg-amber-400/10 border-amber-400/30",   decimals: 2 },
];

function formatIDR(price: number): string {
  if (price >= 1_000_000_000) return `Rp ${(price / 1_000_000_000).toFixed(2)} M`;
  if (price >= 1_000_000)     return `Rp ${(price / 1_000_000).toFixed(2)} Jt`;
  if (price >= 1_000)         return `Rp ${price.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
  return `Rp ${price.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`;
}

function formatCrypto(amount: number, decimals: number, symbol: string): string {
  if (amount === 0) return `0 ${symbol}`;
  if (amount < 0.00001) return `${amount.toExponential(2)} ${symbol}`;
  return `${amount.toFixed(decimals).replace(/\.?0+$/, "")} ${symbol}`;
}

function formatInputIDR(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (!digits) return "";
  return Number(digits).toLocaleString("id-ID");
}

export function CryptoCalculator() {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0]);
  const [inputDisplay, setInputDisplay] = useState("100.000");
  const [prices, setPrices] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const rawValue = Number(inputDisplay.replace(/\D/g, "")) || 0;
  const price = prices[selectedCoin.id] ?? 0;
  const cryptoAmount = price > 0 ? rawValue / price : 0;
  const MIN = 10_000;
  const isBelowMin = rawValue > 0 && rawValue < MIN;

  async function fetchPrices(showRefreshing = false) {
    if (showRefreshing) setRefreshing(true);
    try {
      const ids = COINS.map((c) => c.id).join(",");
      const res = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=idr`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error();
      const data = await res.json();
      const map: Record<string, number> = {};
      for (const coin of COINS) map[coin.id] = data[coin.id]?.idr ?? 0;
      setPrices(map);
      setLastUpdated(new Date());
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(() => fetchPrices(), 60_000);
    return () => clearInterval(interval);
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, "");
    setInputDisplay(digits ? Number(digits).toLocaleString("id-ID") : "");
  };

  const QUICK_AMOUNTS = [10_000, 50_000, 100_000, 500_000];

  const coin = selectedCoin;
  const Icon = coin.Icon;

  return (
    <section className="py-20 relative overflow-hidden" id="kalkulator">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent pointer-events-none" />

      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">
            <Zap className="w-3 h-3 mr-1" />
            Harga Real-Time
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">
            Dapat Berapa Crypto-mu?
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Masukkan nominal Rupiah dan langsung lihat berapa koin yang kamu dapat — berdasarkan harga pasar saat ini.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="max-w-xl mx-auto"
        >
          <div className="rounded-2xl border border-border bg-card shadow-xl shadow-primary/5 overflow-hidden">
            <div className="p-6 pb-0">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Masukkan Nominal</span>
                <button
                  onClick={() => fetchPrices(true)}
                  disabled={refreshing}
                  className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
                  data-testid="button-calculator-refresh"
                >
                  <RefreshCw className={`w-3 h-3 ${refreshing ? "animate-spin" : ""}`} />
                  {lastUpdated
                    ? `Update ${lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}`
                    : "Memuat..."
                  }
                </button>
              </div>

              <div className="relative mb-3">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-xl font-bold text-muted-foreground select-none">
                  Rp
                </span>
                <input
                  ref={inputRef}
                  type="text"
                  inputMode="numeric"
                  value={inputDisplay}
                  onChange={handleInput}
                  placeholder="10.000"
                  className="w-full pl-12 pr-4 py-4 text-2xl font-bold bg-muted/50 border border-border rounded-xl
                    focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary/50
                    placeholder:text-muted-foreground/40 transition-all"
                  data-testid="input-calculator-amount"
                />
              </div>

              <div className="flex gap-2 mb-5 flex-wrap">
                {QUICK_AMOUNTS.map((amt) => (
                  <button
                    key={amt}
                    onClick={() => setInputDisplay(amt.toLocaleString("id-ID"))}
                    className={`px-3 py-1 rounded-lg text-xs font-medium border transition-all ${
                      rawValue === amt
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-muted text-muted-foreground border-border hover:border-primary/40 hover:text-foreground"
                    }`}
                    data-testid={`button-quick-${amt}`}
                  >
                    {(amt / 1000).toFixed(0)}rb
                  </button>
                ))}
              </div>

              <div className="mb-4">
                <span className="text-sm font-semibold text-muted-foreground uppercase tracking-wide mb-3 block">Pilih Koin</span>
                <div className="flex gap-2 flex-wrap">
                  {COINS.map((c) => {
                    const CIcon = c.Icon;
                    const isSelected = c.id === selectedCoin.id;
                    return (
                      <button
                        key={c.id}
                        onClick={() => setSelectedCoin(c)}
                        className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                          isSelected
                            ? `${c.bg} ${c.color} scale-105 shadow-sm`
                            : "bg-muted text-muted-foreground border-border hover:border-primary/30"
                        }`}
                        data-testid={`button-coin-${c.symbol.toLowerCase()}`}
                      >
                        <CIcon className={`w-3.5 h-3.5 ${isSelected ? c.color : ""}`} />
                        {c.symbol}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className={`mx-4 mb-4 rounded-xl p-5 ${coin.bg} border`}>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-muted-foreground font-medium">Kamu dapat</span>
                {error && (
                  <span className="flex items-center gap-1 text-xs text-destructive">
                    <AlertCircle className="w-3 h-3" />
                    Gagal muat harga
                  </span>
                )}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`${rawValue}-${selectedCoin.id}`}
                  initial={{ opacity: 0, y: -8, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="flex items-center gap-3"
                >
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center bg-background/80 border border-border/50 shrink-0`}>
                    <Icon className={`w-5 h-5 ${coin.color}`} />
                  </div>
                  <div>
                    {loading ? (
                      <div className="h-8 w-32 bg-muted animate-pulse rounded-lg" />
                    ) : (
                      <p className={`text-2xl sm:text-3xl font-bold ${coin.color}`} data-testid="text-calculator-result">
                        {rawValue > 0
                          ? formatCrypto(cryptoAmount, coin.decimals, coin.symbol)
                          : `0 ${coin.symbol}`
                        }
                      </p>
                    )}
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {price > 0
                        ? `1 ${coin.symbol} = ${formatIDR(price)}`
                        : "Memuat harga..."
                      }
                    </p>
                  </div>
                </motion.div>
              </AnimatePresence>

              {isBelowMin && (
                <motion.p
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="text-xs text-amber-600 dark:text-amber-400 mt-3 flex items-center gap-1"
                >
                  <AlertCircle className="w-3 h-3 shrink-0" />
                  Nominal minimum pembelian adalah Rp10.000
                </motion.p>
              )}
            </div>

            <div className="px-4 pb-5">
              <Button
                asChild
                size="lg"
                className="w-full"
                disabled={rawValue < MIN}
                data-testid="button-calculator-cta"
              >
                <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                  <SiTelegram className="w-4 h-4 mr-2" />
                  Beli {rawValue >= MIN ? formatCrypto(cryptoAmount, coin.decimals, coin.symbol) : `${coin.symbol}`} Sekarang
                  <ArrowRight className="w-4 h-4 ml-2" />
                </a>
              </Button>
              <p className="text-center text-xs text-muted-foreground mt-2.5">
                Mulai dari Rp10.000 · Tanpa KYC · Proses otomatis 24 jam
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
