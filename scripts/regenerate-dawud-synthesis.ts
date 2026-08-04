#!/usr/bin/env npx tsx
/**
 * regenerate-dawud-synthesis.ts
 *
 * Re-synthesizes the Dawud hub overview after the 2026-07-24 facet-article batch
 * (giant/Jalut, iron/work-as-worship, khalifa/hawa) brought the primary-tagged
 * article count from 5 to 8. Supersedes content_hash "dawud-3-articles-v1".
 *
 * Per hub-article-pipeline.md Step 7: synthesize, don't summarize. Woven from all
 * 8 primary articles, not just the new 3.
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SYNTHESIS_HTML = `<div class="hub-synthesis">
  <p class="hub-synthesis-lead">Dawud in the Quran is the fullest portrait of human capacity the book offers — a shepherd handed a kingdom, a prophet given his own scripture, a voice the mountains answered, a craftsman whose hands softened iron, a judge trusted with the decisive word. The articles in this collection trace that capacity and, at every turn, the same quiet correction: the gift is never the point. What Dawud does with it is.</p>

  <h3>A giant in four words, then a law about the world</h3>
  <p>His most famous act — killing Jalut — gets exactly four words in Al-Baqarah (2:251) before the verse moves on. No sling, no stone, no duel. What the verse lingers on instead is what came after: kingship, wisdom, and a sentence that widens past Dawud entirely — were it not for God repelling people by means of one another, the earth would fall into ruin. The same principle returns almost word for word in Al-Hajj (22:40), there protecting monasteries, churches, synagogues, and mosques alike. Jalut himself is named three times and described not at all; the believers who feared him get their doubt and their prayer quoted in full. The Quran hands the reader the measurements of the side that looked like nothing.</p>

  <h3>A prophet-king at the forge</h3>
  <p>Saba (34:11) gives Dawud an instruction no king expects: make full coats of armor, and measure the links well. The same Arabic verb, <em>ʿamal</em>, does the work of both the craft and the command that follows it — do righteousness — so that the line between metalwork and morality dissolves in the grammar itself. Al-Anbiya (21:80) names what the armor was for: to protect you from your own violence. The root behind the coats' fullness, <em>sabgh</em>, appears only twice in the whole Quran — once for Dawud's armor, once for God's own favors poured out "outward and inward" (Luqman 31:20). The standard set for the workman is the standard God applies to His own giving.</p>

  <h3>The voice that drew creation into praise</h3>
  <p>Saba (34:10) gives Dawud's sonic gift in one of the Quran's most arresting images: O mountains, echo with him, and the birds. The mountains and birds are not background — they are participants. Sad (38:17-19) gives the fullest description: Dawud is strong, ever-returning to Allah (<em>awwab</em>), and the mountains and birds respond to his praise morning and evening. His praise is not occasional; it is structural to his existence.</p>

  <h3>The judgment he gave against himself</h3>
  <p>Sad (38:21-25) gives one of the most compressed narratives in the Quran. Two disputants climb over the wall of his prayer chamber — ninety-nine ewes against one — and Dawud rules before the second man has spoken. He is not corrected from outside; he recognizes the test within himself, asks forgiveness, and falls down bowing. What follows is not a demotion but the largest title in the passage: <em>khalifa</em>, steward of the earth — a word the Quran uses in the singular only twice in the entire book, here and for Adam at the founding (2:30). Both times the hazard is named in the same breath as the title. For Dawud it is <em>hawa</em> — a word whose root means simply to fall, the pull of his own leaning rather than raw desire. The warning is not about the throne. It is about what a man does with his own certainty when it arrives too fast.</p>

  <h3>A book named and never opened</h3>
  <p>Dawud is the only figure in the Quran given a scripture named for him alone, the Zabur — and the Quran names it, honors it, and never quotes a line of it. What we are given instead is sound: the mountains, the birds, a landscape tuned to one voice. Revelation, in his case, is measured not by what can be recited from it but by what it made of the man who carried it.</p>

  <h3>The battle before the battle</h3>
  <p>Dawud's rise is set inside a larger story that never mentions him until the final clause. Talut is appointed king over the objections of a people who claimed a stronger right to it; his army is thinned at a river until only a small band remains, and that band prays — <em>pour patience over us, make our feet firm</em> (2:250) — the same prayer, almost word for word, that Pharaoh's converted magicians will offer centuries later (7:126). A shepherd walks into that story with no introduction and no claim, and walks out carrying the beginning of everything. The pattern repeats before it lands on him: confident claims collapse, and the one who claims nothing is chosen.</p>
</div>`

async function main() {
  const { data: ent, error: entErr } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', 'dawud')
    .single()
  if (entErr || !ent) {
    console.error('entity lookup failed:', entErr)
    return
  }

  const { count } = await supabase
    .from('entity_tags')
    .select('*', { count: 'exact', head: true })
    .eq('entity_id', ent.id)
    .eq('is_primary', true)

  const { error } = await supabase
    .from('hub_synthesis_cache')
    .upsert(
      {
        entity_id: ent.id,
        synthesis_html: SYNTHESIS_HTML.trim(),
        content_hash: `dawud-${count}-articles-v2`,
        last_generated_at: new Date().toISOString(),
      },
      { onConflict: 'entity_id' }
    )

  if (error) console.error('❌ upsert failed:', error)
  else console.log(`✅ synthesis regenerated — content_hash: dawud-${count}-articles-v2`)
}

main()
