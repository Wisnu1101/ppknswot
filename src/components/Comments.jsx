import { useEffect, useMemo, useRef, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient'

// ---------------------------------------------------------------------------
// Konstanta
// ---------------------------------------------------------------------------
const MAX_NAME = 40
const MAX_ROLE = 48
const MAX_MESSAGE = 500
const DEMO_STORAGE_KEY = 'kilas-bangsa-comments-demo'
const IDENTITY_STORAGE_KEY = 'kilas-bangsa-comment-identity'

// Palet warna neo-brutalist untuk avatar (berdasarkan nama).
const AVATAR_PALETTE = [
  { bg: 'bg-purple-300', ring: '#0f172a' },
  { bg: 'bg-[#bef264]', ring: '#0f172a' },
  { bg: 'bg-amber-300', ring: '#0f172a' },
  { bg: 'bg-rose-300', ring: '#0f172a' },
  { bg: 'bg-sky-300', ring: '#0f172a' },
  { bg: 'bg-orange-300', ring: '#0f172a' },
]

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------
function pickAvatar(name) {
  const safe = (name || '?').trim()
  let hash = 0
  for (let i = 0; i < safe.length; i += 1) {
    hash = (hash * 31 + safe.charCodeAt(i)) % 100000
  }
  return {
    ...AVATAR_PALETTE[hash % AVATAR_PALETTE.length],
    initial: safe.charAt(0).toUpperCase() || '?',
  }
}

function formatRelative(dateInput) {
  const date = new Date(dateInput)
  if (Number.isNaN(date.getTime())) return 'baru saja'

  const diff = Date.now() - date.getTime()
  const sec = Math.floor(diff / 1000)

  if (sec < 45) return 'baru saja'
  const min = Math.floor(sec / 60)
  if (min < 60) return `${min} menit lalu`
  const hour = Math.floor(min / 60)
  if (hour < 24) return `${hour} jam lalu`
  const day = Math.floor(hour / 24)
  if (day < 7) return `${day} hari lalu`
  const week = Math.floor(day / 7)
  if (week < 5) return `${week} minggu lalu`
  const month = Math.floor(day / 30)
  if (month < 12) return `${month} bulan lalu`
  return `${Math.floor(day / 365)} tahun lalu`
}

function readIdentity() {
  try {
    const raw = localStorage.getItem(IDENTITY_STORAGE_KEY)
    return raw ? JSON.parse(raw) : { name: '', role: '' }
  } catch {
    return { name: '', role: '' }
  }
}

// ---------------------------------------------------------------------------
// Sub-komponen: kartu satu komentar
// ---------------------------------------------------------------------------
function CommentCard({ comment }) {
  const avatar = useMemo(() => pickAvatar(comment.name), [comment.name])

  return (
    <li className="group animate-fade-in-up">
      <article className="flex gap-3.5 rounded-2xl border-2 border-slate-900 bg-white p-4 shadow-[4px_4px_0px_0px_#0f172a] transition-all duration-200 hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0f172a] sm:p-5">
        {/* Avatar */}
        <span
          aria-hidden="true"
          className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 text-lg font-black text-slate-900 ${avatar.bg}`}
        >
          {avatar.initial}
        </span>

        <div className="min-w-0 flex-1">
          {/* Header: nama + role + waktu */}
          <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
            <span className="text-sm font-black tracking-tight text-slate-900">
              {comment.name}
            </span>
            {comment.role ? (
              <span className="rounded-md border border-slate-900 bg-[#fef9c3] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-900">
                {comment.role}
              </span>
            ) : null}
            <span className="text-[11px] font-semibold text-slate-400">
              • {formatRelative(comment.created_at)}
            </span>
          </div>

          {/* Isi pesan */}
          <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">
            {comment.message}
          </p>
        </div>
      </article>
    </li>
  )
}

// ---------------------------------------------------------------------------
// Komponen utama
// ---------------------------------------------------------------------------
export default function Comments() {
  const [comments, setComments] = useState(() => {
    if (isSupabaseConfigured) return []
    try {
      const raw = localStorage.getItem(DEMO_STORAGE_KEY)
      const parsed = raw ? JSON.parse(raw) : []
      return Array.isArray(parsed) ? parsed : []
    } catch {
      return []
    }
  })
  const [status, setStatus] = useState(isSupabaseConfigured ? 'loading' : 'ready')
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState('')
  const [notice, setNotice] = useState('')

  const identity = useMemo(() => readIdentity(), [])
  const [name, setName] = useState(identity.name)
  const [role, setRole] = useState(identity.role)
  const [message, setMessage] = useState('')

  const mountedRef = useRef(true)

  // ------------------------------------------------------------------
  // Muat komentar (Supabase atau demo localStorage)
  // ------------------------------------------------------------------
  useEffect(() => {
    mountedRef.current = true

    if (!isSupabaseConfigured) {
      // ---- Mode demo: state awal sudah dibaca dari localStorage ----
      // Di sini kita hanya menyinkronkan antar-tab browser yang sama.
      const onStorage = (event) => {
        if (event.key !== DEMO_STORAGE_KEY) return
        try {
          const parsed = JSON.parse(event.newValue || '[]')
          setComments(Array.isArray(parsed) ? parsed : [])
        } catch {
          /* ignore */
        }
      }
      window.addEventListener('storage', onStorage)
      return () => {
        mountedRef.current = false
        window.removeEventListener('storage', onStorage)
      }
    }

    // ---- Mode Supabase ----
    const loadComments = async () => {
      const { data, error } = await supabase
        .from('comments')
        .select('id, name, role, message, created_at')
        .order('created_at', { ascending: false })
        .limit(200)

      if (!mountedRef.current) return
      if (error) {
        setStatus('error')
        return
      }
      setComments(data ?? [])
      setStatus('ready')
    }

    loadComments()

    // Realtime: komentar baru muncul otomatis untuk semua pengunjung.
    const channel = supabase
      .channel('comments-stream')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'comments' },
        (payload) => {
          setComments((prev) => {
            if (prev.some((c) => c.id === payload.new.id)) return prev
            return [payload.new, ...prev]
          })
        },
      )
      .subscribe()

    return () => {
      mountedRef.current = false
      supabase.removeChannel(channel)
    }
  }, [])

  // ------------------------------------------------------------------
  // Kirim komentar
  // ------------------------------------------------------------------
  const handleSubmit = async (event) => {
    event.preventDefault()
    setFormError('')
    setNotice('')

    const cleanName = name.trim()
    const cleanRole = role.trim()
    const cleanMessage = message.trim()

    if (cleanName.length < 2) {
      setFormError('Nama minimal 2 karakter ya.')
      return
    }
    if (cleanMessage.length < 3) {
      setFormError('Komentar minimal 3 karakter ya.')
      return
    }

    setSubmitting(true)

    // Simpan identitas agar tidak perlu mengetik ulang lain kali.
    try {
      localStorage.setItem(
        IDENTITY_STORAGE_KEY,
        JSON.stringify({ name: cleanName, role: cleanRole }),
      )
    } catch {
      /* ignore */
    }

    if (!isSupabaseConfigured) {
      // ---- Mode demo ----
      const entry = {
        id: `demo-${Date.now()}`,
        name: cleanName,
        role: cleanRole,
        message: cleanMessage,
        created_at: new Date().toISOString(),
      }
      const next = [entry, ...comments]
      setComments(next)
      try {
        localStorage.setItem(DEMO_STORAGE_KEY, JSON.stringify(next))
      } catch {
        /* ignore */
      }
      setMessage('')
      setSubmitting(false)
      setNotice('Komentar tersimpan (mode demo: hanya tampil di browser ini).')
      return
    }

    // ---- Mode Supabase ----
    const { data, error } = await supabase
      .from('comments')
      .insert({ name: cleanName, role: cleanRole, message: cleanMessage })
      .select('id, name, role, message, created_at')
      .single()

    if (!mountedRef.current) return
    setSubmitting(false)

    if (error) {
      setFormError('Gagal mengirim komentar. Coba lagi sebentar lagi.')
      return
    }

    // Tambahkan optimistis (jika realtime belum sempat terkirim).
    setComments((prev) =>
      prev.some((c) => c.id === data.id) ? prev : [data, ...prev],
    )
    setMessage('')
    setNotice('Terima kasih! Komentarmu sudah tampil. 🎉')
  }

  const remaining = MAX_MESSAGE - message.length
  const count = comments.length

  return (
    <section
      id="komentar"
      className="scroll-mt-16 relative overflow-hidden bg-grid-paper py-20 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
    >
      <div className="relative z-10 mx-auto max-w-4xl px-5 sm:px-6 lg:px-8" style={{ zoom: 0.8 }}>
        {/* ================= Header ================= */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-purple-200 px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-900" />
              Buku Tamu
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-[#bef264] px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              {count} Komentar
            </span>
          </div>

          <h2 className="text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Tinggalkan Komentar
          </h2>

          <p className="mt-4 max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Punya pendapat, saran, atau pertanyaan seputar analisis SWOT Indonesia?
            Bagikan di buku tamu ini dan biarkan pengunjung lain ikut membacanya.
          </p>

          <div className="mt-6 flex items-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* ================= Mode Demo Banner ================= */}
        {!isSupabaseConfigured && (
          <div className="mb-6 flex items-start gap-3 rounded-2xl border-2 border-slate-900 bg-[#fef9c3] px-4 py-3 shadow-[4px_4px_0px_0px_#0f172a]">
            <span className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-lg border-2 border-slate-900 bg-amber-300 text-xs font-black">
              !
            </span>
            <p className="text-xs font-bold leading-relaxed text-slate-800">
              <span className="font-black">Mode demo.</span> Database belum tersambung, jadi
              komentar hanya tersimpan di browser ini. Ikuti panduan{' '}
              <code className="rounded bg-slate-900 px-1 py-0.5 font-mono text-[11px] text-[#bef264]">
                SUPABASE_SETUP.md
              </code>{' '}
              agar komentar terlihat oleh semua pengunjung.
            </p>
          </div>
        )}

        {/* ================= Form ================= */}
        <form
          onSubmit={handleSubmit}
          className="mb-12 rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-[6px_6px_0px_0px_#0f172a] sm:p-7"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="comment-name"
                className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-700"
              >
                Nama <span className="text-rose-500">*</span>
              </label>
              <input
                id="comment-name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value.slice(0, MAX_NAME))}
                placeholder="Nama kamu"
                maxLength={MAX_NAME}
                required
                className="w-full rounded-xl border-2 border-slate-900 bg-[#fbf9ed] px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>

            <div>
              <label
                htmlFor="comment-role"
                className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-700"
              >
                Sekolah / Asal <span className="font-semibold normal-case text-slate-400">(opsional)</span>
              </label>
              <input
                id="comment-role"
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value.slice(0, MAX_ROLE))}
                placeholder="cth. SMAN 1 Jakarta"
                maxLength={MAX_ROLE}
                className="w-full rounded-xl border-2 border-slate-900 bg-[#fbf9ed] px-3.5 py-2.5 text-sm font-semibold text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
              />
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="comment-message"
              className="mb-1.5 block text-xs font-black uppercase tracking-wider text-slate-700"
            >
              Komentar <span className="text-rose-500">*</span>
            </label>
            <textarea
              id="comment-message"
              value={message}
              onChange={(e) => setMessage(e.target.value.slice(0, MAX_MESSAGE))}
              placeholder="Tulis pendapat atau kesanmu tentang website ini..."
              rows={4}
              maxLength={MAX_MESSAGE}
              required
              className="w-full resize-y rounded-xl border-2 border-slate-900 bg-[#fbf9ed] px-3.5 py-2.5 text-sm font-semibold leading-relaxed text-slate-900 placeholder:text-slate-400 focus:border-purple-600 focus:bg-white focus:outline-none focus:ring-2 focus:ring-purple-300"
            />
            <div className="mt-1 flex justify-end">
              <span
                className={`text-[11px] font-bold tabular-nums ${
                  remaining < 40 ? 'text-rose-500' : 'text-slate-400'
                }`}
              >
                {message.length}/{MAX_MESSAGE}
              </span>
            </div>
          </div>

          {/* Pesan error / sukses */}
          {formError && (
            <p className="mt-2 rounded-xl border-2 border-rose-500 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
              {formError}
            </p>
          )}
          {notice && (
            <p className="mt-2 rounded-xl border-2 border-slate-900 bg-[#bef264] px-3 py-2 text-xs font-bold text-slate-900">
              {notice}
            </p>
          )}

          <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[11px] font-semibold text-slate-400">
              Mohon jaga sopan santun dalam berkomentar. 🙏
            </p>
            <button
              type="submit"
              disabled={submitting}
              className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-[#bef264] px-5 py-2.5 text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Spinner /> Mengirim...
                </>
              ) : (
                <>
                  <SendIcon /> Kirim Komentar
                </>
              )}
            </button>
          </div>
        </form>

        {/* ================= Daftar Komentar ================= */}
        <div>
          <div className="mb-5 flex items-center justify-between">
            <h3 className="text-lg font-black tracking-tight text-slate-900 sm:text-xl">
              Komentar Pengunjung
            </h3>
            {isSupabaseConfigured && (
              <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-900 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                Live
              </span>
            )}
          </div>

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 py-12 text-sm font-bold text-slate-500">
              <Spinner /> Memuat komentar...
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border-2 border-rose-500 bg-rose-50 px-4 py-6 text-center text-sm font-bold text-rose-700">
              Gagal memuat komentar. Periksa koneksi atau konfigurasi Supabase.
            </div>
          )}

          {status === 'ready' && count === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 px-4 py-14 text-center">
              <div className="mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl border-2 border-slate-900 bg-[#fef9c3] shadow-[3px_3px_0px_0px_#0f172a]">
                <ChatIcon />
              </div>
              <p className="text-sm font-black text-slate-900">Belum ada komentar</p>
              <p className="mt-1 text-xs font-semibold text-slate-500">
                Jadi yang pertama membagikan pendapatmu!
              </p>
            </div>
          )}

          {status === 'ready' && count > 0 && (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </ul>
          )}
        </div>
      </div>
    </section>
  )
}

// ---------------------------------------------------------------------------
// Ikon
// ---------------------------------------------------------------------------
function SendIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 2 11 13" />
      <path d="M22 2 15 22l-4-9-9-4 20-7Z" />
    </svg>
  )
}

function ChatIcon() {
  return (
    <svg className="h-6 w-6 text-slate-900" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5Z" />
    </svg>
  )
}

function Spinner() {
  return (
    <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-90" fill="currentColor" d="M4 12a8 8 0 0 1 8-8V0C5.4 0 0 5.4 0 12h4Z" />
    </svg>
  )
}
