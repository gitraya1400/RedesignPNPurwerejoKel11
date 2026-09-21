import { Link } from "react-router";
import {
  ChevronLeft, Scale, Phone, Clock, MapPin, Mail,
  BookOpen, Target, Gavel, Users, HelpCircle, FileText,
  Shield, ChevronRight, AlertCircle,
} from "lucide-react";

/* ─── Data kontak petugas ─── */
const PETUGAS = [
  { nama: "YUNUS, S.H.", telp: "081380828338" },
  { nama: "SRI HANDONO, S.H.", telp: "081215155852" },
  { nama: "DEDI JUWANTO, S.H.", telp: "082137027544" },
];

/* ─── Dasar hukum ─── */
const DASAR_HUKUM = [
  {
    judul: "UU No. 4 Tahun 2004 tentang Kekuasaan Kehakiman",
    poin: [
      "Pasal 13 (1): Organisasi, administrasi, dan finansial Mahkamah Agung dan badan peradilan di bawahnya.",
      "Pasal 37: Setiap orang yang tersangkut perkara berhak memperoleh bantuan hukum.",
    ],
  },
  {
    judul: "UU No. 8 Tahun 1981 tentang KUHAP",
    poin: [
      "Pasal 56 (1): Pejabat wajib menunjuk penasehat hukum bagi tersangka/terdakwa yang diancam pidana 5 tahun atau lebih dan tidak mampu.",
      "Pasal 56 (2): Penasehat hukum yang ditunjuk memberikan bantuannya dengan cuma-cuma.",
    ],
  },
  {
    judul: "HIR/RBG (Hukum Acara Perdata)",
    poin: [
      "Pasal 237 HIR / 273 RBG: Pihak yang tidak mampu menanggung biaya perkara dapat memperoleh izin berperkara secara cuma-cuma.",
    ],
  },
  {
    judul: "Instruksi & Surat Edaran",
    poin: [
      "Instr. Menkeh RI No. M 01-UM.08.10 Tahun 1996 tentang Petunjuk Pelaksanaan Program Bantuan Hukum melalui LBH.",
      "Instr. Menkeh RI No. M 03-UM.06.02 Tahun 1999 tentang Bantuan Hukum melalui Pengadilan Negeri dan PTUN.",
      "SE Dirjen Badilum No. D.Um.08.10.10, 12 Mei 1998 tentang JUKLAK Bantuan Hukum bagi Golongan Kurang Mampu.",
    ],
  },
];

/* ─── Cara memperoleh ─── */
const CARA_MEMPEROLEH = [
  "Surat Keterangan Tidak Mampu dari Kepala Desa/Lurah setempat; atau",
  "Surat Pernyataan Tidak Mampu dari Pemohon dan dibenarkan oleh Pengadilan Negeri setempat; atau",
  "Surat Pernyataan Tidak Mampu dari Pemohon dan dibenarkan oleh Lembaga Bantuan Hukum setempat.",
];

/* ─── Asas pidana ─── */
const ASAS_PIDANA = [
  {
    pasal: "Pasal 6 (1)",
    teks: "Tidak seorang pun dapat dihadapkan di depan pengadilan selain daripada yang ditentukan oleh undang-undang (Nullum delictum sine praevia lege).",
  },
  {
    pasal: "Pasal 6 (2)",
    teks: "Tidak seorang pun dapat dijatuhi pidana, kecuali pengadilan mendapat keyakinan melalui alat pembuktian yang sah bahwa seseorang telah bersalah atas perbuatan yang didakwakan.",
  },
  {
    pasal: "Pasal 8",
    teks: "Setiap orang yang disangka, ditangkap, ditahan, dan/atau dihadapkan di depan pengadilan wajib dianggap tidak bersalah sebelum ada putusan pengadilan yang berkekuatan hukum tetap (Presumption of innocence).",
  },
  {
    pasal: "Pasal 37",
    teks: "Setiap orang yang tersangkut perkara berhak memperoleh bantuan hukum.",
  },
];

