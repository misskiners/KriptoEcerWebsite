import { useParams, Link } from "wouter";
import { motion, useScroll, useSpring } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Clock, ChevronLeft, Calendar, ArrowRight,
  BookOpen, Copy, Check, Share2, List, User,
} from "lucide-react";
import { SiTelegram, SiWhatsapp, SiX } from "react-icons/si";
import { useState, useEffect, useRef, useMemo } from "react";
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

interface ContentBlock {
  type: "heading" | "paragraph";
  text: string;
  id?: string;
}

function parseContent(content: string): ContentBlock[] {
  const paragraphs = content.split(/\n\n+/).map(p => p.trim()).filter(Boolean);
  let headingIdx = 0;
  return paragraphs.map((para) => {
    const isHeading = para.length < 80 && !para.endsWith(".") && !para.endsWith(",") && !para.endsWith("!");
    if (isHeading) {
      headingIdx++;
      return { type: "heading", text: para, id: `section-${headingIdx}` };
    }
    return { type: "paragraph", text: para };
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

function TableOfContents({ headings }: { headings: ContentBlock[] }) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0.1 },
    );

    headings.forEach((h) => {
      if (h.id) {
        const el = document.getElementById(h.id);
        if (el) observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length < 2) return null;

  const handleClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="my-8 rounded-xl border border-border/60 bg-muted/30 p-5"
    >
      <div className="flex items-center gap-2 mb-3 text-sm font-semibold text-foreground">
        <List className="w-4 h-4 text-primary" />
        Daftar Isi
      </div>
      <nav className="space-y-1">
        {headings.map((h) => (
          <button
            key={h.id}
            onClick={() => handleClick(h.id!)}
            className={`block w-full text-left text-sm py-1.5 px-3 rounded-lg transition-all duration-200
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-1 focus-visible:ring-offset-background ${
              activeId === h.id
                ? "text-primary bg-primary/10 font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
            }`}
            data-testid={`toc-${h.id}`}
          >
            {h.text}
          </button>
        ))}
      </nav>
    </motion.div>
  );
}

function ShareBar({ title }: { title: string }) {
  const [copied, setCopied] = useState(false);
  const [url, setUrl] = useState("");
  const copyTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setUrl(window.location.href);
  }, []);

  useEffect(() => () => { if (copyTimerRef.current) clearTimeout(copyTimerRef.current); }, []);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      if (copyTimerRef.current) clearTimeout(copyTimerRef.current);
      copyTimerRef.current = setTimeout(() => setCopied(false), 2500);
    } catch {}
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://wa.me/?text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleTelegram = () => {
    const text = encodeURIComponent(title);
    const link = encodeURIComponent(url);
    window.open(`https://t.me/share/url?url=${link}&text=${text}`, "_blank", "noopener,noreferrer");
  };

  const handleX = () => {
    const text = encodeURIComponent(`${title}\n${url}`);
    window.open(`https://x.com/intent/tweet?text=${text}`, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex items-center gap-2 flex-wrap py-4 border-y border-border/50">
      <span className="text-sm text-muted-foreground flex items-center gap-1.5 mr-1">
        <Share2 className="w-3.5 h-3.5" />
        Bagikan:
      </span>
      <button
        onClick={handleWhatsApp}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20
          hover:bg-green-500/20 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-testid="button-share-whatsapp"
      >
        <SiWhatsapp className="w-3.5 h-3.5" />
        WhatsApp
      </button>
      <button
        onClick={handleTelegram}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-blue-500/10 text-blue-400 border border-blue-500/20
          hover:bg-blue-500/20 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-testid="button-share-telegram"
      >
        <SiTelegram className="w-3.5 h-3.5" />
        Telegram
      </button>
      <button
        onClick={handleX}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-muted text-muted-foreground border border-border
          hover:bg-muted/80 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        data-testid="button-share-x"
      >
        <SiX className="w-3 h-3" />
        Post
      </button>
      <button
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-full
          bg-muted text-muted-foreground border border-border
          hover:bg-muted/80 transition-colors
          focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
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
    <div className="mt-14 pt-8 border-t border-border/50">
      <h3 className="font-bold text-lg mb-6 flex items-center gap-2">
        <BookOpen className="w-5 h-5 text-primary" />
        Artikel Terkait
      </h3>
      <div className="grid sm:grid-cols-3 gap-4">
        {related.map((article, i) => (
          <Link key={article.id} href={`/blog/${article.slug}`} className="group block" data-testid={`card-related-article-${article.id}`}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              <Card className="h-full overflow-hidden border border-border/60 hover:border-primary/30 hover:shadow-lg hover:shadow-primary/[0.05] transition-all duration-300">
                <div className={`h-32 bg-gradient-to-br ${article.coverGradient} relative overflow-hidden`}>
                  <img
                    src={`/images/blog/${article.slug}.jpg?v=2`}
                    alt={article.title}
                    width={1408}
                    height={768}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => { e.currentTarget.style.display = "none"; }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent" />
                </div>
                <CardContent className="p-4">
                  <span className={`text-[10px] font-semibold uppercase tracking-wide ${categoryCardStyle[article.category] ?? "text-muted-foreground"}`}>
                    {article.category}
                  </span>
                  <p className="text-sm font-semibold leading-snug mt-1.5 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {article.readTime} menit
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </Link>
        ))}
      </div>
    </div>
  );
}

