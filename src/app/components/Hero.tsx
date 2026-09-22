import { useState, useEffect } from "react";
import { ChevronRight, ChevronLeft, Scale, Search, HelpCircle, Calendar } from "lucide-react";
import courtImage from "../../imports/kantor-pengadilan-negeri-purworejo-Image.jpeg";

const slides = [
  {
    badge: "Pengadilan Negeri Purworejo",
    title: "Selamat Datang",
    subtitle: "Melayani Dengan Profesional dan Integritas",
    desc: "Pengadilan Negeri Purworejo berkomitmen memberikan pelayanan hukum terbaik kepada masyarakat dengan mengutamakan transparansi, akuntabilitas, dan kepastian hukum.",
    cta: "Jelajahi Layanan →",
    ctaExternal: false,
  },
  {
    badge: "Platform Digital Terpadu",
    title: "e-BERPADU",
    subtitle: "Elektronik Berkas Perkara Terpadu",
    desc: "Sistem pengelolaan berkas perkara secara elektronik yang terintegrasi, memudahkan proses administrasi dan pelayanan hukum kepada masyarakat.",
    cta: "Selengkapnya →",
    ctaExternal: true,
  },
  {
    badge: "Sistem Informasi Penelusuran Perkara",
    title: "SIPP Online",
    subtitle: "Transparansi Penanganan Perkara",
    desc: "Pantau perkembangan perkara secara real-time melalui Sistem Informasi Penelusuran Perkara Mahkamah Agung RI.",
    cta: "Akses SIPP →",
    ctaExternal: true,
  },
  {
    badge: "Pengadilan Elektronik",
    title: "e-Court MA RI",
    subtitle: "Pendaftaran Perkara Online",
    desc: "Daftarkan perkara, bayar panjar biaya perkara, dan ikuti persidangan secara elektronik dari mana saja.",
    cta: "Mulai e-Court →",
    ctaExternal: true,
  },
  {
    badge: "Surat Keterangan Digital",
    title: "Eraterang",
    subtitle: "Layanan Surat Keterangan Online",
    desc: "Ajukan permohonan surat keterangan tidak pernah dihukum dan surat keterangan lainnya secara online tanpa antrian.",
    cta: "Ajukan Sekarang →",
    ctaExternal: false,
  },
  {
    badge: "Zona Integritas",
    title: "WBK & WBBM",
    subtitle: "Wilayah Bebas Korupsi",
    desc: "PN Purworejo berkomitmen mewujudkan zona integritas menuju Wilayah Bebas dari Korupsi dan Wilayah Birokrasi Bersih Melayani.",
    cta: "Lihat Program ZI →",
    ctaExternal: false,
  },
];

interface HeroProps {
  onExternalLink: (url: string, label: string) => void;
}

