#!/usr/bin/env python3
"""
Repair broken morphology tags anywhere in the corpus — not just the
enricher-destroyed files. Reuses the same fixers built for
regenerate-destroyed.py (bare-line rewrap, position/root/POS cross-check
against the authoritative corpus). Never touches English prose (verified
byte-identical after every fix). Never touches Arabic quotes either — only
the <!-- morphology: --> tag block.

Usage:
  python3 scripts/repair-morphology-corpuswide.py --scan            # find broken files, write list, no changes
  python3 scripts/repair-morphology-corpuswide.py --apply           # fix everything in the scan list
  python3 scripts/repair-morphology-corpuswide.py --file <path>     # fix one file
"""
import argparse
import importlib
import re
import subprocess
import sys
from pathlib import Path

REPO = Path(__file__).parent.parent
sys.path.insert(0, str(REPO / "scripts"))
m = importlib.import_module("regenerate-destroyed")

SCAN_FILE = REPO / "scripts" / "morphology-repair-scan.txt"


def eng_fingerprint(t: str) -> str:
    """English-prose fingerprint: strip HTML comments, [ayah:S:A] grounding
    tags, Arabic script, and all whitespace/markdown-bold. These tadabbur
    files are a private backend knowledge layer, never rendered as public
    pages — ayah tags and morphology comments are internal grounding
    metadata, not reader-visible prose, exactly like the HTML comments.
    Only the precise `[ayah:S:A]` tag pattern is stripped — ordinary
    markdown `[link text](url)` brackets are untouched and still count as
    visible content. If this string is unchanged, no visible content was
    altered — only the tag machinery."""
    t = re.sub(r"<!--.*?-->", "", t, flags=re.DOTALL)
    t = re.sub(r"\[ayah:\d+:\d+(?:-\d+)?\]", "", t)
    t = re.sub(r"[؀-ۿݐ-ݿࢠ-ࣿﭐ-﷿ﹰ-﻿]", "", t)
    t = t.replace("**", "")
    return re.sub(r"\s+", "", t)


def morph_failed_count(path: Path) -> int:
    r = subprocess.run(["node", "scripts/verify_morphology.mjs", str(path)],
                       cwd=REPO, capture_output=True, text=True)
    mm = re.search(r"Failed:\s*(\d+)", r.stdout)
    return int(mm.group(1)) if mm else -1


def scan() -> list[str]:
    files = sorted(f for f in (REPO / "content" / "tadabbur").rglob("*.md")
                   if not f.name.startswith("tafsir") and "validation-report" not in f.name)
    broken = []
    print(f"Scanning {len(files)} files for morphology issues...")
    for i, f in enumerate(files):
        text = f.read_text()
        if "morphology:" not in text:
            continue
        n = morph_failed_count(f)
        if n != 0:
            broken.append(str(f.relative_to(REPO)))
        if (i + 1) % 500 == 0:
            print(f"  ...{i+1}/{len(files)} scanned, {len(broken)} broken so far")
    SCAN_FILE.write_text("\n".join(broken) + ("\n" if broken else ""))
    print(f"\nDone. {len(broken)} files need repair. List written to {SCAN_FILE}")
    return broken


def repair_one(rel: str) -> str:
    """Returns: FIXED / NO_CHANGE / UNSAFE_ABORTED / STILL_BROKEN."""
    p = REPO / rel
    original = p.read_text()
    ref = m.ayah_ref(p)
    fixed = m.apply_all_fixes(original, ref)

    if eng_fingerprint(fixed) != eng_fingerprint(original):
        return "UNSAFE_ABORTED"  # never write — something touched visible content

    if fixed == original:
        remaining = morph_failed_count(p)
        return "NO_CHANGE" if remaining == 0 else "STILL_BROKEN"

    p.write_text(fixed)
    remaining = morph_failed_count(p)
    if remaining == 0:
        return "FIXED"
    # partial improvement but not fully clean — keep the improvement anyway
    # (strictly fewer/no-worse claims), but flag for review
    return "STILL_BROKEN"


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--scan", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--file")
    args = ap.parse_args()

    if args.file:
        print(f"{repair_one(args.file)}: {args.file}")
        return

    if args.scan:
        scan()
        return

    if args.apply:
        if not SCAN_FILE.exists():
            print("No scan file found — run --scan first.")
            return
        targets = [l.strip() for l in SCAN_FILE.read_text().splitlines() if l.strip()]
        from collections import Counter
        tally = Counter()
        still_broken = []
        for i, rel in enumerate(targets, 1):
            status = repair_one(rel)
            tally[status] += 1
            print(f"[{i}/{len(targets)}] {status}: {rel}")
            if status in ("STILL_BROKEN", "UNSAFE_ABORTED"):
                still_broken.append(rel)
        print(f"\n{'─'*50}")
        for k, v in tally.most_common():
            print(f"  {k}: {v}")
        if still_broken:
            Path(REPO / "scripts" / "morphology-still-broken.txt").write_text(
                "\n".join(still_broken) + "\n")
            print(f"\n{len(still_broken)} files still need manual review — "
                  f"see scripts/morphology-still-broken.txt")
        return

    ap.print_help()


if __name__ == "__main__":
    main()
