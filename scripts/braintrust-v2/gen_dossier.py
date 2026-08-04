#!/usr/bin/env python3
"""Generate the FINAL braintrust-v2 dossier: panel verdict (recommended-3 + reserve),
A/B tally, full ranked board, and the 36-insight verified reserve pool."""
import json, html
esc = lambda s: html.escape(str(s) if s is not None else '')

delib = json.load(open('scripts/braintrust-v2/ledgers/deliberation.json'))
summ = json.load(open('scripts/braintrust-v2/ledgers/run-summary.json'))
pool = json.load(open('scripts/braintrust-v2/ledgers/verified-pool.json'))['insights']

# verified receipts for the recommended-3 (self-checked in-session against the corpus)
RECEIPTS = {
 'HASAN-6': 'Exact phrase قاٰتَلَهُمُ اللّٰه اَنّىٰ يُؤفَكون at exactly 9:30, 63:4 (both verse-final). قاتل = Form III (fight-against), not Form I "kill". The "how deluded" clause اَنّىٰ يُؤفَكون recurs curse-free at 5:75, 29:61, 43:87.',
 'ZAYNAB-1': 'Root د-ع-ع = 2 verb tokens only: 107:2 يَدُعُّ (active, 3rd-masc-SINGULAR) vs 52:13 يُدَعُّ (passive, 3rd-masc-PLURAL) — a voice flip AND a number shift; plus 1 verbal noun دَعًّا at 52:13. Distinct from the homograph دعو "to call" (212 tokens).',
 'KHALID-4': 'أوجَسَ منهم خيفة is verbatim in both tellings (11:70, 51:28), anchoring the same annunciation scene. صَكَّت (she struck her face) is a true hapax — root ص-ك-ك occurs only at 51:29. ضَحِكَت (she laughed) is at 11:71. "Sarah" is extra-Quranic — use "Ibrahim\'s wife".',
}
PERSONA_ORDER = ['amina','khalil','sara','yusuf']

def bars(p):
    out=''
    for k in PERSONA_ORDER:
        v=p.get(k,0)
        cells=''.join(f'<i class="{"on" if i<v else "off"}"></i>' for i in range(5))
        out+=f'<div class="prow"><span class="pn">{k}</span><span class="pbar">{cells}</span><span class="pv">{v}</span></div>'
    return out

def rec_card(r,n):
    pid=r['proposal_id']
    receipt=RECEIPTS.get(pid,'')
    return f'''<article class="rec">
  <div class="rec-num">{n}</div>
  <div class="rec-body">
    <div class="rec-top">
      <span class="rid">{esc(pid)}</span>
      <span class="skeptic">skeptic ✓ survives</span>
    </div>
    <h3 class="rec-ttl">{esc(r['title'])}</h3>
    <div class="rec-role">{esc(r.get('role',''))}</div>
    <div class="rec-mech"><span class="tag">mechanism</span>{esc(r.get('mechanism',''))}</div>
    <div class="receipt"><div class="receipt-label">verified receipt</div><p>{esc(receipt)}</p></div>
    <div class="personas">{bars(r.get('personas',{}))}</div>
    <div class="rec-gap"><span class="tag">fills</span>{esc(r.get('gap_filled',''))}</div>
    <details class="fix"><summary>corrections the writer must apply</summary><p>{esc(r.get('corrections_to_apply',''))}</p></details>
  </div>
</article>'''

recs=''.join(rec_card(r,i+1) for i,r in enumerate(delib['recommended']))

reserve=''
for r in delib['reserve']:
    reserve+=f'''<article class="res">
  <div class="res-top"><span class="rid">{esc(r.get('proposal_id',''))}</span></div>
  <h4>{esc(r['title'])}</h4>
  <p>{esc(r.get('why',''))}</p>
</article>'''

