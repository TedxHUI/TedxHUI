-- 1. Create Tickets Table
CREATE TABLE IF NOT EXISTS tickets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  ticket_type TEXT DEFAULT 'standard',
  status TEXT DEFAULT 'confirmed',
  payment_reference TEXT UNIQUE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Merchandise Table
CREATE TABLE IF NOT EXISTS merchandise (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  stock_quantity INTEGER DEFAULT 0,
  image_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  merchandise_id UUID REFERENCES merchandise(id),
  quantity INTEGER NOT NULL,
  total_price DECIMAL NOT NULL,
  payment_status TEXT DEFAULT 'pending',
  payment_reference TEXT UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Create Notifications Table
CREATE TABLE IF NOT EXISTS notifications (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_email TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT DEFAULT 'pending',
  subject TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Enable Storage (Run this to ensure the bucket is recognized)
-- Note: You might still need to click "New Bucket" in the UI named 'merchandise-images' and set it to PUBLIC
INSERT INTO storage.buckets (id, name, public) 
VALUES ('merchandise-images', 'merchandise-images', true)
ON CONFLICT (id) DO NOTHING;

-- 5. Set up Storage Policies (Allow anyone to upload/view for now)
-- These allow the app to upload and users to see the images
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING (bucket_id = 'merchandise-images');
CREATE POLICY "Admin Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'merchandise-images');
CREATE POLICY "Admin Update" ON storage.objects FOR UPDATE USING (bucket_id = 'merchandise-images');
CREATE POLICY "Admin Delete" ON storage.objects FOR DELETE USING (bucket_id = 'merchandise-images');

-- 6. Set up Table Policies (Fixing RLS Errors)
-- Tickets Table
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on tickets" ON tickets FOR SELECT USING (true);
CREATE POLICY "Allow public insert on tickets" ON tickets FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on tickets" ON tickets FOR UPDATE USING (true);

-- Merchandise Table
ALTER TABLE merchandise ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public select on merchandise" ON merchandise FOR SELECT USING (true);
CREATE POLICY "Allow public insert on merchandise" ON merchandise FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update on merchandise" ON merchandise FOR UPDATE USING (true);
CREATE POLICY "Allow public delete on merchandise" ON merchandise FOR DELETE USING (true);

-- Orders Table
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on orders" ON orders FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on orders" ON orders FOR SELECT USING (true);

-- Notifications Table
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public insert on notifications" ON notifications FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public select on notifications" ON notifications FOR SELECT USING (true);
