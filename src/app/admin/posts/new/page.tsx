'use client'

import { useState, useCallback, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { TiptapEditor } from '@/components/editor/tiptap-editor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { generateSlug, calculateReadingTime } from '@/lib/utils'
import { AUTO_SAVE_INTERVAL } from '@/lib/constants'
import Link from 'next/link'
import toast from 'react-hot-toast'

import { ArrowLeft, Save, Send, Clock } from 'lucide-react'
export default function NewPostPage() {
  const router = useRouter()
  const [saving, setSaving] = useState(false)
  const [publishing, setPublishing] = useState(false)
  const autoSaveRef = useRef<NodeJS.Timeout | null>(null)
  const postIdRef = useRef<string | null>(null)

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
    scheduled_date: '',
    featured: false,
  })

  const updateField = (field: string, value: any) => {
    setForm((prev) => {
      const updated = { ...prev, [field]: value }
      if (field === 'title' && !prev.slug) {
        updated.slug = generateSlug(value)
      }
      return updated
    })
  }

  const handleEditorChange = useCallback((data: { json: any; html: string }) => {
    setForm((prev) => ({
      ...prev,
      content_json: data.json,
      content_html: data.html,
    }))
  }, [])

  // Auto-save draft
  useEffect(() => {
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)

    if (form.title && form.content_json) {
      autoSaveRef.current = setTimeout(() => {
        saveDraft(true)
      }, AUTO_SAVE_INTERVAL)
    }

    return () => {
      if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    }
  }, [form.title, form.content_json])

  const saveDraft = async (isAutoSave = false) => {
    if (!form.title) {
      if (!isAutoSave) toast.error('Title is required')
      return
    }

    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const postData = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content_json: form.content_json || {},
      content_html: form.content_html || '',
      featured_image: form.featured_image || null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      reading_time_minutes: calculateReadingTime(form.content_html || ''),
      featured: form.featured,
      status: 'draft' as const,
      created_by: user.id,
    }

    if (postIdRef.current) {
      const { error } = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postIdRef.current)

      if (error) {
        if (!isAutoSave) toast.error('Failed to save')
      } else {
        if (!isAutoSave) toast.success('Draft saved')
      }
    } else {
      const { data, error } = await supabase
        .from('posts')
        .insert(postData)
        .select('id')
        .single()

      if (error) {
        if (!isAutoSave) toast.error('Failed to save')
      } else {
        postIdRef.current = data.id
        if (!isAutoSave) toast.success('Draft saved')
      }
    }

    setSaving(false)
  }

  const publish = async () => {
    if (!form.title || !form.content_json) {
      toast.error('Title and content are required')
      return
    }

    setPublishing(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const postData = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content_json: form.content_json,
      content_html: form.content_html,
      featured_image: form.featured_image || null,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      seo_title: form.seo_title || null,
      seo_description: form.seo_description || null,
      reading_time_minutes: calculateReadingTime(form.content_html || ''),
      featured: form.featured,
      status: 'published' as const,
      published_at: new Date().toISOString(),
      publish_date: new Date().toISOString(),
      created_by: user.id,
    }

    let error: any

    if (postIdRef.current) {
      const result = await supabase
        .from('posts')
        .update(postData)
        .eq('id', postIdRef.current)
      error = result.error
    } else {
      const result = await supabase.from('posts').insert(postData)
      error = result.error
    }

    if (error) {
      toast.error('Failed to publish: ' + error.message)
    } else {
      toast.success('Post published!')
      router.push('/admin/posts')
    }

    setPublishing(false)
  }

  const schedulePost = async () => {
    if (!form.title || !form.content_json || !form.scheduled_date) {
      toast.error('Title, content, and schedule date are required')
      return
    }

    setSaving(true)
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return

    const postData = {
      title: form.title,
      slug: form.slug || generateSlug(form.title),
      excerpt: form.excerpt,
      content_json: form.content_json,
      content_html: form.content_html,
      tags: form.tags ? form.tags.split(',').map((t) => t.trim()).filter(Boolean) : [],
      reading_time_minutes: calculateReadingTime(form.content_html || ''),
      status: 'scheduled' as const,
      scheduled_date: form.scheduled_date,
      created_by: user.id,
    }

    const { error } = postIdRef.current
      ? await supabase.from('posts').update(postData).eq('id', postIdRef.current)
      : await supabase.from('posts').insert(postData)

    if (error) {
      toast.error('Failed to schedule')
    } else {
      toast.success('Post scheduled!')
      router.push('/admin/posts')
    }
    setSaving(false)
  }

  return (
    <div className="mx-auto max-w-4xl space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/posts">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-white">New Post</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => saveDraft()} loading={saving}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={publish} loading={publishing}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </div>

      {/* Title */}
      <Input
        placeholder="Enter your post title..."
        value={form.title}
        onChange={(e) => updateField('title', e.target.value)}
        className="text-2xl font-bold bg-transparent border-none px-0 h-auto py-2 text-white placeholder:text-zinc-600 focus-visible:ring-0"
      />

      {/* Slug */}
      <div className="flex items-center gap-2 text-sm text-zinc-400">
        <span>/tadabbur/</span>
        <input
          value={form.slug}
          onChange={(e) => updateField('slug', e.target.value)}
          className="bg-transparent border-b border-zinc-700 px-1 py-0.5 text-zinc-300 focus:outline-none focus:border-gold-500"
          placeholder="post-slug"
        />
      </div>

      {/* Editor */}
      <TiptapEditor
        content={form.content_json}
        onChange={handleEditorChange}
      />

      {/* Sidebar fields */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-4">
          <Textarea
            label="Excerpt"
            placeholder="Brief summary of the post..."
            value={form.excerpt}
            onChange={(e) => updateField('excerpt', e.target.value)}
            className="bg-zinc-900 border-zinc-700"
          />

          <Input
            label="Tags (comma-separated)"
            placeholder="tadabbur, surah-baqarah, patience"
            value={form.tags}
            onChange={(e) => updateField('tags', e.target.value)}
            className="bg-zinc-900 border-zinc-700"
          />

          <Input
            label="Featured Image URL"
            placeholder="https://..."
            value={form.featured_image}
            onChange={(e) => updateField('featured_image', e.target.value)}
            className="bg-zinc-900 border-zinc-700"
          />

          <label className="flex items-center gap-2 text-sm text-zinc-300 cursor-pointer">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => updateField('featured', e.target.checked)}
              className="rounded border-zinc-600"
            />
            Featured post
          </label>
        </div>

        <div className="space-y-4">
          <Input
            label="SEO Title (max 60 chars)"
            placeholder="Custom SEO title..."
            value={form.seo_title}
            onChange={(e) => updateField('seo_title', e.target.value)}
            maxLength={60}
            className="bg-zinc-900 border-zinc-700"
          />

          <Textarea
            label="SEO Description (max 160 chars)"
            placeholder="Custom meta description..."
            value={form.seo_description}
            onChange={(e) => updateField('seo_description', e.target.value)}
            maxLength={160}
            className="bg-zinc-900 border-zinc-700"
          />

          <div className="space-y-1">
            <label className="block text-sm font-medium text-zinc-300">
              Schedule for later
            </label>
            <div className="flex gap-2">
              <Input
                type="datetime-local"
                value={form.scheduled_date}
                onChange={(e) => updateField('scheduled_date', e.target.value)}
                className="bg-zinc-900 border-zinc-700"
              />
              {form.scheduled_date && (
                <Button variant="outline" onClick={schedulePost} loading={saving}>
                  <Clock className="mr-2 h-4 w-4" />
                  Schedule
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
