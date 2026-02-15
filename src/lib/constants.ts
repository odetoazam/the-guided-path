export const SITE_NAME = 'The Guided Path'
export const SITE_DESCRIPTION = 'Deep Quranic reflections (tadabbur) delivered to your inbox'
export const SITE_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'

export const POSTS_PER_PAGE = 12
export const AUTO_SAVE_INTERVAL = 30000 // 30 seconds

export const POST_STATUS = {
  DRAFT: 'draft',
  SCHEDULED: 'scheduled',
  PUBLISHED: 'published',
  ARCHIVED: 'archived',
} as const

export const SUBSCRIBER_STATUS = {
  PENDING: 'pending',
  ACTIVE: 'active',
  UNSUBSCRIBED: 'unsubscribed',
} as const

export const PUBLISHING_MODES = {
  MANUAL: 'manual',
  APPROVAL: 'approval',
  AUTO: 'auto',
} as const

export const COLORS = {
  gold: '#D4AF37',
  goldLight: '#F5E6A3',
  goldDark: '#B8960C',
} as const
