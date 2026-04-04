import { Link } from "wouter";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, ArrowRight, BookOpen, ChevronLeft } from "lucide-react";
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
          <div className={`h-44 bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"} relative overflow-hidden`}>
            <img
              src={`/images/blog/${article.slug}.png`}
              alt={article.title}
              loading={index === 0 ? "eager" : "lazy"}
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              onError={(e) => { e.currentTarget.style.display = "none"; }}
            />
            <div className="absolute top-3 left-3">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm ${categoryStyle[article.category] ?? "bg-muted text-muted-foreground border-border"}`}>
                {article.category}
              </span>
            </div>
            <div className="absolute bottom-3 right-3 flex items-center gap-1 text-xs text-foreground/80 bg-background/70 backdrop-blur-sm px-2 py-1 rounded-full">
              <Clock className="w-3 h-3" />
              {article.readTime} menit
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
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
            className="max-w-2xl mb-12"
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
            <p className="text-muted-foreground text-lg">
              Dari cara beli crypto pertama kali sampai strategi lanjutan — semua dalam bahasa Indonesia yang mudah dipahami.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...articles]
              .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
              .map((article, i) => (
                <ArticleCard key={article.id} article={article} index={i} />
              ))}
          </div>

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
