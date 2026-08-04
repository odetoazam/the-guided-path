#!/usr/bin/env python3
"""
Build a content-verified tafsir index.

Reads every file in scripts/tadabbur-output/ and extracts the ## surah:ayah
headers to determine which surah+ayah range each report actually covers.

Output: scripts/tafsir-index.json
  {
    "by_ayah":    { "2:49": "tafsir-ayahs-049-050.md", ... },
    "by_passage": { "2:49-50": "tafsir-ayahs-049-050.md", ... },
    "flags": {
      "MULTI_SURAH": [...],
      "NO_HEADERS":  [...],
      "DUPLICATE_PASSAGE": [...]
    }
  }
"""

import json
import re
from pathlib import Path

REPO       = Path(__file__).parent.parent
TAFSIR_DIR = REPO / "scripts" / "tadabbur-output"
INDEX_PATH = REPO / "scripts" / "tafsir-index.json"

HEADER_RE = re.compile(r"^##\s+(\d+):(\d+)", re.MULTILINE)


def parse_report(path: Path) -> dict:
    """Extract surah and ayah range from report headers."""
    text = path.read_text(encoding="utf-8", errors="replace")
    matches = HEADER_RE.findall(text)
    if not matches:
        return {"status": "NO_HEADERS", "file": path.name}

    surahs = {int(s) for s, a in matches}
    if len(surahs) > 1:
        return {"status": "MULTI_SURAH", "file": path.name, "surahs": sorted(surahs)}

    surah = surahs.pop()
    ayahs = sorted({int(a) for s, a in matches})
    return {
        "status": "OK",
        "file": path.name,
        "surah": surah,
        "ayah_min": ayahs[0],
        "ayah_max": ayahs[-1],
        "explicit_ayahs": ayahs,
    }


def build():
    reports = sorted(TAFSIR_DIR.glob("*.md"))
    print(f"Processing {len(reports)} tafsir reports…")

    by_ayah    = {}   # "surah:ayah"    -> filename
    by_passage = {}   # "surah:min-max" -> filename
    flags = {"MULTI_SURAH": [], "NO_HEADERS": [], "DUPLICATE_PASSAGE": []}

    ok = 0
    for path in reports:
        info = parse_report(path)
        if info["status"] == "NO_HEADERS":
            flags["NO_HEADERS"].append(path.name)
            continue
        if info["status"] == "MULTI_SURAH":
            flags["MULTI_SURAH"].append({"file": path.name, "surahs": info["surahs"]})
            continue

        ok += 1
        s, mn, mx = info["surah"], info["ayah_min"], info["ayah_max"]
        explicit_ayahs = info["explicit_ayahs"]

        # Use contiguous fill only when headers are contiguous (no gaps).
        # For reports with gaps (e.g. headers at 15, 16, 33), map only the
        # explicit ayahs — prevents pairing the wrong tadabbur to a sparse report.
        contiguous = (len(explicit_ayahs) == (mx - mn + 1))
        ayahs_to_map = range(mn, mx + 1) if contiguous else explicit_ayahs

        passage_key = f"{s}:{mn}-{mx}"

        if passage_key in by_passage:
            flags["DUPLICATE_PASSAGE"].append(
                {"passage": passage_key, "files": [by_passage[passage_key], path.name]}
            )
            # Keep whichever is larger (richer)
            existing = (TAFSIR_DIR / by_passage[passage_key]).stat().st_size
            new      = path.stat().st_size
            if new > existing:
                by_passage[passage_key] = path.name
        else:
            by_passage[passage_key] = path.name

        span = mx - mn
        for ayah in ayahs_to_map:
            key = f"{s}:{ayah}"
            if key not in by_ayah:
                by_ayah[key] = path.name
            else:
                # Prefer the report whose range most tightly covers this ayah
                existing_file = by_ayah[key]
                ep = parse_report(TAFSIR_DIR / existing_file)
                existing_span = ep["ayah_max"] - ep["ayah_min"]
                if span < existing_span:
                    by_ayah[key] = path.name

    index = {
        "by_ayah":    by_ayah,
        "by_passage": by_passage,
        "flags":      flags,
    }
    INDEX_PATH.write_text(json.dumps(index, indent=2, ensure_ascii=False))

    print(f"\nDone.")
    print(f"  Reports indexed:     {ok}")
    print(f"  by_ayah entries:     {len(by_ayah)}")
    print(f"  by_passage entries:  {len(by_passage)}")
    print(f"  NO_HEADERS:          {len(flags['NO_HEADERS'])}")
    print(f"  MULTI_SURAH:         {len(flags['MULTI_SURAH'])}")
    print(f"  DUPLICATE_PASSAGE:   {len(flags['DUPLICATE_PASSAGE'])}")
    if flags["MULTI_SURAH"]:
        print("\nMulti-surah reports (data errors — excluded from index):")
        for f in flags["MULTI_SURAH"]:
            print(f"  {f}")
    if flags["NO_HEADERS"]:
        print("\nNo-header reports (malformed — excluded from index):")
        for f in flags["NO_HEADERS"]:
            print(f"  {f}")
    print(f"\nIndex written to: {INDEX_PATH}")


if __name__ == "__main__":
    build()
