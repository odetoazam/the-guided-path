import json, sys
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
rows = [(f"{v['surah']}:{v['ayah']}", v['textSimple']) for v in verses]

def find(phrase):
    p = phrase.strip()
    hits = [(k,t) for k,t in rows if p in t.split(' ') or (' '+p+' ' in ' '+t+' ')]
    # word-boundary safe: check tokens contiguity
    real=[]
    ptoks=p.split()
    for k,t in rows:
        tt=t.split()
        for i in range(len(tt)-len(ptoks)+1):
            if tt[i:i+len(ptoks)]==ptoks:
                real.append((k,t)); break
    return real

phrases = [
 "قاتلهم الله انى يوفكون",
 "الا تعبدوا الا اياه",
 "يا معشر الجن والانس",
 "خاوية على عروشها",
 "فريضة من الله",
 "من كل زوج بهيج",
 "واقرضوا الله قرضا حسنا",
 "قل من رب السماوات",
]
for p in phrases:
    r = find(p)
    print(f"\n=== '{p}' -> {len(r)} verse(s) ===")
    for k,t in r:
        print(f"   {k}: {t[:110]}")
