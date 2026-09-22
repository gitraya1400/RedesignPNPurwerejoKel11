import { useState, useRef } from "react";
import { Link } from "react-router";
import {
  ChevronLeft, ChevronRight, Info, Upload, CheckCircle2, AlertCircle,
  MapPin, Phone, Mail, Clock, FileText, BookOpen, Shield, X, ExternalLink, RotateCcw,
} from "lucide-react";

interface FileState { file: File | null; error: string }
const emptyFile = (): FileState => ({ file: null, error: "" });

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
    <p className="text-sm text-red-500 mt-1 flex items-center gap-1">
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
      <input aria-label="Input" type={type} placeholder={placeholder} value={value} onChange={e => onChange(e.target.value)}
        className={`w-full px-4 py-3 rounded-xl border text-sm text-gray-800 placeholder-gray-400 outline-none bg-gray-50 focus:bg-white transition-colors focus:border-[#9A2109] ${error ? "border-red-400 bg-red-50" : "border-gray-200"}`} />
      <FieldError msg={error} />
    </div>
  );
}

function FileUpload({ label, required, hint, value, onChange, accept = "*" }: {
  label: string; required?: boolean; hint?: React.ReactNode;
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
      {hint && <div className="text-sm text-gray-600 mb-2">{hint}</div>}
      {value.file ? (
        <div className="flex items-center gap-3 border border-green-200 bg-green-50 rounded-xl px-4 py-3">
          <FileText size={16} className="text-green-600 flex-shrink-0" />
          <span className="flex-1 text-sm text-green-700 truncate" style={{ fontWeight: 500 }}>{value.file.name}</span>
          <button aria-label="Aksi" type="button" onClick={() => { onChange(emptyFile()); if (ref.current) ref.current.value = ""; }} className="text-green-400 hover:text-green-700 transition-colors"><X size={15} /></button>
        </div>
      ) : (
        <button aria-label="Aksi" type="button" onClick={() => ref.current?.click()}
          className={`w-full border-2 border-dashed rounded-xl px-4 py-5 flex flex-col items-center gap-2 hover:border-[#9A2109] hover:bg-[#FFF8F7] transition-colors ${value.error ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50"}`}>
          <Upload size={20} className={value.error ? "text-red-400" : "text-gray-600"} />
          <span className="text-sm text-gray-700">Klik untuk upload file</span>
          <span className="text-sm text-gray-600">PDF, gambar, atau dokumen · Maks. 10 MB</span>
        </button>
      )}
      <FieldError msg={value.error} />
      <input aria-label="Input" ref={ref} type="file" accept={accept} className="hidden" onChange={handle} />
    </div>
  );
}

const INFO_TYPES = [
  { label: "Hard File", desc: "Dokumen fisik (dikenakan biaya penggandaan)" },
  { label: "Softfile", desc: "File digital (gratis, dikirim via email)" },
];

