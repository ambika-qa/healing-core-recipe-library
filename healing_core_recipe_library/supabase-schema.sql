-- Starter schema for a shared Healing Core recipe database.
-- Run this in Supabase SQL Editor when you create the project.
-- This policy intentionally allows public READ access only.
-- Add secure admin authentication/policies before enabling recipe editing from the website.

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  description text not null default '',
  categories text[] not null default '{}',
  ingredients text[] not null default '{}',
  steps text[] not null default '{}',
  prep_minutes integer,
  recipe_type text,
  image_url text,
  published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.recipes enable row level security;

drop policy if exists "Public can read published recipes" on public.recipes;
create policy "Public can read published recipes"
on public.recipes for select
using (published = true);

-- Do NOT add an unrestricted INSERT, UPDATE, or DELETE policy for anon/public users.
-- For initial testing, manage recipes through the Supabase dashboard after sign-in.
