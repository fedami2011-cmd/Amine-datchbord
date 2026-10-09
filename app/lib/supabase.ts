
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

// Client-side Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Server-side Supabase client (for use in API routes or server components)
// Note: For server-side, you might want to use a service role key for more privileges
// and keep it truly secret, not exposed via NEXT_PUBLIC.
// For this example, we'll use the same anon key for simplicity, but be aware of security implications.
export const createServerSupabaseClient = () => createClient(supabaseUrl, supabaseAnonKey);