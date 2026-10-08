"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRef, type ReactNode } from "react";
import { NAV_GUTTER } from "../site-config";

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
 * Figma 18:469. A native <details> so the menu works without JavaScript. It
 * closes when focus leaves because the open panel covers the page.
 */
export function MobileMenu({
  links,
}: {
  links: readonly { href: string; label: string }[];
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
      className="group print:hidden lg:hidden"
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
      {/* The ui role written out, since importing typography would ship cn in
          every page's JS. The symbols are hidden because "×" is read as "times". */}
      <summary
        ref={summaryRef}
        className="font-ui hover:text-brand flex h-11 cursor-pointer list-none items-center text-[15px] leading-[22px] font-bold transition-colors [&::-webkit-details-marker]:hidden"
      >
        <span className="group-open:hidden">
          Menu<span aria-hidden="true">&nbsp;+</span>
        </span>
        <span className="hidden group-open:inline">
          Close<span aria-hidden="true">&nbsp;&times;</span>
        </span>
      </summary>

      {/* 5rem is site-nav's h-20; change them together. */}
      <div className="bg-background absolute inset-x-0 top-full h-[calc(100dvh-5rem)] overflow-y-auto">
        <ul className={`${NAV_GUTTER} flex flex-col gap-md pt-10 pb-lg`}>
          {links.map((l) => (
            <li key={l.href}>
              {/* Underlined on the span so it stops at the word, not under the arrow. */}
              <NavLink
                href={l.href}
                className="group/link hover:text-brand active:text-brand aria-[current=page]:text-brand font-display block text-[36px] leading-[48px] font-bold transition-colors"
              >
                <span className="decoration-[3px] underline-offset-8 group-aria-[current=page]/link:underline">
                  {l.label}
                </span>
                &nbsp;&nbsp;<span aria-hidden="true">↗</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </details>
  );
}
