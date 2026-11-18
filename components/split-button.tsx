"use client";

import type { ComponentProps, PointerEvent, ReactNode } from "react";

function Arrow({ className }: { className: string }) {
  return (
    <svg viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="4.5" className={className}>
      <path d="M36 84L85 36M48 36H85V73" />
    </svg>
  );
}

/** Starts the label's color wipe at the cursor, or at the nearest label edge when the cursor is on the tile. */
function setWipeOrigin(event: PointerEvent<HTMLElement>) {
  const button = event.currentTarget;
  const label = button.querySelector(".split-btn-label");
  if (!label) return;
  const box = label.getBoundingClientRect();
  const percent = (offset: number, size: number) => `${Math.min(100, Math.max(0, (offset / size) * 100))}%`;
  button.style.setProperty("--wipe-x", percent(event.clientX - box.left, box.width));
  button.style.setProperty("--wipe-y", percent(event.clientY - box.top, box.height));
}

type ManagedProps = "className" | "children" | "href" | "onPointerEnter" | "onPointerLeave";

type SplitButtonProps = {
  variant?: "border" | "accent" | "light";
  className?: string;
  children: ReactNode;
} & (
  | ({ href: string } & Omit<ComponentProps<"a">, ManagedProps>)
  | ({ href?: undefined } & Omit<ComponentProps<"button">, ManagedProps>)
);

/** A label beside a separate arrow tile, matching the notch cards. Renders a link when given an href. */
export function SplitButton({ variant = "accent", className = "", children, ...rest }: SplitButtonProps) {
  const shared = {
    "data-variant": variant,
    className: `split-btn ${className}`,
    onPointerEnter: setWipeOrigin,
    onPointerLeave: setWipeOrigin,
  };
  const content = (
    <>
      <span className="split-btn-label">{children}</span>
      <span aria-hidden="true" className="split-btn-tile">
        <Arrow className="split-btn-arrow" />
        <Arrow className="split-btn-arrow split-btn-arrow-next" />
      </span>
    </>
  );

  if (rest.href !== undefined) {
    return (
      <a {...shared} {...(rest as ComponentProps<"a">)}>
        {content}
      </a>
    );
  }

  return (
    <button type="button" {...shared} {...(rest as ComponentProps<"button">)}>
      {content}
    </button>
  );
}
