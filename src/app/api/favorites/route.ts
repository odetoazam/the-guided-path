import { createClient } from '@/lib/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { slug, type = 'post' } = await request.json()
  if (!slug || typeof slug !== 'string') {
    return NextResponse.json({ error: 'slug required' }, { status: 400 })
  }
  if (type !== 'post' && type !== 'surah') {
    return NextResponse.json({ error: 'type must be post or surah' }, { status: 400 })
  }

  const { error } = await supabase
    .from('user_favorites')
    .upsert(
      { user_id: user.id, slug, content_type: type },
      { onConflict: 'user_id,slug,content_type' }
    )

  if (error) {
    console.error('favorites upsert error:', error)
    return NextResponse.json({ error: 'Failed to save favorite' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
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
    .from('user_favorites')
    .delete()
    .eq('user_id', user.id)
    .eq('slug', slug)
    .eq('content_type', type)

  if (error) {
    console.error('favorites delete error:', error)
    return NextResponse.json({ error: 'Failed to remove favorite' }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