# ranked board
ranked=summ['ranked']
sk={s['id']:s['verdict'] for s in summ['skeptic']}
rows=''
for i,r in enumerate(ranked):
    v=sk.get(r['id'])
    mark='<span class="sv surv">survives</span>' if v=='SURVIVES' else ('<span class="sv ref">refuted</span>' if v=='REFUTED' else '')
    fatal=f'<span class="fatal">{r["fatals"]} fatal</span>' if r.get('fatals') else ''
    rows+=f'''<tr>
  <td class="rk">{i+1}</td><td class="rid-c">{esc(r['id'])}</td>
  <td class="rt">{esc(r['title'])}</td>
  <td class="adv">{esc(r['advisor'])}</td>
  <td class="sc">{r['avg']:.1f}</td>
  <td class="mk">{mark}{fatal}</td>
</tr>'''

ab=summ['ab_mining']; abd=summ['ab_downstream']

STYLE='''<style>
:root{--ground:#eeece4;--surface:#f7f5ef;--surface-2:#e7e4d9;--ink:#21242c;--muted:#65635b;--faint:#8a877d;
 --lapis:#345a8f;--gold:#a9782f;--line:#d5d1c4;--line-strong:#c3bead;--good:#3f7a4e;--amber:#a9782f;--rose:#9a4b47;
 --serif:"Iowan Old Style","Palatino Linotype",Palatino,Georgia,serif;
 --sans:system-ui,-apple-system,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
 --mono:ui-monospace,"SF Mono","Cascadia Code",Menlo,Consolas,monospace;}
@media(prefers-color-scheme:dark){:root{--ground:#14161c;--surface:#1c1f27;--surface-2:#232732;--ink:#e7e4d9;
 --muted:#9d9a8f;--faint:#7c7a71;--lapis:#7aa0d0;--gold:#cba24e;--line:#2b2f3a;--line-strong:#39404e;--good:#6bab79;--amber:#cba24e;--rose:#d98b86;}}
:root[data-theme="light"]{--ground:#eeece4;--surface:#f7f5ef;--surface-2:#e7e4d9;--ink:#21242c;--muted:#65635b;--faint:#8a877d;--lapis:#345a8f;--gold:#a9782f;--line:#d5d1c4;--line-strong:#c3bead;--good:#3f7a4e;--amber:#a9782f;--rose:#9a4b47;}
:root[data-theme="dark"]{--ground:#14161c;--surface:#1c1f27;--surface-2:#232732;--ink:#e7e4d9;--muted:#9d9a8f;--faint:#7c7a71;--lapis:#7aa0d0;--gold:#cba24e;--line:#2b2f3a;--line-strong:#39404e;--good:#6bab79;--amber:#cba24e;--rose:#d98b86;}
*{box-sizing:border-box}
body{margin:0;background:var(--ground);color:var(--ink);font-family:var(--sans);line-height:1.6;-webkit-font-smoothing:antialiased}
.wrap{max-width:1080px;margin:0 auto;padding:0 24px 96px}
a{color:var(--lapis);text-decoration:none}
header.top{border-bottom:1px solid var(--line-strong);padding:56px 0 32px}
.kicker{font-family:var(--mono);font-size:12px;letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin:0 0 18px}
h1.title{font-family:var(--serif);font-weight:600;font-size:clamp(30px,4.4vw,46px);line-height:1.08;margin:0 0 14px;text-wrap:balance;max-width:22ch}
.dek{font-size:17px;color:var(--muted);max-width:62ch;margin:0}.dek b{color:var(--ink);font-weight:600}
.summary{display:grid;grid-template-columns:repeat(5,1fr);gap:1px;background:var(--line);border:1px solid var(--line);border-radius:4px;overflow:hidden;margin:30px 0 0}
.stat{background:var(--surface);padding:16px 15px}
.stat .n{font-family:var(--serif);font-size:28px;font-weight:600;font-variant-numeric:tabular-nums;line-height:1}
.stat .l{font-family:var(--mono);font-size:10px;letter-spacing:.09em;text-transform:uppercase;color:var(--faint);margin-top:8px}
.stat.g .n{color:var(--good)}
@media(max-width:720px){.summary{grid-template-columns:repeat(2,1fr)}}
.sec{margin-top:56px}
.sec-eyebrow{font-family:var(--mono);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--lapis);margin:0 0 5px}
.sec h2{font-family:var(--serif);font-weight:600;font-size:clamp(23px,2.6vw,30px);margin:0 0 6px}
.sec .lead{font-size:15px;color:var(--muted);max-width:70ch;margin:0 0 24px}
/* recommended */
.rec{display:grid;grid-template-columns:56px 1fr;gap:20px;background:var(--surface);border:1px solid var(--line);
 border-left:3px solid var(--gold);border-radius:5px;padding:24px;margin-bottom:18px}
.rec-num{font-family:var(--serif);font-size:38px;font-weight:600;color:var(--gold);line-height:1;opacity:.85}
.rec-top{display:flex;justify-content:space-between;align-items:center;gap:10px;margin-bottom:10px}
.rid{font-family:var(--mono);font-size:11.5px;color:var(--faint)}
.skeptic{font-family:var(--mono);font-size:10px;letter-spacing:.06em;text-transform:uppercase;color:var(--good);
 border:1px solid color-mix(in srgb,var(--good) 40%,transparent);background:color-mix(in srgb,var(--good) 9%,transparent);padding:3px 9px;border-radius:20px}
.rec-ttl{font-family:var(--serif);font-weight:600;font-size:23px;line-height:1.2;margin:0 0 8px;text-wrap:balance}
.rec-role{font-size:13px;color:var(--lapis);font-family:var(--mono);letter-spacing:.02em;margin-bottom:14px}
.rec-mech,.rec-gap{font-size:14px;color:var(--muted);margin-bottom:12px;line-height:1.55}
.tag{font-family:var(--mono);font-size:9.5px;letter-spacing:.12em;text-transform:uppercase;color:var(--faint);margin-right:8px;white-space:nowrap}
.receipt{background:var(--ground);border:1px solid var(--line);border-radius:4px;padding:12px 14px;margin-bottom:14px}
.receipt-label{font-family:var(--mono);font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--gold);margin-bottom:7px}
.receipt p{margin:0;font-family:var(--mono);font-size:12px;color:var(--ink);line-height:1.65;word-break:break-word}
.personas{display:grid;grid-template-columns:repeat(2,1fr);gap:6px 22px;margin-bottom:14px;max-width:440px}
.prow{display:flex;align-items:center;gap:9px}
.pn{font-size:11.5px;color:var(--muted);width:44px;text-transform:capitalize}
.pbar{display:inline-flex;gap:3px}
.pbar i{width:11px;height:6px;border-radius:1px}
.pbar i.on{background:var(--lapis)}.pbar i.off{background:var(--line-strong)}
.pv{font-family:var(--mono);font-size:11px;color:var(--faint)}
.fix{margin-top:4px;border-top:1px solid var(--line);padding-top:12px}
.fix summary{font-family:var(--mono);font-size:11px;letter-spacing:.05em;text-transform:uppercase;color:var(--amber);cursor:pointer}
.fix p{margin:10px 0 0;font-size:12.5px;color:var(--muted);line-height:1.6}
/* reserve */
.resgrid{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}
@media(max-width:760px){.resgrid{grid-template-columns:1fr}.rec{grid-template-columns:1fr;gap:12px}.rec-num{font-size:30px}}
.res{background:var(--surface);border:1px solid var(--line);border-radius:5px;padding:18px}
.res-top{margin-bottom:8px}.res h4{font-family:var(--serif);font-weight:600;font-size:17px;line-height:1.25;margin:0 0 8px;text-wrap:balance}
.res p{margin:0;font-size:13px;color:var(--muted);line-height:1.55}
/* AB */
.ab{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-bottom:8px}
@media(max-width:640px){.ab{grid-template-columns:1fr}}
.abcard{background:var(--surface);border:1px solid var(--line);border-radius:5px;padding:20px}
.abcard h3{font-family:var(--mono);font-size:12px;letter-spacing:.08em;text-transform:uppercase;margin:0 0 4px;color:var(--ink)}
.abcard .tier{font-size:12px;color:var(--faint);margin-bottom:16px}
.abmetric{display:flex;justify-content:space-between;align-items:baseline;padding:9px 0;border-top:1px solid var(--line)}
.abmetric .k{font-size:13px;color:var(--muted)}
.abmetric .v{font-family:var(--serif);font-size:20px;font-weight:600;font-variant-numeric:tabular-nums}
.abnote{font-size:13.5px;color:var(--muted);margin:16px 0 0;line-height:1.6;max-width:72ch}
/* board */
.board{overflow-x:auto;border:1px solid var(--line);border-radius:5px}
table{width:100%;border-collapse:collapse;font-size:13px;min-width:640px}
thead th{font-family:var(--mono);font-size:10px;letter-spacing:.08em;text-transform:uppercase;color:var(--faint);
 text-align:left;padding:11px 12px;background:var(--surface-2);border-bottom:1px solid var(--line);white-space:nowrap}
tbody td{padding:10px 12px;border-bottom:1px solid var(--line);background:var(--surface)}
tbody tr:last-child td{border-bottom:0}
.rk{font-family:var(--mono);color:var(--faint);width:34px}
.rid-c{font-family:var(--mono);font-size:11.5px;color:var(--gold);white-space:nowrap}
.rt{font-family:var(--serif);font-size:14px;line-height:1.3}
.adv{font-family:var(--mono);font-size:10.5px;color:var(--faint);text-transform:uppercase}
.sc{font-family:var(--serif);font-size:16px;font-weight:600;font-variant-numeric:tabular-nums;text-align:right}
.mk{white-space:nowrap}
.sv{font-family:var(--mono);font-size:9.5px;letter-spacing:.05em;text-transform:uppercase;padding:2px 7px;border-radius:12px}
.sv.surv{color:var(--good);background:color-mix(in srgb,var(--good) 10%,transparent)}
.fatal{font-family:var(--mono);font-size:9.5px;color:var(--rose);margin-left:6px}
.callout{margin-top:18px;border:1px solid var(--line-strong);border-left:3px solid var(--lapis);background:var(--surface);
 border-radius:3px;padding:15px 18px;font-size:14px;color:var(--muted);line-height:1.6}
.callout b{color:var(--ink);font-weight:600}
footer{margin-top:64px;border-top:1px solid var(--line-strong);padding-top:22px;font-size:12.5px;color:var(--faint);font-family:var(--mono);line-height:1.75}
footer b{color:var(--muted);font-weight:400}
</style>'''

