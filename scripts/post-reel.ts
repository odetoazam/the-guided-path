#!/usr/bin/env tsx
/**
 * AyahGuide — Post Reel Script
 *
 * Uploads a HyperFrames-rendered MP4 + cover image to Supabase Storage,
 * schedules it to Buffer as an Instagram Reel with a proper thumbnail,
 * and sends a notification email.
 *
 * Usage:
 *   npm run post-reel -- <reel-name> [days-offset]
 *   npm run post-reel -- word-for-human
 *   npm run post-reel -- word-for-human 3   # schedule 3 days out
 *
 * Expected directory structure:
 *   exports/video/<reel-name>/
 *     renders/<reel-name>_*.mp4   (latest render used)
 *     cover.jpg                   (extracted cover frame)
 *     caption.md                  (optional — first paragraph used as caption)
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY      = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUFFER_TOKEN      = process.env.BUFFER_ACCESS_TOKEN!;
const BUFFER_CHANNEL_IG = process.env.BUFFER_CHANNEL_IG!;
const RESEND_API_KEY    = process.env.RESEND_API_KEY!;
const BUCKET            = 'reel-assets';

async function uploadFile(
  supabase: SupabaseClient<any, any, any>,
  localPath: string,
  key: string,
  contentType: string,
): Promise<string> {
  const buf = fs.readFileSync(localPath);
  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(key, buf, { contentType, upsert: true });
  if (error) throw new Error(`Supabase upload failed for ${key}: ${error.message}`);
  const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
  return data.publicUrl;
}

async function bufferPostReel(
  videoUrl: string,
  thumbnailUrl: string,
  caption: string,
  dueAt: string,
  shareNow: boolean = false,
): Promise<void> {
  const query = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on UnexpectedError { message }
        ... on InvalidInputError { message }
        ... on LimitReachedError { message }
      }
    }
  `;

  const baseInput: any = {
    channelId: BUFFER_CHANNEL_IG,
    text: caption,
    schedulingType: 'automatic',
    mode: shareNow ? 'shareNow' : 'customScheduled',
    // Buffer schema (2026-07): assets is [AssetInput!]!, each a typed wrapper.
    // Video reels use { video: { url, metadata: { thumbnailOffset } } }.
    // NOTE: video.thumbnailUrl was REMOVED by Buffer — social networks don't accept
    // custom thumbnail images, so it now hard-rejects with InvalidInputError. Pick the
    // cover frame via thumbnailOffset (ms into the video) instead. 2400ms matches the
    // ffmpeg `-ss 2.4` cover-frame convention used elsewhere in this pipeline.
    assets: [
      {
        video: {
          url: videoUrl,
          metadata: { thumbnailOffset: 2400 },
        },
      },
    ],
    metadata: {
      instagram: {
        type: 'reel',
        shouldShareToFeed: true,
      },
    },
  };

  if (!shareNow) {
    baseInput.dueAt = dueAt;
  }

  const variables = { input: baseInput };

  const res = await fetch('https://api.buffer.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUFFER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json() as any;
  if (json.errors) throw new Error(`Buffer GraphQL error: ${JSON.stringify(json.errors)}`);

  // Any *Error typename means the post did NOT schedule. LimitReachedError =
  // the channel's queue cap (Buffer plan limit, ~10) is full.
  const result = json?.data?.createPost;
  if (!result || /Error$/.test(result.__typename || '')) {
    throw new Error(`Buffer rejected reel: ${result?.__typename || 'no response'}${result?.message ? ' — ' + result.message : ''}`);
  }
}

async function sendEmail(name: string, caption: string, scheduledAt: Date): Promise<void> {
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: 'AyahGuide Bot <noreply@ayahguide.com>',
      to: 'azam@distru.com',
      subject: `🎬 Reel scheduled: ${name}`,
      html: `
        <h2 style="font-family:sans-serif;">${name} reel scheduled</h2>
        <p style="font-family:sans-serif;color:#666;">
          Posts to @ayahguideus (Instagram Reel) at:<br/>
          <strong>${scheduledAt.toLocaleString('en-US', { timeZone: 'America/New_York', dateStyle: 'full', timeStyle: 'short' })}</strong>
        </p>
        <p style="font-family:sans-serif;">
          <a href="https://publish.buffer.com" style="color:#c9a84c;">Review in Buffer →</a>
        </p>
        <hr/>
        <pre style="font-family:sans-serif;font-size:14px;color:#333;white-space:pre-wrap;">${caption}</pre>
      `,
    }),
  });
  if (!res.ok) console.error('Email send failed:', await res.text());
}

async function main(): Promise<void> {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: npm run post-reel -- <reel-name> [days-offset]');
    process.exit(1);
  }

  const reelDir = path.join(__dirname, '../exports/video', name);
  if (!fs.existsSync(reelDir)) {
    console.error(`No reel directory found at exports/video/${name}`);
    process.exit(1);
  }

  // Find the latest render — prefer _ig.mp4 (IG-re-encoded) over _raw.mp4
  const rendersDir = path.join(reelDir, 'renders');
  const allMp4s = fs.readdirSync(rendersDir).filter(f => f.endsWith('.mp4'));
  const igFiles = allMp4s.filter(f => f.includes('_ig') || f.includes('-ig'));
  // Pick the NEWEST render by mtime, not by filename sort — otherwise a stale
  // `name_ig.mp4` (old underscore convention) can outrank a newer `name-ig.mp4`.
  const mp4Files = (igFiles.length > 0 ? igFiles : allMp4s)
    .sort((a, b) =>
      fs.statSync(path.join(rendersDir, b)).mtimeMs -
      fs.statSync(path.join(rendersDir, a)).mtimeMs);

  if (mp4Files.length === 0) {
    console.error(`No MP4 renders found in exports/video/${name}/renders/`);
    process.exit(1);
  }
  const mp4Path = path.join(rendersDir, mp4Files[0]);

  // Cover image
  const coverPath = path.join(reelDir, 'cover.jpg');
  if (!fs.existsSync(coverPath)) {
    console.error(`No cover.jpg found in exports/video/${name}/`);
    console.error('Generate one with:');
    console.error(`  ffmpeg -ss 2.4 -i ${mp4Path} -frames:v 1 -q:v 1 ${coverPath} -y`);
    process.exit(1);
  }

  // Caption — read caption.md if present, else use generic
  const captionPath = path.join(reelDir, 'caption.md');
  let caption = '';
  if (fs.existsSync(captionPath)) {
    caption = fs.readFileSync(captionPath, 'utf-8').trim();
  } else {
    caption = `The Arabic word for "human" (إنسان) shares its root with "to forget" (نَسِيَ).\n\nTwo letters were already there. The third was always implied.\n\n#quran #arabic #islam #tadabbur`;
  }

  // Schedule timing: pass "now" as second arg to publish immediately,
  // or a numeric days-offset for a scheduled post (default 1 day out at 8am ET)
  const offsetArg = process.argv[3] || '1';
  const shareNow = offsetArg === 'now';

  const daysOffset = shareNow ? 0 : parseInt(offsetArg, 10);
  const scheduledAt = new Date();
  if (!shareNow) {
    scheduledAt.setDate(scheduledAt.getDate() + daysOffset);
    scheduledAt.setHours(8, 0, 0, 0);
  }
  // 8am ET → UTC (ET = UTC-4 summer, UTC-5 winter; using -4 for now)
  const dueAt = new Date(scheduledAt.getTime() + 4 * 60 * 60 * 1000).toISOString();

  console.log(`\n🎬 Posting reel "${name}"`);
  console.log(`   MP4: ${path.basename(mp4Path)} (${(fs.statSync(mp4Path).size / 1024 / 1024).toFixed(1)}MB)`);
  console.log(`   Cover: cover.jpg`);
  console.log(shareNow ? `⚡ Mode: shareNow (publishing immediately)` : `🕘 Scheduled: ${scheduledAt.toLocaleString()}`);

  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  console.log('\n⬆️  Uploading to Supabase Storage...');
  const ts = Date.now();
  const videoUrl = await uploadFile(supabase, mp4Path, `${name}/${ts}.mp4`, 'video/mp4');
  console.log('   ✓ MP4 uploaded');
  const coverUrl = await uploadFile(supabase, coverPath, `${name}/${ts}-cover.jpg`, 'image/jpeg');
  console.log('   ✓ Cover uploaded');

  console.log(shareNow ? '\n⚡ Publishing to Buffer as Reel (shareNow)...' : '\n📤 Scheduling to Buffer as Reel...');
  await bufferPostReel(videoUrl, coverUrl, caption, dueAt, shareNow);
  console.log(shareNow ? '   ✓ Instagram Reel queued for immediate publish with cover thumbnail' : '   ✓ Instagram Reel scheduled with cover thumbnail');

  console.log('\n📧 Sending notification...');
  await sendEmail(name, caption, scheduledAt);
  console.log('   ✓ Email sent to azam@distru.com');

  console.log(`\n✅ Done! Review at https://publish.buffer.com\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
