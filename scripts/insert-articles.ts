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
// ARTICLE 1: The Psychology of Shaytan
// ---------------------------------------------------------------------------

const article1_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">You have an enemy. The Quran is explicit about this — not as a metaphor, not as a vague spiritual concept, but as a stated reality woven into the architecture of the human experience. But here is what makes the Quran's treatment of Shaytan remarkable: it doesn't just warn you that he exists. It dissects him. It shows you his arguments, his methods, his rhetorical strategies, his psychological profile. It gives you, in extraordinary detail, his playbook — and then it teaches you how to read it.</p>

  <p>This is not a surface-level "beware of Shaytan" reminder. The Quran treats its reader as intelligent enough to understand the mechanics of deception. And once you see those mechanics clearly, something shifts. The whispers don't stop, but they lose their disguise.</p>

  <h2>The Refusal: A Philosophical Rebellion</h2>

  <p>To understand Shaytan's psychology, you have to start at the beginning — the moment the mask came off. In Surah Al-Hijr, Allah describes creating the human being and commanding the angels to prostrate. Iblis was among them, and he refused. But pay close attention to <em>how</em> he refused.</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ لَمْ أَكُن لِّأَسْجُدَ لِبَشَرٍ خَلَقْتَهُ مِن صَلْصَالٍ مِّنْ حَمَإٍ مَّسْنُونٍ
    </p>
    <p class="translation">"He said: I would never prostrate to a human being whom You created from dried clay, from altered dark mud."</p>
    <cite>Al-Hijr, 15:33</cite>
  </blockquote>

  <p>This wasn't ignorance. Iblis didn't misunderstand the command. He didn't claim he hadn't heard it. He articulated a <em>reason</em> — a philosophical objection rooted in a value judgment about material origin. He looked at Adam and saw mud. He looked at himself and saw fire. And from that comparison, he derived a conclusion: I am better, therefore I should not bow.</p>

  <p>This is the first and most foundational insight the Quran gives us about Shaytan's psychology: <strong>his rebellion is intellectual, not emotional</strong>. He doesn't rage blindly. He constructs arguments. He builds logical structures — premises, conclusions, justifications. And this matters enormously, because it tells you something about how he operates on <em>you</em>. He doesn't come at you with chaos. He comes at you with reasons.</p>

  <p>The Arabic here is precise. The construction لَمْ أَكُن لِّأَسْجُدَ uses the lam of denial of expected purpose — "I was never going to prostrate." It's not hesitation. It's categorical refusal framed as self-evident principle. Iblis treats his disobedience as the only rational position. And this is exactly how he'll frame temptation to you: not as sin, but as the reasonable choice.</p>

  <p>Notice, too, what he fixates on: خَلَقْتَهُ مِن صَلْصَالٍ — "whom <em>You</em> created from clay." He addresses Allah directly. He doesn't deny Allah's creative power. He uses it as evidence for his argument. This is someone who knows the truth and weaponizes it. He takes a fact — Adam was created from clay — and bends it into a justification for arrogance. The data is correct; the conclusion is corrupt.</p>

  <p>This pattern — correct observation, corrupt conclusion — is the template for every whisper that will follow.</p>

  <h2>The Methodology: Whisper, Reframe, Surround</h2>

  <p>After being expelled, Iblis makes a declaration of war. And in Surah Al-A'raf, the Quran records his battle plan with chilling specificity:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قَالَ فَبِمَا أَغْوَيْتَنِي لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ ثُمَّ لَآتِيَنَّهُم مِّن بَيْنِ أَيْدِيهِمْ وَمِنْ خَلْفِهِمْ وَعَنْ أَيْمَانِهِمْ وَعَن شَمَائِلِهِمْ وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ
    </p>
    <p class="translation">"He said: Because You have put me in error, I will surely sit in wait for them on Your straight path. Then I will come to them from before them and from behind them, and on their right and on their left, and You will not find most of them grateful."</p>
    <cite>Al-A'raf, 7:16-17</cite>
  </blockquote>

  <p>There are several layers to unpack here, and each one reveals something critical about how Shaytan operates.</p>

  <p><strong>First: "I will sit in wait for them on Your straight path."</strong> Not off the path — <em>on</em> it. The Arabic لَأَقْعُدَنَّ لَهُمْ صِرَاطَكَ الْمُسْتَقِيمَ places him directly on the path itself. He doesn't wait for you in obvious places of sin. He positions himself exactly where you're trying to be good. This is why the most dangerous whispers aren't the ones pulling you toward clear haram — they're the ones that distort your worship, corrupt your intentions, or make you feel spiritually superior while you're praying.</p>

  <p><strong>Second: the four directions.</strong> مِّن بَيْنِ أَيْدِيهِمْ (from in front of them) — through their hopes and ambitions for the future. وَمِنْ خَلْفِهِمْ (from behind them) — through their past, their regrets, their traumas. وَعَنْ أَيْمَانِهِمْ (from their right) — through their good deeds, making them arrogant or performative. وَعَن شَمَائِلِهِمْ (from their left) — through their sins and desires.</p>

  <p>Classical scholars noted something conspicuously absent: he doesn't say "from above them" or "from below them." Ibn Abbas and others commented that from above is where Allah's mercy descends, and from below is where sajdah (prostration) takes you. These two directions remain open. The path to Allah through humility and through seeking mercy — Shaytan cannot block these.</p>

  <p><strong>Third: the final line.</strong> وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ — "You will not find most of them grateful." His ultimate goal isn't to make you commit a specific sin. It's to sever your gratitude. Ingratitude — the inability to see and acknowledge what Allah has given — is the root state from which all other spiritual diseases grow. If Shaytan can make you ungrateful, everything else follows naturally.</p>

  <p>And notice the method implied throughout: he <em>comes to</em> them. لَآتِيَنَّهُم — the verb form implies active pursuit, deliberate approach. But he never says he'll <em>force</em> them. The Quran is consistent on this: Shaytan has no compulsive power over human beings. He cannot make you do anything. His entire arsenal is suggestion, framing, and emotional manipulation. The Arabic term the Quran uses most frequently for his action is وَسْوَسَة — waswasa — a word that literally means a faint, repeated rustling. Like a sound you're not sure you heard. Like a thought you're not sure is yours.</p>

  <p>This is critical. Waswasa works precisely because you can't always distinguish it from your own thinking. If Shaytan announced himself — "This is Shaytan speaking, please commit this sin" — nobody would listen. His power lies in making his suggestions feel like your own conclusions.</p>

  <h2>The Gradual Approach: Following the Footsteps</h2>

  <p>The Quran has a recurring phrase that appears in multiple surahs, each time as a direct warning:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَلَا تَتَّبِعُوا خُطُوَاتِ الشَّيْطَانِ
    </p>
    <p class="translation">"And do not follow the footsteps of Shaytan."</p>
    <cite>Al-Baqarah, 2:168</cite>
  </blockquote>

  <p>The word خُطُوَاتِ (khutuwaat) is the plural of خُطْوَة — a step. Not a leap. Not a sprint. A step. And the Quran says "footsteps" — plural, sequential, directional. This single word encodes an entire theory of how temptation works.</p>

  <p>Shaytan doesn't ask you to cross the finish line of a major sin in one move. He asks you to take one step. Then another. Then another. Each step is small enough that it doesn't trigger your moral alarm system. Each step, on its own, seems insignificant. But the cumulative direction is clear — if you could see the whole path from above.</p>

  <p>The Quran repeats this exact phrase — خُطُوَاتِ الشَّيْطَانِ — in 2:168, 2:208, 6:142, and 24:21. Each time in a different context: food and consumption, entering Islam wholeheartedly, religious innovation, and sexual morality. The variety of contexts tells you this isn't a domain-specific warning. It's a universal principle. In <em>every</em> area of life, Shaytan works incrementally.</p>

  <p>This is why the Quran doesn't just forbid the sin — it forbids the approach to the sin. وَلَا تَقْرَبُوا — "do not even approach" — appears regarding zina, orphan wealth, and other prohibitions. Allah isn't drawing the line at the cliff's edge. He's drawing it well before, because He knows — and He's telling you — that Shaytan's strategy relies on getting you close enough that the final step feels inevitable.</p>

  <p>Think about how this applies practically. Nobody wakes up one morning and decides to destroy their life. The person who ends up in a catastrophic situation got there through a series of small concessions, each of which seemed manageable at the time. "It's just a glance." "It's just a conversation." "It's just one time." Each footstep felt like nothing. But the path had a destination all along.</p>

  <p>The genius of the Quran's framing is that it teaches you to evaluate not just the action, but the trajectory. Where is this step taking me? Not where is this step — where is the <em>path</em>?</p>

  <h2>The Day of Judgment Confession</h2>

  <p>Perhaps the most devastating passage about Shaytan in the entire Quran comes in Surah Ibrahim. It's the Day of Judgment, and Shaytan addresses those who followed him:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَمَا كَانَ لِيَ عَلَيْكُم مِّن سُلْطَانٍ إِلَّا أَن دَعَوْتُكُمْ فَاسْتَجَبْتُمْ لِي
    </p>
    <p class="translation">"I had no authority over you — except that I called you, and you answered me."</p>
    <cite>Ibrahim, 14:22</cite>
  </blockquote>

  <p>Read that again. Let it settle. This is Shaytan himself, on the Day when all masks are removed, admitting the truth: <strong>he never had power over you</strong>.</p>

  <p>The word سُلْطَانٍ means authority, compelling power, dominion. Shaytan explicitly denies having any of it. His entire operation — the whispers, the beautification, the gradual approach, the four-directional assault — all of it amounted to nothing more than an invitation. دَعَوْتُكُمْ — "I called you." That's it. A call. And the devastating follow-up: فَاسْتَجَبْتُمْ — "and you responded." The verb form اسْتَجَبَ (istajaba, Form X) implies seeking to respond — not just passive reception, but active acceptance. They didn't just hear; they answered.</p>

  <p>The Quran places this confession here deliberately. After spending dozens of passages warning you about Shaytan's tactics, after detailing his methodology, after showing you his arguments — it reveals the final truth. He was always bluffing. His entire strategy depends on you not realizing that you can simply say no.</p>

  <p>And then Shaytan says something even more cutting: فَلَا تَلُومُونِي وَلُومُوا أَنفُسَكُمْ — "So do not blame me, blame yourselves." He throws his own followers under the bus. The one who spent a lifetime pretending to be your ally, your advisor, the voice of reason in your head — he disowns you completely. He was never on your side. He never pretended to be, not really. You just chose not to look closely enough.</p>

  <p>This passage is not primarily about Shaytan's cruelty. It's about human agency. The Quran uses Shaytan's own testimony to establish, beyond any possible doubt, that every human being who sinned had the power not to. The playing field was never as tilted as it felt. The whisper was strong, but the choice was always yours.</p>

  <h2>The Pattern Recognition</h2>

  <p>So what does all of this amount to? What is the Quran actually training you to do?</p>

  <p>It's training you in pattern recognition. Every detail the Quran gives about Shaytan — his arguments, his methods, his targets, his limitations — is a diagnostic tool. When you know the playbook, you can recognize the plays in real time.</p>

  <p>When a thought enters your mind that uses correct facts to reach a corrupt conclusion — you recognize the pattern. That's the Iblis template: "I am made of fire, he is made of clay, therefore I am better." Sound reasoning built on a poisoned premise.</p>

  <p>When you notice yourself being pulled not toward an obvious sin but toward a subtle distortion of something good — you recognize the pattern. That's the "sitting on the straight path" strategy. Corrupting worship is more valuable to Shaytan than preventing it entirely.</p>

  <p>When you find yourself rationalizing a small compromise, telling yourself it doesn't really matter — you recognize the pattern. That's the footsteps. The question isn't whether this step is harmful on its own. The question is what the next step will be.</p>

  <p>When you feel a vague dissatisfaction with your life despite clear blessings — you recognize the pattern. That's the endgame: the erosion of gratitude. وَلَا تَجِدُ أَكْثَرَهُمْ شَاكِرِينَ.</p>

  <p>The Quran doesn't teach you about Shaytan so that you'll live in fear. It teaches you about Shaytan so that you'll live in clarity. Fear paralyzes; clarity empowers. When you can see the mechanism, the mechanism loses its grip. You stop being reactive — flinching at every temptation, white-knuckling through every test — and you start being diagnostic. You see the whisper, you identify its structure, you trace it back to its source, and you let it pass. Not because you're strong, but because you can see clearly.</p>

  <p>And this is ultimately the Quran's deepest statement about the Shaytan dynamic: it's not a battle of power. It's a battle of perception. Shaytan's only weapon is distortion — making the false look true, the harmful look beneficial, the temporary look permanent. Your only weapon is clarity — seeing things as they actually are. And the Quran, over and over, is offering you that clarity.</p>

  <p>The Arabic word for this in the Quran is بَصِيرَة — baseerah — inner sight, spiritual insight. It appears in Surah Yusuf (12:108): قُلْ هَـٰذِهِ سَبِيلِي أَدْعُو إِلَى اللَّهِ عَلَىٰ بَصِيرَةٍ — "Say: this is my path — I call to Allah upon baseerah." Not upon emotion, not upon tradition, not upon blind following — upon <em>insight</em>. Upon seeing clearly.</p>

  <p>That is what the Quran's dissection of Shaytan is ultimately offering you. Not a shield. Not a weapon. A lens. And once you have it, the whispers don't disappear — but they become transparent. You can see right through them to the mechanism underneath. And a mechanism you can see is a mechanism that has already lost.</p>
