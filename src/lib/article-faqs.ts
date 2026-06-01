/**
 * Per-article FAQ registry — the AEO layer for individual posts.
 *
 * Maps a post slug to a set of question/answer pairs that emit a schema.org
 * FAQPage on that article's page. Each answer is written to stand alone: it is
 * the citable unit AI search engines (ChatGPT, Perplexity, Google AI Overviews)
 * lift verbatim, so it carries a condition, a cross-reference, or a
 * qualification that survives being quoted out of context.
 *
 * This is the hand-seeded version proven on one article. The templated version
 * (extracting FAQ from a DB column or article frontmatter) rides on top of the
 * same `buildArticleFaqJsonLd` shape.
 */
export interface ArticleFaq {
  q: string
  a: string
}

export const ARTICLE_FAQS: Record<string, ArticleFaq[]> = {
  'quran-9-5-sword-verse-kill-the-unbelievers': [
    {
      q: "Does Quran 9:5 command Muslims to kill all non-believers?",
      a: "No. Quran 9:5 addresses a specific group — the Arabian polytheists who had broken their treaties with the Muslim community and remained at war — not all non-believers, and explicitly not the People of the Book. Classical tafsir (al-Ṭabarī, Ibn Kathīr, al-Qurṭubī) read it as the instruction for an active battlefield against treaty-breakers, bounded by the verses around it.",
    },
    {
      q: "What is the context of the 'sword verse' (9:5)?",
      a: "The verse follows 9:2, which grants those same treaty-breakers a four-month amnesty (muhlat) to move freely. It is followed immediately by 9:6, which commands granting asylum to any polytheist who seeks protection to hear the word of God and escorting him to safety. The verse sits between an amnesty before it and an asylum after it.",
    },
    {
      q: "Does 9:5 offer the enemy a way out?",
      a: "Yes. The verse turns on a single condition — fa-in tābū, 'but if they repent' — after which it commands fa-khallū sabīlahum, 'then let their way be free' (Form II khallū, a total release). The threshold to safety is public and deliberately low: repent and rejoin the community's prayer and zakah. The verse then seals on two names of mercy: 'Indeed, Allah is Forgiving, Merciful.'",
    },
    {
      q: "Is the 'sword verse' abrogated or limited?",
      a: "Classical scholars debated the mechanism — some held it specified (takhṣīṣ) to the treaty-breaking polytheists, others discussed abrogation (naskh) of earlier verses — but none read it as an open-ended command against all non-Muslims. The disagreement inside the tradition was about which boundary applies, never whether the verse was bounded.",
    },
  ],
}

export function getArticleFaqs(slug: string): ArticleFaq[] | undefined {
  return ARTICLE_FAQS[slug]
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
