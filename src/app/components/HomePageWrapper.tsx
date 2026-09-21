import { useOutletContext } from "react-router";
import { HomePage } from "./HomePage";
import type { OutletCtx } from "./Root";

export function HomePageWrapper() {
  const { onExternalLink } = useOutletContext<OutletCtx>();
  return <HomePage onExternalLink={onExternalLink} />;
}
