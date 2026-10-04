-- Run di Supabase SQL Editor

-- Table: services
CREATE TABLE IF NOT EXISTS public.services (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price NUMERIC NOT NULL,
  category TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: templates
CREATE TABLE IF NOT EXISTS public.templates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Table: contacts
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable RLS (optional, disable for MVP testing)
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;

-- Policy: allow anonymous read
CREATE POLICY "Allow anonymous read services" ON public.services FOR SELECT USING (true);
CREATE POLICY "Allow anonymous read templates" ON public.templates FOR SELECT USING (true);

-- Policy: allow anonymous insert contacts
CREATE POLICY "Allow anonymous insert contacts" ON public.contacts FOR INSERT WITH CHECK (true);

-- Sample data
INSERT INTO public.services (name, description, price, category) VALUES
('Paket Basic', 'Website undangan sederhana dengan fitur standar', 250000, 'Basic'),
('Paket Premium', 'Website undangan lengkap dengan musik & galeri', 500000, 'Premium'),
('Paket Deluxe', 'Website + custom domain + RSVP tracking', 1000000, 'Deluxe');

INSERT INTO public.templates (title, image_url, category, description) VALUES
('Elegant White', 'https://placehold.co/400x600/ffffff/333333?text=Elegant+White', 'Modern', 'Template minimalis dengan warna putih elegan'),
('Rose Gold', 'https://placehold.co/400x600/f4c2c2/ffffff?text=Rose+Gold', 'Romantic', 'Template romantis dengan tema rose gold'),
('Classic Blue', 'https://placehold.co/400x600/4169e1/ffffff?text=Classic+Blue', 'Traditional', 'Template klasik dengan warna biru');
