import Image, { type ImageProps } from "next/image";
import type { ReactNode } from "react";
import { SplitButton } from "@/components/split-button";
import { ArrowIcon, Chip } from "@/components/ui";
import {
  CONTACT_DETAILS,
  FAQS,
  FOOTER_LINKS,
  MARQUEE,
  REASONS,
  SERVICES,
  SITE,
  STATS,
  WORK,
} from "./content";
import { FaqList } from "./faq-list";
import { ContactForm, NewsletterForm } from "./mail-forms";
import { ServiceRail } from "./service-rail";

const container = "mx-auto w-full max-w-[85rem] px-[5%] xl:px-[2%]";
const sectionSpacing = "py-12 md:py-16 lg:py-20";
const sectionTitle = "font-display text-[clamp(2.25rem,1.9rem+1.2vw,3rem)] leading-[1.2] tracking-[-0.02em]";

function Reveal({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div data-reveal="" className={className}>
      {children}
    </div>
  );
}

/**
 * A photo in both modes, stacked so that switching crossfades them. Both load up front,
 * so nothing has to download at the moment of the switch.
 */
function ThemedImage({
  src,
  lightSrc,
  className,
  preload,
  ...rest
}: Omit<ImageProps, "src" | "alt" | "fill"> & { src: string; lightSrc: string }) {
  return (
    <>
      <Image src={src} alt="" fill preload={preload} className={`lg-img-dark ${className}`} {...rest} />
      <Image src={lightSrc} alt="" fill className={`lg-img-light ${className}`} {...rest} />
    </>
  );
}

