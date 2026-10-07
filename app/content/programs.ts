/**
 * The Build series — the three program cards shared by the home page's
 * "Build overview" and the /build page's program grid.
 *
 * Titles, categories and meta lines are the Figma's `Card / Program`
 * instances; the descriptions were rewritten in plainer words. The Figma's own
 * content rules say "Project 0 details need club review", so the Project 0
 * card says nothing about what it is (no dates, no scope, no promises) until
 * the club signs off.
 */
export type Program = {
  /** Anchor id on /build, so home cards can deep-link to the right card. */
  id: string;
  category: string;
  title: string;
  description: string;
  meta: string;
  action: string;
};

export const PROGRAMS: Program[] = [
  {
    id: "build-nights",
    category: "Drop in & build",
    title: "Build Nights",
    description:
      "Work on your own project with other people around, and get help when a bug won’t budge.",
    meta: "Peer support · All levels",
    action: "Explore Build Nights",
  },
  {
    id: "build-labs",
    category: "Learn by doing",
    title: "Build Labs",
    description:
      "Guided workshops. Learn a skill, then use it on something of your own.",
    meta: "Hands on · Beginner friendly",
    action: "Explore Build Labs",
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
];
