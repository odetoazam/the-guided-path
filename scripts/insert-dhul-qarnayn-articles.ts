#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

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
    .insert({ ...article, created_by: '5814582a-9f09-473a-be6f-619c210cca8e' })
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

// ─────────────────────────────────────────────────────
// ARTICLE 1: The Sovereign Who Refused to Be Paid
// Angle: Core profile — who Dhul-Qarnayn is and what defines him
// ─────────────────────────────────────────────────────

const article1 = {
  title: 'The Sovereign Who Refused to Be Paid',
  slug: 'the-sovereign-who-refused-to-be-paid',
  type: 'article',
  excerpt: 'Dhul-Qarnayn was given everything — power, resources, reach. What made him extraordinary was not what he had, but what he refused to take.',
  reading_time_minutes: 12,
  featured: false,
  status: 'published',
  tags: ['dhul-qarnayn', 'sovereignty', 'al-kahf', 'tamkeen'],
  published_at: new Date().toISOString(),
  content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a figure in the Quran who is given everything — political authority, military strength, the means to reach the ends of the earth — and who responds to all of this not with self-aggrandizement but with refusal. When a desperate people offer him payment for protection, he turns it down. When his greatest project is completed, he attributes it to divine mercy and announces that it will one day be leveled to dust. His name is not given. He is called only by an epithet: Dhul-Qarnayn — the one of two horns, two eras, two epochs.</p>

  <h2>The Question That Prompted the Story</h2>

  <p>Dhul-Qarnayn's story enters the Quran in response to a test. The leaders of Quraysh, advised by Jewish scholars in Madinah, posed three questions to the Prophet Muhammad to verify his prophethood. One of those questions was about "the man who traveled to the east and the west of the earth." The answer came in Surah Al-Kahf — not as a biography, but as a portrait of character. The Quran does not tell us who Dhul-Qarnayn was historically. It tells us what kind of person he was. That distinction is the entire point.</p>

  <h2>Tamkeen: Established in the Earth</h2>

  <p>The opening description sets the framework for everything that follows:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      إِنَّا مَكَّنَّا لَهُ فِي الْأَرْضِ وَآتَيْنَاهُ مِن كُلِّ شَيْءٍ سَبَبًا ﴿٨٤﴾ فَأَتْبَعَ سَبَبًا ﴿٨٥﴾
    </p>
    <p class="translation">"Indeed, We established him in the earth and gave him of everything a means. So he followed a means."</p>
    <cite>Surah Al-Kahf (18:84-85)</cite>
  </blockquote>

  <p>The word <em>makkannā</em> — "We established" — comes from the root م-ك-ن, which carries the meaning of firm placement, empowerment, and authority. This is tamkeen: divine establishment. The Quran uses the same root for Yusuf when he is established in the land of Egypt (12:56) and for earlier righteous communities given power in the earth (6:6). It is never self-made. Tamkeen is always granted, never seized.</p>

  <p>What follows the establishment is equally telling. He was given "of everything a means" — <em>min kulli shay'in sababā</em>. The word <em>sabab</em> literally means a rope, a connection, a path to something. He had the resources, the pathways, the tools to accomplish whatever he set out to do. And what did he do with these means? <em>Fa-atba'a sababā</em> — "so he followed a means." He took what was given and used it. He did not hoard. He did not display. He followed the path that the means opened for him.</p>

  <h2>The Refusal</h2>

  <p>The defining moment comes during the third journey. Dhul-Qarnayn reaches a people living between two mountain barriers, terrorized by the destructive forces of Ya'juj and Ma'juj. They cannot communicate with him easily — the Quran notes they could barely understand speech. Yet through interpreters they make their plea: build us a barrier, and we will pay you tribute.</p>

  <p>His answer is one of the most remarkable statements of any figure in the Quran:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ مَا مَكَّنِّي فِيهِ رَبِّي خَيْرٌ فَأَعِينُونِي بِقُوَّةٍ أَجْعَلْ بَيْنَكُمْ وَبَيْنَهُمْ رَدْمًا
    </p>
    <p class="translation">"He said: That in which my Lord has established me is better. But assist me with strength, and I will make between you and them a barrier."</p>
    <cite>Surah Al-Kahf (18:95)</cite>
  </blockquote>

  <p>Notice what happens here. He refuses payment — not out of false modesty, but from a clear theological position. What Allah has given him is better than what any people can offer. His provision comes from above; he does not need to extract it from below. But he does not simply give them a handout either. "Assist me with strength" — <em>a'īnūnī bi-quwwa</em> — he enlists their labor. The barrier becomes a collaborative project. He brings the engineering vision and the authority; they bring the raw physical effort. Protection is not charity. It is partnership.</p>

  <h2>The Word <em>Radm</em></h2>

  <p>The type of barrier Dhul-Qarnayn builds is called a <em>radm</em> — not a <em>sudd</em> (the word the people used when asking for help). A <em>sudd</em> is a dam or obstruction. A <em>radm</em> is something that completely fills a gap, closing it entirely. The Quran's word choice matters: Dhul-Qarnayn does not merely obstruct the passage. He seals it. The difference reflects his thoroughness — when he builds, he builds completely. There is no half-measure in his work.</p>

  <h2>Mercy, Not Monument</h2>

  <p>When the barrier is completed — a massive structure of iron slabs and molten copper poured between two mountain ranges — Dhul-Qarnayn does not name it after himself. He does not celebrate. He delivers a two-part theological statement that serves as the conclusion of his entire narrative:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ هَٰذَا رَحْمَةٌ مِّن رَّبِّي ۖ فَإِذَا جَاءَ وَعْدُ رَبِّي جَعَلَهُ دَكَّاءَ ۖ وَكَانَ وَعْدُ رَبِّي حَقًّا
    </p>
    <p class="translation">"He said: This is a mercy from my Lord. But when the promise of my Lord comes, He will level it to the ground. And the promise of my Lord is ever true."</p>
    <cite>Surah Al-Kahf (18:98)</cite>
  </blockquote>

  <p>Two sentences. Two truths. First: this barrier is mercy — <em>rahma</em> — from Allah. Not my achievement, not my engineering, not my legacy. Mercy. Second: it will not last. When the divine promise comes, it will be made <em>dakka'</em> — leveled, flattened, returned to dust. And that promise is <em>haqq</em> — true, certain, inevitable.</p>

  <p>This is the posture the Quran celebrates. The righteous sovereign builds the greatest structure in the narrative and holds it with open hands. He knows that even his most impressive accomplishment is temporary. He knows that the same Lord who gave him the means to build it will one day dissolve it. And he accepts this not with resignation but with faith. The promise of my Lord is ever true.</p>

  <h2>The Portrait Complete</h2>

  <p>Dhul-Qarnayn's profile is defined by three qualities that the Quran presents as inseparable. First, capacity — he was given tamkeen, established with means to do anything. Second, service — he used those means for others, building protection for a people who could not protect themselves, refusing to extract payment for work done by divine provision. Third, humility before the divine — he attributed everything to Allah's mercy and acknowledged the temporariness of his own works.</p>

  <p>The Quran does not tell us his real name. It does not tell us his dynasty, his capital city, or his dates. It tells us only what kind of sovereign he was: one who had everything and refused to let it own him. In a surah about the trials of power, wealth, knowledge, and authority, Dhul-Qarnayn represents the person who passes the test. He was given the world and remained free of it.</p>
</article>`,
}

const article1Tags = [
  { slug: 'dhul-qarnayn', is_primary: true },
  { slug: 'zuhd', is_primary: false },
  { slug: 'sulayman', is_primary: false },
]

// ─────────────────────────────────────────────────────
// ARTICLE 2: Three Journeys to the Edge of the World
// Angle: Narrative deep-dive — the three journeys and what each reveals
// ─────────────────────────────────────────────────────

const article2 = {
  title: 'Three Journeys to the Edge of the World',
  slug: 'three-journeys-to-the-edge-of-the-world',
  type: 'article',
  excerpt: 'West, East, North — each journey of Dhul-Qarnayn confronts a different human condition. Together they form a complete portrait of righteous leadership.',
  reading_time_minutes: 13,
  featured: false,
  status: 'published',
  tags: ['dhul-qarnayn', 'al-kahf', 'justice', 'leadership'],
  published_at: new Date().toISOString(),
  content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran structures Dhul-Qarnayn's story as three distinct journeys — west, east, and north. Each journey confronts him with a different landscape, a different people, and a different challenge. Together they form a graduated test of leadership: first justice, then compassion, then service at personal cost. The structure is deliberate. A sovereign who cannot do justice to the wrongdoers in the west has no business protecting the vulnerable in the north.</p>

  <h2>The Western Journey: Justice at the Setting Place</h2>

  <p>The first journey takes Dhul-Qarnayn to "the setting place of the sun," where he finds a people living near a murky spring:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      حَتَّىٰ إِذَا بَلَغَ مَغْرِبَ الشَّمْسِ وَجَدَهَا تَغْرُبُ فِي عَيْنٍ حَمِئَةٍ وَوَجَدَ عِندَهَا قَوْمًا ۗ قُلْنَا يَا ذَا الْقَرْنَيْنِ إِمَّا أَن تُعَذِّبَ وَإِمَّا أَن تَتَّخِذَ فِيهِمْ حُسْنًا
    </p>
    <p class="translation">"Until, when he reached the setting of the sun, he found it setting in a murky spring, and he found near it a people. We said: O Dhul-Qarnayn, either you punish them or you treat them with goodness."</p>
    <cite>Surah Al-Kahf (18:86)</cite>
  </blockquote>

  <p>The choice presented to Dhul-Qarnayn is binary in form but reveals a third option in his answer. He is given the power to punish or to show goodness — the two poles of sovereignty. A tyrant punishes indiscriminately. A naive ruler shows mercy to everyone without distinction. Dhul-Qarnayn does neither. He announces a policy of differentiated justice: the wrongdoer will be punished, then returned to his Lord for further reckoning; the one who believes and does good will receive the finest reward, and Dhul-Qarnayn will speak to him with ease.</p>

  <p>This is not a compromise between punishment and mercy. It is the recognition that justice requires distinguishing between people based on their conduct, not their status. The western journey tests whether the sovereign can resist the temptation to use power uniformly — either as blanket oppression or as undiscriminating leniency. Dhul-Qarnayn passes by choosing precision.</p>

  <h2>The Eastern Journey: Witness Without Intervention</h2>

  <p>The second journey takes him to the east — "the rising place of the sun" — where he finds a people with no shelter:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      حَتَّىٰ إِذَا بَلَغَ مَطْلِعَ الشَّمْسِ وَجَدَهَا تَطْلُعُ عَلَىٰ قَوْمٍ لَّمْ نَجْعَل لَّهُم مِّن دُونِهَا سِتْرًا
    </p>
    <p class="translation">"Until, when he reached the rising of the sun, he found it rising upon a people for whom We had not made against it any shield."</p>
    <cite>Surah Al-Kahf (18:90)</cite>
  </blockquote>

  <p>The Quran's description is remarkably spare. These people have no <em>sitr</em> — no covering, no protection — against the sun. They live exposed. And then the narrative moves on with a single cryptic comment: "Thus. And We had encompassed what was with him in knowledge" (18:91). There is no speech from Dhul-Qarnayn here. No policy declaration. No construction project. Just observation.</p>

  <p>What are we to make of this silence? Some scholars suggest that these people lived so simply that there was nothing to be done — they needed no governance, no infrastructure, no intervention. Others read the passage as a test of restraint: the righteous sovereign does not impose solutions where none are needed. Not every encounter requires action. Sometimes wisdom is the recognition that a people's way of life, however stark it appears, does not require your correction.</p>

  <p>The eastern journey tests something different from the west. In the west, the test was about using power justly. In the east, the test is about knowing when not to use power at all.</p>

  <h2>The Northern Journey: Building for Those Who Cannot Build</h2>

  <p>The third and longest journey brings Dhul-Qarnayn between two mountain barriers — <em>bayn al-saddayn</em> — where he encounters a people under threat:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      حَتَّىٰ إِذَا بَلَغَ بَيْنَ السَّدَّيْنِ وَجَدَ مِن دُونِهِمَا قَوْمًا لَّا يَكَادُونَ يَفْقَهُونَ قَوْلًا
    </p>
    <p class="translation">"Until, when he reached the area between two mountain barriers, he found beside them a people who could hardly understand speech."</p>
    <cite>Surah Al-Kahf (18:93)</cite>
  </blockquote>

  <p>The phrase <em>lā yakādūna yafqahūna qawlā</em> — "they could hardly understand speech" — has been interpreted in two ways. Either they spoke a language so foreign that communication was nearly impossible, or they were a simple, isolated people without the sophistication to articulate complex ideas. Either way, these are the most vulnerable people Dhul-Qarnayn encounters. They cannot protect themselves. They cannot even fully explain their predicament.</p>

  <p>Yet they manage to communicate one thing: Ya'juj and Ma'juj are spreading corruption in the land, and they are willing to pay for protection. Their offer of tribute — <em>kharj</em> — is the offer of people who know they are at the mercy of someone more powerful. It is what the weak offer the strong in exchange for security.</p>

  <p>And Dhul-Qarnayn refuses it. What his Lord has given him is better. He does not need their money. But he does need their effort — "assist me with strength" — and together they build the barrier that seals the passage between the mountains.</p>

  <h2>The Arc of the Three</h2>

  <p>Read together, the three journeys form a progression. In the west, Dhul-Qarnayn encounters people who require judgment — and he provides it with precision, distinguishing the wrongdoer from the righteous. In the east, he encounters people who require nothing — and he has the wisdom to move on without imposing. In the north, he encounters people who require everything — protection, leadership, engineering — and he provides it without compensation.</p>

  <p>Each journey tests a different dimension of sovereignty. The first tests justice. The second tests restraint. The third tests generosity. A ruler who fails any of these is incomplete. The Quran presents them in this order because each capacity builds on the last: you cannot be generous if you cannot be restrained, and you cannot be restrained if you do not understand justice.</p>

  <p>The geographical movement — west, east, north — also mirrors a spiritual journey. The setting sun represents endings, decline, the world of consequences where wrongdoing must be addressed. The rising sun represents beginnings, simplicity, the world before corruption takes hold. The mountains in the north represent the boundary between the human world and the forces of chaos that threaten to overwhelm it. Dhul-Qarnayn traverses the full spectrum of human conditions and responds to each with the exact quality it demands.</p>

  <h2>Why Three and Not One</h2>

  <p>A lesser narrative would have skipped to the barrier. The barrier against Ya'juj and Ma'juj is the dramatic climax — the engineering marvel, the refusal of payment, the theological epilogue. But the Quran builds up to it through two prior encounters that establish Dhul-Qarnayn's credentials. By the time he reaches the northern passage, we already know he can be just without being cruel, restrained without being indifferent. The barrier is not the act of an engineer. It is the act of a complete leader whose character has been tested and refined across the full range of human need.</p>

  <p>This is why his story sits in Surah Al-Kahf as the fourth and final narrative. The Sleepers of the Cave test faith under persecution. The man with two gardens tests faith under prosperity. Musa and al-Khidr test faith under confusion. Dhul-Qarnayn tests faith under absolute power. He is the culmination — the one who has everything and must decide what kind of person that makes him. His three journeys are his answer.</p>
</article>`,
}

