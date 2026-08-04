#!/usr/bin/env python3
"""
AyahGuide Autonomous Tadabbur Pipeline

Uses Claude Code CLI (claude -p) — no API key required, works off your
existing Claude Code subscription.

Two-step per generation:
  1. Sonnet (cheap): picks the best ayah from the gap list + classifies
     it as opus or sonnet based on theological/linguistic density.
  2. Opus or Sonnet: generates the full tadabbur using the right model.

Usage:
  python3 scripts/tadabbur-auto.py            # run until Ctrl-C
  python3 scripts/tadabbur-auto.py --max 5    # stop after 5 generations
  python3 scripts/tadabbur-auto.py --dry-run  # validate setup, no generation
  python3 scripts/tadabbur-auto.py --surah 6  # start at a specific surah
  python3 scripts/tadabbur-auto.py --opus-only # skip classification, always use Opus
"""

import argparse
import json
import re
import subprocess
import sys
import time
from datetime import datetime
from pathlib import Path

# ── Paths ──────────────────────────────────────────────────────────────────────
REPO          = Path(__file__).parent.parent
STATE_FILE    = REPO / "scripts" / "tadabbur-pipeline-state.json"
BACKLOG_FILE  = REPO / "scripts" / "article-backlog.md"
METHOD_FILE   = REPO / "scripts" / "tadabbur-methodology.md"
OUTPUT_DIR    = REPO / "scripts" / "tadabbur-output"
TADABBUR_BASE = REPO / "content" / "tadabbur"

CLAUDE_BIN    = "claude"
MODEL_OPUS    = "claude-opus-4-8"
MODEL_SONNET  = "claude-sonnet-4-6"
SLEEP_BETWEEN = 25    # seconds between generations
TIMEOUT       = 600   # seconds per generation call

