import { LINKS } from "../site-config";

/**
 * Figma 11:218, in its order. "Courses API" is renamed to match /projects.
 * Hrefs come from LINKS: the Figma's `*.langaracs.ca` hosts no longer resolve.
 */

export type ResourceCategory = "academic" | "build" | "community";

/** "All" isn't listed; the directory adds it first. */
export const RESOURCE_CATEGORIES: readonly {
  id: ResourceCategory;
  label: string;
}[] = [
  { id: "academic", label: "Academic" },
  { id: "build", label: "Build" },
  { id: "community", label: "Community" },
];

export type Resource = {
  id: string;
  category: ResourceCategory;
  title: string;
  description: string;
  /** Must be external: rows always open in a new tab. */
  href: string;
};

export const RESOURCES: readonly Resource[] = [
  {
    id: "transfer-information",
    category: "academic",
    title: "Transfer information",
    description: "Guides to transferring to SFU and UBC, written by Langara alumni.",
    href: LINKS.transferInfo,
  },
  {
    id: "course-planner",
    category: "academic",
    title: "Course Planner",
    description: "Plan your Langara courses and check transfer agreements.",
    href: LINKS.coursePlanner,
  },
  {
    id: "github-student-developer-pack",
    category: "build",
    title: "GitHub Student Developer Pack",
    description: "Free developer tools and cloud credits for students.",
    href: LINKS.githubStudentPack,
  },
  {
    id: "langara-courses-api",
    category: "build",
    title: "Courses API",
    description: "Langara course data for your own projects.",
    href: LINKS.coursesApi,
  },
  {
    id: "club-rules",
    category: "community",
    title: "Club rules",
    description: "The club’s rules, on Notion.",
    href: LINKS.rules,
  },
  {
    id: "share-your-feedback",
    category: "community",
    title: "Share your feedback",
    description: "A Google Form for ideas and feedback about the club.",
    href: LINKS.feedbackForm,
  },
];
