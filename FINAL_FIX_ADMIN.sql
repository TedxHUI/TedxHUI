-- SIMPLIFIED FIX: Remove circular RLS policy issue
-- Run this in Supabase SQL Editor

-- Drop ALL policies on admin_users
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can insert themselves" ON admin_users;
DROP POLICY IF EXISTS "No updates to admin_users" ON admin_users;
DROP POLICY IF EXISTS "No deletes from admin_users" ON admin_users;

-- Temporarily disable RLS to allow operations
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Now manually add your admin user
-- Replace with your actual user ID from auth.users
INSERT INTO admin_users (id, email, full_name)
VALUES ('a7c6b2fc-2528-4b49-be14-810651b9dca3', 'samadoye28@gmail.com', 'Oyewole Abdul Samad')
ON CONFLICT (id) DO NOTHING;

-- Re-enable RLS with simpler policies
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Simple policy: authenticated users can read admin_users
CREATE POLICY "Authenticated users can view admin_users" 
  ON admin_users FOR SELECT 
  TO authenticated
  USING (true);

-- Simple policy: authenticated users can insert themselves
CREATE POLICY "Authenticated users can insert themselves" 
  ON admin_users FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id);
