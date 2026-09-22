import { Link, useLocation } from "react-router";
import {
  ChevronRight,
  Scale,
  FileText,
  Download,
  MapPin,
  Banknote,
  Bell,
  Gavel,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Phone,
  BookOpen,
  AlertCircle,
  ClipboardList,
  Home,
  Users,
  Building2,
  HandHeart,
  Landmark,
} from "lucide-react";

// ─── Sidebar nav definition ──────────────────────────────────────────────────
const sideNav = [
  {
    group: "Panduan & Alur",
    items: [
      { label: "Panduan Alur Berperkara", path: "/layanan-hukum/panduan-alur-berperkara" },
    ],
  },
  {
    group: "Bantuan Hukum",
    items: [
      { label: "POSBAKUM", path: "/hubungi/posbakum" },
      {
        label: "Prodeo (Biaya Perkara Gratis)",
        path: "/layanan-hukum/layanan-hukum-bagi-masyarakat-kurang-mampu/prosedur-pembebasan-biaya-perkara-prodeo",
      },
    ],
  },
  {
    group: "Prosedur Perkara",
    items: [
      {
        label: "Prosedur Pengajuan Perkara",
        path: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara",
      },
      {
        label: "Biaya Perkara",
        path: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/biaya-perkara",
      },
      {
        label: "Sisa Panjar Biaya Perkara",
        path: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/pengumuman-sisa-panjar-biaya-perkara",
      },
    ],
  },
  {
    group: "Eksekusi",
    items: [
      { label: "Prosedur Eksekusi", path: "/layanan-hukum/prosedur-eksekusi" },
    ],
  },
  {
    group: "Lainnya",
    items: [
      { label: "Zitting Plaats", path: "/layanan-hukum/zitting-plaats" },
      { label: "Peraturan & Kebijakan", path: "/layanan-hukum/peraturan-dan-kebijakan" },
    ],
  },
];

