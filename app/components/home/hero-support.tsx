import Link from "next/link";
import { P, typography } from "../typography";
import { GUTTER } from "../../site-config";

/**
 * Hero support — the Figma hero's intro line and its two actions ("Hero
 * intro" 4:44 and "Hero actions" 4:46; mobile 15:267 and 15:268), kept as a
 * component of their own beneath the headline.
 *
 * ── Alignment ──────────────────────────────────────────────────────────────
 * The Figma hero is left-aligned in a two-column frame. The site's hero is a
 * centred oversized headline, so this block is centred to sit under it: the
 * intro is capped at the Figma's 580px text box, and the buttons centre as a
 * row from `sm` and stack below that, as the mobile frame does.
 *
 * ── Buttons ────────────────────────────────────────────────────────────────
 * "Join the club" is the Figma's `Style=Light` action (paper on the dark
 * hero) and "Explore Build" is `Style=Primary` (red). The surface follows the
 * theme, so Join uses the `contrast` tone: paper on ink in dark mode, ink on
 * paper in light mode, where a paper button would vanish.
 *
 * ── Spacing ────────────────────────────────────────────────────────────────
 * The Figma puts 24px between headline and intro. From `lg` the hero keeps a
 * fixed stage for the floating photos, which leaves air under the headline,
 * so this block pulls up into the hero's bottom padding to close the gap.
 * Below `lg` there is no stage and the hero's own padding gives the 24px.
 */
export function HeroSupport() {
  return (
    // A plain div, not a labelled section: the page's real "About" is the
    // section further down, and a second landmark here would duplicate it.
    <div
      className={`${GUTTER} relative z-10 flex flex-col items-center gap-md pb-xl text-center lg:-mt-20`}
    >
      <P size="lead" className="max-w-[580px]">
        A student-run club at Langara College for people who want to build
        things and get better at it together.
      </P>

      <div className="flex flex-col items-center gap-sm sm:flex-row sm:justify-center">
        <Link href="/join" className={typography.button({ tone: "contrast" })}>
          Join the club&nbsp;&nbsp;<span aria-hidden="true">↗</span>
        </Link>
        <Link href="/build" className={typography.button()}>
          Explore Build&nbsp;&nbsp;<span aria-hidden="true">→</span>
        </Link>
      </div>
    </div>
  );
}
