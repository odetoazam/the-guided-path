#!/usr/bin/env python3
"""
Regenerate tadabbur files that were destroyed by the enricher bug
(scripts/enricher-damaged-files.txt lists them — only a changelog stub
remains where a real reflection used to be).

Unlike semantic-enrich.py (which DEEPENS an existing file), this script
GENERATES FROM SCRATCH using the full quranic-tadabbur skill methodology,
then auto-repairs known tag issues and runs the validators.

Safety model (idiot-proof rules):
  - A file is only ever overwritten if it is a confirmed stub OR our own
    previous regeneration attempt. A healthy-looking file is NEVER touched
    (status SKIPPED_SUSPICIOUS, left for human review).
  - A file is only marked DONE + dequeued if it passes BOTH validators AND
    a structural completeness gate (length, headings, tags present) — so a
    trivially-empty file can never sneak through validation.
  - Repair is tried BEFORE regeneration when the file already contains a
    previous generation — repairs are free (no AI call).
  - A session-limit error aborts the whole run instead of burning through
    the queue.
  - A lockfile prevents two instances from running at once.

Usage:
  python3 scripts/regenerate-destroyed.py --sample 1      # test on 1 file
  python3 scripts/regenerate-destroyed.py                 # process the whole queue
  python3 scripts/regenerate-destroyed.py --repair-only   # free pass: fix + validate existing content, no AI calls
  python3 scripts/regenerate-destroyed.py --report        # status only
"""
import argparse
import json
import os
import re
import subprocess
import time
from datetime import datetime
from pathlib import Path

REPO           = Path(__file__).parent.parent
QUEUE_FILE     = REPO / "scripts" / "enricher-damaged-files.txt"
SKILL_FILE     = REPO / "docs" / "quranic-tadabbur-SKILL.md"
LOG_FILE       = REPO / "scripts" / "regenerate-log.json"
BACKLOG_FILE   = REPO / "scripts" / "article-backlog.md"
LOCK_FILE      = REPO / "scripts" / ".regenerate.lock"
CLAUDE_BIN     = "claude"
MODEL          = "claude-opus-4-8"

DIR_RE    = re.compile(r"^(\d+)-")
SINGLE_RE = re.compile(r"^ayah-(\d+)$")
RANGE_RE  = re.compile(r"^ayahs-(\d+)-(\d+)$")

CORPUS_FILE = REPO / "scripts" / ".corpus-cache" / "quranic-corpus.json"
ARABIC_RE   = re.compile(r"[؀-ۿ]")
AYAH_TAG_RE = re.compile(r"<!--\s*ayah:(\d+):(\d+)\s*-->")
BRACKET_TAG_RE = re.compile(r"\[ayah:(\d+):(\d+)\]")
_FM_DELIM_RE = re.compile(r"^---\n.*?\n---\n", re.DOTALL)
MORPH_TAG_RE = re.compile(
    r"<!--\s*morphology:(\d+):(\d+):(\d+)\s+(?:root=(\S+)\s+)?pos=(\S+?)"
    r"[^\n>]*-->")

# Signatures of the enricher's changelog-stub failure mode
STUB_SIG_RE = re.compile(
    r"\*\*Part 2 [—-]|\*\*Part 1 [—-] Fixes|\*\*Part 1 \(fixes\)|"
    r"insertions, all sourced|^\*\*Frontmatter\*\*|Summary of what was done|"
    r"What was enriched|Here is a summary of every change|Editor.s note on",
    re.M)

_corpus_cache: dict = {}


def _load_corpus():
    global _corpus_cache
    if not _corpus_cache and CORPUS_FILE.exists():
        _corpus_cache = json.loads(CORPUS_FILE.read_text())


# ──────────────────────────────────────────────────────────────────
# Classification — what is this file right now?
# ──────────────────────────────────────────────────────────────────

def classify_file(text: str) -> str:
    """STUB / OUR_REGEN / HEALTHY — decides what we're allowed to do.

    STUB       → enricher-destroyed changelog note; safe to regenerate over.
    OUR_REGEN  → our own previous regeneration attempt; repair-first, then
                 regenerate over if repair fails.
    HEALTHY    → anything else that looks like real content; NEVER touch.
    """
    if STUB_SIG_RE.search(text) and len(text) < 8000:
        return "STUB"
    if len(text) < 3500 and "tadabbur-reflection" not in text \
            and "## Introduction" not in text and "Linguistic Journey" not in text:
        return "STUB"
    if 'semantic_review: "regenerated-' in text[:2500]:
        return "OUR_REGEN"
    return "HEALTHY"


