#!/usr/bin/env npx tsx
/**
 * insert-all-drafts.ts
 * Inserts all 29 draft articles from scripts/drafts/ into the posts table.
 * Also creates the bani-israil entity if needed, tags articles to entities,
 * and refreshes co-occurrence cache.
 */
import { createClient } from '@supabase/supabase-js'
import { readFileSync } from 'fs'
import { join } from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const ADMIN_USER_ID = '5814582a-9f09-473a-be6f-619c210cca8e'
const DRAFTS_DIR = '/Users/azamkhan/the-guided-path/scripts/drafts'

function readArticle(relPath: string): string {
  const content = readFileSync(join(DRAFTS_DIR, relPath), 'utf8')
  const match = content.match(/<article[^>]*>([\s\S]*?)<\/article>/)
  if (!match) throw new Error(`No <article> found in ${relPath}`)
  return `<article class="prose-blog">${match[1]}</article>`
}

// Ensure bani-israil entity exists
async function ensureBaniIsrailEntity() {
  const { data: existing } = await supabase
    .from('entities')
    .select('id')
    .eq('slug', 'bani-israil')
    .single()
  if (existing) return existing.id

  const { data, error } = await supabase
    .from('entities')
    .insert({
      slug: 'bani-israil',
      name: "Bani Isra'il",
      type: 'group',
      description: "The Children of Israel as they appear in the Quran — chosen, covenanted, and repeatedly addressed.",
      article_count: 0,
    })
    .select('id')
    .single()
  if (error) { console.error('Failed to create bani-israil entity:', error); return null }
  console.log('✅ Created bani-israil entity:', data.id)
  return data.id
}

type ArticleRow = {
  title: string
  slug: string
  type: string
  excerpt: string
  seo_title: string
  seo_description: string
  content_html: string
  status: string
  tags: string[]
  reading_time_minutes: number
  featured: boolean
  published_at: string
  created_by: string
}

type EntityTag = { slug: string; is_primary: boolean }

