#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const articles = [
  {
    title: "What the Quran Withholds About Jannah: The Productive Silence",
    slug: "jannah-productive-silence-quran",
    type: "article",
    excerpt: "32:17 is not an admission of ignorance — it is a deliberate rhetorical move. The Quran describes Jannah in detail across 147 ayahs, then announces the real Jannah has not been described at all.",
    seo_title: "What the Quran Withholds About Jannah — The Productive Silence",
    seo_description: "Surah As-Sajdah 32:17 says no soul knows what has been hidden. A deep-dive into why the Quran deliberately conceals Jannah's deepest reality — and what that concealment accomplishes.",
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The verse arrives without ceremony. Buried in <strong>Surah As-Sajdah</strong>, between an account of creation and a description of those who spend their nights in prostration, it stops: <em>fa-lā taʿlamu nafsun mā ukhfiya lahum min qurrati aʿyun</em> — "no soul knows what has been hidden for them of comfort and delight." The verb matters. <strong>Ukhfiya</strong> — it was concealed, it was kept hidden. Not "what awaits them" but what has been deliberately withheld from knowing. The Quran describes <a href="/hub/jannah">Jannah</a> across 147 ayahs in lavish, specific, sensory detail — rivers, fruit, silk, companions, dwellings, greetings — and then, in a single subordinate clause, announces that the real Jannah has not been described at all.</p>

  <p>This is not a contradiction. It is a rhetorical structure: build the imagination to its limit, then collapse it. The Quran has been preparing readers, across dozens of surahs, to understand that preparation itself is the message. Every image of rivers beneath which rivers flow, every mention of reclining on raised couches, every description of the companions of paradise — these are not specifications. They are arrows. And the target is past the point where arrows can reach.</p>

  <h2>What Verse 32:17 Actually Says</h2>

  <blockquote class="ayah-quote" data-ayah="32:17">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:32:17 -->فَلَا تَعْلَمُ نَفْسٌ مَّآ أُخْفِىَ لَهُم مِّن قُرَّةِ أَعْيُنٍ جَزَآءًۢ بِمَا كَانُوا۟ يَعْمَلُونَ</p>
    <p class="translation">No soul knows what has been hidden for them of comfort and delight — as a reward for what they used to do.</p>
    <cite>As-Sajdah (32:17)</cite>
  </blockquote>

  <p>Read the grammar. <em>Lā taʿlamu</em> — the verb is in the present continuous: no soul knows, and the not-knowing is ongoing. Not "no soul was told" or "no soul will find out until the Day" — the knowing is structurally unavailable. <em>Nafsun</em> is indefinite and in the nominative — any soul, every soul, including the Prophet ﷺ himself. The hadith qudsi that the Bukhari commentary anchors to this verse makes the source explicit: Allah says, directly, "I have prepared for My righteous servants what no eye has seen, no ear has heard, and what has not occurred to any human heart." The three channels of human knowledge — sight, hearing, imagination — are each named and each excluded. The verse in Surah As-Sajdah is the Quranic anchor of that tradition, and the anchor holds: this is deliberate concealment, not accidental omission.</p>

  <p>The word <em>qurrata aʿyun</em> — translated as "comfort and delight" or "that which brings coolness and joy to the eyes" — carries an entire emotional register. <em>Qurra</em> is from the root meaning coolness; in Arabic, coolness of the eye is the idiom for joy so complete it quiets the restlessness of looking. The eye that has found its object stops searching. What <strong>32:17</strong> promises, then, is not merely pleasure but the end of longing — and the Quran says: you cannot conceive of it from here.</p>

  <h2>The Shape of the Withholding</h2>

  <p>Linguists who study the Quran's rhetorical architecture describe a technique sometimes called <em>ijāz</em> — the compression that carries more weight than expansion. But 32:17 operates on something rarer: it uses the structure of description to announce the limits of description. The Quran has spent considerable effort — in <strong>Ar-Rahman</strong>, in <strong>Al-Waqi'ah</strong>, in <strong>Al-Insan</strong> — building a vocabulary of Jannah so vivid that readers across fourteen centuries have memorized it, dreamed of it, longed for it. Gardens with gushing springs. Fruit within reach from wherever you recline. Garments of green silk and gold. Companions purified beyond the mixed reality of this world's human contact.</p>

  <p>Then 32:17 says: all of that is the visible surface. What has been hidden is of a different order entirely.</p>

  <p>This is not a poetic flourish. The scholars of tafsir treat this verse with unusual gravity. Al-Qurtubi links it to the prophetic hadith and notes that "the eye has never seen it" means it is not in the range of created things — which is theologically striking, because the rivers and fruits and garments of Jannah are also not in the range of created things as we know them. Yet those are apparently still within the category of things that can be described. What 32:17 withholds is past even that. Ibn Kathir simply quotes the hadith and then stops, as if to demonstrate the verse's own principle: there is nothing more to say.</p>

  <h2>Why the Descriptions Exist Alongside the Withholding</h2>

  <p>A surface reading might produce a contradiction: if no soul can know what has been hidden, why does the Quran describe Jannah at all? The answer lies in what the descriptions actually accomplish — and it is not what they seem to accomplish.</p>

  <p>The Quran's images of Jannah are not informational. They are motivational and relational. When <strong>Ar-Rahman</strong> asks, thirty-one times, "Which of your Lord's favours will you deny?" — the question is not an invitation to a catalogue. It is a prompt for gratitude. When the Quran describes the companions of paradise — <em>ḥūrun maknūnāt</em>, like pearls kept hidden — the image is functioning as a promise of purity, of encounter, of the end of solitude. The physical images are the Quran's way of addressing a creature that experiences the world through the senses, using the language of sense-experience to gesture toward something that transcends it.</p>

  <blockquote class="ayah-quote" data-ayah="75:22">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:75:22 -->وُجُوهٌ يَوْمَئِذٍ نَّاضِرَةٌ</p>
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:75:23 -->إِلَىٰ رَبِّهَا نَاظِرَةٌ</p>
    <p class="translation">Faces that Day will be radiant — looking at their Lord.</p>
    <cite>Al-Qiyamah (75:22–23)</cite>
  </blockquote>

  <p>This is the summit. <strong>75:22–23</strong> sits in a surah whose subject is the Day of Resurrection — and amid the upheaval it describes, these two verses are an island of stillness. <em>Nāḍira</em> — radiant, bright, flourishing — is the face; <em>nāẓira</em> — looking, beholding — is what the eyes are doing. The radiance comes from what the eyes are seeing. The scholars of tafsir hold, nearly unanimously, that this is the vision of Allah — the ruʾyat Allah — which the Prophet ﷺ confirmed in a hadith in Sahih Muslim by comparing it to the ease of seeing the full moon. And what does the vision of Allah feel like? No soul knows. The verse points at the summit and then, with <strong>32:17</strong>, announces: even the pointing falls short.</p>

  <h2>The Theology of Deliberate Concealment</h2>

  <p>The verb <em>ukhfiya</em> — passive form, "was concealed" — implies an agent. Allah hid this. It was an act, not an absence. The Quran, in deploying this verb, is communicating something about divine intent: the concealment of Jannah's deepest reality is itself a gift.</p>

  <p>Consider the alternative. If the full reality of Jannah were knowable from this world — if a human mind could accurately hold what it is — two things would follow. First, the longing it produced would be a longing for something fully mapped, and fully mapped things are things the imagination can exhaust. The mystery is not a deficiency in the description; it is the reason the description never grows stale. Second, and more theologically significant: if Jannah were fully conceivable, it would be a created thing of the ordinary order. What 32:17 implies, through its silence, is that Jannah's core reality is not of the ordinary order — it is beyond the categories that a creature trained in this world can apply.</p>

  <p>Ibn al-Qayyim, in <em>Hādī al-Arwāḥ</em>, writes that the greatest joy of Jannah is not its rivers or its companions but the vision of Allah's face — and then adds, almost as an aside, that this joy is so immense it makes everything else seem like the approach road rather than the destination. He is reading 32:17 through 9:72 — the verse that lists rivers, dwellings, gardens, and then pivots: <em>wa-riḍwānun min Allāhi akbar</em> — "and the approval of Allah is greater." Greater than all of that. The list is real; it is also not the point.</p>

  <blockquote class="ayah-quote" data-ayah="9:72">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:9:72 -->وَعَدَ ٱللَّهُ ٱلْمُؤْمِنِينَ وَٱلْمُؤْمِنَـٰتِ جَنَّـٰتٍ تَجْرِى مِن تَحْتِهَا ٱلْأَنْهَـٰرُ خَـٰلِدِينَ فِيهَا وَمَسَـٰكِنَ طَيِّبَةً فِى جَنَّـٰتِ عَدْنٍ ۚ وَرِضْوَٰنٌ مِّنَ ٱللَّهِ أَكْبَرُ ۚ ذَٰلِكَ هُوَ ٱلْفَوْزُ ٱلْعَظِيمُ</p>
    <p class="translation">Allah has promised the believing men and believing women gardens beneath which rivers flow — eternal therein — and pleasant dwellings in gardens of perpetual residence. But the approval of Allah is greatest. That is the supreme success.</p>
    <cite>At-Tawbah (9:72)</cite>
  </blockquote>

  <h2>What the Silence Accomplishes</h2>

  <p>Linguists who study absence as a rhetorical device — the space left where words could be but are not — distinguish between accidental gaps and structured voids. A structured void is a place where the withholding is itself the message. The Quran's use of <em>mā ukhfiya</em> — "what has been hidden" — transforms the absence into presence. The unknown is named. The unknowable is pointed at. And in the pointing, a specific emotional and theological effect is produced: the reader's imagination is activated and then overrun.</p>

  <p>This matters for how one reads the Quranic descriptions of Jannah. They are not to be read as architectural plans. The person who reads about Jannah's rivers and thinks: I have fully grasped what is being promised — has made a category error. The rivers are real, in a way rivers here are only approximations of — but the promise of Jannah exceeds even those rivers. The scholar Al-Nawawi, commenting on Sahih Muslim, puts it simply: "Whatever the believer conceives of Jannah, the reality is beyond that — because the hadith qudsi excludes the imagination from access to it."</p>

  <p>The productive silence of 32:17, then, works like the edge of a map. Ancient cartographers who reached the limits of the known world wrote: <em>hic sunt dracones</em> — here be dragons. The phrase was not ignorance; it was an acknowledgment that the map had reached its own boundary. The Quran does something more sophisticated: it draws the map carefully for 146 other references, names every feature, places the rivers and the orchards and the thrones and the companions — and then adds, at the edge: <em>lā taʿlamu nafsun</em>. No soul knows. Not because no map exists, but because the territory past this point is of a kind that maps cannot enter.</p>

  <h2>The Reward for Private Acts</h2>

  <p>The grammatical structure of 32:17 includes a phrase that most readers pass over: <em>jazāʾan bimā kānū yaʿmalūn</em> — "as a reward for what they used to do." The "used to do" is past tense, establishing continuity. But the scholars read something more specific into this phrase when placed next to what precedes it in the surah's context.</p>

  <p>The verse that immediately precedes 32:17 describes a specific category of people:</p>

  <blockquote class="ayah-quote" data-ayah="32:16">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:32:16 -->تَتَجَافَىٰ جُنُوبُهُمْ عَنِ ٱلْمَضَاجِعِ يَدْعُونَ رَبَّهُمْ خَوْفًا وَطَمَعًا وَمِمَّا رَزَقْنَـٰهُمْ يُنفِقُونَ</p>
    <p class="translation">Their sides withdraw from their beds, calling upon their Lord in fear and in hope, and from what We have provided them they spend.</p>
    <cite>As-Sajdah (32:16)</cite>
  </blockquote>

  <p>These are the people of the night prayer — the ones whose beds cannot hold them, who rise in the dark to call upon a Lord whose response is unseen. The scholars note the connection: the reward hidden in 32:17 is the reward for the act that is itself hidden. The night prayer is private by nature. It has no audience. Its sincerity is established precisely because there is no social incentive for it — only the real relationship with Allah. And the reward for that private sincerity is hidden by the same logic: it belongs to the same register of reality. What is done in secret is rewarded in a way that cannot be described in public currency.</p>

  <p>Ibn Rajab al-Hanbali draws this connection explicitly: Allah hid this reward just as He hid its cause. The ones whose sides withdrew from their beds — whose best deeds were known only between them and Allah — receive a reward that matches the hiddenness of their offering. The most private act receives the most transcendent reward. The economy is consistent.</p>

  <h2>Living With the Unknown</h2>

  <p>There is a practical question embedded in 32:17 for anyone who takes it seriously: how do you long for what you cannot conceive? The scholars of the heart answer this by redirecting. The object of longing, in its deepest form, is not the rivers or the garments but the approval — the <em>riḍwān</em>. And the approval of Allah is not in the category of the unknowable; it is experienced, in diminished form, in this world as the peace that accompanies sincere obedience, the lightness that follows honest repentance, the quiet that settles in the nafs when it is aligned with what Allah has commanded.</p>

  <p>The Quran does not withhold knowledge of Jannah's deepest reality in order to frustrate. It withholds it because a creature of this world, with a <a href="/hub/nafs">nafs</a> conditioned by appetite and limitation, cannot safely carry a full knowledge of what is coming — not safely, because the gap between this world and that one is so vast that a full knowledge of the destination would make the road unlivable. The descriptions that exist are the precise amount needed: enough to orient, enough to motivate, enough to make the longing real. And then the silence — to keep the longing inexhaustible.</p>

  <p>The most repeated phrase in the Quran's descriptions of Jannah is <em>tajrī min taḥtihā al-anhār</em> — beneath which rivers flow. Across dozens of surahs, in dozens of contexts, the rivers return. The scholars have noted this repetition and asked what it is doing. The answer that emerges is this: the rivers are not the point. They are the recurring reminder that Jannah exists — that the promise is real and the descriptions are real — while 32:17 is the recurring reminder that the descriptions are not the destination. Hold the rivers, and hold the silence. Both are part of what the Quran intends.</p>
</article>`,
    status: 'published',
    tags: ['jannah', 'al-ghayb', 'the-unseen', 'quranic-language', 'eschatology'],
    reading_time_minutes: 9,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  }
]

async function main() {
  for (const article of articles) {
    const { data: post, error } = await supabase
      .from('posts')
      .insert({ ...article, created_by: ADMIN_USER_ID })
      .select('id, slug')
      .single()

    if (error) { console.error('Insert error:', error); continue }
    console.log('Inserted:', post.slug)

    const entityTags = [
      { slug: 'jannah', is_primary: true },
      { slug: 'al-ghayb', is_primary: false },
      { slug: 'nafs', is_primary: false },
    ]

    for (const tag of entityTags) {
      const { data: entity } = await supabase
        .from('entities').select('id').eq('slug', tag.slug).single()
      if (!entity) { console.warn('Entity not found:', tag.slug); continue }
      await supabase.from('entity_tags').insert({
        post_id: post.id, entity_id: entity.id, is_primary: tag.is_primary
      })
    }
    console.log('Tagged entities for:', post.slug)
  }

  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('Done. Co-occurrence refreshed.')
}

main().catch(console.error)
