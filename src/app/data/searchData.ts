export interface SearchResultItem {
  id: string;
  title: string;
  category: "panduan" | "dokumen" | "berita" | "layanan" | "perkara";
  categoryKey: "panduan" | "jadwal" | "dokumen" | "berita";
  categoryLabel: string;
  categoryColor: string;
  categoryBg: string;
  snippet: string;
  url: string;
  isExternal?: boolean;
  meta: string;
  fileInfo?: { ext: string; size: string };
  ctaLabel?: string;
  keywords: string[];
}

export const searchCategories = [
  { key: "all", label: "Semua Kategori" },
  { key: "panduan", label: "Panduan Layanan" },
  { key: "jadwal", label: "Jadwal & Putusan Perkara" },
  { key: "dokumen", label: "Formulir & Dokumen Unduhan" },
  { key: "berita", label: "Berita & Pengumuman" },
] as const;

export const popularSearchKeywords = [
  "Jadwal Sidang",
  "Gugatan Perceraian",
  "Biaya Perkara",
  "Formulir PPID",
  "Posbakum",
  "e-Court",
  "Tilang",
  "Prodeo (Bantuan Cuma-Cuma)",
  "Surat Keterangan Eraterang",
  "SIPP",
];

export const searchDatabase: SearchResultItem[] = [
  // ── Panduan Layanan ──────────────────────────────────────────────────────────
  {
    id: "panduan-perceraian",
    title: "Prosedur & Syarat Pengajuan Gugatan Perceraian Non-Muslim",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Perdata",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Penggugat wajib menyerahkan surat gugatan rangkap 5 disertai fotokopi akta perkawinan yang dilegalisasi meterai. Pendaftaran dapat dilakukan via e-Court atau Meja PTSP. Proses gugatan perceraian Non-Muslim di PN Purworejo dilaksanakan sesuai ketentuan Hukum Perdata umum.",
    url: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara",
    meta: "Diperbarui: 15 Januari 2026 • Estimasi Waktu: 5 Menit Baca",
    ctaLabel: "Pelajari Alur Prosedur",
    keywords: [
      "perceraian", "cerai", "talak", "gugatan", "non-muslim", "perdata", "akta nikah",
      "syarat cerai", "biaya cerai", "penggugat", "tergugat", "perkawinan"
    ],
  },
  {
    id: "panduan-prodeo",
    title: "Prosedur Layanan Hukum Bebas Biaya (Perkara Prodeo)",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Hukum",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Masyarakat tidak mampu berhak mengajukan perkara secara cuma-cuma (prodeo) dengan melampirkan Surat Keterangan Tidak Mampu (SKTM) dari Kelurahan/Desa atau kartu perlindungan sosial (PKH/KPS/KIP). Seluruh biaya perkara ditanggung negara.",
    url: "/layanan-hukum/layanan-hukum-bagi-masyarakat-kurang-mampu/prosedur-pembebasan-biaya-perkara-prodeo",
    meta: "Diperbarui: 12 Februari 2026 • Panduan Resmi",
    ctaLabel: "Syarat & Prosedur Prodeo",
    keywords: [
      "prodeo", "bebas biaya", "gratis", "sktm", "tidak mampu", "miskin", "bantuan gratis",
      "pkh", "kip", "kps", "keringanan biaya", "kurang mampu"
    ],
  },
  {
    id: "panduan-alur-berperkara",
    title: "Panduan Lengkap Alur Berperkara Perdata dan Pidana di PN Purworejo",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Hukum",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Panduan tahapan sidang dari pendaftaran berkas perkara, verifikasi kelengkapan PTSP, mediasi wajib perkara perdata, pembacaan dakwaan pidana, pemeriksaan saksi, hingga putusan berkekuatan hukum tetap (inkracht).",
    url: "/layanan-hukum/panduan-alur-berperkara",
    meta: "Diperbarui: 20 Februari 2026 • Panduan Lengkap",
    ctaLabel: "Lihat Diagram Alur",
    keywords: [
      "alur perkara", "tahapan sidang", "tata cara", "mediasi", "sidang perdata", "sidang pidana",
      "inkracht", "putusan", "saksi", "panitera", "meja ptsp"
    ],
  },
  {
    id: "panduan-posbakum",
    title: "Layanan Pos Bantuan Hukum (POSBAKUM) & Konsultasi Gratis",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Bantuan Hukum",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "POSBAKUM PN Purworejo memberikan layanan konsultasi hukum cuma-cuma, pembuatan dokumen gugatan/permohonan hukum, serta rujukan advokat bagi masyarakat yang membutuhkan bantuan hukum tanpa dipungut biaya.",
    url: "/hubungi/posbakum",
    meta: "Layanan Setiap Hari Kerja: 08:30 - 15:00 WIB",
    ctaLabel: "Info & Konsultasi Posbakum",
    keywords: [
      "posbakum", "bantuan hukum", "konsultasi gratis", "pengacara gratis", "advokat",
      "bikin surat gugatan", "pembuatan draft", "ptsp hukum", "bantuan hukum cuma-cuma"
    ],
  },
  {
    id: "panduan-tilang",
    title: "Panduan Informasi dan Pembayaran Denda Tilang (e-Tilang)",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Pidana",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Informasi tata cara cek besaran denda tilang lalu lintas, nomor registrasi tilang, dan alur pengambilan barang bukti SIM/STNK di Kejaksaan Negeri Purworejo setelah sidang tilang diumumkan setiap hari Jumat.",
    url: "/layanan-publik/layanan-pengadilan",
    meta: "Sidang Tilang: Setiap Hari Jumat",
    ctaLabel: "Alur Pembayaran Tilang",
    keywords: [
      "tilang", "denda tilang", "e-tilang", "lalu lintas", "sim", "stnk", "razia", "kejaksaan",
      "pembayaran briva", "bukti pelanggaran"
    ],
  },
  {
    id: "panduan-eraterang",
    title: "Permohonan Surat Keterangan Elektronik (ERATERANG)",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Publik",
    categoryColor: "#1D4ED8",
    categoryBg: "#DBEAFE",
    snippet:
      "Layanan surat keterangan bebas pidana, tidak sedang dicabut hak pilih, dan tidak memiliki tanggungan utang secara online melalui aplikasi ERATERANG Badilum MA RI untuk syarat pendaftaran CPNS, Pemilu, maupun pekerjaan.",
    url: "/layanan-publik/layanan-pengadilan",
    meta: "Layanan Online Resmi Badilum MA RI",
    ctaLabel: "Prosedur Eraterang",
    keywords: [
      "eraterang", "surat keterangan", "skck", "tidak pernah terpidana", "bebas pidana",
      "hak pilih", "cpns", "syarat kerja", "pilkades", "caleg", "surat keterangan pengadilan"
    ],
  },
  {
    id: "panduan-eksekusi",
    title: "Tata Cara dan Prosedur Permohonan Eksekusi Putusan Perdata",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Perdata",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Alur pendaftaran permohonan eksekusi putusan pengadilan yang telah berkekuatan hukum tetap (inkracht), prosedur teguran (aanmaning), sita eksekusi, serta penetapan lelang eksekusi melalui KPKNL.",
    url: "/layanan-hukum/prosedur-eksekusi",
    meta: "Diperbarui: 18 Januari 2026",
    ctaLabel: "Tata Cara Eksekusi",
    keywords: [
      "eksekusi", "aanmaning", "teguran", "sita lelang", "kpknl", "putusan inkracht",
      "lelang", "perdata", "pelaksanaan putusan"
    ],
  },
  {
    id: "panduan-gugatan-sederhana",
    title: "Prosedur Gugatan Sederhana (Small Claim Court) Maksimal Rp 500 Juta",
    category: "panduan",
    categoryKey: "panduan",
    categoryLabel: "Layanan Perdata",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Penyelesaian sengketa perdata gugatan wanprestasi atau perbuatan melawan hukum dengan nilai tuntutan materiil maksimal Rp 500.000.000 diselesaikan oleh Hakim Tunggal dalam tempo maksimal 25 hari kerja.",
    url: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara",
    meta: "Sesuai Perma No. 4 Tahun 2019",
    ctaLabel: "Alur Gugatan Sederhana",
    keywords: [
      "gugatan sederhana", "small claim", "wanprestasi", "hutang piutang", "500 juta",
      "hakim tunggal", "cepat", "sederhana", "biaya ringan"
    ],
  },

  // ── Jadwal & Putusan Perkara ────────────────────────────────────────────────
  {
    id: "jadwal-sidang-hari-ini",
    title: "Jadwal Sidang Harian dan Ruang Sidang Pengadilan Negeri Purworejo",
    category: "layanan",
    categoryKey: "jadwal",
    categoryLabel: "Jadwal Sidang",
    categoryColor: "#B45309",
    categoryBg: "#FEF3C7",
    snippet:
      "Cek jadwal sidang perkara pidana dan perdata harian di Ruang Cakra, Ruang Kartika, dan Ruang Tirta. Menampilkan informasi nomor perkara, majelis hakim, jaksa penuntut umum, agenda sidang, serta status sidang terkini.",
    url: "/jadwal-sidang",
    meta: "Diperbarui Realtime Setiap Hari Kerja (08:00 - 16:00 WIB)",
    ctaLabel: "Lihat Jadwal Lengkap",
    keywords: [
      "jadwal", "sidang", "jadwal sidang", "agenda sidang", "ruang sidang", "cakra", "kartika",
      "tirta", "hakim", "sidang hari ini", "waktu sidang", "jam sidang", "sidang perdata", "sidang pidana"
    ],
  },
  {
    id: "perkara-sipp-online",
    title: "Sistem Informasi Penelusuran Perkara (SIPP) Pengadilan Negeri Purworejo",
    category: "perkara",
    categoryKey: "jadwal",
    categoryLabel: "Penelusuran Perkara",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Portal resmi SIPP untuk melacak status pendaftaran perkara, susunan majelis hakim, penetapan hari sidang, jadwal tunda, jalannya persidangan, hingga amar putusan pengadilan tingkat pertama.",
    url: "https://sipp.pn-purworejo.go.id",
    isExternal: true,
    meta: "Terhubung ke Database Mahkamah Agung RI",
    ctaLabel: "Buka Portal SIPP ↗",
    keywords: [
      "sipp", "cari perkara", "nomor perkara", "penelusuran perkara", "status perkara", "amar putusan",
      "putusan pengadilan", "lacak sidang", "mahkamah agung", "tracking perkara"
    ],
  },
  {
    id: "jadwal-sidang-pidana-24",
    title: "Perkara Pidana No. 24/Pid.B/2026/PN Pwr - Pemeriksaan Saksi",
    category: "perkara",
    categoryKey: "jadwal",
    categoryLabel: "Jadwal Sidang Pidana",
    categoryColor: "#B45309",
    categoryBg: "#FEF3C7",
    snippet:
      "Sidang Pidana Biasa dengan Terdakwa Rizal Firmansyah di Ruang Cakra. Majelis Hakim Ketua: H. Santoso, S.H., M.H. Agenda pemeriksaan saksi mahkota bersama JPU Andi Setiawan, S.H.",
    url: "/jadwal-sidang",
    meta: "Jadwal: Pukul 09:00 WIB • Ruang Cakra",
    ctaLabel: "Cek Detail Sidang",
    keywords: [
      "24/pid.b/2026", "pidana biasa", "rizal firmansyah", "ruang cakra", "saksi mahkota",
      "santoso", "jadwal pidana"
    ],
  },
  {
    id: "jadwal-sidang-perdata-41",
    title: "Perkara Perdata Gugatan No. 41/Pdt.G/2026/PN Pwr - Tahap Mediasi",
    category: "perkara",
    categoryKey: "jadwal",
    categoryLabel: "Jadwal Sidang Perdata",
    categoryColor: "#B45309",
    categoryBg: "#FEF3C7",
    snippet:
      "Sidang Perdata Gugatan antara PT. Bumi Makmur melawan Tergugat di Ruang Kartika. Hakim Ketua Rina Wijayanti, S.H. Agenda mediasi pertama dengan fasilitator Hakim Mediator terakreditasi.",
    url: "/jadwal-sidang",
    meta: "Jadwal: Pukul 10:30 WIB • Ruang Kartika",
    ctaLabel: "Cek Detail Sidang",
    keywords: [
      "41/pdt.g/2026", "perdata gugatan", "pt bumi makmur", "mediasi", "ruang kartika",
      "rina wijayanti", "jadwal perdata"
    ],
  },
  {
    id: "jadwal-zitting-plaats",
    title: "Layanan Sidang Keliling (Zitting Plaats) Kabupaten Purworejo",
    category: "layanan",
    categoryKey: "jadwal",
    categoryLabel: "Layanan Hukum",
    categoryColor: "#1D4ED8",
    categoryBg: "#DBEAFE",
    snippet:
      "Pelaksanaan sidang di luar gedung pengadilan bagi masyarakat di kecamatan terpencil dan berjarak jauh dari kantor PN Purworejo, memudahkan akses keadilan tanpa harus menempuh perjalanan jauh.",
    url: "/layanan-hukum/zitting-plaats",
    meta: "Program Prioritas Akses Keadilan 2026",
    ctaLabel: "Info Jadwal Zitting Plaats",
    keywords: [
      "zitting plaats", "sidang keliling", "sidang di luar pengadilan", "kecamatan", "terpencil",
      "sidang terpadu", "purworejo"
    ],
  },

  // ── Formulir & Dokumen Unduhan ──────────────────────────────────────────────
  {
    id: "form-ppid-online",
    title: "Formulir Permohonan Informasi Publik (PPID Online PN Purworejo)",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Formulir PPID",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Layanan permohonan informasi publik secara online sesuai UU No. 14 Tahun 2008 tentang Keterbukaan Informasi Publik. Ajukan permintaan salinan putusan, data statistik, atau dokumen anggaran dengan nomor tiket pelacakan otomatis.",
    url: "/formulir/ppid",
    meta: "Respon Maksimal 10 Hari Kerja • Formulir Interaktif",
    ctaLabel: "Isi Formulir PPID Online",
    keywords: [
      "ppid", "permohonan informasi", "keterbukaan informasi", "dokumen publik", "formulir ppid",
      "salinan putusan", "permintaan data", "tiket ppid", "transparansi", "uu kip"
    ],
  },
  {
    id: "form-posbakum-online",
    title: "Formulir Pendaftaran Bantuan Hukum (POSBAKUM Online)",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Formulir Posbakum",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Daftarkan permohonan bantuan hukum dan konsultasi pembuatan surat permohonan/gugatan secara online. Unggah dokumen KTP dan SKTM untuk diverifikasi oleh petugas POSBAKUM PN Purworejo.",
    url: "/hubungi/posbakum/form",
    meta: "Gratis untuk Masyarakat Tidak Mampu",
    ctaLabel: "Daftar Bantuan Hukum",
    keywords: [
      "daftar posbakum", "form posbakum", "formulir bantuan hukum", "konsultasi online",
      "upload sktm", "daftar gratis", "ptsp posbakum"
    ],
  },
  {
    id: "unduhan-surat-kuasa",
    title: "Formulir Surat Kuasa Khusus Perkara Perdata Gugatan",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Formulir PTSP",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Format baku Surat Kuasa Khusus untuk mewakili pihak berperkara dalam sidang gugatan perdata di Pengadilan Negeri Purworejo sesuai hukum acara perdata (HIR/RBg). Tersedia dalam format DOCX siap edit.",
    url: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara",
    meta: "Diperbarui: 10 Maret 2026 • Format DOCX",
    fileInfo: { ext: "DOCX", size: "180 KB" },
    ctaLabel: "Unduh Format Blangko (.DOCX)",
    keywords: [
      "surat kuasa", "kuasa khusus", "format surat kuasa", "contoh surat kuasa", "download docx",
      "kuasa perdata", "blangko", "formulir ptsp"
    ],
  },
  {
    id: "unduhan-radius-biaya",
    title: "Surat Keputusan Radius Biaya Panggilan Perkara Perdata Wilayah Purworejo 2026",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Keputusan Ketua PN",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Daftar zonasi radius dan rincian besaran biaya pemanggilan para pihak (Radius I, II, III, dan wilayah sulit) per kecamatan di Kabupaten Purworejo yang ditetapkan oleh Ketua PN Purworejo per 1 Februari 2026.",
    url: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/biaya-perkara",
    meta: "SK Ketua PN Purworejo No. W12-U18/SK/2026 • PDF",
    fileInfo: { ext: "PDF", size: "1.4 MB" },
    ctaLabel: "Unduh SK Radius (.PDF)",
    keywords: [
      "radius biaya", "biaya perkara", "panjar perkara", "biaya panggilan", "sk radius", "jurusita",
      "tarif panggilan", "kecamatan", "purworejo 2026", "tabel radius"
    ],
  },
  {
    id: "unduhan-sisa-panjar",
    title: "Pengumuman dan Daftar Sisa Panjar Biaya Perkara yang Belum Diambil",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Pengumuman Kepaniteraan",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Daftar nomor perkara dan pihak berperkara yang memiliki sisa panjar biaya perkara namun belum mengambil dalam jangka waktu 6 bulan setelah putusan. Sisa panjar yang tidak diambil akan disetorkan ke Kas Negara.",
    url: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/pengumuman-sisa-panjar-biaya-perkara",
    meta: "Periode Semester I Tahun 2026 • PDF",
    fileInfo: { ext: "PDF", size: "820 KB" },
    ctaLabel: "Lihat Daftar Sisa Panjar",
    keywords: [
      "sisa panjar", "biaya perkara", "pengembalian panjar", "kas negara", "uang sisa",
      "panjar perdata", "pengumuman panjar"
    ],
  },
  {
    id: "unduhan-surat-gugatan-contoh",
    title: "Contoh Format Surat Permohonan Ganti Nama / Akta Kelahiran",
    category: "dokumen",
    categoryKey: "dokumen",
    categoryLabel: "Formulir PTSP",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Template draf permohonan ganti nama, pembetulan akta kelahiran, atau pengangkatan anak untuk diajukan ke kepaniteraan perdata PN Purworejo beserta daftar bukti surat yang harus dipersiapkan.",
    url: "/layanan-hukum/panduan-alur-berperkara",
    meta: "Format Microsoft Word Siap Edit • DOCX",
    fileInfo: { ext: "DOCX", size: "95 KB" },
    ctaLabel: "Unduh Template Surat (.DOCX)",
    keywords: [
      "ganti nama", "akta kelahiran", "surat permohonan", "permohonan perdata", "pdt.p",
      "rubah nama", "contoh surat", "draft surat", "unduh format"
    ],
  },

  // ── Berita & Pengumuman ─────────────────────────────────────────────────────
  {
    id: "berita-wbk",
    title: "PN Purworejo Sukses Raih Predikat Wilayah Bebas dari Korupsi (WBK)",
    category: "berita",
    categoryKey: "berita",
    categoryLabel: "Reformasi Birokrasi",
    categoryColor: "#9A2109",
    categoryBg: "#FFF1F1",
    snippet:
      "Kementerian PAN-RB memberikan penghargaan predikat Wilayah Bebas dari Korupsi (WBK) kepada Pengadilan Negeri Purworejo Kelas IB atas komitmen prima dalam transparansi peradilan, integritas aparatur, dan modernisasi PTSP.",
    url: "/reformasi-birokrasi/pembangunan-zona-integritas",
    meta: "Dipublikasikan: 12 Desember 2025 • Humas PN Purworejo",
    ctaLabel: "Baca Berita Selengkapnya",
    keywords: [
      "wbk", "wilayah bebas korupsi", "zona integritas", "menpan rb", "prestasi",
      "penghargaan", "antikorupsi", "reformasi birokrasi", "integritas"
    ],
  },
  {
    id: "berita-ecourt",
    title: "Optimalisasi Layanan e-Court: Pendaftaran Perkara Online Makin Cepat",
    category: "berita",
    categoryKey: "berita",
    categoryLabel: "Inovasi Layanan",
    categoryColor: "#1D4ED8",
    categoryBg: "#DBEAFE",
    snippet:
      "Peningkatan infrastruktur aplikasi e-Court Mahkamah Agung memungkinkan pendaftaran perkara gugatan (e-Filing), pembayaran panjar otomatis via virtual account (e-Payment), serta pemanggilan sidang elektronik (e-Summons).",
    url: "/layanan-publik/layanan-pengadilan",
    meta: "Dipublikasikan: 14 Februari 2026 • Inovasi",
    ctaLabel: "Pelajari Fitur e-Court",
    keywords: [
      "ecourt", "e-court", "e-filing", "e-payment", "e-summons", "daftar online", "sidang online",
      "virtual account", "mahkamah agung", "inovasi"
    ],
  },
  {
    id: "berita-cpns-2026",
    title: "Pengumuman Kelulusan Seleksi CPNS & Calon Hakim Tenaga Teknis 2025/2026",
    category: "berita",
    categoryKey: "berita",
    categoryLabel: "Pengumuman Kepegawaian",
    categoryColor: "#B45309",
    categoryBg: "#FEF3C7",
    snippet:
      "Sekretariat Mahkamah Agung RI merilis daftar nama peserta yang lolos Seleksi Kompetensi Bidang (SKB) Calon Pegawai Negeri Sipil dan Calon Hakim untuk penempatan lingkungan Pengadilan Negeri Purworejo.",
    url: "/berita/pengumuman",
    meta: "Dipublikasikan: 5 Februari 2026 • Pengumuman Resmi",
    ctaLabel: "Buka Pengumuman CPNS",
    keywords: [
      "cpns", "calon hakim", "seleksi", "skb", "lowongan", "rekrutmen", "mahkamah agung",
      "pegawai", "pengumuman cpns", "lulus skb"
    ],
  },
  {
    id: "berita-ptsp-ramah-disabilitas",
    title: "Peningkatan Fasilitas Aksesibilitas dan PTSP Ramah Kaum Rentan & Disabilitas",
    category: "berita",
    categoryKey: "berita",
    categoryLabel: "Layanan Publik",
    categoryColor: "#15803D",
    categoryBg: "#DCFCE7",
    snippet:
      "Pengadilan Negeri Purworejo menyediakan jalur pemandu (guiding block), kursi roda elektrik, ruang laktasi, brosur berhuruf braille, serta juru bahasa isyarat bagi penyandang disabilitas yang berurusan di pengadilan.",
    url: "/layanan-publik/maklumat-dan-standar-pelayanan",
    meta: "Dipublikasikan: 22 Januari 2026",
    ctaLabel: "Lihat Fasilitas Disabilitas",
    keywords: [
      "disabilitas", "kaum rentan", "ramah disabilitas", "kursi roda", "braille",
      "bahasa isyarat", "guiding block", "aksesibilitas", "fasilitas"
    ],
  },
];

