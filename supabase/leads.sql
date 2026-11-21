-- LTS website: table for contact-form and quote-form enquiries.
-- Run once in Supabase → SQL Editor → New query → paste → Run.

create table if not exists public.leads (
  id            bigint generated always as identity primary key,
  created_at    timestamptz not null default now(),
  kind          text not null check (kind in ('contact', 'quote', 'audit')),
  name          text not null,
  phone         text not null,
  email         text,
  service       text,
  business_type text,
  budget        text,
  timeline      text,
  message       text,
  page          text,          -- page the form was sent from, e.g. /contact
  source        text not null default 'website',
  user_agent    text,
  status        text not null default 'new' check (status in ('new', 'contacted', 'quoted', 'won', 'lost')),
  notes         text           -- for your team's follow-up notes
);

create index if not exists leads_created_at_idx on public.leads (created_at desc);
create index if not exists leads_status_idx on public.leads (status);

-- Lock the table: with RLS on and no policies, the public (anon) key can't read or write it.
-- The website writes with the secret service-role key from the server only.
alter table public.leads enable row level security;

-- Already ran an older version of this file? Run this once to allow AI-audit requests:
-- alter table public.leads drop constraint if exists leads_kind_check;
-- alter table public.leads add constraint leads_kind_check check (kind in ('contact', 'quote', 'audit'));


-- Newsletter signups from the footer form.
create table if not exists public.subscribers (
  id          bigint generated always as identity primary key,
  created_at  timestamptz not null default now(),
  email       text not null unique,   -- stored in lowercase
  page        text,                   -- page they signed up on
  source      text not null default 'newsletter',  -- 'newsletter' or 'checklist:<industry>'
  user_agent  text,
  unsubscribed boolean not null default false
);
alter table public.subscribers enable row level security;

-- Already created `subscribers` earlier? Run this once to add the source column:
-- alter table public.subscribers add column if not exists source text not null default 'newsletter';
