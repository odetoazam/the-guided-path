#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const MUSA_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'
const FIRAUN_ID = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861'
const BANI_ISRA_IL_ID = '34369167-dbaf-427a-abb1-a063633be1a3'

const article = {
  title: "The Story Told in Pieces: Musa Across the Quran",
  slug: "musa-story-across-surahs-quran",
  excerpt: "The Quran never tells the complete story of Musa in a single surah. It distributes his narrative across thirty-six surahs, each time taking only what that surah needs. The distribution is the design.",
  seo_title: "Musa Across the Quran: Why the Story Is Told Differently Each Time",
  seo_description: "Musa appears in 36 surahs. Each retelling emphasizes different events and attributes. A study of how the Quran uses one prophet's story as a vocabulary, not a biography.",
  reading_time_minutes: 10,
  tags: ['musa', 'quranic-characters', 'prophets', 'taha', 'al-qasas', 'ash-shuara', 'al-kahf'],
  content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Musa is mentioned 136 times across 36 surahs. This is more than any other prophet — more than Ibrahim, more than Isa, more than Nuh — and the distribution matters as much as the frequency. The Quran never gathers Musa's complete story into one surah. It gives Ta-Ha one version. It gives Al-Qasas another. Ash-Shu'ara takes the confrontation with <a href="/hub/firaun">Firaun</a> and extends it across twenty-two verses of direct dialogue. Al-Kahf takes a single late encounter and makes it the centerpiece of one of the most studied surahs in the Quran. Each telling is partial. Each is complete for its own purpose. The reader who wants the full account must hold multiple surahs simultaneously — and the Quran designed it that way.</p>

  <h2>What Ta-Ha Takes</h2>

  <p>Surah Ta-Ha opens on an address to the Prophet ﷺ — "We have not sent down the Quran to you that you should be distressed" — and immediately turns to Musa. The pivot is structural: Ta-Ha is a surah about divine address and the experience of being chosen for a mission that exceeds you. Musa's story is the example the surah reaches for because Ta-Ha needs the burning bush. It needs the moment when a man who feels unworthy is told he has already been selected.</p>

  <p>What Ta-Ha preserves: the content of the divine call in four compressed movements — address, self-disclosure, instruction, commission. The request Musa makes immediately afterward: expand my chest, ease my task, untie my tongue. The granting of Harun. The staff. The encounter with Firaun. The contest with the magicians and their conversion. Then — in its most extended section — the golden calf, Musa's return, his anger, the repentance of his people.</p>

  <p>What Ta-Ha omits: everything before the burning bush. Musa's birth, his mother placing him in the river, his childhood in Firaun's palace, the killing of the Egyptian, the exile in Madyan, the marriage, the decision to return — none of this appears. Ta-Ha begins at the call because Ta-Ha is about the call. The biography is irrelevant to the surah's argument.</p>

  <h2>What Al-Qasas Takes</h2>

  <p>Surah Al-Qasas means "the stories" — from the root <strong>q-ṣ-ṣ</strong>, which carries the sense of following footsteps, tracing a path. It is a surah preoccupied with how things come to be, with cause and consequence across time. Its Musa account begins not at the burning bush but at his birth:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَوْحَيْنَا إِلَىٰ أُمِّ مُوسَىٰ أَنْ أَرْضِعِيهِ ۖ فَإِذَا خِفْتِ عَلَيْهِ فَأَلْقِيهِ فِي الْيَمِّ وَلَا تَخَافِي وَلَا تَحْزَنِي ۖ إِنَّا رَادُّوهُ إِلَيْكِ وَجَاعِلُوهُ مِنَ الْمُرْسَلِينَ</p>
    <p class="translation">"And We inspired the mother of Musa: Nurse him, and when you fear for him, cast him into the river. Do not fear and do not grieve — We will return him to you and make him one of the messengers."</p>
    <cite>Surah Al-Qasas (28:7)</cite>
  </blockquote>

  <p>The divine promise arrives before anything has happened. Before the basket, before the palace, before the decades of exile — the surah announces the end of the story at its very beginning. <strong>Innā rāddūhu ilayki wa jā'ilūhu mina al-mursalīn</strong> — "We will return him to you and make him one of the messengers." The return is promised in the same breath as the casting away.</p>

  <p>Al-Qasas then traces what Ta-Ha skips: Firaun's household taking the baby in. Musa's sister following the basket. The palace wet nurses rejected one by one until the mother herself is brought in and reunited with her son — inside the palace of the man who wanted him killed. The surah lingers on this irony because irony is Al-Qasas's theological method: the one who ordered the killing of Israelite boys is raising his own future challenger. Divine providence operates through the very mechanisms of opposition.</p>

  <p>Then the killing. Then the exile. Then Madyan and the well and the two women and their father and the ten-year marriage. Then the return. Then, only then, the burning bush — a single verse in Al-Qasas compared to thirty verses in Ta-Ha, because Al-Qasas has already done its work. The surah is not about the call. It is about the long road that made the person the call could reach.</p>

  <h2>What Ash-Shu'ara Takes</h2>

  <p>Surah Ash-Shu'ara contains nine accounts of prophets and their peoples. It is structured as a study in repetition — each account ends with almost the same refrain: <strong>wa mā kāna akthuruhum mu'minīn</strong> — "and most of them were not believers." The Quran places the Musa-Firaun account at the center of this structure. What Ash-Shu'ara needs from Musa is the confrontation — not the biography, not the burning bush, not the golden calf. The extended court dialogue.</p>

  <p>In Ash-Shu'ara, the exchange between Musa and Firaun covers twenty-two verses of direct speech. Firaun deploys biography against Musa: "Did we not raise you among us as a child? Did you not kill a man?" Musa engages each charge directly — acknowledges the killing, explains the flight, names the prophetic mission. Firaun pivots to cosmology: "What is this Lord of the worlds?" Musa answers. Firaun tells his court Musa is mad. Musa continues. The rhythm of the exchange is the point: the mission is not to win the argument but to deliver it, completely, to someone who has already decided.</p>

  <p>The magicians' conversion — <strong>fa-ulqiya al-saḥaratu sujjadan</strong>, "and the magicians were cast down prostrate" — happens at the center of Ash-Shu'ara's Musa account. In Ta-Ha and Al-A'raf the same scene appears, but Ash-Shu'ara slows it down and preserves the most of the magicians' response. They have spent their careers manufacturing appearances. They recognize immediately that what Musa carries is categorically different. Their fall is not conversion through argumentation. It is recognition: they see, in one moment, the difference between what they do and what they have just witnessed.</p>

  <h2>What Al-Kahf Takes</h2>

  <p>Surah Al-Kahf is preoccupied with knowledge: its sources, its limits, the difference between what humans can acquire through reason and experience versus what can only be given. The surah contains four accounts — the youth of the Cave, the garden owner, Musa with Khidr, and Dhul-Qarnayn — each exploring a different sphere of trial. The Musa-Khidr account is the epistemological episode: the limits of the best human knowledge before divine wisdom.</p>

  <p>Al-Kahf takes almost nothing from the Musa biography. No burning bush. No Firaun. No parting of the sea. It takes a late encounter from after the main prophetic mission — a journey to the junction of two seas, a meeting with a man of unusual knowledge, a lesson Musa fails three times to receive. The Musa of Al-Kahf is not the Musa of commission and confrontation. He is a prophet on a journey of learning, traveling specifically to find a man who knows something he does not.</p>

  <p>This is the version of Musa Al-Kahf needs: not the deliverer but the seeker. The surah's argument — that some knowledge is beyond what prophetic mission alone can access — requires a Musa who comes as a student. That Musa only appears in one place in the Quran, and Al-Kahf found him.</p>

  <h2>The Invariant and the Variable</h2>

  <p>Across these four tellings and thirty-two more, certain things about Musa never change. He is always the one who was called — the commission is constant. He is always in relationship with Firaun — the confrontation with power is constant. He is always associated with <a href="/hub/bani-isra-il">Bani Isra'il</a> — the people he leads are constant. And his human texture is constant: the speech impediment, the anger that breaks through, the fear at the serpent, the grief at his people's failures.</p>

  <p>What changes with each telling is the divine attribute being enacted. Ta-Ha enacts the intimacy of prophetic selection — the personal address, the divine choice, the granted request. Al-Qasas enacts providence — the divine architecture visible only in retrospect, the plan working through opposition. Ash-Shu'ara enacts divine power confronting human power — the magicians converted, the sea split, the army swallowed. Al-Kahf enacts divine wisdom — <strong>Al-Khabir</strong> and <strong>Al-Hakim</strong> operating through events whose visible surface tells a different story.</p>

  <p>The Quran's method is to give you the same prophet through different lenses until you have seen, from multiple angles, the full range of what the prophetic relationship looks like. No single surah can hold all of it. Ta-Ha gives you the call; Al-Qasas gives you the biography; Ash-Shu'ara gives you the confrontation; Al-Kahf gives you the limit. You need all four to have Musa.</p>

  <h2>Why the Story Is Never Complete</h2>

  <p>The Quran addresses this directly. When the Meccans and their allies tried to use the distributed, non-chronological nature of the Quranic narratives as an argument against its divine origin, the response came in Surah Hud: <strong>kullan naqussu 'alayka min anbā'i al-rusul</strong> — "all We relate to you from the accounts of the messengers." Each surah takes what it needs from the prophetic archive. The distribution is not incomplete narration. It is purposeful selection.</p>

  <p>A biography of Musa would tell you what happened to him. The Quran is not interested in what happened to him as a biographical fact. It is interested in what happened to him as a demonstration — of divine choice, of divine providence, of truth before power, of the limits of knowledge, of what it looks like when a person responds to an impossible commission with a request for help and walks into a court anyway.</p>

  <p>The story is told in pieces because each piece is a different argument. The reader who holds them all simultaneously is doing exactly what the Quran was designed to require: not reading a story, but learning to see.</p>
</article>`,
}

async function main() {
  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({
      ...article,
      type: 'article',
      status: 'published',
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    })
    .select('id')
    .single()

  if (postError || !post) {
    console.error('✗ Insert failed:', postError)
    return
  }
  console.log(`✓ Inserted: "${article.title}" (${post.id})`)

  const tags = [
    { entity_id: MUSA_ID, is_primary: true },
    { entity_id: FIRAUN_ID, is_primary: false },
    { entity_id: BANI_ISRA_IL_ID, is_primary: false },
  ]

  for (const tag of tags) {
    const { error } = await supabase.from('entity_tags').insert({
      post_id: post.id,
      entity_id: tag.entity_id,
      is_primary: tag.is_primary,
    })
    if (error) console.error(`  ✗ Tag error:`, error)
    else console.log(`  ✓ Tagged ${tag.entity_id} (primary: ${tag.is_primary})`)
  }

  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('✓ Co-occurrence refreshed')
}

main().catch(console.error)
