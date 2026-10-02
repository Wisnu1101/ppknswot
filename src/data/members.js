// ---------------------------------------------------------------------------
// Data anggota Kelompok 1 — About Us
// ---------------------------------------------------------------------------
// FOTO ANGGOTA (fleksibel — format apa saja):
//   Taruh file foto di folder:  src/assets/anggota/
//   Format yang didukung: .jpg .jpeg .png .webp .avif .gif .bmp .svg
//
//   Cukup samakan NAMA file dengan nomor anggota, tanpa perlu memikirkan
//   ekstensinya. Contoh, semua ini valid untuk anggota ke-3:
//       anggota-3.jpg
//       anggota-3.jpeg
//       anggota-3.png
//       anggota-3.webp
//       Foto Hanin.png        <-- kata "3" tidak wajib, selama cocok pola di bawah
//
//   Pencocokan dilakukan otomatis: nama file harus diawali "anggota-<nomor>"
//   ATAU mengandung nomor anggota. Kalau tidak ada yang cocok, kartu akan
//   menampilkan inisial nama sebagai cadangan.
//
//   Ukuran foto disarankan potret 3:4 (mis. 600x800 px), file < ~500 KB.
// ---------------------------------------------------------------------------

import { getInitials } from './getInitials'

// Vite meng-import SEMUA file gambar di folder anggota, ekstensi apa saja,
// jadi tidak perlu lagi daftar nama file satu per satu.
const photoModules = import.meta.glob(
  '../assets/anggota/*.{jpg,jpeg,png,webp,avif,gif,bmp,svg,JPG,JPEG,PNG,WEBP,AVIF,GIF,BMP,SVG}',
  { eager: true, import: 'default' }
)

// Ubah hasil glob menjadi peta sederhana: { namaFileTanpaEkstensi: url }
const photoMap = Object.entries(photoModules).reduce((acc, [path, url]) => {
  const fileName = path.split('/').pop() || ''
  const baseName = fileName.replace(/\.[^.]+$/, '').toLowerCase()
  acc[baseName] = url
  return acc
}, {})

// Cari foto yang paling cocok untuk seorang anggota.
function resolvePhoto(id, name) {
  const keys = Object.keys(photoMap)

  // 1) Utamakan pola "anggota-<id>" (mis. anggota-3, anggota-03)
  const byNumber = keys.find((key) => {
    const match = key.match(/anggota[-\s_]?0*(\d+)/)
    return match && Number(match[1]) === id
  })
  if (byNumber) return photoMap[byNumber]

  // 2) Cadangan: cocokkan berdasarkan potongan nama (mis. "hanin-maryam")
  const nameSlug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
  const firstName = nameSlug.split('-')[0]
  const byName = keys.find((key) => key.includes(nameSlug) || (firstName.length > 2 && key.includes(firstName)))
  if (byName) return photoMap[byName]

  return null
}

// Definisikan anggota di sini. Properti `photo` TIDAK perlu diisi —
// foto dicari otomatis dari folder src/assets/anggota/.
const memberList = [
  { id: 1, name: 'Athallah Izzan Bianta', role: 'Anggota Kelompok 1' },
  { id: 2, name: 'Daffa Firas Alfarisi', role: 'Anggota Kelompok 1' },
  { id: 3, name: 'Hanin Maryam Khairunnisa', role: 'Anggota Kelompok 1' },
  { id: 4, name: 'Nalendra Wisnu Megananda', role: 'Anggota Kelompok 1' },
  { id: 5, name: 'Rahma Aulia Putri', role: 'Anggota Kelompok 1' },
  { id: 6, name: 'Risya Oktafiani', role: 'Anggota Kelompok 1' },
  { id: 7, name: "Swa'ana Salwa Igrimatul Aisyah", role: 'Anggota Kelompok 1' },
]

export const members = memberList.map((member) => ({
  ...member,
  photo: resolvePhoto(member.id, member.name),
  initials: getInitials(member.name),
}))

// Warna aksen neo-brutalist yang dipakai bergiliran untuk tiap kartu.
export const memberAccents = [
  { bg: 'bg-purple-300', solid: 'bg-purple-500', text: 'text-purple-700', ring: '#7c3aed' },
  { bg: 'bg-[#bef264]', solid: 'bg-[#a3e635]', text: 'text-lime-700', ring: '#65a30d' },
  { bg: 'bg-amber-300', solid: 'bg-amber-400', text: 'text-amber-700', ring: '#d97706' },
  { bg: 'bg-rose-300', solid: 'bg-rose-400', text: 'text-rose-700', ring: '#e11d48' },
  { bg: 'bg-sky-300', solid: 'bg-sky-400', text: 'text-sky-700', ring: '#0284c7' },
  { bg: 'bg-orange-300', solid: 'bg-orange-400', text: 'text-orange-700', ring: '#ea580c' },
  { bg: 'bg-emerald-300', solid: 'bg-emerald-400', text: 'text-emerald-700', ring: '#059669' },
]

export { getInitials }