function Hero() {
  return (
    <div id="top" className="sticky top-0 overflow-hidden bg-night">
      {/* On phones the photo sits in the lower part of the hero, so both robot arms stay in frame. */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] mask-t-from-85% sm:h-full sm:mask-none">
        <ThemedImage
          src="/demo3/site/hero-lower.png"
          lightSrc="/demo3/site/light/hero-lower.png"
          preload
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div className="absolute inset-0 bg-linear-to-t from-night/80 via-transparent to-transparent" />

      <div className={`${container} relative flex min-h-svh flex-col items-center justify-between`}>
        {/* The top gap follows the window height, which keeps the text well clear of the nav bar and the robot arms. */}
        <div className="max-w-[80rem] pt-[clamp(7.25rem,18svh+0.75rem,13.75rem)] text-center">
          <Reveal>
            <h1 className="font-display text-[clamp(2.32rem,5.15vw,3.605rem)] leading-[1.2] tracking-[-0.02em]">
              Enterprise AI, robotics &amp; deep-tech
            </h1>
          </Reveal>
          <Reveal className="mx-auto mt-[1.125rem] max-w-[46rem]">
            <p className="text-body">
              A Dubai-based AI and deep-tech company delivering enterprise AI software, autonomous systems, computer
              vision and intelligent prototypes across the UAE.
            </p>
          </Reveal>
          <Reveal className="mt-[calc(0.5rem+10svh)]">
            <SplitButton href="#services" variant="border" className="lg-explore mx-auto">
              Explore
            </SplitButton>
          </Reveal>
        </div>

        <div className="w-full pb-6">
          <div data-reveal="" className="border-t border-line-strong" />
          <div className="ticker mt-6">
            <div className="ticker-track [animation-duration:40s]">
              {[false, true].map((isCopy) => (
                <ul key={String(isCopy)} aria-hidden={isCopy} className="flex shrink-0 items-center">
                  {MARQUEE.map((item) => (
                    <li key={item} className="flex items-center font-display text-xl whitespace-nowrap">
                      <span>{item}</span>
                      <span aria-hidden="true" className="px-10 text-accent">
                        ·
                      </span>
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WhyUs() {
  return (
    <section id="why-us" aria-label="Why Olive Labs" className={`relative z-1 bg-night ${sectionSpacing}`}>
      <div className={container}>
        <ul className="mx-auto flex max-w-[48rem] flex-col gap-3">
          {REASONS.map((reason, index) => (
            <li key={reason.title}>
              <Reveal className="overflow-hidden rounded-md bg-surface">
                <div className="flex items-center justify-between border-b border-line-strong p-5">
                  <span className="text-small font-medium">{String(index + 1).padStart(2, "0")}</span>
                  <span className="size-2.5 rounded-full bg-accent" />
                </div>
                <div className="flex flex-col gap-5 p-5">
                  <h2 className="font-display text-[2rem] leading-[1.2] tracking-[-0.01em]">{reason.title}</h2>
                  <p className="max-w-[34.375rem] text-muted">{reason.text}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Services() {
  return (
    <ServiceRail
      heading={
        <Reveal className="mb-8 px-[5%] text-center">
          <h2 className={sectionTitle}>What we build</h2>
        </Reveal>
      }
    >
      {SERVICES.map((service) => (
        <li key={service.title} className="shrink-0">
          <a
            href={service.href}
            className="lg-rail-card group relative flex items-end overflow-hidden rounded-md bg-surface p-4"
          >
            <ThemedImage
              src={service.image}
              lightSrc={service.lightImage}
              loading="eager"
              sizes="(min-width: 64rem) 48rem, 82vw"
              className="object-cover transition-transform duration-500 ease-in-out group-hover:scale-110"
            />
            <div className="relative flex w-full items-center justify-between gap-4 rounded-sm bg-surface px-4 py-2">
              <h3 className="font-sans text-body-lg font-normal">{service.title}</h3>
              <span className="lg-accent-icon border-l border-line-strong py-1 pl-5 text-accent">
                <ArrowIcon className="size-5" />
              </span>
            </div>
          </a>
        </li>
      ))}
    </ServiceRail>
  );
}

function Work() {
  return (
    <section id="work" aria-labelledby="work-title" className={`bg-surface ${sectionSpacing}`}>
      <div className={container}>
        <Reveal className="mb-12 text-center lg:mb-20">
          <h2 id="work-title" className={sectionTitle}>
            A few things we&rsquo;re proud of.
          </h2>
        </Reveal>
        {/* One tall card on the left beside two stacked wide cards. Their height sets the tall card's. */}
        <ul className="grid grid-cols-1 gap-4 lg:grid-cols-[.75fr_1fr]">
          {WORK.map((item, index) => {
            const isTall = index === 0;
            return (
              <li key={item.title} className={isTall ? "lg:row-span-2" : ""}>
                <Reveal className="h-full">
                  <a
                    href={item.href}
                    className={`group relative flex w-full flex-col justify-between gap-6 overflow-hidden rounded-lg bg-night p-5 lg:p-6 ${
                      isTall ? "aspect-[3/4] h-full md:aspect-[3/2] lg:aspect-auto" : "aspect-[3/2] lg:aspect-[2/1]"
                    }`}
                  >
                    <ThemedImage
                      src={item.image}
                      lightSrc={item.lightImage}
                      sizes={isTall ? "(min-width: 64rem) 40vw, 100vw" : "(min-width: 64rem) 55vw, 100vw"}
                      className="object-cover object-[50%_15%] transition-transform duration-500 ease-in-out group-hover:scale-105 lg:object-center"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-night via-night/10 via-50% to-transparent" />
                    <div className="relative flex items-start justify-between gap-4">
                      <Chip tone={item.tone}>{item.tag}</Chip>
                      <span className="flex size-11 shrink-0 items-center justify-center rounded-lg bg-accent text-night">
                        <ArrowIcon className="size-5 -rotate-45" />
                      </span>
                    </div>
                    <div className="relative max-w-[20rem]">
                      <h3 className="text-h3">{item.title}</h3>
                      <p className="mt-1 text-small">{item.text}</p>
                    </div>
                  </a>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="bg-surface pb-12 lg:py-12">
      <div className={`${container} grid gap-6 lg:grid-cols-[.5fr_1fr] lg:gap-20`}>
        <Reveal>
          <p className="text-small tracking-wide uppercase">About us</p>
        </Reveal>
        <div>
          <Reveal>
            <h2 id="about-title" className={sectionTitle}>
              Cultivating the synthesis of mind and machine
            </h2>
          </Reveal>
          <Reveal className="mt-8">
            <p className="text-muted">
              We are an AI-first software studio from Dubai, building intelligent SaaS products and partnering on
              deep-tech R&amp;D across robotics, autonomy and healthcare. Today we are a small, senior team, and we move
              slowly enough to be right and quickly enough to ship.
            </p>
          </Reveal>
          <Reveal className="mt-8">
            <SplitButton href={`${SITE}/team`} variant="border">
              Meet the team
            </SplitButton>
          </Reveal>
          <dl className="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {STATS.map((stat) => (
              <Reveal key={stat.label} className="flex flex-col-reverse gap-2 border-r border-line-strong pr-4">
                <dt className="text-muted">{stat.label}</dt>
                <dd className="font-display text-[clamp(2.5rem,2rem+1.8vw,4rem)] leading-[1.2] tracking-[-0.02em]">
                  {stat.value}
                </dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Idea() {
  return (
    <section aria-labelledby="idea-title" className="lg-idea lg-light relative overflow-hidden bg-night">
      {/* From lg up the arm is sized by the section's height, so the whole curve shows on any screen. */}
      <div className="absolute top-84 -right-[20%] aspect-[2/3] w-full sm:top-72 sm:-right-[6%] sm:w-[80%] lg:top-[8%] lg:right-[5%] lg:h-[105%] lg:w-auto xl:right-[11%]">
        <div data-reveal="image" className="relative size-full">
          <ThemedImage
            src="/demo3/site/idea.png"
            lightSrc="/demo3/site/light/idea.png"
            loading="eager"
            sizes="(min-width: 64rem) 50vw, 100vw"
            className="lg-idea-image object-cover"
          />
        </div>
        <span aria-hidden="true" className="lg-dot absolute top-[50%] left-[62%] z-2 hidden lg:block" />
      </div>
      <div
        className={`${container} relative z-1 flex min-h-[42rem] flex-col py-12 md:min-h-[90svh] lg:min-h-svh lg:justify-center`}
      >
        <Reveal>
          <h2
            id="idea-title"
            className="bg-linear-to-r from-accent to-fg bg-clip-text pb-2 font-display text-[clamp(2.75rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em] text-transparent"
          >
            Have an idea
            <br />
            worth engineering?
          </h2>
        </Reveal>
        <Reveal className="mt-10">
          <a
            href="mailto:hello@olivelab.tech"
            className="lg-mail inline-flex min-h-11 items-center gap-3 font-display text-h3 text-fg transition-colors duration-400 ease-in-out hover:text-accent"
          >
            <span className="underline underline-offset-6">hello@olivelab.tech</span>
            <ArrowIcon className="size-6 -rotate-45" />
          </a>
        </Reveal>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section aria-labelledby="faq-title" className={`relative bg-surface ${sectionSpacing}`}>
      <div className={`${container} grid gap-12 lg:grid-cols-[.75fr_1fr] lg:items-center lg:gap-20`}>
        <Reveal>
          <h2 id="faq-title" className={sectionTitle}>
            Answers that help you decide with confidence
          </h2>
        </Reveal>
        <FaqList items={FAQS} />
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" aria-labelledby="contact-title" className={`bg-night ${sectionSpacing}`}>
      <div className={`${container} grid items-stretch gap-4 lg:grid-cols-2`}>
        <div className="flex flex-col gap-4">
          <Reveal className="mb-10">
            <h2
              id="contact-title"
              className="font-display text-[clamp(3rem,2rem+4vw,5.5rem)] leading-none tracking-[-0.02em]"
            >
              Contact us
            </h2>
          </Reveal>
          {/* This card takes up the spare height, so both columns end on the same line. */}
          <Reveal className="flex flex-1 flex-col gap-6 rounded-lg bg-surface p-5 sm:p-8">
            <h3 className="text-h2">Get in touch</h3>
            <dl className="mt-auto">
              {CONTACT_DETAILS.map((detail) => (
                <div key={detail.label} className="border-t border-line-strong py-3 last:pb-0">
                  <dt className="text-label text-muted">{detail.label}</dt>
                  <dd className="mt-1">
                    {detail.href ? (
                      <a href={detail.href} className="underline-offset-4 hover:underline">
                        {detail.value}
                      </a>
                    ) : (
                      detail.value
                    )}
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
          <Reveal className="rounded-lg bg-surface p-5 sm:p-8">
            <p className="mb-4">Subscribe for product and research updates from the studio.</p>
            <NewsletterForm />
          </Reveal>
        </div>
        <Reveal className="rounded-lg bg-surface">
          <div className="px-5 pt-8 pb-6 sm:px-8">
            <h3 className="text-h2">Let&rsquo;s design what comes next.</h3>
            <p className="mt-3 max-w-[30rem] text-muted">
              Tell us about your organization, the problem you&rsquo;re trying to solve, and what success looks like.
            </p>
          </div>
          <ContactForm />
        </Reveal>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-night px-5 pt-16 pb-12 sm:px-8 lg:px-12 lg:pt-40">
      <Reveal>
        {/* Scales with the page width. The viewBox is the measured width of these letters in Space Grotesk. */}
        <svg role="img" aria-label="Olive Labs" viewBox="0 -74 467 78" className="block w-full overflow-visible">
          <text fontSize="100" fontWeight="600" letterSpacing="-2" className="font-display">
            <tspan className="fill-fg">Olive</tspan>
            <tspan className="fill-highlight">.</tspan>
            <tspan className="lg-word-labs fill-raised">Labs</tspan>
          </text>
        </svg>
      </Reveal>
      <div className="mt-12 flex flex-col gap-4 border-t border-line pt-8 font-mono text-[0.75rem] tracking-[0.2em] text-muted uppercase sm:flex-row sm:items-center sm:justify-between lg:mt-24">
        <p>© 2026 Olive Labs · Dubai, United Arab Emirates</p>
        <ul className="flex gap-8">
          {FOOTER_LINKS.map((link) => (
            <li key={link.label}>
              <a href={link.href} className="transition-colors duration-400 ease-in-out hover:text-fg">
                {link.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}

export function Sections() {
  return (
    <>
      <main>
        <div className="relative">
          <Hero />
          <WhyUs />
        </div>
        <Services />
        <Work />
        <About />
        <Idea />
        <Faq />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
