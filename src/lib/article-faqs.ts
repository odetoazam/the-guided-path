/**
 * The AEO FAQ layer for articles — auto-derived from the article's own content.
 *
 * Any published article that includes a visible "Frequently asked questions"
 * section (an <h2> titled FAQ / Frequently Asked Questions / Common Questions,
 * followed by <h3> question / <p> answer pairs) automatically emits a schema.org
 * FAQPage. There is no per-article registry to maintain and the schema can never
 * drift from what a reader actually sees — the visible section IS the source.
 *
 * Authoring convention: one <p> immediately after each <h3> is the answer.
 * Write each answer to stand alone — it is the unit AI search engines (ChatGPT,
 * Perplexity, Google AI Overviews) lift verbatim, so it should carry a
 * condition, a cross-reference, or a qualification that survives being quoted
 * out of context.
 */
export interface ArticleFaq {
  q: string
  a: string
}

function stripHtml(s: string): string {
  return s
    .replace(/<[^>]+>/g, '')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

/** Pull FAQ pairs out of an article's content_html FAQ section (empty if none). */
export function extractFaqFromHtml(html: string | null | undefined): ArticleFaq[] {
  if (!html) return []
  const section = html.match(
    /<h2[^>]*>\s*(?:frequently\s+asked\s+questions|faqs?|common\s+questions)\b[\s\S]*?(?=<h2[^>]*>|$)/i,
  )
  if (!section) return []
  const faqs: ArticleFaq[] = []
  const pair = /<h3[^>]*>([\s\S]*?)<\/h3>\s*<p[^>]*>([\s\S]*?)<\/p>/gi
  let m: RegExpExecArray | null
  while ((m = pair.exec(section[0])) !== null) {
    const q = stripHtml(m[1])
    const a = stripHtml(m[2])
    if (q && a) faqs.push({ q, a })
  }
  return faqs
}

/** Build a schema.org FAQPage node from a post's FAQ entries. */
export function buildArticleFaqJsonLd(faqs: ArticleFaq[], id: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  }
}
