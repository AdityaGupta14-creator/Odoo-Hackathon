-- Run this in your Supabase SQL Editor
CREATE TABLE IF NOT EXISTS public.trips (
    id UUID PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    data JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.trips ENABLE ROW LEVEL SECURITY;

-- Create policy to allow all access (since we are not adding user authentication yet)
CREATE POLICY "Allow all operations for anon" ON public.trips
    FOR ALL
    TO public
    USING (true)
    WITH CHECK (true);
