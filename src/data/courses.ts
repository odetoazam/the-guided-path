// Character courses — free, sequenced, deeper than any single article.
// Module HTML lives in content/courses/<course>/module-N.html (read by src/lib/courses.ts).
// Progress rows: content_type 'course', slug '<course>/<module-slug>'.

export interface CourseModule {
  slug: string // e.g. 'module-3'
  number: number // 0-5; 0 is "Start Here"
  title: string
  teaser: string
}

export interface Course {
  slug: string
  hubSlug: string // entity hub this course belongs to
  figure: string // display name of the character
  figureArabic: string
  title: string // course title (without the figure's name)
  question: string // the one question the course answers
  description: string
  spine: string // the one word / axis the course turns on
  modules: CourseModule[]
}

export const COURSES: Course[] = [
  {
    slug: 'dawud',
    hubSlug: 'dawud',
    figure: 'Dāwūd',
    figureArabic: 'دَاوُۥد',
    title: 'The Return Inside the Crown',
    question: 'Can a person hold real power and still turn back?',
    description:
      'One human being handed nearly everything a person can be handed — kingship, wisdom, a scripture of his own, a voice the mountains answered, iron soft in his hands — and the single quiet word the Quran chooses to name him by. Six modules through every verse the Quran gives him.',
    spine: 'awwāb — the one who keeps returning',
    modules: [
      {
        slug: 'the-story',
        number: 0,
        title: 'Start Here — The Story',
        teaser:
          'The whole life in order, told the way you would tell it to a friend — and why the Quran chose to scatter what we gather here.',
      },
      {
        slug: 'the-complete-man',
        number: 1,
        title: 'The Complete Man',
        teaser:
          'Six gifts, one man. Walk the full portrait once and feel its size — before the Quran says the one surprising thing it says about him.',
      },
      {
        slug: 'forge-and-courtroom',
        number: 2,
        title: 'The Forge and the Courtroom',
        teaser:
          'A prophet-king at a workbench, and a father gently outdone by his own son — two scenes that loosen an assumption before the hard one arrives.',
      },
      {
        slug: 'the-one-word',
        number: 3,
        title: 'The One Word',
        teaser:
          'Of everything the Quran could call its most gifted king, it chooses one quiet word. This is the module the whole course turns on.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'A scripture named but never quoted, a sin never described — the deliberate silences, and what they are protecting.',
      },
      {
        slug: 'the-return-in-your-own-hands',
        number: 5,
        title: 'The Return in Your Own Hands',
        teaser:
          'The course turns toward you. The returning was never a king\'s privilege — and the promise at the end is made out by name.',
      },
    ],
  },
  {
    slug: 'sulayman',
    hubSlug: 'sulayman',
    figure: 'Sulaymān',
    figureArabic: 'سُلَيْمَان',
    title: 'Am I Grateful or Ungrateful?',
    question: 'What does gratitude actually look like when you have been given everything?',
    description:
      'The Quran gives Sulaymān more than any king in the book — wind, jinn, the speech of birds — and then hands him one long unbroken story where the real test is never the power. It is the question he asks out loud in the middle of it. Six modules through the most sustained narrative in the Quran.',
    spine: 'a-ashkuru am akfur — the question asked at the peak',
    modules: [
      {
        slug: 'the-story',
        number: 0,
        title: 'Start Here — The Story',
        teaser:
          'For once the Quran tells it straight through — thirty verses, one chapter, beginning to end. Read it the way it was given.',
      },
      {
        slug: 'everything-and-everyone',
        number: 1,
        title: 'Everything and Everyone',
        teaser:
          'An inheritance, an army of jinn and men and birds — and the first words out of his mouth, which are not what a king usually says.',
      },
      {
        slug: 'the-ant-and-the-hoopoe',
        number: 2,
        title: 'The Ant and the Hoopoe',
        teaser:
          'The two smallest creatures in the story teach its biggest lessons — a warning that becomes a prayer, and a bird that knows something the king does not.',
      },
      {
        slug: 'the-queen-and-the-question',
        number: 3,
        title: 'The Queen and the Question',
        teaser:
          'A letter, a throne, a test of perception — and a woman who reasons her way to the truth while her court reaches for force.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'The gift inventory the Quran withholds, the name it never gives, the magic it denies — the silences here are load-bearing.',
      },
      {
        slug: 'your-own-kingdom',
        number: 5,
        title: 'Your Own Kingdom',
        teaser:
          'You have a kingdom too — smaller, but tested the same way. The question at the peak of his story is asked, at the end, to you.',
      },
    ],
  },
  {
    slug: 'adam',
    hubSlug: 'adam',
    figure: 'Ādam',
    figureArabic: 'ءَادَم',
    title: 'We Wronged Ourselves',
    question: 'When you get it wrong — and you will — what is the sentence that reopens everything?',
    description:
      'The first human story: made for the earth, honoured with teaching, beaten once by a forged oath on a forgotten warning — and then handed, by the One he had disobeyed, the exact words that would bring him back. Told seven times across seven chapters; this course walks all of them.',
    spine: 'tawba — the turn that is met by the Turner',
    modules: [
      {
        slug: 'the-story',
        number: 0,
        title: 'Start Here — The Story',
        teaser:
          'The whole life assembled honestly from its seven tellings — announcement, honour, whisper, fall, and the words that came down.',
      },
      {
        slug: 'made-and-taught',
        number: 1,
        title: 'Made, and Taught',
        teaser:
          'Before the fall: what kind of creature this is, what the honour was actually for, and the one variable the angels could not see.',
      },
      {
        slug: 'the-whisper-and-the-forgetting',
        number: 2,
        title: 'The Whisper and the Forgetting',
        teaser:
          'The first deception in slow motion — the door it came through was a forgotten warning, and the door out was opened from the other side.',
      },
      {
        slug: 'two-sentences',
        number: 3,
        title: 'Two Sentences',
        teaser:
          'Two beings break one command. One says "we wronged ourselves"; one says "You made me stray" — and the Quran encodes the difference in the grammar of a single root.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'No name for the woman, no species for the tree, no serpent, no inherited guilt — and the hard verse, faced with the scholars at the table.',
      },
      {
        slug: 'the-words-you-were-given',
        number: 5,
        title: 'The Words You Were Given',
        teaser:
          'The repentance was a gift before it was a deed. What the words were, who said so — and the promise made on the way down.',
      },
    ],
  },
  {
    slug: 'iblis',
    hubSlug: 'iblis',
    figure: 'Iblīs',
    figureArabic: 'إِبْلِيس',
    title: 'The Refusal That Had a Reason',
    question: 'What actually decides whether you are moved by something you cannot see?',
    description:
      'Nine of the eleven verses that name him are the same scene, so this is not a life story — it is an anatomy of a method, declared out loud once and running ever since. Six modules through every verse, with the limit welded onto every stage: the apparatus has enormous reach and no force at all.',
    spine: 'istikbār — the arrogance that closed the only exit',
    modules: [
      {
        slug: 'the-scene',
        number: 0,
        title: 'Start Here — The Scene',
        teaser:
          'The refusal, told straight — and the honest frame: why there is no arc here, and what we are studying instead.',
      },
      {
        slug: 'i-am-better-than-him',
        number: 1,
        title: '"I Am Better Than Him"',
        teaser:
          'The one sentence he says twice, word for word. Taken seriously enough to show why it is well-formed — and then what it leaves out.',
      },
      {
        slug: 'the-machine',
        number: 2,
        title: 'The Machine',
        teaser:
          'What he actually does. Every verb the Quran uses, why not one of them is coercive, and why you cannot tell his voice from your own.',
      },
      {
        slug: 'the-switch',
        number: 3,
        title: 'The Switch',
        teaser:
          'Two verses that are exact opposites, one variable running between them, and the reason the Quran\'s answer to an unseen adversary is not armour.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'No serpent, no name, no face — and a twelve-century disagreement left open. Plus the verse that says he never knew: he guessed.',
      },
      {
        slug: 'blame-yourselves',
        number: 5,
        title: 'Blame Yourselves',
        teaser:
          'His two closing statements, both disavowals — and the sentence that separates him from the first human being. It is the same sentence.',
      },
    ],
  },
  {
    slug: 'yusuf',
    hubSlug: 'yusuf',
    figure: 'Yūsuf',
    figureArabic: 'يُوسُف',
    title: 'Nothing Was Wasted',
    question: 'What happens to the years that look thrown away?',
    description:
      'The Quran\'s longest single story, told once, in order — a boy loved, envied, thrown in a well, sold cheap, framed, jailed, forgotten — while one word follows him through every station and the narrator keeps saying, over the worst scenes: thus We established him. Six modules to the only verse where a man names al-Laṭīf over his own life.',
    spine: 'lā yuḍīʿu ajra l-muḥsinīn — the reward that cannot be wasted',
    modules: [
      {
        slug: 'the-story',
        number: 0,
        title: 'Start Here — The Story',
        teaser:
          'The best of stories, in the Quran\'s own order — dream to well to prison to throne, and the dream clicking shut at the end.',
      },
      {
        slug: 'loved-and-thrown-away',
        number: 1,
        title: 'Loved, and Thrown Away',
        teaser:
          'The descent, slowly: a gift that had to be hidden, the anatomy of envy, the bottom of the well — and the thesis-verse planted at the lowest point.',
      },
      {
        slug: 'the-locked-room-and-the-dungeon',
        number: 2,
        title: 'The Locked Room and the Dungeon',
        teaser:
          'Two scenes up close: the refusal with every incentive against it, the shirt that testified — and what a man who trusts the Weaver does with a prison.',
      },
      {
        slug: 'nothing-was-wasted',
        number: 3,
        title: 'Nothing Was Wasted',
        teaser:
          'The flagship. One sentence follows Yūsuf from dungeon to dais in the mouths of strangers — and one verse turns every plot in the story inside out.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'No name for the woman, no name for the king, years left uncounted — and the hard verse at the story\'s centre, faced with the scholars at the table.',
      },
      {
        slug: 'your-own-wasted-years',
        number: 5,
        title: 'Your Own Wasted Years',
        teaser:
          'The father who complained only to God, the sentence said twice across decades, the forgiveness the theology made light — and the name to carry home.',
      },
    ],
  },
  {
    slug: 'maryam',
    hubSlug: 'maryam',
    figure: 'Maryam',
    figureArabic: 'مَرْيَم',
    title: 'She Believed the Word',
    question: 'What carries you when you hold a truth no one will believe?',
    description:
      'The only woman the Quran names — named in 31 verses, given a chapter of her own, and held up at the end of the book as the example for all believers. A command given to a girl in a prayer-room is answered sixty-three sūrahs later with a verdict in the past tense: she believed the words of her Lord, and was of the devoutly obedient.',
    spine: 'ṣaddaqat → ṣiddīqa — she believed, and was named for believing',
    modules: [
      {
        slug: 'the-story',
        number: 0,
        title: 'Start Here — The Story',
        teaser:
          'From a vow made before her birth to a verdict near the end of the Quran — the whole arc, assembled honestly from its two tellings.',
      },
      {
        slug: 'the-vow-and-the-girl',
        number: 1,
        title: 'The Vow and the Girl',
        teaser:
          'A vow shaped for a boy, a girl accepted with a beautiful acceptance — and the room where a child\'s answer reopened a prophet\'s prayer.',
      },
      {
        slug: 'the-stranger-and-the-palm-tree',
        number: 2,
        title: 'The Stranger and the Palm Tree',
        teaser:
          'Two scenes up close: refuge-first in the moment of fear, and the hardest day of her life — with the sentence the Quran refused to edit out.',
      },
      {
        slug: 'she-believed-the-word',
        number: 3,
        title: 'She Believed the Word',
        teaser:
          'The flagship. Chosen twice in one verse, a command answered sixty-three sūrahs later in the masculine plural — and the name that saturates her chapter sixteen times.',
      },
      {
        slug: 'what-the-quran-wont-tell-you',
        number: 4,
        title: "What the Quran Won't Tell You",
        teaser:
          'No husband, no age, a slander refuted without being repeated — the "sister of Hārūn" question the Prophet ﷺ himself answered, and the open question of what she was.',
      },
      {
        slug: 'carrying-what-no-one-believes',
        number: 5,
        title: 'Carrying What No One Believes',
        teaser:
          'The defense she never ran, the silence that was an assignment — and the first name for God that a lifetime of unwatched rooms had made her native language.',
      },
    ],
  },
]

export const COURSES_BY_SLUG: Record<string, Course> = Object.fromEntries(
  COURSES.map((c) => [c.slug, c])
)

export function getCourseByHubSlug(hubSlug: string): Course | undefined {
  return COURSES.find((c) => c.hubSlug === hubSlug)
}

/** Progress-row slug for a module: '<course>/<module-slug>' */
export function moduleProgressSlug(course: Course, mod: CourseModule): string {
  return `${course.slug}/${mod.slug}`
}
