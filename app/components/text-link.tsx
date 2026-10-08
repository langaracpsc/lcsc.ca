import Link from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { typography } from "./typography";

/** mailto: is its own kind so it opens the mail client without a new tab. */
export function linkKind(href: string): "internal" | "mailto" | "external" {
  if (href.startsWith("/") || href.startsWith("#")) return "internal";
  if (href.startsWith("mailto:")) return "mailto";
  return "external";
}

export const NEW_TAB_TEXT = " (opens in a new tab)";

/**
 * Screen readers get NEW_TAB_TEXT in place of the arrow glyph. The nbsp keeps
 * the arrow off a line of its own; `spaced` is the Figma's two-space gap.
 */
export function NewTabCue({ spaced = false }: { spaced?: boolean }) {
  return (
    <>
      {spaced ? "\u00a0\u00a0" : "\u00a0"}
      <span aria-hidden="true">↗</span>
      <span className="sr-only">{NEW_TAB_TEXT}</span>
    </>
  );
}

const TEXT_LINK_TONE = {
  brand: "text-brand font-semibold",
  inherit: "font-semibold",
} as const;

/**
 * Always underlined so a link never relies on colour alone. Inline links are
 * exempt from the 44px target size.
 */
export function TextLink({
  href,
  tone = "brand",
  className,
  children,
}: {
  href: string;
  tone?: keyof typeof TEXT_LINK_TONE;
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(
    "underline decoration-1 underline-offset-4 transition-[text-decoration-thickness] hover:decoration-2",
    TEXT_LINK_TONE[tone],
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

export function ButtonLink({
  href,
  tone,
  className,
  children,
}: {
  href: string;
  tone?: NonNullable<Parameters<typeof typography.button>[0]>["tone"];
  className?: string;
  children: ReactNode;
}) {
  const classes = cn(typography.button({ tone }), className);
  const kind = linkKind(href);

  if (kind === "internal") {
    return (
      <Link href={href} className={classes}>
        {children}&nbsp;&nbsp;<span aria-hidden="true">→</span>
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
      <NewTabCue spaced />
    </a>
  );
}
