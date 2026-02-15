import { createAdminClient } from '@/lib/supabase/admin'
import { resend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const adminClient = createAdminClient()

  // Find scheduled posts that should be published
  const { data: scheduledPosts } = await adminClient
    .from('posts')
    .select('*')
    .eq('status', 'scheduled')
    .lte('scheduled_date', new Date().toISOString())

  if (!scheduledPosts || scheduledPosts.length === 0) {
    return NextResponse.json({ message: 'No posts to publish' })
  }

  const results = []

  for (const post of scheduledPosts) {
    // Publish the post
    await adminClient
      .from('posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString(),
        publish_date: new Date().toISOString(),
      })
      .eq('id', post.id)

    // Send emails to subscribers
    const { data: subscribers } = await adminClient
      .from('subscribers')
      .select('email, unsubscribe_token')
      .eq('status', 'active')

    if (subscribers && subscribers.length > 0) {
      const emails = subscribers.map((sub) => ({
        from: EMAIL_FROM,
        to: sub.email,
        subject: `${post.title} — ${SITE_NAME}`,
        html: `
          <div style="max-width:600px;margin:0 auto;padding:40px 20px;background-color:#0a0a0a;font-family:Georgia,serif;">
            <h1 style="color:#D4AF37;text-align:center;">${SITE_NAME}</h1>
            <div style="background-color:#18181b;border-radius:12px;padding:32px;border:1px solid #27272a;margin-top:24px;">
              <h2 style="color:#fff;">${post.title}</h2>
              <div style="color:#d4d4d8;line-height:1.8;">${post.content_html}</div>
            </div>
            <p style="text-align:center;margin-top:32px;">
              <a href="${SITE_URL}/tadabbur/${post.slug}" style="background-color:#D4AF37;color:#000;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;">Read on the Web</a>
            </p>
            <p style="text-align:center;color:#52525b;font-size:12px;margin-top:32px;">
              <a href="${SITE_URL}/api/subscribers/unsubscribe?token=${sub.unsubscribe_token}" style="color:#71717a;text-decoration:underline;">Unsubscribe</a>
            </p>
          </div>
        `,
      }))

      try {
        for (let i = 0; i < emails.length; i += 100) {
          await resend.batch.send(emails.slice(i, i + 100))
        }
      } catch (error) {
        console.error('Cron email error:', error)
      }

      await adminClient.from('email_logs').insert({
        post_id: post.id,
        subscriber_count: subscribers.length,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })

      await adminClient.from('posts').update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      }).eq('id', post.id)
    }

    results.push({ id: post.id, title: post.title })
  }

  return NextResponse.json({ published: results })
}
