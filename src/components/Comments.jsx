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

// Rotasi organik untuk efek pinboard / sticky notes melayang
const CARD_ROTATIONS = ['-1.2deg', '1.6deg', '-0.8deg', '1.4deg', '-1.5deg', '0.9deg']

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
// Sub-komponen: kartu satu komentar (Floating & Draggable on Open Wall)
// ---------------------------------------------------------------------------
function CommentCard({ comment, index, containerRef, isNew, onMove }) {
  const avatar = useMemo(() => pickAvatar(comment.name), [comment.name])
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const [zIndex, setZIndex] = useState(1)

  const cardRef = useRef(null)
  const dragInfo = useRef({
    startX: 0,
    startY: 0,
    initialX: 0,
    initialY: 0,
    containerRect: null,
    cardRect: null,
  })

  const baseRotation = CARD_ROTATIONS[index % CARD_ROTATIONS.length]

  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return
    const target = e.target
    if (target.closest('a, button, input, textarea')) return

    const card = cardRef.current
    const container = containerRef?.current
    if (!card || !container) return

    const cRect = container.getBoundingClientRect()
    const cardR = card.getBoundingClientRect()

    dragInfo.current = {
      startX: e.clientX,
      startY: e.clientY,
      initialX: position.x,
      initialY: position.y,
      containerRect: cRect,
      cardRect: cardR,
    }

    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }

    setIsDragging(true)
    setZIndex(40)
  }

  const handlePointerMove = (e) => {
    if (!isDragging) return

    const { startX, startY, initialX, initialY, containerRect, cardRect } = dragInfo.current
    if (!containerRect || !cardRect) return

    const deltaX = e.clientX - startX
    const deltaY = e.clientY - startY

    if (onMove && Math.hypot(deltaX, deltaY) > 4) {
      onMove()
    }

    const PADDING = 8

    // Batasi pergerakan agar kartu tidak keluar dari batas kanvas terbuka & tidak menyebabkan scrollbar horizontal
    const minDeltaX = (containerRect.left + PADDING) - cardRect.left
    const maxDeltaX = (containerRect.right - PADDING) - cardRect.right
    const minDeltaY = (containerRect.top + PADDING) - cardRect.top
    const maxDeltaY = (containerRect.bottom - PADDING) - cardRect.bottom

    let clampedDeltaX = deltaX
    if (minDeltaX <= maxDeltaX) {
      clampedDeltaX = Math.max(minDeltaX, Math.min(maxDeltaX, deltaX))
    } else {
      clampedDeltaX = 0
    }

    let clampedDeltaY = deltaY
    if (minDeltaY <= maxDeltaY) {
      clampedDeltaY = Math.max(minDeltaY, Math.min(maxDeltaY, deltaY))
    } else {
      clampedDeltaY = 0
    }

    setPosition({
      x: initialX + clampedDeltaX,
      y: initialY + clampedDeltaY,
    })
  }

  const handlePointerUp = (e) => {
    if (!isDragging) return
    setIsDragging(false)
    try {
      e.currentTarget.releasePointerCapture(e.pointerId)
    } catch {
      /* ignore */
    }
  }

  const bobClass = `comment-bob-${(index % 4) + 1}`

  return (
    <div
      ref={cardRef}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className={`comment-card-wrapper relative select-none touch-none ${
        isNew ? 'animate-new-comment' : ''
      }`}
      style={{
        transform: `translate3d(${position.x}px, ${position.y}px, 0) rotate(${isDragging ? '0deg' : baseRotation}) scale(${isDragging ? 1.04 : 1})`,
        zIndex: isDragging ? 50 : zIndex,
        transition: isDragging ? 'none' : 'transform 0.45s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.25s ease',
        cursor: isDragging ? 'grabbing' : 'grab',
      }}
    >
      <div className={`comment-card-inner ${isDragging ? '' : bobClass}`}>
        <article
          className={`flex gap-3.5 rounded-2xl border-2 border-slate-900 bg-white p-4 transition-all duration-200 sm:p-5 ${
            isDragging
              ? 'shadow-[10px_10px_0px_0px_#0f172a] ring-2 ring-slate-900/15'
              : isNew
                ? 'shadow-[6px_6px_0px_0px_#0f172a] ring-2 ring-[#bef264]'
                : 'shadow-[4px_4px_0px_0px_#0f172a] hover:shadow-[6px_6px_0px_0px_#0f172a]'
          }`}
        >
          {/* Avatar */}
          <span
            aria-hidden="true"
            className={`flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl border-2 border-slate-900 text-lg font-black text-slate-900 ${avatar.bg}`}
          >
            {avatar.initial}
          </span>

          <div className="min-w-0 flex-1">
            {/* Header: nama + role + waktu + drag grip */}
            <div className="flex flex-wrap items-baseline justify-between gap-x-2 gap-y-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <span className="text-sm font-black tracking-tight text-slate-900">
                  {comment.name}
                </span>
                {comment.role ? (
                  <span className="rounded-md border border-slate-900 bg-[#fef9c3] px-1.5 py-0.5 text-[10px] font-black uppercase tracking-wide text-slate-900">
                    {comment.role}
                  </span>
                ) : null}
                {isNew && (
                  <span className="rounded-md border border-slate-900 bg-[#bef264] px-1.5 py-0.5 text-[10px] font-black text-slate-950 shadow-[1px_1px_0px_0px_#0f172a] animate-pulse">
                    ✨ Baru
                  </span>
                )}
                <span className="text-[11px] font-semibold text-slate-400">
                  • {formatRelative(comment.created_at)}
                </span>
              </div>

              {/* Indikator geser */}
              <span
                aria-hidden="true"
                className="flex items-center gap-1 rounded-md border border-slate-900/20 bg-slate-50 px-1.5 py-0.5 text-[9px] font-bold text-slate-500 opacity-60 transition-opacity hover:opacity-100"
                title="Tarik untuk memindahkan kartu ini di papan"
              >
                <GripIcon />
                <span className="hidden sm:inline">Geser</span>
              </span>
            </div>

            {/* Isi pesan */}
            <p className="mt-2 whitespace-pre-line break-words text-sm leading-relaxed text-slate-700">
              {comment.message}
            </p>
          </div>
        </article>
      </div>
    </div>
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

  // State buka/tutup form komentar
  const [isFormOpen, setIsFormOpen] = useState(true)

  // ID komentar terbaru untuk trigger entrance pop
  const [newCommentId, setNewCommentId] = useState(null)

  // State untuk interaksi drag & reset posisi kartu
  const [resetKey, setResetKey] = useState(0)
  const [hasMovedCards, setHasMovedCards] = useState(false)
  const boardRef = useRef(null)

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
      setNewCommentId(entry.id)
      setIsFormOpen(false) // Otomatis menutup formulir agar kanvas komentar melayang langsung melebar!
      setNotice('Komentarmu berhasil ditambahkan dan sedang melayang di papan! 🎉')
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
    setNewCommentId(data.id)
    setIsFormOpen(false) // Otomatis menutup formulir agar kanvas komentar melayang langsung melebar!
    setNotice('Terima kasih! Komentarmu berhasil ditambahkan dan sedang melayang di papan! 🎉')
  }

  const remaining = MAX_MESSAGE - message.length
  const count = comments.length

  return (
    <section
      id="komentar"
      className="scroll-mt-16 relative overflow-hidden bg-grid-paper py-20 shadow-[0_12px_32px_rgba(15,23,42,0.12)]"
    >
      <div className="relative z-10 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        {/* ================= Header ================= */}
        <div className="mb-10 sm:mb-12">
          <div className="mb-6 flex flex-wrap items-center justify-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-purple-200 px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-slate-900" />
              Buku Tamu
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-[#bef264] px-4 py-1 text-xs font-black text-slate-950 shadow-[2px_2px_0px_0px_#0f172a]">
              {count} Komentar
            </span>
          </div>

          <h2 className="text-center text-[1.275rem] font-black leading-tight tracking-tight text-slate-900 sm:text-[1.53rem] lg:text-[2.04rem]">
            Tinggalkan Komentar
          </h2>

          <p className="mx-auto mt-4 max-w-2xl text-center text-base leading-relaxed text-slate-600 sm:text-lg">
            Punya pendapat, saran, atau pertanyaan seputar analisis SWOT Indonesia?
            Bagikan di buku tamu ini dan biarkan pengunjung lain ikut membacanya di papan melayang terbuka.
          </p>

          <div className="mt-6 flex items-center justify-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* ================= Pesan Sukses / Notifikasi Floating ================= */}
        {notice && (
          <div className="mb-6 flex items-center justify-between gap-3 rounded-2xl border-2 border-slate-900 bg-[#bef264] px-4 py-3 shadow-[4px_4px_0px_0px_#0f172a] animate-fade-in-up">
            <span className="text-xs sm:text-sm font-black text-slate-900">
              {notice}
            </span>
            <button
              type="button"
              onClick={() => setNotice('')}
              className="text-xs font-bold text-slate-900 underline hover:text-slate-700 cursor-pointer"
            >
              Tutup
            </button>
          </div>
        )}

        {/* ================= Form Wrapper (Bisa ditutup & dibuka otomatis) ================= */}
        <div
          className={`mx-auto max-w-3xl transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isFormOpen
              ? 'max-h-[1400px] opacity-100 scale-100 translate-y-0 mb-12 pointer-events-auto'
              : 'max-h-0 opacity-0 scale-95 -translate-y-4 mb-0 pointer-events-none overflow-hidden'
          }`}
        >
          <form
            onSubmit={handleSubmit}
            className="relative rounded-2xl border-2 border-slate-900 bg-white p-5 shadow-[6px_6px_0px_0px_#0f172a] sm:p-7"
          >
            {/* Tombol X Tutup Form di pojok kanan atas */}
            <button
              type="button"
              onClick={() => setIsFormOpen(false)}
              aria-label="Tutup form komentar"
              className="absolute top-4 right-4 sm:top-5 sm:right-5 z-10 flex h-8 w-8 items-center justify-center rounded-full border-2 border-slate-900 bg-rose-200 text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] transition-all hover:bg-rose-300 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none active:translate-x-[2px] active:translate-y-[2px] cursor-pointer"
              title="Tutup formulir komentar"
            >
              <CloseIcon />
            </button>

            {/* Header bar form agar tombol X tidak menutupi input */}
            <div className="mb-4 flex items-center gap-2 border-b-2 border-slate-900/10 pb-3 pr-10">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg border-2 border-slate-900 bg-[#bef264] text-xs font-black shadow-[1.5px_1.5px_0px_0px_#0f172a]">
                ✍️
              </span>
              <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-slate-900">
                Formulir Komentar
              </span>
            </div>

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

            {/* Pesan error */}
            {formError && (
              <p className="mt-2 rounded-xl border-2 border-rose-500 bg-rose-50 px-3 py-2 text-xs font-bold text-rose-700">
                {formError}
              </p>
            )}

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[11px] font-semibold text-slate-400">
                Mohon jaga sopan santun dalam berkomentar. 🙏
              </p>
              <button
                type="submit"
                disabled={submitting}
                className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-[#bef264] px-5 py-2.5 text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#0f172a] disabled:cursor-not-allowed disabled:opacity-60 cursor-pointer"
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
        </div>

        {/* ================= Papan Komentar Pengunjung (Open Floating Canvas) ================= */}
        <div className="w-full">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3 border-b-2 border-slate-900/10 pb-4">
            <div className="flex items-center gap-2.5">
              <h3 className="text-center text-xl sm:text-2xl font-black tracking-tight text-slate-900">
                Papan Komentar Pengunjung
              </h3>
              {isSupabaseConfigured && (
                <span className="inline-flex items-center gap-1.5 rounded-lg border-2 border-slate-900 bg-white px-2.5 py-1 text-[10px] font-black uppercase tracking-wide text-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-500" />
                  Live
                </span>
              )}
            </div>

            <div className="flex flex-wrap items-center gap-2.5">
              {/* Tombol Tulis Komentar jika form ditutup */}
              {!isFormOpen && (
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-[#bef264] px-4 py-2 text-xs sm:text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] transition-all hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#0f172a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none animate-fade-in-up cursor-pointer"
                >
                  <SendIcon />
                  <span>Tulis Komentar</span>
                </button>
              )}

              {/* Tombol Reset Posisi jika kartu pernah digeser */}
              {count > 0 && hasMovedCards && (
                <button
                  type="button"
                  onClick={() => {
                    setResetKey((k) => k + 1)
                    setHasMovedCards(false)
                  }}
                  className="inline-flex items-center gap-1.5 rounded-xl border-2 border-slate-900 bg-white px-3 py-2 text-xs font-black text-slate-700 shadow-[2px_2px_0px_0px_#0f172a] transition-all hover:bg-slate-50 hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer"
                  title="Kembalikan posisi kartu ke posisi awal"
                >
                  <RefreshIcon />
                  <span className="hidden sm:inline">Reset Posisi</span>
                </button>
              )}
            </div>
          </div>

          {status === 'loading' && (
            <div className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-300 bg-white/60 py-16 text-sm font-bold text-slate-500">
              <Spinner /> Memuat komentar...
            </div>
          )}

          {status === 'error' && (
            <div className="rounded-2xl border-2 border-rose-500 bg-rose-50 px-4 py-8 text-center text-sm font-bold text-rose-700">
              Gagal memuat komentar. Periksa koneksi atau konfigurasi Supabase.
            </div>
          )}

          {/* Empty State */}
          {status === 'ready' && count === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl border-2 border-slate-900 bg-[#fef9c3] shadow-[4px_4px_0px_0px_#0f172a] animate-float-1">
                <ChatIcon />
              </div>
              <h4 className="text-center text-base sm:text-lg font-black text-slate-900">Belum Ada Komentar</h4>
              <p className="mt-1 max-w-sm text-xs sm:text-sm font-semibold text-slate-500">
                Jadilah yang pertama menulis di papan komentar terbuka ini!
              </p>
              {!isFormOpen && (
                <button
                  type="button"
                  onClick={() => setIsFormOpen(true)}
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-[#bef264] px-5 py-2.5 text-xs sm:text-sm font-black text-slate-950 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[1px_1px_0px_0px_#0f172a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-all cursor-pointer"
                >
                  <SendIcon /> Tulis Komentar Pertama
                </button>
              )}
            </div>
          )}

          {/* Open Floating Canvas / Wall */}
          {status === 'ready' && count > 0 && (
            <div
              ref={boardRef}
              className={`relative w-full transition-all duration-500 ${
                !isFormOpen
                  ? 'min-h-[640px] sm:min-h-[720px] lg:min-h-[820px]'
                  : 'min-h-[460px] sm:min-h-[540px]'
              }`}
            >
              {/* Petunjuk kanvas melayang terbuka */}
              <div className="mb-4 flex items-center justify-between text-[11px] font-bold text-slate-500">
                <span className="inline-flex items-center gap-2 rounded-lg bg-slate-900/5 px-2.5 py-1">
                  <span className="inline-block h-2 w-2 rounded-full border border-slate-900 bg-[#bef264]" />
                  <span>
                    ✨ <strong className="font-black text-slate-900">Papan bebas:</strong> geser kartu ke mana saja di area ini!
                  </span>
                </span>
                <span className="hidden sm:inline text-[10px] font-semibold text-slate-400">
                  {count} pesan melayang
                </span>
              </div>

              {/* Grid kartu komentar melayang & tersebar di kanvas terbuka */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-7 relative">
                {comments.map((comment, index) => (
                  <CommentCard
                    key={`${comment.id}-${resetKey}`}
                    comment={comment}
                    index={index}
                    containerRef={boardRef}
                    isNew={comment.id === newCommentId}
                    onMove={() => setHasMovedCards(true)}
                  />
                ))}
              </div>
            </div>
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

function CloseIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  )
}

function GripIcon() {
  return (
    <svg className="h-3.5 w-3.5 text-slate-500" viewBox="0 0 24 24" fill="currentColor">
      <circle cx="9" cy="6" r="1.6" />
      <circle cx="15" cy="6" r="1.6" />
      <circle cx="9" cy="12" r="1.6" />
      <circle cx="15" cy="12" r="1.6" />
      <circle cx="9" cy="18" r="1.6" />
      <circle cx="15" cy="18" r="1.6" />
    </svg>
  )
}

function RefreshIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  )
}
