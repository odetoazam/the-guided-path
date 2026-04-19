-- ── User Reflections ───────────────────────────────────────
-- Private per-user reflection notes on posts (and surahs later).
-- Run in Supabase Studio SQL editor.

create table if not exists user_reflections (
  id           uuid primary key default uuid_generate_v4(),
  user_id      uuid not null references auth.users(id) on delete cascade,
  slug         text not null,
  content_type text not null default 'post' check (content_type in ('post', 'surah')),
  content      text not null check (char_length(content) between 1 and 5000),
  created_at   timestamptz default now(),
  updated_at   timestamptz default now(),
  unique (user_id, slug, content_type)
);

create index if not exists user_reflections_user_idx on user_reflections(user_id);
create index if not exists user_reflections_slug_idx on user_reflections(slug);

alter table user_reflections enable row level security;

create policy "users can read own reflections"
  on user_reflections for select using (auth.uid() = user_id);

create policy "users can insert own reflections"
  on user_reflections for insert with check (auth.uid() = user_id);

create policy "users can update own reflections"
  on user_reflections for update using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can delete own reflections"
  on user_reflections for delete using (auth.uid() = user_id);

-- Keep updated_at fresh on updates
create or replace function set_user_reflections_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists user_reflections_updated_at on user_reflections;
create trigger user_reflections_updated_at
  before update on user_reflections
  for each row execute function set_user_reflections_updated_at();
