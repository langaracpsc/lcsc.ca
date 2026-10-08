import { H2 } from "../typography";
import { GUTTER } from "../../site-config";
import { ProgramCard } from "../program-card";
import { PROJECTS } from "../../content/projects";

/**
 * Figma 11:179 (mobile 15:560). The Figma's project cards are `Card / Program`
 * instances. One column until `lg`: two would leave the third card on its own.
 */
export function ProjectsDirectory() {
  return (
    <section
      aria-labelledby="projects-directory-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-8 md:py-xl`}
    >
      <H2 id="projects-directory-heading">
        Current projects
      </H2>
      <ul className="grid gap-md lg:grid-cols-3">
        {PROJECTS.map((project) => (
          <li key={project.id}>
            <ProgramCard program={project} href={project.href} />
          </li>
        ))}
      </ul>
    </section>
  );
}
