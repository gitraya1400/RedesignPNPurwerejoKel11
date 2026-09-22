import { useState, useEffect, useCallback } from "react";
import {
  Accessibility,
  X,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Volume2,
  VolumeX,
  Contrast,
  Eye,
  Link,
  Type,
  PauseCircle,
  BookOpen,
  HelpCircle,
  ChevronDown,
} from "lucide-react";

interface AccessibilitySettings {
  fontSize: 0 | 1 | 2 | 3 | 4;
  tts: boolean;
  highContrast: boolean;
  grayscale: boolean;
  highlightLinks: boolean;
  dyslexiaFont: boolean;
  stopAnimation: boolean;
  readingMask: boolean;
}

const defaultSettings: AccessibilitySettings = {
  fontSize: 0,
  tts: false,
  highContrast: false,
  grayscale: false,
  highlightLinks: false,
  dyslexiaFont: false,
  stopAnimation: false,
  readingMask: false,
};

const fontSizeLabels = ["A", "A+", "A++", "A+++", "A++++"];
const fontSizeValues = ["100%", "110%", "120%", "135%", "150%"];

function loadSettings(): AccessibilitySettings {
  try {
    const raw = localStorage.getItem("pn_a11y");
    if (raw) return { ...defaultSettings, ...JSON.parse(raw) };
  } catch {}
  return defaultSettings;
}

function saveSettings(s: AccessibilitySettings) {
  try {
    localStorage.setItem("pn_a11y", JSON.stringify(s));
  } catch {}
}