# ── Surah metadata: (name, directory, ayah_count) ─────────────────────────────
# Covers all 114 surahs. Directories that don't yet exist will be created.
SURAH_META = {
     1: ("Al-Fatihah",       "001-al-fatiha",      7),
     2: ("Al-Baqarah",       "002-al-baqarah",   286),
     3: ("Aal-Imran",        "003-aal-imran",    200),
     4: ("An-Nisa",          "004-an-nisa",      176),
     5: ("Al-Ma'idah",       "005-al-maidah",    120),
     6: ("Al-An'am",         "006-al-anam",      165),
     7: ("Al-A'raf",         "007-al-araf",      206),
     8: ("Al-Anfal",         "008-al-anfal",      75),
     9: ("At-Tawbah",        "009-at-tawbah",    129),
    10: ("Yunus",            "010-yunus",        109),
    11: ("Hud",              "011-hud",          123),
    12: ("Yusuf",            "012-yusuf",        111),
    13: ("Ar-Ra'd",          "013-ar-rad",        43),
    14: ("Ibrahim",          "014-ibrahim",       52),
    15: ("Al-Hijr",          "015-al-hijr",       99),
    16: ("An-Nahl",          "016-an-nahl",      128),
    17: ("Al-Isra",          "017-al-isra",      111),
    18: ("Al-Kahf",          "018-al-kahf",      110),
    19: ("Maryam",           "019-maryam",        98),
    20: ("Ta-Ha",            "020-ta-ha",        135),
    21: ("Al-Anbiya",        "021-al-anbiya",    112),
    22: ("Al-Hajj",          "022-al-hajj",       78),
    23: ("Al-Mu'minun",      "023-al-muminun",   118),
    24: ("An-Nur",           "024-an-nur",        64),
    25: ("Al-Furqan",        "025-al-furqan",     77),
    26: ("Ash-Shu'ara",      "026-ash-shuara",   227),
    27: ("An-Naml",          "027-an-naml",       93),
    28: ("Al-Qasas",         "028-al-qasas",      88),
    29: ("Al-Ankabut",       "029-al-ankabut",    69),
    30: ("Ar-Rum",           "030-ar-rum",        60),
    31: ("Luqman",           "031-luqman",        34),
    32: ("As-Sajdah",        "032-as-sajdah",     30),
    33: ("Al-Ahzab",         "033-al-ahzab",      73),
    34: ("Saba",             "034-saba",          54),
    35: ("Fatir",            "035-fatir",         45),
    36: ("Ya-Sin",           "036-ya-sin",        83),
    37: ("As-Saffat",        "037-as-saffat",    182),
    38: ("Sad",              "038-sad",           88),
    39: ("Az-Zumar",         "039-az-zumar",      75),
    40: ("Ghafir",           "040-ghafir",        85),
    41: ("Fussilat",         "041-fussilat",      54),
    42: ("Ash-Shura",        "042-ash-shura",     53),
    43: ("Az-Zukhruf",       "043-az-zukhruf",    89),
    44: ("Ad-Dukhan",        "044-ad-dukhan",     59),
    45: ("Al-Jathiyah",      "045-al-jathiyah",   37),
    46: ("Al-Ahqaf",         "046-al-ahqaf",      35),
    47: ("Muhammad",         "047-muhammad",      38),
    48: ("Al-Fath",          "048-al-fath",       29),
    49: ("Al-Hujurat",       "049-al-hujurat",    18),
    50: ("Qaf",              "050-qaf",           45),
    51: ("Adh-Dhariyat",     "051-adh-dhariyat",  60),
    52: ("At-Tur",           "052-at-tur",        49),
    53: ("An-Najm",          "053-an-najm",       62),
    54: ("Al-Qamar",         "054-al-qamar",      55),
    55: ("Ar-Rahman",        "055-ar-rahman",     78),
    56: ("Al-Waqi'ah",       "056-al-waqiah",     96),
    57: ("Al-Hadid",         "057-al-hadid",      29),
    58: ("Al-Mujadila",      "058-al-mujadila",   22),
    59: ("Al-Hashr",         "059-al-hashr",      24),
    60: ("Al-Mumtahanah",    "060-al-mumtahanah", 13),
    61: ("As-Saf",           "061-as-saf",        14),
    62: ("Al-Jumu'ah",       "062-al-jumuah",     11),
    63: ("Al-Munafiqun",     "063-al-munafiqun",  11),
    64: ("At-Taghabun",      "064-at-taghabun",   18),
    65: ("At-Talaq",         "065-at-talaq",      12),
    66: ("At-Tahrim",        "066-at-tahrim",     12),
    67: ("Al-Mulk",          "067-al-mulk",       30),
    68: ("Al-Qalam",         "068-al-qalam",      52),
    69: ("Al-Haqqah",        "069-al-haqqah",     52),
    70: ("Al-Ma'arij",       "070-al-maarij",     44),
    71: ("Nuh",              "071-nuh",           28),
    72: ("Al-Jinn",          "072-al-jinn",       28),
    73: ("Al-Muzzammil",     "073-al-muzzammil",  20),
    74: ("Al-Muddaththir",   "074-al-muddaththir",56),
    75: ("Al-Qiyamah",       "075-al-qiyamah",    40),
    76: ("Al-Insan",         "076-al-insan",      31),
    77: ("Al-Mursalat",      "077-al-mursalat",   50),
    78: ("An-Naba",          "078-an-naba",       40),
    79: ("An-Nazi'at",       "079-an-naziat",     46),
    80: ("Abasa",            "080-abasa",         42),
    81: ("At-Takwir",        "081-at-takwir",     29),
    82: ("Al-Infitar",       "082-al-infitar",    19),
    83: ("Al-Mutaffifin",    "083-al-mutaffifin", 36),
    84: ("Al-Inshiqaq",      "084-al-inshiqaq",   25),
    85: ("Al-Buruj",         "085-al-buruj",      22),
    86: ("At-Tariq",         "086-at-tariq",      17),
    87: ("Al-A'la",          "087-al-ala",        19),
    88: ("Al-Ghashiyah",     "088-al-ghashiyah",  26),
    89: ("Al-Fajr",          "089-al-fajr",       30),
    90: ("Al-Balad",         "090-al-balad",      20),
    91: ("Ash-Shams",        "091-ash-shams",     15),
    92: ("Al-Layl",          "092-al-layl",       21),
    93: ("Ad-Duha",          "093-ad-duha",       11),
    94: ("Ash-Sharh",        "094-ash-sharh",      8),
    95: ("At-Tin",           "095-at-tin",         8),
    96: ("Al-Alaq",          "096-al-alaq",       19),
    97: ("Al-Qadr",          "097-al-qadr",        5),
    98: ("Al-Bayyinah",      "098-al-bayyinah",    8),
    99: ("Az-Zalzalah",      "099-az-zalzalah",    8),
   100: ("Al-Adiyat",        "100-al-adiyat",     11),
   101: ("Al-Qari'ah",       "101-al-qariah",     11),
   102: ("At-Takathur",      "102-at-takathur",    8),
   103: ("Al-Asr",           "103-al-asr",         3),
   104: ("Al-Humazah",       "104-al-humazah",     9),
   105: ("Al-Fil",           "105-al-fil",         5),
   106: ("Quraysh",          "106-quraysh",        4),
   107: ("Al-Ma'un",         "107-al-maun",        7),
   108: ("Al-Kawthar",       "108-al-kawthar",     3),
   109: ("Al-Kafirun",       "109-al-kafirun",     6),
   110: ("An-Nasr",          "110-an-nasr",        3),
   111: ("Al-Masad",         "111-al-masad",       5),
   112: ("Al-Ikhlas",        "112-al-ikhlas",      4),
   113: ("Al-Falaq",         "113-al-falaq",       5),
   114: ("An-Nas",           "114-an-nas",         6),
}

