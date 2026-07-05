#!/usr/bin/env python3
"""
AyahGuide Semantic Enricher

For each tadabbur file that has a correctly matched tafsir report:
  1. Fixes any flagged issues from the semantic review
  2. Deepens the content using the classical tafsir sources

Only runs on files where the tafsir report is confirmed to match the ayah.
Progress is saved after every file — safe to interrupt and resume.

Usage:
  python3 scripts/semantic-enrich.py               # all matched files not yet enriched
  python3 scripts/semantic-enrich.py --sample 10   # spot-check 10 first
  python3 scripts/semantic-enrich.py --opus        # use Opus instead of Sonnet
  python3 scripts/semantic-enrich.py --file content/tadabbur/010-yunus/ayahs-090-091.md
  python3 scripts/semantic-enrich.py --report      # summary of enrichment log only
  python3 scripts/semantic-enrich.py --verdict CRITICAL  # only files with critical flags
"""

import argparse
import json
import random
import re
import subprocess
import time
from datetime import datetime
from pathlib import Path

REPO         = Path(__file__).parent.parent
TADABBUR_DIR = REPO / "content" / "tadabbur"
TAFSIR_DIR   = REPO / "scripts" / "tadabbur-output"
REVIEW_LOG   = REPO / "scripts" / "semantic-review-log.json"
ENRICH_LOG   = REPO / "scripts" / "semantic-enrich-log.json"
INDEX_PATH   = REPO / "scripts" / "tafsir-index.json"
CLAUDE_BIN   = "claude"

DIR_RE    = re.compile(r"^(\d+)-")
SINGLE_RE = re.compile(r"^ayah-(\d+)$")
RANGE_RE  = re.compile(r"^ayahs-(\d+)-(\d+)$")

ENRICH_SYSTEM = """You are a scholarly editor for AyahGuide, a Quranic tadabbur platform.

You will receive:
1. An existing tadabbur reflection (markdown)
2. Classical tafsir sources for the same ayah(s): Ibn Kathir, al-Tabari, al-Muyassar, al-Jalalayn
3. Flagged issues from a prior quality review (may be empty if the file passed)

Your task has two parts — do BOTH in a single pass:

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 1 — FIX flagged issues
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
For each CRITICAL or MODERATE issue:
- Wrong Arabic root → correct it to what the corpus says
- Wrong verb form → correct it
- Fabricated/inverted attribution → either fix with what the scholar actually said,
  or change to "classical commentators note..." if no specific attribution is verifiable
- False certainty where ikhtilaf exists → acknowledge the disagreement briefly

For MINOR issues, use judgment — fix if easy, note if structural.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PART 2 — DEEPEN using the tafsir sources
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Read the tafsir material carefully. Find insights that are:
- Not already in the reflection
- Genuinely illuminating (a classical scholar's observation about a word, a narrative detail,
  a theological point, an ikhtilaf worth knowing)
- Verifiable against the provided sources

Weave these into the existing text naturally — don't append a "classical sources say:" section.
Deepen the linguistic journey where the tafsir offers richer morphological or semantic analysis.
Add historical/narrative context where the tafsir provides it and the reflection is thin.
If there is genuine ikhtilaf among the classical scholars on a key point, surface it.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
STRICT RULES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
- Preserve the existing voice, rhythm, and structure — this is enrichment, not rewriting
- Do NOT add labeled section headers like "Surface Reading" / "Deeper Meaning"
- Do NOT add decorative analogies not grounded in the text
- Do NOT fabricate claims not supported by the provided tafsir sources
- Preserve ALL morphology comments (<!-- morphology:... -->) exactly as-is
- Preserve ALL frontmatter fields EXCEPT update semantic_review to: "enriched-{TODAY}"
  and set validated: true if it was false and all critical issues are now resolved
- If the Arabic tafsir contains key insights, you may render them in English — do not
  insert raw Arabic prose into the reflection body (roots/forms in morphology tags are fine)

Return ONLY the complete enriched markdown file — no commentary, no code fences.
"""

# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def load_json(path: Path, default):
    return json.loads(path.read_text()) if path.exists() else default

