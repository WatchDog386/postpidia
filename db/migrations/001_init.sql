-- Postpidia schema — plain PostgreSQL (14+).
-- Applied by `npm run db:migrate`, which records each file in schema_migrations.

create extension if not exists pgcrypto;  -- gen_random_uuid()
create extension if not exists citext;    -- case-insensitive emails

create or replace function set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- Users & sessions (built-in email/password auth)
-- ---------------------------------------------------------------------------
create table users (
  id            uuid primary key default gen_random_uuid(),
  email         citext not null unique check (char_length(email) between 3 and 254),
  password_hash text not null,
  full_name     text not null default '',
  company       text not null default '',
  phone         text not null default '',
  role          text not null default 'customer' check (role in ('customer', 'admin')),
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);
create trigger users_updated_at before update on users
  for each row execute function set_updated_at();

-- Only a SHA-256 of the session token is stored; the raw token lives in an httpOnly cookie.
create table sessions (
  token_hash  text primary key,
  user_id     uuid not null references users (id) on delete cascade,
  expires_at  timestamptz not null,
  created_at  timestamptz not null default now(),
  user_agent  text,
  ip          text
);
create index sessions_user_idx on sessions (user_id);
create index sessions_expires_idx on sessions (expires_at);

create table password_resets (
  token_hash  text primary key,
  user_id     uuid not null references users (id) on delete cascade,
  expires_at  timestamptz not null,
  used_at     timestamptz,
  created_at  timestamptz not null default now()
);
create index password_resets_user_idx on password_resets (user_id);

-- ---------------------------------------------------------------------------
-- Editing projects
-- ---------------------------------------------------------------------------
create table projects (
  id               uuid primary key default gen_random_uuid(),
  customer_id      uuid not null references users (id) on delete cascade,
  title            text not null check (char_length(title) between 1 and 140),
  platform         text not null default 'tiktok',
  video_type       text not null default 'product-ad',
  aspect_ratio     text not null default '9:16',
  target_length    text,
  style_notes      text check (char_length(style_notes) <= 4000),
  music_preference text check (char_length(music_preference) <= 500),
  footage_link     text check (char_length(footage_link) <= 2000),
  deadline         date,
  status           text not null default 'submitted' check (
    status in ('submitted', 'in_review', 'editing', 'delivered', 'revision_requested', 'completed', 'cancelled')
  ),
  editor_notes     text check (char_length(editor_notes) <= 4000),
  created_at       timestamptz not null default now(),
  updated_at       timestamptz not null default now()
);
create index projects_customer_idx on projects (customer_id, created_at desc);
create index projects_status_idx on projects (status, created_at desc);
create trigger projects_updated_at before update on projects
  for each row execute function set_updated_at();

-- Files live on disk under UPLOAD_DIR/<storage_key>; this table is the index.
create table project_files (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects (id) on delete cascade,
  uploaded_by  uuid references users (id) on delete set null,
  kind         text not null check (kind in ('raw', 'deliverable')),
  storage_key  text not null unique,
  file_name    text not null check (char_length(file_name) between 1 and 255),
  size_bytes   bigint not null check (size_bytes >= 0),
  mime_type    text,
  created_at   timestamptz not null default now()
);
create index project_files_project_idx on project_files (project_id, created_at);

create table project_messages (
  id           uuid primary key default gen_random_uuid(),
  project_id   uuid not null references projects (id) on delete cascade,
  author_id    uuid references users (id) on delete set null,
  body         text not null check (char_length(body) between 1 and 4000),
  from_editor  boolean not null default false,
  created_at   timestamptz not null default now()
);
create index project_messages_project_idx on project_messages (project_id, created_at);

-- ---------------------------------------------------------------------------
-- Reviews, contact form, subscriptions
-- ---------------------------------------------------------------------------
create table reviews (
  id            uuid primary key default gen_random_uuid(),
  user_id       uuid not null references users (id) on delete cascade,
  project_id    uuid references projects (id) on delete set null,
  display_name  text not null check (char_length(display_name) between 1 and 80),
  company       text check (char_length(company) <= 80),
  rating        smallint not null check (rating between 1 and 5),
  title         text check (char_length(title) <= 120),
  body          text not null check (char_length(body) between 10 and 2000),
  approved      boolean not null default false,
  created_at    timestamptz not null default now()
);
create index reviews_public_idx on reviews (created_at desc) where approved;
create index reviews_user_idx on reviews (user_id);

create table contact_messages (
  id          uuid primary key default gen_random_uuid(),
  name        text not null check (char_length(name) between 1 and 120),
  email       text not null check (char_length(email) between 3 and 254),
  phone       text check (char_length(phone) <= 40),
  subject     text check (char_length(subject) <= 200),
  message     text not null check (char_length(message) between 1 and 5000),
  handled     boolean not null default false,
  created_at  timestamptz not null default now()
);
create index contact_messages_open_idx on contact_messages (handled, created_at desc);

create table subscriptions (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references users (id) on delete set null,
  email       citext not null,
  plan        text not null,
  billing     text not null check (billing in ('monthly', 'yearly')),
  amount      integer not null check (amount >= 0),
  reference   text not null unique,
  status      text not null default 'active',
  paid_at     timestamptz not null,
  created_at  timestamptz not null default now()
);
create index subscriptions_user_idx on subscriptions (user_id);
create index subscriptions_email_idx on subscriptions (email);