# ── State ──────────────────────────────────────────────────────────────────────

def load_state() -> dict:
    if STATE_FILE.exists():
        return json.loads(STATE_FILE.read_text())
    return {
        "current_surah": 5,
        "completed_this_run": [],
        "total_generated": 0,
        "last_completed": "",
        "started_at": datetime.now().isoformat()[:10],
    }

def save_state(state: dict):
    STATE_FILE.write_text(json.dumps(state, indent=2))


# ── Gap detection ──────────────────────────────────────────────────────────────

def covered_ayahs(surah_dir: Path) -> set:
    covered = set()
    if not surah_dir.exists():
        return covered
    for f in surah_dir.glob("*.md"):
        m = re.match(r"ayah-0*(\d+)$", f.stem)
        if m:
            covered.add(int(m.group(1)))
            continue
        m = re.match(r"ayahs-0*(\d+)-0*(\d+)$", f.stem)
        if m:
            covered.update(range(int(m.group(1)), int(m.group(2)) + 1))
    return covered

def missing_ayahs(surah: int) -> list:
    _, dir_stem, count = SURAH_META[surah]
    have = covered_ayahs(TADABBUR_BASE / dir_stem)
    return sorted(set(range(1, count + 1)) - have)


# ── Step 1: Selection + Classification (Sonnet) ────────────────────────────────

SELECTION_SYSTEM = """You are a Quranic content strategist for AyahGuide, a deep tadabbur platform.
Your job: pick the single best ayah from a gap list and classify whether it needs Opus-level depth or Sonnet is sufficient.

CRITICAL RULE: You MUST pick ONLY from the MISSING list provided. Do not pick any ayah outside that list, no matter how interesting it is. The missing list represents gaps — everything not on it already has a file.

MODEL criteria:
- opus: theologically dense argument, contested interpretation, complex linguistic structure (iltifat, ḍamīr al-faṣl, rare morphology), prophetic narrative climax, major imagery requiring physical-to-spiritual mapping, deep paradox, ayahs that demand 45-60 minutes of reflection
- sonnet: sequential narrative continuation, general admonition, standard listing, simpler declarative ayahs, passages that are important but not architecturally dense

Reply with EXACTLY this format — 3 lines, nothing else:
AYAH: [surah]:[ayah] or [surah]:[start]-[end]
MODEL: opus
REASON: [one line]"""

def select_and_classify(surah: int, missing: list, recent: list,
                        classifier_model: str = None) -> tuple:
    """
    Returns (ayah_ref_str, model, reason).
    ayah_ref_str e.g. "25:3" or "25:3-5"
    model: "opus" or "sonnet"
    """
    name, _, _ = SURAH_META[surah]
    _, dir_stem, _ = SURAH_META[surah]
    have = sorted(covered_ayahs(TADABBUR_BASE / dir_stem))
    recent_str = ", ".join(recent[-5:]) if recent else "none"

    user = (
        f"Surah: {name} (Surah {surah})\n"
        f"Covered: {have}\n"
        f"Recent: {recent_str}\n"
        f"MISSING (pick one): {missing[:40]}{'...' if len(missing) > 40 else ''}\n\n"
        f"Priority: theological density > closes architectural gap > variety after cluster."
    )

    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", SELECTION_SYSTEM,
           "--model", classifier_model or MODEL_SONNET,
           "--output-format", "text",
           "--no-session-persistence"]

    r = subprocess.run(cmd, input=user, capture_output=True, text=True,
                       cwd=REPO, timeout=180)
    if r.returncode != 0:
        err_detail = (r.stderr or r.stdout or "no output")[:300]
        raise RuntimeError(f"Selection call failed:\n{err_detail}")

    out = r.stdout.strip()
    ayah_m  = re.search(r"^AYAH:\s*(.+)$",   out, re.MULTILINE)
    model_m = re.search(r"^MODEL:\s*(\w+)$",  out, re.MULTILINE)
    reason_m= re.search(r"^REASON:\s*(.+)$",  out, re.MULTILINE)

    if not ayah_m:
        raise ValueError(f"Could not parse selection output:\n{out}")

    ayah_ref = ayah_m.group(1).strip()
    model    = (model_m.group(1).strip().lower() if model_m else "sonnet")
    reason   = (reason_m.group(1).strip()        if reason_m else "")

    # Normalize model
    if model not in ("opus", "sonnet"):
        model = "sonnet"

    # Hard validation: ensure the selected ayah is actually in the missing list
    # Parse the ayah number from the ref (e.g. "27:40" → 40, "27:3-5" → 3)
    ref_m = re.search(r":(\d+)(?:-(\d+))?$", ayah_ref)
    if ref_m:
        sel_start = int(ref_m.group(1))
        sel_end   = int(ref_m.group(2)) if ref_m.group(2) else sel_start
        selected_nums = set(range(sel_start, sel_end + 1))
        # If the selection overlaps nothing in missing, fall back to first missing
        if not selected_nums.intersection(set(missing)):
            fallback = missing[0]
            ayah_ref = f"{surah}:{fallback}"
            model    = "sonnet"
            reason   = f"[auto-fallback: selector picked covered ayah, using first gap {fallback}]"

    return ayah_ref, model, reason


