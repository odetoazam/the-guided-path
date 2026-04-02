#!/bin/bash
# Ralph Wiggum loop — feeds the next ayah tadabbur task when Claude tries to exit.
# Queue format: surah_num:ayah_num|surah_name|surah_slug
# Example: 1:1|Al-Fatiha|al-fatiha

QUEUE="$(dirname "$0")/pending-ayahs.txt"

# Exit silently if queue is missing or empty — Claude stops normally
if [ ! -f "$QUEUE" ] || [ ! -s "$QUEUE" ]; then
  exit 0
fi

# Pop the first ayah off the queue
LINE=$(head -1 "$QUEUE")
tail -n +2 "$QUEUE" > "$QUEUE.tmp" && mv "$QUEUE.tmp" "$QUEUE"

# Parse the line
REF=$(echo "$LINE" | cut -d'|' -f1)
SURAH_NUM=$(echo "$REF" | cut -d':' -f1)
AYAH_NUM=$(echo "$REF" | cut -d':' -f2)
SURAH_NAME=$(echo "$LINE" | cut -d'|' -f2)
SURAH_SLUG=$(echo "$LINE" | cut -d'|' -f3)

# Pad numbers for file naming
SURAH_PAD=$(printf "%03d" "$SURAH_NUM")
AYAH_PAD=$(printf "%03d" "$AYAH_NUM")

# Count remaining
REMAINING=$(wc -l < "$QUEUE" | tr -d ' ')

echo "=== Ayah Tadabbur Queue: $REMAINING remaining after this one ==="
echo ""
echo "MANDATORY: Use the /quranic-tadabbur skill (invoke via Skill tool) to generate a deep tadabbur reflection for Surah $SURAH_NAME ($SURAH_NUM), Ayah $AYAH_NUM."
echo "Save the full output as a markdown file at content/tadabbur/${SURAH_PAD}-${SURAH_SLUG}/ayah-${AYAH_PAD}.md"
echo "Do NOT publish to Supabase. Local storage only."
echo ""
echo "MANDATORY POST-GENERATION VALIDATION — do NOT skip:"
echo "1. node scripts/verify_arabic.mjs content/tadabbur/${SURAH_PAD}-${SURAH_SLUG}/ayah-${AYAH_PAD}.md --scan"
echo "2. node scripts/verify_morphology.mjs content/tadabbur/${SURAH_PAD}-${SURAH_SLUG}/ayah-${AYAH_PAD}.md"
echo "3. node scripts/cross_reference_tafsir.mjs content/tadabbur/${SURAH_PAD}-${SURAH_SLUG}/ayah-${AYAH_PAD}.md"
echo "If any validator fails, fix the content and re-run until all three pass."
