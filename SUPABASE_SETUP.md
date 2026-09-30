# Panduan Setup Komentar (Supabase)

Fitur **Komentar / Buku Tamu** memakai [Supabase](https://supabase.com) sebagai
database gratis. Ikuti langkah di bawah (± 5 menit) agar komentar bisa dilihat
oleh **semua pengunjung**.

> Selama belum diatur, section komentar otomatis berjalan dalam **mode demo**
> (komentar hanya tersimpan di browser pengirim). UI & form sudah berfungsi.

---

## 1. Buat Project Supabase

1. Daftar / login di <https://supabase.com> (gratis).
2. Klik **New project**, isi nama & password database, pilih region terdekat
   (mis. `Singapore`), lalu tunggu project selesai dibuat.

## 2. Buat Tabel `comments`

Buka **SQL Editor** → **New query**, tempel skrip berikut, lalu **Run**:

```sql
-- Tabel komentar / buku tamu
create table if not exists public.comments (
  id          bigint generated always as identity primary key,
  name        text not null check (char_length(name) between 2 and 40),
  role        text not null default '' check (char_length(role) <= 48),
  message     text not null check (char_length(message) between 3 and 500),
  created_at  timestamptz not null default now()
);

-- Index agar urutan terbaru tetap cepat
create index if not exists comments_created_at_idx
  on public.comments (created_at desc);

-- (Opsional) Aktifkan Row Level Security
alter table public.comments enable row level security;

-- Semua orang boleh membaca komentar
create policy "comments_public_read"
  on public.comments for select
  using (true);

-- Semua orang boleh mengirim komentar (anon)
create policy "comments_public_insert"
  on public.comments for insert
  with check (true);
```

## 3. Ambil Kredensial

Buka **Project Settings** → **API**, lalu salin:

- **Project URL** → `VITE_SUPABASE_URL`
- **anon public** key → `VITE_SUPABASE_ANON_KEY`

## 4. Isi File `.env`

Di root project, salin `.env.example` menjadi `.env`, lalu isi:

```env
VITE_SUPABASE_URL=https://xxxxxxxxxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```

Pastikan `.env` **tidak ikut ter-commit** (sudah otomatis di-ignore oleh `.gitignore`).

## 5. Jalankan

```bash
npm run dev      # test lokal
npm run build    # build produksi
```

Buka section **Komentar** → banner "Mode demo" harus hilang dan muncul badge
**Live** jika realtime aktif. Komentar baru akan langsung muncul di semua tab.

---

## 6. Deploy (Hosting)

Karena kredensial disimpan di environment variable, saat deploy (Vercel /
Netlify / Cloudflare Pages / GitHub Pages) kamu perlu menambahkan **Environment
Variables** yang sama:

| Name                     | Value                          |
| ------------------------ | ------------------------------ |
| `VITE_SUPABASE_URL`      | Project URL Supabase           |
| `VITE_SUPABASE_ANON_KEY` | anon public key Supabase       |

> GitHub Pages (lewat `vite build`) tidak punya tempat untuk menyimpan env
> otomatis kecuali lewat GitHub Actions secrets. Alternatifnya gunakan Vercel
> atau Netlify yang mendukung env dengan mudah. Karena `anon key` bersifat
> publik, bisa juga di-hardcode, tetapi env lebih rapi dan aman.

## Catatan Keamanan

- `anon public` key memang aman untuk frontend karena akses dibatasi **Row
  Level Security (RLS)**.
- Untuk produksi serius, pertimbangkan moderasi: tambahkan kolom `is_approved`
  atau batasi insert lewat rate-limit / CAPTCHA (mis. Supabase + Turnstile).
