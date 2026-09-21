import { useState } from "react";
import { Clock, MapPin, ExternalLink, Users } from "lucide-react";

const categories = ["Semua", "Perdata", "Pidana", "PHI", "Tipikor"];

const hearings = [
  {
    id: 1,
    caseNumber: "32/Pdt.G/2025/PN.Pwr",
    room: "Ruang I",
    time: "08:30",
    type: "Perdata",
    plaintiff: "PT. Sumber Makmur",
    defendant: "CV. Karya Jaya",
    agenda: "Pemeriksaan Saksi",
  },
  {
    id: 2,
    caseNumber: "45/Pid.B/2025/PN.Pwr",
    room: "Ruang II",
    time: "09:00",
    type: "Pidana",
    plaintiff: "JPU",
    defendant: "Ahmad Santoso",
    agenda: "Pembacaan Dakwaan",
  },
  {
    id: 3,
    caseNumber: "12/Pdt.G/2025/PN.Pwr",
    room: "Ruang III",
    time: "09:30",
    type: "Perdata",
    plaintiff: "Bambang Wijaya",
    defendant: "Siti Rahayu",
    agenda: "Mediasi",
  },
  {
    id: 4,
    caseNumber: "67/Pid.Sus/2025/PN.Pwr",
    room: "Ruang I",
    time: "10:00",
    type: "Tipikor",
    plaintiff: "JPU KPK",
    defendant: "Drs. Hendra Kusuma",
    agenda: "Tuntutan",
  },
  {
    id: 5,
    caseNumber: "23/PHI/2025/PN.Pwr",
    room: "Ruang IV",
    time: "10:30",
    type: "PHI",
    plaintiff: "Serikat Pekerja XYZ",
    defendant: "PT. Maju Bersama",
    agenda: "Pembuktian",
  },
  {
    id: 6,
    caseNumber: "89/Pid.B/2025/PN.Pwr",
    room: "Ruang II",
    time: "13:00",
    type: "Pidana",
    plaintiff: "JPU",
    defendant: "Rudi Hartono",
    agenda: "Pledoi",
  },
];

const typeColors: Record<string, { bg: string; text: string }> = {
  Perdata: { bg: "#EFF6FF", text: "#2563EB" },
  Pidana: { bg: "#FFF1F1", text: "#DC2626" },
  PHI: { bg: "#F0FDF4", text: "#16A34A" },
  Tipikor: { bg: "#FEF9C3", text: "#CA8A04" },
};

interface JadwalSidangProps {
  onExternalLink: (url: string, label: string) => void;
}

export function JadwalSidang({ onExternalLink }: JadwalSidangProps) {
  const [activeTab, setActiveTab] = useState("Semua");

  const filtered =
    activeTab === "Semua"
      ? hearings
      : hearings.filter((h) => h.type === activeTab);

  const today = new Date().toLocaleDateString("id-ID", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <section id="jadwal-sidang-section" className="bg-white py-14">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-1 h-7 bg-[#9A2109] rounded-full" />
              <h2
                className="text-gray-800"
                style={{ fontSize: "1.35rem", fontWeight: 800, letterSpacing: "0.05em" }}
              >
                JADWAL SIDANG
              </h2>
            </div>
            <p className="text-gray-500 text-sm pl-4">{today}</p>
          </div>
          <button
            onClick={() => onExternalLink("#", "SIPP")}
            className="inline-flex items-center gap-2 text-[#9A2109] text-sm border border-[#9A2109] rounded-full px-4 py-2 hover:bg-[#9A2109] hover:text-white transition-colors self-start"
            style={{ fontWeight: 600 }}
          >
            <ExternalLink size={14} />
            Lihat di SIPP
          </button>
        </div>

        {/* Category Tabs */}
        <div className="flex items-center gap-2 flex-wrap mb-6">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-4 py-1.5 rounded-full text-sm transition-all duration-200 ${
                activeTab === cat
                  ? "bg-[#9A2109] text-white shadow-md"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
              style={{ fontWeight: activeTab === cat ? 700 : 500 }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Hearing Cards */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 gap-3">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center">
              <Users size={28} className="text-gray-300" />
            </div>
            <p className="text-gray-400 text-sm">Belum Ada Jadwal Sidang</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {filtered.map((hearing) => {
              const tc = typeColors[hearing.type] || { bg: "#F3F4F6", text: "#6B7280" };
              return (
                <div
                  key={hearing.id}
                  className="bg-white border border-gray-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center gap-4 hover:border-[#9A2109]/20 hover:shadow-sm transition-all duration-200"
                  style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                >
                  {/* Room Badge */}
                  <div className="flex-shrink-0 w-20 h-14 bg-[#9A2109] rounded-xl flex flex-col items-center justify-center">
                    <span className="text-white/70 text-[10px]">Ruang</span>
                    <span className="text-white text-lg leading-none" style={{ fontWeight: 800 }}>
                      {hearing.room.split(" ")[1]}
                    </span>
                  </div>

                  {/* Case Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1 flex-wrap">
                      <span
                        className="text-gray-800"
                        style={{ fontWeight: 700, fontSize: "0.9rem" }}
                      >
                        {hearing.caseNumber}
                      </span>
                      <span
                        className="text-xs px-2 py-0.5 rounded-full"
                        style={{ backgroundColor: tc.bg, color: tc.text, fontWeight: 600 }}
                      >
                        {hearing.type}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm truncate">
                      <span style={{ fontWeight: 600 }}>{hearing.plaintiff}</span>
                      <span className="text-gray-400 mx-2">vs</span>
                      <span style={{ fontWeight: 600 }}>{hearing.defendant}</span>
                    </p>
                    <p className="text-gray-400 text-xs mt-0.5">{hearing.agenda}</p>
                  </div>

                  {/* Time + Room */}
                  <div className="flex flex-row sm:flex-col items-center sm:items-end gap-3 sm:gap-1 flex-shrink-0">
                    <div className="flex items-center gap-1 text-[#9A2109]">
                      <Clock size={13} />
                      <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>
                        {hearing.time}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MapPin size={11} />
                      <span className="text-xs">{hearing.room}</span>
                    </div>
                    <button
                      onClick={() => onExternalLink("#", "SIPP")}
                      className="hidden sm:flex items-center gap-1 text-xs text-[#9A2109] hover:underline"
                      style={{ fontWeight: 600 }}
                    >
                      SIPP <ExternalLink size={10} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
