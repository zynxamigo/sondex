-- Apogee bot foundry schema (per-user)

create table if not exists bots (
  id text primary key,
  user_id text not null,
  name text not null,
  description text not null default '',
  status text not null default 'docked',
  token_cipher text,
  token_hint text,
  bot_snowflake text,
  bot_username text,
  bot_avatar text,
  published_at timestamptz,
  last_heartbeat_at timestamptz,
  uptime_ms bigint not null default 0,
  crash_count integer not null default 0,
  event_count integer not null default 0,
  stability text not null default 'unknown',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists bots_user_id_idx on bots (user_id);
create index if not exists bots_user_updated_idx on bots (user_id, updated_at desc);

create table if not exists bot_files (
  id text primary key,
  bot_id text not null,
  user_id text not null,
  path text not null,
  content text not null default '',
  kind text not null default 'js',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (bot_id, path)
);

create index if not exists bot_files_bot_id_idx on bot_files (bot_id);
create index if not exists bot_files_user_id_idx on bot_files (user_id);

create table if not exists bot_events (
  id serial primary key,
  bot_id text not null,
  user_id text not null,
  kind text not null,
  payload text not null default '',
  created_at timestamptz not null default now()
);

create index if not exists bot_events_bot_id_idx on bot_events (bot_id, id desc);
