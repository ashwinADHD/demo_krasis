export const SECTIONS = ["hero", "about", "engagement", "capabilities", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

export const site = {
  name: "KRASIS",
  tagline: "Engineered by Systems Architects. Accelerated by AI.",
  description:
    "KRASIS designs, builds, and hardens mission-critical software, embedded hardware, medical IoT, and sovereign cloud infrastructure — pairing senior systems engineers with autonomous AI pipelines.",
} as const;
