import { contrast, formatRatio } from "./tokens";

export type ColorToken = {
  name: string;
  role: string;
  hex: string;
  token: string;
  use: string;
};

/** Everything that differs between palettes. The template in _components reads only this. */
export type DesignTheme = {
  /** Scoping class from globals.css. An empty string uses the default tokens. */
  rootClass: string;
  /** Whether this palette uses soft radial glows behind sections. */
  radialGlows: boolean;
  glowRule: string;
  chip: string;
  intro: string;
  facts: [string, string][];
  color: {
    title: string;
    lede: string;
    paletteTitle: string;
    paletteSource: string;
    /** Each inner array is one row of swatches. The first row renders taller. */
    rows: ColorToken[][];
    proportion: { hex: string; share: number; label: string }[];
    proportionNote: string;
    secondary: { title: string; source: string; note: string; colors: ColorToken[] };
    roles?: { role: string; value: string }[];
    foregrounds: ColorToken[];
    backgrounds: ColorToken[];
    pairs: { text: ColorToken; fill: ColorToken; note: string }[];
    callout: { title: string; body: string };
  };
  actionsTitle: string;
  cards: {
    lede: string;
    accentLabel: string;
    accentNote: string;
    altLabel: string;
    altNote: string;
  };
  motionHoverEdge: string;
  paletteOpenItem: string;
};

const ratio = (a: ColorToken, b: ColorToken) => formatRatio(contrast(a.hex, b.hex));

/* Default theme: the palette proposed in the brief. */

const night: ColorToken = { name: "Near-black navy", role: "Background", hex: "#070B14", token: "night", use: "The page canvas, and the text color on accent fills." };
const surface: ColorToken = { name: "Deep slate", role: "Surface / cards", hex: "#0F1626", token: "surface", use: "Cards and panels. Sits one step above the canvas." };
const cyan: ColorToken = { name: "Electric cyan", role: "Primary accent", hex: "#22D3EE", token: "accent", use: "Action. Primary buttons, links, focus rings, default hover glow." };
const violet: ColorToken = { name: "Violet", role: "Secondary accent", hex: "#8B5CF6", token: "accent-2", use: "Depth. Background glows, alternate hover glow, category tags." };
const lime: ColorToken = { name: "Lime-olive", role: "Highlight, sparingly", hex: "#A3E635", token: "highlight", use: "The brand nod. One small mark per view, such as the logo dot." };
const offWhite: ColorToken = { name: "Off-white", role: "Text", hex: "#E6EAF2", token: "fg", use: "Headings and body copy." };
const mutedGrey: ColorToken = { name: "Muted grey", role: "Text", hex: "#8A94A8", token: "muted", use: "Secondary copy, captions and labels." };
const raisedSlate: ColorToken = { name: "Raised slate", role: "Layering", hex: "#161F33", token: "raised", use: "Nested panels and disabled buttons." };
const softViolet: ColorToken = { name: "Soft violet", role: "Small violet text", hex: "#A78BFA", token: "accent-2-soft", use: "Replaces violet in small text, which falls short of AA on cards." };
const inputEdge: ColorToken = { name: "Input edge", role: "Control borders", hex: "#667089", token: "edge", use: "Field and secondary button borders. Meets the 3:1 AA target for controls." };
const signalRed: ColorToken = { name: "Signal red", role: "Form errors", hex: "#F87171", token: "danger", use: "Inline validation only, as section 7 requires. Always paired with a message." };

