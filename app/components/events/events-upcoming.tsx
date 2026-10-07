import { H2, H3, Mono, P, typography } from "../typography";
import { GUTTER, SITE } from "../../site-config";
import { NewTabCue, TextLink } from "../text-link";

/**
 * Events / Upcoming — Figma `Events / Upcoming` (10:186; mobile 15:484).
 *
 * The hand-off to Luma. This page deliberately lists no events and no dates:
 * the club's Luma calendar owns sessions, dates and sign-ups (D3), so the one
 * thing this block does is send people there. A static "next event" here would
 * go stale the moment the calendar changed.
 *
 * Desktop: 80px section padding, 32px under the heading, a white card with
 * 40px inset holding an 840px copy column and the button 48px after it.
 * Mobile: 48px section padding, 24px gaps, the card stacks with 24px sides.
 */
export function EventsUpcoming() {
  return (
    <section
      aria-labelledby="upcoming-heading"
      className={`${GUTTER} flex flex-col gap-md py-12 md:gap-8 md:py-xl`}
    >
      <H2 id="upcoming-heading">Coming up</H2>

      {/* Figma white card: `bg-card` (panel in dark), no border, as drawn. */}
      <div className="bg-card text-card-foreground flex flex-col items-start gap-md px-6 py-10 lg:flex-row lg:items-center lg:gap-lg lg:p-10">
        <div className="flex max-w-[840px] min-w-0 flex-col gap-sm lg:flex-1">
          {/*
            The Figma's label, kept: the club's Luma calendar had no upcoming
            events when this was built (2026-10-07), and the design's own rule
            is "Event dates stay unannounced until confirmed."
          */}
          <Mono>Next session / To be announced</Mono>
          <H3>Sign up on Luma.</H3>
          <P tone="muted" className="max-w-[780px]">
            When the next event is set, it goes up on Luma, where you can sign
            up. Announcements go out in{" "}
            <TextLink href={SITE.discordInvite} className="text-brand font-semibold">
              the club Discord
            </TextLink>
            .
          </P>
        </div>

        {/* Red on light, paper on dark — the theme-following primary action. */}
        <a
          href={SITE.lumaCalendar}
          target="_blank"
          rel="noreferrer"
          className={typography.button({ tone: "primary", className: "shrink-0" })}
        >
          See events on Luma
          <NewTabCue spaced />
        </a>
      </div>
    </section>
  );
}
