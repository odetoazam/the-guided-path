/**
 * The LENS axis — how an article examines its subject, independent of what
 * the subject is (that's the entity category).
 *
 * This is the controlled vocabulary proposed in docs/content-category-playbook.md §2,
 * promoted out of the free-form `tags` column (which held 510 distinct values across
 * 284 articles, 298 used exactly once). A lens is stored as a plain tag on the post;
 * the UI recognises it by membership in this list. Do not add values casually —
 * every lens here must correspond to a real genre in the hub-article-pipeline skill.
 */

export const LENS_ORDER = [
  'question-explainer',
  'name-breakdown',
  'root-study',
  'connection-reveal',
  'contested-doorway',
  'grammar-reveal',
  'structure-nazm',
  'cross-story',
  'scene',
  'rhetorical-device',
] as const

export type ArticleLens = (typeof LENS_ORDER)[number]

/** Reader-facing chip labels. Plain words — no internal jargon. */
export const LENS_LABELS: Record<ArticleLens, string> = {
  'question-explainer': 'Explainer',
  'name-breakdown': 'Name Study',
  'root-study': 'Root Study',
  'connection-reveal': 'Connection',
  'contested-doorway': 'Scholars Differ',
  'grammar-reveal': 'Grammar',
  'structure-nazm': 'Structure',
  'cross-story': 'Cross-Story',
  scene: 'Scene',
  'rhetorical-device': 'Rhetoric',
}

const LENS_SET = new Set<string>(LENS_ORDER)

/** First recognised lens in a post's tags, or null. One lens per article by convention. */
export function lensOf(tags: string[] | null | undefined): ArticleLens | null {
  if (!tags) return null
  return (tags.find(t => LENS_SET.has(t)) as ArticleLens | undefined) ?? null
}

export function lensLabel(lens: string | null | undefined): string | null {
  if (!lens) return null
  return LENS_LABELS[lens as ArticleLens] ?? null
}
