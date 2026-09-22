import { useEffect, useRef, useState } from "react";

interface CircularProgressProps {
  value: number;
  size?: number;
  strokeWidth?: number;
  color: string;
  label: string;
  sublabel: string;
}

function CircularProgress({
  value,
  size = 140,
  strokeWidth = 10,
  color,
  label,
  sublabel,
}: CircularProgressProps) {
  const [animated, setAnimated] = useState(0);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (animated / 100) * circumference;

  useEffect(() => {
    const timer = setTimeout(() => {
      const step = value / 60;
      let current = 0;
      const interval = setInterval(() => {
        current = Math.min(current + step, value);
        setAnimated(current);
        if (current >= value) clearInterval(interval);
      }, 16);
      return () => clearInterval(interval);
    }, 300);
    return () => clearTimeout(timer);
  }, [value]);

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: size, height: size }}>
        <svg aria-hidden="true" width={size} height={size} className="-rotate-90">
          {/* Track */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke="rgba(255,255,255,0.1)"
            strokeWidth={strokeWidth}
          />
          {/* Progress */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.05s linear" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span
            className="leading-none"
            style={{ color, fontSize: "1.75rem", fontWeight: 900 }}
          >
            {animated.toFixed(1)}%
          </span>
          <span className="text-white/50 text-sm mt-1">Skor</span>
        </div>
      </div>
      <div className="text-center">
        <p className="text-white" style={{ fontWeight: 700 }}>
          {label}
        </p>
        <p className="text-white/50 text-sm mt-0.5">{sublabel}</p>
      </div>
    </div>
  );
}

const stats = [
  { label: "Total Responden", value: "1.247", unit: "orang" },
  { label: "Perkara Diselesaikan", value: "3.842", unit: "perkara" },
  { label: "Tahun Survey", value: "2024", unit: "" },
  { label: "Kategori Nilai", value: "A", unit: "(Sangat Baik)" },
];

export function IkmDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      className="py-16"
      style={{ backgroundColor: "#0F172A" }}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center gap-2 bg-white/10 text-[#F9C784] text-sm px-4 py-1.5 rounded-full mb-4 border border-white/10">
            Data Terverifikasi Mahkamah Agung RI
          </span>
          <h2
            className="text-white mb-2"
            style={{ fontSize: "1.75rem", fontWeight: 800 }}
          >
            Dashboard Kinerja & Integritas
          </h2>
          <p className="text-white/50 text-sm max-w-md mx-auto">
            Hasil survei kepuasan masyarakat dan persepsi anti-korupsi Pengadilan Negeri Purworejo
          </p>
        </div>

        {/* Charts */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 md:gap-20 mb-12">
          {visible && (
            <>
              <CircularProgress
                value={99.93}
                color="#F9C784"
                label="Indeks Kepuasan Masyarakat"
                sublabel="IKM — Survey 2024"
              />
              <div className="hidden md:block w-px h-32 bg-white/10" />
              <CircularProgress
                value={100}
                color="#86EFAC"
                label="Indeks Persepsi Anti Korupsi"
                sublabel="IPAK — Survey 2024"
              />
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl p-5 text-center border border-white/10"
              style={{ backgroundColor: "rgba(255,255,255,0.05)" }}
            >
              <p
                className="text-white leading-none"
                style={{ fontSize: "1.75rem", fontWeight: 900 }}
              >
                {stat.value}
              </p>
              {stat.unit && (
                <p className="text-white/40 text-sm mt-0.5">{stat.unit}</p>
              )}
              <p className="text-white/60 text-sm mt-2" style={{ fontWeight: 500 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <p className="text-center text-white/30 text-sm mt-8">
          Data bersumber dari survei resmi Mahkamah Agung Republik Indonesia. Diperbarui setiap tahun.
        </p>
      </div>
    </section>
  );
}