# ── Frozen-block preservation ───────────────────────────────────────
# The LLM does NOT reliably obey "preserve morphology tags verbatim" — it
# renumbers word positions (naive 1,2,3 vs the corpus's prefix-aware
# positions), silently breaking morphology validation. So we enforce it
# mechanically: the original morphology tag block is restored after the
# rewrite, no matter what the model returned.
_MORPH_LINE_RE = re.compile(r"^<!-- morphology:\d+:\d+:\d+ .*-->$", re.MULTILINE)

_FM_RE = re.compile(r"^---\n(.*?)\n---\n", re.DOTALL)
_FM_FIELD_RE = re.compile(r"^([A-Za-z_][A-Za-z0-9_]*):", re.M)
# fields the enricher is ALLOWED to change; everything else is frozen
_FM_MUTABLE = {"semantic_review", "validated", "word_count"}


def restore_frontmatter_fields(original: str, enriched: str) -> str:
    """The model must not drop or rewrite frontmatter fields (it deleted a
    scholarly_note on one file). Mechanically enforce: keep the ORIGINAL
    frontmatter wholesale, adopting from the model's output only the fields
    it is allowed to change (semantic_review, validated, word_count)."""
    om = _FM_RE.match(original)
    em = _FM_RE.match(enriched)
    if not om or not em:
        return enriched
    orig_fm, enr_fm = om.group(1), em.group(1)

    def field_value(fm: str, name: str) -> str | None:
        m = re.search(rf"^{name}:.*?(?=\n[A-Za-z_][A-Za-z0-9_]*:|\Z)", fm, re.DOTALL | re.M)
        return m.group(0).rstrip() if m else None

    new_fm = orig_fm
    for name in _FM_MUTABLE:
        enr_val = field_value(enr_fm, name)
        if enr_val is None:
            continue
        orig_val = field_value(new_fm, name)
        if orig_val is not None:
            new_fm = new_fm.replace(orig_val, enr_val, 1)
        else:
            new_fm = new_fm + "\n" + enr_val
    return f"---\n{new_fm}\n---\n" + enriched[em.end():]


_BIG_COMMENT_RE = re.compile(r"<!--(?:(?!-->).){500,}?-->", re.DOTALL)


def restore_internal_comments(original: str, enriched: str) -> str:
    """The internal grounding blocks (Step 0 table, scholarly notes inside
    large HTML comments) must survive enrichment. If the model dropped a
    large comment block that existed in the original, re-insert it right
    after the frontmatter."""
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
    """Force the enriched output to carry the ORIGINAL morphology tag lines."""
    orig_tags = _MORPH_LINE_RE.findall(original)
    if not orig_tags:
        return enriched  # nothing to protect
    block = "\n".join(orig_tags)
    matches = list(_MORPH_LINE_RE.finditer(enriched))
    if matches:
        # Replace the whole span from first to last tag with the original block.
        start, end = matches[0].start(), matches[-1].end()
        return enriched[:start] + block + enriched[end:]
    # LLM dropped the tags entirely — re-insert right after the frontmatter.
    fm = re.match(r"^---\n.*?\n---\n", enriched, re.DOTALL)
    if fm:
        return enriched[:fm.end()] + "\n" + block + "\n" + enriched[fm.end():]
    return block + "\n\n" + enriched

def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2))

# ── Content-verified tafsir index ───────────────────────────────────

_tafsir_index: dict = {}

def _load_tafsir_index():
    global _tafsir_index
    if not _tafsir_index and INDEX_PATH.exists():
        _tafsir_index = json.loads(INDEX_PATH.read_text()).get("by_ayah", {})

def _parse_dir_surah(dirname: str) -> str | None:
    m = DIR_RE.match(dirname)
    return m.group(1).lstrip("0") if m else None   # "018" → "18"

def _parse_ayah_start(stem: str) -> str | None:
    m = SINGLE_RE.match(stem)
    if m: return str(int(m.group(1)))
    m = RANGE_RE.match(stem)
    if m: return str(int(m.group(1)))
    return None

