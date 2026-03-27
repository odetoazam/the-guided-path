#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY!
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY)

async function getEntityId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
  return data?.id ?? null
}

async function insertArticle(
  article: {
    title: string
    slug: string
    type: string
    excerpt: string
    content_html: string
    status: string
    tags: string[]
    reading_time_minutes: number
    featured: boolean
    published_at: string
  },
  entityTags: { slug: string; is_primary: boolean }[]
) {
  console.log(`\nInserting article: "${article.title}"`)

  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({ ...article, created_by: '5814582a-9f09-473a-be6f-619c210cca8e' })
    .select('id')
    .single()

  if (postError || !post) {
    console.error(`  Failed to insert post:`, postError)
    return
  }

  console.log(`  Post inserted with ID: ${post.id}`)

  for (const tag of entityTags) {
    const entityId = await getEntityId(tag.slug)
    if (!entityId) {
      console.log(`  Entity "${tag.slug}" not found — skipping`)
      continue
    }

    const { error: tagError } = await supabase.from('entity_tags').insert({
      post_id: post.id,
      entity_id: entityId,
      is_primary: tag.is_primary,
    })

    if (tagError) {
      console.error(`  Failed to tag entity "${tag.slug}":`, tagError)
    } else {
      console.log(`  Tagged entity "${tag.slug}" (primary: ${tag.is_primary})`)
    }
  }
}

// ---------------------------------------------------------------------------
// ARTICLE 1: Shaytan's Promise: The Day of Judgment Confession
// ---------------------------------------------------------------------------

