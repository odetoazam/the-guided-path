#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const QARUN_ENTITY_ID = '7c9900da-baaf-4403-91e1-188b6b69163b'
const MUSA_ENTITY_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'
const FIRAUN_ENTITY_ID = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861'

const articles = [
  {
    title: "The Weight of Keys: Qarun and the Theology of Wealth",
    slug: "the-weight-of-keys-qarun-and-the-theology-of-wealth",
    type: 'article' as const,
    excerpt: "Qarun's keys were so heavy that a group of strong men struggled to carry them. The Quran lingers on this detail — a wealth so vast that even its access instruments become a burden.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['qarun', 'quranic-characters', 'wealth'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran introduces Qarun with a single detail before anything else — before his speech, before his confrontation, before the earth opens beneath him. It describes his keys:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَآتَيْنَاهُ مِنَ الْكُنُوزِ مَا إِنَّ مَفَاتِحَهُ لَتَنُوءُ بِالْعُصْبَةِ أُولِي الْقُوَّةِ</p>
    <p class="translation">"And We gave him such treasures that their keys would burden a group of strong men."</p>
    <cite>Surah Al-Qasas (28:76)</cite>
  </blockquote>

  <p>The Quran measures Qarun's wealth not by the treasures themselves but by the weight of their keys — <strong>mafatihuhu</strong>. The keys to access the wealth are themselves a burden. The root <strong>f-t-h</strong> means to open, to unlock. A <strong>miftah</strong> is the instrument of opening. And these instruments — mere access points to the actual wealth — are so numerous or so heavy that <strong>la-tanu'u</strong>, they would weigh down, would overwhelm, a group (<strong>'usbah</strong>) of strong men (<strong>uli al-quwwah</strong>).</p>

  <p>The verb <strong>tanu'u</strong> comes from the root <strong>n-w-'</strong>, which means to be weighed down, to stagger under a load. The word carries physical distress — the body bending under something it was not designed to carry. The wealth has exceeded the human frame's capacity to manage it. This is the Quran's opening portrait of Qarun: a man whose possessions have outgrown the physical ability of strong men to merely hold the keys.</p>

  <h2>The Advice He Received</h2>

  <p>His community — <strong>qawmuhu</strong> — addresses him directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِذْ قَالَ لَهُ قَوْمُهُ لَا تَفْرَحْ ۖ إِنَّ اللَّهَ لَا يُحِبُّ الْفَرِحِينَ</p>
    <p class="translation">"When his people said to him: 'Do not exult. Indeed, Allah does not love the exultant.'"</p>
    <cite>Surah Al-Qasas (28:76)</cite>
  </blockquote>

  <p>The verb <strong>la tafrah</strong> — "do not exult" — uses the root <strong>f-r-h</strong>, which means a specific kind of joy: the arrogant, self-satisfied happiness that forgets its source. The Quran distinguishes between joy and <strong>farah</strong>. Simple happiness is not condemned anywhere in the text. <strong>Farah</strong> in its negative sense is the joy that attributes the cause to the self rather than to the giver.</p>

  <p>The advice continues with a remarkable structure — four imperatives that together constitute a complete economic theology:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَابْتَغِ فِيمَا آتَاكَ اللَّهُ الدَّارَ الْآخِرَةَ ۖ وَلَا تَنسَ نَصِيبَكَ مِنَ الدُّنْيَا ۖ وَأَحْسِن كَمَا أَحْسَنَ اللَّهُ إِلَيْكَ ۖ وَلَا تَبْغِ الْفَسَادَ فِي الْأَرْضِ</p>
    <p class="translation">"Seek, through what Allah has given you, the home of the Hereafter. And do not forget your share of this world. And do good as Allah has done good to you. And do not seek corruption in the land."</p>
    <cite>Surah Al-Qasas (28:77)</cite>
  </blockquote>

  <p>The first imperative: <strong>ibtagh</strong> — seek, pursue, use this wealth as a vehicle toward the next life. The second: <strong>wa la tansa nasibaka min ad-dunya</strong> — and do not forget your share of this world. The Quran does not ask him to renounce wealth. It asks him to keep it in proportion — your <strong>nasib</strong>, your portion, your allotted share. Wealth has a rightful place; the error is in letting it occupy every place.</p>

  <p>The third: <strong>ahsin kama ahsana Allahu ilayka</strong> — do good as Allah has done good to you. The verb <strong>ahsana</strong> — from <strong>h-s-n</strong>, beauty, excellence — frames generosity not as charity but as reciprocity. The beauty Allah showed to you, show to others. The relationship is circular: receive beauty, produce beauty. The fourth: <strong>wa la tabghi al-fasad</strong> — do not seek corruption. The wealth, misdirected, becomes an instrument of <strong>fasad</strong> — the same word the angels used when they predicted what humans would do on earth.</p>

  <h2>What Qarun Said</h2>

  <p>His response is preserved in a single sentence:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ إِنَّمَا أُوتِيتُهُ عَلَىٰ عِلْمٍ عِندِي</p>
    <p class="translation">"He said: 'I was only given it because of knowledge I possess.'"</p>
    <cite>Surah Al-Qasas (28:78)</cite>
  </blockquote>

  <p><strong>Innama utituhu 'ala 'ilmin 'indi.</strong> The word <strong>innama</strong> is a particle of restriction — "only," "nothing but." He reduces the explanation to a single cause: his own knowledge. <strong>'Ala 'ilmin 'indi</strong> — "upon knowledge that is with me." The phrase <strong>'indi</strong> — "with me," "in my possession" — is the critical word. The knowledge is <strong>'indi</strong>, mine, personal, proprietary. Qarun claims the wealth originated from his own expertise — his business acumen, his intelligence, his capacity.</p>

  <p>The claim is a precise inversion of what his community told him. They said: <strong>fima ataka Allah</strong> — "in what Allah has given you." He responds: <strong>utituhu 'ala 'ilmin 'indi</strong> — "I was given it through knowledge that is mine." The community frames wealth as received. Qarun reframes it as earned. The theological error is not in the possession but in the attribution.</p>

  <p>The Quran responds not with argument but with historical evidence:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَوَلَمْ يَعْلَمْ أَنَّ اللَّهَ قَدْ أَهْلَكَ مِن قَبْلِهِ مِنَ الْقُرُونِ مَنْ هُوَ أَشَدُّ مِنْهُ قُوَّةً وَأَكْثَرُ جَمْعًا</p>
    <p class="translation">"Did he not know that Allah had destroyed before him generations who were greater than him in power and greater in accumulation?"</p>
    <cite>Surah Al-Qasas (28:78)</cite>
  </blockquote>

  <p>The word <strong>qurun</strong> — generations — shares its root with <strong>Qarun</strong> himself. The generations that perished and the man who bears a name from the same root — the Quran lets the phonetic echo carry its own weight. Those who accumulated (<strong>akthar jam'an</strong>) more than him were also destroyed. Accumulation has no protective power. The evidence is historical, not hypothetical.</p>

  <h2>The Earth Opens</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَخَسَفْنَا بِهِ وَبِدَارِهِ الْأَرْضَ</p>
    <p class="translation">"So We caused the earth to swallow him and his home."</p>
    <cite>Surah Al-Qasas (28:81)</cite>
  </blockquote>

  <p>The verb <strong>khasafna</strong> — from <strong>kh-s-f</strong> — means to cave in, to collapse, to swallow from below. The earth that produced his wealth reclaims him. The ground — <strong>al-ard</strong> — acts as both stage and consequence. He sought corruption <strong>fi al-ard</strong>, in the earth; the earth responds by absorbing him entirely. The home — <strong>darihi</strong> — goes with him. The treasure, the keys, the display — all of it descends into the ground it came from.</p>

  <p>The aftermath reveals the community's internal split:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَصْبَحَ الَّذِينَ تَمَنَّوْا مَكَانَهُ بِالْأَمْسِ يَقُولُونَ وَيْكَأَنَّ اللَّهَ يَبْسُطُ الرِّزْقَ لِمَن يَشَاءُ مِنْ عِبَادِهِ وَيَقْدِرُ</p>
    <p class="translation">"And those who had wished for his position the day before began saying: 'Oh! It is Allah who extends provision to whom He wills of His servants and restricts it.'"</p>
    <cite>Surah Al-Qasas (28:82)</cite>
  </blockquote>

  <p>The exclamation <strong>wayka'anna</strong> — "oh!" or "alas!" — is a rare Quranic particle expressing sudden realization. Those who envied Qarun yesterday — <strong>bil-ams</strong>, just yesterday — now see what they were envying. The object lesson works on the witnesses. The verb pair <strong>yabsutu</strong> (extends) and <strong>yaqdiru</strong> (restricts) restores the theological frame Qarun rejected: wealth is extended and restricted by Allah, not generated by human knowledge alone. The same ground that swallowed Qarun teaches his neighbors the lesson he refused to learn from words.</p>
</article>`
  },
  {
    title: "Qarun, Fir'awn, and Haman: The Triad of Surah Ghafir",
    slug: "qarun-firaun-and-haman-the-triad-of-surah-ghafir",
    type: 'article' as const,
    excerpt: "The Quran groups these three together in a single ayah — the tyrant, the minister, and the oligarch. Each represents a different mechanism of opposition to the prophetic message, and together they form a complete system.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['qarun', 'firaun', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">In Surah Ghafir, the Quran names three opponents of Musa in a single breath:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَقَدْ أَرْسَلْنَا مُوسَىٰ بِآيَاتِنَا وَسُلْطَانٍ مُّبِينٍ ۝ إِلَىٰ فِرْعَوْنَ وَهَامَانَ وَقَارُونَ فَقَالُوا سَاحِرٌ كَذَّابٌ</p>
    <p class="translation">"And We certainly sent Musa with Our signs and a clear authority — to Fir'awn, Haman, and Qarun. But they said: 'A sorcerer, a great liar.'"</p>
    <cite>Surah Ghafir (40:23-24)</cite>
  </blockquote>

  <p>Three names. Three different positions. Fir'awn holds political power — the throne, the army, the capacity to decree life and death. Haman is the apparatus — the minister, the builder, the one who executes the sovereign's commands (it is Haman whom Fir'awn tells to build the tower in the same surah). Qarun holds economic power — the wealth so vast that its keys become their own burden.</p>

  <p>Their unified response is two words: <strong>sahirun kadhdhab</strong> — "a sorcerer, a great liar." <strong>Sahir</strong> from the root <strong>s-h-r</strong>, one who creates illusions. <strong>Kadhdhab</strong>, the intensive form of <strong>k-dh-b</strong>, one who lies habitually. The triad — political power, administrative apparatus, and economic might — speaks with one voice. The disagreement among them, if any existed, is not recorded. Their opposition is unanimous and its language is shared.</p>

  <h2>Three Mechanisms</h2>

  <p>Each figure represents a distinct mode of resisting prophetic truth, and the Quran distributes the modes with precision.</p>

  <p>Fir'awn resists through <strong>istikbar</strong> — self-magnification. His weapon is the claim to divine status: <strong>ana rabbukum al-a'la</strong>. He does not argue that Musa's message is economically inconvenient or administratively disruptive. He argues that he himself occupies the position Musa attributes to Allah. His resistance is metaphysical — a competing claim to the highest station.</p>

  <p>Haman resists through <strong>infrastructure</strong>. He is the one who builds. When Fir'awn wants to reach the heavens to verify Musa's claim about a God he cannot see, Haman constructs the tower. He does not need to believe in Fir'awn's divinity. He needs to execute Fir'awn's commands. His resistance is procedural — the machinery that converts a tyrant's whims into physical reality. Systems outlast the individuals who create them; Haman represents the system that makes tyranny operational.</p>

  <p>Qarun resists through <strong>economic counter-narrative</strong>. His claim — <strong>innama utituhu 'ala 'ilmin 'indi</strong>, "I was given this through my own knowledge" — is the wealthy class's perennial argument: wealth proves merit, and merit proves that the current order is just. If the system produced my success, the system must be correct. Prophetic messages that call for redistribution, humility, or recognition of a source beyond individual achievement threaten this narrative directly.</p>

  <h2>The Three Endings</h2>

  <p>The Quran gives each figure a distinct death — and the deaths mirror the modes of resistance.</p>

  <p>Fir'awn, who claimed to be the highest, drowns — brought to the lowest point by water. His body is preserved as a sign, his sovereignty extinguished by the very element (the sea) that bordered his kingdom. The one who claimed vertical supremacy is overcome by horizontal force.</p>

  <p>Qarun, who claimed the earth's treasures as his own achievement, is swallowed by the earth. <strong>Fakhasafna bihi wa bi-darihi al-ard</strong>. The ground reclaims what he attributed to himself. The ending is geological — the earth acts as both source and grave.</p>

  <p>Haman's individual end is not separately narrated in the Quran — he is included in the collective destruction. The apparatus does not merit an individual ending. It perishes when the system it served perishes. The builder of the tower is buried with the project. The Quran's silence about Haman's specific death is itself a statement: the functionary's fate is absorbed into the ruler's.</p>

  <h2>The Grouping as Warning</h2>

  <p>The Quran's decision to group these three in Surah Ghafir is architecturally significant. The surah's theme — announced by its alternative name, <strong>Al-Mu'min</strong>, "The Believer" — is the believing man from Fir'awn's own household who speaks up against the consensus. That one believer faces the unified front of political power, administrative capacity, and economic might. The triad represents the complete institutional resistance that truth may encounter.</p>

  <p>The message embedded in the grouping: opposition to prophetic truth is rarely a single individual's decision. It is systemic — the convergence of political authority that will not share its sovereignty, administrative machinery that executes without questioning, and economic interest that rationalizes its privilege as merit. The three together form a closed system. Each reinforces the others. The political leader needs the minister's execution and the oligarch's funding. The minister needs the leader's authority and the oligarch's resources. The oligarch needs the leader's protection and the minister's infrastructure.</p>

  <p>The believing man from Fir'awn's family addresses all three by addressing the system itself. He does not argue with each figure individually. He asks a single question that dismantles the entire apparatus:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَتَقْتُلُونَ رَجُلًا أَن يَقُولَ رَبِّيَ اللَّهُ وَقَدْ جَاءَكُم بِالْبَيِّنَاتِ مِن رَّبِّكُمْ</p>
    <p class="translation">"Would you kill a man because he says: 'My Lord is Allah,' and he has brought you clear proofs from your Lord?"</p>
    <cite>Surah Ghafir (40:28)</cite>
  </blockquote>

  <p>The question strips the situation to its skeleton. A man says <strong>rabbiya Allah</strong>. He has brought <strong>bayyinat</strong> — clear proofs. And the response of the combined triad is to kill him. The believing man forces the system to see its own logic: your political power, your administrative reach, your economic superiority — all of it is mobilized against a man who says four words. The disproportion between the apparatus and the message it opposes is itself the evidence.</p>

  <p>The Quran groups the three to show that tyranny is never a solo performance. It requires a supporting cast — the minister who builds the towers, the oligarch who funds the operation, the courtiers who amplify the message. And the counter to this system is not a matching apparatus of power but a single voice willing to speak — <strong>rajulun mu'minun min ali Fir'awn yaktumu imanahu</strong>, a believing man from the family of Fir'awn who had been concealing his faith. One person. The right words. The willingness to say them.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Qarun articles...')

  for (const article of articles) {
    const { data: post, error: postError } = await supabase
      .from('posts')
      .insert(article)
      .select('id, title, slug')
      .single()

    if (postError) {
      console.error(`Failed to insert "${article.title}":`, postError.message)
      continue
    }
    console.log(`✓ Inserted: "${post.title}"`)

    // Primary tag: Qarun
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: QARUN_ENTITY_ID, is_primary: true })
    console.log(`  ✓ Tagged: qarun (primary)`)

    // Secondary tags
    if (article.slug.includes('triad')) {
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: FIRAUN_ENTITY_ID, is_primary: false })
      console.log(`  ✓ Tagged: firaun (secondary)`)
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: MUSA_ENTITY_ID, is_primary: false })
      console.log(`  ✓ Tagged: musa (secondary)`)
    }
  }

  console.log('\nRefreshing entity co-occurrence...')
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('✓ Done! Inserted', articles.length, 'Qarun articles.')
}

main().catch(console.error)
