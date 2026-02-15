'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LoadingSpinner } from '@/components/ui/loading'
import { BarChart3, Eye, FileText, Users, Mail, TrendingUp } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import toast from 'react-hot-toast'

interface Stats {
  totalPosts: number
  publishedPosts: number
  totalSubscribers: number
  activeSubscribers: number
  totalEmails: number
  topPosts: any[]
  recentSubscribers: any[]
}

export default function AnalyticsPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchStats()
  }, [])

  const fetchStats = async () => {
    const supabase = createClient()

    try {
      const [postsRes, pubPostsRes, subsRes, activeSubsRes, emailsRes, topPostsRes, recentSubsRes] = await Promise.all([
        supabase.from('posts').select('id', { count: 'exact' }),
        supabase.from('posts').select('id', { count: 'exact' }).eq('status', 'published'),
        supabase.from('subscribers').select('id', { count: 'exact' }),
        supabase.from('subscribers').select('id', { count: 'exact' }).eq('status', 'active'),
        supabase.from('email_logs').select('subscriber_count').eq('status', 'sent'),
        supabase.from('posts').select('id, title, slug, published_at, reading_time_minutes').eq('status', 'published').order('published_at', { ascending: false }).limit(10),
        supabase.from('subscribers').select('email, name, status, created_at').order('created_at', { ascending: false }).limit(10),
      ])

      const totalEmailsSent = (emailsRes.data || []).reduce((acc: number, log: any) => acc + (log.subscriber_count || 0), 0)

      setStats({
        totalPosts: postsRes.count || 0,
        publishedPosts: pubPostsRes.count || 0,
        totalSubscribers: subsRes.count || 0,
        activeSubscribers: activeSubsRes.count || 0,
        totalEmails: totalEmailsSent,
        topPosts: topPostsRes.data || [],
        recentSubscribers: recentSubsRes.data || [],
      })
    } catch {
      toast.error('Failed to fetch analytics')
    }
    setLoading(false)
  }

  if (loading) return <LoadingSpinner className="py-20" />

  if (!stats) return <p className="text-zinc-500">Unable to load analytics.</p>

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-white">Analytics</h1>
        <p className="mt-1 text-zinc-400">Overview of your platform performance</p>
      </div>

      {/* Stats grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { label: 'Total Posts', value: stats.totalPosts, icon: FileText, color: 'text-blue-500' },
          { label: 'Published', value: stats.publishedPosts, icon: TrendingUp, color: 'text-green-500' },
          { label: 'Active Subscribers', value: stats.activeSubscribers, icon: Users, color: 'text-purple-500' },
          { label: 'Emails Sent', value: stats.totalEmails, icon: Mail, color: 'text-gold-500' },
        ].map((stat) => (
          <div key={stat.label} className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6">
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm text-zinc-400">{stat.label}</span>
            </div>
            <p className="mt-2 text-3xl font-bold text-white">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Top posts */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="border-b border-zinc-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Recent Published Posts</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {stats.topPosts.length === 0 ? (
              <p className="px-6 py-8 text-center text-zinc-500">No published posts yet</p>
            ) : (
              stats.topPosts.map((post: any) => (
                <div key={post.id} className="px-6 py-3">
                  <p className="font-medium text-white truncate">{post.title}</p>
                  <p className="text-sm text-zinc-500">
                    {post.published_at ? formatDate(post.published_at) : 'Not published'}
                    {post.reading_time_minutes && ` · ${post.reading_time_minutes} min read`}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent subscribers */}
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50">
          <div className="border-b border-zinc-800 px-6 py-4">
            <h2 className="text-lg font-semibold text-white">Recent Subscribers</h2>
          </div>
          <div className="divide-y divide-zinc-800">
            {stats.recentSubscribers.length === 0 ? (
              <p className="px-6 py-8 text-center text-zinc-500">No subscribers yet</p>
            ) : (
              stats.recentSubscribers.map((sub: any, idx: number) => (
                <div key={idx} className="flex items-center justify-between px-6 py-3">
                  <div>
                    <p className="text-white">{sub.email}</p>
                    <p className="text-sm text-zinc-500">{sub.name || 'No name'}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    sub.status === 'active' ? 'bg-green-900/30 text-green-400' :
                    sub.status === 'pending' ? 'bg-yellow-900/30 text-yellow-400' :
                    'bg-red-900/30 text-red-400'
                  }`}>
                    {sub.status}
                  </span>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