export const briefTheme: DesignTheme = {
  rootClass: "",
  radialGlows: true,
  glowRule: "Soft radial glows sit behind key sections. Cards glow on hover only.",
  chip: "Design system v0.1",
  intro:
    "A dark interface with controlled glow. Precise, engineered and calm. This page is the working reference for the redesign's colors, type, cards and components.",
  facts: [
    ["Source", "Developer Brief, Nov 2, 2026"],
    ["Palette", "Proposed, awaiting approval"],
    ["Standard", "WCAG 2.1 AA"],
    ["Stage", "Phase 1 design system"],
  ],
  color: {
    title: "Dark canvas. One accent for action.",
    lede: "Cyan means you can act. Violet adds depth. Lime is the small nod to the Olive name. Select any hex value to copy it.",
    paletteTitle: "Brief palette",
    paletteSource: "Brief §3, proposed. Approval pending §11",
    rows: [[night, surface], [cyan, violet, lime], [offWhite, mutedGrey]],
    proportion: [
      { hex: night.hex, share: 62, label: "Canvas" },
      { hex: surface.hex, share: 20, label: "Surface" },
      { hex: offWhite.hex, share: 10, label: "Text" },
      { hex: cyan.hex, share: 5, label: "Cyan" },
      { hex: violet.hex, share: 2, label: "Violet" },
      { hex: lime.hex, share: 1, label: "Lime" },
    ],
    proportionNote:
      "The brief asks for a controlled glow and a sparing highlight. These shares are our reading of that for a typical screen.",
    secondary: {
      title: "Derived tokens",
      source: "Not in the brief",
      note: "The brief's seven colors cover the look. These four cover requirements it sets elsewhere: AA contrast and form validation.",
      colors: [raisedSlate, softViolet, inputEdge, signalRed],
    },
    foregrounds: [offWhite, mutedGrey, cyan, violet, softViolet, lime, signalRed, inputEdge],
    backgrounds: [night, surface, raisedSlate],
    pairs: [
      { text: night, fill: cyan, note: "Primary button" },
      { text: night, fill: violet, note: "Violet fill, if ever used" },
      { text: offWhite, fill: violet, note: "Off-white on violet" },
      { text: night, fill: lime, note: "Lime fill, if ever used" },
    ],
    callout: {
      title: "Two limits to know about violet",
      body: `Violet on Deep slate reaches ${ratio(violet, surface)}:1, short of AA for small text, so small violet text uses Soft violet. Off-white on violet reaches ${ratio(offWhite, violet)}:1, so any violet fill takes Near-black navy text.`,
    },
  },
  actionsTitle: "Request demo is always the brightest thing.",
  cards: {
    lede: "Every card shares one recipe: a translucent slate fill, a 1px gradient border and a 10px radius. A hover adds a 4px lift and a soft edge glow.",
    accentLabel: "Hover, cyan",
    accentNote: "Default. Lift and cyan edge.",
    altLabel: "Hover, violet",
    altNote: "For R&D and alternating cards.",
  },
  motionHoverEdge: "cyan or violet",
  paletteOpenItem: "Approve the proposed cyan and violet scheme, or choose another.",
};

/* Olive theme: colors read from olivelab.tech, with white replaced by #EFE7D8 and #C85A32 added. */

const black: ColorToken = { name: "Black", role: "Background", hex: "#050505", token: "night", use: "The page canvas, and the text color on olive fills." };
const olive: ColorToken = { name: "Olive green", role: "Primary accent", hex: "#7A9E45", token: "accent", use: "Action. Primary buttons, links, focus rings, hover glow and the logo dot." };
const orange: ColorToken = { name: "Burnt orange", role: "Secondary accent", hex: "#C85A32", token: "accent-2", use: "Second voice, used sparingly. Alternate hover, tag borders and secondary icons." };
const cream: ColorToken = { name: "Cream", role: "Text, replaces white", hex: "#EFE7D8", token: "fg", use: "Headings, body copy and small text on cards." };
const grey: ColorToken = { name: "Grey", role: "Secondary text", hex: "#AFAFAF", token: "muted", use: "Secondary copy, labels and control borders." };
const cardBlack: ColorToken = { name: "Card black", role: "Surface / cards", hex: "#111111", token: "surface", use: "Cards and panels. The site's own card color." };
const raisedBlack: ColorToken = { name: "Raised black", role: "Layering", hex: "#1A1A1A", token: "raised", use: "Nested panels, hover and disabled states. The site's own border color." };

