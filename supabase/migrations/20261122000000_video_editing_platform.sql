-- =============================================================================
-- Postpidia — video editing platform backend
-- Run this once in the Supabase SQL editor (or `supabase db push`).
-- Safe to re-run: every statement is idempotent.
--
-- Tables
--   profiles          one row per auth user (created automatically on sign-up)
--   projects          an editing order: brief + status, owned by a customer
--   project_files     raw footage the customer uploads, and edited deliverables
--   project_messages  comment thread between customer and editor on a project
--   reviews           customer reviews (shown publicly once approved)
--   contact_messages  messages from the public contact form
--   subscriptions     paid plans (written server-side after Paystack verification)
--
-- Storage buckets (private)
--   raw-footage    {customer_id}/{project_id}/{file}
--   deliverables   {customer_id}/{project_id}/{file}
--
-- To make yourself an editor/admin after signing up:
--   update public.profiles set role = 'admin' where email = 'you@example.com';
-- =============================================================================

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------------
-- Profiles
-- ---------------------------------------------------------------------------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  full_name text,
  company text,
  phone text,
  role text not null default 'customer' check (role in ('customer', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.profiles where id = auth.uid() and role = 'admin'
  );
$$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name, company)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data ->> 'full_name', ''),
    coalesce(new.raw_user_meta_data ->> 'company', '')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users that signed up before this migration.
insert into public.profiles (id, email)
select id, email from auth.users
on conflict (id) do nothing;

-- Customers may edit their own profile but never their role.
create or replace function public.guard_profile_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role is distinct from old.role and not public.is_admin() then
    raise exception 'Only admins can change roles';
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists guard_profile_update on public.profiles;
create trigger guard_profile_update
  before update on public.profiles
  for each row execute function public.guard_profile_update();

