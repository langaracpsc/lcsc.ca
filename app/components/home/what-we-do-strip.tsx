import Link from "next/link";
import { typography } from "../typography";
import { GUTTER, RED_STRIP } from "../../site-config";
import { buildAnchor } from "../../content/programs";

/**
 * Figma 4:58. The Figma's labels are plain text; here each links to the page
 * that covers it ("Workshops" are Build Labs). The mobile frame has no strip,
 * so the 2x2 phone grid is ours.
 */
const ITEMS = [
  { label: "Build Nights", href: buildAnchor("build-nights") },
  { label: "Workshops", href: buildAnchor("build-labs") },
  { label: "Hackathons", href: "/events#archive" },
  { label: "Community", href: "/join" },
] as const;

export function WhatWeDoStrip() {
  return (
    <nav
      aria-label="What we do"
      className={`${GUTTER} ${RED_STRIP} py-xs md:py-[11px]`}
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
