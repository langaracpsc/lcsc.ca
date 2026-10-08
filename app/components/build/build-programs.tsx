import { ProgramCard } from "../program-card";
import { H2, Mono, P } from "../typography";
import { PROGRAMS, type ProgramId } from "../../content/programs";
import { GUTTER, SITE } from "../../site-config";

/** Sessions are on Luma; Project 0 is a question, so it goes to Discord. */
const CARD_HREF: Partial<Record<ProgramId, string>> = {
  "build-nights": SITE.lumaCalendar,
  "build-labs": SITE.lumaCalendar,
  "project-0": SITE.discordInvite,
};

/**
 * Here the cards open Luma, so the action names it. Home keeps "More about"
 * because its cards link to this page.
 */
const CARD_ACTION: Partial<Record<ProgramId, string>> = {
  "build-nights": "Find a Build Night on Luma",
  "build-labs": "Find a Build Lab on Luma",
};

/**
 * Figma 10:142 (mobile 15:394). Three across only from `lg`: at tablet width
 * every title wraps. The `<li>` ids are the home page's link targets.
 */
export function BuildPrograms() {
  return (
    <section
      aria-labelledby="build-programs-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-8 md:py-xl`}
    >
      <H2 id="build-programs-heading">Pick a session</H2>

      <ul className="grid gap-md lg:grid-cols-3">
        {PROGRAMS.map((program) => (
          <li key={program.id} id={program.id} className="scroll-mt-24">
            <ProgramCard
              program={{
                ...program,
                action: CARD_ACTION[program.id] ?? program.action,
              }}
              href={CARD_HREF[program.id] ?? SITE.lumaCalendar}
            />
          </li>
        ))}
      </ul>

      <ScheduleNotice />
    </section>
  );
}

/**
 * Figma 10:163 (mobile 15:400). Points to Luma where the Figma said Discord,
 * since sessions live there. Baseline-aligned: the 12/18 and 16/25 lines
 * don't line up when top-aligned.
 */
function ScheduleNotice() {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-md p-6 md:flex-row md:items-baseline">
      <Mono className="md:w-[200px] md:shrink-0 lg:w-[260px]">
        When&rsquo;s the next one?
      </Mono>
      {/* Explains Luma since home links here, so this may be a visitor's first
          page. Not a link: the cards above already link Luma. */}
      <P>
        Sessions go up on Luma, the club&rsquo;s event calendar, once
        they&rsquo;re scheduled, and get announced in Discord.
      </P>
    </div>
  );
}
