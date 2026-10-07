import { ProgramCard } from "../program-card";
import type { Project } from "./projects";

/**
 * Project card — the Figma's `Project / …` cards on /projects.
 *
 * In the Figma these are instances of `Card / Program` (5:38; mobile 17:469),
 * not a separate component: same white card, hairline border, 32/24px inset,
 * mono category, H3 title, muted body, mono meta and action line. So rather
 * than re-type those classes (and let them drift from /build and the home
 * page), this renders `ProgramCard` with the project's own destination. Any
 * change to the card's look belongs in `program-card.tsx`, where it reaches
 * every page that draws the component.
 *
 * Every project lives off-site, so `ProgramCard` makes the whole card an
 * external link: new tab, `rel="noreferrer"`, and a ↗ on the action line.
 */
export function ProjectCard({ project }: { project: Project }) {
  return <ProgramCard program={project} href={project.href} />;
}
