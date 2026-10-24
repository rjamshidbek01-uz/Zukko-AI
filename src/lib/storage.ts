import {
  BookChapter,
  BookConspectus,
  TestQuestion,
  UserSession,
  ChallengeSession,
  CustomQuizSet,
  AdminAccount,
  CompetitionConfig,
  CompetitionResult,
  CompetitionParticipant,
  CompetitionPhase,
  CompetitionPhaseDetail,
} from '../types';
import { INITIAL_BOOK_KNOWLEDGE, INITIAL_TEST_QUESTIONS } from '../data/initialData';
import { INITIAL_BOOK_CONSPECTUSES } from '../data/initialConspectuses';
import { getSupabase } from './supabase';

export const SUPER_ADMIN_EMAIL = 'rjamshidbek01@gmail.com';
export const SUPER_ADMIN_PASSWORD = 'Jamshidbek2011';
const COOKIE_NAME = 'zukko_session_id';

// Cookie helpers
export function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days = 365) {
  if (typeof document === 'undefined') return;
  const date = new Date();
  date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
  document.cookie = `${name}=${encodeURIComponent(value)};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

export function removeCookie(name: string) {
  if (typeof document === 'undefined') return;
  document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;SameSite=Lax`;
}

// Generate or retrieve session ID
export function getOrCreateSessionId(): string {
  let sessionId = getCookie(COOKIE_NAME);
  if (!sessionId) {
    sessionId = typeof window !== 'undefined' ? localStorage.getItem('zukko_session_id') : null;
  }
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 11) + Date.now().toString(36);
    setCookie(COOKIE_NAME, sessionId);
    if (typeof window !== 'undefined') {
      localStorage.setItem('zukko_session_id', sessionId);
    }
  }
  return sessionId;
}

// Storage Keys
const BOOKS_KEY = 'zukko_book_knowledge';
const QUESTIONS_KEY = 'zukko_test_questions';
const USER_PROFILES_KEY = 'zukko_user_profiles';
const CHALLENGES_KEY = 'zukko_challenges';
const CURRENT_USER_EMAIL_KEY = 'zukko_current_email';
const CUSTOM_QUIZZES_KEY = 'zukko_custom_quizzes';
const GLOBAL_SOLVED_KEY = 'zukko_global_solved_counter';
const THEME_KEY = 'zukko_theme';
const SUB_ADMINS_KEY = 'zukko_sub_admins';
const BOOK_CONSPECTUSES_KEY = 'zukko_book_conspectuses';

