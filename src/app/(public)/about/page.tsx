import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/about`

export const metadata: Metadata = {
  title: { absolute: "About AyahGuide — A Contemplative Companion for the Qur'an" },
  description:
    'AyahGuide is a Quranic tadabbur platform for the thinking reader — a living map of Quranic meaning paired with a personal reflection layer. Here is who we are, what we build, and why.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'About AyahGuide',
    description:
      'A living map of Quranic meaning, built for the thinking reader who wants depth without dilution or apology.',
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'AboutPage',
      '@id': pageUrl,
      name: 'About AyahGuide',
      url: pageUrl,
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'About', item: pageUrl },
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

function P({ children }: { children: React.ReactNode }) {
  return <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">{children}</p>
}

export default function AboutPage() {
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
            <span className="text-zinc-500 dark:text-zinc-400">About</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              About AyahGuide
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              A living map of Qur&apos;anic meaning, built for the thinking reader.
            </p>
          </div>

          <nav aria-label="Table of contents" className="mt-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600">On this page</p>
            <ol className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#what-it-is" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">What AyahGuide is</a></li>
              <li><a href="#what-its-not" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">What AyahGuide is not</a></li>
              <li><a href="#who-its-for" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Who this is for</a></li>
              <li><a href="#how-we-read" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">How we read</a></li>
              <li><a href="#on-the-author" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">On the author</a></li>
              <li><a href="#standards" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Editorial standards</a></li>
              <li><a href="#contact" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Contact</a></li>
            </ol>
          </nav>

          <section id="what-it-is">
            <H2 id="what-it-is">What AyahGuide is</H2>
            <P>
              AyahGuide is a platform for <strong className="text-zinc-600 dark:text-zinc-300">tadabbur</strong>&nbsp;&mdash;
              sustained, contemplative engagement with the Qur&apos;an. The Qur&apos;an itself commands it:
              <em> afa-l&#257; yatadabbar&#363;na al-qur&apos;&#257;n </em>(&ldquo;Do they not reflect deeply on
              the Qur&apos;an?&rdquo;, 4:82).
            </P>
            <P>
              The site is built around three layers. First, a <Link href="/surahs" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">surah map</Link>{' '}
              — a navigable overview of all 114 surahs, each with a visual architecture page that
              makes the structural, thematic, and linguistic shape of the surah visible. Second,
              ayah-level tadabbur: deep reflections on specific verses, produced with a
              disciplined methodology and gated by a three-validator pipeline before publication.
              Third, a <Link href="/glossary" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">glossary</Link>{' '}
              of Qur&apos;anic terms designed to let a non-Arabic reader engage the linguistic
              depth of the text.
            </P>
            <P>
              Above those layers, an authenticated <Link href="/profile" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">reading layer</Link>{' '}
              tracks what you read and lets you save what matters. The tadabbur queue is active
              and ongoing; new reflections ship regularly.
            </P>
          </section>

          <section id="what-its-not">
            <H2 id="what-its-not">What AyahGuide is not</H2>
            <P>
              It is not a tafsir. Classical tafsir is the discipline of trained scholars using
              technical tools; AyahGuide stands on the tafsir tradition but does not replace it.
            </P>
            <P>
              It is not a translation. English translation is a specific craft with its own
              lineage; AyahGuide uses translations as a bridge, not as the primary object of
              reflection.
            </P>
            <P>
              It is not a chatbot. We do not believe the right answer to deep engagement with
              revelation is a conversational interface that invents answers on demand. Depth
              requires structure, citation, and the discipline of staying with a verse.
            </P>
            <P>
              It is not a platform for rulings. Nothing on this site is fatw&#257;. For a question
              that requires a ruling specific to your life, consult a qualified scholar within
              your <em>madhhab</em>. See{' '}
              <Link href="/methodology" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                Our Methodology
              </Link>{' '}
              for the full distinction.
            </P>
          </section>

          <section id="who-its-for">
            <H2 id="who-its-for">Who this is for</H2>
            <P>
              AyahGuide is written for the thinking reader &mdash; Muslim or not &mdash; who wants
              to engage the Qur&apos;an with depth rather than surface piety or surface skepticism.
            </P>
            <P>
              For Muslim readers who have read translations, listened to lectures, and still feel
              that the text has layers they haven&apos;t reached. For students of Arabic who want
              to see the morphology and rhetoric made visible on the page. For non-Muslim readers
              &mdash; journalists, comparative-religion students, curious outsiders &mdash; who
              want a serious, classically grounded treatment of the text rather than polemics in
              either direction.
            </P>
            <P>
              We address both audiences through the same writing. We do not water down what the
              verses say. We also do not perform triumphalism. Depth is the posture; honesty is
              the method.
            </P>
          </section>

          <section id="how-we-read">
            <H2 id="how-we-read">How we read</H2>
            <P>
              Classical tafsir is the floor. Morphology is verified. Contemplative reflection is
              offered as reflection, not ruling. <em>Ikhtil&#257;f</em> &mdash; the legitimate range of
              classical scholarly disagreement &mdash; is honored rather than flattened. Contested
              verses carry the full juridical framework classical fiqh has always attached to them.
            </P>
            <P>
              The full statement is on the{' '}
              <Link href="/methodology" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                Methodology page
              </Link>.
              For the specific approach we take to the hardest passages, see{' '}
              <Link href="/contested-verses" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                How We Handle Contested Verses
              </Link>.
            </P>
          </section>

          <section id="on-the-author">
            <H2 id="on-the-author">On the author</H2>
            <P>
              AyahGuide is edited and maintained by a small team led by its founder, a Muslim
              writer and builder who has been studying the Qur&apos;an for two decades and building
              for the public web for roughly as long. We do not currently publish the founder&apos;s
              name with each piece, for two reasons: the work is intended to point readers toward
              the Qur&apos;an rather than toward a personality, and the interpretive authority of
              the pages rests on the classical tradition they draw from, not on the individual
              who curated them.
            </P>
            <P>
              Where an individual page carries an attribution line in the future, it will be
              because the specific piece deserves one. Until then: the voice is ours, the sources
              are named throughout, and the corrections channel is open.
            </P>
          </section>

          <section id="standards">
            <H2 id="standards">Editorial standards</H2>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Pre-publication validation.</strong>{' '}
              Every tadabbur passes a three-validator pipeline before reaching readers: Arabic text
              verification, morphology verification, and tafsir cross-reference. See{' '}
              <Link href="/methodology#validators" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">
                the methodology page
              </Link>{' '}
              for details.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Retrospective audit.</strong>{' '}
              Surah-level descriptions and glossary entries have been audited and
              cross-referenced against classical sources (April 2026 audit complete; all entries
              verified accurate).
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Corrections policy.</strong>{' '}
              We accept corrections from any reader. Substantive corrections from credentialed
              scholars are reviewed within fourteen days. Where a correction affects interpretation,
              we publish a changelog entry.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">No AI-chatbot pathways.</strong>{' '}
              We use modern writing tools in our production workflow &mdash; drafting, checking,
              editing &mdash; but no content on this site is published as raw AI output. Every
              page is edited by a human familiar with classical sources, validated by our pipeline,
              and published under our editorial standard. A page that claims classical grounding
              has that grounding or it does not ship.
            </P>
          </section>

          <section id="contact">
            <H2 id="contact">Contact</H2>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Corrections:</strong>{' '}
              <a href="mailto:corrections@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">corrections@ayahguide.com</a>
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Scholars and institutions:</strong>{' '}
              <a href="mailto:scholars@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">scholars@ayahguide.com</a>
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Press and media:</strong>{' '}
              <a href="mailto:press@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">press@ayahguide.com</a>
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">General:</strong>{' '}
              <a href="mailto:hello@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">hello@ayahguide.com</a>
            </P>
          </section>
        </div>
      </div>
    </>
  )
}
