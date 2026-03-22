import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/understanding-quran`

export const metadata: Metadata = {
  title: 'How to Read the Quran with Understanding — A Guide to Tafsir & Tadabbur | AyahGuide',
  description: 'A complete, practical guide to tafsir and tadabbur — the tools scholars use to understand the Quran, explained for every reader. Learn to read the Quran with depth, precision, and presence.',
  keywords: [
    'how to read the Quran', 'understand the Quran', 'tafsir', 'tadabbur',
    'Quran study guide', 'tafsir for beginners', 'tadabbur meaning',
    'Quranic reflection', 'Quran interpretation', 'Islamic study',
    'Makki Madani', 'asbab al-nuzul', 'balaghah', 'Quran linguistics',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How to Read the Quran with Understanding | AyahGuide',
    description: 'A complete guide to tafsir and tadabbur — the tools, lenses, and questions that open the Quran at a depth most readers never reach.',
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Read the Quran with Understanding | AyahGuide',
    description: 'A practical guide to tafsir and tadabbur for every reader — not just scholars.',
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': pageUrl,
      headline: 'How to Read the Quran with Understanding: A Complete Guide to Tafsir and Tadabbur',
      description: 'A complete, practical guide to tafsir and tadabbur — the tools scholars use to understand the Quran, explained for every reader.',
      url: pageUrl,
      author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      isPartOf: { '@id': CANONICAL_URL },
      about: [
        { '@type': 'Thing', name: 'Tafsir', description: 'The scholarly discipline of explaining and interpreting the Quran' },
        { '@type': 'Thing', name: 'Tadabbur', description: 'Deep, contemplative reflection on the Quran commanded by Allah in 4:82' },
      ],
      educationalUse: 'Reading Comprehension, Self-Study',
      audience: { '@type': 'Audience', audienceType: 'Muslims and students seeking deep Quranic understanding' },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Understanding Quran', item: pageUrl },
      ],
    },
    {
      '@type': 'DefinedTermSet',
      name: 'Quran Study Glossary',
      url: `${pageUrl}#glossary`,
      hasDefinedTerm: [
        { '@type': 'DefinedTerm', name: 'Tadabbur', termCode: 'تدبّر', description: 'Deep, sustained contemplative reflection on the Quran — the responsibility of every believer (Quran 4:82).' },
        { '@type': 'DefinedTerm', name: 'Tafsir', termCode: 'تفسير', description: 'The scholarly discipline of explaining and interpreting the Quran, drawing on Arabic language, prophetic tradition, and the understanding of the Companions.' },
        { '@type': 'DefinedTerm', name: 'Amud', termCode: 'عمود', description: 'The central thesis or governing idea of a surah — the unifying pillar around which every section is organized.' },
        { '@type': 'DefinedTerm', name: 'Asbab al-Nuzul', termCode: 'أسباب النزول', description: 'The historical occasions or events that prompted the revelation of specific Quranic verses.' },
        { '@type': 'DefinedTerm', name: 'Balaghah', termCode: 'بلاغة', description: 'Arabic rhetoric — the science of eloquent, appropriate, and effective language. The foundation of understanding the Quran\'s linguistic miracle.' },
        { '@type': 'DefinedTerm', name: 'Iltifat', termCode: 'التفات', description: 'A deliberate shift in grammatical person, number, or tense — one of the Quran\'s most distinctive stylistic features.' },
        { '@type': 'DefinedTerm', name: 'Makki / Madani', termCode: 'مكية/مدنية', description: 'Surahs revealed before (Makki) or after (Madani) the Hijra to Madinah — a distinction that profoundly shapes the content and style of each surah.' },
        { '@type': 'DefinedTerm', name: 'Nazm', termCode: 'نظم', description: 'The internal coherence and logical ordering of a surah — how its sections flow from each other.' },
      ],
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the difference between tafsir and tadabbur?',
          acceptedAnswer: { '@type': 'Answer', text: 'Tafsir is the scholarly discipline of explaining and interpreting the Quran — it requires technical knowledge of classical Arabic, prophetic traditions, and Islamic scholarship. Tadabbur is the contemplative practice of deep Quranic reflection — the responsibility of every believer, not only scholars. Tafsir tells you what the verse means; tadabbur is the process of allowing what it means to change you. The two are not in competition: tafsir is the foundation that makes tadabbur properly grounded.' },
        },
        {
          '@type': 'Question',
          name: 'Do I need to know Arabic to benefit from tafsir?',
          acceptedAnswer: { '@type': 'Answer', text: 'No — but knowing Arabic deepens the experience considerably. Much of what tafsir examines (word choice, verb forms, sentence structure, rhetorical devices) is lost in translation. A good English tafsir will surface some of these layers for you. Even with no Arabic, you can engage with asbab al-nuzul, the narrative structure of surahs, and the big-picture tools like the Makki/Madani distinction and the amud.' },
        },
        {
          '@type': 'Question',
          name: 'Which tafsir is best for beginners?',
          acceptedAnswer: { '@type': 'Answer', text: 'For English readers beginning their tafsir journey, Tafsir As-Sa\'di (by Imam Abd al-Rahman ibn Nasir as-Sa\'di) is widely recommended for its clarity and warm tone. Ibn Kathir\'s Tafsir is more comprehensive and narration-heavy — excellent once you have some foundation. Nouman Ali Khan\'s lectures through Bayyinah Institute cover linguistic analysis in accessible modern English.' },
        },
        {
          '@type': 'Question',
          name: 'Is it permitted to interpret the Quran yourself?',
          acceptedAnswer: { '@type': 'Answer', text: 'Engaging with the Quran through reflection and tadabbur is not only permitted — it is commanded. However, issuing interpretations that contradict the established scholarly tradition or making definitive rulings without scholarly grounding is what the classical scholars cautioned against (tafsir bil-ra\'y al-madhmum). The distinction is between the personal, devotional experience of reading and being transformed (encouraged for everyone) versus claiming scholarly authority to determine meaning (requires proper training).' },
        },
        {
          '@type': 'Question',
          name: 'How do I start practicing tadabbur?',
          acceptedAnswer: { '@type': 'Answer', text: 'The simplest entry point is to slow down. Take a single ayah and sit with it. Ask: what is this verse saying? What word feels most significant? What does this tell me about Allah? Read a brief tafsir on the verse for grounding. Then return to the verse and read it again. This cycle — read, reflect, consult, return — is the beginning of tadabbur practice.' },
        },
        {
          '@type': 'Question',
          name: 'What is Makki and Madani in the Quran?',
          acceptedAnswer: { '@type': 'Answer', text: 'Makki surahs were revealed before the Prophet\'s ﷺ migration (Hijra) to Madinah, typically addressing belief, the unseen, and the hereafter with intense, rhythmic language. Madani surahs were revealed after the Hijra, often addressing community law, social ethics, and guidance for an established Muslim society. This distinction profoundly shapes both the content and style of each surah, and knowing it changes how you read them.' },
        },
        {
          '@type': 'Question',
          name: 'What is balaghah in the Quran?',
          acceptedAnswer: { '@type': 'Answer', text: 'Balaghah (Arabic rhetoric) is the science of eloquent, appropriate, and effective language. It contains three sub-disciplines: ilm al-ma\'ani (meaning through sentence structure), ilm al-bayan (figurative language including metaphor and simile), and ilm al-badi\' (stylistic devices like paronomasia and antithesis). The Quran\'s inimitability (i\'jaz) is understood partly through its balaghah — operating at a level of linguistic precision and emotional power no human author has replicated.' },
        },
      ],
    },
  ],
}

