import { useState, useEffect } from "react";
import { Headphones, X, MessageCircle, Phone, Mail, ChevronRight, ArrowUp } from "lucide-react";
import { AccessibilityWidget } from "./AccessibilityWidget";

const helpOptions = [
  {
    icon: MessageCircle,
    title: "Chat Langsung",
    desc: "Senin–Jumat, 08:00–16:00",
    color: "#10B981",
  },
  {
    icon: Phone,
    title: "Telepon",
    desc: "(0275) 321021",
    color: "#3B82F6",
  },
  {
    icon: Mail,
    title: "Email",
    desc: "delegasi@pn-purworejo.go.id",
    color: "#8B5CF6",
  },
];

export function FloatingHelp() {
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Panel */}
      {open && (
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-100 w-72 overflow-hidden">
          <div className="bg-[#9A2109] px-4 py-3.5 flex items-center justify-between">
            <div>
              <p className="text-white text-sm" style={{ fontWeight: 700 }}>Bantuan & Dukungan</p>
              <p className="text-white/70 text-xs">Kami siap membantu Anda</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/70 hover:text-white transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          <div className="p-3 space-y-2">
            {helpOptions.map((opt) => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.title}
                  className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-colors group text-left"
                >
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: opt.color + "20" }}
                  >
                    <Icon size={16} style={{ color: opt.color }} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-gray-800 text-sm" style={{ fontWeight: 600 }}>
                      {opt.title}
                    </p>
                    <p className="text-gray-400 text-xs truncate">{opt.desc}</p>
                  </div>
                  <ChevronRight size={14} className="text-gray-300 group-hover:text-gray-500 transition-colors flex-shrink-0" />
                </button>
              );
            })}
          </div>

          <div className="px-4 pb-4">
            <a
              href="#"
              className="block w-full text-center bg-[#9A2109] text-white text-sm py-2.5 rounded-xl hover:bg-[#7B1A07] transition-colors"
              style={{ fontWeight: 700 }}
            >
              Lihat Panduan Lengkap →
            </a>
          </div>
        </div>
      )}

      {/* Back to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Kembali ke atas"
        className="transition-all duration-300 rounded-full p-3.5 text-white shadow-2xl hover:scale-110 hover:shadow-xl"
        style={{
          backgroundColor: "#9A2109",
          boxShadow: "0 8px 30px rgba(154,33,9,0.4)",
          opacity: scrolled ? 1 : 0,
          pointerEvents: scrolled ? "auto" : "none",
          transform: scrolled ? "translateY(0)" : "translateY(10px)",
        }}
      >
        <ArrowUp size={20} />
      </button>

      {/* Help Trigger Button */}
      <button
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(!open)}
        className={`flex items-center gap-2 bg-[#9A2109] text-white shadow-2xl transition-all duration-300 ${
          hovered || open ? "rounded-full px-4 py-3" : "rounded-full p-3.5"
        }`}
        style={{ boxShadow: "0 8px 30px rgba(154,33,9,0.4)" }}
      >
        {open ? (
          <X size={20} />
        ) : (
          <Headphones size={20} />
        )}
        {(hovered || open) && !open && (
          <span className="text-sm whitespace-nowrap" style={{ fontWeight: 600 }}>
            Butuh Bantuan?
          </span>
        )}
      </button>

      {/* Accessibility Widget */}
      <AccessibilityWidget />
    </div>
  );
}
