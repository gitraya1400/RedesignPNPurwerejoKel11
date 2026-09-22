import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ChevronRight,
  Search,
  Newspaper,
  Play,
  Calendar,
  Clock,
  Tag,
  ChevronLeft,
  ArrowRight,
  Video,
} from "lucide-react";

// ─── Data ────────────────────────────────────────────────────────────────────

const categories = ["Semua", "Peradilan", "Kepegawaian", "Acara", "Pengumuman"];

const newsArticles = [
  {
    id: 1,
    category: "Kepegawaian",
    title: "Ketua PN Purworejo Lantik 2 Pejabat Baru di Lingkungan Pengadilan",
    date: "16 September 2026",
    excerpt:
      "Pengadilan Negeri Purworejo resmi melantik dua pejabat baru dalam sebuah upacara yang berlangsung khidmat di Ruang Sidang Utama. Pelantikan ini merupakan bagian dari penyegaran organisasi guna meningkatkan kualitas pelayanan peradilan. Kedua pejabat baru diharapkan mampu membawa perubahan positif bagi kemajuan lembaga.",
  },
  {
    id: 2,
    category: "Pengumuman",
    title: "PN Purworejo Raih Predikat WBK dari KemenPAN-RB Tahun 2026",
    date: "12 September 2026",
    excerpt:
      "Pengadilan Negeri Purworejo berhasil meraih predikat Wilayah Bebas dari Korupsi (WBK) dari Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi pada tahun 2026. Penghargaan ini diberikan atas capaian Pengadilan Negeri Purworejo dalam mewujudkan tata kelola pemerintahan yang bersih dan akuntabel. Prestasi ini menjadi motivasi seluruh jajaran untuk terus meningkatkan integritas dan profesionalisme.",
  },
  {
    id: 3,
    category: "Acara",
    title: "Sosialisasi Penggunaan Aplikasi e-Court Bagi Advokat dan Masyarakat Umum",
    date: "10 September 2026",
    excerpt:
      "Pengadilan Negeri Purworejo menyelenggarakan kegiatan sosialisasi aplikasi e-Court yang dihadiri oleh puluhan advokat dan masyarakat umum di Kabupaten Purworejo. Kegiatan ini bertujuan meningkatkan pemahaman dan kemampuan pengguna dalam mengakses layanan pendaftaran perkara secara daring. Para peserta mendapatkan panduan langsung dari petugas PTSP yang berpengalaman.",
  },
  {
    id: 4,
    category: "Peradilan",
    title: "Pelaksanaan Sidang Itsbat Nikah Massal Tahun 2026 di Wilayah Kabupaten Purworejo",
    date: "8 September 2026",
    excerpt:
      "Pengadilan Negeri Purworejo bekerja sama dengan Kantor Urusan Agama dan Dinas Kependudukan Kabupaten Purworejo menyelenggarakan sidang itsbat nikah massal bagi puluhan pasangan suami istri yang belum memiliki akta nikah. Kegiatan ini merupakan wujud nyata komitmen pengadilan dalam memberikan akses keadilan bagi seluruh lapisan masyarakat. Seluruh peserta mendapatkan penetapan nikah secara gratis tanpa biaya.",
  },
  {
    id: 5,
    category: "Kepegawaian",
    title: "Hakim PN Purworejo Ikuti Pelatihan Penanganan Perkara Lingkungan Hidup",
    date: "5 September 2026",
    excerpt:
      "Sebanyak dua orang hakim Pengadilan Negeri Purworejo mengikuti pelatihan peningkatan kompetensi dalam penanganan perkara lingkungan hidup yang diselenggarakan oleh Pusdiklat Mahkamah Agung RI. Pelatihan ini diharapkan dapat meningkatkan kapasitas hakim dalam memeriksa dan memutus perkara-perkara yang berkaitan dengan kejahatan terhadap lingkungan. Dengan bekal pelatihan ini, penanganan perkara lingkungan hidup di PN Purworejo diharapkan semakin profesional.",
  },
  {
    id: 6,
    category: "Pengumuman",
    title: "PN Purworejo Launching Layanan Konsultasi Hukum Online via WhatsApp",
    date: "2 September 2026",
    excerpt:
      "Pengadilan Negeri Purworejo secara resmi meluncurkan layanan konsultasi hukum online melalui platform WhatsApp sebagai upaya memperluas akses masyarakat terhadap informasi hukum. Layanan ini tersedia setiap hari kerja pukul 08.00 hingga 15.00 WIB dan dapat dimanfaatkan oleh seluruh masyarakat Kabupaten Purworejo. Konsultasi ditangani langsung oleh petugas POSBAKUM yang telah tersertifikasi.",
  },
];

