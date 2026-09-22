import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  ChevronRight, Shield, Clock, AlertCircle, CheckCircle2,
  Upload, X, Send, Trash2, Copy, Download, Info, Phone,
  FileText, User, Mail, MessageSquare
} from "lucide-react";

type FieldState = "idle" | "valid" | "error";

function FormInput({
  label, placeholder, type = "text", value, onChange, state, errorMsg, helperMsg, maxLength, required
}: {
  label: string; placeholder?: string; type?: string; value: string;
  onChange: (v: string) => void; state?: FieldState; errorMsg?: string;
  helperMsg?: string; maxLength?: number; required?: boolean;
}) {
  const borderClass =
    state === "valid" ? "border-[#16A34A] ring-2 ring-[#16A34A]/10" :
    state === "error" ? "border-[#DC2626] ring-2 ring-[#DC2626]/10" :
    "border-[#E2E8F0] focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10";

  return (
    <div>
      <label className="block text-sm font-semibold text-[#334155] mb-1.5">
        {label} {required && <span className="text-[#DC2626]">*</span>}
      </label>
      <div className="relative">
        <input aria-label="Input"
          type={type}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          maxLength={maxLength}
          className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-[#F8FAFC] text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition-all ${borderClass}`}
        />
        {state === "valid" && (
          <CheckCircle2 size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#16A34A]" />
        )}
        {state === "error" && (
          <AlertCircle size={15} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#DC2626]" />
        )}
      </div>
      {state === "error" && errorMsg && (
        <p className="text-sm text-[#DC2626] mt-1 flex items-center gap-1"><AlertCircle size={11} />{errorMsg}</p>
      )}
      {helperMsg && state !== "error" && (
        <p className="text-sm text-[#64748B] mt-1">{helperMsg}</p>
      )}
    </div>
  );
}

export function FormPPIDPage() {
  const [kategori, setKategori] = useState<"individu" | "badan">("individu");
  const [nik, setNik] = useState("");
  const [namaLengkap, setNamaLengkap] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [rincian, setRincian] = useState("");
  const [tujuan, setTujuan] = useState("");
  const [cara, setCara] = useState("Salinan Digital (Email / Unduh via Web)");
  const [agreed, setAgreed] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [showReset, setShowReset] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const ticketNo = "PPID-PWR-2026-0089";

  const nikState: FieldState = nik.length === 0 ? "idle" : nik.length === 16 && /^\d+$/.test(nik) ? "valid" : "error";
  const emailState: FieldState = email.length === 0 ? "idle" : /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "valid" : "error";
  const waState: FieldState = whatsapp.length === 0 ? "idle" : whatsapp.length >= 10 ? "valid" : "error";

  const handleSubmit = () => {
    if (!agreed || nikState !== "valid" || emailState !== "valid" || !namaLengkap || !rincian) return;
    setShowSuccess(true);
  };

  const handleReset = () => {
    setNik(""); setNamaLengkap(""); setEmail(""); setWhatsapp("");
    setRincian(""); setTujuan(""); setCara("Salinan Digital (Email / Unduh via Web)");
    setAgreed(false); setFileName(null); setShowReset(false);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(ticketNo).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const canSubmit = agreed && nikState === "valid" && emailState === "valid" && namaLengkap.trim() && rincian.trim();

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Header */}
      <div className="bg-white border-b border-[#E2E8F0]">
        <div className="max-w-[1440px] mx-auto px-8 pt-24 pb-6">
          <nav className="flex items-center gap-1.5 text-sm text-[#64748B] mb-5">
            <Link to="/" className="hover:text-[#9A2109] transition-colors">Beranda</Link>
            <ChevronRight size={12} />
            <span className="hover:text-[#9A2109] cursor-pointer transition-colors">Formulir Layanan</span>
            <ChevronRight size={12} />
            <span className="text-[#9A2109] font-semibold">Permohonan Informasi PPID</span>
          </nav>

          <h1 className="text-2xl font-bold text-[#1E293B] mb-1">Formulir Permohonan Informasi Publik (PPID)</h1>
          <p className="text-sm text-[#64748B]">Pengadilan Negeri Purworejo Kelas IB</p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* SLA Banner */}
        <div className="bg-[#EFF6FF] border border-[#BFDBFE] rounded-2xl p-4 flex gap-4 items-start mb-8">
          <div className="w-10 h-10 rounded-xl bg-[#DBEAFE] flex items-center justify-center flex-shrink-0">
            <Shield size={18} className="text-[#1D4ED8]" />
          </div>
          <div>
            <p className="text-sm font-bold text-[#1D4ED8] uppercase tracking-wide mb-0.5">Jaminan SLA & Keamanan Data</p>
            <p className="text-sm text-[#1E40AF] leading-relaxed">
              Sesuai <strong>SK KMA No. 1-144/KMA/SK/I/2011</strong>, permohonan informasi Anda akan diproses maksimal dalam{" "}
              <strong>10 (sepuluh) hari kerja</strong>. Formulir ini terenkripsi dan resmi dicatat pada register PPID PN Purworejo.
            </p>
          </div>
          <div className="flex items-center gap-1.5 text-sm text-[#1D4ED8] font-semibold bg-white border border-[#BFDBFE] px-3 py-1.5 rounded-full flex-shrink-0">
            <Clock size={12} />
            10 Hari Kerja
          </div>
        </div>

        {/* Two-column layout */}
        <div className="grid grid-cols-[1fr_340px] gap-8 items-start">
          {/* LEFT: Form */}
          <div className="space-y-6">
            {/* Section 1 */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-7 py-5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#9A2109] text-white text-sm font-bold flex items-center justify-center">1</div>
                <div>
                  <h2 className="text-sm font-bold text-[#1E293B]">Data Diri Pemohon</h2>
                  <p className="text-sm text-[#64748B]">Isi dengan data sesuai identitas resmi</p>
                </div>
              </div>
              <div className="px-7 py-6 space-y-5">
                {/* Kategori radio */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-2">
                    Kategori Pemohon <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="flex gap-4">
                    {[
                      { val: "individu" as const, label: "Perorangan / Individu" },
                      { val: "badan" as const, label: "Badan Hukum / Lembaga LSM" },
                    ].map(({ val, label }) => (
                      <label
                        key={val}
                        className={`flex items-center gap-2.5 cursor-pointer px-4 py-2.5 rounded-xl border transition-all ${
                          kategori === val
                            ? "border-[#9A2109] bg-[#FFF1F1] text-[#9A2109]"
                            : "border-[#E2E8F0] bg-[#F8FAFC] text-[#475569] hover:border-[#9A2109]"
                        }`}
                      >
                        <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all ${
                          kategori === val ? "border-[#9A2109]" : "border-[#CBD5E1]"
                        }`}>
                          {kategori === val && <div className="w-2 h-2 rounded-full bg-[#9A2109]" />}
                        </div>
                        <span className="text-sm font-medium">{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <FormInput
                  label="Nomor Induk Kependudukan (NIK KTP)"
                  placeholder="Masukkan 16 digit NIK KTP Anda"
                  value={nik}
                  onChange={setNik}
                  state={nikState}
                  errorMsg="NIK harus 16 digit angka"
                  maxLength={16}
                  required
                />

                <FormInput
                  label="Nama Lengkap Sesuai KTP"
                  placeholder="Cth: Bambang Wicaksono"
                  value={namaLengkap}
                  onChange={setNamaLengkap}
                  state={namaLengkap.length > 2 ? "valid" : namaLengkap.length > 0 ? "error" : "idle"}
                  errorMsg="Nama terlalu pendek"
                  required
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormInput
                    label="Alamat Email Aktif"
                    type="email"
                    placeholder="contoh@email.com"
                    value={email}
                    onChange={setEmail}
                    state={emailState}
                    errorMsg="Format email tidak valid"
                    required
                  />
                  <FormInput
                    label="Nomor WhatsApp (Aktif)"
                    type="tel"
                    placeholder="cth: 08123456789"
                    value={whatsapp}
                    onChange={setWhatsapp}
                    state={waState}
                    errorMsg="Nomor terlalu pendek"
                    helperMsg="Nomor tiket akan dikirimkan ke kontak ini"
                    required
                  />
                </div>
                {(emailState === "valid" || waState === "valid") && (
                  <p className="text-sm text-[#64748B] flex items-center gap-1.5 -mt-2">
                    <Info size={11} className="text-[#94A3B8]" />
                    Nomor tiket dan perkembangan permohonan akan dikirimkan ke kontak ini.
                  </p>
                )}

                {/* Upload KTP */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">
                    Upload Foto/Scan KTP <span className="text-[#DC2626]">*</span>
                  </label>
                  <input aria-label="Input"
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.jpg,.jpeg,.png"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? null)}
                  />
                  {fileName ? (
                    <div className="flex items-center gap-3 px-4 py-3 bg-[#F0FDF4] border border-[#86EFAC] rounded-xl">
                      <CheckCircle2 size={16} className="text-[#16A34A] flex-shrink-0" />
                      <span className="text-sm text-[#15803D] font-medium flex-1 truncate">{fileName}</span>
                      <button aria-label="Aksi" onClick={() => setFileName(null)} className="text-[#94A3B8] hover:text-[#DC2626] transition-colors">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <div
                      onClick={() => fileRef.current?.click()}
                      className="border-2 border-dashed border-[#E2E8F0] hover:border-[#9A2109] rounded-xl p-6 flex flex-col items-center gap-2 cursor-pointer transition-all group bg-[#F8FAFC] hover:bg-[#FFF8F7]"
                    >
                      <div className="w-10 h-10 rounded-full bg-[#F1F5F9] group-hover:bg-[#FFF1F1] flex items-center justify-center transition-colors">
                        <Upload size={18} className="text-[#94A3B8] group-hover:text-[#9A2109] transition-colors" />
                      </div>
                      <p className="text-sm font-medium text-[#475569] group-hover:text-[#9A2109] transition-colors">
                        Klik atau seret file ke sini
                      </p>
                      <p className="text-sm text-[#94A3B8]">Format PDF, JPG, PNG (Maks 2MB)</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Section 2 */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)] overflow-hidden">
              <div className="px-7 py-5 bg-[#F8FAFC] border-b border-[#E2E8F0] flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#9A2109] text-white text-sm font-bold flex items-center justify-center">2</div>
                <div>
                  <h2 className="text-sm font-bold text-[#1E293B]">Informasi yang Diminta</h2>
                  <p className="text-sm text-[#64748B]">Jelaskan secara spesifik informasi yang dibutuhkan</p>
                </div>
              </div>
              <div className="px-7 py-6 space-y-5">
                {/* Rincian */}
                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">
                    Rincian Informasi yang Dibutuhkan <span className="text-[#DC2626]">*</span>
                  </label>
                  <textarea
                    value={rincian}
                    onChange={(e) => rincian.length <= 500 && setRincian(e.target.value)}
                    placeholder="Tuliskan dengan jelas informasi apa yang Anda butuhkan dari Pengadilan Negeri Purworejo..."
                    rows={5}
                    maxLength={500}
                    className={`w-full px-3.5 py-2.5 text-sm border rounded-xl bg-[#F8FAFC] text-[#1E293B] placeholder:text-[#94A3B8] outline-none transition-all resize-none ${
                      rincian.length > 0 ? "border-[#9A2109] ring-2 ring-[#9A2109]/10" : "border-[#E2E8F0] focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10"
                    }`}
                  />
                  <div className="flex justify-end mt-1">
                    <span className={`text-sm ${rincian.length > 450 ? "text-[#DC2626]" : "text-[#94A3B8]"}`}>
                      {rincian.length}/500 karakter
                    </span>
                  </div>
                </div>

                <FormInput
                  label="Tujuan Penggunaan Informasi"
                  placeholder="Cth: Penelitian akademis / kelengkapan berkas perkara / dsb."
                  value={tujuan}
                  onChange={setTujuan}
                  state="idle"
                  required
                />

                <div>
                  <label className="block text-sm font-semibold text-[#334155] mb-1.5">
                    Cara Memperoleh Informasi <span className="text-[#DC2626]">*</span>
                  </label>
                  <div className="relative">
                    <select
                      value={cara}
                      onChange={(e) => setCara(e.target.value)}
                      className="w-full appearance-none px-3.5 py-2.5 text-sm border border-[#E2E8F0] rounded-xl bg-[#F8FAFC] focus:outline-none focus:border-[#9A2109] focus:ring-2 focus:ring-[#9A2109]/10 text-[#1E293B] transition-all"
                    >
                      {[
                        "Melihat Langsung di Meja Informasi PTSP",
                        "Salinan Cetak (Fotokopi)",
                        "Salinan Digital (Email / Unduh via Web)",
                      ].map((o) => <option key={o}>{o}</option>)}
                    </select>
                    <ChevronRight size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] pointer-events-none rotate-90" />
                  </div>
                </div>

                {/* Checkbox */}
                <div
                  className={`flex gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                    agreed ? "border-[#9A2109] bg-[#FFF1F1]" : "border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#9A2109]"
                  }`}
                  onClick={() => setAgreed(!agreed)}
                >
                  <div className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${
                    agreed ? "border-[#9A2109] bg-[#9A2109]" : "border-[#CBD5E1]"
                  }`}>
                    {agreed && <CheckCircle2 size={12} className="text-white" />}
                  </div>
                  <p className="text-sm text-[#475569] leading-relaxed">
                    Saya menyatakan bahwa data yang saya berikan adalah <strong className="text-[#1E293B]">benar</strong> dan informasi yang diminta tidak akan disalahgunakan untuk melanggar hukum.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 flex items-center justify-between shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <button aria-label="Aksi"
                onClick={() => setShowReset(true)}
                className="flex items-center gap-2 text-sm text-[#DC2626] hover:text-[#B91C1C] font-medium transition-colors"
              >
                <Trash2 size={15} />
                Kosongkan Formulir
              </button>
              <button aria-label="Aksi"
                onClick={handleSubmit}
                disabled={!canSubmit}
                className={`flex items-center gap-2 px-8 py-3 rounded-full text-sm font-bold transition-all ${
                  canSubmit
                    ? "bg-[#9A2109] hover:bg-[#7A1A07] text-white shadow-md hover:shadow-lg"
                    : "bg-[#E2E8F0] text-[#94A3B8] cursor-not-allowed"
                }`}
              >
                <Send size={15} />
                Kirim Permohonan Informasi
              </button>
            </div>
          </div>

          {/* RIGHT: Sticky Guide */}
          <div className="sticky top-24 space-y-5">
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-6 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <div className="flex items-center gap-2.5 mb-5">
                <div className="w-8 h-8 rounded-lg bg-[#FFF1F1] flex items-center justify-center">
                  <Info size={16} className="text-[#9A2109]" />
                </div>
                <h2 className="text-sm font-bold text-[#1E293B]">Petunjuk & Ketentuan Layanan</h2>
              </div>

              <div className="space-y-4">
                {[
                  {
                    num: 1,
                    icon: User,
                    text: "Pastikan KTP masih berlaku dan foto terlihat jelas tanpa blur.",
                  },
                  {
                    num: 2,
                    icon: AlertCircle,
                    text: "Informasi yang dikecualikan (rahasia putusan musyawarah hakim, berkas anak) tidak dapat diberikan sesuai UU No. 14 Tahun 2008.",
                  },
                  {
                    num: 3,
                    icon: FileText,
                    text: "Biaya penyalinan berkas/fotokopi ditanggung oleh pemohon sesuai tarif resmi PN Purworejo.",
                  },
                ].map(({ num, icon: Icon, text }) => (
                  <div key={num} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#9A2109] text-white text-sm font-bold flex items-center justify-center flex-shrink-0 mt-0.5">
                      {num}
                    </div>
                    <p className="text-sm text-[#475569] leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 pt-5 border-t border-[#F1F5F9]">
                <div className="bg-[#F8FAFC] rounded-xl p-4 border border-[#E2E8F0]">
                  <div className="flex items-center gap-2 mb-2">
                    <Phone size={13} className="text-[#9A2109]" />
                    <p className="text-sm font-bold text-[#1E293B]">Butuh Bantuan Langsung?</p>
                  </div>
                  <p className="text-sm text-[#64748B] leading-relaxed mb-2">
                    Hubungi Petugas PTSP via WhatsApp Layanan:
                  </p>
                  <a
                    href="https://wa.me/620812000000"
                    className="text-sm font-bold text-[#9A2109] hover:text-[#7A1A07] transition-colors"
                  >
                    0812-XXXX-XXXX
                  </a>
                </div>
              </div>
            </div>

            {/* Progress tracker */}
            <div className="bg-white rounded-2xl border border-[#E2E8F0] p-5 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.05)]">
              <p className="text-sm font-bold text-[#1E293B] uppercase tracking-wide mb-4">Kelengkapan Formulir</p>
              <div className="space-y-2.5">
                {[
                  { label: "Kategori Pemohon", done: true },
                  { label: "NIK KTP (16 digit)", done: nikState === "valid" },
                  { label: "Nama Lengkap", done: namaLengkap.length > 2 },
                  { label: "Email Aktif", done: emailState === "valid" },
                  { label: "Nomor WhatsApp", done: waState === "valid" },
                  { label: "Upload KTP", done: !!fileName },
                  { label: "Rincian Informasi", done: rincian.length > 20 },
                  { label: "Persetujuan", done: agreed },
                ].map(({ label, done }) => (
                  <div key={label} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${
                      done ? "bg-[#DCFCE7]" : "bg-[#F1F5F9]"
                    }`}>
                      {done
                        ? <CheckCircle2 size={10} className="text-[#15803D]" />
                        : <div className="w-1.5 h-1.5 rounded-full bg-[#CBD5E1]" />
                      }
                    </div>
                    <span className={`text-sm ${done ? "text-[#15803D] font-medium" : "text-[#94A3B8]"}`}>{label}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-3 border-t border-[#F1F5F9]">
                <div className="flex justify-between text-sm mb-1.5">
                  <span className="text-[#64748B]">Kelengkapan</span>
                  <span className="font-bold text-[#9A2109]">
                    {[true, nikState === "valid", namaLengkap.length > 2, emailState === "valid", waState === "valid", !!fileName, rincian.length > 20, agreed].filter(Boolean).length}/8
                  </span>
                </div>
                <div className="h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#9A2109] rounded-full transition-all"
                    style={{
                      width: `${([true, nikState === "valid", namaLengkap.length > 2, emailState === "valid", waState === "valid", !!fileName, rincian.length > 20, agreed].filter(Boolean).length / 8) * 100}%`,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Reset Modal */}
      {showReset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setShowReset(false)}>
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[440px] p-7" onClick={(e) => e.stopPropagation()}>
            <div className="w-12 h-12 rounded-full bg-[#FEE2E2] flex items-center justify-center mb-4">
              <Trash2 size={20} className="text-[#DC2626]" />
            </div>
            <h2 className="text-lg font-bold text-[#1E293B] mb-2">Kosongkan Formulir?</h2>
            <p className="text-sm text-[#64748B] leading-relaxed mb-6">
              Apakah Anda yakin ingin mengulang formulir dari awal? Data yang diketik akan hilang dan tidak dapat dikembalikan.
            </p>
            <div className="flex gap-3">
              <button aria-label="Aksi"
                onClick={() => setShowReset(false)}
                className="flex-1 py-2.5 border border-[#E2E8F0] rounded-full text-sm font-semibold text-[#475569] hover:bg-[#F8FAFC] transition-colors"
              >
                Batal
              </button>
              <button aria-label="Aksi"
                onClick={handleReset}
                className="flex-1 py-2.5 bg-[#DC2626] hover:bg-[#B91C1C] text-white rounded-full text-sm font-semibold transition-colors"
              >
                Ya, Kosongkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {showSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
          <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-[480px] overflow-hidden" onClick={(e) => e.stopPropagation()}>
            <div className="bg-gradient-to-br from-[#9A2109] to-[#7A1A07] px-7 py-8 text-center">
              <div className="w-16 h-16 rounded-full bg-white/10 border-4 border-white/20 flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-[#F9C784]" />
              </div>
              <h2 className="text-xl font-bold text-white mb-1">Permohonan Berhasil Dikirim!</h2>
              <p className="text-white/70 text-sm">Konfirmasi otomatis telah dikirimkan ke email Anda.</p>
            </div>
            <div className="px-7 py-6">
              <div className="bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl p-4 text-center mb-5">
                <p className="text-sm text-[#64748B] font-semibold uppercase tracking-wide mb-2">Nomor Tiket Registrasi</p>
                <p className="text-xl font-bold text-[#9A2109] tracking-wider">{ticketNo}</p>
              </div>
              <p className="text-sm text-[#64748B] text-center leading-relaxed mb-6">
                Simpan nomor tiket ini untuk memantau status permohonan Anda. Permohonan akan diproses dalam <strong className="text-[#1E293B]">10 hari kerja</strong>.
              </p>
              <div className="flex gap-3">
                <button aria-label="Aksi"
                  onClick={handleCopy}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 border rounded-full text-sm font-semibold transition-all ${
                    copied
                      ? "border-[#16A34A] text-[#16A34A] bg-[#F0FDF4]"
                      : "border-[#E2E8F0] text-[#475569] hover:border-[#9A2109] hover:text-[#9A2109]"
                  }`}
                >
                  {copied ? <CheckCircle2 size={14} /> : <Copy size={14} />}
                  {copied ? "Tersalin!" : "Salin Nomor Tiket"}
                </button>
                <button aria-label="Aksi"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-[#9A2109] hover:bg-[#7A1A07] text-white rounded-full text-sm font-semibold transition-colors"
                >
                  <Download size={14} />
                  Unduh Tanda Terima
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
