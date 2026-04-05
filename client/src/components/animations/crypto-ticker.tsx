import { useEffect, useRef, useCallback } from "react";
import { SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiLitecoin, SiDogecoin } from "react-icons/si";
import { TrendingUp, TrendingDown } from "lucide-react";
import { TrxIcon } from "@/components/icons/trx-icon";

const COIN_CONFIG = [
  { id: "bitcoin",      symbol: "BTC",  Icon: SiBitcoin,  color: "text-orange-500", mobile: true  },
  { id: "ethereum",     symbol: "ETH",  Icon: SiEthereum, color: "text-blue-400",   mobile: true  },
  { id: "solana",       symbol: "SOL",  Icon: SiSolana,   color: "text-purple-500", mobile: true  },
  { id: "binancecoin",  symbol: "BNB",  Icon: SiBinance,  color: "text-yellow-500", mobile: true  },
  { id: "tether",       symbol: "USDT", Icon: SiTether,   color: "text-green-500",  mobile: false },
  { id: "tron",         symbol: "TRX",  Icon: TrxIcon,    color: "text-red-500",    mobile: false },
  { id: "litecoin",     symbol: "LTC",  Icon: SiLitecoin, color: "text-gray-400",   mobile: false },
  { id: "dogecoin",     symbol: "DOGE", Icon: SiDogecoin, color: "text-amber-400",  mobile: false },
];

function formatIDR(price: number): string {
  if (price >= 1_000_000_000) return `Rp${(price / 1_000_000_000).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}M`;
  if (price >= 1_000_000)     return `Rp${(price / 1_000_000).toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}Jt`;
  if (price >= 1_000)         return `Rp${price.toLocaleString("id-ID", { maximumFractionDigits: 0 })}`;
  return `Rp${price.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

interface PriceData {
  idr: number;
  idr_24h_change: number;
}

type PricesMap = Record<string, PriceData>;

const REFRESH_INTERVAL = 60_000;
const SPEED_PX_PER_SEC = 40;

export function CryptoTicker() {
  const trackRef = useRef<HTMLDivElement>(null);
  const stripRef = useRef<HTMLDivElement>(null);
  const retryRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const measuredRef = useRef(false);

  const measureAndAnimate = useCallback(() => {
    const track = trackRef.current;
    const strip = stripRef.current;
    if (!track || !strip) return;

    const stripWidth = strip.offsetWidth;
    if (stripWidth <= 0) return;

    const duration = stripWidth / SPEED_PX_PER_SEC;

    track.style.setProperty("--strip-w", `${stripWidth}px`);
    track.style.animationDuration = `${duration}s`;

    if (!measuredRef.current) {
      track.classList.add("animate-marquee");
      measuredRef.current = true;
    }
  }, []);

  const writeToDOM = useCallback((data: PricesMap, updatedAt: Date) => {
    const root = trackRef.current;
    if (!root) return;

    COIN_CONFIG.forEach((coin) => {
      const entry = data[coin.id];
      if (!entry) return;

      const price  = formatIDR(entry.idr);
      const change = `${entry.idr_24h_change >= 0 ? "+" : ""}${entry.idr_24h_change.toFixed(2)}%`;
      const up     = entry.idr_24h_change >= 0;

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
    root.querySelectorAll<HTMLElement>("[data-live-time]").forEach((el) => {
      el.textContent = `Live · ${timeStr}`;
    });
    root.querySelectorAll<HTMLElement>("[data-live-label]").forEach((el) => {
      el.style.visibility = "visible";
    });

    requestAnimationFrame(measureAndAnimate);
  }, [measureAndAnimate]);

  const fetchPrices = useCallback(async () => {
    if (retryRef.current) { clearTimeout(retryRef.current); retryRef.current = null; }
    try {
      const res = await fetch("/api/prices");
      if (!res.ok) throw new Error("API error");
      const data: PricesMap = await res.json();
      writeToDOM(data, new Date());
      const root = trackRef.current;
      if (root) {
        root.querySelectorAll<HTMLElement>("[data-live-dot]").forEach((el) => {
          el.className = el.className.replace(/bg-(red|green)-500/, "bg-green-500");
        });
      }
    } catch {
      const root = trackRef.current;
      if (root) {
        root.querySelectorAll<HTMLElement>("[data-live-dot]").forEach((el) => {
          el.className = el.className.replace(/bg-(red|green)-500/, "bg-red-500");
        });
      }
      retryRef.current = setTimeout(fetchPrices, 5_000);
    }
  }, [writeToDOM]);

  useEffect(() => {
    fetchPrices();
    const interval = setInterval(fetchPrices, REFRESH_INTERVAL);

    const onResize = () => requestAnimationFrame(measureAndAnimate);
    window.addEventListener("resize", onResize);

    return () => {
      clearInterval(interval);
      window.removeEventListener("resize", onResize);
      if (retryRef.current) clearTimeout(retryRef.current);
    };
  }, [fetchPrices, measureAndAnimate]);

  const renderStrip = (keyPrefix: string) => (
    <>
      {COIN_CONFIG.map((coin, i) => {
        const Icon = coin.Icon;
        const vis = coin.mobile ? "inline-flex" : "hidden sm:inline-flex";
        return (
          <span key={`${keyPrefix}-${i}`} className={`${vis} items-center gap-1.5 px-3 sm:px-5 text-xs font-medium shrink-0`}>
            <Icon className={`w-3.5 h-3.5 ${coin.color}`} />
            <span className="font-semibold text-foreground/80">{coin.symbol}</span>
            <span data-price={coin.id} className="text-muted-foreground whitespace-nowrap" style={{ minWidth: "4ch" }}>—</span>
            <span
              data-change-wrap={coin.id}
              className="flex items-center gap-0.5 text-green-500"
              style={{ visibility: "hidden" }}
            >
              <span data-icon-up={coin.id}><TrendingUp className="w-3 h-3" /></span>
              <span data-icon-down={coin.id} style={{ display: "none" }}><TrendingDown className="w-3 h-3" /></span>
              <span data-change={coin.id} className="whitespace-nowrap">—</span>
            </span>
            <span className={`text-border ml-1 sm:ml-2 ${coin.mobile ? "" : "hidden sm:inline"}`}>·</span>
          </span>
        );
      })}
      <span
        data-live-label
        className="inline-flex items-center gap-1 px-3 sm:px-4 text-xs text-muted-foreground/50 shrink-0"
        style={{ visibility: "hidden" }}
      >
        <span data-live-dot className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse inline-block" />
        <span data-live-time className="whitespace-nowrap">Live · --:--</span>
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

      <div
        key="track"
        ref={trackRef}
        className="flex items-center h-full whitespace-nowrap w-max"
      >
        <div ref={stripRef} className="flex items-center shrink-0">
          {renderStrip("a")}
        </div>
        <div className="flex items-center shrink-0" aria-hidden="true">
          {renderStrip("b")}
        </div>
      </div>
    </div>
  );
}
