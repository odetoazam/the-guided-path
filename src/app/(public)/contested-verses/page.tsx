import type { Metadata } from 'next'
import Link from 'next/link'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'

const pageUrl = `${CANONICAL_URL}/contested-verses`

export const metadata: Metadata = {
  title: 'How We Handle Contested Verses',
  description:
    "AyahGuide treats the hardest verses in the Qur'an with classical juridical framing, honored ikhtilāf, and explicit cross-referencing to the verses that bound them. Here is how and why.",
  alternates: { canonical: pageUrl },
  openGraph: {
    title: 'How We Handle Contested Verses',
    description:
      'The approach we take to the hardest passages — classical fiqh grounding, honored ikhtilāf, and resistance to apologetics in either direction.',
    type: 'article',
    url: pageUrl,
    siteName: SITE_NAME,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Article',
      '@id': pageUrl,
      headline: 'How AyahGuide Handles Contested Verses',
      url: pageUrl,
      author: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      publisher: { '@type': 'Organization', name: SITE_NAME, url: CANONICAL_URL },
      inLanguage: 'en',
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: CANONICAL_URL },
        { '@type': 'ListItem', position: 2, name: 'Contested Verses', item: pageUrl },
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

function VerseCard({ verseRef, title, href, summary }: { verseRef: string; title: string; href: string; summary: string }) {
  return (
    <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/40 p-4">
      <div className="flex items-baseline justify-between gap-3">
        <h4 className="font-serif text-sm font-semibold text-zinc-900 dark:text-white">
          <Link href={href} className="hover:text-[rgba(212,175,55,1)] transition-colors">
            {verseRef} &mdash; {title}
          </Link>
        </h4>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">{summary}</p>
    </div>
  )
}

export default function ContestedVersesPage() {
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
            <span className="text-zinc-500 dark:text-zinc-400">Contested Verses</span>
          </nav>

          <div className="text-center">
            <div className="mb-4 font-amiri text-2xl text-[rgba(212,175,55,0.7)]">
              بِسْمِ اللهِ الرَّحْمَٰنِ الرَّحِيمِ
            </div>
            <h1 className="font-serif text-2xl font-bold text-zinc-900 dark:text-white sm:text-3xl sm:leading-snug">
              How We Handle Contested Verses
            </h1>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              The hardest passages in the Qur&apos;an, treated with classical juridical framing and
              honored <em>ikhtil&#257;f</em> &mdash; not apologetics, not selective truncation.
            </p>
          </div>

          <nav aria-label="Table of contents" className="mt-10 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-100/60 dark:bg-zinc-900/50 px-5 py-4">
            <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-600">On this page</p>
            <ol className="space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li><a href="#the-problem" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The problem with how contested verses are usually read</a></li>
              <li><a href="#five-commitments" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Five commitments on every contested page</a></li>
              <li><a href="#two-temptations" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">The two temptations we try to resist</a></li>
              <li><a href="#verses-covered" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Verses we have treated so far</a></li>
              <li><a href="#verses-queued" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">Verses in the queue</a></li>
              <li><a href="#for-journalists" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">For journalists and researchers</a></li>
              <li><a href="#misuse" className="hover:text-[rgba(212,175,55,0.9)] transition-colors">If a verse from AyahGuide is cited against us</a></li>
            </ol>
          </nav>

          <section id="the-problem">
            <H2 id="the-problem">The problem with how contested verses are usually read</H2>
            <P>
              A small set of Qur&apos;anic verses carry most of the weight in public debate about
              Islam. The combat verses (<em>q&#257;til&#363;</em>). The &#7717;ud&#363;d verses (amputation,
              flogging). The family-law verses (the &ldquo;polygamy verse,&rdquo; the <em>q-w-m</em> verse,
              the testimony verse). The interfaith-alliance verse. A handful of others.
            </P>
            <P>
              These verses are almost always read in three kinds of ways, and all three are
              failures. First, they are quoted by hostile critics as standalone lines stripped of
              context. Second, they are defended by embarrassed Muslim writers through softening
              and euphemism. Third, they are weaponized by actors who want permission for violence
              or oppression, through selective truncation of the classical framework that always
              bound them.
            </P>
            <P>
              Classical Islamic scholarship never read these verses the way any of those three
              groups read them. The classical tafsir, and the classical juridical tradition built
              on it, always placed these verses within a dense framework of conditions,
              cross-references, and evidentiary requirements. That framework is what makes the
              verses readable.
            </P>
            <P>
              Our project on the hardest verses is to put the classical framework back on the page.
            </P>
          </section>

          <section id="five-commitments">
            <H2 id="five-commitments">Five commitments on every contested page</H2>
            <P>
              When we publish on a verse that is politically, theologically, or legally contested,
              five things happen in the body of the piece.
            </P>
            <div className="mt-4 space-y-4">
              <div>
                <H3>1. Name the classical juridical category.</H3>
                <P>
                  If the ayah concerns a <em>&#7717;add</em> (a fixed punishment in Islamic law),
                  we name the category &mdash; <em>&#7717;ir&#257;bah</em>, <em>sariqah</em>,{' '}
                  <em>zin&#257;</em>, <em>qadhf</em> &mdash; and cite the four schools&apos; reading
                  of how the &#7717;add applies. If the ayah concerns combat, we name it as
                  defensive/responsive combat under the classical <em>jih&#257;d al-daf&#703;</em> framework.
                </P>
              </div>
              <div>
                <H3>2. Name the conditions (shur&#363;&#7789;) that bound the ruling.</H3>
                <P>
                  Classical fiqh never read a ruling without its conditions. For the &#7717;add of
                  theft: the <em>ni&#7779;&#257;b</em> threshold, the <em>&#7717;irz</em> (secured-custody)
                  requirement, full legal capacity, strict evidentiary standards, the
                  doubt-averts-the-&#7717;ud&#363;d principle (<em>idra&apos;&#363; al-&#7717;ud&#363;da
                  bi-l-shubuh&#257;t</em>), and suspension in times of necessity. Similar condition-lists
                  apply for every other &#7717;add. We include them on the page.
                </P>
              </div>
              <div>
                <H3>3. Name the verses that bound the verse.</H3>
                <P>
                  The Qur&apos;an interprets itself. A verse about interfaith alliance must be read
                  against 5:5 (lawful marriage with chaste women of the People of the Book) and
                  60:8 (the obligation of justice toward non-Muslims who do not fight you). A
                  verse about combat must be read against the prohibition of aggression in the
                  same passage (2:190). A verse about testimony must be read against 24:6-9
                  (<em>li&#703;&#257;n</em>, where the woman&apos;s oath is decisive). We make these
                  cross-references explicit.
                </P>
              </div>
              <div>
                <H3>4. Honor ikhtil&#257;f.</H3>
                <P>
                  Where the classical mufasir&#363;n disagree, we name the range of positions and
                  cite them by scholar &mdash; al-&#7788;abar&#299; here, Ibn Kath&#299;r there,
                  al-Qur&#7789;ub&#299; in a third place. We do not flatten classical disagreement
                  into a single reading for rhetorical convenience.
                </P>
              </div>
              <div>
                <H3>5. Name modern misuse, briefly and directly.</H3>
                <P>
                  Where a regime, faction, or ideological movement has misused a verse by
                  detaching it from the classical framework, we say so &mdash; briefly, without
                  polemic, and on the authority of the classical tradition that stands against
                  the misuse. The classical tradition is the most effective rebuttal of
                  modern abuses of classical texts. It is almost always on the side the misusers
                  are claiming against.
                </P>
              </div>
            </div>
          </section>

          <section id="two-temptations">
            <H2 id="two-temptations">The two temptations we try to resist</H2>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Apologetic softening.</strong>{' '}
              The temptation to make a verse say less than the classical tradition says it says,
              because the full reading is uncomfortable in contemporary discourse. We try not to
              do this. If the classical tradition holds that a verse permits X, then the page
              says so &mdash; inside the conditions that bound X. Soft-pedaling the permission
              disrespects both the reader and the tradition.
            </P>
            <P>
              <strong className="text-zinc-600 dark:text-zinc-300">Triumphalist hardening.</strong>{' '}
              The opposite temptation &mdash; to make a verse say more than the classical tradition
              says it says, because an expansive reading flatters a particular ideology. We try not
              to do this either. If a verse is bounded by conditions, the conditions appear in the
              piece. If a ruling was rarely applied in classical practice, we say so.
            </P>
            <P>
              Between the two temptations, the classical tradition is the path. It is not
              apologetic and it is not triumphalist. It is disciplined.
            </P>
          </section>

          <section id="verses-covered">
            <H2 id="verses-covered">Verses we have treated so far</H2>
            <P>
              The contested-verses project is ongoing. These are the passages where we have
              published the full juridical-classical framework. Each is linked to the live page.
            </P>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <VerseCard
                verseRef="2:188-191"
                title="Combat permission and its boundary"
                href="/surahs/al-baqarah"
                summary="Form III qātilū as relational combat, the lā taʿtadū boundary inside the permission, fitnah as testing-by-fire, the Sacred Mosque exception."
              />
              <VerseCard
                verseRef="2:217-220"
                title="Fighting in the sacred month + progressive prohibition of khamr"
                href="/surahs/al-baqarah"
                summary="Fitnah weighed against qatl, the four-stage Quranic prohibition of alcohol, honest acknowledgment of benefits and greater harm."
              />
              <VerseCard
                verseRef="2:225-232"
                title="Divorce legislation and the 'degree' verse"
                href="/surahs/al-baqarah"
                summary="Two revocable divorces, the bi-l-maʿrūf principle, mithlu as reciprocal rights, darajah as added responsibility (Ibn ʿAbbās read)."
              />
              <VerseCard
                verseRef="2:282-286"
                title="The longest ayah + the female-testimony clause"
                href="/surahs/al-baqarah"
                summary="The debt-contract genre, the ayah's own rationale, 24:6-9 li'ān as counter-evidence, women as ḥadīth transmitters."
              />
              <VerseCard
                verseRef="4:3"
                title="The polygamy verse, read through the orphan context"
                href="/surahs/an-nisa"
                summary="Aisha's asbab al-nuzul, the orphan-guardian frame, the conditional structure, and 4:129 as structural bound."
              />
              <VerseCard
                verseRef="4:34"
                title="Qiwāmah — authority as burden, not privilege"
                href="/surahs/an-nisa"
                summary="Qawwāmūn as conditional standing, the classical ikhtilāf on qānitāt, bimā ḥafiẓa Allāh, the 'Aliyy Kabīr closing warning."
              />
              <VerseCard
                verseRef="5:32"
                title="Whoever kills one soul"
                href="/surahs/al-maidah"
                summary="The ka-annamā equation, the Children-of-Israel framing as universal binding, the kathīran coda as moral precision."
              />
              <VerseCard
                verseRef="5:33-34"
                title="The ḥirābah verse — Islam's law against terrorism"
                href="/surahs/al-maidah"
                summary="Named as ḥirābah, four-school graduated reading of the punishments, the Uraynah asbab al-nuzul, modern-misuse guardrail."
              />
              <VerseCard
                verseRef="5:38-39"
                title="The theft ḥadd and the conditions that bound it"
                href="/surahs/al-maidah"
                summary="Niṣāb threshold, ḥirz (secured custody), capacity, two-witness standard, doubt-averts-ḥudūd, ʿUmar's famine-year suspension."
              />
              <VerseCard
                verseRef="5:51-53"
                title="Interfaith alliance, read with 5:5 and 60:8"
                href="/surahs/al-maidah"
                summary="ʿAbdullāh ibn Ubayy asbab, walāyah as patronal political alliance not social friendship, the controlling cross-reference in 60:8."
              />
              <VerseCard
                verseRef="7:80-84"
                title="The Lut passage and the inversion of purity"
                href="/surahs/al-araf"
                summary="Form V yatatahharūn as effortful pursuit of purity, the sociological inversion of virtue, classical exegetical framing."
              />
            </div>
          </section>

          <section id="verses-queued">
            <H2 id="verses-queued">Verses in the queue</H2>
            <P>
              When the tadabbur queue reaches these passages, each will receive the full
              contested-verse treatment before publication:
            </P>
            <ul className="mt-3 ml-4 space-y-1.5 text-sm text-zinc-500 dark:text-zinc-400">
              <li>&bull; 3:19, 3:85 &mdash; exclusivity claims, with comparative context</li>
              <li>&bull; 3:28 &mdash; disbelievers as allies, alongside 60:8-9</li>
              <li>&bull; 4:11 &mdash; inheritance, with the full financial-obligation framework</li>
              <li>&bull; 4:24 &mdash; <em>m&#257; malakat aym&#257;nukum</em></li>
              <li>&bull; 4:89 &mdash; apostasy/hypocrites, disentangling political treason from belief</li>
              <li>&bull; 8:12, 47:4 &mdash; battle verses, with their specific historical referents</li>
              <li>&bull; 9:5 &mdash; the &ldquo;sword verse,&rdquo; with its specific context and the surrounding qualifications</li>
              <li>&bull; 9:29 &mdash; the <em>jizyah</em> verse, in its classical juridical frame</li>
              <li>&bull; 24:2, 24:4 &mdash; the <em>zin&#257;</em> &#7717;add and its paired protection against false accusation</li>
              <li>&bull; 24:31, 33:59 &mdash; modesty legislation</li>
              <li>&bull; 60:1 &mdash; enemies as allies, with 60:8 as the decisive bound</li>
              <li>&bull; 65:4 &mdash; <em>&#703;iddah</em> legislation</li>
            </ul>
          </section>

          <section id="for-journalists">
            <H2 id="for-journalists">For journalists and researchers</H2>
            <P>
              If you are writing a piece that touches a contested Qur&apos;anic verse and you want
              the classical framework readable in English, we are a usable reference. The pages
              above cite the classical mufasir&#363;n by name, identify the juridical category, and
              give the conditions that bound the ruling. Where we flag modern misuse, we do it on
              classical authority.
            </P>
            <P>
              We welcome direct contact from credentialed journalists and researchers:{' '}
              <a href="mailto:press@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">press@ayahguide.com</a>.
              Our editorial standards and source base are described in{' '}
              <Link href="/methodology" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">Our Methodology</Link>.
            </P>
          </section>

          <section id="misuse">
            <H2 id="misuse">If a page from AyahGuide is cited against us</H2>
            <P>
              If a critic pulls a line from one of our contested-verse pages out of its
              surrounding framework and presents it as proof that the site endorses violence,
              oppression, or exclusion: the page itself is the rebuttal. The classical conditions
              are on the page. The cross-references are on the page. The modern-misuse
              disclaimer is on the page. The line pulled out of context is never the whole page.
            </P>
            <P>
              We have tried to write every contested-verse piece so that any 300-word section,
              pulled out of context, still contains either a cross-reference, a condition, or a
              qualification that resists the bad-faith reading. Where we have failed to meet that
              standard, please tell us at{' '}
              <a href="mailto:corrections@ayahguide.com" className="text-[rgba(212,175,55,0.85)] hover:text-[rgba(212,175,55,1)] underline-offset-2 hover:underline">corrections@ayahguide.com</a>.
              We will fix it.
            </P>
          </section>
        </div>
      </div>
    </>
  )
}
