import React, { useState } from 'react';
import {
  Trophy,
  Flame,
  Award,
  Zap,
  CheckCircle,
  PlusCircle,
  Edit2,
  Trash2,
  Play,
  TrendingUp,
  Shield,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { UserSession, CustomQuizSet } from '../types';
import {
  saveUserProfile,
  getCustomQuizzes,
  deleteCustomQuiz,
  getUniqueLeaderboardProfiles,
  getCanonicalUserKey,
} from '../lib/storage';

interface UserProfileViewProps {
  currentUser: UserSession;
  onDataUpdated: () => void;
  onPlayCustomQuiz: (quiz: CustomQuizSet) => void;
  onNavigateToGames: () => void;
}

const AVATAR_OPTIONS = ['🦊', '🦁', '🦉', '🚀', '💎', '⚡', '🎓', '👑'];

export const UserProfileView: React.FC<UserProfileViewProps> = ({
  currentUser,
  onDataUpdated,
  onPlayCustomQuiz,
  onNavigateToGames,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(currentUser.user_name || 'Oʻquvchi');
  const [selectedAvatar, setSelectedAvatar] = useState(currentUser.avatar || '🦊');

  const customQuizzes = getCustomQuizzes();
  const myQuizzes = customQuizzes.filter(
    (q) => q.author_id === currentUser.session_id || q.author_name === currentUser.user_name
  );

  // Leaderboard with strictly UNIQUE real user profiles (Zero fake/mock data, deduplicated by identity)
  const sortedLeaderboard = getUniqueLeaderboardProfiles();

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    saveUserProfile({
      user_name: editName.trim() || 'Oʻquvchi',
      avatar: selectedAvatar,
    });
    setIsEditing(false);
    onDataUpdated();
  };

  const handleDeleteQuiz = (id: string) => {
    if (confirm('Ushbu shaxsiy oʻyin toʻplamini oʻchirmoqchimisiz?')) {
      deleteCustomQuiz(id);
      onDataUpdated();
    }
  };

  // Level & XP math
  const currentXp = currentUser.xp || 120;
  const currentLevel = currentUser.level || Math.floor(currentXp / 100) + 1;
  const xpInCurrentLevel = currentXp % 100;
  const levelTitle =
    currentLevel >= 10
      ? 'Buyuk Donishmand'
      : currentLevel >= 5
      ? 'Ilm Sohibi'
      : currentLevel >= 3
      ? 'Faol Bilimdon'
      : 'Boshlangʻich Izlanuvchi';

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      {/* Profile Header Card */}
      <div className="relative overflow-hidden bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200 dark:border-slate-800 shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="relative">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-indigo-500/20 to-violet-500/20 dark:from-indigo-950 dark:to-slate-800 border-2 border-indigo-200 dark:border-indigo-800 flex items-center justify-center text-4xl shadow-sm">
              {currentUser.avatar || '🦊'}
            </div>
            <span className="absolute -bottom-2 -right-2 px-2 py-0.5 bg-indigo-600 text-white rounded-full text-[10px] font-bold font-mono">
              LVL {currentLevel}
            </span>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
                {currentUser.user_name}
              </h1>
              {currentUser.is_admin && (
                <span className="px-2 py-0.5 bg-amber-100 dark:bg-amber-950/60 text-amber-800 dark:text-amber-300 rounded-full text-[10px] font-bold border border-amber-300 dark:border-amber-700">
                  Admin
                </span>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold">
                {levelTitle} • {currentUser.username ? `@${currentUser.username}` : currentUser.email || 'Mehmon Oʻquvchi'}
              </p>
              {currentUser.has_account && (
                <span className="text-[10px] bg-emerald-100 dark:bg-emerald-950/70 text-emerald-700 dark:text-emerald-300 px-2 py-0.5 rounded-full font-bold border border-emerald-300 dark:border-emerald-800">
                  ☁️ Baza bilan sinxron
                </span>
              )}
            </div>

            {/* XP Progress Bar */}
            <div className="pt-2 w-64 sm:w-80 space-y-1">
              <div className="flex justify-between text-[11px] text-slate-500 dark:text-slate-400 font-mono">
                <span>{currentXp} XP</span>
                <span>{currentLevel * 100} XP (Keyingi daraja)</span>
              </div>
              <div className="w-full h-2.5 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-500 to-violet-500 rounded-full transition-all duration-500"
                  style={{ width: `${xpInCurrentLevel}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all flex items-center gap-1.5 cursor-pointer shrink-0"
        >
          <Edit2 className="w-3.5 h-3.5" />
          Profilni Tahrirlash
        </button>
      </div>

      {/* DeltaMath-Style Real-Time Ticker & Analytics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Solved Counter */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Yechilgan Savollar</span>
            <CheckCircle className="w-4 h-4 text-emerald-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            {currentUser.total_tests_taken}
          </h3>
          <p className="text-[11px] text-emerald-600 font-semibold">
            {currentUser.total_correct_answers} ta toʻgʻri javob
          </p>
        </div>

        {/* Accuracy Rate */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Aniqlik Foizi</span>
            <TrendingUp className="w-4 h-4 text-indigo-600" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            {currentUser.accuracy_percentage}%
          </h3>
          <p className="text-[11px] text-slate-400">DeltaMath standarti</p>
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
          <p className="text-[11px] text-slate-400">Ketma-ket faollik</p>
        </div>

        {/* Experience Points */}
        <div className="bg-white dark:bg-slate-900 p-5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-1">
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 font-medium">
            <span>Jami Tajriba (XP)</span>
            <Zap className="w-4 h-4 text-amber-500" />
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tabular-nums font-mono">
            {currentUser.xp || 120}
          </h3>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium">
            {levelTitle}
          </p>
        </div>
      </div>

      {/* Main 2-Column Section: Left (My Custom Quizzes), Right (Leaderboard) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: My Created Quizzes */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Mening Shaxsiy Oʻyinlarim & Testlarim
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Oʻzingiz yaratgan toʻplamlar
              </p>
            </div>
            <button
              onClick={onNavigateToGames}
              className="text-xs font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1 cursor-pointer"
            >
              <PlusCircle className="w-3.5 h-3.5" />
              Yangi Yaratish
            </button>
          </div>

          <div className="space-y-3">
            {myQuizzes.length === 0 ? (
              <div className="p-8 text-center space-y-3 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl">
                <Sparkles className="w-8 h-8 text-slate-300 dark:text-slate-600 mx-auto" />
                <p className="text-xs text-slate-500">
                  Hozirça şaxsiy oʻyin yaratmadingiz. Öyinlar zali uçun yangi test toʻplami tuzing va +50 XP oling!
                </p>
                <button
                  onClick={onNavigateToGames}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Öyin Yaratiş Ustasi →
                </button>
              </div>
            ) : (
              myQuizzes.map((quiz) => (
                <div
                  key={quiz.id}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/60 dark:bg-slate-800/40 flex items-center justify-between gap-3"
                >
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950/80 text-indigo-700 dark:text-indigo-300">
                      {quiz.subject}
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                      {quiz.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 font-mono">
                      {quiz.questions.length} ta savol
                    </p>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => onPlayCustomQuiz(quiz)}
                      className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Oʻynash
                    </button>
                    <button
                      onClick={() => handleDeleteQuiz(quiz.id)}
                      className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                      title="Oʻchirish"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right: Leaderboard */}
        <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-amber-500" />
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Peshqadamlar Jadvali
                </h3>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold">
                  100% Shaffof • Faqat Tasdiqlangan Foydalanuvchilar
                </p>
              </div>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Umumiy XP</span>
          </div>

          <div className="space-y-2">
            {sortedLeaderboard.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-400 border border-dashed rounded-2xl">
                Hozircha reytingda oʻquvchilar yoʻq. Testlarni yechib birinchi oʻrinni egallang!
              </div>
            ) : (
              sortedLeaderboard.slice(0, 10).map((user, idx) => {
                const isMe =
                  user.session_id === currentUser.session_id ||
                  getCanonicalUserKey(user) === getCanonicalUserKey(currentUser);

                return (
                  <div
                    key={getCanonicalUserKey(user)}
                    className={`p-3 rounded-2xl border flex items-center justify-between gap-3 text-xs transition-all ${
                      isMe
                        ? 'border-indigo-400 bg-indigo-50/70 dark:bg-indigo-950/60 font-bold shadow-xs'
                        : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[11px] font-mono ${
                          idx === 0
                            ? 'bg-amber-400 text-amber-950'
                            : idx === 1
                            ? 'bg-slate-300 text-slate-800'
                            : idx === 2
                            ? 'bg-amber-600 text-white'
                            : 'bg-slate-100 dark:bg-slate-800 text-slate-500'
                        }`}
                      >
                        {idx + 1}
                      </span>
                      <span className="text-base">{user.avatar || '🦊'}</span>
                      <div>
                        <p className="font-semibold text-slate-900 dark:text-white flex items-center gap-1.5">
                          <span>{user.user_name}</span>
                          {isMe && (
                            <span className="text-[9px] bg-indigo-600 text-white px-1.5 py-0.2 rounded-full font-bold">
                              Siz
                            </span>
                          )}
                        </p>
                        <p className="text-[10px] text-slate-400">
                          {user.total_tests_taken || 0} ta test yechildi
                        </p>
                      </div>
                    </div>

                    <span className="font-mono font-extrabold text-indigo-600 dark:text-indigo-400">
                      {user.xp || 120} XP
                    </span>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in">
          <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 p-6 space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Profil Maʼlumotlarini Tahrirlash
            </h3>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Avatar Belgisini Tanlang
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setSelectedAvatar(av)}
                      className={`h-12 rounded-xl text-2xl flex items-center justify-center border transition-all cursor-pointer ${
                        selectedAvatar === av
                          ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 scale-105'
                          : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ism-Sharif
                </label>
                <input
                  type="text"
                  required
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-4 py-2 border border-slate-300 dark:border-slate-700 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300"
                >
                  Bekor Qilish
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
                >
                  Saqlash
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
