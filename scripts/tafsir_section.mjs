#!/usr/bin/env node
/**
 * TAFSIR SECTION EXTRACTOR — read only the ayahs you need
 * =======================================================
 * After the 2026-07-28 regeneration, reports are complete but large: median 30 KB,
 * 178 reports over 150 KB, largest 892 KB (34 ayahs x 4 commentators). Handing a
 * whole report to an agent wastes most of its context on ayahs it isn't writing
 * about — and in practice caused API 529s.
 *
 * A report's size comes from breadth (many cross-referenced ayahs), not depth. An
 * agent writing on 2:183-187 needs those five sections, not the thirty-four the
 * report accumulated.
 *
 * Usage:
 *   node scripts/tafsir_section.mjs <report.md> 2:183,2:184,2:185
 *   node scripts/tafsir_section.mjs <report.md> --own      # the paired file's own range
 *   node scripts/tafsir_section.mjs <report.md> --list     # just show what's inside
 */
import { readFileSync, existsSync } from 'node:fs';

const [report, spec] = process.argv.slice(2);
if (!report || !existsSync(report)) {
  console.error('usage: tafsir_section.mjs <report.md> <S:A,S:A|--own|--list>');
  process.exit(2);
}
const text = readFileSync(report, 'utf8');
const head = text.split(/\n##\s+\d+:\d+\s*\n/)[0];

const parts = text.split(/\n##\s+(\d+:\d+)\s*\n/);
const sections = new Map();
for (let i = 1; i < parts.length; i += 2) sections.set(parts[i], parts[i + 1]);

if (spec === '--list' || !spec) {
  console.log(`${report}`);
  console.log(`sections: ${sections.size}   file size: ${(text.length / 1000).toFixed(1)} KB\n`);
  for (const [ref, body] of sections) {
    const srcs = [...body.matchAll(/###\s+([^\n]+)/g)].map((m) => m[1].trim());
    console.log(`  ${ref.padEnd(9)} ${(body.length / 1000).toFixed(1).padStart(6)} KB   ${srcs.join(' | ')}`);
  }
  process.exit(0);
}

let want;
if (spec === '--own') {
  // the paired tadabbur file's declared range — the sections that are actually "about" it
  const tad = report.replace(/tafsir-report-(.+)\.md$/, (_, r) =>
    r.includes('-') ? `ayahs-${r}.md` : `ayah-${r}.md`
  );
  if (!existsSync(tad)) { console.error(`no paired tadabbur file: ${tad}`); process.exit(1); }
  const t = readFileSync(tad, 'utf8');
  const fm = t.match(/^---\n([\s\S]*?)\n---/);
  const s = fm && fm[1].match(/^surah:\s*(\d+)/m);
  const a1 = fm && fm[1].match(/^ayah_start:\s*(\d+)/m);
  const a2 = fm && fm[1].match(/^ayah_end:\s*(\d+)/m);
  if (!s || !a1) { console.error('cannot read surah/ayah_start from the paired file'); process.exit(1); }
  want = [];
  const end = a2 ? +a2[1] : +a1[1];
  for (let a = +a1[1]; a <= end; a++) want.push(`${+s[1]}:${a}`);
} else {
  want = spec.split(',').map((x) => x.trim()).filter(Boolean);
}

const missing = want.filter((r) => !sections.has(r));
let out = head.trimEnd() + '\n';
out += `\n[SECTION EXTRACT — ${want.length} of ${sections.size} sections from ${report}]\n`;
if (missing.length) out += `[NOT IN THIS REPORT: ${missing.join(', ')} — absence here is not evidence about the source]\n`;
for (const ref of want) {
  if (!sections.has(ref)) continue;
  out += `\n## ${ref}\n${sections.get(ref)}`;
}
process.stdout.write(out);
