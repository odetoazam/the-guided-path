#!/usr/bin/env node
/**
 * REGENERATE TAFSIR REPORTS — undo the 500-char truncation corpus-wide
 * =====================================================================
 * Every one of the 1,367 reports on disk was written by a generator that
 * truncated each commentator's block at 500 chars and printed fetch failures as
 * "*Not available for this ayah*". Measured 2026-07-27:
 *
 *   reports with at least one truncated block   1,359 / 1,367  (99.4%)
 *     al-Tabari truncated in                    1,354  <- cut exactly where he
 *                                                         states the ikhtilaf
 *   sections falsely claiming al-Jalalayn is
 *     "not available"                           4,952  (~92% of them are false;
 *                                                       he exists and refetches)
 *
 * That is the mechanism behind both content failure classes found in the audit:
 * theses that settle a disagreement without disclosing there is one, and
 * citations completed from memory past the cut.
 *
 * cross_reference_tafsir.mjs is fixed. This re-runs it over every report.
 *
 * SAFETY
 *   - reports are tracked in git, so every overwrite is recoverable
 *   - writes to a temp file and swaps only on success; a failed fetch leaves the
 *     existing report untouched rather than replacing it with a worse one
 *   - REFUSES to shrink: if the regenerated report has less Arabic than the one
 *     on disk, it is rejected and reported. Regeneration should only ever add.
 *   - resumable: --skip-fresh leaves alone any report already regenerated
 *   - a manifest of what changed is written for review
 *
 * Usage:
 *   node scripts/regenerate_tafsir_reports.mjs --limit 20      # try a slice
 *   node scripts/regenerate_tafsir_reports.mjs --skip-fresh    # resume
 *   node scripts/regenerate_tafsir_reports.mjs --dry
 */
