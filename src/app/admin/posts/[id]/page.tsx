'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TiptapEditor } from '@/components/editor/tiptap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { LoadingPage } from '@/components/ui/loading'
import { calculateReadingTime } from '@/lib/utils'
import { Save, Send, ArrowLeft, Trash2, Eye } from 'lucide-react'
import Link from 'next/link'
import toast from 'react-hot-toast'
import type { Post } from '@/types'

export default function EditPostPage() {
  const { id } = useParams<{ id: string }>()
  const router = useRouter()
  const [post, setPost] = useState<Post | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

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
    const supabase = createClient()
    const { data, error } = await supabase
      .from('posts')
      .select('*')
      .eq('id', id)
      .single()

    if (error || !data) {
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

  const save = async (newStatus?: string) => {
    setSaving(true)

    const isPublishing = newStatus === 'published' && post?.status !== 'published'

    if (isPublishing) {
      // Save the post content first, then publish via the API
      const supabase = createClient()
      const { error: saveError } = await supabase
        .from('posts')
        .update({
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
        })
        .eq('id', id)

      if (saveError) {
        toast.error('Failed to save: ' + saveError.message)
        setSaving(false)
        return
      }

      // Call the publish API endpoint
      try {
        const res = await fetch(`/api/posts/${id}/publish`, { method: 'POST' })
        const data = await res.json()

        if (!res.ok) {
          toast.error(data.error || 'Failed to publish')
        } else {
          toast.success('Post published!')
          router.push('/admin/posts')
        }
      } catch {
        toast.error('Failed to publish')
      }
    } else {
      // Regular save (draft, or re-saving a published post)
      const supabase = createClient()
      const status = newStatus || form.status
      const { error } = await supabase
        .from('posts')
        .update({
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
          status,
        })
        .eq('id', id)

      if (error) {
        toast.error('Failed to save: ' + error.message)
      } else {
        toast.success('Post saved!')
        if (newStatus) router.push('/admin/posts')
      }
    }
    setSaving(false)
  }

  const deletePost = async () => {
    if (!confirm('Are you sure you want to delete this post? This cannot be undone.')) return
    const supabase = createClient()
    const { error } = await supabase.from('posts').delete().eq('id', id)
    if (error) {
      toast.error('Failed to delete')
    } else {
      toast.success('Post deleted')
      router.push('/admin/posts')
    }
  }

  if (loading) return <LoadingPage />

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm"><ArrowLeft className="h-4 w-4" /></Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">Edit Post</h1>
          <Badge variant={form.status === 'published' ? 'success' : form.status === 'draft' ? 'default' : 'warning'}>
            {form.status}
          </Badge>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" onClick={deletePost} className="text-red-400">
            <Trash2 className="h-4 w-4" />
          </Button>
          {post?.status === 'published' && (
            <Link href={`/tadabbur/${post.slug}`} target="_blank">
              <Button variant="outline" size="sm">
                <Eye className="mr-2 h-4 w-4" /> View
              </Button>
            </Link>
          )}
          <Button variant="outline" onClick={() => save()} loading={saving}>
            <Save className="mr-2 h-4 w-4" /> Save
          </Button>
          {form.status !== 'published' && (
            <Button onClick={() => save('published')} loading={saving}>
              <Send className="mr-2 h-4 w-4" /> Publish
            </Button>
          )}
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
