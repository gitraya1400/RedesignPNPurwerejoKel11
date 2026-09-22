import {
  RefreshCw,
  Settings,
  FileText,
  Users,
  DollarSign,
  Eye,
  Shield,
  Award,
  ArrowRight,
} from "lucide-react";

const zones = [
  {
    icon: RefreshCw,
    title: "Manajemen Perubahan",
    desc: "Transformasi pola pikir dan budaya kerja aparatur pengadilan menuju profesionalisme.",
  },
  {
    icon: Settings,
    title: "Penataan Tatalaksana",
    desc: "Penyederhanaan proses bisnis dan standar operasional prosedur pelayanan.",
  },
  {
    icon: Users,
    title: "Penataan SDM",
    desc: "Sistem manajemen SDM berbasis kompetensi, transparan, dan akuntabel.",
  },
  {
    icon: FileText,
    title: "Penguatan Akuntabilitas",
    desc: "Peningkatan kapasitas dan akuntabilitas kinerja organisasi pengadilan.",
  },
  {
    icon: Eye,
    title: "Penguatan Pengawasan",
    desc: "Membangun sistem pengendalian internal yang efektif dan pencegahan korupsi.",
  },
  {
    icon: DollarSign,
    title: "Peningkatan Kualitas Layanan",
    desc: "Standar layanan publik prima yang mudah, cepat, dan transparan.",
  },
  {
    icon: Shield,
    title: "WBK",
    desc: "Wilayah Bebas dari Korupsi — komitmen bebas gratifikasi dan pungutan liar.",
    highlight: true,
  },
  {
    icon: Award,
    title: "WBBM",
    desc: "Wilayah Birokrasi Bersih Melayani — standar pelayanan tertinggi aparatur.",
    highlight: true,
  },
];

export function ZonaIntegritas() {
  return (
    <section className="py-14" style={{ background: "linear-gradient(135deg, #9A2109 0%, #7B1A07 50%, #4A0E04 100%)" }}>
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <span
              className="inline-flex items-center gap-2 bg-white/20 text-[#F9C784] text-sm px-4 py-1.5 rounded-full mb-3 border border-white/20"
            >
              <Shield size={11} />
              Program Reformasi Birokrasi
            </span>
            <h2
              className="text-white"
              style={{ fontSize: "1.75rem", fontWeight: 800 }}
            >
              ZONA INTEGRITAS
            </h2>
            <p className="text-white/60 text-sm mt-1">
              PN Purworejo berkomitmen mewujudkan zona integritas menuju WBK & WBBM
            </p>
          </div>
          <button aria-label="Aksi" className="self-start md:self-auto flex items-center gap-2 bg-white/15 text-white border border-white/20 rounded-full px-5 py-2.5 text-sm hover:bg-white/25 transition-colors" style={{ fontWeight: 600 }}>
            Selengkapnya <ArrowRight size={14} />
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {zones.map((zone) => {
            const Icon = zone.icon;
            return (
              <div
                key={zone.title}
                className={`rounded-2xl p-5 border cursor-pointer group transition-all duration-200 hover:-translate-y-1 hover:shadow-2xl ${
                  zone.highlight
                    ? "bg-[#F9C784]/15 border-[#F9C784]/40 hover:bg-[#F9C784]/25"
                    : "bg-white/10 border-white/15 hover:bg-white/20"
                }`}
                style={{ backdropFilter: "blur(8px)" }}
              >
                <div
                  className={`w-11 h-11 rounded-xl flex items-center justify-center mb-3 ${
                    zone.highlight ? "bg-[#F9C784]/30" : "bg-white/15"
                  }`}
                >
                  <Icon
                    size={20}
                    className={zone.highlight ? "text-[#F9C784]" : "text-white/80"}
                  />
                </div>
                <h2
                  className={`mb-1.5 ${zone.highlight ? "text-[#F9C784]" : "text-white"}`}
                  style={{ fontWeight: 700, fontSize: "0.9rem" }}
                >
                  {zone.title}
                </h2>
                <p className="text-white/55 text-sm leading-relaxed">{zone.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
