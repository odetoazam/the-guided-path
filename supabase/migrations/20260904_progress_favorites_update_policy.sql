-- ── Missing UPDATE policy on user_progress / user_favorites ─────────────
-- Run in Supabase Studio SQL editor
--
-- Both tables only ever had select/insert/delete policies (20260411_user_data.sql).
-- Both API routes upsert with onConflict, which Postgres executes as
-- INSERT ... ON CONFLICT DO UPDATE — so the INSERT path (first touch) always
-- worked, and every subsequent touch of the same row hit RLS error 42501
-- ("new row violates row-level security policy (USING expression)") because
-- no UPDATE policy existed to evaluate. Confirmed live in Vercel runtime logs:
-- first occurrence 2026-07-27, still recurring as of 2026-09-02. Additive and
-- safe to re-run.

create policy "users can update own progress"
  on user_progress for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create policy "users can update own favorites"
  on user_favorites for update
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);
