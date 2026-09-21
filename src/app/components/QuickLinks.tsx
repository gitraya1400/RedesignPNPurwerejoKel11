import {
  Monitor,
  FileText,
  Scale,
  Search,
  BookOpen,
  DollarSign,
  Shield,
  Award,
  Users,
  Phone,
  FileCheck,
  Map,
} from "lucide-react";

const services = [
  { label: "e-Court", icon: Monitor, color: "#3B82F6", bg: "#EFF6FF", external: true },
  { label: "SIPP Online", icon: Search, color: "#8B5CF6", bg: "#F5F3FF", external: true },
  { label: "Eraterang", icon: FileCheck, color: "#EC4899", bg: "#FDF2F8", external: true },
  { label: "Jadwal Sidang", icon: BookOpen, color: "#10B981", bg: "#ECFDF5", external: false },
  { label: "Biaya Perkara", icon: DollarSign, color: "#F59E0B", bg: "#FFFBEB", external: false },
  { label: "Direktori Putusan", icon: FileText, color: "#6366F1", bg: "#EEF2FF", external: true },
  { label: "Bantuan Hukum", icon: Scale, color: "#9A2109", bg: "#FFF1F1", external: false },
  { label: "Zona Integritas", icon: Shield, color: "#0EA5E9", bg: "#F0F9FF", external: false },
  { label: "SAKIP", icon: Award, color: "#D97706", bg: "#FEFCE8", external: false },
  { label: "Mediasi", icon: Users, color: "#059669", bg: "#ECFDF5", external: false },
  { label: "Hubungi Kami", icon: Phone, color: "#7C3AED", bg: "#F5F3FF", external: false },
  { label: "Wilayah Hukum", icon: Map, color: "#DC2626", bg: "#FFF1F1", external: false },
];

interface QuickLinksProps {
  onExternalLink: (url: string, label: string) => void;
}

export function QuickLinks({ onExternalLink }: QuickLinksProps) {
  return (
    <section className="bg-[#F9FAFB] py-14">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-1 h-7 bg-[#9A2109] rounded-full" />
          <h2
            className="text-gray-800"
            style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.05em" }}
          >
            AKSES CEPAT
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-6 gap-3">
          {services.map((svc) => {
            const Icon = svc.icon;
            return (
              <button
                key={svc.label}
                onClick={() =>
                  svc.external ? onExternalLink("#", svc.label) : undefined
                }
                className="group bg-white rounded-xl border border-gray-200 p-4 flex flex-col items-center gap-2.5 cursor-pointer transition-all duration-200 hover:-translate-y-1.5 hover:shadow-lg hover:border-transparent"
                style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: svc.bg }}
                >
                  <Icon size={22} style={{ color: svc.color }} />
                </div>
                <span
                  className="text-gray-800 text-center leading-tight"
                  style={{ fontSize: "0.72rem", fontWeight: 600 }}
                >
                  {svc.label}
                </span>
                {svc.external && (
                  <span
                    className="text-[10px] text-gray-600 group-hover:text-[#9A2109] transition-colors"
                  >
                    ↗ Eksternal
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