drop policy if exists "profiles: read own or admin" on public.profiles;
create policy "profiles: read own or admin" on public.profiles
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists "profiles: update own or admin" on public.profiles;
create policy "profiles: update own or admin" on public.profiles
  for update using (id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Projects (editing orders)
-- ---------------------------------------------------------------------------
create table if not exists public.projects (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid not null references auth.users (id) on delete cascade,
  title text not null check (char_length(title) between 1 and 140),
  platform text not null default 'tiktok',
  video_type text not null default 'product-ad',
  aspect_ratio text not null default '9:16',
  target_length text,
  style_notes text,
  music_preference text,
  footage_link text,
  deadline date,
  status text not null default 'submitted' check (
    status in ('submitted', 'in_review', 'editing', 'delivered', 'revision_requested', 'completed', 'cancelled')
  ),
  editor_notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists projects_customer_idx on public.projects (customer_id, created_at desc);
create index if not exists projects_status_idx on public.projects (status);

alter table public.projects enable row level security;

-- Customers can only move a project into a few states themselves:
--   delivered -> revision_requested | completed, submitted -> cancelled.
-- Everything else (and editor_notes) is reserved for admins.
create or replace function public.guard_project_update()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    if new.customer_id is distinct from old.customer_id then
      raise exception 'Cannot reassign a project';
    end if;
    if new.editor_notes is distinct from old.editor_notes then
      raise exception 'Only editors can change editor notes';
    end if;
    if new.status is distinct from old.status and not (
      (old.status = 'delivered' and new.status in ('revision_requested', 'completed'))
      or (old.status = 'submitted' and new.status = 'cancelled')
    ) then
      raise exception 'Status change from % to % is not allowed', old.status, new.status;
    end if;
  end if;
  new.updated_at := now();
  return new;
end;
$$;

drop trigger if exists guard_project_update on public.projects;
create trigger guard_project_update
  before update on public.projects
  for each row execute function public.guard_project_update();

-- New projects always start as "submitted".
create or replace function public.guard_project_insert()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.status := 'submitted';
    new.editor_notes := null;
  end if;
  return new;
end;
$$;

drop trigger if exists guard_project_insert on public.projects;
create trigger guard_project_insert
  before insert on public.projects
  for each row execute function public.guard_project_insert();

drop policy if exists "projects: read own or admin" on public.projects;
create policy "projects: read own or admin" on public.projects
  for select using (customer_id = auth.uid() or public.is_admin());

drop policy if exists "projects: insert own" on public.projects;
create policy "projects: insert own" on public.projects
  for insert with check (customer_id = auth.uid());

drop policy if exists "projects: update own or admin" on public.projects;
create policy "projects: update own or admin" on public.projects
  for update using (customer_id = auth.uid() or public.is_admin());

drop policy if exists "projects: delete admin" on public.projects;
create policy "projects: delete admin" on public.projects
  for delete using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Project files (raw footage + deliverables)
-- ---------------------------------------------------------------------------
create table if not exists public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  uploaded_by uuid not null references auth.users (id) on delete cascade,
  kind text not null check (kind in ('raw', 'deliverable')),
  bucket text not null check (bucket in ('raw-footage', 'deliverables')),
  path text not null,
  file_name text not null,
  size_bytes bigint,
  mime_type text,
  created_at timestamptz not null default now()
);

create index if not exists project_files_project_idx on public.project_files (project_id, created_at);

alter table public.project_files enable row level security;

create or replace function public.owns_project(p_project_id uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.projects where id = p_project_id and customer_id = auth.uid()
  );
$$;

drop policy if exists "files: read own project or admin" on public.project_files;
create policy "files: read own project or admin" on public.project_files
  for select using (public.owns_project(project_id) or public.is_admin());

drop policy if exists "files: customer adds raw, admin adds any" on public.project_files;
create policy "files: customer adds raw, admin adds any" on public.project_files
  for insert with check (
    uploaded_by = auth.uid() and (
      public.is_admin()
      or (kind = 'raw' and bucket = 'raw-footage' and public.owns_project(project_id))
    )
  );

drop policy if exists "files: delete own raw or admin" on public.project_files;
create policy "files: delete own raw or admin" on public.project_files
  for delete using (
    public.is_admin() or (uploaded_by = auth.uid() and kind = 'raw')
  );

-- ---------------------------------------------------------------------------
-- Project messages (activity / comment thread)
-- ---------------------------------------------------------------------------
create table if not exists public.project_messages (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects (id) on delete cascade,
  author_id uuid not null references auth.users (id) on delete cascade,
  body text not null check (char_length(body) between 1 and 4000),
  from_editor boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists project_messages_project_idx on public.project_messages (project_id, created_at);

alter table public.project_messages enable row level security;

create or replace function public.stamp_message_author()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  new.author_id := auth.uid();
  new.from_editor := public.is_admin();
  return new;
end;
$$;

drop trigger if exists stamp_message_author on public.project_messages;
create trigger stamp_message_author
  before insert on public.project_messages
  for each row execute function public.stamp_message_author();

drop policy if exists "messages: read own project or admin" on public.project_messages;
create policy "messages: read own project or admin" on public.project_messages
  for select using (public.owns_project(project_id) or public.is_admin());

drop policy if exists "messages: post on own project or admin" on public.project_messages;
create policy "messages: post on own project or admin" on public.project_messages
  for insert with check (public.owns_project(project_id) or public.is_admin());

-- ---------------------------------------------------------------------------
-- Reviews
-- ---------------------------------------------------------------------------
create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  project_id uuid references public.projects (id) on delete set null,
  display_name text not null check (char_length(display_name) between 1 and 80),
  company text,
  rating smallint not null check (rating between 1 and 5),
  title text check (char_length(title) <= 120),
  body text not null check (char_length(body) between 10 and 2000),
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists reviews_public_idx on public.reviews (approved, created_at desc);

alter table public.reviews enable row level security;

-- Only admins can approve. Editing a review sends it back for moderation.
create or replace function public.guard_review()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if not public.is_admin() then
    new.approved := false;
    new.user_id := auth.uid();
  end if;
  return new;
end;
$$;

drop trigger if exists guard_review on public.reviews;
create trigger guard_review
  before insert or update on public.reviews
  for each row execute function public.guard_review();

drop policy if exists "reviews: public approved, own, or admin" on public.reviews;
create policy "reviews: public approved, own, or admin" on public.reviews
  for select using (approved or user_id = auth.uid() or public.is_admin());

drop policy if exists "reviews: insert own" on public.reviews;
create policy "reviews: insert own" on public.reviews
  for insert with check (user_id = auth.uid());

drop policy if exists "reviews: update own or admin" on public.reviews;
create policy "reviews: update own or admin" on public.reviews
  for update using (user_id = auth.uid() or public.is_admin());

drop policy if exists "reviews: delete own or admin" on public.reviews;
create policy "reviews: delete own or admin" on public.reviews
  for delete using (user_id = auth.uid() or public.is_admin());

-- ---------------------------------------------------------------------------
-- Contact messages
-- ---------------------------------------------------------------------------
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 1 and 120),
  email text not null check (char_length(email) between 3 and 200),
  phone text,
  subject text,
  message text not null check (char_length(message) between 1 and 5000),
  handled boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

drop policy if exists "contact: anyone can send" on public.contact_messages;
create policy "contact: anyone can send" on public.contact_messages
  for insert with check (handled = false);

drop policy if exists "contact: admin reads" on public.contact_messages;
create policy "contact: admin reads" on public.contact_messages
  for select using (public.is_admin());

drop policy if exists "contact: admin updates" on public.contact_messages;
create policy "contact: admin updates" on public.contact_messages
  for update using (public.is_admin());

-- ---------------------------------------------------------------------------
-- Subscriptions (replaces the open policies from supabase/migration.sql)
-- ---------------------------------------------------------------------------
create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  email text not null,
  plan text not null,
  billing text not null,
  amount integer not null,
  reference text not null unique,
  status text not null default 'active',
  paid_at timestamptz not null,
  created_at timestamptz default now()
);

