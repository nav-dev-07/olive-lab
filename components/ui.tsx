import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

type ButtonBase = {
  variant?: ButtonVariant;
  arrow?: boolean;
  className?: string;
  children: ReactNode;
};

type ButtonProps =
  | (ButtonBase & { href: string } & Omit<ComponentProps<typeof Link>, "href" | "className">)
  | (ButtonBase & { href?: undefined } & Omit<ComponentProps<"button">, "className">);

export function Button({ variant = "primary", arrow, className = "", children, ...rest }: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`;
  const content = (
    <>
      {children}
      {arrow ? <ArrowIcon className="size-4" /> : null}
    </>
  );

  if (rest.href !== undefined) {
    return (
      <Link className={classes} {...(rest as ComponentProps<typeof Link>)}>
        {content}
      </Link>
    );
  }

  const buttonProps = rest as ComponentProps<"button">;
  return (
    <button type="button" className={classes} {...buttonProps}>
      {content}
    </button>
  );
}

const chipTones = {
  neutral: "bg-raised text-fg",
  accent: "bg-accent text-night",
  alt: "bg-accent-2-soft text-night",
  highlight: "bg-highlight text-night",
} as const;

export function Chip({
  tone = "neutral",
  className = "",
  children,
}: {
  tone?: keyof typeof chipTones;
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center rounded-sm px-2.5 py-1 font-mono text-label font-medium whitespace-nowrap ${chipTones[tone]} ${className}`}
    >
      {children}
    </span>
  );
}

export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`font-display font-medium tracking-tight text-fg ${className}`}>
      Olive<span className="text-highlight">.</span>Labs
    </span>
  );
}

type IconProps = { className?: string };

function Icon({ className = "size-6", children }: IconProps & { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="square"
      aria-hidden="true"
      className={className}
    >
      {children}
    </svg>
  );
}

export function ArrowIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 12h15M13 6l6 6-6 6" />
    </Icon>
  );
}

export function MenuIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 8h16M4 16h16" />
    </Icon>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </Icon>
  );
}

export function SunIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 3v2M12 19v2M3 12h2M19 12h2M5.6 5.6l1.4 1.4M17 17l1.4 1.4M5.6 18.4L7 17M17 7l1.4-1.4" />
    </Icon>
  );
}

export function MoonIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M20 14.5A8.5 8.5 0 1 1 9.5 4a6.8 6.8 0 0 0 10.5 10.5z" />
    </Icon>
  );
}

export function SoftwareIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M7 7h10v10H7zM10 3v4M14 3v4M10 17v4M14 17v4M3 10h4M3 14h4M17 10h4M17 14h4" />
      <path d="M10.5 10.5h3v3h-3z" />
    </Icon>
  );
}

export function RobotIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M4 21h9M8.5 21v-4l-3-6 7-5 4 4" />
      <path d="M16.5 10l3.5 1M16.5 10l1 3.5" />
      <circle cx="5.5" cy="11" r="1.5" />
      <circle cx="12.5" cy="6" r="1.5" />
    </Icon>
  );
}

export function VisionIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M3 8V4h4M17 4h4v4M21 16v4h-4M7 20H3v-4" />
      <path d="M6 12s2.4-4 6-4 6 4 6 4-2.4 4-6 4-6-4-6-4z" />
      <circle cx="12" cy="12" r="1.5" />
    </Icon>
  );
}

export function ResearchIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M10 3h4M11 3v6l-5.5 9a2 2 0 001.7 3h9.6a2 2 0 001.7-3L13 9V3" />
      <path d="M8 15h8" />
    </Icon>
  );
}

/** Pillar 01. Nodes light up in sequence, like a prototype being validated. */
export function PrototypeIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <path d="M6 6h12v12H6z" opacity="0.45" />
      <path d="M6 6l6 6 6-6M12 12v6" opacity="0.45" />
      <circle className="icon-pulse" cx="6" cy="6" r="1.75" fill="currentColor" stroke="none" />
      <circle className="icon-pulse-late" cx="18" cy="6" r="1.75" fill="currentColor" stroke="none" />
      <circle className="icon-pulse" cx="12" cy="18" r="1.75" fill="currentColor" stroke="none" />
    </Icon>
  );
}

/** Pillar 02. A slow orbit, for long-horizon work. */
export function StudioIcon(props: IconProps) {
  return (
    <Icon {...props}>
      <circle cx="12" cy="12" r="2.5" />
      <g className="icon-spin">
        <circle cx="12" cy="12" r="9" strokeDasharray="4 3.5" opacity="0.6" />
        <circle cx="12" cy="3" r="1.5" fill="currentColor" stroke="none" />
      </g>
    </Icon>
  );
}
