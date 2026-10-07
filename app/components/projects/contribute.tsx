import { H2, Mono, P, typography } from "../typography";
import { GUTTER, SITE } from "../../site-config";
import { NewTabCue } from "../text-link";

/**
 * `Projects / Contribute` (11:200; mobile 15:566): the red strip under the
 * directory. The footer's "Contribute" link lands here (`/projects#contribute`).
 *
 * Red in both themes, white text. The action is the Figma's `Style=Light`
 * button — paper on red — so it is `tone: "onDark"` rather than `primary`:
 * `primary` is red in light mode and would vanish into the strip.
 *
 * "Find collaborators" goes to Discord. Finding a teammate, getting feedback
 * and sharing a work in progress are conversations, and conversation lives in
 * the club's Discord (decision D4). The feedback form is for feedback ABOUT the
 * club, not for finding people to build with, so it is not the destination.
 *
 * Desktop: 80px inset, the story capped at the frame's 890px column, 80px to
 * the button, everything vertically centred. Mobile: 48px top and bottom, the
 * button stacked 24px under the story.
 *
 * `--ring` is pinned to white on the strip. The global focus outline reads
 * `--ring`, which is red in light mode — a red outline on a red strip would be
 * invisible, and the outline is the only focus indicator the button has.
 */
export function ProjectsContribute() {
  return (
    <section
      id="contribute"
      aria-labelledby="contribute-heading"
      className={`${GUTTER} bg-red flex scroll-mt-md flex-col gap-md py-lg text-white [--ring:var(--color-white)] md:py-xl lg:flex-row lg:items-center lg:gap-xl`}
    >
      <div className="flex min-w-0 flex-col gap-md lg:max-w-[890px] lg:flex-1">
        <Mono tone="inherit">Have an idea?</Mono>
        <H2 id="contribute-heading" tone="inherit" className="text-balance">
          Start a project with other members.
        </H2>
        <P size="lead" tone="inherit" className="max-w-[820px]">
          Post it in Discord to find a teammate or get feedback on a work in
          progress.
        </P>
      </div>
      <a
        href={SITE.discordInvite}
        target="_blank"
        rel="noreferrer"
        className={typography.button({
          tone: "onDark",
          className: "self-start lg:shrink-0 lg:self-center",
        })}
      >
        Find collaborators
        <NewTabCue spaced />
      </a>
    </section>
  );
}
