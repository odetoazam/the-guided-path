/**
 * reflection-render.ts
 *
 * The 182 rows in `ayah_records` hold the deepest content on the site — an average
 * of 15k characters of linguistic analysis (layer_a.linguistic_html) plus 9k of
 * thematic reflection (layer_b.reflection_html) each. Despite the `_html` column
 * names the stored text is Markdown, produced by the tadabbur pipeline, and it uses
 * exactly three constructs beyond ordinary Markdown:
 *
 *   [ayah:94:5] ARABIC TEXT   — an ayah citation line; the Arabic follows on the
 *                               same line and should be set as a quoted block.
 *   [PAUSE]                   — a contemplation beat from the guided-audio design.
 *                               On the page it becomes a breath mark, not literal text.
 *   <!-- ... -->              — pipeline scaffolding (grounding tables, notes).
 *                               Never displayed.
 *
 * A corpus scan over all 182 records found no other bracket tags, and only
 * section/div/blockquote/p/cite as raw HTML. Everything else is Markdown:
 * ATX headings, tables, bullet and ordered lists, `---` rules, and
 * bold/italic/bold-italic emphasis (including Arabic inside emphasis).
 */
import sanitizeHtml from 'sanitize-html'
import { ayahRef } from '@/lib/reflection-slug'

export { reflectionSlug, parseReflectionSlug, ayahRef } from '@/lib/reflection-slug'

// ─── Inline formatting ──────────────────────────────────────────────────────

const ESCAPES: Record<string, string> = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
}