const articleItems = [
  {
    id: 1,
    category: "Peradilan",
    title: "Peran e-Court dalam Mewujudkan Peradilan yang Cepat, Sederhana, dan Berbiaya Ringan",
    date: "15 September 2026",
    excerpt:
      "Transformasi digital di lingkungan peradilan Indonesia telah membawa perubahan mendasar dalam aksesibilitas layanan hukum. Sistem e-Court memungkinkan para pencari keadilan mendaftarkan perkara dari mana saja tanpa harus hadir secara fisik ke kantor pengadilan. Artikel ini mengulas dampak positif implementasi e-Court bagi efisiensi dan akuntabilitas sistem peradilan.",
  },
  {
    id: 2,
    category: "Kepegawaian",
    title: "Membangun SDM Aparatur Pengadilan yang Kompeten dan Berintegritas di Era Digital",
    date: "11 September 2026",
    excerpt:
      "Kemajuan teknologi informasi mengharuskan aparatur pengadilan untuk terus meningkatkan kompetensi digital mereka agar tetap relevan dan mampu memberikan pelayanan terbaik kepada masyarakat. Pengembangan kapasitas sumber daya manusia menjadi investasi strategis yang tidak dapat ditunda oleh lembaga-lembaga peradilan. Tulisan ini membahas pendekatan terkini dalam pembangunan SDM di lingkungan Mahkamah Agung.",
  },
  {
    id: 3,
    category: "Peradilan",
    title: "Keadilan Restoratif sebagai Alternatif Penyelesaian Perkara Pidana Anak di Indonesia",
    date: "7 September 2026",
    excerpt:
      "Pendekatan keadilan restoratif semakin mendapat tempat dalam sistem peradilan pidana anak Indonesia sebagai solusi yang lebih humanis dibandingkan pemidanaan konvensional. Melalui mekanisme diversi, anak yang berkonflik dengan hukum dapat diselesaikan perkaranya di luar proses pengadilan demi kepentingan terbaik si anak. Artikel ini meninjau praktik terbaik penerapan keadilan restoratif di beberapa pengadilan negeri.",
  },
  {
    id: 4,
    category: "Pengumuman",
    title: "Zona Integritas: Komitmen PN Purworejo Menuju Wilayah Bebas Korupsi dan WBBM",
    date: "4 September 2026",
    excerpt:
      "Program Zona Integritas merupakan salah satu instrumen reformasi birokrasi yang paling konkret dalam mewujudkan aparatur negara yang bersih dan melayani. Pengadilan Negeri Purworejo telah menempuh berbagai langkah strategis sejak 2024 untuk memenuhi indikator-indikator WBK dan WBBM. Komitmen pimpinan dan seluruh pegawai menjadi kunci keberhasilan program transformasi ini.",
  },
  {
    id: 5,
    category: "Acara",
    title: "Sidang Keliling sebagai Perwujudan Akses Keadilan bagi Masyarakat Terpencil",
    date: "1 September 2026",
    excerpt:
      "Sidang keliling merupakan inovasi layanan yang memungkinkan masyarakat di daerah terpencil mendapatkan akses keadilan tanpa harus menempuh perjalanan jauh ke kota. Program ini telah terbukti meningkatkan partisipasi masyarakat dalam penyelesaian sengketa hukum secara formal dan efektif. Tulisan ini menelaah pelaksanaan sidang keliling di wilayah yurisdiksi PN Purworejo selama tahun 2026.",
  },
  {
    id: 6,
    category: "Peradilan",
    title: "Transparansi Putusan Pengadilan: Hak Masyarakat dan Kewajiban Lembaga Peradilan",
    date: "29 Agustus 2026",
    excerpt:
      "Keterbukaan informasi merupakan pilar penting dalam membangun kepercayaan publik terhadap lembaga peradilan Indonesia. Undang-Undang Keterbukaan Informasi Publik mewajibkan pengadilan untuk mempublikasikan putusan dan dokumentasi perkara secara terbuka dan mudah diakses. Artikel ini membahas sejauh mana pengadilan di Indonesia telah memenuhi kewajiban transparansi tersebut.",
  },
];

