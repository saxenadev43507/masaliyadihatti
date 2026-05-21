-- =============================================
-- Supabase Orders Table for Masaliya Di Hatti
-- Run this SQL in your Supabase Dashboard:
-- Go to SQL Editor → New Query → Paste & Run
-- =============================================

-- Create the orders table
CREATE TABLE IF NOT EXISTS orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  stripe_payment_intent TEXT,
  customer_email TEXT NOT NULL,
  items JSONB NOT NULL DEFAULT '[]',
  subtotal DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping_cost DECIMAL(10, 2) NOT NULL DEFAULT 0,
  shipping_service TEXT DEFAULT '',
  shipping_postcode TEXT DEFAULT '',
  total DECIMAL(10, 2) NOT NULL DEFAULT 0,
  currency TEXT DEFAULT 'aud',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'paid', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_orders_customer_email ON orders(customer_email);
CREATE INDEX IF NOT EXISTS idx_orders_stripe_session ON orders(stripe_session_id);
CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status);
CREATE INDEX IF NOT EXISTS idx_orders_created_at ON orders(created_at DESC);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can view their own orders
CREATE POLICY "Users can view own orders"
  ON orders FOR SELECT
  USING (customer_email = auth.jwt() ->> 'email');

-- Policy: Service role can insert orders (for webhook)
CREATE POLICY "Service role can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Policy: Service role can update orders
CREATE POLICY "Service role can update orders"
  ON orders FOR UPDATE
  USING (true);

-- Auto-update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Verify table was created
SELECT 'Orders table created successfully!' AS result;
