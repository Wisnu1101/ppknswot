import React, { useState, useEffect, useMemo, useCallback, useRef } from "react";

/* ------------------------------------------------------------------ */
/*  DATA: 15 pertanyaan (ubah sesuai kebutuhan)                        */
/*  answer = index opsi yang benar (0 = A, 1 = B, 2 = C, 3 = D)        */
/* ------------------------------------------------------------------ */
const QUESTIONS = [
  { q: "Which planet is known as the Red Planet?", options: ["Venus", "Mars", "Jupiter", "Mercury"], answer: 1 },
  { q: "What is the capital city of Japan?", options: ["Osaka", "Kyoto", "Tokyo", "Nagoya"], answer: 2 },
  { q: "How many continents are there on Earth?", options: ["5", "6", "7", "8"], answer: 2 },
  { q: "Which gas do plants absorb from the atmosphere for photosynthesis?", options: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"], answer: 1 },
  { q: "Who painted the Mona Lisa?", options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Claude Monet"], answer: 2 },
  { q: "What is the largest ocean on Earth?", options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"], answer: 3 },
  { q: "What is the chemical symbol for water?", options: ["H2O", "CO2", "O2", "NaCl"], answer: 0 },
  { q: "Which is the longest river in the world (commonly cited)?", options: ["Amazon", "Nile", "Yangtze", "Mississippi"], answer: 1 },
  { q: "What is 12 × 12?", options: ["124", "132", "144", "156"], answer: 2 },
  { q: "Which language has the most native speakers worldwide?", options: ["English", "Spanish", "Hindi", "Mandarin Chinese"], answer: 3 },
  { q: "In which year did World War II end?", options: ["1943", "1945", "1947", "1950"], answer: 1 },
  { q: "What is the hardest natural substance on Earth?", options: ["Gold", "Iron", "Diamond", "Quartz"], answer: 2 },
  { q: "Which organ pumps blood throughout the human body?", options: ["Liver", "Lungs", "Kidney", "Heart"], answer: 3 },
  { q: "What is the smallest prime number?", options: ["0", "1", "2", "3"], answer: 2 },
  { q: "Which country gifted the Statue of Liberty to the United States?", options: ["United Kingdom", "France", "Spain", "Italy"], answer: 1 },
];

const TOTAL_TIME = 15 * 60; // detik (15 menit)
const LETTERS = ["A", "B", "C", "D"];
const PARTY_COLORS = ["#ff3e79", "#ffcf4a", "#9be85f", "#2fe7d6", "#7d49e5"];
const PARTY_PARTICLES = Array.from({ length: 30 }, (_, index) => ({
  left: `${8 + ((index * 37) % 84)}%`,
  x: `${((index * 53) % 320) - 160}px`,
  y: `${90 + ((index * 31) % 190)}px`,
  rotation: `${(index % 2 ? 1 : -1) * (160 + (index * 29) % 360)}deg`,
  delay: `${(index % 7) * 35}ms`,
  color: PARTY_COLORS[index % PARTY_COLORS.length],
  round: index % 4 === 0,
}));

const formatTime = (s) => {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${String(m).padStart(2, "0")}:${String(sec).padStart(2, "0")}`;
};

/* ------------------------------------------------------------------ */
/*  Ilustrasi (SVG inline, karakter orisinal)                          */
/* ------------------------------------------------------------------ */
function Mascot() {
  return (
    <svg viewBox="0 0 220 150" className="qz-mascot" aria-hidden="true">
      {/* antena */}
      <line x1="110" y1="22" x2="110" y2="6" stroke="#7c3aed" strokeWidth="4" strokeLinecap="round" />
      <circle cx="110" cy="6" r="6" fill="#ef4470" />
      {/* badan */}
      <path d="M30 150 C22 80 55 24 110 24 C165 24 198 80 190 150 Z" fill="#8b5cf6" />
      <path d="M52 150 C48 96 72 52 110 52 C148 52 172 96 168 150 Z" fill="#a78bfa" opacity=".55" />
      {/* telinga */}
      <circle cx="34" cy="70" r="14" fill="#7c3aed" />
      <circle cx="186" cy="70" r="14" fill="#7c3aed" />
      {/* mata */}
      <circle cx="82" cy="80" r="17" fill="#fff" />
      <circle cx="138" cy="80" r="17" fill="#fff" />
      <circle cx="86" cy="82" r="8" fill="#1e1b4b" />
      <circle cx="134" cy="82" r="8" fill="#1e1b4b" />
      <circle cx="89" cy="79" r="2.6" fill="#fff" />
      <circle cx="137" cy="79" r="2.6" fill="#fff" />
      {/* mulut */}
      <path d="M90 112 Q110 132 130 112" fill="none" stroke="#1e1b4b" strokeWidth="5" strokeLinecap="round" />
      {/* pipi */}
      <circle cx="66" cy="106" r="7" fill="#f472b6" opacity=".6" />
      <circle cx="154" cy="106" r="7" fill="#f472b6" opacity=".6" />
      {/* tangan di tepi kartu */}
      <ellipse cx="40" cy="146" rx="20" ry="11" fill="#7c3aed" />
      <ellipse cx="180" cy="146" rx="20" ry="11" fill="#7c3aed" />
    </svg>
  );
}

function Medal({ tier }) {
  const palette = {
    gold: { ring: "#f59e0b", face: "#fcd34d", ribbonA: "#14b8a6", ribbonB: "#fbbf24" },
    silver: { ring: "#94a3b8", face: "#e2e8f0", ribbonA: "#6366f1", ribbonB: "#a5b4fc" },
    bronze: { ring: "#b45309", face: "#f59e0b", ribbonA: "#ef4470", ribbonB: "#fda4af" },
  }[tier];
  return (
    <svg viewBox="0 0 120 140" className="qz-medal" aria-hidden="true">
      <path d="M32 0 h24 l14 44 h-24 z" fill={palette.ribbonA} />
      <path d="M88 0 h-24 l-14 44 h24 z" fill={palette.ribbonB} />
      <circle cx="60" cy="90" r="40" fill={palette.ring} />
      <circle cx="60" cy="90" r="30" fill={palette.face} />
      <path
        d="M60 70 l6.2 12.6 13.9 2 -10 9.8 2.4 13.8 -12.5-6.5 -12.5 6.5 2.4-13.8 -10-9.8 13.9-2z"
        fill="#fff"
        opacity=".9"
      />
    </svg>
  );
}

function Sparkle({ style }) {
  return (
    <svg viewBox="0 0 24 24" className="qz-sparkle" style={style} aria-hidden="true">
      <path d="M12 0 L14.5 9.5 L24 12 L14.5 14.5 L12 24 L9.5 14.5 L0 12 L9.5 9.5 Z" fill="currentColor" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Komponen utama                                                     */
/* ------------------------------------------------------------------ */
export default function Quiz() {
  const [stage, setStage] = useState("splash"); // splash | quiz | result
  const [isStageExiting, setIsStageExiting] = useState(false);
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState(() => Array(QUESTIONS.length).fill(null));
  const [review, setReview] = useState(() => Array(QUESTIONS.length).fill(false));
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [confirmFinish, setConfirmFinish] = useState(false);
  const [toast, setToast] = useState("");
  const toastTimer = useRef(null);
  const stageTransitionTimer = useRef(null);

  const total = QUESTIONS.length;
  const answeredCount = answers.filter((a) => a !== null).length;
  const progress = Math.round((answeredCount / total) * 100);

  const transitionToStage = useCallback((nextStage) => {
    if (nextStage === stage) return;
    window.clearTimeout(stageTransitionTimer.current);
    setIsStageExiting(true);
    stageTransitionTimer.current = window.setTimeout(() => {
      setStage(nextStage);
      setIsStageExiting(false);
      stageTransitionTimer.current = null;
    }, 220);
  }, [stage]);

  /* ---------- Timer mundur ---------- */
  useEffect(() => {
    if (stage !== "quiz") return undefined;
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, [stage]);

  useEffect(() => {
    if (stage === "quiz" && timeLeft === 0) {
      setConfirmFinish(false);
      transitionToStage("result");
    }
  }, [timeLeft, stage, transitionToStage]);

  useEffect(() => () => {
    clearTimeout(toastTimer.current);
    clearTimeout(stageTransitionTimer.current);
  }, []);

  /* ---------- Skor ---------- */
  const result = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let skipped = 0;
    answers.forEach((a, i) => {
      if (a === null) skipped += 1;
      else if (a === QUESTIONS[i].answer) correct += 1;
      else wrong += 1;
    });
    const percent = Math.round((correct / total) * 100);
    const tier = percent >= 80 ? "gold" : percent >= 50 ? "silver" : "bronze";
    const message =
      percent >= 80 ? "Excellent work!" : percent >= 50 ? "Good job, keep going!" : "Keep practicing, you'll get there!";
    return { correct, wrong, skipped, percent, tier, message };
  }, [answers, total]);

  /* ---------- Aksi ---------- */
  const startQuiz = useCallback(() => {
    setCurrent(0);
    transitionToStage("quiz");
  }, [transitionToStage]);

  const selectOption = (idx) => {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = idx;
      return next;
    });
  };

  const toggleReview = () => {
    setReview((prev) => {
      const next = [...prev];
      next[current] = !next[current];
      return next;
    });
  };

  const goNext = () => setCurrent((c) => Math.min(c + 1, total - 1));
  const goPrev = () => setCurrent((c) => Math.max(c - 1, 0));

  const requestFinish = () => {
    if (answeredCount < total) setConfirmFinish(true);
    else transitionToStage("result");
  };

  const retake = () => {
    setAnswers(Array(total).fill(null));
    setReview(Array(total).fill(false));
    setCurrent(0);
    setTimeLeft(TOTAL_TIME);
    setConfirmFinish(false);
    transitionToStage("splash");
  };

  const showToast = (msg) => {
    setToast(msg);
    clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToast(""), 2500);
  };

  const shareScore = async () => {
    const text = `I scored ${result.percent}% (${result.correct}/${total} correct) on the Genius Quiz! Can you beat me?`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Genius Quiz", text });
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(text);
        showToast("Score copied to clipboard!");
      } else {
        showToast(text);
      }
    } catch (e) {
      /* pengguna membatalkan share — abaikan */
    }
  };

  const q = QUESTIONS[current];
  const isLast = current === total - 1;
  const lowTime = timeLeft <= 60;

  return (
    <div id="quiz" className="qz-root" data-stage={stage}>
      <style>{CSS}</style>

      <header className="qz-section-heading">
        <div className="qz-section-heading-inner">
          <div className="qz-section-heading-pills mb-6 flex flex-wrap items-center gap-2.5">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-purple-200/80 bg-purple-100 px-4 py-1.5 text-xs font-bold text-purple-800 shadow-xs">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-purple-500" />
              Quiz
            </span>
            <span className="inline-flex items-center rounded-full border border-lime-200/80 bg-[#e8fccf] px-4 py-1.5 text-xs font-bold text-lime-900 shadow-xs">
              Kuis Interaktif
            </span>
          </div>

          <h1 className="mb-4 text-3xl font-black leading-tight tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Quiz Interaktif
          </h1>
          <p className="qz-section-heading-description max-w-2xl text-base leading-relaxed text-slate-500 sm:text-lg">
            Uji pemahaman tentang Pancasila, Wawasan Nusantara, dan pengetahuan umum Indonesia.
          </p>
          <div aria-hidden="true" className="qz-section-heading-accent mt-6 flex items-center gap-2">
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>
      </header>

      {/* ============== TAHAP 1: SPLASH ============== */}
      {stage === "splash" && (
        <section className={`qz-splash qz-stage-shell ${isStageExiting ? "is-exiting" : ""}`} aria-label="Welcome">
          <div className="qz-splash-inner">
            <div className="qz-mascot-wrap">
              <Mascot />
            </div>
            <div className="qz-welcome-card">
              <h1>Let&apos;s start Quiz!</h1>
              <p>
                Welcome to Genius, the place where knowledge and fun meet! Test your insight with various interesting
                questions.
              </p>
            </div>
            <button className="qz-btn qz-btn-pink" onClick={startQuiz}>
              Let&apos;s start game
            </button>
          </div>
        </section>
      )}

      {/* ============== TAHAP 2: QUIZ ============== */}
      {stage === "quiz" && (
        <section className={`qz-stage qz-stage-shell ${isStageExiting ? "is-exiting" : ""}`} aria-label="Quiz">
          <div className="qz-card">
            {/* Header */}
            <header className="qz-header">
              <div className="qz-title">
                <strong>Genius Mock Test</strong>
                <span>Session 1</span>
              </div>

              <div className="qz-progress">
                <span className="qz-progress-label" style={{ left: `${Math.min(progress, 92)}%` }}>
                  {progress}%
                </span>
                <div
                  className="qz-progress-track"
                  role="progressbar"
                  aria-valuenow={progress}
                  aria-valuemin={0}
                  aria-valuemax={100}
                >
                  <div className="qz-progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </div>

              <div className="qz-review-tools">
                {review[current] && <span className="qz-chip">review</span>}
                <button
                  className={`qz-chip-btn ${review[current] ? "is-on" : ""}`}
                  onClick={toggleReview}
                  aria-pressed={review[current]}
                >
                  Mark as review
                </button>
              </div>

              <div className={`qz-timer ${lowTime ? "is-low" : ""}`}>
                <span className="qz-timer-icon" aria-hidden="true">
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                    <circle cx="12" cy="13" r="8" />
                    <path d="M12 9v4l2.5 2M9 2h6" />
                  </svg>
                </span>
                <span>
                  <b>{formatTime(timeLeft)} Min</b>
                  <small>Time left</small>
                </span>
              </div>
            </header>

            {/* Body */}
            <div className="qz-body">
              <div className="qz-question-wrap">
                <div className="qz-qnum">
                  Question {current + 1} <span>/ {total}</span>
                </div>
                <h2 className="qz-question">{q.q}</h2>
                <hr />

                <div className="qz-options" role="radiogroup" aria-label={`Answers for question ${current + 1}`}>
                  {q.options.map((opt, i) => {
                    const selected = answers[current] === i;
                    return (
                      <button
                        key={i}
                        role="radio"
                        aria-checked={selected}
                        className={`qz-option ${selected ? "is-selected" : ""}`}
                        onClick={() => selectOption(i)}
                      >
                        <span className="qz-option-letter">{LETTERS[i]}</span>
                        <span className="qz-option-text">{opt}</span>
                        <span className="qz-radio" aria-hidden="true" />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Navigator nomor soal */}
            <nav className="qz-dots" aria-label="Question navigator">
              {QUESTIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  aria-label={`Go to question ${i + 1}`}
                  aria-current={i === current ? "true" : undefined}
                  className={[
                    "qz-dot",
                    i === current ? "is-current" : "",
                    answers[i] !== null ? "is-answered" : "",
                    review[i] ? "is-review" : "",
                  ].join(" ")}
                >
                  {i + 1}
                </button>
              ))}
            </nav>

            {/* Footer */}
            <footer className="qz-footer">
              <div className="qz-nav">
                <button className="qz-nav-btn" onClick={goPrev} disabled={current === 0}>
                  <span className="qz-arrow">←</span> Previous
                </button>
                <button className="qz-nav-btn is-next" onClick={goNext} disabled={isLast}>
                  Next <span className="qz-arrow">→</span>
                </button>
              </div>
              <button className="qz-btn qz-btn-purple qz-finish" onClick={requestFinish}>
                Finish
              </button>
            </footer>
          </div>

          {/* Konfirmasi selesai */}
          {confirmFinish && (
            <div className="qz-modal-backdrop" role="dialog" aria-modal="true" aria-label="Finish quiz?">
              <div className="qz-modal">
                <h3>Finish the quiz?</h3>
                <p>
                  You still have <b>{total - answeredCount}</b> unanswered question
                  {total - answeredCount > 1 ? "s" : ""}. Unanswered questions count as incorrect.
                </p>
                <div className="qz-modal-actions">
                  <button className="qz-btn qz-btn-ghost" onClick={() => setConfirmFinish(false)}>
                    Keep answering
                  </button>
                  <button
                    className="qz-btn qz-btn-purple"
                    onClick={() => {
                      setConfirmFinish(false);
                      transitionToStage("result");
                    }}
                  >
                    Finish anyway
                  </button>
                </div>
              </div>
            </div>
          )}
        </section>
      )}

      {/* ============== TAHAP 3: RESULT ============== */}
      {stage === "result" && (
        <section className={`qz-result qz-stage-shell ${isStageExiting ? "is-exiting" : ""}`} aria-label="Result">
          <div className="qz-party-burst" aria-hidden="true">
            {PARTY_PARTICLES.map((particle, index) => (
              <span
                key={index}
                className={`qz-party-piece ${particle.round ? "is-round" : ""}`}
                style={{
                  "--party-left": particle.left,
                  "--party-x": particle.x,
                  "--party-y": particle.y,
                  "--party-rotation": particle.rotation,
                  "--party-delay": particle.delay,
                  "--party-color": particle.color,
                }}
              />
            ))}
          </div>
          <div className="qz-result-inner">
            <h2 className="qz-result-title">Result Of Your Practice Test</h2>

            <div className="qz-ticket">
              <span className="qz-notch qz-notch-l" />
              <span className="qz-notch qz-notch-r" />

              <div className="qz-ticket-top">
                <p className="qz-congrats">Congratulations! You have scored</p>
                <div className="qz-score">{result.percent}%</div>
                <p className="qz-score-msg">{result.message}</p>
              </div>

              <div className="qz-perforation" />

              <div className="qz-ticket-bottom">
                <p className="qz-earned">You earned the badge</p>
                <div className="qz-medal-wrap">
                  <Sparkle style={{ top: 6, left: "18%", color: "#facc15", width: 22 }} />
                  <Sparkle style={{ bottom: 10, right: "18%", color: "#facc15", width: 18 }} />
                  <i className="qz-spot" style={{ left: "14%", bottom: 28, background: "#22c55e" }} />
                  <i className="qz-spot" style={{ right: "12%", top: 34, background: "#38bdf8" }} />
                  <Medal tier={result.tier} />
                </div>

                <div className="qz-summary">
                  <div className="qz-stat is-correct">
                    <b>{result.correct}</b>
                    <span>Correct</span>
                  </div>
                  <div className="qz-stat is-wrong">
                    <b>{result.wrong}</b>
                    <span>Wrong</span>
                  </div>
                  <div className="qz-stat is-skipped">
                    <b>{result.skipped}</b>
                    <span>Skipped</span>
                  </div>
                </div>
                <p className="qz-time-used">Time used: {formatTime(TOTAL_TIME - timeLeft)} Min</p>
              </div>
            </div>

            <div className="qz-result-actions">
              <button className="qz-btn qz-btn-pink" onClick={shareScore}>
                Share Score
              </button>
              <button className="qz-btn qz-btn-outline" onClick={retake}>
                Retake Quiz
              </button>
            </div>
          </div>
        </section>
      )}

      {toast && (
        <div className="qz-toast" role="status">
          {toast}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Styling                                                            */
/* ------------------------------------------------------------------ */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&display=swap');

.qz-root, .qz-root * { box-sizing: border-box; }
.qz-root {
  --purple: #6d45f0;
  --purple-dark: #5b34d6;
  --purple-soft: #e6e1fb;
  --pink: #ea4066;
  --ink: #1b1a3a;
  --muted: #8b8aa6;
  font-family: 'Poppins', system-ui, -apple-system, 'Segoe UI', sans-serif;
  color: var(--ink);
  min-height: 100vh;
  width: 100%;
  position: relative;
  overflow: hidden;
  scroll-margin-top: 64px;
}
.qz-root button { font-family: inherit; cursor: pointer; }
.qz-root button:focus-visible { outline: 3px solid rgba(109,69,240,.45); outline-offset: 2px; }

/* ---------- Buttons ---------- */
.qz-btn {
  border: 0; border-radius: 999px; padding: 14px 28px; font-weight: 600; font-size: 15px;
  transition: transform .15s ease, box-shadow .15s ease, background .15s ease;
}
.qz-btn:hover { transform: translateY(-1px); }
.qz-btn:active { transform: translateY(0); }
.qz-btn-pink { background: var(--pink); color: #fff; }
.qz-btn-pink:hover { background: #d9345a; }
.qz-btn-purple { background: var(--purple); color: #fff; }
.qz-btn-purple:hover { background: var(--purple-dark); }
.qz-btn-ghost { background: #f1effc; color: var(--purple); }
.qz-btn-outline { background: transparent; color: #fff; border: 2px solid rgba(255,255,255,.85); }
.qz-btn-outline:hover { background: rgba(255,255,255,.14); }

/* ---------- Splash ---------- */
.qz-splash {
  position: relative; width: 100%; min-height: 0; margin: 24px 0 32px;
  display: flex; justify-content: center; overflow: hidden;
  background: radial-gradient(120% 60% at 50% 32%, #ffd84a 0%, #ffe45f 55%, #ffd23c 100%);
  animation: qz-fade .4s ease;
}
.qz-splash-inner {
  position: relative; z-index: 2; width: 100%; max-width: 420px; padding: 32px 24px;
  display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 0; zoom: .8;
}
.qz-mascot-wrap { width: 100%; max-width: 250px; margin-bottom: -6px; position: relative; z-index: 2; animation: qz-float 3.2s ease-in-out infinite; }
.qz-mascot { width: 100%; display: block; }
.qz-welcome-card {
  width: 100%; background: #fff; border-radius: 6px; padding: 34px 26px 30px; text-align: center;
  box-shadow: 0 14px 30px rgba(120,90,0,.14);
}
.qz-welcome-card h1 { margin: 0 0 14px; font-size: 28px; font-weight: 700; }
.qz-welcome-card p { margin: 0; font-size: 13.5px; line-height: 1.7; color: #3b3a58; }
.qz-splash .qz-btn { margin-top: 24px; width: 100%; }
.qz-splash-inner .qz-welcome-card { margin-bottom: 0; }

/* ---------- Quiz stage ---------- */
.qz-stage {
  --purple: #ff3e79;
  --purple-dark: #e52f68;
  --purple-soft: #ffe3ec;
  --pink: #ff3e79;
  --ink: #302329;
  --muted: #8d7881;
  position: relative; width: 100%; min-height: 0; margin: 24px 0 32px;
  display: flex; align-items: center; justify-content: center; padding: 24px 16px; overflow: hidden;
  background: #fbf9ed;
  animation: qz-fade .4s ease;
}

.qz-card {
  position: relative; z-index: 2; width: 100%; max-width: 940px; background: #fff; border-radius: 22px;
  zoom: .8; box-shadow: 0 24px 48px rgba(122,63,22,.24); padding: 24px 32px 22px;
}

.qz-header {
  display: grid; grid-template-columns: auto 1fr auto auto; align-items: center; gap: 18px;
  padding-bottom: 16px;
}
.qz-title { display: flex; flex-direction: column; line-height: 1.35; padding-right: 20px; border-right: 1px solid #eee; }
.qz-title strong { font-size: 15px; font-weight: 600; }
.qz-title span { font-size: 13px; color: var(--muted); }

.qz-progress { position: relative; padding-top: 14px; min-width: 120px; }
.qz-progress-label { position: absolute; top: -2px; transform: translateX(-10%); font-size: 12px; color: var(--purple); font-weight: 600; transition: left .35s ease; }
.qz-progress-track { height: 10px; background: var(--purple-soft); border-radius: 999px; overflow: hidden; }
.qz-progress-fill { height: 100%; background: var(--purple); border-radius: 999px; transition: width .35s ease; }

.qz-review-tools { display: flex; align-items: center; gap: 8px; }
.qz-chip { background: #a0a4bd; color: #fff; font-size: 11px; font-weight: 600; padding: 4px 12px; border-radius: 999px; }
.qz-chip-btn { background: transparent; border: 1px solid #cfd0e0; color: var(--muted); font-size: 11px; padding: 4px 12px; border-radius: 999px; transition: all .15s; }
.qz-chip-btn:hover { border-color: var(--purple); color: var(--purple); }
.qz-chip-btn.is-on { background: #fff4d6; border-color: #f59e0b; color: #b45309; }

.qz-timer { display: flex; align-items: center; gap: 10px; padding-left: 22px; border-left: 1px solid #eee; color: var(--muted); }
.qz-timer-icon { width: 36px; height: 36px; border-radius: 50%; background: #ffe8ef; color: var(--purple); display: grid; place-items: center; }
.qz-timer b { display: block; font-size: 13px; font-weight: 500; color: #6d6c88; font-variant-numeric: tabular-nums; }
.qz-timer small { font-size: 10px; }
.qz-timer.is-low .qz-timer-icon { background: #ffe4ea; color: var(--pink); }
.qz-timer.is-low b { color: var(--pink); animation: qz-blink 1s steps(2) infinite; }

.qz-body { background: #fffafb; border-radius: 8px; padding: 28px 24px; }
.qz-question-wrap { max-width: 580px; margin: 0 auto; }
.qz-qnum { color: var(--muted); font-size: 14px; margin-bottom: 10px; }
.qz-qnum span { font-size: 12px; opacity: .7; }
.qz-question { margin: 0; font-size: 15.5px; font-weight: 500; line-height: 1.6; min-height: 50px; }
.qz-body hr { border: 0; border-top: 1px solid #f5dce4; margin: 16px -40px 20px; }

.qz-options { display: flex; flex-direction: column; gap: 10px; }
.qz-option {
  display: flex; align-items: center; gap: 16px; width: 100%; text-align: left; background: #fbfbfd;
  border: 1px solid #f1dce3; border-left: 1px solid #f1dce3; border-radius: 8px; padding: 12px 18px;
  color: var(--muted); font-size: 14px; transition: all .18s ease;
}
.qz-option:hover { border-color: #ff9ab8; background: #fff; }
.qz-option-letter { display: none; }
.qz-option-text { flex: 1; }
.qz-radio { width: 16px; height: 16px; border-radius: 50%; border: 2px solid var(--ink); position: relative; flex: none; background: #fff; }
.qz-option.is-selected {
  background: #fff; color: var(--ink); font-weight: 500; border-color: #fff; border-left: 4px solid var(--purple);
}
.qz-option.is-selected .qz-radio { border-color: var(--purple); }
.qz-option.is-selected .qz-radio::after { content: ""; position: absolute; inset: 2px; border-radius: 50%; background: var(--purple); }

.qz-dots { display: flex; flex-wrap: wrap; justify-content: center; gap: 6px; margin: 16px 0 4px; }
.qz-dot {
  width: 30px; height: 30px; border-radius: 50%; border: 1px solid #dcdcec; background: #fff; color: var(--muted);
  font-size: 12px; font-weight: 500; position: relative; transition: all .15s;
}
.qz-dot:hover { border-color: var(--purple); color: var(--purple); }
.qz-dot.is-answered { background: var(--purple-soft); border-color: var(--purple-soft); color: var(--purple); }
.qz-dot.is-review::after { content: ""; position: absolute; top: -2px; right: -2px; width: 9px; height: 9px; border-radius: 50%; background: #f59e0b; border: 2px solid #fff; }
.qz-dot.is-current { background: var(--purple); border-color: var(--purple); color: #fff; }

.qz-footer { display: flex; align-items: center; justify-content: space-between; margin-top: 14px; gap: 12px; }
.qz-nav { flex: 1; display: flex; justify-content: center; gap: 16px; padding-left: 90px; }
.qz-nav-btn {
  display: inline-flex; align-items: center; gap: 12px; background: #fff1f5; border: 0; border-radius: 999px;
  padding: 8px 16px 8px 9px; color: #765d67; font-size: 14px; min-width: 130px; justify-content: space-between; transition: all .15s;
}
.qz-nav-btn.is-next { padding: 8px 9px 8px 18px; }
.qz-nav-btn:hover:not(:disabled) { background: var(--purple-soft); color: var(--purple); }
.qz-nav-btn:disabled { opacity: .5; cursor: not-allowed; }
.qz-arrow { display: grid; place-items: center; width: 26px; height: 26px; border-radius: 50%; background: #ffe0ea; font-size: 14px; }
.qz-finish { min-width: 120px; padding: 12px 26px; font-size: 14px; }

/* ---------- Modal ---------- */
.qz-modal-backdrop { position: fixed; inset: 0; background: rgba(20,10,60,.55); display: grid; place-items: center; z-index: 20; padding: 20px; animation: qz-fade .2s ease; }
.qz-modal { background: #fff; border-radius: 18px; padding: 28px; max-width: 400px; width: 100%; text-align: center; box-shadow: 0 30px 60px rgba(0,0,0,.3); }
.qz-modal h3 { margin: 0 0 10px; font-size: 19px; }
.qz-modal p { margin: 0 0 22px; font-size: 14px; color: #5b5a77; line-height: 1.6; }
.qz-modal-actions { display: flex; gap: 10px; justify-content: center; flex-wrap: wrap; }
.qz-modal-actions .qz-btn { padding: 12px 20px; font-size: 14px; }

/* ---------- Result ---------- */
.qz-result {
  position: relative; width: 100%; min-height: 0; margin: 24px 0 32px;
  display: flex; justify-content: center; align-items: flex-start; padding: 18px 0; overflow: hidden;
  background: #ffe45f; animation: qz-fade .4s ease;
}
.qz-result-inner { position: relative; z-index: 2; width: 100%; max-width: 440px; padding: 30px 20px 36px; zoom: .8; }
.qz-result-title { margin: 0 0 22px; text-align: center; color: #302329; font-size: 18px; font-weight: 500; }
.qz-result .qz-btn-outline { color: #302329; border-color: rgba(48,35,41,.45); }
.qz-result .qz-btn-outline:hover { background: rgba(255,255,255,.4); }
.qz-ticket { position: relative; background: #fff; border-radius: 20px; overflow: visible; animation: qz-pop .5s cubic-bezier(.2,.9,.3,1.2); }
.qz-notch { position: absolute; top: 218px; width: 22px; height: 22px; border-radius: 50%; background: #ffe45f; }
.qz-notch-l { left: -11px; }
.qz-notch-r { right: -11px; }
.qz-ticket-top { padding: 34px 24px 28px; text-align: center; }
.qz-congrats { margin: 0 0 10px; font-size: 16px; font-weight: 500; max-width: 240px; margin-inline: auto; line-height: 1.5; }
.qz-score { font-size: 56px; font-weight: 700; line-height: 1.1; margin: 8px 0 4px; }
.qz-score-msg { margin: 0; font-size: 13px; color: var(--muted); }
.qz-perforation { border-top: 2px dashed #cfd2ea; margin: 0 20px; }
.qz-ticket-bottom { padding: 24px 24px 28px; text-align: center; }
.qz-earned { margin: 0; font-size: 14px; }
.qz-medal-wrap { position: relative; width: 190px; height: 150px; margin: 10px auto 6px; display: grid; place-items: center; }
.qz-medal { width: 110px; height: auto; animation: qz-swing 2.6s ease-in-out infinite; transform-origin: 50% 0; }
.qz-sparkle { position: absolute; }
.qz-spot { position: absolute; width: 8px; height: 8px; border-radius: 50%; }
.qz-summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-top: 8px; }
.qz-stat { border-radius: 14px; padding: 12px 6px; display: flex; flex-direction: column; gap: 2px; }
.qz-stat b { font-size: 22px; font-weight: 700; }
.qz-stat span { font-size: 11px; opacity: .8; }
.qz-stat.is-correct { background: #e7f8ee; color: #15803d; }
.qz-stat.is-wrong { background: #fde8ec; color: #be123c; }
.qz-stat.is-skipped { background: #eef0f7; color: #64668a; }
.qz-time-used { margin: 14px 0 0; font-size: 12px; color: var(--muted); }
.qz-result-actions { display: flex; flex-direction: column; gap: 12px; margin-top: 26px; }
.qz-result-actions .qz-btn { width: 100%; }
.qz-stage-shell { animation: qz-stage-enter .38s cubic-bezier(.2,.8,.2,1) both; }
.qz-stage-shell.is-exiting { pointer-events: none; animation: qz-stage-exit .22s ease-in both; }
.qz-party-burst { position: absolute; inset: 0; z-index: 1; overflow: hidden; pointer-events: none; }
.qz-party-piece {
  position: absolute; top: 18%; left: var(--party-left); width: 8px; height: 14px; border-radius: 2px;
  opacity: 0; background: var(--party-color);
  animation: qz-party-burst 1.5s cubic-bezier(.18,.66,.31,1) var(--party-delay) both;
}
.qz-party-piece.is-round { width: 9px; height: 9px; border-radius: 50%; }

/* ---------- Toast ---------- */
.qz-toast { position: fixed; left: 50%; bottom: 28px; transform: translateX(-50%); background: #1b1a3a; color: #fff; padding: 12px 20px; border-radius: 999px; font-size: 13px; z-index: 30; box-shadow: 0 10px 24px rgba(0,0,0,.3); animation: qz-fade .25s ease; }

/* ---------- Animations ---------- */
@keyframes qz-fade { from { opacity: 0; } to { opacity: 1; } }
@keyframes qz-pop { from { opacity: 0; transform: scale(.92) translateY(14px); } to { opacity: 1; transform: none; } }
@keyframes qz-stage-enter { from { opacity: 0; transform: translateY(18px) scale(.985); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes qz-stage-exit { to { opacity: 0; transform: translateY(-12px) scale(.99); } }
@keyframes qz-float { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
@keyframes qz-swing { 0%,100% { transform: rotate(-4deg); } 50% { transform: rotate(4deg); } }
@keyframes qz-blink { 50% { opacity: .45; } }
@keyframes qz-party-burst {
  0% { opacity: 0; transform: translate3d(0, 0, 0) rotate(0) scale(.35); }
  12% { opacity: 1; }
  100% { opacity: 0; transform: translate3d(var(--party-x), var(--party-y), 0) rotate(var(--party-rotation)) scale(1); }
}
@media (prefers-reduced-motion: reduce) { .qz-root * { animation: none !important; transition: none !important; } }

/* ---------- Responsive ---------- */
@media (max-width: 820px) {
  .qz-card { padding: 22px 18px 20px; border-radius: 18px; }
  .qz-header { grid-template-columns: 1fr auto; gap: 14px 12px; }
  .qz-title { border: 0; padding: 0; }
  .qz-timer { border: 0; padding: 0; justify-self: end; }
  .qz-progress { grid-column: 1 / -1; order: 3; }
  .qz-review-tools { grid-column: 1 / -1; order: 4; }
  .qz-body { padding: 26px 14px; }
  .qz-body hr { margin: 18px -14px 22px; }
  .qz-nav { padding-left: 0; justify-content: flex-start; gap: 8px; }
  .qz-nav-btn { min-width: 0; gap: 8px; padding-right: 12px; font-size: 13px; }
  .qz-nav-btn.is-next { padding-left: 14px; }
}

.qz-section-heading {
  padding: 36px 24px 30px;
  background: #fbf9ed;
  text-align: center;
}
.qz-section-heading-inner { max-width: 1152px; margin: 0 auto; zoom: .8; }
.qz-section-heading-pills { justify-content: center; }
.qz-section-heading-description { margin-inline: auto; }
.qz-section-heading-accent { justify-content: center; }
@media (max-width: 480px) {
  .qz-stage { padding: 14px 10px; align-items: flex-start; }
  .qz-footer { flex-direction: column-reverse; align-items: stretch; }
  .qz-nav { justify-content: space-between; }
  .qz-nav-btn { flex: 1; }
  .qz-finish { width: 100%; }
  .qz-dot { width: 27px; height: 27px; font-size: 11px; }
  .qz-welcome-card h1 { font-size: 24px; }
}
`;