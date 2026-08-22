import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse .env
const envPath = resolve('./.env');
const envContent = readFileSync(envPath, 'utf-8');
const env = {};
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const [key, ...rest] = trimmed.split('=');
  env[key.trim()] = rest.join('=').trim();
}

const url = env['VITE_SUPABASE_URL'];
const key = env['VITE_SUPABASE_ANON_KEY'];

console.log('--- Supabase Connection Test ---');
console.log('URL:', url);
console.log('Key (first 20 chars):', key ? key.slice(0, 20) + '...' : 'NONE');

if (!url || !key) {
  console.error('❌ Missing VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY in .env');
  process.exit(1);
}

const supabase = createClient(url, key);

try {
  const { data, error } = await supabase.from('trips').select('id').limit(1);
  if (error) {
    if (error.code === 'PGRST205' || error.code === '42P01') {
      console.log('⚠️  Connected to Supabase endpoint, but table "trips" has not been created yet.');
      console.log('   Please run the SQL schema in supabase_schema.sql via your Supabase SQL Editor.');
    } else {
      console.error('❌ Supabase error:', error.message, `(code: ${error.code})`);
    }
  } else {
    console.log('✅ Connected to Supabase successfully!');
    console.log('✅ Table "trips" exists and is fully accessible.');
    console.log('Rows found:', data?.length ?? 0);
  }
} catch (err) {
  console.error('❌ Connection failed:', err.message);
}
