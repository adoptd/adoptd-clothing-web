-- ============================================================================
-- ADOPTD Christian Clothing - Supabase Blog Comments & Replies Migration
-- ============================================================================
-- Run this SQL in your Supabase Dashboard -> SQL Editor to create the
-- `blog_comments` table so you can view, moderate, and reply to comments
-- left on your blog posts (both on the website and in Supabase Table Editor).
-- ============================================================================

create table if not exists public.blog_comments (
  id bigint generated always as identity primary key,
  blog_slug text not null,
  blog_title text not null,
  name text not null,
  email text,
  comment text not null,
  status text not null default 'Approved',
  parent_id bigint references public.blog_comments(id) on delete cascade,
  is_author_reply boolean not null default false,
  admin_reply text,
  admin_reply_at timestamptz,
  created_at timestamptz not null default now()
);

create index if not exists idx_blog_comments_slug on public.blog_comments(blog_slug);
create index if not exists idx_blog_comments_parent_id on public.blog_comments(parent_id);
create index if not exists idx_blog_comments_created_at on public.blog_comments(created_at asc);

alter table public.blog_comments enable row level security;

-- Allow reading approved comments on the website
drop policy if exists "Public can read approved blog comments" on public.blog_comments;
create policy "Public can read approved blog comments"
  on public.blog_comments
  for select
  to anon, authenticated
  using (status = 'Approved');

-- Allow website visitors and server routes to submit comments and replies
drop policy if exists "Anyone can insert blog comments" on public.blog_comments;
create policy "Anyone can insert blog comments"
  on public.blog_comments
  for insert
  to anon, authenticated
  with check (true);

-- Allow server routes to update admin_reply / status on blog comments
drop policy if exists "Allow updates to blog comments" on public.blog_comments;
create policy "Allow updates to blog comments"
  on public.blog_comments
  for update
  to anon, authenticated
  using (true)
  with check (true);

-- Allow server routes to delete spam comments
drop policy if exists "Allow deleting blog comments" on public.blog_comments;
create policy "Allow deleting blog comments"
  on public.blog_comments
  for delete
  to anon, authenticated
  using (true);

-- Also ensure server routes can insert orders and order_items even if only anon key is set
drop policy if exists "Allow server order inserts" on public.orders;
create policy "Allow server order inserts"
  on public.orders
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow server order updates" on public.orders;
create policy "Allow server order updates"
  on public.orders
  for update
  to anon, authenticated
  using (true)
  with check (true);

drop policy if exists "Allow server order selects" on public.orders;
create policy "Allow server order selects"
  on public.orders
  for select
  to anon, authenticated
  using (true);

drop policy if exists "Allow server order item inserts" on public.order_items;
create policy "Allow server order item inserts"
  on public.order_items
  for insert
  to anon, authenticated
  with check (true);

drop policy if exists "Allow server order item selects" on public.order_items;
create policy "Allow server order item selects"
  on public.order_items
  for select
  to anon, authenticated
  using (true);
