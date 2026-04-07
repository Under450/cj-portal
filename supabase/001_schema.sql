-- ============================================================
-- CJ Portal — Database Schema
-- Run this in the Supabase SQL Editor (Dashboard > SQL > New Query)
-- ============================================================

-- Brands
CREATE TABLE IF NOT EXISTS cj_brands (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  colour text NOT NULL DEFAULT '#6b7280',
  description text DEFAULT '',
  url text DEFAULT '',
  status text DEFAULT 'dev' CHECK (status IN ('live', 'dev')),
  monthly_target int DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Revenue
CREATE TABLE IF NOT EXISTS cj_revenue (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES cj_brands(id) ON DELETE CASCADE,
  month int NOT NULL CHECK (month BETWEEN 1 AND 12),
  year int NOT NULL,
  amount decimal NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Tasks
CREATE TABLE IF NOT EXISTS cj_tasks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES cj_brands(id) ON DELETE CASCADE,
  title text NOT NULL,
  status text DEFAULT 'open' CHECK (status IN ('open', 'in-progress', 'done')),
  priority text DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  due_date date,
  pinned boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Scheduled posts
CREATE TABLE IF NOT EXISTS cj_posts_scheduled (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES cj_brands(id) ON DELETE CASCADE,
  platform text NOT NULL,
  content text DEFAULT '',
  scheduled_at timestamptz,
  status text DEFAULT 'draft'
);

-- Activity log
CREATE TABLE IF NOT EXISTS cj_activity (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  brand_id uuid REFERENCES cj_brands(id) ON DELETE CASCADE,
  description text NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Disable RLS for CJ tables (personal dashboard, single user)
ALTER TABLE cj_brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE cj_revenue ENABLE ROW LEVEL SECURITY;
ALTER TABLE cj_tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE cj_posts_scheduled ENABLE ROW LEVEL SECURITY;
ALTER TABLE cj_activity ENABLE ROW LEVEL SECURITY;

-- Allow all access with anon key (personal dashboard)
CREATE POLICY "cj_brands_all" ON cj_brands FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "cj_revenue_all" ON cj_revenue FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "cj_tasks_all" ON cj_tasks FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "cj_posts_all" ON cj_posts_scheduled FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "cj_activity_all" ON cj_activity FOR ALL USING (true) WITH CHECK (true);

-- ============================================================
-- SEED DATA
-- ============================================================

-- Brands
INSERT INTO cj_brands (name, slug, colour, description, url, status, monthly_target) VALUES
  ('Bergason', 'bergason', '#1d4ed8', 'Block management', 'https://bergasonblockmanagement.co.uk', 'live', 5000),
  ('Forward My Mail', 'forward-my-mail', '#15803d', 'Virtual addresses', 'https://forwardmymail.co.uk', 'live', 2500),
  ('Velvet App', 'velvet-app', '#7c3aed', 'Creator platform', '', 'dev', 0),
  ('Aventus Studio', 'aventus-studio', '#ea580c', 'Social scheduling', 'http://localhost:3000', 'live', 4000)
ON CONFLICT (slug) DO NOTHING;

-- April 2026 Revenue
INSERT INTO cj_revenue (brand_id, month, year, amount)
SELECT id, 4, 2026, 4200 FROM cj_brands WHERE slug = 'bergason'
UNION ALL
SELECT id, 4, 2026, 1840 FROM cj_brands WHERE slug = 'forward-my-mail'
UNION ALL
SELECT id, 4, 2026, 0 FROM cj_brands WHERE slug = 'velvet-app'
UNION ALL
SELECT id, 4, 2026, 3100 FROM cj_brands WHERE slug = 'aventus-studio';

-- Sample tasks
INSERT INTO cj_tasks (brand_id, title, status, priority, pinned)
SELECT id, 'Fix tenant portal login', 'open', 'high', true FROM cj_brands WHERE slug = 'bergason'
UNION ALL
SELECT id, 'Update pricing page', 'open', 'medium', false FROM cj_brands WHERE slug = 'forward-my-mail'
UNION ALL
SELECT id, 'Design onboarding flow', 'in-progress', 'high', true FROM cj_brands WHERE slug = 'velvet-app'
UNION ALL
SELECT id, 'Set up analytics dashboard', 'in-progress', 'medium', false FROM cj_brands WHERE slug = 'aventus-studio'
UNION ALL
SELECT id, 'Invoice automation', 'done', 'low', false FROM cj_brands WHERE slug = 'bergason'
UNION ALL
SELECT id, 'Email templates', 'done', 'medium', false FROM cj_brands WHERE slug = 'forward-my-mail';

-- Activity
INSERT INTO cj_activity (brand_id, description)
SELECT id, 'Tenant portal deployed to production' FROM cj_brands WHERE slug = 'bergason'
UNION ALL
SELECT id, 'GEO audit completed — score 72/100' FROM cj_brands WHERE slug = 'forward-my-mail'
UNION ALL
SELECT id, 'Creator dashboard wireframes approved' FROM cj_brands WHERE slug = 'velvet-app'
UNION ALL
SELECT id, 'Card generator upload feature shipped' FROM cj_brands WHERE slug = 'aventus-studio';
