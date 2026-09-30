import { createClient } from '@supabase/supabase-js'

// Kredensial diambil dari environment variable (.env).
// Lihat file .env.example untuk daftar variabel yang dibutuhkan.
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// `isSupabaseConfigured` dipakai komponen untuk memilih antara mode
// "terhubung ke database" atau mode demo (localStorage) saat env belum diisi.
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null
