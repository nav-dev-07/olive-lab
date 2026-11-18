const channel = (value: number) => {
  const c = value / 255;
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
};

const luminance = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
  );
};

/** WCAG 2.1 contrast ratio. */
export function contrast(a: string, b: string) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

export type Grade = "AA" | "Large / UI" | "Fail";

export function grade(ratio: number): Grade {
  if (ratio >= 4.5) return "AA";
  if (ratio >= 3) return "Large / UI";
  return "Fail";
}

/** One decimal, unless rounding would make a ratio look like it reaches a threshold it misses. */
export function formatRatio(ratio: number) {
  const rounded = ratio.toFixed(1);
  return grade(Number(rounded)) === grade(ratio) ? rounded : ratio.toFixed(2);
}

export const typeScale = [
  { token: "display", size: "40-72px", leading: "1.05", family: "Space Grotesk 500", use: "Hero headline", className: "font-display text-display font-medium" },
  { token: "h1", size: "34-52px", leading: "1.1", family: "Space Grotesk 500", use: "Page heroes", className: "font-display text-h1 font-medium" },
  { token: "h2", size: "28-40px", leading: "1.15", family: "Space Grotesk 500", use: "Section titles", className: "font-display text-h2 font-medium" },
  { token: "h3", size: "24px", leading: "1.25", family: "Space Grotesk 500", use: "Large card titles", className: "font-display text-h3 font-medium" },
  { token: "h4", size: "18px", leading: "1.35", family: "Space Grotesk 500", use: "Card titles", className: "font-display text-h4 font-medium" },
  { token: "body-lg", size: "18px", leading: "1.6", family: "Inter 400", use: "Sublines and intros", className: "text-body-lg" },
  { token: "body", size: "16px", leading: "1.6", family: "Inter 400", use: "Default copy", className: "text-body" },
  { token: "small", size: "14px", leading: "1.55", family: "Inter 400", use: "Card copy and captions", className: "text-small" },
  { token: "label", size: "12px", leading: "1.4", family: "JetBrains Mono 400", use: "Labels, stats and tags", className: "font-mono text-label" },
];

export const spacingScale = [4, 8, 12, 16, 24, 32, 48, 64, 96, 112];

export function motionRules(hoverEdge: string) {
  return [
    { name: "Scroll reveal", value: "300-600 ms", detail: "Fade and rise on entry, eased.", source: "Brief" },
    { name: "Card stagger", value: "60-80 ms", detail: "Delay between cards in a group.", source: "Brief" },
    { name: "Card hover", value: "Lift + glow", detail: `4px lift over 300 ms, soft ${hoverEdge} edge.`, source: "Brief, timing derived" },
    { name: "Button hover", value: "Light sweep", detail: "One pass over 600 ms.", source: "Brief, timing derived" },
    { name: "Counters", value: "Once", detail: "Count up on first entry, then hold.", source: "Brief" },
    { name: "Ticker", value: "Pause on hover", detail: "A pause button adds keyboard and touch access.", source: "Brief, button derived" },
    { name: "Page change", value: "Crossfade", detail: "Short crossfade between routes.", source: "Brief" },
    { name: "Hero visual", value: "Lazy WebGL", detail: "Particles react slightly to the cursor. Static image on low-power devices.", source: "Brief" },
  ];
}
