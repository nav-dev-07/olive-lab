"use client";

import { useEffect, useRef, useState } from "react";
import { Chip } from "@/components/ui";

const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/** Runs `callback` the first time `element` enters the viewport. */
function onFirstEntry(element: Element, callback: () => void) {
  const observer = new IntersectionObserver((entries) => {
    if (entries.some((entry) => entry.isIntersecting)) {
      observer.disconnect();
      callback();
    }
  });
  observer.observe(element);
  return () => observer.disconnect();
}

export function CopyHex({ hex, name }: { hex: string; name: string }) {
  const [status, setStatus] = useState<"idle" | "copied" | "failed">("idle");
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  async function copy() {
    try {
      await navigator.clipboard.writeText(hex);
      setStatus("copied");
    } catch {
      setStatus("failed");
    }
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => setStatus("idle"), 1600);
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={`Copy ${name} hex value ${hex}`}
      className="-mx-1.5 inline-flex min-h-6 cursor-pointer items-center rounded-sm px-1.5 font-mono text-small text-fg transition-colors hover:text-accent"
    >
      <span aria-live="polite">
        {status === "copied" ? "Copied" : status === "failed" ? "Copy failed" : hex}
      </span>
    </button>
  );
}

export function Ticker({ items }: { items: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="flex items-center gap-3">
      <div className="ticker min-w-0 flex-1" data-paused={paused}>
        <div className="ticker-track">
          <ul className="flex shrink-0 flex-wrap gap-3 pe-3 motion-safe:flex-nowrap">
            {items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
          <ul aria-hidden="true" className="ticker-copy flex shrink-0 gap-3 pe-3 motion-reduce:hidden">
            {items.map((item) => (
              <li key={item}>
                <Chip>{item}</Chip>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <button
        type="button"
        onClick={() => setPaused((value) => !value)}
        aria-pressed={paused}
        className="btn btn-secondary shrink-0 px-3 font-mono text-label motion-reduce:hidden"
      >
        {paused ? "Play" : "Pause"}
      </button>
    </div>
  );
}

/** Renders the final value on the server, then counts up once on first entry. */
export function CountUp({ value, suffix = "" }: { value: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    let frame = 0;
    const stop = onFirstEntry(element, () => {
      const start = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - start) / 1200, 1);
        const eased = 1 - (1 - progress) ** 3;
        element.textContent = `${Math.round(eased * value)}${suffix}`;
        if (progress < 1) frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);
    });

    return () => {
      stop();
      cancelAnimationFrame(frame);
      element.textContent = `${value}${suffix}`;
    };
  }, [value, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {value}
      {suffix}
    </span>
  );
}

const STAGGER_MS = 70;
const REVEAL_MS = 500;

function playReveal(list: HTMLElement | null) {
  if (!list || prefersReducedMotion()) return;
  Array.from(list.children).forEach((card, index) => {
    card.animate(
      [
        { opacity: 0, transform: "translateY(14px)" },
        { opacity: 1, transform: "translateY(0)" },
      ],
      {
        duration: REVEAL_MS,
        delay: index * STAGGER_MS,
        easing: "cubic-bezier(0.2, 0.7, 0.2, 1)",
        fill: "backwards",
      },
    );
  });
}

/** Stays visible without JavaScript: the animation only adds the entrance. */
export function RevealDemo({ labels }: { labels: string[] }) {
  const container = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const list = container.current;
    if (!list) return;
    return onFirstEntry(list, () => playReveal(list));
  }, []);

  const play = () => playReveal(container.current);

  return (
    <div>
      <ul ref={container} className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {labels.map((label, index) => (
          <li key={label} className="glass p-5">
            <p className="font-mono text-label text-muted">{index * STAGGER_MS} ms delay</p>
            <p className="mt-6 font-display text-h4 font-medium">{label}</p>
          </li>
        ))}
      </ul>
      <button type="button" onClick={play} className="btn btn-secondary mt-6 motion-reduce:hidden">
        Replay reveal
      </button>
      <p className="mt-6 hidden text-small text-muted motion-reduce:block">
        Reduced motion is on, so these cards appear without animation.
      </p>
    </div>
  );
}
