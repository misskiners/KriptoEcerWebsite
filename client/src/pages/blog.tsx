import { useState, useMemo } from "react";
import { Link } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, BookOpen, ChevronLeft, Calendar, Sparkles } from "lucide-react";
import { SiTelegram } from "react-icons/si";
import { articles } from "@shared/articles";
import type { Article } from "@shared/schema";
import { SEO, SITE_URL } from "@/components/seo";
import { PageHeader } from "@/components/page-header";
import { PageFooter } from "@/components/page-footer";

const categoryStyle: Record<string, string> = {
  Panduan: "bg-primary/10 text-primary border-primary/20",
  Edukasi: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  Tips:    "bg-green-500/10 text-green-500 border-green-500/20",
};

const categories = ["Semua", "Panduan", "Edukasi", "Tips"] as const;

const filterStyle: Record<string, { active: string; inactive: string }> = {
  Semua:   { active: "bg-primary text-primary-foreground", inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground" },
  Panduan: { active: "bg-primary text-primary-foreground", inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground" },
  Edukasi: { active: "bg-blue-500 text-white", inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground" },
  Tips:    { active: "bg-green-500 text-white", inactive: "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground" },
};

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString("id-ID", {
    day: "numeric", month: "long", year: "numeric",
  });
}

function FeaturedArticle({ article }: { article: Article }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-10"
    >
      <Link href={`/blog/${article.slug}`}>
        <div
          className="group relative cursor-pointer rounded-2xl overflow-hidden border border-border
            hover:border-primary/40 transition-all duration-500"
          data-testid={`card-featured-${article.id}`}
        >
          <div className={`relative h-64 sm:h-80 md:h-96 bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"} overflow-hidden`}>
            <img
              src={`/images/blog/${article.slug}.png`}
              alt={article.title}
              width={1408}
              height={768}
              loading="eager"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 md:p-10">
            <div className="flex items-center gap-3 mb-4">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border backdrop-blur-sm ${categoryStyle[article.category] ?? "bg-muted/80 text-muted-foreground border-border"}`}>
                {article.category}
              </span>
              <span className="flex items-center gap-1 text-xs text-white/70">
                <Clock className="w-3 h-3" />
                {article.readTime} menit baca
              </span>
              <span className="flex items-center gap-1 text-xs text-white/70">
                <Calendar className="w-3 h-3" />
                {formatDate(article.publishedAt)}
              </span>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-white leading-tight mb-3 group-hover:text-primary transition-colors duration-300 max-w-2xl drop-shadow-md">
              {article.title}
            </h2>
            <p className="text-sm sm:text-base text-white/70 leading-relaxed line-clamp-2 max-w-xl">
              {article.excerpt}
            </p>

            <div className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:gap-3 transition-all duration-300">
              Baca Selengkapnya
              <ArrowRight className="w-4 h-4" />
            </div>
          </div>

          <div className="absolute top-4 right-4">
            <span className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground backdrop-blur-sm">
              <Sparkles className="w-3 h-3" />
              Terbaru
            </span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function ArticleCard({ article, index }: { article: Article; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
      layout
    >
      <Link href={`/blog/${article.slug}`}>
        <Card
          className="group h-full cursor-pointer overflow-hidden border border-border/60
            hover:border-primary/40 hover:shadow-xl hover:shadow-primary/[0.07]
            transition-all duration-300 bg-card/50 backdrop-blur-sm"
          data-testid={`card-article-${article.id}`}
        >
          <div className={`h-48 bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"} relative overflow-hidden`}>
            <img
              src={`/images/blog/${article.slug}.png`}
              alt={article.title}
              width={1408}
              height={768}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${categoryStyle[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {article.category}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-white/90 bg-black/40 backdrop-blur-sm px-2.5 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {article.readTime} menit
            </div>
          </div>

          <CardContent className="p-5">
            <h3 className="font-bold text-base leading-snug mb-2.5 group-hover:text-primary transition-colors duration-300 line-clamp-2">
              {article.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
              {article.excerpt}
            </p>
            <div className="flex items-center justify-between text-xs text-muted-foreground pt-3 border-t border-border/50">
              <span className="font-medium">{article.author}</span>
              <span>{formatDate(article.publishedAt)}</span>
            </div>
          </CardContent>
        </Card>
      </Link>
    </motion.div>
  );
}

const blogStructuredData = [
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Beranda", "item": `${SITE_URL}/` },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
    ],
  },
  {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Blog Crypto Indonesia — KriptoEcer",
    "description": "Panduan, tips, dan edukasi crypto dalam bahasa Indonesia. Baca artikel tentang cara beli crypto, top up fee gas, dan strategi investasi untuk pemula.",
    "url": `${SITE_URL}/blog`,
    "publisher": {
      "@type": "Organization",
      "name": "KriptoEcer",
      "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` },
    },
    "hasPart": articles.map((a) => ({
      "@type": "BlogPosting",
      "headline": a.title,
      "description": a.excerpt,
      "url": `${SITE_URL}/blog/${a.slug}`,
      "datePublished": a.publishedAt,
      "author": { "@type": "Organization", "name": a.author },
    })),
  },
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<string>("Semua");

  const sortedArticles = useMemo(
    () => [...articles].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()),
    [],
  );

  const featured = sortedArticles[0];

  const filteredArticles = useMemo(() => {
    const rest = sortedArticles.slice(1);
    if (activeCategory === "Semua") return rest;
    return rest.filter((a) => a.category === activeCategory);
  }, [sortedArticles, activeCategory]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <SEO
        title="Blog Crypto Indonesia — Tips, Panduan & Edukasi"
        description="Panduan lengkap crypto dalam bahasa Indonesia. Tips beli crypto, cara top up fee gas SOL/TRX/BNB, edukasi blockchain, dan panduan pemula dari KriptoEcer."
        canonical="/blog"
        structuredData={blogStructuredData}
      />
      <PageHeader breadcrumb="Blog" />

      <main className="pt-24 pb-20 flex-1">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl mb-10"
          >
            <Link href="/" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6" data-testid="link-back-home">
              <ChevronLeft className="w-4 h-4" />
              Kembali ke Beranda
            </Link>
            <Badge variant="secondary" className="mb-4">
              <BookOpen className="w-3 h-3 mr-1" />
              Blog & Artikel
            </Badge>
            <h1 className="text-3xl sm:text-4xl font-bold mb-4" data-testid="text-blog-title">
              Tips, Panduan & Edukasi Crypto
            </h1>
            <p className="text-muted-foreground text-lg leading-relaxed">
              Dari cara beli crypto pertama kali sampai strategi lanjutan — semua dalam bahasa Indonesia yang mudah dipahami.
            </p>
          </motion.div>

          {featured && <FeaturedArticle article={featured} />}

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 mb-8 flex-wrap"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-sm font-medium px-4 py-2 rounded-full border border-transparent transition-all duration-200
                  focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background ${
                  activeCategory === cat
                    ? filterStyle[cat].active
                    : filterStyle[cat].inactive
                }`}
                data-testid={`filter-${cat.toLowerCase()}`}
              >
                {cat}
                {cat !== "Semua" && (
                  <span className="ml-1.5 text-xs opacity-70">
                    ({sortedArticles.slice(1).filter((a) => a.category === cat).length})
                  </span>
                )}
              </button>
            ))}
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {filteredArticles.length === 0 ? (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">Belum ada artikel di kategori ini.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredArticles.map((article, i) => (
                    <ArticleCard key={article.id} article={article} index={i} />
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>

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

      <PageFooter />
    </div>
  );
}