/* ─── Asas perdata ─── */
const ASAS_PERDATA = [
  "Pengadilan mengadili menurut hukum dengan tidak membedakan orang (Pasal 5 ayat 1).",
  "Pengadilan membantu pencari keadilan dan berusaha mengatasi segala hambatan untuk tercapainya peradilan yang sederhana, cepat, dan biaya ringan (Pasal 5 ayat 2).",
  "Para pihak dapat memilih penyelesaian melalui pengadilan atau di luar pengadilan (upaya perdamaian).",
  "Para pihak dapat menghadap sendiri atau meminta bantuan Advokat (Pasal 118 HIR / 142 RBG).",
  "Ketua PN memberi nasehat kepada penggugat atau wakilnya tentang memasukkan tuntutan (Pasal 119 HIR / 143 RBG).",
  "Pihak yang tidak mampu menanggung biaya perkara dapat memperoleh izin berperkara cuma-cuma (Pasal 237 HIR / 273 RBG).",
];

/* ─── Section wrapper ─── */
function Section({ id, icon: Icon, title, children }: {
  id?: string; icon: React.ElementType; title: string; children: React.ReactNode;
}) {
  return (
    <section id={id} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center gap-3 px-6 py-4 border-b border-gray-100"
        style={{ background: "linear-gradient(90deg,#FFF5F3 0%,#FAFAFA 100%)" }}>
        <div className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: "#9A2109" }}>
          <Icon size={18} className="text-white" />
        </div>
        <h2 className="text-gray-800" style={{ fontWeight: 700, fontSize: "1.05rem" }}>{title}</h2>
      </div>
      <div className="px-6 py-5">{children}</div>
    </section>
  );
}

/* ─── Bullet list ─── */
function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-2.5">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{ backgroundColor: "#9A2109", minWidth: "1.25rem" }}>
            <ChevronRight size={10} className="text-white" />
          </div>
          <p className="text-gray-600 text-sm" style={{ lineHeight: 1.7 }}>{item}</p>
        </li>
      ))}
    </ul>
  );
}

/* ─── Prose paragraph ─── */
function Prose({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gray-600 text-sm" style={{ lineHeight: 1.8 }}>{children}</p>
  );
}

