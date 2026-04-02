import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const IBLIS_ID    = '6647d520-3558-4ff2-882e-c85a706b1c47';
const TAWBAH_ID   = 'f4f69408-d31f-44d7-8ff1-ed3682ea6692';
const ADAM_ID_PLACEHOLDER = 'a70c4879-33e8-4b00-9b22-4f8cb1218ece'; // may not exist

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Argument From Origins: Iblis's Logic and the Flaw Inside It",
      slug: "the-argument-from-origins-iblis-logic-and-the-flaw-inside-it",
      type: 'article',
      excerpt: "Iblis made an argument. 'I am better than him — You created me from fire and him from clay.' The Quran preserves the syllogism without refuting it directly. What the Quran does instead is more interesting: it shows what the argument assumes and what it misses.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['iblis', 'quranic-characters', 'tawbah'],
      seo_description: "Iblis's refusal to prostrate was based on an argument about origins — fire over clay. The Quran preserves the logic without directly refuting it. An exploration of 38:71-76 and what the argument reveals.",
      content_html: `<article class="prose-blog">

  <p>When God commanded the angels to prostrate before Adam, all of them did — except Iblis. And when asked why, Iblis gave a reason. The Quran preserves the reason across multiple surahs. In Surah Sad, it appears in its most direct form.</p>

  <h2>The Scene</h2>

  <blockquote class="ayah-quote" data-ayah="38:71">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:38:71 -->إِذْ قَالَ رَبُّكَ لِلْمَلَـٰٓئِكَةِ إِنِّى خَـٰلِقٌۢ بَشَرًا مِّن طِينٍ</p>
    <p class="translation">"When your Lord said to the angels: 'Indeed, I am going to create a human being from clay.'"</p>
    <cite>Surah Sad (38:71)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="38:72">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:38:72 -->فَإِذَا سَوَّيْتُهُۥ وَنَفَخْتُ فِيهِ مِن رُّوحِى فَقَعُوا۟ لَهُۥ سَـٰجِدِينَ</p>
    <p class="translation">"'So when I have proportioned him and breathed into him of My spirit, then fall down to him in prostration.'"</p>
    <cite>Surah Sad (38:72)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="38:73">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:38:73 -->فَسَجَدَ ٱلْمَلَـٰٓئِكَةُ كُلُّهُمْ أَجْمَعُونَ</p>
    <p class="translation">"So the angels prostrated — all of them together."</p>
    <cite>Surah Sad (38:73)</cite>
  </blockquote>

  <p>The Quran notes the angels' prostration with two words of emphasis: <em>kulluhum</em> — all of them — and <em>ajma'ūn</em> — together, without exception. Both words convey totality. The completeness of the prostration is noted precisely because it will immediately be followed by an exception.</p>

  <h2>God's Question</h2>

  <blockquote class="ayah-quote" data-ayah="38:75">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:38:75 -->قَالَ يَـٰٓإِبْلِيسُ مَا مَنَعَكَ أَن تَسْجُدَ لِمَا خَلَقْتُ بِيَدَىَّ ۖ أَسْتَكْبَرْتَ أَمْ كُنتَ مِنَ ٱلْعَالِينَ</p>
    <p class="translation">"He said: 'O Iblis, what prevented you from prostrating to what I created with My own hands? Were you arrogant, or were you of the exalted?'"</p>
    <cite>Surah Sad (38:75)</cite>
  </blockquote>

  <p>The question contains a divine emphasis. God says: <em>limā khalaqtu bi-yadayya</em> — what I created with My own two hands. The phrase <em>bi-yadayya</em> is used nowhere else in the Quran in connection with any created being. Adam was formed by divine hands. The command to prostrate before him was issued after this act of particular care in creation.</p>

  <p>Then the question: were you arrogant, or were you of the exalted? The question offers two categories. <em>Astakbarta</em> — did you become arrogant? Or <em>kunta min al-'ālīn</em> — were you already among those above this command? The question is designed to make Iblis locate himself. Is the refusal a temporary condition or a claim to a permanent status?</p>

  <h2>The Argument</h2>

  <blockquote class="ayah-quote" data-ayah="38:76">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:38:76 -->قَالَ أَنَا۠ خَيْرٌ مِّنْهُ ۖ خَلَقْتَنِى مِن نَّارٍ وَخَلَقْتَهُۥ مِن طِينٍ</p>
    <p class="translation">"He said: 'I am better than him. You created me from fire and created him from clay.'"</p>
    <cite>Surah Sad (38:76)</cite>
  </blockquote>

  <p>The argument is a syllogism:</p>
  <ol>
    <li>Fire is superior to clay.</li>
    <li>I was created from fire; he was created from clay.</li>
    <li>Therefore I am superior to him.</li>
  </ol>

  <p>The Quran does not present God disputing the premises here. In other surahs, there is a response (7:12 has the same argument and gets the command to descend). In Surah Sad, the response is the command to leave, then the exchange about respite. The Quran does not construct a philosophical counter-argument to Iblis's syllogism. It simply shows what Iblis does with it.</p>

  <h2>Where the Argument Fails</h2>

  <p>The flaw in Iblis's logic is not in the factual premises — it is in the evaluative premise he has imported. His syllogism assumes: <em>the standard of superiority is elemental composition</em>. Fire is ranked above clay. This ranking is his own framework, not a stated divine standard.</p>

  <p>The divine standard that was actually in play was something else entirely: into what creature had God breathed of His own spirit (<em>rūḥī</em>, 38:72)? The verse specifying the command to prostrate gives the reason: after I proportioned him and breathed into him of My spirit. The standard was not material origin but what had been placed inside Adam.</p>

  <p>Iblis evaluated material origin. God evaluated what the material was given. The argument from origins is accurate about the materials. It is catastrophically wrong about which materials matter.</p>

  <h2>What the Preserved Argument Teaches</h2>

  <p>The Quran preserves Iblis's argument in full. It does not redact it or present it as obviously absurd. The syllogism has a surface plausibility — fire and clay are different; some materials seem nobler than others. The Quran lets the argument stand so that the reader can see the error themselves: the premise about which characteristic determines worth was Iblis's invention, not God's standard.</p>

  <p>This is characteristic of how the Quran treats challenges to divine authority — not by dismissing the challenger's intelligence but by showing where the intelligence went wrong. Iblis was capable of sophisticated reasoning. His reasoning was applied to the wrong framework. He evaluated the material and missed what the material was given. He saw the origin and missed the destination.</p>

  <p>The word the Quran uses for his refusal in 38:74 is <em>istakbara</em> — he became arrogant. The root <em>kibr</em> means greatness, bigness. <em>Istakbara</em> is the reflexive form: he considered himself great. The argument from origins was not merely an intellectual error. It was the intellectual form of an underlying orientation: self-elevation over a divine command. The argument came after the orientation. The syllogism served the <em>kibr</em>, not the other way around.</p>

</article>`
    },
    primaryEntityId: IBLIS_ID,
    secondaryEntityIds: [],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "What Iblis Got Right: The Verses Where the Adversary's Analysis Is Accurate",
      slug: "what-iblis-got-right-where-the-adversarys-analysis-is-accurate",
      type: 'article',
      excerpt: "In 7:16-17, Iblis outlines his plan of attack with striking precision. In 38:82-83, he names the one category he cannot touch. The Quran does not dispute his analysis of human weakness. It endorses his diagnosis and names the exception.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['iblis', 'quranic-characters'],
      seo_description: "In several Quran passages, Iblis's analysis of human weakness is not refuted — it's confirmed. An exploration of the verses where the adversary's diagnosis proves accurate, and what the Quran reveals about the one exception.",
      content_html: `<article class="prose-blog">

  <p>The Quran records Iblis making several statements. Most of them are refusals, justifications, or declarations of enmity. But embedded in these statements are claims about human nature — claims about how humans will behave, what they are susceptible to, where they are weak. And in several places, the Quran does not contradict these claims. In one verse, it endorses them directly.</p>

  <h2>The Plan, Stated in Advance</h2>

  <p>After his expulsion from the divine presence, Iblis outlines his strategy. In Surah Al-A'raf (7:16-17), he says: because You have put me in error, I will sit in ambush for them on Your straight path. Then I will come at them from in front, from behind, from their right, and from their left. And You will not find most of them grateful.</p>

  <p>The claim at the end — <em>wa lā tajidu aktharahum shākirīn</em> — you will not find most of them grateful — is a prediction about human behavior. The Quran records this claim. It does not, in the immediate context, dispute it. The surah continues with the story of Adam's descent and the beginning of human life on earth.</p>

  <p>The Quran elsewhere confirms the observation. In 12:103: <em>wa mā aktharu al-nāsi wa law ḥaraṣta bi-mu'minīn</em> — and most people, even if you are eager, are not believers. In 10:36: <em>wa mā yattabi'u aktharuhum illā ẓannan</em> — most of them follow nothing but conjecture. The low baseline that Iblis predicted is corroborated by Quranic observation of human patterns.</p>

  <h2>His Testimony at the End</h2>

  <p>In Surah Ibrahim (14:22), after the matter is concluded — after the Day of Judgment — Iblis addresses the people who followed him. The Quran records his statement:</p>

  <p><em>Wa qāla al-shayṭānu lammā quḍiya al-amru: inna Allāha wa'adakum wa'da al-ḥaqqi wa wa'adtukum fa-akhlaftukum. Wa mā kāna lī 'alaykum min sulṭānin illā an da'awtukum fa-stajabtum lī. Fa-lā talūmūnī wa lūmū anfusakum.</em></p>

  <p>"And Satan will say when the matter has been concluded: 'Indeed, Allah had promised you the promise of truth. And I promised you, but I betrayed you. And I had no authority over you except that I invited you and you responded to me. So do not blame me; blame yourselves.'"</p>

  <p>This is one of the most remarkable passages in the Quran because Iblis tells the truth. He acknowledges that God's promise was true. He acknowledges that his own promise was false. He acknowledges that he had no compulsion over them — only invitation. And he tells them to blame themselves. The Quran preserves this truthful self-report from the adversary, at the end, when deception is no longer possible.</p>

  <h2>The One He Cannot Reach</h2>

  <p>In Surah Sad (38:82-83), after the expulsion, Iblis makes his vow and then names an exception he cannot touch:</p>

  <p><em>Fa-bi-'izzatika la-ughwiyyannahum ajma'īna, illā 'ibādaka minhumu al-mukhlaṣīn</em> — By Your might, I will surely mislead them all, except Your servants among them who are the sincere ones.</p>

  <p>The word <em>mukhlaṣīn</em> is the passive participle of <em>akhlasa</em> — to make pure, to render sincere. The <em>mukhlaṣīn</em> are not those who have made themselves sincere, but those whom God has made sincere — the ones God has selected and purified. This is the one category Iblis excludes himself from reaching. He identifies the limit of his own influence.</p>

  <p>And in 15:40-42, God confirms the exception: <em>illā 'ibādaka minhumu al-mukhlaṣīn</em> — except Your servants among them who are sincere. Then: <em>inna 'ibādī laysa laka 'alayhim sulṭānun</em> — indeed, over My servants you will have no authority. The adversary's exception is ratified by God.</p>

  <h2>What This Reveals</h2>

  <p>The Quran presents Iblis as a character whose analysis of human vulnerability is, in significant ways, correct. He knows where humans are susceptible — to desire, to distraction, to following conjecture, to ingratitude. He knows his method — invitation, not compulsion. He knows his limit — the mukhlaṣīn, those whom God has taken into particular custody.</p>

  <p>This makes the Quran's presentation of the adversary more sophisticated than a simple villain. Iblis has accurate knowledge. His error was not in his assessment of human weakness but in what he did with that knowledge — using it for enmity rather than recognizing it as part of the divine testing architecture that the Quran describes.</p>

  <p>The practical implication is the one the Quran draws throughout: the protection against Iblis is not the claim that he is wrong about human weakness. It is the pursuit of the condition he himself names as beyond his reach — ikhlas, sincerity — and the acknowledgment that reaching that condition is not self-generated but divinely granted. The mukhlaṣīn are not safe because they resisted harder. They are safe because they are held by something Iblis cannot touch.</p>

</article>`
    },
    primaryEntityId: IBLIS_ID,
    secondaryEntityIds: [],
  },
];

async function main() {
  console.log('Inserting Iblis articles...');

  for (const { post, primaryEntityId, secondaryEntityIds } of articles) {
    const { data: inserted, error } = await supabase
      .from('posts')
      .insert({ ...post, created_by: ADMIN_USER_ID, featured: false, published_at: new Date().toISOString() })
      .select('id, title')
      .single();

    if (error) {
      console.error(`✗ "${post.title}":`, error.message);
      continue;
    }

    await supabase.from('entity_tags').insert({
      post_id: inserted.id,
      entity_id: primaryEntityId,
      is_primary: true,
    });

    for (const entityId of secondaryEntityIds) {
      await supabase.from('entity_tags').insert({
        post_id: inserted.id,
        entity_id: entityId,
        is_primary: false,
      });
    }

    console.log(`✓ "${inserted.title}"`);
  }

  await supabase.rpc('refresh_entity_co_occurrence');

  console.log('\n✓ Done! 2 articles inserted.');
}

main().catch(console.error);
