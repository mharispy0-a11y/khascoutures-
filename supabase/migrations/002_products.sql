-- Run this in your Supabase SQL editor after 001_appointments.sql

CREATE TABLE IF NOT EXISTS products (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  category text NOT NULL CHECK (category IN ('bridal','party','pret')),
  fabric text,
  embroidery text,
  price_pkr integer,
  price_on_request boolean DEFAULT false,
  image_url text,
  image_alt text,
  whatsapp_enquiry_text text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

CREATE INDEX IF NOT EXISTS products_category_idx ON products (category);
CREATE INDEX IF NOT EXISTS products_sort_order_idx ON products (sort_order);
CREATE INDEX IF NOT EXISTS products_is_active_idx ON products (is_active);

-- Seed data matching the existing static collections page
INSERT INTO products (name, category, fabric, embroidery, price_on_request, whatsapp_enquiry_text, sort_order) VALUES
  ('Crimson Zari Lehenga',   'bridal', 'Raw Silk',       'Zardozi & Dabka',            true,  'I''m interested in the Crimson Zari Lehenga',   10),
  ('Ivory Walima Ensemble',  'bridal', 'Chiffon',        'Thread & Sequins',            true,  'I''m interested in the Ivory Walima Ensemble',  20),
  ('Garnet Anarkali',        'bridal', 'Net over Silk',  'Mirror & Gota',               true,  'I''m interested in the Garnet Anarkali',        30),
  ('Blush Sharara Set',      'bridal', 'Organza',        'Cut-Dana & Resham',           true,  'I''m interested in the Blush Sharara Set',      40),
  ('Forest Satin Co-ord',    'party',  'Premium Satin',  'Aari Embroidery',             true,  'I''m interested in the Forest Satin Co-ord',    50),
  ('Midnight Farshi Pyjama', 'party',  'Velvet',         'Gota & Tilla',                true,  'I''m interested in the Midnight Farshi Pyjama', 60),
  ('Bronze Palazzo Set',     'party',  'Tissue',         'Sequin & Beads',              true,  'I''m interested in the Bronze Palazzo Set',     70),
  ('Plum Jacket Kurta',      'party',  'Jamawar',        'Block Print',                 true,  'I''m interested in the Plum Jacket Kurta',      80),
  ('Sage Lawn 3-Piece',      'pret',   'Premium Lawn',   'Digital Print + Embroidery',  false, 'I''m interested in the Sage Lawn 3-Piece',      90),
  ('Terracotta Kurta Set',   'pret',   'Cambric',        'Hand Block',                  false, 'I''m interested in the Terracotta Kurta Set',   100),
  ('Navy Chiffon Dupatta',   'pret',   'Chiffon',        'Printed',                     false, 'I''m interested in the Navy Chiffon Dupatta',   110),
  ('Dusty Rose Co-ord',      'pret',   'Cotton',         'Schiffli Lace',               false, 'I''m interested in the Dusty Rose Co-ord',      120);

-- Set price for pret items
UPDATE products SET price_pkr = 12000 WHERE name = 'Sage Lawn 3-Piece';
UPDATE products SET price_pkr = 9500  WHERE name = 'Terracotta Kurta Set';
UPDATE products SET price_pkr = 14000 WHERE name = 'Navy Chiffon Dupatta';
UPDATE products SET price_pkr = 11000 WHERE name = 'Dusty Rose Co-ord';
