import { Chip, Logo } from "@/components/ui";
import {
  ActionsSection,
  CardsSection,
  CompositionSection,
  FormsSection,
  MotionSection,
  NavigationSection,
} from "../_sections/components";
import { ColorSection, FoundationsSection, LogicSection, TypeSection } from "../_sections/foundations";
import type { DesignTheme } from "../themes";

const sections = [
  ["logic", "Logic"],
  ["color", "Color"],
  ["type", "Type"],
  ["foundations", "Foundations"],
  ["actions", "Actions"],
  ["cards", "Cards"],
  ["forms", "Forms"],
  ["navigation", "Nav"],
  ["motion", "Motion"],
  ["composition", "In use"],
  ["open", "Open items"],
];

const openItems = [
  { item: "Logo", detail: "Keep or refresh it. The wordmark here is typeset until SVG files arrive.", source: "§10, §11" },
  { item: "Heading font", detail: "Confirm Space Grotesk, or switch to Sora or Satoshi.", source: "§3" },
  { item: "Arabic", detail: "Is right-to-left needed now or later? It affects layout and font choice.", source: "§11" },
  { item: "Proof points", detail: "Supply public numbers, or the proof strip is left out.", source: "§6.6, §11" },
  { item: "Imagery", detail: "Supply renders of the three products and four team portraits.", source: "§10" },
  { item: "Labeled emails", detail: "Supply the sales, careers and general addresses.", source: "§11" },
  { item: "Draft copy", detail: "Approve the demo next-steps and form messages written for this page.", source: "§6, §7" },
];

export function DesignSystem({ theme }: { theme: DesignTheme }) {
  const allOpenItems = [{ item: "Final palette", detail: theme.paletteOpenItem, source: "§11" }, ...openItems];

  return (
    <div className={`min-h-screen overflow-x-clip bg-night text-fg ${theme.rootClass}`}>
      <div className="sticky top-0 z-20 border-b border-line bg-night/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-content items-center gap-6 px-4 sm:px-6 lg:px-8">
          <Logo className="hidden shrink-0 lg:block" />
          <nav aria-label="Design system sections" className="min-w-0 flex-1">
            <ul className="flex gap-1 overflow-x-auto py-2 font-mono text-label whitespace-nowrap text-muted lg:justify-end">
              {sections.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="inline-flex min-h-8 items-center rounded-sm px-2 transition-colors hover:bg-raised hover:text-fg">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>

      <main>
        <header className="relative overflow-hidden">
          <div className="bg-lines fade-out absolute inset-0" />
          <div className="glow-accent absolute -top-48 -left-56 size-[26rem] md:-top-40 md:-left-32 md:size-[40rem]" />
          <div className="glow-alt absolute -top-32 -right-60 size-[26rem] md:-top-20 md:-right-40 md:size-[40rem]" />
          <div className="relative mx-auto max-w-content px-4 pt-20 pb-20 sm:px-6 lg:px-8 lg:pt-32 lg:pb-28">
            <Chip tone="accent">{theme.chip}</Chip>
            <h1 className="mt-6 max-w-4xl text-display">Olive Labs design system</h1>
            <p className="mt-6 max-w-2xl text-body-lg text-muted">
              {theme.intro}
            </p>
            <dl className="mt-12 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
              {theme.facts.map(([term, value]) => (
                <div key={term} className="bg-night/90 p-4">
                  <dt className="font-mono text-label text-muted">{term}</dt>
                  <dd className="mt-1 text-small text-fg">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </header>

        <LogicSection theme={theme} />
        <ColorSection theme={theme} />
        <TypeSection />
        <FoundationsSection theme={theme} />
        <ActionsSection theme={theme} />
        <CardsSection theme={theme} />
        <FormsSection />
        <NavigationSection />
        <MotionSection theme={theme} />
        <CompositionSection />

        <section id="open" aria-labelledby="open-title" className="border-t border-line py-20 lg:py-28">
          <div className="mx-auto max-w-content px-4 sm:px-6 lg:px-8">
            <header className="mb-12 grid gap-x-8 gap-y-4 lg:grid-cols-12">
              <p className="font-mono text-label text-accent uppercase lg:col-span-3 lg:pt-3">11 / Open items</p>
              <div className="lg:col-span-9">
                <h2 id="open-title" className="text-h2">What this system still needs.</h2>
                <p className="mt-4 max-w-2xl text-body-lg text-muted">Decisions and assets to get from Olive Labs before high-fidelity designs start.</p>
              </div>
            </header>
            <ul className="grid border-t border-line md:grid-cols-2 md:gap-x-12">
              {allOpenItems.map((entry) => (
                <li key={entry.item} className="flex gap-4 border-b border-line py-5">
                  <div className="min-w-0 flex-1">
                    <p className="font-display text-h4 font-medium">{entry.item}</p>
                    <p className="mt-1 text-small text-muted">{entry.detail}</p>
                  </div>
                  <p className="font-mono text-label text-muted">{entry.source}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
