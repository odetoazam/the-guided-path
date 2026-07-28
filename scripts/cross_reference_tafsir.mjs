#!/usr/bin/env node
/**
 * Tafsir Cross-Reference Report
 *
 * Takes a file containing Quranic ayah references and pulls classical tafsir
 * commentary for each cited ayah from the tafsir_api (spa5k/tafsir_api).
 *
 * Produces a cross-reference report showing what Ibn Kathir, al-Jalalayn, and
 * al-Muyassar say about each ayah — so you can verify whether the AI's
 * interpretation aligns with or diverges from classical scholarship.
 *
 * Usage:
 *   node cross_reference_tafsir.mjs <file>                    # Generate report
 *   node cross_reference_tafsir.mjs <file> --output report.md  # Save to file
 *   node cross_reference_tafsir.mjs --surah 15 --ayahs 1-5    # Direct lookup
 *
 * Data source: https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir/
 * No API key required. Free CDN-hosted.
 */

import { readFileSync, writeFileSync } from 'fs';

// ── Configuration ─────────────────────────────────────────────────────────

const TAFSIR_EDITIONS = [
  { slug: 'en-tafisr-ibn-kathir', name: 'Ibn Kathir (English)', lang: 'en' },
  { slug: 'ar-tafsir-al-tabari', name: 'al-Tabari (Arabic)', lang: 'ar' },
  { slug: 'ar-tafsir-muyassar', name: 'al-Muyassar (Arabic)', lang: 'ar' },
  { slug: 'ar-tafsir-al-jalalayn', name: 'al-Jalalayn (Arabic)', lang: 'ar' },
];

const CDN_BASE = 'https://cdn.jsdelivr.net/gh/spa5k/tafsir_api@main/tafsir';

// ── Parse arguments ───────────────────────────────────────────────────────

const args = process.argv.slice(2);
let file = null;
let outputFile = null;
let directSurah = null;
let directAyahs = null;

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--output' && args[i + 1]) { outputFile = args[++i]; }
  else if (args[i] === '--surah' && args[i + 1]) { directSurah = parseInt(args[++i]); }
  else if (args[i] === '--ayahs' && args[i + 1]) { directAyahs = args[++i]; }
  else if (!args[i].startsWith('--')) { file = args[i]; }
}

// ── Extract ayah references from file ─────────────────────────────────────

function extractReferences(content) {
  const refs = new Set();

  // Priority 1: read surah/ayah_start/ayah_end directly from YAML frontmatter
  const fmMatch = content.match(/^---\n([\s\S]*?)\n---/);
  if (fmMatch) {
    const fm = fmMatch[1];
    const surahM = fm.match(/^surah:\s*(\d+)/m);
    const startM = fm.match(/^ayah_start:\s*(\d+)/m);
    const endM   = fm.match(/^ayah_end:\s*(\d+)/m);
    if (surahM && startM) {
      const s = parseInt(surahM[1]);
      const a1 = parseInt(startM[1]);
      const a2 = endM ? parseInt(endM[1]) : a1;
      for (let a = a1; a <= a2; a++) refs.add(`${s}:${a}`);
    }
  }

  // Priority 2: explicit [ayah:S:A] tags in the body (not frontmatter)
  const bodyStart = content.indexOf('\n---\n', 4) + 5;
  const body = content.slice(bodyStart);
  const tagPattern = /\[ayah:(\d+):(\d+)\]/g;
  let match;
  while ((match = tagPattern.exec(body)) !== null) {
    const s = parseInt(match[1]);
    const a = parseInt(match[2]);
    if (s >= 1 && s <= 114 && a >= 1 && a <= 300) refs.add(`${s}:${a}`);
  }

  return [...refs].sort((a, b) => {
    const [sa, aa] = a.split(':').map(Number);
    const [sb, ab] = b.split(':').map(Number);
    return sa - sb || aa - ab;
  });
}

// ── Fetch tafsir for a single ayah ────────────────────────────────────────

async function fetchTafsir(edition, surah, ayah) {
  const url = `${CDN_BASE}/${edition.slug}/${surah}/${ayah}.json`;
  try {
    const response = await fetch(url);
    if (!response.ok) {
      // Try the surah-level endpoint and filter
      const surahUrl = `${CDN_BASE}/${edition.slug}/${surah}.json`;
      const surahResponse = await fetch(surahUrl);
      if (!surahResponse.ok) return null;
      const surahData = await surahResponse.json();
      // Look for the ayah in the array
      if (Array.isArray(surahData)) {
        const entry = surahData.find(e => e.ayah === ayah || e.verse_number === ayah || e.ayah_number === ayah);
        return entry ? (entry.text || entry.tafsir_text || JSON.stringify(entry)) : null;
      }
      return null;
    }
    const data = await response.json();
    return data.text || data.tafsir_text || (typeof data === 'string' ? data : null);
  } catch (e) {
    return null;
  }
}

