-- ── Progress v2: add content_type, rename post_slug → slug ───
-- Run in Supabase Studio SQL editor AFTER 20260411_user_data.sql

-- ── user_progress ──────────────────────────────────────────

alter table user_progress
  add column if not exists content_type text not null default 'post'
  check (content_type in ('post', 'surah'));

alter table user_progress rename column post_slug to slug;

alter table user_progress
  drop constraint if exists user_progress_user_id_post_slug_key;

alter table user_progress
  add constraint user_progress_user_slug_type_key
  unique (user_id, slug, content_type);

-- ── user_favorites ─────────────────────────────────────────

alter table user_favorites
  add column if not exists content_type text not null default 'post'
  check (content_type in ('post', 'surah'));

alter table user_favorites rename column post_slug to slug;

alter table user_favorites
  drop constraint if exists user_favorites_user_id_post_slug_key;

alter table user_favorites
  add constraint user_favorites_user_slug_type_key
  unique (user_id, slug, content_type);
