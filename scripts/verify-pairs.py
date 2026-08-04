#!/usr/bin/env python3
"""
Dry-run verifier for tadabbur→tafsir pairings.

Prints N sample pairs (default 30) with key details for human eyeball check.
Focuses on EXACT and COVERED pairs. Deliberately includes surah-blind filename
cases (ayah-005, ayahs-001-003, etc.) to confirm the content-keyed index
resolves each to the right surah.

Usage:
  python3 scripts/verify-pairs.py              # 30 samples
  python3 scripts/verify-pairs.py --sample 50
  python3 scripts/verify-pairs.py --bucket EXACT
  python3 scripts/verify-pairs.py --all         # full count summary only
"""

import argparse
import json
import random
import re
from pathlib import Path

REPO       = Path(__file__).parent.parent
TAFSIR_DIR = REPO / "scripts" / "tadabbur-output"
PAIRS_PATH = REPO / "scripts" / "tadabbur-tafsir-pairs.json"


def show_pair(pair: dict):
    file_path = REPO / pair["file"]
    report_path = TAFSIR_DIR / pair["report"]

    print(f"\n{'─'*70}")
    print(f"TADABBUR  {pair['file']}")
    print(f"          (surah {pair['surah']}, ayahs {pair['ayah_start']}–{pair['ayah_end']})")
    print(f"REPORT    {pair['report']}")
    print(f"BUCKET    {pair['bucket']}")

    # Show report headers to confirm surah identity
    try:
        report_text = report_path.read_text(encoding="utf-8", errors="replace")
        headers = re.findall(r"^##\s+(\d+:\d+)", report_text, re.MULTILINE)
        print(f"  Report headers: {headers[:6]}")
        # Extract first ~200 chars of first Ibn Kathir section
        m = re.search(r"### Ibn Kathir.*?\n+(.{60,200})", report_text, re.DOTALL)
        if m:
            snippet = m.group(1).strip().replace("\n", " ")[:180]
            print(f"  Ibn Kathir: \"{snippet}…\"")
    except Exception as e:
        print(f"  [error reading report: {e}]")

    # Surah identity check
    expected_surah = pair["surah"]
    try:
        headers = re.findall(r"^##\s+(\d+):(\d+)", report_path.read_text(), re.MULTILINE)
        actual_surahs = {int(s) for s, a in headers}
        surah_ok = actual_surahs == {expected_surah}
        ayah_ok  = pair["ayah_start"] in {int(a) for s, a in headers if int(s) == expected_surah}
        print(f"  MATCH?  surah {'✓' if surah_ok else '✗ WRONG!'}   ayah {'✓' if ayah_ok else '✗ WRONG!'}")
    except Exception:
        print("  MATCH?  [could not verify]")


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, default=30)
    ap.add_argument("--bucket", help="Filter by bucket: EXACT or COVERED")
    ap.add_argument("--all",    action="store_true", help="Summary only, no samples")
    args = ap.parse_args()

    if not PAIRS_PATH.exists():
        print("tadabbur-tafsir-pairs.json not found — run build-tadabbur-pairs.py first")
        return

    pairs = json.loads(PAIRS_PATH.read_text())
    from collections import Counter
    counts = Counter(p["bucket"] for p in pairs)
    print("Bucket summary:")
    for bucket, count in counts.most_common():
        print(f"  {bucket:15s}: {count}")

    if args.all:
        return

    # Sample from EXACT + COVERED (verifiable pairs)
    pool = [p for p in pairs if p.get("report") and p["bucket"] in ("EXACT", "COVERED")]
    if args.bucket:
        pool = [p for p in pool if p["bucket"] == args.bucket.upper()]

    if not pool:
        print("No pairs to sample.")
        return

    # Weight toward ambiguous stems (ayah-NNN that exist in many surahs)
    # to stress-test the index
    ambiguous_stems = {
        f"ayah-{str(n).zfill(3)}" for n in range(1, 300)
    }
    ambiguous = [p for p in pool if Path(p["file"]).stem in ambiguous_stems]
    normal    = [p for p in pool if Path(p["file"]).stem not in ambiguous_stems]

    # 40% ambiguous if available
    n_ambig = min(len(ambiguous), args.sample * 2 // 5)
    n_normal = args.sample - n_ambig

    sample = (random.sample(ambiguous, n_ambig) if n_ambig else []) + \
             random.sample(normal, min(n_normal, len(normal)))
    random.shuffle(sample)

    print(f"\nShowing {len(sample)} pairings for review "
          f"({n_ambig} ambiguous-stem, {len(sample)-n_ambig} normal):")

    for pair in sample:
        show_pair(pair)

    print(f"\n{'─'*70}")
    print("Review complete. If all surah ✓ and ayah ✓ — the index is correct.")
    print("Run semantic-enrich.py to start enrichment once confirmed.")


if __name__ == "__main__":
    main()
