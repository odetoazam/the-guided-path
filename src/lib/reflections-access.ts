/**
 * Whether the tadabbur corpus is reachable on the public web.
 *
 * Aug 9, 2026 — Azam, explicit: the reflections are NOT accessible, NOT
 * published and NOT linked to "until i figure out a plan". This supersedes the
 * narrower Jul 7 NORTH-STAR decision 4, which only kept the corpus out of
 * search indexes and the sitemap while leaving every page reachable by direct
 * link.
 *
 * What was actually exposed before this flag:
 *   - /reflections            — a complete index of every published passage
 *   - /reflections/[slug]     — the full reflection, rendered
 *   - /api/ayah-records       — unauthenticated JSON, the whole corpus walkable
 *                               by surah, ~30KB of reflection per record
 *
 * The API routes are now admin-gated outright. The two pages read this flag and
 * return 404. Flip it to `true` to bring the route back in one edit; nothing
 * about the pages themselves was deleted.
 *
 * Note this does NOT hide reflection *excerpts* that other pages embed — the
 * grounding blocks under cited ayahs in articles, and the ayah cards on hub
 * pages. Those are separate surfaces and remain live pending Azam's plan.
 */
export const REFLECTIONS_PUBLIC = false
