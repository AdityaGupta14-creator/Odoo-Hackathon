-- Supabase Database Schema Setup for Trip / Fleet Management App

CREATE TABLE IF NOT EXISTS public.trips (
    id TEXT PRIMARY KEY,
    name TEXT,
    destination TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    data JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Allow public access (Read, Insert, Update, Delete) via Anon key
CREATE POLICY "Allow public read access" ON public.trips FOR SELECT USING (true);
CREATE POLICY "Allow public insert access" ON public.trips FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public update access" ON public.trips FOR UPDATE USING (true);
CREATE POLICY "Allow public delete access" ON public.trips FOR DELETE USING (true);
