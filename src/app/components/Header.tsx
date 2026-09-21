import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router";
import {
  Search,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Scale,
  Shield,
  Users,
  Building2,
  BookOpen,
  Phone,
  RefreshCw,
  Home,
} from "lucide-react";
import logoImage from "../../imports/images-removebg-preview.png";

interface HeaderProps {
  onSearchOpen: () => void;
}

const navItems = [
  {
    label: "Beranda",
    href: "/",
    icon: Home,
    submenu: [],
  },
  {
    label: "Tentang Pengadilan",
    href: "#",
    icon: Building2,
    submenu: [
      { label: "Pengantar Dari Ketua Pengadilan", href: "/tentang-pengadilan/pengantar-dari-ketua-pengadilan" },
      { label: "Visi Misi Pengadilan", href: "/tentang-pengadilan/visi-misi-pengadilan" },
      {
        label: "Profil Pengadilan",
        href: "#",
        submenu: [
          { label: "Sejarah Pengadilan", href: "/tentang-pengadilan/sejarah-pengadilan" },
          { label: "Struktur Organisasi", href: "/tentang-pengadilan/struktur-organisasi" },
          { label: "Wilayah Yuridiksi", href: "/tentang-pengadilan/wilayah-yuridiksi" },
        ]
      },
      {
        label: "Profil Hakim dan Pegawai",
        href: "#",
        submenu: [
          { label: "Ketua", href: "/tentang-pengadilan/pegawai/18" },
          { label: "Wakil Ketua", href: "/tentang-pengadilan/pegawai/19" },
          { label: "Hakim", href: "/tentang-pengadilan/pegawai/10" },
          { label: "Pejabat Kepaniteraan", href: "#", disabled: true },
          { label: "Pejabat Kesekretariatan", href: "#", disabled: true },
          { label: "Panitera Pengganti", href: "/tentang-pengadilan/pegawai/16" },
          { label: "Jurusita", href: "/tentang-pengadilan/pegawai/40" },
          { label: "Jabatan Fungsional", href: "/tentang-pengadilan/pegawai/15" },
          { label: "Staf", href: "/tentang-pengadilan/pegawai/14" },
          { label: "PPNPN", href: "/tentang-pengadilan/pegawai/13" },
          { label: "CPNS", href: "/tentang-pengadilan/pegawai/41" },
          { label: "Jurusita Pengganti", href: "/tentang-pengadilan/pegawai/42" },
          { label: "Fungsional PPPK", href: "/tentang-pengadilan/pegawai/43" },
        ]
      },
      {
        label: "Profil Role Model dan Agen Perubahan",
        href: "#",
        submenu: [
          { label: "Profil Role Model", href: "/tentang-pengadilan/profil-role-model" },
          { label: "Profil Agen Perubahan", href: "/tentang-pengadilan/profil-agen-perubahan" },
        ]
      },
      {
        label: "Kepaniteraan",
        href: "#",
        submenu: [
          { label: "Kepaniteraan Pidana", href: "/tentang-pengadilan/kepaniteraan-pidana" },
          { label: "Kepaniteraan Perdata", href: "/tentang-pengadilan/kepaniteraan-perdata" },
          { label: "Kepaniteraan Hukum", href: "/tentang-pengadilan/kepaniteraan-hukum" },
        ]
      },
      {
        label: "Kesekretariatan",
        href: "#",
        submenu: [
          { label: "Perencanaan IT dan Pelaporan", href: "/tentang-pengadilan/perencanaan-it-dan-pelaporan" },
          { label: "Kepegawaian, Organisasi dan Tatalaksana", href: "/tentang-pengadilan/kepegawaian-organisasi-dan-tatalaksana" },
          { label: "Umum dan Keuangan", href: "/tentang-pengadilan/umum-dan-keuangan" },
        ]
      },
      {
        label: "Sistem Pengelolaan Pengadilan",
        href: "#",
        submenu: [
          { label: "E-Learning", href: "https://elearning.mahkamahagung.go.id/", external: true },
          { label: "Kebijakan / Yurisprudensi", href: "https://jdih.mahkamahagung.go.id/", external: true },
          { label: "Rencana Strategis", href: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-strategis" },
          { label: "Rencana Kerja dan Anggaran", href: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/rencana-kerja-dan-anggaran" },
          { label: "Pengawasan dan Kode Etik Hakim", href: "/tentang-pengadilan/sistem-pengelolaan-pengadilan/pengawasan-dan-kode-etik-hakim" },
        ]
      },
      {
        label: "PTSP",
        href: "#",
        submenu: [
          { label: "Jenis Layanan", href: "/tentang-pengadilan/ptsp/jenis-layanan" },
          { label: "Standar Pelayanan", href: "/tentang-pengadilan/ptsp/standar-pelayanan" },
          { label: "Maklumat Pelayanan", href: "/tentang-pengadilan/ptsp/maklumat-pelayanan" },
          { label: "Kompensasi Pelayanan", href: "/tentang-pengadilan/ptsp/kompensasi-pelayanan" },
        ]
      },
      {
        label: "Layanan Disabilitas",
        href: "#",
        submenu: [
          { label: "Prosedur Pelayanan Bagi Penyandang Disabilitas", href: "/tentang-pengadilan/prosedur-pelayanan-bagi-penyandang-disabilitas" },
          { label: "Sarana & Prasarana Bagi Penyandang Disabilitas", href: "/tentang-pengadilan/sarana-prasarana-bagi-penyandang-disabilitas" },
          { label: "Buku Saku Pedoman Etika Berinteraksi dengan Penyandang Disabilitas", href: "/tentang-pengadilan/buku-saku-pedoman-etika-berinteraksi-dengan-penyandang-disabilitas-di-lingkungan-peraddilan-umum" },
        ]
      },
      { label: "Tata Tertib Pengadilan", href: "/tentang-pengadilan/tata-tertib-pengadilan" },
      {
        label: "Informasi Perkara",
        href: "#",
        submenu: [
          { label: "Delegasi", href: "https://sipp.pn-cikarang.go.id/", external: true },
          { label: "Statistik Perkara", href: "https://sipp.pn-cikarang.go.id/statistik_perkara", external: true },
        ]
      },
    ],
  },
  {
    label: "Layanan Publik",
    href: "#",
    icon: Users,
    submenu: [
      {
        label: "Laporan",
        href: "#",
        submenu: [
          { label: "Rencana Aksi & LKjIP", href: "/layanan-publik/laporan/rencana-aksi-dan-lkjip" },
          { label: "SAKIP", href: "/layanan-publik/laporan/sakip" },
          { label: "Aset & Inventaris", href: "/layanan-publik/laporan/aset-dan-inventaris" },
          { label: "Laporan Tahunan", href: "/layanan-publik/laporan/laporan-tahunan" },
          { label: "Survei Harian", href: "/layanan-publik/laporan/survei-harian" },
          { label: "Laporan Keuangan", href: "/layanan-publik/laporan/laporan-keuangan" },
          { label: "Pelayanan Informasi Publik", href: "/layanan-publik/laporan/pelayanan-informasi-publik" },
          { label: "LHKPN & LHKASN", href: "/layanan-publik/laporan/lhkpn-dan-lhkasn" },
          { label: "Indeks Kepuasan Masyarakat (IKM)", href: "/layanan-publik/laporan/skm" },
          { label: "Indeks Persepsi Anti Korupsi (IPAK)", href: "/layanan-publik/laporan/spak" },
        ]
      },
      { label: "Pengumuman", href: "/layanan-publik/pengumuman" },
      { label: "E-Brosur", href: "/layanan-publik/e-brosur" },
      { label: "SOP Layanan", href: "/layanan-publik/sop-pelayanan-informasi-biasa" },
    ],
  },
  {
    label: "Layanan Hukum",
    href: "#",
    icon: Scale,
    submenu: [
      {
        label: "Layanan Hukum Bagi Masyarakat Kurang Mampu",
        href: "#",
        submenu: [
          { label: "Prosedur Pembebasan Biaya Perkara (Prodeo)", href: "/layanan-hukum/layanan-hukum-bagi-masyarakat-kurang-mampu/prosedur-pembebasan-biaya-perkara-prodeo" },
          { label: "POSBAKUM", href: "/hubungi/posbakum", route: true },
          { label: "Peraturan dan Kebijakan", href: "/layanan-hukum/peraturan-dan-kebijakan" },
          { label: "Zitting Plaats", href: "/layanan-hukum/zitting-plaats" },
        ]
      },
      {
        label: "Prosedur Pengajuan Perkara dan Biaya Perkara",
        href: "#",
        submenu: [
          { label: "Prosedur Pengajuan Perkara", href: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara" },
          { label: "Biaya Perkara", href: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/biaya-perkara" },
          { label: "Pengumuman Sisa Panjar Biaya Perkara", href: "/layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/pengumuman-sisa-panjar-biaya-perkara" },
        ]
      },
      { label: "Prosedur Eksekusi", href: "/layanan-hukum/prosedur-eksekusi" },
    ],
  },
  {
    label: "Berita",
    href: "#",
    icon: BookOpen,
    submenu: [
      { label: "Berita Terkini", href: "/berita/berita-terkini" },
      { label: "Artikel", href: "/berita/artikel" },
      {
        label: "Foto Galeri",
        href: "#",
        submenu: [
          { label: "Kegiatan Pengadilan", href: "#", disabled: true },
          { label: "Fasilitas dan Ruangan untuk Publik", href: "#", disabled: true },
          { label: "Sarana Persidangan Anak", href: "#", disabled: true },
        ]
      },
      { label: "Video Galeri", href: "/berita/video" },
    ],
  },
  {
    label: "Hubungi Kami",
    href: "#",
    icon: Phone,
    submenu: [
      { label: "Pengaduan", href: "/hubungi-kami/pengaduan" },
      { label: "Alamat", href: "/hubungi-kami/alamat" },
      { label: "Sosial Media", href: "/hubungi-kami/sosial-media" },
    ],
  },
  {
    label: "Formulir",
    href: "#",
    icon: BookOpen,
    submenu: [
      { label: "Posbakum", href: "/hubungi/posbakum/form", route: true },
      { label: "GO INFO", href: "/hubungi/goinfo", route: true },
    ],
  },
  {
    label: "Reformasi Birokrasi",
    href: "#",
    icon: RefreshCw,
    submenu: [
      {
        label: "Zona Integritas",
        href: "#",
        submenu: [
          { label: "Area I", href: "/reformasi-birokrasi/zona-integritas/area-i" },
          { label: "Area II", href: "/reformasi-birokrasi/zona-integritas/area-ii" },
          { label: "Area III", href: "/reformasi-birokrasi/zona-integritas/area-iii" },
          { label: "Area IV", href: "/reformasi-birokrasi/zona-integritas/area-iv" },
          { label: "Area V", href: "/reformasi-birokrasi/zona-integritas/area-v" },
          { label: "Area VI", href: "/reformasi-birokrasi/zona-integritas/area-vi" },
        ]
      },
      {
        label: "Akreditasi Penjaminan Mutu",
        href: "#",
        submenu: [
          { label: "SK Penetapan Nilai Akreditasi", href: "/reformasi-birokrasi/akreditasi-penjaminan-mutu/sk-penetapan-nilai-akreditasi" },
        ]
      },
      { label: "AMPUH", href: "/reformasi-birokrasi/ampuh" },
    ],
  },
];

function itemMatchesPath(item: any, pathname: string): boolean {
  const href = item.href;
  if (href && href !== "#") {
    if (href === "/") {
      if (pathname === "/") return true;
    } else if (pathname === href || pathname.startsWith(href + "/")) {
      return true;
    }
  }
  if (item.submenu && item.submenu.length > 0) {
    return item.submenu.some((sub: any) => itemMatchesPath(sub, pathname));
  }
  return false;
}

function getActiveTopLevels(pathname: string): Set<string> {
  const active = new Set<string>();
  for (const item of navItems) {
    if (itemMatchesPath(item, pathname)) active.add(item.label);
  }
  return active;
}

export function Header({ onSearchOpen }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const activeTopLevels = getActiveTopLevels(location.pathname);
  const menuRef = useRef<HTMLDivElement>(null);

  // On non-homepage routes the background is always white — no transparent phase
  const isHomepage = location.pathname === "/";
  const isScrolled = !isHomepage || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setActiveMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Main Navbar */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-white shadow-md"
            : "bg-transparent"
        }`}
        ref={menuRef}
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3">
              <img
                src={logoImage}
                alt="Logo PN Purworejo"
                className="w-11 h-11 object-contain"
              />
              <div>
                <p
                  className={`text-[10px] tracking-widest uppercase transition-colors ${
                    isScrolled ? "text-gray-500" : "text-white/80"
                  }`}
                >
                  MAHKAMAH AGUNG RI
                </p>
                <p
                  className={`text-sm leading-tight transition-colors ${
                    isScrolled ? "text-[#9A2109]" : "text-white"
                  }`}
                  style={{ fontWeight: 700 }}
                >
                  PN PURWOREJO KELAS IB
                </p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center gap-1">
              {navItems.map((item, idx) => {
                const isRightSide = idx >= navItems.length - 3; // Last 3 items open to left

                return (
                  <div key={item.label} className="relative">
                    {item.submenu.length === 0 ? (
                      <Link
                        to={item.href}
                        className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                          activeTopLevels.has(item.label)
                            ? isScrolled ? "text-[#9A2109]" : "text-white"
                            : isScrolled ? "text-gray-700 hover:text-[#9A2109]" : "text-white/90 hover:text-white"
                        }`}
                        style={{ fontWeight: activeTopLevels.has(item.label) ? 700 : 500 }}
                      >
                        {item.label}
                        {activeTopLevels.has(item.label) && (
                          <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F9C784] rounded-full" />
                        )}
                      </Link>
                    ) : (
                    <button
                      className={`flex items-center gap-1 px-3 py-2 rounded-lg text-sm transition-all ${
                        activeTopLevels.has(item.label)
                          ? isScrolled
                            ? "text-[#9A2109]"
                            : "text-white"
                          : isScrolled
                          ? "text-gray-700 hover:text-[#9A2109]"
                          : "text-white/90 hover:text-white"
                      }`}
                      style={{ fontWeight: activeTopLevels.has(item.label) ? 700 : 500 }}
                      onMouseEnter={() => {
                        setActiveMenu(item.label);
                        setActiveSubmenu(null);
                      }}
                      onMouseLeave={() => {}}
                      onClick={() => {}}
                    >
                      {item.label}
                      <ChevronDown
                        size={13}
                        className={`transition-transform ${
                          activeMenu === item.label ? "rotate-180" : ""
                        }`}
                      />
                      {activeTopLevels.has(item.label) && (
                        <span className="absolute bottom-0 left-3 right-3 h-0.5 bg-[#F9C784] rounded-full" />
                      )}
                    </button>
                    )}

                    {/* Level 2 Dropdown */}
                    {item.submenu.length > 0 && activeMenu === item.label && (
                      <div
                        className={`absolute top-full mt-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 ${
                          isRightSide ? 'right-0' : 'left-0'
                        }`}
                        onMouseEnter={() => setActiveMenu(item.label)}
                        onMouseLeave={() => {
                          setActiveMenu(null);
                          setActiveSubmenu(null);
                        }}
                      >
                        {item.submenu.map((sub: any) => {
                          const hasSubmenu = sub.submenu && sub.submenu.length > 0;
                          const isDisabled = sub.disabled;

                          return (
                            <div key={sub.label} className="relative">
                              {hasSubmenu ? (
                                <button
                                  className={`w-full flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group ${
                                    activeSubmenu === sub.label ? "bg-[#9A2109] text-white" : ""
                                  }`}
                                  onMouseEnter={() => setActiveSubmenu(sub.label)}
                                  onMouseLeave={() => {
                                    // Don't close immediately
                                  }}
                                >
                                  <span className="flex-1">{sub.label}</span>
                                  <ChevronRight size={14} className={`flex-shrink-0 ml-2 ${activeSubmenu === sub.label ? "text-white" : "text-gray-400 group-hover:text-white"}`} />
                                </button>
                              ) : isDisabled ? (
                                <div className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-400 mx-1 cursor-not-allowed opacity-50">
                                  <span className="flex-1">{sub.label}</span>
                                  <span className="flex-shrink-0 ml-2 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">placeholder</span>
                                </div>
                              ) : sub.route ? (
                                <Link
                                  to={sub.href}
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group"
                                  onClick={() => {
                                    setActiveMenu(null);
                                    setActiveSubmenu(null);
                                  }}
                                >
                                  <span className="flex-1">{sub.label}</span>
                                  <span className="flex-shrink-0 ml-2 text-[10px] bg-[#FFF1F1] group-hover:bg-white/20 text-[#9A2109] group-hover:text-white px-1.5 py-0.5 rounded" style={{ fontWeight: 700 }}>
                                    Form
                                  </span>
                                </Link>
                              ) : sub.external ? (
                                <a
                                  href={sub.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group"
                                >
                                  <span className="flex-1">{sub.label}</span>
                                  <span className="flex-shrink-0 ml-2 text-[10px] bg-gray-100 group-hover:bg-white/20 text-gray-400 group-hover:text-white px-1.5 py-0.5 rounded">↗</span>
                                </a>
                              ) : (
                                <Link
                                  to={sub.href}
                                  className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group"
                                  onClick={() => { setActiveMenu(null); setActiveSubmenu(null); }}
                                >
                                  <span className="flex-1">{sub.label}</span>
                                </Link>
                              )}

                              {/* Level 3 Dropdown (Vertical Single Column) */}
                              {hasSubmenu && activeSubmenu === sub.label && (
                                <div
                                  className={`absolute top-0 ml-1 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 py-2 z-50 ${
                                    isRightSide ? 'right-full mr-1 ml-0' : 'left-full'
                                  }`}
                                  onMouseEnter={() => setActiveSubmenu(sub.label)}
                                  onMouseLeave={() => setActiveSubmenu(null)}
                                >
                                  {sub.submenu.map((item3: any) => {
                                    const isDisabled3 = item3.disabled;

                                    return isDisabled3 ? (
                                      <div
                                        key={item3.label}
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-400 mx-1 cursor-not-allowed opacity-50"
                                      >
                                        <span className="flex-1">{item3.label}</span>
                                        <span className="flex-shrink-0 ml-2 text-[10px] bg-gray-100 text-gray-400 px-1.5 py-0.5 rounded">placeholder</span>
                                      </div>
                                    ) : item3.external ? (
                                      <a
                                        key={item3.label}
                                        href={item3.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group"
                                      >
                                        <span className="flex-1">{item3.label}</span>
                                        <span className="flex-shrink-0 ml-2 text-[10px] bg-gray-100 group-hover:bg-white/20 text-gray-400 group-hover:text-white px-1.5 py-0.5 rounded">↗</span>
                                      </a>
                                    ) : (
                                      <Link
                                        key={item3.label}
                                        to={item3.href}
                                        className="flex items-center justify-between px-4 py-2.5 text-sm text-left text-gray-700 hover:bg-[#9A2109] hover:text-white rounded-lg mx-1 transition-colors group"
                                        onClick={() => { setActiveMenu(null); setActiveSubmenu(null); }}
                                      >
                                        <span className="flex-1">{item3.label}</span>
                                      </Link>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </nav>

            {/* Search Button */}
            <button
              onClick={onSearchOpen}
              className={`hidden lg:flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${
                isScrolled
                  ? "text-gray-700 hover:text-[#9A2109]"
                  : "text-white/90 hover:text-white"
              }`}
              style={{ fontWeight: 500 }}
            >
              <Search size={16} />
            </button>

            {/* Mobile Toggle */}
            <button
              className={`lg:hidden transition-colors ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 shadow-xl max-h-[80vh] overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.submenu.length === 0 ? (
                  <Link
                    to={item.href}
                    className="w-full flex items-center px-4 py-3 text-sm border-b border-gray-50 hover:bg-gray-50"
                    style={{ fontWeight: activeTopLevels.has(item.label) ? 700 : 500, color: activeTopLevels.has(item.label) ? "#9A2109" : "#374151" }}
                    onClick={() => setMobileOpen(false)}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <>
                    <button
                      className="w-full flex items-center justify-between px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-b border-gray-50"
                      style={{ fontWeight: 500 }}
                      onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}
                    >
                      <span>{item.label}</span>
                      <ChevronDown size={14} className={`transition-transform ${activeMenu === item.label ? "rotate-180" : ""}`} />
                    </button>
                    {activeMenu === item.label && (
                      <div className="bg-gray-50">
                        {item.submenu.map((sub: any) => {
                          const hasSubmenu = sub.submenu && sub.submenu.length > 0;
                          const isDisabled = sub.disabled;
                          return (
                            <div key={sub.label}>
                              {hasSubmenu ? (
                                <>
                                  <button
                                    className="w-full flex items-center justify-between px-8 py-2.5 text-sm text-gray-700 hover:bg-gray-100"
                                    onClick={() => setActiveSubmenu(activeSubmenu === sub.label ? null : sub.label)}
                                  >
                                    <span>{sub.label}</span>
                                    <ChevronDown size={12} className={`transition-transform ${activeSubmenu === sub.label ? "rotate-180" : ""}`} />
                                  </button>
                                  {activeSubmenu === sub.label && (
                                    <div className="bg-gray-100">
                                      {sub.submenu.map((item3: any) =>
                                        item3.disabled ? (
                                          <div key={item3.label} className="flex items-center justify-between px-12 py-2 text-xs text-gray-400">
                                            <span>{item3.label}</span>
                                            <span className="text-[9px] bg-gray-200 text-gray-400 px-1 py-0.5 rounded">placeholder</span>
                                          </div>
                                        ) : item3.external ? (
                                          <a key={item3.label} href={item3.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-12 py-2 text-xs text-gray-600 hover:text-[#9A2109]">
                                            <span>{item3.label}</span>
                                            <span className="text-[9px] text-gray-400">↗</span>
                                          </a>
                                        ) : (
                                          <Link key={item3.label} to={item3.href} className="flex items-center justify-between px-12 py-2 text-xs text-gray-600 hover:text-[#9A2109]" onClick={() => { setActiveMenu(null); setActiveSubmenu(null); setMobileOpen(false); }}>
                                            <span>{item3.label}</span>
                                          </Link>
                                        )
                                      )}
                                    </div>
                                  )}
                                </>
                              ) : isDisabled ? (
                                <div className="flex items-center justify-between px-8 py-2.5 text-sm text-gray-400">
                                  <span>{sub.label}</span>
                                  <span className="text-[10px] bg-gray-200 text-gray-400 px-1.5 py-0.5 rounded">placeholder</span>
                                </div>
                              ) : sub.route ? (
                                <Link
                                  to={sub.href}
                                  className="flex items-center justify-between px-8 py-2.5 text-sm text-[#9A2109] hover:text-[#7B1A07]"
                                  style={{ fontWeight: 600 }}
                                  onClick={() => { setActiveMenu(null); setActiveSubmenu(null); setMobileOpen(false); }}
                                >
                                  {sub.label}
                                  <span className="text-[10px] bg-[#FFF1F1] text-[#9A2109] px-1.5 py-0.5 rounded" style={{ fontWeight: 700 }}>Form</span>
                                </Link>
                              ) : sub.external ? (
                                <a href={sub.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between px-8 py-2.5 text-sm text-gray-600 hover:text-[#9A2109]">
                                  <span>{sub.label}</span>
                                  <span className="text-[10px] text-gray-400">↗</span>
                                </a>
                              ) : (
                                <Link to={sub.href} className="flex items-center justify-between px-8 py-2.5 text-sm text-gray-600 hover:text-[#9A2109]" onClick={() => { setActiveMenu(null); setActiveSubmenu(null); setMobileOpen(false); }}>
                                  <span>{sub.label}</span>
                                </Link>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        )}
      </header>
    </>
  );
}
