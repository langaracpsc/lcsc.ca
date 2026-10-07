import { LINKS } from "../../site-config";

/**
 * The /resources directory — the six `Row / Resource` instances in the Figma's
 * `Resources / Directory` (11:218), in its order.
 *
 * Category and title are the Figma copy; descriptions say plainly what is at
 * each link (from the club's old site and the pages themselves). The hrefs are
 * NOT the Figma's: the design still points the planner and the courses API at
 * `planner.langaracs.ca` / `coursesapi.langaracs.ca`, which no longer resolve.
 * Every destination here comes from `LINKS`, which records where each tool
 * actually lives today.
 */

export type ResourceCategory = "academic" | "build" | "community";

/** The filter chips after "All", in the Figma's order. */
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
  /** Always an external URL: every resource leaves the site. */
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
    title: "Langara Courses API",
    description: "Langara course data for your own projects.",
    // The API root serves its interactive docs, which is where someone
    // starting a project begins.
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
    description: "Have an idea for the club? We’d like to hear it.",
    href: LINKS.feedbackForm,
  },
];
