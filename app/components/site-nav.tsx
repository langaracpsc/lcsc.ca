import Link from "next/link";
import { LcsMark } from "./lcs-mark";
import { ThemeToggle } from "./theme-toggle";
import { MobileMenu, NavLink } from "./nav-client";
import { Label, typography } from "./typography";
import { NAV_GUTTER, PAGES } from "../site-config";
import { cn } from "@/lib/utils";

/**
 * Figma 34:481. The current page is underlined as well as red, so it differs
 * from a hovered link by more than colour.
 */
export function SiteNav() {
  return (
    <header className="relative z-40">
      <nav aria-label="Main" className={`${NAV_GUTTER} flex h-20 items-center gap-4 lg:h-22`}>
        {/* No aria-label, so the link's name is the visible lockup plus a
            hidden "home" and voice-control users can say what they see. */}
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
        {/* `min-h-11` makes each link a 44px target for landscape tablets. */}
        <ul className="hidden flex-1 items-center justify-end gap-7.5 lg:flex">
          {PAGES.slice(1, 5).map((link) => (
            <li key={link.href}>
              <NavLink
                href={link.href}
                className={typography.ui({
                  className:
                    "hover:text-brand active:text-brand aria-[current=page]:text-brand inline-flex min-h-11 items-center decoration-2 underline-offset-[6px] transition-colors aria-[current=page]:underline",
                })}
              >
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
        <ThemeToggle className="text-foreground hover:text-brand ml-auto inline-flex h-11 w-11 shrink-0 items-center justify-center transition-colors print:hidden lg:ml-0 lg:h-[52px] lg:w-[52px] [&_svg]:h-[18px] [&_svg]:w-[18px]" />
        <MobileMenu links={PAGES} />

        {/* A NavLink so /join gets aria-current here too. The span keeps the
            underline off the gap and the arrow. */}
        <NavLink
          href="/join"
          className={cn(
            typography.button({ tone: "primary" }),
            "group/link hidden shrink-0 lg:inline-block"
          )}
        >
          <span className="decoration-2 underline-offset-4 group-aria-[current=page]/link:underline">
            Join the club
          </span>
          &nbsp;&nbsp;<span aria-hidden="true">→</span>
        </NavLink>
      </nav>
    </header>
  );
}
