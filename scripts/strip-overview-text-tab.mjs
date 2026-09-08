#!/usr/bin/env node
/**
 * Removes the "Text" tab from the 114 static overview pages in src/data/visual/.
 *
 *   node scripts/strip-overview-text-tab.mjs            # dry run
 *   node scripts/strip-overview-text-tab.mjs --apply
 *
 * Same reasoning as the surah page: reproducing the mushaf is not this page's job,
 * and it was ~0.5 MB of the bundle. But the tab is not the same thing everywhere:
 *
 *   - 98 files render FullSurahText  -> tab removed; the heart verse (and the
 *                                       recitation player, where present) now render
 *                                       under whichever tab is open, so nothing is lost.
 *   - 12 files render a SectionMap   -> that is a structural map, not the text. The tab
 *                                       stays; only its label changes from "Text" to "Map".
 *   -  3 files render only the heart verse -> tab removed, heart verse kept as above.
 *
 * Every file is classified before it is touched and skipped if it does not match.
 */
import fs from 'fs'
const APPLY=process.argv.includes('--apply')
const DIR='src/data/visual'
const TEXT_BLOCK=/\{activeTab === "text" && \(\s*<div className="space-y-6">([\s\S]*?)<\/div>\s*\)\}/
const TAB_ENTRY=/\s*\{ id: "text", label: "Text" \},?/
const counts={fullText:0,map:0,heartOnly:0,skipped:[]}

for (const f of fs.readdirSync(DIR).filter(x=>x.endsWith('.tsx')).sort()) {
  const p=`${DIR}/${f}`
  let s=fs.readFileSync(p,'utf8')
  const m=s.match(TEXT_BLOCK)
  if(!m){ counts.skipped.push(`${f} (no text block)`); continue }
  const inner=m[1]
  const hasFullText=/<FullSurahText\b/.test(inner)
  const hasMap=/<SectionMap(Text)?\b/.test(inner)

  if (hasMap) {                                  // keep the tab, fix the misleading label
    if(!/\{ id: "text", label: "Text" \}/.test(s)){ counts.skipped.push(`${f} (map, no tab entry)`); continue }
    s=s.replace('{ id: "text", label: "Text" }','{ id: "text", label: "Map" }')
    counts.map++
  } else {                                       // drop the tab; keep what is worth keeping
    const keep=inner
      .replace(/\s*<FullSurahText[^/]*\/>/g,'')
      .replace(/^\s*<OrnamentDivider \/>\s*/,'')  // leading divider had nothing left above it
      .trim()
    if(!/<HeartVerse\b/.test(keep)){ counts.skipped.push(`${f} (nothing left to keep)`); continue }
    const replacement=`<div className="space-y-6 pt-6 border-t border-white/[0.06]">${keep}</div>`
    s=s.replace(TEXT_BLOCK,replacement)
    if(!TAB_ENTRY.test(s)){ counts.skipped.push(`${f} (no tab entry)`); continue }
    s=s.replace(TAB_ENTRY,'')
    hasFullText?counts.fullText++:counts.heartOnly++
  }

  // guards: the tab must be gone (unless relabelled) and the heart verse must survive
  if(!hasMap && /id: "text"/.test(s)){ console.error(`${f}: tab entry survived`); process.exit(1) }
  if(!/<HeartVerse\b/.test(s)){ console.error(`${f}: heart verse lost`); process.exit(1) }
  if(!hasMap && /<FullSurahText\s/.test(s)){ console.error(`${f}: FullSurahText still rendered`); process.exit(1) }
  if(APPLY) fs.writeFileSync(p,s)
}
console.log(`${APPLY?'APPLIED':'DRY RUN'}\n`)
console.log('  mushaf removed, heart verse kept   ', counts.fullText)
console.log('  heart-verse-only tab removed       ', counts.heartOnly)
console.log('  section map kept, relabelled "Map" ', counts.map)
console.log('  skipped                            ', counts.skipped.length)
counts.skipped.forEach(x=>console.log('     '+x))
if(!APPLY) console.log('\nNothing written. Re-run with --apply.')
