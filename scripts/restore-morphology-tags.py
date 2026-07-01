#!/usr/bin/env python3
"""
Restore morphology tag lines from the committed (HEAD) version of each file.

The semantic enricher's LLM rewrite silently renumbered `<!-- morphology:S:A:W -->`
word positions (naive 1,2,3,4 instead of the corpus's prefix-aware positions),
breaking morphology validation on ~783 enriched files. HEAD has the correct,
validated tags. This restores ONLY the morphology tag block, keeping every
prose/enrichment change intact.

Usage:
  python3 scripts/restore-morphology-tags.py --check          # report scope, change nothing
  python3 scripts/restore-morphology-tags.py --file <path>    # fix one file
  python3 scripts/restore-morphology-tags.py --apply          # fix all regressed files
"""
import argparse
import re
import subprocess
from pathlib import Path

REPO = Path(__file__).parent.parent
TAG_RE = re.compile(r"^<!-- morphology:\d+:\d+:\d+ .*-->$", re.MULTILINE)


def head_version(rel: str) -> str | None:
    r = subprocess.run(["git", "show", f"HEAD:{rel}"], cwd=REPO,
                       capture_output=True, text=True)
    return r.stdout if r.returncode == 0 else None


def morph_lines(text: str) -> list[str]:
    return TAG_RE.findall(text)


def restore_one(path: Path) -> str:
    """Restore the ORIGINAL (HEAD) morphology tag block wholesale.

    HEAD's tags are the validated-correct set, so we replace the working
    file's tag block with HEAD's entire block — this handles both pure
    renumbering (same count) and the enricher dropping/adding tags
    (different count). Returns FIXED / NO_CHANGE / NO_HEAD / NO_HEAD_TAGS.
    """
    rel = str(path.relative_to(REPO))
    head = head_version(rel)
    if head is None:
        return "NO_HEAD"
    work_text = path.read_text()
    head_tags = morph_lines(head)
    work_tags = morph_lines(work_text)
    if not head_tags:
        return "NO_HEAD_TAGS"
    if head_tags == work_tags:
        return "NO_CHANGE"
    block = "\n".join(head_tags)
    matches = list(TAG_RE.finditer(work_text))
    if matches:
        start, end = matches[0].start(), matches[-1].end()
        new_text = work_text[:start] + block + work_text[end:]
    else:
        # Enricher dropped every tag — re-insert after the frontmatter.
        fm = re.match(r"^---\n.*?\n---\n", work_text, re.DOTALL)
        new_text = (work_text[:fm.end()] + "\n" + block + "\n" + work_text[fm.end():]
                    if fm else block + "\n\n" + work_text)
    path.write_text(new_text)
    return "FIXED"


def modified_files() -> list[Path]:
    r = subprocess.run(
        ["git", "diff", "--name-only", "--", "content/tadabbur"],
        cwd=REPO, capture_output=True, text=True)
    out = []
    for line in r.stdout.splitlines():
        p = REPO / line
        if p.suffix == ".md" and p.exists() and "morphology:" in p.read_text():
            out.append(p)
    return out


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--check", action="store_true")
    ap.add_argument("--apply", action="store_true")
    ap.add_argument("--file")
    args = ap.parse_args()

    if args.file:
        print(f"{restore_one(REPO / args.file)}: {args.file}")
        return

    files = modified_files()
    from collections import Counter
    tally = Counter()
    fixed = []
    for p in files:
        rel = str(p.relative_to(REPO))
        head = head_version(rel)
        if head is None:
            tally["NO_HEAD"] += 1
            continue
        head_tags = morph_lines(head)
        work_tags = morph_lines(p.read_text())
        if head_tags == work_tags:
            tally["clean"] += 1
        else:
            tally["renumbered" if len(head_tags) == len(work_tags)
                  else "tag-count-changed"] += 1
            if args.apply:
                restore_one(p)
                fixed.append(rel)

    print(f"Scanned {len(files)} modified files with morphology tags:")
    for k, v in tally.most_common():
        print(f"  {k}: {v}")
    if args.apply:
        print(f"\nRestored morphology tags on {len(fixed)} files.")
    elif not args.check:
        print("\n(dry run — pass --apply to write, --check to just report)")


if __name__ == "__main__":
    main()