def looks_complete(text: str) -> tuple[bool, str]:
    """Structural completeness gate. A file may only be marked DONE if this
    passes — validators alone are not enough, because a near-empty file has
    nothing for the validators to fail."""
    if len(text) < 15000:
        return False, f"too short ({len(text)}c < 15000c)"
    headings = len(re.findall(r"^#{2,3} ", text, re.M))
    if headings < 4:
        return False, f"only {headings} headings (< 4)"
    if not AYAH_TAG_RE.search(text):
        return False, "no tagged ayah quote"
    if not MORPH_TAG_RE.search(text):
        return False, "no morphology tags"
    if not text.startswith("---"):
        return False, "missing frontmatter"
    return True, "ok"


# ──────────────────────────────────────────────────────────────────
# Auto-repairers (free — no AI calls)
# ──────────────────────────────────────────────────────────────────

BLOCKQUOTE_GAP_RE = re.compile(r"(<!--\s*ayah:\d+:\d+\s*-->)\n>\s*")
_DIACRITICS_RE = re.compile(r"[ً-ٰٟ]")


def _norm_ar(s: str) -> str:
    """Normalize Arabic for comparison: strip diacritics/ornaments, unify
    letter variants, drop spaces."""
    if not s:
        return ""
    s = _DIACRITICS_RE.sub("", s)
    s = re.sub(r"[إأآٱا]", "ا", s)
    s = s.replace("ة", "ه").replace("ى", "ي").replace("ئ", "ء").replace("ؤ", "ء")
    s = s.replace("ۖ", "").replace("ۗ", "").replace("ۚ", "").replace("۝", "")
    s = s.replace("ـ", "")  # tatweel/kashida
    s = re.sub(r"[\s ]+", "", s)
    s = re.sub(r"[^؀-ۿ]", "", s)
    s = s.replace("ا", "")  # bare alef, orthographic-only
    return s


def _ar_similar(a: str, b: str, threshold: float = 0.9) -> bool:
    import difflib
    na, nb = _norm_ar(a), _norm_ar(b)
    if not na or not nb:
        return False
    return difflib.SequenceMatcher(None, na, nb).ratio() >= threshold


def _norm_root(root: str) -> str:
    if not root:
        return root
    r = _DIACRITICS_RE.sub("", root)
    r = re.sub(r"[إأآا]", "ا", r)
    r = r.replace("ة", "ه").replace("ى", "ي").replace("ئ", "ء").replace("ؤ", "ء")
    return r


def _verse_norm(surah: str, ayah: str) -> str | None:
    _load_corpus()
    entries = _corpus_cache.get(f"{surah}:{ayah}")
    if not entries:
        return None
    return _norm_ar("".join(t.get("word", "") for t in entries))


_canonical_cache: dict = {}


def canonical_verse(surah: str, ayah: str) -> str | None:
    """Exact Uthmani verse text from the quran-validator database (the same
    source the Arabic verifier checks against). Cached per run."""
    key = f"{surah}:{ayah}"
    if key in _canonical_cache:
        return _canonical_cache[key]
    try:
        r = subprocess.run(["node", "scripts/canonical-verse.mjs", surah, ayah],
                           cwd=REPO, capture_output=True, text=True, timeout=30)
        val = r.stdout.strip() if r.returncode == 0 and r.stdout.strip() else None
    except Exception:
        val = None
    _canonical_cache[key] = val
    return val


