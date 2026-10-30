-- TipTap × BHT — baza podataka (Supabase, regija EU/Frankfurt)
-- Pokrenuti JEDNOM: Supabase → SQL Editor → New query → zalijepi sve → Run.
-- Jedna tablica ključ → vrijednost (kao u demu): rezervacije, gosti, pozivi sa stolova,
-- cjenik, poruke upravi, statistika… Pristup ima samo server (service role ključ).

create table if not exists public.tt_kv (
  k          text primary key,
  v          jsonb not null,
  etag       text not null,
  updated_at timestamptz not null default now()
);

-- sigurnost: nitko izvana (ni s javnim "anon" ključem) ne može čitati ni pisati
alter table public.tt_kv enable row level security;
revoke all on public.tt_kv from anon, authenticated;