export const oliveTheme: DesignTheme = {
  rootClass: "theme-olive",
  radialGlows: false,
  glowRule: "No background glows. Cards and buttons glow on hover only.",
  chip: "Design system v0.1, olive palette",
  intro:
    "The same system as the first version, now in the colors of olivelab.tech: olive green, grey and black, with cream in place of white and burnt orange as the secondary accent.",
  facts: [
    ["Colors", "olivelab.tech"],
    ["White", "Replaced by #EFE7D8"],
    ["Secondary accent", "#C85A32"],
    ["Layout", "Same template as /design"],
  ],
  color: {
    title: "Black canvas. Olive for action.",
    lede: "Olive means you can act. Orange is the second voice, used sparingly. Cream carries the words and grey supports them. Select any hex value to copy it.",
    paletteTitle: "Site palette",
    paletteSource: "olivelab.tech, white changed to #EFE7D8, #C85A32 added",
    rows: [[black, olive], [orange, cream, grey]],
    proportion: [
      { hex: black.hex, share: 64, label: "Canvas" },
      { hex: cardBlack.hex, share: 18, label: "Cards" },
      { hex: cream.hex, share: 9, label: "Cream" },
      { hex: grey.hex, share: 5, label: "Grey" },
      { hex: olive.hex, share: 3, label: "Olive" },
      { hex: orange.hex, share: 1, label: "Orange" },
    ],
    proportionNote: "Our suggestion for a typical screen. Olive stays small so that it keeps meaning action, and orange is smaller still.",
    secondary: {
      title: "Black shades",
      source: "olivelab.tech",
      note: "The site's own card and border blacks, so cards can sit one step above the canvas without adding a color.",
      colors: [cardBlack, raisedBlack],
    },
    roles: [
      { role: "Actions and focus", value: "Olive green" },
      { role: "Alternate card hover", value: "Orange edge and glow" },
      { role: "Category tags", value: "Orange border, cream text" },
      { role: "Secondary icons", value: "Orange" },
      { role: "Backgrounds", value: "Black, with dots and grid lines" },
      { role: "Logo dot and highlight tag", value: "Olive green" },
      { role: "Control borders", value: "Grey" },
      { role: "Dividers", value: "Cream, at low opacity" },
      { role: "Form errors", value: "Cream, always with a written message" },
      { role: "Form success", value: "Olive green" },
    ],
    foregrounds: [cream, grey, olive, orange],
    backgrounds: [black, cardBlack, raisedBlack],
    pairs: [
      { text: black, fill: olive, note: "Primary button" },
      { text: cream, fill: olive, note: "Cream on olive, avoid" },
      { text: black, fill: orange, note: "Black on orange" },
      { text: cream, fill: orange, note: "Cream on orange, avoid" },
      { text: black, fill: cream, note: "Black on cream" },
      { text: black, fill: grey, note: "Black on grey" },
    ],
    callout: {
      title: "Two limits to know about the accents",
      body: `Cream on olive reaches ${ratio(cream, olive)}:1 and cream on orange reaches ${ratio(cream, orange)}:1, so accent fills take black text. Orange text reaches ${ratio(orange, cardBlack)}:1 on Card black, just short of AA, so small text on cards stays cream and orange marks the border.`,
    },
  },
  actionsTitle: "Request demo gets the olive fill.",
  cards: {
    lede: "Every card shares one recipe: a translucent black fill, a 1px gradient border and a 10px radius. A hover adds a 4px lift and a soft edge glow.",
    accentLabel: "Hover, olive",
    accentNote: "Default. Lift and olive edge.",
    altLabel: "Hover, orange",
    altNote: "For R&D and alternating cards.",
  },
  motionHoverEdge: "olive or orange",
  paletteOpenItem: "Approve this palette in place of the one proposed in the brief.",
};

/* Green theme: six colors supplied by the client, with Brazilianite as the only accent. */

