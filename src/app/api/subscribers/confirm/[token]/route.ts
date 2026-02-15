import { createAdminClient } from '@/lib/supabase/admin'
import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'

interface Params {
  params: Promise<{ token: string }>
}

export async function GET(request: Request, { params }: Params) {
  const { token } = await params
  const adminClient = createAdminClient()

  const { data: subscriber, error } = await adminClient
    .from('subscribers')
    .update({
      status: 'active',
      confirmed_at: new Date().toISOString(),
      confirmation_token: null,
    })
    .eq('confirmation_token', token)
    .eq('status', 'pending')
    .select()
    .single()

  if (error || !subscriber) {
    return NextResponse.redirect(`${SITE_URL}?subscription=invalid`)
  }

  return NextResponse.redirect(`${SITE_URL}?subscription=confirmed`)
}
