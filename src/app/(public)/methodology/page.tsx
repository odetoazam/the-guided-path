import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/methodology`

export const metadata: Metadata = {
  title: { absolute: 'Our Methodology — How AyahGuide Reads the Quran' },
  description:
    'The interpretive method behind AyahGuide: classical tafsir grounding, morphological discipline, contemplative reflection, and a three-validator pipeline that runs on every tadabbur before it is published.',
  keywords: [
    'tadabbur methodology', 'tafsir method', 'classical tafsir', 'Quranic morphology',
    'quranic-corpus', 'ikhtilaf', 'asbab al-nuzul', 'AyahGuide method',
    'sacred content validation', 'Islamic content standards',
  ],
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'Our Methodology — How AyahGuide Reads the Quran',
    description:
      'Classical tafsir + morphological discipline + contemplative synthesis, with every page gated by a three-validator pipeline.',
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
    images: [{ url: `/api/og/quote?text=${encodeURIComponent('Classical tafsir. Morphological discipline. Contemplative synthesis. A three-validator pipeline on every page.')}&cite=AyahGuide`, width: 1200, height: 630, alt: 'AyahGuide Methodology' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AyahGuide Methodology',
    description: 'How we read: classical tafsir, morphological discipline, contemplative synthesis.',
    images: [`/api/og/quote?text=${encodeURIComponent('Classical tafsir. Morphological discipline. Contemplative synthesis. A three-validator pipeline on every page.')}&cite=AyahGuide`],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': pageUrl,
      headline: 'Our Methodology — How AyahGuide Reads the Quran',
      description:
        'The interpretive method behind AyahGuide: classical tafsir grounding, morphological discipline, contemplative reflection, and the three-validator pipeline.',
      url: pageUrl,
      author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Methodology', item: pageUrl },
      ],
    },
  ],
}

function H2({ id, children }: { id: string; children: React.ReactNode }) {
  return (
    <h2 id={id} className="mt-12 mb-3 font-serif text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
      {children}
    </h2>
  )
}

function H3({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mt-6 mb-2 font-serif text-base font-semibold text-zinc-900 dark:text-white">
      {children}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{children}</p>
}

export default function MethodologyPage() {
  return (
    <>
      <script
        suppressHydrationWarning
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="min-h-screen bg-white dark:bg-navy-dark">
        <div className="mx-auto max-w-3xl px-5 pb-16 pt-10">
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-[11px] text-zinc-500 dark:text-zinc-600">
            <Link href="/" className="transition-colors hover:text-zinc-600 dark:hover:text-zinc-400">Home</Link>
            <span>/</span>
            <span className="text-zinc-500 dark:text-zinc-400">Methodology</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              Our Methodology
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              How we read the Qur&apos;an, how we verify what we publish, and where the line sits
              between reflection and ruling.
            </p>
          </div>

          {/* Table of contents */}
          <nav aria-label="Table of contents" className="mt-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600">On this page</p>
            <ol className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#the-frame" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The frame — tafsir, morphology, tadabbur</a></li>
              <li><a href="#classical-tafsir" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Classical tafsir as the floor</a></li>
              <li><a href="#morphology" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Morphological discipline</a></li>
              <li><a href="#ikhtilaf" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Honoring ikhtil&#257;f</a></li>
              <li><a href="#tadabbur-not-fatwa" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Tadabbur, not fatw&#257;</a></li>
              <li><a href="#validators" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The three-validator pipeline</a></li>
              <li><a href="#sources" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Sources we rely on</a></li>
              <li><a href="#limits" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">What we do not claim</a></li>
              <li><a href="#corrections" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Corrections and contact</a></li>
            </ol>
          </nav>

          <section id="the-frame">
            <H2 id="the-frame">The frame — tafsir, morphology, tadabbur</H2>
            <P>
              AyahGuide is a tadabbur platform. Every page is a reflection on the Qur&apos;an
              written to help a serious reader engage the text with depth. Reflection without
              grounding becomes personal projection; grounding without reflection becomes arid
              technicality. Our method is the conversation between the two.
            </P>
            <P>
              In practice this means three commitments: (1) the classical tafsir tradition is
              the floor under every piece we publish; (2) Qur&apos;anic Arabic is treated with
              morphological precision, not decorative rhetoric; (3) contemplative synthesis is
              offered as reflection, not ruling.
            </P>
          </section>

          <section id="classical-tafsir">
            <H2 id="classical-tafsir">Classical tafsir as the floor</H2>
            <P>
              The classical commentaries — al-&#7788;abar&#299;, Ibn Kath&#299;r, al-Qur&#7789;ub&#299;, al-R&#257;z&#299;,
              al-Zamakhshar&#299;, Ibn &#703;&#256;sh&#363;r, and others — are not treated as optional background.
              They are the primary interpretive authority. Contemporary reflection does not overrule them;
              it stands on them.
            </P>
            <P>
              Where a tadabbur makes an interpretive claim — about a word&apos;s meaning, about
              the relationship between two verses, about what a passage implies — that claim is
              expected to either appear in the classical corpus or not contradict anything there.
              Modern psychological, philosophical, or social observation can illuminate the
              classical reading; it does not replace it.
            </P>
            <P>
              For contested verses — the combat verses, the &#7717;ud&#363;d verses, family-law
              verses, interfaith verses — the classical juridical framework is made explicit in
              the body of the piece, not buried in a footnote. See{' '}
              <Link href="/contested-verses" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                How We Handle Contested Verses
              </Link>{' '}for the specific approach.
            </P>
          </section>

          <section id="morphology">
            <H2 id="morphology">Morphological discipline</H2>
            <P>
              Every tadabbur file on the site carries morphological tags &mdash; token-level
              position, root, part of speech, and grammatical form (I-X). These tags are not
              ornamental. They are cross-checked against authoritative Qur&apos;anic morphology
              references before publication.
            </P>
            <P>
              Where a reading draws interpretive weight from a specific grammatical form —
              <em> fa&#701;&#701;&#257;l</em> intensive over <em>f&#257;&#703;il</em> active participle,
              Form III relational over Form I unilateral, Form V reflexive over Form II transitive —
              the contrast is shown, not asserted. A morphological claim a reader cannot
              verify against a grammatical reference is a claim we have not earned the right to make.
            </P>
            <P>
              Where a rhetorical observation is a literary appreciation rather than a classical
              bal&#257;ghah category, we aim to say so. Phonetic feel is real; it is not the same
              as <em>jahr/hams</em>, <em>shiddah/rakh&#257;wah</em>, <em>qalqalah</em>, <em>i&#7789;b&#257;q</em>,
              or any other classically recognized phonetic category. We try to keep the two
              kinds of observation distinct.
            </P>
          </section>

          <section id="ikhtilaf">
            <H2 id="ikhtilaf">Honoring ikhtil&#257;f</H2>
            <P>
              Many verses carry more than one classical reading. Flattening a contested verse
              to a single reading &mdash; presenting one interpretation as &ldquo;the&rdquo; linguistic
              or theological truth &mdash; is one of the commonest failure modes in
              English-language Qur&apos;anic writing. We try to avoid it.
            </P>
            <P>
              Where classical scholars disagree (on <em>q&#257;nit&#257;t</em> in 4:34, on the scope of
              the polygamy permission in 4:3, on the <em>darajah</em> in 2:228, on the meaning of
              the <em>&#7693;arb</em> clause in 4:34, on the referent of <em>al-yahud wa-l-na&#7779;&#257;r&#257;</em>{' '}
              in 5:51), we name the range of classical positions, cite the mufasir&#363;n associated
              with them, and do not collapse ikhtil&#257;f into a single view for rhetorical
              convenience.
            </P>
          </section>

          <section id="tadabbur-not-fatwa">
            <H2 id="tadabbur-not-fatwa">Tadabbur, not fatw&#257;</H2>
            <P>
              A tadabbur is a contemplative reading. It is not a legal ruling. On every page that
              touches an a&#7717;k&#257;m-bearing ayah &mdash; &#7717;ud&#363;d, family law, inheritance, war
              and peace, interfaith conduct &mdash; this distinction is the governing one.
            </P>
            <P>
              Where the classical juridical framework bounds the ruling (the conditions of
              <em> &#7717;ir&#257;bah</em>, the evidentiary bar for <em>zin&#257;</em>, the <em>ni&#7779;&#257;b</em> for
              theft, the Prophetic constraint of <em>ghayr muba&#771;rri&#7717;</em>, the four schools&apos;
              graduated readings), we state it in the body. This is not apologetics. This is
              what classical Islamic law has always said. The site transmits it; it does not
              soften it or go beyond it.
            </P>
            <P>
              For questions that require a ruling on a specific personal situation, consult a
              qualified scholar within your school (<em>madhhab</em>). Tadabbur can illuminate
              a question; only a mufti can answer one.
            </P>
          </section>

          <section id="validators">
            <H2 id="validators">The three-validator pipeline</H2>
            <P>
              No tadabbur file enters the database until three validators have run and passed.
              This is an enforced step in our publication workflow, not an aspirational standard.
            </P>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4">
                <H3>1. Arabic text verification</H3>
                <P>
                  Every Arabic word quoted in a tadabbur is matched against the authoritative
                  Uthmani text of the Qur&apos;an. Missed diacritics, transposed letters, and
                  substituted words fail the validator.
                </P>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4">
                <H3>2. Morphology verification</H3>
                <P>
                  Every morphological tag (root, part of speech, token position) is cross-checked
                  against standard Qur&apos;anic morphology references. Wrong roots, wrong positions,
                  and wrong form classifications fail the validator.
                </P>
              </div>
              <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4">
                <H3>3. Tafsir cross-reference</H3>
                <P>
                  The tadabbur&apos;s interpretive claims are cross-referenced against classical
                  tafsir sources. Claims that drift from the classical tradition are flagged for
                  review and correction before publication.
                </P>
              </div>
            </div>
            <P>
              A three-layered content-validation policy applies to the rest of the site as well:
              surah-level descriptions are validated through a Tier 3 pipeline; glossary entries
              through a Tier 4 pipeline. Both were fully audited in April 2026.
            </P>
          </section>

          <section id="sources">
            <H2 id="sources">Sources we rely on</H2>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Primary Qur&apos;anic text:</strong>{' '}
              The Uthmani codex, with cross-reference against standard Qur&apos;anic morphology
              references maintained by Arabic linguistics scholarship.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Classical tafsir:</strong>{' '}
              al-&#7788;abar&#299; (<em>J&#257;mi&#703; al-Bay&#257;n</em>), Ibn Kath&#299;r (<em>Tafs&#299;r al-Qur&apos;&#257;n
              al-&#703;A&#7827;&#299;m</em>), al-Qur&#7789;ub&#299; (<em>al-J&#257;mi&#703; li-A&#7717;k&#257;m al-Qur&apos;&#257;n</em>),
              al-R&#257;z&#299; (<em>Maf&#257;t&#299;&#7717; al-Ghayb</em>), al-Zamakhshar&#299; (<em>al-Kashsh&#257;f</em>),
              Ibn &#703;&#256;sh&#363;r (<em>al-Ta&#7717;r&#299;r wa-l-Tanw&#299;r</em>).
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Lexical references:</strong>{' '}
              Lane&apos;s Lexicon, Ibn Man&#7827;&#363;r&apos;s <em>Lis&#257;n al-&#703;Arab</em>, Hans Wehr.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">&#7716;ad&#299;th:</strong>{' '}
              &#7778;a&#7717;&#299;&#7717; al-Bukh&#257;r&#299;, &#7778;a&#7717;&#299;&#7717; Muslim, the four Sunan
              (Ab&#363; D&#257;w&#363;d, al-Tirmidh&#299;, al-Nas&#257;&apos;&#299;, Ibn M&#257;jah), Musnad A&#7717;mad,
              and other standard collections. Where a &#7717;ad&#299;th is cited, we aim for book reference
              and grading where available.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Contemporary scholarship:</strong>{' '}
              selected work by Ibn &#703;&#256;sh&#363;r, Sayyid Qu&#7789;b (critically), F&#257;&#7693;il al-S&#257;mirr&#257;&apos;&#299;,
              Khaled Abou El Fadl, Jonathan Brown, Jasser Auda, and practitioners in the Bayyinah,
              Yaqeen, and AlMaghrib traditions.
            </P>
          </section>

          <section id="limits">
            <H2 id="limits">What we do not claim</H2>
            <P>
              We do not claim the authority of a traditional <em>&#703;&#257;lim</em>. We do not claim
              the authority of an academic &nbsp;mufassir&nbsp; credentialed through a doctoral
              program. We do not claim our tadabbur is a substitute for studying with a
              qualified teacher, reading primary sources, or learning classical Arabic. We do
              not claim these pages are infallible; they are subject to correction by scholars
              who know more than we do, and we welcome such corrections.
            </P>
            <P>
              What we do claim is this: every page passes our three validators before publication;
              every contested verse is treated with the classical juridical framework made
              explicit; every interpretive claim is either grounded in the classical corpus or
              offered as contemplative reflection clearly marked as such; every morphological
              tag is cross-checked; every &#7717;ad&#299;th citation aims for source and grading.
              That is the standard we hold ourselves to.
            </P>
          </section>

          <section id="corrections">
            <H2 id="corrections">Corrections and contact</H2>
            <P>
              If you are a scholar, teacher, or careful reader and you have found an error
              &mdash; an Arabic typo, a misattributed citation, a classical reading we flattened,
              a &#7717;ad&#299;th without a reference &mdash; please tell us.
            </P>
            <P>
              Email: <a href="mailto:corrections@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">corrections@ayahguide.com</a>.
              Every correction received from a credentialed source is reviewed within fourteen days,
              and we publish a changelog for substantive corrections that affect interpretation.
            </P>
            <P>
              See also:{' '}
              <Link href="/about" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                About AyahGuide
              </Link>{' '}
              and{' '}
              <Link href="/contested-verses" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] transition-colors underline-offset-2 hover:underline">
                How We Handle Contested Verses
              </Link>.
            </P>
          </section>
        </div>
      </div>
    </>
  )
}
