#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const SALIH_ENTITY_ID = '9c6d5f53-fb49-4c90-8976-c6ce06cadffd'
const HUD_ENTITY_ID = 'e936b118-b326-4674-aed3-6546d7e5aafb'

const salihArticles = [
  {
    title: "The She-Camel of Allah: A Sign You Could Touch",
    slug: "the-she-camel-of-allah-a-sign-you-could-touch",
    type: 'article' as const,
    excerpt: "Salih's people asked for a miracle and received one — a she-camel that emerged from rock, drank from the well on its appointed day, and was not to be harmed. They hamstrung it anyway.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['salih', 'quranic-characters', 'thamud'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Most Quranic signs are visual or verbal — a staff that becomes a serpent, a fire that does not burn, a book whose language cannot be matched. Salih's sign is different. It is an animal. It drinks water. It walks the earth. It requires daily management — the well must be shared, alternating days. The miracle is not a spectacle that appears and vanishes. It is a presence that must be lived with.</p>

  <h2>The Sign</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ هَـٰذِهِ نَاقَةٌ لَّهَا شِرْبٌ وَلَكُمْ شِرْبُ يَوْمٍ مَّعْلُومٍ</p>
    <p class="translation">"He said: 'This is a she-camel. For her is a day of drinking, and for you is a day of drinking, on an appointed day.'"</p>
    <cite>Surah Ash-Shu'ara (26:155)</cite>
  </blockquote>

  <p>The arrangement is precise. <strong>Shirb</strong> — a turn of drinking, a designated time at the water source. The she-camel drinks on her day. The people drink on theirs. <strong>Yawm ma'lum</strong> — an appointed, known day. The system is transparent, predictable, fair. The miracle comes with a schedule.</p>

  <p>This is remarkable because it converts a sign into a test of daily practice. A miraculous staff can be witnessed once and believed or disbelieved. A she-camel that shares your water supply must be accommodated every other day. The test is not a moment of recognition but a sustained practice of coexistence. Can you share resources with something that has a divine claim on them? Can you yield on the days that are not yours?</p>

  <p>The prohibition attached to the sign is equally practical:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَا تَمَسُّوهَا بِسُوءٍ فَيَأْخُذَكُمْ عَذَابُ يَوْمٍ عَظِيمٍ</p>
    <p class="translation">"And do not touch her with harm, lest the punishment of a great day seize you."</p>
    <cite>Surah Ash-Shu'ara (26:156)</cite>
  </blockquote>

  <p><strong>La tamassuhah bi-su'</strong> — "do not touch her with harm." The verb <strong>massa</strong> — to touch — is the lightest possible contact. The prohibition is not "do not slaughter her" or "do not attack her." It is "do not touch her with harm." The minimum threshold of violation is a touch. The Quran draws the boundary at the point of first contact, the same structural principle as <strong>la taqrabu</strong> — do not approach. The real decision happens before the action.</p>

  <h2>The Hamstringing</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَعَقَرُوهَا فَأَصْبَحُوا نَادِمِينَ</p>
    <p class="translation">"But they hamstrung her, and so became regretful."</p>
    <cite>Surah Ash-Shu'ara (26:157)</cite>
  </blockquote>

  <p>The verb <strong>'aqaruha</strong> — they hamstrung her — from the root <strong>'-q-r</strong>, which means to wound the legs of an animal, to cut the tendons so it cannot stand. <strong>'Aqr</strong> is not a quick kill. It is a crippling — the animal brought down to the ground, immobilized, then left to die or dispatched afterward. The violence is not sudden rage. It is methodical disablement. Someone had to approach the animal, position a blade at the tendon, and cut. The act required proximity, planning, and commitment.</p>

  <p>In Surah Ash-Shams, the Quran identifies the one who did it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِذِ انبَعَثَ أَشْقَاهَا</p>
    <p class="translation">"When the most wretched of them was sent forth."</p>
    <cite>Surah Ash-Shams (91:12)</cite>
  </blockquote>

  <p><strong>Ashqaha</strong> — "the most wretched of them." The superlative form. One individual from among the community — the worst of them, the most miserable in his wretchedness — is the one who rises to perform the act. But the Quran holds the entire community responsible. <strong>Fa-'aqaruha</strong> uses the plural: they hamstrung her. One man's blade. The community's crime. The individual acts and the collective bears the consequence because the collective created the conditions — the resentment, the encouragement, the failure to prevent — that made the individual's action possible.</p>

  <p>And then: <strong>fa-asbahu nadimin</strong> — "they became regretful." The regret is immediate. <strong>Asbahu</strong> — "they became," literally "they entered the morning as." By the next morning, they regret it. The regret does not help. The Quran records it without granting it any weight. Unlike Adam's tawbah, which was accepted because it preceded the consequence, Thamud's regret arrives after the act and after the door of return has closed.</p>

  <h2>The Cry</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَخَذَتْهُمُ الصَّيْحَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ</p>
    <p class="translation">"So the blast seized them, and they became fallen prone in their homes."</p>
    <cite>Surah Al-A'raf (7:78)</cite>
  </blockquote>

  <p>The <strong>sayhah</strong> — the blast, the cry, the scream — from the root <strong>s-y-h</strong>. A single sound that ends a civilization. The she-camel was silenced by a blade; the people are silenced by a sound. The animal's voice was taken; the community is taken by a voice. The correspondence is acoustic — silence answered with overwhelming sound.</p>

  <p>Salih departs with the same structure as Shu'ayb — turning away with grief:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا قَوْمِ لَقَدْ أَبْلَغْتُكُمْ رِسَالَةَ رَبِّي وَنَصَحْتُ لَكُمْ وَلَـٰكِن لَّا تُحِبُّونَ النَّاصِحِينَ</p>
    <p class="translation">"So he turned away from them and said: 'O my people, I had conveyed to you the message of my Lord and advised you, but you do not love the advisors.'"</p>
    <cite>Surah Al-A'raf (7:79)</cite>
  </blockquote>

  <p>The final phrase — <strong>la tuhibbuna an-nasihin</strong>, "you do not love the advisors" — is Salih's diagnosis. The problem was not incomprehension. It was not that the message was unclear or the sign was ambiguous. The she-camel walked among them. The evidence was tangible, daily, undeniable. They did not love the one who advised them. The resistance was affective — a matter of the heart's orientation — before it was intellectual. They understood the message. They disliked the messenger. And because they disliked the messenger, they destroyed the sign.</p>
</article>`
  },
  {
    title: "Thamud: The Civilization That Carved Mountains and Could Not Carve Humility",
    slug: "thamud-the-civilization-that-carved-mountains",
    type: 'article' as const,
    excerpt: "The Quran describes Thamud as builders who carved dwellings from mountainsides — a people whose engineering skill was matched only by their refusal to hear what their prophet said. Their monuments outlasted them.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['salih', 'quranic-characters', 'thamud', 'nations-and-peoples'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran provides an architectural detail about Thamud that no other destroyed nation receives. They carved their homes from mountains:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَتَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا فَارِهِينَ</p>
    <p class="translation">"And you carve from the mountains, homes, with skill."</p>
    <cite>Surah Ash-Shu'ara (26:149)</cite>
  </blockquote>

  <p>The verb <strong>tanhitun</strong> — "you carve" — from the root <strong>n-h-t</strong>, which means to hew, to cut stone, to shape rock through removal. <strong>Naht</strong> is subtractive craft — the sculptor's method, removing material until the form emerges. Thamud's architecture is carved from the existing mountain, not built from gathered materials. Their homes are the mountain itself, hollowed and shaped. The word <strong>farihin</strong> — "with skill" or "with pride" — carries both connotations. They are skilled at this. They are also proud of it.</p>

  <p>In Surah Al-Fajr, the Quran names them alongside another great builder:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَثَمُودَ الَّذِينَ جَابُوا الصَّخْرَ بِالْوَادِ</p>
    <p class="translation">"And Thamud, who carved the rocks in the valley."</p>
    <cite>Surah Al-Fajr (89:9)</cite>
  </blockquote>

  <p>The verb <strong>jabu</strong> — "they carved," "they cut through" — from the root <strong>j-w-b</strong>, which means to penetrate, to pass through, to cut across. <strong>As-sakhr</strong> — the rock, the raw stone — is their medium. <strong>Bil-wad</strong> — in the valley. The Quran locates them geographically: a valley people who cut into the valley walls. The archaeological remains at Mada'in Salih (Al-Hijr) in northwestern Arabia — monumental facades carved from sandstone — are what later generations identified as the work the Quran describes.</p>

  <h2>The Irony of Permanence</h2>

  <p>Salih addresses their building directly in Surah Al-A'raf:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَتُتْرَكُونَ فِي مَا هَاهُنَا آمِنِينَ ۝ فِي جَنَّاتٍ وَعُيُونٍ ۝ وَزُرُوعٍ وَنَخْلٍ طَلْعُهَا هَضِيمٌ ۝ وَتَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا فَارِهِينَ</p>
    <p class="translation">"Will you be left secure in what is here — in gardens and springs, and crops and palm trees with softened fruit? And you carve from the mountains, homes, with skill."</p>
    <cite>Surah Ash-Shu'ara (26:146-149)</cite>
  </blockquote>

  <p>The question <strong>a-tutrakuna</strong> — "will you be left?" — is in the passive voice. It asks: who guarantees the leaving? Who ensures the security? They have gardens (<strong>jannat</strong>), springs (<strong>'uyun</strong>), crops (<strong>zuru'</strong>), and date palms with fruit so ripe it is <strong>hadim</strong> — soft, tender, easily digestible. The word <strong>hadim</strong> describes the fruit at its peak of perfection. Their agriculture is exceptional. Their engineering is exceptional. Their infrastructure produces abundance.</p>

  <p>Salih's question punctures the assumption that infrastructure equals permanence. The gardens and springs are real. The carved mountain homes are real. The soft-fruited date palms are real. And none of it — not the carved stone, not the irrigated fields, not the accumulated engineering knowledge — constitutes a guarantee of continuity. The verb <strong>tutrakuna</strong> implies a guarantor: someone leaves you in this condition. If the guarantor withdraws, the condition ends. The rock you carved your home from is not yours. The mountain that houses you is borrowed.</p>

  <h2>What the Quran Says to Passersby</h2>

  <p>Surah Al-Hijr takes its name from the region where Thamud lived. The surah addresses future travelers directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَلَقَدْ كَذَّبَ أَصْحَابُ الْحِجْرِ الْمُرْسَلِينَ ۝ وَآتَيْنَاهُمْ آيَاتِنَا فَكَانُوا عَنْهَا مُعْرِضِينَ ۝ وَكَانُوا يَنْحِتُونَ مِنَ الْجِبَالِ بُيُوتًا آمِنِينَ ۝ فَأَخَذَتْهُمُ الصَّيْحَةُ مُصْبِحِينَ ۝ فَمَا أَغْنَىٰ عَنْهُم مَّا كَانُوا يَكْسِبُونَ</p>
    <p class="translation">"The companions of Al-Hijr denied the messengers. And We gave them Our signs, but from them they were turning away. And they used to carve from the mountains, homes, feeling secure. But the blast seized them in the morning. And what they used to earn did not avail them."</p>
    <cite>Surah Al-Hijr (15:80-84)</cite>
  </blockquote>

  <p>The word <strong>aminin</strong> — "feeling secure" — appears here instead of <strong>farihin</strong> (skillful/proud) from the Shu'ara version. They carved mountain homes <strong>feeling secure</strong>. The stone was their security. The mountain was their fortress. The carved rock would outlast any threat — or so they believed. And the <strong>sayhah</strong> — the blast — took them <strong>musbihin</strong>, "in the morning." The dawn they expected to greet inside their stone houses became the last morning they saw.</p>

  <p>The closing phrase is the theological verdict: <strong>fa-ma aghna 'anhum ma kanu yaksibun</strong> — "what they used to earn did not avail them." The root <strong>k-s-b</strong> means to earn, to acquire, to gain through effort. Everything they earned — the engineering knowledge, the carved homes, the irrigated agriculture, the accumulated wealth of a successful civilization — <strong>ma aghna</strong>, did not suffice, did not protect, did not avail. The same root used for Qarun's wealth (<strong>'ilmin 'indi</strong>) appears here in its earned form. They earned it. It did not save them.</p>

  <p>The carved facades still stand. The rock they shaped outlasted the civilization that shaped it. Travelers passing through Al-Hijr can still see the doorways and chambers Thamud cut from sandstone millennia ago. The homes survived. The inhabitants did not. The monument — the carved mountain that was meant to guarantee permanence — became the proof that permanence was never theirs to guarantee.</p>
</article>`
  },
  {
    title: "Three Days: The Countdown That Salih Gave Thamud",
    slug: "three-days-the-countdown-that-salih-gave-thamud",
    type: 'article' as const,
    excerpt: "After they killed the she-camel, Salih gave them a precise deadline: three days. The Quran preserves this countdown — a mercy within a sentence, time given to a people who had already spent all their time.",
    reading_time_minutes: 9,
    status: 'published' as const,
    tags: ['salih', 'quranic-characters', 'thamud'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">After Thamud hamstrings the she-camel — after the most wretched among them rises and cuts — Salih does not pronounce immediate destruction. He announces a delay:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَعَقَرُوهَا فَقَالَ تَمَتَّعُوا فِي دَارِكُمْ ثَلَاثَةَ أَيَّامٍ ۖ ذَٰلِكَ وَعْدٌ غَيْرُ مَكْذُوبٍ</p>
    <p class="translation">"But they hamstrung her. So he said: 'Enjoy yourselves in your homes for three days. That is a promise not to be denied.'"</p>
    <cite>Surah Hud (11:65)</cite>
  </blockquote>

  <p>The verb <strong>tamatta'u</strong> — "enjoy yourselves" — comes from the root <strong>m-t-'</strong>, which means to take benefit, to have use of something for a limited period. <strong>Mata'</strong> is temporary provision — the goods of this world as distinguished from the permanent goods of the next. The imperative <strong>tamatta'u</strong> is not an invitation to pleasure. It is a sentence: your remaining time is three days, and in those three days, whatever you do with your homes and possessions constitutes your final use of them.</p>

  <p><strong>Fi darikum</strong> — "in your homes." The same homes carved from mountains. The stone chambers that were meant to provide security are now the containers of a countdown. The home becomes a waiting room.</p>

  <p><strong>Thalathata ayyam</strong> — three days. A specific number. The specificity is itself a form of mercy and a form of pressure. Three days is enough time to reconsider. Three days is enough to repent, to seek forgiveness, to change course. The countdown is not a cruelty — it is a final window. Other destroyed nations received no such countdown. The flood came to Nuh's people when it came. The overturning of Lut's cities happened in a single night. Thamud receives a numbered interval.</p>

  <h2>The Promise</h2>

  <p><strong>Dhalika wa'dun ghayru makdhub</strong> — "that is a promise not to be denied." The word <strong>wa'd</strong> — promise — is the same word used throughout the Quran for divine promises of both mercy and consequence. The phrase <strong>ghayru makdhub</strong> — "not lied about," "not to be proven false" — uses the passive participle of <strong>k-dh-b</strong>, to lie. The promise will not be falsified. The three days are not a bluff. The countdown is honest.</p>

  <p>The structure of this declaration — a limited reprieve with a guaranteed endpoint — appears nowhere else in the Quran in such precise form. Other warnings are general: repent or face consequences. Salih's warning is calendared: you have seventy-two hours.</p>

  <h2>What the Three Days Contain</h2>

  <p>The Quran does not describe what Thamud did during those three days. The silence is deafening. Three days of known, announced, guaranteed consequence — and the Quran does not record a single act of repentance, a single prayer, a single approach toward Salih asking how to undo what was done. In Surah Al-Qamar, a different detail emerges — they tried to preempt the punishment:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَنَادَوْا صَاحِبَهُمْ فَتَعَاطَىٰ فَعَقَرَ</p>
    <p class="translation">"But they called their companion, and he dared and hamstrung."</p>
    <cite>Surah Al-Qamar (54:29)</cite>
  </blockquote>

  <p>The verb <strong>ta'ata</strong> — "he dared," "he reached out," "he took on the task" — from the root <strong>'-t-y</strong> in its intensive reflexive form, suggesting he rose to a challenge, as if the community dared him and he accepted. The hamstringing was not a spontaneous act of one rogue individual. It was called for — <strong>nadaw sahibahum</strong>, "they called their companion" — and he responded. The collective summoned the individual. The individual performed the act. And then the three days began.</p>

  <p>What do you do with three days when you know what comes at the end? The Quran's silence about their use of those days suggests they did nothing different. They did not repent. They did not flee. They did not approach Salih. They sat in their carved mountain homes — the homes built for permanence — and waited for the promise that would not be denied.</p>

  <h2>The Morning</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا جَاءَ أَمْرُنَا نَجَّيْنَا صَالِحًا وَالَّذِينَ آمَنُوا مَعَهُ بِرَحْمَةٍ مِّنَّا وَمِنْ خِزْيِ يَوْمِئِذٍ</p>
    <p class="translation">"So when Our command came, We saved Salih and those who believed with him, by mercy from Us, and from the disgrace of that day."</p>
    <cite>Surah Hud (11:66)</cite>
  </blockquote>

  <p>Salih is saved — <strong>najjayna</strong> — and those who believed <strong>ma'ahu</strong>, with him. The preposition <strong>ma'a</strong> — "with" — marks the believing community as defined by their proximity to the prophet. They are saved <strong>bi-rahmatin minna</strong> — "by a mercy from Us." The salvation is mercy, not desert. Even the believers are saved by mercy, not by earned right.</p>

  <p>And: <strong>wa min khizyi yawmi'idhin</strong> — "and from the disgrace of that day." The word <strong>khizy</strong> — disgrace, humiliation — indicates that the punishment carries not just physical destruction but a public shame. The civilization that carved mountains — that was <strong>farihin</strong>, proud and skilled — is disgraced. The pride that went into the carving is answered with the humiliation of the collapse. The three days were long enough for the pride to curdle into fear, for the security of stone to become the anxiety of a known deadline, for the carved mountain home to feel less like a fortress and more like a clock.</p>

  <p>The three days are Salih's unique contribution to the Quranic vocabulary of warning. Other prophets warn in general terms. Salih numbers the days. The numbered warning is both mercy — here is time, use it — and judgment: the time was given and was not used. The countdown expires, the blast arrives at dawn, and the homes that were carved to outlast centuries do not outlast three days of inaction.</p>
</article>`
  }
]

const hudArticles = [
  {
    title: "Hud and 'Ad: When the Wind Became the Message",
    slug: "hud-and-ad-when-the-wind-became-the-message",
    type: 'article' as const,
    excerpt: "'Ad built towers and boasted of their strength. The Quran sent against them a wind — invisible, ungraspable, impossible to fight. The mightiest civilization in their world was undone by air.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['hud', 'quranic-characters', 'ad', 'nations-and-peoples'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The civilization of 'Ad occupies a specific place in the Quran's gallery of destroyed nations. They are the strong ones. The builders. The ones who looked at the earth and saw raw material for monuments. Their prophet, Hud, carried a message to people who believed their power made them immune — and the instrument of their undoing was the one force their strength could not oppose.</p>

  <h2>The Strength</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ ۝ إِرَمَ ذَاتِ الْعِمَادِ ۝ الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ</p>
    <p class="translation">"Have you not seen how your Lord dealt with 'Ad — Iram, possessors of lofty pillars — the like of whom had never been created in the lands?"</p>
    <cite>Surah Al-Fajr (89:6-8)</cite>
  </blockquote>

  <p><strong>Iram dhat al-'imad</strong> — "Iram of the pillars." The word <strong>'imad</strong> — pillars, columns, supports — from the root <strong>'-m-d</strong>, which means to prop up, to support, to hold aloft. Their civilization is defined by vertical structures. Pillars that hold things up. Towers that reach. Architecture that announces itself against the skyline. <strong>Dhat al-'imad</strong> — "possessing pillars" — is both a physical description and a character portrait. They are the pillar-people, the ones whose identity is structural, vertical, monumental.</p>

  <p><strong>Allati lam yukhlaq mithlaha fil-bilad</strong> — "the like of whom had never been created in the lands." The superlative is absolute. No civilization like them had existed. Their uniqueness is affirmed by the Quran itself. This is not a people dismissed as insignificant. This is the greatest civilization of their era — and the Quran says so before telling what happened to them.</p>

  <p>Their self-assessment matches the Quran's evaluation of their power — but draws the wrong conclusion from it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَقَالُوا مَنْ أَشَدُّ مِنَّا قُوَّةً</p>
    <p class="translation">"And they said: 'Who is greater than us in strength?'"</p>
    <cite>Surah Fussilat (41:15)</cite>
  </blockquote>

  <p><strong>Man ashaddu minna quwwatan</strong> — "Who is more intense than us in power?" The rhetorical question expects silence as its answer. No one is stronger. They have looked around, measured themselves against every known civilization, and found no competitor. The question is closed — or so they believe.</p>

  <p>The Quran provides the answer they did not seek:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَوَلَمْ يَرَوْا أَنَّ اللَّهَ الَّذِي خَلَقَهُمْ هُوَ أَشَدُّ مِنْهُمْ قُوَّةً</p>
    <p class="translation">"Did they not see that Allah, who created them, is greater than them in strength?"</p>
    <cite>Surah Fussilat (41:15)</cite>
  </blockquote>

  <p>The same word — <strong>ashaddu</strong> — is returned. The same structure — <strong>ashaddu...quwwatan</strong> — is mirrored. The question they asked about themselves is answered about Allah. They measured horizontally — against other nations. The Quran measures vertically — against the One who created the nations.</p>

  <h2>What Hud Said</h2>

  <p>Hud's message to 'Ad, preserved in Surah Hud, has a distinctive feature — he confronts their building program directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَتَبْنُونَ بِكُلِّ رِيعٍ آيَةً تَعْبَثُونَ ۝ وَتَتَّخِذُونَ مَصَانِعَ لَعَلَّكُمْ تَخْلُدُونَ ۝ وَإِذَا بَطَشْتُم بَطَشْتُمْ جَبَّارِينَ</p>
    <p class="translation">"Do you build on every elevation a sign, amusing yourselves? And take for yourselves constructions that you might live forever? And when you strike, you strike as tyrants?"</p>
    <cite>Surah Ash-Shu'ara (26:128-130)</cite>
  </blockquote>

  <p>Three charges. First: <strong>a-tabnuna bi-kulli ri'in ayatan ta'bathun</strong> — "Do you build on every high point a monument, amusing yourselves?" The word <strong>ri'</strong> — an elevated point, a hilltop — is where they place their constructions. <strong>Ayatan</strong> — a sign, a landmark. They build signs of themselves on every prominence. And the purpose? <strong>Ta'bathun</strong> — for amusement, for vanity, for play. The construction is recreational power — building for the sake of demonstrating that you can build.</p>

  <p>Second: <strong>wa tattakhidhuna masani'a la'allakum takhludun</strong> — "And you take constructions, hoping perhaps you might live forever." <strong>Masani'</strong> — fortified constructions, waterworks, reservoirs — from <strong>s-n-'</strong>, to manufacture, to craft. <strong>La'allakum takhludun</strong> — "perhaps you might endure forever." The word <strong>khuld</strong> — eternity — appears again, the same word Shaytan used to tempt Adam with the tree of eternity. 'Ad builds for <strong>khuld</strong> — permanence, immortality through infrastructure. The buildings are not just functional. They are existential projects — attempts to outlast death through stone.</p>

  <p>Third: <strong>wa idha batashtum batashtum jabbarin</strong> — "And when you strike, you strike as tyrants." <strong>Batasha</strong> — to strike with force, to seize violently. <strong>Jabbarin</strong> — the plural of <strong>jabbar</strong>, a word that carries the root <strong>j-b-r</strong>, meaning to compel, to force, to be irresistibly powerful. The word <strong>al-Jabbar</strong> is one of Allah's names — the Compeller. 'Ad applies it to their own behavior among humans.</p>

  <h2>The Wind</h2>

  <p>The instrument of 'Ad's destruction is described with extraordinary precision across multiple surahs:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَرْسَلْنَا عَلَيْهِمْ رِيحًا صَرْصَرًا فِي أَيَّامٍ نَّحِسَاتٍ لِّنُذِيقَهُمْ عَذَابَ الْخِزْيِ فِي الْحَيَاةِ الدُّنْيَا</p>
    <p class="translation">"So We sent upon them a screaming wind during days of misfortune, to make them taste the punishment of disgrace in worldly life."</p>
    <cite>Surah Fussilat (41:16)</cite>
  </blockquote>

  <p><strong>Rihan sarsaran</strong> — a screaming wind, a howling wind. The word <strong>sarsar</strong> is onomatopoeic — it sounds like what it describes. The doubled <strong>sar</strong> mimics the sustained shriek of a wind that does not relent. <strong>Fi ayyamin nahisat</strong> — "during days of misfortune." The plural <strong>ayyam</strong> — days — indicates duration. This is not a gust. It is a sustained campaign of wind across multiple days.</p>

  <p>In Surah Al-Qamar, the duration is specified:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنَّا أَرْسَلْنَا عَلَيْهِمْ رِيحًا صَرْصَرًا فِي يَوْمِ نَحْسٍ مُّسْتَمِرٍّ</p>
    <p class="translation">"Indeed, We sent upon them a screaming wind on a day of continuous misfortune."</p>
    <cite>Surah Al-Qamar (54:19)</cite>
  </blockquote>

  <p>And in Surah Al-Haqqah, the most detailed account:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">سَخَّرَهَا عَلَيْهِمْ سَبْعَ لَيَالٍ وَثَمَانِيَةَ أَيَّامٍ حُسُومًا ۖ فَتَرَى الْقَوْمَ فِيهَا صَرْعَىٰ كَأَنَّهُمْ أَعْجَازُ نَخْلٍ خَاوِيَةٍ</p>
    <p class="translation">"He subjected it upon them for seven nights and eight days in succession, and you would see the people therein fallen as if they were hollow trunks of palm trees."</p>
    <cite>Surah Al-Haqqah (69:7)</cite>
  </blockquote>

  <p>Seven nights. Eight days. <strong>Husuman</strong> — continuously, without interruption. The wind blows for over a week without stopping. <strong>Sakkarahah 'alayhim</strong> — "He subjected it upon them" — the verb <strong>sakhkhara</strong> means to subjugate, to harness, to direct a force toward a purpose. The same verb the Quran uses for the harnessing of wind and sea for Sulayman's benefit is used here for the harnessing of wind against 'Ad. The wind serves. The question is whom it serves.</p>

  <p>The image: <strong>ka-annahum a'jazu nakhlin khawiyah</strong> — "as if they were hollow trunks of palm trees." <strong>A'jaz</strong> — the lower trunks, the stumps left after a palm falls. <strong>Khawiyah</strong> — hollow, empty inside. The people who built pillars — <strong>dhat al-'imad</strong> — are compared to fallen palm trunks. The vertical structures they constructed are mirrored by the vertical trunks they resemble in death. The pillars stood. The people fell like trees. The wind — invisible, weightless, ungraspable — toppled the strongest civilization in the world by simply blowing. The strength of 'Ad had no protocol for fighting air.</p>
</article>`
  },
  {
    title: "Hud's Defiance: The Prophet Who Said 'Plot Against Me'",
    slug: "huds-defiance-the-prophet-who-said-plot-against-me",
    type: 'article' as const,
    excerpt: "Hud tells his people to conspire against him — all of them, with all their power — and assures them they cannot harm him. The challenge is so direct that it redefines what prophetic courage looks like.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['hud', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Most prophets in the Quran respond to threats with patience, with du'a, with appeals to reason. Hud does something different. When 'Ad threatens him, he does not withdraw or soften. He escalates — but the escalation is not toward violence. It is toward an open challenge that lays bare the power differential between the creation and the Creator.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنِّي أُشْهِدُ اللَّهَ وَاشْهَدُوا أَنِّي بَرِيءٌ مِّمَّا تُشْرِكُونَ ۝ مِن دُونِهِ ۖ فَكِيدُونِي جَمِيعًا ثُمَّ لَا تُنظِرُونِ</p>
    <p class="translation">"Indeed, I call Allah to witness, and you bear witness, that I am free of what you associate with Him. So plot against me — all of you — and then do not give me respite."</p>
    <cite>Surah Hud (11:54-55)</cite>
  </blockquote>

  <p>Three moves in two ayahs. First: <strong>inni ushhidu Allaha</strong> — "I call Allah to witness." Hud summons the divine as his witness — not as protector (though protection is implied) but as observer. The trial is public. The evidence is being recorded.</p>

  <p>Second: <strong>wa ash-hadu anni bari'un mimma tushrikun</strong> — "and bear witness that I am free of what you associate." He invites his opponents to witness his own declaration of separation. <strong>Bari'</strong> — from <strong>b-r-'</strong>, to be free, clear, innocent — is a total dissociation. He places his opponents in the role of witnesses to his own innocence. They are not just adversaries; they are inadvertent participants in the proof against themselves.</p>

  <p>Third — and this is the extraordinary move: <strong>fa-kiduni jami'an thumma la tundhirun</strong> — "So plot against me, all of you, and then do not give me respite." The verb <strong>kidu</strong> — from <strong>k-y-d</strong>, to plot, to scheme, to devise a stratagem — is directed at himself. He tells them to plot. <strong>Jami'an</strong> — all of you, collectively, every single one. Not some of you. All of you. With all of your collective power, your unity, your numbers, your pillar-building, 'Ad-being strength. <strong>Thumma la tundhirun</strong> — "and then do not give me respite." Do not hesitate. Do not delay. Do not hold back out of residual courtesy. Bring everything you have, immediately.</p>

  <h2>The Source of the Confidence</h2>

  <p>The challenge makes no sense unless Hud has access to something his opponents do not. The next ayah identifies it:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنِّي تَوَكَّلْتُ عَلَى اللَّهِ رَبِّي وَرَبِّكُم ۚ مَّا مِن دَابَّةٍ إِلَّا هُوَ آخِذٌ بِنَاصِيَتِهَا ۚ إِنَّ رَبِّي عَلَىٰ صِرَاطٍ مُّسْتَقِيمٍ</p>
    <p class="translation">"Indeed, I have placed my trust in Allah, my Lord and your Lord. There is no creature but that He holds its forelock. Indeed, my Lord is on a straight path."</p>
    <cite>Surah Hud (11:56)</cite>
  </blockquote>

  <p><strong>Tawakkaltu 'ala Allah</strong> — "I have placed my trust in Allah." The root <strong>w-k-l</strong> means to entrust, to delegate, to rely upon an agent. <strong>Tawakkul</strong> is the act of making Allah one's representative — the advocate to whom the case is surrendered. Hud's defiance is not bravery in the conventional sense. It is an expression of tawakkul so total that the threat of an entire civilization becomes irrelevant.</p>

  <p>The image that follows is among the Quran's most vivid: <strong>ma min dabbatin illa huwa akhidhun bi-nasiyatiha</strong> — "there is no creature but that He holds its forelock." <strong>Dabbah</strong> — any creature that moves on earth. <strong>Nasiyah</strong> — the forelock, the front of the head, the part by which an animal is led. Allah holds the forelock of every creature. The image is of total control through the gentlest possible grip — not a chain, not a cage, but a hand on the forelock. The creature can turn its head. It cannot turn away.</p>

  <p>Applied to 'Ad: every member of this civilization that boasts <strong>man ashaddu minna quwwatan</strong> — "who is stronger than us?" — is held by the forelock. Their strength operates within a grip they cannot feel. Their freedom of movement exists within parameters they did not set. Hud sees this. They do not. His defiance is the natural posture of someone who knows the actual power map.</p>

  <h2>The Closing</h2>

  <p><strong>Inna rabbi 'ala siratin mustaqim</strong> — "Indeed, my Lord is on a straight path." This phrase — applied to Allah rather than to human conduct — is striking. The <strong>sirat al-mustaqim</strong> that humans are asked to walk is here attributed to God Himself. Allah's dealings are straight — direct, just, without deviation. The phrase assures Hud that whatever Allah does with 'Ad will be just, measured, and precise. The straight path is both the road Hud walks and the standard by which 'Ad will be judged.</p>

  <p>Hud's challenge — <strong>fa-kiduni jami'an</strong> — has echoed through Islamic history as the paradigm of prophetic fearlessness. A single man, with no army, no fortress, no political leverage, facing the most powerful civilization of his time, telling them to bring their worst. The confidence is not in himself. It is in the forelock-grip. Every scheme they devise, every plot they construct, every force they marshal — all of it operates within the hold of the One who holds their forelocks.</p>

  <p>The wind, when it comes, will prove the point. The strongest people on earth will be toppled by invisible air. The pillars will stand and the builders will lie hollow on the ground. Hud's defiance anticipated this — not because he knew the specific mechanism, but because he knew the principle: <strong>ma min dabbatin illa huwa akhidhun bi-nasiyatiha</strong>. There is no creature that escapes the grip. The forelock is always held. The question is not whether the grip exists but whether the creature acknowledges it.</p>
</article>`
  },
  {
    title: "Iram of the Pillars: The Lost City and the Quran's Geography of Warning",
    slug: "iram-of-the-pillars-the-lost-city-and-the-qurans-geography-of-warning",
    type: 'article' as const,
    excerpt: "The Quran names 'Ad's civilization 'Iram dhat al-'imad' — Iram of the Pillars. No other ancient source preserves this name with such specificity. The lost city becomes a permanent geography lesson.",
    reading_time_minutes: 9,
    status: 'published' as const,
    tags: ['hud', 'quranic-characters', 'ad', 'nations-and-peoples'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran gives 'Ad a name that no other ancient text preserves with the same precision: <strong>Iram dhat al-'imad</strong> — Iram of the Pillars. The name appears once, in Surah Al-Fajr, and it arrives without introduction or explanation — as though the audience already knows what it refers to. The Quran treats Iram as common knowledge among the first listeners, which suggests a living tradition in seventh-century Arabia about a civilization so great and so destroyed that its name had become proverbial.</p>

  <h2>The Name</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَلَمْ تَرَ كَيْفَ فَعَلَ رَبُّكَ بِعَادٍ ۝ إِرَمَ ذَاتِ الْعِمَادِ ۝ الَّتِي لَمْ يُخْلَقْ مِثْلُهَا فِي الْبِلَادِ</p>
    <p class="translation">"Have you not seen how your Lord dealt with 'Ad — Iram, possessors of lofty pillars — the like of whom had never been created in the lands?"</p>
    <cite>Surah Al-Fajr (89:6-8)</cite>
  </blockquote>

  <p><strong>Iram</strong> — the word itself is debated among classical scholars. Some read it as the name of the city. Others as the name of the tribal ancestor. Others as a region. The Quran does not clarify — and the ambiguity may be the point. <strong>Iram</strong> has become a name without a fixed referent, a civilization known only by its name and its pillars and its disappearance. The city that built the greatest monuments in the ancient world left behind a name and a lesson. The monuments themselves were swallowed by sand or wind or time.</p>

  <p><strong>Dhat al-'imad</strong> — "possessors of pillars." The pillars are the identity marker. Whatever else 'Ad achieved — their agriculture, their governance, their military power — the Quran remembers their architecture. They are the pillar-people. The monuments are what outlasted the civilization in collective memory, even if the monuments themselves no longer stand.</p>

  <p>The phrase <strong>allati lam yukhlaq mithlaha fil-bilad</strong> — "the like of whom had never been created in the lands" — is the Quran's own assessment, and it is unequivocal. This civilization was without peer. The word <strong>yukhlaq</strong> — "was created" — uses the passive divine voice. No civilization like them was <em>created</em> — meaning: even their exceptionalism was authored, not self-generated. They were made uniquely powerful by the same God who would send the wind against them.</p>

  <h2>The Context in Al-Fajr</h2>

  <p>Surah Al-Fajr places 'Ad in a sequence of three destroyed powers: 'Ad, Thamud, and Fir'awn. Each represents a different type of excess:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">الَّذِينَ طَغَوْا فِي الْبِلَادِ ۝ فَأَكْثَرُوا فِيهَا الْفَسَادَ ۝ فَصَبَّ عَلَيْهِمْ رَبُّكَ سَوْطَ عَذَابٍ</p>
    <p class="translation">"Those who transgressed in the lands and increased therein corruption. So your Lord poured upon them a scourge of punishment."</p>
    <cite>Surah Al-Fajr (89:11-13)</cite>
  </blockquote>

  <p>The three civilizations are grouped under one verb: <strong>taghaw</strong> — they transgressed, they exceeded bounds. The root <strong>t-gh-y</strong> means to overflow, to exceed a limit, to go beyond what is permitted. Water that exceeds its banks is <strong>tagha</strong>. A ruler who exceeds his authority is a <strong>taghiyah</strong>. The three civilizations — builders, carvers, and sovereigns — all share the same disease: they exceeded the boundaries set for them.</p>

  <p><strong>Fa-aktharu fiha al-fasad</strong> — "and they increased therein corruption." The verb <strong>aktharu</strong> — they made much, they multiplied — from <strong>k-th-r</strong>, abundance. They did not merely practice corruption. They increased it. They amplified it. They made it abundant. The <strong>fasad</strong> grew in proportion to their power. More pillars, more corruption. More carved mountains, more corruption. More sovereignty, more corruption. The capacity for construction and the capacity for corruption scaled together.</p>

  <p>The divine response: <strong>fa-sabba 'alayhim rabbuka sawta 'adhab</strong> — "so your Lord poured upon them a scourge of punishment." The verb <strong>sabba</strong> — to pour — is used for liquids. The word <strong>sawt</strong> — a whip, a scourge — is an instrument of striking. The combination is liquid and solid, pouring and striking — a punishment that arrives like a torrent and lands like a lash. For 'Ad, this was the wind. For Thamud, the blast. For Fir'awn, the sea. Each received the <strong>sawt</strong> in the medium appropriate to their transgression.</p>

  <h2>The Surveillance</h2>

  <p>The surah then steps back to make a universal statement:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">إِنَّ رَبَّكَ لَبِالْمِرْصَادِ</p>
    <p class="translation">"Indeed, your Lord is in observation."</p>
    <cite>Surah Al-Fajr (89:14)</cite>
  </blockquote>

  <p><strong>La-bil-mirsad</strong> — "in the watchtower," "at the lookout point," "in observation." The word <strong>mirsad</strong> comes from <strong>r-s-d</strong>, to watch, to observe, to monitor. A <strong>mirsad</strong> is a place from which one watches — an observation post, a watchtower positioned on a road to see who passes. The Quran places Allah at the <strong>mirsad</strong> — at the observation point on the road that every civilization travels.</p>

  <p>The verse is positioned after three civilizations have been named and their destruction recounted. The implication is architectural: 'Ad built pillars, Thamud carved mountains, Fir'awn commanded pyramids — and all of them passed beneath a watchtower they did not build and could not see. The <strong>mirsad</strong> was always there. The road they walked — the road of building, carving, reigning — always passed through the observation point.</p>

  <p>Iram of the Pillars is lost. No archaeologist has definitively identified its ruins. The name persists in the Quran and in the Arabic memory as the archetype of a civilization so powerful it believed itself immune. The pillars they built to announce their permanence are gone. The name the Quran gave them — five Arabic words in Surah Al-Fajr — outlasted every pillar they ever raised. The text is the monument now. The word is the architecture that survived.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Salih articles...')
  for (const article of salihArticles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: SALIH_ENTITY_ID, is_primary: true })
  }

  console.log('\nInserting Hud articles...')
  for (const article of hudArticles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: HUD_ENTITY_ID, is_primary: true })
  }

  console.log('\nRefreshing entity co-occurrence...')
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log(`✓ Done! ${salihArticles.length} Salih + ${hudArticles.length} Hud articles.`)
}
main().catch(console.error)
