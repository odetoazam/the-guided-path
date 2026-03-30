/**
 * Add refrain diagram to Surah 55 (Ar-Rahman)
 * Add ring diagram to Surah 112 (Al-Ikhlas)
 *
 * Run: npx tsx scripts/update-55-112-structure.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Surah 55: Ar-Rahman — Refrain Pattern ─────────────────────────────────

const S55_REFRAIN = {
  title: 'The Refrain',
  subtitle: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ — "Which of the favors of your Lord will you deny?" — appears 31 times',
  rootNote: 'No other surah uses a single recurring line as structural punctuation to this degree. The refrain divides the surah into seven sections. By the end, the same question has migrated from asking about creation to asking about Paradise — the accumulated proof now impossible to ignore.',
  elements: [
    {
      ayah: '1–13',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'The Opening (1×)',
      desc: 'The Name: Ar-Rahman. Then teaching, creation of the human, language. The refrain falls at ayah 13 — before any specific gift is listed, it already asks which one you would dare deny.',
      color: '#C9A84C',
      hasRoot: true,
    },
    {
      ayah: '14–25',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'Earth and Sky (5×)',
      desc: 'Sun and moon in precise orbits. Stars and trees prostrate. Sky lifted and balance set. Earth spread with fruit and grain. Two seas meeting without transgressing. Five refrains punctuate five categories of visible mercy.',
      color: '#4ecdc4',
      hasRoot: true,
    },
    {
      ayah: '26–30',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'The Permanent (2×)',
      desc: 'Everything upon it perishes — only His face remains, full of majesty and honor. Even need is a mercy: He is As-Samad, and every need is an occasion to find Him.',
      color: '#9b7fd4',
      hasRoot: true,
    },
    {
      ayah: '31–45',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'The Reckoning (7×)',
      desc: 'The guilty known by their marks. Seized by forelocks and feet. Hell described across seven beats of refrain — fire, scorching wind, boiling water. The refrain inside the punishment section is the surah\'s hardest ask: deny this too?',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '46–61',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'First Gardens (8×)',
      desc: 'Two gardens for those who feared the station of their Lord. Springs, fruits, reclining on lined couches, companions of restrained glance. Eight refrains — the most in any single section — pouring gifts as fast as the question can ask.',
      color: '#4ecdc4',
      hasRoot: true,
    },
    {
      ayah: '62–77',
      form: 'فَبِأَيِّ آلَاءِ رَبِّكُمَا تُكَذِّبَانِ',
      role: 'Higher Gardens (8×)',
      desc: 'Two more gardens, more expansive still. Dark green, gushing springs, fruit of every kind. Eight more refrains — a precise mirror of the first garden section in count and rhythm.',
      color: '#9b7fd4',
      hasRoot: true,
    },
    {
      ayah: '78',
      form: 'ذُو الْجَلَالِ وَالْإِكْرَامِ',
      role: 'The Closing',
      desc: 'Blessed be the name of your Lord, full of majesty and honor. The word tabāraka — to bless a name — closes as the name Ar-Rahman opened. 77 ayahs of gifts; the final word blesses the giver.',
      color: '#C9A84C',
      hasRoot: false,
    },
  ],
}

const S55_REFRAIN_TAB = {
  id: 'refrain',
  label: 'The Refrain',
  renderer: 'refrain',
  diagramKey: 'refrainPattern',
}

// ── Surah 112: Al-Ikhlas — Ring Structure ─────────────────────────────────

const S112_RING = {
  title: 'The Ring',
  subtitle: 'Four statements of divine singularity folded around a single axis',
  pairs: [
    {
      left: {
        label: 'The One',
        ayahs: '1',
        desc: 'Qul huwa Allahu ahad — Say: He is Allah, One. The identity declared outward: unique, unrepeated, incomparable. The surah begins by naming the very thing the whole Quran defends.',
      },
      right: {
        label: 'Incomparable',
        ayahs: '4',
        desc: 'Wa lam yakun lahu kufuwan ahad — And there is none comparable to Him. The same uniqueness confirmed from the opposite angle — not by assertion but by elimination. Everything ruled out; only He remains.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'Self-Sufficient',
        ayahs: '2',
        desc: 'Allahu As-Samad — Allah, the eternally self-sufficient. Everything in existence needs Him. He needs nothing. The axis of all existence points inward toward this.',
      },
      right: {
        label: 'Unbegotten',
        ayahs: '3',
        desc: 'Lam yalid wa lam yulad — He did not beget, nor was He begotten. The samad nature expressed negatively: no origin, no offspring, no dependence in either direction. Self-sufficiency proven by absolute independence.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'As-Samad',
    ayahs: '2–3',
    desc: 'The inner pair is the axis: absolute self-sufficiency paired with absolute independence. Ayahs 1 and 4 name the uniqueness from outside; ayahs 2 and 3 explain from inside why it is unbreachable.',
    note: 'Ibn Kathir noted this surah equals a third of the Quran — the third that concerns the attributes of God. The ring structure enacts the theology: the surah wraps around itself just as its subject is contained by nothing.',
  },
}

async function main() {
  // ── Update Surah 55 ──────────────────────────────────────────────────────
  const { data: s55, error: e55fetch } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', 55)
    .single()

  if (e55fetch || !s55) { console.error('55 fetch failed', e55fetch); process.exit(1) }

  const tabs55 = s55.tabs as any[]
  // Insert refrain tab after ring tab (or before absent)
  const absentIdx55 = tabs55.findIndex((t: any) => t.id === 'absent')
  const newTabs55 = [...tabs55]
  newTabs55.splice(absentIdx55, 0, S55_REFRAIN_TAB)

  const { error: e55 } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...s55.diagrams, refrainPattern: S55_REFRAIN },
      tabs: newTabs55,
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', 55)

  if (e55) console.error('55 update failed', e55)
  else console.log('✓ Surah 55: refrain tab added')

  // ── Update Surah 112 ─────────────────────────────────────────────────────
  const { data: s112, error: e112fetch } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', 112)
    .single()

  if (e112fetch || !s112) { console.error('112 fetch failed', e112fetch); process.exit(1) }

  const tabs112 = s112.tabs as any[]
  // Insert ring tab at position 0 (before funnel)
  const newTabs112 = [
    { id: 'ring', label: 'The Ring', renderer: 'ring', diagramKey: 'ringStructure' },
    ...tabs112,
  ]

  const { error: e112 } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...s112.diagrams, ringStructure: S112_RING },
      tabs: newTabs112,
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', 112)

  if (e112) console.error('112 update failed', e112)
  else console.log('✓ Surah 112: ring tab added')
}

main()
