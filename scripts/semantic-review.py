#!/usr/bin/env python3
"""
AyahGuide Semantic Review Agent

Reads tadabbur files against their tafsir cross-reference reports and flags:
- Linguistic claims that may be fabricated or over-extended
- Scholarly attributions that conflict with the tafsir report
- Methodology violations (labeled stages, decorative analogies, etc.)
- Du'a not grounded in the text
- Missing or thin one-sentence distillation

⛔ DO NOT RUN THIS SCRIPT AS-IS. It shells out to the `claude` CLI, which bills a
   DIFFERENT ACCOUNT and is banned for this project. Reviews must be run with
   in-session agents (the Agent tool), the same way the enrichment pipeline works
   — see scripts/ENRICH-PILOT-INSTRUCTIONS.md.

   The REVIEW_SYSTEM prompt and find_tafsir_report() below are still the canonical
   spec and are kept for that reason; drive them from an in-session agent.

   The tafsir-pairing bug that invalidated the May 2026 run is fixed below, but
   fixing it does NOT make the old log trustworthy — that log was produced under
   the bug. See docs/tadabbur-lockdown-plan.md.

Produces a prioritized report of files needing human attention.

Usage:
  python3 scripts/semantic-review.py                    # review all unreviewed
  python3 scripts/semantic-review.py --sample 20        # random sample of 20
  python3 scripts/semantic-review.py --file content/tadabbur/005-al-maidah/ayah-055.md
  python3 scripts/semantic-review.py --contested-only   # only contested_verse: true files
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
REPORT_FILE  = REPO / "scripts" / "semantic-review-report.md"
CLAUDE_BIN   = "claude"
MODEL        = "claude-sonnet-4-6"

REVIEW_SYSTEM = """You are a rigorous Islamic scholarship quality reviewer for AyahGuide, a Quranic tadabbur platform committed to scholarly accuracy.

You will be given:
1. A tadabbur reflection (markdown file)
2. A tafsir cross-reference report (classical commentary from Ibn Kathir, al-Tabari, al-Jalalayn, al-Muyassar)

Your job: identify genuine problems — not stylistic preferences, but actual errors or risks.

Flag ONLY these categories:

