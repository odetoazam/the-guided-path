import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { calculateReadingTime } from '@/lib/utils'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params

  // Validate UUID format to prevent scanning
  if (!/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(id)) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  const adminClient = createAdminClient()
  const user = await verifyAuth(request)

  let query = adminClient
    .from('posts')
    .select('*')
    .eq('id', id)

  // Non-admin users can only see published posts
  if (!user) {
    query = query.eq('status', 'published')
  }

  const { data, error } = await query.single()

  if (error || !data) {
    return NextResponse.json({ error: 'Post not found' }, { status: 404 })
  }

  return NextResponse.json({ post: data })
}

export async function PATCH(request: Request, { params }: Params) {
  const { id } = await params
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const body = await request.json()

  if (body.content_html) {
    body.reading_time_minutes = calculateReadingTime(body.content_html)
  }

  if (body.status === 'published') {
    const { data: existing } = await adminClient
      .from('posts')
      .select('status')
      .eq('id', id)
      .single()

    if (existing && existing.status !== 'published') {
      body.published_at = new Date().toISOString()
      body.publish_date = new Date().toISOString()
    }
  }

  const { data, error } = await adminClient
    .from('posts')
    .update(body)
    .eq('id', id)
    .select()
    .single()

  if (error) {
    console.error('Post update error:', error)
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }

  return NextResponse.json({ post: data })
}

export async function DELETE(request: Request, { params }: Params) {
  const { id } = await params
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const { error } = await adminClient.from('posts').delete().eq('id', id)

  if (error) {
    console.error('Post delete error:', error)
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
