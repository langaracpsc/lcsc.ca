/**
 * Shared by the home page and /build. Titles, meta lines and categories are the
 * Figma's, except Build Labs' category (the Figma's "Learn by doing");
 * descriptions are plainer. Project 0 says nothing about what it is until the
 * club reviews it (a Figma content rule).
 */
export type Program = {
  /** Anchor on /build that the home cards deep-link to. */
  id: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  action: string;
};

export const PROGRAMS = [
  {
    id: "build-nights",
    category: "Drop in & build",
    title: "Build Nights",
    description:
      "Work on your own project with other people around, and get help when a bug won’t budge.",
    meta: "Peer support · All levels",
    action: "More about Build Nights",
  },
  {
    id: "build-labs",
    category: "Workshops",
    title: "Build Labs",
    description:
      "Someone walks you through a skill, and you try it on something of your own.",
    meta: "Hands on · Beginner friendly",
    action: "More about Build Labs",
  },
  {
    id: "project-0",
    category: "Find your start",
    title: "Project 0",
    description:
      "Want to know what Project 0 is and how to get involved? Ask in Discord.",
    meta: "Community · Get involved",
    action: "Ask about Project 0",
  },
] as const satisfies readonly Program[];

export type ProgramId = (typeof PROGRAMS)[number]["id"];

/** Typed, so a misspelt id fails the build. */
export const buildAnchor = (id: ProgramId) => `/build#${id}`;