const article1_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a scene the Quran stages with extraordinary dramatic precision. It takes place after everything is over — after the test of life has concluded, after the results are in, after there is nothing left to gain or lose. On the Day of Judgment, Shaytan stands before those who followed him and delivers what might be the most psychologically devastating speech in the entire Quran. He doesn't apologize. He doesn't explain. He tells them, with complete clarity, that he never had any power over them at all. And then he tells them it's their fault.</p>

  <p>This scene, recorded in Surah Ibrahim (14:22), is not just a narrative moment. It is the Quran's definitive statement on the nature of Shaytan's influence — and, more importantly, on the nature of human responsibility. To understand it fully, you have to sit with the Arabic, trace its grammatical structures, and follow its logic to its conclusion. What emerges is an argument about agency that is far more radical than most people realize.</p>

  <h2>The Full Confession</h2>

  <p>The verse begins with Shaytan addressing his followers after the matter has been decided — after the people of Paradise have entered Paradise and the people of the Fire have entered the Fire. There is no more negotiation, no more delay, no more ambiguity. And in this moment of total finality, Shaytan speaks:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَقَالَ الشَّيْطَانُ لَمَّا قُضِيَ الْأَمْرُ إِنَّ اللَّهَ وَعَدَكُمْ وَعْدَ الْحَقِّ وَوَعَدتُّكُمْ فَأَخْلَفْتُكُمْ ۖ وَمَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ إِلَّا أَن دَعَوْتُكُمْ فَاسْتَجَبْتُمْ لِي ۖ فَلَا تَلُومُونِي وَلُومُوا أَنفُسَكُمْ
    </p>
    <p class="translation">"And Shaytan will say when the matter has been decided: Indeed, Allah had promised you the promise of truth, and I promised you, but I betrayed you. I had no authority over you except that I invited you, and you responded to me. So do not blame me, but blame yourselves."</p>
    <cite>Ibrahim, 14:22</cite>
  </blockquote>

  <p>Every clause here repays careful attention. The opening — لَمَّا قُضِيَ الْأَمْرُ — uses the passive voice: "when the matter was decided." Not "when I decided" or "when you decided." The matter was decided by Allah. Shaytan is speaking from a position of total powerlessness, which is precisely the point. The being who spent millennia projecting authority is now revealed as having none.</p>

  <h2>Two Promises, Two Outcomes</h2>

  <p>Shaytan draws an explicit contrast between two promises. إِنَّ اللَّهَ وَعَدَكُمْ وَعْدَ الْحَقِّ — "Allah promised you the promise of truth." The construction وَعْدَ الْحَقِّ is a genitive of characterization: not just a promise <em>about</em> truth, but a promise <em>characterized by</em> truth. The promise itself was truthful in nature. Then: وَوَعَدتُّكُمْ فَأَخْلَفْتُكُمْ — "and I promised you, and I betrayed you." The verb أَخْلَفَ means to break a promise, to fail to deliver. Shaytan acknowledges, openly and without qualification, that his promises were lies.</p>

  <p>This is a remarkable admission when you consider what Shaytan's promises actually looked like during the test of life. They never sounded like lies. They sounded like common sense. "This won't hurt anyone." "You deserve this." "Everyone does it." "God is forgiving anyway." "You can repent later." "This is just how the world works." Each of these framings felt reasonable in the moment. Each was a promise — an implicit guarantee that following this course of action would be fine, even beneficial. And on the Day of Judgment, the one who crafted all those framings stands up and says: I lied. Every single time.</p>

  <p>The juxtaposition is surgical. Allah's promise was truth that often felt difficult — worship, restraint, patience, sacrifice. Shaytan's promise was falsehood that always felt easy — indulgence, shortcuts, rationalization, delay. And the human being, standing between these two promises, chose the comfortable lie over the uncomfortable truth. Not because the evidence favored the lie, but because the lie required less of them.</p>

  <h2>The Denial of Sultan</h2>

  <p>The theological core of the verse is the phrase مَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ. This is worth parsing with precision. The word سُلْطَان comes from the root س-ل-ط, which carries the meaning of dominion, compelling authority, coercive power. It's the same root from which we get the political title "sultan" — a ruler with binding authority over subjects. Shaytan uses this specific word to say: I had none of it over you.</p>

  <p>The grammatical construction reinforces the totality of the denial. مَا كَانَ لِيَ — "there was not for me." The preposition لِي indicates possession. عَلَيْكُم — "over you." The preposition عَلَى indicates dominance or authority. مِّن سُلْطَانٍ — "any authority whatsoever." The particle مِن before the indefinite noun سُلْطَانٍ serves as an emphatic negation, meaning not even the slightest trace of authority. This is not a partial disclaimer. It is an absolute one.</p>

  <p>If you have read the companion essay on <a href="/articles/psychology-of-shaytan">the psychology of Shaytan</a>, you'll recognize this as the climax of a pattern the Quran builds across multiple surahs. In Surah Al-A'raf (7:16-17), Shaytan announces his plan to approach from four directions. In Surah An-Nas (114:4-5), he is described as the whisperer who retreats. In Surah Al-Baqarah (2:168), humans are warned not to follow his footsteps. Every one of these passages describes influence — suggestion, approach, whisper. None of them describes compulsion. Ibrahim 14:22 is the verse where Shaytan himself confirms what the Quran has been showing all along: his entire operation was persuasion, never force.</p>

  <h2>The Transfer of Blame</h2>

  <p>The exception clause is devastating in its simplicity: إِلَّا أَن دَعَوْتُكُمْ فَاسْتَجَبْتُمْ لِي — "except that I called you and you responded to me." The verb دَعَا means to call, to invite, to summon. It is the same verb used for calling someone to dinner or inviting someone to a gathering. There is no coercion in the word. It is an offer. An invitation. Nothing more.</p>

  <p>And then: فَاسْتَجَبْتُمْ لِي. The verb اسْتَجَابَ is Form X of the root ج-و-ب (to answer). Form X in Arabic typically carries the meaning of seeking or actively pursuing the root action. So اسْتَجَابَ doesn't just mean "you answered" — it carries the connotation of readily answering, actively responding, going out of your way to accept the invitation. The grammatical form itself indicts the respondent. You didn't stumble into compliance. You pursued it.</p>

  <p>Then the conclusion, delivered with cold finality: فَلَا تَلُومُونِي وَلُومُوا أَنفُسَكُمْ — "So do not blame me, but blame yourselves." The verb لَامَ means to blame, to reproach. And Shaytan redirects it entirely. The shift from تَلُومُونِي (blame me) to أَنفُسَكُمْ (yourselves) completes the transfer. The one who spent a lifetime whispering in your ear now denies any responsibility for what you did with those whispers.</p>

  <p>This is not Shaytan being generous with the truth. He gains nothing from this honesty — the matter is already decided. This is the Quran using Shaytan's own mouth to deliver its message about human agency. If even your enemy confirms that you were free, the argument is settled.</p>

  <h2>What This Means for Right Now</h2>

  <p>The power of this verse is not in its eschatological drama but in its present-tense implications. If Shaytan will confess on the Day of Judgment that he had no authority, then he has no authority <em>right now</em>. The confession is future, but the reality it describes is current. Every whisper you hear today — every rationalization, every delayed repentance, every "just this once" — comes from a being who has already been revealed as powerless.</p>

  <p>This reframes the entire struggle. The challenge of resisting Shaytan is not a challenge of overcoming a superior force. It is a challenge of perception — of seeing the invitation for what it is and choosing not to accept it. As explored in <a href="/articles/weapons-against-waswasa">the weapons against waswasa</a>, the Quran provides specific tools for this: isti'adha (seeking refuge), dhikr (remembrance), and taqwa (conscious awareness of Allah). But all of these tools rest on a single foundation: the knowledge that you are free.</p>

  <p>The Quran's treatment of this scene also illuminates something about the nature of accountability. Modern culture often gravitates toward explanations that distribute blame away from the individual — systemic pressures, psychological conditioning, environmental factors. And these are real. The Quran doesn't deny that external forces act upon human beings. But it insists, through Shaytan's own testimony, that none of these forces are ultimately determinative. You were influenced, yes. You were pressured, yes. You were whispered to, yes. But you were never compelled. The final decision — to respond to the invitation or to decline it — was always, irreducibly, yours.</p>

  <p>This is not a comfortable teaching. It would be easier to believe that Shaytan had some binding power, that the deck was stacked, that resistance was futile in certain moments. But the Quran refuses that comfort. It trusts you with the harder truth: you are more powerful than the force that opposes you. You always were. And on the Day when all pretenses are stripped away, even your enemy will confirm it.</p>

  <p>The question this verse leaves you with is not theological. It's personal. If the one who whispered to you will one day admit he was bluffing — what will you do with that information today?</p>
