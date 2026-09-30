import React, { useState, useEffect, useMemo, useCallback } from 'react';import { QUIZ_INFO, PPKN_QUESTIONS } from '../data/quizData';

// -----------------------------------------------------------------------------
// Clean Minimalist Icons (Matching Hero & Introduction sections)
// -----------------------------------------------------------------------------

function TrophyIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6" />
      <path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18" />
      <path d="M4 22h16" />
      <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
      <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
      <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z" />
    </svg>
  );
}

function CheckIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function CrossIcon({ className = 'w-5 h-5' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function ClockIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function ArrowRightIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  );
}

function ArrowLeftIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="19" y1="12" x2="5" y2="12" />
      <polyline points="12 19 5 12 12 5" />
    </svg>
  );
}

function BookIcon({ className = 'w-6 h-6' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
      <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
    </svg>
  );
}

function RefreshIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 21h5v-5" />
    </svg>
  );
}

function HomeIcon({ className = 'w-4 h-4' }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Subcomponent: Quiz Progress Bar & Counter
// -----------------------------------------------------------------------------
function QuizProgress({ current, total }) {
  const percentage = Math.min(100, Math.round(((current + 1) / total) * 100));

  return (
    <div className="flex-1 flex items-center gap-3">
      <div className="relative w-36 sm:w-48 h-4 bg-white rounded-full overflow-hidden border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
        <div
          className="h-full bg-[#bef264] border-r-2 border-slate-900 transition-all duration-300 ease-out"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <span className="text-xs sm:text-sm font-black text-slate-800 whitespace-nowrap">
        Soal {current + 1} / {total}
      </span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Subcomponent: Quiz Timer
// -----------------------------------------------------------------------------
function QuizTimer({ seconds, isWarning }) {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const timeString = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

  return (
    <div
      className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] ${
        isWarning
          ? 'bg-[#fee2e2] text-rose-800 animate-pulse'
          : 'bg-[#fef08a] text-slate-900'
      }`}
      role="timer"
      aria-label={`Sisa waktu: ${timeString}`}
    >
      <ClockIcon className={`w-4 h-4 ${isWarning ? 'text-rose-700' : 'text-slate-900'}`} />
      <span>{timeString}</span>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Subcomponent: Answer Option Button (Neo-brutalist style)
// -----------------------------------------------------------------------------
function AnswerOption({ option, isSelected, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(option.label)}
      className={`group w-full flex items-center justify-between p-3.5 sm:p-4 rounded-xl border-2 border-slate-900 text-left transition-all duration-150 cursor-pointer ${
        isSelected
          ? 'bg-[#fde047] text-slate-950 font-bold shadow-[4px_4px_0px_0px_#0f172a] translate-x-[-1px] translate-y-[-1px]'
          : 'bg-white text-slate-800 shadow-[3px_3px_0px_0px_#0f172a] hover:bg-slate-50 hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#0f172a] active:translate-x-[2px] active:translate-y-[2px] active:shadow-[1px_1px_0px_0px_#0f172a]'
      }`}
      aria-pressed={isSelected}
    >
      <div className="flex items-center gap-3 sm:gap-4 flex-1">
        {/* Option Letter Pill */}
        <span
          className={`flex items-center justify-center w-8 h-8 rounded-lg text-sm font-black border-2 border-slate-900 transition-colors ${
            isSelected
              ? 'bg-slate-900 text-white shadow-none'
              : 'bg-[#f5f3ff] text-purple-900'
          }`}
        >
          {option.label}
        </span>

        {/* Option Text */}
        <span className="text-sm sm:text-base font-bold leading-relaxed">
          {option.text}
        </span>
      </div>

      {/* Selected Indicator */}
      {isSelected ? (
        <span className="flex items-center justify-center w-6 h-6 rounded-lg bg-slate-900 text-white">
          <CheckIcon className="w-4 h-4 text-[#bef264]" />
        </span>
      ) : (
        <span className="w-5 h-5 rounded-md border-2 border-slate-300 group-hover:border-slate-500" />
      )}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Stage 1: Quiz Intro
// -----------------------------------------------------------------------------
function QuizIntro({ onStart }) {
  return (
    <div className="p-6 sm:p-10 md:p-12 text-center">
      {/* Top Badges */}
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border-2 border-slate-900 bg-[#bef264] text-xs font-black text-slate-950 mb-6 shadow-[2px_2px_0px_0px_#0f172a]">
        <span>🇮🇩</span>
        <span>{QUIZ_INFO.badge} • Edisi 2026</span>
      </div>

      {/* Main Title & Subtitle */}
      <div className="max-w-2xl mx-auto mb-8">
        <h3 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight text-slate-900 mb-3">
          {QUIZ_INFO.title}
        </h3>
        <p className="text-base sm:text-lg font-medium text-slate-600 leading-relaxed">
          {QUIZ_INFO.subtitle}
        </p>
      </div>

      {/* Instructions Card (Neo-brutalist) */}
      <div className="max-w-lg mx-auto mb-8 p-5 rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] text-left flex items-start gap-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-purple-100 border-2 border-slate-900 text-purple-900 flex items-center justify-center shadow-[2px_2px_0px_0px_#0f172a]">
          <BookIcon className="w-6 h-6" />
        </div>
        <div>
          <h4 className="text-base font-black text-slate-900 mb-1">
            Petunjuk Pengerjaan
          </h4>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Pilih satu jawaban terbaik untuk setiap soal wawasan kebangsaan dan SWOT. Anda dapat meninjau dan membaca pembahasan lengkap setelah kuis selesai.
          </p>
        </div>
      </div>

      {/* Metadata Badges */}
      <div className="flex flex-wrap items-center justify-center gap-3 mb-10 text-xs sm:text-sm text-slate-900 font-extrabold">
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
          📋 15 Pertanyaan
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
          ⏱️ 10 Menit
        </span>
        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
          🎯 Passing Grade: 70%
        </span>
      </div>

      {/* Start Quiz Button */}
      <div>
        <button
          type="button"
          onClick={onStart}
          className="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 rounded-xl text-base sm:text-lg font-black text-slate-950 bg-[#bef264] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
        >
          <span>Mulai Kuis Sekarang</span>
          <ArrowRightIcon className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Stage 2: Active Quiz Question Card
// -----------------------------------------------------------------------------
function QuizQuestion({
  question,
  currentIndex,
  total,
  userAnswer,
  onSelectAnswer,
  onPrev,
  onNext,
  onFinish,
  timeLeft,
}) {
  const isLast = currentIndex === total - 1;

  return (
    <div className="p-5 sm:p-8 md:p-10">
      {/* Top Header: Progress + Counter + Timer */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-6 border-b-2 border-slate-900">
        <QuizProgress current={currentIndex} total={total} />
        <QuizTimer seconds={timeLeft} isWarning={timeLeft <= 60} />
      </div>

      {/* Main Question Card (Solid Border & Solid Shadow) */}
      <div className="mb-6 p-6 sm:p-8 rounded-2xl bg-[#fbf9ee] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] text-left">
        <div className="flex items-center gap-2 mb-3">
          <span className="inline-block px-3 py-1 rounded-lg text-xs font-black bg-purple-200 text-purple-900 border border-slate-900">
            {question.category}
          </span>
          <span className="text-xs font-bold text-slate-500">
            • Nomor {question.id} dari {total}
          </span>
        </div>
        <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 leading-snug">
          {question.question}
        </h3>
      </div>

      {/* Answer Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((opt) => (
          <AnswerOption
            key={opt.label}
            option={opt}
            isSelected={userAnswer === opt.label}
            onSelect={onSelectAnswer}
          />
        ))}
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-6 border-t-2 border-slate-900">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-black border-2 border-slate-900 transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
              : 'bg-white text-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none cursor-pointer'
          }`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        {isLast ? (
          <button
            type="button"
            onClick={onFinish}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black text-slate-950 bg-[#bef264] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            <span>Selesai & Kumpulkan</span>
            <CheckIcon className="w-4 h-4" />
          </button>
        ) : (
          <button
            type="button"
            onClick={onNext}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black text-slate-950 bg-[#bef264] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_#0f172a] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all cursor-pointer"
          >
            <span>Selanjutnya</span>
            <ArrowRightIcon className="w-4 h-4" />
          </button>
        )}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Stage 3: Quiz Results (Neo-brutalist)
// -----------------------------------------------------------------------------
function QuizResults({ stats, onReview, onRetry, onHome }) {
  const isPass = stats.percentage >= QUIZ_INFO.passingScore;

  return (
    <div className="p-6 sm:p-10 text-center">
      {/* Trophy Badge */}
      <div className="mx-auto w-16 h-16 rounded-2xl bg-[#fef08a] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex items-center justify-center mb-5 text-slate-900">
        <TrophyIcon className="w-8 h-8" />
      </div>

      {/* Heading */}
      <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-2">
        Hasil Kuis Evaluasi
      </h3>
      <p className="text-xs sm:text-sm font-semibold text-slate-600 mb-6">
        Berikut ringkasan performa dan penguasaan materi kebangsaan Anda.
      </p>

      {/* Score and Percentage Display */}
      <div className="flex items-center justify-center gap-3 mb-6">
        <span className="text-4xl sm:text-5xl font-black text-slate-900">
          {stats.correct} / {stats.total}
        </span>
        <span
          className={`px-4 py-1.5 rounded-xl text-base sm:text-lg font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] ${
            isPass ? 'bg-[#bef264] text-slate-950' : 'bg-[#fee2e2] text-rose-900'
          }`}
        >
          {stats.percentage}%
        </span>
      </div>

      {/* Encouragement Banner */}
      <div
        className={`max-w-md mx-auto p-4 rounded-xl mb-8 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
          isPass
            ? 'bg-[#ecfccb] text-slate-900'
            : 'bg-[#f5f3ff] text-purple-950'
        }`}
      >
        <h4 className="font-black text-sm sm:text-base">
          {isPass ? 'Luar Biasa! Pemahaman Sangat Baik' : 'Semangat! Terus Tingkatkan Pemahaman'}
        </h4>
        <p className="text-xs sm:text-sm font-medium mt-1 opacity-90">
          {isPass
            ? 'Anda berhasil menguasai materi geopolitik dan analisis SWOT Indonesia dengan sangat memuaskan!'
            : 'Pelajari kembali pembahasan dan tips dari setiap soal untuk memperdalam pemahaman.'}
        </p>
      </div>

      {/* Metrics Cards: Correct, Wrong, Time (Solid Outlines & Shadows) */}
      <div className="grid grid-cols-3 gap-3 sm:gap-4 max-w-lg mx-auto mb-8">
        {/* Correct Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#dcfce7] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center">
          <div className="w-8 h-8 rounded-lg bg-emerald-300 border-2 border-slate-900 flex items-center justify-center mb-1 text-slate-950">
            <CheckIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black text-slate-700">Benar</span>
          <span className="text-xl sm:text-2xl font-black text-slate-950">{stats.correct}</span>
        </div>

        {/* Wrong Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#fee2e2] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center">
          <div className="w-8 h-8 rounded-lg bg-rose-300 border-2 border-slate-900 flex items-center justify-center mb-1 text-slate-950">
            <CrossIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black text-slate-700">Salah</span>
          <span className="text-xl sm:text-2xl font-black text-slate-950">{stats.wrong}</span>
        </div>

        {/* Time Card */}
        <div className="p-3.5 sm:p-4 rounded-xl bg-[#ede9fe] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] flex flex-col items-center">
          <div className="w-8 h-8 rounded-lg bg-purple-300 border-2 border-slate-900 flex items-center justify-center mb-1 text-slate-950">
            <ClockIcon className="w-4 h-4" />
          </div>
          <span className="text-[11px] font-black text-slate-700">Waktu</span>
          <span className="text-base sm:text-lg font-black text-slate-950">{stats.formattedTime}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto">
        <button
          type="button"
          onClick={onReview}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl text-sm font-black text-slate-950 bg-[#bef264] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
        >
          <span>Tinjau Pembahasan</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={onRetry}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-slate-900 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
        >
          <RefreshIcon className="w-4 h-4" />
          <span>Ulangi Kuis</span>
        </button>

        <button
          type="button"
          onClick={onHome}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl text-sm font-black text-slate-900 bg-white border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[2px_2px_0px_0px_#0f172a] transition-all cursor-pointer"
        >
          <HomeIcon className="w-4 h-4" />
          <span>Ke Beranda</span>
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Stage 4: Answer Review Grid
// -----------------------------------------------------------------------------
function AnswerReview({ questions, userAnswers, stats, onSelectQuestion, onHome, onResults }) {
  return (
    <div className="p-5 sm:p-8 md:p-10">
      {/* Review Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 sm:p-5 rounded-xl bg-purple-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a] text-slate-900 mb-6">
        <div>
          <h3 className="text-lg font-black leading-tight">Daftar Lembar Jawaban</h3>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">
            Klik kartu soal di bawah untuk membuka pembahasan detail dan tips solusi.
          </p>
        </div>

        {/* Score Pill */}
        <div className="px-4 py-1.5 rounded-xl bg-white border-2 border-slate-900 text-slate-900 text-xs sm:text-sm font-black shadow-[2px_2px_0px_0px_#0f172a]">
          Skor: {stats.correct} / {stats.total} ({stats.percentage}%)
        </div>
      </div>

      {/* 15 Question Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
        {questions.map((q, idx) => {
          const answer = userAnswers[q.id];
          const isAnswered = Boolean(answer);
          const isCorrect = isAnswered && answer === q.correct;
          const isWrong = isAnswered && answer !== q.correct;

          const chosenOption = q.options.find((opt) => opt.label === (answer || q.correct));
          const snippet = chosenOption ? chosenOption.text : '-';

          return (
            <button
              key={q.id}
              type="button"
              onClick={() => onSelectQuestion(idx)}
              className={`p-3 rounded-xl border-2 border-slate-900 text-left transition-all duration-150 cursor-pointer flex flex-col justify-between min-h-[96px] shadow-[3px_3px_0px_0px_#0f172a] hover:translate-x-[-1px] hover:translate-y-[-1px] hover:shadow-[4px_4px_0px_0px_#0f172a] ${
                isCorrect
                  ? 'bg-[#dcfce7] text-slate-950'
                  : isWrong
                  ? 'bg-[#fee2e2] text-slate-950'
                  : 'bg-slate-100 text-slate-700'
              }`}
            >
              {/* Top Row: Question # + Chosen Letter + Status Badge */}
              <div className="flex items-center justify-between w-full mb-1.5">
                <span className="w-6 h-6 rounded-md bg-white border border-slate-900 text-xs font-black flex items-center justify-center text-slate-900">
                  {q.id}
                </span>

                <div className="flex items-center gap-1.5">
                  {isAnswered && (
                    <span className="text-xs font-black px-1.5 py-0.5 rounded bg-white border border-slate-900">
                      {answer}
                    </span>
                  )}
                  <span
                    className={`text-[10px] font-black px-1.5 py-0.5 rounded border border-slate-900 ${
                      isCorrect
                        ? 'bg-emerald-300 text-slate-950'
                        : isWrong
                        ? 'bg-rose-300 text-slate-950'
                        : 'bg-slate-200 text-slate-700'
                    }`}
                  >
                    {isCorrect ? 'Benar' : isWrong ? 'Salah' : 'Kosong'}
                  </span>
                </div>
              </div>

              {/* Bottom Snippet */}
              <div className="text-xs font-bold truncate opacity-90">
                {snippet}
              </div>
            </button>
          );
        })}
      </div>

      {/* Footer: Legend & Actions */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t-2 border-slate-900">
        <div className="flex items-center gap-4 text-xs font-black text-slate-700">
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-emerald-400 border border-slate-900" />
            Benar
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-rose-400 border border-slate-900" />
            Salah
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-slate-300 border border-slate-900" />
            Tidak dijawab
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onResults}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 bg-white text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
          >
            ← Ringkasan Skor
          </button>
          <button
            type="button"
            onClick={onHome}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 bg-[#bef264] text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
          >
            Ke Beranda
          </button>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Stage 5: Detailed Answer Explanation (Pembahasan)
// -----------------------------------------------------------------------------
function QuestionExplanation({
  question,
  userAnswer,
  currentIndex,
  total,
  onPrev,
  onNext,
  onBackToGrid,
}) {
  const isCorrect = userAnswer === question.correct;
  const isAnswered = Boolean(userAnswer);

  const userChosenOpt = question.options.find((o) => o.label === userAnswer);
  const correctOpt = question.options.find((o) => o.label === question.correct);

  return (
    <div className="p-5 sm:p-8 md:p-10">
      {/* Top Header Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-5 mb-6 border-b-2 border-slate-900">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBackToGrid}
            className="w-8 h-8 rounded-lg border-2 border-slate-900 bg-white text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] flex items-center justify-center hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
            title="Kembali ke semua soal"
          >
            <ArrowLeftIcon className="w-4 h-4" />
          </button>

          <h3 className="text-lg sm:text-xl font-black text-slate-900">
            Soal Nomor {question.id}
          </h3>

          <span
            className={`px-3 py-1 rounded-lg text-xs font-black border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a] ${
              isCorrect
                ? 'bg-[#bef264] text-slate-950'
                : isAnswered
                ? 'bg-[#fee2e2] text-rose-950'
                : 'bg-slate-100 text-slate-700'
            }`}
          >
            {isCorrect ? '✓ Benar' : isAnswered ? '✕ Salah' : '○ Kosong'}
          </span>
        </div>

        {/* Question Counter Navigator */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-black text-slate-900 bg-white px-3 py-1.5 rounded-xl border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0f172a]">
          <button
            type="button"
            onClick={onPrev}
            disabled={currentIndex === 0}
            className="hover:text-purple-700 disabled:opacity-30 cursor-pointer"
          >
            ◀
          </button>
          <span>
            {currentIndex + 1} / {total}
          </span>
          <button
            type="button"
            onClick={onNext}
            disabled={currentIndex === total - 1}
            className="hover:text-purple-700 disabled:opacity-30 cursor-pointer"
          >
            ▶
          </button>
        </div>
      </div>

      {/* Two-Column Responsive Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Left Column: Question & Selected Answers */}
        <div className="space-y-4">
          {/* Question Text Box */}
          <div className="p-5 rounded-xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
            <span className="text-[11px] font-black text-purple-700 uppercase tracking-wider block mb-1">
              {question.category}
            </span>
            <p className="text-base sm:text-lg font-black text-slate-900 leading-relaxed">
              {question.question}
            </p>
          </div>

          {/* User Answer Card */}
          <div
            className={`p-4 rounded-xl border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a] ${
              isCorrect
                ? 'bg-[#dcfce7]'
                : isAnswered
                ? 'bg-[#fee2e2]'
                : 'bg-slate-100'
            }`}
          >
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-slate-900">
                Jawaban Anda:
              </span>
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                {isCorrect ? '✓' : isAnswered ? '✕' : '-'}
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 font-black flex items-center justify-center text-slate-900 text-sm">
                {userAnswer || '-'}
              </span>
              <span className="text-sm sm:text-base font-bold text-slate-900">
                {userChosenOpt ? userChosenOpt.text : 'Tidak dijawab'}
              </span>
            </div>
          </div>

          {/* Correct Answer Card */}
          <div className="p-4 rounded-xl bg-[#bef264] border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0f172a]">
            <div className="flex items-center justify-between mb-1.5">
              <span className="text-xs font-black text-slate-950">Kunci Jawaban yang Tepat:</span>
              <span className="w-5 h-5 rounded-md bg-slate-900 text-white flex items-center justify-center text-xs font-black">
                ✓
              </span>
            </div>

            <div className="flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 font-black flex items-center justify-center text-slate-900 text-sm">
                {question.correct}
              </span>
              <span className="text-sm sm:text-base font-black text-slate-950">
                {correctOpt ? correctOpt.text : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Pembahasan & Tips */}
        <div className="space-y-4">
          {/* Pembahasan Card */}
          <div className="p-5 sm:p-6 rounded-xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
            <div className="flex items-center gap-2 mb-4 text-slate-900 font-black text-sm sm:text-base">
              <span className="w-7 h-7 rounded-lg bg-purple-200 border-2 border-slate-900 text-slate-900 flex items-center justify-center">
                📚
              </span>
              <span>Pembahasan Strategis</span>
            </div>

            {/* Step by Step list */}
            <ol className="space-y-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed mb-4">
              {question.explanation.steps.map((step, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <span className="flex-shrink-0 w-5 h-5 rounded-md bg-slate-900 text-white text-xs font-black flex items-center justify-center mt-0.5">
                    {idx + 1}
                  </span>
                  <span className="font-semibold text-slate-800">{step}</span>
                </li>
              ))}
            </ol>

            {/* Conclusion highlight */}
            <div className="p-3 rounded-lg bg-purple-50 border-2 border-slate-900 text-xs sm:text-sm font-black text-slate-900">
              💡 {question.explanation.conclusion}
            </div>
          </div>

          {/* Tips Card */}
          {question.tips && (
            <div className="p-4 sm:p-5 rounded-xl bg-[#fef08a] border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0f172a]">
              <div className="flex items-center gap-2 mb-1.5 text-slate-950 font-black text-xs sm:text-sm">
                <span>⚡ Tips Kunci & Wawasan</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-900 leading-relaxed font-bold">
                {question.tips}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="flex items-center justify-between pt-5 border-t-2 border-slate-900">
        <button
          type="button"
          onClick={onPrev}
          disabled={currentIndex === 0}
          className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 transition-all ${
            currentIndex === 0
              ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
              : 'bg-white text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer'
          }`}
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span>Sebelumnya</span>
        </button>

        <button
          type="button"
          onClick={onBackToGrid}
          className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 bg-white text-slate-900 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none transition-all cursor-pointer"
        >
          <span>Daftar Soal</span>
        </button>

        <button
          type="button"
          onClick={onNext}
          disabled={currentIndex === total - 1}
          className={`inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-black border-2 border-slate-900 transition-all ${
            currentIndex === total - 1
              ? 'bg-slate-100 text-slate-400 border-slate-300 cursor-not-allowed shadow-none'
              : 'bg-[#bef264] text-slate-950 shadow-[2px_2px_0px_0px_#0f172a] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-none cursor-pointer'
          }`}
        >
          <span>Selanjutnya</span>
          <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Main Exported Component: Quiz.jsx (Neo-Brutalist Kilas Bangsa Style)
// -----------------------------------------------------------------------------
export default function Quiz() {
  const [stage, setStage] = useState('intro'); // 'intro' | 'quiz' | 'results' | 'review' | 'explanation'
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(QUIZ_INFO.timeLimit);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);

  // Scroll-triggered visibility for entrance animation
  const [sectionVisible, setSectionVisible] = useState(false);
  const sectionRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const questions = PPKN_QUESTIONS;

  // Calculate dynamic quiz statistics
  const stats = useMemo(() => {
    let correct = 0;
    let wrong = 0;
    let unanswered = 0;

    questions.forEach((q) => {
      const ans = userAnswers[q.id];
      if (!ans) {
        unanswered += 1;
      } else if (ans === q.correct) {
        correct += 1;
      } else {
        wrong += 1;
      }
    });

    const total = questions.length;
    const percentage = Math.round((correct / total) * 100);

    const mins = Math.floor(elapsedSeconds / 60);
    const secs = elapsedSeconds % 60;
    const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

    return {
      correct,
      wrong,
      unanswered,
      total,
      percentage,
      formattedTime,
    };
  }, [questions, userAnswers, elapsedSeconds]);

  // Finish quiz handler
  const handleFinishQuiz = useCallback(() => {
    setIsTimerRunning(false);
    setElapsedSeconds(QUIZ_INFO.timeLimit - timeLeft);
    setStage('results');
  }, [timeLeft]);

  // Timer interval effect
  useEffect(() => {
    if (!isTimerRunning) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinishQuiz();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isTimerRunning, handleFinishQuiz]);

  // Start Quiz
  const handleStartQuiz = () => {
    setUserAnswers({});
    setCurrentIndex(0);
    setTimeLeft(QUIZ_INFO.timeLimit);
    setElapsedSeconds(0);
    setIsTimerRunning(true);
    setStage('quiz');
  };

  // Change answer selection
  const handleSelectAnswer = (optionLabel) => {
    const qId = questions[currentIndex].id;
    setUserAnswers((prev) => ({
      ...prev,
      [qId]: optionLabel,
    }));
  };

  // Navigation handlers
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  // Return to home / section top
  const handleBackToHome = () => {
    setStage('intro');
    setIsTimerRunning(false);
    setUserAnswers({});
    const quizElem = document.getElementById('quiz');
    if (quizElem) {
      quizElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      id="quiz"
      ref={sectionRef}
      className="scroll-mt-16 relative w-full py-20 px-4 sm:px-6 lg:px-8 bg-[#fbf9ed] overflow-hidden"
    >
      {/* ----------------------------------------------------------------- */}
      {/* LEFT DECORATIONS (Dotted curvy line + floating flowers & stars)   */}
      {/* ----------------------------------------------------------------- */}
      {/* Vertical dotted curvy line with flower & sparkles (matching Intro) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 left-2 z-0 hidden w-14 xl:block">
        <svg className="absolute top-[8%] h-[560px] w-full overflow-visible opacity-80" viewBox="0 0 56 560" fill="none">
          <path d="M30 0C54 55 8 98 30 150S51 245 28 300S9 390 31 450S46 515 26 560" stroke="#c4b5fd" strokeWidth="2.5" strokeDasharray="4 8" strokeLinecap="round" />
          {/* Flower on curvy line */}
          <g fill="#bef264" stroke="#a3e635" strokeWidth="1">
            <circle cx="28" cy="150" r="7" />
            <circle cx="40" cy="157" r="7" />
            <circle cx="40" cy="171" r="7" />
            <circle cx="28" cy="178" r="7" />
            <circle cx="16" cy="171" r="7" />
            <circle cx="16" cy="157" r="7" />
          </g>
          <circle cx="28" cy="164" r="5" fill="#fde047" />
          {/* Star sparkles along line */}
          <path d="M35 320L38 331L49 334L38 337L35 348L32 337L21 334L32 331Z" fill="#fde047" />
          <path d="M22 450L24 457L31 459L24 461L22 468L20 461L13 459L20 457Z" fill="#fda4af" />
        </svg>
      </div>

      {/* Floating flower - Top Left */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-12 left-4 sm:left-8 lg:left-14 z-0 animate-icon-slow hidden sm:block transition-all duration-700 ease-out ${
          sectionVisible ? 'opacity-90 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
        style={{ transitionDelay: sectionVisible ? '150ms' : '0ms' }}
      >
        <svg width="42" height="42" viewBox="0 0 38 38" fill="none" className="drop-shadow-sm">
          <ellipse cx="19" cy="10" rx="4.5" ry="7" fill="#fda4af" />
          <ellipse cx="19" cy="28" rx="4.5" ry="7" fill="#fda4af" />
          <ellipse cx="10" cy="19" rx="7" ry="4.5" fill="#fda4af" />
          <ellipse cx="28" cy="19" rx="7" ry="4.5" fill="#fda4af" />
          <ellipse cx="12.5" cy="12.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(45 12.5 12.5)" />
          <ellipse cx="25.5" cy="12.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(-45 25.5 12.5)" />
          <ellipse cx="12.5" cy="25.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(-45 12.5 25.5)" />
          <ellipse cx="25.5" cy="25.5" rx="4.5" ry="7" fill="#fecdd3" transform="rotate(45 25.5 25.5)" />
          <circle cx="19" cy="19" r="5.5" fill="#fb7185" />
        </svg>
      </div>

      {/* Floating 4-point star - Mid Left */}
      {/* Floating 4-point star - Mid Left */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-1/2 -translate-y-16 left-3 sm:left-6 lg:left-12 z-0 animate-float-1 hidden sm:block transition-all duration-700 ease-out ${
          sectionVisible ? 'opacity-90 translate-x-0' : 'opacity-0 -translate-x-12'
        }`}
        style={{ transitionDelay: sectionVisible ? '250ms' : '0ms' }}
      >
        <svg width="36" height="36" viewBox="0 0 40 40" fill="none">
          <path d="M20 2L24 16L38 20L24 24L20 38L16 24L2 20L16 16Z" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Floating Lime 5-petal flower - Lower Left */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute bottom-24 left-4 sm:left-8 lg:left-14 z-0 animate-float-2 hidden sm:block transition-all duration-700 ease-out ${
          sectionVisible ? 'opacity-90 translate-x-0' : 'opacity-0 -translate-x-10'
        }`}
        style={{ transitionDelay: sectionVisible ? '350ms' : '0ms' }}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="11" r="5.5" fill="#bef264" />
          <circle cx="26" cy="16" r="5.5" fill="#bef264" />
          <circle cx="24" cy="25" r="5.5" fill="#bef264" />
          <circle cx="14" cy="25" r="5.5" fill="#bef264" />
          <circle cx="12" cy="16" r="5.5" fill="#bef264" />
          <circle cx="19" cy="19" r="4.5" fill="#c4b5fd" />
        </svg>
      </div>

      {/* ----------------------------------------------------------------- */}
      {/* RIGHT DECORATIONS (Dotted curvy line + floating flowers & stars)  */}
      {/* ----------------------------------------------------------------- */}
      {/* Vertical dotted curvy line with flower & sparkles (matching Intro) */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-y-0 right-2 z-0 hidden w-14 xl:block">
        <svg className="absolute top-[10%] h-[560px] w-full overflow-visible opacity-80" viewBox="0 0 56 560" fill="none">
          <path d="M26 0C4 55 49 100 27 155S5 250 29 305S50 395 27 450S11 515 32 560" stroke="#bef264" strokeWidth="2.5" strokeDasharray="4 8" strokeLinecap="round" />
          <path d="M26 70L29 81L40 84L29 87L26 98L23 87L12 84L23 81Z" fill="#c4b5fd" />
          {/* Flower on curvy line */}
          <g fill="#fda4af" stroke="#fb7185" strokeWidth="1">
            <circle cx="28" cy="350" r="7" />
            <circle cx="40" cy="357" r="7" />
            <circle cx="40" cy="371" r="7" />
            <circle cx="28" cy="378" r="7" />
            <circle cx="16" cy="371" r="7" />
            <circle cx="16" cy="357" r="7" />
          </g>
          <circle cx="28" cy="364" r="5" fill="#fde047" />
          <path d="M35 480L37 487L44 489L37 491L35 498L33 491L26 489L33 487Z" fill="#c4b5fd" />
        </svg>
      </div>

      {/* Floating Sparkle Star - Top Right */}
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute top-16 right-4 sm:right-8 lg:right-14 z-0 animate-float-3 hidden sm:block transition-all duration-700 ease-out ${
          sectionVisible ? 'opacity-90 translate-x-0' : 'opacity-0 translate-x-10'
        }`}
        style={{ transitionDelay: sectionVisible ? '150ms' : '0ms' }}
      >
        <svg width="38" height="38" viewBox="0 0 40 40" fill="none">
          <path d="M20 2L24 16L38 20L24 24L20 38L16 24L2 20L16 16Z" fill="#c4b5fd" stroke="#0f172a" strokeWidth="1.5" strokeLinejoin="round" />
          <circle cx="20" cy="20" r="3" fill="#ffffff" />
        </svg>
      </div>

      {/* Floating 6-petal Flower - Mid Right */}
      <div aria-hidden="true" className="pointer-events-none absolute top-1/2 -translate-y-10 right-3 sm:right-6 lg:right-12 z-0 animate-icon-drift opacity-90 hidden sm:block">
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="drop-shadow-sm">
          <circle cx="20" cy="10" r="6" fill="#fecdd3" />
          <circle cx="28.6" cy="15" r="6" fill="#fecdd3" />
          <circle cx="28.6" cy="25" r="6" fill="#fecdd3" />
          <circle cx="20" cy="30" r="6" fill="#fecdd3" />
          <circle cx="11.4" cy="25" r="6" fill="#fecdd3" />
          <circle cx="11.4" cy="15" r="6" fill="#fecdd3" />
          <circle cx="20" cy="20" r="5" fill="#fde047" />
        </svg>
      </div>

      {/* Floating Pastel Sunburst / Sparkle - Lower Right */}
      <div aria-hidden="true" className="pointer-events-none absolute bottom-20 right-4 sm:right-8 lg:right-14 z-0 animate-icon-slow opacity-90 hidden sm:block">
        <svg width="42" height="42" viewBox="0 0 64 64" fill="none" stroke="#f59e0b" strokeWidth="3" strokeLinecap="round">
          <line x1="32" y1="8" x2="32" y2="20" />
          <line x1="32" y1="44" x2="32" y2="56" />
          <line x1="8" y1="32" x2="20" y2="32" />
          <line x1="44" y1="32" x2="56" y2="32" />
          <line x1="15" y1="15" x2="24" y2="24" />
          <line x1="40" y1="40" x2="49" y2="49" />
          <line x1="15" y1="49" x2="24" y2="40" />
          <line x1="40" y1="24" x2="49" y2="15" />
          <circle cx="32" cy="32" r="5" fill="#fde047" stroke="#0f172a" strokeWidth="1.5" />
        </svg>
      </div>

      <div
        className="relative mx-auto max-w-4xl"
        style={{ transform: 'scale(0.8)', transformOrigin: 'center top' }}
      >
        {/* Header — pills + heading animate in from below */}
        <div className="text-center mb-12 relative">
          {/* Pills — pop in first */}
          <div
            className={`flex flex-wrap items-center justify-center gap-3 mb-4 transition-all duration-500 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: sectionVisible ? '80ms' : '0ms' }}
          >
            <span className="inline-flex items-center gap-2 rounded-xl border-2 border-slate-900 bg-purple-100 px-3 py-1.5 text-[10px] sm:text-xs font-black text-purple-900 shadow-[3px_3px_0px_0px_#0f172a]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-500" />
              Quiz Kilas Bangsa
            </span>
            <span className="inline-flex items-center rounded-xl border-2 border-slate-900 bg-[#e8fccf] px-3 py-1.5 text-[10px] sm:text-xs font-black text-lime-900 shadow-[3px_3px_0px_0px_#0f172a]">
              Asah Kemampuan!
            </span>
          </div>

          {/* Heading — slides in slightly after */}
          <h2
            className={`text-3xl sm:text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-3 transition-all duration-500 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: sectionVisible ? '200ms' : '0ms' }}
          >
            Asah Kemampuanmu!
          </h2>

          {/* Subtitle */}
          <p
            className={`max-w-xl mx-auto text-sm sm:text-base text-slate-600 leading-relaxed font-medium transition-all duration-500 ${
              sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
            style={{ transitionDelay: sectionVisible ? '300ms' : '0ms' }}
          >
            Uji pemahamanmu tentang wawasan nusantara, geopolitik, dan analisis SWOT Indonesia melalui kuis interaktif dengan pembahasan lengkap.
          </p>

          {/* Accent bar — last in header */}
          <div
            aria-hidden="true"
            className={`mt-5 flex items-center justify-center gap-2 relative z-10 transition-all duration-500 ${
              sectionVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'
            }`}
            style={{ transitionDelay: sectionVisible ? '400ms' : '0ms', transformOrigin: 'center' }}
          >
            <div className="h-1.5 w-16 rounded-full bg-purple-600" />
            <div className="h-1.5 w-8 rounded-full bg-[#bef264]" />
            <div className="h-1.5 w-4 rounded-full bg-amber-400" />
          </div>
        </div>

        {/* Quiz card — big reveal: slides up + light scale-in bounce */}
        <div
          className={`relative rounded-3xl bg-white border-2 border-slate-900 shadow-[8px_8px_0px_0px_#0f172a] overflow-hidden transition-all duration-700 ease-out ${
            sectionVisible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-16 scale-[0.97]'
          }`}
          style={{ transitionDelay: sectionVisible ? '500ms' : '0ms' }}
        >
          <div className="h-3 w-full bg-[#bef264] border-b-2 border-slate-900" />

          {stage === 'intro' && <QuizIntro onStart={handleStartQuiz} />}

          {stage === 'quiz' && (
            <QuizQuestion
              question={questions[currentIndex]}
              currentIndex={currentIndex}
              total={questions.length}
              userAnswer={userAnswers[questions[currentIndex].id]}
              onSelectAnswer={handleSelectAnswer}
              onPrev={handlePrev}
              onNext={handleNext}
              onFinish={handleFinishQuiz}
              timeLeft={timeLeft}
            />
          )}

          {stage === 'results' && (
            <QuizResults
              stats={stats}
              onReview={() => setStage('review')}
              onRetry={handleStartQuiz}
              onHome={handleBackToHome}
            />
          )}

          {stage === 'review' && (
            <AnswerReview
              questions={questions}
              userAnswers={userAnswers}
              stats={stats}
              onSelectQuestion={(idx) => {
                setCurrentIndex(idx);
                setStage('explanation');
              }}
              onHome={handleBackToHome}
              onResults={() => setStage('results')}
            />
          )}

          {stage === 'explanation' && (
            <QuestionExplanation
              question={questions[currentIndex]}
              userAnswer={userAnswers[questions[currentIndex].id]}
              currentIndex={currentIndex}
              total={questions.length}
              onPrev={handlePrev}
              onNext={handleNext}
              onBackToGrid={() => setStage('review')}
            />
          )}
        </div>
      </div>
    </section>
  );
}
