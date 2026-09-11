'use client'

import Link from 'next/link'
import posthog from 'posthog-js'
import type { ComponentProps } from 'react'

type TrackedEvent = 'entity_tag_click'

interface TrackedLinkProps extends ComponentProps<typeof Link> {
  event: TrackedEvent
  properties: Record<string, string | number>
}

/** A next/link that fires a PostHog event on click — usable from server components. */
export function TrackedLink({ event, properties, onClick, ...linkProps }: TrackedLinkProps) {
  return (
    <Link
      {...linkProps}
      onClick={(e) => {
        posthog.capture(event, properties)
        onClick?.(e)
      }}
    />
  )
}
