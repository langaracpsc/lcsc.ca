import { H2, P } from "../typography";
import { GUTTER } from "../../site-config";

/**
 * About the club — the Figma's "About the club" (desktop 4:63, mobile 15:284).
 * The heading is the frame's; the paragraph was rewritten in plain words.
 *
 * 88px above and below from `md`, 48px on phones. The Figma's numbered
 * section label ("01 / This is LCSC") was dropped at the user's request, so
 * the story starts at the gutter.
 *
 * Both frames break the heading after "with", so the break is explicit from
 * `sm` up. On the narrowest phones it is dropped and the heading balances
 * itself instead, so a forced break can't strand a single word.
 */
export function AboutTheClub() {
  return (
    <section
      aria-labelledby="about-heading"
      className={`${GUTTER} py-lg md:py-22`}
    >
      <div className="flex flex-col gap-md">
        <H2 id="about-heading" className="max-w-[850px] text-balance sm:text-wrap">
          Good ideas start with
          <br className="hidden sm:inline" /> good company.
        </H2>
        <P size="lead" tone="muted" className="max-w-[840px]">
          We&rsquo;re the Langara Computer Science Club, a group of students
          who learn by building. Bring a question or a half-finished side
          project. Beginners are welcome.
        </P>
      </div>
    </section>
  );
}
