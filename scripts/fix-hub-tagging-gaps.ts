#!/usr/bin/env npx tsx
/**
 * fix-hub-tagging-gaps.ts
 *
 * Audit (2026-07-24) found several hubs reading as "empty" not for lack of content
 * but because published articles were never given a primary entity tag — and one
 * article with no entity tags at all.
 *
 * Fixes:
 *   bani-isra-il  0 -> 3 primary  (3 articles existed, tagged only musa/taqwa)
 *   ayyub         2 -> 4 primary  (2 articles tagged secondary-only)
 *   zakariyya     2 -> 3 primary
 *   jihad         0 -> 1 primary  (the orphaned 9:5 sword-verse article)
 *
 * Idempotent: promotes an existing row to primary, or inserts a primary row if absent.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

/** postSlug -> entity slugs that should be PRIMARY for that post */
const PRIMARY_FIXES: Record<string, string[]> = {
  'bani-israil-covenant-sinai-quran': ['bani-isra-il'],
  'bani-israil-sea-crossing-quran': ['bani-isra-il'],
  'bani-israil-golden-calf-quran': ['bani-isra-il'],
  'ayyub-patience-complaint': ['ayyub'],
  'ayyub-musa-argument-answered': ['ayyub'],
  'zakariyya-three-objections': ['zakariyya'],
  'quran-9-5-sword-verse-kill-the-unbelievers': ['jihad'],
}

/** postSlug -> entity slugs to add as SECONDARY if missing (graph enrichment) */
const SECONDARY_ADDS: Record<string, string[]> = {
  'quran-9-5-sword-verse-kill-the-unbelievers': ['tawbah'],
  'bani-israil-golden-calf-quran': ['harun'],
}

async function entityId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).maybeSingle()
  if (!data) { console.error(`  ⚠️  entity "${slug}" not found`); return null }
  return data.id
}

async function apply(postSlug: string, entSlug: string, isPrimary: boolean) {
  const { data: post } = await supabase.from('posts').select('id').eq('slug', postSlug).maybeSingle()
  if (!post) { console.error(`  ❌ post "${postSlug}" not found`); return }
  const eid = await entityId(entSlug)
  if (!eid) return

  const { data: existing } = await supabase
    .from('entity_tags')
    .select('id,is_primary')
    .eq('post_id', post.id)
    .eq('entity_id', eid)
    .maybeSingle()

  if (existing) {
    if (existing.is_primary === isPrimary) {
      console.log(`  ↩︎  ${postSlug} → ${entSlug} already ${isPrimary ? 'primary' : 'secondary'}`)
      return
    }
    const { error } = await supabase.from('entity_tags').update({ is_primary: isPrimary }).eq('id', existing.id)
    console.log(error ? `  ❌ ${entSlug}: ${error.message}` : `  ⬆️  ${postSlug} → ${entSlug} promoted to PRIMARY`)
  } else {
    const { error } = await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: eid, is_primary: isPrimary })
    console.log(error ? `  ❌ ${entSlug}: ${error.message}` : `  ➕ ${postSlug} → ${entSlug} added as ${isPrimary ? 'PRIMARY' : 'secondary'}`)
  }
}

async function main() {
  console.log('— primary fixes —')
  for (const [postSlug, ents] of Object.entries(PRIMARY_FIXES))
    for (const e of ents) await apply(postSlug, e, true)

  console.log('\n— secondary enrichment —')
  for (const [postSlug, ents] of Object.entries(SECONDARY_ADDS))
    for (const e of ents) await apply(postSlug, e, false)

  const { error } = await supabase.rpc('refresh_entity_co_occurrence')
  console.log(error ? '\n⚠️  co-occurrence refresh failed' : '\n🔄 co-occurrence refreshed')
}

main()
