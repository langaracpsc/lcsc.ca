"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

// Module scope, not a ref: leaving the 404 remounts the root layout, and a ref
// would mistake that navigation for the first load.
let lastPathname: string | null = null;

/** vinext doesn't announce client navigations, so this reads out the new title. */
export function RouteAnnouncer() {
  const pathname = usePathname();
  const regionRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (lastPathname === null) {
      lastPathname = pathname;
      return;
    }
    if (lastPathname === pathname) return;
    // Recorded when the announcement fires, so an effect that is cleaned up and
    // rerun (Strict Mode, a quick second navigation) still announces.
    const id = window.setTimeout(() => {
      lastPathname = pathname;
      if (regionRef.current) regionRef.current.textContent = document.title;
    }, 100);
    return () => window.clearTimeout(id);
  }, [pathname]);

  return <p ref={regionRef} aria-live="polite" aria-atomic="true" className="sr-only" />;
}
