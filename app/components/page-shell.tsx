import type { ReactNode } from "react";
import { SiteNav } from "./site-nav";
import { SiteFooter } from "./site-footer";

/**
 * The frame every route renders: a skip link, the site header, the page's own
 * sections inside `<main>`, and the site footer.
 *
 * The header and footer sit OUTSIDE `<main>` on purpose. Inside it, a
 * `<header>`/`<footer>` stops being the page's banner/contentinfo landmark, and
 * `main` would start with the site navigation, so landmark navigation could not
 * skip it.
 *
 * It lives in each page rather than in the root layout so the nav remounts on
 * every route change. That is what closes the native `<details>` mobile menu
 * after a navigation without any client JavaScript.
 */
export function PageShell({ children }: { children: ReactNode }) {
  return (
    <>
      <a
        href="#main"
        className="bg-background text-foreground font-ui sr-only z-50 px-4 py-3 text-[15px] font-bold focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
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
