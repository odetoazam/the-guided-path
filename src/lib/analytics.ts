'use client'

import posthog from 'posthog-js'

/**
 * Custom PostHog event tracking for AyahGuide.
 * All events flow to PostHog for the weekly optimization digest.
 */

// ─── CTA & Conversion ──────────────────────────────────────────────────────

export function trackSubscribeAttempt(source: string) {
  posthog.capture('subscribe_attempt', { source })
}

export function trackSubscribeSuccess(source: string) {
  posthog.capture('subscribe_success', { source })
}

export function trackSubscribeError(source: string, error: string) {
  posthog.capture('subscribe_error', { source, error })
}

// ─── Navigation ─────────────────────────────────────────────────────────────

export function trackNavClick(label: string, href: string, section: 'header' | 'footer' | 'mobile') {
  posthog.capture('nav_click', { label, href, section })
}

export function trackSubscribeCTAClick(location: string) {
  posthog.capture('subscribe_cta_click', { location })
}

// ─── Content Engagement ─────────────────────────────────────────────────────

export function trackShareClick(platform: 'twitter' | 'whatsapp' | 'email', contentType: string, slug: string) {
  posthog.capture('share_click', { platform, content_type: contentType, slug })
}

export function trackSurahCardClick(surahNumber: number, surahName: string) {
  posthog.capture('surah_card_click', { surah_number: surahNumber, surah_name: surahName })
}

export function trackVisualPageView(surahNumber: number, surahName: string) {
  posthog.capture('visual_page_view', { surah_number: surahNumber, surah_name: surahName })
}

export function trackGoDeeper(from: string, target: string) {
  posthog.capture('go_deeper_click', { from, target })
}

// ─── Hub & Glossary ─────────────────────────────────────────────────────────

export function trackHubTabSwitch(hubSlug: string, tab: string) {
  posthog.capture('hub_tab_switch', { hub_slug: hubSlug, tab })
}

export function trackSurahTabSwitch(surahSlug: string, tab: string, subTab?: string) {
  posthog.capture('surah_tab_switch', { surah_slug: surahSlug, tab, sub_tab: subTab })
}

export function trackGlossaryCategoryFilter(category: string) {
  posthog.capture('glossary_category_filter', { category })
}

export function trackEntityTagClick(entitySlug: string, fromPage: string) {
  posthog.capture('entity_tag_click', { entity_slug: entitySlug, from_page: fromPage })
}

// ─── Reading Depth ──────────────────────────────────────────────────────────

export function trackScrollDepth(slug: string, contentType: string, depth: number) {
  posthog.capture('scroll_depth', { slug, content_type: contentType, depth_percent: depth })
}

// ─── Theme ──────────────────────────────────────────────────────────────────

export function trackThemeToggle(theme: string) {
  posthog.capture('theme_toggle', { theme })
}

// ─── Prev/Next Navigation ───────────────────────────────────────────────────

export function trackBranchingNav(direction: 'prev' | 'next', fromSlug: string, toSlug: string) {
  posthog.capture('branching_nav', { direction, from_slug: fromSlug, to_slug: toSlug })
}

// ─── Guidance Journey Signals ───────────────────────────────────────────────

/** Fired when a user visits the same slug in a new session — strongest signal of resonance */
export function trackContentReturn(slug: string, contentType: string) {
  posthog.capture('content_return', { slug, content_type: contentType })
}

/** Fired on the first page of a new session — reveals where the guidance journey actually begins */
export function trackGuidanceEntryPoint(path: string, referrer: string) {
  const pathMatch = path.match(/^\/paths\/([^/]+)/)
  const path_id = pathMatch ? pathMatch[1] : null
  posthog.capture('guidance_entry_point', { path, referrer, path_id })
}

/** Fired after 3+ pages in a session — distinguishes active seekers from passive browsers */
export function trackSessionDepth(pageCount: number, path: string) {
  posthog.capture('session_depth', { page_count: pageCount, current_path: path })
}
