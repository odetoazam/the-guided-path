#!/usr/bin/env npx tsx
/**
 * fix-malformed-posts.ts
 *
 * Converts raw tadabbur markdown stored in posts.content_html to proper HTML.
 * Also updates slugs from bare surah-ayah refs to title-based slugs.
 *
 * Run: npx tsx scripts/fix-malformed-posts.ts [--dry-run]
 */

import { createClient } from '@supabase/supabase-js'
import * as fs from 'fs'
import * as path from 'path'
import matter from 'gray-matter'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)
const DRY_RUN = process.argv.includes('--dry-run')

// ─── Source file map: old slug → { file, newSlug } ─────────────────────────

const POSTS_TO_FIX: Record<string, { file: string; newSlug: string }> = {
  '004-135': {
    file: 'content/tadabbur/004-an-nisa/ayah-135.md',
    newSlug: 'against-yourself-first',
  },
  '041-034-035': {
    file: 'content/tadabbur/041-fussilat/ayahs-034-035.md',
    newSlug: 'turn-your-enemy-into-your-closest-friend',
  },
  '057-016': {
    file: 'content/tadabbur/057-al-hadid/ayah-016.md',
    newSlug: 'has-the-time-not-come',
  },
}

// ─── HTML conversion ────────────────────────────────────────────────────────

function applyInline(text: string): string {
  // Bold before italic to avoid ** being caught by single *
  text = text.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
  text = text.replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
  // Escape any remaining raw brackets that aren't HTML
  text = text.replace(/\[(?!ayah:)([^\]]+)\]/g, (m, inner) => `[${inner}]`)
  return text
}

function buildAyahBlockquote(
  arabics: string[],
  transliteration: string,
  translation: string,
  surahName: string,
  surahNum: number,
  ayahStart: number,
  ayahEnd: number
): string {
  const citeRef =
    ayahStart === ayahEnd
      ? `${surahNum}:${ayahStart}`
      : `${surahNum}:${ayahStart}-${ayahEnd}`

  const arabicHtml = arabics
    .map(
      (a) =>
        `  <p class="arabic" dir="rtl" style="font-family: var(--font-amiri,'Amiri'),serif; font-size: 1.5rem; line-height: 2.2; color: rgba(201,168,76,0.85);">${a}</p>`
    )
    .join('\n')

  const translitHtml = transliteration
    ? `  <p class="transliteration" style="font-style:italic; color: rgba(161,161,170,0.8); font-size: 0.95rem; margin-top: 0.5rem;"><em>${transliteration}</em></p>`
    : ''

  const translationHtml = translation
    ? `  <p class="translation">${translation}</p>`
    : ''

  const citeHtml = `  <cite>${surahName} (${citeRef})</cite>`

  return `<blockquote class="ayah-quote">
${arabicHtml}
${translitHtml}
${translationHtml}
${citeHtml}
</blockquote>`
}

function processBodyBlock(block: string): string {
  block = block.trim()
  if (!block || block === '[PAUSE]') return ''
  if (block === '---') return '<hr>'

  // Remove inline [PAUSE] markers
  block = block.replace(/\[PAUSE\]/g, '').trim()
  if (!block) return ''

  if (block.startsWith('#### ')) return `<h5>${applyInline(block.slice(5))}</h5>`
  if (block.startsWith('### ')) return `<h4>${applyInline(block.slice(4))}</h4>`
  if (block.startsWith('## ')) return `<h3>${applyInline(block.slice(3))}</h3>`
  if (block.startsWith('# ')) return `<h2>${applyInline(block.slice(2))}</h2>`

  // Unordered list
  const listLines = block.split('\n')
  if (listLines.every((l) => l.trimStart().startsWith('- '))) {
    const items = listLines
      .map((l) => `  <li>${applyInline(l.replace(/^[\s]*-\s+/, ''))}</li>`)
      .join('\n')
    return `<ul>\n${items}\n</ul>`
  }

  // Ordered list
  if (listLines.every((l) => /^\d+\.\s/.test(l.trimStart()))) {
    const items = listLines
      .map((l) => `  <li>${applyInline(l.replace(/^\d+\.\s+/, ''))}</li>`)
      .join('\n')
    return `<ol>\n${items}\n</ol>`
  }

  // Multi-line paragraph — join lines
  const joined = listLines.join(' ')
  return `<p>${applyInline(joined)}</p>`
}

