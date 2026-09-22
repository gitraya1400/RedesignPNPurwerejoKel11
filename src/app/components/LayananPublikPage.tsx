import { Link, useLocation } from "react-router";
import {
  ChevronRight,
  FileText,
  Download,
  Calendar,
  BarChart2,
  Megaphone,
  BookOpen,
  ClipboardList,
  FolderOpen,
  TrendingUp,
  Users,
  Shield,
  Landmark,
  FileBarChart,
  ScrollText,
  Info,
  CheckCircle2,
  ExternalLink,
} from "lucide-react";

// ─── Sidebar navigation config ──────────────────────────────────────────────

const sidebarGroups = [
  {
    label: "Laporan",
    icon: FolderOpen,
    items: [
      { label: "Rencana Aksi & LKjIP", path: "/layanan-publik/laporan/rencana-aksi-dan-lkjip", icon: ClipboardList },
      { label: "SAKIP", path: "/layanan-publik/laporan/sakip", icon: TrendingUp },
      { label: "Aset & Inventaris", path: "/layanan-publik/laporan/aset-dan-inventaris", icon: Landmark },
      { label: "Laporan Tahunan", path: "/layanan-publik/laporan/laporan-tahunan", icon: FileBarChart },
      { label: "Survei Harian", path: "/layanan-publik/laporan/survei-harian", icon: BarChart2 },
      { label: "Laporan Keuangan", path: "/layanan-publik/laporan/laporan-keuangan", icon: FileText },
      { label: "Pelayanan Informasi Publik", path: "/layanan-publik/laporan/pelayanan-informasi-publik", icon: Info },
      { label: "LHKPN & LHKASN", path: "/layanan-publik/laporan/lhkpn-dan-lhkasn", icon: Users },
      { label: "Indeks Kepuasan Masyarakat (IKM)", path: "/layanan-publik/laporan/skm", icon: CheckCircle2 },
      { label: "Indeks Persepsi Anti Korupsi (IPAK)", path: "/layanan-publik/laporan/spak", icon: Shield },
    ],
  },
  {
    label: "Umum",
    icon: BookOpen,
    items: [
      { label: "Pengumuman", path: "/layanan-publik/pengumuman", icon: Megaphone },
      { label: "e-Brosur", path: "/layanan-publik/e-brosur", icon: ScrollText },
      { label: "SOP Pelayanan Informasi", path: "/layanan-publik/sop-pelayanan-informasi-biasa", icon: ClipboardList },
    ],
  },
];

// ─── Document list data ──────────────────────────────────────────────────────

type DocumentItem = {
  name: string;
  size: string;
  date: string;
};

