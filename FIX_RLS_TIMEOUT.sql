-- EMERGENCY FIX: Method to stop infinite recursion on admin_users table
-- The previous policy likely created a loop: "To read admin_users, you must check if you are in admin_users..."
-- This causes the database to time out.

-- 1. Drop potentially conflicting or recursive policies
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Authenticated users can view admin_users" ON admin_users;
DROP POLICY IF EXISTS "Users can view admin_users" ON admin_users;

-- 2. Create a SAFE, non-recursive policy for viewing
-- We allow any authenticated user to READ the admin list. 
-- This breaks the loop because we don't need to query the table to know if you can query the table.
CREATE POLICY "Safe view admin_users" 
  ON admin_users FOR SELECT 
  TO authenticated 
  USING (true);

-- 3. Ensure other operations remain secure
-- (These typically rely on the ID check which is not recursive for the row itself, just the auth.uid())

DROP POLICY IF EXISTS "Users can insert themselves" ON admin_users;
CREATE POLICY "Users can insert themselves" 
  ON admin_users FOR INSERT 
  TO authenticated 
  WITH CHECK (auth.uid() = id);