const superSilver: ColorToken = { name: "Super Silver", role: "Text", hex: "#EEEEEE", token: "fg", use: "Headings, body copy and small text on cards." };
const brazilianite: ColorToken = { name: "Brazilianite", role: "Primary accent", hex: "#2FD463", token: "accent", use: "Action. Primary buttons, links, focus rings, hover glow and the logo dot." };
const trolleyGrey: ColorToken = { name: "Trolley Grey", role: "Secondary text", hex: "#818281", token: "muted", use: "Secondary copy, labels, control borders and alternate card hover." };
const blackPanther: ColorToken = { name: "Black Panther", role: "Layering", hex: "#404241", token: "raised", use: "Nested panels, hover and disabled states. Never text." };
const mattBlack: ColorToken = { name: "Matt Black", role: "Surface / cards", hex: "#151515", token: "surface", use: "Cards and panels. Sits one step above the canvas." };
const blackHole: ColorToken = { name: "Black Hole", role: "Background", hex: "#020202", token: "night", use: "The page canvas, and the text color on green fills." };

export const greenTheme: DesignTheme = {
  rootClass: "theme-green",
  radialGlows: false,
  glowRule: "No background glows. Cards and buttons glow on hover only.",
  chip: "Design system v0.1, green palette",
  intro: "The same system in a black and silver palette, with Brazilianite green as the single accent.",
  facts: [
    ["Colors", "Supplied palette"],
    ["Accent", "#2FD463"],
    ["Text", "#EEEEEE"],
    ["Layout", "Same template as /design"],
  ],
  color: {
    title: "Black canvas. Green for action.",
    lede: "Green means you can act. Silver carries the words, grey supports them and the blacks build depth.",
    paletteTitle: "Supplied palette",
    paletteSource: "Six colors, no other hues",
    rows: [[superSilver, brazilianite, trolleyGrey], [blackPanther, mattBlack, blackHole]],
    proportion: [
      { hex: blackHole.hex, share: 62, label: "Canvas" },
      { hex: mattBlack.hex, share: 20, label: "Cards" },
      { hex: superSilver.hex, share: 9, label: "Silver" },
      { hex: trolleyGrey.hex, share: 4, label: "Grey" },
      { hex: blackPanther.hex, share: 2, label: "Panther" },
      { hex: brazilianite.hex, share: 3, label: "Green" },
    ],
    proportionNote: "Our suggestion for a typical screen. Green stays small so that it keeps meaning action.",
    secondary: {
      title: "Black shades",
      source: "Supplied palette",
      note: "The two lighter blacks let cards and nested panels sit above the canvas without adding a color.",
      colors: [mattBlack, blackPanther],
    },
    foregrounds: [superSilver, trolleyGrey, brazilianite],
    backgrounds: [blackHole, mattBlack, blackPanther],
    pairs: [
      { text: blackHole, fill: brazilianite, note: "Primary button" },
      { text: superSilver, fill: brazilianite, note: "Silver on green, avoid" },
      { text: blackHole, fill: superSilver, note: "Black on silver" },
      { text: blackHole, fill: trolleyGrey, note: "Black on grey" },
    ],
    callout: {
      title: "Two limits to know about this palette",
      body: `Super Silver on Brazilianite reaches ${ratio(superSilver, brazilianite)}:1, so green fills take black text. Black Panther on Matt Black reaches ${ratio(blackPanther, mattBlack)}:1, so it builds surfaces and is never used for text.`,
    },
  },
  actionsTitle: "Request demo gets the green fill.",
  cards: {
    lede: "Every card shares one recipe: a translucent black fill, a 1px gradient border and a 10px radius. A hover adds a 4px lift and a soft edge glow.",
    accentLabel: "Hover, green",
    accentNote: "Default. Lift and green edge.",
    altLabel: "Hover, grey",
    altNote: "For R&D and alternating cards.",
  },
  motionHoverEdge: "green or grey",
  paletteOpenItem: "Approve this palette in place of the one proposed in the brief.",
};
