import {
  ArrowIcon,
  Button,
  Chip,
  CloseIcon,
  Logo,
  MenuIcon,
  PrototypeIcon,
  ResearchIcon,
  RobotIcon,
  SoftwareIcon,
  StudioIcon,
  VisionIcon,
} from "@/components/ui";
import { CountUp, RevealDemo, Ticker } from "../_components/interactive";
import { Group, Section } from "../_components/layout";
import type { DesignTheme } from "../themes";
import { motionRules } from "../tokens";

const tickerItems = [
  "Enterprise AI",
  "Prototype Development",
  "Workflow Automation",
  "Business Intelligence",
  "AI Document Processing",
  "Healthcare Operations",
  "Customer Support AI",
  "Adaptive Learning",
  "R&D Partnerships",
  "Custom Engineering",
];

const navLinks = ["About", "Products", "Technology", "Projects", "Team", "Careers", "Contact"];

export function ActionsSection({ theme }: { theme: DesignTheme }) {
  return (
    <Section
      id="actions"
      index="05"
      eyebrow="Actions and tags"
      title={theme.actionsTitle}
      lede="Only the primary button uses a solid accent fill. If a screen has two, one of them is wrong."
    >
      <Group title="Buttons" source="Brief §6, §8">
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Button states">
          <table className="w-full min-w-[46rem] text-left">
            <thead className="font-mono text-label text-muted">
              <tr>
                <td className="pb-4" />
                {["Default", "Hover", "Focus", "Disabled"].map((state) => (
                  <th key={state} scope="col" className="pb-4 font-normal">{state}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(
                [
                  ["Primary", "primary", "Request a demo"],
                  ["Secondary", "secondary", "Explore products"],
                  ["Ghost", "ghost", "Learn more"],
                ] as const
              ).map(([label, variant, text]) => (
                <tr key={variant} className="border-t border-line">
                  <th scope="row" className="py-5 pe-6 font-mono text-label font-normal text-muted">{label}</th>
                  <td className="py-5 pe-6"><Button variant={variant} arrow={variant === "ghost"}>{text}</Button></td>
                  <td className="py-5 pe-6"><Button variant={variant} arrow={variant === "ghost"} className="is-hover" tabIndex={-1}>{text}</Button></td>
                  <td className="py-5 pe-6"><Button variant={variant} arrow={variant === "ghost"} className="is-focus" tabIndex={-1}>{text}</Button></td>
                  <td className="py-5"><Button variant={variant} arrow={variant === "ghost"} disabled>{text}</Button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4 text-small text-muted">Hover a live button in the Default column to see the light sweep. Minimum target height is 44px.</p>
      </Group>

      <Group title="Tags" source="Brief §6, §7">
        <div className="flex flex-wrap gap-3">
          <Chip tone="accent">Robotics-as-a-service</Chip>
          <Chip tone="alt">Healthcare · IoT</Chip>
          <Chip tone="alt">Robotics · long-horizon</Chip>
          <Chip>Tech stack chip</Chip>
          <Chip tone="highlight">Highlight</Chip>
        </div>
      </Group>

      <Group title="Capability ticker" source="Brief §6.3, §8" note="Mono chips. Pauses on hover and keyboard focus. The Pause button covers touch and keyboard users, and it disappears when reduced motion is on, because the chips no longer move.">
        <Ticker items={tickerItems} />
      </Group>
    </Section>
  );
}

const services = [
  { title: "AI software development", icon: SoftwareIcon, text: "Custom enterprise AI applications, intelligent automation and data-driven products built for Dubai and UAE businesses." },
  { title: "Robotics & autonomous systems", icon: RobotIcon, text: "Robotics engineering, fleet orchestration and autonomous solutions for inspection, logistics and smart services." },
  { title: "Computer vision & perception", icon: VisionIcon, text: "Edge video analytics, object detection and industrial inspection systems for real-time decision-making." },
  { title: "Deep-tech R&D", icon: ResearchIcon, text: "Long-horizon research programs that combine AI, hardware, embedded systems and advanced manufacturing." },
];

const work = [
  { title: "RaaS Platform", tag: "Robotics-as-a-service", tone: "accent" as const },
  { title: "Smart Pill Dispenser", tag: "Healthcare · IoT", tone: "alt" as const },
  { title: "Humanoid Robotics Platform", tag: "Robotics · long-horizon", tone: "alt" as const },
];

const team = [
  { name: "Sivaibala K", title: "Co-Founder & Technical Lead", initials: "SK" },
  { name: "Shriyansh Thammineni", title: "Co-Founder & Research Lead", initials: "ST" },
  { name: "Krishna Koushik", title: "Operations Manager", initials: "KK" },
  { name: "Ram Shankar Reddy", title: "Chief Strategy Officer", initials: "RR" },
];

const stats = [
  { value: 24, suffix: "", label: "Projects delivered" },
  { value: 12, suffix: "", label: "Prototypes built" },
  { value: 5, suffix: "+", label: "Years of R&D" },
];

export function CardsSection({ theme }: { theme: DesignTheme }) {
  return (
    <Section
      id="cards"
      index="06"
      eyebrow="Cards"
      title="Glass at rest. Glow on hover only."
      lede={theme.cards.lede}
    >
      <Group title="Card recipe" source="Brief §3, §8">
        <div className="relative overflow-hidden rounded-lg border border-line p-4 sm:p-8">
          <div className="bg-dots fade-out absolute inset-0" />
          <div className="glow-alt absolute top-0 right-0 size-72" />
          <ul className="relative grid gap-4 sm:grid-cols-3">
            <li className="glass p-5">
              <p className="font-mono text-label text-muted">State</p>
              <p className="mt-8 font-display text-h4 font-medium">At rest</p>
              <p className="mt-1 text-small text-muted">Gradient border. No glow.</p>
            </li>
            <li className="glass glass-accent is-hover p-5">
              <p className="font-mono text-label text-accent">State</p>
              <p className="mt-8 font-display text-h4 font-medium">{theme.cards.accentLabel}</p>
              <p className="mt-1 text-small text-muted">{theme.cards.accentNote}</p>
            </li>
            <li className="glass glass-alt is-hover p-5">
              <p className="font-mono text-label text-accent-2-soft">State</p>
              <p className="mt-8 font-display text-h4 font-medium">{theme.cards.altLabel}</p>
              <p className="mt-1 text-small text-muted">{theme.cards.altNote}</p>
            </li>
          </ul>
        </div>
      </Group>

      <Group title="Pillar card" source="Brief §6.4, large glass with animated icon">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="glass glass-accent p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <PrototypeIcon className="size-12 text-accent" />
              <p className="font-mono text-label text-muted">01</p>
            </div>
            <h4 className="mt-16 text-h3">
              <a href="#cards" className="stretched">Prototype Development</a>
            </h4>
            <p className="mt-3 text-muted">Rapid prototyping for robotic and AI concepts — validate hardware, autonomy and conversational experiences.</p>
          </li>
          <li className="glass glass-alt p-6 sm:p-8">
            <div className="flex items-start justify-between">
              <StudioIcon className="size-12 text-accent-2-edge" />
              <p className="font-mono text-label text-muted">02</p>
            </div>
            <h4 className="mt-16 text-h3">
              <a href="#cards" className="stretched">Deep-tech Studio</a>
            </h4>
            <p className="mt-3 text-muted">Robotics, autonomous systems, computer vision and healthcare hardware — long-horizon engineering.</p>
          </li>
        </ul>
      </Group>

      <Group title="Service card" source="Brief §6.5, icon, description, arrow link">
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map(({ title, text, icon: ServiceIcon }) => (
            <li key={title} className="glass glass-accent flex flex-col p-5">
              <ServiceIcon className="size-7 text-accent" />
              <h4 className="mt-8 text-h4">
                <a href="#cards" className="stretched">{title}</a>
              </h4>
              <p className="mt-2 flex-1 text-small text-muted">{text}</p>
              <ArrowIcon className="mt-6 size-5 text-accent" />
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Proof strip" source="Brief §6.6" note="Counts up once on entry. These numbers are samples to show the layout. Olive Labs supplies the real values, and the section is left out if there are none.">
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
          {stats.map((stat) => (
            <li key={stat.label} className="bg-night p-6">
              <p className="font-mono text-h1 text-fg"><CountUp value={stat.value} suffix={stat.suffix} /></p>
              <p className="mt-2 font-mono text-label text-muted">{stat.label}</p>
              <Chip className="mt-4">Sample value</Chip>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Work card" source="Brief §6.7, large image with category tag" note="The dotted panels hold the space for real product renders from Olive Labs. No stock imagery goes here.">
        <ul className="grid gap-4 md:grid-cols-3">
          {work.map((item) => (
            <li key={item.title} className={`glass ${item.tone === "accent" ? "glass-accent" : "glass-alt"} overflow-hidden`}>
              <div className="render-slot flex aspect-[4/3] items-end rounded-t-lg p-4">
                <p className="font-mono text-label text-muted">Render required</p>
              </div>
              <div className="p-5">
                <Chip tone={item.tone}>{item.tag}</Chip>
                <h4 className="mt-4 text-h3">
                  <a href="#cards" className="stretched">{item.title}</a>
                </h4>
              </div>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Team card" source="Brief §6.8, portrait, name, title, LinkedIn">
        <ul className="grid grid-cols-1 gap-4 min-[420px]:grid-cols-2 lg:grid-cols-4">
          {team.map((person) => (
            <li key={person.name} className="glass glass-accent overflow-hidden">
              <div className="render-slot flex aspect-square items-center justify-center rounded-t-lg">
                <span aria-hidden="true" className="font-display text-h1 text-muted">{person.initials}</span>
              </div>
              <div className="p-4">
                <h4 className="text-h4">{person.name}</h4>
                <p className="mt-1 text-small text-muted">{person.title}</p>
                <a href="#cards" className="mt-3 inline-block font-mono text-label text-accent underline-offset-4 hover:underline">
                  LinkedIn<span className="sr-only"> profile of {person.name}</span>
                </a>
              </div>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Product card" source="Brief §7, tagline, 3 capabilities, two actions" note="Capability copy is waiting on Olive Labs (§11).">
        <article className="glass glass-accent grid overflow-hidden md:grid-cols-2">
          <div className="render-slot flex min-h-56 items-end rounded-t-lg p-4 md:rounded-s-lg md:rounded-tr-none">
            <p className="font-mono text-label text-muted">Render required</p>
          </div>
          <div className="p-6 sm:p-8">
            <Chip tone="accent">Robotics-as-a-service</Chip>
            <h4 className="mt-4 text-h3">RaaS Platform</h4>
            <p className="mt-2 text-muted">Deploy robotic fleets and services as a subscription.</p>
            <ul className="mt-6 space-y-2 border-t border-line pt-4 font-mono text-label text-muted">
              <li>01 Key capability, copy pending</li>
              <li>02 Key capability, copy pending</li>
              <li>03 Key capability, copy pending</li>
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button href="#cards" variant="secondary">Learn more</Button>
              <Button href="#cards">Request demo</Button>
            </div>
          </div>
        </article>
      </Group>
    </Section>
  );
}

function FieldShell({ id, label, hint, error, children }: { id: string; label: string; hint?: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-small font-medium text-fg">{label}</label>
      {children}
      {error ? <p id={`${id}-error`} className="mt-2 text-small text-danger">{error}</p> : null}
      {hint ? <p className="mt-2 text-small text-muted">{hint}</p> : null}
    </div>
  );
}

const interests = ["AI software", "Robotics", "Computer vision", "R&D partnership", "Other"];

const nextSteps = ["We read your request.", "We confirm the right people and a time.", "We run the demo with you."];

export function FormsSection() {
  return (
    <Section
      id="forms"
      index="07"
      eyebrow="Forms"
      title="Short form, clear states."
      lede="The Request Demo form is the main conversion point. Labels stay visible, and errors say how to fix the problem."
    >
      <Group title="Request demo layout" source="Brief §7" note="A visual specimen, so it doesn't send anything. The next-steps copy is a draft for approval, and the response time is still to be confirmed.">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <form className="glass grid gap-5 p-5 sm:grid-cols-2 sm:p-8" aria-label="Request demo specimen">
            <FieldShell id="demo-name" label="Name">
              <input id="demo-name" className="field" autoComplete="off" placeholder="Your name" />
            </FieldShell>
            <FieldShell id="demo-email" label="Work email">
              <input id="demo-email" type="email" className="field" autoComplete="off" placeholder="you@company.com" />
            </FieldShell>
            <FieldShell id="demo-company" label="Company">
              <input id="demo-company" className="field" autoComplete="off" placeholder="Company name" />
            </FieldShell>
            <FieldShell id="demo-role" label="Role">
              <input id="demo-role" className="field" autoComplete="off" placeholder="Your role" />
            </FieldShell>
            <div className="sm:col-span-2">
              <FieldShell id="demo-interest" label="Interest">
                <select id="demo-interest" className="field" defaultValue="AI software">
                  {interests.map((interest) => (
                    <option key={interest} className="bg-surface text-fg">{interest}</option>
                  ))}
                </select>
              </FieldShell>
            </div>
            <div className="sm:col-span-2">
              <FieldShell id="demo-message" label="Message">
                <textarea id="demo-message" rows={4} className="field" placeholder="What would you like to see?" />
              </FieldShell>
            </div>
            <div className="sm:col-span-2">
              <Button arrow className="w-full sm:w-auto">Request a demo</Button>
            </div>
          </form>

          <aside className="lg:pt-8">
            <h4 className="font-mono text-label font-normal text-muted">What happens next</h4>
            <ol className="mt-4 border-t border-line">
              {nextSteps.map((step, index) => (
                <li key={step} className="flex gap-4 border-b border-line py-4">
                  <span className="font-mono text-label text-accent">0{index + 1}</span>
                  <span className="text-small">{step}</span>
                </li>
              ))}
            </ol>
            <p className="mt-4 font-mono text-label text-muted">Response time: to be confirmed</p>
          </aside>
        </div>
      </Group>

      <Group title="Field states" source="Brief §7, §9">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <FieldShell id="state-default" label="Default">
            <input id="state-default" className="field" defaultValue="" placeholder="Placeholder" autoComplete="off" />
          </FieldShell>
          <FieldShell id="state-focus" label="Focus">
            <input id="state-focus" className="field is-focus" defaultValue="Olive Labs" autoComplete="off" />
          </FieldShell>
          <FieldShell id="state-error" label="Error" error="Enter a work email, like you@company.com.">
            <input id="state-error" type="text" className="field" defaultValue="name@" aria-invalid="true" aria-describedby="state-error-error" autoComplete="off" />
          </FieldShell>
          <FieldShell id="state-valid" label="Valid" hint="Looks good.">
            <input id="state-valid" className="field" defaultValue="you@company.com" data-valid="true" autoComplete="off" />
          </FieldShell>
        </div>
      </Group>

      <Group title="Form outcomes" source="Brief §9, success and error states">
        <ul className="grid gap-4 md:grid-cols-2">
          <li className="rounded-lg border border-highlight/35 bg-highlight/5 p-5">
            <p className="font-mono text-label text-highlight">Success</p>
            <p className="mt-3 font-display text-h4 font-medium">Request received.</p>
            <p className="mt-1 text-small text-muted">We&apos;ll reply to your work email.</p>
          </li>
          <li className="rounded-lg border border-danger/40 bg-danger/5 p-5">
            <p className="font-mono text-label text-danger">Error</p>
            <p className="mt-3 font-display text-h4 font-medium">Your request didn&apos;t send.</p>
            <p className="mt-1 text-small text-muted">Your details are still here. Try again in a moment.</p>
          </li>
        </ul>
      </Group>
    </Section>
  );
}

function HeaderSpecimen({ scrolled }: { scrolled?: boolean }) {
  return (
    <div className={`flex items-center justify-between gap-4 px-4 py-3 sm:px-6 ${scrolled ? "border-b border-line-strong bg-night/60 backdrop-blur-md" : ""}`}>
      <Logo className="text-h4" />
      <ul className="hidden items-center gap-6 text-small text-fg lg:flex">
        {navLinks.map((link) => (
          <li key={link}>
            <a href="#navigation" className="transition-colors hover:text-accent">{link}</a>
          </li>
        ))}
      </ul>
      <div className="flex items-center gap-2">
        <Button href="#navigation" className="px-3 sm:px-5">Request demo</Button>
        <button type="button" aria-label="Open menu" className="grid size-11 cursor-pointer place-items-center rounded-md text-fg lg:hidden">
          <MenuIcon />
        </button>
      </div>
    </div>
  );
}

const footerEmails = ["Sales", "Careers", "General"];

export function NavigationSection() {
  return (
    <Section
      id="navigation"
      index="08"
      eyebrow="Header and footer"
      title="Every page, the same frame."
      lede="All pages inherit these in phase 1, including the ones not fully redesigned yet."
    >
      <Group title="Header" source="Brief §6.1" note="Sticky. Transparent at the top of the page, translucent with blur after scrolling.">
        <div className="relative space-y-6 overflow-hidden rounded-lg border border-line py-6">
          <div className="bg-dots absolute inset-0" />
          <div className="glow-accent absolute -top-24 left-1/4 size-96" />
          <div className="glow-alt absolute -right-10 -bottom-32 size-96" />
          <div className="relative">
            <p className="mb-2 px-4 font-mono text-label text-muted sm:px-6">At top</p>
            <HeaderSpecimen />
          </div>
          <div className="relative">
            <p className="mb-2 px-4 font-mono text-label text-muted sm:px-6">Scrolled</p>
            <HeaderSpecimen scrolled />
          </div>
        </div>
      </Group>

      <div className="grid gap-16 lg:grid-cols-[20rem_minmax(0,1fr)] lg:gap-12">
        <Group title="Mobile menu" source="Brief §6.1">
          <div className="mx-auto flex h-[34rem] max-w-80 flex-col rounded-lg border border-line-strong bg-night p-4">
            <div className="flex items-center justify-between">
              <Logo className="text-h4" />
              <button type="button" aria-label="Close menu" className="grid size-11 cursor-pointer place-items-center rounded-md"><CloseIcon /></button>
            </div>
            <ul className="mt-6 flex-1 divide-y divide-line">
              {navLinks.map((link) => (
                <li key={link}>
                  <a href="#navigation" className="block py-2.5 font-display text-h4">{link}</a>
                </li>
              ))}
            </ul>
            <Button href="#navigation" className="w-full">Request demo</Button>
          </div>
        </Group>

        <Group title="Footer" source="Brief §6.10" note="Email addresses are waiting on Olive Labs (§11).">
          <div className="rounded-lg border border-line bg-surface/50 p-6 sm:p-8">
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <Logo className="text-h3" />
                <p className="mt-6 text-h3 font-display">Have an idea worth engineering?</p>
                <Button href="#navigation" className="mt-6">Request a demo</Button>
              </div>
              <form aria-label="Newsletter specimen">
                <label htmlFor="newsletter" className="font-mono text-label text-muted">Newsletter</label>
                <div className="mt-3 flex flex-col gap-2 min-[420px]:flex-row">
                  <input id="newsletter" type="email" autoComplete="off" className="field min-w-0 flex-1" placeholder="you@company.com" />
                  <Button variant="secondary">Subscribe</Button>
                </div>
              </form>
            </div>
            <div className="mt-10 grid gap-8 border-t border-line pt-8 sm:grid-cols-3">
              <div>
                <p className="font-mono text-label text-muted">Explore</p>
                <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-1 text-small sm:grid-cols-1">
                  {navLinks.map((link) => (
                    <li key={link}><a href="#navigation" className="inline-block py-1 hover:text-accent">{link}</a></li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="font-mono text-label text-muted">Contact</p>
                <dl className="mt-3 space-y-2 text-small">
                  {footerEmails.map((label) => (
                    <div key={label}>
                      <dt className="text-fg">{label}</dt>
                      <dd className="text-muted">Address pending</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <p className="font-mono text-label text-muted">Office</p>
                <address className="mt-3 text-small text-muted not-italic">
                  Olive Labs FZ-LLC<br />
                  Dubai, United Arab Emirates<br />
                  Est. 2025
                </address>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap justify-between gap-x-6 gap-y-2 border-t border-line pt-6 text-small text-muted">
              <p>© 2026 Olive Labs</p>
              <ul className="flex gap-4">
                <li><a href="#navigation" className="underline underline-offset-4 hover:text-fg">Privacy</a></li>
                <li><a href="#navigation" className="underline underline-offset-4 hover:text-fg">Terms</a></li>
              </ul>
            </div>
          </div>
        </Group>
      </div>
    </Section>
  );
}

export function MotionSection({ theme }: { theme: DesignTheme }) {
  return (
    <Section
      id="motion"
      index="09"
      eyebrow="Motion"
      title="Motion signals precision."
      lede="Nothing moves for decoration. With reduced motion on, parallax, particles and auto-animation all switch off."
    >
      <Group title="Reveal and stagger" source="Brief §8, 500 ms with a 70 ms stagger">
        <RevealDemo labels={["Fade", "Rise", "Ease", "Settle"]} />
      </Group>

      <Group title="Rules" source="Brief §8">
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Motion rules">
          <table className="w-full min-w-[40rem] text-left text-small">
            <thead className="font-mono text-label text-muted">
              <tr>
                <th scope="col" className="pb-3 pe-6 font-normal">Element</th>
                <th scope="col" className="pb-3 pe-6 font-normal">Value</th>
                <th scope="col" className="pb-3 pe-6 font-normal">Behaviour</th>
                <th scope="col" className="pb-3 font-normal">Source</th>
              </tr>
            </thead>
            <tbody>
              {motionRules(theme.motionHoverEdge).map((rule) => (
                <tr key={rule.name} className="border-t border-line">
                  <th scope="row" className="py-3 pe-6 font-medium text-fg">{rule.name}</th>
                  <td className="py-3 pe-6 font-mono text-label text-accent">{rule.value}</td>
                  <td className="py-3 pe-6 text-muted">{rule.detail}</td>
                  <td className="py-3 font-mono text-label text-muted">{rule.source}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Group>
    </Section>
  );
}

/**
 * Deterministic mesh, so the static fallback renders the same every time.
 * Points are jittered on a grid, which keeps the network evenly connected.
 */
function buildMesh() {
  const columns = 9;
  const rows = 7;
  const cellWidth = 600 / columns;
  const cellHeight = 480 / rows;
  let seed = 41;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return seed / 2147483647;
  };
  const nodes = Array.from({ length: columns * rows }, (_, index) => ({
    x: Math.round(((index % columns) + 0.15 + random() * 0.7) * cellWidth),
    y: Math.round((Math.floor(index / columns) + 0.15 + random() * 0.7) * cellHeight),
    r: 1.5 + Math.round(random() * 2),
  }));
  const edges: { a: (typeof nodes)[number]; b: (typeof nodes)[number] }[] = [];
  nodes.forEach((a, i) => {
    nodes.slice(i + 1).forEach((b) => {
      if (Math.hypot(a.x - b.x, a.y - b.y) < 92) edges.push({ a, b });
    });
  });
  return { nodes, edges };
}

function HeroMesh() {
  const { nodes, edges } = buildMesh();
  return (
    <svg viewBox="0 0 600 480" aria-hidden="true" className="fade-out h-full w-full">
      {edges.map(({ a, b }, index) => (
        <line
          key={`${a.x}-${a.y}-${b.x}-${b.y}`}
          x1={a.x}
          y1={a.y}
          x2={b.x}
          y2={b.y}
          stroke={index % 4 === 0 ? "var(--color-accent-2-edge)" : "var(--color-accent)"}
          strokeOpacity="0.32"
          strokeWidth="1"
        />
      ))}
      {nodes.map((node, index) => (
        <circle
          key={`${node.x}-${node.y}`}
          cx={node.x}
          cy={node.y}
          r={node.r}
          fill={index === 31 ? "var(--color-highlight)" : "var(--color-accent)"}
          className={index % 9 === 0 ? "mesh-node" : undefined}
          style={index % 9 === 0 ? { animationDelay: `${index * 80}ms` } : undefined}
        />
      ))}
    </svg>
  );
}

export function CompositionSection() {
  return (
    <Section
      id="composition"
      index="10"
      eyebrow="In use"
      title="The system, put together."
      lede="The homepage hero and final call to action, built only from the tokens above. The mesh stands in for the live 3D visual, and doubles as its static fallback."
    >
      <Group title="Homepage hero" source="Brief §6.1-6.3">
        <div className="relative overflow-hidden rounded-lg border border-line-strong">
          <div className="bg-lines absolute inset-0" />
          <div className="glow-accent absolute -top-40 -left-24 size-[36rem]" />
          <div className="glow-alt absolute -right-24 -bottom-48 size-[36rem]" />
          <div className="relative">
            <HeaderSpecimen />
            <div className="grid items-center gap-4 px-4 pt-10 pb-8 sm:px-6 lg:grid-cols-12 lg:px-10 lg:pt-16 lg:pb-14">
              <div className="min-w-0 lg:col-span-7">
                <p className="font-mono text-label text-accent">Enterprise AI software · Deep-tech R&amp;D studio</p>
                <p className="mt-5 font-display text-display font-medium text-balance">Enterprise AI, Robotics &amp; <span className="whitespace-nowrap">Deep-Tech</span> Solutions</p>
                <p className="mt-6 max-w-xl text-body-lg text-muted">
                  Olive Labs is a Dubai-based AI and deep-tech company delivering enterprise AI software, robotics solutions, autonomous systems, computer vision and intelligent prototypes across the UAE.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Button href="#composition" arrow>Request a demo</Button>
                  <Button href="#composition" variant="secondary">Explore products</Button>
                </div>
              </div>
              <div className="h-72 min-w-0 lg:col-span-5 lg:h-[28rem]">
                <HeroMesh />
              </div>
            </div>
            <div className="border-t border-line px-4 py-4 sm:px-6">
              <Ticker items={tickerItems} />
            </div>
          </div>
        </div>
      </Group>

      <Group title="Final call to action" source="Brief §6.9">
        <div className="relative overflow-hidden rounded-lg border border-line-strong px-6 py-16 text-center sm:py-24">
          <div className="bg-dots fade-out absolute inset-0" />
          <div className="glow-accent absolute top-1/2 left-1/2 size-[32rem] -translate-x-1/2 -translate-y-1/2" />
          <div className="relative">
            <p className="font-display text-h1 font-medium">Let&apos;s design what comes next.</p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Button href="#composition" arrow>Request a demo</Button>
              <Button href="#composition" variant="secondary">Contact sales</Button>
            </div>
          </div>
        </div>
      </Group>
    </Section>
  );
}