/**
 * Intelligent Token-based Search function.
 * Matches keywords, title, snippet, categoryLabel with relevance scoring.
 */
export function searchContent(query: string, categoryKey: string = "all"): {
  results: SearchResultItem[];
  totalMatches: number;
  timeTakenMs: number;
} {
  const startTime = performance.now();
  const trimmed = query.trim().toLowerCase();

  // If no query and category is all, return all or top items
  if (!trimmed) {
    const list = categoryKey === "all"
      ? searchDatabase
      : searchDatabase.filter((item) => item.categoryKey === categoryKey);
    return {
      results: list,
      totalMatches: list.length,
      timeTakenMs: Math.round(performance.now() - startTime),
    };
  }

  // Tokenize query words
  const tokens = trimmed.split(/\s+/).filter(t => t.length > 0);

  const scoredItems = searchDatabase
    .filter((item) => categoryKey === "all" || item.categoryKey === categoryKey)
    .map((item) => {
      let score = 0;
      const lowerTitle = item.title.toLowerCase();
      const lowerSnippet = item.snippet.toLowerCase();
      const lowerCat = item.categoryLabel.toLowerCase();
      const lowerKeywords = item.keywords.map(k => k.toLowerCase());

      // 1. Exact phrase matches (highest priority)
      if (lowerTitle.includes(trimmed)) score += 100;
      if (lowerKeywords.some(k => k === trimmed || k.includes(trimmed))) score += 60;
      if (lowerSnippet.includes(trimmed)) score += 35;
      if (lowerCat.includes(trimmed)) score += 25;

      // 2. Individual token matches
      for (const token of tokens) {
        if (token.length < 2) continue;

        // Title token match
        if (lowerTitle.includes(token)) score += 40;

        // Keywords token match
        if (lowerKeywords.some(k => k.includes(token))) score += 30;

        // Snippet token match
        if (lowerSnippet.includes(token)) score += 15;

        // Category label match
        if (lowerCat.includes(token)) score += 15;
      }

      return { item, score };
    })
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ item }) => item);

  const timeTaken = Math.max(12, Math.round(performance.now() - startTime));

  return {
    results: scoredItems,
    totalMatches: scoredItems.length,
    timeTakenMs: timeTaken,
  };
}

