import { createAdminClient } from '@/lib/supabase/admin'
import { getResend } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL } from '@/lib/constants'
import { getPostHogClient } from '@/lib/posthog-server'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const token = searchParams.get('token')

  if (!token) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribe=invalid`)
  }

  const adminClient = createAdminClient()

  const { data: subscriber, error } = await adminClient
    .from('subscribers')
    .update({
      status: 'unsubscribed',
      unsubscribed_at: new Date().toISOString(),
    })
    .eq('unsubscribe_token', token)
    .select('email')
    .single()

  if (error) {
    return NextResponse.redirect(`${SITE_URL}?unsubscribe=error`)
  }

  // Mark as unsubscribed in Resend contacts
  if (subscriber?.email) {
    try {
      await getResend().contacts.update({
        email: subscriber.email,
        unsubscribed: true,
      })
    } catch (contactError) {
      console.error('Resend contact unsubscribe error:', contactError)
    }
  }

  // Track unsubscribe server-side
  if (subscriber?.email) {
    const phServer = getPostHogClient()
    phServer.capture({
      distinctId: subscriber.email,
      event: 'user_unsubscribed',
    })
    await phServer.shutdown()
  }

  return NextResponse.redirect(`${SITE_URL}?unsubscribe=success`)
}