</article>`

// ---------------------------------------------------------------------------
// ARTICLE 2: The Fire That Became Cool and Peaceful
// ---------------------------------------------------------------------------

const article2_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a moment in the story of Ibrahim that most people know — and almost no one stops long enough to fully absorb. A young man is thrown into a fire so enormous that the people had to use a catapult because they couldn't get close enough to throw him in by hand. And Allah doesn't extinguish the fire. He doesn't teleport Ibrahim out. He speaks to the fire itself. And what He says — and how He says it — contains a theology of divine protection that reshapes how you understand every hardship you will ever face.</p>

  <h2>The Confrontation That Led Here</h2>

  <p>The fire wasn't random. It was the culmination of a confrontation Ibrahim had been building toward his entire young life. Surah Al-Anbiya (21:51-70) gives us the narrative arc: Ibrahim had already reached his conclusion about tawhid. He had already debated his father. He had already looked at the stars, the moon, and the sun and rejected each one as his lord. His theology wasn't theoretical — it was tested, refined, and unshakable.</p>

  <p>Then came the direct confrontation. While his people were away at their festival, Ibrahim went to the temple and broke every idol except the largest one. When the people returned and found their gods shattered on the ground, they were enraged. They asked him: "Did you do this to our gods, Ibrahim?" And he gave them an answer that was both devastating and strategic: "Rather, this largest one did it — so ask them, if they can speak."</p>

  <p>The Quran says they turned to themselves — فَرَجَعُوا إِلَىٰ أَنفُسِهِمْ — they reflected internally. For a brief moment, something clicked. They knew their idols couldn't speak, couldn't act, couldn't even defend themselves from a young man with a tool. The argument had landed. But then — as the Quran describes it — نُكِسُوا عَلَىٰ رُءُوسِهِمْ — "they were turned upside down on their heads." They reverted. They chose pride over truth. "You already know these do not speak," they said to Ibrahim. And in that moment, the confrontation passed the point of argument and entered the domain of power.</p>

  <p>Their response was the fire. When you cannot defeat the argument, you destroy the person making it. When the truth becomes undeniable, those who reject it don't become rational — they become violent. This is a pattern the Quran documents repeatedly: Firaun with Musa, Quraysh with the Prophet Muhammad ﷺ, and here, the people of Ibrahim with their young challenger.</p>

  <p>They built a fire — massive, consuming — and they threw Ibrahim in.</p>

  <h2>"Be Cool and Peaceful"</h2>

  <p>And then comes the ayah:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      قُلْنَا يَا نَارُ كُونِي بَرْدًا وَسَلَامًا عَلَىٰ إِبْرَاهِيمَ
    </p>
    <p class="translation">"We said: O fire, be coolness and peace upon Ibrahim."</p>
    <cite>Al-Anbiya, 21:69</cite>
  </blockquote>

  <p>Every word here demands attention.</p>

  <p><strong>قُلْنَا — "We said."</strong> The royal plural, Allah Himself speaking. Not sending an angel, not deploying a natural mechanism. A direct divine command. The same verb form used for the creation of the universe: كُن فَيَكُونُ — "Be, and it is." When Allah says قُلْنَا in the Quran, reality itself is being rewritten.</p>

  <p><strong>يَا نَارُ — "O fire."</strong> Allah addresses fire directly — vocative case, as though fire is a conscious entity capable of receiving and obeying a command. And according to the Quran's worldview, it is. All of creation — every element, every atom, every force of nature — is in a state of submission to Allah. Fire burns because Allah commands it to burn. Water flows because Allah commands it to flow. The "laws of nature" are, in the Quran's framework, the ongoing commands of Allah that creation obeys in every moment. So when Allah tells fire to stop burning, fire obeys — because fire was never autonomous to begin with.</p>

  <p><strong>كُونِي بَرْدًا وَسَلَامًا — "Be coolness and peace."</strong> This is where the linguistic precision becomes extraordinary. Allah doesn't say "be extinguished" (انطفئي). He doesn't say "disappear." He says بَرْدًا — be cool, be cold. But بَرْد alone — pure coldness — could itself be harmful. A fire that suddenly becomes freezing would simply swap one danger for another. So Allah adds وَسَلَامًا — and peace, and safety. The fire is to be cool, but also safe. Not just the absence of harm, but the presence of comfort.</p>

  <p>Scholars have noted this for centuries: Allah is precise even within miracles. He doesn't issue blanket commands. He calibrates. The fire is not destroyed — it is <em>transformed</em>. It still exists, it still blazes to the onlookers, but for Ibrahim inside it, it is coolness and peace. The miracle is not the absence of fire but the presence of safety within it.</p>

  <p><strong>عَلَىٰ إِبْرَاهِيمَ — "upon Ibrahim."</strong> The command is specific. The fire remained fire for everyone and everything else. Only upon Ibrahim was it cool and peaceful. This wasn't a change in the nature of fire universally — it was a targeted, personal divine intervention. Allah didn't rewrite physics. He granted one person an exception, and that exception was precisely calibrated to his need.</p>

  <h2>What Allah Changed — and What He Didn't</h2>

  <p>Here is what stops you when you sit with this ayah long enough: Allah did not remove Ibrahim from the fire. And He did not remove the fire from Ibrahim. He changed what the fire <em>was</em> — but only for Ibrahim, and only in that moment.</p>

  <p>This is a pattern in how Allah protects. We often imagine divine help as the removal of the problem: the sickness is cured, the enemy is defeated, the obstacle disappears. And sometimes that happens. But the Quran also shows a different model — one where the hardship remains, but your experience of it is transformed.</p>

  <p>Ibrahim is in the fire. The fire is still there. The flames are still visible. His enemies are still watching, expecting him to burn. But inside that inferno, he is at peace. The external circumstances haven't changed. The internal reality has been completely rewritten.</p>

  <p>This is not just a historical miracle. It's a theological template. How many times in your own life has Allah not removed the difficulty but changed your capacity to endure it? The illness that didn't go away, but you found a patience you didn't know you had. The loss that wasn't reversed, but you discovered a depth of reliance on Allah that the loss itself carved out. The hardship that remained — but something shifted inside you, and what should have destroyed you became, somehow, survivable. Even peaceful.</p>

  <p>بَرْدًا وَسَلَامًا. Coolness and peace. Not the absence of fire. Peace <em>within</em> the fire.</p>

  <h2>The Verb Form: A Command to Creation</h2>

  <p>كُونِي is the feminine singular imperative of كَانَ — "to be." It's the same root as the cosmic كُن — "Be!" — through which Allah creates. When Allah uses this imperative, He is not requesting. He is not suggesting. He is issuing a command that cannot be disobeyed, because the very fabric of existence is constituted by His speech.</p>

  <p>The fact that fire is addressed as يَا نَارُ — with the vocative particle يَا — is remarkable. In Arabic grammar, the vocative is used to call someone's attention, to address a conscious listener. The Quran addresses fire the way you would address a person. And fire listens. Fire obeys.</p>

  <p>This is the Quran's cosmology in a single ayah. The universe is not a machine running on its own laws independently of God. The universe is a congregation in constant worship, every particle responding to divine command in real time. The fire didn't "malfunction" when it didn't burn Ibrahim. It <em>obeyed</em>. Burning is what fire does when Allah tells it to burn. Not burning is what fire does when Allah tells it not to. There is no contradiction, no broken law — only a different command.</p>

  <p>For the person of faith, this reframes everything. If every element of the natural world is under direct divine command, then no force in creation can harm you without Allah's permission. And no force in creation can be compelled to harm you if Allah commands otherwise. Your relationship with the created world is mediated entirely by your relationship with the Creator.</p>

  <h2>What Ibrahim Said Before the Fire</h2>

  <p>There's a narration — reported by Ibn Abbas and preserved in multiple tafsir traditions — that as Ibrahim was being launched into the fire, Jibril came to him and asked: "Do you need anything?" And Ibrahim's response was: "Not from you." From Jibril — the most powerful angel in existence — Ibrahim needed nothing. His need was directed exclusively at Allah.</p>

  <p>And what he said, according to the tradition, was:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      حَسْبُنَا اللَّهُ وَنِعْمَ الْوَكِيلُ
    </p>
    <p class="translation">"Allah is sufficient for us, and He is the best disposer of affairs."</p>
    <cite>Aal-Imran, 3:173</cite>
  </blockquote>

  <p>حَسْبُنَا — "sufficient for us." Not "we hope He'll help." Not "maybe He'll intervene." Sufficient. Complete. Enough. The word حَسْب comes from a root meaning to count, to reckon, to settle an account. حَسْبُنَا اللَّهُ means: when all accounts are settled, when all calculations are done, Allah is enough. There is nothing this fire can do that falls outside His knowledge, His power, and His plan.</p>

  <p>وَنِعْمَ الْوَكِيلُ — "and the best وَكِيل." A wakeel is someone you entrust your affairs to — an agent, a guardian, a trustee. You hand your case to a wakeel when you cannot handle it yourself. Ibrahim, at the moment of being thrown into a fire, handed his case to Allah — not as a desperate last resort, but as a deliberate, confident act of tawakkul.</p>

  <p>This is what tawakkul looks like at the point of no return. Not calm resignation in comfortable circumstances. Not theoretical trust when things are going well. This is trust when you are mid-air, heading toward flames, with no human intervention possible. This is trust that has been stripped of every crutch, every backup plan, every safety net. All that's left is Allah — and Ibrahim found that to be enough.</p>

  <p>The fire became cool and peaceful. But perhaps it was cool and peaceful because Ibrahim was already at peace before he entered it. His tawakkul didn't follow the miracle — it preceded it. He didn't trust Allah because the fire became safe. The fire became safe, and he had already been trusting Allah.</p>

  <p>This order matters. In the Quran's logic, the internal state comes first. Ibrahim's certainty, his surrender, his حَسْبُنَا اللَّهُ — this was the human side of the equation. And Allah's response — بَرْدًا وَسَلَامًا — was the divine side. The two met in the fire, and the fire had no choice but to obey.</p>

  <p>This is not a story from the past. It's an architecture for the present. Every person who has ever faced their own fire — whether it's grief, injustice, illness, loss, or the slow burn of daily struggle — has access to the same equation. You bring the tawakkul. Allah brings the transformation. The fire remains. But it becomes, for you, something else entirely.</p>

  <p>Coolness and peace. That's the promise. Not the absence of fire — but the presence of Allah within it.</p>
</article>`