**CRITICAL** (must fix before publication):
- Arabic root misidentified (e.g. claims root is ك-ت-ب when corpus says otherwise)
- Verb form wrong (e.g. claims Form IV when it's Form II)
- Scholarly attribution fabricated or inverted (e.g. "Ibn Kathir held X" when tafsir report shows he held the opposite)
- Quranic claim that contradicts what the tafsir report says about the ayah

**MODERATE** (should review):
- Linguistic claim presented as documented fact but seems interpretive extension
- Classical scholar position stated with false certainty where tafsir report shows ikhtilaf
- A "composite sketch" that actually just presents one view as dominant
- Du'a contains claims not grounded in the ayah's actual words

**MINOR** (worth noting):
- Methodology slip: labeled stages (Surface/Deeper/Deepest) appearing in output
- Analogy that seems decorative rather than load-bearing
- One-sentence distillation that doesn't actually distill

**PASS** — if the file looks solid, say so clearly.

Be specific. Quote the exact phrase you're flagging and explain why.
If you cannot assess a claim without deeper Arabic corpus access, say so — don't guess.

Output format:
VERDICT: CRITICAL | MODERATE | MINOR | PASS
ISSUES:
- [CRITICAL] "exact quote" — reason
- [MODERATE] "exact quote" — reason
SUMMARY: one sentence
"""

def _tag_frontmatter(file_path: Path, review_tag: str):
    """Add/update semantic_review field in frontmatter."""
    try:
        content = file_path.read_text()
        if "semantic_review:" in content:
            content = re.sub(r"^semantic_review:.*$", f"semantic_review: \"{review_tag}\"",
                             content, flags=re.MULTILINE)
        else:
            content = re.sub(r"(^validation_date:.*$)",
                             rf"\1\nsemantic_review: \"{review_tag}\"",
                             content, flags=re.MULTILINE, count=1)
        file_path.write_text(content)
    except Exception:
        pass  # don't let tagging failure break the review loop


def find_tafsir_report(tadabbur_path: Path) -> Path | None:
    """Locate the tafsir report that belongs to THIS file.

    HISTORY — the bug that invalidated the May 2026 run. This used to be:

        candidate = TAFSIR_DIR / f"tafsir-{stem}.md"      # scripts/tadabbur-output/

    `scripts/tadabbur-output/` is a FLAT namespace with no surah component, so
    `content/tadabbur/021-al-anbiya/ayah-005.md` resolved to `tafsir-ayah-005.md`
    — and so did every OTHER surah's ayah 5. Files were reviewed against
    commentary on a different surah entirely, which is why that run returned
    1,124 CRITICAL verdicts out of 1,990. Those verdicts are artifacts; see
    docs/tadabbur-lockdown-plan.md.

    The correct report is the sidecar living beside the tadabbur file:
        content/tadabbur/<surah-dir>/tafsir-report-<range>.md
    """
    rng = tadabbur_path.stem.replace("ayahs-", "").replace("ayah-", "")
    candidate = tadabbur_path.parent / f"tafsir-report-{rng}.md"
    if candidate.exists():
        return candidate
    return None

def get_frontmatter_field(content: str, key: str) -> str:
    m = re.search(rf"^{key}:\s*(.+)$", content, re.MULTILINE)
    return m.group(1).strip().strip('"') if m else ""

def review_file(tadabbur_path: Path) -> dict:
    content = tadabbur_path.read_text()
    tafsir_path = find_tafsir_report(tadabbur_path)

    surah = get_frontmatter_field(content, "surah")
    ayah_start = get_frontmatter_field(content, "ayah_start")
    title = get_frontmatter_field(content, "title")

    # Truncate to keep total input manageable — focus on linguistic journey
    max_chars = 5000
    reflection_body = content[:max_chars]
    if len(content) > max_chars:
        reflection_body += f"\n\n[... truncated at {max_chars} chars ...]"

    tafsir_content = ""
    if tafsir_path:
        tafsir_content = tafsir_path.read_text()[:1500]
    else:
        tafsir_content = "[No tafsir report available]"

    user_prompt = f"""## Tadabbur File: {tadabbur_path.relative_to(REPO)}
Surah {surah}, Ayah {ayah_start} — "{title}"

### REFLECTION CONTENT:
{reflection_body}

---

### TAFSIR CROSS-REFERENCE REPORT:
{tafsir_content}

---

Review this file now."""

    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", REVIEW_SYSTEM,
           "--model", MODEL,
           "--output-format", "text",
           "--no-session-persistence"]

    try:
        r = subprocess.run(cmd, input=user_prompt, capture_output=True,
                           text=True, cwd=REPO, timeout=300)
    except subprocess.TimeoutExpired:
        return {"path": str(tadabbur_path), "error": "timeout after 300s",
                "verdict": "ERROR"}

    if r.returncode != 0:
        err_msg = (r.stderr or r.stdout or "no output")[:300]
        print(f"   CLI error: {err_msg}")
        return {"path": str(tadabbur_path), "error": err_msg, "verdict": "ERROR"}

    output = r.stdout.strip()
    if not output:
        print("   Empty response from Claude")
        return {"path": str(tadabbur_path), "error": "empty response", "verdict": "ERROR"}

    # Handle plain "CRITICAL" or markdown bold "**CRITICAL**"
    verdict_m = re.search(r"VERDICT:\s*\*{0,2}(\w+)\*{0,2}", output)
    verdict = verdict_m.group(1).upper() if verdict_m else "UNKNOWN"
    if verdict not in ("CRITICAL", "MODERATE", "MINOR", "PASS"):
        verdict = "UNKNOWN"
    if verdict == "UNKNOWN":
        print(f"   Raw response: {output[:200]}")

    return {
        "path": str(tadabbur_path.relative_to(REPO)),
        "surah": surah,
        "ayah": ayah_start,
        "title": title,
        "verdict": verdict,
        "output": output,
        "has_tafsir_report": tafsir_path is not None,
        "reviewed_at": datetime.now().isoformat()[:19],
    }

def collect_files(args) -> list[Path]:
    if args.file:
        return [Path(args.file)]

    # Exclude tafsir-report-*.md files — these are source data, not tadabbur reflections
    all_files = sorted(f for f in TADABBUR_DIR.rglob("*.md")
                       if not f.name.startswith("tafsir-report-")
                       and not f.name.startswith("tafsir_report_"))

    if args.contested_only:
        contested = []
        for f in all_files:
            content = f.read_text()
            if "contested_verse: true" in content:
                contested.append(f)
        return contested

    # Load already-reviewed paths
    reviewed = set()
    if REVIEW_LOG.exists():
        log = json.loads(REVIEW_LOG.read_text())
        reviewed = {e["path"] for e in log}

    unreviewed = [f for f in all_files
                  if str(f.relative_to(REPO)) not in reviewed]

    if args.sample:
        return random.sample(unreviewed, min(args.sample, len(unreviewed)))

    return unreviewed

def load_log() -> list:
    if REVIEW_LOG.exists():
        return json.loads(REVIEW_LOG.read_text())
    return []

def save_log(entries: list):
    REVIEW_LOG.write_text(json.dumps(entries, indent=2))

def write_report(entries: list):
    critical = [e for e in entries if e.get("verdict") == "CRITICAL"]
    moderate = [e for e in entries if e.get("verdict") == "MODERATE"]
    minor    = [e for e in entries if e.get("verdict") == "MINOR"]
    passed   = [e for e in entries if e.get("verdict") == "PASS"]
    errors   = [e for e in entries if e.get("verdict") == "ERROR"]

    lines = [
        f"# AyahGuide Semantic Review Report",
        f"Generated: {datetime.now().strftime('%Y-%m-%d %H:%M')}",
        f"Total reviewed: {len(entries)}",
        f"",
        f"| Verdict | Count |",
        f"|---|---|",
        f"| 🔴 CRITICAL | {len(critical)} |",
        f"| 🟡 MODERATE | {len(moderate)} |",
        f"| 🔵 MINOR | {len(minor)} |",
        f"| ✅ PASS | {len(passed)} |",
        f"| ⚠️  ERROR | {len(errors)} |",
        f"",
    ]

    for label, group, emoji in [
        ("CRITICAL", critical, "🔴"),
        ("MODERATE", moderate, "🟡"),
        ("MINOR",    minor,    "🔵"),
    ]:
        if group:
            lines.append(f"## {emoji} {label} ({len(group)} files)\n")
            for e in group:
                lines.append(f"### `{e['path']}`")
                lines.append(f"Surah {e.get('surah','?')}: {e.get('title','')}\n")
                lines.append(e.get("output", ""))
                lines.append("\n---\n")

    REPORT_FILE.write_text("\n".join(lines))
    print(f"\nReport written: {REPORT_FILE.relative_to(REPO)}")

def priority_score(filepath: Path) -> int:
    """Higher score = review sooner. Used when no --sample given."""
    try:
        content = filepath.read_text()
    except Exception:
        return 0
    score = 0
    if "contested_verse: true" in content: score += 100
    if "generated_by: \"opus-tadabbur\"" in content: score += 50   # manually written
    if "generated_by: \"codex-tadabbur" in content: score += 40    # codex pipeline
    # Has an actual Step 0 morphology table (scholar claims + root claims)
    if "| Root |" in content or "<!-- morphology:" in content: score += 30
    # Has explicit Ibn Kathir / al-Tabari citations in prose (high attribution risk)
    if re.search(r"Ibn Kath[iī]r|al-Ṭabarī|al-Tabari|Ibn Taymiyya", content): score += 20
    # Has a long passage_context (more claims to verify)
    m = re.search(r"^passage_context:\s*\"(.+?)\"", content, re.MULTILINE | re.DOTALL)
    if m and len(m.group(1)) > 400: score += 10
    return score

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--file",           help="Review a single file")
    ap.add_argument("--sample",  type=int, help="Random sample of N unreviewed files")
    ap.add_argument("--contested-only", action="store_true",
                    help="Only review contested_verse: true files")
    ap.add_argument("--report",  action="store_true",
                    help="Generate report from existing log without new reviews")
    ap.add_argument("--priority", action="store_true",
                    help="Review all unreviewed files, highest-risk first (contested, "
                         "manual writes, explicit scholar citations)")
    args = ap.parse_args()

    log = load_log()

    if args.report:
        write_report(log)
        print(f"Report from {len(log)} existing entries.")
        return

    files = collect_files(args)
    if not files:
        print("No files to review.")
        return

    # Sort by priority when running everything
    if args.priority or (not args.sample and not args.file and not args.contested_only):
        print("  Sorting by priority (contested > manual writes > scholar citations)...")
        files = sorted(files, key=priority_score, reverse=True)

    print(f"\n🔍 Semantic review — {len(files)} files  (model: {MODEL})")
    print("   Ctrl-C to stop; progress is saved.\n")

    verdicts = {"CRITICAL": 0, "MODERATE": 0, "MINOR": 0, "PASS": 0, "ERROR": 0}

    try:
        for i, f in enumerate(files, 1):
            rel = str(f.relative_to(REPO))
            print(f"[{i}/{len(files)}]  {rel}", flush=True)

            result = review_file(f)
            verdict = result.get("verdict", "UNKNOWN")
            verdicts[verdict] = verdicts.get(verdict, 0) + 1

            emoji = {"CRITICAL":"🔴","MODERATE":"🟡","MINOR":"🔵",
                     "PASS":"✅","ERROR":"⚠️ "}.get(verdict, "?")
            print(f"   {emoji} {verdict}")
            if verdict in ("CRITICAL", "MODERATE"):
                # Print the issues inline for immediate visibility
                for line in result["output"].split("\n"):
                    if line.startswith("- ["):
                        print(f"   {line}")

            # Tag frontmatter with review outcome
            today = datetime.now().strftime("%Y-%m-%d")
            tag = f"agent-{today}" if verdict == "PASS" else f"agent-{today}-{verdict.lower()}"
            _tag_frontmatter(f, tag)

            # Save after each file
            log.append(result)
            save_log(log)

            time.sleep(3)  # gentle rate limiting

    except KeyboardInterrupt:
        print("\n\nStopped. Progress saved.")

    print(f"\n{'─'*50}")
    print(f"Results: 🔴 {verdicts.get('CRITICAL',0)} critical  "
          f"🟡 {verdicts.get('MODERATE',0)} moderate  "
          f"🔵 {verdicts.get('MINOR',0)} minor  "
          f"✅ {verdicts.get('PASS',0)} pass")

    write_report(log)

if __name__ == "__main__":
    main()
