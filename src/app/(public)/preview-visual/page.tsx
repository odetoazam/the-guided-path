import type { Metadata } from "next";
import SurahArchitecture from "@/data/visual/surah-97";
import { CANONICAL_URL } from "@/lib/constants";

// Internal preview of a surah visual — not for search.
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  alternates: { canonical: `${CANONICAL_URL}/preview-visual` },
};

export default function PreviewVisual() {
  return <SurahArchitecture />;
}
