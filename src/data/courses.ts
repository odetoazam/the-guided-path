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