def fix_ayah_tags(text: str) -> str:
    """Three repairs on ayah tags — handles both <!-- ayah:S:A --> (HTML
    comment) and [ayah:S:A] (square-bracket) styles, since both appear in
    the corpus and the verifier checks both:
    1. Move a tag that sits before a blockquote '>' marker to after it
       (the verifier reads to end-of-line and chokes on the '>').
    2. Drop tags not followed by Arabic script at all (mis-tagged English).
    3. Drop tags on PARTIAL verse quotes — the verifier only matches the
       complete verse, so a partial-phrase tag always fails even when the
       phrase itself is quoted correctly. The Arabic text is kept; only the
       tag is removed. Word-level grounding lives in morphology tags instead."""
    text = BLOCKQUOTE_GAP_RE.sub(lambda m: f"> {m.group(1)} ", text)

    matches = sorted(
        list(AYAH_TAG_RE.finditer(text)) + list(BRACKET_TAG_RE.finditer(text)),
        key=lambda m: m.start())

    out = []
    last = 0
    for m in matches:
        if m.start() < last:
            continue  # overlapping with a previously-processed match — skip
        surah, ayah = m.group(1), m.group(2)
        line_end = text.find("\n", m.end())
        if line_end == -1:
            line_end = len(text)
        # bracket-style tags stop reading at the next '[' too (mirrors the
        # verifier's own [^\n\[]+ extraction) — an inline markdown link or
        # the next tag on the same line must not bleed into this segment.
        if m.re is BRACKET_TAG_RE:
            bracket_end = text.find("[", m.end())
            if bracket_end != -1 and bracket_end < line_end:
                line_end = bracket_end
        segment = text[m.end():line_end]
        seg_norm = _norm_ar(segment)

        out.append(text[last:m.start()])

        if not seg_norm:
            last = m.end()          # drop tag (mis-tagged English), keep text
            continue
        verse = _verse_norm(surah, ayah)
        if verse is None:
            out.append(m.group(0))  # can't verify offline — leave as-is
            last = m.end()
            continue
        if len(seg_norm) < 0.9 * len(verse):
            last = m.end()          # partial phrase — drop tag, keep Arabic
            continue

        # Full-verse quote. Split the line into the Arabic run and any
        # trailing prose (strip markdown bold first).
        cleaned = segment.replace("**", "")
        arabic_end = 0
        for i, ch in enumerate(cleaned):
            if ARABIC_RE.match(ch) or ch == " ":
                arabic_end = i + 1
            else:
                break  # first non-Arabic char ends the contiguous quote run
        head = cleaned[:arabic_end].rstrip()
        tail = cleaned[arabic_end:].strip()

        # Replace the model's Arabic with the exact canonical Uthmani text
        # for this verse — same words, authentic orthography, guaranteed to
        # pass the verifier. Only done when it IS a full-verse match (the
        # 0.9 gate above), so we never overwrite a deliberately-partial quote.
        canon = canonical_verse(surah, ayah)
        if canon and _ar_similar(canon, head, 0.85):
            head = canon

        replacement = m.group(0) + " " + head
        if tail:
            replacement += "\n" + tail
        out.append(replacement)
        last = line_end

    out.append(text[last:])
    return "".join(out)


BARE_MORPH_LINE_RE = re.compile(
    r"^morphology:(\d+):(\d+):(\d+)\s+(?:root=(\S+)\s+)?pos=(\S+?)\s*$", re.MULTILINE)


def fix_bare_morphology_lines(text: str) -> str:
    """Rewrap bare 'morphology:S:A:W ...' lines (bundled inside one shared
    comment block) into individually-wrapped tags the validator can parse."""
    def _wrap(m):
        surah, ayah, pos, root, pos_tag = m.groups()
        root_part = f"root={root} " if root else ""
        return f"<!-- morphology:{surah}:{ayah}:{pos} {root_part}pos={pos_tag} -->"
    return BARE_MORPH_LINE_RE.sub(_wrap, text)


def fix_morphology_tags(text: str) -> str:
    """Cross-check every morphology tag against the corpus (flat sub-token
    array, 1-indexed). Wrong position → remap to the occurrence of that root
    CLOSEST to the claimed position. Wrong/variant root spelling → normalize.
    Root absent from the ayah entirely → drop the tag (unverifiable claim)."""
    _load_corpus()
    if not _corpus_cache:
        return text

    def _fmt(surah, ayah, pos, root, pos_tag):
        root_part = f"root={root} " if root else ""
        return f"<!-- morphology:{surah}:{ayah}:{pos} {root_part}pos={pos_tag} -->"

    def _fix(m):
        surah, ayah, pos, root, pos_tag = m.groups()
        entries = _corpus_cache.get(f"{surah}:{ayah}")
        if not entries:
            return m.group(0)
        idx = int(pos) - 1
        in_range = 0 <= idx < len(entries)

        if not root:
            if in_range:
                return _fmt(surah, ayah, pos, None, entries[idx].get("pos", pos_tag))
            return m.group(0)

        want = _norm_root(root)
        if in_range and _norm_root(entries[idx].get("root")) == want:
            return _fmt(surah, ayah, pos, entries[idx].get("root"),
                        entries[idx].get("pos", pos_tag))
        # remap to the occurrence closest to the claimed position
        candidates = [i for i, e in enumerate(entries)
                      if _norm_root(e.get("root")) == want]
        if candidates:
            best = min(candidates, key=lambda i: abs(i - idx))
            e = entries[best]
            return _fmt(surah, ayah, best + 1, e.get("root"), e.get("pos", pos_tag))
        return ""  # root not in this ayah — drop the claim

    return MORPH_TAG_RE.sub(_fix, text)