const documentsByRoute: Record<string, { title: string; description: string; docs: DocumentItem[] }> = {
  "/layanan-publik/laporan/rencana-aksi-dan-lkjip": {
    title: "Rencana Aksi & LKjIP",
    description: "Laporan Kinerja Instansi Pemerintah (LKjIP) dan dokumen Rencana Aksi PN Purworejo.",
    docs: [
      { name: "LKjIP PN Purworejo 2025.pdf", size: "1,4 MB", date: "15 Jan 2026" },
      { name: "LKjIP PN Purworejo 2024.pdf", size: "1,2 MB", date: "10 Jan 2025" },
      { name: "Rencana Aksi PN Purworejo 2025.pdf", size: "876 KB", date: "05 Jan 2025" },
      { name: "Rencana Aksi PN Purworejo 2024.pdf", size: "820 KB", date: "08 Jan 2024" },
    ],
  },
  "/layanan-publik/laporan/sakip": {
    title: "Dokumen SAKIP",
    description: "Sistem Akuntabilitas Kinerja Instansi Pemerintah — dokumen perencanaan, pengukuran, dan pelaporan kinerja.",
    docs: [
      { name: "Renstra PN Purworejo 2020-2024.pdf", size: "2,1 MB", date: "01 Mar 2024" },
      { name: "Rencana Kinerja Tahunan 2025.pdf", size: "540 KB", date: "02 Jan 2025" },
      { name: "Perjanjian Kinerja 2025.pdf", size: "498 KB", date: "03 Jan 2025" },
      { name: "Pengukuran Kinerja Semester I 2025.pdf", size: "612 KB", date: "10 Jul 2025" },
      { name: "Dokumen SAKIP PN Purworejo 2024.pdf", size: "1,8 MB", date: "20 Jan 2025" },
    ],
  },
  "/layanan-publik/laporan/aset-dan-inventaris": {
    title: "Aset & Inventaris",
    description: "Daftar Barang Milik Negara (BMN) dan laporan inventaris aset PN Purworejo.",
    docs: [
      { name: "Laporan BMN Semester I 2025.pdf", size: "1,1 MB", date: "15 Jul 2025" },
      { name: "Laporan BMN Semester II 2024.pdf", size: "1,0 MB", date: "20 Jan 2025" },
      { name: "Rekap Inventaris Kendaraan Dinas 2025.pdf", size: "420 KB", date: "01 Feb 2025" },
      { name: "Daftar Inventaris Ruang Kerja 2025.pdf", size: "380 KB", date: "01 Feb 2025" },
    ],
  },
  "/layanan-publik/laporan/laporan-tahunan": {
    title: "Laporan Tahunan",
    description: "Laporan tahunan pelaksanaan tugas dan fungsi PN Purworejo.",
    docs: [
      { name: "Laporan Tahunan PN Purworejo 2025.pdf", size: "3,2 MB", date: "31 Des 2025" },
      { name: "Laporan Tahunan PN Purworejo 2024.pdf", size: "2,9 MB", date: "31 Des 2024" },
      { name: "Laporan Tahunan PN Purworejo 2023.pdf", size: "2,7 MB", date: "31 Des 2023" },
      { name: "Laporan Tahunan PN Purworejo 2022.pdf", size: "2,4 MB", date: "31 Des 2022" },
    ],
  },
  "/layanan-publik/laporan/survei-harian": {
    title: "Survei Harian",
    description: "Rekap hasil survei kepuasan masyarakat harian pada loket PTSP PN Purworejo.",
    docs: [
      { name: "Rekap Survei Harian Agustus 2025.pdf", size: "512 KB", date: "01 Sep 2025" },
      { name: "Rekap Survei Harian Juli 2025.pdf", size: "498 KB", date: "01 Agu 2025" },
      { name: "Rekap Survei Harian Juni 2025.pdf", size: "505 KB", date: "01 Jul 2025" },
      { name: "Rekap Survei Harian Mei 2025.pdf", size: "480 KB", date: "01 Jun 2025" },
      { name: "Rekap Survei Harian April 2025.pdf", size: "472 KB", date: "01 Mei 2025" },
    ],
  },
  "/layanan-publik/laporan/laporan-keuangan": {
    title: "Laporan Keuangan",
    description: "Laporan realisasi anggaran dan laporan keuangan PN Purworejo.",
    docs: [
      { name: "Laporan Keuangan Semester I 2025.pdf", size: "1,5 MB", date: "20 Jul 2025" },
      { name: "Laporan Keuangan Tahunan 2024.pdf", size: "1,9 MB", date: "28 Feb 2025" },
      { name: "Realisasi Anggaran Semester I 2025.pdf", size: "620 KB", date: "15 Jul 2025" },
      { name: "Realisasi Anggaran Tahunan 2024.pdf", size: "590 KB", date: "10 Jan 2025" },
    ],
  },
  "/layanan-publik/laporan/pelayanan-informasi-publik": {
    title: "Laporan Pelayanan Informasi Publik",
    description: "Laporan layanan informasi publik sesuai UU KIP No. 14 Tahun 2008.",
    docs: [
      { name: "Laporan Layanan Informasi Publik Semester I 2025.pdf", size: "740 KB", date: "15 Jul 2025" },
      { name: "Laporan Layanan Informasi Publik 2024.pdf", size: "980 KB", date: "20 Jan 2025" },
      { name: "Laporan Layanan Informasi Publik 2023.pdf", size: "870 KB", date: "18 Jan 2024" },
      { name: "Daftar Informasi Publik (DIP) 2025.pdf", size: "412 KB", date: "05 Jan 2025" },
    ],
  },
  "/layanan-publik/laporan/lhkpn-dan-lhkasn": {
    title: "LHKPN & LHKASN",
    description: "Laporan Harta Kekayaan Penyelenggara Negara (LHKPN) dan Aparatur Sipil Negara (LHKASN) PN Purworejo.",
    docs: [
      { name: "Rekap Kepatuhan LHKPN 2024.pdf", size: "320 KB", date: "01 Apr 2025" },
      { name: "Rekap Kepatuhan LHKPN 2023.pdf", size: "305 KB", date: "01 Apr 2024" },
      { name: "Rekap Kepatuhan LHKASN 2024.pdf", size: "290 KB", date: "01 Apr 2025" },
      { name: "Rekap Kepatuhan LHKASN 2023.pdf", size: "275 KB", date: "01 Apr 2024" },
    ],
  },
  "/layanan-publik/laporan/spak": {
    title: "Indeks Persepsi Anti Korupsi (IPAK)",
    description: "Laporan hasil survei dan pengukuran indeks persepsi anti korupsi di PN Purworejo.",
    docs: [
      { name: "Laporan IPAK PN Purworejo 2024.pdf", size: "1,1 MB", date: "15 Feb 2025" },
      { name: "Laporan IPAK PN Purworejo 2023.pdf", size: "980 KB", date: "10 Feb 2024" },
      { name: "Instrumen Survei IPAK 2024.pdf", size: "245 KB", date: "01 Nov 2024" },
    ],
  },
};

