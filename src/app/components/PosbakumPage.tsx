import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  ChevronLeft, ChevronRight, Scale, Upload, ChevronDown, CheckCircle2,
  AlertCircle, MapPin, Phone, Mail, Clock, FileText,
  Users, Shield, X, RotateCcw,
} from "lucide-react";

const JENIS_LAYANAN = [
  "Pemberian Informasi, Konsultasi, dan Advis Hukum",
  "Bantuan Pembuatan Dokumen Hukum",
  "Informasi Daftar Organisasi Bantuan Hukum",
];

interface FileState { file: File | null; error: string }
const emptyFile = (): FileState => ({ file: null, error: "" });

/* ─── Reusable field components ─── */

function Label({ text, required }: { text: string; required?: boolean }) {
  return (
    <label className="block text-sm text-gray-700 mb-1.5" style={{ fontWeight: 600 }}>
      {text}{required && <span className="text-[#9A2109] ml-1">*</span>}
    </label>
  );
}

function FieldError({ msg }: { msg?: string }) {
  if (!msg) return null;
  return (
    <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
      <AlertCircle size={12} />{msg}
    </p>
  );
}

function TextInput({ label, required, type = "text", placeholder, value, onChange, error }: {
  label: string; required?: boolean; type?: string; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <Label text={label} required={required} />
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none bg-gray-50 focus:bg-white transition-colors focus:border-[#9A2109] ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function Textarea({ label, required, placeholder, value, onChange, error }: {
  label: string; required?: boolean; placeholder?: string;
  value: string; onChange: (v: string) => void; error?: string;
}) {
  return (
    <div>
      <Label text={label} required={required} />
      <textarea
        placeholder={placeholder} value={value} rows={4}
        onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none bg-gray-50 focus:bg-white resize-none transition-colors focus:border-[#9A2109] ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`}
      />
      <FieldError msg={error} />
    </div>
  );
}

function FileUpload({ label, required, hint, value, onChange, accept = "*" }: {
  label: string; required?: boolean; hint?: string;
  value: FileState; onChange: (v: FileState) => void; accept?: string;
}) {
  const ref = useRef<HTMLInputElement>(null);
  const handle = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    if (file.size > 10 * 1024 * 1024) { onChange({ file: null, error: "Ukuran file melebihi 10 MB" }); return; }
    onChange({ file, error: "" });
  };
  return (
    <div>
      <Label text={label} required={required} />
      {hint && <p className="text-xs text-gray-400 mb-2">{hint}</p>}
      {value.file ? (
        <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3">
          <FileText size={16} className="text-green-600 flex-shrink-0" />
          <span className="flex-1 text-sm text-green-700 truncate" style={{ fontWeight: 500 }}>{value.file.name}</span>
          <button type="button" onClick={() => { onChange(emptyFile()); if (ref.current) ref.current.value = ""; }} className="text-green-400 hover:text-green-700 transition-colors"><X size={15} /></button>
        </div>
      ) : (
        <button type="button" onClick={() => ref.current?.click()}
          className={`w-full border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 hover:border-[#9A2109] hover:bg-[#FFF8F7] transition-colors ${value.error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
          <Upload size={20} className={value.error ? "text-red-400" : "text-gray-400"} />
          <span className="text-sm text-gray-500">Klik untuk upload file</span>
          <span className="text-xs text-gray-400">Maks. 10 MB</span>
        </button>
      )}
      <FieldError msg={value.error} />
      <input ref={ref} type="file" accept={accept} className="hidden" onChange={handle} />
    </div>
  );
}

function SelectField({ label, required, options, value, onChange, placeholder, error }: {
  label: string; required?: boolean; options: string[]; value: string;
  onChange: (v: string) => void; placeholder?: string; error?: string;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <Label text={label} required={required} />
      <button type="button" onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-xl border text-sm text-left transition-colors ${error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 hover:border-[#9A2109]"}`}>
        <span className={value ? "text-gray-800" : "text-gray-400"}>{value || placeholder || "Pilih..."}</span>
        <ChevronDown size={15} className={`text-gray-400 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
          <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-100 z-20 overflow-hidden">
            {options.map(opt => (
              <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
                className={`w-full text-left px-4 py-3 text-sm hover:bg-[#FFF1F1] hover:text-[#9A2109] transition-colors ${value === opt ? "bg-[#FFF1F1] text-[#9A2109]" : "text-gray-700"}`}
                style={{ fontWeight: value === opt ? 600 : 400 }}>
                {opt}
              </button>
            ))}
          </div>
        </>
      )}
      <FieldError msg={error} />
    </div>
  );
}