const article2Tags = [
  { slug: 'dhul-qarnayn', is_primary: true },
  { slug: 'musa', is_primary: false },
]

// ─────────────────────────────────────────────────────
// ARTICLE 3: The Wall That Was Always Meant to Fall
// Angle: Key scene — the barrier and its eschatological meaning
// ─────────────────────────────────────────────────────

const article3 = {
  title: 'The Wall That Was Always Meant to Fall',
  slug: 'the-wall-that-was-always-meant-to-fall',
  type: 'article',
  excerpt: 'Dhul-Qarnayn built the greatest barrier in Quranic history — then announced that Allah would one day level it to dust. What does it mean to build something you know will not last?',
  reading_time_minutes: 11,
  featured: false,
  status: 'published',
  tags: ['dhul-qarnayn', 'al-kahf', 'yajuj-majuj', 'eschatology'],
  published_at: new Date().toISOString(),
  content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Dhul-Qarnayn builds a barrier of iron and molten copper between two mountain ranges, sealing off the destructive forces of Ya'juj and Ma'juj from the people who cannot defend themselves. It is the most elaborate construction project in the Quran — described with technical precision, accomplished through collective labor, and effective in its purpose. And the moment it is finished, its builder announces that it will be destroyed. "When the promise of my Lord comes, He will level it to the ground." This is not a failure. It is the theology of building.</p>

  <h2>The Engineering</h2>

  <p>The Quran describes the construction process in unusual detail. Dhul-Qarnayn commands the people to bring him blocks of iron. He fills the space between the two mountain sides. Then he orders them to blow — to stoke the fire until the iron becomes red-hot. Finally, he pours molten copper over it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      آتُونِي زُبَرَ الْحَدِيدِ ۖ حَتَّىٰ إِذَا سَاوَىٰ بَيْنَ الصَّدَفَيْنِ قَالَ انفُخُوا ۖ حَتَّىٰ إِذَا جَعَلَهُ نَارًا قَالَ آتُونِي أُفْرِغْ عَلَيْهِ قِطْرًا
    </p>
    <p class="translation">"Bring me blocks of iron. Until, when he had leveled them between the two mountain sides, he said: Blow. Until, when he had made it fire, he said: Bring me, that I may pour over it molten copper."</p>
    <cite>Surah Al-Kahf (18:96)</cite>
  </blockquote>

  <p>The process is deliberate and layered. Iron blocks form the body. Fire transforms them. Molten copper — <em>qitr</em> — seals them into an impenetrable mass. The result is a structure that Ya'juj and Ma'juj cannot scale or pierce: <em>fa-mā istaṭā'ū an yaẓharūhu wa-mā istaṭā'ū lahū naqbā</em> — "they could neither climb over it nor could they penetrate it" (18:97). The Quran is describing something intentionally overwhelming in its solidity. This is not a fence. It is a geological intervention — human engineering on a scale that reshapes the landscape itself.</p>

  <h2>The Announcement</h2>

  <p>What follows the completion is the most theologically significant moment in the entire Dhul-Qarnayn narrative:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ هَٰذَا رَحْمَةٌ مِّن رَّبِّي ۖ فَإِذَا جَاءَ وَعْدُ رَبِّي جَعَلَهُ دَكَّاءَ ۖ وَكَانَ وَعْدُ رَبِّي حَقًّا
    </p>
    <p class="translation">"He said: This is a mercy from my Lord. But when the promise of my Lord comes, He will level it to the ground. And the promise of my Lord is ever true."</p>
    <cite>Surah Al-Kahf (18:98)</cite>
  </blockquote>

  <p>Three clauses, three truths. The barrier is <em>rahma</em> — mercy from Allah. Its destruction is certain — when the divine promise arrives. And that promise is <em>haqq</em> — absolutely, eternally true.</p>

  <p>The word <em>dakka'</em> means to level completely, to crush flat, to reduce to rubble. It is the same word used when Allah manifests Himself to the mountain in Musa's story: "He made it dakka" (7:143) — the mountain crumbles to dust. When the Quran uses this word, it means annihilation. Not decay, not erosion, not gradual deterioration. Complete flattening. The greatest thing Dhul-Qarnayn ever built will be reduced to nothing by divine decree.</p>

  <h2>Ya'juj and Ma'juj: The Forces Behind the Wall</h2>

  <p>Who or what are Ya'juj and Ma'juj? The Quran does not elaborate on their nature beyond their capacity for destruction — <em>mufsidūna fī al-arḍ</em>, "corrupters in the land" (18:94). They are a force that overwhelms through sheer scale. The Quran elsewhere connects their release to the approaching Day of Judgment:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      حَتَّىٰ إِذَا فُتِحَتْ يَأْجُوجُ وَمَأْجُوجُ وَهُم مِّن كُلِّ حَدَبٍ يَنسِلُونَ
    </p>
    <p class="translation">"Until when Gog and Magog are let loose and they descend from every elevation."</p>
    <cite>Surah Al-Anbiya (21:96)</cite>
  </blockquote>

  <p>The barrier holds — but only until the appointed time. When that time comes, Ya'juj and Ma'juj pour forth "from every elevation" — <em>min kulli hadabin yansilūn</em> — a wave that cannot be contained by any human structure. The barrier was never meant to be permanent. It was meant to buy time. And Dhul-Qarnayn knew this from the beginning.</p>

  <h2>Building What Will Be Destroyed</h2>

  <p>This is the paradox at the heart of the story, and it is not a paradox at all once you understand the Quranic theology of action. The value of building does not depend on permanence. The barrier protects people now. It is mercy now. That it will one day be destroyed does not diminish what it does in the present. The righteous builder does not require his work to last forever in order to commit fully to its excellence.</p>

  <p>This is the opposite of the Pharaonic model, where building is about legacy — monuments that outlast the builder, structures that declare "I was here" across the centuries. Dhul-Qarnayn builds the greatest structure in Quranic history and does not even name it after himself. He builds it, calls it mercy, announces its eventual destruction, and moves on. The building serves its purpose. The builder serves his Lord. Neither requires immortality.</p>

  <p>Consider the implications. If even the barrier of Dhul-Qarnayn — iron, copper, mountain-scale — will be leveled to dust, then every human construction exists under the same principle. Every institution, every empire, every system of protection that human beings build is provisional. This is not a reason not to build. It is a reason to build without attachment. Build fully, build excellently, build for mercy — and hold it all with the awareness that the promise of your Lord is ever true.</p>

  <h2>The Wall in the Surah</h2>

  <p>Within Surah Al-Kahf, the wall functions as the answer to the surah's central question: what do you do with the power and means you have been given? The Companions of the Cave had nothing — they fled with only their faith. The man with two gardens had wealth and lost it because he forgot its Source. Musa sought knowledge and found it exceeded his understanding. Dhul-Qarnayn had everything — power, means, authority, reach — and he used it to build something that would protect others, refused to be paid for it, and acknowledged that even this achievement was temporary.</p>

  <p>The wall is not the point. The wall is the test. And the test is whether the builder knows the difference between what he has made and who made it possible. Dhul-Qarnayn passed.</p>
</article>`,
}

const article3Tags = [
  { slug: 'dhul-qarnayn', is_primary: true },
]

// ─────────────────────────────────────────────────────
// ARTICLE 4: Dhul-Qarnayn and Sulayman — Two Models of Quranic Sovereignty
// Angle: Comparative — contrasting two righteous sovereigns
// ─────────────────────────────────────────────────────

const article4 = {
  title: 'Dhul-Qarnayn and Sulayman: Two Models of Quranic Sovereignty',
  slug: 'dhul-qarnayn-and-sulayman-two-models-of-quranic-sovereignty',
  type: 'article',
  excerpt: 'Both were given dominion over the earth. Both used it in service. But the Quran frames their power differently — and the difference reveals what sovereignty means in the Quranic worldview.',
  reading_time_minutes: 12,
  featured: false,
  status: 'published',
  tags: ['dhul-qarnayn', 'sulayman', 'sovereignty', 'comparative'],
  published_at: new Date().toISOString(),
  content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran presents two figures who were given sovereignty over vast domains: Sulayman and Dhul-Qarnayn. Both received divine establishment — tamkeen — and both used their power in service rather than self-aggrandizement. Yet the Quran frames them in fundamentally different ways. Sulayman's sovereignty is miraculous — he commands the wind, speaks to animals, controls the jinn. Dhul-Qarnayn's sovereignty is procedural — he travels, he encounters, he builds. Together they represent two models of what it means to hold power under divine authority, and comparing them reveals the Quran's nuanced theology of leadership.</p>

  <h2>The Nature of the Gift</h2>

  <p>Sulayman's story begins with an inheritance that transcends the ordinary:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَوَرِثَ سُلَيْمَانُ دَاوُودَ ۖ وَقَالَ يَا أَيُّهَا النَّاسُ عُلِّمْنَا مَنطِقَ الطَّيْرِ وَأُوتِينَا مِن كُلِّ شَيْءٍ ۖ إِنَّ هَٰذَا لَهُوَ الْفَضْلُ الْمُبِينُ
    </p>
    <p class="translation">"And Sulayman inherited Dawud. He said: O people, we have been taught the language of birds, and we have been given of everything. Indeed, this is the evident bounty."</p>
    <cite>Surah An-Naml (27:16)</cite>
  </blockquote>

  <p>Sulayman's phrase is revealing: <em>ūtīnā min kulli shay'</em> — "we have been given of everything." Compare this with Dhul-Qarnayn's description: <em>ātaynāhu min kulli shay'in sababā</em> — "We gave him of everything a means" (18:84). The words are nearly identical, but the addition of <em>sababā</em> — a means, a rope, a path — makes the difference. Sulayman was given things directly: the language of birds, dominion over jinn, wind that traveled at his command. Dhul-Qarnayn was given means — the tools, resources, and pathways to achieve things through effort.</p>

  <p>This is not a hierarchy. It is a distinction between two modes of divine gifting. Sulayman receives miracles. Dhul-Qarnayn receives capacity. Both are divine provision. But Sulayman's story is about what happens when the supernatural is placed in human hands, while Dhul-Qarnayn's story is about what happens when extraordinary natural capability is directed by righteousness.</p>

  <h2>The Relationship to Power</h2>

  <p>Sulayman explicitly asked for his kingdom. When tested and briefly losing his throne, he prayed:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ رَبِّ اغْفِرْ لِي وَهَبْ لِي مُلْكًا لَّا يَنبَغِي لِأَحَدٍ مِّن بَعْدِي ۖ إِنَّكَ أَنتَ الْوَهَّابُ
    </p>
    <p class="translation">"He said: My Lord, forgive me and grant me a kingdom such as will not belong to anyone after me. Indeed, You are the Bestower."</p>
    <cite>Surah Sad (38:35)</cite>
  </blockquote>

  <p>Sulayman asks for a kingdom that no one will match. This is not arrogance — he has just been tested and has returned to Allah in repentance. His request comes from a place of total dependence: "You are the Bestower." But the request itself is bold. He wants unparalleled dominion, and Allah grants it. Sulayman's relationship to power is one of conscious, deliberate possession. He knows what he has, he asked for it, and he uses it openly.</p>

  <p>Dhul-Qarnayn, by contrast, never asks for anything. He is established by Allah — <em>makkannā lahū</em> — without any recorded prayer, request, or negotiation. He receives and he uses. When offered payment, he refuses not because he is wealthy but because "that in which my Lord has established me is better." His relationship to power is one of stewardship rather than possession. He does not think of it as his kingdom. He thinks of it as divine provision that he happens to be administering.</p>

  <h2>How They Build</h2>

  <p>Both sovereigns are builders. Sulayman constructs a palace with a floor of glass so transparent that the Queen of Sheba mistakes it for water (27:44). He commands the jinn to build for him "structures and images, basins like reservoirs, and stationary kettles" (34:13). His building is spectacular — meant to be seen, meant to demonstrate the reach of divinely granted power.</p>

  <p>Dhul-Qarnayn builds a barrier between two mountains. It is functional, not ornamental. It is made of iron and copper, not glass and gold. It is not named, not decorated, not displayed. It exists to protect a people who cannot protect themselves. When it is finished, its builder immediately announces that it will be destroyed.</p>

  <p>The contrast is instructive but not hierarchical. Sulayman's buildings served purposes too — the glass palace was a vehicle for inviting the Queen of Sheba to monotheism. The structures built by the jinn served his kingdom's needs. But the aesthetic dimension of Sulayman's reign is absent from Dhul-Qarnayn's. Dhul-Qarnayn builds for need. Sulayman builds for need and for glory — and the Quran does not condemn the glory, because Sulayman attributes it to Allah.</p>

  <h2>The Theology of Endings</h2>

  <p>Perhaps the deepest difference lies in how each story handles the question of permanence. Sulayman's death is one of the most striking scenes in the Quran: he dies leaning on his staff, and the jinn continue working, unaware he has passed. They only realize the truth when a worm eats through the staff and his body collapses. The lesson the Quran draws is explicit: if the jinn had known the unseen, they would not have remained in humiliating servitude (34:14). Even Sulayman's death serves as a demonstration — proof that knowledge of the unseen belongs only to Allah.</p>

  <p>Dhul-Qarnayn's ending is different. He does not die in the narrative. His story ends not with his death but with his declaration: "The promise of my Lord is ever true." His exit is theological, not biographical. He completes his work, states his faith, and the narrative shifts immediately to the Day of Judgment itself (18:99). The story does not need to show his death because his final words already contain the truth of mortality: everything he built will be destroyed, and divine promise is the only permanence.</p>

  <h2>Two Models, One Principle</h2>

  <p>Sulayman and Dhul-Qarnayn represent two valid modes of sovereignty in the Quranic worldview. Sulayman is the sovereign-prophet: his power is miraculous, his kingdom is unique, his authority over creation is total and acknowledged. Dhul-Qarnayn is the sovereign-servant: his power is natural, his kingdom is described only through what he does with it, his authority is demonstrated through refusal and service.</p>

  <p>What unites them is the principle that sovereignty is a trust, not a possession. Sulayman attributes his gifts to divine bounty: "this is the evident bounty." Dhul-Qarnayn attributes his achievements to divine mercy: "this is a mercy from my Lord." Both know that what they have was given. Both know it can be taken. Both use it in service of something beyond themselves.</p>

  <p>The Quran does not rank them. It presents them as complementary models. Some people are given miraculous gifts and must learn to hold them with gratitude. Others are given means and pathways and must learn to use them with integrity. The test is the same: will you remember the Source? Will you serve or will you exploit? Will you build for mercy or for monument?</p>

  <p>In presenting both Sulayman and Dhul-Qarnayn as righteous, the Quran teaches that there is no single template for faithful leadership. What matters is not the style of sovereignty but its orientation. Both sovereigns face Allah. Both serve. Both remember. That is enough.</p>
</article>`,
}

