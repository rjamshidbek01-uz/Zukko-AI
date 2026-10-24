import React from 'react';
import {
  BookOpen,
  CheckCircle,
  Clock,
  ShieldCheck,
  User,
  GraduationCap,
  Gamepad2,
  Flame,
  Sun,
  Moon,
  LogOut,
  Trophy,
  Info,
  UserPlus,
} from 'lucide-react';
import { UserSession, NavigationTab } from '../types';

interface NavbarProps {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  currentUser: UserSession;
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
  onOpenAuth: () => void;
  onOpenSupabase: () => void;
  hasActiveChallenge: boolean;
  activeChallengeTimeFormatted?: string;
  isSupabaseConnected: boolean;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  theme,
  onToggleTheme,
  onOpenAuth,
  onOpenSupabase,
  hasActiveChallenge,
  activeChallengeTimeFormatted,
  isSupabaseConnected,
  onLogout,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* ZONE 1: Brand Wordmark */}
          <div
            onClick={() => setCurrentTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-amber-500 flex items-center justify-center text-white shadow-xs group-hover:scale-105 transition-transform">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white">
                ZUKKO <span className="text-indigo-600 dark:text-indigo-400">AI</span>
              </span>
              <span className="px-1.5 py-0.5 text-[10px] font-black rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                1.3
              </span>
              <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 hidden sm:inline">
                Taʼlim & Öyinlar
              </span>
            </div>
          </div>

          {/* ZONE 2: Clean Navigation Links (Single Line, No Collision) */}
          <nav className="hidden lg:flex items-center gap-1 bg-slate-100/70 dark:bg-slate-800/60 p-1 rounded-xl border border-slate-200/60 dark:border-slate-700/60">
            <button
              onClick={() => setCurrentTab('dashboard')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'dashboard'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Boş sahifa
            </button>

            <button
              onClick={() => setCurrentTab('summary')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'summary'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              Konspektlar
            </button>

            <button
              onClick={() => setCurrentTab('quiz')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'quiz'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Test yeçiş
            </button>

            <button
              onClick={() => setCurrentTab('games')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'games'
                  ? 'bg-amber-500 text-white shadow-xs font-bold'
                  : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50/50 dark:hover:bg-slate-700'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              Öyinlar zali
            </button>

            <button
              onClick={() => setCurrentTab('challenge')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'challenge'
                  ? 'bg-red-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              } ${hasActiveChallenge ? 'ring-2 ring-red-400 text-red-600 animate-pulse' : ''}`}
            >
              <Trophy className="w-3.5 h-3.5" />
              Musobaqalar
              {hasActiveChallenge && (
                <span className="px-1.5 py-0.5 text-[10px] bg-red-100 text-red-700 rounded-full font-mono font-bold">
                  {activeChallengeTimeFormatted}
                </span>
              )}
            </button>

            <button
              onClick={() => setCurrentTab('profile')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'profile'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Profil
            </button>

            <button
              onClick={() => setCurrentTab('about')}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                currentTab === 'about'
                  ? 'bg-white dark:bg-slate-900 text-indigo-700 dark:text-indigo-300 shadow-xs'
                  : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              <Info className="w-3.5 h-3.5" />
              Tizim haqida
            </button>

            {currentUser.is_admin && (
              <button
                onClick={() => setCurrentTab('admin')}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  currentTab === 'admin'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-amber-100/60 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 hover:bg-amber-200/60'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                Admin
              </button>
            )}
          </nav>

          {/* ZONE 3: Theme Toggle + Streak + User Actions */}
          <div className="flex items-center gap-2.5 shrink-0">
            {/* Dark/Light Switcher */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-amber-400 transition-colors cursor-pointer"
              title={theme === 'dark' ? 'Kunduzgi rejim' : 'Tungi rejim'}
            >
              {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Daily Streak Indicator */}
            <div
              onClick={() => setCurrentTab('profile')}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 text-amber-600 dark:text-amber-400 text-xs font-bold cursor-pointer"
              title="Kunlik seriya"
            >
              <Flame className="w-3.5 h-3.5" />
              <span className="font-mono">{currentUser.streak_days || 1} kun</span>
            </div>

            {/* Profile Pill */}
            {currentUser.has_account || currentUser.email ? (
              <div className="flex items-center gap-1.5">
                <button
                  onClick={() => setCurrentTab('profile')}
                  className="flex items-center gap-2 px-2.5 py-1 rounded-xl bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 hover:bg-slate-200/70 transition-all cursor-pointer"
                >
                  <span className="text-base">{currentUser.avatar || '👨‍🎓'}</span>
                  <div className="hidden md:block text-left text-xs">
                    <p className="font-bold text-slate-800 dark:text-slate-200 leading-tight truncate max-w-[100px]">
                      {currentUser.user_name}
                    </p>
                    <p className="text-[10px] text-indigo-600 dark:text-indigo-400 font-mono">
                      LVL {currentUser.level || 1} ({currentUser.xp || 0} XP)
                    </p>
                  </div>
                </button>
                <button
                  onClick={onLogout}
                  title="Chiqish"
                  className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-indigo-600 hover:bg-indigo-700 text-white transition-all flex items-center gap-1.5 shadow-xs cursor-pointer"
              >
                <UserPlus className="w-3.5 h-3.5" />
                Akkount Yaratish / Kirish
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation Strip */}
        <div className="lg:hidden flex items-center justify-around py-2 border-t border-slate-100 dark:border-slate-800 overflow-x-auto gap-2 text-[11px]">
          <button
            onClick={() => setCurrentTab('dashboard')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'dashboard' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Boş sahifa
          </button>
          <button
            onClick={() => setCurrentTab('summary')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'summary' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Konspektlar
          </button>
          <button
            onClick={() => setCurrentTab('quiz')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'quiz' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Testlar
          </button>
          <button
            onClick={() => setCurrentTab('games')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'games' ? 'bg-amber-500 text-white font-bold' : 'text-amber-600 font-bold'
            }`}
          >
            Öyinlar 🎮
          </button>
          <button
            onClick={() => setCurrentTab('challenge')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'challenge' ? 'bg-red-500 text-white font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Musobaqa 🏆
          </button>
          <button
            onClick={() => setCurrentTab('profile')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'profile' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Profil
          </button>
          <button
            onClick={() => setCurrentTab('about')}
            className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
              currentTab === 'about' ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-bold' : 'text-slate-600 dark:text-slate-400'
            }`}
          >
            Haqida ℹ️
          </button>
          {currentUser.is_admin && (
            <button
              onClick={() => setCurrentTab('admin')}
              className={`px-2 py-1 rounded-md font-medium whitespace-nowrap cursor-pointer ${
                currentTab === 'admin' ? 'bg-indigo-600 text-white font-bold' : 'text-amber-700 font-bold'
              }`}
            >
              Admin 🛡️
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