def find_tafsir_report(tadabbur_path: Path) -> Path | None:
    """Return the verified tafsir report for this file, or None."""
    _load_tafsir_index()
    surah     = _parse_dir_surah(tadabbur_path.parent.name)
    ayah_start = _parse_ayah_start(tadabbur_path.stem)
    if surah and ayah_start:
        key = f"{surah}:{ayah_start}"
        report_name = _tafsir_index.get(key)
        if report_name:
            candidate = TAFSIR_DIR / report_name
            if candidate.exists():
                return candidate
    return None

def is_matched(tadabbur_path: Path, tafsir_path: Path) -> bool:
    """Belt-and-suspenders: confirm the report's surah == the file's dir surah."""
    try:
        surah = _parse_dir_surah(tadabbur_path.parent.name)
        if not surah:
            return False
        tafsir_content = tafsir_path.read_text()
        import re as _re
        headers = _re.findall(r"^##\s+(\d+):\d+", tafsir_content, _re.MULTILINE)
        actual_surahs = {s.lstrip("0") for s in headers}
        return surah in actual_surahs
    except Exception:
        return False

def get_review_entry(path_rel: str, review_log: list) -> dict | None:
    """Get the most recent review log entry for this file."""
    matches = [e for e in review_log if e.get("path") == path_rel]
    if not matches:
        return None
    return sorted(matches, key=lambda e: e.get("reviewed_at", ""))[-1]

