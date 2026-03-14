#!/usr/bin/env node
/**
 * publish-surah.mjs
 * Converts markdown surah content to HTML and publishes to Supabase.
 * Usage: node scripts/publish-surah.mjs
 */

import { createClient } from '@supabase/supabase-js';
import { marked } from 'marked';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// Load credentials from .env.local
const envPath = join(__dirname, '..', '.env.local');
const env = Object.fromEntries(
  readFileSync(envPath, 'utf8').split('\n')
    .filter(l => l && !l.startsWith('#') && l.includes('='))
    .map(l => { const i = l.indexOf('='); return [l.slice(0,i).trim(), l.slice(i+1).trim().replace(/^"|"$/g,'')] })
);

const SUPABASE_URL = env.NEXT_PUBLIC_SUPABASE_URL;
const SERVICE_ROLE_KEY = env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY, {
  auth: { autoRefreshToken: false, persistSession: false }
});

async function getAdminUserId() {
  const { data } = await supabase.from('profiles').select('id').eq('role', 'admin').single();
  return data?.id;
}

function calculateReadingTime(html) {
  const text = html.replace(/<[^>]+>/g, '');
  const words = text.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

function mdToHtml(markdown) {
  let md = markdown
    // Strip leading H1 title — the title is shown via post.title in the article header
    .replace(/^#\s+.+\n+/, '')
    .replace(/\[PAUSE[^\]]*\]/g, '\n\n<div class="pause-marker">— ∙ —</div>\n\n')
    .replace(/\[Continuing[^\]]*\]/g, '');
  marked.setOptions({ breaks: false, gfm: true });
  return marked.parse(md);
}

export async function publishSurah({
  surahNumber,
  title,
  slug,
  excerpt,
  seoTitle,
  seoDescription,
  markdownContent,
  tags = [],
}) {
  // Check if post already exists for this surah
  const { data: existing } = await supabase
    .from('posts')
    .select('id, title, status')
    .eq('surah_number', surahNumber)
    .single();

  if (existing) {
    console.log(`⚠️  Surah ${surahNumber} already has a post: "${existing.title}" (${existing.status})`);
    console.log('   Skipping to avoid duplicate. Delete the existing post first if you want to replace it.');
    return null;
  }

  const adminUserId = await getAdminUserId();
  const contentHtml = mdToHtml(markdownContent);
  const readingTime = calculateReadingTime(contentHtml);

  const { data: post, error } = await supabase
    .from('posts')
    .insert({
      title,
      slug,
      excerpt,
      content_html: contentHtml,
      content_json: {},
      status: 'published',
      surah_number: surahNumber,
      seo_title: seoTitle,
      seo_description: seoDescription,
      tags,
      reading_time_minutes: readingTime,
      featured: false,
      created_by: adminUserId,
      published_at: new Date().toISOString(),
      publish_date: new Date().toISOString(),
    })
    .select()
    .single();

  if (error) {
    console.error(`❌ Failed to insert surah ${surahNumber}:`, error);
    return null;
  }

  // Verify status and fix if a trigger reset it to draft
  if (post.status !== 'published') {
    console.warn(`⚠️  Status was reset to '${post.status}' after insert — forcing to 'published'...`);
    const { data: fixed, error: fixErr } = await supabase
      .from('posts')
      .update({ status: 'published', published_at: new Date().toISOString(), publish_date: new Date().toISOString() })
      .eq('id', post.id)
      .select()
      .single();
    if (fixErr) console.error('❌ Failed to fix status:', fixErr);
    else Object.assign(post, fixed);
  }

  console.log(`✅ Published: "${post.title}" (surah ${surahNumber}, ${readingTime} min read)`);
  console.log(`   URL: https://ayahguide.com/surah/${slug}`);
  return post;
}
