/*
 * All copy comes from olivelab.tech and is tightened to fit this layout. The FAQ
 * questions are new, but every answer uses facts stated on that site.
 */

export const SITE = "https://olivelab.tech";

/** The same menu as olivelab.tech. */
export const NAV_LINKS = [
  { label: "About", href: `${SITE}/about` },
  { label: "Products", href: `${SITE}/products` },
  { label: "Technology", href: `${SITE}/technology` },
  { label: "Projects", href: `${SITE}/projects` },
  { label: "Team", href: `${SITE}/team` },
  { label: "Careers", href: `${SITE}/careers` },
  { label: "Contact", href: `${SITE}/contact` },
];

export const MARQUEE = [
  "Enterprise AI",
  "Prototype Development",
  "Workflow Automation",
  "Business Intelligence",
  "AI Document Processing",
  "Healthcare Operations",
  "Customer Support AI",
  "Adaptive Learning",
  "R&D Partnerships",
  "Custom Engineering",
];

export const REASONS = [
  {
    title: "AI-first engineering",
    text: "Models, retrieval and evaluation are built into our products from day one.",
  },
  {
    title: "Prototype to production",
    text: "Rapid prototyping and rigorous engineering take your idea from proof of concept to fleet.",
  },
  {
    title: "Measured outcomes",
    text: "We prioritise measurable business outcomes over technology for its own sake.",
  },
];

export const SERVICES = [
  {
    title: "AI software development",
    href: `${SITE}/products`,
    image: "/cards/ai-software.png",
    lightImage: "/demo3/site/light/ai-software.png",
  },
  {
    title: "Robotics & autonomous systems",
    href: `${SITE}/projects`,
    image: "/cards/robotics.png",
    lightImage: "/demo3/site/light/robotics.png",
  },
  {
    title: "Computer vision & perception",
    href: `${SITE}/technology`,
    image: "/cards/computer-vision.png",
    lightImage: "/demo3/site/light/computer-vision.png",
  },
  {
    title: "Deep-tech R&D",
    href: `${SITE}/research`,
    image: "/cards/deep-tech.png",
    lightImage: "/demo3/site/light/deep-tech.png",
  },
];

export const STATS = [
  { value: "98.6%", label: "Uptime, last 12 months" },
  { value: "4", label: "Industries served" },
  { value: "SOC 2", label: "Aligned controls" },
];

export const FAQS = [
  {
    question: "What does Olive Labs build?",
    answer:
      "We are an AI-first software studio from Dubai. We build enterprise AI software, robotics and autonomous systems, and computer vision, and we run a select R&D practice with a small number of partners.",
  },
  {
    question: "How does an engagement work?",
    answer:
      "It runs in six phases: discovery, strategy, design, development, deployment, then support and improvement. Small, senior pods ship in two-week increments, with working software at every checkpoint.",
  },
  {
    question: "Can you take a prototype to production?",
    answer:
      "Yes. Rapid prototyping validates hardware, autonomy and conversational experiences first. Rigorous engineering then scales the work from proof of concept to fleet.",
  },
  {
    question: "How do you handle security?",
    answer:
      "Our controls are aligned with SOC 2 Type II, and our products share a foundation with SSO, SCIM and audit. VPC and on-prem deployments are available on Enterprise plans.",
  },
];

export const WORK = [
  {
    tag: "Robotics · Long-horizon",
    tone: "neutral" as const,
    title: "Humanoid Robotics Platform",
    text: "A general-purpose body for the physical world.",
    href: `${SITE}/projects/humanoid-platform`,
    image: "/demo3/site/project-humanoid-tall.png",
    lightImage: "/demo3/site/light/project-humanoid.png",
  },
  {
    tag: "Robotics-as-a-Service",
    tone: "accent" as const,
    title: "RaaS Platform",
    text: "Deploy robotic fleets and services as a subscription.",
    href: `${SITE}/products/raas-platform`,
    image: "/demo3/site/project-raas.png",
    lightImage: "/demo3/site/light/project-raas.png",
  },
  {
    tag: "Healthcare · IoT",
    tone: "alt" as const,
    title: "Smart Pill Dispenser",
    text: "Smart medication dispensing for reliable patient adherence.",
    href: `${SITE}/projects/smart-medication-system`,
    image: "/demo3/site/project-pill-right.png",
    lightImage: "/demo3/site/light/project-pill.png",
  },
];

/** The live site's Privacy and Terms links don't lead anywhere yet, so these match that. */
export const FOOTER_LINKS = [
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "Admin", href: `${SITE}/admin/login` },
];

export const CONTACT_DETAILS = [
  { label: "General", value: "hello@olivelab.tech", href: "mailto:hello@olivelab.tech" },
  { label: "Sales", value: "sales@olivelab.tech", href: "mailto:sales@olivelab.tech" },
  { label: "Office", value: "Olive Labs FZ-LLC, Dubai, United Arab Emirates" },
];