</article>`

// ---------------------------------------------------------------------------
// ARTICLE 2: The Alliance of Iblis and the Nafs
// ---------------------------------------------------------------------------

const article2_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a reason the Quran never treats Shaytan as your only problem. If it did — if the entire spiritual struggle were simply a matter of an external enemy whispering bad ideas — then the solution would be straightforward: block the whisper, win the war. But the Quran is more honest than that. It tells you that you have an internal collaborator. The nafs — your own self, your own ego, your own desires — is not a passive victim of Shaytan's suggestions. It is an active participant. And until you understand how these two forces work together, you will keep fighting the wrong battle.</p>

  <p>The alliance between Iblis and the nafs is one of the Quran's most psychologically sophisticated teachings. It explains why simply "knowing better" is not enough, why intelligent people make self-destructive choices, and why the same person who weeps in prayer at night can rationalize a harmful action the next morning. The answer is not hypocrisy — at least, not always. The answer is that there are two forces at work, and they operate on different frequencies.</p>

  <h2>The Nafs Speaks First</h2>

  <p>Consider one of the most striking self-diagnostic statements in the Quran. It comes from the wife of the Aziz in Surah Yusuf, after the truth of her attempted seduction has been established publicly:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَمَا أُبَرِّئُ نَفْسِي ۚ إِنَّ النَّفْسَ لَأَمَّارَةٌ بِالسُّوءِ إِلَّا مَا رَحِمَ رَبِّي
    </p>
    <p class="translation">"And I do not acquit myself. Indeed, the nafs is persistently commanding evil, except those upon whom my Lord has mercy."</p>
    <cite>Yusuf, 12:53</cite>
  </blockquote>

  <p>The Arabic here is diagnostically precise. The word أَمَّارَة is an intensive form (صيغة المبالغة) of the root أ-م-ر, which means to command. The pattern فَعَّالَة indicates someone who does the action excessively, relentlessly, as a defining characteristic. So the nafs is not described as occasionally suggesting evil. It is described as a persistent commander of it. The preposition بِ in بِالسُّوءِ indicates the content of the command: evil, harm, what is ugly and destructive.</p>

  <p>This is the first critical insight into the Iblis-nafs alliance: the nafs does not need Shaytan to desire wrongly. It has its own gravitational pull toward excess, toward immediate gratification, toward self-serving interpretation. Shaytan is an accelerant, but the fuel is already there. The nafs ammara — the commanding self — generates its own impulses toward what harms, independent of any external whisper.</p>

  <p>This is why people who grow up in protected environments, who have never been exposed to explicit temptation, still struggle with arrogance, jealousy, laziness, and self-deception. These are not imported problems. They are native features of the untrained nafs. Shaytan exploits them, amplifies them, gives them sophisticated justifications — but he did not create them.</p>

  <h2>The Partnership Model</h2>

  <p>If the nafs provides the raw desire and Shaytan provides the rationalization, then the alliance works like this: the nafs says "I want," and Shaytan says "here's why you should." The nafs generates the impulse; Shaytan constructs the argument. The nafs is the appetite; Shaytan is the marketing department.</p>

  <p>The Quran illustrates this division of labor across multiple passages. In Surah Taha (20:120), when Shaytan whispers to Adam in the Garden, he doesn't create a desire from nothing. He targets an existing vulnerability: فَوَسْوَسَ إِلَيْهِ الشَّيْطَانُ قَالَ يَا آدَمُ هَلْ أَدُلُّكَ عَلَىٰ شَجَرَةِ الْخُلْدِ وَمُلْكٍ لَّا يَبْلَىٰ — "Shall I direct you to the tree of eternity and a kingdom that will never decay?" Shaytan identified what Adam's nafs already wanted — permanence, security, continuity — and packaged the forbidden tree as the means to get it.</p>

  <p>This is the template for every temptation that follows. Shaytan does not invent your desires. He studies them. He learns what your nafs craves — status, validation, comfort, control, pleasure — and then he positions the haram as the most efficient path to that craving. The whisper is always custom-tailored to the individual. What works on a person driven by ambition is different from what works on a person driven by insecurity. Shaytan is a strategist; your nafs is the intelligence report he works from.</p>

  <p>The Quran captures this dynamic with chilling clarity in Surah Al-Hashr, where Shaytan's ultimate betrayal of his human collaborator is laid bare:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      كَمَثَلِ الشَّيْطَانِ إِذْ قَالَ لِلْإِنسَانِ اكْفُرْ فَلَمَّا كَفَرَ قَالَ إِنِّي بَرِيءٌ مِّنكَ إِنِّي أَخَافُ اللَّهَ رَبَّ الْعَالَمِينَ
    </p>
    <p class="translation">"Like Shaytan, when he says to the human being: 'Disbelieve.' But when he disbelieves, he says: 'I am free of you. Indeed, I fear Allah, Lord of the worlds.'"</p>
    <cite>Al-Hashr, 59:16</cite>
  </blockquote>

  <p>The verb بَرِيءٌ comes from the root ب-ر-أ, meaning to be free, clear, absolved. Shaytan declares himself absolved of the very person he just led astray. The partnership was never a partnership. It was a manipulation with a built-in exit clause. Shaytan invests nothing; he risks nothing; and the moment the human being has committed, he walks away.</p>

  <p>This connects directly to the Day of Judgment confession in <a href="/articles/shaytans-promise">Surah Ibrahim 14:22</a>, where Shaytan tells his followers: "Do not blame me, blame yourselves." The pattern is consistent across both the dunya and the akhira. Shaytan is the ultimate fair-weather ally. He whispers you toward the cliff, and then, as you fall, he watches from a safe distance and claims he barely knew you.</p>

  <h2>The Three States and Three Strategies</h2>

  <p>The Quran describes the nafs in three states, and understanding these states is critical because Shaytan targets each one differently.</p>

  <p>The first is the nafs al-ammara — the commanding self, described in Yusuf 12:53. This is the nafs in its rawest state: impulsive, appetitive, oriented entirely toward immediate desire. When the nafs is in this state, Shaytan barely has to work. The desires are already in motion; he just needs to remove the last barrier. His strategy here is normalization: "Everyone does this." "It's natural." "Don't suppress who you are." He validates the impulse and frames restraint as the problem.</p>

  <p>The second is the nafs al-lawwama — the self-reproaching self, referenced in Surah Al-Qiyamah (75:2): وَلَا أُقْسِمُ بِالنَّفْسِ اللَّوَّامَةِ — "And I swear by the self-reproaching soul." This is the nafs that feels guilt after sin, that knows it did wrong, that oscillates between obedience and disobedience. Most people live here. And Shaytan's strategy for this nafs is more sophisticated. He works both ends: after the sin, he amplifies the guilt until it becomes despair ("You'll never change, so why try?"), and before the next temptation, he minimizes the previous guilt ("It wasn't that bad, and you survived, didn't you?"). He keeps the person in a perpetual cycle — sin, despair, numbness, sin again — never allowing the guilt to mature into genuine repentance.</p>

  <p>The third is the nafs al-mutma'inna — the tranquil self, addressed in Surah Al-Fajr (89:27-28): يَا أَيَّتُهَا النَّفْسُ الْمُطْمَئِنَّةُ ارْجِعِي إِلَىٰ رَبِّكِ رَاضِيَةً مَّرْضِيَّةً — "O tranquil soul, return to your Lord, well-pleased and pleasing." This is the nafs that has found its center, that is settled in its relationship with Allah, that experiences peace not from the absence of struggle but from the presence of certainty. Shaytan's strategy here is the most subtle of all: he targets the person's spiritual achievements. He introduces self-admiration into worship. He makes the person conscious of their own piety. He whispers: "Look how far you've come. Look how disciplined you are. Others can't do what you do." The weapon is kibr — pride — disguised as gratitude. And it is precisely this strategy that <a href="/articles/psychology-of-shaytan">the Quran describes</a> when Shaytan declares he will sit on the straight path itself.</p>

  <h2>The Counter-Proximity</h2>

  <p>If the Iblis-nafs alliance sounds overwhelming, the Quran offers a counterpoint that reframes the entire dynamic. In Surah Qaf, Allah states:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَلَقَدْ خَلَقْنَا الْإِنسَانَ وَنَعْلَمُ مَا تُوَسْوِسُ بِهِ نَفْسُهُ ۖ وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ
    </p>
    <p class="translation">"And We have already created the human being and We know what his soul whispers to him, and We are closer to him than his jugular vein."</p>
    <cite>Qaf, 50:16</cite>
  </blockquote>

  <p>Notice what this verse does. It acknowledges the nafs's whispers — مَا تُوَسْوِسُ بِهِ نَفْسُهُ — using the same root (و-س-و-س) that describes Shaytan's activity. The Quran is explicitly connecting the nafs's internal whisper to Shaytan's external one. They use the same mechanism. But then comes the pivot: وَنَحْنُ أَقْرَبُ إِلَيْهِ مِنْ حَبْلِ الْوَرِيدِ — "and We are closer to him than his jugular vein."</p>

  <p>The jugular vein (حَبْل الْوَرِيد) is inside you. It is as internal as anything can be. And Allah says He is closer than that. This means that however close Shaytan's whisper feels, however intimate the nafs's desires seem, Allah's proximity is greater. The alliance of Iblis and the nafs operates from a position of apparent intimacy — the whisper feels like it comes from inside you, from your own mind, your own reasoning. But Allah is closer still. His guidance, His mercy, His awareness of your struggle — all of it is nearer to you than the voice you mistake for your own.</p>

  <p>This is not a poetic metaphor. It is a strategic reframing. The Iblis-nafs alliance derives its power from perceived intimacy — from the illusion that the whisper is you, that the desire is your authentic self, that resistance means fighting your own nature. Qaf 50:16 shatters that illusion by establishing a deeper intimacy. You are not alone in the space where the whisper happens. Allah is there. He knows what your nafs says to you. And He is closer to you than it is.</p>

  <h2>Breaking the Alliance</h2>

  <p>The practical question is: how do you drive a wedge between Iblis and the nafs? If they operate as a team — one providing desire, the other providing justification — then the intervention point is the junction between them.</p>

  <p>The Quran's answer is muhasaba — self-accounting. The nafs al-lawwama, the self-reproaching soul, represents the beginning of this process. It is the nafs that has started to observe itself, to question its own impulses, to feel the friction between what it wants and what it knows to be right. This capacity for self-observation is the crack in the alliance. When you can identify the desire as coming from your nafs rather than from your rational judgment, you create separation. And when you can identify the justification as coming from Shaytan's playbook rather than from genuine wisdom, you disarm it.</p>

  <p>This is why the Quran repeatedly commands تَذَكُّر — remembering, being mindful. Not mindfulness as a relaxation technique, but as a diagnostic practice. In Surah Al-A'raf (7:201), the Quran describes those who have taqwa: إِذَا مَسَّهُمْ طَائِفٌ مِّنَ الشَّيْطَانِ تَذَكَّرُوا فَإِذَا هُم مُّبْصِرُونَ — "When a visitation from Shaytan touches them, they remember, and then they see clearly." The sequence is precise: the whisper arrives (مَسَّهُمْ طَائِفٌ), they engage in active remembrance (تَذَكَّرُوا), and then — as a result — they gain clear sight (مُّبْصِرُونَ). The remembrance is the mechanism that converts the whisper from a hidden influence into a visible one. Once you see it, it loses its power.</p>

  <p>The deeper strategy, explored more fully in <a href="/articles/weapons-against-waswasa">the weapons against waswasa</a>, involves dhikr, du'a, and community — the practices that recalibrate the nafs and make it resistant to Shaytan's framing. But the foundational move is always the same: recognize that the desire and the justification come from two different sources, and neither of them is the real you. The real you is the one watching. The one who can choose. The one who is closer to Allah than to either of them — because Allah, as He told you Himself, is closer to you than your jugular vein.</p>
</article>`

