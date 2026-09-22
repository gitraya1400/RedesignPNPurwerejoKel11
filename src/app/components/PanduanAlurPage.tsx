import { useState } from "react";
import { Link } from "react-router";
import {
  ChevronRight, Download, Calculator, CheckCircle2, Clock,
  Banknote, HandHeart, FileText, CreditCard, Users, Scale,
  BookOpen, ExternalLink, Award, ArrowRight
} from "lucide-react";

const tabs = [
  "Perkara Perdata Gugatan",
  "Gugatan Sederhana (Small Claim Court)",
  "Perkara Pidana Biasa",
  "Pelanggaran Denda Tilang",
];

const summaryCards = [
  {
    icon: Clock,
    label: "Estimasi Waktu Penyelesaian",
    value: "Maksimal 5 Bulan",
    sub: "Sesuai SEMA No. 2/2014",
    color: "#9A2109",
    bg: "#FFF1F1",
  },
  {
    icon: Banknote,
    label: "Biaya Panjar Perkara",
    value: "Transparan",
    sub: "Berdasarkan Radius Domisili — Kalkulator Panjar Tersedia",
    color: "#B45309",
    bg: "#FEF3C7",
  },
  {
    icon: HandHeart,
    label: "Bantuan Prodeo / Gratis",
    value: "Tersedia",
    sub: "Bagi warga kurang mampu via POSBAKUM",
    color: "#15803D",
    bg: "#DCFCE7",
  },
];

const steps = [
  {
    num: 1,
    title: "Pendaftaran Berkas & Gugatan",
    icon: FileText,
    description:
      "Penggugat mendaftarkan gugatan baik secara online melalui aplikasi e-Court Mahkamah Agung atau datang langsung ke loket PTSP PN Purworejo. Petugas akan memeriksa kelengkapan berkas sebelum diterima.",
    tags: ["KTP Penggugat", "Surat Gugatan 5 Rangkap", "Bukti Awal Pembayaran Panjar"],
    cta: { label: "Unduh Format Contoh Surat Gugatan (.DOCX)", icon: Download, href: "#" },
    highlight: null,
  },
  {
    num: 2,
    title: "Pembayaran Panjar Biaya Perkara",
    icon: CreditCard,
    description:
      "Pembayaran dilakukan melalui transfer Virtual Account Bank (bukan tunai ke petugas) untuk menjamin transparansi dan integritas bebas pungli. Simpan bukti transfer sebagai kelengkapan berkas.",
    tags: [],
    cta: { label: "Hitung Estimasi Biaya di Kalkulator Panjar →", icon: Calculator, href: "#" },
    highlight: null,
  },
  {
    num: 3,
    title: "Penetapan Majelis Hakim & Pemanggilan Sidang",
    icon: Users,
    description:
      "Ketua Pengadilan menetapkan Majelis Hakim dan Panitera Pengganti. Jurusita akan menyampaikan surat panggilan resmi (Relaas) ke alamat para pihak. Pastikan alamat yang didaftarkan benar dan dapat dijangkau.",
    tags: [],
    cta: null,
    highlight: null,
  },
  {
    num: 4,
    title: "Proses Mediasi (Wajib Damai)",
    icon: Scale,
    description:
      "Sebelum sidang dimulai, para pihak wajib melalui tahap mediasi dengan Hakim Mediator bersertifikat secara gratis untuk mencari jalan damai. Proses mediasi berlangsung paling lama 30 hari kerja dan dapat diperpanjang.",
    tags: [],
    cta: null,
    highlight: "90% Masalah Selesai di Tahap Mediasi",
  },
  {
    num: 5,
    title: "Persidangan & Pembacaan Putusan",
    icon: BookOpen,
    description:
      "Jika mediasi tidak tercapai, sidang dilanjutkan — pembacaan gugatan, jawaban, pembuktian, kesimpulan, hingga putusan. Salinan putusan dapat diunduh via e-Court atau diambil di PTSP.",
    tags: ["Salinan Putusan via e-Court", "Pengambilan Fisik di PTSP"],
    cta: null,
    highlight: null,
  },
];