// ─── Announcement data ───────────────────────────────────────────────────────

const announcements = [
  {
    id: 1,
    category: "Rekrutmen",
    categoryColor: "#1D4ED8",
    categoryBg: "#EFF6FF",
    title: "Pengumuman Penerimaan Calon Hakim Ad Hoc Pengadilan Hubungan Industrial",
    date: "12 September 2025",
    excerpt:
      "PN Purworejo membuka pendaftaran Calon Hakim Ad Hoc PHI Tahun 2025. Pendaftaran dibuka mulai 15 September s.d. 30 September 2025 melalui portal SSCASN.",
  },
  {
    id: 2,
    category: "Pelayanan",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    title: "Pemberitahuan Perpindahan Loket PTSP ke Gedung Pelayanan Terpadu Baru",
    date: "05 September 2025",
    excerpt:
      "Terhitung mulai 10 September 2025, seluruh layanan loket PTSP PN Purworejo berpindah ke gedung pelayanan terpadu baru di sisi barat kompleks pengadilan.",
  },
  {
    id: 3,
    category: "Jadwal",
    categoryColor: "#B45309",
    categoryBg: "#FEF3C7",
    title: "Jadwal Cuti Bersama dan Hari Libur Nasional Tahun 2025",
    date: "02 Januari 2025",
    excerpt:
      "Daftar hari libur nasional dan cuti bersama tahun 2025 berdasarkan Keputusan Bersama Tiga Menteri. Pelayanan pengadilan tetap beroperasi di luar hari libur.",
  },
  {
    id: 4,
    category: "Lelang",
    categoryColor: "#7C3AED",
    categoryBg: "#F5F3FF",
    title: "Pengumuman Lelang Eksekusi Hak Tanggungan Nomor 21/Eks.HT/2025/PN Pwrj",
    date: "28 Agustus 2025",
    excerpt:
      "Berdasarkan penetapan Ketua PN Purworejo, akan dilaksanakan lelang eksekusi hak tanggungan atas sebidang tanah SHM No. 1234 seluas 240 m² di Kecamatan Purworejo.",
  },
  {
    id: 5,
    category: "Informasi",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    title: "Penerapan Sistem e-Court Wajib untuk Perkara Perdata Mulai Oktober 2025",
    date: "20 Agustus 2025",
    excerpt:
      "Sesuai PERMA No. 1 Tahun 2019, pendaftaran perkara perdata diwajibkan melalui aplikasi e-Court Mahkamah Agung RI mulai 1 Oktober 2025 untuk seluruh pengguna terdaftar.",
  },
];

// ─── Brochure data ───────────────────────────────────────────────────────────

