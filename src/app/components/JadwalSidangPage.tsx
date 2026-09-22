import { useState } from "react";
import { Link } from "react-router";
import {
  Search, Calendar, ChevronDown, X, Filter, RefreshCw,
  Clock, Building2, User, FileText, Eye, AlertCircle,
  CheckCircle2, TimerIcon, XCircle, ChevronRight
} from "lucide-react";

const statusConfig = {
  "Sedang Berlangsung": {
    bg: "#DCFCE7", text: "#15803D", dot: "#22C55E", pulse: true,
  },
  "Menunggu Giliran": {
    bg: "#FEF3C7", text: "#B45309", dot: "#F59E0B", pulse: false,
  },
  "Selesai": {
    bg: "#F1F5F9", text: "#475569", dot: "#94A3B8", pulse: false,
  },
  "Ditunda": {
    bg: "#FEE2E2", text: "#B91C1C", dot: "#EF4444", pulse: false,
  },
} as const;

type StatusKey = keyof typeof statusConfig;

const scheduleData = [
  {
    id: 1,
    waktu: "09:00 WIB",
    noPerkara: "24/Pid.B/2026/PN Pwr",
    klasifikasi: "Pidana Biasa",
    ruang: "Ruang Cakra",
    majelis: "Ketua: H. Santoso, S.H., M.H.",
    agenda: "Pemeriksaan Saksi Mahkota",
    status: "Sedang Berlangsung" as StatusKey,
    terdakwa: "Rizal Firmansyah",
    jpu: "Andi Setiawan, S.H. (Kejari Purworejo)",
    panitera: "Siti Rahayu, S.H.",
    riwayat: "Sidang sebelumnya (14 Sep 2026) ditunda karena saksi tidak hadir.",
    kehadiran: "Terdakwa hadir, JPU hadir, PH hadir.",
  },
  {
    id: 2,
    waktu: "10:30 WIB",
    noPerkara: "41/Pdt.G/2026/PN Pwr",
    klasifikasi: "Perdata Gugatan",
    ruang: "Ruang Kartika",
    majelis: "Ketua: Rina Wijayanti, S.H.",
    agenda: "Mediasi Pertama",
    status: "Menunggu Giliran" as StatusKey,
    terdakwa: "PT. Bumi Makmur (Penggugat)",
    jpu: "Kuasa Hukum: Beni Susanto, S.H.",
    panitera: "Dodi Hartono, S.H.",
    riwayat: "Perkara baru didaftarkan 10 Sep 2026.",
    kehadiran: "Menunggu konfirmasi kehadiran para pihak.",
  },
  {
    id: 3,
    waktu: "11:00 WIB",
    noPerkara: "18/Pdt.P/2026/PN Pwr",
    klasifikasi: "Permohonan",
    ruang: "Ruang Tirta",
    majelis: "Hakim Tunggal: Budi Hartono, S.H.",
    agenda: "Pembacaan Penetapan Akta",
    status: "Menunggu Giliran" as StatusKey,
    terdakwa: "Suwarno (Pemohon)",
    jpu: "Tanpa kuasa hukum",
    panitera: "Anisa Dewi, S.H.",
    riwayat: "Diajukan 8 Sep 2026, berkas lengkap.",
    kehadiran: "Pemohon dikonfirmasi hadir.",
  },
  {
    id: 4,
    waktu: "08:30 WIB",
    noPerkara: "15/Pid.Sus/2026/PN Pwr",
    klasifikasi: "Pidana Khusus",
    ruang: "Ruang Cakra",
    majelis: "Ketua: H. Santoso, S.H., M.H.",
    agenda: "Pembacaan Dakwaan JPU",
    status: "Selesai" as StatusKey,
    terdakwa: "Muhamad Fauzi",
    jpu: "Sri Wahyuni, S.H. (Kejari Purworejo)",
    panitera: "Siti Rahayu, S.H.",
    riwayat: "Sidang berjalan sesuai jadwal.",
    kehadiran: "Semua pihak hadir.",
  },
  {
    id: 5,
    waktu: "13:00 WIB",
    noPerkara: "09/Pid.C/2026/PN Pwr",
    klasifikasi: "Tindak Pidana Ringan",
    ruang: "Ruang Kartika",
    majelis: "Hakim: Tri Wibowo, S.H.",
    agenda: "Sidang Putusan Tilang",
    status: "Menunggu Giliran" as StatusKey,
    terdakwa: "Agus Purnomo",
    jpu: "Polri (tanpa JPU formal)",
    panitera: "Rahma Sari, S.H.",
    riwayat: "Sidang pertama, langsung putusan.",
    kehadiran: "Terdakwa dipanggil resmi.",
  },
];

