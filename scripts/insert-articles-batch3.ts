#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

async function getEntityId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
  return data?.id ?? null
}

async function insertArticle(
  article: {
    title: string
    slug: string
    type: string
    excerpt: string
    content_html: string
    status: string
    tags: string[]
    reading_time_minutes: number
    featured: boolean
    published_at: string
  },
  entityTags: { slug: string; is_primary: boolean }[]
) {
  console.log(`\nInserting article: "${article.title}"`)

  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({ ...article, created_by: ADMIN_USER_ID })
    .select('id')
    .single()

  if (postError || !post) {
    console.error(`  Failed to insert post:`, postError)
    return
  }

  console.log(`  Post inserted with ID: ${post.id}`)

  for (const tag of entityTags) {
    const entityId = await getEntityId(tag.slug)
    if (!entityId) {
      console.log(`  Entity "${tag.slug}" not found — skipping`)
      continue
    }

    const { error: tagError } = await supabase.from('entity_tags').insert({
      post_id: post.id,
      entity_id: entityId,
      is_primary: tag.is_primary,
    })

    if (tagError) {
      console.error(`  Failed to tag entity "${tag.slug}":`, tagError)
    } else {
      console.log(`  Tagged entity "${tag.slug}" (primary: ${tag.is_primary})`)
    }
  }
}

// ---------------------------------------------------------------------------
// ARTICLE 5: The Footsteps of Shaytan
// ---------------------------------------------------------------------------

