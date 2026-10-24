import { TestQuestion } from '../types';

/**
 * Creates a deterministic hash from a string
 */
function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash) || 12345;
}

/**
 * Seeded pseudo-random number generator (Mulberry32)
 */
function createSeededRandom(seed: number) {
  let s = seed;
  return function () {
    s |= 0;
    s = (s + 0x6d2b79f5) | 0;
    let t = Math.imul(s ^ (s >>> 15), 1 | s);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Gets formatted date string YYYY-MM-DD
 */
export function getTodayDateString(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Formats date into readable Uzbek format: e.g. "23-oktabr, 2026-yil"
 */
export function formatUzbekDate(dateStr: string): string {
  const months = [
    'yanvar', 'fevral', 'mart', 'aprel', 'may', 'iyun',
    'iyul', 'avgust', 'sentabr', 'oktabr', 'noyabr', 'dekabr'
  ];
  try {
    const parts = dateStr.split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      return `${day}-${months[monthIdx] || 'oy'}, ${year}-yil`;
    }
  } catch {
    // fallback
  }
  return dateStr;
}

/**
 * Calculates remaining time until next midnight (00:00:00)
 */
export function getTimeUntilMidnight(): { hours: number; minutes: number; seconds: number } {
  const now = new Date();
  const midnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
  const diffMs = midnight.getTime() - now.getTime();
  const totalSec = Math.max(0, Math.floor(diffMs / 1000));
  const hours = Math.floor(totalSec / 3600);
  const minutes = Math.floor((totalSec % 3600) / 60);
  const seconds = totalSec % 60;
  return { hours, minutes, seconds };
}

/**
 * Selects exactly 30 questions deterministically for today's date and given subject.
 * Next day at 00:00, the questions automatically rotate.
 */
export function getDailyQuestionsForSubject(
  allQuestions: TestQuestion[],
  subject: string,
  targetCount: number = 30,
  dateOverride?: string,
  setIndex: number = 0
): {
  questions: TestQuestion[];
  dateStr: string;
  formattedDate: string;
  totalInPool: number;
} {
  const pool = allQuestions.filter((q) => q.subject === subject);
  const dateStr = dateOverride || getTodayDateString();
  const formattedDate = formatUzbekDate(dateStr);

  if (pool.length === 0) {
    return { questions: [], dateStr, formattedDate, totalInPool: 0 };
  }

  // If pool has fewer or equal to target, return all shuffled for today
  const seedString = `${dateStr}-${subject}-set-${setIndex}`;
  const seed = hashString(seedString);
  const random = createSeededRandom(seed);

  // Fisher-Yates shuffle with seeded PRNG
  const shuffled = [...pool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  const selected = shuffled.slice(0, Math.min(targetCount, shuffled.length));

  return {
    questions: selected,
    dateStr,
    formattedDate,
    totalInPool: pool.length,
  };
}
