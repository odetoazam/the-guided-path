#!/usr/bin/env tsx
/**
 * AyahGuide — IG Queue Top-Up
 *
 * Keeps the Instagram Buffer queue pinned at its cap (~10) by scheduling
 * already-built pieces from reel-queue.json `ready_to_queue` as slots free.
 *
 * - Publishing is done by Buffer's cloud; this only needs to run when a slot
 *   opens (a post published). Safe to run daily — it no-ops when the queue is full.
 * - Each ready piece is ALREADY rendered + Arabic-validated; this just uploads
 *   + schedules it (post-reel.ts for reels, post.ts for carousels).
 * - When ready_to_queue is empty but slots are free, it emails Azam: time to
 *   build fresh content (that step needs a Claude session — rendering is local).
 *
 * Run: npm run topup     (wired to launchd: com.ayahguide.topup, daily)
 */

import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const BUFFER_TOKEN = process.env.BUFFER_ACCESS_TOKEN!;
const ORG          = process.env.BUFFER_ORG_ID!;
const IG           = process.env.BUFFER_CHANNEL_IG!;
const RESEND       = process.env.RESEND_API_KEY!;
const CAP          = 10;                 // Buffer IG scheduled-post ceiling (plan limit)
// Alert threshold — the "Golden Rule" minimum. We FILL up to CAP whenever reserve
// content exists, but we only NAG when the runway drops below this. Alerting on
// every slot short of a full 10 meant a daily "5 free slots" email while the queue
// was actually healthy, which trains you to ignore the alert that matters.
const FLOOR        = 5;
const EMAIL_COOLDOWN_H = 72;             // don't re-nag more than once every 3 days
const SPACING_DAYS = 2;                  // every other day
const QUEUE_FILE   = path.join(__dirname, 'reel-queue.json');
const REPO         = path.join(__dirname, '..');
const DAY          = 86_400_000;

const log = (m: string) => console.log(`[topup ${new Date().toISOString()}] ${m}`);

async function bufferQuery(query: string): Promise<any> {
  const res = await fetch('https://api.buffer.com/graphql', {
    method: 'POST',
    headers: { Authorization: `Bearer ${BUFFER_TOKEN}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ query }),
  });
  return res.json();
}

/**
 * Buffer-side health gate. The queue can be "full" (10/10) while the IG channel
 * is disconnected — Buffer keeps accepting scheduled posts but fails at publish
 * time with "Invalid Credentials". A count-only check never sees this, so the
 * pipeline silently dies for days. This catches it within 24h (daily run).
 *
 * Reconnecting an IG channel is an Instagram OAuth login — it CANNOT be automated.
 * So the only correct action is: alert Azam loudly to click Reconnect in Buffer.
 */
async function channelHealth(): Promise<{ disconnected: boolean; errorPosts: { dueAt: string; msg: string }[] }> {
  const ch = await bufferQuery(
    `query { channels(input: {organizationId: "${ORG}"}) { id service name isDisconnected } }`
  );
  const igChannel = (ch?.data?.channels ?? []).find((c: any) => c.id === IG)
    ?? (ch?.data?.channels ?? []).find((c: any) => c.service === 'instagram');
  const disconnected = !!igChannel?.isDisconnected;

  const ep = await bufferQuery(
    `query { posts(input: {organizationId: "${ORG}", sort: {field: dueAt, direction: desc}}, first: 40) { edges { node { status dueAt channelId error { message } } } } }`
  );
  const now = Date.now();
  const errorPosts = ((ep?.data?.posts?.edges ?? []).map((e: any) => e.node) as any[])
    .filter((n) => n.channelId === IG && n.status === 'error' && Date.parse(n.dueAt) > now - 48 * 3_600_000)
    .map((n) => ({ dueAt: n.dueAt, msg: n.error?.message ?? 'unknown error' }));

  return { disconnected, errorPosts };
}

async function emailChannelDown(reason: string): Promise<void> {
  if (!RESEND) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AyahGuide Bot <noreply@ayahguide.com>',
      to: 'azam@distru.com',
      subject: '🚨 IG publishing is DOWN — reconnect Buffer',
      html: `<p style="font-family:sans-serif;font-size:16px"><b>Instagram is not publishing.</b> ${reason}</p>
             <p style="font-family:sans-serif">The queue may look full, but every scheduled post will fail until you reconnect.</p>
             <p style="font-family:sans-serif"><b>Fix (2 min, only you can do this):</b><br/>
             Buffer → Settings → Channels → <b>ayahguideus</b> (Instagram) → click <b>Reconnect / Refresh</b> → log into Instagram.</p>
             <p style="font-family:sans-serif;color:#888">Buffer's IG OAuth token expires every ~60–90 days. This alert fires within 24h of a drop so it never silently eats a week again.</p>`,
    }),
  }).catch(() => {});
}

