-- ============================================================================
-- ADOPTD Christian Clothing - Supabase Orders & Order Items Schema Migration
-- ============================================================================
-- Run this SQL in your Supabase Dashboard -> SQL Editor to create the
-- `orders` and `order_items` tables with full support for order details,
-- customer details, UK/international delivery addresses, product options
-- (design, variant, size, colour, quantity, price, personalisation, artwork),
-- and idempotent email notification tracking.
-- ============================================================================

create table if not exists public.orders (
  id bigint generated always as identity primary key,
  order_number text not null unique,
  stripe_payment_id text not null unique,
  order_date timestamptz not null default now(),
  payment_status text not null default 'Paid',
  payment_method text not null default 'Card',
  subtotal numeric(10, 2) not null default 0.00,
  shipping_cost numeric(10, 2) not null default 3.95,
  total_amount numeric(10, 2) not null,
  currency text not null default 'GBP',
  customer_name text not null,
  customer_email text not null,
  customer_phone text,
  address_line1 text,
  address_line2 text,
  town_city text,
  county text,
  postcode text,
  country text,
  shipping_address jsonb not null default '{}'::jsonb,
  items jsonb not null default '[]'::jsonb,
  email_notification_sent boolean not null default false,
  email_notification_sent_at timestamptz,
  fulfillment_status text not null default 'unfulfilled',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id bigint generated always as identity primary key,
  order_id bigint not null references public.orders(id) on delete cascade,
  order_number text not null,
  product_id text,
  product_name text not null,
  product_design text,
  product_variant text,
  size text,
  colour text,
  quantity integer not null default 1 check (quantity > 0),
  unit_price numeric(10, 2) not null,
  line_total numeric(10, 2) not null,
  personalised_text text,
  uploaded_artwork_url text,
  image_url text,
  created_at timestamptz not null default now()
);

-- Indexes for fast lookups and foreign-key joins
create index if not exists idx_orders_stripe_payment_id on public.orders(stripe_payment_id);
create index if not exists idx_orders_order_number on public.orders(order_number);
create index if not exists idx_orders_customer_email on public.orders(customer_email);
create index if not exists idx_orders_created_at on public.orders(created_at desc);
create index if not exists idx_order_items_order_id on public.order_items(order_id);
create index if not exists idx_order_items_order_number on public.order_items(order_number);

-- Enable Row Level Security (RLS) so customer order data is never publicly readable
alter table public.orders enable row level security;
alter table public.order_items enable row level security;

-- Note: Server-side API routes using SUPABASE_SERVICE_ROLE_KEY bypass RLS automatically.