const brochures = [
  {
    id: 1,
    title: "Prosedur Pengajuan Gugatan Perdata",
    format: "PDF",
    pages: "8 hal",
    gradient: "from-[#9A2109] to-[#C53030]",
  },
  {
    id: 2,
    title: "Panduan Menggunakan e-Court",
    format: "PDF",
    pages: "12 hal",
    gradient: "from-[#1D4ED8] to-[#2563EB]",
  },
  {
    id: 3,
    title: "Hak-Hak Tersangka & Terdakwa dalam Proses Hukum",
    format: "PDF",
    pages: "6 hal",
    gradient: "from-[#15803D] to-[#16A34A]",
  },
  {
    id: 4,
    title: "Alur Perkara Gugatan Sederhana (Small Claim Court)",
    format: "PDF",
    pages: "4 hal",
    gradient: "from-[#7C3AED] to-[#8B5CF6]",
  },
  {
    id: 5,
    title: "Bantuan Hukum Gratis via POSBAKUM",
    format: "PDF",
    pages: "4 hal",
    gradient: "from-[#B45309] to-[#D97706]",
  },
  {
    id: 6,
    title: "Panduan Mediasi di Pengadilan Negeri",
    format: "PDF",
    pages: "6 hal",
    gradient: "from-[#0F766E] to-[#0D9488]",
  },
];

// ─── SOP table data ──────────────────────────────────────────────────────────

const sopRows = [
  {
    no: 1,
    nama: "SOP Pelayanan Permohonan Informasi Publik",
    nomor: "SOP-01/PPID/PN-PWR/2024",
    tanggal: "02 Jan 2024",
  },
  {
    no: 2,
    nama: "SOP Keberatan Atas Informasi Publik",
    nomor: "SOP-02/PPID/PN-PWR/2024",
    tanggal: "02 Jan 2024",
  },
  {
    no: 3,
    nama: "SOP Penanganan Sengketa Informasi",
    nomor: "SOP-03/PPID/PN-PWR/2024",
    tanggal: "02 Jan 2024",
  },
  {
    no: 4,
    nama: "SOP Penyediaan Daftar Informasi Publik",
    nomor: "SOP-04/PPID/PN-PWR/2024",
    tanggal: "15 Jan 2024",
  },
  {
    no: 5,
    nama: "SOP Penyusunan Laporan Layanan Informasi Publik",
    nomor: "SOP-05/PPID/PN-PWR/2024",
    tanggal: "15 Jan 2024",
  },
  {
    no: 6,
    nama: "SOP Pengelolaan & Dokumentasi Informasi Publik",
    nomor: "SOP-06/PPID/PN-PWR/2024",
    tanggal: "20 Jan 2024",
  },
];

// ─── IKM aspect data ─────────────────────────────────────────────────────────

const ikmAspects = [
  { label: "Kompetensi Petugas", score: 87.2, color: "#9A2109" },
  { label: "Prosedur Pelayanan", score: 84.6, color: "#B45309" },
  { label: "Kecepatan Layanan", score: 82.1, color: "#15803D" },
  { label: "Kejelasan Informasi", score: 86.0, color: "#1D4ED8" },
  { label: "Kenyamanan Ruang Tunggu", score: 88.3, color: "#7C3AED" },
  { label: "Sikap & Perilaku Petugas", score: 89.5, color: "#0F766E" },
  { label: "Kemudahan Pengaduan", score: 83.4, color: "#DB2777" },
  { label: "Kesesuaian Biaya", score: "100.0", color: "#0369A1" },
];

// ─── Helper: breadcrumb label ────────────────────────────────────────────────