function StatusBadge({ status }: { status: StatusKey }) {
  const cfg = statusConfig[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-semibold whitespace-nowrap"
      style={{ background: cfg.bg, color: cfg.text }}
    >
      <span className="relative flex h-2 w-2">
        <span
          className="rounded-full h-2 w-2 flex-shrink-0"
          style={{ background: cfg.dot }}
        />
        {cfg.pulse && (
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ background: cfg.dot }}
          />
        )}
      </span>
      {status}
    </span>
  );
}

function DetailModal({ row, onClose }: { row: typeof scheduleData[0]; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[600px] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-[#F8FAFC]">
          <div>
            <p className="text-sm text-[#9A2109] font-semibold uppercase tracking-wider mb-0.5">Detail Perkara</p>
            <h2 className="text-base font-bold text-[#1E293B]">{row.noPerkara}</h2>
          </div>
          <button aria-label="Aksi"
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-[#F1F5F9] hover:bg-[#E2E8F0] text-[#64748B] transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: "Klasifikasi Perkara", value: row.klasifikasi, icon: FileText },
              { label: "Ruang Sidang", value: row.ruang, icon: Building2 },
              { label: "Waktu Sidang", value: row.waktu, icon: Clock },
              { label: "Agenda", value: row.agenda, icon: CheckCircle2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0]">
                <div className="flex items-center gap-2 mb-1">
                  <Icon size={13} className="text-[#9A2109]" />
                  <p className="text-sm text-[#64748B] font-semibold uppercase tracking-wide">{label}</p>
                </div>
                <p className="text-sm text-[#1E293B] font-medium">{value}</p>
              </div>
            ))}
          </div>

          <div className="space-y-3">
            {[
              { label: "Terdakwa / Para Pihak", value: row.terdakwa, icon: User },
              { label: "Jaksa Penuntut Umum / Kuasa Hukum", value: row.jpu, icon: User },
              { label: "Panitera Pengganti", value: row.panitera, icon: User },
              { label: "Riwayat Penundaan Sidang", value: row.riwayat, icon: TimerIcon },
              { label: "Catatan Kehadiran", value: row.kehadiran, icon: CheckCircle2 },
            ].map(({ label, value, icon: Icon }) => (
              <div key={label} className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <div className="w-7 h-7 rounded-lg bg-[#FFF1F1] flex items-center justify-center">
                    <Icon size={13} className="text-[#9A2109]" />
                  </div>
                </div>
                <div>
                  <p className="text-sm text-[#64748B] font-semibold uppercase tracking-wide mb-0.5">{label}</p>
                  <p className="text-sm text-[#1E293B]">{value}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
            <AlertCircle size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
            <p className="text-sm text-[#92400E] leading-relaxed">
              <strong>Perhatian:</strong> Jadwal dapat bergeser sewaktu-waktu sesuai dinamika persidangan di ruang sidang. Silakan konfirmasi ulang kepada petugas PTSP.
            </p>
          </div>
        </div>

        <div className="px-6 pb-5">
          <button aria-label="Aksi"
            onClick={onClose}
            className="w-full py-2.5 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-sm font-semibold rounded-full transition-colors"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 text-center">
      <div className="w-20 h-20 rounded-full bg-[#FFF1F1] flex items-center justify-center mb-5">
        <Search size={32} className="text-[#9A2109]" />
      </div>
      <h2 className="text-xl font-bold text-[#1E293B] mb-2">Jadwal Sidang Tidak Ditemukan</h2>
      <p className="text-sm text-[#64748B] max-w-sm leading-relaxed mb-6">
        Periksa kembali nomor perkara atau pastikan tanggal sidang yang Anda pilih benar. Coba ubah filter pencarian.
      </p>
      <button aria-label="Aksi"
        onClick={onReset}
        className="inline-flex items-center gap-2 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
      >
        <RefreshCw size={15} />
        Tampilkan Jadwal Hari Ini
      </button>
    </div>
  );
}

export function JadwalSidangPage() {
  const [searchVal, setSearchVal] = useState("");
  const [klasifikasi, setKlasifikasi] = useState("Semua Perkara");
  const [ruang, setRuang] = useState("Semua Ruangan");
  const [onlyUnfinished, setOnlyUnfinished] = useState(false);
  const [activeSearch, setActiveSearch] = useState("");
  const [activeKlasifikasi, setActiveKlasifikasi] = useState("Semua Perkara");
  const [activeRuang, setActiveRuang] = useState("Semua Ruangan");
  const [activeOnlyUnfinished, setActiveOnlyUnfinished] = useState(false);
  const [selectedRow, setSelectedRow] = useState<typeof scheduleData[0] | null>(null);

  const filtered = scheduleData.filter((row) => {
    const matchSearch =
      !activeSearch ||
      row.noPerkara.toLowerCase().includes(activeSearch.toLowerCase()) ||
      row.terdakwa.toLowerCase().includes(activeSearch.toLowerCase());
    const matchKlasifikasi =
      activeKlasifikasi === "Semua Perkara" ||
      row.klasifikasi === activeKlasifikasi ||
      (activeKlasifikasi === "Pidana Biasa" && row.klasifikasi === "Pidana Biasa") ||
      (activeKlasifikasi === "Perdata Gugatan" && row.klasifikasi === "Perdata Gugatan") ||
      (activeKlasifikasi === "Perdata Permohonan" && row.klasifikasi === "Permohonan") ||
      (activeKlasifikasi === "Pidana Ringan / Tilang" && row.klasifikasi === "Tindak Pidana Ringan");
    const matchRuang =
      activeRuang === "Semua Ruangan" ||
      (activeRuang === "Ruang Sidang Utama (Cakra)" && row.ruang === "Ruang Cakra") ||
      (activeRuang === "Ruang Sidang Kartika" && row.ruang === "Ruang Kartika") ||
      (activeRuang === "Ruang Sidang Tirta" && row.ruang === "Ruang Tirta");
    const matchUnfinished = !activeOnlyUnfinished || row.status !== "Selesai";
    return matchSearch && matchKlasifikasi && matchRuang && matchUnfinished;
  });

  const applyFilter = () => {
    setActiveSearch(searchVal);
    setActiveKlasifikasi(klasifikasi);
    setActiveRuang(ruang);
    setActiveOnlyUnfinished(onlyUnfinished);
  };

  const resetFilter = () => {
    setSearchVal("");
    setKlasifikasi("Semua Perkara");
    setRuang("Semua Ruangan");
    setOnlyUnfinished(false);
    setActiveSearch("");
    setActiveKlasifikasi("Semua Perkara");
    setActiveRuang("Semua Ruangan");
    setActiveOnlyUnfinished(false);
  };

  const cols = ["WAKTU", "NOMOR PERKARA", "KLASIFIKASI", "RUANG", "MAJELIS HAKIM", "AGENDA SIDANG", "STATUS", "AKSI"];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb + Page Title */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-5">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">Beranda</Link>
            <ChevronRight size={12} />
            <span className="hover:text-[#9A2109] cursor-pointer transition-colors">Layanan Publik</span>
            <ChevronRight size={12} />
            <span className="text-[#9A2109] font-semibold">Jadwal Sidang</span>
          </nav>

          <div className="flex items-start justify-between gap-6">
            <div>
              <h1 className="text-2xl font-bold text-[#1E293B] mb-2">Jadwal Persidangan Terbuka untuk Umum</h1>
              <p className="text-sm text-[#64748B] max-w-2xl leading-relaxed">
                Informasi jadwal sidang real-time yang terhubung dengan Sistem Informasi Penelusuran Perkara (SIPP) PN Purworejo.
              </p>
            </div>
            <div className="flex-shrink-0 flex items-center gap-2 bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-[#22C55E] opacity-75 animate-ping" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#22C55E]" />
              </span>
              Data SIPP Terupdate: Hari ini, Pukul 09:15 WIB
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-6">
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="grid grid-cols-4 gap-4 mb-5">
            {/* Search */}
            <div className="col-span-2 relative">
              <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]" />
              <input aria-label="Input"
                type="text"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Cari no. perkara atau nama para pihak (cth: 12/Pid.B/2026/PN Pwr)..."
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10 text-[#1E293B] placeholder:text-[#94A3B8] transition-all"
              />
            </div>
            {/* Klasifikasi */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Klasifikasi Perkara</label>
              <div className="relative">
                <select
                  value={klasifikasi}
                  onChange={(e) => setKlasifikasi(e.target.value)}
                  className="w-full appearance-none py-2.5 pl-3 pr-8 text-sm border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10 text-[#1E293B] transition-all"
                >
                  {["Semua Perkara", "Pidana Biasa", "Pidana Ringan / Tilang", "Perdata Gugatan", "Perdata Permohonan"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>
            {/* Tanggal */}
            <div className="relative">
              <label className="block text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Tanggal Sidang</label>
              <div className="relative">
                <Calendar size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9A2109]" />
                <input aria-label="Input"
                  type="text"
                  defaultValue="Hari Ini (21 September 2026)"
                  readOnly
                  className="w-full pl-9 pr-4 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10 text-[#1E293B] cursor-pointer transition-all"
                />
              </div>
            </div>
          </div>
          {/* Ruang Sidang row */}
          <div className="grid grid-cols-4 gap-4 mb-5">
            <div className="relative">
              <label className="block text-sm font-semibold text-[#64748B] uppercase tracking-wide mb-1.5">Ruang Sidang</label>
              <div className="relative">
                <select
                  value={ruang}
                  onChange={(e) => setRuang(e.target.value)}
                  className="w-full appearance-none py-2.5 pl-3 pr-8 text-sm border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10 text-[#1E293B] transition-all"
                >
                  {["Semua Ruangan", "Ruang Sidang Utama (Cakra)", "Ruang Sidang Kartika", "Ruang Sidang Tirta"].map((o) => (
                    <option key={o}>{o}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none" />
              </div>
            </div>
          </div>

          {/* Action row */}
          <div className="flex items-center justify-between pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center gap-4">
              <button aria-label="Aksi"
                onClick={applyFilter}
                className="inline-flex items-center gap-2 bg-[#9A2109] hover:bg-[#7A1A07] text-white text-sm font-semibold px-6 py-2.5 rounded-full transition-colors"
              >
                <Filter size={14} />
                Terapkan Filter
              </button>
              <button aria-label="Aksi"
                onClick={resetFilter}
                className="text-sm text-[#64748B] hover:text-[#9A2109] font-medium transition-colors"
              >
                Reset
              </button>
            </div>
            <button aria-label="Aksi"
              onClick={() => setOnlyUnfinished(!onlyUnfinished)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                onlyUnfinished
                  ? "bg-[#9A2109] text-white border-[#9A2109]"
                  : "bg-white text-[#64748B] border-[#E2E8F0] hover:border-[#9A2109] hover:text-[#9A2109]"
              }`}
            >
              <span className={`w-2 h-2 rounded-full ${onlyUnfinished ? "bg-[#F9C784]" : "bg-[#CBD5E1]"}`} />
              Hanya Sidang yang Belum Selesai
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1100px]">
              <thead>
                <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  {cols.map((col) => (
                    <th
                      key={col}
                      className="px-4 py-3.5 text-left text-sm font-bold text-[#475569] uppercase tracking-wider whitespace-nowrap"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={cols.length}>
                      <EmptyState onReset={resetFilter} />
                    </td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr
                      key={row.id}
                      className={`border-b border-[#F1F5F9] hover:bg-[#FFF8F7] transition-colors ${
                        row.status === "Sedang Berlangsung" ? "bg-[#F0FDF4]" : ""
                      } ${i === filtered.length - 1 ? "border-0" : ""}`}
                    >
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <Clock size={13} className="text-[#94A3B8]" />
                          <span className="text-sm font-bold text-[#1E293B]">{row.waktu}</span>
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm font-semibold text-[#9A2109]">{row.noPerkara}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className="text-sm bg-[#F1F5F9] text-[#475569] px-2.5 py-1 rounded-full font-medium">
                          {row.klasifikasi}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <div className="flex items-center gap-1.5 text-sm text-[#64748B]">
                          <Building2 size={12} className="text-[#94A3B8]" />
                          {row.ruang}
                        </div>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#475569] leading-relaxed">{row.majelis}</span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-sm text-[#1E293B]">{row.agenda}</span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <StatusBadge status={row.status} />
                      </td>
                      <td className="px-4 py-4">
                        <button aria-label="Aksi"
                          onClick={() => setSelectedRow(row)}
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A2109] border border-[#9A2109] px-3 py-1.5 rounded-lg hover:bg-[#9A2109] hover:text-white transition-all"
                        >
                          <Eye size={12} />
                          Lihat Detail
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedRow && <DetailModal row={selectedRow} onClose={() => setSelectedRow(null)} />}
    </div>
  );
}