import { readFileSync, writeFileSync, existsSync, globSync, unlinkSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const args = process.argv.slice(2);
const dry = args.includes('--dry');
const skipFresh = args.includes('--skip-fresh');
const li = args.indexOf('--limit');
const limit = li >= 0 ? parseInt(args[li + 1], 10) : Infinity;

const arabicLen = (s) => (s.match(/[؀-ۿ]/g) || []).length;

// Mirrors extractReferences() in cross_reference_tafsir.mjs: frontmatter range
// plus every [ayah:S:A] tag in the body.
function extractRefsFromTadabbur(path) {
  const t = readFileSync(path, 'utf8');
  const refs = new Set();
  const fm = t.match(/^---\n([\s\S]*?)\n---/);
  if (fm) {
    const s = fm[1].match(/^surah:\s*(\d+)/m);
    const a1 = fm[1].match(/^ayah_start:\s*(\d+)/m);
    const a2 = fm[1].match(/^ayah_end:\s*(\d+)/m);
    if (s && a1) {
      const end = a2 ? +a2[1] : +a1[1];
      for (let a = +a1[1]; a <= end; a++) refs.add(`${+s[1]}:${a}`);
    }
  }
  for (const m of t.matchAll(/\[ayah:(\d+):(\d+)\]/g)) refs.add(`${+m[1]}:${+m[2]}`);
  return [...refs];
}
const isFresh = (s) => !/\*Not available for this ayah\*/.test(s) && !/\.\.\.\s*$/m.test(s);

const reports = globSync('content/tadabbur/**/tafsir-report-*.md').sort();
let done = 0, skipped = 0, rejected = 0, failed = 0;
const manifest = [];

for (const rep of reports) {
  if (done + rejected + failed >= limit) break;
  const before = readFileSync(rep, 'utf8');
  if (skipFresh && isFresh(before)) { skipped++; continue; }

  // Regenerate from the TADABBUR FILE, not --surah/--ayahs. Two reasons, both
  // learned by breaking it first:
  //   1. --ayahs parses as a RANGE (split on '-'), so a comma list silently
  //      collapses to its first ayah. A pilot regenerated three Al-Fatiha reports
  //      to identical single-ayah content before the identical byte counts gave
  //      it away. (Reverted from git; this is why reports must stay tracked.)
  //   2. Reports legitimately carry CROSS-SURAH refs — tafsir-report-001.md holds
  //      both `## 1:1` and `## 9:128` because the reflection cites 9:128. The
  //      --surah/--ayahs form cannot express that, so using it would silently
  //      drop every cross-surah section. Passing the file lets extractReferences
  //      rebuild the same ref set the report was originally made from.
  const tad = rep.replace(/tafsir-report-(.+)\.md$/, (_, r) =>
    r.includes('-') ? `ayahs-${r}.md` : `ayah-${r}.md`
  );
  if (!existsSync(tad)) { skipped++; continue; }

  const tmp = `${rep}.regen.tmp`;
  try {
    if (dry) { manifest.push({ rep, tad, action: 'would-regen' }); done++; continue; }
    // Pass the UNION of the refs the old report covered and the refs the file
    // cites now. Regenerating from the file alone silently DROPS cross-surah
    // sections (al-Fatiha 1:1's report lost its 9:128 block that way in a pilot).
    // The size guard did not catch it, because untruncated blocks grew even as
    // coverage shrank — a reminder that "bigger" is not "complete".
    const oldRefs = [...before.matchAll(/\n##\s+(\d+):(\d+)\s*\n/g)].map((m) => `${m[1]}:${m[2]}`);
    const fileRefs = extractRefsFromTadabbur(tad);
    const union = [...new Set([...oldRefs, ...fileRefs])].sort((a, b) => {
      const [sa, aa] = a.split(':').map(Number);
      const [sb, ab] = b.split(':').map(Number);
      return sa - sb || aa - ab;
    });
    execFileSync(
      'node',
      ['scripts/cross_reference_tafsir.mjs', '--refs', union.join(','), '--output', tmp],
      { stdio: 'pipe', timeout: 300000 }
    );
    if (!existsSync(tmp)) { failed++; continue; }
    const after = readFileSync(tmp, 'utf8');
    const afterRefs = new Set(
      [...after.matchAll(/\n##\s+(\d+):(\d+)\s*\n/g)].map((m) => `${m[1]}:${m[2]}`)
    );
    const lostRefs = oldRefs.filter((r) => !afterRefs.has(r));
    if (lostRefs.length) {
      rejected++;
      manifest.push({ rep, action: 'REJECTED-lost-coverage', lostRefs });
      unlinkSync(tmp);
      continue;
    }

    // Regeneration must only ever ADD. If it would shrink the Arabic, something
    // went wrong upstream (rate limit, partial fetch) — keep what we have.
    if (arabicLen(after) < arabicLen(before)) {
      rejected++;
      manifest.push({ rep, action: 'REJECTED-would-shrink', before: arabicLen(before), after: arabicLen(after) });
      unlinkSync(tmp);
      continue;
    }
    writeFileSync(rep, after);
    unlinkSync(tmp);
    done++;
    manifest.push({ rep, action: 'regenerated', beforeArabic: arabicLen(before), afterArabic: arabicLen(after) });
  } catch (e) {
    failed++;
    if (existsSync(tmp)) unlinkSync(tmp);
    manifest.push({ rep, action: 'FETCH-FAILED', error: String(e.message || e).slice(0, 120) });
  }
  if (done % 25 === 0 && done) console.log(`  ...${done} regenerated`);
}

console.log(
  `${dry ? '[dry] ' : ''}regenerated: ${done}  skipped(fresh): ${skipped}  ` +
    `rejected(would shrink): ${rejected}  failed: ${failed}`
);
const grew = manifest.filter((m) => m.afterArabic > m.beforeArabic).length;
console.log(`reports that gained Arabic content: ${grew}`);
writeFileSync('scripts/review-v2/regen-manifest.json', JSON.stringify(manifest, null, 1));
console.log('manifest: scripts/review-v2/regen-manifest.json');
