import { useLocation, Link } from "react-router";
import { Construction } from "lucide-react";

export function ComingSoonPage() {
  const { pathname } = useLocation();
  const label = pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()))
    .join(" › ");

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4 pt-24 pb-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 max-w-md w-full p-10 text-center">
        <div className="w-16 h-16 rounded-full bg-[#FFF1F1] flex items-center justify-center mx-auto mb-6">
          <Construction size={32} className="text-[#9A2109]" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Segera Hadir</h1>
        {label && (
          <p className="text-sm text-[#9A2109] font-medium mb-4">{label}</p>
        )}
        <p className="text-gray-500 text-sm mb-8">
          Halaman ini sedang dalam pengembangan. Silakan kembali beberapa saat lagi.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-[#9A2109] text-white text-sm font-semibold px-6 py-2.5 rounded-lg hover:bg-[#7B1A07] transition-colors"
        >
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  );
}