const videoItems = [
  {
    id: 1,
    title: "Profil Pengadilan Negeri Purworejo 2026",
    date: "14 September 2026",
    duration: "08:42",
    gradient: "from-[#9A2109] to-[#7A1A07]",
  },
  {
    id: 2,
    title: "Tata Cara Pendaftaran Perkara via e-Court",
    date: "10 September 2026",
    duration: "12:15",
    gradient: "from-[#1D4ED8] to-[#1E3A8A]",
  },
  {
    id: 3,
    title: "Fasilitas Ruang Sidang PN Purworejo",
    date: "6 September 2026",
    duration: "05:30",
    gradient: "from-[#0F766E] to-[#134E4A]",
  },
  {
    id: 4,
    title: "Tutorial Penggunaan MASKENDANG",
    date: "3 September 2026",
    duration: "09:58",
    gradient: "from-[#7C3AED] to-[#4C1D95]",
  },
  {
    id: 5,
    title: "Sidang Keliling 2026",
    date: "30 Agustus 2026",
    duration: "06:17",
    gradient: "from-[#B45309] to-[#78350F]",
  },
  {
    id: 6,
    title: "Layanan Disabilitas PN Purworejo",
    date: "25 Agustus 2026",
    duration: "07:44",
    gradient: "from-[#0369A1] to-[#0C4A6E]",
  },
];

// ─── Tab config ───────────────────────────────────────────────────────────────

const tabs = [
  { label: "Berita Terkini", path: "/berita/berita-terkini" },
  { label: "Artikel", path: "/berita/artikel" },
  { label: "Video", path: "/berita/video" },
];

// ─── Category badge colour ────────────────────────────────────────────────────

