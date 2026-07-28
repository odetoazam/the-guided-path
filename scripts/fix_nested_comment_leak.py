#!/usr/bin/env python3
"""
FIX NESTED-COMMENT LEAK — scaffolding rendering as body text
=============================================================
64 tadabbur files open a grounding block with a bare `<!--` and then place
`<!-- morphology:... -->` comments INSIDE it. HTML comments do not nest, so the
outer block terminates at the FIRST inner `-->` and everything after it — the
STEP 0 table rows, FORM DECISIONS, ABSENCE FLAGS — falls outside the comment and
renders. Confirmed live: scripts/migrate-tadabbur-to-ayah-records.ts pushes it
into layer_a.linguistic_html, which AyahCard.tsx renders.

THE FIX IS DELIMITERS ONLY. No scaffolding content is deleted and no morphology
tag is altered: the inner `<!-- morphology:... -->` lines are moved verbatim to a
contiguous run immediately AFTER the block's closing `-->`, leaving one
well-formed comment. The tags keep working because nothing pairs a tag with its
adjacent line — enrich_guard.py restores them by line regex and
verify_morphology.mjs scans the whole file.

Refuses any file where the morphology tag multiset would change.

Usage:
  python3 scripts/fix_nested_comment_leak.py --dry
  python3 scripts/fix_nested_comment_leak.py
"""
import re
import sys
from pathlib import Path

DRY = "--dry" in sys.argv
MORPH = re.compile(r"^\s*<!--\s*morphology:.*?-->\s*$")

files = [
    f for f in Path("content/tadabbur").rglob("*.md")
    if not f.name.startswith(("tafsir-report-", "tafsir_report_"))
    and "_superseded" not in str(f)
]

fixed, skipped, refused = 0, 0, []

for f in files:
    text = f.read_text(encoding="utf-8")
    fm = re.match(r"^---\n.*?\n---\n", text, re.S)
    head = text[: fm.end()] if fm else ""
    body = text[fm.end():] if fm else text
    lines = body.split("\n")

    # Locate an opener line and its matching closer. The opener may be a bare
    # `<!--` or may carry text on the same line (`<!-- step0_table`,
    # `<!-- morphology audit — internal grounding, not rendered`). What matters
    # is that it opens a comment it does not close on that line, and is not
    # itself a morphology tag.
    start = end = None
    opener = "<!--"
    for i, ln in enumerate(lines):
        s = ln.strip()
        if start is None:
            if s.startswith("<!--") and "-->" not in s and not MORPH.match(ln):
                start = i
                opener = ln.rstrip()
        elif s == "-->" or s.endswith("-->") and not MORPH.match(ln):
            end = i
            break
    if start is None or end is None:
        skipped += 1
        continue

    inner = [j for j in range(start + 1, end) if MORPH.match(lines[j])]
    if not inner:
        skipped += 1
        continue

    before_tags = sorted(l.strip() for l in lines if MORPH.match(l))

    moved = [lines[j] for j in inner]
    kept = [lines[j] for j in range(start + 1, end) if j not in set(inner)]
    new = (
        lines[:start]
        + [opener]
        + kept
        + ["-->"]
        + [""]
        + [m.strip() for m in moved]
        + lines[end + 1:]
    )

    after_tags = sorted(l.strip() for l in new if MORPH.match(l))
    if before_tags != after_tags:
        refused.append(f"{f}: morphology tag set would change")
        continue

    out = head + "\n".join(new)
    # the outer block must now contain no nested opener
    seg = out[out.find("<!--"): out.find("-->", out.find("<!--")) + 3]
    if seg.count("<!--") != 1:
        refused.append(f"{f}: outer block still nests after fix")
        continue

    fixed += 1
    if not DRY:
        f.write_text(out, encoding="utf-8")

print(f"{'[dry] ' if DRY else ''}files fixed: {fixed}   skipped (no nesting): {skipped}   refused: {len(refused)}")
for r in refused[:20]:
    print("  REFUSED", r)
