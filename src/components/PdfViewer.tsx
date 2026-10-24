import React, { useState, useEffect, useRef } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import {
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  ZoomOut,
  RotateCw,
  Maximize2,
  Minimize2,
  Download,
  ExternalLink,
  Loader2,
  AlertCircle,
  FileText,
  RefreshCw,
} from 'lucide-react';

// Configure pdfjs worker to use the same-origin static worker in public/
if (typeof window !== 'undefined') {
  pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
}

interface PdfViewerProps {
  url: string;
  bookTitle?: string;
  onFallbackToText?: () => void;
}

export const PdfViewer: React.FC<PdfViewerProps> = ({
  url,
  bookTitle,
  onFallbackToText,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [pdfDoc, setPdfDoc] = useState<pdfjsLib.PDFDocumentProxy | null>(null);
  const [numPages, setNumPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageInputValue, setPageInputValue] = useState<string>('1');
  const [scale, setScale] = useState<number>(1.2);
  const [rotation, setRotation] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isRendering, setIsRendering] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [useNativeEmbed, setUseNativeEmbed] = useState<boolean>(false);

  const renderTaskRef = useRef<pdfjsLib.RenderTask | null>(null);

  // Load PDF Document when url changes
  useEffect(() => {
    if (useNativeEmbed) return;

    let isCancelled = false;
    setIsLoading(true);
    setError(null);
    setCurrentPage(1);
    setPageInputValue('1');
    setPdfDoc(null);

    // Make sure workerSrc points to the local same-origin worker
    if (typeof window !== 'undefined') {
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.mjs';
    }

    const loadingTask = pdfjsLib.getDocument({
      url,
      cMapUrl: '/cmaps/',
      cMapPacked: true,
    });

    loadingTask.promise
      .then((loadedPdf) => {
        if (!isCancelled) {
          setPdfDoc(loadedPdf);
          setNumPages(loadedPdf.numPages);
          setIsLoading(false);
        }
      })
      .catch((err) => {
        if (!isCancelled) {
          console.error('PDF yuklashda xatolik:', err);
          setError(
            err?.message ||
              'Darslik PDF faylini oʻqishda xatolik yuz berdi. Iltimos qayta urinib koʻring yoki matnli rejimga oʻting.'
          );
          setIsLoading(false);
        }
      });

    return () => {
      isCancelled = true;
      loadingTask.destroy().catch(() => {});
    };
  }, [url, useNativeEmbed]);

  // Render current page onto canvas
  useEffect(() => {
    if (!pdfDoc || !canvasRef.current) return;

    let isCancelled = false;
    setIsRendering(true);

    if (renderTaskRef.current) {
      renderTaskRef.current.cancel();
      renderTaskRef.current = null;
    }

    pdfDoc
      .getPage(currentPage)
      .then((page) => {
        if (isCancelled || !canvasRef.current) return;

        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (!context) return;

        const dpr = window.devicePixelRatio || 1;
        const viewport = page.getViewport({ scale, rotation });

        canvas.width = Math.floor(viewport.width * dpr);
        canvas.height = Math.floor(viewport.height * dpr);
        canvas.style.width = `${Math.floor(viewport.width)}px`;
        canvas.style.height = `${Math.floor(viewport.height)}px`;

        // Reset transform and scale for high DPI
        context.setTransform(1, 0, 0, 1, 0, 0);
        context.scale(dpr, dpr);

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
          canvas: canvas,
        };

        const renderTask = page.render(renderContext);
        renderTaskRef.current = renderTask;

        renderTask.promise
          .then(() => {
            if (!isCancelled) {
              setIsRendering(false);
              setPageInputValue(currentPage.toString());
            }
          })
          .catch((renderErr: any) => {
            if (renderErr?.name !== 'RenderingCancelledException') {
              console.error('Sahifani chizishda xatolik:', renderErr);
              if (!isCancelled) setIsRendering(false);
            }
          });
      })
      .catch((pageErr) => {
        console.error('Sahifani olishda xatolik:', pageErr);
        if (!isCancelled) setIsRendering(false);
      });

    return () => {
      isCancelled = true;
      if (renderTaskRef.current) {
        renderTaskRef.current.cancel();
        renderTaskRef.current = null;
      }
    };
  }, [pdfDoc, currentPage, scale, rotation]);

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < numPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handlePageJump = (e: React.FormEvent) => {
    e.preventDefault();
    const pageNum = parseInt(pageInputValue, 10);
    if (!isNaN(pageNum) && pageNum >= 1 && pageNum <= numPages) {
      setCurrentPage(pageNum);
    } else {
      setPageInputValue(currentPage.toString());
    }
  };

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 2.6));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.6));
  };

  const handleRotate = () => {
    setRotation((prev) => (prev + 90) % 360);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div
      ref={containerRef}
      className={`flex flex-col bg-slate-900 rounded-2xl border border-slate-700/80 overflow-hidden shadow-inner ${
        isFullscreen ? 'fixed inset-0 z-50 rounded-none' : 'h-[600px] w-full'
      }`}
    >
      {/* Top Controls Toolbar */}
      <div className="bg-slate-800/95 border-b border-slate-700 px-3 py-2 flex flex-wrap items-center justify-between gap-2 text-white shrink-0 select-none">
        {/* Left: Page Navigator */}
        <div className="flex items-center gap-1 sm:gap-2">
          <button
            onClick={handlePrevPage}
            disabled={currentPage <= 1 || isLoading}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Oldingi sahifa"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          <form onSubmit={handlePageJump} className="flex items-center gap-1">
            <input
              type="text"
              value={pageInputValue}
              onChange={(e) => setPageInputValue(e.target.value)}
              onBlur={() => setPageInputValue(currentPage.toString())}
              disabled={isLoading || numPages === 0}
              className="w-12 px-1.5 py-1 text-center text-xs font-mono font-bold bg-slate-900 border border-slate-600 rounded-md text-white focus:outline-none focus:ring-1 focus:ring-indigo-500"
            />
            <span className="text-xs text-slate-400 font-mono">
              / {numPages || '...'}
            </span>
          </form>

          <button
            onClick={handleNextPage}
            disabled={currentPage >= numPages || isLoading}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 disabled:hover:bg-slate-700 text-slate-200 transition-colors cursor-pointer"
            title="Keyingi sahifa"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Center: Zoom & Rotate Controls */}
        <div className="flex items-center gap-1">
          <button
            onClick={handleZoomOut}
            disabled={scale <= 0.6 || isLoading}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 transition-colors cursor-pointer"
            title="Kiçraytiriş (-)"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>

          <span className="text-[11px] font-mono px-1.5 text-slate-300 font-semibold min-w-[42px] text-center">
            {Math.round(scale * 100)}%
          </span>

          <button
            onClick={handleZoomIn}
            disabled={scale >= 2.6 || isLoading}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 transition-colors cursor-pointer"
            title="Kattalaştiriş (+)"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={handleRotate}
            disabled={isLoading}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 disabled:opacity-40 text-slate-200 transition-colors cursor-pointer ml-1"
            title="90° buriş"
          >
            <RotateCw className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Right: Actions & Fullscreen */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          <button
            onClick={() => setUseNativeEmbed((prev) => !prev)}
            className={`px-2 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors cursor-pointer ${
              useNativeEmbed
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-700 hover:bg-slate-600 text-slate-200'
            }`}
            title={useNativeEmbed ? 'Canvas rejimiga oʻtish' : 'Brauzer oʻquvchisiga oʻtish'}
          >
            <FileText className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">
              {useNativeEmbed ? 'Canvas rejimi' : 'Brauzer rejimi'}
            </span>
          </button>

          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
            title="Alohida oynada oçiş"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>

          <a
            href={url}
            download={bookTitle ? `${bookTitle.replace(/\s+/g, '_')}.pdf` : 'darslik.pdf'}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-emerald-400 transition-colors cursor-pointer"
            title="PDF-ni yuklab oliş"
          >
            <Download className="w-3.5 h-3.5" />
          </a>

          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded-lg bg-slate-700 hover:bg-slate-600 text-slate-200 transition-colors cursor-pointer"
            title={isFullscreen ? 'Kiçraytiriş' : 'Butun ekran'}
          >
            {isFullscreen ? (
              <Minimize2 className="w-3.5 h-3.5" />
            ) : (
              <Maximize2 className="w-3.5 h-3.5" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area: Native Iframe Embed OR Pdf.js Canvas */}
      {useNativeEmbed ? (
        <div className="flex-1 w-full h-full bg-slate-900 relative">
          <iframe
            src={`${url}#toolbar=1&navpanes=1`}
            title={bookTitle || 'Darslik'}
            className="w-full h-full border-0 bg-white"
          />
        </div>
      ) : (
        <div className="flex-1 overflow-auto bg-slate-950/90 flex items-center justify-center p-4 relative">
          {isLoading && (
            <div className="flex flex-col items-center justify-center gap-3 text-slate-300">
              <Loader2 className="w-8 h-8 animate-spin text-indigo-400" />
              <p className="text-xs font-semibold">Darslik sahifalari yuklanmoqda...</p>
            </div>
          )}

          {error && (
            <div className="max-w-md p-6 bg-slate-900 border border-red-500/40 rounded-2xl text-center space-y-4">
              <AlertCircle className="w-10 h-10 text-red-400 mx-auto" />
              <div>
                <h4 className="font-bold text-sm text-white">PDF-ni yuklashda qiyinchilik</h4>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  Brauzer xavfsizlik cheklovlari yoki fayl hajmi tufayli sahifa oçilmadi. Quyidagi vositalar orqali davom etişingiz mumkin:
                </p>
              </div>

              <div className="flex flex-wrap items-center justify-center gap-2">
                <button
                  onClick={() => {
                    setError(null);
                    setUseNativeEmbed(true);
                  }}
                  className="px-3.5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <FileText className="w-3.5 h-3.5" />
                  Brauzer koʻrinishida ochish
                </button>

                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-700"
                >
                  <ExternalLink className="w-3.5 h-3.5" />
                  Alohida oynada oçiş
                </a>

                {onFallbackToText && (
                  <button
                    onClick={onFallbackToText}
                    className="px-3.5 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                  >
                    <FileText className="w-3.5 h-3.5" />
                    Matnli rejimga ötiş
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Native Canvas Rendering */}
          <canvas
            ref={canvasRef}
            className={`shadow-2xl rounded-sm transition-opacity duration-150 ${
              isLoading || error ? 'hidden' : 'block'
            } ${isRendering ? 'opacity-70' : 'opacity-100'}`}
          />

          {/* Small floating indicator when re-rendering page */}
          {isRendering && !isLoading && (
            <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-slate-900/80 backdrop-blur-md border border-slate-700 text-white text-[10px] rounded-lg flex items-center gap-1.5 shadow-md">
              <Loader2 className="w-3 h-3 animate-spin text-amber-400" />
              <span>Sahifa çizilmoqda...</span>
            </div>
          )}
        </div>
      )}

      {/* Bottom status bar */}
      <div className="bg-slate-900/90 border-t border-slate-800 px-3 py-1.5 flex items-center justify-between text-[11px] text-slate-400">
        <span className="truncate max-w-[280px]">
          {bookTitle || 'Darslik mutolaasi'}
        </span>
        <span className="font-mono">
          Sahifa {currentPage} / {numPages || 1}
        </span>
      </div>
    </div>
  );
};
