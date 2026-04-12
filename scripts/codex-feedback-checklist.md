# Codex Tadabbur Quality Checklist

Read this before every tadabbur generation or completion pass.

---

## The Core Problem to Fix

The existing 480 Codex-generated files (`generated_by: "codex-tadabbur"`) have good prose but are structurally incomplete. They are missing closing sections and have no tafsir citations. The goal of a completion pass is to finish what was started — not to regenerate.

---

## Two Types of Work

### Type A — Expand + Complete (files under 1,500 words)

The file has an intro and Part 1 but Part 2 is absent or one paragraph. You must:

1. Write full Part 2 thematic sections:
   - 2–3 themes minimum
   - Each theme 600–1,200 words
   - Each theme cites at least one classical mufassir by name
   - Each theme includes at least one cross-Quranic parallel (different surah, same theme)
   - Each theme develops beyond what Part 1 already said — do not restate

2. Write all five Closing Synthesis sub-sections (see below)

3. Set `generated_by: "codex-tadabbur-v2"` in frontmatter

### Type B — Complete Only (files 1,500+ words)

The file has solid prose throughout but is missing the closing ritual and tafsir citations. You must:

1. Add tafsir citations into the existing Part 2 themes:
   - At least 2 different named mufassirun total (Ibn Kathir, Tabari, Qurtubi, Sa'di, Ibn Ashur, or Razi)
   - Cite them in context, woven into the argument — not appended as a footnote list

2. Add any missing Closing Synthesis sub-sections (see below)

3. Set `generated_by: "codex-tadabbur-v2"` in frontmatter

---

## Required Closing Synthesis Sub-Sections

Every completed file must have all five of these under `## Closing Synthesis`:

```
### The Architecture of the Passage
[Prose description of the structural logic — how the ayahs build, turn, and land]

### Questions to Carry
[4–6 personal reflection questions. Each 2–3 sentences. Specific to this passage, not generic.]

### One-Sentence Distillation
[**Bold.** The entire passage compressed to one sentence that could not describe any other ayah.]

### The Closing Invitation
[A paragraph inviting the reader into lived practice — concrete, not abstract.]

### Du'a
[A written supplication in English that embodies what the passage teaches. 4–8 lines.]
```

---

## Mandatory Quality Checks Before Marking Done

Run through this list for every file before setting `generated_by: "codex-tadabbur-v2"`:

- [ ] Word count ≥ 4,000 for multi-ayah units; ≥ 3,000 for single-ayah units
- [ ] `estimated_duration` matches actual depth using this default formula: low end = `word_count / 120`, high end = `word_count / 90`, rounded to nearest 5 minutes
- [ ] Part 2 has ≥ 2 themes, each ≥ 600 words
- [ ] At least 2 named classical mufassirun cited in Part 2
- [ ] Classical tafsir is distributed through the file rather than clustered in one burst; aim for a natural mufassir touchpoint every 500–800 words
- [ ] At least 1 cross-Quranic parallel in Part 2 (different surah cited)
- [ ] All 5 Closing Synthesis sub-sections present
- [ ] Each major theme enters lived psychological tension before resolving; do not stay only in "here is what the passage means" mode
- [ ] Questions to Carry are passage-specific (would not fit a different ayah)
- [ ] Du'a is present and substantive (not a single line)
- [ ] Every `[PAUSE]` marker follows a genuinely weighty sentence, not filler
- [ ] `generated_by: "codex-tadabbur-v2"` set in frontmatter

---

## What NOT to Do

- Do not regenerate files from scratch — preserve existing prose
- Do not add generic closing sections that could apply to any passage
- Do not cite tafsir as a standalone paragraph ("Ibn Kathir said...") — weave it in
- Do not cluster all tafsir citations into one or two paragraphs if the rest of the file goes unsourced
- Do not let Part 2 stay in safe explanatory mode; it should press into the reader's inner bargaining, avoidance, fear, pride, or self-deception before offering resolution
- Do not mark `validated: true` — validators are run separately
- Do not stop mid-file and mark it done