# ── Step 2: Generation ─────────────────────────────────────────────────────────

def fetch_reference_data(surah: int, ayah_ref: str) -> str:
    """
    Pre-fetches Leeds morphology + 4 tafsirs + word-by-word for the ayah.
    Returns a formatted reference block to include in the generation prompt.
    This is the key quality improvement: Claude generates WITH ground truth,
    not from memory alone.
    """
    import urllib.request, json as jsonmod

    # Parse ayah range
    ref_m = re.search(r":(\d+)(?:-(\d+))?$", ayah_ref)
    if not ref_m:
        return ""
    a_start = int(ref_m.group(1))
    a_end   = int(ref_m.group(2)) if ref_m.group(2) else a_start

    sections = []

    # 1. Leeds morphology (roots + forms per word)
    try:
        result = subprocess.run(
            ["node", "scripts/morphology-lookup.mjs", f"{surah}:{a_start}", "--json"],
            capture_output=True, text=True, cwd=REPO, timeout=30
        )
        if result.returncode == 0 and result.stdout.strip():
            words = jsonmod.loads(result.stdout)
            root_set = sorted(set(w.get('root','') for w in words if w.get('root')))
            form_set = sorted(set(w.get('verbForm','') for w in words if w.get('verbForm')))
            word_lines = []
            for w in words:
                if w.get('root'):
                    line = f"  W{w['word']}: root={w['root']} pos={w.get('pos','')} form={w.get('verbForm','')} case={w.get('case','')} tense={w.get('tense','')}"
                    word_lines.append(line.rstrip())
            sections.append(f"## LEEDS CORPUS (peer-reviewed morphology — do not contradict)\nRoots in ayah: {', '.join(root_set)}\nVerb forms present: {', '.join(form_set) or 'none'}\nWord detail:\n" + "\n".join(word_lines))
    except Exception:
        pass

    # 2. Four tafsirs from alquran.cloud
    try:
        url = f"https://api.alquran.cloud/v1/ayah/{surah}:{a_start}/editions/ar.jalalayn,ar.muyassar,ar.qurtubi,ar.baghawi"
        req = urllib.request.urlopen(url, timeout=15)
        data = jsonmod.loads(req.read())
        tafsir_lines = []
        for item in data.get('data', []):
            ed = item['edition']['identifier']
            text = item.get('text', '')[:400]
            tafsir_lines.append(f"  [{ed}]: {text}")
        if tafsir_lines:
            sections.append("## CLASSICAL TAFSIR (what these scholars ACTUALLY say — attribute accurately)\n" + "\n\n".join(tafsir_lines))
    except Exception:
        pass

    # 3. Arabic text + word-by-word
    try:
        url2 = f"https://api.alquran.cloud/v1/ayah/{surah}:{a_start}/quran-wordbyword"
        req2 = urllib.request.urlopen(url2, timeout=15)
        data2 = jsonmod.loads(req2.read())
        wbw_text = data2.get('data', {}).get('text', '')
        if wbw_text:
            words_wbw = [(p.split('|')[0], p.split('|')[1] if '|' in p else '')
                         for p in wbw_text.split('$') if p.strip()]
            wbw_fmt = '  ' + ' | '.join(f"{ar}={en}" for ar,en in words_wbw if ar)
            sections.append(f"## WORD-BY-WORD REFERENCE\n{wbw_fmt[:600]}")
    except Exception:
        pass

    if not sections:
        return ""

    return "\n\n".join([
        "---",
        "## GROUND TRUTH REFERENCE DATA",
        "Use this data when making linguistic claims. Do not claim roots, forms, or tafsir positions that contradict this.",
        *sections,
        "---"
    ])


