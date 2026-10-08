"use client";

import { useState, type ReactNode } from "react";
import { useMounted } from "../../hooks/use-mounted";
import { GUTTER } from "../../site-config";

/**
 * The photo band's only client code. Paused until hydration, so without
 * JavaScript the strip is static and no dead button shows. The Pause button
 * is there for WCAG 2.2.2.
 */
export function MarqueeTrack({
  children,
  caption,
}: {
  children: ReactNode;
  caption: ReactNode;
}) {
  const mounted = useMounted();
  const [paused, setPaused] = useState(false);

  return (
    <>
      {/* Hover-pause is scoped to the photos: on the whole band it caught the
          button, so the strip stayed paused after Play. */}
      <div className="group/track h-60 overflow-hidden md:h-[338px]">
        <ul
          className="animate-marquee flex h-full w-max group-hover/track:[animation-play-state:paused] motion-reduce:animate-none"
          style={!mounted || paused ? { animationPlayState: "paused" } : undefined}
        >
          {children}
        </ul>
      </div>

      <figcaption className={`${GUTTER} flex items-center justify-between gap-md py-sm`}>
        {caption}
        {/* No aria-pressed: the label names the next action, and both together
            read "Play photos, pressed". Mono styles are written out to keep
            typography out of this client file. */}
        {mounted ? (
          <button
            type="button"
            onClick={() => setPaused((p) => !p)}
            className="font-mono -my-sm min-h-11 px-2 text-[12px] leading-[18px] font-medium uppercase opacity-80 transition-opacity hover:opacity-100 motion-reduce:hidden print:hidden"
          >
            {paused ? "Play photos" : "Pause photos"}
          </button>
        ) : null}
      </figcaption>
    </>
  );
}