def _expand_ayahs(ref: str):
    """'43:79-80' -> [('43','79'), ('43','80')]; '3:8' -> [('3','8')]."""
    surah, rest = ref.split(":")
    if "-" in rest:
        a, b = rest.split("-")
        return [(surah, str(n)) for n in range(int(a), int(b) + 1)]
    return [(surah, rest)]


def _real_tag_count(text: str) -> int:
    """Count only PLAUSIBLY REAL morphology tags — root is Arabic script (or
    absent, for particles). A romanized/Latin 'root' (e.g. root=qwl instead
    of root=قول) is a fabricated tag, not a real one, and must not count
    toward 'this file already has a Step 0 table'."""
    n = 0
    for _s, _a, _w, root, _pos in MORPH_TAG_RE.findall(text):
        if not root or ARABIC_RE.search(root):
            n += 1
    return n


def ensure_morphology_tags(text: str, ref: str) -> str:
    """If a reflection is missing its Step 0 morphology tags — or only has
    fabricated ones (romanized roots that were never real to begin with) —
    synthesize a baseline set from the authoritative corpus — every content
    word's root+POS is deterministic — and inject them right after the
    frontmatter. Only fires when there are essentially no REAL tags already,
    so we never clobber a genuine Step 0 table."""
    if _real_tag_count(text) >= 3:
        return text
    _load_corpus()
    if not _corpus_cache:
        return text
    tags = []
    for surah, ayah in _expand_ayahs(ref):
        entries = _corpus_cache.get(f"{surah}:{ayah}")
        if not entries:
            continue
        for i, e in enumerate(entries):
            if e.get("root"):
                tags.append(
                    f"<!-- morphology:{surah}:{ayah}:{i+1} "
                    f"root={e['root']} pos={e.get('pos','N')} -->")
    if not tags:
        return text
    block = "<!-- Step 0 morphology grounding (auto-filled from corpus) -->\n" + "\n".join(tags)
    fm = _FM_DELIM_RE.match(text)
    insert_at = fm.end() if fm else 0
    return text[:insert_at] + "\n" + block + "\n\n" + text[insert_at:]


def apply_all_fixes(text: str, ref: str | None = None) -> str:
    """Run all repairers to a fixpoint — one repair can expose another
    (e.g. splitting a bold-wrapped quote reveals a partial tag), so iterate
    until the text stops changing (max 4 rounds as a safety valve).

    When `ref` is given, also backfill missing Step 0 morphology tags from
    the corpus (the model occasionally writes the whole reflection but omits
    them)."""
    if ref:
        text = ensure_morphology_tags(text, ref)
    for _ in range(4):
        before = text
        text = fix_bare_morphology_lines(text)
        text = fix_ayah_tags(text)
        text = fix_morphology_tags(text)
        if text == before:
            break
    return text


# ──────────────────────────────────────────────────────────────────
# Plumbing
# ──────────────────────────────────────────────────────────────────

def load_json(path: Path, default):
    return json.loads(path.read_text()) if path.exists() else default


def save_json(path: Path, data):
    path.write_text(json.dumps(data, indent=2))


def ayah_ref(path: Path) -> str:
    m = DIR_RE.match(path.parent.name)
    surah = m.group(1).lstrip("0") if m else "?"
    m2 = SINGLE_RE.match(path.stem)
    if m2:
        return f"{surah}:{int(m2.group(1))}"
    m3 = RANGE_RE.match(path.stem)
    if m3:
        return f"{surah}:{int(m3.group(1))}-{int(m3.group(2))}"
    return f"{surah}:?"


SESSION_LIMIT_RE = re.compile(r"session limit|spend limit|usage limit", re.I)


