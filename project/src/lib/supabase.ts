import { createClient } from '@supabase/supabase-js';

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseUrl = rawUrl && rawUrl.trim() !== '' ? rawUrl : 'https://placeholder.supabase.co';
const supabaseAnonKey = rawKey && rawKey.trim() !== '' ? rawKey : 'placeholder-key';

if (!rawUrl || !rawKey) {
  console.warn(
    '[GlobeTrotter] Missing Supabase environment variables. Running in local storage fallback mode.'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
