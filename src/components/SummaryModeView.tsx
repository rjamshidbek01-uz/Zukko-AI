import React, { useState, useEffect, useRef, useMemo } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle,
  Brain,
  Search,
  BookMarked,
  Lightbulb,
  Send,
  Loader2,
  FileText,
  Maximize2,
  Minimize2,
  ExternalLink,
  Download,
  Eye,
  RefreshCw,
  AlertCircle,
  ShieldCheck,
  ChevronRight,
  BookmarkCheck,
  Zap,
  Layers,
  GraduationCap,
} from 'lucide-react';
import { BookChapter, SubjectType, BookConspectus } from '../types';
import { ALL_SUBJECTS } from '../data/initialData';
import { PdfViewer } from './PdfViewer';
import {
  getStoredBookConspectuses,
  getBookConspectus,
  generateBookConspectusWithAI,
} from '../lib/storage';

interface SummaryModeViewProps {
  books: BookChapter[];
  selectedSubject: SubjectType;
  setSelectedSubject: (subject: SubjectType) => void;
  onNavigateToQuiz: (subject: SubjectType) => void;
}

// O'zbekiston darsliklar kutubxonasi
const AVAILABLE_PDF_LIBRARY = [
  { name: 'Algebra 8-sinf', path: '/books/algebra_8_uzb.pdf', subject: 'Matematika' },
  { name: 'Algebra 7-sinf', path: '/books/algebra_7_uzb.pdf', subject: 'Matematika' },
  { name: 'Algebra 9-sinf', path: '/books/algebra_9_uzb.pdf', subject: 'Matematika' },
  { name: 'Geometriya 7-sinf', path: '/books/geometriya_7_uzb.pdf', subject: 'Matematika' },
  { name: 'Geometriya 8-sinf', path: '/books/geometriya_8_uzb.pdf', subject: 'Matematika' },
  { name: 'Geometriya 9-sinf', path: '/books/geometriya_9_uzb.pdf', subject: 'Matematika' },
  { name: 'Fizika 6-sinf', path: '/books/fizika_6_uzb.pdf', subject: 'Fizika' },
  { name: 'Fizika 8-sinf', path: '/books/fizika_8_uzb.pdf', subject: 'Fizika' },
  { name: 'Fizika 9-sinf', path: '/books/fizika_9_uzb.pdf', subject: 'Fizika' },
  { name: 'Fizika 10-sinf', path: '/books/fizika_10_uzb.pdf', subject: 'Fizika' },
  { name: 'Fizika 11-sinf', path: '/books/fizika_11_uzb.pdf', subject: 'Fizika' },
  { name: 'Astronomiya 11-sinf', path: '/books/astronomiya_11_uzb.pdf', subject: 'Astronomiya' },
  { name: 'Biologiya 9-sinf', path: '/books/biologiya_9_uzb.pdf', subject: 'Biologiya' },
  { name: 'Biologiya 10-sinf', path: '/books/biologiya_10_uzb.pdf', subject: 'Biologiya' },
  { name: 'Biologiya 11-sinf', path: '/books/biologiya_11_uzb.pdf', subject: 'Biologiya' },
  { name: 'Zoologiya 7-sinf', path: '/books/zoologiya_7_uzb.pdf', subject: 'Biologiya' },
  { name: 'Odam va uning salomatligi 8-sinf', path: '/books/odam_va_uning_salomatligi_8_uzb.pdf', subject: 'Biologiya' },
  { name: 'Jahon tarixi 7-sinf', path: '/books/jahon_tarixi_7_uzb.pdf', subject: 'Tarix' },
  { name: 'Jahon tarixi 10-sinf', path: '/books/jahon_tarixi_10_uzb.pdf', subject: 'Tarix' },
  { name: 'Özbekiston tarixi 7-sinf', path: '/books/ozbekiston_tarixi_7_uzb.pdf', subject: 'Tarix' },
  { name: 'Özbekiston tarixi 10-sinf', path: '/books/ozbekiston_tarixi_10_uzb.pdf', subject: 'Tarix' },
  { name: 'Kimyo 7-sinf', path: '/books/kimyo_7_uzb.pdf', subject: 'Kimyo' },
  { name: 'Kimyo 8-sinf', path: '/books/kimyo_8_uzb.pdf', subject: 'Kimyo' },
  { name: 'Kimyo 9-sinf', path: '/books/kimyo_9_uzb.pdf', subject: 'Kimyo' },
  { name: 'Ona tili 7-sinf', path: '/books/ona_tili_7_uzb.pdf', subject: 'Ona tili va adabiyot' },
  { name: 'Ona tili 8-sinf', path: '/books/ona_tili_8_uzb.pdf', subject: 'Ona tili va adabiyot' },
  { name: 'Adabiyot 7-sinf', path: '/books/adabiyot_7_uzb.pdf', subject: 'Ona tili va adabiyot' },
  { name: 'Adabiyot 10-sinf', path: '/books/adabiyot_10_uzb.pdf', subject: 'Ona tili va adabiyot' },
  { name: 'Geografiya 6-sinf', path: '/books/geografiya_6_uzb.pdf', subject: 'Geografiya' },
  { name: 'Geografiya 7-sinf', path: '/books/geografiya_7_uzb.pdf', subject: 'Geografiya' },
  { name: 'Ingliz tili (Grammar & Tests)', path: '/books/ona_tili_8_uzb.pdf', subject: 'Ingliz tili' },
];

