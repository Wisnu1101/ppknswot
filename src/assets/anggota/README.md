# Foto Anggota — About Us

Taruh foto anggota kelompok di folder ini. **Format bebas**: `.jpg`, `.jpeg`, `.png`,
`.webp`, `.avif`, `.gif`, `.bmp`, `.svg`.

Web akan **mendeteksi otomatis** file yang ada. Cara paling mudah, samakan **nama file
dengan nomor anggota** (ekstensi bebas):

| Nomor | Nama Anggota                     | Contoh nama file                         |
| ----- | -------------------------------- | ---------------------------------------- |
| 1     | Athallah Izzan Bianta            | `anggota-1.jpg` / `anggota-1.webp`       |
| 2     | Daffa Firas Alfarisi             | `anggota-2.png` / `anggota-2.jpeg`       |
| 3     | Hanin Maryam Khairunnisa         | `anggota-3.png`                          |
| 4     | Nalendra Wisnu Megananda         | `anggota-4.webp`                         |
| 5     | Rahma Aulia Putri                | `anggota-5.png`                          |
| 6     | Risya Oktafiani                  | `anggota-6.jpeg`                         |
| 7     | Swa'ana Salwa Igrimatul Aisyah   | `anggota-7.jpg`                          |

**Cara ganti foto:** timpa/tambahkan file dengan pola `anggota-<nomor>`. Ekstensinya bebas,
tidak perlu mengubah kode sama sekali.

**Catatan:**
- Pola `anggota-3`, `anggota-03`, bahkan `Foto-anggota-3.png` semuanya dikenali.
- Kalau nama file tidak memakai nomor, web juga bisa mencocokkan dari **nama anggota**
  (mis. `hanin-maryam.png` untuk Hanin Maryam Khairunnisa).
- Kalau foto tidak ditemukan, kartu otomatis menampilkan **inisial nama** sebagai cadangan.
- Rekomendasi: foto **potret 3:4** (mis. 600 × 800 px), ukuran < ±500 KB.

Nama & peran anggota diatur di: `src/data/members.js`.
