import { CopyHex } from "../_components/interactive";
import { Group, Section } from "../_components/layout";
import type { ColorToken, DesignTheme } from "../themes";
import { contrast, formatRatio, grade, spacingScale, typeScale, type Grade } from "../tokens";

const principles = (glowRule: string) => [
  { rule: "Controlled glow", detail: glowRule, source: "§3" },
  { rule: "Engineered, not neon", detail: "Precise and calm. Nothing that reads as a gaming interface.", source: "§3" },
  { rule: "Sharp geometry", detail: "Sharp corners or 6-10px radii, generous spacing, content around 1200px wide.", source: "§3" },
  { rule: "Real imagery", detail: "Renders or photos of Olive Labs hardware. No stock photos.", source: "§3" },
  { rule: "One clear action", detail: "Request demo sits in the nav, hero and footer on every page.", source: "§4" },
  { rule: "Motion signals precision", detail: "It never distracts, and everything degrades gracefully.", source: "§8" },
  { rule: "Readable on dark", detail: "WCAG 2.1 AA for contrast, focus states and reduced motion.", source: "§9" },
  { rule: "Precise voice", detail: "Short sentences. Confident. No buzzword stacking.", source: "§3" },
];

const audiences = [
  { who: "Enterprise clients", need: "Solutions, proof, how engagement works", action: "Request a demo" },
  { who: "Investors and partners", need: "Vision, technology depth, team, R&D programs", action: "Contact / partnership enquiry" },
  { who: "Talent", need: "Mission, open roles, culture", action: "Careers page / apply" },
  { who: "Government and UAE bodies", need: "Local presence, trust, compliance, credibility", action: "Contact sales" },
];

