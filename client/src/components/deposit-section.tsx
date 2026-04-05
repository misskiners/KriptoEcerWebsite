import { useState, useMemo } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { QrCode, Building2, CreditCard, Bot, CheckCircle2, Zap, Shield, Clock } from "lucide-react";
import { SiPaypal } from "react-icons/si";

const TWEEN_FAST = { type: "tween" as const, duration: 0.2, ease: "easeOut" as const };
const TWEEN_NORMAL = { type: "tween" as const, duration: 0.35, ease: "easeOut" as const };

const QR_SEED = (() => {
  const vals: boolean[] = [];
  for (let i = 0; i < 49; i++) {
    const row = Math.floor(i / 7);
    const col = i % 7;
    const isFinderTL = row < 3 && col < 3;
    const isFinderTR = row < 3 && col > 3;
    const isFinderBL = row > 3 && col < 3;
    const isFilled = isFinderTL || isFinderTR || isFinderBL || (((i * 7 + 13) % 3) !== 0);
    vals.push(isFilled);
  }
  return vals;
})();

const QRISVisual = () => (
  <div className="flex flex-col items-center gap-4">
    <div className="relative group">
      <div className="absolute -inset-3 rounded-2xl bg-blue-500/10 blur-xl opacity-60 group-hover:opacity-80 transition-opacity duration-500" />
      <div className="relative w-44 h-44 bg-white dark:bg-gray-900 rounded-2xl p-3.5 shadow-xl border border-border/80 ring-1 ring-blue-500/10">
        <div className="grid grid-cols-7 grid-rows-7 gap-0.5 w-full h-full">
          {QR_SEED.map((filled, i) => {
            const row = Math.floor(i / 7);
            const col = i % 7;
            const isFinderCenter =
              (row === 1 && col === 1) ||
              (row === 1 && col === 5) ||
              (row === 5 && col === 1);
            return (
              <div
                key={i}
                className={`rounded-sm transition-colors duration-300 ${
                  isFinderCenter ? "bg-primary" :
                  filled ? "bg-gray-900 dark:bg-white" : "bg-transparent"
                }`}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/5 to-transparent pointer-events-none" />
      </div>
      <div className="absolute -top-2.5 -right-2.5 w-9 h-9 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg shadow-blue-500/30">
        <QrCode className="w-4 h-4 text-white" />
      </div>
    </div>
    <div className="text-center">
      <p className="font-bold text-xl mb-0.5">Rp 25.000</p>
      <p className="text-xs text-muted-foreground mb-3">Scan & bayar dari app manapun</p>
      <div className="flex items-center gap-1.5 justify-center flex-wrap">
        {["GoPay", "OVO", "Dana", "ShopeePay", "BCA", "Mandiri"].map(b => (
          <span key={b} className="text-[11px] px-2 py-0.5 rounded-full bg-muted/80 border border-border/60 font-medium backdrop-blur-sm">{b}</span>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-2 text-green-500 text-sm font-medium">
      <span className="relative flex h-2 w-2">
        <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
        <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
      </span>
      Konfirmasi otomatis &lt; 10 detik
    </div>
  </div>
);

const VAVisual = () => (
  <div className="w-full max-w-xs mx-auto">
    <div className="relative group">
      <div className="absolute -inset-2 rounded-2xl bg-green-500/8 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative bg-card rounded-2xl border border-border/80 shadow-xl overflow-hidden ring-1 ring-green-500/10">
        <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-4 text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
          <p className="text-xs opacity-80 font-medium">Virtual Account</p>
          <p className="text-lg font-bold">KriptoEcer Payment</p>
        </div>
        <div className="p-4 space-y-3">
          <div>
            <p className="text-xs text-muted-foreground">Nama Penerima</p>
            <p className="font-semibold">KriptoEcer Indonesia</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Nomor Virtual Account</p>
            <div className="flex items-center gap-2">
              <p className="font-mono font-bold text-lg tracking-wider">8277 •••• ••••</p>
            </div>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-border/60">
            <div>
              <p className="text-xs text-muted-foreground">Total Bayar</p>
              <p className="font-bold text-green-500 text-lg">Rp 50.000</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Berlaku</p>
              <p className="text-sm font-semibold">24 Jam</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-3">Transfer dari bank manapun · Konfirmasi otomatis</p>
  </div>
);

const PayPalVisual = () => (
  <div className="flex flex-col items-center gap-4 w-full max-w-xs mx-auto">
    <div className="relative group w-full">
      <div className="absolute -inset-2 rounded-2xl bg-blue-400/8 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative bg-card rounded-2xl border border-border/80 shadow-xl overflow-hidden ring-1 ring-blue-500/10 w-full">
        <div className="bg-[#003087] p-4 flex items-center justify-center gap-2 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-32 h-32 bg-[#009CDE]/20 rounded-full -translate-y-1/2 -translate-x-1/2" />
          <SiPaypal className="w-6 h-6 text-[#009CDE] relative" />
          <span className="text-white font-bold text-xl relative">PayPal</span>
        </div>
        <div className="p-4 space-y-3">
          <div className="bg-muted/40 rounded-xl p-3.5 text-center border border-border/40">
            <p className="text-xs text-muted-foreground">Kamu membayar</p>
            <p className="font-bold text-2xl">$3.20 USD</p>
            <p className="text-xs text-muted-foreground">(≈ Rp 50.000)</p>
          </div>
          <div className="text-sm text-muted-foreground text-center">
            <p>Kepada: <span className="text-foreground font-medium">kriptoecer@paypal.me</span></p>
          </div>
          <div className="w-full bg-[#FFB900] hover:bg-[#F5A900] text-black font-bold py-2.5 rounded-xl text-sm transition-colors text-center cursor-default">
            Bayar dengan PayPal
          </div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center">Cocok untuk pengguna internasional · Kurs otomatis</p>
  </div>
);

const CryptoBotVisual = () => (
  <div className="w-full max-w-xs mx-auto">
    <div className="relative group">
      <div className="absolute -inset-2 rounded-2xl bg-sky-500/8 blur-xl opacity-50 group-hover:opacity-70 transition-opacity duration-500" />
      <div className="relative bg-card rounded-2xl border border-border/80 shadow-xl overflow-hidden ring-1 ring-sky-500/10">
        <div className="bg-[#0088cc]/15 p-3 flex items-center gap-2 border-b border-border/60">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#0088cc] to-[#006699] flex items-center justify-center shadow-md shadow-[#0088cc]/20">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-semibold">CryptoBot</p>
            <p className="text-[10px] text-muted-foreground">@CryptoBot · Telegram</p>
          </div>
        </div>
        <div className="p-3 space-y-2 bg-muted/10 min-h-[130px]">
          <div className="flex justify-end">
            <div className="bg-primary text-primary-foreground text-xs px-3 py-1.5 rounded-xl rounded-tr-sm max-w-[70%] shadow-sm">
              /pay @kriptoecerbot 3 USDT
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-card border border-border/60 text-xs px-3 py-1.5 rounded-xl rounded-tl-sm max-w-[75%] shadow-sm">
              ✅ Transfer berhasil!<br />
              <span className="text-green-500 font-medium">3 USDT → @kriptoecerbot</span>
            </div>
          </div>
          <div className="flex justify-start">
            <div className="bg-card border border-border/60 text-xs px-3 py-1.5 rounded-xl rounded-tl-sm max-w-[75%] text-primary shadow-sm font-medium">
              Saldo kamu sudah aktif 🎉
            </div>
          </div>
        </div>
      </div>
    </div>
    <p className="text-xs text-muted-foreground text-center mt-3">Bayar pakai crypto · Transfer instan antar bot</p>
  </div>
);

const methods = [
  {
    id: "qris",
    label: "QRIS",
    icon: QrCode,
    color: "text-blue-500",
    glowColor: "shadow-blue-500/20",
    gradient: "from-blue-500 to-blue-600",
    ringColor: "ring-blue-500/30",
    title: "Scan QRIS, Bayar Instan",
    description: "Tersedia untuk semua bank & dompet digital. GoPay, OVO, Dana, ShopeePay, BCA, Mandiri, dan lainnya. Konfirmasi otomatis dalam hitungan detik.",
    visual: <QRISVisual />,
    step: 1,
  },
  {
    id: "va",
    label: "Virtual Account",
    icon: Building2,
    color: "text-green-500",
    glowColor: "shadow-green-500/20",
    gradient: "from-green-500 to-emerald-600",
    ringColor: "ring-green-500/30",
    title: "Transfer Bank via VA",
    description: "Nomor Virtual Account digenerate otomatis untuk tiap transaksi. Transfer dari bank manapun tanpa perlu konfirmasi manual.",
    visual: <VAVisual />,
    step: 2,
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: CreditCard,
    color: "text-[#009CDE]",
    glowColor: "shadow-blue-400/20",
    gradient: "from-[#003087] to-[#009CDE]",
    ringColor: "ring-blue-400/30",
    title: "Bayar via PayPal",
    description: "Untuk kamu yang lebih familiar dengan pembayaran internasional. Kurs USD ke IDR dikonversi otomatis.",
    visual: <PayPalVisual />,
    step: 3,
  },
  {
    id: "cryptobot",
    label: "CryptoBot",
    icon: Bot,
    color: "text-[#0088cc]",
    glowColor: "shadow-sky-500/20",
    gradient: "from-[#0088cc] to-[#006699]",
    ringColor: "ring-sky-500/30",
    title: "Deposit via CryptoBot",
    description: "Punya saldo crypto di CryptoBot Telegram? Transfer langsung ke @kriptoecerbot tanpa keluar dari aplikasi.",
    visual: <CryptoBotVisual />,
    step: 4,
  },
];

const trustBadges = [
  { icon: Zap, text: "Konfirmasi Instan", color: "text-primary" },
  { icon: Shield, text: "100% Otomatis", color: "text-green-500" },
  { icon: Clock, text: "24/7 Aktif", color: "text-blue-500" },
];

export function DepositSection() {
  const [active, setActive] = useState(0);
  const current = methods[active];
  const noMotion = !!useReducedMotion();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: noMotion ? 0 : 0.1 },
    },
  }), [noMotion]);

  const itemVariants = useMemo(() => ({
    hidden: noMotion ? { opacity: 1 } : { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: TWEEN_NORMAL },
  }), [noMotion]);

  return (
    <section id="deposit" className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-primary/[0.03] blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/[0.03] blur-[100px]" />
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-border/60 to-transparent" />
      </div>

      <div className="container mx-auto px-4 relative">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <motion.div variants={itemVariants} className="text-center mb-6">
            <Badge variant="secondary" className="mb-4 backdrop-blur-sm" data-testid="badge-deposit">Metode Deposit</Badge>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-deposit-title">
              4 Cara Deposit, Semua <span className="text-primary">Otomatis</span>
            </h2>
            <p className="text-base text-muted-foreground max-w-2xl mx-auto">
              Pilih metode pembayaran yang paling nyaman. Semua dikonfirmasi otomatis — tidak perlu chat admin, tidak perlu tunggu.
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="flex justify-center gap-3 sm:gap-4 mb-6 flex-wrap">
            {trustBadges.map((b) => (
              <div key={b.text} className="flex items-center gap-1.5 text-xs sm:text-sm text-muted-foreground">
                <b.icon className={`w-3.5 h-3.5 ${b.color}`} />
                <span>{b.text}</span>
              </div>
            ))}
          </motion.div>

          <motion.div variants={itemVariants} className="max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-10">
              {methods.map((m, i) => {
                const Icon = m.icon;
                const isActive = active === i;
                return (
                  <motion.button
                    key={m.id}
                    onClick={() => setActive(i)}
                    whileHover={noMotion ? undefined : { scale: 1.03 }}
                    whileTap={noMotion ? undefined : { scale: 0.97 }}
                    transition={TWEEN_FAST}
                    className={`relative flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl text-sm font-medium transition-all duration-300 border ${
                      isActive
                        ? `bg-gradient-to-r ${m.gradient} text-white border-transparent shadow-lg ${m.glowColor} ring-1 ${m.ringColor}`
                        : "bg-card/80 backdrop-blur-sm border-border/60 text-muted-foreground hover:border-primary/30 hover:text-foreground hover:bg-card"
                    }`}
                    data-testid={`button-deposit-${m.id}`}
                  >
                    {isActive && (
                      <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-primary-foreground text-primary text-[10px] font-bold flex items-center justify-center shadow-md">
                        {m.step}
                      </span>
                    )}
                    <Icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{m.label}</span>
                    <span className="sm:hidden">{m.id === "va" ? "VA" : m.id === "cryptobot" ? "Crypto" : m.label}</span>
                  </motion.button>
                );
              })}
            </div>

            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={noMotion ? false : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={noMotion ? { opacity: 0 } : { opacity: 0, x: 24 }}
                  transition={TWEEN_NORMAL}
                  className="space-y-5 order-2 lg:order-1"
                >
                  <div className="flex items-center gap-3">
                    <div className={`flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${current.gradient} shadow-lg ${current.glowColor}`}>
                      <current.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">Metode {current.step}/4</p>
                      <h3 className="text-xl sm:text-2xl font-bold" data-testid={`text-deposit-method-${current.id}`}>{current.title}</h3>
                    </div>
                  </div>

                  <p className="text-muted-foreground leading-relaxed text-sm sm:text-base">{current.description}</p>

                  <div className="flex flex-col gap-2.5">
                    <div className="flex items-center gap-2.5 text-sm font-medium text-green-500">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-green-500/10">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                      </div>
                      Konfirmasi otomatis tanpa admin
                    </div>
                    <div className="flex items-center gap-2.5 text-sm font-medium text-blue-500">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-blue-500/10">
                        <Shield className="w-3.5 h-3.5" />
                      </div>
                      Aman & terenkripsi
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.div
                  key={`visual-${active}`}
                  initial={noMotion ? false : { opacity: 0, scale: 0.93, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={noMotion ? { opacity: 0 } : { opacity: 0, scale: 0.93, y: -10 }}
                  transition={TWEEN_NORMAL}
                  className="flex justify-center order-1 lg:order-2"
                >
                  <div className="relative">
                    <div className={`absolute -inset-6 rounded-3xl bg-gradient-to-br ${current.gradient} opacity-[0.04] blur-2xl pointer-events-none`} />
                    <div className="relative">
                      {current.visual}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              variants={itemVariants}
              className="mt-10 flex flex-col items-center gap-4"
            >
              <div className="flex justify-center gap-2">
                {methods.map((m, i) => (
                  <button
                    key={i}
                    onClick={() => setActive(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      active === i ? `w-8 bg-gradient-to-r ${m.gradient}` : "w-2 bg-muted-foreground/20 hover:bg-muted-foreground/40"
                    }`}
                    data-testid={`button-deposit-dot-${i}`}
                  />
                ))}
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/40 text-xs text-muted-foreground">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="motion-safe:animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-green-500" />
                </span>
                Semua metode aktif 24/7 · Deposit mulai Rp10.000
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
