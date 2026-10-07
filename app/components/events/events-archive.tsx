import Image from "next/image";
import { H2, H3, Mono, P, typography } from "../typography";
import { GUTTER, LINKS, SITE } from "../../site-config";
import { PAST_EVENTS } from "../../content/past-events";
import { cn } from "@/lib/utils";
import { NewTabCue, TextLink } from "../text-link";

/**
 * Events / Archive — Figma `Events / Archive` (10:195; mobile 15:492), plus
 * a photo and a list of past events the Figma didn't have room for.
 *
 * `id="archive"` is the target of the home page's `/events#archive` link. The
 * section has no top padding of its own (the Upcoming block's bottom padding
 * spaces it, as in the Figma), so `scroll-mt` gives the label room to breathe
 * when the page jumps here.
 *
 * The Langara Hacks card is one of the Figma's always-dark ink bands. In dark
 * mode the page is already ink, so it lifts to panel to stay distinct.
 * `--ring` is pinned to paper inside it: the global focus outline reads that
 * variable, and the light theme's red ring would sit at under 3:1 on ink.
 *
 * The card describes the most recent Langara Hacks (2025, from the club's
 * own event site). The photo is from Langara Hacks 2023, from the club's
 * Google Drive. The list's sources are in `content/past-events.ts`.
 */
export function EventsArchive() {
  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className={`${GUTTER} flex scroll-mt-12 flex-col gap-md pb-12 md:gap-8 md:pb-xl`}
    >
      <Mono as="h2" id="archive-heading">
        Past highlights
      </Mono>

      <article className="bg-ink text-paper dark:bg-panel flex flex-col gap-md px-6 py-12 [--ring:var(--color-paper)] md:p-12 lg:flex-row lg:items-start lg:gap-16">
        <div className="flex max-w-[760px] min-w-0 flex-col items-start gap-md lg:flex-1">
          <Mono tone="onDark">2025 / Hackathon</Mono>
          {/*
            Set at the Figma's H2 size, but an <h3> in the outline: it is the
            first item under "Past highlights", not a section of its own.
          */}
          <H2 as="h3" tone="inherit">
            Langara Hacks
          </H2>
          <P size="lead" tone="inherit" className="max-w-[720px]">
            The club&rsquo;s yearly hackathon. The 2025 edition ran for 48 hours
            on September 20 and 21, in the T Gallery at Langara College.
          </P>
          {/* May wrap on a 320px phone rather than run out of the card. */}
          <a
            href={LINKS.langaraHacks2025}
            target="_blank"
            rel="noreferrer"
            className={cn(typography.button({ tone: "onDark" }), "whitespace-normal")}
          >
            2025 site code on GitHub
            <NewTabCue spaced />
          </a>
        </div>

        <HackathonGraphic />
      </article>

      <figure>
        <Image
          src="/photos/lh23-hall.webp"
          alt="Teams at long tables filling the hall during Langara Hacks 2023"
          width={1600}
          height={1067}
          unoptimized
          className="aspect-[3/2] w-full object-cover md:aspect-[21/9]"
        />
        <Mono as="figcaption" tone="muted" className="mt-xs">
          Langara Hacks 2023
        </Mono>
      </figure>

      <div className="flex flex-col gap-sm">
        <H3>Past events</H3>
        <ul className="border-border border-t">
          {PAST_EVENTS.map((event) => (
            <li
              key={`${event.when}-${event.name}`}
              className="border-border flex flex-col gap-1 border-b py-3 sm:flex-row sm:items-baseline sm:gap-md"
            >
              <Mono tone="muted" as="span" className="shrink-0 sm:w-28">
                {event.when}
              </Mono>
              <P as="span" className="font-semibold">
                {event.name}
              </P>
            </li>
          ))}
        </ul>
        <P size="small" tone="muted">
          Most of these are on the club&rsquo;s{" "}
          <TextLink href={SITE.lumaCalendar} className="text-brand font-semibold">
            Luma calendar
          </TextLink>
          .
        </P>
      </div>
    </section>
  );
}

/**
 * Figma `Hackathon graphic` (10:204) — a text layer, not an image: "LH" over
 * the year and "↗" in the display face, 100/110 on desktop and 48px on
 * mobile. Purely decorative; the card's heading and year label already say it.
 *
 * The letters stay live text. The ↗ does not: Archivo's Latin subset has no
 * U+2197, so the browser borrows a thin symbol-font arrow that sits far
 * lighter than the bold digits beside it. The Figma draws it at the same
 * weight as the digits, so it is drawn here as a stroke sized in `em`, which
 * keeps it in step with the text at every size.
 */
function HackathonGraphic() {
  return (
    <div
      aria-hidden="true"
      className="font-display shrink-0 text-[clamp(3rem,6.94vw,6.25rem)] leading-[1.1] font-bold select-none lg:w-[280px]"
    >
      <p>LH</p>
      <p>
        25
        <svg
          viewBox="0 0 100 100"
          className="ml-[0.04em] inline-block h-[0.6em] w-[0.6em] align-baseline"
          fill="none"
          stroke="currentColor"
          strokeWidth="22"
          strokeLinecap="butt"
          strokeLinejoin="miter"
        >
          <path d="M12 88 78 22M30 22h48v48" />
        </svg>
      </p>
    </div>
  );
}