// ----------------------------------------------------
// STRICT ADMIN AUTHENTICATION
// ----------------------------------------------------
export function getSubAdmins(): AdminAccount[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(SUB_ADMINS_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function addSubAdmin(account: Omit<AdminAccount, 'role' | 'created_at'>): boolean {
  const current = getCurrentUser();
  if (!current.is_super_admin) {
    alert('Faqat Boş Admin yangi adminlarni taklif qilişi mumkin!');
    return false;
  }

  const existing = getSubAdmins();
  if (existing.some((a) => a.email.toLowerCase() === account.email.toLowerCase())) {
    alert('Uşbu email allaqaçon admin sifatida mavjud!');
    return false;
  }

  const newAdmin: AdminAccount = {
    ...account,
    email: account.email.trim(),
    name: account.name.trim() || 'Admin Oʻqituvçi',
    role: 'sub_admin',
    invited_by: current.email,
    created_at: new Date().toISOString(),
  };

  const updated = [...existing, newAdmin];
  localStorage.setItem(SUB_ADMINS_KEY, JSON.stringify(updated));
  return true;
}

export function deleteSubAdmin(email: string): boolean {
  const current = getCurrentUser();
  if (!current.is_super_admin) return false;
  const updated = getSubAdmins().filter((a) => a.email.toLowerCase() !== email.toLowerCase());
  localStorage.setItem(SUB_ADMINS_KEY, JSON.stringify(updated));
  return true;
}

export function verifyAdminCredentials(
  email: string,
  password?: string
): { success: boolean; isSuperAdmin: boolean; name?: string; message?: string } {
  const cleanEmail = email.trim().toLowerCase();

  // 1. Super Admin Check
  if (cleanEmail === SUPER_ADMIN_EMAIL.toLowerCase()) {
    if (password === SUPER_ADMIN_PASSWORD) {
      return {
        success: true,
        isSuperAdmin: true,
        name: 'Jamshidbek (Bosh Administrator)',
      };
    } else {
      return {
        success: false,
        isSuperAdmin: false,
        message: 'Boş admin paroli notoʻğri!',
      };
    }
  }

  // 2. Sub-Admin Check
  const subAdmins = getSubAdmins();
  const found = subAdmins.find((a) => a.email.toLowerCase() === cleanEmail);
  if (found) {
    if (found.password === password) {
      return {
        success: true,
        isSuperAdmin: false,
        name: found.name,
      };
    } else {
      return {
        success: false,
        isSuperAdmin: false,
        message: 'Admin paroli notoʻğri!',
      };
    }
  }

  return {
    success: false,
    isSuperAdmin: false,
    message: 'Uşbu email administratorlar roʻyxatida mavjud emas.',
  };
}

// ----------------------------------------------------
// FULL LOGOUT & SESSION RESET
// ----------------------------------------------------
export function clearUserSession() {
  removeCookie(COOKIE_NAME);
  if (typeof window !== 'undefined') {
    localStorage.removeItem(CURRENT_USER_EMAIL_KEY);
    localStorage.removeItem('zukko_session_id');
  }

  // Re-generate fresh guest session
  const guestSessionId = 'sess_guest_' + Math.random().toString(36).substring(2, 9);
  setCookie(COOKIE_NAME, guestSessionId);
  if (typeof window !== 'undefined') {
    localStorage.setItem('zukko_session_id', guestSessionId);
  }

  const guestProfile: UserSession = {
    session_id: guestSessionId,
    user_name: 'Oʻquvçi',
    email: '',
    avatar: '🦊',
    is_admin: false,
    is_super_admin: false,
    xp: 0,
    level: 1,
    streak_days: 1,
    last_streak_date: new Date().toISOString().split('T')[0],
    completed_subjects: [],
    total_tests_taken: 0,
    total_correct_answers: 0,
    accuracy_percentage: 0,
    topic_mastery: {},
    last_active: new Date().toISOString(),
  };

  const profiles = getAllUserProfiles();
  profiles[guestSessionId] = guestProfile;
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
  }

  return guestProfile;
}

// Theme
export function getStoredTheme(): 'light' | 'dark' {
  if (typeof window === 'undefined') return 'light';
  const stored = localStorage.getItem(THEME_KEY);
  if (stored === 'dark' || stored === 'light') return stored;
  return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

export function saveTheme(theme: 'light' | 'dark') {
  if (typeof window !== 'undefined') {
    localStorage.setItem(THEME_KEY, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}

// Global DeltaMath Counter
export function getGlobalSolvedCount(): number {
  if (typeof window === 'undefined') return 12480;
  const stored = localStorage.getItem(GLOBAL_SOLVED_KEY);
  if (!stored) {
    localStorage.setItem(GLOBAL_SOLVED_KEY, '12480');
    return 12480;
  }
  return parseInt(stored, 10) || 12480;
}

export function incrementGlobalSolvedCount(count = 1): number {
  const current = getGlobalSolvedCount();
  const updated = current + count;
  if (typeof window !== 'undefined') {
    localStorage.setItem(GLOBAL_SOLVED_KEY, updated.toString());
  }
  return updated;
}

// Books
export function getStoredBooks(): BookChapter[] {
  if (typeof window === 'undefined') return INITIAL_BOOK_KNOWLEDGE;
  const stored = localStorage.getItem(BOOKS_KEY);
  if (!stored) {
    localStorage.setItem(BOOKS_KEY, JSON.stringify(INITIAL_BOOK_KNOWLEDGE));
    return INITIAL_BOOK_KNOWLEDGE;
  }
  try {
    const parsed: BookChapter[] = JSON.parse(stored);
    // Ensure all comprehensive initial books are present
    if (parsed.length < INITIAL_BOOK_KNOWLEDGE.length) {
      const existingIds = new Set(parsed.map((b) => b.id));
      const merged = [...parsed];
      INITIAL_BOOK_KNOWLEDGE.forEach((initB) => {
        if (!existingIds.has(initB.id)) {
          merged.push(initB);
        }
      });
      localStorage.setItem(BOOKS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return INITIAL_BOOK_KNOWLEDGE;
  }
}

export async function saveBookChapter(chapter: BookChapter): Promise<BookChapter[]> {
  const books = getStoredBooks();
  const existingIdx = books.findIndex((b) => b.id === chapter.id);
  let updated: BookChapter[];
  if (existingIdx >= 0) {
    updated = [...books];
    updated[existingIdx] = { ...chapter, updated_at: new Date().toISOString() };
  } else {
    updated = [chapter, ...books];
  }
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));

  const sb = getSupabase();
  if (sb) {
    try {
      await sb.from('book_knowledge').upsert({
        id: chapter.id,
        subject: chapter.subject,
        chapter_title: chapter.chapter_title,
        section_title: chapter.section_title,
        content: chapter.content,
        summary_points: chapter.summary_points,
        formulas_or_rules: chapter.formulas_or_rules,
        updated_at: new Date().toISOString(),
      });
    } catch (e) {
      console.error('Supabase book upsert error:', e);
    }
  }

  // Auto-generate or enrich book conspectus for this specific book if not yet generated
  const bookTitle = chapter.book_title || chapter.chapter_title.split('—')[0]?.trim() || chapter.chapter_title;
  const existingConspectuses = getStoredBookConspectuses();
  if (!existingConspectuses[bookTitle]) {
    generateBookConspectusWithAI({
      bookTitle,
      subject: chapter.subject,
      grade: chapter.grade,
      pdfUrl: chapter.pdf_url,
      content: chapter.content,
      chapterTitles: [chapter.chapter_title],
    }).catch((e) => console.warn('Auto book conspectus generation error:', e));
  }

  return updated;
}

export function deleteBookChapter(id: string): BookChapter[] {
  const books = getStoredBooks();
  const updated = books.filter((b) => b.id !== id);
  localStorage.setItem(BOOKS_KEY, JSON.stringify(updated));
  return updated;
}

// ----------------------------------------------------
// BOOK-SPECIFIC CONSPECTUSES (GROQ / GEMINI AI)
// ----------------------------------------------------
export function getStoredBookConspectuses(): Record<string, BookConspectus> {
  if (typeof window === 'undefined') return INITIAL_BOOK_CONSPECTUSES;
  const stored = localStorage.getItem(BOOK_CONSPECTUSES_KEY);
  if (!stored) {
    localStorage.setItem(BOOK_CONSPECTUSES_KEY, JSON.stringify(INITIAL_BOOK_CONSPECTUSES));
    return INITIAL_BOOK_CONSPECTUSES;
  }
  try {
    const parsed: Record<string, BookConspectus> = JSON.parse(stored);
    let modified = false;
    Object.keys(INITIAL_BOOK_CONSPECTUSES).forEach((key) => {
      if (!parsed[key]) {
        parsed[key] = INITIAL_BOOK_CONSPECTUSES[key];
        modified = true;
      }
    });
    if (modified) {
      localStorage.setItem(BOOK_CONSPECTUSES_KEY, JSON.stringify(parsed));
    }
    return parsed;
  } catch {
    return INITIAL_BOOK_CONSPECTUSES;
  }
}

export function getBookConspectus(bookTitle: string): BookConspectus | null {
  const conspectuses = getStoredBookConspectuses();
  return conspectuses[bookTitle] || null;
}

export function saveBookConspectus(conspectus: BookConspectus): Record<string, BookConspectus> {
  const current = getStoredBookConspectuses();
  const updated = {
    ...current,
    [conspectus.book_title]: conspectus,
  };
  if (typeof window !== 'undefined') {
    localStorage.setItem(BOOK_CONSPECTUSES_KEY, JSON.stringify(updated));
  }
  return updated;
}

export async function generateBookConspectusWithAI(params: {
  bookTitle: string;
  subject: string;
  grade?: string;
  pdfUrl?: string;
  content?: string;
  chapterTitles?: string[];
  modelPreference?: string;
}): Promise<BookConspectus> {
  try {
    const res = await fetch('/api/ai/generate-book-conspectus', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (res.ok) {
      const data = await res.json();
      if (data.conspectus) {
        saveBookConspectus(data.conspectus);
        return data.conspectus;
      }
    }
  } catch (err) {
    console.warn('AI book conspectus fetch error:', err);
  }

  // Graceful fallback conspectus
  const fallback: BookConspectus = {
    id: 'conspectus-' + Math.random().toString(36).substring(2, 9),
    book_title: params.bookTitle,
    subject: params.subject,
    grade: params.grade || '',
    pdf_url: params.pdfUrl,
    overview: `${params.bookTitle} darsligi boʻyicha maxsus yaratilgan elektron konspekt.`,
    chapters: [
      {
        chapter_num: 1,
        chapter_title: `1-bob: ${params.bookTitle} — Asosiy qonuniyatlar`,
        summary_points: [
          `Ushbu darslik ${params.subject} fanining asosiy bilim va tushunchalarini oʻrgatadi.`,
          "Har bir bobdagi qoidalar va taʼriflarni diqqat bilan oʻrganish tavsiya etiladi.",
          "DTM test sinovlarida darslik matnidagi qonuniyatlardan savollar tuziladi.",
        ],
        formulas: [`${params.subject} tayanch qoidasi`],
        dtm_facts: [`${params.bookTitle} kitobidan imtihonda savollar tushadi.`],
      },
    ],
    global_formulas: [`${params.bookTitle} asosiy formulalari`],
    dtm_focus_points: [
      `1. ${params.bookTitle} kitobidagi asosiy taʼrif va formulalarni yodda tuting.`,
      `2. Testlarda uchraydigan standart savollarni tahlil qiling.`,
    ],
    created_at: new Date().toISOString(),
    model_source: 'Zukko Knowledge Engine',
  };
  saveBookConspectus(fallback);
  return fallback;
}

// Test Questions
export function getStoredQuestions(): TestQuestion[] {
  if (typeof window === 'undefined') return INITIAL_TEST_QUESTIONS;
  const stored = localStorage.getItem(QUESTIONS_KEY);
  if (!stored) {
    localStorage.setItem(QUESTIONS_KEY, JSON.stringify(INITIAL_TEST_QUESTIONS));
    return INITIAL_TEST_QUESTIONS;
  }
  try {
    const parsed: TestQuestion[] = JSON.parse(stored);
    // If user's cached question count is lower than the updated 315-question bank, merge them
    if (parsed.length < INITIAL_TEST_QUESTIONS.length) {
      const existingIds = new Set(parsed.map((q) => q.id));
      const merged = [...parsed];
      INITIAL_TEST_QUESTIONS.forEach((initQ) => {
        if (!existingIds.has(initQ.id)) {
          merged.push(initQ);
        }
      });
      localStorage.setItem(QUESTIONS_KEY, JSON.stringify(merged));
      return merged;
    }
    return parsed;
  } catch {
    return INITIAL_TEST_QUESTIONS;
  }
}

export async function saveQuestion(question: TestQuestion): Promise<TestQuestion[]> {
  const questions = getStoredQuestions();
  const existingIdx = questions.findIndex((q) => q.id === question.id);
  let updated: TestQuestion[];
  if (existingIdx >= 0) {
    updated = [...questions];
    updated[existingIdx] = question;
  } else {
    updated = [question, ...questions];
  }
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
  return updated;
}

export async function bulkImportQuestions(newQuestions: TestQuestion[]): Promise<{ count: number; all: TestQuestion[] }> {
  const existing = getStoredQuestions();
  const map = new Map<string, TestQuestion>();
  existing.forEach((q) => map.set(q.id, q));
  newQuestions.forEach((q) => {
    const id = q.id || 'q-' + Math.random().toString(36).substring(2, 9);
    map.set(id, { ...q, id, created_at: q.created_at || new Date().toISOString() });
  });

  const updated = Array.from(map.values());
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
  return { count: newQuestions.length, all: updated };
}

export function deleteQuestion(id: string): TestQuestion[] {
  const questions = getStoredQuestions();
  const updated = questions.filter((q) => q.id !== id);
  localStorage.setItem(QUESTIONS_KEY, JSON.stringify(updated));
  return updated;
}

// User Profiles & Sessions
export function getAllUserProfiles(): Record<string, UserSession> {
  if (typeof window === 'undefined') return {};
  const stored = localStorage.getItem(USER_PROFILES_KEY);
  if (!stored) return {};
  try {
    return JSON.parse(stored);
  } catch {
    return {};
  }
}

export function getCurrentUser(): UserSession {
  const sessionId = getOrCreateSessionId();
  const profiles = getAllUserProfiles();
  const savedEmail = typeof window !== 'undefined' ? localStorage.getItem(CURRENT_USER_EMAIL_KEY) || '' : '';

  if (profiles[sessionId]) {
    const profile = profiles[sessionId];
    if (savedEmail && !profile.email) {
      profile.email = savedEmail;
    }
    // Verify admin status
    const isSuperAdmin = profile.email?.toLowerCase().trim() === SUPER_ADMIN_EMAIL.toLowerCase();
    const isSubAdmin = getSubAdmins().some((a) => a.email.toLowerCase() === profile.email?.toLowerCase().trim());
    profile.is_admin = isSuperAdmin || isSubAdmin;
    profile.is_super_admin = isSuperAdmin;
    if (!profile.avatar) profile.avatar = '🦊';
    if (!profile.xp) profile.xp = 120;
    if (!profile.level) profile.level = Math.floor(profile.xp / 100) + 1;
    if (profile.streak_days === undefined) profile.streak_days = 3;
    return profile;
  }

  const isSuperAdmin = savedEmail.toLowerCase().trim() === SUPER_ADMIN_EMAIL.toLowerCase();
  const isSubAdmin = getSubAdmins().some((a) => a.email.toLowerCase() === savedEmail.toLowerCase().trim());
  const isAdmin = isSuperAdmin || isSubAdmin;

  const newProfile: UserSession = {
    session_id: sessionId,
    user_name: isAdmin ? (isSuperAdmin ? 'Jamshidbek (Bosh Admin)' : 'Admin Oʻqituvçi') : 'Oʻquvçi',
    email: savedEmail,
    avatar: '🦊',
    is_admin: isAdmin,
    is_super_admin: isSuperAdmin,
    xp: 120,
    level: 2,
    streak_days: 3,
    last_streak_date: new Date().toISOString().split('T')[0],
    completed_subjects: [],
    total_tests_taken: 0,
    total_correct_answers: 0,
    accuracy_percentage: 0,
    topic_mastery: {},
    last_active: new Date().toISOString(),
  };

  profiles[sessionId] = newProfile;
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
  }
  return newProfile;
}

export function getCanonicalUserKey(user: Partial<UserSession>): string {
  if (user.firestore_id && user.firestore_id.trim()) {
    return 'uid:' + user.firestore_id.trim().toLowerCase();
  }
  if (user.email && user.email.trim()) {
    return 'email:' + user.email.trim().toLowerCase();
  }
  if (user.username && user.username.trim()) {
    return 'user:' + user.username.trim().toLowerCase();
  }
  if (user.user_name) {
    const norm = user.user_name.trim().toLowerCase();
    if (norm.includes('jamshidbek')) {
      return 'admin:jamshidbek';
    }
  }
  return 'sess:' + (user.session_id || 'unknown');
}

/**
 * Returns strictly unique real user profiles for the leaderboard.
 * Deduplicates by unique ID / email / canonical username, merging XP and test counters.
 * Excludes all fake/mock accounts.
 */
export function getUniqueLeaderboardProfiles(): UserSession[] {
  const allProfiles = getAllUserProfiles();
  const current = getCurrentUser();
  const map = new Map<string, UserSession>();

  // Ensure current user is present
  const currentKey = getCanonicalUserKey(current);
  map.set(currentKey, { ...current });

  // Group and merge all records
  Object.values(allProfiles).forEach((p) => {
    // Exclude any fake/mock user entries
    const normName = (p.user_name || '').toLowerCase();
    if (
      normName.includes('aziza karimova') ||
      normName.includes('jasur bekmurodov') ||
      normName.includes('madina usmonova') ||
      normName.includes('temur aliyev') ||
      normName.includes('test_user') ||
      normName.includes('dummy') ||
      normName.includes('fake')
    ) {
      return;
    }

    const key = getCanonicalUserKey(p);
    const existing = map.get(key);

    if (!existing) {
      map.set(key, { ...p });
    } else {
      // Merge records for the exact same user
      const maxTests = Math.max(existing.total_tests_taken || 0, p.total_tests_taken || 0);
      const maxCorrect = Math.max(existing.total_correct_answers || 0, p.total_correct_answers || 0);
      const maxAccuracy = Math.max(existing.accuracy_percentage || 0, p.accuracy_percentage || 0);
      const maxXp = Math.max(existing.xp || 0, p.xp || 0);
      const maxStreak = Math.max(existing.streak_days || 0, p.streak_days || 0);

      const combinedSubs = Array.from(
        new Set([...(existing.completed_subjects || []), ...(p.completed_subjects || [])])
      );

      let bestName = existing.user_name;
      if (
        (!bestName || bestName === 'Oʻquvchi' || bestName === 'Oʻquvçi') &&
        p.user_name &&
        p.user_name !== 'Oʻquvchi'
      ) {
        bestName = p.user_name;
      }
      if (p.user_name && p.user_name.includes('Bosh Administrator')) {
        bestName = p.user_name;
      }

      map.set(key, {
        ...existing,
        user_name: bestName,
        email: existing.email || p.email,
        username: existing.username || p.username,
        firestore_id: existing.firestore_id || p.firestore_id,
        avatar: existing.avatar || p.avatar || '🦊',
        is_admin: existing.is_admin || p.is_admin,
        is_super_admin: existing.is_super_admin || p.is_super_admin,
        has_account: existing.has_account || p.has_account,
        xp: maxXp,
        level: Math.floor(maxXp / 100) + 1,
        total_tests_taken: maxTests,
        total_correct_answers: maxCorrect,
        accuracy_percentage: maxAccuracy,
        streak_days: maxStreak,
        completed_subjects: combinedSubs,
        last_active: existing.last_active > p.last_active ? existing.last_active : p.last_active,
      });
    }
  });

  const uniqueList = Array.from(map.values())
    .filter(
      (u) =>
        u.session_id === current.session_id ||
        (u.xp || 0) > 0 ||
        (u.total_tests_taken || 0) > 0 ||
        !!u.has_account
    )
    .sort((a, b) => (b.xp || 0) - (a.xp || 0));

  // Clean and consolidate localStorage database as requested
  if (typeof window !== 'undefined') {
    try {
      const cleanDb: Record<string, UserSession> = {};
      uniqueList.forEach((u) => {
        cleanDb[u.session_id] = u;
      });
      localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(cleanDb));
    } catch {
      // ignore
    }
  }

  return uniqueList;
}

export function saveUserProfile(user: Partial<UserSession>): UserSession {
  const current = getCurrentUser();
  const xp = user.xp !== undefined ? user.xp : current.xp;
  const level = Math.floor(xp / 100) + 1;

  const updated: UserSession = {
    ...current,
    ...user,
    xp,
    level,
    last_active: new Date().toISOString(),
  };

  if (updated.email) {
    const isSuper = updated.email.toLowerCase().trim() === SUPER_ADMIN_EMAIL.toLowerCase();
    const isSub = getSubAdmins().some((a) => a.email.toLowerCase() === updated.email.toLowerCase().trim());
    updated.is_super_admin = isSuper;
    updated.is_admin = isSuper || isSub;
    if (typeof window !== 'undefined') {
      localStorage.setItem(CURRENT_USER_EMAIL_KEY, updated.email.trim());
    }
  }

  const profiles = getAllUserProfiles();
  const currentKey = getCanonicalUserKey(updated);

  // Clean out any conflicting duplicates for the same user
  Object.keys(profiles).forEach((sessId) => {
    if (sessId !== updated.session_id && getCanonicalUserKey(profiles[sessId]) === currentKey) {
      delete profiles[sessId];
    }
  });

  profiles[updated.session_id] = updated;
  if (typeof window !== 'undefined') {
    localStorage.setItem(USER_PROFILES_KEY, JSON.stringify(profiles));
  }

  return updated;
}

export function recordTestResult(
  subject: string,
  topic: string,
  isCorrect: boolean
): UserSession {
  const current = getCurrentUser();
  const total = current.total_tests_taken + 1;
  const correct = current.total_correct_answers + (isCorrect ? 1 : 0);
  const accuracy = Math.round((correct / total) * 100);

  const addedXp = isCorrect ? 25 : 5;
  const updatedXp = (current.xp || 0) + addedXp;

  const today = new Date().toISOString().split('T')[0];
  let streak = current.streak_days || 1;
  if (current.last_streak_date !== today) {
    streak += 1;
  }

  incrementGlobalSolvedCount(1);

  const currentTopicScore = current.topic_mastery[topic] || 0;
  const updatedTopicScore = isCorrect
    ? Math.min(100, currentTopicScore + 15)
    : Math.max(0, currentTopicScore - 5);

  const completed = new Set(current.completed_subjects);
  if (accuracy >= 60 && total >= 3) {
    completed.add(subject);
  }

  return saveUserProfile({
    xp: updatedXp,
    streak_days: streak,
    last_streak_date: today,
    total_tests_taken: total,
    total_correct_answers: correct,
    accuracy_percentage: accuracy,
    completed_subjects: Array.from(completed),
    topic_mastery: {
      ...current.topic_mastery,
      [topic]: updatedTopicScore,
    },
  });
}

// Custom Quizzes
export function getCustomQuizzes(): CustomQuizSet[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CUSTOM_QUIZZES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function saveCustomQuiz(quiz: CustomQuizSet): CustomQuizSet[] {
  const quizzes = getCustomQuizzes();
  const existingIdx = quizzes.findIndex((q) => q.id === quiz.id);
  let updated: CustomQuizSet[];
  if (existingIdx >= 0) {
    updated = [...quizzes];
    updated[existingIdx] = quiz;
  } else {
    updated = [quiz, ...quizzes];
  }
  localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(updated));
  return updated;
}

export function deleteCustomQuiz(id: string): CustomQuizSet[] {
  const quizzes = getCustomQuizzes();
  const updated = quizzes.filter((q) => q.id !== id);
  localStorage.setItem(CUSTOM_QUIZZES_KEY, JSON.stringify(updated));
  return updated;
}

// 2-Hour Challenge
export function getStoredChallenges(): ChallengeSession[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(CHALLENGES_KEY);
  if (!stored) return [];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function getActiveChallenge(): ChallengeSession | null {
  const challenges = getStoredChallenges();
  const sessionId = getOrCreateSessionId();
  const userChallenges = challenges.filter(
    (c) => c.session_id === sessionId && c.status === 'in_progress'
  );

  if (userChallenges.length === 0) return null;

  const current = userChallenges[0];
  const now = Date.now();
  const elapsedSeconds = Math.floor((now - current.start_timestamp) / 1000);
  const remaining = Math.max(0, current.total_duration_seconds - elapsedSeconds);

  if (remaining <= 0) {
    current.status = 'expired';
    current.remaining_seconds = 0;
    saveChallenge(current);
    return current;
  }

  current.remaining_seconds = remaining;
  current.last_tick_timestamp = now;
  saveChallenge(current);
  return current;
}

export function startNewChallenge(subject: string, questionIds: string[]): ChallengeSession {
  const sessionId = getOrCreateSessionId();
  const currentUser = getCurrentUser();
  const now = Date.now();

  const newChallenge: ChallengeSession = {
    id: 'ch-' + Math.random().toString(36).substring(2, 9),
    session_id: sessionId,
    user_name: currentUser.user_name || 'Oʻquvçi',
    subject,
    question_ids: questionIds,
    user_answers: {},
    total_duration_seconds: 7200,
    remaining_seconds: 7200,
    start_timestamp: now,
    last_tick_timestamp: now,
    status: 'in_progress',
  };

  saveChallenge(newChallenge);
  return newChallenge;
}

// ----------------------------------------------------
// OYLIK MUSAOBAQALAR (MONTHLY COMPETITIONS)
// ----------------------------------------------------
const COMPETITION_CONFIG_KEY = 'zukko_competition_config';

export function getNextMonthlyCompetitionDate(): Date {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  // 25th of current month at 10:00:00 AM
  const thisMonth25th = new Date(year, month, 25, 10, 0, 0);

  if (now.getTime() < thisMonth25th.getTime()) {
    return thisMonth25th;
  }
  // Otherwise next month's 25th
  return new Date(year, month + 1, 25, 10, 0, 0);
}

export function getCompetitionConfig(): CompetitionConfig {
  if (typeof window === 'undefined') {
    return {
      id: 'comp-monthly-default',
      title: 'Oylik Katta Musobaqa',
      description: 'Har oyning 25-sanasida platformamiz tomonidan oʻtkaziluvchi 120 daqiqalik oylik musobaqa.',
      target_date: getNextMonthlyCompetitionDate().toISOString(),
      duration_minutes: 120,
      subject: 'Barcha fanlar (Aralash blok)',
      question_ids: [],
      is_active: true,
      reward_xp: 500,
    };
  }

  const stored = localStorage.getItem(COMPETITION_CONFIG_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      // Migrate old titles or saralash mentions to monthly platform competition
      if (
        parsed.title?.includes('Respublika') ||
        parsed.title?.includes('DTM Katta') ||
        parsed.description?.includes('saralash') ||
        parsed.description?.includes('respublika')
      ) {
        parsed.title = 'Oylik Katta Musobaqa';
        parsed.description = 'Har oyning 25-sanasida platformamiz tomonidan oʻtkaziluvchi 120 daqiqalik oylik musobaqa.';
        localStorage.setItem(COMPETITION_CONFIG_KEY, JSON.stringify(parsed));
      }
      return parsed;
    } catch {
      // fallback below
    }
  }

  const defaultConfig: CompetitionConfig = {
    id: 'comp-monthly-default',
    title: 'Oylik Katta Musobaqa',
    description: 'Har oyning 25-sanasida platformamiz tomonidan oʻtkaziluvchi 120 daqiqalik oylik musobaqa.',
    target_date: getNextMonthlyCompetitionDate().toISOString(),
    duration_minutes: 120,
    subject: 'Barcha fanlar (Aralash blok)',
    question_ids: [],
    is_active: true,
    reward_xp: 500,
    created_at: new Date().toISOString(),
  };

  localStorage.setItem(COMPETITION_CONFIG_KEY, JSON.stringify(defaultConfig));
  return defaultConfig;
}

export function saveCompetitionConfig(config: CompetitionConfig): CompetitionConfig {
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMPETITION_CONFIG_KEY, JSON.stringify(config));
  }
  return config;
}

export function saveChallenge(challenge: ChallengeSession): ChallengeSession[] {
  const challenges = getStoredChallenges();
  const idx = challenges.findIndex((c) => c.id === challenge.id);
  let updated: ChallengeSession[];
  if (idx >= 0) {
    updated = [...challenges];
    updated[idx] = challenge;
  } else {
    updated = [challenge, ...challenges];
  }
  localStorage.setItem(CHALLENGES_KEY, JSON.stringify(updated));
  return updated;
}

// ----------------------------------------------------
// SYNCHRONIZED COMPETITION PHASES & LIVE LEADERBOARD
// ----------------------------------------------------
const COMPETITION_RESULTS_KEY = 'zukko_competition_results';
const COMPETITION_PARTICIPANTS_KEY = 'zukko_competition_participants';

export function getCompetitionPhase(configInput?: CompetitionConfig): CompetitionPhaseDetail {
  const config = configInput || getCompetitionConfig();
  const targetTimestamp = new Date(config.target_date).getTime();
  const totalDurationSeconds = (config.duration_minutes || 120) * 60;
  const endTimestamp = targetTimestamp + totalDurationSeconds * 1000;
  const FIVE_HOURS_MS = 5 * 60 * 60 * 1000;
  const archiveTimestamp = endTimestamp + FIVE_HOURS_MS;
  const now = Date.now();

  // If explicitly force started by admin/system for live demo/testing
  if (config.force_started) {
    const elapsed = Math.max(0, Math.floor((now - targetTimestamp) / 1000));
    const liveRemaining = totalDurationSeconds - elapsed;
    if (liveRemaining > 0) {
      return {
        phase: 'active',
        remainingSeconds: liveRemaining,
        totalDurationSeconds,
        targetTimestamp,
        endTimestamp: now + liveRemaining * 1000,
        archiveTimestamp: now + liveRemaining * 1000 + FIVE_HOURS_MS,
        resultsVisible: true,
        remainingVisibilitySeconds: FIVE_HOURS_MS / 1000,
      };
    } else {
      const visibilityElapsed = elapsed - totalDurationSeconds;
      const visibilityRemaining = Math.max(0, Math.floor(FIVE_HOURS_MS / 1000 - visibilityElapsed));
      if (visibilityRemaining > 0) {
        return {
          phase: 'completed_recent',
          remainingSeconds: 0,
          totalDurationSeconds,
          targetTimestamp,
          endTimestamp,
          archiveTimestamp: endTimestamp + FIVE_HOURS_MS,
          resultsVisible: true,
          remainingVisibilitySeconds: visibilityRemaining,
        };
      } else {
        return {
          phase: 'archived',
          remainingSeconds: 0,
          totalDurationSeconds,
          targetTimestamp,
          endTimestamp,
          archiveTimestamp: endTimestamp + FIVE_HOURS_MS,
          resultsVisible: false,
          remainingVisibilitySeconds: 0,
        };
      }
    }
  }

  // 1. Before competition starts: Results must NOT be visible at all ("Hali boshlanmadi")
  if (now < targetTimestamp) {
    return {
      phase: 'upcoming',
      remainingSeconds: Math.max(0, Math.floor((targetTimestamp - now) / 1000)),
      totalDurationSeconds,
      targetTimestamp,
      endTimestamp,
      archiveTimestamp,
      resultsVisible: false,
      remainingVisibilitySeconds: 0,
    };
  }
  // 2. During competition: Live results and leaderboard are visible
  else if (now < endTimestamp) {
    return {
      phase: 'active',
      remainingSeconds: Math.max(0, Math.floor((endTimestamp - now) / 1000)),
      totalDurationSeconds,
      targetTimestamp,
      endTimestamp,
      archiveTimestamp,
      resultsVisible: true,
      remainingVisibilitySeconds: Math.floor(FIVE_HOURS_MS / 1000),
    };
  }
  // 3. Up to 5 hours after competition ends: Results are visible
  else if (now <= archiveTimestamp) {
    return {
      phase: 'completed_recent',
      remainingSeconds: 0,
      totalDurationSeconds,
      targetTimestamp,
      endTimestamp,
      archiveTimestamp,
      resultsVisible: true,
      remainingVisibilitySeconds: Math.max(0, Math.floor((archiveTimestamp - now) / 1000)),
    };
  }
  // 4. More than 5 hours after competition ends: Automatically hidden/archived
  else {
    return {
      phase: 'archived',
      remainingSeconds: 0,
      totalDurationSeconds,
      targetTimestamp,
      endTimestamp,
      archiveTimestamp,
      resultsVisible: false,
      remainingVisibilitySeconds: 0,
    };
  }
}

// Zero fake/mock results: strictly real verified results only
const INITIAL_COMPETITION_RESULTS: CompetitionResult[] = [];

// Zero fake/mock lobby participants: strictly real registered participants only
const INITIAL_LOBBY_PARTICIPANTS: CompetitionParticipant[] = [];

export function getCompetitionResults(): CompetitionResult[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(COMPETITION_RESULTS_KEY);
  if (!stored) {
    return [];
  }
  try {
    const list: CompetitionResult[] = JSON.parse(stored);
    // Purge fake mock seed records
    const realList = list.filter(
      (r) =>
        r &&
        !r.id.startsWith('res-seed-') &&
        !r.session_id.startsWith('sess-aziza') &&
        !r.session_id.startsWith('sess-jasur') &&
        !r.session_id.startsWith('sess-madina') &&
        !r.session_id.startsWith('sess-temur') &&
        !r.session_id.startsWith('sess-shahlo') &&
        !r.session_id.startsWith('sess-bobur') &&
        !r.session_id.startsWith('sess-dilnoza') &&
        !r.session_id.startsWith('sess-sardor') &&
        !r.session_id.startsWith('sess-nilufar') &&
        !r.session_id.startsWith('sess-otabek')
    );
    if (realList.length !== list.length) {
      localStorage.setItem(COMPETITION_RESULTS_KEY, JSON.stringify(realList));
    }
    return realList
      .sort((a, b) => {
        if (b.score !== a.score) return b.score - a.score;
        return a.time_spent_seconds - b.time_spent_seconds;
      })
      .map((item, idx) => ({ ...item, rank: idx + 1 }));
  } catch {
    return [];
  }
}

export function recordCompetitionResult(result: Omit<CompetitionResult, 'rank'>): CompetitionResult[] {
  const current = getCompetitionResults();
  const existingIdx = current.findIndex(
    (r) => r.session_id === result.session_id || r.id === result.id
  );
  
  let updated: CompetitionResult[];
  if (existingIdx >= 0) {
    updated = [...current];
    updated[existingIdx] = { ...result, rank: existingIdx + 1 };
  } else {
    updated = [result, ...current];
  }

  // Sort and re-rank
  const ranked = updated
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.time_spent_seconds - b.time_spent_seconds;
    })
    .map((item, idx) => ({ ...item, rank: idx + 1 }));

  if (typeof window !== 'undefined') {
    localStorage.setItem(COMPETITION_RESULTS_KEY, JSON.stringify(ranked));
  }
  return ranked;
}

