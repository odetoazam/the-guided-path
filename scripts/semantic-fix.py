#!/usr/bin/env python3
"""
AyahGuide Semantic Fix Agent

Reads the semantic-review-log.json, groups files by issue type, and applies
surgical fixes using Claude. Processes CRITICAL first, then MODERATE.

Fix strategies:
  1. wrong_tafsir   — tafsir report was mismatched; flag for manual re-review,
                      strip unverifiable attributions, soften false certainty
  2. content_fix    — actual errors (root, verb form, bad attribution);
                      Claude applies surgical edits based on the flagged issues

Usage:
  python3 scripts/semantic-fix.py                    # fix all CRITICAL, then MODERATE
  python3 scripts/semantic-fix.py --verdict CRITICAL # only CRITICAL
  python3 scripts/semantic-fix.py --verdict MODERATE
  python3 scripts/semantic-fix.py --sample 20        # random sample
  python3 scripts/semantic-fix.py --file content/tadabbur/005-al-maidah/ayah-055.md
  python3 scripts/semantic-fix.py --report           # show fix log summary only
"""

import argparse
import json
import random
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

REPO         = Path(__file__).parent.parent
TADABBUR_DIR = REPO / "content" / "tadabbur"
TAFSIR_DIR   = REPO / "scripts" / "tadabbur-output"
REVIEW_LOG   = REPO / "scripts" / "semantic-review-log.json"
FIX_LOG      = REPO / "scripts" / "semantic-fix-log.json"
CLAUDE_BIN   = "claude"
MODEL        = "sonnet"

# ──────────────────────────────────────────────
# Prompts
# ──────────────────────────────────────────────

FIX_SYSTEM = """You are a surgical editor for AyahGuide, a Quranic tadabbur platform.

You will receive:
1. A tadabbur reflection (markdown)
2. A tafsir cross-reference report (may be empty or mismatched)
3. A list of flagged issues from a prior quality review

Your task: apply the minimum edits needed to fix each flagged issue.

Rules:
- DO NOT rewrite sections that weren't flagged
- DO NOT change the structure, voice, or depth of the reflection
- For CRITICAL issues: fix them — correct the Arabic root, fix the verb form, remove/correct the false attribution
- For wrong/missing tafsir reports: remove or soften any claim that depends on classical authority
  (e.g. change "Ibn Kathir states X" → "classical commentators have noted X" or remove if unverifiable)
- For fabricated attributions: either remove the sentence or replace with "scholars have noted" framing
- Preserve all morphology comments (<!-- morphology:... -->)
- Preserve all frontmatter exactly EXCEPT update semantic_review field (see below)
- After fixing, set the frontmatter field:
    semantic_review: "fixed-{TODAY}"
  replacing whatever value was there

Return ONLY the complete fixed markdown file — no commentary, no explanation, no code fences.
If a file has NO fixable issues (e.g. the only issue is a missing tafsir report with no verifiable
claims inside), return the exact original content but with semantic_review updated to "needs-tafsir-{TODAY}".
"""

TRIAGE_SYSTEM = """You are triaging quality issues for a Quranic reflection platform.

Given the review output for a tadabbur file, classify the primary issue type:

- "wrong_tafsir": the review flagged that the tafsir cross-reference report was for a different ayah
  or contained zero coverage of the ayah under review (not a content error in the reflection itself)
- "content_error": actual errors in the reflection — wrong Arabic root, wrong verb form,
  fabricated/inverted scholarly attribution, Quranic factual error
- "both": wrong tafsir AND content errors present
- "minor_only": only MINOR issues flagged

Return exactly one of: wrong_tafsir | content_error | both | minor_only
Nothing else.
"""

# ──────────────────────────────────────────────
# Helpers
# ──────────────────────────────────────────────

def load_json(path: Path, default):
    if path.exists():
        return json.loads(path.read_text())
    return default

def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2))

def find_tafsir_report(tadabbur_path: Path) -> Path | None:
    stem = tadabbur_path.stem
    candidate = TAFSIR_DIR / f"tafsir-{stem}.md"
    return candidate if candidate.exists() else None

def run_claude(system: str, user: str, timeout: int = 300) -> tuple[str, str | None]:
    """Returns (output, error). error is None on success."""
    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", system,
           "--model", MODEL,
           "--output-format", "text",
           "--no-session-persistence"]
    try:
        r = subprocess.run(cmd, input=user, capture_output=True,
                           text=True, cwd=REPO, timeout=timeout)
    except subprocess.TimeoutExpired:
        return "", "timeout"
    if r.returncode != 0:
        return "", (r.stderr or r.stdout or "cli error")[:300]
    output = r.stdout.strip()
    if not output:
        return "", "empty response"
    return output, None

def triage_issue(review_output: str) -> str:
    """Classify whether issues are wrong_tafsir, content_error, both, or minor_only."""
    output, err = run_claude(TRIAGE_SYSTEM, review_output, timeout=60)
    if err:
        return "unknown"
    output = output.strip().lower()
    for valid in ("wrong_tafsir", "content_error", "both", "minor_only"):
        if valid in output:
            return valid
    return "unknown"

