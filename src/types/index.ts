export type SubjectType =
  | 'Matematika'
  | 'Fizika'
  | 'Tarix'
  | 'Biologiya'
  | 'Kimyo'
  | 'Ona tili va adabiyot'
  | 'Astronomiya'
  | 'Geografiya'
  | 'Ingliz tili';

export interface BookChapter {
  id: string;
  subject: SubjectType | string;
  book_title?: string;
  grade?: string;
  chapter_title: string;
  section_title: string;
  content: string;
  pdf_url?: string;
  pdf_page?: number;
  summary_points: string[];
  formulas_or_rules: string[];
  key_facts?: string[];
  ai_model?: string;
  created_at?: string;
  updated_at?: string;
}

export interface BookConspectusChapter {
  chapter_num: number;
  chapter_title: string;
  summary_points: string[];
  formulas?: string[];
  dtm_facts?: string[];
}

export interface BookConspectus {
  id: string;
  book_title: string;
  subject: SubjectType | string;
  grade?: string;
  pdf_url?: string;
  overview: string;
  chapters: BookConspectusChapter[];
  global_formulas: string[];
  dtm_focus_points: string[];
  created_at: string;
  updated_at?: string;
  model_source?: string;
}

export interface TestQuestion {
  id: string;
  subject: SubjectType | string;
  topic: string;
  question: string;
  options: {
    A: string;
    B: string;
    C: string;
    D: string;
  };
  correct_answer: 'A' | 'B' | 'C' | 'D';
  explanation_reference: string;
  created_at?: string;
}

export interface CustomQuizSet {
  id: string;
  title: string;
  description: string;
  subject: string;
  author_id: string;
  author_name: string;
  questions: TestQuestion[];
  plays_count: number;
  created_at: string;
}

export interface AdminAccount {
  email: string;
  password: string; // Plain/SHA for prototype authentication
  name: string;
  role: 'super_admin' | 'sub_admin';
  invited_by?: string;
  created_at: string;
}

export interface UserSession {
  session_id: string;
  user_name: string;
  email: string;
  avatar: string;
  is_admin: boolean;
  is_super_admin?: boolean;
  has_account?: boolean;
  username?: string;
  firestore_id?: string;
  xp: number;
  level: number;
  streak_days: number;
  last_streak_date: string;
  completed_subjects: string[];
  total_tests_taken: number;
  total_correct_answers: number;
  accuracy_percentage: number;
  topic_mastery: Record<string, number>;
  last_active: string;
  created_at?: string;
}

export interface ChallengeSession {
  id: string;
  session_id: string;
  user_name: string;
  subject: string;
  question_ids: string[];
  user_answers: Record<string, 'A' | 'B' | 'C' | 'D'>;
  total_duration_seconds: number;
  remaining_seconds: number;
  start_timestamp: number;
  last_tick_timestamp: number;
  status: 'in_progress' | 'completed' | 'expired';
  score?: number;
  total_questions?: number;
  completed_at?: string;
}

export interface AITutorResponse {
  isCorrect: boolean;
  whyWrong?: string;
  whyCorrect: string;
  bookReferenceFact: string;
  tutorAdvice: string;
  modelUsed: string;
}

export type NavigationTab =
  | 'dashboard'
  | 'summary'
  | 'quiz'
  | 'challenge'
  | 'games'
  | 'profile'
  | 'admin'
  | 'about';

export type BlooketGameMode = 'gold_quest' | 'speed_rush' | 'flashcards';
export type EducationalGameMode = BlooketGameMode;

export type CompetitionPhase = 'upcoming' | 'active' | 'completed_recent' | 'archived';

export interface CompetitionPhaseDetail {
  phase: CompetitionPhase;
  remainingSeconds: number;
  totalDurationSeconds: number;
  targetTimestamp: number;
  endTimestamp: number;
  archiveTimestamp: number;
  resultsVisible: boolean;
  remainingVisibilitySeconds: number;
}

export interface CompetitionConfig {
  id: string;
  title: string;
  description: string;
  target_date: string; // ISO date string, e.g. "2026-11-25T10:00:00"
  duration_minutes: number;
  subject: string;
  question_ids: string[];
  is_active: boolean;
  reward_xp: number;
  created_at?: string;
  force_started?: boolean; // For admin instant opening / live sync
}

export interface CompetitionResult {
  id: string;
  user_name: string;
  session_id: string;
  avatar: string;
  region?: string;
  subject: string;
  score: number;
  total_questions: number;
  accuracy_percentage: number;
  time_spent_seconds: number;
  reward_xp: number;
  completed_at: string;
  rank?: number;
}

export interface CompetitionParticipant {
  id: string;
  user_name: string;
  session_id: string;
  avatar: string;
  region?: string;
  joined_at: string;
  status: 'ready' | 'in_progress' | 'completed';
}

export interface GoldQuestChest {
  id: number;
  type: 'gold' | 'multiplier' | 'shield';
  value: number;
  label: string;
  description: string;
}

