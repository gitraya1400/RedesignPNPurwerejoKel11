import { useState } from "react";
import { Link, useLocation } from "react-router";
import {
  ChevronRight, User, Building2, MapPin, Award, BookOpen,
  Users, FileText, Shield, Phone, Mail, Clock, Star,
  CheckCircle2, Target, Eye, Heart, Landmark, Scale
} from "lucide-react";

// ─── Sidebar nav ────────────────────────────────────────────────────────────
const sideNav = [
  { label: "Pengantar Ketua", path: "/tentang-pengadilan/pengantar-dari-ketua-pengadilan" },
  { label: "Visi & Misi", path: "/tentang-pengadilan/visi-misi-pengadilan" },
  {
    label: "Profil Pengadilan", children: [
      { label: "Sejarah Pengadilan", path: "/tentang-pengadilan/sejarah-pengadilan" },
      { label: "Struktur Organisasi", path: "/tentang-pengadilan/struktur-organisasi" },
      { label: "Wilayah Yuridiksi", path: "/tentang-pengadilan/wilayah-yuridiksi" },
    ]
  },
  {
    label: "Profil Hakim & Pegawai", children: [
      { label: "Ketua", path: "/tentang-pengadilan/pegawai/18" },
      { label: "Wakil Ketua", path: "/tentang-pengadilan/pegawai/19" },
      { label: "Hakim", path: "/tentang-pengadilan/pegawai/10" },
      { label: "Panitera Pengganti", path: "/tentang-pengadilan/pegawai/16" },
      { label: "Jurusita", path: "/tentang-pengadilan/pegawai/40" },
      { label: "Staf", path: "/tentang-pengadilan/pegawai/14" },
    ]
  },
  {
    label: "Kepaniteraan", children: [
      { label: "Kepaniteraan Pidana", path: "/tentang-pengadilan/kepaniteraan-pidana" },
      { label: "Kepaniteraan Perdata", path: "/tentang-pengadilan/kepaniteraan-perdata" },
      { label: "Kepaniteraan Hukum", path: "/tentang-pengadilan/kepaniteraan-hukum" },
    ]
  },
  {
    label: "Kesekretariatan", children: [
      { label: "Perencanaan IT & Pelaporan", path: "/tentang-pengadilan/perencanaan-it-dan-pelaporan" },
      { label: "Kepegawaian & Tatalaksana", path: "/tentang-pengadilan/kepegawaian-organisasi-dan-tatalaksana" },
      { label: "Umum & Keuangan", path: "/tentang-pengadilan/umum-dan-keuangan" },
    ]
  },
  {
    label: "PTSP", children: [
      { label: "Jenis Layanan", path: "/tentang-pengadilan/ptsp/jenis-layanan" },
      { label: "Standar Pelayanan", path: "/tentang-pengadilan/ptsp/standar-pelayanan" },
      { label: "Maklumat Pelayanan", path: "/tentang-pengadilan/ptsp/maklumat-pelayanan" },
      { label: "Kompensasi Pelayanan", path: "/tentang-pengadilan/ptsp/kompensasi-pelayanan" },
    ]
  },
  {
    label: "Layanan Disabilitas", children: [
      { label: "Prosedur Pelayanan", path: "/tentang-pengadilan/prosedur-pelayanan-bagi-penyandang-disabilitas" },
      { label: "Sarana & Prasarana", path: "/tentang-pengadilan/sarana-prasarana-bagi-penyandang-disabilitas" },
    ]
  },
  { label: "Tata Tertib Pengadilan", path: "/tentang-pengadilan/tata-tertib-pengadilan" },
  {
    label: "Sistem Pengelolaan", children: [
      { label: "Rencana Strategis", path: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-strategis" },
      { label: "Rencana Kerja & Anggaran", path: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-kerja-dan-anggaran" },
      { label: "Pengawasan & Kode Etik", path: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/pengawasan-dan-kode-etik-hakim" },
    ]
  },
  { label: "Role Model & Agen Perubahan", path: "/tentang-pengadilan/profil-role-model" },
];

// ─── Staff data ───────────────────────────────────────────────────────────────
const staffByCategory: Record<string, { name: string; nip: string; jabatan: string; pendidikan: string; img?: string }[]> = {
  "18": [{ name: "H. Santoso, S.H., M.H.", nip: "196801011995031001", jabatan: "Ketua Pengadilan Negeri Purworejo Kelas IB", pendidikan: "S2 Ilmu Hukum, Universitas Gadjah Mada" }],
  "19": [{ name: "Rina Wijayanti, S.H., M.Hum.", nip: "197202151997032002", jabatan: "Wakil Ketua Pengadilan Negeri Purworejo", pendidikan: "S2 Hukum, Universitas Diponegoro" }],
  "10": [
    { name: "Budi Hartono, S.H.", nip: "197505201999031004", jabatan: "Hakim Madya Muda", pendidikan: "S1 Hukum, Universitas Sebelas Maret" },
    { name: "Tri Wibowo, S.H.", nip: "198002122003031005", jabatan: "Hakim Pertama", pendidikan: "S1 Hukum, Universitas Jenderal Soedirman" },
    { name: "Dewi Kusumawati, S.H., M.H.", nip: "197909182002122003", jabatan: "Hakim Madya Pertama", pendidikan: "S2 Ilmu Hukum, Universitas Gadjah Mada" },
    { name: "Ahmad Fauzi, S.H.", nip: "198501112005031002", jabatan: "Hakim Pertama", pendidikan: "S1 Hukum, Universitas Islam Indonesia" },
  ],
  "16": [
    { name: "Siti Rahayu, S.H.", nip: "197703142000032001", jabatan: "Panitera Pengganti", pendidikan: "S1 Hukum, Universitas Muhammadiyah Purworejo" },
    { name: "Dodi Hartono, S.H.", nip: "198204252003031008", jabatan: "Panitera Pengganti", pendidikan: "S1 Hukum, Universitas Terbuka" },
    { name: "Anisa Dewi, S.H.", nip: "198907122010122004", jabatan: "Panitera Pengganti", pendidikan: "S1 Hukum, Universitas Diponegoro" },
    { name: "Rahma Sari, S.H.", nip: "199002282012122005", jabatan: "Panitera Pengganti", pendidikan: "S1 Hukum, Universitas Gadjah Mada" },
  ],
  "40": [
    { name: "Agus Purnomo", nip: "198006102002031010", jabatan: "Jurusita", pendidikan: "D3 Administrasi Hukum" },
    { name: "Slamet Riyadi", nip: "198510152005031012", jabatan: "Jurusita", pendidikan: "SMA / Sederajat" },
  ],
  "14": [
    { name: "Wulandari, A.Md.", nip: "199208182015032001", jabatan: "Pengelola Data Kepegawaian", pendidikan: "D3 Manajemen Informatika" },
    { name: "Faisal Hendra", nip: "199512312017031003", jabatan: "Operator SIPP", pendidikan: "S1 Sistem Informasi" },
    { name: "Nurul Hidayah", nip: "199709102019122002", jabatan: "Staf Administrasi", pendidikan: "S1 Hukum" },
  ],
  "13": [
    { name: "Bagas Wijaya", nip: "-", jabatan: "PPNPN - Staf Front Office PTSP", pendidikan: "S1 Administrasi Publik" },
    { name: "Eka Sulistyo", nip: "-", jabatan: "PPNPN - Operator IT", pendidikan: "S1 Teknik Informatika" },
  ],
  "15": [
    { name: "Indah Pertiwi, S.E.", nip: "198803152009122004", jabatan: "Pengelola Keuangan (Fungsional Bendahara)", pendidikan: "S1 Akuntansi" },
  ],
  "41": [{ name: "Rizky Pratama, S.H.", nip: "200104152025031001", jabatan: "CPNS - Calon Panitera Pengganti", pendidikan: "S1 Hukum, Universitas Gadjah Mada" }],
  "42": [
    { name: "Beni Susanto", nip: "-", jabatan: "Jurusita Pengganti", pendidikan: "D3 Hukum" },
    { name: "Sri Lestari", nip: "-", jabatan: "Jurusita Pengganti", pendidikan: "SMA / Sederajat" },
  ],
  "43": [{ name: "Wahyu Nugroho, S.Kom.", nip: "199601012023031002", jabatan: "Fungsional Pranata Komputer (PPPK)", pendidikan: "S1 Teknik Informatika" }],
};

const staffCategoryLabel: Record<string, string> = {
  "18": "Ketua Pengadilan", "19": "Wakil Ketua", "10": "Hakim",
  "16": "Panitera Pengganti", "40": "Jurusita", "14": "Staf",
  "13": "PPNPN", "15": "Jabatan Fungsional", "41": "CPNS",
  "42": "Jurusita Pengganti", "43": "Fungsional PPPK",
};

// ─── Content map ─────────────────────────────────────────────────────────────
type ContentBlock =
  | { type: "hero"; title: string; subtitle: string; icon: React.ElementType }
  | { type: "text"; body: string[] }
  | { type: "cards"; items: { icon: React.ElementType; title: string; body: string }[] }
  | { type: "list"; title: string; items: string[] }
  | { type: "table"; headers: string[]; rows: string[][] }
  | { type: "highlight"; text: string; color?: string };

const contentMap: Record<string, ContentBlock[]> = {
  "/tentang-pengadilan/pengantar-dari-ketua-pengadilan": [
    { type: "hero", title: "Pengantar dari Ketua Pengadilan", subtitle: "H. Santoso, S.H., M.H.", icon: User },
    { type: "highlight", text: "Assalamu'alaikum Wr. Wb. Salam sejahtera bagi kita semua.", color: "#9A2109" },
    { type: "text", body: [
      "Dengan mengucapkan puji syukur kehadirat Tuhan Yang Maha Esa, saya selaku Ketua Pengadilan Negeri Purworejo Kelas IB mengucapkan selamat datang di Portal Resmi Pengadilan Negeri Purworejo.",
      "Sebagai salah satu dari empat badan peradilan di bawah Mahkamah Agung Republik Indonesia, Pengadilan Negeri Purworejo berkomitmen penuh untuk mewujudkan peradilan yang agung — yaitu peradilan yang bersih, berwibawa, dan berpihak pada keadilan masyarakat.",
      "Melalui portal ini, kami berupaya menghadirkan layanan informasi yang transparan, mudah diakses, dan bermanfaat bagi seluruh masyarakat, khususnya para pencari keadilan di wilayah Kabupaten Purworejo dan sekitarnya.",
      "Kami senantiasa terbuka terhadap masukan dan kritik membangun demi peningkatan kualitas layanan peradilan. Bersama kita wujudkan Indonesia yang berkeadilan.",
    ]},
    { type: "text", body: ["Wasalamu'alaikum Wr. Wb.", "H. Santoso, S.H., M.H. — Ketua Pengadilan Negeri Purworejo Kelas IB"] },
  ],
  "/tentang-pengadilan/visi-misi-pengadilan": [
    { type: "hero", title: "Visi & Misi Pengadilan", subtitle: "Pengadilan Negeri Purworejo Kelas IB", icon: Target },
    { type: "highlight", text: "VISI: Terwujudnya Pengadilan Negeri Purworejo yang Agung", color: "#9A2109" },
    { type: "text", body: [
      "Visi Pengadilan Negeri Purworejo selaras dengan visi Mahkamah Agung Republik Indonesia — mewujudkan badan peradilan Indonesia yang agung, bermartabat, dan berkeadilan bagi seluruh rakyat Indonesia.",
    ]},
    { type: "list", title: "Misi Pengadilan Negeri Purworejo", items: [
      "Menjaga kemandirian badan peradilan dari segala bentuk intervensi dan pengaruh eksternal.",
      "Memberikan pelayanan hukum yang berkeadilan, mudah diakses, dan bebas dari diskriminasi kepada para pencari keadilan.",
      "Meningkatkan kualitas kepemimpinan badan peradilan yang profesional, berintegritas, dan akuntabel.",
      "Meningkatkan kredibilitas dan transparansi badan peradilan melalui penggunaan teknologi informasi.",
      "Mewujudkan institusi peradilan yang efisien, efektif, dan modern dalam penyelenggaraan administrasi peradilan.",
    ]},
    { type: "cards", items: [
      { icon: Scale, title: "Kemandirian", body: "Bebas dari intervensi dalam menegakkan hukum dan keadilan" },
      { icon: Heart, title: "Integritas", body: "Hakim dan pegawai yang jujur, transparan, dan bertanggung jawab" },
      { icon: Eye, title: "Transparansi", body: "Informasi peradilan terbuka dan mudah diakses publik" },
      { icon: Star, title: "Profesionalisme", body: "SDM kompeten, terlatih, dan berdedikasi tinggi" },
    ]},
  ],
  "/tentang-pengadilan/sejarah-pengadilan": [
    { type: "hero", title: "Sejarah Pengadilan Negeri Purworejo", subtitle: "Berdiri sejak masa penjajahan Belanda", icon: Landmark },
    { type: "text", body: [
      "Pengadilan Negeri Purworejo merupakan salah satu pengadilan tertua di wilayah Karesidenan Kedu, Jawa Tengah. Sejarah berdirinya tidak terlepas dari sistem hukum kolonial Belanda yang diwarisi oleh Pemerintah Republik Indonesia.",
      "Pada masa pemerintahan kolonial Hindia Belanda, lembaga ini dikenal sebagai Landraad Poerworedjo — sebuah pengadilan umum yang menangani perkara-perkara penduduk pribumi sesuai dengan hukum adat dan peraturan perundangan kolonial yang berlaku.",
      "Pasca kemerdekaan Indonesia pada 17 Agustus 1945, Landraad Poerworedjo dialihkan menjadi Pengadilan Negeri Purworejo di bawah naungan sistem peradilan Republik Indonesia. Perubahan ini mencerminkan semangat nasionalisme dan kedaulatan hukum bangsa.",
      "Seiring perjalanan waktu, Pengadilan Negeri Purworejo telah mengalami berbagai perkembangan, baik dalam hal infrastruktur, sumber daya manusia, maupun adopsi teknologi informasi untuk memodernisasi pelayanan peradilan.",
      "Saat ini, PN Purworejo berstatus Kelas IB dan memiliki yurisdiksi atas seluruh wilayah Kabupaten Purworejo, melayani jutaan warga yang membutuhkan akses keadilan.",
    ]},
    { type: "table", headers: ["Periode", "Nama Lembaga", "Keterangan"],
      rows: [
        ["Sebelum 1945", "Landraad Poerworedjo", "Pengadilan kolonial Hindia Belanda"],
        ["1945 – 1965", "Pengadilan Negeri Purworejo", "Pasca kemerdekaan, di bawah RI"],
        ["1965 – 2000", "Pengadilan Negeri Purworejo", "Era Orde Baru, perkembangan infrastruktur"],
        ["2000 – kini", "PN Purworejo Kelas IB", "Modernisasi & digitalisasi peradilan"],
      ]
    },
  ],
  "/tentang-pengadilan/struktur-organisasi": [
    { type: "hero", title: "Struktur Organisasi", subtitle: "Pengadilan Negeri Purworejo Kelas IB", icon: Building2 },
    { type: "text", body: [
      "Struktur organisasi Pengadilan Negeri Purworejo Kelas IB mengacu pada Peraturan Mahkamah Agung (PERMA) yang berlaku, terdiri dari unsur pimpinan, hakim, kepaniteraan, dan kesekretariatan.",
    ]},
    { type: "table", headers: ["Jabatan", "Nama", "Keterangan"],
      rows: [
        ["Ketua", "H. Santoso, S.H., M.H.", "Pimpinan tertinggi PN Purworejo"],
        ["Wakil Ketua", "Rina Wijayanti, S.H., M.Hum.", "Membantu Ketua dalam pengelolaan pengadilan"],
        ["Panitera", "Drs. Mulyono, S.H.", "Kepala kepaniteraan"],
        ["Sekretaris", "Teguh Prasetyo, S.H., M.M.", "Kepala kesekretariatan"],
        ["Hakim (4 orang)", "Lihat halaman Profil Hakim", "Menangani persidangan"],
      ]
    },
    { type: "cards", items: [
      { icon: Scale, title: "Kepaniteraan Pidana", body: "Mengelola administrasi perkara pidana" },
      { icon: FileText, title: "Kepaniteraan Perdata", body: "Mengelola administrasi perkara perdata" },
      { icon: BookOpen, title: "Kepaniteraan Hukum", body: "Pengarsipan, laporan, dan dokumentasi hukum" },
      { icon: Building2, title: "Kesekretariatan", body: "Kepegawaian, keuangan, IT, dan umum" },
    ]},
  ],
  "/tentang-pengadilan/wilayah-yuridiksi": [
    { type: "hero", title: "Wilayah Yuridiksi", subtitle: "Pengadilan Negeri Purworejo — Kabupaten Purworejo, Jawa Tengah", icon: MapPin },
    { type: "text", body: [
      "Pengadilan Negeri Purworejo memiliki yurisdiksi (kewenangan mengadili) atas seluruh wilayah Kabupaten Purworejo, Provinsi Jawa Tengah. Wilayah ini meliputi 16 kecamatan dengan luas total sekitar 1.034 km² dan jumlah penduduk lebih dari 750.000 jiwa.",
    ]},
    { type: "table", headers: ["No.", "Kecamatan", "Jarak ke PN (km)"],
      rows: [
        ["1", "Purworejo (Kota)", "0 km (Pusat)"],
        ["2", "Kutoarjo", "12 km"],
        ["3", "Butuh", "15 km"],
        ["4", "Bayan", "8 km"],
        ["5", "Grabag", "20 km"],
        ["6", "Ngombol", "18 km"],
        ["7", "Purwodadi", "25 km"],
        ["8", "Bagelen", "10 km"],
        ["9", "Kemiri", "22 km"],
        ["10", "Pituruh", "30 km"],
        ["11", "Bener", "35 km"],
        ["12", "Bruno", "40 km"],
        ["13", "Gebang", "16 km"],
        ["14", "Loano", "12 km"],
        ["15", "Kaligesing", "18 km"],
        ["16", "Ngaglik", "28 km"],
      ]
    },
  ],
  "/tentang-pengadilan/kepaniteraan-pidana": [
    { type: "hero", title: "Kepaniteraan Pidana", subtitle: "Pengadilan Negeri Purworejo", icon: Scale },
    { type: "text", body: [
      "Kepaniteraan Pidana adalah unit kerja di bawah Panitera yang bertugas memberikan pelayanan teknis di bidang administrasi perkara pidana. Unit ini mengelola seluruh proses administrasi mulai dari pendaftaran berkas perkara hingga penyimpanan arsip putusan.",
    ]},
    { type: "list", title: "Tugas Pokok Kepaniteraan Pidana", items: [
      "Menerima, mencatat, dan mendistribusikan berkas perkara pidana yang masuk",
      "Mengelola buku register perkara pidana (biasa, singkat, cepat, khusus)",
      "Mempersiapkan berkas untuk persidangan dan membantu Hakim dalam pelaksanaan sidang",
      "Mengelola arsip putusan perkara pidana yang telah berkekuatan hukum tetap (inkracht)",
      "Melayani pembuatan salinan putusan bagi para pihak yang membutuhkan",
      "Mengelola barang bukti perkara pidana secara tertib dan aman",
      "Membuat laporan rekapitulasi perkara pidana secara berkala",
    ]},
    { type: "cards", items: [
      { icon: FileText, title: "Perkara Pidana Biasa", body: "Penanganan perkara kejahatan umum sesuai KUHP" },
      { icon: Shield, title: "Perkara Pidana Khusus", body: "Korupsi, narkotika, kekerasan rumah tangga, dll." },
      { icon: Users, title: "Perkara Pidana Anak", body: "Ditangani dengan pendekatan keadilan restoratif" },
      { icon: Scale, title: "Tipiring & Tilang", body: "Tindak pidana ringan dan pelanggaran lalu lintas" },
    ]},
  ],
  "/tentang-pengadilan/kepaniteraan-perdata": [
    { type: "hero", title: "Kepaniteraan Perdata", subtitle: "Pengadilan Negeri Purworejo", icon: FileText },
    { type: "text", body: [
      "Kepaniteraan Perdata bertugas memberikan pelayanan teknis administrasi perkara perdata, mulai dari pendaftaran gugatan, permohonan, hingga eksekusi putusan yang telah berkekuatan hukum tetap.",
    ]},
    { type: "list", title: "Jenis Perkara yang Ditangani", items: [
      "Gugatan perdata umum (wanprestasi, perbuatan melawan hukum, hutang piutang)",
      "Permohonan (penetapan waris, ganti nama, pengangkatan anak, dll.)",
      "Gugatan perceraian bagi non-Muslim",
      "Gugatan sederhana (Small Claim Court) dengan nilai sengketa maks. Rp 500 juta",
      "Perkara bantahan, perlawanan pihak ketiga (derden verzet)",
      "Permohonan eksekusi putusan yang telah inkracht",
    ]},
  ],
  "/tentang-pengadilan/kepaniteraan-hukum": [
    { type: "hero", title: "Kepaniteraan Hukum", subtitle: "Pengadilan Negeri Purworejo", icon: BookOpen },
    { type: "text", body: [
      "Kepaniteraan Hukum bertugas melaksanakan administrasi hukum, pengarsipan, pelaporan, legalisasi, dan pelayanan informasi kepada publik terkait produk-produk hukum Pengadilan Negeri Purworejo.",
    ]},
    { type: "list", title: "Layanan Kepaniteraan Hukum", items: [
      "Legalisasi salinan putusan dan penetapan pengadilan",
      "Penerbitan akta cerai (bagi perkara perceraian non-Muslim)",
      "Pencatatan dan pengelolaan arsip perkara perdata dan pidana",
      "Penyusunan laporan bulanan, triwulan, dan tahunan kepaniteraan",
      "Pelayanan PPID (Pejabat Pengelola Informasi dan Dokumentasi)",
      "Pengelolaan Rancangan Peraturan dan produk hukum internal",
    ]},
  ],
  "/tentang-pengadilan/perencanaan-it-dan-pelaporan": [
    { type: "hero", title: "Perencanaan, IT & Pelaporan", subtitle: "Sub Bagian Kesekretariatan", icon: Building2 },
    { type: "text", body: [
      "Sub Bagian Perencanaan, Teknologi Informasi, dan Pelaporan bertanggung jawab atas perencanaan anggaran, pengelolaan infrastruktur teknologi informasi, dan penyusunan laporan kinerja Pengadilan Negeri Purworejo.",
    ]},
    { type: "list", title: "Lingkup Tugas", items: [
      "Penyusunan Rencana Kerja dan Anggaran (RKA) tahunan",
      "Pengelolaan dan pemeliharaan infrastruktur IT (server, jaringan, perangkat keras)",
      "Administrasi sistem SIPP, e-Court, dan aplikasi peradilan lainnya",
      "Penyusunan Laporan Akuntabilitas Kinerja (LKjIP)",
      "Pengelolaan website resmi dan media sosial pengadilan",
      "Keamanan siber dan backup data pengadilan",
    ]},
  ],
  "/tentang-pengadilan/kepegawaian-organisasi-dan-tatalaksana": [
    { type: "hero", title: "Kepegawaian, Organisasi & Tatalaksana", subtitle: "Sub Bagian Kesekretariatan", icon: Users },
    { type: "text", body: [
      "Sub Bagian Kepegawaian, Organisasi, dan Tatalaksana mengelola seluruh urusan kepegawaian, pengembangan organisasi, dan penataan tata laksana kerja di Pengadilan Negeri Purworejo.",
    ]},
    { type: "list", title: "Lingkup Tugas", items: [
      "Pengelolaan administrasi kepegawaian (kenaikan pangkat, mutasi, pensiun)",
      "Penyusunan uraian jabatan dan analisis beban kerja",
      "Pengelolaan absensi dan disiplin pegawai",
      "Penyusunan Standar Operasional Prosedur (SOP)",
      "Pengelolaan SIMPEG (Sistem Informasi Manajemen Kepegawaian)",
      "Pembinaan dan pengembangan kompetensi SDM",
    ]},
  ],
  "/tentang-pengadilan/umum-dan-keuangan": [
    { type: "hero", title: "Umum & Keuangan", subtitle: "Sub Bagian Kesekretariatan", icon: FileText },
    { type: "text", body: [
      "Sub Bagian Umum dan Keuangan bertanggung jawab atas pengelolaan keuangan negara, pengadaan barang/jasa, pemeliharaan aset, dan seluruh urusan kerumahtanggaan Pengadilan Negeri Purworejo.",
    ]},
    { type: "list", title: "Lingkup Tugas", items: [
      "Pengelolaan Anggaran Pendapatan dan Belanja (DIPA)",
      "Pelaksanaan pembayaran gaji dan tunjangan pegawai",
      "Pengadaan barang dan jasa sesuai peraturan perpajakan",
      "Pengelolaan dan inventarisasi Barang Milik Negara (BMN)",
      "Pemeliharaan gedung, kendaraan dinas, dan sarana prasarana",
      "Penyusunan Laporan Keuangan (Neraca, LRA, CaLK)",
    ]},
  ],
  "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-strategis": [
    { type: "hero", title: "Rencana Strategis", subtitle: "PN Purworejo 2025–2029", icon: Target },
    { type: "text", body: [
      "Rencana Strategis (Renstra) Pengadilan Negeri Purworejo periode 2025–2029 merupakan dokumen perencanaan jangka menengah yang memuat visi, misi, tujuan, sasaran, dan program kerja pengadilan.",
    ]},
    { type: "list", title: "Sasaran Strategis 2025–2029", items: [
      "Terwujudnya peningkatan efektivitas penyelesaian perkara yang sederhana, cepat, dan biaya ringan",
      "Meningkatnya aksesibilitas masyarakat terhadap layanan peradilan (indeks kepuasan > 85)",
      "Terwujudnya zona integritas menuju Wilayah Bebas Korupsi (WBK) dan WBBM",
      "Meningkatnya penerapan e-Government dalam pengelolaan peradilan",
      "Terwujudnya SDM aparatur peradilan yang kompeten dan berintegritas tinggi",
    ]},
  ],
  "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-kerja-dan-anggaran": [
    { type: "hero", title: "Rencana Kerja & Anggaran", subtitle: "Tahun Anggaran 2026", icon: FileText },
    { type: "text", body: [
      "Rencana Kerja dan Anggaran (RKA) Pengadilan Negeri Purworejo Tahun Anggaran 2026 mengacu pada Renstra 2025–2029 dan berpedoman pada Pagu Anggaran yang ditetapkan oleh Mahkamah Agung RI.",
    ]},
    { type: "table", headers: ["Program/Kegiatan", "Pagu Anggaran (Rp)", "Realisasi (%)"],
      rows: [
        ["Dukungan Manajemen dan Pelaksanaan Tugas Teknis", "3.500.000.000", "87,5%"],
        ["Peningkatan Manajemen Peradilan Umum", "850.000.000", "72,3%"],
        ["Sarana dan Prasarana MA dan Badan Peradilan", "450.000.000", "65,0%"],
        ["TOTAL", "4.800.000.000", "80,6%"],
      ]
    },
  ],
  "/tentang-pengadilan/sistem-pengelolaan-pengadilan/pengawasan-dan-kode-etik-hakim": [
    { type: "hero", title: "Pengawasan & Kode Etik Hakim", subtitle: "Sistem Pengelolaan Pengadilan", icon: Shield },
    { type: "text", body: [
      "Pengawasan perilaku Hakim dilaksanakan oleh Komisi Yudisial Republik Indonesia dan Badan Pengawasan Mahkamah Agung. Pengadilan Negeri Purworejo berkomitmen penuh terhadap penegakan Kode Etik dan Pedoman Perilaku Hakim (KEPPH).",
    ]},
    { type: "list", title: "Prinsip Kode Etik Hakim (KEPPH)", items: [
      "Berperilaku Adil — tidak membeda-bedakan para pihak",
      "Berperilaku Jujur — menyatakan kebenaran tanpa dipengaruhi kepentingan apapun",
      "Berperilaku Arif dan Bijaksana — bertindak sesuai hukum dan rasa keadilan masyarakat",
      "Bersikap Mandiri — bebas dari pengaruh siapapun dalam membuat putusan",
      "Berintegritas Tinggi — konsisten antara ucapan, sikap, dan perilaku",
      "Bertanggung Jawab — bersedia mempertanggungjawabkan setiap putusannya",
    ]},
  ],
  "/tentang-pengadilan/ptsp/jenis-layanan": [
    { type: "hero", title: "Jenis Layanan PTSP", subtitle: "Pelayanan Terpadu Satu Pintu PN Purworejo", icon: Building2 },
    { type: "cards", items: [
      { icon: FileText, title: "Pendaftaran Perkara", body: "Pendaftaran gugatan perdata, perkara pidana, dan permohonan secara langsung maupun via e-Court" },
      { icon: Scale, title: "Informasi Biaya Perkara", body: "Konsultasi dan perhitungan estimasi biaya panjar perkara sesuai radius domisili" },
      { icon: BookOpen, title: "Salinan Putusan", body: "Permohonan salinan putusan/penetapan yang telah berkekuatan hukum tetap" },
      { icon: Shield, title: "Informasi PPID", body: "Permohonan informasi publik sesuai UU Keterbukaan Informasi Publik" },
      { icon: Users, title: "Konsultasi POSBAKUM", body: "Layanan konsultasi hukum gratis bagi masyarakat kurang mampu" },
      { icon: Phone, title: "Pengaduan Layanan", body: "Penyampaian pengaduan terkait pelayanan pengadilan melalui berbagai kanal" },
    ]},
  ],
  "/tentang-pengadilan/ptsp/standar-pelayanan": [
    { type: "hero", title: "Standar Pelayanan PTSP", subtitle: "SK Ketua PN Purworejo Nomor W12.U21/SK/OT.01.3/2026", icon: Award },
    { type: "table", headers: ["Jenis Layanan", "Waktu Penyelesaian", "Biaya"],
      rows: [
        ["Pendaftaran Gugatan Perdata", "1 Hari Kerja", "Sesuai Radius Domisili"],
        ["Salinan Putusan", "3 Hari Kerja", "Rp 10.000/lembar (fotokopi)"],
        ["Permohonan Informasi PPID", "10 Hari Kerja", "Gratis (digital) / Sesuai tarif (fisik)"],
        ["Konsultasi POSBAKUM", "Hari yang sama", "Gratis"],
        ["Legalisasi Dokumen", "1 Hari Kerja", "Rp 5.000/dokumen"],
        ["Akta Cerai", "3 Hari Kerja", "Gratis"],
      ]
    },
  ],
  "/tentang-pengadilan/ptsp/maklumat-pelayanan": [
    { type: "hero", title: "Maklumat Pelayanan", subtitle: "Komitmen PN Purworejo kepada Masyarakat", icon: Award },
    { type: "highlight", text: "\"Kami, seluruh jajaran Pengadilan Negeri Purworejo, berkomitmen memberikan pelayanan yang profesional, transparan, bebas dari pungli, dan berorientasi kepada kepuasan masyarakat pencari keadilan.\"", color: "#9A2109" },
    { type: "list", title: "Janji Layanan Kami", items: [
      "Melayani dengan ramah, cepat, dan tepat sesuai standar prosedur yang berlaku",
      "Tidak memungut biaya di luar ketentuan resmi yang berlaku",
      "Memberikan informasi yang jelas, benar, dan tidak menyesatkan",
      "Menjaga kerahasiaan data dan informasi pengguna layanan",
      "Menindaklanjuti setiap pengaduan dalam waktu maksimal 14 hari kerja",
    ]},
  ],
  "/tentang-pengadilan/ptsp/kompensasi-pelayanan": [
    { type: "hero", title: "Kompensasi Pelayanan", subtitle: "Hak Pengguna Layanan PTSP", icon: Shield },
    { type: "text", body: [
      "Apabila pelayanan tidak memenuhi standar yang telah ditetapkan, pengguna layanan berhak mendapatkan kompensasi sesuai mekanisme yang berlaku.",
    ]},
    { type: "list", title: "Bentuk Kompensasi", items: [
      "Permohonan maaf secara tertulis atas keterlambatan atau kesalahan pelayanan",
      "Percepatan proses layanan sebagai prioritas jika terjadi keterlambatan akibat kesalahan petugas",
      "Pengulangan layanan tanpa biaya tambahan jika terdapat kesalahan administrasi",
      "Pelaporan dapat dilakukan ke Atasan Langsung, Ombudsman RI, atau Badan Pengawasan MA",
    ]},
  ],
  "/tentang-pengadilan/prosedur-pelayanan-bagi-penyandang-disabilitas": [
    { type: "hero", title: "Prosedur Pelayanan Disabilitas", subtitle: "Aksesibilitas untuk Semua Warga", icon: Heart },
    { type: "text", body: [
      "Pengadilan Negeri Purworejo berkomitmen memberikan layanan yang setara dan aksesibel bagi warga penyandang disabilitas sesuai UU No. 8 Tahun 2016 tentang Penyandang Disabilitas dan PERMA No. 3 Tahun 2017.",
    ]},
    { type: "list", title: "Prosedur Khusus Penyandang Disabilitas", items: [
      "Pengguna disabilitas dapat langsung menuju konter PTSP prioritas yang ditandai simbol disabilitas",
      "Petugas terlatih akan membantu pengisian formulir, pembacaan dokumen, atau komunikasi alternatif",
      "Tersedia pendamping/penerjemah bahasa isyarat untuk tuna rungu atas permintaan (H-1 pengajuan)",
      "Dokumen dalam format audio/braille tersedia atas permintaan khusus",
      "Waktu antrean diprioritaskan tanpa harus mengambil nomor antrean di loket biasa",
    ]},
  ],
  "/tentang-pengadilan/sarana-prasarana-bagi-penyandang-disabilitas": [
    { type: "hero", title: "Sarana & Prasarana Disabilitas", subtitle: "Fasilitas Aksesibel PN Purworejo", icon: Building2 },
    { type: "cards", items: [
      { icon: MapPin, title: "Ramp / Jalur Khusus", body: "Tersedia di seluruh akses masuk gedung utama dan gedung PTSP" },
      { icon: Users, title: "Toilet Disabilitas", body: "Toilet khusus penyandang disabilitas di lantai 1 dekat PTSP" },
      { icon: Building2, title: "Ruang Sidang Aksesibel", body: "Ruang sidang khusus di lantai 1 dengan akses kursi roda" },
      { icon: Phone, title: "Loket Prioritas", body: "Konter khusus di PTSP untuk lansia dan penyandang disabilitas" },
      { icon: Eye, title: "Signage Braille", body: "Petunjuk arah dalam huruf Braille di koridor utama" },
      { icon: Shield, title: "Area Parkir Prioritas", body: "3 slot parkir khusus penyandang disabilitas dekat pintu masuk" },
    ]},
  ],
  "/tentang-pengadilan/tata-tertib-pengadilan": [
    { type: "hero", title: "Tata Tertib Pengadilan", subtitle: "Panduan Berperilaku di Lingkungan PN Purworejo", icon: Shield },
    { type: "text", body: [
      "Setiap orang yang memasuki gedung Pengadilan Negeri Purworejo wajib mematuhi tata tertib yang berlaku demi menjaga ketertiban, keamanan, dan martabat lembaga peradilan.",
    ]},
    { type: "list", title: "Kewajiban Pengunjung", items: [
      "Berpakaian sopan dan rapi (bukan sandal jepit, celana pendek, atau baju tanpa kerah bagi pria)",
      "Menunjukkan identitas diri (KTP/SIM) kepada petugas keamanan di pintu masuk",
      "Mematikan atau mengalihkan telepon seluler ke mode senyap selama di ruang sidang",
      "Mengikuti arahan dan petunjuk petugas pengamanan",
      "Tidak merokok di seluruh area dalam gedung pengadilan",
      "Tidak memotret atau merekam proses persidangan tanpa izin dari Ketua Majelis",
    ]},
    { type: "list", title: "Larangan dalam Gedung Pengadilan", items: [
      "Membawa senjata api, senjata tajam, atau benda berbahaya lainnya",
      "Membuat keributan, kegaduhan, atau tindakan yang mengganggu jalannya persidangan",
      "Makan, minum, atau merokok di dalam ruang sidang",
      "Menggunakan telepon seluler (menerima/melakukan panggilan) di ruang sidang",
      "Melakukan intimidasi, ancaman, atau intervensi terhadap proses peradilan",
      "Memasuki ruangan yang tidak diperuntukkan bagi umum tanpa izin",
    ]},
  ],
  "/tentang-pengadilan/profil-role-model": [
    { type: "hero", title: "Profil Role Model", subtitle: "Teladan Integritas PN Purworejo", icon: Star },
    { type: "text", body: [
      "Role Model adalah individu yang dipilih dan ditetapkan sebagai contoh teladan bagi seluruh pegawai Pengadilan Negeri Purworejo dalam hal integritas, profesionalisme, dan semangat melayani masyarakat.",
    ]},
    { type: "cards", items: [
      { icon: User, title: "H. Santoso, S.H., M.H.", body: "Ketua PN Purworejo — Teladan kepemimpinan berintegritas dan pelayanan prima" },
      { icon: User, title: "Rina Wijayanti, S.H., M.Hum.", body: "Wakil Ketua — Inovasi layanan digital dan pengembangan SDM" },
    ]},
  ],
  "/tentang-pengadilan/profil-agen-perubahan": [
    { type: "hero", title: "Profil Agen Perubahan", subtitle: "Motor Reformasi Birokrasi PN Purworejo", icon: Star },
    { type: "text", body: [
      "Agen Perubahan adalah pegawai terpilih yang ditugaskan menjadi penggerak perubahan budaya kerja menuju birokrasi yang bersih, kompeten, dan melayani.",
    ]},
    { type: "cards", items: [
      { icon: User, title: "Tri Wibowo, S.H.", body: "Hakim — Inovasi sistem e-Court dan digitalisasi persidangan" },
      { icon: User, title: "Wulandari, A.Md.", body: "Staf IT — Pengembangan dashboard monitoring kinerja internal" },
      { icon: User, title: "Siti Rahayu, S.H.", body: "Panitera Pengganti — Pembenahan sistem pengarsipan digital perkara" },
    ]},
  ],
};

// ─── Helper: breadcrumb from path ────────────────────────────────────────────
function breadcrumbLabel(seg: string) {
  return seg
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

// ─── Sidebar ─────────────────────────────────────────────────────────────────
function SidebarNav({ currentPath }: { currentPath: string }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <nav className="bg-white rounded-2xl border border-[#E2E8F0] overflow-hidden shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
      <div className="px-4 py-3.5 bg-[#9A2109] text-white">
        <p className="text-xs font-bold uppercase tracking-wider">Tentang Pengadilan</p>
      </div>
      <div className="py-2">
        {sideNav.map((item) => {
          if ("children" in item) {
            const isActive = item.children.some(c => currentPath.startsWith(c.path));
            const isOpen = open === item.label || isActive;
            return (
              <div key={item.label}>
                <button
                  onClick={() => setOpen(isOpen ? null : item.label)}
                  className={`w-full flex items-center justify-between px-4 py-2 text-xs font-semibold transition-colors ${isActive ? "text-[#9A2109]" : "text-[#475569] hover:text-[#9A2109]"}`}
                >
                  {item.label}
                  <ChevronRight size={12} className={`transition-transform ${isOpen ? "rotate-90" : ""}`} />
                </button>
                {isOpen && (
                  <div className="pb-1">
                    {item.children.map((child) => (
                      <Link
                        key={child.path}
                        to={child.path}
                        className={`flex items-center gap-2 pl-7 pr-4 py-1.5 text-xs transition-colors ${
                          currentPath === child.path
                            ? "text-[#9A2109] font-semibold bg-[#FFF1F1]"
                            : "text-[#64748B] hover:text-[#9A2109] hover:bg-[#FFF8F7]"
                        }`}
                      >
                        <span className="w-1 h-1 rounded-full bg-current opacity-50 flex-shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center px-4 py-2 text-xs font-semibold transition-colors ${
                currentPath === item.path
                  ? "text-[#9A2109] bg-[#FFF1F1]"
                  : "text-[#475569] hover:text-[#9A2109] hover:bg-[#FFF8F7]"
              }`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

// ─── Content renderer ────────────────────────────────────────────────────────
function RenderBlocks({ blocks }: { blocks: ContentBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((b, i) => {
        if (b.type === "hero") {
          const Icon = b.icon;
          return (
            <div key={i} className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
              <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                <Icon size={28} className="text-[#9A2109]" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-[#1E293B]">{b.title}</h1>
                <p className="text-sm text-[#64748B] mt-0.5">{b.subtitle}</p>
              </div>
            </div>
          );
        }
        if (b.type === "highlight") {
          return (
            <div key={i} className="border-l-4 pl-5 py-3 bg-[#FFF8F7] rounded-r-xl" style={{ borderColor: b.color ?? "#9A2109" }}>
              <p className="text-sm font-semibold italic text-[#1E293B] leading-relaxed">{b.text}</p>
            </div>
          );
        }
        if (b.type === "text") {
          return (
            <div key={i} className="space-y-3">
              {b.body.map((p, j) => (
                <p key={j} className="text-sm text-[#475569] leading-relaxed">{p}</p>
              ))}
            </div>
          );
        }
        if (b.type === "list") {
          return (
            <div key={i}>
              <h3 className="text-sm font-bold text-[#1E293B] mb-3">{b.title}</h3>
              <ul className="space-y-2">
                {b.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm text-[#475569]">
                    <CheckCircle2 size={15} className="text-[#9A2109] flex-shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          );
        }
        if (b.type === "cards") {
          return (
            <div key={i} className="grid grid-cols-2 gap-4">
              {b.items.map(({ icon: Icon, title, body }, j) => (
                <div key={j} className="bg-[#F8FAFC] rounded-xl border border-[#E2E8F0] p-4 flex gap-3">
                  <div className="w-9 h-9 rounded-lg bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-[#9A2109]" />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1E293B] mb-0.5">{title}</p>
                    <p className="text-xs text-[#64748B] leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        if (b.type === "table") {
          return (
            <div key={i} className="overflow-x-auto rounded-xl border border-[#E2E8F0]">
              <table className="w-full text-sm">
                <thead className="bg-[#F8FAFC] border-b border-[#E2E8F0]">
                  <tr>
                    {b.headers.map((h) => (
                      <th key={h} className="px-4 py-3 text-left text-[11px] font-bold text-[#475569] uppercase tracking-wide whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#F1F5F9]">
                  {b.rows.map((row, j) => (
                    <tr key={j} className="hover:bg-[#FFF8F7] transition-colors">
                      {row.map((cell, k) => (
                        <td key={k} className="px-4 py-3 text-sm text-[#475569]">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
}

// ─── Staff page ───────────────────────────────────────────────────────────────
function StaffPage({ id }: { id: string }) {
  const staff = staffByCategory[id] ?? [];
  const label = staffCategoryLabel[id] ?? "Pegawai";
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
        <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center">
          <Users size={28} className="text-[#9A2109]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#1E293B]">Profil {label}</h1>
          <p className="text-sm text-[#64748B]">Pengadilan Negeri Purworejo Kelas IB</p>
        </div>
      </div>
      {staff.length === 0 ? (
        <p className="text-sm text-[#64748B]">Data pegawai belum tersedia.</p>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {staff.map((s, i) => (
            <div key={i} className="bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] p-5 flex gap-5">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-[#9A2109] to-[#7A1A07] flex items-center justify-center flex-shrink-0">
                <User size={28} className="text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-base font-bold text-[#1E293B] mb-1">{s.name}</h3>
                <p className="text-xs font-semibold text-[#9A2109] mb-2">{s.jabatan}</p>
                <div className="grid grid-cols-2 gap-2">
                  {s.nip !== "-" && (
                    <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                      <Shield size={11} className="text-[#94A3B8]" />
                      NIP: {s.nip}
                    </div>
                  )}
                  <div className="flex items-center gap-1.5 text-xs text-[#64748B]">
                    <BookOpen size={11} className="text-[#94A3B8]" />
                    {s.pendidikan}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Main page ────────────────────────────────────────────────────────────────
export function TentangPengadilanPage() {
  const { pathname } = useLocation();

  // Extract employee ID from path like /tentang-pengadilan/pegawai/18
  const pegawaiMatch = pathname.match(/\/tentang-pengadilan\/pegawai\/(\d+)/);
  const pegawaiId = pegawaiMatch?.[1];

  // Build breadcrumb
  const segments = pathname.split("/").filter(Boolean);

  const blocks = contentMap[pathname];

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-4">
          <nav className="flex items-center gap-1.5 text-xs text-[#64748B]">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">Beranda</Link>
            {segments.map((seg, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight size={12} />
                {i === segments.length - 1 ? (
                  <span className="text-[#9A2109] font-semibold">{breadcrumbLabel(seg)}</span>
                ) : (
                  <Link to={"/" + segments.slice(0, i + 1).join("/")} className="hover:text-[#9A2109] transition-colors">
                    {breadcrumbLabel(seg)}
                  </Link>
                )}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        <div className="grid grid-cols-[260px_1fr] gap-8 items-start">
          {/* Sidebar */}
          <div className="sticky top-24">
            <SidebarNav currentPath={pathname} />
          </div>

          {/* Main content */}
          <div className="bg-white rounded-2xl border border-[#E2E8F0] p-8 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
            {pegawaiId ? (
              <StaffPage id={pegawaiId} />
            ) : blocks ? (
              <RenderBlocks blocks={blocks} />
            ) : (
              // Fallback for unmapped paths
              <div className="space-y-6">
                <div className="flex items-center gap-4 pb-6 border-b border-[#E2E8F0]">
                  <div className="w-14 h-14 rounded-2xl bg-[#FFF1F1] flex items-center justify-center">
                    <Building2 size={28} className="text-[#9A2109]" />
                  </div>
                  <div>
                    <h1 className="text-2xl font-bold text-[#1E293B]">{breadcrumbLabel(segments[segments.length - 1] ?? "Halaman")}</h1>
                    <p className="text-sm text-[#64748B]">Pengadilan Negeri Purworejo</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 bg-[#FEF3C7] border border-[#FDE68A] rounded-xl p-4">
                  <Clock size={16} className="text-[#B45309] flex-shrink-0" />
                  <p className="text-sm text-[#92400E]">Konten halaman ini sedang dalam proses pembaruan. Silakan kunjungi kembali dalam waktu dekat.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
