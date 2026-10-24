import React, { useState } from 'react';
import { X, Database, Check, Copy, ExternalLink, RefreshCw, Key, Shield } from 'lucide-react';
import { getSupabaseConfig, saveSupabaseConfig, isSupabaseConnected } from '../lib/supabase';

interface SupabaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfigChanged: () => void;
}

export const SupabaseModal: React.FC<SupabaseModalProps> = ({
  isOpen,
  onClose,
  onConfigChanged,
}) => {
  const currentConfig = getSupabaseConfig();
  const [url, setUrl] = useState(currentConfig.url);
  const [anonKey, setAnonKey] = useState(currentConfig.anonKey);
  const [copied, setCopied] = useState(false);
  const [saveMessage, setSaveMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const connected = isSupabaseConnected();

  const handleSave = () => {
    saveSupabaseConfig(url, anonKey);
    onConfigChanged();
    setSaveMessage("✅ Supabase parametrlari saqlandi! Baza bilan sinxronizatsiya faollashdi.");
    setTimeout(() => {
      setSaveMessage(null);
    }, 2500);
  };

  const copySqlSchema = () => {
    const sql = `-- ZUKKO AI SUPABASE SQL SCHEMA
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

CREATE TABLE IF NOT EXISTS public.test_questions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    subject TEXT NOT NULL,
    topic TEXT NOT NULL,
    question TEXT NOT NULL,
    options JSONB NOT NULL,
    correct_answer VARCHAR(1) NOT NULL,
    explanation_reference TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.user_profiles (
    session_id TEXT PRIMARY KEY,
    user_name TEXT NOT NULL,
    email TEXT,
    is_admin BOOLEAN DEFAULT false,
    completed_subjects JSONB DEFAULT '[]'::jsonb,
    total_tests_taken INTEGER DEFAULT 0,
    total_correct_answers INTEGER DEFAULT 0,
    accuracy_percentage NUMERIC(5,2) DEFAULT 0.00,
    topic_mastery JSONB DEFAULT '{}'::jsonb,
    last_active TIMESTAMPTZ DEFAULT timezone('utc'::text, now()) NOT NULL
);

CREATE TABLE IF NOT EXISTS public.challenge_sessions (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    session_id TEXT NOT NULL,
    user_name TEXT NOT NULL,
    subject TEXT NOT NULL,
    question_ids JSONB NOT NULL,
    user_answers JSONB DEFAULT '{}'::jsonb,
    total_duration_seconds INTEGER DEFAULT 7200 NOT NULL,
    remaining_seconds INTEGER DEFAULT 7200 NOT NULL,
    start_timestamp BIGINT NOT NULL,
    last_tick_timestamp BIGINT NOT NULL,
    status TEXT NOT NULL DEFAULT 'in_progress',
    score INTEGER DEFAULT 0,
    total_questions INTEGER DEFAULT 0,
    completed_at TIMESTAMPTZ
);`;

    navigator.clipboard.writeText(sql);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl max-w-xl w-full border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-slate-900 text-white p-5 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base">Supabase Ma'lumotlar Bazasi Integratsiyasi</h3>
              <p className="text-xs text-slate-400">
                book_knowledge, test_questions va sessiyalarni bulutli saqlash
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4 max-h-[80vh] overflow-y-auto">
          {/* Status banner */}
          <div
            className={`p-3.5 rounded-xl border flex items-center justify-between text-xs font-medium ${
              connected
                ? 'bg-emerald-50 border-emerald-200 text-emerald-800'
                : 'bg-amber-50 border-amber-200 text-amber-800'
            }`}
          >
            <div className="flex items-center gap-2">
              <span
                className={`w-2.5 h-2.5 rounded-full ${
                  connected ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
                }`}
              />
              <span>
                {connected
                  ? 'Supabase bulutli ma\'lumotlar bazasi faol ulangan'
                  : 'Lokal xotira (Offline/Browser Cache) rejimida ishlamoqda'}
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold">
              {connected ? 'ONLINE' : 'LOCAL'}
            </span>
          </div>

          {saveMessage && (
            <div className="p-3 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-lg text-xs font-semibold">
              {saveMessage}
            </div>
          )}

          <div className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Supabase Project URL
              </label>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://xyzcompany.supabase.co"
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Supabase Anon / Public Key
              </label>
              <input
                type="password"
                value={anonKey}
                onChange={(e) => setAnonKey(e.target.value)}
                placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                className="w-full px-3 py-2 text-xs font-mono border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex justify-end gap-2 pt-1">
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all"
              >
                <Check className="w-4 h-4" />
                Ulanishni Saqlash
              </button>
            </div>
          </div>

          {/* SQL Schema Section */}
          <div className="mt-4 pt-4 border-t border-slate-200">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                <Shield className="w-4 h-4 text-indigo-600" />
                Supabase SQL Schema Skripti
              </span>
              <button
                onClick={copySqlSchema}
                className="text-xs px-2.5 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-medium flex items-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Nusxalandi!' : 'SQLni Nusxalash'}
              </button>
            </div>
            <p className="text-[11px] text-slate-500 mb-2 leading-relaxed">
              Supabase SQL Editor oynasiga kirib ushbu skriptni ishga tushirsangiz, barcha jadvallar (<code>book_knowledge</code>, <code>test_questions</code>, <code>user_profiles</code>, <code>challenge_sessions</code>) bir zumda yaratiladi.
            </p>
            <div className="bg-slate-900 rounded-lg p-3 font-mono text-[10px] text-slate-300 max-h-36 overflow-y-auto">
              <code>
                CREATE TABLE book_knowledge (...);<br />
                CREATE TABLE test_questions (...);<br />
                CREATE TABLE user_profiles (...);<br />
                CREATE TABLE challenge_sessions (...);
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