const article4Tags = [
  { slug: 'dhul-qarnayn', is_primary: true },
  { slug: 'sulayman', is_primary: true },
  { slug: 'zuhd', is_primary: false },
]

// ─────────────────────────────────────────────────────
// SYNTHESIS: Hub overview for Dhul-Qarnayn
// ─────────────────────────────────────────────────────

const synthesisHtml = `
<div class="synthesis-content">
  <p class="text-lg leading-relaxed">Dhul-Qarnayn — <span class="arabic-inline" style="font-family: var(--font-amiri,'Amiri'),serif;">ذُو ٱلْقَرْنَيْن</span> — "the one of two horns" — appears in Surah Al-Kahf (18:83-98) as the fourth and final figure in a surah about what human beings do with divine provision. He is a sovereign given <em>tamkeen</em> — establishment in the earth — and the means to accomplish anything. His story is the Quran's portrait of what righteous power looks like in practice.</p>

  <h2>The Profile</h2>
  <p>The Quran does not name Dhul-Qarnayn. His identity — whether Cyrus the Great, Alexander, or another figure entirely — is left open because the story's lesson is about character, not biography. He is described with deliberate precision: established by Allah, given means to everything, and he "followed a means" (<em>fa-atba'a sababā</em>). Three qualities define him: he uses divine provision without hoarding it, he serves without extracting payment, and he acknowledges the temporariness of his achievements.</p>

  <h2>The Three Journeys</h2>
  <p>His narrative unfolds across three journeys that test different dimensions of leadership. In the <strong>west</strong>, he encounters a people and chooses differentiated justice — punishing the wrongdoer while rewarding the righteous. In the <strong>east</strong>, he finds a people living without shelter from the sun and moves on without imposing solutions. In the <strong>north</strong>, he reaches a people trapped between mountains and threatened by Ya'juj and Ma'juj. They offer tribute; he refuses. He builds instead — enlisting their labor, sealing the passage with iron and molten copper, and producing a barrier that cannot be climbed or pierced.</p>

  <h2>The Theology of Building</h2>
  <p>The barrier is the Quran's most detailed construction narrative. But its theological significance lies not in its engineering but in what Dhul-Qarnayn says upon completion: <em>"Hādhā raḥmatun min Rabbī"</em> — "This is a mercy from my Lord." He calls his greatest achievement <em>mercy</em>, not monument. Then he adds: when Allah's promise comes, it will be leveled to dust. And the promise of his Lord is ever true. The righteous builder builds fully and holds lightly, knowing that permanence belongs only to the divine.</p>

  <h2>The Model</h2>
  <p>In Surah Al-Kahf's four stories — the Sleepers (faith under persecution), the two gardens (faith under prosperity), Musa and al-Khidr (faith under confusion), and Dhul-Qarnayn (faith under absolute power) — Dhul-Qarnayn represents the culmination. He has everything and is not corrupted by it. He builds without ego, serves without compensation, and ends his narrative not with a monument to himself but with a declaration of faith in divine promise. He is the Quran's answer to a question that every person with power must face: what do you do when you have the means to do anything?</p>
</div>
`

