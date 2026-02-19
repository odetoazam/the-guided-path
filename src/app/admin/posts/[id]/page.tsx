'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { TiptapEditor } from '@/components/editor/tiptap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { LoadingPage } from '@/components/ui/loading'
import { calculateReadingTime } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'
import { Save, Send, ArrowLeft, Trash2, Eye, Mail, MailCheck, CheckCircle, XCircle } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import type { Post } from '@/types'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [sendingEmail, setSendingEmail] = useState(false)
  const supabaseRef = useRef(createClient())

  // Helper to get auth headers with the current access token
  const getAuthHeaders = async (): Promise<Record<string, string>> => {
    const { data: { session } } = await supabaseRef.current.auth.getSession()
    if (!session?.access_token) return { 'Content-Type': 'application/json' }
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${session.access_token}`,
    }
  }

  const [form, setForm] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content_json: null as any,
    content_html: '',
    featured_image: '',
    tags: '',
    seo_title: '',
    seo_description: '',
    featured: false,
    status: 'draft' as string,
  })

  useEffect(() => {
    fetchPost()
  }, [id])

  const fetchPost = async () => {
    try {
      const headers = await getAuthHeaders()
      const res = await fetch(`/api/posts/${id}`, { headers })
      const { post: data, error } = await res.json()

      if (!res.ok || !data) {
        toast.error('Post not found')
        router.push('/admin/posts')
        return
      }

      setPost(data)
      setForm({
        title: data.title,
        slug: data.slug,
        excerpt: data.excerpt || '',
        content_json: data.content_json,
        content_html: data.content_html,
        featured_image: data.featured_image || '',
        tags: data.tags?.join(', ') || '',
        seo_title: data.seo_title || '',
        seo_description: data.seo_description || '',
        featured: data.featured || false,
        status: data.status,
      })
    } catch {
      toast.error('Failed to load post')
      router.push('/admin/posts')
    }
    setLoading(false)
  }

  const updateField = (field: string, value: any) => {
    setForm((prev) => ({ ...prev, [field]: value }))
  }

  const handleEditorChange = useCallback((data: { json: any; html: string }) => {
    setForm((prev) => ({
      ...prev,
      content_json: data.json,
      content_html: data.html,
    }))
  }, [])

  const save = async () => {
    setSaving(true)

    const updateData = {
      title: form.title,
      slug: form.slug,
      excerpt: form.excerpt || null,
      content_json: form.content_json,
      content_html: form.content_html,
      featured_image: form.featured_image || null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      reading_time_minutes: calculateReadingTime(form.content_html || ''),
      featured: form.featured,
      status: form.status,
    }

    try {
      const headers = await getAuthHeaders()
      const res = await fetch(`/api/posts/${id}`, {
        method: 'PATCH',
        headers,
        body: JSON.stringify(updateData),
      })

      const data = await res.json()

      if (!res.ok) {
        toast.error('Failed to save: ' + (data.error || 'Unknown error'))
      } else {
        setPost(data.post)
        toast.success('Post saved!')
      }
    } catch (err) {
      toast.error('Failed to save — network error')
    }
    setSaving(false)
  }

  const toggleStatus = async () => {
    const newStatus = form.status === 'published' ? 'draft' : 'published'

    const headers = await getAuthHeaders()
    const res = await fetch(`/api/posts/${id}/publish`, {
      method: 'POST',
      headers,
      body: JSON.stringify({ status: newStatus }),
    })

    if (res.ok) {
      const { post: updatedPost } = await res.json()
      setPost(updatedPost)
      setForm((prev) => ({ ...prev, status: newStatus }))
      toast.success(newStatus === 'published' ? 'Post published!' : 'Post moved to draft')
    } else {
      toast.error('Failed to update status')
    }
  }

  const sendNewsletter = async () => {
    if (form.status !== 'published') {
      toast.error('Publish the post first before sending the newsletter')
      return
    }

    if (post?.email_sent) {
      if (!confirm('Newsletter was already sent for this post. Send again?')) return
    }

    if (!confirm('Send this post as a newsletter to all active subscribers?')) return

    setSendingEmail(true)
    try {
      const headers = await getAuthHeaders()
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers,
        body: JSON.stringify({ postId: id }),
      })

      const data = await res.json()

      if (res.ok) {
        toast.success(data.message || 'Newsletter sent!')
        // Refresh post to get updated email_sent status
        fetchPost()
      } else {
        toast.error(data.error || 'Failed to send newsletter')
      }
    } catch (error) {
      toast.error('Failed to send newsletter')
    }
    setSendingEmail(false)
  }

  const deletePost = async () => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return
    try {
      const headers = await getAuthHeaders()
      const res = await fetch(`/api/posts/${id}`, { method: 'DELETE', headers })
      if (res.ok) {
        toast.success('Post deleted')
        router.push('/admin/posts')
      } else {
        toast.error('Failed to delete')
      }
    } catch {
      toast.error('Failed to delete')
    }
  }

  if (loading) return <LoadingPage />

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={deletePost} className="text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
          {form.status === 'published' && (
            <Link href={`/tadabbur/${form.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
            </Link>
          )}
          <Button variant="outline" onClick={save} loading={saving}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
        </div>
      </div>

      {/* Status & Newsletter bar */}
      <div className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900/50 p-4">
        <div className="flex items-center gap-4">
          {/* Status toggle */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-zinc-400">Status:</span>
            <button
              onClick={toggleStatus}
              className="flex items-center gap-2 rounded-lg border border-zinc-700 px-3 py-1.5 text-sm transition-colors hover:border-zinc-500"
            >
              {form.status === 'published' ? (
                <>
                  <CheckCircle className="h-4 w-4 text-green-400" />
                  <span className="text-green-400 font-medium">Published</span>
                </>
              ) : form.status === 'draft' ? (
                <>
                  <XCircle className="h-4 w-4 text-zinc-400" />
                  <span className="text-zinc-400 font-medium">Draft</span>
                </>
              ) : (
                <>
                  <Badge variant="warning">{form.status}</Badge>
                </>
              )}
            </button>
            <span className="text-xs text-zinc-600">Click to toggle</span>
          </div>
        </div>

        {/* Newsletter send */}
        <div className="flex items-center gap-3">
          {post?.email_sent && (
            <div className="flex items-center gap-1.5 text-sm text-green-400">
              <MailCheck className="h-4 w-4" />
              <span>Sent {post.email_sent_at ? new Date(post.email_sent_at).toLocaleDateString() : ''}</span>
            </div>
          )}
          <Button
            variant={post?.email_sent ? 'outline' : 'primary'}
            size="sm"
            onClick={sendNewsletter}
            loading={sendingEmail}
            disabled={form.status !== 'published'}
          >
            <Mail className="mr-2 h-4 w-4" />
            {post?.email_sent ? 'Resend Newsletter' : 'Send Newsletter'}
          </Button>
        </div>
      </div>

      <Input
        placeholder="Post title..."
        value={form.title}
        onChange={(e) => updateField('title', e.target.value)}
        className="text-2xl font-bold bg-transparent border-none px-0 h-auto py-2 text-white placeholder:text-zinc-600 focus-visible:ring-0"
      />

      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <span>/tadabbur/</span>
        <input
          value={form.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          className="bg-transparent border-b border-zinc-700 px-1 py-0.5 text-zinc-300 focus:outline-none focus:border-gold-500"
        />
      </div>

      <TiptapEditor content={form.content_json} onChange={handleEditorChange} />

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Textarea label="Excerpt" value={form.excerpt} onChange={(e) => updateField('excerpt', e.target.value)} className="bg-zinc-900 border-zinc-700" />
          <Input label="Tags (comma-separated)" value={form.tags} onChange={(e) => updateField('tags', e.target.value)} className="bg-zinc-900 border-zinc-700" />
          <Input label="Featured Image URL" value={form.featured_image} onChange={(e) => updateField('featured_image', e.target.value)} className="bg-zinc-900 border-zinc-700" />
          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
            <input type="checkbox" checked={form.featured} onChange={(e) => updateField('featured', e.target.checked)} className="rounded border-zinc-600" />
            Featured post
          </label>
        </div>
        <div className="space-y-4">
          <Input label="SEO Title" value={form.seo_title} onChange={(e) => updateField('seo_title', e.target.value)} maxLength={60} className="bg-zinc-900 border-zinc-700" />
          <Textarea label="SEO Description" value={form.seo_description} onChange={(e) => updateField('seo_description', e.target.value)} maxLength={160} className="bg-zinc-900 border-zinc-700" />
        </div>
      </div>
    </div>
  )
}
