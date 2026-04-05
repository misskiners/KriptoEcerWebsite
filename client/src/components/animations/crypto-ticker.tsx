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
  const [loading, setLoading] = useState(true);
  const trackRef  = useRef<HTMLDivElement>(null);
  const retryRef  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const writeToDOM = useCallback((data: PricesMap, updatedAt: Date) => {
    const root = trackRef.current;
    if (!root) return;

    COIN_CONFIG.forEach((coin) => {
      const entry = data[coin.id];
      if (!entry) return;

      const price   = formatIDR(entry.idr);
      const change  = `${entry.idr_24h_change >= 0 ? "+" : ""}${entry.idr_24h_change.toFixed(2)}%`;
      const up      = entry.idr_24h_change >= 0;

      root.querySelectorAll<HTMLElement>(`[data-price="${coin.id}"]`).forEach((el) => {
        el.textContent = price;
      });

      root.querySelectorAll<HTMLElement>(`[data-change="${coin.id}"]`).forEach((el) => {
        el.textContent = change;
      });

      root.querySelectorAll<HTMLElement>(`[data-change-wrap="${coin.id}"]`).forEach((el) => {
        el.className = el.className.replace(/text-(green|red)-500/, up ? "text-green-500" : "text-red-500");
        el.style.visibility = "visible";
      });

      root.querySelectorAll<HTMLElement>(`[data-icon-up="${coin.id}"]`).forEach((el) => {
        el.style.display = up ? "" : "none";
      });

      root.querySelectorAll<HTMLElement>(`[data-icon-down="${coin.id}"]`).forEach((el) => {
        el.style.display = up ? "none" : "";
      });
    });

    const timeStr = updatedAt.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" });
    root.querySelectorAll<HTMLElement>("[data-live-label]").forEach((el) => {
      el.textContent = `Live · ${timeStr}`;
      el.style.visibility = "visible";
    });
  }, []);

  const fetchPrices = useCallback(async () => {
    if (retryRef.current) { clearTimeout(retryRef.current); retryRef.current = null; }
    try {
      const res = await fetch("/api/prices", { cache: "no-store" });
      if (!res.ok) throw new Error("API error");
      const data: PricesMap = await res.json();
      writeToDOM(data, new Date());
    } catch {
      retryRef.current = setTimeout(fetchPrices, 5_000);
    } finally {
      setLoading(false);
    }
  }, [writeToDOM]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);
    return () => {
      clearInterval(interval);
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [fetchPrices]);

  const renderStrip = (keyPrefix: string) => (
    <>
      {COIN_CONFIG.map((coin, i) => {
        const Icon = coin.Icon;
        return (
          <span key={`${keyPrefix}-${i}`} className="inline-flex items-center gap-1.5 px-5 text-xs font-medium shrink-0">
            <Icon className={`w-3.5 h-3.5 ${coin.color}`} />
            <span className="font-semibold text-foreground/80">{coin.symbol}</span>
            <span data-price={coin.id} className="text-muted-foreground">—</span>
            <span
              data-change-wrap={coin.id}
              className="flex items-center gap-0.5 text-green-500"
              style={{ visibility: "hidden" }}
            >
              <span data-icon-up={coin.id}><TrendingUp className="w-3 h-3" /></span>
              <span data-icon-down={coin.id} style={{ display: "none" }}><TrendingDown className="w-3 h-3" /></span>
              <span data-change={coin.id}>—</span>
            </span>
            <span className="text-border ml-2">·</span>
          </span>
        );
      })}
      <span
        data-live-label
        className="inline-flex items-center gap-1 px-4 text-xs text-muted-foreground/50 shrink-0"
        style={{ visibility: "hidden" }}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
        Live · --:--
      </span>
    </>
  );

  return (
    <div
      className="fixed top-16 left-0 right-0 z-40 overflow-hidden h-9 border-b border-black/[0.06] dark:border-white/[0.06] ticker-glass"
      data-testid="crypto-ticker"
    >
      <div className="ticker-fade-left" aria-hidden="true" />
      <div className="ticker-fade-right" aria-hidden="true" />

      {loading && (
        <div className="absolute right-10 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
          <Loader2 className="w-3 h-3 animate-spin text-muted-foreground" />
        </div>
      )}

      <div ref={trackRef} className="flex items-center h-full whitespace-nowrap animate-marquee">
        {renderStrip("a")}
        {renderStrip("b")}
      </div>
    </div>
  );
}