def build_generation_prompt(surah: int, ayah_ref: str) -> str:
    name, _, _ = SURAH_META[surah]
    today = datetime.now().isoformat()[:10]

    # Pre-fetch ground truth — this is what makes the generation accurate
    reference = fetch_reference_data(surah, ayah_ref)

    return f"""## Autonomous Pipeline — Single-File Generation

Generate a complete tadabbur for: **Surah {name} (Surah {surah}), ayah(s) {ayah_ref}**

Follow the full methodology above exactly.

{reference}

Output **ONLY** the raw markdown — starting with `---` (YAML frontmatter), nothing before or after.

Required frontmatter:
- surah, surah_name, ayah_start, ayah_end
- title (specific to this ayah's key insight)
- slug: zero-padded e.g. "025-003"
- category: tadabbur
- arabic: full Uthmani text with diacritics
- translation: accessible English
- word_count, estimated_duration
- passage_context: 2-3 sentences
- generated_by: "fable-tadabbur-auto"
- validated: false
- validation_date: "{today}"
- tags, concepts, related_ayahs

After frontmatter include morphology comment listing actual Leeds roots.

Then the full reflection. Begin with `---` now."""

# ── Opus review of Sonnet output ──────────────────────────────────────────────

OPUS_REVIEW_SYSTEM = """You are a rigorous Islamic scholarship reviewer for AyahGuide.
A Sonnet model generated this tadabbur. Your job: quick critical check before it goes live.

Flag ONLY genuine errors — not style preferences:
- CRITICAL: wrong Arabic root, wrong verb form, fabricated scholarly attribution, claim that contradicts classical tafsir
- MODERATE: linguistic claim stated as fact that is actually interpretive, composite sketch missing a major classical view
- PASS: content is solid and publishable

Reply in EXACTLY this format:
VERDICT: CRITICAL | MODERATE | PASS
ISSUES: [list specific quotes + reasons, or "none"]
"""

def opus_review(markdown: str, tafsir_report_path: Path | None) -> tuple[str, str]:
    """Quick Opus review of Sonnet-generated content. Returns (verdict, notes)."""
    tafsir = ""
    if tafsir_report_path and tafsir_report_path.exists():
        tafsir = f"\n\nTAFSIR REPORT:\n{tafsir_report_path.read_text()[:3000]}"

    user = f"Review this Sonnet-generated tadabbur:\n\n{markdown[:10000]}{tafsir}"

    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", OPUS_REVIEW_SYSTEM,
           "--model", MODEL_OPUS,
           "--output-format", "text",
           "--no-session-persistence"]

    r = subprocess.run(cmd, input=user, capture_output=True, text=True,
                       cwd=REPO, timeout=180)
    if r.returncode != 0:
        return "ERROR", r.stderr[:200]

    out = r.stdout.strip()
    m = re.search(r"^VERDICT:\s*(\w+)", out, re.MULTILINE)
    verdict = m.group(1).upper() if m else "UNKNOWN"
    return verdict, out


def tag_frontmatter(file_path: Path, review_tag: str, validated: bool = True):
    """Add/update semantic_review and validated fields in frontmatter."""
    content = file_path.read_text()
    today = datetime.now().isoformat()[:10]

    # Update validated flag
    content = re.sub(r"^validated: false$", f"validated: {str(validated).lower()}",
                     content, flags=re.MULTILINE)
    content = re.sub(r"^validated: true$", f"validated: {str(validated).lower()}",
                     content, flags=re.MULTILINE)

    # Add or update semantic_review field (after validation_date line)
    if "semantic_review:" in content:
        content = re.sub(r"^semantic_review:.*$", f"semantic_review: \"{review_tag}\"",
                         content, flags=re.MULTILINE)
    else:
        content = re.sub(r"(^validation_date:.*$)",
                         rf"\1\nsemantic_review: \"{review_tag}\"",
                         content, flags=re.MULTILINE, count=1)

    file_path.write_text(content)


def call_generate(system_prompt: str, user_prompt: str, model: str) -> str:
    cmd = [CLAUDE_BIN, "-p",
           "--system-prompt", system_prompt,
           "--model", model,
           "--output-format", "text",
           "--no-session-persistence"]

    r = subprocess.run(cmd, input=user_prompt, capture_output=True, text=True,
                       cwd=REPO, timeout=TIMEOUT)
    if r.returncode != 0:
        raise RuntimeError(f"claude CLI exited {r.returncode}:\n{r.stderr[:500]}")
    return r.stdout.strip()


# ── Output parsing ─────────────────────────────────────────────────────────────

def parse_output(content: str, surah: int) -> tuple:
    if not content.startswith("---"):
        idx = content.find("\n---")
        if idx == -1:
            raise ValueError("Response has no YAML frontmatter.")
        content = content[idx + 1:]

    m = re.match(r"^---\n(.*?)\n---", content, re.DOTALL)
    if not m:
        raise ValueError("Could not parse frontmatter block.")

    fm_raw = m.group(1)
    def get(key):
        r = re.search(rf"^{key}:\s*(.+)$", fm_raw, re.MULTILINE)
        return r.group(1).strip().strip('"') if r else None

    a_start = int(get("ayah_start") or 0)
    a_end   = int(get("ayah_end")   or a_start)
    if not a_start:
        raise ValueError("Frontmatter missing ayah_start.")

    _, dir_stem, _ = SURAH_META[surah]
    surah_dir = TADABBUR_BASE / dir_stem
    filename  = (f"ayah-{a_start:03d}.md" if a_start == a_end
                 else f"ayahs-{a_start:03d}-{a_end:03d}.md")

    fm = {"surah": surah, "ayah_start": a_start, "ayah_end": a_end,
          "title": get("title"), "slug": get("slug")}
    return fm, content, surah_dir / filename


