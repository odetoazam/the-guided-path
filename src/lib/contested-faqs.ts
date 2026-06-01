/**
 * Contested-verse FAQ pairs — the single source of truth for AEO/FAQ schema.
 *
 * Each entry phrases a contested verse as the real-world question people search
 * and ask AI assistants, answered with the classical framing. These power:
 *   1. The FAQPage rich result on /contested-verses (the hub).
 *   2. Per-post FAQPage schema on the individual treatment pages (the pages
 *      Google and ChatGPT land on directly).
 *
 * The answers are the citable units AI search engines (ChatGPT, Perplexity,
 * Google AI Overviews) lift verbatim, so they are written to stand alone:
 * each contains a cross-reference, a condition, or a qualification that
 * resists a bad-faith out-of-context reading.
 *
 * `slug` is the /posts/<slug> page the answer links to. A null slug (e.g. 4:3,
 * which has no ayah-level post yet) still appears on the hub FAQ but emits no
 * per-post schema.
 */
export interface ContestedFaq {
  q: string
  a: string
  /** /posts/<slug> the answer expands into, or null if no post exists yet. */
  slug: string | null
  /** Fallback href when there is no post slug (e.g. a surah overview page). */
  href: string
}

export const CONTESTED_FAQS: ContestedFaq[] = [
  {
    q: 'Does the Quran command Muslims to fight and kill non-believers (2:190-191)?',
    a: "No. The combat verses use Form III qātilū — reciprocal, relational combat against those already fighting you — and the permission is bounded inside the same passage by lā taʿtadū (“do not transgress”, 2:190). Classical tafsir read this as defensive jihād al-dafʿ, not open-ended aggression.",
    slug: '002-188-191',
    href: '/posts/002-188-191',
  },
  {
    q: 'What does the Quran say about fighting in the sacred months (2:217)?',
    a: 'Fitnah (persecution) is weighed against qatl (killing), and the verse is read within the classical conditions governing combat. The same passage stages the progressive prohibition of khamr, honestly acknowledging benefit before declaring the greater harm.',
    slug: '002-217-220',
    href: '/posts/002-217-220',
  },
  {
    q: 'Does 2:228 say men are a "degree above" women?',
    a: "The darajah (“degree”) is read by Ibn ʿAbbās and the classical mufasirūn as added responsibility and financial burden, not superiority. The surrounding divorce legislation establishes reciprocal rights governed by the bi-l-maʿrūf (honorable conduct) principle.",
    slug: '002-225-232',
    href: '/posts/002-225-232',
  },
  {
    q: "Why does the Quran say a woman's testimony is worth half a man's (2:282)?",
    a: 'The clause belongs to a specific debt-contract genre, and the ayah gives its own rationale. It is bounded by 24:6-9 (liʿān), where a woman’s oath is decisive, and by the historical reality of women as primary ḥadīth transmitters whose testimony in religion was authoritative.',
    slug: '002-282-286',
    href: '/posts/002-282-286',
  },
  {
    q: 'Does the Quran permit polygamy without limit (4:3)?',
    a: "No. Aisha’s asbab al-nuzul ties the verse to the guardianship of orphans, the structure is conditional (“if you fear you cannot be just… then one”), and 4:129 (“you will never be able to be just”) functions as a structural bound on the permission.",
    slug: null,
    href: '/surahs/an-nisa',
  },
  {
    q: 'Does 4:34 permit a husband to beat his wife?',
    a: "Qawwāmūn is conditional standing (maintenance-based authority as burden), there is classical ikhtilāf over the meaning of the disputed clause, and the ayah closes with a warning that God is ʿAliyy Kabīr (Most High, Most Great) — a check on the one holding authority, not a license.",
    slug: '004-034',
    href: '/posts/004-034',
  },
  {
    q: 'What does "whoever kills one soul, it is as if he killed all mankind" mean (5:32)?',
    a: 'The ka-annamā equation makes the killing of a single innocent morally equivalent to killing all humanity. Framed through the Children of Israel, classical tafsir reads it as a universal binding principle on the sanctity of life.',
    slug: '005-032',
    href: '/posts/005-032',
  },
  {
    q: 'What is the ḥirābah verse (5:33), and is it Islam’s law against terrorism?',
    a: 'Yes — 5:33 names ḥirābah (waging war against society / terrorism), and the four schools read its punishments as a graduated scale matched to the crime. The Uraynah asbab al-nuzul and the classical framework function as a guardrail against modern misuse.',
    slug: '005-033-034',
    href: '/posts/005-033-034',
  },
  {
    q: 'Does the Quran require cutting off the hand for theft (5:38)?',
    a: 'The ḥadd is bounded by a dense set of classical conditions: the niṣāb threshold, ḥirz (secured custody), full legal capacity, a strict two-witness standard, the doubt-averts-ḥudūd principle, and documented suspension — as in ʿUmar’s famine-year halt.',
    slug: '005-038-039',
    href: '/posts/005-038-039',
  },
  {
    q: 'Does 5:51 forbid Muslims from being friends with Jews and Christians?',
    a: 'No. The asbab al-nuzul concerns ʿAbdullāh ibn Ubayy, and walāyah here means patronal political alliance, not social friendship. The verse is controlled by 5:5 (lawful marriage with the People of the Book) and 60:8 (the duty of justice toward non-Muslims who do not fight you).',
    slug: '005-051-053',
    href: '/posts/005-051-053',
  },
  {
    q: 'What does the Quran say about the people of Lut (7:80-84)?',
    a: 'Form V yatatahharūn frames the passage as the effortful pursuit of purity inverted into a vice, and the classical exegetical tradition reads the account as a sociological inversion of virtue rather than a free-standing penal verse.',
    slug: '007-080-084',
    href: '/posts/007-080-084',
  },
]

/** The FAQ for a given /posts/<slug>, or undefined if the slug isn't a contested verse. */
export function getContestedFaqForSlug(slug: string): ContestedFaq | undefined {
  return CONTESTED_FAQS.find((f) => f.slug === slug)
}

/** Build a schema.org FAQPage node from one or more FAQ entries. */
export function buildFaqPageJsonLd(faqs: ContestedFaq[], id: string, canonicalUrl: string) {
  return {
    '@type': 'FAQPage',
    '@id': id,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
        url: `${canonicalUrl}${f.href}`,
      },
    })),
  }
}
