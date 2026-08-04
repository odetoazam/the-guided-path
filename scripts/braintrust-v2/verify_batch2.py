import json
verses = json.load(open('node_modules/quran-validator/data/quran-verses.json'))
rows=[(f"{v['surah']}:{v['ayah']}",v['textSimple']) for v in verses]
def find(p):
    pt=p.split(); out=[]
    for k,t in rows:
        tt=t.split()
        for i in range(len(tt)-len(pt)+1):
            if tt[i:i+len(pt)]==pt: out.append((k,t)); break
    return out
for p in ["ان شاء الله امنين","السماوات بغير عمد ترونها","لا نكلف نفسا الا وسعها",
          "وما الحياة الدنيا الا متاع الغرور","على الله توكلنا ربنا",
          "قالوا امنا واذا خلوا","اذا حضر احدكم الموت","انما الحياة الدنيا لعب ولهو"]:
    r=find(p)
    print(f"\n=== '{p}' -> {len(r)} ===")
    for k,t in r: print(f"   {k}: {t[:105]}")
