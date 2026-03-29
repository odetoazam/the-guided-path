'use client'

import { trackShareClick } from '@/lib/analytics'

interface ShareLinkProps {
  href: string
  platform: 'twitter' | 'whatsapp' | 'email'
  contentType: string
  slug: string
  className?: string
  children: React.ReactNode
}

export function ShareLink({ href, platform, contentType, slug, className, children }: ShareLinkProps) {
  return (
    <a
      href={href}
      target={platform !== 'email' ? '_blank' : undefined}
      rel={platform !== 'email' ? 'noopener noreferrer' : undefined}
      className={className}
      onClick={() => trackShareClick(platform, contentType, slug)}
    >
      {children}
    </a>
  )
}