/**
 * Intelligent "Did you mean" suggestion generator
 */
export function getDidYouMeanSuggestions(query: string): string[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];

  const map: Record<string, string[]> = {
    cerai: ["Prosedur & Syarat Perceraian Non-Muslim", "Biaya Panjar Perkara"],
    gugat: ["Prosedur Gugatan Sederhana", "Formulir Surat Kuasa Khusus"],
    sidang: ["Jadwal Sidang Harian PN Purworejo", "Alur Persidangan Perkara"],
    jadwal: ["Jadwal Sidang Harian", "Sidang Keliling Zitting Plaats"],
    biaya: ["Radius Biaya Panggilan 2026", "Pembebasan Biaya Prodeo"],
    uang: ["Radius Biaya Panggilan 2026", "Sisa Panjar Perkara"],
    ppid: ["Formulir Permohonan PPID Online", "Layanan Informasi Publik"],
    bantuan: ["Pos Bantuan Hukum (POSBAKUM)", "Pembebasan Biaya Prodeo"],
    posbakum: ["Pos Bantuan Hukum (POSBAKUM)", "Formulir POSBAKUM Online"],
    tilang: ["Informasi Denda e-Tilang", "Jadwal Sidang Tilang"],
    denda: ["Informasi Denda e-Tilang", "Biaya Panjar Perkara"],
    surat: ["Formulir Surat Kuasa Khusus", "Surat Keterangan ERATERANG"],
    ktp: ["Formulir Permohonan PPID Online", "Syarat Pendaftaran Posbakum"],
    ecourt: ["Optimalisasi Layanan e-Court", "Alur Berperkara Perdata"],
    sipp: ["Sistem Informasi Penelusuran Perkara (SIPP)", "Jadwal Sidang Harian"],
    hakim: ["Jadwal Sidang Harian", "Profil Hakim dan Pegawai"],
    putusan: ["Sistem Penelusuran Perkara (SIPP)", "Prosedur Eksekusi Putusan"],
  };

  for (const [key, suggestions] of Object.entries(map)) {
    if (q.includes(key) || key.includes(q)) {
      return suggestions;
    }
  }

  // Fallback popular suggestions
  return ["Jadwal Sidang Harian", "Prosedur Gugatan Perceraian"];
}
