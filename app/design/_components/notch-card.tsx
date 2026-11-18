import Image from "next/image";

export type NotchCardVariant = "border" | "accent" | "light";

const WIDTH = 484;
const HEIGHT = 695;

/** The card silhouette: a rounded rectangle with a stepped notch cut from its top-right corner. */
const SHAPE =
  "M52 0H268A52 52 0 0 1 320 52V92A52 52 0 0 0 372 144H432A52 52 0 0 1 484 196V643A52 52 0 0 1 432 695H52A52 52 0 0 1 0 643V52A52 52 0 0 1 52 0Z";

const CLIP_ID = "notch-card-clip";

/** Render once on any page that uses NotchCard. */
export function NotchCardDefs() {
  return (
    <svg width="0" height="0" aria-hidden="true" className="absolute">
      <defs>
        <clipPath id={CLIP_ID} clipPathUnits="objectBoundingBox">
          <path d={SHAPE} transform={`scale(${1 / WIDTH} ${1 / HEIGHT})`} />
        </clipPath>
      </defs>
    </svg>
  );
}

function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="4.5" className={className}>
      <path d="M36 84L85 36M48 36H85V73" />
    </svg>
  );
}

export function NotchCard({
  variant,
  href,
  image,
  tag,
  title,
  text,
  action,
}: {
  variant: NotchCardVariant;
  href: string;
  image: string;
  tag: string;
  title: string;
  text: string;
  /** Optional link label under the text. */
  action?: string;
}) {
  return (
    <a href={href} data-variant={variant} className="notch-card">
      <div className="notch-card-shape" style={{ clipPath: `url(#${CLIP_ID})` }}>
        <div className="notch-card-photo">
          <Image src={image} alt="" fill sizes="(min-width: 768px) 33vw, 100vw" className="object-cover" />
        </div>
        <div className="notch-card-panel">
          <p className="notch-card-tag">{tag}</p>
          <h3 className="notch-card-title">{title}</h3>
          <p className="notch-card-text">{text}</p>
          {action ? <p className="mt-[3.4cqw] font-mono text-[3.6cqw] tracking-[0.08em] text-(--card-title) uppercase">{action}</p> : null}
        </div>
      </div>
      <svg viewBox={`0 0 ${WIDTH} ${HEIGHT}`} aria-hidden="true" className="notch-card-edge">
        <path d={SHAPE} vectorEffect="non-scaling-stroke" />
      </svg>
      <div aria-hidden="true" className="notch-card-tile">
        <Arrow className="notch-card-arrow" />
        <Arrow className="notch-card-arrow notch-card-arrow-next" />
      </div>
    </a>
  );
}
