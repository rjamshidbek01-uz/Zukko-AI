import React, { useState, useMemo } from 'react';
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Brain,
  Sparkles,
  ArrowRight,
  RotateCcw,
  BookOpen,
  Award,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
  Loader2,
  Cpu,
  Calendar,
  Clock,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { TestQuestion, BookChapter, SubjectType } from '../types';
import { ALL_SUBJECTS } from '../data/initialData';
import { recordTestResult } from '../lib/storage';
import { sound } from '../lib/soundEffects';
import { getDailyQuestionsForSubject, getTimeUntilMidnight } from '../lib/dailyQuiz';

interface QuizModeViewProps {
  questions: TestQuestion[];
  books: BookChapter[];
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onDataUpdated: () => void;
}

export const QuizModeView: React.FC<QuizModeViewProps> = ({
  questions,
  books,
  selectedSubject,
  setSelectedSubject,
  onDataUpdated,
}) => {
  const [dailySetIndex, setDailySetIndex] = useState(0);

  // Deterministic daily 30 questions rotated every day at 00:00 midnight
  const dailyData = useMemo(() => {
    return getDailyQuestionsForSubject(
      questions,
      selectedSubject,
      30,
      undefined,
      dailySetIndex
    );
  }, [questions, selectedSubject, dailySetIndex]);

  const subjectQuestions = dailyData.questions;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<'A' | 'B' | 'C' | 'D' | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [aiExplanation, setAiExplanation] = useState<string | null>(null);
  const [aiModelUsed, setAiModelUsed] = useState<string>('Gemini 3.8 Flash (Google AI)');
  const [isAiLoading, setIsAiLoading] = useState(false);

  // Score tracking for current session
  const [sessionScore, setSessionScore] = useState(0);
  const [sessionTotal, setSessionTotal] = useState(0);

  const currentQuestion: TestQuestion | undefined = subjectQuestions[currentIndex];

  const handleSelectOption = async (optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isAnswered || !currentQuestion) return;

    setSelectedAnswer(optionKey);
    setIsAnswered(true);

    const isCorrect = optionKey === currentQuestion.correct_answer;
    setSessionTotal((prev) => prev + 1);

    if (isCorrect) {
      sound.playCorrect();
      setSessionScore((prev) => prev + 1);
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 },
      });
      recordTestResult(currentQuestion.subject, currentQuestion.topic, true);
      onDataUpdated();
    } else {
      sound.playWrong();
      recordTestResult(currentQuestion.subject, currentQuestion.topic, false);
      onDataUpdated();

      // Trigger AI Tutor Explanation
      setIsAiLoading(true);
      setAiExplanation(null);

      const matchingBook = books.find(
        (b) =>
          b.subject === currentQuestion.subject &&
          (b.chapter_title.toLowerCase().includes(currentQuestion.topic.toLowerCase()) ||
            currentQuestion.topic.toLowerCase().includes(b.chapter_title.toLowerCase()))
      );

      try {
        const res = await fetch('/api/ai/explain', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            question: currentQuestion.question,
            studentAnswer: `${optionKey}) ${currentQuestion.options[optionKey]}`,
            correctAnswer: `${currentQuestion.correct_answer}) ${currentQuestion.options[currentQuestion.correct_answer]}`,
            subject: currentQuestion.subject,
            topic: currentQuestion.topic,
            bookReference: currentQuestion.explanation_reference,
            bookContext: matchingBook ? matchingBook.content : undefined,
            modelPreference: 'llama-3.3-70b-versatile',
          }),
        });

        const data = await res.json();
        setAiExplanation(data.text);
        if (data.model) setAiModelUsed(data.model);
      } catch (err) {
        console.error('AI explanation error:', err);
        setAiExplanation(
          `❌ Siz tanlagan javob: ${optionKey} notoʻgʻri.\n✅ Toʻgʻri javob: ${currentQuestion.correct_answer}.\n📖 Darslikdagi fakt: ${currentQuestion.explanation_reference}`
        );
      } finally {
        setIsAiLoading(false);
      }
    }
  };

  const handleNext = () => {
    if (currentIndex < subjectQuestions.length - 1) {
      setCurrentIndex((prev) => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setAiExplanation(null);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
      setAiExplanation(null);
    }
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setAiExplanation(null);
    setSessionScore(0);
    setSessionTotal(0);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Header and Subject Filter */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-emerald-600 dark:text-emerald-400 mb-1">
            <span className="px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800">
              Rejim B
            </span>
            <span>Interaktiv Test Yechish & AI Repetitor</span>
          </div>
          <h1 className="text-xl font-bold text-slate-900 dark:text-white">
            Darsliklar Asosidagi Interaktiv Test Sinovi
          </h1>
        </div>

        {/* Subjects bar */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {ALL_SUBJECTS.map((sub) => (
            <button
              key={sub}
              onClick={() => {
                setSelectedSubject(sub);
                setCurrentIndex(0);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setAiExplanation(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                selectedSubject === sub
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

      {/* Daily Test Rotation Info Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 bg-gradient-to-r from-emerald-50 via-teal-50 to-indigo-50 dark:from-emerald-950/40 dark:via-slate-900 dark:to-indigo-950/40 border border-emerald-200/80 dark:border-emerald-800/60 rounded-2xl text-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-xs shrink-0">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                Bugungi Kunlik Test Toʻplami ({subjectQuestions.length} ta test)
              </span>
              <span className="px-2 py-0.5 rounded-md bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider">
                30 talik blok
              </span>
            </div>
            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 flex items-center gap-2">
              <span>📅 Sana: <strong>{dailyData.formattedDate}</strong></span>
              <span>•</span>
              <span className="flex items-center gap-1 text-emerald-700 dark:text-emerald-400 font-semibold">
                <Clock className="w-3 h-3" />
                Har kuni 00:00 da yangilanadi
              </span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              setDailySetIndex((prev) => prev + 1);
              setCurrentIndex(0);
              setSelectedAnswer(null);
              setIsAnswered(false);
              setAiExplanation(null);
            }}
            className="px-3.5 py-2 bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-700 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
            title="Ushbu fan boʻyicha boshqa aralash 30 talik toʻplamni yuklash"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Boshqa 30 talik toʻplam
          </button>
        </div>
      </div>

      {subjectQuestions.length === 0 ? (
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-12 text-center space-y-3">
          <HelpCircle className="w-12 h-12 text-slate-300 dark:text-slate-600 mx-auto" />
          <h3 className="font-bold text-slate-700 dark:text-slate-300">
            {selectedSubject} fani boʻyicha testlar mavjud emas
          </h3>
          <p className="text-xs text-slate-500">
            Admin paneliga oʻtib yangi testlar kiritishingiz mumkin.
          </p>
        </div>
      ) : currentQuestion ? (
        <div className="space-y-6">
          {/* Progress Bar & Header */}
          <div className="bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Savol {currentIndex + 1} / {subjectQuestions.length}
              </span>
              <span className="text-[11px] font-semibold px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300">
                {currentQuestion.topic}
              </span>
            </div>

            {/* Score */}
            <div className="flex items-center gap-3 text-xs font-bold">
              <div className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400">
                <CheckCircle className="w-4 h-4" />
                <span>{sessionScore} toʻgʻri</span>
              </div>
              <div className="text-slate-400">/</div>
              <div className="text-slate-600 dark:text-slate-400">
                <span>Jami {sessionTotal} ta yechildi</span>
              </div>
            </div>
          </div>

          {/* Question Card */}
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
            <div className="space-y-2">
              <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 tracking-wider uppercase">
                {currentQuestion.subject} • {currentQuestion.topic}
              </span>
              <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white leading-relaxed">
                {currentQuestion.question}
              </h2>
            </div>

            {/* 4 Options Grid */}
            <div className="space-y-3">
              {(['A', 'B', 'C', 'D'] as const).map((optKey) => {
                const isSelected = selectedAnswer === optKey;
                const isCorrect = optKey === currentQuestion.correct_answer;

                let btnStyle =
                  'border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/60 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-800 dark:text-slate-200';

                if (isAnswered) {
                  if (isCorrect) {
                    btnStyle =
                      'border-emerald-500 bg-emerald-50 dark:bg-emerald-950/60 text-emerald-950 dark:text-emerald-200 font-bold ring-2 ring-emerald-500/30';
                  } else if (isSelected && !isCorrect) {
                    btnStyle =
                      'border-red-500 bg-red-50 dark:bg-red-950/60 text-red-950 dark:text-red-200 font-bold ring-2 ring-red-500/30';
                  } else {
                    btnStyle = 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-400 opacity-60';
                  }
                }

                return (
                  <button
                    key={optKey}
                    disabled={isAnswered}
                    onClick={() => handleSelectOption(optKey)}
                    className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${
                          isAnswered && isCorrect
                            ? 'bg-emerald-600 text-white'
                            : isAnswered && isSelected && !isCorrect
                            ? 'bg-red-600 text-white'
                            : 'bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-200'
                        }`}
                      >
                        {optKey}
                      </span>
                      <span>{currentQuestion.options[optKey]}</span>
                    </div>

                    {isAnswered && isCorrect && (
                      <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0" />
                    )}
                    {isAnswered && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-600 shrink-0" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Correct Banner */}
            {isAnswered && selectedAnswer === currentQuestion.correct_answer && (
              <div className="p-4 bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 rounded-xl space-y-2 animate-in fade-in">
                <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Ajoyib! Javobingiz toʻgʻri topildi.</span>
                </div>
                <p className="text-[11px] text-emerald-700 dark:text-emerald-300 leading-relaxed">
                  📖 <strong>Darslikdagi asos:</strong> {currentQuestion.explanation_reference}
                </p>
              </div>
            )}

            {/* AI TUTOR PANEL */}
            {isAnswered && selectedAnswer !== currentQuestion.correct_answer && (
              <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-6 text-white shadow-xl space-y-4 border border-indigo-700/50 animate-in fade-in">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-400/30 flex items-center justify-center">
                      <Brain className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white flex items-center gap-2">
                        Aqlli AI Repetitor
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/20">
                          {aiModelUsed}
                        </span>
                      </h4>
                      <p className="text-[11px] text-indigo-200">
                        Admin yuklagan darslik faktlariga tayangan batafsil tahlil
                      </p>
                    </div>
                  </div>
                </div>

                {isAiLoading ? (
                  <div className="p-6 text-center space-y-3">
                    <Loader2 className="w-7 h-7 text-amber-400 animate-spin mx-auto" />
                    <p className="text-xs text-indigo-200 font-medium">
                      AI Repetitor darslikdagi qoidalar va faktlarni solishtirmoqda...
                    </p>
                  </div>
                ) : aiExplanation ? (
                  <div className="space-y-3 text-xs leading-relaxed text-indigo-100 whitespace-pre-line bg-white/5 p-4 rounded-xl border border-white/10 font-sans">
                    {aiExplanation}
                  </div>
                ) : (
                  <div className="p-3 bg-white/5 rounded-xl text-xs text-indigo-200">
                    📖 <strong>Darslikdagi fakt:</strong> {currentQuestion.explanation_reference}
                  </div>
                )}
              </div>
            )}

            {/* Navigation buttons */}
            <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className="px-3.5 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 disabled:opacity-40 flex items-center gap-1 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                Oldingi
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleRestart}
                  className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-white rounded-lg transition-colors cursor-pointer"
                  title="Qayta boshlash"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {currentIndex < subjectQuestions.length - 1 ? (
                  <button
                    onClick={handleNext}
                    className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    Keyingi Savol
                    <ChevronRight className="w-4 h-4" />
                  </button>
                ) : (
                  <button
                    onClick={handleRestart}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all cursor-pointer"
                  >
                    Sinovni Qayta Boshlash
                    <RotateCcw className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};