export function getCompetitionParticipants(): CompetitionParticipant[] {
  if (typeof window === 'undefined') return [];
  const stored = localStorage.getItem(COMPETITION_PARTICIPANTS_KEY);
  if (!stored) {
    return [];
  }
  try {
    const list: CompetitionParticipant[] = JSON.parse(stored);
    // Purge fake mock accounts
    const realList = list.filter(
      (p) =>
        p &&
        !p.id.startsWith('part-1') &&
        !p.id.startsWith('part-2') &&
        !p.id.startsWith('part-3') &&
        !p.id.startsWith('part-4') &&
        !p.id.startsWith('part-5') &&
        !p.id.startsWith('part-6') &&
        !p.id.startsWith('part-7') &&
        !p.id.startsWith('part-8') &&
        !p.id.startsWith('part-9') &&
        !p.id.startsWith('part-10') &&
        !p.id.startsWith('part-11') &&
        !p.id.startsWith('part-12') &&
        !p.id.startsWith('part-13') &&
        !p.session_id.startsWith('sess-aziza') &&
        !p.session_id.startsWith('sess-jasur') &&
        !p.session_id.startsWith('sess-madina')
    );
    if (realList.length !== list.length) {
      localStorage.setItem(COMPETITION_PARTICIPANTS_KEY, JSON.stringify(realList));
    }
    return realList;
  } catch {
    return [];
  }
}

export function joinCompetitionLobby(user: UserSession): CompetitionParticipant[] {
  const list = getCompetitionParticipants();
  const canonicalKey = getCanonicalUserKey(user);
  const exists = list.find(
    (p) =>
      p.session_id === user.session_id ||
      p.user_name === user.user_name ||
      (user.username && p.user_name === user.username)
  );
  if (exists) {
    return list;
  }
  const newParticipant: CompetitionParticipant = {
    id: 'user_part_' + Math.random().toString(36).substring(2, 8),
    user_name: user.user_name || 'Oʻquvchi',
    session_id: user.session_id,
    avatar: user.avatar || '🎓',
    region: 'Oʻzbekiston',
    joined_at: new Date().toISOString(),
    status: 'ready',
  };
  const updated = [newParticipant, ...list];
  if (typeof window !== 'undefined') {
    localStorage.setItem(COMPETITION_PARTICIPANTS_KEY, JSON.stringify(updated));
  }
  return updated;
}

export function isUserInCompetitionLobby(sessionId: string): boolean {
  const list = getCompetitionParticipants();
  return list.some((p) => p.session_id === sessionId);
}

