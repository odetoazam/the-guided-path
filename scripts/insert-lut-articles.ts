#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const LUT_ENTITY_ID = '809136ae-23b1-4e5a-9886-c30dc2517764'
const IBRAHIM_ENTITY_ID = 'dc5cd1d2-00d3-482d-bdcd-2d20344e7838'

const articles = [
  {
    title: "The Prophet Who Had No Tribe",
    slug: "the-prophet-who-had-no-tribe",
    type: 'article' as const,
    excerpt: "Every other prophet in the Quran is sent to his own people. Lut is the exception — a stranger in the city he was sent to serve, without clan, without backing, without the social infrastructure that every other messenger could draw upon.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['lut', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quranic prophets share a structural pattern: each is sent to <strong>qawmihi</strong> — his own people. Nuh to his people. Hud to 'Ad. Salih to Thamud. Shu'ayb to Madyan. The prophet emerges from within the community he addresses. He shares their language, their lineage, their cultural memory. When they reject him, they reject one of their own — and the Quran registers this as an aggravating factor. They knew him. They had no excuse for suspicion.</p>

  <p>Lut breaks this pattern. He is Ibrahim's nephew — <strong>fa-amana lahu Lut</strong>, "and Lut believed in him" (29:26). He travels with Ibrahim from Mesopotamia. When they part ways, Lut settles in the region of Sodom. He is a migrant, a transplant, a prophet without tribal roots in the land he serves. The Quran never calls the people of Sodom <strong>qawm Lut</strong> in the possessive sense that it calls 'Ad <strong>qawm Hud</strong>. They are <strong>qawm Lut</strong> in the sense of the people Lut was among — not the people Lut came from.</p>

  <h2>The Isolation</h2>

  <p>This structural isolation surfaces in the narrative's most anguished moment. When the guests arrive — the angels in human form — and the people of the city converge on Lut's house, he cries out:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالَ لَوْ أَنَّ لِي بِكُمْ قُوَّةً أَوْ آوِي إِلَىٰ رُكْنٍ شَدِيدٍ</p>
    <p class="translation">"He said: 'If only I had against you some power, or could take refuge in a strong support.'"</p>
    <cite>Surah Hud (11:80)</cite>
  </blockquote>

  <p>The word <strong>rukn</strong> — "pillar," "support," "corner" — carries the root <strong>r-k-n</strong>, which means to lean on, to rely upon, to find stability in something solid. A <strong>rukn shadid</strong> is a strong pillar — and in the tribal context of the ancient world, this means a clan, a family, a group of men who would stand beside you when threatened. Lut has no <strong>rukn</strong>. He has no male relatives in the city, no tribal alliance, no network of obligation that would bring armed men to his door. His wish — <strong>law anna li bikum quwwah</strong>, "if only I had power against you" — is the expression of a man who knows he stands physically alone between a mob and the guests he is bound by sacred law to protect.</p>

  <p>The depth of this anguish becomes clear when compared to other prophets. When Musa faces Fir'awn, he has Harun. When Ibrahim debates his father's idolatry, he has the intellectual confidence of a man arguing from conviction. When Muhammad faces Quraysh, he has Abu Bakr, Khadijah, the early believers. Lut has his household — and even his household is fractured, as the narrative will reveal.</p>

  <h2>What They Said to Him</h2>

  <p>The city's response to his prophetic mission — before the night of the angels — is preserved across multiple surahs. In Surah Al-A'raf:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَمَا كَانَ جَوَابَ قَوْمِهِ إِلَّا أَن قَالُوا أَخْرِجُوهُم مِّن قَرْيَتِكُمْ ۖ إِنَّهُمْ أُنَاسٌ يَتَطَهَّرُونَ</p>
    <p class="translation">"And the answer of his people was nothing but that they said: 'Expel them from your city. Indeed, they are people who keep themselves pure.'"</p>
    <cite>Surah Al-A'raf (7:82)</cite>
  </blockquote>

  <p>The irony is left to stand without commentary. <strong>Innahu unasun yatatahharun</strong> — "they are people who purify themselves." The community uses purity — <strong>tahara</strong>, the root that gives us <strong>taharah</strong>, ritual purification — as a term of mockery. The accusation is: they maintain moral standards. And for this, they should be expelled. The community has inverted its value system so completely that purity becomes a charge of social deviance. The Quran preserves the statement without annotation because the inversion annotates itself.</p>

  <p>In Surah Ash-Shu'ara, they escalate:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا لَئِن لَّمْ تَنتَهِ يَا لُوطُ لَتَكُونَنَّ مِنَ الْمُخْرَجِينَ</p>
    <p class="translation">"They said: 'If you do not desist, O Lut, you will surely be of those expelled.'"</p>
    <cite>Surah Ash-Shu'ara (26:167)</cite>
  </blockquote>

  <p>The threat of expulsion — <strong>al-mukhrajin</strong>, those who are driven out — is wielded against the prophet as though exile were the ultimate penalty. For a man without tribal roots in the city, the threat carries double weight. He has no homeland to return to. Expulsion from this city is expulsion into nowhere. The community wields his isolation as a weapon.</p>

  <h2>The Night</h2>

  <p>When the angels arrive in the form of young men, the city moves toward Lut's house. The Quran describes the scene in Surah Hud with unflinching clarity:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَجَاءَهُ قَوْمُهُ يُهْرَعُونَ إِلَيْهِ وَمِن قَبْلُ كَانُوا يَعْمَلُونَ السَّيِّئَاتِ</p>
    <p class="translation">"And his people came rushing toward him, and before this they had been doing evil deeds."</p>
    <cite>Surah Hud (11:78)</cite>
  </blockquote>

  <p>The verb <strong>yuhra'una</strong> — "rushing," "being driven" — is in a form that can imply compulsion, as if they were driven by something within themselves. The root <strong>h-r-'</strong> carries a sense of being impelled, hurried toward something involuntarily. The crowd moves toward Lut's house as if pulled by the gravity of their own obsession. And the parenthetical — <strong>wa min qablu kanu ya'maluna as-sayyi'at</strong>, "and before this they had been doing evil deeds" — establishes that this night is not an aberration. It is the culmination of a sustained practice. The verb <strong>kanu</strong> ("they were") marks it as habitual, established, ongoing.</p>

  <p>Lut offers an alternative — <strong>ha'ula'i banati</strong>, "these are my daughters" — proposing lawful marriage as a substitute for their demand. They dismiss him. And it is at this point that Lut utters his cry for a <strong>rukn shadid</strong>, a strong pillar that does not exist.</p>

  <p>The angels then reveal themselves:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا يَا لُوطُ إِنَّا رُسُلُ رَبِّكَ لَن يَصِلُوا إِلَيْكَ</p>
    <p class="translation">"They said: 'O Lut, we are the messengers of your Lord. They will never reach you.'"</p>
    <cite>Surah Hud (11:81)</cite>
  </blockquote>

  <p><strong>Lan yasilu ilayka</strong> — "they will never reach you." The particle <strong>lan</strong> negates the future with permanence. The mob that rushed toward the house is permanently blocked. Lut's <strong>rukn shadid</strong> — the strong support he wished for — was already in his house, sitting at his table. The pillar was present before the crisis. He could not see it because it wore the appearance of vulnerable guests who needed his protection. The protector turns out to be the protected.</p>

  <h2>The Departure Before Dawn</h2>

  <p>The instruction is precise:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَسْرِ بِأَهْلِكَ بِقِطْعٍ مِّنَ اللَّيْلِ وَلَا يَلْتَفِتْ مِنكُمْ أَحَدٌ إِلَّا امْرَأَتَكَ</p>
    <p class="translation">"So set out with your family during a portion of the night, and let not any among you look back — except your wife."</p>
    <cite>Surah Hud (11:81)</cite>
  </blockquote>

  <p><strong>Bi-qit'in min al-layl</strong> — "during a piece of the night." The word <strong>qit'</strong> means a cut, a portion, a fragment. The night is divided and Lut receives a fragment of it — a window between the mob's retreat and the dawn's arrival. His escape is temporal: a sliver of darkness wide enough to walk through.</p>

  <p><strong>Wa la yaltafit minkum ahad</strong> — "let not any of you turn around." The root <strong>l-t-f</strong> in this form means to turn back, to look behind. The instruction is to leave without looking at what is left behind. The city that was home — however hostile — is to be departed from without a backward glance. The prophet who had no tribe in this city is told to leave it as though it never held him.</p>

  <p>The exception — <strong>illa imra'ataka</strong>, "except your wife" — fractures the household at the moment of departure. She will be struck by what strikes the city. The isolation that defined Lut's ministry extends into his own family. The man who had no tribal support discovers that even within his domestic sphere, the split runs through. The prophet who stood alone in the city stands nearly alone in his own home.</p>
</article>`
  },
  {
    title: "The Wife Who Remained: Lut's Household and the Limits of Proximity",
    slug: "the-wife-who-remained-luts-household-and-the-limits-of-proximity",
    type: 'article' as const,
    excerpt: "Lut's wife lived in a prophet's house, shared his meals, heard his message daily. The Quran groups her with the wife of Nuh as proof that proximity to truth guarantees nothing.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['lut', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran pairs two women in a single ayah in Surah At-Tahrim — the wives of Nuh and Lut. The pairing is placed immediately before another pair: the wife of Fir'awn and Maryam. The four women form two pairs that establish a principle the Quran states nowhere else with such compressed force.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">ضَرَبَ اللَّهُ مَثَلًا لِّلَّذِينَ كَفَرُوا امْرَأَتَ نُوحٍ وَامْرَأَتَ لُوطٍ ۖ كَانَتَا تَحْتَ عَبْدَيْنِ مِنْ عِبَادِنَا صَالِحَيْنِ فَخَانَتَاهُمَا فَلَمْ يُغْنِيَا عَنْهُمَا مِنَ اللَّهِ شَيْئًا</p>
    <p class="translation">"Allah presents an example for those who disbelieved: the wife of Nuh and the wife of Lut. They were under two of Our righteous servants, yet they betrayed them. So those two [prophets] availed them nothing against Allah."</p>
    <cite>Surah At-Tahrim (66:10)</cite>
  </blockquote>

  <p>The phrase <strong>kanata tahta 'abdayni min 'ibadina salihayni</strong> — "they were under two of Our righteous servants" — establishes the maximum possible proximity to prophetic truth. <strong>Tahta</strong> — "under" — is the word used for the marital relationship in Arabic. They lived in the household of prophethood. They shared the daily life of men the Quran calls <strong>salihayni</strong> — the dual form of righteous. Two prophets. Two righteous servants. And two wives who, despite this proximity, <strong>khanatahuma</strong> — betrayed them.</p>

  <p>The verb <strong>khanata</strong> — from <strong>kh-w-n</strong>, to betray, to be unfaithful in trust — does not specify the nature of the betrayal. Classical commentators emphasize that the betrayal was in faith, not in marital fidelity. These women betrayed the prophetic mission — they aligned with the communities that opposed their husbands rather than with the message their husbands carried. The Quran leaves the specifics unelaborated because the principle does not depend on the details: proximity to a prophet does not transfer prophethood's benefits.</p>

  <h2>What Proximity Cannot Do</h2>

  <p><strong>Fa-lam yughniya 'anhuma min Allahi shay'an</strong> — "so those two availed them nothing against Allah." The verb <strong>yughniya</strong> comes from the root <strong>gh-n-y</strong>, which means to suffice, to make needless, to enrich. The prophets' righteousness could not <strong>enrich</strong> their wives before Allah. The relationship — the most intimate social bond available — carried no transferable spiritual credit.</p>

  <p>This is the Quran establishing, through example rather than abstract rule, that faith is non-transferable. Blood does not transmit it. Marriage does not transmit it. Daily proximity to a prophet — hearing the revelation, watching the practice, living inside the household where divine communication arrives — does not transmit it. Faith is an individual act, and its absence is an individual responsibility.</p>

  <p>The conclusion of the ayah is addressed to both women:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَقِيلَ ادْخُلَا النَّارَ مَعَ الدَّاخِلِينَ</p>
    <p class="translation">"And it was said: 'Enter the Fire with those who enter.'"</p>
    <cite>Surah At-Tahrim (66:10)</cite>
  </blockquote>

  <p><strong>Ma'a ad-dakhilin</strong> — "with those who enter." They enter the Fire not in a special category — not as "wives of prophets who fell short" — but <strong>with</strong> everyone else who enters. Their proximity to prophethood earns no special classification in the accounting. They are grouped with the general population of the Fire. The marital bond to a prophet, in the end, carries no more weight than any other social bond that was not accompanied by personal faith.</p>

  <h2>The Counter-Example</h2>

  <p>The very next ayah presents the inverse — and the inversion is structurally stunning:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَضَرَبَ اللَّهُ مَثَلًا لِّلَّذِينَ آمَنُوا امْرَأَتَ فِرْعَوْنَ إِذْ قَالَتْ رَبِّ ابْنِ لِي عِندَكَ بَيْتًا فِي الْجَنَّةِ وَنَجِّنِي مِن فِرْعَوْنَ وَعَمَلِهِ</p>
    <p class="translation">"And Allah presents an example for those who believed: the wife of Fir'awn, when she said: 'My Lord, build for me near You a house in Paradise and save me from Fir'awn and his deeds.'"</p>
    <cite>Surah At-Tahrim (66:11)</cite>
  </blockquote>

  <p>Asiya — the wife of Fir'awn — is the mirror. She lived in the house of the greatest tyrant in the Quran. She shared the palace of a man who declared <strong>ana rabbukum al-a'la</strong>. Her proximity was to the furthest possible point from prophethood. And she believed.</p>

  <p>Her prayer — <strong>rabbi ibni li 'indaka baytan fi al-jannah</strong>, "my Lord, build for me near You a house in Paradise" — asks for a house <strong>'indaka</strong>, "near You." She seeks proximity to Allah as a replacement for the proximity to Fir'awn that she rejects. The word <strong>baytan</strong> — "a house" — is the same domestic word that describes the household she currently inhabits. She wants a different house, in a different location, near a different lord.</p>

  <p><strong>Wa najjini min Fir'awna wa 'amalihi</strong> — "and save me from Fir'awn and his deeds." She asks to be saved from her own husband. The intimacy of marriage becomes the thing she needs rescue from. The same bond that failed to save the wives of Nuh and Lut — marriage to a righteous man — here fails to condemn: marriage to a tyrant does not condemn the wife of Fir'awn. In both directions, the principle holds. Faith is individual. Environment is relevant but not determinative. The wife of a prophet can disbelieve. The wife of a tyrant can believe.</p>

  <h2>The Principle in Lut's Narrative</h2>

  <p>Within the Lut narrative itself, the wife's fate is woven into the departure scene. When the angels instruct Lut to leave the city with his family, the exception is stated plainly: <strong>illa imra'ataka</strong> — "except your wife." She is family — <strong>ahlika</strong> — but she is excluded from the household's salvation. The biological and legal bond holds. The spiritual bond does not.</p>

  <p>The Quran does not describe what Lut's wife did in the city. It does not narrate her actions, her conversations, her daily life. It simply groups her with those who will be struck: <strong>innahu musibaha ma asabahum</strong> — "indeed, what strikes them will strike her" (11:81). She is absorbed into the city's fate. Her household identity — wife of the prophet — does not override her communal alignment. She chose the city's values over the prophet's message, and the consequence follows the choice, not the marriage certificate.</p>

  <p>The silence about her specific actions is the Quran's way of making the principle portable. The lesson does not depend on the particular nature of her betrayal. It depends on the structural truth: a person embedded in the household of divine guidance can reject that guidance and face the same outcome as those who never encountered it. The geography of the soul is not determined by the geography of the home.</p>

  <h2>What This Teaches</h2>

  <p>The four women of Surah At-Tahrim — two wives of prophets, one wife of a tyrant, one unmarried woman (Maryam) — form a matrix. Marriage to a prophet does not save. Marriage to a tyrant does not condemn. Unmarried sanctity is possible. The social structures that organize human life — marriage, family, household — are real but spiritually neutral. They provide context, not destiny. Every person faces the divine accounting individually, carrying only what they chose, not what they inherited or married into.</p>

  <p>For Lut's wife, this means the years in the prophet's house — years of hearing his message, watching his grief, observing his lonely stand against the city — produced nothing that transferred to her account. The message was available. The proximity was maximal. The response was hers alone. And the response was refusal — not dramatic, not announced, but lived out in the quiet alignment with a community that mocked her husband's purity. When the moment came to leave the city, she could not leave what she had become part of. The city's fate was her fate because the city's values were her values. The house of the prophet was, in the end, just a building she slept in.</p>
</article>`
  },
  {
    title: "The Overturned Cities: What the Quran Preserves of Sodom",
    slug: "the-overturned-cities-what-the-quran-preserves-of-sodom",
    type: 'article' as const,
    excerpt: "The Quran calls them al-mu'tafikah — the overturned, the inverted. The word itself carries the theological diagnosis: a civilization that inverted its values was physically inverted by the earth.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['lut', 'quranic-characters', 'nations-and-peoples'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran has a name for the cities of Lut's people: <strong>al-mu'tafikah</strong>. The word appears in Surah At-Tawbah, Surah Al-Haqqah, and Surah An-Najm. It comes from the root <strong>a-f-k</strong>, which means to turn something upside down, to invert, to overturn. The <strong>mu'tafikah</strong> are the overturned cities — the places that were flipped, inverted, made to face the opposite direction from where they stood.</p>

  <p>The root <strong>a-f-k</strong> carries a second meaning: to lie, to divert from truth, to say what is false. An <strong>ifk</strong> is a lie — the great slander. The same root that means "to overturn physically" means "to invert truth." The Quran's name for these cities encodes both their deed and their punishment in a single word. They inverted truth; they were inverted.</p>

  <h2>The Method of Destruction</h2>

  <p>Surah Hud describes the end with geological precision:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَلَمَّا جَاءَ أَمْرُنَا جَعَلْنَا عَالِيَهَا سَافِلَهَا وَأَمْطَرْنَا عَلَيْهَا حِجَارَةً مِّن سِجِّيلٍ مَّنضُودٍ</p>
    <p class="translation">"So when Our command came, We made the highest part of it the lowest, and rained upon it stones of layered hard clay."</p>
    <cite>Surah Hud (11:82)</cite>
  </blockquote>

  <p><strong>Ja'alna 'aliyaha safilaha</strong> — "We made its highest its lowest." The sentence structure mirrors the action: <strong>'aliyaha</strong> (its high) and <strong>safilaha</strong> (its low) are placed next to each other, and the verb <strong>ja'alna</strong> (We made) swaps their positions. The city is literally turned upside down — its upper structures driven into the earth, its foundations exposed to the sky. The overturning is both physical and verbal. The Arabic enacts what it describes.</p>

  <p>The stones — <strong>hijaratan min sijjilin mandud</strong> — are described with unusual precision. <strong>Sijjil</strong> is hard baked clay. <strong>Mandud</strong> means layered, stacked, arranged in sequence. These are not random projectiles. They are ordered, prepared, layered — the word <strong>mandud</strong> implies pre-arrangement. The destruction arrives as architecture: stones that were stacked before they were deployed, as though the punishment were constructed with the same deliberateness with which the cities were built.</p>

  <h2>The Mark</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">مُّسَوَّمَةً عِندَ رَبِّكَ ۖ وَمَا هِيَ مِنَ الظَّالِمِينَ بِبَعِيدٍ</p>
    <p class="translation">"Marked from your Lord. And it is not far from the wrongdoers."</p>
    <cite>Surah Hud (11:83)</cite>
  </blockquote>

  <p>The word <strong>musawwamah</strong> — "marked" — carries the root <strong>s-w-m</strong>, which means to brand, to mark with a sign. Each stone bears an identification. In some readings, each stone carries the name of its intended recipient. The destruction is not indiscriminate. It is precise, individual, addressed.</p>

  <p>And then the closing phrase: <strong>wa ma hiya min adh-dhalimin bi-ba'id</strong> — "and it is not far from the wrongdoers." The pronoun <strong>hiya</strong> — "it" — refers to the stones, to the punishment, to the overturning. And the Quran directs this observation not at the people of Lut's time but at <strong>adh-dhalimin</strong> — the wrongdoers, present tense, any era. The punishment is not far from them. The word <strong>ba'id</strong> — "far" — is negated. The distance between the wrongdoer and the consequence is small. This is the Quran converting a historical narrative into a standing warning: the same root <strong>a-f-k</strong> that describes the physical overturning of Sodom describes the moral overturning practiced by wrongdoers in any age.</p>

  <h2>The Geography of Passage</h2>

  <p>The Quran makes a remarkable observation in Surah Al-Hijr:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِنَّهَا لَبِسَبِيلٍ مُّقِيمٍ</p>
    <p class="translation">"And indeed, it is on an established road."</p>
    <cite>Surah Al-Hijr (15:76)</cite>
  </blockquote>

  <p>The ruins of the overturned cities sit on <strong>sabil muqim</strong> — an established road, a permanent path. The trade routes of the ancient world passed through the region where these cities once stood. Travelers — merchants, caravans, pilgrims — would pass through the area regularly. The Quran notes this: the evidence is on your commute. The ruins are not hidden in some remote wilderness requiring an expedition to discover. They sit along the road you already travel.</p>

  <p>In Surah As-Saffat, the Quran addresses the Quraysh directly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِنَّكُمْ لَتَمُرُّونَ عَلَيْهِم مُّصْبِحِينَ ۝ وَبِاللَّيْلِ ۗ أَفَلَا تَعْقِلُونَ</p>
    <p class="translation">"And you pass by them in the morning and at night. Will you not then reason?"</p>
    <cite>Surah As-Saffat (37:137-138)</cite>
  </blockquote>

  <p><strong>La-tamurruna 'alayhim musbihin</strong> — "you pass by them in the morning." <strong>Wa bil-layl</strong> — "and at night." The verb <strong>tamurruna</strong> — "you pass" — is in the present tense, habitual. This is something they do regularly. The ruins are part of their landscape, as familiar as their own markets. And the question: <strong>a-fa-la ta'qilun</strong> — "will you not then reason?" The verb <strong>ta'qilun</strong> — from <strong>'-q-l</strong>, to bind, to comprehend, to use the intellect — asks whether the daily encounter with these ruins has produced any intellectual response at all.</p>

  <p>The Quran's relationship to the destroyed cities is not archaeological curiosity. It is pedagogical geography. The ruins exist on the road precisely so that travelers encounter them. The overturned ground, the strange formations, the evidence of a civilization that was made to face the wrong way — all of it sits where people walk and ride. The sign is embedded in the commute. The question is whether the commuter reads it or walks past.</p>

  <h2>What the Name Carries</h2>

  <p><strong>Al-mu'tafikah.</strong> The overturned. The inverted. The name persists in the Quran across three surahs — At-Tawbah (9:70), Al-Haqqah (69:9), An-Najm (53:53). Each time, the word arrives as a single noun, no explanation needed, because the name carries the full weight of the story. The cities that inverted value — that called purity a crime and assault a right — were themselves inverted. <strong>'Aliyaha safilaha</strong>. Highest became lowest. The phonetic echo between <strong>ifk</strong> (lie) and <strong>mu'tafikah</strong> (overturned) is the Quran's way of encoding the relationship between moral inversion and physical consequence into the language itself.</p>

  <p>The name is preserved so that every future occurrence of the root <strong>a-f-k</strong> — every time someone hears <strong>ifk</strong>, every time a lie is called an <strong>ifk</strong> — carries the memory of cities that were turned upside down because they turned truth upside down. The root itself becomes a monument. The linguistic evidence outlasts the geological.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Lut articles...')
  for (const article of articles) {
    const { data: post, error: postError } = await supabase
      .from('posts').insert(article).select('id, title, slug').single()
    if (postError) { console.error(`Failed: "${article.title}":`, postError.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: LUT_ENTITY_ID, is_primary: true })
    // Secondary tag Ibrahim for the first article (Lut is Ibrahim's nephew)
    if (article.slug.includes('no-tribe')) {
      await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: IBRAHIM_ENTITY_ID, is_primary: false })
    }
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('✓ Done!', articles.length, 'Lut articles inserted.')
}
main().catch(console.error)
