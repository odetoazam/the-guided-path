import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
)

const SLUG = 'quran-9-5-sword-verse-kill-the-unbelievers'

// Answer-first, question-shaped article derived from the validated 9:5 tadabbur
// source (content/tadabbur/009-at-tawbah/ayah-005.md — all 3 validators passed).
const contentHtml = `
<p class="prose-lead"><strong>No — Quran 9:5, the so-called "sword verse," does not command Muslims to kill all non-believers.</strong> It addresses one specific group: the Arabian polytheists who had broken their treaties with the Muslim community and stayed at war. The verse is preceded by a four-month amnesty (9:2), interrupted by a repentance clause that ends the fighting instantly ("but if they repent… then let their way be free"), followed immediately by a command to grant asylum to any polytheist who simply wants to listen (9:6), and sealed with two names of mercy. Read whole, it is the most carefully bounded verse in the Qur'an — and the most quoted out of context.</p>

<h2>What does Quran 9:5 actually say?</h2>
<p dir="rtl" lang="ar">فَإِذَا ٱنسَلَخَ ٱلْأَشْهُرُ ٱلْحُرُمُ فَٱقْتُلُوا۟ ٱلْمُشْرِكِينَ حَيْثُ وَجَدتُّمُوهُمْ وَخُذُوهُمْ وَٱحْصُرُوهُمْ وَٱقْعُدُوا۟ لَهُمْ كُلَّ مَرْصَدٍ ۚ فَإِن تَابُوا۟ وَأَقَامُوا۟ ٱلصَّلَوٰةَ وَءَاتَوُا۟ ٱلزَّكَوٰةَ فَخَلُّوا۟ سَبِيلَهُمْ ۚ إِنَّ ٱللَّهَ غَفُورٌ رَّحِيمٌ</p>
<p><em>"Then, when the sacred months have been stripped away, kill the polytheists wherever you find them, and seize them, and besiege them, and lie in wait for them at every place of ambush. But if they repent, and establish the prayer, and give the zakah, then let their way be free. Indeed, Allah is Forgiving, Merciful."</em></p>

<h2>Who are "the polytheists" in this verse?</h2>
<p>Not all non-Muslims, and not the People of the Book. Surah At-Tawbah opens in the register of a broken treaty — it is the only surah with no <em>bismillāh</em>, which the scholars link to its theme of rupture. The polytheists (<em>al-mushrikīn</em>) named here are the specific Arabian tribes who had entered formal pacts with the Muslims and then broken them, attacking and aiding attackers. This is a verse about named combatants on an active battlefield, not a statement about belief or a license against civilians.</p>

<h2>What comes immediately before: a four-month amnesty</h2>
<p>The verse does not begin with a sword. It begins with a clock. Just three verses earlier, 9:2 gives those same treaty-breakers four months to move freely through the land — an amnesty handed to the guilty party in advance. Verse 5 only begins <em>after</em> that period is fully spent, and the Arabic makes the waiting unmistakable: <em>fa-idhā nsalakha</em>, "when the sacred months are <strong>stripped away</strong>." The verb <em>insalakha</em> (root <em>s-l-kh</em>) is the word for a snake sloughing its skin, or daylight being peeled from the sky. The months of protection are pictured as a skin that has to come off completely before anything beneath can be touched. You cannot reach the command in this verse without first passing through a verb that means "wait until the last layer has fully shed."</p>

<h2>What comes immediately after: the command to give asylum (9:6)</h2>
<p>The very next verse reverses the posture entirely. 9:6 commands that if any one of those same polytheists seeks protection — <em>istajāraka</em> — in order to hear the word of God, you must grant him asylum and then <strong>escort him to a place where he is safe</strong>. The verse the world reads as "kill them wherever you find them" is followed by an order to personally guarantee the safety of the enemy who comes merely as a listener — not even as a convert.</p>

<h2>The off-ramp inside the verse: "but if they repent"</h2>
<p>The verse stacks four commands of pursuit — kill, seize, besiege, lie in wait — and then collapses all of them with a single condition: <em>fa-in tābū</em>, "but if they repent." The moment that condition is met, the instruction becomes <em>fa-khallū sabīlahum</em>, "then let their way be free." The verb <em>khallū</em> (Form II of <em>kh-l-w</em>) is not a grudging cease-fire; it is a total release, an emptying of every claim against them. Notice the asymmetry: it takes four verbs to describe the pursuit and one verb — repent — to switch the whole thing off. And the threshold is public and deliberately low: establish the prayer, give the zakah, rejoin the community. The classical scholars (al-Ṭabarī, al-Qurṭubī) read these as the visible markers of re-entry, not an inquisition into the heart.</p>

<h2>How did classical scholars read 9:5?</h2>
<p>The classical tradition never read this verse as an open-ended command. Ibn Kathīr, citing Mujāhid, Qatādah, al-Suddī and others, identifies "the sacred months" here precisely as the four-month grace period of 9:2. The central scholarly debate was only ever about <em>which</em> boundary applied — whether the verse was specified (<em>takhṣīṣ</em>) to these particular treaty-breakers, or whether it abrogated (<em>naskh</em>) certain earlier verses. The argument inside the tradition was about which fence to use. Not one major mufassir removed the field.</p>

<h2>Why the verse resists being quoted alone</h2>
<p>Read the structure. The verse opens with <em>fa-idhā</em> ("<em>when</em> the months are stripped") — a hinge that demands the amnesty-clause before it. It pivots on <em>fa-in tābū</em> ("<em>but if</em> they repent") — a hinge that demands the condition after it. The sentence is grammatically incomplete in both directions. To quote only the middle — "kill the polytheists wherever you find them" — you have to amputate a <em>when</em> from its front and an <em>if</em> from its back. And then notice where the verse <em>ends</em>: a verse about combat closes not on power but on <em>ghafūrun raḥīm</em>, "Forgiving, Merciful" — the two names the Qur'an returns to most. The killing is the narrow middle of the sentence; mercy is the frame around it.</p>

<h2>The bottom line</h2>
<p>The most weaponized verse in the Qur'an is bracketed by an amnesty before it (9:2) and an asylum after it (9:6), interrupted by a repentance clause that ends the fighting at once, and sealed with two names of mercy. Every structural feature of the verse works to delay the blade, narrow it, and open a door beside it. Read honestly, it cannot be the standalone command its fragment pretends to be.</p>

<h2>Frequently asked questions</h2>
<h3>Does Quran 9:5 command Muslims to kill all non-believers?</h3>
<p>No. It addresses the specific Arabian polytheists who had broken their treaties and remained at war — not all non-believers, and not the People of the Book. Classical tafsir read it as a battlefield instruction against treaty-breakers, bounded by the verses around it.</p>
<h3>What is the context of the "sword verse"?</h3>
<p>It follows 9:2, which grants those treaty-breakers a four-month amnesty, and it is immediately followed by 9:6, which commands granting asylum to any polytheist who seeks to hear the word of God and escorting him to safety.</p>
<h3>Does 9:5 offer the enemy a way out?</h3>
<p>Yes. On the single condition "but if they repent" (<em>fa-in tābū</em>), the verse commands "then let their way be free" — a total release — and seals on "Indeed, Allah is Forgiving, Merciful."</p>
<h3>Is the "sword verse" abrogated or limited?</h3>
<p>Classical scholars debated the mechanism (specification vs. abrogation), but none read it as an open-ended command against all non-Muslims. The disagreement was about which boundary applies, never whether the verse was bounded.</p>

<p><em>This reflection follows our approach to the hardest passages — see <a href="/contested-verses">how we handle contested verses</a> and <a href="/methodology">our methodology</a>.</em></p>
`.trim()

