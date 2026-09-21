import { useState } from "react";
import { Link } from "react-router";
import {
  Search, X, ChevronRight, FileText, Download, Newspaper,
  Clock, Eye, ArrowRight, ChevronLeft, MessageCircle, HelpCircle,
  Lightbulb
} from "lucide-react";

const filterChips = [
  { label: "Semua Kategori", count: 18 },
  { label: "Panduan Layanan", count: 6 },
  { label: "Jadwal & Putusan Perkara", count: 8 },
  { label: "Formulir & Dokumen Unduhan", count: 3 },
  { label: "Berita & Pengumuman", count: 1 },
];

type ResultCard = {
  type: "panduan" | "dokumen" | "berita";
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  title: string;
  snippet?: string;
  meta: string;
  fileInfo?: { ext: string; size: string };
  ctaLabel?: string;
  icon: React.ElementType;
};

function highlight(text: string, keyword: string) {
  if (!keyword) return <>{text}</>;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
  const parts = text.split(regex);
  return (
    <>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-[#FEF08A] text-[#1E293B] rounded-sm px-0.5 not-italic font-medium">
            {part}
          </mark>
        ) : (
          part
        )
      )}
    </>
  );
}

const results: ResultCard[] = [
  {
    type: "panduan",
    categoryLabel: "Layanan Perdata",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    title: "Prosedur & Syarat Pengajuan Gugatan Perceraian Non-Muslim",
    snippet:
      "Penggugat wajib menyerahkan surat gugatan rangkap 5 disertai fotokopi akta perkawinan yang dilegalisasi meterai. Pendaftaran dapat dilakukan via e-Court atau Meja PTSP. Proses gugatan perceraian Non-Muslim di PN Purworejo dilaksanakan sesuai ketentuan Hukum Perdata umum.",
    meta: "Diperbarui: 15 Januari 2026 • Estimasi Waktu: 5 Menit Baca",
    icon: FileText,
  },
  {
    type: "dokumen",
    categoryLabel: "Formulir PTSP",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    title: "Formulir Surat Kuasa Khusus Perkara Perdata Gugatan",
    snippet: undefined,
    meta: "Diperbarui: 10 Maret 2026",
    fileInfo: { ext: "DOCX", size: "180 KB" },
    ctaLabel: "Unduh Format Blangko (.DOCX)",
    icon: Download,
  },
  {
    type: "berita",
    categoryLabel: "Pengumuman",
    categoryColor: "#1D4ED8",
    categoryBg: "#DBEAFE",
    title: "Pembaruan Radius Biaya Panggilan Perkara Perdata Wilayah Purworejo 2026",
    snippet:
      "Rincian biaya panjar perkara gugatan dan radius wilayah kecamatan Kabupaten Purworejo telah disesuaikan dengan SK Ketua PN terbaru. Perubahan ini berlaku efektif mulai 1 Februari 2026 untuk seluruh gugatan perceraian dan perkara perdata.",
    meta: "Dipublikasikan: 28 Januari 2026 • Oleh: PTSP PN Purworejo",
    icon: Newspaper,
  },
];

