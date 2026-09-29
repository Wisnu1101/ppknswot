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
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css          # konfigurasi dasar Tailwind (@theme)
    └── components/
        ├── Navbar.jsx     # fixed top-0
        ├── Hero.jsx
        ├── Introduction.jsx
        ├── Swot.jsx
        ├── Conclusion.jsx
        ├── Quiz.jsx
        ├── AboutUs.jsx
        └── Footer.jsx
```

## Catatan Pengembangan

Seluruh komponen sudah memiliki *boilerplate*, `className` Tailwind, dan komentar
`TODO` sebagai penanda tempat konten naratif akan diisi. Warna kustom
(`nusantara-blue`, `strengthen-red`, `gold`, `ink`) didefinisikan pada blok
`@theme` di `src/index.css` dengan konvensi Tailwind v4.
