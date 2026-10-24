import React, { useState, useEffect, useRef } from 'react';
import {
  Clock,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Award,
  ChevronLeft,
  ChevronRight,
  Flag,
  BookOpen,
  Send,
  XCircle,
  ShieldCheck,
  Sparkles,
  Trophy,
  Lock,
  Play,
  Users,
  Search,
  Filter,
  Calendar,
  Zap,
  Medal,
  Eye,
  Check,
  Info,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  TestQuestion,
  BookChapter,
  ChallengeSession,
  UserSession,
  CompetitionConfig,
  CompetitionResult,
  CompetitionParticipant,
  CompetitionPhase,
  CompetitionPhaseDetail,
} from '../types';
import {
  getActiveChallenge,
  startNewChallenge,
  saveChallenge,
  recordTestResult,
  getCompetitionConfig,
  saveCompetitionConfig,
  getCompetitionPhase,
  getCompetitionResults,
  recordCompetitionResult,
  getCompetitionParticipants,
  joinCompetitionLobby,
  isUserInCompetitionLobby,
} from '../lib/storage';
import { ALL_SUBJECTS } from '../data/initialData';

interface ChallengeModeViewProps {
  questions: TestQuestion[];
  books: BookChapter[];
  currentUser: UserSession;
  onDataUpdated: () => void;
}

type TabType = 'arena' | 'leaderboard' | 'rules';

