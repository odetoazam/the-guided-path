#!/usr/bin/env node
/**
 * Quran Arabic Text Verifier
 *
 * Validates Arabic Quranic text in any file format (markdown, JSX, HTML, plain text)
 * against the authentic Uthmani text using the quran-validator package.
 *
 * Usage:
 *   node verify_arabic.mjs <file>           # Validate tagged Arabic
 *   node verify_arabic.mjs <file> --fix     # Auto-correct misquoted verses
 *   node verify_arabic.mjs <file> --scan    # Also detect untagged Arabic
 *
 * Tagging format (in source files):
 *   Any Arabic text should be tagged with a reference in one of these formats:
 *     - <!-- ayah:15:9 --> Arabic text           (HTML comment)
 *     - {/· ayah:15:9 ·/} Arabic text            (JSX comment)
 *     - [ayah:15:9] Arabic text                  (Markdown bracket)
 *     - ayahRef="15:9"                           (JSX prop)
 *     - data-ayah="15:9"                         (HTML attribute)
 *
 * Dependencies: npm install quran-validator
 */

import { readFileSync, writeFileSync } from 'fs';
import { QuranValidator, LLMProcessor } from 'quran-validator';

const file = process.argv[2];
const flags = process.argv.slice(3);
const doFix = flags.includes('--fix');
const doScan = flags.includes('--scan');

if (!file) {
  console.error('Usage: node verify_arabic.mjs <file> [--fix] [--scan]');
  process.exit(1);
}

let content;
try {
  content = readFileSync(file, 'utf-8');
} catch (e) {
  console.error(`Cannot read file: ${file}`);
  process.exit(1);
}

const validator = new QuranValidator();
const processor = new LLMProcessor(validator);

// ── Extract tagged Arabic references ──────────────────────────────────────

const tagPatterns = [
  // <!-- ayah:S:A --> text  or  <!-- ayah:S:A-B --> text
  /<!--\s*ayah:(\d+):(\d+)(?:-(\d+))?\s*-->\s*([^\n<]+)/g,
  // {/* ayah:S:A */} text
  /\{\/\*\s*ayah:(\d+):(\d+)(?:-(\d+))?\s*\*\/\}\s*([^\n<]+)/g,
  // [ayah:S:A] text
  /\[ayah:(\d+):(\d+)(?:-(\d+))?\]\s*([^\n\[]+)/g,
  // ayahRef="S:A" ... >text<  (JSX/HTML)
  /ayahRef=["'](\d+):(\d+)(?:-(\d+))?["'][^>]*>([^<]+)</g,
  // data-ayah="S:A" ... >text<  (HTML)
  /data-ayah=["'](\d+):(\d+)(?:-(\d+))?["'][^>]*>([^<]+)</g,
];

const tagged = [];
for (const pattern of tagPatterns) {
  let match;
  while ((match = pattern.exec(content)) !== null) {
    const surah = parseInt(match[1]);
    const ayahStart = parseInt(match[2]);
    const ayahEnd = match[3] ? parseInt(match[3]) : ayahStart;
    const arabicText = match[4].trim();

    if (arabicText.length > 0) {
      tagged.push({
        surah,
        ayahStart,
        ayahEnd,
        ref: ayahEnd > ayahStart ? `${surah}:${ayahStart}-${ayahEnd}` : `${surah}:${ayahStart}`,
        text: arabicText,
        fullMatch: match[0],
      });
    }
  }
}

// ── Validate each tagged reference ────────────────────────────────────────

let passed = 0;
let failed = 0;
let warnings = 0;
let fixes = [];

console.log(`\n╔══════════════════════════════════════════════╗`);
console.log(`║  Quran Arabic Verifier                       ║`);
console.log(`╚══════════════════════════════════════════════╝`);
console.log(`\nFile: ${file}`);
console.log(`Tagged references found: ${tagged.length}\n`);

for (const entry of tagged) {
  const result = validator.validate(entry.text);

  if (result.isValid && result.matchType === 'exact') {
    console.log(`  ✅ ${entry.ref} — exact match → ${result.reference}`);
    passed++;
  } else if (result.isValid && result.matchType === 'normalized') {
    console.log(`  ⚠️  ${entry.ref} — normalized match → ${result.reference} (diacritics differ)`);
    warnings++;
    if (doFix && result.matchedVerse) {
      fixes.push({ original: entry.text, corrected: result.matchedVerse.text, ref: entry.ref });
    }
  } else {
    console.log(`  ❌ ${entry.ref} — NO MATCH`);
    console.log(`       Text: "${entry.text.substring(0, 60)}..."`);
    console.log(`       Could not find this text in the Quran database.`);
    failed++;
  }
}

// ── Scan for untagged Arabic (optional) ───────────────────────────────────

if (doScan) {
  console.log(`\n── Scanning for untagged Arabic ──\n`);

  // Match Arabic text blocks (3+ Arabic characters) that don't have a nearby ayah tag
  const arabicPattern = /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF]{3,}[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\s]*/g;

  let untaggedCount = 0;
  let scanMatch;
  while ((scanMatch = arabicPattern.exec(content)) !== null) {
    const text = scanMatch[0].trim();
    if (text.length < 10) continue; // Skip very short fragments (likely single words)

    // Check if this text is already tagged
    const isTagged = tagged.some(t => t.text.includes(text) || text.includes(t.text));
    if (isTagged) continue;

    // Check if it might be Quranic
    const result = validator.validate(text);
    if (result.isValid) {
      console.log(`  🔍 Untagged Arabic is Quranic (${result.matchType} → ${result.reference}):`);
      console.log(`     "${text.substring(0, 80)}..."`);
      untaggedCount++;
    }
  }

  if (untaggedCount === 0) {
    console.log('  No untagged Quranic text detected.');
  } else {
    console.log(`\n  Found ${untaggedCount} untagged Arabic passage(s) that may be Quranic.`);
    console.log('  Consider adding ayah references to these passages.');
  }
}

// ── Apply fixes if requested ──────────────────────────────────────────────

if (doFix && fixes.length > 0) {
  console.log(`\n── Applying ${fixes.length} correction(s) ──\n`);
  let fixedContent = content;
  for (const fix of fixes) {
    fixedContent = fixedContent.replace(fix.original, fix.corrected);
    console.log(`  🔧 ${fix.ref}: corrected`);
  }
  writeFileSync(file, fixedContent, 'utf-8');
  console.log(`\n  File updated with corrections.`);
}

// ── Summary ───────────────────────────────────────────────────────────────

console.log(`\n── Summary ──`);
console.log(`  Passed:   ${passed}`);
console.log(`  Warnings: ${warnings}`);
console.log(`  Failed:   ${failed}`);

if (failed > 0) {
  console.log(`\n⛔ ${failed} verification failure(s). Review flagged verses before publishing.`);
  process.exit(1);
} else if (warnings > 0) {
  console.log(`\n⚠️  All verses matched but ${warnings} had diacritics or partial differences.`);
  process.exit(0);
} else if (tagged.length === 0) {
  console.log(`\n⚠️  No tagged Arabic references found. Add ayah tags to enable verification.`);
  process.exit(0);
} else {
  console.log(`\n✅ All ${passed} verse(s) verified against authentic Uthmani text.`);
  process.exit(0);
}
