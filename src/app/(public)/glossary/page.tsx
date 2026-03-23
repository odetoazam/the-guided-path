import type { Metadata } from 'next'
import { CANONICAL_URL, SITE_NAME } from '@/lib/constants'
import { GlossaryGrid } from '@/components/glossary/GlossaryGrid'

const pageUrl = `${CANONICAL_URL}/glossary`

export const metadata: Metadata = {
  title: 'Glossary — A Treasury of Quranic Concepts',
  description:
    'Explore the concepts that shape how a Muslim sees the world — tawbah, sabr, barzakh, and more. Not a dictionary, but a doorway.',
  alternates: { canonical: pageUrl },
  openGraph: {
    title: `Glossary | ${SITE_NAME}`,
    description:
      'A treasury of Quranic concepts — states of the heart, the unseen, Quranic characters, nations, and study terms.',
    type: 'website',
    url: pageUrl,
    siteName: SITE_NAME,
  },
  twitter: {
    card: 'summary',
    title: `Glossary | ${SITE_NAME}`,
    description: 'A treasury of Quranic concepts — the ideas that shape how a Muslim sees the world.',
  },
}

export default function GlossaryPage() {
  return (
    <div className="min-h-screen">
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-zinc-200 px-5 pb-12 pt-14 text-center dark:border-white/[0.05]">
        {/* Decorative Arabic letter */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-0 -translate-x-1/2 select-none text-[22rem] leading-none text-zinc-900/[0.03] dark:text-white/[0.015]"
          style={{ fontFamily: "var(--font-amiri,'Amiri'),serif" }}
        >
          م
        </div>

        <div className="relative mx-auto max-w-xl">
          <p className="mb-3 text-xs font-medium tracking-[0.25em] uppercase text-[rgba(212,175,55,0.65)] dark:text-[rgba(212,175,55,0.55)]">
            Treasury of Concepts
          </p>
          <h1 className="font-serif text-3xl font-bold text-navy-dark sm:text-4xl dark:text-cream">
            The Glossary
          </h1>
          <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            These are the concepts that shape how a Muslim sees the world —
            not definitions to memorize, but doorways to walk through.
            Each term has been lived, debated, and refined over fourteen centuries.
          </p>
        </div>
      </div>

      <GlossaryGrid />
    </div>
  )
}