function escapeHtml(text: string): string {
  return text.replace(/[&<>"]/g, (c) => ESCAPES[c])
}

/** Arabic script, so a run can be wrapped for the Amiri face and RTL shaping. */
const ARABIC_RUN = /([؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿][؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿\sً-ْٰۖ-ۭ.,!?"'—–-]*[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]|[؀-ۿ])/g

function wrapArabic(html: string): string {
  return html.replace(ARABIC_RUN, '<span class="ar" dir="rtl">$1</span>')
}

/**
 * Emphasis, resolved by toggling on runs of asterisks rather than by matching
 * pairs. The corpus nests freely — `**The verb: *ishta'ala.***` closes bold and
 * italic with a single run of three — which pair-matching regexes get wrong,
 * stranding literal asterisks in the prose. A toggle also guarantees balanced
 * output: anything still open at the end is closed here.
 */
function renderEmphasis(escaped: string): string {
  const parts = escaped.split(/(\*{1,3})/)
  let bold = false
  let italic = false
  let out = ''

  const openBold = () => { out += '<strong>'; bold = true }
  const openItalic = () => { out += '<em>'; italic = true }
  const closeBold = () => { out += '</strong>'; bold = false }
  const closeItalic = () => { out += '</em>'; italic = false }

  for (const part of parts) {
    if (!/^\*{1,3}$/.test(part)) {
      out += part
      continue
    }
    if (part.length === 1) {
      if (italic) closeItalic()
      else openItalic()
    } else if (part.length === 2) {
      // Close the italic first if it opened inside this bold span, so tags nest.
      if (bold) closeBold()
      else openBold()
    } else {
      if (bold && italic) {
        closeItalic()
        closeBold()
      } else if (!bold && !italic) {
        openBold()
        openItalic()
      } else if (bold) {
        openItalic()
      } else {
        closeItalic()
        openBold()
      }
    }
  }

  if (italic) out += '</em>'
  if (bold) out += '</strong>'
  return out
}

/**
 * Inline formatting. Applied after escaping, so the only markup present is
 * what we introduce.
 */
export function renderInline(text: string, opts: { arabic?: boolean } = {}): string {
  let out = escapeHtml(text)
  out = renderEmphasis(out)
  out = out.replace(/`([^`]+)`/g, '<code>$1</code>')
  // An ayah tag can also appear mid-sentence ("look at the command itself:
  // [ayah:94:7] فَٱنصَبْ"), where it is a citation rather than a block quote.
  out = out.replace(
    /\[ayah:(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\]/g,
    (_m, s, a, b) => `<span class="reflection-ayah-inline">${ayahRef(+s, +a, b ? +b : +a)}</span>`
  )
  // [text](href) — internal links only; the corpus contains no external ones.
  out = out.replace(/\[([^\]]+)\]\((\/[^)\s]*)\)/g, '<a href="$2">$1</a>')
  return opts.arabic === false ? out : wrapArabic(out)
}

// ─── Block rendering ────────────────────────────────────────────────────────

const AYAH_LINE = /^\[ayah:(\d{1,3}):(\d{1,3})(?:-(\d{1,3}))?\]\s*(.*)$/
const PAUSE_LINE = /^\[PAUSE\]\s*$/

// Matches the site's existing convention for a contemplation beat, already
// styled as .pause-divider in globals.css and emitted by ArticleContent and
// SurahTabs. Reused here so a reflection reads like the rest of the site.
const PAUSE_MARK = '<div class="pause-divider" aria-hidden="true"><span>· · ·</span></div>'

function renderTable(rows: string[]): string {
  const cells = (row: string) =>
    row
      .trim()
      .replace(/^\|/, '')
      .replace(/\|$/, '')
      .split('|')
      .map((c) => c.trim())

  const isDivider = (row: string) => /^\s*\|?[\s:|-]+\|[\s:|-]*$/.test(row)

  const header = cells(rows[0])
  const bodyRows = rows.slice(isDivider(rows[1] ?? '') ? 2 : 1).filter((r) => !isDivider(r))

  const thead = `<thead><tr>${header
    .map((c) => `<th>${renderInline(c)}</th>`)
    .join('')}</tr></thead>`
  const tbody = `<tbody>${bodyRows
    .map((r) => `<tr>${cells(r).map((c) => `<td>${renderInline(c)}</td>`).join('')}</tr>`)
    .join('')}</tbody>`

  // Wrapped so a wide grammar table scrolls itself instead of the page.
  return `<div class="reflection-table-wrap"><table>${thead}${tbody}</table></div>`
}

const ALLOWED_RAW = sanitizeHtml.defaults.allowedTags.concat(['section', 'cite', 'span'])

/**
 * Convert one stored Markdown body to HTML.
 *
 * `citedRefs` collects every [ayah:...] reference encountered, so the page can
 * report which verses it actually quotes without re-parsing.
 */
export function renderReflectionMarkdown(
  markdown: string,
  citedRefs?: Set<string>
): string {
  if (!markdown?.trim()) return ''

  // Pipeline scaffolding never reaches the page. A [PAUSE] that trails a
  // sentence ("Let this land. [PAUSE]") is lifted onto its own line so the
  // block loop below can turn it into a breath mark instead of leaving it
  // sitting in the prose.
  const source = markdown
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/[ \t]*\[PAUSE\][ \t]*/g, '\n\n[PAUSE]\n\n')

  const lines = source.split('\n')
  const out: string[] = []
  let paragraph: string[] = []
  let listItems: string[] = []
  let listTag: 'ul' | 'ol' | null = null
  let tableRows: string[] = []

  const flushParagraph = () => {
    if (!paragraph.length) return
    const text = paragraph.join(' ').trim()
    paragraph = []
    if (text) out.push(`<p>${renderInline(text)}</p>`)
  }

  const flushList = () => {
    if (!listItems.length || !listTag) return
    out.push(`<${listTag}>${listItems.map((i) => `<li>${renderInline(i)}</li>`).join('')}</${listTag}>`)
    listItems = []
    listTag = null
  }

  const flushTable = () => {
    if (!tableRows.length) return
    out.push(renderTable(tableRows))
    tableRows = []
  }

  const flushAll = () => {
    flushParagraph()
    flushList()
    flushTable()
  }

  for (const rawLine of lines) {
    const line = rawLine.replace(/\s+$/, '')

    // Table rows accumulate until a non-table line closes the block.
    if (/^\s*\|/.test(line)) {
      flushParagraph()
      flushList()
      tableRows.push(line)
      continue
    }
    if (tableRows.length) flushTable()

    if (!line.trim()) {
      flushAll()
      continue
    }

    const ayah = line.match(AYAH_LINE)
    if (ayah) {
      flushAll()
      const [, s, start, end, arabic] = ayah
      const ref = ayahRef(parseInt(s, 10), parseInt(start, 10), end ? parseInt(end, 10) : parseInt(start, 10))
      citedRefs?.add(ref)
      // The payload after the tag is usually the Arabic, but some records put a
      // translation there instead ("[ayah:94:1] *Did We not expand your chest?*").
      // Emphasis has to be resolved either way — a few Arabic lines bold a word.
      const payload = arabic.trim()
      const hasArabic = /[؀-ۿݐ-ݿﭐ-﷿ﹰ-﻿]/.test(payload)
      const body = payload
        ? hasArabic
          ? `<p class="reflection-ayah-arabic" dir="rtl">${renderInline(payload, { arabic: false })}</p>`
          : `<p class="reflection-ayah-gloss">${renderInline(payload)}</p>`
        : ''
      out.push(
        `<blockquote class="reflection-ayah"><span class="reflection-ayah-ref">${ref}</span>${body}</blockquote>`
      )
      continue
    }

    if (PAUSE_LINE.test(line)) {
      flushAll()
      out.push(PAUSE_MARK)
      continue
    }

    const heading = line.match(/^(#{1,6})\s+(.*)$/)
    if (heading) {
      flushAll()
      // The page's own <h1> is the record title, so a stored "# ..." is clamped
      // to <h2> rather than emitting a second <h1>. Deeper levels keep their
      // depth, which leaves "Part 1 / Part 2" at h2 and their sections at h3.
      const level = Math.min(Math.max(heading[1].length, 2), 6)
      out.push(`<h${level}>${renderInline(heading[2].trim())}</h${level}>`)
      continue
    }

    if (/^(---|\*\*\*|___)\s*$/.test(line)) {
      flushAll()
      out.push('<hr />')
      continue
    }

    const bullet = line.match(/^\s*[-*]\s+(.*)$/)
    if (bullet) {
      flushParagraph()
      if (listTag && listTag !== 'ul') flushList()
      listTag = 'ul'
      listItems.push(bullet[1])
      continue
    }

    const ordered = line.match(/^\s*\d+\.\s+(.*)$/)
    if (ordered) {
      flushParagraph()
      if (listTag && listTag !== 'ol') flushList()
      listTag = 'ol'
      listItems.push(ordered[1])
      continue
    }

    if (/^>\s?/.test(line)) {
      flushAll()
      out.push(`<blockquote>${renderInline(line.replace(/^>\s?/, ''))}</blockquote>`)
      continue
    }

    // A handful of records embed raw HTML blocks; pass them through sanitized.
    if (/^<\/?[a-z]/i.test(line)) {
      flushAll()
      out.push(sanitizeHtml(line, { allowedTags: ALLOWED_RAW, allowedAttributes: { '*': ['class', 'dir', 'href'] } }))
      continue
    }

    flushList()
    paragraph.push(line.trim())
  }

  flushAll()
  return out.join('\n')
}

/**
 * The two layers are one document: layer_a carries Introduction + Part 1
 * (the linguistic journey), layer_b carries Part 2 + Closing Synthesis.
 */
export function renderReflection(record: {
  layer_a?: { linguistic_html?: string | null } | null
  layer_b?: { reflection_html?: string | null } | null
}): { html: string; citedRefs: string[]; wordCount: number } {
  const citedRefs = new Set<string>()
  const parts = [
    renderReflectionMarkdown(record.layer_a?.linguistic_html ?? '', citedRefs),
    renderReflectionMarkdown(record.layer_b?.reflection_html ?? '', citedRefs),
  ].filter(Boolean)

  const html = parts.join('\n')
  const wordCount = html
    .replace(/<[^>]+>/g, ' ')
    .split(/\s+/)
    .filter(Boolean).length

  return { html, citedRefs: [...citedRefs], wordCount }
}

/** Display length of a record's prose, used to gate thin pages out of the sitemap. */
export function reflectionContentLength(record: {
  layer_a?: { linguistic_html?: string | null } | null
  layer_b?: { reflection_html?: string | null } | null
}): number {
  const a = record.layer_a?.linguistic_html ?? ''
  const b = record.layer_b?.reflection_html ?? ''
  return (a + b).replace(/<!--[\s\S]*?-->/g, '').trim().length
}
