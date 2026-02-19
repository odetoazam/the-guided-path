import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'
import { calculateReadingTime } from '@/lib/utils'

interface Params {
  params: Promise<{ id: string }>
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params
  const adminClient = createAdminClient()

  const { data, error } = await adminClient
    .from('posts')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
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
    return NextResponse.json({ error: error.message }, { status: 500 })
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
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