// ─── Sidebar component ────────────────────────────────────────────────────────
function SidebarNav({ currentPath }: { currentPath: string }) {
  return (
    <div className="rounded-2xl overflow-hidden border border-[#E2E8F0] shadow-[0_2px_8px_rgba(0,0,0,0.06)]">
      {/* Header */}
      <div className="bg-[#9A2109] px-5 py-4">
        <div className="flex items-center gap-2.5">
          <Scale size={18} className="text-white" />
          <span className="text-sm font-bold text-white tracking-wide">Layanan Hukum</span>
        </div>
      </div>
      {/* Groups */}
      <div className="bg-white divide-y divide-[#F1F5F9]">
        {sideNav.map((group) => (
          <div key={group.group} className="py-2">
            <p className="px-4 pt-2 pb-1 text-sm font-bold text-[#94A3B8] uppercase tracking-widest">
              {group.group}
            </p>
            {group.items.map((item) => {
              const isActive = currentPath === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors ${
                    isActive
                      ? "bg-[#FFF1F1] text-[#9A2109] font-semibold border-r-2 border-[#9A2109]"
                      : "text-[#475569] hover:bg-[#F8FAFC] hover:text-[#9A2109]"
                  }`}
                >
                  <ChevronRight
                    size={12}
                    className={isActive ? "text-[#9A2109]" : "text-[#CBD5E1]"}
                  />
                  {item.label}
                </Link>
              );
            })}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Breadcrumb labels ────────────────────────────────────────────────────────
const labelMap: Record<string, string> = {
  "layanan-hukum": "Layanan Hukum",
  "layanan-hukum-bagi-masyarakat-kurang-mampu": "Bantuan Hukum",
  "prosedur-pembebasan-biaya-perkara-prodeo": "Pembebasan Biaya Perkara (Prodeo)",
  "peraturan-dan-kebijakan": "Peraturan & Kebijakan",
  "zitting-plaats": "Zitting Plaats",
  "prosedur-pengajuan-perkara-dan-biaya-perkara": "Prosedur & Biaya Perkara",
  "prosedur-pengajuan-perkara": "Prosedur Pengajuan Perkara",
  "biaya-perkara": "Biaya Perkara",
  "pengumuman-sisa-panjar-biaya-perkara": "Sisa Panjar Biaya Perkara",
  "prosedur-eksekusi": "Prosedur Eksekusi",
};

function segLabel(seg: string) {
  return labelMap[seg] ?? seg.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

// ─── Page: Prodeo ─────────────────────────────────────────────────────────────
function ProdeoPage() {
  const syarat = [
    "Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan/Desa setempat",
    "Fotokopi Kartu Tanda Penduduk (KTP) yang masih berlaku",
    "Fotokopi Kartu Keluarga (KK)",
    "Dokumen perkara: surat gugatan, bukti kepemilikan, atau dokumen relevan lainnya",
    "Surat pernyataan tidak mampu bermeterai yang ditandatangani pemohon",
  ];

  const steps = [
    {
      num: 1,
      icon: FileText,
      title: "Ajukan Permohonan ke PTSP",
      desc: "Datang ke loket PTSP Pengadilan Negeri Purworejo dengan membawa seluruh persyaratan yang telah disiapkan. Petugas akan memeriksa kelengkapan berkas permohonan Prodeo Anda.",
    },
    {
      num: 2,
      icon: Users,
      title: "Verifikasi & Penetapan Hakim",
      desc: "Ketua Pengadilan memeriksa permohonan dan mengeluarkan penetapan apabila memenuhi syarat. Pemeriksaan dilakukan oleh Hakim yang ditunjuk khusus untuk menilai kelayakan.",
    },
    {
      num: 3,
      icon: Scale,
      title: "Proses Persidangan Gratis",
      desc: "Setelah penetapan dikabulkan, seluruh biaya perkara (panjar, pemanggilan, dll.) ditanggung oleh negara melalui anggaran DIPA. Pemohon tidak dikenakan biaya apapun.",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Hero */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <Scale size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">
            Prosedur Pembebasan Biaya Perkara (Prodeo)
          </h1>
          <p className="text-sm text-[#64748B]">
            Layanan hukum gratis bagi warga kurang mampu — Pengadilan Negeri Purworejo
          </p>
        </div>
      </div>

      {/* Dasar hukum */}
      <div className="flex items-start gap-3 bg-[#FFF8F7] border border-[#FECACA] rounded-xl p-4">
        <BookOpen size={16} className="text-[#9A2109] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#7F1D1D] leading-relaxed">
          <span className="font-bold">Dasar Hukum:</span>{" "}
          PERMA No. 1 Tahun 2014 tentang Pedoman Pemberian Layanan Hukum bagi Masyarakat Tidak Mampu di Pengadilan.
        </p>
      </div>

      {/* Syarat */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Persyaratan Pengajuan</h2>
        <ul className="space-y-3">
          {syarat.map((s, i) => (
            <li key={i} className="flex items-start gap-3 bg-[#F8FAFC] rounded-xl p-3.5 border border-[#E2E8F0]">
              <div className="w-6 h-6 rounded-full bg-[#FFF1F1] flex items-center justify-center flex-shrink-0 mt-0.5">
                <CheckCircle2 size={14} className="text-[#9A2109]" />
              </div>
              <span className="text-sm text-[#475569] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Langkah-Langkah Pengajuan</h2>
        <div className="grid grid-cols-1 gap-4">
          {steps.map(({ num, icon: Icon, title, desc }) => (
            <div key={num} className="flex gap-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5">
              <div className="flex flex-col items-center gap-2 flex-shrink-0">
                <div className="w-10 h-10 rounded-xl bg-[#9A2109] text-white flex items-center justify-center font-bold text-base">
                  {num}
                </div>
                {num < steps.length && <div className="w-0.5 flex-1 bg-[#E2E8F0] min-h-[24px]" />}
              </div>
              <div className="flex-1 pt-1">
                <div className="flex items-center gap-2 mb-1.5">
                  <Icon size={15} className="text-[#9A2109]" />
                  <h2 className="text-sm font-bold text-[#1E293B]">{title}</h2>
                </div>
                <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="bg-gradient-to-r from-[#9A2109] to-[#7A1A07] rounded-2xl p-6 text-white">
        <div className="flex items-center gap-3 mb-2">
          <HandHeart size={20} className="text-[#F9C784]" />
          <h2 className="font-bold text-base">Butuh Bantuan?</h2>
        </div>
        <p className="text-sm text-white/80 mb-4">
          Hubungi Pos Bantuan Hukum (POSBAKUM) di PN Purworejo atau datang langsung ke loket PTSP.
        </p>
        <Link
          to="/hubungi/posbakum"
          className="inline-flex items-center gap-2 bg-[#F9C784] text-[#7A1A07] rounded-lg px-4 py-2 text-sm font-bold hover:bg-[#F8B84E] transition-colors"
        >
          Info POSBAKUM <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── Page: Peraturan & Kebijakan ──────────────────────────────────────────────
function PeraturanPage() {
  const peraturan = [
    {
      judul: "Pedoman Pemberian Layanan Hukum bagi Masyarakat Tidak Mampu di Pengadilan",
      nomor: "1",
      tahun: "2014",
      jenis: "PERMA",
    },
    {
      judul: "Pedoman Mengadili Perkara Perempuan Berhadapan dengan Hukum",
      nomor: "3",
      tahun: "2017",
      jenis: "PERMA",
    },
    {
      judul: "Tata Cara Penyelesaian Gugatan Sederhana (Small Claim Court)",
      nomor: "4",
      tahun: "2019",
      jenis: "PERMA",
    },
    {
      judul: "Pedoman Pelayanan Informasi di Pengadilan (PPID)",
      nomor: "1-144/KMA/SK",
      tahun: "2011",
      jenis: "SK KMA",
    },
    {
      judul: "Tata Cara Penyelesaian Perkara Pidana di Pengadilan Negeri",
      nomor: "2",
      tahun: "2014",
      jenis: "SEMA",
    },
    {
      judul: "Keterbukaan Informasi Publik",
      nomor: "14",
      tahun: "2008",
      jenis: "UU",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <BookOpen size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Peraturan &amp; Kebijakan</h1>
          <p className="text-sm text-[#64748B]">
            Daftar regulasi yang menjadi dasar pelaksanaan layanan hukum di Pengadilan Negeri Purworejo
          </p>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
        <table className="w-full text-sm">
          <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
            <tr>
              {["No.", "Judul Peraturan", "Nomor", "Tahun", "Unduh"].map((h) => (
                <th
                  key={h}
                  className="px-4 py-3 text-left text-sm font-bold text-[#475569] uppercase tracking-wide whitespace-nowrap"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-[#F1F5F9]">
            {peraturan.map((p, i) => (
              <tr key={i} className="hover:bg-[#FFF8F7] transition-colors">
                <td className="px-4 py-3 text-[#94A3B8] font-medium">{i + 1}</td>
                <td className="px-4 py-3 text-[#1E293B]">
                  <span className="inline-block mr-2 px-1.5 py-0.5 rounded text-sm font-bold bg-[#FFF1F1] text-[#9A2109]">
                    {p.jenis}
                  </span>
                  {p.judul}
                </td>
                <td className="px-4 py-3 text-[#475569] whitespace-nowrap">No. {p.nomor}</td>
                <td className="px-4 py-3 text-[#475569]">{p.tahun}</td>
                <td className="px-4 py-3">
                  <button aria-label="Aksi"
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#F8FAFC] border border-[#E2E8F0] text-sm font-semibold text-[#475569] hover:bg-[#FFF1F1] hover:text-[#9A2109] hover:border-[#FECACA] transition-colors"
                    title={`Unduh ${p.jenis} No. ${p.nomor}/${p.tahun}`}
                  >
                    <Download size={13} />
                    Unduh
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
        <AlertCircle size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#92400E] leading-relaxed">
          Dokumen peraturan dapat diunduh setelah tersedia secara resmi. Untuk informasi lebih lanjut,
          hubungi bagian Kepaniteraan Hukum PN Purworejo.
        </p>
      </div>
    </div>
  );
}

// ─── Page: Zitting Plaats ─────────────────────────────────────────────────────
function ZittingPlaatsPage() {
  const lokasi = [
    {
      lokasi: "Balai Desa Kaligesing",
      kecamatan: "Kaligesing",
      jadwal: "Maret & September",
      jenis: "Perdata, Nikah/Talak",
    },
    {
      lokasi: "Kantor Kecamatan Bruno",
      kecamatan: "Bruno",
      jadwal: "April & Oktober",
      jenis: "Perdata, Waris",
    },
    {
      lokasi: "Gedung Serbaguna Gebang",
      kecamatan: "Gebang",
      jadwal: "Mei & November",
      jenis: "Perdata, Cerai Gugat",
    },
    {
      lokasi: "Balai Desa Kemiri",
      kecamatan: "Kemiri",
      jadwal: "Juni & Desember",
      jenis: "Perdata, Waris, Cerai",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <MapPin size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">
            Zitting Plaats (Sidang di Luar Gedung Pengadilan)
          </h1>
          <p className="text-sm text-[#64748B]">
            Program sidang keliling untuk meningkatkan akses keadilan di wilayah terpencil
          </p>
        </div>
      </div>

      {/* Info */}
      <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-6">
        <div className="flex items-center gap-2 mb-3">
          <Landmark size={16} className="text-[#9A2109]" />
          <h2 className="text-sm font-bold text-[#1E293B]">Tentang Program Zitting Plaats</h2>
        </div>
        <p className="text-sm text-[#475569] leading-relaxed">
          Pengadilan Negeri Purworejo menyelenggarakan sidang keliling (<em>zitting plaats</em>) di
          kecamatan-kecamatan terpencil dalam Kabupaten Purworejo. Program ini bertujuan untuk memudahkan
          akses masyarakat terhadap layanan peradilan tanpa harus menempuh jarak jauh ke kota Purworejo,
          sejalan dengan prinsip keterbukaan dan kemudahan akses yang diamanatkan Mahkamah Agung RI.
        </p>
      </div>

      {/* Table */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Jadwal &amp; Lokasi Sidang Keliling</h2>
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                {["No.", "Lokasi Sidang Keliling", "Kecamatan", "Jadwal (Bulan)", "Jenis Perkara"].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-sm font-bold text-[#475569] uppercase tracking-wide whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {lokasi.map((row, i) => (
                <tr key={i} className="hover:bg-[#FFF8F7] transition-colors">
                  <td className="px-4 py-3 text-[#94A3B8] font-medium">{i + 1}</td>
                  <td className="px-4 py-3 text-[#1E293B] font-medium">{row.lokasi}</td>
                  <td className="px-4 py-3 text-[#475569]">{row.kecamatan}</td>
                  <td className="px-4 py-3 text-[#475569]">{row.jadwal}</td>
                  <td className="px-4 py-3 text-[#475569]">{row.jenis}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
        <AlertCircle size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#92400E] leading-relaxed">
          Jadwal sidang keliling dapat berubah sewaktu-waktu. Konfirmasi pelaksanaan dapat dilakukan
          melalui loket PTSP atau menghubungi Kepaniteraan Perdata PN Purworejo.
        </p>
      </div>
    </div>
  );
}

// ─── Page: Prosedur Pengajuan Perkara ────────────────────────────────────────
function ProsedurPengajuanPage() {
  const perdataSteps = [
    "Mempersiapkan surat gugatan dan dokumen bukti pendukung",
    "Mendaftarkan perkara via e-Court (online) atau langsung ke PTSP",
    "Membayar panjar biaya perkara melalui Virtual Account Bank",
    "Menghadiri sidang sesuai jadwal yang ditetapkan",
  ];

  const pidanaSteps = [
    "Berkas perkara diserahkan Jaksa Penuntut Umum (JPU) ke PN",
    "Penetapan Majelis Hakim oleh Ketua Pengadilan",
    "Pemanggilan terdakwa dan saksi oleh Jurusita",
    "Persidangan berlangsung hingga putusan inkracht",
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <ClipboardList size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Prosedur Pengajuan Perkara</h1>
          <p className="text-sm text-[#64748B]">
            Ringkasan alur pengajuan perkara di Pengadilan Negeri Purworejo
          </p>
        </div>
      </div>

      {/* Perdata */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#9A2109] flex items-center justify-center">
            <Scale size={13} className="text-white" />
          </div>
          <h2 className="text-sm font-bold text-[#1E293B]">Perkara Perdata</h2>
        </div>
        <ul className="space-y-2.5">
          {perdataSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#FFF1F1] text-[#9A2109] text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-[#475569] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Pidana */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <div className="w-6 h-6 rounded-full bg-[#475569] flex items-center justify-center">
            <Gavel size={13} className="text-white" />
          </div>
          <h2 className="text-sm font-bold text-[#1E293B]">Perkara Pidana</h2>
        </div>
        <ul className="space-y-2.5">
          {pidanaSteps.map((s, i) => (
            <li key={i} className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#F1F5F9] text-[#475569] text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="text-sm text-[#475569] leading-relaxed">{s}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#FFF8F7] to-[#FFF1F1] border border-[#FECACA] rounded-2xl p-5">
        <BookOpen size={24} className="text-[#9A2109] flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-bold text-[#1E293B] mb-0.5">Panduan Lengkap Tersedia</p>
          <p className="text-sm text-[#64748B]">
            Lihat panduan alur berperkara lengkap berikut dokumen, kalkulator panjar, dan FAQ.
          </p>
        </div>
        <Link
          to="/layanan-hukum/panduan-alur-berperkara"
          className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#9A2109] text-white rounded-xl text-sm font-bold hover:bg-[#7A1A07] transition-colors whitespace-nowrap flex-shrink-0"
        >
          Lihat Panduan Lengkap <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}

// ─── Page: Biaya Perkara ──────────────────────────────────────────────────────
function BiayaPerkaraPage() {
  const biayaTable = [
    {
      jenis: "Perkara Perdata Gugatan",
      komponen: "Panjar, Pemanggilan, Meterai, PNBP",
      estimasi: "Rp 300.000 – Rp 750.000",
    },
    {
      jenis: "Gugatan Sederhana (Small Claim Court)",
      komponen: "Panjar, Pemanggilan (1 pihak), PNBP",
      estimasi: "Rp 200.000 – Rp 500.000",
    },
    {
      jenis: "Perkara Waris / Permohonan",
      komponen: "Panjar, PNBP, Salinan Putusan",
      estimasi: "Rp 250.000 – Rp 600.000",
    },
    {
      jenis: "Perkara Pidana Biasa",
      komponen: "Ditanggung Negara (bagi terdakwa)",
      estimasi: "Gratis / DIPA",
    },
    {
      jenis: "Eksekusi Putusan",
      komponen: "Panjar Eksekusi, Aanmaning, Sita Eksekusi",
      estimasi: "Rp 500.000 – Rp 2.000.000",
    },
  ];

  const radiusTable = [
    { radius: "R1", wilayah: "Kecamatan Purworejo (dalam kota)", estimasi: "Rp 300.000" },
    { radius: "R2", wilayah: "Kecamatan lain dalam Kab. Purworejo", estimasi: "Rp 500.000 – Rp 750.000" },
    { radius: "R3", wilayah: "Luar Kab. Purworejo (dalam Prov. Jateng)", estimasi: "Rp 750.000 – Rp 1.200.000" },
    { radius: "R4", wilayah: "Luar Provinsi Jawa Tengah", estimasi: "Rp 1.200.000 – Rp 2.000.000" },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <Banknote size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Biaya Perkara</h1>
          <p className="text-sm text-[#64748B]">
            Estimasi komponen biaya panjar perkara di Pengadilan Negeri Purworejo
          </p>
        </div>
      </div>

      {/* Jenis biaya */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Estimasi Biaya per Jenis Perkara</h2>
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                {["Jenis Perkara", "Komponen Biaya", "Estimasi Panjar"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-sm font-bold text-[#475569] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {biayaTable.map((row, i) => (
                <tr key={i} className="hover:bg-[#FFF8F7] transition-colors">
                  <td className="px-4 py-3 text-[#1E293B] font-medium">{row.jenis}</td>
                  <td className="px-4 py-3 text-[#475569] text-sm">{row.komponen}</td>
                  <td className="px-4 py-3">
                    <span className={`text-sm font-semibold ${row.estimasi.includes("Gratis") ? "text-[#15803D]" : "text-[#9A2109]"}`}>
                      {row.estimasi}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Radius */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-2">Tabel Radius Panjar Biaya</h2>
        <p className="text-sm text-[#64748B] mb-4">
          Besaran panjar biaya pemanggilan ditentukan berdasarkan radius domisili para pihak terhadap Kantor PN Purworejo.
        </p>
        <div className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
          <table className="w-full text-sm">
            <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
              <tr>
                {["Kelas Radius", "Wilayah", "Estimasi Panjar Pemanggilan"].map((h) => (
                  <th key={h} className="px-4 py-3 text-left text-sm font-bold text-[#475569] uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-[#F1F5F9]">
              {radiusTable.map((row, i) => (
                <tr key={i} className="hover:bg-[#FFF8F7] transition-colors">
                  <td className="px-4 py-3">
                    <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-[#FFF1F1] text-[#9A2109] text-sm font-bold">
                      {row.radius}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[#1E293B]">{row.wilayah}</td>
                  <td className="px-4 py-3 text-[#9A2109] font-semibold text-sm">{row.estimasi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Formula */}
      <div className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5">
        <h2 className="text-sm font-bold text-[#1E293B] mb-2">Cara Penghitungan Panjar</h2>
        <p className="text-sm text-[#475569] leading-relaxed">
          Panjar biaya perkara = <strong>PNBP</strong> + <strong>Biaya Pemanggilan</strong> (jumlah pihak × tarif radius) +
          <strong> Biaya Administrasi</strong> + <strong>Meterai</strong>. Biaya dapat berbeda tergantung jumlah tergugat/saksi
          dan kompleksitas perkara. Gunakan kalkulator di bawah untuk perkiraan awal.
        </p>
      </div>

      {/* Calculator CTA */}
      <button aria-label="Aksi"
        className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#9A2109] to-[#7A1A07] text-white rounded-2xl py-4 px-6 font-bold text-sm hover:opacity-90 transition-opacity"
        type="button"
      >
        <Calculator size={20} />
        Hitung Estimasi Panjar Biaya Perkara
        <span className="text-[#F9C784] text-sm font-normal ml-1">(Segera Hadir)</span>
      </button>
    </div>
  );
}

// ─── Page: Pengumuman Sisa Panjar ─────────────────────────────────────────────
function SisaPanjarPage() {
  const announcements = [
    {
      nomor: "12/Pdt.G/2024/PN Pwr",
      tanggal: "15 Januari 2025",
      sisa: "Rp 75.000",
      status: "Dapat Diambil",
    },
    {
      nomor: "45/Pdt.P/2024/PN Pwr",
      tanggal: "22 Februari 2025",
      sisa: "Rp 120.000",
      status: "Dapat Diambil",
    },
    {
      nomor: "08/Pdt.G/2023/PN Pwr",
      tanggal: "03 Maret 2025",
      sisa: "Rp 50.000",
      status: "Sudah Diambil",
    },
    {
      nomor: "31/Pdt.G/2024/PN Pwr",
      tanggal: "18 April 2025",
      sisa: "Rp 200.000",
      status: "Dapat Diambil",
    },
    {
      nomor: "19/Pdt.P/2023/PN Pwr",
      tanggal: "05 Mei 2025",
      sisa: "Rp 85.000",
      status: "Sudah Diambil",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <Bell size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Pengumuman Sisa Panjar Biaya Perkara</h1>
          <p className="text-sm text-[#64748B]">
            Daftar sisa panjar biaya perkara yang dapat diambil oleh para pihak
          </p>
        </div>
      </div>

      <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
        <AlertCircle size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#92400E] leading-relaxed">
          Sisa panjar biaya perkara wajib diambil dalam waktu 6 bulan setelah perkara selesai. Lewat batas
          waktu tersebut, sisa panjar akan disetorkan ke Kas Negara sesuai ketentuan yang berlaku.
        </p>
      </div>

      {/* Cards */}
      <div className="space-y-3">
        {announcements.map((a, i) => {
          const bisa = a.status === "Dapat Diambil";
          return (
            <div
              key={i}
              className="flex items-center gap-4 bg-white rounded-2xl border border-[#E2E8F0] p-5 hover:shadow-[0_4px_12px_rgba(0,0,0,0.06)] transition-shadow"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  bisa ? "bg-[#DCFCE7]" : "bg-[#F1F5F9]"
                }`}
              >
                <Banknote size={22} className={bisa ? "text-[#15803D]" : "text-[#94A3B8]"} />
              </div>
              <div className="flex-1">
                <p className="text-sm font-bold text-[#1E293B] mb-0.5">{a.nomor}</p>
                <p className="text-sm text-[#64748B]">Tanggal pengumuman: {a.tanggal}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-base font-bold text-[#9A2109] mb-1">{a.sisa}</p>
                <span
                  className={`inline-block px-2.5 py-1 rounded-full text-sm font-bold ${
                    bisa
                      ? "bg-[#DCFCE7] text-[#15803D]"
                      : "bg-[#F1F5F9] text-[#64748B]"
                  }`}
                >
                  {a.status}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* CTA PTSP */}
      <div className="flex items-center gap-4 bg-gradient-to-r from-[#9A2109] to-[#7A1A07] rounded-2xl p-6 text-white">
        <Phone size={24} className="text-[#F9C784] flex-shrink-0" />
        <div>
          <p className="font-bold text-base mb-0.5">Hubungi PTSP untuk Pengambilan</p>
          <p className="text-sm text-white/80">
            Datang ke loket PTSP PN Purworejo dengan membawa identitas diri dan nomor perkara.
            Jam pelayanan: Senin–Jumat, 08.00–15.00 WIB.
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Page: Prosedur Eksekusi ──────────────────────────────────────────────────
function EksekusiPage() {
  const jenisEksekusi = [
    {
      icon: Home,
      title: "Eksekusi Riil",
      desc: "Pelaksanaan putusan yang mewajibkan pihak untuk menyerahkan benda tertentu, mengosongkan tanah/bangunan, atau melakukan/tidak melakukan suatu perbuatan.",
    },
    {
      icon: Banknote,
      title: "Eksekusi Bayar (Grosse Akta)",
      desc: "Pelaksanaan putusan yang mewajibkan pembayaran sejumlah uang. Dilakukan dengan sita eksekusi atas harta kekayaan tergugat apabila tidak dipenuhi sukarela.",
    },
    {
      icon: Building2,
      title: "Eksekusi Lelang",
      desc: "Penjualan harta benda yang telah disita melalui kantor lelang negara (KPKNL) untuk memenuhi kewajiban pembayaran yang diperintahkan putusan.",
    },
  ];

  const steps = [
    {
      num: 1,
      icon: FileText,
      title: "Permohonan Eksekusi",
      desc: "Pemohon (penggugat/pemenang perkara) mengajukan permohonan eksekusi secara tertulis kepada Ketua Pengadilan Negeri Purworejo disertai salinan putusan yang telah berkekuatan hukum tetap (BHT/inkracht).",
      docs: ["Salinan putusan inkracht", "KTP pemohon", "Surat permohonan eksekusi", "Bukti lunas biaya pendaftaran"],
    },
    {
      num: 2,
      icon: Users,
      title: "Teguran (Aanmaning)",
      desc: "Ketua Pengadilan memanggil pihak yang dikalahkan untuk diperingatkan agar sukarela memenuhi isi putusan dalam jangka waktu 8 hari. Apabila tidak dipenuhi, dilanjutkan ke tahap penetapan sita.",
      docs: ["Relaas Aanmaning", "Berita Acara Tegoran"],
    },
    {
      num: 3,
      icon: Gavel,
      title: "Penetapan Sita Eksekusi",
      desc: "Apabila aanmaning tidak diindahkan, Ketua Pengadilan menerbitkan Surat Penetapan Sita Eksekusi. Jurusita dibantu dua saksi melaksanakan sita atas harta benda yang telah diidentifikasi.",
      docs: ["Penetapan Sita Eksekusi", "Berita Acara Sita", "Daftar barang sita"],
    },
    {
      num: 4,
      icon: CheckCircle2,
      title: "Pelaksanaan Eksekusi",
      desc: "Eksekusi riil dilaksanakan oleh Jurusita di lokasi objek. Untuk eksekusi bayar/lelang, berkas diserahkan ke KPKNL. Seluruh pelaksanaan dituangkan dalam Berita Acara Eksekusi.",
      docs: ["Berita Acara Eksekusi", "Risalah Lelang (jika lelang)", "Laporan Pelaksanaan"],
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
          <Gavel size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Prosedur Eksekusi Putusan</h1>
          <p className="text-sm text-[#64748B]">
            Tata cara permohonan dan pelaksanaan eksekusi putusan di Pengadilan Negeri Purworejo
          </p>
        </div>
      </div>

      {/* Jenis Eksekusi */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Jenis-Jenis Eksekusi</h2>
        <div className="grid grid-cols-1 gap-4">
          {jenisEksekusi.map(({ icon: Icon, title, desc }, i) => (
            <div key={i} className="flex gap-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5">
              <div className="w-11 h-11 rounded-xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                <Icon size={20} className="text-[#9A2109]" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-[#1E293B] mb-1">{title}</h2>
                <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Steps */}
      <div>
        <h2 className="text-base font-bold text-[#1E293B] mb-4">Alur 4 Tahap Eksekusi</h2>
        <div className="space-y-4">
          {steps.map(({ num, icon: Icon, title, desc, docs }) => (
            <div key={num} className="rounded-2xl border border-[#E2E8F0] overflow-hidden">
              {/* Step header */}
              <div className="flex items-center gap-3 bg-[#F8FAFC] px-5 py-3.5 border-b border-[#E2E8F0]">
                <div className="w-8 h-8 rounded-xl bg-[#9A2109] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                  {num}
                </div>
                <Icon size={16} className="text-[#9A2109]" />
                <h2 className="text-sm font-bold text-[#1E293B]">{title}</h2>
              </div>
              {/* Step body */}
              <div className="p-5 space-y-3">
                <p className="text-sm text-[#475569] leading-relaxed">{desc}</p>
                <div>
                  <p className="text-sm font-bold text-[#94A3B8] uppercase tracking-wide mb-2">
                    Dokumen yang Diperlukan
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {docs.map((d, j) => (
                      <span
                        key={j}
                        className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FFF1F1] text-[#9A2109] rounded-lg text-sm font-medium"
                      >
                        <FileText size={11} />
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Note */}
      <div className="flex items-start gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
        <AlertCircle size={16} className="text-[#B45309] flex-shrink-0 mt-0.5" />
        <p className="text-sm text-[#92400E] leading-relaxed">
          Biaya eksekusi disesuaikan dengan jenis eksekusi dan lokasi objek. Untuk informasi lebih
          lanjut, konsultasikan dengan Panitera Perdata di loket PTSP PN Purworejo.
        </p>
      </div>
    </div>
  );
}

// ─── Main exported page ───────────────────────────────────────────────────────
export function LayananHukumPage() {
  const { pathname } = useLocation();
  const segments = pathname.split("/").filter(Boolean);

  // Resolve which content component to render
  function renderContent() {
    if (pathname.includes("prosedur-pembebasan-biaya-perkara-prodeo")) return <ProdeoPage />;
    if (pathname.includes("peraturan-dan-kebijakan")) return <PeraturanPage />;
    if (pathname.includes("zitting-plaats")) return <ZittingPlaatsPage />;
    if (pathname.includes("prosedur-pengajuan-perkara") && !pathname.includes("biaya") && !pathname.includes("sisa")) {
      return <ProsedurPengajuanPage />;
    }
    if (pathname.includes("biaya-perkara") && !pathname.includes("sisa")) return <BiayaPerkaraPage />;
    if (pathname.includes("pengumuman-sisa-panjar")) return <SisaPanjarPage />;
    if (pathname.includes("prosedur-eksekusi")) return <EksekusiPage />;

    // Fallback
    return (
      <div className="space-y-6">
        <div className="flex items-start gap-5 pb-6 border-b border-[#E2E8F0]">
          <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
            <Scale size={28} className="text-[#9A2109]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[#1E293B]">Layanan Hukum</h1>
            <p className="text-sm text-[#64748B]">Pengadilan Negeri Purworejo</p>
          </div>
        </div>
        <div className="flex items-center gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
          <AlertCircle size={16} className="text-[#B45309] flex-shrink-0" />
          <p className="text-sm text-[#92400E]">
            Konten halaman ini sedang dalam proses pembaruan. Silakan kunjungi kembali dalam waktu dekat.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb bar */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-4">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B]">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">
              Beranda
            </Link>
            {segments.map((seg, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {i === segments.length - 1 ? (
                  <span className="text-[#9A2109] font-semibold">{segLabel(seg)}</span>
                ) : (
                  <Link
                    to={"/" + segments.slice(0, i + 1).join("/")}
                    className="hover:text-[#9A2109] transition-colors"
                  >
                    {segLabel(seg)}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-[260px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="sticky top-24">
            <SidebarNav currentPath={pathname} />
          </div>

          {/* Main content card */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
}
