import { FloatingPhotos, type Photo } from "./floating-photos";
import { DiaTextReveal } from "./dia-text-reveal";
import { H1 } from "../typography";
import { GUTTER } from "../../site-config";

// Positions are the Figma frame's; each photo suits its slot's orientation so
// `object-cover` crops as little as possible.
const PHOTOS: Photo[] = [
  { src: "/photos/hero-presenters.webp", left: "3.5%", top: "16%", width: "8.3%", height: "13%" },
  { src: "/photos/hero-demo.webp", left: "31.5%", top: "14%", width: "7.6%", height: "15.4%", focus: "30% center" },
  { src: "/photos/hero-group.webp", left: "84.8%", top: "19%", width: "10.1%", height: "18.2%" },
  { src: "/photos/hero-hall.webp", left: "8.6%", top: "51%", width: "9.2%", height: "12.1%" },
  { src: "/photos/hero-campus.webp", left: "80.9%", top: "50%", width: "8.5%", height: "19.8%" },
  // Lower-left, not lower-centre, where a photo sat under the intro. At 10%
  // it clears the intro's 580px column from 1024px up.
  { src: "/photos/hero-code.webp", left: "10%", top: "70%", width: "10.3%", height: "16.2%" },
];

export function Hero() {
  return (
    // The 520px stage is only for the photos, which show from `lg` up.
    <section
      className={`${GUTTER} relative flex items-center justify-center pt-lg pb-6 lg:min-h-130 lg:py-16`}
    >
      <FloatingPhotos photos={PHOTOS} />

      <div className="relative z-10 text-center">
        {/* Own size so it clears the photos. Under 25.75rem the longest phrase
            wraps, so 3lh is reserved to stop layout shift; recheck if the
            phrases change. Leading is restated because cn drops the role's. */}
        <H1 className="text-[clamp(2.25rem,5vw,4.5rem)] leading-[1.08] max-[25.75rem]:min-h-[3lh]">
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
            // Starts at the text colour, not black, so dark mode shows no
            // dark gap in the band.
            colors={["var(--foreground)", "var(--color-red)", "#e8722a", "#f5c542"]}
            hold={2}
            // Phones wrap instead of running off the screen.
            className="max-sm:whitespace-normal"
          />
        </H1>
      </div>
    </section>
  );
}
