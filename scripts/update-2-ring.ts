/**
 * Add ring/chiastic structure data for Surah 2 (Al-Baqarah)
 * HO source: https://heavenlyorder.substack.com/p/surat-al-baqarah-part-1
 *
 * Run: node_modules/.bin/jiti scripts/update-2-ring.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const S2_RING = {
  title: 'The Ring',
  subtitle: 'The longest surah in the Quran folds around a single pivot: the day Allah turned the direction of prayer',
  pairs: [
    {
      left: {
        label: 'Three Kinds of Humans',
        ayahs: '1–39',
        desc: 'The opening section introduces the Muttaqeen who benefit from this Book, then names and diagnoses the two groups who do not — the explicit disbelievers and the hidden hypocrites. Believers are drawn toward truth; others veer away.',
      },
      right: {
        label: 'The Final Declaration',
        ayahs: '284–286',
        desc: 'The surah closes with the same three stances compressed into three ayahs. Allah holds every person accountable for what is in their souls. Then the believers speak — the most sublime du\'a in the Quran — owning the full weight of the covenant.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'The Children of Israel',
        ayahs: '40–141',
        desc: 'Israel\'s entire covenant history replayed: Sinai, the golden calf, the prophets killed, the texts altered, the tests failed. The indictment is not ethnic — it is a study of what happens when a covenant community prioritizes comfort over truth.',
      },
      right: {
        label: 'Laws for the New Community',
        ayahs: '197–283',
        desc: 'Having inherited the covenant, the new community receives the full legal framework: Hajj, retaliation, fasting, zakah, marriage, divorce, debt. The laws are not a burden but the practical shape of the same covenant Israel was given and transformed.',
      },
      color: '#4ecdc4',
    },
    {
      left: {
        label: 'Ibrahim\'s Prayer for Makkah',
        ayahs: '122–141',
        desc: 'Allah reminds Israel that Ibrahim — their ancestor — built the Ka\'bah, prayed for this city, and submitted himself completely. His Islam predates Moses, predates the Torah. The community that claims him must claim his submission, not just his lineage.',
      },
      right: {
        label: 'Ibrahim\'s Rites Restored',
        ayahs: '158–196',
        desc: 'Safa and Marwa recognized. Hajj legislated. The rites of Ibrahim — suspended, distorted, and commercialized by Quraysh — returned to their original form. The turning of the qibla was not a break from Ibrahim but a return to him.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'The Turn',
    ayahs: '142–157',
    desc: 'Wherever you are, turn your faces toward Al-Masjid Al-Haram. In one command, the direction of all Muslim prayer shifts from Jerusalem to Makkah — from the community of Moses to the community of Ibrahim.',
    note: 'The center of the longest surah is not a law or a story — it is a direction. Everything before it faces one way; everything after it faces another. Allah\'s test is simple: will you follow the new direction, or cling to what was familiar?',
  },
}

async function main() {
  const { data, error: fetchErr } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', 2)
    .single()

  if (fetchErr || !data) { console.error('fetch failed', fetchErr); process.exit(1) }

  const tabs = data.tabs as any[]
  // Ring tab already exists in tabs (pointing to chiasticRing, currently hidden)
  // Just need to add the data — tab is already there
  const hasRingTab = tabs.some((t: any) => t.id === 'ring')
  if (!hasRingTab) {
    console.log('Warning: no ring tab found in tabs for surah 2')
  }

  const { error } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...data.diagrams, chiasticRing: S2_RING },
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', 2)

  if (error) console.error('update failed', error)
  else console.log('✓ Surah 2: chiasticRing data added — ring tab now visible')
}

main()