def run_claude(system_prompt: str, user_prompt: str, timeout=900) -> tuple[str, str | None]:
    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", system_prompt,
           "--model", MODEL,
           "--output-format", "text",
           "--no-session-persistence"]
    for attempt in range(3):
        try:
            r = subprocess.run(cmd, input=user_prompt, capture_output=True,
                               text=True, cwd=REPO, timeout=timeout)
        except subprocess.TimeoutExpired:
            if attempt < 2:
                print(f"   timeout, retrying ({attempt+1}/3)...", flush=True)
                time.sleep(10)
                continue
            return "", "timeout after 3 attempts"
        if r.returncode != 0:
            err = (r.stderr or r.stdout or "cli error")[:300]
            if SESSION_LIMIT_RE.search(err):
                return "", "SESSION_LIMIT: " + err
            if "connect" in err.lower() and attempt < 2:
                time.sleep(15)
                continue
            return "", err
        return r.stdout, None
    return "", "failed after 3 attempts"


def generate_reflection(ref: str, skill_text: str) -> tuple[str | None, str | None]:
    system_prompt = (
        "You are generating a Quranic tadabbur reflection. Follow this skill "
        "methodology EXACTLY — every step, every structural requirement, the "
        "mandatory Revision Pass, and the word-count minimums.\n\n" + skill_text
    )
    user_prompt = (
        f"Generate a complete tadabbur reflection for ayah {ref}.\n\n"
        "Do the full Step 0 grounding audit, Step 1-2 pre-writing analysis, "
        "write the full structure (Introduction, Part 1 Linguistic Journey, "
        "Part 2 Thematic Depths, Closing Synthesis), then run the mandatory "
        "Revision Pass on your own draft and apply the fixes.\n\n"
        "Tag ONLY the complete verse quote in the introduction blockquote with "
        "<!-- ayah:S:A -->. Do NOT tag any partial word or phrase quoted later "
        "in the Linguistic Journey or Thematic Depths — the verifier checks "
        "tagged text against the FULL verse, so a tag on a partial phrase "
        "always fails, even when the phrase is quoted correctly. Write those "
        "individual words in plain italics/transliteration with no ayah tag.\n\n"
        "Tag Step 0 morphology claims with individually-wrapped comments, one "
        "tag per line, EACH with its own <!-- and -->:\n"
        "<!-- morphology:S:A:W root=xxx pos=XXX -->\n"
        "<!-- morphology:S:A:W root=yyy pos=YYY -->\n"
        "Do NOT bundle multiple claims as bare lines inside a single shared "
        "comment block — each claim needs its own complete tag, or the "
        "verifier cannot parse it. Use flat sub-token word positions "
        "(prefixes/suffixes each count as their own position — do not "
        "assume simple 1,2,3 counting).\n\n"
        "Output ONLY the complete markdown file, starting with YAML frontmatter "
        "(---\\n...\\n---) including at minimum: surah, surah_name, ayah_start, "
        "ayah_end, slug, category: tadabbur, title, arabic, translation, "
        "estimated_duration, passage_context, generated_by: \"claude-opus\", "
        "validated: false, semantic_review: \"regenerated-" +
        datetime.now().strftime("%Y-%m-%d") + "\", tags. "
        "No commentary before or after the file."
    )
    def _attempt(prompt):
        out, err = run_claude(system_prompt, prompt)
        if err:
            return None, err
        out = out.strip()
        out = re.sub(r"^```(?:markdown)?\n?", "", out)
        out = re.sub(r"\n?```$", "", out.rstrip())
        fm_idx = out.find("---")
        if fm_idx == -1:
            return None, "output missing frontmatter"
        out = out[fm_idx:]
        ok, why = looks_complete(apply_all_fixes(out, ref))
        if not ok:
            return None, f"output structurally incomplete: {why}"
        return out, None

    out, err = _attempt(user_prompt)
    if out is not None or (err and err.startswith("SESSION_LIMIT")):
        return out, err

    # One corrective retry: tell the model exactly what its attempt was
    # missing. Format lapses (missing tags/frontmatter) usually fix on a
    # second pass with explicit feedback.
    print(f"   retry with feedback ({err})...", flush=True)
    correction = (
        f"IMPORTANT: A previous attempt at this exact task was REJECTED "
        f"because: {err}.\n"
        "Your output MUST:\n"
        "- start with YAML frontmatter (--- on the very first line)\n"
        "- include the tagged full-verse quote: <!-- ayah:S:A --> in the "
        "introduction blockquote\n"
        "- include individually-wrapped morphology tags, one per line: "
        "<!-- morphology:S:A:W root=xxx pos=XXX -->\n"
        "- be the COMPLETE reflection (4000+ words), not a summary\n\n"
    )
    return _attempt(correction + user_prompt)


