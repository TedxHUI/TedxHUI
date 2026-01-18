-- FIX: Allow users to insert themselves into admin_users during signup
-- Run this in Supabase SQL Editor

-- Drop the existing restrictive policy
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;

-- Allow users to view admin_users (for admin check)
CREATE POLICY "Admins can view admin_users" 
  ON admin_users FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- CRITICAL FIX: Allow authenticated users to insert themselves
CREATE POLICY "Users can insert themselves" 
  ON admin_users FOR INSERT 
  WITH CHECK (auth.uid() = id);

-- Prevent updates and deletes for security
CREATE POLICY "No updates to admin_users" 
  ON admin_users FOR UPDATE 
  USING (false);

CREATE POLICY "No deletes from admin_users" 
  ON admin_users FOR DELETE 
  USING (false);
