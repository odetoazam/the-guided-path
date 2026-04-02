#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ISMAIL_ENTITY_ID = '77de72a0-f89b-4bdc-ac47-7b179a84e846'
const IBRAHIM_ENTITY_ID = 'dc5cd1d2-00d3-482d-bdcd-2d20344e7838'

const articles = [
  {
    title: "The Son Who Said: Do What You Are Commanded",
    slug: "the-son-who-said-do-what-you-are-commanded",
    type: 'article' as const,
    excerpt: "Ibrahim tells his son about the dream. The son's response — 'do what you are commanded; you will find me, if Allah wills, among the patient' — is the Quran's portrait of consent under the most extreme test.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['ismail', 'ibrahim', 'quranic-characters', 'sacrifice'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The sacrifice narrative in Surah As-Saffat is one of the most compressed scenes in the Quran. A father and a son. A dream. A conversation. A decision. The entire sequence — from revelation to resolution — occupies a handful of ayahs, and every word is load-bearing.</p>

  <h2>The Dream</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا بَلَغَ مَعَهُ السَّعْيَ قَالَ يَا بُنَيَّ إِنِّي أَرَىٰ فِي الْمَنَامِ أَنِّي أَذْبَحُكَ فَانظُرْ مَاذَا تَرَىٰ</p>
    <p class="translation">"And when he reached with him the age of striving, he said: 'O my son, I have seen in a dream that I am sacrificing you, so look — what do you think?'"</p>
    <cite>Surah As-Saffat (37:102)</cite>
  </blockquote>

  <p>The temporal marker is precise: <strong>falamma balagha ma'ahu as-sa'ya</strong> — "when he reached with him the age of striving." <strong>Sa'y</strong> — effort, walking, working — from the root <strong>s-'-y</strong>, the same root that names the walking between Safa and Marwa in Hajj. The son has reached the age where he can walk with his father, work alongside him, be a companion in labor. The test arrives at the moment of maximum shared purpose — when father and son are finally walking together.</p>

  <p>Ibrahim does not act unilaterally. He does not take his son to the mountain in secret. He says: <strong>inni ara fil-manami anni adhbahuka</strong> — "I see in a dream that I am sacrificing you." The verb <strong>ara</strong> — I see — is in the present tense, suggesting the dream recurs. And then the extraordinary question: <strong>fandhur madha tara</strong> — "so look, what do you see?" Ibrahim asks his son for his perspective. He consults the one whose life is at stake.</p>

  <p>This consultation is theologically significant. Ibrahim could have acted on the dream alone — prophetic dreams are revelation. Instead, he includes his son in the process. The sacrifice is not something imposed on the son. It is something presented to him, discussed with him, and ultimately consented to by him. The test is for both of them.</p>

  <h2>The Response</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ يَا أَبَتِ افْعَلْ مَا تُؤْمَرُ ۖ سَتَجِدُنِي إِن شَاءَ اللَّهُ مِنَ الصَّابِرِينَ</p>
    <p class="translation">"He said: 'O my father, do what you are commanded. You will find me, if Allah wills, among the patient.'"</p>
    <cite>Surah As-Saffat (37:102)</cite>
  </blockquote>

  <p><strong>Ya abati</strong> — "O my father." The address uses the vocative with the possessive — <strong>abati</strong>, not <strong>abi</strong> — carrying a tenderness, an intimacy, a specific emotional register. This is a son speaking to a beloved father about his own death. The word <strong>abati</strong> holds all of that weight.</p>

  <p><strong>If'al ma tu'mar</strong> — "do what you are commanded." The verb is <strong>if'al</strong> — do, act, carry out. The object is <strong>ma tu'mar</strong> — what you are commanded. The son does not say "do what you dream" or "do what you wish." He says "do what you are commanded" — which means he has already processed the dream as a divine command rather than a paternal impulse. He reads the dream through Ibrahim's prophetic status and responds to the revelation behind it, not to the father's desire.</p>

  <p>The second half: <strong>satajiduni in sha'a Allahu min as-sabirin</strong> — "you will find me, if Allah wills, among the patient." The qualification <strong>in sha'a Allah</strong> is doing essential work. The son does not guarantee his own patience. He does not say "I will be patient" as a certainty. He says "you will find me patient, if Allah wills." He places his capacity for patience within the scope of divine will. The very quality he promises — <strong>sabr</strong>, patience, steadfastness — he acknowledges comes from a source beyond himself. He is consenting and simultaneously admitting that his ability to consent depends on assistance.</p>

  <h2>The Submission</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا أَسْلَمَا وَتَلَّهُ لِلْجَبِينِ</p>
    <p class="translation">"And when they had both submitted and he put him down upon his forehead—"</p>
    <cite>Surah As-Saffat (37:103)</cite>
  </blockquote>

  <p><strong>Falamma aslama</strong> — "when they both submitted." The verb is <strong>aslama</strong> — the root of <strong>Islam</strong> — and it is in the dual: <strong>aslama</strong> (they two submitted). Both father and son. The submission is shared, mutual, simultaneous. Ibrahim submits to the command to sacrifice. The son submits to being sacrificed. The verb is the same. The cost is different. The test — <strong>al-bala'u al-mubin</strong>, the clear trial, as the Quran calls it — belongs to both.</p>

  <p><strong>Wa tallahu lil-jabin</strong> — "and he put him down upon his forehead." The verb <strong>talla</strong> means to lay down, to place face-down. <strong>Jabin</strong> is the forehead, the side of the face. The son is laid face-down — he cannot see the blade. The father cannot see the son's face. The arrangement is physically precise: the blade approaches from behind, the forehead touches the ground, and neither participant sees the other's expression at the final moment. The intimacy is maintained through blindness. Each faces the act alone, together.</p>

  <h2>The Ransom</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَنَادَيْنَاهُ أَن يَا إِبْرَاهِيمُ ۝ قَدْ صَدَّقْتَ الرُّؤْيَا ۚ إِنَّا كَذَٰلِكَ نَجْزِي الْمُحْسِنِينَ ۝ إِنَّ هَـٰذَا لَهُوَ الْبَلَاءُ الْمُبِينُ ۝ وَفَدَيْنَاهُ بِذِبْحٍ عَظِيمٍ</p>
    <p class="translation">"And We called to him: 'O Ibrahim, you have fulfilled the vision.' Indeed, We thus reward the doers of good. Indeed, this was the clear trial. And We ransomed him with a great sacrifice."</p>
    <cite>Surah As-Saffat (37:104-107)</cite>
  </blockquote>

  <p><strong>Qad saddaqta ar-ru'ya</strong> — "you have fulfilled the vision." The verb <strong>saddaqa</strong> — to prove true, to validate, to treat as real. Ibrahim treated the dream as real and acted on it. The test was not whether the sacrifice would happen. The test was whether the willingness was genuine. <strong>Saddaqta</strong> — you proved the dream true through your willingness. The action was the verification.</p>

  <p><strong>Wa fadaynahu bi-dhib'hin 'adhim</strong> — "and We ransomed him with a great sacrifice." The verb <strong>fadaynahu</strong> — from <strong>f-d-y</strong>, to ransom, to redeem — means a substitution. Something is given in place of something else. The <strong>dhibh</strong> — the sacrificial animal — replaces the son. The word <strong>'adhim</strong> — great, magnificent — describes the ransom. The ram (as tradition identifies it) is <strong>'adhim</strong> not because of its physical size but because of what it replaces: the son of a prophet, laid upon his forehead, at the threshold of the blade.</p>

  <p>The son rises. The ram is sacrificed. And the act — the willingness, the consent, the dual submission — becomes the foundation of an annual ritual that outlasts both participants. Every Eid al-Adha, the scene replays: an animal is sacrificed, the willingness is remembered, and the ransom is re-enacted. The son who said <strong>if'al ma tu'mar</strong> — "do what you are commanded" — established the vocabulary of surrender that millions of people enter each year with a blade and a prayer.</p>
</article>`
  },
  {
    title: "Isma'il and the Building of the Ka'bah: Architecture as Worship",
    slug: "ismail-and-the-building-of-the-kabah-architecture-as-worship",
    type: 'article' as const,
    excerpt: "Father and son raise the foundations of the Ka'bah together. The Quran records their du'a as they build — each course of stone accompanied by a prayer. The construction is a liturgy.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['ismail', 'ibrahim', 'quranic-characters', 'kabah'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">After the sacrifice — after the son was laid upon his forehead and then ransomed — the Quran presents Ibrahim and Isma'il together in a different scene entirely. They are building. The structure they raise is the Ka'bah. And the Quran records not just the construction but the prayer that accompanies it, as though the du'a and the masonry are inseparable acts.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِذْ يَرْفَعُ إِبْرَاهِيمُ الْقَوَاعِدَ مِنَ الْبَيْتِ وَإِسْمَاعِيلُ رَبَّنَا تَقَبَّلْ مِنَّا ۖ إِنَّكَ أَنتَ السَّمِيعُ الْعَلِيمُ</p>
    <p class="translation">"And when Ibrahim was raising the foundations of the House, and Isma'il, [saying]: 'Our Lord, accept from us. Indeed, You are the All-Hearing, the All-Knowing.'"</p>
    <cite>Surah Al-Baqarah (2:127)</cite>
  </blockquote>

  <p>The verb <strong>yarfa'u</strong> — "he was raising" — is in the imperfect tense, marking ongoing action. The construction is in progress. The camera catches them mid-build — stones going up, foundations rising. And embedded in the construction, without a sentence break, comes the du'a: <strong>rabbana taqabbal minna</strong> — "our Lord, accept from us."</p>

  <p>The seamlessness is the point. The Quran does not say "they built the Ka'bah, and then they prayed." It says "they were raising the foundations... 'Our Lord, accept from us.'" The prayer and the building occupy the same sentence because they are the same act. Each stone is a prayer. Each course of masonry is an offering. The architecture is worship materialized — <strong>taqabbal minna</strong> rising with every block.</p>

  <p>The names they invoke — <strong>as-Sami' al-'Alim</strong>, the All-Hearing, the All-Knowing — match the mode of the prayer. They are building in a desert. No congregation watches. No audience evaluates. The hearing they need is divine hearing. The knowledge they seek is divine knowledge — that this effort, performed by two men in an empty valley, is known and accepted.</p>

  <h2>The Du'a Expands</h2>

  <p>The prayer continues beyond the construction into a vision of future generations:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">رَبَّنَا وَاجْعَلْنَا مُسْلِمَيْنِ لَكَ وَمِن ذُرِّيَّتِنَا أُمَّةً مُّسْلِمَةً لَّكَ وَأَرِنَا مَنَاسِكَنَا وَتُبْ عَلَيْنَا ۖ إِنَّكَ أَنتَ التَّوَّابُ الرَّحِيمُ</p>
    <p class="translation">"Our Lord, and make us Muslims [submitting] to You, and from our descendants a Muslim nation [submitting] to You. And show us our rites and turn to us in forgiveness. Indeed, You are the Oft-Returning, the Merciful."</p>
    <cite>Surah Al-Baqarah (2:128)</cite>
  </blockquote>

  <p><strong>Waj'alna muslimayni laka</strong> — "make us two submitters to You." The dual form — <strong>muslimayni</strong> — is father and son, standing together, asking to be made what they are already performing. They are building the house of worship, and while building it, they ask to be made worshippers. The request reveals an awareness that the act of building does not guarantee the inner state that the building is designed to house. You can raise a mosque and still need to pray for submission.</p>

  <p><strong>Wa min dhurriyyatina ummatan muslimatan laka</strong> — "and from our offspring a nation submitting to You." The building they construct is for the future. The du'a they make is for the future. The <strong>ummah</strong> they pray for is still coming. Father and son, in an empty valley, constructing a building that will become the axis of a civilization that does not yet exist, praying for the people who will circle it. The prayer is an act of imagination so vast that only faith could sustain it — two builders in a desert praying for a nation.</p>

  <p><strong>Wa arina manasikana</strong> — "and show us our rites." <strong>Manasik</strong> — rituals, rites of worship — from <strong>n-s-k</strong>, to worship through specific prescribed acts. They ask to be shown how to worship at the very structure they are building. They build the container before they know the content. The architecture precedes the liturgy. The house goes up before the rituals are revealed. The willingness to build without knowing how the building will be used is its own form of trust.</p>

  <h2>Isma'il's Role</h2>

  <p>The Quran mentions Isma'il alongside Ibrahim without distinguishing their labor. The verb <strong>yarfa'u</strong> — "was raising" — has Ibrahim as its primary subject, but <strong>wa Isma'il</strong> joins immediately: "and Isma'il." They build together. The du'a uses the first person plural: <strong>rabbana</strong>, "our Lord." <strong>Taqabbal minna</strong>, "accept from us." <strong>Ij'alna</strong>, "make us." The prayer is shared.</p>

  <p>Isma'il, elsewhere in the Quran, receives a specific commendation:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَاذْكُرْ فِي الْكِتَابِ إِسْمَاعِيلَ ۚ إِنَّهُ كَانَ صَادِقَ الْوَعْدِ وَكَانَ رَسُولًا نَّبِيًّا</p>
    <p class="translation">"And mention in the Book, Isma'il. Indeed, he was true to his promise, and he was a messenger and a prophet."</p>
    <cite>Surah Maryam (19:54)</cite>
  </blockquote>

  <p><strong>Sadiqa al-wa'd</strong> — "true to his promise." The root <strong>s-d-q</strong> means truth, and <strong>wa'd</strong> means promise. Isma'il's defining quality in the Quran is promise-keeping. He said he would be patient — <strong>satajiduni in sha'a Allahu min as-sabirin</strong> — and he was patient. He co-built the Ka'bah and the rites endure. His truthfulness to his word is his Quranic signature.</p>

  <p>The Ka'bah still stands. Millions circle it annually. The du'a Ibrahim and Isma'il made while raising its foundations — <strong>rabbana taqabbal minna</strong> — is still recited by those who circle it. The prayer outlasted the builders. The architecture outlasted the desert's emptiness. The two men who raised stones in an unpopulated valley created the gravitational center of a civilization that spans fourteen centuries and a billion people. The du'a was accepted.</p>
</article>`
  },
  {
    title: "The Patience of Isma'il: What Sabr Looks Like When the Blade Is Real",
    slug: "the-patience-of-ismail-what-sabr-looks-like",
    type: 'article' as const,
    excerpt: "Isma'il promised patience and the Quran confirms he delivered. But what does sabr mean when it is not endurance of hardship over time, but the single, compressed moment of lying still under a blade?",
    reading_time_minutes: 9,
    status: 'published' as const,
    tags: ['ismail', 'quranic-characters', 'sabr'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran's vocabulary of <strong>sabr</strong> appears across hundreds of ayahs. It is the quality most frequently commended to the believers. Be patient. Allah is with the patient. The patient will receive their reward without account. <strong>Sabr</strong> is the constant — the virtue that the Quran returns to more than any other.</p>

  <p>Isma'il promised it: <strong>satajiduni in sha'a Allahu min as-sabirin</strong>. And the Quran confirms both that he was placed on his forehead and that a ransom came — which means the promise was tested and the promise held. But the <strong>sabr</strong> of Isma'il is unlike any other instance of <strong>sabr</strong> in the Quran, because it is not patience over time. It is patience in a single moment.</p>

  <h2>The Word</h2>

  <p>The root <strong>s-b-r</strong> carries a range of meanings that illuminate each other. In its concrete, pre-abstract sense, <strong>sabr</strong> means to bind, to restrain, to hold something in place. A <strong>sabbur</strong> is a binding — a rope that keeps an animal from moving. To be <strong>sabir</strong> is to hold yourself in place when every impulse drives you to move.</p>

  <p>Ayyub's <strong>sabr</strong> is durational — years of illness, loss, and social exile, holding position through sustained erosion. Ya'qub's <strong>sabr</strong> is emotional — decades of grief for a lost son, refusing to let despair override trust. Musa's <strong>sabr</strong> with Khidr is intellectual — watching events that contradict his understanding and holding his tongue (briefly).</p>

  <p>Isma'il's <strong>sabr</strong> is none of these. It occupies a single moment. The blade is coming. He is laid upon his forehead. Every biological system in the human body — the fight-or-flight response, the adrenaline surge, the survival instinct — screams at him to move, to resist, to run. And he does not move. The <strong>sabr</strong> is the holding still.</p>

  <h2>The Quality of the Moment</h2>

  <p>The Quran's description — <strong>wa tallahu lil-jabin</strong>, "he put him down upon his forehead" — implies a son who lies down willingly. The passive construction does not describe a struggle. There is no mention of binding, no mention of resistance, no mention of second thoughts. The laying down is smooth. The <strong>sabr</strong> has already done its work — the inner battle is over before the outer posture is assumed.</p>

  <p>What does this moment contain? A young man — <strong>balagha ma'ahu as-sa'y</strong>, at the age of active striving — lies face-down on stone. His father stands above him. The blade is present. The sky is open. The desert is silent. No congregation watches. No army compels. No chain restrains. He is free to stand up and walk away. His father would likely weep with relief if he did. No one but Allah is enforcing this.</p>

  <p>The <strong>sabr</strong> is entirely voluntary. Ayyub had no choice about his illness. Ya'qub had no choice about Yusuf's disappearance. Isma'il has a choice. He can refuse. His father asked him — <strong>fandhur madha tara</strong>, "look, what do you see?" — which means refusal was structurally available. The patience is chosen patience. The stillness is chosen stillness. The <strong>sabr</strong> is not the absence of alternatives but the refusal of them.</p>

  <h2>Why In Sha'a Allah</h2>

  <p>Isma'il's qualification — <strong>in sha'a Allah</strong>, "if Allah wills" — is sometimes read as a polite formula. In context, it is far more than that. He is about to experience the single most terrifying moment available to a human being — conscious, willing proximity to his own death at the hands of someone he loves. The capacity to remain still through this moment is not something he can guarantee through willpower alone. He knows this. He has the self-awareness to recognize that the <strong>sabr</strong> required for this moment exceeds normal human capacity.</p>

  <p><strong>In sha'a Allah</strong> is not a hedging phrase. It is a theological statement: my patience, if it holds, will hold because Allah sustained it. The strength to lie still when every cell demands movement — that strength will come from outside if it comes at all. Isma'il promises his own effort (<strong>satajiduni min as-sabirin</strong> — you will find me among the patient) while acknowledging that even his effort depends on a capacity he did not manufacture (<strong>in sha'a Allah</strong> — if Allah wills).</p>

  <p>The combination — personal commitment plus divine dependency — is the Quran's formula for genuine <strong>sabr</strong>. The patient person is not the one who grits his teeth and endures through sheer will. The patient person is the one who commits to endurance while knowing that the endurance itself is granted. The teeth-gritting is real. The source of the strength to grit them is acknowledged as divine.</p>

  <h2>What Came After</h2>

  <p>The ransom arrives. The son is replaced by a ram. The blade falls on something other than flesh. And the Quran calls the entire episode <strong>al-bala'u al-mubin</strong> — "the clear trial." The word <strong>bala'</strong> — trial, test — from the root <strong>b-l-w</strong>, which means to test, to try, to wear out. A <strong>bala'</strong> is not a punishment. It is a testing that reveals the quality of the tested material — the way a metallurgist tests gold by fire, not to destroy it but to verify it.</p>

  <p>Isma'il passed. His <strong>sabr</strong> held. The moment came and went. And because it came and went, it became something that future generations can point to as proof that the human frame — designed for survival, wired for self-preservation, equipped with every biological mechanism to resist death — can, when supplied with enough divine assistance and enough chosen commitment, lie still.</p>

  <p>The <strong>sabr</strong> of Isma'il is not a model for daily patience — waiting in traffic, enduring a difficult colleague, persevering through a long project. It is a model for the moments when everything is on the line and the only faithful response is to be still. Those moments are rare. Most people will never face a blade. But the principle — <strong>if'al ma tu'mar, satajiduni in sha'a Allahu min as-sabirin</strong> — operates at every scale. Do what is commanded. You will find me patient. If Allah wills.</p>
</article>`
  }
]

async function main() {
  console.log("Inserting Isma'il articles...")
  for (const article of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: ISMAIL_ENTITY_ID, is_primary: true })
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: IBRAHIM_ENTITY_ID, is_primary: false })
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log("✓ Done!", articles.length, "Isma'il articles.")
}
main().catch(console.error)
