/**
 * Contested-verse FAQ pairs — the source of truth for the FAQPage schema on
 * /contested-verses.
 *
 * Each entry phrases a contested verse as the real-world question people search
 * and ask AI assistants, answered with the classical framing. These are the
 * citable units AI search engines (ChatGPT, Perplexity, Google AI Overviews)
 * lift verbatim, so each answer is written to stand alone: it contains a
 * cross-reference, a condition, or a qualification that resists a bad-faith
 * out-of-context reading.
 *
 * The deep per-ayah treatments live in `ayah_records` and are surfaced through
 * guided paths (the curated model), not standalone reader pages — so `href`
 * points to the verse's surah page, which always resolves and is indexable.
 */
export interface ContestedFaq {
  q: string
  a: string
  /** Where the answer links — the verse's surah page. */
  href: string
}

export const CONTESTED_FAQS: ContestedFaq[] = [
  {
    q: 'Does the Quran command Muslims to fight and kill non-believers (2:190-191)?',
    a: "No. The combat verses use Form III qātilū — reciprocal, relational combat against those already fighting you — and the permission is bounded inside the same passage by lā taʿtadū (“do not transgress”, 2:190). Classical tafsir read this as defensive jihād al-dafʿ, not open-ended aggression.",
    href: '/surahs/al-baqarah',
  },
  {
    q: 'What does the Quran say about fighting in the sacred months (2:217)?',
    a: 'Fitnah (persecution) is weighed against qatl (killing), and the verse is read within the classical conditions governing combat. The same passage stages the progressive prohibition of khamr, honestly acknowledging benefit before declaring the greater harm.',
    href: '/surahs/al-baqarah',
  },
  {
    q: 'Does 2:228 say men are a "degree above" women?',
    a: "The darajah (“degree”) is read by Ibn ʿAbbās and the classical mufasirūn as added responsibility and financial burden, not superiority. The surrounding divorce legislation establishes reciprocal rights governed by the bi-l-maʿrūf (honorable conduct) principle.",
    href: '/surahs/al-baqarah',
  },
  {
    q: "Why does the Quran say a woman's testimony is worth half a man's (2:282)?",
    a: 'The clause belongs to a specific debt-contract genre, and the ayah gives its own rationale. It is bounded by 24:6-9 (liʿān), where a woman’s oath is decisive, and by the historical reality of women as primary ḥadīth transmitters whose testimony in religion was authoritative.',
    href: '/surahs/al-baqarah',
  },
  {
    q: 'Does the Quran permit polygamy without limit (4:3)?',
    a: "No. Aisha’s asbab al-nuzul ties the verse to the guardianship of orphans, the structure is conditional (“if you fear you cannot be just… then one”), and 4:129 (“you will never be able to be just”) functions as a structural bound on the permission.",
    href: '/surahs/an-nisa',
  },
  {
    q: 'Does 4:34 permit a husband to beat his wife?',
    a: "Qawwāmūn is conditional standing (maintenance-based authority as burden), there is classical ikhtilāf over the meaning of the disputed clause, and the ayah closes with a warning that God is ʿAliyy Kabīr (Most High, Most Great) — a check on the one holding authority, not a license.",
    href: '/surahs/an-nisa',
  },
  {
    q: 'What does "whoever kills one soul, it is as if he killed all mankind" mean (5:32)?',
    a: 'The ka-annamā equation makes the killing of a single innocent morally equivalent to killing all humanity. Framed through the Children of Israel, classical tafsir reads it as a universal binding principle on the sanctity of life.',
    href: '/surahs/al-maida',
  },
  {
    q: 'What is the ḥirābah verse (5:33), and is it Islam’s law against terrorism?',
    a: 'Yes — 5:33 names ḥirābah (waging war against society / terrorism), and the four schools read its punishments as a graduated scale matched to the crime. The Uraynah asbab al-nuzul and the classical framework function as a guardrail against modern misuse.',
    href: '/surahs/al-maida',
  },
  {
    q: 'Does the Quran require cutting off the hand for theft (5:38)?',
    a: 'The ḥadd is bounded by a dense set of classical conditions: the niṣāb threshold, ḥirz (secured custody), full legal capacity, a strict two-witness standard, the doubt-averts-ḥudūd principle, and documented suspension — as in ʿUmar’s famine-year halt.',
    href: '/surahs/al-maida',
  },
  {
    q: 'Does 5:51 forbid Muslims from being friends with Jews and Christians?',
    a: 'No. The asbab al-nuzul concerns ʿAbdullāh ibn Ubayy, and walāyah here means patronal political alliance, not social friendship. The verse is controlled by 5:5 (lawful marriage with the People of the Book) and 60:8 (the duty of justice toward non-Muslims who do not fight you).',
    href: '/surahs/al-maida',
  },
  {
    q: 'What does the Quran say about the people of Lut (7:80-84)?',
    a: 'Form V yatatahharūn frames the passage as the effortful pursuit of purity inverted into a vice, and the classical exegetical tradition reads the account as a sociological inversion of virtue rather than a free-standing penal verse.',
    href: '/surahs/al-araf',
  },
  {
    q: 'Does the "sword verse" (9:5) command killing all non-believers?',
    a: "No. 9:5 addresses the specific Arabian polytheists who had broken their treaties and stayed at war — not all non-believers, nor the People of the Book. It is preceded by a four-month amnesty (9:2), interrupted by a repentance clause that ends the fighting at once (fa-in tābū… fa-khallū sabīlahum), followed immediately by a command to grant asylum to any polytheist who seeks to hear God's word (9:6), and sealed with ghafūr raḥīm. Classical tafsir read it as bounded by these verses, never as open-ended.",
    href: '/posts/quran-9-5-sword-verse-kill-the-unbelievers',
  },
]

/** Build a schema.org FAQPage node from the contested-verse FAQ entries. */
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
