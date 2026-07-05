#!/usr/bin/env node
/**
 * Print the canonical Uthmani text for a verse reference, from the same
 * quran-validator database the Arabic verifier checks against.
 *
 * Usage: node scripts/canonical-verse.mjs 20 17
 * Output: the exact verse text (or empty string + exit 1 if not found)
 */
import { QuranValidator } from 'quran-validator';

const surah = parseInt(process.argv[2], 10);
const ayah = parseInt(process.argv[3], 10);
if (!surah || !ayah) {
  console.error('usage: canonical-verse.mjs <surah> <ayah>');
  process.exit(2);
}

const v = new QuranValidator();
const res = v.getVerse(surah, ayah);
if (res && res.text) {
  process.stdout.write(res.text);
} else {
  process.exit(1);
}
