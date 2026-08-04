#!/usr/bin/env python3
from pathlib import Path
import re

TADABBUR_DIR = Path('content/tadabbur')
TAFSIR_DIR = Path('scripts/tadabbur-output')

all_files = sorted(f for f in TADABBUR_DIR.rglob('*.md')
                   if not f.name.startswith('tafsir-report-')
                   and not f.name.startswith('tafsir_report_'))

matched = []
missing = []
mismatched_likely = []

for f in all_files:
    stem = f.stem
    tafsir = TAFSIR_DIR / f'tafsir-{stem}.md'
    if not tafsir.exists():
        missing.append(f)
        continue

    content = f.read_text()
    tafsir_content = tafsir.read_text()

    surah_m = re.search(r'^surah:\s*["\']?(\d+)', content, re.MULTILINE)
    ayah_m  = re.search(r'^ayah_start:\s*["\']?(\d+)', content, re.MULTILINE)

    if not surah_m or not ayah_m:
        missing.append(f)
        continue

    surah = surah_m.group(1)
    ayah  = ayah_m.group(1)

    if f'{surah}:{ayah}' in tafsir_content or f'Surah {surah}' in tafsir_content:
        matched.append(f)
    else:
        mismatched_likely.append(f)

print(f'Total files:          {len(all_files)}')
print(f'Correctly matched:    {len(matched)}')
print(f'No tafsir report:     {len(missing)}')
print(f'Likely mismatched:    {len(mismatched_likely)}')
print(f'')
print(f'Ready to enrich:      {len(matched)} files')
