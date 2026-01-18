-- ============================================
-- COMPREHENSIVE BACKEND SECURITY WITH RLS
-- Ensures only APPROVED admins can access sensitive data
-- ============================================

-- Helper function to check if user is an approved admin
CREATE OR REPLACE FUNCTION is_approved_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() AND approved = true
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- TICKETS TABLE POLICIES
-- ============================================

-- Drop existing policies
DROP POLICY IF EXISTS "Public can view tickets" ON tickets;
DROP POLICY IF EXISTS "Anyone can insert tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can update tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can delete tickets" ON tickets;
DROP POLICY IF EXISTS "Approved admins can update tickets" ON tickets;
DROP POLICY IF EXISTS "Approved admins can delete tickets" ON tickets;
DROP POLICY IF EXISTS "Only approved admins can update tickets" ON tickets;
DROP POLICY IF EXISTS "Only approved admins can delete tickets" ON tickets;

-- Public can view tickets (for event info)
CREATE POLICY "Public can view tickets" 
  ON tickets FOR SELECT 
  USING (true);

-- Anyone can insert tickets (for registration)
CREATE POLICY "Anyone can insert tickets" 
  ON tickets FOR INSERT 
  WITH CHECK (true);

-- Only APPROVED admins can update tickets
CREATE POLICY "Only approved admins can update tickets" 
  ON tickets FOR UPDATE 
  USING (is_approved_admin());

-- Only APPROVED admins can delete tickets
CREATE POLICY "Only approved admins can delete tickets" 
  ON tickets FOR DELETE 
  USING (is_approved_admin());

-- ============================================
-- MERCHANDISE TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Public can view merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can insert merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can update merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can delete merchandise" ON merchandise;
DROP POLICY IF EXISTS "Approved admins can insert merchandise" ON merchandise;
DROP POLICY IF EXISTS "Approved admins can update merchandise" ON merchandise;
DROP POLICY IF EXISTS "Approved admins can delete merchandise" ON merchandise;
DROP POLICY IF EXISTS "Only approved admins can insert merchandise" ON merchandise;
DROP POLICY IF EXISTS "Only approved admins can update merchandise" ON merchandise;
DROP POLICY IF EXISTS "Only approved admins can delete merchandise" ON merchandise;

-- Public can view merchandise
CREATE POLICY "Public can view merchandise" 
  ON merchandise FOR SELECT 
  USING (true);

-- Only APPROVED admins can insert merchandise
CREATE POLICY "Only approved admins can insert merchandise" 
  ON merchandise FOR INSERT 
  WITH CHECK (is_approved_admin());

-- Only APPROVED admins can update merchandise
CREATE POLICY "Only approved admins can update merchandise" 
  ON merchandise FOR UPDATE 
  USING (is_approved_admin());

-- Only APPROVED admins can delete merchandise
CREATE POLICY "Only approved admins can delete merchandise" 
  ON merchandise FOR DELETE 
  USING (is_approved_admin());

-- ============================================
-- ORDERS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Public can insert orders" ON orders;
DROP POLICY IF EXISTS "Admins can view orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;
DROP POLICY IF EXISTS "Approved admins can view orders" ON orders;
DROP POLICY IF EXISTS "Approved admins can update orders" ON orders;
DROP POLICY IF EXISTS "Only approved admins can view orders" ON orders;
DROP POLICY IF EXISTS "Only approved admins can update orders" ON orders;

-- Public can insert orders (for purchases)
CREATE POLICY "Public can insert orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

-- Only APPROVED admins can view all orders
CREATE POLICY "Only approved admins can view orders" 
  ON orders FOR SELECT 
  USING (is_approved_admin());

-- Only APPROVED admins can update orders
CREATE POLICY "Only approved admins can update orders" 
  ON orders FOR UPDATE 
  USING (is_approved_admin());

-- ============================================
-- NOTIFICATIONS TABLE POLICIES
-- ============================================

DROP POLICY IF EXISTS "Admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view notifications" ON notifications;
DROP POLICY IF EXISTS "Approved admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Approved admins can view notifications" ON notifications;
DROP POLICY IF EXISTS "Only approved admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Only approved admins can view notifications" ON notifications;

-- Only APPROVED admins can insert notifications
CREATE POLICY "Only approved admins can insert notifications" 
  ON notifications FOR INSERT 
  WITH CHECK (is_approved_admin());

-- Only APPROVED admins can view all notifications
CREATE POLICY "Only approved admins can view notifications" 
  ON notifications FOR SELECT 
  USING (is_approved_admin());

-- ============================================
-- ADMIN_USERS TABLE POLICIES (Already set)
-- ============================================
-- These were set in previous scripts:
-- - Authenticated users can read (for login checks)
-- - Users can insert themselves (unapproved by default)
-- - Only approved admins can update (for approving others)
-- - No one can delete

-- ============================================
-- VERIFICATION
-- ============================================
-- Run this to verify all policies are in place:
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual
FROM pg_policies
WHERE tablename IN ('tickets', 'merchandise', 'orders', 'notifications', 'admin_users')
ORDER BY tablename, policyname;

-- ============================================
-- SECURITY COMPLETE!
-- ============================================
-- Now only APPROVED admins can:
-- - Manage tickets (update/delete)
-- - Manage merchandise (create/update/delete)
-- - View and manage orders
-- - Send notifications
-- 
-- Unapproved admins and public users CANNOT access admin functions!
-- ============================================
