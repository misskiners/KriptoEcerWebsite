import { Link } from "wouter";
import { Shield, ArrowRight, TrendingUp } from "lucide-react";
import { SiTelegram, SiWhatsapp, SiX, SiBitcoin, SiEthereum, SiSolana, SiTether, SiBinance } from "react-icons/si";

const logoImage = "/favicon.png";

const NAV = [
  { href: "/#fitur", label: "Fitur" },
  { href: "/#cara-kerja", label: "Cara Kerja" },
  { href: "/#deposit", label: "Deposit" },
  { href: "/#faq", label: "FAQ" },
  { href: "/blog", label: "Blog & Artikel" },
] as const;

const LEGAL = [
  { href: "/terms", label: "Syarat & Ketentuan" },
  { href: "/privacy", label: "Kebijakan Privasi" },
  { href: "/risk", label: "Pengungkapan Risiko" },
  { href: "/refund", label: "Kebijakan Refund" },
] as const;

const SOCIALS = [
  { href: "https://t.me/kriptoecerbot", icon: SiTelegram, iconColor: "text-[#0088cc]", bg: "bg-[#0088cc]/10", label: "@kriptoecerbot", sub: "Mulai Transaksi" },
  { href: "https://t.me/kriptoecerofficial", icon: SiTelegram, iconColor: "text-[#0088cc]", bg: "bg-[#0088cc]/10", label: "@kriptoecerofficial", sub: "Channel Resmi" },
  { href: "https://t.me/kriptoecerchannel", icon: TrendingUp, iconColor: "text-green-500", bg: "bg-green-500/10", label: "Log Transaksi", sub: "Live update" },
  { href: "https://x.com/kriptoecer", icon: SiX, iconColor: "text-white/50", bg: "bg-white/[0.07]", label: "@kriptoecer", sub: "Update & Promo" },
  { href: "https://wa.me/message/TROCGBTMIGOKB1", icon: SiWhatsapp, iconColor: "text-[#25D366]", bg: "bg-[#25D366]/10", label: "WhatsApp CS", sub: "Chat langsung" },
] as const;

const COINS = [
  { Icon: SiBitcoin, color: "#F7931A", label: "BTC" },
  { Icon: SiEthereum, color: "#627EEA", label: "ETH" },
  { Icon: SiSolana, color: "#9945FF", label: "SOL" },
  { Icon: SiTether, color: "#26A17B", label: "USDT" },
  { Icon: SiBinance, color: "#F3BA2F", label: "BNB" },
] as const;

export function PageFooter() {
  return (
    <footer className="relative bg-zinc-950 border-t border-white/[0.07] overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.035) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

      <div className="relative container mx-auto px-4 pt-12 pb-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-10 mb-10">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-3" data-testid="link-footer-logo">
              <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
              <span className="font-bold text-base text-white">KriptoEcer</span>
            </Link>
            <p className="text-[13px] text-white/40 mb-5 leading-relaxed">
              Bot Telegram jual beli crypto otomatis. Mulai Rp10.000, tanpa KYC, deposit otomatis, aktif 24/7.
            </p>
            <div className="flex items-center gap-2 mb-4">
              <a href="https://t.me/kriptoecerofficial" target="_blank" rel="noopener noreferrer"
                data-testid="link-footer-telegram"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-[#0088cc]/20 text-white/40 hover:text-[#0088cc] transition-colors">
                <SiTelegram className="w-3.5 h-3.5" />
              </a>
              <a href="https://wa.me/message/TROCGBTMIGOKB1" target="_blank" rel="noopener noreferrer"
                data-testid="link-footer-whatsapp"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-[#25D366]/20 text-white/40 hover:text-[#25D366] transition-colors">
                <SiWhatsapp className="w-3.5 h-3.5" />
              </a>
              <a href="https://x.com/kriptoecer" target="_blank" rel="noopener noreferrer"
                data-testid="link-footer-x"
                className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.07] hover:bg-white/[0.14] text-white/40 hover:text-white transition-colors">
                <SiX className="w-3 h-3" />
              </a>
            </div>
            <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer"
              data-testid="link-footer-open-bot"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-black text-sm font-semibold hover:bg-primary/85 transition-colors">
              <SiTelegram className="w-3.5 h-3.5" />
              Buka Bot
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">Navigasi</h4>
            <ul className="space-y-3">
              {NAV.map(({ href, label }) => (
                <li key={label}>
                  {href.startsWith("/#") ? (
                    <a href={href} className="text-sm text-white/45 hover:text-white transition-colors">{label}</a>
                  ) : (
                    <Link href={href} className="text-sm text-white/45 hover:text-white transition-colors">{label}</Link>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">Legal</h4>
            <ul className="space-y-3">
              {LEGAL.map(({ href, label }) => (
                <li key={label}>
                  <Link href={href} className="text-sm text-white/45 hover:text-white transition-colors">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-2 md:col-span-1">
            <h4 className="text-[11px] font-semibold text-white/35 uppercase tracking-widest mb-4">Kontak & Channel</h4>
            <ul className="space-y-3">
              {SOCIALS.map(({ href, icon: Icon, iconColor, bg, label, sub }) => (
                <li key={label}>
                  <a href={href} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2.5 group">
                    <div className={`w-7 h-7 rounded-lg ${bg} flex items-center justify-center flex-shrink-0`}>
                      <Icon className={`w-3.5 h-3.5 ${iconColor}`} />
                    </div>
                    <div>
                      <div className="text-[12px] font-medium text-white/60 group-hover:text-white transition-colors leading-tight">{label}</div>
                      <div className="text-[11px] text-white/30 leading-tight">{sub}</div>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/[0.06] pt-6 mb-5">
          <p className="text-[11px] text-white/25 leading-relaxed">
            <Shield className="w-3 h-3 inline mr-1 mb-0.5 text-white/35" />
            <strong className="text-white/35">Disclaimer Risiko:</strong>{" "}
            Investasi cryptocurrency mengandung risiko tinggi dan nilai aset dapat berfluktuasi secara signifikan. KriptoEcer hanya menyediakan layanan pertukaran, bukan merupakan saran investasi. Pastikan Anda memahami risiko sebelum melakukan transaksi.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/25" data-testid="text-footer-copyright">
            &copy; {new Date().getFullYear()} KriptoEcer. All rights reserved.
          </p>
          <div className="flex items-center gap-3">
            {COINS.map(({ Icon, color, label }) => (
              <div key={label} className="flex items-center gap-1">
                <Icon style={{ color }} className="w-3 h-3 opacity-40" />
                <span className="text-[10px] text-white/25">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
