"use client";

import { useEffect } from "react";

/** Plays each [data-reveal] animation once, as soon as its element enters the viewport. */
export function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.setAttribute("data-revealed", "");
        observer.unobserve(entry.target);
      }
    });
    document.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return null;
}
