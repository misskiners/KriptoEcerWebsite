import { articles } from "../shared/articles";
import { resolvePageMeta, escHtml } from "../shared/seo-meta";

function replaceMeta(html: string, name: string, attr: string, value: string): string {
  const re = new RegExp(`(<meta\\s+${attr}="${name}"\\s+content=")([^"]*)(")`, "i");
  if (re.test(html)) {
    return html.replace(re, `$1${escHtml(value)}$3`);
  }
  const re2 = new RegExp(`(<meta\\s+content=")([^"]*)(")\\s+${attr}="${name}"`, "i");
  if (re2.test(html)) {
    return html.replace(re2, `$1${escHtml(value)}$3`);
  }
  return html;
}

export function injectOgMeta(html: string, urlPath: string): string {
  const meta = resolvePageMeta(urlPath, (slug) =>
    articles.find((a) => a.slug === slug),
  );
  if (!meta) return html;

  let result = html;

  result = result.replace(/<title>[^<]*<\/title>/, `<title>${escHtml(meta.title)}</title>`);

  result = replaceMeta(result, "description", "name", meta.description);
  result = replaceMeta(result, "og:title", "property", meta.title);
  result = replaceMeta(result, "og:description", "property", meta.description);
  result = replaceMeta(result, "og:image", "property", meta.ogImage);
  result = replaceMeta(result, "og:type", "property", meta.ogType);
  result = replaceMeta(result, "og:url", "property", meta.canonical);
  result = replaceMeta(result, "twitter:title", "name", meta.title);
  result = replaceMeta(result, "twitter:description", "name", meta.description);
  result = replaceMeta(result, "twitter:image", "name", meta.ogImage);

  result = result.replace(
    /<link\s+rel="canonical"\s+href="[^"]*"\s*\/?>/i,
    `<link rel="canonical" href="${escHtml(meta.canonical)}" />`,
  );

  return result;
}