async function igState(): Promise<{ count: number; maxDue: number }> {
  const j = await bufferQuery(
    `query { posts(input: {organizationId: "${ORG}", sort: {field: dueAt, direction: desc}}, first: 40) { edges { node { status dueAt channelId } } } }`
  );
  if (j.errors) throw new Error(`Buffer query error: ${JSON.stringify(j.errors)}`);
  const nodes = (j?.data?.posts?.edges ?? []).map((e: any) => e.node)
    .filter((n: any) => n.channelId === IG && n.status === 'scheduled');
  let maxDue = 0;
  for (const n of nodes) { const t = Date.parse(n.dueAt); if (t > maxDue) maxDue = t; }
  return { count: nodes.length, maxDue };
}

async function emailNeedContent(freeSlots: number): Promise<void> {
  if (!RESEND) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'AyahGuide Bot <noreply@ayahguide.com>',
      to: 'azam@distru.com',
      subject: '📭 IG runway is running low',
      html: `<p style="font-family:sans-serif">Only <b>${CAP - freeSlots} post(s) scheduled</b> (floor is ${FLOOR}) and <b>ready_to_queue is empty</b> — nothing built in reserve to fill the gap.</p>
             <p style="font-family:sans-serif">Time to build fresh reels — open a Claude session and say:<br/>
             <b>"keep building the IG reels runway"</b></p>
             <p style="font-family:sans-serif;color:#888">You'll get this at most once every ${EMAIL_COOLDOWN_H}h while the runway is short. A queue at or above ${FLOOR} no longer triggers an alert.</p>`,
    }),
  }).catch(() => {});
}

async function main(): Promise<void> {
  // Health gate FIRST — a full queue behind a dead channel is the silent-failure
  // mode that kept breaking this pipeline. Detect it before anything else.
  const health = await channelHealth();
  if (health.disconnected || health.errorPosts.length > 0) {
    const reason = health.disconnected
      ? 'The ayahguideus Instagram channel is DISCONNECTED in Buffer.'
      : `${health.errorPosts.length} scheduled post(s) failed: "${health.errorPosts[0].msg}"`;
    log(`🚨 CHANNEL DOWN — ${reason}`);
    await emailChannelDown(reason);
    process.exit(2);   // loud non-zero exit so launchd logs flag it too
  }

  const { count, maxDue } = await igState();
  log(`IG scheduled: ${count}/${CAP}`);
  if (count >= CAP) { log('queue full — nothing to do'); return; }

  const q = JSON.parse(fs.readFileSync(QUEUE_FILE, 'utf-8'));
  const ready: any[] = Array.isArray(q.ready_to_queue) ? q.ready_to_queue : [];
  const freeSlots = CAP - count;

  if (ready.length === 0) {
    // Healthy runway (at/above the Golden-Rule floor) — free slots alone are not news.
    if (count >= FLOOR) {
      log(`${freeSlots} slot(s) free but queue is healthy (${count}/${CAP}, floor ${FLOOR}) — no alert`);
      return;
    }
    // Below floor: alert, but at most once per cooldown window.
    const last = q._last_need_content_email ? Date.parse(q._last_need_content_email) : 0;
    const sinceH = (Date.now() - last) / 3_600_000;
    if (last && sinceH < EMAIL_COOLDOWN_H) {
      log(`below floor (${count}/${FLOOR}) but emailed ${sinceH.toFixed(1)}h ago — suppressing (cooldown ${EMAIL_COOLDOWN_H}h)`);
      return;
    }
    log(`only ${count} scheduled (floor ${FLOOR}) and ready_to_queue empty — emailing Azam to build more`);
    await emailNeedContent(freeSlots);
    q._last_need_content_email = new Date().toISOString();
    fs.writeFileSync(QUEUE_FILE, JSON.stringify(q, null, 2));
    return;
  }

  const now = Date.now();
  let target = Math.max(maxDue, now);   // schedule after the current latest post
  let cur = count;

  while (cur < CAP && ready.length > 0) {
    target += SPACING_DAYS * DAY;
    const offset = Math.max(1, Math.ceil((target - now) / DAY));
    const item = ready[0];
    const name = typeof item === 'string' ? item : item.name;
    const type = typeof item === 'string' ? 'reel' : (item.type ?? 'reel');
    const cmd = type === 'carousel'
      ? `npm run post -- ${name} ${offset}`
      : `npm run post-reel -- ${name} ${offset}`;
    log(`scheduling ${name} (${type}) at +${offset}d`);
    try {
      execSync(cmd, { cwd: REPO, stdio: 'pipe' });
      ready.shift();
      q.ready_to_queue = ready;
      fs.writeFileSync(QUEUE_FILE, JSON.stringify(q, null, 2));
      cur++;
      log(`  ✓ scheduled ${name} — ${ready.length} left in ready_to_queue`);
    } catch (e: any) {
      // post.ts/post-reel.ts throw on LimitReachedError or any rejection.
      log(`  ✗ ${name} failed (stopping): ${(e.message || '').slice(0, 160)}`);
      break;
    }
  }
  log(`done — IG now ~${cur}/${CAP}, ${ready.length} ready in reserve`);
}

main().catch(e => { console.error(e); process.exit(1); });
