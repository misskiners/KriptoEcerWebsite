import { useParams, Link } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock, Bot, ChevronLeft, Calendar, ArrowRight,
  BookOpen, Copy, Check, Share2,
} from "lucide-react";
import { SiTelegram, SiWhatsapp } from "react-icons/si";
import { useState, useEffect } from "react";
import { articles } from "@shared/articles";
import type { Article } from "@shared/schema";

const logoImage = "/favicon.png";

const categoryStyle: Record<string, string> = {
  Panduan: "bg-primary/10 text-primary border-primary/20",
  Edukasi: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Tips:    "bg-green-500/10 text-green-500 border-green-500/20",
};

const categoryCardStyle: Record<string, string> = {
  Panduan: "text-primary",
  Edukasi: "text-blue-500",
  Tips:    "text-green-500",
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function ReadingProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 });

  return (
    <motion.div
      style={{ scaleX, transformOrigin: "0%" }}
      className="fixed top-0 left-0 right-0 h-[3px] bg-primary z-[60] rounded-full"
    />
  );
}

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap mt-4 pt-4 border-t border-border">
      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Bagikan:
      </span>
      <button
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20
          hover:bg-green-500/20 transition-colors"
        data-testid="button-share-whatsapp"
      >
        <SiWhatsapp className="w-3.5 h-3.5" />
        WhatsApp
      </button>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-muted text-muted-foreground border border-border
          hover:bg-muted/80 transition-colors"
        data-testid="button-share-copy"
      >
        {copied
          ? <><Check className="w-3.5 h-3.5 text-green-500" /><span className="text-green-500">Tersalin!</span></>
          : <><Copy className="w-3.5 h-3.5" />Salin Link</>
        }
      </button>
    </div>
  );
}

function RelatedArticles({ current }: { current: Article }) {
  const sameCategory = articles.filter(
    (a) => a.id !== current.id && a.category === current.category,
  );
  const others = articles.filter(
    (a) => a.id !== current.id && a.category !== current.category,
  );
  const related = [...sameCategory, ...others].slice(0, 3);

  if (related.length === 0) return null;

  return (
    <div className="mt-12 pt-8 border-t border-border">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Artikel Terkait
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((article, i) => (
          <motion.a
            key={article.id}
            href={`/blog/${article.slug}`}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
            className="group block"
            data-testid={`card-related-article-${article.id}`}
          >
            <Card className="h-full overflow-hidden border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300">
              <div className={`h-28 bg-gradient-to-br ${article.coverGradient} relative overflow-hidden`}>
                <img
                  src={`/images/blog/${article.slug}.png`}
                  alt={article.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.currentTarget.style.display = "none"; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
              <CardContent className="p-3">
                <span className={`text-[10px] font-semibold uppercase tracking-wide ${categoryCardStyle[article.category] ?? "text-muted-foreground"}`}>
                  {article.category}
                </span>
                <p className="text-sm font-semibold leading-snug mt-1 line-clamp-2 group-hover:text-primary transition-colors">
                  {article.title}
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  {article.readTime} menit
                </p>
              </CardContent>
            </Card>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  const paragraphs = article?.content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-background">
      {article && <ReadingProgressBar />}

      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" data-testid="link-article-logo">
            <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
            <span className="text-base font-bold tracking-tight">KriptoEcer</span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild data-testid="button-article-cta">
              <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                <Bot className="w-4 h-4 mr-1.5" />
                Start Bot
              </a>
            </Button>
          </div>
        </div>
      </motion.header>

      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-blog">
                <ChevronLeft className="w-4 h-4" />
                Kembali ke Blog
              </button>
            </Link>

            {!article ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">Artikel tidak ditemukan.</p>
                <Button asChild variant="outline">
                  <Link href="/blog">Lihat Semua Artikel</Link>
                </Button>
              </div>
            ) : (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="article-content"
              >
                <div className={`rounded-2xl overflow-hidden mb-6 relative bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"}`}>
                  <div className="relative h-56 sm:h-72">
                    <img
                      src={`/images/blog/${article.slug}.png`}
                      alt={article.title}
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm inline-block mb-3 ${categoryStyle[article.category] ?? "bg-muted/80 text-muted-foreground border-border"}`}>
                        {article.category}
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-bold leading-snug text-white drop-shadow-md" data-testid="text-article-title">
                        {article.title}
                      </h1>
                    </div>
                  </div>
                  <div className="px-6 py-4 bg-muted/30 flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" />
                      {formatDate(article.publishedAt)}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5" />
                      {article.readTime} menit baca
                    </span>
                    <span className="font-medium">{article.author}</span>
                  </div>
                </div>

                <ShareBar title={article.title} />

                <p className="text-muted-foreground text-lg leading-relaxed my-8 italic border-l-2 border-primary/40 pl-4">
                  {article.excerpt}
                </p>

                <div className="space-y-5 text-base leading-relaxed">
                  {paragraphs.map((para, i) => {
                    const isHeading = para.length < 80 && !para.endsWith(".") && !para.endsWith(",");
                    return (
                      <p
                        key={i}
                        className={
                          isHeading
                            ? "font-bold text-lg text-foreground mt-10 mb-1"
                            : "text-foreground/90"
                        }
                      >
                        {para}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-10">
                  <ShareBar title={article.title} />
                </div>

                <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 text-center">
                  <h3 className="text-xl font-bold mb-2">Langsung Praktik Sekarang</h3>
                  <p className="text-muted-foreground text-sm mb-5">
                    Mulai beli crypto mulai Rp10.000 via bot Telegram. Tanpa KYC, tanpa ribet, proses otomatis 24 jam.
                  </p>
                  <Button asChild data-testid="button-article-bot">
                    <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                      <SiTelegram className="w-4 h-4 mr-2" />
                      Buka @kriptoecerbot
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </Button>
                </div>

                <RelatedArticles current={article} />
              </motion.article>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