export function HasilPencarianPage() {
  const [query, setQuery] = useState("Gugatan Perceraian");
  const [inputVal, setInputVal] = useState("Gugatan Perceraian");
  const [activeChip, setActiveChip] = useState(0);
  const [page, setPage] = useState(1);

  const doSearch = () => setQuery(inputVal);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Search Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-6">
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B] mb-5">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">Beranda</Link>
            <ChevronRight size={12} />
            <span className="text-[#9A2109] font-semibold">Hasil Pencarian</span>
          </nav>

          {/* Big search bar */}
          <div className="relative mb-4">
            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-[#9A2109]" />
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && doSearch()}
              className="w-full pl-14 pr-14 py-4 text-base border-2 border-[#9A2109] rounded-2xl bg-white focus:outline-none focus:ring-4 focus:ring-[#9A2109]/10 text-[#1E293B] shadow-sm"
              placeholder="Cari informasi, jadwal, formulir..."
            />
            {inputVal && (
              <button
                onClick={() => { setInputVal(""); setQuery(""); }}
                className="absolute right-14 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
              >
                <X size={13} />
              </button>
            )}
            <button
              onClick={doSearch}
              className="absolute right-3 top-1/2 -translate-y-1/2 bg-[#9A2109] hover:bg-[#7A1A07] text-white px-4 py-2 rounded-xl text-sm font-semibold transition-colors"
            >
              Cari
            </button>
          </div>

          {query && (
            <p className="text-sm text-[#64748B]">
              Menampilkan{" "}
              <strong className="text-[#1E293B]">18 hasil pencarian</strong> untuk kata kunci{" "}
              <em className="text-[#9A2109] font-semibold not-italic">"{query}"</em>{" "}
              <span className="text-[#94A3B8]">(Ditemukan dalam 0.08 detik)</span>
            </p>
          )}
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* "Did you mean" */}
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-2xl p-4 flex items-start gap-3 mb-6">
          <div className="w-8 h-8 rounded-lg bg-[#FEF3C7] flex items-center justify-center flex-shrink-0">
            <Lightbulb size={15} className="text-[#B45309]" />
          </div>
          <div>
            <p className="text-xs font-bold text-[#92400E] uppercase tracking-wide mb-1">Apakah yang Anda maksud?</p>
            <div className="flex flex-wrap gap-2">
              {["Prosedur Gugatan Sederhana", "Biaya Panjar Perkara"].map((sug) => (
                <button
                  key={sug}
                  onClick={() => { setInputVal(sug); setQuery(sug); }}
                  className="text-sm text-[#B45309] bg-white border border-[#FDE68A] hover:border-[#F59E0B] hover:bg-[#FEF3C7] px-3 py-1 rounded-full font-medium transition-all"
                >
                  {sug} →
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filter chips */}
        <div className="flex flex-wrap gap-2 mb-7">
          {filterChips.map((chip, i) => (
            <button
              key={chip.label}
              onClick={() => setActiveChip(i)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                activeChip === i
                  ? "bg-[#9A2109] text-white border-[#9A2109] shadow-sm"
                  : "bg-white text-[#475569] border-[#E2E8F0] hover:border-[#9A2109] hover:text-[#9A2109]"
              }`}
            >
              {chip.label}
              <span className={`text-[11px] px-1.5 py-0.5 rounded-full font-bold ${
                activeChip === i ? "bg-white/20" : "bg-[#F1F5F9]"
              }`}>
                {chip.count}
              </span>
            </button>
          ))}
        </div>

        {/* Main layout: results + sidebar */}
        <div className="grid grid-cols-[1fr_300px] gap-8 items-start">
          {/* Results list */}
          <div className="space-y-4">
            {results.map((r, i) => (
              <div
                key={i}
                className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] hover:border-[#9A2109] hover:shadow-md transition-all group"
              >
                {/* Category + type icon */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className="text-[11px] font-bold px-2.5 py-1 rounded-full"
                      style={{ background: r.categoryBg, color: r.categoryColor }}
                    >
                      {r.categoryLabel}
                    </span>
                    {r.type === "dokumen" && r.fileInfo && (
                      <span className="text-[11px] text-[#64748B] bg-[#F1F5F9] px-2 py-0.5 rounded-full font-medium">
                        PDF • {r.fileInfo.size}
                      </span>
                    )}
                  </div>
                  <div className="w-8 h-8 rounded-lg bg-[#F8FAFC] flex items-center justify-center">
                    <r.icon size={14} className="text-[#94A3B8]" />
                  </div>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-[#1E293B] group-hover:text-[#9A2109] transition-colors mb-2 leading-snug">
                  {highlight(r.title, query)}
                </h3>

                {/* Snippet */}
                {r.snippet && (
                  <p className="text-sm text-[#475569] leading-relaxed mb-3 line-clamp-3">
                    ...{highlight(r.snippet, query)}
                  </p>
                )}

                {/* Bottom row */}
                <div className="flex items-center justify-between pt-3 border-t border-[#F1F5F9]">
                  <div className="flex items-center gap-1.5 text-xs text-[#94A3B8]">
                    <Clock size={11} />
                    {r.meta}
                  </div>
                  {r.type === "dokumen" ? (
                    <a
                      href="#"
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-[#15803D] bg-[#DCFCE7] hover:bg-[#BBF7D0] px-3 py-1.5 rounded-lg transition-colors"
                    >
                      <Download size={12} />
                      {r.ctaLabel}
                    </a>
                  ) : (
                    <button className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#9A2109] hover:bg-[#FFF1F1] px-3 py-1.5 rounded-lg transition-colors">
                      <Eye size={12} />
                      Baca Selengkapnya
                      <ArrowRight size={11} />
                    </button>
                  )}
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex items-center justify-between pt-4">
              <button
                disabled={page === 1}
                onClick={() => setPage(p => Math.max(1, p - 1))}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#9A2109] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft size={15} />
                Sebelumnya
              </button>

              <div className="flex items-center gap-1">
                {[1, 2, 3, "...", 6].map((p, i) => (
                  <button
                    key={i}
                    onClick={() => typeof p === "number" && setPage(p)}
                    className={`w-9 h-9 rounded-xl text-sm font-semibold transition-all ${
                      p === page
                        ? "bg-[#9A2109] text-white shadow-sm"
                        : p === "..."
                        ? "text-[#94A3B8] cursor-default"
                        : "text-[#475569] hover:bg-[#F1F5F9]"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setPage(p => p + 1)}
                className="flex items-center gap-1.5 text-sm font-semibold text-[#64748B] hover:text-[#9A2109] transition-colors"
              >
                Selanjutnya
                <ChevronRight size={15} />
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sticky top-24 space-y-5">
            {/* Not found fallback */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F1] flex items-center justify-center mb-3">
                <HelpCircle size={18} className="text-[#9A2109]" />
              </div>
              <p className="text-sm font-bold text-[#1E293B] mb-1">Tidak menemukan yang dicari?</p>
              <p className="text-xs text-[#64748B] leading-relaxed mb-4">
                Hubungi Petugas PTSP via Layanan Chat Online atau Layanan POSBAKUM PN Purworejo.
              </p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-xs font-bold px-4 py-2.5 rounded-full transition-colors">
                  <MessageCircle size={13} />
                  Layanan Chat PTSP Online
                </button>
                <Link
                  to="/hubungi/posbakum"
                  className="flex items-center justify-center gap-2 border border-[#E2E8F0] text-[#475569] hover:border-[#9A2109] hover:text-[#9A2109] text-xs font-semibold px-4 py-2.5 rounded-full transition-all"
                >
                  Konsultasi POSBAKUM Gratis
                  <ArrowRight size={12} />
                </Link>
              </div>
            </div>

            {/* Popular searches */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <p className="text-xs font-bold text-[#1E293B] uppercase tracking-wide mb-4">Pencarian Populer</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Biaya Panjar Perkara",
                  "Jadwal Sidang Hari Ini",
                  "Formulir PPID",
                  "POSBAKUM Gratis",
                  "Prosedur Eksekusi",
                  "Gugatan Sederhana",
                  "e-Court Daftar",
                ].map((tag) => (
                  <button
                    key={tag}
                    onClick={() => { setInputVal(tag); setQuery(tag); }}
                    className="text-xs text-[#475569] bg-[#F1F5F9] hover:bg-[#FFF1F1] hover:text-[#9A2109] border border-[#E2E8F0] hover:border-[#FECACA] px-2.5 py-1.5 rounded-full font-medium transition-all"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick links */}
            <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] rounded-2xl p-5 text-white">
              <p className="text-xs font-bold uppercase tracking-wide text-white/60 mb-3">Layanan Cepat</p>
              {[
                { label: "Cek Status Perkara (SIPP)", href: "https://sipp.pn-cikarang.go.id/" },
                { label: "Daftar Perkara via e-Court", href: "https://ecourt.mahkamahagung.go.id/" },
                { label: "Formulir PPID Online", href: "/formulir/ppid" },
                { label: "Jadwal Sidang Hari Ini", href: "/jadwal-sidang" },
              ].map(({ label, href }) =>
                href.startsWith("/") ? (
                  <Link
                    key={label}
                    to={href}
                    className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0 text-sm text-white/80 hover:text-white transition-colors group"
                  >
                    <span>{label}</span>
                    <ArrowRight size={13} className="text-white/40 group-hover:text-[#F9C784] transition-colors" />
                  </Link>
                ) : (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between py-2.5 border-b border-white/10 last:border-0 text-sm text-white/80 hover:text-white transition-colors group"
                  >
                    <span>{label}</span>
                    <ArrowRight size={13} className="text-white/40 group-hover:text-[#F9C784] transition-colors" />
                  </a>
                )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
