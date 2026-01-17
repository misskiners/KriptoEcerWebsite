import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ThemeToggle } from "@/components/theme-toggle";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Zap,
  Shield,
  Wallet,
  Clock,
  ArrowRight,
  Bot,
  CreditCard,
  TrendingUp,
  CheckCircle2,
  MessageCircle,
  Coins,
  Send,
} from "lucide-react";
import { SiTelegram, SiBitcoin, SiEthereum } from "react-icons/si";
import { motion } from "framer-motion";

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

function Header() {
  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Coins className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-lg font-bold tracking-tight">KriptoEcer</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button asChild data-testid="button-header-cta">
            <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
              <SiTelegram className="w-4 h-4 mr-2" />
              Mulai Sekarang
            </a>
          </Button>
        </div>
      </div>
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-primary/5 via-transparent to-transparent" />
      <div className="absolute top-20 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-3xl" />
      <div className="absolute top-40 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial="initial"
          animate="animate"
          variants={staggerChildren}
          className="max-w-4xl mx-auto text-center"
        >
          <motion.div variants={fadeInUp}>
            <Badge variant="secondary" className="mb-6">
              <Zap className="w-3 h-3 mr-1" />
              Bot Telegram Crypto #1 Indonesia
            </Badge>
          </motion.div>

          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight mb-6"
          >
            Beli Crypto Eceran{" "}
            <span className="text-primary">dalam Hitungan Detik</span>
          </motion.h1>

          <motion.p
            variants={fadeInUp}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-8"
          >
            Transaksi cryptocurrency dengan nominal kecil, proses otomatis, dan tanpa ribet.
            Langsung dari Telegram favorit Anda.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Button size="lg" asChild data-testid="button-hero-start">
              <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="w-5 h-5 mr-2" />
                Buka Bot Telegram
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild data-testid="button-hero-learn">
              <a href="#cara-kerja">
                Pelajari Lebih Lanjut
              </a>
            </Button>
          </motion.div>

          <motion.div
            variants={fadeInUp}
            className="mt-12 flex flex-wrap items-center justify-center gap-6"
          >
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm">Transaksi Otomatis</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm">Minimum Rp10.000</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <CheckCircle2 className="w-4 h-4 text-primary" />
              <span className="text-sm">Proses Cepat</span>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-16 max-w-lg mx-auto"
        >
          <Card className="relative overflow-hidden bg-card/50 backdrop-blur">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-transparent" />
            <CardContent className="p-6 relative">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <p className="font-semibold">KriptoEcer Bot</p>
                  <p className="text-sm text-muted-foreground">@kriptoecerbot</p>
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="bg-muted/50 rounded-lg p-3">
                  <p className="text-sm">Selamat datang di KriptoEcer!</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Beli crypto dengan nominal kecil dalam hitungan detik.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <SiBitcoin className="w-5 h-5 text-orange-500" />
                  <SiEthereum className="w-5 h-5 text-blue-500" />
                  <span className="text-sm text-muted-foreground">+ banyak coin lainnya</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}

const features = [
  {
    icon: Zap,
    title: "Transaksi Instan",
    description: "Proses pembelian crypto selesai dalam hitungan detik. Tidak perlu menunggu lama.",
  },
  {
    icon: Wallet,
    title: "Nominal Kecil",
    description: "Mulai dari Rp10.000 saja. Cocok untuk beli coin untuk fee transfer atau coba-coba.",
  },
  {
    icon: Shield,
    title: "Aman & Terpercaya",
    description: "Sistem otomatis yang terjamin keamanannya. Transaksi Anda dilindungi.",
  },
  {
    icon: Bot,
    title: "Full Otomatis",
    description: "Bot memberikan instruksi lengkap. Transaksi mandiri tanpa perlu interaksi admin.",
  },
  {
    icon: CreditCard,
    title: "Metode Pembayaran Lengkap",
    description: "Transfer bank, e-wallet, QRIS, dan berbagai metode pembayaran lainnya.",
  },
  {
    icon: TrendingUp,
    title: "Harga Real-Time",
    description: "Harga cryptocurrency selalu update mengikuti pasar secara real-time.",
  },
];

