import type { Metadata } from "next";
import { ScrollReveal } from "./_components/scroll-reveal";
import { Sections } from "./_components/sections";
import { SiteNav } from "./_components/site-nav";

export const metadata: Metadata = {
  title: "Demo 3 | Olive Labs",
  description: "Enterprise AI, robotics and deep-tech solutions from Olive Labs in Dubai.",
  robots: { index: false, follow: false },
};

export default function Demo3Page() {
  return (
    <div data-mode="dark" className="lg-page theme-green bg-night text-fg">
      <SiteNav />
      <Sections />
      <ScrollReveal />
    </div>
  );
}
