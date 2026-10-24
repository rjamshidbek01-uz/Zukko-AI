import React, { useState, useEffect } from 'react';
import { BookChapter, TestQuestion, UserSession, SubjectType } from '../types';
import { ALL_SUBJECTS } from '../data/initialData';
import { getGlobalSolvedCount, getCompetitionConfig, getNextMonthlyCompetitionDate } from '../lib/storage';
import {
  BookOpen,
  CheckCircle,
  Clock,
  Award,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Brain,
  CheckCircle2,
  BookMarked,
  Gamepad2,
  Flame,
  Zap,
  Trophy,
  Calendar,
} from 'lucide-react';

interface StudentDashboardProps {
  currentUser: UserSession;
  books: BookChapter[];
  questions: TestQuestion[];
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onSelectMode: (mode: 'summary' | 'quiz' | 'challenge' | 'games' | 'profile' | 'admin') => void;
  hasActiveChallenge: boolean;
  activeChallengeRemainingFormatted?: string;
  onOpenAuth: () => void;
}

export const StudentDashboard: React.FC<StudentDashboardProps> = ({
  currentUser,
  books,
  questions,
  selectedSubject,
  setSelectedSubject,
  onSelectMode,
  hasActiveChallenge,
  activeChallengeRemainingFormatted,
  onOpenAuth,
}) => {
  const [globalCount, setGlobalCount] = useState(getGlobalSolvedCount());
  const [competitionTimeLeft, setCompetitionTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Real-time problem ticker effect
  useEffect(() => {
    const interval = setInterval(() => {
      setGlobalCount((prev) => prev + Math.floor(Math.random() * 2));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // Real-time competition countdown effect (target: 25th of month or admin config)
  useEffect(() => {
    const config = getCompetitionConfig();
    const targetDate = new Date(config.target_date || getNextMonthlyCompetitionDate()).getTime();

    const updateCountdown = () => {
      const now = Date.now();
      const diff = Math.max(0, targetDate - now);
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setCompetitionTimeLeft({ days, hours, minutes, seconds });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, []);

  const getSubjectStats = (subject: string) => {
    const subBooks = books.filter((b) => b.subject === subject);
    const subQuestions = questions.filter((q) => q.subject === subject);
    return {
      chaptersCount: subBooks.length,
      questionsCount: subQuestions.length,
    };
  };

  const subjectIcons: Record<string, string> = {
    Matematika: '📐',
    Fizika: '⚡',
    Tarix: '🏛️',
    Biologiya: '🧬',
    Kimyo: '🧪',
    'Ona tili va adabiyot': '📖',
    Astronomiya: '🔭',
    Geografiya: '🗺️',
    'Ingliz tili': '🌍',
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      {/* Hero Welcome Banner with Generous Padding & Glassmorphism */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 dark:from-slate-900 dark:via-indigo-950 dark:to-slate-950 rounded-3xl p-8 sm:p-12 text-white shadow-xl border border-indigo-800/40">
        <div className="absolute -right-16 -top-16 w-96 h-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interaktiv Taʼlim, Öyinlar & AI Repetitor</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-tight">
            Assalomu alaykum,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-indigo-200 to-white">
              {currentUser.user_name}
            </span>
            !
          </h1>

          <p className="text-sm sm:text-base text-indigo-100/90 leading-relaxed max-w-2xl">
            Rasmiy darsliklar faktlariga tayangan konspektlarni örganing, 30 talik DTM testlarini yeçing, intellektual öyinlarda bellaşing va oylik musobaqalarimizda gʻolib boʻling.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-3 pt-3">
            <button
              onClick={() => onSelectMode('games')}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl text-xs sm:text-sm font-extrabold shadow-lg shadow-amber-900/30 hover:scale-105 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Gamepad2 className="w-4 h-4" />
              Öyinlar Zali
            </button>
            <button
              onClick={() => onSelectMode('challenge')}
              className="px-5 py-3 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Musobaqalar (25-sana)
            </button>
            <button
              onClick={() => onSelectMode('quiz')}
              className="px-5 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-lg transition-all flex items-center gap-2 border border-indigo-400/40 cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" />
              Test Yeçiş
            </button>
            <button
              onClick={() => onSelectMode('summary')}
              className="px-5 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white rounded-2xl text-xs sm:text-sm font-bold transition-all flex items-center gap-2 border border-white/20 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-indigo-300" />
              Konspektlar
            </button>
          </div>
        </div>
      </div>

      {/* Account Creation Prompt Banner for Guest Users */}
      {!currentUser.has_account && !currentUser.email && (
        <div className="p-4 sm:p-5 rounded-3xl bg-gradient-to-r from-indigo-50 to-amber-50 dark:from-slate-900 dark:to-indigo-950/60 border border-indigo-200 dark:border-indigo-800/60 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-indigo-600 to-indigo-500 text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0">
              🔑
            </div>
            <div>
              <h4 className="text-xs sm:text-sm font-extrabold text-slate-900 dark:text-white">
                Oʻzingizga login va parol bilan akkount yarating!
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                Toʻplagan XP ballaringiz, seriyangiz va oylik musobaqa natijalaringiz Firebase bazasida ishonchli saqlanadi.
              </p>
            </div>
          </div>
          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md whitespace-nowrap cursor-pointer transition-all hover:scale-105 shrink-0"
          >
            Akkount Yaratish
          </button>
        </div>
      )}

      {/* Live Problem Count & Statistics Strip */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Global Live Solved Count */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Zukko AI tizimida yeçilgan masalalar</span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            {globalCount.toLocaleString('uz-UZ')}
          </h3>
          <p className="text-[11px] text-slate-400">Platformada yeçilgan savollar</p>
        </div>

        {/* User Solved & Accuracy */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Şaxsiy Yeçilgan Testlar</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            {currentUser.total_tests_taken}
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {currentUser.accuracy_percentage}% aniqlik darajasi
          </p>
        </div>

        {/* Daily Streak Flame */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Kunlik Seriya</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-amber-500 tabular-nums font-mono flex items-center gap-1">
            <span>{currentUser.streak_days || 1}</span>
            <span className="text-base">kun 🔥</span>
          </h3>
          <p className="text-[11px] text-slate-400">Har kungi dars takrorlash</p>
        </div>

        {/* User Level & XP */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Daraja & Tajriba</span>
            <Zap className="w-4 h-4 text-indigo-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            LVL {currentUser.level || 1}
          </h3>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            {currentUser.xp || 120} XP toʻplandi
          </p>
        </div>
      </div>

      {/* Active Challenge Alert if any */}
      {hasActiveChallenge && (
        <div className="p-5 bg-red-50 dark:bg-red-950/40 border-2 border-red-300 dark:border-red-800 rounded-3xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-600 text-white flex items-center justify-center font-bold shrink-0 animate-pulse shadow-md">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-extrabold text-sm sm:text-base text-red-900 dark:text-red-200">
                Sizda davom etayotgan 2 Soatlik Sinov mavjud!
              </h3>
              <p className="text-xs text-red-700 dark:text-red-300">
                Qolgan vaqt: <span className="font-mono font-bold text-sm">{activeChallengeRemainingFormatted}</span>.
                Vaqt tugashidan oldin javoblarni belgilab sinovni topshiring.
              </p>
            </div>
          </div>
          <button
            onClick={() => onSelectMode('challenge')}
            className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold rounded-xl shadow-xs shrink-0 cursor-pointer"
          >
            Sinovni Davom Ettirish →
          </button>
        </div>
      )}

      {/* Monthly Competition Countdown Banner (Every 25th of the month) */}
      <div className="bg-gradient-to-r from-red-950 via-slate-900 to-indigo-950 border border-red-500/40 rounded-3xl p-6 sm:p-8 text-white shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="space-y-2 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-[11px] font-bold tracking-wide uppercase flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-400" />
              Oylik Katta Musobaqa
            </span>
            <span className="text-xs text-slate-400">Har oyning 25-sanasida</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            Navbatdagi Oylik Musobaqa
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
            Platformamiz tomonidan oʻtkaziladigan 120 daqiqalik oylik bellashuv. 30 talik maxsus testlar bloki, real-time reyting va gʻoliblarga maxsus diplomlar!
          </p>
        </div>

        {/* 4-digit Countdown Timer */}
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 min-w-[65px]">
              <span className="block font-mono text-xl sm:text-2xl font-black text-amber-400">
                {String(competitionTimeLeft.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Kun</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 min-w-[65px]">
              <span className="block font-mono text-xl sm:text-2xl font-black text-white">
                {String(competitionTimeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Soat</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 min-w-[65px]">
              <span className="block font-mono text-xl sm:text-2xl font-black text-white">
                {String(competitionTimeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Daqiqa</span>
            </div>
            <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 border border-white/10 min-w-[65px]">
              <span className="block font-mono text-xl sm:text-2xl font-black text-red-400">
                {String(competitionTimeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Soniya</span>
            </div>
          </div>

          <button
            onClick={() => onSelectMode('challenge')}
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-red-600 to-rose-600 hover:from-red-700 hover:to-rose-700 text-white font-extrabold text-xs sm:text-sm rounded-2xl shadow-lg shadow-red-950/50 hover:scale-105 transition-all flex items-center justify-center gap-2 cursor-pointer shrink-0"
          >
            <Trophy className="w-4 h-4" />
            Musobaqa Sahifasi →
          </button>
        </div>
      </div>

      {/* 4 Learning & Gaming Modes Showcase */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Taʼlim va Öyin Rejimlari
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Özingizga mos rejimni tanlab bilimlarni mustahkamlang
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {/* Mode 1: Games Arena */}
          <div
            onClick={() => onSelectMode('games')}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-amber-400 dark:hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-full">
                  Intellektual Öyinlar
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                  Öyinlar Zali
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Xazina Izlaş, Tezkor Poyga va 3D Kartochkalar orqali bilimni mustahkamlash.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-amber-600 dark:text-amber-400">
              <span>Öynaşni boşlaş</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mode 2: Interactive Test Solving */}
          <div
            onClick={() => onSelectMode('quiz')}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-emerald-400 dark:hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <CheckCircle className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  Rejim B
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                  Test Yeçiş & AI
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Xato qilsangiz, AI repetitor darslikdagi aniq faktlarga tayanib tuşuntiradi.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              <span>Testlarni yeçiş</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mode 3: Concise Summaries */}
          <div
            onClick={() => onSelectMode('summary')}
            className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 hover:border-indigo-400 dark:hover:border-indigo-500 hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 flex items-center justify-center group-hover:scale-110 transition-transform">
                <BookOpen className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/50 px-2 py-0.5 rounded-full">
                  Rejim A
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  Londa Konspektlar
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  Darsliklar asosida punktma-punkt tuşuntirişlar va muhim formulalar.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-indigo-600 dark:text-indigo-400">
              <span>Konspektlarni öqiş</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>

          {/* Mode 4: Musobaqalar */}
          <div
            onClick={() => onSelectMode('challenge')}
            className="group bg-white dark:bg-slate-900 rounded-2xl border-2 border-red-200 dark:border-red-900/60 p-6 hover:border-red-400 dark:hover:border-red-500 hover:shadow-lg transition-all cursor-pointer relative flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Trophy className="w-6 h-6" />
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-950/50 px-2 py-0.5 rounded-full">
                  Oylik Bellashuv
                </span>
                <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  Musobaqalar (25-sana)
                </h3>
                <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 leading-relaxed">
                  120 daqiqalik oylik musobaqa sinovi va peshqadamlar roʻyxati.
                </p>
              </div>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-red-600 dark:text-red-400">
              <span>Musobaqaga kirish</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </div>

      {/* Fanlar Ro'yxati (Subjects Grid) */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Fanni Tanlang
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Darsliklar va testlar boʻyicha oʻrganish uchun kerakli fanni tanlang
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {ALL_SUBJECTS.map((subject) => {
            const stats = getSubjectStats(subject);
            const isSelected = selectedSubject === subject;

            return (
              <div
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`p-5 rounded-2xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50/50 dark:bg-indigo-950/40 shadow-sm ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subjectIcons[subject] || '📚'}</span>
                    <div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                        {subject}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {stats.chaptersCount} ta bob • {stats.questionsCount} ta test
                      </p>
                    </div>
                  </div>
                  {isSelected && (
                    <span className="p-1 rounded-full bg-indigo-600 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubject(subject);
                      onSelectMode('summary');
                    }}
                    className="text-[11px] font-bold text-indigo-700 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    Konspekt
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSubject(subject);
                      onSelectMode('quiz');
                    }}
                    className="text-[11px] font-bold text-emerald-700 dark:text-emerald-400 hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <CheckCircle className="w-3.5 h-3.5" />
                    Test Yechish
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
