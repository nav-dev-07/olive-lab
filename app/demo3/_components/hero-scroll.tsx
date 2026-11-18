"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { SplitButton } from "@/components/split-button";
import { Logo } from "@/components/ui";

const FRAME_COUNT = 239;
const LAST_FRAME = FRAME_COUNT - 1;
const MAX_PIXEL_RATIO = 2;
const CONCURRENT_LOADS = 6;

const frameSrc = (index: number) => `/demo3/hero/frame-${String(index + 1).padStart(3, "0")}.webp`;

/**
 * Loads coarse frames first and fills in the gaps, so scrubbing works from the
 * start and sharpens as the rest arrive. Returns a function that stops loading.
 */
function loadFrames(frames: (HTMLImageElement | undefined)[], smallestStep: number, onLoad: () => void) {
  const queue = [0, LAST_FRAME];
  for (let step = 16; step >= smallestStep; step /= 2) {
    for (let index = 0; index < FRAME_COUNT; index += step) {
      if (!queue.includes(index)) queue.push(index);
    }
  }

  let stopped = false;
  const loadNext = () => {
    const index = queue.shift();
    if (index === undefined || stopped) return;
    const image = document.createElement("img");
    image.src = frameSrc(index);
    image
      .decode()
      .then(() => {
        if (stopped) return;
        frames[index] = image;
        onLoad();
      })
      // A missing frame is covered by its nearest neighbor.
      .catch(() => {})
      .finally(loadNext);
  };
  for (let slot = 0; slot < CONCURRENT_LOADS; slot += 1) loadNext();

  return () => {
    stopped = true;
  };
}

function nearestLoaded(frames: (HTMLImageElement | undefined)[], target: number) {
  for (let distance = 0; distance < FRAME_COUNT; distance += 1) {
    if (frames[target - distance]) return target - distance;
    if (frames[target + distance]) return target + distance;
  }
  return -1;
}

/** Scroll position drives the film frame by frame. With reduced motion, the first frame stays still. */
export function HeroScroll() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const context = canvas?.getContext("2d");
    if (!section || !canvas || !context) return;

    gsap.registerPlugin(ScrollTrigger);

    const media = gsap.matchMedia(section);
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const frames: (HTMLImageElement | undefined)[] = new Array(FRAME_COUNT);
      const playhead = { frame: 0 };
      let drawnIndex = -1;

      const draw = () => {
        const index = nearestLoaded(frames, Math.round(playhead.frame));
        const image = frames[index];
        if (!image || index === drawnIndex) return;
        // Same crop as object-cover, so the canvas lines up with the poster beneath it.
        const scale = Math.max(canvas.width / image.naturalWidth, canvas.height / image.naturalHeight);
        const width = image.naturalWidth * scale;
        const height = image.naturalHeight * scale;
        context.imageSmoothingQuality = "high";
        context.drawImage(image, (canvas.width - width) / 2, (canvas.height - height) / 2, width, height);
        drawnIndex = index;
      };

      const resize = new ResizeObserver(([entry]) => {
        const ratio = Math.min(window.devicePixelRatio, MAX_PIXEL_RATIO);
        canvas.width = Math.round(entry.contentRect.width * ratio);
        canvas.height = Math.round(entry.contentRect.height * ratio);
        // Resizing clears the canvas, so the current frame has to be painted again.
        drawnIndex = -1;
        draw();
      });
      resize.observe(canvas);

      // Phones load every second frame, which halves the download and looks the same at this scroll speed.
      const smallestStep = window.matchMedia("(max-width: 47.99rem)").matches ? 2 : 1;
      const stopLoading = loadFrames(frames, smallestStep, draw);

      // Timeline positions are shares of the whole scroll, because the film and progress rail run for a duration of 1.
      gsap
        .timeline({
          defaults: { ease: "none" },
          scrollTrigger: { trigger: section, start: "top top", end: "bottom bottom", scrub: 0.5 },
        })
        .to(playhead, { frame: LAST_FRAME, duration: 1, onUpdate: draw }, 0)
        .to("[data-hero-rail]", { scaleY: 1, duration: 1 }, 0)
        .to("[data-hero-intro], [data-hero-cue]", { autoAlpha: 0, duration: 0.1 }, 0.02)
        .to("[data-hero-intro-copy]", { y: -24, duration: 0.1 }, 0.02);

      return () => {
        stopLoading();
        resize.disconnect();
      };
    });

    return () => media.revert();
  }, []);

  return (
    <section ref={sectionRef} aria-labelledby="hero-title" className="relative h-svh motion-safe:h-[500svh]">
      <div className="sticky top-0 h-svh overflow-hidden">
        <Image src={frameSrc(0)} alt="" fill unoptimized loading="eager" sizes="100vw" className="object-cover" />
        <canvas
          ref={canvasRef}
          role="img"
          aria-label="A studio light fixture turns side-on and resolves into a glowing ring, then an engineering blueprint."
          className="absolute inset-0 size-full"
        />

        <header className="absolute inset-x-0 top-0 z-10">
          <div className="mx-auto flex w-full max-w-content items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
            <Logo className="text-h3" />
            <SplitButton>Request demo</SplitButton>
          </div>
        </header>

        <div data-hero-intro className="absolute inset-0 flex flex-col justify-end">
          {/* From lg up the text clears the lens, so the scrim leaves a hole that keeps the lit disc at full brightness. */}
          <div className="absolute inset-0 bg-linear-to-t from-night from-38% via-night/90 via-52% to-transparent to-72% portrait:sm:from-32% portrait:sm:via-night/85 portrait:sm:via-37% portrait:sm:to-48% lg:from-20% lg:via-night/85 lg:via-38% lg:to-58% lg:[mask-image:radial-gradient(circle_at_center,transparent_max(21svh,12vw),#000_max(25svh,14vw))]" />
          <div data-hero-intro-copy className="relative mx-auto grid w-full max-w-content items-end gap-6 px-4 pb-6 sm:px-6 lg:grid-cols-[minmax(0,1fr)_27.75rem] lg:px-8 lg:pb-8">
            <div>
              <p className="mb-4 font-mono text-label text-accent max-lg:landscape:hidden">Enterprise AI software · Deep-tech R&amp;D studio</p>
              <h1 id="hero-title" className="text-display lg:[font-size:min(4.375rem,8.5svh,5vw)]">
                Enterprise AI, Robotics &amp; <span className="whitespace-nowrap">Deep-Tech</span> Solutions
              </h1>
            </div>
            <div>
              <p className="hidden text-body text-fg sm:block max-lg:landscape:hidden">
                Olive Labs is a Dubai-based AI and deep-tech company delivering enterprise AI software, robotics solutions, autonomous systems, computer vision and intelligent prototypes across the UAE.
              </p>
              <div className="flex flex-wrap gap-2 sm:mt-5">
                <SplitButton>Request a demo</SplitButton>
                <SplitButton variant="border">Explore products</SplitButton>
              </div>
            </div>
          </div>
        </div>

        <div aria-hidden="true" className="absolute top-1/2 right-2 flex -translate-y-1/2 flex-col items-center gap-3 motion-reduce:hidden sm:right-4">
          <div className="h-24 w-px bg-line-strong">
            <div data-hero-rail className="h-full w-full origin-top scale-y-0 bg-accent" />
          </div>
          <p data-hero-cue className="font-mono text-label text-fg [writing-mode:vertical-rl]">Scroll</p>
        </div>
      </div>
    </section>
  );
}
