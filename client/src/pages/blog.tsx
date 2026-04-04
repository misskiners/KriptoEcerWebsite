import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/theme-toggle";
import { Clock, ArrowRight, Bot, BookOpen, ChevronLeft } from "lucide-react";
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

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08 }}
    >
      <Link href={`/blog/${article.slug}`}>
        <Card
          className="group h-full cursor-pointer overflow-hidden border border-border
            hover:border-primary/40 hover:shadow-lg hover:shadow-primary/5
            transition-all duration-300"
          data-testid={`card-article-${article.id}`}
        >
          <div className={`h-40 bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"} relative overflow-hidden`}>
            <div className="absolute inset-0 flex items-center justify-center opacity-10">
              <BookOpen className="w-20 h-20" />
            </div>
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${categoryStyle[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {article.category}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-foreground/60 bg-background/60 backdrop-blur-sm px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {article.readTime} menit
            </div>
          </div>

          <CardContent className="p-5">
            <h3 className="font-bold text-base leading-snug mb-2 group-hover:text-primary transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{article.author}</span>
              <span>{formatDate(article.publishedAt!)}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

function SkeletonCard() {
  return (
    <Card className="h-full overflow-hidden">
      <Skeleton className="h-40 w-full rounded-none" />
      <CardContent className="p-5 space-y-3">
        <Skeleton className="h-5 w-3/4" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-3 w-1/3 mt-4" />
      </CardContent>
    </Card>
  );
}

export default function BlogPage() {
  const { data: articles, isLoading } = useQuery<Article[]>({
    queryKey: ["/api/articles"],
  });

  return (
    <div className="min-h-screen bg-background">
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between gap-4">
          <a href="/" className="flex items-center gap-2" data-testid="link-blog-logo">
            <img src={logoImage} alt="KriptoEcer" className="w-8 h-8 rounded-md" />
            <span className="text-base font-bold tracking-tight">KriptoEcer</span>
            <span className="hidden sm:inline text-muted-foreground text-sm font-normal ml-1">/ Blog</span>
          </a>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Button asChild data-testid="button-blog-cta">
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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-12"
          >
            <Link href="/">
              <button className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6" data-testid="link-back-home">
                <ChevronLeft className="w-4 h-4" />
                Kembali ke Beranda
              </button>
            </Link>
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog & Artikel
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-blog-title">
              Tips, Panduan & Edukasi Crypto
            </h1>
            <p className="text-muted-foreground text-lg">
              Dari cara beli crypto pertama kali sampai strategi lanjutan — semua dalam bahasa Indonesia yang mudah dipahami.
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
            </div>
          ) : articles && articles.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {articles.map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20 text-muted-foreground">
              Belum ada artikel. Cek lagi nanti!
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-16 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-8 text-center"
          >
            <h2 className="text-2xl font-bold mb-3">Siap Mulai Beli Crypto?</h2>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto">
              Setelah baca panduannya, langsung praktik via bot Telegram @kriptoecerbot. Mulai dari Rp10.000, tanpa KYC.
            </p>
            <Button size="lg" asChild data-testid="button-blog-bot">
              <a href="https://t.me/kriptoecerbot" target="_blank" rel="noopener noreferrer">
                <SiTelegram className="w-5 h-5 mr-2" />
                Buka KriptoEcer Bot
                <ArrowRight className="w-4 h-4 ml-2" />
              </a>
            </Button>
          </motion.div>
        </div>
      </main>
    </div>
  );
}