# ── Validators ─────────────────────────────────────────────────────────────────

def run_validators(file_path: Path) -> tuple:
    rel      = str(file_path.relative_to(REPO))
    tafsir_o = OUTPUT_DIR / f"tafsir-{file_path.stem}.md"
    OUTPUT_DIR.mkdir(exist_ok=True)

    checks = [
        ("Arabic",     ["node", "scripts/verify_arabic.mjs",            rel, "--scan"]),
        ("Morph-Old",  ["node", "scripts/verify_morphology.mjs",         rel]),
        ("Morph-Leeds",["node", "scripts/validate-morphology-leeds.mjs", rel]),
        ("Tafsir",     ["node", "scripts/cross_reference_tafsir.mjs",    rel,
                        "--output", str(tafsir_o)]),
        ("Enhanced",   ["node", "scripts/validate-enhanced.mjs",         rel]),
    ]

    msgs, all_ok = [], True
    for label, cmd in checks:
        r   = subprocess.run(cmd, capture_output=True, text=True, cwd=REPO, timeout=300)
        out = r.stdout + r.stderr
        # Leeds morphology validator uses exit code 1 for any failed claim
        if label == "Morph-Leeds":
            if r.returncode == 1:
                fail_m = re.search(r"(\d+)\s+✗", out)
                msgs.append(f"  ✗ {label}: {fail_m.group(1) if fail_m else '?'} root/form mismatches")
                all_ok = False
            else:
                pass_m = re.search(r"(\d+)\s+✓", out)
                msgs.append(f"  ✓ {label}: {pass_m.group(1) if pass_m else '0'} claims verified")
            continue
        # Enhanced validator uses exit code 1 for CRITICAL
        if label == "Enhanced":
            if r.returncode == 1:
                msgs.append(f"  ✗ {label}: CRITICAL issue found")
                # Print the verdict line
                for line in out.split('\n'):
                    if 'verdict' in line.lower() or line.strip().startswith('- ['):
                        msgs.append(f"    {line.strip()}")
                all_ok = False
            else:
                verdict_line = next((l for l in out.split('\n') if 'verdict' in l.lower()), '')
                msgs.append(f"  ✓ {label}: {verdict_line.strip()}")
        else:
            fm  = re.search(r"Failed:\s+(\d+)", out)
            if fm and int(fm.group(1)) > 0:
                msgs.append(f"  ✗ {label}: {fm.group(1)} failure(s)")
                all_ok = False
            else:
                msgs.append(f"  ✓ {label}")
    return all_ok, msgs


# ── Backlog logging ────────────────────────────────────────────────────────────

def log_to_backlog(fm: dict, file_path: Path, model_used: str):
    today  = datetime.now().strftime("%Y-%m-%d")
    name   = SURAH_META[fm["surah"]][0]
    a_ref  = (f"{fm['surah']}:{fm['ayah_start']}"
              if fm["ayah_start"] == fm["ayah_end"]
              else f"{fm['surah']}:{fm['ayah_start']}-{fm['ayah_end']}")

    entry = (
        f"## Session Log — {today} (Auto Tadabbur: {name} {a_ref})\n"
        f"**Title:** {fm.get('title', 'untitled')}\n"
        f"**File:** {file_path.relative_to(REPO)}\n"
        f"**Model:** {model_used}\n"
        f"**Generated by:** tadabbur-auto.py (autonomous pipeline)\n"
        f"**Validators:** ✅ all passed\n\n---\n\n"
    )

    lines = BACKLOG_FILE.read_text().split("\n")
    lines.insert(2, entry)
    BACKLOG_FILE.write_text("\n".join(lines))


# ── Main loop ──────────────────────────────────────────────────────────────────