export function LogicSection({ theme }: { theme: DesignTheme }) {
  return (
    <Section
      id="logic"
      index="01"
      eyebrow="Design logic"
      title="Mission control for enterprise AI."
      lede="Every token on this page follows from these rules. The aim is to position Olive Labs as a credible enterprise AI and robotics company in the UAE, and to turn visitors into demo requests."
    >
      <ol className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
        {principles(theme.glowRule).map((item) => (
          <li key={item.rule} className="flex gap-4 border-b border-line py-5">
            <div className="min-w-0 flex-1">
              <p className="font-display text-h4 font-medium">{item.rule}</p>
              <p className="mt-1 text-small text-muted">{item.detail}</p>
            </div>
            <p className="font-mono text-label text-muted">{item.source}</p>
          </li>
        ))}
      </ol>

      <Group title="Each audience gets one action" source="Brief §4">
        <div className="overflow-x-auto" tabIndex={0} role="region" aria-label="Audiences and primary actions">
          <table className="w-full min-w-[36rem] text-left text-small">
            <thead className="font-mono text-label text-muted">
              <tr>
                <th scope="col" className="pb-3 pe-6 font-normal">Audience</th>
                <th scope="col" className="pb-3 pe-6 font-normal">What they need to see</th>
                <th scope="col" className="pb-3 font-normal">Primary action</th>
              </tr>
            </thead>
            <tbody>
              {audiences.map((row) => (
                <tr key={row.who} className="border-t border-line">
                  <th scope="row" className="py-4 pe-6 font-medium text-fg">{row.who}</th>
                  <td className="py-4 pe-6 text-muted">{row.need}</td>
                  <td className="py-4 text-accent">{row.action}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Group>
    </Section>
  );
}

function Swatch({ item, tall }: { item: ColorToken; tall?: boolean }) {
  return (
    <li className="min-w-0 overflow-hidden rounded-lg border border-line bg-surface">
      <div
        className={`border-b border-line ${tall ? "h-44" : "h-28"}`}
        style={{ backgroundColor: item.hex }}
      />
      <div className="p-4">
        <p className="font-mono text-label text-muted">{item.role}</p>
        <p className="mt-1 font-display text-h4 font-medium">{item.name}</p>
        <div className="mt-1 flex flex-wrap items-center justify-between gap-x-3">
          <CopyHex hex={item.hex} name={item.name} />
          <code className="font-mono text-label text-muted">{item.token}</code>
        </div>
        <p className="mt-3 text-small text-muted">{item.use}</p>
      </div>
    </li>
  );
}

const gradeStyles: Record<Grade, string> = {
  AA: "text-fg",
  "Large / UI": "text-muted",
  Fail: "text-danger",
};

function GradeCell({ ratio }: { ratio: number }) {
  const result = grade(ratio);
  return (
    <span className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-2">
      <span className="font-mono tabular-nums text-fg">{formatRatio(ratio)}</span>
      <span className={`font-mono text-label ${gradeStyles[result]}`}>{result}</span>
    </span>
  );
}

const swatchRowColumns: Record<number, string> = {
  2: "sm:grid-cols-2",
  3: "sm:grid-cols-3",
  4: "sm:grid-cols-2 lg:grid-cols-4",
};

export function ColorSection({ theme }: { theme: DesignTheme }) {
  const { color } = theme;

  return (
    <Section id="color" index="02" eyebrow="Color" title={color.title} lede={color.lede}>
      <Group title={color.paletteTitle} source={color.paletteSource}>
        <div className="space-y-4">
          {color.rows.map((row, rowIndex) => (
            <ul key={row[0].token} className={`grid gap-4 ${swatchRowColumns[row.length]}`}>
              {row.map((item) => (
                <Swatch key={item.token} item={item} tall={rowIndex === 0} />
              ))}
            </ul>
          ))}
        </div>
      </Group>

      <Group title="Suggested proportion" source="Derived" note={color.proportionNote}>
        <div className="flex h-14 overflow-hidden rounded-md border border-line" role="img" aria-label={color.proportion.map((p) => `${p.label} ${p.share}%`).join(", ")}>
          {color.proportion.map((part) => (
            <div key={part.label} style={{ width: `${part.share}%`, backgroundColor: part.hex }} />
          ))}
        </div>
        <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-1 font-mono text-label text-muted">
          {color.proportion.map((part) => (
            <li key={part.label}>
              {part.label} {part.share}%
            </li>
          ))}
        </ul>
      </Group>

      <Group title={color.secondary.title} source={color.secondary.source} note={color.secondary.note}>
        <ul className={`grid gap-4 ${swatchRowColumns[color.secondary.colors.length]}`}>
          {color.secondary.colors.map((item) => (
            <Swatch key={item.token} item={item} />
          ))}
        </ul>
      </Group>

      {color.roles ? (
        <Group title="Where each color goes" source="No other hues" note="Every role in the template maps onto these colors. Tints are the same colors at lower opacity.">
          <dl className="grid border-t border-line sm:grid-cols-2 sm:gap-x-12">
            {color.roles.map((item) => (
              <div key={item.role} className="flex flex-wrap justify-between gap-x-4 gap-y-1 border-b border-line py-3 text-small">
                <dt className="text-muted">{item.role}</dt>
                <dd className="text-fg">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Group>
      ) : null}

      <Group
        title="Contrast on dark"
        source="Brief §9, WCAG 2.1 AA"
        note="Calculated from the hex values. AA needs 4.5:1 for normal text. Large / UI passes only for large text and control borders at 3:1."
      >
        <div className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
          <table className="w-full table-fixed text-left text-small">
            <thead className="font-mono text-label text-muted">
              <tr>
                <th scope="col" className="w-[34%] pb-3 font-normal">Text on</th>
                {color.backgrounds.map((bg) => (
                  <th key={bg.token} scope="col" className="pb-3 font-normal">{bg.name}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {color.foregrounds.map((fg) => (
                <tr key={fg.token} className="border-t border-line">
                  <th scope="row" className="py-3 pe-2 font-normal">
                    <span className="flex items-center gap-2 text-fg">
                      <span className="size-3 shrink-0 rounded-[2px]" style={{ backgroundColor: fg.hex }} />
                      {fg.name}
                    </span>
                  </th>
                  {color.backgrounds.map((bg) => (
                    <td key={bg.token} className="py-3 pe-2">
                      <GradeCell ratio={contrast(fg.hex, bg.hex)} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="space-y-6">
            <ul className="grid grid-cols-2 gap-3">
              {color.pairs.map((pair) => (
                <li
                  key={`${pair.text.token}-${pair.fill.token}`}
                  className="rounded-md p-3"
                  style={{ backgroundColor: pair.fill.hex, color: pair.text.hex }}
                >
                  <p className="text-small font-medium">{pair.note}</p>
                  <p className="mt-3 font-mono text-label">
                    {formatRatio(contrast(pair.text.hex, pair.fill.hex))} {grade(contrast(pair.text.hex, pair.fill.hex))}
                  </p>
                </li>
              ))}
            </ul>
            <div className="rounded-md border border-accent-2-edge/35 bg-accent-2/10 p-4 text-small">
              <p className="font-medium text-fg">{color.callout.title}</p>
              <p className="mt-2 text-muted">{color.callout.body}</p>
            </div>
          </div>
        </div>
      </Group>
    </Section>
  );
}

const families = [
  {
    name: "Space Grotesk",
    role: "Headings",
    className: "font-display",
    weights: "500 for headings",
    note: "Brief options: Space Grotesk, Sora or Satoshi. Space Grotesk is our pick: its squared details suit the engineered tone, and it's free to self-host.",
    tone: "text-fg",
  },
  {
    name: "Inter",
    role: "Body",
    className: "font-sans",
    weights: "400 for copy, 500 for emphasis",
    note: "Named in the brief. Stays clear at small sizes on a dark background.",
    tone: "text-fg",
  },
  {
    name: "JetBrains Mono",
    role: "Labels, stats, tags",
    className: "font-mono",
    weights: "400",
    note: "Named in the brief. Reads like instrument output, which supports the mission control mood.",
    tone: "text-accent",
  },
];

export function TypeSection() {
  return (
    <Section
      id="type"
      index="03"
      eyebrow="Typography"
      title="Three families, three jobs."
      lede="Headings carry the voice, body copy carries the detail, and mono carries the data."
    >
      <Group title="Families" source="Brief §3">
        <ul className="grid gap-4 lg:grid-cols-3">
          {families.map((family) => (
            <li key={family.name} className="flex flex-col rounded-lg border border-line bg-surface p-6">
              <p className="font-mono text-label text-muted">{family.role}</p>
              <p className={`mt-6 text-[5.5rem] leading-none ${family.className} ${family.tone}`}>Aa</p>
              <p className={`mt-6 text-h3 ${family.className}`}>{family.name}</p>
              <p className={`mt-3 text-small break-words text-muted ${family.className}`}>
                ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz 0123456789 &amp; · → /
              </p>
              <p className="mt-6 border-t border-line pt-4 font-mono text-label text-muted">{family.weights}</p>
              <p className="mt-2 text-small text-muted">{family.note}</p>
            </li>
          ))}
        </ul>
      </Group>

      <Group title="Scale" source="Sizes derived. Fluid sizes run from 360 to 1440px and up">
        <ul className="border-t border-line">
          {typeScale.map((step) => (
            <li key={step.token} className="grid gap-x-8 gap-y-3 border-b border-line py-6 lg:grid-cols-12 lg:items-baseline">
              <dl className="grid grid-cols-[auto_1fr] gap-x-3 font-mono text-label text-muted lg:col-span-3">
                <dt className="sr-only">Token</dt>
                <dd className="col-span-2 text-accent">{step.token}</dd>
                <dt className="sr-only">Size and line height</dt>
                <dd className="col-span-2">{step.size} / {step.leading}</dd>
                <dt className="sr-only">Family</dt>
                <dd className="col-span-2">{step.family}</dd>
              </dl>
              <div className="min-w-0 lg:col-span-9">
                <p className={step.className}>Enterprise AI, Robotics &amp; Deep-Tech Solutions</p>
                <p className="mt-2 text-small text-muted">{step.use}</p>
              </div>
            </li>
          ))}
        </ul>
      </Group>
    </Section>
  );
}

const radii = [
  { token: "radius-sm", px: 6, className: "rounded-sm", use: "Chips, tags" },
  { token: "radius-md", px: 8, className: "rounded-md", use: "Buttons, fields" },
  { token: "radius-lg", px: 10, className: "rounded-lg", use: "Cards, panels" },
];

const surfaces = [
  { name: "Dot matrix", detail: "Behind heroes and feature sections", className: "bg-dots" },
  { name: "Grid", detail: "Behind technical sections", className: "bg-lines" },
];

export function FoundationsSection({ theme }: { theme: DesignTheme }) {
  return (
    <Section
      id="foundations"
      index="04"
      eyebrow="Foundations"
      title="Generous space, sharp edges."
      lede="The structure stays quiet so the hardware and the proof can lead."
    >
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <Group title="Spacing" source="Derived, 4px base">
          <ul className="space-y-2">
            {spacingScale.map((value) => (
              <li key={value} className="flex items-center gap-4">
                <span className="w-10 font-mono text-label text-muted tabular-nums">{value}</span>
                <span className="h-3 rounded-[2px] bg-accent/70" style={{ width: value * 2 }} />
              </li>
            ))}
          </ul>
        </Group>

        <div className="space-y-16">
          <Group title="Radius" source="Brief §3, 6-10px">
            <ul className="grid grid-cols-3 gap-4">
              {radii.map((radius) => (
                <li key={radius.token}>
                  <div className={`h-24 border border-edge bg-surface ${radius.className}`} />
                  <p className="mt-3 font-mono text-label text-fg">{radius.px}px</p>
                  <p className="text-small text-muted">{radius.use}</p>
                </li>
              ))}
            </ul>
          </Group>

          <Group title="Content width" source="Brief §3, around 1200px">
            <div className="rounded-md border border-line bg-surface p-3">
              <div className="mx-auto flex h-16 w-[83%] items-center justify-center rounded-sm border border-dashed border-accent/50 font-mono text-label text-accent">
                max-w-content, 1200px
              </div>
            </div>
            <p className="mt-3 font-mono text-label text-muted">Tested at 360, 768, 1024, 1440 and 1920px (§9)</p>
          </Group>
        </div>
      </div>

      <Group title="Background language" source="Brief §3">
        <ul className={`grid gap-4 ${theme.radialGlows ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
          {surfaces.map((surface) => (
            <li key={surface.name} className="rounded-lg border border-line">
              <div className={`h-44 rounded-t-lg ${surface.className}`} />
              <div className="border-t border-line p-4">
                <p className="font-display text-h4 font-medium">{surface.name}</p>
                <p className="text-small text-muted">{surface.detail}</p>
              </div>
            </li>
          ))}
          {theme.radialGlows ? (
            <li className="rounded-lg border border-line">
              <div className="relative h-44 overflow-hidden rounded-t-lg">
                <div className="glow-accent absolute -top-16 -left-10 size-72" />
                <div className="glow-alt absolute -right-10 -bottom-20 size-72" />
              </div>
              <div className="border-t border-line p-4">
                <p className="font-display text-h4 font-medium">Radial glow</p>
                <p className="text-small text-muted">Behind key sections, never behind every section</p>
              </div>
            </li>
          ) : null}
        </ul>
      </Group>
    </Section>
  );
}
