create extension if not exists pgcrypto;

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  service text not null,
  message text not null,
  status text not null default 'new',
  source text not null default 'landing'
);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  email text not null unique,
  status text not null default 'active',
  source text not null default 'landing'
);

alter table public.contact_submissions enable row level security;
alter table public.newsletter_subscriptions enable row level security;

revoke all on public.contact_submissions from anon, authenticated;
revoke all on public.newsletter_subscriptions from anon, authenticated;