def enrich_file(tadabbur_path: Path, review_entry: dict | None, model: str) -> dict:
    content = tadabbur_path.read_text()
    original_full = content  # untruncated — used to restore the frozen morphology block
    tafsir_path = find_tafsir_report(tadabbur_path)
    tafsir_raw = tafsir_path.read_text() if tafsir_path else "[No tafsir report]"
    today = datetime.now().strftime("%Y-%m-%d")

    # NEVER truncate the reflection input — a truncated input means the model
    # never sees the tail and silently returns a file missing everything past
    # the cut (this destroyed content on 12 files before being caught).
    # Oversized files are SKIPPED, not truncated.
    MAX_REFLECTION = 60_000
    MAX_TAFSIR     = 3_000
    if len(content) > MAX_REFLECTION:
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": f"file too large for enrichment ({len(content)}c > {MAX_REFLECTION}c) — skipped, NOT truncated",
                "status": "SKIPPED_TOO_LARGE"}
    tafsir_content = tafsir_raw[:MAX_TAFSIR]
    if len(tafsir_raw) > MAX_TAFSIR:
        tafsir_content += f"\n[... tafsir truncated at {MAX_TAFSIR} chars ...]"

    review_section = ""
    if review_entry and review_entry.get("verdict") not in ("PASS", None):
        review_section = f"""### PRIOR REVIEW — {review_entry.get('verdict')} issues:
{review_entry.get('output', '')}"""
    else:
        review_section = "### PRIOR REVIEW: PASS (no issues flagged — enrich only)"

    # Use ═══ separators (not ---) to avoid ambiguity with YAML frontmatter in the content
    user_prompt = f"""## File: {tadabbur_path.relative_to(REPO)}
TODAY = {today}

IMPORTANT: Your response MUST start with exactly three dashes on the first line (---) — this is the YAML frontmatter delimiter. Do NOT add any preamble, commentary, or explanation before it.

═══════════════════════════════════════
REFLECTION (full content):
═══════════════════════════════════════
{content}

═══════════════════════════════════════
TAFSIR SOURCES:
═══════════════════════════════════════
{tafsir_content}

═══════════════════════════════════════
{review_section}
═══════════════════════════════════════

Apply Part 1 (fixes) and Part 2 (deepening) now.
Return the complete enriched markdown file only, beginning with --- on the very first line."""

    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", ENRICH_SYSTEM,
           "--model", model,
           "--output-format", "text",
           "--no-session-persistence"]

    def _call_claude(prompt: str) -> tuple[str, str | None]:
        """Returns (output, error_str). output is raw stdout; error_str is set on failure."""
        for attempt in range(3):
            try:
                r = subprocess.run(cmd, input=prompt, capture_output=True,
                                   text=True, cwd=REPO, timeout=900)
            except subprocess.TimeoutExpired:
                if attempt < 2:
                    print(f"   timeout, retrying ({attempt+1}/3)...", flush=True)
                    time.sleep(10)
                    continue
                return "", "timeout after 3 attempts"

            if r.returncode != 0:
                err = (r.stderr or r.stdout or "cli error")[:300]
                if "ConnectionRefused" in err or "connect" in err.lower():
                    if attempt < 2:
                        print(f"   connection error, retrying in 15s ({attempt+1}/3)...", flush=True)
                        time.sleep(15)
                        continue
                return "", err
            return r.stdout, None
        return "", "failed after 3 attempts"

    raw_output, call_err = _call_claude(user_prompt)
    if call_err:
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": call_err, "status": "ERROR"}

    output = raw_output.strip()
    if not output:
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": "empty response", "status": "ERROR"}

    # Strip code fences if Claude wrapped the output
    output = re.sub(r"^```(?:markdown)?\n?", "", output)
    output = re.sub(r"\n?```$", "", output.rstrip())

    # Find where frontmatter actually starts — Claude sometimes adds preamble text
    fm_idx = output.find("---")
    if fm_idx == -1:
        # Retry with an explicit correction prompt
        correction_prompt = f"""Your previous response was MISSING the YAML frontmatter delimiter.
The file MUST start with --- on the first line.

Your response started with: {repr(output[:200])}

Please return the COMPLETE enriched markdown file, starting with --- on the very first line.
Do not include any explanation — output only the markdown file content.

Original task:
{user_prompt}"""
        raw2, call_err2 = _call_claude(correction_prompt)
        if call_err2:
            return {"path": str(tadabbur_path.relative_to(REPO)),
                    "error": f"output missing frontmatter; retry failed: {call_err2}", "status": "ERROR"}
        output = raw2.strip()
        output = re.sub(r"^```(?:markdown)?\n?", "", output)
        output = re.sub(r"\n?```$", "", output.rstrip())
        fm_idx = output.find("---")
        if fm_idx == -1:
            return {"path": str(tadabbur_path.relative_to(REPO)),
                    "error": "output missing frontmatter (2 attempts)", "status": "ERROR",
                    "raw": output[:300]}

    output = output[fm_idx:]

    # STUB GUARD: the LLM sometimes returns a short changelog note instead of the
    # full enriched file (e.g. "Duplicate morphology tag removed..."). Never let a
    # drastically-shorter output overwrite a real reflection — that is data loss.
    if len(output) < len(original_full) * 0.6:
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": f"output too short ({len(output)}c vs {len(original_full)}c original) "
                         f"— refused to overwrite (likely stub/changelog response)",
                "status": "ERROR", "raw": output[:300]}

    # Mechanically restore the frozen morphology block — never trust the LLM to
    # reproduce word positions. (See restore-morphology-tags.py for the backfill.)
    output = restore_morphology_block(original_full, output)
    # Mechanically enforce what the model was only ASKED to preserve:
    output = restore_frontmatter_fields(original_full, output)
    output = restore_internal_comments(original_full, output)
    tadabbur_path.write_text(output)

    return {
        "path": str(tadabbur_path.relative_to(REPO)),
        "status": "ENRICHED",
        "prior_verdict": review_entry.get("verdict") if review_entry else "none",
        "model": model,
        "enriched_at": datetime.now().isoformat()[:19],
    }

# ──────────────────────────────────────────────
# File collection
# ──────────────────────────────────────────────