// ─────────────────────────────────────────────────────
// MAIN: Insert everything
// ─────────────────────────────────────────────────────

async function main() {
  console.log('=== Dhul-Qarnayn Hub: Article + Synthesis Insertion ===\n')

  // Insert articles
  await insertArticle(article1, article1Tags)
  await insertArticle(article2, article2Tags)
  await insertArticle(article3, article3Tags)
  await insertArticle(article4, article4Tags)

  // Insert synthesis
  console.log('\n--- Inserting hub synthesis ---')
  const entityId = await getEntityId('dhul-qarnayn')
  if (!entityId) {
    console.error('Entity "dhul-qarnayn" not found!')
    return
  }

  const { error: synthError } = await supabase
    .from('hub_synthesis_cache')
    .upsert({
      entity_id: entityId,
      synthesis_html: synthesisHtml.trim(),
      content_hash: 'dhul-qarnayn-4-articles-v1',
      last_generated_at: new Date().toISOString(),
    }, { onConflict: 'entity_id' })

  if (synthError) {
    console.error('Failed to insert synthesis:', synthError)
  } else {
    console.log('Synthesis inserted successfully')
  }

  // Refresh co-occurrence
  console.log('\n--- Refreshing entity co-occurrence ---')
  const { error: rpcError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcError) {
    console.error('Failed to refresh co-occurrence:', rpcError)
  } else {
    console.log('Co-occurrence refreshed')
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