function categoryColor(cat: string) {
  const map: Record<string, string> = {
    Peradilan: "bg-blue-50 text-blue-700 border-blue-200",
    Kepegawaian: "bg-amber-50 text-amber-700 border-amber-200",
    Acara: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Pengumuman: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return map[cat] ?? "bg-gray-50 text-gray-600 border-gray-200";
}

// ─── News card ────────────────────────────────────────────────────────────────

function NewsCard({ item }: { item: (typeof newsArticles)[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* Thumbnail */}
      <div
        className="h-44 flex items-center justify-center flex-shrink-0"
        style={{ background: "linear-gradient(135deg, #9A2109 0%, #7A1A07 100%)" }}
      >
        <Newspaper size={48} className="text-white opacity-40" />
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-center gap-2 mb-3">
          <span className={`inline-flex items-center gap-1 text-sm font-semibold px-2.5 py-0.5 rounded-full border ${categoryColor(item.category)}`}>
            <Tag size={9} />
            {item.category}
          </span>
          <span className="flex items-center gap-1 text-sm text-[#94A3B8]">
            <Calendar size={10} />
            {item.date}
          </span>
        </div>

        <h2 className="text-sm font-bold text-[#1E293B] leading-snug mb-2 line-clamp-2">
          {item.title}
        </h2>

        <p className="text-sm text-[#64748B] leading-relaxed line-clamp-3 flex-1">
          {item.excerpt}
        </p>

        <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
          <Link
            to="#"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#9A2109] hover:text-[#7A1A07] transition-colors"
          >
            Baca Selengkapnya
            <ArrowRight size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Video card ───────────────────────────────────────────────────────────────

function VideoCard({ item }: { item: (typeof videoItems)[0] }) {
  return (
    <div className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden hover:shadow-md transition-shadow flex flex-col">
      {/* 16:9 Thumbnail */}
      <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
        <div
          className={`absolute inset-0 bg-gradient-to-br ${item.gradient} flex items-center justify-center`}
        >
          {/* Play button */}
          <div className="w-12 h-12 rounded-full bg-white bg-opacity-20 border-2 border-white border-opacity-60 flex items-center justify-center hover:bg-opacity-30 transition-all cursor-pointer">
            <Play size={20} className="text-white ml-0.5" />
          </div>
          {/* Duration badge */}
          <span className="absolute bottom-2.5 right-2.5 bg-black bg-opacity-70 text-white text-sm font-semibold px-2 py-0.5 rounded">
            {item.duration}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        <h2 className="text-sm font-bold text-[#1E293B] leading-snug mb-2 line-clamp-2 flex-1">
          {item.title}
        </h2>
        <div className="flex items-center justify-between mt-3">
          <span className="flex items-center gap-1 text-sm text-[#94A3B8]">
            <Calendar size={10} />
            {item.date}
          </span>
          <Link
            to="#"
            className="inline-flex items-center gap-1 text-sm font-semibold text-white bg-[#9A2109] hover:bg-[#7A1A07] transition-colors px-3 py-1.5 rounded-lg"
          >
            <Video size={11} />
            Tonton Video
          </Link>
        </div>
      </div>
    </div>
  );
}

// ─── Pagination ───────────────────────────────────────────────────────────────

function Pagination({
  current,
  total,
  onChange,
}: {
  current: number;
  total: number;
  onChange: (p: number) => void;
}) {
  return (
    <div className="flex items-center justify-center gap-1 mt-8">
      <button aria-label="Aksi"
        onClick={() => onChange(Math.max(1, current - 1))}
        disabled={current === 1}
        className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#9A2109] hover:text-[#9A2109] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronLeft size={14} />
      </button>
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <button aria-label="Aksi"
          key={p}
          onClick={() => onChange(p)}
          className={`w-8 h-8 rounded-lg border text-sm font-semibold transition-colors ${
            p === current
              ? "bg-[#9A2109] border-[#9A2109] text-white"
              : "border-[#E2E8F0] text-[#475569] hover:border-[#9A2109] hover:text-[#9A2109]"
          }`}
        >
          {p}
        </button>
      ))}
      <button aria-label="Aksi"
        onClick={() => onChange(Math.min(total, current + 1))}
        disabled={current === total}
        className="w-8 h-8 rounded-lg border border-[#E2E8F0] flex items-center justify-center text-[#64748B] hover:border-[#9A2109] hover:text-[#9A2109] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
      >
        <ChevronRight size={14} />
      </button>
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function BeritaPage() {
  const { pathname } = useLocation();

  const [search, setSearch] = useState("");
  const [activeFilter, setActiveFilter] = useState("Semua");
  const [page, setPage] = useState(1);

  // Determine active tab
  const activeTab = tabs.find((t) => pathname.startsWith(t.path)) ?? tabs[0];

  // Current section label for breadcrumb
  const sectionLabel = activeTab.label;

  // ── Filter helpers ──────────────────────────────────────────────────────────

  function filterArticles(items: typeof newsArticles) {
    return items.filter((item) => {
      const matchesSearch =
        search === "" ||
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.excerpt.toLowerCase().includes(search.toLowerCase());
      const matchesFilter =
        activeFilter === "Semua" || item.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }

  const isVideo = pathname.startsWith("/berita/video");
  const isArtikel = pathname.startsWith("/berita/artikel");

  const displayedArticles = filterArticles(isArtikel ? articleItems : newsArticles);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ── Breadcrumb ────────────────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-4">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B]">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">
              Beranda
            </Link>
            <ChevronRight size={12} />
            <span className="text-[#64748B]">Berita</span>
            <ChevronRight size={12} />
            <span className="text-[#9A2109] font-semibold">{sectionLabel}</span>
          </nav>
        </div>
      </div>

      {/* ── Hero / tab switcher ───────────────────────────────────────────────── */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 py-8">
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Berita &amp; Informasi</h1>
          <p className="text-sm text-[#64748B] mb-6">
            Informasi terkini seputar kegiatan dan layanan Pengadilan Negeri Purworejo
          </p>

          {/* Tabs */}
          <div className="flex gap-1 bg-[#F1F5F9] p-1 rounded-xl w-fit">
            {tabs.map((tab) => {
              const isActive = pathname.startsWith(tab.path);
              return (
                <Link
                  key={tab.path}
                  to={tab.path}
                  className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all ${
                    isActive
                      ? "bg-white text-[#9A2109] shadow-sm"
                      : "text-[#64748B] hover:text-[#1E293B]"
                  }`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Content ───────────────────────────────────────────────────────────── */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {isVideo ? (
          /* ── Video grid ─────────────────────────────────────────────────────── */
          <>
            <div className="flex items-center justify-between mb-6">
              <p className="text-sm text-[#64748B]">
                Menampilkan <span className="font-semibold text-[#1E293B]">{videoItems.length}</span> video
              </p>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {videoItems.map((v) => (
                <VideoCard key={v.id} item={v} />
              ))}
            </div>
            <Pagination current={1} total={3} onChange={() => {}} />
          </>
        ) : (
          /* ── News / artikel grid ─────────────────────────────────────────────── */
          <>
            {/* Search + filters */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              {/* Search bar */}
              <div className="relative flex-1 max-w-md">
                <Search
                  size={16}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8]"
                />
                <input aria-label="Input"
                  type="text"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setPage(1);
                  }}
                  placeholder={`Cari ${isArtikel ? "artikel" : "berita"}…`}
                  className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-[#E2E8F0] bg-white text-[#1E293B] placeholder-[#94A3B8] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109] focus:ring-opacity-10 transition-colors"
                />
              </div>

              {/* Category chips */}
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button aria-label="Aksi"
                    key={cat}
                    onClick={() => {
                      setActiveFilter(cat);
                      setPage(1);
                    }}
                    className={`px-3.5 py-1.5 rounded-full text-sm font-semibold border transition-all ${
                      activeFilter === cat
                        ? "bg-[#9A2109] border-[#9A2109] text-white"
                        : "bg-white border-[#E2E8F0] text-[#475569] hover:border-[#9A2109] hover:text-[#9A2109]"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Result count */}
            <p className="text-sm text-[#64748B] mb-5">
              Menampilkan{" "}
              <span className="font-semibold text-[#1E293B]">{displayedArticles.length}</span>{" "}
              {isArtikel ? "artikel" : "berita"}
              {activeFilter !== "Semua" && (
                <span>
                  {" "}
                  dalam kategori{" "}
                  <span className="font-semibold text-[#9A2109]">{activeFilter}</span>
                </span>
              )}
              {search !== "" && (
                <span>
                  {" "}
                  untuk kata kunci{" "}
                  <span className="font-semibold text-[#9A2109]">"{search}"</span>
                </span>
              )}
            </p>

            {displayedArticles.length === 0 ? (
              <div className="bg-white rounded-2xl border border-[#E2E8F0] p-16 text-center">
                <Newspaper size={40} className="text-[#CBD5E1] mx-auto mb-4" />
                <p className="text-[#64748B] text-sm font-medium">Tidak ada hasil yang ditemukan.</p>
                <p className="text-[#94A3B8] text-sm mt-1">Coba ubah kata kunci atau kategori pencarian.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 gap-6">
                  {displayedArticles.map((item) => (
                    <NewsCard key={item.id} item={item} />
                  ))}
                </div>
                <Pagination
                  current={page}
                  total={3}
                  onChange={(p) => {
                    setPage(p);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}
