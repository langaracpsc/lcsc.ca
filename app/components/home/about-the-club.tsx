import { H2, P } from "../typography";
import { GUTTER } from "../../site-config";

/**
 * Figma 4:63 (mobile 15:284). Both frames break the heading after "with"; the
 * narrowest phones drop the break so it can't strand a word.
 */
export function AboutTheClub() {
  return (
    <section
      aria-labelledby="about-heading"
      className={`${GUTTER} py-lg md:py-22`}
    >
      <div className="flex flex-col gap-md">
        <H2 id="about-heading" className="max-w-[850px] sm:text-wrap">
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
