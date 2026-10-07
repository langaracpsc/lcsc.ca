import Image from "next/image";
import { DiscordLogo, LumaLogo } from "../platform-logos";
import { H2, Mono, P, typography } from "../typography";
import { LINKS, SITE, GUTTER } from "../../site-config";
import { NewTabCue, TextLink } from "../text-link";
import { ConsentNote } from "./join-consent";

/**
 * `Join / Start here` (Figma 11:231 desktop, 15:751 mobile), re-cut for the
 * Luma-first membership (D4).
 *
 * The Figma predates D4: it is one always-dark band that sends people to
 * Discord as their "first stop". Here the first stop is the free LCSC Member
 * tier on Luma, so the band splits in two:
 *
 *   left  — Luma, on the page's own surface (paper in light, ink in dark), so
 *           the main action is the theme-following `primary` button: red on
 *           paper, paper on ink ("red actions on light surfaces, light actions
 *           on dark surfaces").
 *   right — Discord, on the Figma's always-dark band. It keeps the band's copy
 *           and type (label, H2, Body large, Light button) and its next-steps
 *           panel, stacked under the button as the mobile frame does it,
 *           because at half the width there is no room for the desktop frame's
 *           side-by-side panel.
 *
 * Both columns use the frame's own rhythm: 24px between label, heading, body
 * and button; 80px top and bottom from `md`, 48px on phones. The CASL consent
 * note sits under the Luma button, next to the action it describes.
 */
export function JoinStart() {
  return (
    <section aria-label="How to join" className="grid items-stretch lg:grid-cols-2">
      <LumaMembership />
      <DiscordNext />
    </section>
  );
}

/** LEFT: the Luma membership — the first stop. */
function LumaMembership() {
  return (
    <div className={`${GUTTER} bg-background flex flex-col py-12 md:py-xl`}>
      <div className="flex flex-col items-start gap-md">
        {/*
          The platform mark sits with the label so the whole column is labelled
          with where it sends you, rather than only the button.
        */}
        <div className="flex items-center gap-xs">
          <LumaLogo size={18} />
          <Mono>Your first stop</Mono>
        </div>

        <H2 className="text-balance">Become an LCSC Member</H2>

        {/* Mirrors the tier's public description on Luma. */}
        <P size="lead" tone="muted" className="max-w-[46ch]">
          Free membership for the Langara Computer Science Club. Members get
          event announcements, session reminders, and access to member-only
          events.
        </P>

        <Mono tone="muted">
          Free · Applications are reviewed by a club organizer.
        </Mono>

        {/*
          Opens in a new tab: this leaves the site for Luma's own flow, and
          losing the club page mid-application would be a poor experience.
        */}
        <a
          href={SITE.lumaCalendar}
          target="_blank"
          rel="noreferrer"
          className={typography.button({ tone: "primary" })}
        >
          Join the club
          <NewTabCue spaced />
        </a>

        <ConsentNote />
      </div>

      {/*
        A picture of the destination. The membership lives on Luma, which the
        club does not control and cannot restyle, so the one thing this page
        can do about the hand-off is show people what they are looking for
        before they get there: the "Join" button on the LCSC Member card.

        Captured from lu.ma/lcsc. If the tier is renamed or Luma redesigns,
        this screenshot goes stale and should be re-taken.
      */}
      <figure className="mt-lg">
        {/*
          `unoptimized` is deliberate. The optimizer was serving a 490px-wide
          variant for a 560px slot — a 0.88x density, so the image arrived
          slightly stretched and soft, which is the exact problem this asset
          was re-captured to fix. Image optimisation is also only partially
          supported under vinext.

          This is a fixed screenshot at a known size (980x202), so there is
          nothing for the optimizer to do: serve the file as-is and let the
          browser scale it down, which is sharper and predictable. The file
          is ~70KB and never changes without a re-capture.
        */}
        <Image
          src="/luma-join.png"
          alt="The LCSC Member card on the club's Luma calendar, showing the Free and Require Approval labels and a Join button."
          width={980}
          height={202}
          unoptimized
          className="border-border w-full max-w-[560px] border"
        />
        <P as="figcaption" size="small" tone="muted" className="mt-sm max-w-[46ch]">
          On Luma, find the <strong className="font-semibold">LCSC Member</strong>{" "}
          card and hit <strong className="font-semibold">Join</strong>.
        </P>
      </figure>
    </div>
  );
}

/**
 * The three next steps — the Figma's `Discord next steps` panel. The
 * numerals are the design's, set in the same H3 face as the step; they are
 * hidden from assistive tech because the `<ol>` already announces the order.
 */
const STEPS = [
  { n: "01", label: "Join the server" },
  { n: "02", label: "Read the club rules", href: LINKS.rules },
  { n: "03", label: "Say hi." },
];

/** RIGHT: Discord — what comes after, on the always-dark band. */
function DiscordNext() {
  return (
    // `--ring` is pinned to paper: the light theme's red focus ring is under
    // 3:1 on ink, like every other always-dark band on the site.
    <div className={`${GUTTER} bg-ink text-paper dark:bg-panel flex flex-col py-12 [--ring:var(--color-paper)] md:py-xl`}>
      <div className="flex flex-col items-start gap-md">
        <div className="flex items-center gap-xs">
          <DiscordLogo className="h-4.5 w-4.5 shrink-0 text-[#5865F2]" />
          <Mono tone="onDark">After you join</Mono>
        </div>

        {/*
          tone="inherit": the band already sets `text-paper`. Balanced, so it
          breaks where both frames break it: "The conversation / starts in
          Discord."
        */}
        <H2 tone="inherit" className="text-balance">
          The conversation starts in Discord.
        </H2>

        <P size="lead" tone="onDark" className="max-w-[46ch]">
          Announcements go out there first. It&rsquo;s also where people ask
          questions and share what they&rsquo;re working on.
        </P>

        <a
          href={SITE.discordInvite}
          target="_blank"
          rel="noreferrer"
          className={typography.button({ tone: "onDark" })}
        >
          Join the server
          <NewTabCue spaced />
        </a>
      </div>

      {/*
        The panel lifts off the band: panel on ink in light mode, and the other
        way round in dark mode, where the band itself has become the panel.
      */}
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
              // The negative margin cancels the padding, so the hit area grows
              // to a comfortable 44px+ without moving the line.
              <TextLink
                href={step.href}
                className="-my-2.5 py-2.5 decoration-2 underline-offset-[6px] hover:decoration-[3px]"
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