// ---------------------------------------------------------------------------
// ARTICLE 3: My Lord, Prison Is Dearer to Me
// ---------------------------------------------------------------------------

const article3_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">There is a moment in Surah Yusuf that, once you truly hear it, changes how you understand moral courage. It's not a battlefield scene. There's no army, no sword, no dramatic rescue. It's a young man — alone, enslaved, far from home, with no one to protect him — making a choice that most people, in his position, would not make. And the words he uses reveal something extraordinary about the relationship between human weakness and divine strength.</p>

  <h2>The Setup: Every Advantage Against Him</h2>

  <p>To understand the weight of Yusuf's choice, you have to understand his situation — not in the abstract, but in its specific, grinding detail.</p>

  <p>Yusuf was not in a position of power. He was a slave. He had been sold as property, pulled from a well where his own brothers had thrown him. He was in Egypt — a foreign land, a foreign language, a foreign culture. He had no family, no tribe, no social network, no legal standing. In the social hierarchy of ancient Egypt, he was nothing.</p>

  <p>The woman who pursued him was the wife of the Aziz — one of the most powerful men in the kingdom. She had authority over him. She controlled his living conditions, his daily life, his physical freedom. And the Quran tells us she didn't just proposition him once. This was a sustained campaign.</p>

  <p>Surah Yusuf 12:23 sets the scene: وَرَاوَدَتْهُ الَّتِي هُوَ فِي بَيْتِهَا عَن نَّفْسِهِ — "And she, in whose house he was, sought to seduce him." The verb رَاوَدَتْ comes from the root ر-و-د, which implies persistent effort, repeated attempts, persuasion over time. This wasn't a single moment of weakness. It was pressure — sustained, calculated, relentless.</p>

  <p>وَغَلَّقَتِ الْأَبْوَابَ — "and she locked the doors." The verb form غَلَّقَتْ is the intensive (Form II), meaning she didn't just close the door — she bolted every door, secured every exit. The plural الْأَبْوَابَ (the doors) suggests multiple doors, all locked. The room was sealed. There was no physical escape.</p>

  <p>وَقَالَتْ هَيْتَ لَكَ — "and she said: Come." Direct. Unambiguous. No subtext to hide behind, no plausible deniability. She named what she wanted.</p>

  <p>Now put yourself in that room. You're young. You're alone. You're a slave with no recourse. The most powerful woman in the household is making a demand, and every door is locked. Nobody will know. Nobody will hold you accountable. Your own society is thousands of miles away. There is no social pressure, no community judgment, no consequence you can see. Every external factor points toward compliance.</p>

  <p>And Yusuf said no.</p>

  <p>قَالَ مَعَاذَ اللَّهِ — "He said: I seek refuge in Allah." Not "I don't find you attractive." Not "I'm afraid of getting caught." مَعَاذَ اللَّهِ — his first word is Allah. His refusal is not social, not strategic, not fear-based. It is theological. He sees Allah in the room when no one else does.</p>

  <h2>"My Lord, Prison Is Dearer to Me"</h2>

  <p>The situation escalated. The women of the city talked. The wife of the Aziz, to prove her point, gathered the women, gave them knives and fruit, and brought Yusuf out. They cut their hands without realizing it, overwhelmed by his appearance. The pressure compounded — not just one woman now, but an entire social circle. يَدْعُونَنِي إِلَيْهِ — "they are calling me to it." The plural. The campaign had expanded.</p>

  <p>And this is where Yusuf makes his du'a:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      رَبِّ السِّجْنُ أَحَبُّ إِلَيَّ مِمَّا يَدْعُونَنِي إِلَيْهِ
    </p>
    <p class="translation">"My Lord, prison is dearer to me than what they are calling me to."</p>
    <cite>Yusuf, 12:33</cite>
  </blockquote>

  <p>The precision of this language is breathtaking.</p>

  <p>He doesn't say prison is good. He doesn't say he wants to be in prison. He says السِّجْنُ أَحَبُّ إِلَيَّ — prison is <em>more beloved</em> to me. أَحَبُّ is the comparative form of حَبّ — love, preference. He's comparing. He can see both options clearly. One offers physical comfort, social advancement, and immediate pleasure. The other offers a dark cell, isolation, and indefinite confinement. And he is saying, with full clarity: I prefer the cell.</p>

  <p>This is not asceticism for its own sake. Yusuf isn't glorifying suffering. He's making a calculation — but it's a calculation based on a value system that most people don't share. In his calculus, the variable that matters most is not comfort or freedom or status. It's his relationship with Allah. Measured against that, prison is the obvious choice. Because prison preserves what the alternative would destroy.</p>

  <p>He addresses Allah as رَبِّ — "my Lord" — using the possessive. Not "ya Allah" in the general sense, but "my Rabb" — my specific Sustainer, the One who has been nurturing and guiding me through every stage of this life. There's intimacy in this word. Yusuf is talking to someone he knows. Someone he trusts with the full weight of what he's about to say.</p>

  <h2>The Du'a Within the Du'a</h2>

  <p>But Yusuf doesn't stop at stating his preference. The ayah continues, and what comes next is perhaps the most psychologically honest moment in the entire surah:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      وَإِلَّا تَصْرِفْ عَنِّي كَيْدَهُنَّ أَصْبُ إِلَيْهِنَّ وَأَكُن مِّنَ الْجَاهِلِينَ
    </p>
    <p class="translation">"And unless You turn their plot away from me, I will incline toward them and be of the ignorant."</p>
    <cite>Yusuf, 12:33</cite>
  </blockquote>

  <p>This is a prophet speaking. A man of extraordinary moral caliber. A man who had already refused, already said مَعَاذَ اللَّهِ, already proven his commitment. And he is saying: <em>if You don't protect me, I will fall</em>.</p>

  <p>أَصْبُ إِلَيْهِنَّ — "I will incline toward them." The verb صَبَا means to incline, to lean toward, to be drawn. Yusuf acknowledges the pull. He doesn't pretend he's above temptation. He doesn't perform piety by claiming the desire isn't there. He looks at his own nafs honestly and says: the desire is real, and on my own strength, I will eventually give in.</p>

  <p>وَأَكُن مِّنَ الْجَاهِلِينَ — "and I will be of the ignorant." Not "the sinners" — الْجَاهِلِينَ, the ignorant. In the Quran's moral vocabulary, the worst thing is not just to sin but to sin while knowing better. Yusuf sees that if he falls, it won't be from ignorance of the truth — it will be from failing to act on it. And that form of moral failure — knowing the right and choosing otherwise — is what he fears most.</p>

  <p>This is the du'a within the du'a. Yusuf isn't just asking for prison as an alternative. He is asking Allah to protect him from <em>himself</em>. He is saying: my willpower is finite. My resistance has a limit. The only reason I haven't already broken is You. And if You withdraw that support for even a moment, I will break.</p>

  <p>There is profound humility here — and profound theology. Yusuf's model of moral strength is not self-generated. It's not "I am strong enough to resist." It's "Allah is keeping me strong, and without Him, I am not." This is the difference between kibr (arrogance) and genuine tawakkul. The arrogant person says: I don't need help, I can handle this. Yusuf says: I absolutely need help, and I'm asking for it right now.</p>

  <p>This should change how we understand our own struggles. If a prophet of Allah — someone with more spiritual capacity than any of us — looked at his own nafs and said "I cannot do this alone," then what does it mean when we try to white-knuckle our way through temptation on our own willpower? Yusuf's du'a gives us permission to be honest about our weakness — and it shows us that acknowledging weakness is not the opposite of strength. It's the precondition for receiving it.</p>

  <h2>The Response: Immediate and Complete</h2>

  <p>Allah answers. And the Quran records the response with a verb form that itself carries meaning:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">
      فَاسْتَجَابَ لَهُ رَبُّهُ فَصَرَفَ عَنْهُ كَيْدَهُنَّ
    </p>
    <p class="translation">"So his Lord responded to him and turned their plot away from him."</p>
    <cite>Yusuf, 12:34</cite>
  </blockquote>

  <p>فَاسْتَجَابَ — the فَ at the beginning indicates immediate sequence. There was no delay. The moment Yusuf asked, Allah responded. The verb اسْتَجَابَ is Form X of ج-و-ب (to answer), and Form X in Arabic carries the meaning of seeking and finding. اسْتَجَابَ doesn't just mean "He answered" — it implies that the response was sought and delivered. The prayer found its recipient. The call reached its destination.</p>

  <p>لَهُ رَبُّهُ — "his Lord responded to him." Again the possessive: رَبُّهُ — <em>his</em> Lord. The Quran mirrors Yusuf's intimacy. He said رَبِّ (my Lord) and Allah responds as رَبُّهُ (his Lord). The relationship is reciprocal. Yusuf turned to Allah, and Allah turned to Yusuf.</p>

  <p>فَصَرَفَ عَنْهُ كَيْدَهُنَّ — "and He turned away from him their plot." The verb صَرَفَ means to divert, to turn away, to redirect. Allah didn't destroy the women or punish them in this moment. He simply turned their scheme away from Yusuf. The plot continued to exist — but it no longer reached him. Like Ibrahim's fire that still burned but couldn't harm — the threat remained, but its power over Yusuf was broken.</p>

  <h2>The Arc: Prison Was the Path</h2>

  <p>Yusuf went to prison. His du'a was answered in a way that looked, to any outside observer, like punishment. A righteous man locked in a cell for years. If you stopped the story here, you would think this was injustice. You would think Allah had abandoned him.</p>

  <p>But the Quran never lets you stop the story partway through.</p>

  <p>In prison, Yusuf met two fellow inmates who had dreams. He interpreted their dreams correctly. One of them was released and eventually mentioned Yusuf to the king. The king had a dream that his advisors couldn't interpret. Yusuf interpreted it. The king was so impressed that he freed Yusuf, cleared his name publicly, and appointed him over the storehouses of Egypt.</p>

  <p>Every step that looked like a disaster — the well, the slavery, the false accusation, the prison — was actually a precisely calibrated movement toward a destination Yusuf could not see while he was living through it. The well brought him to Egypt. The slavery brought him to the Aziz's house. The accusation brought him to prison. The prison brought him to the king. And the king's trust brought him to a position where he could save an entire region from famine — including his own family, the same brothers who had thrown him in the well.</p>

  <p>This is the Quran's deepest teaching about suffering: you cannot evaluate the meaning of a chapter while you're still inside it. Every event in Yusuf's life that felt like destruction was actually construction. But he couldn't see the blueprint. None of us can, in real time.</p>

  <p>And this brings us back to that moment in the room with the locked doors. When Yusuf chose prison over sin, he wasn't choosing suffering. He was choosing the only form of freedom available to him. His body could be locked in a cell, but his soul would remain free. The alternative — physical freedom purchased with spiritual surrender — would have been the real prison. A prison with no walls, no bars, and no release date.</p>

  <p>Yusuf understood something that most people learn only through bitter experience: the worst form of captivity is not external. It's the captivity of living in contradiction with what you know to be true. The person who betrays their own conscience to avoid hardship doesn't escape hardship — they internalize it. They carry it everywhere, in every quiet moment, in every honest thought that surfaces uninvited.</p>

  <p>Yusuf chose the cell. And in the cell, he was more free than anyone outside it. Because he had the only thing that actually constitutes freedom: alignment between what he believed and what he did. Between his inner reality and his outer life. Between his rabb and his nafs.</p>

  <p>رَبِّ السِّجْنُ أَحَبُّ إِلَيَّ. My Lord, prison is dearer to me. Not because I love suffering. But because I love You more than I love comfort. And in that equation, the math is simple.</p>

  <p>The doors were locked. But Yusuf was the freest person in the room.</p>
