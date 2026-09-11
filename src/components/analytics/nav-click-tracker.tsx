'use client'

import type { MouseEvent, ReactNode } from 'react'
import { trackNavClick, trackSubscribeCTAClick } from '@/lib/analytics'

type NavSection = 'header' | 'footer' | 'mobile'

/** Fires nav_click (and subscribe_cta_click for #subscribe) for any link clicked inside a nav area. */
export function handleNavClick(e: MouseEvent, section: NavSection) {
  const link = (e.target as HTMLElement).closest('a')
  if (!link) return
  const href = link.getAttribute('href') ?? ''
  const label = (link.textContent ?? '').trim().slice(0, 60)
  trackNavClick(label, href, section)
  if (href.endsWith('#subscribe')) trackSubscribeCTAClick(section)
}

/** Wrapper for server-rendered link lists (footers) — tracks clicks by event delegation. */
export function NavClickTracker({ section, className, children }: {
  section: NavSection
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className} onClickCapture={(e) => handleNavClick(e, section)}>
      {children}
    </div>
  )
}
