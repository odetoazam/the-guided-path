#!/usr/bin/env npx tsx
/**
 * content-health-monitor.ts
 *
 * Scans all published posts and surah descriptions for UX-breaking formatting
 * issues and reports a digest.
 *
 * Checks:
 *  - Raw [ayah:X:Y] markers visible in content_html
 *  - Raw [PAUSE] markers visible in content_html
 *  - Bare surah-ayah slugs (^\d{3}-\d{3})
 *  - Missing excerpt
 *  - Missing reading_time_minutes
 *  - content_html that appears to be raw markdown (starts with <!-- or #)
 *  - Extremely short content (< 500 chars) for published posts
 *  - Posts with no entity tags (potential SEO gap)
 *
 * Run: npx tsx scripts/content-health-monitor.ts
 * Run: npx tsx scripts/content-health-monitor.ts --fix-slugs  (future)
 */

import { createClient } from '@supabase/supabase-js'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

// ─── Issue Types ─────────────────────────────────────────────────────────────

interface Issue {
  severity: 'critical' | 'warning' | 'info'
  code: string
  message: string
}

interface PostReport {
  slug: string
  title: string
  status: string
  issues: Issue[]
}

// ─── Check Functions ──────────────────────────────────────────────────────────

function checkPost(post: Record<string, unknown>): Issue[] {
  const issues: Issue[] = []
  const html = String(post.content_html || '')
  const slug = String(post.slug || '')

  // Critical: raw tadabbur markers still visible
  if (html.includes('[ayah:')) {
    issues.push({
      severity: 'critical',
      code: 'RAW_AYAH_MARKER',
      message: 'content_html contains raw [ayah:X:Y] markers — will render as visible text',
    })
  }
  if (html.includes('[PAUSE]')) {
    issues.push({
      severity: 'critical',
      code: 'RAW_PAUSE_MARKER',
      message: 'content_html contains raw [PAUSE] markers — will render as visible text',
    })
  }

  // Critical: content looks like raw markdown
  if (html.startsWith('<!--') || /^#{1,6}\s/m.test(html.slice(0, 200))) {
    issues.push({
      severity: 'critical',
      code: 'RAW_MARKDOWN',
      message: 'content_html appears to be raw markdown — headings or comments at top',
    })
  }

  // Warning: bare surah-ayah slug
  if (/^\d{3}-\d{3,}/.test(slug)) {
    issues.push({
      severity: 'warning',
      code: 'BARE_SURAH_SLUG',
      message: `Slug "${slug}" is a bare surah-ayah ref — not human-readable or SEO-friendly`,
    })
  }

  // Warning: missing excerpt
  if (!post.excerpt) {
    issues.push({
      severity: 'warning',
      code: 'MISSING_EXCERPT',
      message: 'No excerpt — affects SEO meta description and post list previews',
    })
  }

  // Warning: missing reading time
  if (!post.reading_time_minutes) {
    issues.push({
      severity: 'warning',
      code: 'MISSING_READING_TIME',
      message: 'No reading_time_minutes — shows blank on article header',
    })
  }

  // Warning: suspiciously short content
  if (html.length < 500 && post.status === 'published') {
    issues.push({
      severity: 'warning',
      code: 'SHORT_CONTENT',
      message: `content_html is only ${html.length} chars — likely incomplete or placeholder`,
    })
  }

  // Info: no entity tags (fetched separately — flagged if count = 0)
  // Handled post-fetch below

  return issues
}

// ─── Main ─────────────────────────────────────────────────────────────────────

async function main() {
  console.log('AyahGuide Content Health Monitor')
  console.log('='.repeat(50))
  console.log(`Run date: ${new Date().toISOString()}\n`)

  // 1. Fetch all published posts
  const { data: posts, error } = await supabase
    .from('posts')
    .select('id, slug, title, status, excerpt, reading_time_minutes, content_html')
    .eq('status', 'published')
    .order('published_at', { ascending: false })

  if (error) {
    console.error('Failed to fetch posts:', error.message)
    process.exit(1)
  }

  // 2. Fetch entity tag counts per post
  const { data: tagCounts } = await supabase
    .from('entity_tags')
    .select('post_id')
    .not('post_id', 'is', null)

  const taggedPostIds = new Set((tagCounts || []).map((r: Record<string, unknown>) => r.post_id))

  // 3. Analyse each post
  const reports: PostReport[] = []
  let criticalCount = 0
  let warningCount = 0

  for (const post of posts || []) {
    const issues = checkPost(post as Record<string, unknown>)

    if (!taggedPostIds.has(post.id)) {
      issues.push({
        severity: 'info',
        code: 'NO_ENTITY_TAGS',
        message: 'No entity tags — post won\'t appear in hub pages or related content',
      })
    }

    if (issues.length > 0) {
      reports.push({
        slug: post.slug,
        title: post.title,
        status: post.status,
        issues,
      })
      criticalCount += issues.filter((i) => i.severity === 'critical').length
      warningCount += issues.filter((i) => i.severity === 'warning').length
    }
  }

  // 4. Print digest
  const totalPosts = posts?.length ?? 0
  const healthyCount = totalPosts - reports.length

  console.log(`Posts scanned: ${totalPosts}`)
  console.log(`Healthy:       ${healthyCount}`)
  console.log(`With issues:   ${reports.length}`)
  console.log(`  Critical: ${criticalCount}`)
  console.log(`  Warnings: ${warningCount}`)
  console.log()

  if (reports.length === 0) {
    console.log('✓ All published posts are healthy.')
    return
  }

  // Group by severity — show criticals first
  const criticalReports = reports.filter((r) => r.issues.some((i) => i.severity === 'critical'))
  const warningReports = reports.filter(
    (r) => !r.issues.some((i) => i.severity === 'critical') && r.issues.some((i) => i.severity === 'warning')
  )
  const infoReports = reports.filter((r) => r.issues.every((i) => i.severity === 'info'))

  if (criticalReports.length > 0) {
    console.log('CRITICAL ISSUES (fix immediately)')
    console.log('-'.repeat(50))
    for (const r of criticalReports) {
      console.log(`\n  /posts/${r.slug}`)
      console.log(`  "${r.title}"`)
      for (const issue of r.issues) {
        const prefix = issue.severity === 'critical' ? '✗' : issue.severity === 'warning' ? '⚠' : 'ℹ'
        console.log(`  ${prefix} [${issue.code}] ${issue.message}`)
      }
    }
  }

  if (warningReports.length > 0) {
    console.log('\n\nWARNINGS')
    console.log('-'.repeat(50))
    for (const r of warningReports) {
      console.log(`\n  /posts/${r.slug}`)
      console.log(`  "${r.title}"`)
      for (const issue of r.issues) {
        const prefix = issue.severity === 'warning' ? '⚠' : 'ℹ'
        console.log(`  ${prefix} [${issue.code}] ${issue.message}`)
      }
    }
  }

  if (infoReports.length > 0) {
    console.log('\n\nINFO')
    console.log('-'.repeat(50))
    for (const r of infoReports) {
      console.log(`\n  /posts/${r.slug}`)
      for (const issue of r.issues) {
        console.log(`  ℹ [${issue.code}] ${issue.message}`)
      }
    }
  }

  console.log('\n' + '='.repeat(50))
  if (criticalCount > 0) {
    console.log(`\n${criticalCount} critical issue(s) require immediate attention.`)
    process.exit(1)
  } else {
    console.log('\nNo critical issues. Review warnings above.')
  }
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
