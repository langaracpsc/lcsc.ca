import { H2, H3, Mono, P } from "../typography";
import { GUTTER, INK_BAND, LINKS } from "../../site-config";
import { PAST_EVENTS } from "../../content/past-events";
import { ButtonLink } from "../text-link";

/**
 * Figma 10:195 (mobile 15:492); the photo and past-events list are additions.
 * `#archive` is the home strip's "Hackathons" target; `scroll-mt` stands in
 * for top padding. LH 2025 facts: club event site; 2023 photo: club Drive.
 */
export function EventsArchive() {
  return (
    <section
      id="archive"
      aria-labelledby="archive-heading"
      className={`${GUTTER} flex scroll-mt-lg flex-col gap-md pb-lg md:gap-8 md:pb-xl`}
    >
      <Mono as="h2" id="archive-heading">
        Past highlights
      </Mono>

      <article className={`${INK_BAND} flex flex-col gap-md px-6 py-lg md:p-lg lg:flex-row lg:items-start lg:gap-16`}>
        <div className="flex max-w-[760px] min-w-0 flex-col items-start gap-md lg:flex-1">
          <Mono tone="onDark">2025 / Hackathon</Mono>
          {/* H2 size per the Figma, but an h3: it sits under "Past highlights". */}
          <H2 as="h3" tone="inherit">
            Langara Hacks
          </H2>
          <P size="lead" tone="inherit" className="max-w-[720px]">
            The club&rsquo;s yearly hackathon. In 2025 it ran for 48 hours on
            September 20 and 21, in the T Gallery at Langara College.
          </P>
          {/* "Site": the repo is the event website, not the projects. Wraps so
              larger text sizes can't push it out of the card. */}
          <ButtonLink
            href={LINKS.langaraHacks2025}
            tone="onDark"
            className="whitespace-normal text-balance"
          >
            Code for the 2025 site
          </ButtonLink>
        </div>

        <HackathonGraphic />
      </article>

      <figure>
        {/* `sizes` assumes the 80px desktop gutters. */}
        <img
          src="/photos/lh23-hall.webp"
          srcSet="/photos/lh23-hall-800.webp 800w, /photos/lh23-hall.webp 1600w"
          sizes="(min-width: 1440px) calc(100vw - 160px), 100vw"
          alt="Teams at long tables filling the hall during Langara Hacks 2023"
          width={1600}
          height={1067}
          loading="lazy"
          decoding="async"
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
      </div>
    </section>
  );
}

/**
 * Figma 10:204. The arrow is an SVG because Archivo has no U+2197 and the
 * fallback glyph is far lighter than the bold digits.
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
