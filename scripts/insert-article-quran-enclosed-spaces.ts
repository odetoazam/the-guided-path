import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'

const content_html = `<article class="prose-blog">

  <p class="text-lg leading-relaxed">The Quran sends four of its prophets underground. <a href="/hub/yusuf">Yusuf</a> is lowered into a well by his brothers. <a href="/hub/yunus">Yunus</a> is swallowed by a whale in the dark of the sea. <a href="/hub/ibrahim">Ibrahim</a> is thrown into a fire by his own people. And a group of young believers — <a href="/hub/ashab-al-kahf">Ashab al-Kahf</a> — walk into a cave and disappear for three centuries. Each enclosure is a death sentence by every natural measure. Each one becomes the site of divine encounter. The pattern is too consistent to be coincidence and too strange to be accidental: the Quran places its most transformative moments inside the spaces where transformation should be impossible.</p>

  <h2>Yusuf at the Bottom</h2>

  <p>The well is the first enclosure. Yusuf's brothers carry out a plan that has the structure of a murder: they take him away from his father, lower him into a pit, and return with a bloodied shirt. He is a child. The Quran records what happens at the bottom:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">فَلَمَّا ذَهَبُوا۟ بِهِۦ وَأَجْمَعُوٓا۟ أَن يَجْعَلُوهُ فِى غَيَـٰبَتِ ٱلْجُبِّ ۚ وَأَوْحَيْنَآ إِلَيْهِ لَتُنَبِّئَنَّهُم بِأَمْرِهِمْ هَـٰذَا وَهُمْ لَا يَشْعُرُونَ</p>
    <p class="translation">"So when they took him and agreed to put him in the bottom of the well — We revealed to him: 'You will surely inform them about this affair of theirs while they do not perceive.'"</p>
    <cite>Surah Yusuf (12:15)</cite>
  </blockquote>

  <p>The verse hinges on a conjunction. The brothers take him and agree to throw him into the depths of the well — <em>ghayabat al-jubb</em>, the hidden bottom, the place where things disappear. And then, connected by a single <em>wa</em>: "We revealed to him." The conspiracy and the revelation occupy the same grammatical space. At the precise moment the brothers execute their plan, God executes His. The well that the brothers intended as an ending becomes the site of the first divine communication recorded in Yusuf's life.</p>

  <p>The content of the revelation is equally striking. God tells the child: you will inform them about this affair of theirs. The promise is future-tense — decades will pass before it is fulfilled, when Yusuf stands before his brothers in Egypt as the keeper of the storehouses. But the promise is given at the bottom. The destination is announced inside the pit. What the brothers intended as permanent disappearance, God reframes as the opening chapter of a story the boy will one day narrate back to them.</p>

  <p>And the Quran adds: <em>wa hum la yash'urun</em> — while they do not perceive. The brothers are blind to what is happening. Their plan is executing flawlessly by every external measure: the boy is gone, the shirt is bloody, the father will grieve. They perceive a completed crime. What they cannot perceive is that the well is occupied by two presences — the child and the voice of God — and that the boy they thought they had buried has just been told how the story ends.</p>

  <h2>The Youth in the Cave</h2>

  <p>The cave is a voluntary enclosure. The youth of Al-Kahf are young men living in a society that has turned against monotheism. Their response is withdrawal:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">إِذْ أَوَى ٱلْفِتْيَةُ إِلَى ٱلْكَهْفِ فَقَالُوا۟ رَبَّنَآ ءَاتِنَا مِن لَّدُنكَ رَحْمَةً وَهَيِّئْ لَنَا مِنْ أَمْرِنَا رَشَدًا</p>
    <p class="translation">"When the youth took refuge in the cave and said: 'Our Lord, grant us mercy from Yourself, and prepare for us right guidance in our affair.'"</p>
    <cite>Surah Al-Kahf (18:10)</cite>
  </blockquote>

  <p>The verb is <em>awa</em> — to take shelter, to seek refuge. They are walking into darkness on purpose. And their first act inside is speech: a prayer asking for mercy and guidance. The cave is chosen, entered with intention, and immediately consecrated by the act of asking God for direction. Unlike Yusuf's well, where the boy was thrown, the cave is approached. The youth go in with their eyes open.</p>

  <p>What happens next makes the cave something else entirely:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">فَضَرَبْنَا عَلَىٰٓ ءَاذَانِهِمْ فِى ٱلْكَهْفِ سِنِينَ عَدَدًا</p>
    <p class="translation">"So We struck upon their ears in the cave for a number of years."</p>
    <cite>Surah Al-Kahf (18:11)</cite>
  </blockquote>

  <p>The phrase <em>darabna ala adhanihim</em> — We struck upon their ears — is the Quran's way of describing a sleep so deep that sound itself is sealed out. The enclosure doubles: they are in a cave, and then they are in sleep. Two layers of separation from the world. And inside that doubled silence, God preserves them. Three hundred and nine years pass. Civilizations turn over. The society that persecuted them dies. And when they wake, they are intact — unaged, undecayed, confused about how long they slept. The cave that was a hiding place became an ark.</p>

  <p>The distinction from the well is instructive. Yusuf received a revelation — a message, information about the future. The youth of the cave received preservation — their bodies held in suspension, their lives extended across centuries without damage. The well gave a word. The cave gave time. Both enclosures delivered something impossible by natural law.</p>

  <h2>Yunus in the Whale</h2>

  <p>The whale is the most extreme enclosure. Yunus is a prophet who leaves his people before God gives him permission. The sea swallows his ship in a storm, the lot falls on him, and he is cast into the water. Then:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">فَٱلْتَقَمَهُ ٱلْحُوتُ وَهُوَ مُلِيمٌ</p>
    <p class="translation">"Then the whale swallowed him, and he was blameworthy."</p>
    <cite>Surah As-Saffat (37:142)</cite>
  </blockquote>

  <p>The verb <em>iltaqamahu</em> — Form VIII of <em>la-qa-ma</em>, to gulp, to swallow whole — is visceral. The whale takes him in a single action. And the Quran specifies his state: <em>wa huwa mulim</em>, he was blameworthy. He entered the enclosure carrying guilt. Yusuf entered the well innocent. The youth entered the cave faithful. Yunus enters the whale at fault. The Quran does not hide this or soften it. The enclosure receives him as he is.</p>

  <p>Inside the whale, in a darkness the Quran describes elsewhere as <em>zulumat</em> — layered darknesses, darkness upon darkness — Yunus speaks:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">فَنَادَىٰ فِى ٱلظُّلُمَـٰتِ أَن لَّآ إِلَـٰهَ إِلَّآ أَنتَ سُبْحَـٰنَكَ إِنِّى كُنتُ مِنَ ٱلظَّـٰلِمِينَ</p>
    <p class="translation">"And he called out in the darknesses: 'There is no deity except You; exalted are You. Indeed, I have been among the wrongdoers.'"</p>
    <cite>Surah Al-Anbiya (21:87)</cite>
  </blockquote>

  <p>Two things happen in this cry. First, <em>tawhid</em>: there is no deity except You. In the deepest physical darkness available to a human body, Yunus arrives at the deepest clarity available to a human soul. The enclosure has stripped away every external reference point — sky, land, society, mission, reputation — and what remains is the relationship between the servant and God, unmediated. Second, confession: I have been among the wrongdoers. Where Yusuf received a promise at the bottom, Yunus offers a confession. The well gave foreknowledge; the whale gave self-knowledge.<!-- LINK: pattern=enclosure-as-mirror-stripping-to-essential-self --></p>

  <p>God's response is immediate:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">فَٱسْتَجَبْنَا لَهُۥ وَنَجَّيْنَـٰهُ مِنَ ٱلْغَمِّ ۚ وَكَذَٰلِكَ نُـۨجِى ٱلْمُؤْمِنِينَ</p>
    <p class="translation">"So We responded to him and saved him from the distress. And thus do We save the believers."</p>
    <cite>Surah Al-Anbiya (21:88)</cite>
  </blockquote>

  <p>The closing phrase — <em>wa kadhalika nunji al-mu'minin</em>, and thus do We save the believers — generalizes the rescue. The pattern is lifted from Yunus's particular biography and declared universal. This is how God saves believers: through enclosures that feel like endings but function as passages.</p>

  <h2>Ibrahim in the Fire</h2>

  <p>The fire is the most paradoxical enclosure. Ibrahim has broken the idols. His people have built a structure for his execution. The Quran records the sentence and the intervention in consecutive verses:</p>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">قَالُوا۟ حَرِّقُوهُ وَٱنصُرُوٓا۟ ءَالِهَتَكُمْ إِن كُنتُمْ فَـٰعِلِينَ</p>
    <p class="translation">"They said: 'Burn him and support your gods — if you are to act.'"</p>
    <cite>Surah Al-Anbiya (21:68)</cite>
  </blockquote>

  <blockquote class="ayah-quote">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201, 168, 76, 0.85);">قُلْنَا يَـٰنَارُ كُونِى بَرْدًا وَسَلَـٰمًا عَلَىٰٓ إِبْرَٰهِيمَ</p>
    <p class="translation">"We said: 'O fire, be coolness and safety upon Ibrahim.'"</p>
    <cite>Surah Al-Anbiya (21:69)</cite>
  </blockquote>

  <p>The command is addressed to the fire itself. The Quran treats fire as an entity capable of receiving instruction: <em>ya naru kuni</em> — O fire, be. The imperative form is feminine singular, matching <em>nar</em>, and the command has two objects: <em>bardan</em> (coolness) and <em>salaman</em> (peace, safety). The fire is ordered to reverse its essential nature — to become the opposite of what it is. And it obeys.</p>

  <p>This enclosure is different from the others in a critical way. In the well, in the cave, in the whale, the enclosure's nature remains unchanged — it is still dark, still confining, still dangerous. What changes is the outcome: the person inside is preserved despite the environment. In the fire, the environment itself is altered. The fire becomes cool. The enclosure is transformed at the molecular level, remade from inside. Ibrahim survives because the fire ceases to be fire while he is inside it.<!-- LINK: pattern=divine-command-overriding-natural-law --></p>

  <p>The Quran leaves Ibrahim's experience inside unnarrated — a silence where Yusuf received revelation, the Cave held sleep, and Yunus offered prayer. The absence of record is the point. Ibrahim's enclosure is the purest form: the servant is placed inside destruction, God commands destruction to stand down, and the servant emerges. The preservation is itself the encounter, unmediated by speech or prayer or promise. God acts; Ibrahim is held. That is the entire content of the fire.</p>

  <h2>The Pattern and What It Means</h2>

  <p>Four enclosures. Four prophetic experiences. And the pattern holds across all of them:</p>

  <p>Every enclosure is entered through loss. Yusuf loses his family, his freedom, his childhood. The youth lose their society, their era, their waking lives. Yunus loses his mission, his ship, his claim to prophetic authority. Ibrahim loses his safety, his community's protection, and any human means of rescue. The enclosure receives the person at the moment they have been stripped of everything external.</p>

  <p>Every enclosure delivers something the open world could not. The well gives Yusuf his first revelation — the beginning of his prophetic career. The cave gives the youth preservation across centuries — a miracle of time. The whale gives Yunus a confrontation with himself that produces the clearest prayer in his life. The fire gives Ibrahim a demonstration of divine sovereignty so absolute that his people's theology collapses: the gods they were trying to defend by burning him prove powerless to make the fire do its job.<!-- LINK: pattern=powerlessness-of-idols-when-tested --></p>

  <p>Every enclosure is followed by emergence into a transformed situation. Yusuf rises from the well into slavery, then prison, then governance — a trajectory that was invisible from inside the pit. The youth wake into a world that has converted to monotheism in their absence. Yunus is cast onto the shore and returned to his people, who this time believe. Ibrahim walks out of the fire and his people cannot touch him again — the next verse says they intended a plot against him, <em>fa-ja'alnahum al-akhsarin</em>, but We made them the greatest losers.</p>

  <p>The enclosure, in every case, is the pivot. The story has one shape going in and a different shape coming out. And the pivot always involves a direct encounter with God — whether through revelation, preservation, self-confrontation, or the rewriting of natural law.</p>

  <h2>What the Quran Sees in Darkness</h2>

  <p>There is a theological architecture beneath the pattern. The open world — daylight, society, the surface of things — is where human agency operates. People make plans, build reputations, exercise power, compete for status. The enclosure removes all of that. Inside the well, the cave, the whale, the fire, human agency reaches zero. The person is left with bare dependence — stripped of tools, allies, and strategy. The enclosure is the space where <a href="/hub/tawakkul">tawakkul</a> ceases to be a concept and becomes the only available posture.</p>

  <p>Al-Ghazali describes a stage in the spiritual life where the traveler must pass through what he calls <em>fana</em> — the annihilation of the self's attachment to its own powers. The enclosures in the Quran function as narrative enactments of this stage. The self that entered the well — Yusuf, the beloved son, the dreamer — is dissolved. What exits is Yusuf the prophet, whose entire subsequent biography will be defined by servanthood to God rather than by his father's favor. The self that entered the whale — Yunus, the frustrated preacher who walked away — is dissolved. What exits is Yunus the servant, whom the Quran describes in Surah As-Saffat as being cast onto the shore <em>wa huwa saqim</em>, and he was ill, exposed, stripped, starting over.</p>

  <p>The enclosure is where the old self goes to die and the new self begins. The darkness is functionally necessary — it is the space where the external markers of identity (family, society, reputation, physical safety) are removed so that the only remaining relationship is the vertical one: the servant and God, with nothing between them.<!-- LINK: pattern=vertical-orientation-when-horizontal-stripped --></p>

  <p>This is where the Quran's theology of enclosure diverges from every narrative tradition that treats the descent as a test of the hero's character. In the classical <em>monomyth</em>, the hero descends into the underworld and returns having proven himself worthy. In the Quran, the descent reveals the nature of God, not the merit of the person — Yunus enters the whale blameworthy, carrying failure. The well proves that God's plan operates inside the very act that tries to thwart it. The cave proves that God's preservation extends across time scales that make human planning absurd. The whale proves that God responds to sincerity regardless of the speaker's moral record. The fire proves that God's command overrides the basic physics of the created world.</p>

  <p>The enclosure is addressed to the reader as much as to the prophet. The Quran generalizes the pattern explicitly in Yunus's case: <em>wa kadhalika nunji al-mu'minin</em> — and thus do We save the believers. The rescue mechanism is declared applicable beyond the prophet, to any believer in any darkness. The well, the cave, the whale, the fire — these are named in the Quran as historical events, but their function is typological. They teach the reader what to expect from the darkest spaces: that God is already there, that the enclosure is a passage rather than an end, and that what emerges will be shaped by the encounter that happened inside.<!-- LINK: pattern=quran-generalizing-prophetic-experience-to-reader --></p>

  <h2>The Silence Inside</h2>

  <p>One final observation. The Quran is selective about what it records from inside each enclosure. In the well, it records the revelation — a verbal message. In the cave, it records nothing: the youth sleep, and the narration jumps to their waking. In the whale, it records a prayer. In the fire, it records a command addressed to the fire, not to Ibrahim.</p>

  <p>The progression moves from speech to silence. The well is the most narrated (a full sentence of revelation). The cave is narrated only from outside (God struck upon their ears). The whale contains a single cry. The fire contains a command that bypasses Ibrahim entirely — God speaks to the element, and Ibrahim is the beneficiary of a conversation he may not have even heard.</p>

  <p>This is the Quran's way of approaching a mystery it treats as beyond narration. What happens when a human being is alone with God in a space where everything else has been removed? The Quran gives progressively less information. It shows the before and the after. It quotes the prayer or the revelation when there is one. But as the enclosures intensify — from the well (survivable) to the fire (physically impossible to survive) — the Quran says less about what happens inside. The fire narrative is two verses: they threw him in; God told the fire to stop. The compression is deliberate. The encounter at the most extreme point is the one the Quran treats as most private, most beyond the reach of narration.<!-- LINK: pattern=quran-compresses-narration-at-highest-intensity --></p>

  <p><a href="/hub/qadar">Qadar</a> — the decree of God — is often discussed as an abstract theological category. The enclosures make it concrete. The decree is a presence inside the well, inside the cave, inside the whale, inside the fire — already at work before the person arrives, already preparing the exit before the entrance is sealed. Every prophet who went underground discovered that God was already there. Every believer who reads these stories is being told the same thing: the space you are most afraid of is the space where the encounter happens.</p>

</article>`;