export const ChallengeModeView: React.FC<ChallengeModeViewProps> = ({
  questions,
  books,
  currentUser,
  onDataUpdated,
}) => {
  const [activeTab, setActiveTab] = useState<TabType>('arena');
  const [activeChallenge, setActiveChallengeState] = useState<ChallengeSession | null>(
    getActiveChallenge()
  );
  const [selectedSubject, setSelectedSubject] = useState<string>('Barcha fanlar (Aralash)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<number>>(new Set());
  const [showFinishModal, setShowFinishModal] = useState(false);

  // Competition Config & Timing
  const [competitionConfig, setCompetitionConfig] = useState<CompetitionConfig>(getCompetitionConfig());
  const [countdownRemaining, setCountdownRemaining] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [phaseDetail, setPhaseDetail] = useState<CompetitionPhaseDetail>(getCompetitionPhase());
  const [competitionPhase, setCompetitionPhase] = useState<CompetitionPhase>(getCompetitionPhase().phase);
  const [windowRemainingSeconds, setWindowRemainingSeconds] = useState(0);

  // Leaderboard & Lobby State
  const [leaderboardResults, setLeaderboardResults] = useState<CompetitionResult[]>(getCompetitionResults());
  const [participants, setParticipants] = useState<CompetitionParticipant[]>(getCompetitionParticipants());
  const [isRegisteredInLobby, setIsRegisteredInLobby] = useState<boolean>(
    isUserInCompetitionLobby(currentUser.session_id)
  );
  const [searchQuery, setSearchQuery] = useState('');
  const [leaderboardSubjectFilter, setLeaderboardSubjectFilter] = useState('Barchasi');
  const [adminNotification, setAdminNotification] = useState<string | null>(null);

  // Keep countdown & phases synchronized in real-time
  useEffect(() => {
    const syncPhaseAndTimer = () => {
      const cfg = getCompetitionConfig();
      setCompetitionConfig(cfg);
      const phaseInfo = getCompetitionPhase(cfg);
      setPhaseDetail(phaseInfo);
      setCompetitionPhase(phaseInfo.phase);
      setWindowRemainingSeconds(phaseInfo.remainingSeconds);

      // Countdown diff depends on phase
      let diff = 0;
      if (phaseInfo.phase === 'upcoming') {
        diff = phaseInfo.remainingSeconds;
      } else if (phaseInfo.phase === 'active') {
        diff = phaseInfo.remainingSeconds;
      } else if (phaseInfo.phase === 'completed_recent') {
        diff = phaseInfo.remainingVisibilitySeconds;
      }

      const days = Math.floor(diff / 86400);
      const hours = Math.floor((diff % 86400) / 3600);
      const minutes = Math.floor((diff % 3600) / 60);
      const seconds = diff % 60;

      setCountdownRemaining({ days, hours, minutes, seconds });
      setLeaderboardResults(getCompetitionResults());
      setParticipants(getCompetitionParticipants());
      setIsRegisteredInLobby(isUserInCompetitionLobby(currentUser.session_id));
    };

    syncPhaseAndTimer();
    const interval = setInterval(syncPhaseAndTimer, 1000);
    return () => clearInterval(interval);
  }, [currentUser.session_id]);

  // Timer reference for active test session
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Sync remaining seconds on mount and interval when a test is running
  useEffect(() => {
    const current = getActiveChallenge();
    setActiveChallengeState(current);

    if (current && current.status === 'in_progress') {
      timerRef.current = setInterval(() => {
        const now = Date.now();
        const elapsed = Math.floor((now - current.start_timestamp) / 1000);
        const remaining = Math.max(0, current.total_duration_seconds - elapsed);

        if (remaining <= 0) {
          clearInterval(timerRef.current!);
          finalizeChallenge({ ...current, remaining_seconds: 0, status: 'expired' });
        } else {
          current.remaining_seconds = remaining;
          current.last_tick_timestamp = now;
          saveChallenge(current);
          setActiveChallengeState({ ...current });
        }
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  // Format seconds into HH:MM:SS
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  const formatShortTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes} daq ${seconds.toString().padStart(2, '0')} son`;
  };

  // User registers into the waiting lobby
  const handleJoinLobby = () => {
    const updated = joinCompetitionLobby(currentUser);
    setParticipants(updated);
    setIsRegisteredInLobby(true);
    onDataUpdated();
  };

  // Admin toggles instant live start (for live test & demo purposes)
  const handleAdminToggleLive = () => {
    if (!currentUser.is_admin) return;

    if (competitionConfig.force_started) {
      // Revert back to scheduled 25th of month
      const updated: CompetitionConfig = {
        ...competitionConfig,
        force_started: false,
      };
      saveCompetitionConfig(updated);
      setCompetitionConfig(updated);
      setAdminNotification("Musobaqa rejalashtirilgan kutish holatiga qaytarildi.");
    } else {
      // Force start now
      const updated: CompetitionConfig = {
        ...competitionConfig,
        force_started: true,
        target_date: new Date().toISOString(),
      };
      saveCompetitionConfig(updated);
      setCompetitionConfig(updated);
      setAdminNotification("⚡ Musobaqa barcha uchun JONLI rejimda ochildi!");
    }
    setTimeout(() => setAdminNotification(null), 4000);
    onDataUpdated();
  };

  // Start a new 2-Hour challenge (ONLY allowed when phase === 'active' or force_started)
  const handleStartChallenge = () => {
    if (competitionPhase === 'upcoming') {
      alert("Musobaqa hali boshlanmagan! Barcha ishtirokchilar belgilangan vaqtda bir vaqtda boshlaydilar.");
      return;
    }

    // Select questions
    let pool = questions;
    if (selectedSubject !== 'Barcha fanlar (Aralash)') {
      pool = questions.filter((q) => q.subject === selectedSubject);
    }

    if (pool.length === 0) {
      pool = questions; // Fallback to all questions if none match
    }

    // Shuffle and pick 30 questions (official DTM block)
    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(30, shuffled.length));
    const questionIds = selected.map((q) => q.id);

    // Make sure user is in lobby
    joinCompetitionLobby(currentUser);

    const challenge = startNewChallenge(selectedSubject, questionIds);
    setActiveChallengeState(challenge);
    setCurrentIndex(0);
    setFlaggedQuestions(new Set());
    setActiveTab('arena');
    onDataUpdated();
  };

  // Select answer in challenge
  const handleSelectAnswer = (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (!activeChallenge || activeChallenge.status !== 'in_progress') return;

    const currentQId = activeChallenge.question_ids[currentIndex];
    const updatedAnswers = {
      ...activeChallenge.user_answers,
      [currentQId]: optionKey,
    };

    const updated = {
      ...activeChallenge,
      user_answers: updatedAnswers,
    };

    saveChallenge(updated);
    setActiveChallengeState(updated);
  };

  const toggleFlag = (index: number) => {
    setFlaggedQuestions((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  // Finalize challenge and immediately publish to the Live Leaderboard
  const finalizeChallenge = (targetChallenge?: ChallengeSession) => {
    const ch = targetChallenge || activeChallenge;
    if (!ch) return;

    // Calculate score
    let score = 0;
    const testMap = new Map(questions.map((q) => [q.id, q]));

    ch.question_ids.forEach((qid) => {
      const q = testMap.get(qid);
      const userAns = ch.user_answers[qid];
      if (q && userAns && userAns === q.correct_answer) {
        score++;
        recordTestResult(q.subject, q.topic, true);
      } else if (q && userAns) {
        recordTestResult(q.subject, q.topic, false);
      }
    });

    const totalQuestions = ch.question_ids.length;
    const timeSpentSeconds = Math.max(1, ch.total_duration_seconds - ch.remaining_seconds);
    const accuracy = Math.round((score / totalQuestions) * 100);

    const completed: ChallengeSession = {
      ...ch,
      status: 'completed',
      score,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString(),
    };

    saveChallenge(completed);
    setActiveChallengeState(completed);
    setShowFinishModal(false);

    // Record into the official competition leaderboard!
    const updatedLeaderboard = recordCompetitionResult({
      id: 'res-' + ch.id,
      user_name: currentUser.user_name || 'Oʻquvchi',
      session_id: currentUser.session_id,
      avatar: currentUser.avatar || '🎓',
      region: 'Oʻzbekiston',
      subject: ch.subject,
      score,
      total_questions: totalQuestions,
      accuracy_percentage: accuracy,
      time_spent_seconds: timeSpentSeconds,
      reward_xp: score * 15 + (accuracy >= 90 ? 200 : 50),
      completed_at: new Date().toISOString(),
    });

    setLeaderboardResults(updatedLeaderboard);
    onDataUpdated();

    if (accuracy >= 60) {
      confetti({
        particleCount: 120,
        spread: 90,
        origin: { y: 0.6 },
      });
    }
  };

  // Challenge questions list
  const currentChallengeQuestions: TestQuestion[] = (activeChallenge?.question_ids || [])
    .map((id) => questions.find((q) => q.id === id))
    .filter(Boolean) as TestQuestion[];

  const currentQ = currentChallengeQuestions[currentIndex];

  // Filter leaderboard
  const filteredLeaderboard = leaderboardResults.filter((item) => {
    const matchesSearch =
      item.user_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.region && item.region.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesSubject =
      leaderboardSubjectFilter === 'Barchasi' || item.subject === leaderboardSubjectFilter;
    return matchesSearch && matchesSubject;
  });

  const currentUserResult = leaderboardResults.find(
    (r) => r.session_id === currentUser.session_id
  );

  // ----------------------------------------------------
  // RENDER: Active In-Progress Test Session
  // ----------------------------------------------------
  if (activeChallenge && activeChallenge.status === 'in_progress') {
    const answeredCount = Object.keys(activeChallenge.user_answers).length;
    const currentAnswer = currentQ ? activeChallenge.user_answers[currentQ.id] : undefined;
    const isFlagged = flaggedQuestions.has(currentIndex);

    return (
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Top Sticky Test Bar */}
        <div className="bg-slate-900 text-white p-4 sm:p-5 rounded-3xl shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 border border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-red-600 flex items-center justify-center font-bold text-white shadow-md animate-pulse">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm tracking-tight">Oylik Musobaqa — Jonli Sinov</span>
                <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-red-950/80 border border-red-800 text-red-300 font-bold uppercase tracking-wider">
                  🔴 Bir vaqtda
                </span>
              </div>
              <p className="text-[11px] text-slate-400">
                Fan: <strong>{activeChallenge.subject}</strong> • Javob berildi: {answeredCount} / {currentChallengeQuestions.length}
              </p>
            </div>
          </div>

          {/* Synchronized Countdown Timer */}
          <div className="flex items-center gap-3">
            <div className="px-4 py-2 bg-slate-800/90 border border-red-500/40 rounded-2xl font-mono text-xl sm:text-2xl font-extrabold text-red-400 tracking-wider flex items-center gap-2 shadow-inner">
              <Clock className="w-5 h-5 text-red-500" />
              <span>{formatTime(activeChallenge.remaining_seconds)}</span>
            </div>

            <button
              onClick={() => setShowFinishModal(true)}
              className="px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Sinovni Yakunlash
            </button>
          </div>
        </div>

        {/* Main Test Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Question Card */}
          <div className="lg:col-span-8 space-y-4">
            {currentQ && (
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-950/60 px-3 py-1 rounded-xl">
                    Savol {currentIndex + 1} / {currentChallengeQuestions.length} • {currentQ.topic}
                  </span>

                  <button
                    onClick={() => toggleFlag(currentIndex)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                      isFlagged
                        ? 'bg-amber-100 text-amber-800 border border-amber-300 dark:bg-amber-950 dark:text-amber-200'
                        : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    {isFlagged ? 'Belgilangan (Flag)' : 'Belgilash'}
                  </button>
                </div>

                <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h2>

                {/* 4 Option Buttons */}
                <div className="space-y-3">
                  {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                    const isSelected = currentAnswer === optKey;

                    return (
                      <button
                        key={optKey}
                        onClick={() => handleSelectAnswer(optKey)}
                        className={`w-full p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${
                          isSelected
                            ? 'border-indigo-600 bg-indigo-50/80 dark:bg-indigo-950/70 text-indigo-950 dark:text-indigo-200 font-bold ring-2 ring-indigo-500/30 shadow-xs'
                            : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800/60 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-7 h-7 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${
                              isSelected
                                ? 'bg-indigo-600 text-white'
                                : 'bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                            }`}
                          >
                            {optKey}
                          </span>
                          <span>{currentQ.options[optKey]}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Navigation controls */}
                <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <button
                    disabled={currentIndex === 0}
                    onClick={() => setCurrentIndex((prev) => prev - 1)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Oldingi
                  </button>

                  {currentIndex < currentChallengeQuestions.length - 1 ? (
                    <button
                      onClick={() => setCurrentIndex((prev) => prev + 1)}
                      className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      Keyingi
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowFinishModal(true)}
                      className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
                    >
                      Sinovni Yakunlash
                      <Send className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Question Navigator Grid */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-5 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                  Savollar Setkasi
                </h3>
                <span className="text-[11px] font-bold text-slate-500">
                  {answeredCount} / {currentChallengeQuestions.length} yechildi
                </span>
              </div>

              <div className="grid grid-cols-5 gap-2">
                {currentChallengeQuestions.map((q, idx) => {
                  const isAns = !!activeChallenge.user_answers[q.id];
                  const isCurr = currentIndex === idx;
                  const isFlag = flaggedQuestions.has(idx);

                  let badgeClass =
                    'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700';

                  if (isAns) {
                    badgeClass = 'bg-emerald-500 text-white border-emerald-600 font-bold';
                  }
                  if (isFlag && !isAns) {
                    badgeClass = 'bg-amber-100 text-amber-800 border-amber-300 font-bold dark:bg-amber-950 dark:text-amber-200';
                  }
                  if (isCurr) {
                    badgeClass += ' ring-2 ring-indigo-600 ring-offset-2';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIndex(idx)}
                      className={`h-10 rounded-xl text-xs font-semibold border flex items-center justify-center transition-all cursor-pointer ${badgeClass}`}
                    >
                      {idx + 1}
                    </button>
                  );
                })}
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2 text-[11px] text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-emerald-500" />
                  <span>Javob berilgan ({answeredCount})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-amber-100 border border-amber-300" />
                  <span>Belgilangan ({flaggedQuestions.size})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-md bg-slate-100 border border-slate-300 dark:bg-slate-800 dark:border-slate-700" />
                  <span>Javob berilmagan ({currentChallengeQuestions.length - answeredCount})</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Confirmation Modal */}
        {showFinishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full p-6 space-y-4 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-3 text-amber-600 dark:text-amber-400">
                <AlertTriangle className="w-8 h-8 shrink-0" />
                <div>
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">
                    Sinovni yakunlashni tasdiqlaysizmi?
                  </h3>
                  <p className="text-xs text-slate-500">
                    Qolgan vaqt: {formatTime(activeChallenge.remaining_seconds)}
                  </p>
                </div>
              </div>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Jami {currentChallengeQuestions.length} ta savoldan {answeredCount} tasiga javob berdingiz.
                Sinov yakunlangach, sizning ballingiz darhol <strong>Umumiy Peshqadamlar Jadvaliga</strong> kiritiladi.
              </p>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  onClick={() => setShowFinishModal(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer"
                >
                  Davom ettirish
                </button>
                <button
                  onClick={() => finalizeChallenge()}
                  className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold cursor-pointer"
                >
                  Ha, Yakunlash va Natijani Chiqarish
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: Completed Test Review
  // ----------------------------------------------------
  if (activeChallenge && activeChallenge.status === 'completed') {
    const totalQ = activeChallenge.total_questions || currentChallengeQuestions.length;
    const score = activeChallenge.score || 0;
    const percentage = Math.round((score / totalQ) * 100);

    return (
      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {/* Results Hero */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-md text-center space-y-5">
          <div className="w-20 h-20 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mx-auto border-4 border-emerald-100 dark:border-emerald-900">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-1">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full">
              Musobaqa Natijangiz Rasman Saqlandi
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Toʻplangan Ball: {score} / {totalQ} ({percentage}%)
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Ishtirokchi: <strong>{activeChallenge.user_name}</strong> • Fan: <strong>{activeChallenge.subject}</strong>
            </p>
          </div>

          <div className="inline-block px-4 py-2 rounded-2xl text-xs font-bold bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200">
            {percentage >= 85
              ? "🏆 A'lo Natija! Peshqadamlar jadvalining eng yuqori qatorlaridan joy oldingiz."
              : percentage >= 60
              ? '👍 Yaxshi Natija! Bilimlaringiz darslik talablariga mos keladi.'
              : '⚠️ Darslik konspektlarini yana bir bor takrorlab chiqish tavsiya etiladi.'}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setActiveTab('leaderboard');
                setActiveChallengeState(null);
              }}
              className="px-6 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold flex items-center gap-2 shadow-xs transition-all cursor-pointer"
            >
              <Trophy className="w-4 h-4" />
              Jonli Peshqadamlar Jadvalini Koʻrish
            </button>
            <button
              onClick={() => {
                setActiveChallengeState(null);
                setActiveTab('arena');
              }}
              className="px-5 py-2.5 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center gap-2 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              Musobaqa Zaliga Qaytish
            </button>
          </div>
        </div>

        {/* Detailed Questions Review */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white">
            Barcha Savollar Tahlili va Darslikdan Faktlar
          </h2>

          <div className="space-y-4">
            {currentChallengeQuestions.map((q, idx) => {
              const userAns = activeChallenge.user_answers[q.id];
              const isCorrect = userAns === q.correct_answer;

              return (
                <div
                  key={q.id}
                  className={`p-4 rounded-2xl border space-y-2.5 ${
                    isCorrect
                      ? 'border-emerald-200 dark:border-emerald-900 bg-emerald-50/20 dark:bg-emerald-950/20'
                      : 'border-red-200 dark:border-red-900 bg-red-50/20 dark:bg-red-950/20'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          {q.subject}
                        </span>
                        <span className="text-[11px] text-slate-500 font-medium">{q.topic}</span>
                      </div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {idx + 1}. {q.question}
                      </h4>
                    </div>

                    <div className="shrink-0">
                      {isCorrect ? (
                        <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                          <CheckCircle className="w-4 h-4" /> Toʻgʻri
                        </span>
                      ) : (
                        <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1">
                          <XCircle className="w-4 h-4" /> Notoʻgʻri
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                      <div
                        key={opt}
                        className={`p-2 rounded-xl border ${
                          opt === q.correct_answer
                            ? 'bg-emerald-100 dark:bg-emerald-950/80 border-emerald-400 font-bold text-emerald-950 dark:text-emerald-200'
                            : opt === userAns
                            ? 'bg-red-100 dark:bg-red-950/80 border-red-400 font-bold text-red-950 dark:text-red-200'
                            : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-400 opacity-70'
                        }`}
                      >
                        <span className="mr-1 font-bold">{opt})</span>
                        {q.options[opt]}
                      </div>
                    ))}
                  </div>

                  <div className="p-3 bg-amber-50/80 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-xl text-[11px] text-amber-900 dark:text-amber-200 leading-relaxed">
                    <strong>📖 Darslikdan fakt va tahlil:</strong> {q.explanation_reference}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // MAIN VIEW: Arena & Waiting Lobby, Leaderboard, Rules
  // ----------------------------------------------------
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-6">
      {/* Top Header & Navigation Tabs */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200 dark:border-slate-800 pb-5">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-extrabold uppercase tracking-wider text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900/60">
              Platforma Musobaqasi
            </span>
            {competitionPhase === 'active' ? (
              <span className="text-xs font-extrabold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-200 dark:border-emerald-900 animate-pulse flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                Jonli Bellashuv
              </span>
            ) : competitionPhase === 'upcoming' ? (
              <span className="text-xs font-bold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900 flex items-center gap-1">
                <Lock className="w-3 h-3" />
                Bir Vaqtda Boshlanadi (Kutish Zali)
              </span>
            ) : (
              <span className="text-xs font-bold text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                Yakunlangan
              </span>
            )}
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-1">
            {competitionConfig.title || 'Oylik Katta Musobaqa'}
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Har oyning 25-sanasida barcha oʻquvchilar uchun bir vaqtda start beriluvchi 120 daqiqalik rasmiy sinov.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-700">
          <button
            onClick={() => setActiveTab('arena')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'arena'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-red-500" />
            Musobaqa Zali
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'leaderboard'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <Trophy className="w-4 h-4 text-amber-500" />
            Peshqadamlar Jadvali
            <span className="ml-1 text-[10px] px-1.5 py-0.2 bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300 rounded-full font-extrabold">
              {leaderboardResults.length}
            </span>
          </button>
          <button
            onClick={() => setActiveTab('rules')}
            className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
              activeTab === 'rules'
                ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4 text-indigo-500" />
            Qoidalar & Nizom
          </button>
        </div>
      </div>

      {adminNotification && (
        <div className="p-3 bg-emerald-50 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-200 rounded-2xl text-xs font-bold animate-in fade-in">
          {adminNotification}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 1: MUSOBAQA ZALI (LOBBY / WAITING ROOM / START)   */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'arena' && (
        <div className="space-y-6">
          {/* Main Card */}
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-10 shadow-md text-center space-y-6">
            <div className="w-20 h-20 rounded-3xl bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto shadow-inner border border-red-200 dark:border-red-900/60">
              <Trophy className="w-10 h-10" />
            </div>

            <div className="space-y-2 max-w-xl mx-auto">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 tracking-wider uppercase bg-red-50 dark:bg-red-950/60 px-3 py-1 rounded-full border border-red-200 dark:border-red-900/60">
                {competitionPhase === 'active'
                  ? '🔴 Hozir Jonli Bellashuv Ochiq'
                  : '🔒 Barcha Ishtirokchilar Uchun Bir Vaqtda Boshlanadi'}
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                {competitionConfig.title}
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {competitionConfig.description ||
                  'Har oyning 25-sanasida platformamiz tomonidan oʻtkaziluvchi 120 daqiqalik oylik musobaqa. Oʻz bilimingizni sinang, natijalar jadvalida yetakchilik qiling va +500 XP mukofotini qoʻlga kiriting!'}
              </p>
            </div>

            {/* Synchronized Countdown Card */}
            <div className="bg-gradient-to-r from-red-50 to-amber-50 dark:from-slate-800 dark:to-slate-800/80 p-5 rounded-3xl border border-red-200 dark:border-slate-700 space-y-3 max-w-xl mx-auto">
              <div className="text-xs font-bold text-red-600 dark:text-red-400 uppercase tracking-wider flex items-center justify-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>
                  {competitionPhase === 'active'
                    ? 'Jonli Musobaqa Yakunlanishiga Qolgan Vaqt'
                    : `Musobaqa Startiga Qolgan Vaqt (${new Date(competitionConfig.target_date).toLocaleDateString('uz-UZ')}, 10:00)`}
                </span>
              </div>
              <div className="grid grid-cols-4 gap-2.5 max-w-md mx-auto">
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {countdownRemaining.days}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Kun</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {countdownRemaining.hours}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Soat</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white font-mono">
                    {countdownRemaining.minutes}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Daqiqa</span>
                </div>
                <div className="bg-white dark:bg-slate-900 p-3 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
                  <span className="block text-xl sm:text-2xl font-extrabold text-red-600 dark:text-red-400 font-mono animate-pulse">
                    {countdownRemaining.seconds}
                  </span>
                  <span className="text-[10px] text-slate-500 uppercase font-semibold">Soniya</span>
                </div>
              </div>
            </div>

            {/* Why Start is Locked Notice when Upcoming */}
            {competitionPhase === 'upcoming' && (
              <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 rounded-2xl max-w-xl mx-auto text-left flex items-start gap-3">
                <Info className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                    Nega musobaqani hozir alohida boshlab boʻlmaydi?
                  </h4>
                  <p className="text-xs text-amber-800 dark:text-amber-300 leading-relaxed">
                    Oylik musobaqa adolatli va teng sharoitda oʻtkazilishi shart. Barcha ishtirokchilar musobaqani aynan belgilangan daqiqada bir vaqtda boshlaydilar. Taymer tugashi bilan test avtomatik ochiladi.
                  </p>
                </div>
              </div>
            )}

            {/* Waiting Lobby Participants Box */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-xl mx-auto text-left space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Kutish Zali ({participants.length} nafar oʻquvchi tayyor)
                  </span>
                </div>
                {isRegisteredInLobby ? (
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" /> Siz kutish zalidasiz
                  </span>
                ) : (
                  <button
                    onClick={handleJoinLobby}
                    className="px-3 py-1 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg text-xs font-bold transition-all cursor-pointer"
                  >
                    Kutish zaliga qoʻshilish
                  </button>
                )}
              </div>

              {/* Avatar stack */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {participants.slice(0, 10).map((p) => (
                  <div
                    key={p.id}
                    title={`${p.user_name} (${p.region || 'Oʻzbekiston'})`}
                    className="w-8 h-8 rounded-full bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 flex items-center justify-center text-sm shadow-xs"
                  >
                    {p.avatar}
                  </div>
                ))}
                {participants.length > 10 && (
                  <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-[10px] font-extrabold">
                    +{participants.length - 10}
                  </div>
                )}
              </div>
            </div>

            {/* Subject Selector */}
            <div className="max-w-sm mx-auto text-left space-y-1.5">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Musobaqa Fani:
              </label>
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="w-full px-4 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-2 focus:ring-red-500"
              >
                <option value="Barcha fanlar (Aralash)">Barcha fanlar (Aralash blok)</option>
                {ALL_SUBJECTS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>

            {/* The Critical Action Button */}
            <div className="pt-2">
              {competitionPhase === 'active' ? (
                <button
                  onClick={handleStartChallenge}
                  className="px-8 py-4 bg-red-600 hover:bg-red-700 text-white rounded-2xl text-sm font-extrabold shadow-xl shadow-red-200 dark:shadow-none hover:scale-105 transition-all cursor-pointer inline-flex items-center gap-2 animate-bounce"
                >
                  <Play className="w-5 h-5 fill-current" />
                  Musobaqani Boshlash (30 ta test, 120:00)
                </button>
              ) : (
                <div className="space-y-2">
                  <button
                    disabled
                    className="px-8 py-4 bg-slate-200 dark:bg-slate-800 text-slate-400 dark:text-slate-500 rounded-2xl text-sm font-extrabold cursor-not-allowed inline-flex items-center gap-2 border border-slate-300 dark:border-slate-700"
                  >
                    <Lock className="w-5 h-5" />
                    Musobaqa Hali Boshlanmagan (Start vaqtini kuting)
                  </button>
                  <p className="text-[11px] text-slate-500">
                    Vaqt yetib kelishi bilan bu tugma avtomatik faollashadi.
                  </p>
                </div>
              )}
            </div>

            {/* Admin Override Controls (For Instant Testing / Demo) */}
            {currentUser.is_admin && (
              <div className="mt-6 pt-5 border-t border-dashed border-red-200 dark:border-slate-800 max-w-md mx-auto p-4 bg-red-50/50 dark:bg-slate-800/40 rounded-2xl text-left space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-red-700 dark:text-red-400 flex items-center gap-1">
                    <Zap className="w-3.5 h-3.5" /> Admin Sinov Boshqaruvi
                  </span>
                  <span className="text-[10px] bg-red-100 dark:bg-red-950 text-red-700 dark:text-red-300 px-2 py-0.5 rounded-full font-bold">
                    Faqat Admin
                  </span>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Siz administratorsiz. Sinov maqsadida musobaqani 25-sanagacha kutmasdan hoziroq hamma uchun jonli ochishingiz yoki qayta qulflashingiz mumkin:
                </p>
                <button
                  onClick={handleAdminToggleLive}
                  className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-2 ${
                    competitionConfig.force_started
                      ? 'bg-amber-600 hover:bg-amber-700 text-white'
                      : 'bg-red-600 hover:bg-red-700 text-white'
                  }`}
                >
                  <Zap className="w-4 h-4" />
                  {competitionConfig.force_started
                    ? "Rejali Kutish Rejimiga Qaytarish"
                    : "⚡ Musobaqani Hoziroq Barcha Uchun Ochish (Live Start)"}
                </button>
              </div>
            )}
          </div>

          {/* Quick Leaderboard Preview (Conditioned on time phase logic) */}
          {competitionPhase === 'upcoming' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs text-center space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-900/60">
                <Lock className="w-6 h-6" />
              </div>
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Musobaqa Hali Boshlanmadi
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                  Musobaqa boshlanishidan oldin natijalar umuman koʻrinmaydi. Barcha oʻquvchilar belgilangan vaqtda bir vaqtda testni boshlagach, natijalar canli (live) aks etadi.
                </p>
              </div>
              <button
                onClick={() => setActiveTab('leaderboard')}
                className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 cursor-pointer"
              >
                Kutish va qoidalar bilan tanishish <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {competitionPhase === 'archived' && (
            <div className="bg-slate-50 dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 text-center space-y-2">
              <span className="text-3xl">📦</span>
              <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200">
                Natijalar Arxivlangan
              </h3>
              <p className="text-xs text-slate-500 max-w-md mx-auto leading-relaxed">
                Musobaqa yakunlangandan keyingi 5 soatlik rasmiy koʻrish muddati nihoyasiga yetganligi sababli natijalar arxivlandi. Navbatdagi oylik musobaqa kutish holatida.
              </p>
            </div>
          )}

          {(competitionPhase === 'active' || competitionPhase === 'completed_recent') && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-amber-500" />
                  <div>
                    <h3 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
                      <span>Joriy Peshqadamlar Roʻyxati</span>
                      {competitionPhase === 'active' ? (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300 animate-pulse">
                          🔴 CANLI (LIVE)
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                          ⏳ 5 SOATLIK MUDDAT ({formatTime(phaseDetail.remainingVisibilitySeconds)} qoldi)
                        </span>
                      )}
                    </h3>
                  </div>
                </div>
                <button
                  onClick={() => setActiveTab('leaderboard')}
                  className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                >
                  Toʻliq jadvalni ochish ({leaderboardResults.length})
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {leaderboardResults.length === 0 ? (
                <div className="p-6 text-center text-xs text-slate-500 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-dashed border-slate-200 dark:border-slate-700">
                  {competitionPhase === 'active'
                    ? '🔴 Jonli musobaqa davom etmoqda. Hozircha hech kim testni topshirmadi. Birinchi boʻlib yakunlang!'
                    : 'Ushbu musobaqada hali natijalar qayd etilmagan.'}
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {leaderboardResults.slice(0, 3).map((item, idx) => (
                    <div
                      key={item.id}
                      className={`p-4 rounded-2xl border flex items-center gap-3 ${
                        idx === 0
                          ? 'bg-amber-50/70 border-amber-300 dark:bg-amber-950/30 dark:border-amber-800'
                          : idx === 1
                          ? 'bg-slate-50 border-slate-300 dark:bg-slate-800 dark:border-slate-700'
                          : 'bg-orange-50/70 border-orange-300 dark:bg-orange-950/30 dark:border-orange-800'
                      }`}
                    >
                      <div className="text-2xl font-bold">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : '🥉'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                          {item.user_name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate">{item.region || 'Oʻzbekiston'}</p>
                        <div className="flex items-center gap-2 mt-1 text-[11px] font-bold text-slate-700 dark:text-slate-300">
                          <span>{item.score} / {item.total_questions} ball</span>
                          <span>•</span>
                          <span>{formatShortTime(item.time_spent_seconds)}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] font-extrabold text-amber-600 dark:text-amber-400 bg-white dark:bg-slate-900 px-2 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                          +{item.reward_xp} XP
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 2: PESHQADAMLAR & NATIJALAR JADVALI (LEADERBOARD) */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6 animate-in fade-in">
          {/* STATE 1: UPCOMING (Hali boshlanmadi — natijalar umuman ko'rinmasin) */}
          {competitionPhase === 'upcoming' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-900/60">
                <Lock className="w-10 h-10" />
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-amber-700 dark:text-amber-400 tracking-wider uppercase bg-amber-50 dark:bg-amber-950/60 px-3 py-1 rounded-full border border-amber-200 dark:border-amber-900/60">
                  🔒 Musobaqa Hali Boshlanmadi
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  Natijalar Musobaqa Boshlangach Koʻrsatiladi
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Tizim shaffofligi qoidasiga asosan, musobaqa boshlanishidan oldin natijalar umuman koʻrinmaydi. Barcha foydalanuvchilar start berilganda bir vaqtda musobaqani boshlaydilar va natijalar real vaqt rejimida (live) eʼlon qilinadi.
                </p>
              </div>

              {/* Countdown box */}
              <div className="bg-slate-50 dark:bg-slate-800/60 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 max-w-md mx-auto space-y-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  Musobaqa Boshlanishiga Qolgan Vaqt
                </span>
                <div className="grid grid-cols-4 gap-2">
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{countdownRemaining.days}</span>
                    <span className="block text-[10px] text-slate-400">Kun</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{countdownRemaining.hours}</span>
                    <span className="block text-[10px] text-slate-400">Soat</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xl font-black font-mono text-slate-900 dark:text-white">{countdownRemaining.minutes}</span>
                    <span className="block text-[10px] text-slate-400">Daqiqa</span>
                  </div>
                  <div className="bg-white dark:bg-slate-900 p-2.5 rounded-xl border border-slate-200 dark:border-slate-700">
                    <span className="text-xl font-black font-mono text-red-600 dark:text-red-400 animate-pulse">{countdownRemaining.seconds}</span>
                    <span className="block text-[10px] text-slate-400">Soniya</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('arena')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trophy className="w-4 h-4" />
                  Kutish Zaliga Oʻtish
                </button>
              </div>
            </div>
          )}

          {/* STATE 4: ARCHIVED (5 soat o'tgach avtomatik yashirilgan/arxivlangan) */}
          {competitionPhase === 'archived' && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 sm:p-12 text-center space-y-6 shadow-sm max-w-3xl mx-auto">
              <div className="w-20 h-20 rounded-3xl bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 flex items-center justify-center mx-auto border border-slate-200 dark:border-slate-700 text-3xl">
                📦
              </div>
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-600 dark:text-slate-400 tracking-wider uppercase bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700">
                  📦 Natijalar Arxivlangan
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
                  5 Soatlik Koʻrish Muddati Yakunlandi
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-lg mx-auto leading-relaxed">
                  Musobaqa qoidasiga asosan, natijalar musobaqa tugaganidan soʻng <strong>5 soat davomida</strong> koʻrinib turadi. Belgilangan 5 soatlik muddat oʻtgani sababli natijalar avtomatik tarzda arxivga oʻtkazildi va yashirildi.
                </p>
              </div>

              <div className="p-4 bg-indigo-50/70 dark:bg-indigo-950/40 rounded-2xl border border-indigo-200 dark:border-indigo-800 max-w-md mx-auto text-xs text-indigo-900 dark:text-indigo-300">
                🗓️ <strong>Navbatdagi Musobaqa:</strong> Har oyning 25-sanasida soat 10:00 da oʻtkaziladi.
              </div>

              <div className="flex items-center justify-center gap-3 pt-2">
                <button
                  onClick={() => setActiveTab('arena')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold transition-all cursor-pointer"
                >
                  Arena Bosh Sahifasiga Qaytish
                </button>
              </div>
            </div>
          )}

          {/* STATE 2 & 3: ACTIVE (Live) YOKI COMPLETED_RECENT (5 soat ichida) */}
          {(competitionPhase === 'active' || competitionPhase === 'completed_recent') && (
            <>
              {/* Notice Banner */}
              {competitionPhase === 'completed_recent' && (
                <div className="p-4 bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Clock className="w-5 h-5 text-amber-600 dark:text-amber-400 shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-amber-900 dark:text-amber-200">
                        ⏳ Yakuniy Natijalar Koʻrinish Oynasi (5 Soat)
                      </h4>
                      <p className="text-[11px] text-amber-800 dark:text-amber-300">
                        Ushbu natijalar musobaqa tugaganidan boshlab 5 soat davomida koʻrinib turadi, soʻngra avtomatik arxivlanadi.
                      </p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="font-mono text-sm font-extrabold text-amber-900 dark:text-amber-200 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-amber-300 dark:border-amber-700">
                      Qolgan vaqt: {formatTime(phaseDetail.remainingVisibilitySeconds)}
                    </span>
                  </div>
                </div>
              )}

              {competitionPhase === 'active' && (
                <div className="p-4 bg-red-50 dark:bg-red-950/40 border border-red-300 dark:border-red-800 rounded-3xl flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-3 h-3 rounded-full bg-red-600 animate-ping shrink-0" />
                    <div>
                      <h4 className="text-xs font-bold text-red-900 dark:text-red-200">
                        🔴 CANLI (LIVE) BELLASHUV NATIJALARI
                      </h4>
                      <p className="text-[11px] text-red-800 dark:text-red-300">
                        Musobaqa ayni paytda ochiq. Ishtirokchilar topshirgan natijalar real vaqtda jadvalda yangilanib bormoqda.
                      </p>
                    </div>
                  </div>
                  <span className="text-xs font-extrabold text-red-700 dark:text-red-300 bg-white dark:bg-slate-900 px-3 py-1 rounded-xl border border-red-200 dark:border-red-900">
                    Musobaqa Tugashiga: {formatTime(windowRemainingSeconds)}
                  </span>
                </div>
              )}

              {/* Top 3 Podium Card */}
              <div className="bg-gradient-to-b from-indigo-900 via-slate-900 to-slate-950 text-white rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
                <div className="text-center space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                    🏆 Oylik Musobaqa Gʻoliblari Shoxsupasi
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold">Eng Kuchli Oʻquvchilar</h2>
                  <p className="text-xs text-slate-400 max-w-lg mx-auto">
                    DTM standartidagi 30 ta savolni eng yuqori aniqlikda va eng kam vaqt sarflab yechgan yetakchilar reytingi.
                  </p>
                </div>

                {leaderboardResults.length === 0 ? (
                  <div className="p-8 text-center text-xs text-slate-400 bg-slate-900/60 rounded-2xl border border-slate-800">
                    Hozircha hech kim testni topshirmadi. Birinchi boʻlib musobaqani yeching va shoxsupani egallang!
                  </div>
                ) : (
                  /* Podium columns */
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 max-w-3xl mx-auto items-end">
                    {/* 2nd place */}
                    {leaderboardResults[1] && (
                      <div className="order-2 md:order-1 bg-slate-800/80 border border-slate-700 rounded-3xl p-5 text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-slate-700 border-2 border-slate-400 text-2xl flex items-center justify-center mx-auto shadow-md">
                          🥈
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                            2-OʻRIN (Kumush)
                          </span>
                          <h3 className="font-extrabold text-sm text-white truncate">
                            {leaderboardResults[1].user_name}
                          </h3>
                          <p className="text-[11px] text-slate-400">{leaderboardResults[1].region}</p>
                        </div>
                        <div className="p-2.5 bg-slate-900/60 rounded-xl space-y-1">
                          <span className="text-lg font-black text-white font-mono">
                            {leaderboardResults[1].score} / {leaderboardResults[1].total_questions}
                          </span>
                          <p className="text-[10px] text-slate-400">
                            Vaqt: {formatShortTime(leaderboardResults[1].time_spent_seconds)}
                          </p>
                        </div>
                        <span className="inline-block text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                          +{leaderboardResults[1].reward_xp} XP
                        </span>
                      </div>
                    )}

                    {/* 1st place */}
                    {leaderboardResults[0] && (
                      <div className="order-1 md:order-2 bg-gradient-to-b from-amber-500/20 to-slate-800 border-2 border-amber-400 rounded-3xl p-6 text-center space-y-3 relative shadow-2xl scale-105">
                        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider px-3 py-0.5 rounded-full shadow-md">
                          👑 CHEMPION
                        </div>
                        <div className="w-16 h-16 rounded-full bg-amber-400/20 border-2 border-amber-400 text-3xl flex items-center justify-center mx-auto shadow-lg">
                          🥇
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-amber-300 uppercase tracking-wider">
                            1-OʻRIN (Oltin)
                          </span>
                          <h3 className="font-extrabold text-base text-white truncate">
                            {leaderboardResults[0].user_name}
                          </h3>
                          <p className="text-[11px] text-slate-300">{leaderboardResults[0].region}</p>
                        </div>
                        <div className="p-3 bg-slate-900/80 rounded-2xl space-y-1 border border-amber-400/30">
                          <span className="text-2xl font-black text-amber-400 font-mono">
                            {leaderboardResults[0].score} / {leaderboardResults[0].total_questions}
                          </span>
                          <p className="text-[10px] text-slate-300">
                            Aniqlik: {leaderboardResults[0].accuracy_percentage}% • {formatShortTime(leaderboardResults[0].time_spent_seconds)}
                          </p>
                        </div>
                        <span className="inline-block text-xs font-black text-amber-400 bg-amber-400/20 px-3 py-1 rounded-full border border-amber-400/40">
                          +{leaderboardResults[0].reward_xp} XP Mukofot
                        </span>
                      </div>
                    )}

                    {/* 3rd place */}
                    {leaderboardResults[2] && (
                      <div className="order-3 bg-slate-800/80 border border-slate-700 rounded-3xl p-5 text-center space-y-3">
                        <div className="w-14 h-14 rounded-full bg-orange-950/80 border-2 border-orange-500 text-2xl flex items-center justify-center mx-auto shadow-md">
                          🥉
                        </div>
                        <div>
                          <span className="text-[10px] font-bold text-orange-400 uppercase tracking-wider">
                            3-OʻRIN (Bronza)
                          </span>
                          <h3 className="font-extrabold text-sm text-white truncate">
                            {leaderboardResults[2].user_name}
                          </h3>
                          <p className="text-[11px] text-slate-400">{leaderboardResults[2].region}</p>
                        </div>
                        <div className="p-2.5 bg-slate-900/60 rounded-xl space-y-1">
                          <span className="text-lg font-black text-white font-mono">
                            {leaderboardResults[2].score} / {leaderboardResults[2].total_questions}
                          </span>
                          <p className="text-[10px] text-slate-400">
                            Vaqt: {formatShortTime(leaderboardResults[2].time_spent_seconds)}
                          </p>
                        </div>
                        <span className="inline-block text-[10px] font-extrabold text-amber-400 bg-amber-400/10 px-2.5 py-1 rounded-full">
                          +{leaderboardResults[2].reward_xp} XP
                        </span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Current User Standings Card */}
              {currentUserResult && (
                <div className="p-5 bg-gradient-to-r from-indigo-50 to-blue-50 dark:from-indigo-950/40 dark:to-slate-900 border border-indigo-200 dark:border-indigo-800 rounded-3xl flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-black text-lg">
                      #{currentUserResult.rank}
                    </div>
                    <div>
                      <span className="text-[10px] font-extrabold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                        Sizning Musobaqa Natijangiz
                      </span>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {currentUserResult.user_name}
                      </h4>
                      <p className="text-xs text-slate-500">
                        Ball: <strong>{currentUserResult.score} / {currentUserResult.total_questions}</strong> ({currentUserResult.accuracy_percentage}%) • Sarflangan vaqt: {formatShortTime(currentUserResult.time_spent_seconds)}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-black text-indigo-700 dark:text-indigo-300 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-indigo-200 dark:border-slate-700 shadow-xs">
                      +{currentUserResult.reward_xp} XP toʻplandi
                    </span>
                  </div>
                </div>
              )}

              {/* Filter & Search Bar */}
              <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="relative w-full sm:w-72">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Ishtirokchi yoki viloyat boʻyicha qidirish..."
                      className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <select
                      value={leaderboardSubjectFilter}
                      onChange={(e) => setLeaderboardSubjectFilter(e.target.value)}
                      className="px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Barchasi">Barcha Fanlar</option>
                      <option value="Barcha fanlar (Aralash blok)">Aralash blok</option>
                      {ALL_SUBJECTS.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Results Table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-800 text-slate-400 uppercase font-bold text-[10px] tracking-wider">
                        <th className="py-3 px-3">Oʻrin</th>
                        <th className="py-3 px-3">Ishtirokchi</th>
                        <th className="py-3 px-3">Fan</th>
                        <th className="py-3 px-3">Toʻgʻri Javob</th>
                        <th className="py-3 px-3">Aniqlik</th>
                        <th className="py-3 px-3">Sarflangan Vaqt</th>
                        <th className="py-3 px-3 text-right">Mukofot XP</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                      {filteredLeaderboard.map((item, idx) => {
                        const isSelf = item.session_id === currentUser.session_id;

                        return (
                          <tr
                            key={item.id}
                            className={`transition-colors ${
                              isSelf
                                ? 'bg-indigo-50/70 dark:bg-indigo-950/40 font-bold'
                                : 'hover:bg-slate-50 dark:hover:bg-slate-800/50'
                            }`}
                          >
                            <td className="py-3 px-3 whitespace-nowrap">
                              {idx === 0 ? (
                                <span className="text-base font-bold text-amber-500">🥇 1</span>
                              ) : idx === 1 ? (
                                <span className="text-base font-bold text-slate-400">🥈 2</span>
                              ) : idx === 2 ? (
                                <span className="text-base font-bold text-orange-500">🥉 3</span>
                              ) : (
                                <span className="font-mono text-slate-500">#{idx + 1}</span>
                              )}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-2.5">
                                <span className="text-lg">{item.avatar || '🎓'}</span>
                                <div>
                                  <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                                    <span>{item.user_name}</span>
                                    {isSelf && (
                                      <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                                        Siz
                                      </span>
                                    )}
                                  </div>
                                  <span className="text-[10px] text-slate-400">{item.region || 'Oʻzbekiston'}</span>
                                </div>
                              </div>
                            </td>
                            <td className="py-3 px-3 text-slate-600 dark:text-slate-300 font-medium">
                              {item.subject}
                            </td>
                            <td className="py-3 px-3 font-mono font-bold text-slate-900 dark:text-white">
                              {item.score} / {item.total_questions}
                            </td>
                            <td className="py-3 px-3">
                              <div className="flex items-center gap-1.5">
                                <div className="w-16 bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                                  <div
                                    className={`h-full rounded-full ${
                                      item.accuracy_percentage >= 90
                                        ? 'bg-emerald-500'
                                        : item.accuracy_percentage >= 70
                                        ? 'bg-indigo-500'
                                        : 'bg-amber-500'
                                    }`}
                                    style={{ width: `${item.accuracy_percentage}%` }}
                                  />
                                </div>
                                <span className="font-mono text-[11px] font-bold">
                                  {item.accuracy_percentage}%
                                </span>
                              </div>
                            </td>
                            <td className="py-3 px-3 font-mono text-slate-500 whitespace-nowrap">
                              {formatShortTime(item.time_spent_seconds)}
                            </td>
                            <td className="py-3 px-3 text-right">
                              <span className="font-extrabold text-amber-600 dark:text-amber-400">
                                +{item.reward_xp} XP
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>

                  {filteredLeaderboard.length === 0 && (
                    <div className="py-10 text-center text-slate-400 text-xs">
                      Hozircha natijalar roʻyxati boʻsh.
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* TAB 3: QOIDALAR VA NIZOM                              */}
      {/* ---------------------------------------------------- */}
      {activeTab === 'rules' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-8 shadow-xs space-y-6 animate-in fade-in max-w-4xl mx-auto">
          <div className="space-y-1">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider">
              Rasmiy Qoidalar
            </span>
            <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Zukko AI Oylik Musobaqasi Nizomi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Musobaqaning oʻtkazilish tartibi, adolat mezonlari va gʻoliblarni aniqlash qoidalari.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-lg">⏱️</span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                1. Bir Vaqtda Start Berilishi
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Har bir musobaqa har oyning 25-sanasida, soat 10:00 da barcha foydalanuvchilar uchun bir vaqtda boshlanadi. Hech bir ishtirokchi musobaqani muddatidan oldin boshlay olmaydi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-lg">🎯</span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                2. 30 ta DTM Standart Savollari
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Sinov umumiy darsliklar va davlat taʼlim standartlari asosida tuzilgan 30 ta test savolini oʻz ichiga oladi. Vaqt limiti: 120 daqiqa (2 soat).
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-lg">🏆</span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                3. Gʻoliblarni Saralash Mezoni
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Peshqadamlar birinchi navbatda toʻgʻri javoblar soni (eng yuqori ball) boʻyicha, agar ballar teng boʻlsa, testni eng kam vaqt sarflab topshirgan vaqt mezoniga koʻra oʻrinlarga ajratiladi.
              </p>
            </div>

            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 space-y-2">
              <span className="text-lg">🛡️</span>
              <h3 className="font-bold text-xs text-slate-900 dark:text-white">
                4. Shaffoflik va 5 Soatlik Koʻrish Muddati
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                Natijalar musobaqa davomida jonli (live) aks etadi. Musobaqa tugagandan soʻng esa natijalar faqat 5 SOAT davomida koʻrinib turadi va soʻng avtomatik arxivlanadi. Tizimda barcha soxta (mock) akkauntlar qatʼiy taqiqlangan va faqat haqiqiy tasdiqlangan foydalanuvchilar reytingda aks etadi.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
