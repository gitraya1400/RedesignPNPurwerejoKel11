import { useState, useRef, useEffect } from "react";
import { Search, X, Loader2, ArrowRight, BookOpen, FileText } from "lucide-react";

const mockResults = [
  { type: "berita", title: "PN Purworejo Raih Predikat WBK 2024", category: "Berita" },
  { type: "layanan", title: "Jadwal Sidang Minggu Ini", category: "Layanan" },
  { type: "pengumuman", title: "Pengumuman CPNS Tenaga Teknis 2025", category: "Pengumuman" },
  { type: "berita", title: "Peluncuran Fitur e-Court Terbaru", category: "Berita" },
  { type: "layanan", title: "Cara Mendaftar Bantuan Hukum", category: "Panduan" },
];

interface SearchOverlayProps {
  open: boolean;
  onClose: () => void;
}

export function SearchOverlay({ open, onClose }: SearchOverlayProps) {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<typeof mockResults>([]);
  const [searched, setSearched] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery("");
      setResults([]);
      setSearched(false);
    }
  }, [open]);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setSearched(false);
      setLoading(false);
      return;
    }
    setLoading(true);
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const filtered = mockResults.filter((r) =>
        r.title.toLowerCase().includes(query.toLowerCase())
      );
      setResults(filtered);
      setSearched(true);
      setLoading(false);
    }, 500);
  }, [query]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[90] flex items-start justify-center pt-20 px-4"
      style={{ backgroundColor: "rgba(15,23,42,0.7)", backdropFilter: "blur(6px)" }}
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Input row */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-gray-100">
          <Search size={18} className="text-gray-600 flex-shrink-0" />
          <input aria-label="Input"
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari berita, layanan, pengumuman..."
            className="flex-1 text-gray-800 placeholder-gray-400 outline-none bg-transparent"
            style={{ fontSize: "1rem" }}
          />
          {loading ? (
            <Loader2 size={18} className="text-[#9A2109] animate-spin flex-shrink-0" />
          ) : query ? (
            <button aria-label="Aksi"
              onClick={() => setQuery("")}
              className="text-gray-600 hover:text-gray-600 transition-colors"
            >
              <X size={18} />
            </button>
          ) : null}
        </div>

        {/* Results */}
        <div className="max-h-96 overflow-y-auto">
          {!query && (
            <div className="p-6 text-center">
              <p className="text-gray-600 text-sm">Ketik kata kunci untuk mencari konten</p>
            </div>
          )}

          {searched && results.length === 0 && (
            <div className="flex flex-col items-center py-12 gap-3">
              <div className="w-16 h-16 rounded-2xl bg-gray-100 flex items-center justify-center">
                <Search size={24} className="text-gray-300" />
              </div>
              <p className="text-gray-700 text-sm" style={{ fontWeight: 600 }}>
                Hasil tidak ditemukan
              </p>
              <p className="text-gray-600 text-sm text-center max-w-xs">
                Maaf, hasil untuk "{query}" tidak ditemukan. Coba periksa ejaan kata atau gunakan kata kunci yang lebih umum.
              </p>
            </div>
          )}

          {results.length > 0 && (
            <div>
              <p className="px-4 pt-3 pb-1 text-sm text-gray-600" style={{ fontWeight: 600 }}>
                HASIL PENCARIAN — {results.length} ditemukan
              </p>
              {results.map((result, i) => (
                <button aria-label="Aksi"
                  key={i}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors text-left group"
                  onClick={onClose}
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                    {result.type === "berita" ? (
                      <BookOpen size={16} className="text-[#9A2109]" />
                    ) : (
                      <FileText size={16} className="text-[#9A2109]" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      className="text-gray-800 text-sm group-hover:text-[#9A2109] transition-colors"
                      style={{ fontWeight: 600 }}
                    >
                      {result.title}
                    </p>
                    <p className="text-gray-600 text-sm">{result.category}</p>
                  </div>
                  <ArrowRight size={14} className="text-gray-300 group-hover:text-[#9A2109] transition-colors flex-shrink-0" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2.5 border-t border-gray-50 flex items-center justify-between">
          <p className="text-gray-300 text-sm">Tekan ESC untuk menutup</p>
          <p className="text-gray-300 text-sm">PN Purworejo Search</p>
        </div>
      </div>
    </div>
  );
}
