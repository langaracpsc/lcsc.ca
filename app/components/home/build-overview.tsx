import { H2 } from "../typography";
import { ProgramCard } from "../program-card";
import { PROGRAMS, buildAnchor, type ProgramId } from "../../content/programs";
import { GUTTER, SITE } from "../../site-config";

/**
 * Project 0 asks a question, so it goes to Discord as on /build; linking it
 * to /build would only show the same card again.
 */
const cardHref = (id: ProgramId) =>
  id === "project-0" ? SITE.discordInvite : buildAnchor(id);

/**
 * Figma 5:6 (mobile 15:293). Stacked until `lg`: three across at tablet width
 * leaves no room for the action line.
 */
export function BuildOverview() {
  return (
    <section
      aria-labelledby="build-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-10 md:py-22`}
    >
      <H2 id="build-heading">The Build Series</H2>

      <ul className="grid gap-md lg:grid-cols-3">
        {PROGRAMS.map((program) => (
          <li key={program.id}>
            <ProgramCard program={program} href={cardHref(program.id)} />
          </li>
        ))}
      </ul>
    </section>
  );
}
