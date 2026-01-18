-- ============================================
-- COMPLETE ADMIN APPROVAL SYSTEM SETUP
-- Run this ONCE in Supabase SQL Editor
-- ============================================

-- 1. Add approved column if it doesn't exist
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'admin_users' AND column_name = 'approved'
    ) THEN
        ALTER TABLE admin_users ADD COLUMN approved BOOLEAN DEFAULT false;
    END IF;
END $$;

-- 2. Set all existing admins to approved
UPDATE admin_users SET approved = true WHERE approved IS NULL OR approved = false;

-- 3. Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Safe view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can insert themselves" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can insert themselves" ON admin_users;
DROP POLICY IF EXISTS "Approved admins can update admin_users" ON admin_users;
DROP POLICY IF EXISTS "No updates to admin_users" ON admin_users;
DROP POLICY IF EXISTS "No deletes from admin_users" ON admin_users;

-- 4. Create simple, non-recursive policies
-- Allow any authenticated user to READ (breaks recursion loop)
CREATE POLICY "Allow authenticated read" 
  ON admin_users FOR SELECT 
  TO authenticated 
  USING (true);

-- Allow users to insert themselves (unapproved by default)
CREATE POLICY "Allow self insert" 
  ON admin_users FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);

-- Allow approved admins to update (for approving others)
CREATE POLICY "Allow approved admin update" 
  ON admin_users FOR UPDATE 
  TO authenticated 
  USING (
    EXISTS (
      SELECT 1 FROM admin_users 
      WHERE id = auth.uid() AND approved = true
    )
  );

-- Prevent deletes for security
CREATE POLICY "Prevent deletes" 
  ON admin_users FOR DELETE 
  USING (false);

-- ============================================
-- DONE! Your admin approval system is ready.
-- ============================================
