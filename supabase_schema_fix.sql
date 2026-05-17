-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Drop existing triggers to avoid conflicts
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;
DROP FUNCTION IF EXISTS public.update_modified_column() CASCADE;

-- 1. Create profiles table
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    full_name TEXT,
    email TEXT NOT NULL,
    role TEXT CHECK (role IN ('producer', 'consumer')),
    company_name TEXT,
    state_location TEXT,
    capacity_mw NUMERIC,
    grid_connectivity TEXT,
    peak_load_kw NUMERIC,
    flexible_load_kw NUMERIC,
    shiftable_hours JSONB DEFAULT '[]'::jsonb,
    onboarding_complete BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Safely add columns if table already existed before this script
DO $$
BEGIN
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN capacity_mw NUMERIC;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN grid_connectivity TEXT;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN peak_load_kw NUMERIC;
    EXCEPTION WHEN duplicate_column THEN END;
    BEGIN
        ALTER TABLE public.profiles ADD COLUMN flexible_load_kw NUMERIC;
    EXCEPTION WHEN duplicate_column THEN END;
END $$;

-- 2. Create user_settings table
CREATE TABLE IF NOT EXISTS public.user_settings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    api_key TEXT,
    email_alerts_enabled BOOLEAN DEFAULT true NOT NULL,
    auto_match_enabled BOOLEAN DEFAULT false NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id)
);

-- 3. Create surplus_windows table
CREATE TABLE IF NOT EXISTS public.surplus_windows (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    producer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    date DATE NOT NULL,
    start_time TIME NOT NULL,
    end_time TIME NOT NULL,
    predicted_kw NUMERIC NOT NULL,
    status TEXT CHECK (status IN ('seeking', 'matched', 'partial', 'expired', 'curtailed')) DEFAULT 'seeking' NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Create matches table
CREATE TABLE IF NOT EXISTS public.matches (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    window_id UUID REFERENCES public.surplus_windows(id) ON DELETE CASCADE NOT NULL,
    consumer_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    matched_kw NUMERIC NOT NULL,
    consumer_savings_inr NUMERIC DEFAULT 0 NOT NULL,
    producer_revenue_inr NUMERIC DEFAULT 0 NOT NULL,
    status TEXT CHECK (status IN ('pending', 'accepted', 'completed', 'rejected')) DEFAULT 'pending' NOT NULL,
    confidence_score TEXT CHECK (confidence_score IN ('Low', 'Medium', 'High')) DEFAULT 'Medium' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Create notifications table
CREATE TABLE IF NOT EXISTS public.notifications (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT false NOT NULL,
    type TEXT CHECK (type IN ('alert', 'match', 'system')) DEFAULT 'system' NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.surplus_windows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist (to allow safe re-runs)
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname, tablename FROM pg_policies WHERE schemaname = 'public') 
    LOOP
        EXECUTE 'DROP POLICY IF EXISTS ' || quote_ident(r.policyname) || ' ON public.' || quote_ident(r.tablename);
    END LOOP;
END $$;

-- Profiles Policies
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Public profile viewing" ON public.profiles FOR SELECT USING (true);

-- User Settings Policies
CREATE POLICY "Users can view own settings" ON public.user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own settings" ON public.user_settings FOR UPDATE USING (auth.uid() = user_id);

-- Surplus Windows Policies
CREATE POLICY "Producers can view own windows" ON public.surplus_windows FOR SELECT USING (auth.uid() = producer_id);
CREATE POLICY "Producers can insert windows" ON public.surplus_windows FOR INSERT WITH CHECK (auth.uid() = producer_id);
CREATE POLICY "Producers can update own windows" ON public.surplus_windows FOR UPDATE USING (auth.uid() = producer_id);
CREATE POLICY "Producers can delete own windows" ON public.surplus_windows FOR DELETE USING (auth.uid() = producer_id);
CREATE POLICY "Consumers can view seeking windows" ON public.surplus_windows FOR SELECT USING (status IN ('seeking', 'partial'));

-- Matches Policies
CREATE POLICY "Users can view their matches" ON public.matches FOR SELECT USING (
    auth.uid() = consumer_id OR 
    auth.uid() IN (SELECT producer_id FROM public.surplus_windows WHERE id = window_id)
);
CREATE POLICY "Consumers can create matches" ON public.matches FOR INSERT WITH CHECK (auth.uid() = consumer_id);
CREATE POLICY "Users can update their matches" ON public.matches FOR UPDATE USING (
    auth.uid() = consumer_id OR 
    auth.uid() IN (SELECT producer_id FROM public.surplus_windows WHERE id = window_id)
);

-- Notifications Policies
CREATE POLICY "Users can view own notifications" ON public.notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON public.notifications FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "System can insert notifications" ON public.notifications FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Trigger to update 'updated_at' columns automatically
CREATE OR REPLACE FUNCTION public.update_modified_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

DO $$
DECLARE
    t text;
BEGIN
    FOR t IN SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_name IN ('profiles', 'user_settings', 'surplus_windows', 'matches', 'notifications')
    LOOP
        EXECUTE format('DROP TRIGGER IF EXISTS update_%I_modtime ON public.%I', t, t);
        EXECUTE format('CREATE TRIGGER update_%I_modtime BEFORE UPDATE ON public.%I FOR EACH ROW EXECUTE PROCEDURE public.update_modified_column()', t, t);
    END LOOP;
END $$;

-- Trigger to create profile and settings on new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    new.id, 
    new.email, 
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'role'
  );
  
  INSERT INTO public.user_settings (user_id)
  VALUES (new.id);
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();

-- Drop it first just in case it was partially created
drop policy if exists "Users can insert own profile" on public.profiles;

-- Allow authenticated users to insert their own profile
create policy "Users can insert own profile"
  on public.profiles for insert
  to authenticated
  with check (auth.uid() = id);

-- FORCE INSTANT SCHEMA RELOAD FOR API
NOTIFY pgrst, 'reload schema';
