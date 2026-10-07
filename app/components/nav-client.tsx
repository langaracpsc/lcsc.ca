"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";

/**
 * The two pieces of the nav that need to know where the visitor is, or react
 * to them. Everything else in `site-nav.tsx` stays a server component.
 */

/**
 * A nav link that marks the current page with `aria-current="page"`. The
 * caller styles that state (`aria-[current=page]:…`), so screen readers and
 * sighted visitors both get "you are here".
 */
export function NavLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  const pathname = usePathname();
  return (
    <Link
      href={href}
      aria-current={pathname === href ? "page" : undefined}
      className={className}
    >
      {children}
    </Link>
  );
}

/**
 * The mobile menu: the Figma's `Menu / Mobile` (18:469) panel inside a native
 * `<details>`, so it opens, closes and is keyboard-operable with no JavaScript
 * at all. When JavaScript is running it also:
 *
 *   - closes on Escape, returning focus to the toggle;
 *   - closes when focus leaves it — the open panel covers the page, so a Tab
 *     past the last link would otherwise land on content hidden underneath;
 *   - closes when a link is tapped, including the link for the page you're
 *     already on (no navigation happens, so nothing else would close it).
 *
 * The toggle reads "Menu +" / "Close ×" as drawn; the symbols are hidden from
 * screen readers, which would read "×" as "times".
 */
export function MobileMenu({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  const detailsRef = useRef<HTMLDetailsElement>(null);
  const summaryRef = useRef<HTMLElement>(null);

  const close = (refocus: boolean) => {
    const details = detailsRef.current;
    if (!details?.open) return;
    details.open = false;
    if (refocus) summaryRef.current?.focus();
  };

  return (
    <details
      ref={detailsRef}
      className="group lg:hidden"
      onKeyDown={(e) => {
        if (e.key === "Escape") close(true);
      }}
      onBlur={(e) => {
        const next = e.relatedTarget as Node | null;
        if (next && !e.currentTarget.contains(next)) close(false);
      }}
      onClick={(e) => {
        if ((e.target as Element).closest("a")) close(false);
      }}
    >
      <summary
        ref={summaryRef}
        className="font-ui flex h-11 cursor-pointer list-none items-center text-[15px] leading-[22px] font-bold [&::-webkit-details-marker]:hidden"
      >
        <span className="group-open:hidden">
          Menu<span aria-hidden="true">&nbsp;+</span>
        </span>
        <span className="hidden group-open:inline">
          Close<span aria-hidden="true">&nbsp;&times;</span>
        </span>
      </summary>

      <div className="bg-background absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto">
        <ul className="flex flex-col gap-md px-[clamp(24px,5.56vw,56px)] pt-10 pb-12">
          {links.map((l) => (
            <li key={l.href}>
              <NavLink
                href={l.href}
                className="hover:text-brand aria-[current=page]:text-brand font-display block text-[36px] leading-[48px] font-bold transition-colors"
              >
                {l.label}&nbsp;&nbsp;<span aria-hidden="true">&#8599;</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
