import json
verses=json.load(open('node_modules/quran-validator/data/quran-verses.json'))
rows=[(f"{v['surah']}:{v['ayah']}",v['textSimple']) for v in verses]
def find(p):
    pt=p.split(); out=[]
    for k,t in rows:
        tt=t.split()
        for i in range(len(tt)-len(pt)+1):
            if tt[i:i+len(pt)]==pt: out.append((k,t)); break
    return out
for p in ["رب اني ظلمت نفسي","رب اوزعني ان اشكر نعمتك التي انعمت علي وعلى والدي",
          "ربنا لولا ارسلت الينا رسولا فنتبع اياتك","ظلمت نفسي","رب اوزعني ان اشكر نعمتك"]:
    r=find(p)
    print(f"\n=== '{p}' -> {len(r)} ===")
    for k,t in r: print(f"   {k}: {t}")
