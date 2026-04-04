import { SiBitcoin, SiEthereum, SiSolana, SiBinance, SiTether, SiLitecoin, SiDogecoin } from "react-icons/si";
import { TrendingUp, TrendingDown } from "lucide-react";

const TrxIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 64 64" fill="currentColor" className={className}>
    <path d="M61.55 19.28c-3-2.77-7.15-4.92-10.13-7.09L22.76.15a2.18 2.18 0 00-1.27-.15H20a1.86 1.86 0 00-.68.35 1.14 1.14 0 00-.24.18l-.08.11L.55 26.12a2.08 2.08 0 00.33 2.78l27.35 26.74a2.08 2.08 0 002.82 0l30.48-33.68a2.08 2.08 0 000-2.68zM22.8 7.62l23.64 10-15.86 9.8zm-4.16 1.52v18.77l-8.12-8zm12 23.75l-21.08-20.59 8.84-11.51z" />
  </svg>
);

const tickers = [
  { Icon: SiBitcoin,  symbol: "BTC",  price: "Rp 1,64M",  change: "+2.4%", up: true,  color: "text-orange-500" },
  { Icon: SiEthereum, symbol: "ETH",  price: "Rp 51,2Jt", change: "+1.8%", up: true,  color: "text-blue-400"  },
  { Icon: SiSolana,   symbol: "SOL",  price: "Rp 2,43Jt", change: "-0.9%", up: false, color: "text-purple-500"},
  { Icon: SiBinance,  symbol: "BNB",  price: "Rp 9,87Jt", change: "+0.6%", up: true,  color: "text-yellow-500"},
  { Icon: SiTether,   symbol: "USDT", price: "Rp 16.220", change: "+0.1%", up: true,  color: "text-green-500" },
  { Icon: TrxIcon,    symbol: "TRX",  price: "Rp 428",    change: "+3.1%", up: true,  color: "text-red-500"   },
  { Icon: SiLitecoin, symbol: "LTC",  price: "Rp 1,42Jt", change: "-1.2%", up: false, color: "text-gray-400"  },
  { Icon: SiDogecoin, symbol: "DOGE", price: "Rp 2.890",  change: "+5.7%", up: true,  color: "text-amber-400" },
];

const items = [...tickers, ...tickers];

export function CryptoTicker() {
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
              <span className={`flex items-center gap-0.5 ${t.up ? "text-green-500" : "text-red-500"}`}>
                {t.up ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                {t.change}
              </span>
              <span className="text-border ml-2">·</span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
