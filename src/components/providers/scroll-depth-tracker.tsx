'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { trackScrollDepth } from '@/lib/analytics'

/**
 * Tracks scroll depth at 25%, 50%, 75%, 100% milestones.
 * Fires once per milestone per page load.
 */
export function ScrollDepthTracker({ slug, contentType }: { slug: string; contentType: string }) {
  const fired = useRef(new Set<number>())
  const pathname = usePathname()

  useEffect(() => {
    fired.current = new Set()
  }, [pathname])

  useEffect(() => {
    const milestones = [25, 50, 75, 100]

    const handler = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      if (docHeight <= 0) return
      const percent = Math.round((scrollTop / docHeight) * 100)

      for (const m of milestones) {
        if (percent >= m && !fired.current.has(m)) {
          fired.current.add(m)
          trackScrollDepth(slug, contentType, m)
        }
      }
    }

    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [slug, contentType])

  return null
}