function getBreadcrumb(pathname: string): string[] {
  const map: Record<string, string> = {
    "/layanan-publik/laporan/rencana-aksi-dan-lkjip": "Rencana Aksi & LKjIP",
    "/layanan-publik/laporan/sakip": "SAKIP",
    "/layanan-publik/laporan/aset-dan-inventaris": "Aset & Inventaris",
    "/layanan-publik/laporan/laporan-tahunan": "Laporan Tahunan",
    "/layanan-publik/laporan/survei-harian": "Survei Harian",
    "/layanan-publik/laporan/laporan-keuangan": "Laporan Keuangan",
    "/layanan-publik/laporan/pelayanan-informasi-publik": "Pelayanan Informasi Publik",
    "/layanan-publik/laporan/lhkpn-dan-lhkasn": "LHKPN & LHKASN",
    "/layanan-publik/laporan/skm": "Indeks Kepuasan Masyarakat",
    "/layanan-publik/laporan/spak": "Indeks Persepsi Anti Korupsi",
    "/layanan-publik/pengumuman": "Pengumuman",
    "/layanan-publik/e-brosur": "e-Brosur",
    "/layanan-publik/sop-pelayanan-informasi-biasa": "SOP Pelayanan Informasi",
  };
  const label = map[pathname] ?? "Layanan Publik";
  const isLaporan = pathname.startsWith("/layanan-publik/laporan/");
  if (isLaporan) return ["Layanan Publik", "Laporan", label];
  return ["Layanan Publik", label];
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function DocumentListSection({ route }: { route: string }) {
  const data = documentsByRoute[route];
  if (!data) return null;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#1E293B] mb-1">{data.title}</h1>
        <p className="text-sm text-[#64748B]">{data.description}</p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <FolderOpen size={15} className="text-[#9A2109]" />
            <span className="text-sm font-semibold text-[#1E293B]">Daftar Dokumen</span>
          </div>
          <span className="text-sm text-[#94A3B8]">{data.docs.length} file tersedia</span>
        </div>

        <div className="divide-y divide-[#F1F5F9]">
          {data.docs.map((doc) => (
            <div
              key={doc.name}
              className="flex items-center gap-4 px-6 py-4 hover:bg-[#F8FAFC] transition-colors group"
            >
              {/* PDF icon */}
              <div className="w-10 h-10 rounded-xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                <FileText size={18} className="text-[#9A2109]" />
              </div>

              {/* File info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1E293B] truncate group-hover:text-[#9A2109] transition-colors">
                  {doc.name}
                </p>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-sm text-[#94A3B8]">PDF • {doc.size}</span>
                  <span className="inline-flex items-center gap-1 text-sm text-[#94A3B8]">
                    <Calendar size={11} />
                    {doc.date}
                  </span>
                </div>
              </div>

              {/* Download button */}
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2109] border border-[#9A2109] hover:bg-[#9A2109] hover:text-white px-3.5 py-1.5 rounded-lg transition-all flex-shrink-0"
              >
                <Download size={13} />
                Unduh
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function PengumumanSection() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#1E293B] mb-1">Pengumuman</h1>
        <p className="text-sm text-[#64748B]">
          Informasi dan pengumuman resmi dari PN Purworejo untuk masyarakat.
        </p>
      </div>

      <div className="space-y-4">
        {announcements.map((item) => (
          <div
            key={item.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-5 hover:border-[#9A2109]/30 hover:shadow-md transition-all group"
          >
            <div className="flex items-start gap-4">
              {/* Number badge */}
              <div className="w-8 h-8 rounded-full bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center flex-shrink-0 mt-0.5">
                <span className="text-sm font-bold text-[#9A2109]">{item.id}</span>
              </div>

              <div className="flex-1 min-w-0">
                {/* Category + Date row */}
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span
                    className="text-sm font-bold px-2.5 py-0.5 rounded-full"
                    style={{ color: item.categoryColor, backgroundColor: item.categoryBg }}
                  >
                    {item.category}
                  </span>
                  <span className="inline-flex items-center gap-1 text-sm text-[#94A3B8]">
                    <Calendar size={11} />
                    {item.date}
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-sm font-bold text-[#1E293B] leading-snug mb-2 group-hover:text-[#9A2109] transition-colors">
                  {item.title}
                </h2>

                {/* Excerpt */}
                <p className="text-sm text-[#64748B] leading-relaxed mb-3">{item.excerpt}</p>

                <a
                  href="#"
                  onClick={(e) => e.preventDefault()}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A2109] hover:text-[#7A1A07] transition-colors"
                >
                  Baca Selengkapnya
                  <ChevronRight size={13} />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function EBrosurSection() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#1E293B] mb-1">e-Brosur</h1>
        <p className="text-sm text-[#64748B]">
          Unduh brosur digital PN Purworejo sebagai panduan layanan dan informasi hukum.
        </p>
      </div>

      <div className="grid grid-cols-2 gap-5">
        {brochures.map((brochure) => (
          <div
            key={brochure.id}
            className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden hover:shadow-md hover:border-[#9A2109]/30 transition-all group"
          >
            {/* Cover area */}
            <div
              className={`bg-gradient-to-br ${brochure.gradient} h-32 flex items-center justify-center relative`}
            >
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center">
                <ScrollText size={28} className="text-white" />
              </div>
              <span className="absolute top-3 right-3 text-sm font-bold bg-white/90 text-[#1E293B] px-2 py-0.5 rounded-full">
                {brochure.format}
              </span>
            </div>

            {/* Info */}
            <div className="p-4">
              <p className="text-sm font-semibold text-[#1E293B] leading-snug mb-1 group-hover:text-[#9A2109] transition-colors">
                {brochure.title}
              </p>
              <p className="text-sm text-[#94A3B8] mb-3">{brochure.pages}</p>
              <a
                href="#"
                onClick={(e) => e.preventDefault()}
                className="w-full inline-flex items-center justify-center gap-2 text-sm font-semibold bg-[#9A2109] text-white hover:bg-[#7A1A07] py-2 rounded-xl transition-colors"
              >
                <Download size={13} />
                Unduh Brosur
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SopSection() {
  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#1E293B] mb-1">SOP Pelayanan Informasi Biasa</h1>
        <p className="text-sm text-[#64748B]">
          Standar Operasional Prosedur (SOP) pengelolaan informasi publik PN Purworejo sesuai UU No. 14 Tahun 2008.
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
          <ClipboardList size={15} className="text-[#9A2109]" />
          <span className="text-sm font-semibold text-[#1E293B]">Daftar SOP</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wide w-12">No.</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wide">Nama SOP</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wide">Nomor Dokumen</th>
                <th className="text-left px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wide">Tanggal Terbit</th>
                <th className="text-center px-4 py-3 text-sm font-semibold text-[#64748B] uppercase tracking-wide w-24">Unduh</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {sopRows.map((row) => (
                <tr key={row.no} className="hover:bg-[#F8FAFC] transition-colors group">
                  <td className="px-4 py-3.5 text-[#94A3B8] font-medium">{row.no}</td>
                  <td className="px-4 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                        <FileText size={13} className="text-[#9A2109]" />
                      </div>
                      <span className="text-[#1E293B] font-semibold group-hover:text-[#9A2109] transition-colors">
                        {row.nama}
                      </span>
                    </div>
                  </td>
                  <td className="px-4 py-3.5 text-[#64748B] font-mono text-sm">{row.nomor}</td>
                  <td className="px-4 py-3.5">
                    <span className="inline-flex items-center gap-1 text-sm text-[#64748B]">
                      <Calendar size={11} />
                      {row.tanggal}
                    </span>
                  </td>
                  <td className="px-4 py-3.5 text-center">
                    <a
                      href="#"
                      onClick={(e) => e.preventDefault()}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A2109] border border-[#9A2109] hover:bg-[#9A2109] hover:text-white px-3 py-1.5 rounded-lg transition-all"
                    >
                      <Download size={12} />
                      PDF
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function IkmSection() {
  const overallScore = 85.4;
  const rating = "BAIK";

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#1E293B] mb-1">Indeks Kepuasan Masyarakat (IKM)</h1>
        <p className="text-sm text-[#64748B]">
          Hasil survei kepuasan masyarakat terhadap pelayanan PN Purworejo — Periode Semester I Tahun 2025.
        </p>
      </div>

      {/* Score hero card */}
      <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] rounded-2xl p-6 mb-5 flex items-center gap-6 shadow-lg">
        {/* Big score */}
        <div className="flex-shrink-0 text-center bg-white/10 rounded-2xl px-8 py-5 border border-white/20">
          <p className="text-[3rem] font-black text-white leading-none">{overallScore}</p>
          <p className="text-[#F9C784] text-sm font-bold uppercase tracking-widest mt-1">Skor IKM</p>
        </div>
        {/* Info */}
        <div>
          <div className="inline-flex items-center gap-2 bg-[#F9C784] text-[#7A1A07] text-sm font-black px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            <CheckCircle2 size={13} />
            Nilai {rating}
          </div>
          <h2 className="text-white text-lg font-bold leading-snug mb-2">
            Pelayanan PN Purworejo Dinilai BAIK oleh Masyarakat
          </h2>
          <div className="flex flex-wrap gap-4">
            {[
              { label: "Total Responden", value: "1.247 orang" },
              { label: "Periode Survey", value: "Jan – Jun 2025" },
              { label: "Interval Nilai", value: "76,61 – 88,30" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-white/50 text-sm font-semibold uppercase tracking-wide">{item.label}</p>
                <p className="text-white text-sm font-bold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Aspect breakdown */}
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
        <div className="px-6 py-4 border-b border-[#F1F5F9] bg-[#F8FAFC] flex items-center gap-2">
          <BarChart2 size={15} className="text-[#9A2109]" />
          <span className="text-sm font-semibold text-[#1E293B]">Nilai Per Aspek Pelayanan</span>
        </div>
        <div className="px-6 py-5 space-y-4">
          {ikmAspects.map((aspect) => {
            const pct = typeof aspect.score === "number" ? aspect.score : parseFloat(aspect.score as string);
            const displayScore = typeof aspect.score === "string" ? aspect.score : aspect.score.toFixed(1);
            return (
              <div key={aspect.label}>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-sm font-semibold text-[#1E293B]">{aspect.label}</span>
                  <span className="text-sm font-bold" style={{ color: aspect.color }}>
                    {displayScore}
                  </span>
                </div>
                <div className="h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{ width: `${Math.min(pct, 100)}%`, backgroundColor: aspect.color }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <div className="px-6 py-4 border-t border-[#F1F5F9] bg-[#F8FAFC]">
          <div className="flex items-start gap-2">
            <Info size={14} className="text-[#64748B] mt-0.5 flex-shrink-0" />
            <p className="text-sm text-[#64748B] leading-relaxed">
              Survei dilakukan oleh Tim PPID PN Purworejo secara berkala. Nilai IKM dihitung berdasarkan Permenpan No. 14 Tahun 2017 dengan skala 1–4. Kuesioner tersedia di loket PTSP dan melalui tautan daring.
            </p>
          </div>
        </div>
      </div>

      {/* Download report */}
      <div className="mt-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center justify-between shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#FFF1F1] flex items-center justify-center">
            <FileText size={18} className="text-[#9A2109]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1E293B]">Laporan Lengkap IKM Semester I 2025.pdf</p>
            <p className="text-sm text-[#94A3B8]">PDF • 1,3 MB • Diunggah 10 Jul 2025</p>
          </div>
        </div>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2109] border border-[#9A2109] hover:bg-[#9A2109] hover:text-white px-4 py-2 rounded-xl transition-all flex-shrink-0"
        >
          <Download size={13} />
          Unduh Laporan
        </a>
      </div>
    </div>
  );
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────

function Sidebar({ pathname }: { pathname: string }) {
  return (
    <aside className="w-[260px] flex-shrink-0">
      <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden sticky top-24">
        {/* Header */}
        <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] px-5 py-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/15 flex items-center justify-center">
              <BookOpen size={15} className="text-[#F9C784]" />
            </div>
            <div>
              <p className="text-white text-sm font-bold uppercase tracking-wide leading-none">Layanan</p>
              <p className="text-[#F9C784] text-sm font-semibold mt-0.5">Publik</p>
            </div>
          </div>
        </div>

        {/* Nav groups */}
        <nav className="py-3">
          {sidebarGroups.map((group) => {
            const GroupIcon = group.icon;
            return (
              <div key={group.label} className="mb-1">
                {/* Group label */}
                <div className="flex items-center gap-2 px-4 py-2 mb-0.5">
                  <GroupIcon size={12} className="text-[#94A3B8]" />
                  <span className="text-sm font-bold text-[#94A3B8] uppercase tracking-widest">
                    {group.label}
                  </span>
                </div>

                {/* Items */}
                {group.items.map((item) => {
                  const ItemIcon = item.icon;
                  const isActive = pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      className={`flex items-center gap-3 mx-2 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                        isActive
                          ? "bg-[#FFF1F1] text-[#9A2109]"
                          : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#9A2109]"
                      }`}
                    >
                      <ItemIcon
                        size={14}
                        className={isActive ? "text-[#9A2109]" : "text-[#94A3B8]"}
                      />
                      <span className="leading-snug">{item.label}</span>
                      {isActive && (
                        <ChevronRight size={12} className="ml-auto text-[#9A2109]" />
                      )}
                    </Link>
                  );
                })}

                {/* Divider between groups */}
                <div className="mx-4 my-2 border-t border-[#F1F5F9]" />
              </div>
            );
          })}
        </nav>

        {/* Footer CTA */}
        <div className="mx-3 mb-3 bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0]">
          <p className="text-sm text-[#64748B] font-semibold mb-1.5">Butuh informasi publik?</p>
          <Link
            to="/layanan-publik/formulir-ppid"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-[#9A2109] hover:text-[#7A1A07] transition-colors"
          >
            Ajukan Permohonan PPID
            <ExternalLink size={11} />
          </Link>
        </div>
      </div>
    </aside>
  );
}

// ─── Main content router ──────────────────────────────────────────────────────

function MainContent({ pathname }: { pathname: string }) {
  if (pathname === "/layanan-publik/laporan/skm") {
    return <IkmSection />;
  }

  if (pathname in documentsByRoute) {
    return <DocumentListSection route={pathname} />;
  }

  if (pathname === "/layanan-publik/pengumuman") {
    return <PengumumanSection />;
  }

  if (pathname === "/layanan-publik/e-brosur") {
    return <EBrosurSection />;
  }

  if (pathname === "/layanan-publik/sop-pelayanan-informasi-biasa") {
    return <SopSection />;
  }

  // Fallback
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] p-8 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#FFF1F1] flex items-center justify-center mx-auto mb-4">
        <FolderOpen size={22} className="text-[#9A2109]" />
      </div>
      <h2 className="text-base font-bold text-[#1E293B] mb-1">Halaman Tidak Ditemukan</h2>
      <p className="text-sm text-[#64748B]">Silakan pilih menu di sebelah kiri untuk menampilkan konten.</p>
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export function LayananPublikPage() {
  const location = useLocation();
  const { pathname } = location;

  const crumbs = getBreadcrumb(pathname);
  const isLaporan = pathname.startsWith("/layanan-publik/laporan/");

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Page header band */}
      <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] pt-24 pb-6">
        <div className="max-w-[1440px] mx-auto px-8">
          {/* Breadcrumb */}
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-4 flex-wrap">
            <Link to="/" className="hover:text-white transition-colors">
              Beranda
            </Link>
            {crumbs.map((crumb, i) => (
              <span key={crumb} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {i < crumbs.length - 1 ? (
                  <span className="hover:text-white cursor-default">{crumb}</span>
                ) : (
                  <span className="text-white font-semibold">{crumb}</span>
                )}
              </span>
            ))}
          </nav>

          {/* Title row */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center">
              {isLaporan ? (
                <FileText size={17} className="text-[#F9C784]" />
              ) : (
                <BookOpen size={17} className="text-[#F9C784]" />
              )}
            </div>
            <div>
              <p className="text-white/60 text-sm font-semibold uppercase tracking-wide">
                {isLaporan ? "Laporan" : "Layanan Publik"}
              </p>
              <h1 className="text-white text-lg font-bold leading-tight">{crumbs[crumbs.length - 1]}</h1>
            </div>
          </div>
        </div>
      </div>

      {/* Body: sidebar + content */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="flex gap-7 items-start">
          <Sidebar pathname={pathname} />
          <main className="flex-1 min-w-0">
            <MainContent pathname={pathname} />
          </main>
        </div>
      </div>
    </div>
  );
}
