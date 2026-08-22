// Quick Supabase connection test
// Run with: node test-supabase.mjs

import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Parse .env manually (no dotenv needed)
const envPath = resolve('./project/.env');
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
console.log('Key (first 20 chars):', key?.slice(0, 20) + '...');
console.log('');

if (!url || !key) {
  console.error('❌ Missing URL or key in .env');
  process.exit(1);
}

const supabase = createClient(url, key);

try {
  // Try a simple query - list tables
  const { data, error } = await supabase.from('trips').select('id').limit(1);
  if (error) {
    if (error.code === '42P01') {
      console.log('✅ Connected to Supabase successfully!');
      console.log('⚠️  Table "trips" does not exist yet. Please create it using the SQL in walkthrough.md.');
    } else {
      console.error('❌ Supabase query error:', error.message, `(code: ${error.code})`);
    }
  } else {
    console.log('✅ Connected to Supabase successfully!');
    console.log('✅ Table "trips" exists and is accessible.');
    console.log('Rows found:', data?.length ?? 0);
  }
} catch (err) {
  console.error('❌ Connection failed:', err.message);
}
