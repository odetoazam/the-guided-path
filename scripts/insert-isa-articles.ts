#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const ISA_ENTITY_ID = '14ec6c99-9696-4592-8945-ef905403b3ce'

const articles = [
  {
    title: "A Word From Him: The Quranic 'Isa Before the Cradle",
    slug: "a-word-from-him-the-quranic-isa-before-the-cradle",
    type: 'article' as const,
    excerpt: "The Quran calls 'Isa a 'word from Allah' — kalimatun minhu. Before he speaks from the cradle, before he shapes clay birds, before any miracle, the Quran defines him as language itself: a divine word cast into the world.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['isa', 'quranic-characters', 'maryam'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran's designation for 'Isa is unlike any other prophet's. He is not called a messenger alone, or a servant alone, though both words apply. He receives a title that no other human being in the Quran receives: <strong>kalimatun minhu</strong> — a word from Him.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِذْ قَالَتِ الْمَلَائِكَةُ يَا مَرْيَمُ إِنَّ اللَّهَ يُبَشِّرُكِ بِكَلِمَةٍ مِّنْهُ اسْمُهُ الْمَسِيحُ عِيسَى ابْنُ مَرْيَمَ</p>
    <p class="translation">"When the angels said: 'O Maryam, indeed Allah gives you good tidings of a word from Him, whose name is the Messiah, 'Isa, son of Maryam.'"</p>
    <cite>Surah Al 'Imran (3:45)</cite>
  </blockquote>

  <p>The structure is layered. <strong>Yubashshiruki</strong> — "gives you good tidings" — from <strong>b-sh-r</strong>, to bring joyful news, the root that gives us <strong>bashar</strong> (human being) and <strong>bisharah</strong> (glad tidings). The announcement is joy. And the object of the joy is <strong>bi-kalimatin minhu</strong> — "with a word from Him."</p>

  <p><strong>Kalimah</strong> — word — from the root <strong>k-l-m</strong>, which means to speak, to wound (in its physical sense), to make an impression upon. A <strong>kalimah</strong> is both a unit of speech and an act of impression — something that leaves a mark. The Arabic root holds both meanings without contradiction: to speak is to cut into silence, to mark the unmarked, to create distinction where there was none.</p>

  <p>The designation <strong>kalimatun minhu</strong> — a word <strong>from Him</strong> — does not mean 'Isa is divine in the Quranic framework. It means his origination bypasses the ordinary biological sequence. Other humans come from the union of parents. 'Isa comes from a word — the divine command <strong>kun</strong> (be):</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنَّ مَثَلَ عِيسَىٰ عِندَ اللَّهِ كَمَثَلِ آدَمَ ۖ خَلَقَهُ مِن تُرَابٍ ثُمَّ قَالَ لَهُ كُن فَيَكُونُ</p>
    <p class="translation">"Indeed, the example of 'Isa to Allah is like that of Adam. He created him from dust; then He said to him: 'Be,' and he was."</p>
    <cite>Surah Al 'Imran (3:59)</cite>
  </blockquote>

  <p>The Quran draws the parallel explicitly. <strong>Mathalu 'Isa 'inda Allahi ka-mathali Adam</strong> — the likeness of 'Isa in Allah's sight is like Adam. Both were created by direct divine command rather than through biological inheritance. Adam from dust and a command. 'Isa from a word cast to his mother. The analogy neutralizes any suggestion that a fatherless birth implies divinity — Adam had neither father nor mother, and no one claims divinity for Adam on those grounds.</p>

  <h2>The Annunciation</h2>

  <p>The announcement to Maryam is narrated in Surah Maryam with a detail the Quran grants no other annunciation — the physical mechanism of conception:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ إِنَّمَا أَنَا رَسُولُ رَبِّكِ لِأَهَبَ لَكِ غُلَامًا زَكِيًّا</p>
    <p class="translation">"He said: 'I am only the messenger of your Lord, to grant you a pure boy.'"</p>
    <cite>Surah Maryam (19:19)</cite>
  </blockquote>

  <p>The angel identifies himself as <strong>rasul rabbiki</strong> — the messenger of your Lord. He is a delivery mechanism, not a cause. The gift is a <strong>ghulaman zakiyyan</strong> — a pure boy. <strong>Zakiyy</strong> from <strong>z-k-w</strong>, meaning pure, growing, blessed. The same root that gives us <strong>zakat</strong> — the purifying alms. The child is described with purity before he is born, before he acts, before he speaks. The purity is inherent, pre-behavioral.</p>

  <p>Maryam's response is the question any listener would ask:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَتْ أَنَّىٰ يَكُونُ لِي غُلَامٌ وَلَمْ يَمْسَسْنِي بَشَرٌ وَلَمْ أَكُ بَغِيًّا</p>
    <p class="translation">"She said: 'How can I have a boy when no man has touched me, and I have not been unchaste?'"</p>
    <cite>Surah Maryam (19:20)</cite>
  </blockquote>

  <p><strong>Lam yamsasni bashar</strong> — "no human has touched me." The verb <strong>massa</strong> — to touch — is used in its most physically direct sense. <strong>Wa lam aku baghiyyan</strong> — "and I have not been unchaste." <strong>Baghiyy</strong> from <strong>b-gh-y</strong>, to transgress, to act immorally. Maryam states two facts: no physical contact and no moral lapse. She eliminates both the natural and the illicit explanations. If neither applies, how does conception occur?</p>

  <p>The answer is the answer the Quran gives for every act of creation that exceeds natural causation:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ كَذَٰلِكِ قَالَ رَبُّكِ هُوَ عَلَيَّ هَيِّنٌ ۖ وَلِنَجْعَلَهُ آيَةً لِّلنَّاسِ وَرَحْمَةً مِّنَّا</p>
    <p class="translation">"He said: 'Thus [it will be]. Your Lord says: It is easy for Me, and We will make him a sign to the people and a mercy from Us.'"</p>
    <cite>Surah Maryam (19:21)</cite>
  </blockquote>

  <p><strong>Huwa 'alayya hayyinun</strong> — "it is easy for Me." The word <strong>hayyin</strong> — easy, simple, light — from <strong>h-y-n</strong>. The creation that baffles human causation is <strong>hayyin</strong> for the One who creates. And the purpose is dual: <strong>ayatan lin-nas</strong> — a sign for people — and <strong>rahmatan minna</strong> — a mercy from Us. 'Isa's existence is simultaneously evidence (a sign that compels recognition) and gift (a mercy that heals and transforms). The sign-function and the mercy-function are not sequential. They are simultaneous. The same person, the same birth, serves both purposes at once.</p>

  <h2>The Cradle</h2>

  <p>'Isa's first recorded speech in the Quran comes from the cradle — and the content of that speech is a self-definition:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ إِنِّي عَبْدُ اللَّهِ آتَانِيَ الْكِتَابَ وَجَعَلَنِي نَبِيًّا</p>
    <p class="translation">"He said: 'Indeed, I am the servant of Allah. He has given me the Scripture and made me a prophet.'"</p>
    <cite>Surah Maryam (19:30)</cite>
  </blockquote>

  <p>The very first word of 'Isa's self-identification: <strong>inni 'abdu Allah</strong> — "I am the servant of Allah." <strong>'Abd</strong> — servant, slave, worshipper. Before prophet, before miracle-worker, before any other designation, 'Isa defines himself as <strong>'abd</strong>. The word the Quran will later use to correct any elevation of 'Isa beyond servanthood is the word 'Isa himself uses first. His opening statement from the cradle is the theological correction that later generations would need.</p>

  <p>The baby speaks. The "word from Him" uses words. The <strong>kalimah</strong> cast into the world produces <strong>kalam</strong> — speech — and the first thing that speech says is: I am a servant. The word defines itself through servanthood. The miracle announces its own limits. The sign points away from itself, toward the One who sent it.</p>
</article>`
  },
  {
    title: "The Table From the Sky: The Ma'idah and the Limits of Asking",
    slug: "the-table-from-the-sky-the-maidah-and-the-limits-of-asking",
    type: 'article' as const,
    excerpt: "The disciples of 'Isa asked for a table spread with food to descend from heaven. 'Isa prayed for it — and the answer came with a warning. The table arrives, but so does a condition no one can undo.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['isa', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The fifth surah of the Quran takes its name from this event: <strong>Al-Ma'idah</strong> — the table spread. The word comes from the root <strong>m-y-d</strong>, which means to move, to sway, to incline — and a <strong>ma'idah</strong> is a table spread with food, a table that provides, a surface that offers. The surah is named after a table. The table is the culmination of a conversation between 'Isa and his disciples that the Quran preserves with unusual completeness.</p>

  <h2>The Request</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِذْ قَالَ الْحَوَارِيُّونَ يَا عِيسَى ابْنَ مَرْيَمَ هَلْ يَسْتَطِيعُ رَبُّكَ أَن يُنَزِّلَ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ</p>
    <p class="translation">"When the disciples said: 'O 'Isa, son of Maryam, can your Lord send down to us a table from the sky?'"</p>
    <cite>Surah Al-Ma'idah (5:112)</cite>
  </blockquote>

  <p>The <strong>hawariyyun</strong> — the disciples — use a phrase that has troubled commentators: <strong>hal yastati'u rabbuka</strong> — "can your Lord...?" The verb <strong>yastati'u</strong> — "is He able?" — seems to question divine power. Some readers have read the phrase as "would your Lord be willing?" rather than "is He able?" — and indeed, some Quranic recitations preserve a variant reading (<strong>hal tastati'u</strong> — "can you ask your Lord?") that redirects the question from Allah's ability to 'Isa's willingness to ask.</p>

  <p>Regardless of the reading, the request itself is remarkable. The disciples want a <strong>ma'idah min as-sama'</strong> — a table from the sky. Food that descends. Provision that arrives from above without agricultural effort, without market transaction, without human preparation. They want the supply chain to bypass the earth entirely.</p>

  <p>'Isa's immediate response is a rebuke:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ اتَّقُوا اللَّهَ إِن كُنتُم مُّؤْمِنِينَ</p>
    <p class="translation">"He said: 'Fear Allah, if you are believers.'"</p>
    <cite>Surah Al-Ma'idah (5:112)</cite>
  </blockquote>

  <p><strong>Ittaqu Allaha in kuntum mu'minin</strong> — "be conscious of Allah if you are believers." The conditional <strong>in kuntum</strong> — "if you are" — places their faith in question. If you truly believe, the question itself should be unnecessary. Faith includes trust in what is unseen and in provision that has not yet arrived. To demand visible proof — a physical table descending from the physical sky — reveals something about the condition of the faith that demands it.</p>

  <h2>The Justification</h2>

  <p>The disciples explain:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا نُرِيدُ أَن نَّأْكُلَ مِنْهَا وَتَطْمَئِنَّ قُلُوبُنَا وَنَعْلَمَ أَن قَدْ صَدَقْتَنَا وَنَكُونَ عَلَيْهَا مِنَ الشَّاهِدِينَ</p>
    <p class="translation">"They said: 'We wish to eat from it, and let our hearts be reassured, and know that you have been truthful to us, and be among its witnesses.'"</p>
    <cite>Surah Al-Ma'idah (5:113)</cite>
  </blockquote>

  <p>Four reasons, layered from the physical to the spiritual. <strong>Nuridu an na'kula minha</strong> — we want to eat from it. The most basic: hunger, desire, the body's need for food. <strong>Wa tatma'inna qulubuna</strong> — and our hearts will be reassured. <strong>Tuma'ninah</strong> — from <strong>t-m-n</strong>, to be still, to be at rest, to settle. The heart that has not settled — the heart that still oscillates between faith and doubt — wants a sign that will end the oscillation. <strong>Wa na'lama an qad sadaqtana</strong> — and we will know that you have been truthful. The verb <strong>na'lama</strong> — we will know — moves from the heart to the intellect. They want certainty, not just peace. <strong>Wa nakuna 'alayha min ash-shahidin</strong> — and we will be among its witnesses. They want to testify. To have seen something firsthand that can be reported to others.</p>

  <p>The four reasons are an honest inventory of incomplete faith. We are hungry. Our hearts are unsettled. We are not certain you are truthful. We want to be witnesses, not just followers. The disciples do not pretend to a faith they do not fully possess. Their request is the request of people in process — moving toward certainty but not yet arrived.</p>

  <h2>The Prayer and the Warning</h2>

  <p>'Isa prays:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ عِيسَى ابْنُ مَرْيَمَ اللَّهُمَّ رَبَّنَا أَنزِلْ عَلَيْنَا مَائِدَةً مِّنَ السَّمَاءِ تَكُونُ لَنَا عِيدًا لِّأَوَّلِنَا وَآخِرِنَا وَآيَةً مِّنكَ ۖ وَارْزُقْنَا وَأَنتَ خَيْرُ الرَّازِقِينَ</p>
    <p class="translation">"'Isa, son of Maryam, said: 'O Allah, our Lord, send down to us a table from the sky to be for us a festival for the first of us and the last of us, and a sign from You. And provide for us — You are the best of providers.'"</p>
    <cite>Surah Al-Ma'idah (5:114)</cite>
  </blockquote>

  <p>'Isa elevates the request. What the disciples framed as personal need — food, reassurance, certainty — 'Isa reframes as communal celebration: <strong>'idan li-awwalina wa akhirina</strong> — "a festival for our first and our last." <strong>'Id</strong> — festival, celebration — from the root <strong>'-w-d</strong>, to return, to recur. The table becomes a recurring commemoration, something that extends beyond the moment of eating to become a marker for all generations. And <strong>ayatan minka</strong> — "a sign from You" — makes explicit what the disciples implied: this is a request for evidence.</p>

  <p>The divine response grants the request — with a condition:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ اللَّهُ إِنِّي مُنَزِّلُهَا عَلَيْكُمْ ۖ فَمَن يَكْفُرْ بَعْدُ مِنكُمْ فَإِنِّي أُعَذِّبُهُ عَذَابًا لَّا أُعَذِّبُهُ أَحَدًا مِّنَ الْعَالَمِينَ</p>
    <p class="translation">"Allah said: 'Indeed, I will send it down to you. But whoever disbelieves afterward among you — I will punish him with a punishment by which I have not punished anyone among the worlds.'"</p>
    <cite>Surah Al-Ma'idah (5:115)</cite>
  </blockquote>

  <p><strong>Inni munazziluhah 'alaykum</strong> — "I will send it down to you." The table will come. The request is granted. And then: <strong>fa-man yakfur ba'du minkum</strong> — "whoever disbelieves after this among you." The word <strong>ba'du</strong> — "after" — is the hinge. After the table, the calculus changes. Before the table, disbelief coexisted with incomplete evidence. After the table, disbelief coexists with a miracle personally witnessed, personally eaten from, personally experienced. The disbelief after the sign carries a weight that pre-sign disbelief does not.</p>

  <p>The punishment for post-table disbelief is described with a superlative: <strong>'adhaban la u'adhdhibuhu ahadan min al-'alamin</strong> — "a punishment by which I have not punished anyone among the worlds." The punishment is unique. It has no precedent and no parallel. The severity is proportional to the clarity of the evidence that preceded it. More evidence, more responsibility. The table is simultaneously a gift and a test — and the test is permanent. Once you have eaten from a table that descended from the sky, your relationship to faith is irreversibly altered. You cannot un-see it. You cannot un-eat it. The evidence lives in your body.</p>

  <h2>The Architecture of Asking</h2>

  <p>The Ma'idah episode establishes a principle about the relationship between signs and responsibility. The disciples asked for evidence. 'Isa warned them. They persisted. The evidence was granted — and with it, an irrevocable intensification of accountability. The table fed them. The table also bound them. The provision and the obligation arrived on the same surface.</p>

  <p>This architecture recurs throughout the Quran in different forms. Thamud asked for a sign and received the she-camel — and the condition was: do not harm it. Fir'awn received nine signs — and each one increased his accountability. The pattern is consistent: the sign intensifies the test. More light makes the choice to close your eyes more consequential, not less.</p>

  <p>The surah that bears this event's name — Al-Ma'idah — is the last surah revealed in its entirety. Its placement at the end of the revelatory sequence is fitting: the table that descends from the sky is the final image of divine provision meeting human demand, and the warning attached to it is the final word on what happens when provision is met with ingratitude. The table is still set. The question is still open. The condition has not expired.</p>
</article>`
  },
  {
    title: "'Isa's Miracles and the Grammar of Permission",
    slug: "isas-miracles-and-the-grammar-of-permission",
    type: 'article' as const,
    excerpt: "Every miracle attributed to 'Isa in the Quran carries the same qualifying phrase: 'by Allah's permission.' The repetition is not redundant — it is the Quran's method of embedding theology into the grammar of the miraculous.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['isa', 'quranic-characters', 'linguistic-analysis'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran attributes miracles to 'Isa that it attributes to no other prophet — shaping clay birds that come alive, healing the blind and the leper, raising the dead. These are extraordinary powers, and the Quran records them without diminishment. But every single one of these miracles carries a qualifier — and the qualifier is always the same phrase.</p>

  <h2>The Catalog</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَنِّي أَخْلُقُ لَكُم مِّنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ فَأَنفُخُ فِيهِ فَيَكُونُ طَيْرًا بِإِذْنِ اللَّهِ ۖ وَأُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ وَأُحْيِي الْمَوْتَىٰ بِإِذْنِ اللَّهِ</p>
    <p class="translation">"I create for you from clay the form of a bird, then I breathe into it and it becomes a bird by Allah's permission. And I cure the blind and the leper, and I give life to the dead — by Allah's permission."</p>
    <cite>Surah Al 'Imran (3:49)</cite>
  </blockquote>

  <p>Three categories of miracle. First: <strong>akhluqu lakum min at-tin ka-hay'ati at-tayr</strong> — "I create for you from clay the form of a bird." The verb <strong>akhluqu</strong> — I create — uses the same root (<strong>kh-l-q</strong>) that the Quran uses for divine creation. 'Isa shapes clay into the form (<strong>hay'ah</strong>) of a bird. He breathes into it — <strong>fa-anfukhu fihi</strong> — and it becomes a living bird. The breathing recalls the creation of Adam, when Allah breathed His spirit into clay. The parallel is deliberate and the correction is immediate: <strong>bi-idhni Allah</strong> — by Allah's permission.</p>

  <p>Second: <strong>ubri'u al-akmaha wal-abrasa</strong> — "I cure the blind and the leper." <strong>Akmah</strong> — born blind, not one who lost sight but one who never had it. <strong>Abras</strong> — the leper, afflicted with the skin disease that carried social exile. 'Isa heals what birth imposed and what disease inflicted. The healing crosses the line between congenital and acquired — he restores what was never there and removes what should not be.</p>

  <p>Third: <strong>uhyi al-mawta</strong> — "I give life to the dead." The verb <strong>uhyi</strong> — I give life — uses the root <strong>h-y-y</strong>, life. The same root that names Allah as <strong>Al-Hayy</strong>, the Ever-Living. 'Isa gives life to the dead — the ultimate miracle, the reversal of the most irreversible process in nature.</p>

  <p>And each miracle — creation, healing, resurrection — carries the same suffix: <strong>bi-idhni Allah</strong>.</p>

  <h2>The Phrase</h2>

  <p><strong>Idhn</strong> — permission — comes from the root <strong>a-dh-n</strong>, which means to give ear, to listen, to authorize. An <strong>idhn</strong> is a grant of permission from one who has the authority to grant it. The word implies a hierarchy: someone above authorizes someone below. The miracle happens because permission was given, not because the miracle-worker possessed independent power.</p>

  <p>The phrase <strong>bi-idhni Allah</strong> appears twice in this single ayah — once after the clay bird and once after raising the dead. The repetition is not stylistic. It is structural. The Quran places the qualifier at both the beginning and the end of the miracle catalog, creating a frame. Everything between the two occurrences of <strong>bi-idhni Allah</strong> operates within the permission structure. Nothing escapes it.</p>

  <p>In Surah Al-Ma'idah, when Allah Himself recounts 'Isa's miracles on the Day of Judgment, the permission phrase appears with even greater frequency:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِذْ تَخْلُقُ مِنَ الطِّينِ كَهَيْئَةِ الطَّيْرِ بِإِذْنِي فَتَنفُخُ فِيهَا فَتَكُونُ طَيْرًا بِإِذْنِي ۖ وَتُبْرِئُ الْأَكْمَهَ وَالْأَبْرَصَ بِإِذْنِي ۖ وَإِذْ تُخْرِجُ الْمَوْتَىٰ بِإِذْنِي</p>
    <p class="translation">"And when you created from clay the form of a bird, by My permission, and you breathed into it and it became a bird, by My permission. And you healed the blind and the leper, by My permission. And when you brought forth the dead, by My permission."</p>
    <cite>Surah Al-Ma'idah (5:110)</cite>
  </blockquote>

  <p>Four times: <strong>bi-idhni</strong>, <strong>bi-idhni</strong>, <strong>bi-idhni</strong>, <strong>bi-idhni</strong>. Four occurrences in a single ayah. The phrase shifts from <strong>bi-idhni Allah</strong> (by Allah's permission) to <strong>bi-idhni</strong> (by My permission) — because here, it is Allah speaking directly. The first-person possessive makes the ownership of the miracle unambiguous: these were done by My permission. The permission is Mine. The power is Mine. The miracle-worker is the instrument.</p>

  <h2>What the Grammar Prevents</h2>

  <p>The insistent repetition of <strong>bi-idhni Allah</strong> performs a specific theological function: it prevents the miracles from becoming evidence of divinity. Without the qualifier, 'Isa's miracle catalog — creating life, healing the incurable, raising the dead — reads as a divine résumé. With the qualifier, it reads as a prophetic portfolio: impressive, unprecedented, but delegated.</p>

  <p>The grammar is doing theology. The phrase <strong>bi-idhn</strong> converts every miracle from a demonstration of independent power into a demonstration of authorized service. The miracles remain extraordinary. They are not diminished. But their direction is redirected — they point toward the One who authorized them, not toward the one who performed them.</p>

  <p>This is why 'Isa's first word from the cradle is <strong>'abdu Allah</strong> — servant of Allah. The servant performs extraordinary acts. The acts belong to the master. The performance is real. The ownership is clear. The grammar of permission — <strong>bi-idhni</strong>, <strong>bi-idhni</strong>, <strong>bi-idhni</strong>, <strong>bi-idhni</strong> — is the Quran's method of holding both truths simultaneously: 'Isa performed miracles no other human performed, and the power behind every one of them was Allah's.</p>

  <h2>The Final Question</h2>

  <p>On the Day of Judgment, the Quran records a question put to 'Isa directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِذْ قَالَ اللَّهُ يَا عِيسَى ابْنَ مَرْيَمَ أَأَنتَ قُلْتَ لِلنَّاسِ اتَّخِذُونِي وَأُمِّيَ إِلَـٰهَيْنِ مِن دُونِ اللَّهِ</p>
    <p class="translation">"And when Allah said: 'O 'Isa, son of Maryam, did you say to the people: Take me and my mother as deities besides Allah?'"</p>
    <cite>Surah Al-Ma'idah (5:116)</cite>
  </blockquote>

  <p>'Isa's response begins: <strong>subhanaka</strong> — "glory be to You." The same word the angels used when they could not name. The word of one who recognizes the question's gravity and distances himself from the claim entirely. <strong>Ma yakunu li an aqula ma laysa li bi-haqq</strong> — "It is not for me to say what I have no right to." The word <strong>haqq</strong> — right, truth, reality — places the boundary. 'Isa has no <strong>haqq</strong> — no right, no truth-basis — for the claim attributed to him. The miracles were real. The permission was real. The inference that later generations drew from the miracles was not.</p>

  <p>The grammar of permission, planted in every miracle narrative, was always the answer to the question that would eventually be asked. The Quran embedded the correction in the description — not as a later addition, not as a footnote, but in the very structure of the sentences that describe what 'Isa did. <strong>Bi-idhni Allah. Bi-idhni. Bi-idhni. Bi-idhni.</strong> The permission was always the point. The miracles were always the evidence. The distinction between performer and authorizer was always the theology.</p>
</article>`
  }
]

async function main() {
  console.log("Inserting 'Isa articles...")
  for (const article of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: ISA_ENTITY_ID, is_primary: true })
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log("✓ Done!", articles.length, "'Isa articles.")
}
main().catch(console.error)