export function Hero({ onExternalLink }: HeroProps) {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (idx: number) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(idx);
      setAnimating(false);
    }, 300);
  };

  const goToPrev = () => {
    goTo(current === 0 ? slides.length - 1 : current - 1);
  };

  const goToNext = () => {
    goTo((current + 1) % slides.length);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offsetTop = element.offsetTop - 80;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  };

  const slide = slides[current];

  return (
    <section className="relative w-full min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#9A2109] via-[#7B1A07] to-[#4A0E04]">
        {/* Grid mesh texture */}
        <div
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />
        {/* Radial glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#F9C784]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-white/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 pt-20 pb-20 w-full">
        {/* Navigation Buttons */}
        <button
          onClick={goToPrev}
          className="absolute -left-4 lg:-left-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-110 group shadow-lg"
          aria-label="Slide sebelumnya"
        >
          <ChevronLeft size={24} className="text-white group-hover:text-[#F9C784] transition-colors" />
        </button>
        <button
          onClick={goToNext}
          className="absolute -right-4 lg:-right-12 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/20 rounded-full p-3 transition-all duration-200 hover:scale-110 group shadow-lg"
          aria-label="Slide berikutnya"
        >
          <ChevronRight size={24} className="text-white group-hover:text-[#F9C784] transition-colors" />
        </button>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div
            className={`transition-all duration-300 ${
              animating ? "opacity-0 translate-y-4" : "opacity-100 translate-y-0"
            }`}
          >
            <span className="inline-flex items-center gap-2 bg-white/15 text-[#F9C784] text-sm px-4 py-1.5 rounded-full mb-4 border border-white/20 backdrop-blur-sm">
              <Scale size={12} />
              {slide.badge}
            </span>

            <h1
              className="text-white mb-2 leading-tight"
              style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 800, lineHeight: 1.1 }}
            >
              {slide.title}
            </h1>
            <p
              className="text-[#F9C784] mb-4"
              style={{ fontSize: "1.1rem", fontWeight: 600 }}
            >
              {slide.subtitle}
            </p>
            <p className="text-white/75 mb-8 max-w-md" style={{ lineHeight: 1.7 }}>
              {slide.desc}
            </p>

            {current === 0 ? (
              <div className="flex flex-wrap items-center gap-3">
                <button aria-label="Aksi"
                  onClick={() => scrollToSection('faq-section')}
                  className="inline-flex items-center gap-2 bg-[#9A2109]/30 text-white border-2 border-white/50 px-6 py-3 rounded-full hover:bg-[#9A2109]/50 hover:border-white transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5 backdrop-blur-sm"
                  style={{ fontWeight: 700 }}
                >
                  <HelpCircle size={18} />
                  FAQ
                </button>
                <button aria-label="Aksi"
                  onClick={() => scrollToSection('jadwal-sidang-section')}
                  className="inline-flex items-center gap-2 bg-white text-[#9A2109] px-6 py-3 rounded-full hover:bg-[#F9C784] transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                  style={{ fontWeight: 700 }}
                >
                  <Calendar size={18} />
                  Jadwal Sidang
                </button>
              </div>
            ) : (
              <button aria-label="Aksi"
                onClick={() =>
                  slide.ctaExternal
                    ? onExternalLink("#", slide.title)
                    : undefined
                }
                className="inline-flex items-center gap-2 bg-white text-[#9A2109] px-8 py-3 rounded-full hover:bg-[#F9C784] transition-all duration-200 shadow-xl hover:shadow-2xl hover:-translate-y-0.5"
                style={{ fontWeight: 700 }}
              >
                {slide.cta}
              </button>
            )}
          </div>

          {/* Right — Info Card */}
          <div
            className={`hidden lg:flex justify-center items-center transition-all duration-300 ${
              animating ? "opacity-0 scale-95" : "opacity-100 scale-100"
            }`}
          >
            <div className="w-full max-w-lg flex flex-col gap-3 h-full">
              {/* Search Bar - 30% height */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-6 border border-white/20 shadow-2xl flex-[0.3] flex flex-col justify-center">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 bg-[#9A2109] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Search size={20} className="text-[#F9C784]" />
                  </div>
                  <div>
                    <p className="text-white text-sm" style={{ fontWeight: 700 }}>Pencarian</p>
                    <p className="text-white/60 text-sm">Temukan informasi dengan cepat</p>
                  </div>
                </div>

                <div className="relative">
                  <input aria-label="Cari berdasar kata kunci"
                    type="text"
                    placeholder="Cari berdasar kata kunci"
                    className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-[#F9C784] focus:border-transparent transition-all"
                  />
                  <Search size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40" />
                </div>
              </div>

              {/* Court Image - 70% height */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-2xl overflow-hidden flex-[0.7]">
                <img
                  src={courtImage}
                  alt="Kantor Pengadilan Negeri Purworejo"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex items-center justify-center gap-2 mt-12">
          {slides.map((_, i) => (
            <button aria-label="Aksi"
              key={i}
              onClick={() => goTo(i)}
              className={`rounded-full transition-all duration-300 ${
                i === current
                  ? "w-8 h-2.5 bg-[#F9C784]"
                  : "w-2.5 h-2.5 bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1">
        <span className="text-white/50 text-sm">Scroll</span>
        <div className="w-0.5 h-6 bg-gradient-to-b from-white/40 to-transparent" />
      </div>
    </section>
  );
}
