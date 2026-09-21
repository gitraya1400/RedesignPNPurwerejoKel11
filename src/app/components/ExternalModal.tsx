import { useState, useEffect } from "react";
import { AlertTriangle, ExternalLink, X, Link as LinkIcon } from "lucide-react";

const systemUrls: Record<string, string> = {
  "e-Court": "https://ecourt.mahkamahagung.go.id",
  SIPP: "https://sipp.mahkamahagung.go.id",
  Eraterang: "https://eraterang.mahkamahagung.go.id",
  "Direktori Putusan": "https://putusan3.mahkamahagung.go.id",
  LPSE: "https://lpse.mahkamahagung.go.id",
  default: "https://www.mahkamahagung.go.id",
};

function getUrl(label: string) {
  return systemUrls[label] ?? systemUrls.default;
}

function getSkipKey(label: string) {
  return `pn_skip_ext_${label.toLowerCase().replace(/\s+/g, "_")}`;
}

interface ExternalModalProps {
  open: boolean;
  label: string;
  onClose: () => void;
  onConfirm: () => void;
}

export function ExternalModal({ open, label, onClose, onConfirm }: ExternalModalProps) {
  const [dontShow, setDontShow] = useState(false);
  const [animIn, setAnimIn] = useState(false);

  useEffect(() => {
    if (open) {
      // Check if user previously said "don't show again"
      const skip = localStorage.getItem(getSkipKey(label)) === "1";
      if (skip) {
        onConfirm();
        return;
      }
      setDontShow(false);
      setTimeout(() => setAnimIn(true), 10);
    } else {
      setAnimIn(false);
    }
  }, [open, label]);

  if (!open) return null;

  const displayUrl = getUrl(label);

  const handleConfirm = () => {
    if (dontShow) {
      localStorage.setItem(getSkipKey(label), "1");
    }
    onConfirm();
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{
        backgroundColor: "rgba(15,23,42,0.55)",
        backdropFilter: "blur(5px)",
      }}
      onClick={onClose}
    >
      <div
        className={`bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative transition-all duration-300 ${
          animIn ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-600 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Warning Icon */}
        <div className="mb-4">
          <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center">
            <AlertTriangle size={24} className="text-[#9A2109]" style={{ strokeWidth: 2 }} />
          </div>
        </div>

        {/* Title */}
        <h3
          className="text-gray-900 mb-2"
          style={{ fontWeight: 800, fontSize: "1.2rem" }}
        >
          Meninggalkan Website Ini
        </h3>
        <p className="text-gray-700 text-sm mb-5" style={{ lineHeight: 1.6 }}>
          Anda akan diarahkan ke sistem eksternal. Pastikan Anda mengakses dari jaringan yang aman.
        </p>

        {/* Destination Card */}
        <div className="border border-gray-200 rounded-xl p-4 mb-5 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-gray-900 text-sm" style={{ fontWeight: 700 }}>
              {label} — Mahkamah Agung RI
            </p>
            <div className="flex items-center gap-1 mt-1">
              <LinkIcon size={11} className="text-gray-600 flex-shrink-0" />
              <span className="text-gray-600 text-xs truncate">{displayUrl}</span>
            </div>
          </div>
          <span
            className="flex-shrink-0 text-[11px] px-2.5 py-1 rounded-full"
            style={{
              backgroundColor: "#D1FAE5",
              color: "#065F46",
              fontWeight: 700,
            }}
          >
            Sistem Resmi
          </span>
        </div>

        {/* Don't show again */}
        <label className="flex items-center gap-2.5 mb-6 cursor-pointer select-none">
          <div
            className={`w-4 h-4 rounded border-2 flex items-center justify-center flex-shrink-0 transition-colors ${
              dontShow ? "bg-[#9A2109] border-[#9A2109]" : "border-gray-300"
            }`}
            onClick={() => setDontShow(!dontShow)}
          >
            {dontShow && (
              <svg aria-hidden="true" width="9" height="7" viewBox="0 0 9 7" fill="none">
                <path d="M1 3.5L3.5 6L8 1" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
          <span className="text-gray-700 text-sm">
            Jangan tampilkan lagi untuk sistem ini
          </span>
        </label>

        {/* Buttons */}
        <div className="space-y-2.5">
          <button
            onClick={handleConfirm}
            className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl hover:bg-[#7B1A07] transition-colors"
            style={{
              backgroundColor: "#9A2109",
              fontWeight: 700,
              fontSize: "0.95rem",
            }}
          >
            Buka Sistem Eksternal
            <ExternalLink size={16} />
          </button>
          <button
            onClick={onClose}
            className="w-full border border-gray-200 text-gray-600 py-3.5 rounded-xl text-sm hover:bg-gray-50 transition-colors"
            style={{ fontWeight: 600 }}
          >
            Tetap di Website
          </button>
        </div>
      </div>
    </div>
  );
}
