import { Link, useLocation } from "react-router";
import {
  ChevronRight,
  RefreshCw,
  FileText,
  Users,
  Settings,
  BarChart2,
  Shield,
  Award,
  Download,
  CheckCircle2,
  Clock,
  Target,
  TrendingUp,
  BookOpen,
  ClipboardList,
  Star,
  Activity,
  Layers,
  Zap,
  Home,
} from "lucide-react";

// ─── Sidebar nav ─────────────────────────────────────────────────────────────

const sideNavItems = [
  {
    label: "Zona Integritas",
    children: [
      { label: "Area I — Manajemen Perubahan", path: "/reformasi-birokrasi/zona-integritas/area-i" },
      { label: "Area II — Penataan Peraturan", path: "/reformasi-birokrasi/zona-integritas/area-ii" },
      { label: "Area III — Penguatan Organisasi", path: "/reformasi-birokrasi/zona-integritas/area-iii" },
      { label: "Area IV — Penataan Tatalaksana", path: "/reformasi-birokrasi/zona-integritas/area-iv" },
      { label: "Area V — Manajemen SDM", path: "/reformasi-birokrasi/zona-integritas/area-v" },
      { label: "Area VI — Akuntabilitas Kinerja", path: "/reformasi-birokrasi/zona-integritas/area-vi" },
    ],
  },
  {
    label: "Akreditasi Penjaminan Mutu",
    children: [
      {
        label: "SK Penetapan Nilai Akreditasi",
        path: "/reformasi-birokrasi/akreditasi-penjaminan-mutu/sk-penetapan-nilai-akreditasi",
      },
    ],
  },
  {
    label: "AMPUH",
    path: "/reformasi-birokrasi/ampuh",
  },
];

// ─── Area data ────────────────────────────────────────────────────────────────

type AreaStatus = "TERCAPAI" | "DALAM PROSES";

