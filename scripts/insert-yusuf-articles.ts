import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e';
const YUSUF_ID    = 'ce7c797b-ae5f-4a6d-8d2d-5a54b43ae5e4';
const SABR_ID     = 'c80b11d3-0403-4f3f-b9ca-a6e459a67b49';
const TAWAKKUL_ID = '547e36b8-aa55-4c03-a139-cd94f1df456a';
const TAWBAH_ID   = 'f4f69408-d31f-44d7-8ff1-ed3682ea6692';

const articles = [
  // ── Article 1 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Well: What Allah Revealed to Yusuf at the Bottom",
      slug: "the-well-what-allah-revealed-to-yusuf-at-the-bottom",
      type: 'article',
      excerpt: "When Yusuf's brothers threw him into the pit, God sent a revelation. Not rescue — a promise. You will inform them of this deed of theirs, while they do not perceive. The revelation inside the well is one of the strangest moments in the Quran.",
      reading_time_minutes: 11,
      status: 'published',
      tags: ['yusuf', 'quranic-characters', 'sabr', 'tawakkul'],
      seo_description: "When Yusuf was thrown in the well by his brothers, Allah sent him a revelation — not rescue, but a promise of future reversal. An exploration of 12:15 and divine speech at the moment of betrayal.",
      content_html: `<article class="prose-blog">

  <p>The brothers have agreed. They will throw Yusuf into the well. The youngest is not there — it is the older brothers, the ones who resented their father's particular love, who have decided this. The Quran doesn't narrate how they convinced their father to let Yusuf travel with them, or how Yusuf felt on the journey. It compresses the decision into a half-verse and then records what happened at the bottom of the pit.</p>

  <blockquote class="ayah-quote" data-ayah="12:15">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:15 -->فَلَمَّا ذَهَبُوا۟ بِهِۦ وَأَجْمَعُوٓا۟ أَن يَجْعَلُوهُ فِى غَيَـٰبَتِ ٱلْجُبِّ ۚ وَأَوْحَيْنَآ إِلَيْهِ لَتُنَبِّئَنَّهُم بِأَمْرِهِمْ هَـٰذَا وَهُمْ لَا يَشْعُرُونَ</p>
    <p class="translation">"So when they took him away and agreed to put him at the bottom of the well, We revealed to him: 'You will surely inform them of this deed of theirs while they do not perceive [who you are].'"</p>
    <cite>Surah Yusuf (12:15)</cite>
  </blockquote>

  <h2>The Structure of the Verse</h2>

  <p>The verse has two halves. The first half belongs to the brothers: they took him, they agreed, they put him in the darkness of the well. <em>Ghāyabat al-jubb</em> — the bottom of the pit, the hidden dark place, the invisible interior. The word <em>ghāyaba</em> suggests hiddenness, disappearance. He is placed where no one can see him.</p>

  <p>The second half belongs to God: <em>wa awḥaynā ilayhi</em> — and We revealed to him. At the bottom of the pit, in the moment of maximum helplessness, God speaks to Yusuf.</p>

  <p>The content of the revelation is not: I will save you. It is not: do not be afraid. It is: <em>latunabbiyannahum bi-amrihim hādhā wa hum lā yash'urūn</em> — you will surely inform them of this deed of theirs, while they do not perceive. A future-tense promise. You will tell them what they did. And when you do, they will not know it is you.</p>

  <h2>What the Revelation Does</h2>

  <p>The revelation gives Yusuf two things at once. First, it tells him he will survive this — you cannot inform your brothers of their deed if you are dead in the pit. The promise of the future conversation is an implicit promise of life, of deliverance, of a position of power from which the confrontation becomes possible. Yusuf, at the bottom of the pit, is being told: you will see them again, and you will be in a position to speak.</p>

  <p>Second, it gives him the end of the story. Not the route — not: here is how you will get out, here is who will buy you, here is the palace and the prison and the years of waiting. Just the destination: you will face them, and they will not recognize you. The Quran offers Yusuf a view from the other end of his suffering before the suffering has begun.</p>

  <p>This is characteristic of how the Quran frames prophetic trials. The foreknowledge is given at the start. Ibrahim is shown in a dream that he will sacrifice his son before the command comes formally. Musa's mother is told her son will be returned to her before she releases him into the river. The promise precedes the ordeal. The ordeal does not come as abandonment — it comes as a test within a known arc.</p>

  <h2>Wa Hum Lā Yash'urūn</h2>

  <p>The closing phrase — <em>wa hum lā yash'urūn</em>, while they do not perceive — points toward the reunion scene that won't occur for many years. When Yusuf finally faces his brothers in Egypt, as governor, they don't recognize him. He is older, robed in authority, speaking through a translator. The brothers who threw him in the pit stand before the one they threw.</p>

  <p>The revelation in the well names this moment before it happens. It tells Yusuf what the scene will look like from his side: he will know who they are; they will not know who he is. The asymmetry of recognition is revealed to him at the moment of maximum asymmetry in the other direction — he is a child in a pit; they are adults who just disposed of him. The future will reverse the terms entirely.</p>

  <h2>Tafsir of a Revelation in the Dark</h2>

  <p>What does it mean to receive revelation at the bottom of a well? The Quran doesn't describe Yusuf's inner state. It doesn't tell us if he was frightened or weeping or numb. It records what God said to him and moves on. But the placement of the revelation — not before the betrayal, not after the rescue, but at the nadir — suggests something about when divine speech arrives.</p>

  <p>It arrives when there is nowhere lower to go. The brothers have done what they agreed to do. Yusuf is in the pit. The situation is as bad as it gets at this point in the story. And in that darkness, the revelation comes — not to explain, not to comfort with platitudes, but to orient. To give him the direction of travel, even if the road is not visible yet. You will come out of this. You will see them. They will not know it is you.</p>

  <p>The Quran says this is <em>waḥy</em> — revelation, the same word used for prophetic revelation. Whether Yusuf was already a prophet at this point or whether this is a different form of divine communication is a matter of scholarly discussion. What the Quran records without ambiguity is that God spoke to him there, in the pit, and told him something true about his future.</p>

</article>`
    },
    primaryEntityId: YUSUF_ID,
    secondaryEntityIds: [SABR_ID, TAWAKKUL_ID],
  },

  // ── Article 2 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "The Women of Egypt: What the Quran Preserves of the Trial",
      slug: "the-women-of-egypt-what-the-quran-preserves-of-the-trial",
      type: 'article',
      excerpt: "Surah Yusuf preserves the temptation scene in forensic detail — the attempt, the shirt torn from behind, the women of the city who gossip, the banquet where they cut their own hands. The Quran gives the trial multiple witnesses. None of them are there to flatter Yusuf.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['yusuf', 'quranic-characters', 'sabr', 'tawakkul'],
      seo_description: "Surah Yusuf narrates the temptation scene in detail: the attempt, the torn shirt, the women cutting their hands. An exploration of 12:23-31 and what the Quran preserves of Yusuf's trial in the palace.",
      content_html: `<article class="prose-blog">

  <p>The Quran is not squeamish about what happened in the palace. Surah Yusuf gives the temptation scene more space than almost any other single incident in the surah — more than the pit, more than the prison, almost as much as the reunion at the end. The reason is not prurience. It is because the scene is a crucible, and the Quran wants its full weight on record.</p>

  <h2>The Attempt</h2>

  <blockquote class="ayah-quote" data-ayah="12:23">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:23 -->وَرَٰوَدَتْهُ ٱلَّتِى هُوَ فِى بَيْتِهَا عَن نَّفْسِهِۦ وَغَلَّقَتِ ٱلْأَبْوَٰبَ وَقَالَتْ هَيْتَ لَكَ ۚ قَالَ مَعَاذَ ٱللَّهِ ۖ إِنَّهُۥ رَبِّىٓ أَحْسَنَ مَثْوَاىَ ۖ إِنَّهُۥ لَا يُفْلِحُ ٱلظَّـٰلِمُونَ</p>
    <p class="translation">"And she in whose house he was sought to seduce him. She locked the doors and said: 'Come to me.' He said: 'I seek refuge in Allah. Indeed, it is my master who has made good my residence. Indeed, wrongdoers will not succeed.'"</p>
    <cite>Surah Yusuf (12:23)</cite>
  </blockquote>

  <p>The Quran doesn't name the woman — she is described by her relationship to the situation: <em>allatī huwa fī baytihā</em>, the one in whose house he was. She is defined by the space she controls, and in this scene she uses that control. She locked the doors — <em>ghallaqat al-abwāb</em>. The plural and the intensified form of the verb suggest multiple doors, locked one by one. She removed all exits.</p>

  <p>Yusuf's response is layered. First: <em>ma'ādhallāh</em> — I seek refuge in Allah. A declaration before an argument. Then the argument: my master — the Aziz, her husband — has been good to me. <em>Innahu rabbī aḥsana mathwāya</em> — he is my master who made good my dwelling. And then the theological principle: wrongdoers will not succeed.</p>

  <p>He refuses on three grounds simultaneously: divine refuge, human loyalty, and moral reasoning. The refusal is not panicked. It is structured.</p>

  <h2>The Verse the Quran Does Not Explain</h2>

  <blockquote class="ayah-quote" data-ayah="12:24">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:24 -->وَلَقَدْ هَمَّتْ بِهِۦ ۖ وَهَمَّ بِهَا لَوْلَآ أَن رَّءَا بُرْهَـٰنَ رَبِّهِۦ ۚ كَذَٰلِكَ لِنَصْرِفَ عَنْهُ ٱلسُّوٓءَ وَٱلْفَحْشَآءَ ۚ إِنَّهُۥ مِنْ عِبَادِنَا ٱلْمُخْلَصِينَ</p>
    <p class="translation">"And she certainly desired him, and he would have desired her, had he not seen the proof of his Lord. Thus did We avert from him evil and immorality. Indeed, he was of Our sincere servants."</p>
    <cite>Surah Yusuf (12:24)</cite>
  </blockquote>

  <p>This verse is one of the most discussed in Quranic exegesis. The Quran says she desired him — <em>hammat bihi</em>. And then: <em>wa hamma bihā lawlā an ra'ā burhāna rabbih</em> — and he would have desired her, had he not seen the proof of his Lord. The conditional construction is crucial. The <em>lawlā</em> — had it not been for — establishes that the inclination was there, but was interrupted by the sight of divine evidence.</p>

  <p>The Quran does not tell us what the <em>burhān</em> was — what proof, what sign Yusuf saw. Classical scholars offered many possibilities. The Quran leaves it unnamed. What it preserves is the structure: human desire and divine intervention, both real, both in the same verse. The trial was not a trial because it was easy. It was a trial because it wasn't.</p>

  <h2>The Shirt and the Witness</h2>

  <blockquote class="ayah-quote" data-ayah="12:25">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:25 -->وَٱسْتَبَقَا ٱلْبَابَ وَقَدَّتْ قَمِيصَهُۥ مِن دُبُرٍ وَأَلْفَيَا سَيِّدَهَا لَدَا ٱلْبَابِ ۚ قَالَتْ مَا جَزَآءُ مَنْ أَرَادَ بِأَهْلِكَ سُوٓءًا إِلَّآ أَن يُسْجَنَ أَوْ عَذَابٌ أَلِيمٌ</p>
    <p class="translation">"And they both raced to the door, and she tore his shirt from the back, and they found her husband at the door. She said: 'What is the recompense of one who intended evil toward your wife except that he be imprisoned or a painful punishment?'"</p>
    <cite>Surah Yusuf (12:25)</cite>
  </blockquote>

  <p>They both ran for the door — Yusuf to escape, she to prevent him. She tore his shirt from behind. The shirt will become evidence. The husband is at the door. And before Yusuf can say a word, she speaks: what is the punishment for one who intended evil toward your family except prison or painful punishment?</p>

  <p>The accusation is immediate and preemptive. She names Yusuf as the aggressor while holding the evidence of her own aggression. The shirt — torn from behind — is the detail that undoes her account. A man attacking would leave a shirt torn from the front. A man fleeing would leave a shirt torn from the back. A witness from her own family will make this argument.</p>

  <h2>The Banquet</h2>

  <blockquote class="ayah-quote" data-ayah="12:30">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:30 -->۞ وَقَالَ نِسْوَةٌ فِى ٱلْمَدِينَةِ ٱمْرَأَتُ ٱلْعَزِيزِ تُرَٰوِدُ فَتَىٰهَا عَن نَّفْسِهِۦ ۖ قَدْ شَغَفَهَا حُبًّا ۖ إِنَّا لَنَرَىٰهَا فِى ضَلَـٰلٍ مُّبِينٍ</p>
    <p class="translation">"And women in the city said: 'The wife of the Aziz is seeking to seduce her slave boy. He has impassioned her with love. Indeed, we see her in clear error.'"</p>
    <cite>Surah Yusuf (12:30)</cite>
  </blockquote>

  <blockquote class="ayah-quote" data-ayah="12:31">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:31 -->فَلَمَّا سَمِعَتْ بِمَكْرِهِنَّ أَرْسَلَتْ إِلَيْهِنَّ وَأَعْتَدَتْ لَهُنَّ مُتَّكَـًٔا وَءَاتَتْ كُلَّ وَٰحِدَةٍ مِّنْهُنَّ سِكِّينًا وَقَالَتِ ٱخْرُجْ عَلَيْهِنَّ ۖ فَلَمَّا رَأَيْنَهُۥٓ أَكْبَرْنَهُۥ وَقَطَّعْنَ أَيْدِيَهُنَّ وَقُلْنَ حَـٰشَ لِلَّهِ مَا هَـٰذَا بَشَرًا إِنْ هَـٰذَآ إِلَّا مَلَكٌ كَرِيمٌ</p>
    <p class="translation">"So when she heard of their scheming, she sent for them and prepared for them a banquet and gave each one of them a knife and said: 'Come out before them.' And when they saw him, they were greatly awed by him and cut their hands and said: 'Perfect is Allah! This is not a human being; this is none but a noble angel.'"</p>
    <cite>Surah Yusuf (12:31)</cite>
  </blockquote>

  <p>When the women of the city gossip — calling her deluded, her love an error — she orchestrates a demonstration. She invites them to a banquet, gives each a knife to peel fruit, and has Yusuf appear. When they see him, they are so overwhelmed that they cut their own hands without noticing. <em>Qattha'na aydiyahunna</em> — they cut their hands. The verb is plural and intensified: multiple cuts, multiple women, all simultaneously undone by the sight of him.</p>

  <p>Their pronouncement — <em>mā hādhā basharā in hādhā illā malakun karīm</em> — this is not a human being, this is a noble angel — is not flattery. It is the involuntary testimony of witnesses who came to judge and instead became evidence. The women who arrived to mock the wife of the Aziz for her obsession have now confirmed the basis of it.</p>

  <h2>What the Quran Preserves</h2>

  <p>The Quran preserves the trial from multiple angles: the locked room, the running for the door, the torn shirt, the accusation, the gossip, the banquet, the hands. Each scene adds testimony. By the end, there is no character in the palace who is a disinterested witness — everyone is implicated in what they've seen or done. The trial of Yusuf in the palace is preserved not as the story of a man's virtue in isolation, but as the story of a man's virtue tested before multiple witnesses, none of whom expected to see what they saw.</p>

</article>`
    },
    primaryEntityId: YUSUF_ID,
    secondaryEntityIds: [SABR_ID, TAWAKKUL_ID],
  },

  // ── Article 3 ──────────────────────────────────────────────────────────────
  {
    post: {
      title: "La Tathrib: The Forgiveness That Didn't Ask for an Apology",
      slug: "la-tathrib-the-forgiveness-that-didnt-ask-for-an-apology",
      type: 'article',
      excerpt: "When Yusuf's brothers stood before him in Egypt, exposed, he said: 'No blame upon you today.' He didn't ask for an apology. He didn't catalog what they had done. He moved straight to forgiveness — and then gave them his shirt.",
      reading_time_minutes: 10,
      status: 'published',
      tags: ['yusuf', 'quranic-characters', 'tawbah', 'sabr'],
      seo_description: "Yusuf's forgiveness of his brothers in 12:92 — 'La tathrib alaykum al-yawm' — contains no demand for an apology. An exploration of the Quranic model of forgiveness that precedes contrition.",
      content_html: `<article class="prose-blog">

  <p>The brothers are exposed. Yusuf has orchestrated the moment — the long delay, the tests, the accusation of theft against Binyamin — and now the room knows who he is. He could not hold back any longer and wept aloud, and then he told them: I am Yusuf. The same Yusuf.</p>

  <p>The Quran preserves his first words after the revelation not as an accusation or a reckoning, but as something much stranger.</p>

  <blockquote class="ayah-quote" data-ayah="12:92">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:92 -->قَالَ لَا تَثْرِيبَ عَلَيْكُمُ ٱلْيَوْمَ ۖ يَغْفِرُ ٱللَّهُ لَكُمْ ۖ وَهُوَ أَرْحَمُ ٱلرَّٰحِمِينَ</p>
    <p class="translation">"He said: 'No blame upon you today. May Allah forgive you, and He is the most merciful of the merciful.'"</p>
    <cite>Surah Yusuf (12:92)</cite>
  </blockquote>

  <h2>La Tathrib</h2>

  <p><em>Lā tathrība 'alaykum al-yawm</em> — no blame upon you today. The word <em>tathrīb</em> is from a root meaning to rebuke, to reproach, to bring up past wrongs in accusation. It is the word for the kind of forgiveness that comes with a reminder of what was forgiven. Yusuf is saying: I will not do that. No tathrīb. No catalog. No you threw me in a pit, you sold me, you told our father I was dead.</p>

  <p>He says this before they have apologized. The Quran does not record the brothers offering a formal apology at this moment — they had acknowledged wrongdoing earlier, in the presence of Yusuf who had not yet revealed himself (12:91: we have indeed been sinners). But at the moment of revelation, Yusuf doesn't wait for them to repeat it. He moves to forgiveness first.</p>

  <p>The structure of the verse is two clauses. First: no blame from me upon you. Second: may Allah forgive you. He releases his own claim and then refers them to the only forgiveness that finally matters. He is clearing his side of the ledger and directing them to God's.</p>

  <h2>The Shirt Again</h2>

  <blockquote class="ayah-quote" data-ayah="12:93">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:93 -->ٱذْهَبُوا۟ بِقَمِيصِى هَـٰذَا فَأَلْقُوهُ عَلَىٰ وَجْهِ أَبِى يَأْتِ بَصِيرًا وَأْتُونِى بِأَهْلِكُمْ أَجْمَعِينَ</p>
    <p class="translation">"Take this, my shirt, and cast it over the face of my father; he will become sighted. And bring me your family, all of them."</p>
    <cite>Surah Yusuf (12:93)</cite>
  </blockquote>

  <p>Immediately after the forgiveness, Yusuf gives them his shirt. <em>Iqmīṣī hādhā</em> — this shirt of mine. Take it to our father, cast it over his face, and his sight will be restored.</p>

  <p>The shirt has appeared before in this surah. A shirt was the evidence that exonerated Yusuf in the palace — torn from behind, not from the front. A shirt was brought to Ya'qub stained with false blood, as proof that Yusuf had died. The shirt was the instrument of the lie. Now a shirt is the instrument of healing.</p>

  <p>Yusuf knows his father's eyes have dimmed from grief — from years of weeping for him. He is sending back the proof of life by the same hands that carried the false proof of death. The brothers who brought the bloody shirt to their father will now bring the living shirt to restore him. The reversal is complete and deliberate.</p>

  <h2>What Ya'qub Knew</h2>

  <blockquote class="ayah-quote" data-ayah="12:96">
    <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);"><!-- ayah:12:96 -->فَلَمَّآ أَن جَآءَ ٱلْبَشِيرُ أَلْقَىٰهُ عَلَىٰ وَجْهِهِۦ فَٱرْتَدَّ بَصِيرًا ۖ قَالَ أَلَمْ أَقُل لَّكُمْ إِنِّىٓ أَعْلَمُ مِنَ ٱللَّهِ مَا لَا تَعْلَمُونَ</p>
    <p class="translation">"And when the bearer of good tidings arrived, he cast it over his face, and he returned sighted. He said: 'Did I not tell you that I know from Allah what you do not know?'"</p>
    <cite>Surah Yusuf (12:96)</cite>
  </blockquote>

  <p>The messenger casts the shirt over Ya'qub's face and his sight returns. And Ya'qub says: did I not tell you that I know from Allah what you do not know?</p>

  <p>Throughout the long years, Ya'qub had maintained that Yusuf was alive. His sons thought his grief had deluded him. He said: I know from Allah what you do not know. Now the shirt arrives, sight returns, and the old man's confidence is vindicated.</p>

  <p>The Quran places Ya'qub's words at this moment — not as a rebuke, but as a quiet affirmation. He wasn't deluded. He knew something. The word for what he knew is <em>min Allāh</em> — from Allah. It wasn't inference or hope or a father's refusal to accept the loss. It was knowledge from a source.</p>

  <h2>The Model of Yusuf's Forgiveness</h2>

  <p>What Yusuf does in 12:92 is frequently cited in Islamic tradition as a model of forgiveness. The specific quality is the absence of tathrīb — the absence of the reminder. He does not give them the experience of being forgiven in a way that costs them dignity. He releases the claim, points them to God's forgiveness, and immediately moves on to practical action: take my shirt, bring my family.</p>

  <p>The Quran does not tell us what Yusuf felt in that moment. Whether the forgiveness was easy or difficult, whether there was grief alongside the generosity. It records what he said and what he did. The absence of tathrīb. The shirt sent back. The family invited.</p>

  <p>In the pit at the beginning, God told Yusuf he would inform his brothers of their deed while they did not recognize him. At the reunion, he did exactly that: I am Yusuf, and then no blame upon you. He told them. And then he let it go.</p>

</article>`
    },
    primaryEntityId: YUSUF_ID,
    secondaryEntityIds: [TAWBAH_ID, SABR_ID],
  },
];

async function main() {
  console.log('Inserting Yusuf articles...');

  for (const { post, primaryEntityId, secondaryEntityIds } of articles) {
    const { data: inserted, error } = await supabase
      .from('posts')
      .insert({ ...post, created_by: ADMIN_USER_ID, featured: false, published_at: new Date().toISOString() })
      .select('id, title')
      .single();

    if (error) {
      console.error(`✗ "${post.title}":`, error.message);
      continue;
    }

    await supabase.from('entity_tags').insert({
      post_id: inserted.id,
      entity_id: primaryEntityId,
      is_primary: true,
    });

    for (const entityId of secondaryEntityIds) {
      await supabase.from('entity_tags').insert({
        post_id: inserted.id,
        entity_id: entityId,
        is_primary: false,
      });
    }

    console.log(`✓ "${inserted.title}"`);
  }

  await supabase.rpc('refresh_entity_co_occurrence');

  console.log('\n✓ Done! 3 articles inserted.');
}

main().catch(console.error);
