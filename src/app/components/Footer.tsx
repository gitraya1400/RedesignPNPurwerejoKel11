import { Scale, MapPin, Phone, Mail, Globe, ExternalLink } from "lucide-react";

const links1 = [
  { label: "Tentang Pengadilan", href: "#" },
  { label: "Visi & Misi", href: "#" },
  { label: "Struktur Organisasi", href: "#" },
  { label: "Wilayah Hukum", href: "#" },
  { label: "Hakim & Aparatur", href: "#" },
];

const links2 = [
  { label: "e-Court", href: "#", external: true },
  { label: "SIPP Online", href: "#", external: true },
  { label: "Eraterang", href: "#", external: true },
  { label: "Jadwal Sidang", href: "#" },
  { label: "Biaya Perkara", href: "#" },
  { label: "Bantuan Hukum", href: "#" },
];

const links3 = [
  { label: "Zona Integritas", href: "#" },
  { label: "SAKIP", href: "#" },
  { label: "Survey IKM", href: "#" },
  { label: "LPSE", href: "#", external: true },
  { label: "Direktori Putusan", href: "#", external: true },
];

export function Footer() {
  return (
    <footer style={{ backgroundColor: "#1E293B" }}>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Col 1 — Branding */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#2E7D32] to-[#1B5E20] flex items-center justify-center flex-shrink-0">
                <Scale size={18} className="text-[#F9C784]" />
              </div>
              <div>
                <p className="text-white/60 text-[10px] tracking-widest uppercase">MAHKAMAH AGUNG RI</p>
                <p className="text-white text-sm leading-tight" style={{ fontWeight: 700 }}>
                  PN PURWOREJO KELAS IB
                </p>
              </div>
            </div>
            <p className="text-white/50 text-xs leading-relaxed mb-5">
              Pengadilan Negeri Purworejo adalah lembaga peradilan di bawah Mahkamah Agung Republik Indonesia yang melayani wilayah hukum Kabupaten Purworejo.
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2 text-white/50">
                <MapPin size={13} className="text-[#F9C784] mt-0.5 flex-shrink-0" />
                <span>Jl. Jenderal Sudirman No. 19, Purworejo, Jawa Tengah 54111</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Phone size={13} className="text-[#F9C784] flex-shrink-0" />
                <span>(0275) 321021</span>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Mail size={13} className="text-[#F9C784] flex-shrink-0" />
                <a href="mailto:delegasi@pn-purworejo.go.id" className="hover:text-[#F9C784] transition-colors">
                  delegasi@pn-purworejo.go.id
                </a>
              </div>
              <div className="flex items-center gap-2 text-white/50">
                <Globe size={13} className="text-[#F9C784] flex-shrink-0" />
                <span>pn-purworejo.go.id</span>
              </div>
            </div>
          </div>

          {/* Col 2 — Tentang */}
          <div>
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 700 }}>
              Tentang Pengadilan
            </h4>
            <ul className="space-y-2">
              {links1.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#F9C784] text-xs transition-colors flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-[#9A2109] rounded-full flex-shrink-0" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Layanan */}
          <div>
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 700 }}>
              Layanan Publik
            </h4>
            <ul className="space-y-2">
              {links2.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#F9C784] text-xs transition-colors flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-[#9A2109] rounded-full flex-shrink-0" />
                    {link.label}
                    {link.external && <ExternalLink size={9} className="text-white/30" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Reformasi */}
          <div>
            <h4 className="text-white text-sm mb-4" style={{ fontWeight: 700 }}>
              Reformasi Birokrasi
            </h4>
            <ul className="space-y-2">
              {links3.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-white/50 hover:text-[#F9C784] text-xs transition-colors flex items-center gap-1"
                  >
                    <span className="w-1 h-1 bg-[#9A2109] rounded-full flex-shrink-0" />
                    {link.label}
                    {link.external && <ExternalLink size={9} className="text-white/30" />}
                  </a>
                </li>
              ))}
            </ul>

            {/* WBK Badge */}
            <div className="mt-6 bg-white/5 rounded-xl p-3 border border-white/10">
              <p className="text-[#F9C784] text-xs" style={{ fontWeight: 700 }}>
                🏆 WBK 2024
              </p>
              <p className="text-white/40 text-[11px]">
                Wilayah Bebas dari Korupsi
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">
            © 2025 Pengadilan Negeri Purworejo. Hak Cipta Dilindungi.
          </p>
          <p className="text-white/30 text-xs">
            Mahkamah Agung Republik Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
