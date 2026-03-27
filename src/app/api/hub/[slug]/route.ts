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

    // 1. Fetch the entity by slug
    const { data: entity, error: entityError } = await adminClient
      .from('entities')
      .select('*')
      .eq('slug', slug)
      .single()

    if (entityError) {
      if (entityError.code === 'PGRST116') {
        return NextResponse.json({ error: 'Entity not found' }, { status: 404 })
      }
      console.error('Hub entity fetch error:', entityError)
      return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
    }

    // 2. Fetch primary-tagged published posts
    const { data: postTags, error: postTagsError } = await adminClient
      .from('entity_tags')
      .select('post_id')
      .eq('entity_id', entity.id)
      .eq('is_primary', true)
      .not('post_id', 'is', null)

    if (postTagsError) {
      console.error('Hub post tags fetch error:', postTagsError)
      return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
    }

    const postIds = postTags
      .map((t: { post_id: string | null }) => t.post_id)
      .filter(Boolean) as string[]

    let posts: any[] = []
    if (postIds.length > 0) {
      const { data: postsData, error: postsError } = await adminClient
        .from('posts')
        .select('*')
        .in('id', postIds)
        .eq('status', 'published')
        .order('publish_date', { ascending: false })

      if (postsError) {
        console.error('Hub posts fetch error:', postsError)
        return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
      }

      posts = postsData || []
    }

    // 3. Fetch primary-tagged published ayah records
    const { data: ayahTags, error: ayahTagsError } = await adminClient
      .from('entity_tags')
      .select('ayah_record_id')
      .eq('entity_id', entity.id)
      .eq('is_primary', true)
      .not('ayah_record_id', 'is', null)

    if (ayahTagsError) {
      console.error('Hub ayah tags fetch error:', ayahTagsError)
      return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
    }

    const ayahRecordIds = ayahTags
      .map((t: { ayah_record_id: string | null }) => t.ayah_record_id)
      .filter(Boolean) as string[]

    let ayahRecords: any[] = []
    if (ayahRecordIds.length > 0) {
      const { data: ayahData, error: ayahError } = await adminClient
        .from('ayah_records')
        .select('*')
        .in('id', ayahRecordIds)
        .eq('status', 'published')
        .order('surah_number', { ascending: true })
        .order('ayah_start', { ascending: true })

      if (ayahError) {
        console.error('Hub ayah records fetch error:', ayahError)
        return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
      }

      ayahRecords = ayahData || []
    }

    // 4. Fetch related entities via co-occurrence (entities that share tags with the same posts/ayah_records)
    const allContentIds = [...postIds, ...ayahRecordIds]
    let relatedEntities: any[] = []

    if (allContentIds.length > 0) {
      // Find other entities that are primary-tagged on the same content
      const { data: coTags, error: coError } = await adminClient
        .from('entity_tags')
        .select('entity_id, entities(*)')
        .eq('is_primary', true)
        .neq('entity_id', entity.id)
        .or(
          postIds.length > 0 && ayahRecordIds.length > 0
            ? `post_id.in.(${postIds.join(',')}),ayah_record_id.in.(${ayahRecordIds.join(',')})`
            : postIds.length > 0
              ? `post_id.in.(${postIds.join(',')})`
              : `ayah_record_id.in.(${ayahRecordIds.join(',')})`
        )

      if (coError) {
        console.error('Hub related entities fetch error:', coError)
        // Non-fatal: continue without related entities
      } else if (coTags) {
        // Deduplicate and count co-occurrences, take top 10
        const entityMap = new Map<string, { entity: any; count: number }>()
        for (const tag of coTags) {
          const existing = entityMap.get(tag.entity_id)
          if (existing) {
            existing.count++
          } else {
            entityMap.set(tag.entity_id, { entity: tag.entities, count: 1 })
          }
        }

        relatedEntities = Array.from(entityMap.values())
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)
          .map((e) => e.entity)
      }
    }

    // 5. Fetch synthesis cache if it exists
    const { data: synthesis } = await adminClient
      .from('hub_synthesis_cache')
      .select('*')
      .eq('entity_id', entity.id)
      .single()

    return NextResponse.json({
      data: {
        entity,
        posts,
        ayah_records: ayahRecords,
        related_entities: relatedEntities,
        synthesis: synthesis || null,
      },
    })
  } catch (error) {
    console.error('Hub assembly error:', error)
    return NextResponse.json({ error: 'Failed to fetch hub data' }, { status: 500 })
  }
}
