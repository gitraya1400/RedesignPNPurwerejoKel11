import { useState } from "react";
import { Link } from "react-router";
import { ChevronDown, HelpCircle, Scale, FileText, Clock, Phone, Search } from "lucide-react";

const FAQ_ITEMS = [
  {
    category: "Layanan Umum",
    icon: Scale,
    items: [
      {
        q: "Apa jam operasional Pengadilan Negeri Purworejo?",
        a: "PN Purworejo buka Senin–Kamis pukul 08.00–16.30 WIB dan Jumat 08.00–17.00 WIB. Loket PTSP (Pelayanan Terpadu Satu Pintu) melayani Senin–Jumat pukul 08.00–15.00 WIB.",
      },
      {
        q: "Bagaimana cara menghubungi PN Purworejo?",
        a: "Anda dapat menghubungi kami melalui: Telepon (0275) 321021, Email delegasi@pn-purworejo.go.id, atau langsung datang ke Jl. Jenderal Sudirman No. 19, Purworejo, Jawa Tengah 54111.",
      },
      {
        q: "Bagaimana cara melihat jadwal persidangan?",
        a: "Jadwal sidang dapat dilihat melalui laman SIPP (Sistem Informasi Penelusuran Perkara) Mahkamah Agung, papan pengumuman di lobi PN Purworejo, atau melalui menu Jadwal Sidang di website ini.",
      },
    ],
  },
  {
    category: "Bantuan Hukum & Posbakum",
    icon: HelpCircle,
    items: [
      {
        q: "Siapa saja yang berhak mendapat bantuan hukum gratis melalui Posbakum?",
        a: "Bantuan hukum gratis tersedia bagi masyarakat tidak mampu secara ekonomi yang berhadapan dengan hukum, termasuk kelompok rentan seperti perempuan, anak-anak, dan penyandang disabilitas. Syarat utama: memiliki Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan/Desa.",
        link: { label: "Pelajari lebih lanjut tentang Posbakum", to: "/hubungi/posbakum" },
      },
      {
        q: "Apa saja layanan yang diberikan oleh Posbakum?",
        a: "Posbakum memberikan tiga jenis layanan: (1) Konsultasi dan advis hukum, (2) Bantuan pembuatan dokumen hukum, dan (3) Informasi daftar Organisasi Bantuan Hukum (OBH) yang dapat dihubungi. Layanan tersedia Senin–Jumat, pukul 09.00–14.00 WIB.",
      },
      {
        q: "Bagaimana prosedur mendapatkan pembebasan biaya perkara (Prodeo)?",
        a: "Ajukan permohonan Prodeo bersamaan dengan gugatan/permohonan, dilengkapi Surat Keterangan Tidak Mampu dari Kepala Desa/Lurah. Majelis Hakim akan memeriksa dan memutuskan permohonan dalam sidang tersendiri sebelum pokok perkara disidangkan.",
      },
    ],
  },
  {
    category: "Pendaftaran Perkara & Biaya",
    icon: FileText,
    items: [
      {
        q: "Bagaimana cara mendaftarkan perkara secara online melalui e-Court?",
        a: "Pendaftaran perkara online dapat dilakukan melalui e-Court Mahkamah Agung RI. Buat akun terlebih dahulu di ecourt.mahkamahagung.go.id, lengkapi berkas digital, kemudian pilih PN Purworejo sebagai pengadilan tujuan. Pembayaran panjar biaya perkara dilakukan melalui transfer bank.",
      },
      {
        q: "Berapa kisaran biaya perkara di PN Purworejo?",
        a: "Biaya perkara terdiri dari biaya pendaftaran, biaya proses, dan biaya panggilan. Untuk perkara perdata, biaya panjar ditetapkan berdasarkan radius domisili tergugat. Rincian biaya dapat dilihat pada papan pengumuman PTSP atau menghubungi Meja I Kepaniteraan Perdata.",
      },
      {
        q: "Dokumen apa saja yang diperlukan untuk mendaftarkan gugatan perdata?",
        a: "Dokumen yang diperlukan: (1) Surat gugatan/permohonan rangkap sesuai jumlah pihak + 3 eksemplar, (2) Fotokopi KTP penggugat, (3) Surat kuasa khusus bermaterai (jika melalui kuasa hukum), (4) Bukti-bukti tertulis yang relevan. Semua dokumen asli dibawa untuk dicocokkan.",
      },
    ],
  },
  {
    category: "Informasi Publik & GO INFO",
    icon: Search,
    items: [
      {
        q: "Bagaimana cara meminta informasi publik dari PN Purworejo?",
        a: "Permohonan informasi publik dapat diajukan melalui layanan GO INFO (Get Online Public Information) secara online, atau langsung ke loket PTSP. Siapkan identitas diri dan isi formulir permohonan informasi. Petugas akan merespons dalam 1–3 hari kerja.",
        link: { label: "Ajukan melalui GO INFO Online", to: "/hubungi/goinfo" },
      },
      {
        q: "Informasi apa saja yang dapat diminta dari PN Purworejo?",
        a: "Informasi yang tersedia antara lain: salinan putusan perkara (yang sudah berkekuatan hukum tetap), daftar perkara, DIPA dan realisasi anggaran, laporan tahunan, standar pelayanan, dan informasi lain yang dikecualikan oleh UU KIP. Salinan dokumen fisik dikenai biaya reproduksi sesuai ketentuan.",
      },
    ],
  },
  {
    category: "Pengaduan & Lain-lain",
    icon: Phone,
    items: [
      {
        q: "Bagaimana cara menyampaikan pengaduan terhadap pelayanan atau aparatur pengadilan?",
        a: "Pengaduan dapat disampaikan melalui: (1) Loket pengaduan PTSP secara langsung, (2) Surat tertulis ditujukan kepada Ketua PN Purworejo, (3) Email resmi pengadilan, atau (4) Aplikasi SIWAS MA RI untuk pengaduan yang bersifat serius terhadap hakim/aparatur. Setiap pengaduan akan ditindaklanjuti.",
      },
      {
        q: "Apakah persidangan di PN Purworejo terbuka untuk umum?",
        a: "Ya, pada prinsipnya sidang pengadilan bersifat terbuka untuk umum, kecuali perkara yang oleh undang-undang dinyatakan harus disidangkan tertutup (seperti perkara asusila dan perkara yang melibatkan anak di bawah umur). Pengunjung wajib berpakaian sopan dan menjaga ketertiban.",
      },
      {
        q: "Bagaimana cara mendapatkan salinan putusan perkara?",
        a: "Pihak yang berperkara dapat mengajukan permohonan salinan putusan melalui Kepaniteraan Hukum dengan membawa bukti identitas dan dokumen perkara. Pihak ketiga dapat meminta melalui mekanisme GO INFO. Putusan yang telah berkekuatan hukum tetap juga dapat diakses di Direktori Putusan MA RI.",
      },
    ],
  },
];

