import { ProgramCard } from "../program-card";
import { H2, Mono, P } from "../typography";
import { PROGRAMS } from "../../content/programs";
import { GUTTER, SITE } from "../../site-config";
import { cn } from "@/lib/utils";
import { TextLink } from "../text-link";

/**
 * Where each Build card goes.
 *
 * Build Nights and Build Labs sessions are listed and registered on Luma, so
 * those cards hand off to the club calendar. Project 0 is a conversation
 * rather than a session ("Ask about Project 0"), and asking happens in
 * Discord. Anything added to PROGRAMS later falls back to Luma.
 */
const CARD_HREF: Record<string, string> = {
  "build-nights": SITE.lumaCalendar,
  "build-labs": SITE.lumaCalendar,
  "project-0": SITE.discordInvite,
};

/**
 * Build / Programs — the Figma's "Build / Programs" (10:142; mobile 15:394):
 * the section heading, the three `Card / Program` instances, and the
 * "Build / Schedule" notice under them.
 *
 * Desktop: 80px vertical padding, 32px between the three rows, a 3-up grid
 * with 24px gutters. Mobile: 48px padding, everything 24px apart, cards
 * stacked. The grid only goes 3-up at `lg` — at tablet widths three columns
 * leave each card about 140px of text, which wraps every title.
 *
 * Each card's `<li>` carries the program's id (`build-nights`, `build-labs`,
 * `project-0`): the home page's Build overview deep-links to these anchors.
 */
export function BuildPrograms() {
  return (
    <section
      aria-labelledby="build-programs-heading"
      className={cn(GUTTER, "flex flex-col gap-md py-12 md:gap-8 md:py-xl")}
    >
      <H2 id="build-programs-heading">Pick a session.</H2>

      <ul className="grid gap-md lg:grid-cols-3">
        {PROGRAMS.map((program) => (
          <li key={program.id} id={program.id} className="scroll-mt-24">
            <ProgramCard
              program={program}
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
 * Build / Schedule (10:163; mobile 15:400) — a white strip with a 24px inset:
 * the label in a 260px column beside the message on desktop (200px at tablet
 * widths, so the message isn't squeezed into a narrow column), stacked on
 * mobile.
 *
 * The Figma sends people to Discord for the schedule. Sessions and sign-ups
 * live on Luma, so the schedule points there, and Discord keeps what it is
 * for: announcements.
 *
 * The two lines are baseline-aligned rather than top-aligned (as drawn): the
 * 12/18 label and the 16/25 message otherwise sit a few pixels out of step.
 */
function ScheduleNotice() {
  return (
    <div className="bg-card text-card-foreground flex flex-col gap-md p-6 md:flex-row md:items-baseline">
      <Mono className="md:w-[200px] md:shrink-0 lg:w-[260px]">
        When&rsquo;s the next one?
      </Mono>
      <P>
        Sessions go up on{" "}
        <TextLink href={SITE.lumaCalendar} className="text-brand font-semibold">
          Luma
        </TextLink>{" "}
        once they&rsquo;re scheduled, and get announced in{" "}
        <TextLink href={SITE.discordInvite} className="text-brand font-semibold">
          Discord
        </TextLink>
        .
      </P>
    </div>
  );
}
