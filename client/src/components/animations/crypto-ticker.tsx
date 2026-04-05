import { useEffect, useRef, useState, useCallback } from "react";
import { SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiLitecoin, SiDogecoin } from "react-icons/si";
import { TrendingUp, TrendingDown, Loader2 } from "lucide-react";
import { TrxIcon } from "@/components/icons/trx-icon";

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
  const [prices, setPrices]           = useState<PricesMap | null>(null);
  const [loading, setLoading]         = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const fetchPrices = useCallback(async () => {
    if (retryRef.current) { clearTimeout(retryRef.current); retryRef.current = null; }
    try {
      const res = await fetch("/api/prices", { cache: "no-store" });
      if (!res.ok) throw new Error("API error");
      const data: PricesMap = await res.json();
      setPrices(data);
      setLastUpdated(new Date());
    } catch {
      retryRef.current = setTimeout(fetchPrices, 5_000);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => {
      clearInterval(interval);
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [fetchPrices]);

  const tickers = COIN_CONFIG.map((coin) => {
    const data    = prices?.[coin.id];
    const price   = data ? formatIDR(data.idr) : "—";
    const change  = data ? `${data.idr_24h_change >= 0 ? "+" : ""}${data.idr_24h_change.toFixed(2)}%` : "—";
    const up      = data ? data.idr_24h_change >= 0 : true;
    return { ...coin, price, change, up };
  });

  const renderStrip = (keyPrefix: string) => (
    <>
      {tickers.map((t, i) => {
        const Icon    = t.Icon;
        const hasData = t.price !== "—";
        return (
          <span key={`${keyPrefix}-${i}`} className="inline-flex items-center gap-1.5 px-5 text-xs font-medium shrink-0">
            <Icon className={`w-3.5 h-3.5 ${t.color}`} />
            <span className="font-semibold text-foreground/80">{t.symbol}</span>
            <span className="text-muted-foreground">{t.price}</span>
            <span className={`flex items-center gap-0.5 ${t.up ? "text-green-500" : "text-red-500"} ${hasData ? "" : "invisible"}`}>
              {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
              <span>{t.change}</span>
            </span>
            <span className="text-border ml-2">·</span>
          </span>
        );
      })}
      <span className={`inline-flex items-center gap-1 px-4 text-xs text-muted-foreground/50 shrink-0 ${lastUpdated ? "" : "invisible"}`}>
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
        Live · {lastUpdated
          ? lastUpdated.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })
          : "--:--"}
      </span>
    </>
  );

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 overflow-hidden h-9 border-b border-black/[0.06] dark:border-white/[0.06] ticker-glass"
      data-testid="crypto-ticker"
    >
      {loading && (
        <div className="absolute right-2 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
        </div>
      )}
      <div className="flex items-center h-full whitespace-nowrap animate-marquee">
        {renderStrip("a")}
        {renderStrip("b")}
      </div>
    </div>
  );
}
