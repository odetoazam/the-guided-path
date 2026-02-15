import { createClient } from '@/lib/supabase/server'
import { createAdminClient } from '@/lib/supabase/admin'
import { resend, EMAIL_FROM } from '@/lib/email/resend'
import { NextResponse } from 'next/server'
import { SITE_URL, SITE_NAME } from '@/lib/constants'

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

  // Update post status to published
  const { data: post, error: postError } = await supabase
    .from('posts')
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
      publish_date: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single()

  if (postError || !post) {
    return NextResponse.json({ error: 'Failed to publish post' }, { status: 500 })
  }

  // Get active subscribers and send emails
  try {
    const adminClient = createAdminClient()
    const { data: subscribers } = await adminClient
      .from('subscribers')
      .select('email, name, unsubscribe_token')
      .eq('status', 'active')

    if (subscribers && subscribers.length > 0) {
      // Send emails via Resend batch API
      const emails = subscribers.map((sub) => ({
        from: EMAIL_FROM,
        to: sub.email,
        subject: `${post.title} — ${SITE_NAME}`,
        html: generateEmailHtml(post, sub),
      }))

      // Resend supports up to 100 emails per batch
      const batches = []
      for (let i = 0; i < emails.length; i += 100) {
        batches.push(emails.slice(i, i + 100))
      }

      for (const batch of batches) {
        try {
          await resend.batch.send(batch)
        } catch (emailError: any) {
          console.error('Email batch error:', emailError)
        }
      }

      // Log email send
      await adminClient.from('email_logs').insert({
        post_id: id,
        subscriber_count: subscribers.length,
        status: 'sent',
        sent_at: new Date().toISOString(),
      })

      // Mark post as email sent
      await supabase.from('posts').update({
        email_sent: true,
        email_sent_at: new Date().toISOString(),
      }).eq('id', id)
    }
  } catch (error: any) {
    console.error('Email send error:', error)
    // Don't fail the publish if email fails
  }

  return NextResponse.json({ post, emailSent: true })
}

function generateEmailHtml(post: any, subscriber: any): string {
  const unsubscribeUrl = `${SITE_URL}/api/subscribers/unsubscribe?token=${subscriber.unsubscribe_token}`
  const postUrl = `${SITE_URL}/tadabbur/${post.slug}`

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin:0;padding:0;background-color:#0a0a0a;font-family:Georgia,'Times New Roman',serif;">
      <div style="max-width:600px;margin:0 auto;padding:40px 20px;">
        <!-- Header -->
        <div style="text-align:center;margin-bottom:40px;">
          <h1 style="color:#D4AF37;font-size:24px;margin:0;">The Guided Path</h1>
          <p style="color:#71717a;font-size:14px;margin-top:8px;">Quranic Reflections</p>
        </div>

        <!-- Content -->
        <div style="background-color:#18181b;border-radius:12px;padding:32px;border:1px solid #27272a;">
          <h2 style="color:#ffffff;font-size:28px;margin:0 0 16px 0;line-height:1.3;">
            ${post.title}
          </h2>

          ${post.excerpt ? `<p style="color:#a1a1aa;font-size:16px;line-height:1.6;margin-bottom:24px;">${post.excerpt}</p>` : ''}

          <div style="color:#d4d4d8;font-size:16px;line-height:1.8;">
            ${post.content_html}
          </div>
        </div>

        <!-- CTA -->
        <div style="text-align:center;margin-top:32px;">
          <a href="${postUrl}" style="display:inline-block;background-color:#D4AF37;color:#000000;padding:12px 32px;border-radius:8px;text-decoration:none;font-weight:600;font-size:16px;">
            Read on the Web
          </a>
        </div>

        <!-- Footer -->
        <div style="text-align:center;margin-top:40px;padding-top:24px;border-top:1px solid #27272a;">
          <p style="color:#52525b;font-size:12px;margin:0;">
            You received this because you subscribed to The Guided Path.
          </p>
          <p style="margin-top:8px;">
            <a href="${unsubscribeUrl}" style="color:#71717a;font-size:12px;text-decoration:underline;">
              Unsubscribe
            </a>
          </p>
        </div>
      </div>
    </body>
    </html>
  `
}
