#!/usr/bin/env npx tsx
import { createClient } from '@supabase/supabase-js'
import fs from 'fs'
import path from 'path'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─────────────────────────────────────────────────────
// TYPES
// ─────────────────────────────────────────────────────

interface AyahRecordInput {
  surah_number: number
  ayah_start: number
  ayah_end: number
  arabic_text: string
  translation: string
  title: string
  layer_a: Record<string, unknown>
  status: string
}

interface InsertTask {
  record: AyahRecordInput
  entitySlugs: string[]
}

// ─────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────

async function getEntityId(slug: string): Promise<string | null> {
  const { data } = await supabase.from('entities').select('id').eq('slug', slug).single()
  return data?.id ?? null
}

async function tagEntity(ayahRecordId: string, entitySlug: string): Promise<void> {
  const entityId = await getEntityId(entitySlug)
  if (!entityId) {
    console.warn(`  ⚠ Entity "${entitySlug}" not found in DB — skipping tag`)
    return
  }

  const { data: existingTag } = await supabase
    .from('entity_tags')
    .select('id')
    .eq('ayah_record_id', ayahRecordId)
    .eq('entity_id', entityId)
    .single()

  if (existingTag) {
    console.log(`  Tag already exists for "${entitySlug}"`)
    return
  }

  const { error } = await supabase.from('entity_tags').insert({
    ayah_record_id: ayahRecordId,
    entity_id: entityId,
    is_primary: true,
  })

  if (error) {
    console.error(`  ✗ Failed to tag "${entitySlug}":`, error.message)
  } else {
    console.log(`  ✓ Tagged "${entitySlug}"`)
  }
}

async function insertAyahRecord(record: AyahRecordInput, entitySlugs: string[]): Promise<void> {
  console.log(
    `\n→ Processing ${record.surah_number}:${record.ayah_start}-${record.ayah_end} "${record.title}"`
  )

  // Check if already exists
  const { data: existing } = await supabase
    .from('ayah_records')
    .select('id')
    .eq('surah_number', record.surah_number)
    .eq('ayah_start', record.ayah_start)
    .single()

  let recordId: string

  if (existing) {
    console.log(`  Already exists (ID: ${existing.id}) — skipping insert, tagging only`)
    recordId = existing.id
  } else {
    const { data, error } = await supabase
      .from('ayah_records')
      .insert(record)
      .select('id')
      .single()

    if (error || !data) {
      console.error(`  ✗ Failed to insert:`, error?.message ?? 'unknown error')
      return
    }

    console.log(`  ✓ Inserted with ID: ${data.id}`)
    recordId = data.id
  }

  for (const slug of entitySlugs) {
    await tagEntity(recordId, slug)
  }
}

// ─────────────────────────────────────────────────────
// BODY EXTRACTION
// Reads a markdown file, strips the YAML frontmatter block and
// the HTML comment block, and returns everything after.
// ─────────────────────────────────────────────────────

function readBody(filePath: string): string {
  const raw = fs.readFileSync(filePath, 'utf-8')

  // Remove YAML frontmatter (first ---...--- block)
  let content = raw.replace(/^---[\s\S]*?---\s*/m, '')

  // Remove HTML comment blocks (<!-- ... -->)
  content = content.replace(/<!--[\s\S]*?-->\s*/gm, '')

  return content.trim()
}

// ─────────────────────────────────────────────────────
// RECORDS
// ─────────────────────────────────────────────────────

const PROJECT_ROOT = '/Users/azamkhan/the-guided-path'

