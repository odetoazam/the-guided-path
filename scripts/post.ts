#!/usr/bin/env tsx
/**
 * AyahGuide — Buffer Post Script
 *
 * Uploads carousel PNGs to Supabase Storage, schedules to Buffer (IG + FB),
 * and sends a notification email to azam@distru.com.
 *
 * Usage:
 *   npm run post -- <carousel-name>
 *   npm run post -- ibrahim-profile
 */

import * as fs from 'fs';
import * as path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../.env.local') });

const SUPABASE_URL      = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_KEY      = process.env.SUPABASE_SERVICE_ROLE_KEY!;
const BUFFER_TOKEN      = process.env.BUFFER_ACCESS_TOKEN!;
const BUFFER_CHANNEL_IG = process.env.BUFFER_CHANNEL_IG!;
const BUFFER_CHANNEL_FB = process.env.BUFFER_CHANNEL_FB!;
const RESEND_API_KEY    = process.env.RESEND_API_KEY!;
const BUCKET            = 'carousel-assets';

async function uploadPngs(name: string, pngPaths: string[]): Promise<string[]> {
  const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
  await supabase.storage.createBucket(BUCKET, { public: true }).catch(() => {});

  const ts = Date.now();
  const urls: string[] = [];
  for (const p of pngPaths) {
    const key = `${name}/${ts}-${path.basename(p)}`;
    const buf = fs.readFileSync(p);
    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(key, buf, { contentType: 'image/png', upsert: true });
    if (error) throw new Error(`Supabase upload failed: ${error.message}`);
    const { data } = supabase.storage.from(BUCKET).getPublicUrl(key);
    urls.push(data.publicUrl);
  }
  return urls;
}

async function bufferPost(
  channelId: string,
  text: string,
  imageUrls: string[],
  dueAt: string,
): Promise<void> {
  const query = `
    mutation CreatePost($input: CreatePostInput!) {
      createPost(input: $input) {
        __typename
        ... on UnexpectedError { message }
      }
    }
  `;
  const isInstagram = channelId === process.env.BUFFER_CHANNEL_IG;
  const variables = {
    input: {
      channelId,
      text,
      schedulingType: 'automatic',
      mode: 'customScheduled',
      dueAt,
      // Buffer schema (2026-06): assets is [AssetInput!]!, each image wrapped in { image: { url } }.
      assets: imageUrls.map(url => ({ image: { url } })),
      metadata: isInstagram
        ? { instagram: { type: 'post', shouldShareToFeed: true } }
        : { facebook: { type: 'post' } },
    },
  };

  const res = await fetch('https://api.buffer.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${BUFFER_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query, variables }),
  });

  const json = await res.json() as any;
  if (json.errors) throw new Error(`Buffer error: ${JSON.stringify(json.errors)}`);
  // Any *Error typename means it did NOT schedule (LimitReachedError = queue cap full).
  const result = json?.data?.createPost;
  if (!result || /Error$/.test(result.__typename || '')) {
    throw new Error(`Buffer rejected post: ${result?.__typename || 'no response'}${result?.message ? ' — ' + result.message : ''}`);
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
      subject: `📸 Carousel ready: ${name}`,
      html: `
        <h2 style="font-family:sans-serif;">${name} scheduled</h2>
        <p style="font-family:sans-serif;color:#666;">
          Posts to @ayahguideus (IG) and Ayahguide (FB) at:<br/>
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

function markPosted(name: string): void {
  const queuePath = path.join(__dirname, 'carousel/queue.json');
  const queue = JSON.parse(fs.readFileSync(queuePath, 'utf-8'));
  if (!queue.posted.includes(name)) queue.posted.push(name);
  queue.queue = queue.queue.filter((item: any) => item.name !== name);
  fs.writeFileSync(queuePath, JSON.stringify(queue, null, 2));
}

async function main(): Promise<void> {
  const name = process.argv[2];
  if (!name) {
    console.error('Usage: npm run post -- <carousel-name>');
    process.exit(1);
  }

  const exportDir = path.join(__dirname, '../exports/carousel', name);
  if (!fs.existsSync(exportDir)) {
    console.error(`No exports for "${name}". Run: npm run carousel -- ${name}`);
    process.exit(1);
  }

  const pngPaths = fs.readdirSync(exportDir)
    .filter(f => f.endsWith('.png'))
    .sort()
    .map(f => path.join(exportDir, f));

  if (pngPaths.length === 0) {
    console.error(`No PNG files found in ${exportDir}`);
    process.exit(1);
  }

  const contentPath = path.join(__dirname, 'carousel/content', name);
  const mod = await import(contentPath) as { buildCaption?: () => string };
  const caption = mod.buildCaption ? mod.buildCaption() : '';

  // Days offset: default 1 (tomorrow), pass as 2nd arg for custom spacing
  const daysOffset = parseInt(process.argv[3] || '1', 10);
  const scheduledAt = new Date();
  scheduledAt.setDate(scheduledAt.getDate() + daysOffset);
  scheduledAt.setHours(8, 0, 0, 0);
  // Convert 8am ET to UTC (ET = UTC-4 in summer)
  const dueAt = new Date(scheduledAt.getTime() + 4 * 60 * 60 * 1000).toISOString();

  console.log(`\n📸 Posting "${name}" (${pngPaths.length} slides)`);
  console.log(`🕘 Scheduled: ${scheduledAt.toLocaleString()}`);

  console.log('\n⬆️  Uploading to Supabase Storage...');
  const imageUrls = await uploadPngs(name, pngPaths);
  console.log(`   ✓ ${imageUrls.length} images uploaded`);

  console.log('\n📤 Scheduling to Buffer...');
  await bufferPost(BUFFER_CHANNEL_IG, caption, imageUrls, dueAt);
  console.log('   ✓ Instagram scheduled');
  await bufferPost(BUFFER_CHANNEL_FB, caption, imageUrls, dueAt);
  console.log('   ✓ Facebook scheduled');

  console.log('\n📧 Sending notification...');
  await sendEmail(name, caption, scheduledAt);
  console.log('   ✓ Email sent to azam@distru.com');

  markPosted(name);
  console.log(`\n✅ Done! Review at https://publish.buffer.com\n`);
}

main().catch(err => { console.error(err); process.exit(1); });