const articles: ArticleRow[] = [
  // ── IMAN ──
  {
    title: "Alladhina Amanu: The Address That Defines a Community",
    slug: "iman-alladhina-amanu",
    type: 'article',
    excerpt: "The Quran's recurring address, alladhina amanu, gathers a people through trust, trembling, patience, and moral expenditure. This article follows that address through key ayahs to show how iman becomes a public form of life.",
    seo_title: "Alladhina Amanu — Iman in the Quran",
    seo_description: "A Quranic reading of alladhina amanu through 2:177, 49:14-15, and 8:2-4, tracing how iman forms a community through trust, action, and trembling hearts.",
    content_html: readArticle('iman/iman-alladhina-amanu.md'),
    status: 'published',
    tags: ["iman", "community", "quranic-language", "al-baqarah", "al-hujurat", "al-anfal"],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Iman and Amal: The Pair That Never Separates in the Quran",
    slug: "iman-amal-pair-quran",
    type: 'article',
    excerpt: "Again and again, the Quran binds belief to righteous action. This article traces that paired formula to show how iman seeks embodiment and how amal receives meaning from faith.",
    seo_title: "Iman and Amal — Iman in the Quran",
    seo_description: "A reading of the Quran's recurring pair of iman and righteous action through 103:1-3, 2:25, and 18:107, showing belief embodied in lived deeds.",
    content_html: readArticle('iman/iman-amal-pair-quran.md'),
    status: 'published',
    tags: ["iman", "amal", "quranic-language", "al-asr", "al-baqarah", "al-kahf"],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Stages of Iman: Vocabulary of Belief",
    slug: "iman-stages-vocabulary-quran",
    type: 'article',
    excerpt: "The Quran speaks of belief with a precise vocabulary: islam, iman, increase, certainty, and haqq al-yaqin. This article traces that language to show that faith has stages, textures, and semantic depth.",
    seo_title: "Stages of Iman — Iman in the Quran",
    seo_description: "A semantic study of the Quran's vocabulary of belief through 49:14-15, 2:4, and 56:95, tracing stages from submission to certainty.",
    content_html: readArticle('iman/iman-stages-vocabulary-quran.md'),
    status: 'published',
    tags: ["iman", "yaqin", "quranic-language", "semantic-analysis", "al-hujurat", "al-baqarah", "al-waqiah"],
    reading_time_minutes: 10,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── IHSAN ──
  {
    title: "Muhsin: The One Who Does It Beautifully",
    slug: "ihsan-muhsin-root-quran",
    type: 'article',
    excerpt: "The root h-s-n gathers beauty, goodness, and excellence into one field. This article follows ihsan and its sibling phrases to show how the Quran qualifies virtue with beauty.",
    seo_title: "Muhsin and Ihsan — Ihsan in the Quran",
    seo_description: "A Quranic study of h-s-n through 2:195, 55:60, 16:90, 12:18, and 31:15, showing how ihsan makes virtue beautiful in form and finish.",
    content_html: readArticle('ihsan/ihsan-muhsin-root-quran.md'),
    status: 'published',
    tags: ["ihsan", "muhsin", "quranic-language", "yusuf", "luqman", "virtue"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Ihsan and Its Siblings: Islam, Iman, Ihsan as the Quran's Three-Layer Structure",
    slug: "ihsan-three-layers-quran",
    type: 'article',
    excerpt: "The Quran's vocabulary of surrender, trust, and beautiful excellence forms a layered structure. This article maps the semantic distance between islam, iman, and ihsan through key Quranic terms.",
    seo_title: "Islam, Iman, Ihsan — Ihsan in the Quran",
    seo_description: "A semantic reading of islam, iman, and ihsan through 2:112, 4:125, 16:128, 39:10, and 31:22, tracing the Quran's three-layer moral structure.",
    content_html: readArticle('ihsan/ihsan-three-layers-quran.md'),
    status: 'published',
    tags: ["ihsan", "iman", "islam", "semantic-analysis", "quranic-language", "tawakkul"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── QADAR ──
  {
    title: "The Root That Means Measure: Qadar Before It Became Fate",
    slug: "qadar-root-measure-quran",
    type: 'article',
    excerpt: "Before qadar became a theological shorthand for fate, its root spoke of measure, proportion, and due capacity. This article traces how that concrete field grounds the Quran's doctrine of decree.",
    seo_title: "Qadar as Measure — Qadar in the Quran",
    seo_description: "A semantic study of q-d-r through 54:49, 87:3, 25:2, 77:23, and 65:3, showing how divine decree grows from measure, proportion, and capacity.",
    content_html: readArticle('qadar/qadar-root-measure-quran.md'),
    status: 'published',
    tags: ["qadar", "semantic-analysis", "quranic-language", "creation", "decree", "measure"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Qaddara: The Verb the Quran Uses for Creation Itself",
    slug: "qadar-qaddara-creation-quran",
    type: 'article',
    excerpt: "The Quran often describes creation through the verb qaddara: He measured it out. This article follows that verb to show a universe shaped by proportion, aptitude, and due capacity.",
    seo_title: "Qaddara and Creation — Qadar in the Quran",
    seo_description: "A Quranic study of qaddara through 80:19, 87:3, 25:2, 74:18-20, and 15:21, showing creation as an act of exact measure.",
    content_html: readArticle('qadar/qadar-qaddara-creation-quran.md'),
    status: 'published',
    tags: ["qadar", "creation", "quranic-language", "semantic-analysis", "measure", "takdir"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Qadar and Human Choice: What the Quran Holds in Tension",
    slug: "qadar-human-choice-tension-quran",
    type: 'article',
    excerpt: "The Quran speaks with full force about divine decree and human accountability without reducing either to the other. This article traces that tension through its most concentrated verses.",
    seo_title: "Qadar and Choice — Qadar in the Quran",
    seo_description: "A Quranic reading of decree and accountability through 76:29-30, 81:28-29, 18:29, 92:5-7, and 91:7-10, preserving the tension without collapse.",
    content_html: readArticle('qadar/qadar-human-choice-tension-quran.md'),
    status: 'published',
    tags: ["qadar", "human-choice", "accountability", "quranic-theology", "free-will", "decree"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── RIZQ ──
  {
    title: "Al-Razzaq: What the Divine Name Means and Where It Comes From",
    slug: "rizq-al-razzaq-divine-name-quran",
    type: 'article',
    excerpt: "The divine name Al-Razzaq gathers provision into a continuous act of divine giving. This article traces the root r-z-q and shows why the Quran presents provision as ongoing, concrete, and embodied.",
    seo_title: "Al-Razzaq — Rizq in the Quran",
    seo_description: "A study of Al-Razzaq through 51:58, 22:58, 34:39, 29:60, and 11:6, tracing provision as an ongoing divine act of sustenance.",
    content_html: readArticle('rizq/rizq-al-razzaq-divine-name-quran.md'),
    status: 'published',
    tags: ["rizq", "al-razzaq", "divine-names", "provision", "quranic-language", "infaq"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Rizq and Gratitude: The Quran's Economic Theology",
    slug: "rizq-gratitude-economic-theology-quran",
    type: 'article',
    excerpt: "The Quran binds provision to gratitude and gratitude to spending. This article traces rizq, shukr, and infaq as one theological circuit running through the moral economy of the Quran.",
    seo_title: "Rizq and Gratitude — Rizq in the Quran",
    seo_description: "A Quranic reading of rizq, shukr, and infaq through 2:3, 16:114, 34:15, 14:7, and 2:254, showing provision as a moral circulation.",
    content_html: readArticle('rizq/rizq-gratitude-economic-theology-quran.md'),
    status: 'published',
    tags: ["rizq", "shukr", "infaq", "economic-theology", "quranic-language", "provision"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── MAHABBAH ──
  {
    title: "The Root That Means Seed: Mahabbah Before It Became Love",
    slug: "mahabbah-root-seed-quran",
    type: 'article',
    excerpt: "The root h-b-b links love with kernels, seeds, and concentrated cores. This article traces hubb and wudd in the Quran to show why love appears there in more than one register.",
    seo_title: "Mahabbah and Hubb — Mahabbah in the Quran",
    seo_description: "A semantic study of h-b-b and w-d-d through 2:165, 3:31, 5:54, 19:96, and 85:14, contrasting concentrated love with warm affection.",
    content_html: readArticle('mahabbah/mahabbah-root-seed-quran.md'),
    status: 'published',
    tags: ["mahabbah", "hubb", "wudd", "semantic-analysis", "quranic-language", "love"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "What Allah Loves: The Quran's Enumeration of the Beloved",
    slug: "mahabbah-what-allah-loves-quran",
    type: 'article',
    excerpt: "The Quran repeatedly says whom Allah loves: the muhsineen, muttaqeen, mutawakkileen, tawwabeen, and others. This article reads those enumerations together to sketch the portrait of the beloved servant.",
    seo_title: "What Allah Loves — Mahabbah in the Quran",
    seo_description: "A reading of the Quran's beloved types through 2:195, 3:76, 3:159, 2:222, 9:108, 61:4, and 49:9, mapping the portrait of the beloved servant.",
    content_html: readArticle('mahabbah/mahabbah-what-allah-loves-quran.md'),
    status: 'published',
    tags: ["mahabbah", "divine-love", "muhsineen", "taqwa", "tawbah", "tawakkul"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Yuhibbuhum wa Yuhibbunahu: The Mutual Love the Quran Announces",
    slug: "mahabbah-mutual-love-quran",
    type: 'article',
    excerpt: "The Quran speaks of love between Creator and creature as a mutual reality. This article follows the grammar of divine-first love through key verses on following, repentance, and return.",
    seo_title: "Mutual Love — Mahabbah in the Quran",
    seo_description: "A Quranic reading of mutual love through 5:54, 3:31, 2:165, and 11:90, tracing the sequence in which divine love comes first and human love answers it.",
    content_html: readArticle('mahabbah/mahabbah-mutual-love-quran.md'),
    status: 'published',
    tags: ["mahabbah", "divine-love", "quranic-language", "mutuality", "tawbah", "iman"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── KHAWF ──
  {
    title: "The Fear That Doesn't Paralyze: Khawf as Engine in the Quran",
    slug: "khawf-engine-not-paralysis-quran",
    type: 'article',
    excerpt: "The Quran presents fear of Allah as morally productive rather than disabling. This article traces khawf as the force behind prayer, night worship, restraint, and charity.",
    seo_title: "Productive Fear — Khawf in the Quran",
    seo_description: "A Quranic reading of khawf through 32:16, 76:10, 51:17-19, 23:57-61, and 70:27-28, showing fear as an engine of worship and generosity.",
    content_html: readArticle('khawf/khawf-engine-not-paralysis-quran.md'),
    status: 'published',
    tags: ["khawf", "worship", "charity", "quranic-psychology", "night-prayer", "taqwa"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Khawf vs. Khashya: Two Words for Fear, Two Theological Positions",
    slug: "khawf-khashya-two-fears-quran",
    type: 'article',
    excerpt: "The Quran uses more than one word for fear, and the distinctions matter. This article traces khawf and khashya to show how reverent fear grows from knowledge while anticipatory fear turns toward possible harm.",
    seo_title: "Khawf and Khashya — Khawf in the Quran",
    seo_description: "A semantic study of khawf and khashya through 35:28, 2:150, 79:40, 20:77, 21:49, and 36:11, showing fear as both anticipation and knowing awe.",
    content_html: readArticle('khawf/khawf-khashya-two-fears-quran.md'),
    status: 'published',
    tags: ["khawf", "khashya", "semantic-analysis", "quranic-language", "fear", "knowledge"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── SIDQ ──
  {
    title: "The Root That Means Solid: Sidq Before It Became Truth",
    slug: "sidq-root-solid-quran",
    type: 'article',
    excerpt: "The root s-d-q carries density, firmness, and holding power. This article traces how that concrete force becomes truthfulness, siddiqiyyah, and even charity in the Quran.",
    seo_title: "Sidq as Solidity — Sidq in the Quran",
    seo_description: "A semantic study of s-d-q through 9:119, 39:33, 4:69, 57:18-19, and 5:75, showing truth as firmness and correspondence.",
    content_html: readArticle('sidq/sidq-root-solid-quran.md'),
    status: 'published',
    tags: ["sidq", "semantic-analysis", "siddiq", "tasaddaq", "quranic-language", "truthfulness"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Al-Siddiq: The Rank the Quran Places Between Prophets and Martyrs",
    slug: "sidq-al-siddiq-rank-quran",
    type: 'article',
    excerpt: "The Quran places the siddiq immediately beneath the prophet in rank. This article traces the content of siddiqiyyah through the figures explicitly given that title and the station named in An-Nisa.",
    seo_title: "Al-Siddiq — Sidq in the Quran",
    seo_description: "A Quranic study of the rank of siddiq through 4:69, 19:41, 19:56, 12:46, and 5:75, tracing the station between prophecy and martyrdom.",
    content_html: readArticle('sidq/sidq-al-siddiq-rank-quran.md'),
    status: 'published',
    tags: ["sidq", "siddiq", "ibrahim", "idris", "maryam", "quranic-ranks"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── QARUN ──
  {
    title: "The Earth Swallowed Him: Qarun's End and the Quran's Theology of Reversal",
    slug: "qarun-earth-swallowed-reversal-quran",
    type: 'article',
    excerpt: "Qarun's destruction in the Quran is a scene of reversal before it is a lesson in punishment. This article traces how possession, envy, and earth itself converge in the collapse of his world.",
    seo_title: "Qarun's Reversal — Qarun in the Quran",
    seo_description: "A Quranic reading of Qarun through 28:76-82, 29:39, and 40:24, showing how wealth becomes reversal when possession hardens into identity.",
    content_html: readArticle('qarun/qarun-earth-swallowed-reversal-quran.md'),
    status: 'published',
    tags: ["qarun", "reversal", "wealth", "quranic-narrative", "musa", "al-qasas"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── BILQIS ──
  {
    title: "Bilqis and Sulayman: The Throne, the Letter, and the Question of Power",
    slug: "bilqis-sulayman-throne-letter-quran",
    type: 'article',
    excerpt: "The Quran preserves the exchange between Bilqis and Sulayman as a compressed diplomatic drama. This article traces how counsel, testing, and recognition shape her path to faith.",
    seo_title: "Bilqis and Sulayman — Bilqis in the Quran",
    seo_description: "A Quranic reading of Bilqis and Sulayman through 27:22-44, following the letter, the throne, and the political intelligence of her arrival at faith.",
    content_html: readArticle('bilqis/bilqis-sulayman-throne-letter-quran.md'),
    status: 'published',
    tags: ["bilqis", "sulayman", "power", "quranic-narrative", "diplomacy", "an-naml"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Bilqis's Throne: The Object Moved Before She Arrived",
    slug: "bilqis-throne-moved-quran",
    type: 'article',
    excerpt: "The Quran moves Bilqis's throne before Bilqis herself appears and leaves the meaning partly unexplained. This article reads that silence as part of the scene's power.",
    seo_title: "Bilqis's Throne — Bilqis in the Quran",
    seo_description: "A Quranic reading of the moved throne in 27:38-42, tracing what the scene achieves through alteration, recognition, and deliberate unexplainedness.",
    content_html: readArticle('bilqis/bilqis-throne-moved-quran.md'),
    status: 'published',
    tags: ["bilqis", "throne", "sulayman", "quranic-narrative", "power", "an-naml"],
    reading_time_minutes: 7,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── DAWUD ──
  {
    title: "The Sound of Dawud: The Quran's Description of His Voice",
    slug: "dawud-sound-voice-quran",
    type: 'article',
    excerpt: "The Quran grants Dawud a sonic bounty unlike that of any other prophet. This article traces what is said and withheld about the voice that drew mountains and birds into praise.",
    seo_title: "The Sound of Dawud — Dawud in the Quran",
    seo_description: "A Quranic study of Dawud's sonic gift through 34:10, 21:79, and 38:17-19, asking how creation came to participate in his praise.",
    content_html: readArticle('dawud/dawud-sound-voice-quran.md'),
    status: 'published',
    tags: ["dawud", "voice", "tasbih", "quranic-narrative", "mountains", "birds"],
    reading_time_minutes: 7,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Dawud's Hasty Judgment: The Moment He Ruled Against Himself",
    slug: "dawud-judgment-against-himself-quran",
    type: 'article',
    excerpt: "The Quran narrates a brief case brought suddenly to Dawud and shows how he recognizes his own haste within it. This article reads the scene as a parable of prophetic accountability.",
    seo_title: "Dawud's Judgment — Dawud in the Quran",
    seo_description: "A close reading of 38:21-25, where Dawud judges quickly, realizes the test, and turns at once in prostration and repentance.",
    content_html: readArticle('dawud/dawud-judgment-against-himself-quran.md'),
    status: 'published',
    tags: ["dawud", "judgment", "prophetic-accountability", "quranic-narrative", "sad", "tawbah"],
    reading_time_minutes: 7,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Dawud and the Zabur: The Prophet Whose Book the Quran Mentions Without Quoting",
    slug: "dawud-zabur-absence-quran",
    type: 'article',
    excerpt: "The Quran mentions the Zabur given to Dawud several times yet does not quote it directly. This article traces that silence and the way Dawud's praise fills the space around the unquoted book.",
    seo_title: "Dawud and the Zabur — Dawud in the Quran",
    seo_description: "A Quranic study of the Zabur through 4:163, 17:55, 21:105, 34:10-11, and 38:17-20, asking what the Quran says and withholds about Dawud's book.",
    content_html: readArticle('dawud/dawud-zabur-absence-quran.md'),
    status: 'published',
    tags: ["dawud", "zabur", "tasbih", "quranic-narrative", "scripture", "praise"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── SULAYMAN ──
  {
    title: "Sulayman and the Ants: The Prophet Who Heard What We Can't Hear",
    slug: "sulayman-ants-hearing-quran",
    type: 'article',
    excerpt: "The Quran preserves the speech of an ant in exact words and lets Sulayman hear it. This article traces what the scene reveals about scale, mercy, and prophetic listening.",
    seo_title: "Sulayman and the Ants — Sulayman in the Quran",
    seo_description: "A Quranic reading of Sulayman hearing the ant in 27:18-19, 27:16, and 21:79, showing how the smallest voice becomes part of prophetic perception.",
    content_html: readArticle('sulayman/sulayman-ants-hearing-quran.md'),
    status: 'published',
    tags: ["sulayman", "ants", "hearing", "quranic-narrative", "speech", "an-naml"],
    reading_time_minutes: 7,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Horses and the Sun: Sulayman's Test and What He Did Next",
    slug: "sulayman-horses-sun-test-quran",
    type: 'article',
    excerpt: "The Quran preserves a brief and enigmatic scene of Sulayman, beautiful horses, and the vanished sun. This article treats the compression itself as the subject and reads the passage through what it leaves unsaid.",
    seo_title: "Sulayman's Horses — Sulayman in the Quran",
    seo_description: "A close reading of 38:31-33, following Sulayman's evening with the horses and the Quran's deliberate refusal to explain every gesture.",
    content_html: readArticle('sulayman/sulayman-horses-sun-test-quran.md'),
    status: 'published',
    tags: ["sulayman", "horses", "quranic-narrative", "test", "sad", "compression"],
    reading_time_minutes: 7,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Sulayman's Wind: The Kingdom That Moved",
    slug: "sulayman-wind-kingdom-quran",
    type: 'article',
    excerpt: "The Quran gives Sulayman a kingdom carried by wind and framed as divine gift. This article traces how his dominion differs from ordinary kingship through motion, bounty, and moral disclaimer.",
    seo_title: "Sulayman's Wind — Sulayman in the Quran",
    seo_description: "A Quranic reading of Sulayman's wind through 21:81, 34:12, 38:36-39, and 27:16, showing a kingdom defined by gifted motion rather than self-made power.",
    content_html: readArticle('sulayman/sulayman-wind-kingdom-quran.md'),
    status: 'published',
    tags: ["sulayman", "wind", "kingdom", "quranic-narrative", "gift", "dominion"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  // ── BANI-ISRAIL ──
  {
    title: "The Twelve Tribes and the Covenant: What the Quran Remembers of Sinai",
    slug: "bani-israil-covenant-sinai-quran",
    type: 'article',
    excerpt: "The Quran remembers Sinai as covenant, address, burden, and mercy. This article traces how Bani Isra'il are spoken to directly and what that directness reveals about revelation, responsibility, and return.",
    seo_title: "Sinai Covenant — Bani Isra'il in the Quran",
    seo_description: "A Quranic reading of the Sinai covenant through 2:40-41, 2:63, 5:12, 2:83-84, and 7:171, tracing promise, command, and the direct address to Bani Isra'il.",
    content_html: readArticle('bani-israil/bani-israil-covenant-sinai-quran.md'),
    status: 'published',
    tags: ["bani-israil", "covenant", "sinai", "quranic-narrative", "musa", "revelation"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "The Calf of Gold: The Scene the Quran Returns to Five Times",
    slug: "bani-israil-golden-calf-quran",
    type: 'article',
    excerpt: "The Quran revisits the calf repeatedly, and each retelling sharpens a different theological edge. This article follows the scene across surahs to show why the calf remains a recurring point of return.",
    seo_title: "The Golden Calf — Bani Isra'il in the Quran",
    seo_description: "A Quranic study of the golden calf through 2:51-54, 7:148-152, 20:83-98, and 4:153, tracing what each retelling adds to the memory of Sinai.",
    content_html: readArticle('bani-israil/bani-israil-golden-calf-quran.md'),
    status: 'published',
    tags: ["bani-israil", "golden-calf", "musa", "harun", "samiri", "quranic-narrative"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
  {
    title: "Bani Isra'il and the Sea: The Crossing That Couldn't Be Undone",
    slug: "bani-israil-sea-crossing-quran",
    type: 'article',
    excerpt: "The Quran remembers the sea crossing as rescue and witness, then pivots quickly to what followed. This article traces that pivot and shows why the aftermath is part of the crossing's meaning.",
    seo_title: "Bani Isra'il and the Sea — Bani Isra'il in the Quran",
    seo_description: "A Quranic reading of the sea crossing through 2:50, 7:138, 10:90-92, 20:77-80, and 44:17-33, following rescue, witness, and the rapid pivot to forgetfulness.",
    content_html: readArticle('bani-israil/bani-israil-sea-crossing-quran.md'),
    status: 'published',
    tags: ["bani-israil", "sea-crossing", "musa", "rescue", "quranic-narrative", "forgetfulness"],
    reading_time_minutes: 8,
    featured: false,
    published_at: new Date().toISOString(),
    created_by: ADMIN_USER_ID,
  },
]

// Entity tag map: article slug -> entity tags
const entityTagMap: Record<string, EntityTag[]> = {
  'iman-alladhina-amanu': [{ slug: 'iman', is_primary: true }, { slug: 'taqwa', is_primary: false }, { slug: 'sidq', is_primary: false }],
  'iman-amal-pair-quran': [{ slug: 'iman', is_primary: true }, { slug: 'ihsan', is_primary: false }],
  'iman-stages-vocabulary-quran': [{ slug: 'iman', is_primary: true }],
  'ihsan-muhsin-root-quran': [{ slug: 'ihsan', is_primary: true }, { slug: 'sabr', is_primary: false }],
  'ihsan-three-layers-quran': [{ slug: 'ihsan', is_primary: true }, { slug: 'iman', is_primary: false }, { slug: 'taqwa', is_primary: false }],
  'qadar-root-measure-quran': [{ slug: 'qadar', is_primary: true }, { slug: 'rizq', is_primary: false }],
  'qadar-qaddara-creation-quran': [{ slug: 'qadar', is_primary: true }, { slug: 'rizq', is_primary: false }],
  'qadar-human-choice-tension-quran': [{ slug: 'qadar', is_primary: true }, { slug: 'taqwa', is_primary: false }],
  'rizq-al-razzaq-divine-name-quran': [{ slug: 'rizq', is_primary: true }, { slug: 'rahmah', is_primary: false }, { slug: 'qadar', is_primary: false }],
  'rizq-gratitude-economic-theology-quran': [{ slug: 'rizq', is_primary: true }, { slug: 'rahmah', is_primary: false }, { slug: 'qadar', is_primary: false }],
  'mahabbah-root-seed-quran': [{ slug: 'mahabbah', is_primary: true }, { slug: 'iman', is_primary: false }, { slug: 'rahmah', is_primary: false }],
  'mahabbah-what-allah-loves-quran': [{ slug: 'mahabbah', is_primary: true }, { slug: 'ihsan', is_primary: false }, { slug: 'taqwa', is_primary: false }],
  'mahabbah-mutual-love-quran': [{ slug: 'mahabbah', is_primary: true }, { slug: 'iman', is_primary: false }],
  'khawf-engine-not-paralysis-quran': [{ slug: 'khawf', is_primary: true }, { slug: 'taqwa', is_primary: false }, { slug: 'rahmah', is_primary: false }],
  'khawf-khashya-two-fears-quran': [{ slug: 'khawf', is_primary: true }, { slug: 'taqwa', is_primary: false }, { slug: 'iman', is_primary: false }],
  'sidq-root-solid-quran': [{ slug: 'sidq', is_primary: true }, { slug: 'iman', is_primary: false }, { slug: 'ihsan', is_primary: false }],
  'sidq-al-siddiq-rank-quran': [{ slug: 'sidq', is_primary: true }],
  'qarun-earth-swallowed-reversal-quran': [{ slug: 'qarun', is_primary: true }],
  'bilqis-sulayman-throne-letter-quran': [{ slug: 'bilqis', is_primary: true }, { slug: 'sulayman', is_primary: false }, { slug: 'iman', is_primary: false }],
  'bilqis-throne-moved-quran': [{ slug: 'bilqis', is_primary: true }, { slug: 'sulayman', is_primary: false }, { slug: 'iman', is_primary: false }],
  'dawud-sound-voice-quran': [{ slug: 'dawud', is_primary: true }, { slug: 'sulayman', is_primary: false }],
  'dawud-judgment-against-himself-quran': [{ slug: 'dawud', is_primary: true }, { slug: 'sidq', is_primary: false }],
  'dawud-zabur-absence-quran': [{ slug: 'dawud', is_primary: true }, { slug: 'sulayman', is_primary: false }],
  'sulayman-ants-hearing-quran': [{ slug: 'sulayman', is_primary: true }, { slug: 'dawud', is_primary: false }, { slug: 'rahmah', is_primary: false }],
  'sulayman-horses-sun-test-quran': [{ slug: 'sulayman', is_primary: true }, { slug: 'dawud', is_primary: false }],
  'sulayman-wind-kingdom-quran': [{ slug: 'sulayman', is_primary: true }, { slug: 'dawud', is_primary: false }, { slug: 'rizq', is_primary: false }],
  'bani-israil-covenant-sinai-quran': [{ slug: 'bani-israil', is_primary: true }, { slug: 'musa', is_primary: false }, { slug: 'taqwa', is_primary: false }],
  'bani-israil-golden-calf-quran': [{ slug: 'bani-israil', is_primary: true }, { slug: 'musa', is_primary: false }],
  'bani-israil-sea-crossing-quran': [{ slug: 'bani-israil', is_primary: true }, { slug: 'musa', is_primary: false }, { slug: 'taqwa', is_primary: false }],
}

async function main() {
  console.log('=== Step 0: Ensure bani-israil entity exists ===')
  await ensureBaniIsrailEntity()

  // Cache entity IDs
  const entityCache: Record<string, string> = {}
  async function getEntityId(slug: string): Promise<string | null> {
    if (entityCache[slug]) return entityCache[slug]
    const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
    if (data) { entityCache[slug] = data.id; return data.id }
    console.warn(`  ⚠️  Entity not found: ${slug}`)
    return null
  }

  console.log('\n=== Step 1: Check existing slugs ===')
  const slugList = articles.map(a => a.slug)
  const { data: existing } = await supabase.from('posts').select('slug').in('slug', slugList)
  const existingSlugs = new Set(existing?.map((r: any) => r.slug) ?? [])
  if (existingSlugs.size > 0) {
    console.log('Already inserted:', [...existingSlugs].join(', '))
  }

  console.log('\n=== Step 2: Insert articles ===')
  let inserted = 0
  let skipped = 0
  let failed = 0

  for (const article of articles) {
    if (existingSlugs.has(article.slug)) {
      console.log(`  SKIP (already exists): ${article.slug}`)
      skipped++
      continue
    }

    const { data: post, error } = await supabase
      .from('posts')
      .insert(article)
      .select('id, slug')
      .single()

    if (error) {
      console.error(`  ❌ Insert failed for ${article.slug}:`, error.message)
      failed++
      continue
    }

    console.log(`  ✅ Inserted: ${post.slug}`)
    inserted++

    // Tag with entities
    const tags = entityTagMap[article.slug] ?? []
    for (const tag of tags) {
      const entityId = await getEntityId(tag.slug)
      if (!entityId) continue
      const { error: tagError } = await supabase.from('entity_tags').insert({
        post_id: post.id,
        entity_id: entityId,
        is_primary: tag.is_primary,
      })
      if (tagError) console.warn(`    ⚠️  Tag failed (${tag.slug}):`, tagError.message)
      else console.log(`    🏷  Tagged: ${tag.slug} (primary=${tag.is_primary})`)
    }
  }

  console.log(`\n=== Summary: ${inserted} inserted, ${skipped} skipped, ${failed} failed ===`)

  if (inserted > 0) {
    console.log('\n=== Step 3: Refresh entity co-occurrence ===')
    const { error } = await supabase.rpc('refresh_entity_co_occurrence')
    if (error) console.warn('  ⚠️  Co-occurrence refresh error:', error.message)
    else console.log('  ✅ Co-occurrence refreshed')
  }

  console.log('\nDone.')
}

main().catch(console.error)
