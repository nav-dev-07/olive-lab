import type { Metadata } from "next";
import { DesignSheet } from "./_components/design-sheet";
import { briefTheme } from "./themes";

export const metadata: Metadata = {
  title: "Design System | Olive Labs",
  description: "Colors, typography, cards and components for the Olive Labs redesign.",
  robots: { index: false, follow: false },
};

export default function DesignPage() {
  return <DesignSheet theme={briefTheme} />;
}
