#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const HARUN_ENTITY_ID = '4319881e-8d55-4afe-8d2c-bf583e5dc8b2'
const MUSA_ENTITY_ID = 'a3221ae5-2aea-497d-bdca-c26ef513ccfa'

const articles = [
  {
    title: "The Brother Who Was Asked For: Harun as Musa's Prayer",
    slug: "the-brother-who-was-asked-for-harun-as-musas-prayer",
    type: 'article' as const,
    excerpt: "Musa did not simply have a brother. He asked for one — prayed to Allah for Harun to be his partner in prophecy. The Quran records the request, and the request reveals what Musa knew he lacked.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['harun', 'musa', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">At the burning bush, Musa receives his commission to confront Fir'awn. His response — as recorded across Surah Taha, Surah Ash-Shu'ara, and Surah Al-Qasas — includes fear, self-doubt, and an inventory of his limitations. And then he makes a request that no other prophet in the Quran makes: he asks for a partner.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَاجْعَل لِّي وَزِيرًا مِّنْ أَهْلِي ۝ هَارُونَ أَخِي ۝ اشْدُدْ بِهِ أَزْرِي ۝ وَأَشْرِكْهُ فِي أَمْرِي</p>
    <p class="translation">"And appoint for me a minister from my family — Harun, my brother. Strengthen through him my back, and let him share my task."</p>
    <cite>Surah Taha (20:29-32)</cite>
  </blockquote>

  <p>Four requests in four ayahs. <strong>Waj'al li waziran min ahli</strong> — "make for me a minister from my family." The word <strong>wazir</strong> — from <strong>w-z-r</strong>, to bear a burden, to carry weight — means one who bears the load alongside you. A <strong>wazir</strong> is not a subordinate. He is a co-carrier. The weight is shared. Musa asks for a load-bearer, and he specifies the source: <strong>min ahli</strong>, from my family. Not a stranger. Not a hired hand. Family.</p>

  <p>He names the person: <strong>Haruna akhi</strong> — "Harun, my brother." Then the reason: <strong>ushdud bihi azri</strong> — "strengthen through him my back." <strong>Azr</strong> — the back, the lower spine, the structural support of the body. The word carries a physical image: a man whose back needs reinforcement, whose spine alone is insufficient for the weight placed on it. Musa does not ask for Harun as an accessory. He asks for him as a structural necessity.</p>

  <p>The fourth: <strong>wa ashrikhu fi amri</strong> — "and let him share my task." <strong>Ashrik</strong> — from <strong>sh-r-k</strong>, to share, to partner, to participate. The same root that gives us <strong>shirk</strong> (associating partners with Allah) here describes the partnership Musa seeks with Harun. The word's range is vast — from the highest theological error to the most practical human collaboration — and the Quran uses it without hesitation for a prophetic request. Partnership in the prophetic task is not <strong>shirk</strong>. It is <strong>ishrak</strong> — inclusion, sharing, distributing the weight.</p>

  <h2>What Musa Knew</h2>

  <p>The request reveals Musa's self-knowledge. He has already confessed his speech impediment — <strong>la yantaliq lisani</strong>, my tongue does not flow. He knows he is going to face Fir'awn, the most rhetorically skilled tyrant in the Quran. He knows the confrontation will require sustained, articulate, persuasive speech under intense pressure. And he knows he is not the person best suited for that specific demand.</p>

  <p>In Surah Al-Qasas, the request is even more explicit about what Harun provides:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَخِي هَارُونُ هُوَ أَفْصَحُ مِنِّي لِسَانًا فَأَرْسِلْهُ مَعِيَ رِدْءًا يُصَدِّقُنِي</p>
    <p class="translation">"And my brother Harun — he is more eloquent than me in speech. So send him with me as support, confirming me."</p>
    <cite>Surah Al-Qasas (28:34)</cite>
  </blockquote>

  <p><strong>Huwa afsahu minni lisanan</strong> — "he is more fluent than me in tongue." <strong>Afsah</strong> — the comparative of <strong>fasih</strong>, meaning eloquent, clear, articulate. Musa states plainly: my brother speaks better than I do. The prophet of Allah, the one chosen for the mission, acknowledges that his brother has a capacity he lacks. The admission is not weakness. It is precision — the accurate assessment of a task's requirements matched against the team's capabilities.</p>

  <p><strong>Rid'an yusaddiquni</strong> — "as support, confirming me." <strong>Rid'</strong> — from <strong>r-d-'</strong> — means support, backing, one who stands behind and confirms. <strong>Yusaddiquni</strong> — he will confirm me, he will verify me, he will make my truth apparent. Harun's role is not to replace Musa but to amplify him — to take what Musa cannot fully articulate and give it the clarity it deserves.</p>

  <h2>The Response</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ سَنَشُدُّ عَضُدَكَ بِأَخِيكَ وَنَجْعَلُ لَكُمَا سُلْطَانًا</p>
    <p class="translation">"He said: 'We will strengthen your arm through your brother and grant you both authority.'"</p>
    <cite>Surah Al-Qasas (28:35)</cite>
  </blockquote>

  <p><strong>Sanashuddu 'adudaka bi-akhika</strong> — "We will strengthen your upper arm through your brother." The word <strong>'adud</strong> — the upper arm — is the part of the arm closest to the body, the source of striking power. Allah uses a bodily metaphor: Harun will be the strength of Musa's arm. And then: <strong>wa naj'alu lakuma sultanan</strong> — "We will grant you both authority." The dual <strong>lakuma</strong> — for you two — distributes the <strong>sultan</strong> (authority, proof, evidence) between both brothers. Neither alone. Both together.</p>

  <p>The Quran's model of prophetic leadership here is not solo heroism. It is partnership — acknowledged need, requested reinforcement, shared authority. Musa carries the revelation. Harun carries the eloquence. Together they form a complete messenger: the one who received the message and the one who can deliver it with clarity. The revelation does not require a perfect vessel. It requires a complete team.</p>

  <h2>The Confrontation Together</h2>

  <p>When Musa and Harun stand before Fir'awn, they speak in the first person plural: <strong>inna rasulu rabbi al-'alamin</strong> — "we are the messengers of the Lord of the worlds" (26:16). The dual form persists throughout the confrontation. They demand together. They present signs together. They face the magicians together. The partnership Musa prayed for at the bush operates throughout the mission as a functional unit.</p>

  <p>Harun's presence transforms the dynamic. Fir'awn cannot reduce the prophetic challenge to one man's personal claim. There are two of them. Two witnesses. Two bearers of the message. The legal principle — two witnesses establish testimony — is enacted in the prophetic structure itself. Harun is the second witness, the confirming voice, the brother whose eloquence completes what Musa's stammering begins.</p>

  <p>The prayer at the burning bush — <strong>waj'al li waziran min ahli</strong> — produced one of the Quran's most enduring models of leadership: the prophet who knows what he lacks, asks for what he needs, and receives a partner who makes the mission whole. Harun exists in the Quran because Musa asked for him. The partnership exists because the need was acknowledged. The mission succeeded because the load was shared.</p>
</article>`
  },
  {
    title: "Harun and the Golden Calf: The Man Who Held the Line Alone",
    slug: "harun-and-the-golden-calf-the-man-who-held-the-line-alone",
    type: 'article' as const,
    excerpt: "When Musa climbs Sinai for forty days, Harun is left to lead a people who build a golden calf in his absence. The Quran records his anguished explanation — and Musa's fury when he returns.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['harun', 'musa', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Musa ascends Mount Sinai for forty nights to receive the Tablets. He leaves Harun in charge of Bani Israel. In his absence, a man named as-Samiri crafts a golden calf from the people's jewelry, and a portion of the community worships it. When Musa returns, he finds his brother, his appointed deputy, standing amid a community that has shattered the most fundamental principle of the message they were given.</p>

  <h2>The Scene Musa Returns To</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَمَّا رَجَعَ مُوسَىٰ إِلَىٰ قَوْمِهِ غَضْبَانَ أَسِفًا قَالَ بِئْسَمَا خَلَفْتُمُونِي مِن بَعْدِي</p>
    <p class="translation">"And when Musa returned to his people, angry and grieved, he said: 'How wretched is what you have done in my place after me.'"</p>
    <cite>Surah Al-A'raf (7:150)</cite>
  </blockquote>

  <p>Two emotions: <strong>ghadban</strong> — angry — and <strong>asifan</strong> — grieved, distressed, heartsick. The anger and the grief coexist. He is furious at the betrayal and devastated by the failure. The two feelings occupy the same prophet at the same moment. The Quran does not choose one. Both are real.</p>

  <p>Musa's fury turns first to the Tablets — he throws them down. Then it turns to Harun:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَخَذَ بِرَأْسِ أَخِيهِ يَجُرُّهُ إِلَيْهِ ۚ قَالَ ابْنَ أُمَّ إِنَّ الْقَوْمَ اسْتَضْعَفُونِي وَكَادُوا يَقْتُلُونَنِي</p>
    <p class="translation">"And he seized his brother by the head, pulling him toward him. [Harun] said: 'O son of my mother, indeed the people overpowered me and were about to kill me.'"</p>
    <cite>Surah Al-A'raf (7:150)</cite>
  </blockquote>

  <p>The image is physical, immediate, familial. <strong>Akhadha bi-ra'si akhihi yajurruhu ilayhi</strong> — he grabbed his brother's head and pulled him toward himself. The verb <strong>yajurru</strong> means to drag, to pull. Musa drags Harun by the head — the elder brother's fury manifesting as physical confrontation with the one he trusted to hold things together.</p>

  <p>Harun's response: <strong>ibna umma</strong> — "O son of my mother." Not "my brother" or "Musa" — but "son of my mother." The address appeals to the most intimate bond: shared motherhood. It is a cry from within the family, invoking the one relationship that preceded both prophecy and politics — the fact that they came from the same womb.</p>

  <p>Then the explanation: <strong>inna al-qawma istada'afuni wa kadu yaqtulunani</strong> — "the people overpowered me and were about to kill me." <strong>Istada'afuni</strong> — from <strong>d-'-f</strong>, weakness — in the <strong>istaf'ala</strong> form means "they treated me as weak, they overpowered me, they considered me too weak to stop them." Harun was not complicit. He was overwhelmed. The community turned on him — the deputy, the co-prophet — and nearly killed him for opposing the calf.</p>

  <h2>Harun's Account in Surah Taha</h2>

  <p>In Surah Taha, Harun's explanation is more detailed and reveals his strategic reasoning:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ يَا ابْنَ أُمَّ لَا تَأْخُذْ بِلِحْيَتِي وَلَا بِرَأْسِي ۖ إِنِّي خَشِيتُ أَن تَقُولَ فَرَّقْتَ بَيْنَ بَنِي إِسْرَائِيلَ وَلَمْ تَرْقُبْ قَوْلِي</p>
    <p class="translation">"He said: 'O son of my mother, do not seize me by my beard or by my head. Indeed, I feared that you would say: You divided the Children of Israel and did not observe my word.'"</p>
    <cite>Surah Taha (20:94)</cite>
  </blockquote>

  <p><strong>La ta'khudh bi-lihyati wa la bi-ra'si</strong> — "do not seize me by my beard or my head." Harun protects himself while defending his decision. And then the reasoning: <strong>inni khashitu an taqula farraqta bayna Bani Isra'il</strong> — "I feared you would say: you divided the Children of Israel." The verb <strong>farraqta</strong> — from <strong>f-r-q</strong>, to divide, to separate — reveals Harun's dilemma.</p>

  <p>Harun faced a choice between two failures. If he forcibly opposed the calf and the majority that supported it, he would split the community — <strong>farraqta bayna Bani Isra'il</strong>. The faction that opposed the calf would separate from the faction that supported it. Civil war. Bloodshed. A divided people in the desert, leaderless and fractured. If he held his position, waited for Musa, and maintained unity at the cost of tolerating the calf temporarily, he preserved the community intact — at the cost of being present while idolatry occurred.</p>

  <p>He chose unity. He held the line by not breaking the community apart. He warned them — <strong>wa laqad qala lahum Harunu min qablu ya qawmi innama futintum bihi</strong>, "Harun had said to them: 'O my people, you are only being tested by it'" (20:90) — and they did not listen. He told them the calf was a trial. They worshipped it anyway. He opposed it verbally and they threatened to kill him. He preserved himself and the coherence of the community for Musa's return, calculating that the authoritative leader — Musa, with the Tablets, with the full weight of the divine encounter — would be able to do what the deputy could not.</p>

  <h2>The Dilemma of the Deputy</h2>

  <p>Harun's predicament is the predicament of every deputy, every interim leader, every person left in charge when the primary authority is absent. The resources available to the deputy are always less than those available to the principal. Harun had authority but not the authority of direct divine encounter. He had eloquence but not the Tablets. He had the title of co-prophet but not the transformative presence of the man who had just spoken with Allah on the mountain.</p>

  <p>The Quran does not condemn Harun. Musa's anger is recorded — it is human, familial, understandable. But the Quran also records Harun's explanation without rebuttal. The narrative does not say Harun was wrong. It says he was in an impossible situation and made the judgment call that preserved the community at the cost of his dignity and his standing with his brother.</p>

  <p>The aftermath shows Musa's anger cooling into understanding. He prays for both of them:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ رَبِّ اغْفِرْ لِي وَلِأَخِي وَأَدْخِلْنَا فِي رَحْمَتِكَ</p>
    <p class="translation">"He said: 'My Lord, forgive me and my brother, and admit us into Your mercy.'"</p>
    <cite>Surah Al-A'raf (7:151)</cite>
  </blockquote>

  <p>The prayer includes both: <strong>ighfir li wa li-akhi</strong> — "forgive me and my brother." The partnership is restored. The fury has passed. The du'a reunites what the anger briefly separated. Musa asks for forgiveness for himself — for throwing the Tablets, for seizing his brother — and for Harun. <strong>Wa adkhilna fi rahmatika</strong> — "and admit us into Your mercy." The dual <strong>-na</strong> — us — encompasses both brothers. The mission continues. The wazir is back at the prophet's side. The golden calf is dealt with, as-Samiri is exiled, and the community — fractured but intact — resumes its journey.</p>
</article>`
  },
  {
    title: "Harun in the Quran's Genealogy of Praise",
    slug: "harun-in-the-qurans-genealogy-of-praise",
    type: 'article' as const,
    excerpt: "The Quran mentions Harun twenty times and groups him among the honored prophets in every genealogical list. He is never mentioned alone — always in relation to someone else. The relational identity is itself the portrait.",
    reading_time_minutes: 9,
    status: 'published' as const,
    tags: ['harun', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Harun appears twenty times in the Quran. In every single instance, he is mentioned in connection with someone else — usually Musa, but also in the genealogical catalogs that list prophets in sequence. He is never the sole subject of a passage. He is always relational: Musa's brother, Musa's partner, the companion named alongside other honored names. This relational identity is sometimes mistaken for diminishment. The Quran treats it as a distinction.</p>

  <h2>The Lists</h2>

  <p>When the Quran recounts the prophets it has honored, Harun appears in every major genealogy:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَتِلْكَ حُجَّتُنَا آتَيْنَاهَا إِبْرَاهِيمَ عَلَىٰ قَوْمِهِ ۚ نَرْفَعُ دَرَجَاتٍ مَّن نَّشَاءُ ۗ إِنَّ رَبَّكَ حَكِيمٌ عَلِيمٌ ۝ وَوَهَبْنَا لَهُ إِسْحَاقَ وَيَعْقُوبَ ۚ كُلًّا هَدَيْنَا ۚ وَنُوحًا هَدَيْنَا مِن قَبْلُ ۖ وَمِن ذُرِّيَّتِهِ دَاوُودَ وَسُلَيْمَانَ وَأَيُّوبَ وَيُوسُفَ وَمُوسَىٰ وَهَارُونَ</p>
    <p class="translation">"...and We granted him Ishaq and Ya'qub. Each We guided. And Nuh We guided before. And from his descendants, Dawud and Sulayman and Ayyub and Yusuf and Musa and Harun."</p>
    <cite>Surah Al-An'am (6:83-84)</cite>
  </blockquote>

  <p>The list is a genealogy of divine favor. Dawud, Sulayman, Ayyub, Yusuf, Musa, Harun — each name is a chapter of prophetic history. Harun appears at the end of the sequence, paired with Musa as naturally as Dawud is paired with Sulayman. The pairing is not subordination. It is structural: these prophets came in pairs, and the pairing is how the Quran remembers them.</p>

  <p>In Surah Maryam, after narrating the stories of Zakariyya, Yahya, Maryam, 'Isa, and Ibrahim, the Quran lists the prophets who were honored:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَاذْكُرْ فِي الْكِتَابِ مُوسَىٰ ۚ إِنَّهُ كَانَ مُخْلَصًا وَكَانَ رَسُولًا نَّبِيًّا ۝ وَنَادَيْنَاهُ مِن جَانِبِ الطُّورِ الْأَيْمَنِ وَقَرَّبْنَاهُ نَجِيًّا ۝ وَوَهَبْنَا لَهُ مِن رَّحْمَتِنَا أَخَاهُ هَارُونَ نَبِيًّا</p>
    <p class="translation">"And mention in the Book, Musa. Indeed, he was chosen, and he was a messenger and a prophet. And We called him from the right side of the mount, and brought him near in conversation. And We granted him, from Our mercy, his brother Harun as a prophet."</p>
    <cite>Surah Maryam (19:51-53)</cite>
  </blockquote>

  <p><strong>Wa wahabna lahu min rahmatina akhahu Haruna nabiyyan</strong> — "And We granted him, from Our mercy, his brother Harun as a prophet." Harun is described as a gift — <strong>wahabna</strong>, We granted, We gave — from divine mercy. He is a <strong>hibah</strong>, a gift, bestowed upon Musa. And the gift is specified: <strong>nabiyyan</strong>, as a prophet. Harun is not merely a brother who helps. He is a brother who is himself a prophet — granted prophethood as part of the gift to Musa.</p>

  <p>The word <strong>rahmatina</strong> — "Our mercy" — locates Harun's prophethood within the scope of divine mercy directed at Musa. Allah's mercy to Musa included giving him a prophet as a brother. The mercy is double: Musa receives support, and Harun receives prophethood. One divine act, two recipients, both blessed.</p>

  <h2>The Relational Model</h2>

  <p>Harun's relational existence in the Quran models something that the prophetic tradition does not often celebrate: the person whose greatness is expressed through partnership rather than through solo achievement. Ibrahim stands alone against the idols. Musa stands (with Harun) against Fir'awn. Nuh stands alone against his community for 950 years. The prophetic archetype is the lone voice against the crowd.</p>

  <p>Harun is the other archetype: the partner, the supporter, the one whose excellence is measured by how well the partnership functions. His eloquence serves Musa's message. His presence strengthens Musa's arm. His prophethood is a gift given to Musa through him. He is never diminished by this — the Quran calls him <strong>nabiyy</strong>, prophet, in his own right — but his narrative identity is partnership. He is great precisely in the way he makes the mission work alongside another.</p>

  <p>When Maryam is addressed as <strong>ya ukhta Harun</strong> — "O sister of Harun" (19:28) — the name Harun is invoked as a byword for priestly righteousness. Whether the reference is to the biblical Aaron or to an ancestor named Harun within Maryam's family, the name itself carries moral weight. To call someone "sister of Harun" is to invoke a standard of piety associated with the name. Harun's reputation — carried across generations — became a measure against which others were assessed.</p>

  <p>The Quran's Harun teaches that partnership is not a lesser form of leadership. The <strong>wazir</strong> — the minister, the co-carrier, the one who bears the load alongside — holds a position that the Quran dignifies with the vocabulary of prophethood, mercy, and divine gift. The brother who was asked for became the brother who was indispensable. The prayer Musa made at the bush — <strong>waj'al li waziran min ahli</strong> — was answered so completely that Harun's name became inseparable from Musa's in every genealogy the Quran preserves.</p>
</article>`
  }
]

async function main() {
  console.log("Inserting Harun articles...")
  for (const article of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: HARUN_ENTITY_ID, is_primary: true })
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: MUSA_ENTITY_ID, is_primary: false })
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log("✓ Done!", articles.length, "Harun articles.")
}
main().catch(console.error)
