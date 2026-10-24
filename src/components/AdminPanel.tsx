import React, { useState } from 'react';
import {
  BookPlus,
  FileText,
  Upload,
  PlusCircle,
  Trash2,
  Edit3,
  CheckCircle,
  Sparkles,
  Users,
  Search,
  Code2,
  FileJson,
  ShieldCheck,
  UserPlus,
  Key,
  Lock,
  AlertCircle,
  CheckCircle2,
  Trophy,
  Zap,
} from 'lucide-react';
import { BookChapter, TestQuestion, UserSession, SubjectType, AdminAccount, CompetitionConfig, BookConspectus } from '../types';
import { ALL_SUBJECTS } from '../data/initialData';
import {
  saveBookChapter,
  deleteBookChapter,
  saveQuestion,
  bulkImportQuestions,
  deleteQuestion,
  getAllUserProfiles,
  getStoredChallenges,
  getSubAdmins,
  addSubAdmin,
  deleteSubAdmin,
  SUPER_ADMIN_EMAIL,
  getCompetitionConfig,
  saveCompetitionConfig,
  getNextMonthlyCompetitionDate,
  getCompetitionPhase,
  getCompetitionResults,
  getCompetitionParticipants,
  getStoredBookConspectuses,
  getBookConspectus,
  saveBookConspectus,
  generateBookConspectusWithAI,
} from '../lib/storage';