export function GoInfoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmClear, setConfirmClear] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nama, setNama] = useState("");
  const [email, setEmail] = useState("");
  const [wa, setWa] = useState("");
  const [infoType, setInfoType] = useState("");
  const [identitas, setIdentitas] = useState<FileState>(emptyFile());
  const [permohonan, setPermohonan] = useState<FileState>(emptyFile());

  const clr = (k: string) => setErrors(e => ({ ...e, [k]: "" }));

  const handleClearForm = () => {
    setNama(""); setEmail(""); setWa(""); setInfoType("");
    setIdentitas(emptyFile()); setPermohonan(emptyFile());
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

    const namaErr = validateNama(nama);
    if (namaErr) errs.nama = namaErr;

    const emailErr = validateEmail(email);
    if (emailErr) errs.email = emailErr;

    const waErr = validateWhatsApp(wa);
    if (waErr) errs.wa = waErr;

    if (!identitas.file) errs.identitas = "Wajib diisi";
    if (!permohonan.file) errs.permohonan = "Wajib diisi";
    if (!infoType) errs.infoType = "Wajib dipilih";
    if (Object.keys(errs).length > 0) { setErrors(errs); window.scrollTo({ top: 0, behavior: "smooth" }); return; }
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* Hero banner */}
      <div className="pt-24 pb-10" style={{ background: "linear-gradient(135deg,#9A2109 0%,#7B1A07 60%,#4A0E04 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-sm mb-5 flex-wrap">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-white/50">Formulir</span>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-[#F9C784]" style={{ fontWeight: 600 }}>GO INFO</span>
          </nav>
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Info size={24} className="text-[#F9C784]" />
            </div>
            <div>
              <p className="text-[#F9C784] text-sm mb-1 tracking-wide" style={{ fontWeight: 600 }}>HUBUNGI KAMI · LAYANAN INFORMASI PUBLIK</p>
              <h1 className="text-white leading-tight" style={{ fontSize: "clamp(1.4rem,3vw,1.8rem)", fontWeight: 800 }}>
                GO INFO — Get Online Public Information
              </h1>
              <p className="text-white/65 text-sm mt-1">Permohonan Informasi Publik Secara Online · PN Purworejo</p>
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
            <p className="text-gray-700 text-sm mb-6" style={{ lineHeight: 1.7 }}>
              Permohonan GO INFO Anda telah diterima. Petugas akan memproses dan menghubungi Anda dalam 1×3 hari kerja.
            </p>
            <Link to="/" className="inline-flex items-center gap-2 bg-[#9A2109] text-white px-6 py-3 rounded-xl text-sm hover:bg-[#7B1A07] transition-colors" style={{ fontWeight: 700 }}>
              <ChevronLeft size={15} />Kembali ke Beranda
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
                    <Info size={16} className="text-white" />
                  </div>
                  <div>
                    <p className="text-white text-sm" style={{ fontWeight: 700 }}>Formulir Permohonan GO INFO</p>
                    <p className="text-white/70 text-sm">Sampaikan permohonan informasi publik Anda secara online</p>
                  </div>
                </div>

                {/* Info strip */}
                <div className="mx-6 mt-5 bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 text-sm text-blue-800" style={{ lineHeight: 1.65 }}>
                  <p style={{ fontWeight: 700 }} className="mb-0.5">Tentang Layanan GO INFO</p>
                  Layanan permohonan informasi publik secara online di PN Purworejo Kelas IB, meliputi informasi perkara, putusan, statistik, dan hak-hak para pihak dalam peradilan.
                </div>

                {/* Global error */}
                {Object.keys(errors).length > 0 && (
                  <div className="mx-6 mt-4 bg-red-50 border border-red-200 rounded-xl px-4 py-3 flex items-start gap-2">
                    <AlertCircle size={15} className="text-red-500 flex-shrink-0 mt-0.5" />
                    <p className="text-red-600 text-sm" style={{ fontWeight: 600 }}>Mohon lengkapi semua field yang wajib diisi.</p>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Nama */}
                  <TextInput label="Nama Lengkap" required placeholder="Masukkan nama lengkap" value={nama} onChange={handleNamaChange} error={errors.nama} />

                  {/* Email + WA */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <TextInput label="Email" required type="email" placeholder="contoh@email.com" value={email} onChange={handleEmailChange} error={errors.email} />
                    <TextInput label="No. WhatsApp" required type="tel" placeholder="08xxxxxxxxxx" value={wa} onChange={handleWaChange} error={errors.wa} />
                  </div>

                  {/* Identitas */}
                  <FileUpload label="Identitas (KTP, SIM, atau Paspor)" required hint="Upload 1 file yang didukung: PDF, drawing, atau image. Maks 10 MB."
                    value={identitas} onChange={v => { setIdentitas(v); clr("identitas"); }} accept="image/*,.pdf" />
                  {errors.identitas && <p className="text-sm text-red-500 -mt-4 flex items-center gap-1"><AlertCircle size={12} />{errors.identitas}</p>}

                  {/* Permohonan */}
                  <FileUpload label="Upload Permohonan Informasi" required
                    hint={
                      <span>
                        Upload 1 file yang didukung: PDF, document, drawing, atau image. Maks 10 MB.{" "}
                        <a href="https://bit.ly/layanangoinfoblanko" target="_blank" rel="noopener noreferrer"
                          className="text-[#9A2109] inline-flex items-center gap-0.5 hover:underline" style={{ fontWeight: 600 }}>
                          Unduh blanko <ExternalLink size={10} />
                        </a>
                      </span>
                    }
                    value={permohonan} onChange={v => { setPermohonan(v); clr("permohonan"); }} accept="image/*,.pdf,.doc,.docx" />
                  {errors.permohonan && <p className="text-sm text-red-500 -mt-4 flex items-center gap-1"><AlertCircle size={12} />{errors.permohonan}</p>}

                  {/* Jenis informasi */}
                  <div>
                    <Label text="Informasi yang Dibutuhkan" required />
                    <p className="text-sm text-gray-600 mb-3">Apabila informasi yang dibutuhkan dalam bentuk cetak dikenakan biaya yang meliputi biaya penggandaan.</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {INFO_TYPES.map(it => (
                        <button aria-label="Aksi" key={it.label} type="button" onClick={() => { setInfoType(it.label); clr("infoType"); }}
                          className={`flex items-center gap-3 p-4 rounded-xl border-2 text-left transition-all ${infoType === it.label ? "border-[#9A2109] bg-[#FFF1F1]" : "border-gray-200 hover:border-[#9A2109]/40"}`}>
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${infoType === it.label ? "border-[#9A2109] bg-[#9A2109]" : "border-gray-300"}`}>
                            {infoType === it.label && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                          <div>
                            <p className={`text-sm ${infoType === it.label ? "text-[#9A2109]" : "text-gray-700"}`} style={{ fontWeight: 700 }}>{it.label}</p>
                            <p className="text-sm text-gray-600">{it.desc}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    <FieldError msg={errors.infoType} />
                  </div>

                  <button aria-label="Aksi" type="submit"
                    className="w-full flex items-center justify-center gap-2 text-white py-3.5 rounded-xl hover:bg-[#7B1A07] transition-colors"
                    style={{ backgroundColor: "#9A2109", fontWeight: 700 }}>
                    <Info size={17} />Kirim Permohonan GO INFO
                  </button>

                  {/* Clear form */}
                  {!confirmClear ? (
                    <button aria-label="Aksi" type="button" onClick={() => setConfirmClear(true)}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300 hover:text-gray-700 transition-colors text-sm"
                      style={{ fontWeight: 500 }}>
                      <RotateCcw size={15} />Bersihkan Formulir
                    </button>
                  ) : (
                    <div className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3">
                      <p className="text-amber-700 text-sm text-center mb-3" style={{ fontWeight: 600 }}>
                        Semua isian akan dihapus. Lanjutkan?
                      </p>
                      <div className="flex gap-2">
                        <button aria-label="Aksi" type="button" onClick={handleClearForm}
                          className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg bg-amber-500 text-white text-sm hover:bg-amber-600 transition-colors"
                          style={{ fontWeight: 700 }}>
                          <RotateCcw size={14} />Ya, Hapus Semua
                        </button>
                        <button aria-label="Aksi" type="button" onClick={() => setConfirmClear(false)}
                          className="flex-1 py-2.5 rounded-lg border border-gray-200 bg-white text-gray-600 text-sm hover:bg-gray-50 transition-colors"
                          style={{ fontWeight: 600 }}>
                          Batal
                        </button>
                      </div>
                    </div>
                  )}

                  <p className="text-center text-gray-600 text-sm">* Menunjukkan pertanyaan yang wajib diisi</p>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Panduan */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h2 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Panduan Pengisian</h2>
                </div>
                <div className="p-5 space-y-3.5">
                  {[
                    { icon: FileText, text: "Isi formulir dengan data yang benar dan jelas." },
                    { icon: BookOpen, text: "Unduh dan isi blanko permohonan informasi terlebih dahulu sebelum upload." },
                    { icon: Clock, text: "Permohonan direspons maksimal 3×24 jam kerja." },
                    { icon: Shield, text: "Anda akan dihubungi via email atau telepon setelah permohonan diproses." },
                  ].map(({ icon: Icon, text }, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className="w-7 h-7 rounded-lg bg-[#FFF1F1] flex items-center justify-center flex-shrink-0">
                        <Icon size={14} className="text-[#9A2109]" />
                      </div>
                      <p className="text-gray-700 text-sm" style={{ lineHeight: 1.6 }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Informasi tersedia */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4 border-b border-gray-50">
                  <h2 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Informasi yang Tersedia</h2>
                </div>
                <div className="p-5 space-y-2">
                  {[
                    "Hak para pihak dalam peradilan",
                    "Hak atas pembebasan biaya perkara",
                    "Data statistik perkara",
                    "Jumlah dan jenis perkara",
                    "Putusan dan penetapan pengadilan",
                    "Informasi akses bantuan hukum",
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-[#9A2109] rounded-full flex-shrink-0 mt-1.5" />
                      <p className="text-gray-700 text-sm" style={{ lineHeight: 1.5 }}>{item}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Blanko CTA */}
              <div className="bg-[#FFF1F1] rounded-2xl border border-[#9A2109]/20 p-5">
                <p className="text-gray-700 text-sm mb-1" style={{ fontWeight: 700 }}>Belum punya blanko?</p>
                <p className="text-gray-700 text-sm mb-3" style={{ lineHeight: 1.5 }}>Unduh dan isi blanko formulir permohonan informasi sebelum mengisi form ini.</p>
                <a href="https://bit.ly/layanangoinfoblanko" target="_blank" rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 bg-[#9A2109] text-white text-sm py-2.5 rounded-xl hover:bg-[#7B1A07] transition-colors" style={{ fontWeight: 700 }}>
                  <ExternalLink size={13} />Unduh Blanko Formulir
                </a>
              </div>

              {/* Kontak */}
              <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
                <div className="px-5 py-4" style={{ backgroundColor: "#9A2109" }}>
                  <h2 className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Kontak Kami</h2>
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
                      <p className="text-gray-600 text-sm" style={{ lineHeight: 1.5 }}>{text}</p>
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
