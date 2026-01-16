-- ============================================
-- Bilingual Blog Posts Migration
-- Run this in your Supabase SQL Editor
-- ============================================

-- Step 1: Add new bilingual columns
ALTER TABLE posts 
ADD COLUMN IF NOT EXISTS title_en TEXT,
ADD COLUMN IF NOT EXISTS title_ar TEXT,
ADD COLUMN IF NOT EXISTS description_en TEXT,
ADD COLUMN IF NOT EXISTS description_ar TEXT,
ADD COLUMN IF NOT EXISTS content_en JSONB,
ADD COLUMN IF NOT EXISTS content_ar JSONB;

-- Step 2: Migrate existing data to English columns
UPDATE posts 
SET 
  title_en = title,
  description_en = description,
  content_en = content,
  title_ar = title || ' (عربي)',
  description_ar = description,
  content_ar = content
WHERE title_en IS NULL;

-- Step 3: Verify migration
SELECT 
  id,
  title_en,
  title_ar,
  slug,
  published,
  created_at
FROM posts
ORDER BY created_at DESC
LIMIT 5;

-- ============================================
-- Optional: After confirming everything works
-- ============================================
-- You can drop old columns later (be careful!)
-- ALTER TABLE posts DROP COLUMN IF EXISTS title;
-- ALTER TABLE posts DROP COLUMN IF EXISTS description;
-- ALTER TABLE posts DROP COLUMN IF EXISTS content;
