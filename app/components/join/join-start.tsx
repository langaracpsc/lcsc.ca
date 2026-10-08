import { H2, Mono, P, typography } from "../typography";
import { LINKS, SITE, GUTTER, INK_BAND } from "../../site-config";
import { ButtonLink, TextLink } from "../text-link";
import { ConsentNote } from "./join-consent";

/**
 * Figma 11:231 (mobile 15:751). Membership starts on Luma, so the Figma's one
 * dark band is split: Luma first on the page surface, then Discord on the band,
 * its steps stacked as on mobile because half the width has no room for them.
 */
export function JoinStart() {
  return (
    <section aria-label="How to join" className="grid items-stretch lg:grid-cols-2">
      <LumaMembership />
      <DiscordNext />
    </section>
  );
}

function LumaMembership() {
  return (
    <div className={`${GUTTER} bg-background flex flex-col py-lg md:py-xl`}>
      <div className="flex flex-col items-start gap-md">
        <Mono>Start on Luma</Mono>

        <H2>Become an LCSC Member</H2>

        {/* Mirrors the tier's public description on Luma. */}
        <P size="lead" tone="muted" className="max-w-[46ch]">
          Free membership for the Langara Computer Science Club. Members get
          event announcements, session reminders, and access to member-only
          events.
        </P>

        {/* Luma's tier form requires both fields (checked 2026-10-08), so
            people should know before they click through. */}
        <div className="flex flex-col gap-xs">
          <Mono tone="muted">
            Free · Applications are reviewed by a club organizer
          </Mono>
          <P tone="muted" className="max-w-[52ch] text-pretty">
            The application asks for your Langara student ID and student email.
          </P>
        </div>

        <ButtonLink href={SITE.lumaCalendar} tone="primary">
          Join the club
        </ButtonLink>

        <ConsentNote />
      </div>

      {/* Shows what to click on Luma, which the club can't restyle. Captured
          from luma.com/lcsc; re-take it if the tier or Luma's design changes.
          Dimmed in dark mode because it's a light capture. */}
      <figure className="mt-lg">
        <picture className="block">
          {/* The wide capture's text shrinks to about 5px on phones, so they get
              Luma's phone layout, never shown wider than its 374px capture. */}
          <source
            // The built CSS's max-sm query: rem, like the img's sm: cap, so the
            // two switch together whatever the browser's default font size.
            media="not all and (min-width: 40rem)"
            srcSet="/luma-join-mobile.webp"
            width={1122}
            height={534}
          />
          <img
            src="/luma-join.webp"
            alt="The LCSC Member card on the club’s Luma calendar, showing the Free and Require Approval labels and a Join button."
            width={980}
            height={202}
            loading="lazy"
            decoding="async"
            className="border-border w-full max-w-[374px] border sm:max-w-[560px] dark:brightness-[0.85]"
          />
        </picture>
        <P as="figcaption" size="small" tone="muted" className="mt-sm max-w-[46ch]">
          On Luma, find the <strong className="font-semibold">LCSC Member</strong>{" "}
          card and hit <strong className="font-semibold">Join</strong>.
        </P>
      </figure>
    </div>
  );
}

/**
 * The Figma's `Discord next steps`, with step 03 cut to "Say hi" to match the
 * others. Numerals are aria-hidden because the `<ol>` numbers the steps.
 */
const STEPS = [
  { n: "01", label: "Join the server" },
  { n: "02", label: "Read the club rules", href: LINKS.rules },
  { n: "03", label: "Say hi" },
];

function DiscordNext() {
  return (
    <div className={`${GUTTER} ${INK_BAND} flex flex-col py-lg md:py-xl`}>
      <div className="flex flex-col items-start gap-md">
        <Mono tone="onDark">Then Discord</Mono>

        {/* tone="inherit" because the band sets the colour. The H2's balanced
            wrap breaks it after "conversation", as both frames do. */}
        <H2 tone="inherit">
          The conversation starts in Discord
        </H2>

        <P size="lead" tone="onDark" className="max-w-[46ch]">
          Announcements go out there first. It&rsquo;s also where people ask
          questions and share what they&rsquo;re working on.
        </P>

        <ButtonLink href={SITE.discordInvite} tone="onDark">
          Join our Discord
        </ButtonLink>
      </div>

      {/* Inverts with the band so it stays one step off it in both themes. */}
      <ol className="bg-panel dark:bg-ink mt-md flex flex-col gap-md px-6 py-8 md:p-8 lg:mt-lg lg:gap-8">
        {STEPS.map((step) => (
          <li
            key={step.n}
            className={typography.h3({ tone: "inherit", className: "flex gap-sm" })}
          >
            <span aria-hidden="true" className="shrink-0 tabular-nums">
              {step.n}
            </span>
            {step.href ? (
              // The padding grows the hit area to 44px and the negative margin
              // keeps the line in place. Bold to match the H3 it sits in.
              <TextLink
                href={step.href}
                tone="inherit"
                className="-my-2.5 py-2.5 font-bold decoration-2 underline-offset-[6px] hover:decoration-[3px]"
              >
                {step.label}
              </TextLink>
            ) : (
              <span>{step.label}</span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}
