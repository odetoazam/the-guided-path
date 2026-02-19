import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

interface Params {
  params: Promise<{ id: string }>
}

export async function POST(request: Request, { params }: Params) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { status } = await request.json().catch(() => ({ status: 'published' }))

  const updateData: any = { status }

  if (status === 'published') {
    // Only set published_at on first publish
    const { data: existing } = await supabase
      .from('posts')
      .select('published_at')
      .eq('id', id)
      .single()

    if (!existing?.published_at) {
      updateData.published_at = new Date().toISOString()
      updateData.publish_date = new Date().toISOString()
    }
  }

  const { data: post, error: postError } = await supabase
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
