import { useEffect, useState } from "react";
import { SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiLitecoin, SiDogecoin } from "react-icons/si";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";

const TrxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <path d="M61.55 19.28c-3-2.77-7.15-4.92-10.13-7.09L22.76.15a2.18 2.18 0 00-1.27-.15H20a1.86 1.86 0 00-.68.35 1.14 1.14 0 00-.24.18l-.08.11L.55 26.12a2.08 2.08 0 00.33 2.78l27.35 26.74a2.08 2.08 0 002.82 0l30.48-33.68a2.08 2.08 0 000-2.68zM22.8 7.62l23.64 10-15.86 9.8zm-4.16 1.52v18.77l-8.12-8zm12 23.75l-21.08-20.59 8.84-11.51z" />
  </svg>
);

const COIN_CONFIG = [
  { id: "bitcoin",      symbol: "BTC",  Icon: SiBitcoin,  color: "text-orange-500" },
  { id: "ethereum",     symbol: "ETH",  Icon: SiEthereum, color: "text-blue-400"   },
  { id: "solana",       symbol: "SOL",  Icon: SiSolana,   color: "text-purple-500" },
  { id: "binancecoin",  symbol: "BNB",  Icon: SiBinance,  color: "text-yellow-500" },
  { id: "tether",       symbol: "USDT", Icon: SiTether,   color: "text-green-500"  },
  { id: "tron",         symbol: "TRX",  Icon: TrxIcon,    color: "text-red-500"    },
  { id: "litecoin",     symbol: "LTC",  Icon: SiLitecoin, color: "text-gray-400"   },
  { id: "dogecoin",     symbol: "DOGE", Icon: SiDogecoin, color: "text-amber-400"  },
];

function formatIDR(price: number): string {
  if (price >= 1_000_000_000) return `Rp ${(price / 1_000_000_000).toFixed(2)}M`;
  if (price >= 1_000_000)     return `Rp ${(price / 1_000_000).toFixed(2)}Jt`;
  if (price >= 1_000)         return `Rp ${price.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
  return `Rp ${price.toLocaleString("id-ID", { maximumFractionDigits: 2 })}`;
}

interface PriceData {
  idr: number;
  idr_24h_change: number;
}

type PricesMap = Record<string, PriceData>;

const REFRESH_INTERVAL = 60_000;

export function CryptoTicker() {
  const [prices, setPrices] = useState<PricesMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  async function fetchPrices() {
    try {
      const ids = COIN_CONFIG.map((c) => c.id).join(",");
      const url = `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=idr&include_24hr_change=true`;
      const res = await fetch(url, { cache: "no-store" });
      if (!res.ok) throw new Error("API error");
      const data: PricesMap = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => clearInterval(interval);
  }, []);

  const tickers = COIN_CONFIG.map((coin) => {
    const data = prices?.[coin.id];
    const price   = data ? formatIDR(data.idr) : "—";
    const change  = data ? `${data.idr_24h_change >= 0 ? "+" : ""}${data.idr_24h_change.toFixed(2)}%` : "—";
    const up      = data ? data.idr_24h_change >= 0 : true;
    return { ...coin, price, change, up };
  });

  const items = [...tickers, ...tickers];

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-background/80 backdrop-blur-md border-b border-border/60 overflow-hidden h-9">
      <div className="flex items-center h-full animate-marquee whitespace-nowrap">
        {items.map((t, i) => {
          const Icon = t.Icon;
          return (
            <span key={i} className="inline-flex items-center gap-1.5 px-5 text-xs font-medium shrink-0">
              <Icon className={`w-3.5 h-3.5 ${t.color}`} />
              <span className="font-semibold text-foreground/80">{t.symbol}</span>
              <span className="text-muted-foreground">{t.price}</span>
              {t.price !== "—" && (
                <span className={`flex items-center gap-0.5 ${t.up ? "text-green-500" : "text-red-500"}`}>
                  {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                  {t.change}
                </span>
              )}
              {loading && i === 0 && (
                <Loader2 className="w-3 h-3 animate-spin text-muted-foreground ml-1" />
              )}
              <span className="text-border ml-2">·</span>
            </span>
          );
        })}

        {lastUpdated && (
          <span className="inline-flex items-center gap-1 px-4 text-xs text-muted-foreground/50 shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
            Live · {lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
          </span>
        )}
      </div>
    </div>
  );
}
