"use client";

import Image from "next/image";
import { type MouseEvent, useEffect, useState } from "react";
import { SplitButton } from "@/components/split-button";
import { CloseIcon, Logo, MenuIcon, MoonIcon, SunIcon } from "@/components/ui";
import { NAV_LINKS } from "./content";

/** Ignores the tiny scroll jitter from trackpads, so the bar doesn't flicker. */
const SCROLL_TOLERANCE = 4;
const ALWAYS_VISIBLE_ABOVE = 80;
const LOGO_MARK = { width: 182, height: 222 };

/** A floating bar that slides away when scrolling down and returns when scrolling up. */
export function SiteNav() {
  const [isHidden, setIsHidden] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLight, setIsLight] = useState(false);

  useEffect(() => {
    let lastY = window.scrollY;
    const onScroll = () => {
      const y = window.scrollY;
      if (Math.abs(y - lastY) < SCROLL_TOLERANCE) return;
      setIsHidden(y > lastY && y > ALWAYS_VISIBLE_ABOVE);
      lastY = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setIsOpen(false);

  /** The page always opens dark. The choice isn't saved, so a reload returns to dark. */
  const toggleMode = (event: MouseEvent<HTMLButtonElement>) => {
    const nextIsLight = !isLight;
    setIsLight(nextIsLight);
    event.currentTarget.closest(".lg-page")?.setAttribute("data-mode", nextIsLight ? "light" : "dark");
  };

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-[5%] pt-5 lg:pt-6">
      <div
        className={`pointer-events-auto w-full transition-transform duration-700 ease-in-out has-[:focus-visible]:translate-y-0 lg:w-auto ${
          isHidden && !isOpen ? "-translate-y-[150%]" : "translate-y-0"
        }`}
      >
        <div className="flex min-h-16 items-center justify-between gap-4 rounded-lg border border-line-strong bg-surface px-5 lg:min-h-[3.875rem] lg:justify-start lg:pr-3 lg:pl-6 xl:gap-8">
          <a href="#top" onClick={close} className="flex shrink-0 items-center gap-2 text-xl">
            {/* The mark from olivelab.tech is white, so it inverts to black in light mode. */}
            <Image
              src="/demo3/site/logo-mark.png"
              alt=""
              width={LOGO_MARK.width}
              height={LOGO_MARK.height}
              loading="eager"
              className="h-7 w-auto transition-[filter] duration-400 ease-in-out in-data-[mode=light]:invert"
            />
            <Logo />
          </a>
          <nav aria-label="Main" className="hidden items-center lg:flex">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-2 py-2 text-small tracking-tight transition duration-400 ease-in-out hover:scale-[.96] xl:px-4"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            {/* Phones have no room for this beside the logo and icons, so it moves into their menu. */}
            <SplitButton href="#contact" onClick={close} className="max-sm:hidden">
              Request demo
            </SplitButton>
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls="site-menu"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              onClick={() => setIsOpen((open) => !open)}
              className="flex size-10 cursor-pointer items-center justify-center lg:hidden"
            >
              {isOpen ? <CloseIcon className="size-6" /> : <MenuIcon className="size-6" />}
            </button>
            <button
              type="button"
              aria-label={isLight ? "Switch to dark mode" : "Switch to light mode"}
              onClick={toggleMode}
              className="flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg bg-fg text-night transition duration-400 ease-in-out hover:scale-[.96]"
            >
              {isLight ? <MoonIcon className="size-5" /> : <SunIcon className="size-5" />}
            </button>
          </div>
        </div>

        <nav
          id="site-menu"
          aria-label="Mobile"
          hidden={!isOpen}
          className="mt-2 rounded-lg border border-line-strong bg-surface p-5 lg:hidden"
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} onClick={close} className="block py-3 text-center text-body-lg">
              {link.label}
            </a>
          ))}
          <SplitButton href="#contact" onClick={close} className="mx-auto mt-3 sm:hidden">
            Request demo
          </SplitButton>
        </nav>
      </div>
    </header>
  );
}