// ---------------------------------------------------------------------------
// ARTICLE 3: The Weapons Against Waswasa
// ---------------------------------------------------------------------------

const article3_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The Quran is not a book that diagnoses a problem and leaves you with it. For every disease it identifies, it prescribes a treatment. For every enemy it warns you about, it provides a defense. And in the case of Shaytan — the whisperer, the retreater, the being whose entire method is waswasa — the Quran's prescriptions are specific, layered, and remarkably practical. They don't require you to be a spiritual prodigy. They require you to be awake.</p>

  <p>If the <a href="/articles/psychology-of-shaytan">psychology of Shaytan</a> teaches you to recognize the enemy, and <a href="/articles/iblis-and-the-nafs">the alliance of Iblis and the nafs</a> teaches you to recognize his internal collaborator, then this essay is about the arsenal. What does the Quran actually tell you to <em>do</em> when the whisper comes? And why does it work?</p>

  <h2>The Last Surah: A Prescription Disguised as a Prayer</h2>

  <p>It is not an accident that the Quran ends the way it does. The final surah — An-Nas, the 114th chapter, the last words of the last revelation — is entirely about seeking refuge from waswasa. Of everything the Quran could have ended with, it chose this. That structural choice is itself a statement about priority.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قُلْ أَعُوذُ بِرَبِّ النَّاسِ مَلِكِ النَّاسِ إِلَٰهِ النَّاسِ مِن شَرِّ الْوَسْوَاسِ الْخَنَّاسِ الَّذِي يُوَسْوِسُ فِي صُدُورِ النَّاسِ مِنَ الْجِنَّةِ وَالنَّاسِ
    </p>
    <p class="translation">"Say: I seek refuge in the Lord of mankind, the Sovereign of mankind, the God of mankind, from the evil of the retreating whisperer — who whispers in the breasts of mankind — from among jinn and mankind."</p>
    <cite>An-Nas, 114:1-6</cite>
  </blockquote>

  <p>The linguistic architecture of this surah deserves close attention. Allah is invoked with three attributes — رَبِّ (Lord, Sustainer), مَلِكِ (King, Sovereign), إِلَٰهِ (God, the one deserving worship) — all attached to النَّاسِ (mankind). Three attributes, one subject. The repetition of النَّاسِ is not redundant; each attribute addresses a different dimension of the human relationship with Allah. As Rabb, He nurtures and sustains you. As Malik, He has authority and governance over your affairs. As Ilah, He is the one you turn to in worship and devotion. The surah is telling you to seek refuge with the full spectrum of divine care before it even names the threat.</p>

  <p>Then the threat: الْوَسْوَاسِ الْخَنَّاسِ. The word وَسْوَاس is an intensive form — not a single whisper, but a persistent, repeating one. And الْخَنَّاس, from the root خ-ن-س, means the one who retreats, who shrinks back, who withdraws. Classical commentators explain this pairing: Shaytan whispers, and when the person remembers Allah, he retreats. Then when the person becomes heedless again, he returns. He is not a constant presence but a persistent one — always probing, always returning to check if the door has been left open.</p>

  <p>The word صُدُور (breasts, chests) is significant. The Quran locates the whisper not in the mind (عقل) but in the chest — the seat of the heart (قلب) in Quranic anthropology. This tells you that waswasa targets the emotional and spiritual center, not just the rational mind. You can know intellectually that something is wrong and still feel pulled toward it, because the whisper operates below the level of logical analysis. It targets feeling, inclination, mood — the territory of the heart.</p>

  <h2>The Isti'adha Command: Seeking Refuge in Real Time</h2>

  <p>Surah An-Nas gives you the general framework, but the Quran also provides specific, real-time tactical guidance for the moment of temptation. In Surah Al-A'raf:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَإِمَّا يَنزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ ۚ إِنَّهُ سَمِيعٌ عَلِيمٌ ۝ إِنَّ الَّذِينَ اتَّقَوْا إِذَا مَسَّهُمْ طَائِفٌ مِّنَ الشَّيْطَانِ تَذَكَّرُوا فَإِذَا هُم مُّبْصِرُونَ
    </p>
    <p class="translation">"And if a provocation from Shaytan provokes you, seek refuge in Allah. Indeed, He is Hearing and Knowing. Indeed, those who have taqwa — when a visitation from Shaytan touches them, they remember, and then they see clearly."</p>
    <cite>Al-A'raf, 7:200-201</cite>
  </blockquote>

  <p>The word نَزْغ means a provocation, a prick, a sharp incitement. It's a different word from waswasa — while waswasa is a faint, persistent rustling, nazgh is a sudden, sharp jab. The Quran uses different words because Shaytan uses different methods. Sometimes he whispers gradually; sometimes he provokes suddenly. And for the sudden provocation, the instruction is immediate: فَاسْتَعِذْ بِاللَّهِ — "seek refuge in Allah." The command is in the imperative. It is not a suggestion. It is a protocol.</p>

  <p>But it's the next verse that reveals the deeper mechanism. Those who have taqwa — إِنَّ الَّذِينَ اتَّقَوْا — respond to Shaytan's touch with تَذَكُّر (active remembrance). And the result: فَإِذَا هُم مُّبْصِرُونَ — "and then they see clearly." The particle إِذَا here indicates sudden, immediate result. The clarity is not gradual. It's instant. The moment remembrance is engaged, sight is restored.</p>

  <p>This is the Quran's model for how the antidote works. Waswasa creates a fog — a distortion of perception where wrong looks right, harmful looks beneficial, and urgent looks necessary. Dhikr (remembrance) dispels the fog. Not by arguing with the whisper — you cannot out-argue a being who has been constructing arguments since before humanity existed — but by changing the field of vision entirely. When you remember Allah, you don't see a better argument against the temptation. You see the temptation for what it actually is. The veil drops. مُّبْصِرُونَ — they become people who see.</p>

  <p>Surah Fussilat reinforces the same instruction in a parallel verse:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَإِمَّا يَنزَغَنَّكَ مِنَ الشَّيْطَانِ نَزْغٌ فَاسْتَعِذْ بِاللَّهِ ۖ إِنَّهُ هُوَ السَّمِيعُ الْعَلِيمُ
    </p>
    <p class="translation">"And if a provocation from Shaytan provokes you, seek refuge in Allah. Indeed, He is the Hearing, the Knowing."</p>
    <cite>Fussilat, 41:36</cite>
  </blockquote>

  <p>The repetition across two surahs — Al-A'raf and Fussilat — with nearly identical wording is not redundancy. It is emphasis through structural repetition, a Quranic pattern that signals core principles. And notice the divine attributes chosen to close each verse: سَمِيعٌ عَلِيمٌ — Hearing and Knowing. Not Powerful, not Wrathful, not Vengeful. Hearing — He hears your isti'adha, your cry for refuge. Knowing — He knows what you're going through, He knows the whisper, He knows the struggle. The attributes are chosen to reassure, not to intimidate. When you call out, you are heard. When you struggle, you are known.</p>

  <h2>Dhikr: The Primary Weapon</h2>

  <p>If isti'adha is the emergency protocol, dhikr is the daily fortification. The Quran establishes a direct inverse relationship between remembrance of Allah and vulnerability to Shaytan. In Surah Az-Zukhruf:</p>

  <p>وَمَن يَعْشُ عَن ذِكْرِ الرَّحْمَٰنِ نُقَيِّضْ لَهُ شَيْطَانًا فَهُوَ لَهُ قَرِينٌ — "And whoever turns away from the remembrance of the Most Merciful, We appoint for him a shaytan, and he becomes his companion" (Az-Zukhruf, 43:36). The verb يَعْشُ means to turn away, to become blind to, to live in disregard of. And the consequence is not that Shaytan attacks — it's that Shaytan becomes a قَرِين, a constant companion. The absence of dhikr doesn't just leave you unprotected; it creates a vacancy that is actively filled.</p>

  <p>This is the inverse of Qaf 50:16, where Allah declares He is closer than the jugular vein. When you maintain dhikr, that proximity is experienced. When you abandon it, the vacancy is occupied by the qareen — the companion whisperer who fills the silence where remembrance should be.</p>

  <p>Dhikr, in the Quranic framework, is not a ritual formality. It is cognitive reorientation. Every time you say "subhanAllah," you are asserting that Allah is free from imperfection — which means the whisper telling you that reality is unjust, that Allah has forgotten you, that the world is meaningless, is false. Every time you say "alhamdulillah," you are asserting gratitude — which directly counters Shaytan's declared goal of destroying شُكْر (gratitude), as he announced in Al-A'raf 7:17. Every time you say "Allahu akbar," you are asserting that Allah is greater — greater than the desire pulling you, greater than the fear pushing you, greater than the whisper deceiving you. These are not empty phrases. They are precision countermeasures.</p>

  <h2>The Role of Knowledge: Seeing the Playbook</h2>

  <p>The Quran's method of defense against Shaytan includes something unusual: it shows you how Shaytan operates. It quotes his speeches, reveals his strategies, maps his approaches. This transparency is itself a weapon.</p>

  <p>When you know that Shaytan sits on the straight path (Al-A'raf 7:16), you are prepared when your good deeds start feeling performative or your worship becomes tinged with self-admiration. When you know he approaches from four directions (7:17), you can identify which direction the current whisper is coming from — is it targeting my hopes, my past, my sense of righteousness, or my desires? When you know he works in footsteps (Al-Baqarah 2:168), you can evaluate not just the immediate action but the trajectory it implies.</p>

  <p>Knowledge transforms the whisper from a hidden influence into a recognizable pattern. And a pattern you recognize is a pattern you can interrupt. This is why studying the Quran's treatment of Shaytan is not an academic exercise — it is a defensive practice. Every passage you internalize is a template you can match against your own experience. The whisper has to disguise itself as your own thought to be effective. When you can identify its structure, the disguise fails.</p>

  <h2>Community: Breaking the Isolation</h2>

  <p>There is one more weapon the Quran prescribes that is often overlooked in discussions of spiritual warfare: community. Shaytan's most effective hunting ground is isolation. Not just physical isolation — though that matters — but psychological isolation. The feeling that no one understands, that your struggle is unique, that you're the only one fighting this particular battle.</p>

  <p>The Quran repeatedly commands collective action and collective worship. وَاعْتَصِمُوا بِحَبْلِ اللَّهِ جَمِيعًا وَلَا تَفَرَّقُوا — "Hold firmly to the rope of Allah, all together, and do not become divided" (Aal-Imran, 3:103). The verb اعْتَصِمُوا means to grasp firmly, to hold on — and it's in the plural. This is not individual rope-grasping. It's collective. The protection is in the togetherness.</p>

  <p>Isolation amplifies waswasa because there is no external check on the internal narrative. When Shaytan whispers "you're the only one who struggles with this" or "if people knew who you really were, they'd reject you," the person sitting alone has no counter-evidence. But in community — in honest, accountable community — the whisper is exposed to reality. Other people do struggle. Other people have failed and recovered. Other people have heard the same whisper and can tell you what it sounds like from the outside.</p>

  <p>The Prophet Muhammad (peace be upon him) described the lone sheep as the one the wolf catches. The metaphor is instructive because it describes not a wolf that is stronger than the flock, but a wolf that is strategic enough to isolate a single member from it. Shaytan operates the same way. He doesn't need to overpower the community. He needs to separate you from it.</p>

  <p>This is why one of the most effective practical responses to a period of intense waswasa is simply to be around other people who remember Allah. Not necessarily to confess every struggle — but to be in an environment where dhikr is happening, where the Quran is being recited, where the atmosphere itself counters the isolation that makes the whisper loud.</p>

  <h2>The Architecture of Defense</h2>

  <p>Put together, the Quran's anti-waswasa framework has a clear architecture. It operates on multiple levels simultaneously:</p>

  <p><strong>Immediate response:</strong> Isti'adha — the moment the whisper arrives, seek refuge. Don't engage with the content of the whisper. Don't argue with it. Don't analyze it in the moment. Just seek refuge. أَعُوذُ بِاللَّهِ مِنَ الشَّيْطَانِ الرَّجِيمِ. This is the emergency brake.</p>

  <p><strong>Daily fortification:</strong> Dhikr — consistent, regular remembrance that fills the space where Shaytan would otherwise install himself as a qareen. Morning and evening adhkar, Quran recitation, the phrases that recalibrate your perception throughout the day. This is the immune system.</p>

  <p><strong>Strategic awareness:</strong> Knowledge — studying the Quran's detailed exposure of Shaytan's methods so you can recognize the pattern when it appears in your life. This is the diagnostic training.</p>

  <p><strong>Structural support:</strong> Community — maintaining connections with people who remind you of Allah, who normalize the struggle, who break the isolation that amplifies the whisper. This is the fortified perimeter.</p>

  <p>None of these defenses requires extraordinary spiritual talent. They don't require you to be immune to temptation or to have transcended desire. They require you to be honest about the battle, knowledgeable about the enemy, and consistent in the practices that shift the balance. The Quran's promise is not that the whisper will stop. It's that you will be able to see through it. مُّبْصِرُونَ — people who see.</p>

  <p>And seeing, as it turns out, is enough. Because Shaytan — as <a href="/articles/shaytans-promise">he himself will admit on the Day of Judgment</a> — never had any power beyond the ability to suggest. His entire operation depends on you not seeing clearly. The moment you do, the operation collapses. The whisperer retreats. الْخَنَّاس — he shrinks back. Not because you overpowered him, but because you saw him. And a transparent illusion is no illusion at all.</p>
</article>`

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const now = new Date().toISOString()

  // Article 1
  await insertArticle(
    {
      title: "Shaytan's Promise: The Day of Judgment Confession",
      slug: 'shaytans-promise',
      type: 'article',
      excerpt:
        "On the Day of Judgment, Shaytan will stand before his followers and admit the truth: he never had any power over them. Surah Ibrahim 14:22 and the Quran's definitive statement on human agency.",
      content_html: article1_html,
      status: 'published',
      tags: ['shaytan', 'day-of-judgment', 'agency', 'personal-responsibility'],
      reading_time_minutes: 10,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'iblis', is_primary: true },
      { slug: 'nafs', is_primary: true },
      { slug: 'taqwa', is_primary: false },
    ]
  )

  // Article 2
  await insertArticle(
    {
      title: 'The Alliance of Iblis and the Nafs',
      slug: 'iblis-and-the-nafs',
      type: 'article',
      excerpt:
        "Shaytan doesn't work alone. The nafs — your own commanding self — is his internal collaborator. How the Quran maps the partnership between external whisper and internal desire.",
      content_html: article2_html,
      status: 'published',
      tags: ['shaytan', 'nafs', 'psychology', 'self-knowledge'],
      reading_time_minutes: 12,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'nafs', is_primary: true },
      { slug: 'iblis', is_primary: true },
      { slug: 'taqwa', is_primary: false },
      { slug: 'tawbah', is_primary: false },
    ]
  )

  // Article 3
  await insertArticle(
    {
      title: 'The Weapons Against Waswasa',
      slug: 'weapons-against-waswasa',
      type: 'article',
      excerpt:
        "The Quran doesn't just diagnose Shaytan — it prescribes the cure. From Surah An-Nas to the isti'adha command, a systematic look at every defense the Quran provides against the whisperer.",
      content_html: article3_html,
      status: 'published',
      tags: ['shaytan', 'waswasa', 'dhikr', 'taqwa', 'protection'],
      reading_time_minutes: 11,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'nafs', is_primary: true },
      { slug: 'dhikr', is_primary: true },
      { slug: 'taqwa', is_primary: true },
      { slug: 'sabr', is_primary: false },
      { slug: 'tawbah', is_primary: false },
    ]
  )

  // Refresh co-occurrence materialized view
  console.log('\nRefreshing entity co-occurrence...')
  const { error: rpcError } = await supabase.rpc('refresh_entity_co_occurrence')
  if (rpcError) {
    console.error('Failed to refresh co-occurrence:', rpcError)
  } else {
    console.log('Entity co-occurrence refreshed successfully.')
  }

  console.log('\nDone.')
}

main().catch(console.error)
