import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'
import { postSchema } from '@/lib/validators'
import { generateSlug, calculateReadingTime } from '@/lib/utils'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const status = searchParams.get('status')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const offset = (page - 1) * limit

  const supabase = await createClient()

  let query = supabase
    .from('posts')
    .select('*', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(offset, offset + limit - 1)

  if (status && status !== 'all') {
    query = query.eq('status', status)
  }

  const { data, error, count } = await query

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    posts: data,
    total: count,
    page,
    totalPages: Math.ceil((count || 0) / limit),
  })
}

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

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

  const { data: post, error } = await supabase
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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ post }, { status: 201 })
}
