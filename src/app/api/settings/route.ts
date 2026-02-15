import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'

export async function GET() {
  try {
    const adminClient = createAdminClient()
    const { data, error } = await adminClient
      .from('settings')
      .select('*')

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 })
    }

    const settings: Record<string, any> = {}
    data?.forEach((s) => { settings[s.key] = s.value })

    return NextResponse.json({ settings })
  } catch {
    return NextResponse.json({ settings: {} })
  }
}

export async function PATCH(request: Request) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { key, value } = await request.json()
  const adminClient = createAdminClient()

  const { error } = await adminClient
    .from('settings')
    .upsert({ key, value, updated_by: user.id }, { onConflict: 'key' })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
