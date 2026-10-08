import { Mono } from "../typography";
import { INK_BAND } from "../../site-config";
import { MarqueeTrack } from "./marquee-track";

/**
 * Figma 5:2 (mobile 15:289). gallery-* are from the club's hackathon sites,
 * lh23-* from the club Drive ("Langara Hacks! / 2023 / LH! 2023! Photos"),
 * added with the user's go-ahead on 2026-10-07.
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
    alt: "Students holding plates of pastries at a club event",
    focus: "60% center",
  },
  {
    src: "/photos/lh23-stage.webp",
    alt: "A presentation on stage at Langara Hacks 2023",
    focus: "20% center",
  },
  {
    src: "/photos/gallery-4.webp",
    alt: "Two students at a table with laptops, chins in their hands",
    focus: "45% center",
  },
  {
    src: "/photos/lh23-laptops.webp",
    alt: "Participants working on laptops at Langara Hacks 2023",
    focus: "55% center",
  },
  {
    src: "/photos/gallery-5.webp",
    alt: "A student in a cap leaning over to look at another student’s laptop",
    focus: "55% center",
  },
  {
    src: "/photos/lh23-audience.webp",
    alt: "Participants at their tables watching a presentation at Langara Hacks 2023",
    focus: "center",
  },
  {
    src: "/photos/gallery-6.webp",
    alt: "A student leaning over another student’s shoulder to look at a laptop",
    focus: "35% center",
  },
  {
    src: "/photos/lh23-coding.webp",
    alt: "A participant coding on a laptop at Langara Hacks 2023",
    focus: "60% center",
  },
];

/**
 * Tiles use a right margin, not `gap`, so both copies are the same width and
 * the -50% loop has no seam.
 */
export function CommunityPhotoBand() {
  return (
    <figure className={INK_BAND}>
      <MarqueeTrack caption={<Mono tone="onDark">Photos from club events</Mono>}>
        {[0, 1].map((copy) =>
          PHOTOS.map((photo) => (
            <li
              key={`${copy}-${photo.src}`}
              aria-hidden={copy === 1 ? true : undefined}
              className="bg-panel dark:bg-ink relative mr-3 h-full w-[200px] shrink-0 md:mr-4 md:w-[260px]"
            >
              <img
                src={photo.src}
                alt={copy === 1 ? "" : photo.alt}
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
                style={{ objectPosition: photo.focus }}
              />
            </li>
          ))
        )}
      </MarqueeTrack>
    </figure>
  );
}