// ── Section heading component ─────────────────────────────────────────────────
function SectionHeading({ arabic, transliteration, english, description }: {
  arabic: string
  transliteration: string
  english: string
  description: string
}) {
  return (
    <div className="mb-4 border-l-2 border-[rgba(212,175,55,0.4)] pl-4">
      <div className="flex flex-wrap items-baseline gap-2">
        <span className="font-amiri text-xl text-[rgba(212,175,55,0.85)]">{arabic}</span>
        <span className="text-xs italic text-zinc-500 dark:text-zinc-400">{transliteration}</span>
      </div>
      <h3 className="mt-0.5 font-serif text-base font-semibold text-zinc-900 dark:text-white">{english}</h3>
      <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">{description}</p>
    </div>
  )
}

// ── Part heading ──────────────────────────────────────────────────────────────
function PartHeading({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return (
    <div className="mb-8 mt-16 border-t border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/60 dark:bg-zinc-900/40 -mx-5 px-5 py-6 sm:rounded-lg sm:mx-0 sm:px-6">
      <p className="mb-1.5 text-[10px] font-medium uppercase tracking-[0.25em] text-[rgba(212,175,55,0.6)]">{number}</p>
      <h2 className="font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">{title}</h2>
      <p className="mt-1.5 text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
    </div>
  )
}

export default function UnderstandingQuranPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="min-h-screen bg-white dark:bg-navy-dark">

        {/* ── Hero ──────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-5 pb-10 pt-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
            <Link href="/" className="transition-colors hover:text-zinc-500 dark:text-zinc-400">Home</Link>
            <span>/</span>
            <span className="text-zinc-500 dark:text-zinc-400">Understanding the Quran</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              How to Read the Quran<br className="hidden sm:block" /> with Understanding
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              A complete guide to <strong className="font-medium text-zinc-700 dark:text-zinc-300">tafsir</strong> and{' '}
              <strong className="font-medium text-zinc-700 dark:text-zinc-300">tadabbur</strong> — the tools, lenses,
              and questions that open the Quran at a depth most readers never reach.
            </p>
            <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-600">
              Not a tafsir of specific verses. A guide to how tafsir works.
            </p>
          </div>

          {/* Jump links */}
          <nav aria-label="Table of contents" className="mt-8 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600">In this guide</p>
            <ol className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#foundations" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Part One — What Tafsir and Tadabbur Actually Mean</a></li>
              <li><a href="#surah-structure" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Part Two — How to Read an Entire Surah</a></li>
              <li><a href="#ayah-tools" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Part Three — How to Read a Single Verse</a></li>
              <li><a href="#questions-to-ask" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The Questions Every Quran Student Should Ask</a></li>
              <li><a href="#faq" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Frequently Asked Questions</a></li>
              <li><a href="#glossary" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Glossary of Arabic Terms (A–Z)</a></li>
            </ol>
          </nav>
        </div>

        {/* ── Intro ─────────────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-5 pb-2">
          <div className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 p-6">
            <h2 className="mb-3 font-serif text-base font-semibold text-zinc-900 dark:text-white">
              Why Most People Read the Quran With One Eye Closed
            </h2>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Most people who love the Quran have encountered this moment: you hear a verse explained
              by a scholar — the way a single word opens up, how it connects to what came before, why
              it was worded this way and not another — and you feel like you&apos;ve been reading the text
              with one eye closed. Suddenly it has depth you didn&apos;t know was there.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              This guide is about opening the second eye. The guide is organized in two movements.
              First, we look at the surah as a whole — the big architectural picture. Then we zoom
              into the individual ayah — the linguistic and rhetorical tools that make each verse
              work. Both levels matter, and understanding both changes how you hear the Quran.
            </p>
            <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-600">
              Arabic terms are introduced with their transliteration and a plain-English explanation.
              You don&apos;t need to know Arabic to benefit — but knowing the names will help you go
              further when you&apos;re ready.
            </p>
          </div>
        </div>

        {/* ── Main content ──────────────────────────────────────────────────── */}
        <div className="mx-auto max-w-3xl px-5 pb-16">

          {/* ── PART ONE ── */}
          <section id="foundations" aria-labelledby="part-one-heading">
            <PartHeading
              number="Part One"
              title="The Foundations"
              subtitle="What Tafsir and Tadabbur actually mean — and why the difference matters"
            />

            <div className="space-y-8">

              <div>
                <SectionHeading
                  arabic="تفسير"
                  transliteration="Tafsir"
                  english="What Is Tafsir?"
                  description="The scholarly discipline of explaining and interpreting the Quran — drawing on Arabic language, prophetic tradition, the understanding of the Companions, and rational analysis."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    The word tafsir comes from a root meaning &ldquo;to uncover&rdquo; or &ldquo;to clarify.&rdquo; It is what
                    scholars do when they explain what a verse means — intellectual, disciplined, grounded.
                    There are two broad categories:
                  </p>
                  <ul className="ml-4 space-y-2 text-zinc-500 dark:text-zinc-400">
                    <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[rgba(212,175,55,0.4)]" /><span><strong className="text-zinc-500 dark:text-zinc-400">Tafsir bil-Riwayah</strong> (Narration-Based): Explaining the Quran through the Quran itself, authentic hadith, or the understanding of the Sahabah. This is the most authoritative form.</span></li>
                    <li className="flex gap-2"><span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[rgba(212,175,55,0.4)]" /><span><strong className="text-zinc-500 dark:text-zinc-400">Tafsir bil-Dirayah</strong> (Reason-Based): Explanation through sound linguistic analysis and logical reasoning — but only when it does not contradict the transmitted tradition.</span></li>
                  </ul>
                  <p>
                    Scholars established a clear order: the Quran explains itself first, then the Sunnah,
                    then the understanding of the Sahabah, then the Tabi&apos;un, then the Arabic language,
                    then sound scholarly reasoning. Knowing this order helps you read tafsir with greater
                    appreciation — and helps you spot when something is grounded versus speculative.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="تدبّر"
                  transliteration="Tadabbur"
                  english="What Is Tadabbur?"
                  description="Deep, sustained, contemplative reflection on the Quran — not just understanding what it says, but being transformed by it."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    The word tadabbur comes from the root <em>d-b-r</em> — which relates to the
                    &ldquo;back&rdquo; of something, looking carefully at what lies behind the surface.
                    Allah commands it directly:
                  </p>
                  <blockquote className="my-4 border-l-2 border-[rgba(212,175,55,0.35)] pl-4">
                    <p className="font-amiri text-lg text-[rgba(212,175,55,0.8)]">أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ</p>
                    <p className="mt-1 text-sm italic text-zinc-500 dark:text-zinc-400">&ldquo;Do they not reflect deeply on the Quran?&rdquo; — Surah An-Nisa, 4:82</p>
                  </blockquote>
                  <p>
                    Tadabbur is not the same as tafsir. Tafsir is the work of scholars with technical tools.
                    Tadabbur is the work of every believer with an open heart. But tafsir grounds tadabbur.
                    Without tafsir, tadabbur risks becoming personal projection — finding in the text what you
                    brought to it rather than what Allah placed in it. The scholarly tradition creates the riverbank;
                    tadabbur is the water that flows through it.
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    This is what{' '}
                    <Link href="/" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                      AyahGuide
                    </Link>{' '}
                    is built for — the space where grounded tafsir becomes lived tadabbur.
                    You can explore published reflections on the{' '}
                    <Link href="/surahs" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                      Surah Map
                    </Link>.
                  </p>
                </div>
              </div>

              {/* Comparison table */}
              <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-900/60">
                      <th className="px-4 py-2.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Tafsir</th>
                      <th className="px-4 py-2.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Tadabbur</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-800/60 text-zinc-500 dark:text-zinc-400">
                    {[
                      ['Intellectual — explaining what it means', 'Contemplative — being transformed by what it means'],
                      ['Done by scholars with technical knowledge', 'The responsibility of every believer'],
                      ['Produces knowledge', 'Produces change'],
                      ['Grounds and checks interpretation', 'Brings the text home to the heart'],
                      ['The foundation', 'The building that rises from it'],
                    ].map(([t, td], i) => (
                      <tr key={i}>
                        <td className="px-4 py-2">{t}</td>
                        <td className="px-4 py-2">{td}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div>
                <SectionHeading
                  arabic="تأويل / رأي"
                  transliteration="Ta'wil / Ra'y"
                  english="The Boundaries of Interpretation"
                  description="Two terms that mark where personal reading ends and scholarly expertise begins."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    <strong className="text-zinc-700 dark:text-zinc-300">Ta&apos;wil</strong> means
                    going beneath the surface meaning of a verse to uncover a deeper, figurative layer
                    — for example, understanding a physical image as pointing to a spiritual reality.
                    This requires real scholarly training. <strong className="text-zinc-700 dark:text-zinc-300">Ra&apos;y</strong>{' '}
                    simply means personal opinion. When someone interprets the Quran based on feeling
                    alone — without grounding in Arabic, hadith, or scholarly tradition — that falls
                    into what scholars call <em>tafsir bil-ra&apos;y al-madhmum</em> (blameworthy
                    opinion-based interpretation), which the tradition strongly cautions against.
                  </p>
                  <div className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 px-4 py-3">
                    <p className="mb-2 text-[10px] font-medium uppercase tracking-[0.15em] text-zinc-500 dark:text-zinc-600">The hierarchy of Quranic interpretation</p>
                    <ol className="space-y-1 text-zinc-500 dark:text-zinc-400">
                      {[
                        'Tafsir al-Quran bil-Quran — the Quran explaining itself',
                        'Tafsir bil-Sunnah — the Prophet\'s ﷺ own explanation',
                        'The understanding of the Sahabah',
                        'The understanding of the Tabi\'un',
                        'The Arabic language and its usage',
                        'Sound scholarly reasoning, constrained by the above',
                      ].map((item, i) => (
                        <li key={i} className="flex gap-2 text-xs">
                          <span className="mt-0.5 shrink-0 text-[rgba(212,175,55,0.4)]">{i + 1}.</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="قِرَاءَات"
                  transliteration="Qira'at"
                  english="Canonical Readings"
                  description="Multiple authenticated ways of reciting the same Quran — all traced back to the Prophet ﷺ, all equally valid."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    The Quran was transmitted through several slightly different recitation traditions,
                    each going back to the Prophet ﷺ himself. These are not errors or disagreements —
                    they are all equally the Quran, preserved through unbroken chains of transmission.
                  </p>
                  <p>
                    When a tafsir mentions &ldquo;another reading says...&rdquo; this refers to one of these
                    canonical Qira&apos;at. Sometimes a small variation in pronunciation shifts the
                    grammatical form of a word and opens a new layer of meaning. For example, in one
                    reading of Surah Al-Fatiha, <em>Maliki yawm al-din</em> means &ldquo;Master of
                    the Day of Judgment,&rdquo; while another reads <em>Maliki</em> as &ldquo;King of
                    the Day of Judgment.&rdquo; Both are true — Allah is both Master and King — and
                    scholars treat both readings as complementary, not competing.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="مَقَاصِد الشَّرِيعَة"
                  transliteration="Maqasid al-Shari'ah"
                  english="The Higher Purposes of Quranic Guidance"
                  description="The five fundamental objectives of divine guidance: the preservation of faith, life, intellect, lineage, and property."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  When Allah prohibits alcohol, you can understand it at the legal level (it&apos;s haram)
                  — but the maqasid lens asks: which fundamental human good is being protected? The answer
                  is <em>&apos;aql</em> (the intellect) and <em>nasl</em> (the family). That deeper understanding
                  helps you see the wisdom behind the ruling, not just the ruling itself. It is not a replacement
                  for detailed linguistic or legal analysis — it is a companion to it.
                </p>
              </div>
            </div>
          </section>

          {/* ── Mid-page CTA ── */}
          <div className="my-10 rounded-xl border border-[rgba(212,175,55,0.15)] bg-[rgba(212,175,55,0.04)] px-6 py-5">
            <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <strong className="text-zinc-700 dark:text-zinc-300">Want to see these ideas in action?</strong>{' '}
              Our reflection on{' '}
              <Link href="/surahs/al-mulk" className="text-[rgba(212,175,55,0.8)] hover:text-[rgba(212,175,55,1)] transition-colors underline underline-offset-2">
                Surah Al-Mulk
              </Link>{' '}
              applies every concept from this section — tafsir, tadabbur, the hierarchy of sources,
              and the amud — to a single, powerful surah. It&apos;s a good place to see how the
              foundations become a lived reading practice.
            </p>
          </div>

          {/* ── PART TWO ── */}
          <section id="surah-structure" aria-labelledby="part-two-heading">
            <PartHeading
              number="Part Two"
              title="How to Read an Entire Surah"
              subtitle="Structure, context, and architecture — the tools for reading the building before you enter a room"
            />

            <p className="mb-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Before you can understand a room, you need to understand the building. Before you can understand
              an ayah, you need to understand the surah it lives in. Think of each surah as a building with
              a specific purpose, a unique character, a calculated structure. Every room connects to the others.
              Every entrance and exit was designed.
            </p>

            <div className="space-y-10">

              <div>
                <SectionHeading
                  arabic="مكية / مدنية"
                  transliteration="Makki / Madani"
                  english="1. How Context Shapes the Quran"
                  description="Surahs revealed before the Hijra are called Makki. Those revealed after are called Madani. The distinction profoundly shapes the content and style of each surah."
                />
                <div className="space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    The Quran was revealed over 23 years across two very different historical contexts.
                    In Makkah, the early Muslim community was small, persecuted, and in desperate need of
                    faith. In Madinah, they were a growing society that needed laws and social structure.
                    The surahs reflect their context.
                  </p>
                  <div className="overflow-hidden rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <table className="w-full text-xs">
                      <thead>
                        <tr className="border-b border-zinc-200 dark:border-zinc-800 bg-zinc-900/60">
                          <th className="px-4 py-2.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Makki Surahs</th>
                          <th className="px-4 py-2.5 text-left font-medium text-zinc-500 dark:text-zinc-400">Madani Surahs</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-800/60 text-zinc-500 dark:text-zinc-400">
                        {[
                          ['Address: "O People!" (ya ayyuha al-nas)', 'Address: "O Believers!" (ya ayyuha alladhina amanu)'],
                          ['Short, intense, often rhythmic', 'Longer, legislative, detailed'],
                          ['Focus: faith, resurrection, the Unseen', 'Focus: law, society, family, state'],
                          ['Rhetorical — persuading and shaking', 'Instructional — guiding an established community'],
                          ['Examples: Al-Muddaththir, Al-Qiyamah, Al-Buruj', 'Examples: Al-Baqarah, Al-Nisa, Al-Maidah'],
                        ].map(([m, md], i) => (
                          <tr key={i}>
                            <td className="px-4 py-2">{m}</td>
                            <td className="px-4 py-2">{md}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    These are dominant patterns, not rigid rules. The Makki/Madani distinction is a
                    guide for your reading strategy — not a formula that predicts every verse. You can
                    see this distinction at work across the{' '}
                    <Link href="/surahs" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                      Surah Map
                    </Link>, where each surah is labelled Makki or Madani.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="أسباب النزول"
                  transliteration="Asbab al-Nuzul"
                  english="2. Why Verses Were Revealed"
                  description="The historical circumstances or events that prompted the revelation of specific verses. Knowing these does not limit the verse's application — it enriches it."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    Almost every major verse or passage has a story behind it. Knowing that story does
                    not trap the verse in the past — it illuminates the logic of the verse and reveals
                    its depth.
                  </p>
                  <p className="text-zinc-500 dark:text-zinc-400">
                    Scholars established a key principle here: just because a verse was revealed in
                    response to a specific event does not mean it only applies to that event. The Arabic
                    formulation is <em>&ldquo;Al-ibra bi-umum al-lafz la bi-khusus al-sabab&rdquo;</em> —
                    &ldquo;The lesson comes from the generality of the wording, not the specificity of the
                    occasion.&rdquo; The story tells you <em>why</em> it was revealed; the wording tells you
                    what it means for all time.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="عمود"
                  transliteration="Amud"
                  english="3. The Central Thesis of a Surah"
                  description="The single unifying thesis of a surah — the central argument that every section, story, and verse is serving. Named by the great scholar Hamiduddin Farahi."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  When you identify the amud, the surah snaps into focus. What seemed like a collection
                  of unrelated topics reveals itself as a tightly constructed argument. The amud is not
                  always stated directly. Sometimes it is implied by the surah&apos;s structure, its opening,
                  its closing, and the threads that run through it. Identifying the amud is one of the
                  most rewarding exercises in Quranic study — and once you find it, you cannot un-see it.
                  See how it works in practice in our reflection on{' '}
                  <Link href="/surahs/al-mulk" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                    Surah Al-Mulk
                  </Link>.
                </p>
              </div>

              <div>
                <SectionHeading
                  arabic="نظم"
                  transliteration="Nazm"
                  english="4. How a Surah Flows"
                  description="The internal coherence and logical ordering of a surah — how its sections flow from each other, each passage preparing the ground for the next."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Scholars like Imam al-Razi devoted enormous attention to nazm, arguing that no transition
                  in the Quran is arbitrary. Every shift of topic, every new address, every change of register
                  — all of it is calculated. Reading with attention to nazm means asking: what does this
                  passage assume the reader already knows from what came before? What does it establish
                  for what comes next?
                </p>
              </div>

              <div>
                <SectionHeading
                  arabic="مناسبات السور"
                  transliteration="Munasabat al-Suwar"
                  english="5. How Surahs Speak to Each Other"
                  description="The thematic connections and conversations between adjacent surahs. The Quran's arrangement is not alphabetical or chronological — it is purposive."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  The order of the surahs was established by the Prophet ﷺ under divine guidance.
                  Adjacent surahs often complete each other&apos;s arguments, answer each other&apos;s questions,
                  or explore the same theme from different angles. These are not coincidences — they are
                  the architecture of the text. Noticing them is a form of tadabbur in itself.
                </p>
              </div>

              <div>
                <SectionHeading
                  arabic="قَسَم"
                  transliteration="Qasam"
                  english="6. Divine Oaths and What They Mean"
                  description="A divine oath. Surahs that open with 'wa' (by) are using qasam. The object sworn by is always chosen for its thematic relationship to the assertion that follows."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  In Surah Al-Asr, Allah swears by time (<em>al-asr</em>) that humanity is in loss —
                  except those who believe, do good, and counsel each other to truth and patience. The
                  oath by time is not random: time itself is the witness to human loss, because time reveals
                  what people chose to do with the life they were given. Understanding the qasam structure
                  turns these openers from beautiful phrases into analytical keys.
                </p>
              </div>

              <div>
                <SectionHeading
                  arabic="قصص القرآن"
                  transliteration="Qasas al-Quran"
                  english="7. How Quranic Stories Work"
                  description="Quranic narrative. Quranic stories are not historical chronicles but purposive compositions shaped by the amud of each surah."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  The story of Prophet Musa ﷺ appears across dozens of surahs. Why does the Quran not
                  tell it once, completely? Because Quranic stories are not history lessons — they are
                  arguments. Each surah selects the episodes it needs, emphasizes what its amud requires,
                  and leaves out what would distract. Reading Quranic stories with this understanding
                  means asking not just &ldquo;what happened&rdquo; but &ldquo;what is this surah trying to establish
                  by telling it this way?&rdquo;
                </p>
              </div>
            </div>
          </section>

          {/* ── PART THREE ── */}
          <section id="ayah-tools" aria-labelledby="part-three-heading">
            <PartHeading
              number="Part Three"
              title="How to Read a Single Verse"
              subtitle="Language, rhetoric, and meaning — the tools drawn from classical Arabic linguistics and balaghah"
            />

            <p className="mb-8 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              With the surah&apos;s architecture in mind, we can look at the individual verse — the ayah —
              with greater precision. These are the tools the scholars use to hear what the Quran is
              doing at the level of the word, the sentence structure, and the sound.
            </p>

            <div className="space-y-10">

              <div>
                <SectionHeading
                  arabic="صرف / أوزان الأفعال"
                  transliteration="Sarf / Awzan al-Af'al"
                  english="Arabic Word Structure: Why Every Letter Matters"
                  description="How Arabic builds entire families of words from a single three-letter root — and why the specific form chosen in the Quran always matters."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    Arabic builds words from three-letter roots. Think of a root like a seed that grows
                    into different plants depending on the pattern applied. The root <em>k-t-b</em>{' '}
                    carries the idea of writing. Add different patterns and you get <em>kataba</em>{' '}
                    (he wrote), <em>kitab</em> (book), <em>maktub</em> (written/destined),{' '}
                    <em>katib</em> (writer), <em>maktaba</em> (library) — all from the same three
                    letters, each shaped by its pattern into a different meaning.
                  </p>
                  <p>
                    Arabic has about ten standard patterns (called verb forms) that modify a root in
                    predictable ways — one pattern might add the meaning of &ldquo;causing someone else
                    to do&rdquo; something, another might mean &ldquo;doing it to yourself,&rdquo; and so on.
                    When the Quran chooses one form over a simpler one, that choice is deliberate. Even
                    without Arabic, you can ask your tafsir: &ldquo;Why was this particular word form
                    chosen?&rdquo; A good tafsir will show you that the answer often reshapes the entire verse.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="بلاغة"
                  transliteration="Balaghah"
                  english="The Rhetoric of the Quran"
                  description="The science of how Arabic uses language for maximum impact — covering sentence structure, figurative language, and stylistic devices."
                />
                <div className="space-y-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    Balaghah is not decoration — it is the science of how words land. The Quran&apos;s
                    inimitability (<em>i&apos;jaz</em>) is understood partly through its balaghah: it operates
                    at a level of linguistic precision and emotional power that no human author has replicated.
                  </p>
                  <div className="space-y-3">
                    {[
                      {
                        label: 'Ilm al-Maʿani — Meaning Through Sentence Structure',
                        text: 'Arabic has two basic sentence types. A verb sentence (jumlah fi\'liyyah) describes an action — something that happened or is happening. A noun sentence (jumlah ismiyyah) describes a state — something that simply IS, permanently. When Allah says "Allahu Samad" (Allah is the Eternal Refuge), the noun sentence tells you this is not an event that occurred but a permanent, unchanging reality. The sentence type itself carries meaning.',
                      },
                      {
                        label: "Ilm al-Bayan — Figurative Language",
                        text: 'Covers tashbih (simile), isti\'ara (metaphor), and kinaya (implication). When the Quran says "We sent him to a hundred thousand or more," the "or more" is a stylistic move scholars identify as ta\'zim (magnification). Bayan asks: when the Quran uses an image, what precise truth is it conveying that literal language could not convey as efficiently?',
                      },
                      {
                        label: "Ilm al-Badiʿ — Stylistic Devices",
                        text: "Covers jinas (paronomasia), tibaq (antithesis), and fasila (the closing sound of each ayah). The Quran's rhyme scheme is not ornamental — the closing word of each ayah carries semantic weight. Often the most important word in a verse is its last word, placed there not only for the ear but to land as the verse's punchline, its revelation.",
                      },
                    ].map(({ label, text }, i) => (
                      <div key={i} className="rounded-lg border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 px-4 py-3">
                        <p className="mb-1.5 text-xs font-medium text-zinc-700 dark:text-zinc-300">{label}</p>
                        <p className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="التفات"
                  transliteration="Iltifat"
                  english="Deliberate Shifts in the Quran's Voice"
                  description="A deliberate shift in grammatical person, number, or tense — creating an emotional jolt or change of perspective. One of the most distinctive features of Quranic style."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    In{' '}
                    <Link href="/surahs/al-fatiha" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                      Surah Al-Fatiha
                    </Link>, the surah begins in the third person (&ldquo;Praise be to Allah, Lord of the
                    Worlds&rdquo;) and then shifts to direct address (&ldquo;It is You we worship, it is You we
                    ask for help&rdquo;). The shift from speaking <em>about</em> Allah to speaking <em>to</em>{' '}
                    Allah is an iltifat — a deliberate grammatical jolt that enacts the very movement of
                    prayer: from description to presence.
                  </p>
                </div>
              </div>

              <div>
                <SectionHeading
                  arabic="حذف"
                  transliteration="Hadhf"
                  english="The Power of What the Quran Doesn't Say"
                  description="Intentional grammatical omission — leaving out an expected element to create emphasis, implication, or a deliberate space for reflection."
                />
                <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  When an expected word is missing, the scholars ask: what does the omission accomplish?
                  Sometimes the omitted word is more powerful in its absence than it would be if stated.
                  Sometimes the hadhf creates a productive ambiguity — the missing word could be one of
                  several things, and all of them are true.
                </p>
              </div>

              <div>
                <SectionHeading
                  arabic="تقديم وتأخير"
                  transliteration="Taqdim wa Ta'khir"
                  english="Why Word Order Matters in Arabic"
                  description="Fronting — placing an element before its grammatically expected position to create emphasis or restriction. One of the most frequently analysed tools in Quranic linguistics."
                />
                <div className="space-y-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  <p>
                    In Arabic, word order is flexible — and that flexibility is exploited for meaning.
                    The most famous example is in{' '}
                    <Link href="/surahs/al-fatiha" className="text-[rgba(212,175,55,0.7)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                      Al-Fatiha
                    </Link>: <em>&ldquo;Iyyaka na&apos;budu wa iyyaka nasta&apos;in&rdquo;</em> —
                    &ldquo;It is You alone we worship, and it is You alone we ask for help.&rdquo;
                  </p>
                  <p>
                    The pronoun <em>iyyaka</em> (you) is fronted — grammatically it would come after
                    the verb. By placing it first, the Quran creates a restriction: not just &ldquo;we worship
                    you&rdquo; but &ldquo;we worship YOU — and no one else.&rdquo; The fronting is the whole
                    theological point of the verse. Without understanding taqdim, you miss it.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* ── Questions to ask ── */}
          <section id="questions-to-ask" aria-labelledby="questions-heading" className="mt-14">
            <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 id="questions-heading" className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                The Questions Every Quran Student Should Ask
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-5">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(212,175,55,0.5)]">At the Surah Level</p>
                <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {[
                    'What is the central thesis of this surah? (Amud)',
                    'What does the opening say? The closing? Do they echo each other?',
                    'What word repeats across this surah, and what is its root meaning?',
                    'Why does this surah appear after the previous one? What conversation are they having?',
                  ].map((q, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed">
                      <span className="mt-0.5 shrink-0 text-[rgba(212,175,55,0.4)]">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/30 p-5">
                <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.15em] text-[rgba(212,175,55,0.5)]">At the Ayah Level</p>
                <ul className="space-y-2 text-sm text-zinc-500 dark:text-zinc-400">
                  {[
                    'Why was THIS word chosen and not a simpler or more obvious word?',
                    'What is grammatically expected but absent here? Why?',
                    'Who is being addressed, and has the addressee changed since the previous ayah?',
                    'Is this a noun sentence or a verb sentence, and what does that choice imply?',
                    'What is the last word of this ayah? Why is it placed there?',
                    'What worldly image in this ayah points toward an unseen reality?',
                  ].map((q, i) => (
                    <li key={i} className="flex gap-2 text-xs leading-relaxed">
                      <span className="mt-0.5 shrink-0 text-[rgba(212,175,55,0.4)]">→</span>
                      <span>{q}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* ── Ethics note ── */}
          <section className="mt-10 rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-50/80 dark:bg-zinc-900/30 p-6">
            <div className="mb-3 border-l-2 border-[rgba(212,175,55,0.4)] pl-4">
              <span className="font-amiri text-lg text-[rgba(212,175,55,0.7)]">أَدَب المُفَسِّر</span>
              <h2 className="mt-0.5 font-serif text-base font-semibold text-zinc-900 dark:text-white">The Right Approach: Ethics and Humility in Quran Study</h2>
            </div>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              The tools are keys. They are not the treasure. The danger of any analytical framework is
              that it can become a wall between you and the text — making you look <em>at</em> the Quran
              rather than be looked at <em>by</em> it. A reader who can identify every rhetorical device
              in a surah but is unmoved by it has learned about the Quran without receiving it.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              The scholars call this <em>adab al-mufassir</em> — the etiquette of someone who engages
              with the Quran&apos;s meaning. For everyday readers, it comes down to a few commitments:
              come to the text wanting to receive, not to confirm what you already think. Treat the
              Arabic original as the text and translations as approximations. Hold your personal
              insights lightly, especially when they contradict what the tradition has established.
            </p>
          </section>

          {/* ── Conclusion ── */}
          <section className="mt-10">
            <blockquote className="mb-6 border-l-2 border-[rgba(212,175,55,0.35)] pl-4">
              <p className="font-amiri text-xl leading-loose text-[rgba(212,175,55,0.8)]">
                أَفَلَا يَتَدَبَّرُونَ الْقُرْآنَ وَلَوْ كَانَ مِنْ عِندِ غَيْرِ اللَّهِ لَوَجَدُوا فِيهِ اخْتِلَافًا كَثِيرًا
              </p>
              <p className="mt-2 text-sm italic text-zinc-500 dark:text-zinc-400">
                &ldquo;Do they not reflect deeply upon the Quran? If it had been from anyone other than Allah,
                they would have found in it many contradictions.&rdquo; — Surah An-Nisa, 4:82
              </p>
            </blockquote>
            <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Every tool in this guide exists for one purpose: to help you hear what the Quran is
              actually saying. The next time you sit with a surah, bring one of these lenses with you.
              Ask one new question. Follow the thread. That is where understanding begins.
            </p>
          </section>

          {/* ── FAQ ── */}
          <section id="faq" aria-labelledby="faq-heading" className="mt-14">
            <div className="mb-6 border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <h2 id="faq-heading" className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                Frequently Asked Questions
              </h2>
              <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                The most common questions when first encountering tafsir and tadabbur.
              </p>
            </div>
            <div className="space-y-5">
              {[
                {
                  q: 'What is the difference between tafsir and tadabbur?',
                  a: 'Tafsir is the scholarly discipline of explaining and interpreting the Quran — it requires technical knowledge of classical Arabic, prophetic traditions, and Islamic scholarship. Tadabbur is the contemplative practice of deep Quranic reflection — the responsibility of every believer, not only scholars. Tafsir tells you what the verse means; tadabbur is the process of allowing what it means to change you. The two are not in competition: tafsir is the foundation that makes tadabbur properly grounded.',
                },
                {
                  q: 'Do I need to know Arabic to benefit from tafsir?',
                  a: 'No — but knowing Arabic deepens the experience considerably. Much of what tafsir examines (word choice, verb forms, sentence structure, rhetorical devices) is lost in translation. A good English tafsir will surface some of these layers for you. Even with no Arabic, you can engage with asbab al-nuzul, the narrative structure of surahs, and the big-picture tools like the Makki/Madani distinction and the amud.',
                },
                {
                  q: 'Which tafsir is best for beginners?',
                  a: 'For English readers, Tafsir As-Sa\'di (by Imam Abd al-Rahman ibn Nasir as-Sa\'di) is widely recommended for its clarity and warm tone. Ibn Kathir\'s Tafsir is more comprehensive — excellent once you have some foundation. Nouman Ali Khan\'s lectures through Bayyinah Institute cover linguistic analysis in accessible modern English.',
                },
                {
                  q: 'Is it permitted to interpret the Quran yourself?',
                  a: 'Engaging with the Quran through reflection and tadabbur is not only permitted — it is commanded. However, issuing interpretations that contradict the established scholarly tradition or making definitive rulings without scholarly grounding is what the classical scholars cautioned against (tafsir bil-ra\'y al-madhmum). The distinction is between the personal, devotional experience of reading (encouraged for everyone) versus claiming scholarly authority to determine meaning (requires proper training).',
                },
                {
                  q: 'How do I start practicing tadabbur?',
                  a: 'The simplest entry point is to slow down. Take a single ayah — one verse — and sit with it. Ask: what is this verse saying? What word feels most significant? What does this tell me about Allah? Read a brief tafsir on the verse for grounding. Then return to the verse and read it again. This cycle — read, reflect, consult, return — is the beginning of tadabbur practice.',
                },
                {
                  q: 'What is Makki and Madani in the Quran?',
                  a: 'Makki surahs were revealed before the Prophet\'s ﷺ migration (Hijra) to Madinah, typically addressing belief, the unseen, and the hereafter with intense, rhythmic language. Madani surahs were revealed after the Hijra, often addressing community law, social ethics, and guidance for an established Muslim society. This distinction profoundly shapes both the content and style of each surah.',
                },
                {
                  q: 'What is balaghah in the Quran?',
                  a: 'Balaghah (Arabic rhetoric) is the science of eloquent, appropriate, and effective language. It contains three sub-disciplines: ilm al-ma\'ani (meaning through sentence structure), ilm al-bayan (figurative language), and ilm al-badi\' (stylistic devices). The Quran\'s inimitability (i\'jaz) is understood partly through its balaghah — operating at a level of linguistic precision and emotional power no human author has replicated.',
                },
              ].map(({ q, a }, i) => (
                <div key={i} className="rounded-xl border border-zinc-200/60 dark:border-zinc-800/60 bg-zinc-900/20 p-5">
                  <h3 className="mb-2 font-serif text-sm font-semibold text-zinc-900 dark:text-white">{q}</h3>
                  <p className="text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{a}</p>
                </div>
              ))}
            </div>
          </section>

          {/* ── Glossary ── */}
          <section id="glossary" aria-labelledby="glossary-heading" className="mt-14">
            <details className="group rounded-xl border border-zinc-200 dark:border-zinc-800">
              <summary className="cursor-pointer list-none px-5 py-4 [&::-webkit-details-marker]:hidden">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 id="glossary-heading" className="font-serif text-xl font-bold text-zinc-900 dark:text-white">
                      Glossary of Arabic Terms (A–Z)
                    </h2>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      All Arabic terms used in this guide, listed alphabetically by transliteration.
                    </p>
                  </div>
                  <span className="ml-4 shrink-0 text-zinc-400 transition-transform group-open:rotate-180">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none"><path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </summary>
              <div className="border-t border-zinc-200 dark:border-zinc-800 px-5 py-4">
            <dl className="space-y-3">
              {[
                { term: 'Amud', slug: 'amud', arabic: 'عمود', def: 'The central thesis or governing idea of a surah — its unifying pillar.' },
                { term: 'Asbab al-Nuzul', slug: 'asbab-al-nuzul', arabic: 'أسباب النزول', def: 'The historical occasions or events that prompted the revelation of specific verses.' },
                { term: "Awzan al-Af'al", slug: 'awzan-al-afal', arabic: 'أوزان الأفعال', def: 'The ten standard Arabic verb forms, each adding a specific layer of meaning to the root.' },
                { term: 'Balaghah', slug: 'balaghah', arabic: 'بلاغة', def: "Arabic rhetoric — the science of eloquent, appropriate, and effective language. Contains three sub-disciplines: ilm al-ma'ani, ilm al-bayan, and ilm al-badi'." },
                { term: 'Fasila', slug: 'fasila', arabic: 'فاصلة', def: 'The closing sound or rhyme at the end of each Quranic ayah — carrying both sonic and semantic weight.' },
                { term: 'Hadhf', slug: 'hadhf', arabic: 'حذف', def: 'Intentional grammatical omission — leaving out an expected element to create emphasis or implication.' },
                { term: "Ilm al-Badi'", slug: 'ilm-al-badi', arabic: 'علم البديع', def: 'The branch of rhetoric dealing with stylistic embellishments: paronomasia, antithesis, and sound devices.' },
                { term: 'Ilm al-Bayan', slug: 'ilm-al-bayan', arabic: 'علم البيان', def: 'The branch of rhetoric dealing with figurative language: simile, metaphor, and implication.' },
                { term: "Ilm al-Ma'ani", slug: 'ilm-al-maani', arabic: 'علم المعاني', def: 'The branch of rhetoric dealing with meaning through sentence structure, word order, and grammatical choices.' },
                { term: 'Iltifat', slug: 'iltifat', arabic: 'التفات', def: 'A deliberate shift in grammatical person, number, or tense — creating an emotional jolt or change of perspective.' },
                { term: "Isti'ara", slug: 'istiara', arabic: 'استعارة', def: 'Metaphor — describing one thing as if it IS another, without a comparison word.' },
                { term: "Jumlah Fi'liyyah", slug: 'jumlah-filiyyah', arabic: 'جملة فعلية', def: 'Verb sentence — describes an action or event; implies temporality.' },
                { term: 'Jumlah Ismiyyah', slug: 'jumlah-ismiyyah', arabic: 'جملة اسمية', def: 'Noun sentence — describes a permanent state or ongoing reality.' },
                { term: 'Kinaya', slug: 'kinaya', arabic: 'كناية', def: 'Implication/metonymy — saying one thing to imply another, without stating it directly.' },
                { term: 'Makki / Madani', slug: 'makki-madani', arabic: 'مكية/مدنية', def: 'Surahs revealed before (Makki) or after (Madani) the Hijra to Madinah.' },
                { term: "Munasabat al-Suwar", slug: 'munasabat-al-suwar', arabic: 'مناسبات السور', def: 'The thematic connections and conversations between adjacent surahs.' },
                { term: 'Nazm', slug: 'nazm', arabic: 'نظم', def: "The internal coherence and logical ordering of a surah — how its sections flow from each other." },
                { term: 'Qasam', slug: 'qasam', arabic: 'قَسَم', def: 'A divine oath. Surahs that open with "wa" (by) are using qasam. The object sworn by is always chosen for its thematic relationship to the assertion that follows.' },
                { term: "Qasas al-Quran", slug: 'qasas-al-quran', arabic: 'قصص القرآن', def: "Quranic narrative. Quranic stories are not historical chronicles but purposive compositions shaped by the surah's amud." },
                { term: 'Sarf', slug: 'sarf', arabic: 'صرف', def: "Arabic morphology — the science of word-forms derived from three-letter roots." },
                { term: 'Tadabbur', slug: 'tadabbur', arabic: 'تدبّر', def: 'Deep, sustained contemplative reflection on the Quran — the goal of all this analysis.' },
                { term: 'Tafsir', slug: 'tafsir', arabic: 'تفسير', def: 'The scholarly discipline of explaining and interpreting the Quran.' },
                { term: "Taqdim wa Ta'khir", slug: 'taqdim-wa-takhir', arabic: 'تقديم وتأخير', def: 'Fronting — placing an element before its grammatically expected position to create emphasis or restriction.' },
                { term: 'Tashbih', slug: 'tashbih', arabic: 'تشبيه', def: 'Simile — comparing two things using an explicit comparison word.' },
                { term: 'Tibaq', slug: 'tibaq', arabic: 'طباق', def: 'Antithesis — pairing opposites to sharpen both sides.' },
              ].map(({ term, slug: _slug, arabic, def }) => (
                // TODO: Link each term to /glossary/{slug} when glossary pages are built
                <div key={term} className="flex flex-col gap-0.5 border-b border-zinc-200 dark:border-zinc-800/40 pb-3 sm:flex-row sm:gap-4">
                  <dt className="flex min-w-[220px] items-baseline gap-2 shrink-0">
                    <span className="text-sm font-medium text-zinc-700 dark:text-zinc-300">{term}</span>
                    <span className="font-amiri text-sm text-[rgba(212,175,55,0.6)]">{arabic}</span>
                  </dt>
                  <dd className="text-sm text-zinc-500 dark:text-zinc-400">{def}</dd>
                </div>
              ))}
            </dl>
              </div>
            </details>
          </section>

          {/* ── CTA ── */}
          <section className="mt-14 rounded-xl border border-[rgba(212,175,55,0.2)] bg-zinc-900/40 p-6 text-center">
            <p className="font-amiri text-lg text-[rgba(212,175,55,0.7)]">رَبَّنَا لَا تُزِغْ قُلُوبَنَا بَعْدَ إِذْ هَدَيْتَنَا</p>
            <p className="mt-1 text-xs italic text-zinc-500 dark:text-zinc-600">&ldquo;Our Lord, do not let our hearts deviate after You have guided us.&rdquo; (3:8)</p>
            <p className="mx-auto mt-5 max-w-sm text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              AyahGuide is built for this kind of intentional reading. Explore deep reflections
              on individual surahs — grounded in tafsir, written for tadabbur.
            </p>
            <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/surahs"
                className="rounded-lg bg-[rgba(212,175,55,0.9)] px-5 py-2.5 text-sm font-medium text-black transition-colors hover:bg-[rgba(212,175,55,1)]"
              >
                Explore the Surah Map
              </Link>
              <Link
                href="/#subscribe"
                className="rounded-lg border border-zinc-300 dark:border-zinc-700 px-5 py-2.5 text-sm text-zinc-500 dark:text-zinc-400 transition-colors hover:border-zinc-600 hover:text-zinc-200"
              >
                Get new reflections by email
              </Link>
            </div>
          </section>

        </div>
      </div>
    </>
  )
}