def collect_files(args, review_log: list, enrich_log: list) -> list[tuple[Path, dict | None]]:
    already_done = {e["path"] for e in enrich_log if e.get("status") == "ENRICHED"}

    if args.file:
        p = Path(args.file)
        rel = str(p.relative_to(REPO)) if p.is_absolute() else args.file
        review_entry = get_review_entry(rel, review_log)
        return [(REPO / rel, review_entry)]

    all_files = sorted(f for f in TADABBUR_DIR.rglob("*.md")
                       if not f.name.startswith("tafsir-report-")
                       and not f.name.startswith("tafsir_report_"))

    # Only files with a matched tafsir report
    matched = []
    for f in all_files:
        rel = str(f.relative_to(REPO))
        if rel in already_done:
            continue
        tafsir = find_tafsir_report(f)
        if tafsir and is_matched(f, tafsir):
            matched.append(f)

    # Filter by verdict if requested
    if args.verdict:
        verdict_filter = args.verdict.upper()
        review_index = {}
        for e in review_log:
            review_index[e["path"]] = e
        matched = [f for f in matched
                   if review_index.get(str(f.relative_to(REPO)), {}).get("verdict") == verdict_filter]

    # Priority order: CRITICAL first, then MODERATE, then MINOR/PASS
    verdict_rank = {"CRITICAL": 0, "MODERATE": 1, "MINOR": 2, "PASS": 3, None: 4}
    review_index = {e["path"]: e for e in review_log}
    matched.sort(key=lambda f: verdict_rank.get(
        review_index.get(str(f.relative_to(REPO)), {}).get("verdict"), 4))

    if args.sample:
        matched = random.sample(matched, min(args.sample, len(matched)))

    return [(f, get_review_entry(str(f.relative_to(REPO)), review_log)) for f in matched]

# ──────────────────────────────────────────────
# Report
# ──────────────────────────────────────────────

def print_report(enrich_log: list):
    enriched = [e for e in enrich_log if e.get("status") == "ENRICHED"]
    errors   = [e for e in enrich_log if e.get("status") == "ERROR"]
    by_prior = {}
    for e in enriched:
        v = e.get("prior_verdict", "none")
        by_prior[v] = by_prior.get(v, 0) + 1

    print(f"\n{'─'*50}")
    print(f"Enriched: {len(enriched)}   Errors: {len(errors)}")
    print(f"\nBy prior verdict:")
    for v, c in sorted(by_prior.items()):
        print(f"  {v}: {c}")
    if errors:
        print(f"\nRecent errors:")
        for e in errors[-5:]:
            print(f"  {e['path']}: {e.get('error','?')}")

# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file",    help="Enrich a single file")
    ap.add_argument("--sample",  type=int, help="Random sample of N files")
    ap.add_argument("--verdict", help="Only files with this prior verdict (CRITICAL/MODERATE/PASS)")
    ap.add_argument("--opus",    action="store_true", help="Use Opus instead of Sonnet")
    ap.add_argument("--report",  action="store_true", help="Print enrichment log summary only")
    args = ap.parse_args()

    model = "claude-opus-4-8" if args.opus else "claude-sonnet-4-6"

    enrich_log = load_json(ENRICH_LOG, [])

    if args.report:
        print_report(enrich_log)
        return

    review_log = load_json(REVIEW_LOG, [])
    files = collect_files(args, review_log, enrich_log)

    if not files:
        print("No files to enrich.")
        return

    # Token cost estimate
    token_est = len(files) * 10000
    cost_est  = token_est / 1_000_000 * (15 if args.opus else 3) * 3  # rough input+output
    print(f"\n✨ Semantic enricher — {len(files)} files  (model: {model})")
    print(f"   Rough token estimate: ~{token_est:,} tokens  (~${cost_est:.0f})")
    print(f"   CRITICAL-flagged files processed first.")
    print(f"   Ctrl-C to stop; progress is saved.\n")

    counts = {"ENRICHED": 0, "ERROR": 0}

    try:
        for i, (f, review_entry) in enumerate(files, 1):
            rel = str(f.relative_to(REPO))
            prior = review_entry.get("verdict", "none") if review_entry else "none"
            print(f"[{i}/{len(files)}]  {rel}  ({prior})", flush=True)

            result = enrich_file(f, review_entry, model)
            status = result.get("status")
            counts[status] = counts.get(status, 0) + 1

            emoji = "✨" if status == "ENRICHED" else "⚠️ "
            print(f"   {emoji} {status}")
            if status == "ERROR":
                print(f"   error: {result.get('error')}")

            enrich_log.append(result)
            save_json(ENRICH_LOG, enrich_log)

            time.sleep(4)  # rate limiting

    except KeyboardInterrupt:
        print("\n\nStopped. Progress saved.")

    print_report(enrich_log)

if __name__ == "__main__":
    main()
