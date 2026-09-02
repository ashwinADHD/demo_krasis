export const SECTIONS = ["hero", "about", "contact"] as const;

export type SectionId = (typeof SECTIONS)[number];

export const MOBILE_BREAKPOINT = 768;

export const site = {
  name: "KRASIS",
  tagline: "Where innovation meets the cosmos",
  email: "hello@krsis.com",
  description: "KRASIS — Where innovation meets the cosmos.",
} as const;