export function PanduanAlurPage() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] pt-24 pb-0">
        <div className="max-w-[1440px] mx-auto px-8 pt-6 pb-0">
          <nav className="flex items-center gap-1.5 text-sm text-white/60 mb-6">
            <Link to="/" className="hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={12} />
            <span className="hover:text-white cursor-pointer transition-colors">Layanan Hukum</span>
            <ChevronRight size={12} />
            <span className="text-white font-semibold">Panduan Alur Perkara</span>
          </nav>

          <div className="max-w-2xl mb-8">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-3 py-1.5 text-sm text-[#F9C784] font-semibold mb-4">
              <Award size={12} />
              Panduan Resmi PN Purworejo Kelas IB
            </div>
            <h1 className="text-3xl font-bold text-white leading-tight mb-3">
              Panduan Alur Berperkara &<br />Bantuan Hukum
            </h1>
            <p className="text-white/75 text-sm leading-relaxed">
              Panduan langkah demi langkah yang transparan, mudah dipahami, dan bebas dari istilah hukum yang membingungkan bagi masyarakat awam.
            </p>
          </div>

          {/* Tab Control */}
          <div className="flex gap-0 overflow-x-auto scrollbar-hide">
            {tabs.map((tab, i) => (
              <button aria-label="Aksi"
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`relative flex-shrink-0 px-5 py-3.5 text-sm font-semibold transition-all rounded-t-xl mr-1 ${
                  activeTab === i
                    ? "bg-white text-[#9A2109]"
                    : "text-white/70 hover:text-white hover:bg-white/10"
                }`}
              >
                {tab}
                {activeTab === i && (
                  <span className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#F9C784] rounded-full" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Tab Content */}
      <div className="max-w-[1440px] mx-auto px-8 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-3 gap-5">
          {summaryCards.map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div
              key={label}
              className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] flex gap-4"
            >
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                style={{ background: bg }}
              >
                <Icon size={20} style={{ color }} />
              </div>
              <div>
                <p className="text-sm text-[#64748B] font-semibold uppercase tracking-wide mb-1">{label}</p>
                <p className="text-base font-bold text-[#1E293B] mb-0.5" style={{ color }}>{value}</p>
                <p className="text-sm text-[#64748B] leading-relaxed">{sub}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Main content: Stepper + aside */}
        <div className="grid grid-cols-[1fr_320px] gap-8 items-start">
          {/* Vertical Stepper */}
          <div className="space-y-0">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-7 py-5 border-b border-[#F1F5F9] bg-[#F8FAFC]">
                <h2 className="text-base font-bold text-[#1E293B]">Alur Perkara: {tabs[activeTab]}</h2>
                <p className="text-sm text-[#64748B] mt-0.5">Ikuti langkah-langkah berikut secara berurutan</p>
              </div>

              <div className="divide-y divide-[#F1F5F9]">
                {steps.map((step, i) => {
                  const Icon = step.icon;
                  const isLast = i === steps.length - 1;
                  return (
                    <div key={step.num} className="px-7 py-6 flex gap-5">
                      {/* Step number + connector */}
                      <div className="flex flex-col items-center">
                        <div className="w-9 h-9 rounded-full bg-[#9A2109] text-white flex items-center justify-center text-sm font-bold flex-shrink-0 shadow-sm">
                          {step.num}
                        </div>
                        {!isLast && <div className="w-0.5 flex-1 bg-[#E2E8F0] mt-2 min-h-[2rem]" />}
                      </div>

                      {/* Content */}
                      <div className="flex-1 pb-2">
                        <div className="flex items-center gap-2.5 mb-2">
                          <div className="w-7 h-7 rounded-lg bg-[#FFF1F1] flex items-center justify-center">
                            <Icon size={14} className="text-[#9A2109]" />
                          </div>
                          <h2 className="text-sm font-bold text-[#1E293B]">{step.title}</h2>
                        </div>

                        <p className="text-sm text-[#475569] leading-relaxed mb-3">{step.description}</p>

                        {step.highlight && (
                          <div className="inline-flex items-center gap-2 bg-[#DCFCE7] border border-[#86EFAC] text-[#15803D] text-sm font-bold px-3 py-1.5 rounded-full mb-3">
                            <CheckCircle2 size={13} />
                            {step.highlight}
                          </div>
                        )}

                        {step.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mb-3">
                            {step.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-sm bg-[#F1F5F9] text-[#475569] border border-[#E2E8F0] px-2.5 py-1 rounded-full font-medium"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}

                        {step.cta && (
                          <a
                            href={step.cta.href}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-[#9A2109] hover:text-[#7A1A07] bg-[#FFF1F1] hover:bg-[#FEE2E2] border border-[#FECACA] px-3.5 py-2 rounded-lg transition-all"
                          >
                            <step.cta.icon size={13} />
                            {step.cta.label}
                          </a>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Aside */}
          <div className="sticky top-24 space-y-5">
            {/* Support Card */}
            <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] rounded-2xl p-6 text-white shadow-lg">
              <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center mb-4">
                <HandHeart size={20} className="text-[#F9C784]" />
              </div>
              <p className="text-sm text-white/60 font-semibold uppercase tracking-wide mb-1">Butuh Bantuan?</p>
              <h2 className="text-base font-bold mb-3 leading-snug">
                Masih Bingung dengan Syarat atau Tidak Mampu Menyewa Pengacara?
              </h2>
              <p className="text-sm text-white/75 leading-relaxed mb-5">
                Petugas Pos Bantuan Hukum (POSBAKUM) PN Purworejo siap membantu pembuatan dokumen gugatan dan konsultasi hukum secara{" "}
                <strong className="text-[#F9C784]">100% GRATIS</strong>.
              </p>
              <div className="space-y-2.5">
                <Link
                  to="/hubungi/posbakum"
                  className="flex items-center justify-center gap-2 bg-white text-[#9A2109] text-sm font-bold px-4 py-2.5 rounded-full hover:bg-[#F9C784] transition-colors"
                >
                  <ArrowRight size={13} />
                  Daftar Konsultasi POSBAKUM Online
                </Link>
                <button aria-label="Aksi" className="w-full text-center text-sm text-white/70 hover:text-white py-1.5 transition-colors">
                  Lihat Syarat Surat Keterangan Tidak Mampu →
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <h2 className="text-sm font-bold text-[#1E293B] mb-4">Tautan Berguna</h2>
              <div className="space-y-2">
                {[
                  { label: "e-Court Mahkamah Agung", sub: "Daftar & pantau perkara online", href: "https://ecourt.mahkamahagung.go.id/" },
                  { label: "SIPP PN Purworejo", sub: "Informasi penelusuran perkara", href: "https://sipp.pn-cikarang.go.id/" },
                  { label: "JDIH Mahkamah Agung", sub: "Peraturan & yurisprudensi", href: "https://jdih.mahkamahagung.go.id/" },
                ].map(({ label, sub, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-start justify-between gap-3 p-3 rounded-xl border border-[#F1F5F9] hover:border-[#9A2109] hover:bg-[#FFF8F7] transition-all group"
                  >
                    <div>
                      <p className="text-sm font-semibold text-[#1E293B] group-hover:text-[#9A2109] transition-colors">{label}</p>
                      <p className="text-sm text-[#94A3B8] mt-0.5">{sub}</p>
                    </div>
                    <ExternalLink size={12} className="text-[#94A3B8] group-hover:text-[#9A2109] flex-shrink-0 mt-0.5 transition-colors" />
                  </a>
                ))}
              </div>
            </div>

            {/* e-Court CTA */}
            <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-5">
              <p className="text-sm font-bold text-[#1D4ED8] uppercase tracking-wide mb-2">Layanan Online</p>
              <p className="text-sm font-semibold text-[#1E40AF] mb-3 leading-snug">
                Daftarkan perkara kapan saja via e-Court tanpa perlu antri
              </p>
              <a
                href="https://ecourt.mahkamahagung.go.id/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#1D4ED8] text-white text-sm font-bold px-4 py-2 rounded-full hover:bg-[#1E40AF] transition-colors"
              >
                Buka e-Court
                <ExternalLink size={11} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
