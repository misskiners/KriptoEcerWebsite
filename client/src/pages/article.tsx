import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { ThemeToggle } from "@/components/theme-toggle";
import { Clock, Bot, ChevronLeft, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import type { Article } from "@shared/schema";

const logoImage = "/favicon.png";

const categoryStyle: Record<string, string> = {
  Panduan: "bg-primary/10 text-primary border-primary/20",
  Edukasi: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Tips:    "bg-green-500/10 text-green-500 border-green-500/20",
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function ArticleSkeleton() {
  return (
    <div className="max-w-2xl mx-auto space-y-4 pt-8">
      <Skeleton className="h-8 w-3/4" />
      <Skeleton className="h-6 w-1/2" />
      <Skeleton className="h-52 w-full rounded-xl" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-5/6" />
    </div>
  );
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();

  const { data: article, isLoading, isError } = useQuery<Article>({
    queryKey: ["/api/articles", slug],
    queryFn: async () => {
      const res = await fetch(`/api/articles/${slug}`);
      if (!res.ok) throw new Error("Not found");
      return res.json();
    },
  });

  const paragraphs = article?.content
    .split(/\n\n+/)
    .map(p => p.trim())
    .filter(Boolean) ?? [];

  return (
    <div className="min-h-screen bg-background">
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

            {isLoading && <ArticleSkeleton />}

            {isError && (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">Artikel tidak ditemukan.</p>
                <Button asChild variant="outline">
                  <Link href="/blog">Lihat Semua Artikel</Link>
                </Button>
              </div>
            )}

            {article && (
              <motion.article
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                data-testid="article-content"
              >
                <div className={`rounded-2xl bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"} p-8 mb-8 relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center opacity-5">
                    <BookOpen className="w-48 h-48" />
                  </div>
                  <div className="relative">
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border inline-block mb-4 ${categoryStyle[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                      {article.category}
                    </span>
                    <h1 className="text-2xl sm:text-3xl font-bold leading-snug" data-testid="text-article-title">
                      {article.title}
                    </h1>
                    <div className="flex flex-wrap items-center gap-4 mt-4 text-sm text-foreground/70">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {formatDate(article.publishedAt!)}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {article.readTime} menit baca
                      </span>
                      <span className="font-medium">{article.author}</span>
                    </div>
                  </div>
                </div>

                <p className="text-muted-foreground text-lg leading-relaxed mb-8 italic border-l-2 border-primary/40 pl-4">
                  {article.excerpt}
                </p>

                <div className="space-y-5 text-base leading-relaxed">
                  {paragraphs.map((para, i) => (
                    <p key={i} className="text-foreground/90">
                      {para}
                    </p>
                  ))}
                </div>

                <div className="mt-12 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 text-center">
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

                <div className="mt-8 pt-6 border-t border-border">
                  <Link href="/blog">
                    <Button variant="outline" className="gap-2" data-testid="button-more-articles">
                      <BookOpen className="w-4 h-4" />
                      Baca Artikel Lainnya
                    </Button>
                  </Link>
                </div>
              </motion.article>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