alter table public.subscriptions add column if not exists user_id uuid references auth.users (id) on delete set null;

alter table public.subscriptions enable row level security;

-- The old policies let anyone insert fake subscriptions and read everyone's.
drop policy if exists "Anyone can insert subscriptions" on public.subscriptions;
drop policy if exists "Anyone can read subscriptions by reference" on public.subscriptions;

-- Rows are written by the server (service role, which bypasses RLS) after the
-- payment is verified with Paystack. Users can only read their own.
drop policy if exists "subscriptions: read own or admin" on public.subscriptions;
create policy "subscriptions: read own or admin" on public.subscriptions
  for select using (
    user_id = auth.uid()
    or lower(email) = lower(coalesce(auth.jwt() ->> 'email', ''))
    or public.is_admin()
  );

-- ---------------------------------------------------------------------------
-- Storage buckets + policies
-- ---------------------------------------------------------------------------
-- 5 GB per file. Note: on the Supabase Free plan the global upload limit is
-- 50 MB per file regardless of this value (raise it under Storage > Settings
-- on a paid plan). Customers can always paste a Drive/Dropbox link instead.
insert into storage.buckets (id, name, public, file_size_limit)
values
  ('raw-footage', 'raw-footage', false, 5368709120),
  ('deliverables', 'deliverables', false, 5368709120)
on conflict (id) do update set public = false, file_size_limit = excluded.file_size_limit;

drop policy if exists "raw-footage: customer uploads to own folder" on storage.objects;
create policy "raw-footage: customer uploads to own folder" on storage.objects
  for insert to authenticated
  with check (
    bucket_id = 'raw-footage'
    and (storage.foldername(name))[1] = auth.uid()::text
  );

drop policy if exists "raw-footage: read own or admin" on storage.objects;
create policy "raw-footage: read own or admin" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'raw-footage'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

drop policy if exists "raw-footage: delete own or admin" on storage.objects;
create policy "raw-footage: delete own or admin" on storage.objects
  for delete to authenticated
  using (
    bucket_id = 'raw-footage'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

drop policy if exists "deliverables: admin uploads" on storage.objects;
create policy "deliverables: admin uploads" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'deliverables' and public.is_admin());

drop policy if exists "deliverables: read own or admin" on storage.objects;
create policy "deliverables: read own or admin" on storage.objects
  for select to authenticated
  using (
    bucket_id = 'deliverables'
    and ((storage.foldername(name))[1] = auth.uid()::text or public.is_admin())
  );

drop policy if exists "deliverables: admin deletes" on storage.objects;
create policy "deliverables: admin deletes" on storage.objects
  for delete to authenticated
  using (bucket_id = 'deliverables' and public.is_admin());
