import { createAdminClient } from '@/lib/supabase/admin'
import { SubscribersClient } from './subscribers-client'
import type { Subscriber } from '@/types'

async function getSubscribers(): Promise<{ subscribers: Subscriber[]; total: number }> {
  const adminClient = createAdminClient()
  const { data, error, count } = await adminClient
    .from('subscribers')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Subscribers fetch error:', error)
    return { subscribers: [], total: 0 }
  }

  return { subscribers: data || [], total: count || 0 }
}

export default async function SubscribersPage() {
  const { subscribers, total } = await getSubscribers()
  return <SubscribersClient initialSubscribers={subscribers} initialTotal={total} />
}
