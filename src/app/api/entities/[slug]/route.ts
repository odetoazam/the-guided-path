import { verifyAuth } from '@/lib/auth'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params

    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('entities')
      .select('*')
      .eq('slug', slug)
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
      }
      console.error('Entity fetch error:', error)
      return NextResponse.json({ error: 'Failed to fetch entity' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Entity fetch error:', error)
    return NextResponse.json({ error: 'Failed to fetch entity' }, { status: 500 })
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const user = await verifyAuth(request)
    if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

    const { slug } = params

    if (!slug || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return NextResponse.json({ error: 'Invalid slug format' }, { status: 400 })
    }

    const body = await request.json()

    const adminClient = createAdminClient()

    const { data, error } = await adminClient
      .from('entities')
      .update({ ...body, updated_at: new Date().toISOString() })
      .eq('slug', slug)
      .select()
      .single()

    if (error) {
      if (error.code === 'PGRST116') {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
      }
      console.error('Entity update error:', error)
      return NextResponse.json({ error: 'Failed to update entity' }, { status: 500 })
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Entity update error:', error)
    return NextResponse.json({ error: 'Failed to update entity' }, { status: 500 })
  }
}