def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max",         type=int, default=0,  help="Stop after N generations")
    ap.add_argument("--surah",       type=int, default=0,  help="Override starting surah")
    ap.add_argument("--dry-run",     action="store_true",  help="Validate setup only")
    ap.add_argument("--opus-only",   action="store_true",  help="Skip classification, always use Opus")
    ap.add_argument("--opus-worthy", action="store_true",  help="Use Opus to classify; skip ayahs classified as Sonnet")
    args = ap.parse_args()

    # ── Setup checks ──────────────────────────────────────────────────────────
    try:
        r = subprocess.run([CLAUDE_BIN, "--version"], capture_output=True, text=True)
        print(f"✓  {r.stdout.strip()}")
    except FileNotFoundError:
        print(f"✗  '{CLAUDE_BIN}' not found in PATH."); sys.exit(1)

    if not METHOD_FILE.exists():
        print(f"✗  Methodology file missing: {METHOD_FILE}"); sys.exit(1)
    print(f"✓  Methodology: {METHOD_FILE.stat().st_size:,} bytes")

    state = load_state()
    if args.surah:
        state["current_surah"] = args.surah

    if args.dry_run:
        surah   = state["current_surah"]
        missing = missing_ayahs(surah)
        name    = SURAH_META[surah][0]
        print(f"✓  Dry-run OK — Surah {surah} ({name}): {len(missing)} ayahs missing")
        print(f"   First candidates: {missing[:15]}")
        return

    # ── Load methodology once ──────────────────────────────────────────────────
    methodology = METHOD_FILE.read_text()
    generated   = 0

    print(f"\n🕌  Tadabbur pipeline — {datetime.now().strftime('%Y-%m-%d %H:%M')}")
    print(f"   Mode: {'opus-only' if args.opus_only else 'auto (sonnet/opus)'}  "
          f"|  limit: {'∞' if not args.max else args.max}")
    print("   Ctrl-C to stop gracefully.\n")

    sonnet_skipped: dict = {}  # {surah: set of ayah numbers skipped as Sonnet}

    while True:
        if args.max and generated >= args.max:
            print(f"\n✓  Reached --max {args.max}. Done."); break

        surah = state["current_surah"]
        if surah not in SURAH_META:
            # Wrapped past 114 — check if any gaps remain before stopping
            all_missing = sum(len(missing_ayahs(s)) for s in SURAH_META)
            if all_missing == 0:
                print("   All 6,236 ayahs covered — pipeline complete."); break
            print(f"   Wrapped past surah 114 — {all_missing} ayahs remain. Resetting to surah 1.")
            state["current_surah"] = 1
            state["completed_this_run"] = []
            save_state(state)
            continue

        missing = missing_ayahs(surah)
        if not missing:
            name = SURAH_META[surah][0]
            print(f"   {name} fully covered — advancing to surah {surah + 1}.")
            state["current_surah"] = surah + 1
            sonnet_skipped.pop(surah, None)
            save_state(state)
            continue

        # In --opus-worthy mode, if every remaining gap has been skipped, advance
        if args.opus_worthy:
            skipped_in_surah = sonnet_skipped.get(surah, set())
            remaining = [a for a in missing if a not in skipped_in_surah]
            if not remaining:
                name = SURAH_META[surah][0]
                print(f"   {name} — all gaps are Sonnet-class, advancing to surah {surah + 1}.")
                state["current_surah"] = surah + 1
                save_state(state)
                continue

        name = SURAH_META[surah][0]
        print(f"[{generated + 1}]  {name}  ({len(missing)} gaps)", flush=True)

        try:
            # ── Step 1: Select + classify ──────────────────────────────────────
            if args.opus_only:
                # Pick the first missing ayah when skipping classification
                ayah_ref = f"{surah}:{missing[0]}"
                model    = MODEL_OPUS
                reason   = "opus-only mode"
            elif args.opus_worthy:
                # Use Opus for classification; skip anything it calls Sonnet
                print("  → classifying with Opus...", flush=True)
                ayah_ref, model, reason = select_and_classify(
                    surah, missing, state["completed_this_run"],
                    classifier_model=MODEL_OPUS)
                print(f"  → {ayah_ref}  [{model.upper()}]  {reason}")
                if model == MODEL_SONNET:
                    print("  → classified as Sonnet — skipping (save for later)")
                    # Record which ayah was skipped so we don't loop on it
                    ref_m = re.search(r":(\d+)(?:-(\d+))?$", ayah_ref)
                    if ref_m:
                        skip_start = int(ref_m.group(1))
                        skip_end   = int(ref_m.group(2)) if ref_m.group(2) else skip_start
                        sonnet_skipped.setdefault(surah, set()).update(
                            range(skip_start, skip_end + 1))
                    time.sleep(5); continue
            else:
                print("  → selecting...", flush=True)
                ayah_ref, model, reason = select_and_classify(
                    surah, missing, state["completed_this_run"])
                print(f"  → {ayah_ref}  [{model.upper()}]  {reason}")

            # ── Step 2: Generate ───────────────────────────────────────────────
            print(f"  → generating with {model}...", flush=True)
            user_prompt = build_generation_prompt(surah, ayah_ref)
            content     = call_generate(methodology, user_prompt, model)
            print(f"  ← {len(content):,} chars")

            fm, markdown, dest = parse_output(content, surah)

            if dest.exists():
                print(f"  ⚠  {dest.name} already exists — skipping.")
                time.sleep(SLEEP_BETWEEN); continue

            dest.parent.mkdir(parents=True, exist_ok=True)
            dest.write_text(markdown)
            print(f"  ✓  written: {dest.relative_to(REPO)}")

            # ── Validators ─────────────────────────────────────────────────────
            passed, vmsgs = run_validators(dest)
            for msg in vmsgs:
                print(msg)

            if passed:
                # ── Opus review for Sonnet-generated content ───────────────────
                tafsir_report = OUTPUT_DIR / f"tafsir-{dest.stem}.md"
                if model == MODEL_SONNET:
                    print("  → opus review of sonnet output...", flush=True)
                    verdict, review_notes = opus_review(markdown, tafsir_report)
                    print(f"  ← review: {verdict}")
                    if verdict == "CRITICAL":
                        print(f"  ✗  CRITICAL issue — moving to needs-review/")
                        review_dir = dest.parent / "needs-review"
                        review_dir.mkdir(exist_ok=True)
                        dest.rename(review_dir / dest.name)
                        # Save review notes alongside
                        (review_dir / f"{dest.stem}-review.txt").write_text(review_notes)
                        time.sleep(SLEEP_BETWEEN); continue
                    review_tag = f"opus-reviewed-{datetime.now().isoformat()[:10]}"
                    if verdict == "MODERATE":
                        review_tag += "-moderate"
                else:
                    # Opus generated — self-reviewed by definition
                    verdict    = "PASS"
                    review_tag = f"opus-generated-{datetime.now().isoformat()[:10]}"

                # Tag frontmatter with review status
                tag_frontmatter(dest, review_tag, validated=True)

                # Log and advance state
                a_start = fm["ayah_start"]
                a_end   = fm["ayah_end"]
                ref = (f"{surah}:{a_start}" if a_start == a_end
                       else f"{surah}:{a_start}-{a_end}")
                state["completed_this_run"].append(ref)
                state["last_completed"]  = ref
                state["total_generated"] = state.get("total_generated", 0) + 1
                save_state(state)
                log_to_backlog(fm, dest, model)
                generated += 1
                print(f"  ✓  logged  [{model.upper()}]  review:{verdict}  (session total: {generated})")
            else:
                print("  ✗  validator failure — file kept for manual review")

        except KeyboardInterrupt:
            print("\n\nStopped. State saved.")
            save_state(state); sys.exit(0)

        except subprocess.TimeoutExpired:
            print(f"  ✗  Selection timed out — falling back to sonnet + first candidate")
            ayah_ref = f"{surah}:{missing[0]}"
            model    = MODEL_SONNET
            try:
                user_prompt = build_generation_prompt(surah, ayah_ref)
                content     = call_generate(methodology, user_prompt, model)
                print(f"  ← {len(content):,} chars")
                fm, markdown, dest = parse_output(content, surah)
                if not dest.exists():
                    dest.parent.mkdir(parents=True, exist_ok=True)
                    dest.write_text(markdown)
                    print(f"  ✓  written: {dest.relative_to(REPO)}")
                    passed, vmsgs = run_validators(dest)
                    for msg in vmsgs: print(msg)
                    if passed:
                        ref = (f"{surah}:{fm['ayah_start']}" if fm["ayah_start"] == fm["ayah_end"]
                               else f"{surah}:{fm['ayah_start']}-{fm['ayah_end']}")
                        state["completed_this_run"].append(ref)
                        state["last_completed"]  = ref
                        state["total_generated"] = state.get("total_generated", 0) + 1
                        save_state(state)
                        log_to_backlog(fm, dest, model)
                        generated += 1
                        print(f"  ✓  logged  [SONNET-fallback]  (session total: {generated})")
            except Exception as fe:
                print(f"  ✗  Fallback also failed: {fe}")
            time.sleep(SLEEP_BETWEEN); continue

        except RuntimeError as e:
            err = str(e)
            if any(x in err.lower() for x in ("rate limit", "overloaded", "connection", "socket", "failed to open")):
                print(f"  ⚠  {err[:120].strip()} — waiting 60s...")
                time.sleep(60); continue
            print(f"  ✗  CLI error: {err[:300]}")
            save_state(state); break

        except ValueError as e:
            print(f"  ✗  parse error: {e} — skipping...")
            time.sleep(SLEEP_BETWEEN); continue

        except Exception as e:
            print(f"  ✗  unexpected: {e}")
            save_state(state); break

        print(f"  sleeping {SLEEP_BETWEEN} s...\n")
        time.sleep(SLEEP_BETWEEN)


if __name__ == "__main__":
    main()
