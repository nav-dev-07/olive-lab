import type { Metadata } from "next";
import { DesignSheet } from "../design/_components/design-sheet";
import { greenTheme } from "../design/themes";

export const metadata: Metadata = {
  title: "Design System, Green Palette | Olive Labs",
  description: "The Olive Labs design system in a black and silver palette with a green accent.",
  robots: { index: false, follow: false },
};

export default function Design3Page() {
  return <DesignSheet theme={greenTheme} />;
}