</article>`

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main() {
  const now = new Date().toISOString()

  // Article 1
  await insertArticle(
    {
      title: 'The Psychology of Shaytan: A Dissection',
      slug: 'psychology-of-shaytan',
      type: 'article',
      excerpt:
        "The Quran doesn't just tell you Shaytan exists — it gives you his playbook. A dissection of every technique, every argument, every angle of attack.",
      content_html: article1_html,
      status: 'published',
      tags: ['shaytan', 'psychology', 'waswasa', 'nafs'],
      reading_time_minutes: 12,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'shaytan', is_primary: true },
      { slug: 'iblis', is_primary: true },
      { slug: 'nafs', is_primary: true },
      { slug: 'adam', is_primary: false },
      { slug: 'firaun', is_primary: false },
    ]
  )

  // Article 2
  await insertArticle(
    {
      title: 'The Fire That Became Cool and Peaceful',
      slug: 'ibrahim-fire-cool-peaceful',
      type: 'article',
      excerpt:
        "When Ibrahim was thrown into the fire, Allah didn't extinguish it — He changed its nature. What this tells us about how divine protection actually works.",
      content_html: article2_html,
      status: 'published',
      tags: ['ibrahim', 'faith', 'tawakkul', 'miracles'],
      reading_time_minutes: 10,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'ibrahim', is_primary: true },
      { slug: 'tawhid', is_primary: true },
      { slug: 'nafs', is_primary: false },
      { slug: 'tawakkul', is_primary: false },
    ]
  )

  // Article 3
  await insertArticle(
    {
      title: 'My Lord, Prison Is Dearer to Me',
      slug: 'yusuf-prison-dearer-to-me',
      type: 'article',
      excerpt:
        "When Yusuf chose prison over sin, he wasn't choosing suffering — he was choosing the only form of freedom available to him. What this moment reveals about moral clarity under pressure.",
      content_html: article3_html,
      status: 'published',
      tags: ['yusuf', 'patience', 'chastity', 'moral-clarity'],
      reading_time_minutes: 11,
      featured: false,
      published_at: now,
    },
    [
      { slug: 'yusuf', is_primary: true },
      { slug: 'nafs', is_primary: false },
      { slug: 'sabr', is_primary: false },
      { slug: 'ikhlas', is_primary: false },
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
