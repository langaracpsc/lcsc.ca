import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";
import { typography } from "./typography";

/**
 * Per page, not in the layout, so the nav remounts and the no-JS menu closes on
 * navigation. Header and footer sit outside <main> to stay banner and contentinfo.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      {/* focus-visible because vinext focuses this after every client navigation.
          The padding shares the variant since not-sr-only resets it. */}
      <a
        href="#main"
        className={typography.ui({
          className:
            "bg-background text-foreground sr-only z-50 focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:px-6 focus-visible:py-[15px]",
        })}
      >
        Skip to content
      </a>
      <SiteNav />
      <main id="main" tabIndex={-1} className="flex flex-1 flex-col focus:outline-none">
        {children}
      </main>
      <SiteFooter />
    </>
  );
}
