import { useState } from "react";
import { ArrowRight, Calendar, User, Tag, Folder } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const featuredNews = {
  id: 1,
  category: "Berita Utama",
  title: "PN Purworejo Raih Predikat WBK dari Kemenpan RB: Komitmen Zona Integritas Terwujud",
  excerpt:
    "Pengadilan Negeri Purworejo berhasil meraih predikat Wilayah Bebas dari Korupsi (WBK) dari Kementerian Pendayagunaan Aparatur Negara dan Reformasi Birokrasi dalam rangkaian evaluasi zona integritas tahun 2024.",
  author: "Humas PN Purworejo",
  date: "15 Mei 2025",
  image: "https://images.unsplash.com/photo-1593115057322-e94b77572f20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VydCUyMGxlZ2FsJTIwanVzdGljZSUyMGdhdmVsfGVufDF8fHx8MTc3OTA2OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
};

const secondaryNews = [
  {
    id: 2,
    category: "Layanan",
    title: "Peluncuran Fitur Baru e-Court: Sidang Online Semakin Mudah",
    date: "12 Mei 2025",
    image: "https://images.unsplash.com/photo-1676181739859-08330dea8999?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxjb3VydCUyMGxlZ2FsJTIwanVzdGljZSUyMGdhdmVsfGVufDF8fHx8MTc3OTA2OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 3,
    category: "Kegiatan",
    title: "Workshop Mediasi Bagi Hakim dan Panitera PN Purworejo 2025",
    date: "10 Mei 2025",
    image: "https://images.unsplash.com/photo-1589391886645-d51941baf7fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwzfHxjb3VydCUyMGxlZ2FsJTIwanVzdGljZSUyMGdhdmVsfGVufDF8fHx8MTc3OTA2OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 4,
    category: "Pengumuman",
    title: "Perubahan Jadwal Operasional Pelayanan Terpadu PN Purworejo",
    date: "8 Mei 2025",
    image: "https://images.unsplash.com/photo-1589216532372-1c2a367900d9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHw0fHxjb3VydCUyMGxlZ2FsJTIwanVzdGljZSUyMGdhdmVsfGVufDF8fHx8MTc3OTA2OTU2NXww&ixlib=rb-4.1.0&q=80&w=1080",
  },
  {
    id: 5,
    category: "Reformasi",
    title: "PN Purworejo Ikuti Bimtek SAKIP dan Akuntabilitas Kinerja",
    date: "5 Mei 2025",
    image: "https://images.unsplash.com/photo-1607027919484-b99592ee488b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwyfHxJbmRvbmVzaWFuJTIwY291cnRob3VzZSUyMGp1c3RpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NzkwNjk1NjR8MA&ixlib=rb-4.1.0&q=80&w=1080",
  },
];

const announcements = [
  {
    id: 1,
    tab: "pn",
    day: "15",
    month: "Mei",
    title: "Pengumuman Penerimaan CPNS Tenaga Teknis PN Purworejo Tahun 2025",
    category: "SDM",
  },
  {
    id: 2,
    tab: "pn",
    day: "10",
    month: "Mei",
    title: "Pengumuman Lelang Barang Rampasan Negara Bulan Mei 2025",
    category: "Lelang",
  },
  {
    id: 3,
    tab: "pn",
    day: "05",
    month: "Mei",
    title: "Libur Sidang dalam Rangka Hari Raya Waisak 2025",
    category: "Jadwal",
  },
  {
    id: 4,
    tab: "pn",
    day: "28",
    month: "Apr",
    title: "Penghentian Sementara Layanan SIPP untuk Maintenance Sistem",
    category: "IT",
  },
  {
    id: 5,
    tab: "ma",
    day: "12",
    month: "Mei",
    title: "Surat Edaran MA Nomor 3 Tahun 2025 tentang Pedoman Sidang Elektronik",
    category: "Regulasi",
  },
  {
    id: 6,
    tab: "ma",
    day: "01",
    month: "Mei",
    title: "Pengesahan Peraturan MA tentang Tata Cara Mediasi di Pengadilan",
    category: "Regulasi",
  },
  {
    id: 7,
    tab: "ma",
    day: "20",
    month: "Apr",
    title: "Mahkamah Agung Luncurkan Platform Direktori Putusan Terbaru",
    category: "Inovasi",
  },
];

