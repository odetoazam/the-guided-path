import { createAdminClient } from '@/lib/supabase/admin'
import { verifyAuth } from '@/lib/auth'
import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const user = await verifyAuth(request)

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()
  const { status } = await request.json().catch(() => ({ status: 'published' }))

  const updateData: any = { status }

  if (status === 'published') {
    // Only set published_at on first publish
    const { data: existing } = await adminClient
      .from('posts')
      .select('published_at')
      .eq('id', id)
      .single()

    if (!existing?.published_at) {
      updateData.published_at = new Date().toISOString()
      updateData.publish_date = new Date().toISOString()
    }
  }

  const { data: post, error: postError } = await adminClient
    .from('posts')
    .update(updateData)
    .eq('id', id)
    .select()
    .single()

  if (postError || !post) {
    return NextResponse.json({ error: 'Failed to update post status' }, { status: 500 })
  }

  return NextResponse.json({ post })
}
