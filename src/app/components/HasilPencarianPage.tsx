import { useState, useEffect, useMemo } from "react";
import { Link, useSearchParams } from "react-router";
import {
  Search, X, ChevronRight, FileText, Download, Newspaper,
  Clock, Eye, ArrowRight, ChevronLeft, MessageCircle, HelpCircle,
  Lightbulb, Calendar, ExternalLink, SlidersHorizontal, CheckCircle2
} from "lucide-react";
import {
  searchContent,
  searchCategories,
  getDidYouMeanSuggestions,
  SearchResultItem
} from "../data/searchData";

function highlight(text: string, query: string) {
  if (!query || !query.trim()) return <>{text}</>;
  const trimmed = query.trim();
  const words = trimmed.split(/\s+/).filter(w => w.length > 1);
  if (words.length === 0) return <>{text}</>;

  const escaped = words.map(w => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|");
  const regex = new RegExp(`(${escaped})`, "gi");
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[#FEF08A] text-[#1E293B] rounded-sm px-1 font-semibold not-italic">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

export function HasilPencarianPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") ?? "Gugatan Perceraian";

  const [inputVal, setInputVal] = useState(initialQuery);
  const [activeQuery, setActiveQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [sortBy, setSortBy] = useState<"relevance" | "title" | "category">("relevance");
  const [page, setPage] = useState(1);
  const pageSize = 5;

  // Sync state if URL search query changes
  useEffect(() => {
    const q = searchParams.get("q");
    if (q !== null && q !== activeQuery) {
      setInputVal(q);
      setActiveQuery(q);
      setPage(1);
    }
  }, [searchParams]);

  const handleSearchSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    const clean = inputVal.trim();
    setActiveQuery(clean);
    setPage(1);
    setSearchParams(clean ? { q: clean } : {});
  };

  const handleClear = () => {
    setInputVal("");
    setActiveQuery("");
    setPage(1);
    setSearchParams({});
  };

  const handleQuickKeyword = (kw: string) => {
    setInputVal(kw);
    setActiveQuery(kw);
    setPage(1);
    setSearchParams({ q: kw });
  };

  // Perform search
  const { results: rawResults, totalMatches, timeTakenMs } = useMemo(() => {
    return searchContent(activeQuery, activeCategory);
  }, [activeQuery, activeCategory]);

  // Dynamic counts for each category chip
  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    for (const cat of searchCategories) {
      const res = searchContent(activeQuery, cat.key);
      counts[cat.key] = res.totalMatches;
    }
    return counts;
  }, [activeQuery]);

  // Sort results
  const sortedResults = useMemo(() => {
    const items = [...rawResults];
    if (sortBy === "title") {
      items.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortBy === "category") {
      items.sort((a, b) => a.categoryLabel.localeCompare(b.categoryLabel));
    }
    return items;
  }, [rawResults, sortBy]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedResults.length / pageSize));
  const paginatedResults = useMemo(() => {
    const start = (page - 1) * pageSize;
    return sortedResults.slice(start, start + pageSize);
  }, [sortedResults, page, pageSize]);

  // Suggestions
  const suggestions = useMemo(() => {
    return getDidYouMeanSuggestions(activeQuery);
  }, [activeQuery]);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-8 pt-24 pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-5">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">Beranda</Link>
            <ChevronRight size={12} />
            <span className="text-[#9A2109] font-semibold">Hasil Pencarian</span>
          </nav>

          {/* Big search bar form */}
          <form onSubmit={handleSearchSubmit} className="relative mb-4">
            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A2109]" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              aria-label="Cari informasi, jadwal, formulir di Pengadilan Negeri Purworejo"
              className="w-full pl-14 pr-28 sm:pr-32 py-4 text-base border-2 border-[#9A2109] rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-[#9A2109]/10 text-[#1E293B] shadow-sm transition-all"
              placeholder="Cari jadwal sidang, biaya perkara, formulir, ppid, posbakum..."
            />
            {inputVal && (
              <button
                type="button"
                aria-label="Hapus kata kunci"
                onClick={handleClear}
                className="absolute right-20 sm:right-24 top-1/2 -translate-y-1/2 w-7 h-7 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
              >
                <X size={14} />
              </button>
            )}
            <button
              type="submit"
              aria-label="Mulai pencarian"
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#9A2109] hover:bg-[#7A1A07] text-white px-4 sm:px-6 py-2.5 rounded-xl text-sm font-semibold transition-all shadow-sm active:scale-95"
            >
              Cari
            </button>
          </form>

          {/* Search meta info */}
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm text-[#64748B]">
            {activeQuery ? (
              <p>
                Menampilkan{" "}
                <strong className="text-[#1E293B]">{totalMatches} hasil pencarian</strong> untuk kata kunci{" "}
                <em className="text-[#9A2109] font-semibold not-italic">"{activeQuery}"</em>{" "}
                <span className="text-[#94A3B8]">(Ditemukan dalam {timeTakenMs / 1000} detik)</span>
              </p>
            ) : (
              <p>
                Menampilkan seluruh dokumen dan layanan resmi{" "}
                <strong className="text-[#1E293B]">({totalMatches} item tersedia)</strong>
              </p>
            )}

            {/* Sorting control */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal size={14} className="text-[#64748B]" />
              <span className="text-xs font-medium">Urutkan:</span>
              <select
                aria-label="Urutkan hasil pencarian"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs font-semibold bg-[#F8FAFC] border border-[#E2E8F0] rounded-lg px-2.5 py-1 text-[#334155] focus:outline-none focus:border-[#9A2109]"
              >
                <option value="relevance">Paling Relevan</option>
                <option value="title">Judul (A - Z)</option>
                <option value="category">Kategori</option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 py-6 sm:py-8">
        {/* "Did you mean" / Search Suggestions */}
        {suggestions.length > 0 && activeQuery && (
          <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-start gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center flex-shrink-0 mt-0.5">
              <Lightbulb size={16} className="text-[#B45309]" />
            </div>
            <div>
              <p className="text-xs font-bold text-[#92400E] uppercase tracking-wide mb-1.5">
                Apakah yang Anda maksud?
              </p>
              <div className="flex flex-wrap gap-2">
                {suggestions.map((sug) => (
                  <button
                    key={sug}
                    onClick={() => handleQuickKeyword(sug)}
                    className="text-xs text-[#B45309] bg-white border border-[#FDE68A] hover:border-[#F59E0B] hover:bg-[#FEF3C7] px-3 py-1.5 rounded-full font-medium transition-all shadow-2xs hover:shadow-xs"
                  >
                    {sug} →
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-7">
          {searchCategories.map((chip) => {
            const isCurrent = activeCategory === chip.key;
            const count = categoryCounts[chip.key] ?? 0;

            return (
              <button
                key={chip.key}
                onClick={() => {
                  setActiveCategory(chip.key);
                  setPage(1);
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                  isCurrent
                    ? "bg-[#9A2109] text-white border-[#9A2109] shadow-sm"
                    : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#9A2109] hover:text-[#9A2109]"
                }`}
              >
                {chip.label}
                <span
                  className={`text-xs px-2 py-0.5 rounded-full font-bold transition-colors ${
                    isCurrent ? "bg-white/20 text-white" : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Main layout: results + sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 lg:gap-8 items-start">
          {/* Results list */}
          <div className="space-y-4">
            {/* Empty State */}
            {paginatedResults.length === 0 && (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-10 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-amber-50 flex items-center justify-center mx-auto mb-4">
                  <HelpCircle size={32} className="text-amber-600" />
                </div>
                <h2 className="text-lg font-bold text-[#1E293B] mb-2">
                  Tidak Ada Hasil yang Cocok
                </h2>
                <p className="text-sm text-[#64748B] max-w-md mx-auto leading-relaxed mb-6">
                  Tidak ditemukan konten untuk kata kunci <strong>"{activeQuery}"</strong> pada kategori yang dipilih.
                  Coba periksa ejaan, gunakan kata yang lebih umum, atau klik salah satu kata kunci populer di bawah ini.
                </p>
                <div className="flex flex-wrap justify-center gap-2 max-w-lg mx-auto">
                  {["Jadwal Sidang", "Gugatan Perceraian", "Posbakum", "Formulir PPID", "Biaya Perkara"].map((kw) => (
                    <button
                      key={kw}
                      onClick={() => handleQuickKeyword(kw)}
                      className="text-xs font-semibold px-3 py-1.5 rounded-full bg-[#FFF1F1] text-[#9A2109] hover:bg-[#9A2109] hover:text-white transition-all border border-[#FECACA]"
                    >
                      {kw}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Result items */}
            {paginatedResults.map((r) => {
              const IconComp =
                r.categoryKey === "jadwal" ? Calendar :
                r.categoryKey === "berita" ? Newspaper :
                FileText;

              return (
                <div
                  key={r.id}
                  className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:border-[#9A2109] hover:shadow-md transition-all group"
                >
                  {/* Category + type icon */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2.5">
                      <span
                        className="text-xs font-bold px-2.5 py-1 rounded-full"
                        style={{ background: r.categoryBg, color: r.categoryColor }}
                      >
                        {r.categoryLabel}
                      </span>
                      {r.fileInfo && (
                        <span className="text-xs text-[#15803D] bg-[#DCFCE7] px-2 py-0.5 rounded-full font-bold flex items-center gap-1">
                          {r.fileInfo.ext} • {r.fileInfo.size}
                        </span>
                      )}
                      {r.isExternal && (
                        <span className="text-xs text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium flex items-center gap-1">
                          Portal Luar <ExternalLink size={11} />
                        </span>
                      )}
                    </div>
                    <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                      <IconComp size={15} className="text-[#64748B]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h2 className="text-base font-bold text-[#1E293B] group-hover:text-[#9A2109] transition-colors mb-2 leading-snug">
                    {r.isExternal ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5"
                      >
                        {highlight(r.title, activeQuery)}
                        <ExternalLink size={13} className="opacity-60" />
                      </a>
                    ) : (
                      <Link to={r.url}>
                        {highlight(r.title, activeQuery)}
                      </Link>
                    )}
                  </h2>

                  {/* Snippet */}
                  {r.snippet && (
                    <p className="text-sm text-[#475569] leading-relaxed mb-4 line-clamp-3">
                      {highlight(r.snippet, activeQuery)}
                    </p>
                  )}

                  {/* Bottom row */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[#F1F5F9]">
                    <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                      <Clock size={12} />
                      {r.meta}
                    </div>

                    {r.fileInfo ? (
                      <a
                        href={r.url}
                        download
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-[#DCFCE7] hover:bg-[#BBF7D0] px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Download size={13} />
                        {r.ctaLabel ?? `Unduh Berkas (${r.fileInfo.ext})`}
                      </a>
                    ) : r.isExternal ? (
                      <a
                        href={r.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#1D4ED8] bg-[#DBEAFE] hover:bg-[#BFDBFE] px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        {r.ctaLabel ?? "Buka Layanan"}
                        <ExternalLink size={12} />
                      </a>
                    ) : (
                      <Link
                        to={r.url}
                        className="inline-flex items-center gap-1.5 text-xs font-bold text-[#9A2109] hover:bg-[#FFF1F1] px-3.5 py-1.5 rounded-lg transition-colors"
                      >
                        <Eye size={13} />
                        {r.ctaLabel ?? "Lihat Selengkapnya"}
                        <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between pt-6 border-t border-gray-100">
                <button
                  disabled={page === 1}
                  onClick={() => {
                    setPage(p => Math.max(1, p - 1));
                    window.scrollTo({ top: 150, behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#9A2109] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft size={16} />
                  Sebelumnya
                </button>

                <div className="flex items-center gap-1.5">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                    <button
                      key={p}
                      onClick={() => {
                        setPage(p);
                        window.scrollTo({ top: 150, behavior: "smooth" });
                      }}
                      className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                        p === page
                          ? "bg-[#9A2109] text-white shadow-sm"
                          : "text-[#475569] hover:bg-[#F1F5F9]"
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>

                <button
                  disabled={page === totalPages}
                  onClick={() => {
                    setPage(p => Math.min(totalPages, p + 1));
                    window.scrollTo({ top: 150, behavior: "smooth" });
                  }}
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#9A2109] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                >
                  Selanjutnya
                  <ChevronRight size={16} />
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 space-y-5">
            {/* Help desk fallback */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F1] flex items-center justify-center mb-3">
                <HelpCircle size={18} className="text-[#9A2109]" />
              </div>
              <p className="text-sm font-bold text-[#1E293B] mb-1">Butuh Panduan Langsung?</p>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                Petugas Meja Informasi & PTSP PN Purworejo siap membantu Anda menemukan layanan yang tepat.
              </p>
              <div className="space-y-2">
                <a
                  href="https://wa.me/628120000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors"
                >
                  <MessageCircle size={14} />
                  WhatsApp Meja Informasi PTSP
                </a>
                <Link
                  to="/hubungi/posbakum"
                  className="w-full flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#475569] hover:border-[#9A2109] hover:text-[#9A2109] text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
                >
                  Konsultasi POSBAKUM Gratis
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Popular searches */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold text-[#1E293B] uppercase tracking-wider mb-3">
                Pencarian Terpopuler
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Jadwal Sidang",
                  "Gugatan Perceraian",
                  "Biaya Perkara",
                  "Formulir PPID",
                  "Posbakum",
                  "e-Court",
                  "Tilang",
                  "Prodeo",
                  "SIPP Online",
                  "Eraterang",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => handleQuickKeyword(tag)}
                    className="text-xs text-[#475569] bg-[#F1F5F9] hover:bg-[#FFF1F1] hover:text-[#9A2109] border border-[#E2E8F0] hover:border-[#FECACA] px-2.5 py-1.5 rounded-full font-medium transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links to real portals */}
            <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] rounded-2xl p-5 text-white shadow-md">
              <p className="text-xs font-bold uppercase tracking-wider text-white/70 mb-3">
                Layanan Utama Pengadilan
              </p>
              <div className="space-y-1">
                {[
                  { label: "Jadwal Sidang Harian", href: "/jadwal-sidang", isExternal: false },
                  { label: "Lacak Perkara (SIPP)", href: "https://sipp.pn-purworejo.go.id/", isExternal: true },
                  { label: "Daftar Perkara via e-Court", href: "https://ecourt.mahkamahagung.go.id/", isExternal: true },
                  { label: "Formulir Permohonan PPID", href: "/formulir/ppid", isExternal: false },
                  { label: "Bantuan Hukum POSBAKUM", href: "/hubungi/posbakum", isExternal: false },
                ].map(({ label, href, isExternal }) =>
                  isExternal ? (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between py-2 border-b border-white/10 last:border-0 text-xs text-white/85 hover:text-white transition-colors group"
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-[#F9C784]" />
                        {label}
                      </span>
                      <ExternalLink size={11} className="text-white/40 group-hover:text-[#F9C784] transition-colors" />
                    </a>
                  ) : (
                    <Link
                      key={label}
                      to={href}
                      className="flex items-center justify-between py-2 border-b border-white/10 last:border-0 text-xs text-white/85 hover:text-white transition-colors group"
                    >
                      <span className="flex items-center gap-1.5">
                        <CheckCircle2 size={12} className="text-[#F9C784]" />
                        {label}
                      </span>
                      <ArrowRight size={11} className="text-white/40 group-hover:text-[#F9C784] transition-colors" />
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