function FeaturesSection() {
  return (
    <section id="fitur" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">Fitur Unggulan</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Mengapa Memilih KriptoEcer?
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Solusi terbaik untuk membeli cryptocurrency dengan nominal kecil secara praktis dan aman.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const steps = [
  {
    number: "01",
    icon: MessageCircle,
    title: "Buka Bot Telegram",
    description: "Cari @kriptoecerbot di Telegram atau klik tombol di halaman ini untuk langsung membuka bot.",
  },
  {
    number: "02",
    icon: Send,
    title: "Klik Start",
    description: "Klik tombol Start untuk memulai dan ikuti instruksi yang diberikan oleh bot.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Top Up Saldo",
    description: "Pilih metode pembayaran dan top up saldo sesuai kebutuhan Anda.",
  },
  {
    number: "04",
    icon: Coins,
    title: "Beli Crypto",
    description: "Pilih crypto yang ingin dibeli dan transaksi akan diproses secara otomatis!",
  },
];

function HowItWorksSection() {
  return (
    <section id="cara-kerja" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">Cara Kerja</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            4 Langkah Mudah untuk Memulai
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Proses yang simpel dan bisa dilakukan siapa saja, bahkan pemula sekalipun.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <Card className="h-full">
                <CardContent className="p-6 text-center">
                  <span className="text-5xl font-bold text-primary/20 absolute top-4 right-4">
                    {step.number}
                  </span>
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <step.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground text-sm">{step.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

const faqs = [
  {
    question: "Apa itu KriptoEcer?",
    answer: "KriptoEcer adalah bot Telegram yang memungkinkan Anda membeli cryptocurrency dengan nominal kecil secara instan dan otomatis. Cocok untuk pemula maupun yang sudah berpengalaman.",
  },
  {
    question: "Berapa minimal transaksi?",
    answer: "Minimal transaksi di KriptoEcer mulai dari Rp10.000 saja. Sangat cocok untuk Anda yang ingin mencoba atau membeli coin untuk keperluan fee transfer.",
  },
  {
    question: "Metode pembayaran apa saja yang tersedia?",
    answer: "Kami menyediakan berbagai metode pembayaran termasuk transfer bank, e-wallet (OVO, GoPay, Dana), QRIS, virtual account, dan metode pembayaran lainnya.",
  },
  {
    question: "Berapa lama proses transaksi?",
    answer: "Transaksi diproses secara otomatis dan biasanya selesai dalam hitungan detik hingga beberapa menit, tergantung metode pembayaran yang Anda pilih.",
  },
  {
    question: "Cryptocurrency apa saja yang tersedia?",
    answer: "Kami menyediakan berbagai cryptocurrency populer termasuk Bitcoin, Ethereum, dan berbagai altcoin lainnya. Silakan cek bot untuk daftar lengkapnya.",
  },
  {
    question: "Apakah aman bertransaksi di KriptoEcer?",
    answer: "Ya, KriptoEcer menggunakan sistem otomatis yang aman dan terjamin. Semua transaksi tercatat dan dapat diverifikasi.",
  },
];

function FAQSection() {
  return (
    <section id="faq" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="secondary" className="mb-4">FAQ</Badge>
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Temukan jawaban untuk pertanyaan umum seputar KriptoEcer.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger
                  className="text-left"
                  data-testid={`accordion-trigger-${index}`}
                >
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-2xl"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMwMDAiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-50" />
          
          <div className="relative p-8 sm:p-12 md:p-16 text-center">
            <Clock className="w-12 h-12 text-primary-foreground/80 mx-auto mb-6" />
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4">
              Siap Memulai Perjalanan Crypto Anda?
            </h2>
            <p className="text-primary-foreground/80 max-w-2xl mx-auto mb-8 text-lg">
              Bergabung sekarang dan nikmati kemudahan beli crypto eceran langsung dari Telegram.
              Proses cepat, aman, dan tanpa ribet!
            </p>
            <Button
              size="lg"
              variant="secondary"
              className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
              asChild
              data-testid="button-cta-start"
            >
              <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="w-5 h-5 mr-2" />
                Buka KriptoEcer Bot
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
              <Coins className="w-4 h-4 text-primary-foreground" />
            </div>
            <span className="font-semibold">KriptoEcer</span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            &copy; {new Date().getFullYear()} KriptoEcer. All rights reserved.
          </p>
          
          <Button variant="ghost" size="sm" asChild data-testid="button-footer-telegram">
            <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
              <SiTelegram className="w-4 h-4 mr-2" />
              @kriptoecerbot
            </a>
          </Button>
        </div>
      </div>
    </footer>
  );
}

export default function Landing() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <FeaturesSection />
        <HowItWorksSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
