import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { HomePageWrapper } from "./components/HomePageWrapper";
import { PosbakumInfoPage } from "./components/PosbakumInfoPage";
import { PosbakumPage } from "./components/PosbakumPage";
import { GoInfoPage } from "./components/GoInfoPage";
import { ComingSoonPage } from "./components/ComingSoonPage";
import { JadwalSidangPage } from "./components/JadwalSidangPage";
import { PanduanAlurPage } from "./components/PanduanAlurPage";
import { FormPPIDPage } from "./components/FormPPIDPage";
import { HasilPencarianPage } from "./components/HasilPencarianPage";
import { TentangPengadilanPage } from "./components/TentangPengadilanPage";
import { LayananPublikPage } from "./components/LayananPublikPage";
import { BeritaPage } from "./components/BeritaPage";
import { HubungiKamiPage } from "./components/HubungiKamiPage";
import { ReformasiBirokrasiPage } from "./components/ReformasiBirokrasiPage";
import { LayananHukumPage } from "./components/LayananHukumPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: HomePageWrapper },

      // ── Formulir (specific, registered first) ───────────────────────────
      { path: "hubungi/posbakum", Component: PosbakumInfoPage },
      { path: "hubungi/posbakum/form", Component: PosbakumPage },
      { path: "hubungi/goinfo", Component: GoInfoPage },
      { path: "formulir/ppid", Component: FormPPIDPage },

      // ── Jadwal Sidang & Pencarian ────────────────────────────────────────
      { path: "jadwal-sidang", Component: JadwalSidangPage },
      { path: "pencarian", Component: HasilPencarianPage },

      // ── Tentang Pengadilan (wildcard — catches all sub-paths) ────────────
      { path: "tentang-pengadilan/*", Component: TentangPengadilanPage },

      // ── Layanan Publik ───────────────────────────────────────────────────
      { path: "layanan-publik/*", Component: LayananPublikPage },

      // ── Layanan Hukum ────────────────────────────────────────────────────
      { path: "layanan-hukum/panduan-alur-berperkara", Component: PanduanAlurPage },
      { path: "layanan-hukum/layanan-hukum-bagi-masyarakat-kurang-mampu/prosedur-pembebasan-biaya-perkara-prodeo", Component: LayananHukumPage },
      { path: "layanan-hukum/peraturan-dan-kebijakan", Component: LayananHukumPage },
      { path: "layanan-hukum/zitting-plaats", Component: LayananHukumPage },
      { path: "layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/prosedur-pengajuan-perkara", Component: LayananHukumPage },
      { path: "layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/biaya-perkara", Component: LayananHukumPage },
      { path: "layanan-hukum/prosedur-pengajuan-perkara-dan-biaya-perkara/pengumuman-sisa-panjar-biaya-perkara", Component: LayananHukumPage },
      { path: "layanan-hukum/prosedur-eksekusi", Component: LayananHukumPage },

      // ── Berita ────────────────────────────────────────────────────────────
      { path: "berita/*", Component: BeritaPage },

      // ── Hubungi Kami ──────────────────────────────────────────────────────
      { path: "hubungi-kami/*", Component: HubungiKamiPage },

      // ── Reformasi Birokrasi ───────────────────────────────────────────────
      { path: "reformasi-birokrasi/*", Component: ReformasiBirokrasiPage },

      // ── Catch-all ─────────────────────────────────────────────────────────
      { path: "*", Component: ComingSoonPage },
    ],
  },
]);