const tasks: InsertTask[] = [
  // ── 1a. Surah 2, ayahs 6-7 (kāfirūn — sealed hearts) ──
  {
    record: {
      surah_number: 2,
      ayah_start: 6,
      ayah_end: 7,
      arabic_text:
        'إِنَّ ٱلَّذِينَ كَفَرُوا۟ سَوَآءٌ عَلَيْهِمْ ءَأَنذَرْتَهُمْ أَمْ لَمْ تُنذِرْهُمْ لَا يُؤْمِنُونَ ۝ خَتَمَ ٱللَّهُ عَلَىٰ قُلُوبِهِمْ وَعَلَىٰ سَمْعِهِمْ ۖ وَعَلَىٰٓ أَبْصَـٰرِهِمْ غِشَـٰوَةٌ ۖ وَلَهُمْ عَذَابٌ عَظِيمٌ',
      translation:
        'Indeed, those who disbelieve — it is all the same for them whether you warn them or do not warn them — they will not believe. Allah has set a seal upon their hearts and upon their hearing, and over their vision is a veil. And for them is a great punishment.',
      title:
        'The Sealed Heart — When Allah Gave Disbelief Two Ayahs and Did Not Need More',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/002-al-baqarah/ayahs-006-017.md')
        ),
      },
    },
    entitySlugs: ['nifaq', 'bani-israil'],
  },

  // ── 1b. Surah 2, ayahs 8-17 (munāfiqūn — stolen light) ──
  {
    record: {
      surah_number: 2,
      ayah_start: 8,
      ayah_end: 17,
      arabic_text:
        'وَمِنَ ٱلنَّاسِ مَن يَقُولُ ءَامَنَّا بِٱللَّهِ وَبِٱلْيَوْمِ ٱلْءَاخِرِ وَمَا هُم بِمُؤْمِنِينَ ۝ مَثَلُهُمْ كَمَثَلِ ٱلَّذِى ٱسْتَوْقَدَ نَارًا فَلَمَّآ أَضَآءَتْ مَا حَوْلَهُۥ ذَهَبَ ٱللَّهُ بِنُورِهِمْ وَتَرَكَهُمْ فِى ظُلُمَـٰتٍ لَّا يُبْصِرُونَ',
      translation:
        "And of the people are some who say, 'We believe in Allah and the Last Day,' but they are not believers. They think to deceive Allah and those who believe, but they deceive not except themselves... Their example is that of one who kindled a fire, but when it illuminated what was around him, Allah took away their light and left them in darknesses — they could not see.",
      title:
        'The Stolen Light — When Hypocrisy Receives Five Times More Attention Than Disbelief',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/002-al-baqarah/ayahs-006-017.md')
        ),
      },
    },
    entitySlugs: ['nifaq', 'bani-israil'],
  },

  // ── 2. Surah 2, ayahs 58-59 ─────────────────────────
  {
    record: {
      surah_number: 2,
      ayah_start: 58,
      ayah_end: 59,
      arabic_text:
        'وَإِذْ قُلْنَا ٱدْخُلُوا۟ هَـٰذِهِ ٱلْقَرْيَةَ فَكُلُوا۟ مِنْهَا حَيْثُ شِئْتُمْ رَغَدًا وَٱدْخُلُوا۟ ٱلْبَابَ سُجَّدًا وَقُولُوا۟ حِطَّةٌ نَّغْفِرْ لَكُمْ خَطَـٰيَـٰكُمْ ۚ وَسَنَزِيدُ ٱلْمُحْسِنِينَ ۝ فَبَدَّلَ ٱلَّذِينَ ظَلَمُوا۟ قَوْلًا غَيْرَ ٱلَّذِى قِيلَ لَهُمْ فَأَنزَلْنَا عَلَى ٱلَّذِينَ ظَلَمُوا۟ رِجْزًا مِّنَ ٱلسَّمَآءِ بِمَا كَانُوا۟ يَفْسُقُونَ',
      translation:
        "And [recall] when We said, 'Enter this city and eat from it wherever you will in ease, and enter the gate bowing humbly and say, \"Relieve us of our burdens.\" We will forgive your sins, and We will increase the doers of good.' But those who wronged changed the word to something other than what they were told, so We sent down upon the wrongdoers punishment from the sky because they were defiantly disobedient.",
      title:
        'The One Word That Would Have Saved Them — And the Word They Said Instead',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/002-al-baqarah/ayahs-058-059.md')
        ),
      },
    },
    entitySlugs: ['bani-israil'],
  },

  // ── 3. Surah 3, ayah 56 ─────────────────────────────
  {
    record: {
      surah_number: 3,
      ayah_start: 56,
      ayah_end: 56,
      arabic_text:
        'فَأَمَّا ٱلَّذِينَ كَفَرُوا۟ فَأُعَذِّبُهُمْ عَذَابًا شَدِيدًا فِى ٱلدُّنْيَا وَٱلْـَٔاخِرَةِ وَمَا لَهُم مِّن نَّـٰصِرِينَ',
      translation:
        'As for those who disbelieve, I will subject them to a severe punishment in this life and the Hereafter, and they will have no helpers.',
      title: 'The Verdict That Leaves No Backup',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/003-aal-imran/ayah-056.md')
        ),
      },
    },
    entitySlugs: ['iman'],
  },

  // ── 4. Surah 88, ayahs 2-7 ──────────────────────────
  {
    record: {
      surah_number: 88,
      ayah_start: 2,
      ayah_end: 7,
      arabic_text:
        'وُجُوهٌ يَوْمَئِذٍ خَـٰشِعَةٌ ﴿٢﴾ عَامِلَةٌ نَّاصِبَةٌ ﴿٣﴾ تَصْلَىٰ نَارًا حَامِيَةً ﴿٤﴾ تُسْقَىٰ مِنْ عَيْنٍ ءَانِيَةٍ ﴿٥﴾ لَّيْسَ لَهُمْ طَعَامٌ إِلَّا مِن ضَرِيعٍ ﴿٦﴾ لَّا يُسْمِنُ وَلَا يُغْنِى مِن جُوعٍ ﴿٧﴾',
      translation:
        'Faces that Day will be humbled — working hard, exhausted — entering blazing fire — given drink from a boiling spring — no food for them except bitter thorns — which neither nourish nor satisfy hunger.',
      title:
        'The Anti-Feast — Faces That Worked for Nothing and Ate What Cannot Nourish',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/088-al-ghashiyah/ayahs-002-007.md')
        ),
      },
    },
    entitySlugs: ['jahannam', 'akhirah'],
  },

  // ── 5. Surah 88, ayahs 8-16 ─────────────────────────
  {
    record: {
      surah_number: 88,
      ayah_start: 8,
      ayah_end: 16,
      arabic_text:
        'وُجُوهٌ يَوْمَئِذٍ نَّاعِمَةٌ ﴿٨﴾ لِّسَعْيِهَا رَاضِيَةٌ ﴿٩﴾ فِى جَنَّةٍ عَالِيَةٍ ﴿١٠﴾ لَّا تَسْمَعُ فِيهَا لَـٰغِيَةً ﴿١١﴾ فِيهَا عَيْنٌ جَارِيَةٌ ﴿١٢﴾ فِيهَا سُرُرٌ مَّرْفُوعَةٌ ﴿١٣﴾ وَأَكْوَابٌ مَّوْضُوعَةٌ ﴿١٤﴾ وَنَمَارِقُ مَصْفُوفَةٌ ﴿١٥﴾ وَزَرَابِىُّ مَبْثُوثَةٌ ﴿١٦﴾',
      translation:
        'Faces that Day will be radiant — with their striving satisfied — in an elevated garden — where no idle talk is heard — within it a flowing spring — within it raised couches — and cups set in place — and cushions lined up — and carpets spread out.',
      title:
        'The Table Already Set — Faces That Worked for Something That Lasted',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/088-al-ghashiyah/ayahs-008-016.md')
        ),
      },
    },
    entitySlugs: ['jannah', 'akhirah'],
  },

  // ── 6. Surah 88, ayahs 17-20 ────────────────────────
  {
    record: {
      surah_number: 88,
      ayah_start: 17,
      ayah_end: 20,
      arabic_text:
        'أَفَلَا يَنظُرُونَ إِلَى ٱلْإِبِلِ كَيْفَ خُلِقَتْ ﴿١٧﴾ وَإِلَى ٱلسَّمَآءِ كَيْفَ رُفِعَتْ ﴿١٨﴾ وَإِلَى ٱلْجِبَالِ كَيْفَ نُصِبَتْ ﴿١٩﴾ وَإِلَى ٱلْأَرْضِ كَيْفَ سُطِحَتْ ﴿٢٠﴾',
      translation:
        'Do they not look at the camels — how they were created? And at the sky — how it was raised? And at the mountains — how they were set firm? And at the earth — how it was spread out?',
      title:
        'The 360-Degree Classroom — When Allah Points at What You Already See',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/088-al-ghashiyah/ayahs-017-020.md')
        ),
      },
    },
    entitySlugs: ['iman'],
  },

  // ── 7. Surah 88, ayahs 21-26 ────────────────────────
  {
    record: {
      surah_number: 88,
      ayah_start: 21,
      ayah_end: 26,
      arabic_text:
        'فَذَكِّرْ إِنَّمَآ أَنتَ مُذَكِّرٌ ﴿٢١﴾ لَّسْتَ عَلَيْهِم بِمُصَيْطِرٍ ﴿٢٢﴾ إِلَّا مَن تَوَلَّىٰ وَكَفَرَ ﴿٢٣﴾ فَيُعَذِّبُهُ ٱللَّهُ ٱلْعَذَابَ ٱلْأَكْبَرَ ﴿٢٤﴾ إِنَّ إِلَيْنَآ إِيَابَهُمْ ﴿٢٥﴾ ثُمَّ إِنَّ عَلَيْنَا حِسَابَهُمْ ﴿٢٦﴾',
      translation:
        'So remind — you are only a reminder. You are not over them a controller. But whoever turns away and disbelieves — then Allah will punish him with the greatest punishment. Indeed, to Us is their return. Then indeed, upon Us is their account.',
      title:
        'The Reminder and the Return — You Cannot Force Faith, but the Account Is Coming',
      status: 'published',
      layer_a: {
        linguistic_html: readBody(
          path.join(PROJECT_ROOT, 'content/tadabbur/088-al-ghashiyah/ayahs-021-026.md')
        ),
      },
    },
    entitySlugs: ['iman', 'qadar'],
  },
]

// ─────────────────────────────────────────────────────
// MAIN
// ─────────────────────────────────────────────────────

async function main() {
  console.log('=== Inserting Missing Tadabbur Records ===\n')

  for (const task of tasks) {
    await insertAyahRecord(task.record, task.entitySlugs)
  }

  // Refresh co-occurrence cache
  console.log('\n--- Refreshing entity co-occurrence ---')
  const { error } = await supabase.rpc('refresh_entity_co_occurrence')
  if (error) {
    console.error('✗ Failed to refresh co-occurrence:', error.message)
  } else {
    console.log('✓ Co-occurrence refreshed')
  }

  console.log('\n=== Done ===')
}

main().catch(console.error)