/* ─── Page ─── */
export function PosbakumInfoPage() {
  return (
    <div className="min-h-screen bg-[#F9FAFB]" style={{ fontFamily: "'Inter', sans-serif" }}>

      {/* ── Hero Banner ── */}
      <div className="pt-24 pb-12" style={{ background: "linear-gradient(135deg,#9A2109 0%,#7B1A07 60%,#4A0E04 100%)" }}>
        <div className="max-w-6xl mx-auto px-4">
          <nav className="flex items-center gap-1.5 text-xs mb-5 flex-wrap">
            <Link to="/" className="text-white/70 hover:text-white transition-colors">Beranda</Link>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-white/50">Layanan Hukum</span>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-white/50">Layanan Hukum bagi Masyarakat Kurang Mampu</span>
            <ChevronRight size={11} className="text-white/40 flex-shrink-0" />
            <span className="text-[#F9C784]" style={{ fontWeight: 600 }}>Bantuan Hukum (Posbakum)</span>
          </nav>
          <div className="flex items-start gap-4 mb-6">
            <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
              <Scale size={24} className="text-[#F9C784]" />
            </div>
            <div>
              <p className="text-[#F9C784] text-xs mb-1 tracking-wide" style={{ fontWeight: 600 }}>
                HUBUNGI KAMI · BANTUAN HUKUM
              </p>
              <h1 className="text-white leading-tight" style={{ fontSize: "clamp(1.4rem,3vw,2rem)", fontWeight: 800 }}>
                Bantuan Hukum (Posbakum)
              </h1>
              <p className="text-white/70 text-sm mt-1.5" style={{ lineHeight: 1.6, maxWidth: "540px" }}>
                Informasi lengkap mengenai Pos Bantuan Hukum untuk masyarakat tidak mampu yang berhadapan dengan hukum di Pengadilan Negeri Purworejo.
              </p>
            </div>
          </div>

          {/* Contact strip inside hero */}
          <div className="grid sm:grid-cols-3 gap-3 mt-2">
            {PETUGAS.map((p) => (
              <a key={p.nama} href={`https://wa.me/62${p.telp.replace(/^0/, "")}`}
                target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-xl px-4 py-3 hover:bg-white/25 transition-colors"
                style={{ backgroundColor: "rgba(255,255,255,0.12)" }}>
                <Phone size={15} className="text-[#F9C784] flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-white text-xs truncate" style={{ fontWeight: 700 }}>{p.nama}</p>
                  <p className="text-white/70 text-xs">{p.telp}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid lg:grid-cols-3 gap-6 items-start">

          {/* Left column – article */}
          <div className="lg:col-span-2 space-y-6">

            {/* Jam Layanan notice */}
            <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4">
              <Clock size={18} className="text-amber-600 flex-shrink-0" />
              <div>
                <p className="text-amber-800 text-sm" style={{ fontWeight: 700 }}>Jam Layanan Posbakum</p>
                <p className="text-amber-700 text-sm">09:00 – 14:00 WIB &nbsp;|&nbsp; Senin – Jumat</p>
              </div>
            </div>

            {/* Pendahuluan */}
            <Section id="pendahuluan" icon={BookOpen} title="Pendahuluan">
              <div className="space-y-3">
                <Prose>
                  Bagi masyarakat kurang mampu yang berhadapan dengan hukum atau menemukan kesulitan hukum, Anda berhak mendapatkan Bantuan Hukum secara <strong>gratis</strong> melalui Posbakum (Pos Bantuan Hukum) yang tersedia di setiap pengadilan.
                </Prose>
                <Prose>
                  Program pemberian bantuan hukum bagi masyarakat tidak mampu telah berlangsung sejak tahun 1980 hingga sekarang. Dalam kurun waktu tersebut, banyak hal yang menunjukkan bahwa pemberian bantuan hukum sangat diperlukan, dan diharapkan adanya peningkatan pelaksanaan bantuan hukum dari tahun ke tahun.
                </Prose>
                <Prose>
                  Arah kebijaksanaan program ini, selain memberdayakan keberadaan dan kesamaan hukum bagi seluruh lapisan masyarakat, juga bertujuan untuk menggugah kesadaran hukum masyarakat melalui penggunaan hak yang disediakan Negara dalam membela kepentingan hukumnya di depan Pengadilan.
                </Prose>
                <Prose>
                  Dana bantuan hukum bagi masyarakat tidak mampu dapat disalurkan melalui:
                </Prose>
                <BulletList items={[
                  "Dana Bantuan Hukum melalui Pengadilan Negeri; atau",
                  "Dana Bantuan Hukum yang disediakan di Lembaga Bantuan Hukum.",
                ]} />
                <Prose>
                  Sebagaimana diketahui, penegakan hukum melalui lembaga peradilan tidak bersifat diskriminatif. Setiap manusia, baik mampu atau tidak mampu secara sosial-ekonomi, berhak memperoleh pembelaan hukum di depan pengadilan.
                </Prose>
              </div>
            </Section>

            {/* Dasar Hukum */}
            <Section id="dasar-hukum" icon={Gavel} title="Dasar Pemberian Bantuan Hukum">
              <div className="space-y-5">
                {DASAR_HUKUM.map((item, i) => (
                  <div key={i}>
                    <p className="text-gray-800 text-sm mb-2.5" style={{ fontWeight: 600 }}>
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full text-white text-[10px] mr-2 flex-shrink-0 align-middle"
                        style={{ backgroundColor: "#9A2109", fontWeight: 700 }}>{i + 1}</span>
                      {item.judul}
                    </p>
                    <ul className="ml-7 space-y-1.5">
                      {item.poin.map((p, j) => (
                        <li key={j} className="flex items-start gap-2">
                          <span className="text-[#9A2109] mt-1 flex-shrink-0">–</span>
                          <p className="text-gray-600 text-sm" style={{ lineHeight: 1.7 }}>{p}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Section>

            {/* Tujuan */}
            <Section id="tujuan" icon={Target} title="Tujuan Program Bantuan Hukum">
              <div className="space-y-5">
                <div className="rounded-xl p-4 border border-gray-100 bg-[#FFF8F7]">
                  <p className="text-gray-800 text-sm mb-1.5" style={{ fontWeight: 700 }}>Aspek Kemanusiaan</p>
                  <Prose>
                    Tujuan dari program bantuan hukum ini adalah untuk meringankan beban (biaya) hukum yang harus ditanggung oleh masyarakat tidak mampu di depan Pengadilan. Ketika masyarakat golongan tidak mampu berhadapan dengan proses hukum, mereka tetap memperoleh kesempatan untuk mendapat pembelaan dan perlindungan hukum.
                  </Prose>
                </div>
                <div className="rounded-xl p-4 border border-gray-100 bg-[#FFF8F7]">
                  <p className="text-gray-800 text-sm mb-1.5" style={{ fontWeight: 700 }}>Peningkatan Kesadaran Hukum</p>
                  <Prose>
                    Program bantuan hukum ini akan memacu tingkat kesadaran hukum masyarakat ke jenjang yang lebih tinggi. Dengan demikian, apresiasi masyarakat terhadap hukum akan tampil melalui sikap dan perbuatan yang mencerminkan hak dan kewajibannya secara hukum.
                  </Prose>
                </div>
              </div>
            </Section>

            {/* Pengertian */}
            <Section id="pengertian" icon={BookOpen} title="Pengertian Bantuan Hukum">
              <div className="space-y-3">
                <Prose>Bantuan yang dimaksud dalam Program Bantuan Hukum Bagi Masyarakat Tidak Mampu adalah bantuan jasa berupa:</Prose>
                <BulletList items={[
                  "Memberikan nasehat atau advis hukum bagi masyarakat yang membutuhkannya;",
                  "Bertindak sebagai pendamping atau kuasa hukum, untuk menyelesaikan perselisihan tentang hak dan kewajiban (perdata) seseorang di depan Pengadilan;",
                  "Bertindak sebagai pendamping dan pembela, terhadap seseorang yang disangka/didakwa melakukan tindak pidana di depan Pengadilan.",
                ]} />
              </div>
            </Section>

            {/* Pembela */}
            <Section id="pembela" icon={Shield} title="Pembela (Advokat) dalam Program Bantuan Hukum">
              <div className="space-y-3">
                <Prose>
                  Pemberian bantuan (pembelaan) hukum bagi masyarakat tidak mampu hanya dapat dilakukan oleh Advokat yang sudah terdaftar pada Pengadilan Tinggi setempat. Pemberian bantuan hukum tersebut dapat dilakukan melalui:
                </Prose>
                <BulletList items={[
                  "Bantuan (pembelaan) hukum yang dilakukan oleh Advokat secara perorangan.",
                  "Bantuan (pembelaan) hukum yang dilakukan oleh Advokat secara kelembagaan melalui Lembaga Bantuan Hukum setempat.",
                ]} />
              </div>
            </Section>

            {/* Masyarakat Terperkara */}
            <Section id="masyarakat" icon={Users} title="Masyarakat (Terperkara) dalam Program Bantuan Hukum">
              <div className="space-y-3">
                <BulletList items={[
                  "Dana bantuan hukum diberikan terhadap golongan masyarakat tidak mampu yang berperkara di Pengadilan.",
                  "Dana bantuan hukum tidak diberikan secara langsung kepada masyarakat, melainkan diberikan dalam bentuk imbalan jasa kepada Advokat yang sudah menyelesaikan kasus/perkara dari masyarakat yang bersangkutan.",
                ]} />
              </div>
            </Section>

            {/* Cara Memperoleh */}
            <Section id="cara-memperoleh" icon={HelpCircle} title="Bagaimana dan Kemana Memperoleh Bantuan Hukum">
              <div className="space-y-5">
                <div>
                  <p className="text-gray-800 text-sm mb-3" style={{ fontWeight: 600 }}>Tempat Memperoleh Informasi</p>
                  <Prose>Masyarakat tidak mampu yang menghadapi perkara di Pengadilan dapat meminta informasi dari:</Prose>
                  <div className="mt-3">
                    <BulletList items={["Pengadilan Negeri / Tinggi;", "Kejaksaan Negeri / Tinggi;", "Lembaga Bantuan Hukum."]} />
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-5">
                  <p className="text-gray-800 text-sm mb-3" style={{ fontWeight: 600 }}>Cara Memperoleh Bantuan Hukum</p>
                  <Prose>Untuk mendapatkan bantuan hukum, masyarakat wajib mempersiapkan:</Prose>
                  <div className="mt-3">
                    <BulletList items={CARA_MEMPEROLEH} />
                  </div>
                </div>
              </div>
            </Section>

            {/* Asas Pidana */}
            <Section id="asas-pidana" icon={Gavel} title="Asas Hukum dalam Perkara Pidana">
              <div className="space-y-3">
                <Prose>
                  Dalam proses peradilan pidana, dikenal asas-asas yang bertujuan untuk mendudukkan hukum pada tempat yang sebenarnya, antara lain berdasarkan UU No. 4 Tahun 2004 tentang Kekuasaan Kehakiman:
                </Prose>
                <div className="space-y-3 mt-2">
                  {ASAS_PIDANA.map((a, i) => (
                    <div key={i} className="flex items-start gap-3 rounded-xl p-4 border border-gray-100 bg-gray-50">
                      <div className="flex-shrink-0 mt-0.5">
                        <span className="inline-block bg-[#9A2109] text-white text-[10px] rounded-lg px-2 py-1" style={{ fontWeight: 700, whiteSpace: "nowrap" }}>{a.pasal}</span>
                      </div>
                      <p className="text-gray-600 text-sm" style={{ lineHeight: 1.7 }}>{a.teks}</p>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            {/* Asas Perdata */}
            <Section id="asas-perdata" icon={FileText} title="Asas Hukum dalam Perkara Perdata">
              <div className="space-y-3">
                <Prose>
                  Dalam proses peradilan perdata, dikenal asas-asas berdasarkan UU No. 4 Tahun 2004 dan Hukum Acara Perdata (HIR/RBG) yang bertujuan untuk melindungi kepentingan hukum para pihak yang berperkara:
                </Prose>
                <div className="mt-2">
                  <BulletList items={ASAS_PERDATA} />
                </div>
              </div>
            </Section>

            {/* CTA - pengajuan form */}
            <div className="rounded-2xl overflow-hidden shadow-sm"
              style={{ background: "linear-gradient(135deg,#9A2109 0%,#7B1A07 60%,#4A0E04 100%)" }}>
              <div className="p-6 md:p-8">
                <div className="flex items-start gap-4 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-white/15 flex items-center justify-center flex-shrink-0">
                    <Scale size={22} className="text-[#F9C784]" />
                  </div>
                  <div>
                    <p className="text-[#F9C784] text-xs mb-1 tracking-wide" style={{ fontWeight: 600 }}>LAYANAN ONLINE</p>
                    <h3 className="text-white" style={{ fontWeight: 800, fontSize: "1.15rem" }}>
                      Ajukan Permohonan Posbakum Online
                    </h3>
                    <p className="text-white/70 text-sm mt-1.5" style={{ lineHeight: 1.6 }}>
                      Tidak perlu datang ke kantor. Isi formulir permohonan secara online dan tim kami akan menghubungi Anda dalam 1×24 jam kerja.
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Link to="/hubungi/posbakum/form"
                    className="inline-flex items-center gap-2 bg-[#D4AF37] text-[#4A0E04] px-6 py-3 rounded-xl text-sm hover:bg-[#E8C847] transition-colors shadow"
                    style={{ fontWeight: 700 }}>
                    <FileText size={16} />Isi Formulir Permohonan
                  </Link>
                  <a href="https://wa.me/6281380828338" target="_blank" rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-white/15 text-white px-6 py-3 rounded-xl text-sm hover:bg-white/25 transition-colors"
                    style={{ fontWeight: 600 }}>
                    <Phone size={16} />Hubungi via WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right column – sticky sidebar */}
          <div className="space-y-4 lg:sticky lg:top-24">

            {/* LBH Info */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4" style={{ backgroundColor: "#9A2109" }}>
                <p className="text-[#F9C784] text-xs tracking-wide mb-0.5" style={{ fontWeight: 600 }}>LEMBAGA MITRA</p>
                <h3 className="text-white" style={{ fontWeight: 700, fontSize: "0.95rem" }}>LBH Adil Indonesia</h3>
              </div>
              <div className="p-5 space-y-3.5">
                <div className="flex items-start gap-2">
                  <Clock size={14} className="text-[#9A2109] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-gray-700 text-xs" style={{ fontWeight: 600 }}>Jam Layanan</p>
                    <p className="text-gray-700 text-xs">09:00 – 14:00 WIB</p>
                  </div>
                </div>
                <div className="border-t border-gray-100 pt-3 space-y-3">
                  {PETUGAS.map((p) => (
                    <div key={p.nama} className="flex items-start gap-2">
                      <Phone size={13} className="text-[#9A2109] flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-gray-700 text-xs" style={{ fontWeight: 600 }}>{p.nama}</p>
                        <a href={`https://wa.me/62${p.telp.replace(/^0/, "")}`}
                          target="_blank" rel="noopener noreferrer"
                          className="text-[#9A2109] text-xs hover:underline">{p.telp}</a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Kontak PN */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Kontak PN Purworejo</h3>
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

            {/* Info penting */}
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
              <div className="flex items-start gap-2 mb-3">
                <AlertCircle size={16} className="text-amber-600 flex-shrink-0 mt-0.5" />
                <p className="text-amber-800 text-sm" style={{ fontWeight: 700 }}>Perlu Diperhatikan</p>
              </div>
              <ul className="space-y-2">
                {[
                  "Layanan hanya untuk masyarakat tidak mampu secara ekonomi.",
                  "Siapkan SKTM/KKM dari Kelurahan/Desa.",
                  "Bawa fotokopi KTP yang masih berlaku.",
                  "Konsultasi bersifat rahasia dan gratis.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="text-amber-600 text-xs mt-1 flex-shrink-0">•</span>
                    <p className="text-amber-700 text-xs" style={{ lineHeight: 1.65 }}>{item}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Daftar isi */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-50">
                <h3 className="text-gray-800" style={{ fontWeight: 700, fontSize: "0.95rem" }}>Daftar Isi</h3>
              </div>
              <div className="p-5">
                <ul className="space-y-1.5">
                  {[
                    ["pendahuluan", "Pendahuluan"],
                    ["dasar-hukum", "Dasar Pemberian Bantuan Hukum"],
                    ["tujuan", "Tujuan Program"],
                    ["pengertian", "Pengertian Bantuan Hukum"],
                    ["pembela", "Pembela (Advokat)"],
                    ["masyarakat", "Masyarakat Terperkara"],
                    ["cara-memperoleh", "Cara Memperoleh"],
                    ["asas-pidana", "Asas Hukum Pidana"],
                    ["asas-perdata", "Asas Hukum Perdata"],
                  ].map(([id, label]) => (
                    <li key={id}>
                      <a href={`#${id}`}
                        className="flex items-center gap-2 text-xs text-gray-600 hover:text-[#9A2109] transition-colors py-0.5"
                        style={{ lineHeight: 1.5 }}>
                        <ChevronRight size={12} className="text-[#9A2109] flex-shrink-0" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Tombol ajukan */}
            <Link to="/hubungi/posbakum/form"
              className="flex items-center justify-center gap-2 text-white py-4 rounded-2xl shadow transition-colors w-full"
              style={{ backgroundColor: "#9A2109", fontWeight: 700 }}>
              <FileText size={17} />Ajukan Permohonan Sekarang
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