function tadabburToHtml(raw: string, fm: Record<string, unknown>): string {
  // 1. Strip morphology HTML comments
  let content = raw.replace(/<!--\s*morphology:[^\n]+-->\n?/g, '').trim()

  // 2. Split into ayah-header block and article body at first ---
  const sepIdx = content.indexOf('\n---\n')
  const ayahBlock = sepIdx >= 0 ? content.slice(0, sepIdx).trim() : ''
  const bodySection = sepIdx >= 0 ? content.slice(sepIdx + 5) : content

  // 3. Parse ayah block
  const arabics: string[] = []
  let transliteration = ''
  let translation = ''

  for (const line of ayahBlock.split('\n')) {
    const ayahMatch = line.match(/^\[ayah:\d+:\d+\]\s+(.+)$/)
    if (ayahMatch) {
      arabics.push(ayahMatch[1].trim())
      continue
    }
    const trimmed = line.trim()
    // Transliteration: *text* (starts and ends with single *)
    if (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**')) {
      transliteration = trimmed.slice(1, -1).trim()
      continue
    }
    // Translation: "text"
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      translation = trimmed.slice(1, -1).trim()
      continue
    }
  }

  const surahName = String(fm.surah_name || '')
  const surahNum = Number(fm.surah)
  const ayahStart = Number(fm.ayah_start)
  const ayahEnd = Number(fm.ayah_end)

  const ayahHtml =
    arabics.length > 0
      ? buildAyahBlockquote(arabics, transliteration, translation, surahName, surahNum, ayahStart, ayahEnd)
      : ''

  // 4. Convert body to HTML
  const bodyBlocks = bodySection.split(/\n\n+/)
  const bodyHtml = bodyBlocks.map(processBodyBlock).filter(Boolean).join('\n\n')

  return [ayahHtml, bodyHtml].filter(Boolean).join('\n\n')
}

// ─── Main ───────────────────────────────────────────────────────────────────

async function main() {
  if (DRY_RUN) console.log('DRY RUN — no DB writes\n')

  for (const [oldSlug, { file, newSlug }] of Object.entries(POSTS_TO_FIX)) {
    console.log(`\n→ Processing ${oldSlug} → ${newSlug}`)

    const filePath = path.resolve(process.cwd(), file)
    if (!fs.existsSync(filePath)) {
      console.error(`  ✗ Source file not found: ${filePath}`)
      continue
    }

    const raw = fs.readFileSync(filePath, 'utf-8')
    const { data: fm, content } = matter(raw)

    const contentHtml = tadabburToHtml(content, fm as Record<string, unknown>)

    console.log(`  ✓ Converted ${content.length} chars markdown → ${contentHtml.length} chars HTML`)

    if (DRY_RUN) {
      console.log('\n--- HTML PREVIEW (first 800 chars) ---')
      console.log(contentHtml.slice(0, 800))
      console.log('--- END ---\n')
      continue
    }

    // Check new slug isn't already taken
    const { data: existing } = await supabase
      .from('posts')
      .select('id, slug')
      .eq('slug', newSlug)
      .maybeSingle()

    if (existing && existing.slug !== oldSlug) {
      console.error(`  ✗ New slug "${newSlug}" already in use by another post — skipping slug update`)
    }

    const updatePayload: Record<string, unknown> = { content_html: contentHtml }
    if (!existing || existing.slug === oldSlug) {
      updatePayload.slug = newSlug
    }

    const { error } = await supabase
      .from('posts')
      .update(updatePayload)
      .eq('slug', oldSlug)

    if (error) {
      console.error(`  ✗ DB update failed:`, error.message)
    } else {
      console.log(`  ✓ Updated DB: slug="${newSlug}", content_html fixed`)
    }
  }

  console.log('\nDone.')
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
