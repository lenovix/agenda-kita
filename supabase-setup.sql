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

-- Table: invitations (undangan user)
CREATE TABLE IF NOT EXISTS public.invitations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  couple_name_male TEXT NOT NULL,
  groom_parents TEXT,
  couple_name_female TEXT NOT NULL,
  bride_parents TEXT,
  wedding_date DATE NOT NULL,
  akad_time TEXT,
  reception_time TEXT,
  location TEXT,
  maps_url TEXT,
  quote TEXT,
  story TEXT,
  cover_image TEXT,
  music_url TEXT,
  category TEXT DEFAULT 'Romantic',
  selected_template TEXT DEFAULT '001',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.invitations ENABLE ROW LEVEL SECURITY;

-- Kolom tambahan untuk data publik halaman tamu (rekening, QRIS, alamat, dresscode, protokol)
ALTER TABLE public.invitations ADD COLUMN IF NOT EXISTS extras JSONB DEFAULT '{}'::jsonb;

-- Policy: user hanya bisa lihat & kelola undangan sendiri
CREATE POLICY "Users can view own invitations" ON public.invitations
  FOR SELECT USING (auth.uid() = user_id);

-- Policy: publik bisa membaca undangan via link /inv/[id] (data undangan bersifat publik)
CREATE POLICY "Public can view invitations" ON public.invitations
  FOR SELECT USING (true);
CREATE POLICY "Users can insert own invitations" ON public.invitations
  FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own invitations" ON public.invitations
  FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own invitations" ON public.invitations
  FOR DELETE USING (auth.uid() = user_id);

-- Table: guests (daftar tamu)
CREATE TABLE IF NOT EXISTS public.guests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  name TEXT NOT NULL,
  phone TEXT,
  session TEXT DEFAULT 'Sesi 1',
  pax INTEGER DEFAULT 1,
  status TEXT DEFAULT 'pending', -- pending, hadir, ragu, tidak_hadir
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.guests ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage guests of own invitations" ON public.guests
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE public.invitations.id = guests.invitation_id 
      AND public.invitations.user_id = auth.uid()
    )
  );

-- Table: wishes (buku tamu & doa restu)
CREATE TABLE IF NOT EXISTS public.wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  invitation_id UUID REFERENCES public.invitations(id) ON DELETE CASCADE NOT NULL,
  guest_name TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'hadir', -- hadir, tidak_hadir, ragu
  is_hidden BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE public.wishes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view unhidden wishes" ON public.wishes
  FOR SELECT USING (NOT is_hidden);

CREATE POLICY "Anyone can insert wishes" ON public.wishes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can moderate wishes of own invitations" ON public.wishes
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.invitations 
      WHERE public.invitations.id = wishes.invitation_id 
      AND public.invitations.user_id = auth.uid()
    )
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

-- Table: user_roles
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
  role TEXT DEFAULT 'user' -- 'admin' or 'user'
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow read own role" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow admin read all roles" ON public.user_roles
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Table: orders (Manajemen Order & Pembayaran)
CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  service_id UUID REFERENCES public.services(id),
  amount NUMERIC NOT NULL,
  status TEXT DEFAULT 'pending', -- pending, paid, cancelled
  payment_method TEXT,
  payment_proof_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  verified_at TIMESTAMPTZ
);

ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow user read own orders" ON public.orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Allow user insert own orders" ON public.orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Allow admin all orders" ON public.orders
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM public.user_roles 
      WHERE user_id = auth.uid() AND role = 'admin'
    )
  );

-- Extend templates table with status
ALTER TABLE public.templates ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active';

-- Sample data
INSERT INTO public.services (name, description, price, category) VALUES
('Paket Basic', 'Website undangan sederhana dengan fitur standar', 250000, 'Basic'),
('Paket Premium', 'Website undangan lengkap dengan musik & galeri', 500000, 'Premium'),
('Paket Deluxe', 'Website + custom domain + RSVP tracking', 1000000, 'Deluxe');

INSERT INTO public.templates (title, image_url, category, description) VALUES
('Elegant White', 'https://placehold.co/400x600/ffffff/333333?text=Elegant+White', 'Modern', 'Template minimalis dengan warna putih elegan'),
('Rose Gold', 'https://placehold.co/400x600/f4c2c2/ffffff?text=Rose+Gold', 'Romantic', 'Template romantis dengan tema rose gold'),
('Classic Blue', 'https://placehold.co/400x600/4169e1/ffffff?text=Classic+Blue', 'Traditional', 'Template klasik dengan warna biru');
