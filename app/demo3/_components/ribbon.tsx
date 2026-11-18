import TextLoop from "@/components/TextLoop";

/** The marquee items from olivelab.tech, in the site's order. */
const ITEMS = [
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

const SEPARATOR = "✦";

/*
 * TextLoop's built-in line is about 1,840 units long and squeezes its text to
 * fit, which would crush this many items together. This line runs on off-screen
 * for the measured width of one pass of the text, so it keeps natural spacing.
 */
const LINE_Y = 260;
const LINE_START_X = -320;
const TEXT_PASS_WIDTH = 5747;
const linePath = `M ${LINE_START_X} ${LINE_Y} L ${LINE_START_X + TEXT_PASS_WIDTH} ${LINE_Y}`;

/** The ribbon scales with the window, and holds a readable size on phones by running past both edges. */
export function Ribbon() {
  return (
    <section className="overflow-hidden py-10 sm:py-16">
      <TextLoop
        text={ITEMS.join(` ${SEPARATOR} `)}
        path={linePath}
        speed={90}
        direction="forward"
        separator={SEPARATOR}
        tilt={0}
        fontSize={46}
        fontWeight={800}
        letterSpacing={3}
        uppercase={false}
        color="var(--color-night)"
        ribbon
        ribbonColor="var(--color-accent)"
        ribbonWidth={106}
        edgeFade={0}
        cross={false}
        // TextLoop is plain JS, so TypeScript infers this optional prop as required.
        crossColor={undefined}
        crossAngle={16}
        draggable
        scrollBoost={0}
        outline={false}
        pauseOnHover
        outlineWidth={1.5}
        className="font-display [--ribbon-width:max(100vw,60rem)] my-[calc(var(--ribbon-width)*-0.17)] ml-[calc((100%-var(--ribbon-width))/2)] w-(--ribbon-width)!"
      />
    </section>
  );
}