export function NewsSection() {
  const [announcementTab, setAnnouncementTab] = useState<"pn" | "ma">("pn");

  const filtered = announcements.filter((a) => a.tab === announcementTab);

  return (
    <section className="bg-[#F9FAFB] py-14">
      <div className="max-w-7xl mx-auto px-4">

        {/* ===== BERITA TERKINI ===== */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 bg-[#9A2109] rounded-full" />
          <h2
            className="text-gray-800"
            style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.05em" }}
          >
            BERITA TERKINI
          </h2>
        </div>

        <div className="grid lg:grid-cols-5 gap-5 mb-14">
          {/* Featured — 3/5 */}
          <div className="lg:col-span-3 bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-200 cursor-pointer group">
            <div className="relative h-56 md:h-72 overflow-hidden">
              <ImageWithFallback
                src={featuredNews.image}
                alt={featuredNews.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span className="bg-[#9A2109] text-white text-sm px-3 py-1 rounded-full" style={{ fontWeight: 600 }}>
                  {featuredNews.category}
                </span>
              </div>
            </div>
            <div className="p-5">
              <h2
                className="text-gray-900 mb-3 leading-snug group-hover:text-[#9A2109] transition-colors"
                style={{ fontWeight: 700, fontSize: "1.1rem" }}
              >
                {featuredNews.title}
              </h2>
              <p className="text-gray-700 text-sm mb-4 leading-relaxed line-clamp-3">
                {featuredNews.excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3 text-gray-600 text-sm">
                  <span className="flex items-center gap-1">
                    <User size={12} />
                    {featuredNews.author}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {featuredNews.date}
                  </span>
                </div>
                <span className="text-[#9A2109] text-sm flex items-center gap-1" style={{ fontWeight: 600 }}>
                  Baca Selengkapnya <ArrowRight size={14} />
                </span>
              </div>
            </div>
          </div>

          {/* Secondary 2x2 — 2/5 */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {secondaryNews.slice(0, 4).map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-2xl overflow-hidden border border-gray-100 hover:shadow-md transition-all duration-200 cursor-pointer group flex sm:flex-row lg:flex-row gap-0"
              >
                <div className="w-24 sm:w-20 flex-shrink-0 overflow-hidden">
                  <ImageWithFallback
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 min-h-[80px]"
                  />
                </div>
                <div className="p-3 flex-1 min-w-0">
                  <span
                    className="text-sm text-[#9A2109]"
                    style={{ fontWeight: 600 }}
                  >
                    {item.category}
                  </span>
                  <p
                    className="text-gray-800 text-sm mt-0.5 leading-snug line-clamp-2 group-hover:text-[#9A2109] transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {item.title}
                  </p>
                  <p className="text-gray-600 text-sm mt-1 flex items-center gap-1">
                    <Calendar size={10} />
                    {item.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ===== PENGUMUMAN ===== */}
        <div className="flex items-center gap-3 mb-6">
          <div className="w-1 h-7 bg-[#9A2109] rounded-full" />
          <h2
            className="text-gray-800"
            style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.05em" }}
          >
            PENGUMUMAN
          </h2>
        </div>

        {/* Announcement Tabs */}
        <div className="flex items-center gap-2 mb-6">
          <button aria-label="Aksi"
            onClick={() => setAnnouncementTab("pn")}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              announcementTab === "pn"
                ? "bg-[#9A2109] text-white shadow"
                : "border border-[#9A2109] text-[#9A2109] hover:bg-[#9A2109]/5"
            }`}
            style={{ fontWeight: 600 }}
          >
            Pengumuman PN Purworejo
          </button>
          <button aria-label="Aksi"
            onClick={() => setAnnouncementTab("ma")}
            className={`px-5 py-2 rounded-full text-sm transition-all ${
              announcementTab === "ma"
                ? "bg-[#9A2109] text-white shadow"
                : "border border-[#9A2109] text-[#9A2109] hover:bg-[#9A2109]/5"
            }`}
            style={{ fontWeight: 600 }}
          >
            Pengumuman MA RI
          </button>
        </div>

        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3 bg-white rounded-2xl border border-gray-100">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Folder size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-600 text-sm">Belum Ada Artikel</p>
            <p className="text-gray-300 text-sm">Tidak ada pengumuman saat ini</p>
          </div>
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden divide-y divide-gray-50">
            {filtered.map((ann) => (
              <div
                key={ann.id}
                className="flex items-center gap-4 px-5 py-4 hover:bg-[#FFF8F7] transition-colors cursor-pointer group"
              >
                {/* Date Badge */}
                <div className="flex-shrink-0 w-12 h-12 bg-[#9A2109] rounded-xl flex flex-col items-center justify-center">
                  <span className="text-white leading-none" style={{ fontSize: "1.1rem", fontWeight: 900 }}>
                    {ann.day}
                  </span>
                  <span className="text-white/70 text-sm">{ann.month}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <p
                    className="text-gray-800 text-sm leading-snug group-hover:text-[#9A2109] transition-colors line-clamp-2"
                    style={{ fontWeight: 600 }}
                  >
                    {ann.title}
                  </p>
                  <span className="inline-flex items-center gap-1 text-sm text-gray-600 mt-1">
                    <Tag size={10} />
                    {ann.category}
                  </span>
                </div>

                <ArrowRight
                  size={16}
                  className="text-gray-300 group-hover:text-[#9A2109] transition-colors flex-shrink-0"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
