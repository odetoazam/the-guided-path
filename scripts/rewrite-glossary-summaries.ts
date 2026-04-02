/**
 * Rewrites glossary summaries in-place in src/data/glossary.ts
 * Uses string replacement to swap old summary for new.
 * Run: npx tsx scripts/rewrite-glossary-summaries.ts
 */
import * as fs from 'fs'
import * as path from 'path'

const GLOSSARY_PATH = path.join(__dirname, '..', 'src', 'data', 'glossary.ts')

// Map of slug -> new summary
// Voice rules: lead with what the concept does for YOU, avoid "not X but Y", avoid negation cascades
const REWRITES: Record<string, string> = {
  // ── States of the Heart ─────────────────────────────────────────────────
  tawbah: "You moved away from God. Tawbah is the act of turning back. The root literally means 'to return' — and the Quran uses the same root for God turning toward you. Every time you turn to Him, He is already turning to you. The door is always open. This is the most repeated second chance in all of scripture.",
  sabr: "When life breaks you — and it will — sabr is how you hold. The word covers three things: enduring what hurts, staying away from what tempts, and continuing to do what's right when no one is watching. The Quran mentions it over ninety times because everything worth building requires it.",
  tawakkul: "You tie your camel, then you trust God. Tawakkul is reliance on God after you've done your part — the moment when effort ends and surrender begins. It means appointing God as your wakīl, your representative, the one who handles what you cannot control. The hardest part is letting go after you've done your best.",
  khushu: "That stillness in prayer where the world disappears and it's just you and God — that's khushu'. The Quran says prayer without it is a body without a soul. It comes from a root meaning 'to become low, to submit' — the heart bowing before the tongue ever moves.",
  nadam: "The ache you feel when you realize you've done something wrong — before you've made it right. Nadam is the emotional precursor to tawbah. The Prophet ﷺ said remorse *is* repentance, because without the pain of recognition, there is no turning back. It's the alarm system God built into the human conscience.",
  shukr: "Gratitude that starts in the heart, moves to the tongue, and finishes in the hands. The Quran pairs shukr with a promise: if you are grateful, I will give you more. The opposite of shukr is kufr — covering over the blessings, pretending they came from you. Shukr is the acknowledgment that everything good has a source.",
  mahabbah: "Love — the force that reshapes everything it touches. When the Quran describes believers, it says they love God intensely. When it describes God, it lists the people He loves: those who do good, those who are just, those who purify themselves, those who fight in His way. Mahabbah is the relationship that gives everything else its meaning.",
  khawf: "The fear that makes you careful with God — reverence, not terror. Khawf keeps you honest the way a speed limit keeps you alive. The Quran pairs it with hope (raja') because a believer lives between the two: afraid enough to stay away from what harms, hopeful enough to keep moving toward what heals.",
  raja: "Hope aimed at God. Raja' is the confidence that God's mercy is wider than your mistakes — but it's earned through effort, not wishful thinking. The Quran warns against hope without action (that's delusion) and action without hope (that's despair). Real raja' is working hard and trusting that God sees it.",
  ikhlas: "Doing something purely for God — with no audience in mind, no praise expected, no secondary motive. Ikhlas is sincerity so complete that if no one ever knew what you did, you'd still do it. The word comes from a root meaning 'to extract, to purify' — removing everything from your intention until only God remains.",
  tawadu: "Humility before God and people. Tawadu' means knowing your place — which sounds diminishing until you realize the Quran says God elevates the humble. It means treating the janitor the same as the CEO, because in front of God, the only rank that matters is taqwa.",
  wara: "The caution that keeps you away from anything doubtful — a step beyond what's technically allowed, into what's spiritually safe. Wara' is the guardrail around the guardrail. The Prophet ﷺ said the halal is clear and the haram is clear, and between them are doubtful matters. Wara' avoids the gray zone entirely.",
  qanah: "Contentment with what God gave you. Qana'ah means your heart is at rest even when your bank account is low. The Prophet ﷺ said real wealth is the richness of the soul. This concept separates people who have everything and feel empty from people who have little and feel full.",
  muraqaba: "Living as if God is watching — because He is. Muraqaba is continuous awareness of God's gaze. The Prophet ﷺ defined ihsan as worshipping God as if you see Him, and if you don't see Him, knowing that He sees you. Muraqaba is the practice of making that awareness constant.",
  inabah: "Tawbah turns you back to God once. Inabah keeps you turned. It's the deeper station — where returning to God becomes your default direction, where the heart stays oriented even when life pushes you sideways. Ibrahim, Dawud, and Sulayman are all described with this word.",
  khashya: "The highest form of fear in the Quran — the kind that comes from knowing God deeply. The Quran says: 'Only those who have knowledge truly fear God.' Khashya increases with understanding, which is the opposite of how regular fear works. The more you know God, the more this reverence grows.",
  hilm: "The ability to stay calm when you have every right to be angry. Hilm is forbearance, restraint, the choice to hold your fire when you could easily let it loose. God is described as al-Halīm — the Forbearing One — and Ibrahim was praised for this quality above almost all others.",
  zuhd: "Letting go of the world — not by hating it, but by understanding it. Zuhd is the recognition that this life is temporary and what's with God is permanent. It means the dunya is in your hand, never in your heart. You can own things without things owning you.",
  taqwa: "The most important quality the Quran asks you to develop. Taqwa is God-consciousness — an awareness that shapes every choice you make. It comes from a root meaning 'to protect, to shield' — you're shielding yourself from God's displeasure by being mindful of Him. The Quran says it in nearly every surah because nearly everything depends on it.",
  yaqin: "Certainty — the point where faith stops being a question and becomes the ground you stand on. The Quran describes three levels: knowledge-certainty, eye-certainty, and truth-certainty. Yaqin is what separates someone who believes from someone who knows.",

  // ── The Unseen ─────────────────────────────────────────────────────────
  barzakh: "The waiting place between death and resurrection. When you die, you enter the barzakh — a barrier realm where the soul exists until the Day of Judgment. The Quran mentions it three times, always as a partition between two realities. What happens there is part of the unseen that shapes how Muslims understand death.",
  jannah: "The garden. The word itself comes from a root meaning 'to cover, to conceal' — a garden so dense with shade and growth that the ground beneath is hidden. The Quran describes it in over a hundred passages: rivers of water, milk, honey, and wine; shade that never shifts; whatever the soul desires. It is the promise that makes everything in this life bearable.",
  'al-ghayb': "Everything beyond the reach of your five senses — God, the angels, the Day of Judgment, the soul, the decree. The Quran opens by praising those who believe in the unseen, because faith begins exactly where certainty of sight ends. Every prayer you make is an act of trust in something you cannot see.",
  mizan: "The scale — God's instrument of perfect justice on the Day of Judgment. Every deed is weighed, and the Quran says the weighing will be true. The mizan appears in multiple surahs, always connected to the idea that nothing is wasted: every act of kindness, every moment of patience, every good word has weight.",
  jahannam: "The Quran's name for Hell — described in vivid, physical terms meant to make the consequence of heedlessness feel real. Fire that crackles and roars, a pit that asks for more, a tree whose fruit is the heads of devils. The Quran uses these images to wake you up, because the one thing worse than fear is arriving unprepared.",
  malaika: "Angels — beings of light created to obey God without hesitation. Jibril delivers revelation. Mikail distributes provision. Israfil will blow the trumpet. Others record your deeds, guard your body, carry the Throne. The Quran describes them with two, three, and four wings, traveling between realms you cannot see.",
  shaytan: "The Quran's name for the enemy you carry with you everywhere. Shaytan was once Iblis — a being who refused to prostrate to Adam out of pride. His strategy is whisper: suggestions so quiet you mistake them for your own thoughts. The Quran says he retreats when you remember God and returns when you forget.",
  qadr: "The Night of Decree — Laylat al-Qadr — when the Quran was first sent down. Better than a thousand months. Angels descend with every matter decreed. It is peace until the dawn. Muslims search for it in the last ten nights of Ramadan, and the search itself is an act of worship.",

  // ── Concepts of Existence ───────────────────────────────────────────────
  nafs: "Your self — and the Quran maps it with precision. The commanding self (nafs al-ammāra) pushes you toward desire. The self-reproaching self (nafs al-lawwāma) catches you afterward. The tranquil self (nafs al-mutma'inna) is at peace with God. The entire spiritual journey is learning which voice to follow.",
  ruh: "The spirit — the divine breath that makes you alive. When God created Adam, He shaped him from clay, then breathed His ruh into him. That breath is what separates a body from a person. The Quran says the ruh is from God's command, and when you ask what it is, the answer is: knowledge of it belongs to God.",
  qadar: "Divine decree — the belief that God has measured and determined all things. Everything that happens was known before it happened. This sounds like fatalism until you understand the Quran's insistence that you still choose, you still act, you still bear responsibility. Qadar is the frame; your choices are the painting.",
  fitrah: "The original state — the nature God built into every human being before culture, parents, and society shaped it. The Prophet ﷺ said every child is born on the fitrah; it's the world that changes them. Fitrah is the reason truth feels familiar when you hear it for the first time. Something in you already knew.",
  rizq: "Everything God provides — money, food, health, children, knowledge, time, the people in your life. Rizq is whatever reaches you because God sent it. The Quran says your rizq is already written; the question is whether you recognize where it came from and what you do with it.",
  ajal: "Your appointed time — the moment your life ends, which only God knows. The Quran says every soul will taste death, and when your ajal comes, it cannot be delayed by an hour or brought forward. This concept reshapes how you spend time: urgently, because the deadline is hidden.",
  dunya: "This world — from a root meaning 'near' and 'low.' The Quran calls it a distraction, a game, a temporary enjoyment. The point is not that the world is evil but that it is brief. Everything you chase here will end. The Quran keeps reminding you so you stop building permanent homes on temporary ground.",
  akhirah: "The afterlife — the life that comes after this one and lasts forever. The Quran mentions it hundreds of times because every choice you make here determines what happens there. The akhirah is the reason ethics matter, patience has a payoff, and injustice is never the final word.",
  khalifah: "God's representative on earth — the role given to Adam and inherited by every human being. You are placed here to tend what God created: the land, the people, the trust. Khalifah comes from a root meaning 'to succeed, to come after.' You are a steward, not an owner.",

  // ── Quranic Characters ─────────────────────────────────────────────────
  maryam: "The most honored woman in the Quran — the only female named by name. She has an entire surah named after her. Her story is one of impossible faith: chosen by God, given a child without a father, told to shake a palm tree while in labor alone in the desert. Maryam's life is proof that God provides in ways that defy every plan.",
  firaun: "Pharaoh — the Quran's supreme example of what happens when a human being claims to be God. He said 'I am your Lord, the most high' and built his entire civilization on that lie. His story appears in over thirty surahs because his failure is every tyrant's failure: power without humility ends in the sea.",
  ibrahim: "The father of monotheism — the man who smashed his people's idols, was thrown into fire for it, and the fire became cool. Ibrahim built the Ka'ba, left his family in an empty desert on God's command, and was asked to sacrifice his son. The Quran calls him a nation unto himself. Every Hajj retraces his steps.",
  musa: "The most mentioned prophet in the Quran — over 130 times. A man who stuttered, who killed someone by mistake, who fled his home, who stood before the most powerful ruler on earth and said 'Let my people go.' Musa's story is the story of someone God sends when the situation seems impossible.",
  isa: "Jesus son of Maryam — a prophet honored in the Quran as the Word of God and a spirit from Him. He spoke from the cradle, healed the blind, raised the dead by God's permission. The Quran affirms his miraculous birth and his mission while clarifying that he was a servant of God, a messenger, a human being chosen.",
  nuh: "The first major messenger — a man who preached to his people for 950 years and was rejected by nearly all of them. His own son refused to board the ark. Nuh's story is the Quran's longest study in what it means to keep calling when no one answers, and to trust God when the flood comes.",
  yusuf: "The most beautiful story in the Quran — the Quran says so itself. A boy betrayed by his brothers, thrown into a well, sold as a slave, falsely accused, imprisoned for years — then raised to the highest position in the land and given the chance to face the very people who destroyed his life. Yusuf's story is the ultimate test of patience and its ultimate reward.",
  adam: "The first human being — created from clay, given God's breath, taught the names of all things, and then placed on earth after a single mistake. Adam's story in the Quran is about the tension built into every person: you carry God's spirit and you carry clay. The fall was real, but so was the forgiveness.",
  dawud: "A king, a prophet, and a worshipper. Dawud was given the Psalms (Zabur), taught to make armor from iron, and had mountains and birds glorify God alongside him. The Quran shows him making a mistake and immediately falling in prostration. His life is proof that power and devotion can coexist — if you stay honest.",
  sulayman: "The son of Dawud — a king who commanded the wind, understood the speech of animals, and ruled over jinn and humans. When given everything, Sulayman said: 'This is from the favor of my Lord, to test me — will I be grateful or ungrateful?' He had more than any person alive and knew exactly where it came from.",
  lut: "The prophet sent to the people of Sodom — a community the Quran describes as committing an indecency unprecedented in human history. Lut warned them and they mocked him. His own wife stayed behind. His story is about holding to truth when everyone around you has normalized what God forbids.",
  ayyub: "The prophet of patience under suffering. Ayyub lost his health, his wealth, and his family — and endured it all. When he finally called out to God, he said: 'Harm has touched me, and You are the most merciful of the merciful.' God answered, restored everything, and the Quran holds him up as the model of endurance.",
  qarun: "The man who had so much wealth that just carrying its keys required a group of strong men. Qarun said: 'I earned this through my own knowledge.' The earth swallowed him. His story is the Quran's sharpest warning about what happens when you mistake God's test for your own accomplishment.",
  hud: "The prophet sent to the people of 'Ad — a civilization of enormous physical power that built monuments on every high place and thought they were untouchable. Hud told them: your strength comes from God, not from yourselves. They laughed. God sent a wind that destroyed everything except the words Hud spoke.",
  salih: "The prophet sent to the people of Thamud — a civilization that carved homes into mountains and felt secure. Salih brought them a miracle: a she-camel from God that they were told to leave in peace. They killed it. Three days later, everything ended. Salih's story is about what happens when you destroy the sign God gave you.",
  shuayb: "The prophet of fair dealing — sent to the people of Madyan who cheated in trade. Shu'ayb told them: give full measure, don't deprive people of their due, and don't spread corruption. They said: does your prayer command you to tell us what to do with our money? His message: your money and your faith are connected.",
  dhul_qarnayn: "A righteous ruler who traveled to the ends of the earth — east and west — and used his power to serve, not to dominate. When a people asked him to build a barrier against Gog and Magog, he did it and credited God. The Quran uses him as the example of what power looks like when it answers to something higher than itself.",
  khidr: "The mysterious servant of God who taught Musa that divine wisdom operates on a timeline humans cannot see. Khidr damaged a boat (to save it from a king), killed a boy (to spare his parents a worse fate), and rebuilt a wall (to protect orphans' treasure). His lesson: when God acts in ways you don't understand, the understanding comes later.",
  luqman: "The wise man — given wisdom by God and known through the advice he gave his son. That advice reads like the best parenting in human history: worship God alone, be grateful to your parents, pray, encourage good, endure hardship, don't be arrogant, lower your voice. Luqman is proof that you don't need to be a prophet to leave wisdom that outlasts you.",

  // ── Nations & Peoples ───────────────────────────────────────────────────
  'ad': "The people of 'Ad — an ancient Arabian civilization of enormous strength and elaborate architecture. The Quran says God gave them what He had given no one else. They built monuments on every hill and thought they were eternal. When they rejected their prophet Hud, God destroyed them with a wind — seven nights and eight days — until nothing remained.",
  thamud: "The people of Thamud — the civilization that carved grand homes into mountain rock. They could shape stone but could not shape their hearts. When Salih brought them a miraculous she-camel as a sign, they hamstrung it. The destruction came three days later. The Quran mentions them repeatedly as the people who had everything solid except their faith.",
  quraysh: "The tribe of the Prophet Muhammad ﷺ — the guardians of the Ka'ba and the most powerful tribe in Arabia. The Quran addresses them in Surah Quraysh: God gave you safe trade routes, fed you when you were hungry, and protected you when you were afraid. Worship the Lord of this House. Their entire privilege came with one obligation: gratitude.",
  'bani-israil': "The Children of Israel — the community that received more prophets, more miracles, and more direct divine intervention than any other people in the Quran. Musa parted the sea for them, manna and quails fell from the sky, God spoke to their prophet directly. The Quran tells their story repeatedly — as both honor and warning — because receiving guidance and following it are two different things.",
  'ashab-al-kahf': "The Sleepers of the Cave — young men who believed in God when their entire society worshipped idols. They fled to a cave, God put them to sleep for 309 years, and they woke to a world that had changed around them. Their story, told in Surah Al-Kahf, is about faith that survives when you can't change your environment — so you leave it.",
  'ashab-al-ukhdud': "The People of the Trench — believers thrown into a burning ditch by a tyrant for refusing to abandon their faith. The Quran tells their story in Surah Al-Buruj and focuses on the people who sat and watched. Their story asks: what is faith worth to you? And answers: everything.",
  'ashab-al-fil': "The Army of the Elephant — Abrahah's Ethiopian army that marched on Makkah with elephants to destroy the Ka'ba. God sent birds carrying stones of baked clay and turned them into eaten straw. The event happened the year the Prophet ﷺ was born. The Quran recounts it as proof: when God defends something, no army can touch it.",
  munafiqun: "The hypocrites of Madinah — people who said 'we believe' with their mouths while their hearts held nothing. The Quran dedicates an entire surah to them and mentions them in dozens more. They are described as the lowest people in Hell — lower than open disbelievers — because they carried the form of faith without its substance.",
  'ashab-al-sabt': "The People of the Sabbath — a Jewish community tested by God with fish that would appear on Saturday (when fishing was forbidden) and vanish on other days. Some of them cheated, devising tricks to catch the fish without technically breaking the rule. God transformed them into apes and pigs. The lesson: loopholes don't fool God.",
  jinn: "Beings created from smokeless fire — a parallel creation to humans, with free will, accountability, and communities of their own. Some jinn are Muslim, some are not. The Quran dedicates an entire surah to them (Surah Al-Jinn), where a group overhears the Quran and believes. They are part of the unseen world that the Quran asks you to accept on faith.",

  // ── Study Terms ─────────────────────────────────────────────────────────
  tafsir: "The science of explaining the Quran — what each ayah means, why it was revealed, and how scholars across fourteen centuries have understood it. Tafsir pulls from Arabic grammar, hadith, historical context, and the Quran itself (since the best explanation of the Quran is the Quran). If tadabbur is personal reflection, tafsir is the scholarly foundation underneath it.",
  tadabbur: "The Quran's own word for how it wants to be read. Tadabbur means to look at the back of something — to go beyond the surface and find what lies behind the words. The Quran asks: 'Do they not reflect on the Quran, or are there locks upon their hearts?' It is an invitation to think deeply, not to skim.",
  nazm: "The arrangement — the study of how the Quran's surahs, ayahs, and phrases connect to each other in deliberate patterns. Why does this ayah follow that one? Why does this surah come after the previous one? Nazm reveals that the Quran's structure carries meaning — the order is part of the message.",
  ijaz: "The Quran's miraculous inimitability — the claim that no human being can produce anything like it. The Quran itself issues the challenge: bring one surah like it. In fourteen centuries, no one has. I'jaz operates on multiple levels: linguistic, structural, legislative, and prophetic. It is the reason the Quran is considered its own proof.",
  'asbab-al-nuzul': "The occasions of revelation — the historical events, questions, and situations that prompted specific Quranic verses to be revealed. Knowing why an ayah was sent down helps you understand what it means and how it applies. Without asbab al-nuzul, you might read a verse and miss the human story behind it.",
  qiraat: "The variant readings of the Quran — authorized oral traditions that preserve slight differences in pronunciation, voweling, and occasionally wording, all traced back to the Prophet ﷺ through unbroken chains. There are ten canonical readings, each equally valid. Qira'at are proof that the Quran was transmitted as a living, spoken tradition.",
  tajwid: "The rules of Quranic recitation — how to pronounce each letter, where to pause, when to elongate, how sounds merge. Tajwid literally means 'to make beautiful.' It exists because the Quran was revealed to be heard, and every sound carries meaning. Learning tajwid changes how the Quran feels in your mouth and in your ears.",
  usul_al_fiqh: "The principles of Islamic jurisprudence — the methodology scholars use to derive rulings from the Quran, the Sunnah, consensus, and analogy. If fiqh tells you what to do, usul al-fiqh tells you how scholars figured that out. Understanding it helps you see why scholars can disagree while all drawing from the same sources.",
  ilm_al_hadith: "The science of hadith — the methodology for evaluating whether a statement attributed to the Prophet ﷺ is authentic, weak, or fabricated. Scholars developed an entire discipline for tracing chains of transmission, assessing narrator reliability, and detecting contradiction. It is the reason Muslims can distinguish between what the Prophet actually said and what was later attributed to him.",

  // ── Theology & Ethics ──────────────────────────────────────────────────
  tawhid: "God is one. That is the entire foundation. Tawhid is the affirmation that there is no god but God — in His essence, His names, and His right to be worshipped. Every other teaching in Islam rests on this. When you say la ilaha illa Allah, you are making the most consequential statement a human being can make.",
  shirk: "The one sin the Quran says God will never forgive if you die on it: associating partners with God. Shirk means giving something or someone a share of what belongs to God alone — worship, ultimate loyalty, the belief that anything other than God controls your fate. The Quran treats it as the greatest injustice because it misplaces the most important truth.",
  iman: "Faith — but the Quran treats it as something alive, something that increases and decreases. Iman comes from a root meaning 'to feel safe, to trust.' A person of iman is someone who has placed their security in God. The Prophet ﷺ said iman has over seventy branches, the highest being la ilaha illa Allah, the lowest being removing harm from the road.",
  islam: "Submission to God — the conscious decision to align your will with His. Islam comes from the same root as salam (peace), because peace comes when you stop fighting what God asks of you. The word describes both the religion and the act: every prophet submitted, every angel submits, and the Quran says everything in creation already does.",
  ihsan: "The highest level — worshipping God as if you see Him, and knowing that even if you don't see Him, He sees you. Ihsan is excellence in everything: prayer, character, work, relationships. It is the state where faith moves from obligation to love, from duty to beauty. The Prophet ﷺ described it as the peak of the religion.",
  'amanah': "The trust — the responsibility God offered to the heavens, the earth, and the mountains, and they all refused. Humans accepted it. The Quran calls us foolish for taking it on — but taking it on is what makes us human. Amanah is the weight of free will: you chose to be tested, and now you carry what creation was afraid to hold.",
  'adl': "Justice — and the Quran commands it even when it's hard, even against yourself, even against your own family. 'Adl means giving everyone exactly what they're owed, without favoritism and without fear. The Quran says: be just — it is closer to taqwa. Justice is where ethics and God-consciousness meet.",
  birr: "Righteousness — the comprehensive word for everything good the Quran asks of you. Surah Al-Baqarah defines it: believing in God, the last day, the angels, the scriptures, the prophets — and giving your wealth to relatives, orphans, the needy, travelers, and those in bondage. Birr is faith that shows up in your hands.",
  fasad: "Corruption — the opposite of everything the earth was created for. The Quran says: do not spread corruption on the earth after it has been set right. Fasad appears in dozens of contexts: ecological destruction, political tyranny, moral decay, financial cheating. It is what happens when humans stop honoring the trust they were given.",
  dawah: "The invitation — calling people to God. The Quran says it is the most beautiful thing a person can say: 'Who is better in speech than the one who calls to God, does good, and says I am among the Muslims?' Da'wah is sharing what you believe with wisdom and gentle words. It is not coercion; it is opening a door.",
  jihad: "Struggle — the effort expended in the path of God. The word covers the inner battle against your own desires, the social struggle to establish justice, the financial sacrifice of spending in God's cause, and in specific circumstances, the defense of your community. The greatest jihad, the Prophet ﷺ said, is the struggle against your own nafs.",
  shura: "Consultation — the Quran praises believers whose affairs are conducted through mutual consultation. Shura means no one person's opinion overrides the group's wisdom. God commanded even the Prophet ﷺ to consult his companions. The principle: decisions that affect everyone should involve everyone.",
  haya: "Modesty — and the Prophet ﷺ said it is a branch of faith. Haya' is the inner sense that keeps you from doing something shameful, even when no one is watching. It operates between you and God, between you and people, and between you and yourself. It is the quality that makes a person careful with their dignity and the dignity of others.",
  taqdir: "The divine measurement — God's pre-determination of all things. Taqdir means everything has been measured: your lifespan, your provision, your tests. Believing in it brings peace because you stop fighting what already happened and start focusing on how you respond. Taqdir gives you one job: choose your response wisely.",
  dhikr: "Remembrance of God — the practice the Quran says makes hearts calm. Dhikr is saying God's name, reciting Quran, making du'a, or simply being conscious of God in the middle of your day. The Quran says: remember Me, and I will remember you. That transaction — your small remembrance for His vast attention — is the best deal you will ever get.",
  istighfar: "Asking God for forgiveness — and the Prophet ﷺ did it over seventy times a day. Istighfar comes from a root meaning 'to cover, to protect.' When you ask God to forgive you, you're asking Him to cover your mistake and protect you from its consequences. It is the most accessible worship: you need no place, no time, no preparation. Just the words and the heart behind them.",
  niyyah: "Intention — the starting point of every action in Islam. The Prophet ﷺ said all actions are judged by intentions. Niyyah means the same physical act can be worship or waste depending on why you did it. Eating to have energy for prayer is different from eating out of boredom. Niyyah is what transforms the ordinary into the sacred.",
  wasatiyyah: "The middle way — the Quran calls Muslims 'a moderate community, witnesses over humanity.' Wasatiyyah means balance: between worship and worldly life, between fear and hope, between individual rights and communal responsibility. The Quran's ethics consistently reject extremes in either direction.",
  hikmah: "Wisdom — the ability to put the right thing in the right place at the right time. The Quran says God gives wisdom to whom He wills, and whoever is given wisdom has been given immense good. Hikmah is what separates someone who knows the truth from someone who knows how to share it without breaking anything.",
  rushd: "Right guidance — spiritual maturity and sound judgment. The Quran uses it when describing the moment a young person is ready for responsibility, and when describing the straight path itself. Rushd is the opposite of ghayy (error, deviation). It is what you're asking for when you say 'guide us to the straight path' seventeen times a day.",
}

