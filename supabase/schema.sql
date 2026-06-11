-- ============================================================
-- Ballistic Range Game — leaderboard schema
-- Run this once in your Supabase project: SQL Editor → New query
-- → paste → Run.
-- ============================================================

create table public.scores (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 18),
  score       integer not null check (score between 0 and 1300),
  hits        integer not null check (hits between 0 and 10),
  month       text not null check (month ~ '^\d{4}-\d{2}$'),  -- e.g. '2026-06' (monthly season)
  caliber     text,
  created_at  timestamptz not null default now()
);

-- fast top-10 + rank queries per season
create index scores_month_score_idx on public.scores (month, score desc, created_at asc);

-- open read + open insert (casual game, no auth, no updates/deletes from clients)
alter table public.scores enable row level security;
create policy "anyone can read scores"    on public.scores for select using (true);
create policy "anyone can submit a score" on public.scores for insert with check (true);