const article5_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a phrase in the Quran that appears multiple times, across multiple surahs, in contexts ranging from food to sexuality to religious innovation. It is not a dramatic phrase. It does not describe hellfire or resurrection or the splitting of the sky. It describes something quieter, slower, and — for exactly that reason — far more dangerous. The phrase is خُطُوَاتِ الشَّيْطَانِ: the footsteps of Shaytan.</p>

  <p>Not leaps. Not a single dramatic fall. Steps. And the Quran's decision to use this word — خُطُوَات, the plural of خُطْوَة — is itself a revelation about how temptation actually works.</p>

  <h2>The Word Itself</h2>

  <p>The root خ–ط–و means to step, to stride, to advance by increments. A خُطْوَة is a single pace forward. When the Quran uses the plural — خُطُوَات — it is encoding a process, not a moment. Shaytan does not work in single decisive blows. He works in sequences. Each step is small enough that you barely notice it, close enough to where you already are that it feels like a natural continuation rather than a deviation.</p>

  <p>This is the architecture of every gradual moral decline the Quran warns against. The person who ends up in a catastrophic sin did not begin there. They began one step away from where they were, then another, then another — each one building on the psychological permission granted by the last.</p>

  <h2>Where the Quran Places This Phrase</h2>

  <p>The first occurrence comes in Surah Al-Baqarah, in one of the broadest possible contexts:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      يَا أَيُّهَا النَّاسُ كُلُوا مِمَّا فِي الْأَرْضِ حَلَالًا طَيِّبًا وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ ۚ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ
    </p>
    <p class="translation">"O humanity, eat from whatever is on earth that is lawful and good, and do not follow the footsteps of Shaytan. Indeed, he is to you a clear enemy."</p>
    <cite>Al-Baqarah (2:168)</cite>
  </blockquote>

  <p>Notice the context: food. Not idolatry, not murder, not the obvious moral catastrophes. Allah is telling humanity that even in something as basic as what you eat, Shaytan's incremental method operates. The pre-Islamic Arabs had invented elaborate food taboos — certain animals for certain people, certain portions forbidden without basis. Each taboo seemed small. Each one felt like piety. Together, they constituted a complete departure from what Allah had actually legislated.</p>

  <p>The phrase appears again in Al-Baqarah (2:208), this time addressed to believers specifically, commanding them to enter Islam completely — كَافَّةً — and not to follow the footsteps. The implication is sharp: even believers, even people who have already committed to the straight path, are vulnerable to the incremental method. Partial Islam — taking the comfortable parts and leaving the difficult ones — is itself a product of following the footsteps.</p>

  <h2>The Surah Al-An'am Connection</h2>

  <p>In Surah Al-An'am, the phrase appears after a detailed discussion of cattle and produce that the pagans had divided into forbidden and permitted categories based on their own fabrications:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَمِنَ الْأَنْعَامِ حَمُولَةً وَفَرْشًا ۚ كُلُوا مِمَّا رَزَقَكُمُ اللَّهُ وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ ۚ إِنَّهُ لَكُمْ عَدُوٌّ مُّبِينٌ
    </p>
    <p class="translation">"And of the cattle are some for burden and some for meat. Eat of what Allah has provided for you and do not follow the footsteps of Shaytan. Indeed, he is to you a clear enemy."</p>
    <cite>Al-An'am (6:142)</cite>
  </blockquote>

  <p>The pattern is becoming clear: the Quran places the "footsteps" warning precisely where human beings are most likely to invent their own rules and mistake them for divine ones. Shaytan's incrementalism doesn't always lead toward obvious sin. Sometimes it leads toward self-invented piety — adding prohibitions that Allah never imposed, creating guilt where none was intended, building a religion of human anxiety rather than divine guidance.</p>

  <h2>Surah An-Nur: The Moral Application</h2>

  <p>The most morally charged occurrence comes in Surah An-Nur, immediately after the verses addressing the slander of Aisha (may Allah be pleased with her):</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      يَا أَيُّهَا الَّذِينَ آمَنُوا لَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ ۚ وَمَن يَتَّبِعْ خُطُوَاتِ الشَّيْطَانِ فَإِنَّهُ يَأْمُرُ بِالْفَحْشَاءِ وَالْمُنكَرِ
    </p>
    <p class="translation">"O you who have believed, do not follow the footsteps of Shaytan. And whoever follows the footsteps of Shaytan — indeed, he commands immorality and wrongdoing."</p>
    <cite>An-Nur (24:21)</cite>
  </blockquote>

  <p>Here the Quran makes the endpoint explicit: الْفَحْشَاءِ وَالْمُنكَرِ — indecency and wrongdoing. But the entire rhetorical structure of the ayah insists that you do not arrive at this endpoint in one jump. You follow footsteps to get there. The slander incident itself is a case study: it began with casual gossip, escalated to speculation, then to confident repetition, then to communal character assassination — each step building on the social permission established by the previous one. No single individual thought they were participating in a catastrophe. Each thought they were simply passing along what they had heard.</p>

  <h2>The Prohibition of the Approach</h2>

  <p>This is why the Quran, throughout its legislation, does not merely forbid sins — it forbids the approaches to sins. The phrase وَلَا تَقْرَبُوا — "do not even come near" — appears before the prohibition of adultery (17:32), before the prohibition of consuming orphans' wealth (6:152), before the prohibition of indecency (6:151). The Quran legislates a perimeter, not just a boundary.</p>

  <p>This is architecturally consistent with the footsteps metaphor. If you know that the enemy works by increments, the defense cannot be to wait at the edge of the cliff and hope you stop in time. The defense must be to stay far from the cliff entirely. Every step you don't take is a step Shaytan cannot build upon.</p>

  <h2>The Modern Footsteps</h2>

  <p>The principle is timeless because the method is timeless. Consider how moral compromise works in any era: the professional who cuts one small ethical corner, then another, until fraud feels routine. The person who delays one prayer, then two, then abandons the practice entirely. The community that tolerates one small injustice, then a larger one, until systemic oppression feels normal. None of these catastrophes happened in a single moment. They happened in خُطُوَات — footsteps.</p>

  <p>The Quran's genius is in naming this process before it completes. By the time you can see the destination clearly, you may have traveled too far to easily return. But if you learn to recognize the footsteps — the small permissions, the incremental normalizations, the barely-noticeable shifts — you can stop walking before you arrive at a place you never intended to be.</p>

  <p>This is the deepest practical teaching embedded in the phrase. Shaytan does not need you to be evil. He just needs you to take one more step.</p>
