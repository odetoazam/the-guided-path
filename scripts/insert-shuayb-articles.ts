#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const SHUAYB_ENTITY_ID = 'f0b2abfe-d75d-4964-a03f-6df1d42c99d3'

const articles = [
  {
    title: "The Prophet of the Marketplace: Shu'ayb and the Theology of Fair Trade",
    slug: "the-prophet-of-the-marketplace-shuayb-and-the-theology-of-fair-trade",
    type: 'article' as const,
    excerpt: "Most prophets confront idolatry. Shu'ayb confronts the scale. His people worshipped Allah — their crime was in the marketplace, where they gave short measure and called it business.",
    reading_time_minutes: 12,
    status: 'published' as const,
    tags: ['shuayb', 'quranic-characters', 'economic-justice'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Shu'ayb's people — the people of Madyan — are unusual among the destroyed nations of the Quran. They are not idol-worshippers in the conventional sense. The Quran does not describe them making statues or prostrating before images. Their crime is commercial. They cheat in trade. They give short measure. They take more than they give and call the difference profit. Shu'ayb's message is that the marketplace is a theological arena — and the scale is a moral instrument.</p>

  <h2>The Command That Opens Everything</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَيَا قَوْمِ أَوْفُوا الْمِكْيَالَ وَالْمِيزَانَ بِالْقِسْطِ ۖ وَلَا تَبْخَسُوا النَّاسَ أَشْيَاءَهُمْ وَلَا تَعْثَوْا فِي الْأَرْضِ مُفْسِدِينَ</p>
    <p class="translation">"O my people, give full measure and weight in justice, and do not deprive people of their things, and do not commit abuse on earth, spreading corruption."</p>
    <cite>Surah Hud (11:85)</cite>
  </blockquote>

  <p>Two instruments are named: <strong>al-mikyal</strong> — the measuring vessel, for volume — and <strong>al-mizan</strong> — the scale, for weight. <strong>Mikyal</strong> comes from the root <strong>k-y-l</strong>, which means to measure out grain, liquid, dry goods. <strong>Mizan</strong> comes from <strong>w-z-n</strong>, which means to weigh, to balance, to find equilibrium. The Quran pairs the two because they represent the complete system of commercial measurement: what is counted by volume and what is counted by weight. Shu'ayb addresses the entire mercantile apparatus.</p>

  <p>The qualifying phrase is <strong>bil-qist</strong> — "with justice." The root <strong>q-s-t</strong> means equity, fairness, the precise middle point. A <strong>qistas</strong> is a scale in its most accurate form. The command is not merely "fill the measure" but "fill the measure with the precision that justice demands." Commerce is elevated to the same vocabulary as divine justice — <strong>qist</strong> is the word used for Allah's justice on the Day of Judgment (<strong>wa nada'u al-mawazin al-qist</strong>, 21:47).</p>

  <p>The prohibition that follows — <strong>wa la tabkhasu an-nasa ashya'ahum</strong> — introduces a verb that deserves its own archaeology.</p>

  <h2>The Verb Bakhasa</h2>

  <p>The root <strong>b-kh-s</strong> means to diminish, to give less than what is due, to shortchange. <strong>Bakhasa</strong> is not theft — it is the subtler crime of reduction. The merchant who fills the measure but packs it loosely. The buyer who pays but disputes the quality to lower the price. The employer who compensates but less than the labor warrants. <strong>Bakhasa</strong> covers the entire spectrum of getting less than your due through the manipulation of the one who owes you.</p>

  <p>The object is <strong>ashya'ahum</strong> — "their things." Not specified. Not limited to grain or gold or livestock. <strong>Ashya'</strong> — the plural of <strong>shay'</strong>, "thing" — is deliberately open. Shu'ayb's prohibition covers every category of exchange: goods, services, rights, recognition. Do not diminish people's things — whatever those things are. The Quran refuses to list the categories because the principle is universal.</p>

  <p>This verb appears in connection with another prophet — Salih — and in Surah Al-Mutaffifin, which opens with one of the Quran's most direct commercial condemnations:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَيْلٌ لِّلْمُطَفِّفِينَ ۝ الَّذِينَ إِذَا اكْتَالُوا عَلَى النَّاسِ يَسْتَوْفُونَ ۝ وَإِذَا كَالُوهُمْ أَو وَّزَنُوهُمْ يُخْسِرُونَ</p>
    <p class="translation">"Woe to the defrauders — those who, when they take a measure from people, take in full, but when they give by measure or weight to them, give less."</p>
    <cite>Surah Al-Mutaffifin (83:1-3)</cite>
  </blockquote>

  <p>The <strong>mutaffifin</strong> — from <strong>t-f-f</strong>, meaning to take slightly less or give slightly less — are condemned with <strong>wayl</strong>, one of the Quran's strongest words of destruction. Their crime is asymmetry: <strong>yastawfun</strong> (they take in full) when measuring for themselves, <strong>yukhsirun</strong> (they cause loss) when measuring for others. The same instrument — the scale — is manipulated to produce different readings depending on who benefits. The scale itself becomes a tool of injustice, which is the precise inversion of its purpose.</p>

  <h2>Why the Scale Is Theological</h2>

  <p>Shu'ayb's message connects the marketplace to the divine in a way no other prophet's mission does so explicitly. He makes the link himself:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">بَقِيَّتُ اللَّهِ خَيْرٌ لَّكُمْ إِن كُنتُم مُّؤْمِنِينَ</p>
    <p class="translation">"What remains with Allah is better for you, if you are believers."</p>
    <cite>Surah Hud (11:86)</cite>
  </blockquote>

  <p><strong>Baqiyyat Allah</strong> — "what remains with Allah" — is a remarkable phrase. <strong>Baqiyyah</strong> means remainder, residue, what is left over. After the transaction is complete, after the exchange is made, what remains — the portion that persists — is with Allah. The phrase suggests that every commercial transaction has a divine remainder. The difference between what is owed and what is given does not vanish into the marketplace. It persists in a ledger that outlasts the business day.</p>

  <p>The conditional — <strong>in kuntum mu'minin</strong>, "if you are believers" — ties economic behavior directly to faith. The "if" is not gentle. It is a challenge: if you actually believe in what you claim to believe, then the remainder with Allah should matter more than the margin on the scale. Your marketplace behavior is the evidence of your theology. The scale does not lie about what the merchant believes — whatever his mouth says at prayer, his hands reveal at the register.</p>

  <h2>Their Response</h2>

  <p>The people of Madyan respond to Shu'ayb with a question that reveals their framework:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">قَالُوا يَا شُعَيْبُ أَصَلَاتُكَ تَأْمُرُكَ أَن نَّتْرُكَ مَا يَعْبُدُ آبَاؤُنَا أَوْ أَن نَّفْعَلَ فِي أَمْوَالِنَا مَا نَشَاءُ</p>
    <p class="translation">"They said: 'O Shu'ayb, does your prayer command you that we should leave what our fathers worshipped, or that we should not do with our wealth what we please?'"</p>
    <cite>Surah Hud (11:87)</cite>
  </blockquote>

  <p>They identify two objections and find them equally absurd: abandoning ancestral practices, and being told how to use their own wealth. The phrase <strong>an naf'ala fi amwalina ma nasha'u</strong> — "that we do with our wealth what we please" — is the claim of absolute economic autonomy. <strong>Amwalina</strong> — our wealth. <strong>Ma nasha'u</strong> — what we wish. They assert that wealth, once earned, belongs entirely to the earner and is subject to no external standard.</p>

  <p>Shu'ayb's response does not engage the autonomy claim directly. He simply reasserts: the measure must be full, the scale must be just, and what remains with Allah surpasses what is gained in the transaction. He does not debate the nature of property rights. He states the existence of a standard that operates regardless of whether the merchant acknowledges it. The scale measures two things at once: the grain and the faith.</p>

  <h2>The End of Madyan</h2>

  <p>The destruction comes as both earthquake and sound:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَأَخَذَتْهُمُ الرَّجْفَةُ فَأَصْبَحُوا فِي دَارِهِمْ جَاثِمِينَ</p>
    <p class="translation">"So the earthquake seized them, and they became fallen prone in their homes."</p>
    <cite>Surah Al-A'raf (7:91)</cite>
  </blockquote>

  <p><strong>Ar-rajfah</strong> — the earthquake, the convulsion — from the root <strong>r-j-f</strong>, which means to shake violently. <strong>Jathimin</strong> — fallen face down, collapsed on their knees. The marketplace merchants who stood upright behind their rigged scales are found <strong>jathimin</strong> — prostrate, face-down, in the very homes their profits built. The homes that the unfair margin purchased become the tombs that the earthquake sealed.</p>

  <p>In Surah Ash-Shu'ara, the destruction is a <strong>sayha</strong> — a blast, a scream from the sky. In Surah Hud, it is the earthquake plus the shadow day — <strong>'adhab yawm adh-dhullah</strong>, the punishment of the day of the overshadowing cloud. Each retelling adds a sensory dimension. The marketplace that was filled with sound — haggling, measuring, weighing — ends in a sound from which there is no negotiation.</p>
</article>`
  },
  {
    title: "Shu'ayb's Anguish: The Prophet Who Wept for a City That Mocked Him",
    slug: "shuaybs-anguish-the-prophet-who-wept-for-a-city-that-mocked-him",
    type: 'article' as const,
    excerpt: "After Madyan's destruction, the Quran records Shu'ayb turning away with a grief-stricken farewell. He does not celebrate. He mourns — and his mourning reveals what prophecy costs.",
    reading_time_minutes: 10,
    status: 'published' as const,
    tags: ['shuayb', 'quranic-characters'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">After the earthquake takes the people of Madyan — after the homes that housed the rigged scales become the tombs of their owners — the Quran records a moment that belongs to Shu'ayb alone. He turns from the destroyed city and speaks. What he says is not triumph. It is grief.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَتَوَلَّىٰ عَنْهُمْ وَقَالَ يَا قَوْمِ لَقَدْ أَبْلَغْتُكُمْ رِسَالَاتِ رَبِّي وَنَصَحْتُ لَكُمْ ۖ فَكَيْفَ آسَىٰ عَلَىٰ قَوْمٍ كَافِرِينَ</p>
    <p class="translation">"So he turned away from them and said: 'O my people, I had conveyed to you the messages of my Lord and advised you sincerely. So how could I grieve for a disbelieving people?'"</p>
    <cite>Surah Al-A'raf (7:93)</cite>
  </blockquote>

  <p>The verb <strong>tawalla</strong> — "he turned away" — carries the root <strong>w-l-y</strong>, which in its basic sense means to turn, to redirect. <strong>Tawalla 'anhum</strong> — he turned away from them. The preposition <strong>'an</strong> marks separation. He physically turns from the wreckage. The verb does not describe walking away — it describes the moment of reorientation, the pivot from facing the city to facing away from it.</p>

  <p>He addresses them still: <strong>ya qawmi</strong> — "O my people." The possessive is devastating. He calls them "my people" after they are gone. The man who warned them, who they mocked, who they threatened with expulsion, who they called weak — he still claims them. <strong>Qawmi</strong>, not <strong>qawm</strong>. My people. The possessive suffix <strong>-i</strong> persists even when the people it references no longer exist.</p>

  <h2>The Accounting</h2>

  <p><strong>Laqad ablaghtukum risalati rabbi</strong> — "I had conveyed to you the messages of my Lord." The particle <strong>laqad</strong> is emphatic confirmation. The verb <strong>ablaghtu</strong> — from <strong>b-l-gh</strong>, to reach, to deliver to its destination, to convey fully — means the message arrived. It was not lost in transmission. It was not garbled, not softened, not abbreviated. <strong>Risalati rabbi</strong> — "the messages of my Lord" — uses the plural, indicating multiple communications over time. Shu'ayb did not deliver one speech and leave. He conveyed repeatedly.</p>

  <p><strong>Wa nasahtu lakum</strong> — "and I advised you sincerely." The root <strong>n-s-h</strong> is nasiha — sincere counsel, the kind of advice that originates from genuine concern for the one advised. <strong>Nasiha</strong> is distinguished from <strong>ghish</strong>, its opposite — counsel that appears helpful but serves the advisor's interest. Shu'ayb claims <strong>nasiha</strong>: his counsel was for their benefit, not his own. He gained nothing from warning them. The marketplace prophet had no commercial interest in his own message.</p>

  <h2>The Question He Cannot Escape</h2>

  <p>And then the final phrase: <strong>fa-kayfa asa 'ala qawmin kafirin</strong> — "so how could I grieve for a disbelieving people?"</p>

  <p>The verb <strong>asa</strong> — from <strong>a-s-y</strong> in its primary form — means to grieve, to sorrow, to feel anguish. <strong>Kayfa asa</strong> — "how could I grieve?" — is structured as a rhetorical question. The expected answer is: I should not grieve; they rejected the message; the consequence was just.</p>

  <p>But the rhetorical question contains its own contradiction. He asks "how could I grieve?" — and the asking is the grief. A man who felt no sorrow would not need to pose the question. The question exists because the answer is not as simple as the grammar suggests. He grieves. He knows he should not — they rejected truth, they threatened him, they earned their destruction — and he grieves anyway. The question is addressed to himself as much as to the absent city: how can I feel this for people who did this to themselves?</p>

  <p>The Quran records this moment because it reveals something about the prophetic experience that no doctrinal statement could capture. The prophet does not celebrate the vindication of his message. He does not stand over the ruins and say, "I told you." He turns away and asks a question he already knows the answer to — and the answer is that he cannot stop feeling for people who never felt for him.</p>

  <h2>The Pattern Across Prophets</h2>

  <p>This moment echoes across the Quran's prophetic narratives. Nuh, after 950 years of rejection, cries out to his son as the flood rises: <strong>ya bunayya irkab ma'ana</strong> — "O my son, ride with us" (11:42). The boy refuses and drowns. Nuh then turns to Allah: <strong>rabbi inna ibni min ahli</strong> — "My Lord, my son is of my family" (11:45). The grief of the prophet is not extinguished by the justice of the punishment. The heart does not calibrate itself to theology with the precision of a scale.</p>

  <p>Ibrahim, before the destruction of Lut's people, argues for their survival. <strong>Yujadiluna fi qawmi Lut</strong> — "he argued concerning the people of Lut" (11:74). The angels tell him to stop: the decree has been issued. Ibrahim, the friend of Allah, pleads for people who are not his own community because his nature — <strong>halim</strong>, forbearing, <strong>awwah</strong>, deeply compassionate — makes it impossible for him to hear of destruction without interceding.</p>

  <p>Shu'ayb's moment after Madyan's destruction belongs to this tradition. The prophet's grief is not a flaw. It is the cost of the role. The one who carries the message cares about the recipients even when the recipients demonstrate, through sustained and deliberate rejection, that they do not care about the message. The care is not conditional on reception. It persists — and the persistence is the anguish.</p>

  <h2>Why the Quran Preserves This</h2>

  <p>The Quran could have ended Madyan's story at the earthquake: <strong>fa-asbahu fi darihim jathimin</strong>. They fell in their homes. Done. But the text adds a scene after the destruction — the prophet's soliloquy. It preserves the inner state of the messenger after the mission concludes. And the inner state is sorrow, not satisfaction.</p>

  <p>This preservation serves a function beyond biography. It teaches the reader what righteous grief looks like. Shu'ayb does not weep because the people were innocent — they were not. He does not weep because the punishment was unjust — it was just. He weeps because the possibility of their repentance, which he carried as hope throughout his ministry, is now permanently closed. The grief is for the foreclosed future — the repentance that could have happened and did not, the scales that could have been balanced and were not, the marketplace that could have been a place of justice and chose otherwise.</p>

  <p><strong>Fa-kayfa asa 'ala qawmin kafirin.</strong> How could I grieve. But he does. The question is the answer. The prophet who preached fair measure gives his people more grief than they earned — a generosity beyond the scale, unmeasured and unreturned.</p>
</article>`
  },
  {
    title: "The Orator of the Prophets: Why the Quran Calls Shu'ayb Khatib",
    slug: "the-orator-of-the-prophets-why-the-quran-calls-shuayb-khatib",
    type: 'article' as const,
    excerpt: "Classical scholars called Shu'ayb 'khatib al-anbiya' — the orator of the prophets. The Quran preserves more of his direct speech than almost any other prophet besides Musa, and his arguments have a persuasive architecture that repays close reading.",
    reading_time_minutes: 11,
    status: 'published' as const,
    tags: ['shuayb', 'quranic-characters', 'rhetoric'],
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
    content_html: `<article class="prose-blog">
  <p class="text-lg leading-relaxed">Classical scholars of tafsir gave Shu'ayb a title that no other prophet received: <strong>khatib al-anbiya'</strong> — the orator of the prophets. The designation reflects what the Quran itself demonstrates: Shu'ayb's speeches, preserved across Surah Al-A'raf, Surah Hud, and Surah Ash-Shu'ara, are among the most rhetorically structured addresses in the entire text. He does not simply warn. He builds arguments — layered, sequential, addressed to his audience's own logic.</p>

  <h2>The Opening Move</h2>

  <p>Every Shu'ayb speech in the Quran begins the same way:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَإِلَىٰ مَدْيَنَ أَخَاهُمْ شُعَيْبًا ۗ قَالَ يَا قَوْمِ اعْبُدُوا اللَّهَ مَا لَكُم مِّنْ إِلَـٰهٍ غَيْرُهُ</p>
    <p class="translation">"And to Madyan [We sent] their brother Shu'ayb. He said: 'O my people, worship Allah. You have no deity other than Him.'"</p>
    <cite>Surah Al-A'raf (7:85)</cite>
  </blockquote>

  <p>The structural designation is <strong>akhahum</strong> — "their brother." Every prophet in the Quran sent to a named community receives this title: Hud is <strong>akhahum</strong> to 'Ad, Salih to Thamud, Shu'ayb to Madyan. The word <strong>akh</strong> — brother — does not mean sibling. It means one of them, part of the community, sharing their origin and their stakes. The brother cannot be dismissed as an outsider. His concern is familial.</p>

  <p>The tawhid declaration — <strong>u'budu Allaha ma lakum min ilahin ghayruhu</strong> — is shared with every prophet. But what follows the declaration is where Shu'ayb diverges from the pattern. Where Hud speaks of power and Salih of signs, Shu'ayb moves immediately to economics.</p>

  <h2>The Argument's Architecture</h2>

  <p>In Surah Hud, Shu'ayb constructs his case in four moves. The first is the commercial imperative: full measure, just weight. The second is the prohibition against diminishing (<strong>la tabkhasu</strong>). The third is the broader ethical frame: do not spread corruption on earth. The fourth is the theological foundation:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَمَا أُرِيدُ أَنْ أُخَالِفَكُمْ إِلَىٰ مَا أَنْهَاكُمْ عَنْهُ ۚ إِنْ أُرِيدُ إِلَّا الْإِصْلَاحَ مَا اسْتَطَعْتُ ۚ وَمَا تَوْفِيقِي إِلَّا بِاللَّهِ ۚ عَلَيْهِ تَوَكَّلْتُ وَإِلَيْهِ أُنِيبُ</p>
    <p class="translation">"I do not intend to differ from you in what I forbid you from. I only intend reform as much as I am able. And my success is only through Allah. Upon Him I rely, and to Him I return."</p>
    <cite>Surah Hud (11:88)</cite>
  </blockquote>

  <p>The rhetorical sophistication here is exceptional. <strong>Ma uridu an ukhalifakum ila ma anhakum 'anhu</strong> — "I do not intend to do the thing I tell you not to do." This is the preemptive defense against the charge of hypocrisy — the argument a marketplace prophet must make before any other. If a man tells merchants to give full measure, the first suspicion is: does he give full measure himself? Shu'ayb addresses it directly. He does not practice what he prohibits. His commercial ethics match his prophetic message.</p>

  <p>Then the statement of purpose: <strong>in uridu illa al-islah</strong> — "I only intend reform." The root <strong>s-l-h</strong> — to repair, to make sound, to set right — is the root of Shu'ayb's brother-prophet Salih's own name. <strong>Islah</strong> is correction, not revolution. Shu'ayb is not proposing a new system. He is asking the existing system to function honestly. The scales already exist. The measures already exist. He asks only that they be used as designed.</p>

  <p>The qualification <strong>ma istata'tu</strong> — "as much as I am able" — is a remarkable admission of limitation. The prophet does not claim omnipotence. He claims effort bounded by capacity. This phrase reappears in Islamic jurisprudence as a foundational principle: obligation extends to the limit of capacity, not beyond it. Shu'ayb, the marketplace prophet, establishes a principle of proportional obligation in the same sentence where he describes his mission.</p>

  <h2>The Warning Within the Warning</h2>

  <p>Shu'ayb deploys a rhetorical tool unique to his speeches — the warning drawn from the audience's own history:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَيَا قَوْمِ لَا يَجْرِمَنَّكُمْ شِقَاقِي أَن يُصِيبَكُم مِّثْلُ مَا أَصَابَ قَوْمَ نُوحٍ أَوْ قَوْمَ هُودٍ أَوْ قَوْمَ صَالِحٍ ۚ وَمَا قَوْمُ لُوطٍ مِّنكُم بِبَعِيدٍ</p>
    <p class="translation">"O my people, let not your opposition to me lead you to be struck by the like of what struck the people of Nuh, or the people of Hud, or the people of Salih. And the people of Lut are not far from you."</p>
    <cite>Surah Hud (11:89)</cite>
  </blockquote>

  <p>He stacks four destroyed nations in sequence — Nuh's people, Hud's people, Salih's people, Lut's people — and then closes with a spatial observation: <strong>wa ma qawmu Lutin minkum bi-ba'id</strong> — "and the people of Lut are not far from you." The phrase works geographically — Madyan and the region of Sodom were in proximity — and theologically. The destroyed cities are not abstract precedents. They are neighbors. Their ruins are within sight.</p>

  <p>The rhetorical structure is a cascade: each named nation adds weight to the argument, and the final one — Lut's people — is positioned as both the most recent and the closest. The persuasion builds through accumulation. One precedent is ignorable. Four, with the last one down the road, is harder to dismiss.</p>

  <h2>The Counter-Offer</h2>

  <p>After the cascade of warnings, Shu'ayb makes a move that no other prophet in the Quran makes so explicitly — he offers the alternative path:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَاسْتَغْفِرُوا رَبَّكُمْ ثُمَّ تُوبُوا إِلَيْهِ ۚ إِنَّ رَبِّي رَحِيمٌ وَدُودٌ</p>
    <p class="translation">"And ask forgiveness of your Lord, then turn to Him in repentance. Indeed, my Lord is Merciful, Affectionate."</p>
    <cite>Surah Hud (11:90)</cite>
  </blockquote>

  <p>The closing divine names are extraordinary: <strong>Rahim</strong> and <strong>Wadud</strong>. <strong>Rahim</strong> — Merciful — is expected. <strong>Wadud</strong> is rare. It appears only twice in the Quran (here and in Surah Al-Buruj, 85:14). The root <strong>w-d-d</strong> means love — not mercy, not compassion, not forgiveness, but active, affectionate love. <strong>Wadud</strong> is the One who loves. Shu'ayb, the prophet of the marketplace, the man who argues about scales and measures, closes his speech with the name of divine love. The oratory moves from commerce to cosmology — from the weight of grain to the love of God — in a single rhetorical arc.</p>

  <p>This is what earned him the title <strong>khatib al-anbiya'</strong>. His arguments are constructed, not improvised. They begin where the audience lives — in the marketplace — and end where the message leads — in the presence of a God who is both just and loving. The gap between the scale and the divine is bridged by the architecture of his speech. He does not leap from one to the other. He builds a road, and each sentence is a step along it.</p>
</article>`
  }
]

async function main() {
  console.log('Inserting Shu\'ayb articles...')
  for (const article of articles) {
    const { data: post, error } = await supabase.from('posts').insert(article).select('id, title').single()
    if (error) { console.error(`Failed: "${article.title}":`, error.message); continue }
    console.log(`✓ "${post.title}"`)
    await supabase.from('entity_tags').insert({ post_id: post.id, entity_id: SHUAYB_ENTITY_ID, is_primary: true })
  }
  await supabase.rpc('refresh_entity_co_occurrence')
  console.log('✓ Done!', articles.length, 'Shu\'ayb articles.')
}
main().catch(console.error)
