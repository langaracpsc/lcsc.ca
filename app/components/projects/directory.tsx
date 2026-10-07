import { H2 } from "../typography";
import { GUTTER } from "../../site-config";
import { ProjectCard } from "./project-card";
import { PROJECTS } from "./projects";

/**
 * `Projects / Directory` (11:179; mobile 15:560): the section heading over a
 * three-up grid of project cards.
 *
 * Desktop: 80px all round, 32px between heading and grid, 24px between cards.
 * Mobile: 48px top and bottom, 24px between everything, cards stacked.
 *
 * The grid stays a single column until `lg`: at tablet widths three columns
 * squeeze each card under ~220px, and two columns would strand the third card
 * on a row of its own. A `<ul>` because it is a list of projects; each `<li>`
 * is the grid item and the card fills it (`h-full`), so a row of cards shares
 * one height the way the Figma's fixed 329px row does.
 */
export function ProjectsDirectory() {
  return (
    <section
      aria-labelledby="projects-directory-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-8 md:py-xl`}
    >
      <H2 id="projects-directory-heading" className="text-balance">
        Current projects
      </H2>
      <ul className="grid gap-md lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <ProjectCard project={project} />
          </li>
        ))}
      </ul>
    </section>
  );
}
