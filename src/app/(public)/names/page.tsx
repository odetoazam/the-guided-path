import Link from 'next/link'
import type { Metadata } from 'next'
import { DIVINE_NAMES, COVERED_NAMES, NAMES_NOT_IN_QURAN } from '@/data/divine-names'
import { CANONICAL_URL } from '@/lib/constants'

export const metadata: Metadata = {
  title: 'The 99 Names of Allah — Asma ul Husna, Verified Against the Quran',
  description:
    'All 99 names of Allah with Arabic, meaning, and root. Which names the Quran actually uses, which are derived from its verbs, and where the list of 99 comes from.',
  alternates: { canonical: `${CANONICAL_URL}/names` },
  openGraph: {
    title: 'The 99 Names of Allah — Asma ul Husna',
    description:
      'All 99 names with Arabic, meaning, and root — plus which names the Quran actually uses and where the list itself comes from.',
    url: `${CANONICAL_URL}/names`,
    type: 'website',
  },
}

export default function NamesPage() {
  const covered = COVERED_NAMES.length
  const absent = NAMES_NOT_IN_QURAN.length

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <header className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gold-500">
          Names of Allah
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-navy dark:text-cream sm:text-5xl">
          The 99 Names of Allah
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-cream/70">
          Every name below carries its Arabic, its root, and how often that word appears in
          the Quran — counted against the Quranic corpus rather than copied from another
          list. {covered} have a full article so far; the rest are named honestly as
          not yet written.
        </p>
      </header>

      {/* Where the list comes from — the methodology note, stated up front */}
      <section className="mb-12 rounded-xl border border-gold-500/20 bg-gold-500/5 p-6 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-navy dark:text-cream">
          Where the list of 99 comes from
        </h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-cream/75">
          <p>
            That Allah has ninety-nine names is established in the strongest collections —
            al-Bukhari and Muslim both record it. The <em>itemised list</em> is a separate
            question, and the tradition has never treated the two as equally settled.
          </p>
          <p>
            The enumeration most people know comes through a narration in{' '}
            <strong>Sunan al-Tirmidhi</strong>. It is missing from the strongest chains, and
            classical scholars — including{' '}
            <strong>Ibn Taymiyyah</strong> and <strong>Ibn Hajar</strong> — treated the list
            as the work of a transmitter rather than the words of the Prophet&nbsp;ﷺ. Other
            scholars compiled different lists, which is why you will find names on one list
            that are absent from another.
          </p>
          <p>
            We use the Tirmidhi list because it is the one people search for. Presenting it
            as though it were beyond dispute would be the easier thing to do and the less
            honest one.
          </p>
        </div>
      </section>

      {/* What the counts mean */}
      <section className="mb-10 rounded-xl border border-zinc-200 bg-zinc-50 p-6 dark:border-navy-medium dark:bg-navy-medium/30 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-navy dark:text-cream">
          What the numbers mean
        </h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-cream/75">
          <p>
            The count beside each name is how many times that <em>word</em> appears in the
            Quran as a noun or adjective. It is not a count of how often the word names
            Allah — those are different questions. <strong>Al-Mu&rsquo;min</strong> appears
            202 times, and almost all of them describe human believers.{' '}
            <strong>An-Nur</strong> appears 43 times, and Allah is named as light in exactly
            one of them.
          </p>
          <p>
            <strong>{absent} of the 99 never appear in the Quran in that form at all.</strong>{' '}
            Several are drawn from its verbs rather than quoted from it — the Quran says{' '}
            <em>He gives life and causes death</em>, and from that verb pair come Al-Muhyi
            and Al-Mumit. Those names are marked below.
          </p>
        </div>
      </section>

      {/* Covered names first — these are the ones with real depth */}
      {covered > 0 && (
        <section className="mb-12">
          <h2 className="mb-4 font-serif text-2xl font-bold text-navy dark:text-cream">
            Names we&rsquo;ve written on
          </h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {COVERED_NAMES.map((n) => (
              <Link
                key={n.number}
                href={`/posts/${n.articleSlug}`}
                className="group rounded-xl border border-gold-500/25 bg-gold-500/[0.04] p-5 transition-colors hover:border-gold-500/50 hover:bg-gold-500/[0.08]"
              >
                <div className="flex items-baseline justify-between gap-3">
                  <span
                    dir="rtl"
                    style={{ fontFamily: 'var(--font-amiri)' }}
                    className="text-2xl leading-loose text-gold-500"
                  >
                    {n.arabic}
                  </span>
                  <span className="shrink-0 text-[11px] uppercase tracking-widest text-zinc-400 dark:text-cream/40">
                    {n.number}
                  </span>
                </div>
                <p className="mt-1 font-serif text-lg font-semibold text-navy group-hover:text-gold-500 dark:text-cream">
                  {n.translit}
                </p>
                <p className="text-sm text-zinc-600 dark:text-cream/60">{n.english}</p>
                <p className="mt-2 text-xs text-zinc-500 dark:text-cream/45">
                  {n.root} · {n.wordCount}× in the Quran
                </p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* The full list */}
      <section>
        <h2 className="mb-4 font-serif text-2xl font-bold text-navy dark:text-cream">
          All 99
        </h2>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left dark:border-navy-medium">
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">#</th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Name</th>
                <th className="py-3 pr-3 text-right font-medium text-zinc-500 dark:text-cream/50">
                  Arabic
                </th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Meaning</th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Root</th>
                <th className="py-3 font-medium text-zinc-500 dark:text-cream/50">
                  Word in Quran
                </th>
              </tr>
            </thead>
            <tbody>
              {DIVINE_NAMES.map((n) => (
                <tr
                  key={n.number}
                  className="border-b border-zinc-100 align-middle dark:border-navy-medium/40"
                >
                  <td className="py-3 pr-3 text-xs text-zinc-400 dark:text-cream/35">{n.number}</td>
                  <td className="py-3 pr-3 font-medium text-navy dark:text-cream">
                    {n.articleSlug ? (
                      <Link
                        href={`/posts/${n.articleSlug}`}
                        className="text-gold-500 underline-offset-4 hover:underline"
                      >
                        {n.translit}
                      </Link>
                    ) : (
                      n.translit
                    )}
                  </td>
                  <td
                    dir="rtl"
                    style={{ fontFamily: 'var(--font-amiri)' }}
                    className="py-3 pr-3 text-right text-lg leading-loose text-gold-500/90"
                  >
                    {n.arabic}
                  </td>
                  <td className="py-3 pr-3 text-zinc-600 dark:text-cream/65">{n.english}</td>
                  <td className="py-3 pr-3 text-xs text-zinc-500 dark:text-cream/45">{n.root}</td>
                  <td className="py-3 text-zinc-600 dark:text-cream/65">
                    {n.wordCount > 0 ? (
                      <span>{n.wordCount}×</span>
                    ) : (
                      <span className="text-xs italic text-zinc-400 dark:text-cream/40">
                        not in this form
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <p className="mt-10 text-sm text-zinc-500 dark:text-cream/50">
        Counts are generated from the Quranic Arabic Corpus and re-checked on every build.
        Read how we handle sources on our{' '}
        <Link href="/methodology" className="text-gold-500 underline-offset-4 hover:underline">
          methodology page
        </Link>
        .
      </p>
    </div>
  )
}
