#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const synthesisHtml = `
<p>The Quran's treatment of Shaytan is unlike anything in the world's religious literature. It does not simply name an adversary and warn against him — it <em>dissects</em> him. Across dozens of surahs and nearly ninety occurrences, the Quran builds a complete psychological, strategic, and theological profile of the being who declared war on humanity. And it does this not to frighten, but to arm.</p>

<h2>The Profile</h2>

<p>Shaytan's story begins with a refusal — not born of ignorance, but of intellect. When commanded to prostrate to Adam, Iblis constructed a philosophical argument: fire is superior to clay, therefore I should not bow. The Quran reveals this as the template for all his future work: <strong>correct observation, corrupt conclusion</strong>. He takes real data and bends it toward arrogance. This is precisely how his whispers operate on the human heart — not through obvious falsehood, but through the subtle distortion of things you already believe to be true.</p>

<p>His methodology, declared openly in Surah Al-A'raf (7:16-17), is spatial and systematic. He positions himself on the straight path itself — not in obvious places of sin, but exactly where you are trying to be good. He approaches from four directions: through your hopes, your past, your good deeds, and your desires. Classical scholars noted that he conspicuously omits "from above" and "from below" — the directions of divine mercy and prostration remain open. His ultimate objective is not any particular sin but the severing of gratitude.</p>

<h2>The Method</h2>

<p>The Quran's most precise word for Shaytan's action is <em>waswasa</em> — a faint, repeated rustling. Not a shout, not a command, but a whisper so quiet you mistake it for your own thinking. This is his primary weapon, and the Quran names it explicitly in its final surah, Al-Nas (114), which seeks refuge from "the whisperer who withdraws" — <em>al-waswas al-khannas</em>. He whispers, then retreats into the background so you forget he was there. His most effective move is to be forgotten.</p>

<p>The Quran also encodes his strategy in a single recurring phrase: خُطُوَاتِ الشَّيْطَانِ — "the footsteps of Shaytan." Not leaps. Steps. Each one small enough to evade your moral alarm system. The word appears in contexts ranging from food to sexuality to religious innovation, establishing incrementalism as a universal principle of temptation. This is why the Quran doesn't just forbid the sin — it forbids the <em>approach</em> to the sin.</p>

<h2>The Limitation</h2>

<p>Perhaps the most important thing the Quran reveals about Shaytan is what he <em>cannot</em> do. In Surah Ibrahim (14:22), on the Day of Judgment, Shaytan himself confesses: مَّا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ — "I had no authority over you. I only called you and you responded." The Arabic <em>sultan</em> means compelling power, dominion. Shaytan has none. He cannot force a single human action. His entire arsenal is suggestion, framing, and emotional manipulation — and even this works only on those who choose to listen.</p>

<p>This reframes the entire human struggle. The enemy is real but limited. He operates within boundaries set by Allah, and those boundaries include an inability to touch the <em>mukhlasin</em> — the purely sincere. The Quran holds both realities simultaneously: Shaytan is a genuine threat, and you are fully equipped to overcome him.</p>

<h2>The Defense</h2>

<p>The Quran doesn't just diagnose — it prescribes. The primary defense is <em>dhikr</em>, the remembrance of Allah. In Al-A'raf (7:201), those with taqwa are described as people who, when touched by a suggestion from Shaytan, <em>remember</em> — and suddenly they see clearly. The Arabic تَذَكَّرُوا فَإِذَا هُم مُّبْصِرُونَ captures a moment of awakening: remembrance restores sight. Against an enemy whose weapon is making you forget, the counter-weapon is remembering.</p>

<p>The alliance between Shaytan and the <em>nafs</em> (the self) is what makes the struggle internal. The nafs in its lowest state — <em>ammara bi'l-su'</em>, persistently commanding evil — is Shaytan's natural collaborator. But the Quran maps three states of the self: the commanding nafs, the self-reproaching nafs (<em>lawwama</em>), and the tranquil nafs (<em>mutma'inna</em>). Spiritual growth means moving through these states, and each transition weakens Shaytan's grip. The whisperer who withdraws has no purchase on a heart that is already occupied with remembrance.</p>
`

async function main() {
  // Get entity ID for shaytan
  const { data: entity, error: entityErr } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', 'shaytan')
    .single()

  if (entityErr || !entity) {
    console.error('Failed to find shaytan entity:', entityErr)
    process.exit(1)
  }

  console.log(`Shaytan entity ID: ${entity.id}`)

  // Upsert synthesis
  const { data, error } = await supabase
    .from('hub_synthesis_cache')
    .upsert(
      {
        entity_id: entity.id,
        synthesis_html: synthesisHtml.trim(),
        content_hash: 'shaytan-6-articles-v1',
        last_generated_at: new Date().toISOString(),
      },
      { onConflict: 'entity_id' }
    )
    .select('id')
    .single()

  if (error) {
    console.error('Failed to upsert synthesis:', error)
    process.exit(1)
  }

  console.log(`Synthesis inserted with ID: ${data.id}`)
  console.log('Done.')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
