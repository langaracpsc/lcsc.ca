import Link from "next/link";
import { typography } from "../typography";
import { GUTTER } from "../../site-config";

/**
 * What we do strip — the Figma's red band under the hero ("What we do strip"
 * 4:58): four mono labels with ↗, spread edge to edge across the gutter.
 *
 * The Figma draws them as plain labels; here each one goes to the place that
 * section of the site covers, so the strip doubles as a quick index:
 *   Build nights → the Build Nights card on /build
 *   Workshops    → Build Labs, the guided-workshop program on /build
 *   Hackathons   → the past-events archive on /events
 *   Community    → /join
 *
 * ── Layout ─────────────────────────────────────────────────────────────────
 * Desktop: one row, `justify-between`, 66px tall like the frame — each link is
 * a 44px touch target and the strip adds 11px above and below. The mobile
 * frame has no strip at all, so below `md` the four labels wrap into a 2x2
 * grid rather than squeezing onto one line.
 *
 * ── Colour ─────────────────────────────────────────────────────────────────
 * Red with white text in both themes (white on the red token is ~6.5:1). The focus
 * ring normally reads `--ring`, which is red in light mode and would vanish on
 * this band, so the strip points `--ring` at white for its own links.
 */
const ITEMS = [
  { label: "Build nights", href: "/build#build-nights" },
  { label: "Workshops", href: "/build#build-labs" },
  { label: "Hackathons", href: "/events#archive" },
  { label: "Community", href: "/join" },
] as const;

export function WhatWeDoStrip() {
  return (
    <nav
      aria-label="What we do"
      className={`${GUTTER} bg-red py-xs text-white [--ring:var(--color-white)] md:py-[11px]`}
    >
      <ul className="grid grid-cols-2 gap-x-md md:flex md:justify-between">
        {ITEMS.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={typography.mono({
                tone: "inherit",
                className:
                  "inline-flex min-h-11 items-center underline decoration-transparent underline-offset-4 transition-colors hover:decoration-current",
              })}
            >
              {item.label}
              <span aria-hidden="true">&nbsp;&nbsp;↗</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
