import type { Metadata } from "next";
import { ScrollReveal } from "../demo3/_components/scroll-reveal";
import { Sections } from "../demo3/_components/sections";
import { SiteNav } from "../demo3/_components/site-nav";

export const metadata: Metadata = {
  title: "Demo | Olive Labs",
  description: "Enterprise AI, robotics and deep-tech solutions from Olive Labs in Dubai.",
  robots: { index: false, follow: false },
};

/**
 * The /demo3 page in the default palette from /design. Both pages share these components.
 * The default colors need no theme of their own, so .theme-brief only adds light mode.
 */
export default function DemoPage() {
  return (
    <div data-mode="dark" className="lg-page theme-brief bg-night text-fg">
      <SiteNav />
      <Sections />
      <ScrollReveal />
    </div>
  );
}