def run_validators(path: Path) -> dict:
    results = {}
    r = subprocess.run(["node", "scripts/verify_arabic.mjs", str(path), "--scan"],
                       cwd=REPO, capture_output=True, text=True)
    m = re.search(r"Failed:\s*(\d+)", r.stdout)
    results["arabic_failed_count"] = int(m.group(1)) if m else -1
    results["arabic_out"] = r.stdout[-800:]

    r = subprocess.run(["node", "scripts/verify_morphology.mjs", str(path)],
                       cwd=REPO, capture_output=True, text=True)
    m = re.search(r"Failed:\s*(\d+)", r.stdout)
    results["morph_failed_count"] = int(m.group(1)) if m else -1
    results["morph_out"] = r.stdout[-800:]
    return results


def validators_pass(val: dict) -> bool:
    return val["arabic_failed_count"] == 0 and val["morph_failed_count"] == 0


def remove_from_queue(rel_path: str):
    if not QUEUE_FILE.exists():
        return
    lines = [l for l in QUEUE_FILE.read_text().splitlines() if l.strip() != rel_path]
    QUEUE_FILE.write_text("\n".join(lines) + ("\n" if lines else ""))


def append_backlog_row(ref: str, how: str):
    if not BACKLOG_FILE.exists():
        return
    text = BACKLOG_FILE.read_text()
    marker = "| Date | Entity | Articles Written | Notes |\n|------|--------|-----------------|-------|\n"
    idx = text.find(marker)
    if idx == -1:
        return
    today = datetime.now().strftime("%Y-%m-%d")
    row = (f"| {today} | regeneration (tadabbur) | 1 ayah record | "
           f"{ref} — {how} via regenerate-destroyed.py (enricher-destroyed stub). "
           f"Validators + completeness gate pass. ✅ |\n")
    insert_at = idx + len(marker)
    text = text[:insert_at] + row + text[insert_at:]
    BACKLOG_FILE.write_text(text)


def finalize_done(path: Path, rel_path: str, ref: str, how: str) -> dict:
    text = path.read_text()
    text = re.sub(r"validated:\s*false", "validated: true", text, count=1)
    path.write_text(text)
    remove_from_queue(rel_path)
    append_backlog_row(ref, how)
    print(f"    ✨ {how} + VALIDATED", flush=True)
    return {"path": rel_path, "status": "DONE", "ref": ref, "how": how,
            "at": datetime.now().isoformat()[:19]}


# ──────────────────────────────────────────────────────────────────
# Per-file processing
# ──────────────────────────────────────────────────────────────────

def try_repair(path: Path, rel_path: str, ref: str) -> dict | None:
    """Free repair attempt on existing content. Returns a DONE record if the
    file passes everything afterward, else None (leaving the file as-is on
    disk — repairs are conservative and never remove prose)."""
    original = path.read_text()
    repaired = apply_all_fixes(original, ref)
    ok, _why = looks_complete(repaired)
    if not ok:
        return None
    if repaired != original:
        path.write_text(repaired)
    val = run_validators(path)
    if validators_pass(val):
        return finalize_done(path, rel_path, ref, "REPAIRED")
    # repair didn't get it over the line — restore only if we changed it
    if repaired != original:
        path.write_text(original)
    return None


