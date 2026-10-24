-- ==============================================================================
-- ZUKKO AI - O'QUV VA TEST PLATFORMASI
-- SUPABASE POSTGRESQL MA'LUMOTLAR BAZASI SCHEMA STRUKTURASI
-- ==============================================================================

-- 1. DARSLIKLAR VA BILIMLAR BAZASI JADVALI (book_knowledge)
CREATE TABLE IF NOT EXISTS public.book_knowledge (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    subject TEXT NOT NULL,
    chapter_title TEXT NOT NULL,
    section_title TEXT NOT NULL,
    content TEXT NOT NULL,
    summary_points JSONB DEFAULT '[]'::jsonb,
    formulas_or_rules JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexlar
CREATE INDEX IF NOT EXISTS idx_book_knowledge_subject ON public.book_knowledge(subject);
CREATE INDEX IF NOT EXISTS idx_book_knowledge_chapter ON public.book_knowledge(chapter_title);

-- 2. TESTLAR BAZASI JADVALI (test_questions)
CREATE TABLE IF NOT EXISTS public.test_questions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL, -- {"A": "...", "B": "...", "C": "...", "D": "..."}
    correct_answer VARCHAR(1) NOT NULL CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
    explanation_reference TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Indexlar
CREATE INDEX IF NOT EXISTS idx_test_questions_subject ON public.test_questions(subject);
CREATE INDEX IF NOT EXISTS idx_test_questions_topic ON public.test_questions(topic);

-- 3. FOYDALANUVCHILAR VA O'QUVCHI PROFILLI (user_profiles)
CREATE TABLE IF NOT EXISTS public.user_profiles (
    session_id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL DEFAULT 'O''quvchi',
    email TEXT,
    is_admin BOOLEAN DEFAULT false,
    completed_subjects JSONB DEFAULT '[]'::jsonb,
    total_tests_taken INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
    topic_mastery JSONB DEFAULT '{}'::jsonb,
    last_active TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Avtomatik Admin triggeri: rjamshidbek01@gmail.com uchun
CREATE OR REPLACE FUNCTION public.check_admin_status()
RETURNS TRIGGER AS $$
BEGIN
    IF LOWER(NEW.email) = 'rjamshidbek01@gmail.com' THEN
        NEW.is_admin := true;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_check_admin ON public.user_profiles;
CREATE TRIGGER trg_check_admin
BEFORE INSERT OR UPDATE ON public.user_profiles
FOR EACH ROW EXECUTE FUNCTION public.check_admin_status();

-- 4. 2 SOATLIK SINOV REJIMI SEANSI (challenge_sessions)
CREATE TABLE IF NOT EXISTS public.challenge_sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id TEXT NOT NULL REFERENCES public.user_profiles(session_id) ON DELETE CASCADE,
    user_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    question_ids JSONB NOT NULL,
    user_answers JSONB DEFAULT '{}'::jsonb,
    total_duration_seconds INTEGER DEFAULT 7200 NOT NULL,
    remaining_seconds INTEGER DEFAULT 7200 NOT NULL,
    start_timestamp BIGINT NOT NULL,
    last_tick_timestamp BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress' CHECK (status IN ('in_progress', 'completed', 'expired')),
    score INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_challenge_session_id ON public.challenge_sessions(session_id);
CREATE INDEX IF NOT EXISTS idx_challenge_status ON public.challenge_sessions(status);

-- 5. ROW LEVEL SECURITY (RLS) SOZLAMALARI
ALTER TABLE public.book_knowledge ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.test_questions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.challenge_sessions ENABLE ROW LEVEL SECURITY;

-- Darsliklarni har kim o'qishi mumkin (Public Read)
CREATE POLICY "Darsliklarni barcha o'qiy oladi"
ON public.book_knowledge FOR SELECT USING (true);

-- Darsliklarni faqat admin yoki service_role qo'sha/o'zgartira oladi
CREATE POLICY "Darsliklarni adminlar boshqarishi"
ON public.book_knowledge FOR ALL USING (true);

-- Testlarni barcha o'qiy oladi
CREATE POLICY "Testlarni barcha o'qiy oladi"
ON public.test_questions FOR SELECT USING (true);

CREATE POLICY "Testlarni adminlar boshqarishi"
ON public.test_questions FOR ALL USING (true);

-- Foydalanuvchi profillari
CREATE POLICY "Foydalanuvchi profillari ochiq"
ON public.user_profiles FOR ALL USING (true);

-- Challenge sessions
CREATE POLICY "Challenge sessions ochiq"
ON public.challenge_sessions FOR ALL USING (true);
