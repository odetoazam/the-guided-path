#!/usr/bin/env python3
"""
ENRICH GUARD — mechanical safety layer for tadabbur enrichment
================================================================
Extracted from semantic-enrich.py's restore_* functions, unchanged in logic.
This script does NOT generate content and does NOT call any model or CLI —
it only enforces invariants on a (ORIGINAL, DRAFT) pair, where DRAFT was
written by an in-session agent (Task/Agent tool — same account this whole
conversation runs on, never an external `claude` subprocess).

Enforces, mechanically, regardless of what the draft contains:
  - morphology comment lines restored verbatim from the original
    (the model does not reliably preserve exact word-position tags)
  - frontmatter fields locked except {semantic_review, validated, word_count}
  - large internal HTML comment blocks (grounding notes) restored if dropped
  - STUB GUARD: refuses any draft under 60% of the original's length
    (a short "changelog note" response must never overwrite real content)

Usage (library):
  from enrich_guard import apply_guard
  final_text, ok, reason = apply_guard(original_text, draft_text)

Usage (CLI, for spot-testing one pair):
  python3 scripts/enrich_guard.py <original.md> <draft.md>
"""
import re
import sys

_MORPH_LINE_RE = re.compile(r"^<!-- morphology:\d+:\d+:\d+ .*-->$", re.MULTILINE)
_FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
_FM_MUTABLE = {"semantic_review", "validated", "word_count"}
_BIG_COMMENT_RE = re.compile(r"<!--(?:(?!-->).){500,}?-->", re.DOTALL)


def restore_frontmatter_fields(original: str, enriched: str) -> str:
    om = _FM_RE.match(original)
    em = _FM_RE.match(enriched)
    if not om or not em:
        return enriched
    orig_fm, enr_fm = om.group(1), em.group(1)

    def field_value(fm: str, name: str):
        m = re.search(rf"^{name}:.*?(?=\n[A-Za-z_][A-Za-z0-9_]*:|\Z)", fm, re.DOTALL | re.M)
        return m.group(0).rstrip() if m else None

    new_fm = orig_fm
    for name in _FM_MUTABLE:
        enr_val = field_value(enr_fm, name)
        if enr_val is None:
            continue
        orig_val = field_value(new_fm, name)
        new_fm = new_fm.replace(orig_val, enr_val, 1) if orig_val is not None else new_fm + "\n" + enr_val
    return f"---\n{new_fm}\n---\n" + enriched[em.end():]


def restore_internal_comments(original: str, enriched: str) -> str:
    orig_blocks = _BIG_COMMENT_RE.findall(original)
    if not orig_blocks:
        return enriched
    missing = [b for b in orig_blocks if b not in enriched]
    if not missing:
        return enriched
    fm = _FM_RE.match(enriched)
    insert_at = fm.end() if fm else 0
    return enriched[:insert_at] + "\n" + "\n\n".join(missing) + "\n" + enriched[insert_at:]


def restore_morphology_block(original: str, enriched: str) -> str:
    orig_tags = _MORPH_LINE_RE.findall(original)
    if not orig_tags:
        return enriched
    block = "\n".join(orig_tags)
    matches = list(_MORPH_LINE_RE.finditer(enriched))
    if matches:
        start, end = matches[0].start(), matches[-1].end()
        return enriched[:start] + block + enriched[end:]
    fm = re.match(r"^---\n.*?\n---\n", enriched, re.DOTALL)
    if fm:
        return enriched[:fm.end()] + "\n" + block + "\n" + enriched[fm.end():]
    return block + "\n\n" + enriched


def apply_guard(original: str, draft: str):
    """-> (final_text_or_None, ok: bool, reason: str)"""
    draft = draft.strip()
    fm_idx = draft.find("---")
    if fm_idx == -1:
        return None, False, "draft missing YAML frontmatter delimiter"
    draft = draft[fm_idx:]

    if len(draft) < len(original) * 0.6:
        return None, False, f"draft too short ({len(draft)}c vs {len(original)}c original) — refused"

    out = restore_morphology_block(original, draft)
    out = restore_frontmatter_fields(original, out)
    out = restore_internal_comments(original, out)
    return out, True, "ok"


if __name__ == "__main__":
    orig = open(sys.argv[1], encoding="utf-8").read()
    draft = open(sys.argv[2], encoding="utf-8").read()
    final, ok, reason = apply_guard(orig, draft)
    print(f"ok={ok}  reason={reason}")
    if ok:
        print(f"final length: {len(final)}c (original: {len(orig)}c)")
