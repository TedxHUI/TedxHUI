-- ============================================
-- ADD APPROVAL SYSTEM TO ADMIN_USERS
-- Run this in Supabase SQL Editor
-- ============================================

-- 1. Add approved column to admin_users table
ALTER TABLE admin_users ADD COLUMN IF NOT EXISTS approved BOOLEAN DEFAULT false;

-- 2. Set all existing admins to approved (so they don't lose access)
UPDATE admin_users SET approved = true;

-- 3. Update RLS policies to check approval status

-- Drop existing policies
DROP POLICY IF EXISTS "Authenticated users can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can insert themselves" ON admin_users;

-- Allow authenticated users to view admin_users (for checking approval status)
CREATE POLICY "Authenticated users can view admin_users" 
  ON admin_users FOR SELECT 
  TO authenticated
  USING (true);

-- Allow authenticated users to insert themselves (but as unapproved by default)
CREATE POLICY "Authenticated users can insert themselves" 
  ON admin_users FOR INSERT 
  TO authenticated
  WITH CHECK (auth.uid() = id AND approved = false);

-- Only approved admins can update admin_users (for approving others)
CREATE POLICY "Approved admins can update admin_users" 
  ON admin_users FOR UPDATE 
  TO authenticated
  USING (
    auth.uid() IN (SELECT id FROM admin_users WHERE approved = true)
  );

-- Prevent deletes for security
CREATE POLICY "No deletes from admin_users" 
  ON admin_users FOR DELETE 
  USING (false);

-- ============================================
-- 4. Update other table policies to check approval
-- ============================================

-- Helper function to check if user is approved admin
CREATE OR REPLACE FUNCTION is_approved_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = user_id AND approved = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Update tickets policies
DROP POLICY IF EXISTS "Admins can update tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can delete tickets" ON tickets;

CREATE POLICY "Approved admins can update tickets" 
  ON tickets FOR UPDATE 
  USING (is_approved_admin(auth.uid()));

CREATE POLICY "Approved admins can delete tickets" 
  ON tickets FOR DELETE 
  USING (is_approved_admin(auth.uid()));

-- Update merchandise policies
DROP POLICY IF EXISTS "Admins can insert merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can update merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can delete merchandise" ON merchandise;

CREATE POLICY "Approved admins can insert merchandise" 
  ON merchandise FOR INSERT 
  WITH CHECK (is_approved_admin(auth.uid()));

CREATE POLICY "Approved admins can update merchandise" 
  ON merchandise FOR UPDATE 
  USING (is_approved_admin(auth.uid()));

CREATE POLICY "Approved admins can delete merchandise" 
  ON merchandise FOR DELETE 
  USING (is_approved_admin(auth.uid()));

-- Update orders policies
DROP POLICY IF EXISTS "Admins can view orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

CREATE POLICY "Approved admins can view orders" 
  ON orders FOR SELECT 
  USING (is_approved_admin(auth.uid()));

CREATE POLICY "Approved admins can update orders" 
  ON orders FOR UPDATE 
  USING (is_approved_admin(auth.uid()));

-- Update notifications policies
DROP POLICY IF EXISTS "Admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view notifications" ON notifications;

CREATE POLICY "Approved admins can insert notifications" 
  ON notifications FOR INSERT 
  WITH CHECK (is_approved_admin(auth.uid()));

CREATE POLICY "Approved admins can view notifications" 
  ON notifications FOR SELECT 
  USING (is_approved_admin(auth.uid()));

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- All existing admins are now approved.
-- New signups will be unapproved by default.
-- Only approved admins can access admin features.
-- ============================================
