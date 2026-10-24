import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { StudentDashboard } from './components/StudentDashboard';
import { SummaryModeView } from './components/SummaryModeView';
import { QuizModeView } from './components/QuizModeView';
import { ChallengeModeView } from './components/ChallengeModeView';
import { GamesArena } from './components/GamesArena';
import { UserProfileView } from './components/UserProfileView';
import { AdminPanel } from './components/AdminPanel';
import { AboutView } from './components/AboutView';
import { AuthModal } from './components/AuthModal';
import { SupabaseModal } from './components/SupabaseModal';
import {
  getCurrentUser,
  saveUserProfile,
  clearUserSession,
  getStoredBooks,
  getStoredQuestions,
  getActiveChallenge,
  getStoredTheme,
  saveTheme,
} from './lib/storage';
import { isSupabaseConnected } from './lib/supabase';
import { SubjectType, CustomQuizSet, NavigationTab } from './types';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('dashboard');
  const [currentUser, setCurrentUser] = useState(getCurrentUser());
  const [books, setBooks] = useState(getStoredBooks());
  const [questions, setQuestions] = useState(getStoredQuestions());
  const [selectedSubject, setSelectedSubject] = useState<SubjectType>('Matematika');
  const [theme, setTheme] = useState<'light' | 'dark'>(getStoredTheme());

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(false);
  const [authInitialMode, setAuthInitialMode] = useState<'register' | 'login' | 'admin'>('register');
  const [isSupabaseModalOpen, setIsSupabaseModalOpen] = useState(false);

  // Challenge status & Supabase
  const [activeChallenge, setActiveChallenge] = useState(getActiveChallenge());
  const [supabaseConnected, setSupabaseConnected] = useState(isSupabaseConnected());

  const refreshData = () => {
    setCurrentUser(getCurrentUser());
    setBooks(getStoredBooks());
    setQuestions(getStoredQuestions());
    setActiveChallenge(getActiveChallenge());
    setSupabaseConnected(isSupabaseConnected());
  };

  // Check if first-time user needs to create an account
  useEffect(() => {
    const user = getCurrentUser();
    const hasRealAccount =
      user.has_account ||
      (user.username && user.username.length > 0) ||
      (user.email && user.email.length > 0);
    const seenOnboarding =
      typeof window !== 'undefined' ? localStorage.getItem('zukko_has_seen_onboarding') : null;

    if (!hasRealAccount && !seenOnboarding) {
      setIsFirstTime(true);
      setAuthInitialMode('register');
      setIsAuthModalOpen(true);
      if (typeof window !== 'undefined') {
        localStorage.setItem('zukko_has_seen_onboarding', 'true');
      }
    }
  }, []);

  useEffect(() => {
    saveTheme(theme);
    refreshData();
  }, [theme]);

  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    saveTheme(nextTheme);
  };

  const handleLogout = () => {
    clearUserSession();
    setCurrentTab('dashboard');
    refreshData();
  };

  const handlePlayCustomQuiz = (quiz: CustomQuizSet) => {
    setCurrentTab('games');
  };

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const hasActiveChallenge = !!activeChallenge && activeChallenge.status === 'in_progress';
  const activeChallengeTimeFormatted = activeChallenge
    ? formatTime(activeChallenge.remaining_seconds)
    : undefined;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      {/* Navigation Bar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={(tab) => {
          if (tab === 'admin' && !currentUser.is_admin) {
            setIsAuthModalOpen(true);
          } else {
            setCurrentTab(tab);
          }
        }}
        currentUser={currentUser}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onOpenSupabase={() => setIsSupabaseModalOpen(true)}
        hasActiveChallenge={hasActiveChallenge}
        activeChallengeTimeFormatted={activeChallengeTimeFormatted}
        isSupabaseConnected={supabaseConnected}
        onLogout={handleLogout}
      />

      {/* Main Content Body */}
      <main className="flex-1 pb-16">
        {currentTab === 'dashboard' && (
          <StudentDashboard
            currentUser={currentUser}
            books={books}
            questions={questions}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onSelectMode={(mode) => setCurrentTab(mode)}
            hasActiveChallenge={hasActiveChallenge}
            activeChallengeRemainingFormatted={activeChallengeTimeFormatted}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}

        {currentTab === 'games' && (
          <GamesArena
            questions={questions}
            currentUser={currentUser}
            onDataUpdated={refreshData}
            onNavigateToProfile={() => setCurrentTab('profile')}
          />
        )}

        {currentTab === 'profile' && (
          <UserProfileView
            currentUser={currentUser}
            onDataUpdated={refreshData}
            onPlayCustomQuiz={handlePlayCustomQuiz}
            onNavigateToGames={() => setCurrentTab('games')}
          />
        )}

        {currentTab === 'summary' && (
          <SummaryModeView
            books={books}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onNavigateToQuiz={(sub) => {
              setSelectedSubject(sub);
              setCurrentTab('quiz');
            }}
          />
        )}

        {currentTab === 'quiz' && (
          <QuizModeView
            questions={questions}
            books={books}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
            onDataUpdated={refreshData}
          />
        )}

        {currentTab === 'challenge' && (
          <ChallengeModeView
            questions={questions}
            books={books}
            currentUser={currentUser}
            onDataUpdated={refreshData}
          />
        )}

        {currentTab === 'about' && (
          <AboutView onNavigateToTab={(tab) => setCurrentTab(tab)} />
        )}

        {currentTab === 'admin' && (
          <AdminPanel
            currentUser={currentUser}
            books={books}
            questions={questions}
            onDataUpdated={refreshData}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-slate-500 dark:text-slate-400 transition-colors">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>
            © {new Date().getFullYear()} <strong>ZUKKO AI 1.3</strong> — Oʻzbekistondagi Sunʼiy Intellektual Taʼlim & Öyin Platformasi
          </p>
          <div className="flex items-center gap-4 text-xs font-semibold text-slate-600 dark:text-slate-400">
            <button
              onClick={() => setCurrentTab('games')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Öyinlar Zali
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('challenge')}
              className="hover:text-red-600 dark:hover:text-red-400 cursor-pointer"
            >
              Oylik Musobaqalar
            </button>
            <span>•</span>
            <button
              onClick={() => setCurrentTab('about')}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 cursor-pointer"
            >
              Tizim Haqida
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSupabaseModalOpen(true)}
              className="text-indigo-600 dark:text-indigo-400 hover:underline cursor-pointer"
            >
              Supabase Sozlamalari
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => {
          setIsAuthModalOpen(false);
          setIsFirstTime(false);
        }}
        currentUser={currentUser}
        initialMode={authInitialMode}
        isFirstTime={isFirstTime}
        onSaveProfile={(updated) => {
          saveUserProfile(updated);
          refreshData();
        }}
        onSwitchToAdminTab={() => setCurrentTab('admin')}
      />

      <SupabaseModal
        isOpen={isSupabaseModalOpen}
        onClose={() => setIsSupabaseModalOpen(false)}
        onConfigChanged={refreshData}
      />
    </div>
  );
}