function buildArticleStructuredData(article: Article) {
  const articleUrl = `${SITE_URL}/blog/${article.slug}`;
  const imageUrl = `${SITE_URL}/images/blog/${article.slug}.jpg?v=2`;
  return [
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Beranda", "item": `${SITE_URL}/` },
        { "@type": "ListItem", "position": 2, "name": "Blog", "item": `${SITE_URL}/blog` },
        { "@type": "ListItem", "position": 3, "name": article.title, "item": articleUrl },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "BlogPosting",
      "headline": article.title,
      "description": article.excerpt,
      "image": imageUrl,
      "url": articleUrl,
      "datePublished": article.publishedAt,
      "dateModified": article.publishedAt,
      "author": {
        "@type": "Organization",
        "name": article.author,
        "url": SITE_URL,
      },
      "publisher": {
        "@type": "Organization",
        "name": "KriptoEcer",
        "logo": { "@type": "ImageObject", "url": `${SITE_URL}/favicon.png` },
      },
      "mainEntityOfPage": { "@type": "WebPage", "@id": articleUrl },
      "articleSection": article.category,
      "inLanguage": "id-ID",
      "keywords": `crypto indonesia, ${article.category.toLowerCase()}, beli crypto, KriptoEcer`,
    },
  ];
}

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = articles.find((a) => a.slug === slug);

  const blocks = useMemo(
    () => (article ? parseContent(article.content) : []),
    [article],
  );

  const headings = useMemo(
    () => blocks.filter((b) => b.type === "heading"),
    [blocks],
  );

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {article ? (
        <SEO
          title={article.title}
          description={article.excerpt}
          canonical={`/blog/${article.slug}`}
          ogImage={`${SITE_URL}/images/blog/${article.slug}.jpg?v=2`}
          ogType="article"
          article={{
            publishedAt: typeof article.publishedAt === "string"
              ? article.publishedAt
              : new Date(article.publishedAt).toISOString(),
            author: article.author,
            section: article.category,
            tags: ["crypto", "indonesia", article.category.toLowerCase()],
          }}
          structuredData={buildArticleStructuredData(article)}
        />
      ) : (
        <SEO
          title="Artikel Tidak Ditemukan"
          description="Artikel yang kamu cari tidak tersedia. Cek artikel lainnya di blog KriptoEcer."
          noindex
        />
      )}
      {article && <ReadingProgressBar />}

      <PageHeader />

      <main className="pt-24 pb-20 flex-1">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <Link href="/blog" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-8" data-testid="link-back-blog">
              <ChevronLeft className="w-4 h-4" />
              Kembali ke Blog
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
                <div className={`rounded-2xl overflow-hidden mb-8 relative bg-gradient-to-br ${article.coverGradient ?? "from-primary/20 to-primary/5"}`}>
                  <div className="relative h-56 sm:h-72 md:h-80">
                    <img
                      src={`/images/blog/${article.slug}.jpg?v=2`}
                      alt={article.title}
                      width={1408}
                      height={768}
                      loading="eager"
                      decoding="async"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.currentTarget.style.display = "none"; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border backdrop-blur-sm inline-block mb-3 ${categoryStyle[article.category] ?? "bg-muted/80 text-muted-foreground border-border"}`}>
                        {article.category}
                      </span>
                      <h1 className="text-2xl sm:text-3xl font-bold leading-tight text-white drop-shadow-md" data-testid="text-article-title">
                        {article.title}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary/70" />
                    {formatDate(article.publishedAt)}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4 text-primary/70" />
                    {article.readTime} menit baca
                  </span>
                  <span className="flex items-center gap-1.5">
                    <User className="w-4 h-4 text-primary/70" />
                    {article.author}
                  </span>
                </div>

                <ShareBar title={article.title} />

                <blockquote className="text-muted-foreground text-lg leading-relaxed my-8 italic border-l-[3px] border-primary/40 pl-5 py-1">
                  {article.excerpt}
                </blockquote>

                {headings.length >= 2 && <TableOfContents headings={headings} />}

                <div className="space-y-6 text-[15px] sm:text-base leading-[1.8]">
                  {blocks.map((block, i) => {
                    if (block.type === "heading") {
                      return (
                        <h2
                          key={i}
                          id={block.id}
                          className="font-bold text-lg sm:text-xl text-foreground mt-12 mb-2 scroll-mt-24 flex items-center gap-2"
                        >
                          <span className="w-1 h-6 bg-primary rounded-full inline-block flex-shrink-0" />
                          {block.text}
                        </h2>
                      );
                    }
                    return (
                      <p key={i} className="text-foreground/85 leading-[1.85]">
                        {block.text}
                      </p>
                    );
                  })}
                </div>

                <div className="mt-10">
                  <ShareBar title={article.title} />
                </div>

                <div className="mt-10 rounded-2xl bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border border-primary/20 p-6 sm:p-8 text-center">
                  <h3 className="text-xl font-bold mb-2">Langsung Praktik Sekarang</h3>
                  <p className="text-muted-foreground text-sm mb-5 max-w-md mx-auto">
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

      <PageFooter />
    </div>
  );
}
