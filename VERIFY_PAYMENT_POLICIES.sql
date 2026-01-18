-- ============================================
-- PAYMENT SECURITY POLICIES
-- Ensures data integrity for ticket and merchandise purchases
-- ============================================

-- ============================================
-- 1. ADD UNIQUE CONSTRAINTS
-- ============================================

-- Prevent duplicate tickets with same payment reference
ALTER TABLE tickets 
ADD CONSTRAINT unique_payment_reference 
UNIQUE (payment_reference);

-- Prevent duplicate orders with same payment reference
ALTER TABLE orders 
ADD CONSTRAINT unique_order_payment_reference 
UNIQUE (payment_reference);

-- ============================================
-- 2. VERIFY PUBLIC ACCESS FOR PURCHASES
-- ============================================

-- Check existing policies for tickets
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'tickets' AND cmd = 'INSERT';

-- Check existing policies for orders
SELECT policyname, cmd, qual 
FROM pg_policies 
WHERE tablename = 'orders' AND cmd = 'INSERT';

-- ============================================
-- 3. ENSURE STOCK TRACKING
-- ============================================

-- Add sold count to merchandise (if not exists)
DO $$ 
BEGIN
    IF NOT EXISTS (
        SELECT 1 FROM information_schema.columns 
        WHERE table_name = 'merchandise' AND column_name = 'sold_count'
    ) THEN
        ALTER TABLE merchandise ADD COLUMN sold_count INTEGER DEFAULT 0;
    END IF;
END $$;

-- Create function to update sold count
CREATE OR REPLACE FUNCTION update_merchandise_sold_count()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.payment_status = 'paid' AND (OLD.payment_status IS NULL OR OLD.payment_status != 'paid') THEN
        UPDATE merchandise 
        SET sold_count = sold_count + NEW.quantity
        WHERE id = NEW.merchandise_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger to auto-update sold count
DROP TRIGGER IF EXISTS update_sold_count_trigger ON orders;
CREATE TRIGGER update_sold_count_trigger
    AFTER INSERT OR UPDATE ON orders
    FOR EACH ROW
    EXECUTE FUNCTION update_merchandise_sold_count();

-- ============================================
-- 4. ADD PAYMENT VALIDATION FUNCTION
-- ============================================

CREATE OR REPLACE FUNCTION validate_merchandise_stock(
    merch_id UUID,
    requested_quantity INTEGER
)
RETURNS BOOLEAN AS $$
DECLARE
    available_stock INTEGER;
BEGIN
    SELECT (stock_quantity - COALESCE(sold_count, 0)) 
    INTO available_stock
    FROM merchandise 
    WHERE id = merch_id;
    
    RETURN available_stock >= requested_quantity;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- VERIFICATION QUERIES
-- ============================================

-- Check constraints
SELECT conname, contype 
FROM pg_constraint 
WHERE conrelid = 'tickets'::regclass OR conrelid = 'orders'::regclass;

-- Check merchandise columns
SELECT column_name, data_type, column_default 
FROM information_schema.columns 
WHERE table_name = 'merchandise' 
ORDER BY ordinal_position;

-- ============================================
-- SECURITY COMPLETE!
-- ============================================
-- Now the database will:
-- - Prevent duplicate payments
-- - Track merchandise stock automatically
-- - Provide stock validation function
-- ============================================
