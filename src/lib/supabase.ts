import { createClient, SupabaseClient } from '@supabase/supabase-js';

// Get Supabase config from environment or localStorage
export function getSupabaseConfig(): { url: string; anonKey: string } {
  const envUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
  const envKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem('zukko_supabase_url') || '' : '';
  const storedKey = typeof window !== 'undefined' ? localStorage.getItem('zukko_supabase_key') || '' : '';

  return {
    url: storedUrl || envUrl,
    anonKey: storedKey || envKey,
  };
}

let supabaseInstance: SupabaseClient | null = null;

export function getSupabase(): SupabaseClient | null {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) {
    return null;
  }
  if (!supabaseInstance) {
    try {
      supabaseInstance = createClient(url, anonKey);
    } catch (e) {
      console.warn('Supabase initialization failed:', e);
      return null;
    }
  }
  return supabaseInstance;
}

export function saveSupabaseConfig(url: string, anonKey: string) {
  if (typeof window !== 'undefined') {
    localStorage.setItem('zukko_supabase_url', url.trim());
    localStorage.setItem('zukko_supabase_key', anonKey.trim());
    supabaseInstance = null; // reset
  }
}

export function isSupabaseConnected(): boolean {
  return getSupabase() !== null;
}