// ── Generate report ───────────────────────────────────────────────────────

async function generateReport(refs) {
  const lines = [];
  lines.push('# Tafsir Cross-Reference Report');
  lines.push(`\nGenerated: ${new Date().toISOString().split('T')[0]}`);
  lines.push(`Ayahs referenced: ${refs.length}`);
  lines.push(`Tafsir sources: ${TAFSIR_EDITIONS.map(e => e.name).join(', ')}\n`);
  lines.push('---\n');

  for (const ref of refs) {
    const [surah, ayah] = ref.split(':').map(Number);
    lines.push(`## ${ref}\n`);

    for (const edition of TAFSIR_EDITIONS) {
      const text = await fetchTafsir(edition, surah, ayah);
      if (text) {
        // WAS: truncated at 500 chars "for readability". That single line is the
        // root cause of the false-thesis pattern audited on 2026-07-27. al-Tabari
        // states his ikhtilaf ("واختلف أهل التأويل في...") well past 500 chars, so
        // every report cut him off EXACTLY where the disagreement begins — and
        // writers then settled one side without knowing there was a side. It also
        // decapitated al-Jalalayn's hadith citations right where the matn starts,
        // inviting them to be completed from memory (that produced a fabricated
        // "the Prophet ﷺ recited this in tears", attributed to Bukhari and Muslim,
        // in 003-aal-imran/ayah-009.md).
        //
        // Readability is not worth a truncation that removes the disagreements.
        // Reports are read by agents, not skimmed by humans.
        const LIMIT = 12000;
        const truncated =
          text.length > LIMIT
            ? text.substring(0, LIMIT) +
              `\n\n[TRUNCATED at ${LIMIT} chars — ${text.length - LIMIT} more. ` +
              `Consult the source directly before relying on anything near the cut.]`
            : text;
        lines.push(`### ${edition.name}\n`);
        lines.push(truncated);
        lines.push('');
      } else {
        // Do NOT say "not available for this ayah" — that asserts a fact about the
        // SOURCE when all we know is that OUR FETCH returned nothing. al-Jalalayn is
        // marked unavailable in 4,952 report sections while in fact existing for
        // those ayahs; agents read that as "this commentator is silent here" and
        // wrote around a source that was actually available.
        lines.push(`### ${edition.name}\n`);
        lines.push(
          '*FETCH FAILED — this is a pipeline failure, NOT evidence that the ' +
            'commentator is silent on this ayah. Do not infer absence. Consult the ' +
            'source directly before concluding anything about what it does or does ' +
            'not say.*\n'
        );
      }
    }

    lines.push('---\n');
  }

  return lines.join('\n');
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  let refs;

  if (directSurah && directAyahs) {
    // Direct mode: --surah 15 --ayahs 1-5
    refs = [];
    const parts = directAyahs.split('-');
    const start = parseInt(parts[0]);
    const end = parts[1] ? parseInt(parts[1]) : start;
    for (let a = start; a <= end; a++) {
      refs.push(`${directSurah}:${a}`);
    }
  } else if (file) {
    const content = readFileSync(file, 'utf-8');
    refs = extractReferences(content);
  } else {
    console.error('Usage: node cross_reference_tafsir.mjs <file> [--output report.md]');
    console.error('       node cross_reference_tafsir.mjs --surah 15 --ayahs 1-5');
    process.exit(1);
  }

  console.log(`\n╔══════════════════════════════════════════════╗`);
  console.log(`║  Tafsir Cross-Reference Tool                 ║`);
  console.log(`╚══════════════════════════════════════════════╝\n`);
  console.log(`Found ${refs.length} ayah reference(s) to look up.\n`);

  if (refs.length === 0) {
    console.log('No ayah references found in the input.');
    process.exit(0);
  }

  if (refs.length > 30) {
    console.log(`Note: ${refs.length} references found. Limiting to first 30 to avoid excessive API calls.`);
    refs = refs.slice(0, 30);
  }

  const report = await generateReport(refs);

  if (outputFile) {
    writeFileSync(outputFile, report, 'utf-8');
    console.log(`\nReport saved to: ${outputFile}`);
  } else {
    console.log(report);
  }
}

main().catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});
