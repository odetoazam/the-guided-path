#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ZAKARIYYA_ENTITY_ID = '178975a6-a53a-48db-8426-00adba42422f'
const YAHYA_ENTITY_ID = 'c372ba93-037b-447c-84a4-f3866c48cba4'
const ISA_ENTITY_ID = '14ec6c99-9696-4592-8945-ef905403b3ce'

const articles = [
  {
    title: "The Prayer in the Chamber: Zakariyya and the Impossible Request",
    slug: "the-prayer-in-the-chamber-zakariyya-and-the-impossible-request",
    type: 'article' as const,
    excerpt: "An old man. A barren wife. A prayer whispered in a private chamber. Zakariyya asks for something biology has foreclosed — and the Quran records both the prayer's intimacy and its audacity.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['zakariyya', 'quranic-characters', 'dua'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Surah Maryam opens with a prayer so private that the Quran specifies the volume at which it was uttered and the location in which it took place. Before the content of the prayer is revealed, its manner is described — and the manner is the first lesson.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِذْ نَادَىٰ رَبَّهُ نِدَاءً خَفِيًّا</p>
    <p class="translation">"When he called to his Lord, a private call."</p>
    <cite>Surah Maryam (19:3)</cite>
  </blockquote>

  <p><strong>Nida'an khafiyyan</strong> — "a call, hidden." The root <strong>kh-f-y</strong> means to conceal, to hide, to keep from view. The prayer is <strong>khafiyy</strong> — concealed, whispered, inaudible to anyone but Allah. Zakariyya does not pray in the mosque before the community. He does not raise his hands in public supplication. He retreats to a <strong>mihrab</strong> — a private chamber, an alcove, a niche — and whispers.</p>

  <p>The Quran's decision to record the volume of the prayer before its content is a statement about prayer itself. The effectiveness of du'a is not correlated with volume. The most powerful prayer in Surah Maryam is the quietest. The old man's whisper reaches further than any public declaration.</p>

  <h2>The Inventory</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ رَبِّ إِنِّي وَهَنَ الْعَظْمُ مِنِّي وَاشْتَعَلَ الرَّأْسُ شَيْبًا وَلَمْ أَكُن بِدُعَائِكَ رَبِّ شَقِيًّا</p>
    <p class="translation">"He said: 'My Lord, indeed my bones have weakened, and my head has filled with white, and never have I been in my supplication to You, my Lord, unhappy.'"</p>
    <cite>Surah Maryam (19:4)</cite>
  </blockquote>

  <p>Three statements. First: <strong>wahana al-'adhmu minni</strong> — "the bone has weakened from me." Not "my bones are weak" but "the bone has weakened from me" — as though strength has departed the skeletal frame, leaving the structure standing but hollowed. The singular <strong>al-'adhm</strong> (the bone) rather than the plural makes it feel more intimate — a man aware of his own skeleton, feeling the infrastructure give way.</p>

  <p>Second: <strong>ishta'ala ar-ra'su shayban</strong> — "the head has ignited with white." The verb <strong>ishta'ala</strong> means to blaze, to catch fire, to ignite. Gray hair is described as fire spreading across the head. The metaphor is vivid and precise — the white has spread the way flame spreads, consuming what was there before. Hair is kindling. Age is fire.</p>

  <p>Third: <strong>wa lam akun bi-du'a'ika rabbi shaqiyyan</strong> — "and I have never been, in my calling upon You, my Lord, unhappy." <strong>Shaqiyy</strong> — wretched, unfortunate, unhappy in outcome. Zakariyya's third statement is not about his body but about his history with prayer. He has prayed before. He has been answered before. His track record with du'a is positive. He cites this history as the basis for asking again. The prayer is not a shot in the dark. It is a continuation of a relationship that has consistently yielded.</p>

  <h2>What He Asks</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَهَبْ لِي مِن لَّدُنكَ وَلِيًّا ۝ يَرِثُنِي وَيَرِثُ مِنْ آلِ يَعْقُوبَ ۖ وَاجْعَلْهُ رَبِّ رَضِيًّا</p>
    <p class="translation">"So grant me from Yourself an heir — who will inherit me and inherit from the family of Ya'qub. And make him, my Lord, pleasing."</p>
    <cite>Surah Maryam (19:5-6)</cite>
  </blockquote>

  <p><strong>Hab li min ladunka waliyyan</strong> — "grant me from Yourself a protector/heir." The word <strong>waliyy</strong> — from <strong>w-l-y</strong> — means protector, ally, one who is close, one who takes charge. <strong>Min ladunka</strong> — "from Your special presence" — indicates that what Zakariyya asks for cannot come through normal channels. The biological route is closed. He is old. His wife is barren. What he asks for must come <strong>min ladunka</strong> — from the special, direct provision of Allah, bypassing the usual means.</p>

  <p>The child will serve a dual inheritance: <strong>yarithuni wa yarithu min ali Ya'qub</strong> — he will inherit from me and from the family of Ya'qub. The inheritance is prophetic lineage, not wealth. Zakariyya worries about the continuation of religious knowledge and practice after his death. His concern is institutional — who will carry the teaching? — and personal — who will carry the name?</p>

  <p><strong>Waj'alhu rabbi radiyyan</strong> — "and make him pleasing." <strong>Radiyy</strong> from <strong>r-d-y</strong> — pleasing, satisfactory, one with whom both God and people are content. The final request is not for power or success for the child. It is for acceptability — <strong>rida</strong>, divine pleasure. Make him someone You are pleased with.</p>

  <h2>The Answer</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">يَا زَكَرِيَّا إِنَّا نُبَشِّرُكَ بِغُلَامٍ اسْمُهُ يَحْيَىٰ لَمْ نَجْعَل لَّهُ مِن قَبْلُ سَمِيًّا</p>
    <p class="translation">"O Zakariyya, indeed We give you good tidings of a boy whose name is Yahya. We have not assigned this name to anyone before."</p>
    <cite>Surah Maryam (19:7)</cite>
  </blockquote>

  <p>The child is named before he is born. The name — <strong>Yahya</strong> — carries the root <strong>h-y-y</strong>, life. The child named "life" comes to a man whose bones have weakened and whose head has blazed white. And the Quran adds: <strong>lam naj'al lahu min qablu samiyyan</strong> — "We have not assigned this name to anyone before." The name is unprecedented. No one before Yahya was called Yahya. The child's uniqueness begins with his name.</p>

  <p>Zakariyya's response mirrors Maryam's when she receives her own impossible announcement:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ رَبِّ أَنَّىٰ يَكُونُ لِي غُلَامٌ وَكَانَتِ امْرَأَتِي عَاقِرًا وَقَدْ بَلَغْتُ مِنَ الْكِبَرِ عِتِيًّا</p>
    <p class="translation">"He said: 'My Lord, how can I have a boy when my wife is barren and I have reached extreme old age?'"</p>
    <cite>Surah Maryam (19:8)</cite>
  </blockquote>

  <p><strong>'Aqiran</strong> — barren. <strong>'Itiyyan</strong> — extreme age, the point where age has become brittleness. The word <strong>'itiyy</strong> carries a sense of dryness, of wood that has dried past the point of flexibility. He is brittle with age. She is barren. Both biological conditions point the same direction: away from conception. And yet he asked. And yet the answer came.</p>

  <p>The response to his doubt mirrors the response to Maryam's: <strong>kadhalika</strong> — "thus it will be." The word does not argue. It does not explain the mechanism. It simply asserts the outcome. The prayer whispered in the chamber — <strong>nida'an khafiyyan</strong> — reaches the One who hears what is hidden, and the hidden prayer receives an answer that overrides what biology has foreclosed.</p>
</article>`
  },
  {
    title: "Yahya: The Boy Given Judgment as a Child",
    slug: "yahya-the-boy-given-judgment-as-a-child",
    type: 'article' as const,
    excerpt: "The Quran gives Yahya four qualities in rapid succession: hold the Book with strength, judgment as a child, tenderness from Us, and purity. The portrait is compressed but complete — a life sketched in four strokes.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['yahya', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran's portrait of Yahya is among its most compressed. In a handful of ayahs, it provides a complete character — not through narrative or dialogue, but through a list of attributes so precisely chosen that each one illuminates the others. Yahya is not given a story in the conventional sense. He is given a description. And the description is the story.</p>

  <h2>The Command</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">يَا يَحْيَىٰ خُذِ الْكِتَابَ بِقُوَّةٍ ۖ وَآتَيْنَاهُ الْحُكْمَ صَبِيًّا</p>
    <p class="translation">"'O Yahya, take the Book with strength.' And We gave him judgment as a boy."</p>
    <cite>Surah Maryam (19:12)</cite>
  </blockquote>

  <p><strong>Khudhi al-kitab bi-quwwah</strong> — "take the Book with strength." The verb <strong>khudh</strong> — take, seize, hold — is imperative. <strong>Bi-quwwah</strong> — with strength, with force, with seriousness. The Book — <strong>al-kitab</strong>, the Torah — is not to be received passively. It is to be seized with the full force of the recipient's capacity. The instruction addresses the common failure: receiving scripture casually, carrying it without commitment, holding it loosely enough that it slips.</p>

  <p>Then the Quran shifts from command to description: <strong>wa ataynahul-hukma sabiyyan</strong> — "and We gave him judgment as a boy." <strong>Hukm</strong> — judgment, wisdom, the capacity to distinguish correctly between options — is given to him at an age when other children are still learning language. <strong>Sabiyyan</strong> — as a boy, as a child. The two words together — <strong>hukm</strong> and <strong>sabiyy</strong> — create a paradox: the gravitas of judicial discernment housed in the frame of a child. Wisdom before age would normally produce it.</p>

  <h2>The Four Qualities</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَحَنَانًا مِّن لَّدُنَّا وَزَكَاةً ۖ وَكَانَ تَقِيًّا</p>
    <p class="translation">"And tenderness from Us, and purity. And he was God-fearing."</p>
    <cite>Surah Maryam (19:13)</cite>
  </blockquote>

  <p>Three gifts, then one permanent attribute. <strong>Hananan</strong> — tenderness, compassion, a word that carries the root <strong>h-n-n</strong>, which evokes yearning, gentleness, the kind of love a parent feels. The tenderness is <strong>min ladunna</strong> — "from Our special presence." It is not a learned behavior. It is a direct divine endowment. The child who was given judicial strength (<strong>hukm</strong>) is simultaneously given emotional tenderness (<strong>hanan</strong>). The Quran holds both — authority and softness — in the same person without contradiction.</p>

  <p><strong>Wa zakatan</strong> — and purity. <strong>Zakat</strong> here means purification — the same root that gives us the financial obligation of zakat (purifying alms). Yahya's inner state is <strong>zaki</strong> — purified, clean, growing in a direction that is morally upward. The purity is pre-behavioral — he is pure before the Quran describes what he does.</p>

  <p><strong>Wa kana taqiyyan</strong> — "and he was God-fearing." <strong>Taqiyy</strong> — intensely conscious of Allah, protective of the boundaries, aware at all times of the divine gaze. The verb <strong>kana</strong> — "he was" — marks this as a permanent state, not an occasional achievement. His <strong>taqwa</strong> was his baseline.</p>

  <h2>The Relational Portrait</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَبَرًّا بِوَالِدَيْهِ وَلَمْ يَكُن جَبَّارًا عَصِيًّا</p>
    <p class="translation">"And dutiful to his parents, and he was not a tyrant or disobedient."</p>
    <cite>Surah Maryam (19:14)</cite>
  </blockquote>

  <p><strong>Barran bi-walidayhi</strong> — "dutiful to his parents." <strong>Birr</strong> — from <strong>b-r-r</strong> — is a comprehensive word for goodness, righteousness, devotion. When applied to parents, it means the sustained, daily, undramatic practice of care — not a single heroic act but the accumulated weight of consistent attention. The child whose prayer his father whispered for grows into a man who returns that care.</p>

  <p>Then the double negative: <strong>wa lam yakun jabbaran 'asiyyan</strong> — "and he was not a tyrant or disobedient." <strong>Jabbar</strong> — from <strong>j-b-r</strong> — is the word 'Ad's people embodied: the one who compels, who dominates through force. <strong>'Asiyy</strong> — from <strong>'-s-y</strong> — is one who rebels, who breaks commands. Yahya is defined by what he is not: not tyrannical, not rebellious. In a child given authority (<strong>hukm</strong>) before puberty, the absence of tyranny is itself remarkable. Power given early usually corrupts early. Yahya carries judgment without becoming a <strong>jabbar</strong>.</p>

  <h2>The Three Salams</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَسَلَامٌ عَلَيْهِ يَوْمَ وُلِدَ وَيَوْمَ يَمُوتُ وَيَوْمَ يُبْعَثُ حَيًّا</p>
    <p class="translation">"And peace be upon him the day he was born, the day he dies, and the day he is raised alive."</p>
    <cite>Surah Maryam (19:15)</cite>
  </blockquote>

  <p>Three <strong>salams</strong> covering three thresholds. <strong>Yawma wulida</strong> — the day he was born. The passage from non-existence to existence. <strong>Yawma yamutu</strong> — the day he dies. The passage from existence to death. <strong>Yawma yub'athu hayyan</strong> — the day he is raised alive. The passage from death to eternal life. At each transition — the three moments when the self is most vulnerable, most exposed, most in need of protection — <strong>salam</strong> is pronounced.</p>

  <p>The same three-salam structure appears for 'Isa — but in the first person. 'Isa says <strong>wa as-salamu 'alayya</strong> from the cradle (19:33). For Yahya, the salam comes from Allah in the third person. The difference is subtle but significant: 'Isa pronounces his own peace. Yahya's peace is pronounced for him. Both receive the same covering, but through different grammar. 'Isa speaks. For Yahya, Allah speaks.</p>

  <p>The portrait is complete. A boy given an unprecedented name, endowed with judgment before adolescence, carrying both authority and tenderness, purified and God-conscious, dutiful to the parents whose prayer brought him into existence, and covered with divine peace at the three thresholds of existence. No narrative. No dialogue preserved beyond the opening command. The Quran draws Yahya in attributes rather than events — and the attributes compose a life that needed no dramatic incident to prove its worth. The quiet portrait is the whole story.</p>
</article>`
  },
  {
    title: "Zakariyya's Sign: The Prophet Who Was Silenced to Speak",
    slug: "zakariyyas-sign-the-prophet-who-was-silenced-to-speak",
    type: 'article' as const,
    excerpt: "After his prayer was answered, Zakariyya received a strange sign: he would be unable to speak for three days. The prophet given good news is silenced — and the silence becomes its own form of praise.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['zakariyya', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Zakariyya asks for a sign — <strong>ayah</strong> — that the promise is real. He has been told he will have a son. He believes it. But he asks for a sign, not to prove divinity but to mark the beginning of the miracle's unfolding. The sign he receives is unlike any other sign in the Quran.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ رَبِّ اجْعَل لِّي آيَةً ۖ قَالَ آيَتُكَ أَلَّا تُكَلِّمَ النَّاسَ ثَلَاثَ لَيَالٍ سَوِيًّا</p>
    <p class="translation">"He said: 'My Lord, give me a sign.' He said: 'Your sign is that you will not speak to the people for three nights, being sound.'"</p>
    <cite>Surah Maryam (19:10)</cite>
  </blockquote>

  <p>The sign is silence. <strong>Alla tukallima an-nasa</strong> — "that you will not speak to the people." The verb <strong>tukallima</strong> — from <strong>k-l-m</strong>, to speak — is negated. For three nights — <strong>thalatha layalin</strong> — he will be unable to produce speech. And the qualifier: <strong>sawiyyan</strong> — "being sound," meaning physically healthy. His vocal cords are intact. His tongue functions. He is not ill. He simply cannot speak. The silence is imposed from above, not caused by below.</p>

  <p>In Surah Al 'Imran, the same sign is described with a different detail:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ آيَتُكَ أَلَّا تُكَلِّمَ النَّاسَ ثَلَاثَةَ أَيَّامٍ إِلَّا رَمْزًا</p>
    <p class="translation">"He said: 'Your sign is that you will not speak to the people for three days except by gesture.'"</p>
    <cite>Surah Al 'Imran (3:41)</cite>
  </blockquote>

  <p><strong>Illa ramzan</strong> — "except by gesture." The word <strong>ramz</strong> — from <strong>r-m-z</strong> — means to signal, to gesture, to communicate through signs rather than words. Zakariyya is not rendered incommunicative. He is rendered non-verbal. He can signal. He can gesture. He can point, nod, indicate. But he cannot produce <strong>kalam</strong> — articulate speech. The prophet whose profession is speech is temporarily relieved of his primary instrument.</p>

  <h2>What the Silence Means</h2>

  <p>The sign is paradoxical: the confirmation of good news arrives as a restriction. Zakariyya prayed in whispered privacy — <strong>nida'an khafiyyan</strong> — and now he is given even deeper privacy: a silence so complete that even the whisper is taken away. The trajectory is inward. He moves from quiet prayer to imposed silence — from choosing to speak softly to being unable to speak at all.</p>

  <p>The three days of silence create a space that only divine communication can fill. If Zakariyya cannot speak to people, the only conversation remaining is between himself and Allah. The sign is not a punishment. It is a cocoon — three days in which the man who received the greatest news of his life cannot share it with anyone, cannot process it socially, cannot diffuse it through discussion. He must sit with the news in silence and let it transform him internally before it transforms his world externally.</p>

  <p>The Quran then records what Zakariyya does with his imposed silence:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَخَرَجَ عَلَىٰ قَوْمِهِ مِنَ الْمِحْرَابِ فَأَوْحَىٰ إِلَيْهِمْ أَن سَبِّحُوا بُكْرَةً وَعَشِيًّا</p>
    <p class="translation">"So he came out to his people from the chamber and signaled to them: 'Glorify [Allah] morning and evening.'"</p>
    <cite>Surah Maryam (19:11)</cite>
  </blockquote>

  <p><strong>Fa-awha ilayhim</strong> — "he signaled to them." The verb <strong>awha</strong> — usually reserved for divine revelation — is used here for Zakariyya's gestured communication. The word choice elevates the gesture: what he communicates without voice carries the same verb as what Allah communicates to prophets. And the content of his silent message is <strong>sabbihu bukratan wa 'ashiyyan</strong> — "glorify Allah morning and evening."</p>

  <p>The man who cannot speak tells others to speak — in praise. The silent prophet's only instruction during his three days of voicelessness is: use your voices for <strong>tasbih</strong>. His silence becomes the frame for their sound. His inability to glorify verbally becomes the occasion for commanding others to glorify. The sign that took his speech produces more speech — directed upward, toward Allah, in the form of glorification.</p>

  <h2>The Gift Within the Restriction</h2>

  <p>Other prophets received signs that expanded their capacity — a staff that became a serpent, a hand that glowed white, the ability to shape clay into living birds. Zakariyya's sign contracts his capacity. It takes away rather than adding. And yet the taking away is itself the confirmation. The silence proves the promise is real because only divine authority could impose it. No illness explains it — he is <strong>sawiyy</strong>, sound. No physical cause accounts for it. The silence is an act of divine intervention as clearly as any miracle, but its direction is inward rather than outward. The sign is felt by the recipient, not witnessed by the audience.</p>

  <p>The three days of silence mirror the three days given to Thamud — but with inverted valence. Thamud's three days were a countdown to destruction. Zakariyya's three days are a countdown to birth. Both are periods of waiting. Both are defined by what is coming. But one waits for an end, and the other waits for a beginning. Salih's three days gave Thamud time to repent; they did not. Zakariyya's three days gave him time to absorb the miracle in silence — and he filled the silence with <strong>tasbih</strong> directed through gestures at a community that could still speak.</p>

  <p>The prayer that began in a private chamber as a whisper travels through silence into a wordless command for public praise. The arc of Zakariyya's story — from <strong>nida'an khafiyyan</strong> to three days of imposed silence to <strong>sabbihu bukratan wa 'ashiyyan</strong> — is the arc of prayer itself: it begins in private, passes through a period of waiting and silence, and emerges as praise that fills the morning and evening of the world.</p>
</article>`
  }
]

async function main() {
  console.log("Inserting Zakariyya/Yahya articles...")
  for (const article of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)

    // Tag based on content
    if (article.slug.includes('yahya')) {
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: YAHYA_ENTITY_ID, is_primary: true })
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: ZAKARIYYA_ENTITY_ID, is_primary: false })
    } else {
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: ZAKARIYYA_ENTITY_ID, is_primary: true })
      // Tag 'Isa as secondary since Zakariyya and Maryam's stories intertwine
      if (article.slug.includes('chamber')) {
        await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: YAHYA_ENTITY_ID, is_primary: false })
      }
    }
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log("✓ Done!", articles.length, "articles.")
}
main().catch(console.error)
