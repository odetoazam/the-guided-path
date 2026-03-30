/**
 * Add ring/chiastic data for Surahs 3, 4, 5, 6
 * Based on scholarly consensus (Farrin, Robinson, Mir) — not yet covered by Heavenly Order
 *
 * Run: node_modules/.bin/jiti scripts/update-3-4-5-6-ring.ts
 */
import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'
dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ── Surah 3: Al-Imran ────────────────────────────────────────────────────
const S3_RING = {
  title: 'The Ring',
  subtitle: 'A surah that begins with divine sovereignty and ends with it — everything between is the test of holding firm',
  pairs: [
    {
      left: {
        label: 'The Living, The Sustainer',
        ayahs: '1–32',
        desc: 'Allah — no god but Him, Al-Hayy Al-Qayyum. This Book confirms what came before it. Then: the parable of Isa\'s creation, the admonition of those who twist revelation. The surah opens by establishing what is unmovable.',
      },
      right: {
        label: 'Hold to Allah Alone',
        ayahs: '189–200',
        desc: 'To Allah belongs the kingdom of the heavens and earth. Those with understanding remember Him standing, sitting, lying down. The surah closes where it opened: in the same sovereignty, the same call to hold firm, the same promise.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'Maryam, Isa, and the People of the Book',
        ayahs: '33–120',
        desc: 'Maryam chosen above the women of the worlds. Isa\'s birth, his signs, the disciples. Then the long negotiation with Christians and Jews — "Come to a word equal between us." The covenant people confronted with the one they distort.',
      },
      right: {
        label: 'Uhud and Its Lessons',
        ayahs: '121–188',
        desc: 'From Badr\'s victory to Uhud\'s test — and why the test was necessary. The surah\'s longest section is the anatomy of a defeat that was not a defeat. Why do you weaken? Those before you also suffered. Patience is the answer to both the story and the question.',
      },
      color: '#4ecdc4',
    },
    {
      left: {
        label: 'Ibrahim — Not Jew, Not Christian',
        ayahs: '65–68',
        desc: 'The Torah and Gospel were revealed after Ibrahim — so how can he belong to either community? The closest people to Ibrahim are those who follow him. The deepest argument: claim the ancestor by submitting as he submitted.',
      },
      right: {
        label: 'Do Not Take as Intimate Friends',
        ayahs: '118–120',
        desc: 'Do not take as confidants those who want harm for you. They rejoice at your setbacks and grieve at your successes. Mirror of the Ibrahim argument: do not outsource your allegiance to those who do not share your center.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'Hold to the Rope of Allah',
    ayahs: '102–105',
    desc: 'Hold firmly to the rope of Allah, all together, and do not divide. Remember His favor — you were enemies and He joined your hearts. You were on the edge of a pit of fire and He saved you from it.',
    note: 'The center of Al-Imran is not a theological argument or a narrative — it is a command of unity. Every section before and after it is either the cause of fragmentation (Ahl al-Kitab distorting covenant) or its consequence (Uhud). The rope is the answer to both.',
  },
}

// ── Surah 4: An-Nisa ─────────────────────────────────────────────────────
const S4_RING = {
  title: 'The Ring',
  subtitle: 'Opened by the creation of humanity from one soul — closed by the dissolution of that family unit without heirs',
  pairs: [
    {
      left: {
        label: 'From One Soul',
        ayahs: '1',
        desc: 'O people, fear your Lord who created you from one soul, then created its mate, then spread from them men and women in multitudes. The entire surah\'s architecture rests on this: one origin, one family, protected by one law.',
      },
      right: {
        label: 'The Childless Inheritance',
        ayahs: '176',
        desc: 'The final ruling: a person dies with no children, only a sibling. The case of the kalalah — the one who leaves no direct descendant. The surah ends at the furthest edge of the family it opened with: one soul, then families, then the last heir.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'Rights of the Vulnerable',
        ayahs: '2–42',
        desc: 'Orphans\' property, marriage limits, inheritance laws, treatment of wives. The legal structure for protecting those who have no power: the orphan, the woman, the weak. Justice as the practical form of remembering the one origin.',
      },
      right: {
        label: 'The Hypocrites Unmasked',
        ayahs: '137–175',
        desc: 'Those who believe, then disbelieve, then believe, then disbelieve. They have no real allegiance — not to the believers, not to the disbelievers. The surah closes its legal project with the social threat that undermines every protection: the person who stands nowhere.',
      },
      color: '#4ecdc4',
    },
    {
      left: {
        label: 'Do Not Betray Your Trusts',
        ayahs: '58–59',
        desc: 'Allah commands you to return trusts to their owners, and when you judge between people, to judge with justice. Obey Allah, obey the Messenger, obey those in authority. The covenant in one sentence.',
      },
      right: {
        label: 'Isa: Neither More Nor Less',
        ayahs: '171–172',
        desc: 'O People of the Book, do not exceed in your religion — do not say except the truth. Al-Masih Isa ibn Maryam was only a messenger of Allah. Do not say Three. The mirror of the trust verse: just as a judge must not exceed or diminish, so too with the nature of Isa.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'The Greatest Wrong',
    ayahs: '48',
    desc: 'Indeed Allah does not forgive shirk, but He forgives what is less than that for whom He wills. And whoever associates with Allah has certainly fabricated a tremendous sin.',
    note: 'Placed at the numerical center of the surah, this ayah is the axis of every legal protection that surrounds it. Rights can only be protected if the One who grants them is acknowledged. Shirk is not merely a theological error — it is the undoing of every covenant in the surah.',
  },
}

// ── Surah 5: Al-Maidah ───────────────────────────────────────────────────
const S5_RING = {
  title: 'The Ring',
  subtitle: 'The last major surah revealed — its covenants frame the whole, its center names the Quran as the standard',
  pairs: [
    {
      left: {
        label: 'Fulfill Your Covenants',
        ayahs: '1–5',
        desc: 'O you who believe, fulfill your obligations. Lawful to you is the catch of the sea and its food. Sacred months are sacred. The surah opens with the word \'uqud — contracts, covenants. Everything that follows is either keeping or breaking them.',
      },
      right: {
        label: 'The Disciples\' Covenant',
        ayahs: '111–120',
        desc: 'When I inspired the disciples to believe in Me and My messenger, they said: We believe. The final section of the surah is the disciples taking their own covenant — the same word, the same act — and Isa refusing to claim anything beyond what he was given.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'The People of the Book\'s Betrayal',
        ayahs: '12–50',
        desc: 'Allah took the covenant of the Children of Israel. They broke it. Then the same with the Christians. Then the command: judge by what Allah has revealed. The pattern before the center: covenant given, covenant broken.',
      },
      right: {
        label: 'The Punishment for Breaking Covenant',
        ayahs: '72–109',
        desc: 'Those who say Allah is the third of three — they have disbelieved. Al-Masih ibn Maryam was only a messenger. The section after the center: what breaking the covenant costs, and what it looks like when a messenger refuses to exceed his station.',
      },
      color: '#4ecdc4',
    },
    {
      left: {
        label: 'Intoxicants and Games of Chance',
        ayahs: '90–91',
        desc: 'They are an abomination from the work of Satan — so avoid it. Satan only wants to cause enmity between you through intoxicants and gambling. A legal ruling placed near the center because its stakes are communal: the covenant community must be lucid to hold together.',
      },
      right: {
        label: 'The Table',
        ayahs: '112–115',
        desc: 'Send down to us a table laden with food from the sky. Isa warns: whoever disbelieves after this, I will punish them. The table is the last covenant sign in the surah — provision from heaven given on condition of faith, and refused by those who break the condition.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'The Quran as Standard',
    ayahs: '48',
    desc: 'We revealed to you the Book in truth, confirming what is before it of the Scripture and as a criterion over it. Judge between them by what Allah has revealed.',
    note: 'The center of Al-Maidah is the Quran\'s own self-description: muhaymin — guardian, criterion, standard over all that came before. This ayah is the axis. Every covenant before it points toward this standard; every betrayal after it is measured against it.',
  },
}

// ── Surah 6: Al-An'am ────────────────────────────────────────────────────
const S6_RING = {
  title: 'The Ring',
  subtitle: 'Ibrahim\'s theological discovery is the structural heart of the surah — everything before it is the argument, everything after is the consequence',
  pairs: [
    {
      left: {
        label: 'He Created the Heavens and Earth',
        ayahs: '1–3',
        desc: 'Praise belongs to Allah who created the heavens and earth and made darkness and light. Yet those who disbelieve equate others with their Lord. The surah opens at the largest scale: the act of creation and the immediate human betrayal of it.',
      },
      right: {
        label: 'Allah\'s Knowledge Encompasses All',
        ayahs: '159–165',
        desc: 'Those who divided their religion into sects — you have nothing to do with them. Whoever brings good will have ten times its like. Allah made you successors on the earth and raised some above others — to test you. The surah closes: creation → test → accountability. The same arc.',
      },
      color: '#C9A84C',
    },
    {
      left: {
        label: 'The Signs Dismissed',
        ayahs: '4–73',
        desc: 'Not one of Allah\'s signs comes to them but they turn away from it. They ask for angels, they mock, they demand signs. The long catalog of rejection — sign after sign offered, sign after sign dismissed. The preparation for Ibrahim\'s answer.',
      },
      right: {
        label: 'The Straight Path',
        ayahs: '151–158',
        desc: 'Come, I will recite what your Lord has prohibited: do not associate with Him. Do not kill your children from poverty. Do not approach immorality. This is My straight path, so follow it. The answer to the sign-dismissers: the path is named, the signs now irrelevant.',
      },
      color: '#4ecdc4',
    },
    {
      left: {
        label: 'The Prophetic Chain',
        ayahs: '83–90',
        desc: 'Those are the ones Allah has guided — so by their guidance be guided. Noah, Ibrahim, Ismail, Ishaq, Yaqub, the prophets — eighteen named at once. Ibrahim\'s discovery leads to the recognition: he was not alone. The prophets form a chain behind him.',
      },
      right: {
        label: 'The Nation of Ibrahim',
        ayahs: '161–163',
        desc: 'Say: My Lord has guided me to a straight path — the upright religion, the creed of Ibrahim, a hanif. Say: My prayer, my sacrifice, my life, my death — all for Allah. The mirror: Ibrahim is still the answer. The whole surah was always about returning to him.',
      },
      color: '#9b7fd4',
    },
  ],
  center: {
    label: 'Ibrahim\'s Discovery',
    ayahs: '74–82',
    desc: 'When the night darkened over him, he saw a star and said: This is my Lord. Then it set. Then the moon rising. Then the sun. Each one set. Then: I have turned my face toward the One who created the heavens and earth.',
    note: 'Ibrahim looks at everything the surah\'s disbelievers worship — the sky, the heavenly bodies — and watches them set. This is the structural center because it is the theological answer: the creation cannot be the Creator. The argument before this center built the case; the argument after it follows from this moment.',
  },
}

async function main() {
  const updates = [
    { n: 3, ring: S3_RING },
    { n: 4, ring: S4_RING },
    { n: 5, ring: S5_RING },
    { n: 6, ring: S6_RING },
  ]

  for (const { n, ring } of updates) {
    const { data, error: fetchErr } = await supabase
      .from('surah_visual_data')
      .select('diagrams')
      .eq('surah_number', n)
      .single()

    if (fetchErr || !data) { console.error(`${n} fetch failed`, fetchErr); continue }

    const { error } = await supabase
      .from('surah_visual_data')
      .update({
        diagrams: { ...data.diagrams, chiasticRing: ring },
        updated_at: new Date().toISOString(),
      })
      .eq('surah_number', n)

    if (error) console.error(`${n} failed`, error)
    else console.log(`✓ Surah ${n}: ring data added`)
  }
}

main()