function applySettings(s: AccessibilitySettings) {
  const root = document.documentElement;
  // Font size
  root.style.fontSize = fontSizeValues[s.fontSize];
  // Filters
  const filters: string[] = [];
  if (s.grayscale) filters.push("grayscale(100%)");
  if (s.highContrast) filters.push("contrast(150%) brightness(0.95)");
  document.body.style.filter = filters.join(" ");
  // Highlight links
  if (s.highlightLinks) {
    document.body.classList.add("a11y-links");
  } else {
    document.body.classList.remove("a11y-links");
  }
  // Dyslexia font
  if (s.dyslexiaFont) {
    document.body.classList.add("a11y-dyslexia");
  } else {
    document.body.classList.remove("a11y-dyslexia");
  }
  // Stop animation
  if (s.stopAnimation) {
    document.body.classList.add("a11y-no-anim");
  } else {
    document.body.classList.remove("a11y-no-anim");
  }
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [settings, setSettings] = useState<AccessibilitySettings>(loadSettings);
  const [ttsActive, setTtsActive] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    applySettings(settings);
    saveSettings(settings);
  }, [settings]);

  // Reading mask
  const [maskY, setMaskY] = useState(0);
  useEffect(() => {
    if (!settings.readingMask) return;
    const handler = (e: MouseEvent) => setMaskY(e.clientY);
    window.addEventListener("mousemove", handler);
    return () => window.removeEventListener("mousemove", handler);
  }, [settings.readingMask]);

  const update = useCallback(
    (patch: Partial<AccessibilitySettings>) => {
      setSettings((prev) => ({ ...prev, ...patch }));
    },
    []
  );

  const reset = () => {
    setSettings(defaultSettings);
    window.speechSynthesis?.cancel();
    setTtsActive(false);
  };

  const toggleTTS = () => {
    if (!("speechSynthesis" in window)) return;
    if (ttsActive) {
      window.speechSynthesis.cancel();
      setTtsActive(false);
      update({ tts: false });
    } else {
      const utter = new SpeechSynthesisUtterance(
        document.body.innerText.slice(0, 500)
      );
      utter.lang = "id-ID";
      utter.onend = () => setTtsActive(false);
      window.speechSynthesis.speak(utter);
      setTtsActive(true);
      update({ tts: true });
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (!e.altKey) return;
      switch (e.key.toLowerCase()) {
        case "p":
          e.preventDefault();
          if (!ttsActive && "speechSynthesis" in window) {
            const utter = new SpeechSynthesisUtterance(
              document.body.innerText.slice(0, 500)
            );
            utter.lang = "id-ID";
            utter.onend = () => setTtsActive(false);
            window.speechSynthesis.speak(utter);
            setTtsActive(true);
            update({ tts: true });
          }
          break;
        case "e":
          e.preventDefault();
          if (ttsActive && window.speechSynthesis.speaking) {
            window.speechSynthesis.pause();
          }
          break;
        case "s":
          e.preventDefault();
          if (ttsActive) {
            window.speechSynthesis.cancel();
            setTtsActive(false);
            update({ tts: false });
          }
          break;
        case "o":
          e.preventDefault();
          update({ fontSize: Math.min(4, settings.fontSize + 1) as any });
          break;
        case "u":
          e.preventDefault();
          update({ fontSize: Math.max(0, settings.fontSize - 1) as any });
          break;
        case "r":
          e.preventDefault();
          update({ fontSize: 0 });
          break;
        case "h":
        case "j":
        case "k":
          e.preventDefault();
          update({ highContrast: !settings.highContrast });
          break;
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [settings.fontSize, settings.highContrast, ttsActive, update]);

  return (
    <>
      {/* CSS overrides injected globally */}
      <style>{`
        .a11y-links a { outline: 2px solid #9A2109 !important; background: #FFF8F7 !important; border-radius: 3px; padding: 0 2px; }
        .a11y-dyslexia { font-family: 'Comic Sans MS', 'Arial', sans-serif !important; letter-spacing: 0.05em; word-spacing: 0.1em; }
        .a11y-no-anim *, .a11y-no-anim *::before, .a11y-no-anim *::after { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
      `}</style>

      {/* Reading Mask Overlay */}
      {settings.readingMask && (
        <div
          className="fixed inset-0 z-[200] pointer-events-none"
          style={{
            background: `linear-gradient(
              to bottom,
              rgba(0,0,0,0.7) 0px,
              rgba(0,0,0,0.7) ${maskY - 28}px,
              transparent ${maskY - 28}px,
              transparent ${maskY + 28}px,
              rgba(0,0,0,0.7) ${maskY + 28}px,
              rgba(0,0,0,0.7) 100%
            )`,
          }}
        />
      )}

      {/* Slide-in Panel */}
      <div
        className={`fixed top-0 right-0 h-full z-[150] flex transition-transform duration-300 ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
        style={{ width: "300px" }}
      >
        <div className="w-full h-full bg-white shadow-2xl flex flex-col overflow-hidden">
          {/* Header */}
          <div
            className="flex items-center justify-between px-4 py-3.5 flex-shrink-0"
            style={{ backgroundColor: "#9A2109" }}
          >
            <div className="flex items-center gap-2">
              <button aria-label="Aksi"
                onClick={() => setOpen(false)}
                className="text-white/70 hover:text-white transition-colors"
              >
                <X size={18} />
              </button>
              <Accessibility size={18} className="text-white" />
              <span className="text-white text-sm" style={{ fontWeight: 700 }}>
                Fitur Aksesibilitas
              </span>
            </div>
            <button aria-label="Aksi"
              onClick={reset}
              className="flex items-center gap-1 text-white/70 hover:text-white text-sm transition-colors"
              style={{ fontWeight: 500 }}
            >
              <RotateCcw size={13} />
              Reset
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-4 space-y-5">
            {/* ── UKURAN TEKS ── */}
            <div>
              <p className="text-gray-600 text-sm tracking-widest mb-2.5" style={{ fontWeight: 700 }}>
                UKURAN TEKS
              </p>
              <div className="flex items-center gap-1.5">
                <button aria-label="Aksi"
                  onClick={() => update({ fontSize: Math.max(0, settings.fontSize - 1) as any })}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:border-[#9A2109] hover:text-[#9A2109] transition-colors"
                >
                  <ZoomOut size={15} />
                </button>
                {fontSizeLabels.map((lbl, i) => (
                  <button aria-label="Aksi"
                    key={lbl}
                    onClick={() => update({ fontSize: i as any })}
                    className={`flex-1 h-9 rounded-lg border text-sm transition-colors ${
                      settings.fontSize === i
                        ? "bg-[#9A2109] border-[#9A2109] text-white"
                        : "border-gray-200 text-gray-600 hover:border-[#9A2109] hover:text-[#9A2109]"
                    }`}
                    style={{ fontWeight: settings.fontSize === i ? 800 : 500 }}
                  >
                    {lbl}
                  </button>
                ))}
                <button aria-label="Aksi"
                  onClick={() => update({ fontSize: Math.min(4, settings.fontSize + 1) as any })}
                  className="w-9 h-9 rounded-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:border-[#9A2109] hover:text-[#9A2109] transition-colors"
                >
                  <ZoomIn size={15} />
                </button>
              </div>
            </div>

            {/* ── TEKS KE SUARA ── */}
            <div>
              <p className="text-gray-600 text-sm tracking-widest mb-2.5" style={{ fontWeight: 700 }}>
                TEKS KE SUARA
              </p>
              <button aria-label="Aksi"
                onClick={toggleTTS}
                className={`w-full h-11 rounded-xl border flex items-center justify-center gap-2 text-sm transition-colors ${
                  ttsActive
                    ? "bg-[#9A2109] border-[#9A2109] text-white"
                    : "border-gray-200 text-gray-600 hover:border-[#9A2109] hover:text-[#9A2109]"
                }`}
                style={{ fontWeight: 600 }}
              >
                {ttsActive ? (
                  <>
                    <VolumeX size={16} />
                    Hentikan TTS
                  </>
                ) : (
                  <>
                    <Volume2 size={16} />
                    Aktifkan TTS
                  </>
                )}
              </button>
            </div>

            {/* ── TAMPILAN & NAVIGASI ── */}
            <div>
              <p className="text-gray-600 text-sm tracking-widest mb-2.5" style={{ fontWeight: 700 }}>
                TAMPILAN & NAVIGASI
              </p>
              <div className="grid grid-cols-2 gap-2">
                {[
                  {
                    key: "highContrast" as const,
                    icon: Contrast,
                    label: "Kontras Tinggi",
                  },
                  {
                    key: "grayscale" as const,
                    icon: Eye,
                    label: "Skala Abu-abu",
                  },
                  {
                    key: "highlightLinks" as const,
                    icon: Link,
                    label: "Sorot Tautan",
                  },
                  {
                    key: "dyslexiaFont" as const,
                    icon: Type,
                    label: "Font Disleksia",
                  },
                  {
                    key: "stopAnimation" as const,
                    icon: PauseCircle,
                    label: "Hentikan Animasi",
                  },
                  {
                    key: "readingMask" as const,
                    icon: BookOpen,
                    label: "Masker Baca",
                  },
                ].map(({ key, icon: Icon, label }) => (
                  <button aria-label="Aksi"
                    key={key}
                    onClick={() => update({ [key]: !settings[key] })}
                    className={`flex flex-col items-center justify-center gap-1.5 h-20 rounded-xl border transition-colors ${
                      settings[key]
                        ? "bg-[#FFF1F1] border-[#9A2109] text-[#9A2109]"
                        : "border-gray-200 text-gray-700 hover:border-[#9A2109] hover:text-[#9A2109]"
                    }`}
                  >
                    <Icon size={22} />
                    <span className="text-sm text-center leading-tight" style={{ fontWeight: 600 }}>
                      {label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Panduan Penggunaan */}
          <div className="flex-shrink-0 border-t border-gray-100">
            <button aria-label="Aksi"
              onClick={() => setShowGuide(!showGuide)}
              className="w-full px-4 py-3 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-[#9A2109]" />
                <span className="text-sm text-gray-700" style={{ fontWeight: 600 }}>
                  Panduan Penggunaan
                </span>
              </div>
              <ChevronDown
                size={16}
                className={`text-gray-600 transition-transform ${showGuide ? "rotate-180" : ""}`}
              />
            </button>

            {showGuide && (
              <div className="px-4 pb-4 space-y-3 max-h-[300px] overflow-y-auto bg-gray-50">
                {/* Cara Penggunaan Screen Reader */}
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-2" style={{ fontWeight: 700 }}>
                    Cara Penggunaan Teks ke Suara (Screen Reader)
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Tandai atau blok teks atau kalimat yang ingin didengarkan dengan kursor. Kemudian klik tombol
                    <span className="text-[#9A2109] mx-1" style={{ fontWeight: 600 }}>Aktifkan TTS</span>
                    pada widget aksesibilitas. Tunggu beberapa saat hingga loading pembacaan pada sistem selesai.
                    Kemudian suara akan muncul lewat perangkat Anda.
                  </p>
                </div>

                {/* Tombol Pintas */}
                <div className="bg-white rounded-xl p-3 border border-gray-100">
                  <h3 className="text-sm text-gray-700 mb-2" style={{ fontWeight: 700 }}>
                    Tombol Pintas Keyboard
                  </h3>
                  <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                    Selain tombol pada widget, Anda dapat memanfaatkan tombol pintas pada keyboard.
                    Fungsi ini berjalan efektif di browser Chrome dan Mozilla Firefox.
                  </p>

                  <div className="space-y-2">
                    {[
                      { keys: "Alt + P", desc: "Memulai pembacaan teks oleh text-to-speech" },
                      { keys: "Alt + E", desc: "Menghentikan sementara pembacaan teks" },
                      { keys: "Alt + S", desc: "Menghentikan pembacaan teks" },
                      { keys: "Alt + O", desc: "Memperbesar ukuran font atau huruf" },
                      { keys: "Alt + U", desc: "Memperkecil ukuran font atau huruf" },
                      { keys: "Alt + R", desc: "Reset ke ukuran normal font atau huruf" },
                      { keys: "Alt + H / J / K", desc: "Mengganti warna kontras tinggi untuk mempermudah membaca" },
                    ].map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <kbd className="flex-shrink-0 px-2 py-1 rounded bg-gray-100 border border-gray-200 text-sm text-gray-700" style={{ fontWeight: 700, fontFamily: "monospace" }}>
                          {item.keys}
                        </kbd>
                        <span className="text-sm text-gray-600 leading-tight pt-0.5">
                          {item.desc}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Catatan */}
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
                  <p className="text-sm text-amber-800 leading-relaxed">
                    <span style={{ fontWeight: 700 }}>Catatan:</span> Pastikan browser Anda mengizinkan penggunaan
                    tombol pintas keyboard dan fitur text-to-speech untuk pengalaman aksesibilitas yang optimal.
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="flex-shrink-0 px-4 py-3 border-t border-gray-100">
            <p className="text-center text-gray-600 text-sm">
              Pengaturan tersimpan otomatis
            </p>
          </div>
        </div>
      </div>

      {/* Backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-[140] bg-black/30"
          style={{ backdropFilter: "blur(2px)" }}
          onClick={() => setOpen(false)}
        />
      )}

      {/* Trigger Button */}
      <button aria-label="Aksi"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setOpen(true)}
        title="Fitur Aksesibilitas"
        className={`flex items-center gap-2 bg-[#9A2109] text-white shadow-2xl transition-all duration-300 ${
          hovered ? "rounded-full px-4 py-3" : "rounded-full p-3.5"
        }`}
        style={{ boxShadow: "0 8px 30px rgba(154,33,9,0.4)" }}
      >
        <Accessibility size={20} />
        {hovered && (
          <span className="text-sm whitespace-nowrap" style={{ fontWeight: 600 }}>
            Aksesibilitas
          </span>
        )}
      </button>
    </>
  );
}