async function main() {
  let content = fs.readFileSync(GLOSSARY_PATH, 'utf-8')
  let replaced = 0
  let failed = 0

  for (const [slug, newSummary] of Object.entries(REWRITES)) {
    // Find the summary field for this entry
    // Pattern: the summary comes after the slug's entry key and is a string value for the `summary:` field
    // We need to match the old summary and replace it

    // Escape the new summary for use in the file (single quotes, backslashes)
    const escapedNew = newSummary.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

    // Find pattern: summary: '...' or summary: "..." (could be multi-line with template literals)
    // The entries use single quotes for summary values
    // Strategy: find `summary: '` after the slug, capture everything until the closing `',`

    // More robust: find the exact old summary text and replace it
    // First get the old summary from the module
    const { GLOSSARY_ENTRIES } = await import('../src/data/glossary')
    const entry = GLOSSARY_ENTRIES[slug]
    if (!entry) {
      console.error(`✗ ${slug}: entry not found`)
      failed++
      continue
    }

    const oldSummary = entry.summary
    if (!oldSummary) {
      console.error(`✗ ${slug}: no summary`)
      failed++
      continue
    }

    // Escape old summary for string matching
    const escapedOld = oldSummary.replace(/\\/g, '\\\\').replace(/'/g, "\\'")

    if (content.includes(escapedOld)) {
      content = content.replace(escapedOld, escapedNew)
      console.log(`✓ ${slug}`)
      replaced++
    } else {
      // Try with the raw text (in case of encoding differences)
      if (content.includes(oldSummary)) {
        content = content.replace(oldSummary, newSummary)
        console.log(`✓ ${slug} (raw match)`)
        replaced++
      } else {
        console.error(`✗ ${slug}: summary not found in file`)
        failed++
      }
    }
  }

  fs.writeFileSync(GLOSSARY_PATH, content, 'utf-8')
  console.log(`\n${replaced} replaced, ${failed} failed`)
}

main()
