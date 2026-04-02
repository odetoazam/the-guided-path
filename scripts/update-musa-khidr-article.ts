#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// Article 5 ID from original insert
const KHIDR_POST_ID = '1cf7a151-558f-4813-8b99-85881a46bd7f'

const content_html = `<article class="prose-blog">
  <p class="text-lg leading-relaxed">The journey begins with a fish. Musa tells his servant that he will walk until he reaches the place where two seas meet — <strong>majma' al-bahrayn</strong> — even if it takes ages. The fish is the sign: when it escapes into the sea at the place they stop to rest, they have arrived. What makes this opening matter is that Musa misses it. He is asleep when the fish slips away. His servant sees it happen and then forgets to mention it until the next morning. The sign that marks the meeting point arrives and passes without Musa's knowledge. He enters the encounter with Khidr having already demonstrated, once, the limit this story is about to teach him at length.</p>

  <h2>The Man They Find</h2>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">فَوَجَدَا عَبْدًا مِّنْ عِبَادِنَا آتَيْنَاهُ رَحْمَةً مِّنْ عِندِنَا وَعَلَّمْنَاهُ مِن لَّدُنَّا عِلْمًا</p>
    <p class="translation">"And they found a servant from among Our servants whom We had given mercy from Ourselves and had taught from Ourselves a knowledge."</p>
    <cite>Surah Al-Kahf (18:65)</cite>
  </blockquote>

  <p>Three things are attributed to this man, and each comes from Allah directly. <strong>Rahma min 'indinā</strong> — "mercy from Our presence." <strong>Wa 'allamnāhu min ladunnā 'ilmān</strong> — "and We taught him from Ourselves a knowledge." The phrase <strong>min ladunnā</strong> — "from beside Us, from Our own presence" — marks this knowledge as something other than transmitted learning. Classical scholarship calls it <strong>'ilm al-ladunni</strong>: knowledge given directly, not earned through study. The knowledge is not encyclopedic; it is a knowledge of how events unfold, what they produce at their ends, what lies beneath the surface of what appears.</p>

  <p>Musa asks to follow him. The request is framed as a student to a teacher — <strong>hal attabi'uka</strong>, "may I follow you?" — though Musa is a prophet who has spoken directly with Allah. Khidr accepts on one condition: <strong>innaka lan tastaṭī'a ma'iya ṣabran</strong> — "you will not be able to have patience with me." The patience he requires is not patience over time. It is the patience of witnessing actions whose reasons you cannot see. That specific patience, Khidr says, Musa does not have. He is right.</p>

  <h2>Three Actions and Three Failures</h2>

  <p>The boat: Khidr damages it, boring a hole in the hull. Musa objects. Khidr reminds him of the condition. Musa apologizes and asks not to be held to account for forgetting. They continue.</p>

  <p>The boy: Khidr kills him. No charge, no provocation, no prior harm. Musa's response is visceral — <strong>a-qatalta nafsan zakiyyatan bi-ghayri nafsin</strong>, "did you kill a pure soul without a soul having been killed?" Khidr repeats: did I not say you would not have patience? Musa promises this is his last objection. They continue.</p>

  <p>The wall: they pass through a town whose people refuse hospitality. Khidr repairs a wall that was about to collapse. Musa's objection now is not moral outrage but economic logic — he could have taken wages for this work. Khidr ends the companionship.</p>

  <p>The three objections trace a line: from horror at apparent harm, to moral indignation, to practical puzzlement. Musa's emotional register descends as the actions become more difficult to grasp. He stops being outraged and starts being confused. Both responses break the condition.</p>

  <h2>The Attribution That Shifts</h2>

  <p>What Khidr says next is the article's center of gravity. He explains each action in sequence, and the grammar of his explanation does something that most readers pass over: the attribution of each action shifts.</p>

  <p>For the boat:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">أَمَّا السَّفِينَةُ فَكَانَتْ لِمَسَاكِينَ يَعْمَلُونَ فِي الْبَحْرِ فَأَرَدتُّ أَنْ أَعِيبَهَا</p>
    <p class="translation">"As for the boat — it belonged to poor people working at sea, and I intended to damage it."</p>
    <cite>Surah Al-Kahf (18:79)</cite>
  </blockquote>

  <p><strong>Fa-aradtu</strong> — "I intended." First person singular. Khidr takes the action entirely on himself.</p>

  <p>For the boy:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَمَّا الْغُلَامُ فَكَانَ أَبَوَاهُ مُؤْمِنَيْنِ فَخَشِينَا أَن يُرْهِقَهُمَا طُغْيَانًا وَكُفْرًا</p>
    <p class="translation">"As for the boy — his parents were believers, and we feared that he would burden them with transgression and disbelief."</p>
    <cite>Surah Al-Kahf (18:80)</cite>
  </blockquote>

  <p><strong>Fa-khishnā</strong> — "we feared." First person plural. The action is now shared — between Khidr and divine authority, or between the two of them as instruments of a larger concern.</p>

  <p>For the wall:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">وَأَمَّا الْجِدَارُ فَكَانَ لِغُلَامَيْنِ يَتِيمَيْنِ فِي الْمَدِينَةِ وَكَانَ تَحْتَهُ كَنزٌ لَّهُمَا وَكَانَ أَبُوهُمَا صَالِحًا فَأَرَادَ رَبُّكَ أَن يَبْلُغَا أَشُدَّهُمَا وَيَسْتَخْرِجَا كَنزَهُمَا رَحْمَةً مِّن رَّبِّكَ</p>
    <p class="translation">"As for the wall — it belonged to two orphan boys in the city, and beneath it was a treasure for them, and their father was righteous. Your Lord intended that they reach maturity and extract their treasure — a mercy from your Lord."</p>
    <cite>Surah Al-Kahf (18:82)</cite>
  </blockquote>

  <p><strong>Arāda rabbuka</strong> — "your Lord intended." Third person. Divine. The attribution has moved completely out of Khidr's hands.</p>

  <p>The progression is not incidental. The action closest to human comprehension — damaging a boat to save it — is attributed to human agency. Khidr decided. The action most resistant to human moral categories — ending an innocent life — is attributed to a shared concern, something between personal judgment and divine direction. The action most opaque to ordinary logic — doing free work for ungrateful people — is attributed entirely to divine will. <strong>The further an action is from human understanding, the less it can be claimed by human agency.</strong> Khidr knows exactly how much of each action was his and frames it accordingly.</p>

  <p>There is also one more movement at the end of the explanation for the wall: <strong>rahma min rabbik</strong> — "a mercy from your Lord." The entire sequence — boat, boy, wall — concludes with the divine name that governs them all. The story enacts <strong>Al-Khabir</strong> (the All-Aware, the one who knows the hidden dimensions of events) in service of <strong>Ar-Rahman</strong>. Every action that looked like harm was mercy operating below the visible surface.</p>

  <h2>Being and Having in the Three Episodes</h2>

  <p>Each of the three actions involves something that someone possesses — and someone whose existence is at stake.</p>

  <p>The poor fishermen <em>have</em> one thing: a boat. An oppressive king is moving through the region, seizing every serviceable vessel. The hole makes the boat imperfect, worth skipping. What they *have* is protected by a damage that makes it appear lesser. The apparent harm to their property is what preserves their livelihood.</p>

  <p>The boy's parents *are* believers — <strong>kāna abawāhu mu'minayn</strong>. Their <em>being</em>, their faith, their spiritual state is the thing at risk. The boy would grow to subject them to <strong>ṭughyān wa kufr</strong> — transgression and disbelief — burdening the very thing that defines them. The life taken is the one whose continuation would have corrupted the *being* of two others.</p>

  <p>The orphans will *have* a treasure when they come of age — but only if the wall stands. Their father's righteousness (his *being* as a righteous man) reaches across his death to protect what they will *have*. The divine intention here spans generations: a man died righteous and that righteousness is still generating consequences years later.</p>

  <p>In each case, Khidr acts to protect something from a threat that is invisible to ordinary observation. The boat's damage protects the fishermen's having. The boy's death protects the parents' being. The wall preserves the orphans' future having, honoring the father's past being. Every action is preservation, not harm. The category of harm only applies if you see the surface.</p>

  <h2>What Musa Could Not Hold</h2>

  <p>Khidr states the condition before the journey and repeats it twice when the condition is broken: <strong>innaka lan tastaṭī'a ma'iya ṣabran</strong>. The verb <strong>tastaṭī'a</strong> — from <strong>ṭ-w-'</strong> — does not mean "will not choose." It means "will not be able." Khidr is not predicting Musa's choice. He is identifying a structural limitation. The patience required to witness Al-Khabir operating through events while seeing only the surface — that patience is not available to the position Musa occupies.</p>

  <p>Musa is the prophet of legislation — the one who receives the divine word directly and delivers it with precision. His knowledge is vertical and direct: Allah speaks, Musa hears. Khidr's knowledge is lateral and interpretive: events happen, and their hidden architecture is readable to those given the specific gift. These are different instruments for different dimensions of the real. Neither is superior. They serve different purposes in the divine economy.</p>

  <p>The journey ends with Khidr's words: <strong>wa mā fa'altuhu 'an amrī</strong> — "I did not do any of it of my own accord." The line that closes the encounter is a relinquishment: everything done here came from somewhere beyond me. The first-person singular that opened the explanation — <strong>fa-aradtu</strong>, "I intended" — was the most human attribution available. It was as much as Khidr could honestly claim for the boat. The wall was <strong>arāda rabbuka</strong> — "your Lord intended." Between those two poles, everything that looked like catastrophe was mercy that had not yet arrived at its visible end.</p>
</article>`

async function main() {
  const { error } = await supabase
    .from('posts')
    .update({
      content_html,
      reading_time_minutes: 12,
    })
    .eq('id', KHIDR_POST_ID)

  if (error) {
    console.error('✗ Update failed:', error)
  } else {
    console.log('✓ Khidr article updated (1cf7a151)')
  }
}

main().catch(console.error)
