import { SplitButton } from "@/components/split-button";
import { Chip, Logo } from "@/components/ui";
import type { DesignTheme } from "../themes";
import { NotchCard, NotchCardDefs, type NotchCardVariant } from "./notch-card";

const families = [
  { name: "Space Grotesk", role: "Headings", className: "font-display" },
  { name: "Inter", role: "Body", className: "font-sans" },
  { name: "JetBrains Mono", role: "Labels", className: "font-mono" },
];

const cards: { label: string; variant: NotchCardVariant; image: string; tag: string; title: string; text: string }[] = [
  { label: "White border", variant: "border", image: "/cards/ai-software.png", tag: "Enterprise AI", title: "AI software", text: "Custom applications and intelligent automation." },
  { label: "Accent border", variant: "accent", image: "/cards/robotics.png", tag: "Autonomous systems", title: "Robotics", text: "Fleet orchestration and autonomous solutions." },
  { label: "Light mode", variant: "light", image: "/cards/deep-tech.png", tag: "Long-horizon R&D", title: "Deep-tech R&D", text: "Research across AI, hardware and embedded systems." },
];

const fields = [
  { id: "name", label: "Name", placeholder: "Your name", type: "text" },
  { id: "email", label: "Work email", placeholder: "you@company.com", type: "email" },
  { id: "company", label: "Company", placeholder: "Company name", type: "text" },
];

const pageClasses = "relative flex min-h-svh flex-col gap-8 overflow-hidden";
const innerClasses = "relative mx-auto flex w-full max-w-content flex-1 flex-col gap-8 px-4 py-8 sm:px-6 lg:px-8";

function Label({ children }: { children: string }) {
  return <p className="mb-3 font-mono text-label text-muted">{children}</p>;
}

/** A two-screen overview for clients: colors, type and buttons, then cards and the form. */
export function DesignSheet({ theme }: { theme: DesignTheme }) {
  return (
    <main className={`bg-night text-fg ${theme.rootClass}`}>
      <NotchCardDefs />

      <section aria-labelledby="look-title" className={pageClasses}>
        <div className="bg-lines fade-out absolute inset-0" />
        <div className="glow-accent absolute -top-48 -left-40 size-[36rem]" />
        <div className="glow-alt absolute -top-32 -right-40 size-[36rem]" />
        <div className={innerClasses}>
          <div className="flex items-center justify-between gap-4">
            <Logo className="text-h3" />
            <p className="font-mono text-label text-muted">Design system</p>
          </div>

          <div>
            <h1 id="look-title" className="text-h1">Colors, type and buttons</h1>
            <p className="mt-3 text-body-lg text-muted">{theme.color.title}</p>
          </div>

          <ul className="grid flex-1 grid-cols-2 gap-4 sm:grid-cols-3 lg:flex">
            {theme.color.rows.flat().map((color) => (
              <li key={color.token} className="flex min-w-0 flex-1 flex-col">
                <div className="min-h-28 flex-1 rounded-lg border border-line-strong" style={{ backgroundColor: color.hex }} />
                <p className="mt-3 text-small font-medium">{color.name}</p>
                <p className="font-mono text-label text-muted">{color.hex}</p>
              </li>
            ))}
          </ul>

          <ul className="grid gap-4 md:grid-cols-3">
            {families.map((family) => (
              <li key={family.name} className="flex items-center gap-5 rounded-lg border border-line bg-surface p-5">
                <p className={`text-[3.5rem] leading-none ${family.className}`}>Aa</p>
                <div className="min-w-0">
                  <p className={`text-h4 ${family.className}`}>{family.name}</p>
                  <p className="text-small text-muted">{family.role}</p>
                </div>
              </li>
            ))}
          </ul>

          <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
            <ul className="flex flex-wrap gap-2">
              {cards.map(({ label, variant }) => (
                <li key={variant}>
                  <Label>{label}</Label>
                  <div className={`rounded-lg p-3 ${variant === "light" ? "bg-fg" : ""}`}>
                    <SplitButton variant={variant}>Request a demo</SplitButton>
                  </div>
                </li>
              ))}
            </ul>
            <div>
              <Label>Tags</Label>
              <div className="flex min-h-11 flex-wrap items-center gap-3 py-3">
                <Chip tone="accent">Robotics-as-a-service</Chip>
                <Chip tone="alt">Healthcare · IoT</Chip>
                <Chip>Computer vision</Chip>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="cards" aria-labelledby="components-title" className={`${pageClasses} border-t border-line`}>
        <div className={`${innerClasses} justify-center`}>
          <h2 id="components-title" className="text-h1">Cards and form</h2>

          <ul className="notch-card-grid grid gap-4 md:grid-cols-3">
            {cards.map(({ label, ...card }) => (
              <li key={card.variant}>
                <Label>{label}</Label>
                <div className={`rounded-lg p-4 ${card.variant === "light" ? "bg-fg" : ""}`}>
                  <NotchCard href="#cards" {...card} />
                </div>
              </li>
            ))}
          </ul>

          <div>
            <Label>Form</Label>
            <div className="glass grid items-end gap-4 border-2 border-fg p-6 before:hidden md:grid-cols-[1fr_1fr_1fr_auto]">
              {fields.map((field) => (
                <div key={field.id}>
                  <label htmlFor={field.id} className="mb-2 block text-small font-medium">{field.label}</label>
                  <input id={field.id} type={field.type} className="field" placeholder={field.placeholder} autoComplete="off" />
                </div>
              ))}
              <SplitButton>Request a demo</SplitButton>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
