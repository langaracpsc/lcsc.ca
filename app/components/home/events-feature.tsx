import { H2, H3, Mono, P } from "../typography";
import { GUTTER, INK_BAND, SITE } from "../../site-config";
import { ButtonLink, TextLink } from "../text-link";

/**
 * Figma 7:48 (mobile 15:300). The heading is the frame's; the lead and note
 * were rewritten. No dates, since the Figma's rule is that they stay
 * unannounced until confirmed.
 */
export function EventsFeature() {
  return (
    <section
      aria-labelledby="events-heading"
      className={`${GUTTER} ${INK_BAND} grid gap-md py-lg md:py-xl lg:grid-cols-2 lg:items-start lg:gap-20`}
    >
      <div className="flex flex-col items-start gap-md">
        <H2 id="events-heading" tone="inherit">
          Your next
          <br /> &ldquo;glad I went.&rdquo;
        </H2>
        <P size="lead" tone="onDark" className="max-w-[550px]">
          We run workshops and hackathons.
        </P>
        <ButtonLink href="/events" tone="onDark">
          See events
        </ButtonLink>
      </div>

      {/* Inverts with the band so it stays one step off it in both themes. */}
      <div className="bg-panel dark:bg-ink flex flex-col gap-md px-md py-10 md:p-10">
        <Mono tone="onDark">Coming up</Mono>
        <H3 tone="inherit">Dates go up on Luma</H3>
        {/* Explains Luma: first-years won't know it, and every page links it. */}
        <P tone="inherit">
          <TextLink href={SITE.lumaCalendar} tone="inherit">
            Luma
          </TextLink>{" "}
          is the club&rsquo;s event calendar, where you sign up for events. New
          ones are also announced in{" "}
          <TextLink href={SITE.discordInvite} tone="inherit">
            Discord
          </TextLink>
          .
        </P>
      </div>
    </section>
  );
}
