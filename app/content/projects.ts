import type { Program } from "./programs";
import { LINKS } from "../site-config";

/**
 * Figma 11:181. Add tech stacks, user counts or maintainers only once the club
 * confirms them. The planner and API cards link to the tools, not source: the
 * live code is in a maintainer's own repos, and the club org's are older.
 */
export type Project = Program & {
  href: string;
};

export const PROJECTS: Project[] = [
  {
    id: "course-planner",
    category: "Student tool",
    title: "Course Planner",
    description:
      "Plan which Langara courses to take and check transfer agreements.",
    meta: "Academic planning",
    action: "Open Course Planner",
    href: LINKS.coursePlanner,
  },
  {
    id: "courses-api",
    category: "Open data",
    title: "Courses API",
    description:
      "Langara course data you can use in your own projects.",
    meta: "Developer resource",
    action: "Read the API docs",
    // The action says "docs" because the API root opens its Scalar reference.
    href: LINKS.coursesApi,
  },
  {
    id: "lcsc-website",
    // Not the Figma's "OPEN SOURCE" copy: the repo has no license, and its
    // description was a list of three. The card says what the link is instead.
    category: "This site",
    title: "LCSC Website",
    description: "The source code for the site you’re reading.",
    meta: "Community project",
    action: "View on GitHub",
    href: LINKS.siteRepo,
  },
];