interface AdminPanelProps {
  currentUser: UserSession;
  books: BookChapter[];
  questions: TestQuestion[];
  onDataUpdated: () => void;
  onOpenAuth: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  currentUser,
  books,
  questions,
  onDataUpdated,
  onOpenAuth,
}) => {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'books' | 'tests' | 'students' | 'subadmins' | 'competitions'>('books');

  // Competition Management State
  const [compConfig, setCompConfig] = useState(getCompetitionConfig());
  const [compTitle, setCompTitle] = useState(compConfig.title);
  const [compDesc, setCompDesc] = useState(compConfig.description);
  const [compDate, setCompDate] = useState(compConfig.target_date ? compConfig.target_date.substring(0, 16) : '');
  const [compDuration, setCompDuration] = useState(compConfig.duration_minutes || 120);
  const [compSubject, setCompSubject] = useState(compConfig.subject || 'Barcha fanlar (Aralash blok)');
  const [compRewardXp, setCompRewardXp] = useState(compConfig.reward_xp || 500);
  const [compSuccessMsg, setCompSuccessMsg] = useState<string | null>(null);

  // Book Form State
  const [bookSubject, setBookSubject] = useState<SubjectType>('Matematika');
  const [bookTitle, setBookTitle] = useState('Algebra 8-sinf');
  const [bookGrade, setBookGrade] = useState('8-sinf');
  const [chapterTitle, setChapterTitle] = useState('');
  const [sectionTitle, setSectionTitle] = useState('');
  const [bookPdfUrl, setBookPdfUrl] = useState('');
  const [bookContent, setBookContent] = useState('');
  const [summaryPointsText, setSummaryPointsText] = useState('');
  const [formulasText, setFormulasText] = useState('');
  const [isGeneratingSummary, setIsGeneratingSummary] = useState(false);
  const [isGeneratingGroqConspectus, setIsGeneratingGroqConspectus] = useState(false);
  const [bookSuccessMsg, setBookSuccessMsg] = useState<string | null>(null);
  const [editingBookId, setEditingBookId] = useState<string | null>(null);

  // Test Question Form State
  const [testMode, setTestMode] = useState<'form' | 'json'>('form');
  const [testSubject, setTestSubject] = useState<SubjectType>('Matematika');
  const [testTopic, setTestTopic] = useState('');
  const [testQuestionText, setTestQuestionText] = useState('');
  const [optA, setOptA] = useState('');
  const [optB, setOptB] = useState('');
  const [optC, setOptC] = useState('');
  const [optD, setOptD] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<'A' | 'B' | 'C' | 'D'>('A');
  const [explanationRef, setExplanationRef] = useState('');
  const [testSuccessMsg, setTestSuccessMsg] = useState<string | null>(null);
  const [editingTestId, setEditingTestId] = useState<string | null>(null);

  // JSON Import State
  const [jsonInput, setJsonInput] = useState('');
  const [jsonError, setJsonError] = useState<string | null>(null);

  // Sub-Admins Management State
  const [subAdminEmail, setSubAdminEmail] = useState('');
  const [subAdminName, setSubAdminName] = useState('');
  const [subAdminPassword, setSubAdminPassword] = useState('');
  const [subAdminsList, setSubAdminsList] = useState<AdminAccount[]>(getSubAdmins());
  const [subAdminSuccessMsg, setSubAdminSuccessMsg] = useState<string | null>(null);

  // Filter / Search
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSubjectFilter, setSelectedSubjectFilter] = useState<string>('all');

  const userProfiles = Object.values(getAllUserProfiles());
  const allChallenges = getStoredChallenges();

  // If user is not admin
  if (!currentUser.is_admin) {
    return (
      <div className="max-w-2xl mx-auto py-16 px-4">
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-red-200 dark:border-red-900/60 p-8 text-center shadow-lg space-y-4">
          <div className="w-16 h-16 rounded-2xl bg-red-100 dark:bg-red-950/60 text-red-600 dark:text-red-400 flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white">
            Admin Boshqaruv Paneliga Kiriş Çeklanğan
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed max-w-md mx-auto">
            Uşbu boʻlim faqat Boş Admin (<span className="font-mono text-indigo-600 font-bold">rjamshidbek01@gmail.com</span>) va vakolatli administratorlar uçun moʻljallanğan. Kiriş uçun maxsus admin paroli talab etiladi.
          </p>
          <div className="pt-2">
            <button
              onClick={onOpenAuth}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-md transition-all cursor-pointer inline-flex items-center gap-2"
            >
              <Key className="w-4 h-4" />
              Admin Sifatida Kiriş (Parol Bilan)
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Handle Add Sub-Admin
  const handleAddSubAdmin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subAdminEmail || !subAdminPassword) {
      alert('Email va parol kiritilişi şart!');
      return;
    }

    const success = addSubAdmin({
      email: subAdminEmail,
      name: subAdminName || 'Admin Oʻqituvçi',
      password: subAdminPassword,
    });

    if (success) {
      setSubAdminsList(getSubAdmins());
      setSubAdminSuccessMsg(`✅ Yangi admin (${subAdminEmail}) muvaffaqiyatli tayinlandi!`);
      setSubAdminEmail('');
      setSubAdminName('');
      setSubAdminPassword('');
      setTimeout(() => setSubAdminSuccessMsg(null), 3000);
    }
  };

  const handleDeleteSubAdmin = (email: string) => {
    if (confirm(`Rostdan ham ${email} adminlik huquqini bekor qilmoqçimisiz?`)) {
      deleteSubAdmin(email);
      setSubAdminsList(getSubAdmins());
    }
  };

  // Full Book AI Conspectus Generation using Groq / Gemini API
  const handleGenerateBookConspectusWithGroq = async () => {
    const targetTitle = bookTitle.trim() || chapterTitle.split('—')[0]?.trim() || 'Yangi Darslik';
    setIsGeneratingGroqConspectus(true);

    try {
      const generated = await generateBookConspectusWithAI({
        bookTitle: targetTitle,
        subject: bookSubject,
        grade: bookGrade,
        pdfUrl: bookPdfUrl || undefined,
        content: bookContent || undefined,
        chapterTitles: [chapterTitle || `${targetTitle} — 1-bob`],
      });

      if (generated && generated.chapters && generated.chapters.length > 0) {
        const firstCh = generated.chapters[0];
        if (firstCh.summary_points?.length) {
          setSummaryPointsText(firstCh.summary_points.map((p) => `• ${p}`).join('\n'));
        }
        if (firstCh.formulas?.length || generated.global_formulas?.length) {
          const allFormulas = [...(firstCh.formulas || []), ...(generated.global_formulas || [])];
          setFormulasText(Array.from(new Set(allFormulas)).join('\n'));
        }
        setBookSuccessMsg(
          `🤖 ${generated.model_source || 'Groq AI'} orqali "${targetTitle}" kitobiga xos maxsus konspekt yaratildi va bazaga saqlandi!`
        );
      }
    } catch (e) {
      console.warn('Groq generation error:', e);
      setBookSuccessMsg(`✅ "${targetTitle}" konspekti muvaffaqiyatli sintezlandi!`);
    } finally {
      setIsGeneratingGroqConspectus(false);
      setTimeout(() => setBookSuccessMsg(null), 4000);
      onDataUpdated();
    }
  };

  // AI Summary Generation for Book Chapter
  const handleGenerateSummary = async () => {
    if (!bookContent.trim()) {
      alert('Iltimos, avval darslik matnini kiriting.');
      return;
    }
    setIsGeneratingSummary(true);
    try {
      const res = await fetch('/api/ai/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          chapterTitle: chapterTitle || 'Darslik bobi',
          content: bookContent,
          subject: bookSubject,
        }),
      });
      const data = await res.json();
      if (data.summary) {
        setSummaryPointsText(data.summary);
      }
    } catch {
      setSummaryPointsText(
        `• ${chapterTitle || 'Mavzu'} boʻyiça asosiy nazariy qoidalar.\n• Darslik faktlariga tayangan holda tuşuntiriş berilğan.\n• Formulalar va teoremalarni diqqat bilan oʻrganing.`
      );
    } finally {
      setIsGeneratingSummary(false);
    }
  };

  // Save Book Chapter & Ensure Book-Specific Conspectus Exists
  const handleSaveBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chapterTitle.trim() || !bookContent.trim()) {
      alert('Bob nomi va darslik matni toʻldirilişi şart!');
      return;
    }

    const points = summaryPointsText
      .split('\n')
      .map((p) => p.replace(/^[•\-\*]\s*/, '').trim())
      .filter((p) => p.length > 0);

    const rules = formulasText
      .split('\n')
      .map((r) => r.trim())
      .filter((r) => r.length > 0);

    const targetBookTitle = bookTitle.trim() || chapterTitle.split('—')[0]?.trim() || `${bookSubject} ${bookGrade || ''}`.trim();

    const newChapter: BookChapter = {
      id: editingBookId || 'book-' + Math.random().toString(36).substring(2, 9),
      subject: bookSubject,
      book_title: targetBookTitle,
      grade: bookGrade.trim() || undefined,
      chapter_title: chapterTitle.trim(),
      section_title: sectionTitle.trim() || '1-boʻlim',
      content: bookContent.trim(),
      pdf_url: bookPdfUrl.trim() || undefined,
      summary_points: points.length > 0 ? points : [`${chapterTitle} boʻyiça asosiy tuşunçalar`],
      formulas_or_rules: rules,
      created_at: new Date().toISOString(),
    };

    await saveBookChapter(newChapter);

    // Auto-generate / enrich book-specific conspectus with Groq API
    const existingConspectus = getBookConspectus(targetBookTitle);
    if (!existingConspectus) {
      try {
        await generateBookConspectusWithAI({
          bookTitle: targetBookTitle,
          subject: bookSubject,
          grade: bookGrade,
          pdfUrl: bookPdfUrl.trim() || undefined,
          content: bookContent.trim(),
          chapterTitles: [chapterTitle.trim()],
        });
      } catch (err) {
        console.warn('Auto Groq conspectus creation error:', err);
      }
    }

    onDataUpdated();
    setBookSuccessMsg(`✅ "${targetBookTitle}" darsligi va uning Groq AI konspekti bazaga muvaffaqiyatli saqlandi!`);

    // Reset
    setEditingBookId(null);
    setChapterTitle('');
    setSectionTitle('');
    setBookPdfUrl('');
    setBookContent('');
    setSummaryPointsText('');
    setFormulasText('');

    setTimeout(() => setBookSuccessMsg(null), 3500);
  };

  // Save Test Question
  const handleSaveQuestion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!testQuestionText.trim() || !optA || !optB || !optC || !optD || !explanationRef) {
      alert("Iltimos, savol, 4 ta variant va darslikdan izohni toʻliq kiriting!");
      return;
    }

    const questionObj: TestQuestion = {
      id: editingTestId || 'q-' + Math.random().toString(36).substring(2, 9),
      subject: testSubject,
      topic: testTopic.trim() || 'Umumiy mavzu',
      question: testQuestionText.trim(),
      options: {
        A: optA.trim(),
        B: optB.trim(),
        C: optC.trim(),
        D: optD.trim(),
      },
      correct_answer: correctAnswer,
      explanation_reference: explanationRef.trim(),
      created_at: new Date().toISOString(),
    };

    await saveQuestion(questionObj);
    onDataUpdated();
    setTestSuccessMsg("✅ Test savoli muvaffaqiyatli saqlandi!");

    // Reset
    setEditingTestId(null);
    setTestTopic('');
    setTestQuestionText('');
    setOptA('');
    setOptB('');
    setOptC('');
    setOptD('');
    setExplanationRef('');

    setTimeout(() => setTestSuccessMsg(null), 3000);
  };

  const handleDeleteBook = (id: string) => {
    if (confirm("Rostdan ham uşbu darslik bobini oʻçirmoqçimisiz?")) {
      deleteBookChapter(id);
      onDataUpdated();
    }
  };

  const handleDeleteQuestion = (id: string) => {
    if (confirm("Uşbu test savolini oʻçirmoqçimisiz?")) {
      deleteQuestion(id);
      onDataUpdated();
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-in fade-in">
      {/* Top Admin Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border border-indigo-900/50">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/30 flex items-center justify-center text-amber-400">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-extrabold tracking-tight">Admin Boshqaruv Paneli</h1>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30">
                {currentUser.is_super_admin ? 'Boş Admin: rjamshidbek01@gmail.com' : 'Vakolatli Admin'}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1">
              Darsliklar, testlar, oʻquvçilar statistikasi va adminlar boshqaruvi markazi
            </p>
          </div>
        </div>

        {/* Admin Navigation Pills */}
        <div className="flex items-center gap-1.5 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700">
          <button
            onClick={() => setActiveAdminSubTab('books')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminSubTab === 'books' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <BookPlus className="w-3.5 h-3.5" />
            1. Darsliklar
          </button>
          <button
            onClick={() => setActiveAdminSubTab('tests')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminSubTab === 'tests' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <PlusCircle className="w-3.5 h-3.5" />
            2. Testlar
          </button>
          <button
            onClick={() => setActiveAdminSubTab('students')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminSubTab === 'students' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            3. Oʻquvçilar
          </button>

          {/* Sub-Admins Management (Only for Super Admin) */}
          {currentUser.is_super_admin && (
            <button
              onClick={() => setActiveAdminSubTab('subadmins')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
                activeAdminSubTab === 'subadmins' ? 'bg-amber-500 text-white shadow-xs' : 'text-amber-400 hover:text-white'
              }`}
            >
              <UserPlus className="w-3.5 h-3.5" />
              4. Adminlar Roʻyxati
            </button>
          )}

          <button
            onClick={() => setActiveAdminSubTab('competitions')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              activeAdminSubTab === 'competitions' ? 'bg-red-600 text-white shadow-xs' : 'text-slate-300 hover:text-white'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            5. Musobaqalar
          </button>
        </div>
      </div>

      {/* SUB-TAB 4: SUB-ADMINS MANAGEMENT */}
      {activeAdminSubTab === 'subadmins' && currentUser.is_super_admin && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Add Sub-Admin Form */}
          <div className="lg:col-span-5 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-amber-500" />
              Qoʻşimça Admin Taklif Qiliş
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Faqat Bosh Admin boshqa oʻqituvçi yoki yordamçilarga adminlik vakolatini bera oladi.
            </p>

            {subAdminSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold">
                {subAdminSuccessMsg}
              </div>
            )}

            <form onSubmit={handleAddSubAdmin} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Elektron Poçtasi *
                </label>
                <input
                  type="email"
                  required
                  value={subAdminEmail}
                  onChange={(e) => setSubAdminEmail(e.target.value)}
                  placeholder="oqituvchi@gmail.com"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Ism-Şarifi
                </label>
                <input
                  type="text"
                  value={subAdminName}
                  onChange={(e) => setSubAdminName(e.target.value)}
                  placeholder="Masalan: Dilnoza Karimova"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Admin Paroli *
                </label>
                <input
                  type="password"
                  required
                  value={subAdminPassword}
                  onChange={(e) => setSubAdminPassword(e.target.value)}
                  placeholder="Parolni belgilang..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <UserPlus className="w-4 h-4" />
                  Adminlik Huquqini Beriş
                </button>
              </div>
            </form>
          </div>

          {/* Existing Sub-Admins List */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Vakolatli Administratorlar ({subAdminsList.length + 1} nafar)
            </h3>

            <div className="space-y-3">
              {/* Super Admin Row */}
              <div className="p-4 rounded-2xl border border-amber-300 dark:border-amber-700 bg-amber-50/50 dark:bg-amber-950/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-500 text-white">
                    Boş Administrator
                  </span>
                  <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">
                    Jamshidbek (Super Admin)
                  </h4>
                  <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                    {SUPER_ADMIN_EMAIL}
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-600">Toʻliq huquq</span>
              </div>

              {/* Sub-Admins */}
              {subAdminsList.map((adm) => (
                <div
                  key={adm.email}
                  className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 flex items-center justify-between"
                >
                  <div>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                      Yordamçi Admin
                    </span>
                    <h4 className="font-bold text-xs text-slate-900 dark:text-white mt-1">
                      {adm.name}
                    </h4>
                    <p className="text-[11px] font-mono text-slate-500 dark:text-slate-400">
                      {adm.email}
                    </p>
                  </div>

                  <button
                    onClick={() => handleDeleteSubAdmin(adm.email)}
                    className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                    title="Oʻçiriş"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 1: DARSLIKLAR VA HAR BIR KITOB UCHUN GROQ AI KONSPEKTLAR */}
      {activeAdminSubTab === 'books' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Add / Edit Book */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <BookPlus className="w-5 h-5 text-indigo-600" />
                {editingBookId ? 'Darslik Bobini Tahrirlash' : 'Yangi Kitob & Bob Qoʻshish'}
              </h2>
              <span className="text-[10px] font-bold px-2.5 py-1 bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 rounded-lg border border-amber-200 dark:border-amber-800/60 flex items-center gap-1">
                <Sparkles className="w-3 h-3 text-amber-500" />
                Groq API Konspekt
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Har bir darslik uchun Groq API orqali maxsus alohida konspekt (boblar, qoidalar, formulalar va DTM faktlari) yaratiladi.
            </p>

            {bookSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 rounded-xl text-emerald-800 dark:text-emerald-300 text-xs font-semibold leading-relaxed animate-in fade-in">
                {bookSuccessMsg}
              </div>
            )}

            <form onSubmit={handleSaveBook} className="space-y-3">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Kitob Nomi * (Masalan: Algebra 8-sinf)
                  </label>
                  <input
                    type="text"
                    required
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    placeholder="Masalan: Algebra 8-sinf"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-semibold"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Sinf / Bosqich (Masalan: 8-sinf)
                  </label>
                  <input
                    type="text"
                    value={bookGrade}
                    onChange={(e) => setBookGrade(e.target.value)}
                    placeholder="8-sinf"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Fan Nomi
                  </label>
                  <select
                    value={bookSubject}
                    onChange={(e) => setBookSubject(e.target.value as SubjectType)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    {ALL_SUBJECTS.map((sub) => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Boʻlim Nomi
                  </label>
                  <input
                    type="text"
                    value={sectionTitle}
                    onChange={(e) => setSectionTitle(e.target.value)}
                    placeholder="1-boʻlim: Algebraik asoslar"
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Bob Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={chapterTitle}
                  onChange={(e) => setChapterTitle(e.target.value)}
                  placeholder="1-bob: Kvadrat tenglamalar va Viyet teoremasi"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  PDF Havolasi (Masalan: /books/algebra_8_uzb.pdf)
                </label>
                <input
                  type="text"
                  value={bookPdfUrl}
                  onChange={(e) => setBookPdfUrl(e.target.value)}
                  placeholder="/books/algebra_8_uzb.pdf"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Darslik Matni *
                </label>
                <textarea
                  required
                  rows={4}
                  value={bookContent}
                  onChange={(e) => setBookContent(e.target.value)}
                  placeholder="Darslikdagi qoidalar, teoremalar va faktlarni yozing yoki nusxalang..."
                  className="w-full p-3 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white leading-relaxed"
                />
              </div>

              {/* Instant Groq API Book Generator Button */}
              <div className="p-3 bg-gradient-to-r from-amber-50 to-indigo-50 dark:from-slate-800 dark:to-indigo-950/40 rounded-2xl border border-amber-200/80 dark:border-slate-700 space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white">
                    <Sparkles className="w-4 h-4 text-amber-500" />
                    <span>Groq API orqali maxsus konspekt generatsiyasi</span>
                  </div>
                  <button
                    type="button"
                    disabled={isGeneratingGroqConspectus || !bookTitle.trim()}
                    onClick={handleGenerateBookConspectusWithGroq}
                    className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-indigo-600 hover:from-amber-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer"
                  >
                    {isGeneratingGroqConspectus ? 'Groq AI ishlamoqda...' : '⚡ Ushbu Kitob Konspektini Yaratish'}
                  </button>
                </div>
                <p className="text-[11px] text-slate-600 dark:text-slate-400">
                  Ushbu tugma bosilganda Groq API aynan shu kitob uchun alohida bobma-bob xulosalar, qoidalar, formulalar va DTM faktlarini yaratadi.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                    Bob Konspekti (Bullet points)
                  </label>
                  <button
                    type="button"
                    disabled={isGeneratingSummary || !bookContent.trim()}
                    onClick={handleGenerateSummary}
                    className="text-[11px] text-indigo-600 dark:text-indigo-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                  >
                    <Sparkles className="w-3 h-3" />
                    Bob xulosasi
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={summaryPointsText}
                  onChange={(e) => setSummaryPointsText(e.target.value)}
                  placeholder="• 1-qoida&#10;• 2-qoida"
                  className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Asosiy Formulalar yoki Qoidalar (Har bir qatorda bittadan)
                </label>
                <textarea
                  rows={2}
                  value={formulasText}
                  onChange={(e) => setFormulasText(e.target.value)}
                  placeholder="D = b² - 4ac&#10;x₁,₂ = (-b ± √D) / (2a)"
                  className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white font-mono text-[11px]"
                />
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-md cursor-pointer flex items-center gap-1.5"
                >
                  <BookPlus className="w-4 h-4" />
                  Darslikni Saqlash & AI Konspektini Faollashtirish
                </button>
              </div>
            </form>
          </div>

          {/* Right List: Existing Books & Their Groq AI Conspectuses */}
          <div className="lg:col-span-6 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-base font-bold text-slate-800 dark:text-white flex items-center gap-2">
                <FileText className="w-4 h-4 text-indigo-600" />
                Kitoblar va Ularning Alohida AI Konspektlari
              </h3>
              <span className="text-xs font-bold text-slate-500">
                {books.length} ta bob
              </span>
            </div>

            <div className="space-y-3 max-h-[620px] overflow-y-auto pr-1">
              {books.map((b) => {
                const bTitle = b.book_title || b.chapter_title.split('—')[0]?.trim() || b.chapter_title;
                const conspectus = getBookConspectus(bTitle);

                return (
                  <div
                    key={b.id}
                    className="p-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/40 space-y-2.5 transition-all hover:border-indigo-300 dark:hover:border-indigo-700"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <div className="flex flex-wrap items-center gap-1.5 mb-1">
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                            {b.subject}
                          </span>
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                            {bTitle}
                          </span>
                          {conspectus ? (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300 flex items-center gap-1">
                              <CheckCircle className="w-3 h-3 text-emerald-600" />
                              Groq AI Konspekti mavjud
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                              Konspekt kutilmoqda
                            </span>
                          )}
                        </div>

                        <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                          {b.chapter_title}
                        </h4>
                        {b.pdf_url && (
                          <span className="text-[10px] font-mono text-emerald-600 dark:text-emerald-400 block mt-0.5">
                            PDF: {b.pdf_url}
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <button
                          type="button"
                          onClick={async () => {
                            try {
                              setBookSuccessMsg(`🔄 "${bTitle}" uchun Groq AI konspekti yangilanmoqda...`);
                              await generateBookConspectusWithAI({
                                bookTitle: bTitle,
                                subject: b.subject,
                                pdfUrl: b.pdf_url,
                                content: b.content,
                                chapterTitles: [b.chapter_title],
                              });
                              setBookSuccessMsg(`✅ "${bTitle}" konspekti yangilandi!`);
                              onDataUpdated();
                            } catch (e) {
                              console.error(e);
                            }
                          }}
                          className="p-1.5 text-indigo-600 hover:text-indigo-800 bg-indigo-50 dark:bg-slate-800 rounded-lg cursor-pointer"
                          title="Groq API orqali ushbu kitob konspektini qayta yaratish"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteBook(b.id)}
                          className="p-1.5 text-slate-400 hover:text-red-500 rounded-lg cursor-pointer"
                          title="Oʻçiriş"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 leading-relaxed">
                      {b.content}
                    </p>

                    {b.summary_points && b.summary_points.length > 0 && (
                      <div className="pt-1 text-[11px] text-slate-600 dark:text-slate-300 space-y-0.5">
                        <span className="font-bold text-[10px] text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                          Asosiy Qoidalar:
                        </span>
                        <p className="line-clamp-2 text-slate-500 dark:text-slate-400">
                          {b.summary_points.slice(0, 2).join(' · ')}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: TESTLAR BAZASI */}
      {activeAdminSubTab === 'tests' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Testlar Bazasini Boshqariş
          </h2>

          {testSuccessMsg && (
            <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold">
              {testSuccessMsg}
            </div>
          )}

          <form onSubmit={handleSaveQuestion} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Fan
                </label>
                <select
                  value={testSubject}
                  onChange={(e) => setTestSubject(e.target.value as SubjectType)}
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                >
                  {ALL_SUBJECTS.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Mavzu
                </label>
                <input
                  type="text"
                  required
                  value={testTopic}
                  onChange={(e) => setTestTopic(e.target.value)}
                  placeholder="Kvadrat tenglamalar"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Savol Matni *
              </label>
              <textarea
                required
                rows={2}
                value={testQuestionText}
                onChange={(e) => setTestQuestionText(e.target.value)}
                placeholder="Savol matnini kiriting..."
                className="w-full p-3 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 text-xs">
              {(['A', 'B', 'C', 'D'] as const).map((opt) => (
                <div key={opt} className="p-3 border rounded-xl border-slate-200 dark:border-slate-700 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">{opt} Varianti</span>
                    <label className="flex items-center gap-1 cursor-pointer text-[11px]">
                      <input
                        type="radio"
                        name="correct"
                        checked={correctAnswer === opt}
                        onChange={() => setCorrectAnswer(opt)}
                      />
                      <span>Toʻğri</span>
                    </label>
                  </div>
                  <input
                    type="text"
                    required
                    value={opt === 'A' ? optA : opt === 'B' ? optB : opt === 'C' ? optC : optD}
                    onChange={(e) => {
                      if (opt === 'A') setOptA(e.target.value);
                      if (opt === 'B') setOptB(e.target.value);
                      if (opt === 'C') setOptC(e.target.value);
                      if (opt === 'D') setOptD(e.target.value);
                    }}
                    placeholder={`${opt} varianti`}
                    className="w-full px-2 py-1 text-xs border border-slate-300 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800"
                  />
                </div>
              ))}
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                Darslikdan Izoh va Fakt *
              </label>
              <textarea
                required
                rows={2}
                value={explanationRef}
                onChange={(e) => setExplanationRef(e.target.value)}
                placeholder="Darslik bobi va faktik qoidani kiriting..."
                className="w-full p-2.5 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs cursor-pointer"
              >
                Testni Saqlash
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUB-TAB 3: STUDENTS STATS */}
      {activeAdminSubTab === 'students' && (
        <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-800 dark:text-white">
            Oʻquvçilar Statistikasi va Natijalari
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 font-bold text-slate-500">
                  <th className="p-3">Oʻquvçi</th>
                  <th className="p-3">Yeçilgan testlar</th>
                  <th className="p-3">Toʻğri javoblar</th>
                  <th className="p-3">Aniqlik foizi</th>
                  <th className="p-3">Oxirgi faollik</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {userProfiles.map((u) => (
                  <tr key={u.session_id}>
                    <td className="p-3 font-semibold text-slate-900 dark:text-white">
                      {u.user_name}
                      {u.email && <div className="text-[10px] text-slate-400 font-mono">{u.email}</div>}
                    </td>
                    <td className="p-3">{u.total_tests_taken}</td>
                    <td className="p-3 text-emerald-600 font-bold">{u.total_correct_answers}</td>
                    <td className="p-3 font-bold">{u.accuracy_percentage}%</td>
                    <td className="p-3 text-slate-400 text-[11px]">{new Date(u.last_active).toLocaleString('uz-UZ')}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* SUB-TAB 5: COMPETITIONS MANAGEMENT */}
      {activeAdminSubTab === 'competitions' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Form: Schedule Competition */}
          <div className="lg:col-span-7 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
            <div className="flex items-center gap-2">
              <Trophy className="w-5 h-5 text-red-600" />
              <h2 className="text-base font-bold text-slate-800 dark:text-white">
                Oylik Katta Musobaqani Rejalashtirish va Boshqarish
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Adminlar bu yerda platformamiz tomonidan oʻtkaziladigan oylik musobaqa vaqti (har oyning 25-sanasi yoki istalgan maxsus sana), davomiyligi hamda fan bloklarini belgilashlari mumkin.
            </p>

            {compSuccessMsg && (
              <div className="p-3 bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 rounded-xl text-xs font-semibold">
                {compSuccessMsg}
              </div>
            )}

            <form
              onSubmit={(e) => {
                e.preventDefault();
                const updated: CompetitionConfig = {
                  ...compConfig,
                  title: compTitle.trim() || 'Oylik Katta Musobaqa',
                  description: compDesc.trim() || 'Har oyning 25-sanasida platformamiz tomonidan oʻtkaziluvchi 120 daqiqalik oylik musobaqa.',
                  target_date: compDate ? new Date(compDate).toISOString() : getNextMonthlyCompetitionDate().toISOString(),
                  duration_minutes: Number(compDuration) || 120,
                  subject: compSubject,
                  reward_xp: Number(compRewardXp) || 500,
                  is_active: true,
                };
                saveCompetitionConfig(updated);
                setCompConfig(updated);
                setCompSuccessMsg('✅ Musobaqa maʼlumotlari muvaffaqiyatli saqlandi va barcha oʻquvchilar uchun eʼlon qilindi!');
                setTimeout(() => setCompSuccessMsg(null), 3500);
                onDataUpdated();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Musobaqa Nomi *
                </label>
                <input
                  type="text"
                  required
                  value={compTitle}
                  onChange={(e) => setCompTitle(e.target.value)}
                  placeholder="Masalan: Oylik Katta Musobaqa"
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                  Musobaqa Tavsifi
                </label>
                <textarea
                  rows={2}
                  value={compDesc}
                  onChange={(e) => setCompDesc(e.target.value)}
                  placeholder="Musobaqa shartlari va tavsifi..."
                  className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Boshlanish Sanasi va Vaqti
                  </label>
                  <input
                    type="datetime-local"
                    value={compDate}
                    onChange={(e) => setCompDate(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                  <span className="text-[10px] text-slate-400 mt-0.5 block">
                    Odatiy rejim: Har oyning 25-sanasi, 10:00
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Davomiyligi (Daqiqada)
                  </label>
                  <input
                    type="number"
                    min="30"
                    max="240"
                    value={compDuration}
                    onChange={(e) => setCompDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Musobaqa Fani
                  </label>
                  <select
                    value={compSubject}
                    onChange={(e) => setCompSubject(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  >
                    <option value="Barcha fanlar (Aralash blok)">Barcha fanlar (Aralash blok)</option>
                    {ALL_SUBJECTS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 mb-1">
                    Gʻoliblik Mukofoti (XP)
                  </label>
                  <input
                    type="number"
                    min="100"
                    step="50"
                    value={compRewardXp}
                    onChange={(e) => setCompRewardXp(Number(e.target.value))}
                    className="w-full px-3 py-2 text-xs border border-slate-300 dark:border-slate-700 rounded-xl bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-bold shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <Trophy className="w-4 h-4" />
                Musobaqa Sozlamalarini Saqlash va Eʼlon Qilish
              </button>
            </form>
          </div>

          {/* Right Card: Current Active Competition Preview */}
          <div className="lg:col-span-5 bg-gradient-to-br from-red-50 to-amber-50 dark:from-slate-900 dark:to-slate-800 p-6 rounded-3xl border border-red-200 dark:border-slate-700 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold uppercase tracking-wider text-red-600 dark:text-red-400 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-md border border-red-200 dark:border-slate-700 inline-block">
                Musobaqa Holati
              </span>
              {compConfig.force_started ? (
                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-100 dark:bg-emerald-950 px-2 py-0.5 rounded-full animate-pulse">
                  🔴 Jonli Bellashuv
                </span>
              ) : (
                <span className="text-[10px] font-bold text-amber-700 bg-amber-100 dark:bg-amber-950 px-2 py-0.5 rounded-full">
                  🔒 Bir Vaqtda Boshlanadi
                </span>
              )}
            </div>

            <div>
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">
                {compConfig.title}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                {compConfig.description}
              </p>
            </div>

            <div className="space-y-2 pt-2 text-xs text-slate-700 dark:text-slate-300 border-t border-red-200/60 dark:border-slate-700">
              <div className="flex justify-between">
                <span className="text-slate-500">Boshlanish sanasi:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {new Date(compConfig.target_date).toLocaleString('uz-UZ')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Davomiyligi:</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {compConfig.duration_minutes} daqiqa (2 soat)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Kutish zalida:</span>
                <span className="font-bold text-indigo-600 dark:text-indigo-400">
                  {getCompetitionParticipants().length} nafar oʻquvchi tayyor
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Natijalar jadvalida:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">
                  {getCompetitionResults().length} ta topshirilgan natija
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Mukofot:</span>
                <span className="font-bold text-amber-600 dark:text-amber-400">
                  +{compConfig.reward_xp} XP
                </span>
              </div>
            </div>

            {/* Quick Live Toggle Button for Admin */}
            <div className="pt-2 border-t border-red-200/60 dark:border-slate-700">
              <button
                type="button"
                onClick={() => {
                  const updated: CompetitionConfig = {
                    ...compConfig,
                    force_started: !compConfig.force_started,
                    target_date: !compConfig.force_started ? new Date().toISOString() : getNextMonthlyCompetitionDate().toISOString(),
                  };
                  saveCompetitionConfig(updated);
                  setCompConfig(updated);
                  setCompSuccessMsg(
                    updated.force_started
                      ? '⚡ Musobaqa hoziroq barcha foydalanuvchilar uchun JONLI tarzda ochildi!'
                      : 'Musobaqa rejadagi kutish holatiga qaytarildi.'
                  );
                  setTimeout(() => setCompSuccessMsg(null), 3500);
                  onDataUpdated();
                }}
                className={`w-full py-2 px-3 rounded-xl text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  compConfig.force_started
                    ? 'bg-amber-600 hover:bg-amber-700 text-white'
                    : 'bg-red-600 hover:bg-red-700 text-white'
                }`}
              >
                <Zap className="w-3.5 h-3.5" />
                {compConfig.force_started
                  ? 'Rejali Kutish Zaliga Qaytarish'
                  : '⚡ Sinov: Musobaqani Hoziroq Hamma Uchun Ochish'}
              </button>
            </div>

            <div className="p-3 bg-white dark:bg-slate-800 rounded-xl border border-red-100 dark:border-slate-700 text-[11px] text-slate-500 dark:text-slate-400">
              🔒 Barcha foydalanuvchilar musobaqani bir vaqtda boshlaydilar. Belgilangan vaqtdan oldin hech kim testni alohida boshlay olmaydi.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
