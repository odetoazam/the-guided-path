import type { EntityCategory } from '@/types'

/**
 * Single source of truth for entity category display.
 *
 * These maps were previously duplicated in three files (the post page, the hub page,
 * and HubTabs), which meant adding a category required three synchronised edits and
 * silently rendered `undefined` anywhere one was missed. Import from here instead.
 *
 * Order matters: this is the order categories appear in browse UIs.
 */

export const CATEGORY_ORDER: EntityCategory[] = [
  'divine_names',
  'quranic_characters',
  'states_of_the_heart',
  'theology_and_ethics',
  'concepts_of_existence',
  'the_unseen',
  'nations_and_peoples',
  'study_terms',
]

export const CATEGORY_LABELS: Record<EntityCategory, string> = {
  divine_names: 'Names of Allah',
  states_of_the_heart: 'States of the Heart',
  the_unseen: 'The Unseen',
  quranic_characters: 'Prophets & Characters',
  nations_and_peoples: 'Nations & Peoples',
  study_terms: 'Study Terms',
  concepts_of_existence: 'Concepts of Existence',
  theology_and_ethics: 'Theology & Ethics',
}

/**
 * Divine names take gold — the site's primary accent — because the names are the
 * attribute every other category ultimately points at, not a peer topic.
 */
export const CATEGORY_STYLES: Record<EntityCategory, string> = {
  divine_names: 'bg-gold-500/10 text-gold-500/80 border-gold-500/20',
  states_of_the_heart: 'bg-rose-500/10 text-rose-300/70 border-rose-500/15',
  the_unseen: 'bg-violet-500/10 text-violet-300/70 border-violet-500/15',
  quranic_characters: 'bg-amber-500/10 text-amber-300/70 border-amber-500/15',
  nations_and_peoples: 'bg-teal-500/10 text-teal-300/70 border-teal-500/15',
  concepts_of_existence: 'bg-sky-500/10 text-sky-300/70 border-sky-500/15',
  theology_and_ethics: 'bg-indigo-500/10 text-indigo-300/70 border-indigo-500/15',
  study_terms: 'bg-zinc-500/10 text-zinc-300/70 border-zinc-500/15',
}

/**
 * Card-surface treatments (background tint + hover border) for browse grids.
 * Lives here so a new category can't ship with a chip but no card treatment —
 * ArticlesGrid previously kept its own copy of these and silently dropped
 * divine_names, which put 36 articles in a generic fallback chip.
 */
export const CATEGORY_CARD_STYLES: Record<EntityCategory, { tint: string; hoverBorder: string }> = {
  divine_names: { tint: 'rgba(212,175,55,0.05)', hoverBorder: 'rgba(212,175,55,0.28)' },
  states_of_the_heart: { tint: 'rgba(244,63,94,0.05)', hoverBorder: 'rgba(244,63,94,0.22)' },
  the_unseen: { tint: 'rgba(139,92,246,0.05)', hoverBorder: 'rgba(139,92,246,0.22)' },
  quranic_characters: { tint: 'rgba(245,158,11,0.05)', hoverBorder: 'rgba(245,158,11,0.22)' },
  nations_and_peoples: { tint: 'rgba(20,184,166,0.05)', hoverBorder: 'rgba(20,184,166,0.22)' },
  concepts_of_existence: { tint: 'rgba(14,165,233,0.05)', hoverBorder: 'rgba(14,165,233,0.22)' },
  theology_and_ethics: { tint: 'rgba(99,102,241,0.05)', hoverBorder: 'rgba(99,102,241,0.22)' },
  study_terms: { tint: 'rgba(113,113,122,0.05)', hoverBorder: 'rgba(113,113,122,0.22)' },
}

const FALLBACK_CARD_STYLE = { tint: 'rgba(212,175,55,0.04)', hoverBorder: 'rgba(212,175,55,0.22)' }

export function categoryCardStyle(category: string | null | undefined): { tint: string; hoverBorder: string } {
  if (!category) return FALLBACK_CARD_STYLE
  return CATEGORY_CARD_STYLES[category as EntityCategory] ?? FALLBACK_CARD_STYLE
}

/** Falls back to a readable label rather than rendering `undefined` for unknown values. */
export function categoryLabel(category: string | null | undefined): string {
  if (!category) return 'Quran'
  return CATEGORY_LABELS[category as EntityCategory] ?? 'Quran'
}

export function categoryStyle(category: string | null | undefined): string {
  if (!category) return CATEGORY_STYLES.study_terms
  return CATEGORY_STYLES[category as EntityCategory] ?? CATEGORY_STYLES.study_terms
}
