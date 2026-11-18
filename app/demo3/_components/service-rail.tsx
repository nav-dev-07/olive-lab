"use client";

import { type FocusEvent, type ReactNode, useEffect, useRef } from "react";

/** Keep in sync with the .lg-rail-stage media query in globals.css. */
const PIN_QUERY = "(prefers-reduced-motion: no-preference) and (min-height: 32rem)";

/**
 * Pins the section while vertical scrolling moves the cards sideways, then lets
 * the page carry on once the last card is in view. The section is made taller by
 * exactly the distance the cards travel, so one pixel scrolled moves them one pixel.
 * Where pinning is off, the row is an ordinary horizontal scroller.
 */
export function ServiceRail({ heading, children }: { heading: ReactNode; children: ReactNode }) {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const track = trackRef.current;
    if (!section || !stage || !track) return;

    const query = window.matchMedia(PIN_QUERY);
    let distance = 0;
    let frame = 0;

    const place = () => {
      frame = 0;
      const x = Math.min(Math.max(-section.getBoundingClientRect().top, 0), distance);
      track.style.transform = `translate3d(${-x}px, 0, 0)`;
    };

    const onScroll = () => {
      if (distance > 0 && !frame) frame = requestAnimationFrame(place);
    };

    const measure = () => {
      distance = query.matches ? Math.max(track.offsetWidth - stage.clientWidth, 0) : 0;
      section.style.height = distance > 0 ? `${stage.offsetHeight + distance}px` : "";
      if (distance > 0) place();
      else track.style.transform = "";
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(track);
    query.addEventListener("change", measure);
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      query.removeEventListener("change", measure);
      window.removeEventListener("scroll", onScroll);
      section.style.height = "";
      track.style.transform = "";
    };
  }, []);

  /** Tabbing to a card that's off to the side scrolls the page until it's in view. */
  const showFocusedCard = (event: FocusEvent<HTMLUListElement>) => {
    const section = sectionRef.current;
    const stage = stageRef.current;
    const first = event.currentTarget.firstElementChild;
    const card = event.target.closest("li");
    if (!section?.style.height || !stage || !first || !card) return;

    const offset = card.getBoundingClientRect().left - first.getBoundingClientRect().left;
    const distance = section.offsetHeight - stage.offsetHeight;
    window.scrollTo({ top: section.getBoundingClientRect().top + window.scrollY + Math.min(offset, distance) });
  };

  return (
    <section ref={sectionRef} id="services" className="lg-light relative bg-night">
      <div ref={stageRef} className="lg-rail-stage relative z-1 flex flex-col justify-center pt-24 pb-6">
        {heading}
        <ul
          ref={trackRef}
          onFocus={showFocusedCard}
          className="flex w-max gap-4 self-start px-[max(5vw,calc((100vw-85rem)/2))] will-change-transform"
        >
          {children}
        </ul>
      </div>
    </section>
  );
}
