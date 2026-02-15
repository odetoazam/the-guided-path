import { createClient } from '@/lib/supabase/server'
import { FileText, Users, Eye, Mail } from 'lucide-react'

async function getStats() {
  const supabase = await createClient()

  const [postsRes, subscribersRes, emailsRes] = await Promise.all([
    supabase.from('posts').select('id', { count: 'exact' }),
    supabase.from('subscribers').select('id', { count: 'exact' }).eq('status', 'active'),
    supabase.from('email_logs').select('id', { count: 'exact' }).eq('status', 'sent'),
  ])

  const { data: recentPosts } = await supabase
    .from('posts')
    .select('id, title, slug, status, created_at, published_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return {
    totalPosts: postsRes.count || 0,
    totalSubscribers: subscribersRes.count || 0,
    totalEmails: emailsRes.count || 0,
    recentPosts: recentPosts || [],
  }
}

export default async function AdminDashboard() {
  let stats = { totalPosts: 0, totalSubscribers: 0, totalEmails: 0, recentPosts: [] as any[] }

  try {
    stats = await getStats()
  } catch {
    // Supabase not configured yet - show empty state
  }

  const statCards = [
    { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-blue-500' },
    { label: 'Active Subscribers', value: stats.totalSubscribers, icon: Users, color: 'text-green-500' },
    { label: 'Emails Sent', value: stats.totalEmails, icon: Mail, color: 'text-purple-500' },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="mt-1 text-zinc-400">Welcome back. Here&apos;s your overview.</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6"
          >
            <div className="flex items-center gap-3">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm text-zinc-400">{stat.label}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Recent posts */}
      <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
        <div className="border-b border-zinc-800 px-6 py-4">
          <h2 className="text-lg font-semibold text-white">Recent Posts</h2>
        </div>
        <div className="divide-y divide-zinc-800">
          {stats.recentPosts.length === 0 ? (
            <div className="px-6 py-12 text-center text-zinc-500">
              <FileText className="mx-auto h-8 w-8 mb-2" />
              <p>No posts yet. Create your first tadabbur!</p>
            </div>
          ) : (
            stats.recentPosts.map((post: any) => (
              <div key={post.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-white">{post.title}</p>
                  <p className="text-sm text-zinc-400">
                    {post.status === 'published' ? 'Published' : post.status} ·{' '}
                    {new Date(post.created_at).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    post.status === 'published'
                      ? 'bg-green-900/30 text-green-400'
                      : post.status === 'draft'
                      ? 'bg-zinc-800 text-zinc-400'
                      : 'bg-yellow-900/30 text-yellow-400'
                  }`}
                >
                  {post.status}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
