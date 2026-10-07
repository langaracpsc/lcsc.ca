import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * How an href behaves on this site: an internal route (or an anchor on one)
 * goes through next/link; a `mailto:` hands off to the mail client, so no new
 * tab; anything else is a web URL that opens in a new tab and says so. The
 * footer, the program cards and TextLink all decide with this.
 */
export function linkKind(href: string): "internal" | "mailto" | "external" {
  if (href.startsWith("/") || href.startsWith("#")) return "internal";
  if (href.startsWith("mailto:")) return "mailto";
  return "external";
}

/**
 * The cue an off-site link carries: the design's ↗, plus words for screen
 * readers, which would otherwise announce the arrow as "north east arrow" and
 * never mention the new tab. The non-breaking space keeps the arrow from
 * wrapping onto a line of its own.
 *
 * `spaced` gives the two-space gap the Figma sets before the arrow on buttons
 * and card actions ("Join the club  ↗"); inline links in a sentence take one.
 */
export function NewTabCue({ spaced = false }: { spaced?: boolean }) {
  return (
    <>
      {spaced ? "  " : " "}
      <span aria-hidden="true">↗</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </>
  );
}

/**
 * A link inside running text — a schedule note, an FAQ answer, a step. The
 * underline is always drawn, so the link never relies on colour alone; hover
 * thickens it. Inline links in a sentence are exempt from the 44px target
 * size (WCAG 2.5.8's inline exception), so there is no padding box.
 *
 * `href` decides the element (see `linkKind`): a `next/link` for internal
 * paths, a plain anchor for `mailto:`, and a new-tab anchor with the ↗ cue for
 * web URLs.
 *
 * Colour and weight come from `className`: `text-brand` on a light surface
 * (red that stays legible on ink in dark mode), nothing on the always-dark
 * bands so the link inherits paper.
 */
export function TextLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const classes = cn(
    "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2",
    className
  );

  const kind = linkKind(href);

  if (kind === "internal") {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  if (kind === "mailto") {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <a href={href} target="_blank" rel="noreferrer" className={classes}>
      {children}
      <NewTabCue />
    </a>
  );
}