async function main() {
  const { data: existing } = await supabase.from('posts').select('id').eq('slug', SLUG).maybeSingle()
  if (existing) {
    console.log('Post already exists, updating content:', existing.id)
    const { error } = await supabase.from('posts').update({
      content_html: contentHtml,
      updated_at: new Date().toISOString(),
    }).eq('id', existing.id)
    if (error) { console.error('Update error:', error); process.exit(1) }
    console.log('Updated.')
    return
  }

  const now = new Date().toISOString()
  const { data, error } = await supabase.from('posts').insert({
    title: "Does the Quran Say “Kill the Unbelievers Wherever You Find Them”? Reading 9:5, the ‘Sword Verse,’ in Full",
    slug: SLUG,
    excerpt: "The 'sword verse' (9:5) is the most quoted-out-of-context line in the Qur'an. Read whole — with the four-month amnesty before it, the repentance clause inside it, and the command to give asylum after it — it is the most carefully bounded verse in the book.",
    content_html: contentHtml,
    content_json: {},
    status: 'published',
    type: 'article',
    seo_title: "Quran 9:5 'Sword Verse' Explained — Does It Say Kill Non-Believers?",
    seo_description: "Does Quran 9:5 command killing all non-believers? No. Read in context — the four-month amnesty (9:2), the repentance off-ramp, and the asylum command (9:6) — with classical tafsir.",
    tags: ['at-tawbah', 'sword-verse', 'contested-verses', 'jihad', 'qital', 'tafsir', 'tawbah'],
    quran_refs: ['9:5', '9:2', '9:6'],
    reading_time_minutes: 7,
    featured: false,
    published_at: now,
    publish_date: now,
    created_by: '5814582a-9f09-473a-be6f-619c210cca8e',
  }).select('id').single()

  if (error) { console.error('Insert error:', error); process.exit(1) }
  console.log('Published article:', data.id, '→ /posts/' + SLUG)
}

main()
