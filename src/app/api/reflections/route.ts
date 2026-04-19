import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

const MAX_LEN = 5000

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, type = 'post', content } = await request.json()
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'slug required' }, { status: 400 })
  }
  if (type !== 'post' && type !== 'surah') {
    return NextResponse.json({ error: 'type must be post or surah' }, { status: 400 })
  }
  if (typeof content !== 'string') {
    return NextResponse.json({ error: 'content required' }, { status: 400 })
  }
  const trimmed = content.trim()
  if (trimmed.length === 0) {
    return NextResponse.json({ error: 'content cannot be empty' }, { status: 400 })
  }
  if (trimmed.length > MAX_LEN) {
    return NextResponse.json({ error: `content exceeds ${MAX_LEN} characters` }, { status: 400 })
  }

  const { data, error } = await supabase
    .from('user_reflections')
    .upsert(
      { user_id: user.id, slug, content_type: type, content: trimmed },
      { onConflict: 'user_id,slug,content_type' }
    )
    .select('content, updated_at')
    .single()

  if (error) {
    console.error('reflections upsert error:', error)
    return NextResponse.json({ error: 'Failed to save reflection' }, { status: 500 })
  }

  return NextResponse.json({ success: true, reflection: data })
}

export async function DELETE(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, type = 'post' } = await request.json()
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'slug required' }, { status: 400 })
  }

  const { error } = await supabase
    .from('user_reflections')
    .delete()
    .eq('user_id', user.id)
    .eq('slug', slug)
    .eq('content_type', type)

  if (error) {
    console.error('reflections delete error:', error)
    return NextResponse.json({ error: 'Failed to delete reflection' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
