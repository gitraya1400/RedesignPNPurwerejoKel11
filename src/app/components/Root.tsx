import { useState, useCallback } from "react";
import { Outlet } from "react-router";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { ExternalModal } from "./ExternalModal";
import { SearchOverlay } from "./SearchOverlay";
import { FloatingHelp } from "./FloatingHelp";

export interface OutletCtx {
  onExternalLink: (url: string, label: string) => void;
}

export function Root() {
  const [searchOpen, setSearchOpen] = useState(false);
  const [externalModal, setExternalModal] = useState({ open: false, url: "", label: "" });

  const onExternalLink = useCallback((url: string, label: string) => {
    setExternalModal({ open: true, url, label });
  }, []);

  return (
    <div style={{ fontFamily: "'Inter', 'Roboto', sans-serif" }}>
      <Header onSearchOpen={() => setSearchOpen(true)} />

      <Outlet context={{ onExternalLink } satisfies OutletCtx} />

      <Footer />
      <FloatingHelp />

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
      <ExternalModal
        open={externalModal.open}
        label={externalModal.label}
        onClose={() => setExternalModal(s => ({ ...s, open: false }))}
        onConfirm={() => setExternalModal(s => ({ ...s, open: false }))}
      />
    </div>
  );
}
