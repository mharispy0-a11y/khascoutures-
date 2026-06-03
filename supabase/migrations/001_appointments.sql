-- Run this in your Supabase SQL editor: https://supabase.com/dashboard → SQL Editor

CREATE TABLE IF NOT EXISTS appointments (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL CHECK (char_length(name) BETWEEN 2 AND 100),
  phone text NOT NULL CHECK (phone ~ '^[+]?[0-9\s\-]{8,20}$'),
  email text CHECK (email ~ '^[^@]+@[^@]+\.[^@]+$' OR email IS NULL),
  occasion text NOT NULL CHECK (occasion IN ('bridal','party','pret','custom')),
  message text CHECK (char_length(message) <= 1000),
  status text DEFAULT 'pending' CHECK (status IN (
    'pending','contacted','confirmed','cancelled'
  )),
  created_at timestamptz DEFAULT now(),
  ip_address inet,
  user_agent text
);

CREATE INDEX IF NOT EXISTS appointments_created_at_idx ON appointments (created_at DESC);
CREATE INDEX IF NOT EXISTS appointments_ip_created_idx ON appointments (ip_address, created_at DESC);
CREATE INDEX IF NOT EXISTS appointments_status_idx ON appointments (status);

ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "service_role_only" ON appointments
  USING (auth.role() = 'service_role');