BODY=f'''{STYLE}
<div class="wrap">
<header class="top">
  <p class="kicker">AyahGuide · Article Braintrust v2 · final dossier</p>
  <h1 class="title">The panel picked three. Here is the reasoning.</h1>
  <p class="dek">Six lenses mined the full Quranic morphology corpus; every count was mechanically verified,
  four advisors drafted and cross-critiqued <b>24 proposals</b>, and an adversarial skeptic with veto power
  tried to break the top ten. All ten survived. Below: the recommended three, the reserve, and the full board.</p>
  <div class="summary">
    <div class="stat"><div class="n">24</div><div class="l">proposals</div></div>
    <div class="stat g"><div class="n">10/10</div><div class="l">survived skeptic</div></div>
    <div class="stat g"><div class="n">3</div><div class="l">recommended</div></div>
    <div class="stat"><div class="n">4</div><div class="l">reserve</div></div>
    <div class="stat g"><div class="n">32/32</div><div class="l">counts verified</div></div>
  </div>
</header>

<section class="sec">
  <p class="sec-eyebrow">the verdict</p>
  <h2>Recommended 3 — a portfolio, not a top-3</h2>
  <p class="lead">One acquisition doorway, two high-shareability pieces on three distinct mechanisms.
  Persona scores are the panel's (1–5, for Amina · Khalil · Sara · Yusuf). Each carries the skeptic's
  required corrections — fold them in before drafting.</p>
  {recs}
</section>

<section class="sec">
  <p class="sec-eyebrow">held in reserve</p>
  <h2>Four more, ranked by promotability</h2>
  <div class="resgrid">{reserve}</div>
</section>

<section class="sec">
  <p class="sec-eyebrow">the experiment</p>
  <h2>High vs xhigh mining — the A/B result</h2>
  <div class="ab">
    <div class="abcard">
      <h3>High-effort miners</h3><div class="tier">VOICE lens</div>
      <div class="abmetric"><span class="k">insights mined</span><span class="v">{ab['high']['mined']}</span></div>
      <div class="abmetric"><span class="k">survived verification</span><span class="v">{ab['high']['confirmed']}/{ab['high']['mined']}</span></div>
      <div class="abmetric"><span class="k">reached top 10</span><span class="v">{abd['high']['inTop10']}</span></div>
      <div class="abmetric"><span class="k">survived skeptic</span><span class="v">{abd['high']['survived']}</span></div>
    </div>
    <div class="abcard">
      <h3>Xhigh-effort miners</h3><div class="tier">PHRASE + SCENE lenses</div>
      <div class="abmetric"><span class="k">insights mined</span><span class="v">{ab['xhigh']['mined']}</span></div>
      <div class="abmetric"><span class="k">survived verification</span><span class="v">{ab['xhigh']['confirmed']}/{ab['xhigh']['mined']}</span></div>
      <div class="abmetric"><span class="k">reached top 10</span><span class="v">{abd['xhigh']['inTop10']}</span></div>
      <div class="abmetric"><span class="k">survived skeptic</span><span class="v">{abd['xhigh']['survived']}</span></div>
    </div>
  </div>
  <p class="abnote"><b>Read:</b> both tiers verified at 100% — mining effort didn't change factual survival.
  But xhigh insights supplied 7 of the top-10 proposals to high's 4 (and all recommended-3 draw on
  xhigh exhibits), suggesting the extra effort buys <i>article-worthiness</i>, not accuracy. Caveat: only
  one high lens (VOICE) ran in this batch vs two xhigh, so the top-10 split partly reflects volume.</p>
</section>

<section class="sec">
  <p class="sec-eyebrow">full board</p>
  <h2>All 24 proposals, ranked</h2>
  <div class="board">
    <table>
      <thead><tr><th></th><th>id</th><th>title</th><th>advisor</th><th>score</th><th>skeptic</th></tr></thead>
      <tbody>{rows}</tbody>
    </table>
  </div>
  <div class="callout"><b>Scope note.</b> This panel ranked the 32 insights from the three lenses that ran
  in this batch (VOICE / PHRASE / SCENE). The <b>36 insights from the first three lenses</b>
  (GRAPH / BRACKET / RAREADJ) were separately mined and verified — 35 confirmed, 1 corrected, 0 refuted —
  but a workflow sandbox limitation kept them from reaching the advisors, so they remain a verified,
  un-ranked reserve pool. All 68 are shippable article seeds; the 36 can be run through a panel later at low cost.</div>
</section>

<footer>
  <b>run:</b> wf_f6f1b94f-a59 (resume) · 31 agents, 0 errors, 2.07M tokens · Opus 4.8<br>
  <b>method:</b> corpus counts re-derived from quranic-corpus.json + quran-verses.json; recommended-3 receipts re-verified in-session.<br>
  <b>ledgers:</b> scripts/braintrust-v2/ledgers/ (deliberation.json · propose-*.json · critique-*.json · skeptic-*.json · verified-pool.json)<br>
  <b>guards:</b> Quran-only payoffs · exact morphological scope · first/last = mushaf order · overlap-checked vs 185 published articles.
</footer>
</div>'''

open('scripts/braintrust-v2/dossier.html','w').write(BODY)
print('wrote dossier.html', len(BODY),'bytes')
