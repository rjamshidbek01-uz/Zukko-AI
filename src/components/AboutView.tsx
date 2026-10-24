import React from 'react';
import {
  GraduationCap,
  BookOpen,
  CheckCircle,
  Gamepad2,
  Trophy,
  Users,
  Send,
  ExternalLink,
  ShieldCheck,
  Zap,
  Sparkles,
  Award,
} from 'lucide-react';

interface AboutViewProps {
  onNavigateToTab: (tab: 'dashboard' | 'summary' | 'quiz' | 'challenge' | 'games') => void;
}

export const AboutView: React.FC<AboutViewProps> = ({ onNavigateToTab }) => {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 animate-in fade-in">
      {/* Hero Banner */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 text-white rounded-3xl p-8 sm:p-12 border border-indigo-800/50 shadow-2xl">
        <div className="absolute -right-20 -bottom-20 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-indigo-200 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Milliy Sunʼiy Intellektual Taʼlim Platformasi</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight">
            Zukko AI <span className="text-amber-400">1.3</span> Haqida
          </h1>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Zukko AI — Özbekiston maktab darsliklari va test standartlariga toʻla moslashtirilgan, öquvçilarga interaktiv darslik mutolaasi, sunʼiy intellekt repetitori, bilimni mustahkamlovçi öyinlar hamda platformamiz oylik musobaqalarini taqdim etuvçi zamonaviy intellektual ekotizimdir.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigateToTab('summary')}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4" />
              Konspektlarni öqiş
            </button>
            <button
              onClick={() => onNavigateToTab('challenge')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Musobaqalarga ötış
            </button>
          </div>
        </div>
      </div>

      {/* 4 Core Features / How It Works */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Tizimdan Qanday Foydalaniladi?
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Har bir bölim öquvçining fanlarni oson va qiziqarli özlashtirişi uçun loyihalashtirilgan
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Step 1 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-400 flex items-center justify-center font-bold">
              1
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Darsliklar Mutolaasi va AI Konspektlar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Rasmiy darsliklarni içki xavfsiz PDF oʻquvçi orqali sahifama-sahifa örganing. <strong>"AI bilan konspekt yaratish"</strong> tugmasi matndan muhim qoidalar va formulalarni ajratib, qisqa xulosalar shaklida taqdim etadi.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 flex items-center justify-center font-bold">
              2
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              DTM Formatidagi 30 talik Testlar
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Barcha asosiy fanlar boʻyiça rasmiy DTM qoliplaridagi 30 talik testlarni yeçing. Notoʻğri javob bergan taqdiringizda, AI repetitor darslikdagi aniq faktlarga tayanib, xatoning asl sababini tuşuntirib beradi.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 flex items-center justify-center font-bold">
              3
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Gamepad2 className="w-4 h-4 text-amber-600" />
              Intellektual Öyinlar Zali
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Zerikarli yodlash örniga <strong>Xazina Izlaş</strong> (sirli sandiqlar), <strong>Tezkor Poyga</strong> (60 soniyali kombo poygasi) hamda <strong>3D Kartochkalar</strong> öyinlarida ishtirok eting va real-time XP jamğaring.
            </p>
          </div>

          {/* Step 4 */}
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-3">
            <div className="w-10 h-10 rounded-xl bg-red-100 dark:bg-red-950/60 text-red-700 dark:text-red-400 flex items-center justify-center font-bold">
              4
            </div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-red-600" />
              Oylik Musobaqalar (25-sana)
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Har oyning 25-sanasida platformamiz tomonidan tashkil etiladigan 120 daqiqalik oylik musobaqa boʻlib oʻtadi. Jonli taymer eng yaqin musobaqagacha qolgan vaqtni doimiy koʻrsatib turadi.
            </p>
          </div>
        </div>
      </div>

      {/* Creators & Authors Section */}
      <div className="bg-gradient-to-r from-indigo-50 to-amber-50 dark:from-slate-900 dark:to-indigo-950/50 rounded-3xl p-8 border border-indigo-100 dark:border-slate-800 shadow-xs space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center shadow-md">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Loyiha Yaratuvchilari va Mualliflar
            </h2>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Platformaning ğoyasi, arxitekturasi va dasturiy taʼminotini işlab çiqqan jamoa
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {/* Creator 1 */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-extrabold flex items-center justify-center text-sm shrink-0">
              OH
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Obidjonov Hojiakbar
              </h4>
            </div>
          </div>

          {/* Creator 2 */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300 font-extrabold flex items-center justify-center text-sm shrink-0">
              RJ
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Rustamjanov Jamshidbek
              </h4>
            </div>
          </div>

          {/* Creator 3 */}
          <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 font-extrabold flex items-center justify-center text-sm shrink-0">
              XŞ
            </div>
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Xabibullayev Şohjahon
              </h4>
            </div>
          </div>
        </div>

        {/* Telegram Contact Box */}
        <div className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-indigo-200 dark:border-indigo-900/60 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white flex items-center justify-center shadow-xs">
              <Send className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Murojaat va Takliflar Uçun
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Savollar, hamkorlik yoki takliflar boʻyiça bevosita Telegram orqali boğlaning
              </p>
            </div>
          </div>

          <a
            href="https://t.me/jamshidbekrustamjanov"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold transition-all flex items-center gap-2 shadow-xs cursor-pointer shrink-0"
          >
            <span>t.me@jamshidbekrustamjanov</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Standards & Orthography Badge */}
      <div className="p-5 bg-slate-100 dark:bg-slate-800/70 rounded-2xl border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-indigo-600 dark:text-indigo-400 shrink-0" />
          <span>
            Barcha matnlar takomillashtirilgan özbek lotin alifbosi (<strong>Ğ, Ö, Ş, Ç</strong>) qoidalariga qatʼiy moslashtirilgan.
          </span>
        </div>
        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
          Zukko AI v1.3
        </span>
      </div>
    </div>
  );
};
