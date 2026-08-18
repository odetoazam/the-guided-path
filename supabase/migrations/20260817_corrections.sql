-- Corrections & contact submissions.
--
-- The site published corrections@ / scholars@ / press@ / hello@ / support@
-- ayahguide.com across seven pages, alongside a promise that every correction
-- from a credentialed source is reviewed within fourteen days. No inbound mail
-- was ever configured for the domain, so every one of those addresses bounced
-- and the promise could not be kept. This table is the receiving end.

create table if not exists public.corrections (
  id            uuid primary key default gen_random_uuid(),
  kind          text not null default 'correction'
                check (kind in ('correction','scholar','press','general')),
  name          text not null,
  email         text not null,
  credentials   text,                       -- claimed affiliation / ijaza / institution
  page_url      text,                       -- what they were reading
  message       text not null,
  status        text not null default 'new'
                check (status in ('new','reviewing','resolved','declined')),
  admin_notes   text,
  ip_hash       text,                       -- salted hash, for abuse triage only
  created_at    timestamptz not null default now(),
  reviewed_at   timestamptz
);

create index if not exists corrections_status_created_idx
  on public.corrections (status, created_at desc);
create index if not exists corrections_kind_idx on public.corrections (kind);

-- Submissions arrive from the public form via the service role only.
-- No anon read/write: nothing here should ever be publicly listable.
alter table public.corrections enable row level security;
