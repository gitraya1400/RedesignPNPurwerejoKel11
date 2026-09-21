import { Hero } from "./Hero";
import { QuickLinks } from "./QuickLinks";
import { JadwalSidang } from "./JadwalSidang";
import { NewsSection } from "./NewsSection";
import { FAQ } from "./FAQ";

interface HomePageProps {
  onExternalLink: (url: string, label: string) => void;
}

export function HomePage({ onExternalLink }: HomePageProps) {
  return (
    <main>
      <Hero onExternalLink={onExternalLink} />
      <QuickLinks onExternalLink={onExternalLink} />
      <JadwalSidang onExternalLink={onExternalLink} />
      <NewsSection />
      <FAQ />
    </main>
  );
}
