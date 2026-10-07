import { FloatingPhotos, type Photo } from "./floating-photos";
import { DiaTextReveal } from "../ui/dia-text-reveal";
import { Eyebrow, H1 } from "../typography";
import { GUTTER } from "../../site-config";
// Positions are the Figma frame's; each slot's photo is picked for its
// orientation so `object-cover` crops as little as possible.
const PHOTOS: Photo[] = [
  { src: "/photos/hero-presenters.webp", left: "3.5%", top: "16%", width: "8.3%", height: "13%" },
  { src: "/photos/hero-demo.webp", left: "31.5%", top: "14%", width: "7.6%", height: "15.4%", focus: "30% center" },
  { src: "/photos/hero-group.webp", left: "84.8%", top: "19%", width: "10.1%", height: "18.2%" },
  { src: "/photos/hero-hall.webp", left: "8.6%", top: "51%", width: "9.2%", height: "12.1%" },
  { src: "/photos/hero-campus.webp", left: "80.9%", top: "50%", width: "8.5%", height: "19.8%" },
  // Lower-left, not lower-centre: the support block below the headline runs
  // through the middle of the stage, and a photo there sat under the intro.
  // At 10% its right edge clears the intro's 580px column from 1024px up.
  { src: "/photos/hero-code.webp", left: "10%", top: "70%", width: "10.3%", height: "16.2%" },
];

/**
 * The hero section only. The page shell (nav, footer, `<main>`) is
 * `PageShell`, composed in `app/page.tsx`, so sections can be added between
 * the hero and the footer without reaching into this file.
 */
export function Hero() {
  return (
    // The 520px stage only exists for the photos, which show from `lg` up.
    // Below that the hero is just the headline, so it collapses to the mobile
    // frame's spacing (48px above, 24px down to the intro).
    <section
      className={`${GUTTER} relative flex items-center justify-center pt-12 pb-6 lg:min-h-130 lg:py-16`}
    >
      <FloatingPhotos photos={PHOTOS} />

      <div className="relative z-10 text-center">
        <Eyebrow>Langara Computer Science Club</Eyebrow>
        <H1 className="mt-5">
          Bring an idea.
          <br />
          <DiaTextReveal
            text={[
              "Leave with a project.",
              "Learn to Build.",
              "Turn ideas into code.",
              "Leave with free food.",
              "Build something real.",
              "Find your partners.",
            ]}
            // The band's first stop is the text colour, not a fixed black: on
            // the dark theme a #000 stop drew a black gap through the paper
            // text as the sweep passed. `var(--foreground)` is ink in light
            // mode (so light is unchanged) and paper in dark.
            colors={["var(--foreground)", "var(--color-red)", "#e8722a", "#f5c542"]}
            // The component pins the line to a pixel width measured once on
            // mount, with overflow hidden and no wrapping. The headline size
            // is fluid, so rotating a phone, resizing, or a text-spacing
            // override clipped it ("Leave with a pr"), and at 320px the
            // longest phrase ran off-screen. These overrides let the line size
            // itself (and wrap on phones); the phrase swaps while the text is
            // fully transparent at the start of each sweep, so losing the
            // width tween isn't visible.
            className="align-baseline leading-[inherit] w-auto! overflow-visible! max-sm:whitespace-normal!"
            repeat={true}
            repeatDelay={2}
          />
        </H1>
      </div>
    </section>
  );
}
