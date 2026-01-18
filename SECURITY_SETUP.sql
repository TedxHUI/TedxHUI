-- ============================================
-- SECURITY SETUP FOR TEDXHUI (FIXED VERSION)
-- Run this script in Supabase SQL Editor
-- ============================================

-- 1. Create admin_users table
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop existing policy if it exists
DROP POLICY IF EXISTS "Admins can view admin_users" ON admin_users;

-- Only admins can see admin_users table
CREATE POLICY "Admins can view admin_users" 
  ON admin_users FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- 2. UPDATE RLS POLICIES FOR SECURITY
-- ============================================

-- Drop ALL existing policies (both old and new names)
DROP POLICY IF EXISTS "Allow public select on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow public insert on tickets" ON tickets;
DROP POLICY IF EXISTS "Allow public update on tickets" ON tickets;
DROP POLICY IF EXISTS "Public can view tickets" ON tickets;
DROP POLICY IF EXISTS "Public can register tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can update tickets" ON tickets;
DROP POLICY IF EXISTS "Admins can delete tickets" ON tickets;

DROP POLICY IF EXISTS "Allow public select on merchandise" ON merchandise;
DROP POLICY IF EXISTS "Allow public insert on merchandise" ON merchandise;
DROP POLICY IF EXISTS "Allow public update on merchandise" ON merchandise;
DROP POLICY IF EXISTS "Allow public delete on merchandise" ON merchandise;
DROP POLICY IF EXISTS "Public can view merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can insert merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can update merchandise" ON merchandise;
DROP POLICY IF EXISTS "Admins can delete merchandise" ON merchandise;

DROP POLICY IF EXISTS "Allow public insert on orders" ON orders;
DROP POLICY IF EXISTS "Allow public select on orders" ON orders;
DROP POLICY IF EXISTS "Public can create orders" ON orders;
DROP POLICY IF EXISTS "Admins can view orders" ON orders;
DROP POLICY IF EXISTS "Admins can update orders" ON orders;

DROP POLICY IF EXISTS "Allow public insert on notifications" ON notifications;
DROP POLICY IF EXISTS "Allow public select on notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can insert notifications" ON notifications;
DROP POLICY IF EXISTS "Admins can view notifications" ON notifications;

-- ============================================
-- TICKETS TABLE - Public can register, admins can manage
-- ============================================

-- Public can view all tickets
CREATE POLICY "Public can view tickets" 
  ON tickets FOR SELECT 
  USING (true);

-- Public can register tickets (for ticket booking)
CREATE POLICY "Public can register tickets" 
  ON tickets FOR INSERT 
  WITH CHECK (true);

-- Only admins can update tickets
CREATE POLICY "Admins can update tickets" 
  ON tickets FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Only admins can delete tickets
CREATE POLICY "Admins can delete tickets" 
  ON tickets FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- MERCHANDISE TABLE - Public can view, admins can manage
-- ============================================

-- Public can view merchandise
CREATE POLICY "Public can view merchandise" 
  ON merchandise FOR SELECT 
  USING (true);

-- Only admins can add merchandise
CREATE POLICY "Admins can insert merchandise" 
  ON merchandise FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- Only admins can update merchandise
CREATE POLICY "Admins can update merchandise" 
  ON merchandise FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Only admins can delete merchandise
CREATE POLICY "Admins can delete merchandise" 
  ON merchandise FOR DELETE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- ORDERS TABLE - Public can create, admins can view
-- ============================================

-- Public can create orders (for merchandise purchases)
CREATE POLICY "Public can create orders" 
  ON orders FOR INSERT 
  WITH CHECK (true);

-- Only admins can view all orders
CREATE POLICY "Admins can view orders" 
  ON orders FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- Only admins can update orders (payment confirmation)
CREATE POLICY "Admins can update orders" 
  ON orders FOR UPDATE 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- NOTIFICATIONS TABLE - Admins only
-- ============================================

-- Only admins can insert notifications
CREATE POLICY "Admins can insert notifications" 
  ON notifications FOR INSERT 
  WITH CHECK (auth.uid() IN (SELECT id FROM admin_users));

-- Only admins can view notifications
CREATE POLICY "Admins can view notifications" 
  ON notifications FOR SELECT 
  USING (auth.uid() IN (SELECT id FROM admin_users));

-- ============================================
-- 3. UPDATE EMAIL TRIGGER TO USE VAULT SECRET
-- ============================================

-- First, you need to add the secret in Supabase Dashboard:
-- Settings → Vault → Add new secret
-- Name: RESEND_API_KEY
-- Value: re_dtBzjZhR_G8ZmJuPcNShiG5KNQ9gAfUFa

-- Update the email function to use vault secret
CREATE OR REPLACE FUNCTION send_email_via_resend()
RETURNS TRIGGER AS $$
DECLARE
  api_key TEXT;
BEGIN
  -- Get the API key from vault
  SELECT decrypted_secret INTO api_key
  FROM vault.decrypted_secrets
  WHERE name = 'RESEND_API_KEY';

  -- Send email using the vault secret
  PERFORM
    net.http_post(
      url := 'https://api.resend.com/emails',
      headers := jsonb_build_object(
        'Content-Type', 'application/json',
        'Authorization', 'Bearer ' || api_key
      ),
      body := jsonb_build_object(
        'from', 'onboarding@resend.dev',
        'to', ARRAY[NEW.user_email],
        'subject', NEW.subject,
        'html', NEW.content
      )
    );
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Recreate the trigger (in case it was modified)
DROP TRIGGER IF EXISTS on_notification_inserted ON notifications;
CREATE TRIGGER on_notification_inserted
  AFTER INSERT ON notifications
  FOR EACH ROW
  EXECUTE FUNCTION send_email_via_resend();

-- ============================================
-- 4. HELPER FUNCTION - Check if user is admin
-- ============================================

CREATE OR REPLACE FUNCTION is_admin(user_id UUID)
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users WHERE id = user_id
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================
-- SETUP COMPLETE!
-- ============================================
-- Next steps:
-- 1. Go to Supabase Dashboard → Settings → Vault
-- 2. Click "Add new secret"
-- 3. Name: RESEND_API_KEY
-- 4. Value: re_dtBzjZhR_G8ZmJuPcNShiG5KNQ9gAfUFa
-- 5. Click Save
-- ============================================
