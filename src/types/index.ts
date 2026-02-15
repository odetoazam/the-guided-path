export interface Post {
  id: string
  title: string
  slug: string
  excerpt: string | null
  content_json: any
  content_html: string
  featured_image: string | null
  status: 'draft' | 'scheduled' | 'published' | 'archived'
  publish_date: string | null
  scheduled_date: string | null
  seo_title: string | null
  seo_description: string | null
  tags: string[]
  reading_time_minutes: number
  featured: boolean
  quran_refs: QuranRef[] | null
  email_sent: boolean
  email_sent_at: string | null
  created_by: string
  created_at: string
  updated_at: string
  published_at: string | null
}

export interface QuranRef {
  surah: string
  surah_number: number
  ayah_start: number
  ayah_end: number
  arabic_text: string
  translation: string
}

export interface Subscriber {
  id: string
  email: string
  name: string | null
  status: 'pending' | 'active' | 'unsubscribed'
  confirmation_token: string | null
  unsubscribe_token: string | null
  confirmed_at: string | null
  unsubscribed_at: string | null
  source: string | null
  created_at: string
}

export interface EmailLog {
  id: string
  post_id: string
  subscriber_count: number
  status: 'pending' | 'sent' | 'failed'
  resend_batch_id: string | null
  sent_at: string | null
  error_message: string | null
}

export interface Setting {
  id: string
  key: string
  value: any
  updated_at: string
}

export interface Analytics {
  id: string
  post_id: string
  date: string
  views: number
  unique_views: number
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  role: 'admin' | 'viewer'
  created_at: string
}

export interface DashboardStats {
  totalPosts: number
  totalSubscribers: number
  totalViews: number
  totalEmailsSent: number
  recentPosts: Post[]
  subscriberGrowth: { date: string; count: number }[]
}
