"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

/**
 * Announces client-side page changes to screen readers.
 *
 * Next.js renders its own `<next-route-announcer>` for this; vinext (beta)
 * doesn't, so following a nav link changed the page silently. This is the same
 * idea: after each pathname change, write the new document title into a
 * polite live region.
 *
 * The first render is skipped — on a full page load the screen reader already
 * reads the new document. The title is read after a tick because the route's
 * metadata lands just after the pathname changes.
 */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const regionRef = useRef<HTMLParagraphElement>(null);
  const firstRef = useRef(true);

  useEffect(() => {
    if (firstRef.current) {
      firstRef.current = false;
      return;
    }
    const id = window.setTimeout(() => {
      if (regionRef.current) regionRef.current.textContent = document.title;
    }, 100);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <p ref={regionRef} aria-live="polite" aria-atomic="true" className="sr-only" />;
}
