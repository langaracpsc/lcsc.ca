import { H2, H3, Mono, P } from "../typography";
import { GUTTER, SITE } from "../../site-config";
import { ButtonLink, TextLink } from "../text-link";

/**
 * Figma 10:186 (mobile 15:484). No dates here: Luma owns them, and a copy on
 * this page would go stale.
 */
export function EventsUpcoming() {
  return (
    <section
      aria-labelledby="upcoming-heading"
      className={`${GUTTER} flex flex-col gap-md py-lg md:gap-8 md:py-xl`}
    >
      <H2 id="upcoming-heading">Coming up</H2>

      <div className="bg-card text-card-foreground flex flex-col items-start gap-md px-6 py-10 lg:flex-row lg:items-center lg:gap-lg lg:p-10">
        <div className="flex max-w-[840px] min-w-0 flex-col gap-sm lg:flex-1">
          {/* The Figma's label. Luma had no upcoming events on 2026-10-07, and
              the design's rule is that dates stay unannounced until confirmed. */}
          <Mono>Next session / To be announced</Mono>
          {/* Event sign-ups, worded apart from /join, where Luma sign-up means
              membership. nowrap stops phones breaking "sign-ups" at the hyphen. */}
          <H3>
            Dates and <span className="whitespace-nowrap">sign-ups</span> are
            on Luma
          </H3>
          <P tone="muted" className="max-w-[780px]">
            Luma is the club&rsquo;s event calendar. New events are also
            announced in{" "}
            <TextLink href={SITE.discordInvite}>
              Discord
            </TextLink>
            .
          </P>
        </div>

        <ButtonLink href={SITE.lumaCalendar} tone="primary" className="shrink-0">
          See events on Luma
        </ButtonLink>
      </div>
    </section>
  );
}
