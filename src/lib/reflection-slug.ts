/**
 * Slug and reference helpers for ayah reflection pages.
 *
 * Kept separate from reflection-render so client components (hub tabs, path
 * cards) can build a link without pulling the server-side Markdown renderer
 * and its sanitize-html dependency into the browser bundle.
 */
import { SURAHS } from '@/lib/surahs'

/** "Al-Fatiha" 1:6-7 → "al-fatiha-1-6-7"; a single ayah → "an-nas-114-1". */
export function reflectionSlug(
  surah: number,
  ayahStart: number,
  ayahEnd: number
): string {
  const meta = SURAHS[surah - 1]
  const name = (meta?.nameEn ?? `surah-${surah}`)
    .toLowerCase()
    .replace(/['']/g, '')
    .replace(/\s+/g, '-')
  const range = ayahEnd && ayahEnd !== ayahStart ? `${ayahStart}-${ayahEnd}` : `${ayahStart}`
  return `${name}-${surah}-${range}`
}

/**
 * Parse the numeric tail of a reflection slug. The surah-name prefix is
 * decorative — the trailing numbers are the identity — so a renamed prefix
 * still resolves, and only the canonical form is linked and indexed.
 */
export function parseReflectionSlug(
  slug: string
): { surah: number; ayahStart: number; ayahEnd: number } | null {
  const m = slug.match(/-(\d{1,3})-(\d{1,3})(?:-(\d{1,3}))?$/)
  if (!m) return null
  const surah = parseInt(m[1], 10)
  const ayahStart = parseInt(m[2], 10)
  const ayahEnd = m[3] ? parseInt(m[3], 10) : ayahStart
  if (surah < 1 || surah > 114 || ayahStart < 1 || ayahEnd < ayahStart) return null
  return { surah, ayahStart, ayahEnd }
}

export function ayahRef(surah: number, ayahStart: number, ayahEnd: number): string {
  return ayahEnd && ayahEnd !== ayahStart
    ? `${surah}:${ayahStart}-${ayahEnd}`
    : `${surah}:${ayahStart}`
}
