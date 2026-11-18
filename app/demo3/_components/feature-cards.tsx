import { NotchCard, NotchCardDefs, type NotchCardVariant } from "../../design/_components/notch-card";

/** The tag, title, text, action and destination of each card match olivelab.tech. */
const CARDS: { variant: NotchCardVariant; href: string; image: string; tag: string; title: string; text: string; action: string }[] = [
  {
    variant: "accent",
    href: "https://olivelab.tech/products",
    image: "/cards/robotics.png",
    tag: "01 · Prototype",
    title: "Prototype Development",
    text: "Rapid prototyping for robotic and AI concepts — validate hardware, autonomy and conversational experiences.",
    action: "View products",
  },
  {
    variant: "border",
    href: "https://olivelab.tech/projects",
    image: "/cards/deep-tech.png",
    tag: "02 · R&D",
    title: "Deep-tech Studio",
    text: "Robotics, autonomous systems, computer vision and healthcare hardware — long-horizon engineering.",
    action: "View projects",
  },
];

/*
 * The notch card was sized for short labels. These overrides make room for the
 * site's longer copy here without changing the card on the design pages: a
 * two-line title, and a taller panel over a shorter photo.
 */
const cardFit = [
  "[&_.notch-card-photo]:h-[52%]",
  "[&_.notch-card-panel]:top-[46%]",
  "[&_.notch-card-panel]:pt-[7cqw]",
  "[&_.notch-card-panel]:pr-[9.1cqw]",
  "[&_.notch-card-tag]:text-[3.6cqw]",
  "[&_.notch-card-title]:text-[10.5cqw]",
  "[&_.notch-card-title]:leading-[1.08]",
  "[&_.notch-card-title]:whitespace-normal",
  "[&_.notch-card-text]:mt-[3cqw]",
  "[&_.notch-card-text]:text-[4.2cqw]",
  "[&_.notch-card-text]:leading-[1.4]",
].join(" ");

/** Two side-by-side cards, kept short enough from md up that a whole card fits on one screen. */
export function FeatureCards() {
  return (
    <section aria-label="Prototype development and deep-tech R&D" className="relative mx-auto w-full max-w-content px-4 pt-6 pb-16 sm:px-6 sm:pb-24 lg:px-8">
      <NotchCardDefs />
      <ul className={`mx-auto grid gap-6 md:w-[min(100%,calc((100svh-6rem)*1.392+1.5rem))] md:grid-cols-2 ${cardFit}`}>
        {CARDS.map((card) => (
          <li key={card.tag}>
            <NotchCard {...card} />
          </li>
        ))}
      </ul>
    </section>
  );
}
