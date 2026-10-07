import { H2 } from "../typography";
import { ProgramCard } from "../program-card";
import { PROGRAMS } from "../../content/programs";
import { GUTTER } from "../../site-config";

/**
 * Build overview — the Figma's "Build overview" (desktop 5:6, mobile 15:293):
 * heading and the three `Card / Program` cards. (The numbered section label,
 * "02 / The Build Series", was dropped at the user's request.)
 *
 * Desktop: 88px above and below, 40px between heading and cards, cards
 * three across with 24px between. Mobile: 48px above and below, 24px between,
 * cards stacked. The cards stay stacked until `lg`: three across at tablet
 * width leaves each card too narrow for its action line.
 *
 * Each card deep-links to its own card on /build. The card copy lives in
 * `content/programs.ts`, shared with /build, so the two never drift.
 */
export function BuildOverview() {
  return (
    <section
      aria-labelledby="build-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-10 md:py-22`}
    >
      <H2 id="build-heading" className="text-balance">
        Pick how you want to build.
      </H2>

      <ul className="grid gap-md lg:grid-cols-3">
        {PROGRAMS.map((program) => (
          <li key={program.id}>
            <ProgramCard program={program} href={`/build#${program.id}`} />
          </li>
        ))}
      </ul>
    </section>
  );
}
