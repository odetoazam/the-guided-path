import Link from 'next/link'
import type { Metadata } from 'next'
import { createAdminClient } from '@/lib/supabase/admin'
import { PROPHETS, OTHER_FIGURES, type QuranicFigure } from '@/data/quranic-figures'
import { CANONICAL_URL } from '@/lib/constants'

export const revalidate = 3600
export const fetchCache = 'force-no-store'

export const metadata: Metadata = {
  title: 'The 25 Prophets Named in the Quran — How Often Each Appears',
  description:
    'Every prophet the Quran names, with the Arabic and how many times each is mentioned — counted against the Quranic corpus. Musa 136 times; Muhammad ﷺ four.',
  alternates: { canonical: `${CANONICAL_URL}/prophets` },
  openGraph: {
    title: 'The 25 Prophets Named in the Quran',
    description:
      'Every prophet the Quran names, with the Arabic and a verified count of how often each appears.',
    url: `${CANONICAL_URL}/prophets`,
    type: 'website',
  },
}

/** Article counts per entity hub, so the page shows where there is real depth to read. */
async function getArticleCounts(): Promise<Record<string, number>> {
  try {
    const supabase = createAdminClient()
    const counts: Record<string, number> = {}
    for (let from = 0; ; from += 1000) {
      const { data, error } = await supabase
        .from('entity_tags')
        .select('entities:entity_id(slug), posts:post_id(status, type)')
        .range(from, from + 999)
      if (error || !data) break
      for (const row of data as any[]) {
        const slug = row.entities?.slug
        const post = row.posts
        if (!slug || !post) continue
        if (post.status !== 'published' || post.type !== 'article') continue
        counts[slug] = (counts[slug] || 0) + 1
      }
      if (data.length < 1000) break
    }
    return counts
  } catch {
    return {}
  }
}

function FigureRow({ f, counts }: { f: QuranicFigure; counts: Record<string, number> }) {
  const n = f.hubSlug ? counts[f.hubSlug] || 0 : 0
  return (
    <tr className="border-b border-zinc-100 align-middle dark:border-navy-medium/40">
      {f.order !== undefined && (
        <td className="py-3 pr-3 text-xs text-zinc-400 dark:text-cream/35">{f.order}</td>
      )}
      <td className="py-3 pr-3 font-medium text-navy dark:text-cream">
        {f.hubSlug ? (
          <Link
            href={`/hub/${f.hubSlug}`}
            className="text-gold-500 underline-offset-4 hover:underline"
          >
            {f.translit}
          </Link>
        ) : (
          f.translit
        )}
      </td>
      <td
        dir="rtl"
        style={{ fontFamily: 'var(--font-amiri)' }}
        className="py-3 pr-3 text-right text-lg leading-loose text-gold-500/90"
      >
        {f.arabic}
      </td>
      <td className="py-3 pr-3 text-zinc-600 dark:text-cream/65">{f.english}</td>
      <td className="py-3 pr-3 tabular-nums text-zinc-600 dark:text-cream/65">{f.count}×</td>
      <td className="py-3 text-sm text-zinc-500 dark:text-cream/50">
        {n > 0 ? (
          <Link href={`/hub/${f.hubSlug}`} className="hover:text-gold-500">
            {n} article{n === 1 ? '' : 's'}
          </Link>
        ) : (
          <span className="text-xs italic text-zinc-400 dark:text-cream/35">not yet written</span>
        )}
      </td>
    </tr>
  )
}

