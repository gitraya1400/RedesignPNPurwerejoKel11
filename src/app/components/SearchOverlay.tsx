import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  Search, X, Loader2, ArrowRight, BookOpen, FileText, Calendar,
  ExternalLink, Sparkles, AlertCircle
} from "lucide-react";
import {
  searchContent,
  popularSearchKeywords,
  SearchResultItem
} from "../data/searchData";

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<SearchResultItem[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setSearched(false);
      setLoading(false);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setTotalCount(0);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const res = searchContent(query);
      setResults(res.results.slice(0, 6)); // Top 6 quick results
      setTotalCount(res.totalMatches);
      setSearched(true);
      setLoading(false);
    }, 250);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleSelectResult = (item: SearchResultItem) => {
    onClose();
    if (item.isExternal) {
      window.open(item.url, "_blank", "noopener,noreferrer");
    } else {
      navigate(item.url);
    }
  };

  const handleGoToFullSearch = (q: string) => {
    onClose();
    navigate(`/pencarian?q=${encodeURIComponent(q.trim())}`);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (query.trim()) {
        handleGoToFullSearch(query);
      }
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-16 sm:pt-20 px-4"
      style={{ backgroundColor: "rgba(15,23,42,0.75)", backdropFilter: "blur(8px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden border border-gray-100 flex flex-col max-h-[85vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-white">
          <Search size={20} className="text-[#9A2109] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Cari jadwal sidang, biaya perkara, gugatan, posbakum, ppid..."
            aria-label="Kolom pencarian informasi pengadilan"
            className="flex-1 text-gray-900 placeholder-gray-400 outline-none bg-transparent text-base"
          />
          {loading ? (
            <Loader2 size={18} className="text-[#9A2109] animate-spin flex-shrink-0" />
          ) : query ? (
            <button
              aria-label="Hapus kata kunci pencarian"
              onClick={() => { setQuery(""); inputRef.current?.focus(); }}
              className="text-gray-400 hover:text-gray-600 transition-colors p-1"
            >
              <X size={18} />
            </button>
          ) : null}
          {query.trim() && (
            <button
              onClick={() => handleGoToFullSearch(query)}
              className="hidden sm:inline-flex items-center gap-1 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors"
            >
              Cari
              <ArrowRight size={12} />
            </button>
          )}
        </div>

        {/* Results Area */}
        <div className="overflow-y-auto flex-1 divide-y divide-gray-50">
          {/* Default State: Popular Keywords */}
          {!query.trim() && (
            <div className="p-6">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles size={16} className="text-[#9A2109]" />
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                  Topik Paling Sering Dicari
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                {popularSearchKeywords.map((kw) => (
                  <button
                    key={kw}
                    onClick={() => {
                      setQuery(kw);
                      inputRef.current?.focus();
                    }}
                    className="text-sm px-3 py-1.5 rounded-full bg-gray-50 hover:bg-[#FFF1F1] text-gray-700 hover:text-[#9A2109] border border-gray-200 hover:border-[#9A2109]/30 transition-all text-left"
                  >
                    {kw}
                  </button>
                ))}
              </div>
              <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
                <span>Tips: Gunakan kata kunci singkat seperti "cerai", "tilang", atau "prodeo"</span>
              </div>
            </div>
          )}

          {/* Empty State */}
          {searched && results.length === 0 && (
            <div className="flex flex-col items-center py-10 px-6 text-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center">
                <AlertCircle size={26} className="text-amber-600" />
              </div>
              <p className="text-gray-800 text-sm font-bold">
                Tidak ada hasil untuk "{query}"
              </p>
              <p className="text-gray-500 text-xs max-w-sm leading-relaxed">
                Kata kunci mungkin terlalu spesifik. Coba gunakan istilah umum seperti <strong>jadwal</strong>, <strong>biaya</strong>, <strong>akta</strong>, atau <strong>posbakum</strong>.
              </p>
              <div className="flex flex-wrap justify-center gap-1.5 mt-2">
                {["Jadwal Sidang", "Gugatan Perceraian", "Layanan Posbakum", "Formulir PPID"].map((suggestion) => (
                  <button
                    key={suggestion}
                    onClick={() => setQuery(suggestion)}
                    className="text-xs text-[#9A2109] bg-[#FFF1F1] hover:bg-[#FEE2E2] px-2.5 py-1 rounded-full font-medium transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Result items */}
          {results.length > 0 && (
            <div>
              <div className="px-5 py-2.5 bg-gray-50/70 flex items-center justify-between">
                <p className="text-xs font-bold text-gray-600 uppercase tracking-wide">
                  Hasil Terkait ({totalCount} item ditemukan)
                </p>
                <span className="text-[11px] text-gray-400">Tekan Enter untuk hasil lengkap</span>
              </div>

              {results.map((result) => {
                const IconComponent =
                  result.categoryKey === "jadwal" ? Calendar :
                  result.categoryKey === "berita" ? BookOpen :
                  FileText;

                return (
                  <button
                    key={result.id}
                    className="w-full flex items-start gap-3.5 px-5 py-3 hover:bg-gray-50 transition-colors text-left group"
                    onClick={() => handleSelectResult(result)}
                  >
                    <div
                      className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5"
                      style={{ backgroundColor: result.categoryBg, color: result.categoryColor }}
                    >
                      <IconComponent size={16} />
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span
                          className="text-[11px] font-bold px-2 py-0.5 rounded-md"
                          style={{ backgroundColor: result.categoryBg, color: result.categoryColor }}
                        >
                          {result.categoryLabel}
                        </span>
                        {result.isExternal && (
                          <span className="text-[10px] text-gray-400 flex items-center gap-0.5">
                            Eksternal <ExternalLink size={9} />
                          </span>
                        )}
                        {result.fileInfo && (
                          <span className="text-[10px] text-emerald-700 bg-emerald-50 px-1.5 py-0.2 rounded font-semibold">
                            {result.fileInfo.ext}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-900 text-sm font-semibold group-hover:text-[#9A2109] transition-colors line-clamp-1">
                        {result.title}
                      </p>
                      <p className="text-gray-500 text-xs line-clamp-1 mt-0.5">
                        {result.snippet}
                      </p>
                    </div>

                    <ArrowRight
                      size={15}
                      className="text-gray-300 group-hover:text-[#9A2109] group-hover:translate-x-0.5 transition-all flex-shrink-0 mt-2.5"
                    />
                  </button>
                );
              })}

              {/* View all full results CTA */}
              <div className="p-3 bg-gray-50 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                <p className="text-xs text-gray-600">
                  Ingin filter berdasarkan kategori atau unduh berkas?
                </p>
                <button
                  onClick={() => handleGoToFullSearch(query)}
                  className="inline-flex items-center justify-center gap-1.5 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-xs font-bold px-4 py-2 rounded-xl transition-all shadow-sm hover:shadow"
                >
                  Buka Halaman Pencarian Lengkap
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-gray-100 bg-gray-50 flex items-center justify-between text-xs text-gray-400">
          <span>Ketik kata kunci lalu tekan <strong>Enter</strong> untuk hasil penuh</span>
          <span>Tekan <strong>ESC</strong> untuk menutup</span>
        </div>
      </div>
    </div>
  );
}