export function FAQ() {
  const [openItem, setOpenItem] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const visibleItems = activeCategory
    ? FAQ_ITEMS.filter(c => c.category === activeCategory)
    : FAQ_ITEMS;

  const toggle = (key: string) => setOpenItem(prev => prev === key ? null : key);

  return (
    <section id="faq-section" className="py-16 px-4" style={{ background: "linear-gradient(180deg,#F1F5F9 0%,#F9FAFB 100%)" }}>
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 bg-[#FFF1F1] border border-[#9A2109]/15 text-[#9A2109] text-sm px-4 py-1.5 rounded-full mb-3" style={{ fontWeight: 600 }}>
            <HelpCircle size={13} />PERTANYAAN YANG SERING DIAJUKAN
          </div>
          <h2 className="text-gray-900 mb-2" style={{ fontWeight: 800, fontSize: "clamp(1.4rem,3vw,1.9rem)" }}>
            Ada Pertanyaan?
          </h2>
          <p className="text-gray-700 text-sm max-w-lg mx-auto" style={{ lineHeight: 1.7 }}>
            Temukan jawaban atas pertanyaan umum seputar layanan, prosedur, dan informasi Pengadilan Negeri Purworejo.
          </p>
        </div>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          <button aria-label="Aksi"
            onClick={() => setActiveCategory(null)}
            className={`text-sm px-4 py-2 rounded-full border transition-all ${
              activeCategory === null
                ? "bg-[#9A2109] text-white border-[#9A2109]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#9A2109] hover:text-[#9A2109]"
            }`}
            style={{ fontWeight: activeCategory === null ? 700 : 500 }}
          >
            Semua Topik
          </button>
          {FAQ_ITEMS.map(cat => (
            <button aria-label="Aksi"
              key={cat.category}
              onClick={() => setActiveCategory(cat.category === activeCategory ? null : cat.category)}
              className={`text-sm px-4 py-2 rounded-full border transition-all ${
                activeCategory === cat.category
                  ? "bg-[#9A2109] text-white border-[#9A2109]"
                  : "bg-white text-gray-600 border-gray-200 hover:border-[#9A2109] hover:text-[#9A2109]"
              }`}
              style={{ fontWeight: activeCategory === cat.category ? 700 : 500 }}
            >
              {cat.category}
            </button>
          ))}
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {visibleItems.map(cat => (
            <div key={cat.category}>
              {/* Category label */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: "#9A2109" }}>
                  <cat.icon size={13} className="text-white" />
                </div>
                <p className="text-gray-700 text-sm tracking-wide uppercase" style={{ fontWeight: 700 }}>
                  {cat.category}
                </p>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              <div className="space-y-2 mb-6">
                {cat.items.map((item, idx) => {
                  const key = `${cat.category}-${idx}`;
                  const isOpen = openItem === key;
                  return (
                    <div
                      key={key}
                      className={`bg-white rounded-2xl border transition-all overflow-hidden shadow-sm ${
                        isOpen ? "border-[#9A2109]/25 shadow-md" : "border-gray-100 hover:border-gray-200"
                      }`}
                    >
                      <button aria-label="Aksi"
                        className="w-full flex items-center justify-between px-5 py-4 text-left gap-4"
                        onClick={() => toggle(key)}
                      >
                        <span
                          className={`text-sm transition-colors ${isOpen ? "text-[#9A2109]" : "text-gray-800"}`}
                          style={{ fontWeight: 600, lineHeight: 1.5 }}
                        >
                          {item.q}
                        </span>
                        <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                          isOpen ? "bg-[#9A2109]" : "bg-gray-100"
                        }`}>
                          <ChevronDown
                            size={15}
                            className={`transition-transform ${isOpen ? "rotate-180 text-white" : "text-gray-600"}`}
                          />
                        </div>
                      </button>

                      {isOpen && (
                        <div className="px-5 pb-5">
                          <div className="h-px bg-gray-100 mb-4" />
                          <p className="text-gray-600 text-sm" style={{ lineHeight: 1.8 }}>
                            {item.a}
                          </p>
                          {item.link && (
                            <Link
                              to={item.link.to}
                              className="inline-flex items-center gap-1.5 mt-3 text-sm text-[#9A2109] hover:underline"
                              style={{ fontWeight: 600 }}
                            >
                              {item.link.label}
                              <ChevronDown size={11} className="-rotate-90" />
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-8 text-center bg-white rounded-2xl border border-gray-100 shadow-sm px-6 py-6">
          <p className="text-gray-700 text-sm mb-3" style={{ fontWeight: 600 }}>
            Tidak menemukan jawaban yang Anda cari?
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <a
              href="tel:02753210221"
              className="inline-flex items-center gap-2 bg-[#9A2109] text-white px-5 py-2.5 rounded-xl text-sm hover:bg-[#7B1A07] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Phone size={14} />Hubungi Kami
            </a>
            <Link
              to="/hubungi/posbakum"
              className="inline-flex items-center gap-2 bg-gray-50 border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl text-sm hover:border-[#9A2109] hover:text-[#9A2109] transition-colors"
              style={{ fontWeight: 600 }}
            >
              <Scale size={14} />Konsultasi Hukum Gratis
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
