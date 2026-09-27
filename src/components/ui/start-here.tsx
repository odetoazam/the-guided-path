import Link from 'next/link'

// Start Here — three quiet routes in for a first-time reader.
// Every href below was checked live before shipping; keep it to six links.
const ROUTES = [
  {
    label: 'New to reading closely',
    blurb: 'A short guided sequence, or a plain guide to reading with understanding.',
    links: [
      { href: '/paths/reading-the-quran-differently', text: 'Reading the Quran Differently', note: 'a guided path' },
      { href: '/understanding-quran', text: 'How to read the Quran with understanding', note: 'the primer' },
    ],
  },
  {
    label: 'Ready for a long read',
    blurb: 'Two close readings that show the method at full length.',
    links: [
      { href: '/posts/psychology-of-shaytan', text: 'The Psychology of Shaytan', note: 'a dissection' },
      { href: '/posts/stars-in-the-quran', text: 'Stars in the Quran', note: 'lamps, guides, a guarded sky' },
    ],
  },
  {
    label: 'Curious how we read',
    blurb: 'The sources we lean on, and how we handle the verses people argue over.',
    links: [
      { href: '/methodology', text: 'How we read', note: 'methodology' },
      { href: '/contested-verses', text: 'Contested verses', note: 'reflection, not ruling' },
    ],
  },
] as const

export function StartHere({ as: Heading = 'h2' }: { as?: 'h1' | 'h2' }) {
  return (
    <div className="mx-auto max-w-5xl">
      <p className="text-center text-xs font-medium tracking-[0.2em] uppercase text-zinc-400 dark:text-cream/30">
        Start here
      </p>
      <Heading className="mt-3 text-center font-serif text-2xl sm:text-3xl font-bold text-navy dark:text-cream">
        Three ways in
      </Heading>
      <p className="mx-auto mt-3 max-w-xl text-center text-sm leading-relaxed text-zinc-500 dark:text-cream/50">
        Pick the one closest to where you are. None of them needs to be finished in one sitting.
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {ROUTES.map(route => (
          <div
            key={route.label}
            className="flex flex-col rounded-2xl border border-zinc-200 bg-white p-6 dark:border-white/[0.06] dark:bg-white/[0.02]"
          >
            <h3 className="font-serif text-lg font-semibold leading-snug text-navy-dark dark:text-cream">
              {route.label}
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              {route.blurb}
            </p>
            <ul className="mt-4 space-y-3">
              {route.links.map(link => (
                <li key={link.href}>
                  <Link href={link.href} className="group block">
                    <span className="text-sm font-medium text-[#b8953f] dark:text-[rgba(212,175,55,0.8)] group-hover:text-[#C9A84C] transition-colors">
                      {link.text} →
                    </span>
                    <span className="block text-xs text-zinc-400 dark:text-cream/30">{link.note}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}