</article>`

// ---------------------------------------------------------------------------
// ARTICLE 6: What the Quran Doesn't Say About Shaytan
// ---------------------------------------------------------------------------

const article6_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran's treatment of Shaytan is remarkable not only for what it reveals but for what it deliberately withholds. There are questions that virtually every culture asks about its adversarial spiritual figure — questions about origin, nature, appearance, dwelling — and the Quran either refuses to answer them or answers them in ways that redirect your attention entirely. These silences are not gaps. They are architecture. And understanding what the Quran does not say about Shaytan is as instructive as understanding what it does.</p>

  <h2>No Physical Description</h2>

  <p>The Quran never describes what Shaytan looks like. Not once. Across nearly ninety occurrences, there is no mention of horns, hooves, a tail, red skin, or any of the iconography that dominates Western and folk Islamic depictions. This is a striking omission — and it is almost certainly deliberate.</p>

  <p>The absence forces a psychological reframing. If you are looking for Shaytan as a visible figure, you are looking in the wrong direction. The Quran's entire characterization of his method — waswasa (whisper), khutuwat (footsteps), the approach from four directions — describes an invisible operator. He works through your thoughts, your rationalizations, your emotional blind spots. Giving him a face would undermine the Quran's central teaching about him: that his most effective weapon is being undetectable.</p>

  <h2>No Kingdom, No Realm</h2>

  <p>Unlike many religious traditions, the Quran gives Shaytan no kingdom. He has no underworld, no domain, no throne. He is not the "ruler of hell" — in fact, in Surah Ibrahim (14:22), he is explicitly one of its inmates, confessing his impotence to the very people he misled. The Quran does not establish a dualistic cosmos where God rules heaven and Shaytan rules an opposing realm. There is only one sovereignty, and it is Allah's.</p>

  <p>This has profound theological implications. Shaytan is not God's opposite. He is not even close. He is a created being who disobeyed, was granted respite, and operates within boundaries that Allah set. His power is derivative, not original. His existence is permitted, not independent. The Quran's refusal to give him a kingdom is a refusal to grant him the cosmic significance he craves.</p>

  <h2>No Cosmic Battle Narrative</h2>

  <p>There is no war in heaven in the Quran. No great battle between angelic armies. No fallen host. The story of Iblis is not a military narrative — it is a courtroom drama. He was given a command, he refused, he was questioned, he gave his reasoning, he was sentenced, he requested a delay, and it was granted. The entire confrontation is judicial, not martial.</p>

  <p>This matters because battle narratives elevate the adversary. If Shaytan fell after a cosmic war, he retains a certain tragic grandeur — the defeated general, the rebel prince. But the Quran strips him of this completely. He is not a fallen warrior. He is a disobedient servant who argued with his Master and lost. The Quran presents his rebellion not as heroic defiance but as سَجَدَ — a refusal to prostrate born of أَنَا خَيْرٌ مِّنْهُ — "I am better than him" (7:12). His rebellion is vanity, not valor.</p>

  <h2>No Power Over Matter</h2>

  <p>The Quran never attributes to Shaytan any ability to manipulate the physical world. He cannot create illness, cause storms, possess objects, or alter material reality. His entire toolkit, as the Quran describes it, is informational: suggestion, framing, emotional manipulation, false promises. In Surah Ibrahim's confession scene, he himself confirms this:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَمَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ إِلَّا أَن دَعَوْتُكُمْ فَاسْتَجَبْتُمْ لِي
    </p>
    <p class="translation">"I had no authority over you except that I called you and you responded to me."</p>
    <cite>Ibrahim (14:22)</cite>
  </blockquote>

  <p>The Arabic سُلْطَانٍ — authority, compelling power — is what he explicitly denies having. His only tool was دَعَوْتُكُمْ — "I called you." And the devastating conclusion: فَاسْتَجَبْتُمْ — "and you responded." The Quran places the weight of responsibility on the human, not the tempter. Shaytan's lack of material power means that every sin is ultimately a human choice.</p>

  <h2>No Explanation for Why the Respite Was Granted</h2>

  <p>One of the most profound silences in the Quran is the absence of any explanation for why Allah granted Iblis his request. In Surah Al-A'raf (7:14-15) and Surah Al-Hijr (15:36-38), Iblis asks to be given respite until the Day of Resurrection, and Allah says: "You are of those reprieved." No reason is given. No justification. No "because this will serve a greater purpose" or "because through this trial humanity will be refined."</p>

  <p>Classical scholars — Ibn al-Qayyim, al-Ghazali, others — have offered wisdom-based explanations: the struggle refines the sincere, separates the truthful from the false, gives meaning to the concept of choice. But the Quran itself does not make these arguments. It simply presents the fact: the request was made, the respite was granted. The silence invites contemplation rather than demanding a single correct interpretation.</p>

  <p>This is the Quran at its most pedagogically sophisticated. By withholding the "why," it prevents the reader from intellectualizing the trial into comfortable abstraction. You cannot say "Shaytan exists because X" and feel that you have solved the problem. The problem remains active, immediate, and personal. The question is not why he was given time — the question is what you will do with yours.</p>

  <h2>No Redemption Arc</h2>

  <p>The Quran does not hint at any possibility of Shaytan's repentance or rehabilitation. This is in contrast to certain mystical traditions that have speculated about Iblis's hidden love for God or his eventual return. The Quran is unambiguous: his trajectory is sealed. In Surah Al-Hijr:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ فَاخْرُجْ مِنْهَا فَإِنَّكَ رَجِيمٌ وَإِنَّ عَلَيْكَ اللَّعْنَةَ إِلَىٰ يَوْمِ الدِّينِ
    </p>
    <p class="translation">"He said: Then get out of here, for indeed you are expelled. And indeed, upon you is the curse until the Day of Judgment."</p>
    <cite>Al-Hijr (15:34-35)</cite>
  </blockquote>

  <p>The word رَجِيمٌ — expelled, cast out, pelted — and اللَّعْنَةَ — the curse — are definitive. There is no door left open. This is not cruelty but clarity. The Quran's refusal to entertain a redemption narrative for Shaytan prevents the reader from developing sympathy for the adversary. You are not meant to understand him. You are meant to recognize him and resist.</p>

  <h2>The Purpose of the Silence</h2>

  <p>Taken together, these absences create a very specific portrait: Shaytan is not a character to be understood on his own terms. He is a force to be recognized within your own experience. The Quran does not want you fascinated by Shaytan. It does not want you debating his metaphysics or imagining his form. It wants you vigilant against his method — which is subtle, incremental, and operates through your own thoughts.</p>

  <p>Every detail the Quran withholds about Shaytan redirects your attention inward. You will not find him by looking outward. You will find him in the moment you rationalize what you know to be wrong, in the thought that arrives dressed as your own, in the small permission that opens the door to a larger one. The Quran's silence about Shaytan's external characteristics is, in the end, its loudest statement about where the real battle takes place.</p>
</article>`

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  // Article 5: The Footsteps of Shaytan
  await insertArticle(
    {
      title: 'The Footsteps of Shaytan',
      slug: 'footsteps-of-shaytan',
      type: 'article',
      excerpt:
        'خُطُوَاتِ الشَّيْطَانِ — "the footsteps of Shaytan." Not leaps. Steps. The Quran\'s most precise teaching on how temptation actually works: one barely-noticeable increment at a time.',
      content_html: article5_html,
      status: 'published',
      tags: ['shaytan', 'quran', 'khutuwat', 'incrementalism', 'temptation'],
      reading_time_minutes: 11,
      featured: false,
      published_at: new Date().toISOString(),
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'iblis', is_primary: true },
      { slug: 'nafs', is_primary: false },
      { slug: 'taqwa', is_primary: false },
    ]
  )

  // Article 6: What the Quran Doesn't Say About Shaytan
  await insertArticle(
    {
      title: "What the Quran Doesn't Say About Shaytan",
      slug: 'what-quran-doesnt-say-about-shaytan',
      type: 'article',
      excerpt:
        "No physical description. No kingdom. No cosmic battle. No power over matter. The Quran's deliberate silences about Shaytan are as instructive as its revelations — every withheld detail redirects your attention inward.",
      content_html: article6_html,
      status: 'published',
      tags: ['shaytan', 'quran', 'iblis', 'theology', 'absence'],
      reading_time_minutes: 12,
      featured: false,
      published_at: new Date().toISOString(),
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'iblis', is_primary: true },
      { slug: 'nafs', is_primary: false },
      { slug: 'taqwa', is_primary: false },
      { slug: 'tawhid', is_primary: false },
    ]
  )

  // Refresh co-occurrence
  console.log('\nRefreshing entity co-occurrence...')
  const { error: rpcError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcError) {
    console.error('Failed to refresh co-occurrence:', rpcError)
  } else {
    console.log('Co-occurrence refreshed.')
  }

  // Update synthesis hash
  console.log('\nUpdating synthesis hash...')
  const { data: entity } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', 'shaytan')
    .single()

  if (entity) {
    const { error: hashError } = await supabase
      .from('hub_synthesis_cache')
      .update({ content_hash: 'shaytan-6-articles-v1-complete' })
      .eq('entity_id', entity.id)

    if (hashError) {
      console.error('Failed to update hash:', hashError)
    } else {
      console.log('Synthesis hash updated to shaytan-6-articles-v1-complete')
    }
  }

  console.log('\nDone.')
}

main().catch((err) => {
  console.error('Fatal:', err)
  process.exit(1)
})
