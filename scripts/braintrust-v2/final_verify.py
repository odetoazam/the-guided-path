import json
verses=json.load(open('node_modules/quran-validator/data/quran-verses.json'))
rows=[(f"{v['surah']}:{v['ayah']}",v['textSimple']) for v in verses]
def find(p):
    pt=p.split(); out=[]
    for k,t in rows:
        tt=t.split()
        for i in range(len(tt)-len(pt)+1):
            if tt[i:i+len(pt)]==pt: out.append(k); break
    return out
checks={
 "PHRASE-1 فريضة من الله":("فريضة من الله",["4:11","9:60"]),
 "PHRASE-2 رب اني ظلمت نفسي":("رب اني ظلمت نفسي",["27:44","28:16"]),
 "PHRASE-2b ظلمت نفسي":("ظلمت نفسي",["27:44","28:16"]),
 "PHRASE-3 awzi'ni":("رب اوزعني ان اشكر نعمتك التي انعمت علي وعلى والدي",["27:19","46:15"]),
 "PHRASE-4 قاتلهم الله انى يوفكون":("قاتلهم الله انى يوفكون",["9:30","63:4"]),
 "PHRASE-5 خاوية على عروشها":("خاوية على عروشها",["2:259","18:42","22:45"]),
 "PHRASE-6 الا تعبدوا الا اياه":("الا تعبدوا الا اياه",["12:40","17:23"]),
 "PHRASE-7 ان شاء الله امنين":("ان شاء الله امنين",["12:99","48:27"]),
 "PHRASE-8 يا معشر الجن والانس":("يا معشر الجن والانس",["6:130","55:33"]),
 "PHRASE-8b يا معشر الجن (jinn-only exists)":("يا معشر الجن",None),
 "PHRASE-9 rabbana lawla":("ربنا لولا ارسلت الينا رسولا فنتبع اياتك",["20:134","28:47"]),
 "PHRASE-10 لا نكلف نفسا الا وسعها":("لا نكلف نفسا الا وسعها",["6:152","7:42"]),
 "PHRASE-10b 2:286 يكلف (3rd person)":("لا يكلف الله نفسا الا وسعها",["2:286"]),
 "PHRASE-11 heavens no pillars":("السماوات بغير عمد ترونها",["13:2","31:10"]),
}
allok=True
for name,(p,exp) in checks.items():
    got=find(p)
    if exp is None:
        print(f"{'OK ' if got else 'FAIL'} {name}: {got}")
        continue
    ok = sorted(got)==sorted(exp)
    allok &= ok
    print(f"{'OK ' if ok else 'FAIL'} {name}: got={got} expected={exp}")
print("\nALL COUNTS MATCH:" , allok)
