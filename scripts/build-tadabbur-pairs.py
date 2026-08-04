#!/usr/bin/env python3
"""
Build a verified tadabbur → tafsir pairing using the content-verified index.

For each content/tadabbur/*/ayah*.md:
  - Derives surah number from the parent directory name (e.g. 018-al-kahf → 18)
  - Derives ayah range from the filename (ayah-025 → 25; ayahs-090-091 → 90-91)
  - Looks up tafsir-index.json["by_ayah"]["{surah}:{ayah_start}"]

Buckets each file:
  EXACT    — report range == file range
  COVERED  — file ayahs ⊆ report range (acceptable)
  MISSING  — no report covers this ayah

Output: scripts/tadabbur-tafsir-pairs.json
"""

import json
import re
from pathlib import Path

REPO        = Path(__file__).parent.parent
TADABBUR_DIR = REPO / "content" / "tadabbur"
TAFSIR_DIR  = REPO / "scripts" / "tadabbur-output"
INDEX_PATH  = REPO / "scripts" / "tafsir-index.json"
PAIRS_PATH  = REPO / "scripts" / "tadabbur-tafsir-pairs.json"

DIR_RE  = re.compile(r"^(\d+)-")
SINGLE  = re.compile(r"^ayah-(\d+)$")
RANGE   = re.compile(r"^ayahs-(\d+)-(\d+)$")


def parse_dir_surah(dirname: str) -> int | None:
    m = DIR_RE.match(dirname)
    return int(m.group(1)) if m else None


def parse_file_range(stem: str) -> tuple[int, int] | None:
    m = SINGLE.match(stem)
    if m:
        n = int(m.group(1))
        return (n, n)
    m = RANGE.match(stem)
    if m:
        return (int(m.group(1)), int(m.group(2)))
    return None


def classify(file_min, file_max, report_info):
    r_min = report_info["ayah_min"]
    r_max = report_info["ayah_max"]
    if r_min == file_min and r_max == file_max:
        return "EXACT"
    if r_min <= file_min and r_max >= file_max:
        return "COVERED"
    return "PARTIAL"   # shouldn't happen with by_ayah lookup; flag if it does


def main():
    if not INDEX_PATH.exists():
        print("tafsir-index.json not found — run build-tafsir-index.py first")
        return

    index = json.loads(INDEX_PATH.read_text())
    by_ayah = index["by_ayah"]

    # Re-parse report files to get ranges for classification
    from build_tafsir_index import parse_report  # noqa
    report_cache = {}  # filename -> {ayah_min, ayah_max, surah}

    def get_report_info(filename):
        if filename not in report_cache:
            info = parse_report(TAFSIR_DIR / filename)
            report_cache[filename] = info
        return report_cache[filename]

    all_files = sorted(f for f in TADABBUR_DIR.rglob("*.md")
                       if not f.name.startswith("tafsir-report-")
                       and not f.name.startswith("tafsir_report_"))

    pairs = []
    counts = {"EXACT": 0, "COVERED": 0, "MISSING": 0, "PARSE_ERROR": 0}

    for f in all_files:
        surah = parse_dir_surah(f.parent.name)
        ayah_range = parse_file_range(f.stem)

        if surah is None or ayah_range is None:
            counts["PARSE_ERROR"] += 1
            pairs.append({
                "file": str(f.relative_to(REPO)),
                "bucket": "PARSE_ERROR",
            })
            continue

        ayah_start, ayah_end = ayah_range
        key = f"{surah}:{ayah_start}"
        report_file = by_ayah.get(key)

        if report_file is None:
            counts["MISSING"] += 1
            pairs.append({
                "file": str(f.relative_to(REPO)),
                "surah": surah,
                "ayah_start": ayah_start,
                "ayah_end": ayah_end,
                "bucket": "MISSING",
            })
            continue

        info = get_report_info(report_file)
        if info.get("status") != "OK":
            counts["MISSING"] += 1
            pairs.append({
                "file": str(f.relative_to(REPO)),
                "surah": surah,
                "ayah_start": ayah_start,
                "ayah_end": ayah_end,
                "bucket": "MISSING",
                "note": f"report {report_file} flagged: {info.get('status')}",
            })
            continue

        bucket = classify(ayah_start, ayah_end, info)
        counts[bucket] = counts.get(bucket, 0) + 1
        pairs.append({
            "file": str(f.relative_to(REPO)),
            "surah": surah,
            "ayah_start": ayah_start,
            "ayah_end": ayah_end,
            "report": report_file,
            "bucket": bucket,
        })

    PAIRS_PATH.write_text(json.dumps(pairs, indent=2, ensure_ascii=False))

    total = len(pairs)
    print(f"\nPaired {total} tadabbur files:")
    for bucket, count in sorted(counts.items(), key=lambda x: -x[1]):
        pct = count / total * 100
        print(f"  {bucket:15s}: {count:5d}  ({pct:.1f}%)")

    missing_sample = [p for p in pairs if p["bucket"] == "MISSING"][:10]
    if missing_sample:
        print(f"\nSample MISSING (first 10):")
        for p in missing_sample:
            print(f"  {p['file']}")

    print(f"\nPairs written to: {PAIRS_PATH}")


if __name__ == "__main__":
    main()
