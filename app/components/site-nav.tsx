import Link from "next/link";
import { LcsMark } from "./lcs-mark";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu, NavLink } from "./nav-client";
import { Label, typography } from "./typography";
import { cn } from "@/lib/utils";

// The Figma's `Navigation / Desktop` links, in its order. Every one of these
// has a frame in the design and a route in the app — the nav only links to
// pages that exist.
const LINKS = [
  { href: "/build", label: "Build" },
  { href: "/events", label: "Events" },
  { href: "/projects", label: "Projects" },
  { href: "/resources", label: "Resources" },
];

// `Menu / Mobile` (18:469) adds Home at the top and the join action at the
// bottom, as links rather than a button.
const MOBILE_LINKS = [
  { href: "/", label: "Home" },
  ...LINKS,
  { href: "/join", label: "Join the club" },
];

/**
 * Site navigation.
 *
 * ── Geometry ───────────────────────────────────────────────────────────────
 * Desktop follows `Navigation / Desktop / Light` (34:481): 88px tall, 56px
 * sides, 16px between the mark, the lockup and the actions, links packed
 * right with 30px between them. Mobile follows `Navigation / Mobile`: 80px
 * tall, 24px sides, and the lockup shortened to "Langara / CS Club".
 *
 * The side padding uses the page gutter's curve (see GUTTER in site-config)
 * capped at 56px, so the lockup lines up with the page content from phones
 * through tablets, and keeps the light nav's 56px on desktop.
 *
 * The current page's link is marked `aria-current="page"` and turns brand
 * red (NavLink, a small client component).
 *
 * ── The join action ────────────────────────────────────────────────────────
 * The Figma draws this nav on both surfaces: red `Style=Primary` on paper,
 * paper `Style=Light` on ink. The nav follows the theme, so it uses the
 * `primary` button tone, which is exactly that pair.
 *
 * ── Mobile menu ────────────────────────────────────────────────────────────
 * A native `<details>`, so the menu works with JavaScript disabled and is
 * keyboard-operable for free (the summary is focusable; Enter/Space toggle
 * it). The open panel is the Figma's `Menu / Mobile` list: the display face
 * at 36/48, 24px apart, each link with the ↗ the design gives it. MobileMenu
 * adds Escape, close-on-focus-out and close-on-tap when JavaScript runs.
 */
export function SiteNav() {
  return (
    <header className="relative z-40">
      <nav
        aria-label="Main"
        className="flex h-20 items-center gap-4 px-[clamp(24px,5.56vw,56px)] lg:h-22"
      >
        {/*
          No aria-label: the visible lockup is the link's name ("Langara CS
          Club" on phones, the full name above `sm`), plus a hidden "home", so
          voice-control users can say what they see.
        */}
        <Link href="/" className="flex items-center gap-4">
          <LcsMark />
          <Label>
            Langara
            <br />
            <span className="sm:hidden">CS Club</span>
            <span className="hidden sm:inline">Computer Science Club</span>
            <span className="sr-only">, home</span>
          </Label>
        </Link>
        <ul className="hidden flex-1 items-center justify-end gap-7.5 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                className="hover:text-brand aria-[current=page]:text-brand font-ui text-[15px] leading-[22px] font-bold transition-colors"
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ThemeToggle className="text-foreground hover:text-brand ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors lg:ml-0 lg:h-[52px] lg:w-[52px] [&_svg]:h-[18px] [&_svg]:w-[18px]" />
        <MobileMenu links={MOBILE_LINKS} />

        {/*
          `hidden lg:inline-block` overrides the role's `inline-block` — cn merges
          the conflict so only the responsive pair survives.
        */}
        <Link
          href="/join"
          className={cn(
            typography.button({ tone: "primary" }),
            "hidden shrink-0 lg:inline-block"
          )}
        >
          Join the club&nbsp;&nbsp;<span aria-hidden="true">&#8599;</span>
        </Link>
      </nav>
    </header>
  );
}
