"use client";

import { useState, type ReactNode } from "react";
import { useMounted } from "../../hooks/use-mounted";
import { DiaTextRevealPaused } from "./dia-text-reveal";

/**
 * Pause for the hero's rotating line (WCAG 2.2.2). The row is in the server
 * HTML so hydration shifts nothing; without JavaScript nothing moves, so no button.
 */
export function HeroHeadline({ children }: { children: ReactNode }) {
  const mounted = useMounted();
  const [paused, setPaused] = useState(false);

  return (
    <DiaTextRevealPaused value={paused}>
      {children}
      {/* From lg the stage has room under the headline, so the row floats
          there and the headline stays where the Figma centres it. */}
      <div className="mt-xs flex h-[18px] justify-center lg:absolute lg:inset-x-0 lg:top-full lg:mt-sm motion-reduce:hidden print:hidden">
        {/* ::before makes the target 44px tall while the ring stays on the 24px
            box, clear of the descenders. 5ch fits "Pause"; "Play" starts at the same x. */}
        {mounted ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            aria-label={paused ? "Play the rotating headline" : "Pause the rotating headline"}
            className="font-mono relative -my-[3px] min-w-[calc(5ch+1rem)] px-2 py-[3px] text-left text-[12px] leading-[18px] font-medium uppercase opacity-80 transition-opacity before:absolute before:inset-x-0 before:-inset-y-[10px] hover:opacity-100 focus-visible:opacity-100"
          >
            {paused ? "Play" : "Pause"}
          </button>
        ) : null}
      </div>
    </DiaTextRevealPaused>
  );
}
