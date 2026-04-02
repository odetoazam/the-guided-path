/**
 * Add refrain pattern data for Surah 54 (Al-Qamar) and Surah 77 (Al-Mursalat)
 * These surahs use refrain as their primary structural device — not ring/chiasm.
 *
 * Run: node_modules/.bin/jiti scripts/update-54-77-refrain.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Surah 54: Al-Qamar — Two Interlocking Refrains ──────────────────────

const S54_REFRAIN = {
  title: 'The Two Refrains',
  subtitle: 'Two questions alternate through five destroyed nations — one asks about punishment, the other about remembrance',
  rootNote:
    'Al-Qamar uses two interlocking refrains: "How was My punishment and My warnings?" after each nation\'s destruction, and "We have made the Quran easy to remember — is there anyone who will remember?" after each lesson. The first refrain closes the story; the second opens the invitation. Together they create a rhythm of justice and mercy that runs through the entire surah.',
  elements: [
    {
      ayah: '1–8',
      form: '',
      role: 'The Opening: The Hour',
      desc: 'The Hour has drawn near and the moon has split. Every sign they see, they turn away and say: passing magic. They denied and followed their desires — but every matter will be settled.',
      color: '#C9A84C',
      hasRoot: false,
    },
    {
      ayah: '9–17',
      form: 'فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ',
      role: 'Nuh — Punishment (2×) + Remembrance (1×)',
      desc: 'Before them the people of Nuh denied. They called Our servant a madman. He called upon his Lord: I am overcome, so help me. We opened the gates of heaven with rain and caused the earth to burst with springs. He was carried on a vessel of planks and nails, sailing under Our eyes. Then: How was My punishment? We made the Quran easy — is there anyone who will remember?',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '18–22',
      form: 'وَلَقَدْ يَسَّرْنَا الْقُرْآنَ لِلذِّكْرِ فَهَلْ مِن مُّدَّكِرٍ',
      role: '\'Ad — Punishment (1×) + Remembrance (1×)',
      desc: '\'Ad denied. We sent against them a screaming wind on a day of continuous misfortune, plucking people as if they were trunks of uprooted palms. How was My punishment? We made the Quran easy — is there anyone who will remember?',
      color: '#4ecdc4',
      hasRoot: true,
    },
    {
      ayah: '23–32',
      form: 'فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ',
      role: 'Thamud — Punishment (1×) + Remembrance (1×)',
      desc: 'Thamud denied the warnings. They said: a single human from among us — shall we follow him? They hamstrung the she-camel. We sent upon them a single blast and they became like the dry stubs of a fence-builder. How was My punishment? We made the Quran easy — is there anyone who will remember?',
      color: '#9b7fd4',
      hasRoot: true,
    },
    {
      ayah: '33–40',
      form: 'فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ',
      role: 'Lut — Punishment (2×) + Remembrance (1×)',
      desc: 'The people of Lut denied the warnings. We sent upon them a storm of stones, except the family of Lut — We saved them before dawn, as a favor from Us. He warned them of Our assault, but they disputed the warnings. They demanded his guests — so We blinded their eyes. How was My punishment? We made the Quran easy — is there anyone who will remember?',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '41–42',
      form: 'فَكَيْفَ كَانَ عَذَابِي وَنُذُرِ',
      role: 'Fir\'awn — Punishment (1×)',
      desc: 'The warnings came to the people of Fir\'awn too. They denied all of Our signs — so We seized them with the seizing of the Almighty, the Capable. The shortest section: no separate remembrance refrain. Fir\'awn\'s case needs no invitation; only the verdict.',
      color: '#C9A84C',
      hasRoot: true,
    },
    {
      ayah: '43–55',
      form: '',
      role: 'The Closing: Are You Exempt?',
      desc: 'Are your disbelievers better than those? Or do you have immunity in the scriptures? Every matter is settled. They will turn their backs in flight. The Hour is their appointment — and the Hour is more calamitous and more bitter. The righteous will be in gardens and rivers, in a seat of honor, near a Sovereign, Perfect in Ability.',
      color: '#C9A84C',
      hasRoot: false,
    },
  ],
}

// ── Surah 77: Al-Mursalat — Single Refrain (10×) ────────────────────────

const S77_REFRAIN = {
  title: 'The Refrain',
  subtitle: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ — "Woe, that Day, to the deniers!" — appears 10 times',
  rootNote:
    'No other surah in the Quran strikes a single note this relentlessly. Ten times the same verdict falls — after cosmological evidence, after historical destruction, after the miracle of creation, after the gifts of the earth, after the shade of hellfire, after the pleasures of the righteous. By the final occurrence, the refrain has exhausted every category of proof. The last ayah — "In what message after this will they believe?" — is the silence after the hammer.',
  elements: [
    {
      ayah: '1–15',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'The Cosmic Oath (1×)',
      desc: 'By the winds sent forth, by the storm-bearing gales, by the spreading clouds, by the separating verses — what you are promised will occur. When the stars are extinguished, the sky is torn, the mountains blown away, and the messengers are given their appointed time. For what day have they been gathered? For the Day of Judgment. Woe, that Day, to the deniers.',
      color: '#C9A84C',
      hasRoot: true,
    },
    {
      ayah: '16–19',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'The Destroyed Nations (1×)',
      desc: 'Did We not destroy the former peoples? Then We followed them with the later ones. That is how We deal with the guilty. Woe, that Day, to the deniers.',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '20–24',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'Your Own Creation (1×)',
      desc: 'Did We not create you from a fluid disdained? And place it in a firm lodging for a known extent? We measured — and how excellent are We to measure. Woe, that Day, to the deniers.',
      color: '#4ecdc4',
      hasRoot: true,
    },
    {
      ayah: '25–28',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'The Earth Holds You (1×)',
      desc: 'Have We not made the earth a container — for the living and the dead? And set upon it immovable mountains, and given you sweet water to drink? Woe, that Day, to the deniers.',
      color: '#9b7fd4',
      hasRoot: true,
    },
    {
      ayah: '29–34',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'Go to the Shadow (1×)',
      desc: 'Go toward what you used to deny. Go toward a shadow of three columns — no shade and no protection from the flame. It throws sparks as large as fortresses, as if they were yellow camels. Woe, that Day, to the deniers.',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '35–37',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'No Speech, No Excuse (1×)',
      desc: 'This is a Day they will not speak. Nor will it be permitted for them to make excuses. Woe, that Day, to the deniers.',
      color: '#C9A84C',
      hasRoot: true,
    },
    {
      ayah: '38–40',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'The Day of Judgment (1×)',
      desc: 'This is the Day of Judgment. We gathered you and the former peoples. If you have a plan, then plan against Me. Woe, that Day, to the deniers.',
      color: '#4ecdc4',
      hasRoot: true,
    },
    {
      ayah: '41–45',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'The Righteous in Shade (1×)',
      desc: 'The righteous will be among shades and springs, and fruits from whatever they desire. Eat and drink in satisfaction for what you used to do. That is how We reward the doers of good. Woe, that Day, to the deniers.',
      color: '#9b7fd4',
      hasRoot: true,
    },
    {
      ayah: '46–49',
      form: 'وَيْلٌ يَوْمَئِذٍ لِّلْمُكَذِّبِينَ',
      role: 'Eat and Enjoy — A Little (2×)',
      desc: 'Eat and enjoy yourselves a little — you are guilty. When they are told to bow, they do not bow. Woe, that Day, to the deniers.',
      color: '#e07a8a',
      hasRoot: true,
    },
    {
      ayah: '50',
      form: '',
      role: 'The Final Silence',
      desc: 'In what message after this will they believe? After ten strikes of the same question, the surah does not end with the refrain — it ends with a question that has no answer. The silence after the last ayah is the verdict.',
      color: '#C9A84C',
      hasRoot: false,
    },
  ],
}

async function main() {
  // ── Update Surah 54 ──────────────────────────────────────────────────────
  const { data: s54, error: e54fetch } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', 54)
    .single()

  if (e54fetch || !s54) { console.error('54 fetch failed', e54fetch); process.exit(1) }

  const tabs54 = s54.tabs as any[]
  // Insert refrain tab after the ring tab (or first)
  const ringIdx54 = tabs54.findIndex((t: any) => t.id === 'ring')
  const newTab54 = { id: 'refrain', label: 'The Refrains', renderer: 'refrain', diagramKey: 'refrainPattern' }
  const newTabs54 = [...tabs54]
  newTabs54.splice(ringIdx54 >= 0 ? ringIdx54 + 1 : 0, 0, newTab54)

  const { error: e54 } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...s54.diagrams, refrainPattern: S54_REFRAIN },
      tabs: newTabs54,
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', 54)

  if (e54) console.error('54 update failed', e54)
  else console.log('✓ Surah 54 (Al-Qamar): refrain tab added — 2 interlocking refrains')

  // ── Update Surah 77 ──────────────────────────────────────────────────────
  const { data: s77, error: e77fetch } = await supabase
    .from('surah_visual_data')
    .select('diagrams, tabs')
    .eq('surah_number', 77)
    .single()

  if (e77fetch || !s77) { console.error('77 fetch failed', e77fetch); process.exit(1) }

  const tabs77 = s77.tabs as any[]
  const ringIdx77 = tabs77.findIndex((t: any) => t.id === 'ring')
  const newTab77 = { id: 'refrain', label: 'The Refrain', renderer: 'refrain', diagramKey: 'refrainPattern' }
  const newTabs77 = [...tabs77]
  newTabs77.splice(ringIdx77 >= 0 ? ringIdx77 + 1 : 0, 0, newTab77)

  const { error: e77 } = await supabase
    .from('surah_visual_data')
    .update({
      diagrams: { ...s77.diagrams, refrainPattern: S77_REFRAIN },
      tabs: newTabs77,
      updated_at: new Date().toISOString(),
    })
    .eq('surah_number', 77)

  if (e77) console.error('77 update failed', e77)
  else console.log('✓ Surah 77 (Al-Mursalat): refrain tab added — 10× woe refrain')
}

main()