async function main() {
  const { data: post, error: postError } = await supabase
    .from('posts')
    .insert({
      title: 'The Well, the Cave, the Whale, the Fire: What the Quran Does with Enclosed Spaces',
      slug: 'quran-enclosed-spaces-well-cave-whale-fire',
      type: 'article',
      excerpt: 'The Quran sends four prophets underground — into a well, a cave, a whale, and a fire. Every enclosure should have been an ending. Every one became the site of divine encounter. The pattern is too consistent to be accidental.',
      seo_title: 'Enclosed Spaces in the Quran — Well, Cave, Whale, Fire',
      seo_description: 'Why does the Quran place divine encounter inside enclosed spaces? A cross-story analysis of Yusuf in the well, Ashab al-Kahf, Yunus in the whale, and Ibrahim in the fire.',
      content_html: content_html,
      status: 'published',
      tags: ['cross-story', 'yusuf', 'yunus', 'ibrahim', 'ashab-al-kahf', 'qadar', 'tawakkul'],
      reading_time_minutes: 20,
      featured: false,
      published_at: new Date().toISOString(),
      created_by: ADMIN_USER_ID,
    })
    .select('id')
    .single()

  if (postError) {
    console.error('Post insert error:', postError)
    process.exit(1)
  }

  console.log('Post inserted:', post.id)

  const entityTags = [
    { post_id: post.id, entity_id: 'ce7c797b-ae5f-4a6d-8d2d-5a54b43ae5e4', is_primary: true },  // yusuf
    { post_id: post.id, entity_id: '949fd304-2b32-4d28-8556-bfc69f8bdf41', is_primary: true },  // yunus
    { post_id: post.id, entity_id: 'dc5cd1d2-00d3-482d-bdcd-2d20344e7838', is_primary: true },  // ibrahim
    { post_id: post.id, entity_id: '23de6860-d6f4-4e32-99f2-d497e596c04f', is_primary: true },  // ashab-al-kahf
    { post_id: post.id, entity_id: '547e36b8-aa55-4c03-a139-cd94f1df456a', is_primary: false }, // tawakkul
    { post_id: post.id, entity_id: 'f0760586-2cfb-497a-af2e-76a68af2d5e1', is_primary: false }, // qadar
    { post_id: post.id, entity_id: 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49', is_primary: false }, // sabr
  ]

  const { error: tagError } = await supabase
    .from('entity_tags')
    .insert(entityTags)

  if (tagError) {
    console.error('Tag insert error:', tagError)
    process.exit(1)
  }

  console.log('Entity tags inserted:', entityTags.length)
  console.log('Done! Slug: quran-enclosed-spaces-well-cave-whale-fire')
}

main()
