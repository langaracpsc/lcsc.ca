"use client";

import Image from "next/image";
import { useState } from "react";
import { Mono } from "../typography";
import { GUTTER } from "../../site-config";

/**
 * Community photo band — the Figma's "Community photo band" (desktop 5:2,
 * mobile 15:289): a full-bleed filmstrip of club photos on ink, then a
 * caption strip.
 *
 * The Figma's "Club gallery photograph" is one flattened image of six photos
 * with ink gutters between them. Those six originals (gallery-*, from the
 * club's own hackathon sites; see floating-photos.tsx) are here as real tiles
 * so each can carry its own alt text, interleaved with six Langara Hacks 2023
 * photos (lh23-*) from the club's Google Drive ("Langara Hacks! / 2023 /
 * LH! 2023! Photos"), added with the user's go-ahead on 2026-10-07.
 *
 * ── Marquee ────────────────────────────────────────────────────────────────
 * The strip scrolls slowly to the left, forever, as a CSS animation (no
 * per-frame JavaScript, so it can't wedge the page the way the old hero
 * physics did). The track holds the photos twice and moves by exactly one
 * set (-50%), so the loop has no seam. Each tile carries its gap as a right
 * margin rather than a flex `gap` — with `gap` the two halves differ by one
 * gutter and the loop jumps.
 *
 * The second set is a visual copy: hidden from assistive tech, with empty
 * alts, so a screen reader meets each photo once.
 *
 * It stops for anyone who needs it to: while the pointer is over the photos,
 * under `prefers-reduced-motion` (where the Pause button is hidden too, since
 * there is nothing to pause), and with the Pause button, which WCAG 2.2.2
 * asks for on anything that moves for more than five seconds. The button is
 * the only keyboard control; the photos themselves take no focus.
 *
 * ── Theme ──────────────────────────────────────────────────────────────────
 * Always dark (ink, as in the Figma). In dark mode the page itself is ink, so
 * the band lifts to panel to stay a distinct strip.
 *
 * Heights are the frames': 338px on desktop, 240px on mobile.
 */
const PHOTOS = [
  {
    src: "/photos/gallery-1.webp",
    alt: "A student presenting a web app on a projector screen",
    focus: "85% center",
  },
  {
    src: "/photos/lh23-tables.webp",
    alt: "Teams working at long tables during Langara Hacks 2023",
    focus: "center",
  },
  {
    src: "/photos/gallery-2.webp",
    alt: "Two students coding side by side on laptops",
    focus: "40% center",
  },
  {
    src: "/photos/lh23-laughing.webp",
    alt: "Students looking at a phone together at Langara Hacks 2023",
    focus: "45% center",
  },
  {
    src: "/photos/gallery-3.webp",
    alt: "Students chatting over plates of food at a club event",
    focus: "60% center",
  },
  {
    src: "/photos/lh23-stage.webp",
    alt: "A presentation on stage at Langara Hacks 2023",
    focus: "20% center",
  },
  {
    src: "/photos/gallery-4.webp",
    alt: "Two students concentrating at their laptops",
    focus: "45% center",
  },
  {
    src: "/photos/lh23-laptops.webp",
    alt: "Participants working on laptops at Langara Hacks 2023",
    focus: "55% center",
  },
  {
    src: "/photos/gallery-5.webp",
    alt: "One student leaning in to help another at a laptop",
    focus: "55% center",
  },
  {
    src: "/photos/lh23-audience.webp",
    alt: "Participants at their tables watching a presentation at Langara Hacks 2023",
    focus: "center",
  },
  {
    src: "/photos/gallery-6.webp",
    alt: "Students huddled around a laptop, working through a problem",
    focus: "35% center",
  },
  {
    src: "/photos/lh23-coding.webp",
    alt: "A participant coding on a laptop at Langara Hacks 2023",
    focus: "60% center",
  },
];

export function CommunityPhotoBand() {
  const [paused, setPaused] = useState(false);

  return (
    <figure className="bg-ink text-paper dark:bg-panel [--ring:var(--color-paper)]">
      {/* Hover-to-pause is scoped to the photos. Scoped to the whole band, it
          also caught the Pause/Play button: after pressing Play the pointer
          and focus were still on the button, so the strip stayed paused. */}
      <div className="group/track h-60 overflow-hidden md:h-[338px]">
        <ul
          className="animate-marquee flex h-full w-max group-hover/track:[animation-play-state:paused] motion-reduce:animate-none"
          style={paused ? { animationPlayState: "paused" } : undefined}
        >
          {[0, 1].map((copy) =>
            PHOTOS.map((photo) => (
              <li
                key={`${copy}-${photo.src}`}
                aria-hidden={copy === 1 ? true : undefined}
                className="bg-panel dark:bg-ink relative mr-3 h-full w-[200px] shrink-0 md:mr-4 md:w-[260px]"
              >
                <Image
                  src={photo.src}
                  alt={copy === 1 ? "" : photo.alt}
                  fill
                  unoptimized
                  className="object-cover"
                  style={{ objectPosition: photo.focus }}
                />
              </li>
            ))
          )}
        </ul>
      </div>

      <figcaption className={`${GUTTER} flex items-center justify-between gap-md py-sm`}>
        <Mono tone="onDark">Photos from club events</Mono>
        <button
          type="button"
          aria-pressed={paused}
          onClick={() => setPaused((p) => !p)}
          className="font-mono -my-sm min-h-11 px-2 text-[12px] leading-[18px] font-medium uppercase opacity-80 transition-opacity hover:opacity-100 motion-reduce:hidden"
        >
          {paused ? "Play photos" : "Pause photos"}
        </button>
      </figcaption>
    </figure>
  );
}