/* ─── Page ─── */

export function PosbakumPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [jenisLayanan, setJenisLayanan] = useState("");
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [jam, setJam] = useState("");
  const [topik, setTopik] = useState("");
  const [ktp, setKtp] = useState<FileState>(emptyFile());
  const [sktm, setSktm] = useState<FileState>(emptyFile());
  const [dokAwal, setDokAwal] = useState<FileState>(emptyFile());

  const clr = (k: string) => setErrors(e => ({ ...e, [k]: "" }));

  const handleClearForm = () => {
    setJenisLayanan(""); setNama(""); setEmail(""); setWa("");
    setTanggal(""); setJam(""); setTopik("");
    setKtp(emptyFile()); setSktm(emptyFile()); setDokAwal(emptyFile());
    setErrors({}); setConfirmClear(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const validateNama = (value: string): string => {
    if (!value.trim()) return "Wajib diisi";
    if (!/^[a-zA-Z\s'\-]+$/.test(value)) return "Nama hanya boleh berisi huruf, spasi, tanda petik ('), dan tanda hubung (-)";
    return "";
  };

  const validateEmail = (value: string): string => {
    if (!value.trim()) return "Wajib diisi";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email harus mengandung @ dan domain lengkap (contoh: nama@email.com)";
    return "";
  };

  const validateWhatsApp = (value: string): string => {
    if (!value.trim()) return "Wajib diisi";
    const cleaned = value.replace(/\D/g, "");
    if (!cleaned.startsWith("08")) return "Nomor WhatsApp harus diawali dengan 08";
    if (cleaned.length < 10) return "Nomor WhatsApp minimal 10 digit";
    return "";
  };

  const handleNamaChange = (value: string) => {
    setNama(value);
    const err = validateNama(value);
    setErrors(e => ({ ...e, nama: err }));
  };

  const handleEmailChange = (value: string) => {
    setEmail(value);
    const err = validateEmail(value);
    setErrors(e => ({ ...e, email: err }));
  };

  const handleWaChange = (value: string) => {
    setWa(value);
    const err = validateWhatsApp(value);
    setErrors(e => ({ ...e, wa: err }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!jenisLayanan) errs.jenis = "Wajib diisi";

    const namaErr = validateNama(nama);
    if (namaErr) errs.nama = namaErr;

    const emailErr = validateEmail(email);
    if (emailErr) errs.email = emailErr;

    const waErr = validateWhatsApp(wa);
    if (waErr) errs.wa = waErr;

    if (!tanggal) errs.tanggal = "Wajib diisi";
    if (!jam) errs.jam = "Wajib diisi";
    if (!ktp.file) errs.ktp = "Wajib diisi";
    if (!sktm.file) errs.sktm = "Wajib diisi";
    if (!topik.trim()) errs.topik = "Wajib diisi";
    if (Object.keys(errs).length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero banner */}
      <div className="pt-24 pb-10" style={{ background: "linear-gradient(135deg,#9A2109 0%,#7B1A07 60%,#4A0E04 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs mb-5 flex-wrap">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-white/50">Layanan Hukum</span>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <Link to="/hubungi/posbakum" className="text-white/70 hover:text-white transition-colors">Bantuan Hukum (Posbakum)</Link>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-[#F9C784]" style={{ fontWeight: 600 }}>Formulir Permohonan</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Scale size={24} className="text-[#F9C784]" />
            </div>
            <div>
              <p className="text-[#F9C784] text-xs mb-1 tracking-wide" style={{ fontWeight: 600 }}>HUBUNGI KAMI · BANTUAN HUKUM (POSBAKUM)</p>
              <h1 className="text-white leading-tight" style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800 }}>
                Pos Bantuan Hukum (Posbakum) Online
              </h1>
              <p className="text-white/65 text-sm mt-1">Pengadilan Negeri Purworejo</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-10">
        {submitted ? (
          <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-100 p-10 text-center shadow-sm">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 size={32} className="text-green-600" />
            </div>
            <h2 className="text-gray-900 mb-2" style={{ fontWeight: 800, fontSize: "1.25rem" }}>Permohonan Terkirim!</h2>
            <p className="text-gray-500 text-sm mb-6" style={{ lineHeight: 1.7 }}>
              Permohonan Posbakum Anda telah berhasil dikirim. Tim kami akan menghubungi Anda melalui WhatsApp atau Email dalam 1×24 jam kerja.
            </p>
            <Link to="/hubungi/posbakum" className="inline-flex items-center gap-2 bg-[#9A2109] text-white px-6 py-3 rounded-xl text-sm hover:bg-[#7B1A07] transition-colors" style={{ fontWeight: 700 }}>
              <ChevronLeft size={15} />Kembali ke Informasi Posbakum
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-6 items-start">
            {/* Form card */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                {/* Card header */}
                <div className="px-6 py-4 flex items-center gap-3" style={{ backgroundColor: "#9A2109" }}>
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Scale size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm" style={{ fontWeight: 700 }}>Formulir Posbakum Online</p>
                    <p className="text-white/70 text-xs">Sampaikan permohonan Anda dan kami akan segera menindaklanjuti</p>
                  </div>
                </div>

                {/* Info strip */}
                <div className="mx-6 mt-5 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800" style={{ lineHeight: 1.65 }}>
                  <p style={{ fontWeight: 700 }} className="mb-0.5">Tentang Posbakum Online</p>
                  Layanan hukum untuk masyarakat tidak mampu secara ekonomi dan kelompok rentan (Perempuan, Anak, Penyandang Disabilitas) agar mendapat akses keadilan yang sama.
                </div>

                {/* Global error */}
                {Object.keys(errors).length > 0 && (
                  <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-xs" style={{ fontWeight: 600 }}>Mohon lengkapi semua field yang wajib diisi.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  <SelectField label="Pilih Jenis Layanan" required options={JENIS_LAYANAN}
                    value={jenisLayanan} onChange={v => { setJenisLayanan(v); clr("jenis"); }} placeholder="Pilih" error={errors.jenis} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextInput label="Nama Pemohon Layanan" required placeholder="Nama lengkap" value={nama} onChange={handleNamaChange} error={errors.nama} />
                    <TextInput label="Email" required type="email" placeholder="contoh@email.com" value={email} onChange={handleEmailChange} error={errors.email} />
                  </div>

                  <TextInput label="No. WhatsApp" required type="tel" placeholder="08xxxxxxxxxx" value={wa} onChange={handleWaChange} error={errors.wa} />

                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextInput label="Rencana Tanggal Konsultasi" required type="date" value={tanggal} onChange={v => { setTanggal(v); clr("tanggal"); }} error={errors.tanggal} />
                    <TextInput label="Rencana Jam Konsultasi (WIB)" required type="time" value={jam} onChange={v => { setJam(v); clr("jam"); }} error={errors.jam} />
                  </div>

                  <FileUpload label="Upload Kartu Identitas" required hint="Upload 1 file yang didukung. Maks 10 MB."
                    value={ktp} onChange={v => { setKtp(v); clr("ktp"); }} accept="image/*,.pdf" />
                  {errors.ktp && <p className="text-xs text-red-500 -mt-4 flex items-center gap-1"><AlertCircle size={12} />{errors.ktp}</p>}

                  <FileUpload label="Upload Dokumen Keterangan Tidak Mampu" required
                    hint="Seperti: SKTM / Kartu Keluarga Miskin (KKM), dll. Maks 10 MB."
                    value={sktm} onChange={v => { setSktm(v); clr("sktm"); }} accept="image/*,.pdf" />
                  {errors.sktm && <p className="text-xs text-red-500 -mt-4 flex items-center gap-1"><AlertCircle size={12} />{errors.sktm}</p>}

                  <Textarea label="Topik / Uraian Layanan Yang Akan Dikonsultasikan" required
                    placeholder="Jelaskan secara detail permasalahan hukum yang ingin dikonsultasikan..."
                    value={topik} onChange={v => { setTopik(v); clr("topik"); }} error={errors.topik} />

                  <FileUpload label="Upload Dokumen Awal (opsional)" hint="Upload 1 file yang didukung. Maks 10 MB."
                    value={dokAwal} onChange={setDokAwal} accept="image/*,.pdf,.doc,.docx" />

                  <button type="submit"
                    className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl hover:bg-[#7B1A07] transition-colors"
                    style={{ backgroundColor: "#9A2109", fontWeight: 700 }}>
                    <Scale size={17} />Kirim Permohonan Posbakum
                  </button>

                  {/* Clear form */}
                  {!confirmClear ? (
                    <button type="button" onClick={() => setConfirmClear(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-400 hover:border-gray-300 hover:text-gray-500 transition-colors text-sm"
                      style={{ fontWeight: 500 }}>
                      <RotateCcw size={15} />Bersihkan Formulir
                    </button>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <p className="text-amber-700 text-xs text-center mb-3" style={{ fontWeight: 600 }}>
                        Semua isian akan dihapus. Lanjutkan?
                      </p>
                      <div className="flex gap-2">
                        <button type="button" onClick={handleClearForm}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-500 text-white text-sm hover:bg-amber-600 transition-colors"
                          style={{ fontWeight: 700 }}>
                          <RotateCcw size={14} />Ya, Hapus Semua
                        </button>
                        <button type="button" onClick={() => setConfirmClear(false)}
                          className="flex-1 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                          style={{ fontWeight: 600 }}>
                          Batal
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-center text-gray-400 text-xs">* Menunjukkan pertanyaan yang wajib diisi</p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Panduan */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Panduan Pengisian</h3>
                </div>
                <div className="p-5 space-y-3.5">
                  {[
                    { icon: FileText, text: "Isi formulir dengan data yang benar dan lengkap." },
                    { icon: Users, text: "Layanan diperuntukkan bagi masyarakat tidak mampu dan kelompok rentan." },
                    { icon: Clock, text: "Pengajuan ditindaklanjuti maksimal 1×24 jam kerja." },
                    { icon: Shield, text: "Siapkan KTP dan dokumen keterangan tidak mampu (SKTM/KKM)." },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-[#9A2109]" />
                      </div>
                      <p className="text-gray-500 text-xs" style={{ lineHeight: 1.6 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Jenis layanan */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Jenis Layanan Posbakum</h3>
                </div>
                <div className="p-5 space-y-2.5">
                  {JENIS_LAYANAN.map((l, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-5 h-5 rounded-full bg-[#9A2109] text-white flex items-center justify-center flex-shrink-0 text-[10px]" style={{ fontWeight: 700, marginTop: "1px" }}>{i + 1}</div>
                      <p className="text-gray-600 text-xs" style={{ lineHeight: 1.55 }}>{l}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Kontak */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4" style={{ backgroundColor: "#9A2109" }}>
                  <h3 className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Kontak Kami</h3>
                </div>
                <div className="p-5 space-y-3">
                  {[
                    { icon: MapPin, text: "Jl. Jenderal Sudirman No. 19, Purworejo, Jawa Tengah 54111" },
                    { icon: Phone, text: "(0275) 321021" },
                    { icon: Mail, text: "delegasi@pn-purworejo.go.id" },
                    { icon: Clock, text: "Senin–Jumat, 08.00–16.00 WIB" },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <Icon size={14} className="text-[#9A2109] flex-shrink-0 mt-0.5" />
                      <p className="text-gray-600 text-xs" style={{ lineHeight: 1.5 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
