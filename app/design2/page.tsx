import type { Metadata } from "next";
import { DesignSheet } from "../design/_components/design-sheet";
import { oliveTheme } from "../design/themes";

export const metadata: Metadata = {
  title: "Design System, Olive Palette | Olive Labs",
  description: "The Olive Labs design system in the colors of olivelab.tech, with cream in place of white.",
  robots: { index: false, follow: false },
};

export default function Design2Page() {
  return <DesignSheet theme={oliveTheme} />;
}
