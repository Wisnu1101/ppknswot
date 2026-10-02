# Kilas Bangsa

Website edukasi bertema PPKN: **Peta Kekuatan, Kelemahan, Peluang, dan Ancaman Indonesia**.

## Tech Stack

- [Vite](https://vite.dev/) — bundler & dev server
- [React 19](https://react.dev/)
- [Tailwind CSS v4](https://tailwindcss.com/) — via plugin resmi `@tailwindcss/vite`
- oxlint — linting

## Menjalankan Proyek

```bash
npm install      # pasang dependency
npm run dev      # jalankan dev server
npm run build    # build produksi ke dist/
npm run preview  # pratinjau hasil build
npm run lint     # jalankan linter
```

## Struktur Folder

```
.
├── index.html
├── vite.config.js
├── public/
│   └── img/               # gambar konten (mis. kesimpulan-*.jpeg)
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css          # konfigurasi dasar Tailwind (@theme)
    ├── assets/
    │   └── anggota/       # foto anggota About Us (format bebas, auto-detect)
    ├── data/
    │   ├── members.js     # data anggota Kelompok 1 + auto-detect foto
    │   └── getInitials.js # util inisial nama (cadangan bila foto tidak ada)
    └── components/
        ├── Navbar.jsx     # fixed top-0
        ├── Hero.jsx
        ├── Introduction.jsx
        ├── Swot.jsx
        ├── Conclusion.jsx
        ├── Quiz.jsx
        ├── AboutUs.jsx    # marquee foto anggota: grayscale → warna saat diklik
        └── Footer.jsx
```

> **Foto anggota:** taruh di `src/assets/anggota/` dengan nama `anggota-<nomor>`
> (mis. `anggota-1.jpg`). Ekstensi apa pun didukung (`.jpg .jpeg .png .webp .avif
> .gif .bmp .svg`) dan dideteksi otomatis — tidak perlu mengubah kode.

## Catatan Pengembangan

Seluruh komponen sudah memiliki *boilerplate*, `className` Tailwind, dan komentar
`TODO` sebagai penanda tempat konten naratif akan diisi. Warna kustom
(`nusantara-blue`, `strengthen-red`, `gold`, `ink`) didefinisikan pada blok
`@theme` di `src/index.css` dengan konvensi Tailwind v4.
