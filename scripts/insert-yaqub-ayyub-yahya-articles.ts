#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const YAQUB_ID = '94205c7f-b2a2-4b2b-be51-a8c8678676e4'
const AYYUB_ID = 'e070047b-c83a-481d-a68a-d9c7892996af'
const YAHYA_ID = 'c372ba93-037b-447c-84a4-f3866c48cba4'
const ZAKARIYYA_ID = '178975a6-a53a-48db-8426-00adba42422f'
const ISA_ID = '14ec6c99-9696-4592-8945-ef905403b3ce'

// Will be resolved in main()
let YUSUF_ID: string | undefined

interface ArticleWithTags {
  article: any
  primaryEntity: string
  secondaryEntities?: string[]
}

const batch: ArticleWithTags[] = [
  // === YA'QUB ===
  {
    primaryEntity: YAQUB_ID,
    get secondaryEntities() { return YUSUF_ID ? [YUSUF_ID] : [] },
    article: {
      title: "The Father Who Waited: Ya'qub and the Grief That Became Blindness",
      slug: "the-father-who-waited-yaqub-and-the-grief-that-became-blindness",
      type: 'article',
      excerpt: "Ya'qub wept for Yusuf until his eyes whitened with grief. The Quran records a sorrow so sustained that it altered the body — and a patience so deep that it never once became despair.",
      reading_time_minutes: 12,
      status: 'published',
      tags: ['yaqub', 'yusuf', 'quranic-characters', 'sabr'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Ya'qub loses Yusuf when the boy is young. He will not see him again for decades. In the intervening years, the Quran records a grief so total that it transforms the body — Ya'qub's eyes whiten, his sight fades — and a patience so exacting that even in the depths of that grief, he never crosses the line into despair. The distinction the Quran draws between grief and despair in Ya'qub's story is one of the most psychologically precise passages in the entire text.</p>

  <h2>The Loss</h2>

  <p>When Ya'qub's sons return with Yusuf's shirt stained in false blood, Ya'qub's response is immediate and diagnostic:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ وَاللَّهُ الْمُسْتَعَانُ عَلَىٰ مَا تَصِفُونَ</p>
    <p class="translation">"He said: 'Rather, your souls have enticed you to something. So patience is most fitting. And Allah is the one sought for help against what you describe.'"</p>
    <cite>Surah Yusuf (12:18)</cite>
  </blockquote>

  <p>He does not believe them. <strong>Bal sawwalat lakum anfusukum amran</strong> — "your souls have made something seem acceptable to you." The verb <strong>sawwala</strong> means to make attractive, to present something ugly as acceptable. Ya'qub sees through the performance immediately. He knows his sons. He knows the story does not hold.</p>

  <p>And then: <strong>fa-sabrun jamil</strong> — "so beautiful patience." <strong>Jamil</strong> — beautiful. Not just patience, but beautiful patience. <strong>Sabr jamil</strong> is, in the prophetic tradition, patience without complaint to anyone other than Allah. It is patience that maintains its dignity, that does not collapse into public wailing or bitter accusation. Ya'qub will grieve — the Quran makes this unambiguous — but the grief will be <strong>jamil</strong>. It will not be ugly. It will not become a performance. It will not be weaponized against his other sons.</p>

  <h2>The Years</h2>

  <p>The Quran compresses years into the space between scenes. When Yusuf's brother Binyamin is later detained in Egypt, Ya'qub's accumulated grief breaks the surface:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا أَسَفَىٰ عَلَىٰ يُوسُفَ وَابْيَضَّتْ عَيْنَاهُ مِنَ الْحُزْنِ فَهُوَ كَظِيمٌ</p>
    <p class="translation">"And he turned away from them and said: 'O my grief over Yusuf!' And his eyes became white from grief, and he was a suppressor [of grief]."</p>
    <cite>Surah Yusuf (12:84)</cite>
  </blockquote>

  <p><strong>Ya asafa 'ala Yusuf</strong> — "O my sorrow over Yusuf." The word <strong>asaf</strong> — grief, sorrow, anguish — is addressed as though it were a companion. He speaks to his grief. The sorrow has become so constant that it has a presence, an identity, a name he can call out to. Decades of missing Yusuf are compressed into this vocative: O my grief.</p>

  <p><strong>Wabyaddat 'aynahu min al-huzn</strong> — "his eyes became white from grief." The verb <strong>ibyaddat</strong> — became white — describes the medical reality: the corneas clouded, the vision faded. The grief was so sustained, so physically present, so unrelenting that it altered the organs of sight. The body registered what the heart could not discharge. The tears that fell for years left their mark on the tissue they passed through.</p>

  <p>And: <strong>fa-huwa kadhim</strong> — "and he was a suppressor." <strong>Kadhim</strong> — from <strong>k-dh-m</strong>, to swallow, to suppress, to contain within. A <strong>kadhim</strong> is one who swallows his grief rather than spewing it outward. The Quran holds both truths: Ya'qub grieves so profoundly that his eyes go white, and he suppresses that grief so completely that it remains internal. The grief is maximal. The expression is minimal. The containment is <strong>sabr jamil</strong> — beautiful patience — enacted over decades.</p>

  <h2>Grief Without Despair</h2>

  <p>His sons challenge him:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا تَاللَّهِ تَفْتَأُ تَذْكُرُ يُوسُفَ حَتَّىٰ تَكُونَ حَرَضًا أَوْ تَكُونَ مِنَ الْهَالِكِينَ</p>
    <p class="translation">"They said: 'By Allah, you will not cease remembering Yusuf until you become fatally ill or become of those who perish.'"</p>
    <cite>Surah Yusuf (12:85)</cite>
  </blockquote>

  <p>His response draws the line the Quran cares most about:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ إِنَّمَا أَشْكُو بَثِّي وَحُزْنِي إِلَى اللَّهِ وَأَعْلَمُ مِنَ اللَّهِ مَا لَا تَعْلَمُونَ</p>
    <p class="translation">"He said: 'I only complain of my anguish and my grief to Allah, and I know from Allah what you do not know.'"</p>
    <cite>Surah Yusuf (12:86)</cite>
  </blockquote>

  <p><strong>Innama ashku baththi wa huzni ila Allah</strong> — "I only pour out my distress and grief to Allah." The verb <strong>ashku</strong> — I complain, I pour out — and the word <strong>bathth</strong> — distress, the inner state that needs to be poured out, the pressure that seeks release. Ya'qub does complain. He does express grief. But the direction is vertical — <strong>ila Allah</strong>, to Allah — not horizontal. He does not burden his sons with it. He does not perform it for the community. He pours it into the only container large enough to hold it.</p>

  <p>And: <strong>wa a'lamu min Allahi ma la ta'lamun</strong> — "I know from Allah what you do not know." He knows something. The grief coexists with knowledge. The white-eyed, sorrow-soaked father still carries a certainty his sons cannot access. Classical commentators identify this as Ya'qub's prophetic knowledge that Yusuf is alive — a knowledge sustained by the same dream-interpretation gift that would later define Yusuf's ministry. Ya'qub grieves and hopes simultaneously. The grief does not extinguish the hope. The hope does not eliminate the grief. Both occupy the same man, the same decades, the same blinded eyes.</p>

  <h2>The Restoration</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">اذْهَبُوا بِقَمِيصِي هَـٰذَا فَأَلْقُوهُ عَلَىٰ وَجْهِ أَبِي يَأْتِ بَصِيرًا</p>
    <p class="translation">"Take this shirt of mine and cast it over the face of my father; he will recover his sight."</p>
    <cite>Surah Yusuf (12:93)</cite>
  </blockquote>

  <p>Yusuf sends his shirt — <strong>qamisi</strong> — the same garment that was central to the story's beginning (torn from behind, stained with false blood). The shirt that was used to deceive Ya'qub is now the instrument of his healing. <strong>Fa-alquhu 'ala wajhi abi ya'ti basiran</strong> — "cast it upon my father's face and he will come seeing." The sight returns through the same medium — a shirt, a garment — that was used to take his peace away. The healing reverses the wound through the wound's own instrument.</p>

  <p>The grief that whitened his eyes lasted decades. The restoration is instant — a shirt laid on the face. The asymmetry is the lesson: suffering accumulates slowly. Healing, when it comes from Allah, arrives in a moment. <strong>Sabr jamil</strong> is the practice that fills the decades between the wound and the restoration. Ya'qub held that practice until the shirt arrived.</p>
</article>`
    }
  },
  {
    primaryEntity: YAQUB_ID,
    article: {
      title: "Ya'qub's Intuition: The Father Who Knew What He Could Not Prove",
      slug: "yaqubs-intuition-the-father-who-knew-what-he-could-not-prove",
      type: 'article',
      excerpt: "From the first moment his sons return without Yusuf, Ya'qub sees through the lie. The Quran preserves a father's instinct that operates beyond evidence — knowing without proof, trusting without confirmation.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['yaqub', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Ya'qub's sons bring him Yusuf's shirt stained with blood and a story about a wolf. It is a rehearsed performance — the Quran records that they came <strong>'isha'an yabkun</strong>, "weeping at nightfall" (12:16). They timed it. They came after dark, when details are harder to scrutinize. They cried, to supplement the story with emotion. Everything about the presentation is calculated.</p>

  <p>Ya'qub's response: <strong>bal sawwalat lakum anfusukum amra</strong> — "rather, your souls have made something seem acceptable to you." He rejects the story on the spot. No investigation. No forensic examination of the shirt (which, the Quran implies, had no tears — a wolf that eats a boy but leaves his shirt intact). Ya'qub knows his sons and he knows the truth they are concealing, even though he cannot prove it.</p>

  <h2>The Knowledge That Precedes Evidence</h2>

  <p>When Yusuf was a child, he told Ya'qub about a dream — eleven stars, the sun, and the moon prostrating to him. Ya'qub's response was protective and immediate:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ يَا بُنَيَّ لَا تَقْصُصْ رُؤْيَاكَ عَلَىٰ إِخْوَتِكَ فَيَكِيدُوا لَكَ كَيْدًا</p>
    <p class="translation">"He said: 'O my son, do not relate your vision to your brothers, lest they devise a plan against you.'"</p>
    <cite>Surah Yusuf (12:5)</cite>
  </blockquote>

  <p><strong>La taqsus ru'yaka 'ala ikhwatika</strong> — "do not narrate your dream to your brothers." Ya'qub sees, in the dream's content, a future that will provoke jealousy. He reads the family dynamics accurately: the brothers will hear "eleven stars prostrate to me" and convert the dream's symbolism into a threat. The father who knows his sons' capacities warns the son who does not yet know his brothers' limitations.</p>

  <p><strong>Fa-yakidu laka kaydan</strong> — "lest they devise a plan against you." The word <strong>kayd</strong> — plot, scheme — appears here as Ya'qub's prediction. He foresees the plotting before it happens. When the brothers later plot to dispose of Yusuf, Ya'qub's warning has already named the mechanism. The plot is not a surprise to the narrative. It is a fulfillment of the father's intuition.</p>

  <h2>After Binyamin</h2>

  <p>When the brothers lose Binyamin in Egypt — detained by the 'Aziz (Yusuf, unknown to them) — Ya'qub responds with the same formula:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ بَلْ سَوَّلَتْ لَكُمْ أَنفُسُكُمْ أَمْرًا ۖ فَصَبْرٌ جَمِيلٌ ۖ عَسَى اللَّهُ أَن يَأْتِيَنِي بِهِمْ جَمِيعًا</p>
    <p class="translation">"He said: 'Rather, your souls have enticed you to something. So patience is most fitting. Perhaps Allah will bring them to me all together.'"</p>
    <cite>Surah Yusuf (12:83)</cite>
  </blockquote>

  <p>The same words — <strong>bal sawwalat lakum anfusukum amra, fa-sabrun jamil</strong> — repeated almost verbatim from the first loss. But with an addition: <strong>'asa Allahu an ya'tiyani bihim jami'an</strong> — "perhaps Allah will bring them to me all together." <strong>Jami'an</strong> — all of them. Not just Binyamin. Not just Yusuf. All of them — every son, including the ones who plotted in the first place. Ya'qub's hope encompasses even the brothers who caused the original rupture. His intuition about their guilt does not become a desire for their exclusion. He wants them all back.</p>

  <p>This is the quality the Quran preserves in Ya'qub's portrait: a knowledge that operates alongside mercy. He knows his sons plotted against Yusuf. He knows they are unreliable narrators. He knows their tears at nightfall were performance. And he wants them all back. The knowledge does not curdle into bitterness. The intuition does not become condemnation. The father who sees through the lie still prays for the liars.</p>

  <h2>The Scent</h2>

  <p>When Yusuf's caravan departs Egypt with his shirt, Ya'qub senses it from across the distance:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَمَّا فَصَلَتِ الْعِيرُ قَالَ أَبُوهُمْ إِنِّي لَأَجِدُ رِيحَ يُوسُفَ ۖ لَوْلَا أَن تُفَنِّدُونِ</p>
    <p class="translation">"And when the caravan departed, their father said: 'Indeed, I find the scent of Yusuf — if only you did not think me senile.'"</p>
    <cite>Surah Yusuf (12:94)</cite>
  </blockquote>

  <p><strong>Inni la-ajidu riha Yusuf</strong> — "I find the scent of Yusuf." The verb <strong>ajidu</strong> — I find, I perceive — and <strong>rih</strong> — scent, wind, spirit. Across whatever distance separates the caravan from the blind old man, Ya'qub perceives his son. The faculty that went dark in his eyes seems to have migrated to another sense entirely. He cannot see. He can smell his son's shirt from a journey's distance away.</p>

  <p><strong>Lawla an tufannidun</strong> — "if only you would not think me senile." <strong>Tufannidun</strong> — from <strong>f-n-d</strong>, to declare someone's mind weakened by age. He knows how this sounds. A blind old man claiming to smell his missing son from hundreds of miles away. He preempts the accusation: I know you think I've lost my mind. He adds the qualifier because he is sane — and sane enough to know that what he perceives sounds insane to those who cannot perceive it.</p>

  <p>The family members around him confirm his expectation:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا تَاللَّهِ إِنَّكَ لَفِي ضَلَالِكَ الْقَدِيمِ</p>
    <p class="translation">"They said: 'By Allah, indeed you are in your old error.'"</p>
    <cite>Surah Yusuf (12:95)</cite>
  </blockquote>

  <p><strong>Dalalika al-qadim</strong> — "your old error." They categorize his hope as delusion. The same intuition that correctly diagnosed their plot, that accurately predicted the <strong>kayd</strong>, that sustained him through decades of grief — they call it <strong>dalal</strong>, error. The father's knowledge has been consistent throughout the surah. The sons have been wrong at every turn — their assessment of Yusuf, their plot's success, their cover story, their understanding of events in Egypt. And yet they call him the deluded one.</p>

  <p>The shirt arrives. It is placed on his face. His sight returns. And the sons who called him deluded say:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا يَا أَبَانَا اسْتَغْفِرْ لَنَا ذُنُوبَنَا إِنَّا كُنَّا خَاطِئِينَ</p>
    <p class="translation">"They said: 'O our father, ask forgiveness for us of our sins. Indeed, we have been sinners.'"</p>
    <cite>Surah Yusuf (12:97)</cite>
  </blockquote>

  <p>The intuition was right all along. The father who knew what he could not prove is vindicated not by argument but by event. The shirt that was used to deceive becomes the instrument of healing. The sons who called him deluded ask him for the one thing only a prophet can offer: <strong>istighfar</strong>, intercession for forgiveness. The man they dismissed becomes the only person who can help them. Ya'qub's response — <strong>sawfa astaghfiru lakum rabbi</strong>, "I will ask forgiveness for you from my Lord" (12:98) — extends the mercy he has carried through every scene. Even now, even vindicated, he does not refuse them.</p>
</article>`
    }
  },
  {
    primaryEntity: YAQUB_ID,
    article: {
      title: "Sabr Jamil: Ya'qub's Beautiful Patience as a Quranic Standard",
      slug: "sabr-jamil-yaqubs-beautiful-patience-as-a-quranic-standard",
      type: 'article',
      excerpt: "Ya'qub coined the phrase 'sabr jamil' — beautiful patience. The Quran preserves it as a standard: patience that grieves without complaining to creation, that endures without performing, that holds its form under decades of pressure.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['yaqub', 'quranic-characters', 'sabr'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The phrase <strong>sabr jamil</strong> appears twice in Surah Yusuf, both times spoken by Ya'qub. The first occurrence follows Yusuf's disappearance. The second follows Binyamin's detention. In both cases, Ya'qub faces a loss he cannot prevent, cannot investigate, and cannot remedy — and in both cases, his chosen response is the same two words: <strong>fa-sabrun jamil</strong>.</p>

  <h2>What Makes Patience Beautiful</h2>

  <p>The root <strong>j-m-l</strong> means beauty — the kind of beauty that arises from proportion, completeness, and harmony. A <strong>jamal</strong> (camel) carries the name because of the completeness of its design for its environment. Something <strong>jamil</strong> is not merely attractive — it is rightly formed. It fits. It holds together.</p>

  <p><strong>Sabr jamil</strong>, then, is patience that holds together. Patience that does not crack into resentment on one side or collapse into despair on the other. Patience that maintains its architecture under pressure — the way a well-built arch holds weight not by rigidity but by distributing force evenly across the curve.</p>

  <p>Ya'qub's grief is extreme — the Quran records white eyes and decades of sorrow. His patience is not the absence of grief. It is the form the grief takes. The grief is present. The patience shapes it — channels it toward Allah (<strong>innama ashku baththi wa huzni ila Allah</strong>), prevents it from becoming public accusation, maintains the relationship with the sons who caused the pain, and holds open the possibility of restoration (<strong>'asa Allahu an ya'tiyani bihim jami'an</strong>).</p>

  <p>The beauty of the patience is in what it preserves: dignity, family bonds, trust in Allah, and hope — all simultaneously, all under the weight of unresolved grief. The patience is beautiful because nothing essential is broken by it. The man who practices <strong>sabr jamil</strong> emerges from the trial with every relationship and every belief intact, even if his eyes are white and his heart is heavy.</p>

  <h2>The Phrase in the Quran's Wider Use</h2>

  <p>The phrase <strong>sabr jamil</strong> reappears outside Surah Yusuf — in Surah Al-Ma'arij, Allah instructs the Prophet Muhammad:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَاصْبِرْ صَبْرًا جَمِيلًا</p>
    <p class="translation">"So be patient with a beautiful patience."</p>
    <cite>Surah Al-Ma'arij (70:5)</cite>
  </blockquote>

  <p>The same phrase. The same standard. Ya'qub's practice becomes the Prophet's instruction. The father who waited for Yusuf and the Prophet who waited for his community's guidance are linked by the same two words. The patience required of prophets is always <strong>jamil</strong> — always shaped, always proportioned, always maintaining its form.</p>

  <p>What <strong>sabr jamil</strong> is not: it is not passive. Ya'qub acts throughout his story — he warns Yusuf about the dream, he sends his sons to Egypt, he instructs them to enter through different gates, he perceives Yusuf's scent across a continent. The patience coexists with action. It is not resignation. It is sustained trust enacted through continued engagement with the world, even when the world has taken what you love most.</p>

  <p>Ya'qub's two words — spoken in crisis, repeated in crisis, preserved across the surah — became a standard that outlasted the story that produced them. Every Muslim who faces loss and reaches for <strong>sabr jamil</strong> is reaching for a phrase coined by a blind father in a tent, waiting for a son he could smell but could not see, trusting a promise he could not prove, and holding together a grief so vast it changed the color of his eyes.</p>
</article>`
    }
  },
  // === AYYUB (1 to top up to 3) ===
  {
    primaryEntity: AYYUB_ID,
    article: {
      title: "Ayyub's Prayer: The Most Compressed Du'a in the Quran",
      slug: "ayyubs-prayer-the-most-compressed-dua-in-the-quran",
      type: 'article',
      excerpt: "Ayyub's entire prayer in the Quran is eight Arabic words. After years of suffering, he does not explain his pain, does not list his losses, does not argue his case. He states the fact and names the attribute.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['ayyub', 'quranic-characters', 'dua', 'sabr'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">After a trial that tradition describes as lasting eighteen years — illness that consumed his body, loss that took his wealth and his children, social exile that removed every human comfort — Ayyub prays. The Quran records the prayer. It is eight words long.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَيُّوبَ إِذْ نَادَىٰ رَبَّهُ أَنِّي مَسَّنِيَ الضُّرُّ وَأَنتَ أَرْحَمُ الرَّاحِمِينَ</p>
    <p class="translation">"And Ayyub, when he called to his Lord: 'Indeed, adversity has touched me, and You are the most merciful of the merciful.'"</p>
    <cite>Surah Al-Anbiya (21:83)</cite>
  </blockquote>

  <p>Two clauses. The first: <strong>anni massaniya ad-durr</strong> — "adversity has touched me." The verb <strong>massa</strong> — to touch — is the lightest possible contact verb. After years of suffering that reduced a prosperous man to isolation and illness, Ayyub describes his condition as having been "touched" by adversity. The restraint is extraordinary. The word <strong>durr</strong> — harm, adversity, hardship — is a general term that covers everything without specifying anything. He does not catalog his losses. He does not describe his symptoms. He does not explain how long it has lasted. He states the minimum: adversity has touched me.</p>

  <p>The second clause: <strong>wa anta arham ar-rahimin</strong> — "and You are the most merciful of the merciful." He does not ask for healing. He does not request the restoration of his wealth. He does not name what he wants. He names an attribute of Allah — <strong>arham ar-rahimin</strong>, the most merciful of those who show mercy — and lets the attribute do the work. The prayer is structured as: here is my condition; here is Your nature. The gap between the two is the request, implied but never spoken.</p>

  <h2>What the Compression Reveals</h2>

  <p>The brevity is the message. A man who has suffered for years and prays in eight words has refined his relationship with Allah to its essential chemistry. No excess. No performance. No elaborate framing. The prayer is not a speech. It is a signal — the minimum necessary to establish the two coordinates: where I am (in <strong>durr</strong>) and who You are (<strong>arham ar-rahimin</strong>). Everything else — the history, the pain, the longing for restoration — is understood without being said.</p>

  <p>Compare this with other Quranic prayers. Zakariyya's prayer in Surah Maryam runs several ayahs — he describes his bones, his hair, his wife's barrenness, his fear for the future. Ibrahim's prayers span multiple surahs and cover themes from progeny to pilgrimage to protection. Musa prays at the burning bush about his chest, his tongue, his fear. These are full prayers, rich in detail and specificity.</p>

  <p>Ayyub's prayer strips all of that away. The years of suffering have burned off every unnecessary word. What remains is the skeleton of prayer: I am in need. You are the source. The simplicity is not a failure of eloquence. It is the product of endurance so sustained that language has been refined to its purest form.</p>

  <h2>The Response</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَاسْتَجَبْنَا لَهُ فَكَشَفْنَا مَا بِهِ مِن ضُرٍّ ۖ وَآتَيْنَاهُ أَهْلَهُ وَمِثْلَهُم مَّعَهُمْ رَحْمَةً مِّنْ عِندِنَا وَذِكْرَىٰ لِلْعَابِدِينَ</p>
    <p class="translation">"So We responded to him and removed what afflicted him of adversity. And We gave him his family and the like of them with them — as mercy from Us and a reminder for the worshippers."</p>
    <cite>Surah Al-Anbiya (21:84)</cite>
  </blockquote>

  <p><strong>Fastajabna lahu</strong> — "so We responded to him." The response matches the prayer's compression with its own compression: We responded. Immediately. No delay narrated, no condition imposed, no test extended. The response is as direct as the prayer. <strong>Fa-kashafna ma bihi min durr</strong> — "We removed what was with him of adversity." The verb <strong>kashafa</strong> — to uncover, to remove, to lift — is the same verb used for removing a veil. The adversity is lifted like a covering is lifted — and what was underneath (health, wholeness, capacity) was there all along, waiting to be uncovered.</p>

  <p><strong>Wa ataynahu ahlahu wa mithlahum ma'ahum</strong> — "We gave him his family and the like of them with them." The restoration is doubled. He receives his family back and their equivalent again. The standard in Islamic understanding is that what was lost through patience is returned multiplied. The man who lost everything and said eight words receives everything back, doubled.</p>

  <p>The closing: <strong>rahmatan min 'indina wa dhikra lil-'abidin</strong> — "as mercy from Us and a reminder for the worshippers." Two purposes. First: <strong>rahmah</strong>, mercy — the very attribute Ayyub named in his prayer (<strong>arham ar-rahimin</strong>) is the attribute that drives the response. He called upon mercy and mercy answered. Second: <strong>dhikra lil-'abidin</strong>, a reminder for the worshippers. Ayyub's story is preserved not just as history but as instruction — a demonstration, for everyone who worships, of what happens when a person in adversity calls upon the mercy of the Most Merciful with nothing but the truth of their condition and the trust in His nature.</p>

  <p>Eight words. A lifetime of suffering. A response without delay. A restoration beyond the original. The prayer of Ayyub is the Quran's proof that du'a does not require length, eloquence, or elaborate construction. It requires two things: honesty about your state and knowledge of His attributes. <strong>Massaniya ad-durr. Wa anta arham ar-rahimin.</strong> The rest is silence. The silence is the prayer.</p>
</article>`
    }
  },
  // === YAHYA (2 more to top up to 3) ===
  {
    primaryEntity: YAHYA_ID,
    secondaryEntities: [ISA_ID],
    article: {
      title: "Yahya and 'Isa: Two Births, One Surah, and the Architecture of the Miraculous",
      slug: "yahya-and-isa-two-births-one-surah-architecture-of-the-miraculous",
      type: 'article',
      excerpt: "Surah Maryam places the birth of Yahya and the birth of 'Isa side by side. Both are announced by angels. Both are impossible by natural means. The pairing is deliberate — and the differences are as instructive as the parallels.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['yahya', 'isa', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Surah Maryam opens with Zakariyya's prayer and the announcement of Yahya. It then transitions — without a break, without a separate chapter heading, without a shift in register — directly into the story of Maryam and the announcement of 'Isa. The two birth narratives are placed back to back, each one impossible, each one divinely decreed, each one announced by angels. The Quran pairs them as a diptych — two panels that illuminate each other.</p>

  <h2>The Parallels</h2>

  <p>Both births are announced with <strong>bushra</strong> — glad tidings. Zakariyya receives <strong>nubashshiruka bi-ghulam</strong> (19:7). Maryam receives <strong>li-ahaba laki ghulaman zakiyyan</strong> (19:19). Both involve a parent who questions the biological possibility. Zakariyya says: my wife is barren, I am old. Maryam says: no man has touched me. Both receive the same structural answer: <strong>kadhaliki</strong> — "thus it will be" — followed by an assertion that it is easy for Allah.</p>

  <p>Both children receive divine attributes before birth. Yahya is given <strong>hukm</strong> (judgment) as a boy, <strong>hanan</strong> (tenderness), <strong>zakat</strong> (purity). 'Isa is called <strong>zakiyyan</strong> (pure) and described as a <strong>kalimah</strong> (word) from Allah. Both are covered with <strong>salam</strong> at the three thresholds of existence: birth, death, and resurrection.</p>

  <h2>The Differences</h2>

  <p>The differences are equally precise. Zakariyya has a wife — <strong>imra'ati 'aqiran</strong>, my wife is barren. The obstacle is biological dysfunction within an existing marriage. Maryam has no husband — <strong>lam yamsasni bashar</strong>, no man has touched me. The obstacle is the complete absence of the biological mechanism. Yahya's birth is improbable. 'Isa's birth is, by natural standards, impossible. The Quran places the improbable first, then escalates to the impossible — training the reader's capacity for wonder in stages.</p>

  <p>Zakariyya's sign is silence — three days without speech. Maryam's instruction is also silence — <strong>fa-imma tarayinna min al-bashari ahadan fa-quli inni nadhartu lir-rahmani sawman fa-lan ukallima al-yawma insiyya</strong>, "if you see any human, say: I have vowed a fast of silence to the Most Merciful, and I will not speak to any person today" (19:26). Both parents are silenced. The silence that accompanied Zakariyya's sign reappears in Maryam's instruction. The pattern is not coincidental — it is structural. Before the miraculous child speaks, the parent is silent. The silence creates the space for the child's voice.</p>

  <p>And then the crucial difference: Yahya does not speak from the cradle. 'Isa does. Yahya's portrait is composed of attributes — <strong>hukm</strong>, <strong>hanan</strong>, <strong>zakat</strong>, <strong>taqwa</strong>, <strong>birr</strong> — listed but not dramatized. 'Isa's portrait begins with a dramatic scene: the baby speaks, identifies himself as a servant of Allah, announces his prophethood, and lists his future miracles. The Quran gives Yahya a still portrait and 'Isa a speaking one. Both are complete. The media differ.</p>

  <h2>Why the Pairing</h2>

  <p>The back-to-back placement serves a theological function. By presenting two miraculous births in sequence — one improbable, one impossible — the Quran establishes that divine creative power does not operate on a binary (natural/supernatural) but on a spectrum. A barren woman conceiving in old age is surprising. A virgin conceiving without a father is more surprising. Both operate by the same principle: <strong>idha qada amran fa-innama yaqulu lahu kun fa-yakun</strong> — "when He decrees a matter, He only says to it: 'Be,' and it is" (19:35).</p>

  <p>The <strong>kun</strong> verse appears after both narratives — as though the Quran waits for both stories to land and then provides the unified explanation. Both births are instances of <strong>kun</strong>. The old couple and the virgin and the barren wife — all of them are contexts in which the divine command operates with the same efficacy. The ease is the same. <strong>Huwa 'alayya hayyinun</strong> — it is easy for Me — applies to both.</p>

  <p>The pairing also prevents either birth from being misunderstood in isolation. If the Quran presented only 'Isa's miraculous birth, a reader might conclude that the fatherless origin implies divinity. But Yahya's birth — also miraculous, also angel-announced, also preceded by parental doubt and divine reassurance — demonstrates that miraculous births are a category in the Quran, not a unique event. Miracles of birth point to the power of the One who decrees, not to the nature of the one born.</p>

  <p>Yahya and 'Isa are cousins. Their mothers — the wife of Zakariyya and Maryam — are related. The family tree that produces both children is itself a sign: one household, two impossible births, two prophets, two servants of Allah who begin their existence as evidence of divine creative freedom. The architecture of Surah Maryam holds them together because they belong together — not as competitors for miraculous status but as companion proofs that <strong>kun fa-yakun</strong> operates wherever Allah directs it, in whatever form He chooses, regardless of what biology considers possible.</p>
</article>`
    }
  },
  {
    primaryEntity: YAHYA_ID,
    article: {
      title: "The Name No One Had Carried: Yahya and the Quran's Theology of Naming",
      slug: "the-name-no-one-had-carried-yahya-and-the-qurans-theology-of-naming",
      type: 'article',
      excerpt: "Allah named Yahya directly — and specified that no one before him had ever carried this name. In a tradition where names carry weight and lineage carries memory, an unprecedented name is itself a statement about the child's mission.",
      reading_time_minutes: 9,
      status: 'published',
      tags: ['yahya', 'quranic-characters'],
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
      content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">When the announcement comes to Zakariyya, the child is not left for the parents to name. Allah names him directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ لَمْ نَجْعَل لَّهُ مِن قَبْلُ سَمِيًّا</p>
    <p class="translation">"O Zakariyya, indeed We give you good tidings of a boy whose name is Yahya. We have not assigned this name to anyone before."</p>
    <cite>Surah Maryam (19:7)</cite>
  </blockquote>

  <p>Three elements. The child is named: <strong>ismuhu Yahya</strong>. The name is divinely assigned — not chosen by parents, not inherited from an ancestor, not selected from the family's naming tradition. And the qualifier: <strong>lam naj'al lahu min qablu samiyyan</strong> — "We have not made for him any namesake before." The word <strong>samiyy</strong> means one who shares the same name — a namesake. The Quran declares that Yahya's name has no precedent. No one in human history before this child carried this name.</p>

  <h2>The Root</h2>

  <p><strong>Yahya</strong> — the name itself is a verb form from the root <strong>h-y-y</strong>, which means to live, to be alive, to give life. <strong>Yahya</strong> can be read as "he lives" or "he gives life" or "he is alive." The name is semantically loaded: a child given to parents who had given up on biological life (the barren wife, the brittle-boned husband) carries a name that means life itself.</p>

  <p>The root <strong>h-y-y</strong> is one of the most theologically significant in the Quran. <strong>Al-Hayy</strong> — the Ever-Living — is one of Allah's names. <strong>Hayat</strong> — life — is what distinguishes the created world from void. <strong>Ihya'</strong> — giving life — is the act that defines divine creative power. When Allah names a child <strong>Yahya</strong>, He assigns him a name that echoes the divine attribute of life-giving. The child does not possess the attribute — he carries its echo. He is a sign of it, named for it, pointing toward it.</p>

  <h2>The Unprecedented Name</h2>

  <p>In ancient cultures — and particularly in the Abrahamic traditions — naming followed lineage. You named your son after his grandfather, his great-uncle, a patriarch of the tribe. Names carried memory. They connected the newborn to a chain of ancestors, embedding the child in a history before the child created any history of its own. To give a child a name no one has ever carried is to break the chain deliberately — to announce that this child begins something rather than continuing it.</p>

  <p>The Quran's specification — <strong>lam naj'al lahu min qablu samiyyan</strong> — is not a casual detail. It is a theological statement: Yahya is not a continuation. He is an initiation. His mission, his character, his role in the prophetic timeline — all of it is new. He confirms what came before (as the Quran says, he is <strong>musaddiqan bi-kalimatin min Allah</strong>, "confirming a word from Allah" — i.e., confirming 'Isa) but he carries a name that has no predecessor. The confirmation of the old arrives in a package that is entirely new.</p>

  <p>Only two figures in the Quran receive this designation of an unprecedented name: Yahya (<strong>lam naj'al lahu min qablu samiyyan</strong>) and, by implication, Adam (who was taught all the names but was himself the first to be named). The human story begins with a name and the prophetic story approaches its final phase with a name no one had heard before. The bookends of naming — Adam who received names and Yahya who received one no one had ever carried — frame the entire prophetic narrative as a history written in names.</p>

  <p>The child who was named "life" by the Giver of Life, whose name had no precedent in human history, whose attributes were listed as tenderness and purity and taqwa, whose three-salam covering spans birth and death and resurrection — this child was Allah's answer to a whisper in a private chamber. The unprecedented name began as a du'a so quiet it could barely be heard: <strong>nida'an khafiyyan</strong>. The whisper produced a name that had never existed. The private call created something the world had never heard. The prayer of the old man was answered with the birth of the new.</p>
</article>`
    }
  }
]

async function main() {
  // Resolve YUSUF_ID
  const yusufRes = await supabase.from('entities').select('id').eq('slug','yusuf').single()
  YUSUF_ID = yusufRes.data?.id
  console.log("Inserting Ya'qub, Ayyub, Yahya articles...")
  for (const { article, primaryEntity, secondaryEntities } of batch) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: primaryEntity, is_primary: true })
    if (secondaryEntities) {
      for (const secId of secondaryEntities) {
        if (secId) await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: secId, is_primary: false })
      }
    }
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log(`✓ Done! ${batch.length} articles.`)
}
main().catch(console.error)
