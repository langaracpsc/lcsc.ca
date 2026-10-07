import type { Program } from "../../content/programs";
import { LINKS, SITE } from "../../site-config";

/**
 * The /projects directory — the Figma's `Projects / Grid` (11:181): three
 * instances of `Card / Program` named `Project / Course Planner`,
 * `Project / Courses API` and `Project / LCSC Website`.
 *
 * A project is a program card's content plus where the card goes, so it reuses
 * the `Program` shape rather than declaring a parallel one. `id` is a stable
 * key only; nothing anchors to it.
 *
 * Copy is the Figma's, except where it claims something the club hasn't
 * confirmed — see the LCSC Website entry. Do not add tech stacks, user counts,
 * maintainers or status badges here unless the club has confirmed them.
 */
export type Project = Program & {
  /** External destination. Every project here lives off-site. */
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
    // langaracourses.ca — "Langara Course Planning Tools".
    href: LINKS.coursePlanner,
  },
  {
    id: "courses-api",
    category: "Open data",
    title: "Courses API",
    description:
      "Langara course data you can use in your own projects.",
    meta: "Developer resource",
    action: "Explore the API",
    // The API root serves its interactive docs, so "Explore the API" lands
    // somewhere a person can explore.
    href: LINKS.coursesApi,
  },
  {
    id: "lcsc-website",
    // Figma: "OPEN SOURCE" and "Explore the source, share feedback, or
    // contribute an improvement." This site has no public repository yet, so
    // neither claim holds. The card points at the club's GitHub org instead
    // and says only that. (The org's Course Planner and Courses API repos are
    // older versions; the live tools are built from a maintainer's own repos,
    // so the card doesn't claim the org holds their source.)
    // TODO(club): once this site's repo is public, restore the Figma copy and
    // point `href` at the repo.
    category: "This site",
    title: "LCSC Website",
    description: "Its source isn’t public yet, so this links to the club’s GitHub instead.",
    meta: "Community project",
    action: "View on GitHub",
    href: SITE.github,
  },
];
