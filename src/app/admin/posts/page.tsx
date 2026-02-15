'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { LoadingSpinner } from '@/components/ui/loading'
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Copy,
  Eye,
} from 'lucide-react'
import { formatDate } from '@/lib/utils'
import type { Post } from '@/types'
import toast from 'react-hot-toast'

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('all')

  useEffect(() => {
    fetchPosts()
  }, [statusFilter])

  const fetchPosts = async () => {
    const supabase = createClient()
    let query = supabase
      .from('posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter)
    }

    const { data, error } = await query
    if (error) {
      toast.error('Failed to fetch posts')
    } else {
      setPosts(data || [])
    }
    setLoading(false)
  }

  const deletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return

    const supabase = createClient()
    const { error } = await supabase.from('posts').delete().eq('id', id)

    if (error) {
      toast.error('Failed to delete post')
    } else {
      toast.success('Post deleted')
      fetchPosts()
    }
  }

  const duplicatePost = async (post: Post) => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const { error } = await supabase.from('posts').insert({
      title: `${post.title} (Copy)`,
      slug: `${post.slug}-copy-${Date.now()}`,
      excerpt: post.excerpt,
      content_json: post.content_json,
      content_html: post.content_html,
      tags: post.tags,
      status: 'draft',
      created_by: user.id,
    })

    if (error) {
      toast.error('Failed to duplicate post')
    } else {
      toast.success('Post duplicated as draft')
      fetchPosts()
    }
  }

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(search.toLowerCase())
  )

  const statusBadge = (status: string) => {
    const variants: Record<string, 'success' | 'warning' | 'default' | 'danger'> = {
      published: 'success',
      scheduled: 'warning',
      draft: 'default',
      archived: 'danger',
    }
    return <Badge variant={variants[status] || 'default'}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Posts</h1>
          <p className="mt-1 text-zinc-400">{posts.length} total posts</p>
        </div>
        <Link href="/admin/posts/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Post
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <Input
            placeholder="Search posts..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10 bg-zinc-900 border-zinc-700"
          />
        </div>
        <div className="flex gap-2">
          {['all', 'draft', 'published', 'scheduled', 'archived'].map((status) => (
            <button
              key={status}
              onClick={() => setStatusFilter(status)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                statusFilter === status
                  ? 'bg-gold-500/20 text-gold-500'
                  : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Posts list */}
      {loading ? (
        <LoadingSpinner className="py-20" />
      ) : filteredPosts.length === 0 ? (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 py-20 text-center">
          <p className="text-zinc-500">No posts found</p>
          <Link href="/admin/posts/new" className="mt-4 inline-block">
            <Button variant="outline">Create your first post</Button>
          </Link>
        </div>
      ) : (
        <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 divide-y divide-zinc-800">
          {filteredPosts.map((post) => (
            <div key={post.id} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-800/30 transition-colors">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-3">
                  <Link
                    href={`/admin/posts/${post.id}`}
                    className="font-medium text-white hover:text-gold-500 truncate transition-colors"
                  >
                    {post.title}
                  </Link>
                  {statusBadge(post.status)}
                  {post.featured && <Badge variant="gold">Featured</Badge>}
                </div>
                <div className="mt-1 flex items-center gap-3 text-sm text-zinc-500">
                  <span>{formatDate(post.created_at)}</span>
                  {post.tags.length > 0 && (
                    <span>{post.tags.join(', ')}</span>
                  )}
                  {post.reading_time_minutes && (
                    <span>{post.reading_time_minutes} min read</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1 ml-4">
                <Link href={`/admin/posts/${post.id}`}>
                  <Button variant="ghost" size="sm" title="Edit">
                    <Edit className="h-4 w-4" />
                  </Button>
                </Link>
                {post.status === 'published' && (
                  <Link href={`/tadabbur/${post.slug}`} target="_blank">
                    <Button variant="ghost" size="sm" title="View">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </Link>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  title="Duplicate"
                  onClick={() => duplicatePost(post)}
                >
                  <Copy className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  title="Delete"
                  onClick={() => deletePost(post.id)}
                  className="text-red-400 hover:text-red-300"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
