import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { postSchema } from '@/lib/validators'
import { generateSlug, calculateReadingTime } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = Math.min(parseInt(searchParams.get('limit') || '20'), 100)
  const offset = (page - 1) * limit

  // Check if user is admin — if not, only show published posts
  const user = await verifyAuth(request)
  const isAdmin = !!user

  const adminClient = createAdminClient()

  let query = adminClient
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (!isAdmin) {
    // Public access: only published posts
    query = query.eq('status', 'published')
  } else if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    console.error('Posts fetch error:', error)
    return NextResponse.json({ error: 'Failed to load posts' }, { status: 500 })
  }

  return NextResponse.json({
    posts: data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  })
}

export async function POST(request: Request) {
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const parsed = postSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 })
  }

  const data = parsed.data
  const slug = data.slug || generateSlug(data.title)
  const readingTime = calculateReadingTime(data.content_html || '')

  const adminClient = createAdminClient()
  const { data: post, error } = await adminClient
    .from('posts')
    .insert({
      ...data,
      slug,
      reading_time_minutes: readingTime,
      created_by: user.id,
      published_at: data.status === 'published' ? new Date().toISOString() : null,
      publish_date: data.status === 'published' ? new Date().toISOString() : null,
    })
    .select()
    .single()

  if (error) {
    console.error('Post create error:', error)
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 })
  }

  return NextResponse.json({ post }, { status: 201 })
}