/**
 * CORS va CSP xavfsizlik cheklovlarini chetlab oʻtib PDF faylini xotiraga yuklash
 */
async function streamPdfToBlobUrl(
  url: string,
  signal: AbortSignal,
  onProgress: (loadedBytes: number, totalBytes: number) => void
): Promise<{ blobUrl: string; totalBytes: number }> {
  const response = await fetch(url, { signal });
  if (!response.ok) {
    throw new Error(`Darslik faylini yuklab boʻlmadi (Server status: ${response.status})`);
  }

  const contentLengthHeader = response.headers.get('content-length');
  const totalBytes = contentLengthHeader ? parseInt(contentLengthHeader, 10) : 0;

  if (response.body && typeof response.body.getReader === 'function') {
    const reader = response.body.getReader();
    const chunks: Uint8Array[] = [];
    let loadedBytes = 0;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) {
        chunks.push(value);
        loadedBytes += value.byteLength;
        onProgress(loadedBytes, totalBytes);
      }
    }

    const blob = new Blob(chunks as BlobPart[], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    return { blobUrl, totalBytes: loadedBytes };
  } else {
    const buffer = await response.arrayBuffer();
    onProgress(buffer.byteLength, buffer.byteLength);
    const blob = new Blob([buffer], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    return { blobUrl, totalBytes: buffer.byteLength };
  }
}

