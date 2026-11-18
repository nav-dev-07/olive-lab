import type { Metadata } from "next";
import { ScrollReveal } from "../demo3/_components/scroll-reveal";
import { Sections } from "../demo3/_components/sections";
import { SiteNav } from "../demo3/_components/site-nav";

export const metadata: Metadata = {
  title: "Demo 2 | Olive Labs",
  description: "Enterprise AI, robotics and deep-tech solutions from Olive Labs in Dubai.",
  robots: { index: false, follow: false },
};

/** The /demo3 page in the olive palette from /design2. Both pages share these components. */
export default function Demo2Page() {
  return (
    <div data-mode="dark" className="lg-page theme-olive bg-night text-fg">
      <SiteNav />
      <Sections />
      <ScrollReveal />
    </div>
  );
}
