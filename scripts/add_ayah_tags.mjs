#!/usr/bin/env node
/**
 * ADD [ayah:S:A] TAGS — close the verify_arabic blind spot
 * =========================================================
 * 2,270 of 3,016 tadabbur files (75%) carry no `[ayah:S:A]` tag, so
 * `verify_arabic` has nothing to check in them and they pass vacuously.
 * The validator is correct; it is simply never given the text.
 *
 * This tags Arabic lines that ALREADY sit in the body, so the verifier can
 * see them. It does not add, translate, or alter any Quranic text.
 *
 * SAFETY INVARIANT — a line is tagged ONLY when its folded form is exactly
 * equal to the folded canonical text of a verse inside the file's own declared
 * ayah_start..ayah_end range. No fuzzy matching, no nearest-neighbour, no
 * guessing. A line that merely resembles a verse is left alone and counted as
 * a near-miss, because "resembles" is precisely how an elision or a fabricated
 * quotation would sneak through — and those are the two defect classes that
 * already survived every automated pass in this corpus.
 *
 * Usage:
 *   node scripts/add_ayah_tags.mjs --dry            # report only, whole corpus
 *   node scripts/add_ayah_tags.mjs --all            # apply
 *   node scripts/add_ayah_tags.mjs <file.md ...>    # apply to named files
 */
import { QuranValidator } from 'quran-validator';
import { readFileSync, writeFileSync, globSync } from 'node:fs';

const v = new QuranValidator();
const cache = new Map();
function canonical(s, a) {
  const k = `${s}:${a}`;
  if (!cache.has(k)) {
    const r = v.getVerse(s, a);
    cache.set(k, r && r.text ? r.text.trim() : null);
  }
  return cache.get(k);
}

const MARKS = /[ً-ٰٟۖ-ۭـࣰ-ࣿ]/g;
const fold = (t) =>
  t
    .replace(MARKS, '')
    .replace(/[آأإٱ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .replace(/ؤ/g, 'و')
    .replace(/ئ/g, 'ي')
    .replace(/ء/g, '')
    .replace(/[٠-٩]/g, '')
    .replace(/[^؀-ۿ]/g, '')
    .trim();

const args = process.argv.slice(2);
const dry = args.includes('--dry');
let files = args.filter((a) => !a.startsWith('--'));
if (!files.length)
  files = globSync('content/tadabbur/**/*.md').filter(
    (f) => !/tafsir[-_]report[-_]/.test(f) && !/_superseded/.test(f)
  );

let scanned = 0, changed = 0, tagged = 0, nearMiss = 0;
const misses = [];

for (const file of files) {
  let text;
  try { text = readFileSync(file, 'utf8'); } catch { continue; }
  if (/\[ayah:\d+:\d+\]/.test(text)) continue; // already tagged — leave alone
  const fm = text.match(/^---\n([\s\S]*?)\n---\n/);
  if (!fm) continue;
  const s = fm[1].match(/^surah:\s*(\d+)/m);
  const a1 = fm[1].match(/^ayah_start:\s*(\d+)/m);
  const a2 = fm[1].match(/^ayah_end:\s*(\d+)/m);
  if (!s || !a1) continue;
  scanned++;

  const surah = +s[1], start = +a1[1], end = a2 ? +a2[1] : +a1[1];
  // fold -> ayah number, for every verse this file declares
  const want = new Map();
  for (let a = start; a <= end; a++) {
    const c = canonical(surah, a);
    if (c) want.set(fold(c), a);
  }
  if (!want.size) continue;

  const head = text.slice(0, fm.index + fm[0].length);
  const body = text.slice(fm.index + fm[0].length);
  const lines = body.split('\n');
  const done = new Set();
  let hit = 0;

  for (let i = 0; i < lines.length; i++) {
    const raw = lines[i];
    const line = raw.trim();
    if (!line || line.startsWith('<!--') || line.startsWith('#')) continue;
    // Separate the markdown wrapper from the Arabic, so the tag can be inserted
    // WITHOUT changing how the line renders. A blockquoted verse stays
    // blockquoted ("> text" -> "> [ayah:S:A] text"); bold stays bold.
    const pm = raw.match(/^(\s*(?:>\s*)?)([*_]{0,2})([\s\S]*?)([*_]{0,2})\s*$/);
    const prefix = pm ? pm[1] : '';
    const open = pm ? pm[2] : '';
    const close = pm ? pm[4] : '';
    const bare = (pm ? pm[3] : line).trim();
    if (!/[؀-ۿ]/.test(bare)) continue;
    const f = fold(bare);
    if (!f) continue;
    if (want.has(f) && !done.has(want.get(f))) {
      // Only the FIRST occurrence. Reflections routinely re-quote a verse later
      // for discussion; tagging every copy would double-count the ayah for any
      // consumer that reads coverage off these tags.
      const a = want.get(f);
      done.add(a);
      lines[i] = `${prefix}[ayah:${surah}:${a}] ${open}${bare}${close}`;
      hit++;
    } else if (f.length > 25 && !want.has(f)) {
      // Arabic that looks verse-length but matches nothing in range.
      for (const [wf, wa] of want) {
        if (wf.includes(f) || f.includes(wf)) {
          nearMiss++;
          misses.push(`${file}  ${surah}:${wa}  (partial/near match — NOT tagged)`);
          break;
        }
      }
    }
  }

  if (hit) {
    tagged += hit;
    changed++;
    if (!dry) writeFileSync(file, head + lines.join('\n'));
  }
}

console.log(
  `${dry ? '[dry] ' : ''}untagged files scanned: ${scanned}  files tagged: ${changed}  verses tagged: ${tagged}`
);
console.log(`near-misses left untagged (partial/elided Arabic — need a human): ${nearMiss}`);
for (const m of misses.slice(0, 30)) console.log(`  ${m}`);