interface ProgramKegiatan {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface AreaData {
  number: string;
  label: string;
  title: string;
  subtitle: string;
  status: AreaStatus;
  target: number;
  realisasi: number;
  programs: ProgramKegiatan[];
  documents: { title: string; size: string }[];
}

const areaDataMap: Record<string, AreaData> = {
  "area-i": {
    number: "I",
    label: "Area I",
    title: "Manajemen Perubahan",
    subtitle:
      "Reformasi pola pikir dan budaya kerja aparatur menuju tata kelola yang profesional, akuntabel, dan berintegritas.",
    status: "TERCAPAI",
    target: 100,
    realisasi: 95,
    programs: [
      {
        icon: RefreshCw,
        title: "Pembentukan Agen Perubahan",
        description:
          "Penetapan agen perubahan internal yang bertugas mendorong transformasi budaya kerja dan pola pikir aparatur pengadilan.",
      },
      {
        icon: Shield,
        title: "Budaya Anti Korupsi",
        description:
          "Internalisasi nilai-nilai integritas dan anti korupsi melalui pelatihan, deklarasi komitmen, dan pemantauan gratifikasi.",
      },
      {
        icon: Star,
        title: "Evaluasi Budaya Kerja",
        description:
          "Pengukuran indeks budaya organisasi secara berkala untuk memastikan perubahan mindset berjalan sesuai target.",
      },
    ],
    documents: [
      { title: "Laporan Manajemen Perubahan 2024.pdf", size: "1,2 MB" },
      { title: "SK Agen Perubahan PN Purworejo.pdf", size: "420 KB" },
    ],
  },
  "area-ii": {
    number: "II",
    label: "Area II",
    title: "Penataan Peraturan Perundangan",
    subtitle:
      "Simplifikasi dan harmonisasi regulasi internal pengadilan agar tidak tumpang tindih dan selaras dengan peraturan nasional.",
    status: "TERCAPAI",
    target: 100,
    realisasi: 90,
    programs: [
      {
        icon: FileText,
        title: "Identifikasi Regulasi Tumpang Tindih",
        description:
          "Pemetaan peraturan dan kebijakan internal yang berpotensi overlapping untuk dilakukan simplifikasi.",
      },
      {
        icon: BookOpen,
        title: "Harmonisasi Aturan",
        description:
          "Penyesuaian regulasi internal dengan peraturan perundangan yang lebih tinggi dan kebijakan Mahkamah Agung.",
      },
      {
        icon: ClipboardList,
        title: "Penguatan Sistem Hukum Internal",
        description:
          "Pembuatan database regulasi yang terstruktur dan mudah diakses oleh seluruh aparatur pengadilan.",
      },
    ],
    documents: [
      { title: "Laporan Penataan Regulasi 2024.pdf", size: "980 KB" },
    ],
  },
  "area-iii": {
    number: "III",
    label: "Area III",
    title: "Penataan dan Penguatan Organisasi",
    subtitle:
      "Rightsizing struktur organisasi dan evaluasi kelembagaan untuk meningkatkan efektivitas dan efisiensi pengadilan.",
    status: "TERCAPAI",
    target: 100,
    realisasi: 88,
    programs: [
      {
        icon: Layers,
        title: "Evaluasi Kelembagaan",
        description:
          "Kajian mendalam terhadap struktur organisasi pengadilan untuk memastikan kesesuaian dengan beban kerja dan kebutuhan pelayanan.",
      },
      {
        icon: Settings,
        title: "Rightsizing Organisasi",
        description:
          "Penyesuaian ukuran dan komposisi organisasi agar proporsional dan mampu mendukung pencapaian visi pengadilan.",
      },
      {
        icon: Target,
        title: "Penguatan Fungsi Jabatan",
        description:
          "Pemerjelas uraian tugas dan fungsi setiap jabatan untuk menghindari tumpang tindih tanggung jawab.",
      },
    ],
    documents: [
      { title: "Laporan Evaluasi Organisasi 2024.pdf", size: "1,1 MB" },
    ],
  },
  "area-iv": {
    number: "IV",
    label: "Area IV",
    title: "Penataan Tatalaksana",
    subtitle:
      "Penyempurnaan SOP, penerapan e-Government, dan peningkatan keterbukaan informasi publik di lingkungan pengadilan.",
    status: "TERCAPAI",
    target: 100,
    realisasi: 97,
    programs: [
      {
        icon: ClipboardList,
        title: "Penyusunan & Evaluasi SOP",
        description:
          "Pembuatan standar operasional prosedur pelayanan yang komprehensif, terukur, dan diperbarui secara berkala.",
      },
      {
        icon: Zap,
        title: "Implementasi e-Government",
        description:
          "Pengembangan layanan berbasis elektronik untuk mempercepat proses administrasi dan mengurangi birokrasi manual.",
      },
      {
        icon: Activity,
        title: "Keterbukaan Informasi Publik",
        description:
          "Pemenuhan standar keterbukaan informasi sesuai UU KIP melalui website, PTSP, dan media komunikasi lainnya.",
      },
    ],
    documents: [
      { title: "Laporan Penataan Tatalaksana 2024.pdf", size: "1,4 MB" },
      { title: "Matriks SOP Pelayanan Terbaru.pdf", size: "760 KB" },
    ],
  },
  "area-v": {
    number: "V",
    label: "Area V",
    title: "Penataan Sistem Manajemen SDM",
    subtitle:
      "Penguatan sistem rekrutmen, pengembangan kompetensi, dan promosi aparatur berbasis merit untuk mewujudkan SDM yang profesional.",
    status: "DALAM PROSES",
    target: 100,
    realisasi: 78,
    programs: [
      {
        icon: Users,
        title: "Rekrutmen Berbasis Kompetensi",
        description:
          "Penerapan sistem seleksi dan rekrutmen yang transparan berdasarkan kompetensi teknis dan integritas calon aparatur.",
      },
      {
        icon: TrendingUp,
        title: "Promosi & Rotasi Berbasis Merit",
        description:
          "Pengelolaan karier pegawai berdasarkan penilaian kinerja objektif, kompetensi, dan rekam jejak integritas.",
      },
      {
        icon: BookOpen,
        title: "Pengembangan Kompetensi",
        description:
          "Program pelatihan teknis dan manajerial bagi aparatur untuk meningkatkan kapasitas dalam menjalankan tugas.",
      },
    ],
    documents: [
      { title: "Laporan Manajemen SDM 2024.pdf", size: "1,0 MB" },
    ],
  },
  "area-vi": {
    number: "VI",
    label: "Area VI",
    title: "Penguatan Akuntabilitas Kinerja",
    subtitle:
      "Peningkatan kualitas perencanaan, pelaksanaan, dan evaluasi kinerja melalui SAKIP, LKjIP, dan indikator kinerja yang terukur.",
    status: "TERCAPAI",
    target: 100,
    realisasi: 93,
    programs: [
      {
        icon: BarChart2,
        title: "Implementasi SAKIP",
        description:
          "Penerapan Sistem Akuntabilitas Kinerja Instansi Pemerintah secara konsisten untuk mengukur capaian kinerja organisasi.",
      },
      {
        icon: FileText,
        title: "Penyusunan LKjIP",
        description:
          "Laporan Kinerja Instansi Pemerintah disusun tepat waktu, akurat, dan dapat dipertanggungjawabkan kepada publik.",
      },
      {
        icon: Target,
        title: "Penguatan Indikator Kinerja",
        description:
          "Penyempurnaan IKU dan IKK agar lebih relevan, spesifik, terukur, dan selaras dengan target reformasi birokrasi.",
      },
    ],
    documents: [
      { title: "LKjIP PN Purworejo 2024.pdf", size: "2,3 MB" },
      { title: "Laporan Akuntabilitas Kinerja 2024.pdf", size: "1,6 MB" },
    ],
  },
};

// ─── Accreditation metrics ────────────────────────────────────────────────────

const accreditationComponents = [
  { no: 1, komponen: "Kepemimpinan", nilai: 92, kategori: "Sangat Baik" },
  { no: 2, komponen: "Perencanaan Strategis", nilai: 88, kategori: "Sangat Baik" },
  { no: 3, komponen: "Fokus Pelanggan", nilai: 90, kategori: "Sangat Baik" },
  { no: 4, komponen: "Pengukuran, Analisis & Manajemen Pengetahuan", nilai: 85, kategori: "Sangat Baik" },
  { no: 5, komponen: "Fokus Tenaga Kerja", nilai: 83, kategori: "Baik" },
  { no: 6, komponen: "Manajemen Operasional", nilai: 87, kategori: "Sangat Baik" },
  { no: 7, komponen: "Hasil Pelayanan", nilai: 91, kategori: "Sangat Baik" },
  { no: 8, komponen: "Akuntabilitas Keuangan", nilai: 86, kategori: "Sangat Baik" },
  { no: 9, komponen: "Keterbukaan Informasi", nilai: 89, kategori: "Sangat Baik" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function Breadcrumb({ section }: { section: string }) {
  return (
    <nav className="flex items-center gap-1.5 text-sm text-gray-500 mb-6 flex-wrap">
      <Link to="/" className="hover:text-[#9A2109] transition-colors flex items-center gap-1">
        <Home size={13} />
        Beranda
      </Link>
      <ChevronRight size={13} className="text-gray-300" />
      <span className="text-gray-700 font-medium">Reformasi Birokrasi</span>
      {section && (
        <>
          <ChevronRight size={13} className="text-gray-300" />
          <span className="text-[#9A2109] font-semibold">{section}</span>
        </>
      )}
    </nav>
  );
}

function Sidebar({ currentPath }: { currentPath: string }) {
  return (
    <aside className="w-60 flex-shrink-0">
      <div className="sticky top-28">
        {/* Header */}
        <div
          className="px-4 py-3 rounded-t-2xl"
          style={{ background: "#9A2109" }}
        >
          <p className="text-white text-xs font-semibold uppercase tracking-wider">
            Reformasi Birokrasi
          </p>
        </div>

        {/* Nav items */}
        <div className="border border-t-0 border-[#E2E8F0] rounded-b-2xl overflow-hidden bg-white">
          {sideNavItems.map((group, gi) => (
            <div key={gi}>
              {group.path ? (
                // Flat item (AMPUH)
                <Link
                  to={group.path}
                  className={`flex items-center gap-2 px-4 py-3 text-sm font-semibold transition-colors border-t border-[#E2E8F0] ${
                    currentPath === group.path
                      ? "bg-[#FFF1F1] text-[#9A2109] border-l-4 border-l-[#9A2109]"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#9A2109]"
                  }`}
                >
                  <Shield size={13} className="flex-shrink-0" />
                  {group.label}
                </Link>
              ) : (
                <>
                  {/* Group label */}
                  <div
                    className={`px-4 py-2.5 text-xs font-bold uppercase tracking-wider border-t border-[#E2E8F0] ${gi === 0 ? "border-t-0" : ""}`}
                    style={{ color: "#9A2109", background: "#FFF8F6" }}
                  >
                    {group.label}
                  </div>
                  {group.children?.map((child, ci) => (
                    <Link
                      key={ci}
                      to={child.path}
                      className={`flex items-center gap-2 px-4 py-2.5 text-sm transition-colors border-t border-[#E2E8F0] ${
                        currentPath === child.path
                          ? "bg-[#FFF1F1] text-[#9A2109] font-semibold border-l-4 border-l-[#9A2109]"
                          : "text-gray-600 hover:bg-gray-50 hover:text-[#9A2109]"
                      }`}
                    >
                      <ChevronRight size={12} className="flex-shrink-0 opacity-50" />
                      {child.label}
                    </Link>
                  ))}
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </aside>
  );
}

function StatusBadge({ status }: { status: AreaStatus }) {
  if (status === "TERCAPAI") {
    return (
      <span className="inline-flex items-center gap-1.5 bg-green-50 text-green-700 text-xs font-bold px-3 py-1.5 rounded-full border border-green-200">
        <CheckCircle2 size={12} />
        TERCAPAI
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 bg-yellow-50 text-yellow-700 text-xs font-bold px-3 py-1.5 rounded-full border border-yellow-200">
      <Clock size={12} />
      DALAM PROSES
    </span>
  );
}

function MetricBar({ target, realisasi }: { target: number; realisasi: number }) {
  const pct = Math.min((realisasi / target) * 100, 100);
  return (
    <div className="bg-gray-50 rounded-xl p-4 border border-[#E2E8F0] mb-6">
      <div className="flex items-center justify-between mb-2">
        <span className="text-xs text-gray-500 font-medium">Capaian Realisasi</span>
        <span className="text-xs font-bold" style={{ color: "#9A2109" }}>
          Target: {target}% | Realisasi: {realisasi}%
        </span>
      </div>
      <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all"
          style={{
            width: `${pct}%`,
            background: pct >= 90 ? "#16a34a" : pct >= 70 ? "#ca8a04" : "#9A2109",
          }}
        />
      </div>
      <div className="flex justify-between mt-1">
        <span className="text-xs text-gray-400">0%</span>
        <span className="text-xs text-gray-400">100%</span>
      </div>
    </div>
  );
}

function DocumentCard({ title, size }: { title: string; size: string }) {
  return (
    <div className="flex items-center gap-3 p-3 border border-[#E2E8F0] rounded-xl bg-white hover:border-[#9A2109] transition-colors group cursor-pointer">
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{ background: "#FFF1F1" }}
      >
        <FileText size={16} style={{ color: "#9A2109" }} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-800 truncate group-hover:text-[#9A2109] transition-colors">
          {title}
        </p>
        <p className="text-xs text-gray-400">{size}</p>
      </div>
      <Download size={14} className="text-gray-400 group-hover:text-[#9A2109] transition-colors flex-shrink-0" />
    </div>
  );
}

// ─── Page content renderers ───────────────────────────────────────────────────

function ZonaIntegritasAreaPage({ areaKey }: { areaKey: string }) {
  const data = areaDataMap[areaKey];
  if (!data) return null;

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Hero */}
      <div
        className="px-8 py-8"
        style={{
          background: "linear-gradient(135deg, #9A2109 0%, #7B1A07 60%, #4A0E04 100%)",
        }}
      >
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-lg font-black flex-shrink-0"
            style={{ background: "#F9C784", color: "#9A2109" }}
          >
            {data.number}
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <span className="text-[#F9C784] text-xs font-bold uppercase tracking-widest">
                Zona Integritas · {data.label}
              </span>
              <StatusBadge status={data.status} />
            </div>
            <h1 className="text-white text-2xl font-black leading-tight mb-2">
              {data.title}
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              {data.subtitle}
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        {/* Metric bar */}
        <MetricBar target={data.target} realisasi={data.realisasi} />

        {/* Program kegiatan */}
        <h2 className="text-base font-bold text-gray-900 mb-4">Program Kegiatan</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          {data.programs.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-[#E2E8F0] p-4 bg-[#F8FAFC] flex flex-col gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "#FFF1F1" }}
                >
                  <Icon size={16} style={{ color: "#9A2109" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{prog.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{prog.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Documents */}
        <h2 className="text-base font-bold text-gray-900 mb-4">Unduh Dokumen</h2>
        <div className="flex flex-col gap-2">
          {data.documents.map((doc, i) => (
            <DocumentCard key={i} title={doc.title} size={doc.size} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AkreditasiPage() {
  const total = accreditationComponents.reduce((sum, c) => sum + c.nilai, 0);
  const avg = (total / accreditationComponents.length).toFixed(1);

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Hero */}
      <div
        className="px-8 py-8"
        style={{
          background: "linear-gradient(135deg, #9A2109 0%, #7B1A07 60%, #4A0E04 100%)",
        }}
      >
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0"
            style={{ background: "#F9C784" }}
          >
            <Award size={24} style={{ color: "#9A2109" }} />
          </div>
          <div>
            <span className="text-[#F9C784] text-xs font-bold uppercase tracking-widest mb-2 block">
              Akreditasi Penjaminan Mutu
            </span>
            <h1 className="text-white text-2xl font-black leading-tight mb-2">
              Sertifikasi Akreditasi Penjaminan Mutu
            </h1>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              Pengadilan Negeri Purworejo meraih nilai akreditasi "A" (Sangat Baik) dari Tim
              Akreditasi Pengadilan Tinggi Jawa Tengah atas komitmen dalam standar pelayanan
              peradilan yang prima.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        {/* Highlight metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-7">
          <div className="rounded-xl border border-[#E2E8F0] p-5 text-center bg-[#F8FAFC]">
            <div
              className="text-4xl font-black mb-1"
              style={{ color: "#9A2109" }}
            >
              A
            </div>
            <p className="text-xs text-gray-500 font-medium">Nilai Akreditasi</p>
            <p className="text-xs font-semibold text-green-600 mt-1">Sangat Baik</p>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] p-5 text-center bg-[#F8FAFC]">
            <div
              className="text-3xl font-black mb-1"
              style={{ color: "#9A2109" }}
            >
              {avg}
            </div>
            <p className="text-xs text-gray-500 font-medium">Rata-rata Skor</p>
            <p className="text-xs font-semibold text-gray-600 mt-1">dari 100 poin</p>
          </div>
          <div className="rounded-xl border border-[#E2E8F0] p-5 text-center bg-[#F8FAFC]">
            <div
              className="text-2xl font-black mb-1"
              style={{ color: "#9A2109" }}
            >
              2025–2028
            </div>
            <p className="text-xs text-gray-500 font-medium">Masa Berlaku</p>
            <p className="text-xs font-semibold text-gray-600 mt-1">3 tahun sertifikasi</p>
          </div>
        </div>

        {/* Info box */}
        <div
          className="rounded-xl p-4 mb-6 border border-[#F9C784]/60 flex gap-3"
          style={{ background: "#FFFBF0" }}
        >
          <Award size={18} className="flex-shrink-0 mt-0.5" style={{ color: "#9A2109" }} />
          <div>
            <p className="text-sm font-semibold text-gray-800 mb-1">
              Penilaian oleh Pengadilan Tinggi Jawa Tengah
            </p>
            <p className="text-xs text-gray-600 leading-relaxed">
              Tim Akreditasi Pengadilan Tinggi Jawa Tengah melakukan asesmen menyeluruh terhadap
              9 komponen kinerja PN Purworejo. Hasilnya menyatakan pengadilan ini memenuhi
              standar akreditasi tertinggi dan layak mendapatkan sertifikat nilai "A".
            </p>
          </div>
        </div>

        {/* Metrics table */}
        <h2 className="text-base font-bold text-gray-900 mb-3">Penilaian Per Komponen</h2>
        <div className="rounded-xl border border-[#E2E8F0] overflow-hidden mb-6">
          <table className="w-full text-sm">
            <thead>
              <tr style={{ background: "#9A2109" }}>
                <th className="text-left text-white text-xs font-semibold px-4 py-3 w-10">No</th>
                <th className="text-left text-white text-xs font-semibold px-4 py-3">Komponen Penilaian</th>
                <th className="text-center text-white text-xs font-semibold px-4 py-3 w-24">Nilai</th>
                <th className="text-center text-white text-xs font-semibold px-4 py-3 w-32">Kategori</th>
              </tr>
            </thead>
            <tbody>
              {accreditationComponents.map((row, i) => (
                <tr
                  key={i}
                  className={`border-t border-[#E2E8F0] ${i % 2 === 0 ? "bg-white" : "bg-[#F8FAFC]"}`}
                >
                  <td className="px-4 py-3 text-gray-500 text-xs font-mono">{row.no}</td>
                  <td className="px-4 py-3 text-gray-700 font-medium">{row.komponen}</td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className="inline-block font-bold text-sm"
                      style={{ color: "#9A2109" }}
                    >
                      {row.nilai}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-1 rounded-full ${
                        row.nilai >= 88
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
                      }`}
                    >
                      {row.kategori}
                    </span>
                  </td>
                </tr>
              ))}
              {/* Total row */}
              <tr
                className="border-t-2 border-[#9A2109]"
                style={{ background: "#FFF1F1" }}
              >
                <td colSpan={2} className="px-4 py-3 text-sm font-bold text-gray-800">
                  Rata-rata Keseluruhan
                </td>
                <td className="px-4 py-3 text-center font-black text-base" style={{ color: "#9A2109" }}>
                  {avg}
                </td>
                <td className="px-4 py-3 text-center">
                  <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-green-100 text-green-800">
                    <CheckCircle2 size={11} /> Sangat Baik
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Document */}
        <h2 className="text-base font-bold text-gray-900 mb-3">Unduh Dokumen</h2>
        <div className="flex flex-col gap-2">
          <DocumentCard title="SK Penetapan Nilai Akreditasi PN Purworejo.pdf" size="1,8 MB" />
          <DocumentCard title="Sertifikat Akreditasi 2025–2028.pdf" size="620 KB" />
        </div>
      </div>
    </div>
  );
}

function AmpuhPage() {
  const ampuhPrograms = [
    {
      icon: Activity,
      title: "Monitoring Kinerja Real-time",
      description:
        "Pemantauan capaian kinerja aparatur secara real-time melalui dashboard digital terintegrasi.",
    },
    {
      icon: Users,
      title: "Pembinaan Aparatur",
      description:
        "Program pembinaan berkelanjutan bagi seluruh aparatur PN Purworejo menuju standar pelayanan unggul.",
    },
    {
      icon: BarChart2,
      title: "Evaluasi & Pelaporan",
      description:
        "Mekanisme evaluasi periodik dengan pelaporan berbasis data untuk mendukung pengambilan keputusan.",
    },
    {
      icon: Shield,
      title: "Integritas & Anti Korupsi",
      description:
        "Internalisasi nilai humanis dan integritas dalam setiap aspek pelayanan dan pengelolaan pengadilan.",
    },
  ];

  const ampuhCapaian = [
    { label: "Aparatur Terlatih", value: "87%", sub: "dari total pegawai" },
    { label: "Indeks Kepuasan", value: "4,6", sub: "dari skala 5" },
    { label: "Pengaduan Teratasi", value: "100%", sub: "periode 2024" },
    { label: "Tahun Berjalan", value: "2022–", sub: "hingga sekarang" },
  ];

  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden">
      {/* Hero */}
      <div
        className="px-8 py-8"
        style={{
          background: "linear-gradient(135deg, #9A2109 0%, #7B1A07 60%, #4A0E04 100%)",
        }}
      >
        <div className="flex items-start gap-5">
          <div
            className="w-14 h-14 rounded-2xl flex items-center justify-center text-xl font-black flex-shrink-0"
            style={{ background: "#F9C784", color: "#9A2109" }}
          >
            A
          </div>
          <div>
            <span className="text-[#F9C784] text-xs font-bold uppercase tracking-widest mb-2 block">
              Program Unggulan
            </span>
            <h1 className="text-white text-2xl font-black leading-tight mb-1">
              Program AMPUH
            </h1>
            <p className="text-[#F9C784] text-sm font-semibold mb-2">
              Aktualisasi Menuju Pengadilan Unggul &amp; Humanis
            </p>
            <p className="text-white/70 text-sm leading-relaxed max-w-xl">
              AMPUH adalah program strategis PN Purworejo untuk mewujudkan pengadilan yang
              unggul dalam kinerja, humanis dalam pelayanan, dan berintegritas dalam setiap
              tindakan aparaturnya.
            </p>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="px-8 py-7">
        {/* Capaian */}
        <h2 className="text-base font-bold text-gray-900 mb-4">Capaian Program</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-7">
          {ampuhCapaian.map((item, i) => (
            <div
              key={i}
              className="rounded-xl border border-[#E2E8F0] p-4 text-center bg-[#F8FAFC]"
            >
              <div
                className="text-2xl font-black mb-0.5"
                style={{ color: "#9A2109" }}
              >
                {item.value}
              </div>
              <p className="text-xs font-semibold text-gray-700">{item.label}</p>
              <p className="text-xs text-gray-400">{item.sub}</p>
            </div>
          ))}
        </div>

        {/* Description */}
        <div
          className="rounded-xl p-5 mb-7 border border-[#E2E8F0]"
          style={{ background: "#F8FAFC" }}
        >
          <h3 className="text-sm font-bold text-gray-900 mb-2 flex items-center gap-2">
            <BookOpen size={15} style={{ color: "#9A2109" }} />
            Tentang Program AMPUH
          </h3>
          <p className="text-sm text-gray-600 leading-relaxed mb-3">
            Program AMPUH (Aktualisasi Menuju Pengadilan Unggul &amp; Humanis) lahir dari
            komitmen Pengadilan Negeri Purworejo untuk terus meningkatkan kualitas layanan
            peradilan. Program ini mengintegrasikan aspek kinerja, integritas, dan humanisme
            dalam satu kerangka aksi yang terukur dan berkelanjutan.
          </p>
          <p className="text-sm text-gray-600 leading-relaxed">
            Melalui AMPUH, setiap aparatur diajak untuk tidak hanya memenuhi target kinerja,
            tetapi juga menjiwai nilai-nilai pelayanan yang ramah, adil, dan bertanggung jawab
            kepada seluruh pencari keadilan.
          </p>
        </div>

        {/* Program kegiatan */}
        <h2 className="text-base font-bold text-gray-900 mb-4">Kegiatan Program</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-7">
          {ampuhPrograms.map((prog, i) => {
            const Icon = prog.icon;
            return (
              <div
                key={i}
                className="rounded-xl border border-[#E2E8F0] p-4 bg-[#F8FAFC] flex gap-3"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
                  style={{ background: "#FFF1F1" }}
                >
                  <Icon size={16} style={{ color: "#9A2109" }} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900 mb-1">{prog.title}</p>
                  <p className="text-xs text-gray-500 leading-relaxed">{prog.description}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Documents */}
        <h2 className="text-base font-bold text-gray-900 mb-3">Unduh Dokumen</h2>
        <div className="flex flex-col gap-2">
          <DocumentCard title="Panduan Program AMPUH PN Purworejo.pdf" size="1,5 MB" />
          <DocumentCard title="Laporan Pelaksanaan AMPUH 2024.pdf" size="2,1 MB" />
        </div>
      </div>
    </div>
  );
}

// ─── Main export ──────────────────────────────────────────────────────────────

export function ReformasiBirokrasiPage() {
  const { pathname } = useLocation();

  // Derive breadcrumb section label
  const getBreadcrumbLabel = () => {
    if (pathname.includes("/zona-integritas/")) {
      const areaKey = pathname.split("/").pop() ?? "";
      const data = areaDataMap[areaKey];
      return data ? `Zona Integritas · ${data.title}` : "Zona Integritas";
    }
    if (pathname.includes("/akreditasi-penjaminan-mutu")) {
      return "Akreditasi Penjaminan Mutu";
    }
    if (pathname.includes("/ampuh")) {
      return "AMPUH";
    }
    return "Reformasi Birokrasi";
  };

  // Determine which content to show
  const renderContent = () => {
    if (pathname.includes("/zona-integritas/")) {
      const areaKey = pathname.split("/").pop() ?? "";
      return <ZonaIntegritasAreaPage areaKey={areaKey} />;
    }
    if (pathname.includes("/akreditasi-penjaminan-mutu/sk-penetapan-nilai-akreditasi")) {
      return <AkreditasiPage />;
    }
    if (pathname.endsWith("/ampuh")) {
      return <AmpuhPage />;
    }
    // Fallback
    return (
      <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 text-center">
        <Shield size={40} className="mx-auto mb-4" style={{ color: "#9A2109" }} />
        <h2 className="text-lg font-bold text-gray-900 mb-2">Reformasi Birokrasi</h2>
        <p className="text-sm text-gray-500">
          Pilih salah satu sub-menu di sebelah kiri untuk melihat informasi detail.
        </p>
      </div>
    );
  };

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: "#F8FAFC" }}>
      <div className="max-w-7xl mx-auto px-4">
        <Breadcrumb section={getBreadcrumbLabel()} />
        <div className="flex gap-7 items-start">
          <Sidebar currentPath={pathname} />
          <main className="flex-1 min-w-0">{renderContent()}</main>
        </div>
      </div>
    </div>
  );
}
