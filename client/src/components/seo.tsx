import { Helmet } from "react-helmet-async";
import {
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  DEFAULT_TITLE,
  DEFAULT_DESC,
} from "@shared/seo-meta";

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  ogType?: "website" | "article";
  article?: {
    publishedAt: string;
    modifiedAt?: string;
    author?: string;
    section?: string;
    tags?: string[];
  };
  noindex?: boolean;
  structuredData?: object | object[];
}

export function SEO({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESC,
  canonical,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  article,
  noindex = false,
  structuredData,
}: SEOProps) {
  const fullTitle = title === DEFAULT_TITLE ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical ? `${SITE_URL}${canonical}` : undefined;
  const schemas = structuredData
    ? Array.isArray(structuredData) ? structuredData : [structuredData]
    : [];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={fullTitle} />
      <meta property="og:locale" content="id_ID" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}

      {article && <meta property="article:published_time" content={article.publishedAt} />}
      {article?.modifiedAt && <meta property="article:modified_time" content={article.modifiedAt} />}
      {article?.author && <meta property="article:author" content={article.author} />}
      {article?.section && <meta property="article:section" content={article.section} />}
      {article?.tags?.map((tag) => (
        <meta key={tag} property="article:tag" content={tag} />
      ))}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@kriptoecer" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      <link rel="alternate" hreflang="id" href={canonicalUrl ?? `${SITE_URL}/`} />
      <link rel="alternate" hreflang="x-default" href={canonicalUrl ?? `${SITE_URL}/`} />

      {schemas.map((schema, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      ))}
    </Helmet>
  );
}

export { SITE_URL, SITE_NAME };
