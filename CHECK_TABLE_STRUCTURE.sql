-- Run this query in Supabase SQL Editor to check if the 'approved' column exists

-- Check the structure of admin_users table
SELECT column_name, data_type, column_default, is_nullable
FROM information_schema.columns
WHERE table_name = 'admin_users'
ORDER BY ordinal_position;

-- If the column exists, view the current data
SELECT id, email, full_name, approved, created_at
FROM admin_users
ORDER BY created_at DESC;
