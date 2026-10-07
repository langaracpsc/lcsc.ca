import Link from "next/link";
import { H3, Mono, P } from "./typography";
import { NewTabCue, linkKind } from "./text-link";
import type { Program } from "../content/programs";

/**
 * Program card — the Figma's `Card / Program` (5:38): category, title,
 * description, metadata and an action line, 24px apart, inside a white card
 * with a hairline border. 32px inset on desktop, 24px on mobile.
 *
 * "Entire card links to program detail" (the component's own Figma note), so
 * the whole card is the anchor rather than just the action line. That gives
 * one tab stop per card and a single, obvious focus outline.
 *
 * `href` decides where it goes: an internal path renders a `next/link`, an
 * external URL a plain anchor that opens in a new tab and swaps the arrow to
 * ↗ (with the words "opens in a new tab" for screen readers) so the card says
 * it's leaving the site. The arrows themselves are hidden from assistive tech,
 * which would read them as "rightwards arrow" / "north east arrow".
 *
 * Rows are 24px apart on desktop and 20px on mobile (`Card / Program /
 * Mobile`, 17:469). The action sits 24px under the meta line, as drawn; in a
 * row of uneven cards the spare height falls at the bottom.
 *
 * The whole card is the link, so without help its accessible name would be
 * every line of the card run together. `aria-labelledby` names it by the
 * title and the action ("Build Nights, Explore Build Nights"), and
 * `aria-describedby` carries the description. `program.id` keeps the ids
 * unique: each card appears at most once per page.
 *
 * In dark mode the card sits on `card` (the panel token) rather than white,
 * and the border follows `border`, so it reads as a raised surface on ink.
 */
export function ProgramCard({
  program,
  href,
}: {
  program: Program;
  href: string;
}) {
  const external = linkKind(href) === "external";
  const ids = {
    title: `${program.id}-title`,
    description: `${program.id}-description`,
    action: `${program.id}-action`,
  };
  const linkProps = {
    className:
      "group bg-card text-card-foreground border-border hover:border-foreground flex h-full flex-col gap-5 border p-6 transition-colors md:gap-md md:p-8",
    "aria-labelledby": `${ids.title} ${ids.action}`,
    "aria-describedby": ids.description,
  };

  const body = (
    <>
      <Mono>{program.category}</Mono>
      <H3 id={ids.title}>{program.title}</H3>
      <P id={ids.description} tone="muted">
        {program.description}
      </P>
      <Mono tone="muted">{program.meta}</Mono>
      <span
        id={ids.action}
        className="font-ui text-[15px] leading-[22px] font-bold underline decoration-transparent decoration-2 underline-offset-4 transition-colors group-hover:decoration-current"
      >
        {program.action}
        {external ? (
          <NewTabCue spaced />
        ) : (
          <>
            &nbsp;&nbsp;<span aria-hidden="true">&rarr;</span>
          </>
        )}
      </span>
    </>
  );

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" {...linkProps}>
      {body}
    </a>
  ) : (
    <Link href={href} {...linkProps}>
      {body}
    </Link>
  );
}