def fix_file(tadabbur_path: Path, review_output: str, issue_type: str) -> dict:
    content = tadabbur_path.read_text()
    tafsir_path = find_tafsir_report(tadabbur_path)
    tafsir_content = tafsir_path.read_text()[:2000] if tafsir_path else "[No tafsir report found]"
    today = datetime.now().strftime("%Y-%m-%d")

    user_prompt = f"""## File: {tadabbur_path.relative_to(REPO)}

### ORIGINAL REFLECTION:
{content}

---

### TAFSIR CROSS-REFERENCE REPORT:
{tafsir_content}

---

### FLAGGED ISSUES (from prior review):
{review_output}

---

Issue type classification: {issue_type}
TODAY = {today}

Apply fixes now. Return the complete fixed markdown file only."""

    fixed_content, err = run_claude(FIX_SYSTEM, user_prompt, timeout=300)
    if err:
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": err, "status": "ERROR", "issue_type": issue_type}

    # Sanity check: output should still look like markdown frontmatter
    if not fixed_content.startswith("---"):
        # Claude may have wrapped in a code block — strip it
        fixed_content = re.sub(r"^```(?:markdown)?\n?", "", fixed_content)
        fixed_content = re.sub(r"\n?```$", "", fixed_content)

    if not fixed_content.startswith("---"):
        return {"path": str(tadabbur_path.relative_to(REPO)),
                "error": "output didn't start with frontmatter", "status": "ERROR",
                "issue_type": issue_type}

    # Write fixed content
    tadabbur_path.write_text(fixed_content)

    return {
        "path": str(tadabbur_path.relative_to(REPO)),
        "status": "FIXED",
        "issue_type": issue_type,
        "fixed_at": datetime.now().isoformat()[:19],
    }

# ──────────────────────────────────────────────
# File collection
# ──────────────────────────────────────────────

def collect_entries(args) -> list[dict]:
    review_log = load_json(REVIEW_LOG, [])
    fix_log    = load_json(FIX_LOG, [])
    already_fixed = {e["path"] for e in fix_log if e.get("status") == "FIXED"}

    # Deduplicate review log — keep latest entry per path
    seen = {}
    for e in review_log:
        seen[e["path"]] = e
    review_log = list(seen.values())

    if args.file:
        rel = str(Path(args.file).relative_to(REPO)) if Path(args.file).is_absolute() else args.file
        return [e for e in review_log if e["path"] == rel]

    target_verdicts = set()
    if args.verdict:
        target_verdicts = {args.verdict.upper()}
    else:
        target_verdicts = {"CRITICAL", "MODERATE"}

    entries = [e for e in review_log
               if e.get("verdict") in target_verdicts
               and e["path"] not in already_fixed]

    # CRITICAL before MODERATE
    entries.sort(key=lambda e: (0 if e.get("verdict") == "CRITICAL" else 1))

    if args.sample:
        return random.sample(entries, min(args.sample, len(entries)))

    return entries

# ──────────────────────────────────────────────
# Report
# ──────────────────────────────────────────────

def write_report(fix_log: list):
    fixed  = [e for e in fix_log if e.get("status") == "FIXED"]
    errors = [e for e in fix_log if e.get("status") == "ERROR"]
    by_type = {}
    for e in fixed:
        t = e.get("issue_type", "unknown")
        by_type[t] = by_type.get(t, 0) + 1

    print(f"\n{'─'*50}")
    print(f"Fix log: {len(fixed)} fixed, {len(errors)} errors")
    for t, c in sorted(by_type.items()):
        print(f"  {t}: {c}")
    if errors:
        print(f"\nErrors:")
        for e in errors[:10]:
            print(f"  {e['path']}: {e.get('error','?')}")

# ──────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file",    help="Fix a single file")
    ap.add_argument("--sample",  type=int, help="Random sample of N files")
    ap.add_argument("--verdict", help="CRITICAL or MODERATE (default: both)")
    ap.add_argument("--report",  action="store_true", help="Show fix log summary only")
    ap.add_argument("--skip-triage", action="store_true",
                    help="Skip triage step, treat everything as content_error")
    args = ap.parse_args()

    fix_log = load_json(FIX_LOG, [])

    if args.report:
        write_report(fix_log)
        return

    entries = collect_entries(args)
    if not entries:
        print("No files to fix.")
        return

    print(f"\n🔧 Semantic fix — {len(entries)} files  (model: {MODEL})")
    print("   Ctrl-C to stop; progress is saved.\n")

    counts = {"FIXED": 0, "ERROR": 0}

    try:
        for i, entry in enumerate(entries, 1):
            path_str = entry["path"]
            tadabbur_path = REPO / path_str
            if not tadabbur_path.exists():
                print(f"[{i}/{len(entries)}]  SKIP (file gone): {path_str}")
                continue

            print(f"[{i}/{len(entries)}]  {path_str}", flush=True)
            print(f"   verdict: {entry.get('verdict')}  reviewed: {entry.get('reviewed_at','?')[:10]}")

            review_output = entry.get("output", "")

            # Triage
            if args.skip_triage:
                issue_type = "content_error"
            else:
                print("   triaging...", end=" ", flush=True)
                issue_type = triage_issue(review_output)
                print(issue_type)
                time.sleep(1)

            # Fix
            print("   fixing...", end=" ", flush=True)
            result = fix_file(tadabbur_path, review_output, issue_type)
            status = result.get("status")
            counts[status] = counts.get(status, 0) + 1

            emoji = "✅" if status == "FIXED" else "⚠️ "
            print(f"{emoji} {status}")
            if status == "ERROR":
                print(f"   error: {result.get('error')}")

            fix_log.append(result)
            save_json(FIX_LOG, fix_log)

            time.sleep(3)

    except KeyboardInterrupt:
        print("\n\nStopped. Progress saved.")

    write_report(fix_log)

if __name__ == "__main__":
    main()
