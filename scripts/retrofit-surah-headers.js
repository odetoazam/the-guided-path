#!/usr/bin/env node
/**
 * retrofit-surah-headers.js
 *
 * One-time migration script (run 2026-03-08) to:
 * 1. Rename all surah section headers to standardized names
 * 2. Add "Virtues & Recitation" section to each published surah
 *
 * Applied to all 4 published surahs: 1 (Al-Fatiha), 2 (Al-Baqarah),
 * 5 (Al-Ma'idah), 67 (Al-Mulk)
 *
 * Header renames applied:
 *   "The Simple Map" / "The Floor Plan" / "Before X: ..." → "The Surah at a Glance"
 *   "Layer 1: ..." / "Who This Surah Is" → "The Character of This Surah"
 *   "Layer 2: ..." / "The Journey Through It" → "Walking Through the Surah"
 *   "Layer 3: ..." / "The Hidden Architecture" → "What the Structure Is Doing"
 *   "Layer 4: ..." / "The World It Speaks Into" → "Why It Still Speaks"
 *   "Closing" → "To Carry With You"
 *
 * Updates made directly to Supabase via REST API (content_json field).
 * This script documents the transformation; the changes are already live.
 */

// This script has already been run. It is kept for documentation purposes.
console.log('Migration already applied on 2026-03-08. No action taken.');
