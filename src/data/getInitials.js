// Ambil inisial dari nama (maks. 2 huruf) untuk ditampilkan sebagai cadangan
// kalau foto anggota tidak ditemukan.
export function getInitials(name = '') {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('')
}
