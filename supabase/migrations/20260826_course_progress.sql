-- ── Courses launch: allow 'course' as a content_type ─────────────────────────
-- Course module progress rows use slug = '<course>/<module>' e.g. 'dawud/module-3'

alter table user_progress drop constraint if exists user_progress_content_type_check;
alter table user_progress add constraint user_progress_content_type_check
  check (content_type in ('post', 'surah', 'course'));

alter table user_favorites drop constraint if exists user_favorites_content_type_check;
alter table user_favorites add constraint user_favorites_content_type_check
  check (content_type in ('post', 'surah', 'course'));