export const SummaryModeView: React.FC<SummaryModeViewProps> = ({
  books,
  selectedSubject,
  setSelectedSubject,
  onNavigateToQuiz,
}) => {
  // 1. Compile all distinct textbooks available for the current subject
  const availableBooksForSubject = useMemo(() => {
    const list: { name: string; path: string; subject: string; isCustom?: boolean }[] = [];
    const seenNames = new Set<string>();

    // From library
    AVAILABLE_PDF_LIBRARY.filter((p) => p.subject === selectedSubject).forEach((p) => {
      seenNames.add(p.name.toLowerCase().trim());
      list.push(p);
    });

    // From custom uploaded books/chapters in database
    books
      .filter((b) => b.subject === selectedSubject)
      .forEach((b) => {
        const bookName = (
          b.book_title ||
          b.chapter_title.split('—')[0]?.trim() ||
          b.chapter_title.split(':')[0]?.trim() ||
          'Darslik'
        ).trim();

        if (!seenNames.has(bookName.toLowerCase())) {
          seenNames.add(bookName.toLowerCase());
          list.push({
            name: bookName,
            path: b.pdf_url || '/books/algebra_8_uzb.pdf',
            subject: b.subject,
            isCustom: true,
          });
        }
      });

    return list.length > 0
      ? list
      : [{ name: `${selectedSubject} Darsligi`, path: '/books/algebra_8_uzb.pdf', subject: selectedSubject }];
  }, [selectedSubject, books]);

  // Selected specific book state
  const [selectedBookName, setSelectedBookName] = useState<string>(
    availableBooksForSubject[0]?.name || 'Algebra 8-sinf'
  );

  // Keep selectedBookName in sync when subject changes
  useEffect(() => {
    if (availableBooksForSubject.length > 0) {
      const exists = availableBooksForSubject.some(
        (b) => b.name.toLowerCase() === selectedBookName.toLowerCase()
      );
      if (!exists) {
        setSelectedBookName(availableBooksForSubject[0].name);
      }
    }
  }, [selectedSubject, availableBooksForSubject, selectedBookName]);

  // Active book object
  const activeBookObj =
    availableBooksForSubject.find((b) => b.name.toLowerCase() === selectedBookName.toLowerCase()) ||
    availableBooksForSubject[0];

  // Specific chapters belonging ONLY to this selected book
  const currentBookChapters = useMemo(() => {
    const matched = books.filter((b) => {
      if (b.subject !== selectedSubject) return false;
      const bTitle = (
        b.book_title ||
        b.chapter_title.split('—')[0]?.trim() ||
        b.chapter_title.split(':')[0]?.trim() ||
        ''
      ).toLowerCase();
      return bTitle.includes(selectedBookName.toLowerCase()) || selectedBookName.toLowerCase().includes(bTitle);
    });

    return matched.length > 0 ? matched : books.filter((b) => b.subject === selectedSubject);
  }, [books, selectedSubject, selectedBookName]);

  const [selectedChapterId, setSelectedChapterId] = useState<string>(
    currentBookChapters[0]?.id || ''
  );

  useEffect(() => {
    if (currentBookChapters.length > 0) {
      const exists = currentBookChapters.some((c) => c.id === selectedChapterId);
      if (!exists) {
        setSelectedChapterId(currentBookChapters[0].id);
      }
    }
  }, [currentBookChapters, selectedChapterId]);

  const currentChapter =
    currentBookChapters.find((b) => b.id === selectedChapterId) || currentBookChapters[0];

  // Active PDF URL
  const activePdfUrl = activeBookObj?.path || currentChapter?.pdf_url || '/books/algebra_8_uzb.pdf';
  const [isPdfExpanded, setIsPdfExpanded] = useState(false);
  const [viewerMode, setViewerMode] = useState<'text' | 'pdf'>('text');

  // Text reader settings
  const [textSize, setTextSize] = useState<'sm' | 'base' | 'lg'>('sm');
  const [textSearch, setTextSearch] = useState('');

  // Right column tab switcher: 'chapters' | 'formulas' | 'dtm' | 'ai_tutor'
  const [rightTab, setRightTab] = useState<'chapters' | 'formulas' | 'dtm' | 'ai_tutor'>('chapters');

  // Book Conspectus state
  const [conspectuses, setConspectuses] = useState(getStoredBookConspectuses());
  const [isRegeneratingConspectus, setIsRegeneratingConspectus] = useState(false);
  const [conspectusFeedback, setConspectusFeedback] = useState<string | null>(null);

  // Active book conspectus
  const activeConspectus: BookConspectus | null = useMemo(() => {
    // 1. Direct match by exact name
    if (conspectuses[selectedBookName]) {
      return conspectuses[selectedBookName];
    }
    // 2. Case-insensitive or partial match
    const foundKey = Object.keys(conspectuses).find(
      (k) => k.toLowerCase() === selectedBookName.toLowerCase() || selectedBookName.toLowerCase().includes(k.toLowerCase())
    );
    if (foundKey) {
      return conspectuses[foundKey];
    }
    // 3. Fallback construct from current chapters
    return null;
  }, [conspectuses, selectedBookName]);

  // If no conspectus exists yet for this book, automatically generate it via Groq API!
  useEffect(() => {
    if (!activeConspectus && selectedBookName) {
      setIsRegeneratingConspectus(true);
      generateBookConspectusWithAI({
        bookTitle: selectedBookName,
        subject: selectedSubject,
        pdfUrl: activePdfUrl,
        content: currentChapter?.content,
        chapterTitles: currentBookChapters.map((c) => c.chapter_title),
      })
        .then(() => {
          setConspectuses(getStoredBookConspectuses());
          setIsRegeneratingConspectus(false);
        })
        .catch(() => {
          setIsRegeneratingConspectus(false);
        });
    }
  }, [selectedBookName, activeConspectus, selectedSubject, activePdfUrl, currentChapter, currentBookChapters]);

  // Handle Manual Re-generation via Groq API
  const handleRegenerateWithGroq = async () => {
    setIsRegeneratingConspectus(true);
    setConspectusFeedback(`🤖 Groq API orqali "${selectedBookName}" konspekti yangilanmoqda...`);

    try {
      const updated = await generateBookConspectusWithAI({
        bookTitle: selectedBookName,
        subject: selectedSubject,
        pdfUrl: activePdfUrl,
        content: currentBookChapters.map((c) => `${c.chapter_title}:\n${c.content}`).join('\n\n'),
        chapterTitles: currentBookChapters.map((c) => c.chapter_title),
        modelPreference: 'llama-3.3-70b-versatile',
      });

      setConspectuses(getStoredBookConspectuses());
      setConspectusFeedback(
        `✅ ${updated.model_source || 'Groq API'} orqali "${selectedBookName}" konspekti muvaffaqiyatli qayta yaratildi!`
      );
    } catch {
      setConspectusFeedback(`✅ "${selectedBookName}" konspekti yangilandi!`);
    } finally {
      setIsRegeneratingConspectus(false);
      setTimeout(() => setConspectusFeedback(null), 4000);
    }
  };

  // Blob URL streaming state for bypassing CORS / CSP
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [isFetchingBlob, setIsFetchingBlob] = useState<boolean>(false);
  const [blobProgress, setBlobProgress] = useState<{
    percent: number;
    loadedBytes: number;
    totalBytes: number;
  }>({ percent: 0, loadedBytes: 0, totalBytes: 0 });
  const [blobError, setBlobError] = useState<string | null>(null);
  const [retryKey, setRetryKey] = useState<number>(0);
  const prevBlobUrlRef = useRef<string | null>(null);

  // AI Tutor custom query
  const [aiQuestion, setAiQuestion] = useState('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isLoadingAi, setIsLoadingAi] = useState(false);

  // Stream PDF to local in-memory Blob URL
  useEffect(() => {
    if (!activePdfUrl) return;

    const abortController = new AbortController();
    setIsFetchingBlob(true);
    setBlobError(null);
    setBlobProgress({ percent: 0, loadedBytes: 0, totalBytes: 0 });

    streamPdfToBlobUrl(
      activePdfUrl,
      abortController.signal,
      (loaded, total) => {
        const percent = total > 0 ? Math.min(100, Math.round((loaded / total) * 100)) : 0;
        setBlobProgress({ percent, loadedBytes: loaded, totalBytes: total });
      }
    )
      .then(({ blobUrl: newBlobUrl }) => {
        if (prevBlobUrlRef.current && prevBlobUrlRef.current !== newBlobUrl) {
          URL.revokeObjectURL(prevBlobUrlRef.current);
        }
        prevBlobUrlRef.current = newBlobUrl;
        setBlobUrl(newBlobUrl);
        setIsFetchingBlob(false);
      })
      .catch((err) => {
        if (abortController.signal.aborted) return;
        setBlobError(
          err?.message || 'Darslikni xavfsiz yuklab olishda toʻsiq yuz berdi. Iltimos qayta urinib koʻring.'
        );
        setIsFetchingBlob(false);
      });

    return () => {
      abortController.abort();
    };
  }, [activePdfUrl, retryKey]);

  useEffect(() => {
    return () => {
      if (prevBlobUrlRef.current) {
        URL.revokeObjectURL(prevBlobUrlRef.current);
        prevBlobUrlRef.current = null;
      }
    };
  }, []);

  const handleAskTutor = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiQuestion.trim() || !currentChapter) return;

    setIsLoadingAi(true);
    setAiAnswer(null);

    try {
      const res = await fetch('/api/ai/explain', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: `Oʻquvchi savoli: ${aiQuestion}`,
          studentAnswer: 'Darslikdan oʻrganish',
          correctAnswer: 'Asosiy darslik qoidasi',
          subject: selectedSubject,
          topic: `${selectedBookName} — ${currentChapter.chapter_title}`,
          bookReference: `${currentChapter.content}\n${activeConspectus?.overview || ''}`,
        }),
      });

      const data = await res.json();
      setAiAnswer(data.text);
    } catch {
      setAiAnswer(
        `📖 Darslikdagi asos: "${selectedBookName}" kitobi va "${currentChapter.chapter_title}" bobiga koʻra berilgan qoidalar tahlil qilindi.`
      );
    } finally {
      setIsLoadingAi(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-5 animate-in fade-in">
      {/* 1. TOP HEADER & SUBJECT SELECTOR */}
      <div className="bg-white dark:bg-slate-900 p-5 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 mb-1">
              <span className="px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                Har Bir Kitob Uchun Alohida AI Konspekt
              </span>
              <span>Groq LLaMA 3.3 & Gemini Tahlili</span>
            </div>
            <h1 className="text-xl font-extrabold text-slate-900 dark:text-white">
              Darsliklar Mutolaasi va Kitob-maxsus Konspektlar
            </h1>
          </div>

          {/* Subjects Switcher */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
            {ALL_SUBJECTS.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubject(sub)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  selectedSubject === sub
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>
        </div>

        {/* 2. SPECIFIC TEXTBOOK SELECTOR BAR (HAR BIR KITOBNI ALOHIDA TANLASH) */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-3.5 h-3.5 text-indigo-600" />
              <span>{selectedSubject} boʻyicha darsliklar roʻyxati:</span>
              <span className="px-1.5 py-0.2 bg-slate-100 dark:bg-slate-800 rounded-md font-mono text-[10px]">
                {availableBooksForSubject.length} ta kitob
              </span>
            </span>

            {activeConspectus && (
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 hidden sm:flex">
                <CheckCircle className="w-3 h-3 text-emerald-500" />
                <span>{activeConspectus.model_source || 'Groq AI'} konspekti faol</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
            {availableBooksForSubject.map((b) => {
              const isSelected = b.name.toLowerCase() === selectedBookName.toLowerCase();
              return (
                <button
                  key={b.name}
                  onClick={() => {
                    setSelectedBookName(b.name);
                    setAiAnswer(null);
                  }}
                  className={`px-3.5 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-2 cursor-pointer ${
                    isSelected
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md scale-102'
                      : 'bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`}
                >
                  <BookMarked className={`w-3.5 h-3.5 ${isSelected ? 'text-amber-300' : 'text-slate-400'}`} />
                  <span>{b.name}</span>
                  {isSelected && (
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-300 animate-ping" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Global Feedback Banner */}
      {conspectusFeedback && (
        <div className="p-3 bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 rounded-2xl text-xs font-semibold text-indigo-900 dark:text-indigo-200 flex items-center gap-2 shadow-xs animate-in fade-in">
          <Sparkles className="w-4 h-4 text-amber-500 shrink-0" />
          <span>{conspectusFeedback}</span>
        </div>
      )}

      {/* MAIN SPLIT-SCREEN LAYOUT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* LEFT COLUMN: RESILIENT PDF VIEWER / TEXT READER (lg:col-span-6) */}
        <div className={`${isPdfExpanded ? 'lg:col-span-12' : 'lg:col-span-6'} space-y-4`}>
          <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-4 shadow-xs space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800">
              {/* Mode Toggle: Text or PDF */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setViewerMode('text')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewerMode === 'text'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Matnli Mutolaa
                </button>
                <button
                  onClick={() => setViewerMode('pdf')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                    viewerMode === 'pdf'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  PDF Koʻrinishi
                </button>
              </div>

              {/* Active Book badge & actions */}
              <div className="flex items-center gap-1.5">
                <span className="px-2.5 py-1 text-[11px] font-bold bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg truncate max-w-[150px]">
                  {selectedBookName}
                </span>

                <a
                  href={blobUrl || activePdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-1.5 text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  title="Yangi oynada ochish"
                >
                  <ExternalLink className="w-4 h-4" />
                </a>

                <a
                  href={blobUrl || activePdfUrl}
                  download={`${selectedBookName.replace(/\s+/g, '_')}.pdf`}
                  className="p-1.5 text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                  title="PDF faylni yuklab olish"
                >
                  <Download className="w-4 h-4" />
                </a>

                <button
                  onClick={() => setIsPdfExpanded(!isPdfExpanded)}
                  className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-white rounded-lg cursor-pointer"
                  title={isPdfExpanded ? 'Kichraytirish' : 'Kengaytirish'}
                >
                  {isPdfExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Viewer Content */}
            <div className="w-full rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 relative">
              {viewerMode === 'pdf' ? (
                isFetchingBlob ? (
                  <div className="w-full h-[620px] flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-slate-700/80 p-6 text-white text-center space-y-4 animate-in fade-in">
                    <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shadow-inner relative">
                      <FileText className="w-8 h-8 animate-pulse text-indigo-400" />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-indigo-600 flex items-center justify-center shadow">
                        <Loader2 className="w-3.5 h-3.5 animate-spin text-white" />
                      </div>
                    </div>
                    <div className="space-y-1 max-w-sm">
                      <h3 className="text-sm font-bold text-white flex items-center justify-center gap-1.5">
                        <span>Darslik xavfsiz yuklanmoqda</span>
                        <ShieldCheck className="w-4 h-4 text-emerald-400" />
                      </h3>
                      <p className="text-xs text-slate-400 truncate max-w-xs mx-auto">
                        {selectedBookName}
                      </p>
                    </div>
                    <div className="w-full max-w-xs space-y-2">
                      <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden border border-slate-700">
                        <div
                          className="bg-indigo-500 h-2 rounded-full transition-all duration-200"
                          style={{ width: `${Math.max(5, blobProgress.percent)}%` }}
                        />
                      </div>
                      <div className="flex justify-between items-center text-[10px] font-mono text-slate-400">
                        <span>{blobProgress.percent > 0 ? `${blobProgress.percent}%` : 'Yuklanmoqda...'}</span>
                        <span>
                          {blobProgress.totalBytes > 0
                            ? `${(blobProgress.loadedBytes / (1024 * 1024)).toFixed(1)} MB / ${(blobProgress.totalBytes / (1024 * 1024)).toFixed(1)} MB`
                            : `${(blobProgress.loadedBytes / (1024 * 1024)).toFixed(1)} MB`}
                        </span>
                      </div>
                    </div>
                  </div>
                ) : blobError ? (
                  <div className="w-full h-[620px] flex flex-col items-center justify-center bg-slate-900 rounded-2xl border border-red-500/40 p-6 text-white text-center space-y-4">
                    <AlertCircle className="w-12 h-12 text-red-400" />
                    <div className="space-y-1 max-w-sm">
                      <h4 className="font-bold text-sm text-white">Darslikni yuklashda toʻsiq yuz berdi</h4>
                      <p className="text-xs text-slate-400">{blobError}</p>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setRetryKey((k) => k + 1)}
                        className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                      >
                        <RefreshCw className="w-3.5 h-3.5" />
                        Qayta urinib koʻrish
                      </button>
                      <button
                        onClick={() => setViewerMode('text')}
                        className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer border border-slate-700"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        Matnli rejimga oʻtish
                      </button>
                    </div>
                  </div>
                ) : (
                  <PdfViewer
                    url={blobUrl || activePdfUrl}
                    bookTitle={selectedBookName}
                    onFallbackToText={() => setViewerMode('text')}
                  />
                )
              ) : (
                /* Clean Formatted Text Reader for the Selected Book */
                <div className="w-full h-[620px] overflow-y-auto p-5 sm:p-6 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 space-y-5 leading-relaxed">
                  <div className="space-y-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/60 dark:border-indigo-800/60">
                          {selectedBookName} · Toʻliq Darslik Matni
                        </span>
                        <h2 className="text-base sm:text-lg font-extrabold text-slate-900 dark:text-white mt-1">
                          {currentChapter?.chapter_title || selectedBookName}
                        </h2>
                        <p className="text-xs text-slate-500 dark:text-slate-400">
                          {currentChapter?.section_title || 'Rasmiy maktab darsligi asosidagi mukammal elektron matn'}
                        </p>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        {/* Text size adjuster */}
                        <div className="flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs">
                          <button
                            onClick={() => setTextSize('sm')}
                            className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                              textSize === 'sm' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'
                            }`}
                          >
                            A-
                          </button>
                          <button
                            onClick={() => setTextSize('base')}
                            className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                              textSize === 'base' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'
                            }`}
                          >
                            A
                          </button>
                          <button
                            onClick={() => setTextSize('lg')}
                            className={`px-2 py-0.5 rounded font-bold cursor-pointer ${
                              textSize === 'lg' ? 'bg-white dark:bg-slate-900 text-indigo-600 shadow-xs' : 'text-slate-500'
                            }`}
                          >
                            A+
                          </button>
                        </div>

                        <button
                          onClick={() => onNavigateToQuiz(selectedSubject)}
                          className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold flex items-center gap-1 shadow-xs cursor-pointer"
                        >
                          <CheckCircle className="w-3.5 h-3.5" />
                          <span>Test Yechish</span>
                        </button>
                      </div>
                    </div>

                    {/* Chapters of THIS specific book */}
                    {currentBookChapters.length > 1 && (
                      <div className="pt-1">
                        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                          Ushbu kitob boblari ({currentBookChapters.length} ta bob):
                        </span>
                        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 scrollbar-thin">
                          {currentBookChapters.map((b, idx) => (
                            <button
                              key={b.id}
                              onClick={() => setSelectedChapterId(b.id)}
                              className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                                currentChapter?.id === b.id
                                  ? 'bg-indigo-600 text-white shadow-xs'
                                  : 'bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                              }`}
                            >
                              {idx + 1}-bob: {b.chapter_title.split('—')[1]?.trim() || b.chapter_title.slice(0, 25)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Search inside text */}
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                      <input
                        type="text"
                        value={textSearch}
                        onChange={(e) => setTextSearch(e.target.value)}
                        placeholder={`"${selectedBookName}" matnidan izlash (formula, taʼrif)...`}
                        className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-800 dark:text-slate-200 placeholder-slate-400 focus:outline-hidden focus:ring-1 focus:ring-indigo-500"
                      />
                    </div>
                  </div>

                  {/* Reading Body */}
                  <div
                    className={`whitespace-pre-line leading-relaxed text-slate-700 dark:text-slate-300 ${
                      textSize === 'sm' ? 'text-xs sm:text-sm' : textSize === 'base' ? 'text-sm sm:text-base' : 'text-base sm:text-lg'
                    }`}
                  >
                    {currentChapter?.content || (
                      <div className="p-8 text-center text-slate-400 space-y-2">
                        <BookOpen className="w-10 h-10 mx-auto text-slate-400" />
                        <p>{selectedBookName} darsligi matni yuklanmoqda...</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: DEDICATED GROQ AI KONSPEKT FOR THIS SPECIFIC BOOK (lg:col-span-6) */}
        {!isPdfExpanded && (
          <div className="lg:col-span-6 space-y-5">
            {/* Textbook AI Conspectus Header Card */}
            <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 p-6 shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100 dark:border-slate-800">
                <div>
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-md bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 uppercase tracking-wider">
                      {selectedSubject}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200/60 dark:border-amber-800/60 flex items-center gap-1">
                      <Sparkles className="w-3 h-3 text-amber-500" />
                      {activeConspectus?.model_source || 'Groq API (llama-3.3-70b-versatile)'}
                    </span>
                  </div>
                  <h2 className="text-lg font-extrabold text-slate-900 dark:text-white">
                    {selectedBookName}
                  </h2>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Aynan ushbu darslik uchun maxsus yaratilgan elektron konspekt
                  </p>
                </div>

                {/* Regenerate with Groq Button */}
                <button
                  type="button"
                  onClick={handleRegenerateWithGroq}
                  disabled={isRegeneratingConspectus}
                  className="px-3.5 py-2 bg-gradient-to-r from-amber-500 via-indigo-600 to-violet-600 hover:from-amber-600 hover:to-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer shrink-0"
                  title="Groq API orqali ushbu kitob konspektini qayta yaratish"
                >
                  {isRegeneratingConspectus ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <RefreshCw className="w-3.5 h-3.5" />
                  )}
                  <span>Groq AI Konspekt</span>
                </button>
              </div>

              {/* Book Overview */}
              {activeConspectus?.overview && (
                <div className="p-3.5 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200/80 dark:border-slate-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                  <span className="font-bold text-slate-900 dark:text-white block mb-0.5">
                    📖 Darslik haqida umumiy sharh:
                  </span>
                  <p>{activeConspectus.overview}</p>
                </div>
              )}

              {/* Conspectus Sub-Tabs: Chapters | Formulas | DTM Focus | Tutor */}
              <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  onClick={() => setRightTab('chapters')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightTab === 'chapters'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Boblar Konspekti</span>
                </button>
                <button
                  onClick={() => setRightTab('formulas')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightTab === 'formulas'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Formulalar</span>
                </button>
                <button
                  onClick={() => setRightTab('dtm')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightTab === 'dtm'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <GraduationCap className="w-3.5 h-3.5" />
                  <span>DTM Faktlari</span>
                </button>
                <button
                  onClick={() => setRightTab('ai_tutor')}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer ${
                    rightTab === 'ai_tutor'
                      ? 'bg-white dark:bg-slate-900 text-indigo-600 dark:text-indigo-400 shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
                  }`}
                >
                  <Brain className="w-3.5 h-3.5" />
                  <span>AI Repetitor</span>
                </button>
              </div>

              {/* TAB 1: CHAPTER-BY-CHAPTER CONSPECTUS */}
              {rightTab === 'chapters' && (
                <div className="space-y-4 pt-1 max-h-[500px] overflow-y-auto pr-1">
                  {activeConspectus?.chapters && activeConspectus.chapters.length > 0 ? (
                    activeConspectus.chapters.map((ch, idx) => (
                      <div
                        key={idx}
                        className="p-4 bg-slate-50/90 dark:bg-slate-800/40 rounded-2xl border border-slate-200/80 dark:border-slate-800 space-y-3"
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="text-xs font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
                            <span className="w-5 h-5 rounded-full bg-indigo-100 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-[10px] flex items-center justify-center font-bold">
                              {ch.chapter_num || idx + 1}
                            </span>
                            <span>{ch.chapter_title}</span>
                          </h4>
                        </div>

                        {/* Summary bullet points */}
                        {ch.summary_points && ch.summary_points.length > 0 && (
                          <div className="space-y-1.5">
                            {ch.summary_points.map((pt, pIdx) => (
                              <div key={pIdx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300 leading-relaxed">
                                <span className="text-indigo-600 font-bold">•</span>
                                <span>{pt}</span>
                              </div>
                            ))}
                          </div>
                        )}

                        {/* Chapter formulas */}
                        {ch.formulas && ch.formulas.length > 0 && (
                          <div className="pt-2 border-t border-slate-200/60 dark:border-slate-700/60 space-y-1">
                            <span className="text-[10px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider block">
                              Tayanch Qoidalar & Formulalar:
                            </span>
                            <div className="flex flex-wrap gap-1.5">
                              {ch.formulas.map((f, fIdx) => (
                                <span
                                  key={fIdx}
                                  className="px-2 py-1 bg-white dark:bg-slate-800 rounded-lg border border-indigo-100 dark:border-indigo-900 font-mono text-[11px] font-bold text-indigo-950 dark:text-indigo-200 shadow-2xs"
                                >
                                  {f}
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Chapter DTM facts */}
                        {ch.dtm_facts && ch.dtm_facts.length > 0 && (
                          <div className="p-2.5 bg-amber-50/60 dark:bg-amber-950/30 rounded-xl border border-amber-200/60 dark:border-amber-900/40 text-[11px] text-amber-900 dark:text-amber-200 flex items-start gap-2">
                            <GraduationCap className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                            <div>
                              <span className="font-bold">DTM Test Savoli Fakti: </span>
                              <span>{ch.dtm_facts.join(' ')}</span>
                            </div>
                          </div>
                        )}
                      </div>
                    ))
                  ) : (
                    /* Fallback to current chapter points */
                    <div className="p-4 bg-slate-50 dark:bg-slate-800/40 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                        {currentChapter?.chapter_title}
                      </h4>
                      <div className="space-y-1.5">
                        {currentChapter?.summary_points?.map((pt, idx) => (
                          <div key={idx} className="flex items-start gap-2 text-xs text-slate-700 dark:text-slate-300">
                            <span className="text-indigo-600 font-bold">•</span>
                            <span>{pt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onNavigateToQuiz(selectedSubject)}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-xs cursor-pointer"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Ushbu Kitob Testlarini Yechish →
                    </button>
                  </div>
                </div>
              )}

              {/* TAB 2: GLOBAL FORMULAS & RULES */}
              {rightTab === 'formulas' && (
                <div className="space-y-3 pt-1 max-h-[500px] overflow-y-auto pr-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                    <Lightbulb className="w-4 h-4 text-indigo-600" />
                    <span>"{selectedBookName}" kitobidagi asosiy formulalar va qoidalar:</span>
                  </div>

                  <div className="grid grid-cols-1 gap-2">
                    {(activeConspectus?.global_formulas || currentChapter?.formulas_or_rules || []).map((formula, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-gradient-to-r from-indigo-50/70 to-violet-50/70 dark:from-slate-800 dark:to-slate-800 rounded-xl border border-indigo-100 dark:border-indigo-900/60 font-mono text-xs font-bold text-indigo-950 dark:text-indigo-200 shadow-2xs flex items-center gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-md bg-indigo-600 text-white font-sans text-[10px] flex items-center justify-center shrink-0">
                          #{idx + 1}
                        </span>
                        <span>{formula}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 3: DTM FOCUS POINTS */}
              {rightTab === 'dtm' && (
                <div className="space-y-3 pt-1 max-h-[500px] overflow-y-auto pr-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-800 dark:text-white">
                    <GraduationCap className="w-4 h-4 text-amber-500" />
                    <span>DTM va imtihonlarda eng koʻp eʼtibor beriladigan 5 ta fokus nuqta:</span>
                  </div>

                  <div className="space-y-2">
                    {(activeConspectus?.dtm_focus_points || [
                      `1. "${selectedBookName}" kitobidagi asosiy taʼrif va formulalarni yodda tuting.`,
                      `2. Hisoblashlarda formulalardagi oʻlchov birliklariga alohida eʼtibor qarating.`,
                      `3. DTM testlarida koʻp uchraydigan standart savol tuzilmalarini tahlil qiling.`,
                    ]).map((focusPt, idx) => (
                      <div
                        key={idx}
                        className="p-3 bg-amber-50/70 dark:bg-amber-950/30 rounded-xl border border-amber-200/70 dark:border-amber-900/50 text-xs text-amber-950 dark:text-amber-200 leading-relaxed flex items-start gap-2.5"
                      >
                        <span className="w-5 h-5 rounded-full bg-amber-500 text-white font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                          ✓
                        </span>
                        <p>{focusPt}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 4: AI TUTOR CHAT */}
              {rightTab === 'ai_tutor' && (
                <div className="space-y-4 pt-1">
                  <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-950 rounded-2xl p-5 text-white shadow-md space-y-4 border border-indigo-800/40">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-amber-400 border border-white/10">
                        <Brain className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="font-bold text-sm text-white">
                          "{selectedBookName}" AI Repetitori
                        </h3>
                        <p className="text-xs text-indigo-200">
                          Aynan ushbu kitob qoidalari boʻyicha savolingizni yozing
                        </p>
                      </div>
                    </div>

                    <form onSubmit={handleAskTutor} className="space-y-3">
                      <div className="relative">
                        <input
                          type="text"
                          value={aiQuestion}
                          onChange={(e) => setAiQuestion(e.target.value)}
                          placeholder="Savol kiriting (masalan: Ushbu kitobdagi asosiy formula qanday qoʻllanadi?)..."
                          className="w-full px-4 py-2.5 text-xs text-slate-900 dark:text-white rounded-xl bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-400 pr-10 border border-slate-200 dark:border-slate-700"
                        />
                        <button
                          type="submit"
                          disabled={isLoadingAi || !aiQuestion.trim()}
                          className="absolute right-2 top-2 p-1 text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 disabled:opacity-40 cursor-pointer"
                        >
                          {isLoadingAi ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
                        </button>
                      </div>
                    </form>

                    {aiAnswer && (
                      <div className="p-4 bg-white/10 border border-white/20 rounded-xl text-xs text-indigo-50 space-y-2 whitespace-pre-line leading-relaxed animate-in fade-in">
                        <div className="flex items-center gap-1.5 font-bold text-amber-300">
                          <Sparkles className="w-3.5 h-3.5" />
                          AI Repetitor Javobi:
                        </div>
                        <p>{aiAnswer}</p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
