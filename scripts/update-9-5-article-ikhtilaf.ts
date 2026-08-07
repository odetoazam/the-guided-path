#!/usr/bin/env npx tsx
/**
 * update-9-5-article-ikhtilaf.ts
 *
 * Two fixes to the published 9:5 article, both surfaced by the interpretive
 * read of content/tadabbur/009-at-tawbah/ayahs-004-006.md, which the article
 * rests on.
 *
 * 1. The article never cited 9:4 — the verse that exempts the treaty partners
 *    who kept faith and orders their terms completed. That is the passage's own
 *    strongest limit on the command, and better protection against adversarial
 *    quotation than any commentary, because it needs no scholar to be believed.
 *
 * 2. Two absolutes were overstated: "The classical tradition never read this
 *    verse as an open-ended command" and "Not one major mufassir removed the
 *    field." Ibn Kathir's own edition carries Ad-Dahhak ibn Muzahim saying the
 *    verse abrogated every peace agreement, plus al-'Awfi's report from Ibn
 *    'Abbas that no idolater retained a treaty after Bara'ah. A reader who
 *    later meets that in Ibn Kathir would conclude the article had hidden it.
 *
 * The replacement names the broad position openly and then shows the limits are
 * textual rather than interpretive — 9:4 before and 9:6 after — so the argument
 * survives regardless of which side of the takhsis/naskh dispute a reader lands
 * on. All attributions are from the four editions fetched by
 * cross_reference_tafsir.mjs; 9:4's wording is verified against the Uthmani text.
 *
 * Idempotent: exits if the new text is already present.
 *
 * Run: ./node_modules/.bin/tsx --env-file=.env.local scripts/update-9-5-article-ikhtilaf.ts
 */
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const SLUG = 'quran-9-5-sword-verse-kill-the-unbelievers'

const OLD = `<p>The classical tradition never read this verse as an open-ended command. Ibn Kathīr, citing Mujāhid, Qatādah, al-Suddī and others, identifies "the sacred months" here precisely as the four-month grace period of 9:2. The central scholarly debate was only ever about <em>which</em> boundary applied — whether the verse was specified (<em>takhṣīṣ</em>) to these particular treaty-breakers, or whether it abrogated (<em>naskh</em>) certain earlier verses. The argument inside the tradition was about which fence to use. Not one major mufassir removed the field.</p>`

const NEW = `<p>Ibn Kathīr, citing Mujāhid, Qatādah, al-Suddī and others, identifies "the sacred months" here precisely as the four-month grace period of 9:2. From there the commentators divided over how far the command reached — whether it was specified (<em>takhṣīṣ</em>) to these particular treaty-breakers, or whether it abrogated (<em>naskh</em>) certain earlier verses. The broader reading was held seriously, and it is worth naming rather than skipping: Ibn Kathīr himself preserves Aḍ-Ḍaḥḥāk ibn Muzāḥim saying the verse abrogated every agreement of peace, alongside a report from Ibn ʿAbbās that no idolater retained a treaty once Barāʾah was announced.</p>

<p>That disagreement matters less than it looks, because the limits on this verse do not depend on winning it. They are in the passage itself. The verse immediately before exempts the treaty partners who kept faith — <em>so complete their treaty to their term</em> (9:4) — and both al-Ṭabarī and Ibn Kathīr stress that unbroken fixed-term agreements were honoured to their end. The verse immediately after commands asylum and safe escort for any polytheist who asks to hear the Qur'an (9:6); al-Ṭabarī records that some claimed this verse was abrogated too, and rules against them. Whichever fence a commentator chose, the field was fenced by the text on both sides.</p>`

async function main() {
  const { data: post } = await supabase
    .from('posts')
    .select('id, content_html')
    .eq('slug', SLUG)
    .single()

  if (!post) return console.error(`post ${SLUG} not found`)

  const html = post.content_html as string
  if (html.includes('Aḍ-Ḍaḥḥāk ibn Muzāḥim')) {
    return console.log('already updated — nothing to do')
  }
  if (!html.includes(OLD)) {
    return console.error('anchor paragraph not found; the article changed — re-check before running')
  }

  const { error } = await supabase
    .from('posts')
    .update({ content_html: html.replace(OLD, NEW), updated_at: new Date().toISOString() })
    .eq('id', post.id)

  console.log(error ? `update failed: ${error.message}` : '✅ 9:5 article updated (9:4 added, absolutes narrowed)')
}

main()
