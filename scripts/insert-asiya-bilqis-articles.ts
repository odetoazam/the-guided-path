#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ASIYA_ID = '23ab8f23-b97b-4a09-81aa-519bbc8e7e7a'
const BILQIS_ID = 'd89ce31a-f0f9-4e18-b58e-9fd5752de4b4'
const FIRAUN_ID = 'b0cb4ac7-a3d7-4843-93de-33f8a6112861'

const articles = [
  // ASIYA
  {
    primaryEntity: ASIYA_ID,
    secondaryEntities: [FIRAUN_ID],
    article: {
      title: "The Prayer Inside the Palace: Asiya and the House She Actually Wanted",
      slug: "the-prayer-inside-the-palace-asiya-and-the-house-she-actually-wanted",
      type: 'article',
      excerpt: "Asiya lived in the most powerful palace on earth and prayed for a house near Allah in Paradise. The Quran preserves her du'a as the example for all believers — a prayer spoken from inside the very system it rejects.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['asiya', 'quranic-characters', 'firaun', 'dua'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran presents Asiya — the wife of Fir'awn — as <strong>mathalan lil-ladhina amanu</strong>, an example for those who believe. Not an example for believing women. Not an example for wives. An example for <strong>alladhina amanu</strong> — for all who believe, without gender qualification. She is the universal model, and the Quran introduces her with a prayer spoken from inside the palace of the man who declared himself God.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَضَرَبَ اللَّهُ مَثَلًا لِّلَّذِينَ آمَنُوا امْرَأَتَ فِرْعَوْنَ إِذْ قَالَتْ رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ وَنَجِّنِي مِنَ الْقَوْمِ الظَّالِمِينَ</p>
    <p class="translation">"And Allah presents an example for those who believed: the wife of Fir'awn, when she said: 'My Lord, build for me near You a house in Paradise, and save me from Fir'awn and his deeds, and save me from the wrongdoing people.'"</p>
    <cite>Surah At-Tahrim (66:11)</cite>
  </blockquote>

  <h2>The Architecture of the Prayer</h2>

  <p>Three requests. Each one gains weight from the one before it.</p>

  <p><strong>Rabbi ibni li 'indaka baytan fi al-jannah</strong> — "My Lord, build for me near You a house in Paradise." The verb <strong>ibni</strong> — build — is an imperative addressed to Allah. She asks the Creator to build. The word <strong>baytan</strong> — a house — is the same word used for a domestic dwelling. She lives in a palace. She asks for a house. The reduction is deliberate: she trades the grandeur of Fir'awn's construction for the simplicity of a house built by Allah.</p>

  <p>The critical phrase is <strong>'indaka</strong> — "near You." She specifies the location before she specifies the structure. The house can be anything. The location must be near Allah. The proximity is the prize, not the architecture. Asiya, who knows what palaces look like from the inside, understands that the value of a dwelling is determined by its proximity to the Lord of the dwelling, not by the dwelling itself.</p>

  <p><strong>Wa najjini min Fir'awna wa 'amalihi</strong> — "and save me from Fir'awn and his deeds." The verb <strong>najjini</strong> — save me — uses the root <strong>n-j-w</strong>, the same root used for the salvation of prophets. She asks for prophetic-grade salvation. And the object she asks to be saved from is her husband — by name, <strong>Fir'awn</strong> — and his deeds, <strong>'amalihi</strong>. She does not ask to be saved from his anger or his punishment specifically. She asks to be saved from his <strong>'amal</strong> — his works, his entire program, his system. The word encompasses everything he does: the oppression, the self-deification, the killing of children, the enslavement. She wants distance from the complete project.</p>

  <p><strong>Wa najjini min al-qawm adh-dhalimin</strong> — "and save me from the wrongdoing people." The third request expands the scope. She asks to be saved from Fir'awn individually and from the system collectively. <strong>Al-qawm adh-dhalimin</strong> — the people who do wrong — includes the courtiers, the magicians, the army, the administrators. The entire apparatus. Asiya recognizes that tyranny is not one man. It is a system of people who enable the man.</p>

  <h2>The Position She Speaks From</h2>

  <p>Asiya is not a prisoner in the conventional sense. She is the queen. She has access to every luxury the ancient world could produce. The rivers that flow beneath Fir'awn's throne flow beneath hers. The servants who attend him attend her. She eats the food, wears the garments, occupies the rooms. She is inside the system at the highest level of comfort the system offers.</p>

  <p>And she asks to leave. The prayer is an exodus — spoken by a woman who could remain, who has every material incentive to remain, and who chooses to seek a house built by Allah near Allah in Paradise rather than to continue occupying a palace built by Fir'awn near Fir'awn on earth. The du'a is a resignation letter addressed to God.</p>

  <p>The Quran's placement of this prayer in Surah At-Tahrim — immediately after the wives of Nuh and Lut who lived in prophets' houses but aligned with disbelief — creates a chiastic mirror. The wives of prophets failed to believe despite prophetic proximity. The wife of a tyrant believed despite tyrannical proximity. Environment is not destiny. The palace of Fir'awn produced Asiya. The households of Nuh and Lut did not produce faith in their wives. The determining factor is the heart's orientation, not the home's address.</p>

  <h2>Why She Is the Example</h2>

  <p>The Quran could have presented any figure as <strong>mathalan lil-ladhina amanu</strong>. It chose Asiya — a woman, a wife of the greatest tyrant, a person embedded in the deepest possible complicity, who chose to pray for a house near Allah from inside a palace that claimed to be the house of God on earth. The example is not the person who finds faith in easy conditions. It is the person who finds faith in impossible conditions — surrounded by wrong, sustained by wrong's resources, and still choosing right.</p>

  <p>Her prayer does not condemn the palace directly. She does not say "this palace is corrupt" or "these riches are evil." She simply asks for something else — something <strong>'indaka</strong>, near You. The critique of Fir'awn's system is embedded in the preference, not in the denunciation. She does not attack what she has. She asks for what she wants. And what she wants is a house near Allah. The request itself is the judgment on everything she currently possesses.</p>
</article>`
    }
  },
  // BILQIS
  {
    primaryEntity: BILQIS_ID,
    article: {
      title: "The Queen Who Consulted: Bilqis and the Quran's Model of Deliberative Leadership",
      slug: "the-queen-who-consulted-bilqis-and-the-qurans-model-of-deliberative-leadership",
      type: 'article',
      excerpt: "When Sulayman's letter arrives, Bilqis does not act alone. She consults her council, tests the sender, and makes decisions through deliberation. The Quran preserves her process as a portrait of governance done right.",
      reading_time_minutes: 12,
      status: 'published',
      tags: ['bilqis', 'sulayman', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Queen of Sheba — identified in Islamic tradition as Bilqis, though the Quran does not name her — receives a letter from Sulayman carried by a hoopoe bird. Her response to this letter is one of the most detailed examples of political deliberation in the entire Quran. She does not react emotionally, does not dismiss the letter, does not capitulate immediately. She consults, tests, and decides — and the Quran records each step.</p>

  <h2>The Letter</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنَّهُ مِن سُلَيْمَانَ وَإِنَّهُ بِسْمِ اللَّهِ الرَّحْمَـٰنِ الرَّحِيمِ ۝ أَلَّا تَعْلُوا عَلَيَّ وَأْتُونِي مُسْلِمِينَ</p>
    <p class="translation">"Indeed, it is from Sulayman, and indeed, it reads: 'In the name of Allah, the Entirely Merciful, the Especially Merciful. Be not haughty with me but come to me in submission.'"</p>
    <cite>Surah An-Naml (27:30-31)</cite>
  </blockquote>

  <p>She reads it to her council. The letter is brief — two sentences. <strong>Alla ta'lu 'alayya</strong> — "do not be arrogant toward me." <strong>Wa'tuni muslimin</strong> — "come to me submitting." The directness is Sulayman's signature: no diplomacy, no negotiation, no flattery. A command.</p>

  <h2>The Consultation</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَتْ يَا أَيُّهَا الْمَلَأُ أَفْتُونِي فِي أَمْرِي مَا كُنتُ قَاطِعَةً أَمْرًا حَتَّىٰ تَشْهَدُونِ</p>
    <p class="translation">"She said: 'O eminent ones, advise me in my affair. I would not decide any matter until you witness [it].'"</p>
    <cite>Surah An-Naml (27:32)</cite>
  </blockquote>

  <p><strong>Aftuni fi amri</strong> — "advise me in my affair." The verb <strong>aftuni</strong> — from <strong>f-t-w</strong>, to give a legal opinion, to issue a ruling — is the word used for scholarly consultation, for seeking a <strong>fatwa</strong>. She does not say "tell me what to do." She asks for a considered judgment on a matter of state. The distinction matters: she seeks wisdom, not direction.</p>

  <p><strong>Ma kuntu qati'atan amran hatta tash-hadun</strong> — "I would not decide a matter until you are present as witnesses." She establishes her governance principle before asking for advice: I do not make unilateral decisions. I decide with my council present. This is a queen who has institutionalized consultation — <strong>shura</strong> — as a constitutional principle, not as an occasional courtesy.</p>

  <p>Her council's response is the response of a military establishment:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا نَحْنُ أُولُو قُوَّةٍ وَأُولُو بَأْسٍ شَدِيدٍ وَالْأَمْرُ إِلَيْكِ فَانظُرِي مَاذَا تَأْمُرِينَ</p>
    <p class="translation">"They said: 'We are people of strength and of great military might, but the command is yours. So see what you will command.'"</p>
    <cite>Surah An-Naml (27:33)</cite>
  </blockquote>

  <p>The council offers its assessment: we are strong, we can fight. And then: <strong>wal-amru ilayki</strong> — "the decision is yours." They defer to the queen's judgment while reporting their capability. This is the consultative process working correctly: the experts provide information, the leader makes the decision. The council does not dictate. The queen does not ignore.</p>

  <h2>The Test</h2>

  <p>Bilqis does not choose war. She chooses intelligence-gathering:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَتْ إِنَّ الْمُلُوكَ إِذَا دَخَلُوا قَرْيَةً أَفْسَدُوهَا وَجَعَلُوا أَعِزَّةَ أَهْلِهَا أَذِلَّةً ۖ وَكَذَٰلِكَ يَفْعَلُونَ ۝ وَإِنِّي مُرْسِلَةٌ إِلَيْهِم بِهَدِيَّةٍ فَنَاظِرَةٌ بِمَ يَرْجِعُ الْمُرْسَلُونَ</p>
    <p class="translation">"She said: 'Indeed, when kings enter a city, they ruin it and render the honored among its people humiliated — and thus do they do. But I will send to them a gift and see with what the messengers return.'"</p>
    <cite>Surah An-Naml (27:34-35)</cite>
  </blockquote>

  <p>Her political analysis is precise: <strong>inna al-muluka idha dakhalu qaryatan afsaduha</strong> — "kings, when they enter a city, corrupt it." She knows what military invasion produces. She has a theory of power: conquest destroys. The honored become humiliated. The infrastructure deteriorates. She delivers this analysis before proposing her strategy — showing her council that the decision against war is informed, not timid.</p>

  <p>Her strategy: <strong>inni mursilatun ilayhim bi-hadiyyah</strong> — "I will send them a gift." The gift is a test. If Sulayman accepts the gift, he is a king — his interest is material, his demands negotiable, his power conventional. If he rejects the gift, he is something else — a prophet, perhaps, whose demands are theological and whose power has a different source. The gift is diplomatic intelligence-gathering in the form of generosity.</p>

  <p>Sulayman rejects the gift. <strong>A-tumiddunani bi-mal</strong> — "Do you provide me with wealth?" (27:36). The test is answered: he is not a king in the conventional sense. Bilqis has her data.</p>

  <h2>The Journey and the Recognition</h2>

  <p>She travels to Sulayman. When she arrives, her throne — transported miraculously — is presented to her in altered form as a test:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قِيلَ أَهَـٰكَذَا عَرْشُكِ ۖ قَالَتْ كَأَنَّهُ هُوَ</p>
    <p class="translation">"It was said: 'Is your throne like this?' She said: 'It is as though it were the very one.'"</p>
    <cite>Surah An-Naml (27:42)</cite>
  </blockquote>

  <p><strong>Ka-annahu huwa</strong> — "as though it were it." She does not say yes or no. She says "it is as though it were." The answer preserves accuracy — it resembles her throne, but she cannot confirm identity with certainty because it has been modified. Her answer demonstrates the same quality she has shown throughout: precise observation that does not overstate its conclusions.</p>

  <p>And then, upon entering Sulayman's palace with its glass floor that appears to be water, she lifts her garment thinking she is wading — and Sulayman informs her it is glass. Her response is the climax of the narrative:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَتْ رَبِّ إِنِّي ظَلَمْتُ نَفْسِي وَأَسْلَمْتُ مَعَ سُلَيْمَانَ لِلَّهِ رَبِّ الْعَالَمِينَ</p>
    <p class="translation">"She said: 'My Lord, indeed I have wronged myself, and I submit with Sulayman to Allah, Lord of the worlds.'"</p>
    <cite>Surah An-Naml (27:44)</cite>
  </blockquote>

  <p><strong>Aslamtu ma'a Sulaymana lillahi rabbi al-'alamin</strong> — "I submit with Sulayman to Allah, Lord of the worlds." The submission is <strong>ma'a Sulayman</strong> — with Sulayman, alongside him, not to him. She does not submit to Sulayman. She submits with him, to Allah. The preposition <strong>ma'a</strong> preserves her dignity: she is a co-submitter, not a subordinate. Two sovereigns, both submitting to the same Lord. The queen who consulted her council before making any decision makes her final decision — and it is the decision to submit to the Lord of all the worlds, arrived at through the same process of evidence-gathering and deliberation she has used throughout.</p>
</article>`
    }
  },
  {
    primaryEntity: ASIYA_ID,
    article: {
      title: "Asiya and Maryam: The Two Women the Quran Holds Up for All Believers",
      slug: "asiya-and-maryam-the-two-women-the-quran-holds-up-for-all-believers",
      type: 'article',
      excerpt: "Surah At-Tahrim presents four women in two pairs. The positive pair — Asiya and Maryam — are offered as mathal, examples, for everyone who believes. Not for women. For believers. The universality is the point.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['asiya', 'maryam', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The closing ayahs of Surah At-Tahrim present four women as examples — two negative, two positive. The negative pair: the wives of Nuh and Lut, who lived in prophets' houses and disbelieved. The positive pair: the wife of Fir'awn (Asiya) and Maryam bint 'Imran. The structure is a chiasm — the wives of righteous men failed; the wife of a tyrant and the unmarried mother succeeded.</p>

  <h2>The Universal Address</h2>

  <p>The Quran introduces the negative pair as <strong>mathalan lil-ladhina kafaru</strong> — "an example for those who disbelieved." The positive pair as <strong>mathalan lil-ladhina amanu</strong> — "an example for those who believed." The address is universal — <strong>alladhina</strong> encompasses all people, all genders, all times. Asiya and Maryam are not presented as models for women specifically. They are presented as models for believers — the full community of faith.</p>

  <p>This universality is the Quran's structural argument against restricting moral exemplarity to gender categories. When the Quran wants to show believers what faith looks like under pressure, it shows them a woman praying inside a tyrant's palace and a woman giving birth alone under a palm tree. The examples are female. The audience is everyone.</p>

  <h2>Asiya's Contribution</h2>

  <p>Asiya models faith under systemic pressure. Her environment is hostile at the structural level — the palace is not merely uncomfortable but actively opposed to the truth she holds. Fir'awn is not just a bad husband. He is the embodiment of <strong>istikbar</strong> — self-magnification elevated to the level of theology. <strong>Ana rabbukum al-a'la</strong>. Asiya believes in Allah while sleeping next to a man who claims to be God.</p>

  <p>Her contribution to the mathal is the demonstration that faith does not require a supportive environment. She has no community of believers around her (that the Quran records). She has no prophet in her household instructing her (Musa grows up in her care but is eventually exiled). She believes in isolation, under threat, inside the beast. Her faith is self-sustaining — maintained by nothing except the connection to Allah that her prayer articulates.</p>

  <h2>Maryam's Contribution</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَمَرْيَمَ ابْنَتَ عِمْرَانَ الَّتِي أَحْصَنَتْ فَرْجَهَا فَنَفَخْنَا فِيهِ مِن رُّوحِنَا وَصَدَّقَتْ بِكَلِمَاتِ رَبِّهَا وَكُتُبِهِ وَكَانَتْ مِنَ الْقَانِتِينَ</p>
    <p class="translation">"And Maryam, the daughter of 'Imran, who guarded her chastity, so We breathed into her through Our spirit. And she believed in the words of her Lord and His scriptures, and she was of the devoutly obedient."</p>
    <cite>Surah At-Tahrim (66:12)</cite>
  </blockquote>

  <p>Maryam models faith under social pressure. She carries a child without a husband — in a society where this is the most damning accusation possible. When she returns to her people with the baby, they say: <strong>ya ukhta Haruna ma kana abuki imra'a saw'in</strong> — "O sister of Harun, your father was not a man of evil" (19:28). They invoke her family's righteousness as evidence of her fall. The social pressure is specific: you come from a good family, and yet here you are.</p>

  <p>Her response is silence — she points to the baby. And the baby speaks. Maryam does not defend herself. She lets the sign defend her. Her contribution to the mathal is trust in divine vindication — the willingness to endure the accusation without self-defense, trusting that the truth will emerge through means she did not engineer.</p>

  <p>The final descriptor: <strong>wa kanat min al-qanitin</strong> — "she was of the devoutly obedient." The word <strong>qanitin</strong> is in the masculine plural form. Maryam is included among <strong>al-qanitin</strong> — the obedient — without the form being feminized. The Arabic grammar reinforces the universality: she is among the obedient, full stop. No gender qualification. No separate category.</p>

  <h2>The Pair Together</h2>

  <p>Asiya and Maryam together cover the two primary environments in which faith is tested. Asiya is inside the system — wealth, power, comfort, all available, all contaminated by the system's fundamental lie. Maryam is outside the system — alone, unsupported, carrying evidence of divine action that looks to the community like evidence of moral failure.</p>

  <p>Inside and outside. The palace and the palm tree. The wife of the tyrant and the unmarried mother. The Quran takes the two positions that the social world would most expect to produce failure — complicity in power and scandal in poverty — and makes them the two positions from which exemplary faith is demonstrated. The mathal is not drawn from ease. It is drawn from the two hardest places a person can occupy — and in both of those places, a woman said yes to Allah.</p>
</article>`
    }
  }
]

async function main() {
  console.log("Inserting Asiya/Bilqis articles...")
  for (const { article, primaryEntity, secondaryEntities } of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: primaryEntity, is_primary: true })
    if (secondaryEntities) {
      for (const secId of secondaryEntities) {
        await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: secId, is_primary: false })
      }
    }
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log(`✓ Done! ${articles.length} articles.`)
}
main().catch(console.error)
