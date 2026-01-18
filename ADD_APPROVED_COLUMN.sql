-- SIMPLE FIX: Add the approved column to admin_users
-- Run this in Supabase SQL Editor

ALTER TABLE admin_users 
ADD COLUMN approved BOOLEAN DEFAULT false;

-- Set all existing admins to approved
UPDATE admin_users 
SET approved = true;

-- Verify it worked
SELECT id, email, full_name, approved, created_at
FROM admin_users
ORDER BY created_at DESC;