export default async function ProphetsPage() {
  const counts = await getArticleCounts()
  const withDepth = PROPHETS.filter((p) => p.hubSlug && (counts[p.hubSlug] || 0) > 0).length

  return (
    <div className="mx-auto max-w-5xl px-5 py-14 sm:px-8">
      <header className="mb-12">
        <p className="mb-3 text-xs font-medium uppercase tracking-widest text-gold-500">
          People of the Quran
        </p>
        <h1 className="font-serif text-4xl font-bold leading-tight text-navy dark:text-cream sm:text-5xl">
          The 25 Prophets Named in the Quran
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-relaxed text-zinc-600 dark:text-cream/70">
          Twenty-five prophets are named in the Quran. Below is each one with the Arabic and
          a count of how often the name actually appears — taken from the Quranic corpus
          rather than repeated from another list. {withDepth} of them have articles here so
          far.
        </p>
      </header>

      <section className="mb-12 rounded-xl border border-gold-500/20 bg-gold-500/5 p-6 sm:p-7">
        <h2 className="font-serif text-xl font-bold text-navy dark:text-cream">
          What the counts show
        </h2>
        <div className="mt-3 space-y-3 text-[15px] leading-relaxed text-zinc-700 dark:text-cream/75">
          <p>
            <strong>Musa</strong> is named 136 times — more than any other person in the
            Quran. <strong>Muhammad&nbsp;ﷺ</strong> is named four, plus once as Ahmad
            (61:6). The Book to which he is central mentions him less often than it mentions
            Adam, Yusuf, Lut, Isa, Nuh, Ibrahim or Musa.
          </p>
          <p>
            <strong>Firaun</strong> appears 74 times, more than every prophet except Musa and
            Ibrahim. The Quran gives a great deal of room to the man a prophet was sent to.
          </p>
          <p>
            At the other end, <strong>Dhul-Kifl</strong> and <strong>Al-Yasa</strong> are
            named twice each, both times inside a list, with no story attached. The Quran
            names them and tells you nothing further — an absence worth as much attention as
            the long narratives.
          </p>
          <p className="text-sm text-zinc-500 dark:text-cream/55">
            A count is of the name, not of the person: a prophet can be present in a passage
            for many verses while being named once. Musa is described as much as he is named;
            the people of the Cave are never named at all.
          </p>
        </div>
      </section>

      <section className="mb-14">
        <h2 className="mb-4 font-serif text-2xl font-bold text-navy dark:text-cream">
          The twenty-five
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
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">
                  Often rendered
                </th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Named</th>
                <th className="py-3 font-medium text-zinc-500 dark:text-cream/50">On AyahGuide</th>
              </tr>
            </thead>
            <tbody>
              {PROPHETS.map((p) => (
                <FigureRow key={p.translit} f={p} counts={counts} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2">
          {PROPHETS.filter((p) => p.note).map((p) => (
            <p key={p.translit} className="text-sm text-zinc-600 dark:text-cream/60">
              <strong>{p.translit}</strong> — {p.note}
            </p>
          ))}
        </div>
      </section>

      <section>
        <h2 className="mb-2 font-serif text-2xl font-bold text-navy dark:text-cream">
          Others the Quran names
        </h2>
        <p className="mb-4 max-w-2xl text-[15px] leading-relaxed text-zinc-600 dark:text-cream/65">
          The named cast extends past the prophets — to a mother, a sage, a king, a tyrant
          and a man swallowed by the earth.
        </p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px] border-collapse text-sm">
            <thead>
              <tr className="border-b border-zinc-200 text-left dark:border-navy-medium">
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Name</th>
                <th className="py-3 pr-3 text-right font-medium text-zinc-500 dark:text-cream/50">
                  Arabic
                </th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">
                  Often rendered
                </th>
                <th className="py-3 pr-3 font-medium text-zinc-500 dark:text-cream/50">Named</th>
                <th className="py-3 font-medium text-zinc-500 dark:text-cream/50">On AyahGuide</th>
              </tr>
            </thead>
            <tbody>
              {OTHER_FIGURES.map((f) => (
                <FigureRow key={f.translit} f={f} counts={counts} />
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6 space-y-2">
          {OTHER_FIGURES.filter((f) => f.note).map((f) => (
            <p key={f.translit} className="text-sm text-zinc-600 dark:text-cream/60">
              <strong>{f.translit}</strong> — {f.note}
            </p>
          ))}
        </div>
      </section>

      <p className="mt-10 text-sm text-zinc-500 dark:text-cream/50">
        Counts are generated from the Quranic Arabic Corpus and re-checked on every build.
        See also the{' '}
        <Link href="/names" className="text-gold-500 underline-offset-4 hover:underline">
          99 names of Allah
        </Link>{' '}
        and our{' '}
        <Link href="/methodology" className="text-gold-500 underline-offset-4 hover:underline">
          methodology
        </Link>
        .
      </p>
    </div>
  )
}
