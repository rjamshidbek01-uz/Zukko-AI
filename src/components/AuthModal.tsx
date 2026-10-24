import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  UserCheck,
  Key,
  Lock,
  AlertCircle,
  CheckCircle2,
  UserPlus,
  LogIn,
  Sparkles,
  Loader2,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { UserSession } from '../types';
import { verifyAdminCredentials, SUPER_ADMIN_EMAIL } from '../lib/storage';
import {
  registerUserWithLogin,
  loginUserWithLogin,
  signInWithGoogle,
} from '../lib/firebase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserSession;
  onSaveProfile: (profile: Partial<UserSession>) => void;
  onSwitchToAdminTab: () => void;
  initialMode?: 'register' | 'login' | 'admin';
  isFirstTime?: boolean;
}

const AVATAR_OPTIONS = ['👨‍🎓', '👩‍🎓', '🧑‍💻', '🧕', '👨‍🔬', '👩‍🔬', '🦊', '⚡', '🌟'];

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onSaveProfile,
  onSwitchToAdminTab,
  initialMode = 'register',
  isFirstTime = false,
}) => {
  const [authMode, setAuthMode] = useState<'register' | 'login' | 'admin'>(initialMode);

  // Registration Form State
  const [regUsername, setRegUsername] = useState('');
  const [regDisplayName, setRegDisplayName] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirmPassword, setRegConfirmPassword] = useState('');
  const [regAvatar, setRegAvatar] = useState('👨‍🎓');

  // Login Form State
  const [loginUsername, setLoginUsername] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Admin form
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');

  // Status & Feedback
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  // 1. Handle Registration (Login + Password -> Firestore Database)
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const cleanUsername = regUsername.trim().toLowerCase();
    const cleanDisplayName = regDisplayName.trim() || cleanUsername;
    const password = regPassword.trim();

    if (cleanUsername.length < 3) {
      setErrorMessage('Login kamida 3 ta belgidan iborat boʻlishi shart!');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setErrorMessage('Login faqat lotin harflari, raqamlar va pastki chiziqdan iborat boʻlishi mumkin!');
      return;
    }
    if (password.length < 4) {
      setErrorMessage('Parol kamida 4 ta belgidan iborat boʻlishi shart!');
      return;
    }
    if (password !== regConfirmPassword.trim()) {
      setErrorMessage('Kiritilgan parollar bir-biriga mos kelmadi!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await registerUserWithLogin({
        username: cleanUsername,
        displayName: cleanDisplayName,
        password: password,
        avatar: regAvatar,
      });

      if (res.success && res.user) {
        onSaveProfile(res.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('zukko_account_created', 'true');
        }
        setSuccessMessage('🎉 Akkountingiz muvaffaqiyatli yaratildi va bazaga saqlandi!');
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          onClose();
        }, 1200);
      } else {
        setErrorMessage(res.error || 'Akkount yaratishda xatolik yuz berdi.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Bazada xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Handle Login (Existing Login + Password from Firestore)
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!loginUsername.trim() || !loginPassword.trim()) {
      setErrorMessage('Iltimos, login va parolni kiriting!');
      return;
    }

    setIsLoading(true);
    try {
      const res = await loginUserWithLogin(loginUsername, loginPassword);

      if (res.success && res.user) {
        onSaveProfile(res.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('zukko_account_created', 'true');
        }
        setSuccessMessage(`✅ Xush kelibsiz, ${res.user.user_name}!`);
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(res.error || 'Login yoki parol notoʻgʻri!');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Tizimga kirishda xatolik.');
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Handle Google Sign-in with Firebase Auth & Firestore
  const handleGoogleSignIn = async () => {
    setErrorMessage(null);
    setSuccessMessage(null);
    setIsLoading(true);

    try {
      const res = await signInWithGoogle();
      if (res.success && res.user) {
        onSaveProfile(res.user);
        if (typeof window !== 'undefined') {
          localStorage.setItem('zukko_account_created', 'true');
        }
        setSuccessMessage(`✅ Google orqali ulandi: ${res.user.user_name}!`);
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.6 },
        });
        setTimeout(() => {
          onClose();
        }, 1000);
      } else {
        setErrorMessage(res.error || 'Google orqali kirish amalga oshmadi.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Google kirishida xatolik yuz berdi.');
    } finally {
      setIsLoading(false);
    }
  };

  // 4. Handle Admin Login
  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    const check = verifyAdminCredentials(adminEmail, adminPassword);

    if (check.success) {
      onSaveProfile({
        user_name: check.name || 'Administrator',
        email: adminEmail.trim(),
        is_admin: true,
        is_super_admin: check.isSuperAdmin,
        has_account: true,
      });

      setSuccessMessage(
        check.isSuperAdmin
          ? '✅ Bosh Administrator tasdiqlandi! Toʻliq boshqaruv ochildi.'
          : '✅ Administrator tasdiqlandi! Admin boshqaruv paneli ochildi.'
      );

      setTimeout(() => {
        onClose();
        onSwitchToAdminTab();
      }, 1000);
    } else {
      setErrorMessage(check.message || 'Email yoki parol notoʻgʻri!');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/75 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl max-w-md w-full border border-slate-200 dark:border-slate-800 overflow-hidden">
        {/* Header Banner */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 p-6 text-white relative">
          {!isFirstTime && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/20 flex items-center justify-center border border-indigo-400/30 shadow-inner">
              {authMode === 'register' ? (
                <UserPlus className="w-6 h-6 text-indigo-300" />
              ) : authMode === 'login' ? (
                <LogIn className="w-6 h-6 text-indigo-300" />
              ) : (
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              )}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-black uppercase tracking-wider text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-md border border-amber-400/20">
                  Firebase Baza
                </span>
                {isFirstTime && (
                  <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-0.5 rounded-md">
                    Xush kelibsiz!
                  </span>
                )}
              </div>
              <h3 className="text-lg font-extrabold tracking-tight mt-0.5">
                {authMode === 'register'
                  ? 'Akkount Yaratish'
                  : authMode === 'login'
                  ? 'Tizimga Kirish'
                  : 'Admin Kirishi'}
              </h3>
            </div>
          </div>

          <p className="text-xs text-indigo-200/90 mt-2 leading-relaxed">
            {authMode === 'register'
              ? 'Platformadan toʻliq foydalanish va natijalaringiz saqlanib borishi uchun oʻzingizga login va parol tanlang.'
              : authMode === 'login'
              ? 'Oldin roʻyxatdan oʻtgan loginingiz va parolingiz bilan kiring.'
              : 'Admin paneli uchun maxsus kalit orqali kirish.'}
          </p>

          {/* Mode Switcher Tabs */}
          <div className="grid grid-cols-3 gap-1 p-1 bg-white/10 rounded-xl mt-4 text-xs font-bold">
            <button
              type="button"
              onClick={() => {
                setAuthMode('register');
                setErrorMessage(null);
              }}
              className={`py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                authMode === 'register'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Roʻyxatdan oʻtish
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('login');
                setErrorMessage(null);
              }}
              className={`py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                authMode === 'login'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => {
                setAuthMode('admin');
                setErrorMessage(null);
              }}
              className={`py-1.5 rounded-lg transition-all cursor-pointer text-center ${
                authMode === 'admin'
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Admin 🔒
            </button>
          </div>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-4 max-h-[75vh] overflow-y-auto">
          {errorMessage && (
            <div className="p-3 bg-red-50 dark:bg-red-950/50 border border-red-200 dark:border-red-800 rounded-xl text-red-700 dark:text-red-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* ------------------------------------------------ */}
          {/* 1. REGISTER FORM (Login + Password -> Database)  */}
          {/* ------------------------------------------------ */}
          {authMode === 'register' && (
            <form onSubmit={handleRegister} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Login (Foydalanuvchi nomi) *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={regUsername}
                    onChange={(e) => setRegUsername(e.target.value.toLowerCase().replace(/[^a-z0-9_]/g, ''))}
                    placeholder="Masalan: jasur_student"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <span className="text-[10px] text-slate-400 mt-0.5 block">
                  Lotin harflari, raqamlar va pastki chiziqdan iborat (kamida 3 belgi)
                </span>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ism va Familiyangiz *
                </label>
                <input
                  type="text"
                  required
                  value={regDisplayName}
                  onChange={(e) => setRegDisplayName(e.target.value)}
                  placeholder="Masalan: Jasur Rahmonov"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Parol *
                  </label>
                  <input
                    type="password"
                    required
                    value={regPassword}
                    onChange={(e) => setRegPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Parolni tasdiqlang *
                  </label>
                  <input
                    type="password"
                    required
                    value={regConfirmPassword}
                    onChange={(e) => setRegConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
              </div>

              {/* Avatar Chooser */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
                  Avatar Tanlang:
                </label>
                <div className="flex items-center gap-1.5 flex-wrap">
                  {AVATAR_OPTIONS.map((av) => (
                    <button
                      key={av}
                      type="button"
                      onClick={() => setRegAvatar(av)}
                      className={`w-9 h-9 rounded-xl text-lg flex items-center justify-center transition-transform cursor-pointer ${
                        regAvatar === av
                          ? 'bg-indigo-600 text-white ring-2 ring-indigo-500 scale-110 shadow-xs'
                          : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700'
                      }`}
                    >
                      {av}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md hover:shadow-indigo-500/25 transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <UserPlus className="w-4 h-4" />
                  )}
                  Akkount Yaratish va Bazaga Saqlash
                </button>
              </div>

              {/* Google Fast Sign-in */}
              <div className="pt-2">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase font-semibold">
                    yoki
                  </span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Google orqali tezkor kirish
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('login');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                >
                  Menda allaqachon login bor (Kirish)
                </button>
              </div>
            </form>
          )}

          {/* ------------------------------------------------ */}
          {/* 2. LOGIN FORM (Existing Credentials)             */}
          {/* ------------------------------------------------ */}
          {authMode === 'login' && (
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Login yoki Foydalanuvchi nomi *
                </label>
                <input
                  type="text"
                  required
                  value={loginUsername}
                  onChange={(e) => setLoginUsername(e.target.value)}
                  placeholder="Login nomingiz"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Parol *
                </label>
                <input
                  type="password"
                  required
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50"
                >
                  {isLoading ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <LogIn className="w-4 h-4" />
                  )}
                  Tizimga Kirish
                </button>
              </div>

              {/* Google Fast Sign-in */}
              <div className="pt-2">
                <div className="relative flex py-1 items-center">
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                  <span className="flex-shrink mx-3 text-[10px] text-slate-400 uppercase font-semibold">
                    yoki
                  </span>
                  <div className="flex-grow border-t border-slate-200 dark:border-slate-800" />
                </div>

                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  disabled={isLoading}
                  className="w-full mt-2 py-2.5 px-4 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#4285F4"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                    />
                    <path
                      fill="#EA4335"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                    />
                  </svg>
                  Google orqali tezkor kirish
                </button>
              </div>

              <div className="text-center pt-1">
                <button
                  type="button"
                  onClick={() => {
                    setAuthMode('register');
                    setErrorMessage(null);
                  }}
                  className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline font-bold cursor-pointer"
                >
                  Yangi hisob yaratish (Roʻyxatdan oʻtish)
                </button>
              </div>
            </form>
          )}

          {/* ------------------------------------------------ */}
          {/* 3. STRICT ADMIN LOGIN FORM                       */}
          {/* ------------------------------------------------ */}
          {authMode === 'admin' && (
            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div className="p-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800/60 rounded-xl text-[11px] text-amber-800 dark:text-amber-300">
                🔒 Admin paneliga faqat Bosh Admin va tayinlangan adminlar ruxsat etilgan email va parol orqali kira oladi.
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Elektron Pochtasi *
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@platforma.uz"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Paroli *
                </label>
                <input
                  type="password"
                  required
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full px-3.5 py-2.5 text-xs font-semibold border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-2"
                >
                  <Key className="w-4 h-4" />
                  Admin Paneli Kirişi
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
