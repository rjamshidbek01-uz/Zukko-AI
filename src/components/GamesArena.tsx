import React, { useState, useEffect, useRef } from 'react';
import {
  Sparkles,
  Trophy,
  Zap,
  RotateCcw,
  PlusCircle,
  Play,
  Layers,
  Clock,
  ArrowRight,
  Flame,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Volume2,
  VolumeX,
  Share2,
  Compass,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import {
  TestQuestion,
  CustomQuizSet,
  BlooketGameMode,
  GoldQuestChest,
  UserSession,
} from '../types';
import { sound } from '../lib/soundEffects';
import {
  getCustomQuizzes,
  saveCustomQuiz,
  recordTestResult,
  saveUserProfile,
} from '../lib/storage';

interface GamesArenaProps {
  questions: TestQuestion[];
  currentUser: UserSession;
  onDataUpdated: () => void;
  onNavigateToProfile: () => void;
}

export const GamesArena: React.FC<GamesArenaProps> = ({
  questions,
  currentUser,
  onDataUpdated,
  onNavigateToProfile,
}) => {
  const [activeGameMode, setActiveGameMode] = useState<BlooketGameMode | null>(null);
  const [customQuizzes, setCustomQuizzes] = useState<CustomQuizSet[]>(getCustomQuizzes());
  const [selectedQuizSet, setSelectedQuizSet] = useState<CustomQuizSet | null>(null);
  const [isCreatorOpen, setIsCreatorOpen] = useState(false);

  // Search and Filter State
  const [searchQuery, setSearchQuery] = useState('');
  const [filterSubject, setFilterSubject] = useState('Barchasi');

  // Sound toggle
  const [soundEnabled, setSoundEnabled] = useState(true);
  const toggleSound = () => {
    sound.enabled = !soundEnabled;
    setSoundEnabled(!soundEnabled);
  };

  // Creator Form State
  const [newQuizTitle, setNewQuizTitle] = useState('');
  const [newQuizDesc, setNewQuizDesc] = useState('');
  const [newQuizSubject, setNewQuizSubject] = useState('Matematika');
  const [creatorQuestions, setCreatorQuestions] = useState<TestQuestion[]>([
    {
      id: 'cq-1',
      subject: 'Matematika',
      topic: 'Umumiy',
      question: '5 x 5 nechaga teng?',
      options: { A: '20', B: '25', C: '30', D: '15' },
      correct_answer: 'B',
      explanation_reference: 'Koʻpaytirish jadvali qoidasi: 5 x 5 = 25.',
    },
  ]);

  // Handle Save Custom Quiz
  const handleSaveQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuizTitle.trim()) {
      alert('Iltimos, oʻyin toʻplami nomini kiriting!');
      return;
    }

    const newQuiz: CustomQuizSet = {
      id: 'quiz-' + Math.random().toString(36).substring(2, 9),
      title: newQuizTitle.trim(),
      description: newQuizDesc.trim() || 'Foydalanuvchi tomonidan yaratilgan maxsus toʻplam',
      subject: newQuizSubject,
      author_id: currentUser.session_id,
      author_name: currentUser.user_name || 'Zukko Oʻquvchi',
      questions: creatorQuestions,
      plays_count: 0,
      created_at: new Date().toISOString(),
    };

    const updated = saveCustomQuiz(newQuiz);
    setCustomQuizzes(updated);
    setIsCreatorOpen(false);
    setSelectedQuizSet(newQuiz);

    // Give 50 XP for creating a quiz!
    saveUserProfile({ xp: (currentUser.xp || 0) + 50 });
    onDataUpdated();
    confetti({ particleCount: 60, spread: 70 });
  };

  const addCreatorQuestion = () => {
    setCreatorQuestions([
      ...creatorQuestions,
      {
        id: 'cq-' + (creatorQuestions.length + 1),
        subject: newQuizSubject,
        topic: 'Yangi savol',
        question: '',
        options: { A: '', B: '', C: '', D: '' },
        correct_answer: 'A',
        explanation_reference: '',
      },
    ]);
  };

  // Select questions pool for active game
  const activeQuestionsPool: TestQuestion[] = selectedQuizSet
    ? selectedQuizSet.questions
    : questions;

  // ----------------------------------------------------
  // MODE 1: GOLD QUEST (Oltin Sandiq) STATE & LOGIC
  // ----------------------------------------------------
  const [gqIndex, setGqIndex] = useState(0);
  const [gqGold, setGqGold] = useState(0);
  const [gqMultiplier, setGqMultiplier] = useState(1);
  const [gqChestsVisible, setGqChestsVisible] = useState(false);
  const [gqChests, setGqChests] = useState<GoldQuestChest[]>([]);
  const [gqChosenChest, setGqChosenChest] = useState<GoldQuestChest | null>(null);
  const [gqSelectedAnswer, setGqSelectedAnswer] = useState<string | null>(null);
  const [gqIsGameOver, setGqIsGameOver] = useState(false);

  const startGoldQuest = (set?: CustomQuizSet) => {
    if (set) setSelectedQuizSet(set);
    setActiveGameMode('gold_quest');
    setGqIndex(0);
    setGqGold(0);
    setGqMultiplier(1);
    setGqChestsVisible(false);
    setGqChosenChest(null);
    setGqSelectedAnswer(null);
    setGqIsGameOver(false);
  };

  const handleGoldQuestAnswer = (ansKey: 'A' | 'B' | 'C' | 'D') => {
    if (gqSelectedAnswer || gqChestsVisible) return;
    setGqSelectedAnswer(ansKey);
    const currQ = activeQuestionsPool[gqIndex];
    const isCorrect = ansKey === currQ.correct_answer;

    if (isCorrect) {
      sound.playCorrect();
      recordTestResult(currQ.subject, currQ.topic, true);
      onDataUpdated();

      // Generate 3 random mystery chests
      const rewards: GoldQuestChest[] = [
        {
          id: 1,
          type: 'gold' as const,
          value: 100 * gqMultiplier,
          label: `+${100 * gqMultiplier} Oltin`,
          description: 'Xazinadan oltin tangalar olindi!',
        },
        {
          id: 2,
          type: 'gold' as const,
          value: 250 * gqMultiplier,
          label: `+${250 * gqMultiplier} Katta Oltin!`,
          description: 'Qimmatbaho javohirlar sandigʻi!',
        },
        {
          id: 3,
          type: 'multiplier' as const,
          value: 2,
          label: '2x Koʻpaytirgich!',
          description: 'Keyingi oltinlar 2 barobarga oshadi!',
        },
      ].sort(() => 0.5 - Math.random());

      setGqChests(rewards);
      setTimeout(() => {
        setGqChestsVisible(true);
      }, 500);
    } else {
      sound.playWrong();
      recordTestResult(currQ.subject, currQ.topic, false);
      onDataUpdated();

      setTimeout(() => {
        advanceGoldQuest();
      }, 1400);
    }
  };

  const handleOpenChest = (chest: GoldQuestChest) => {
    if (gqChosenChest) return;
    setGqChosenChest(chest);
    sound.playGoldCoins();

    if (chest.type === 'gold') {
      setGqGold((prev) => prev + chest.value);
    } else if (chest.type === 'multiplier') {
      setGqMultiplier((prev) => prev * 2);
    }

    setTimeout(() => {
      advanceGoldQuest();
    }, 1500);
  };

  const advanceGoldQuest = () => {
    setGqChestsVisible(false);
    setGqChosenChest(null);
    setGqSelectedAnswer(null);

    if (gqIndex + 1 < activeQuestionsPool.length) {
      setGqIndex((prev) => prev + 1);
    } else {
      setGqIsGameOver(true);
      sound.playVictory();
      confetti({ particleCount: 120, spread: 90 });
    }
  };

  // ----------------------------------------------------
  // MODE 2: SPEED RUSH (Vaqtga Qarshi Poyga)
  // ----------------------------------------------------
  const [srTimeLeft, setSrTimeLeft] = useState(60);
  const [srScore, setSrScore] = useState(0);
  const [srCombo, setSrCombo] = useState(1);
  const [srIndex, setSrIndex] = useState(0);
  const [srIsGameOver, setSrIsGameOver] = useState(false);
  const srTimerRef = useRef<NodeJS.Timeout | null>(null);

  const startSpeedRush = (set?: CustomQuizSet) => {
    if (set) setSelectedQuizSet(set);
    setActiveGameMode('speed_rush');
    setSrTimeLeft(60);
    setSrScore(0);
    setSrCombo(1);
    setSrIndex(0);
    setSrIsGameOver(false);
  };

  useEffect(() => {
    if (activeGameMode === 'speed_rush' && !srIsGameOver) {
      srTimerRef.current = setInterval(() => {
        setSrTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(srTimerRef.current!);
            setSrIsGameOver(true);
            sound.playVictory();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (srTimerRef.current) clearInterval(srTimerRef.current);
    };
  }, [activeGameMode, srIsGameOver]);

  const handleSpeedRushAnswer = (ansKey: 'A' | 'B' | 'C' | 'D') => {
    if (srIsGameOver) return;
    const currQ = activeQuestionsPool[srIndex % activeQuestionsPool.length];
    const isCorrect = ansKey === currQ.correct_answer;

    if (isCorrect) {
      sound.playCorrect();
      setSrScore((prev) => prev + 10 * srCombo);
      setSrCombo((prev) => Math.min(prev + 1, 5));
      setSrTimeLeft((prev) => Math.min(prev + 2, 90));
      recordTestResult(currQ.subject, currQ.topic, true);
    } else {
      sound.playWrong();
      setSrCombo(1);
      setSrTimeLeft((prev) => Math.max(prev - 2, 0));
      recordTestResult(currQ.subject, currQ.topic, false);
    }

    setSrIndex((prev) => prev + 1);
    onDataUpdated();
  };

  // ----------------------------------------------------
  // MODE 3: 3D FLASHCARDS FLIP
  // ----------------------------------------------------
  const [fcIndex, setFcIndex] = useState(0);
  const [fcFlipped, setFcFlipped] = useState(false);
  const [fcMastered, setFcMastered] = useState<Set<number>>(new Set());

  const startFlashcards = (set?: CustomQuizSet) => {
    if (set) setSelectedQuizSet(set);
    setActiveGameMode('flashcards');
    setFcIndex(0);
    setFcFlipped(false);
    setFcMastered(new Set());
  };

  const handleFlashcardConfidence = (mastered: boolean) => {
    if (mastered) {
      sound.playCorrect();
      setFcMastered((prev) => new Set(prev).add(fcIndex));
    }
    setFcFlipped(false);
    if (fcIndex + 1 < activeQuestionsPool.length) {
      setFcIndex((prev) => prev + 1);
    } else {
      sound.playVictory();
      confetti({ particleCount: 80, spread: 70 });
    }
  };

  // ----------------------------------------------------
  // RENDER: GAME HUB (Main view when no active game)
  // ----------------------------------------------------
  if (!activeGameMode) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
        {/* Header Hero */}
        <div className="relative overflow-hidden bg-gradient-to-r from-amber-500/10 via-indigo-600/10 to-violet-600/10 dark:from-amber-950/30 dark:via-indigo-950/40 dark:to-slate-900 rounded-3xl p-6 sm:p-10 border border-amber-200/60 dark:border-indigo-900/40 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2.5 py-0.5 rounded-full border border-amber-200 dark:border-amber-800">
                Blooket Uslubidagi Oʻyinlar Zali
              </span>
              <button
                onClick={toggleSound}
                className="p-1 text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                title={soundEnabled ? 'Ovozni oʻchirish' : 'Ovozni yoqish'}
              >
                {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4 text-red-500" />}
              </button>
            </div>
            <h1 className="text-2xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              Oʻyna, Musobaqalash va Bilimingni Sinovdan Oʻtkaz!
            </h1>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Oltin xazinalarni qidiring, sekundomerga qarshi rekord oʻrnating yoki shaxsiy oʻyin toʻplamlaringizni yaratib doʻstlaringiz bilan bahslashib XP yigʻing.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => setIsCreatorOpen(true)}
              className="px-5 py-3 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white rounded-2xl text-xs sm:text-sm font-bold shadow-md shadow-amber-200 dark:shadow-none flex items-center gap-2 transition-all hover:scale-105 cursor-pointer"
            >
              <PlusCircle className="w-4 h-4" />
              Oʻz Oʻyiningni Yarat (+50 XP)
            </button>
          </div>
        </div>

        {/* 3 Core Game Modes Grid */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 dark:text-white">
            Asosiy Öyin Rejimlari
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Mode 1: Xazina Izlaş */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-amber-400 dark:hover:border-amber-500 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  🪙
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                    Xazina Izlaş (Oltin Sandiq)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Toʻğri javob bering va 3 ta sirli sandiqdan birini oçib, oltinlar, 2x koʻpaytirgiçlar va maxsus mukofotlarni qoʻlga kiriting!
                  </p>
                </div>
              </div>

              <button
                onClick={() => startGoldQuest()}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Xazina Izlaşni Boşlaş
              </button>
            </div>

            {/* Mode 2: Tezkor Poyga */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-indigo-400 dark:hover:border-indigo-500 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  ⚡
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    Tezkor Poyga (60 Soniyali Bellashuv)
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    60 soniya vaqt! Har bir toʻğri javob vaqtni oşiradi va kombo koʻpaytirgiç hosil qiladi. Rekord oʻrnatişga tayyormisiz?
                  </p>
                </div>
              </div>

              <button
                onClick={() => startSpeedRush()}
                className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Poygani Boşlaş (60 soniya)
              </button>
            </div>

            {/* Mode 3: 3D Kartochkalar */}
            <div className="bg-white dark:bg-slate-900/90 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs hover:border-emerald-400 dark:hover:border-emerald-500 transition-all flex flex-col justify-between space-y-4 group">
              <div className="space-y-3">
                <div className="w-14 h-14 rounded-2xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-2xl shadow-inner group-hover:scale-110 transition-transform">
                  🃏
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    3D Xotira Kartochkalari
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                    Aylantirib oʻrganiş texnikasi. Savolni oʻqing, kartani 3D aylantirib javobni tekşiring va oʻzlashtirganingizni belgilang.
                  </p>
                </div>
              </div>

              <button
                onClick={() => startFlashcards()}
                className="w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Kartochkalarni Boşlaş
              </button>
            </div>
          </div>
        </div>

        {/* Custom Quiz Sets Collection with Search & Filter */}
        <div className="space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Foydalanuvçilar va Oʻqituvçilarning Şaxsiy Test Toʻplamlari
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Istalgan toʻplamni qidiring, tanlang va yuqoridagi 3 xil öyinda qatnashing
              </p>
            </div>

            {/* Search and Subject Filter Inputs */}
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Nomi, muallifi yoki fani boʻyiça izlaş..."
                  className="px-3.5 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 w-56 sm:w-64"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1.5 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                  >
                    ×
                  </button>
                )}
              </div>

              <select
                value={filterSubject}
                onChange={(e) => setFilterSubject(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 font-semibold focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="Barchasi">Barcha fanlar</option>
                <option value="Matematika">Matematika</option>
                <option value="Fizika">Fizika</option>
                <option value="Tarix">Tarix</option>
                <option value="Biologiya">Biologiya</option>
                <option value="Ona tili va adabiyot">Ona tili va adabiyot</option>
                <option value="Ingliz tili">Ingliz tili</option>
                <option value="Astronomiya">Astronomiya</option>
              </select>
            </div>
          </div>

          {/* Filtered Quizzes Grid */}
          {customQuizzes.filter((quiz) => {
            const q = searchQuery.toLowerCase().trim();
            const matchesSearch =
              !q ||
              quiz.title.toLowerCase().includes(q) ||
              quiz.author_name.toLowerCase().includes(q) ||
              quiz.subject.toLowerCase().includes(q);
            const matchesSubject = filterSubject === 'Barchasi' || quiz.subject === filterSubject;
            return matchesSearch && matchesSubject;
          }).length === 0 ? (
            <div className="p-8 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs space-y-2">
              <p className="font-semibold text-slate-700 dark:text-slate-300">
                Izlaş boʻyiça hech qanday test toʻplami topilmadi.
              </p>
              <p>
                Qidiruv soʻzini oʻzgartiring yoki oʻzingiz yangi shaxsiy oʻyin toʻplami yarating.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {customQuizzes
                .filter((quiz) => {
                  const q = searchQuery.toLowerCase().trim();
                  const matchesSearch =
                    !q ||
                    quiz.title.toLowerCase().includes(q) ||
                    quiz.author_name.toLowerCase().includes(q) ||
                    quiz.subject.toLowerCase().includes(q);
                  const matchesSubject = filterSubject === 'Barchasi' || quiz.subject === filterSubject;
                  return matchesSearch && matchesSubject;
                })
                .map((quiz) => (
                  <div
                    key={quiz.id}
                    className="p-5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/70 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-700 transition-all flex flex-col justify-between space-y-3"
                  >
                    <div>
                      <div className="flex items-center justify-between text-[11px] mb-2">
                        <span className="font-bold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                          {quiz.subject}
                        </span>
                        <span className="text-slate-400 font-mono">
                          {quiz.questions.length} ta savol
                        </span>
                      </div>
                      <h3 className="font-bold text-sm text-slate-900 dark:text-white line-clamp-1">
                        {quiz.title}
                      </h3>
                      <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mt-1">
                        {quiz.description}
                      </p>
                      <p className="text-[10px] text-slate-400 mt-2">
                        Muallif: <strong className="text-slate-600 dark:text-slate-300">{quiz.author_name}</strong>
                      </p>
                    </div>

                    <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                      <button
                        onClick={() => startGoldQuest(quiz)}
                        className="flex-1 py-1.5 px-2 bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-800 dark:text-amber-300 rounded-lg text-[11px] font-bold text-center transition-colors cursor-pointer"
                      >
                        🪙 Sandiq
                      </button>
                      <button
                        onClick={() => startSpeedRush(quiz)}
                        className="flex-1 py-1.5 px-2 bg-indigo-50 dark:bg-indigo-950/40 hover:bg-indigo-100 dark:hover:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300 rounded-lg text-[11px] font-bold text-center transition-colors cursor-pointer"
                      >
                        ⚡ Poyga
                      </button>
                      <button
                        onClick={() => startFlashcards(quiz)}
                        className="flex-1 py-1.5 px-2 bg-emerald-50 dark:bg-emerald-950/40 hover:bg-emerald-100 dark:hover:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300 rounded-lg text-[11px] font-bold text-center transition-colors cursor-pointer"
                      >
                        🃏 Kartochka
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Custom Quiz Creator Modal */}
        {isCreatorOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/70 backdrop-blur-sm p-4 animate-in fade-in">
            <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-2xl w-full border border-slate-200 dark:border-slate-800 max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-5">
              <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-500" />
                  <h3 className="font-extrabold text-base text-slate-900 dark:text-white">
                    Shaxsiy Oʻyin va Test Toʻplamini Yaratish
                  </h3>
                </div>
                <button
                  onClick={() => setIsCreatorOpen(false)}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-white"
                >
                  Yopish ✕
                </button>
              </div>

              <form onSubmit={handleSaveQuiz} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Toʻplam Nomi *
                    </label>
                    <input
                      type="text"
                      required
                      value={newQuizTitle}
                      onChange={(e) => setNewQuizTitle(e.target.value)}
                      placeholder="Masalan: Fizika Qonunlari Challenge"
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                      Fan Nomi
                    </label>
                    <select
                      value={newQuizSubject}
                      onChange={(e) => setNewQuizSubject(e.target.value)}
                      className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                    >
                      <option value="Matematika">Matematika</option>
                      <option value="Fizika">Fizika</option>
                      <option value="Tarix">Tarix</option>
                      <option value="Biologiya">Biologiya</option>
                      <option value="Ona tili va adabiyot">Ona tili va adabiyot</option>
                      <option value="Ingliz tili">Ingliz tili</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Qisqacha Tavsif
                  </label>
                  <input
                    type="text"
                    value={newQuizDesc}
                    onChange={(e) => setNewQuizDesc(e.target.value)}
                    placeholder="Ushbu oʻyin toʻplami haqida bir jumla..."
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                {/* Questions List */}
                <div className="space-y-4 pt-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                      Savollar ({creatorQuestions.length} ta)
                    </span>
                    <button
                      type="button"
                      onClick={addCreatorQuestion}
                      className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <PlusCircle className="w-3.5 h-3.5" />
                      Yana Savol Qoʻshish
                    </button>
                  </div>

                  {creatorQuestions.map((q, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/50 space-y-3"
                    >
                      <div className="flex items-center justify-between text-xs font-bold text-slate-700 dark:text-slate-300">
                        <span>{idx + 1}-Savol</span>
                        {creatorQuestions.length > 1 && (
                          <button
                            type="button"
                            onClick={() =>
                              setCreatorQuestions(creatorQuestions.filter((_, i) => i !== idx))
                            }
                            className="text-[11px] text-red-500 hover:underline"
                          >
                            Oʻchirish
                          </button>
                        )}
                      </div>

                      <input
                        type="text"
                        required
                        value={q.question}
                        onChange={(e) => {
                          const updated = [...creatorQuestions];
                          updated[idx].question = e.target.value;
                          setCreatorQuestions(updated);
                        }}
                        placeholder="Savol matnini kiriting..."
                        className="w-full px-3 py-1.5 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                      />

                      <div className="grid grid-cols-2 gap-2 text-xs">
                        {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                          <div key={opt} className="flex items-center gap-2">
                            <input
                              type="radio"
                              name={`correct-${idx}`}
                              checked={q.correct_answer === opt}
                              onChange={() => {
                                const updated = [...creatorQuestions];
                                updated[idx].correct_answer = opt;
                                setCreatorQuestions(updated);
                              }}
                            />
                            <span className="font-bold text-[11px]">{opt}:</span>
                            <input
                              type="text"
                              required
                              value={q.options[opt]}
                              onChange={(e) => {
                                const updated = [...creatorQuestions];
                                updated[idx].options[opt] = e.target.value;
                                setCreatorQuestions(updated);
                              }}
                              placeholder={`${opt} varianti`}
                              className="flex-1 px-2 py-1 text-xs border border-slate-300 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-100 dark:border-slate-800">
                  <button
                    type="button"
                    onClick={() => setIsCreatorOpen(false)}
                    className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 cursor-pointer"
                  >
                    Bekor Qilish
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                  >
                    Oʻyinni Saqlash (+50 XP)
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // RENDER: ACTIVE GOLD QUEST (Blooket Mode 1)
  // ----------------------------------------------------
  if (activeGameMode === 'gold_quest') {
    const currentQ = activeQuestionsPool[gqIndex];

    if (gqIsGameOver) {
      return (
        <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-6 animate-in fade-in">
          <div className="w-24 h-24 rounded-3xl bg-amber-100 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center text-4xl mx-auto shadow-lg border-2 border-amber-300 dark:border-amber-700">
            👑
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Oltin Sandiq Xazinasi Yakunlandi!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Siz jami <span className="font-extrabold text-amber-500 text-lg">{gqGold} Oltin</span> va <span className="font-extrabold text-indigo-500 text-lg">+{Math.round(gqGold / 10)} XP</span> toʻpladingiz!
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => startGoldQuest()}
              className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold rounded-xl shadow-xs transition-all cursor-pointer"
            >
              Qayta Oʻynash
            </button>
            <button
              onClick={() => setActiveGameMode(null)}
              className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
            >
              Oʻyinlar Zaliga Qaytish
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-3xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
        {/* Top Gold Quest HUD */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveGameMode(null)}
              className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
            >
              ← Chiqish
            </button>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Savol {gqIndex + 1} / {activeQuestionsPool.length}
            </span>
          </div>

          <div className="flex items-center gap-4 text-xs font-extrabold">
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 rounded-xl border border-amber-200 dark:border-amber-800">
              <span>🪙</span>
              <span className="tabular-nums font-mono text-sm">{gqGold}</span>
            </div>
            {gqMultiplier > 1 && (
              <span className="px-2 py-0.5 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-mono text-xs">
                {gqMultiplier}x Boost!
              </span>
            )}
          </div>
        </div>

        {/* Chest Opening Overlay */}
        {gqChestsVisible ? (
          <div className="bg-gradient-to-br from-amber-500/10 via-amber-500/5 to-slate-900/10 dark:from-slate-900 dark:to-slate-950 rounded-3xl p-8 border-2 border-amber-300 dark:border-amber-700 text-center space-y-6 animate-in zoom-in-95">
            <div className="space-y-1">
              <span className="text-xs font-extrabold text-amber-600 uppercase tracking-wider">
                Toʻgʻri Javob!
              </span>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white">
                Bitta Sirli Xazina Sandigʻini Tanlang
              </h2>
            </div>

            <div className="grid grid-cols-3 gap-4 max-w-lg mx-auto">
              {gqChests.map((chest) => {
                const isOpened = gqChosenChest?.id === chest.id;

                return (
                  <button
                    key={chest.id}
                    disabled={!!gqChosenChest}
                    onClick={() => handleOpenChest(chest)}
                    className={`h-36 rounded-2xl border-2 flex flex-col items-center justify-center p-3 transition-all cursor-pointer ${
                      isOpened
                        ? 'border-amber-400 bg-amber-50 dark:bg-amber-950/60 scale-105 shadow-lg'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-amber-400 hover:scale-105 shadow-xs'
                    }`}
                  >
                    <span className="text-4xl mb-2 animate-bounce">
                      {isOpened ? '✨' : '📦'}
                    </span>
                    <span className="text-xs font-bold text-slate-900 dark:text-white">
                      {isOpened ? chest.label : 'Sandiq ' + chest.id}
                    </span>
                    {isOpened && (
                      <span className="text-[10px] text-amber-600 dark:text-amber-400 mt-1 font-semibold">
                        {chest.description}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          /* Normal Question Card */
          currentQ && (
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
              <div className="space-y-1">
                <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                  {currentQ.subject} • {currentQ.topic}
                </span>
                <h2 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                  {currentQ.question}
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(['A', 'B', 'C', 'D'] as const).map((opt) => {
                  const isSelected = gqSelectedAnswer === opt;
                  const isCorrect = opt === currentQ.correct_answer;

                  let style =
                    'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 text-slate-800 dark:text-slate-200';

                  if (gqSelectedAnswer) {
                    if (isCorrect) {
                      style = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-900 dark:text-emerald-200 font-bold';
                    } else if (isSelected && !isCorrect) {
                      style = 'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-900 dark:text-red-200 font-bold';
                    } else {
                      style = 'opacity-40 border-slate-200';
                    }
                  }

                  return (
                    <button
                      key={opt}
                      disabled={!!gqSelectedAnswer}
                      onClick={() => handleGoldQuestAnswer(opt)}
                      className={`p-4 rounded-xl border text-left text-xs sm:text-sm font-semibold transition-all flex items-center justify-between gap-3 cursor-pointer ${style}`}
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0 shadow-xs">
                          {opt}
                        </span>
                        <span>{currentQ.options[opt]}</span>
                      </div>
                      {gqSelectedAnswer && isCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />}
                      {gqSelectedAnswer && isSelected && !isCorrect && <XCircle className="w-4 h-4 text-red-600 shrink-0" />}
                    </button>
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // MODE 2: ACTIVE SPEED RUSH (Blooket Mode 2)
  // ----------------------------------------------------
  if (activeGameMode === 'speed_rush') {
    const currentQ = activeQuestionsPool[srIndex % activeQuestionsPool.length];

    if (srIsGameOver) {
      return (
        <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6 animate-in fade-in">
          <div className="w-24 h-24 rounded-3xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center text-4xl mx-auto shadow-lg border-2 border-indigo-300 dark:border-indigo-700">
            ⚡
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Vaqt Tugadi!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Yakuniy Natija: <span className="font-extrabold text-indigo-600 dark:text-indigo-400 text-xl">{srScore} Ball</span> ({srIndex} ta savolga javob berildi)
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => startSpeedRush()}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Yana Poyga!
            </button>
            <button
              onClick={() => setActiveGameMode(null)}
              className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-2xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
        {/* Top Speed Bar */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl p-4 border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between">
          <button
            onClick={() => setActiveGameMode(null)}
            className="text-xs text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
          >
            ← Chiqish
          </button>

          {/* Countdown timer with color shift */}
          <div
            className={`px-4 py-1.5 rounded-xl font-mono text-base font-extrabold flex items-center gap-1.5 ${
              srTimeLeft <= 10
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400'
            }`}
          >
            <Clock className="w-4 h-4" />
            <span>{srTimeLeft}s</span>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold">
            <span className="text-slate-900 dark:text-white font-mono text-sm">
              {srScore} Ball
            </span>
            {srCombo > 1 && (
              <span className="px-2 py-0.5 rounded-md bg-amber-500 text-white font-bold text-[10px] animate-bounce">
                {srCombo}x Kombo!
              </span>
            )}
          </div>
        </div>

        {/* Speed Question Card */}
        {currentQ && (
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-5">
            <h2 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white leading-relaxed">
              {currentQ.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                <button
                  key={opt}
                  onClick={() => handleSpeedRushAnswer(opt)}
                  className="p-4 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:border-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-slate-700 text-left text-xs sm:text-sm font-semibold transition-all flex items-center gap-3 cursor-pointer"
                >
                  <span className="w-6 h-6 rounded-md bg-white dark:bg-slate-700 flex items-center justify-center font-bold text-xs shrink-0">
                    {opt}
                  </span>
                  <span>{currentQ.options[opt]}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // ----------------------------------------------------
  // MODE 3: ACTIVE FLASHCARDS (Blooket Mode 3)
  // ----------------------------------------------------
  if (activeGameMode === 'flashcards') {
    const currentQ = activeQuestionsPool[fcIndex];
    const isFinished = fcIndex >= activeQuestionsPool.length;

    if (isFinished) {
      return (
        <div className="max-w-xl mx-auto py-12 px-4 text-center space-y-6 animate-in fade-in">
          <div className="w-24 h-24 rounded-3xl bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-4xl mx-auto shadow-lg">
            🎉
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-white">
              Barcha Flashcards Oʻrganildi!
            </h2>
            <p className="text-sm text-slate-600 dark:text-slate-300">
              Siz {activeQuestionsPool.length} ta kartochkadan {fcMastered.size} tasini mukammal oʻzlashtirdingiz.
            </p>
          </div>
          <div className="flex justify-center gap-3">
            <button
              onClick={() => startFlashcards()}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl cursor-pointer"
            >
              Qayta Takrorlash
            </button>
            <button
              onClick={() => setActiveGameMode(null)}
              className="px-6 py-2.5 bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-xl cursor-pointer"
            >
              Chiqish
            </button>
          </div>
        </div>
      );
    }

    return (
      <div className="max-w-xl mx-auto px-4 py-8 space-y-6 animate-in fade-in">
        {/* Top Header */}
        <div className="flex items-center justify-between text-xs">
          <button
            onClick={() => setActiveGameMode(null)}
            className="text-slate-400 hover:text-slate-700 dark:hover:text-white font-bold"
          >
            ← Chiqish
          </button>
          <span className="font-bold text-slate-600 dark:text-slate-300">
            Karta {fcIndex + 1} / {activeQuestionsPool.length}
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            ✓ {fcMastered.size} yod olindi
          </span>
        </div>

        {/* 3D Flip Card */}
        <div
          onClick={() => setFcFlipped(!fcFlipped)}
          className="min-h-[280px] bg-white dark:bg-slate-900 rounded-3xl border-2 border-indigo-200 dark:border-indigo-800/60 p-8 shadow-md flex flex-col justify-between cursor-pointer hover:border-indigo-400 transition-all select-none group"
        >
          <div className="flex items-center justify-between text-xs text-slate-400">
            <span>{currentQ.subject}</span>
            <span className="text-[11px] font-semibold text-indigo-600 dark:text-indigo-400 group-hover:underline">
              {fcFlipped ? 'Savolga qaytish ↻' : 'Javobni koʻrish uchun bosing ↻'}
            </span>
          </div>

          <div className="text-center py-6">
            {!fcFlipped ? (
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-relaxed">
                {currentQ.question}
              </h2>
            ) : (
              <div className="space-y-3 animate-in fade-in">
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Toʻgʻri Javob ({currentQ.correct_answer}):
                </span>
                <p className="text-xl font-extrabold text-slate-900 dark:text-white">
                  {currentQ.options[currentQ.correct_answer]}
                </p>
                <div className="p-3 bg-amber-50 dark:bg-amber-950/40 rounded-xl text-xs text-amber-900 dark:text-amber-300 text-left">
                  📖 <strong>Darslik izohi:</strong> {currentQ.explanation_reference}
                </div>
              </div>
            )}
          </div>

          <div className="text-center text-[11px] text-slate-400">
            {fcFlipped ? 'Quyidagi tugmalar orqali baholang' : 'Kartaning istalgan joyini bosing'}
          </div>
        </div>

        {/* Confidence Actions */}
        {fcFlipped && (
          <div className="flex items-center gap-3 pt-2 animate-in fade-in">
            <button
              onClick={() => handleFlashcardConfidence(false)}
              className="flex-1 py-3 px-4 border border-slate-300 dark:border-slate-700 bg-white dark:bg-slate-800 hover:bg-slate-50 text-slate-700 dark:text-slate-200 text-xs font-bold rounded-2xl transition-all cursor-pointer"
            >
              Takrorlash Kerak ✕
            </button>
            <button
              onClick={() => handleFlashcardConfidence(true)}
              className="flex-1 py-3 px-4 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-2xl shadow-xs transition-all cursor-pointer"
            >
              Yod Oldim! ✓ (+15 XP)
            </button>
          </div>
        )}
      </div>
    );
  }

  return null;
};