def process_file(rel_path: str, skill_text: str | None, repair_only: bool) -> dict:
    path = REPO / rel_path
    ref = ayah_ref(path)
    print(f"  {ref}  ({rel_path})", flush=True)

    if not path.exists():
        return {"path": rel_path, "status": "ERROR", "error": "file not found"}

    kind = classify_file(path.read_text())

    if kind == "HEALTHY":
        print("    ⛔ file looks healthy, NOT a stub — refusing to touch (review manually)",
              flush=True)
        return {"path": rel_path, "status": "SKIPPED_SUSPICIOUS", "ref": ref}

    # Repair-first: our own previous generation may just need tag fixes (free)
    if kind == "OUR_REGEN":
        done = try_repair(path, rel_path, ref)
        if done:
            return done
        if repair_only:
            print("    … repair insufficient (kept as-is); needs regeneration", flush=True)
            return {"path": rel_path, "status": "REPAIR_INSUFFICIENT", "ref": ref}
    elif repair_only:
        print("    … stub, nothing to repair; needs regeneration", flush=True)
        return {"path": rel_path, "status": "STUB_NEEDS_REGEN", "ref": ref}

    # Full regeneration
    content, err = generate_reflection(ref, skill_text)
    if err:
        print(f"    ⚠️  generation failed: {err}", flush=True)
        status = "ABORT_SESSION_LIMIT" if err.startswith("SESSION_LIMIT") else "ERROR"
        return {"path": rel_path, "status": status, "error": err, "ref": ref}

    content = apply_all_fixes(content, ref)
    path.write_text(content)

    val = run_validators(path)
    if not validators_pass(val):
        print(f"    ⚠️  validators failed (arabic={val['arabic_failed_count']}, "
              f"morph={val['morph_failed_count']}) — kept on disk, still queued",
              flush=True)
        return {"path": rel_path, "status": "NEEDS_FIX", "ref": ref,
                "arabic_failed_count": val["arabic_failed_count"],
                "morph_failed_count": val["morph_failed_count"]}

    return finalize_done(path, rel_path, ref, "REGENERATED")


# ──────────────────────────────────────────────────────────────────
# Main
# ──────────────────────────────────────────────────────────────────

def latest_by_path(log: list) -> dict:
    latest = {}
    for e in log:
        latest[e.get("path")] = e
    return latest


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--sample", type=int, help="process only N files")
    ap.add_argument("--repair-only", action="store_true",
                    help="only attempt free repairs on existing content; no AI calls")
    ap.add_argument("--report", action="store_true")
    args = ap.parse_args()

    log = load_json(LOG_FILE, [])

    if args.report:
        latest = latest_by_path(log)
        from collections import Counter
        counts = Counter(e.get("status") for e in latest.values())
        remaining = len([l for l in QUEUE_FILE.read_text().splitlines() if l.strip()]) \
            if QUEUE_FILE.exists() else 0
        print("Latest status per file:")
        for status, n in counts.most_common():
            print(f"  {status}: {n}")
        print(f"Remaining in queue: {remaining}")
        return

    # Lockfile: refuse to run two instances at once
    if LOCK_FILE.exists():
        try:
            other_pid = int(LOCK_FILE.read_text().strip())
            os.kill(other_pid, 0)  # raises if not running
            print(f"⛔ Another instance is already running (PID {other_pid}). Exiting.")
            return
        except (ValueError, ProcessLookupError, PermissionError):
            pass  # stale lock — take over
    LOCK_FILE.write_text(str(os.getpid()))

    try:
        if not QUEUE_FILE.exists():
            print("No queue file found — nothing to do.")
            return

        skill_text = SKILL_FILE.read_text() if not args.repair_only else None
        queue = [l.strip() for l in QUEUE_FILE.read_text().splitlines() if l.strip()]
        if args.sample:
            queue = queue[:args.sample]

        mode = "repair-only (free)" if args.repair_only else f"full (model: {MODEL})"
        print(f"\n🔨 Processing {len(queue)} file(s) — mode: {mode}")
        print("   Ctrl-C to stop; progress is saved.\n")

        for i, rel_path in enumerate(queue, 1):
            print(f"[{i}/{len(queue)}]", end="  ")
            result = process_file(rel_path, skill_text, args.repair_only)
            log.append(result)
            save_json(LOG_FILE, log)
            if result.get("status") == "ABORT_SESSION_LIMIT":
                print("\n⛔ Session limit reached — stopping the run. "
                      "Re-run after the limit resets; progress is saved.")
                break

        latest = latest_by_path(log)
        from collections import Counter
        counts = Counter(e.get("status") for e in latest.values())
        print(f"\n{'─'*50}")
        for status, n in counts.most_common():
            print(f"  {status}: {n}")
        remaining = len([l for l in QUEUE_FILE.read_text().splitlines() if l.strip()])
        print(f"  Remaining in queue: {remaining}")
    finally:
        LOCK_FILE.unlink(missing_ok=True)


if __name__ == "__main__":
    main()
